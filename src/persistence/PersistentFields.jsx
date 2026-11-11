import {createContext,createElement,useContext,useReducer,useMemo} from 'react';
export const PersistenceContext=createContext(null);
export function usePersistenceController(){
 const [values,dispatch]=useReducer((state,action)=>({...state,...action}),{});
 const controller=useMemo(()=>{let runtime=null;const fields=()=>[...document.querySelectorAll('input,select,textarea')].filter(el=>el.id!=='pageJump');const key=(el,list)=>el.dataset.note||'field-'+list.indexOf(el);
 return {read(key){return runtime?.getState()[key]},update(values){runtime?.update(values);dispatch(values)},connect(next){runtime=next;if(!runtime)return()=>{};const saved=runtime.getState(),list=fields();for(const el of list){const value=saved[key(el,list)];if(el.type==='radio'||el.type==='checkbox')el.checked=value===true;else if(value!==undefined)el.value=value}dispatch(saved);return()=>{runtime=null}},input(el){if(!runtime)return;const list=fields();if(!list.includes(el))return;const updates={[key(el,list)]:(el.type==='radio'||el.type==='checkbox')?el.checked:el.value};if(el.type==='radio')for(const peer of list.filter(p=>p!==el&&p.name===el.name&&p.type==='radio'))updates[key(peer,list)]=false;runtime.update(updates);dispatch(updates)}}},[]);
 return controller;
}
export function PersistentField({tag,attrs,children}){const controller=useContext(PersistenceContext);return createElement(tag,attrs,...children)}
