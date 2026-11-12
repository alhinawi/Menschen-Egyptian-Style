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
