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

The parallel KB batch moved the hybrid regression fixture to KB57 after KB41-56 became native. Its current fixture and all parallel KB lesson content are preserved in the merge.

## Batch 4: AB A1.1 pages 30-37

Eight additional native pages begin lessons 4 and 5. The assigned total is now 31 of 95 pages, with 64 remaining. Page 29 and the parallel lesson 7-9 work are unchanged.

- Selectable source text, contained original illustration crops, visible full field frames, saved fields/radios/highlights, native matching lines, and numbered object-picture controls.
- 29 closed checks below their tasks. The SMS continuation, translations, vocabulary notes and own drawing are saved without right/wrong claims. Drawing has a clear action and survives reload; its pointer events do not turn the page.
- Source CD1 tracks 14-22 are playable in their original files. The Original link and shared meaning dialog remain available.
- Source corrections: page 31 uses the printed 17 000, not the inherited 1700 typo. Page 32's coffee response is the printed Vielen Dank, not the inherited Danke, gut answer. The printed X choice and S solution example disagree in the source; both remain printed examples, and neither is graded. Page 34's TEST answers follow the printed words and grammar rather than an absent answer-key section.
- Pronunciation long/short vowel marks are native text decorations. Page 36 preserves printed letter hints and its fixed Feuerzeug example. Page 37 uses image-backed endpoints and connecting lines rather than replacement dropdowns.
- Validation: typecheck, production build, hybrid regression and prior 23-page native regressions; Chrome normal-click tests at 320px and 390px cover correct/incorrect feedback, feedback clearing, persistence, original audio, meaning dialogs, drawings, source images, absence of replacement selects, collisions and canvas bounds.
- Untouched and filled mobile screenshots were inspected against the source. Checks and visible frames change vertical spacing; dense pronunciation, price and TEST sections are more compressed than the scan. The long written price uses a wrapping saved field rather than unreadably shrinking the entire answer.

## Batch 5: AB A1.1 pages 38-40

Three more native pages finish lesson 5's main work and TEST. The cumulative assigned total is 34 of 95 pages, with 61 remaining. The separate lesson 7-9/page41-56 lane remains untouched by this batch.

- Page 38 has source letter hints, native color-painting controls and shape examples, saved product descriptions, and line matching. The interchangeable Wie endpoints accept either valid order. Product descriptions are open writing and are never graded against the old single-sentence metadata examples, which contain errors.
- Page 39 has a native form diagram, source portrait, a saved customer card with centered title circles, source accent examples, selectable sentence-stress words and CD1 tracks23-25. Audio tests use the shared screen-space buttons and grouped-track chooser, not hidden/tiny markers.
- Page 40 has selectable letter endpoints and saved highlights for the original word snake. Closed category entries accept either item order. Extra nonsense highlights do not pass. Source TEST grammar and letter hints remain intact.
- Eleven closed-task checks sit below their work. Color painting, marked words, forms, radios, matching, stress choices and open notes persist across reload. The word-meaning dialog and secondary Original link remain available.
- Verification: typecheck/build, hybrid regression, all eight previous lesson4/5 pages and the three-page Chrome320/390 suite. Correct and wrong answers, changed-feedback clearing, saved controls, all three actual playable audio files, loaded art, no replacement selects, text/field collisions and bounds are asserted. Native untouched and filled screenshots at both widths were inspected against scans.
- Layout caveat: check buttons and frame borders require slightly compressed spacing in dense TEST/pronunciation sections. Original illustration crops are contained, never scan-primary.

## Batch 6: AB A1.1 pages 57-59

Three native lesson7 closing pages bring this lane to37 of95 assigned pages,58 remaining. The separate page41-56 lane is untouched.

- Source email text and markable questions, saved personal notes/reply, native pronunciation examples and selectable stress words. One closed rule check; CD1 tracks34-36 remain original playable MP3s.
- Page58 preserves the source TEST anagrams, weekly schedule, verb prompts, sentence-order prompts, compliment letter hints and score table. Five closed checks accept sentence variants with valid changed emphasis.
- Page59 has native selectable vocabulary, visible framed saved translation fields, personal notes and a contained original illustration strip. No correctness claim for personal writing or translations.
- Chrome320/390 normal-click tests cover six correct/wrong checks, feedback reset, persistence of fields/radios/question and stress marks, source audio via the shared chooser, meaning dialogs, loaded images, no dropdown replacements, collisions and bounds. Typecheck/build and hybrid regression pass. Actual untouched/filled pixels inspected against the source scans; dense pronunciation/TEST spacing is compressed to fit checks and full input frames.
