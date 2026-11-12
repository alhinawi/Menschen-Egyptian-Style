# Tailwind conversion conventions (all agents)

Goal: every root-level per-lesson/per-batch css file deleted; styling lives as
Tailwind v4 utility classes in React components / lesson JSON markup. The only
hand-written css left is `src/tailwind.css` (entry: theme tokens, @font-face,
@custom-variants, a few @utility patterns).

## Pipeline (already in place)
- Build: `tailwindcss -i src/tailwind.css -o src/tailwind.gen.css --minify && vite build`
  (`npm run build` already chains this). Do NOT use `@tailwindcss/vite` - it
  silently no-ops on Vite 8.
- `src/tailwind.gen.css` is gitignored and imported by the app bundle.
- Automatic candidate detection finds nothing here; `src/tailwind.css` has
  explicit `@source` directives for `./**/*.{ts,tsx}`, `../*.html`,
  `./lessons/**/*.json`. If you add a new file type that carries classes, add
  an `@source`.
- Utilities are imported UNlayered on purpose: they must beat bare element
  rules like `button{}` in the legacy files. Runtime-loaded lesson css is
  injected after the bundle, so an equal-specificity legacy class rule beats a
  utility while both exist - when converting an area, remove the legacy rule in
  the same commit, or use `!` (e.g. `font-bold!`) where an old rule still wins.

## Dark mode and palettes
- Dark: `@custom-variant dark (&:where(html[data-theme="dark"] *))` - use
  `dark:` classes.
- Reader themes: `html[data-reader-theme="..."]` - add a matching
  `@custom-variant reader-<name>` in tailwind.css when you first need one, and
  list it in the PR body so others reuse it.
- Palette 2: `body[data-palette="2"]` - semantic colors are CSS custom
  properties (`--accent`, `--ground`) defined in tailwind.css `@theme`;
  reference them with arbitrary-value syntax: `bg-(--accent)`,
  `text-(--accent)`. The palette-2 overrides of those vars stay in
  tailwind.css (they are theme tokens, not utilities).

## Shared components
New shared components live in `src/components/ui/` (create it):
`Button.tsx`, `Dialog.tsx`, `Toolbar.tsx`, `PageShell.tsx`,
`ExerciseField.tsx`. Variant props, classes composed with template strings
(no clsx dependency - do not add one). The owning agent for book.css
(area-1 agent) creates these first; everyone else imports from there.
Props: `variant` ("primary" | "ghost" | ...), `size`, plus `className` escape
hatch appended last.

## Lesson JSON markup
- BookMarkup forwards arbitrary attrs, so utility classes work directly in the
  `class` attr of JSON node tuples. Tuples are EXACTLY [tag, attrs, children] -
  a 4th element silently drops content.
- Repeated lesson-markup patterns that appear in many lessons (`.instruction`,
  `.n`, `.artText`, `.scanPage`, `.scanHot`, `.listen`, ...) become `@utility`
  definitions in `src/tailwind.css`, not per-lesson files. Name them as the
  legacy class minus the dot (`@utility instruction { ... }`) so JSON markup
  keeps working unchanged.
- One-off page-specific layout classes (`.p14`, `.grammar`, ...) get converted
  to inline utilities in that lesson's JSON when its css file is removed.

## Loading / manifest
- Lesson css files are runtime-loaded via `styles` arrays in
  `src/lessons/manifest.json`. When your file is fully converted: remove its
  entry from every `styles` array AND delete the file in the same commit.
  Several agents edit manifest.json - rebase on origin/main right before
  pushing and re-run the build.

## Verification gate (every PR)
1. `npx tsc --noEmit`
2. `npm run build`
3. Pixel gate: `node scripts/capture-matrix.cjs` (baseline worktree at the PR
   base: `git worktree add /tmp/base-wt <base-sha>` + symlink node_modules)
   then `python3 scripts/diff-matrix.py` - 260/260 identical. Run at 4 widths
   (390/768/1024/1440) x all themes incl. dark before the FINAL css deletion
   PR for your area; per-batch PRs may use the standard 390px matrix.
4. Existing test suites (`tests/legacy-regressions.cjs` harness; never run two
   suites in parallel - they share port 5190).
5. Attach 1-2 representative screenshots to the milestone report.

## PR workflow (user rule, supersedes direct pushes)
Branch per batch -> push branch -> PR against main -> MERGE COMMIT (never
squash/rebase, trailers must survive). Author Mohamed Alhinawi
<alhinaawi@gmail.com>, trailer `Co-authored-by: Ahmed Badran
<badran7299@yahoo.com>`. Backup tag before merge. Meaningful batches only.
