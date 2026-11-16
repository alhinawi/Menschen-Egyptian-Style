import manifest from './lessons/manifest.json';
import {kb11Pages} from './native-kb11/registry';
import {scanData} from './scan-data/registry';
import {prepareNativeComponents} from './components/nativeComponents';
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
  document.documentElement.toggleAttribute('data-bookcss', !!config.bookcss);
  document.documentElement.toggleAttribute('data-batchcss', !!config.batchcss);
  document.documentElement.toggleAttribute('data-l1012css', !!config.l1012css);
  document.documentElement.toggleAttribute('data-l79css', !!config.l79css);
  document.documentElement.toggleAttribute('data-l46css', !!config.l46css);
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

// Preparation is route-neutral: no history, body attributes, or style activation.
const prepared = new Map<string, Promise<LoadedLesson>>();
function prepareLesson(slug: string): Promise<LoadedLesson> {
  const config = configs[slugToFile[slug]] ?? configs['index.html'];
  let request = prepared.get(config.slug);
  if (!request) {
    request = Promise.all([
      pages['./lessons/' + config.slug + '.json']!().then(async data => {
        await prepareNativeComponents(data.default);
        return data;
      }),
      ...config.initializers.map(name => adapterModules['./adapters/' + name + '.ts']!()),
    ]).then(([data, ...modules]) => ({nodes: data.default as MarkupNode[], initializers: modules.map(m => m.default as LessonInitializer), config}));
    prepared.set(config.slug, request);
    void request.catch(() => prepared.delete(config.slug));
  }
  return request;
}
const warmedStyles = new Set<string>();
const warmedImages = new Map<string, HTMLImageElement>();
function warmImages(nodes: MarkupNode[], token?: string) {
  const sections: MarkupNode[][] = [];
  const collect = (items: MarkupNode[]) => {for (const n of items) {if(typeof n==='string')continue;if(n[0]==='section'&&n[1]['data-page'])sections.push([n]);else collect(n[2]);}};
  collect(nodes);
  let index = sections.findIndex(s => typeof s[0]!=='string' && s[0][1]['data-page']===token);
  if(index<0) index=sections.findIndex(s => typeof s[0]!=='string' && /^\d+$/.test(s[0][1]['data-page']));
  const urls = new Set<string>();
  const walk = (items: MarkupNode[]) => {for(const n of items){if(typeof n==='string')continue;const [tag,attrs,children]=n;
    if(tag==='img'&&attrs.src)urls.add(attrs.src);
    const data=tag==='NativeKb11'?kb11Pages[attrs.page]:tag==='HybridScan'?scanData[attrs.book+':'+attrs.page]:undefined;
    if(data){for(const art of ('art' in data ? data.art : []) as {src:string}[])urls.add(art.src);if('image' in data&&typeof data.image==='string')urls.add(data.image);}
    walk(children);
  }};
  for(const section of sections.slice(Math.max(0,index),Math.max(0,index)+2))walk(section);
  const decodes:Promise<unknown>[]=[];
  for(const url of [...urls].slice(0,48)){if(warmedImages.has(url)){decodes.push(warmedImages.get(url)!.decode().catch(()=>{}));continue;}const image=new Image();image.decoding='async';image.src=url;warmedImages.set(url,image);decodes.push(image.decode().catch(()=>{}));}
  // Bound retained decoded images during a long study session.
  while(warmedImages.size>96)warmedImages.delete(warmedImages.keys().next().value!);
  return Promise.all(decodes).then(()=>{});
}
export function prefetchLesson(slug: string, token?: string): Promise<void> {
  const connection=(navigator as Navigator & {connection?:{saveData?:boolean;effectiveType?:string}}).connection;
  if(connection?.saveData||connection?.effectiveType==='2g'||connection?.effectiveType==='slow-2g')return Promise.resolve();
  const config=configs[slugToFile[slug]];
  for(const href of config?.styles??[]){if(warmedStyles.has(href))continue;const link=document.createElement('link');link.rel='preload';link.as='style';link.href=href;document.head.append(link);warmedStyles.add(href);}
  return prepareLesson(slug).then(lesson => warmImages(lesson.nodes, token)).catch(()=>{});
}
// Chosen destinations prepare even with Save Data enabled: this is demand,
// not speculation. Keep the outgoing live page while cold chunks/art arrive.
export async function prepareDestination(slug:string,token?:string):Promise<void>{
  const lesson=await prepareLesson(slug);
  await warmImages(lesson.nodes,token);
}
export async function loadLesson(slug: string): Promise<LoadedLesson> {
  const config = configs[slugToFile[slug]] ?? configs['index.html'];
  const [lesson] = await Promise.all([prepareLesson(slug), ensureStyles(config)]);
  applyBodyAttrs(config);
  return lesson;
}

export function lessonUrl(slug: string, token?: string): string {
  return `${slugToFile[slug] ?? slug + '.html'}${token ? '#' + token : ''}`;
}

export function slugFromLocation(): string {
  const file = location.pathname.split('/').pop() || 'index.html';
  return fileToSlug[file] ?? fileToSlug[file + '.html'] ?? 'index';
}

// The App registers the live handler; without one (should not happen on a
// reader page) navigation degrades to a full document load. rawUrl carries an
// exact path+query+hash to push (viewer links need their ?page=N preserved).
type NavigateHandler = (slug: string, token: string | undefined, opts: {replace?: boolean; rawUrl?: string}) => Promise<void>;
let handler: NavigateHandler | null = null;
export function registerNavigator(h: NavigateHandler | null) { handler = h; }
export async function navigateLesson(slug: string, token?: string, opts: {replace?: boolean; rawUrl?: string} = {}): Promise<void> {
  if (handler) return handler(slug, token, opts);
  location.assign(opts.rawUrl ?? lessonUrl(slug, token));
}

/**
 * Resolve a same-app href (e.g. 'l7-9.html#41', 'original-viewer.html?page=9',
 * or an absolute URL) to its lesson slug, page token and exact target URL.
 * Returns null for external or unknown targets - callers keep default
 * behavior (full navigation / no preventDefault) for those.
 */
export function resolveHref(href: string): {slug: string; token: string | undefined; rawUrl: string} | null {
  let url: URL;
  try { url = new URL(href, location.href); } catch { return null; }
  if (url.origin !== location.origin) return null;
  const file = url.pathname.split('/').pop() || 'index.html';
  const slug = fileToSlug[file] ?? fileToSlug[file + '.html'];
  if (!slug) return null;
  return {slug, token: url.hash.slice(1) || undefined, rawUrl: file + url.search + url.hash};
}

/**
 * Route a same-app href (e.g. 'l7-9.html#41', 'index.html', or an absolute
 * URL) through the SPA navigator instead of a full document load. Returns
 * true when the href resolved to a known lesson and was handled in-app;
 * callers fall back to their old behavior on false.
 */
export async function navigateHref(href: string, opts: {replace?: boolean} = {}): Promise<boolean> {
  const resolved = resolveHref(href);
  if (!resolved) return false;
  await navigateLesson(resolved.slug, resolved.token, {...opts, rawUrl: resolved.rawUrl});
  return true;
}

/** Per-route document meta, applied on boot and on in-app navigation. */
import routeMeta from './route-meta.json';
type RouteMeta = {title: string; ogTitle: string; description: string; ogImage: string};
const metas = routeMeta as unknown as Record<string, RouteMeta>;
export function applyRouteMeta(file: string): void {
  const m = metas[file] ?? metas['index.html'];
  if (!m) return;
  const url = 'https://menscheny.pages.dev/' + (file === 'index.html' ? '' : file);
  const image = 'https://menscheny.pages.dev/' + m.ogImage;
  document.title = m.title;
  const set = (selector: string, value: string) => {
    document.head.querySelector(selector)?.setAttribute('content', value);
  };
  set('meta[name="description"]', m.description);
  set('meta[property="og:title"]', m.ogTitle);
  set('meta[property="og:description"]', m.description);
  set('meta[property="og:url"]', url);
  set('meta[property="og:image"]', image);
  set('meta[name="twitter:title"]', m.ogTitle);
  set('meta[name="twitter:description"]', m.description);
  set('meta[name="twitter:image"]', image);
  document.head.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
}
