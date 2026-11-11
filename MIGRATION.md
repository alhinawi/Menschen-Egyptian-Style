# React migration

Status: in progress on `react-migration`. Main and production are unchanged.

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
