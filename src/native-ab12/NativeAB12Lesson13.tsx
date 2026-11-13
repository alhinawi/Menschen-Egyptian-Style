import {CheckButton} from '../components/CheckButton';
import {PageImage} from '../components/PageImage';
import {useLayoutEffect,useRef,useState} from 'react';
import {usePageReset} from '../exercises/usePageReset';
import {LinedArea} from '../components/LinedArea';
import '../components/native-ab12.css';
import './native-ab12-l13.css';

function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\p{L}/u.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-word={w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text}>{w}</span>:w)}</>}
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\s+/g,' ');
const HEIGHTS:Record<string,number>={'6':1465,'7':1447,'8':1452,'9':1447,'10':1452,'11':1447,'12':1452,'13':1447,'14':1452,'16':1452};

export function NativeAB12Lesson13({page}:{page:string}){
 const W=1071,H=HEIGHTS[page]||1447;
 const root=useRef<HTMLDivElement>(null),player=useRef<HTMLAudioElement>(null);
 const [scale,ss]=useState(.6);const key='native-ab12-'+page;
 const [values,sv]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});
 const [results,sr]=useState<Record<string,boolean>>({});
 const [saved,sn]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=root.current!;const obs=new ResizeObserver(()=>ss(Math.min(el.clientWidth/W,(el.clientHeight-38)/H)));obs.observe(el);return ()=>obs.disconnect()},[W,H]);
 usePageReset(page,key,()=>{sv({});sr({});sn({})});
 const set=(id:string,v:string)=>{const n={...values,[id]:v};sv(n);localStorage.setItem(key,JSON.stringify(n))};
 const text=(x:number,y:number,w:number,t:string,cls='')=><div className={'naText '+cls} style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="naArt" src={`assets/book-crops/native-ab12-p${page}-${name}.png`} alt={'Originalillustration '+name} style={{left:x,top:y,width:w,height:h}}/>;
 const field=(id:string,x:number,y:number,w:number,label:string,cls='')=><input className={'naField '+cls} aria-label={label} data-native-field={id} style={{left:x,top:y,width:w}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>;
 const fseg=(id:string,x:number,y:number,w:number,n:number,label:string)=>{const g=5,s=(w-(n-1)*g)/n;return <input className="naField naFld9 naFldSeg" aria-label={label} data-native-field={id} style={{left:x,top:y,width:w,['--seg' as string]:s+'px'} as React.CSSProperties} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>};
 const rule=(x:number,y:number,w:number)=><div className="naRule" style={{left:x,top:y,width:w}}/>;
 const rl=(x:number,y:number,w:number)=><div className="naRule11" style={{left:x,top:y,width:w}}/>;
 const dot=(id:string,value:string,x:number,y:number,label:string,checkbox=false,cls='')=><input className={"naDot"+(cls?' '+cls:'')} type={checkbox?'checkbox':'radio'} aria-label={label} data-value={value} name={key+'-'+id} checked={checkbox?values[id]==='true':values[id]===value} onChange={e=>set(id,checkbox?String(e.target.checked):value)} style={{left:x,top:y}}/>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="naCheck" data-check={id} style={{left:x,top:y}}><CheckButton answers={answers} onClick={()=>sr({...results,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(v=>normalize(v)===normalize(values[k]||(a==='false'?'false':''))))})}></CheckButton><output aria-live="polite">{id in results?(results[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const title=(n:string,x:number,y:number,w:number,t:string,cls='')=><div className={'naTitle '+cls} style={{left:x,top:y,width:w}}><b>{n}</b><Words text={t}/></div>;
 const kb=(x:number,y:number,t:string)=><div className="naKB naKBL" style={{left:x,top:y}}>{t}</div>;
 const side=(x:number,y:number,t:string)=><div className="naSide naSideL" style={{left:x,top:y}}>{t}</div>;
 const hand=(x:number,y:number,w:number,t:string)=><div className="naText naHand" style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const mw=(id:string,t:string)=><button className={'naW9i'+(values[id]==='true'?' on':'')} aria-pressed={values[id]==='true'} aria-label={'Markieren: '+t} onClick={()=>set(id,values[id]==='true'?'false':'true')}>{t}</button>;
 const audio=(src:string,x:number,y:number,label:string,task?:string)=><button className="naAudio" data-task={task} style={{left:x,top:y}} aria-label={'Originalaudio '+label+' abspielen'} onClick={()=>{if(player.current){player.current.src=src;player.current.play().catch(()=>{})}}}>▶ {label}</button>;
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
  <LinedArea id="8-7" values={values} set={set} x={388} ruleYs={[520,545,570]} w={252} label="E-Mail: Wegbeschreibung" rules={false}/>
  {text(391,586,300,'Bis Samstag! Viele Grüße, Marina','naS16 naNw')}
  <div className="naCheck" data-check="8-7" style={{left:391,top:616}}><CheckButton onClick={()=>sn(o=>({...o,['8-7']:true}))}></CheckButton><output aria-live="polite">{saved['8-7']?'Gespeichert':''}</output></div>
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
  {audio('assets/ab-a12-cd2-track02.mp3',56,166,'2 02','1')}
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
  {audio('assets/ab-a12-cd2-track02.mp3',56,397,'2 02','2')}
  {badge9('2',112,400)}{text(156,401,790,'Roland möchte Simon besuchen. Er steht am Bahnhof und fragt nach dem Weg.','naEx9d naNw')}
  {text(156,428,810,'Hören Sie noch einmal und zeichnen Sie den Weg in den Stadtplan. Wo ist die Albachstraße?','naInst9 naNw')}
  {art('stadtplan',117,464,846,364)}
  {text(113,910,350,'TRAINING: AUSSPRACHE','naTrain naNw')}
  {text(493,912,240,'Diphthonge „ei“, „eu“, „au“','naTrainIt naNw')}
  <div className="naRuleY9" style={{left:744,top:931,width:220}}/>
  {audio('assets/ab-a12-cd2-track03.mp3',56,978,'2 03','1')}
  {badge9('1',112,981)}{text(156,981,340,'Hören Sie und sprechen Sie nach.','naYT naNw')}
  <div className="naBand9" style={{left:153,top:1018,width:343,height:25}}/>
  <div className="naBand9" style={{left:153,top:1044,width:343,height:25}}/>
  <div className="naBand9" style={{left:153,top:1070,width:282,height:25}}/>
  {text(160,1021,40,'nein','naWord9 naNw')}{text(201,1021,12,'|','naSep9 naNw')}{text(210,1021,98,'beschreiben','naWord9 naNw')}{text(311,1021,12,'|','naSep9 naNw')}{text(320,1021,55,'Polizei','naWord9 naNw')}{text(378,1021,12,'|','naSep9 naNw')}{text(386,1021,47,'beide','naWord9 naNw')}{text(436,1021,12,'|','naSep9 naNw')}{text(443,1021,52,'vorbei','naWord9 naNw')}
  {text(159,1047,86,'ankreuzen','naWord9 naNw')}{text(248,1047,12,'|','naSep9 naNw')}{text(256,1047,66,'deutsch','naWord9 naNw')}{text(325,1047,12,'|','naSep9 naNw')}{text(335,1047,57,'Freund','naWord9 naNw')}{text(395,1047,12,'|','naSep9 naNw')}{text(404,1047,43,'neun','naWord9 naNw')}{text(449,1047,12,'|','naSep9 naNw')}{text(458,1047,40,'Euro','naWord9 naNw')}
  {text(159,1072,42,'Auto','naWord9 naNw')}{text(203,1072,12,'|','naSep9 naNw')}{text(211,1072,41,'auch','naWord9 naNw')}{text(255,1072,12,'|','naSep9 naNw')}{text(265,1072,37,'Frau','naWord9 naNw')}{text(304,1072,12,'|','naSep9 naNw')}{text(312,1072,84,'geradeaus','naWord9 naNw')}{text(399,1072,12,'|','naSep9 naNw')}{text(407,1072,30,'auf','naWord9 naNw')}
  {audio('assets/ab-a12-cd2-track05.mp3',523,980,'2 05','3')}
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
  {audio('assets/ab-a12-cd2-track04.mp3',56,1127,'2 04','2')}
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
  {audio('assets/ab-a12-cd2-track06.mp3',543,1300,'2 06','3')}
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
 {page==='12'&&<>
  <div className="naBand12" style={{left:2,top:43,width:966,height:77}}/>
  {art('band-photo',0,43,372,77)}
  {text(428,60,510,'Wie findest du Ottos Haus?','naTitle12 naNw')}
  {text(69,189,50,'KB 2','naKB12 naNw')}
  <div className="naSide10" style={{left:88,top:231,height:41}}>WÖRTER</div>
  {text(69,512,50,'KB 3','naKB12 naNw')}
  <div className="naSide10" style={{left:88,top:556,height:41}}>WÖRTER</div>
  {text(69,771,50,'KB 4','naKB12 naNw')}
  <div className="naSide10" style={{left:88,top:809,height:66}}>STRUKTUREN</div>
  {text(69,1003,50,'KB 4','naKB12 naNw')}
  {art('dots',48,1028,60,18)}
  {text(69,1093,50,'KB 5','naKB12 naNw')}
  <div className="naSide10" style={{left:88,top:1138,height:68}}>STRUKTUREN</div>
  {badge9('1',110,182)}
  {text(150,182,330,'Haus und Garten. Ordnen Sie zu.','naYT naNw')}
  <div className="naBank12Bg" style={{left:154,top:220,width:454,height:23}}/>
  {text(157,221,38,'Haus','naBank12 naNw')}<div className="naPipe12" style={{left:205,top:224,height:18}}/>{text(210,221,53,'Garten','naBank12 naNw')}<div className="naPipe12" style={{left:273,top:224,height:18}}/>{text(279,221,54,'Garage','naBank12 naNw')}<div className="naPipe12" style={{left:342,top:224,height:18}}/>{text(346,221,53,'Treppe','naBank12 naNw')}<div className="naPipe12" style={{left:409,top:224,height:18}}/>{text(415,221,43,'Baum','naBank12 naNw')}<div className="naPipe12" style={{left:469,top:224,height:18}}/>{text(475,221,57,'Fenster','naBank12 naNw')}<div className="naPipe12" style={{left:542,top:224,height:18}}/>{text(547,221,53,'Balkon','naBank12 naNw')}<div className="naStrike10" style={{left:550,top:231,width:53,height:2}}/>
  {art('house',338,246,424,226)}
  {field('12-1a',154,282,186,'1a Haus-Teil links oben','naFld9')}
  {field('12-1b',154,337,186,'1b Haus-Teil links Mitte','naFld9')}
  {field('12-1c',154,396,186,'1c Haus-Teil links unten','naFld9')}
  {field('12-1d',762,244,187,'1d Haus-Teil rechts oben','naFld9')}
  <div className="naLine12" style={{left:753,top:310,width:196,height:1}}/>
  {art('balkon-hw',752,282,108,26)}
  {field('12-1e',762,338,187,'1e Haus-Teil rechts Mitte','naFld9')}
  {field('12-1f',762,397,187,'1f Haus-Teil rechts unten','naFld9')}
  {check('12-1',905,430,{'12-1a':'Fenster|das Fenster','12-1b':'Baum|der Baum','12-1c':'Garage|die Garage','12-1d':'Haus|das Haus','12-1e':'Treppe|die Treppe','12-1f':'Garten|der Garten'})}
  {badge9('2',110,505)}
  {text(150,505,430,'Wie heißen die Zimmer? Notieren Sie.','naYT naNw')}
  {text(154,546,20,'a','naLet9')}{text(178,546,452,'Hier stehen der Kühlschrank und hier kocht man:','naEx12 naNw')}{art('kueche-hw',620,548,55,20)}
  {text(154,571,20,'b','naLet9')}{text(178,571,330,'Die Kinder spielen und schlafen hier:','naEx12 naNw')}{field('12-2b',513,571,303,'2b Zimmer','naFld9')}
  {text(154,597,20,'c','naLet9')}{text(178,597,530,'Sie gehen ins Haus und kommen zuerst in dieses Zimmer:','naEx12 naNw')}{field('12-2c',177,622,302,'2c Zimmer','naFld9')}
  {text(154,649,20,'d','naLet9')}{text(178,649,700,'Hier können Sie fernsehen, lesen oder Freunde treffen. Oft stehen hier ein','naEx12 naNw')}
  {text(178,674,180,'Sofa und ein Sessel:','naEx12 naNw')}{field('12-2d',355,674,196,'2d Zimmer','naFld9')}
  {text(154,701,20,'e','naLet9')}{text(178,701,455,'In diesem Raum gibt es ein Bett und einen Schrank:','naEx12 naNw')}{field('12-2e',642,700,301,'2e Zimmer','naFld9')}
  {check('12-2',905,725,{'12-2b':'Kinderzimmer|das Kinderzimmer','12-2c':'Flur|der Flur','12-2d':'Wohnzimmer|das Wohnzimmer','12-2e':'Schlafzimmer|das Schlafzimmer'})}
  {badge9('3',110,764)}
  {text(150,764,480,'Antworten Sie mit dem Genitiv wie im Beispiel.','naYT naNw')}
  {text(154,804,20,'a','naLet9')}{text(178,804,395,'Wie findest du den Garten von Maximilian? –','naEx12 naNw')}
  {art('garten-line',587,822,140,4)}
  {art('garten-hw',586,805,160,18)}
  {text(730,804,150,'ist sehr schön.','naEx12 naNw')}
  {text(154,830,20,'b','naLet9')}{text(178,830,520,'Und magst du das Haus von Maximilian? – Nein, ich finde','naEx12 naNw')}{field('12-3b',697,830,263,'3b Genitiv','naFld9')}
  {text(178,855,180,'nicht so schön.','naEx12 naNw')}
  {text(154,881,20,'c','naLet9')}{text(178,881,375,'Wie heißt der Nachbar von Maximilian? –','naEx12 naNw')}{field('12-3c',554,882,308,'3c Genitiv','naFld9')}{text(868,881,90,'heißt Jan.','naEx12 naNw')}
  {text(154,907,20,'d','naLet9')}{text(178,907,485,'Ist die Nachbarin von Maximilian verheiratet? – Nein,','naEx12 naNw')}{field('12-3d',665,907,283,'3d Genitiv','naFld9')}
  {text(178,933,180,'ist geschieden.','naEx12 naNw')}
  {check('12-3',905,940,{'12-3b':'Maximilians Haus','12-3c':'Maximilians Nachbar','12-3d':'Maximilians Nachbarin'})}
  {badge9('4',110,996)}
  {text(152,996,445,'Schreiben Sie eigene Sätze zu Sophie wie in','naYT naYTb12 naNw')}{text(591,996,14,'3','naYT naYTb12 naNum12 naNw')}{text(610,996,210,'und tauschen Sie mit','naYT naYTb12 naNw')}
  {text(152,1022,580,'Ihrer Partnerin / Ihrem Partner. Sie/Er ergänzt den Genitiv.','naYT naYTb12 naNw')}
  {badge9('5',110,1087)}
  {text(150,1087,200,'Schreiben Sie.','naYT naNw')}
  {art('photos-be',292,1082,578,122)}
  {art('photos-a',140,1108,140,96)}
  {text(176,1204,230,'Was sucht Otto?','naHeadQ12 naNw')}
  {text(455,1204,260,'Wo sind Ottos Sachen?','naHeadQ12 naNw')}
  {text(155,1243,18,'a','naLet9')}
  <div className="naLine12" style={{left:176,top:1263,width:231,height:1}}/>
  {art('auto-hw-l',174,1235,84,27)}
  {text(155,1269,18,'b','naLet9')}{field('12-5lb',176,1268,231,'5b Was sucht Otto','naFld9')}
  {text(155,1295,18,'c','naLet9')}{field('12-5lc',176,1294,231,'5c Was sucht Otto','naFld9')}
  {text(155,1321,18,'d','naLet9')}{field('12-5ld',176,1320,231,'5d Was sucht Otto','naFld9')}
  {text(155,1347,18,'e','naLet9')}{field('12-5le',176,1346,231,'5e Was sucht Otto','naFld9')}
  <div className="naLine12" style={{left:457,top:1263,width:231,height:1}}/>
  {art('auto-hw-r',452,1235,84,27)}
  {field('12-5rb',457,1268,231,'5b Wo sind Ottos Sachen','naFld9')}
  {field('12-5rc',457,1294,231,'5c Wo sind Ottos Sachen','naFld9')}
  {field('12-5rd',457,1320,231,'5d Wo sind Ottos Sachen','naFld9')}
  {field('12-5re',457,1346,231,'5e Wo sind Ottos Sachen','naFld9')}
  {text(745,1244,180,'steht vor dem Café.','naChip12 naNw')}
  {text(745,1270,180,'sind auf dem Tisch.','naChip12 naNw')}
  {text(745,1296,180,'ist in der Tasche.','naChip12 naNw')}
  {text(745,1322,210,'ist neben dem Schlüssel.','naChip12 naNw')}
  {text(745,1348,200,'ist unter der Zeitung.','naChip12 naNw')}
  {check('12-5l',180,1372,{'12-5lb':'Seine Schlüssel','12-5lc':'Sein Handy','12-5ld':'Seine Brille','12-5le':'Seinen Kugelschreiber'})}
  {check('12-5r',457,1372,{'12-5rb':'Seine Schlüssel','12-5rc':'Sein Handy','12-5rd':'Seine Brille','12-5re':'Sein Kugelschreiber'})}
  <div className="naModul10" style={{left:0,top:1388,width:56,height:26}}>Modul 5</div>
  <div className="naText naFooter naNw" style={{left:84,top:1399,width:160,whiteSpace:'pre'}}>12{'  |  '}<span className="naFz">zwölf</span></div>
 </>}
 {page==='13'&&<>
  {text(116,78,250,'BASISTRAINING','naBase13 naNw')}
  {art('hdr-rule',368,109,634,8)}
  {art('tab14',987,39,84,78)}
  {badge9('6',117,163)}
  {text(74,168,40,'KB 6','naKB13 naNw')}
  <div className="naSide13" style={{left:88,top:203,height:78}}>STRUKTUREN</div>
  {text(160,163,140,'sein oder ihr?','naTitle13 naNw')}
  {text(129,200,18,'a','naLet13')}
  {text(160,201,125,'Ergänzen Sie.','naInstr13r naNw')}
  {art('photo-l',338,156,218,162)}
  {art('photo-r',624,178,192,150)}
  {text(160,302,155,'Das ist/sind ...','naEx13b naNw')}
  <div className="naLine13" style={{left:160,top:360,width:88,height:1}}/>
  {art('seine',156,347,33,17)}{text(201,343,60,'Brille','naEx12 naNw')}
  {field('13-6a-fahrrad',159,370,102,'6a Fahrrad','naFld9')}{text(268,368,80,'Fahrrad','naEx12 naNw')}
  {field('13-6a-auto',159,395,102,'6a Auto','naFld9')}{text(267,394,50,'Auto','naEx12 naNw')}
  {field('13-6a-kinder',447,346,90,'6a Kinder','naFld9')}{text(537,346,85,'e Kinder','naEx12 naNw')}
  {field('13-6a-schirm',447,371,89,'6a Schirm','naFld9')}{text(543,372,70,'Schirm','naEx12 naNw')}
  {field('13-6a-taschen',447,397,89,'6a Taschen','naFld9')}{text(537,398,90,'e Taschen','naEx12 naNw')}
  <div className="naLine13" style={{left:735,top:360,width:121,height:1}}/>
  {art('ihre',733,348,27,17)}{text(771,344,95,'Geldbörse','naEx12 naNw')}
  {field('13-6a-foto',734,372,98,'6a Fotoapparat','naFld9')}{text(839,374,105,'Fotoapparat','naEx12 naNw')}
  {check('13-6a',1000,398,{'13-6a-fahrrad':'sein','13-6a-auto':'ihr','13-6a-kinder':'sein','13-6a-schirm':'ihr','13-6a-taschen':'ihr','13-6a-foto':'sein'})}
  {text(74,451,40,'KB 6','naKB13 naNw')}
  <div className="naSide13" style={{left:80,top:490,height:76}}>STRUKTUREN</div>
  <div className="naSide13" style={{left:91,top:490,height:76}}>ENTDECKEN</div>
  {text(140,448,18,'b','naLet13')}
  <div className="naText naInstr13 naNw" style={{left:160,top:448,width:680}}>Notieren Sie die Nominative aus <span className="naBlu">a.</span> Und ergänzen Sie dann die Akkusative.</div>
  <div className="naBand13" style={{left:160,top:487,width:805,height:27}}/>
  {text(290,487,120,'Nominativ','naTh13b naNw')}{text(637,487,120,'Akkusativ','naTh13b naNw')}
  {art('icon1',288,514,27,34)}{art('icon2',461,513,35,34)}{art('icon3',631,516,28,34)}{art('icon4',800,513,35,36)}
  <div className="naLine13b" style={{left:160,top:543,width:805,height:1}}/><div className="naLine13b" style={{left:160,top:572,width:805,height:1}}/><div className="naLine13b" style={{left:160,top:601,width:805,height:1}}/><div className="naLine13b" style={{left:160,top:630,width:805,height:1}}/><div className="naLine13b" style={{left:160,top:660,width:805,height:1}}/>
  <div className="naLine13d" style={{left:268,top:487,width:1,height:27}}/><div className="naLine13e" style={{left:625,top:487,width:3,height:27}}/><div className="naLine13b" style={{left:283,top:514,width:1,height:146}}/><div className="naLine13b" style={{left:455,top:514,width:1,height:146}}/><div className="naLine13b" style={{left:626,top:514,width:1,height:146}}/><div className="naLine13b" style={{left:798,top:514,width:1,height:146}}/>
  {text(165,547,85,'maskulin','naRow13 naNw')}{text(165,577,62,'neutral','naRow13 naNw')}{text(165,606,66,'feminin','naRow13 naNw')}{text(165,636,50,'Plural','naRow13 naNw')}
  {art('ihr-schirm',288,545,88,23)}{art('ihren-schirm',634,547,106,23)}
  {field('13-6b-m2',460,546,150,'6b maskulin sein','naFld13')}{field('13-6b-m4',808,546,145,'6b maskulin seinen','naFld13')}
  {field('13-6b-n1',290,575,150,'6b neutral ihr','naFld13')}{field('13-6b-n2',460,575,150,'6b neutral sein','naFld13')}{field('13-6b-n3',640,575,145,'6b neutral ihr Akk','naFld13')}{field('13-6b-n4',808,575,145,'6b neutral sein Akk','naFld13')}
  {field('13-6b-f1',290,604,150,'6b feminin ihre','naFld13')}{field('13-6b-f2',460,604,150,'6b feminin seine','naFld13')}{field('13-6b-f3',640,604,145,'6b feminin ihre Akk','naFld13')}{field('13-6b-f4',808,604,145,'6b feminin seine Akk','naFld13')}
  {field('13-6b-p1',290,634,150,'6b Plural ihre','naFld13')}{field('13-6b-p2',460,634,150,'6b Plural ihre 2','naFld13')}{field('13-6b-p3',640,634,145,'6b Plural ihre Akk','naFld13')}{field('13-6b-p4',808,634,145,'6b Plural ihre Akk 2','naFld13')}
  {check('13-6b',1000,640,{'13-6b-m2':'sein Schirm','13-6b-m4':'seinen Schirm','13-6b-n1':'ihr Fahrrad','13-6b-n2':'sein Fahrrad','13-6b-n3':'ihr Fahrrad','13-6b-n4':'sein Fahrrad','13-6b-f1':'ihre Tasche','13-6b-f2':'seine Tasche','13-6b-f3':'ihre Tasche','13-6b-f4':'seine Tasche','13-6b-p1':'ihre Kinder','13-6b-p2':'seine Kinder','13-6b-p3':'ihre Kinder','13-6b-p4':'seine Kinder'})}
  {badge9('7',115,716)}
  {text(73,722,40,'KB 6','naKB13 naNw')}
  <div className="naSide13" style={{left:88,top:757,height:78}}>STRUKTUREN</div>
  {art('bruno',170,744,80,246)}
  <div className="naText naYT naNw" style={{left:159,top:717,width:430}}>Ergänzen Sie <em>sein/ihr</em> in der richtigen Form.</div>
  {art('sein-hw',914,762,31,15)}
  {text(293,758,662,'Das ist Bruno. Bruno wohnt genau wie Otto und Vanilla in Glückstadt.','naPara13a naNw')}
  {text(293,782,638,'(a) Haus liegt neben Ottos Haus. Er ist geschieden, aber er wohnt nicht','naPara13 naNw')}
  {text(292,808,293,'allein. In dem Haus wohnt auch','naPara13 naNw')}{field('13-7b',587,809,103,'7b','naFld9')}{text(697,808,226,'(b) neue Partnerin Mia. Mia','naPara13 naNw')}
  {text(292,834,149,'hat zwei Kinder.','naPara13 naNw')}{field('13-7c',449,835,102,'7c','naFld9')}{text(559,834,391,'(c) Tochter heißt Sandra und ist 8 Jahre alt','naPara13 naNw')}
  {text(292,860,36,'und','naPara13 naNw')}{field('13-7d',331,861,102,'7d','naFld9')}{text(440,860,478,'(d) Sohn heißt Mark und ist 4 Jahre alt. Sandra und','naPara13 naNw')}
  {field('13-7e',291,886,95,'7e','naFld9')}{text(382,885,525,'(e) Bruder wohnen im ersten Stock. Bruno liebt besonders','naPara13 naNw')}
  {field('13-7f',291,911,101,'7f','naFld9')}{text(400,911,411,'(f) Arbeitszimmer im Erdgeschoss. Dort steht','naPara13 naNw')}{field('13-7g',811,912,102,'7g','naFld9')}{text(918,911,30,'(g)','naPara13 naNw')}
  {text(292,938,623,'Computer. Er surft gern im Internet und spielt gern Computerspiele.','naPara13 naNw')}
  {field('13-7h',291,963,101,'7h','naFld9')}{text(400,963,514,'(h) Partnerin ist gern im Garten. Sie findet Computerspiele','naPara13 naNw')}
  {text(292,989,226,'langweilig. Aber sie liebt','naPara13 naNw')}{field('13-7i',522,990,102,'7i','naFld9')}{text(628,989,129,'(i) Garten und','naPara13 naNw')}{field('13-7j',761,990,102,'7j','naFld9')}{text(871,989,103,'(j) Blumen.','naPara13 naNw')}
  {check('13-7',1000,1005,{'13-7b':'seine','13-7c':'Ihre','13-7d':'ihr','13-7e':'ihr','13-7f':'sein','13-7g':'sein','13-7h':'Seine','13-7i':'ihren','13-7j':'ihre'})}
  {art('ex8icon',71,1093,33,32)}
  {badge9('8',114,1063)}
  {text(72,1069,40,'KB 6','naKB13 naNw')}
  <div className="naSide13" style={{left:88,top:1125,height:78}}>STRUKTUREN</div>
  {text(159,1064,300,'Ergänzen und vergleichen Sie.','naYT naNw')}
  <div className="naBand13" style={{left:157,top:1100,width:824,height:53}}/>
  <div className="naLine13f" style={{left:443,top:1100,width:2,height:53}}/><div className="naLine13f" style={{left:720,top:1100,width:2,height:53}}/>{text(166,1115,70,'Deutsch','naTh13 naNw')}{text(452,1116,75,'Englisch','naTh13 naNw')}{text(729,1106,195,'Meine Sprache oder','naTh13s naNw')}{text(728,1124,160,'andere Sprachen','naTh13s naNw')}
  {text(166,1168,90,'Nominativ','naSub13 naNw')}{text(306,1168,85,'Akkusativ','naSub13 naNw')}{text(453,1160,90,'Nominativ','naSub13 naNw')}{text(592,1160,85,'Akkusativ','naSub13 naNw')}{text(729,1175,90,'Nominativ','naSub13 naNw')}{text(858,1177,85,'Akkusativ','naSub13 naNw')}
  {text(166,1187,120,'Das ist/sind ...','naCell13 naNw')}{text(306,1187,135,'Sie / Er sucht ...','naCell13 naNw')}
  {text(452,1180,120,'This is / These','naSub13 naNw')}{text(462,1205,60,'are ...','naSub13 naNw')}{text(592,1180,95,'She / He is','naSub13 naNw')}{text(603,1205,110,'looking for ...','naSub13 naNw')}
  {art('ihr8',166,1231,26,19)}<div className="naLine13" style={{left:170,top:1250,width:54,height:1}}/>{text(230,1233,60,'Schirm','naCell13 naNw')}
  {art('ihren8',307,1231,41,19)}<div className="naLine13" style={{left:311,top:1250,width:53,height:1}}/>{text(369,1233,60,'Schirm','naCell13 naNw')}
  {text(452,1234,105,'her umbrella','naCell13 naNw')}{text(592,1234,105,'her umbrella','naCell13 naNw')}
  {art('s2n',159,1257,17,22)}{field('13-8-2n',172,1261,51,'8 Auto Nominativ','naFld9')}{text(229,1260,50,'Auto','naCell13 naNw')}
  {art('s2a',300,1257,17,22)}{field('13-8-2a',313,1261,51,'8 Auto Akkusativ','naFld9')}{text(370,1261,45,'Auto','naCell13 naNw')}
  {text(452,1263,60,'his car','naCell13 naNw')}{text(592,1263,60,'his car','naCell13 naNw')}
  {art('i3n',159,1283,17,27)}{field('13-8-3n',172,1290,51,'8 Brille Nominativ','naFld9')}{text(229,1292,50,'Brille','naCell13 naNw')}
  {art('i3a',300,1283,17,27)}{field('13-8-3a',313,1290,51,'8 Brille Akkusativ','naFld9')}{text(370,1290,50,'Brille','naCell13 naNw')}
  {text(451,1293,90,'her glasses','naCell13 naNw')}{text(592,1293,90,'her glasses','naCell13 naNw')}
  {art('s4n',158,1315,26,22)}{field('13-8-4n',172,1319,51,'8 Kinder Nominativ','naFld9')}{text(229,1321,60,'Kinder','naCell13 naNw')}
  {art('s4a',300,1315,21,22)}{field('13-8-4a',313,1319,51,'8 Kinder Akkusativ','naFld9')}{text(370,1321,60,'Kinder','naCell13 naNw')}
  {text(451,1322,105,'his children','naCell13 naNw')}{text(592,1322,105,'his children','naCell13 naNw')}
  <div className="naLine13c" style={{left:723,top:1227,width:258,height:1}}/><div className="naLine13c" style={{left:723,top:1256,width:258,height:1}}/><div className="naLine13c" style={{left:723,top:1286,width:258,height:1}}/><div className="naLine13c" style={{left:723,top:1315,width:258,height:1}}/><div className="naLine13c" style={{left:723,top:1344,width:258,height:1}}/>
  <div className="naLine13c" style={{left:723,top:1144,width:1,height:201}}/><div className="naLine13c" style={{left:852,top:1144,width:1,height:201}}/><div className="naLine13c" style={{left:980,top:1144,width:1,height:201}}/>
  {field('13-8-1mn',729,1229,116,'8 Meine Sprache 1 Nominativ','naFld13')}{field('13-8-1ma',858,1229,116,'8 Meine Sprache 1 Akkusativ','naFld13')}
  {field('13-8-2mn',729,1258,116,'8 Meine Sprache 2 Nominativ','naFld13')}{field('13-8-2ma',858,1258,116,'8 Meine Sprache 2 Akkusativ','naFld13')}
  {field('13-8-3mn',729,1288,116,'8 Meine Sprache 3 Nominativ','naFld13')}{field('13-8-3ma',858,1288,116,'8 Meine Sprache 3 Akkusativ','naFld13')}
  {field('13-8-4mn',729,1317,116,'8 Meine Sprache 4 Nominativ','naFld13')}{field('13-8-4ma',858,1317,116,'8 Meine Sprache 4 Akkusativ','naFld13')}
  {check('13-8',1000,1345,{'13-8-2n':'ein|sein','13-8-2a':'ein|sein','13-8-3n':'hre|ihre','13-8-3a':'hre|ihre','13-8-4n':'eine|seine','13-8-4a':'eine|seine'})}
  <div className="naModul9b" style={{left:1003,top:1393,width:68,height:19}}>Modul 5</div>
  <div className="naText naFooter naNw" style={{left:869,top:1390,width:125,whiteSpace:'pre'}}>dreizehn{'  |  '}13</div>
 </>}
 {page==='14'&&<>
  {art('hdr-title',106,86,255,32)}
  {art('hdr-rule',358,109,610,10)}
  {badge9('9',111,164)}
  {text(153,162,320,'Schreiben Sie ein Gespräch.','naYT naNw')}
  {text(69,168,40,'KB 6','naKB13 naNw')}
  <div className="naSide13" style={{left:81,top:205}}>KOMMUNIKATION</div>
  {text(153,203,20,'a','naLet14')}{text(177,203,420,'finden / das / Sofa / Wie / du / ?','naCue14 naNw')}
  <div className="naTri8" style={{left:176,top:236}}/>{art('hw-wie',194,228,200,28)}
  {text(153,255,20,'b','naLet14')}{text(177,255,420,'aussehen / toll / Sofa / Das / .','naCue14 naNw')}
  <div className="naSq8" style={{left:176,top:288}}/>{field('14-9b',202,281,750,'9b Antwort','naFld14')}
  {text(153,306,20,'c','naLet14')}{text(177,306,460,'finden / Sessel / du / wie / Und / den / ?','naCue14 naNw')}
  <div className="naSq8" style={{left:176,top:340}}/>{field('14-9c',202,333,750,'9c Antwort','naFld14')}
  {text(153,358,20,'d','naLet14')}{text(177,358,460,'mögen / ich / Den Sessel / gar nicht / .','naCue14 naNw')}
  <div className="naTri8" style={{left:175,top:391}}/>{field('14-9d',202,385,750,'9d Antwort','naFld14')}
  {text(153,410,20,'e','naLet14')}{text(177,410,460,'Ich / toll / finden / den Sessel / .','naCue14 naNw')}
  <div className="naSq8" style={{left:175,top:443}}/>{field('14-9e',202,437,750,'9e Antwort','naFld14')}
  {check('14-9',1010,437,{'14-9b':'Das Sofa sieht toll aus','14-9c':'Und wie findest du den Sessel','14-9d':'Den Sessel mag ich gar nicht|Ich mag den Sessel gar nicht','14-9e':'Ich finde den Sessel toll'})}
  {badge9('10',110,500)}
  {text(152,498,620,'Welche Wörter aus Wohnungsanzeigen sind hier versteckt?','naYT naNw')}
  {text(153,525,340,'Markieren und ergänzen Sie.','naInstr14 naNw')}
  {text(67,504,40,'KB 8','naKB13 naNw')}
  <div className="naSide13" style={{left:77,top:540}}>WÖRTER</div>
  {art('grid',146,560,720,60)}
  {text(152,632,20,'a','naLet14')}{art('hw-quad',640,630,122,26)}{text(176,630,470,'Frau Gruber hat ein Haus. Es ist sehr groß. Es hat 150','naSent14 naSent14a naNw')}
  {text(152,659,20,'b','naLet14')}{text(176,655,600,'Frau Gruber braucht nicht alle Zimmer. Die Zimmer im ersten Stock','naSent14 naNw')}{field('14-10b',782,657,124,'10b Wort','naFld14')}{text(925,655,40,'sie.','naSent14 naNw')}
  {text(152,685,20,'c','naLet14')}{text(176,681,550,'In den Zimmern stehen auch Möbel. Sie vermietet die Zimmer','naSent14 naNw')}{field('14-10c',731,683,200,'10c Wort','naFld14')}{text(935,681,15,'.','naSent14 naNw')}
  {text(152,710,20,'d','naLet14')}{text(175,706,700,'Im letzten Jahr hat Fritzi dort gewohnt. Er mag die Wohnung und findet seine','naSent14 naNw')}
  {field('14-10d',174,732,206,'10d Wort','naFld14')}{text(386,730,220,'Frau Gruber sehr nett.','naSent14 naNw')}
  {text(152,764,20,'e','naLet14')}{text(173,760,560,'Jetzt sind die Zimmer frei. Frau Gruber sucht einen Mieter. Die','naSent14 naNw')}{field('14-10e',738,761,200,'10e Wort','naFld14')}
  {text(174,784,320,'steht in der Osttiroler Zeitung.','naSent14 naNw')}
  {text(152,811,20,'f','naLet14')}{text(175,809,30,'Die','naSent14 naNw')}{field('14-10f',208,810,206,'10f Wort','naFld14')}{text(420,808,320,'für die Zimmer ist nicht sehr hoch.','naSent14 naNw')}
  {text(152,842,20,'g','naLet14')}{text(175,838,95,'Der Mieter','naSent14 naNw')}{field('14-10g1',274,836,206,'10g Wort 1','naFld14')}{text(486,834,170,'noch 50,- Euro für','naSent14 naNw')}{field('14-10g2',656,838,206,'10g Wort 2','naFld14')}{text(864,834,12,',','naSent14 naNw')}
  {field('14-10g3',173,861,207,'10g Wort 3','naFld14')}{text(385,858,30,'und','naSent14 naNw')}{field('14-10g4',425,862,175,'10g Wort 4','naFld14')}{text(604,858,12,'.','naSent14 naNw')}
  {check('14-10',1010,862,{'14-10b':'vermietet','14-10c':'möbliert','14-10d':'Vermieterin','14-10e':'Anzeige','14-10f':'Miete','14-10g1':'bezahlt','14-10g2':'Licht|Wasser|Müll','14-10g3':'Licht|Wasser|Müll','14-10g4':'Licht|Wasser|Müll'})}
  {badge9('11',107,926)}
  {text(151,925,580,'Hören Sie und kreuzen Sie an. Welche Anzeige passt?','naYT naNw')}
  {text(65,930,40,'KB 8','naKB13 naNw')}
  <div className="naSide13" style={{left:75,top:988}}>HÖREN</div>
  {audio('assets/ab-a12-cd2-track07.mp3',52,955,'2 07','11')}
  {art('card1',148,968,396,136)}{art('card2',558,968,362,132)}
  {dot('14-11','a1',166,979,'Anzeige 1',false,'naDotD')}{dot('14-11','a2',568,982,'Anzeige 2',false,'naDotD')}
  {check('14-11',1010,1080,{'14-11':'a2'})}
  {badge9('12',106,1158)}
  {text(150,1157,640,'Hören Sie noch einmal und kreuzen Sie an. Was ist richtig?','naYT naNw')}
  {text(64,1163,40,'KB 8','naKB13 naNw')}
  <div className="naSide13" style={{left:74,top:1200}}>HÖREN</div>
  {audio('assets/ab-a12-cd2-track07.mp3',52,1181,'2 07','12')}
  {text(149,1198,20,'a','naLet14')}{text(173,1198,300,'Die Wohnung ist','naSent14 naNw')}{dot('14-12a','möbliert',474,1198,'möbliert')}{text(498,1198,90,'möbliert.','naSent14 naNw')}{dot('14-12a','leer',624,1198,'leer')}{text(649,1198,60,'leer.','naSent14 naNw')}
  {text(148,1223,20,'b','naLet14')}{text(173,1223,240,'Dalva findet den Balkon','naSent14 naNw')}{dot('14-12b','super',474,1224,'super')}{text(499,1223,60,'super.','naSent14 naNw')}{dot('14-12b','nicht so toll',624,1224,'nicht so toll')}{text(649,1223,120,'nicht so toll.','naSent14 naNw')}
  {text(148,1249,20,'c','naLet14')}{text(173,1249,260,'Das Schlafzimmer ist nicht','naSent14 naNw')}{dot('14-12c','groß',474,1250,'groß')}{text(498,1249,60,'groß.','naSent14 naNw')}{dot('14-12c','klein',624,1250,'klein')}{text(649,1249,60,'klein.','naSent14 naNw')}
  {text(148,1275,20,'d','naLet14')}{text(172,1275,280,'Neben dem Wohnzimmer ist','naSent14 naNw')}{dot('14-12d','die küche',474,1276,'die Küche')}{text(499,1275,100,'die Küche.','naSent14 naNw')}{dot('14-12d','das bad',624,1276,'das Bad')}{text(648,1275,80,'das Bad.','naSent14 naNw')}
  {check('14-12',1010,1276,{'14-12a':'leer','14-12b':'super','14-12c':'groß','14-12d':'die küche'})}
  <div className="naModul10" style={{left:0,top:1394,width:72,height:23,lineHeight:'23px',background:'#ded6b0',fontWeight:400}}>Modul 5</div>
  <div className="naText naFooter naNw" style={{left:78,top:1396,width:160,whiteSpace:'pre'}}><b>{'14  |  '}</b><span className="naFz14">vierzehn</span></div>
 </>}
 {page==='15'&&<>
  {art('hdr-lesen',118,86,275,30)}
  {art('hdr-rule1',396,106,589,8)}
  {art('tab14',988,36,83,78)}
  {badge9('1',117,163)}
  {text(164,162,745,'Lesen Sie die E-Mail und notieren Sie: Was für eine Wohnung sucht Stefan?','naYT naNw')}
  {art('hand-wohnung',182,212,114,34)}
  {art('hand-groesse',182,236,67,29)}{field('15-1a',265,230,148,'Größe')}{art('h-zimmer',415,236,66,22)}
  {art('hand-miete',182,262,64,38)}{field('15-1b',265,256,148,'Miete')}{art('h-euro',414,262,25,22)}
  {art('hand-abwann',182,288,78,25)}{field('15-1c',265,281,148,'Ab wann')}
  {check('15-1',1010,428,{'15-1a':'3-4|3 bis 4','15-1b':'1000','15-1c':'1. April'})}
  {text(550,223,462,'Liebe Leute! Hilfe!!!','naMailS15 naNw')}
  {text(550,243,462,'Wir suchen dringend eine 3 bis 4-Zimmer-Wohnung (ca. 100 m²)','naMailS15 naNw')}
  {text(550,268,462,'ab 1. April. Die Wohnung sollte maximal 1000 Euro inkl. Neben-','naMailS15 naNw')}
  {text(550,291,462,'kosten kosten. Hat jemand einen Tipp? Dann meldet Euch doch','naMailS15 naNw')}
  {text(550,319,462,'bitte so schnell wie möglich.','naMailS15 naNw')}
  {text(550,342,300,'Grüße von Stefan','naMailS15 naNw')}
  {art('tipp',697,345,310,78)}
  {badge9('2',120,406)}
  {text(164,404,320,'Was antworten Stefans Freunde?','naYT naNw')}
  {text(130,445,16,'a','naLet15')}
  {text(193,444,745,'Lesen Sie und markieren Sie die wichtigen Informationen. Ergänzen Sie dann die Tabelle.','naInstrB15 naNw')}
  {art('note1',149,466,452,185)}
  {art('sms',629,466,287,171)}
  {art('circ3',238,623,33,33)}
  {text(276,655,702,'Lieber Stefan,','naChris15 naNw')}
  {text(276,683,702,'ich habe den ultimativen Tipp für Dich! Die Nachbarn von meiner Schwester ziehen nach England','naChris15 naNw')}
  {text(276,705,702,'und suchen dringend einen Nachmieter zum 1. April. Tolle 4-Zimmer-Wohnung mit Südbalkon.','naChris15 naNw')}
  {text(276,731,702,'Die Wohnung kostet nur 700 € + Nebenkosten. Ruf meine Schwester am besten heute noch an.','naChris15 naNw')}
  {text(276,750,200,'LG Chris','naChris15 naNw')}
  <div className="naBand15" style={{left:164,top:806,width:844,height:31}}/>
  <div className="naLine15" style={{left:163,top:836,width:845,height:1}}/><div className="naLine15" style={{left:163,top:865,width:845,height:1}}/><div className="naLine15" style={{left:163,top:895,width:845,height:1}}/><div className="naLine15" style={{left:163,top:924,width:845,height:1}}/>
  <div className="naLine15" style={{left:163,top:806,width:1,height:119}}/><div className="naLine15" style={{left:355,top:806,width:1,height:119}}/><div className="naLine15" style={{left:601,top:806,width:1,height:119}}/><div className="naLine15" style={{left:796,top:806,width:1,height:119}}/><div className="naLine15" style={{left:1007,top:806,width:1,height:119}}/>
  {text(362,810,240,'Wohnung 1 (Notizzettel)','naTh15 naNw')}{text(609,810,190,'Wohnung 2 (SMS)','naTh15 naNw')}{text(804,810,208,'Wohnung 3 (E-Mail)','naTh15 naNw')}
  {text(171,840,180,'Größe?','naTd15 naNw')}{text(171,870,180,'Miete pro Monat?','naTd15 naNw')}{text(171,900,180,'Ab wann?','naTd15 naNw')}
  {art('slash',464,869,16,26)}
  {text(131,946,16,'b','naLet15')}
  {text(163,947,450,'Welche Wohnung passt am besten? Kreuzen Sie an.','naInstrB15 naNw')}
  {text(163,986,95,'Wohnung','naMail15 naNw')}
  {dot('15-2b','1',261,989,'Wohnung 1')}{text(285,986,14,'1','naMail15 naNw')}
  {dot('15-2b','2',316,989,'Wohnung 2')}{text(342,986,14,'2','naMail15 naNw')}
  {dot('15-2b','3',375,989,'Wohnung 3')}{text(400,986,14,'3','naMail15 naNw')}
  {check('15-2b',1010,986,{'15-2b':'3'})}
  {art('hdr-aus',118,1057,602,32)}
  {art('hdr-rule2',722,1079,253,6)}
  {badge9('1',121,1129)}
  {text(164,1127,300,'Ergänzen Sie den Plural.','naYT naNw')}
  <div className="naBand15" style={{left:164,top:1163,width:244,height:30}}/><div className="naBand15" style={{left:415,top:1163,width:238,height:30}}/>
  <div className="naLine15" style={{left:163,top:1194,width:492,height:1}}/><div className="naLine15" style={{left:163,top:1224,width:492,height:1}}/><div className="naLine15" style={{left:163,top:1253,width:492,height:1}}/><div className="naLine15" style={{left:163,top:1278,width:492,height:1}}/>
  <div className="naLine15" style={{left:163,top:1163,width:1,height:115}}/><div className="naLine15" style={{left:269,top:1163,width:1,height:115}}/><div className="naLine15" style={{left:409,top:1163,width:1,height:115}}/><div className="naLine15" style={{left:415,top:1163,width:1,height:115}}/><div className="naLine15" style={{left:514,top:1163,width:1,height:115}}/><div className="naLine15" style={{left:654,top:1163,width:1,height:115}}/>
  <div className="naText naTh15b naNw" style={{left:171,top:1172,width:70}}>a <span className="naArr15"></span> ä</div><div className="naText naTh15b naNw" style={{left:424,top:1172,width:84}}>au <span className="naArr15"></span> äu</div>
  {text(171,1201,95,'das Bad','naTd15 naNw')}{text(277,1201,30,'die','naTd15 naNw')}{field('15-a1-bad',305,1191,95,'Plural Bad')}
  {text(423,1201,90,'das Haus','naTd15 naNw')}{text(522,1201,30,'die','naTd15 naNw')}{field('15-a1-haus',555,1191,95,'Plural Haus')}
  {text(171,1231,95,'der Wald','naTd15 naNw')}{text(277,1231,30,'die','naTd15 naNw')}{field('15-a1-wald',305,1221,95,'Plural Wald')}
  {text(423,1231,90,'der Baum','naTd15 naNw')}{text(522,1231,30,'die','naTd15 naNw')}{field('15-a1-baum',555,1221,95,'Plural Baum')}
  {text(171,1260,95,'der Garten','naTd15 naNw')}{text(277,1260,30,'die','naTd15 naNw')}{field('15-a1-garten',305,1250,95,'Plural Garten')}
  {text(423,1260,90,'der Raum','naTd15 naNw')}{text(522,1260,30,'die','naTd15 naNw')}{field('15-a1-raum',555,1250,95,'Plural Raum')}
  {check('15-a1',670,1255,{'15-a1-bad':'Bäder','15-a1-wald':'Wälder','15-a1-garten':'Gärten','15-a1-haus':'Häuser','15-a1-baum':'Bäume','15-a1-raum':'Räume'})}
  {audio('assets/ab-a12-cd2-track08.mp3',62,1327,'2 08','2')}
  {badge9('2',121,1322)}
  {text(165,1320,665,'Hören Sie die Wörter aus 1 und sprechen Sie nach.','naYT naNw')}
  {audio('assets/ab-a12-cd2-track09.mp3',672,1134,'2 09','3')}
  {badge9('3',720,1128)}
  {text(766,1127,245,'Hören Sie das Gedicht','naYT naNw')}
  {text(766,1153,245,'und sprechen Sie dann.','naYT naNw')}
  {text(766,1192,160,'Mein Traumhaus','naMail15 naNw')}
  {text(766,1218,160,'viele Räume,','naMail15 naNw')}
  {text(766,1246,160,'zwei Bäder','naMail15 naNw')}
  {text(766,1271,160,'und Aufzug,','naMail15 naNw')}
  {text(766,1297,160,'im Garten','naMail15 naNw')}
  {text(766,1320,160,'Bäume.','naMail15 naNw')}
  {text(766,1347,160,'Alles ganz neu!','naMail15 naNw')}
  <div className="naModul10" style={{left:1010,top:1389,width:61,height:17,lineHeight:'17px',background:'#dfd6af',fontWeight:400}}>Modul 5</div>
  <div className="naText naFooter naNw" style={{left:870,top:1388,width:127,whiteSpace:'pre'}}><span className="naFz15">{'fünfzehn  |  15'}</span></div>
 </>}
 {page==='16'&&<>
  {art('hdr-test',108,80,92,40)}
  <div className="naRule16" style={{left:187,top:110,width:783,height:3}}/>
  {badge9('1',115,162)}
  {text(158,160,500,'Markieren Sie die Wörter und ergänzen Sie.','naYT naNw')}
  <div className="naSide13" style={{left:86,top:207,height:47}}>WÖRTER</div>
  <div className="naText naSnake16 naNw" style={{left:158,top:202,width:812}}>SCHLAFZIMMERWOHNUNGTOILETTEKINDERZIMMERGARTEN<span className="naHl16">ERDGESCHOSS</span>WOHNZIMMER</div>
  {text(157,238,812,'„Ich bin Lena Peterson. Ich wohne mit meiner Familie in der Blumenstraße 44, im','naMail16 naNw')}
  {art('hand-erd',152,266,98,30)}
  {text(253,263,140,'(a). So sieht die','naMail16 naNw')}{field('16-1b',399,260,173,'Lücke 1b')}{text(580,263,390,'(b) aus: Links vom Flur ist die Küche, das','naMail16 naNw')}
  {text(157,290,70,'Bad mit','naMail16 naNw')}{field('16-1c',232,285,180,'Lücke 1c')}{text(420,290,90,'(c) und das','naMail16 naNw')}{field('16-1d',518,287,182,'Lücke 1d')}{text(708,290,262,'(d) von meinen Eltern. Rechts','naMail16 naNw')}
  {text(157,316,140,'vom Flur ist das','naMail16 naNw')}{field('16-1e',302,312,182,'Lücke 1e')}{text(492,316,476,'(e). Dort stehen eine Couch, zwei Sessel, ein Bücherre-','naMail16 naNw')}
  {text(156,342,340,'gal und ein Fernseher. Daneben ist das','naMail16 naNw')}{field('16-1f',502,339,213,'Lücke 1f')}{text(723,342,232,'(f), hier schlafen mein Bruder','naMail16 naNw')}
  {text(157,367,360,'Manuel und ich. Hinter dem Haus ist ein','naMail16 naNw')}{field('16-1g',524,365,181,'Lücke 1g')}{text(713,367,206,'(g) mit vielen Bäumen.“','naMail16 naNw')}
  {text(884,406,90,'_ / 6 PUNKTE','naPkt10 naNw')}
  {check('16-1',620,166,{'16-1b':'Wohnung','16-1c':'Toilette','16-1d':'Schlafzimmer','16-1e':'Wohnzimmer','16-1f':'Kinderzimmer','16-1g':'Garten'})}
  {badge9('2',115,435)}
  {text(157,432,520,'Ergänzen Sie sein und ihr in der richtigen Form.','naYT naNw')}
  <div className="naSide13" style={{left:86,top:478,height:75}}>STRUKTUREN</div>
  {text(157,471,538,'Lena erzählt weiter: „Im ersten Stock wohnt Maria. Ich liebe','naMail16 naNw')}
  {art('hand-ihre',695,468,36,29)}
  {text(735,471,208,'(a) Wohnung. Maria hat','naMail16 naNw')}
  {text(155,497,142,'viele Bilder und','naMail16 naNw')}{field('16-2b',302,493,103,'Lücke 2b')}{text(413,497,553,'(b) Möbel sind sehr modern. Sie wohnt zusammen mit Florian,','naMail16 naNw')}
  {text(156,522,55,'das ist','naMail16 naNw')}{field('16-2c',216,519,106,'Lücke 2c')}{text(330,522,385,'(c) Freund. Florian spricht auch Italienisch.','naMail16 naNw')}{field('16-2d',720,521,105,'Lücke 2d')}{text(833,523,82,'(d) Eltern','naMail16 naNw')}
  {text(156,548,712,'kommen aus der Schweiz, aus Lugano. Neben Maria wohnt Herr Wörle. Ich finde','naMail16 naNw')}{field('16-2e',874,547,81,'Lücke 2e')}
  {text(156,575,628,'(e) Wohnzimmer gemütlich. Herr Wörle geht oft spazieren und besucht','naMail16 naNw')}{field('16-2f',790,572,105,'Lücke 2f')}{text(903,576,65,'(f) Sohn','naMail16 naNw')}
  {text(156,600,560,'Wolfgang. Im zweiten Stock wohnen meine Freundin Carla und','naMail16 naNw')}{field('16-2g',722,598,104,'Lücke 2g')}{text(834,602,100,'(g) Mutter.“','naMail16 naNw')}
  {text(884,636,90,'_ / 6 PUNKTE','naPkt10 naNw')}
  {check('16-2',660,438,{'16-2b':'ihre','16-2c':'ihr','16-2d':'Seine','16-2e':'sein','16-2f':'seinen','16-2g':'ihre'})}
  {badge9('3',115,667)}
  <div className="naText naYT naNw" style={{left:157,top:664,width:640}}>Lesen Sie Aufgabe <span className="naHl16">2</span> noch einmal und ergänzen Sie die Namen.</div>
  <div className="naSide13" style={{left:86,top:685,height:75}}>STRUKTUREN</div>
  {text(155,704,15,'a','naMail16 naNw')}{text(180,704,80,'Maria ist','naMail16 naNw')}{art('hand-lenas',258,698,50,30)}{text(311,704,103,'Nachbarin.','naMail16 naNw')}
  {text(537,705,15,'c','naMail16 naNw')}{text(562,705,106,'Herr Wörle ist','naMail16 naNw')}{field('16-3c',672,701,116,'Lücke 3c')}{text(796,705,60,'Vater.','naMail16 naNw')}
  {text(154,729,15,'b','naMail16 naNw')}{text(180,729,90,'Florian ist','naMail16 naNw')}{field('16-3b',276,726,116,'Lücke 3b')}{text(400,729,70,'Freund.','naMail16 naNw')}
  {text(537,732,15,'d','naMail16 naNw')}{text(562,732,50,'Lena ist','naMail16 naNw')}{field('16-3d',617,727,116,'Lücke 3d')}{text(741,732,85,'Freundin.','naMail16 naNw')}
  {text(883,742,92,'_ / 3 PUNKTE','naPkt10 naNw')}
  {check('16-3',810,670,{'16-3b':'Marias','16-3c':'Wolfgangs','16-3d':'Carlas'})}
  {badge9('4',115,796)}
  {text(155,793,200,'Ordnen Sie zu.','naYT naNw')}
  <div className="naSide13" style={{left:86,top:838,height:102}}>KOMMUNIKATION</div>
  <div className="naBand16" style={{left:154,top:835,width:674,height:49}}/>
  {art('band1',158,837,656,27)}
  {art('band2',158,863,282,24)}
  {text(153,897,15,'a','naMail16 naNw')}<div className="naSq16" style={{left:177,top:906}}/>{text(193,897,468,'Dein Balkon ist toll, die Blumen sind wirklich schön.','naMail16 naNw')}
  {art('smile',177,927,16,16)}<div className="naTri16" style={{left:199,top:933}}/>{text(217,923,30,'Ja,','naMail16 naNw')}{field('16-4a',250,920,715,'Lücke 4a')}{text(968,923,10,'.','naMail16 naNw')}
  {text(153,948,15,'b','naMail16 naNw')}<div className="naSq16" style={{left:177,top:958}}/>{text(192,948,536,'Ich liebe Davids Haus, es hat sieben Zimmer und zwei Bäder!','naMail16 naNw')}
  {art('frown',176,978,17,17)}<div className="naTri16" style={{left:199,top:984}}/>{text(217,975,428,'Sein Haus ist nicht schlecht, aber seinen Garten','naMail16 naNw')}{field('16-4b',645,974,320,'Lücke 4b')}{text(968,975,10,'.','naMail16 naNw')}
  {text(153,1000,15,'c','naMail16 naNw')}<div className="naSq16" style={{left:176,top:1009}}/>{text(191,1000,416,'Möchtest du einen Fußballplatz vor dem Haus?','naMail16 naNw')}
  {art('smile',176,1030,16,16)}<div className="naTri16" style={{left:198,top:1036}}/>{text(217,1026,90,'Sehr gern,','naMail16 naNw')}{field('16-4c',312,1024,653,'Lücke 4c')}{text(968,1026,10,'.','naMail16 naNw')}
  {text(153,1052,15,'d','naMail16 naNw')}{art('smile',176,1056,16,16)}<div className="naSq16" style={{left:198,top:1061}}/>{text(217,1052,155,'Katharinas Küche','naMail16 naNw')}{field('16-4d',378,1050,587,'Lücke 4d')}{text(968,1052,10,'.','naMail16 naNw')}
  <div className="naTri16" style={{left:177,top:1088}}/>{text(196,1078,372,'Das ist richtig, die Küche ist sehr modern.','naMail16 naNw')}
  {text(153,1104,15,'e','naMail16 naNw')}<div className="naSq16" style={{left:176,top:1113}}/>{text(191,1104,390,'Die Wohnung ist möbliert, das ist praktisch.','naMail16 naNw')}
  {art('frown',176,1134,17,17)}<div className="naTri16" style={{left:198,top:1140}}/>{text(217,1130,375,'Leider sehen die Möbel nicht so schön aus,','naMail16 naNw')}{field('16-4e',596,1129,369,'Lücke 4e')}{text(968,1130,10,'.','naMail16 naNw')}
  {text(153,1155,15,'f','naMail16 naNw')}<div className="naSq16" style={{left:176,top:1165}}/>{text(191,1155,457,'Mein Traumhaus steht im Wald, ich liebe die Natur.','naMail16 naNw')}
  {art('frown',175,1186,17,17)}<div className="naTri16" style={{left:198,top:1191}}/>{text(217,1182,105,'Nur Natur –','naMail16 naNw')}{field('16-4f',328,1179,627,'Lücke 4f')}{text(958,1182,10,'!','naMail16 naNw')}
  {text(883,1233,92,'_ / 6 PUNKTE','naPkt10 naNw')}
  {art('punkte',228,1240,524,135)}
  <div className="naModul10" style={{left:0,top:1390,width:72,height:23,lineHeight:'23px',background:'#ded6b0',fontWeight:400}}>Modul 5</div>
  <div className="naText naFooter naNw" style={{left:85,top:1394,width:220,whiteSpace:'pre'}}>{'16  |  sechzehn'}</div>
  {text(519,1385,225,'www.hueber.de/menschen/lernen','naWWW naNw')}
 </>}
 </div><audio ref={player} className="naPlayer"/></div>;
}
