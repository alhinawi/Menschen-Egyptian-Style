import {useLayoutEffect,useRef,useState} from 'react';
import {PageImage} from '../components/PageImage';
import {usePageReset} from '../exercises/usePageReset';
import spec from './pages/p99.json';
import './native-ab11-p99.css';
function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((s,i)=>/\p{L}/u.test(s)?<span className="tapWord" role="button" tabIndex={0} data-word={s.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text} key={i}>{s}</span>:s)}</>}
export function NativeAB11P99(){
 const host=useRef<HTMLDivElement>(null),[scale,S]=useState(1);
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const update=()=>S(Math.min(el.clientWidth/901,el.clientHeight/1275));update();const ro=new ResizeObserver(update);ro.observe(el);return()=>ro.disconnect()},[]);
 usePageReset('99','native-ab11-99',()=>{});
 return <div className="ab11p99" data-native-ab11-page="99" ref={host}><div className="ab11p99Canvas nabCanvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>{spec.items.map((it:any,i:number)=>{
 const pos={left:it.x,top:it.y,width:it.w,height:it.h};
 if(it.k==='text')return <div key={i} className={'p99Text '+(it.f?'p99Sans':'')+(it.b?' p99Bold':'')+(it.i?' p99Italic':'')} style={{left:it.x,top:it.y,fontSize:it.s,color:it.c}}><Words text={it.t}/></div>;
 if(it.k==='art')return <PageImage key={i} className="p99Art" src={it.src} alt="Originalabbildung" style={pos}/>;
 if(it.k==='line')return <div key={i} className="p99Line" style={{...pos,background:it.color}}/>;
 if(it.k==='dot')return <div key={i} className="p99Dot" style={{...pos,borderColor:it.c,background:it.fill||'transparent'}}/>;
 if(it.k==='marker')return it.shape==='tri'
  ? <div key={i} className="p99MarkerTri" style={{left:it.x,top:it.y,borderLeftWidth:it.w/2,borderRightWidth:it.w/2,borderBottomWidth:it.h,borderBottomColor:it.c}}/>
  : <div key={i} className="p99MarkerSq" style={{...pos,background:it.c,fontSize:it.s}}/>;
 if(it.k==='chip')return <div key={i} className="p99Chip" style={{...pos,background:it.c,fontSize:it.s}}>{it.t}</div>;
 return null;
 })}</div></div>
}
