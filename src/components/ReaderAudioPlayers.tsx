import {useEffect,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import './reader-audio-players.css';
const time=(n:number)=>Number.isFinite(n)?`${Math.floor(n/60)}:${String(Math.floor(n%60)).padStart(2,'0')}`:'0:00';
function Player({audio}:{audio:HTMLAudioElement}){
 const [state,setState]=useState({time:audio.currentTime,duration:audio.duration,paused:audio.paused});
 useEffect(()=>{const sync=()=>setState({time:audio.currentTime,duration:audio.duration,paused:audio.paused});const events=['timeupdate','durationchange','loadedmetadata','play','pause','ended','seeked'];events.forEach(e=>audio.addEventListener(e,sync));audio.preload='metadata';sync();return()=>events.forEach(e=>audio.removeEventListener(e,sync))},[audio]);
 // After the no-range host fix swaps in a blob: URL, the track label still
 // comes from the original file path kept on the element.
 const src=audio.dataset.originalSrc||audio.getAttribute('src')||audio.querySelector('source')?.getAttribute('src')||'';
 const track=src.match(/cd(\d+)-track(\d+)/i);
 // The printed exercise id (stamped on the element when a listen marker started
 // playback) outranks the file-name label; neither is ever guessed.
 const aufgabe=audio.getAttribute('data-aufgabe');
 const label=aufgabe?`Aufgabe ${aufgabe}`:track?`CD${track[1]} · Track ${track[2]}`:audio.getAttribute('aria-label')||'Audio player';
 const duration=Number.isFinite(state.duration)?state.duration:0;
 return <section className="readerAudioPlayer" aria-label={label}>
  <div className="readerAudioHeading"><strong>{label}</strong><output aria-label="Playback time">{time(state.time)} / {time(duration)}</output></div>
  <div className="readerAudioTransport"><button type="button" disabled={!src} aria-label={state.paused?'Play '+label:'Pause '+label} onClick={()=>{if(audio.paused){document.querySelectorAll('audio').forEach(a=>{if(a!==audio)a.pause()});void audio.play()}else audio.pause()}}>{state.paused?'▶':'Ⅱ'}</button><input type="range" aria-label={'Seek '+label} min={0} max={duration||1} step={0.1} value={Math.min(state.time,duration||1)} disabled={!duration} onChange={e=>{audio.currentTime=Number(e.target.value);setState(s=>({...s,time:Number(e.target.value)}))}}/></div>
 </section>;
}
const listenSelector='.nkbListen,.mListen,.naAudio,.nkAudio,.nabListen,.npListen,.hybridAudio,.nativeAudioMarker,.listen';
// The printed exercise id next to a listen marker comes only from real page
// data: a data-task attribute on the marker, or the exercise-number element the
// native renderers paint (.mNumber, .naTitle>b, .nkTitle>b) plus a same-row
// part letter ("a  ..."). Anything else falls back to the CD/Track label.
function exerciseOf(btn:Element):string|null{
 const own=(btn as HTMLElement).dataset?.task;
 if(own&&/^\d{1,2}[a-e]?$/.test(own))return own;
 const root=btn.closest('.page')||btn.closest('[data-native-book]')||document;
 const br=(btn as HTMLElement).getBoundingClientRect();
 const by=br.top+br.height/2;
 // The printed exercise number wins: the nearest one above/on the marker row
 // (Arbeitsbuch headings), or, when the page has none above (Kursbuch lesson
 // openers), the nearest one just below.
 let above:string|null=null,aboveDy=Infinity,below:string|null=null,belowDy=Infinity;
 for(const n of root.querySelectorAll<HTMLElement>('.mNumber,.naTitle>b,.nkTitle>b')){
  const text=n.textContent?.trim()||'';
  if(!/^\d{1,2}[a-e]?$/.test(text))continue;
  const r=n.getBoundingClientRect();
  if(!r.width&&!r.height)continue;
  const dy=r.top+r.height/2-by;
  if(dy<=20&&-dy<aboveDy){above=text;aboveDy=-dy}
  else if(dy>20&&dy<belowDy){below=text;belowDy=dy}
 }
 const best=above!==null&&aboveDy<=260?above:below!==null&&belowDy<=160?below:null;
 if(!best)return null;
 if(/[a-e]$/.test(best))return best;
 let letter='',letterDy=Infinity;
 for(const t of root.querySelectorAll<HTMLElement>('.mTitle')){
  const m=t.textContent?.trim().match(/^([a-e])\s/);
  if(!m)continue;
  const tr=t.getBoundingClientRect();
  const dy=Math.abs(tr.top+tr.height/2-by);
  if(dy<40&&dy<letterDy){letter=m[1];letterDy=dy}
 }
 return best+letter;
}
let lastListen:{task:string|null;ts:number}|null=null;
export function ReaderAudioPlayers(){
 const [active,setActive]=useState<HTMLAudioElement|null>(null);
 const [idle]=useState(()=>new Audio());
 const hostApi=useRef<{ensure?:()=>void}>({});
 useEffect(()=>{
  // A play request must resurrect a wiped panel immediately, not one tick later.
  const reveal=(audio:HTMLAudioElement)=>{hostApi.current.ensure?.();setActive(audio)};
  const show=(event:Event)=>{if(event.target instanceof HTMLAudioElement)reveal(event.target)};
  // Observe playback requests so the permanent player follows every source.
  const original=HTMLMediaElement.prototype.play;
  const note=(event:MouseEvent)=>{const btn=(event.target as Element|null)?.closest?.(listenSelector);if(btn)lastListen={task:exerciseOf(btn),ts:Date.now()}};
  const play=function(this:HTMLMediaElement){
   if(this instanceof HTMLAudioElement){
    if(lastListen&&Date.now()-lastListen.ts<2000){if(lastListen.task)this.dataset.aufgabe=lastListen.task;else delete this.dataset.aufgabe;lastListen=null}
    reveal(this);
   }
   const result=original.call(this);
   // A new load interrupting a pending play() rejects with AbortError; that is
   // normal user behaviour, not a failure, so it must not surface unhandled.
   result?.catch?.((err:unknown)=>{if((err as DOMException|null)?.name!=='AbortError')console.warn(err)});
   return result;
  };
  HTMLMediaElement.prototype.play=play;document.addEventListener('play',show,true);document.addEventListener('click',note,true);
  return()=>{document.removeEventListener('play',show,true);document.removeEventListener('click',note,true);if(HTMLMediaElement.prototype.play===play)HTMLMediaElement.prototype.play=original};
 },[]);
 const [slot,setSlot]=useState<HTMLElement|null>(null),[audios,setAudios]=useState<HTMLAudioElement[]>([]);
 useEffect(()=>{
  let host:HTMLElement|null=null;const marked=new Set<HTMLAudioElement>();
  const ensure=()=>{
   const viewport=document.querySelector('#viewport');
   // The book can replace #viewport (hydration, lesson data, SPA hops). A host
   // left behind in the removed subtree makes the player vanish while audio
   // keeps playing, so re-anchor whenever the host is detached or misplaced.
   if(viewport&&(!host||!host.isConnected||host.previousElementSibling!==viewport)){
    host?.remove();host=document.createElement('div');host.className='readerAudioPanel';viewport.insertAdjacentElement('afterend',host);setSlot(host);
   }
  };
  hostApi.current.ensure=ensure;
  const update=()=>{
   setActive(old=>old&&!old.isConnected?null:old);
   document.querySelectorAll<HTMLElement>('button').forEach(el=>{el.toggleAttribute('data-reader-reset',/^Noch einmal$/i.test(el.textContent?.trim()||''))});
   ensure();
   const jump=document.querySelector<HTMLSelectElement>('#pageJump');const page=jump?document.querySelectorAll('.page')[Number(jump.value)]:null;
   const canvas=page?.querySelector<HTMLElement>('.nkbCanvas');
   document.body.classList.toggle('readerNativeFrame',!!canvas);if(canvas){const height=canvas.getBoundingClientRect().height;if(Number.isFinite(height)&&height>0)document.documentElement.style.setProperty('--reader-native-height',`${height}px`);}
   const next=page?[...page.querySelectorAll<HTMLAudioElement>('audio')].filter(a=>a.getAttribute('src')||a.querySelector('source[src]')):[];
   next.forEach(a=>{a.dataset.readerAudioSource='true';marked.add(a)});
   setAudios(old=>old.length===next.length&&old.every((a,i)=>a===next[i])?old:next);
  };update();const timer=setInterval(update,250);return()=>{clearInterval(timer);hostApi.current.ensure=undefined;(host as HTMLElement|null)?.remove();marked.forEach(a=>delete a.dataset.readerAudioSource)};
 },[]);
 return <>{slot&&createPortal(<Player audio={active||audios[0]||idle}/>,slot)}</>;
}
