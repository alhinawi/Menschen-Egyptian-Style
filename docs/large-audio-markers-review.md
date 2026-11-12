# Large audio markers

Audio markers now have unscaled 44 × 44 CSS-pixel circular buttons. They remain phone-sized when the source book is fit to the screen. Cream/gold styling matches the reader and blue play icons have visible track numbers.

The shared layer recognizes hybridAudio, nativeAudioMarker, nkbListen, nkAudio, npListen, nabListen, mListen and legacy listen markers. It delegates to the original click handlers, so track selection and players remain unchanged. Clip markers are excluded. Only the current page receives targets. Modal dialogs stay above the targets.

Nearby markers share a circle showing the number of tracks. It opens a modal with full-width track buttons, rather than pushing multiple circles down into the next exercise. Original small source markers remain in place as landmarks and retain their behavior.

## Verification

- 12 representative pages at 320 and 390 CSS-pixel widths: 24 phone cases and 46 original track-handler activations.
- KB A1.1 p9, 17, 27, 41, 43, 46; KB A1.2 p9, 11; AB A1.1 p8, 15, 21; AB A1.2 p33.
- Every target is 44 × 44, inside the viewport; clustered choices invoke each source track once.
- Page and chooser screenshots inspected at 390; p27 and chooser also inspected at 320. Margin buttons do not cover task text.
- Build, TypeScript, content tests and hybrid-scan regression pass. The hybrid regression now invokes the original source handler directly, while the new phone suite verifies the visible target and chooser routing separately.
- Playback mapping is preserved, not re-audited for content completeness. This change does not add missing audio files or claim every printed listening task is already mapped.
