// Original ADVANCED IELTS grammar lessons (Level D / C1+).
//
// All explanations, examples, incorrect examples, common mistakes, IELTS
// applications, and exercises are original, hand-authored for this project.
// No content is copied from Cambridge, Oxford, British Council, IELTS
// official materials, or any other third-party source. External references
// (AGENT.md §12) were used only to prioritise topics, not to reproduce text.
//
// Level D = Advanced Control (C1+) — Band 7.5–9.0 candidates. These six
// lessons target the structures that distinguish Band 8+ writing: inversion
// for emphasis, cleft sentences, mixed and advanced conditionals,
// participle and reduced clauses, advanced passive/nominalisation with
// guidance on when NOT to use them, and concision/ellipsis/substitution.

import type { GrammarLesson } from "./types";

export const levelDLessons: GrammarLesson[] = [
  // =====================================================================
  // LESSON 1 — Inversion for emphasis
  // =====================================================================
  {
    id: "d-inversion",
    slug: "d-inversion-emphasis",
    title: "Inversion for Emphasis (Not only..., Rarely..., Only when...)",
    level: "D",
    cefrLevel: "C1",
    topic: "Sentence structure",
    subtopic: "Inversion for emphasis",
    objectives: [
      "Use negative and restrictive adverbials at the start of a sentence to trigger auxiliary inversion (\"Not only...\", \"Rarely...\", \"Seldom...\", \"Never before...\", \"Under no circumstances...\").",
      "Distinguish \"Only when/after/by + time/condition\" inversions from non-inverting \"Only + subject\".",
      "Recognise when inversion genuinely adds emphasis and when overuse produces forced, mannered writing.",
    ],
    explanation:
      "Inversion for emphasis moves a negative or restrictive adverbial to the front of the sentence and places the auxiliary verb before the subject: \"Not only has urbanisation transformed economies, but it has also reshaped family structures.\" Common triggers include \"Not only... (but also)\", \"Rarely\", \"Seldom\", \"Never before\", \"Under no circumstances\", \"No sooner... than\", and \"Only when/after/by + clause/phrase\". The structure is: adverbial + auxiliary + subject + main verb. \"Only\" triggers inversion when it modifies a time, condition, or prepositional phrase (\"Only after the report was published did the public react\"), but NOT when it modifies the subject directly (\"Only the minister saw the data\" — no inversion). Inversion is a high-register device: one or two per essay signals sophisticated range; three or more reads as contrived and weakens rather than strengthens the argument. Reserve inversion for genuinely emphatic moments — a topic sentence, a recommendation, or a strong counter-argument — never as decoration.",
    bengaliExplanation:
      "Inversion for emphasis-এ sentence-এর শুরুতে negative বা restrictive adverbial (\"Not only...\", \"Rarely...\", \"Never before...\", \"Under no circumstances...\", \"Only when...\") রাখলে auxiliary verb subject-এর আগে চলে যায়: \"Not only has urbanisation transformed economies, but it has also reshaped family structures.\" কাঠামো: adverbial + auxiliary + subject + main verb। \"Only\" যখন সময়/শর্ত/প্রস্তুত বাক্যাংশকে পরিবর্তন করে তখন inversion হয়, কিন্তু \"Only + subject\" হলে inversion হয় না (\"Only the minister saw the data\")। এটি উচ্চ-মাত্রার আনুষ্ঠানিক কাঠামো — প্রতি রচনায় এক-দুটি ব্যবহার যথেষ্ট; বেশি ব্যবহার করলে লেখা কৃত্রিম মনে হয় এবং জোর কমে যায়।",
    pattern: "Negative/Restrictive adverbial + auxiliary + subject + main verb (+ ...).",
    examples: [
      {
        sentence: "Not only has urbanisation transformed regional economies, but it has also reshaped family structures across the area.",
        note: "Fronted \"Not only\" triggers auxiliary inversion in the first clause; the second clause keeps normal order with \"but (also)\".",
      },
      {
        sentence: "Rarely has a single piece of legislation produced such rapid improvements in urban air quality.",
        note: "\"Rarely\" + auxiliary + subject emphasises how unusual the outcome is.",
      },
      {
        sentence: "Under no circumstances should personal data be transferred without explicit, informed consent.",
        note: "Absolute-prohibition phrase; modal \"should\" inverts with the subject.",
      },
      {
        sentence: "Only after the funding was restored did the long-delayed research resume.",
        note: "\"Only after + clause\" inverts the main clause auxiliary (\"did\"); the \"after\" clause itself stays in normal order.",
      },
    ],
    incorrectExamples: [
      {
        sentence: "Not only the report was thorough, but it was also well argued.",
        error: "A fronted \"Not only\" requires auxiliary inversion in the first clause.",
        correction: "Not only was the report thorough, but it was also well argued.",
      },
      {
        sentence: "Only when the government will act will the crisis be resolved.",
        error: "After \"Only when + clause\", the main clause inverts; the time clause itself uses the present simple (first-conditional pattern), not \"will\".",
        correction: "Only when the government acts will the crisis be resolved.",
      },
    ],
    commonMistakes: [
      "Forgetting to invert after a fronted negative/restrictive adverbial (\"Not only he came...\" → \"Not only did he come...\").",
      "Inverting after \"Only + subject\", where no inversion is required (\"Only she noticed the error\" is correct; \"Only did she notice\" is wrong).",
      "Stacking three or more inversions in a single paragraph; the effect becomes mannered and the emphasis is lost.",
    ],
    ieltsApplications: [
      { task: "Writing Task 2", note: "A single, well-placed inversion at a topic sentence (\"Not only does X affect Y, but it also...\") signals Band 8+ Grammatical Range and Accuracy without inflating word count." },
      { task: "Writing Task 2", note: "\"Only when... + inversion\" in a recommendation stresses a precondition; limit yourself to one or two inversions per essay to avoid a contrived register." },
    ],
    exercises: [
      {
        id: "di-1",
        type: "mc",
        prompt: "Choose the grammatically correct sentence:",
        options: [
          "Not only the policy was effective, but it was also affordable.",
          "Not only was the policy effective, but it was also affordable.",
          "Not only did the policy was effective, but it also was affordable.",
          "Not only effective was the policy, but it also was affordable.",
        ],
        answer: "Not only was the policy effective, but it was also affordable.",
        explanation: "After a fronted \"Not only\", invert the auxiliary: \"was\" moves before the subject \"the policy\". The second clause keeps normal order with \"but (also)\".",
        difficulty: 3,
      },
      {
        id: "di-2",
        type: "fill-blank",
        prompt: "Complete with the correct auxiliary form of \"have\": Rarely ____ such rapid change been witnessed in the region.",
        answer: "has",
        explanation: "The subject \"such rapid change\" is singular third person, so the auxiliary \"has\" inverts to the front after \"Rarely\".",
        difficulty: 2,
      },
      {
        id: "di-3",
        type: "transformation",
        prompt: "Rewrite using inversion beginning with \"Never before...\": \"The government has never before faced such public pressure.\"",
        answer: "Never before has the government faced such public pressure.",
        acceptable: ["never before has the government faced such public pressure"],
        explanation: "Front \"Never before\", then invert the auxiliary \"has\" with the subject \"the government\"; the past participle \"faced\" stays in place.",
        difficulty: 3,
      },
      {
        id: "di-4",
        type: "error-id",
        prompt: "Find the inversion error: \"Under no circumstances the data should be shared without consent.\"",
        answer: "the data should be shared",
        acceptable: ["the data should", "should be shared", "the data should be shared without consent"],
        explanation: "After \"Under no circumstances\", the auxiliary \"should\" must invert before the subject: \"...should the data be shared...\".",
        difficulty: 3,
      },
    ],
    prerequisites: ["compound-complex-sentences"],
    estimatedMinutes: 15,
    version: 1,
    status: "published",
  },

  // =====================================================================
  // LESSON 2 — Cleft sentences & controlled emphasis
  // =====================================================================
  {
    id: "d-cleft",
    slug: "d-cleft-sentences-emphasis",
    title: "Cleft Sentences & Controlled Emphasis",
    level: "D",
    cefrLevel: "C1",
    topic: "Sentence structure",
    subtopic: "Cleft sentences",
    objectives: [
      "Form it-clefts (\"It is/was X that/who...\") and wh-clefts (\"What X does is...\", \"All I need is...\") to focus a specific element.",
      "Use clefts to highlight contrast or to place the most important information at the end (end-weight).",
      "Avoid overusing clefts, which inflates word count and reads as contrived.",
    ],
    explanation:
      "A cleft sentence splits a single idea into two clauses to focus on one element. The it-cleft uses \"It + be + focused element + that/who + rest\": \"It was the funding cut, rather than the design, that caused the delay.\" The wh-cleft (also called pseudo-cleft) uses \"What/All/The thing (that) + clause + is + focus\": \"What the study ultimately reveals is that early intervention is decisive.\" Use clefts for genuine focus — to correct a misconception (\"It is not the cost but the delay that matters\"), to highlight a key cause, or to move heavy information to the end of the sentence for end-weight. In it-clefts the relative pronoun is normally \"that\" (\"who\" for people is also possible); \"which\" is non-standard in clefts. Subject-verb agreement follows the focused element: \"It is the early years that matter most\" (\"years\" → plural \"matter\"). Avoid stacking clefts back-to-back (\"What matters is... What is also true is... What we must do is...\"); each cleft adds words without adding ideas, so overuse weakens the rhetorical effect and inflates word count.",
    bengaliExplanation:
      "Cleft sentence বাক্যের একটি অংশে জোর দেওয়ার জন্য একটি ধারণাকে দুটি clause-এ ভাগ করে। It-cleft: \"It is/was X that/who...\" (\"It was the funding cut that caused the delay.\")। Wh-cleft: \"What X does is...\" বা \"All I need is...\" (\"What the study reveals is that early intervention matters.\")। জোর দেওয়ার সত্যিকার প্রয়োজন হলে cleft ব্যবহার করুন — ভুল ধারণা সংশোধন, মূল কারণ তুলে ধরা, বা গুরুত্বপূর্ণ তথ্য বাক্যের শেষে রাখা (end-weight)। It-cleft-এ relative pronoun সাধারণত \"that\"; \"which\" ব্যবহার ঠিক নয়। ক্রমাগত cleft ব্যবহার লেখাকে দীর্ঘ ও কৃত্রিম করে।",
    pattern: "It-cleft: It + be + focus + that/who + rest. Wh-cleft: What/All + clause + is + focus.",
    examples: [
      {
        sentence: "It is the quality of teaching, rather than the technology deployed, that most strongly predicts student outcomes.",
        note: "It-cleft highlighting the true cause and contrasting it with a less important factor.",
      },
      {
        sentence: "What the long-term study ultimately suggests is that small, sustained changes outperform dramatic reforms.",
        note: "Wh-cleft placing the key claim at the end (end-weight principle).",
      },
      {
        sentence: "All that is required is a stable funding commitment across at least two electoral cycles.",
        note: "All-cleft signals restraint; useful for recommendations.",
      },
      {
        sentence: "It was not until 2015 that the regional gap began to narrow noticeably.",
        note: "It-cleft with a negative time phrase for emphasis on when the change began.",
      },
    ],
    incorrectExamples: [
      {
        sentence: "It is the early years which matters most for later achievement.",
        error: "It-clefts prefer \"that\"; and the relative-clause verb must agree with the focused noun (\"years\" → plural \"matter\").",
        correction: "It is the early years that matter most for later achievement.",
      },
      {
        sentence: "What the council needs is to I submit the application by Friday.",
        error: "After \"is\", the focused element must be a clean infinitive phrase; \"to I submit\" mixes the infinitive marker with a subject pronoun.",
        correction: "What the council needs is to submit the application by Friday.",
      },
    ],
    commonMistakes: [
      "Using \"which\" instead of \"that\" in it-clefts and getting agreement wrong (\"It is the students that is responsible\" → \"that are responsible\").",
      "Stacking clefts back-to-back (\"What matters is... What is also true is... What we must do is...\") — wordy and mechanical.",
      "Forgetting the \"be\" verb in a wh-cleft (\"What he did, complain.\") — needs \"was complain\" or \"was to complain\".",
    ],
    ieltsApplications: [
      { task: "Writing Task 2", note: "A single it-cleft in a thesis or topic sentence sharpens the position: \"It is the unequal distribution of resources, not their scarcity, that drives migration.\" (Band 8+ Grammatical Range and Accuracy.)" },
      { task: "Academic Task 1", note: "Use \"It is in 2010 that the figure peaks\" sparingly to highlight a single key data point; over-use inflates word count without adding information." },
    ],
    exercises: [
      {
        id: "dc-1",
        type: "mc",
        prompt: "Choose the correct cleft sentence:",
        options: [
          "It was the design which caused the failure, not the materials.",
          "It was the design that caused the failure, not the materials.",
          "It is the design who caused the failure, not the materials.",
          "What the design caused was the failure, not the materials.",
        ],
        answer: "It was the design that caused the failure, not the materials.",
        explanation: "It-clefts use \"that\" (not \"which\") for inanimate nouns; \"who\" is only for people. The fourth option is a valid wh-cleft but conveys a different emphasis and reads awkwardly here.",
        difficulty: 3,
      },
      {
        id: "dc-2",
        type: "fill-blank",
        prompt: "Complete the wh-cleft: ____ the government needs is a long-term strategy.",
        answer: "What",
        explanation: "Wh-cleft structure: What + clause + is + focus. \"What\" fronts the focused clause.",
        difficulty: 2,
      },
      {
        id: "dc-3",
        type: "transformation",
        prompt: "Rewrite as an it-cleft beginning with \"It was...\": \"Funding cuts caused the project to fail.\"",
        answer: "It was funding cuts that caused the project to fail.",
        acceptable: ["it was funding cuts that caused the project to fail", "it was the funding cuts that caused the project to fail"],
        explanation: "Move the cause (\"funding cuts\") into the focus slot of an it-cleft: It was + focus + that + rest.",
        difficulty: 3,
      },
      {
        id: "dc-4",
        type: "error-id",
        prompt: "Find the error: \"It is the design which is the problem, not the cost.\"",
        answer: "which",
        acceptable: ["which is", "the design which", "which"],
        explanation: "It-clefts use \"that\", not \"which\": \"It is the design that is the problem, not the cost.\"",
        difficulty: 2,
      },
    ],
    prerequisites: ["compound-complex-sentences"],
    estimatedMinutes: 15,
    version: 1,
    status: "published",
  },

  // =====================================================================
  // LESSON 3 — Mixed conditionals & advanced hypotheticals
  // =====================================================================
  {
    id: "d-mixed-conditionals",
    slug: "d-mixed-conditionals-hypotheticals",
    title: "Mixed Conditionals & Advanced Hypotheticals",
    level: "D",
    cefrLevel: "C1",
    topic: "Conditionals",
    subtopic: "Mixed and advanced hypotheticals",
    objectives: [
      "Form mixed conditionals correctly: past condition → present result, and present/general condition → past result.",
      "Use \"were to\" for formal hypotheticals and \"If it were not for...\" / \"But for...\" as alternative conditional structures.",
      "Choose the correct mixed form by analysing the time frame of each clause separately.",
    ],
    explanation:
      "A mixed conditional combines clauses from different time frames. Type 3→2 (past condition, present result): \"If the policy had been implemented in 2010, the housing crisis would not be so severe today.\" — the past-perfect \"if\" clause is Type 3, the \"would + bare infinitive\" main clause is Type 2. Type 2→3 (present/general condition, past result): \"If the city were better designed, fewer accidents would have occurred last year.\" — the past-simple \"if\" clause is Type 2, the \"would have + V3\" main clause is Type 3. The key skill is identifying the time frame of each clause independently: ask \"when did/does the condition apply?\" and \"when did/does the result apply?\". For formal future hypotheticals use \"If + subject + were to + infinitive\": \"If the council were to abolish tuition fees, demand would surge within a year.\" Two alternative structures credit a single factor with producing or preventing an outcome: \"If it were not for X, Y would/would have...\" and \"But for X, Y would/would have...\". \"But for\" is followed by a noun phrase, never a full clause (\"But for the swift action of volunteers, far more homes would have been lost\"). \"Would\" never appears in a standard \"if\" clause.",
    bengaliExplanation:
      "Mixed conditional-এ দুটি clause ভিন্ন সময়ের হয়। 3→2 (অতীত condition + বর্তমান ফল): \"If the policy had been implemented in 2010, the crisis would not be so severe today.\" 2→3 (বর্তমান/সাধারণ condition + অতীত ফল): \"If the city were better designed, fewer accidents would have occurred last year.\" প্রতিটি clause-এর সময়কাল আলাদাভাবে বিশ্লেষণ করুন। আনুষ্ঠানিক ভবিষ্যৎ কাল্পনিক: \"If S + were to + V...\"। একক কারণ স্বীকার করতে: \"If it were not for X, Y would...\" এবং \"But for X, Y would...\" (\"But for\" + noun phrase, পূর্ণ clause নয়)। কোনো standard conditional-এর \"if\" clause-এ \"would\" বসে না।",
    pattern: "3→2: If + had + V3, would + bare infinitive. 2→3: If + past simple, would have + V3. Formal: If + S + were to + V, would + V. Alternative: But for + noun phrase, would (have) + V.",
    examples: [
      {
        sentence: "If the country had invested in renewable energy two decades ago, it would not be facing an energy crisis today.",
        note: "Past condition (had + V3) + present result (would + bare infinitive).",
      },
      {
        sentence: "If parents were generally more confident in science, the recent vaccine debate would have played out very differently.",
        note: "General/present condition (past simple) + past result (would have + V3).",
      },
      {
        sentence: "If the council were to abolish tuition fees, demand for university places would surge within a year.",
        note: "Formal future hypothetical using \"were to\".",
      },
      {
        sentence: "But for the swift action of volunteers, far more homes would have been lost in the floods.",
        note: "Alternative conditional crediting a single factor; \"But for\" takes a noun phrase.",
      },
    ],
    incorrectExamples: [
      {
        sentence: "If the policy had been introduced in 2010, the housing crisis would not have been so severe today.",
        error: "The result refers to the present (\"today\"), but the main clause uses the Type 3 form (would have + V3).",
        correction: "If the policy had been introduced in 2010, the housing crisis would not be so severe today.",
      },
      {
        sentence: "If the city would be safer, fewer accidents would have occurred last year.",
        error: "\"Would\" cannot appear in an \"if\" clause in standard conditional sentences.",
        correction: "If the city were safer, fewer accidents would have occurred last year.",
      },
    ],
    commonMistakes: [
      "Using \"would\" in the \"if\" clause (always non-standard in conditionals).",
      "Mismatching the time frame and the verb form (e.g. a present result expressed with \"would have + V3\").",
      "Treating \"But for\" as a conjunction (\"But for the policy was introduced...\") — it takes a noun phrase only.",
    ],
    ieltsApplications: [
      { task: "Writing Task 2", note: "Mixed conditionals let you evaluate policy counterfactually across time frames — a clear Band 8+ marker of grammatical range and accuracy in evaluation paragraphs." },
      { task: "Writing Task 2", note: "\"If it were not for X, Y would...\" credits a single cause efficiently; \"were to\" raises the register of a hypothetical recommendation." },
    ],
    exercises: [
      {
        id: "dm-1",
        type: "mc",
        prompt: "Choose the correct mixed conditional (past condition → present result):",
        options: [
          "If the law had passed, unemployment would have fallen last year.",
          "If the law had passed, unemployment would not be so high today.",
          "If the law passed, unemployment would not be so high today.",
          "If the law would have passed, unemployment would not be so high today.",
        ],
        answer: "If the law had passed, unemployment would not be so high today.",
        explanation: "Past condition (had + V3) + present result (would + bare infinitive) is the 3→2 mixed conditional. The result clause refers to \"today\", so \"would not be\" is correct, not \"would have fallen\".",
        difficulty: 3,
      },
      {
        id: "dm-2",
        type: "fill-blank",
        prompt: "Complete with the correct past-perfect form of \"act\": If the council ____ sooner, the river would not be so polluted today.",
        answer: "had acted",
        explanation: "Past condition (3) + present result (2): the \"if\" clause uses the past perfect (\"had acted\"); the main clause uses \"would + bare infinitive\" (\"would not be\").",
        difficulty: 3,
      },
      {
        id: "dm-3",
        type: "transformation",
        prompt: "Rewrite as a 3→2 mixed conditional (past condition, present result): \"The treaty was not signed, so the conflict continues.\"",
        answer: "If the treaty had been signed, the conflict would not continue today.",
        acceptable: [
          "if the treaty had been signed, the conflict would not continue today",
          "if the treaty had been signed, the conflict would not still continue today",
          "if the treaty had been signed, the conflict would not be continuing",
        ],
        explanation: "Convert the past cause into a Type 3 \"if\" clause (had + V3) and the present effect into a Type 2 main clause (would + bare infinitive).",
        difficulty: 3,
      },
      {
        id: "dm-4",
        type: "error-id",
        prompt: "Find the error: \"If the museum were to close, the collection would have been sold.\"",
        answer: "would have been sold",
        acceptable: ["would have been sold", "would have been"],
        explanation: "A future hypothetical with \"were to\" takes a Type 2 main clause (would + bare infinitive), not a Type 3 form. → \"...the collection would be sold.\"",
        difficulty: 3,
      },
    ],
    prerequisites: ["conditionals"],
    estimatedMinutes: 16,
    version: 1,
    status: "published",
  },

  // =====================================================================
  // LESSON 4 — Participle clauses & reduced relative clauses
  // =====================================================================
  {
    id: "d-participle-clauses",
    slug: "d-participle-reduced-clauses",
    title: "Participle Clauses & Reduced Relative Clauses",
    level: "D",
    cefrLevel: "C1",
    topic: "Clauses",
    subtopic: "Participle and reduced clauses",
    objectives: [
      "Form participle clauses (-ing, -ed/V3, \"having + V3\") to express time, reason, or result concisely.",
      "Reduce relative clauses to participle phrases without changing meaning.",
      "Identify and correct dangling and misrelated participle errors.",
    ],
    explanation:
      "A participle clause uses a present participle (-ing), a past participle (-ed/V3), or a perfect participle (\"having + V3\") to compress a clause. The present participle expresses an active or simultaneous action (\"Walking through the market, she noticed a familiar face\"); the past participle expresses a passive relationship (\"Built in 1908, the bridge still stands\"); the perfect participle expresses an action completed before the main action (\"Having reviewed the data, the committee approved the plan\" = after the committee had reviewed it). Reduced relative clauses work the same way: \"The students who were sitting the exam...\" → \"The students sitting the exam...\"; \"The report which was published yesterday...\" → \"The report published yesterday...\". The defining rule is subject agreement: the implied subject of the participle MUST match the subject of the main clause. A dangling participle breaks this rule: \"Walking home, the rain started\" (the rain was not walking) → \"Walking home, I felt the first drops of rain\". Misrelated -ing/-ed forms (\"boring\" vs \"bored\", \"interesting\" vs \"interested\") follow the same logic: choose the form whose active/passive relationship fits. Participle clauses are excellent for concise academic writing but should not be used when the result is ambiguous (\"The report written yesterday\" is unclear if multiple reports exist).",
    bengaliExplanation:
      "Participle clause দিয়ে দুটি clause-কে সংক্ষিপ্তভাবে যুক্ত করা যায়। Present participle (-ing) সক্রিয় বা একই সময়ের কাজ; past participle (-ed/V3) নিষ্ক্রিয় সম্পর্ক; perfect participle (\"having + V3\") মূল ক্রিয়ার আগে সম্পন্ন কাজ বোঝায়। Reduced relative clause: \"students who were sitting...\" → \"students sitting...\"; \"the report which was published...\" → \"the report published...\"। সবচেয়ে গুরুত্বপূর্ণ নিয়ম: participle-এর implied subject অবশ্যই main clause-এর subject-এর সঙ্গে মিলতে হবে। না হলে dangling participle ভুল হয় (\"Walking home, the rain started\" — ভুল; rain হাঁটছে না)। \"boring\" বনাম \"bored\", \"interesting\" বনাম \"interested\"-এর মতো রূপ বাছাই করুন।",
    pattern: "Participle clause: (Having + V3 / V-ing / V3), + main clause. Reduced relative: noun + V-ing/V3 (instead of noun + relative pronoun + be + V-ing/V3).",
    examples: [
      {
        sentence: "Having secured additional funding, the research team expanded the trial to three further cities.",
        note: "Perfect participle for a completed prior action; subject \"the research team\" matches both clauses.",
      },
      {
        sentence: "The data collected in 2019 show a markedly different pattern from those gathered a decade earlier.",
        note: "Reduced relative clause using a past participle (\"which were collected\" → \"collected\").",
      },
      {
        sentence: "Compared with the previous decade, urban air quality has improved substantially.",
        note: "Past participle introducing a comparison; subject \"urban air quality\" is what is compared.",
      },
      {
        sentence: "Built to withstand earthquakes, the new hospital remained fully operational after the tremor.",
        note: "Past participle for a passive descriptive phrase; subject \"the new hospital\" matches.",
      },
    ],
    incorrectExamples: [
      {
        sentence: "Having finished the report, the printer jammed.",
        error: "Dangling participle: the implied subject of \"having finished\" is the writer, but the subject of the main clause is \"the printer\".",
        correction: "Having finished the report, I found that the printer had jammed.",
      },
      {
        sentence: "The students seating the exam felt nervous.",
        error: "The active participle \"seating\" implies the students were seating someone else; the intended meaning is \"sitting/taking the exam\".",
        correction: "The students sitting the exam felt nervous.",
      },
    ],
    commonMistakes: [
      "Dangling participles: the implied subject of the participle must match the subject of the main clause.",
      "Confusing -ing and -ed forms (\"boring\" vs \"bored\", \"interesting\" vs \"interested\") — choose the form whose active/passive relationship fits.",
      "Reducing a relative clause when the result is ambiguous (\"The report written yesterday\" is unclear if several reports exist).",
    ],
    ieltsApplications: [
      { task: "Writing Task 2", note: "Participle clauses compress cause-effect and time relationships without adding sentences — a Band 8+ marker of concise, controlled grammar (\"Having outlined the causes, this essay now considers the remedies\")." },
      { task: "Academic Task 1", note: "Reduced relative clauses (\"The data shown in Figure 2...\") keep description tight; perfect participles link sequential stages in process diagrams." },
    ],
    exercises: [
      {
        id: "dp-1",
        type: "mc",
        prompt: "Choose the sentence with NO dangling participle:",
        options: [
          "Walking through the market, the rain started to fall.",
          "Having read the report, several errors were found.",
          "Having read the report, the editor found several errors.",
          "Sitting on the desk, the laptop attracted the cat.",
        ],
        answer: "Having read the report, the editor found several errors.",
        explanation: "The implied subject of \"having read\" (the editor) matches the main clause subject. In the other options the implied subject does not match (the rain, errors, and the cat did not walk, read, or sit).",
        difficulty: 3,
      },
      {
        id: "dp-2",
        type: "fill-blank",
        prompt: "Complete with the perfect participle (have + V3) of \"finish\": ____ the analysis, the team submitted the report.",
        answer: "Having finished",
        acceptable: ["having finished"],
        explanation: "Use the perfect participle \"having finished\" to show the action was completed before the main clause action.",
        difficulty: 2,
      },
      {
        id: "dp-3",
        type: "transformation",
        prompt: "Reduce the relative clause using a participle: \"The students who were surveyed reported higher stress.\"",
        answer: "The students surveyed reported higher stress.",
        acceptable: ["the students surveyed reported higher stress"],
        explanation: "Drop \"who were\" and keep the past participle \"surveyed\"; the reduced clause still carries the passive meaning.",
        difficulty: 3,
      },
      {
        id: "dp-4",
        type: "error-id",
        prompt: "Find the dangling participle: \"Driving home, the traffic was unusually heavy.\"",
        answer: "Driving home",
        acceptable: ["Driving home", "driving home", "Driving"],
        explanation: "The implied subject of \"driving\" (a person) does not match the main clause subject (\"the traffic\"). → \"Driving home, I found the traffic unusually heavy.\"",
        difficulty: 3,
      },
    ],
    prerequisites: ["relative-clauses"],
    estimatedMinutes: 15,
    version: 1,
    status: "published",
  },

  // =====================================================================
  // LESSON 5 — Advanced passive & nominalisation (and when NOT to use)
  // =====================================================================
  {
    id: "d-advanced-passive-nominalisation",
    slug: "d-advanced-passive-nominalisation",
    title: "Advanced Passive & Nominalisation — and When Not to Use Them",
    level: "D",
    cefrLevel: "C2",
    topic: "Voice",
    subtopic: "Advanced passive and nominalisation",
    objectives: [
      "Use passive reporting structures (\"It is widely acknowledged that...\") for hedged academic claims and consensus.",
      "Use nominalisation (\"The introduction of the policy led to...\") to package actions as concepts in abstract academic writing.",
      "Recognise when over-nominalisation or over-passivisation weakens writing and revise toward a clearer active verb.",
    ],
    explanation:
      "Passive reporting structures (\"It is widely believed/argued/acknowledged that...\") hedge claims by leaving the source general — useful when summarising a consensus without naming a specific author. Nominalisation turns a verb or clause into a noun phrase: \"The government implemented the policy and unemployment fell\" → \"The implementation of the policy contributed to a fall in unemployment\". This packages processes as things, which suits abstract academic register and lets the writer make a clause into a subject (\"The rapid expansion of online learning has prompted universities to revise their assessment models\"). Both devices carry risks, however. Excessive passives make responsibility vague (\"Mistakes were made\") and weaken the writer's voice; stacked nominalisations bury the action under layers of nouns (\"The improvement of the assessment of the quality of teaching led to the development of a framework for the enhancement of outcomes\") — a sentence that takes five nouns to say what one active verb could. Strong academic writers alternate nominalised, passive sentences with clear active ones: \"The introduction of congestion charging reduced traffic by a third; commuters responded within weeks.\" A simple test: if you can replace a passive or nominalised phrase with an active verb and the sentence becomes clearer without losing meaning, do so. Reserve passive reporting for genuine hedging (\"It is widely argued that...\") and nominalisation for when the process genuinely needs to be treated as a concept.",
    bengaliExplanation:
      "Passive reporting (\"It is widely acknowledged that...\") সাধারণ ঐক্য বোঝাতে ব্যবহৃত হয় — source সাধারণ রাখলে claim-এর সতর্কতা বাড়ে। Nominalisation ক্রিয়াকে noun-এ পরিণত করে (\"The implementation of the policy led to...\") — প্রক্রিয়াকে বিমূর্ত ধারণা হিসেবে উপস্থাপন করতে সাহায্য করে। তবে অতিরিক্ত passive দায় অস্পষ্ট করে (\"Mistakes were made\") এবং অতিরিক্ত nominalisation লেখাকে ভারী ও অস্পষ্ট করে (\"the improvement of the assessment of the quality of teaching...\")। ভালো লেখক active ও passive/nominalised বাক্যের ভারসাম্য রাখেন। সহজ পরীক্ষা: যদি কোনো passive বা nominalised phrase-কে active verb দিয়ে প্রতিস্থাপন করলে বাক্য পরিষ্কার হয় এবং অর্থ অপরিবর্তিত থাকে, তবে active ব্যবহার করুন।",
    pattern: "Passive reporting: It + be + V3 reporting verb (acknowledged/believed/argued) + that + clause. Nominalisation: (the + noun-form of verb + of + object) + active verb + object.",
    examples: [
      {
        sentence: "It is widely acknowledged that early childhood education yields long-term economic returns.",
        note: "Passive reporting for a general academic consensus; the source is left general intentionally.",
      },
      {
        sentence: "The introduction of congestion charging reduced traffic in the city centre by almost a third.",
        note: "Nominalisation packaging an action as a concept; the verb \"reduced\" stays active and clear.",
      },
      {
        sentence: "The rapid expansion of online learning has prompted universities to revise their assessment models.",
        note: "Nominalisation as the subject of an active verb; one noun phrase, one clear verb.",
      },
      {
        sentence: "Policymakers implemented the reform in stages, which allowed errors to be corrected without disrupting the system.",
        note: "Active clause balanced with one passive clause — preferred over \"The reform was implemented by policymakers\".",
      },
    ],
    incorrectExamples: [
      {
        sentence: "It is believed by many people that the policy is good, and the implementation of the policy by the government was the cause of the improvement of the situation.",
        error: "Over-passivisation plus stacked nominalisations make the sentence wordy and unclear.",
        correction: "Many believe the policy is sound; its implementation improved the situation.",
      },
      {
        sentence: "The data was analysed and the conclusion was reached that the hypothesis was supported.",
        error: "A chain of weak passives hides who did what; \"was reached\" is also a nominalised passive.",
        correction: "Researchers analysed the data and concluded that the hypothesis was supported.",
      },
    ],
    commonMistakes: [
      "Stacking three or more nouns/nominalisations in a row (\"the assessment of the development of the implementation of...\").",
      "Using \"It is believed by people that...\" instead of the cleaner \"It is widely believed that...\" or \"Many believe that...\".",
      "Defaulting to the passive for every claim, which weakens the writer's voice and lowers the Task Response score.",
    ],
    ieltsApplications: [
      { task: "Writing Task 2", note: "One or two passive reporting structures per essay (\"It is widely argued that...\") add academic register; over-using them makes the essay sound detached and lowers Lexical Resource scores." },
      { task: "Academic Task 1", note: "Nominalisation helps summarise trends (\"A steady decline in production...\") but should be balanced with active verbs (\"Production fell steadily...\") for variety and clarity." },
    ],
    exercises: [
      {
        id: "da-1",
        type: "mc",
        prompt: "Choose the clearest, most concise version:",
        options: [
          "The implementation of the assessment of the policy by the committee resulted in the improvement of outcomes.",
          "The committee assessed the policy, which improved outcomes.",
          "Outcomes were improved by the implementation of the assessment of the policy.",
          "It was the implementation by the committee of the assessment of the policy that resulted in the improvement of outcomes.",
        ],
        answer: "The committee assessed the policy, which improved outcomes.",
        explanation: "Active verb + one clear agent; the other options stack nominalisations and passives that obscure the action and inflate word count.",
        difficulty: 3,
      },
      {
        id: "da-2",
        type: "transformation",
        prompt: "Rewrite more naturally: \"It is believed by many researchers that the model is effective.\"",
        answer: "Many researchers believe that the model is effective.",
        acceptable: [
          "many researchers believe that the model is effective",
          "many researchers believe the model is effective",
          "researchers widely believe that the model is effective",
        ],
        explanation: "Replace the wordy passive \"It is believed by X that...\" with the active \"X believe that...\"; meaning is preserved and the agent is explicit.",
        difficulty: 2,
      },
      {
        id: "da-3",
        type: "error-id",
        prompt: "Find the over-nominalised or over-passive element: \"The improvement of the situation was the result of the implementation of the policy by the government.\"",
        answer: "the improvement of the situation was the result of the implementation of the policy by the government",
        acceptable: [
          "the improvement of the situation",
          "the implementation of the policy",
          "was the result of",
          "improvement of the situation was the result of the implementation of the policy",
        ],
        explanation: "Two stacked nominalisations (\"improvement of the situation\", \"implementation of the policy\") plus a passive by-clause. Clearer: \"The government implemented the policy, which improved the situation.\"",
        difficulty: 3,
      },
      {
        id: "da-4",
        type: "fill-blank",
        prompt: "Complete with the noun form of \"introduce\": The ____ of the tax reduced emissions sharply.",
        answer: "introduction",
        explanation: "Nominalisation turns the verb \"introduce\" into the noun \"introduction\": \"The introduction of the tax...\".",
        difficulty: 2,
      },
    ],
    prerequisites: ["active-passive-voice"],
    estimatedMinutes: 16,
    version: 1,
    status: "published",
  },

  // =====================================================================
  // LESSON 6 — Concision, ellipsis & substitution
  // =====================================================================
  {
    id: "d-concision-ellipsis",
    slug: "d-concision-ellipsis-substitution",
    title: "Concision, Ellipsis & Substitution",
    level: "D",
    cefrLevel: "C1",
    topic: "Cohesion",
    subtopic: "Concision, ellipsis, substitution",
    objectives: [
      "Edit sentences for concision by removing redundancy, wordy phrases, and unnecessary repetition.",
      "Use ellipsis (omitting shared words) and substitution (do/does/so/one) to avoid repetition without losing clarity.",
      "Vary sentence length for emphasis, combining short and longer sentences for readability.",
    ],
    explanation:
      "Concision means expressing the same meaning in fewer words without losing information. Common wordy phrases to compress include \"due to the fact that\" → \"because\"; \"in order to\" → \"to\"; \"a large number of\" → \"many\"; \"in the event that\" → \"if\"; \"it is important to note that\" → \"importantly,\"; \"in spite of the fact that\" → \"although\"; \"at this point in time\" → \"now\". Ellipsis allows you to omit shared words that the reader can reconstruct: \"Some students passed; others did not\" (\"did not\" = \"did not pass\"). Substitution replaces a repeated phrase with a short pro-form: \"do/does/did\" for verbs (\"She likes tea, and so do I\"); \"so\" for whole clauses (\"The council claimed the budget was balanced, and so it was\"); \"one/ones\" for countable nouns (\"I prefer the small sample to the large one\"). Sentence-length variety is the third tool: a deliberate short sentence after several long ones creates emphasis and signals control. A 35-word sentence with one idea is harder to read than a 15-word sentence with the same idea. The risk is over-compression: ellipsis only works when the omitted words are unambiguous from context. \"Some passed; others didn't\" is fine after the verb is established; \"Some passed; others didn't\" with no prior context can be unclear. Aim for the shortest version that fully preserves meaning and tone.",
    bengaliExplanation:
      "Concision একই অর্থ কম শব্দে প্রকাশ করা। সাধারণ wordy phrase সংকুচিত করুন: \"due to the fact that\" → \"because\"; \"in order to\" → \"to\"; \"a large number of\" → \"many\"; \"in the event that\" → \"if\"; \"at this point in time\" → \"now\"। Ellipsis পুনরাবৃত্ত শব্দ বাদ দেয় (\"Some passed; others did not\" = \"did not pass\")। Substitution \"do/does/so/one\" দিয়ে পুনরাবৃত্ত বাক্যাংশ প্রতিস্থাপন করে (\"She likes tea, and so do I\")। ছোট ও বড় বাক্যের পর্যায়ক্রম জোর ও পঠনযোগ্যতা বাড়ায়। সতর্কতা: অতিরিক্ত সংকোচনে অর্থ অস্পষ্ট হতে পারে — ellipsis তখনই কাজ করে যখন বাদ দেওয়া শব্দ context থেকে স্পষ্ট।",
    pattern: "Concise: [one idea per clause]. Ellipsis: S1 + V1; S2 + Ø (shared V omitted). Substitution: ..., and so + aux + S. / ..., and aux + S + too.",
    examples: [
      {
        sentence: "Because the policy was well designed, uptake was rapid.",
        note: "Concise revision of \"Due to the fact that the policy was well designed, uptake was rapid\".",
      },
      {
        sentence: "Some participants supported the reform; others did not.",
        note: "Ellipsis of \"support the reform\" in the second clause.",
      },
      {
        sentence: "The northern region saw a sharp rise in infections; so did the eastern region.",
        note: "Substitution with \"so did\" to avoid repeating the full verb phrase.",
      },
      {
        sentence: "The current model is expensive. A simpler one would deliver most of the benefits at lower cost.",
        note: "Short sentence for emphasis; \"one\" substitutes for \"model\".",
      },
    ],
    incorrectExamples: [
      {
        sentence: "Due to the fact that the fact of the matter is that funding is limited, the project is, at this point in time, on hold.",
        error: "Stacked wordy phrases (\"due to the fact that\", \"the fact of the matter is\", \"at this point in time\") add no information.",
        correction: "Because funding is limited, the project is on hold.",
      },
      {
        sentence: "The northern region saw a sharp rise, and the eastern region saw a sharp rise too.",
        error: "Repetition of the full verb phrase; ellipsis or substitution would resolve it.",
        correction: "The northern region saw a sharp rise, and so did the eastern region.",
      },
    ],
    commonMistakes: [
      "Wordy connectives (\"due to the fact that\", \"in spite of the fact that\", \"in the event that\") instead of single words (\"because\", \"although\", \"if\").",
      "Repeating a verb phrase instead of substituting (\"I like hiking and she likes hiking too\" → \"I like hiking, and so does she\").",
      "Compressing so much that the meaning is lost: ellipsis only works when the omitted words are unambiguous from context.",
    ],
    ieltsApplications: [
      { task: "Writing Task 2", note: "Examiners reward precise, concise writing under Lexical Resource and Coherence & Cohesion; wordy essays read as Band 6 even when the grammar is correct." },
      { task: "Writing Task 2", note: "Vary sentence length deliberately — a 6-word sentence after a 25-word one signals control and creates emphasis (Band 8+ Grammatical Range and Accuracy)." },
    ],
    exercises: [
      {
        id: "dce-1",
        type: "mc",
        prompt: "Choose the most concise version:",
        options: [
          "Due to the fact that the weather was bad, the event was cancelled.",
          "Because of the fact that the weather was bad, the event was cancelled.",
          "Because the weather was bad, the event was cancelled.",
          "The event was cancelled due to the fact that the weather was bad.",
        ],
        answer: "Because the weather was bad, the event was cancelled.",
        explanation: "\"Because\" is one word; \"due to the fact that\" and \"because of the fact that\" are wordy equivalents that add no information.",
        difficulty: 2,
      },
      {
        id: "dce-2",
        type: "transformation",
        prompt: "Make the sentence more concise by removing wordiness: \"In order to be able to meet the deadline, the team made a decision to start earlier.\"",
        answer: "To meet the deadline, the team started earlier.",
        acceptable: [
          "to meet the deadline, the team started earlier",
          "to meet the deadline, the team decided to start earlier",
        ],
        explanation: "Replace \"in order to be able to meet\" with \"to meet\"; \"made a decision to start\" → \"started\" (or \"decided to start\").",
        difficulty: 3,
      },
      {
        id: "dce-3",
        type: "fill-blank",
        prompt: "Complete with substitution (two words): The UK saw a sharp rise, and ____ Canada.",
        answer: "so did",
        acceptable: ["so did"],
        explanation: "Use \"so + auxiliary + subject\" to substitute for the full verb phrase \"saw a sharp rise\". \"Canada\" takes the past-tense auxiliary \"did\".",
        difficulty: 2,
      },
      {
        id: "dce-4",
        type: "error-id",
        prompt: "Find the wordy/repetitive element: \"The committee, at this point in time, is of the opinion that the proposal is beneficial in nature.\"",
        answer: "at this point in time, is of the opinion, beneficial in nature",
        acceptable: [
          "at this point in time",
          "is of the opinion",
          "beneficial in nature",
          "at this point in time, is of the opinion, beneficial in nature",
        ],
        explanation: "Three wordy phrases: \"at this point in time\" → \"now\"; \"is of the opinion that\" → \"believes that\"; \"beneficial in nature\" → \"beneficial\". Concise version: \"The committee now believes the proposal is beneficial.\"",
        difficulty: 3,
      },
    ],
    prerequisites: ["compound-complex-sentences"],
    estimatedMinutes: 14,
    version: 1,
    status: "published",
  },
];

export const levelDLessonCount = levelDLessons.length;
