import type {CSSProperties} from 'react';
import {useLayoutEffect,useRef,useState} from 'react';
import {PageImage} from '../components/PageImage';
import {CheckButton} from '../components/CheckButton';
import {usePageReset} from '../exercises/usePageReset';
import spec from './pages/p92.json';
import './native-ab11-p92.css';
const answerMeasure=document.createElement('canvas').getContext('2d');
function answerSize(value:string,width:number){if(!answerMeasure||!value)return 15;answerMeasure.font='15px P92Serif';return Math.max(9,Math.min(15,15*(width-4)/Math.max(1,answerMeasure.measureText(value).width)))}
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\s+/g,' ');
function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((s,i)=>/\p{L}/u.test(s)?<span className="tapWord" role="button" tabIndex={0} data-word={s.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text} key={i}>{s}</span>:<span key={i} style={{fontStyle:'normal'}}>{s}</span>)}</>}
export function NativeAB11P92(){
 const host=useRef<HTMLDivElement>(null),[scale,S]=useState(1),[values,V]=useState<Record<string,string>>(()=>{try{return {"u9-a":"in",...JSON.parse(localStorage.getItem('native-ab11-92')||'{}')}}catch{return {}}}),[checked,C]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const update=()=>S(Math.min(el.clientWidth/901,el.clientHeight/1275));update();const ro=new ResizeObserver(update);ro.observe(el);return()=>ro.disconnect()},[]);
 usePageReset('92','native-ab11-92',()=>{V({'u9-a':'in'});C({})});
 const groupCorrect=(group:string)=>spec.items.filter((f:any)=>f.group===group&&(f.k==='field'&&f.answer||f.k==='radio'&&f.answer===f.value)).every((f:any)=>f.k==='radio'?values[f.name]===f.answer:f.answer.split('|').some((a:string)=>normalize(values[f.id]||'')===normalize(a)));
 const set=(id:string,value:string)=>{const next={...values,[id]:value};V(next);localStorage.setItem('native-ab11-92',JSON.stringify(next));C(c=>({...c,[id.split('-')[0]]:false}))};
 return <div className="ab11p92" data-native-ab11-page="92" ref={host}><div className="ab11p92Canvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>{spec.items.map((it:any,i:number)=>{
 const pos={left:it.x,top:it.y,width:it.w,height:it.h};
 if(it.k==='text')return <div key={i} className={'p92Text '+(it.font==='sans'?'p92Sans':'')+(it.b?' p92Title':'')} style={{...pos,fontSize:it.s,fontWeight:it.b?700:400,...(it.y>=458&&it.y<=521&&it.font==='sans'?{color:'#253a73'}:{})}}><Words text={it.t}/></div>;
 if(it.k==='art'&&it.src.includes('example-x')&&(values['u9-a']!=='in'||checked.u9))return null;
 if(it.k==='art')return <PageImage key={i} className="p92Art" src={it.src} alt="Gedrucktes Beispiel" style={pos}/>;
 if(it.k==='line')return <div key={i} className="p92Line" style={{...pos,background:it.color}}/>;
 if(it.k==='highlight')return <div key={i} className="p92Highlight" style={pos}/>;
 if(it.k==='badge')return <div key={i} className="p92Badge" style={pos}>{it.t}</div>;
 if(it.k==='side')return <div key={i} className="p92Side" style={pos}>{it.t}</div>;
 if(it.k==='speaker')return <div key={i} className={'p92Speaker '+it.color} style={pos}/>;
 if(it.k==='open')return <textarea key={i} className="p92Field p92Open" aria-label="8b: eigene Tagebucheinträge" data-native-field={`ab11-p92-${it.id}`} style={pos} value={values[it.id]||''} onChange={e=>set(it.id,e.target.value)}/>;
 if(it.k==='radio')return <input key={i} type="radio" className={'p92Radio'+(checked[it.group]&&(!values[it.name]||values[it.name]===it.value)?(values[it.name]===it.answer?' correct':' wrong'):'')} data-native-radio={`ab11-p92-${it.id}`} name={`ab11-p92-${it.name}`} value={it.value} aria-label={it.name+': '+it.value} style={pos} checked={values[it.name]===it.value} onChange={()=>{set(it.name,it.value);C(c=>({...c,u9:false}))}}/>;
 if(it.k==='field'){
 const graded=checked[it.group]&&it.answer;
 const status=graded?(it.answer.split('|').some((a:string)=>normalize(values[it.id]||'')===normalize(a))?' correct':' wrong'):'';
 return <input key={i} data-native-field={`ab11-p92-${it.id}`} className={'p92Field'+status+(it.group==='u8a'?' p92NotebookField':'')} aria-label={it.id} aria-invalid={status===' wrong'} style={{...pos,'--p92-answer-size':(it.group==='u8a'?9:answerSize(values[it.id]||'',it.w))+'px'} as CSSProperties} value={values[it.id]||''} onChange={e=>set(it.id,e.target.value)}/>;
 }
 if(it.k==='check')return <div key={i} className="p92Check" data-native-task={it.group} style={pos}><CheckButton answers={Object.fromEntries(spec.items.filter((f:any)=>f.k==='field'&&f.group===it.group&&f.answer).map((f:any)=>[`ab11-p92-${f.id}`,f.answer]))} onClick={()=>C(c=>({...c,[it.group]:true}))}/><output aria-live="polite">{checked[it.group]?(it.neutral?'Gespeichert':groupCorrect(it.group)?'Richtig!':'Noch einmal'):''}</output></div>;
 return null;
 })}</div></div>
}
