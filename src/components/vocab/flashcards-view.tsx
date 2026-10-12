"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Sparkles,
  Layers,
  Volume2,
} from "lucide-react";
import { useWordBank } from "@/lib/vocab/hooks";
import { useVocabStore } from "@/lib/vocab/store";
import type { Word } from "@/lib/vocab/sample-data";
import { speak, speechSupported } from "@/lib/vocab/speech";
import { BengaliText, DifficultyBadge, EmptyState, ExamBadges, LoadingState } from "./ui-bits";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const EXAMS = ["IELTS", "TOEFL", "GRE", "SAT", "BCS", "Admission"] as const;

export function FlashcardsView() {
  const { words, isLoading, isError } = useWordBank();
  const reviewWord = useVocabStore((s) => s.reviewWord);
  const setManualMark = useVocabStore((s) => s.setManualMark);
  const { toast } = useToast();

  const [difficulty, setDifficulty] = useState("all");
  const [exam, setExam] = useState("all");
  const [shuffled, setShuffled] = useState(false);
  const [deck, setDeck] = useState<Word[]>([]);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const pool = useMemo(() => {
    let p = words.filter((w) => {
      if (difficulty !== "all" && w.difficulty !== difficulty) return false;
      if (exam !== "all" && !w.exams.includes(exam as (typeof EXAMS)[number])) return false;
      return true;
    });
    if (shuffled) {
      p = [...p].sort(() => Math.random() - 0.5);
    }
    return p;
  }, [words, difficulty, exam, shuffled]);

  const start = useCallback(() => {
    setDeck(pool.slice(0, Math.min(pool.length, 40)));
    setIndex(0);
    setFlipped(false);
    setStarted(true);
  }, [pool]);

  const current = deck[index];

  const next = useCallback(() => {
    setFlipped(false);
    setIndex((i) => Math.min(i + 1, deck.length));
  }, [deck.length]);

  const prev = useCallback(() => {
    setFlipped(false);
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const mark = useCallback(
    (quality: 0 | 4 | 5, label: string) => {
      if (!current) return;
      reviewWord(current.id, quality);
      setManualMark(current.id, quality === 0 ? "practice" : "known");
      toast({ title: label });
      if (index < deck.length - 1) next();
      else setFlipped(false);
    },
    [current, reviewWord, setManualMark, index, deck.length, next]
  );

  // keyboard navigation
  useEffect(() => {
    if (!started) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "1") mark(0, "Marked: Need practice");
      else if (e.key === "2") mark(4, "Marked: Know it");
      else if (e.key === "3") mark(5, "Marked: Easy");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [started, next, prev, mark]);

  if (isError) {
    return <EmptyState title="Could not load cards" icon={AlertCircle} />;
  }
  if (isLoading) return <LoadingState label="Preparing flashcards…" />;

  if (!started) {
    return (
      <div className="mx-auto max-w-xl space-y-5">
        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Flashcard session</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Flip a card to reveal the Bengali meaning, then rate how well you knew it. Your
              ratings drive the spaced-repetition schedule.
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger aria-label="Difficulty">
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
                <SelectTrigger aria-label="Exam">
                  <SelectValue placeholder="Exam" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All exams</SelectItem>
                  {EXAMS.map((e) => (
                    <SelectItem key={e} value={e}>
                      {e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={shuffled}
                onChange={(e) => setShuffled(e.target.checked)}
                className="h-4 w-4 rounded border-input"
              />
              Shuffle cards
            </label>

            <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3 text-sm">
              <span className="text-muted-foreground">Cards in this set</span>
              <span className="font-semibold tabular-nums">{Math.min(pool.length, 40)}</span>
            </div>

            <Button onClick={start} disabled={pool.length === 0} className="w-full">
              Start session
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Keyboard: <kbd className="rounded bg-muted px-1">Space</kbd> flip,{" "}
              <kbd className="rounded bg-muted px-1">←</kbd>/
              <kbd className="rounded bg-muted px-1">→</kbd> navigate,{" "}
              <kbd className="rounded bg-muted px-1">1</kbd>/
              <kbd className="rounded bg-muted px-1">2</kbd>/
              <kbd className="rounded bg-muted px-1">3</kbd> rate
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="mx-auto max-w-xl">
        <Card>
          <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
            <Sparkles className="h-10 w-10 text-emerald-500" />
            <h2 className="text-lg font-semibold">Session complete!</h2>
            <p className="text-sm text-muted-foreground">
              You reviewed {deck.length} cards. Your progress has been saved.
            </p>
            <Button onClick={() => setStarted(false)} variant="outline">
              Back to setup
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((index + 1) / deck.length) * 100;

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Card <span className="font-semibold text-foreground">{index + 1}</span> of {deck.length}
        </span>
        <Button variant="ghost" size="sm" onClick={() => setStarted(false)}>
          Exit
        </Button>
      </div>
      <Progress value={progress} />

      {/* Flip card */}
      <div
        className="relative cursor-pointer select-none [perspective:1600px]"
        onClick={() => setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
        aria-label="Flashcard, click to flip"
      >
        <div
          className={cn(
            "relative h-80 w-full transition-transform duration-500 [transform-style:preserve-3d]",
            flipped && "[transform:rotateY(180deg)]"
          )}
        >
          {/* Front */}
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <Card className="flex h-full flex-col items-center justify-center gap-3 border-2 p-6 text-center">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <DifficultyBadge difficulty={current.difficulty} />
                <ExamBadges exams={current.exams} />
              </div>
              <h2 className="text-4xl font-bold">{current.word}</h2>
              {current.phonetic && (
                <p className="font-mono text-sm text-muted-foreground">{current.phonetic}</p>
              )}
              {current.partOfSpeech && (
                <Badge variant="outline" className="italic">
                  {current.partOfSpeech}
                </Badge>
              )}
              <div className="mt-2 flex items-center gap-3 text-muted-foreground">
                {speechSupported() && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      speak(current.word);
                    }}
                  >
                    <Volume2 className="h-4 w-4" /> Pronounce
                  </Button>
                )}
                <span className="text-xs">Click to flip</span>
              </div>
            </Card>
          </div>
          {/* Back */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <Card className="flex h-full flex-col justify-center gap-3 overflow-hidden border-2 p-6">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-lg font-semibold">{current.word}</span>
                {current.partOfSpeech && (
                  <span className="text-xs italic text-muted-foreground">{current.partOfSpeech}</span>
                )}
              </div>
              <p className="text-2xl font-semibold">
                <BengaliText>{current.bengali}</BengaliText>
              </p>
              <p className="text-sm text-foreground/90">{current.definition}</p>
              {current.example && (
                <p className="rounded-md bg-muted/60 p-2 text-sm italic">&ldquo;{current.example}&rdquo;</p>
              )}
              <div className="flex flex-wrap gap-2">
                {current.synonyms.length > 0 && (
                  <div className="text-xs">
                    <span className="text-muted-foreground">Syn: </span>
                    {current.synonyms.map((s) => (
                      <Badge key={s} variant="outline" className="mr-1 font-normal">
                        {s}
                      </Badge>
                    ))}
                  </div>
                )}
                {current.antonyms.length > 0 && (
                  <div className="text-xs">
                    <span className="text-muted-foreground">Ant: </span>
                    {current.antonyms.map((s) => (
                      <Badge key={s} variant="outline" className="mr-1 font-normal text-muted-foreground">
                        {s}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-2">
        <Button variant="outline" size="icon" onClick={prev} disabled={index === 0} aria-label="Previous card">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => setFlipped((f) => !f)} className="gap-1">
          <RotateCcw className="h-4 w-4" /> Flip
        </Button>
        <div className="flex flex-1 justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-rose-300 text-rose-600 hover:bg-rose-50 dark:border-rose-500/40 dark:text-rose-300 dark:hover:bg-rose-500/10"
            onClick={() => mark(0, "Marked: Need practice")}
          >
            <span className="mr-1 text-xs opacity-60">1</span> Need practice
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-emerald-300 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500/40 dark:text-emerald-300 dark:hover:bg-emerald-500/10"
            onClick={() => mark(4, "Marked: Know it")}
          >
            <span className="mr-1 text-xs opacity-60">2</span> Know it
          </Button>
          <Button variant="outline" size="sm" onClick={() => mark(5, "Marked: Easy")}>
            <span className="mr-1 text-xs opacity-60">3</span> Easy
          </Button>
        </div>
        <Button variant="outline" size="icon" onClick={next} disabled={index >= deck.length - 1} aria-label="Next card">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
