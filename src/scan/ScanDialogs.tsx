import {useRef, useState, useSyncExternalStore, useEffect} from 'react';
import {createPortal, flushSync} from 'react-dom';
import {scanStore} from './scanStore';
import type {ScanExercise, VocabItem} from './scanStore';

const norm = (s: unknown): string => {
  const t = String(s).normalize('NFC').toLocaleLowerCase('de').trim();
  if (/^[.!?]+$/.test(t)) return t;
  return t.replace(/[.!?]+$/, '').replace(/[„“"']/g, '').replace(/\s*\/\s*/g, '/').replace(/\s+/g, ' ');
};

function closeBackdrop(e: React.MouseEvent<HTMLDialogElement>): void {
  if (e.target !== e.currentTarget) return;
  const r = e.currentTarget.getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) e.currentTarget.close();
}

interface ExerciseResult {
  statuses: boolean[];
  passed: number;
  ok: boolean;
}

function Exercise({exercise: e, values}: {exercise: ScanExercise; values: Record<string, unknown>}) {
  const [result, setResult] = useState<ExerciseResult | null>(null);
  const [reveal, setReveal] = useState(false);
  const input = (el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, i: number) => {
    scanStore.save({[e.id + '-' + i]: el.value}, e.id);
    setResult(null);
  };
  function submit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const statuses = [...event.currentTarget.querySelectorAll<HTMLInputElement | HTMLSelectElement>('[data-field]')].map(el => el.dataset.answer!.split('|').some(a => norm(a) === norm(el.value)));
    const passed = statuses.filter(Boolean).length;
    flushSync(() => {
      setResult({statuses, passed, ok: passed === statuses.length});
      scanStore.save({['done-' + e.id]: passed === statuses.length});
    });
  }
  return <section className="exercise" data-exercise={e.id}><h2><span className="number">{e.number}</span>{e.title}</h2>{e.note && <p className="note">{e.note}</p>}{e.rows.length ? <form data-id={e.id} onSubmit={submit}>{e.rows.map((r, i) => {
    const props = {'aria-label': r.label, 'data-field': i, 'data-answer': r.answer, className: result ? (result.statuses[i] ? 'correct' : 'wrong') : '', onInput: (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => input(event.currentTarget, i)};
    return <label key={i}><span>{r.label}</span>{e.choices ? <select {...props} defaultValue={(values[e.id + '-' + i] as string) || ''}><option value="">…</option>{e.choices.map(c => <option key={c}>{c}</option>)}</select> : <input {...props} defaultValue={(values[e.id + '-' + i] as string) || ''} autoComplete="off" spellCheck="false"/>}</label>;
  })}<div className="actions"><button className="check">Prüfen ✓</button><button className="reveal" type="button" onClick={() => setReveal(v => !v)}>{reveal ? 'Lösung ausblenden' : 'Lösung ansehen'}</button></div><p className={'feedback' + (result ? (result.ok ? ' good' : ' retry') : '')} role="status">{result ? (result.ok ? '✓ Richtig! · كل الإجابات صح' : result.passed + ' / ' + e.rows.length + ' richtig · راجع الخانات اللي بالأحمر') : ''}</p><div className="answerList" hidden={!reveal}>{e.rows.map((r, i) => <div key={i}>{r.label}<br/><b>{r.answer.split('|')[0]}</b></div>)}</div></form> : <label><span>Meine Notizen / إجابتي</span><textarea data-note={e.id} aria-label={e.title} defaultValue={(values['note-' + e.id] as string) || ''} onInput={event => scanStore.save({['note-' + e.id]: event.currentTarget.value})}/></label>}</section>;
}

export function ScanDialogs() {
  const s = useSyncExternalStore(scanStore.subscribe, scanStore.getSnapshot, scanStore.getSnapshot);
  const practice = useRef<HTMLDialogElement>(null), vocabulary = useRef<HTMLDialogElement>(null), original = useRef<HTMLDialogElement>(null), audio = useRef<HTMLAudioElement>(null), vocabAudio = useRef<HTMLAudioElement>(null);
  const [lesson, setLesson] = useState(0), [query, setQuery] = useState(''), [track, setTrack] = useState<number | null>(null), [clip, setClip] = useState<VocabItem | null>(null), [notice, setNotice] = useState('');
  const page = s.page;
  function stopTrack(): void {
    audio.current?.pause();
    setTrack(null);
  }
  function stopClip(): void {
    vocabAudio.current?.pause();
    setClip(null);
  }
  function playTrack(n: number): void {
    stopClip();
    setTrack(n);
    const el = audio.current!;
    el.src = 'assets/ab-a12-track' + n + '.mp3';
    el.play().catch(() => setNotice('اضغط تشغيل في مشغّل الصوت'));
  }
  function playClip(v: VocabItem): void {
    stopTrack();
    setClip(v);
    const el = vocabAudio.current!;
    el.src = 'assets/ab1720-pronunciation/' + v.id + '.mp3';
    el.play().catch(() => setNotice('اضغط تشغيل في مشغّل الصوت'));
  }
  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => setNotice(''), 3500);
    return () => clearTimeout(id);
  }, [notice]);
  useEffect(() => {
    const bind = (id: string, fn: () => void) => {
      const el = document.getElementById(id);
      el?.addEventListener('click', fn);
      return () => el?.removeEventListener('click', fn);
    };
    const clean = [
      bind('practiceButton', () => {window.ab1720.renderPractice(); practice.current!.showModal(); practice.current!.scrollTop = 0;}),
      bind('vocabButton', () => {window.ab1720.renderPractice(); const p = window.ab1720.data[window.menschenBook.getCurrentPageIndex()]; setLesson(p.lesson); setQuery(''); vocabulary.current!.showModal();}),
      bind('originalButton', () => {window.ab1720.renderPractice(); original.current!.showModal(); original.current!.scrollTop = 0;})
    ];
    return () => {
      clean.forEach(fn => fn());
      audio.current?.pause();
      vocabAudio.current?.pause();
    };
  }, []);
  return createPortal(<>
    <dialog id="practice" ref={practice} onClose={stopTrack} onClick={closeBackdrop}><div className="dialogTop"><div><small id="practicePage">Arbeitsbuch · gedruckte Seite {page?.page}</small><h1 id="practiceTitle">{page?.title || 'Üben'}</h1></div><button aria-label="Schließen" className="close" data-close="practice" onClick={() => practice.current?.close()}>×</button></div><p className="intro" dir="rtl" lang="ar-EG">حلّ من الصفحة الأصلية. الإجابات والملاحظات بتتحفظ على الجهاز ده بس.</p><div id="audioTracks">{!!page?.tracks.length && <div className="trackButtons">{page.tracks.map(n => <button key={n} data-track={n} onClick={() => playTrack(n)}>▶ CD 2 · {n}</button>)}</div>}</div><div className="audioDock" hidden={!track}><span id="audioLabel">{track ? 'CD 2 · ' + track : ''}</span><audio controls id="audio" preload="none" ref={audio}/><button aria-label="Audio schließen" id="closeAudio" onClick={stopTrack}>×</button></div><div id="practiceBody">{page?.exercises.map(e => <Exercise key={s.revision + ':' + e.id} exercise={e} values={s.values}/>)}</div><p className="sourceNote">Antwortschlüssel: Hueber, Menschen A1.2 Arbeitsbuch, Lösungsschlüssel (2012). Offene Aufgaben ohne automatische Bewertung.</p></dialog>
    <dialog id="vocabulary" ref={vocabulary} onClose={stopClip} onClick={closeBackdrop}><div className="dialogTop"><div><small>A1.2 · Lektion 17-20</small><h1>Wörter &amp; Sätze <span lang="ar-EG">بالمصري</span></h1></div><button aria-label="Schließen" className="close" data-close="vocabulary" onClick={() => vocabulary.current?.close()}>×</button></div><label className="searchLabel">Suchen / دور على كلمة<input id="vocabSearch" placeholder="Wort oder معنى" type="search" value={query} onChange={e => setQuery(e.target.value)}/></label><div className="vocabFilters">{[17, 18, 19, 20, 0].map(n => <button key={n} data-lesson={n} className={lesson === n ? 'active' : ''} onClick={() => setLesson(n)}>{n || 'Alle'}</button>)}</div><div id="vocabBody">{s.vocabulary.filter(v => (!lesson || v.lesson === lesson) && (!query || norm(v.text + ' ' + v.arabic).includes(norm(query)))).map(v => <article className="vocabCard" key={v.id}><div className="de" lang="de">{v.text} <button className="pronounce" data-pronunciation={v.id} aria-label={'Aussprache: ' + v.text} onClick={() => playClip(v)}>▶ نطق</button><small>Lektion {v.lesson}</small></div><div className="ar" lang="ar-EG">{v.arabic}</div></article>)}{!s.vocabulary.some(v => (!lesson || v.lesson === lesson) && (!query || norm(v.text + ' ' + v.arabic).includes(norm(query)))) && <p>Keine Treffer / مفيش نتيجة</p>}</div><div className="vocabAudio" hidden={!clip}><span id="vocabAudioLabel">{clip?.text || ''}</span><audio controls id="vocabAudio" preload="none" ref={vocabAudio}/><button aria-label="Aussprache schließen" id="closeVocabAudio" onClick={stopClip}>×</button></div><p className="sourceNote" dir="rtl" lang="ar-EG">المعاني دي مترجمة للمذاكرة. اضغط نطق جنب الكلمة أو الجملة عشان تسمع تسجيل المذاكرة. التسجيلات الأصلية موجودة في تمارين السماع.</p></dialog>
    <dialog id="original" ref={original} onClick={closeBackdrop}><div className="dialogTop"><h1 id="originalTitle">Original · Seite {page?.page}</h1><button aria-label="Schließen" className="close" data-close="original" onClick={() => original.current?.close()}>×</button></div><img alt={page ? 'Arbeitsbuch A1.2 Seite ' + page.page : 'Originalbuchseite'} id="originalImage" src={page ? 'assets/ab-a12-p' + page.page + '.png' : undefined}/></dialog><div hidden={!notice} id="notice" role="status">{notice}</div>
  </>, document.body);
}
