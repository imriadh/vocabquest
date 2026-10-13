// Central vocabulary data source. Combines the base sample dataset with the
// IELTS-focused extra batches so the rest of the app imports from one place.
import { sampleWords } from "./sample-data";
import { extraWordsA } from "./sample-data-extra-a";
import { extraWordsB } from "./sample-data-extra-b";
import { extraWordsC } from "./sample-data-extra-c";
import { extraWordsD } from "./sample-data-extra-d";

// Deduplicate by id (and by lowercased word) so accidental overlaps between
// the hand-authored batches never produce duplicate React keys.
function dedupe(words: typeof sampleWords): typeof sampleWords {
  const seen = new Set<string>();
  const out: typeof sampleWords = [];
  for (const w of words) {
    const key = w.id.toLowerCase();
    const wordKey = w.word.toLowerCase();
    if (seen.has(key) || seen.has(wordKey)) continue;
    seen.add(key);
    seen.add(wordKey);
    out.push(w);
  }
  return out;
}

export const allSampleWords = dedupe([
  ...sampleWords,
  ...extraWordsA,
  ...extraWordsB,
  ...extraWordsC,
  ...extraWordsD,
]);

export { sampleWords, extraWordsA, extraWordsB, extraWordsC, extraWordsD };
export type { Word, Difficulty, Exam, CefrLevel, WordFamily } from "./sample-data";
