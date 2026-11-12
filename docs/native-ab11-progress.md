# AB A1.1 native conversion

## First batch: pages 6-11

- Native selectable React text, original artwork crops and saved controlled fields.
- Source pages: `assets/ab-a11-p6.png` through `p11.png`, reviewed page by page.
- Answer provenance: the corresponding reviewed `src/scan-data/ab-a11/pN.json` records and their review notes. Page 10 uses the printed exercise's grammar and dialogue logic where the published answer key does not cover the TEST.
- Pages 6-10 have 24 closed-task checks. Page 11 is personal vocabulary work and has no false right/wrong grading.
- Page 10 greeting checks require all four distinct greetings. Dialogue pairs can be entered in any order, without allowing duplicate pairs. Its free responses are saved; the task 4 check only grades `dir` and `Ihnen`.
- Word-order matching uses selectable endpoints and connecting lines, not replacement dropdowns.
- Page 8 word marking and selected verb endings are saved. Long field values shrink to fit while staying editable.
- Original audio: AB CD1 tracks 02-07. No generated replacements.
- Original remains available through the reader's existing Original link.
- Existing scan records and other lesson manifests are unchanged. The approved KB pilot remains intact.

## Verification

`npm run typecheck`, `npm run build`, `node tests/react/hybrid-scan.cjs`, `node tests/react/native-ab11.cjs`, and `node tests/react/native-ab11-batch.cjs`.

Mobile checks at 320px and 390px include normal clicks, correct/wrong answers, saved inputs through reload, matching lines, meaning dialogs, all original audio, word/ending marking, no field/text collisions and no controls outside the page. Original, untouched native and filled native screenshots were inspected.

## Review caveat

Per-task checks take space. Some vertical spacing differs from the scan, especially on the page 10 test and its score table. This first batch is for layout review before merge, not a claim of pixel-identical fidelity.

## Remaining scope

The assigned ranges total 95 pages: 6-11, 12-17, 18-23, 24-28, 30-53, 54-77, 78-101. Six pages are implemented in this batch. The remaining 89 assigned pages retain their existing presentation. Page 29 was not in the assigned ranges and is not changed.

## Batch 2: AB A1.1 pages 12-19

Eight additional native React pages: the full ab2 unit and the first two ab3 pages. The original secondary scan link is unchanged. This brings the assigned native total to 14 of 95 pages, with 81 remaining (page29 is outside the assigned range).

- Selectable text, source illustration crops with contain framing, saved controlled fields and radio groups, line matching, number highlighting, selectable verb-ending highlights, and an explicit word-stress vowel picker.
- 32 closed tasks with a Prüfen control below each task. The pronunciation stress task is checked in addition to the 31 conventional closed tasks. Personal translations, notes, partner sentences and partner arithmetic stay saved without false grading.
- Original CD1 tracks08-10 play from the source MP3s. Word clicks open the shared meaning dialog.
- Source answer notes are consulted at runtime for printed closed tasks. p16 task3 explicitly ignores the old guessed item order: the four distinct profession words are accepted in any order. The printed syllable bank establishes **Mechatroniker**, not the older guessed Mechaniker key.
- Visual review at 320px and 390px includes untouched and filled views. The layout preserves the original page sequence and task/image arrangement; space for check buttons slightly changes vertical spacing. Long answers auto-fit or scroll inside their saved fields.
- Validation: typecheck, production build, hybrid-scan regression, original six-page native regressions, and the new eight-page normal-click test. The new test covers all correct results, wrong-field/radio feedback, device-local persistence, meaning dialogs, original playable audio, no text/field collisions and page bounds.

## Batch 3: AB A1.1 pages 20-28

Nine more native React pages complete ab3 and the Module 1 review. The cumulative assigned total is 23 of 95 pages, with 72 remaining. Page 29 remains untouched.

- Selectable German text, contained original artwork, controlled saved fields, native family-tree lines/rings, letter-by-letter crossword and endpoint word-search marking. Original images are illustrations only, not page backgrounds.
- 31 closed-task checks sit below their work. Personal text, vocabulary translations, confidence circles, and the open recap portraits are saved without correctness claims.
- Crossword lengths come from the printed profession words; its vertical shaded letters spell LEHRER. The first KELLNER row is printed, not editable.
- Original CD1 tracks 11-13 play from the existing MP3s. Shared word-meaning dialogs and the original secondary scan link remain in place.
- Recap facts checked against source Kursbuch pages 19, 78 and 82. Page 78 alone does not contain the Helga/Carlos details; their source is page 82. Page 28's two printed example checks remain fixed.
- Verification: typecheck, production build, hybrid regression, both prior AB native batches, and nine-page normal-click testing at 320px/390px. Tests cover correct/incorrect results, saved text/checkbox/arrow/highlight/crossword states through reload, confidence radios, meaning dialogs, all three playable source audio tracks, complete images, text/field/title collisions and canvas bounds.
- Actual untouched/filled screenshots were inspected against the source scans. Check controls require modest spacing changes, especially in the compressed self-assessment pages and dense grammar page. The crossword retains native letter cells and source illustrations, with a slightly different vertical rhythm from the scan.

The hybrid regression fixture moved from KB46 to KB56 after the parallel lesson-8 batch made KB46 native. No KB lesson content was changed by this AB batch.
