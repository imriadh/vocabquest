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
import { Progress } from "@/components/ui/progress";
import {
  Search,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Lightbulb,
  GraduationCap,
  RotateCcw,
  Trophy,
} from "lucide-react";
import {
  allReadingPassages,
  readingPassageCount,
  readingStageLabels,
  readingStageSkills,
  questionTypeLabels,
} from "@/lib/reading/data";
import type { ReadingPassage, ReadingQuestion, ReadingStage } from "@/lib/reading/types";
import { isReadingAnswerCorrect } from "@/lib/reading/evaluate";
import { useVocabStore } from "@/lib/vocab/store";
import { useWordBank } from "@/lib/vocab/hooks";
import { grammarLessons } from "@/lib/grammar/lessons-data";
import { BengaliText, EmptyState } from "@/components/vocab/ui-bits";
import { cn } from "@/lib/utils";

export function ReadingView({
  onOpenGrammar,
}: {
  onOpenGrammar?: (lessonId: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const readingPassages = useVocabStore((s) => s.readingPassages);
  const readingAttempts = useVocabStore((s) => s.readingAttempts);
  const hasHydrated = useVocabStore((s) => s.hasHydrated);

  const openPassage = openId ? allReadingPassages.find((p) => p.id === openId) : null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allReadingPassages.filter((p) => {
      if (stage !== "all" && p.stage !== Number(stage)) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.topic.toLowerCase().includes(q) ||
        p.passage.toLowerCase().includes(q)
      );
    });
  }, [query, stage]);

  const byStage = useMemo(() => {
    const groups: Record<number, ReadingPassage[]> = { 1: [], 2: [], 3: [], 4: [], 5: [] };
    for (const p of allReadingPassages) groups[p.stage]?.push(p);
    return groups;
  }, []);

  const completedCount = Object.keys(readingPassages).length;
  const totalAttempts = readingAttempts.length;
  const correctAttempts = readingAttempts.filter((a) => a.correct).length;
  const accuracy = totalAttempts ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

  // Accuracy by question type.
  const byType = useMemo(() => {
    const map = new Map<string, { correct: number; total: number }>();
    for (const a of readingAttempts) {
      const e = map.get(a.questionType) ?? { correct: 0, total: 0 };
      e.total += 1;
      if (a.correct) e.correct += 1;
      map.set(a.questionType, e);
    }
    return [...map.entries()].map(([type, v]) => ({
      type,
      label: questionTypeLabels[type as keyof typeof questionTypeLabels] ?? type,
      correct: v.correct,
      total: v.total,
      accuracy: v.total ? Math.round((v.correct / v.total) * 100) : 0,
    }));
  }, [readingAttempts]);

  if (openPassage) {
    return (
      <PassageView
        passage={openPassage}
        onBack={() => setOpenId(null)}
        onOpenGrammar={onOpenGrammar}
      />
    );
  }

  const showPaths = !query && stage === "all";

  return (
    <div className="space-y-5">
      {/* Progress summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <HeroStat icon={BookOpen} label="Passages" value={readingPassageCount} tint="bg-sky-500/10 text-sky-600" />
        <HeroStat
          icon={CheckCircle2}
          label="Completed"
          value={completedCount}
          hint={hasHydrated ? `${Math.round((completedCount / readingPassageCount) * 100)}%` : undefined}
          tint="bg-emerald-500/10 text-emerald-600"
        />
        <HeroStat icon={Trophy} label="Accuracy" value={accuracy} hint="%" tint="bg-amber-500/10 text-amber-600" />
        <HeroStat icon={Clock} label="Attempts" value={totalAttempts} tint="bg-violet-500/10 text-violet-600" />
      </div>

      {/* Accuracy by question type */}
      {hasHydrated && byType.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Accuracy by question type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {byType.map((t) => (
              <div key={t.type} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{t.label}</span>
                  <span className="text-muted-foreground">
                    {t.correct}/{t.total} · {t.accuracy}%
                  </span>
                </div>
                <Progress value={t.accuracy} className="h-1.5" />
              </div>
            ))}
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
                placeholder="Search passages by title, topic, or content…"
                className="pl-9"
                aria-label="Search reading passages"
              />
            </div>
            <Select value={stage} onValueChange={setStage}>
              <SelectTrigger aria-label="Filter by stage" className="sm:w-56">
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All stages</SelectItem>
                {[1, 2, 3, 4, 5].map((s) => (
                  <SelectItem key={s} value={String(s)}>
                    Stage {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Passage list */}
      {filtered.length === 0 ? (
        <EmptyState title="No passages match" description="Try a different search term or stage." icon={Search} />
      ) : showPaths ? (
        <div className="space-y-6">
          {([1, 2, 3, 4, 5] as ReadingStage[]).map((s) =>
            byStage[s].length ? (
              <div key={s}>
                <div className="mb-2 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold">{readingStageLabels[s]}</h3>
                  <Badge variant="outline" className="text-[10px]">{byStage[s].length}</Badge>
                </div>
                <p className="mb-3 text-xs text-muted-foreground">{readingStageSkills[s]}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {byStage[s].map((p) => (
                    <PassageCard
                      key={p.id}
                      passage={p}
                      completed={!!readingPassages[p.id]}
                      accuracy={readingPassages[p.id]?.accuracy}
                      onOpen={() => setOpenId(p.id)}
                    />
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((p) => (
            <PassageCard
              key={p.id}
              passage={p}
              completed={!!readingPassages[p.id]}
              accuracy={readingPassages[p.id]?.accuracy}
              onOpen={() => setOpenId(p.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PassageCard({
  passage,
  completed,
  accuracy,
  onOpen,
}: {
  passage: ReadingPassage;
  completed: boolean;
  accuracy?: number;
  onOpen: () => void;
}) {
  return (
    <Card className="cursor-pointer transition-colors hover:bg-muted/40" onClick={onOpen}>
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="secondary" className="text-[10px]">Stage {passage.stage}</Badge>
          <Badge variant="outline" className="text-[10px] capitalize">{passage.difficulty}</Badge>
          <Badge variant="outline" className="text-[10px]">{passage.topic}</Badge>
          {completed && (
            <Badge className="bg-emerald-600 text-[10px] text-white">
              Done{accuracy !== undefined ? ` · ${Math.round(accuracy * 100)}%` : ""}
            </Badge>
          )}
        </div>
        <h4 className="mt-1.5 font-semibold leading-tight">{passage.title}</h4>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{passage.skillFocus}</p>
        <p className="mt-2 text-[10px] text-muted-foreground">
          {passage.questions.length} questions · ~{passage.estimatedMinutes} min
        </p>
      </CardContent>
    </Card>
  );
}

// =========================================================================
// Passage View — passage text + questions + feedback + evidence
// =========================================================================
function PassageView({
  passage,
  onBack,
  onOpenGrammar,
}: {
  passage: ReadingPassage;
  onBack: () => void;
  onOpenGrammar?: (lessonId: string) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const recordReadingAttempt = useVocabStore((s) => s.recordReadingAttempt);
  const completeReadingPassage = useVocabStore((s) => s.completeReadingPassage);
  const { words } = useWordBank();

  const paragraphs = passage.passage.split("\n\n").filter(Boolean);

  // Related vocab words.
  const relatedWords = useMemo(() => {
    if (!passage.relatedVocabIds?.length) return [];
    return words.filter((w) => passage.relatedVocabIds!.includes(w.id)).slice(0, 5);
  }, [passage, words]);

  // Related grammar lessons.
  const relatedLessons = useMemo(() => {
    if (!passage.relatedGrammarLessonIds?.length) return [];
    return grammarLessons.filter((l) => passage.relatedGrammarLessonIds!.includes(l.id));
  }, [passage]);

  const allChecked = passage.questions.every((q) => checked[q.id] !== undefined);
  const correctCount = passage.questions.filter((q) => checked[q.id] === true).length;
  const progress = (Object.keys(checked).length / passage.questions.length) * 100;

  function checkOne(q: ReadingQuestion) {
    const learner = answers[q.id] ?? "";
    if (!learner.trim()) return;
    const correct = isReadingAnswerCorrect(q, learner);
    setChecked((c) => ({ ...c, [q.id]: correct }));
    recordReadingAttempt({
      passageId: passage.id,
      questionId: q.id,
      questionType: q.type,
      stage: passage.stage,
      difficulty: passage.difficulty,
      correct,
    });
  }

  function submitAll() {
    const acc = correctCount / passage.questions.length;
    completeReadingPassage(passage.id, acc);
    setSubmitted(true);
  }

  function retryAll() {
    setAnswers({});
    setChecked({});
    setSubmitted(false);
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div className="flex items-center justify-between gap-2">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-1">
          <ArrowLeft className="h-4 w-4" /> All passages
        </Button>
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="secondary">Stage {passage.stage}</Badge>
          <Badge variant="outline" className="capitalize">{passage.difficulty}</Badge>
          <Badge variant="outline">{passage.topic}</Badge>
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" /> {passage.estimatedMinutes} min
          </Badge>
        </div>
      </div>

      {/* Intro / skill focus */}
      <Card>
        <CardContent className="p-4">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
            <Lightbulb className="h-3.5 w-3.5" /> Skill focus: {passage.skillFocus}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{passage.intro}</p>
        </CardContent>
      </Card>

      {/* Passage text */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{passage.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            {paragraphs.map((para, i) => (
              <p key={i} className="mb-3 text-sm leading-relaxed last:mb-0">
                {para}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Related vocab + grammar */}
      {(relatedWords.length > 0 || relatedLessons.length > 0) && (
        <div className="grid gap-3 sm:grid-cols-2">
          {relatedWords.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-4 w-4 text-primary" /> Key vocabulary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {relatedWords.map((w) => (
                    <li key={w.id} className="flex items-baseline justify-between gap-2 text-sm">
                      <span className="font-medium">{w.word}</span>
                      <BengaliText className="text-muted-foreground">{w.bengali}</BengaliText>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          {relatedLessons.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-violet-600" /> Related grammar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {relatedLessons.map((l) => (
                    <li key={l.id}>
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 text-sm"
                        onClick={() => onOpenGrammar?.(l.id)}
                      >
                        {l.title}
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Questions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base">
            <span>Questions ({passage.questions.length})</span>
            {allChecked && (
              <Button variant="ghost" size="sm" onClick={retryAll} className="gap-1">
                <RotateCcw className="h-3.5 w-3.5" /> Retry
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={progress} className="h-2" />
          {passage.questions.map((q, idx) => (
            <QuestionCard
              key={q.id}
              index={idx + 1}
              question={q}
              value={answers[q.id] ?? ""}
              onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
              checked={checked[q.id]}
              onCheck={() => checkOne(q)}
              onCheckWithValue={(v) => {
                setAnswers((a) => ({ ...a, [q.id]: v }));
                const correct = isReadingAnswerCorrect(q, v);
                setChecked((c) => ({ ...c, [q.id]: correct }));
                recordReadingAttempt({
                  passageId: passage.id,
                  questionId: q.id,
                  questionType: q.type,
                  stage: passage.stage,
                  difficulty: passage.difficulty,
                  correct,
                });
              }}
            />
          ))}

          {allChecked && !submitted && (
            <div className="flex justify-end">
              <Button onClick={submitAll} className="gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> Submit & save
              </Button>
            </div>
          )}

          {submitted && (
            <div className="rounded-lg border bg-muted/40 p-4 text-center">
              <p className="text-sm">
                You scored{" "}
                <span className="font-bold">
                  {correctCount}/{passage.questions.length}
                </span>{" "}
                ({Math.round((correctCount / passage.questions.length) * 100)}%)
              </p>
              <Button variant="outline" onClick={onBack} className="mt-3 gap-1">
                Back to passages <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function QuestionCard({
  index,
  question,
  value,
  onChange,
  checked,
  onCheck,
  onCheckWithValue,
}: {
  index: number;
  question: ReadingQuestion;
  value: string;
  onChange: (v: string) => void;
  checked: boolean | undefined;
  onCheck: () => void;
  onCheckWithValue?: (v: string) => void;
}) {
  const isCorrect = checked === true;
  const isWrong = checked === false;
  const isChoice = !!question.options;

  return (
    <div
      className={cn(
        "rounded-lg border p-3 transition-colors",
        isCorrect && "border-emerald-500 bg-emerald-500/5",
        isWrong && "border-rose-500 bg-rose-500/5"
      )}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="text-sm font-medium">
          <span className="mr-1.5 text-muted-foreground">{index}.</span>
          {question.prompt}
        </p>
        <Badge variant="outline" className="shrink-0 text-[10px]">
          {questionTypeLabels[question.type]}
        </Badge>
      </div>

      {isChoice && question.options ? (
        <div className="grid gap-1.5">
          {question.options.map((opt) => {
            const selected = value === opt;
            const correct = opt === question.answer;
            const state = checked === undefined ? "idle" : correct ? "correct" : selected ? "wrong" : "dim";
            return (
              <button
                key={opt}
                disabled={checked !== undefined}
                onClick={() => {
                  onChange(opt);
                  if (checked === undefined && onCheckWithValue) onCheckWithValue(opt);
                }}
                className={cn(
                  "rounded-md border p-2 text-left text-sm transition-colors",
                  state === "idle" && (selected ? "border-primary bg-primary/5" : "hover:bg-muted/50"),
                  state === "correct" && "border-emerald-500 bg-emerald-500/10",
                  state === "wrong" && "border-rose-500 bg-rose-500/10",
                  state === "dim" && "opacity-50"
                )}
              >
                {opt}
                {state === "correct" && <Check className="ml-2 inline h-3.5 w-3.5 text-emerald-600" />}
                {state === "wrong" && <X className="ml-2 inline h-3.5 w-3.5 text-rose-600" />}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={checked !== undefined}
            placeholder="Type your answer…"
            className="text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter" && checked === undefined) {
                e.preventDefault();
                if (value.trim()) onCheck();
              }
            }}
          />
          {checked === undefined && value.trim() && (
            <Button size="sm" onClick={onCheck}>Check answer</Button>
          )}
        </div>
      )}

      {checked !== undefined && (
        <div className="mt-2 rounded-md bg-muted/60 p-2 text-sm">
          <p className="flex items-center gap-1.5 font-semibold">
            {isCorrect ? (
              <><Check className="h-4 w-4 text-emerald-600" /> Correct</>
            ) : (
              <><X className="h-4 w-4 text-rose-600" /> Not quite</>
            )}
          </p>
          {!isCorrect && (
            <p className="mt-1 text-foreground/90">
              <span className="text-muted-foreground">Answer: </span>
              {question.answer}
            </p>
          )}
          <p className="mt-1 text-muted-foreground">{question.explanation}</p>
          <div className="mt-2 rounded-md border border-dashed bg-background p-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Evidence from the passage
            </p>
            <p className="mt-0.5 text-sm italic text-foreground/90">“{question.evidence}”</p>
          </div>
        </div>
      )}
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
