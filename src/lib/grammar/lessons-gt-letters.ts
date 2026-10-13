// Original IELTS General Training Task 1 letter grammar lessons (Level C / B2).
//
// All explanations, examples, incorrect examples, common mistakes, IELTS
// applications, and exercises are original, hand-authored for this project.
// No content is copied from Cambridge, Oxford, British Council, IELTS
// official materials, or any other third-party source. External references
// (AGENT.md §4B, §12) were used only to prioritise topics, not to
// reproduce text.
//
// Scope: General Training Writing Task 1 — letters (formal, neutral,
// informal). Three lessons covering register, modal verbs for requests /
// advice / offers / obligations, and polite (indirect) questions with
// future forms and pronoun reference.

import type { GrammarLesson } from "./types";

export const gtLetterLessons: GrammarLesson[] = [
  // =====================================================================
  // LESSON 1 — Letter register: formal, neutral & informal
  // =====================================================================
  {
    id: "gt-register",
    slug: "letter-register-formal-neutral-informal",
    title: "Letter Register: Formal, Neutral & Informal",
    level: "C",
    cefrLevel: "B2",
    topic: "Register",
    subtopic: "Letter register",
    objectives: [
      "Distinguish formal, neutral, and informal register and match the register to the recipient and purpose of a General Training letter.",
      "Select the correct salutation and closing pair for each register (Dear Sir or Madam / Yours faithfully; Dear Mr/Ms X / Yours sincerely; Hi [name] / Best wishes).",
      "Use contractions only in informal letters and keep formal and neutral letters in full forms.",
    ],
    explanation:
      "Register means the level of formality you choose for a piece of writing. In General Training Task 1 you must pick the register that matches the recipient and the purpose of the letter, and then keep it consistent from the first line to the last. There are three useful bands. (1) Formal — to a company, a government office, or anyone whose name you do not know. Open with 'Dear Sir or Madam,' and close with 'Yours faithfully,'. Use full forms, not contractions: 'I would like to enquire...', 'I am writing to complain...', 'I look forward to hearing from you.' (2) Neutral — to a named person you know only in a professional role, such as a tutor, manager, or landlord. Open with 'Dear Mr Smith,' or 'Dear Ms Khan,' and close with 'Yours sincerely,'. Full forms are still preferred, but the tone is warmer than in a purely formal letter. (3) Informal — to a friend or close family member. Open with 'Hi Sara,' or 'Dear Tom,' and close with 'Best wishes,' or 'See you soon,'. Contractions ('I've', 'we'll', 'can't') and everyday vocabulary ('just wanted to let you know', 'sounds great') are natural here. The safest error is to write slightly too formally; the most damaging error is to mix registers in one letter (for example 'Dear Sir' followed by 'I'll pop round tomorrow'). Pick one band at the planning stage and keep to it through every sentence.",
    bengaliExplanation:
      "Register মানে লেখার পরিচিতি স্তর — Formal, Neutral, বা Informal। প্রাপক ও উদ্দেশ্য অনুযায়ী একটি বেছে নিন এবং পুরো চিঠিতে সেটাই ধরে রাখুন। Formal-এ 'Dear Sir or Madam' + 'Yours faithfully' + পূর্ণ রূপ (contraction নয়)। Neutral-এ 'Dear Mr/Ms + নাম' + 'Yours sincerely'। Informal-এ 'Hi + নাম' বা 'Dear + নাম' + 'Best wishes' + contraction ('I'll', 'can't')। এক চিঠিতে দুই register মেলালে ব্যান্ড কমে যায়।",
    pattern:
      "Formal: Dear Sir/Madam, ... Yours faithfully. Neutral: Dear Mr/Ms X, ... Yours sincerely. Informal: Hi/Dear [first name], ... Best wishes / See you soon.",
    examples: [
      {
        sentence:
          "Dear Sir or Madam, I am writing to request a refund for the headphones I purchased from your website on 3 March.",
        note: "Formal: unknown recipient, full forms, no contractions, purpose stated plainly.",
      },
      {
        sentence:
          "Dear Mr Patel, Thank you for showing me around the flat last Friday. I would like to accept the room and can move in on the first of next month.",
        note: "Neutral: named recipient, polite but warm, full forms.",
      },
      {
        sentence:
          "Hi Meera, Just wanted to let you know we've changed the picnic to Saturday — hope that still works for you!",
        note: "Informal: 'Hi' + first name, contraction 'we've', casual phrasing.",
      },
      {
        sentence:
          "I look forward to receiving your reply at your earliest convenience.",
        note: "Formal fixed closing phrase — no contraction, no 'I'm looking forward'.",
      },
    ],
    incorrectExamples: [
      {
        sentence: "Dear Sir, I'll pop round tomorrow to sort out the boiler.",
        error:
          "Register clash: 'Dear Sir' is formal, but 'I'll pop round' and 'sort out' are informal.",
        correction:
          "Dear Sir, I would like to visit your office tomorrow to discuss the boiler.",
      },
      {
        sentence:
          "Hi Dave, I am writing to inquire whether it would be convenient for me to attend the gathering at your residence.",
        error:
          "Register clash: 'Hi Dave' is informal, but the rest of the sentence is far too formal.",
        correction:
          "Hi Dave, Just wanted to ask if it's still OK for me to come round to yours on Saturday.",
      },
    ],
    commonMistakes: [
      "Mixing registers inside one letter (a formal salutation with an informal body, or vice versa).",
      "Using contractions ('I'm', 'don't', 'we'll') in formal or neutral letters to unknown recipients.",
      "Writing 'Dear friend' or 'Dear Mister John' — neither is natural English. Use 'Dear John' (neutral) or 'Hi John' (informal).",
      "Pairing the wrong opening and closing (e.g. 'Dear Sir' with 'Yours sincerely', or 'Dear Mr Khan' with 'Yours faithfully').",
    ],
    ieltsApplications: [
      {
        task: "General Training Task 1",
        note:
          "The task prompt states who the letter is to (a friend / a manager / 'the manager of the company'). That single line decides the register; mismatches cost marks in Task Achievement and Lexical Resource.",
      },
      {
        task: "General Training Task 1",
        note:
          "A common prompt type asks you to 'explain the problem', 'apologise', or 'suggest a solution'. The verbs you choose ('I would appreciate...' vs 'could you maybe...') must follow the recipient.",
      },
      {
        task: "General Training Task 1",
        note:
          "Openings and closings form a fixed pair: Dear Sir/Madam -> Yours faithfully; Dear Mr/Ms X -> Yours sincerely; Hi/Dear [first name] -> Best wishes / See you soon. Mixing the pair is a clear register error.",
      },
    ],
    exercises: [
      {
        id: "gtr-1",
        type: "mc",
        prompt:
          "Choose the most appropriate opening for a formal complaint letter to a company whose name you do not know.",
        options: [
          "Hi there,",
          "Dear Sir or Madam,",
          "Dear Mr Smith,",
          "Hello,",
        ],
        answer: "Dear Sir or Madam,",
        explanation:
          "Formal + unknown recipient -> 'Dear Sir or Madam,'. 'Hi' and 'Hello' are informal; 'Dear Mr Smith' assumes you already know the recipient's name.",
        difficulty: 2,
      },
      {
        id: "gtr-2",
        type: "fill-blank",
        prompt:
          "Complete the formal closing with the correct preposition: 'I look forward ____ hearing from you.'",
        answer: "to",
        explanation:
          "'look forward to' takes the -ing form: 'I look forward to hearing from you.' Do not write 'to hear'.",
        difficulty: 2,
      },
      {
        id: "gtr-3",
        type: "error-id",
        prompt:
          "Identify the register problem in this sentence from an informal letter to a friend: 'I am writing to inform you that I shall be unable to attend the function.'",
        answer: "I am writing to inform you that I shall be unable to attend the function",
        acceptable: [
          "i am writing to inform you",
          "i shall be unable to attend",
          "shall",
          "too formal",
          "register",
          "register is too formal",
        ],
        explanation:
          "In an informal letter to a friend this sentence is far too formal. A natural version: 'Just wanted to let you know I can't make it to the party.'",
        difficulty: 3,
      },
      {
        id: "gtr-4",
        type: "transformation",
        prompt:
          "Rewrite this overly formal sentence so it sounds natural in an informal letter to a friend: 'I would be grateful if you could inform me of the precise time of your arrival.'",
        answer: "Could you let me know exactly what time you'll be getting here?",
        acceptable: [
          "could you let me know what time you're arriving",
          "what time will you get here",
          "could you tell me what time you'll arrive",
          "let me know what time you'll arrive",
          "what time are you arriving",
          "could you let me know what time you'll be here",
        ],
        explanation:
          "Informal register drops the formal frame ('I would be grateful if you could inform me...'), uses everyday phrasing, and allows contractions ('you'll', 'you're').",
        difficulty: 3,
      },
    ],
    prerequisites: ["compound-complex-sentences"],
    estimatedMinutes: 12,
    version: 1,
    status: "published",
  },

  // =====================================================================
  // LESSON 2 — Modal verbs for requests, advice, offers & obligations
  // =====================================================================
  {
    id: "gt-modals-requests",
    slug: "modal-verbs-requests-advice-offers-obligations",
    title: "Modal Verbs: Requests, Advice, Offers & Obligations",
    level: "C",
    cefrLevel: "B2",
    topic: "Modals",
    subtopic: "Requests and politeness",
    objectives: [
      "Form polite requests with 'could', 'would', and the frame 'I would be grateful if you could...'.",
      "Give advice and recommendations with 'should', 'ought to', and 'had better'.",
      "Distinguish obligation ('must', 'have to') from absence of obligation ('do not have to', 'need not') and use 'may'/'might' for offers and possibility.",
    ],
    explanation:
      "Modal verbs carry the writer's attitude — politeness, certainty, advice, or obligation — and they are essential in letters that ask, suggest, or instruct. Two rules shape every modal: (a) the modal is followed by the bare infinitive without 'to' ('you should arrive', not 'you should to arrive'); (b) modals have no -s in the third person ('she can', not 'she cans'). For polite requests, 'could' and 'would' are softer than 'can' and 'will': 'Could you send me the report?' is more deferential than 'Can you send me the report?'. The frame 'I would be grateful if you could...' / 'I would appreciate it if you could...' is a standard formal-request pattern in letters and is safer than a direct imperative. For advice, 'should' is neutral, 'ought to' is slightly more formal, and 'had better' carries a warning ('You had better confirm the booking soon.'). For obligation, 'must' is internal or strong personal obligation and 'have to' is external, rule-based obligation; 'must not' is prohibition, but 'do not have to' means 'no obligation' — a very common confusion. 'Need not' and 'do not need to' also express absence of obligation. 'May' is used for permission ('May I leave early?') and for offers ('May I help you?'); 'might' suggests a weaker possibility ('The parcel might arrive on Friday.'). Avoid firing a request as a bare imperative in formal letters: 'Send me the form' reads as a command; 'Could you please send me the form?' reads as a request.",
    bengaliExplanation:
      "Modal verbs (could, would, should, must, have to, may, might) অনুরোধ, পরামর্শ, বাধ্যবাধকতা ও সম্ভাবনা প্রকাশ করে। নিয়ম: modal-এর পরে bare infinitive ('to' ছাড়া) বসে, এবং third person-এ 's' যোগ হয় না। 'Could/Would' অনুরোধে 'Can/Will'-এর চেয়ে ভদ্র। 'I would be grateful if you could...' একটি মানক ভদ্র অনুরোধ। 'Should' পরামর্শে, 'must' ব্যক্তিগত বাধ্যবাধকতায়, 'have to' বাহ্যিক নিয়মে বসে। 'must not' মানে নিষেধ, কিন্তু 'do not have to' মানে বাধ্যবাধকতা নেই — এই পার্থক্য পরীক্ষায় প্রায়ই আসে।",
    pattern:
      "Modal: S + modal + bare infinitive. Polite request: Could/Would you + V? / I would be grateful if you could + V. Advice: should / ought to / had better. Obligation: must / have to. No obligation: do not have to / need not.",
    examples: [
      {
        sentence: "Could you please send me the updated invoice by the end of this week?",
        note: "Polite request — 'could' is softer than 'can'.",
      },
      {
        sentence:
          "I would be grateful if you could confirm the reservation in writing.",
        note: "Standard formal-request frame; note 'could' (not 'can') after 'if you could'.",
      },
      {
        sentence:
          "You should keep a copy of the receipt in case the manufacturer asks for proof of purchase.",
        note: "Advice — neutral 'should'.",
      },
      {
        sentence: "Visitors must not leave bags unattended in the reading room.",
        note: "Prohibition — 'must not' = it is forbidden.",
      },
      {
        sentence:
          "You do not have to print the ticket; a copy on your phone is sufficient.",
        note: "No obligation — 'do not have to' (NOT 'must not').",
      },
    ],
    incorrectExamples: [
      {
        sentence: "I would be grateful if you can send me the catalogue.",
        error:
          "After 'if you' in this formal frame, use 'could' (the polite past form), not 'can'.",
        correction: "I would be grateful if you could send me the catalogue.",
      },
      {
        sentence:
          "You must not pay the registration fee in advance; you can pay on the day.",
        error:
          "'Must not' means prohibition, but the meaning here is 'no obligation'.",
        correction:
          "You do not have to pay the registration fee in advance; you can pay on the day.",
      },
    ],
    commonMistakes: [
      "Adding 'to' after a modal: 'could to send', 'should to arrive', 'must to pay'.",
      "Confusing 'must not' (prohibition) with 'do not have to' (no obligation).",
      "Using 'can' in a very formal request where 'could' or 'would' is more polite.",
      "Adding -s to a modal in the third person ('she cans', 'he shoulds').",
    ],
    ieltsApplications: [
      {
        task: "General Training Task 1",
        note:
          "Letters that ask for help, information, or action ('write a letter to the manager asking...') almost always need 'Could you...?' or 'I would be grateful if you could...' to sound polite rather than demanding.",
      },
      {
        task: "General Training Task 1",
        note:
          "Letters giving advice to a friend ('write to a friend who is going to visit your city') use 'should', 'ought to', or 'you'd better' to suggest plans and precautions.",
      },
      {
        task: "General Training Task 1",
        note:
          "Complaint or expectation letters may need 'must' / 'have to' to state what the writer expects the company to do ('I expect the device to be repaired or replaced').",
      },
    ],
    exercises: [
      {
        id: "gtm-1",
        type: "mc",
        prompt: "Choose the most polite request to include in a formal letter.",
        options: [
          "Send me the form.",
          "Can you send me the form?",
          "Could you please send me the form?",
          "You must send me the form.",
        ],
        answer: "Could you please send me the form?",
        explanation:
          "'Could you please...' is the most polite. The imperative and 'must' read as commands; 'can' is acceptable but less deferential than 'could'.",
        difficulty: 2,
      },
      {
        id: "gtm-2",
        type: "fill-blank",
        prompt:
          "Complete the formal-request frame: 'I would be grateful if you ____ confirm the booking by Friday.'",
        answer: "could",
        explanation:
          "After 'if you' in the formal-request frame, use 'could' (the polite past form), not 'can'.",
        difficulty: 2,
      },
      {
        id: "gtm-3",
        type: "correction",
        prompt:
          "Correct the modal error: 'You must not pay the deposit now; the agent said payment is due at check-in.'",
        answer:
          "You do not have to pay the deposit now; the agent said payment is due at check-in.",
        acceptable: [
          "you don't have to pay the deposit now",
          "you need not pay the deposit now",
          "you do not need to pay the deposit now",
          "you don't need to pay the deposit now",
        ],
        explanation:
          "The meaning is 'no obligation', not 'prohibition'. Use 'do not have to' / 'need not' / 'do not need to', not 'must not'.",
        difficulty: 3,
      },
      {
        id: "gtm-4",
        type: "error-id",
        prompt:
          "Find the modal error: 'You should to bring a warm jacket because the evenings might be cold.'",
        answer: "should to bring",
        acceptable: ["should to", "should to bring a warm jacket"],
        explanation:
          "After a modal, use the bare infinitive: 'should bring', not 'should to bring'. 'might be cold' is correct.",
        difficulty: 2,
      },
    ],
    prerequisites: ["compound-complex-sentences"],
    estimatedMinutes: 14,
    version: 1,
    status: "published",
  },

  // =====================================================================
  // LESSON 3 — Polite questions, indirect requests & future forms
  // =====================================================================
  {
    id: "gt-polite-questions",
    slug: "indirect-questions-and-future-forms-in-letters",
    title: "Polite Questions, Indirect Requests & Future Forms in Letters",
    level: "C",
    cefrLevel: "B2",
    topic: "Cohesion",
    subtopic: "Indirect requests",
    objectives: [
      "Form indirect yes/no and wh-questions with 'Could you let me know whether/when/where...' and 'I was wondering if you could...'.",
      "Choose the right future form for fixed arrangements (present continuous), intentions ('be going to'), and decisions or predictions ('will').",
      "Keep pronoun reference clear in letters so the reader knows who 'he', 'she', 'it', or 'they' refers to.",
    ],
    explanation:
      "Direct questions ('Where is the office?', 'Will you refund me?') can sound blunt in a letter, especially a formal one. Indirect questions soften them and are the default for General Training Task 1 letters to strangers or managers. The pattern for an indirect yes/no question is: polite opener + 'if' or 'whether' + statement word order — 'Could you let me know whether the course is still open?' Notice that the question keeps statement word order (subject + verb), not question word order: NOT 'whether is the course still open'. For an indirect wh-question use: 'Could you let me know when the course starts?' or 'I was wondering where the office is.' The frame 'I was wondering if you could...' is a very polite way to ask a favour and is common in neutral and formal letters. Future forms in letters describe arrangements and intentions: present continuous for fixed arrangements ('I am arriving on the 14th and am staying until Friday'); 'be going to' for plans and evidence-based predictions ('I am going to bring my own laptop'); 'will' for instant decisions, promises, and neutral predictions ('I will email the documents as soon as I reach the hotel'). Avoid 'will' inside time clauses with 'when', 'before', 'as soon as' — use the present simple: 'when I arrive', not 'when I will arrive'. Avoid 'will' for a fixed public timetable: 'The train leaves at 9' rather than 'The train will leave at 9'. Finally, pronoun clarity: in a letter involving several people (you, your colleague, my sister, the agent), make sure every 'he', 'she', 'it', or 'they' clearly points to one person or thing. If there is any chance of confusion, repeat the noun ('the agent') instead of using a pronoun.",
    bengaliExplanation:
      "Formal চিঠিতে সরাসরি প্রশ্ন ('Where is...?', 'Will you...?') কঠোর শোনায়। তাই indirect question ব্যবহার করুন: 'Could you let me know whether/when/where...', 'I was wondering if you could...'। এগুলোতে statement word order থাকে (subject + verb), question word order নয়। ভবিষ্যত কাজের জন্য: fixed arrangement-এ present continuous ('I am arriving...'), পরিকল্পনায় 'be going to', তাৎক্ষণিক সিদ্ধান্ত বা প্রতিশ্রুতিতে 'will'। 'when/before/as soon as' এর মতো time clause-এ ভবিষ্যতের জন্য 'will' নয়, present simple ব্যবহার করুন। চিঠিতে একাধিক মানুষ থাকলে pronoun ('he/she/it/they') পরিষ্কার রাখুন, না হলে নাম আবার লিখুন।",
    pattern:
      "Indirect Y/N: Could you let me know whether + S + V? / I was wondering if you could + V. Indirect wh-: Could you let me know when/where/what + S + V? Future: I am V-ing (arrangement) / I am going to + V (plan) / I will + V (decision or prediction). Time clause: when I + present simple.",
    examples: [
      {
        sentence:
          "Could you let me know whether the room is still available for the first week of August?",
        note: "Indirect yes/no question — 'whether' + statement word order ('the room is', not 'is the room').",
      },
      {
        sentence:
          "I was wondering if you could forward my application to the admissions team.",
        note: "Very polite indirect request; 'if' introduces the favour.",
      },
      {
        sentence:
          "I will be arriving at the airport at 6.40 p.m. and would be glad to meet you in the arrivals hall.",
        note: "Future continuous for a planned arrangement in progress at a future time.",
      },
      {
        sentence:
          "I am going to bring the documents with me, so there is no need to post them.",
        note: "'be going to' for a prior intention.",
      },
      {
        sentence:
          "The landlord has agreed to repair the window, and he will start the work on Monday.",
        note: "Pronoun 'he' refers unambiguously to 'the landlord'.",
      },
    ],
    incorrectExamples: [
      {
        sentence: "Could you let me know when will the training start?",
        error:
          "Indirect questions use statement word order, not question word order.",
        correction: "Could you let me know when the training will start?",
      },
      {
        sentence:
          "I will to bring the report when I will meet my supervisor tomorrow.",
        error:
          "Two errors: 'to' after 'will' (modals take the bare infinitive), and 'will' in the 'when' clause for a future time.",
        correction: "I will bring the report when I meet my supervisor tomorrow.",
      },
    ],
    commonMistakes: [
      "Using question word order inside indirect questions: 'Could you tell me where is the office?' -> '...where the office is.'",
      "Using 'will' in time clauses ('when', 'before', 'as soon as') to refer to the future: 'when I will arrive' -> 'when I arrive'.",
      "Using 'will' for fixed timetables: 'The bus will leave at 9' -> 'The bus leaves at 9'.",
      "Vague pronoun reference when a letter mentions several people; if 'he' could mean two people, repeat the noun.",
    ],
    ieltsApplications: [
      {
        task: "General Training Task 1",
        note:
          "Letters asking for information ('write to ask about...') are usually more natural as indirect questions, which sound polite rather than like an interrogation.",
      },
      {
        task: "General Training Task 1",
        note:
          "Letters describing future plans ('you are going to move / visit / attend') need a mix of future forms: present continuous for fixed arrangements, 'be going to' for intentions, 'will' for promises and decisions.",
      },
      {
        task: "General Training Task 1",
        note:
          "Letters involving more than two people (a friend, their family, an agent, a colleague) need careful pronoun reference, or the examiner cannot follow who is being talked about.",
      },
    ],
    exercises: [
      {
        id: "gtp-1",
        type: "mc",
        prompt: "Choose the correct indirect question.",
        options: [
          "Could you let me know where is the nearest car park?",
          "Could you let me know where the nearest car park is?",
          "Could you let me know where is the nearest car park.",
          "Could you let me know where the nearest car park?",
        ],
        answer: "Could you let me know where the nearest car park is?",
        explanation:
          "Indirect questions use statement word order (subject + verb): 'where the nearest car park is', not 'where is the car park'.",
        difficulty: 2,
      },
      {
        id: "gtp-2",
        type: "fill-blank",
        prompt:
          "Complete the indirect request: 'I was wondering ____ you could send me a copy of the contract.'",
        answer: "if",
        acceptable: ["whether"],
        explanation:
          "'I was wondering if/whether you could...' — both 'if' and 'whether' are correct in this polite frame.",
        difficulty: 2,
      },
      {
        id: "gtp-3",
        type: "correction",
        prompt: "Correct the future-form error: 'I will call you when I will reach the hotel.'",
        answer: "I will call you when I reach the hotel.",
        acceptable: [
          "i will call you when i reach the hotel",
          "i'll call you when i reach the hotel",
          "i will call you when i get to the hotel",
          "i'll call you when i get to the hotel",
        ],
        explanation:
          "In a time clause with 'when', use the present simple to refer to the future ('when I reach'). 'Will' is used only in the main clause.",
        difficulty: 3,
      },
      {
        id: "gtp-4",
        type: "error-id",
        prompt:
          "Identify the future-form error: 'The train will leave at 9.30 tomorrow morning, so I will meet you at the station at 9.15.'",
        answer: "The train will leave at 9.30",
        acceptable: [
          "will leave",
          "the train will leave",
          "will leave at 9.30",
          "the train will leave at 9.30 tomorrow morning",
        ],
        explanation:
          "A fixed public timetable uses the present simple, not 'will': 'The train leaves at 9.30 tomorrow morning.' The second clause ('I will meet you') is a promise/decision, so 'will' is fine there.",
        difficulty: 3,
      },
    ],
    prerequisites: ["gt-modals-requests"],
    estimatedMinutes: 14,
    version: 1,
    status: "published",
  },
];

export const gtLetterLessonCount = gtLetterLessons.length;
