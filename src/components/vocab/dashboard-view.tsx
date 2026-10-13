"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  CheckCircle2,
  Flame,
  Star,
  Trophy,
  TrendingUp,
  CalendarClock,
  RotateCcw,
} from "lucide-react";
import { useWordBank } from "@/lib/vocab/hooks";
import { useVocabStore } from "@/lib/vocab/store";
import { isDue } from "@/lib/vocab/srs";
import { EmptyState, LoadingState } from "./ui-bits";
import { cn } from "@/lib/utils";

export function DashboardView({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { words, isLoading } = useWordBank();
  const srs = useVocabStore((s) => s.srs);
  const manualMark = useVocabStore((s) => s.manualMark);
  const difficultMap = useVocabStore((s) => s.difficult);
  const quizHistory = useVocabStore((s) => s.quizHistory);
  const reviewLog = useVocabStore((s) => s.reviewLog);
  const resetProgress = useVocabStore((s) => s.resetProgress);
  const hasHydrated = useVocabStore((s) => s.hasHydrated);

  const stats = useMemo(() => {
    const total = words.length;
    const learned = words.filter((w) => {
      const s = srs[w.id];
      return manualMark[w.id] === "known" || (s && s.status === "known");
    }).length;
    const due = words.filter((w) => {
      const s = srs[w.id];
      return !s || isDue(s);
    }).length;
    const difficult = words.filter((w) => difficultMap[w.id]).length;
    const practiced = words.filter((w) => srs[w.id] && srs[w.id].lastReviewed).length;
    return { total, learned, due, difficult, practiced };
  }, [words, srs, manualMark, difficultMap]);

  const examProgress = useMemo(() => {
    const exams = ["IELTS", "TOEFL", "GRE", "SAT", "BCS", "Admission"] as const;
    return exams.map((e) => {
      const pool = words.filter((w) => w.exams.includes(e));
      const learned = pool.filter((w) => {
        const s = srs[w.id];
        return manualMark[w.id] === "known" || (s && s.status === "known");
      }).length;
      return { exam: e, total: pool.length, learned };
    });
  }, [words, srs, manualMark]);

  const recentQuizzes = useMemo(() => [...quizHistory].reverse().slice(0, 5), [quizHistory]);

  const streak = useMemo(() => {
    // count distinct days in reviewLog + quizHistory, recent-first contiguous
    const days = new Set<string>();
    [...reviewLog.map((r) => r.ts), ...quizHistory.map((q) => q.date)].forEach((ts) => {
      const d = new Date(ts);
      days.add(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`);
    });
    if (!days.size) return 0;
    let streakCount = 0;
    const cursor = new Date();
    while (true) {
      const key = `${cursor.getFullYear()}-${cursor.getMonth()}-${cursor.getDate()}`;
      if (days.has(key)) {
        streakCount++;
        cursor.setDate(cursor.getDate() - 1);
      } else break;
    }
    return streakCount;
  }, [reviewLog, quizHistory]);

  if (isLoading || !hasHydrated) return <LoadingState label="Loading your dashboard…" />;

  const learnedPct = stats.total ? Math.round((stats.learned / stats.total) * 100) : 0;

  return (
    <div className="space-y-5">
      {/* Hero stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <HeroStat
          icon={BookOpen}
          label="Total words"
          value={stats.total}
          tint="text-sky-600 bg-sky-500/10"
        />
        <HeroStat
          icon={CheckCircle2}
          label="Learned"
          value={stats.learned}
          hint={`${learnedPct}%`}
          tint="text-emerald-600 bg-emerald-500/10"
        />
        <HeroStat
          icon={CalendarClock}
          label="Due now"
          value={stats.due}
          tint="text-amber-600 bg-amber-500/10"
        />
        <HeroStat
          icon={Star}
          label="Difficult"
          value={stats.difficult}
          tint="text-rose-600 bg-rose-500/10"
        />
      </div>

      {/* Overall progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base">
            <span className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" /> Overall mastery
            </span>
            <span className="text-sm font-normal text-muted-foreground">
              {stats.learned} / {stats.total}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Progress value={learnedPct} className="h-3" />
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-lg bg-muted/50 p-2">
              <p className="text-muted-foreground">Practiced</p>
              <p className="font-bold tabular-nums">{stats.practiced}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-2">
              <p className="text-muted-foreground">Quizzes taken</p>
              <p className="font-bold tabular-nums">{quizHistory.length}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-2">
              <p className="text-muted-foreground flex items-center justify-center gap-1">
                <Flame className="h-3 w-3" /> Day streak
              </p>
              <p className="font-bold tabular-nums">{streak}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Button
          variant="outline"
          className="h-auto justify-start gap-3 py-4"
          onClick={() => onNavigate("flashcards")}
        >
          <BookOpen className="h-5 w-5 text-primary" />
          <span className="text-left text-sm">
            <span className="block font-semibold">Study flashcards</span>
            <span className="text-xs text-muted-foreground">{stats.due} due now</span>
          </span>
        </Button>
        <Button
          variant="outline"
          className="h-auto justify-start gap-3 py-4"
          onClick={() => onNavigate("quizzes")}
        >
          <Trophy className="h-5 w-5 text-amber-600" />
          <span className="text-left text-sm">
            <span className="block font-semibold">Take a quiz</span>
            <span className="text-xs text-muted-foreground">6 quiz types</span>
          </span>
        </Button>
        <Button
          variant="outline"
          className="h-auto col-span-2 justify-start gap-3 py-4 sm:col-span-1"
          onClick={() => onNavigate("revision")}
        >
          <Star className="h-5 w-5 text-rose-600" />
          <span className="text-left text-sm">
            <span className="block font-semibold">Review difficult</span>
            <span className="text-xs text-muted-foreground">{stats.difficult} saved</span>
          </span>
        </Button>
      </div>

      {/* Exam breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Progress by exam</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {examProgress.map((row) => {
            const pct = row.total ? Math.round((row.learned / row.total) * 100) : 0;
            return (
              <div key={row.exam} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{row.exam}</span>
                  <span className="text-muted-foreground">
                    {row.learned}/{row.total}
                  </span>
                </div>
                <Progress value={pct} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Recent quizzes */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Recent quiz results</CardTitle>
        </CardHeader>
        <CardContent>
          {recentQuizzes.length === 0 ? (
            <EmptyState
              title="No quizzes yet"
              description="Take your first quiz to see results here."
              action={
                <Button size="sm" onClick={() => onNavigate("quizzes")}>
                  Start a quiz
                </Button>
              }
            />
          ) : (
            <ul className="space-y-2">
              {recentQuizzes.map((q) => {
                const pct = Math.round((q.correct / q.total) * 100);
                return (
                  <li
                    key={q.id}
                    className="flex items-center justify-between rounded-lg border p-3 text-sm"
                  >
                    <div>
                      <p className="font-medium capitalize">{q.type.replace(/-/g, " ")}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(q.date).toLocaleString()}
                      </p>
                    </div>
                    <Badge
                      variant={pct >= 70 ? "default" : "secondary"}
                      className={cn(
                        "tabular-nums",
                        pct >= 70
                          ? "bg-emerald-600 text-white"
                          : pct >= 50
                            ? "bg-amber-500 text-white"
                            : "bg-rose-500 text-white"
                      )}
                    >
                      {q.correct}/{q.total} · {pct}%
                    </Badge>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Danger zone */}
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive"
          onClick={() => {
            if (confirm("Reset all progress? Your imported words stay, but reviews & quiz history will be cleared.")) {
              resetProgress();
            }
          }}
        >
          <RotateCcw className="mr-1 h-3.5 w-3.5" /> Reset progress
        </Button>
      </div>
    </div>
  );
}

function HeroStat({
  icon: Icon,
  label,
  value,
  hint,
  tint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  hint?: string;
  tint: string;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{label}</span>
          <span className={cn("rounded-md p-1", tint)}>
            <Icon className="h-3.5 w-3.5" />
          </span>
        </div>
        <p className="mt-1 text-2xl font-bold tabular-nums">
          {value}
          {hint && <span className="ml-1 text-xs font-normal text-muted-foreground">{hint}</span>}
        </p>
      </CardContent>
    </Card>
  );
}
