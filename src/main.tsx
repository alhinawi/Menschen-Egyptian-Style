import './answer-cross';
import {createRoot} from 'react-dom/client';
import App from './App';
import './adapters/page-flip';
import {installSeekableAudio} from './audio-bootstrap';

installSeekableAudio();
import {configs, loadLesson, applyRouteMeta} from './navigate';
import './tailwind.gen.css';
import './reader-fonts.css';

async function start() {
  const file = location.pathname.split('/').pop() || 'index.html';
  const normalizedFile = configs[file] ? file : configs[file + '.html'] ? file + '.html' : 'index.html';
  applyRouteMeta(normalizedFile);
  // A coordinate canvas must not paint once with a wider device fallback.
  const [lesson] = await Promise.all([
    loadLesson(configs[normalizedFile].slug),
    Promise.all(['18px', 'bold 18px', 'italic 18px', 'bold italic 18px'].map(style =>
      document.fonts.load(`${style} "Times New Roman"`).catch(() => [])
    )),
  ]);
  createRoot(document.getElementById('react-book-root')!).render(<App initial={lesson}/>);
}
start().catch(error => {
  console.error(error);
  document.getElementById('react-book-root')!.textContent = 'تعذّر فتح الدرس. جرّب تحديث الصفحة.';
});
