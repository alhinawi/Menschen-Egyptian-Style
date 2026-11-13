import {useEffect,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import './audio-marker-buttons.css';

type Track={el:HTMLElement;label:string;track:string;y:number;cx:number;page:string};
type Marker={x:number;y:number;tracks:Track[]};
export const audioMarkerSelector='.hybridAudio,.nativeAudioMarker,.nkbListen,.nkAudio,.npListen,.nabListen,.mListen,.listen';
const Play=()=> <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true"><path d="M6 3 17 10 6 17Z" fill="currentColor"/></svg>;

type Obstacle={left:number;right:number;top:number;bottom:number};
export function audioTextObstacles(page:HTMLElement):Obstacle[]{
 const out:Obstacle[]=[];
 const walker=document.createTreeWalker(page,NodeFilter.SHOW_TEXT);
 while(walker.nextNode()){
  const node=walker.currentNode,el=node.parentElement;
  if(!node.textContent?.trim()||!el||el.closest(audioMarkerSelector+',audio,script,style,.nkbGhost'))continue;
  const style=getComputedStyle(el);if(style.display==='none'||style.visibility==='hidden')continue;
  const range=document.createRange();range.selectNodeContents(node);
  for(const r of range.getClientRects())if(r.width&&r.height)out.push({left:r.left-2,right:r.right+2,top:r.top-2,bottom:r.bottom+2});
 }
 for(const el of page.querySelectorAll('input,textarea,select,button')){
  if(el.matches(audioMarkerSelector))continue;const r=el.getBoundingClientRect();if(r.width&&r.height)out.push({left:r.left-2,right:r.right+2,top:r.top-2,bottom:r.bottom+2});
 }
 return out;
}
const intersects=(x:number,y:number,r:Obstacle)=>x<r.right&&x+44>r.left&&y<r.bottom&&y+44>r.top;
/** Screen-space targets stay 44px even when the book canvas is fit to a phone. */
export function AudioMarkerButtons(){
 const [markers,setMarkers]=useState<Marker[]>([]);
 const [choices,setChoices]=useState<Track[]>([]);
 const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{
  let frame=0,previous='';
  const proxied=new Map<HTMLElement,string|null>();
  const update=()=>{
   frame=0;
   const jump=document.querySelector('#pageJump') as HTMLSelectElement|null;
   const currentPage=jump?document.querySelectorAll<HTMLElement>('.page')[Number(jump.value)]:null;
   const tracks:Track[]=[];
   // Document coordinates: markers are absolutely positioned in the page flow,
   // so scrolling moves them with the printed art with no per-frame JS updates.
   const sx=window.scrollX,sy=window.scrollY;
   for(const el of document.querySelectorAll<HTMLElement>(audioMarkerSelector)){
    if(el.textContent?.includes('Clip')||el.closest('dialog'))continue;
    const page=el.closest<HTMLElement>('.page');
    if(!page)continue;
    if(!proxied.has(el)){proxied.set(el,el.getAttribute('tabindex'));el.dataset.audioProxied='true';el.tabIndex=-1}
    if(currentPage&&page!==currentPage)continue;
    const r=el.getBoundingClientRect(),p=page.getBoundingClientRect();
    if(!r.width||!r.height||!p.width||!p.height||getComputedStyle(el).visibility==='hidden')continue;
    const label=el.getAttribute('aria-label')||el.title||el.textContent?.trim()||'Originalaudio';
    const source=el.dataset.audioSrc||el.dataset.src||'';
    const track=source.match(/track(\d+)/)?.[1]||label.match(/(?:Originalaudio|Audio)\s*(?:\d\s+)?(\d{1,3})/i)?.[1]||el.textContent?.match(/\d+/g)?.pop()||'';
    tracks.push({el,label,track,y:r.top+sy+r.height/2-22,cx:r.left+sx+r.width/2-22,page:page.dataset.page||''});
   }
   tracks.sort((a,b)=>a.y-b.y);
   const out:Marker[]=[];
   for(const t of tracks){
    const last=out[out.length-1];
    // One margin button for nearby tracks. Never push a button onto another task.
    if(last&&t.y-last.tracks[last.tracks.length-1].y<46){last.tracks.push(t);continue}
    // Pin the circle to its printed play marker (source button centre), so it
    // keeps the same anchor at every zoom level instead of the page margin.
    // Only when the anchor itself sits outside the viewport does the circle
    // slide to the nearest visible edge.
    const minX=sx+2,maxX=sx+window.innerWidth-46;
    out.push({x:Math.min(Math.max(t.cx,minX),Math.max(minX,maxX)),y:t.y,tracks:[t]});
   }
   // Pinned means pinned: the circle stays on its printed marker at every
   // zoom level; nothing displaces it onto neighbouring art or text.
   const sig=out.map(m=>[m.x.toFixed(1),m.y.toFixed(1),...m.tracks.map(t=>t.page+t.label+t.track)]).join('|');
   if(sig!==previous){previous=sig;setMarkers(out)}
  };
  const queue=()=>{if(!frame)frame=requestAnimationFrame(update)};
  const observer=new MutationObserver(queue);
  observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['style','class','open']});
  window.addEventListener('resize',queue);
  const timer=setInterval(queue,300);queue();
  return()=>{observer.disconnect();window.removeEventListener('resize',queue);clearInterval(timer);cancelAnimationFrame(frame);for(const[el,tab]of proxied){delete el.dataset.audioProxied;if(tab===null)el.removeAttribute('tabindex');else el.setAttribute('tabindex',tab)}};
 },[]);
 const play=(t:Track)=>{if(t.el.isConnected)t.el.click()};
 const choose=(m:Marker)=>{if(m.tracks.length===1){play(m.tracks[0]);return}setChoices(m.tracks);dialog.current?.showModal()};
 return createPortal(<>
  {markers.map((m,i)=><button key={i} type="button" className="largeAudioMarker" data-large-audio aria-label={m.tracks.length===1?m.tracks[0].label:`${m.tracks.length} Audios auswählen`} title={m.tracks.map(t=>t.label).join(' · ')} style={{left:m.x,top:m.y}} onClick={()=>choose(m)}><span className="largeAudioFace"><Play/></span></button>)}
  <dialog className="audioTrackChooser" ref={dialog} onClose={()=>setChoices([])} aria-label="Originalaudio auswählen">
   <div className="audioTrackChooserHead"><strong>Originalaudio</strong><button type="button" aria-label="Schließen" onClick={()=>dialog.current?.close()}>✕</button></div>
   <p>Audio auswählen</p>
   {choices.map((t,i)=><button type="button" className="audioTrackChoice" key={i} onClick={()=>{dialog.current?.close();play(t)}}><Play/><span>{t.track?`Track ${t.track}`:`Audio ${i+1}`}<small>{t.label}</small></span></button>)}
  </dialog>
 </>,document.body);
}
