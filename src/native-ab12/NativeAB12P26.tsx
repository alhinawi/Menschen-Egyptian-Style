import {CheckButton} from '../components/CheckButton';
import {PageImage} from '../components/PageImage';
import {usePageReset} from '../exercises/usePageReset';
import {useLayoutEffect,useRef,useState} from 'react';
import '../components/native-ab12.css';
import './native-ab12-p18-29.css';
import './native-ab12-p26.css';

function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\p{L}/u.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-word={w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text}>{w}</span>:w)}</>}
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?„"“”]+/g,'').replace(/\s+/g,' ');

export function NativeAB12P26({page}:{page:string}){
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
 const dot=(id:string,value:string,x:number,y:number,label:string)=><input type="radio" className="naDot" name={key+'-'+id} aria-label={label} data-native-field={id} style={{left:x,top:y}} checked={values[id]===value} onChange={()=>set(id,value)}/>;
 const conf=(id:string,y:number)=><>{[0,1,2].map(c=>dot(id,''+c,895+c*38,y,'Selbsteinschätzung '+id+' '+['gut','mittel','noch nicht'][c]))}</>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="naCheck" data-check={id} style={{left:x,top:y}}><CheckButton onClick={()=>sr({...results,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(v=>normalize(v)===normalize(values[k]||'')))})}></CheckButton><output aria-live="polite">{id in results?(results[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const sect=(y:number,t:string)=><div className="naSect" style={{left:129,top:y}}><Words text={t}/></div>;

 return <div className="nativeAB12" ref={root} data-native-ab12={page}><style>{`@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-700.woff2') format('woff2');font-weight:700}@font-face{font-family:DroidSerif;src:url('assets/fonts/droid-serif-400.ttf') format('truetype');font-weight:400;font-display:swap}`}</style><div className="naCanvas" style={{width:W,height:H,transform:`translate(-50%,-50%) scale(${scale})`}}>
  {text(129,66,460,'SELBSTEINSCHÄTZUNG','naHead2 naH38')}
  {art('script',573,72,214,46)}
  {stext(128,163,300,'Ich kann jetzt …','naKann')}
  {art('dots',883,158,108,42)}
  {sect(193,'… jemanden um Hilfe bitten: L13')}{conf('s1',196)}
  {field('p26-1a',150,210,245,'1a')}{stext(401,214,80,'Sie bitte.')}
  {field('p26-1b',150,234,400,'1b')}{stext(556,238,80,'helfen?')}
  {stext(152,258,135,'Entschuldigung!')}{field('p26-1c',286,258,283,'1c')}{stext(575,258,115,'etwas fragen?')}
  {field('p26-1d',150,282,348,'1d')}{stext(504,282,170,'einen Moment Zeit?')}
  {check('g1',980,282,{'p26-1a':'Können','p26-1b':'Können Sie mir|Können Sie mir bitte','p26-1c':'Kann ich Sie','p26-1d':'Haben Sie'})}
  {sect(338,'… nach dem Weg fragen: L13')}{conf('s2',341)}
  {stext(152,354,65,'Kennen')}{field('p26-2a',217,354,400,'2a')}{stext(621,354,20,'?')}
  {stext(151,378,28,'Wo')}{field('p26-2b',180,378,437,'2b')}{stext(621,378,20,'?')}
  {stext(152,402,28,'Ich')}{field('p26-2c',181,402,436,'2c')}{stext(621,402,20,'.')}
  {art('photo',638,278,206,102)}
  {check('g2',980,402,{'p26-2a':'Sie den Weg|Sie das Restaurant|Sie den Weg zum Bahnhof','p26-2b':'ist der Bahnhof|ist das Hotel|komme ich zum Bahnhof|komme ich bitte zum Bahnhof','p26-2c':'suche den Bahnhof|suche das Hotel|suche das Theater|suche das Restaurant'})}
  {sect(458,'… den Weg beschreiben: L13')}{conf('s3',461)}
  {stext(152,478,140,'Fahren Sie zuerst')}{field('p26-3a',294,474,258,'3a')}{art('ar1',548,478,25,21)}
  {stext(151,502,131,'Biegen Sie dann')}{field('p26-3b',283,499,257,'3b')}{stext(546,502,25,'ab.')}{art('ar2',564,499,25,29)}
  {stext(151,526,240,'Fahren Sie die nächste Straße')}{field('p26-3c',392,523,253,'3c')}{art('ar3',644,528,32,24)}
  {field('p26-3d',150,546,271,'3d')}{stext(427,550,30,'Sie.')}{art('ar4',450,547,30,29)}
  {check('g3',980,546,{'p26-3a':'geradeaus','p26-3b':'links','p26-3c':'rechts','p26-3d':'Wenden'})}
  {sect(607,'… sagen: Ich kenne den Weg nicht: L13')}{conf('s4',610)}
  {stext(152,622,75,'Nein, tut')}{field('p26-4a',228,618,193,'4a')}{stext(423,622,10,'.')}{field('p26-4b',431,618,246,'4b')}{stext(683,622,55,'fremd')}
  {field('p26-4c',150,642,179,'4c')}{stext(336,646,15,'/')}{field('p26-4d',345,642,339,'4d')}{stext(749,646,80,'von hier.')}
  {check('g4',980,642,{'p26-4a':'mir leid','p26-4b':'Ich bin|bin','p26-4c':'hier','p26-4d':'Ich bin nicht|bin nicht'})}
  {sect(699,'… Häuser und Wohnungen beschreiben: L14')}{conf('s5',702)}
  {stext(151,719,115,'Mein Haus ist')}{field('p26-5a',265,715,150,'5a')}{stext(421,719,10,'.')}{stext(431,719,108,'Es hat sieben')}{field('p26-5b',539,715,195,'5b')}{stext(740,719,10,'.')}
  {stext(151,743,25,'Im')}{field('p26-5c',177,739,232,'5c')}{stext(415,743,260,'sind drei Zimmer und im ersten')}
  {field('p26-5d',150,762,206,'5d')}{stext(362,766,145,'sind vier Zimmer.')}
  {check('g5',980,762,{'p26-5a':'groß|schön|klein|alt|neu|modern|gemütlich|hell','p26-5b':'Zimmer','p26-5c':'Erdgeschoss','p26-5d':'Stock'})}
  {sect(819,'… Häuser und Wohnungen bewerten: L14')}{conf('s6',822)}
  {stext(151,838,92,'Den Garten')}{field('p26-6a',245,834,180,'6a')}{stext(431,838,175,'ich cool, aber das Haus')}{field('p26-6b',617,834,115,'6b')}{stext(738,838,70,'nicht so')}
  {stext(150,862,65,'toll aus.')}
  {stext(151,886,285,'Ich liebe das Haus, aber den Garten')}{field('p26-6c',437,882,129,'6c')}{stext(572,886,110,'ich gar nicht.')}
  {check('g6',980,882,{'p26-6a':'finde','p26-6b':'sieht','p26-6c':'mag'})}
  {sect(938,'… Gefallen und Missfallen äußern: L15')}{conf('s7',941)}
  {stext(152,958,40,'■','naMark')}{stext(166,958,33,'Wie')}{field('p26-7a',201,954,128,'7a')}{stext(335,958,100,'dir Giesing?')}{stext(443,958,15,'▲','naMark')}{stext(458,958,62,'Giesing')}{field('p26-7b',521,954,90,'7b')}{stext(615,958,172,'ganz normal und das')}
  {stext(152,982,15,'▲','naMark')}{field('p26-7c',150,978,115,'7c')}{stext(272,982,100,'ich super so.')}
  {check('g7',980,978,{'p26-7a':'gefällt','p26-7b':'ist','p26-7c':'finde'})}
  {sect(1034,'… nach Einrichtungen fragen und Einrichtungen nennen: L15')}{conf('s8',1037)}
  {stext(152,1054,15,'■','naMark')}{field('p26-8a',172,1050,255,'8a')}{stext(434,1054,295,'in Giesing eigentlich auch ein Kino?')}
  {stext(152,1078,80,'▲ Ja, aber','naMark2')}{field('p26-8b',233,1074,159,'8b')}{stext(398,1078,270,'leider nur sehr wenige Geschäfte.')}
  {check('g8',980,1074,{'p26-8a':'Gibt es','p26-8b':'es gibt|gibt es'})}
  {stext(127,1145,200,'Ich kenne …','naKann')}
  {sect(1177,'… 15 Institutionen/Einrichtungen und Plätze in der Stadt: L13/L15')}{conf('s9',1180)}
  {stext(127,1197,230,'Diese Orte besuche ich gern:')}{field('p26-9a',355,1193,525,'9a')}
  {stext(127,1221,290,'Diese Orte besuche ich fast nie/nie:')}{field('p26-9b',413,1217,467,'9b')}
  {stext(127,1245,300,'Diese Einrichtungen brauche ich oft:')}{field('p26-9c',425,1241,455,'9c')}
  {art('modul',13,1393,72,21)}
  {text(100,1390,20,'26','naFooter naFB')}{text(133,1390,10,'|','naFooter')}{text(151,1390,150,'sechsundzwanzig','naFooter')}
 </div></div>;
}
