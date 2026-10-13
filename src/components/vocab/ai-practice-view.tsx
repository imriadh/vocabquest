"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  ArrowRight,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { ApiKeyManager } from "./api-key-manager";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { grammarLessons } from "@/lib/grammar/lessons-data";

interface FeedbackItem {
  quote: string;
  category: string;
  explanation: string;
  correction: string;
  lessonTopic?: string;
}
interface Feedback {
  summary: string;
  overallAccuracy: string;
  items: FeedbackItem[];
}

const SAMPLE_PROMPTS = [
  "Write 2-3 sentences about the impact of urbanisation on the environment.",
  "Write a short paragraph arguing for or against remote work.",
  "Describe a chart trend: 'The number of tourists visiting the city between 2010 and 2020…'",
];

export function AiPracticeView({ onOpenGrammar }: { onOpenGrammar?: (lessonId: string) => void }) {
  const { data: session } = useSession();
  const [text, setText] = useState("");
  const [provider, setProvider] = useState("openai");
  const [base, setBase] = useState("");
  const [model, setModel] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  async function submit() {
    if (!text.trim()) {
      toast({ title: "Write something first", variant: "destructive" });
      return;
    }
    setLoading(true);
    setError(null);
    setFeedback(null);
    try {
      const res = await fetch("/api/ai/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, provider, base: base || undefined, model: model || undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 404) {
          setError(data.error || "No API key for this provider.");
        } else {
          setError(data.error || "Feedback request failed.");
        }
      } else {
        setFeedback(data.feedback as Feedback);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Find a grammar lesson matching a feedback item's topic (first match).
  function findLesson(topic?: string) {
    if (!topic) return null;
    const t = topic.toLowerCase();
    return grammarLessons.find((l) => l.topic.toLowerCase() === t) || null;
  }

  if (!session) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
          <Sparkles className="h-10 w-10 text-primary/50" />
          <h2 className="text-lg font-semibold">AI Writing Feedback</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Sign in to get AI-powered grammar feedback on your IELTS writing. Bring your own API key (OpenAI, Gemini, Grok, or any OpenAI-compatible provider).
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base">
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> AI Writing Feedback
            </span>
            <ApiKeyManager />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Submit a short piece of your own writing (1–4 sentences). The AI identifies grammar errors, explains each one, suggests a minimal correction, and links related grammar lessons. This is <strong>advisory feedback, not an official IELTS band score</strong>.
          </p>

          {/* Provider selector */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Select value={provider} onValueChange={setProvider}>
              <SelectTrigger aria-label="AI provider"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI</SelectItem>
                <SelectItem value="gemini">Google Gemini</SelectItem>
                <SelectItem value="grok">xAI Grok</SelectItem>
                <SelectItem value="openai-compatible">OpenAI-compatible</SelectItem>
              </SelectContent>
            </Select>
            {provider === "openai-compatible" && (
              <Input placeholder="Base URL (https://api.deepseek.com/v1/chat/completions)" value={base} onChange={(e) => setBase(e.target.value)} />
            )}
            {(provider === "openai-compatible" || provider === "grok") && (
              <Input placeholder={provider === "grok" ? "Model: grok-beta" : "Model: deepseek-chat"} value={model} onChange={(e) => setModel(e.target.value)} />
            )}
          </div>

          {/* Writing textarea */}
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or write your IELTS sentence/paragraph here…"
            className="min-h-[140px] text-sm"
            maxLength={4000}
          />
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">{text.length}/4000</span>
            <Button onClick={submit} disabled={loading} className="gap-1.5">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Get feedback
            </Button>
          </div>

          {/* Sample prompts */}
          <div className="flex flex-wrap gap-1.5">
            {SAMPLE_PROMPTS.map((p, i) => (
              <button
                key={i}
                onClick={() => setText(p)}
                className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/50"
              >
                {p.slice(0, 50)}…
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Error state */}
      {error && (
        <Card className="border-rose-500/40">
          <CardContent className="flex items-start gap-2 p-4 text-sm">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
            <div>
              <p className="font-medium text-rose-700 dark:text-rose-300">{error}</p>
              {error.includes("No API key") && (
                <p className="mt-1 text-muted-foreground">
                  Open <strong>API keys</strong> above to add a key for this provider.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Feedback */}
      {feedback && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Feedback
              </span>
              <Badge
                variant="secondary"
                className={cn(
                  "tabular-nums",
                  feedback.overallAccuracy === "Strong" && "bg-emerald-500/15 text-emerald-700",
                  feedback.overallAccuracy === "Good" && "bg-sky-500/15 text-sky-700",
                  feedback.overallAccuracy === "Needs work" && "bg-amber-500/15 text-amber-700",
                  feedback.overallAccuracy === "Requires revision" && "bg-rose-500/15 text-rose-700"
                )}
              >
                {feedback.overallAccuracy}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">{feedback.summary}</p>

            {feedback.items.length === 0 ? (
              <p className="rounded-md bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-300">
                No grammar errors found. Well done!
              </p>
            ) : (
              <ul className="space-y-3">
                {feedback.items.map((it, i) => {
                  const lesson = findLesson(it.lessonTopic);
                  return (
                    <li key={i} className="rounded-lg border p-3 text-sm">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Badge variant="secondary" className="bg-violet-500/10 text-violet-700 dark:text-violet-300">
                          {it.category}
                        </Badge>
                        {it.lessonTopic && (
                          <Badge variant="outline" className="text-[10px] text-muted-foreground">
                            {it.lessonTopic}
                          </Badge>
                        )}
                      </div>
                      <p className="mt-2 text-rose-700 line-through dark:text-rose-300">
                        “{it.quote}”
                      </p>
                      <p className="mt-1 text-emerald-700 dark:text-emerald-300">
                        ✓ {it.correction}
                      </p>
                      <p className="mt-1 text-muted-foreground">{it.explanation}</p>
                      {lesson && onOpenGrammar && (
                        <Button
                          variant="link"
                          size="sm"
                          className="mt-1 h-auto p-0 text-xs"
                          onClick={() => onOpenGrammar(lesson.id)}
                        >
                          Learn this: {lesson.title} <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
            <p className="text-xs text-muted-foreground">
              <KeyRound className="mr-1 inline h-3 w-3" />
              AI feedback is advisory and uses your own provider key. It does not assign an IELTS band score.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

