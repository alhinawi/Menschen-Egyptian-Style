import {useEffect,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import {PAGE_RESET_EVENT} from '../exercises/usePageReset';
export function ReaderPageReset({onReset}:{onReset:(page:HTMLElement)=>void}){
 const [slot,setSlot]=useState<Element|null>(null),[page,setPage]=useState('');const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{setSlot(document.querySelector('.controls'));},[]);
 const current=()=>{const i=Number((document.querySelector('#pageJump')as HTMLSelectElement)?.value);return document.querySelectorAll<HTMLElement>('.page')[i]};
 const ask=()=>{setPage(current()?.dataset.page||'');dialog.current?.showModal()};
 const reset=()=>{const target=current();if(!target||target.dataset.page!==page){dialog.current?.close();return}onReset(target);document.dispatchEvent(new CustomEvent(PAGE_RESET_EVENT,{detail:{page}}));dialog.current?.close()};
 return <>{slot&&createPortal(<button type="button" className="pageResetTrigger" aria-label="Reset all answers on this page" title="Reset page" onClick={ask}>↺</button>,slot)}{createPortal(<dialog className="pageResetDialog" ref={dialog} aria-label="Reset page answers"><h3>Reset page {page}?</h3><p>Clear all answers and results on this page only?</p><div><button type="button" onClick={()=>dialog.current?.close()}>Cancel</button><button type="button" className="confirmPageReset" onClick={reset}>Reset</button></div></dialog>,document.body)}</>;
}
