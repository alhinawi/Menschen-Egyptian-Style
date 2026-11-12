import {useLayoutEffect, useMemo} from 'react';
import {ScanDialogs} from './scan/ScanDialogs';
import {PersistenceContext, usePersistenceController} from './persistence/PersistentFields';
import {MeaningDialog} from './meanings/MeaningDialog';
import {QuizContext, createQuizStore} from './exercises/QuizState';
import {ReaderContext, createReaderStore} from './components/ReaderControls';
import {BookMarkup} from './components/BookMarkup';
import {mountLesson} from './adapters/mountLesson';
import {ReaderThemes, AudioHint, CrossBookNavigation} from './components/ReaderThemes';
import {LibraryNav} from './components/LibraryNav';
import {LessonHop} from './components/LessonHop';
import type {LessonConfig, MarkupNode} from './types/book';
import type {LessonInitializer} from './types/runtime';

interface AppProps {
  nodes: MarkupNode[];
  initializers: LessonInitializer[];
  config: LessonConfig;
}

export default function App({nodes, initializers, config}: AppProps) {
  const persistence = usePersistenceController();
  const quizzes = useMemo(() => createQuizStore(), []);
  const reader = useMemo(() => createReaderStore(), []);
  useLayoutEffect(() => {
    const dispose = mountLesson(initializers);
    const disconnect = reader.connect();
    const disconnectQuiz = quizzes.connect(dispose.exercise);
    const disconnectPersistence = persistence.connect(dispose.persistence);
    document.documentElement.dataset.bookReady = 'true';
    return () => {
      delete document.documentElement.dataset.bookReady;
      disconnectPersistence();
      disconnectQuiz();
      disconnect();
      dispose();
    };
  }, [initializers]);
  return <ReaderContext.Provider value={reader}>{config.slug === 'ab-a12-l17-20' && <ScanDialogs/>}{config.initializers.includes('meanings') && <MeaningDialog/>}<PersistenceContext.Provider value={persistence}><QuizContext.Provider value={quizzes}><div style={{display: 'contents'}} onInputCapture={e => persistence.input(e.target as HTMLInputElement)}><BookMarkup nodes={nodes} quizEnabled={config.reactExercises}/></div></QuizContext.Provider></PersistenceContext.Provider>{config.themes && <><ReaderThemes/><AudioHint/><CrossBookNavigation/></>}{config.reader && <><LibraryNav slug={config.slug}/><LessonHop slug={config.slug}/></>}</ReaderContext.Provider>;
}
