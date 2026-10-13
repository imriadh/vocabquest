// Reading answer evaluation — deterministic, accepts reasonable alternatives.
import type { ReadingQuestion } from "./types";

function normalise(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[.?!]+$/g, "")
    .trim();
}

export function isReadingAnswerCorrect(q: ReadingQuestion, learnerAnswer: string): boolean {
  const expected = [q.answer, ...(q.acceptable ?? [])].map(normalise).filter(Boolean);
  if (expected.length === 0) return false;
  const given = normalise(learnerAnswer);
  if (!given) return false;
  return expected.includes(given);
}
