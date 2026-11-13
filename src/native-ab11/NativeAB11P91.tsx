import type {CSSProperties} from 'react';
import {useLayoutEffect,useRef,useState} from 'react';
import {PageImage} from '../components/PageImage';
import {CheckButton} from '../components/CheckButton';
import {usePageReset} from '../exercises/usePageReset';
import spec from './pages/p91.json';
import './native-ab11-p91.css';
const answerMeasure=document.createElement('canvas').getContext('2d');
function answerSize(value:string,width:number){if(!answerMeasure||!value)return 15;answerMeasure.font='15px P91Serif';return Math.max(9,Math.min(15,15*(width-4)/Math.max(1,answerMeasure.measureText(value).width)))}
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\s+/g,' ');
function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((s,i)=>/\p{L}/u.test(s)?<span className="tapWord" role="button" tabIndex={0} data-word={s.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text} key={i}>{s}</span>:s)}</>}
export function NativeAB11P91(){
 const host=useRef<HTMLDivElement>(null),[scale,S]=useState(1),[values,V]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem('native-ab11-91')||'{}')}catch{return {}}}),[checked,C]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const update=()=>S(Math.min(el.clientWidth/901,el.clientHeight/1275));update();const ro=new ResizeObserver(update);ro.observe(el);return()=>ro.disconnect()},[]);
 usePageReset('91','native-ab11-91',()=>{V({});C({})});
 const groupCorrect=(group:string)=>spec.items.filter((f:any)=>f.k==='field'&&f.group===group&&f.answer).every((f:any)=>f.answer.split('|').some((a:string)=>normalize(values[f.id]||'')===normalize(a)));
 const set=(id:string,value:string)=>{const next={...values,[id]:value};V(next);localStorage.setItem('native-ab11-91',JSON.stringify(next));C(c=>({...c,[id.split('-')[0]]:false}))};
 return <div className="ab11p91" data-native-ab11-page="91" ref={host}><div className="ab11p91Canvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>{spec.items.map((it:any,i:number)=>{
 const pos={left:it.x,top:it.y,width:it.w,height:it.h};
 if(it.k==='text')return <div key={i} className={'p91Text '+(it.font==='sans'?'p91Sans':'')+(it.b?' p91Title':'')} style={{...pos,fontSize:it.s,fontWeight:it.b?700:400}}><Words text={it.t}/></div>;
 if(it.k==='art')return <PageImage key={i} className="p91Art" src={it.src} alt="Gedrucktes Beispiel" style={pos}/>;
 if(it.k==='line')return <div key={i} className="p91Line" style={{...pos,background:it.color}}/>;
 if(it.k==='highlight')return <div key={i} className="p91Highlight" style={pos}/>;
 if(it.k==='badge')return <div key={i} className="p91Badge" style={pos}>{it.t}</div>;
 if(it.k==='side')return <div key={i} className="p91Side" style={pos}>{it.t}</div>;
 if(it.k==='speaker')return <div key={i} className={'p91Speaker '+it.color} style={pos}/>;
 if(it.k==='field'){
 const graded=checked[it.group]&&it.answer;
 const status=graded?(it.answer.split('|').some((a:string)=>normalize(values[it.id]||'')===normalize(a))?' correct':' wrong'):'';
 return <input key={i} data-native-field={`ab11-p91-${it.id}`} className={'p91Field'+status} aria-invalid={checked[it.group]&&!!it.answer?status===' wrong':undefined} aria-label={it.id} style={{...pos,'--p91-answer-size':answerSize(values[it.id]||'',it.w)+'px'} as CSSProperties} value={values[it.id]||''} onChange={e=>set(it.id,e.target.value)}/>;
 }
 if(it.k==='check')return <div key={i} className="p91Check" data-native-task={it.group} style={pos}><CheckButton answers={Object.fromEntries(spec.items.filter((f:any)=>f.k==='field'&&f.group===it.group&&f.answer).map((f:any)=>[`ab11-p91-${f.id}`,f.answer]))} onClick={()=>C(c=>({...c,[it.group]:true}))}/><output aria-live="polite">{checked[it.group]?(it.neutral?'Gespeichert':groupCorrect(it.group)?'Richtig!':'Noch einmal'):''}</output></div>;
 return null;
 })}</div></div>
}
