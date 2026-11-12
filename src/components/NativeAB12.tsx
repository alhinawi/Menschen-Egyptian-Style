import {useMemo,useRef,useState} from 'react';
import type {CSSProperties} from 'react';
import {scanData} from '../scan-data/registry';
import {nativeAB12Pages} from '../native-ab12/registry';
import './native-ab12.css';

const norm=(s:string)=>s.normalize('NFC').toLocaleLowerCase('de').trim().replace(/^[.!?]+|[.!?]+$/g,'').replace(/\s+/g,' ');
const cleanWord=(s:string)=>s.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu,'');

interface W{x:number;y:number;w:number;h:number;text:string;phrase?:string}
interface Line{ws:W[];top:number;bottom:number;fs:number}

export function NativeAB12({page}:{page:string}){
 const scan=scanData['ab-a12:'+page];
 const data=nativeAB12Pages[page];
 const key='native-ab12-'+page;
 const player=useRef<HTMLAudioElement>(null);
 const [v,S]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});
 const [results,setResults]=useState<Record<string,boolean>>({});
 const [activeTrack,setActiveTrack]=useState('');
 const lines=useMemo<Line[]>(()=>{
  if(!scan||!data)return[];
  const drop=new Set(data.drop);
  const words=(scan.words.filter((_,i)=>!drop.has(i)) as W[]).concat((data.wordsAdd||[]) as W[]);
  const hs=words.map(w=>w.h).sort((a,b)=>a-b);
  const mode=hs[Math.floor(hs.length/2)]||20;
  const sorted=[...words].sort((a,b)=>a.y-b.y);
  const out:Line[]=[];
  for(const w of sorted){
   const L=out[out.length-1];
   if(L&&w.y<L.bottom-0.45*Math.min(L.bottom-L.top,w.h)){L.ws.push(w);L.top=Math.min(L.top,w.y);L.bottom=Math.max(L.bottom,w.y+w.h)}
   else out.push({ws:[w],top:w.y,bottom:w.y+w.h,fs:0});
  }
  for(const L of out){
   L.ws.sort((a,b)=>a.x-b.x);
   const lh=L.ws.map(w=>w.h).sort((a,b)=>a-b);
   const med=lh[Math.floor(lh.length/2)]||mode;
   L.fs=med>mode*1.9?med*1.1:Math.min(Math.max(med*1.3,mode*0.9),mode*1.45);
  }
  // cap font by the vertical gap to the next line that shares x-space
  for(let i=0;i<out.length;i++){
   const L=out[i];
   const x0=Math.min(...L.ws.map(w=>w.x)),x1=Math.max(...L.ws.map(w=>w.x+w.w));
   for(let j=i+1;j<out.length;j++){
    const N=out[j];
    if(N.top>=L.bottom-1){
     const nx0=Math.min(...N.ws.map(w=>w.x)),nx1=Math.max(...N.ws.map(w=>w.x+w.w));
     if(nx0<x1&&nx1>x0){L.fs=Math.min(L.fs,Math.max(6,(N.top-L.top)*0.92));break}
    }
   }
  }
  return out;
 },[scan,data]);
 if(!scan||!data)return null;
 const W=scan.width,H=scan.height;
 const set=(id:string,value:string)=>{const next={...v,[id]:value};S(next);try{localStorage.setItem(key,JSON.stringify(next))}catch{}};
 const bx=(b:{x:number;y:number;w:number;h:number}):CSSProperties=>({left:b.x/W*100+'%',top:b.y/H*100+'%',width:b.w/W*100+'%',height:b.h/H*100+'%'});
 const drop=new Set(data.drop);
 const styleOf=(i:number)=>data.wordStyle[String(scan.words[i]===undefined?'':i)]||{};
 function check(group:string){const fields=scan.fields.filter(f=>f.group===group&&f.answer!==undefined);const next={...results};for(const f of fields){const value=f.kind==='radio'?String(v[f.name||f.id]===f.value):f.kind==='checkbox'?String(v[f.id]==='true'):norm(v[f.id]||'');next[f.id]=f.answer!.split('|').some(a=>norm(a)===value)}setResults(next)}
 const audioAll=[...scan.audio,...(data.audioAdd||[])];
 const removedLines=data.linesRemove||[];
 const rules=data.lines.filter(l=>!removedLines.some(r=>Math.abs(r.x-l.x)<12&&Math.abs(r.y-l.y)<12&&Math.abs(r.w-l.w)<12&&Math.abs(r.h-l.h)<12));
 const wordSpan=(w:W,keyPref:string)=>{
  const i=scan.words.indexOf(w);
  const st=i>=0?data.wordStyle[String(i)]||{}:{};
  const tap=/\p{L}/u.test(w.text);
  return <span key={keyPref} className={tap?'tapWord':undefined} role={tap?'button':undefined} tabIndex={tap?0:undefined} data-word={tap?cleanWord(w.text):undefined} data-phrase={w.phrase||w.text} aria-label={tap?`${w.text} · Bedeutung`:undefined} style={{color:st.c,fontWeight:st.b?700:undefined}}>{w.text}</span>;
 };
 return <div className="nativeAB12" data-native-book="ab-a12" data-native-page={page}>
  <div className="naCanvas" style={{aspectRatio:`${W}/${H}`}}>
   {data.rects.map((r,i)=><div key={'r'+i} className="naRect" style={{...bx(r),background:r.c}}/>)}
   {data.crops.map((c,i)=><img key={'c'+i} className="naArt" src={c.src} alt={c.alt} draggable={false} style={bx(c)}/>)}
   {rules.map((l,i)=><div key={'l'+i} className="naLine" style={{...bx(l),background:l.c||'#7a7a7a'}}/>)}
   {lines.map((L,li)=>{
    // cut the line into fragments wherever a field sits between two words
    const flds=scan.fields.filter(f=>{const c=f.y+f.h/2;return c>=L.top-2&&c<L.bottom+2});
    const frags:{x:number;y:number;run:W[]}[]=[];
    let run:W[]=[];
    const flush=()=>{if(run.length){frags.push({x:run[0].x,y:Math.min(...run.map(w=>w.y)),run});run=[]}};
    for(let k=0;k<L.ws.length;k++){
     const w=L.ws[k];
     if(k>0){const prev=L.ws[k-1];const cut=flds.find(f=>f.x>=prev.x+prev.w-2&&f.x+f.w<=w.x+6);if(cut||w.x-prev.x-prev.w>L.fs*1.6)flush()}
     run.push(w);
    }
    flush();
    const fs=L.fs/W*100+'cqw';
    const lh=(L.bottom-L.top)/W*100+'cqw';
    return <div key={'ln'+li}>{frags.map((f,fi)=><div key={fi} className="naText" style={{left:f.x/W*100+'%',top:L.top/H*100+'%',fontSize:fs,lineHeight:lh}}>{f.run.map((w,j)=><span key={j}>{j>0?' ':''}{wordSpan(w,'w'+li+'-'+fi+'-'+j)}</span>)}</div>)}</div>;
   })}
   {scan.fields.map(f=>{
    const res=results[f.id];
    const cls='naField '+(res===undefined?'':res?'naCorrect':'naWrong');
    if(f.kind==='radio')return <input key={f.id} type="radio" className={cls+' naRadio'} style={bx(f)} name={`${key}-${f.name||f.id}`} aria-label={f.label} checked={v[f.name||f.id]===f.value} onChange={()=>set(f.name||f.id,f.value||'')}/>;
    if(f.kind==='checkbox')return <input key={f.id} type="checkbox" className={cls+' naBox'} style={bx(f)} aria-label={f.label} checked={v[f.id]==='true'} onChange={e=>set(f.id,String(e.target.checked))}/>;
    return <input key={f.id} type="text" className={cls} style={{...bx(f),fontSize:f.h*0.85/W*100+'cqw'}} aria-label={f.label} data-native-field={f.id} value={v[f.id]||''} onChange={e=>set(f.id,e.target.value)} autoComplete="off" spellCheck={false}/>;
   })}
   {audioAll.map(a=><button key={a.id} type="button" className="naListen" style={bx(a)} aria-label={a.label} onClick={()=>{setActiveTrack(a.src);requestAnimationFrame(()=>{if(player.current){player.current.src=a.src;player.current.play().catch(()=>{})}})}}>▶ {a.label.replace(/^Originalaudio\s*/,'')}</button>)}
   {scan.groups.filter(g=>scan.fields.some(f=>f.group===g.id&&f.answer!==undefined)).map(g=>{
    const answered=scan.fields.filter(f=>f.group===g.id&&f.answer!==undefined);
    const done=answered.some(f=>results[f.id]!==undefined);
    const allRight=answered.every(f=>results[f.id]);
    let box=data.checks[g.id];
    if(!box){
     const gy0=Math.min(...answered.map(f=>f.y))-30,gy1=Math.max(...answered.map(f=>f.y+f.h));
     const near=scan.words.filter((w,i)=>!drop.has(i)&&w.y<gy1+40&&w.y+w.h>gy0);
     const bottom=Math.max(gy1,...near.map(w=>w.y+w.h));
     box={x:Math.min(Math.min(...answered.map(f=>f.x)),W-170),y:bottom+8,w:150,h:40};
     for(let t=0;t<12;t++){
      const hit=scan.words.find((w,i)=>!drop.has(i)&&w.x<box.x+box.w&&w.x+w.w>box.x&&w.y<box.y+box.h&&w.y+w.h>box.y);
      if(!hit)break;
      box={...box,y:hit.y+hit.h+6};
     }
    }
    return <div key={g.id} className="naCheck" style={bx(box)}><button type="button" onClick={()=>check(g.id)}>Prüfen ✓</button><output aria-live="polite">{done?(allRight?'✓ Richtig!':'Noch einmal'):''}</output></div>;
   })}
  </div>
  <div className="naAudioBelow"><audio ref={player} controls hidden={!activeTrack}/><span>{activeTrack?'Originalaudio · ':''}Antworten werden gespeichert</span></div>
 </div>;
}
