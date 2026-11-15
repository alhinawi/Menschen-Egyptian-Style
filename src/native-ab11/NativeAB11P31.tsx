import type {CSSProperties} from 'react';
import {useLayoutEffect,useRef,useState} from 'react';
import {PageImage} from '../components/PageImage';
import {CheckButton} from '../components/CheckButton';
import {usePageReset} from '../exercises/usePageReset';
import spec from './pages/p31.json';
import './native-ab11-p31.css';
const answerMeasure=document.createElement('canvas').getContext('2d');
function answerSize(value:string,width:number){if(!answerMeasure||!value)return 13;answerMeasure.font='13px P31Serif';return Math.max(9,Math.min(13,13*(width-4)/Math.max(1,answerMeasure.measureText(value).width)))}
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\s+/g,' ');
function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((s,i)=>/\p{L}/u.test(s)?<span className="tapWord" role="button" tabIndex={0} data-word={s.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text} key={i}>{s}</span>:s)}</>}
export function NativeAB11P31(){
 const host=useRef<HTMLDivElement>(null),[scale,S]=useState(1),[values,V]=useState<Record<string,string>>(()=>{try{return {...JSON.parse(localStorage.getItem('native-ab11-31')||'{}')}}catch{return {}}}),[checked,C]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const update=()=>S(Math.min(el.clientWidth/901,el.clientHeight/1275));update();const ro=new ResizeObserver(update);ro.observe(el);return()=>ro.disconnect()},[]);
 usePageReset('31','native-ab11-31',()=>{V({});C({})});
 const groupCorrect=(group:string)=>{
  const radios=spec.items.filter((f:any)=>f.k==='radio'&&f.group===group);
  if(radios.length)return radios.filter((f:any)=>f.answer==='true').every((f:any)=>values['u4-'+f.name]===String(f.value));
  const fields=spec.items.filter((f:any)=>f.k==='field'&&f.group===group&&f.answer);
  return fields.length>0&&fields.every((f:any)=>values[f.id]?.trim()&&f.answer.split('|').some((a:string)=>normalize(values[f.id])===normalize(a)));
 };
 const set=(id:string,value:string)=>{const next={...values,[id]:value};V(next);localStorage.setItem('native-ab11-31',JSON.stringify(next));C(c=>({...c,[id.split('-')[0]]:false}))};
 return <div className="ab11p31" data-native-ab11-page="31" ref={host}><div className="ab11p31Canvas nabCanvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>{spec.items.map((it:any,i:number)=>{
 const pos={left:it.x,top:it.y,width:it.w,height:it.h};
 if(it.k==='text')return <div key={i} className={'p31Text '+(it.f==='sans'?'p31Sans ':'')+(it.f==='sansbold'?'p31Sans p31Bold ':'')+(it.f==='serif'?'p31SerifF ':'')} style={{left:it.x,top:it.y,fontSize:it.s,color:it.c,...(it.sx?{transform:`scaleX(${it.sx})`,transformOrigin:'left top'}:{}),...(it.ls?{letterSpacing:it.ls}:{})}}><Words text={it.t}/></div>;
 if(it.k==='art')return <PageImage key={i} className="p31Art" src={it.src} alt="Originalabbildung" style={pos}/>;
 if(it.k==='line')return <div key={i} className="p31Line" style={{...pos,background:it.color}}/>;
 if(it.k==='highlight')return <div key={i} className="p31Highlight" style={{...pos,background:it.c||'#f0f0d2'}}/>;
 if(it.k==='dot')return <div key={i} className="p31Dot" style={{...pos,background:it.c}}/>;
 if(it.k==='marker')return <div key={i} className={'p31Marker '+it.shape} style={it.shape==='sq'?{...pos,background:it.c}:{...pos,borderBottomWidth:it.h,borderBottomColor:it.c,borderLeftWidth:it.w/2,borderRightWidth:it.w/2}}/>;
 if(it.k==='arrow')return <div key={i} className="p31Arrow" style={{left:it.x,top:it.y+5,width:it.w}}/>;
 if(it.k==='numchip'&&it.plain)return <svg key={i} className="p31Tab" viewBox="0 0 53 77" style={{...pos,position:'absolute',background:'#a1cd15'}}><path d="M45 12 L8 57 H53 M45 12 V69 M31 69 H53" fill="none" stroke="white" strokeWidth="1.6"/></svg>;
 if(it.k==='numchip')return <div key={i} className={'p31Numchip'+(it.plain?' p31NumchipPlain':'')} style={pos}>{it.t}</div>;
 if(it.k==='rail')return <div key={i} className="p31Rail" style={{...pos,fontSize:it.s}}>{it.t}</div>;
 if(it.k==='chip')return <div key={i} className="p31Chip" style={pos}>{it.t}</div>;
 if(it.k==='audio')return <button key={i} type="button" className="p31Audio" data-track={it.track} aria-label={'Audio '+it.t} onClick={()=>{const a=document.querySelector<HTMLAudioElement>('#audio');if(a){a.src='/assets/ab-cd1-track'+String(Number(it.track)-100)+'.mp3';const d=document.querySelector<HTMLElement>('.audioDock');if(d)d.hidden=false;void a.play().catch(()=>{});}}} style={{left:it.x,top:it.y,fontSize:it.s}}><span className="p31Tri">▶</span><span className="p31AudioLabel">{it.t.replace('▶ ','')}</span></button>;
 if(it.k==='radio'){const sel=values['u4-'+it.name]===String(it.value);return <input key={i} type="radio" className={'p31Radio'+(checked[it.group]&&sel?(it.answer==='true'?' correct':' wrong'):'')} data-native-radio={`ab11-p31-${it.id}`} name={`ab11-p31-u4-${it.name}`} value={String(it.value)} aria-label={it.name+': '+it.value} style={pos} checked={sel} onChange={()=>{set('u4-'+it.name,String(it.value));C(c=>({...c,u4:false}))}}/>;}
 if(it.k==='field'){
 const graded=checked[it.group]&&values[it.id]?.trim()&&it.answer;
 const status=graded?(it.answer.split('|').some((a:string)=>normalize(values[it.id])===normalize(a))?' correct':' wrong'):'';
 return <input key={i} data-native-field={`ab11-p31-${it.id}`} className={'p31Field'+status+(it.nb?' p31FieldNB':'')} aria-label={it.id} style={{...pos,'--p31-answer-size':answerSize(values[it.id]||'',it.w)+'px',...(it.bc?{borderBottomColor:it.bc}:{})} as CSSProperties} value={values[it.id]||''} onChange={e=>set(it.id,e.target.value)}/>;
 }
 if(it.k==='check')return <div key={i} className="p31Check" data-native-task={it.group} style={{left:it.x,top:it.y}}><CheckButton onClick={()=>C(c=>({...c,[it.group]:true}))}/><output aria-live="polite">{checked[it.group]?(groupCorrect(it.group)?'Richtig!':'Noch einmal'):''}</output></div>;
 return null;
 })}</div></div>
}
