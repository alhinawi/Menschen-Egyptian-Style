// Practice dialog rows award the same canonical flags as the native page for the same
// book exercise (book + page + check ordinal + field id), so one answer counts once whichever
// view it was given in. practice-map.json was built by matching each Practice exercise to the
// native check it mirrors and asserting every row against the native answers.
//   n >= 0  mirrors native check n. Row i maps through f[i]:
//     "id" or "k/id"        a native field (k = another check's ordinal): earned when the row is right
//     ["k/id=answer", ...]  a row that fills several native blanks: each blank earns on its own
//                           when the typed text contains that blank's answer, even if the row is
//                           only partly right
//     ""                    a gradable row with no native counterpart: its own flag
//     "-"                   a book-given example or a row that is not graded: no credit
//   n = -1  no native counterpart at all: every row has its own flag.
// Own flags look like `done-<page>:t-pr-<exercise id>:f-r<row>`.
import {lessonSlug, recordFlags, subFlag} from '../components/exercise-completion';
import map from './practice-map.json';

type Cell = string | string[];
const table = map as Record<string, {n: number; f: Cell[]}>;
const fold = (s: string) => s.normalize('NFC').toLocaleLowerCase('de').replace(/[.!?,;„“"]/g, ' ').replace(/\s+/g, ' ').trim();
const contains = (typed: string, answer: string) => answer.split('|').some(a => {
  const t = ' ' + fold(typed) + ' ', x = fold(a);
  return x !== '' && t.includes(' ' + x + ' ');
});

/** Canonical flags for the rows of one Practice check. ok[i] is the row's own right/wrong result. */
export function practiceFlags(exerciseId: string, ok: boolean[], values: string[]): string[] {
  const m = /^ab12p(\d+)e(.+)$/.exec(exerciseId), entry = table[exerciseId];
  if (!m || !entry || ok.length !== values.length) return [];
  const page = m[1], earned = (i: number) => ok[i] && values[i].trim() !== '';
  const own = (i: number) => subFlag('done-' + page + ':t-pr-' + exerciseId, 'r' + i);
  if (entry.n < 0) return ok.map((_, i) => i).filter(earned).map(own);
  if (entry.f.length !== ok.length) return [];
  const flags: string[] = [];
  entry.f.forEach((cell, i) => {
    if (Array.isArray(cell)) {
      for (const part of cell) {
        const [ref, answer] = part.split('=');
        const [k, id] = ref.includes('/') ? ref.split('/') : [String(entry.n), ref];
        if (answer === undefined ? earned(i) : values[i].trim() !== '' && (ok[i] || contains(values[i], answer))) flags.push(subFlag('done-' + page + ':n' + k, id));
      }
    } else if (cell === '-') return;
    else if (cell === '') { if (earned(i)) flags.push(own(i)); }
    else if (earned(i)) {
      const [k, id] = cell.includes('/') ? cell.split('/') : [String(entry.n), cell];
      flags.push(subFlag('done-' + page + ':n' + k, id));
    }
  });
  return flags;
}

export function creditPractice(exerciseId: string, _rows: {answer: string}[], ok: boolean[], values: string[]): number {
  const flags = practiceFlags(exerciseId, ok, values);
  return recordFlags(lessonSlug(), flags) ? flags.length : 0;
}
