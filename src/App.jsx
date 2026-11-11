import {useLayoutEffect} from 'react';
import nodes from './lessons/kb-a11-l1.json';
import {BookMarkup} from './components/BookMarkup';
import {mountLesson} from './adapters/mountLesson';
import './adapters/page-flip.js';
import glossary from './adapters/glossary';
import pronunciation from './adapters/pronunciation-index';
import units from './adapters/selection-units';
import artwork from './adapters/artwork-text';
import translations from './adapters/unit-translations';
import audio from './adapters/unit-audio';
import meanings from './adapters/meanings';
import engine from './adapters/book';
import themes from './adapters/themes';
export default function App(){
 useLayoutEffect(()=>mountLesson([glossary,pronunciation,units,artwork,translations,audio,meanings,engine,themes]),[]);
 return <BookMarkup nodes={nodes}/>;
}
