import type {CSSProperties} from 'react';
import {useLayoutEffect,useRef,useState} from 'react';
import {PageImage} from '../components/PageImage';
import {CheckButton} from '../components/CheckButton';
import {usePageReset} from '../exercises/usePageReset';
import spec from './pages/p93.json';
import './native-ab11-p93.css';
const answerMeasure=document.createElement('canvas').getContext('2d');
function answerSize(value:string,width:number){if(!answerMeasure||!value)return 15;answerMeasure.font='15px P93Serif';return Math.max(9,Math.min(15,15*(width-4)/Math.max(1,answerMeasure.measureText(value).width)))}
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\s+/g,' ');
function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((s,i)=>/\p{L}/u.test(s)?<span className="tapWord" role="button" tabIndex={0} data-word={s.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text} key={i}>{s}</span>:<span key={i} style={{fontStyle:'normal'}}>{s}</span>)}</>}
export function NativeAB11P93(){
 const host=useRef<HTMLDivElement>(null),[scale,S]=useState(1),[values,V]=useState<Record<string,string>>(()=>{try{return {...JSON.parse(localStorage.getItem('native-ab11-93')||'{}')}}catch{return {}}}),[checked,C]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const update=()=>S(Math.min(el.clientWidth/901,el.clientHeight/1275));update();const ro=new ResizeObserver(update);ro.observe(el);return()=>ro.disconnect()},[]);
 usePageReset('93','native-ab11-93',()=>{V({});C({})});
 const groupCorrect=(group:string)=>spec.items.filter((f:any)=>f.k==='radio'&&f.group===group&&f.answer===f.value).every((f:any)=>values[f.name]===f.answer);
 const set=(id:string,value:string)=>{const next={...values,[id]:value};V(next);localStorage.setItem('native-ab11-93',JSON.stringify(next));C(c=>({...c,[id.split('-')[0]]:false}))};
 return <div className="ab11p93" data-native-ab11-page="93" ref={host}><div className="ab11p93Canvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>{spec.items.map((it:any,i:number)=>{
 const pos={left:it.x,top:it.y,width:it.w,height:it.h};
 if(it.k==='text')return <div key={i} className={'p93Text '+(it.font==='sans'?'p93Sans':'')+(it.b?' p93Title':'')} style={{...pos,fontSize:it.s,fontWeight:it.b?700:400,fontStyle:it.italic?'italic':'normal',textAlign:it.align}}><Words text={it.t}/></div>;
 
 if(it.k==='art')return <PageImage key={i} className="p93Art" src={it.src} alt="Gedrucktes Beispiel" style={pos}/>;
 if(it.k==='card'||it.k==='tip'||it.k==='bubble')return <div key={i} className={'p93'+it.k} style={pos}/>;
 if(it.k==='audio')return <button key={i} type="button" className="p93Audio" data-track={String(Number(it.t)-100)} aria-label={'Audio '+it.t} onClick={()=>{const a=document.querySelector<HTMLAudioElement>('#audio');if(a){a.src='/assets/ab-cd1-track'+String(Number(it.t)-100)+'.mp3';const d=document.querySelector<HTMLElement>('.audioDock');if(d)d.hidden=false;void a.play().catch(()=>{});}}} style={pos}>▶ 1 {String(Number(it.t)-100)}</button>;
 if(it.k==='line')return <div key={i} className="p93Line" style={{...pos,height:it.h||1,background:it.color}}/>;
 if(it.k==='highlight')return <div key={i} className="p93Highlight" style={pos}/>;
 if(it.k==='badge')return <div key={i} className="p93Badge" style={{...pos,...(it.large?{fontSize:60,lineHeight:'65px'}:{})}}>{it.t}</div>;
 if(it.k==='side')return <div key={i} className="p93Side" style={pos}>{it.t}</div>;
 if(it.k==='speaker')return <div key={i} className={'p93Speaker '+it.color} style={pos}/>;
 if(it.k==='open')return <textarea key={i} className="p93Field p93Open" aria-label={it.id} data-native-field={it.id} style={pos} value={values[it.id]||''} onChange={e=>set(it.id,e.target.value)}/>;
 if(it.k==='radio')return <input key={i} type="radio" className={'p93Radio'+(checked[it.group]&&(!values[it.name]||values[it.name]===it.value)?(values[it.name]===it.answer?' correct':' wrong'):'')} data-native-radio={it.id} name={it.name} value={it.value} aria-label={it.name+': '+it.value} style={pos} checked={values[it.name]===it.value} onChange={()=>{set(it.name,it.value);C(c=>({...c,u9:false}))}}/>;
 if(it.k==='field'){
 const graded=checked[it.group]&&values[it.id]?.trim()&&it.answer;
 const status=graded?(it.answer.split('|').some((a:string)=>normalize(values[it.id])===normalize(a))?' correct':' wrong'):'';
 return <input key={i} data-native-field={it.id} className={'p93Field'+status+(it.group==='u8a'?' p93NotebookField':'')} aria-label={it.id} style={{...pos,'--p93-answer-size':answerSize(values[it.id]||'',it.w)+'px'} as CSSProperties} value={values[it.id]||''} onChange={e=>set(it.id,e.target.value)}/>;
 }
 if(it.k==='check')return <div key={i} className="p93Check" data-native-task={it.group} style={pos}><CheckButton onClick={()=>C(c=>({...c,[it.group]:true}))}/><output aria-live="polite">{checked[it.group]?(it.neutral?'Gespeichert':groupCorrect(it.group)?'Richtig!':'Noch einmal'):''}</output></div>;
 return null;
 })}</div></div>
}
