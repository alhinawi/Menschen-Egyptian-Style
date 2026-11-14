import {useEffect,useState} from 'react';
import {createPortal} from 'react-dom';
import {CheckButton} from './CheckButton';
import {usePageReset} from '../exercises/usePageReset';
import type {NativePanelField,NativePanelSection} from '../native-kb11/registry';

// Writing tasks that have no printed answer lines on the book page live in a
// panel below the page (house pattern from KB11P42Answers), driven by page JSON.
const norm=(s:string)=>s.normalize('NFC').toLocaleLowerCase('de').trim().replace(/[.!?]+$/,'').replace(/\s+/g,' ');
// Grading is exact-match against the fixed official key only (with |-separated
// printed variants). Open (keyless) sections keep their fields but show no check button.
export function panelFieldOk(f:NativePanelField,value:string|undefined){
 const cur=norm(value??f.pre??'');
 if(!cur||!f.answer)return false;
 return f.answer.split('|').some(a=>norm(a)===cur);
}
export function NativeWritingPanel({page,storageKey,sections,values,onChange}:{page:string;storageKey:string;sections:NativePanelSection[];values:Record<string,string>;onChange:(id:string,value:string)=>void}){
 const [host,setHost]=useState<HTMLElement|null>(null);
 const [checked,setChecked]=useState<Record<string,boolean>>({});
 usePageReset(page,storageKey,()=>{setChecked({})});
 useEffect(()=>{
  let slot:HTMLElement|null=null;
  const update=()=>{
   const viewport=document.querySelector('#viewport');
   const audio=document.querySelector('.readerAudioPanel');
   if(viewport&&(!slot||!slot.isConnected)){
    slot=document.createElement('section');slot.className='nkbWritePanel';slot.setAttribute('aria-label','Seite '+page+' - Schreibaufgaben');
    (audio||viewport).insertAdjacentElement('afterend',slot);setHost(slot);
   }
   if(!slot)return;
   const jump=document.querySelector<HTMLSelectElement>('#pageJump');
   const current=jump?document.querySelectorAll<HTMLElement>('.page')[Number(jump.value)]:null;
   slot.hidden=current?.dataset.page!==page;
   const canvas=current?.querySelector('.nkbCanvas');
   if(canvas)slot.style.width=Math.min(innerWidth,canvas.getBoundingClientRect().width)+'px';
  };update();const timer=setInterval(update,250);return()=>{clearInterval(timer);slot?.remove()};
 },[page]);
 return host&&createPortal(<>
  <div className="nkbPanelHead"><span>{page}</span><strong>Schreibaufgaben zur Buchseite</strong></div>
  {sections.map(s=>{
   const graded=s.fields.filter(f=>f.answer!==undefined);
   const exact=Object.fromEntries(graded.map(f=>[f.id,f.answer!]));
   const allOk=graded.length>0&&graded.every(f=>panelFieldOk(f,values[f.id]));
   return <section key={s.id} aria-labelledby={`nkbp-${page}-${s.id}`}>
    <h3 id={`nkbp-${page}-${s.id}`}><b>{s.id}</b> {s.title}</h3>
    {s.hint&&<p>{s.hint}</p>}
    {s.fields.map(f=>{
     const state=s.neutral?'':checked[s.id]?(panelFieldOk(f,values[f.id])?'ok':'bad'):'';
     const common={key:f.id,'data-native-field':f.id,'aria-label':`Aufgabe ${s.id}: ${f.label}`,value:values[f.id]??f.pre??'',onChange:(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>onChange(f.id,e.target.value),className:state};
     return <label key={f.id}><span>{f.label}</span>{f.textarea?<textarea {...common} className={'nkbLine1'+(state?' '+state:'')} rows={1} placeholder={f.placeholder}/>:<input {...common} type="text" autoComplete="off" placeholder={f.placeholder}/>}</label>;
    })}
    {!s.neutral&&<div className="nkbPanelCheck"><CheckButton {...(Object.keys(exact).length?{answers:exact}:{})} onClick={()=>setChecked(x=>({...x,[s.id]:true}))}/><output aria-live="polite">{checked[s.id]?(allOk?'✓ Richtig!':'Noch einmal'):''}</output></div>}
   </section>;
  })}
 </>,host);
}
