import {CheckButton} from '../components/CheckButton';
import {PageImage} from '../components/PageImage';
import {usePageReset} from '../exercises/usePageReset';
import {useLayoutEffect,useRef,useState} from 'react';
import '../components/native-ab12.css';
import './native-ab12-p18-29.css';
import './native-ab12-p27.css';

function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\p{L}/u.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-word={w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text}>{w}</span>:w)}</>}
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?„"“”]+/g,'').replace(/\s+/g,' ');

export function NativeAB12P27({page}:{page:string}){
 const W=1071,H=1452;
 const root=useRef<HTMLDivElement>(null);
 const [scale,ss]=useState(.6);const key='native-ab12-'+page;
 const [values,sv]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});
 const [results,sr]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=root.current!;const obs=new ResizeObserver(()=>ss(Math.min(el.clientWidth/W,(el.clientHeight-38)/H)));obs.observe(el);return ()=>obs.disconnect()},[]);
 usePageReset(page,key,()=>{sv({});sr({})});
 const set=(id:string,v:string)=>{const n={...values,[id]:v};sv(n);localStorage.setItem(key,JSON.stringify(n))};
 const text=(x:number,y:number,w:number,t:string,cls='')=><div className={'naText '+cls} style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const stext=(x:number,y:number,w:number,t:string,cls='')=><div className={'naSans2 '+cls} style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="naArt" src={`assets/book-crops/native-ab12-p${page}-${name}.png`} alt={'Originalillustration '+name} style={{left:x,top:y,width:w,height:h}}/>;
 const field=(id:string,x:number,y:number,w:number,label:string)=><input className="naField" aria-label={label} data-native-field={id} style={{left:x,top:y,width:w}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>;
 const dot=(id:string,value:string,x:number,y:number,label:string)=><input type="radio" className="naDot" name={key+'-'+id} aria-label={label} data-native-field={id} value={value} style={{left:x,top:y}} checked={values[id]===value} onChange={()=>set(id,value)}/>;
 const conf=(id:string,y:number)=><>{[0,1,2].map(c=>dot(id,''+c,858+c*39,y,'Selbsteinschätzung '+id+' '+['gut','mittel','noch nicht'][c]))}</>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="naCheck" data-check={id} style={{left:x,top:y}}><CheckButton answers={answers} onClick={()=>sr({...results,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(v=>normalize(v)===normalize(values[k]||'')))})}></CheckButton><output aria-live="polite">{id in results?(results[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const sect=(x:number,y:number,t:string,tag:string)=><div className="naSect" style={{left:x,top:y}}><Words text={t}/>{tag&&<> <span className="naTag">{tag}</span></>}</div>;

 return <div className="nativeAB12" ref={root} data-native-ab12={page}><style>{`@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-700.woff2') format('woff2');font-weight:700}@font-face{font-family:DroidSerif;src:url('assets/fonts/droid-serif-400.ttf') format('truetype');font-weight:400;font-display:swap}@font-face{font-family:DroidSerif;src:url('assets/fonts/droid-serif-700.woff2') format('woff2');font-weight:700;font-display:swap}`}</style><div className="naCanvas" style={{width:W,height:H,marginLeft:-W/2,marginTop:-H/2,transform:`scale(${scale})`}}>
  {text(98,71,470,'SELBSTEINSCHÄTZUNG','naHead2 naH38')}
  {art('script',548,73,206,40)}
  {art('bars',968,38,101,85)}
  {art('lights',848,153,112,34)}
  {sect(102,156,'… 10 Wörter rund um Haus und Wohnung:','L14')}{conf('s1',190)}
  {stext(103,182,405,'Das gibt es in meiner Wohnung / in meinem Haus:')}{field('p27-1a',512,177,271,'1a')}
  {field('p27-1b',101,200,682,'1b')}
  {stext(103,229,452,'Das gibt es nicht in meiner Wohnung / in meinem Haus:')}{field('p27-1c',559,225,224,'1c')}
  {field('p27-1d',101,248,682,'1d')}
  {stext(102,299,270,'Ich kann auch …','naKann')}
  {sect(102,332,'… die Lage von Dingen angeben (lokale Präpositionen mit Dativ):','L13')}{conf('s2',336)}
  {stext(103,357,130,'Wo ist der Stab?')}
  {stext(103,380,95,'Der Stab ist')}{field('p27-2a',197,376,192,'2a')}{field('p27-2b',395,376,76,'2b')}{stext(477,381,85,'Würfel.')}
  {stext(103,405,95,'Der Stab ist')}{field('p27-2c',197,400,192,'2c')}{field('p27-2d',395,400,76,'2d')}{stext(477,405,90,'Würfeln.')}
  {art('dice',550,370,154,70)}
  {check('g2',980,400,{'p27-2a':'neben|vor|hinter|an','p27-2b':'dem','p27-2c':'zwischen','p27-2d':'den'})}
  {sect(102,451,'… Zugehörigkeit ausdrücken (Genitiv + Possessivartikel sein und ihr):','L14')}{conf('s3',455)}
  {stext(102,477,300,'Vanilla wohnt neben Otto. Vanilla ist')}{field('p27-3a',403,472,156,'3a')}{stext(576,477,90,'Nachbarin.')}
  {stext(100,496,20,'■','naMark')}{stext(117,499,238,'Wie findest du Vanillas Haus?')}{stext(364,505,20,'▲','naTri')}{field('p27-3b',381,496,115,'3b')}{stext(504,499,180,'Haus finde ich super,')}
  {stext(102,523,40,'aber')}{field('p27-3c',141,519,102,'3c')}{stext(249,525,240,'Garten mag ich nicht so gern.')}
  {check('g3',980,519,{'p27-3a':'seine','p27-3b':'ihr','p27-3c':'ihr'})}
  {sect(102,571,'… sagen, wem etwas gefällt/gehört und wem ich helfe/danke','')}{conf('s4',575)}
  {sect(130,594,'(Personalpronomen im Dativ):','L15')}
  {stext(103,619,240,'Das finde ich gut.')}{art('arrow',345,626,18,13)}{stext(401,619,30,'Das')}{field('p27-4a1',433,615,205,'4a1')}{field('p27-4a2',644,615,127,'4a2')}{stext(773,619,10,'.')}
  {stext(103,646,240,'Das ist dein Haus.')}{art('arrow',345,650,18,13)}{stext(401,646,30,'Das')}{field('p27-4b1',433,639,205,'4b1')}{field('p27-4b2',644,639,127,'4b2')}{stext(773,646,10,'.')}
  {stext(103,670,240,'Vielen Dank, Otto!')}{art('arrow',345,674,18,13)}{stext(400,670,30,'Wir')}{field('p27-4c1',433,663,205,'4c1')}{field('p27-4c2',644,663,127,'4c2')}{stext(773,670,10,'.')}
  {stext(103,692,240,'Die Übungen sind wichtig')}{art('arrow',345,698,18,13)}{stext(401,692,100,'Die Übungen')}{field('p27-4d1',506,687,132,'4d1')}{field('p27-4d2',644,687,127,'4d2')}{stext(773,692,10,'.')}
  {stext(103,716,170,'für Maria und Pedro.')}
  {check('g4',980,687,{'p27-4a1':'gefällt','p27-4a2':'mir','p27-4b1':'gehört','p27-4b2':'dir','p27-4c1':'danken','p27-4c2':'dir','p27-4d1':'helfen','p27-4d2':'ihnen'})}
  {stext(102,764,380,'Üben / Wiederholen möchte ich noch …','naKann')}
  {field('p27-5a',102,792,676,'5a')}
  {text(102,885,220,'RÜCKBLICK','naRueck')}
  {stext(102,956,380,'Wählen Sie eine Aufgabe zu Lektion','naWahl')}{art('yel13',484,959,34,23)}
  <div className="naYelRule" style={{left:520,top:979,width:435,height:2}}/>
  {art('magn',63,1021,30,29)}{art('chip1',100,1021,36,26)}
  {stext(143,1021,660,'Sehen Sie noch einmal den Stadtplan im Kursbuch auf Seite 10 an.','naItem')}
  {stext(143,1046,770,'Sie sind vor der Post. Wie gehen Sie zum Bahnhof? Beschreiben Sie den Weg.','naItem')}
  {art('hw1',143,1091,234,29)}
  {art('feet',55,1148,37,35)}{art('chip2',100,1150,36,26)}
  {stext(143,1149,220,'Wie gehen Sie zu …?','naItem')}
  {stext(145,1190,880,'Was ist bei Ihnen in der Nähe? Ein Bahnhof, eine U-Bahn- oder Bus-Haltestelle, ein','naItemB')}
  {stext(145,1217,880,'Restaurant …? Wählen Sie und beschreiben Sie den Weg von Ihnen zu Hause zu diesem Ort.','naItemB')}
  {art('hw2',143,1259,397,28)}
  {text(780,1385,150,'siebenundzwanzig','naFooter')}<div className="naBarV" style={{left:944,top:1389,width:1,height:14}}/>{text(961,1388,25,'27','naFooter naFootNum')}
  {art('modul',985,1385,86,23)}
 </div></div>;
}
