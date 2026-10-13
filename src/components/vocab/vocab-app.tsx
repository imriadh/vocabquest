"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Library,
  Layers,
  Brain,
  Star,
  Sun,
  Moon,
  BookOpen,
  LogIn,
  LogOut,
  UserCog,
  ShieldCheck,
} from "lucide-react";
import { DashboardView } from "./dashboard-view";
import { LibraryView } from "./library-view";
import { FlashcardsView } from "./flashcards-view";
import { QuizzesView } from "./quizzes-view";
import { RevisionView } from "./revision-view";
import { AdminView } from "./admin-view";
import { AuthDialog } from "./auth-dialog";
import { useWordBank } from "@/lib/vocab/hooks";
import { primeVoices } from "@/lib/vocab/speech";
import { useProgressSync } from "@/lib/vocab/use-progress-sync";
import { useToast } from "@/hooks/use-toast";

const BASE_TABS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "library", label: "Library", icon: Library },
  { id: "flashcards", label: "Flashcards", icon: Layers },
  { id: "quizzes", label: "Quizzes", icon: Brain },
  { id: "revision", label: "Revision", icon: Star },
] as const;

export function VocabApp() {
  const [tab, setTab] = useState<string>("dashboard");
  const { sampleCount, customCount } = useWordBank();
  const { data: session, status } = useSession();
  const { toast } = useToast();

  useProgressSync();

  useEffect(() => {
    primeVoices();
  }, []);

  const tabs =
    session?.user?.role === "ADMIN"
      ? [...BASE_TABS, { id: "admin", label: "Admin", icon: UserCog }]
      : BASE_TABS;

  const user = session?.user;
  const initials = user?.email ? user.email.slice(0, 2).toUpperCase() : "?";

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
            <ThemeToggle />
            {status === "authenticated" && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-9 gap-2 px-1.5">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                    </Avatar>
                    <span className="hidden max-w-[120px] truncate text-sm sm:inline">
                      {user.name || user.email}
                    </span>
                    {user.role === "ADMIN" && (
                      <ShieldCheck className="h-3.5 w-3.5 text-violet-500" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="truncate">
                    {user.name || user.email}
                  </DropdownMenuLabel>
                  <p className="px-2 text-xs text-muted-foreground">{user.email}</p>
                  {user.role === "ADMIN" && (
                    <p className="px-2 pt-1 text-xs font-medium text-violet-600">
                      Administrator
                    </p>
                  )}
                  <DropdownMenuSeparator />
                  {user.role === "ADMIN" && (
                    <DropdownMenuItem onClick={() => setTab("admin")}>
                      <UserCog className="mr-2 h-4 w-4" /> Admin panel
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => {
                      signOut({ redirect: false });
                      toast({ title: "Signed out", description: "Using as guest." });
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <AuthDialog>
                <Button variant="default" size="sm" className="gap-1.5">
                  <LogIn className="h-4 w-4" /> <span className="hidden sm:inline">Login</span>
                </Button>
              </AuthDialog>
            )}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-5">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <div className="mb-5 overflow-x-auto">
            <TabsList className="flex w-max gap-1">
              {tabs.map((t) => (
                <TabsTrigger key={t.id} value={t.id} className="gap-1.5">
                  <t.icon className="h-4 w-4" />
                  <span>{t.label}</span>
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
          {session?.user?.role === "ADMIN" && (
            <TabsContent value="admin" className="mt-0">
              <AdminView />
            </TabsContent>
          )}
        </Tabs>
      </main>

      {/* Sticky footer */}
      <footer className="mt-auto border-t bg-background">
        <div className="mx-auto w-full max-w-5xl px-4 py-4 text-center text-xs text-muted-foreground">
          <p>
            {sampleCount} built-in words{customCount > 0 ? ` + ${customCount} imported by you` : ""} ·{" "}
            {status === "authenticated"
              ? `Signed in as ${user?.email}`
              : "Guest mode · progress saved locally"}
          </p>
          <p className="mt-1">
            Built with Next.js · Bengali &amp; English support ·{" "}
            {status === "authenticated" ? "Progress synced to your account" : "Login to sync across devices"}
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
      <Moon className="h-4 w-4 dark:hidden" />
      <Sun className="hidden h-4 w-4 dark:block" />
    </Button>
  );
}
