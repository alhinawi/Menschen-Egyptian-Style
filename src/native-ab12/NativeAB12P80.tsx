import {usePageReset} from '../exercises/usePageReset';
import {useLayoutEffect,useRef,useState} from 'react';
import {PageImage} from '../components/PageImage';
import {CheckButton} from '../components/CheckButton';
import '../components/native-ab12.css';

function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\p{L}/u.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-word={w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text}>{w}</span>:w)}</>}
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\s+/g,' ');

export function NativeAB12P80({page}:{page:string}){
 const W=807, H=1094;
 const root=useRef<HTMLDivElement>(null),player=useRef<HTMLAudioElement>(null);
 const [scale,ss]=useState(.6);const key='native-ab12-'+page;
 const [values,sv]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});
 const [results,sr]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{if(document.fonts){['400 15px FiraSans','600 19px FiraSans','400 15px DroidSerif','700 15px DroidSerif','400 23px DroidSerif'].forEach(f=>{try{document.fonts.load(f)}catch{}})}},[]);
 useLayoutEffect(()=>{const el=root.current!;const obs=new ResizeObserver(()=>ss(Math.min(el.clientWidth/W,(el.clientHeight-38)/H)));obs.observe(el);return ()=>obs.disconnect()},[]);
 usePageReset(page,key,()=>{sv({});sr({})});
 const set=(id:string,v:string)=>{const n={...values,[id]:v};sv(n);localStorage.setItem(key,JSON.stringify(n))};
 const text=(x:number,y:number,w:number,t:string,cls='')=><div className={'naText '+cls} style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const lin=(x:number,y:number,w:number,h:number,c:string)=><div style={{position:'absolute',left:x,top:y,width:w,height:h,background:c}}/>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="naArt" src={`assets/book-crops/native-ab12-p${page}-${name}.png`} alt={'Originalillustration '+name} style={{left:x,top:y,width:w,height:h}}/>;
 const field=(id:string,x:number,y:number,w:number,label:string,cls='')=><input className={'naField '+cls} aria-label={label} data-native-field={id} style={{left:x,top:y,width:w}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>;
 const area=(id:string,x:number,y:number,w:number,h:number,label:string)=><textarea className="naField naLined naArea80" aria-label={label} data-native-field={id} style={{left:x,top:y,width:w,['--la-h' as string]:h+'px',['--la-lh' as string]:'18px'}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="naCheck" data-check={id} style={{left:x,top:y}}><CheckButton answers={answers} onClick={()=>sr({...results,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(v=>normalize(v)===normalize(values[k]||(a==='false'?'false':''))))})}/><output aria-live="polite">{id in results?(results[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const kb=(x:number,y:number,t:string)=><div className="naKB80" style={{left:x,top:y}}>{t}</div>;
 const num=(x:number,y:number,n:string)=><div className="naNum80" style={{left:x,top:y}}>{n}</div>;
 const rail=(x:number,y:number,t:string)=><div className="naRail80" style={{left:x,top:y}}>{t}</div>;

 if(page!=='80')return null;
 return <div className="nativeAB12" ref={root} data-native-ab12={page}><style>{`@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-400.woff2') format('woff2');font-weight:400}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-700.woff2') format('woff2');font-weight:700}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-600.woff2') format('woff2');font-weight:600}@font-face{font-family:FiraSansCond;src:url('assets/fonts/firasanscond-latin-400.woff2') format('woff2');font-weight:400}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-500.ttf') format('truetype');font-weight:500}@font-face{font-family:DroidSerif;src:url('assets/fonts/droid-serif-400.ttf') format('truetype');font-weight:400}@font-face{font-family:DroidSerif;src:url('assets/fonts/droid-serif-700.woff2') format('woff2');font-weight:700}
[data-native-ab12='80'] .naText{font-family:DroidSerif,Georgia,serif;font-size:15px;color:#2b2b2b;letter-spacing:0;position:absolute;white-space:nowrap}
[data-native-ab12='80'] .naArt{position:absolute;object-fit:fill}
[data-native-ab12='80'] .naKB80{position:absolute;font:600 10.5px FiraSans,sans-serif;color:#5ab0da}
[data-native-ab12='80'] .naNum80{position:absolute;width:21px;height:17px;background:#e30613;color:#fff;font:700 13px/17px FiraSans,sans-serif;text-align:center}
[data-native-ab12='80'] .naRail80{position:absolute;font:600 10px FiraSans,sans-serif;color:#6f77ab;letter-spacing:2px;writing-mode:vertical-rl;transform:rotate(180deg)}
[data-native-ab12='80'] .naT80{font-family:FiraSans,sans-serif!important;font-weight:600;font-size:19px!important;color:#17141c!important}
[data-native-ab12='80'] .naT80b{font-family:FiraSans,sans-serif!important;font-weight:600;font-size:16px!important;color:#17141c!important}
[data-native-ab12='80'] .naInst80{font-family:FiraSans,sans-serif!important;font-weight:500;font-size:14px!important;color:#262626!important}
[data-native-ab12='80'] .naHead80{font-size:20px!important;letter-spacing:2.1px!important;color:#4d4d4a!important}
[data-native-ab12='80'] .naWords80{font-size:15px!important}
[data-native-ab12='80'] .naRowL80{font-family:FiraSans,sans-serif!important;font-size:12px!important;color:#2b2b2b!important}
[data-native-ab12='80'] .naDots80{position:absolute;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Ccircle cx='1.2' cy='2.2' r='1.1' fill='%235d5d61'/%3E%3C/svg%3E");background-size:4px 4px;background-repeat:repeat-x}
[data-native-ab12='80'] .naWords80 b{font-weight:700}
[data-native-ab12='80'] .naTh80{font-family:FiraSans,sans-serif!important;font-weight:600;font-size:13px!important;color:#3a3a38!important}
[data-native-ab12='80'] .naThBig80{font-size:15px!important}
[data-native-ab12='80'] .naEn80{font-family:FiraSans,sans-serif!important;font-size:13px!important;color:#2b2b2b!important}
[data-native-ab12='80'] .naMail80{font-family:FiraSans,sans-serif!important;font-size:12px!important;color:#2b2b2b!important}
[data-native-ab12='80'] .naIt80{font-family:FiraSansCond,sans-serif!important;font-style:italic;font-weight:400;font-size:12.5px!important;color:#1f1f1f!important}
[data-native-ab12='80'] .naBul80{font-size:13.5px!important}
[data-native-ab12='80'] .naField{position:absolute;background:transparent;border:none;border-bottom:1.5px solid #c8c8c8;font:15px DroidSerif,Georgia,serif;color:#1c3f8f;padding:0 2px;outline:none}
[data-native-ab12='80'] .naArea80{position:absolute;background:transparent;border:0!important;box-shadow:none!important;resize:none;scrollbar-width:none;font:italic 14px FiraSans,sans-serif;line-height:18px;color:#1c3f8f;padding:0 2px;outline:none}
[data-native-ab12='80'] .naArea80::-webkit-scrollbar{display:none;width:0;height:0}
[data-native-ab12='80'] .naCanvas .naField.naField80c{border:0!important;border-bottom:0!important;box-shadow:none!important;font-size:14px}
[data-native-ab12='80'] .naField80d{border-bottom:0!important}
[data-native-ab12='80'] .naFoot80{font-size:14px!important;color:#333!important}
[data-native-ab12='80'] .naCheck{position:absolute;display:flex;align-items:center;gap:6px}
[data-native-ab12='80'] .naCheck output{font:600 13px FiraSans,sans-serif;color:#26764c}
`}</style><div className="naCanvas naNarrow" style={{width:W,height:H,transform:`translate(-50%,-50%) scale(${scale})`}}>

  {/* header */}
  {text(93,66,181,'BASISTRAINING','naHead80')}
  {lin(280,84,455,2,'#e30613')}

  {/* ex 8 */}
  {kb(62,116,'KB 5')}
  {num(95,112,'8')}
  {text(124,112,120,'Komparativ','naT80')}
  {art('globe',58,144,34,30)}
  {rail(52,175,'STRUKTUREN')}
  {text(124,142,440,'Wie heißt das Gegenteil? Ergänzen und vergleichen Sie.','naInst80')}
  {text(123,175,20,'a','naWords80')}{text(143,174,60,'jünger','naWords80')}
  {text(268,175,20,'c','naWords80')}{text(288,174,70,'billiger','naWords80')}
  {text(426,175,20,'e','naWords80')}{text(446,174,60,'kürzer','naWords80')}
  {text(123,194,20,'b','naWords80')}{text(143,193,65,'kleiner','naWords80')}
  {text(268,194,20,'d','naWords80')}{text(288,193,80,'hübscher','naWords80')}
  {text(426,194,20,'f','naWords80')}{text(446,193,60,'dicker','naWords80')}

  {/* table */}
  {lin(123,221,605,23,'#e6e3c7')}
  {text(123,223,90,'Deutsch','naTh80 naThBig80')}
  {text(311,223,90,'Englisch','naTh80 naThBig80')}
  {text(478,227,250,'Meine Sprache oder andere Sprachen','naTh80')}
  {lin(305,221,1,157,'#e3e1d2')}
  {lin(473,221,1,157,'#e3e1d2')}
  {[267,289,311,333,356].map(y=><span key={y}>{lin(123,y,605,1,'#f0efe6')}</span>)}
  {lin(123,378,605,1,'#e6e5d8')}
  {text(129,250,12,'a','naRowL80')}
  {art('aelter',138,246,34,34)}
  {text(311,250,60,'older','naEn80')}
  {text(129,271,12,'b','naRowL80')}
  {field('p80-8b',138,268,160,'8 b Deutsch','naField80d')}
  {text(311,271,110,'bigger / larger','naEn80')}
  {text(129,293,12,'c','naRowL80')}
  {field('p80-8c',138,290,160,'8 c Deutsch','naField80d')}
  {text(311,294,110,'more expensive','naEn80')}
  {text(129,315,12,'d','naRowL80')}
  {field('p80-8d',138,312,160,'8 d Deutsch','naField80d')}
  {text(311,316,60,'uglier','naEn80')}
  {text(129,338,12,'e','naRowL80')}
  {field('p80-8e',138,334,160,'8 e Deutsch','naField80d')}
  {text(311,338,60,'larger','naEn80')}
  {text(129,360,12,'f','naRowL80')}
  {field('p80-8f',138,357,160,'8 f Deutsch','naField80d')}
  {text(311,360,70,'thinner','naEn80')}
  {['a','b','c','d','e','f'].map((L,i)=><span key={L}>{field('p80-8'+L+'-own',483,250+i*22.2,240,'8 '+L+' eigene Sprache','naField80c')}</span>)}
  {check('80-8',129,384,{'p80-8b':'größer','p80-8c':'teurer','p80-8d':'hässlicher','p80-8e':'länger','p80-8f':'dünner'})}

  {/* ex 9 */}
  {kb(62,422,'KB 8')}
  {num(95,414,'9')}
  {text(124,414,190,'Eine E-Mail schreiben','naT80b')}
  {rail(52,465,'SCHREIBEN')}
  {text(124,434,330,'Lesen Sie die E-Mail und antworten Sie Johanna.','naInst80')}

  {art('frame1',122,464,557,236)}
  {text(142,476,80,'Hallo …,','naMail80')}
  {text(142,494,520,'vielen Dank für Deine E-Mail. Du kommst mich in Wien besuchen! Das ist klasse!','naMail80')}
  {text(142,512,520,'Möchtest Du drei Tage in Wien bleiben oder lieber einen Ausflug an den Neusiedler See','naMail80')}
  {text(142,530,420,'machen? Vielleicht kann ich das Auto von meinen Eltern haben.','naMail80')}
  {text(142,549,520,'Was möchtest Du am liebsten machen? In die Oper oder ins Theater gehen? Im Hotel Sacher','naMail80')}
  {text(142,566,430,'Kuchen essen? In unseren großen Freizeitpark (er heißt Prater) fahren?','naMail80')}
  {text(142,585,240,'Bitte schreib mir Deine Wünsche.','naMail80')}
  {text(142,619,280,'Ich freue mich sehr auf Deinen Besuch!!!','naMail80')}
  {text(142,637,120,'Viele Grüße','naMail80')}
  {text(142,656,120,'Johanna','naMail80')}

  {text(122,697,360,'Schreiben Sie eine E-Mail zu folgenden Punkten.','naInst80')}
  {text(122,722,420,'• lieber in Wien bleiben','naBul80')}
  {text(122,740,520,'• Oper – Theater: wahnsinnig langweilig finden – am liebsten ins Museum gehen','naBul80')}
  {text(122,758,420,'• natürlich gern Kuchen im Hotel Sacher essen','naBul80')}
  {text(122,776,340,'• den Prater – total lustig finden','naBul80')}

  {art('frame2',121,808,557,191)}
  {text(142,825,120,'Hallo Johanna,','naIt80')}
  {text(142,845,516,'das sind ja viele gute Ideen! Drei Tage sind natürlich sehr kurz. Ich möchte lieber in Wien','naIt80')}
  {[[142,868],[142,886],[142,904]].map(([x,y])=><div key={y} className="naDots80" style={{left:x,top:y,width:493,height:4}}/>)}
  {(()=>null)()}
  <div className="naDots80" style={{left:185,top:977,width:150,height:4}}/>
  {area('p80-9mail',140,864,512,54,'E-Mail an Johanna')}
  {text(142,914,180,'Ich freue mich sehr!','naIt80')}
  {text(142,952,120,'Bis bald','naIt80')}
  {text(142,972,60,'Dein/e','naIt80')}
  {field('p80-9name',196,970,150,'Dein Name','naIt80 naField80c')}

  {/* footer */}
  {lin(0,1052,52,16,'#d9d0ab')}
  <div style={{position:'absolute',left:0,top:1052,width:52,height:16,color:'#fff',font:'600 9.5px FiraSans,sans-serif',display:'flex',alignItems:'center',justifyContent:'center'}}>Modul 8</div>
  {text(65,1051,110,'80 | achtzig','naFoot80')}
 </div><audio ref={player} className="naPlayer"/></div>;
}
