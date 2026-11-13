import {CheckButton} from '../components/CheckButton';
import {PageImage} from '../components/PageImage';
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
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="naArt" src={`assets/book-crops/native-ab12-p${page}-${name}.png`} alt={'Originalillustration '+name} style={{left:x,top:y,width:w,height:h}}/>;
 const field=(id:string,x:number,y:number,w:number,label:string,cls='')=><input className={'naField '+cls} aria-label={label} data-native-field={id} style={{left:x,top:y,width:w}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>;
 const fseg=(id:string,x:number,y:number,w:number,n:number,label:string)=>{const g=5,s=(w-(n-1)*g)/n;return <input className="naField naFld9 naFldSeg" aria-label={label} data-native-field={id} style={{left:x,top:y,width:w,['--seg' as string]:s+'px'} as React.CSSProperties} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>};
 const rule=(x:number,y:number,w:number)=><div className="naRule" style={{left:x,top:y,width:w}}/>;
 const rl=(x:number,y:number,w:number)=><div className="naRule11" style={{left:x,top:y,width:w}}/>;
 const dot=(id:string,value:string,x:number,y:number,label:string,checkbox=false)=><input className="naDot" type={checkbox?'checkbox':'radio'} aria-label={label} name={key+'-'+id} checked={checkbox?values[id]==='true':values[id]===value} onChange={e=>set(id,checkbox?String(e.target.checked):value)} style={{left:x,top:y}}/>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="naCheck" data-check={id} style={{left:x,top:y}}><CheckButton onClick={()=>sr({...results,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(v=>normalize(v)===normalize(values[k]||(a==='false'?'false':''))))})}></CheckButton><output aria-live="polite">{id in results?(results[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const title=(n:string,x:number,y:number,w:number,t:string,cls='')=><div className={'naTitle '+cls} style={{left:x,top:y,width:w}}><b>{n}</b><Words text={t}/></div>;
 const kb=(x:number,y:number,t:string)=><div className="naKB naKBL" style={{left:x,top:y}}>{t}</div>;
 const side=(x:number,y:number,t:string)=><div className="naSide naSideL" style={{left:x,top:y}}>{t}</div>;
 const hand=(x:number,y:number,w:number,t:string)=><div className="naText naHand" style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const mw=(id:string,t:string)=><button className={'naW9i'+(values[id]==='true'?' on':'')} aria-pressed={values[id]==='true'} aria-label={'Markieren: '+t} onClick={()=>set(id,values[id]==='true'?'false':'true')}>{t}</button>;
 const audio=(src:string,x:number,y:number,label:string)=><button className="naAudio" style={{left:x,top:y}} aria-label={'Originalaudio '+label+' abspielen'} onClick={()=>{if(player.current){player.current.src=src;player.current.play().catch(()=>{})}}}>▶ {label}</button>;
 const dash=(x:number,y:number,w:number,parts:(string|[string])[])=><div className="naText naS20 naDash naNw" style={{left:x,top:y,width:w}}>{parts.map((p,i)=>Array.isArray(p)?<b key={i}>{p[0]}</b>:<span key={i}>{p}</span>)}</div>;
 const footerL=(n:string,word:string,y:number)=><><div className="naText naFooter" style={{left:76,top:y,width:220}}><b>{n}</b>{'  |  '+word}</div></>;
 const footerR=(n:string,word:string,y:number)=><><div className="naText naFooter" style={{left:870,top:y,width:180}}>{word+'  |  '}<b>{n}</b></div></>;
 const badge9=(n:string,x:number,y:number,w=31,h=20)=><><div className="naBadgeRT" style={{left:x-2,top:y-3,width:w-3,height:2}}/><div className="naBadgeRL" style={{left:x-2,top:y-3,width:2,height:h+5}}/><div className="naBadge9" style={{left:x,top:y,width:w,height:h}}>{n}</div></>;

 return <div className="nativeAB12" ref={root} data-native-ab12={page}><style>{"@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-400.woff2') format('woff2');font-weight:400}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-700.woff2') format('woff2');font-weight:700}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-500.ttf');font-weight:500}"}</style><div className="naCanvas" style={{width:W,height:H,transform:`translate(-50%,-50%) scale(${scale})`}}>
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
  {check('6-3a',660,1050,{'6-r1':'Restaurant','6-r2':'Zentrum','6-r3':'Bahnhof','6-r4':'Bank','6-r5':'Post','6-r6':'Ampel'})}
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
 {page==='7'&&<>
  {text(115,86,300,'BASISTRAINING','naHeadline naNw')}
  <div className="naRule" style={{left:362,top:109,width:601,borderColor:'#fce80f'}}/>
  {art('lesson13',980,25,82,75)}
  {kb(56,163,'KB 5')}
  {title('4',112,158,600,'Ergänzen Sie den Artikel.','naYB')}
  {side(70,175,'STRUKTUREN')}
  {text(155,203,20,'a','naLet13')}{text(185,203,790,'Entschuldigen Sie bitte, wo ist denn hier die Polizei? – Die ist ganz in der Nähe, neben','naS20 naNw')}
  {art('dem',175,225,39,25)}{text(224,229,200,'Hotel „Globus“.','naS20 naNw')}
  {text(155,254,20,'b','naLet13')}{text(185,254,320,'Und das Hotel „Globus“? – Das ist vor','naS20 naNw')}{field('7-4b',510,256,75,'4b')}{text(592,254,350,'Restaurant „Zur Glocke“.','naS20 naNw')}
  {text(155,280,20,'c','naLet13')}{text(185,280,460,'Und das Restaurant „Zur Glocke“? – Das ist zwischen','naS20 naNw')}{field('7-4c1',648,282,77,'4c1')}{text(733,280,80,'Dom und','naS20 naNw')}{field('7-4c2',815,282,75,'4c2')}{text(898,280,60,'Bank.','naS20 naNw')}
  {text(155,306,20,'d','naLet13')}{text(185,306,505,'Und wo ist der Dom? – Na dort, schauen Sie, gleich hinter','naS20 naNw')}{field('7-4d',695,308,75,'4d')}{text(778,306,70,'Brücke.','naS20 naNw')}
  {text(155,332,20,'e','naLet13')}{text(185,332,515,'Danke! Und gibt es hier auch eine Post? – Ja, gleich dort an','naS20 naNw')}{field('7-4e',705,334,75,'4e')}{text(788,332,60,'Ampel.','naS20 naNw')}
  {check('7-4',860,372,{'7-4b':'dem','7-4c1':'dem','7-4c2':'der','7-4d':'der','7-4e':'der'})}
  {kb(56,427,'KB 5')}
  {title('5',112,416,700,'Ergänzen Sie die Präposition und den Artikel.','naYB')}
  {side(70,462,'STRUKTUREN')}
  {text(156,456,200,'Wo ist denn …','naS20 naNw')}
  {text(155,512,20,'a','naLet13')}<div className="naText naS19 naNw" style={{left:180,top:513,width:367,letterSpacing:'0.7px',wordSpacing:'0px'}}><Words text="… das Hotel „Kirchblick“? – Das ist direkt"/></div>{art('am',549,507,25,29)}{text(577,513,80,'Bahnhof.','naS18 naNw')}
  {art('hotel',665,468,165,94)}
  {text(155,602,20,'b','naLet13')}{text(185,602,180,'… die Post? – Die ist','naS20 naNw')}{field('7-5b1',366,604,109,'5b1')}{text(483,602,100,'Polizei und','naS20 naNw')}{field('7-5b2',585,604,115,'5b2')}{text(708,602,160,'Café „Glockner“.','naS20 naNw')}
  {art('polizei',860,555,156,87)}
  {text(155,692,20,'c','naLet13')}{text(185,692,258,'… die Mozartstraße? – Die ist','naS20 naNw')}{field('7-5c',447,694,113,'5c')}{text(568,692,70,'Brücke.','naS20 naNw')}
  {art('mozart',645,644,155,95)}
  {text(155,782,20,'d','naLet13')}{text(185,782,193,'… Wuffel? – Er wartet','naS20 naNw')}{field('7-5d',380,786,115,'5d')}{text(503,782,60,'Ampel.','naS20 naNw')}
  {art('ampel',560,728,151,86)}
  {text(155,873,20,'e','naLet13')}{text(185,873,171,'… Miezi? – Sie sitzt','naS20 naNw')}{field('7-5e',358,875,112,'5e')}{text(478,873,65,'Brücke.','naS20 naNw')}
  {art('miezi',565,833,145,95)}
  {text(155,962,20,'f','naLet13')}{text(185,962,179,'… die Frau? – Sie ist','naS20 naNw')}{field('7-5f',366,964,109,'5f')}{text(483,962,50,'Dom.','naS20 naNw')}
  {art('frau',550,917,168,89)}
  {text(155,1051,20,'g','naLet13')}{text(185,1051,188,'… der Mann? – Er ist','naS20 naNw')}{field('7-5g',375,1054,110,'5g')}{text(493,1051,50,'Bank.','naS20 naNw')}
  {art('bank',577,1003,152,85)}
  {check('7-5',860,1100,{'7-5b1':'zwischen der','7-5b2':'dem','7-5c':'hinter der','7-5d':'an der','7-5e':'auf der','7-5f':'im','7-5g':'vor der'})}
  {kb(56,1146,'KB 5')}
  {title('6',113,1137,720,'Zeichnen Sie für Ihre Partnerin / Ihren Partner Orte in der Stadt auf','naYB naNw')}
  <div className="naTitle naYB" style={{left:156,top:1163,width:320}}><Words text="Kärtchen ähnlich wie in 5."/></div>
  <div style={{position:'absolute',left:59,top:1172,width:9,height:9,borderRadius:'50%',background:'#67aacd'}}/><div style={{position:'absolute',left:88,top:1172,width:9,height:9,borderRadius:'50%',background:'#67aacd'}}/>{text(157,1207,500,'Ihre Partnerin / Ihr Partner schreibt einen Satz.','naS20 naNw')}
  {footerR('7','sieben',1386)}
  {art('tab7',1000,1383,71,25)}
 </>}
 {page==='8'&&<>
  {text(111,86,300,'BASISTRAINING','naHeadline naNw')}
  <div className="naRule" style={{left:362,top:102,width:601,borderColor:'#fce80f'}}/>
  {kb(56,166,'KB 5')}
  {title('7',109,161,500,'Wie komme ich zu …?','naYB')}
  {side(72,208,'SCHREIBEN')}
  {text(153,203,790,'Lesen Sie die SMS. Was antwortet Marina? Schreiben Sie Marinas E-Mail fertig.','naS20 naB20 naNw')}
  <div className="naText naS18 naBank naBankHl naNw" style={{left:158,top:243,width:730}}><Words text="Brücke | Ampel | links abbiegen | Polizei | Domplatz | nach rechts fahren | Hotel | mein Haus"/></div>
  {art('sms',64,300,278,190)}
  <div style={{position:'absolute',left:374,top:278,width:350,height:306,border:'1px solid #c9c9c9',background:'#fff'}}/>
  {text(402,293,240,'Von:  Marina Kreuzner','naS16 naNw')}
  <div className="naRule" style={{left:388,top:316,width:252}}/>
  {text(409,319,240,'An:  philippX@web.de','naS16 naNw')}
  <div className="naRule" style={{left:388,top:342,width:252}}/>
  {text(388,347,240,'Betreff: Besuch','naS16 naNw')}
  <div className="naRule" style={{left:388,top:368,width:252}}/>
  {text(388,384,300,'Liebe Susanna, lieber Philipp,','naS16 naNw')}
  {text(387,407,320,'den Weg kann ich Euch leicht beschreiben.','naS16 naNw')}
  {text(388,431,320,'Meinburg ist nicht groß und ich wohne im','naS16 naNw')}
  {text(388,454,320,'Zentrum. Ihr fährt nach Meinburg und seht','naS16 naNw')}
  {text(389,481,220,'gleich eine Brücke. …','naS16 naNw')}
  <div className="naRule" style={{left:388,top:520,width:252}}/>
  <div className="naRule" style={{left:388,top:545,width:252}}/>
  <div className="naRule" style={{left:388,top:570,width:252}}/>
  {text(391,586,300,'Bis Samstag! Viele Grüße, Marina','naS16 naNw')}
  {art('map',745,285,285,320)}
  {kb(56,648,'KB 7')}
  {title('8',109,639,500,'Ordnen Sie die Antworten zu.','naYB')}
  {side(72,686,'KOMMUNIKATION')}
  <div className="naText naS18 naBank naBankHl naNw" style={{left:157,top:681,width:530}}><Words text="ist sehr nett | sehen Sie schon | "/><span style={{background:'#fdf0a0'}}><Words text="bin fremd hier"/></span><Words text=" | Wenden Sie hier |"/></div>
  <div className="naText naS18 naBank naBankHl naNw" style={{left:155,top:706,width:530}}><Words text="Trotzdem: Dankeschön | bin nicht von hier | ist ganz in der Nähe"/></div>
  {text(151,745,20,'a','naLet13')}<div className="naSq8" style={{left:175,top:753}}/>{text(196,745,530,'Können Sie mir helfen? Wo ist das Cafe „Glockner“?','naS20 naNw')}
  <div className="naTri8" style={{left:176,top:779}}/>{text(196,772,165,'Tut mir leid, ich','naS20 naNw')}{art('binfremd',343,772,112,28)}{text(460,772,30,'/','naS20')}
  {text(197,797,32,'Ich','naS20 naNw')}{field('8-8a',232,800,311,'8a')}{text(548,797,15,'.','naS20')}
  {text(151,835,20,'b','naLet13')}<div className="naSq8" style={{left:175,top:843}}/>{text(196,835,410,'Ja, das ist gleich die nächste Straße links.','naS20 naNw')}
  <div className="naTri8" style={{left:176,top:861}}/>{text(196,861,150,'Vielen Dank, das','naS20 naNw')}{field('8-8b',349,864,298,'8b')}{text(652,861,15,'.','naS20')}
  {text(151,900,20,'c','naLet13')}<div className="naSq8" style={{left:175,top:908}}/>{text(196,900,365,'Oh. Tut mir leid. Das weiß ich nicht.','naS20 naNw')}
  <div className="naTri8" style={{left:176,top:926}}/>{text(196,926,68,'Schade.','naS20 naNw')}{field('8-8c',268,929,302,'8c')}{text(575,926,15,'!','naS20')}
  {text(151,977,20,'d','naLet13')}<div className="naSq8" style={{left:175,top:985}}/>{text(196,977,495,'Kann ich Sie etwas fragen? Ich suche den Bahnhof.','naS20 naNw')}
  <div className="naTri8" style={{left:176,top:1004}}/>{text(196,1004,388,'Fahren Sie zwei Kilometer geradeaus. Dann','naS20 naNw')}{field('8-8d',588,1007,284,'8d')}
  {text(196,1029,120,'den Bahnhof.','naS20 naNw')}
  {text(151,1068,20,'e','naLet13')}<div className="naSq8" style={{left:175,top:1076}}/>{text(196,1068,410,'Kennen Sie das Restaurant „Schönblick“?','naS20 naNw')}
  <div className="naTri8" style={{left:176,top:1097}}/>{text(194,1097,68,'Ja, das','naS20 naNw')}{field('8-8e1',265,1100,305,'8e1')}{text(573,1097,12,'.','naS20')}{field('8-8e2',587,1100,285,'8e2')}
  {text(196,1123,470,'und fahren Sie zurück bis zur Ampel und dann links.','naS20 naNw')}
  {check('8-8',860,1150,{'8-8a':'bin nicht von hier','8-8b':'ist sehr nett','8-8c':'Trotzdem: Dankeschön','8-8d':'sehen Sie schon','8-8e1':'ist ganz in der Nähe','8-8e2':'Wenden Sie hier'})}
  {kb(56,1190,'KB 9')}
  {title('9',108,1180,600,'Finden Sie passende Fragen zu den Antworten.','naYB')}
  {side(72,1228,'KOMMUNIKATION')}
  {text(150,1223,20,'a','naLet13')}{text(180,1223,318,'Entschuldigen Sie bitte. Kann ich Sie','naS20 naNw')}{art('etwasfragen',502,1224,102,30)}{text(610,1223,180,'– Ja, kein Problem.','naS20 naNw')}
  {text(150,1249,20,'b','naLet13')}{text(180,1249,135,'Können Sie mir','naS20 naNw')}{field('8-9b',318,1251,257,'9b')}{text(580,1249,110,'? – Ja, gern.','naS20 naNw')}
  {text(150,1276,20,'c','naLet13')}{text(180,1276,98,'Kennen Sie','naS20 naNw')}{field('8-9c',280,1277,255,'9c')}{text(540,1276,350,'? – Ja, das Hotel „Marienhof“ ist im Zentrum.','naS20 naNw')}
  {text(150,1301,20,'d','naLet13')}{text(180,1301,36,'Eine','naS20 naNw')}{field('8-9d',218,1302,257,'9d')}{text(480,1301,430,'. Wo ist denn hier die Bank? – Die ist gleich hier.','naS20 naNw')}
  {text(150,1327,20,'e','naLet13')}{text(180,1327,140,'Haben Sie einen','naS20 naNw')}{field('8-9e',322,1328,263,'9e')}{text(590,1327,120,'Zeit? – Klar.','naS20 naNw')}
  {check('8-9',860,1358,{'8-9b':'helfen','8-9c':'das Hotel „Marienhof“|das Hotel Marienhof','8-9d':'Frage','8-9e':'Moment'})}
  {art('tab',0,1388,70,36)}
  {footerL('8','acht',1393)}
 </>}
 {page==='9'&&<>
  {text(113,90,300,'TRAINING: HÖREN','naTrain naNw')}
  <div className="naRuleY9" style={{left:401,top:116,width:565}}/>
  <div className="naL13" style={{left:982,top:42,width:86,height:57}}>13</div>
  {audio('assets/ab-a12-cd2-track02.mp3',56,166,'2 02')}
  {badge9('1',112,169)}{text(153,169,660,'Welche Orte/Einrichtungen in der Stadt hören Sie? Markieren Sie.','naYT naNw')}
  <div className="naBand9w" style={{left:153,top:204,width:649,height:54}}/>
  <div className="naBankRow9" style={{left:159,top:208}}>{mw('9-m-restaurant','Restaurant')}<span className="naPipe9i"/><span className="naW9mi">Bahnhof</span><span className="naPipe9i"/>{mw('9-m-kino','Kino')}<span className="naPipe9i"/>{mw('9-m-dom','Dom')}<span className="naPipe9i"/>{mw('9-m-schwimmbad','Schwimmbad')}<span className="naPipe9i"/>{mw('9-m-post','Post')}<span className="naPipe9i"/>{mw('9-m-bruecke','Brücke')}<span className="naPipe9i"/>{mw('9-m-bank','Bank')}<span className="naPipe9i"/>{mw('9-m-polizei','Polizei')}<span className="naPipe9i"/></div>
  <div className="naBankRow9" style={{left:157,top:235}}>{mw('9-m-ampel','Ampel')}<span className="naPipe9i"/>{mw('9-m-hotel','Hotel')}<span className="naPipe9i"/>{mw('9-m-theater','Theater')}</div>
  <div className="naTipBar" style={{left:454,top:249,width:473,height:4}}/>
  <div className="naTipTab" style={{left:454,top:249,width:13,height:111}}><span>TIPP</span></div>
  {text(487,256,430,'Sie finden das Hören schwer? Achten Sie beim Hören','naTipT naNw')}
  {text(487,278,220,'auf die wichtigen Wörter.','naTipT naNw')}
  {text(487,301,380,'Wichtige Wörter in Wegbeschreibungen sind:','naTipT naNw')}
  {text(487,322,430,'– Einrichtungen in der Stadt: Bahnhof, Kino, Dom …','naTipT naNw')}
  {text(487,344,430,'– Richtungsangaben: rechts, links, geradeaus …','naTipT naNw')}
  {audio('assets/ab-a12-cd2-track02.mp3',56,397,'2 02')}
  {badge9('2',112,400)}{text(156,401,790,'Roland möchte Simon besuchen. Er steht am Bahnhof und fragt nach dem Weg.','naEx9d naNw')}
  {text(156,428,810,'Hören Sie noch einmal und zeichnen Sie den Weg in den Stadtplan. Wo ist die Albachstraße?','naInst9 naNw')}
  {art('stadtplan',117,464,846,364)}
  {text(113,910,350,'TRAINING: AUSSPRACHE','naTrain naNw')}
  {text(493,912,240,'Diphthonge „ei“, „eu“, „au“','naTrainIt naNw')}
  <div className="naRuleY9" style={{left:744,top:931,width:220}}/>
  {audio('assets/ab-a12-cd2-track03.mp3',56,978,'2 03')}
  {badge9('1',112,981)}{text(156,981,340,'Hören Sie und sprechen Sie nach.','naYT naNw')}
  <div className="naBand9" style={{left:153,top:1018,width:343,height:25}}/>
  <div className="naBand9" style={{left:153,top:1044,width:343,height:25}}/>
  <div className="naBand9" style={{left:153,top:1070,width:282,height:25}}/>
  {text(160,1021,40,'nein','naWord9 naNw')}{text(201,1021,12,'|','naSep9 naNw')}{text(210,1021,98,'beschreiben','naWord9 naNw')}{text(311,1021,12,'|','naSep9 naNw')}{text(320,1021,55,'Polizei','naWord9 naNw')}{text(378,1021,12,'|','naSep9 naNw')}{text(386,1021,47,'beide','naWord9 naNw')}{text(436,1021,12,'|','naSep9 naNw')}{text(443,1021,52,'vorbei','naWord9 naNw')}
  {text(159,1047,86,'ankreuzen','naWord9 naNw')}{text(248,1047,12,'|','naSep9 naNw')}{text(256,1047,66,'deutsch','naWord9 naNw')}{text(325,1047,12,'|','naSep9 naNw')}{text(335,1047,57,'Freund','naWord9 naNw')}{text(395,1047,12,'|','naSep9 naNw')}{text(404,1047,43,'neun','naWord9 naNw')}{text(449,1047,12,'|','naSep9 naNw')}{text(458,1047,40,'Euro','naWord9 naNw')}
  {text(159,1072,42,'Auto','naWord9 naNw')}{text(203,1072,12,'|','naSep9 naNw')}{text(211,1072,41,'auch','naWord9 naNw')}{text(255,1072,12,'|','naSep9 naNw')}{text(265,1072,37,'Frau','naWord9 naNw')}{text(304,1072,12,'|','naSep9 naNw')}{text(312,1072,84,'geradeaus','naWord9 naNw')}{text(399,1072,12,'|','naSep9 naNw')}{text(407,1072,30,'auf','naWord9 naNw')}
  {audio('assets/ab-a12-cd2-track05.mp3',523,980,'2 05')}
  {badge9('3',570,981,32,19)}{text(614,980,400,'Ergänzen Sie „au“, „ei“ oder „eu“.','naYT naYT21 naNw')}
  {text(614,1007,330,'Hören Sie dann und vergleichen Sie.','naInst9 naNw')}
  {text(612,1050,20,'a','naLet9')}{text(636,1044,10,'S','naEx9 naNw')}{field('9-3a1',646,1044,38,'3a Seid','naFld9')}{text(688,1044,82,'d ihr verh','naEx9 naNw')}{field('9-3a2',773,1044,38,'3a verheiratet','naFld9')}{text(815,1044,82,'ratet? – N','naEx9 naNw')}{field('9-3a3',900,1044,37,'3a Nein','naFld9')}{text(941,1044,16,'n,','naEx9 naNw')}
  {text(637,1071,65,'nur Arb','naEx9 naNw')}{field('9-3a4',705,1070,38,'3a Arbeitskollegen','naFld9')}{text(747,1071,88,'tskollegen.','naEx9 naNw')}
  {text(612,1096,20,'b','naLet9')}{text(636,1096,76,'Zur Poliz','naEx9 naNw')}{field('9-3b1',715,1095,38,'3b Polizei','naFld9')}{text(757,1096,125,'? Zuerst gerade','naEx9 naNw')}{field('9-3b2',886,1095,39,'3b geradeaus','naFld9')}{text(929,1096,44,'s und','naEx9 naNw')}
  {text(636,1122,172,'dann am Hotel vorb','naEx9 naNw')}{field('9-3b3',810,1121,38,'3b vorbei','naFld9')}{text(852,1122,10,'.','naEx9 naNw')}
  {text(613,1153,20,'c','naLet9')}{text(636,1148,126,'Was kostet das','naEx9 naNw')}{field('9-3c1',769,1147,37,'3c Auto','naFld9')}{text(810,1148,50,'to? –','naEx9 naNw')}
  {text(634,1174,14,'N','naEx9 naNw')}{field('9-3c2',650,1173,35,'3c Neunzehntausend','naFld9')}{text(690,1174,60,'nzehnt','naEx9 naNw')}{field('9-3c3',752,1173,38,'3c tausend','naFld9')}{text(795,1174,38,'send','naEx9 naNw')}{field('9-3c4',837,1173,38,'3c Euro','naFld9')}{text(880,1174,30,'ro.','naEx9 naNw')}
  {text(613,1199,20,'d','naLet9')}{text(636,1200,48,'Wie h','naEx9 naNw')}{field('9-3d1',687,1198,37,'3d heißt','naFld9')}{text(728,1200,52,'ßt das','naEx9 naNw')}{field('9-3d2',783,1198,38,'3d auf','naFld9')}{text(825,1200,20,'f D','naEx9 naNw')}{field('9-3d3',847,1198,38,'3d Deutsch','naFld9')}{text(889,1200,62,'tsch? –','naEx9 naNw')}
  {text(636,1226,74,'Tut mir l','naEx9 naNw')}{field('9-3d4',713,1225,39,'3d leid','naFld9')}{text(756,1226,66,'d. Das w','naEx9 naNw')}{field('9-3d5',825,1225,38,'3d weiß','naFld9')}{text(867,1226,42,'ß ich','naEx9 naNw')}{field('9-3d6',913,1225,38,'3d auch','naFld9')}{text(955,1226,20,'ch','naEx9 naNw')}
  {text(637,1250,51,'nicht.','naEx9 naNw')}
  {check('9-3',955,1250,{'9-3a1':'ei','9-3a2':'ei','9-3a3':'ei','9-3a4':'ei','9-3b1':'ei','9-3b2':'au','9-3b3':'ei','9-3c1':'au','9-3c2':'eu','9-3c3':'au','9-3c4':'eu','9-3d1':'ei','9-3d2':'au','9-3d3':'eu','9-3d4':'ei','9-3d5':'ei','9-3d6':'au'})}
  {audio('assets/ab-a12-cd2-track04.mp3',56,1127,'2 04')}
  {badge9('2',112,1135)}{text(155,1133,460,'Hören Sie noch einmal und ergänzen','naYT naNw')}
  {text(155,1157,200,'Sie die Regel.','naYT naNw')}
  <div className="naRegelBar" style={{left:154,top:1195,width:360,height:6}}/>
  <div className="naRegelStrip" style={{left:154,top:1195,width:15,height:135}}><span>REGEL</span></div>
  {text(188,1205,430,'Man hört „ai“, man schreibt meistens:','naEx9 naNw')}
  {field('9-2a',188,1225,84,'Regel ai','naFld9 naFld9L')}
  {text(188,1249,430,'Man hört „oi“, man schreibt meistens:','naEx9 naNw')}
  {field('9-2b',188,1269,84,'Regel oi','naFld9 naFld9L')}
  {text(188,1298,430,'Man hört „au“ und schreibt auch:','naEx9 naNw')}
  {field('9-2c',188,1313,84,'Regel au','naFld9 naFld9L')}
  {check('9-2',1025,1330,{'9-2a':'ei','9-2b':'eu|äu','9-2c':'au'})}
  {audio('assets/ab-a12-cd2-track06.mp3',543,1300,'2 06')}
  {text(614,1304,400,'Hören Sie noch einmal und sprechen Sie nach.','naInst9 naNw')}
  <div className="naText naFooter naNw" style={{left:905,top:1393,width:100}}>neun{'  |  '}<b>9</b></div>
  <div className="naModul9b" style={{left:1003,top:1393,width:68,height:19}}>Modul 5</div>
 </>}
 {page==='10'&&<>
  {text(118,94,120,'TEST','naTest10 naNw')}
  <div className="naRuleY9" style={{left:196,top:117,width:760}}/>
  <div className="naSide10" style={{left:92,top:213,height:48}}>WÖRTER</div>
  <div className="naSide10" style={{left:92,top:536,height:48}}>WÖRTER</div>
  <div className="naSide10" style={{left:92,top:795,height:74}}>STRUKTUREN</div>
  <div className="naSide10" style={{left:92,top:1027,height:102}}>KOMMUNIKATION</div>
  {badge9('1',117,169,32,20)}{text(159,169,200,'Ordnen Sie zu.','naYT naNw')}
  {text(165,211,80,'Stadtplan','naWord10 naNw')}{text(247,211,10,'|','naSep10 naNw')}{text(257,211,44,'Post','naWord10 naNw')}{text(301,211,10,'|','naSep10 naNw')}{text(306,211,76,'Bahnhof','naWord10 naNw')}{text(382,211,10,'|','naSep10 naNw')}{text(387,212,90,'Stadtmitte','naWord10 naNw')}{text(480,211,10,'|','naSep10 naNw')}{text(489,211,54,'Hotel','naWord10 naNw')}<div className="naStrike10" style={{left:489,top:219,width:45,height:2}}/>{text(543,211,10,'|','naSep10 naNw')}{text(548,212,40,'Bank','naWord10 naNw')}
  {text(158,249,20,'a','naLet9')}<div className="naSq8" style={{left:183,top:254}}/>{text(200,250,190,'Wie gefällt Ihnen das ','naEx9 naNw')}{art('hotel-hw',385,243,46,27)}{text(434,250,110,'„Maritim“?','naEx10 naNw')}<div className="naTri8" style={{left:545,top:256}}/>{text(563,250,412,'Sehr gut, die Zimmer dort sind wirklich schön.','naEx10 naNw')}
  {text(159,275,20,'b','naLet9')}<div className="naSq8" style={{left:183,top:280}}/>{text(200,276,390,'Können Sie bitte Briefmarken mitbringen?','naEx10 naNw')}
  <div className="naTri8" style={{left:183,top:306}}/>{text(200,302,352,'Ja, gerne. Ich gehe heute Vormittag zur ','naEx9 naNw')}{field('10-1b',552,302,122,'1b Ort Post','naFld9')}{text(680,302,14,'.','naEx10 naNw')}
  {text(159,327,20,'c','naLet9')}<div className="naSq8" style={{left:182,top:331}}/>{text(200,328,515,'Oh je, mein Zug fährt in 30 Minuten. Wie komme ich zum ','naEx10 naNw')}{field('10-1c',715,328,125,'1c Ort Bahnhof','naFld9')}{text(845,328,14,'?','naEx10 naNw')}
  {text(159,353,20,'d','naLet9')}<div className="naSq8" style={{left:183,top:357}}/>{text(200,354,460,'Können wir Sie etwas fragen? Wir suchen den Dom. ','naEx9b naNw')}<div className="naTri8" style={{left:668,top:359}}/>{text(688,355,118,'Der ist in der ','naEx10 naNw')}{field('10-1d',806,354,145,'1d Ort Stadtmitte','naFld9')}{text(955,354,14,'.','naEx10 naNw')}
  {text(159,379,20,'e','naLet9')}<div className="naSq8" style={{left:182,top:383}}/>{text(200,379,353,'Ich habe kein Geld. Wo gibt es hier eine ','naEx10 naNw')}{field('10-1e',556,380,149,'1e Ort Bank','naFld9')}{text(710,380,14,'?','naEx10 naNw')}<div className="naTri8" style={{left:735,top:386}}/>{text(755,380,225,'Gleich neben der Brücke.','naEx10 naNw')}
  {text(159,404,20,'f','naLet9')}<div className="naSq8" style={{left:183,top:409}}/>{text(200,405,465,'Entschuldigung, kennen Sie die Frankfurter Straße?','naEx10 naNw')}
  <div className="naTri8" style={{left:183,top:436}}/>{text(202,431,318,'Nein, leider nicht. Aber hier ist ein ','naEx10 naNw')}{field('10-1f',520,431,174,'1f Ort Stadtplan','naFld9')}{text(698,431,14,'.','naEx10 naNw')}
  {text(884,436,90,'_ / 5 PUNKTE','naPkt10 naNw')}
  {check('10-1',938,455,{'10-1b':'Post','10-1c':'Bahnhof','10-1d':'Stadtmitte','10-1e':'Bank','10-1f':'Stadtplan'})}
  {badge9('2',116,492,32,20)}{text(160,493,420,'Beschreiben Sie den Weg. Ergänzen Sie.','naYT naNw')}
  <div className="naSq8" style={{left:161,top:537}}/>{text(175,534,640,'Haben Sie einen Moment Zeit? Wie komme ich bitte zum Internet-Café?','naEx10 naNw')}
  {art('map',157,553,178,168)}
  <div className="naTri8" style={{left:341,top:563}}/>{text(360,560,155,'Fahren Sie zuerst ','naEx9 naNw')}{art('geradeaus',520,563,72,23)}{text(597,560,80,'(a), dann ','naEx10b naNw')}{field('10-2b',678,558,116,'2b Richtung biegen','naFld9')}{text(802,561,56,'(b) Sie','naEx10b naNw')}
  {field('10-2c',359,585,127,'2c Richtung links','naFld9')}{text(491,586,66,'(c) ab. ','naEx10b naNw')}{text(560,586,196,'Fahren Sie jetzt einen ','naEx9 naNw')}{field('10-2d',761,585,119,'2d Kilometer','naFld9')}
  {text(359,611,260,'(d) geradeaus und dann nach ','naEx10b naNw')}{field('10-2e',632,610,85,'2e Richtung rechts','naFld9')}{text(723,612,140,'(e). Nach 500 m','naEx10b naNw')}
  {text(359,637,184,'fahren Sie über eine ','naEx10b naNw')}{field('10-2f',543,636,155,'2f Ort Brücke','naFld9')}{text(705,637,128,'(f) und an der ','naEx10b naNw')}{field('10-2g',833,637,96,'2g Ort Ampel','naFld9')}{text(936,638,24,'(g)','naEx10b naNw')}
  {text(358,663,350,'wieder rechts, dann sehen Sie das Café.','naEx10b naNw')}
  <div className="naSq8" style={{left:343,top:692}}/>{text(357,689,120,'Dankeschön!','naEx10 naNw')}
  {text(884,695,90,'_ / 6 PUNKTE','naPkt10 naNw')}
  {check('10-2',900,712,{'10-2b':'biegen','10-2c':'links','10-2d':'Kilometer','10-2e':'rechts','10-2f':'Brücke','10-2g':'Ampel'})}
  {badge9('3',115,749,32,21)}{text(152,748,500,'Was ist richtig? Kreuzen Sie an und ergänzen Sie.','naYT naNw')}
  {art('city',680,762,300,188)}
  {text(158,792,20,'a','naLet9')}{text(182,792,120,'Die Post ist','naEx10 naNw')}{art('xcircle',297,787,29,29)}{text(328,793,55,'unter','naEx10 naNw')}<div className="naRad10" style={{left:402,top:792}}/>{text(426,793,90,'zwischen','naEx10 naNw')}{text(519,793,14,'d','naEx10 naNw')}{art('em',529,795,27,19)}{text(569,793,55,'Hotel.','naEx10 naNw')}
  {text(158,818,20,'b','naLet9')}{text(183,818,120,'Das Café ist','naEx10 naNw')}{dot('10-r3b','hinter',306,818,'3b hinter')}{text(331,818,60,'hinter','naEx10 naNw')}{dot('10-r3b','neben',412,818,'3b neben')}{text(436,818,60,'neben','naEx10 naNw')}{text(511,818,12,'d','naEx10 naNw')}{fseg('10-3bt',528,816,57,1,'3b Artikel')}{text(588,818,50,'Bank.','naEx10 naNw')}
  {text(158,844,20,'c','naLet9')}{text(183,844,120,'Die Polizei ist','naEx10 naNw')}{dot('10-r3c','vor',319,844,'3c vor')}{text(343,844,32,'vor','naEx10 naNw')}{dot('10-r3c','auf',397,844,'3c auf')}{text(421,844,34,'auf','naEx10 naNw')}{text(471,844,12,'d','naEx10 naNw')}{fseg('10-3ct',484,842,57,1,'3c Artikel')}{text(548,844,80,'Bahnhof.','naEx10 naNw')}
  {text(158,870,20,'d','naLet9')}{text(182,870,105,'Der Dom ist','naEx10 naNw')}{dot('10-r3d','in',310,870,'3d in')}{text(334,870,24,'in','naEx10 naNw')}{dot('10-r3d','an',377,870,'3d an')}{text(401,870,28,'an','naEx10 naNw')}{text(443,870,12,'d','naEx10 naNw')}{fseg('10-3dt',457,868,57,1,'3d Artikel')}{text(520,870,100,'Stadtmitte.','naEx10 naNw')}
  {text(158,896,20,'e','naLet9')}{text(182,896,140,'Der Bahnhof ist','naEx10 naNw')}{dot('10-r3e','vor',346,896,'3e vor')}{text(369,896,32,'vor','naEx10 naNw')}{dot('10-r3e','hinter',423,896,'3e hinter')}{text(448,896,60,'hinter','naEx10 naNw')}{text(524,896,12,'d','naEx10 naNw')}{fseg('10-3et',537,894,58,1,'3e Artikel')}{text(602,896,65,'Polizei.','naEx10 naNw')}
  {text(158,921,20,'f','naLet9')}{text(182,921,135,'Das Hotel ist','naEx10 naNw')}{dot('10-r3f','über',317,922,'3f über')}{text(341,921,44,'über','naEx10 naNw')}{dot('10-r3f','an',406,922,'3f an')}{text(430,921,28,'an','naEx10 naNw')}{text(472,921,12,'d','naEx10 naNw')}{fseg('10-3ft',485,920,58,1,'3f Artikel')}{text(550,921,45,'Post.','naEx10 naNw')}
  {text(883,954,92,'_ / 10 PUNKTE','naPkt10 naNw')}
  {check('10-3',938,974,{'10-r3b':'neben','10-r3c':'vor','10-r3d':'in','10-r3e':'hinter','10-r3f':'über','10-3bt':'er','10-3ct':'em','10-3dt':'er','10-3et':'er','10-3ft':'er'})}
  {badge9('4',115,982,32,21)}{text(152,980,460,'Was sagen die Personen? Ergänzen Sie.','naYT naNw')}
  {text(158,1026,20,'1','naLet9')}<div className="naSq8" style={{left:186,top:1030,width:11,height:10}}/>{text(201,1024,14,'K','naEx10 naNw')}{fseg('10-4a',227,1024,117,5,'4a Können')}{text(352,1024,160,'(a) Sie mir bitte h','naEx10c naNw')}{fseg('10-4b',507,1024,116,5,'4b helfen')}{text(631,1025,85,'(b)? Ich s','naEx10 naNw')}{fseg('10-4c',710,1025,89,4,'4c suche')}{text(809,1026,140,'(c) das Theater.','naEx10 naNw')}
  <div className="naTri8" style={{left:186,top:1056}}/>{text(209,1050,103,'Ja gern. F','naEx10 naNw')}{fseg('10-4d',319,1050,92,4,'4d Fahren')}{text(418,1050,345,'(d) Sie die nächste Straße links. Dann s','naEx10 naNw')}{fseg('10-4e',763,1052,91,4,'4e sehen')}{text(862,1052,60,'(e) Sie','naEx10 naNw')}
  {text(210,1076,170,'das Theater schon.','naEx10 naNw')}
  <div className="naSq8" style={{left:186,top:1107,width:11,height:10}}/>{text(210,1102,14,'S','naEx10 naNw')}{fseg('10-4f1',219,1102,62,3,'4f Sehr')}{text(299,1103,12,'n','naEx10 naNw')}{fseg('10-4f2',310,1102,64,3,'4f nett')}{text(385,1102,150,'(f)! Vielen Dank.','naEx10 naNw')}
  {text(157,1142,20,'2','naLet9')}<div className="naTri8" style={{left:186,top:1147}}/>{text(210,1140,180,'Kann ich Sie etwas f','naEx10 naNw')}{fseg('10-4g',389,1140,116,5,'4g fragen')}{text(512,1141,370,'(a)? Wo ist das Hotel „Vier Jahreszeiten“?','naEx10 naNw')}
  <div className="naSq8" style={{left:186,top:1172,width:11,height:10}}/>{text(210,1166,14,'T','naEx10 naNw')}{fseg('10-4h1',220,1166,43,2,'4h Tut')}{text(270,1167,41,'mir l','naEx10 naNw')}{fseg('10-4h2',318,1166,66,3,'4h leid')}{text(393,1166,240,'(b). Ich bin nicht von hier.','naEx10 naNw')}
  <div className="naTri8" style={{left:186,top:1198}}/>{text(210,1192,14,'T','naEx10 naNw')}{fseg('10-4i',220,1192,164,7,'4i Trotzdem')}{text(393,1193,150,'(c): Dankeschön.','naEx10 naNw')}
  {text(884,1199,90,'_ / 9 PUNKTE','naPkt10 naNw')}
  {check('10-4',845,1205,{'10-4a':'önnen','10-4b':'elfen','10-4c':'uche','10-4d':'ahren','10-4e':'ehen','10-4f1':'ehr','10-4f2':'ett','10-4g':'ragen','10-4h1':'ut','10-4h2':'eid','10-4i':'rotzdem'})}
  <div className="naTblBand" style={{left:178,top:1238,width:802,height:34}}/>
  {text(178,1245,120,'Wörter','naTblH naNw')}{text(352,1245,150,'Strukturen','naTblH naNw')}{text(519,1245,200,'Kommunikation','naTblH naNw')}
  <div className="naTblDot naDotR" style={{left:190,top:1280}}/>{text(224,1281,90,'0–5 Punkte','naTblT naNw')}
  <div className="naTblDot naDotR" style={{left:354,top:1280}}/>{text(388,1281,90,'0–5 Punkte','naTblT naNw')}
  <div className="naTblDot naDotR" style={{left:522,top:1281}}/>{text(556,1281,90,'0–4 Punkte','naTblT naNw')}
  <div className="naTblDot naDotY" style={{left:190,top:1314}}/>{text(224,1315,90,'6–8 Punkte','naTblT naNw')}
  <div className="naTblDot naDotY" style={{left:354,top:1314}}/>{text(388,1315,90,'6–7 Punkte','naTblT naNw')}
  <div className="naTblDot naDotY" style={{left:522,top:1315}}/>{text(556,1315,90,'5–7 Punkte','naTblT naNw')}
  <div className="naTblDot naDotG" style={{left:190,top:1348}}/>{text(224,1349,92,'9–11 Punkte','naTblT naNw')}
  <div className="naTblDot naDotG" style={{left:354,top:1348}}/>{text(388,1349,96,'8–10 Punkte','naTblT naNw')}
  <div className="naTblDot naDotG" style={{left:522,top:1349}}/>{text(556,1349,90,'8–9 Punkte','naTblT naNw')}
  {text(467,1382,230,'www.hueber.de/menschen/lernen','naWWW naNw')}
  <div className="naModul10" style={{left:0,top:1388,width:56,height:26}}>Modul 5</div>
  <div className="naText naFooter naNw" style={{left:62,top:1393,width:160}}>10{'  |  '}<span className="naFz">zehn</span></div>
 </>}
 {page==='11'&&<>
  {text(117,84,300,'LERNWORTSCHATZ','naHeadline naNw')}
  <div className="naRuleY9" style={{left:406,top:114,width:479}}/>
  <div className="naL13" style={{left:982,top:42,width:86,height:57}}>13</div>
  {badge9('1',114,166)}
  {text(155,162,560,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.','naInstr11 naNw')}
  {text(158,201,140,'In der Stadt','naVocH11 naNw')}
  {text(157,233,120,'Ampel die, -n','naVoc naNw')}
  {text(168,261,225,'CH: auch: Lichtsignal das, -e','naVocG naNw')}
  {text(158,285,120,'Bank die, -en','naVoc naNw')}
  {text(158,311,125,'Brücke die, -n','naVoc naNw')}
  {text(158,336,115,'Dom der, -e','naVoc naNw')}
  {text(158,362,115,'Hotel das, -s','naVoc naNw')}
  {text(157,388,115,'Mitte die, -n','naVoc naNw')}
  {text(168,413,130,'die Stadtmitte','naVoc naNw')}
  {text(158,439,80,'Plan der,','naVoc naNw')}{art('umlmark',239,444,17,12)}
  {text(168,465,125,'der Stadtplan','naVoc naNw')}
  {text(157,491,100,'Polizei die','naVoc naNw')}
  {text(158,517,75,'Post die','naVoc naNw')}
  {text(157,542,120,'Zentrum das,','naVoc naNw')}
  {text(168,570,75,'Zentren','naVoc naNw')}
  {text(155,614,180,'Wegbeschreibung','naVocH11 naNw')}
  {text(157,645,140,'Kilometer der, -','naVoc naNw')}
  {text(157,671,110,'Meter der, -','naVoc naNw')}
  {text(157,697,85,'Nähe die','naVoc naNw')}
  {text(168,723,110,'in der Nähe','naVoc naNw')}
  {text(157,749,100,'Weg der, -e','naVoc naNw')}
  {text(157,787,120,'ab·biegen, ist','naVoc naNw')}
  {text(168,813,95,'abgebogen','naVoc naNw')}
  {text(155,839,150,'beschreiben, hat','naVoc naNw')}
  {text(167,865,110,'beschrieben','naVoc naNw')}
  {text(156,890,160,'weiter·fahren, ist','naVoc naNw')}
  {text(161,914,145,'weitergefahren','naVoc naNw')}
  {text(156,942,115,'wenden, hat','naVoc naNw')}
  {text(167,966,90,'gewendet','naVoc naNw')}
  {text(157,993,150,'zurück·fahren, ist','naVoc naNw')}
  {text(168,1019,145,'zurückgefahren','naVoc naNw')}
  {text(157,1057,55,'fremd','naVoc naNw')}
  {text(156,1083,45,'links','naVoc naNw')}
  {text(168,1109,95,'nach links','naVoc naNw')}
  {text(157,1133,55,'rechts','naVoc naNw')}
  {text(168,1161,105,'nach rechts','naVoc naNw')}
  {text(542,202,300,'Sich entschuldigen und danken','naVocH11 naNw')}
  {text(542,233,60,'Ach so.','naVoc naNw')}
  {text(542,260,110,'Dankeschön!','naVoc naNw')}
  {text(542,285,100,'Bitte, gern.','naVoc naNw')}
  {text(552,313,270,'A/CH: Bitte, gern geschehen.','naVocG naNw')}
  {text(542,336,80,'Ja, bitte?','naVoc naNw')}
  {text(542,362,125,'Kein Problem.','naVoc naNw')}
  {text(542,388,70,'Schade.','naVoc naNw')}
  {text(542,419,40,'nett','naVoc naNw')}
  {text(553,439,90,'Sehr nett!','naVoc naNw')}
  {text(542,488,40,'Wo?','naVocH11 naVocHQ naNw')}
  {text(542,513,25,'an','naVoc naNw')}
  {text(542,539,30,'auf','naVoc naNw')}
  {text(542,565,60,'hinter','naVoc naNw')}
  {text(542,590,20,'in','naVoc naNw')}
  {text(542,616,60,'neben','naVoc naNw')}
  {text(542,642,45,'über','naVoc naNw')}
  {text(542,668,50,'unter','naVoc naNw')}
  {text(542,693,30,'vor','naVoc naNw')}
  {text(542,719,85,'zwischen','naVoc naNw')}
  {text(541,770,240,'Weitere wichtige Wörter','naVocH11 naNw')}
  {text(542,801,110,'Frage die, -n','naVoc naNw')}
  {text(542,827,135,'Moment der, -e','naVoc naNw')}
  {text(553,848,130,'Einen Moment!','naVoc naNw')}
  {text(542,890,140,'an·machen, hat','naVoc naNw')}
  {text(553,914,100,'angemacht','naVoc naNw')}
  {text(552,944,270,'A: ein·schalten, hat eingeschaltet','naVocG naNw')}
  {text(542,968,190,'finden, hat gefunden','naVoc naNw')}
  {text(542,993,175,'fragen, hat gefragt','naVoc naNw')}
  {text(542,1019,235,'helfen, du hilfst, er hilft,','naVoc naNw')}
  {text(545,1043,120,'hat geholfen','naVoc naNw')}
  {text(542,1071,120,'stimmen, hat','naVoc naNw')}
  {text(553,1098,90,'gestimmt','naVoc naNw')}
  {text(542,1133,50,'beide','naVoc naNw')}
  {text(553,1161,95,'die beiden','naVoc naNw')}
  {rl(327,251,190)}{rl(327,303,190)}{rl(327,328,190)}{rl(327,354,190)}{rl(327,380,190)}{rl(327,406,190)}{rl(327,431,190)}{rl(327,457,190)}{rl(327,483,190)}{rl(327,509,190)}{rl(327,535,190)}{rl(327,586,190)}{rl(327,663,190)}{rl(327,689,190)}{rl(327,715,190)}{rl(327,741,190)}{rl(327,766,190)}{rl(327,830,190)}{rl(327,882,190)}{rl(327,933,190)}{rl(327,985,190)}{rl(327,1036,190)}{rl(327,1075,190)}{rl(327,1101,190)}{rl(327,1127,190)}{rl(327,1153,190)}{rl(327,1178,190)}
  {rl(686,251,196)}{rl(686,278,196)}{rl(686,304,196)}{rl(686,354,196)}{rl(686,380,196)}{rl(686,406,196)}{rl(686,432,196)}{rl(686,458,196)}{rl(686,535,196)}{rl(686,561,196)}{rl(686,587,196)}{rl(686,612,196)}{rl(686,638,196)}{rl(686,663,196)}{rl(686,689,196)}{rl(686,715,196)}{rl(686,741,196)}{rl(686,818,196)}{rl(686,844,196)}{rl(686,870,196)}{rl(686,933,196)}{rl(739,985,143)}{rl(739,1010,142)}{rl(686,1063,196)}{rl(686,1114,196)}{rl(686,1153,196)}{rl(686,1178,196)}
  {rl(928,267,124)}{rl(928,396,124)}{rl(928,519,124)}{rl(928,662,124)}{rl(928,795,124)}{rl(928,922,124)}{rl(928,1069,124)}{rl(928,1211,124)}
  {art('art1',958,160,74,81)}{art('art2',961,304,79,64)}{art('art3',943,434,112,59)}
  {art('art4',964,557,66,78)}{art('art5',959,694,67,82)}{art('art6',929,832,129,66)}
  {art('art7',959,957,79,85)}{art('art8',951,1105,94,98)}{art('art9',954,1244,71,59)}
  <div className="naTipBar" style={{left:263,top:1213,width:331,height:4}}/>
  <div className="naTipTab" style={{left:263,top:1213,width:17,height:60}}><span>TIPP</span></div>
  <div className="naText naTipT naNw" style={{left:296,top:1226,width:290,fontWeight:700}}><Words text="Wie kann ich mir ein Wort merken?"/></div>
  {text(297,1253,240,'Überlegen Sie sich eine Hilfe.','naTipT naNw')}
  {art('handtext',618,1213,162,77)}{art('hand',742,1215,78,133)}
  {badge9('2',112,1323)}
  {text(155,1320,545,'Welche Wörter möchten Sie noch lernen? Notieren Sie.','naInstr11 naNw')}
  <div className="naModul9b" style={{left:1003,top:1393,width:68,height:19}}>Modul 5</div>
  <div className="naText naFooter naNw" style={{left:921,top:1388,width:80,whiteSpace:'pre'}}>elf{'  |  '}11</div>
 </>}
 </div><audio ref={player} className="naPlayer"/></div>;
}
