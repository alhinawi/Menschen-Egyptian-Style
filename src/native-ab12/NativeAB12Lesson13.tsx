import {useLayoutEffect,useRef,useState} from 'react';
import {usePageReset} from '../exercises/usePageReset';
import '../components/native-ab12.css';
import './native-ab12-l13.css';

function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\p{L}/u.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-word={w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text}>{w}</span>:w)}</>}
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\s+/g,' ');
const HEIGHTS:Record<string,number>={'6':1465,'7':1447,'8':1452,'9':1447,'10':1452,'11':1447};

export function NativeAB12Lesson13({page}:{page:string}){
 const W=1071,H=HEIGHTS[page]||1447;
 const root=useRef<HTMLDivElement>(null),player=useRef<HTMLAudioElement>(null);
 const [scale,ss]=useState(.6);const key='native-ab12-'+page;
 const [values,sv]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});
 const [results,sr]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=root.current!;const obs=new ResizeObserver(()=>ss(Math.min(el.clientWidth/W,(el.clientHeight-38)/H)));obs.observe(el);return ()=>obs.disconnect()},[W,H]);
 usePageReset(page,key,()=>{sv({});sr({})});
 const set=(id:string,v:string)=>{const n={...values,[id]:v};sv(n);localStorage.setItem(key,JSON.stringify(n))};
 const text=(x:number,y:number,w:number,t:string,cls='')=><div className={'naText '+cls} style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><img className="naArt" src={`assets/book-crops/native-ab12-p${page}-${name}.png`} alt={'Originalillustration '+name} style={{left:x,top:y,width:w,height:h}}/>;
 const field=(id:string,x:number,y:number,w:number,label:string,cls='')=><input className={'naField '+cls} aria-label={label} data-native-field={id} style={{left:x,top:y,width:w}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>;
 const rule=(x:number,y:number,w:number)=><div className="naRule" style={{left:x,top:y,width:w}}/>;
 const dot=(id:string,value:string,x:number,y:number,label:string,checkbox=false)=><input className="naDot" type={checkbox?'checkbox':'radio'} aria-label={label} name={key+'-'+id} checked={checkbox?values[id]==='true':values[id]===value} onChange={e=>set(id,checkbox?String(e.target.checked):value)} style={{left:x,top:y}}/>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="naCheck" data-check={id} style={{left:x,top:y}}><button onClick={()=>sr({...results,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(v=>normalize(v)===normalize(values[k]||(a==='false'?'false':''))))})}>Prüfen ✓</button><output aria-live="polite">{id in results?(results[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const title=(n:string,x:number,y:number,w:number,t:string,cls='')=><div className={'naTitle '+cls} style={{left:x,top:y,width:w}}><b>{n}</b><Words text={t}/></div>;
 const kb=(x:number,y:number,t:string)=><div className="naKB naKBL" style={{left:x,top:y}}>{t}</div>;
 const side=(x:number,y:number,t:string)=><div className="naSide naSideL" style={{left:x,top:y}}>{t}</div>;
 const hand=(x:number,y:number,w:number,t:string)=><div className="naText naHand" style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const audio=(src:string,x:number,y:number,label:string)=><button className="naAudio" style={{left:x,top:y}} aria-label={'Originalaudio '+label+' abspielen'} onClick={()=>{if(player.current){player.current.src=src;player.current.play().catch(()=>{})}}}>▶ {label}</button>;
 const dash=(x:number,y:number,w:number,parts:(string|[string])[])=><div className="naText naS20 naDash naNw" style={{left:x,top:y,width:w}}>{parts.map((p,i)=>Array.isArray(p)?<b key={i}>{p[0]}</b>:<span key={i}>{p}</span>)}</div>;
 const footerL=(n:string,word:string,y:number)=><><div className="naText naFooter" style={{left:76,top:y,width:220}}><b>{n}</b>{'  |  '+word}</div></>;
 const footerR=(n:string,word:string,y:number)=><><div className="naText naFooter" style={{left:870,top:y,width:180}}>{word+'  |  '}<b>{n}</b></div></>;

 return <div className="nativeAB12" ref={root} data-native-ab12={page}><style>{"@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-400.woff2') format('woff2');font-weight:400}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-700.woff2') format('woff2');font-weight:700}"}</style><div className="naCanvas" style={{width:W,height:H,transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='6'&&<>
  {art('photo',0,32,358,84)}
  <div className="na13Band" style={{left:360,top:36,width:609,height:80}}/>
  <div className="naText naNw" style={{left:392,top:52,width:585,fontSize:40}}><Words text="Wir suchen das Hotel Maritim."/></div>
  {kb(56,183,'KB 1')}
  {title('1',107,175,500,'Zeichnen Sie.','naYB')}
  {side(68,198,'Wörter')}
  {text(149,219,20,'a','naLet13')}{text(173,219,420,'Biegen Sie links ab.','naS20')}
  {text(148,245,20,'b','naLet13')}{text(173,245,420,'Fahren Sie circa noch 200 Meter geradeaus.','naS20')}
  {text(148,271,20,'c','naLet13')}{text(173,271,420,'Wenden Sie hier.','naS20')}
  {text(148,297,20,'d','naLet13')}{text(173,297,420,'Fahren Sie nach rechts.','naS20')}
  {art('arrow',590,183,75,40)}
  {rule(594,237,140)}{rule(594,263,140)}{rule(594,290,140)}{rule(594,316,140)}
  {kb(56,365,'KB 2')}
  {title('2',106,358,620,'Wo sind die Bälle? Ergänzen Sie.','naYB')}
  {side(68,403,'Wörter')}
  {art('balls',113,420,350,335)}
  {text(479,398,95,'Ball 1 ist','naS20 naNw')}{art('neben',552,390,80,34)}{text(705,398,150,'dem Schrank.','naS20 naNw')}
  {text(479,424,95,'Ball 2 ist','naS20 naNw')}{field('6-b2',561,424,136,'Ball 2')}{text(705,424,150,'der Couch.','naS20 naNw')}
  {text(479,451,95,'Ball 3 ist','naS20 naNw')}{field('6-b3',561,451,136,'Ball 3')}{text(705,451,150,'dem Schrank.','naS20 naNw')}
  {text(479,477,95,'Ball 4 ist','naS20 naNw')}{field('6-b4',561,477,136,'Ball 4')}{text(705,477,150,'der Couch.','naS20 naNw')}
  {text(479,503,95,'Ball 5 ist','naS20 naNw')}{field('6-b5',561,503,136,'Ball 5')}{text(705,503,290,'der Couch und dem Schrank.','naS20 naNw')}
  {text(479,528,95,'Ball 6 ist','naS20 naNw')}{art('hinter',552,520,90,34)}{text(705,528,150,'dem Schrank.','naS20 naNw')}
  {text(479,555,95,'Ball 7 ist','naS20 naNw')}{field('6-b7',561,555,136,'Ball 7')}{text(705,555,150,'der Couch.','naS20 naNw')}
  {text(479,581,95,'Ball 8 ist','naS20 naNw')}{art('an',552,573,55,32)}{text(705,581,150,'dem Schrank.','naS20 naNw')}
  {text(479,607,95,'Ball 9 ist','naS20 naNw')}{field('6-b9',561,607,136,'Ball 9')}{text(705,607,150,'der Couch.','naS20 naNw')}
  {check('6-2',561,648,{'6-b2':'auf','6-b3':'in','6-b4':'unter','6-b5':'zwischen','6-b7':'über','6-b9':'vor'})}
  {kb(56,782,'KB 3')}
  {title('3',105,775,320,'In der Stadt.','naYB')}
  {side(68,823,'Wörter')}
  {text(115,818,20,'a','naLet13')}{text(140,818,400,'Ergänzen Sie das Rätsel.','naS20')}
  {text(146,857,20,'1','naS20')}{text(176,857,470,'Sie können hier essen.','naS20 naNw')}
  {text(146,883,20,'2','naS20')}{text(176,883,470,'Anderes Wort für Stadtmitte.','naS20 naNw')}
  {text(146,909,20,'3','naS20')}{text(176,909,470,'Hier fahren Züge ab und es kommen Züge an.','naS20 naNw')}
  {text(145,936,20,'4','naS20')}{text(176,936,470,'Hier bekommen Sie Geld.','naS20 naNw')}
  {text(146,962,20,'5','naS20')}{text(176,962,470,'Hier können Sie Briefmarken kaufen.','naS20 naNw')}
  {text(145,988,20,'6','naS20')}{text(176,988,470,'Rot: Sie bleiben stehen. Grün: Sie können fahren.','naS20 naNw')}
  {text(145,1014,20,'7','naS20')}{text(176,1014,470,'Hier können Sie einen Tee oder Kaffee trinken.','naS20 naNw')}
  {([[878,10,3,'s'],[904,7,5,'r'],[930,7,3,'h'],[955,4,3,'n'],[982,4,4,'t'],[1008,5,4,'e']] as [number,number,number,string][]).map(([y,n,lpos,letter],ri)=><span key={ri}>{Array.from({length:n},(_,i)=>i!==lpos-1&&<div key={i} className="naRule" style={{left:661+i*24.5,top:y,width:18}}/>)}<div className="naText naS18" style={{left:661+(lpos-1)*24.5+2,top:y-16,width:20,color:'#333'}}>{letter}</div></span>)}
  {field('6-r1',655,853,250,'Rätsel 1','naFieldBlank')}
  {field('6-r2',655,879,180,'Rätsel 2','naFieldBlank')}
  {field('6-r3',655,905,180,'Rätsel 3','naFieldBlank')}
  {field('6-r4',655,931,105,'Rätsel 4','naFieldBlank')}
  {field('6-r5',655,957,105,'Rätsel 5','naFieldBlank')}
  {field('6-r6',655,983,130,'Rätsel 6','naFieldBlank')}
  {art('cafe',655,1010,72,30)}
  {check('6-3a',660,1036,{'6-r1':'Restaurant','6-r2':'Zentrum','6-r3':'Bahnhof','6-r4':'Bank','6-r5':'Post','6-r6':'Ampel'})}
  {art('globe',52,1052,50,46)}
  {text(115,1066,20,'b','naLet13')}{text(146,1066,460,'Ergänzen Sie die Wörter aus a und vergleichen Sie.','naS20')}
  <div className="na13Band2" style={{left:145,top:1098,width:923,height:34}}/>
  {text(178,1104,200,'Deutsch','naBold naS19')}{text(453,1104,180,'Englisch','naBold naS19')}{text(640,1104,430,'Meine Sprache oder andere Sprachen','naBold naS19')}
  {[1132,1162,1192,1222,1252,1282,1312,1342].map((y,i)=><div key={i} className="na13Row" style={{left:145,top:y,width:923}}/>)}
  {text(153,1139,20,'1','naS20')}{art('restaurant',170,1128,110,30)}{text(453,1139,170,'restaurant','naS19 naEng')}{field('6-m1',640,1135,415,'Meine Sprache 1','naFieldBlank')}
  {text(153,1169,20,'2','naS20')}{field('6-d2',178,1165,177,'Deutsch 2','naFieldBlank')}{text(453,1169,170,'center','naS19 naEng')}{field('6-m2',640,1165,415,'Meine Sprache 2','naFieldBlank')}
  {text(153,1199,20,'3','naS20')}{field('6-d3',178,1195,177,'Deutsch 3','naFieldBlank')}{text(453,1199,170,'station','naS19 naEng')}{field('6-m3',640,1195,415,'Meine Sprache 3','naFieldBlank')}
  {text(153,1229,20,'4','naS20')}{field('6-d4',178,1225,177,'Deutsch 4','naFieldBlank')}{text(453,1229,170,'bank','naS19 naEng')}{field('6-m4',640,1225,415,'Meine Sprache 4','naFieldBlank')}
  {text(153,1259,20,'5','naS20')}{field('6-d5',178,1255,177,'Deutsch 5','naFieldBlank')}{text(453,1259,170,'post office','naS19 naEng')}{field('6-m5',640,1255,415,'Meine Sprache 5','naFieldBlank')}
  {text(153,1289,20,'6','naS20')}{field('6-d6',178,1285,177,'Deutsch 6','naFieldBlank')}{text(453,1289,170,'traffic light','naS19 naEng')}{field('6-m6',640,1285,415,'Meine Sprache 6','naFieldBlank')}
  {text(143,1316,20,'7','naS20')}{field('6-d7',178,1312,177,'Deutsch 7','naFieldBlank')}{text(453,1316,170,'coffee bar','naS19 naEng')}{field('6-m7',640,1312,415,'Meine Sprache 7','naFieldBlank')}
  {check('6-3b',178,1352,{'6-d2':'Zentrum','6-d3':'Bahnhof','6-d4':'Bank','6-d5':'Post','6-d6':'Ampel','6-d7':'Café'})}
  {art('modul-tab',0,1403,80,21)}
  {footerL('6','sechs',1404)}
 </>}
 </div><audio ref={player} className="naPlayer"/></div>;
}
