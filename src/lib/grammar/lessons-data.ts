// Original IELTS grammar curriculum.
//
// All explanations, examples, incorrect examples, common mistakes, IELTS
// applications, and exercises are original, hand-authored for this project.
// No content is copied from Cambridge, Oxford, British Council, IELTS
// official materials, or any other third-party source. External references
// (AGENT.md §12) were used only to prioritise topics, not to reproduce text.
//
// Level A = foundations (A1–A2), Level B = essential IELTS (B1),
// Level C = IELTS Writing-specific (B2): Academic Task 1, General Training
// letters, and Task 2 essays. Level D (C1+) remains for a future milestone.

import type { GrammarLesson } from "./types";
import { academicTask1Lessons } from "./lessons-academic-task1";
import { gtLetterLessons } from "./lessons-gt-letters";
import { task2Lessons } from "./lessons-task2";

export const grammarLessons: GrammarLesson[] = [
  // =====================================================================
  // LEVEL A — Foundations (A1–A2)
  // =====================================================================
  {
    id: "sentence-structure",
    slug: "sentence-structure",
    title: "Sentence Structure & Parts of Speech",
    level: "A",
    cefrLevel: "A1",
    topic: "Sentence structure",
    subtopic: "Basic sentence patterns",
    objectives: [
      "Identify the subject, verb, and object in a simple English sentence.",
      "Recognise the main parts of speech and their function.",
      "Build a grammatical simple sentence.",
    ],
    explanation:
      "A complete English sentence needs at least a subject and a verb, and it must express a complete thought. The most common pattern is Subject + Verb + Object (SVO). The subject is who or what performs the action; the verb is the action or state; the object receives the action. Words belong to classes called parts of speech: nouns (names: city, education), verbs (actions/states: rises, is), adjectives (describe nouns: urban, modern), adverbs (describe verbs/adjectives: rapidly, very), pronouns (replace nouns: it, they), prepositions (relationships of place/time: in, to), conjunctions (join: and, because), and determiners (a, the, some).",
    bengaliExplanation:
      "একটি পূর্ণ ইংরেজি বাক্যে অন্তত একটি subject এবং verb থাকতে হয়। সাধারণ গঠন হলো Subject + Verb + Object। Subject যে বা যা কাজ করে, verb হলো ক্রিয়া, object কাজের লক্ষ্য।",
    pattern: "Subject + Verb (+ Object).",
    examples: [
      { sentence: "Education improves living standards.", note: "SVO pattern." },
      { sentence: "The city grows rapidly.", note: "SV + adverb." },
      { sentence: "People migrate to urban areas.", note: "SVO + prepositional phrase." },
    ],
    incorrectExamples: [
      {
        sentence: "Education important for everyone.",
        error: "No verb. 'important' is an adjective, not a verb.",
        correction: "Education is important for everyone.",
      },
      {
        sentence: "Grows rapidly the city.",
        error: "Missing subject and wrong word order.",
        correction: "The city grows rapidly.",
      },
    ],
    commonMistakes: [
      "Writing a noun phrase with no verb (e.g. 'Many people in cities.' is not a sentence).",
      "Confusing adjectives and adverbs (e.g. 'grows rapid' instead of 'grows rapidly').",
    ],
    ieltsApplications: [
      { task: "Writing Task 2", note: "Every sentence in your essay must be complete: subject + verb + complete thought." },
      { task: "Speaking Part 2", note: "Short complete sentences are clearer than long broken ones." },
    ],
    exercises: [
      {
        id: "ss-1",
        type: "mc",
        prompt: "Which is a complete sentence?",
        options: ["Many people in the city.", "Many people live in the city.", "Living in the city.", "Because of the traffic."],
        answer: "Many people live in the city.",
        explanation: "Only this option has a subject ('Many people') and a verb ('live') and expresses a complete thought.",
        difficulty: 1,
      },
      {
        id: "ss-2",
        type: "fill-blank",
        prompt: "Complete: The government ____ new policies every year. (use: introduce, correct verb form)",
        answer: "introduces",
        explanation: "Present simple, third-person singular: the government (it) → introduces.",
        difficulty: 2,
      },
      {
        id: "ss-3",
        type: "error-id",
        prompt: "Identify the error: 'The number of tourists increasing every year.'",
        answer: "increasing",
        acceptable: ["no verb", "missing verb", "needs 'is increasing'"],
        explanation: "There is no finite verb. 'increasing' is a participle; the sentence needs 'is increasing' or 'increases'.",
        difficulty: 2,
      },
      {
        id: "ss-4",
        type: "correction",
        prompt: "Correct this sentence: 'Education very important for development.'",
        answer: "Education is very important for development.",
        acceptable: ["education is very important for development"],
        explanation: "Add the verb 'is' to link the subject 'Education' with the adjective phrase 'very important'.",
        difficulty: 1,
      },
    ],
    prerequisites: [],
    estimatedMinutes: 8,
    version: 1,
    status: "published",
  },

  {
    id: "subject-verb-agreement",
    slug: "subject-verb-agreement",
    title: "Subject–Verb Agreement",
    level: "A",
    cefrLevel: "A2",
    topic: "Agreement",
    subtopic: "Singular and plural subjects",
    objectives: [
      "Match the verb form with the subject in number.",
      "Handle tricky subjects: 'the number of', 'a number of', indefinite pronouns, and long subjects.",
    ],
    explanation:
      "A singular subject takes a singular verb; a plural subject takes a plural verb. In the present simple, the third-person singular (he/she/it) adds -s. Watch for tricky subjects: 'The number of X is…' (the number is singular) but 'A number of X are…' (a number of = several). Indefinite pronouns like 'everyone', 'someone', 'each' are singular. When the subject is long, find the head noun and match the verb to it, not to the nearest noun.",
    bengaliExplanation:
      "Singular subject এর সাথে singular verb, plural subject এর সাথে plural verb বসে। 'The number of' সর্বদা singular, কিন্তু 'a number of' plural ধরা হয়।",
    pattern: "Singular subject → singular verb; Plural subject → plural verb.",
    examples: [
      { sentence: "The number of students has increased.", note: "'The number' is singular." },
      { sentence: "A number of students are absent today.", note: "'A number of' = several, plural." },
      { sentence: "Everyone needs a place to live.", note: "'Everyone' is singular." },
    ],
    incorrectExamples: [
      {
        sentence: "People is becoming more dependent on technology.",
        error: "'People' is plural, so it takes 'are', not 'is'.",
        correction: "People are becoming more dependent on technology.",
      },
      {
        sentence: "The number of tourists are rising.",
        error: "The subject is 'The number' (singular), not 'tourists'.",
        correction: "The number of tourists is rising.",
      },
    ],
    commonMistakes: [
      "Using 'is' with 'people', 'children', 'data' (all plural).",
      "Matching the verb to the nearest noun instead of the head noun: 'The list of items were long' → 'The list of items was long'.",
    ],
    ieltsApplications: [
      { task: "Academic Task 1", note: "'The proportion of households was…' (proportion is singular)." },
      { task: "Writing Task 2", note: "'People are…' / 'The number of people is…' — check agreement carefully." },
    ],
    exercises: [
      {
        id: "sva-1",
        type: "mc",
        prompt: "Choose the correct verb: 'The number of cars in the city ____ growing.'",
        options: ["is", "are", "was being", "have"],
        answer: "is",
        explanation: "The subject is 'The number' (singular), so the verb is 'is'.",
        difficulty: 2,
      },
      {
        id: "sva-2",
        type: "mc",
        prompt: "Choose the correct verb: 'A number of problems ____ been identified.'",
        options: ["has", "have", "is", "was"],
        answer: "have",
        explanation: "'A number of' = several, so it is plural → 'have been identified'.",
        difficulty: 2,
      },
      {
        id: "sva-3",
        type: "fill-blank",
        prompt: "Complete: Everyone in the class ____ a textbook. (use: have)",
        answer: "has",
        explanation: "'Everyone' is singular, so it takes 'has', not 'have'.",
        difficulty: 2,
      },
      {
        id: "sva-4",
        type: "error-id",
        prompt: "Find the agreement error: 'The data shows that urban populations are increasing.'",
        answer: "data shows",
        acceptable: ["data", "shows", "data show"],
        explanation: "'Data' is traditionally plural (singular 'datum'); 'the data show' is more accurate, though 'data shows' is increasingly accepted.",
        difficulty: 3,
      },
    ],
    prerequisites: ["sentence-structure"],
    estimatedMinutes: 10,
    version: 1,
    status: "published",
  },

  {
    id: "tenses-foundation",
    slug: "present-past-future-forms",
    title: "Present, Past & Future Forms",
    level: "A",
    cefrLevel: "A2",
    topic: "Tense",
    subtopic: "Core tenses",
    objectives: [
      "Use the present simple for facts, routines, and general truths.",
      "Use the past simple for completed past actions.",
      "Use 'will', 'be going to', and present continuous for future meaning.",
    ],
    explanation:
      "Present simple describes general facts and routines ('Water boils at 100°C.'). Past simple describes completed actions with a finished time ('In 2010, the figure rose.'). For the future: 'will' for predictions and instant decisions ('Prices will rise.'); 'be going to' for intentions and evidence-based predictions ('It is going to rain.'); present continuous for fixed arrangements ('I am meeting the team tomorrow.').",
    bengaliExplanation:
      "Present simple সাধারণ সত্য ও নিয়মিত কাজের জন্য, past simple সম্পন্ন অতীত কাজের জন্য। Future-এ 'will' পূর্বাভাসের জন্য, 'be going to' উদ্দেশ্য বা প্রমাণভিত্তিক পূর্বাভাসের জন্য।",
    pattern: "Present: S + V(s). Past: S + V-ed (regular). Future: S + will + V / S + be going to + V.",
    examples: [
      { sentence: "The sun rises in the east.", note: "General fact — present simple." },
      { sentence: "In 2015, the population reached 2 million.", note: "Completed past — past simple." },
      { sentence: "The population will reach 3 million by 2030.", note: "Prediction — will." },
    ],
    incorrectExamples: [
      {
        sentence: "In 2010 the figure increase by 10%.",
        error: "Past time (2010) needs the past simple, not present.",
        correction: "In 2010 the figure increased by 10%.",
      },
      {
        sentence: "I will to go to the meeting tomorrow.",
        error: "After 'will' use the bare infinitive (no 'to').",
        correction: "I will go to the meeting tomorrow.",
      },
    ],
    commonMistakes: [
      "Using present simple with a finished past time ('Yesterday I go…' → 'Yesterday I went…').",
      "Adding 'to' after 'will' ('will to go').",
    ],
    ieltsApplications: [
      { task: "Academic Task 1", note: "Past simple for completed chart periods; present simple for general facts; 'is projected to / will' for forecasts." },
      { task: "Writing Task 2", note: "Present simple for general arguments; past simple for historical context." },
    ],
    exercises: [
      {
        id: "tf-1",
        type: "mc",
        prompt: "Choose: 'In 1990, the number of cars ____ 500.'",
        options: ["is", "was", "will be", "are"],
        answer: "was",
        explanation: "1990 is a finished past time → past simple 'was'.",
        difficulty: 1,
      },
      {
        id: "tf-2",
        type: "fill-blank",
        prompt: "Complete: By 2030, the population ____ reach 10 million. (use: will)",
        answer: "will",
        explanation: "Prediction for a future year → 'will reach'.",
        difficulty: 1,
      },
      {
        id: "tf-3",
        type: "correction",
        prompt: "Correct: 'Water boil at 100 degrees Celsius.'",
        answer: "Water boils at 100 degrees Celsius.",
        acceptable: ["water boils at 100 degrees celsius"],
        explanation: "General fact → present simple; 'water' (singular) → 'boils'.",
        difficulty: 1,
      },
      {
        id: "tf-4",
        type: "error-id",
        prompt: "Find the tense error: 'The report show that the figures rose last year.'",
        answer: "show",
        acceptable: ["report show", "the report shows"],
        explanation: "'The report' is singular → 'shows'. (Agreement + present simple for what the report states.)",
        difficulty: 2,
      },
    ],
    prerequisites: ["sentence-structure"],
    estimatedMinutes: 12,
    version: 1,
    status: "published",
  },

  {
    id: "articles-a-an-the",
    slug: "articles-a-an-the",
    title: "Articles: a / an / the",
    level: "A",
    cefrLevel: "A2",
    topic: "Articles",
    subtopic: "Definite, indefinite, zero article",
    objectives: [
      "Use 'a/an' for singular countable nouns mentioned for the first time.",
      "Use 'the' for specific or previously mentioned nouns.",
      "Recognise when no article is needed (general plurals, uncountables, abstract ideas).",
    ],
    explanation:
      "'A/an' is used before a singular countable noun that is not specific ('I read a book.'). 'An' is used before a vowel sound ('an hour', 'an MBA'). 'The' is used when the noun is specific, unique, or already known ('the sun', 'the government', 'the chart below'). No article is used for general statements with plural or uncountable nouns ('Education is important.' / 'People migrate for work.') and for most abstract ideas in a general sense.",
    bengaliExplanation:
      "অনির্দিষ্ট singular countable noun-এর আগে 'a/an' বসে। নির্দিষ্ট বা পূর্বে উল্লেখিত noun-এর আগে 'the' বসে। সাধারণ plural বা uncountable noun-এর আগে কোনো article লাগে না।",
    pattern: "a/an + singular countable (indefinite); the + specific noun; Ø + general plural/uncountable.",
    examples: [
      { sentence: "I saw a film. The film was about climate change.", note: "'a' first mention, 'the' second mention." },
      { sentence: "Education is a basic right.", note: "General abstract → no article; singular countable → 'a'." },
      { sentence: "The government introduced the policy in 2015.", note: "Specific → 'the'." },
    ],
    incorrectExamples: [
      {
        sentence: "Education is the basic right for every child.",
        error: "Here 'basic right' is one of many, not a specific one already mentioned.",
        correction: "Education is a basic right for every child.",
      },
      {
        sentence: "The people migrate to cities for work.",
        error: "General statement about 'people' → no article.",
        correction: "People migrate to cities for work.",
      },
    ],
    commonMistakes: [
      "Adding 'the' before general plural nouns ('the people are…' when meaning people in general).",
      "Using 'a' before a plural ('a students').",
      "Forgetting 'the' before superlatives ('the best', not 'best').",
    ],
    ieltsApplications: [
      { task: "Academic Task 1", note: "'The chart shows…' (specific chart); 'The percentage of…' (specific)." },
      { task: "Writing Task 2", note: "General statements: 'Education is…' (no article), not 'The education is…'." },
    ],
    exercises: [
      {
        id: "art-1",
        type: "mc",
        prompt: "Choose: '____ government has introduced a new policy.'",
        options: ["A", "An", "The", "—"],
        answer: "The",
        explanation: "A specific government (the one being discussed) → 'The'.",
        difficulty: 1,
      },
      {
        id: "art-2",
        type: "fill-blank",
        prompt: "Insert the correct article (or none): '____ education is essential for development.'",
        answer: "",
        acceptable: ["no article", "zero", "Ø"],
        explanation: "General abstract noun 'education' → no article.",
        difficulty: 2,
      },
      {
        id: "art-3",
        type: "mc",
        prompt: "Choose: 'She is ____ MBA student.'",
        options: ["a", "an", "the", "—"],
        answer: "an",
        explanation: "'MBA' begins with a vowel sound /em/ → 'an MBA'.",
        difficulty: 2,
      },
      {
        id: "art-4",
        type: "correction",
        prompt: "Correct: 'The people who live in cities face many problems.' (the people = people in general)",
        answer: "People who live in cities face many problems.",
        acceptable: ["people who live in cities face many problems"],
        explanation: "General statement → remove 'the'. (If a specific group were intended, 'the' would be correct.)",
        difficulty: 2,
      },
    ],
    prerequisites: ["sentence-structure"],
    estimatedMinutes: 10,
    version: 1,
    status: "published",
  },

  {
    id: "countable-uncountable-quantifiers",
    slug: "countable-uncountable-quantifiers",
    title: "Countable & Uncountable Nouns; Quantifiers",
    level: "A",
    cefrLevel: "A2",
    topic: "Nouns",
    subtopic: "Countability and quantity",
    objectives: [
      "Distinguish countable and uncountable nouns.",
      "Use quantifiers correctly: some, any, much, many, few, little, a lot of.",
      "Avoid agreement errors caused by treating uncountables as plural.",
    ],
    explanation:
      "Countable nouns can be counted and have plural forms (book/books, student/students). Uncountable nouns cannot be counted and usually have no plural (information, advice, equipment, research, money, water). Use 'many/few' with countable plurals, 'much/little' with uncountables, and 'some/any/a lot of' with both. Uncountable nouns take a singular verb ('The information is useful.'). Many learners wrongly add -s to uncountables ('informations', 'advices') — this is always wrong in standard English.",
    bengaliExplanation:
      "Countable noun গণনা করা যায় ও plural হয়। Uncountable noun গণনা করা যায় না ও সাধারণত plural হয় না (information, advice)। এগুলো সবসময় singular verb নেয়।",
    pattern: "many/few + countable plural; much/little + uncountable; some/any/a lot of + both.",
    examples: [
      { sentence: "Much research has been conducted on this topic.", note: "'research' uncountable." },
      { sentence: "Few students attend the optional session.", note: "'students' countable plural." },
      { sentence: "The information is reliable.", note: "Uncountable → singular verb." },
    ],
    incorrectExamples: [
      {
        sentence: "She gave me many advices.",
        error: "'Advice' is uncountable — it has no plural and cannot take 'many'.",
        correction: "She gave me a lot of advice.",
      },
      {
        sentence: "The informations were helpful.",
        error: "'Information' is uncountable and singular.",
        correction: "The information was helpful.",
      },
    ],
    commonMistakes: [
      "Pluralising uncountables: 'informations', 'furnitures', 'homeworks'.",
      "Using 'much' with countables ('much students') or 'many' with uncountables ('many money').",
    ],
    ieltsApplications: [
      { task: "Academic Task 1", note: "'a large amount of data' (uncountable), not 'many data'." },
      { task: "Writing Task 2", note: "'much evidence', 'many factors' — choose the quantifier by countability." },
    ],
    exercises: [
      {
        id: "cu-1",
        type: "mc",
        prompt: "Choose: 'There isn't ____ information about the topic.'",
        options: ["many", "much", "a few", "few"],
        answer: "much",
        explanation: "'Information' is uncountable → 'much'.",
        difficulty: 2,
      },
      {
        id: "cu-2",
        type: "mc",
        prompt: "Choose the correct sentence:",
        options: [
          "The researches were published.",
          "The research was published.",
          "The research were published.",
          "The researches was published.",
        ],
        answer: "The research was published.",
        explanation: "'Research' is uncountable and singular.",
        difficulty: 2,
      },
      {
        id: "cu-3",
        type: "correction",
        prompt: "Correct: 'She gave me an advice.'",
        answer: "She gave me some advice.",
        acceptable: ["she gave me a piece of advice", "she gave me advice", "she gave me some advice"],
        explanation: "'Advice' is uncountable → 'some advice' or 'a piece of advice'.",
        difficulty: 2,
      },
      {
        id: "cu-4",
        type: "fill-blank",
        prompt: "Complete: Only a ____ students passed the exam. (use: few / little — choose by noun)",
        answer: "few",
        explanation: "'Students' is countable → 'few'. ('A few' = some; 'few' = not many.)",
        difficulty: 2,
      },
    ],
    prerequisites: ["articles-a-an-the"],
    estimatedMinutes: 10,
    version: 1,
    status: "published",
  },

  {
    id: "comparatives-superlatives",
    slug: "comparatives-superlatives",
    title: "Comparatives & Superlatives",
    level: "A",
    cefrLevel: "A2",
    topic: "Comparisons",
    subtopic: "Comparing two or more items",
    objectives: [
      "Form comparatives and superlatives correctly.",
      "Use comparative structures for describing change and proportion.",
      "Avoid double comparatives and incorrect modifiers.",
    ],
    explanation:
      "Short adjectives add -er/-est (fast → faster → fastest). Long adjectives use more/most (important → more important → most important). Irregular: good → better → best; bad → worse → worst. Use 'than' after a comparative ('A is higher than B'). Use 'the' before a superlative ('the highest'). To show proportional change, use structures like 'twice as many as', 'three times more than'. Avoid double comparatives ('more higher') — never combine 'more' with an -er form.",
    bengaliExplanation:
      "ছোট adjective-এ -er/-est যোগ হয় (fast→faster→fastest)। বড় adjective-এ more/most বসে। তুলনায় 'than', superlative-এ 'the' বসে। দ্বিগুণ/ত্রিগুণ বোঝাতে 'twice as many as' ব্যবহার করুন।",
    pattern: "short: -er / the -est; long: more / the most; irregular: good/better/best.",
    examples: [
      { sentence: "Urban areas are more crowded than rural areas.", note: "Long adjective → 'more crowded'." },
      { sentence: "This is the highest figure on the chart.", note: "Short adjective → 'the highest'." },
      { sentence: "Car use is twice as common as bus use.", note: "Proportional comparison." },
    ],
    incorrectExamples: [
      {
        sentence: "The figure is more higher than last year.",
        error: "Double comparative: 'more' + '-er'.",
        correction: "The figure is higher than last year.",
      },
      {
        sentence: "This is most expensive option.",
        error: "Superlative needs 'the'.",
        correction: "This is the most expensive option.",
      },
    ],
    commonMistakes: [
      "Double comparatives: 'more better', 'more faster'.",
      "Missing 'the' before superlatives.",
      "Using 'than' with a superlative.",
    ],
    ieltsApplications: [
      { task: "Academic Task 1", note: "'The figure was highest in 2020' / 'twice as high as in 2010'." },
      { task: "Writing Task 2", note: "'A more effective solution is…' / 'the most significant factor'." },
    ],
    exercises: [
      {
        id: "cs-1",
        type: "mc",
        prompt: "Choose: 'This year's figure is ____ than last year's.'",
        options: ["more high", "higher", "highest", "the higher"],
        answer: "higher",
        explanation: "Comparative of 'high' is 'higher'; use 'than'. No 'more'.",
        difficulty: 1,
      },
      {
        id: "cs-2",
        type: "correction",
        prompt: "Correct: 'It is the more expensive option of the two.'",
        answer: "It is the more expensive of the two.",
        acceptable: ["it is the more expensive of the two", "it is the more expensive option of the two"],
        explanation: "Comparing two items → comparative 'more expensive' (not superlative 'most'). 'The' is correct before 'more'.",
        difficulty: 3,
      },
      {
        id: "cs-3",
        type: "fill-blank",
        prompt: "Complete: Public transport is twice ____ popular as cycling. (use: as)",
        answer: "as",
        explanation: "Proportional structure: 'twice as popular as'.",
        difficulty: 2,
      },
      {
        id: "cs-4",
        type: "error-id",
        prompt: "Find the error: 'The result was more better than expected.'",
        answer: "more better",
        acceptable: ["better", "more better"],
        explanation: "Double comparative. 'Better' is already comparative; remove 'more'. → 'better than expected'.",
        difficulty: 1,
      },
    ],
    prerequisites: ["countable-uncountable-quantifiers"],
    estimatedMinutes: 10,
    version: 1,
    status: "published",
  },

  // =====================================================================
  // LEVEL B — Essential IELTS grammar (B1)
  // =====================================================================
  {
    id: "present-perfect-vs-past-simple",
    slug: "present-perfect-vs-past-simple",
    title: "Present Perfect vs Past Simple",
    level: "B",
    cefrLevel: "B1",
    topic: "Tense",
    subtopic: "Choosing the right past tense",
    objectives: [
      "Use the past simple for completed past actions with a finished time.",
      "Use the present perfect for past actions with a result now, or unfinished time.",
      "Choose correctly between the two in IELTS contexts.",
    ],
    explanation:
      "Use the past simple when the time is finished and known ('In 2010, sales rose.'). Use the present perfect when the exact past time is not stated or the period is unfinished ('Sales have risen this year.'; 'Researchers have discovered a new method.'). The present perfect connects a past action to the present. Common signals: past simple → 'yesterday, in 2010, last week, ago'; present perfect → 'just, already, yet, ever, recently, so far, since, for' (with unfinished periods).",
    bengaliExplanation:
      "Past simple সম্পন্ন অতীত সময়ের জন্য (in 2010, yesterday)। Present perfect এমন অতীত কাজের জন্য যার ফল এখনও আছে বা সময় এখনও শেষ হয়নি (this year, since, for)।",
    pattern: "Past simple: S + V-ed (finished time). Present perfect: S + have/has + V3 (unfinished/result now).",
    examples: [
      { sentence: "In 2018, the population reached 2 million.", note: "Finished past time → past simple." },
      { sentence: "The population has reached 2 million.", note: "Result now, no specific past time → present perfect." },
      { sentence: "I have lived here for ten years.", note: "Unfinished period → present perfect." },
    ],
    incorrectExamples: [
      {
        sentence: "I have seen the film yesterday.",
        error: "'Yesterday' is a finished time → use past simple, not present perfect.",
        correction: "I saw the film yesterday.",
      },
      {
        sentence: "Since 2010, the figure rose steadily.",
        error: "'Since 2010' links to now → present perfect.",
        correction: "Since 2010, the figure has risen steadily.",
      },
    ],
    commonMistakes: [
      "Using present perfect with a finished past time ('have done it yesterday').",
      "Using past simple with 'since' or 'for' linking to now.",
    ],
    ieltsApplications: [
      { task: "Academic Task 1", note: "Past simple for finished chart years; present perfect only when the chart includes 'to now' or general statements." },
      { task: "Writing Task 2", note: "'In recent years, X has become…' (unfinished period → present perfect)." },
    ],
    exercises: [
      {
        id: "pp-1",
        type: "mc",
        prompt: "Choose: 'In 2015, the number of users ____ 1 million.'",
        options: ["has reached", "reached", "have reached", "reaching"],
        answer: "reached",
        explanation: "Finished past time (2015) → past simple 'reached'.",
        difficulty: 2,
      },
      {
        id: "pp-2",
        type: "fill-blank",
        prompt: "Complete: Since 2010, the city ____ (grow) rapidly.",
        answer: "has grown",
        explanation: "'Since 2010' links to now → present perfect 'has grown'.",
        difficulty: 2,
      },
      {
        id: "pp-3",
        type: "error-id",
        prompt: "Find the error: 'I have finished the report yesterday.'",
        answer: "have finished",
        acceptable: ["have finished yesterday", "yesterday", "have finished"],
        explanation: "'Yesterday' is finished → use past simple 'finished', not present perfect.",
        difficulty: 2,
      },
      {
        id: "pp-4",
        type: "correction",
        prompt: "Correct: 'Researchers discovered a new method recently.' (intended: the method is still new/useful now)",
        answer: "Researchers have discovered a new method recently.",
        acceptable: ["researchers have discovered a new method recently"],
        explanation: "'Recently' with a present result → present perfect 'have discovered'.",
        difficulty: 3,
      },
    ],
    prerequisites: ["tenses-foundation"],
    estimatedMinutes: 12,
    version: 1,
    status: "published",
  },

  {
    id: "compound-complex-sentences",
    slug: "compound-complex-sentences",
    title: "Compound & Complex Sentences",
    level: "B",
    cefrLevel: "B1",
    topic: "Clauses",
    subtopic: "Combining clauses",
    objectives: [
      "Join independent clauses with coordinating conjunctions (and, but, or, so).",
      "Form complex sentences with subordinating conjunctions (although, because, when, if).",
      "Punctuate compound and complex sentences correctly.",
    ],
    explanation:
      "A compound sentence joins two independent clauses with a coordinating conjunction (FANBOYS: for, and, nor, but, or, yet, so) and a comma: 'The plan was costly, so it was cancelled.' A complex sentence has one independent clause and at least one dependent clause introduced by a subordinator (although, because, since, when, if, while, whereas, even though). When the dependent clause comes first, use a comma: 'Although the plan was costly, it was approved.' When it comes second, no comma is usually needed: 'It was approved although it was costly.' Do not join two independent clauses with only a comma (comma splice).",
    bengaliExplanation:
      "Compound sentence-এ দুটি independent clause যুক্ত হয় coordinating conjunction দিয়ে (and, but, so)। Complex sentence-এ subordinating conjunction থাকে (although, because, when)। শুরুতে dependent clause থাকলে comma বসে।",
    pattern: "Compound: IC, cc IC. Complex: DC, IC. / IC DC.",
    examples: [
      { sentence: "The cost was high, but the benefits were clear.", note: "Compound." },
      { sentence: "Although the cost was high, the plan was approved.", note: "Complex; comma after the dependent clause." },
      { sentence: "The plan was approved because the benefits were clear.", note: "Complex; no comma." },
    ],
    incorrectExamples: [
      {
        sentence: "Although the cost was high but the plan was approved.",
        error: "Do not use 'but' after 'although'. One subordinator is enough.",
        correction: "Although the cost was high, the plan was approved.",
      },
      {
        sentence: "The cost was high, the plan was approved.",
        error: "Comma splice: two independent clauses joined only by a comma.",
        correction: "The cost was high, but the plan was approved.",
      },
    ],
    commonMistakes: [
      "Double conjunctions: 'Although... but...', 'Because... so...'.",
      "Comma splices: joining two full sentences with only a comma.",
    ],
    ieltsApplications: [
      { task: "Writing Task 2", note: "Concession ('Although X, Y') is one of the highest-value structures for essays." },
      { task: "Academic Task 1", note: "'While/whereas' for comparing two trends." },
    ],
    exercises: [
      {
        id: "cc-1",
        type: "mc",
        prompt: "Choose the correct sentence:",
        options: [
          "Although it was late, but we continued.",
          "Although it was late, we continued.",
          "Although it was late we continued.",
          "Although it was late but we continued.",
        ],
        answer: "Although it was late, we continued.",
        explanation: "Use only 'although'; do not add 'but'. Comma after the dependent clause.",
        difficulty: 2,
      },
      {
        id: "cc-2",
        type: "error-id",
        prompt: "Find the error: 'The traffic was bad, we arrived on time.'",
        answer: "comma splice",
        acceptable: ["the traffic was bad, we arrived", "comma", "comma splice"],
        explanation: "Two independent clauses joined by only a comma. Fix with a conjunction: 'The traffic was bad, but we arrived on time.'",
        difficulty: 2,
      },
      {
        id: "cc-3",
        type: "combine",
        prompt: "Combine into one complex sentence: 'The policy was unpopular. The government implemented it.' (use: although)",
        answer: "Although the policy was unpopular, the government implemented it.",
        acceptable: ["the government implemented the policy although it was unpopular", "although the policy was unpopular the government implemented it", "the government implemented it although the policy was unpopular"],
        explanation: "Place 'Although' at the start of the dependent clause; use a comma when the dependent clause comes first.",
        difficulty: 2,
      },
      {
        id: "cc-4",
        type: "correction",
        prompt: "Correct: 'Because the data was limited so the conclusion was uncertain.'",
        answer: "Because the data was limited, the conclusion was uncertain.",
        acceptable: ["because the data was limited, the conclusion was uncertain", "the conclusion was uncertain because the data was limited"],
        explanation: "Remove 'so'. Use only one conjunction ('because').",
        difficulty: 2,
      },
    ],
    prerequisites: ["tenses-foundation"],
    estimatedMinutes: 12,
    version: 1,
    status: "published",
  },

  {
    id: "conditionals",
    slug: "conditionals-zero-first-second",
    title: "Conditionals (Zero, First, Second)",
    level: "B",
    cefrLevel: "B1",
    topic: "Conditionals",
    subtopic: "Real and hypothetical conditions",
    objectives: [
      "Form zero, first, and second conditionals.",
      "Choose the conditional that matches the meaning (fact, likely, hypothetical).",
      "Use conditionals in IELTS Task 2 for proposals and hypothetical reasoning.",
    ],
    explanation:
      "Zero conditional (general facts): If + present simple, present simple — 'If water reaches 100°C, it boils.' First conditional (real/likely future): If + present simple, will + verb — 'If the government invests in education, the economy will improve.' Second conditional (hypothetical/unlikely): If + past simple, would + verb — 'If cities had better public transport, fewer people would drive.' Note: in the 'if' clause of the second conditional, use the past simple form (was/were); 'If I were...' is the formal form for all subjects.",
    bengaliExplanation:
      "Zero conditional সাধারণ সত্যের জন্য (If + present, present)। First conditional সম্ভাব্য ভবিষ্যতের জন্য (If + present, will)। Second conditional কাল্পনিক/অসম্ভাব্য ক্ষেত্রে (If + past, would)।",
    pattern: "0: If + present, present. 1: If + present, will + V. 2: If + past, would + V.",
    examples: [
      { sentence: "If prices rise, demand falls.", note: "Zero — general fact." },
      { sentence: "If the council builds more cycle lanes, more people will cycle.", note: "First — likely future." },
      { sentence: "If public transport were cheaper, more people would use it.", note: "Second — hypothetical." },
    ],
    incorrectExamples: [
      {
        sentence: "If it will rain, the match is cancelled.",
        error: "'Will' does not go in the 'if' clause of a first conditional.",
        correction: "If it rains, the match will be cancelled.",
      },
      {
        sentence: "If I would have time, I would help.",
        error: "Second conditional 'if' clause needs the past simple, not 'would'.",
        correction: "If I had time, I would help.",
      },
    ],
    commonMistakes: [
      "Using 'will' in the 'if' clause.",
      "Using 'would' in the 'if' clause.",
      "Mixing first and second patterns ('If it will rain, I would stay').",
    ],
    ieltsApplications: [
      { task: "Writing Task 2", note: "'If governments invested more in renewable energy, emissions would fall.' (Second — policy proposal/hypothetical.)" },
    ],
    exercises: [
      {
        id: "cd-1",
        type: "mc",
        prompt: "Choose: 'If the price ____, demand will fall.'",
        options: ["will rise", "rises", "rose", "would rise"],
        answer: "rises",
        explanation: "First conditional 'if' clause uses the present simple.",
        difficulty: 2,
      },
      {
        id: "cd-2",
        type: "fill-blank",
        prompt: "Complete (second conditional): If public transport ____ cheaper, more people would use it. (use: be)",
        answer: "were",
        acceptable: ["was"],
        explanation: "Second conditional 'if' clause uses the past simple. 'Were' is the formal form; 'was' is acceptable informally.",
        difficulty: 3,
      },
      {
        id: "cd-3",
        type: "error-id",
        prompt: "Find the error: 'If I will have more time, I would learn another language.'",
        answer: "will have",
        acceptable: ["will have", "would learn"],
        explanation: "Second conditional: 'if' clause should be past simple 'had', and main clause 'would + verb'. → 'If I had more time, I would learn another language.'",
        difficulty: 3,
      },
      {
        id: "cd-4",
        type: "transformation",
        prompt: "Rewrite as a second conditional (hypothetical): 'Because the funding is low, progress is slow.'",
        answer: "If the funding were higher, progress would be faster.",
        acceptable: ["if the funding were higher, progress would be faster", "if funding were higher, progress would be faster", "if the funding were higher, progress would be faster"],
        explanation: "Second conditional: If + past simple, would + verb. The meaning shifts to hypothetical.",
        difficulty: 3,
      },
    ],
    prerequisites: ["tenses-foundation"],
    estimatedMinutes: 14,
    version: 1,
    status: "published",
  },

  {
    id: "relative-clauses",
    slug: "relative-clauses",
    title: "Relative Clauses (who, which, that, whose)",
    level: "B",
    cefrLevel: "B1",
    topic: "Clauses",
    subtopic: "Defining and non-defining relative clauses",
    objectives: [
      "Use who/which/that/whose to add information about a noun.",
      "Punctuate defining vs non-defining relative clauses correctly.",
      "Choose the correct relative pronoun.",
    ],
    explanation:
      "A relative clause gives more information about a noun. Use 'who' for people, 'which' for things, 'that' for either (in defining clauses), and 'whose' for possession. A defining relative clause identifies the noun and is not set off by commas ('The students who pass the exam will receive a certificate.'). A non-defining relative clause adds extra information and is set off by commas ('The students, who had studied hard, all passed.'). In non-defining clauses, you cannot use 'that' — use 'who' or 'which'.",
    bengaliExplanation:
      "Defining relative clause noun-কে চিহ্নিত করে, comma লাগে না। Non-defining clause অতিরিক্ত তথ্য দেয়, comma দিয়ে আলাদা করা হয়। Non-defining-এ 'that' বসে না।",
    pattern: "Defining: noun + who/which/that + … (no commas). Non-defining: noun, who/which + …, (commas).",
    examples: [
      { sentence: "The policy that was introduced last year has reduced emissions.", note: "Defining." },
      { sentence: "The new policy, which was introduced last year, has reduced emissions.", note: "Non-defining." },
      { sentence: "Students whose attendance is low may fail.", note: "'whose' for possession." },
    ],
    incorrectExamples: [
      {
        sentence: "The policy, that was introduced last year, reduced emissions.",
        error: "'That' cannot be used in a non-defining clause.",
        correction: "The policy, which was introduced last year, reduced emissions.",
      },
      {
        sentence: "People who lives in cities face congestion.",
        error: "After 'who' the verb must agree with the antecedent ('people' → plural).",
        correction: "People who live in cities face congestion.",
      },
    ],
    commonMistakes: [
      "Using 'that' after a comma in a non-defining clause.",
      "Verb agreement error after 'who'/'which'.",
    ],
    ieltsApplications: [
      { task: "Writing Task 2", note: "'People who live in poverty…' / 'Policies which target education…'" },
      { task: "Academic Task 1", note: "'The figure, which peaked in 2010, then declined.' (Non-defining adds extra detail.)" },
    ],
    exercises: [
      {
        id: "rc-1",
        type: "mc",
        prompt: "Choose the correct option: 'The report ____ was published yesterday is alarming.'",
        options: ["who", "which", "whose", "where"],
        answer: "which",
        explanation: "'Report' is a thing → 'which' (or 'that').",
        difficulty: 1,
      },
      {
        id: "rc-2",
        type: "mc",
        prompt: "Which sentence is correct?",
        options: [
          "The city, that I grew up in, has changed.",
          "The city, which I grew up in, has changed.",
          "The city who I grew up in has changed.",
          "The city which I grew up in, has changed.",
        ],
        answer: "The city, which I grew up in, has changed.",
        explanation: "Non-defining clause → use 'which' (not 'that') and commas.",
        difficulty: 2,
      },
      {
        id: "rc-3",
        type: "error-id",
        prompt: "Find the error: 'People which live in cities face pollution.'",
        answer: "which",
        acceptable: ["which live", "which"],
        explanation: "Use 'who' for people → 'People who live in cities…'.",
        difficulty: 1,
      },
      {
        id: "rc-4",
        type: "fill-blank",
        prompt: "Complete: Students ____ attendance is below 75% may fail the course. (possession)",
        answer: "whose",
        explanation: "'Whose' shows possession (the attendance belongs to the students).",
        difficulty: 2,
      },
    ],
    prerequisites: ["compound-complex-sentences"],
    estimatedMinutes: 12,
    version: 1,
    status: "published",
  },

  {
    id: "active-passive-voice",
    slug: "active-passive-voice",
    title: "Active & Passive Voice",
    level: "B",
    cefrLevel: "B1",
    topic: "Voice",
    subtopic: "When to use the passive",
    objectives: [
      "Form the passive: be + past participle.",
      "Choose the passive when the action matters more than the actor.",
      "Avoid overusing the passive in IELTS Writing.",
    ],
    explanation:
      "In the active voice, the subject performs the action ('Researchers developed the method.'). In the passive, the subject receives the action ('The method was developed by researchers.'). Form: be + past participle (V3). Use the passive when the actor is unknown, obvious, or less important than the action — common in process descriptions and academic reporting ('It is widely believed that…'). Do not overuse the passive: excessive passives make writing weak and unclear. In Task 2, prefer the active voice unless there is a clear reason for the passive.",
    bengaliExplanation:
      "Active voice-এ subject ক্রিয়া করে। Passive voice-এ subject ক্রিয়া গ্রহণ করে (be + V3)। Process বর্ণনা বা যখন actor অজানা/অগুরুত্বপূর্ণ, তখন passive ব্যবহার করুন। অতিরিক্ত passive এড়িয়ে চলুন।",
    pattern: "Passive: S + be + V3 (+ by + agent).",
    examples: [
      { sentence: "The data was collected over six months.", note: "Actor not stated — appropriate passive." },
      { sentence: "It is widely believed that urbanisation will continue.", note: "Passive reporting structure." },
      { sentence: "First, the raw material is collected.", note: "Process description." },
    ],
    incorrectExamples: [
      {
        sentence: "The data was collected by researchers over six months.",
        error: "Not wrong grammatically, but stating the obvious actor adds no value.",
        correction: "The data was collected over six months.",
      },
      {
        sentence: "It is believed by people that education is important.",
        error: "Clumsy and wordy; 'People believe' or 'It is widely believed' is cleaner.",
        correction: "It is widely believed that education is important.",
      },
    ],
    commonMistakes: [
      "Overusing the passive in essays, making claims vague ('Mistakes were made').",
      "Forgetting the 'be' verb ('The method developed' instead of 'was developed').",
    ],
    ieltsApplications: [
      { task: "Academic Task 1", note: "Process descriptions often use the present passive: 'is collected', 'is transported'." },
      { task: "Writing Task 2", note: "Use 'It is argued that…' for academic hedging, but prefer active voice for your own arguments." },
    ],
    exercises: [
      {
        id: "ap-1",
        type: "transformation",
        prompt: "Rewrite in the passive: 'Researchers collected the data over six months.'",
        answer: "The data was collected over six months.",
        acceptable: ["the data was collected over six months", "the data was collected over six months by researchers"],
        explanation: "Object 'the data' becomes subject; 'collected' → 'was collected'.",
        difficulty: 2,
      },
      {
        id: "ap-2",
        type: "mc",
        prompt: "Choose the correct passive form: 'The report ____ by a team of experts.'",
        options: ["wrote", "was written", "is writing", "has wrote"],
        answer: "was written",
        explanation: "Passive: be (was) + past participle (written).",
        difficulty: 1,
      },
      {
        id: "ap-3",
        type: "error-id",
        prompt: "Find the error: 'The new method developed in 2020.'",
        answer: "developed",
        acceptable: ["developed", "the new method developed", "missing was"],
        explanation: "Missing the 'be' verb for the passive. → 'The new method was developed in 2020.'",
        difficulty: 2,
      },
      {
        id: "ap-4",
        type: "mc",
        prompt: "Which is more natural for an academic overview?",
        options: [
          "Mistakes were made by the government.",
          "The government made mistakes.",
          "Mistakes made by the government.",
          "Mistakes being made by the government.",
        ],
        answer: "The government made mistakes.",
        explanation: "When the actor is known and relevant, the active voice is clearer and more direct.",
        difficulty: 3,
      },
    ],
    prerequisites: ["tenses-foundation"],
    estimatedMinutes: 12,
    version: 1,
    status: "published",
  },

  // =====================================================================
  // LEVEL C — IELTS Writing-specific (B2) — Milestone 2
  // =====================================================================
  ...academicTask1Lessons,
  ...gtLetterLessons,
  ...task2Lessons,
];

export const grammarLessonCount = grammarLessons.length;

// Helpers for the UI.
export function getLessonById(id: string): GrammarLesson | undefined {
  return grammarLessons.find((l) => l.id === id);
}

export const grammarLevelLabels: Record<string, string> = {
  A: "Level A — Foundations (A1–A2)",
  B: "Level B — Essential IELTS (B1)",
  C: "Level C — Writing Development (B2)",
  D: "Level D — Advanced Control (C1+)",
};
