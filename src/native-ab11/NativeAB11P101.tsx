import {useLayoutEffect,useRef,useState} from 'react';
import {PageImage} from '../components/PageImage';
import {usePageReset} from '../exercises/usePageReset';
import spec from './pages/p101.json';
import './native-ab11-p101.css';
function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((s,i)=>/\p{L}/u.test(s)?<span className="tapWord" role="button" tabIndex={0} data-word={s.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text} key={i}>{s}</span>:s)}</>}
export function NativeAB11P101(){
 const host=useRef<HTMLDivElement>(null),[scale,S]=useState(1);
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const update=()=>S(Math.min(el.clientWidth/901,el.clientHeight/1275));update();const ro=new ResizeObserver(update);ro.observe(el);return()=>ro.disconnect()},[]);
 usePageReset('101','native-ab11-101',()=>{});
 return <div className="ab11p101" data-native-ab11-page="101" ref={host}><div className="ab11p101Canvas nabCanvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>{spec.items.map((it:any,i:number)=>{
 const pos={left:it.x,top:it.y,width:it.w,height:it.h};
 if(it.k==='text')return <div key={i} className={'p101Text'+(it.b?' p101Bold':'')} style={{left:it.x,top:it.y,fontSize:it.s,...(it.sx?{transform:`scaleX(${it.sx})`,transformOrigin:'left top'}:{}),...(it.ls?{letterSpacing:it.ls}:{})}}><Words text={it.t}/></div>;
 if(it.k==='art')return <PageImage key={i} className="p101Art" src={it.src} alt="Originalabbildung" style={pos}/>;
 return null;
 })}</div></div>
}
