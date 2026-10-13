import type { ReadingPassage } from "./types";

// Original IELTS-style reading passages — Stages 3, 4 & 5.
// No content copied from IELTS official papers, Cambridge books, British
// Council materials, or any third-party source. Every passage, question,
// option, explanation, and evidence quote is hand-written for this project.
export const stage35Passages: ReadingPassage[] = [
  // -------------------------------------------------------------------
  // Stage 3 / Passage 1 — Environment (intermediate, ~370 words, 4 questions)
  // Question types: mc + tfng + matching-headings + sentence-completion
  // -------------------------------------------------------------------
  {
    id: "r-s3-env",
    slug: "island-solar-microgrids-and-the-end-of-diesel",
    title: "Island Solar Microgrids and the End of Diesel",
    stage: 3,
    difficulty: "intermediate",
    topic: "Environment",
    estimatedReadingMinutes: 2,
    passage:
      "Paragraph A: For decades, small island communities have relied on diesel generators for electricity, burning fuel shipped across hundreds of kilometres of open sea. The fuel is costly, the supply is easily disrupted by storms, and the generators release carbon dioxide into the atmosphere. As global temperatures climb, these islands face rising seas and stronger cyclones, leaving them exposed to the very emissions their power systems help create.\n\n" +
      "Paragraph B: A growing number of island governments are now turning to solar microgrids — small networks of photovoltaic panels and batteries that can operate independently of a mainland grid. A village microgrid can generate enough electricity during daylight hours to fill a battery bank that powers households through the night. Because the energy is produced locally, no shipping is required, and the system can keep running even when a storm severs the undersea cable to a larger network.\n\n" +
      "Paragraph C: The transition is not, however, straightforward. Panels and lithium-ion batteries must still be imported, and their upfront cost can exceed three years of diesel spending for a small community. Salt air corrodes metal frames, and hurricane-force winds can shatter a poorly anchored array within minutes. Engineers therefore design microgrids with reinforced mounts, raised platforms, and modular panels that can be replaced one at a time after a storm.\n\n" +
      "Paragraph D: Storage remains the most debated element. Critics argue that today\'s batteries cannot bridge a week of overcast weather, and they question whether islanders should ration electricity during long cloudy spells. Supporters counter that hybrid systems — pairing solar with a small wind turbine or a backup biodiesel generator — already solve this problem at a fraction of the historical cost of diesel alone.\n\n" +
      "Paragraph E: What is striking is the speed of adoption. Several Pacific nations have moved from a handful of pilot sites to nationwide programmes in under a decade, funding them through a blend of international climate aid and local tariffs. The lesson, planners say, is that adaptation need not wait for perfect technology; it can begin with the tools already at hand.",
    intro:
      "This passage practises four IELTS question types together: multiple choice, True/False/Not Given, matching headings, and sentence completion. Skim the five labelled paragraphs first to get the gist of each — matching-headings questions reward a clear sense of what each paragraph is actually about. Then scan for the keywords in each question. Remember the TFNG rule: if the passage states the opposite of the statement, the answer is False; if it confirms the statement, True; if you can find neither confirmation nor contradiction, Not Given.",
    skillFocus:
      "Practising four core IELTS question types — multiple choice, True/False/Not Given, matching headings, and sentence completion — within a single passage",
    questions: [
      {
        id: "r-s3env-q1",
        type: "mc",
        prompt:
          "According to Paragraph B, what is the main advantage of a solar microgrid over a diesel generator for an island community?",
        options: [
          "It eliminates the need to import any materials at all.",
          "It can continue operating when the undersea cable to a larger grid is severed.",
          "It produces no carbon dioxide at any stage of manufacture.",
          "It is cheaper to install than a diesel generator of the same size."
        ],
        answer:
          "It can continue operating when the undersea cable to a larger grid is severed.",
        explanation:
          "Paragraph B states that, because a solar microgrid produces energy locally, no shipping is required and the system keeps running even when a storm severs the undersea cable to a larger network. Option A is wrong because Paragraph C notes that panels and batteries must still be imported. Option C is not stated anywhere — the passage discusses emissions from diesel, not from the manufacture of solar panels. Option D is contradicted by Paragraph C, which says the upfront cost can exceed three years of diesel spending.",
        evidence:
          "Because the energy is produced locally, no shipping is required, and the system can keep running even when a storm severs the undersea cable to a larger network.",
        paragraphRef: "Paragraph B"
      },
      {
        id: "r-s3env-q2",
        type: "tfng",
        prompt:
          "Statement: Diesel fuel for the island generators was transported across hundreds of kilometres of open sea.",
        options: ["True", "False", "Not Given"],
        answer: "True",
        acceptable: ["T"],
        explanation:
          "Paragraph A states explicitly that small island communities relied on diesel generators, burning fuel shipped across hundreds of kilometres of open sea. The statement matches the passage, so the answer is True. (Note: the passage says \"shipped\" rather than \"transported\", but \"shipped across open sea\" is a faithful paraphrase of \"transported across hundreds of kilometres of open sea\".)",
        evidence:
          "For decades, small island communities have relied on diesel generators for electricity, burning fuel shipped across hundreds of kilometres of open sea.",
        paragraphRef: "Paragraph A"
      },
      {
        id: "r-s3env-q3",
        type: "matching-headings",
        prompt:
          "Which heading best fits Paragraph C? Choose from the list below.",
        options: [
          "The cost of importing diesel fuel",
          "Engineering challenges of building resilient microgrids",
          "Why solar panels corrode in salt air",
          "How microgrids connect to the mainland grid"
        ],
        answer: "Engineering challenges of building resilient microgrids",
        explanation:
          "Paragraph C is about the practical difficulties of building solar microgrids in a harsh island environment — import costs, corrosion from salt air, damage from hurricane winds — and the engineering responses (reinforced mounts, raised platforms, modular panels). The heading \"Engineering challenges of building resilient microgrids\" captures the whole paragraph. The other headings are either too narrow (corrosion is only one detail) or belong elsewhere (diesel-fuel imports are discussed in Paragraph A; connections to a larger grid appear in Paragraph B, not C).",
        evidence:
          "Salt air corrodes metal frames, and hurricane-force winds can shatter a poorly anchored array within minutes. Engineers therefore design microgrids with reinforced mounts, raised platforms, and modular panels that can be replaced one at a time after a storm.",
        paragraphRef: "Paragraph C"
      },
      {
        id: "r-s3env-q4",
        type: "sentence-completion",
        prompt:
          "Complete the sentence: According to Paragraph E, adaptation need not wait for __________.",
        options: [
          "perfect technology",
          "international climate aid",
          "government approval",
          "stronger batteries"
        ],
        answer: "perfect technology",
        explanation:
          "Paragraph E concludes that \"adaptation need not wait for perfect technology; it can begin with the tools already at hand.\" The other options are distractors: international climate aid is mentioned in Paragraph E only as a funding source, not as something adaptation waits for; government approval and stronger batteries are not mentioned anywhere in the passage.",
        evidence:
          "The lesson, planners say, is that adaptation need not wait for perfect technology; it can begin with the tools already at hand.",
        paragraphRef: "Paragraph E"
      }
    ],
    relatedVocabIds: ["renewable", "emission", "conservation", "sustainability"],
    relatedGrammarLessonIds: ["compound-complex-sentences", "t2-cause-effect"],
    estimatedMinutes: 8,
    version: 1,
    status: "published"
  },

  // -------------------------------------------------------------------
  // Stage 3 / Passage 2 — Technology (intermediate, ~350 words, 4 questions)
  // Question types: mc + tfng + matching-info + sentence-completion
  // -------------------------------------------------------------------
  {
    id: "r-s3-tech",
    slug: "warehouse-robotics-and-the-reskilling-question",
    title: "Warehouse Robotics and the Reskilling Question",
    stage: 3,
    difficulty: "intermediate",
    topic: "Technology",
    estimatedReadingMinutes: 2,
    passage:
      "Paragraph A: Inside a modern distribution centre on the outskirts of the city, hundreds of orange robots glide silently across polished concrete floors. Each one carries a shelf to a human picker, who removes the ordered item and places it into a packing carton. A decade ago, that same worker would have walked miles each shift between distant aisles. Now the shelves come to them.\n\n" +
      "Paragraph B: This arrangement, known as a \"goods-to-person\" system, has reshaped warehouse labour in subtle ways. Walking injuries, once the most common reported accident in the sector, have fallen sharply. Throughput has risen, because machines do not tire in the eighth hour of a shift. Yet the gains have not been distributed evenly across the workforce.\n\n" +
      "Paragraph C: The skills demanded of a picker have changed only marginally, but the new roles that pay better — maintaining the robots, troubleshooting software faults, analysing inventory data — require training that most existing employees have not been offered. Employers typically recruit robotics technicians from outside rather than upgrading their pickers, on the grounds that technical colleges produce a steadier pipeline. The result is a two-tier workforce: a small technical elite and a larger pool of workers whose pay has barely moved.\n\n" +
      "Paragraph D: Some analysts argue that automation, on balance, still creates more jobs than it destroys, pointing to the delivery drivers and packaging suppliers whose work expands as warehouses ship more goods. They note that fears of mass unemployment have accompanied every wave of mechanisation since the nineteenth century, and that each time the labour market has eventually absorbed the displaced workers. Whether that pattern will hold in the age of machine learning is less certain.\n\n" +
      "Paragraph E: A handful of firms have begun to experiment with a different model: binding their robotics vendors to apprenticeship clauses that require a share of maintenance jobs to be filled from the existing warehouse workforce. Early reports suggest that workers who complete these programmes earn roughly forty percent more within two years, and that turnover falls markedly. The scheme is small, but its results may yet redraw the terms of an old debate.",
    intro:
      "This passage practises multiple choice, True/False/Not Given, matching information, and sentence completion. For matching-information questions, you are given a statement and must decide which paragraph contains that information — the wording in the passage will be paraphrased, so look for synonyms and concepts rather than identical words. For sentence completion, check that your chosen option produces a sentence that is both grammatically correct and faithful to what the passage actually says.",
    skillFocus:
      "Combining multiple choice, True/False/Not Given, matching information, and sentence completion with paraphrase recognition",
    questions: [
      {
        id: "r-s3tech-q1",
        type: "mc",
        prompt:
          "According to Paragraph B, which of the following has been an effect of the goods-to-person system?",
        options: [
          "Workers now walk longer distances than before to reach distant aisles.",
          "Walking injuries have increased sharply among warehouse staff.",
          "The warehouse produces more goods per hour than it did under the old arrangement.",
          "Pay has risen equally across the whole warehouse workforce."
        ],
        answer:
          "The warehouse produces more goods per hour than it did under the old arrangement.",
        explanation:
          "Paragraph B states that throughput has risen because machines do not tire in the eighth hour of a shift. \"Throughput\" is paraphrased in the correct option as \"goods per hour\". Option A is wrong because the shelves now come to the picker, so workers walk less, not more. Option B is the opposite of what the passage says — walking injuries have fallen, not risen. Option D is contradicted by the closing sentence of Paragraph B: the gains have not been distributed evenly across the workforce.",
        evidence:
          "Throughput has risen, because machines do not tire in the eighth hour of a shift.",
        paragraphRef: "Paragraph B"
      },
      {
        id: "r-s3tech-q2",
        type: "tfng",
        prompt:
          "Statement: Employers prefer to recruit robotics technicians from outside the company because technical colleges supply a steady stream of suitable candidates.",
        options: ["True", "False", "Not Given"],
        answer: "True",
        acceptable: ["T"],
        explanation:
          "Paragraph C states that employers typically recruit robotics technicians from outside rather than upgrading their pickers, on the grounds that technical colleges produce a steadier pipeline. \"A steadier pipeline\" is paraphrased in the statement as \"a steady stream of suitable candidates\", and \"on the grounds that\" matches \"because\". The statement is confirmed by the passage, so the answer is True.",
        evidence:
          "Employers typically recruit robotics technicians from outside rather than upgrading their pickers, on the grounds that technical colleges produce a steadier pipeline.",
        paragraphRef: "Paragraph C"
      },
      {
        id: "r-s3tech-q3",
        type: "matching-info",
        prompt:
          "In which paragraph does the writer note that concerns about machines replacing workers are not new?",
        options: [
          "Paragraph A",
          "Paragraph B",
          "Paragraph C",
          "Paragraph D",
          "Paragraph E"
        ],
        answer: "Paragraph D",
        explanation:
          "Paragraph D states that fears of mass unemployment have accompanied every wave of mechanisation since the nineteenth century — in other words, that such fears are not new and have arisen with each previous wave of mechanisation. None of the other paragraphs makes this historical point: Paragraph A describes the warehouse, Paragraph B the labour effects, Paragraph C the two-tier workforce, and Paragraph E the apprenticeship experiment.",
        evidence:
          "They note that fears of mass unemployment have accompanied every wave of mechanisation since the nineteenth century, and that each time the labour market has eventually absorbed the displaced workers.",
        paragraphRef: "Paragraph D"
      },
      {
        id: "r-s3tech-q4",
        type: "sentence-completion",
        prompt:
          "Complete the sentence: According to Paragraph E, workers who complete the new apprenticeship programmes earn roughly __________ more within two years.",
        options: ["twenty percent", "forty percent", "fifty percent", "sixty percent"],
        answer: "forty percent",
        explanation:
          "Paragraph E reports that workers who complete these programmes earn roughly forty percent more within two years. The other percentages (twenty, fifty, sixty) are plausible distractors but are not the figure given in the passage.",
        evidence:
          "Early reports suggest that workers who complete these programmes earn roughly forty percent more within two years, and that turnover falls markedly.",
        paragraphRef: "Paragraph E"
      }
    ],
    relatedVocabIds: ["algorithm", "innovation", "deploy", "device"],
    relatedGrammarLessonIds: ["active-passive-voice", "t2-hedging"],
    estimatedMinutes: 8,
    version: 1,
    status: "published"
  },

  // -------------------------------------------------------------------
  // Stage 4 / Passage 3 — Society (advanced, ~440 words, 5 questions)
  // Question types: mc + 2 ynng + sentence-completion + short-answer
  // -------------------------------------------------------------------
  {
    id: "r-s4-society",
    slug: "remote-work-and-the-reshaping-of-cities",
    title: "Remote Work and the Reshaping of Cities",
    stage: 4,
    difficulty: "advanced",
    topic: "Society",
    estimatedReadingMinutes: 3,
    passage:
      "Paragraph A: For most of the twentieth century, the geography of professional work was defined by a daily tide: commuters travelling inward to a central business district in the morning and outward to residential suburbs in the evening. Public transport was built around this tide, as were the cafés, dry-cleaners, and lunch counters that lined the office blocks of every major city. The arrangement concentrated wealth and opportunity in a few square kilometres of pavement, leaving the periphery to depend on its spill-over.\n\n" +
      "Paragraph B: The spread of remote work after 2020 has loosened this grip. When a senior accountant in a financial firm can perform her duties from a kitchen table two hundred kilometres away, the premium she once paid to live within commuting distance of the headquarters no longer makes economic sense. Property prices in city centres have softened, while once-quiet towns on the rail periphery have seen double-digit increases in demand for family homes. The tide, in other words, has begun to ebb in the opposite direction.\n\n" +
      "Paragraph C: This decentralisation is not without its victims. The cleaners, security staff, and food vendors whose livelihoods depended on office footfall were not, for the most part, able to follow the work to the suburbs; their jobs vanished with the lunch hour. Public transport systems, designed for peak loads that no longer exist, now run half-empty trains at a heavy loss. Municipal budgets, fed by commercial rents, face shortfalls that threaten libraries, parks, and after-school programmes.\n\n" +
      "Paragraph D: Proponents of the shift argue, however, that the gains are being overlooked. Smaller towns, long drained of their brightest young people by the magnetism of the capital, are regenerating as returning professionals open businesses and join civic life. Emissions from commuting have fallen in cities that adopted remote work most fully, and parents report spending more time with children who once saw them only on weekends. The argument, in their view, is not whether decentralisation causes disruption — it plainly does — but whether the net effect, measured over a generation, is finally beneficial.\n\n" +
      "Paragraph E: What remains unresolved is the question of fairness. A software engineer who works remotely can earn a metropolitan salary while living in a region where housing costs a third as much; a hospitality worker in the same town, paid at local rates, cannot. The same technology that liberates one group from geography binds the other to it. Resolving that tension will require more than infrastructure; it will require a deliberate politics of redistribution that few governments have so far been willing to attempt.",
    intro:
      "This longer, advanced passage practises Yes/No/Not Given (YNNG) — the question type that asks about the WRITER\'S views and claims, not just facts. The crucial difference from TFNG: a statement might be factually true in the wider world, but if the writer does not state or imply it, the answer is Not Given; if the writer disagrees with it, the answer is No. Use inference carefully — read what the writer actually commits to, and resist importing your own knowledge or opinions.",
    skillFocus:
      "Inference and writer\'s views — distinguishing what the writer claims from what is merely true in the world",
    questions: [
      {
        id: "r-s4society-q1",
        type: "mc",
        prompt: "What is the writer\'s main purpose in Paragraph A?",
        options: [
          "To argue that public transport was poorly designed in the twentieth century.",
          "To describe how the daily commute shaped the wealth of twentieth-century cities.",
          "To criticise the concentration of wealth in suburban residential areas.",
          "To explain why dry-cleaners and cafés closed in city centres."
        ],
        answer:
          "To describe how the daily commute shaped the wealth of twentieth-century cities.",
        explanation:
          "Paragraph A describes the daily tide of commuters and explains how the arrangement concentrated wealth and opportunity in the central business district while leaving the periphery dependent on its spill-over. That matches option B. Option A is wrong because the passage does not argue that public transport was poorly designed — it says transport was built around the commute. Option C is wrong because wealth was concentrated in city centres, not suburbs. Option D is wrong because closures are not mentioned in Paragraph A (they belong to Paragraph C, where office footfall disappears).",
        evidence:
          "The arrangement concentrated wealth and opportunity in a few square kilometres of pavement, leaving the periphery to depend on its spill-over.",
        paragraphRef: "Paragraph A"
      },
      {
        id: "r-s4society-q2",
        type: "ynng",
        prompt:
          "Statement: The writer claims that property prices in city centres have risen sharply since the spread of remote work.",
        options: ["Yes", "No", "Not Given"],
        answer: "No",
        acceptable: ["N"],
        explanation:
          "Paragraph B states the writer\'s view that property prices in city centres have softened, while towns on the rail periphery have seen double-digit increases. \"Softened\" means weakened or fallen, which directly contradicts the statement\'s claim that city-centre prices have risen sharply. The answer is therefore No — the writer\'s view is the opposite of the statement. Note that ynng tests the writer\'s view, not whether prices have risen in reality: the writer commits to \"softened\", and that is what the answer must reflect.",
        evidence:
          "Property prices in city centres have softened, while once-quiet towns on the rail periphery have seen double-digit increases in demand for family homes.",
        paragraphRef: "Paragraph B"
      },
      {
        id: "r-s4society-q3",
        type: "ynng",
        prompt:
          "Statement: The writer believes that governments have done enough to address the inequalities created by remote work.",
        options: ["Yes", "No", "Not Given"],
        answer: "No",
        acceptable: ["N"],
        explanation:
          "In the final paragraph the writer argues that resolving the tension created by remote work will require \"a deliberate politics of redistribution that few governments have so far been willing to attempt.\" This is the writer\'s explicit view, and it directly contradicts the statement that governments have done enough. The answer is No. As with all ynng items, this reflects the writer\'s stated view, not an independent judgement of what governments have actually done.",
        evidence:
          "Resolving that tension will require more than infrastructure; it will require a deliberate politics of redistribution that few governments have so far been willing to attempt.",
        paragraphRef: "Paragraph E"
      },
      {
        id: "r-s4society-q4",
        type: "sentence-completion",
        prompt:
          "Complete the sentence: According to Paragraph D, the question is not whether decentralisation causes disruption but whether __________.",
        options: [
          "the net effect, measured over a generation, is finally beneficial",
          "small towns can attract young people back permanently",
          "commuting emissions can be reduced further",
          "public transport systems can be reformed"
        ],
        answer:
          "the net effect, measured over a generation, is finally beneficial",
        explanation:
          "Paragraph D closes by framing the argument as: not whether decentralisation causes disruption — it plainly does — but whether the net effect, measured over a generation, is finally beneficial. The other options are distractors drawn from earlier sentences in Paragraph D (returning young people, falling emissions) or from Paragraph C (public transport reform), none of which is the framing the writer uses to close the paragraph.",
        evidence:
          "The argument, in their view, is not whether decentralisation causes disruption — it plainly does — but whether the net effect, measured over a generation, is finally beneficial.",
        paragraphRef: "Paragraph D"
      },
      {
        id: "r-s4society-q5",
        type: "short-answer",
        prompt:
          "According to Paragraph C, name ONE type of worker whose livelihood depended on office footfall and whose job disappeared when the lunch hour collapsed. (Write one occupation.)",
        answer: "cleaners",
        acceptable: [
          "cleaner",
          "security staff",
          "security guard",
          "food vendor",
          "food vendors"
        ],
        explanation:
          "Paragraph C names three groups whose jobs vanished with the lunch hour: cleaners, security staff, and food vendors. Any one of these is an acceptable answer. The exact sentence in the passage lists all three and states that their jobs vanished with the lunch hour.",
        evidence:
          "The cleaners, security staff, and food vendors whose livelihoods depended on office footfall were not, for the most part, able to follow the work to the suburbs; their jobs vanished with the lunch hour.",
        paragraphRef: "Paragraph C"
      }
    ],
    relatedVocabIds: ["migration", "urban", "poverty", "diversity"],
    relatedGrammarLessonIds: ["compound-complex-sentences", "t2-concession"],
    estimatedMinutes: 12,
    version: 1,
    status: "published"
  },

  // -------------------------------------------------------------------
  // Stage 4 / Passage 4 — Education (advanced, ~460 words, 5 questions)
  // Question types: mc + 2 ynng + matching-info + short-answer
  // -------------------------------------------------------------------
  {
    id: "r-s4-edu",
    slug: "inquiry-learning-and-the-evidence-question",
    title: "Inquiry Learning and the Evidence Question",
    stage: 4,
    difficulty: "advanced",
    topic: "Education",
    estimatedReadingMinutes: 3,
    passage:
      "Paragraph A: Few debates in education have lasted as long, or generated as much heat, as the contest between inquiry-based learning and direct instruction. Inquiry learning asks students to discover principles for themselves through structured investigation, while direct instruction has the teacher explain a concept explicitly before students apply it. Each method carries a philosophy about how the mind grows: one treats the learner as a young scientist constructing knowledge, the other as a novice who must first be shown the path before walking it alone.\n\n" +
      "Paragraph B: Advocates of inquiry learning draw on the work of developmental psychologists who argued, in the mid-twentieth century, that knowledge built by the learner is retained longer and understood more deeply than knowledge merely received. A child who works out, through trial and error, why a heavy object and a light object fall at the same rate, is said to grasp the principle more firmly than one told the answer by an adult. Proponents also point to motivation: students who choose their own questions, they argue, invest more effort in answering them.\n\n" +
      "Paragraph C: Yet a substantial body of empirical research, accumulated over four decades, has cast doubt on these claims. Controlled studies comparing the two methods in mathematics and science classrooms have repeatedly found that novices learn more, and more quickly, when new content is explicitly taught and then practised with feedback. The reason, cognitive scientists suggest, is that the human working memory is narrow: a beginner who must simultaneously explore an unfamiliar problem and hold new facts in mind often becomes overwhelmed, and learning stalls. Inquiry, in this view, is best reserved for learners who already possess the background knowledge to interpret what they find.\n\n" +
      "Paragraph D: Defenders of inquiry respond that the studies cited against it tend to measure short-term recall of facts rather than deeper transfer — the ability to apply a principle to a novel context. They argue that direct instruction produces competent performers on narrow tests, but rarely produces the flexible thinkers that complex modern economies demand. They point, too, to the social values embedded in each method: a classroom that hands authority to the learner, in their telling, is a rehearsal for democratic citizenship, whereas one that hands it to the teacher trains obedience.\n\n" +
      "Paragraph E: The most thoughtful contributors on both sides have begun to converge on a less satisfying but more honest conclusion. Neither method, used alone, serves all learners at all stages. Beginners need more guidance; experts benefit from more autonomy. The question worth asking is not which method is correct, but at which point in a learner\'s development each should dominate, and how to blend them gracefully as competence grows.",
    intro:
      "This advanced passage continues to test writer\'s views (YNNG), alongside multiple choice, matching information, and a short-answer question. Pay close attention to phrases such as \"the writer argues\", \"in their view\", and \"defenders respond\" — these signal whose claim is being made. YNNG questions often hinge on attributing a claim to the right voice, so before answering, check whether the writer actually endorses the view, merely reports someone else\'s, or says nothing at all.",
    skillFocus:
      "Advanced inference — attributing claims correctly and reading for the writer\'s stance",
    questions: [
      {
        id: "r-s4edu-q1",
        type: "mc",
        prompt:
          "According to Paragraph C, what reason do cognitive scientists give for why inquiry learning may fail with beginners?",
        options: [
          "Beginners lack the motivation to choose their own questions.",
          "Beginners\' working memory is too narrow to explore an unfamiliar problem and hold new facts in mind at the same time.",
          "Beginners prefer direct instruction because it requires less effort.",
          "Beginners forget facts more quickly than experts do."
        ],
        answer:
          "Beginners\' working memory is too narrow to explore an unfamiliar problem and hold new facts in mind at the same time.",
        explanation:
          "Paragraph C reports the cognitive scientists\' explanation that the human working memory is narrow, so a beginner who must simultaneously explore an unfamiliar problem and hold new facts in mind often becomes overwhelmed and learning stalls. This matches option B. Option A is not the reason cognitive scientists give (motivation is mentioned by inquiry advocates in Paragraph B, not by critics in Paragraph C). Option C is not stated. Option D is a plausible-sounding distractor but is not the reason offered in the passage.",
        evidence:
          "the human working memory is narrow: a beginner who must simultaneously explore an unfamiliar problem and hold new facts in mind often becomes overwhelmed, and learning stalls.",
        paragraphRef: "Paragraph C"
      },
      {
        id: "r-s4edu-q2",
        type: "ynng",
        prompt:
          "Statement: The writer claims that controlled studies have shown direct instruction to be more effective than inquiry learning for short-term learning in mathematics and science classrooms.",
        options: ["Yes", "No", "Not Given"],
        answer: "Yes",
        acceptable: ["Y"],
        explanation:
          "Paragraph C reports that controlled studies comparing the two methods in mathematics and science classrooms have repeatedly found that novices learn more, and more quickly, when new content is explicitly taught and then practised with feedback. The writer presents this as the established finding of a substantial body of empirical research accumulated over four decades — that is, as the writer\'s own reported claim. The statement therefore reflects the writer\'s view, and the answer is Yes. As with all ynng items, the answer reflects the writer\'s claim, not an independent re-running of the studies.",
        evidence:
          "Controlled studies comparing the two methods in mathematics and science classrooms have repeatedly found that novices learn more, and more quickly, when new content is explicitly taught and then practised with feedback.",
        paragraphRef: "Paragraph C"
      },
      {
        id: "r-s4edu-q3",
        type: "ynng",
        prompt:
          "Statement: The writer argues that inquiry-based learning should never be used in any classroom.",
        options: ["Yes", "No", "Not Given"],
        answer: "No",
        acceptable: ["N"],
        explanation:
          "The writer does not argue that inquiry should never be used. On the contrary, Paragraph C states the writer\'s view that inquiry is best reserved for learners who already possess the background knowledge to interpret what they find, and Paragraph E concludes that neither method used alone serves all learners at all stages — implying inquiry still has a place. The statement therefore contradicts the writer\'s view, and the answer is No. As ever for ynng, the answer reflects the writer\'s stance, not a blanket judgement about inquiry learning in the abstract.",
        evidence:
          "Inquiry, in this view, is best reserved for learners who already possess the background knowledge to interpret what they find.",
        paragraphRef: "Paragraph C"
      },
      {
        id: "r-s4edu-q4",
        type: "matching-info",
        prompt:
          "In which paragraph does the writer suggest that the choice between teaching methods reflects deeper values about the kind of citizen a school should produce?",
        options: [
          "Paragraph A",
          "Paragraph B",
          "Paragraph C",
          "Paragraph D",
          "Paragraph E"
        ],
        answer: "Paragraph D",
        explanation:
          "Paragraph D is where the writer notes the social values embedded in each method, contrasting a classroom that hands authority to the learner (a rehearsal for democratic citizenship) with one that hands authority to the teacher (which trains obedience). This is the only paragraph that frames the choice between methods in terms of the kind of citizen a school produces. Paragraph A contrasts philosophies of how the mind grows but does not discuss citizenship; the other paragraphs discuss evidence or synthesis.",
        evidence:
          "They point, too, to the social values embedded in each method: a classroom that hands authority to the learner, in their telling, is a rehearsal for democratic citizenship, whereas one that hands it to the teacher trains obedience.",
        paragraphRef: "Paragraph D"
      },
      {
        id: "r-s4edu-q5",
        type: "short-answer",
        prompt:
          "According to Paragraph C, what specific term do cognitive scientists use for the human mental capacity that they say is too narrow in beginners? (Write the two-word term.)",
        answer: "working memory",
        acceptable: ["human working memory"],
        explanation:
          "Paragraph C reports the cognitive scientists\' explanation that the human working memory is narrow, which is why a beginner who must simultaneously explore an unfamiliar problem and hold new facts in mind becomes overwhelmed. The two-word term used in the passage is \"working memory\".",
        evidence:
          "the human working memory is narrow: a beginner who must simultaneously explore an unfamiliar problem and hold new facts in mind often becomes overwhelmed, and learning stalls.",
        paragraphRef: "Paragraph C"
      }
    ],
    relatedVocabIds: ["pedagogy", "curriculum", "assessment", "literacy"],
    relatedGrammarLessonIds: ["relative-clauses", "t2-parallelism"],
    estimatedMinutes: 12,
    version: 1,
    status: "published"
  },

  // -------------------------------------------------------------------
  // Stage 5 / Passage 5 — Health (advanced, ~460 words, 5 mixed questions)
  // Question types: mc + tfng + ynng + sentence-completion + short-answer
  // -------------------------------------------------------------------
  {
    id: "r-s5-health",
    slug: "sugar-taxes-and-the-limits-of-pricing",
    title: "Sugar Taxes and the Limits of Pricing",
    stage: 5,
    difficulty: "advanced",
    topic: "Health",
    estimatedReadingMinutes: 3,
    passage:
      "Paragraph A: When a small European country introduced a tax on sugary drinks in 2014, public health officials hoped that a sharp rise in shelf price would persuade consumers to switch to water and unsweetened tea. The measure targeted beverages containing more than five grams of added sugar per hundred millilitres, levying a charge that producers passed directly to shoppers. Within two years, sales of the taxed drinks fell by roughly a third, and the policy was widely cited as a model for the rest of the world.\n\n" +
      "Paragraph B: A closer reading of the data complicates the triumph. A significant share of the decline in sales, it turned out, was driven by manufacturers reformulating their products rather than by households changing what they drank. Brands quietly reduced the sugar content of popular cola lines to sit just below the tax threshold, allowing them to keep their old prices and their old customers. The volume of sugary beverages sold did fall, but the volume of sugar that people actually consumed did not fall by nearly as much.\n\n" +
      "Paragraph C: There is a further difficulty. Even where the tax does shift consumption, it tends to shift it toward alternative sweeteners whose long-term health effects are still being studied. A family that swaps a taxed cola for an artificially sweetened one is, at best, trading a known harm for an uncertain one. And where consumers cannot afford the substitute, they often switch to cheaper, untaxed fruit juices that contain comparable amounts of natural sugar and carry many of the same metabolic risks.\n\n" +
      "Paragraph D: Defenders of the policy respond that these objections, while reasonable, miss the larger point. Reformulation alone, they argue, has removed tens of thousands of tonnes of sugar from the national diet each year — a public health gain that no other intervention has matched at comparable cost. They add that pricing signals need time to change taste preferences that have taken decades to form, and that early evaluations of the tax are bound to understate its long-term effects.\n\n" +
      "Paragraph E: The writer\'s own view is that sugar taxes are useful but insufficient. They are most effective when they form part of a wider package: clearer labelling on the front of packaging, restrictions on the advertising of sweets to children, and subsidies that make fresh fruit cheaper than confectionery in low-income neighbourhoods. A tax on its own can nudge the market; it cannot, by itself, reshape the food environment in which the market operates. To expect it to do so is to ask of a single instrument a task that requires an orchestra.",
    intro:
      "This Stage 5 passage is timed mixed practice — the kind of combination you will meet in the real test. You have five questions spanning five different types: multiple choice, True/False/Not Given, Yes/No/Not Given, sentence completion, and short answer. Practise switching mental gears quickly: the strategy for a TFNG question (locate the fact and compare) differs from the strategy for a YNNG question (identify the writer\'s view), which differs again from a short-answer question (scan for a specific name or term). Aim to finish within the estimated time.",
    skillFocus:
      "Timed mixed practice — switching fluently between five IELTS question types under time pressure",
    questions: [
      {
        id: "r-s5health-q1",
        type: "mc",
        prompt:
          "According to Paragraph B, why did the volume of sugar that people actually consumed fall by less than the volume of sugary drinks sold?",
        options: [
          "Consumers switched in large numbers to cheaper fruit juices.",
          "Manufacturers reduced the sugar content of their drinks so that they fell below the tax threshold.",
          "The tax was never actually passed on to shoppers at the checkout.",
          "Consumers bought fewer drinks but drank the same total volume at home."
        ],
        answer:
          "Manufacturers reduced the sugar content of their drinks so that they fell below the tax threshold.",
        explanation:
          "Paragraph B explains that a significant share of the decline in sales was driven by manufacturers reformulating their products: brands quietly reduced the sugar content of popular cola lines to sit just below the tax threshold, allowing them to keep their old prices and customers. This matches option B. Option A is a separate difficulty raised in Paragraph C, not the explanation in Paragraph B. Option C is contradicted by Paragraph A, which says producers passed the charge directly to shoppers. Option D is not stated.",
        evidence:
          "Brands quietly reduced the sugar content of popular cola lines to sit just below the tax threshold, allowing them to keep their old prices and their old customers.",
        paragraphRef: "Paragraph B"
      },
      {
        id: "r-s5health-q2",
        type: "tfng",
        prompt:
          "Statement: The 2014 sugar tax applied to beverages containing more than five grams of added sugar per hundred millilitres.",
        options: ["True", "False", "Not Given"],
        answer: "True",
        acceptable: ["T"],
        explanation:
          "Paragraph A states explicitly that the measure targeted beverages containing more than five grams of added sugar per hundred millilitres. The statement matches the passage exactly, so the answer is True.",
        evidence:
          "The measure targeted beverages containing more than five grams of added sugar per hundred millilitres, levying a charge that producers passed directly to shoppers.",
        paragraphRef: "Paragraph A"
      },
      {
        id: "r-s5health-q3",
        type: "ynng",
        prompt:
          "Statement: The writer claims that a sugar tax, on its own, is sufficient to reshape the food environment in which the market operates.",
        options: ["Yes", "No", "Not Given"],
        answer: "No",
        acceptable: ["N"],
        explanation:
          "In Paragraph E the writer states the opposite view: a tax on its own can nudge the market, but it cannot, by itself, reshape the food environment in which the market operates. The statement therefore contradicts the writer\'s view, and the answer is No. As with all ynng items, the answer reflects the writer\'s claim, not an independent assessment of whether a sugar tax could in principle reshape food environments.",
        evidence:
          "A tax on its own can nudge the market; it cannot, by itself, reshape the food environment in which the market operates.",
        paragraphRef: "Paragraph E"
      },
      {
        id: "r-s5health-q4",
        type: "sentence-completion",
        prompt:
          "Complete the sentence: According to Paragraph D, defenders of the tax argue that early evaluations of the policy are bound to __________ its long-term effects.",
        options: ["understate", "exaggerate", "ignore completely", "reverse"],
        answer: "understate",
        explanation:
          "Paragraph D reports that defenders of the policy add that pricing signals need time to change taste preferences that have taken decades to form, and that early evaluations of the tax are bound to understate its long-term effects. \"Understate\" is the exact word used; the other options (exaggerate, ignore completely, reverse) are plausible distractors but are not what the passage says.",
        evidence:
          "They add that pricing signals need time to change taste preferences that have taken decades to form, and that early evaluations of the tax are bound to understate its long-term effects.",
        paragraphRef: "Paragraph D"
      },
      {
        id: "r-s5health-q5",
        type: "short-answer",
        prompt:
          "According to Paragraph E, give ONE example (other than a sugar tax) of a measure the writer says should form part of a wider package. (Write a short noun phrase.)",
        answer: "clearer labelling",
        acceptable: [
          "clearer labelling on the front of packaging",
          "front-of-pack labelling",
          "front of pack labelling",
          "restrictions on advertising",
          "restrictions on the advertising of sweets to children",
          "subsidies",
          "subsidies for fresh fruit",
          "subsidies that make fresh fruit cheaper than confectionery"
        ],
        explanation:
          "Paragraph E lists three measures that the writer says should form part of a wider package alongside a sugar tax: clearer labelling on the front of packaging, restrictions on the advertising of sweets to children, and subsidies that make fresh fruit cheaper than confectionery in low-income neighbourhoods. Any one of these is an acceptable answer; the canonical answer given here is \"clearer labelling\".",
        evidence:
          "They are most effective when they form part of a wider package: clearer labelling on the front of packaging, restrictions on the advertising of sweets to children, and subsidies that make fresh fruit cheaper than confectionery in low-income neighbourhoods.",
        paragraphRef: "Paragraph E"
      }
    ],
    relatedVocabIds: ["prevention", "nutrition", "chronic"],
    relatedGrammarLessonIds: ["conditionals", "t2-cause-effect"],
    estimatedMinutes: 13,
    version: 1,
    status: "published"
  }
];

export const stage35PassageCount = stage35Passages.length;
