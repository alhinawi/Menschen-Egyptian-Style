# KB A1.1 native reference pages 44 and 52

## Publication scope

- Printed p44: speaking/card game, grammar and communication reference.
- Printed p52: menu discussion, grammar and communication reference.
- P42: move the open writing field out of the task-5 heading and keep the task-5 text below it.
- Other lesson pages and other workers' native renderers remain unchanged.

## Source review

Compared the original `assets/kb-a11-p44.png` and `assets/kb-a11-p52.png` with the rendered paper at reading scale. Native text is transcribed as coherent text blocks, not stretched OCR tokens. Restored printed punctuation, subtask letters, grammar-table labels, article colors, module colors, margin labels and footers. Preserved the full comic and each food photo at its original relative size. P44 speech-bubble words are native text; the drawings and bubble frames remain source art. Its colored dice and faces use their source illustration crops.

Neither page contains a fixed-answer written exercise. P44 is a speaking/card game; p52 asks learners to choose favorite dishes and discuss a class statistic. They therefore have no invented graded controls. Native words open the shared translation dialog.

## Verification

- Build, TypeScript and content/asset checks pass.
- `tests/react/native-reference.cjs`: p44/p52 at 320px and 390px, translation, browser errors, image aspect ratios and page bounds.
- `tests/react/native-pilot.cjs`: p41/p42/p55 at both widths, correct/wrong grading, saved answers, translation and original audio where applicable.
- Pixel review at full paper reading scale, then phone screenshots at both widths.
- Fresh 390px opening is fit-width: paper width 390px. The 43% display is 390/900, not 43% of the available phone width. The zoom controls allow larger reading and panning.

## Remaining outside this PR

The other eleven lessons-7-9 native candidates are not approved for publication. In particular p50/p53 still need text/layout repairs; p56 needs its continuous photo treatment; p43/p46/p47/p51 need source-table and caption review. This PR does not mark the batch complete.
