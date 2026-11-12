# KB A1.1 exercise review: pages 42 and 43

## Scope

- Page 42 task 5 is now a native editable sentence table, with one task-specific check. Its five sentences use the supplied words and the correct forms of können. User answers persist after reload. Punctuation and case are normalized for checking.
- Page 43 is source-transcribed native text, not stretched OCR tokens. Original photo-strip, all three listening photos, and the full singer drawing are retained. Vocabulary captions are native. The printed circle-number exercise format and phrase order are retained.
- Page 43 has task-specific checks for 8a and 8b, original audio tracks 02/03/04, saved answers, and word-translation access. The printed example “1 Das macht Spaß!” remains an example.
- Free-speaking tasks 7, 8c and 9 have no invented fixed-answer checks.

## Evidence

Source: `assets/kb-a11-p42.png` and `assets/kb-a11-p43.png`. All p43 listening answers were checked against original tracks 02, 03 and 04. Track 04 explicitly says “Ich liebe die Natur”, “Ich mache sehr gern Ausflüge” and “Oft gehe ich spazieren oder fahre Rad”.

## Verification

- Production build and TypeScript pass.
- `tests/react/native-pilot.cjs`: six page/viewport cases for 41/42/55, including p42 correct/wrong table checks and reload persistence.
- `tests/react/native-exercises.cjs`: p43 at 320/390, correct/wrong checks, persistence, all three audio buttons, translations, image aspect ratios and page bounds.
- `tests/react/native-reference.cjs`: p44/52 regression at 320/390.
- Full source/render and 320/390 phone pixel review. No clipped text, title/control collisions or distorted illustration ratios in these pages.

No deployment settings were changed. This is a small exercise-complete subset; the remaining native candidates are not part of this change.
