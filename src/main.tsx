import {installUiLanguage} from './ui-language';
import './ui-language.css';
import './answer-cross';
import {createRoot} from 'react-dom/client';
import App from './App';
import './adapters/page-flip';
import {installSeekableAudio} from './audio-bootstrap';
import {installTtsMode} from './tts-audio';

installUiLanguage();
installSeekableAudio();
installTtsMode();
import {configs, loadLesson, applyRouteMeta} from './navigate';
import './tailwind.gen.css';
import './reader-fonts.css';

async function start() {
  const file = location.pathname.split('/').pop() || 'index.html';
  // The teacher dashboard is its own page: no lesson loads here. Cloudflare
  // Pages 308-redirects /teacher.html to the pretty /teacher URL, so match both.
  if (file === 'teacher.html' || file === 'teacher') {
    applyRouteMeta('teacher.html');
    const {default: TeacherDashboard} = await import('./teacher/TeacherDashboard');
    createRoot(document.getElementById('react-book-root')!).render(<TeacherDashboard/>);
    return;
  }
  const normalizedFile = configs[file] ? file : configs[file + '.html'] ? file + '.html' : 'index.html';
  // Unknown book routes must not silently open the first book.
  if (!configs[file] && !configs[file + '.html'] && /^(ab|kb)-/.test(file.replace(/\.html$/, ''))) {
    applyRouteMeta('index.html');
    document.getElementById('react-book-root')!.innerHTML = '<div style="max-width:26rem;margin:4rem auto;padding:0 1.5rem;text-align:center;font-family:system-ui,sans-serif"><p style="font-size:1.25rem">\u0627\u0644\u0635\u0641\u062d\u0629 \u062f\u064a \u0645\u0634 \u0645\u0648\u062c\u0648\u062f\u0629 \u00b7 Seite nicht gefunden</p><p><a href="/">\u0641\u062a\u062d \u0627\u0644\u0645\u0643\u062a\u0628\u0629</a></p></div>';
    return;
  }
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
