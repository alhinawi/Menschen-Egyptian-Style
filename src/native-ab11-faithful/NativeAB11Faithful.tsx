import {useLayoutEffect,useRef,useState} from 'react';
import {CheckButton} from '../components/CheckButton';
import {PageImage} from '../components/PageImage';
import {usePageReset} from '../exercises/usePageReset';
import '../native-ab11/native-ab11.css';
import './native-ab11-faithful.css';

type Item={k:string;[key:string]:any};
type Spec={w:number;h:number;checkX?:number;checkY?:number;items:Item[]};
const specs:Record<string,Spec>=import.meta.glob('./p*.json',{eager:true,import:'default'});
export const faithfulPages=new Set(Object.keys(specs).map(p=>p.match(/p(\d+)\.json$/)![1]));
// Gentium Book Basic and Fira Sans Bold: font box ascent / line height per em, measured in Chrome.
const METRIC:Record<string,[number,number]>={r:[.875,1.16],b:[.875,1.16],sans:[.935,1.2]};
function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\p{L}/u.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-word={w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text}>{w}</span>:w)}</>}

export function NativeAB11Faithful({page}:{page:string}){
 const spec=specs[`./p${page}.json`];
 const key='native-ab11f-'+page;
 const host=useRef<HTMLDivElement>(null);
 const [scale,setScale]=useState(.5);
 const [values,setValues]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});
 const [saved,setSaved]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const measure=()=>setScale(Math.min(el.clientWidth/spec.w,el.clientHeight/spec.h));measure();const ro=new ResizeObserver(measure);ro.observe(el);return()=>ro.disconnect()},[spec.w,spec.h]);
 usePageReset(page,key,()=>{setValues({});setSaved({})});
 const set=(id:string,v:string)=>setValues(o=>{const n={...o,[id]:v};localStorage.setItem(key,JSON.stringify(n));return n});
 const render=(it:Item,n:number)=>{
  switch(it.k){
   case 't':{const [asc,lh]=METRIC[it.f||'r'];return <div key={n} className={'nafText naf-'+(it.f||'r')+(it.cls?' '+it.cls:'')} style={{left:it.x,top:it.b-asc*it.s,fontSize:it.s,lineHeight:lh,color:it.col}}><Words text={it.t}/></div>}
   case 'bx':return <div key={n} className="nafBox" style={{left:it.x,top:it.y,width:it.w,height:it.h,background:it.bg}}/>;
   case 'ln':return <svg key={n} className="nafLine" width={spec.w} height={spec.h}><line x1={it.x1} y1={it.y1} x2={it.x2} y2={it.y2} stroke={it.col} strokeWidth={it.w}/></svg>;
   case 'a':return <PageImage key={n} className="nafArt" alt="" src={it.src} style={{left:it.x,top:it.y,width:it.w,height:it.h}}/>;
   case 'badge':return <div key={n} className="nafBadge" style={{left:it.ox,top:it.oy,width:it.x+it.w-it.ox,height:it.y+it.h-it.oy}}><i className="nafBadgeFill" style={{left:it.x-it.ox,top:it.y-it.oy,width:it.w,height:it.h}}/></div>;
   case 'tipp':return <div key={n} className="nafTipp" style={{left:it.x,top:it.y,width:it.w,height:it.h}}><span>TIPP</span></div>;
   case 'f':return <input key={n} className="nafField" data-native-field={it.id} aria-label={it.lab} style={{left:it.x,top:it.y-it.h+.75,width:it.w,height:it.h,borderBottomColor:it.col}} value={values[it.id]||''} onChange={e=>{set(it.id,e.target.value);setSaved({})}} autoComplete="off" spellCheck={false}/>;
   default:return null;
  }
 };
 return <div className="nativeAB11 nativeAB11F" ref={host} data-native-ab11f={page}><div className="nabCanvas nafCanvas" style={{width:spec.w,height:spec.h,transform:`translate(-50%,-50%) scale(${scale})`}}>
  {spec.items.map(render)}
 </div></div>;
}
