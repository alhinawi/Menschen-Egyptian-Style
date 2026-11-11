# React migration

Status: in progress on `react-migration`. Main and production are unchanged.

## Stack

Vite, React and React DOM. The output is static HTML/CSS/JS with local book assets; there is no server runtime. Existing document URLs and local-storage keys are preserved.

## First milestone

- React renders the complete Kursbuch L1 document from structured element data, without iframes or HTML injection.
- Vite builds the app and copies original assets with unchanged names.
- A temporary compatibility boundary mounts the existing L1 exercise, pronunciation and page-fold engines. It disposes listeners, timers, audio and generated overlays on unmount.
- This boundary is **not** the completed React port. Native React reader controls, themes, exercise state and the remaining lesson groups are still to follow.
- Browser checks run against the production build at 320, 390, 430 and 1280 widths.

## Safety

The remote backup branch `backup/main-before-react-20261111` and tag `backup-main-before-react-20261111` preserve `608edd357d9545bea1c15127d108eb47168abeac`.

The root `vercel.json` is deliberately unchanged. Hosting configuration and any main/production cutover need separate approval. The migration's build command is `npm run build`; output is `dist`.
