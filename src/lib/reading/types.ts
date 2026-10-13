// IELTS Reading Practice data model.
//
// Passages are static, original, hand-authored content (like the vocab and
// grammar datasets) — stored as TS data, not in the DB. User progress lives
// in the existing Zustand store reading slice and syncs via the existing
// RemoteProgressBlob → User.progress blob (same pattern as vocab + grammar).
// No DB migration needed.

export type ReadingStage = 1 | 2 | 3 | 4 | 5;

export type QuestionType =
  | "mc" // multiple choice
  | "tfng" // True / False / Not Given (factual)
  | "ynng" // Yes / No / Not Given (writer's views/claims)
  | "matching-headings" // match heading to paragraph
  | "matching-info" // match information to paragraph
  | "sentence-completion" // complete the sentence
  | "short-answer"; // short text answer

export interface ReadingQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  // For mc / tfng / ynng / sentence-completion (mc-style): the options.
  options?: string[];
  // Canonical correct answer (matched case-insensitively after normalisation).
  // For matching-* questions, this is the paragraph label(s) that match.
  answer: string;
  // Alternative acceptable answers (e.g. "True"/"T", "don't"/"do not").
  acceptable?: string[];
  explanation: string;
  // Exact span from the passage that supports the answer (evidence).
  evidence: string;
  // Which paragraph/section the evidence is in (optional, for reference).
  paragraphRef?: string;
}

export interface ReadingPassage {
  id: string;
  slug: string;
  title: string;
  stage: ReadingStage;
  difficulty: "beginner" | "intermediate" | "advanced";
  topic: string; // e.g. "Environment", "Technology", "Education"
  // Estimated reading time in minutes (for the passage text alone).
  estimatedReadingMinutes: number;
  // The passage body. Paragraphs separated by "\n\n".
  passage: string;
  // Intro shown before the passage (sets context, teaches the skill).
  intro: string;
  // Skill focus for this stage (e.g. "Skimming for the main idea").
  skillFocus: string;
  questions: ReadingQuestion[];
  // Related vocab word ids (from the existing word bank) for lookup/linking.
  relatedVocabIds?: string[];
  // Related grammar lesson ids for linking.
  relatedGrammarLessonIds?: string[];
  estimatedMinutes: number; // total estimated completion time
  version: number;
  status: "published";
}

export const readingStageLabels: Record<ReadingStage, string> = {
  1: "Stage 1 — Find the answer",
  2: "Stage 2 — Skim, scan & paraphrase",
  3: "Stage 3 — IELTS question types",
  4: "Stage 4 — Inference & writer's views",
  5: "Stage 5 — Timed mixed practice",
};

export const readingStageSkills: Record<ReadingStage, string> = {
  1: "Short passages, understanding the main idea, identifying key information, and finding answers in the text.",
  2: "Skimming, scanning, paraphrase recognition, and locating supporting evidence.",
  3: "True/False/Not Given, multiple choice, matching headings, matching information, and sentence completion.",
  4: "Longer passages, challenging vocabulary, inference, writer's views, and Yes/No/Not Given.",
  5: "Timed passage practice and mixed question sets.",
};

export const questionTypeLabels: Record<QuestionType, string> = {
  mc: "Multiple choice",
  tfng: "True / False / Not Given",
  ynng: "Yes / No / Not Given (writer's views)",
  "matching-headings": "Matching headings",
  "matching-info": "Matching information",
  "sentence-completion": "Sentence completion",
  "short-answer": "Short answer",
};
