import {ClipMarkers} from './ClipMarkers';
import {useLayoutEffect,useRef,useState} from 'react';
import type {CSSProperties} from 'react';
import './native-kb11.css';
import {kb11Pages} from '../native-kb11/registry';
import type {NativePage} from '../native-kb11/registry';
const norm=(s:string)=>s.normalize('NFC').toLocaleLowerCase('de').trim().replace(/[.!?]+$/,'').replace(/\s+/g,' ');
export function NativeKb11({page}:{page:string}){
 const data=kb11Pages[page] as NativePage|undefined;
 if(!data)return null;
 return <Inner key={page} data={data}/>;
}
function Inner({data}:{data:NativePage}){
 const key='native-kb11-'+data.page;
 const [v,setV]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});
 const [res,setRes]=useState<Record<string,boolean>>({});
 const players=useRef<Record<string,HTMLAudioElement|null>>({});
 const W=data.w,H=data.h;
 const pos=(x:number,y:number,w:number,h:number):CSSProperties=>({left:x/W*100+'%',top:y/H*100+'%',width:w/W*100+'%',height:h/H*100+'%'});
 const set=(id:string,val:string)=>{const n={...v,[id]:val};setV(n);try{localStorage.setItem(key,JSON.stringify(n))}catch{}};
 const groups=[...new Set(data.fields.filter(f=>f.answer!==undefined).map(f=>f.group))];
 const grade=(g:string)=>{const n:Record<string,boolean>={};for(const f of data.fields.filter(f=>f.group===g&&f.answer!==undefined)){const cur=f.kind==='radio'?String(v[f.name||f.id]===f.value):f.kind==='checkbox'?String(v[f.id]==='true'):norm(v[f.id]||'');n[f.id]=f.answer!.split('|').some(a=>norm(a)===cur)}setRes(r=>({...r,...n}))};
 const play=(id:string)=>{const a=players.current[id];if(a){Object.values(players.current).forEach(o=>{if(o&&o!==a)o.pause()});a.currentTime=0;void a.play()}};
 const lines=data.words;
 const root=useRef<HTMLDivElement>(null);
 useLayoutEffect(()=>{const fit=()=>{const el0=root.current;if(!el0)return;const cw=el0.clientWidth||1;el0.querySelectorAll<HTMLElement>('.nkbLine').forEach(el=>{el.style.transform='';const t=parseFloat(el.dataset.tw||'0');const act=el.offsetWidth;if(t>0&&act>0){const k=t/W*cw/act;el.style.transformOrigin='0 50%';el.style.transform=Math.abs(k-1)>0.015?`scaleX(${k})`:''}})};fit();document.fonts?.ready.then(fit);const ro=new ResizeObserver(fit);ro.observe(root.current!);return ()=>ro.disconnect()},[data]);
 const checkPos=(g:string)=>{const c=data.checks?.[g];if(c)return {left:c[0]/W*100+'%',top:c[1]/H*100+'%'};const fs=data.fields.filter(f=>f.group===g);const y=Math.max(...fs.map(f=>f.y+f.h));const x=Math.min(...fs.map(f=>f.x));return {left:Math.min(x,W-330)/W*100+'%',top:(y+10)/H*100+'%'}};
 return <div className="nkb" data-native-page={data.page} data-native-book="kb-a11" style={{'--paper':data.paper||'#fdfcf8','--ratio':W/H,'--nkb-tool':data.audio.length?'46px':'0px'} as CSSProperties}>
  <div className="nkbCanvas" ref={root} style={{aspectRatio:`${W}/${H}`}}>
   {data.art.map((a,i)=><img key={i} className="nkbArt" src={a.src} alt="" draggable={false} style={pos(a.x,a.y,a.w,a.h)}/>)}
   {(data.blocks||[]).map((bl,i)=><div key={'b'+i} className={'nkbLine'+(bl.sb?' nkbSB':bl.b?' nkbB':'')+(bl.sa?' nkbSans':'')} data-tw={bl.w} style={{left:bl.x/W*100+'%',top:(bl.cy-bl.f*0.62)/H*100+'%',fontSize:bl.f/W*100+'cqw',lineHeight:1.24}}>{bl.ws.map((w,j)=>{const tap=/[A-Za-zÄÖÜäöüß]/.test(w.t);return <span key={j}>{j>0?' ':''}<span {...(tap?{className:'tapWord',role:'button',tabIndex:0,'data-word':w.t.replace(/^[.,!?„"()]+|[.,!?“"()]+$/g,''),'data-phrase':w.ph||w.t}:{})} style={{color:w.c}}>{w.t}</span></span>})}</div>)}
   {lines.map((w,i)=>{const tap=/[A-Za-zÄÖÜäöüß]/.test(w.t);return <span key={i} className={'nkbWord nkbGhost'+(tap?' tapWord':'')} {...(tap?{role:'button',tabIndex:0,'data-word':w.t.replace(/^[.,!?„"()]+|[.,!?“"()]+$/g,''),'data-phrase':w.ph||w.t}:{})} style={pos(w.x,w.y,w.w,w.h)}>{w.t}</span>})}
   {data.fields.map(f=>{const rowSel=f.kind==='radio'?v[f.name||f.id]:undefined;const rowEmpty=f.kind==='radio'&&f.answer!==undefined&&!rowSel;const hid=f.kind==='radio'&&!rowEmpty&&rowSel!==f.value;const cls='nkbField'+(res[f.id]===undefined?'':rowEmpty?' bad':hid?'':res[f.id]?' ok':' bad');const common={key:f.id,className:cls,style:pos(f.x,f.y,f.w,f.h),'aria-label':f.label,'data-native-field':f.id};
    if(f.kind==='radio')return <input {...common} type="radio" name={key+'-'+(f.name||f.id)} checked={v[f.name||f.id]===f.value} onChange={()=>set(f.name||f.id,f.value!)}/>;
    if(f.kind==='checkbox')return <input {...common} type="checkbox" checked={v[f.id]==='true'} onChange={e=>set(f.id,String(e.target.checked))}/>;
    if(f.kind==='select')return <select {...common} style={{...pos(f.x,f.y,f.w,f.h),fontSize:Math.min(f.h*0.72,22)/W*100+'cqw'}} value={v[f.id]||''} onChange={e=>set(f.id,e.target.value)}><option value=""/>{f.options?.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select>;
    return <input {...common} type="text" autoComplete="off" maxLength={f.maxlen||undefined} inputMode={f.maxlen===1?"numeric":undefined} value={v[f.id]||''} onChange={e=>set(f.id,e.target.value)} style={{...pos(f.x,f.y,f.w,f.h),fontSize:Math.min(f.h*0.8,22)/W*100+'cqw'}}/>})}
   <ClipMarkers book="kb-a11" page={data.page}/>
   {data.audio.map(a=><button key={a.id} data-audio-src={a.src} className="nkbListen" style={pos(a.x,a.y,a.w,a.h)} aria-label={a.label||('Originalaudio '+a.id)} onClick={()=>play(a.id)}/>)}
   {groups.map(g=><div key={g} className={"nkbCheck"+(data.compact?.includes(g)?" nkbCompact":"")} style={checkPos(g)}><button onClick={()=>grade(g)}>Prüfen ✓</button><output>{data.fields.filter(f=>f.group===g&&f.answer!==undefined).every(f=>res[f.id]!==undefined)?(data.fields.filter(f=>f.group===g&&f.answer!==undefined).every(f=>res[f.id])?'✓ Richtig!':'Noch einmal'):''}</output></div>)}
  </div>
  {data.audio.length>0&&<div className="nkbAudio">{data.audio.map(a=><label key={a.id}><span>{a.label||a.id}</span><audio ref={el=>{players.current[a.id]=el}} controls preload="none" src={a.src}/></label>)}</div>}
 </div>;
}
