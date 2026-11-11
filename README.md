# Menschen

Private German learning prototype for Mohamed Alhinawi.

## Run locally

`npm run dev` then open http://127.0.0.1:5173.

## Preview scope

A1.1 Lektion 1, Kursbuch pages 9-12. Original book-page view plus an interactive version of exercise 2a. Original recordings for exercises 1 and 2a. Translation is optional; progress is stored only on the current device.

Other exercises, workbook integration, word pronunciation, natural-voice samples and student authentication are not finished. No deployment is configured. This is a local prototype, not a hosted private classroom.

## Material handling

Original book images and recordings are publisher material (Hueber Verlag). Do not make this repository or its assets public. Private access is not a copyright license. Full book PDFs and the full audio library are excluded from git. Only the current lesson's required page images and two MP3s are included in this prototype.

## Book interaction

The preview now opens as a paged paper book, not a continuous feed. Drag inward from the left/right page edge, use page arrows, or use keyboard left/right. Pages turn with perspective, front/back faces and a moving shadow. Original-book pages turn through the same navigation. The live exercise DOM is preserved between turns, so selected answers and notes remain. Page sound is currently absent (silent by default). Reduced-motion preferences skip animation. Long expanded translations/dialogs can scroll inside their page.

`node tests/flip.cjs` runs the book interaction checks and captures a local preview recording. Requires Playwright, Chrome and Playwright's FFmpeg support.

### Fluid curl revision

The rigid CSS leaf has been replaced with a 220-strip cylindrical Canvas surface. Each strip follows its own bent position and light level. Drag position controls curl radius/progress, release velocity can complete a turn, and settling uses requestAnimationFrame with easing. The live exercise DOM returns after the animated surface clears. html2canvas captures the page before a turn; native audio controls are represented by an inert miniature player during the animation only. No book audio is synthesized or altered. Real-phone performance still needs checking; the preview recording itself is 25 fps.
