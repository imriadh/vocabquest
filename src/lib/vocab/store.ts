"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { sampleWords, type Word } from "./sample-data";
import { freshSrsState, review, type ReviewQuality, type SrsState, isDue } from "./srs";

export type WordMark = "known" | "practice" | null;

export interface QuizResult {
  id: string;
  type: string;
  date: number;
  total: number;
  correct: number;
}

interface VocabState {
  customWords: Word[];
  srs: Record<string, SrsState>;
  manualMark: Record<string, WordMark>;
  difficult: Record<string, boolean>;
  quizHistory: QuizResult[];
  reviewLog: { wordId: string; quality: ReviewQuality; ts: number }[];
  hasHydrated: boolean;

  // actions
  setHydrated: (v: boolean) => void;
  importWords: (words: Word[]) => { added: number; updated: number };
  clearImports: () => void;
  removeCustomWord: (id: string) => void;
  setManualMark: (id: string, mark: WordMark) => void;
  toggleDifficult: (id: string) => void;
  reviewWord: (id: string, quality: ReviewQuality) => void;
  recordQuiz: (type: string, total: number, correct: number) => void;
  resetProgress: () => void;
  resetAll: () => void;
}

export const useVocabStore = create<VocabState>()(
  persist(
    (set, get) => ({
      customWords: [],
      srs: {},
      manualMark: {},
      difficult: {},
      quizHistory: [],
      reviewLog: [],
      hasHydrated: false,

      setHydrated: (v) => set({ hasHydrated: v }),

      importWords: (words) => {
        const existing = new Map(get().customWords.map((w) => [w.id, w]));
        let added = 0;
        let updated = 0;
        for (const w of words) {
          if (existing.has(w.id)) {
            existing.set(w.id, { ...w });
            updated++;
          } else {
            existing.set(w.id, w);
            added++;
          }
        }
        set({ customWords: [...existing.values()] });
        return { added, updated };
      },

      clearImports: () => set({ customWords: [] }),

      removeCustomWord: (id) =>
        set({ customWords: get().customWords.filter((w) => w.id !== id) }),

      setManualMark: (id, mark) => {
        const next = { ...get().manualMark };
        if (mark === null) delete next[id];
        else next[id] = mark;
        set({ manualMark: next });
      },

      toggleDifficult: (id) => {
        const next = { ...get().difficult };
        if (next[id]) delete next[id];
        else next[id] = true;
        set({ difficult: next });
      },

      reviewWord: (id, quality) => {
        const prev = get().srs[id] ?? freshSrsState();
        const updated = review(prev, quality);
        const log = [...get().reviewLog, { wordId: id, quality, ts: Date.now() }].slice(-500);
        set({ srs: { ...get().srs, [id]: updated }, reviewLog: log });
      },

      recordQuiz: (type, total, correct) => {
        const result: QuizResult = {
          id: `q-${Date.now()}`,
          type,
          date: Date.now(),
          total,
          correct,
        };
        set({ quizHistory: [...get().quizHistory, result].slice(-200) });
      },

      resetProgress: () =>
        set({
          srs: {},
          manualMark: {},
          difficult: {},
          quizHistory: [],
          reviewLog: [],
        }),

      resetAll: () =>
        set({
          customWords: [],
          srs: {},
          manualMark: {},
          difficult: {},
          quizHistory: [],
          reviewLog: [],
        }),
    }),
    {
      name: "vocab-store-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        customWords: s.customWords,
        srs: s.srs,
        manualMark: s.manualMark,
        difficult: s.difficult,
        quizHistory: s.quizHistory,
        reviewLog: s.reviewLog,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);

// ---------- Derived selectors (plain helpers, can be used outside React) ----------

export function getAllWords(state: VocabState): Word[] {
  // Imported (custom) words take precedence over built-in words with the same id.
  const customIds = new Set(state.customWords.map((w) => w.id));
  return [...state.customWords, ...sampleWords.filter((w) => !customIds.has(w.id))];
}

export function getWordById(state: VocabState, id: string): Word | undefined {
  return getAllWords(state).find((w) => w.id === id);
}

export function getDueWords(state: VocabState, now = Date.now()): Word[] {
  return getAllWords(state).filter((w) => {
    const s = state.srs[w.id];
    return !s || isDue(s, now);
  });
}

export function getDifficultWords(state: VocabState): Word[] {
  return getAllWords(state).filter((w) => state.difficult[w.id]);
}

export function getLearnedCount(state: VocabState): number {
  return getAllWords(state).filter((w) => {
    const s = state.srs[w.id];
    const mark = state.manualMark[w.id];
    return mark === "known" || (s && s.status === "known");
  }).length;
}

export function getDueCount(state: VocabState, now = Date.now()): number {
  return getDueWords(state, now).length;
}
