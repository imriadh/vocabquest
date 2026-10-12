"use client";

import { useQuery } from "@tanstack/react-query";
import { useVocabStore, getAllWords } from "./store";
import type { Word } from "./sample-data";

async function fetchVocab(): Promise<Word[]> {
  const res = await fetch("/api/vocab", { cache: "force-cache" });
  if (!res.ok) throw new Error("Failed to load vocabulary");
  const data = (await res.json()) as { words: Word[] };
  return data.words;
}

/**
 * Returns the full word bank: server sample words + user-imported words
 * (imports live in localStorage). Loading/error states come from the query.
 */
export function useWordBank() {
  const sampleQuery = useQuery({
    queryKey: ["vocab-sample"],
    queryFn: fetchVocab,
    staleTime: Infinity,
  });

  const customWords = useVocabStore((s) => s.customWords);
  const hasHydrated = useVocabStore((s) => s.hasHydrated);

  const words: Word[] = sampleQuery.data
    ? (() => {
        const customIds = new Set(customWords.map((w) => w.id));
        return [...customWords, ...sampleQuery.data.filter((w) => !customIds.has(w.id))];
      })()
    : hasHydrated
      ? customWords
      : [];

  return {
    words,
    isLoading: sampleQuery.isLoading,
    isError: sampleQuery.isError,
    error: sampleQuery.error,
    refetch: sampleQuery.refetch,
    sampleCount: sampleQuery.data?.length ?? 0,
    customCount: customWords.length,
  };
}

export { getAllWords };
