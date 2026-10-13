"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useVocabStore, type RemoteProgressBlob } from "@/lib/vocab/store";

/**
 * Keeps the local vocab store in sync with the server when a user is logged in:
 *  - On login: loads the user's saved progress blob from the DB into the store.
 *    If the user has no saved progress yet, the current local state is kept and
 *    will be saved to the DB (so guest progress isn't lost on first login).
 *  - While logged in: debounced PUT of the store state back to the DB.
 *  - On logout: nothing is wiped locally (so re-login restores the same state).
 */
export function useProgressSync() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const hasHydrated = useVocabStore((s) => s.hasHydrated);
  const loadRemoteState = useVocabStore((s) => s.loadRemoteState);
  const exportRemoteState = useVocabStore((s) => s.exportRemoteState);
  const loadedForUser = useRef<string | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load remote progress once per login.
  useEffect(() => {
    if (status !== "authenticated" || !userId || !hasHydrated) return;
    if (loadedForUser.current === userId) return;
    loadedForUser.current = userId;

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/user/progress", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { progress?: RemoteProgressBlob };
        if (cancelled) return;
        if (data.progress && Object.keys(data.progress).length > 0) {
          loadRemoteState(data.progress);
        }
        // If no remote progress, keep local guest state; it will be saved below.
      } catch {
        // network error — keep local state, retry next login
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [status, userId, hasHydrated, loadRemoteState]);

  // Reset the loaded-user marker on logout so a future login re-loads.
  useEffect(() => {
    if (status !== "authenticated") {
      loadedForUser.current = null;
    }
  }, [status]);

  // Debounced save whenever the store changes AND user is logged in.
  const state = useVocabStore();
  useEffect(() => {
    if (status !== "authenticated" || !userId || !hasHydrated) return;
    if (loadedForUser.current !== userId) return; // don't save before load completes

    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        await fetch("/api/user/progress", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(exportRemoteState()),
        });
      } catch {
        // ignore transient save errors
      }
    }, 1500);

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [
    status,
    userId,
    hasHydrated,
    state.customWords,
    state.srs,
    state.manualMark,
    state.difficult,
    state.quizHistory,
    state.reviewLog,
    state.grammarLessons,
    state.grammarAttempts,
    state.grammarErrorCategories,
    state.readingPassages,
    state.readingAttempts,
  ]);
}
