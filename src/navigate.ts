import manifest from './lessons/manifest.json';
import type {LessonConfig, MarkupNode} from './types/book';
import type {LessonInitializer} from './types/runtime';

/**
 * In-app (SPA) lesson loading and navigation. Lessons are lazy chunks; the
 * first visit loads styles + JSON + adapters for a slug, later visits reuse
 * them. Stylesheets that the previous lesson needed but the next one does
 * not are disabled so per-book rules never leak across books.
 */
const pages = import.meta.glob<{default: MarkupNode[]}>(['./lessons/*.json']);
const adapterModules = import.meta.glob<{default: LessonInitializer}>(['./adapters/*.ts']);

export const configs = manifest as unknown as Record<string, LessonConfig>;
export const slugToFile: Record<string, string> = {};
export const fileToSlug: Record<string, string> = {};
for (const [file, cfg] of Object.entries(configs)) {
  if (!(cfg.slug in slugToFile)) slugToFile[cfg.slug] = file;
  fileToSlug[file] = cfg.slug;
}

export interface LoadedLesson {
  nodes: MarkupNode[];
  initializers: LessonInitializer[];
  config: LessonConfig;
}

const loadedStyles = new Map<string, HTMLLinkElement>();
async function ensureStyles(config: LessonConfig) {
  const wanted = new Set(config.styles);
  await Promise.all(config.styles.filter(h => !loadedStyles.has(h)).map(href => new Promise<void>((resolve, reject) => {
    const el = document.createElement('link');
    el.rel = 'stylesheet';
    el.href = href;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error('Failed to load stylesheet: ' + href));
    loadedStyles.set(href, el);
    document.head.append(el);
  })));
  for (const [href, el] of loadedStyles) el.disabled = !wanted.has(href);
}

const appliedAttrs = new Set<string>();
function applyBodyAttrs(config: LessonConfig) {
  for (const key of [...appliedAttrs]) {
    if (!config.bodyAttrs || !(key in config.bodyAttrs)) document.body.removeAttribute(key);
  }
  appliedAttrs.clear();
  for (const [key, value] of Object.entries(config.bodyAttrs ?? {})) {
    document.body.setAttribute(key, Array.isArray(value) ? value.join(' ') : value);
    appliedAttrs.add(key);
  }
}

export async function loadLesson(slug: string): Promise<LoadedLesson> {
  const config = configs[slugToFile[slug]] ?? configs['index.html'];
  await ensureStyles(config);
  const [data, ...modules] = await Promise.all([
    pages['./lessons/' + config.slug + '.json']!(),
    ...config.initializers.map(name => adapterModules['./adapters/' + name + '.ts']!()),
  ]);
  applyBodyAttrs(config);
  return {nodes: data.default, initializers: modules.map(m => m.default), config};
}

export function lessonUrl(slug: string, token?: string): string {
  return `${slugToFile[slug] ?? slug + '.html'}${token ? '#' + token : ''}`;
}

export function slugFromLocation(): string {
  const file = location.pathname.split('/').pop() || 'index.html';
  return fileToSlug[file] ?? 'index';
}

// The App registers the live handler; without one (should not happen on a
// reader page) navigation degrades to a full document load.
type NavigateHandler = (slug: string, token: string | undefined, opts: {replace?: boolean}) => Promise<void>;
let handler: NavigateHandler | null = null;
export function registerNavigator(h: NavigateHandler | null) { handler = h; }
export async function navigateLesson(slug: string, token?: string, opts: {replace?: boolean} = {}): Promise<void> {
  if (handler) return handler(slug, token, opts);
  location.assign(lessonUrl(slug, token));
}
