// Grammar progress analytics — pure helper functions over the vocab-store
// grammar slice. Used by the Grammar home to drive personalised
// recommendations and diagnostics (AGENT.md §9, Milestone 3).
//
// All functions are pure and take only the store state slices they need, so
// they are easy to unit-test later and do not trigger React re-renders.

import type { GrammarLesson } from "./types";
import type { GrammarAttempt, GrammarLessonProgress } from "@/lib/vocab/store";

export interface TopicAccuracy {
  topic: string;
  correct: number;
  total: number;
  accuracy: number; // 0..1
}

export interface TrendPoint {
  correct: boolean;
  ts: number;
}

export interface RecommendedLesson {
  lesson: GrammarLesson;
  reason: string;
}

/**
 * Compute per-topic accuracy from raw grammar attempts.
 * Topics with no attempts are omitted.
 */
export function getTopicAccuracy(attempts: GrammarAttempt[]): TopicAccuracy[] {
  const map = new Map<string, { correct: number; total: number }>();
  for (const a of attempts) {
    const e = map.get(a.topic) ?? { correct: 0, total: 0 };
    e.total += 1;
    if (a.correct) e.correct += 1;
    map.set(a.topic, e);
  }
  return [...map.entries()]
    .map(([topic, v]) => ({
      topic,
      correct: v.correct,
      total: v.total,
      accuracy: v.total ? v.correct / v.total : 0,
    }))
    .sort((a, b) => b.accuracy - a.accuracy);
}

/**
 * Strongest topics (highest accuracy, min 3 attempts to be meaningful).
 */
export function getStrongestTopics(attempts: GrammarAttempt[], limit = 3): TopicAccuracy[] {
  return getTopicAccuracy(attempts)
    .filter((t) => t.total >= 3)
    .slice(0, limit);
}

/**
 * Weakest topics (lowest accuracy, min 3 attempts). Sorted ascending.
 * These drive the "topics needing revision" card.
 */
export function getWeakestTopics(attempts: GrammarAttempt[], limit = 3): TopicAccuracy[] {
  return getTopicAccuracy(attempts)
    .filter((t) => t.total >= 3 && t.accuracy < 0.8)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, limit);
}

/**
 * Last N attempts in chronological order, for an accuracy trend sparkline.
 */
export function getAccuracyTrend(attempts: GrammarAttempt[], n = 12): TrendPoint[] {
  return [...attempts].slice(-n).map((a) => ({ correct: a.correct, ts: a.ts }));
}

/**
 * Completed lessons whose accuracy is below the threshold — candidates for
 * re-practice. Sorted by accuracy ascending (worst first).
 */
export function getReviewQueue(
  lessons: GrammarLesson[],
  progress: Record<string, GrammarLessonProgress>,
  threshold = 0.7
): { lesson: GrammarLesson; accuracy: number; attempts: number }[] {
  return lessons
    .map((l) => {
      const p = progress[l.id];
      if (!p) return null;
      return { lesson: l, accuracy: p.accuracy, attempts: p.attempts };
    })
    .filter((x): x is { lesson: GrammarLesson; accuracy: number; attempts: number } => !!x)
    .filter((x) => x.accuracy < threshold)
    .sort((a, b) => a.accuracy - b.accuracy);
}

/**
 * Prerequisites for a lesson are met when each prerequisite lesson id has
 * been completed at least once.
 */
export function prereqsMet(
  lesson: GrammarLesson,
  progress: Record<string, GrammarLessonProgress>
): boolean {
  if (lesson.prerequisites.length === 0) return true;
  return lesson.prerequisites.every((p) => !!progress[p]);
}

/**
 * Recommend the single highest-value next lesson.
 *
 * Priority:
 *  1. A review lesson the learner has struggled with (accuracy < 70%) whose
 *     topic matches a weak topic — "You've struggled with X; review it".
 *  2. The first unfinished lesson whose prerequisites are met, preferring
 *     ones whose topic matches a weak area — "Continue your learning path".
 *  3. The first unfinished lesson overall (prereqs may be unmet; we still
 *     suggest it so the learner knows what's next).
 *
 * Returns null only if every lesson is completed and none need review.
 */
export function getRecommendedLesson(
  lessons: GrammarLesson[],
  progress: Record<string, GrammarLessonProgress>,
  attempts: GrammarAttempt[]
): RecommendedLesson | null {
  const weakTopics = new Set(
    getWeakestTopics(attempts).map((t) => t.topic)
  );
  const reviewQueue = getReviewQueue(lessons, progress);

  // 1. Struggling lesson matching a weak topic.
  const weakReview = reviewQueue.find((r) => weakTopics.has(r.lesson.topic));
  if (weakReview) {
    return {
      lesson: weakReview.lesson,
      reason: `You've struggled with ${weakReview.lesson.topic}. Review this to improve.`,
    };
  }

  // 2. First unfinished lesson with prereqs met, preferring weak-topic matches.
  const unfinishedWithPrereqs = lessons.filter(
    (l) => !progress[l.id] && prereqsMet(l, progress)
  );
  const weakMatch = unfinishedWithPrereqs.find((l) => weakTopics.has(l.topic));
  if (weakMatch) {
    return {
      lesson: weakMatch,
      reason: `Recommended for you — builds on ${weakMatch.topic}, an area to strengthen.`,
    };
  }
  if (unfinishedWithPrereqs.length) {
    return {
      lesson: unfinishedWithPrereqs[0],
      reason: "Continue your learning path.",
    };
  }

  // 3. First unfinished lesson overall (preregs not yet met) — guide the learner.
  const unfinishedAny = lessons.find((l) => !progress[l.id]);
  if (unfinishedAny) {
    const firstUnmet = unfinishedAny.prerequisites.find((p) => !progress[p]);
    return {
      lesson: unfinishedAny,
      reason: firstUnmet
        ? `Complete the prerequisite lesson first to unlock this.`
        : "Continue your learning path.",
    };
  }

  // 4. If everything is done and nothing needs review, suggest the oldest
  // completed lesson to revisit for retention.
  const oldest = lessons.find((l) => progress[l.id]);
  if (oldest) {
    return { lesson: oldest, reason: "You've finished all lessons — review to maintain mastery." };
  }
  return null;
}

/**
 * Map a grammar lesson topic to related vocabulary categories/topics so the
 * lesson view can surface "Related vocabulary". Returns an array of category
 * strings to filter the vocabulary word bank by.
 */
export function relatedVocabCategories(lesson: GrammarLesson): string[] {
  const t = lesson.topic.toLowerCase();
  const out: string[] = [];
  if (t.includes("tense") || t.includes("trend")) out.push("Trend", "Comparison");
  if (t.includes("comparison")) out.push("Comparison", "Trend");
  if (t.includes("article") || t.includes("noun")) out.push("Academic");
  if (t.includes("clause") || t.includes("cohesion")) out.push("Academic", "Communication");
  if (t.includes("modal")) out.push("Academic", "Communication");
  if (t.includes("voice") || t.includes("passive")) out.push("Academic", "Science");
  if (t.includes("register")) out.push("Communication", "Business");
  if (t.includes("punctuation") || t.includes("sentence structure")) out.push("Academic");
  if (t.includes("conditional")) out.push("Academic", "Abstract");
  return [...new Set(out)];
}
