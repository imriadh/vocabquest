"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Check,
  X,
  Lightbulb,
  AlertTriangle,
  BookOpen,
  Target,
  Clock,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import type { GrammarLesson, GrammarExercise } from "@/lib/grammar/types";
import { isAnswerCorrect, exerciseTypeLabel } from "@/lib/grammar/evaluate";
import { useVocabStore } from "@/lib/vocab/store";
import { useToast } from "@/hooks/use-toast";
import { BengaliText } from "@/components/vocab/ui-bits";
import { cn } from "@/lib/utils";

export function LessonView({
  lesson,
  onBack,
}: {
  lesson: GrammarLesson;
  onBack: () => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const recordGrammarAttempt = useVocabStore((s) => s.recordGrammarAttempt);
  const completeGrammarLesson = useVocabStore((s) => s.completeGrammarLesson);
  const { toast } = useToast();

  const allChecked = lesson.exercises.every((ex) => checked[ex.id] !== undefined);
  const correctCount = lesson.exercises.filter((ex) => checked[ex.id] === true).length;
  const progress = (Object.keys(checked).length / lesson.exercises.length) * 100;

  function check(ex: GrammarExercise) {
    const learner = answers[ex.id] ?? "";
    if (!learner.trim()) {
      toast({ title: "Enter an answer first", variant: "destructive" });
      return;
    }
    const correct = isAnswerCorrect(ex, learner);
    setChecked((c) => ({ ...c, [ex.id]: correct }));
    recordGrammarAttempt({
      lessonId: lesson.id,
      exerciseId: ex.id,
      topic: lesson.topic,
      correct,
    });
  }

  function finish() {
    const acc = correctCount / lesson.exercises.length;
    completeGrammarLesson(lesson.id, acc);
    toast({
      title: acc >= 0.7 ? "Lesson complete!" : "Keep practising",
      description: `You scored ${correctCount}/${lesson.exercises.length} (${Math.round(acc * 100)}%).`,
    });
    onBack();
  }

  function retryAll() {
    setAnswers({});
    setChecked({});
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="flex items-center justify-between gap-2">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-1">
          <ArrowLeft className="h-4 w-4" /> All lessons
        </Button>
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="secondary">{lesson.cefrLevel}</Badge>
          <Badge variant="outline">{lesson.topic}</Badge>
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" /> {lesson.estimatedMinutes} min
          </Badge>
        </div>
      </div>

      {/* Explanation */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">{lesson.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-2">
            <Target className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Learning objectives
              </p>
              <ul className="mt-1 list-inside list-disc space-y-0.5 text-sm">
                {lesson.objectives.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-sm leading-relaxed">{lesson.explanation}</p>

          {lesson.bengaliExplanation && (
            <div className="rounded-md bg-muted/50 p-3 text-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Bengali summary
              </p>
              <p className="mt-1">
                <BengaliText>{lesson.bengaliExplanation}</BengaliText>
              </p>
            </div>
          )}

          {lesson.pattern && (
            <div className="rounded-md border border-dashed p-3 text-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Pattern
              </p>
              <p className="mt-1 font-mono text-sm">{lesson.pattern}</p>
            </div>
          )}

          {/* Correct examples */}
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Examples
            </p>
            <ul className="space-y-1.5">
              {lesson.examples.map((ex, i) => (
                <li key={i} className="rounded-md bg-emerald-500/10 p-2 text-sm">
                  <span className="font-medium">{ex.sentence}</span>
                  {ex.note && (
                    <span className="block text-xs text-muted-foreground">{ex.note}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Incorrect examples */}
          {lesson.incorrectExamples.length > 0 && (
            <div>
              <p className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-rose-600">
                <AlertTriangle className="h-3 w-3" /> Common errors
              </p>
              <ul className="space-y-1.5">
                {lesson.incorrectExamples.map((ex, i) => (
                  <li key={i} className="rounded-md bg-rose-500/10 p-2 text-sm">
                    <p className="text-rose-700 line-through dark:text-rose-300">{ex.sentence}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Error: {ex.error}</p>
                    <p className="mt-0.5 text-emerald-700 dark:text-emerald-300">
                      ✓ {ex.correction}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {lesson.commonMistakes.length > 0 && (
            <div className="rounded-md bg-amber-500/10 p-3 text-sm">
              <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">
                <Lightbulb className="h-3 w-3" /> Common mistakes
              </p>
              <ul className="mt-1 list-inside list-disc space-y-0.5">
                {lesson.commonMistakes.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          )}

          {/* IELTS applications */}
          {lesson.ieltsApplications.length > 0 && (
            <div>
              <p className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <BookOpen className="h-3 w-3" /> Where this matters in IELTS
              </p>
              <ul className="space-y-1">
                {lesson.ieltsApplications.map((a, i) => (
                  <li key={i} className="text-sm">
                    {a.task && <Badge variant="outline" className="mr-1.5 text-[10px]">{a.task}</Badge>}
                    {a.note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Exercises */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base">
            <span>Practice ({lesson.exercises.length} questions)</span>
            {allChecked && (
              <Button variant="ghost" size="sm" onClick={retryAll} className="gap-1">
                <RotateCcw className="h-3.5 w-3.5" /> Retry
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={progress} className="h-2" />
          {lesson.exercises.map((ex, idx) => (
            <ExerciseCard
              key={ex.id}
              index={idx + 1}
              exercise={ex}
              lessonId={lesson.id}
              lessonTopic={lesson.topic}
              value={answers[ex.id] ?? ""}
              onChange={(v) => setAnswers((a) => ({ ...a, [ex.id]: v }))}
              checked={checked[ex.id]}
              onResult={(correct) => setChecked((c) => ({ ...c, [ex.id]: correct }))}
              recordGrammarAttempt={recordGrammarAttempt}
              onCheck={() => check(ex)}
            />
          ))}

          {allChecked && (
            <div className="rounded-lg border bg-muted/40 p-4 text-center">
              <p className="text-sm">
                You scored{" "}
                <span className="font-bold">
                  {correctCount}/{lesson.exercises.length}
                </span>{" "}
                ({Math.round((correctCount / lesson.exercises.length) * 100)}%)
              </p>
              <Button onClick={finish} className="mt-3 gap-1">
                <Sparkles className="h-4 w-4" /> Save & finish
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ExerciseCard({
  index,
  exercise,
  lessonId,
  lessonTopic,
  value,
  onChange,
  checked,
  onResult,
  recordGrammarAttempt,
  onCheck,
}: {
  index: number;
  exercise: GrammarExercise;
  lessonId: string;
  lessonTopic: string;
  value: string;
  onChange: (v: string) => void;
  checked: boolean | undefined;
  onResult: (correct: boolean) => void;
  recordGrammarAttempt: (a: { lessonId: string; exerciseId: string; topic: string; correct: boolean }) => void;
  onCheck: () => void;
}) {
  const isCorrect = checked === true;
  const isWrong = checked === false;
  const isLong = exercise.type === "correction" || exercise.type === "transformation" || exercise.type === "combine";

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
          {exercise.prompt}
        </p>
        <Badge variant="outline" className="shrink-0 text-[10px]">
          {exerciseTypeLabel(exercise.type)}
        </Badge>
      </div>

      {exercise.type === "mc" && exercise.options ? (
        <div className="grid gap-1.5">
          {exercise.options.map((opt) => {
            const selected = value === opt;
            const correct = opt === exercise.answer;
            const state = checked === undefined ? "idle" : correct ? "correct" : selected ? "wrong" : "dim";
            return (
              <button
                key={opt}
                disabled={checked !== undefined}
                onClick={() => {
                  // Select then immediately check (MC has no separate Check button).
                  onChange(opt);
                  if (checked === undefined && opt.trim()) {
                    const correctNow = isAnswerCorrect(exercise, opt);
                    onResult(correctNow);
                    recordGrammarAttempt({
                      lessonId,
                      exerciseId: exercise.id,
                      topic: lessonTopic,
                      correct: correctNow,
                    });
                  }
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
          {isLong ? (
            <Textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={checked !== undefined}
              placeholder="Type your answer…"
              className="min-h-[60px] text-sm"
            />
          ) : (
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={checked !== undefined}
              placeholder="Type your answer…"
              className="text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter" && checked === undefined) {
                  e.preventDefault();
                  onCheck();
                }
              }}
            />
          )}
          {checked === undefined ? (
            <Button size="sm" onClick={onCheck}>Check answer</Button>
          ) : null}
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
              {exercise.answer}
            </p>
          )}
          <p className="mt-1 text-muted-foreground">{exercise.explanation}</p>
        </div>
      )}
    </div>
  );
}
