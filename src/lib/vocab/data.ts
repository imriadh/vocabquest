// Central vocabulary data source. Combines the base sample dataset with the
// IELTS-focused extra batches so the rest of the app imports from one place.
import { sampleWords } from "./sample-data";
import { extraWordsA } from "./sample-data-extra-a";
import { extraWordsB } from "./sample-data-extra-b";
import { extraWordsC } from "./sample-data-extra-c";
import { extraWordsD } from "./sample-data-extra-d";
import { extraWordsE } from "./sample-data-extra-e";
import { extraWordsF } from "./sample-data-extra-f";
import { extraWordsG } from "./sample-data-extra-g";
import { enrichmentMap } from "./enrichment-map";
import type { Word } from "./sample-data";

// Deduplicate by id (and by lowercased word) so accidental overlaps between
// the hand-authored batches never produce duplicate React keys.
function dedupe(words: Word[]): Word[] {
  const seen = new Set<string>();
  const out: Word[] = [];
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

// Apply the non-mutating enrichment backfill to original entries. Existing
// fields on a Word entry are ALWAYS preserved (we only fill MISSING optional
// IELTS fields), so user SRS state keyed by word id is never disturbed.
function applyEnrichment(words: Word[]): Word[] {
  return words.map((w) => {
    const e = enrichmentMap[w.id];
    if (!e) return w;
    return {
      ...w,
      cefr: w.cefr ?? e.cefr,
      collocations: w.collocations ?? e.collocations,
      wordFamily: w.wordFamily ?? e.wordFamily,
      commonMistake: w.commonMistake ?? e.commonMistake,
    };
  });
}

export const allSampleWords = applyEnrichment(
  dedupe([
    ...sampleWords,
    ...extraWordsA,
    ...extraWordsB,
    ...extraWordsC,
    ...extraWordsD,
    ...extraWordsE,
    ...extraWordsF,
    ...extraWordsG,
  ])
);

export {
  sampleWords,
  extraWordsA,
  extraWordsB,
  extraWordsC,
  extraWordsD,
  extraWordsE,
  extraWordsF,
  extraWordsG,
  enrichmentMap,
};
export type { Word, Difficulty, Exam, CefrLevel, WordFamily } from "./sample-data";
