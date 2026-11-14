import type {CSSProperties} from 'react';
import {useLayoutEffect,useRef,useState} from 'react';
import {PageImage} from '../components/PageImage';
import {CheckButton} from '../components/CheckButton';
import {usePageReset} from '../exercises/usePageReset';
import spec from './pages/p94.json';
import './native-ab11-p94.css';
const answerMeasure=document.createElement('canvas').getContext('2d');
function answerSize(value:string,width:number){if(!answerMeasure||!value)return 15;answerMeasure.font='15px P94Serif';return Math.max(9,Math.min(15,15*(width-4)/Math.max(1,answerMeasure.measureText(value).width)))}
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\s+/g,' ');
function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((s,i)=>/\p{L}/u.test(s)?<span className="tapWord" role="button" tabIndex={0} data-word={s.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text} key={i}>{s}</span>:<span key={i} style={{fontStyle:'normal'}}>{s}</span>)}</>}
export function NativeAB11P94(){
 const host=useRef<HTMLDivElement>(null),[scale,S]=useState(1),[values,V]=useState<Record<string,string>>(()=>{try{return {'u2-a':'habe',...JSON.parse(localStorage.getItem('native-ab11-94')||'{}')}}catch{return {}}}),[checked,C]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const update=()=>S(Math.min(el.clientWidth/901,el.clientHeight/1275));update();const ro=new ResizeObserver(update);ro.observe(el);return()=>ro.disconnect()},[]);
 usePageReset('94','native-ab11-94',()=>{V({'u2-a':'habe'});C({})});
 const fieldRight=(f:any)=>{const v=normalize(values[f.id]||'');if(f.group==='u1b')return ['frühling','sommer','herbst','winter'].includes(v)&&spec.items.filter((q:any)=>q.k==='field'&&q.group==='u1b'&&normalize(values[q.id]||'')===v).length===1;return f.answer.split('|').some((a:string)=>normalize(a)===v)};
 const groupCorrect=(group:string)=>spec.items.filter((f:any)=>f.group===group&&(f.k==='field'&&f.answer||f.k==='radio'&&f.answer===f.value)).every((f:any)=>f.k==='radio'?values[f.name]===f.answer:fieldRight(f));
 const set=(id:string,value:string)=>{const next={...values,[id]:value};V(next);localStorage.setItem('native-ab11-94',JSON.stringify(next));C(c=>({...c,[id.split('-')[0]]:false}))};
 return <div className="ab11p94" data-native-ab11-page="94" ref={host}><div className="ab11p94Canvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>{spec.items.map((it:any,i:number)=>{
 const pos={left:it.x,top:it.y,width:it.w,height:it.h};
 if(it.k==='text')return <div key={i} className={'p94Text '+(it.font==='sans'?'p94Sans':'')+(it.b?' p94Title':'')} style={{...pos,fontSize:it.s,fontWeight:it.b?700:400,fontStyle:it.italic?'italic':'normal',textAlign:it.align,color:it.color}}><Words text={it.t}/></div>;
 
 if(it.k==='art'&&it.src.includes('example-x')&&(values['u2-a']!=='habe'||checked.u2))return null;
 if(it.k==='art')return <PageImage key={i} className="p94Art" src={it.src} alt="Gedrucktes Beispiel" style={pos}/>;
 if(it.k==='card'||it.k==='tip'||it.k==='bubble')return <div key={i} className={'p94'+it.k} style={pos}/>;
 if(it.k==='audio')return <button key={i} type="button" className="p94Audio" data-track={String(Number(it.t)-100)} aria-label={'Audio '+it.t} onClick={()=>{const a=document.querySelector<HTMLAudioElement>('#audio');if(a){a.src='/assets/ab-cd1-track'+String(Number(it.t)-100)+'.mp3';const d=document.querySelector<HTMLElement>('.audioDock');if(d)d.hidden=false;void a.play().catch(()=>{});}}} style={pos}>▶ 1 {String(Number(it.t)-100)}</button>;
 if(it.k==='line')return <div key={i} className="p94Line" style={{...pos,height:it.h||1,background:it.color}}/>;
 if(it.k==='highlight')return <div key={i} className="p94Highlight" style={pos}/>;
 if(it.k==='badge')return <div key={i} className="p94Badge" style={{...pos,...(it.large?{fontSize:60,lineHeight:'65px'}:{})}}>{it.t}</div>;
 if(it.k==='side')return <div key={i} className="p94Side" style={pos}>{it.t}</div>;
 if(it.k==='speaker')return <div key={i} className={'p94Speaker '+it.color} style={pos}/>;
 if(it.k==='open')return <textarea key={i} className="p94Field p94Open" aria-label={it.id} data-native-field={`ab11-p94-${it.id}`} style={pos} value={values[it.id]||''} onChange={e=>set(it.id,e.target.value)}/>;
 if(it.k==='radio')return <input key={i} type="radio" className={'p94Radio'+(checked[it.group]&&(!values[it.name]||values[it.name]===it.value)?(values[it.name]===it.answer?' correct':' wrong'):'')} data-native-radio={`ab11-p94-${it.id}`} name={`ab11-p94-${it.name}`} value={it.value} aria-label={it.name+': '+it.value} style={pos} checked={values[it.name]===it.value} onChange={()=>set(it.name,it.value)}/>;
 if(it.k==='field'){
 const graded=checked[it.group]&&it.answer;
 const status=graded?(fieldRight(it)?' correct':' wrong'):'';
 return <input key={i} data-native-field={`ab11-p94-${it.id}`} className={'p94Field'+status+(it.group==='u4'?' p94ForumField':it.group==='u1b'?' p94SeasonField':'')} aria-label={it.id} aria-invalid={status===' wrong'} style={{...pos,'--p94-answer-size':answerSize(values[it.id]||'',it.w)+'px'} as CSSProperties} value={values[it.id]||''} onChange={e=>set(it.id,e.target.value)}/>;
 }
 if(it.k==='check')return it.neutral?null:<div key={i} className="p94Check" data-native-task={it.group} style={pos}><CheckButton answers={Object.fromEntries(spec.items.filter((f:any)=>f.k==='field'&&f.group===it.group&&f.answer&&f.group!=='u1b').map((f:any)=>[`ab11-p94-${f.id}`,f.answer]))} onClick={()=>C(c=>({...c,[it.group]:true}))}/><output aria-live="polite">{checked[it.group]?(groupCorrect(it.group)?'Richtig!':'Noch einmal'):''}</output></div>;
 return null;
 })}</div></div>
}
