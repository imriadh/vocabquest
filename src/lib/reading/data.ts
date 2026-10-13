// Central reading passage data source — combines all stage batches.
import type { ReadingPassage } from "./types";
import { stage12Passages } from "./passages-stage-1-2";
import { stage35Passages } from "./passages-stage-3-5";

export const allReadingPassages: ReadingPassage[] = [
  ...stage12Passages,
  ...stage35Passages,
];

export const readingPassageCount = allReadingPassages.length;

export function getPassageById(id: string): ReadingPassage | undefined {
  return allReadingPassages.find((p) => p.id === id);
}

export { stage12Passages, stage35Passages };
export type {
  ReadingPassage,
  ReadingQuestion,
  ReadingStage,
  QuestionType,
} from "./types";
export { readingStageLabels, readingStageSkills, questionTypeLabels } from "./types";
