import {createRoot} from 'react-dom/client';
import App from './App';
import './adapters/page-flip';
import {configs, loadLesson, slugFromLocation} from './navigate';
import './tailwind.gen.css';

async function start() {
  const config = configs[location.pathname.split('/').pop() || 'index.html'] ?? configs['index.html'];
  const lesson = await loadLesson(config?.slug ?? slugFromLocation());
  createRoot(document.getElementById('react-book-root')!).render(<App initial={lesson}/>);
}
start().catch(error => {
  console.error(error);
  document.getElementById('react-book-root')!.textContent = 'تعذّر فتح الدرس. جرّب تحديث الصفحة.';
});
