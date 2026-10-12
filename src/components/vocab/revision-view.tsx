"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CalendarClock,
  Star,
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Trash2,
  BookOpenCheck,
  Sparkles,
} from "lucide-react";
import { useWordBank } from "@/lib/vocab/hooks";
import { useVocabStore } from "@/lib/vocab/store";
import { isDue, describeDue } from "@/lib/vocab/srs";
import type { Word } from "@/lib/vocab/sample-data";
import { speak, speechSupported } from "@/lib/vocab/speech";
import { BengaliText, DifficultyBadge, EmptyState, LoadingState } from "./ui-bits";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function RevisionView() {
  const { words, isLoading } = useWordBank();
  const srs = useVocabStore((s) => s.srs);
  const difficultMap = useVocabStore((s) => s.difficult);
  const toggleDifficult = useVocabStore((s) => s.toggleDifficult);
  const reviewWord = useVocabStore((s) => s.reviewWord);
  const hasHydrated = useVocabStore((s) => s.hasHydrated);
  const { toast } = useToast();

  const dueWords = useMemo(
    () => words.filter((w) => !srs[w.id] || isDue(srs[w.id])),
    [words, srs]
  );
  const difficultWords = useMemo(
    () => words.filter((w) => difficultMap[w.id]),
    [words, difficultMap]
  );
  const learnedWords = useMemo(
    () => words.filter((w) => srs[w.id]?.status === "known"),
    [words, srs]
  );

  const [reviewing, setReviewing] = useState(false);
  const [reviewQueue, setReviewQueue] = useState<Word[]>([]);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  function startReview() {
    const q = [...dueWords].sort(() => Math.random() - 0.5).slice(0, 20);
    setReviewQueue(q);
    setReviewIdx(0);
    setFlipped(false);
    setReviewing(true);
  }

  function rate(quality: 0 | 4 | 5, label: string) {
    const w = reviewQueue[reviewIdx];
    if (!w) return;
    reviewWord(w.id, quality);
    toast({ title: label });
    if (reviewIdx < reviewQueue.length - 1) {
      setFlipped(false);
      setReviewIdx((i) => i + 1);
    } else {
      setReviewing(false);
    }
  }

  if (isLoading || !hasHydrated) return <LoadingState label="Loading revision…" />;

  if (reviewing) {
    const w = reviewQueue[reviewIdx];
    if (!w) {
      setReviewing(false);
      return null;
    }
    return (
      <div className="mx-auto max-w-xl space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Review <span className="font-semibold text-foreground">{reviewIdx + 1}</span> of {reviewQueue.length}
          </span>
          <Button variant="ghost" size="sm" onClick={() => setReviewing(false)}>
            Exit
          </Button>
        </div>
        <Progress value={((reviewIdx + 1) / reviewQueue.length) * 100} />

        <div
          className="relative cursor-pointer [perspective:1600px]"
          onClick={() => setFlipped((f) => !f)}
        >
          <div
            className={cn(
              "relative h-72 w-full transition-transform duration-500 [transform-style:preserve-3d]",
              flipped && "[transform:rotateY(180deg)]"
            )}
          >
            <div className="absolute inset-0 [backface-visibility:hidden]">
              <Card className="flex h-full flex-col items-center justify-center gap-3 border-2 p-6 text-center">
                <DifficultyBadge difficulty={w.difficulty} />
                <h2 className="text-4xl font-bold">{w.word}</h2>
                {w.phonetic && <p className="font-mono text-sm text-muted-foreground">{w.phonetic}</p>}
                {speechSupported() && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      speak(w.word);
                    }}
                  >
                    Pronounce
                  </Button>
                )}
                <p className="text-xs text-muted-foreground">Click to reveal</p>
              </Card>
            </div>
            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <Card className="flex h-full flex-col justify-center gap-2 border-2 p-6">
                <p className="text-2xl font-semibold"><BengaliText>{w.bengali}</BengaliText></p>
                <p className="text-sm">{w.definition}</p>
                {w.example && <p className="rounded-md bg-muted/60 p-2 text-sm italic">&ldquo;{w.example}&rdquo;</p>}
              </Card>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <Button variant="outline" size="sm" onClick={() => rate(0, "Again — reset")} className="text-rose-600">
            Again
          </Button>
          <Button variant="outline" size="sm" onClick={() => rate(4, "Good — recalled")} className="text-emerald-600">
            Good
          </Button>
          <Button variant="outline" size="sm" onClick={() => rate(5, "Easy")}>
            Easy
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Due review */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base">
            <span className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-amber-600" /> Daily review
            </span>
            <Badge variant="secondary" className="tabular-nums">{dueWords.length} due</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Spaced repetition brings words back right when you&apos;re about to forget them. Review
            your due words to keep them in long-term memory.
          </p>
          <Button onClick={startReview} disabled={dueWords.length === 0} className="w-full gap-2">
            <BookOpenCheck className="h-4 w-4" />
            {dueWords.length === 0 ? "All caught up!" : `Review ${Math.min(dueWords.length, 20)} due words`}
          </Button>
        </CardContent>
      </Card>

      {/* Mastery summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Mastery summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-3 text-center">
          <SummaryStat label="Learned" value={learnedWords.length} color="text-emerald-600" />
          <SummaryStat label="Due" value={dueWords.length} color="text-amber-600" />
          <SummaryStat label="Difficult" value={difficultWords.length} color="text-rose-600" />
        </CardContent>
      </Card>

      {/* Difficult words */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Star className="h-4 w-4 text-rose-600" /> Difficult words
            <Badge variant="secondary" className="tabular-nums">{difficultWords.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {difficultWords.length === 0 ? (
            <EmptyState
              title="No difficult words yet"
              description="Mark words as difficult during quizzes to revisit them here."
              icon={Star}
            />
          ) : (
            <ul className="max-h-96 space-y-2 overflow-y-auto pr-1">
              {difficultWords.map((w) => (
                <li
                  key={w.id}
                  className="flex items-center justify-between gap-2 rounded-lg border p-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold">{w.word}</span>
                      <span className="truncate text-sm"><BengaliText>{w.bengali}</BengaliText></span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <DifficultyBadge difficulty={w.difficulty} />
                      {srs[w.id] && <span>{describeDue(srs[w.id])}</span>}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => toggleDifficult(w.id)}
                    aria-label={`Remove ${w.word} from difficult`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryStat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="rounded-lg bg-muted/50 p-3">
      <p className={cn("text-2xl font-bold tabular-nums", color)}>{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
