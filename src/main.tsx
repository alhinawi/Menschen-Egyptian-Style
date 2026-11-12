import {createRoot} from 'react-dom/client';
import App from './App';
import manifest from './lessons/manifest.json';
import './adapters/page-flip';
import './tailwind.gen.css';
import type {LessonConfig, MarkupNode} from './types/book';
import type {LessonInitializer} from './types/runtime';

const pages = import.meta.glob<{default: MarkupNode[]}>(['./lessons/*.json', '!./lessons/manifest.json']);
const adapters = import.meta.glob<{default: LessonInitializer}>(['./adapters/**/*.ts', '!./adapters/mountLesson.ts', '!./adapters/page-flip.ts']);

async function start(): Promise<void> {
  const filename = decodeURIComponent(location.pathname.split('/').pop() || '') || 'index.html';
  const configs = manifest as unknown as Record<string, LessonConfig>;
  const config = configs[filename] ?? configs['index.html'];
  await Promise.all(config.styles.map(href => new Promise<void>((resolve, reject) => {
    const el = document.createElement('link');
    el.rel = 'stylesheet';
    el.href = href;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error('Failed to load stylesheet: ' + href));
    document.head.append(el);
  })));
  const [data, ...modules] = await Promise.all([
    pages['./lessons/' + config.slug + '.json']!(),
    ...config.initializers.map(name => adapters['./adapters/' + name + '.ts']!())
  ]);
  for (const [key, value] of Object.entries(config.bodyAttrs ?? {})) document.body.setAttribute(key, Array.isArray(value) ? value.join(' ') : value);
  createRoot(document.getElementById('react-book-root')!).render(<App nodes={data.default} initializers={modules.map(m => m.default)} config={config}/>);
}
start().catch(error => {
  console.error(error);
  document.getElementById('react-book-root')!.textContent = 'تعذّر فتح الدرس. جرّب تحديث الصفحة.';
});
