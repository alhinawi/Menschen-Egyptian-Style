import {useLayoutEffect,useMemo} from 'react';
import {QuizContext,createQuizStore} from './exercises/QuizState';
import {ReaderContext,createReaderStore} from './components/ReaderControls';
import {BookMarkup} from './components/BookMarkup';
import {mountLesson} from './adapters/mountLesson';
import {ReaderThemes,AudioHint,CrossBookNavigation} from './components/ReaderThemes';
export default function App({nodes,initializers,config}){
 const quizzes=useMemo(()=>createQuizStore(),[]);
 const reader=useMemo(()=>createReaderStore(),[]);
 useLayoutEffect(()=>{const dispose=mountLesson(initializers);const disconnect=reader.connect();const disconnectQuiz=quizzes.connect(dispose.exercise);document.documentElement.dataset.bookReady='true';return()=>{delete document.documentElement.dataset.bookReady;disconnectQuiz();disconnect();dispose()}},[initializers]);
 return <ReaderContext.Provider value={reader}><QuizContext.Provider value={quizzes}><BookMarkup nodes={nodes} quizEnabled={config.reactExercises}/></QuizContext.Provider>{config.themes&&<><ReaderThemes/><AudioHint/><CrossBookNavigation/></>}</ReaderContext.Provider>;
}
