"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Brain,
  ArrowRight,
  Check,
  X,
  Trophy,
  RotateCcw,
  Shuffle,
  AlertCircle,
} from "lucide-react";
import { useWordBank } from "@/lib/vocab/hooks";
import { useVocabStore } from "@/lib/vocab/store";
import { generateQuiz, type BaseQuestion, type MatchQuestion, type Question } from "@/lib/vocab/quiz";
import { BengaliText, EmptyState, LoadingState } from "./ui-bits";
import { cn } from "@/lib/utils";

const EXAMS = ["IELTS", "TOEFL", "GRE", "SAT", "BCS", "Admission"] as const;

type QuizType =
  | "meaning-mc"
  | "reverse-mc"
  | "synonym-mc"
  | "antonym-mc"
  | "fill-blank"
  | "word-match";

const QUIZ_LABELS: Record<QuizType, { title: string; desc: string }> = {
  "meaning-mc": { title: "Meaning (EN→BN)", desc: "See an English word, pick the correct Bengali meaning" },
  "reverse-mc": { title: "Reverse (BN→EN)", desc: "See a Bengali meaning, pick the English word" },
  "synonym-mc": { title: "Synonyms", desc: "Pick the synonym of the given word" },
  "antonym-mc": { title: "Antonyms", desc: "Pick the antonym of the given word" },
  "fill-blank": { title: "Fill in the blank", desc: "Choose the word that fits the sentence" },
  "word-match": { title: "Word matching", desc: "Match each English word to its Bengali meaning" },
};

export function QuizzesView() {
  const { words, isLoading, isError } = useWordBank();
  const [stage, setStage] = useState<"setup" | "playing" | "done">("setup");
  const [type, setType] = useState<QuizType>("meaning-mc");
  const [difficulty, setDifficulty] = useState("all");
  const [exam, setExam] = useState("all");
  const [count, setCount] = useState("10");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [results, setResults] = useState<{ correct: number; total: number } | null>(null);

  const pool = useMemo(() => {
    return words.filter((w) => {
      if (difficulty !== "all" && w.difficulty !== difficulty) return false;
      if (exam !== "all" && !w.exams.includes(exam as (typeof EXAMS)[number])) return false;
      // synonym/antonym quizzes need words with synonyms/antonyms
      if (type === "synonym-mc" && w.synonyms.length === 0) return false;
      if (type === "antonym-mc" && w.antonyms.length === 0) return false;
      return true;
    });
  }, [words, difficulty, exam, type]);

  function start() {
    const n = type === "word-match" ? Math.min(parseInt(count) || 5, 5) : Math.min(parseInt(count) || 10, 20);
    const qs = generateQuiz({ type, pool, count: n });
    if (!qs.length) return;
    setQuestions(qs);
    setResults(null);
    setStage("playing");
  }

  function finish(correct: number, total: number) {
    setResults({ correct, total });
    setStage("done");
  }

  if (isError) return <EmptyState title="Could not load quiz" icon={AlertCircle} />;
  if (isLoading) return <LoadingState label="Preparing quizzes…" />;

  if (stage === "setup") {
    return (
      <SetupScreen
        type={type}
        setType={setType}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        exam={exam}
        setExam={setExam}
        count={count}
        setCount={setCount}
        poolSize={pool.length}
        onStart={start}
      />
    );
  }

  if (stage === "playing") {
    if (type === "word-match" && questions[0]?.type === "word-match") {
      return (
        <MatchGame
          question={questions[0] as MatchQuestion}
          onExit={() => setStage("setup")}
          onFinish={(c, t) => finish(c, t)}
        />
      );
    }
    return (
      <McRunner
        questions={questions as BaseQuestion[]}
        onExit={() => setStage("setup")}
        onFinish={(c, t) => finish(c, t)}
      />
    );
  }

  return (
    <ResultsScreen
      results={results}
      onRetry={() => setStage("setup")}
      onAgain={() => start()}
    />
  );
}

function SetupScreen(props: {
  type: QuizType;
  setType: (t: QuizType) => void;
  difficulty: string;
  setDifficulty: (v: string) => void;
  exam: string;
  setExam: (v: string) => void;
  count: string;
  setCount: (v: string) => void;
  poolSize: number;
  onStart: () => void;
}) {
  const { type, setType, difficulty, setDifficulty, exam, setExam, count, setCount, poolSize, onStart } = props;
  const types = Object.keys(QUIZ_LABELS) as QuizType[];

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" /> Choose a quiz
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={cn(
                  "rounded-lg border p-3 text-left transition-colors",
                  type === t
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "hover:bg-muted/50"
                )}
              >
                <p className="text-sm font-semibold">{QUIZ_LABELS[t].title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{QUIZ_LABELS[t].desc}</p>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger aria-label="Difficulty">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All levels</SelectItem>
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
            <Select value={count} onValueChange={setCount}>
              <SelectTrigger aria-label="Number of questions">
                <SelectValue placeholder="Count" />
              </SelectTrigger>
              <SelectContent>
                {type === "word-match"
                  ? ["3", "4", "5"].map((n) => <SelectItem key={n} value={n}>{n} pairs</SelectItem>)
                  : ["5", "10", "15", "20"].map((n) => <SelectItem key={n} value={n}>{n} questions</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3 text-sm">
            <span className="text-muted-foreground">Available words in this set</span>
            <span className="font-semibold tabular-nums">{poolSize}</span>
          </div>

          <Button onClick={onStart} disabled={poolSize < 4} className="w-full">
            {poolSize < 4 ? "Need at least 4 words" : "Start quiz"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function McRunner({
  questions,
  onExit,
  onFinish,
}: {
  questions: BaseQuestion[];
  onExit: () => void;
  onFinish: (correct: number, total: number) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const reviewWord = useVocabStore((s) => s.reviewWord);
  const toggleDifficult = useVocabStore((s) => s.toggleDifficult);
  const difficult = useVocabStore((s) => s.difficult);
  const recordQuiz = useVocabStore((s) => s.recordQuiz);

  const q = questions[idx];
  const answered = selected !== null;
  const isCorrect = selected === q.answer;

  function choose(opt: string) {
    if (answered) return;
    setSelected(opt);
    const correct = opt === q.answer;
    if (correct) setCorrectCount((c) => c + 1);
    // SRS: correct => good (4), wrong => again (0)
    reviewWord(q.wordId, correct ? 4 : 0);
  }

  function next() {
    if (idx + 1 >= questions.length) {
      const total = questions.length;
      const finalCorrect = correctCount;
      recordQuiz(q.type, total, finalCorrect);
      onFinish(finalCorrect, total);
      return;
    }
    setIdx((i) => i + 1);
    setSelected(null);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Question <span className="font-semibold text-foreground">{idx + 1}</span> of {questions.length}
        </span>
        <Button variant="ghost" size="sm" onClick={onExit}>
          Exit quiz
        </Button>
      </div>
      <Progress value={((idx + (answered ? 1 : 0)) / questions.length) * 100} />

      <Card>
        <CardContent className="space-y-4 p-6">
          <div>
            {q.subPrompt && (
              <p className="mb-1 text-xs text-muted-foreground">{q.subPrompt}</p>
            )}
            <h2 className="text-2xl font-bold">
              {q.type === "reverse-mc" || q.type === "meaning-mc" ? (
                <BengaliText>{q.prompt}</BengaliText>
              ) : (
                q.prompt
              )}
            </h2>
          </div>

          <div className="grid gap-2">
            {q.options.map((opt) => {
              const state = !answered
                ? "idle"
                : opt === q.answer
                  ? "correct"
                  : opt === selected
                    ? "wrong"
                    : "dim";
              return (
                <button
                  key={opt}
                  onClick={() => choose(opt)}
                  disabled={answered}
                  className={cn(
                    "flex items-center justify-between rounded-lg border p-3 text-left transition-colors",
                    state === "idle" && "hover:bg-muted/50",
                    state === "correct" && "border-emerald-500 bg-emerald-500/10",
                    state === "wrong" && "border-rose-500 bg-rose-500/10",
                    state === "dim" && "opacity-50"
                  )}
                >
                  <span className="text-sm font-medium">
                    {q.type === "meaning-mc" || q.type === "reverse-mc" ? (
                      <BengaliText>{opt}</BengaliText>
                    ) : (
                      opt
                    )}
                  </span>
                  {state === "correct" && <Check className="h-4 w-4 text-emerald-600" />}
                  {state === "wrong" && <X className="h-4 w-4 text-rose-600" />}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="rounded-lg border bg-muted/40 p-3 text-sm">
              <p className="flex items-center gap-2 font-semibold">
                {isCorrect ? (
                  <><Check className="h-4 w-4 text-emerald-600" /> Correct!</>
                ) : (
                  <><X className="h-4 w-4 text-rose-600" /> Not quite</>
                )}
              </p>
              <p className="mt-1 text-muted-foreground">{q.explanation}</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 gap-1"
                onClick={() => toggleDifficult(q.wordId)}
              >
                {difficult[q.wordId] ? "★ Saved as difficult" : "☆ Save to difficult words"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={next} disabled={!answered} className="gap-1">
          {idx + 1 >= questions.length ? "See results" : "Next"}{" "}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function MatchGame({
  question,
  onExit,
  onFinish,
}: {
  question: MatchQuestion;
  onExit: () => void;
  onFinish: (correct: number, total: number) => void;
}) {
  const words = useMemo(() => question.pairs.map((p) => p.left), [question]);
  const meanings = useMemo(
    () => [...question.pairs.map((p) => p.right)].sort(() => Math.random() - 0.5),
    [question]
  );

  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, boolean>>({});
  const [wrongPair, setWrongPair] = useState<{ left: string; right: string } | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [correctMatches, setCorrectMatches] = useState(0);
  const recordQuiz = useVocabStore((s) => s.recordQuiz);
  const reviewWord = useVocabStore((s) => s.reviewWord);
  const pairById = useMemo(() => {
    const m = new Map<string, string>();
    question.pairs.forEach((p) => m.set(p.left, p.right));
    return m;
  }, [question]);

  function clickMeaning(right: string) {
    if (!selectedWord) return;
    if (matched[selectedWord]) return;
    setAttempts((a) => a + 1);
    const correct = pairById.get(selectedWord) === right;
    if (correct) {
      setCorrectMatches((c) => c + 1);
      setMatched((m) => ({ ...m, [selectedWord]: true }));
      reviewWord(wordIdFor(selectedWord), 4);
      setSelectedWord(null);
      if (correctMatches + 1 >= question.pairs.length) {
        recordQuiz("word-match", question.pairs.length, question.pairs.length);
        setTimeout(
          () => onFinish(question.pairs.length, question.pairs.length),
          600
        );
      }
    } else {
      setWrongPair({ left: selectedWord, right });
      reviewWord(wordIdFor(selectedWord), 0);
      setTimeout(() => {
        setWrongPair(null);
        setSelectedWord(null);
      }, 500);
    }
  }

  function wordIdFor(left: string): string {
    return question.pairs.find((p) => p.left === left)?.wordId ?? left;
  }

  const allDone = correctMatches >= question.pairs.length;

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Matched <span className="font-semibold text-foreground">{correctMatches}</span> / {question.pairs.length}
        </span>
        <Button variant="ghost" size="sm" onClick={onExit}>
          Exit
        </Button>
      </div>
      <Progress value={(correctMatches / question.pairs.length) * 100} />

      <Card>
        <CardContent className="p-6">
          <p className="mb-4 text-sm text-muted-foreground">{question.explanation}</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Words</p>
              {words.map((w) => {
                const done = matched[w];
                const active = selectedWord === w;
                const wrong = wrongPair?.left === w;
                return (
                  <button
                    key={w}
                    disabled={done || allDone}
                    onClick={() => setSelectedWord(w)}
                    className={cn(
                      "w-full rounded-lg border p-3 text-left text-sm font-semibold transition-colors",
                      done && "opacity-40",
                      active && "border-primary bg-primary/10 ring-1 ring-primary",
                      wrong && "border-rose-500 bg-rose-500/10 animate-pulse",
                      !done && !active && !wrong && "hover:bg-muted/50"
                    )}
                  >
                    {w}
                    {done && <Check className="ml-2 inline h-4 w-4 text-emerald-600" />}
                  </button>
                );
              })}
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Meanings</p>
              {meanings.map((m) => {
                const used = Object.entries(matched).some(([left, v]) => {
                  if (!v) return false;
                  const ml = question.pairs.find((p) => p.left === left)?.right;
                  return ml === m;
                });
                const wrong = wrongPair?.right === m;
                return (
                  <button
                    key={m}
                    disabled={used || allDone}
                    onClick={() => clickMeaning(m)}
                    className={cn(
                      "w-full rounded-lg border p-3 text-left text-sm transition-colors",
                      used && "opacity-40",
                      wrong && "border-rose-500 bg-rose-500/10 animate-pulse",
                      !used && !wrong && "hover:bg-muted/50"
                    )}
                  >
                    <BengaliText className="font-medium">{m}</BengaliText>
                  </button>
                );
              })}
            </div>
          </div>
          {attempts > 0 && (
            <p className="mt-4 text-xs text-muted-foreground">
              Attempts: {attempts} · Tip: click a word, then its meaning.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ResultsScreen({
  results,
  onRetry,
  onAgain,
}: {
  results: { correct: number; total: number } | null;
  onRetry: () => void;
  onAgain: () => void;
}) {
  if (!results) return null;
  const pct = Math.round((results.correct / results.total) * 100);
  const tier =
    pct >= 90 ? { label: "Outstanding", color: "text-emerald-600" } :
    pct >= 70 ? { label: "Well done", color: "text-sky-600" } :
    pct >= 50 ? { label: "Keep going", color: "text-amber-600" } :
    { label: "Needs revision", color: "text-rose-600" };

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <Trophy className={cn("h-12 w-12", tier.color)} />
          <h2 className="text-2xl font-bold">{tier.label}</h2>
          <p className="text-4xl font-bold tabular-nums">
            {results.correct}
            <span className="text-lg text-muted-foreground">/{results.total}</span>
          </p>
          <p className="text-sm text-muted-foreground">{pct}% correct · saved to your progress</p>
          <div className="mt-2 flex gap-2">
            <Button variant="outline" onClick={onRetry} className="gap-1">
              <RotateCcw className="h-4 w-4" /> New quiz
            </Button>
            <Button onClick={onAgain} className="gap-1">
              <Shuffle className="h-4 w-4" /> Try again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
