"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Volume2, Loader2 } from "lucide-react";
import { useState } from "react";
import { speak, speechSupported } from "@/lib/vocab/speech";
import type { CefrLevel, Difficulty, Exam, Word } from "@/lib/vocab/sample-data";
import { cn } from "@/lib/utils";

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  beginner: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  intermediate: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
  advanced: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
};

const CEFR_STYLES: Record<CefrLevel, string> = {
  A2: "bg-slate-500/10 text-slate-600 dark:text-slate-300",
  B1: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  B2: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  C1: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  C2: "bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300",
};

export function CefrBadge({ cefr }: { cefr?: CefrLevel }) {
  if (!cefr) return null;
  return (
    <Badge variant="secondary" className={cn("text-[10px] font-semibold", CEFR_STYLES[cefr])} title="CEFR level (estimated)">
      {cefr}
    </Badge>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <Badge variant="outline" className={cn("capitalize", DIFFICULTY_STYLES[difficulty])}>
      {difficulty}
    </Badge>
  );
}

const EXAM_STYLES: Record<Exam, string> = {
  IELTS: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  TOEFL: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  GRE: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  SAT: "bg-teal-500/10 text-teal-700 dark:text-teal-300",
  BCS: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
  Admission: "bg-pink-500/10 text-pink-700 dark:text-pink-300",
};

export function ExamBadges({ exams }: { exams: Exam[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {exams.map((e) => (
        <Badge key={e} variant="secondary" className={cn("text-[10px] font-semibold", EXAM_STYLES[e])}>
          {e}
        </Badge>
      ))}
    </div>
  );
}

export function PronounceButton({
  text,
  label,
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const supported = speechSupported();

  if (!supported) return null;

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={cn("h-7 gap-1 px-2 text-xs", className)}
      onClick={() => {
        setPlaying(true);
        speak(text);
        window.setTimeout(() => setPlaying(false), Math.min(4000, 600 + text.length * 70));
      }}
      aria-label={`Pronounce ${text}`}
    >
      {playing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Volume2 className="h-3.5 w-3.5" />}
      {label}
    </Button>
  );
}

export function BengaliText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span lang="bn" className={cn(className)}>
      {children}
    </span>
  );
}

export function WordListBadges({ word }: { word: Word }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <DifficultyBadge difficulty={word.difficulty} />
      <CefrBadge cefr={word.cefr} />
      <ExamBadges exams={word.exams} />
      {word.category && (
        <Badge variant="outline" className="text-[10px] text-muted-foreground">
          {word.category}
        </Badge>
      )}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  icon: Icon,
  action,
}: {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-10 text-center">
      {Icon && <Icon className="h-8 w-8 text-muted-foreground" />}
      <div>
        <p className="font-medium">{title}</p>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 p-10 text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
