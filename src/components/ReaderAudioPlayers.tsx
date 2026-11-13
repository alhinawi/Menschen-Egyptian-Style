import {useEffect,useState} from 'react';
import {createPortal} from 'react-dom';
import './reader-audio-players.css';
const time=(n:number)=>Number.isFinite(n)?`${Math.floor(n/60)}:${String(Math.floor(n%60)).padStart(2,'0')}`:'0:00';
function Player({audio,onHide}:{audio:HTMLAudioElement;onHide:()=>void}){
 const [state,setState]=useState({time:audio.currentTime,duration:audio.duration,paused:audio.paused});
 useEffect(()=>{const sync=()=>setState({time:audio.currentTime,duration:audio.duration,paused:audio.paused});const events=['timeupdate','durationchange','loadedmetadata','play','pause','ended','seeked'];events.forEach(e=>audio.addEventListener(e,sync));audio.preload='metadata';sync();return()=>events.forEach(e=>audio.removeEventListener(e,sync))},[audio]);
 // After the no-range host fix swaps in a blob: URL, the track label still
 // comes from the original file path kept on the element.
 const src=audio.dataset.originalSrc||audio.getAttribute('src')||audio.querySelector('source')?.getAttribute('src')||'';
 const track=src.match(/cd(\d+)-track(\d+)/i);
 const label=track?`CD${track[1]} · Track ${track[2]}`:audio.getAttribute('aria-label')||'Originalaudio';
 const duration=Number.isFinite(state.duration)?state.duration:0;
 return <section className="readerAudioPlayer" aria-label={label}>
  <button type="button" className="readerPlayerClose" aria-label="Hide player without stopping audio" onClick={onHide}>×</button>
  <div className="readerAudioHeading"><strong>{label}</strong><output aria-label="Playback time">{time(state.time)} / {time(duration)}</output></div>
  <div className="readerAudioTransport"><button type="button" aria-label={state.paused?'Play '+label:'Pause '+label} onClick={()=>{if(audio.paused){document.querySelectorAll('audio').forEach(a=>{if(a!==audio)a.pause()});void audio.play()}else audio.pause()}}>{state.paused?'▶':'Ⅱ'}</button><input type="range" aria-label={'Seek '+label} min={0} max={duration||1} step={0.1} value={Math.min(state.time,duration||1)} disabled={!duration} onChange={e=>{audio.currentTime=Number(e.target.value);setState(s=>({...s,time:Number(e.target.value)}))}}/></div>
 </section>;
}
export function ReaderAudioPlayers(){
 const [active,setActive]=useState<HTMLAudioElement|null>(null);
 const [hidden,setHidden]=useState<Set<HTMLAudioElement>>(()=>new Set());
 const hide=(audio:HTMLAudioElement)=>{setHidden(old=>new Set([...old,audio]));setActive(old=>old===audio?null:old)};
 useEffect(()=>{
  const reveal=(audio:HTMLAudioElement)=>{setHidden(old=>{if(!old.has(audio))return old;const next=new Set(old);next.delete(audio);return next});setActive(audio)};
  const show=(event:Event)=>{if(event.target instanceof HTMLAudioElement)reveal(event.target)};
  // Calling play() on a track already playing does not fire another play event.
  // Observe the playback request as well, so a hidden player can be reopened.
  const original=HTMLMediaElement.prototype.play;
  const play=function(this:HTMLMediaElement){if(this instanceof HTMLAudioElement)reveal(this);return original.call(this)};
  HTMLMediaElement.prototype.play=play;document.addEventListener('play',show,true);
  return()=>{document.removeEventListener('play',show,true);if(HTMLMediaElement.prototype.play===play)HTMLMediaElement.prototype.play=original};
 },[]);
 useEffect(()=>{if(!active)return;const panel=document.querySelector('.readerActiveAudio');const sync=()=>{const h=panel?.getBoundingClientRect().height||108;document.documentElement.style.setProperty('--active-audio-height',`${h}px`);document.body.classList.add('hasActiveAudio')};const observer=new ResizeObserver(sync);if(panel)observer.observe(panel);sync();return()=>{observer.disconnect();document.body.classList.remove('hasActiveAudio')}},[active]);
 const [slot,setSlot]=useState<HTMLElement|null>(null),[audios,setAudios]=useState<HTMLAudioElement[]>([]);
 useEffect(()=>{
  let host:HTMLElement|null=null;const marked=new Set<HTMLAudioElement>();
  const update=()=>{
   setActive(old=>old&&!old.isConnected?null:old);
   document.querySelectorAll<HTMLElement>('button,output').forEach(el=>{el.toggleAttribute('data-reader-reset',/^Noch einmal$/i.test(el.textContent?.trim()||''))});
   const viewport=document.querySelector('#viewport');if(viewport&&!host){host=document.createElement('div');host.className='readerAudioPanel';viewport.insertAdjacentElement('afterend',host);setSlot(host)}
   const jump=document.querySelector<HTMLSelectElement>('#pageJump');const page=jump?document.querySelectorAll('.page')[Number(jump.value)]:null;
   const canvas=page?.querySelector<HTMLElement>('.nkbCanvas');
   document.body.classList.toggle('readerNativeFrame',!!canvas);if(canvas)document.documentElement.style.setProperty('--reader-native-height',`${canvas.getBoundingClientRect().height}px`);
   const next=page?[...page.querySelectorAll<HTMLAudioElement>('audio')].filter(a=>a.getAttribute('src')||a.querySelector('source[src]')):[];
   next.forEach(a=>{a.dataset.readerAudioSource='true';marked.add(a)});
   setAudios(old=>old.length===next.length&&old.every((a,i)=>a===next[i])?old:next);
  };update();const timer=setInterval(update,250);return()=>{clearInterval(timer);host?.remove();marked.forEach(a=>delete a.dataset.readerAudioSource)};
 },[]);
 return <>{slot&&createPortal(audios.filter(audio=>!hidden.has(audio)).map((audio,i)=><Player key={audio.getAttribute('src')||i} audio={audio} onHide={()=>hide(audio)}/>),slot)}{active&&createPortal(<aside className="readerActiveAudio" aria-label="Active audio"><Player audio={active} onHide={()=>hide(active)}/></aside>,document.body)}</>;
}
