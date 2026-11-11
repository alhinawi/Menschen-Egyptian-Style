import {useLayoutEffect,useMemo} from 'react';
import {PersistenceContext,usePersistenceController} from './persistence/PersistentFields';
import {MeaningDialog} from './meanings/MeaningDialog';
import {QuizContext,createQuizStore} from './exercises/QuizState';
import {ReaderContext,createReaderStore} from './components/ReaderControls';
import {BookMarkup} from './components/BookMarkup';
import {mountLesson} from './adapters/mountLesson';
import {ReaderThemes,AudioHint,CrossBookNavigation} from './components/ReaderThemes';
export default function App({nodes,initializers,config}){
 const persistence=usePersistenceController();
 const quizzes=useMemo(()=>createQuizStore(),[]);
 const reader=useMemo(()=>createReaderStore(),[]);
 useLayoutEffect(()=>{const dispose=mountLesson(initializers);const disconnect=reader.connect();const disconnectQuiz=quizzes.connect(dispose.exercise);const disconnectPersistence=persistence.connect(dispose.persistence);document.documentElement.dataset.bookReady='true';return()=>{delete document.documentElement.dataset.bookReady;disconnectPersistence();disconnectQuiz();disconnect();dispose()}},[initializers]);
 return <ReaderContext.Provider value={reader}>{config.initializers.includes('meanings')&&<MeaningDialog/>}<PersistenceContext.Provider value={persistence}><QuizContext.Provider value={quizzes}><div style={{display:'contents'}} onInputCapture={e=>persistence.input(e.target)}><BookMarkup nodes={nodes} quizEnabled={config.reactExercises}/></div></QuizContext.Provider></PersistenceContext.Provider>{config.themes&&<><ReaderThemes/><AudioHint/><CrossBookNavigation/></>}</ReaderContext.Provider>;
}
