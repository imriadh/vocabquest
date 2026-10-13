"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  GraduationCap,
  Sparkles,
  RotateCcw,
  Trophy,
} from "lucide-react";
import {
  grammarLessons,
  grammarLessonCount,
  grammarLevelLabels,
} from "@/lib/grammar/lessons-data";
import type { GrammarLesson, GrammarLevel } from "@/lib/grammar/types";
import { useVocabStore } from "@/lib/vocab/store";
import {
  getRecommendedLesson,
  getReviewQueue,
  getStrongestTopics,
  getWeakestTopics,
  getAccuracyTrend,
} from "@/lib/grammar/stats";
import { LessonView } from "./lesson-view";
import { EmptyState } from "@/components/vocab/ui-bits";
import { cn } from "@/lib/utils";

export function GrammarView({
  onNavigate,
  pendingLessonId,
  onConsumedPending,
}: {
  onNavigate?: (tab: string) => void;
  pendingLessonId?: string | null;
  onConsumedPending?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const grammarLessonsState = useVocabStore((s) => s.grammarLessons);
  const grammarAttempts = useVocabStore((s) => s.grammarAttempts);
  const errorCategories = useVocabStore((s) => s.grammarErrorCategories);
  const hasHydrated = useVocabStore((s) => s.hasHydrated);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return grammarLessons.filter((l) => {
      if (level !== "all" && l.level !== level) return false;
      if (!q) return true;
      return (
        l.title.toLowerCase().includes(q) ||
        l.topic.toLowerCase().includes(q) ||
        (l.subtopic?.toLowerCase().includes(q) ?? false) ||
        l.objectives.some((o) => o.toLowerCase().includes(q))
      );
    });
  }, [query, level]);

  // Group by level for the path view when no search/filter.
  const byLevel = useMemo(() => {
    const groups: Record<string, GrammarLesson[]> = { A: [], B: [], C: [], D: [] };
    for (const l of grammarLessons) groups[l.level]?.push(l);
    return groups;
  }, []);

  const completedCount = Object.keys(grammarLessonsState).length;
  const totalAttempts = grammarAttempts.length;
  const correctAttempts = grammarAttempts.filter((a) => a.correct).length;
  const accuracy = totalAttempts ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

  // Personalised analytics (Milestone 3).
  const recommended = useMemo(
    () => getRecommendedLesson(grammarLessons, grammarLessonsState, grammarAttempts),
    [grammarLessonsState, grammarAttempts]
  );
  const reviewQueue = useMemo(
    () => getReviewQueue(grammarLessons, grammarLessonsState),
    [grammarLessonsState]
  );
  const strongest = useMemo(
    () => getStrongestTopics(grammarAttempts),
    [grammarAttempts]
  );
  const weakest = useMemo(
    () => getWeakestTopics(grammarAttempts),
    [grammarAttempts]
  );
  const trend = useMemo(
    () => getAccuracyTrend(grammarAttempts, 14),
    [grammarAttempts]
  );

  // A pending lesson id (from another tab, e.g. AI feedback) takes precedence
  // over the locally-tracked openId until consumed.
  const effectiveOpenId = pendingLessonId ?? openId;
  const openLesson = effectiveOpenId
    ? grammarLessons.find((l) => l.id === effectiveOpenId)
    : null;

  if (openLesson) {
    return (
      <LessonView
        lesson={openLesson}
        onBack={() => {
          setOpenId(null);
          onConsumedPending?.();
        }}
        onOpenLibrary={onNavigate ? () => onNavigate("library") : undefined}
      />
    );
  }

  const showPaths = !query && level === "all";

  return (
    <div className="space-y-5">
      {/* Progress summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <HeroStat
          icon={BookOpen}
          label="Lessons"
          value={grammarLessonCount}
          tint="bg-sky-500/10 text-sky-600"
        />
        <HeroStat
          icon={CheckCircle2}
          label="Completed"
          value={completedCount}
          hint={hasHydrated ? `${Math.round((completedCount / grammarLessonCount) * 100)}%` : undefined}
          tint="bg-emerald-500/10 text-emerald-600"
        />
        <HeroStat
          icon={TrendingUp}
          label="Accuracy"
          value={accuracy}
          hint="%"
          tint="bg-amber-500/10 text-amber-600"
        />
        <HeroStat
          icon={AlertTriangle}
          label="Error types"
          value={Object.keys(errorCategories).length}
          tint="bg-rose-500/10 text-rose-600"
        />
      </div>

      {/* Recommended next lesson — the core learning-loop driver */}
      {hasHydrated && recommended && (
        <Card
          className="cursor-pointer border-primary/40 bg-primary/5 transition-colors hover:bg-primary/10"
          onClick={() => setOpenId(recommended.lesson.id)}
        >
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Recommended next
              </p>
              <p className="truncate font-semibold leading-tight">
                {recommended.lesson.title}
              </p>
              <p className="text-xs text-muted-foreground">{recommended.reason}</p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-primary" />
          </CardContent>
        </Card>
      )}

      {/* Diagnostics grid: review queue + strongest/weakest + trend */}
      {hasHydrated && totalAttempts > 0 && (
        <div className="grid gap-3 md:grid-cols-2">
          {/* Review queue */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <RotateCcw className="h-4 w-4 text-amber-600" /> Review queue
                {reviewQueue.length > 0 && (
                  <Badge variant="secondary" className="tabular-nums">{reviewQueue.length}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {reviewQueue.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nothing to review right now. Lessons you score below 70% on will appear here.
                </p>
              ) : (
                <ul className="space-y-2">
                  {reviewQueue.slice(0, 4).map((r) => (
                    <li
                      key={r.lesson.id}
                      className="flex cursor-pointer items-center justify-between gap-2 rounded-md border p-2 text-sm hover:bg-muted/50"
                      onClick={() => setOpenId(r.lesson.id)}
                    >
                      <span className="min-w-0 truncate">{r.lesson.title}</span>
                      <Badge variant="secondary" className="bg-amber-500/15 text-amber-700 tabular-nums dark:text-amber-300">
                        {Math.round(r.accuracy * 100)}%
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Strongest + weakest topics */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Trophy className="h-4 w-4 text-emerald-600" /> Topic mastery
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Strongest
                </p>
                {strongest.length === 0 ? (
                  <p className="text-xs text-muted-foreground">
                    Practise a few more exercises to see your strongest topics.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {strongest.map((t) => (
                      <Badge key={t.topic} variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                        {t.topic} · {Math.round(t.accuracy * 100)}%
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Needs work
                </p>
                {weakest.length === 0 ? (
                  <p className="text-xs text-muted-foreground">
                    No weak spots detected yet. Keep practising!
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {weakest.map((t) => (
                      <Badge key={t.topic} variant="secondary" className="bg-rose-500/10 text-rose-700 dark:text-rose-300">
                        {t.topic} · {Math.round(t.accuracy * 100)}%
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Accuracy trend sparkline */}
      {hasHydrated && trend.length >= 3 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-sky-600" /> Recent accuracy
              <span className="text-xs font-normal text-muted-foreground">
                last {trend.length} answers
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-12 items-end gap-1">
              {trend.map((p, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex-1 rounded-sm",
                    p.correct ? "bg-emerald-500/70" : "bg-rose-500/70"
                  )}
                  style={{ height: p.correct ? "100%" : "45%" }}
                  title={p.correct ? "Correct" : "Incorrect"}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Green bars are correct answers. A consistent run of green shows steady accuracy.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Search + filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search lessons by title or topic…"
                className="pl-9"
                aria-label="Search grammar lessons"
              />
            </div>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger aria-label="Filter by level" className="sm:w-64">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All levels</SelectItem>
                <SelectItem value="A">Level A — Foundations</SelectItem>
                <SelectItem value="B">Level B — Essential IELTS</SelectItem>
                <SelectItem value="C">Level C — Writing Development</SelectItem>
                <SelectItem value="D">Level D — Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lesson list */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No lessons match"
          description="Try a different search term or level."
          icon={Search}
        />
      ) : showPaths ? (
        <div className="space-y-6">
          {(["A", "B", "C", "D"] as GrammarLevel[]).map((lv) =>
            byLevel[lv].length ? (
              <div key={lv}>
                <div className="mb-2 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold">{grammarLevelLabels[lv]}</h3>
                  <Badge variant="outline" className="text-[10px]">{byLevel[lv].length}</Badge>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {byLevel[lv].map((l) => (
                    <LessonCard
                      key={l.id}
                      lesson={l}
                      completed={!!grammarLessonsState[l.id]}
                      accuracy={grammarLessonsState[l.id]?.accuracy}
                      onOpen={() => setOpenId(l.id)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div key={lv}>
                <div className="mb-2 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    {grammarLevelLabels[lv]}
                  </h3>
                  <Badge variant="outline" className="text-[10px]">Coming soon</Badge>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((l) => (
            <LessonCard
              key={l.id}
              lesson={l}
              completed={!!grammarLessonsState[l.id]}
              accuracy={grammarLessonsState[l.id]?.accuracy}
              onOpen={() => setOpenId(l.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function LessonCard({
  lesson,
  completed,
  accuracy,
  onOpen,
}: {
  lesson: GrammarLesson;
  completed: boolean;
  accuracy?: number;
  onOpen: () => void;
}) {
  return (
    <Card
      className="cursor-pointer transition-colors hover:bg-muted/40"
      onClick={onOpen}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge variant="secondary" className="text-[10px]">{lesson.cefrLevel}</Badge>
              <Badge variant="outline" className="text-[10px]">{lesson.topic}</Badge>
              {completed && (
                <Badge className="bg-emerald-600 text-[10px] text-white">
                  Done{accuracy !== undefined ? ` · ${Math.round(accuracy * 100)}%` : ""}
                </Badge>
              )}
            </div>
            <h4 className="mt-1.5 font-semibold leading-tight">{lesson.title}</h4>
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
              {lesson.objectives[0]}
            </p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        </div>
        <p className="mt-2 text-[10px] text-muted-foreground">
          {lesson.exercises.length} exercises · {lesson.estimatedMinutes} min
        </p>
      </CardContent>
    </Card>
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
