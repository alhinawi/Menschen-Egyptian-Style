import {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {ScanDialogs} from './scan/ScanDialogs';
import {PersistenceContext, usePersistenceController} from './persistence/PersistentFields';
import {MeaningDialog} from './meanings/MeaningDialog';
import {QuizContext, createQuizStore} from './exercises/QuizState';
import {ReaderContext, createReaderStore} from './components/ReaderControls';
import {BookMarkup} from './components/BookMarkup';
import {FilmMedia, prepareFilmMedia} from './components/FilmMedia';
import {mountLesson} from './adapters/mountLesson';
import {ReaderThemes, CrossBookNavigation} from './components/ReaderThemes';
import {LibraryNav} from './components/LibraryNav';
import {LessonHop} from './components/LessonHop';
import type {LoadedLesson} from './navigate';
import {lessonUrl, loadLesson, navigateLesson, registerNavigator, slugFromLocation, slugToFile, applyRouteMeta} from './navigate';

export default function App({initial}: {initial: LoadedLesson}) {
  const [lesson, setLesson] = useState(initial);
  const lessonRef = useRef(lesson);
  lessonRef.current = lesson;
  const mountedResolvers = useRef<Array<() => void>>([]);
  const cleanupRef = useRef<(() => void) | null>(null);
  const persistence = usePersistenceController();
  const quizzes = useMemo(() => createQuizStore(), []);
  const reader = useMemo(() => createReaderStore(), []);
  const {nodes, initializers, config} = lesson;
  const film = useMemo(()=>prepareFilmMedia(nodes),[nodes]);

  // In-app lesson switching: fetch the target lesson, push its URL, swap the
  // mounted lesson. Resolves once the new lesson's adapters are live.
  useEffect(() => {
    registerNavigator(async (slug, token, opts) => {
      if (slug === lessonRef.current.config.slug) {
        if (token) {
          const idx = (window as any).menschenPages?.findIndex?.((p: HTMLElement) => p?.dataset?.page === token) ?? -1;
          if (idx >= 0) (window as any).menschenBook?.turnToPage?.(idx);
          history.pushState({}, '', lessonUrl(slug, token));
        }
        return;
      }
      const next = await loadLesson(slug);
      applyRouteMeta(slugToFile[next.config.slug] ?? 'index.html');
      // Tear the old lesson down before the DOM swap: adapters restore the
      // page elements they moved, so React can cleanly unmount the old tree.
      cleanupRef.current?.();
      const url = lessonUrl(next.config.slug, token);
      if (opts.replace) history.replaceState({}, '', url);
      else history.pushState({}, '', url);
      await new Promise<void>(resolve => {
        mountedResolvers.current.push(resolve);
        setLesson(next);
      });
    });
    const onPop = () => {
      navigateLesson(slugFromLocation(), location.hash.slice(1) || undefined, {replace: true});
    };
    window.addEventListener('popstate', onPop);
    return () => {
      registerNavigator(null);
      window.removeEventListener('popstate', onPop);
    };
  }, []);

  useLayoutEffect(() => {
    const dispose = mountLesson(initializers);
    const disconnect = reader.connect();
    const disconnectQuiz = quizzes.connect(dispose.exercise);
    const disconnectPersistence = persistence.connect(dispose.persistence);
    document.documentElement.dataset.bookReady = 'true';
    const resolvers = mountedResolvers.current;
    mountedResolvers.current = [];
    resolvers.forEach(fn => fn());
    let cleaned = false;
    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      delete document.documentElement.dataset.bookReady;
      disconnectPersistence();
      disconnectQuiz();
      disconnect();
      dispose();
    };
    cleanupRef.current = cleanup;
    return cleanup;
  }, [initializers]);
  return <ReaderContext.Provider value={reader}>{config.slug === 'ab-a12-l17-20' && <ScanDialogs/>}{config.initializers.includes('meanings') && <MeaningDialog key={'m' + config.slug}/>}<PersistenceContext.Provider value={persistence}><QuizContext.Provider value={quizzes}><div key={config.slug} style={{display: 'contents'}} onInputCapture={e => persistence.input(e.target as HTMLInputElement)}><BookMarkup nodes={film.nodes} quizEnabled={config.reactExercises}/></div></QuizContext.Provider></PersistenceContext.Provider><FilmMedia key={config.slug} media={film.media}/>{config.themes && <><ReaderThemes key={'t' + config.slug}/><CrossBookNavigation key={'c' + config.slug}/></>}{config.reader && <><LibraryNav slug={config.slug}/><LessonHop slug={config.slug}/></>}</ReaderContext.Provider>;
}
