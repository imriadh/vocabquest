// Grammar curriculum data model for the IELTS Grammar Learning Module.
//
// Design notes (AGENT.md §3, §6, §10):
// - Lessons are static, authored content (like the vocab sample datasets) —
//   stored as TS data, not in the DB. No migration needed.
// - User progress lives in the existing Zustand store (vocab-store) grammar
//   slice and syncs via the existing RemoteProgressBlob → User.progress blob,
//   so guests work and logged-in users sync across devices with zero new API.
// - Stable lesson ids (kebab-case slugs) are the keys; never change a slug once
//   published (it would orphan user progress).

export type GrammarLevel = "A" | "B" | "C" | "D";
export type CefrGrammar = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface GrammarExample {
  sentence: string;
  note?: string;
}

export interface IncorrectExample {
  sentence: string;
  error: string;
  correction: string;
}

export interface IeltsApplication {
  task?: string; // e.g. "Academic Task 1", "Task 2", "Speaking Part 2"
  note: string;
}

export type ExerciseType =
  | "mc"
  | "fill-blank"
  | "correction"
  | "error-id"
  | "transformation"
  | "combine"
  | "order";

export interface GrammarExercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  // mc: the options to choose from; the correct one is `answer`.
  options?: string[];
  // Canonical correct answer (string match, case-insensitive, trimmed).
  answer: string;
  // Alternative valid answers (e.g. "don't" / "do not").
  acceptable?: string[];
  explanation: string;
  // 1 = easy, 2 = medium, 3 = hard.
  difficulty: 1 | 2 | 3;
}

export interface GrammarLesson {
  id: string;
  slug: string;
  title: string;
  level: GrammarLevel;
  cefrLevel: CefrGrammar;
  topic: string;
  subtopic?: string;
  objectives: string[];
  explanation: string;
  bengaliExplanation?: string;
  pattern?: string;
  examples: GrammarExample[];
  incorrectExamples: IncorrectExample[];
  commonMistakes: string[];
  ieltsApplications: IeltsApplication[];
  exercises: GrammarExercise[];
  prerequisites: string[]; // lesson ids
  estimatedMinutes: number;
  version: number;
  status: "published";
}

// Coarse topic buckets used for error-category tracking on the dashboard.
export type GrammarTopic =
  | "Sentence structure"
  | "Agreement"
  | "Tense"
  | "Articles"
  | "Nouns"
  | "Comparisons"
  | "Clauses"
  | "Conditionals"
  | "Modals"
  | "Voice"
  | "Verb forms"
  | "Cohesion"
  | "Punctuation"
  | "Register";
