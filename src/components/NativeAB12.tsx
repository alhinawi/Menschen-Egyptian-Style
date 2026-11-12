import {useRef,useState} from 'react';
import type {CSSProperties} from 'react';
import {scanData} from '../scan-data/registry';
import {nativeAB12Pages} from '../native-ab12/registry';
import './native-ab12.css';

const norm=(s:string)=>s.normalize('NFC').toLocaleLowerCase('de').trim().replace(/^[.!?]+|[.!?]+$/g,'').replace(/\s+/g,' ');
const cleanWord=(s:string)=>s.replace(/^[.,!?„"“"()|]+|[.,!?„"“"()|]+$/g,'');

export function NativeAB12({page}:{page:string}){
 const scan=scanData['ab-a12:'+page];
 const data=nativeAB12Pages[page];
 const key='native-ab12-'+page;
 const player=useRef<HTMLAudioElement>(null);
 const [v,S]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});
 const [results,setResults]=useState<Record<string,boolean>>({});
 const [activeTrack,setActiveTrack]=useState('');
 if(!scan||!data)return null;
 const W=scan.width,H=scan.height;
 const set=(id:string,value:string)=>{const next={...v,[id]:value};S(next);try{localStorage.setItem(key,JSON.stringify(next))}catch{}};
 const bx=(b:{x:number;y:number;w:number;h:number}):CSSProperties=>({left:b.x/W*100+'%',top:b.y/H*100+'%',width:b.w/W*100+'%',height:b.h/H*100+'%'});
 const fs=(h:number,f=1.14)=>h/W*100*f+'cqw';
 const drop=new Set(data.drop);
 function check(group:string){const fields=scan.fields.filter(f=>f.group===group&&f.answer!==undefined);const next={...results};for(const f of fields){const value=f.kind==='radio'?String(v[f.name||f.id]===f.value):f.kind==='checkbox'?String(v[f.id]==='true'):norm(v[f.id]||'');next[f.id]=f.answer!.split('|').some(a=>norm(a)===value)}setResults(next)}
 const audioAll=[...scan.audio,...(data.audioAdd||[])];
 const removedLines=data.linesRemove||[];
 const lines=data.lines.filter(l=>!removedLines.some(r=>Math.abs(r.x-l.x)<12&&Math.abs(r.y-l.y)<12&&Math.abs(r.w-l.w)<12&&Math.abs(r.h-l.h)<12));
 return <div className="nativeAB12" data-native-book="ab-a12" data-native-page={page}>
  <div className="naCanvas" style={{aspectRatio:`${W}/${H}`}}>
   {data.rects.map((r,i)=><div key={'r'+i} className="naRect" style={{...bx(r),background:r.c}}/>)}
   {data.crops.map((c,i)=><img key={'c'+i} className="naArt" src={c.src} alt={c.alt} draggable={false} style={bx(c)}/>)}
   {lines.map((l,i)=><div key={'l'+i} className="naLine" style={{...bx(l),background:l.c||'#7a7a7a'}}/>)}
   {scan.words.map((w,i)=>{
    if(drop.has(i))return null;
    const st=data.wordStyle[String(i)]||{};
    const tappable=/[A-Za-zÄÖÜäöüß]/.test(w.text);
    return <span key={'w'+i} className={tappable?'naWord tapWord':'naWord'} data-word={cleanWord(w.text)} data-phrase={w.phrase||w.text} role={tappable?'button':undefined} tabIndex={tappable?0:undefined} aria-label={tappable?`${w.text} · Bedeutung`:undefined} style={{...bx(w),fontSize:fs(w.h),color:st.c,fontWeight:st.b?700:undefined}}>{w.text}</span>;
   })}
   {scan.fields.map(f=>{
    const res=results[f.id];
    const cls='naField '+(res===undefined?'':res?'naCorrect':'naWrong');
    if(f.kind==='radio')return <input key={f.id} type="radio" className={cls+' naRadio'} style={bx(f)} name={`${key}-${f.name||f.id}`} aria-label={f.label} checked={v[f.name||f.id]===f.value} onChange={()=>set(f.name||f.id,f.value||'')}/>;
    if(f.kind==='checkbox')return <input key={f.id} type="checkbox" className={cls+' naBox'} style={bx(f)} aria-label={f.label} checked={v[f.id]==='true'} onChange={e=>set(f.id,String(e.target.checked))}/>;
    return <input key={f.id} type="text" className={cls} style={{...bx(f),fontSize:fs(f.h,0.95)}} aria-label={f.label} data-native-field={f.id} value={v[f.id]||''} onChange={e=>set(f.id,e.target.value)} autoComplete="off" spellCheck={false}/>;
   })}
   {audioAll.map(a=><button key={a.id} type="button" className="naListen" style={bx(a)} aria-label={a.label} onClick={()=>{setActiveTrack(a.src);requestAnimationFrame(()=>{if(player.current){player.current.src=a.src;player.current.play().catch(()=>{})}})}}>▶ {a.label.replace(/^Originalaudio\s*/,'')}</button>)}
   {scan.groups.filter(g=>data.checks[g.id]).map(g=>{
    const answered=scan.fields.filter(f=>f.group===g.id&&f.answer!==undefined);
    const done=answered.some(f=>results[f.id]!==undefined);
    const allRight=answered.every(f=>results[f.id]);
    return <div key={g.id} className="naCheck" style={bx(data.checks[g.id])}><button type="button" onClick={()=>check(g.id)}>Prüfen ✓</button><output aria-live="polite">{done?(allRight?'✓ Richtig!':'Noch einmal'):''}</output></div>;
   })}
  </div>
  <div className="naAudioBelow"><audio ref={player} controls hidden={!activeTrack}/><span>{activeTrack?'Originalaudio · ':''}Antworten werden gespeichert</span></div>
 </div>;
}
