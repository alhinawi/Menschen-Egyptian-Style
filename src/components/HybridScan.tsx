import {ClipMarkers} from './ClipMarkers';
import {useLayoutEffect,useRef,useState} from 'react';
import type {CSSProperties} from 'react';
import type {ScanData,ScanBox} from '../scan-data/schema';
import './hybrid-scan.css';
const norm=(s:string)=>s.normalize('NFC').toLocaleLowerCase('de').trim().replace(/[.!?]+$/,'').replace(/\s+/g,' ');
export function HybridScan({data}:{data:ScanData}){
 const key=`menschen-hybrid-${data.book}-${data.page}`;
 const [values,setValues]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});
 const [results,setResults]=useState<Record<string,boolean>>({});
 const [activeAudio,setActiveAudio]=useState('');
 const player=useRef<HTMLAudioElement>(null);
 const tools=useRef<HTMLDivElement>(null);
 const [toolSpace,setToolSpace]=useState(90);
 useLayoutEffect(()=>{const el=tools.current;if(!el)return;const measure=()=>{const h=Math.ceil(el.offsetHeight)+12;setToolSpace(Math.max(90,h))};measure();const observer=new ResizeObserver(measure);observer.observe(el);return ()=>observer.disconnect()},[data]);
 const box=(b:ScanBox):CSSProperties=>({left:b.x/data.width*100+'%',top:b.y/data.height*100+'%',width:b.w/data.width*100+'%',height:b.h/data.height*100+'%'});
 const update=(id:string,value:string)=>{const next={...values,[id]:value};setValues(next);try{localStorage.setItem(key,JSON.stringify(next))}catch{}};
 function check(group:string){const fields=data.fields.filter(f=>f.group===group&&f.answer!==undefined);const next={...results};for(const f of fields){const value=f.kind==='radio'?String(values[f.name||f.id]===f.value):f.kind==='checkbox'?String(values[f.id]==='true'):norm(values[f.id]||'');next[f.id]=f.answer!.split('|').some(a=>norm(a)===value)}setResults(next)}
 return <div className="hybridScan" data-scan-book={data.book} data-scan-page={data.page} data-review-status={data.review.status}>
  <div className="hybridCanvas" style={{aspectRatio:`${data.width}/${data.height}`,'--scan-ratio':data.width/data.height,'--hybrid-tool-space':data.audio.length||data.fields.some(f=>f.answer!==undefined)?toolSpace+'px':'0px'} as CSSProperties}>
   <img className="hybridImage" src={data.image} alt={`Originalbuch Seite ${data.page}`} draggable={false}/>
   <div className="hybridWords">{data.words.map((w,i)=>/[A-Za-zÄÖÜäöüß]/.test(w.text)?<span key={i} className="hybridWord tapWord" data-word={w.text} data-phrase={w.phrase||w.text} role="button" tabIndex={0} aria-label={`${w.text} · Bedeutung`} style={box(w)}>{w.text}</span>:<span key={i} className="hybridWord" style={box(w)}>{w.text}</span>)}</div>
   <div className="hybridFields">{data.fields.map(f=>{
    const className='hybridField '+(results[f.id]===undefined?'':results[f.id]?'hybridCorrect':'hybridWrong');
    const props={key:f.id,className,style:box(f),'aria-label':f.label,'data-field-id':f.id};
    if(f.kind==='select')return <select {...props} value={values[f.id]||''} onChange={e=>update(f.id,e.target.value)}><option value=""/>{f.options?.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select>;
    if(f.kind==='radio')return <input {...props} type="radio" name={`${key}-${f.name||f.id}`} value={f.value} checked={values[f.name||f.id]===f.value} onChange={()=>update(f.name||f.id,f.value||'')}/>;
    if(f.kind==='checkbox')return <input {...props} type="checkbox" checked={values[f.id]==='true'} onChange={e=>update(f.id,String(e.target.checked))}/>;
    return <input {...props} type="text" value={values[f.id]||''} onChange={e=>update(f.id,e.target.value)} autoComplete="off" spellCheck={false}/>;
   })}</div>
   <ClipMarkers book={data.book} page={data.page}/>
   {data.audio.map(a=><button key={a.id} data-audio-src={a.src} type="button" className="hybridAudio" style={box(a)} aria-label={a.label} onClick={()=>{setActiveAudio(a.src);requestAnimationFrame(()=>{if(player.current){player.current.src=a.src;player.current.play().catch(()=>{})}})}}>▶</button>)}
   <div className="hybridTools empty:hidden" ref={tools}>{data.groups.filter(g=>data.fields.some(f=>f.group===g.id&&f.answer!==undefined)).map(g=><div key={g.id} className="hybridCheck"><button type="button" onClick={()=>check(g.id)}>{g.label} · Prüfen ✓</button><output aria-live="polite">{data.fields.filter(f=>f.group===g.id&&f.answer!==undefined).some(f=>results[f.id]!==undefined)?data.fields.filter(f=>f.group===g.id&&f.answer!==undefined).every(f=>results[f.id])?'✓ Richtig!':'Noch einmal':''}</output></div>)}{data.audio.length>0&&<audio ref={player} controls hidden={!activeAudio}/>}</div>
  </div>
 </div>
}
