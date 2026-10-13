// Central vocabulary data source. Combines the base sample dataset with the
// IELTS-focused extra batches so the rest of the app imports from one place.
import { sampleWords } from "./sample-data";
import { extraWordsA } from "./sample-data-extra-a";
import { extraWordsB } from "./sample-data-extra-b";

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

export const allSampleWords = dedupe([...sampleWords, ...extraWordsA, ...extraWordsB]);

export { sampleWords, extraWordsA, extraWordsB };
export type { Word, Difficulty, Exam } from "./sample-data";
