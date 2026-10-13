import type { ReadingPassage } from "./types";

// Original IELTS-style reading passages — Stages 1 & 2.
// No content copied from IELTS official papers or any third-party source.
// All passages, questions, options, explanations, and evidence quotes are
// hand-written for this project.
export const stage12Passages: ReadingPassage[] = [
  // -------------------------------------------------------------------
  // Stage 1 / Passage 1 — Environment (beginner, ~190 words, 3 questions)
  // -------------------------------------------------------------------
  {
    id: "r-s1-env",
    slug: "recycling-at-home-small-habits-big-impact",
    title: "Recycling at Home: Small Habits, Big Impact",
    stage: 1,
    difficulty: "beginner",
    topic: "Environment",
    estimatedReadingMinutes: 2,
    passage:
      "Recycling is one of the simplest ways that ordinary households can reduce their impact on the environment. When we place paper, glass, and certain plastics into the recycling bin instead of the rubbish bin, these materials are sent to a facility where they are sorted, cleaned, and turned into new products. This process uses far less energy than making the same items from raw materials.\n\n" +
      "Many towns now offer a kerbside collection service, which means a truck picks up recyclables from outside homes every week. Residents are usually asked to rinse out food containers before putting them in the bin, because leftover food can contaminate an entire load. Paper and cardboard should be kept dry, while glass bottles should have their lids removed.\n\n" +
      "Not everything can go in the recycling bin. Soft plastics, used batteries, and broken electronics need to be taken to special drop-off points. Some communities also run composting programmes for food scraps and garden waste. By learning the local rules and following a few simple habits, every family can help cut down the amount of waste that ends up in landfill.",
    intro:
      "This short passage explains how households can recycle effectively. Read it once to get the main idea, then read each question and scan back to find the exact sentence that answers it. The sentence you find is your evidence — every answer in Stage 1 comes from the text, not from outside knowledge.",
    skillFocus: "Identifying the main idea and finding key information in a short text",
    questions: [
      {
        id: "r-s1env-q1",
        type: "mc",
        prompt: "What is the main idea of the passage?",
        options: [
          "Recycling is too complicated for most households.",
          "Recycling is a simple way for households to reduce their impact on the environment.",
          "Only glass and paper can be recycled.",
          "Towns should provide more drop-off points for electronics."
        ],
        answer:
          "Recycling is a simple way for households to reduce their impact on the environment.",
        explanation:
          "The opening sentence states the writer\'s main point directly: recycling is a simple way for ordinary households to reduce their environmental impact. The other options are either not stated in the passage, or are minor details rather than the main idea.",
        evidence:
          "Recycling is one of the simplest ways that ordinary households can reduce their impact on the environment.",
        paragraphRef: "Paragraph 1"
      },
      {
        id: "r-s1env-q2",
        type: "mc",
        prompt:
          "According to the passage, why should residents rinse out food containers before recycling them?",
        options: [
          "To make the containers easier to stack in the bin.",
          "Because leftover food can contaminate an entire load.",
          "Because the collection truck will refuse to pick up dirty items.",
          "Because rinsing containers helps to save water."
        ],
        answer: "Because leftover food can contaminate an entire load.",
        explanation:
          "The passage explains the reason directly: leftover food can contaminate an entire load of recycling. The other options are not mentioned anywhere in the passage.",
        evidence:
          "Residents are usually asked to rinse out food containers before putting them in the bin, because leftover food can contaminate an entire load.",
        paragraphRef: "Paragraph 2"
      },
      {
        id: "r-s1env-q3",
        type: "short-answer",
        prompt: "What should be removed from glass bottles before they are recycled?",
        answer: "lids",
        acceptable: ["the lids", "their lids", "lids removed", "the lids of the bottles"],
        explanation:
          "The passage states that glass bottles should have their lids removed before recycling.",
        evidence: "glass bottles should have their lids removed.",
        paragraphRef: "Paragraph 2"
      }
    ],
    relatedVocabIds: ["recycle", "pollution", "sustainability"],
    relatedGrammarLessonIds: ["active-passive-voice"],
    estimatedMinutes: 5,
    version: 1,
    status: "published"
  },

  // -------------------------------------------------------------------
  // Stage 1 / Passage 2 — Technology (beginner, ~185 words, 3 questions)
  // -------------------------------------------------------------------
  {
    id: "r-s1-tech",
    slug: "the-smart-thermostat",
    title: "The Smart Thermostat: A Small Device That Cuts Energy Bills",
    stage: 1,
    difficulty: "beginner",
    topic: "Technology",
    estimatedReadingMinutes: 2,
    passage:
      "A smart thermostat is a small electronic device that learns a household\'s daily routine and adjusts the heating and cooling automatically. Unlike an ordinary thermostat, which only turns the system on or off at a fixed temperature, a smart model uses sensors and software to figure out when people are at home, when they are asleep, and when the house is empty.\n\n" +
      "Most smart thermostats connect to the home\'s Wi-Fi, so the owner can change settings from a phone app while they are out. Some models even check the local weather forecast and switch off the heating on a warm afternoon before anyone has to ask. Over a full year, families report saving between ten and twenty per cent on their energy bills.\n\n" +
      "There are some downsides, however. The devices can be expensive to buy, and they need a steady internet connection to work at their best. Older heating systems may also need extra wiring before a smart thermostat can be fitted. Still, for many homes, the savings quickly pay for the device.",
    intro:
      "This passage introduces a small piece of technology and explains what it does. Read it once for the general idea, then return to the text to find each answer. In Stage 1, you are practising the basic skill of finding information stated directly in the passage.",
    skillFocus: "Identifying the main idea and finding key information in a short text",
    questions: [
      {
        id: "r-s1tech-q1",
        type: "mc",
        prompt:
          "According to the passage, what is the main difference between a smart thermostat and an ordinary one?",
        options: [
          "A smart thermostat is much cheaper to buy than an ordinary one.",
          "An ordinary thermostat can be controlled from a phone app.",
          "A smart thermostat learns the household\'s routine and adjusts the heating automatically.",
          "A smart thermostat only works when nobody is at home."
        ],
        answer:
          "A smart thermostat learns the household\'s routine and adjusts the heating automatically.",
        explanation:
          "The passage contrasts the two devices in the first paragraph: a smart thermostat learns the household\'s routine and adjusts the heating and cooling automatically, while an ordinary one only switches on or off at a fixed temperature.",
        evidence:
          "A smart thermostat is a small electronic device that learns a household\'s daily routine and adjusts the heating and cooling automatically.",
        paragraphRef: "Paragraph 1"
      },
      {
        id: "r-s1tech-q2",
        type: "mc",
        prompt:
          "According to the passage, how much do families typically save on energy bills by using a smart thermostat?",
        options: [
          "Between five and ten per cent over a full year.",
          "Between ten and twenty per cent over a full year.",
          "Around half of their total energy costs.",
          "They no longer pay any energy bills at all."
        ],
        answer: "Between ten and twenty per cent over a full year.",
        explanation:
          "The passage gives a specific figure: over a full year, families report saving between ten and twenty per cent on their energy bills.",
        evidence:
          "Over a full year, families report saving between ten and twenty per cent on their energy bills.",
        paragraphRef: "Paragraph 2"
      },
      {
        id: "r-s1tech-q3",
        type: "tfng",
        prompt:
          "Statement: Smart thermostats work perfectly even when the internet connection is unstable.",
        options: ["True", "False", "Not Given"],
        answer: "False",
        acceptable: ["F"],
        explanation:
          "The passage says smart thermostats need a steady internet connection to work at their best. This directly contradicts the statement that they work perfectly when the connection is unstable, so the answer is False.",
        evidence: "they need a steady internet connection to work at their best.",
        paragraphRef: "Paragraph 3"
      }
    ],
    relatedVocabIds: ["device", "innovation", "network"],
    relatedGrammarLessonIds: ["relative-clauses", "comparatives-superlatives"],
    estimatedMinutes: 5,
    version: 1,
    status: "published"
  },

  // -------------------------------------------------------------------
  // Stage 1 / Passage 3 — Education (beginner, ~190 words, 3 questions)
  // -------------------------------------------------------------------
  {
    id: "r-s1-edu",
    slug: "spaced-repetition-a-smarter-way-to-remember",
    title: "Spaced Repetition: A Smarter Way to Remember",
    stage: 1,
    difficulty: "beginner",
    topic: "Education",
    estimatedReadingMinutes: 2,
    passage:
      "Spaced repetition is a study method based on a simple idea: we remember information better when we review it at increasing intervals of time. Instead of reading the same notes over and over in a single evening, a learner looks at a word or a fact on day one, then again after two days, then after a week, and so on. Each successful review pushes the memory further into the future.\n\n" +
      "The method works because the brain seems to strengthen a memory each time it is recalled just before it is forgotten. Modern flashcard apps often build spaced repetition in automatically, deciding which card to show next based on how easily the learner answered the previous time. A card answered correctly appears less often, while a difficult card returns sooner.\n\n" +
      "Learners who use spaced repetition for a foreign language usually find that they can recall vocabulary long after the exam has finished. The technique is also popular with medical students, who must remember hundreds of terms. The main requirement is patience: results build up over weeks rather than overnight.",
    intro:
      "This passage describes a study method. Read it once for the main idea, then go back and find the sentence that answers each question. Notice how the writer supports each claim with a reason — that supporting sentence is your evidence.",
    skillFocus: "Identifying the main idea and finding key information in a short text",
    questions: [
      {
        id: "r-s1edu-q1",
        type: "mc",
        prompt: "What is the main idea of the passage?",
        options: [
          "Reading notes repeatedly in a single evening is the best way to learn.",
          "Spaced repetition helps learners remember information by reviewing it at increasing intervals of time.",
          "Flashcard apps are too expensive for most students to use.",
          "Medical students do not benefit from spaced repetition techniques."
        ],
        answer:
          "Spaced repetition helps learners remember information by reviewing it at increasing intervals of time.",
        explanation:
          "The opening sentence defines spaced repetition as a study method based on reviewing information at increasing intervals, which is the central idea developed throughout the passage.",
        evidence:
          "Spaced repetition is a study method based on a simple idea: we remember information better when we review it at increasing intervals of time.",
        paragraphRef: "Paragraph 1"
      },
      {
        id: "r-s1edu-q2",
        type: "sentence-completion",
        prompt:
          "In spaced repetition, a card that is answered correctly is shown ______.",
        options: [
          "more often than before",
          "less often than before",
          "only once and then deleted",
          "at exactly the same time each day"
        ],
        answer: "less often than before",
        explanation:
          "The passage states that a card answered correctly appears less often, while a difficult card returns sooner.",
        evidence:
          "A card answered correctly appears less often, while a difficult card returns sooner.",
        paragraphRef: "Paragraph 2"
      },
      {
        id: "r-s1edu-q3",
        type: "short-answer",
        prompt:
          "According to the passage, what is the main requirement for spaced repetition?",
        answer: "patience",
        acceptable: ["the main requirement is patience", "you need patience"],
        explanation:
          "The passage states that the main requirement of spaced repetition is patience, because results build up over weeks rather than overnight.",
        evidence:
          "The main requirement is patience: results build up over weeks rather than overnight.",
        paragraphRef: "Paragraph 3"
      }
    ],
    relatedVocabIds: ["education", "strategy", "approach"],
    relatedGrammarLessonIds: ["comparatives-superlatives"],
    estimatedMinutes: 6,
    version: 1,
    status: "published"
  },

  // -------------------------------------------------------------------
  // Stage 2 / Passage 4 — Health (intermediate, ~285 words, 4 questions)
  // -------------------------------------------------------------------
  {
    id: "r-s2-health",
    slug: "the-ten-thousand-step-myth",
    title: "The Ten Thousand Step Myth",
    stage: 2,
    difficulty: "intermediate",
    topic: "Health",
    estimatedReadingMinutes: 3,
    passage:
      "Paragraph A: For decades, the figure of ten thousand steps a day has been treated as a golden rule for healthy living. The number first became popular in the 1960s, when a Japanese company sold a pedometer whose name, loosely translated, meant ten thousand steps meter. The figure was memorable, but it was not based on medical research.\n\n" +
      "Paragraph B: In recent years, scientists have looked more carefully at how much walking is actually needed to improve health. A large 2023 review of studies, which combined data from more than twenty countries, found that the risk of dying early falls sharply as daily steps rise from two thousand to about seven thousand. After that, the benefit continues to grow, but more slowly, and it tends to level off somewhere between eight and ten thousand steps for most adults.\n\n" +
      "Paragraph C: Importantly, the speed of walking matters less than people once thought. A brisk pace brings extra benefit, but even a slow stroll around the block appears to reduce the risk of heart disease. The biggest gains seem to come from moving at all, rather than from reaching any single target. For older adults, however, every additional thousand steps up to about ten thousand still seems to lower the risk of an early death.\n\n" +
      "Paragraph D: Public health experts now suggest that the ten thousand step rule should be treated as a useful guide rather than a strict goal. People who currently take only three or four thousand steps a day are encouraged to add a short walk after meals. Even this modest change, repeated daily, can measurably improve blood pressure, sleep quality, and mood within a few weeks.",
    intro:
      "This passage has four labelled paragraphs (A to D). Skim the whole text first to understand the structure of the argument, then scan for keywords from each question. Be careful — the answer is often paraphrased, so the question may use different words from the passage. Find the exact sentence and use it as your evidence.",
    skillFocus: "Skimming, scanning, paraphrase recognition, and locating supporting evidence",
    questions: [
      {
        id: "r-s2health-q1",
        type: "mc",
        prompt:
          "According to the passage, where did the figure of ten thousand steps originally come from?",
        options: [
          "A Japanese medical study carried out in the 1960s.",
          "A pedometer sold by a Japanese company in the 1960s.",
          "A review of studies carried out across twenty countries.",
          "A heart disease research project by public health experts."
        ],
        answer: "A pedometer sold by a Japanese company in the 1960s.",
        explanation:
          "Paragraph A explains that the figure first became popular in the 1960s, when a Japanese company sold a pedometer whose name, loosely translated, meant ten thousand steps meter. The passage also notes that the figure was not based on medical research.",
        evidence:
          "The number first became popular in the 1960s, when a Japanese company sold a pedometer whose name, loosely translated, meant ten thousand steps meter.",
        paragraphRef: "Paragraph A"
      },
      {
        id: "r-s2health-q2",
        type: "tfng",
        prompt:
          "Statement: The original ten thousand step figure was based on careful medical research.",
        options: ["True", "False", "Not Given"],
        answer: "False",
        acceptable: ["F"],
        explanation:
          "Paragraph A states that the figure was memorable, but it was not based on medical research. This directly contradicts the statement, so the answer is False.",
        evidence: "The figure was memorable, but it was not based on medical research.",
        paragraphRef: "Paragraph A"
      },
      {
        id: "r-s2health-q3",
        type: "sentence-completion",
        prompt:
          "According to the 2023 review, the risk of dying early falls most sharply as daily steps rise from two thousand to about ______.",
        options: ["ten thousand", "eight thousand", "seven thousand", "four thousand"],
        answer: "seven thousand",
        explanation:
          "Paragraph B reports that the 2023 review found the risk of dying early falls sharply as daily steps rise from two thousand to about seven thousand; after that, the benefit grows more slowly.",
        evidence:
          "the risk of dying early falls sharply as daily steps rise from two thousand to about seven thousand.",
        paragraphRef: "Paragraph B"
      },
      {
        id: "r-s2health-q4",
        type: "short-answer",
        prompt:
          "According to the passage, what three things can improve as a result of adding a short walk after meals?",
        answer: "blood pressure, sleep quality, and mood",
        acceptable: [
          "blood pressure, sleep quality and mood",
          "blood pressure sleep quality and mood",
          "mood, sleep quality, and blood pressure",
          "mood, sleep quality and blood pressure"
        ],
        explanation:
          "Paragraph D lists the three improvements that come from a daily short walk after meals: blood pressure, sleep quality, and mood.",
        evidence:
          "Even this modest change, repeated daily, can measurably improve blood pressure, sleep quality, and mood within a few weeks.",
        paragraphRef: "Paragraph D"
      }
    ],
    relatedVocabIds: ["prevention", "treatment", "survive"],
    relatedGrammarLessonIds: ["comparatives-superlatives", "t1-data-comparisons"],
    estimatedMinutes: 8,
    version: 1,
    status: "published"
  },

  // -------------------------------------------------------------------
  // Stage 2 / Passage 5 — Society (intermediate, ~290 words, 4 questions)
  // -------------------------------------------------------------------
  {
    id: "r-s2-society",
    slug: "the-quiet-return-to-small-towns",
    title: "The Quiet Return to Small Towns",
    stage: 2,
    difficulty: "intermediate",
    topic: "Society",
    estimatedReadingMinutes: 3,
    passage:
      "Paragraph A: For most of the twentieth century, the dominant pattern of migration in wealthy countries was from countryside to city. Young people left farms and small towns in search of factory jobs, universities, and the bright lights of urban life. By the year 2000, the majority of people in those countries lived in cities, and demographers assumed the trend would simply continue.\n\n" +
      "Paragraph B: Over the last decade, however, a different movement has begun to draw attention. A small but growing number of city dwellers are leaving large metropolises and settling in smaller towns and rural areas. Surveys in several countries suggest that high housing costs, crowded transport, and the stress of long commutes are pushing many residents away. The shift became much more visible after 2020, when remote work allowed office employees to do their jobs from anywhere with a reliable internet connection.\n\n" +
      "Paragraph C: The economic effects on the receiving towns are mixed. Local shops, cafes, and tradespeople often welcome new customers, and house prices in some villages have risen sharply. At the same time, the sudden arrival of wealthier newcomers can price long-term residents out of the rental market and put pressure on services such as schools and health clinics, which were planned for a smaller population.\n\n" +
      "Paragraph D: Sociologists point out that the new arrivals are not true pioneers. Many still keep their jobs in the city and travel back occasionally for meetings. Their phones, streaming services, and online shopping habits also tie them closely to the urban culture they thought they had left behind. Whether this movement will reshape small towns in the long term, or simply slow their decline, remains an open question.",
    intro:
      "This passage has four labelled paragraphs (A to D). Skim to learn where the writer introduces the topic, gives reasons, and reaches a conclusion. When a question asks which paragraph contains an idea, scan each paragraph in turn for matching keywords or paraphrases.",
    skillFocus: "Skimming, scanning, paraphrase recognition, and locating supporting evidence",
    questions: [
      {
        id: "r-s2society-q1",
        type: "mc",
        prompt:
          "According to the passage, which of the following best describes the recent change in migration patterns?",
        options: [
          "People are leaving large cities and settling in smaller towns and rural areas in growing numbers.",
          "Young people are leaving farms to look for factory jobs in cities.",
          "Most city dwellers are moving abroad in search of better-paid work.",
          "Demographers have given up studying migration altogether."
        ],
        answer:
          "People are leaving large cities and settling in smaller towns and rural areas in growing numbers.",
        explanation:
          "Paragraph B describes the recent change: a small but growing number of city dwellers are leaving large metropolises and settling in smaller towns and rural areas. The other options are either the old twentieth-century pattern or are not stated.",
        evidence:
          "A small but growing number of city dwellers are leaving large metropolises and settling in smaller towns and rural areas.",
        paragraphRef: "Paragraph B"
      },
      {
        id: "r-s2society-q2",
        type: "tfng",
        prompt:
          "Statement: Remote work played no role in encouraging people to leave large cities.",
        options: ["True", "False", "Not Given"],
        answer: "False",
        acceptable: ["F"],
        explanation:
          "Paragraph B states that the shift away from cities became much more visible after 2020, when remote work allowed office employees to do their jobs from anywhere. This directly contradicts the statement that remote work played no role.",
        evidence:
          "The shift became much more visible after 2020, when remote work allowed office employees to do their jobs from anywhere with a reliable internet connection.",
        paragraphRef: "Paragraph B"
      },
      {
        id: "r-s2society-q3",
        type: "matching-info",
        prompt:
          "The arrival of wealthier newcomers can make housing too expensive for long-term residents.",
        options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"],
        answer: "Paragraph C",
        explanation:
          "Paragraph C discusses the economic effects on receiving towns and notes that the sudden arrival of wealthier newcomers can price long-term residents out of the rental market.",
        evidence:
          "the sudden arrival of wealthier newcomers can price long-term residents out of the rental market and put pressure on services such as schools and health clinics, which were planned for a smaller population.",
        paragraphRef: "Paragraph C"
      },
      {
        id: "r-s2society-q4",
        type: "short-answer",
        prompt:
          "What did demographers assume about the rural-to-city trend at the start of the century?",
        answer: "it would simply continue",
        acceptable: [
          "the trend would simply continue",
          "it would continue",
          "the trend would continue",
          "that it would simply continue"
        ],
        explanation:
          "Paragraph A states that, by the year 2000, demographers assumed the rural-to-city trend would simply continue.",
        evidence: "demographers assumed the trend would simply continue.",
        paragraphRef: "Paragraph A"
      }
    ],
    relatedVocabIds: ["migration", "urban", "rural", "community"],
    relatedGrammarLessonIds: ["compound-complex-sentences", "t2-cause-effect"],
    estimatedMinutes: 8,
    version: 1,
    status: "published"
  }
];

export const stage12PassageCount = stage12Passages.length;
