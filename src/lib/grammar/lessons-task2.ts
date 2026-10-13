// Original IELTS Writing Task 2 essay grammar lessons — Level C / B2.
//
// All explanations, examples, incorrect examples, common mistakes, IELTS
// applications, and exercises are original, hand-authored for this project.
// No content is copied from Cambridge, Oxford, British Council, IELTS
// official materials, or any other third-party source. External references
// (AGENT.md §12) were used only to prioritise topics, not to reproduce text.
//
// Level C = Writing Development (B2). These six lessons target the grammar
// features that make a Task 2 essay coherent, balanced, and academically
// persuasive: hedging, concession, cause-effect chains, passive reporting,
// parallel structures, and sentence-boundary control.

import type { GrammarLesson } from "./types";

export const task2Lessons: GrammarLesson[] = [
  // =====================================================================
  // LESSON 1 — Hedging & cautious academic claims
  // =====================================================================
  {
    id: "t2-hedging",
    slug: "t2-hedging-cautious-claims",
    title: "Hedging & Cautious Academic Claims",
    level: "C",
    cefrLevel: "B2",
    topic: "Register",
    subtopic: "Hedging and cautious claims",
    objectives: [
      "Use modal and reporting hedges (may, might, could, tends to, appears to, is likely to, arguably) to soften over-strong claims in Task 2.",
      "Distinguish when to hedge (debatable views, limited evidence, interpretation) from when to state firmly (widely accepted facts, definitions).",
      "Avoid both overclaiming and over-hedging so the writer's own position remains clear.",
    ],
    explanation:
      "Academic essays require careful claims. Instead of absolute statements such as \"X causes Y\", strong Task 2 writers use hedging language to acknowledge uncertainty, complexity, or limited evidence. Common hedges fall into four groups: modal verbs (may, might, could), reporting verbs (appears to, seems to, tends to, is likely to), adverbs (possibly, arguably, perhaps, presumably), and opinion structures (\"It could be argued that...\"). Hedge when you generalise from limited evidence, when you interpret data, or when you present a debatable view. State firmly when you cite widely accepted facts, definitions, or your own clearly-supported position. Over-hedging every sentence hides your voice; under-hedging sounds dogmatic and is easily attacked.",
    bengaliExplanation:
      "একাডেমিক রচনায় সতর্ক দাবি (hedging) প্রয়োজন। \"X causes Y\" না লিখে \"X may contribute to Y\" লিখলে যুক্তি বেশি গ্রহণযোগ্য হয়। may, might, could, tends to, appears to, is likely to, arguably — এসব শব্দ ব্যবহার করে claim-কে সতর্ক করুন। তবে অতিরিক্ত hedging যুক্তিকে দুর্বল করে এবং লেখকের নিজের অবস্থান অস্পষ্ট করে।",
    pattern: "Subject + hedge (may/might/could/tends to/appears to/seems to/is likely to) + claim.",
    examples: [
      {
        sentence: "Rising housing costs may force young adults to delay major life decisions.",
        note: "Modal \"may\" signals possibility without overclaiming a universal effect.",
      },
      {
        sentence: "Online learning appears to be most effective when paired with regular tutor feedback.",
        note: "Reporting verb \"appears to\" softens the claim and acknowledges limited evidence.",
      },
      {
        sentence: "It could be argued that motorised transport has done more harm than good in cities.",
        note: "Hedged opinion structure useful for introducing a balanced Task 2 position.",
      },
      {
        sentence: "Children who read regularly tend to perform better in academic assessments.",
        note: "\"Tends to\" presents a general pattern without claiming it is universal.",
      },
    ],
    incorrectExamples: [
      {
        sentence: "Smartphones destroy children\'s attention spans.",
        error: "Absolute verb (\"destroy\") with no hedge and no qualification; the claim is unsupported and easily contradicted.",
        correction: "Smartphones may damage children\'s attention spans, particularly when use is unmonitored.",
      },
      {
        sentence: "It is definitely true that all taxes reduce inequality.",
        error: "\"Definitely true\" and \"all\" make an absolute claim that is empirically contested; it weakens credibility.",
        correction: "Higher income taxes may help reduce inequality, though the effect depends on how revenue is spent.",
      },
    ],
    commonMistakes: [
      "Using absolute language (\"prove\", \"definitely\", \"always\", \"never\") in academic essays where a hedged claim is more defensible.",
      "Over-hedging every sentence so the writer\'s own position becomes invisible (\"Some people might perhaps possibly suggest that...\").",
      "Mixing formal hedges with informal ones (\"kinda\", \"sort of\"); keep hedges academic (may, tend to, arguably, presumably).",
    ],
    ieltsApplications: [
      { task: "Writing Task 2", note: "Hedging is essential when giving an opinion on a debatable prompt; it lets you acknowledge complexity without abandoning your position." },
      { task: "Writing Task 2", note: "Mix hedged claims for evidence with firm claims for widely accepted facts; overclaiming lowers your score for Task Response and Coherence." },
    ],
    exercises: [
      {
        id: "t2h-1",
        type: "mc",
        prompt: "Choose the most academically hedged version of the claim \"Social media causes anxiety in teenagers.\"",
        options: [
          "Social media definitely causes anxiety in teenagers.",
          "Social media may contribute to anxiety in some teenagers, particularly heavy users.",
          "Social media, kind of, causes anxiety in all teenagers.",
          "Social media is the only cause of anxiety in teenagers.",
        ],
        answer: "Social media may contribute to anxiety in some teenagers, particularly heavy users.",
        explanation: "The modal \"may\" hedges the causal claim; \"some\" and \"particularly heavy users\" qualify the scope, avoiding overclaiming.",
        difficulty: 2,
      },
      {
        id: "t2h-2",
        type: "fill-blank",
        prompt: "Complete with a suitable hedge verb (one word): Remote work ____ to improve work-life balance for employees with long commutes.",
        answer: "appears",
        acceptable: ["seems", "tends"],
        explanation: "\"Appears to\" / \"seems to\" / \"tends to\" all hedge the claim that remote work improves work-life balance. \"Appears\" is the most academic choice.",
        difficulty: 2,
      },
      {
        id: "t2h-3",
        type: "correction",
        prompt: "Rewrite to remove the overclaim: \"Electric cars completely solve the pollution problem in cities.\"",
        answer: "Electric cars may help reduce the pollution problem in cities, though they do not solve it entirely.",
        acceptable: [
          "electric cars may help reduce the pollution problem in cities, though they do not solve it entirely",
          "electric cars can help reduce pollution in cities, but they do not solve the problem entirely",
          "electric cars may reduce urban pollution, although they do not eliminate it",
        ],
        explanation: "Replace the absolute verb (\"completely solve\") with a hedged verb (\"may help reduce\") and add a qualification; this makes the claim defensible.",
        difficulty: 3,
      },
      {
        id: "t2h-4",
        type: "error-id",
        prompt: "Identify the overclaiming language: \"It is absolutely certain that banning cars will solve every urban problem.\"",
        answer: "absolutely certain",
        acceptable: ["absolutely certain that banning cars will solve every urban problem", "absolutely", "solve every urban problem", "absolutely certain"],
        explanation: "\"Absolutely certain\" plus \"solve every\" makes two absolute claims. Both should be hedged (e.g. \"likely to reduce many urban problems\").",
        difficulty: 3,
      },
    ],
    prerequisites: ["compound-complex-sentences"],
    estimatedMinutes: 14,
    version: 1,
    status: "published",
  },

  // =====================================================================
  // LESSON 2 — Concession & contrast clauses
  // =====================================================================
  {
    id: "t2-concession",
    slug: "t2-concession-contrast",
    title: "Concession & Contrast Clauses",
    level: "C",
    cefrLevel: "B2",
    topic: "Clauses",
    subtopic: "Concession and contrast",
    objectives: [
      "Use although, even though, though, while, whereas to introduce concession and contrast clauses with correct punctuation.",
      "Use despite + noun/V-ing and in spite of + noun/V-ing as prepositional concession structures.",
      "Avoid double conjunctions (\"although...but\", \"despite...but\") and the despite + clause error.",
    ],
    explanation:
      "Concession clauses acknowledge a counter-argument before stating your own; they are central to a balanced Task 2 essay. Subordinating conjunctions (although, even though, though) introduce a concession; while and whereas are usually used to contrast two parallel facts rather than concede a single point. When the concession clause comes first, place a comma after it; when it comes second, no comma is needed. Prepositional concession uses despite + noun phrase or despite + V-ing, never despite + full clause. Two errors appear repeatedly in Task 2 essays: (1) double conjunctions (\"although...but\", \"even though...so\") — pick one; and (2) \"despite the policy was unpopular\" — switch to \"Although the policy was unpopular\" or \"Despite the policy\'s unpopularity\".",
    bengaliExplanation:
      "Concession clause প্রতিপক্ষের যুক্তি স্বীকার করে নিজের যুক্তি দেয়। although, even though, though, while, whereas (clause); despite/in spite of + noun বা V-ing (phrase)। শুরুতে clause থাকলে comma বসে। দুটি conjunction একসাথে বসে না (\"although...but\" ভুল)। \"Despite + clause\"-ও ভুল।",
    pattern: "Concession clause + comma + main clause. OR Main clause + concession clause (no comma). OR Despite + noun/V-ing + comma + main clause.",
    examples: [
      {
        sentence: "Although remote work offers flexibility, it can also blur the boundary between personal and professional life.",
        note: "Concession first → comma after it; \"although\" alone, no \"but\".",
      },
      {
        sentence: "Many young people prefer urban living, whereas older generations often value quieter rural environments.",
        note: "\"Whereas\" contrasts two parallel groups in one sentence.",
      },
      {
        sentence: "Despite the higher initial cost, renewable energy is becoming more economically competitive.",
        note: "\"Despite + noun phrase\"; comma after the fronted phrase.",
      },
      {
        sentence: "The reform was implemented, even though public support remained divided.",
        note: "Concession clause second → no comma before \"even though\".",
      },
    ],
    incorrectExamples: [
      {
        sentence: "Although the scheme has benefits, but it also creates new problems.",
        error: "Double conjunction: \"although\" and \"but\" together. One subordinator is enough.",
        correction: "Although the scheme has benefits, it also creates new problems.",
      },
      {
        sentence: "Despite the policy was unpopular, the government continued with it.",
        error: "\"Despite\" must be followed by a noun phrase or V-ing, not a full clause with a finite verb.",
        correction: "Although the policy was unpopular, the government continued with it.",
      },
    ],
    commonMistakes: [
      "Double conjunctions: \"although...but\", \"even though...but\", \"despite...but\" — use only one.",
      "\"Despite/in spite of + clause\" instead of \"Despite + noun\" or \"Although + clause\".",
      "Missing the comma after an initial concession clause (\"Although it was costly the project went ahead\").",
      "Confusing \"while\" (parallel contrast, often simultaneous) with \"although\" (concession).",
    ],
    ieltsApplications: [
      { task: "Writing Task 2", note: "Concession clauses let you address the counter-argument directly; examiners reward this balance under Coherence and Cohesion and Task Response." },
      { task: "Writing Task 2", note: "Use \"while/whereas\" to contrast two groups (urban vs rural, young vs old) within the same paragraph." },
    ],
    exercises: [
      {
        id: "t2c-1",
        type: "mc",
        prompt: "Choose the correct sentence:",
        options: [
          "Although the law was strict, but crime continued to rise.",
          "Although the law was strict, crime continued to rise.",
          "Although the law was strict crime continued to rise.",
          "Despite the law was strict, crime continued to rise.",
        ],
        answer: "Although the law was strict, crime continued to rise.",
        explanation: "Use \"although\" alone (no \"but\"); comma after the fronted concession clause. \"Despite + clause\" (option 4) is also wrong.",
        difficulty: 2,
      },
      {
        id: "t2c-2",
        type: "error-id",
        prompt: "Find the error: \"Even though the new tax was unpopular, but the government pushed it through parliament.\"",
        answer: "but",
        acceptable: ["but the government", "even though...but", "double conjunction", "even though the new tax was unpopular, but"],
        explanation: "Double conjunction: \"even though\" and \"but\" together. Remove \"but\": \"Even though the new tax was unpopular, the government pushed it through parliament.\"",
        difficulty: 2,
      },
      {
        id: "t2c-3",
        type: "correction",
        prompt: "Correct: \"Despite the programme was expensive, it produced measurable results.\"",
        answer: "Although the programme was expensive, it produced measurable results.",
        acceptable: [
          "although the programme was expensive, it produced measurable results",
          "despite the programme\'s expense, it produced measurable results",
          "despite the expense of the programme, it produced measurable results",
          "despite being expensive, the programme produced measurable results",
        ],
        explanation: "\"Despite\" cannot take a full clause; switch to \"Although + clause\" or rephrase to \"Despite + noun/V-ing\".",
        difficulty: 3,
      },
      {
        id: "t2c-4",
        type: "combine",
        prompt: "Combine into one complex sentence using \"although\": \"The vaccine rollout was slow. The country eventually reached herd immunity.\"",
        answer: "Although the vaccine rollout was slow, the country eventually reached herd immunity.",
        acceptable: [
          "although the vaccine rollout was slow, the country eventually reached herd immunity",
          "the country eventually reached herd immunity although the vaccine rollout was slow",
          "although the vaccine rollout was slow the country eventually reached herd immunity",
        ],
        explanation: "Place \"Although\" at the start of the dependent clause; add a comma when the dependent clause comes first.",
        difficulty: 2,
      },
    ],
    prerequisites: ["compound-complex-sentences"],
    estimatedMinutes: 14,
    version: 1,
    status: "published",
  },

  // =====================================================================
  // LESSON 3 — Cause & effect clauses
  // =====================================================================
  {
    id: "t2-cause-effect",
    slug: "t2-cause-effect-clauses",
    title: "Cause & Effect Clauses",
    level: "C",
    cefrLevel: "B2",
    topic: "Cohesion",
    subtopic: "Cause and effect",
    objectives: [
      "Use clause-level connectors (because, since, as, so) and sentence-level connectors (therefore, consequently, as a result) to mark cause and effect.",
      "Use prepositional phrases (due to, owing to, because of) followed by a noun or V-ing, never a full clause.",
      "Avoid double conjunctions (\"because...so\") and the \"due to + clause\" error.",
    ],
    explanation:
      "Cause-effect language lets you build the reasoning chain that holds a Task 2 argument together. CLAUSE connectors (because, since, as) attach a reason clause with a subject and verb to the main clause; \"so\" attaches a result clause. SENTENCE connectors (therefore, consequently, as a result) start a new independent clause, usually after a period or semicolon. PHRASE connectors (due to, owing to, because of) are followed by a noun or V-ing, never by a full clause. Two errors dominate: (1) double conjunctions (\"because...so\", \"since...therefore\") — pick one; and (2) \"due to the policy was poorly designed\" — switch to \"because the policy was poorly designed\" or \"due to its poor design\". Vary connectors within an essay to avoid repetition.",
    bengaliExplanation:
      "কার্যকারণ সম্পর্ক বোঝাতে বিভিন্ন structure ব্যবহৃত হয়। Clause-এর জন্য because, since, as, so; আলাদা clause শুরুর জন্য therefore, consequently, as a result; noun বা V-ing এর জন্য due to, owing to, because of। \"Due to + clause\" ভুল। দুটি conjunction একসাথে বসে না (\"because...so\" ভুল)।",
    pattern: "Reason clause (because/since/as + S + V) + comma + result. OR Result; therefore/consequently, + reason restated. OR Due to + noun phrase + comma + result.",
    examples: [
      {
        sentence: "Because the cost of solar panels has fallen sharply, adoption has accelerated.",
        note: "Reason clause first; comma before the main clause.",
      },
      {
        sentence: "Many rural schools lack funding; consequently, student performance often lags behind national averages.",
        note: "\"Consequently\" with a semicolon — formal and academic.",
      },
      {
        sentence: "Due to a shortage of skilled workers, the project was delayed by six months.",
        note: "\"Due to + noun phrase\"; comma after the fronted phrase.",
      },
      {
        sentence: "Public transport use has risen, as more commuters seek to avoid traffic congestion.",
        note: "Reason clause second; no comma before \"as\".",
      },
    ],
    incorrectExamples: [
      {
        sentence: "Due to the policy was poorly designed, it failed.",
        error: "\"Due to\" cannot be followed by a full clause with a finite verb.",
        correction: "Because the policy was poorly designed, it failed.",
      },
      {
        sentence: "Because the funding was cut, so the project was cancelled.",
        error: "Double conjunction: \"because\" and \"so\" together. Use only one.",
        correction: "Because the funding was cut, the project was cancelled.",
      },
    ],
    commonMistakes: [
      "\"Due to + clause\" instead of \"Due to + noun\" or \"Because + clause\".",
      "Double conjunctions: \"because...so\", \"since...therefore\".",
      "Confusing \"as\" (causal, gives reason) with \"as\" (temporal, \"while\").",
      "Repeating the same connector (\"because...because...because\") instead of varying (since, as, consequently, therefore).",
    ],
    ieltsApplications: [
      { task: "Writing Task 2", note: "Cause-effect chains are central to problem/solution essays; vary connectors to avoid lexical repetition under Coherence and Cohesion." },
      { task: "Writing Task 2", note: "Use \"consequently\" and \"as a result\" to mark the conclusion of a reasoning step before introducing your proposed solution." },
    ],
    exercises: [
      {
        id: "t2ce-1",
        type: "mc",
        prompt: "Choose the correct sentence:",
        options: [
          "Due to the bridge collapsed, traffic was rerouted.",
          "Because the bridge collapsed, traffic was rerouted.",
          "Because the bridge collapsed, so traffic was rerouted.",
          "Owing to the bridge collapsed, traffic was rerouted.",
        ],
        answer: "Because the bridge collapsed, traffic was rerouted.",
        explanation: "\"Because\" takes a clause; \"due to/owing to\" need a noun phrase. \"Because...so\" is a double conjunction.",
        difficulty: 2,
      },
      {
        id: "t2ce-2",
        type: "correction",
        prompt: "Correct: \"Due to the funding was withdrawn, the research team had to stop the trial.\"",
        answer: "Because the funding was withdrawn, the research team had to stop the trial.",
        acceptable: [
          "because the funding was withdrawn, the research team had to stop the trial",
          "due to the withdrawal of funding, the research team had to stop the trial",
          "owing to the withdrawal of funding, the research team had to stop the trial",
          "due to funding being withdrawn, the research team had to stop the trial",
        ],
        explanation: "\"Due to\" cannot take a clause; switch to \"Because + clause\" or rephrase as \"Due to + noun\".",
        difficulty: 3,
      },
      {
        id: "t2ce-3",
        type: "fill-blank",
        prompt: "Insert the most suitable connector (one word): Many factories closed during the recession; ____, unemployment rose sharply.",
        answer: "consequently",
        acceptable: ["therefore"],
        explanation: "\"Consequently\" or \"therefore\" follows a semicolon to introduce the result of the previous clause. \"Consequently\" is more academic in tone.",
        difficulty: 2,
      },
      {
        id: "t2ce-4",
        type: "combine",
        prompt: "Combine with \"because\": \"Air quality in the city has improved. The congestion charge was introduced last year.\"",
        answer: "Because the congestion charge was introduced last year, air quality in the city has improved.",
        acceptable: [
          "because the congestion charge was introduced last year, air quality in the city has improved",
          "air quality in the city has improved because the congestion charge was introduced last year",
        ],
        explanation: "Place \"because\" at the start of the reason clause; add a comma when the reason clause comes first.",
        difficulty: 2,
      },
    ],
    prerequisites: ["compound-complex-sentences"],
    estimatedMinutes: 14,
    version: 1,
    status: "published",
  },

  // =====================================================================
  // LESSON 4 — Passive voice in essays & reporting structures
  // =====================================================================
  {
    id: "t2-passive-reporting",
    slug: "t2-passive-reporting-essays",
    title: "Passive Voice in Essays & Reporting Structures",
    level: "C",
    cefrLevel: "B2",
    topic: "Voice",
    subtopic: "Passive reporting in essays",
    objectives: [
      "Form reporting structures such as \"It is widely believed that...\", \"It has been argued that...\", \"It is often claimed that...\".",
      "Choose the passive when introducing a general view or counter-argument, and the active when presenting your own position or naming a specific source.",
      "Avoid overusing the passive, which makes essays vague and weakens the writer\'s voice.",
    ],
    explanation:
      "Passive reporting structures let you introduce a view without committing to it personally. Patterns include: \"It is widely believed that...\", \"It has been argued that...\", \"It is often claimed that...\", \"It is sometimes suggested that...\". They are useful for presenting public opinion, scholarly debate, or a counter-argument in a balanced Task 2 essay. Use the passive when: introducing a general view; leaving the source unspecified on purpose; or focusing on the claim rather than the claimer. Use the active when: presenting your own thesis or topic sentences; naming a specific source (\"Smith (2019) argues that...\"); or describing a clear action. Overuse of the passive — especially stacked passives (\"It is argued by some that it is believed by many that...\") — makes writing wordy and lets the writer hide behind vague authority. Your own position should be in the active voice.",
    bengaliExplanation:
      "\"It is widely believed that...\" ধরনের structure-এ মতামত উপস্থাপন করা হয় নিজে মেনে না নিয়ে। সাধারণ মত, গবেষকদের মত, বা পাল্টা যুক্তি আনতে এটি কার্যকর। তবে নিজের অবস্থান বা নির্দিষ্ট source উল্লেখ করতে active voice ব্যবহার করুন। অতিরিক্ত passive রচনাকে অস্পষ্ট ও দুর্বল করে।",
    pattern: "It + be + adverb + past participle (believed/argued/claimed/suggested) + that + clause.",
    examples: [
      {
        sentence: "It is widely believed that early childhood education has long-term economic benefits.",
        note: "Hedged reporting structure; useful for introducing the prompt\'s view.",
      },
      {
        sentence: "It has been argued that congestion charges do more harm than good to small businesses.",
        note: "Present perfect passive reporting — useful for citing ongoing scholarly debate.",
      },
      {
        sentence: "It is often claimed that technology in classrooms improves learning outcomes.",
        note: "Hedged counter-argument to be engaged with in the body of the essay.",
      },
      {
        sentence: "Critics have pointed out that the data set was too small to support the conclusion.",
        note: "Active voice preferred when naming the source (\"critics\").",
      },
    ],
    incorrectExamples: [
      {
        sentence: "It is believed by most people that exercise is good for health.",
        error: "Wordy and clumsy; \"by most people\" should be absorbed into the adverb \"widely\".",
        correction: "It is widely believed that exercise is good for health.",
      },
      {
        sentence: "Mistakes were made by the government, and it is argued by some that the policy should be revised.",
        error: "Two stacked passives with explicit agents; the active voice is clearer and stronger.",
        correction: "The government made mistakes, and some argue that the policy should be revised.",
      },
    ],
    commonMistakes: [
      "Adding \"by people/someone\" when an adverb (\"widely\", \"often\", \"sometimes\") is more idiomatic.",
      "Stacking two or more passives in one sentence (\"It is argued by some that it is believed by many that...\").",
      "Using the passive for the writer\'s own opinion — your thesis and topic sentences should be in the active voice.",
      "Dropping the dummy subject \"It\" (\"Is widely believed that...\" is ungrammatical).",
    ],
    ieltsApplications: [
      { task: "Writing Task 2", note: "Use \"It is widely believed that...\" in the introduction to present the prompt\'s view before stating your own position." },
      { task: "Writing Task 2", note: "When you write your thesis and topic sentences, prefer active voice — examiners reward a clear, confident writer\'s voice under Coherence and Task Response." },
    ],
    exercises: [
      {
        id: "t2p-1",
        type: "mc",
        prompt: "Choose the most natural reporting structure:",
        options: [
          "Is widely argued that the tax system is unfair.",
          "It is widely argued that the tax system is unfair.",
          "It is argued by most people that the tax system is unfair.",
          "It is widely argued by people that the tax system is unfair.",
        ],
        answer: "It is widely argued that the tax system is unfair.",
        explanation: "The dummy subject \"It\" is required; \"widely argued\" is more idiomatic than \"argued by most people/by people\".",
        difficulty: 2,
      },
      {
        id: "t2p-2",
        type: "transformation",
        prompt: "Rewrite as a passive reporting structure: \"Many commentators have suggested that the school day should be shortened.\"",
        answer: "It has been suggested by many commentators that the school day should be shortened.",
        acceptable: [
          "it has been suggested by many commentators that the school day should be shortened",
          "it has been suggested that the school day should be shortened",
          "it is often suggested that the school day should be shortened",
        ],
        explanation: "Move the reporting verb into the passive: \"It has been suggested that...\". The agent (\"by many commentators\") may be dropped if the source is general.",
        difficulty: 3,
      },
      {
        id: "t2p-3",
        type: "correction",
        prompt: "Correct the wordy passive: \"It is believed by people that bilingual education is beneficial.\"",
        answer: "It is widely believed that bilingual education is beneficial.",
        acceptable: [
          "it is widely believed that bilingual education is beneficial",
          "it is generally believed that bilingual education is beneficial",
          "it is often believed that bilingual education is beneficial",
        ],
        explanation: "Replace \"by people\" with an adverb (\"widely\", \"generally\", \"often\"); the result is more concise and academic.",
        difficulty: 2,
      },
      {
        id: "t2p-4",
        type: "error-id",
        prompt: "Identify the grammatical error: \"Is often claimed that social media reduces attention spans.\"",
        answer: "Is often claimed",
        acceptable: ["missing it", "missing subject it", "is often claimed", "missing \"it\""],
        explanation: "The dummy subject \"It\" is required at the start: \"It is often claimed that...\". Without \"It\", the structure is ungrammatical.",
        difficulty: 2,
      },
    ],
    prerequisites: ["active-passive-voice"],
    estimatedMinutes: 14,
    version: 1,
    status: "published",
  },

  // =====================================================================
  // LESSON 5 — Parallel structures in lists & comparisons
  // =====================================================================
  {
    id: "t2-parallelism",
    slug: "t2-parallel-structures",
    title: "Parallel Structures in Lists & Comparisons",
    level: "C",
    cefrLevel: "B2",
    topic: "Sentence structure",
    subtopic: "Parallel structures",
    objectives: [
      "Use the same grammatical form for all items in a list, coordination, or comparison.",
      "Match structures after correlative pairs: both...and, either...or, neither...nor, not only...but also.",
      "Identify and correct faulty parallelism (e.g. mixing V-ing with a to-infinitive in one list).",
    ],
    explanation:
      "Parallelism means using the same grammatical form for items that play the same role: every item in a list, every side of a comparison, and every part after a correlative pair (both...and, either...or, neither...nor, not only...but also) must match. If two items are V-ing, the third cannot be a to-infinitive; if one side of \"as much X as Y\" is a noun phrase, the other must also be a noun phrase. Faulty parallelism breaks the rhythm of a sentence and confuses the reader. In Task 2, parallel structures make multi-point arguments easier to follow and signal grammatical control. Common breaks: mixing V-ing with to-infinitive; mixing noun phrases with verb phrases; mixing active with passive within one list.",
    bengaliExplanation:
      "List, comparison, বা coordination-এ একই grammatical form ব্যবহার করুন। সব item যদি V-ing হয় সব গুলো V-ing হবে; যদি noun phrase হয় সব গুলো noun phrase হবে। \"as much X as Y\" তে X এবং Y একই grammatical type হতে হবে। both...and, either...or, neither...nor, not only...but also এর দুই পাশে একই structure থাকতে হবে।",
    pattern: "Item A, Item B, and Item C — all in the same grammatical form.",
    examples: [
      {
        sentence: "The policy aims to reduce emissions, to encourage cycling, and to invest in public transport.",
        note: "Three parallel to-infinitive phrases after the verb \"aims\".",
      },
      {
        sentence: "A successful essay presents a clear thesis, supports it with evidence, and addresses counter-arguments.",
        note: "Three parallel verb phrases (V + object) sharing the subject \"essay\".",
      },
      {
        sentence: "Rural students have as much access to digital resources as urban students.",
        note: "Parallel noun phrases (\"rural students\" and \"urban students\") after \"as much ... as\".",
      },
      {
        sentence: "The reform is neither cost-effective nor politically popular.",
        note: "Parallel adjectives (\"cost-effective\" and \"politically popular\") after \"neither...nor\".",
      },
    ],
    incorrectExamples: [
      {
        sentence: "The programme focuses on reducing waste, recycling materials, and to replace harmful chemicals.",
        error: "The third item (\"to replace\") uses a to-infinitive while the first two use V-ing; the list is not parallel.",
        correction: "The programme focuses on reducing waste, recycling materials, and replacing harmful chemicals.",
      },
      {
        sentence: "She is both an experienced researcher and writes clearly.",
        error: "\"an experienced researcher\" (noun phrase) is paired with \"writes clearly\" (verb phrase); the two sides of \"both...and\" are not parallel.",
        correction: "She is both an experienced researcher and a clear writer.",
      },
    ],
    commonMistakes: [
      "Mixing V-ing with to-infinitive in one list (\"reducing, recycling, and to replace\").",
      "Comparing unlike structures in \"as much X as Y\" or \"more X than Y\" (X = noun vs Y = clause).",
      "Breaking parallelism after correlative pairs: both...and, either...or, neither...nor, not only...but also.",
      "Mixing active and passive forms within one list of actions by the same subject.",
    ],
    ieltsApplications: [
      { task: "Writing Task 2", note: "Parallel lists make multi-point arguments (e.g. \"three reasons for the decline are...\") easier to follow and signal grammatical control." },
      { task: "Writing Task 2", note: "Use parallel structure in the thesis statement when you list your supporting points (\"This essay will argue that X, examine Y, and propose Z\")." },
    ],
    exercises: [
      {
        id: "t2pa-1",
        type: "mc",
        prompt: "Choose the sentence with correct parallelism:",
        options: [
          "The new curriculum emphasises critical thinking, problem solving, and to communicate clearly.",
          "The new curriculum emphasises critical thinking, problem solving, and clear communication.",
          "The new curriculum emphasises to think critically, solving problems, and communicating clearly.",
          "The new curriculum emphasises critical thinking, to solve problems, and clear communication.",
        ],
        answer: "The new curriculum emphasises critical thinking, problem solving, and clear communication.",
        explanation: "All three items are noun phrases (critical thinking, problem solving, clear communication), so the list is parallel.",
        difficulty: 2,
      },
      {
        id: "t2pa-2",
        type: "correction",
        prompt: "Correct the faulty parallelism: \"The charity aims to build schools, to train teachers, and providing clean water.\"",
        answer: "The charity aims to build schools, to train teachers, and to provide clean water.",
        acceptable: [
          "the charity aims to build schools, to train teachers, and to provide clean water",
          "the charity aims to build schools, train teachers, and provide clean water",
        ],
        explanation: "Make all three items to-infinitives (\"to build, to train, and to provide\") or share one \"to\" for all three (\"to build, train, and provide\").",
        difficulty: 2,
      },
      {
        id: "t2pa-3",
        type: "error-id",
        prompt: "Identify the item that breaks parallelism: \"The proposal will reduce costs, improve efficiency, and to expand the service.\"",
        answer: "to expand the service",
        acceptable: ["to expand", "to expand the service", "the third item", "expand"],
        explanation: "The first two items are bare verbs (\"reduce\", \"improve\"); the third should be \"expand the service\" (no \"to\"), or all three should be to-infinitives.",
        difficulty: 2,
      },
      {
        id: "t2pa-4",
        type: "combine",
        prompt: "Combine using parallel \"both...and\": \"The scheme is affordable. The scheme is effective.\"",
        answer: "The scheme is both affordable and effective.",
        acceptable: ["the scheme is both affordable and effective", "the scheme is both affordable and effective"],
        explanation: "Both sides of \"both...and\" must be the same grammatical form — here, two adjectives (\"affordable\" and \"effective\").",
        difficulty: 1,
      },
    ],
    prerequisites: ["compound-complex-sentences"],
    estimatedMinutes: 14,
    version: 1,
    status: "published",
  },

  // =====================================================================
  // LESSON 6 — Fragments, run-on sentences & comma splices
  // =====================================================================
  {
    id: "t2-fragments-runnons",
    slug: "t2-fragments-runnons-comma-splices",
    title: "Fragments, Run-Ons & Comma Splices",
    level: "C",
    cefrLevel: "B2",
    topic: "Punctuation",
    subtopic: "Fragments, run-ons, comma splices",
    objectives: [
      "Identify fragments (missing subject, verb, or complete thought), run-ons (two independent clauses joined with no punctuation or conjunction), and comma splices (joined with only a comma).",
      "Fix each error using one of three strategies: add a coordinating conjunction, use a period and capital letter, or use a semicolon.",
      "Attach fragment subordinators (\"because\", \"although\") to a main clause so they form complete sentences.",
    ],
    explanation:
      "Three sentence-boundary errors dominate Task 2 essays. (1) FRAGMENT — a sentence missing a subject, a verb, or a complete thought. Subordinators such as \"because\", \"although\", \"since\" create fragments when written alone: \"Because the cost was high.\" is not a sentence. (2) RUN-ON — two independent clauses joined with no punctuation and no conjunction: \"The plan was costly the team approved it.\". (3) COMMA SPLICE — two independent clauses joined with only a comma: \"The plan was costly, the team approved it.\". Three standard fixes: (a) add a coordinating conjunction (\"The plan was costly, but the team approved it.\"); (b) use a period (\"The plan was costly. The team approved it.\"); (c) use a semicolon (\"The plan was costly; the team approved it.\"). For fragments, add the missing subject or verb, or attach the fragment to the neighbouring sentence.",
    bengaliExplanation:
      "তিনটি সাধারণ sentence-boundary ভুল: (১) Fragment — incomplete sentence; (২) Run-on — দুটি independent clause বিনা punctuation বা conjunction এ যুক্ত; (৩) Comma splice — দুটি independent clause শুধু comma দিয়ে যুক্ত। সমাধান: coordinating conjunction যোগ করুন, period ব্যবহার করুন, বা semicolon ব্যবহার করুন। \"Because...\", \"Although...\" একা fragment হয় — main clause এর সাথে যুক্ত করুন।",
    pattern: "Independent clause + (coordinating conjunction / period + capital / semicolon) + independent clause.",
    examples: [
      {
        sentence: "Many cities have introduced congestion charges. As a result, traffic has fallen noticeably.",
        note: "Two clear sentences — correct; the second begins with a transition.",
      },
      {
        sentence: "Although the policy was unpopular, it was eventually adopted; the council had little choice.",
        note: "Complex sentence + semicolon + independent clause — correct.",
      },
      {
        sentence: "The cost of living has risen sharply, and many households now struggle to save.",
        note: "Compound sentence joined with a comma + coordinating conjunction \"and\" — correct.",
      },
      {
        sentence: "Public transport should be expanded because it reduces both congestion and pollution.",
        note: "Complex sentence; no comma before \"because\" when the reason clause comes second — correct.",
      },
    ],
    incorrectExamples: [
      {
        sentence: "Because the cost of housing continues to rise.",
        error: "Fragment — a subordinating conjunction with no main clause; it does not express a complete thought.",
        correction: "Because the cost of housing continues to rise, many families are forced to rent.",
      },
      {
        sentence: "The cost of living has risen, many households struggle to save.",
        error: "Comma splice — two independent clauses joined only by a comma.",
        correction: "The cost of living has risen, and many households struggle to save.",
      },
    ],
    commonMistakes: [
      "Writing \"Because...\" or \"Although...\" clauses as standalone sentences (fragments).",
      "Joining two independent clauses with only a comma (comma splice) — extremely common in Task 2 essays.",
      "Joining two independent clauses with no punctuation at all (run-on).",
      "Adding a comma + \"and/but\" before a dependent clause where no comma is needed (\"I went home, because I was tired\" → \"I went home because I was tired\").",
    ],
    ieltsApplications: [
      { task: "Writing Task 2", note: "Sentence-boundary errors directly affect the Grammatical Range and Accuracy band; examiners frequently downgrade essays for repeated comma splices and fragments." },
      { task: "Writing Task 2", note: "When in doubt, write shorter, complete sentences; clear beats clever. A clean simple sentence scores higher than a broken complex one." },
    ],
    exercises: [
      {
        id: "t2f-1",
        type: "mc",
        prompt: "Which sentence is grammatically correct?",
        options: [
          "Although the reform was controversial.",
          "The reform was controversial, the parliament passed it.",
          "The reform was controversial, but the parliament passed it.",
          "The reform was controversial the parliament passed it.",
        ],
        answer: "The reform was controversial, but the parliament passed it.",
        explanation: "Option 1 is a fragment; option 2 is a comma splice; option 4 is a run-on. Option 3 correctly joins two independent clauses with a comma + coordinating conjunction.",
        difficulty: 2,
      },
      {
        id: "t2f-2",
        type: "error-id",
        prompt: "Identify the error type: \"The festival was a success the organisers were praised.\"",
        answer: "run-on",
        acceptable: ["run on", "run-on sentence", "missing punctuation", "fused sentence"],
        explanation: "Two independent clauses joined with no punctuation and no conjunction — a run-on (also called a fused sentence). Fix with a period, semicolon, or a comma + conjunction.",
        difficulty: 2,
      },
      {
        id: "t2f-3",
        type: "correction",
        prompt: "Fix the comma splice: \"The new tram line opened last month, passenger numbers have already doubled.\"",
        answer: "The new tram line opened last month, and passenger numbers have already doubled.",
        acceptable: [
          "the new tram line opened last month, and passenger numbers have already doubled",
          "the new tram line opened last month; passenger numbers have already doubled",
          "the new tram line opened last month. passenger numbers have already doubled",
          "the new tram line opened last month. passenger numbers have already doubled.",
        ],
        explanation: "Three valid fixes: (1) comma + \"and\"; (2) semicolon; (3) period and capital letter. Any one is correct.",
        difficulty: 2,
      },
      {
        id: "t2f-4",
        type: "correction",
        prompt: "Fix the fragment: \"Because the new law limits working hours.\"",
        answer: "Because the new law limits working hours, many firms have hired extra staff.",
        acceptable: [
          "because the new law limits working hours, many firms have hired extra staff",
          "many firms have hired extra staff because the new law limits working hours",
          "many firms have hired extra staff because the new law limits working hours.",
          "because the new law limits working hours, many firms have hired extra staff.",
        ],
        explanation: "Attach the subordinator clause to a main clause so it forms a complete sentence. Add a comma when the \"because\" clause comes first.",
        difficulty: 3,
      },
    ],
    prerequisites: ["sentence-structure", "compound-complex-sentences"],
    estimatedMinutes: 16,
    version: 1,
    status: "published",
  },
];

export const task2LessonCount = task2Lessons.length;
