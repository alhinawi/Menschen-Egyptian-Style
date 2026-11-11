# A1.2 Arbeitsbuch · Lektion 17-20 preview

Entry point: `ab-a12-l17-20.html`. All additions are isolated. No existing app file is replaced.

## Scope

- 30 original printed pages, 36-65. The supplied chunk starts at printed 34; chunk page 3 is printed 36 (global PDF page 38).
- L17: 36-41; L18: 42-47; Modul 6 review, self-assessment, Rückblick and literature: 48-53; L19: 54-59; L20: 60-65.
- 93 practice sections, including open notes; 330 checked response fields.
- Original CD 2 tracks 18-29, local playback only. Track 18, 19 and 27 were transcribed to confirm their lesson/exercise identity. Other tracks follow the numbered source folder and printed track icons.
- 125 vocabulary entries and 32 selected sentences, with Egyptian Arabic meanings.
- Device-local answer and note persistence, solution reveal, page navigation, zoom, pinch/pan, keyboard arrows and held page turns.

## Design boundary

This is a scan-backed interactive preview, not the complete selectable-text reconstruction used by the earlier Kursbuch pages. Original printed content, drawings, photos, example answers and order remain visible in the scan. Exercises are entered in a separate per-page practice dialog. The source scans contain handwritten sample answers; these are not erased.

The glossary covers selected vocabulary and sentences, not every printed word. Added word/sentence pronunciation clips are not yet attached. Original exercise recordings are attached. The literature page has no original recording in the supplied materials.

## Answer grounding

Source account: `3asfuur@gmail.com`, folder `Menschen A1.2/extras`:
- `16 AB-A1-2 Lsg.pdf`, Drive file `1V7OT-OjbOCcTixDtcNibq_tVtS1MfRgr`.
- `15 AB-A1-2 Trans.pdf`, Drive file `1OCaRT1LH3p6m-T89TOBjb-zlcCbwej5m`.
- Unterrichtsplan L17-20 inspected for lesson context; these are Kursbuch teacher plans, not substitutes for the AB keys.
- `Menschen A1.2/arbeitsbuch audio`, Drive folder `1hh0YMSHIZ-42jc0z_gmfBFzB6k56a5J0`, Track18.mp3 through Track29.mp3.
- Original page scan attachment `ab12-p36-72.pdf`, chunk pages 3-32.

The official key supplied omits Test pages 40, 46, 58 and 64. Those pages have saved answer notes, but no guessed automatic answers. Open writing, speaking and self-assessment tasks are not speech-graded or automatically marked. Writing an email is only an exercise, never a send action.

Printed page 45 Training Hören 1: the recording also mentions a 10-12 meeting, while the official solution lists only the first two time entries under heard times. The practice dialog preserves this discrepancy as a note, without automatically grading that subquestion. The requested appointment is Wednesday at 8:00, consistent across recording and key.

Text entry tolerates case, terminal punctuation and repeated whitespace, not arbitrary paraphrases. Where an exercise has two gaps in one response, the practice note asks for the two fragments together. Solution reveal is not counted as a correct response.

## Verification

Run `node tests/ab-a12-l17-20.cjs` with Playwright and Chrome. Tests cover 320, 390, 430 and 1280px widths, all 30 scans, all 330 checked fields, wrong answers, solution reveal, saved notes, vocabulary search, original image display and audio routing. Existing `npm test` remains unchanged and passes.

The answer-fill test proves the UI accepts its declared keys. It is not an independent linguistic review of the answer file. Source keys were checked separately during transcription.

## Integration

Keep the branch as a preview. Do not merge or replace the current main entry point without the owner's explicit approval. Noindex is included, but does not provide access control. Keep the repository private. Materials belong to Hueber Verlag; unlisted hosting is not a copyright license.
