import {CheckButton} from '../components/CheckButton';
import {PageImage} from '../components/PageImage';
import {usePageReset} from '../exercises/usePageReset';
import {useLayoutEffect,useRef,useState} from 'react';
import '../components/native-ab12.css';
import './native-ab12-p18-29.css';
import './native-ab12-p21-24.css';

function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\p{L}/u.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-word={w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text}>{w}</span>:w)}</>}
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\s+/g,' ');

export function NativeAB12P21_24({page}:{page:string}){
 const W=1071,H=(page==='21'||page==='25')?1447:1452;
 const root=useRef<HTMLDivElement>(null),player=useRef<HTMLAudioElement>(null);
 const [scale,ss]=useState(.6);const key='native-ab12-'+page;
 const [values,sv]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});
 const [results,sr]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=root.current!;const obs=new ResizeObserver(()=>ss(Math.min(el.clientWidth/W,(el.clientHeight-38)/H)));obs.observe(el);return ()=>obs.disconnect()},[W,H]);
 usePageReset(page,key,()=>{sv({});sr({})});
 const set=(id:string,v:string)=>{const n={...values,[id]:v};sv(n);localStorage.setItem(key,JSON.stringify(n))};
 const text=(x:number,y:number,w:number,t:string,cls='')=><div className={'naText '+cls} style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="naArt" src={`assets/book-crops/native-ab12-p${page}-${name}.png`} alt={'Originalillustration '+name} style={{left:x,top:y,width:w,height:h}}/>;
 const stext=(x:number,y:number,w:number,t:string,cls='')=><div className={'naSans2 '+cls} style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const rich=(x:number,y:number,w:number,parts:(string|number)[],cls='')=><div className={'naText '+cls} style={{left:x,top:y,width:w}}>{parts.map((p,i)=>typeof p==='string'?<Words key={i} text={p}/>:<span key={i} className="naULine" style={{width:p}}/>)}</div>;
 const field=(id:string,x:number,y:number,w:number,label:string,cls='')=><input className={'naField '+cls} aria-label={label} data-native-field={id} style={{left:x,top:y,width:w}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>;
 const dot=(id:string,value:string,x:number,y:number,label:string,cls='')=><input type="radio" className={'naDot '+cls} name={key+'-'+id} aria-label={label} data-native-field={id} style={{left:x,top:y}} checked={values[id]===value} onChange={()=>set(id,value)}/>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>,cls='')=><div className={'naCheck '+cls} data-check={id} style={{left:x,top:y}}><CheckButton answers={answers} onClick={()=>sr({...results,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(v=>normalize(v)===normalize(values[k]||(a==='false'?'false':''))))})}></CheckButton><output aria-live="polite">{id in results?(results[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const title=(n:string,x:number,y:number,w:number,t:string,cls='')=><div className={'naTitle '+cls} style={{left:x,top:y,width:w}}><b>{n}</b><Words text={t}/></div>;
 const audio=(src:string,x:number,y:number,label:string,task?:string)=><button className="naAudio" data-task={task} style={{left:x,top:y}} aria-label={'Originalaudio '+label+' abspielen'} onClick={()=>{if(player.current){player.current.src=src;player.current.play().catch(()=>{})}}}>▶ {label}</button>;

 return <div className="nativeAB12" ref={root} data-native-ab12={page}><style>{`@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-400.woff2') format('woff2');font-weight:400}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-700.woff2') format('woff2');font-weight:700}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-500.ttf') format('truetype');font-weight:500}@font-face{font-family:DroidSerif;src:url('assets/fonts/droid-serif-400.ttf') format('truetype');font-weight:400;font-display:swap}[data-native-ab12="${page}"] .naText,[data-native-ab12="${page}"] .naBold,[data-native-ab12="${page}"] .naLet,[data-native-ab12="${page}"] .naDlg,[data-native-ab12="${page}"] .naField{font-family:DroidSerif,Georgia,serif!important;letter-spacing:-0.65px}[data-native-ab12="${page}"] .naText,[data-native-ab12="${page}"] .naBold,[data-native-ab12="${page}"] .naLet,[data-native-ab12="${page}"] .naDlg{font-size:20px!important}[data-native-ab12="${page}"] .naCanvas .naTitle{font-family:FiraSans,sans-serif!important;font-size:21px!important;letter-spacing:0!important}[data-native-ab12="${page}"] .naText.naS20{font-size:18px!important}[data-native-ab12="${page}"] .naSmall{font-size:16.5px!important}[data-native-ab12="${page}"] .naD19{font-size:17.5px!important}[data-native-ab12="${page}"] .naField{font-size:19px!important}`}</style><div className={'naCanvas'+(W<1000?' naNarrow':'')} style={{width:W,height:H,transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='21'&&<>
  {art('tab15',916,35,155,81)}
  {text(106,85,331,'TRAINING: SPRECHEN','naHead2 naH24')}
  <div className="naHeadRule" style={{left:446,top:111,width:469}}/>
  {title('1',104,163,900,'Was machen Sie wo in Ihrem Stadtteil gern und/oder oft? Sammeln Sie Orte','naOB naLS')}
  <div className="naTitle naOB naLS" style={{left:150,top:189}}><Words text="und Aktivitäten und notieren Sie."/></div>
  {art('notes-hand',160,240,160,185)}
  {art('photo1',381,239,136,104)}
  {art('photo2',536,238,160,103)}
  {art('photo3',708,222,124,102)}
  {art('photo4',846,227,142,102)}
  <div className="naTipTop" style={{left:391,top:371,width:605,height:5}}/>
  <div className="naTipSide" style={{left:391,top:371,width:14,height:91}}/>
  <div className="naTipLbl" style={{left:402,top:450}}>TIPP</div>
  {text(425,379,560,'Sie möchten nicht nur mit einem Wort antworten? Machen Sie sich','naF17')}
  {text(425,401,560,'erst Notizen: Was mache ich wo in meinem Stadtteil? So wiederholen','naF17')}
  {text(425,423,560,'Sie wichtige Informationen und planen Ihre Aussage. Das Sprechen ist','naF17')}
  {text(425,445,560,'dann leichter.','naF17')}
  {title('2',104,511,900,'Arbeiten Sie zu dritt. Schreiben Sie einen Fragebogen. Sprechen und notieren Sie.','naOB naLS')}
  {text(170,566,300,'Was brauchen Sie in Ihrem Stadtteil?','naD19 naBold')}
  <div className="naTFrame" style={{left:170,top:595,width:730,height:169}}/>
  {[647,676,705,735].map(y=><div key={y} className="naTRule naTLine" style={{left:170,top:y,width:730}}/>)}
  {[353,535,717].map(x=><div key={x} className="naTCol naTLine" style={{left:x,top:595,height:169}}/>)}
  {text(362,602,60,'Ich','naSmall naItalic')}
  {text(544,602,160,'Meine Partnerin /','naSmall naItalic')}
  {text(544,624,160,'Mein Partner A','naSmall naItalic')}
  {text(726,602,160,'Meine Partnerin /','naSmall naItalic')}
  {text(726,624,160,'Mein Partner B','naSmall naItalic')}
  {art('row1-ex',170,646,388,31)}
  {art('row2-ex',170,675,206,31)}
  {text(180,713,20,'3.','naSmall')}
  {text(180,743,20,'…','naSmall')}
  {art('bubble1',125,782,209,89)}
  {art('bubble2',378,788,483,98)}
  {text(108,931,371,'TRAINING: AUSSPRACHE','naHead2 naH30')}
  {text(499,939,230,'Vokale: langes „e“ und „i“','naIt naS188 naVok')}
  <div style={{position:'absolute',left:734,top:959,width:228,height:2,background:'#f8b25e'}}/>
  {audio('assets/ab-a12-cd2-track12.mp3',46,1008,'2 12','1')}
  {title('1',107,1000,540,'Was hören Sie: langes „e“ oder „i“?','naOB naLS')}
  {text(151,1028,140,'Kreuzen Sie an.','naIns')}
  {text(184,1072,20,'e','naSmall naItalic')}
  {text(230,1068,20,'i','naSmall naItalic')}
  {text(330,1072,20,'e','naSmall naItalic')}
  {text(376,1068,20,'i','naSmall naItalic')}
  {text(476,1072,20,'e','naSmall naItalic')}
  {text(522,1068,20,'i','naSmall naItalic')}
  {['1','2','3'].map((n,i)=><div key={n} className="naText" style={{left:150,top:1097+i*25.5,width:20}}>{n}</div>)}
  {['4','5','6'].map((n,i)=><div key={n} className="naText" style={{left:295,top:1096+i*25.5,width:20}}>{n}</div>)}
  {['7','8','9'].map((n,i)=><div key={n} className="naText" style={{left:441,top:1096+i*25.5,width:20}}>{n}</div>)}
  {[1,2,3].map(n=><span key={'e'+n}>{dot('p21-a1_'+n,'e',185,1102+(n-1)*25.5,'Zeile '+n+' e','naDotXs')}{dot('p21-a1_'+n,'i',233,1102+(n-1)*25.5,'Zeile '+n+' i','naDotXs')}</span>)}
  {[4,5,6].map(n=><span key={'e'+n}>{dot('p21-a1_'+n,'e',330,1102+(n-4)*25.5,'Zeile '+n+' e','naDotXs')}{dot('p21-a1_'+n,'i',376,1102+(n-4)*25.5,'Zeile '+n+' i','naDotXs')}</span>)}
  {[7,8,9].map(n=><span key={'e'+n}>{dot('p21-a1_'+n,'e',476,1102+(n-7)*25.5,'Zeile '+n+' e','naDotXs')}{dot('p21-a1_'+n,'i',522,1102+(n-7)*25.5,'Zeile '+n+' i','naDotXs')}</span>)}
  {check('g1',160,1178,{'p21-a1_1':'e','p21-a1_2':'e','p21-a1_3':'i','p21-a1_4':'i','p21-a1_5':'i','p21-a1_6':'e','p21-a1_7':'i','p21-a1_8':'i','p21-a1_9':'i'},'naCheckSm')}
  {title('3',617,997,430,'Ergänzen Sie „i“, „ih“, „ie“.','naOB naLS')}
  {text(663,1039,12,'a','naS20')}
  {text(687,1039,150,'Marlene lebt in G','naS20')}
  {field('p21-g1',839,1033,38,'a G...sing')}
  {text(878,1039,80,'sing. Das','naS20')}
  {text(687,1066,20,'ist','naS20')}
  {field('p21-g2',713,1059,38,'a ist ...r')}
  {text(751,1066,25,'r L','naD19')}
  {field('p21-g3',776,1059,39,'a L...blingsviertel')}
  {text(816,1066,62,'blingsv','naS20')}
  {field('p21-g4',878,1059,38,'a blingsv...rtel')}
  {text(918,1066,40,'rtel.','naS20')}
  {text(664,1091,12,'b','naS20')}
  {text(688,1091,192,'Die Wohnung ist möbl','naS20')}
  {field('p21-g5',881,1085,39,'b möbl...rt')}
  {text(922,1091,25,'rt.','naS20')}
  {text(663,1118,12,'c','naS20')}
  {text(688,1118,42,'Im K','naS20')}
  {field('p21-g6',729,1110,39,'c K...no')}
  {text(769,1118,97,'no sehen w','naS20')}
  {field('p21-g7',866,1110,39,'c w...r')}
  {text(907,1118,12,'r','naS20')}
  {text(685,1142,12,'v','naS20')}
  {field('p21-g8',696,1136,39,'c v...le')}
  {text(736,1142,106,'le schöne Sp','naS20')}
  {field('p21-g9',842,1136,39,'c Sp...lfilme')}
  {text(882,1142,60,'lfilme.','naS20')}
  {check('g2',958,1138,{'p21-g1':'ie','p21-g2':'ih','p21-g3':'ie','p21-g4':'ie','p21-g5':'ie','p21-g6':'i','p21-g7':'i','p21-g8':'ie','p21-g9':'ie'},'naCheckSm')}
  {audio('assets/ab-a12-cd2-track13.mp3',46,1212,'2 13','2')}
  {title('2',107,1206,480,'Hören Sie und sprechen Sie nach.','naOB naLS')}
  {text(154,1250,80,'See','naF21')}
  {text(329,1248,80,'viel','naF21')}
  {text(154,1272,110,'Museum','naF21')}
  {text(329,1274,120,'viele Spiele','naF21')}
  {text(154,1300,150,'mehr Museum','naF21')}
  {text(329,1299,180,'viele Spiele fehlen','naF21')}
  {text(154,1325,140,'das lieben wir','naF21')}
  {audio('assets/ab-a12-cd2-track14.mp3',599,1196,'2 14','2')}
  <div className="naTitle naLSm" style={{left:664,top:1193}}><Words text="Hören Sie und vergleichen Sie."/></div>
  {text(816,1392,170,'einundzwanzig | 21','naFooter naNw')}
  {art('modul',998,1386,73,26)}
 </>}
 {page==='22'&&<>
  {text(123,84,90,'TEST','naHead2 naH27')}
  <div className="naHeadRule" style={{left:205,top:113,width:773}}/>
  {title('1',118,158,900,'In der Stadt. Ordnen und Ergänzen Sie die Wörter mit Artikel.','naOB naLS')}
  {art('scramble',160,196,665,42)}
  {text(166,243,12,'a')}
  {text(190,244,320,'Hier kann man Kleidung einkaufen.','naF19')}
  {art('hand-ex',524,244,110,30)}
  {text(165,269,12,'b')}
  {text(190,270,560,'Hier lernen und spielen kleine Kinder von Montag bis Freitag.','naF19')}
  {field('p22-1b',752,265,215,'b Ort')}
  {text(165,295,12,'c')}
  {text(190,296,355,'Hier kann man schlafen, es ist günstig.','naF19')}
  {field('p22-1c',546,290,374,'c Ort')}
  {text(165,321,12,'d')}
  {text(190,322,275,'Hier gibt es sehr viele Treppen.','naF19')}
  {field('p22-1d',475,316,448,'d Ort')}
  {text(165,347,12,'e')}
  {text(190,348,430,'Hier kann man Bücher lesen, aber nicht kaufen.','naF19')}
  {field('p22-1e',702,343,265,'e Ort')}
  {text(166,373,12,'f')}
  {text(189,374,360,'Hier ist es grün und es gibt viele Bäume.','naF19')}
  {field('p22-1f',557,368,368,'f Ort')}
  <div className="naRule" style={{left:879,top:413,width:14}}/>
  {text(900,406,75,'/ 10 Punkte','naPkt')}
  {check('g1',700,240,{'p22-1b':'Kindergarten|der Kindergarten','p22-1c':'Jugendherberge|die Jugendherberge','p22-1d':'Turm|der Turm','p22-1e':'Bibliothek|die Bibliothek','p22-1f':'Park|der Park'},'naCheckSm')}
  {title('2',117,442,900,'Wie heißen die Personalpronomen? Kreuzen Sie an.','naOB naLS')}
  {text(165,489,12,'a')}
  {text(189,490,540,'Daniel und Julia, wie findet ihr Berlin? – Super, es gefällt','naF19')}
  {art('ex2a-x',716,484,32,32)}
  {text(747,490,40,'uns','naF19')}
  <div className="naDotPrint naDotSm" style={{left:805,top:494}}/>
  {text(828,490,60,'Ihnen','naF19')}
  {text(188,515,160,'wirklich gut hier.','naF19')}
  {text(164,541,12,'b')}
  {text(189,542,265,'Das Auto ist ja toll. Gehört es','naF19')}
  {dot('p22-r2b','dir',467,544,'b dir','naDotSm')}
  {text(492,542,50,'dir','naF19')}
  {dot('p22-r2b','ihnen',545,544,'b ihnen','naDotSm')}
  {text(567,542,65,'ihnen?','naF19')}
  {text(634,543,350,'– Leider nicht, es gehört meinem Chef.','naF19')}
  {text(164,566,12,'c')}
  {text(189,567,95,'Kann ich','naF19')}
  {dot('p22-r2c','ihm',294,571,'c ihm','naDotSm')}
  {text(318,567,45,'ihm','naF19')}
  {dot('p22-r2c','Ihnen',378,571,'c Ihnen','naDotSm')}
  {text(402,567,60,'Ihnen','naF19')}
  {text(471,568,460,'helfen, Herr Thalmann? – Ja bitte, meine Tasche ist','naF19')}
  {text(188,593,90,'so schwer.','naF19')}
  {text(164,618,12,'d')}
  {text(189,619,760,'Emma und ich haben für Sie eingekauft, Frau Roth. – Das ist aber nett. Ich danke','naF19')}
  {dot('p22-r2d','uns',190,645,'d uns','naDotSm')}
  {text(214,642,35,'uns','naF19')}
  {dot('p22-r2d','euch',270,645,'d euch','naDotSm')}
  {text(294,642,50,'euch.','naF19')}
  {text(164,670,12,'e')}
  {text(188,671,455,'Wie findet dein Sohn die neue Firma? – Es gefällt','naF19')}
  {dot('p22-r2e','ihm',649,675,'e ihm','naDotSm')}
  {text(673,671,45,'ihm','naF19')}
  {dot('p22-r2e','ihr',733,675,'e ihr','naDotSm')}
  {text(757,671,35,'ihr','naF19')}
  {text(807,673,120,'sehr gut dort.','naF19')}
  {text(164,696,12,'f')}
  {text(188,697,105,'Kannst du','naF19')}
  {dot('p22-r2f','euch',303,699,'f euch','naDotSm')}
  {text(327,697,55,'euch','naF19')}
  {dot('p22-r2f','mir',394,699,'f mir','naDotSm')}
  {text(418,697,40,'mir','naF19')}
  {text(472,697,460,'bei der Aufgabe helfen? – Ja Max, ich komme gleich.','naF19')}
  <div className="naRule" style={{left:879,top:737,width:14}}/>
  {text(900,730,70,'/ 5 Punkte','naPkt')}
  {check('g2',170,724,{'p22-r2b':'dir','p22-r2c':'Ihnen','p22-r2d':'euch','p22-r2e':'ihm','p22-r2f':'mir'},'naCheckSm')}
  {title('3',116,765,900,'Ergänzen Sie die E-Mail.','naOB naLS')}
  <div className="naBandCream" style={{left:164,top:812,width:682,height:24}}/>
  {stext(170,814,680,'Hier gibt es viele | das ist nicht so toll | gefällt mir gut | Hier ist | das ist schon okay','naBankT')}
  {stext(184,873,110,'Hallo Freunde,','naF16')}
  {stext(184,897,230,'seit August bin ich in Frankfurt.','naF16')}
  {field('p22-3a',413,885,272,'E-Mail a')}
  {stext(689,897,25,'(a)','naF16')}
  {stext(184,921,380,'eine Schule für Krankenschwestern. Die Ausbildung','naF16')}
  {field('p22-3b',184,934,270,'E-Mail b')}
  {stext(459,944,190,'(b) und macht viel Spaß. Ich','naF16')}
  {stext(184,968,500,'wohne in der Mozartallee 134. Mein Zimmer ist klein und gemütlich.','naF16')}
  {stext(185,993,240,'Es hat nur 15 Quadratmeter, aber','naF16')}
  {field('p22-3c',430,982,232,'E-Mail c')}
  {stext(666,993,30,'(c).','naF16')}
  {stext(185,1016,460,'Leider habe ich keine Küche. Ich koche in meinem Zimmer und','naF16')}
  {field('p22-3d',184,1030,270,'E-Mail d')}
  {stext(459,1041,25,'(d).','naF15')}
  {stext(486,1039,220,'Aber das Viertel hier ist super.','naF16')}
  {field('p22-3e',184,1055,270,'E-Mail e')}
  {stext(458,1065,25,'(e)','naF15')}
  {stext(482,1064,220,'Kneipen und Restaurants und','naF16')}
  {stext(184,1090,170,'es ist immer etwas los.','naF16')}
  {stext(185,1123,210,'Liebe Grüße nach Innsbruck','naF16')}
  {stext(185,1145,80,'Barbara','naF16')}
  <div className="naRule" style={{left:879,top:1150,width:14}}/>
  {text(900,1143,70,'/ 5 Punkte','naPkt')}
  {check('g3',710,1100,{'p22-3a':'Hier ist','p22-3b':'gefällt mir gut','p22-3c':'das ist schon okay','p22-3d':'das ist nicht so toll','p22-3e':'Hier gibt es viele'},'naCheckSm')}
  {art('score-table',155,1205,512,152)}
  {text(441,1357,240,'www.hueber.de/menschen/lernen','naUrl naNw')}
  {art('modul-tab',0,1384,86,30)}
  {text(93,1395,190,'22 | zweiundzwanzig','naFooter naNw')}
 </>}
 {page==='24'&&<>
  {text(134,66,790,'WIEDERHOLUNGSSTATION: WORTSCHATZ','naHead2 naH38')}
  {title('1',131,161,900,'In der Stadt. Was ist das? Notieren Sie.','naRB naT18')}
  {text(171,196,15,'a')}
  {art('eine-bank-script',185,200,85,28)}
  {text(171,221,15,'b')}
  {field('p24-1b',195,215,303,'1b')}
  {text(171,248,15,'c')}
  {field('p24-1c',195,242,303,'1c')}
  {text(171,272,15,'d')}
  {field('p24-1d',195,266,303,'1d')}
  {text(540,202,15,'e')}
  {field('p24-1e',566,196,304,'1e')}
  {text(540,228,15,'f')}
  {field('p24-1f',566,222,304,'1f')}
  {text(538,254,15,'g')}
  {field('p24-1g',566,248,304,'1g')}
  {text(538,280,15,'h')}
  {field('p24-1h',566,274,304,'1h')}
  {text(891,184,15,'a')}
  {art('a-bank-bild',905,183,47,65)}
  {text(974,139,15,'b')}
  {art('b-kirche',985,140,57,88)}
  {text(897,258,15,'c')}
  {art('c-schloss',908,258,87,82)}
  {text(651,326,15,'d')}
  {art('d-turm',662,338,44,62)}
  {text(743,336,15,'e')}
  {art('e-hafen',760,335,118,70)}
  {text(687,404,15,'f')}
  {art('f-bibliothek',700,412,110,66)}
  {text(936,364,15,'g')}
  {art('g-post',952,355,76,75)}
  {text(846,416,15,'h')}
  {art('h-spielplatz',830,436,102,54)}
  {check('g1',878,306,{'p24-1b':'eine Kirche|Kirche|die Kirche','p24-1c':'ein Schloss|Schloss|das Schloss','p24-1d':'ein Turm|Turm|der Turm','p24-1e':'ein Hafen|Hafen|der Hafen','p24-1f':'eine Bibliothek|Bibliothek|die Bibliothek','p24-1g':'eine Post|Post|die Post','p24-1h':'ein Spielplatz|Spielplatz|der Spielplatz'})}
  {title('2',128,342,900,'Was passt zusammen? Ordnen Sie zu.','naRB naT18')}
  {text(167,380,140,'Garage','naF185')}
  {text(166,406,140,'Arbeitszimmer','naF185')}
  {text(166,431,140,'Bad','naF185')}
  {text(165,457,140,'Schlafzimmer','naF185')}
  {text(165,482,140,'Garten','naF185')}
  {text(164,508,140,'Wohnzimmer','naF185')}
  {text(165,534,140,'Küche','naF185')}
  {text(396,384,160,'Couch','naF185')}
  {text(395,410,160,'Toilette','naF185')}
  {text(395,435,160,'Computer','naF185')}
  {text(395,461,160,'Kühlschrank','naF185')}
  {text(394,486,160,'Auto','naF185')}
  {text(394,512,160,'Blumen','naF185')}
  {text(394,537,160,'Bett','naF185')}
  {art('ex2-curve',238,490,156,41)}
  {title('3',123,600,900,'Wo wohnt Charlotte? Lösen Sie das Rätsel.','naRB naT18')}
  {rich(160,636,520,['Charlotte wohnt in der Stadtmitte, direkt im ',48,' (1) ',38,'.'])}
  {rich(160,662,520,['Ihre Wohnung ist im 3. ',22,' (4) ',34,' und hat 45 m².'])}
  {rich(160,688,520,['Charlotte hat zwei Zimmer mit ',28,' (2) ',42,' und Bad.'])}
  {rich(160,714,520,['Ihr Vermieter ist sehr nett und die ',26,' (3) ',36,' ist günstig.'])}
  {rich(160,740,520,['Neben ihr wohnt Frau Thiele, das ist ihre ',40,' (5) ',36,'.'])}
  {art('kreuzwort',158,780,417,182)}
  {text(591,920,75,'Lösung:')}
  {text(667,920,300,'Charlotte wohnt in der','naF192')}
  {text(663,952,110,'Schweiz, in')}
  {field('p24-3l',773,941,98,'Lösungswort','naDashU')}
  {text(878,950,15,'.')}
  {check('g2',905,939,{'p24-3l':'Zürich|Zuerich'})}
  {title('4',115,1000,900,'Ergänzen Sie das Gespräch.','naRB naT18')}
  <div className="naBandCream" style={{left:156,top:1040,width:509,height:32}}/>
  {stext(162,1039,58,'Urlaub','naBankT')}{stext(220,1039,8,'|','naBankT')}
  {stext(231,1039,58,'Wetter','naBankT')}{stext(290,1039,8,'|','naBankT')}
  {stext(300,1039,44,'Meer','naBankT')}{stext(344,1039,8,'|','naBankT')}
  {art('gruesse-strike',349,1038,60,34)}
  {stext(407,1039,8,'|','naBankT')}{stext(417,1039,34,'Dom','naBankT')}{stext(456,1039,8,'|','naBankT')}
  {stext(466,1039,62,'Wochen','naBankT')}{stext(534,1039,8,'|','naBankT')}
  {stext(545,1039,48,'Hause','naBankT')}{stext(598,1039,8,'|','naBankT')}
  {stext(608,1039,52,'Bergen','naBankT')}
  {stext(171,1082,50,'ARISA:','naSpkR')}
  {stext(233,1082,130,'Hallo Uli, schöne','')}
  {art('gruesse-script',371,1085,57,28)}
  {stext(426,1082,90,'aus Italien!')}
  {stext(172,1106,45,'Uli91:','naSpkB')}
  {stext(233,1106,250,'Aus Italien? Was machst du dort?','naDlgB')}
  {stext(170,1128,50,'ARISA:','naSpkR')}
  {field('p24-4a',232,1127,243,'4a','naLow')}
  {stext(481,1128,30,'(a)!','')}
  {art('emoji',510,1124,44,40)}
  {stext(233,1150,110,'Ich war in den','')}
  {field('p24-4b',341,1153,244,'4b','naLow')}
  {stext(591,1150,360,'(b), in den Dolomiten. Jetzt bin ich an der Adria.','')}
  {stext(170,1174,45,'Uli91:','naSpkB')}
  {stext(231,1174,115,'Toll! Wie ist das','naDlgB')}
  {field('p24-4c',349,1176,243,'4c','naLow')}
  {stext(598,1174,70,'(c) dort?','naDlgB')}
  {stext(169,1198,50,'ARISA:','naSpkR')}
  {stext(232,1198,290,'Sehr warm! Ich schwimme jeden Tag im','')}
  {field('p24-4d',524,1201,243,'4d','naLow')}
  {stext(773,1198,30,'(d).','')}
  {stext(231,1222,405,'Morgen fahre ich weiter nach Mailand, ich möchte den','')}
  {field('p24-4e',670,1230,212,'4e','naLow')}
  {stext(888,1222,70,'(e) sehen.','')}
  {stext(169,1246,45,'Uli91:','naSpkB')}
  {stext(230,1246,200,'Sprichst du Italienisch?','naDlgB')}
  {stext(167,1269,50,'ARISA:','naSpkR')}
  {stext(230,1269,140,'Sí, naturalmente …','')}
  {stext(230,1299,60,'In zwei','')}
  {field('p24-4f',290,1295,220,'4f','naLow')}
  {stext(516,1299,220,'(f) bin ich wieder zu','')}
  {field('p24-4g',680,1304,213,'4g','naLow')}
  {stext(899,1299,70,'(g). Ciao!','')}
  {stext(167,1323,45,'Uli91:','naSpkB')}
  {stext(228,1323,200,'Tschüs und viel Spaß!','naDlgB')}
  {check('g3',958,1345,{'p24-4a':'Urlaub','p24-4b':'Bergen','p24-4c':'Wetter','p24-4d':'Meer','p24-4e':'Dom','p24-4f':'Wochen','p24-4g':'Hause'})}
  {art('modul-tab',0,1384,86,30)}
  {text(76,1392,200,'24 | vierundzwanzig','naFooter naNw')}
 </>}
 {page==='25'&&<>
  {text(102,68,790,'WIEDERHOLUNGSSTATION: GRAMMATIK','naHead2 naH38')}
  {art('tabs',973,40,96,81)}
  {art('house',95,108,517,270)}
  {title('1',105,405,795,'Sehen Sie das Bild an und ergänzen Sie die Präpositionen und den Artikel, wo nötig.','naRB naT18 naLS3 naT1x')}
  {stext(146,472,14,'a')}
  {stext(171,472,168,'Frau Kerner wohnt')}
  {art('neben',344,475,41,19)}
  {stext(389,472,145,'Herrn Rahn und')}
  {field('p25-1a',540,465,115,'1a')}
  {stext(661,472,150,'Familie Burlach.')}
  {stext(146,498,14,'b')}
  {stext(171,498,96,'Frau Other wohnt')}
  {field('p25-1b',333,491,117,'1b')}
  {stext(455,498,150,'Familie Burlach.')}
  {stext(146,524,14,'c')}
  {field('p25-1c1',170,516,116,'1c1')}
  {stext(290,524,14,'d')}
  {field('p25-1c2',302,516,51,'1c2')}
  {stext(359,524,165,'Haus ist ein Baum.')}
  {stext(530,524,186,'Die Fahrräder stehen')}
  {field('p25-1c3',722,517,115,'1c3')}
  {stext(843,524,60,'Baum.')}
  {stext(146,549,14,'d')}
  {field('p25-1d1',170,541,128,'1d1')}
  {stext(303,549,14,'d')}
  {field('p25-1d2',315,542,51,'1d2')}
  {stext(372,549,155,'Baum ist ein Zelt.')}
  {field('p25-1d3',531,543,92,'1d3')}
  {stext(628,549,232,'Zelt sind Sophie und Paul.')}
  {stext(146,579,14,'e')}
  {stext(171,577,305,'Herr und Frau Burlach sitzen gern')}
  {field('p25-1e1',480,569,117,'1e1')}
  {stext(600,577,14,'d')}
  {field('p25-1e2',612,569,52,'1e2')}
  {stext(670,577,70,'Balkon.')}
  {check('g1',958,577,{'p25-1a':'unter','p25-1b':'über|ueber','p25-1c1':'Neben|neben','p25-1c2':'em','p25-1c3':'am','p25-1d1':'Vor','p25-1d2':'em','p25-1d3':'Im','p25-1e1':'auf','p25-1e2':'em'})}
  {title('2',105,637,900,'Ergänzen Sie die Possessivartikel.','naRB naT18')}
  {stext(146,679,14,'a')}
  {stext(171,678,530,'Herr Rahn wohnt im Erdgeschoss. Er wohnt allein und liebt')}
  {art('seine',703,681,39,19)}
  {stext(746,678,75,'Blumen.')}
  {stext(146,704,14,'b')}
  {field('p25-2b',170,696,116,'2b')}
  {stext(292,705,470,'Nachbarin, Frau Kerner, wohnt auch im Erdgeschoss.')}
  {stext(146,731,14,'c')}
  {stext(171,730,310,'Im 1. Stock wohnt Familie Burlach.')}
  {field('p25-2c1',485,723,117,'2c1')}
  {stext(607,730,180,'Sohn heißt Paul und')}
  {field('p25-2c2',792,723,110,'2c2')}
  {stext(170,756,295,'Tochter Sophie. Die Eltern finden')}
  {field('p25-2c3',470,749,115,'2c3')}
  {stext(591,756,165,'Balkon sehr schön.')}
  {stext(146,782,14,'d')}
  {stext(171,782,265,'Frau Other wohnt im 2. Stock.')}
  {field('p25-2d1',442,774,106,'2d1')}
  {stext(562,782,362,'Wohnung ist sehr groß und sie vermietet')}
  {stext(170,808,110,'ein Zimmer.')}
  {field('p25-2d2',283,799,115,'2d2')}
  {stext(404,808,250,'Mieterin heißt Frau Reimer.')}
  {check('g2',958,808,{'p25-2b':'Seine','p25-2c1':'Ihr','p25-2c2':'ihre','p25-2c3':'ihren','p25-2d1':'Ihre','p25-2d2':'Ihre'})}
  {title('3',105,869,900,'Wer ist wer? Ergänzen Sie die Namen.','naRB naT18')}
  {stext(146,911,14,'a')}
  {stext(170,909,232,'Sophie ist Herrn und Frau')}
  {art('burlachs',405,912,63,20)}
  {stext(471,909,72,'Tochter.')}
  {stext(146,936,14,'b')}
  {stext(171,936,182,'Frau Reimer ist Frau')}
  {field('p25-3b',358,929,155,'3b')}
  {stext(518,936,85,'Mieterin.')}
  {stext(146,962,14,'c')}
  {stext(170,960,68,'Paul ist')}
  {field('p25-3c',241,954,154,'3c')}
  {stext(401,960,68,'Bruder.')}
  {stext(146,986,14,'d')}
  {stext(171,986,142,'Frau Burlach ist')}
  {field('p25-3d1',317,980,155,'3d1')}
  {stext(477,986,36,'und')}
  {field('p25-3d2',517,980,154,'3d2')}
  {stext(677,988,68,'Mutter.')}
  {stext(146,1013,14,'e')}
  {stext(171,1012,160,'Herr Rahn ist Frau')}
  {field('p25-3e',341,1006,155,'3e')}
  {stext(502,1012,80,'Nachbar.')}
  {check('g3',958,1012,{'p25-3b':'Others','p25-3c':'Sophies','p25-3d1':'Pauls','p25-3d2':'Sophies','p25-3e':'Kerners'})}
  {title('4',105,1075,900,'Ergänzen Sie das Pronomen.','naRB naT18')}
  {stext(146,1116,14,'a')}
  <span className="naSqB" style={{left:170,top:1123}}/>
  {stext(189,1116,442,'Frau Neuner hat heute viel Arbeit und wenig Zeit.')}
  {stext(638,1116,100,'Können Sie')}
  {stext(823,1116,115,'bitte helfen?')}
  <div className="naRule" style={{left:742,top:1136,width:77}}/>
  <span className="naTriG" style={{left:171,top:1149}}/>
  {stext(187,1142,200,'Ja, natürlich helfe ich')}
  {art('ihr',388,1144,27,19)}
  {stext(146,1162,14,'b')}
  <span className="naSqB" style={{left:170,top:1174}}/>
  {stext(187,1166,250,'Johanna und Martin, gefällt')}
  {field('p25-4b1',444,1161,102,'4b1')}
  {stext(551,1166,200,'denn mein Sofa nicht?')}
  <span className="naTriG" style={{left:171,top:1201}}/>
  {stext(189,1191,132,'Doch, es gefällt')}
  {field('p25-4b2',327,1186,116,'4b2')}
  {stext(444,1191,8,'.')}
  {stext(146,1219,14,'c')}
  <span className="naSqB" style={{left:170,top:1226}}/>
  {stext(188,1217,158,'Gehört das Handy')}
  {field('p25-4c1',350,1212,122,'4c1')}
  {stext(476,1217,170,', Herr Kleinschmid?')}
  <span className="naTriG" style={{left:171,top:1252}}/>
  {stext(187,1243,112,'Ja, es gehört')}
  {field('p25-4c2',300,1237,159,'4c2')}
  {stext(459,1243,8,'.')}
  {stext(146,1265,14,'d')}
  <span className="naSqB" style={{left:170,top:1277}}/>
  {stext(189,1269,500,'Ich finde das Schloss Schönbrunn in Wien sehr schön.','naS19')}
  {stext(671,1269,88,'Gefällt es','naS19')}
  {field('p25-4d1',756,1264,148,'4d1')}
  {stext(189,1294,132,'nicht, Juliane?')}
  <span className="naTriG" style={{left:171,top:1329}}/>
  {stext(189,1319,132,'Doch, es gefällt')}
  {field('p25-4d2',327,1314,156,'4d2')}
  {stext(491,1319,430,', aber ich finde Schlösser ein bisschen langweilig.')}
  {check('g4',958,1319,{'p25-4b1':'euch','p25-4b2':'uns','p25-4c1':'Ihnen','p25-4c2':'mir','p25-4d1':'dir','p25-4d2':'mir'})}
  {text(797,1386,135,'fünfundzwanzig','naFooter naNw')}
  {text(943,1386,35,'| 25','naFooter naNw naFB')}
  {art('modul',991,1386,74,25)}
 </>}
 </div><audio ref={player} className="naPlayer"/></div>;
}
