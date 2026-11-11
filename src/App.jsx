import {useLayoutEffect} from 'react';
import {BookMarkup} from './components/BookMarkup';
import {mountLesson} from './adapters/mountLesson';
import {ReaderThemes,AudioHint,CrossBookNavigation} from './components/ReaderThemes';
export default function App({nodes,initializers,config}){
 useLayoutEffect(()=>{const dispose=mountLesson(initializers);document.documentElement.dataset.bookReady='true';return()=>{delete document.documentElement.dataset.bookReady;dispose()}},[initializers]);
 return <><BookMarkup nodes={nodes}/>{config.themes&&<><ReaderThemes/><AudioHint/><CrossBookNavigation/></>}</>;
}
