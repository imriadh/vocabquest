"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  Library,
  Layers,
  Brain,
  Star,
  Sun,
  Moon,
  BookOpen,
  Github,
} from "lucide-react";
import { DashboardView } from "./dashboard-view";
import { LibraryView } from "./library-view";
import { FlashcardsView } from "./flashcards-view";
import { QuizzesView } from "./quizzes-view";
import { RevisionView } from "./revision-view";
import { useWordBank } from "@/lib/vocab/hooks";
import { primeVoices } from "@/lib/vocab/speech";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "library", label: "Library", icon: Library },
  { id: "flashcards", label: "Flashcards", icon: Layers },
  { id: "quizzes", label: "Quizzes", icon: Brain },
  { id: "revision", label: "Revision", icon: Star },
] as const;

export function VocabApp() {
  const [tab, setTab] = useState<string>("dashboard");
  const { sampleCount, customCount } = useWordBank();

  useEffect(() => {
    primeVoices();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <h1 className="text-base font-bold sm:text-lg">VocabQuest</h1>
              <p className="text-[10px] text-muted-foreground sm:text-xs">
                IELTS · TOEFL · GRE · SAT · BCS · Admission
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block"
              aria-label="Source"
            >
              <Button variant="ghost" size="icon">
                <Github className="h-4 w-4" />
              </Button>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-5">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <div className="mb-5 overflow-x-auto">
            <TabsList className="flex w-max gap-1">
              {TABS.map((t) => (
                <TabsTrigger key={t.id} value={t.id} className="gap-1.5">
                  <t.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.label}</span>
                  <span className="sm:hidden">{t.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="mt-0">
            <DashboardView onNavigate={(t) => setTab(t)} />
          </TabsContent>
          <TabsContent value="library" className="mt-0">
            <LibraryView />
          </TabsContent>
          <TabsContent value="flashcards" className="mt-0">
            <FlashcardsView />
          </TabsContent>
          <TabsContent value="quizzes" className="mt-0">
            <QuizzesView />
          </TabsContent>
          <TabsContent value="revision" className="mt-0">
            <RevisionView />
          </TabsContent>
        </Tabs>
      </main>

      {/* Sticky footer */}
      <footer className="mt-auto border-t bg-background">
        <div className="mx-auto w-full max-w-5xl px-4 py-4 text-center text-xs text-muted-foreground">
          <p>
            {sampleCount} built-in words{customCount > 0 ? ` + ${customCount} imported by you` : ""} ·
            Progress saved locally in your browser
          </p>
          <p className="mt-1">
            Built with Next.js · Bengali &amp; English support · No account required
          </p>
        </div>
      </footer>
    </div>
  );
}

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {/* Moon shown in light mode (click → dark); Sun shown in dark mode (click → light) */}
      <Moon className="h-4 w-4 dark:hidden" />
      <Sun className="hidden h-4 w-4 dark:block" />
    </Button>
  );
}
