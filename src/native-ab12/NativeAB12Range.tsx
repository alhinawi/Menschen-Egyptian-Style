import {PageImage} from '../components/PageImage';
import {CheckButton} from '../components/CheckButton';
import {useLayoutEffect,useRef,useState} from 'react';
import {usePageReset} from '../exercises/usePageReset';
import {LineMatching} from '../exercises/LineMatching';
import '../components/native-ab12.css';
import './native-ab12-range.css';

type Item={k:string;[key:string]:any};
type Spec={w:number;h:number;items:Item[]};
const specs:Record<string,Spec>=import.meta.glob('./range/p*.json',{eager:true,import:'default'});
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\s+/g,' ');
function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\p{L}/u.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-word={w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text}>{w}</span>:w)}</>}

function Fit({it}:{it:Item}){
 const ref=useRef<HTMLSpanElement>(null),base=useRef<HTMLElement>(null);
 useLayoutEffect(()=>{const el=ref.current,bs=base.current;if(!el||!bs)return;let done=false;const run=()=>{const box=el.parentElement as HTMLElement;const canvas=el.closest('.naCanvas') as HTMLElement;const ratio=(canvas.getBoundingClientRect().width/canvas.offsetWidth)||1;box.style.top=(it.y-(it.s||22)*.84)+'px';const off=(bs.getBoundingClientRect().bottom-box.getBoundingClientRect().top)/ratio;box.style.top=(it.y-off)+'px';if(it.w){el.style.transform='none';const nat=el.offsetWidth;if(nat>0){const r=Math.max(.6,Math.min(1.5,it.w/nat));el.style.transform=`scaleX(${r})`}}};run();document.fonts?.ready.then(()=>{if(!done)run()});const fs2=document.fonts,h=()=>{if(!done)run()};fs2?.addEventListener?.('loadingdone',h);return()=>{done=true;fs2?.removeEventListener?.('loadingdone',h)}},[it.w,it.t,it.s,it.b,it.y]);
 return <span ref={ref} className="naFitIn"><Words text={it.t}/><i ref={base} className="naBase"/></span>;
}

export function NativeAB12Range({page}:{page:string}){
 const spec=specs[`./range/p${page}.json`];
 const key='native-ab12-'+page;
 const root=useRef<HTMLDivElement>(null),player=useRef<HTMLAudioElement>(null);
 const W=spec.w,H=spec.h;const dfs=['47','48','49','50','51'].includes(page)?20:22;
 const [scale,ss]=useState(.4);
 const [values,sv]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});
 const [results,sr]=useState<Record<string,boolean>>({});
 const [epoch,se]=useState(0);
 useLayoutEffect(()=>{const el=root.current!;const obs=new ResizeObserver(()=>ss(Math.min(el.clientWidth/W,(el.clientHeight-38)/H)));obs.observe(el);return ()=>obs.disconnect()},[W,H]);
 usePageReset(page,key,()=>{sv({});sr({});se(e=>e+1)});
 const set=(id:string,v:string)=>sv(o=>{const n={...o,[id]:v};localStorage.setItem(key,JSON.stringify(n));return n});
 const ok=(i:Item)=>{const v=values[i.id]||'';if(i.k==='f')return String(i.a).split('|').some(a=>normalize(a)===normalize(v));if(i.k==='w')return (v==='1')===!!i.a;if(i.k==='d')return i.cb?(v==='true')===(i.a===true):(i.a===true?v===i.v:v!==i.v);return true};
 const grade=(g:string)=>{const its=spec.items.filter(i=>i.g===g&&i.a!==undefined&&i.a!=='');sr(r=>({...r,[g]:its.length>0&&its.every(ok)}))};
 const render=(it:Item,n:number)=>{
  switch(it.k){
   case 't':return <div key={n} className={'naText naR '+(it.c||'')+(it.b?' naRBold':'')+(it.i?' naRIt':'')} style={{left:it.x,top:it.y-.84*(it.s||dfs),fontSize:it.s||dfs,color:it.col,['--naRs' as any]:(it.s||dfs)+'px'}}><Fit it={it}/></div>;
   case 'f':return <input key={n} className={'naField naRField'+(it.c?' '+it.c:'')} aria-label={it.l} data-native-field={it.id} maxLength={it.max}  style={{left:it.x,top:it.y-(it.hh||27),width:it.w,height:it.hh||27,...(it.bc?{borderBottomColor:it.bc+'!important'}:{})}} value={values[it.id]||''} onChange={e=>set(it.id,e.target.value)} autoComplete="off" spellCheck={false}/>;
   case 'r':return <div key={n} className="naRRule" style={{left:it.x,top:it.y,width:it.w,height:it.h||2,background:it.col}}/>;
   case 'a':return <PageImage key={n} className="naArt" src={`assets/book-crops/native-ab12-p${page}-${it.n}.png`} alt={it.alt||('Originalillustration '+it.n)} style={{left:it.x,top:it.y,width:it.w,height:it.h}}/>;
   case 'ti':return <div key={n} className="naRTitle" style={{left:it.x,top:it.y}}><span className="naRBadge" style={{width:it.bw||27,height:it.bh||27,background:it.col,lineHeight:(it.bh||27)+'px'}}>{it.n}</span></div>;
   case 'd':return <input key={n} className={'naDot naRDot'+(it.lt?' naRDotL':'')} type={it.cb?'checkbox':'radio'} aria-label={it.l} name={key+'-'+(it.name||it.id)} checked={it.cb?values[it.id]==='true':values[it.id]===it.v} onChange={e=>set(it.id,it.cb?String(e.target.checked):it.v)} style={{left:it.x,top:it.y,width:it.s||24,height:it.s||24}}/>;
   case 'chk':return <div key={n} className="naCheck" style={{left:it.x,top:it.y}}><CheckButton onClick={()=>grade(it.g)}></CheckButton><output aria-live="polite">{it.g in results?(results[it.g]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
   case 'bx':return <div key={n} className="naRBx" style={{left:it.x,top:it.y,width:it.w,height:it.h,background:it.bg,border:it.bd?('1.5px solid '+it.bd):undefined,boxSizing:'border-box'}}/>;
   case 'w':return <button key={n} type="button" className={'naRWord'+(values[it.id]==='1'?' on':'')} aria-pressed={values[it.id]==='1'} aria-label={'Durchstreichen: '+it.l} style={{left:it.x-3,top:it.y-21,width:it.w+6,height:27}} onClick={()=>set(it.id,values[it.id]==='1'?'0':'1')}/>;
   case 'au':return <button key={n} className="naAudio naRAudio" style={{left:it.x,top:it.y,width:it.w,height:it.h}} aria-label={'Originalaudio '+it.l+' abspielen'} onClick={()=>{if(player.current){player.current.src=it.src;player.current.play().catch(()=>{})}}}>{it.n?<PageImage src={`assets/book-crops/native-ab12-p${page}-${it.n}.png`} alt="" style={{width:'100%',height:'100%',display:'block'}}/>:'▶ '+it.l}</button>;
   case 'm':return <LineMatching key={n+'-'+epoch} id={it.id} width={W} height={H} {...it.p} values={Object.fromEntries(Object.entries(values).filter(([k])=>k.startsWith(it.id+'-')))} onMatch={(k,v)=>set(k,v)}/>;
   default:return null;
  }
 };
 return <div className="nativeAB12" ref={root} data-native-ab12={page}><style>{"@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-400.woff2') format('woff2');font-weight:400}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-700.woff2') format('woff2');font-weight:700}@font-face{font-family:FiraSansCond;src:url('assets/fonts/firasanscond-latin-400.woff2') format('woff2');font-weight:400}"}</style><div className="naCanvas naRCanvas" style={{width:W,height:H,transform:`translate(-50%,-50%) scale(${scale})`}}>{spec.items.map(render)}</div><audio ref={player} className="naPlayer"/></div>;
}
export const hasRangePage=(page:string)=>!!specs[`./range/p${page}.json`];
