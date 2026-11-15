import {useSyncExternalStore} from 'react';
export type TranslationPreference = 'ar' | 'en' | 'de';
const KEY = 'menschen-translation-language';
function read():TranslationPreference {try{const value=localStorage.getItem(KEY);if(value==='ar'||value==='en'||value==='de')return value;localStorage.setItem(KEY,'ar');return 'ar';}catch{return 'ar';}}
let preference=read();
const listeners=new Set<()=>void>();
const publish=()=>listeners.forEach(fn=>fn());
export function getTranslationPreference(){return preference;}
export function getTranslationLanguage(){return preference;}
export function subscribeTranslationLanguage(fn:()=>void){listeners.add(fn);return()=>{listeners.delete(fn);};}
export function setTranslationLanguage(value:TranslationPreference){if(!['ar','en','de'].includes(value))return;preference=value;try{localStorage.setItem(KEY,value);}catch{}publish();}
window.addEventListener('storage',event=>{if(event.key===KEY||event.key===null){preference=read();publish();}});
export function useTranslationLanguage(){
 const choice=useSyncExternalStore(subscribeTranslationLanguage,getTranslationPreference,getTranslationPreference);
 const target=useSyncExternalStore(subscribeTranslationLanguage,getTranslationLanguage,getTranslationLanguage);
 return {choice,target,setTranslationLanguage};
}
