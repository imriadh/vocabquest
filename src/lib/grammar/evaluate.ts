// Grammar exercise answer evaluation — deterministic, accepts reasonable
// alternatives. Used by the lesson view to grade a learner's response.
import type { GrammarExercise } from "./types";

/**
 * Normalise a free-text answer for comparison: trim, lowercase, collapse
 * internal whitespace, and strip a trailing full stop.
 */
function normalise(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[.?!]+$/g, "")
    .trim();
}

/**
 * Returns true if the learner's answer is correct for the given exercise.
 * Accepts the canonical answer and any listed alternatives, after normalisation.
 */
export function isAnswerCorrect(exercise: GrammarExercise, learnerAnswer: string): boolean {
  const expected = [exercise.answer, ...(exercise.acceptable ?? [])]
    .map(normalise)
    .filter(Boolean);
  if (expected.length === 0) return false;
  const given = normalise(learnerAnswer);
  if (!given) return false;
  return expected.includes(given);
}

/** Short label for an exercise type, for UI badges. */
export function exerciseTypeLabel(type: string): string {
  switch (type) {
    case "mc":
      return "Multiple choice";
    case "fill-blank":
      return "Fill in the blank";
    case "correction":
      return "Correct the sentence";
    case "error-id":
      return "Identify the error";
    case "transformation":
      return "Sentence transformation";
    case "combine":
      return "Combine the sentences";
    case "order":
      return "Word order";
    default:
      return type;
  }
}
