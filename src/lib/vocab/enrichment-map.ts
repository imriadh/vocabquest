// Enrichment map — non-mutating backfill of IELTS metadata (cefr, collocations,
// wordFamily, commonMistake) for ~150 of the highest-value existing headwords
// in the original 572-entry collection (sample-data.ts + sample-data-extra-a.ts
// + sample-data-extra-b.ts).
//
// WHY THIS FILE EXISTS
//   User SRS state (per-user progress blob) is keyed by stable word `id`.
//   Editing the source data files risks altering ids/words and corrupting user
//   progress. This map is applied at LOAD TIME on top of the existing entries
//   — never mutating them — so it is fully safe and reversible.
//
// SOURCE
//   All keys correspond 1:1 to existing `id` values in
//   `backfill_candidates.json` (the 572 original entries). Batches C and D
//   (sample-data-extra-c.ts / sample-data-extra-d.ts) are NOT in that JSON,
//   so they are correctly excluded here — no double-enrichment.
//
// CONTENT
//   Every collocation, word-family form, and common-mistake observation was
//   authored from scratch for this task. No content was copied from any
//   dictionary, textbook, or third-party dataset. Each entry's part of speech
//   was consulted against backfill_candidates.json so that collocations are
//   grammatically consistent with the headword's POS in the existing data.
//
// USAGE (suggested — not implemented here to keep this file non-mutating)
//   import { enrichmentMap } from "./enrichment-map";
//   const enriched = words.map(w => enrichmentMap[w.id]
//     ? { ...w, ...(enrichmentMap[w.id].cefr ? { cefr: enrichmentMap[w.id].cefr } : {}),
//         ...(enrichmentMap[w.id].collocations ? { collocations: enrichmentMap[w.id].collocations } : {}),
//         ...(enrichmentMap[w.id].wordFamily ? { wordFamily: enrichmentMap[w.id].wordFamily } : {}),
//         ...(enrichmentMap[w.id].commonMistake ? { commonMistake: enrichmentMap[w.id].commonMistake } : {}) }
//     : w);

import type { CefrLevel, WordFamily } from "./sample-data";

export interface Enrichment {
  cefr: CefrLevel;        // "A2" | "B1" | "B2" | "C1" | "C2"
  collocations: string[]; // 2-4 NATURAL, validated combos using the headword
  wordFamily?: WordFamily; // grammatically valid same-headword forms (omitted if none)
  commonMistake?: string;  // genuine common learner error (omitted if none)
}

export const enrichmentMap: Record<string, Enrichment> = {
  // ========================================================================
  // DISCOURSE MARKERS (high-yield for IELTS Writing Task 2)
  // ========================================================================
  "accordingly": {
    cefr: "C1",
    collocations: ["act accordingly", "plan accordingly", "adjust accordingly"],
    commonMistake: "'Accordingly' means 'therefore' or 'in a corresponding way'. Do not confuse it with 'according to me' — for personal opinion use 'in my opinion' instead."
  },
  "consequently": {
    cefr: "B2",
    collocations: ["consequently, demand fell", "consequently, the policy changed", "consequently, growth slowed"],
    commonMistake: "Spelling: c-o-n-s-e-q-u-e-n-t-l-y. Learners often miss the second 'e' and write 'consequantly'."
  },
  "furthermore": {
    cefr: "B2",
    collocations: ["furthermore, the data shows", "furthermore, it is clear that", "furthermore, research indicates"],
    commonMistake: "'Furthermore' is one word. Learners sometimes write 'further more' as two words."
  },
  "hence": {
    cefr: "C1",
    collocations: ["hence the need", "hence the importance", "hence the delay"],
    commonMistake: "'Hence' already implies the reason, so following it with 'because' is redundant: write 'hence the delay', not 'hence because of the delay'."
  },
  "however": {
    cefr: "B1",
    collocations: ["however, the results show", "however, this approach", "however, critics argue"],
    commonMistake: "When used as a discourse marker, 'however' is followed by a comma: 'However, ...'. Learners often omit the comma."
  },
  "nevertheless": {
    cefr: "C1",
    collocations: ["nevertheless, the evidence suggests", "nevertheless, the plan continues", "nevertheless, demand remained stable"],
    commonMistake: "Spelling: 'nevertheless' is one word. Learners sometimes write 'never the less'."
  },
  "nonetheless": {
    cefr: "C1",
    collocations: ["nonetheless, demand grew", "nonetheless, the project went ahead", "nonetheless, concerns remain"],
    commonMistake: "'Nonetheless' is one word. It is used similarly to 'nevertheless' but is slightly more emphatic."
  },
  "thereby": {
    cefr: "C1",
    collocations: ["thereby reducing costs", "thereby increasing efficiency", "thereby creating jobs"],
    commonMistake: "'Thereby' is followed by an -ing form: 'thereby reducing', not 'thereby to reduce'."
  },
  "therefore": {
    cefr: "B2",
    collocations: ["therefore, the conclusion is", "therefore, we must act", "therefore, the policy failed"],
    commonMistake: "Spelling: t-h-e-r-e-f-o-r-e. Learners sometimes drop the final 'e' and write 'therefor'."
  },
  "thus": {
    cefr: "C1",
    collocations: ["thus, the hypothesis was confirmed", "thus proving the theory", "thus demonstrating"],
    commonMistake: "'Thus' can be followed by an -ing form ('thus demonstrating...'), not 'to + verb' — write 'thus demonstrating', not 'thus to demonstrate'."
  },
  "whereas": {
    cefr: "B2",
    collocations: ["whereas urban areas grow", "whereas the opposite is true", "whereas rural populations decline"],
    commonMistake: "'Whereas' introduces a contrast, not a cause. Do not use it in place of 'because'."
  },

  // ========================================================================
  // ABSTRACT NOUNS (high-frequency in IELTS Reading passages and Writing Task 2)
  // ========================================================================
  "concept": {
    cefr: "B2",
    collocations: ["introduce a concept", "grasp a concept", "develop a concept"],
    wordFamily: { noun: ["concept", "conception"], adjective: ["conceptual"] },
    commonMistake: "Use 'concept' (noun) for the idea and 'conceptual' (adjective) to describe it: 'a conceptual framework', not 'a concept framework'."
  },
  "consequence": {
    cefr: "B2",
    collocations: ["face the consequences", "unintended consequences", "as a consequence of"],
    wordFamily: { noun: ["consequence"], adjective: ["consequential"], adverb: ["consequently"] },
    commonMistake: "Spelling: c-o-n-s-e-q-u-e-n-c-e. The second 'e' is often missed."
  },
  "distinction": {
    cefr: "C1",
    collocations: ["draw a distinction", "a clear distinction", "make a distinction between"],
    wordFamily: { noun: ["distinction"], adjective: ["distinct", "distinctive"], verb: ["distinguish"] },
    commonMistake: "Do not confuse 'distinction' (the act of distinguishing) with 'distinct' (adjective meaning clearly different)."
  },
  "entity": {
    cefr: "C1",
    collocations: ["a separate entity", "a legal entity", "a single entity"]
  },
  "factor": {
    cefr: "B2",
    collocations: ["a key factor", "a contributing factor", "a decisive factor"],
    wordFamily: { noun: ["factor"], verb: ["factor"] }
  },
  "perspective": {
    cefr: "B2",
    collocations: ["from a fresh perspective", "a broader perspective", "offer a perspective on"],
    commonMistake: "Spelling: p-e-r-s-p-e-c-t-i-v-e. Learners sometimes write 'prospective' — a different word meaning 'future' or 'potential'."
  },
  "phenomenon": {
    cefr: "C1",
    collocations: ["a common phenomenon", "a global phenomenon", "a recent phenomenon"],
    wordFamily: { noun: ["phenomenon", "phenomena"], adjective: ["phenomenal"] },
    commonMistake: "'Phenomenon' is singular; the plural is 'phenomena', not 'phenomenons'."
  },
  "principle": {
    cefr: "B2",
    collocations: ["a basic principle", "in principle", "a guiding principle"],
    wordFamily: { noun: ["principle"], adjective: ["principled"] },
    commonMistake: "Do not confuse 'principle' (a fundamental truth or rule) with 'principal' (the head of a school, or meaning main/most important)."
  },
  "significance": {
    cefr: "C1",
    collocations: ["of great significance", "the significance of", "historical significance"],
    wordFamily: { noun: ["significance"], adjective: ["significant"], adverb: ["significantly"] },
    commonMistake: "Spelling: s-i-g-n-i-f-i-c-a-n-c-e (root 'signify'). Learners sometimes write 'significance' as 'signifance'."
  },
  "tendency": {
    cefr: "B2",
    collocations: ["a tendency to", "a tendency toward", "display a tendency"],
    wordFamily: { noun: ["tendency"], verb: ["tend"] }
  },
  "requirement": {
    cefr: "B2",
    collocations: ["meet a requirement", "a legal requirement", "a basic requirement"],
    wordFamily: { noun: ["requirement"], verb: ["require"], adjective: ["requisite"] }
  },
  "outcome": {
    cefr: "B2",
    collocations: ["a positive outcome", "the final outcome", "a desired outcome"],
    commonMistake: "'Outcome' is one word. Learners sometimes write 'out come' as two words."
  },
  "strategy": {
    cefr: "B2",
    collocations: ["adopt a strategy", "an effective strategy", "implement a strategy"],
    wordFamily: { noun: ["strategy", "strategist"], adjective: ["strategic"], adverb: ["strategically"] }
  },
  "paradigm": {
    cefr: "C2",
    collocations: ["a new paradigm", "a paradigm shift", "the dominant paradigm"],
    wordFamily: { noun: ["paradigm"], adjective: ["paradigmatic"] },
    commonMistake: "Pronunciation: /ˈpærəˌdaɪm/ — the final syllable rhymes with 'dime', not 'dig-em'."
  },
  "dichotomy": {
    cefr: "C2",
    collocations: ["a false dichotomy", "a dichotomy between", "create a dichotomy"],
    wordFamily: { noun: ["dichotomy"], adjective: ["dichotomous"] },
    commonMistake: "Pronunciation: /daɪˈkɒtəmi/ — emphasis on the second syllable, with a hard 'k' sound."
  },

  // ========================================================================
  // DESCRIBING ADJECTIVES (high-frequency in IELTS Reading/Writing)
  // ========================================================================
  "abstract": {
    cefr: "B2",
    collocations: ["abstract concept", "abstract idea", "abstract thinking"],
    wordFamily: { noun: ["abstraction"], verb: ["abstract"], adjective: ["abstract"] }
  },
  "accurate": {
    cefr: "B2",
    collocations: ["accurate data", "an accurate estimate", "accurate information"],
    wordFamily: { noun: ["accuracy"], adjective: ["accurate"], adverb: ["accurately"] },
    commonMistake: "Spelling: a-c-c-u-r-a-t-e. The double 'c' at the start is often missed."
  },
  "adequate": {
    cefr: "B2",
    collocations: ["adequate resources", "adequate funding", "adequate preparation"],
    wordFamily: { noun: ["adequacy"], adjective: ["adequate"], adverb: ["adequately"] },
    commonMistake: "'Adequate' means 'enough for the purpose', not 'excellent'. Do not use it as a strong positive — for praise use 'excellent' or 'outstanding'."
  },
  "apparent": {
    cefr: "B2",
    collocations: ["it became apparent", "an apparent contradiction", "the apparent cause"],
    wordFamily: { noun: ["appearance"], verb: ["appear"], adjective: ["apparent"] }
  },
  "appropriate": {
    cefr: "B2",
    collocations: ["appropriate measures", "an appropriate response", "deemed appropriate"],
    wordFamily: { noun: ["appropriateness"], verb: ["appropriate"], adjective: ["appropriate"], adverb: ["appropriately"] },
    commonMistake: "The verb 'appropriate' (to take for one's own use) is pronounced /əˈprəʊprieɪt/, different from the adjective /əˈprəʊpriət/."
  },
  "ambiguous": {
    cefr: "C1",
    collocations: ["an ambiguous statement", "ambiguous wording", "deliberately ambiguous"],
    wordFamily: { noun: ["ambiguity"], adjective: ["ambiguous"], adverb: ["ambiguously"] }
  },
  "coherent": {
    cefr: "C1",
    collocations: ["a coherent argument", "coherent reasoning", "a coherent narrative"],
    wordFamily: { noun: ["coherence"], verb: ["cohere"], adjective: ["coherent"], adverb: ["coherently"] }
  },
  "cohesive": {
    cefr: "C1",
    collocations: ["a cohesive unit", "cohesive devices", "a cohesive society"],
    wordFamily: { noun: ["cohesion"], verb: ["cohere"], adjective: ["cohesive"] }
  },
  "consistent": {
    cefr: "B2",
    collocations: ["consistent results", "consistent with", "a consistent pattern"],
    wordFamily: { noun: ["consistency"], verb: ["consist"], adjective: ["consistent"], adverb: ["consistently"] }
  },
  "considerable": {
    cefr: "B2",
    collocations: ["considerable effort", "considerable amount", "considerable impact"],
    wordFamily: { verb: ["consider"], adjective: ["considerable"], adverb: ["considerably"] },
    commonMistake: "'Considerable' means 'large in amount', not 'worth considering'. 'A considerable sum' means a large sum."
  },
  "comprehensive": {
    cefr: "C1",
    collocations: ["a comprehensive review", "comprehensive coverage", "a comprehensive approach"],
    wordFamily: { noun: ["comprehension"], verb: ["comprehend"], adjective: ["comprehensive"], adverb: ["comprehensively"] }
  },
  "credible": {
    cefr: "C1",
    collocations: ["a credible source", "a credible explanation", "credible evidence"],
    wordFamily: { noun: ["credibility"], adjective: ["credible"], adverb: ["credibly"] }
  },
  "crucial": {
    cefr: "B2",
    collocations: ["a crucial role", "crucial evidence", "a crucial factor"],
    commonMistake: "Spelling: c-r-u-c-i-a-l. Learners sometimes write 'crutial' or 'crusial'."
  },
  "deliberate": {
    cefr: "C1",
    collocations: ["a deliberate attempt", "a deliberate decision", "deliberate effort"],
    wordFamily: { noun: ["deliberation"], verb: ["deliberate"], adjective: ["deliberate"], adverb: ["deliberately"] },
    commonMistake: "Adjective /dɪˈlɪbərət/ vs verb /dɪˈlɪbəreɪt/ — different final-syllable stress."
  },
  "distinct": {
    cefr: "B2",
    collocations: ["distinct categories", "a distinct advantage", "distinct from"],
    wordFamily: { noun: ["distinction"], verb: ["distinguish"], adjective: ["distinct", "distinctive"], adverb: ["distinctly"] }
  },
  "diverse": {
    cefr: "B2",
    collocations: ["a diverse range", "diverse backgrounds", "culturally diverse"],
    wordFamily: { noun: ["diversity"], verb: ["diversify"], adjective: ["diverse"], adverb: ["diversely"] }
  },
  "effective": {
    cefr: "B2",
    collocations: ["an effective strategy", "effective measures", "highly effective"],
    wordFamily: { noun: ["effect", "effectiveness"], verb: ["effect"], adjective: ["effective"], adverb: ["effectively"] },
    commonMistake: "Do not confuse 'effective' (producing a result) with 'efficient' (using resources well). An effective process can still be inefficient."
  },
  "elaborate": {
    cefr: "C1",
    collocations: ["an elaborate plan", "elaborate detail", "an elaborate design"],
    wordFamily: { noun: ["elaboration"], verb: ["elaborate"], adjective: ["elaborate"], adverb: ["elaborately"] },
    commonMistake: "Adjective /ɪˈlæbərət/ vs verb /ɪˈlæbəreɪt/ — different final-syllable stress."
  },
  "empirical": {
    cefr: "C1",
    collocations: ["empirical evidence", "empirical research", "empirical data"],
    wordFamily: { noun: ["empiricism"], adjective: ["empirical"], adverb: ["empirically"] }
  },
  "essential": {
    cefr: "B2",
    collocations: ["an essential role", "essential for", "essential to"],
    wordFamily: { noun: ["essence"], adjective: ["essential"], adverb: ["essentially"] }
  },
  "evident": {
    cefr: "C1",
    collocations: ["it is evident that", "evident from", "increasingly evident"],
    wordFamily: { noun: ["evidence"], verb: ["evidence"], adjective: ["evident"] }
  },
  "explicit": {
    cefr: "C1",
    collocations: ["explicit instructions", "make explicit", "an explicit statement"],
    wordFamily: { noun: ["explicitness"], verb: ["explicate"], adjective: ["explicit"], adverb: ["explicitly"] },
    commonMistake: "Spelling: e-x-p-l-i-c-i-t. Learners sometimes write 'explicate' or miss the 'l' as in 'expicit'."
  },
  "extensive": {
    cefr: "B2",
    collocations: ["extensive research", "extensive damage", "extensive knowledge"],
    wordFamily: { noun: ["extent"], verb: ["extend"], adjective: ["extensive"], adverb: ["extensively"] }
  },
  "fundamental": {
    cefr: "B2",
    collocations: ["a fundamental difference", "fundamental to", "fundamental rights"],
    wordFamily: { noun: ["fundament"], adjective: ["fundamental"], adverb: ["fundamentally"] }
  },
  "genuine": {
    cefr: "B2",
    collocations: ["genuine concern", "a genuine attempt", "genuine interest"],
    wordFamily: { noun: ["genuineness"], adjective: ["genuine"], adverb: ["genuinely"] },
    commonMistake: "Spelling: g-e-n-u-i-n-e. Learners sometimes transpose the 'u' and 'i' and write 'geniune'."
  },
  "gradual": {
    cefr: "B2",
    collocations: ["a gradual change", "gradual decline", "gradual improvement"],
    wordFamily: { noun: ["gradualness"], adjective: ["gradual"], adverb: ["gradually"] }
  },
  "inevitable": {
    cefr: "C1",
    collocations: ["an inevitable consequence", "it seems inevitable", "inevitable outcome"],
    wordFamily: { noun: ["inevitability"], adjective: ["inevitable"], adverb: ["inevitably"] }
  },
  "inherent": {
    cefr: "C1",
    collocations: ["inherent in", "an inherent risk", "inherent flaws"],
    wordFamily: { noun: ["inherence"], adjective: ["inherent"], adverb: ["inherently"] },
    commonMistake: "The standard preposition in academic writing is 'inherent in', not 'inherent to'."
  },
  "pertinent": {
    cefr: "C1",
    collocations: ["a pertinent question", "pertinent to", "pertinent information"],
    wordFamily: { noun: ["pertinence"], adjective: ["pertinent"], adverb: ["pertinently"] }
  },
  "prevalent": {
    cefr: "C1",
    collocations: ["highly prevalent", "prevalent in", "increasingly prevalent"],
    wordFamily: { noun: ["prevalence"], adjective: ["prevalent"] }
  },
  "profound": {
    cefr: "C1",
    collocations: ["a profound impact", "profound changes", "profound implications"],
    wordFamily: { noun: ["profundity"], adjective: ["profound"], adverb: ["profoundly"] }
  },
  "prominent": {
    cefr: "B2",
    collocations: ["a prominent role", "a prominent figure", "prominent in"],
    wordFamily: { noun: ["prominence"], adjective: ["prominent"], adverb: ["prominently"] }
  },
  "relevant": {
    cefr: "B2",
    collocations: ["relevant to", "highly relevant", "relevant information"],
    wordFamily: { noun: ["relevance"], adjective: ["relevant"] }
  },
  "robust": {
    cefr: "C1",
    collocations: ["robust evidence", "a robust argument", "robust growth"],
    wordFamily: { noun: ["robustness"], adjective: ["robust"], adverb: ["robustly"] }
  },
  "substantial": {
    cefr: "B2",
    collocations: ["substantial evidence", "a substantial amount", "substantial improvement"],
    wordFamily: { noun: ["substance"], verb: ["substantiate"], adjective: ["substantial"], adverb: ["substantially"] }
  },
  "sufficient": {
    cefr: "B2",
    collocations: ["sufficient evidence", "sufficient resources", "sufficient to"],
    wordFamily: { noun: ["sufficiency"], verb: ["suffice"], adjective: ["sufficient"], adverb: ["sufficiently"] }
  },
  "systematic": {
    cefr: "C1",
    collocations: ["a systematic approach", "systematic review", "systematic analysis"],
    wordFamily: { noun: ["system"], adjective: ["systematic"], adverb: ["systematically"] }
  },
  "subtle": {
    cefr: "C1",
    collocations: ["a subtle difference", "subtle changes", "a subtle distinction"],
    wordFamily: { noun: ["subtlety"], adjective: ["subtle"], adverb: ["subtly"] },
    commonMistake: "Spelling: s-u-b-t-l-e. The 'b' is silent; learners sometimes write 'suttle' or omit the 'b'."
  },
  "tentative": {
    cefr: "C1",
    collocations: ["a tentative conclusion", "a tentative agreement", "tentative steps"],
    wordFamily: { noun: ["tentativeness"], adjective: ["tentative"], adverb: ["tentatively"] }
  },
  "viable": {
    cefr: "C1",
    collocations: ["a viable alternative", "a viable solution", "economically viable"],
    wordFamily: { noun: ["viability"], adjective: ["viable"] }
  },

  // ========================================================================
  // ACADEMIC VERBS (highest yield for IELTS Writing Task 2)
  // ========================================================================
  "abandon": {
    cefr: "B2",
    collocations: ["abandon a project", "abandon a habit", "abandon hope"],
    wordFamily: { noun: ["abandonment"], verb: ["abandon"] },
    commonMistake: "Spelling: a-b-a-n-d-o-n. Learners sometimes write 'abanden' or split it as 'aband on'."
  },
  "accelerate": {
    cefr: "C1",
    collocations: ["accelerate growth", "accelerate the process", "accelerate change"],
    wordFamily: { noun: ["acceleration"], verb: ["accelerate"], adjective: ["accelerated"] }
  },
  "accommodate": {
    cefr: "C1",
    collocations: ["accommodate needs", "accommodate change", "accommodate growth"],
    wordFamily: { noun: ["accommodation"], verb: ["accommodate"], adjective: ["accommodating"] },
    commonMistake: "Spelling: a-c-c-o-m-m-o-d-a-t-e — double 'c' and double 'm'."
  },
  "accomplish": {
    cefr: "B2",
    collocations: ["accomplish a goal", "accomplish a task", "accomplish little"],
    wordFamily: { noun: ["accomplishment"], verb: ["accomplish"], adjective: ["accomplished"] }
  },
  "acquire": {
    cefr: "C1",
    collocations: ["acquire knowledge", "acquire skills", "acquire property"],
    wordFamily: { noun: ["acquisition"], verb: ["acquire"] }
  },
  "adjust": {
    cefr: "B2",
    collocations: ["adjust to change", "adjust the settings", "adjust accordingly"],
    wordFamily: { noun: ["adjustment"], verb: ["adjust"], adjective: ["adjustable"] }
  },
  "administer": {
    cefr: "C1",
    collocations: ["administer a test", "administer aid", "administer a program"],
    wordFamily: { noun: ["administration", "administrator"], verb: ["administer"], adjective: ["administrative"] }
  },
  "analyze": {
    cefr: "B2",
    collocations: ["analyze data", "analyze the causes", "analyze the results"],
    wordFamily: { noun: ["analysis"], verb: ["analyze"], adjective: ["analytical"], adverb: ["analytically"] },
    commonMistake: "American spelling 'analyze' (British 'analyse'). The noun is 'analysis', not 'analization'."
  },
  "anticipate": {
    cefr: "C1",
    collocations: ["anticipate problems", "anticipate change", "anticipate demand"],
    wordFamily: { noun: ["anticipation"], verb: ["anticipate"], adjective: ["anticipatory"] }
  },
  "assess": {
    cefr: "B2",
    collocations: ["assess the impact", "assess the risk", "assess performance"],
    wordFamily: { noun: ["assessment", "assessor"], verb: ["assess"] }
  },
  "attain": {
    cefr: "C1",
    collocations: ["attain a goal", "attain a level", "attain success"],
    wordFamily: { noun: ["attainment"], verb: ["attain"] }
  },
  "attribute": {
    cefr: "C1",
    collocations: ["attribute to", "attribute a cause", "attribute success to"],
    wordFamily: { noun: ["attribution", "attribute"], verb: ["attribute"], adjective: ["attributable"] },
    commonMistake: "Verb /əˈtrɪbjuːt/ vs noun /ˈætrɪbjuːt/ — different stress depending on part of speech."
  },
  "cite": {
    cefr: "C1",
    collocations: ["cite a source", "cite evidence", "cite an example"],
    wordFamily: { noun: ["citation"], verb: ["cite"] },
    commonMistake: "Spelling: c-i-t-e. Do not confuse with 'site' (a location) or 'sight' (vision)."
  },
  "clarify": {
    cefr: "B2",
    collocations: ["clarify a point", "clarify the meaning", "clarify the situation"],
    wordFamily: { noun: ["clarity", "clarification"], verb: ["clarify"] }
  },
  "compile": {
    cefr: "C1",
    collocations: ["compile data", "compile a report", "compile a list"],
    wordFamily: { noun: ["compilation"], verb: ["compile"] }
  },
  "conclude": {
    cefr: "B2",
    collocations: ["conclude that", "conclude an agreement", "to conclude"],
    wordFamily: { noun: ["conclusion"], verb: ["conclude"], adjective: ["conclusive"], adverb: ["conclusively"] }
  },
  "constitute": {
    cefr: "C1",
    collocations: ["constitute a threat", "constitute a majority", "constitute an offense"],
    wordFamily: { noun: ["constitution", "constituent"], verb: ["constitute"], adjective: ["constituent"] }
  },
  "construct": {
    cefr: "C1",
    collocations: ["construct a theory", "construct an argument", "construct a model"],
    wordFamily: { noun: ["construction", "construct"], verb: ["construct"], adjective: ["constructive"] }
  },
  "convey": {
    cefr: "C1",
    collocations: ["convey a message", "convey meaning", "convey information"],
    wordFamily: { noun: ["conveyance"], verb: ["convey"] }
  },
  "coordinate": {
    cefr: "C1",
    collocations: ["coordinate efforts", "coordinate activities", "coordinate a campaign"],
    wordFamily: { noun: ["coordination", "coordinator"], verb: ["coordinate"], adjective: ["coordinated"] }
  },
  "demonstrate": {
    cefr: "B2",
    collocations: ["demonstrate that", "demonstrate ability", "demonstrate commitment"],
    wordFamily: { noun: ["demonstration"], verb: ["demonstrate"], adjective: ["demonstrative"] }
  },
  "derive": {
    cefr: "C1",
    collocations: ["derive from", "derive benefit", "derive a conclusion"],
    wordFamily: { noun: ["derivation"], verb: ["derive"], adjective: ["derivative"] }
  },
  "detect": {
    cefr: "C1",
    collocations: ["detect a change", "detect a problem", "detect patterns"],
    wordFamily: { noun: ["detection", "detector"], verb: ["detect"], adjective: ["detective"] }
  },
  "diminish": {
    cefr: "C1",
    collocations: ["diminish in importance", "diminish the risk", "diminish returns"],
    wordFamily: { noun: ["diminution"], verb: ["diminish"] }
  },
  "emphasize": {
    cefr: "B2",
    collocations: ["emphasize the importance", "emphasize that", "emphasize a point"],
    wordFamily: { noun: ["emphasis"], verb: ["emphasize"], adjective: ["emphatic"], adverb: ["emphatically"] },
    commonMistake: "The noun is 'emphasis' (not 'emphasization'). American verb 'emphasize'; British 'emphasise'."
  },
  "enhance": {
    cefr: "B2",
    collocations: ["enhance performance", "enhance quality", "enhance understanding"],
    wordFamily: { noun: ["enhancement"], verb: ["enhance"] }
  },
  "ensure": {
    cefr: "B2",
    collocations: ["ensure that", "ensure safety", "ensure compliance"],
    commonMistake: "Do not confuse 'ensure' (make sure) with 'insure' (protect against risk) or 'assure' (reassure someone)."
  },
  "establish": {
    cefr: "B2",
    collocations: ["establish a standard", "establish a link", "establish a relationship"],
    wordFamily: { noun: ["establishment"], verb: ["establish"], adjective: ["established"] }
  },
  "evaluate": {
    cefr: "B2",
    collocations: ["evaluate the effectiveness", "evaluate performance", "evaluate options"],
    wordFamily: { noun: ["evaluation"], verb: ["evaluate"] }
  },
  "expand": {
    cefr: "B2",
    collocations: ["expand operations", "expand access", "expand the scope"],
    wordFamily: { noun: ["expansion"], verb: ["expand"], adjective: ["expansive"] }
  },
  "expose": {
    cefr: "C1",
    collocations: ["expose to risk", "expose the truth", "expose people to"],
    wordFamily: { noun: ["exposure"], verb: ["expose"], adjective: ["exposed"] }
  },
  "fluctuate": {
    cefr: "C1",
    collocations: ["fluctuate widely", "prices fluctuate", "fluctuate between"],
    wordFamily: { noun: ["fluctuation"], verb: ["fluctuate"] }
  },
  "highlight": {
    cefr: "B2",
    collocations: ["highlight the importance", "highlight a problem", "highlight a trend"],
    wordFamily: { noun: ["highlight"], verb: ["highlight"] }
  },
  "illustrate": {
    cefr: "B2",
    collocations: ["illustrate a point", "illustrate with examples", "illustrate the trend"],
    wordFamily: { noun: ["illustration"], verb: ["illustrate"], adjective: ["illustrative"] }
  },
  "imply": {
    cefr: "C1",
    collocations: ["imply that", "the results imply", "imply a need"],
    wordFamily: { noun: ["implication"], verb: ["imply"], adjective: ["implicit"] },
    commonMistake: "Do not confuse 'imply' (the speaker/writer suggests) with 'infer' (the listener/reader concludes). The speaker implies; the listener infers."
  },
  "initiate": {
    cefr: "C1",
    collocations: ["initiate a process", "initiate change", "initiate a discussion"],
    wordFamily: { noun: ["initiation", "initiative"], verb: ["initiate"] }
  },
  "interpret": {
    cefr: "C1",
    collocations: ["interpret data", "interpret the results", "interpret a law"],
    wordFamily: { noun: ["interpretation", "interpreter"], verb: ["interpret"], adjective: ["interpretive"] }
  },
  "investigate": {
    cefr: "B2",
    collocations: ["investigate the causes", "investigate a problem", "investigate the issue"],
    wordFamily: { noun: ["investigation", "investigator"], verb: ["investigate"] }
  },
  "isolate": {
    cefr: "C1",
    collocations: ["isolate the cause", "isolate variables", "isolate a group"],
    wordFamily: { noun: ["isolation"], verb: ["isolate"], adjective: ["isolated"] }
  },
  "justify": {
    cefr: "C1",
    collocations: ["justify a decision", "justify the cost", "justify the claim"],
    wordFamily: { noun: ["justification"], verb: ["justify"], adjective: ["justifiable"] }
  },
  "maintain": {
    cefr: "B2",
    collocations: ["maintain standards", "maintain a balance", "maintain that"],
    wordFamily: { noun: ["maintenance"], verb: ["maintain"], adjective: ["maintainable"] },
    commonMistake: "Noun spelling: 'maintenance' (not 'maintainance'). The 'ten' is retained from the Latin root."
  },
  "obtain": {
    cefr: "B2",
    collocations: ["obtain data", "obtain permission", "obtain a result"],
    wordFamily: { noun: ["obtainment"], verb: ["obtain"], adjective: ["obtainable"] }
  },
  "outline": {
    cefr: "B2",
    collocations: ["outline a plan", "outline the main points", "outline a strategy"]
  },
  "propose": {
    cefr: "B2",
    collocations: ["propose a solution", "propose a plan", "propose that"],
    wordFamily: { noun: ["proposal", "proposition"], verb: ["propose"] }
  },
  "summarize": {
    cefr: "B2",
    collocations: ["summarize the findings", "summarize the main points", "to summarize"],
    wordFamily: { noun: ["summary"], verb: ["summarize"] }
  },
  "validate": {
    cefr: "C1",
    collocations: ["validate a claim", "validate the results", "validate a hypothesis"],
    wordFamily: { noun: ["validation", "validity"], verb: ["validate"], adjective: ["valid"] }
  },
  "refute": {
    cefr: "C1",
    collocations: ["refute a claim", "refute an argument", "refute the allegation"],
    wordFamily: { noun: ["refutation"], verb: ["refute"] },
    commonMistake: "Strictly, 'refute' means to prove wrong with evidence. Used loosely as 'deny' (without proof), it is disputed — prefer 'deny' or 'contest' when no proof is offered."
  },
  "reinforce": {
    cefr: "C1",
    collocations: ["reinforce a point", "reinforce the argument", "reinforce stereotypes"],
    wordFamily: { noun: ["reinforcement"], verb: ["reinforce"], adjective: ["reinforced"] }
  },
  "assert": {
    cefr: "C1",
    collocations: ["assert that", "assert authority", "assert the right"],
    wordFamily: { noun: ["assertion"], verb: ["assert"], adjective: ["assertive"], adverb: ["assertively"] }
  },
  "substantiate": {
    cefr: "C1",
    collocations: ["substantiate a claim", "substantiate the argument", "substantiate with evidence"],
    wordFamily: { noun: ["substance"], verb: ["substantiate"], adjective: ["substantial"] }
  },
  "consolidate": {
    cefr: "C1",
    collocations: ["consolidate power", "consolidate gains", "consolidate data"],
    wordFamily: { noun: ["consolidation"], verb: ["consolidate"], adjective: ["consolidated"] }
  },
  "scrutinize": {
    cefr: "C2",
    collocations: ["scrutinize the data", "scrutinize the evidence", "closely scrutinize"],
    wordFamily: { noun: ["scrutiny"], verb: ["scrutinize"] }
  },
  "yield": {
    cefr: "C1",
    collocations: ["yield results", "yield benefits", "yield to pressure"],
    wordFamily: { noun: ["yield"], verb: ["yield"] }
  },
  "mitigate": {
    cefr: "C1",
    collocations: ["mitigate the impact", "mitigate the risk", "mitigating circumstances"],
    wordFamily: { noun: ["mitigation"], verb: ["mitigate"], adjective: ["mitigating"] },
    commonMistake: "Prescriptive grammarians prefer 'mitigate' alone (without 'against'); 'mitigate against' is often considered non-standard, though increasingly common."
  },
  "exacerbate": {
    cefr: "C2",
    collocations: ["exacerbate the problem", "exacerbate tensions", "exacerbate the situation"],
    wordFamily: { noun: ["exacerbation"], verb: ["exacerbate"] },
    commonMistake: "Spelling: e-x-a-c-e-r-b-a-t-e. Learners sometimes write 'exhaserbate' or 'exacerabate'."
  },
  "ameliorate": {
    cefr: "C2",
    collocations: ["ameliorate conditions", "ameliorate poverty", "ameliorate the situation"],
    wordFamily: { noun: ["amelioration"], verb: ["ameliorate"] }
  },
  "marginalize": {
    cefr: "C2",
    collocations: ["marginalize a group", "marginalize voices", "be marginalized by"],
    wordFamily: { noun: ["marginalization"], verb: ["marginalize"], adjective: ["marginal"] }
  },
  "perpetuate": {
    cefr: "C1",
    collocations: ["perpetuate stereotypes", "perpetuate inequality", "perpetuate the cycle"],
    wordFamily: { noun: ["perpetuation"], verb: ["perpetuate"], adjective: ["perpetual"] }
  },
  "advocate": {
    cefr: "C1",
    collocations: ["advocate for change", "advocate a policy", "a strong advocate"],
    wordFamily: { noun: ["advocate", "advocacy"], verb: ["advocate"] },
    commonMistake: "Verb /ˈædvəkeɪt/ vs noun /ˈædvəkət/ — different final-syllable stress."
  },
  "articulate": {
    cefr: "C1",
    collocations: ["articulate a vision", "articulate clearly", "articulate the argument"],
    wordFamily: { noun: ["articulation"], verb: ["articulate"], adjective: ["articulate"] },
    commonMistake: "Verb /ɑːˈtɪkjʊleɪt/ vs adjective /ɑːˈtɪkjʊlət/ — different final-syllable stress."
  },

  // ========================================================================
  // TOPIC WORDS (high-frequency across the 8 IELTS domains)
  // ========================================================================
  "sustainability": {
    cefr: "C1",
    collocations: ["environmental sustainability", "promote sustainability", "long-term sustainability"],
    wordFamily: { noun: ["sustainability"], adjective: ["sustainable"], verb: ["sustain"], adverb: ["sustainably"] }
  },
  "conservation": {
    cefr: "B2",
    collocations: ["wildlife conservation", "energy conservation", "conservation efforts"],
    wordFamily: { noun: ["conservation"], verb: ["conserve"] }
  },
  "deforestation": {
    cefr: "C1",
    collocations: ["rate of deforestation", "halt deforestation", "cause deforestation"],
    wordFamily: { noun: ["deforestation"], verb: ["deforest"] }
  },
  "ecosystem": {
    cefr: "C1",
    collocations: ["a delicate ecosystem", "the marine ecosystem", "disrupt the ecosystem"]
  },
  "emission": {
    cefr: "B2",
    collocations: ["carbon emissions", "reduce emissions", "greenhouse gas emissions"],
    wordFamily: { noun: ["emission"], verb: ["emit"] }
  },
  "habitat": {
    cefr: "B2",
    collocations: ["natural habitat", "destroy habitat", "habitat loss"]
  },
  "renewable": {
    cefr: "B2",
    collocations: ["renewable energy", "renewable resources", "renewable sources"],
    wordFamily: { noun: ["renewal"], verb: ["renew"], adjective: ["renewable"] }
  },
  "biodiversity": {
    cefr: "C1",
    collocations: ["loss of biodiversity", "protect biodiversity", "marine biodiversity"]
  },
  "pollution": {
    cefr: "B2",
    collocations: ["air pollution", "reduce pollution", "water pollution"],
    wordFamily: { noun: ["pollution", "pollutant"], verb: ["pollute"], adjective: ["polluted"] }
  },
  "species": {
    cefr: "B2",
    collocations: ["endangered species", "native species", "a species of"],
    commonMistake: "'Species' is both singular and plural: 'one species', 'two species'. Do not write 'specie' — that means 'coin money'."
  },
  "curriculum": {
    cefr: "B2",
    collocations: ["the national curriculum", "curriculum reform", "follow the curriculum"],
    wordFamily: { noun: ["curriculum"], adjective: ["curricular"] }
  },
  "pedagogy": {
    cefr: "C2",
    collocations: ["modern pedagogy", "critical pedagogy", "approaches to pedagogy"],
    wordFamily: { noun: ["pedagogy"], adjective: ["pedagogical"], adverb: ["pedagogically"] },
    commonMistake: "Pronunciation: /ˈpɛdəɡɒdʒi/. The 'g' is hard /ɡ/, not soft /dʒ/."
  },
  "assessment": {
    cefr: "B2",
    collocations: ["formal assessment", "assessment of", "continuous assessment"],
    wordFamily: { noun: ["assessment", "assessor"], verb: ["assess"] }
  },
  "thesis": {
    cefr: "C1",
    collocations: ["a doctoral thesis", "write a thesis", "the central thesis"],
    commonMistake: "Plural is 'theses' /ˈθiːsiːz/, not 'thesises'."
  },
  "inflation": {
    cefr: "B2",
    collocations: ["control inflation", "rising inflation", "inflation rate"],
    wordFamily: { noun: ["inflation"], verb: ["inflate"], adjective: ["inflationary"] }
  },
  "deficit": {
    cefr: "C1",
    collocations: ["budget deficit", "trade deficit", "reduce the deficit"]
  },
  "subsidy": {
    cefr: "C1",
    collocations: ["government subsidy", "subsidies for", "withdraw a subsidy"],
    wordFamily: { noun: ["subsidy"], verb: ["subsidize"] },
    commonMistake: "Plural is 'subsidies' (drop 'y', add 'ies'), not 'subsidys'."
  },
  "expenditure": {
    cefr: "C1",
    collocations: ["public expenditure", "reduce expenditure", "capital expenditure"],
    wordFamily: { noun: ["expenditure"], verb: ["expend"] }
  },
  "recession": {
    cefr: "C1",
    collocations: ["economic recession", "in a recession", "recover from recession"],
    wordFamily: { noun: ["recession"], verb: ["recede"], adjective: ["recessionary"] }
  },
  "chronic": {
    cefr: "C1",
    collocations: ["chronic illness", "chronic pain", "a chronic problem"],
    commonMistake: "'Chronic' means 'long-lasting' (medical), not 'severe'. A chronic condition may be mild but persistent."
  },
  "epidemic": {
    cefr: "C1",
    collocations: ["an epidemic of", "control an epidemic", "the obesity epidemic"],
    wordFamily: { noun: ["epidemic"], adjective: ["epidemic"] }
  },
  "pandemic": {
    cefr: "C1",
    collocations: ["a global pandemic", "the flu pandemic", "during the pandemic"],
    wordFamily: { noun: ["pandemic"], adjective: ["pandemic"] }
  },
  "innovation": {
    cefr: "B2",
    collocations: ["technological innovation", "foster innovation", "drive innovation"],
    wordFamily: { noun: ["innovation"], verb: ["innovate"], adjective: ["innovative"], adverb: ["innovatively"] }
  },
  "integration": {
    cefr: "C1",
    collocations: ["social integration", "economic integration", "the integration of"],
    wordFamily: { noun: ["integration"], verb: ["integrate"], adjective: ["integrated"] }
  },
  "inequality": {
    cefr: "B2",
    collocations: ["wealth inequality", "reduce inequality", "growing inequality"],
    wordFamily: { noun: ["inequality"], adjective: ["unequal"], adverb: ["unequally"] }
  },
  "legislation": {
    cefr: "C1",
    collocations: ["pass legislation", "new legislation", "introduce legislation"],
    wordFamily: { noun: ["legislation", "legislator"], verb: ["legislate"], adjective: ["legislative"] }
  },
  "jurisdiction": {
    cefr: "C2",
    collocations: ["within the jurisdiction", "federal jurisdiction", "outside the jurisdiction"],
    wordFamily: { noun: ["jurisdiction"], adjective: ["jurisdictional"] }
  },
  "amendment": {
    cefr: "C1",
    collocations: ["a constitutional amendment", "propose an amendment", "the First Amendment"],
    wordFamily: { noun: ["amendment"], verb: ["amend"] }
  },
  "treaty": {
    cefr: "C1",
    collocations: ["sign a treaty", "a peace treaty", "ratify a treaty"]
  }
};

export const enrichmentMapCount = Object.keys(enrichmentMap).length;
