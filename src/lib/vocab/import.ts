// CSV / JSON import parsing & validation for vocabulary files.
// Accepts user-authorized exports (e.g. from a paid product the user owns)
// or any openly-licensed vocabulary file.

import type { Difficulty, Exam, Word } from "./sample-data";

const VALID_EXAMS: Exam[] = ["IELTS", "TOEFL", "GRE", "SAT", "BCS", "Admission"];
const VALID_DIFFICULTIES: Difficulty[] = ["beginner", "intermediate", "advanced"];

export interface ImportResult {
  words: Word[];
  errors: string[];
  skipped: number;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function splitList(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean);
  if (typeof v === "string") {
    return v
      .split(/[|,;]/g)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function normalizeExam(v: unknown): Exam[] {
  const arr = splitList(v).map((e) => e.toUpperCase());
  const matched = arr.filter((e): e is Exam => (VALID_EXAMS as string[]).includes(e));
  return matched.length ? matched : ["IELTS", "TOEFL"];
}

function normalizeDifficulty(v: unknown): Difficulty {
  const s = typeof v === "string" ? v.toLowerCase().trim() : "";
  if (VALID_DIFFICULTIES.includes(s as Difficulty)) return s as Difficulty;
  // Heuristic from labels.
  if (/easy|basic|a1|a2/.test(s)) return "beginner";
  if (/hard|tough|c1|c2|expert/.test(s)) return "advanced";
  return "intermediate";
}

function toWord(raw: Record<string, unknown>, index: number): { word?: Word; error?: string } {
  const word =
    (raw.word as string) ??
    (raw.english as string) ??
    (raw.term as string) ??
    (raw.englishWord as string);
  const bengali =
    (raw.bengali as string) ??
    (raw.bn as string) ??
    (raw.bangla as string) ??
    (raw.meaning as string) ??
    (raw.bengaliMeaning as string);

  if (!word || !bengali) {
    return { error: `Row ${index + 1}: missing required "word" or "bengali" field.` };
  }

  const definition =
    (raw.definition as string) ??
    (raw.englishDefinition as string) ??
    (raw.def as string) ??
    "";
  const example = (raw.example as string) ?? (raw.sentence as string) ?? "";
  const phonetic = (raw.phonetic as string) ?? (raw.ipa as string) ?? undefined;
  const partOfSpeech = (raw.partOfSpeech as string) ?? (raw.pos as string) ?? undefined;
  const category = (raw.category as string) ?? (raw.topic as string) ?? "Imported";

  const w: Word = {
    id: slugify(String(word)),
    word: String(word).trim(),
    phonetic,
    partOfSpeech,
    bengali: String(bengali).trim(),
    definition: String(definition).trim() || "—",
    example: String(example).trim() || "",
    synonyms: splitList(raw.synonyms ?? raw.synonym),
    antonyms: splitList(raw.antonyms ?? raw.antonym),
    difficulty: normalizeDifficulty(raw.difficulty ?? raw.level),
    exams: normalizeExam(raw.exams ?? raw.exam ?? raw.tags),
    category: String(category).trim() || "Imported",
  };
  return { word: w };
}

/** Minimal RFC-4180-ish CSV parser (handles quoted fields, commas, newlines). */
export function parseCsv(text: string): Record<string, unknown>[] {
  const rows: string[][] = [];
  let field = "";
  let row: string[] = [];
  let i = 0;
  let inQuotes = false;
  const t = text.replace(/^\uFEFF/, ""); // strip BOM

  while (i < t.length) {
    const c = t[i];
    if (inQuotes) {
      if (c === '"') {
        if (t[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += c;
      i++;
      continue;
    }
    if (c === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (c === ",") {
      row.push(field);
      field = "";
      i++;
      continue;
    }
    if (c === "\r") {
      i++;
      continue;
    }
    if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      i++;
      continue;
    }
    field += c;
    i++;
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }

  if (!rows.length) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1)
    .filter((r) => r.some((c) => c.trim() !== ""))
    .map((r) => {
      const obj: Record<string, unknown> = {};
      headers.forEach((h, idx) => {
        obj[h] = r[idx] ?? "";
      });
      return obj;
    });
}

export function parseVocabFile(text: string, filename: string): ImportResult {
  const errors: string[] = [];
  const isJson = /\.json$/i.test(filename) || text.trim().startsWith("[") || text.trim().startsWith("{");
  let records: Record<string, unknown>[] = [];

  try {
    if (isJson) {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        records = parsed as Record<string, unknown>[];
      } else if (parsed && typeof parsed === "object" && Array.isArray((parsed as { words?: unknown }).words)) {
        records = (parsed as { words: Record<string, unknown>[] }).words;
      } else {
        return { words: [], errors: ["JSON must be an array of word objects or { words: [...] }."], skipped: 0 };
      }
    } else {
      records = parseCsv(text);
    }
  } catch (e) {
    return { words: [], errors: [`Failed to parse file: ${(e as Error).message}`], skipped: 0 };
  }

  if (!records.length) {
    return { words: [], errors: ["No rows found in the file."], skipped: 0 };
  }

  const words: Word[] = [];
  let skipped = 0;
  records.forEach((rec, idx) => {
    const { word, error } = toWord(rec, idx);
    if (error) {
      errors.push(error);
      skipped++;
      return;
    }
    if (word) {
      if (words.some((w) => w.id === word.id)) {
        // duplicate within file; skip silently
        skipped++;
        return;
      }
      words.push(word);
    }
  });

  return { words, errors, skipped };
}
