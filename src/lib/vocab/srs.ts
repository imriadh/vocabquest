// Spaced repetition scheduling (simplified SM-2 algorithm).
// Keeps everything client-side and deterministic for offline use.

export type ReviewQuality = 0 | 3 | 4 | 5; // again | hard | good | easy

export type WordStatus = "new" | "learning" | "review" | "known";

export interface SrsState {
  status: WordStatus;
  reps: number;
  interval: number; // days
  ease: number;
  due: number; // epoch ms
  lastReviewed: number | null;
  lapses: number;
}

export function freshSrsState(): SrsState {
  return {
    status: "new",
    reps: 0,
    interval: 0,
    ease: 2.5,
    due: Date.now(),
    lastReviewed: null,
    lapses: 0,
  };
}

const DAY_MS = 24 * 60 * 60 * 1000;

export function isDue(state: SrsState, now = Date.now()): boolean {
  return state.due <= now;
}

/**
 * Apply a review to an SRS state and return the updated state.
 * quality: 0 = again (forgot), 3 = hard, 4 = good, 5 = easy.
 */
export function review(state: SrsState, quality: ReviewQuality, now = Date.now()): SrsState {
  let { reps, interval, ease, lapses, status } = state;

  if (quality === 0) {
    // Lapse: reset reps, drop ease slightly, short relearn interval.
    reps = 0;
    interval = 0;
    ease = Math.max(1.3, ease - 0.2);
    lapses = lapses + 1;
    status = "learning";
    // Due ~10 minutes later (we still store as ms timestamp).
    const due = now + 10 * 60 * 1000;
    return { ...state, reps, interval, ease, lapses, status, due, lastReviewed: now };
  }

  // Successful review.
  const newEase = Math.max(1.3, ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  reps = reps + 1;

  if (reps === 1) {
    interval = 1;
  } else if (reps === 2) {
    interval = 3;
  } else {
    interval = Math.round(interval * newEase);
  }

  // Hard review shortens the interval a bit.
  if (quality === 3) {
    interval = Math.max(1, Math.round(interval * 0.8));
  }

  status = interval >= 21 ? "known" : "review";

  const due = now + interval * DAY_MS;
  return {
    ...state,
    reps,
    interval,
    ease: newEase,
    lapses,
    status,
    due,
    lastReviewed: now,
  };
}

/** Human-readable summary of when a word is next due. */
export function describeDue(state: SrsState, now = Date.now()): string {
  const diff = state.due - now;
  if (diff <= 0) return "Due now";
  const mins = Math.round(diff / 60000);
  if (mins < 60) return `Due in ${mins}m`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `Due in ${hours}h`;
  const days = Math.round(hours / 24);
  return `Due in ${days}d`;
}
