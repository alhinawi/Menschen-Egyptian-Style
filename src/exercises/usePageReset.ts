import {useEffect,useRef} from 'react';
export const PAGE_RESET_EVENT='menschen:reset-current-page';
export function usePageReset(page:string|number,key:string,reset:()=>void){
 const callback=useRef(reset);callback.current=reset;
 useEffect(()=>{const listener=(event:Event)=>{if(String((event as CustomEvent).detail?.page)!==String(page))return;localStorage.removeItem(key);callback.current()};document.addEventListener(PAGE_RESET_EVENT,listener);return()=>document.removeEventListener(PAGE_RESET_EVENT,listener)},[page,key]);
}
