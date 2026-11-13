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
    out.push({x:t.cx,y:t.y,tracks:[t]});
   }
   // Pinned means pinned: the circle stays on its printed marker at every
   // zoom level; nothing displaces it onto neighbouring art or text. The one
   // exception is the viewport edge: when the printed marker sits in the
   // cut-off page margin, the circle moves to the nearest spot with no printed
   // ink under it (never onto text); if there is no such spot nearby, the page
   // is panned sideways just enough that the revealed empty margin holds the
   // circle on its own row.
   const obstacles=(currentPage?audioTextObstacles(currentPage):[]).map(o=>({left:o.left+sx,right:o.right+sx,top:o.top+sy,bottom:o.bottom+sy}));
   const spread=currentPage?.closest<HTMLElement>('[style*="zoom"]')||currentPage?.parentElement||null;
   const pan0=spread&&spread.style.marginLeft.endsWith('px')?parseFloat(spread.style.marginLeft)||0:0;
   const blocked=(x:number,y:number,extra:Obstacle[])=>[...obstacles,...extra].some(r=>intersects(x,y,r));
   const placed:Obstacle[]=[];
   let panNeed=0;
   for(const m of out){
    const minX=sx+2,maxX=sx+window.innerWidth-46;
    // An anchor is an edge case when it could not be centred on screen without
    // the pan currently applied (pan0 keeps earlier edge decisions stable).
    const unpanned=m.x-pan0;
    if(unpanned>=minX&&unpanned<=maxX){
     m.x=Math.min(Math.max(m.x,minX),Math.max(minX,maxX));
     // The printed marker may share its band with other ink (a module tag in
     // the margin); if so, slide to the nearest ink-free spot on the column.
     if(blocked(m.x,m.y,placed)){
      for(let d=3;d<=42;d+=3){
       const dy=[-d,d].find(dy=>!blocked(m.x,m.y+dy,placed));
       if(dy!==undefined){m.y=m.y+dy;break}
      }
     }
     placed.push({left:m.x-2,right:m.x+46,top:m.y-2,bottom:m.y+46});
     continue;
    }
    const dir=unpanned<minX?1:-1;
    const edgeX=dir===1?minX:maxX;
    m.x=edgeX;
    // Decide in the stable un-panned frame (pan0 stripped): the circle stays
    // at edgeX and the base frame is the pan=0 layout, so the same decision
    // is reached whether or not the pan is currently applied.
    // Markers do not move with the pan (only the spread does), so placed
    // circles stay in viewport coords; only the printed ink shifts. The pan
    // is a margin inside the zoomed spread, so the on-screen shift is
    // marginLeft x zoom.
    const zf=spread?parseFloat(spread.style.zoom)||1:1;
    const shift=pan0*zf;
    const docObs=obstacles.map(r=>({left:r.left-shift,right:r.right-shift,top:r.top,bottom:r.bottom}));
    const docPlaced=placed;
    const blockedDoc=(x:number,y:number)=>[...docObs,...docPlaced].some(r=>intersects(x,y,r));
    if(!blockedDoc(edgeX,m.y)){placed.push({left:m.x-2,right:m.x+46,top:m.y-2,bottom:m.y+46});continue}
    // Slide along the margin to the nearest ink-free spot, smallest move
    // first; never onto text or another marker.
    let found=false;
    for(let d=3;d<=56&&!found;d+=3)for(const dy of[-d,d]){
     if(!blockedDoc(edgeX,m.y+dy)){m.y=m.y+dy;found=true;break}
    }
    if(!found){
     // Last resort: pan the page just enough that the revealed empty margin
     // holds the circle; a pan that drags other ink back under the circle is
     // skipped.
     const band=docObs.filter(r=>m.y<r.bottom&&m.y+44>r.top);
     const cands=band.map(r=>dir===1?(edgeX+44-r.left)/zf:(edgeX-r.right)/zf).filter(c=>dir===1?c>0:c<0).sort((a,b)=>Math.abs(a)-Math.abs(b));
     for(const c of cands){
      if(Math.abs(c*zf)>140)break;
      if(band.every(r=>r.right+c*zf<=edgeX||r.left+c*zf>=edgeX+44)){panNeed=dir===1?Math.max(panNeed,c):Math.min(panNeed,c);break}
     }
    }
    placed.push({left:m.x-2,right:m.x+46,top:m.y-2,bottom:m.y+46});
   }
   if(spread){
    // panNeed is recomputed every tick on the un-panned basis, so it is
    // stable while needed and clears itself once no marker needs it.
    if(panNeed!==0)spread.style.marginLeft=panNeed+'px';
    else spread.style.marginLeft='';
   }
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
