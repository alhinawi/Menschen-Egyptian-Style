import {useLayoutEffect,useMemo} from 'react';
import {ReaderContext,createReaderStore} from './components/ReaderControls';
import {BookMarkup} from './components/BookMarkup';
import {mountLesson} from './adapters/mountLesson';
import {ReaderThemes,AudioHint,CrossBookNavigation} from './components/ReaderThemes';
export default function App({nodes,initializers,config}){
 const reader=useMemo(()=>createReaderStore(),[]);
 useLayoutEffect(()=>{const dispose=mountLesson(initializers);const disconnect=reader.connect();document.documentElement.dataset.bookReady='true';return()=>{delete document.documentElement.dataset.bookReady;disconnect();dispose()}},[initializers]);
 return <ReaderContext.Provider value={reader}><BookMarkup nodes={nodes}/>{config.themes&&<><ReaderThemes/><AudioHint/><CrossBookNavigation/></>}</ReaderContext.Provider>;
}
