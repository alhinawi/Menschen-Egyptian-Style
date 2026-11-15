import {ChoiceInput} from '../exercises/ChoiceInput';
import type {CSSProperties} from 'react';
import {useLayoutEffect,useRef,useState} from 'react';
import {PageImage} from '../components/PageImage';
import {CheckButton} from '../components/CheckButton';
import {usePageReset} from '../exercises/usePageReset';
import spec from './pages/p97.json';
import './native-ab11-p97.css';
const answerMeasure=document.createElement('canvas').getContext('2d');
function answerSize(value:string,width:number){if(!answerMeasure||!value)return 13;answerMeasure.font='13px P97Serif';return Math.max(9,Math.min(13,13*(width-4)/Math.max(1,answerMeasure.measureText(value).width)))}
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\s+/g,' ');
function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((s,i)=>/\p{L}/u.test(s)?<span className="tapWord" role="button" tabIndex={0} data-word={s.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text} key={i}>{s}</span>:s)}</>}
export function NativeAB11P97(){
 const host=useRef<HTMLDivElement>(null),[scale,S]=useState(1),[values,V]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem('native-ab11-97')||'{}')}catch{return {}}}),[checked,C]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const update=()=>S(Math.min(el.clientWidth/901,el.clientHeight/1275));update();const ro=new ResizeObserver(update);ro.observe(el);return()=>ro.disconnect()},[]);
 usePageReset('97','native-ab11-97',()=>{V({});C({})});
 const set=(id:string,value:string)=>{const next={...values,[id]:value};V(next);localStorage.setItem('native-ab11-97',JSON.stringify(next));C(c=>({...c,[id.split('-')[0]]:false}))};
 return <div className="ab11p97" data-native-ab11-page="97" ref={host}><div className="ab11p97Canvas nabCanvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>{spec.items.map((it:any,i:number)=>{
 const pos={left:it.x,top:it.y,width:it.w,height:it.h};
 if(it.k==='text')return <div key={i} className={'p97Text '+(it.f?'p97Sans':'')+(it.b?' p97Bold':'')+(it.i?' p97Italic':'')} style={{left:it.x,top:it.y,fontSize:it.s,color:it.c}}><Words text={it.t}/></div>;
 if(it.k==='art')return <PageImage key={i} className="p97Art" src={it.src} alt="Originalabbildung" style={pos}/>;
 if(it.k==='line')return <div key={i} className="p97Line" style={{...pos,background:it.color}}/>;
 if(it.k==='highlight')return <div key={i} className="p97Highlight" style={pos}/>;
 if(it.k==='box')return <div key={i} className="p97Box" style={{...pos,borderColor:it.bc,borderRadius:it.r||0}}/>;
 if(it.k==='badge')return <div key={i} className="p97Badge" style={pos}>{it.t}</div>;
 if(it.k==='chip')return <div key={i} className="p97Chip" style={pos}>{it.t}</div>;
 if(it.k==='field'){
 const graded=checked[it.group]&&values[it.id]?.trim()&&it.answer;
 const status=graded?(it.answer.split('|').some((a:string)=>normalize(values[it.id])===normalize(a))?' correct':' wrong'):'';
 return <ChoiceInput key={i} data-native-field={it.id} className={'p97Field'+status} aria-label={it.id} style={{...pos,'--p97-answer-size':answerSize(values[it.id]||'',it.w)+'px'} as CSSProperties} value={values[it.id]||''} onChange={e=>set(it.id,e.target.value)}/>;
 }
 if(it.k==='check')return <div key={i} className="p97Check" data-native-task={it.group} style={{left:it.x,top:it.y}}><CheckButton onClick={()=>C(c=>({...c,[it.group]:true}))}/><output aria-live="polite">{checked[it.group]?'Geprüft':''}</output></div>;
 return null;
 })}</div></div>
}
