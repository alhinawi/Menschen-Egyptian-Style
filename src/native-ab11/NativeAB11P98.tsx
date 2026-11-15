import {useLayoutEffect,useRef,useState} from 'react';
import {PageImage} from '../components/PageImage';
import {usePageReset} from '../exercises/usePageReset';
import spec from './pages/p98.json';
import './native-ab11-p98.css';
function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((s,i)=>/\p{L}/u.test(s)?<span className="tapWord" role="button" tabIndex={0} data-word={s.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text} key={i}>{s}</span>:s)}</>}
export function NativeAB11P98(){
 const host=useRef<HTMLDivElement>(null),[scale,S]=useState(1);
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const update=()=>S(Math.min(el.clientWidth/901,el.clientHeight/1275));update();const ro=new ResizeObserver(update);ro.observe(el);return()=>ro.disconnect()},[]);
 usePageReset('98','native-ab11-98',()=>{});
 return <div className="ab11p98" data-native-ab11-page="98" ref={host}><div className="ab11p98Canvas nabCanvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>{spec.items.map((it:any,i:number)=>{
 const pos={left:it.x,top:it.y,width:it.w,height:it.h};
 if(it.k==='text')return <div key={i} className={'p98Text '+(it.f?'p98Sans':'')+(it.b?' p98Bold':'')+(it.i?' p98Italic':'')} style={{left:it.x,top:it.y,fontSize:it.s,color:it.c}}><Words text={it.t}/></div>;
 if(it.k==='art')return <PageImage key={i} className="p98Art" src={it.src} alt="Originalabbildung" style={pos}/>;
 if(it.k==='line')return <div key={i} className="p98Line" style={{...pos,background:it.color}}/>;
 if(it.k==='dot')return <div key={i} className="p98Dot" style={{...pos,borderColor:it.c,background:it.fill||'transparent'}}/>;
 if(it.k==='marker')return it.shape==='tri'
  ? <div key={i} className="p98MarkerTri" style={{left:it.x,top:it.y,borderLeftWidth:it.w/2,borderRightWidth:it.w/2,borderBottomWidth:it.h,borderBottomColor:it.c}}/>
  : <div key={i} className="p98MarkerSq" style={{...pos,background:it.c}}/>;
 if(it.k==='chip')return <div key={i} className="p98Chip" style={pos}>{it.t}</div>;
 return null;
 })}</div></div>
}
