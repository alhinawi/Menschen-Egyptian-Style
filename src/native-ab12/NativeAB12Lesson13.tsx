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
 const rule=(x:number,y:number,w:number)=><div className="naRule" style={{left:x,top:y,width:w}}/>;
 const dot=(id:string,value:string,x:number,y:number,label:string,checkbox=false)=><input className="naDot" type={checkbox?'checkbox':'radio'} aria-label={label} name={key+'-'+id} checked={checkbox?values[id]==='true':values[id]===value} onChange={e=>set(id,checkbox?String(e.target.checked):value)} style={{left:x,top:y}}/>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="naCheck" data-check={id} style={{left:x,top:y}}><CheckButton onClick={()=>sr({...results,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(v=>normalize(v)===normalize(values[k]||(a==='false'?'false':''))))})}></CheckButton><output aria-live="polite">{id in results?(results[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const title=(n:string,x:number,y:number,w:number,t:string,cls='')=><div className={'naTitle '+cls} style={{left:x,top:y,width:w}}><b>{n}</b><Words text={t}/></div>;
 const kb=(x:number,y:number,t:string)=><div className="naKB naKBL" style={{left:x,top:y}}>{t}</div>;
 const side=(x:number,y:number,t:string)=><div className="naSide naSideL" style={{left:x,top:y}}>{t}</div>;
 const hand=(x:number,y:number,w:number,t:string)=><div className="naText naHand" style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const mw=(id:string,x:number,y:number,w:number,t:string)=><button className={'naW9'+(values[id]==='true'?' on':'')} style={{left:x,top:y,width:w}} aria-pressed={values[id]==='true'} aria-label={'Markieren: '+t} onClick={()=>set(id,values[id]==='true'?'false':'true')}>{t}</button>;
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
  {text(113,88,300,'TRAINING: HÖREN','naTrain naNw')}
  <div className="naRuleY9" style={{left:401,top:116,width:565}}/>
  <div className="naL13" style={{left:982,top:42,width:86,height:57}}>13</div>
  {audio('assets/ab-a12-cd2-track02.mp3',56,166,'2 02')}
  {title('1',111,169,700,'Welche Orte/Einrichtungen in der Stadt hören Sie? Markieren Sie.','naYB')}
  <div className="naBand9" style={{left:153,top:204,width:650,height:28}}/>
  <div className="naBand9" style={{left:153,top:232,width:195,height:27}}/>
  {mw('9-m-restaurant',158,208,88,'Restaurant')}{text(253,209,12,'|','naSep9 naNw')}
  <div className="naW9s" style={{left:258,top:208,width:74}}>Bahnhof</div>{text(325,209,12,'|','naSep9 naNw')}
  {mw('9-m-kino',341,208,44,'Kino')}{text(385,209,12,'|','naSep9 naNw')}
  {mw('9-m-dom',392,208,43,'Dom')}{text(436,209,12,'|','naSep9 naNw')}
  {mw('9-m-schwimmbad',441,208,111,'Schwimmbad')}{text(547,209,12,'|','naSep9 naNw')}
  {mw('9-m-post',554,208,48,'Post')}{text(606,209,12,'|','naSep9 naNw')}
  {mw('9-m-bruecke',612,208,58,'Brücke')}{text(674,209,12,'|','naSep9 naNw')}
  {mw('9-m-bank',681,208,43,'Bank')}{text(727,209,12,'|','naSep9 naNw')}
  {mw('9-m-polizei',732,208,61,'Polizei')}{text(796,209,12,'|','naSep9 naNw')}
  {mw('9-m-ampel',156,236,54,'Ampel')}{text(213,237,12,'|','naSep9 naNw')}
  {mw('9-m-hotel',221,236,47,'Hotel')}{text(270,237,12,'|','naSep9 naNw')}
  {mw('9-m-theater',276,236,67,'Theater')}
  <div className="naTipBar" style={{left:400,top:250,width:530,height:6}}/>
  <div className="naTipTab" style={{left:453,top:256,width:20,height:104}}>TIPP</div>
  {text(487,259,430,'Sie finden das Hören schwer? Achten Sie beim Hören','naTipT naNw')}
  {text(487,281,220,'auf die wichtigen Wörter.','naTipT naNw')}
  {text(487,304,380,'Wichtige Wörter in Wegbeschreibungen sind:','naTipT naNw')}
  {text(487,325,440,'– Einrichtungen in der Stadt: Bahnhof, Kino, Dom …','naTipT naNw')}
  {text(487,348,410,'– Richtungsangaben: rechts, links, geradeaus …','naTipT naNw')}
  {audio('assets/ab-a12-cd2-track02.mp3',56,397,'2 02')}
  {title('2',111,401,820,'Roland möchte Simon besuchen. Er steht am Bahnhof und fragt nach dem Weg.','naYB')}
  {text(156,430,810,'Hören Sie noch einmal und zeichnen Sie den Weg in den Stadtplan. Wo ist die Albachstraße?','naTitleTxt2 naNw')}
  {art('stadtplan',117,464,846,364)}
  {text(113,908,330,'TRAINING: AUSSPRACHE','naTrain2 naNw')}
  {text(445,910,300,'Diphthonge „ei“, „eu“, „au“','naTrainIt naNw')}
  <div className="naRuleY9" style={{left:744,top:931,width:220}}/>
  {audio('assets/ab-a12-cd2-track03.mp3',56,978,'2 03')}
  {title('1',111,980,340,'Hören Sie und sprechen Sie nach.','naYB')}
  <div className="naBand9" style={{left:153,top:1018,width:348,height:24}}/>
  <div className="naBand9" style={{left:153,top:1043,width:348,height:24}}/>
  <div className="naBand9" style={{left:153,top:1068,width:290,height:25}}/>
  {text(160,1020,340,'nein | beschreiben | Polizei | beide | vorbei','naWord9 naNw')}
  {text(159,1046,345,'ankreuzen | deutsch | Freund | neun | Euro','naWord9 naNw')}
  {text(159,1072,290,'Auto | auch | Frau | geradeaus | auf','naWord9 naNw')}
  {audio('assets/ab-a12-cd2-track05.mp3',523,980,'2 05')}
  {title('3',570,978,400,'Ergänzen Sie „au“, „ei“ oder „eu“.','naYB naYB21')}
  {text(614,1009,330,'Hören Sie dann und vergleichen Sie.','naTitleTxt2 naNw')}
  {text(612,1045,20,'a','naLet9')} {text(636,1045,14,'S','naS18 naNw')}{field('9-3a1',646,1046,34,'3a Seid')}{text(684,1045,90,'d ihr verh','naS18 naNw')}{field('9-3a2',772,1046,34,'3a verheiratet')}{text(810,1045,64,'ratet? – N','naS18 naNw')}{field('9-3a3',874,1046,34,'3a Nein')}{text(912,1045,24,'n,','naS18 naNw')}
  {text(637,1071,65,'nur Arb','naS18 naNw')}{field('9-3a4',702,1072,34,'3a Arbeitskollegen')}{text(740,1071,95,'tskollegen.','naS18 naNw')}
  {text(612,1097,20,'b','naLet9')} {text(636,1097,78,'Zur Poliz','naS18 naNw')}{field('9-3b1',714,1098,34,'3b Polizei')}{text(752,1097,140,'? Zuerst gerade','naS18 naNw')}{field('9-3b2',892,1098,34,'3b geradeaus')}{text(930,1097,60,'s und','naS18 naNw')}
  {text(637,1123,227,'dann am Hotel vorb','naS18 naNw')}{field('9-3b3',864,1124,34,'3b vorbei')}{text(902,1123,10,'.','naS18 naNw')}
  {text(612,1149,20,'c','naLet9')} {text(636,1149,110,'Was kostet das','naS18 naNw')}{field('9-3c1',746,1150,34,'3c Auto')}{text(784,1149,50,'to? –','naS18 naNw')}
  {text(637,1175,15,'N','naS18 naNw')}{field('9-3c2',634,1176,32,'3c Neunzehntausend')}{text(668,1175,83,'nzehnt','naS18 naNw')}{field('9-3c3',772,1176,34,'3c tausend')}{text(810,1175,48,'send','naS18 naNw')}{field('9-3c4',858,1176,34,'3c Euro')}{text(896,1175,40,'ro.','naS18 naNw')}
  {text(612,1201,20,'d','naLet9')} {text(636,1201,34,'Wie h','naS18 naNw')}{field('9-3d1',670,1202,34,'3d heißt')}{text(708,1201,84,'ßt das','naS18 naNw')}{field('9-3d2',792,1202,34,'3d auf')}{text(830,1201,32,'f D','naS18 naNw')}{field('9-3d3',864,1202,34,'3d Deutsch')}{text(902,1201,62,'tsch? –','naS18 naNw')}
  {text(636,1227,84,'Tut mir l','naS18 naNw')}{field('9-3d4',720,1228,34,'3d leid')}{text(758,1227,82,'d. Das w','naS18 naNw')}{field('9-3d5',840,1228,34,'3d weiß')}{text(878,1227,78,'ß ich','naS18 naNw')}{field('9-3d6',957,1228,34,'3d auch')}{text(995,1227,25,'ch','naS18 naNw')}
  {text(637,1253,50,'nicht.','naS18 naNw')}
  {check('9-3',830,1256,{'9-3a1':'ei','9-3a2':'ei','9-3a3':'ei','9-3a4':'ei','9-3b1':'ei','9-3b2':'au','9-3b3':'ei','9-3c1':'au','9-3c2':'eu','9-3c3':'au','9-3c4':'eu','9-3d1':'ei','9-3d2':'au','9-3d3':'eu','9-3d4':'ei','9-3d5':'ei','9-3d6':'au'})}
  {audio('assets/ab-a12-cd2-track04.mp3',56,1127,'2 04')}
  {title('2',111,1127,460,'Hören Sie noch einmal und ergänzen','naYB naYB23')}
  {text(155,1161,200,'Sie die Regel.','naTitleTxt2 naNw')}
  <div className="naRegelBar" style={{left:155,top:1195,width:465,height:4}}/>
  <div className="naRegelStrip" style={{left:155,top:1199,width:16,height:136}}>REGEL</div>
  {text(188,1201,430,'Man hört „ai“, man schreibt meistens:','naS18 naNw')}
  {field('9-2a',195,1214,135,'Regel ai')}
  {text(188,1251,430,'Man hört „oi“, man schreibt meistens:','naS18 naNw')}
  {field('9-2b',195,1264,135,'Regel oi')}
  {text(188,1301,430,'Man hört „au“ und schreibt auch:','naS18 naNw')}
  {field('9-2c',195,1314,135,'Regel au')}
  {check('9-2',195,1346,{'9-2a':'ei','9-2b':'eu|äu','9-2c':'au'})}
  {audio('assets/ab-a12-cd2-track06.mp3',543,1300,'2 06')}
  {text(614,1305,400,'Hören Sie noch einmal und sprechen Sie nach.','naTitleTxt2 naNw')}
  <div className="naText naFooter naNw" style={{left:905,top:1393,width:100}}>neun{'  |  '}<b>9</b></div>
  <div className="naModul9b" style={{left:1003,top:1393,width:68,height:19}}>Modul 5</div>
 </>}
 </div><audio ref={player} className="naPlayer"/></div>;
}
