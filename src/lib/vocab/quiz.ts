// Quiz question generation. Pure functions that take a pool of words and
// produce deterministic-ish questions with plausible distractors.

import type { Word } from "./sample-data";

export type QuizType =
  | "meaning-mc" // English word -> pick Bengali meaning
  | "reverse-mc" // Bengali meaning -> pick English word
  | "synonym-mc" // word -> pick synonym
  | "antonym-mc" // word -> pick antonym
  | "fill-blank"; // example with blank -> pick word

export interface BaseQuestion {
  id: string;
  type: QuizType;
  prompt: string;
  subPrompt?: string;
  options: string[];
  answer: string; // the correct option text
  explanation: string;
  wordId: string;
}

export interface MatchQuestion {
  id: string;
  type: "word-match";
  pairs: { wordId: string; left: string; right: string }[];
  explanation: string;
}

export type Question = BaseQuestion | MatchQuestion;

// Tiny seeded RNG so a given quiz session can be reproducible if needed.
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rnd: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick<T>(arr: T[], rnd: () => number): T {
  return arr[Math.floor(rnd() * arr.length)];
}

function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

function buildOptions(correct: string, distractors: string[], rnd: () => number, count = 4): string[] {
  const clean = unique(distractors.filter((d) => d && d !== correct));
  const chosen = shuffle(clean, rnd).slice(0, count - 1);
  return shuffle([correct, ...chosen], rnd);
}

function makeMeaningMc(w: Word, pool: Word[], rnd: () => number): BaseQuestion {
  const distractors = pool.filter((p) => p.id !== w.id).map((p) => p.bengali);
  return {
    id: `m-${w.id}`,
    type: "meaning-mc",
    prompt: w.word,
    subPrompt: w.phonetic ? `${w.partOfSpeech ?? ""} ${w.phonetic}`.trim() : w.partOfSpeech,
    options: buildOptions(w.bengali, distractors, rnd),
    answer: w.bengali,
    explanation: `"${w.word}" means: ${w.bengali}. — ${w.definition}`,
    wordId: w.id,
  };
}

function makeReverseMc(w: Word, pool: Word[], rnd: () => number): BaseQuestion {
  const distractors = pool.filter((p) => p.id !== w.id).map((p) => p.word);
  return {
    id: `r-${w.id}`,
    type: "reverse-mc",
    prompt: w.bengali,
    subPrompt: "Bengali meaning — choose the English word",
    options: buildOptions(w.word, distractors, rnd),
    answer: w.word,
    explanation: `"${w.bengali}" = "${w.word}". — ${w.definition}`,
    wordId: w.id,
  };
}

function makeSynonymMc(w: Word, pool: Word[], rnd: () => number): BaseQuestion | null {
  if (!w.synonyms.length) return null;
  const correct = w.synonyms[0];
  const distractors = pool.flatMap((p) => (p.id === w.id ? [] : p.synonyms));
  if (distractors.length < 3) return null;
  return {
    id: `s-${w.id}`,
    type: "synonym-mc",
    prompt: `Which word is a synonym of "${w.word}"?`,
    subPrompt: w.definition,
    options: buildOptions(correct, distractors, rnd),
    answer: correct,
    explanation: `"${correct}" is a synonym of "${w.word}".`,
    wordId: w.id,
  };
}

function makeAntonymMc(w: Word, pool: Word[], rnd: () => number): BaseQuestion | null {
  if (!w.antonyms.length) return null;
  const correct = w.antonyms[0];
  const distractors = pool.flatMap((p) => (p.id === w.id ? [] : [...p.antonyms, ...p.synonyms]));
  if (distractors.length < 3) return null;
  return {
    id: `a-${w.id}`,
    type: "antonym-mc",
    prompt: `Which word is an antonym of "${w.word}"?`,
    subPrompt: w.definition,
    options: buildOptions(correct, distractors, rnd),
    answer: correct,
    explanation: `"${correct}" is an antonym of "${w.word}".`,
    wordId: w.id,
  };
}

function makeFillBlank(w: Word, pool: Word[], rnd: () => number): BaseQuestion {
  // Replace the word (case-insensitive) in the example with a blank.
  const re = new RegExp(`\\b${escapeRegExp(w.word)}s?\\b`, "i");
  const sentence = re.test(w.example) ? w.example.replace(re, "_____") : `${w.example} (Word: _____)`;
  const distractors = pool.filter((p) => p.id !== w.id).map((p) => p.word);
  return {
    id: `f-${w.id}`,
    type: "fill-blank",
    prompt: sentence,
    subPrompt: "Choose the word that fits the blank.",
    options: buildOptions(w.word, distractors, rnd),
    answer: w.word,
    explanation: `The word is "${w.word}". — ${w.definition}`,
    wordId: w.id,
  };
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export interface QuizConfig {
  type: Exclude<QuizType, never> | "word-match";
  pool: Word[];
  count: number;
  seed?: number;
}

export function generateQuiz(cfg: QuizConfig): Question[] {
  const rnd = mulberry32(cfg.seed ?? Math.floor(Math.random() * 1e9));
  const pool = cfg.pool.filter(Boolean);
  if (pool.length < 4) return [];

  if (cfg.type === "word-match") {
    return generateMatch(pool, cfg.count, rnd);
  }

  const shuffledPool = shuffle(pool, rnd);
  const questions: BaseQuestion[] = [];
  let i = 0;
  while (questions.length < cfg.count && i < shuffledPool.length * 3) {
    const w = shuffledPool[i % shuffledPool.length];
    i++;
    if (questions.some((q) => q.wordId === w.id)) continue;
    let q: BaseQuestion | null = null;
    switch (cfg.type) {
      case "meaning-mc":
        q = makeMeaningMc(w, pool, rnd);
        break;
      case "reverse-mc":
        q = makeReverseMc(w, pool, rnd);
        break;
      case "synonym-mc":
        q = makeSynonymMc(w, pool, rnd);
        break;
      case "antonym-mc":
        q = makeAntonymMc(w, pool, rnd);
        break;
      case "fill-blank":
        q = makeFillBlank(w, pool, rnd);
        break;
    }
    if (q) questions.push(q);
    if (i > shuffledPool.length * 3) break;
  }
  return questions;
}

function generateMatch(pool: Word[], count: number, rnd: () => number): MatchQuestion[] {
  const n = Math.min(count, 5, Math.floor(pool.length / 2));
  const chosen = shuffle(pool, rnd).slice(0, n);
  const pairs = chosen.map((w) => ({ wordId: w.id, left: w.word, right: w.bengali }));
  return [
    {
      id: `match-${Date.now()}`,
      type: "word-match",
      pairs,
      explanation: "Match each English word with its Bengali meaning.",
    },
  ];
}
