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
 const dot=(id:string,value:string,x:number,y:number,label:string)=><input type="radio" className="naDot" name={key+'-'+id} aria-label={label} data-native-field={id} value={value} style={{left:x,top:y}} checked={values[id]===value} onChange={()=>set(id,value)}/>;
 const conf=(id:string,y:number)=><>{[0,1,2].map(c=>dot(id,''+c,895+c*38,y,'Selbsteinschätzung '+id+' '+['gut','mittel','noch nicht'][c]))}</>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="naCheck" data-check={id} style={{left:x,top:y}}><CheckButton onClick={()=>sr({...results,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(v=>normalize(v)===normalize(values[k]||'')))})}></CheckButton><output aria-live="polite">{id in results?(results[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const sect=(y:number,t:string)=><div className="naSect" style={{left:128,top:y}}><Words text={t}/></div>;

 return <div className="nativeAB12" ref={root} data-native-ab12={page}><style>{`@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-700.woff2') format('woff2');font-weight:700}@font-face{font-family:DroidSerif;src:url('assets/fonts/droid-serif-400.ttf') format('truetype');font-weight:400;font-display:swap}`}</style><div className="naCanvas" style={{width:W,height:H,transform:`translate(-50%,-50%) scale(${scale})`}}>
  {text(126,73,460,'SELBSTEINSCHÄTZUNG','naHead2 naH38')}
  {art('script',573,72,214,46)}
  {stext(128,161,300,'Ich kann jetzt …','naKann')}
  {art('dots',883,158,108,42)}
  {sect(195,'… jemanden um Hilfe bitten: L13')}{conf('s1',198)}
  {field('p26-1a',150,214,245,'1a')}{stext(401,219,80,'Sie bitte.')}
  {field('p26-1b',150,238,400,'1b')}{stext(556,243,80,'helfen?')}
  {stext(152,263,135,'Entschuldigung!')}{field('p26-1c',286,262,283,'1c')}{stext(575,263,115,'etwas fragen?')}
  {field('p26-1d',150,286,348,'1d')}{stext(504,291,185,'einen Moment Zeit?')}
  {check('g1',980,286,{'p26-1a':'Können','p26-1b':'Können Sie mir|Können Sie mir bitte','p26-1c':'Kann ich Sie','p26-1d':'Haben Sie'})}
  {sect(338,'… nach dem Weg fragen: L13')}{conf('s2',341)}
  {stext(152,363,65,'Kennen')}{field('p26-2a',217,358,400,'2a')}{stext(621,363,20,'?')}
  {stext(151,387,28,'Wo')}{field('p26-2b',180,382,437,'2b')}{stext(621,387,20,'?')}
  {stext(152,411,28,'Ich')}{field('p26-2c',181,406,436,'2c')}{stext(621,411,20,'.')}
  {art('photo',668,335,176,118)}
  {check('g2',980,402,{'p26-2a':'Sie den Weg|Sie das Restaurant|Sie den Weg zum Bahnhof','p26-2b':'ist der Bahnhof|ist das Hotel|komme ich zum Bahnhof|komme ich bitte zum Bahnhof','p26-2c':'suche den Bahnhof|suche das Hotel|suche das Theater|suche das Restaurant'})}
  {sect(459,'… den Weg beschreiben: L13')}{conf('s3',462)}
  {stext(152,483,140,'Fahren Sie zuerst')}{field('p26-3a',294,478,258,'3a')}{art('ar1',560,481,16,24)}
  {stext(151,507,131,'Biegen Sie dann')}{field('p26-3b',283,502,257,'3b')}{stext(546,507,25,'ab.')}{art('ar2',576,502,16,27)}
  {stext(151,531,240,'Fahren Sie die nächste Straße')}{field('p26-3c',392,526,253,'3c')}{art('ar3',657,528,20,26)}
  {field('p26-3d',150,550,290,'3d')}{stext(427,555,30,'Sie.')}{art('ar4',456,553,30,25)}
  {check('g3',980,550,{'p26-3a':'geradeaus','p26-3b':'links','p26-3c':'rechts','p26-3d':'Wenden'})}
  {sect(603,'… sagen: Ich kenne den Weg nicht: L13')}{conf('s4',606)}
  {stext(152,627,75,'Nein, tut')}{field('p26-4a',228,622,193,'4a')}{stext(423,627,10,'.')}{field('p26-4b',431,622,246,'4b')}{stext(683,627,55,'fremd')}
  {field('p26-4c',150,646,179,'4c')}{stext(336,651,15,'/')}{field('p26-4d',345,646,339,'4d')}{stext(749,651,80,'von hier.')}
  {check('g4',980,646,{'p26-4a':'mir leid','p26-4b':'Ich bin|bin','p26-4c':'hier','p26-4d':'Ich bin nicht|bin nicht'})}
  {sect(695,'… Häuser und Wohnungen beschreiben: L14')}{conf('s5',698)}
  {stext(151,723,115,'Mein Haus ist')}{field('p26-5a',265,718,150,'5a')}{stext(421,723,10,'.')}{stext(431,723,108,'Es hat sieben')}{field('p26-5b',539,718,195,'5b')}{stext(740,723,10,'.')}
  {stext(151,747,25,'Im')}{field('p26-5c',177,742,232,'5c')}{stext(415,747,260,'sind drei Zimmer und im ersten')}
  {field('p26-5d',150,766,206,'5d')}{stext(362,771,145,'sind vier Zimmer.')}
  {check('g5',980,766,{'p26-5a':'groß|schön|klein|alt|neu|modern|gemütlich|hell','p26-5b':'Zimmer','p26-5c':'Erdgeschoss','p26-5d':'Stock'})}
  {sect(813,'… Häuser und Wohnungen bewerten: L14')}{conf('s6',816)}
  {stext(151,843,92,'Den Garten')}{field('p26-6a',245,838,180,'6a')}{stext(431,843,175,'ich cool, aber das Haus')}{field('p26-6b',617,838,115,'6b')}{stext(738,843,70,'nicht so')}
  {stext(150,867,65,'toll aus.')}
  {stext(151,891,285,'Ich liebe das Haus, aber den Garten')}{field('p26-6c',437,886,129,'6c')}{stext(572,891,110,'ich gar nicht.')}
  {check('g6',980,886,{'p26-6a':'finde','p26-6b':'sieht','p26-6c':'mag'})}
  {sect(939,'… Gefallen und Missfallen äußern: L15')}{conf('s7',942)}
  {stext(150,963,40,'■','naMark')}{stext(166,963,33,'Wie')}{field('p26-7a',201,958,128,'7a')}{stext(335,963,100,'dir Giesing?')}{stext(444,963,15,'▲','naTri')}{stext(458,963,62,'Giesing')}{field('p26-7b',521,958,90,'7b')}{stext(615,963,172,'ganz normal und das')}
  {field('p26-7c',150,982,115,'7c')}{stext(272,987,100,'ich super so.')}
  {check('g7',980,982,{'p26-7a':'gefällt','p26-7b':'ist','p26-7c':'finde'})}
  {sect(1035,'… nach Einrichtungen fragen und Einrichtungen nennen: L15')}{conf('s8',1038)}
  {stext(150,1059,15,'■','naMark')}{field('p26-8a',165,1054,263,'8a')}{stext(434,1059,295,'in Giesing eigentlich auch ein Kino?')}
  {stext(150,1083,15,'▲','naTri')}{stext(172,1083,58,'Ja, aber')}{field('p26-8b',233,1078,159,'8b')}{stext(398,1083,270,'leider nur sehr wenige Geschäfte.')}
  {check('g8',980,1074,{'p26-8a':'Gibt es','p26-8b':'es gibt|gibt es'})}
  {stext(127,1142,200,'Ich kenne …','naKann')}
  {sect(1177,'… 15 Institutionen/Einrichtungen und Plätze in der Stadt: L13/L15')}{conf('s9',1180)}
  {stext(127,1202,230,'Diese Orte besuche ich gern:')}{field('p26-9a',355,1196,525,'9a')}
  {stext(127,1226,290,'Diese Orte besuche ich fast nie/nie:')}{field('p26-9b',413,1221,467,'9b')}
  {stext(127,1250,300,'Diese Einrichtungen brauche ich oft:')}{field('p26-9c',425,1244,455,'9c')}
  {art('modul',13,1393,72,21)}
  {text(100,1393,20,'26','naFooter naFB')}{text(133,1393,10,'|','naFooter')}{text(151,1393,150,'sechsundzwanzig','naFooter')}
 </div></div>;
}
