# React migration

Status: functional React migration on `react-migration`, verified locally. Main and production are unchanged. The milestones below are a chronological implementation log, not outstanding-task lists.

## Stack

Vite, React and React DOM. The output is static HTML/CSS/JS with local book assets; there is no server runtime. Existing document URLs and local-storage keys are preserved.

## First milestone

- React renders the complete Kursbuch L1 document from structured element data, without iframes or HTML injection.
- Vite builds the app and copies original assets with unchanged names.
- A temporary compatibility boundary mounts the existing L1 exercise, pronunciation and page-fold engines. It disposes listeners, timers, audio and generated overlays on unmount.
- This boundary is **not** the completed React port. Native React reader controls and exercise state are still to follow. Themes, audio hints and cross-book routing are now native React components.
- Browser checks run against the production build at 320, 390, 430 and 1280 widths.

## Safety

The remote backup branch `backup/main-before-react-20261111` and tag `backup-main-before-react-20261111` preserve `608edd357d9545bea1c15127d108eb47168abeac`.

The root `vercel.json` is deliberately unchanged. Hosting configuration and any main/production cutover need separate approval. The migration's build command is `npm run build`; output is `dist`.

## All-route rendering milestone

All 26 entry points now render through React, including both books and original-image viewers. Per-route content and compatibility engines are lazy loaded. Existing document URLs remain intact. Eight original browser suites pass through the static production build at four widths. This milestone still uses compatibility engines for exercises and page-fold gestures; it is not the final native-state migration.

## Reader-control milestone

React components now own reader navigation/zoom/select/sound control events and subscribe to a shared reader store. Existing fold/gesture engines are accessed through a small bridge; they no longer install active DOM property handlers on those controls. Zoom text and sound SVGs are rendered by React, avoiding competing writes. The original-viewer controls use the same bridge. All eight original browser suites pass after this change. Exercise marking/persistence and meaning dialogs still need native React ports.

## Exercise grading milestone

Fifteen standard batch engines now use native React form submission, result state, feedback text and declared-answer field styling. Duplicate-answer constraints, checkbox/radio-group rules and existing normalization are preserved. Audio feedback, saved progress and field persistence still use compatibility services. L1 custom exercises, AB13-16 custom radio checks, scan-backed AB17-20 practice and meaning dialogs remain to port. All 15 standard batches pass answer tests, and the eight original regression suites pass.

## Meaning dialog milestone

Word/sentence/selected-text dialog rendering, mode buttons, close button, disabled/pending states and Arabic/German text now use a native React component and store. Selection matching and queued pronunciation remain services with unchanged maps. Audio stops on close and cleanup. Original suites plus AB2/AB3/module selected-text audio tests pass.

## Custom grading milestone

Kursbuch L1 named-speaker/radio checks and AB13-16 target-radio checks now use the shared React grading store as well. All 17 non-scan batch engines pass declared-answer checks. The scan-backed AB17-20 practice engine remains separate and is not yet ported.

## Field persistence milestone

React now captures field-input events and maintains field state for the 17 non-scan engines, preserving the original field-index/note keys and radio-peer behavior. The shared state object prevents later page saves from overwriting answer edits. Existing persistence regression cases pass after removing the old per-field event listeners.

## Scan-backed workbook milestone

AB17-20 practice forms, declared-answer grading, notes, solution reveal, vocabulary search/filter, pronunciation player and original-page dialog now use React components/state. The 330 answer fields, punctuation exceptions, ungraded notes and original-source limits are unchanged. All eight original regression suites pass, including the complete scan-backed workflow at four widths.

## Text-selection controls and gesture regression

Translation-mode, native text-selection mode and selected-text action buttons are React components backed by a selection store. Selection matching and transparent artwork-text geometry stay in a focused DOM service so browser selection ranges remain accurate. Native phone touch tests pass at 320/390/430: zoomed panning, stationary held folds, release completion, short-drag return and backward turns. Paper-sound tests confirm trusted-touch audio unlock, audible waveform, short-return sound and mute persistence.

## Printed markup milestone

The original L1 generated tables, all 30 scan-backed workbook page sections, page choices and cover social icons are now structured React content/components. Application source no longer uses `innerHTML`, `outerHTML`, `insertAdjacentHTML` or runtime `eval` (the preserved PageFlip library is excluded from that source audit). Original assets, contact destinations and labels are unchanged. All-route smoke, 17-engine grading, eight legacy suites, selected-text/audio and native gesture/paper-sound checks pass. Full-document navigation remains intentional; the fold and text-geometry services still own their documented DOM islands.

## Custom task milestone

React now owns L1's three standalone checks, click-to-mark verb/souvenir tasks, all 12 AB7-9 pick groups and KB2-3 marking/explanation mode buttons. The original storage/progress/audio effects are called through the quiz service bridge. A new custom-task suite tests wrong/correct answers, required picks, native marks and KB2-3 mark persistence. Multi-pick groups now treat their existing empty `data-multi` attribute as a boolean attribute, fixing the old truthiness check that blocked selecting several required answers. The eight original suites and phone gesture/audio suites remain green. All 8,523 original asset files match their built copies byte for byte; original assets, styles and hosting configuration are unchanged from the backup.

## Reader extras milestone

AB13's generated word bank and AB10-12 self-assessment ratings are native React components. Rating select/clear state survives reload. Page choices for AB13-16 are structured data. Audio triggers, cover opening, palette/audio toggles and canvas toolbar clicks now enter through React event handlers and call the existing low-level services. Dedicated word-bank/rating tests and the original suites pass. The standalone build runs from `dist`; the unchanged legacy `vercel.json` still disables builds and serves the repository root. A future approved deployment must explicitly select `npm run build` and `dist`. Do not publish the root shells as if they were a built app.


## Final service boundary and verification

React owns all 26 document routes, immutable printed content, reader controls, themes, translation dialogs, exercises, saved fields, custom marking/pick/word-bank tasks, scan practice/vocabulary/original dialogs and self-rating UI. The patched PageFlip library, fold gestures, DOM text-range/artwork geometry, canvas drawing, audio playback and completion effects stay in small lifecycle-mounted services. This is not an iframe wrapper and does not evaluate page scripts at runtime.

Service-owned timers and animation frames are canceled on disposal, including work scheduled after mount. Audio contexts close, active meaning audio stops, event listeners installed during service initialization are removed, and disposal is idempotent. Existing full-document navigation remains deliberate. This is not a claim that hot-swapping a lesson inside an existing React tree is supported; that would require a separate DOM-island/remount test.

Run `npm run build`, `npm test`, then `npm run test:react:all`. The last command runs asset checks, lifecycle tests, all-route smoke, native exercise/custom task checks, Arabic/audio checks, eight original four-width suites and touch/paper-sound regressions. For a quick check, `npm run test:react` runs the L1 four-width smoke suite.

Deployment is not part of this branch's execution approval. The legacy `vercel.json` is unchanged. Do not merge into main or deploy until the owner explicitly approves the cutover and its build/output settings.
