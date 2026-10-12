# Vocabulary Learning Website — Worklog

This file is the shared worklog for all agents working on the
Interactive Vocabulary Learning Website project.

Project root: /home/z/my-project
Single user-visible route: `/` (Next.js App Router).
Stack: Next.js 16 + TypeScript 5 + Tailwind 4 + shadcn/ui + Prisma/SQLite + z-ai-web-dev-sdk.

---
Task ID: 1
Agent: main (orchestrator)
Task: Phase 1 inspection of reference site vocabpractice.com and search for openly licensed datasets.

Work Log:
- Fetched https://vocabpractice.com/home and /practiceCourses via z-ai page_reader.
- Reference site is a paid JS SPA; actual word data is behind login/paywall and NOT reusable.
- Searched web for openly licensed English-Bengali exam vocabulary datasets — none clean/publicly available.
- Decision: author an original curated sample dataset (no copyright issue) + support CSV/JSON import.
- Inspected existing project: Next.js 16, Tailwind 4, full shadcn/ui set, Prisma/SQLite, zustand, z-ai-web-dev-sdk all present.

Stage Summary:
- Phase 1 report delivered to user. Proceeding to Phase 2 build with original data + import support.
- Architecture: vocab data served via /api/vocab route; user progress + imports stored client-side (localStorage); single-page tabbed UI at `/`.

---
Task ID: 5
Agent: data-author (general-purpose sub-agent)
Task: Author an original, hand-authored sample vocabulary dataset at src/lib/vocab/sample-data.ts for IELTS/TOEFL/GRE/SAT/BCS/Admission exam prep.

Work Log:
- Read shared worklog (Task 1) to align with the original-data + import-support architecture decided in Phase 1.
- Inspected project style: src/lib/utils.ts and src/app/api/route.ts use double quotes; src/lib/db.ts uses single quotes. Chose double quotes to match the dominant style in app/ and lib/utils.ts.
- Created /home/z/my-project/src/lib/vocab/ directory (did not previously exist).
- Authored 180 hand-written vocabulary entries — every definition, Bengali translation, IPA phonetic, example sentence, synonym, and antonym written from scratch. No content copied from any website or third-party dataset.
- Defined and exported the exact requested TypeScript types in the same file: `Exam`, `Difficulty`, and the `Word` interface (all fields exactly per spec).
- Exported `sampleWords: Word[]` (the dataset array) and `sampleWordCount = sampleWords.length` helper at the bottom of the file.
- All Bengali meanings use proper Unicode Bengali script (no romanization). Multiple meanings separated by " , " as specified. Chose words whose Bengali I could render confidently; skipped any I was unsure of.
- Verified with `npx tsc --noEmit --skipLibCheck`: file compiles cleanly with no TypeScript errors.
- Verified counts via a Node script:
  - Total words: 180 (target ~180, min 160 — PASS)
  - Unique ids: 180 (no duplicates)
  - Difficulty distribution: 72 beginner (40.0%) / 72 intermediate (40.0%) / 36 advanced (20.0%) — exactly matches the requested 40/40/20 split.
  - Exam tag coverage: IELTS=180, TOEFL=180, SAT=141, BCS=156, Admission=154, GRE=50. All six exams appear on many words; GRE/SAT skew toward advanced, BCS/Admission toward common academic words.
  - Categories span 10 distinct categories: Action, Abstract, Academic, Communication, Science, Society, Business, Nature, Daily Life, Emotion.
  - All 180 entries have non-empty `bengali` fields.

Stage Summary:
- File created at: /home/z/my-project/src/lib/vocab/sample-data.ts (2568 lines, 180 word entries).
- Exports ready for import by other tasks: `Word` (interface), `Exam` (type), `Difficulty` (type), `sampleWords` (array), `sampleWordCount` (number).
- Suggested next step (for downstream agents): wire `sampleWords` into the `/api/vocab` GET route or a static server component, build the listing/flashcard/practice UI tabs against the `Word` shape, and add CSV/JSON import that conforms to the same interface.

---
Task ID: 6-10
Agent: main (orchestrator)
Task: Phase 2-4 — build the full interactive vocabulary learning website and verify end-to-end.

Work Log:
- Built data layer in src/lib/vocab/: srs.ts (SM-2 spaced repetition), quiz.ts (5 quiz types + word-match generator), import.ts (CSV/JSON parser+validator), speech.ts (Web Speech API pronunciation), store.ts (Zustand + localStorage persist: customWords, SRS state, manual marks, difficult set, quiz history, review log), hooks.ts (useWordBank merges API sample + localStorage imports, dedupe by id).
- Added API route GET /api/vocab (server-side search/filter; keeps vocab data separate from UI).
- Built UI components in src/components/vocab/: ui-bits.tsx (badges, pronounce button, Bengali text, empty/loading states), dashboard-view.tsx (stats, mastery by exam, recent quizzes, streak, quick actions), library-view.tsx (instant search, difficulty/exam/category filters, expandable word rows, import dialog with CSV/JSON + template download), flashcards-view.tsx (3D flip, keyboard nav Space/arrows/1-2-3, SRS rating), quizzes-view.tsx (meaning/reverse/synonym/antonym/fill-blank MC + word-match game, feedback+explanations, results screen), revision-view.tsx (due-review SRS session, difficult-words manager, mastery summary), vocab-app.tsx (tabbed shell, theme toggle, sticky footer).
- Updated layout.tsx (Noto Sans Bengali font + metadata + Providers), page.tsx (renders VocabApp), providers.tsx (ThemeProvider + QueryClient), globals.css (Bengali font rule + custom scrollbar).
- Lint clean (0 errors). Dev server running on :3000.

Verification (Agent Browser end-to-end):
- Dashboard renders: 180 words, 180 due (all new), mastery by exam, quick actions.
- Library: instant search filters (typed "abandon" -> 1 result), expandable word detail (definition/synonyms/antonyms), Bengali + phonetics + exam badges render correctly.
- Flashcards: session starts, flip card (front word/phonetic, back Bengali/definition/example/syn-ant), rating buttons work, keyboard nav.
- Quizzes: MC question with 4 Bengali options, feedback "Not quite" + explanation with meaning+definition, Next advances; word-match grid (5 pairs) matches correctly with check/disable feedback.
- Revision: daily review (20 due words) button, mastery summary, difficult-words empty state.
- Import: pasted 2-word CSV -> "2 imported" badge, words appear with Imported badge, dedupe makes imported "abundant" override the sample (181 total, no duplicate).
- Fixed: Radix ScrollArea needed definite height -> switched library list to plain .scrollbar-thin max-h-[60vh] overflow-y-auto div. Verified bodyH 1167 (was 21632), gapBelow footer = 0 (sticky footer correct).
- Mobile (iPhone 14) + desktop (1280x800) layouts verified.
- No runtime/console errors after clean reload.

Stage Summary:
- All Phase 2-4 requirements delivered and browser-verified.
- 180 original curated words (Bengali+English, IPA, definitions, examples, synonyms/antonyms, difficulty, exam tags, categories).
- Local-first (no account); progress + imports in localStorage; vocab data via /api/vocab.
- Features working: instant search, filters (difficulty/exam/category + counts), flashcards w/ flip+keyboard+SRS, 5 MC quiz types + word-match game w/ feedback/explanations/scores, spaced-repetition revision (due review + difficult words), dashboard (mastery by exam, streak, recent quizzes), CSV/JSON import w/ template, Bengali+English rendering, light/dark theme, responsive, loading/empty/error states, sticky footer.
- Reference-site (vocabpractice.com) data NOT used (paid/paywalled); original sample data authored instead.
