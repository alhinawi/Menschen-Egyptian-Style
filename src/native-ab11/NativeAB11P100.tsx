import {useLayoutEffect,useRef,useState} from 'react';
import {PageImage} from '../components/PageImage';
import {usePageReset} from '../exercises/usePageReset';
import spec from './pages/p100.json';
import './native-ab11-p100.css';
function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((s,i)=>/\p{L}/u.test(s)?<span className="tapWord" role="button" tabIndex={0} data-word={s.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text} key={i}>{s}</span>:s)}</>}
export function NativeAB11P100(){
 const host=useRef<HTMLDivElement>(null),[scale,S]=useState(1);
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const update=()=>S(Math.min(el.clientWidth/901,el.clientHeight/1275));update();const ro=new ResizeObserver(update);ro.observe(el);return()=>ro.disconnect()},[]);
 usePageReset('100','native-ab11-100',()=>{});
 return <div className="ab11p100" data-native-ab11-page="100" ref={host}><div className="ab11p100Canvas nabCanvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>{spec.items.map((it:any,i:number)=>{
 const pos={left:it.x,top:it.y,width:it.w,height:it.h};
 if(it.k==='text')return <div key={i} className={'p100Text '+(it.f?'p100Sans ':'')+(it.d?'p100DSans ':'')+(it.n?'p100Cond ':'')+(it.g?'p100Gentium ':'')+(it.b?' p100Bold':'')+(it.i?' p100Italic':'')} style={{left:it.x,top:it.y,fontSize:it.s,color:it.c,...(it.sx?{transform:`scaleX(${it.sx})`,transformOrigin:'left top'}:{}),...(it.ls?{letterSpacing:it.ls}:{})}}><Words text={it.t}/></div>;
 if(it.k==='art')return <PageImage key={i} className="p100Art" src={it.src} alt="Originalabbildung" style={pos}/>;
 if(it.k==='line')return <div key={i} className="p100Line" style={{...pos,background:it.color}}/>;
 if(it.k==='rect')return <div key={i} className="p100Rect" style={{...pos,background:it.fill}}/>;
 if(it.k==='rule')return <div key={i} className="p100Rule" style={{left:it.x,top:it.y,width:it.w,height:it.h,background:it.c,transform:`rotate(${it.deg}deg)`,transformOrigin:'left center'}}/>;
 if(it.k==='chip')return <div key={i} className={'p100Chip'+(it.g?' p100ChipGrad':'')} style={{...pos,background:it.c,fontSize:it.s}}>{it.t}</div>;
 return null;
 })}</div></div>
}
