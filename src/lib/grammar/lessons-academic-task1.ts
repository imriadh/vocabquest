// Original IELTS Academic Task 1 grammar lessons — Level C / B2.
//
// All explanations, examples, incorrect examples, common mistakes, IELTS
// applications, and exercises are original, hand-authored for this project.
// No content is copied from Cambridge, Oxford, British Council, IELTS
// official materials, or any other third-party source. External references
// (AGENT.md §12) were used only to prioritise topics, not to reproduce text.
//
// These six lessons cover the grammar most needed for Academic Writing
// Task 1 (charts, graphs, tables, process diagrams). Prerequisites point to
// the Level A / Level B foundation lessons defined in `lessons-data.ts`.

import type { GrammarLesson } from "./types";

export const academicTask1Lessons: GrammarLesson[] = [
  // =====================================================================
  // 1. Tense choice for charts
  // =====================================================================
  {
    id: "t1-tense-choice",
    slug: "tense-choice-for-charts",
    title: "Tense Choice for Academic Task 1 Charts",
    level: "C",
    cefrLevel: "B2",
    topic: "Tense",
    subtopic: "Matching tense to time period in data",
    objectives: [
      "Use the past simple for completed historical periods shown on a chart.",
      "Use the present simple to describe what the chart shows and for general facts.",
      "Use future forms ('will', 'is projected to', 'is expected to', 'is forecast to') for projection charts.",
    ],
    explanation:
      "In Academic Task 1 the tense depends on whether the data is past, present, or future. Use the past simple for completed chart years ('In 2010, sales stood at 12,000.'). Use the present simple to describe what the chart currently shows ('The chart illustrates...', 'The table shows that men outnumber women.'). Use future forms for projections: 'will', 'is projected to', 'is expected to', 'is forecast to', 'is predicted to' ('By 2030, the population will reach 9 million.' / 'Sales are projected to double by 2025.'). Use the present perfect only when the chart's timeline reaches the present ('Since 2010, the figure has risen steadily.'). The most common error is mixing tenses inside a single time frame.",
    bengaliExplanation:
      "Academic Task 1-এ tense নির্ভর করে তথ্য অতীত, বর্তমান না ভবিষ্যতের উপর। সম্পন্ন অতীত বছরের জন্য past simple, চার্ট যা প্রদর্শন করছে তার জন্য present simple, এবং ভবিষ্যৎ পূর্বাভাসের জন্য will / is projected to / is expected to ব্যবহার করুন। চার্টের সময় বর্তমান পর্যন্ত প্রসারিত হলে present perfect বসে।",
    pattern:
      "Past data -> past simple; chart description -> present simple; future projection -> will / is projected to + V; data up to now -> present perfect.",
    examples: [
      {
        sentence: "The chart illustrates the changes in energy consumption between 2000 and 2020.",
        note: "Present simple for what the chart currently shows.",
      },
      {
        sentence: "In 2005, the number of users stood at 1.2 million.",
        note: "Past simple for a finished past year; 'stood at' for a fixed value.",
      },
      {
        sentence: "By 2030, renewable energy is projected to account for 40% of total supply.",
        note: "Future projection with 'is projected to + verb'.",
      },
      {
        sentence: "Since 2010, the percentage has risen by almost ten points.",
        note: "Present perfect with a period that links to the present.",
      },
    ],
    incorrectExamples: [
      {
        sentence: "In 2015, the population reaches 3 million.",
        error: "2015 is a finished past year, so the past simple is required, not the present simple.",
        correction: "In 2015, the population reached 3 million.",
      },
      {
        sentence: "By 2030, the figure reached 50%.",
        error: "'By 2030' marks a future deadline; a past tense cannot describe a future projection.",
        correction: "By 2030, the figure will reach 50%.",
      },
    ],
    commonMistakes: [
      "Using the present simple for finished past years ('In 2018 the figure is 50%' -> 'was 50%').",
      "Using the past simple for future projection charts ('By 2030 the figure reached 50%' -> 'will reach 50%').",
      "Switching tenses mid-sentence for the same time frame ('In 2010 sales rose and reaches 50%' -> keep past simple).",
    ],
    ieltsApplications: [
      {
        task: "Academic Task 1",
        note: "Match tense to time period: past simple for finished chart years, present simple for what the chart shows, future forms for projection charts.",
      },
      {
        task: "Academic Task 1",
        note: "Line and bar charts with future years (e.g. 2025-2040) require 'is projected to' or 'is expected to' rather than the past simple.",
      },
    ],
    exercises: [
      {
        id: "t1tc-1",
        type: "mc",
        prompt: "Choose the correct verb: 'In 2010, the figure ____ at 25%.'",
        options: ["stands", "stood", "will stand", "is standing"],
        answer: "stood",
        explanation: "2010 is a finished past year, so the past simple 'stood' is required.",
        difficulty: 1,
      },
      {
        id: "t1tc-2",
        type: "mc",
        prompt: "Choose the correct verb: 'The chart ____ the percentage of households using solar energy.'",
        options: ["showed", "shows", "will show", "has shown"],
        answer: "shows",
        explanation: "Describing what the chart currently shows takes the present simple 'shows'.",
        difficulty: 1,
      },
      {
        id: "t1tc-3",
        type: "fill-blank",
        prompt:
          "Complete: By 2040, the population is ____ to reach 9 billion. (use the past participle of: project)",
        answer: "projected",
        explanation: "Future projection structure: 'is projected to + verb'.",
        difficulty: 2,
      },
      {
        id: "t1tc-4",
        type: "error-id",
        prompt:
          "Find the tense error: 'Since 2015, the number of tourists increased steadily.'",
        answer: "increased",
        acceptable: ["increased", "increased steadily", "has increased"],
        explanation:
          "'Since 2015' links the period to the present, so the present perfect 'has increased' is needed, not the past simple.",
        difficulty: 3,
      },
    ],
    prerequisites: ["tenses-foundation", "present-perfect-vs-past-simple"],
    estimatedMinutes: 12,
    version: 1,
    status: "published",
  },

  // =====================================================================
  // 2. Comparatives, superlatives & proportional comparisons for data
  // =====================================================================
  {
    id: "t1-data-comparisons",
    slug: "data-comparisons-and-proportions",
    title: "Comparatives, Superlatives & Proportional Comparisons for Data",
    level: "C",
    cefrLevel: "B2",
    topic: "Comparisons",
    subtopic: "Ranking and proportionally comparing chart values",
    objectives: [
      "Form comparatives and superlatives to rank chart data.",
      "Use proportional comparisons: 'twice as many as', 'three times more than', 'a fraction of'.",
      "Express majority and minority proportions accurately.",
    ],
    explanation:
      "Task 1 constantly compares values. Use comparatives (higher, lower, more popular) with 'than' to compare two items ('Car ownership was higher than bike ownership.'). Use superlatives with 'the' (the highest, the most common, the lowest) to single out the extreme value ('The UK had the highest figure.'). For proportional comparison use structures such as 'twice as many...as', 'three times as much...as', 'three times more than', 'half of', 'a quarter of', 'a fraction of'. Note that 'as many as' is for countable nouns and 'as much as' is for uncountables. For shares, use 'the majority of' (more than 50%) and 'a minority of' (less than 50%). Avoid double comparatives ('more higher') and double superlatives ('most largest').",
    bengaliExplanation:
      "Task 1-এ তথ্য তুলনা করতে comparatives (higher, lower) এবং superlatives (the highest, the lowest) ব্যবহার করুন। অনুপাত তুলনায় 'twice as many as', 'three times more than', 'half of', 'a quarter of' ব্যবহার করুন। গণনযোগ্য noun-এর জন্য 'as many as', গণনাযোগ্য না হলে 'as much as' বসে।",
    pattern:
      "Comparative + than; the + superlative; X times as many/much...as; the majority/minority of + noun.",
    examples: [
      {
        sentence: "Sales of electric cars were higher than sales of diesel cars in 2020.",
        note: "Comparative 'higher' + 'than'.",
      },
      {
        sentence: "Germany had the highest recycling rate among the countries shown.",
        note: "Superlative with 'the'; 'among' for the comparison group.",
      },
      {
        sentence: "Twice as many tourists visited the museum as the gallery.",
        note: "Proportional comparison 'twice as many + plural + as'.",
      },
      {
        sentence: "The majority of respondents preferred online learning.",
        note: "'The majority of' for more than 50% of a group.",
      },
    ],
    incorrectExamples: [
      {
        sentence: "Sales were more higher than in the previous year.",
        error: "Double comparative: 'more' is added to an already comparative form.",
        correction: "Sales were higher than in the previous year.",
      },
      {
        sentence: "China had most largest population on the chart.",
        error: "Double superlative 'most largest'; superlatives also need 'the'.",
        correction: "China had the largest population on the chart.",
      },
    ],
    commonMistakes: [
      "Double comparatives ('more higher') and double superlatives ('most largest').",
      "Forgetting 'the' before a superlative ('China had largest population').",
      "Mixing 'as many as' with uncountable nouns ('twice as much water', not 'twice as many water').",
    ],
    ieltsApplications: [
      {
        task: "Academic Task 1",
        note: "'Country A had the highest figure, while Country B had the lowest' is a standard comparative sentence for bar charts.",
      },
      {
        task: "Academic Task 1",
        note: "'Twice as many...as' and 'three times as much...as' are high-value structures for bar charts and tables.",
      },
    ],
    exercises: [
      {
        id: "t1dc-1",
        type: "mc",
        prompt: "Choose: 'In 2020, the figure was ____ than in 2010.'",
        options: ["more high", "higher", "highest", "the higher"],
        answer: "higher",
        explanation: "Comparative of 'high' is 'higher', followed by 'than'. Do not add 'more'.",
        difficulty: 1,
      },
      {
        id: "t1dc-2",
        type: "fill-blank",
        prompt:
          "Complete: France had ____ highest recycling rate among the countries shown. (use: the)",
        answer: "the",
        explanation: "Superlatives take 'the' before them.",
        difficulty: 1,
      },
      {
        id: "t1dc-3",
        type: "error-id",
        prompt:
          "Find the error: 'Twice as many water was consumed in 2020 than in 2010.'",
        answer: "as many water",
        acceptable: ["as many water", "many water", "than"],
        explanation:
          "'Water' is uncountable, so use 'as much water'; the structure is 'as...as', not 'as...than'.",
        difficulty: 3,
      },
      {
        id: "t1dc-4",
        type: "transformation",
        prompt:
          "Rewrite using 'three times as many...as': 'The number of cars in 2020 was 3,000; in 2010 it was 1,000.'",
        answer: "There were three times as many cars in 2020 as in 2010.",
        acceptable: [
          "there were three times as many cars in 2020 as in 2010",
          "in 2020 there were three times as many cars as in 2010",
          "there were three times as many cars in 2020 as in 2010",
        ],
        explanation:
          "Use 'three times as many + plural countable + as' for proportional comparison of countable items.",
        difficulty: 3,
      },
    ],
    prerequisites: ["comparatives-superlatives"],
    estimatedMinutes: 12,
    version: 1,
    status: "published",
  },

  // =====================================================================
  // 3. Quantifiers & proportions for statistics
  // =====================================================================
  {
    id: "t1-quantifiers-data",
    slug: "quantifiers-and-proportions-for-statistics",
    title: "Quantifiers & Proportions for Statistics",
    level: "C",
    cefrLevel: "B2",
    topic: "Nouns",
    subtopic: "Approximate values and proportional quantities",
    objectives: [
      "Use proportion phrases: 'a large/small proportion of', 'a majority/minority of', 'a significant portion of'.",
      "Use approximation phrases: 'approximately', 'roughly', 'just over/under', 'around', 'nearly'.",
      "Maintain subject-verb agreement with proportion and percentage phrases.",
    ],
    explanation:
      "Task 1 often requires describing approximate values and shares. For approximation use 'approximately', 'roughly', 'around', 'about', 'nearly', 'almost' ('approximately 25%'). Use 'just over' and 'just under' for values close to a round figure ('just under 50%'). For shares use 'a large proportion of', 'a small proportion of', 'a significant portion of', 'the majority of' (more than 50%), 'a minority of' (less than 50%). Subject-verb agreement follows the noun after 'of': 'A large proportion of students were absent' (plural noun) but 'A large proportion of the land was farmed' (uncountable, singular). With a number use 'percent' or the '%' sign, never 'percentages'. Use 'a large amount of' with uncountables and 'a large number of' with plural countables.",
    bengaliExplanation:
      "Task 1-এ প্রায় মান বোঝাতে approximately, roughly, around, nearly, just over/under ব্যবহার করুন। অংশ বোঝাতে a large proportion of, a majority of, a minority of, a significant portion of ব্যবহার করুন। Subject-verb agreement 'of'-এর পরের noun অনুসারে হয়। সংখ্যার সাথে 'percent' বা '%' বসে, 'percentages' নয়।",
    pattern:
      "approximately/roughly/just over + number; a large/small proportion of + noun (verb agrees with the noun after 'of').",
    examples: [
      {
        sentence: "Approximately 60% of the respondents were satisfied with the service.",
        note: "Approximation + plural noun -> plural verb 'were'.",
      },
      {
        sentence: "Just under a third of the energy came from renewable sources.",
        note: "'Just under' + fraction; 'energy' is uncountable -> singular 'came'.",
      },
      {
        sentence: "A significant portion of the budget was spent on marketing.",
        note: "'A significant portion of' + uncountable 'budget' -> singular verb.",
      },
      {
        sentence: "The majority of households owned at least one car.",
        note: "'The majority of' + plural noun -> plural verb 'owned'.",
      },
    ],
    incorrectExamples: [
      {
        sentence: "A large proportion of the land were used for farming.",
        error: "'Land' is uncountable, so the verb must be singular.",
        correction: "A large proportion of the land was used for farming.",
      },
      {
        sentence: "Approximately 25 percentages of users was active.",
        error: "With a number use 'percent', and after 'users' (plural) the verb is plural.",
        correction: "Approximately 25 percent of users were active.",
      },
    ],
    commonMistakes: [
      "Writing 'percentages' instead of 'percent' after a number ('25 percentages' -> '25 percent').",
      "Wrong subject-verb agreement after 'proportion of' / 'majority of' (match the noun after 'of').",
      "Using 'amount' with countables ('a large amount of students' -> 'a large number of students').",
    ],
    ieltsApplications: [
      {
        task: "Academic Task 1",
        note: "'Approximately / roughly / just over' lets you paraphrase exact chart values without quoting every digit.",
      },
      {
        task: "Academic Task 1",
        note: "'The majority of' / 'a significant portion of' is essential for pie-chart and table descriptions.",
      },
    ],
    exercises: [
      {
        id: "t1qd-1",
        type: "mc",
        prompt:
          "Choose: 'A large proportion of the respondents ____ satisfied with the service.'",
        options: ["was", "were", "is", "be"],
        answer: "were",
        explanation:
          "'Respondents' is plural, so the verb is plural ('were'), even after 'a large proportion of'.",
        difficulty: 2,
      },
      {
        id: "t1qd-2",
        type: "fill-blank",
        prompt:
          "Complete: Just ____ half of the visitors came from abroad. (use: under / over -- pick the right one for a value slightly below 50%)",
        answer: "under",
        explanation:
          "'Just under half' means slightly less than 50%; 'just over half' means slightly more than 50%.",
        difficulty: 2,
      },
      {
        id: "t1qd-3",
        type: "error-id",
        prompt:
          "Find the error: 'Approximately 30 percentages of the budget was spent on salaries.'",
        answer: "percentages",
        acceptable: ["percentages", "30 percentages", "percentage"],
        explanation:
          "With a number, use 'percent' (or the '%' sign), not 'percentages'.",
        difficulty: 2,
      },
      {
        id: "t1qd-4",
        type: "correction",
        prompt: "Correct: 'A significant portion of the data were missing.'",
        answer: "A significant portion of the data was missing.",
        acceptable: ["a significant portion of the data was missing"],
        explanation:
          "In modern academic usage 'data' is treated as singular, and 'portion' is also singular, so the verb is 'was missing'.",
        difficulty: 3,
      },
    ],
    prerequisites: ["countable-uncountable-quantifiers", "subject-verb-agreement"],
    estimatedMinutes: 12,
    version: 1,
    status: "published",
  },

  // =====================================================================
  // 4. Passive voice for process descriptions
  // =====================================================================
  {
    id: "t1-process-passive",
    slug: "passive-voice-for-process-diagrams",
    title: "Passive Voice for Process Descriptions",
    level: "C",
    cefrLevel: "B2",
    topic: "Voice",
    subtopic: "Describing process diagrams with the present passive",
    objectives: [
      "Use the present passive ('is collected', 'is transported') for process diagrams.",
      "Use sequencing words: first, then, next, after that, subsequently, finally.",
      "Avoid forcing the passive everywhere; the active voice is acceptable when an actor is natural.",
    ],
    explanation:
      "Process diagrams in Task 1 (e.g. how chocolate is made, how electricity is generated) usually describe a general, repeatable process, so the present passive is the natural choice: 'First, the beans are harvested. They are then transported to the factory. Next, they are roasted...'. Use sequencing adverbs to order the steps: first, then, next, after that, subsequently, finally, lastly. Note that 'then' and 'next' usually sit after the subject or auxiliary: 'The beans are then roasted.'. Do not force the passive everywhere; if an actor is natural (e.g. 'Workers sort the beans.'), the active voice is fine and often clearer. Keep the tense consistent: if the process is general, stay in the present passive throughout. Do not switch to the past simple for a diagram that shows a present, repeatable process.",
    bengaliExplanation:
      "Process diagram সাধারণত বর্তমান passive voice-এ বর্ণনা করা হয়: 'is collected', 'is transported'। ধাপ সাজাতে first, then, next, after that, subsequently, finally ব্যবহার করুন। সব জায়গায় passive বাধ্যতামূলক নয় -- প্রয়োজনে active ব্যবহার করুন। সাধারণ process-এ tense সার্বজনীনভাবে present passive রাখুন।",
    pattern: "Sequencer + subject + (is/are) + V3 (+ by + agent, optional).",
    examples: [
      {
        sentence: "First, the raw material is collected from local farms.",
        note: "Present passive + 'first' to open the sequence.",
      },
      {
        sentence: "The material is then transported to the processing plant.",
        note: "'Then' sits between the auxiliary 'is' and the past participle 'transported'.",
      },
      {
        sentence: "Next, it is cleaned and sorted by hand.",
        note: "'Next' for the following step; passive with two past participles.",
      },
      {
        sentence: "Finally, the finished product is packaged and shipped to retailers.",
        note: "'Finally' marks the last step; passive for both verbs.",
      },
    ],
    incorrectExamples: [
      {
        sentence: "First, the raw material collected from local farms.",
        error: "Missing the 'be' auxiliary that the passive voice requires.",
        correction: "First, the raw material is collected from local farms.",
      },
      {
        sentence: "Then it is transport to the factory.",
        error: "The passive needs the past participle 'transported', not the bare verb.",
        correction: "Then it is transported to the factory.",
      },
    ],
    commonMistakes: [
      "Forgetting the 'be' auxiliary in the passive ('the beans collected' -> 'are collected').",
      "Using the past simple for a general process diagram ('the beans were collected' -> 'are collected').",
      "Mixing sequencing adverbs awkwardly ('Then next, the beans...' -- choose one).",
    ],
    ieltsApplications: [
      {
        task: "Academic Task 1",
        note: "Process diagrams almost always use the present passive ('is cleaned', 'is packed') with sequencing adverbs.",
      },
      {
        task: "Academic Task 1",
        note: "Vary your sequencers ('first', 'then', 'next', 'subsequently', 'finally') to avoid repetition.",
      },
    ],
    exercises: [
      {
        id: "t1pp-1",
        type: "mc",
        prompt: "Choose: 'First, the seeds ____ into the soil.'",
        options: ["plant", "are planted", "planted", "were planting"],
        answer: "are planted",
        explanation: "A general process step uses the present passive 'are planted'.",
        difficulty: 1,
      },
      {
        id: "t1pp-2",
        type: "fill-blank",
        prompt:
          "Complete: The mixture ____ then heated to 200 degrees Celsius. (use the present form of: be)",
        answer: "is",
        explanation:
          "Present passive of 'heat' is 'is heated'; 'then' sits between the auxiliary and the past participle.",
        difficulty: 2,
      },
      {
        id: "t1pp-3",
        type: "error-id",
        prompt: "Find the error: 'Next, the liquid cooled and bottled.'",
        answer: "cooled",
        acceptable: ["cooled", "cooled and bottled", "is cooled"],
        explanation:
          "Missing the 'be' auxiliary for the present passive. -> 'Next, the liquid is cooled and bottled.'",
        difficulty: 2,
      },
      {
        id: "t1pp-4",
        type: "combine",
        prompt:
          "Combine into one sequenced sentence using 'after': 'The beans are roasted. They are ground into powder.'",
        answer: "After the beans are roasted, they are ground into powder.",
        acceptable: [
          "after the beans are roasted, they are ground into powder",
          "after being roasted, the beans are ground into powder",
          "the beans are ground into powder after they are roasted",
        ],
        explanation:
          "'After' introduces the earlier step; keep the present passive consistent in both clauses.",
        difficulty: 3,
      },
    ],
    prerequisites: ["active-passive-voice"],
    estimatedMinutes: 13,
    version: 1,
    status: "published",
  },

  // =====================================================================
  // 5. Prepositions for dates, time periods, values & comparisons
  // =====================================================================
  {
    id: "t1-prepositions-data",
    slug: "prepositions-for-dates-values-comparisons",
    title: "Prepositions for Dates, Periods, Values & Comparisons",
    level: "C",
    cefrLevel: "B2",
    topic: "Cohesion",
    subtopic: "Prepositions of time, value, and comparison in data",
    objectives: [
      "Use 'in' for years/months, 'from...to' and 'between...and' for ranges, and 'by' for deadlines.",
      "Use 'at', 'of', and 'with' for values: 'at 25%', 'a rise of 25%', 'with 25%'.",
      "Use 'compared to/with' and 'in comparison with' for comparisons.",
    ],
    explanation:
      "Prepositions in Task 1 carry precise meanings. Time: 'in 2010' (year/month), 'in May', 'from 2010 to 2020' (range), 'between 2010 and 2020' (range), 'by 2020' (deadline -- the value reached at or before that point), 'since 2010' (up to now). Values: 'at 25%' (a specific point value), 'of 25%' (a quantity belonging to something -- 'a rise of 25%'), 'with 25%' (the entity has that value -- 'Country A, with 25%, led the table'). Comparisons: 'compared to/with', 'in comparison with', 'as opposed to'. Common errors include 'in 2010 to 2020' (use 'from...to'), 'between 2010 to 2020' (use 'between...and'), and 'a rise at 25%' (use 'a rise of 25%'). Note that 'by 2030' (deadline) differs from 'in 2030' (the year something happens).",
    bengaliExplanation:
      "Task 1-এ preposition-এর সুনির্দিষ্ট অর্থ আছে। সাল/মাসের জন্য 'in', সীমার জন্য 'from...to' বা 'between...and', নির্দিষ্ট সময়সীমার জন্য 'by', মানের জন্য 'at/of/with' ব্যবহার করুন। তুলনার জন্য 'compared to/with' বা 'in comparison with' ব্যবহার করুন। 'by 2030' (সময়সীমা) এবং 'in 2030' (নির্দিষ্ট বছর) ভিন্ন অর্থ বোঝায়।",
    pattern:
      "in + year/month; from X to Y; between X and Y; by + deadline; at + value; of + quantity; with + value; compared to/with + noun.",
    examples: [
      {
        sentence: "In 2010, the figure stood at 25%.",
        note: "'in' + year; 'at' + a specific point value.",
      },
      {
        sentence: "Sales rose from 1,000 in 2010 to 3,000 in 2020.",
        note: "'from...to' marks the start and end of a range.",
      },
      {
        sentence: "Between 2010 and 2020, the population grew steadily.",
        note: "'between...and' for a range of years.",
      },
      {
        sentence: "Country A had the highest figure, with 35%, compared to 20% for Country B.",
        note: "'with' + value; 'compared to' + the comparison point.",
      },
    ],
    incorrectExamples: [
      {
        sentence: "Sales increased in 2010 to 2020.",
        error: "For a range use 'from...to', not 'in...to'.",
        correction: "Sales increased from 2010 to 2020.",
      },
      {
        sentence: "There was a rise at 25% in 2020.",
        error: "After a quantity noun ('rise') use 'of', not 'at'.",
        correction: "There was a rise of 25% in 2020.",
      },
    ],
    commonMistakes: [
      "Using 'in...to' instead of 'from...to' for ranges.",
      "Using 'at' instead of 'of' after a quantity noun ('a rise at 25%' -> 'a rise of 25%').",
      "Confusing 'by' (deadline) with 'in' (point in time): 'will reach 50% in 2030' vs 'will reach 50% by 2030'.",
    ],
    ieltsApplications: [
      {
        task: "Academic Task 1",
        note: "'From X to Y' and 'between X and Y' are essential for describing time ranges on charts.",
      },
      {
        task: "Academic Task 1",
        note: "'At 25%' (point value) vs 'a rise of 25%' (quantity) vs 'with 25%' (entity's value) are frequently confused -- choose carefully.",
      },
    ],
    exercises: [
      {
        id: "t1pd-1",
        type: "mc",
        prompt:
          "Choose: '____ 2020, the figure will reach 50%.' (meaning: no later than 2020)",
        options: ["In", "At", "By", "On"],
        answer: "By",
        explanation:
          "'By' marks a deadline -- the value is reached at or before that point.",
        difficulty: 2,
      },
      {
        id: "t1pd-2",
        type: "fill-blank",
        prompt:
          "Complete: Sales rose ____ 1,000 units in 2010 to 3,000 in 2020. (use: from)",
        answer: "from",
        explanation: "Use 'from X to Y' to mark the start and end of a range.",
        difficulty: 1,
      },
      {
        id: "t1pd-3",
        type: "error-id",
        prompt:
          "Find the preposition error: 'There was an increase at 15% in 2020.'",
        answer: "at",
        acceptable: ["at", "increase at", "at 15%"],
        explanation:
          "After a quantity noun ('increase'), use 'of', not 'at'. -> 'an increase of 15%'.",
        difficulty: 2,
      },
      {
        id: "t1pd-4",
        type: "correction",
        prompt: "Correct: 'Between 2010 to 2020, sales doubled.'",
        answer: "Between 2010 and 2020, sales doubled.",
        acceptable: [
          "between 2010 and 2020, sales doubled",
          "from 2010 to 2020, sales doubled",
        ],
        explanation: "'Between' pairs with 'and'; 'from' pairs with 'to'.",
        difficulty: 2,
      },
    ],
    prerequisites: ["tenses-foundation"],
    estimatedMinutes: 11,
    version: 1,
    status: "published",
  },

  // =====================================================================
  // 6. Overview statements & complex sentences for trends
  // =====================================================================
  {
    id: "t1-overview-sentences",
    slug: "overview-statements-and-complex-sentences",
    title: "Overview Statements & Complex Sentences for Trends",
    level: "C",
    cefrLevel: "B2",
    topic: "Clauses",
    subtopic: "Overview sentences, contrast clauses, and agreement with 'proportion/percentage/number of'",
    objectives: [
      "Write an overview sentence starting with 'Overall,...' or 'The most striking feature is...'.",
      "Use 'while' and 'whereas' to contrast two trends in one sentence.",
      "Maintain subject-verb agreement with 'the proportion/percentage/number of...'.",
    ],
    explanation:
      "An Academic Task 1 answer needs a clear overview paragraph that summarises the main trends. Open with a signpost: 'Overall,...', 'In general,...', 'It is clear that...', or 'The most striking feature is...'. Use 'while' or 'whereas' to contrast two trends in one sentence ('Sales rose, while costs fell.'). A comma normally comes before 'while/whereas' when they join two independent clauses. Use relative clauses to add detail concisely ('The UK, which had the highest figure, dominated the market.'). Subject-verb agreement is critical: 'The proportion of X was...' (proportion is singular), 'The percentage of X was...' (singular), 'The number of X was...' (singular) -- even when X is plural. Keep overview sentences focused on the main trend and do not overload a single sentence with too many clauses.",
    bengaliExplanation:
      "Academic Task 1 উত্তরে একটি overview paragraph প্রয়োজন যা মূল ধারা সংক্ষেপ করে। 'Overall,...' বা 'The most striking feature is...' দিয়ে শুরু করুন। দুটি ধারা তুলনায় 'while/whereas' ব্যবহার করুন। 'The proportion/percentage/number of' সবসময় singular verb নেয়, এমনকি পরের noun plural হলেও।",
    pattern:
      "Overall, + main trend + (while/whereas + contrast). The proportion/percentage/number of X + singular verb.",
    examples: [
      {
        sentence: "Overall, the proportion of energy from renewable sources increased over the period.",
        note: "'Overall' signpost + singular verb with 'proportion'.",
      },
      {
        sentence: "The most striking feature is the sharp rise in online sales after 2015.",
        note: "'The most striking feature is...' + noun phrase complement.",
      },
      {
        sentence: "Car ownership rose, while the use of public transport fell.",
        note: "'While' contrasts two trends; comma before 'while'.",
      },
      {
        sentence: "The UK, which had the highest figure, was the largest contributor.",
        note: "Non-defining relative clause for concise extra detail.",
      },
    ],
    incorrectExamples: [
      {
        sentence: "Overall, the proportion of cars were higher in 2020.",
        error: "'The proportion' is singular, so the verb must be 'was', not 'were'.",
        correction: "Overall, the proportion of cars was higher in 2020.",
      },
      {
        sentence: "The number of tourists have increased, while the number of business travellers decreased.",
        error: "'The number' is singular, so the verb should be 'has increased'.",
        correction:
          "The number of tourists has increased, while the number of business travellers has decreased.",
      },
    ],
    commonMistakes: [
      "Plural verb after 'the proportion/percentage/number of X' (it is always singular).",
      "Missing the comma before 'while/whereas' joining two independent clauses.",
      "Using 'although' where 'while/whereas' is needed for a neutral contrast of data.",
    ],
    ieltsApplications: [
      {
        task: "Academic Task 1",
        note: "An overview paragraph beginning with 'Overall,...' is required for bands 6 and above in Task Achievement.",
      },
      {
        task: "Academic Task 1",
        note: "'While/whereas' is the standard connector for contrasting two trends in a single sentence.",
      },
    ],
    exercises: [
      {
        id: "t1os-1",
        type: "mc",
        prompt:
          "Choose: 'Overall, the number of tourists ____ increased over the period.'",
        options: ["have", "has", "are", "were"],
        answer: "has",
        explanation: "'The number' is singular, so the verb is 'has increased'.",
        difficulty: 2,
      },
      {
        id: "t1os-2",
        type: "fill-blank",
        prompt:
          "Complete: Sales rose, ____ costs fell. (use a contrast connector: while / whereas)",
        answer: "while",
        acceptable: ["while", "whereas"],
        explanation:
          "'While' and 'whereas' both contrast two trends; either is acceptable here.",
        difficulty: 1,
      },
      {
        id: "t1os-3",
        type: "error-id",
        prompt:
          "Find the error: 'The percentage of people using public transport have fallen.'",
        answer: "have",
        acceptable: ["have fallen", "have", "have fallen"],
        explanation: "'The percentage' is singular, so the verb should be 'has fallen'.",
        difficulty: 2,
      },
      {
        id: "t1os-4",
        type: "combine",
        prompt:
          "Combine into one sentence using 'while': 'The exports of Country A rose. The exports of Country B fell.'",
        answer:
          "The exports of Country A rose, while the exports of Country B fell.",
        acceptable: [
          "the exports of country a rose, while the exports of country b fell",
          "while the exports of country a rose, the exports of country b fell",
          "the exports of country a rose while the exports of country b fell",
        ],
        explanation:
          "Use 'while' to contrast two trends; a comma before 'while' is standard when joining two independent clauses.",
        difficulty: 2,
      },
    ],
    prerequisites: ["compound-complex-sentences", "relative-clauses"],
    estimatedMinutes: 12,
    version: 1,
    status: "published",
  },
];

export const academicTask1LessonCount = academicTask1Lessons.length;
