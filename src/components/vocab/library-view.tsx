"use client";

import { useMemo, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Filter,
  Upload,
  ChevronDown,
  BookOpen,
  FileText,
  AlertCircle,
  Download,
  Trash2,
} from "lucide-react";
import { useWordBank } from "@/lib/vocab/hooks";
import { useVocabStore } from "@/lib/vocab/store";
import { parseVocabFile } from "@/lib/vocab/import";
import type { Word } from "@/lib/vocab/sample-data";
import { useToast } from "@/hooks/use-toast";
import {
  BengaliText,
  DifficultyBadge,
  EmptyState,
  ExamBadges,
  LoadingState,
  PronounceButton,
  WordListBadges,
} from "./ui-bits";
import { cn } from "@/lib/utils";

const EXAMS = ["IELTS", "TOEFL", "GRE", "SAT", "BCS", "Admission"] as const;

export function LibraryView() {
  const { words, isLoading, isError, sampleCount, customCount } = useWordBank();
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<string>("all");
  const [exam, setExam] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const categories = useMemo(
    () => [...new Set(words.map((w) => w.category).filter(Boolean))].sort(),
    [words]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return words.filter((w) => {
      if (difficulty !== "all" && w.difficulty !== difficulty) return false;
      if (exam !== "all" && !w.exams.includes(exam as (typeof EXAMS)[number])) return false;
      if (category !== "all" && w.category !== category) return false;
      if (!q) return true;
      return (
        w.word.toLowerCase().includes(q) ||
        w.bengali.includes(q) ||
        w.definition.toLowerCase().includes(q) ||
        w.synonyms.some((s) => s.toLowerCase().includes(q)) ||
        w.antonyms.some((s) => s.toLowerCase().includes(q)) ||
        w.example.toLowerCase().includes(q)
      );
    });
  }, [words, query, difficulty, exam, category]);

  const counts = useMemo(() => {
    const byExam: Record<string, number> = {};
    for (const w of words) {
      for (const e of w.exams) byExam[e] = (byExam[e] ?? 0) + 1;
    }
    return {
      total: words.length,
      beginner: words.filter((w) => w.difficulty === "beginner").length,
      intermediate: words.filter((w) => w.difficulty === "intermediate").length,
      advanced: words.filter((w) => w.difficulty === "advanced").length,
      byExam,
    };
  }, [words]);

  if (isError) {
    return (
      <EmptyState
        title="Could not load vocabulary"
        description="Something went wrong fetching the word bank. Please retry."
        icon={AlertCircle}
        action={<Button onClick={() => window.location.reload()}>Retry</Button>}
      />
    );
  }

  if (isLoading) {
    return <LoadingState label="Loading vocabulary…" />;
  }

  return (
    <div className="space-y-5">
      {/* Stats strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total words" value={counts.total} hint={`${customCount} imported`} />
        <StatCard label="Beginner" value={counts.beginner} />
        <StatCard label="Intermediate" value={counts.intermediate} />
        <StatCard label="Advanced" value={counts.advanced} />
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search word, meaning, definition, synonym…"
                  className="pl-9"
                  aria-label="Search vocabulary"
                />
              </div>
              <ImportDialog />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger aria-label="Filter by difficulty">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All difficulties</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <Select value={exam} onValueChange={setExam}>
                <SelectTrigger aria-label="Filter by exam">
                  <SelectValue placeholder="Exam" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All exams</SelectItem>
                  {EXAMS.map((e) => (
                    <SelectItem key={e} value={e}>
                      {e} ({counts.byExam[e] ?? 0})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger aria-label="Filter by category">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Result meta */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
          {words.length} words
        </span>
        {(query || difficulty !== "all" || exam !== "all" || category !== "all") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery("");
              setDifficulty("all");
              setExam("all");
              setCategory("all");
            }}
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Word list */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No words match"
          description="Try a different search term or clear your filters."
          icon={Filter}
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="scrollbar-thin max-h-[60vh] overflow-y-auto">
              <ul className="divide-y">
                {filtered.map((w) => (
                  <WordRow
                    key={w.id}
                    word={w}
                    expanded={expanded === w.id}
                    onToggle={() => setExpanded((p) => (p === w.id ? null : w.id))}
                  />
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function StatCard({ label, value, hint }: { label: string; value: number; hint?: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-bold tabular-nums">{value}</p>
        {hint && <p className="text-[10px] text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  );
}

function WordRow({
  word,
  expanded,
  onToggle,
}: {
  word: Word;
  expanded: boolean;
  onToggle: () => void;
}) {
  const isCustom = useVocabStore((s) => s.customWords.some((c) => c.id === word.id));
  const removeCustomWord = useVocabStore((s) => s.removeCustomWord);
  const { toast } = useToast();

  return (
    <li className="p-4 transition-colors hover:bg-muted/40">
      <div className="flex items-start justify-between gap-3">
        <button
          onClick={onToggle}
          className="flex-1 text-left"
          aria-expanded={expanded}
        >
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-lg font-semibold">{word.word}</span>
            {word.phonetic && (
              <span className="font-mono text-xs text-muted-foreground">{word.phonetic}</span>
            )}
            {word.partOfSpeech && (
              <span className="text-xs italic text-muted-foreground">{word.partOfSpeech}</span>
            )}
            {isCustom && (
              <Badge variant="secondary" className="text-[10px]">
                Imported
              </Badge>
            )}
          </div>
          <p className="mt-0.5 text-sm">
            <BengaliText className="text-base font-medium">{word.bengali}</BengaliText>
          </p>
          <div className="mt-2">
            <WordListBadges word={word} />
          </div>
        </button>
        <div className="flex flex-col items-end gap-1">
          <PronounceButton text={word.word} />
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform",
              expanded && "rotate-180"
            )}
          />
        </div>
      </div>

      {expanded && (
        <div className="mt-3 space-y-3 border-t pt-3 text-sm">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Definition
            </p>
            <p>{word.definition}</p>
          </div>
          {word.example && (
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Example
              </p>
              <p className="italic text-foreground/90">&ldquo;{word.example}&rdquo;</p>
            </div>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            {word.synonyms.length > 0 && (
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Synonyms
                </p>
                <div className="flex flex-wrap gap-1">
                  {word.synonyms.map((s) => (
                    <Badge key={s} variant="outline" className="font-normal">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {word.antonyms.length > 0 && (
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Antonyms
                </p>
                <div className="flex flex-wrap gap-1">
                  {word.antonyms.map((s) => (
                    <Badge key={s} variant="outline" className="font-normal text-muted-foreground">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          {isCustom && (
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive"
                onClick={() => {
                  removeCustomWord(word.id);
                  toast({ title: `Removed "${word.word}"` });
                }}
              >
                <Trash2 className="mr-1 h-3.5 w-3.5" /> Remove import
              </Button>
            </div>
          )}
        </div>
      )}
    </li>
  );
}

const SAMPLE_CSV = `word,bengali,definition,example,synonyms,antonyms,difficulty,exams,category,phonetic,partOfSpeech
meticulous,খুঁতখুঁতে,showing great attention to detail,She is meticulous about her work.,thorough|careful,careless|sloppy,advanced,IELTS|GRE|BCS,Academic,/məˈtɪkjʊləs/,adjective
abundant,প্রচুর,existing in large quantities,The region has abundant rainfall.,plentiful|ample,scarce|rare,intermediate,IELTS|TOEFL|SAT,Nature,/əˈbʌndənt/,adjective`;

function ImportDialog() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [filename, setFilename] = useState("import.csv");
  const fileRef = useRef<HTMLInputElement>(null);
  const importWords = useVocabStore((s) => s.importWords);
  const clearImports = useVocabStore((s) => s.clearImports);
  const customCount = useVocabStore((s) => s.customWords.length);
  const { toast } = useToast();

  function handleFile(file: File) {
    setFilename(file.name);
    const reader = new FileReader();
    reader.onload = () => setText(String(reader.result ?? ""));
    reader.readAsText(file);
  }

  function doImport() {
    const result = parseVocabFile(text, filename);
    if (!result.words.length) {
      toast({
        title: "Nothing imported",
        description: result.errors[0] ?? "No valid words found in the file.",
        variant: "destructive",
      });
      return;
    }
    const { added, updated } = importWords(result.words);
    toast({
      title: `Imported ${added + updated} words`,
      description: `${added} new, ${updated} updated${result.skipped ? `, ${result.skipped} skipped` : ""}.${
        result.errors.length ? ` ${result.errors.length} row error(s).` : ""
      }`,
    });
    setText("");
    setOpen(false);
  }

  function downloadSample() {
    const blob = new Blob([SAMPLE_CSV], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vocab-import-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <Upload className="h-4 w-4" /> Import
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" /> Import vocabulary
          </DialogTitle>
          <DialogDescription>
            Load your own authorized CSV or JSON file. Supported columns:{" "}
            <code className="text-xs">word, bengali, definition, example, synonyms, antonyms,
            difficulty, exams, category, phonetic, partOfSpeech</code>
            . Synonyms/exams use <code className="text-xs">|</code> or <code>,</code> separators.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileRef.current?.click()}
            >
              <FileText className="mr-1 h-4 w-4" /> Choose file
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept=".csv,.json,.txt"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
                e.target.value = "";
              }}
            />
            <Button type="button" variant="outline" size="sm" onClick={downloadSample}>
              <Download className="mr-1 h-4 w-4" /> Download CSV template
            </Button>
            {customCount > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="ml-auto text-destructive"
                onClick={() => {
                  clearImports();
                  toast({ title: "Cleared imported words" });
                }}
              >
                <Trash2 className="mr-1 h-4 w-4" /> Clear {customCount} imported
              </Button>
            )}
          </div>

          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="…or paste CSV / JSON here"
            className="h-40 font-mono text-xs"
          />
          {text && (
            <p className="text-xs text-muted-foreground">
              {filename} — {text.length} characters ready
            </p>
          )}
          {customCount > 0 && (
            <p className="rounded-md bg-muted/60 p-2 text-xs text-muted-foreground">
              You currently have <strong>{customCount}</strong> imported words saved locally.
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={doImport} disabled={!text.trim()}>
            Import words
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
