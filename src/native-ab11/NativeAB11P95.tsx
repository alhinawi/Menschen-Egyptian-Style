import {useLayoutEffect,useRef,useState} from 'react';
import {PageImage} from '../components/PageImage';
import {usePageReset} from '../exercises/usePageReset';
import spec from './pages/p95.json';
import './native-ab11-p95.css';
function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((s,i)=>/\p{L}/u.test(s)?<span className="tapWord" role="button" tabIndex={0} data-word={s.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text} key={i}>{s}</span>:s)}</>}
export function NativeAB11P95(){
 const host=useRef<HTMLDivElement>(null),[scale,S]=useState(1),[values,V]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem('native-ab11-95')||'{}')}catch{return {}}}),[saved,C]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const update=()=>S(Math.min(el.clientWidth/901,el.clientHeight/1275));update();const ro=new ResizeObserver(update);ro.observe(el);return()=>ro.disconnect()},[]);
 usePageReset('95','native-ab11-95',()=>{V({});C({})});
 const set=(id:string,value:string,group:string)=>{const next={...values,[id]:value};V(next);localStorage.setItem('native-ab11-95',JSON.stringify(next));C(c=>({...c,[group]:false}))};
 return <div className="ab11p95" data-native-ab11-page="95" ref={host}><div className="ab11p95Canvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>{spec.items.map((it:any,i:number)=>{
 const pos={left:it.x,top:it.y,width:it.w,height:it.h};
 if(it.k==='text')return <div key={i} className={'p95Text '+(it.font==='sans'?'p95Sans':'')} style={{...pos,fontSize:it.s,fontWeight:it.b?700:400,color:it.color,writingMode:it.vertical?'vertical-rl':undefined}}><Words text={it.t}/></div>;
 if(it.k==='art')return <PageImage key={i} className="p95Art" src={it.src} alt="Originalillustration" style={pos}/>;
 if(it.k==='line')return <div key={i} className="p95Line" style={{...pos,background:it.color}}/>;
 if(it.k==='badge')return <div key={i} className="p95Badge" style={{...pos,...(it.large?{fontSize:60,lineHeight:'60px'}:{})}}>{it.t}</div>;
 if(it.k==='field')return <input key={i} data-native-field={`ab11-p95-${it.id}`} className="p95Field" aria-label={it.id} dir="auto" style={pos} value={values[it.id]||''} onChange={e=>set(it.id,e.target.value,it.group)}/>;
 if(it.k==='check')return null;
 return null;
 })}</div></div>
}
