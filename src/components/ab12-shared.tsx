import {usePageReset} from '../exercises/usePageReset';
import {useLayoutEffect,useRef,useState} from 'react';
import type {ReactNode} from 'react';
import './native-ab12.css';
import './native-ab12-ranges.css';

export function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\p{L}/u.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-word={w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text}>{w}</span>:w)}</>}
export const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\s+/g,' ');

export interface AB12Helpers {
  W:number;H:number;values:Record<string,string>;results:Record<string,boolean>;
  set:(id:string,v:string)=>void;sr:(r:Record<string,boolean>)=>void;
  line:(x:number,y:number,w:number,fs:number,t:string,opts?:LineOpts)=>ReactNode;
  wl:(y:number,fs:number,words:WlWord[],opts?:LineOpts)=>ReactNode;
  runs:(x:number,y:number,w:number,fs:number,parts:RunPart[],opts?:LineOpts)=>ReactNode;
  art:(name:string,x:number,y:number,w:number,h:number)=>ReactNode;
  field:(id:string,x:number,y:number,w:number,label:string,cls?:string)=>ReactNode;
  area:(id:string,x:number,y:number,w:number,h:number,label:string)=>ReactNode;
  rule:(x:number,y:number,w:number)=>ReactNode;
  dot:(id:string,value:string,x:number,y:number,label:string,checkbox?:boolean)=>ReactNode;
  check:(id:string,x:number,y:number,answers:Record<string,string>)=>ReactNode;
  title:(n:string,x:number,y:number,w:number,t:string,cls?:string)=>ReactNode;
  kb:(x:number,y:number,t:string)=>ReactNode;
  side:(x:number,y:number,t:string)=>ReactNode;
  audio:(src:string,x:number,y:number,label:string)=>ReactNode;
  strike:(id:string,x:number,y:number,words:string[],sep?:string,fixed?:string)=>ReactNode;
  head:(x:number,y:number,w:number,t:string,ruleW:number,color?:string)=>ReactNode;
  box:(n:string,x:number,y:number,color?:string)=>ReactNode;
  rect:(x:number,y:number,w:number,h:number,c:string)=>ReactNode;
  foot:(x:number,y:number,t:string)=>ReactNode;
  tab:(x:number,y:number,w:number,h:number,n:string,color:string)=>ReactNode;
  modTab:(x:number,y:number,t:string)=>ReactNode;
}
export interface LineOpts {b?:1;c?:string;bg?:string;fam?:'serif'|'sans'|'fira';i?:1;ls?:number;cls?:string;nowrap?:boolean}
export type RunPart = string | {t:string;b?:1;c?:string;bg?:string;i?:1};
export interface WlWord {x:number;w:number;t:string;b?:1;c?:string;bg?:string}
/** Em-box top = baseline - ASC*fs (calibrated for Liberation/Times metrics). */
const ASC=0.9;

/** Shared canvas + helpers for the narrow AB A1.2 native pages (807/810 wide). */
export function AB12Canvas({page,width:W,height:H,children}:{page:string;width:number;height:number;children:(h:AB12Helpers)=>ReactNode}){
 const root=useRef<HTMLDivElement>(null),player=useRef<HTMLAudioElement>(null);
 const [scale,ss]=useState(.6);const key='native-ab12-'+page;
 const [values,sv]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});
 const [results,sr]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=root.current!;const obs=new ResizeObserver(()=>ss(Math.min(el.clientWidth/W,(el.clientHeight-38)/H)));obs.observe(el);return ()=>obs.disconnect()},[W,H]);
 // Fit every generated text line to its printed width (scaleX, left edge fixed).
 useLayoutEffect(()=>{const el=root.current;if(!el)return;const fit=()=>{for(const d of el.querySelectorAll<HTMLElement>('.naFit')){const s=d.querySelector<HTMLElement>('.naFitI');if(!s)continue;s.style.transform='none';const target=Number(d.dataset.w);const natural=s.offsetWidth;if(natural>0)s.style.transform=`scaleX(${target/natural})`}for(const s of el.querySelectorAll<HTMLElement>('.naW')){s.style.transform='none';const target=Number(s.dataset.w);const natural=s.offsetWidth;if(natural>0)s.style.transform=`scaleX(${Math.min(target/natural,1.6)})`}};fit();const t=setTimeout(fit,300);return ()=>clearTimeout(t)},[page]);
 usePageReset(page,key,()=>{sv({});sr({})});
 const set=(id:string,v:string)=>{const n={...values,[id]:v};sv(n);localStorage.setItem(key,JSON.stringify(n))};
 const fam=(f?:LineOpts['fam'])=>f==='fira'?"FiraSans,'Trebuchet MS',sans-serif":f==='sans'?"Arial,Helvetica,sans-serif":f==='serif'?"'Times New Roman',Times,serif":"Georgia,'Times New Roman',serif";
 const line=(x:number,y:number,w:number,fs:number,t:string,opts:LineOpts={})=><div className={'naFit '+(opts.cls||'')} data-w={w} style={{left:x,top:y,width:w,fontSize:fs,fontWeight:opts.b?700:400,fontStyle:opts.i?'italic':'normal',color:opts.c,background:opts.bg,fontFamily:fam(opts.fam),letterSpacing:opts.ls}}><span className="naFitI"><Words text={t}/></span></div>;
 const runs=(x:number,y:number,w:number,fs:number,parts:RunPart[],opts:LineOpts={})=><div className={'naFit '+(opts.cls||'')} data-w={w} style={{left:x,top:y,width:w,fontSize:fs,color:opts.c,fontFamily:fam(opts.fam),letterSpacing:opts.ls}}><span className="naFitI">{parts.map((p,i)=>typeof p==='string'?<Words key={i} text={p}/>:<span key={i} style={{fontWeight:p.b?700:400,color:p.c,background:p.bg,fontStyle:p.i?'italic':'normal'}}><Words text={p.t}/></span>)}</span></div>;
 const wl=(y:number,fs:number,words:WlWord[],opts:LineOpts={})=>{const phrase=words.map(w=>w.t).join(' ');return <>{words.map((wd,i)=>{const word=wd.t.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'');return <span key={i} className="naW" data-w={wd.w} style={{left:wd.x,top:Math.round((y-fs*ASC)*10)/10,fontSize:fs,fontWeight:(wd.b||opts.b)?700:400,fontStyle:opts.i?'italic':'normal',color:wd.c||opts.c,background:wd.bg,fontFamily:fam(opts.fam)}}>{/\p{L}/u.test(wd.t)?<span className="tapWord" role="button" tabIndex={0} data-word={word} data-phrase={phrase}>{wd.t}</span>:wd.t}</span>})}</>};
 const art=(name:string,x:number,y:number,w:number,h:number)=><img className="naArt" src={`assets/book-crops/native-ab12-p${page}-${name}.png`} alt={'Originalillustration '+name} style={{left:x,top:y,width:w,height:h}}/>;
 const field=(id:string,x:number,y:number,w:number,label:string,cls='')=><input className={'naField '+cls} aria-label={label} data-native-field={id} style={{left:x,top:y,width:w}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>;
 const area=(id:string,x:number,y:number,w:number,h:number,label:string)=><textarea className="naField naArea" aria-label={label} data-native-field={id} style={{left:x,top:y,width:w,height:h}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>;
 const rule=(x:number,y:number,w:number)=><div className="naRule" style={{left:x,top:y,width:w}}/>;
 const dot=(id:string,value:string,x:number,y:number,label:string,checkbox=false)=><input className="naDot" type={checkbox?'checkbox':'radio'} aria-label={label} name={key+'-'+id} checked={checkbox?values[id]==='true':values[id]===value} onChange={e=>set(id,checkbox?String(e.target.checked):value)} style={{left:x,top:y}}/>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="naCheck" data-check={id} style={{left:x,top:y}}><button onClick={()=>sr({...results,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(v=>normalize(v)===normalize(values[k]||(a==='false'?'false':''))))})}>Prüfen ✓</button><output aria-live="polite">{id in results?(results[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const title=(n:string,x:number,y:number,w:number,t:string,cls='')=><div className={'naTitle2 '+cls} style={{left:x,top:y,width:w}}><b>{n}</b><span><Words text={t}/></span></div>;
 const kb=(x:number,y:number,t:string)=><div className="naKB" style={{left:x,top:y}}>{t}</div>;
 const side=(x:number,y:number,t:string)=><div className="naSide" style={{left:x,top:y}}>{t}</div>;
 const head=(x:number,y:number,w:number,t:string,ruleW:number,color='#4357ad')=><><div className="naHeadline" style={{left:x,top:y,width:w}}><Words text={t}/></div><div className="naHeadRule" style={{left:x+w+6,top:y+30,width:ruleW,borderBottom:'2px solid '+color}}/></>;
 const foot=(x:number,y:number,t:string)=><div className="naFooter" style={{left:x,top:y}}>{t}</div>;
 const tab=(x:number,y:number,w:number,h:number,n:string,color:string)=><div className="naLesTab" style={{left:x,top:y,width:w,height:h,background:color}}><Words text={n}/></div>;
 const modTab=(x:number,y:number,t:string)=><div className="naModTab" style={{left:x,top:y}}>{t}</div>;
 const box=(n:string,x:number,y:number,color='#7c022b')=><div className="naNumBox" style={{left:x,top:y,background:color}}>{n}</div>;
 const rect=(x:number,y:number,w:number,h:number,c:string)=><div className="naRect" style={{left:x,top:y,width:w,height:h,background:c}}/>;
 const audio=(src:string,x:number,y:number,label:string)=><button className="naAudio" style={{left:x,top:y}} aria-label={'Originalaudio '+label+' abspielen'} onClick={()=>{if(player.current){player.current.src=src;player.current.play().catch(()=>{})}}}>▶ {label}</button>;
 const strike=(id:string,x:number,y:number,words:string[],sep=' – ',fixed='')=><div className="naStrikeRow" style={{left:x,top:y}}>{words.map((s,i)=><span key={s}><button disabled={!!fixed} className={(fixed?fixed===s:values[id]===s)?'struck':''} aria-label={id+' streichen '+s} onClick={()=>set(id,values[id]===s?'':s)}><Words text={s}/></button>{i<words.length-1?sep:''}</span>)}</div>;
 const h:AB12Helpers={W,H,values,results,set,sr,line,wl,runs,art,field,area,rule,dot,check,title,kb,side,audio,strike,head,foot,tab,modTab,box,rect};
 return <div className="nativeAB12" ref={root} data-native-ab12={page}><style>{"@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-400.woff2') format('woff2');font-weight:400}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-700.woff2') format('woff2');font-weight:700}"}</style><div className={'naCanvas'+(W<1000?' naNarrow':'')} style={{width:W,height:H,transform:`translate(-50%,-50%) scale(${scale})`}}>{children(h)}</div><audio ref={player} className="naPlayer"/></div>;
}
