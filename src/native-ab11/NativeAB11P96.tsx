import {useLayoutEffect,useRef,useState} from 'react';
import type {CSSProperties} from 'react';
import {PageImage} from '../components/PageImage';
import {usePageReset} from '../exercises/usePageReset';
import spec from './pages/p96.json';
import './native-ab11-p96.css';
const norm=(s:string)=>s.trim().toLocaleLowerCase('de').replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss').replace(/[.,;]+$/,'').replace(/\s+/g,' ');
const cols:Record<string,string[]>={der:['Bahnsteig','Bus','Flughafen','Koffer'],das:['Gepäck','Gleis','Taxi'],die:['Straßenbahn','Haltestelle','U-Bahn']};
const phrases=['die Zeitung lesen','Deutsch lernen','das Zimmer aufräumen','ein Bier trinken','nach Madrid fliegen','ein Fest feiern'];
const snake=[['plur',false],['flugzeug',false],['inunt',false],['straßenbahn',true],['ont',false],['haltestelle',true],['isi',false],['bahnsteig',true],['opr',false],['ubahn',true],['örbe',false],['gepäck',true],['usten',false],['bus',true],['plätz',false],['gleis',true],['rever',false],['flughafen',true],['bal',false],['koffer',true],['om',false],['taxi',true]] as const;
function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((s,i)=>/\p{L}/u.test(s)?<span className="tapWord" role="button" tabIndex={0} data-word={s.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text} key={i}>{s}</span>:s)}</>}
export function NativeAB11P96(){const host=useRef<HTMLDivElement>(null),[scale,S]=useState(1),[values,V]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem('native-ab11-96')||'{}')}catch{return {}}}),[checked,C]=useState<Record<string,boolean>>({});
useLayoutEffect(()=>{const el=host.current;if(!el)return;const update=()=>S(Math.min(el.clientWidth/901,el.clientHeight/1275));update();const ro=new ResizeObserver(update);ro.observe(el);return()=>ro.disconnect()},[]);
usePageReset('96','native-ab11-96',()=>{V({});C({})});
const set=(id:string,value:string)=>{const next={...values,[id]:value};V(next);localStorage.setItem('native-ab11-96',JSON.stringify(next));C(c=>({...c,[id.split('-')[0]]:false}))};
const right=(f:any)=>{let v=norm(values[f.id]||'');if(f.col){const fields=spec.items.filter((q:any)=>q.k==='field'&&q.col===f.col);const entered=fields.map((q:any)=>norm(values[q.id]||''));const list=cols[f.col].map(norm);if(!v)return list.every(x=>entered.includes(x));return list.includes(v)&&entered.filter(x=>x===v).length===1}if(f.phrase)return phrases.map(norm).includes(v)&&spec.items.filter((q:any)=>q.phrase&&norm(values[q.id]||'')===v).length===1;return v===norm(f.answer)};
const correct=(g:string)=>g==='u2a'?snake.every((s,i)=>i===1||!!values['u2a-'+i]===s[1]):spec.items.filter((q:any)=>q.k==='field'&&q.group===g).every(right);
return <div className="ab11p96" data-native-ab11-page="96" ref={host}><div className="ab11p96Canvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>{spec.items.map((it:any,i)=>{const pos={left:it.x,top:it.y,width:it.w,height:it.h};
if(it.k==='text')return <div key={i} className={'p96Text '+(it.font==='sans'?'p96Sans':'')} style={{...pos,fontSize:it.s,fontWeight:it.b?700:400}}><Words text={it.t}/></div>;
if(it.k==='art')return <PageImage key={i} className="p96Art" src={it.src} alt="Abbildung oder handschriftliches Beispiel" style={pos}/>;
if(it.k==='line')return <div key={i} className="p96Line" style={{...pos,background:it.color}}/>;
if(it.k==='highlight')return <div key={i} className="p96Highlight" style={pos}/>;
if(it.k==='dot')return <div key={i} style={{...pos,position:'absolute',borderRadius:'50%',background:it.color}}/>;
if(it.k==='badge')return <div key={i} className="p96Badge" style={pos}>{it.t}</div>;
if(it.k==='field')return <div key={i} className={'p96FieldWrap'+(it.cells?' cells':'')} style={{...pos,position:'absolute'}}><input aria-label={it.id} data-native-field={it.id} aria-invalid={checked[it.group]&&!right(it)} className={'p96Field'+(it.cells?' cells':'')+(checked[it.group]?(right(it)?' correct':' wrong'):'')} value={values[it.id]||''} style={{left:0,top:0,width:it.w,height:it.h,'--cell':it.cells?it.w/it.cells+'px':undefined,fontSize:it.phrase?'13px':undefined} as CSSProperties} onChange={e=>set(it.id,e.target.value)}/>{it.cells?<span aria-hidden="true" className={'p96CellInk'+(checked[it.group]?(right(it)?' correct':' wrong'):'')}>{Array.from({length:it.cells},(_,j)=><span style={{width:it.w/it.cells}} key={j}>{(values[it.id]||'').toUpperCase()[j]||''}</span>)}</span>:null}</div>;
if(it.k==='snake')return <div key={i} className="p96Snake" style={pos}>{snake.map(([s,yes],j)=><span key={j}>{j===14?<br/>:null}<button type="button" data-snake={j} disabled={j===1} aria-label={s} aria-pressed={j===1||!!values['u2a-'+j]} className={(j===1?'example':values['u2a-'+j]?' selected':'')+(checked.u2a&&(yes||values['u2a-'+j])?(yes&&values['u2a-'+j]?' correct':' wrong'):'')} onClick={()=>set('u2a-'+j,values['u2a-'+j]?'':'1')}>{s}</button></span>)}</div>;
if(it.k==='check')return <div className="p96Check" data-native-task={it.group} style={pos} key={i}><button type="button" aria-label={'Prüfen '+it.group} onClick={()=>C(c=>({...c,[it.group]:true}))}>✓</button><output aria-live="polite">{checked[it.group]?(correct(it.group)?'Richtig!':'Noch einmal'):''}</output></div>;
return null})}</div></div>}
