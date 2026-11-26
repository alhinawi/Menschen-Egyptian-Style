// Completed-exercise record for native pages.
//
// Points on the leaderboard and the teacher dashboard are the number of
// `done-*: true` flags inside the learner's synced `native-*` / `menschen-book-*`
// localStorage entries (backend/src/leaderboard.ts pointsOf, backend/src/admin.ts).
// Legacy adapter pages and ScanDialogs write those flags themselves. Native pages
// grade into React state and used to save only typed answers, so a correct check
// never counted. A correct check fires the bubbling `check-feedback` event with
// detail.correct; this module turns each distinct exercise's first correct check
// into one sticky flag.
//
// - Stored apart from the answers, in `native-done-<lesson>`, so resetting a page's
//   answers neither erases nor re-awards a point (the same exercise id is reused).
// - Only a correct check writes. A later wrong check never removes a flag, and a
//   repeated correct check changes nothing (idempotent, no double awards).
// - The flag is keyed book + page + exercise (book = the page's data-native-book), not the URL,
//   so the same exercise reached through two routes or aliases counts once. Only pages that
//   name no book fall back to the route's lesson slug.
// - Legacy exercises (ScanDialogs forms and the markBank word banks, whose buttons carry
//   the "check" class) already write their own done flags through the lesson state;
//   they are skipped so nothing is counted twice.
// - Nothing is awarded retroactively: only a check made after this ships writes.
const PREFIX = 'native-done-';
const isLegacy = (b: HTMLElement) => !!b.closest('form') || b.classList.contains('check');
const checkButtons = (page: Element) =>
  [...page.querySelectorAll<HTMLButtonElement>('button.compactCheckButton')].filter(b => !isLegacy(b));

export function lessonSlug(pathname = location.pathname): string {
  const file = pathname.split('/').pop() || 'index';
  return file.replace(/\.html$/, '') || 'index';
}

/** Canonical book of the page a check button sits on; falls back to the route slug. */
export function bookOf(button: HTMLElement, pageEl: HTMLElement | null, page: string | undefined): string {
  const scope = button.closest<HTMLElement>('.page') || pageEl;
  let el: HTMLElement | null = null;
  if (scope) el = scope.matches('[data-native-book]') ? scope : scope.querySelector<HTMLElement>('[data-native-book]') || scope.closest<HTMLElement>('[data-native-book]');
  if (!el && page) el = [...document.querySelectorAll<HTMLElement>('.page[data-page] [data-native-book]')].find(e => e.closest<HTMLElement>('.page')?.dataset.page === page) || null;
  return el?.dataset.nativeBook || lessonSlug();
}

/** Stable id of the exercise a check button grades, or null when it cannot be identified. */
export function exerciseFlag(button: HTMLButtonElement): string | null {
  return exerciseIdentity(button)?.flag ?? null;
}

export function exerciseIdentity(button: HTMLButtonElement): { book: string; flag: string } | null {
  if (isLegacy(button)) return null;
  // Dialogs portalled out of their page name their page with data-completion-page.
  const pageEl = button.closest<HTMLElement>('.page[data-page]') || button.closest<HTMLElement>('[data-native-page]') || button.closest<HTMLElement>('[data-completion-page]');
  const page = pageEl?.dataset.page || pageEl?.dataset.nativePage || pageEl?.dataset.completionPage;
  if (!pageEl || !page) return null;
  const holder = button.closest<HTMLElement>('[data-exercise-id],[data-native-task],[data-native-check]');
  const task = holder?.dataset.exerciseId || holder?.dataset.nativeTask || holder?.dataset.nativeCheck;
  const root = button.closest<HTMLElement>('.page') || pageEl;
  const index = checkButtons(root).indexOf(button);
  if (!task && index < 0) return null;
  return { book: bookOf(button, pageEl, page), flag: 'done-' + page + ':' + (task ? 't-' + task : 'n' + index) };
}

function writeFlags(book: string, flags: string[]): boolean {
  if (!flags.length) return false;
  const key = PREFIX + book;
  try {
    let state: Record<string, unknown> = {};
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(key) || '{}');
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) state = parsed as Record<string, unknown>;
    } catch { /* unreadable value: start a fresh record, never throw into the page */ }
    const fresh = flags.filter(f => state[f] !== true);
    if (!fresh.length) return false;
    const next = { ...state };
    for (const f of fresh) next[f] = true;
    localStorage.setItem(key, JSON.stringify(next));
    return true;
  } catch {
    return false; // private mode or full storage: the check itself still works
  }
}

export const recordFlags = writeFlags;

/** Sub-answer flag: the group's flag plus ':f-<field>'. */
export const subFlag = (group: string, field: string) => group + ':f-' + field;

/** One sticky flag per correct sub-answer (a field, a radio row, a matching line) of a check. */
export function recordSubAnswers(button: HTMLButtonElement, fields: string[]): boolean {
  const identity = exerciseIdentity(button);
  if (!identity) return false;
  // Book-given examples are pre-filled, so they are never the student's answer.
  const examples: Record<string, string[]> = { 'done-28:t-t1': ['t-a-helga', 't-a-carlos'], 'done-34:n3': ['r4a'] };
  const skip = examples[identity.flag] || [];
  return writeFlags(identity.book, [...new Set(fields.filter(f => f && !skip.includes(f)))].map(f => subFlag(identity.flag, f)));
}

export function recordCompletion(button: HTMLButtonElement): boolean {
  const identity = exerciseIdentity(button);
  if (!identity) return false;
  return writeFlags(identity.book, [identity.flag]);
}

/** Field ids a custom grader published on the exercise holder (comma separated). */
function publishedFields(button: HTMLButtonElement): string[] {
  const holder = button.closest<HTMLElement>('[data-ok-fields]');
  return (holder?.dataset.okFields || '').split(',').filter(Boolean);
}

if (typeof document !== 'undefined' && !(window as typeof window & { __exerciseCompletion?: boolean }).__exerciseCompletion) {
  (window as typeof window & { __exerciseCompletion?: boolean }).__exerciseCompletion = true;
  document.addEventListener('check-feedback', event => {
    const detail = (event as CustomEvent<{ correct?: boolean; okFields?: string[] }>).detail;
    const button = event.target;
    if (!(button instanceof HTMLButtonElement)) return;
    // Every correct sub-answer earns its own point, right or wrong overall.
    recordSubAnswers(button, [...(detail?.okFields || []), ...publishedFields(button)]);
    if (detail?.correct === true) recordCompletion(button);
  });
}
