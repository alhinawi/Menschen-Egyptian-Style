import {useEffect,useState} from 'react';
import {createPortal} from 'react-dom';
import {CheckButton} from './CheckButton';
import {usePageReset} from '../exercises/usePageReset';
const rows=[['Du','kannst','wirklich super Gitarre','spielen.'],['','Könnt','ihr gut','tanzen?'],['Sie','können','aber toll Ski','fahren.'],['Er','kann','ja super Tennis','spielen.'],['','Können','Sie Schach','spielen?']];
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\s+/g,' ');
export function KB11P42Answers({values,onChange}:{values:Record<string,string>;onChange:(id:string,value:string)=>void}){
 const [host,setHost]=useState<HTMLElement|null>(null),[checked,setChecked]=useState(false);
 usePageReset('42','native-kb11-42',()=>setChecked(false));
 useEffect(()=>{
  let slot:HTMLElement|null=null;
  const update=()=>{
   const viewport=document.querySelector('#viewport');
   const audio=document.querySelector('.readerAudioPanel');
   if(viewport&&(!slot||!slot.isConnected)){
    slot=document.createElement('section');slot.className='kb42Answers';slot.setAttribute('aria-label','Seite 42 - Schreibaufgaben');
    (audio||viewport).insertAdjacentElement('afterend',slot);setHost(slot);
   }
   if(!slot)return;
   const jump=document.querySelector<HTMLSelectElement>('#pageJump');
   const current=jump?document.querySelectorAll<HTMLElement>('.page')[Number(jump.value)]:null;
   slot.hidden=current?.dataset.page!=='42';
   const canvas=current?.querySelector('.nkbCanvas');
   if(canvas)slot.style.width=Math.min(innerWidth,canvas.getBoundingClientRect().width)+'px';
  };update();const timer=setInterval(update,250);return()=>{clearInterval(timer);slot?.remove()};
 },[]);
 const entries=rows.flatMap((row,r)=>row.flatMap((a,c)=>a?[[`satz${r}-${c}`,a]]:[]));
 const correct=entries.every(([id,a])=>normalize(values[id]||'')===normalize(a));
 return host&&createPortal(<>
  <div className="kb42Heading"><span>42</span><strong>Schreibaufgaben zur Buchseite</strong></div>
  <section aria-labelledby="kb42-4b"><h3 id="kb42-4b"><b>4b</b> Was machen die anderen Personen?</h3><label>Eigene Antworten<textarea data-native-field="4b" aria-label="Aufgabe 4b: Andere Personen - Tätigkeiten" value={values['4b']||''} onChange={e=>onChange('4b',e.target.value)} placeholder="Zum Beispiel: 7 backen"/></label></section>
  <section aria-labelledby="kb42-5"><h3 id="kb42-5"><b>5</b> Schreiben Sie die Sätze in die Tabelle.</h3><p>Verwenden Sie die passende Form von können.</p>
   <div className="kb42Table"><div className="kb42Head"><span/><span>Position 1</span><span>können</span><span>Mittelfeld</span><span>Satzende</span></div>
   {rows.map((row,r)=><div className="kb42Row" key={r}><strong>{String.fromCharCode(97+r)}</strong>{row.map((answer,c)=>{const id=`satz${r}-${c}`;return answer?<input key={id} data-native-field={id} placeholder={['Position 1','können','Mittelfeld','Satzende'][c]} autoComplete="off" aria-label={`Aufgabe 5 Satz ${String.fromCharCode(97+r)}, Spalte ${c+1}`} className={checked?(normalize(values[id]||'')===normalize(answer)?'ok':'bad'):''} value={values[id]||''} onChange={e=>onChange(id,e.target.value)}/>:<span key={id}/>})}</div>)}
   </div><div className="kb42Check"><CheckButton answers={Object.fromEntries(entries)} onClick={()=>setChecked(true)}/><output aria-live="polite">{checked?(correct?'✓ Richtig!':'Noch einmal'):''}</output></div>
  </section>
 </>,host);
}
