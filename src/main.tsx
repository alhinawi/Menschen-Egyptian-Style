import {createRoot} from 'react-dom/client';
import App from './App';
import './adapters/page-flip';
import {configs, loadLesson, applyRouteMeta} from './navigate';
import './tailwind.gen.css';

async function start() {
  const file = location.pathname.split('/').pop() || 'index.html';
  const normalizedFile = configs[file] ? file : configs[file + '.html'] ? file + '.html' : 'index.html';
  applyRouteMeta(normalizedFile);
  const lesson = await loadLesson(configs[normalizedFile].slug);
  createRoot(document.getElementById('react-book-root')!).render(<App initial={lesson}/>);
}
start().catch(error => {
  console.error(error);
  document.getElementById('react-book-root')!.textContent = 'تعذّر فتح الدرس. جرّب تحديث الصفحة.';
});
