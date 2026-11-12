// Library structure for the slide-out navigation: books, levels, lessons and
// every page each module renders. Page numbers are the printed Seite numbers,
// in the exact order the modules render them.
export interface LessonInfo {
  label: string;
  short: string;
  pages: number[];
}

export interface ModuleInfo {
  slug: string;
  book: 'kb' | 'ab';
  level: 'A1.1' | 'A1.2';
  lessons: LessonInfo[];
  extras: number[];
}

const range = (from: number, to: number): number[] =>
  Array.from({length: to - from + 1}, (_, i) => from + i);

const lesson = (n: number | string, pages: number[]): LessonInfo => ({
  label: typeof n === 'number' ? `Lektion ${n}` : n,
  short: typeof n === 'number' ? `L${n}` : 'MP',
  pages,
});

export const MODULE_ORDER: string[] = [
  'index', 'l2-3', 'l4-6', 'l7-9', 'l10-12',
  'kb-a12-l13-16', 'kb-a12-l17-20', 'l21-24',
  'ab1', 'ab2', 'ab3', 'abm1', 'ab4-6', 'ab-l7-9', 'ab-l10-12',
  'ab-a12-l13-16', 'ab-a12-l17-20', 'ab-a12-l21-24',
];

export const MODULES: Record<string, ModuleInfo> = {
  'index': {slug: 'index', book: 'kb', level: 'A1.1', lessons: [lesson(1, range(9, 12))], extras: []},
  'l2-3': {slug: 'l2-3', book: 'kb', level: 'A1.1', lessons: [lesson(2, range(13, 16)), lesson(3, range(17, 20)), lesson('Modul-Plus', range(21, 24))], extras: []},
  'l4-6': {slug: 'l4-6', book: 'kb', level: 'A1.1', lessons: [lesson(4, range(25, 28)), lesson(5, range(29, 32)), lesson(6, range(33, 36)), lesson('Modul-Plus', range(37, 40))], extras: []},
  'l7-9': {slug: 'l7-9', book: 'kb', level: 'A1.1', lessons: [lesson(7, range(41, 44)), lesson(8, range(45, 48)), lesson(9, range(49, 52)), lesson('Modul-Plus', range(53, 56))], extras: []},
  'l10-12': {slug: 'l10-12', book: 'kb', level: 'A1.1', lessons: [lesson(10, range(57, 60)), lesson(11, range(61, 64)), lesson(12, range(65, 68)), lesson('Modul-Plus', range(69, 72))], extras: [73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96]},
  'kb-a12-l13-16': {slug: 'kb-a12-l13-16', book: 'kb', level: 'A1.2', lessons: [lesson(13, range(9, 12)), lesson(14, range(13, 16)), lesson(15, range(17, 20)), lesson('Modul-Plus', range(21, 24)), lesson(16, range(25, 28))], extras: []},
  'kb-a12-l17-20': {slug: 'kb-a12-l17-20', book: 'kb', level: 'A1.2', lessons: [lesson(17, range(29, 32)), lesson(18, range(33, 36)), lesson(19, range(37, 40)), lesson(20, range(41, 44)), lesson('Modul-Plus', range(45, 48))], extras: []},
  'l21-24': {slug: 'l21-24', book: 'kb', level: 'A1.2', lessons: [lesson(21, range(49, 52)), lesson(22, range(53, 56)), lesson(23, range(57, 60)), lesson(24, range(61, 64)), lesson('Modul-Plus', range(65, 68))], extras: [69, 70, 71, 72, 73, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88]},
  'ab1': {slug: 'ab1', book: 'ab', level: 'A1.1', lessons: [lesson(1, range(6, 11))], extras: []},
  'ab2': {slug: 'ab2', book: 'ab', level: 'A1.1', lessons: [lesson(2, range(12, 17))], extras: []},
  'ab3': {slug: 'ab3', book: 'ab', level: 'A1.1', lessons: [lesson(3, range(18, 23))], extras: []},
  'abm1': {slug: 'abm1', book: 'ab', level: 'A1.1', lessons: [lesson('Modul-Plus 1', range(24, 28))], extras: []},
  'ab4-6': {slug: 'ab4-6', book: 'ab', level: 'A1.1', lessons: [lesson(4, range(30, 35)), lesson(5, range(36, 41)), lesson(6, range(42, 47)), lesson('Modul-Plus', range(48, 53))], extras: []},
  'ab-l7-9': {slug: 'ab-l7-9', book: 'ab', level: 'A1.1', lessons: [lesson(7, range(54, 59)), lesson(8, range(60, 65)), lesson(9, range(66, 71)), lesson('Modul-Plus', range(72, 77))], extras: []},
  'ab-l10-12': {slug: 'ab-l10-12', book: 'ab', level: 'A1.1', lessons: [lesson(10, range(78, 83)), lesson(11, range(84, 89)), lesson(12, range(90, 95)), lesson('Modul-Plus', range(96, 101))], extras: []},
  'ab-a12-l13-16': {slug: 'ab-a12-l13-16', book: 'ab', level: 'A1.2', lessons: [lesson(13, range(6, 11)), lesson(14, range(12, 17)), lesson(15, range(18, 23)), lesson(16, range(24, 29)), lesson('Modul-Plus', range(30, 35))], extras: []},
  'ab-a12-l17-20': {slug: 'ab-a12-l17-20', book: 'ab', level: 'A1.2', lessons: [lesson(17, range(36, 41)), lesson(18, range(42, 47)), lesson(19, range(48, 53)), lesson(20, range(54, 59)), lesson('Modul-Plus', range(60, 65))], extras: []},
  'ab-a12-l21-24': {slug: 'ab-a12-l21-24', book: 'ab', level: 'A1.2', lessons: [lesson(21, range(66, 71)), lesson(22, range(72, 77)), lesson(23, range(78, 83)), lesson(24, range(84, 89)), lesson('Modul-Plus', range(90, 95))], extras: range(96, 105)},
};

export interface BookInfo {
  id: 'kb' | 'ab';
  title: string;
  subtitle: string;
  cover: string;
}

export const BOOKS: BookInfo[] = [
  {id: 'kb', title: 'Kursbuch', subtitle: 'Coursebook · 24 Lektionen', cover: 'assets/kb-a11-cover.jpg'},
  {id: 'ab', title: 'Arbeitsbuch', subtitle: 'Workbook · 24 Lektionen', cover: 'assets/ab-a11-cover.jpg'},
];

export interface LessonEntry extends LessonInfo {
  slug: string;
}

/** Every lesson of one book level, across its modules, in reading order. */
export function levelLessons(book: 'kb' | 'ab', level: 'A1.1' | 'A1.2'): LessonEntry[] {
  const out: LessonEntry[] = [];
  for (const slug of MODULE_ORDER) {
    const mod = MODULES[slug];
    if (!mod || mod.book !== book || mod.level !== level) continue;
    for (const l of mod.lessons) out.push({...l, slug});
  }
  return out;
}

/** Modules that carry extra (Anhang) pages for one book level. */
export function levelExtras(book: 'kb' | 'ab', level: 'A1.1' | 'A1.2'): LessonEntry[] {
  return MODULE_ORDER.filter(slug => {
    const mod = MODULES[slug];
    return mod && mod.book === book && mod.level === level && mod.extras.length > 0;
  }).map(slug => ({label: 'Extras', short: 'Extras', pages: MODULES[slug]!.extras, slug}));
}

/** Ordered page tokens a module renders: 'cover' first on the index module. */
export function modulePages(slug: string): string[] {
  const mod = MODULES[slug];
  if (!mod) return [];
  const pages = mod.lessons.flatMap(l => l.pages).concat(mod.extras).map(String);
  if (slug === 'index') return ['cover', 'howto', ...pages];
  if (slug === 'ab1') return ['abcover', ...pages];
  return pages;
}

export function lessonUrl(entry: LessonEntry): string {
  return `${entry.slug}.html#${entry.pages[0]}`;
}

/** The module that renders a given printed page of a book level. */
export function findModuleForPage(book: 'kb' | 'ab', level: 'A1.1' | 'A1.2', page: number): ModuleInfo | null {
  for (const slug of MODULE_ORDER) {
    const mod = MODULES[slug];
    if (!mod || mod.book !== book || mod.level !== level) continue;
    if (mod.lessons.some(l => l.pages.includes(page)) || mod.extras.includes(page)) return mod;
  }
  return null;
}

/** The lesson inside a module that contains a printed page (null for cover/extras). */
export function lessonForPage(mod: ModuleInfo, page: number): LessonInfo | null {
  return mod.lessons.find(l => l.pages.includes(page)) ?? null;
}
