import {useSyncExternalStore} from 'react';
import {getUiLanguage, subscribeUiLanguage} from '../ui-language';
export type TranslationPreference = 'auto' | 'ar' | 'en';
const KEY = 'menschen-translation-language';
function read():TranslationPreference {try{const value=localStorage.getItem(KEY);return value==='ar'||value==='en'?value:'auto';}catch{return 'auto';}}
let preference=read();
const listeners=new Set<()=>void>();
const publish=()=>listeners.forEach(fn=>fn());
subscribeUiLanguage(publish);
export function getTranslationPreference(){return preference;}
export function getTranslationLanguage(){return preference==='auto'?getUiLanguage():preference;}
export function subscribeTranslationLanguage(fn:()=>void){listeners.add(fn);return()=>{listeners.delete(fn);};}
export function setTranslationLanguage(value:TranslationPreference){if(!['auto','ar','en'].includes(value))return;preference=value;try{localStorage.setItem(KEY,value);}catch{}publish();}
window.addEventListener('storage',event=>{if(event.key===KEY||event.key===null){preference=read();publish();}});
export function useTranslationLanguage(){
 const choice=useSyncExternalStore(subscribeTranslationLanguage,getTranslationPreference,getTranslationPreference);
 const target=useSyncExternalStore(subscribeTranslationLanguage,getTranslationLanguage,getTranslationLanguage);
 return {choice,target,setTranslationLanguage};
}
