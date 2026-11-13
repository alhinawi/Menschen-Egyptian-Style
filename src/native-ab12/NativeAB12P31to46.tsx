import {usePageReset} from '../exercises/usePageReset';
import {useLayoutEffect,useRef,useState} from 'react';
import {PageImage} from '../components/PageImage';
import {CheckButton} from '../components/CheckButton';
import '../components/native-ab12.css';

function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\p{L}/u.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-word={w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text}>{w}</span>:w)}</>}
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\s+/g,' ');

export function NativeAB12P31to46({page}:{page:string}){
 const W=1072, H=1449;
 const root=useRef<HTMLDivElement>(null),player=useRef<HTMLAudioElement>(null);
 const [scale,ss]=useState(.6);const key='native-ab12-'+page;
 const defaults:Record<string,string>=page==='34'?{'r4a':'einer'}:{};
 const [values,sv]=useState<Record<string,string>>(()=>{try{return {...defaults,...JSON.parse(localStorage.getItem(key)||'{}')}}catch{return {...defaults}}});
 const [results,sr]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=root.current!;const obs=new ResizeObserver(()=>ss(Math.min(el.clientWidth/W,(el.clientHeight-38)/H)));obs.observe(el);return ()=>obs.disconnect()},[]);
 usePageReset(page,key,()=>{sv({...defaults});sr({})});
 const set=(id:string,v:string)=>{const n={...values,[id]:v};sv(n);localStorage.setItem(key,JSON.stringify(n))};
 const text=(x:number,y:number,w:number,t:string,cls='')=><div className={'naText '+cls} style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const uml=(x:number,y:number,w:number,pre:string,post:string)=><div className='naText naNw naUmlRow' style={{left:x,top:y,width:w}}><Words text={pre}/><span className="naUmlWrap"><span className="naUmlMark">¨</span><Words text={post}/></span></div>;
 const stext=(x:number,y:number,w:number,t:string,st:Record<string,string|number>,cls='')=><div className={'naText '+cls} style={{left:x,top:y,width:w,...st}}><Words text={t}/></div>;
 const rect=(x:number,y:number,w:number,h:number,c:string)=><div style={{position:'absolute',left:x,top:y,width:w,height:h,background:c}}/>;
 const lin=(x:number,y:number,w:number,h:number,c:string)=><div style={{position:'absolute',left:x,top:y,width:w,height:h,background:c}}/>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="naArt" src={`assets/book-crops/native-ab12-p${page}-${name}.png`} alt={'Originalillustration '+name} style={{left:x,top:y,width:w,height:h}}/>;
 const field=(id:string,x:number,y:number,w:number,label:string,cls='')=><input className={'naField '+cls} aria-label={label} data-native-field={id} style={{left:x,top:y,width:w}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>;
 const rule=(x:number,y:number,w:number)=><div className="naRule" style={{left:x,top:y,width:w}}/>;
 const dot=(id:string,value:string,x:number,y:number,label:string,checkbox=false)=><input className="naDot" type={checkbox?'checkbox':'radio'} aria-label={label} name={key+'-'+id} checked={checkbox?values[id]==='true':values[id]===value} onChange={e=>set(id,checkbox?String(e.target.checked):value)} style={{left:x,top:y}}/>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="naCheck" data-check={id} style={{left:x,top:y}}><CheckButton onClick={()=>sr({...results,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(v=>normalize(v)===normalize(values[k]||(a==='false'?'false':''))))})}/><output aria-live="polite">{id in results?(results[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const title=(n:string,x:number,y:number,w:number,t:string,cls='')=><div className={'naTitle '+cls} style={{left:x,top:y,width:w}}><b>{n}</b><Words text={t}/></div>;
 const kb=(x:number,y:number,t:string)=><div className="naKB" style={{left:x,top:y}}>{t}</div>;
 const audio=(src:string,x:number,y:number,label:string)=><button className="naAudio" style={{left:x,top:y}} aria-label={'Originalaudio '+label+' abspielen'} onClick={()=>{if(player.current){player.current.src=src;player.current.play().catch(()=>{})}}}>▶ {label}</button>;

 return <div className="nativeAB12" ref={root} data-native-ab12={page}><style>{"@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-400.woff2') format('woff2');font-weight:400}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-700.woff2') format('woff2');font-weight:700}@font-face{font-family:DroidSerif;src:url('assets/fonts/droid-serif-400.ttf') format('truetype');font-weight:400;font-display:swap}[data-native-ab12] .naText,[data-native-ab12] .naBold,[data-native-ab12] .naLet,[data-native-ab12] .naDlg,[data-native-ab12] .naTitle,[data-native-ab12] .naField{font-family:DroidSerif,Georgia,serif!important;letter-spacing:-0.65px}[data-native-ab12] .naText,[data-native-ab12] .naBold,[data-native-ab12] .naLet,[data-native-ab12] .naDlg{font-size:20px!important}[data-native-ab12] .naTitle{font-size:21px!important}[data-native-ab12] .naText.naS20{font-size:18px!important}[data-native-ab12] .naSmall{font-size:16.5px!important}[data-native-ab12] .naD19{font-size:17.5px!important}[data-native-ab12] .naField{font-size:19px!important}[data-native-ab12] .naUrl{font-size:11.5px!important;font-family:Georgia,serif;color:#333;line-height:13px}[data-native-ab12='41'] .naModul{font:13px FiraSans,sans-serif!important;color:#fff!important;letter-spacing:0!important}[data-native-ab12='41'] .naTitle.naGB b{background:#69bb58!important}[data-native-ab12='41'] .naTitle{font-family:FiraSans,sans-serif!important;font-size:22px!important;letter-spacing:0!important}[data-native-ab12='41'] .naText,[data-native-ab12='41'] .naBold{font-size:17px!important}[data-native-ab12='41'] .naBold{font-weight:600}[data-native-ab12='41'] .naField{font-size:17px!important}[data-native-ab12='41'] .naGray{font-size:13px!important;color:#7c7c80!important;letter-spacing:0!important}[data-native-ab12='38'] .naS14{font-size:14px!important}[data-native-ab12='35'] .naFooter,[data-native-ab12='36'] .naFooter,[data-native-ab12='37'] .naFooter,[data-native-ab12='38'] .naFooter{font-family:DroidSerif,Georgia,serif!important;font-size:16.3px!important;letter-spacing:0!important;color:#252723}[data-native-ab12='36'] .naS19,[data-native-ab12='37'] .naS19{font-size:19.4px!important}[data-native-ab12='31'] .naHeadline,[data-native-ab12='32'] .naHeadline,[data-native-ab12='33'] .naHeadline,[data-native-ab12='34'] .naHeadline,[data-native-ab12='35'] .naHeadline,[data-native-ab12='36'] .naHeadline,[data-native-ab12='37'] .naHeadline,[data-native-ab12='38'] .naHeadline{font-size:30px!important;letter-spacing:0!important;color:#5f6460}[data-native-ab12='35'] .naSansB,[data-native-ab12='36'] .naSansB,[data-native-ab12='37'] .naSansB,[data-native-ab12='38'] .naSansB{font-family:FiraSans,sans-serif!important;font-weight:700;letter-spacing:0!important}[data-native-ab12='35'] .naUml,[data-native-ab12='36'] .naUml,[data-native-ab12='37'] .naUml,[data-native-ab12='38'] .naUml{font-size:72%;letter-spacing:0;margin-right:-2px}[data-native-ab12='35'] .naUmlRow{font-size:19.4px!important}[data-native-ab12='35'] .naUmlWrap{position:relative}[data-native-ab12='35'] .naUmlMark{position:absolute;left:-1px;top:5px;font-size:58%;letter-spacing:0;line-height:1}[data-native-ab12='35'] .naText:not(.naHand){color:#3d3d3d}[data-native-ab12='36'] .naF188{font-size:18.8px!important}[data-native-ab12='36'] .naF182{font-size:18.2px!important}[data-native-ab12='37'] .naF180{font-size:18px!important}[data-native-ab12='35'] .naF190{font-size:19px!important}[data-native-ab12='35'] .naMod,[data-native-ab12='36'] .naMod,[data-native-ab12='37'] .naMod,[data-native-ab12='38'] .naMod{font:13px FiraSans,sans-serif!important;color:#fff!important;letter-spacing:0!important}[data-native-ab12='38'] .naBio{font-size:17.5px!important;letter-spacing:-0.55px!important}[data-native-ab12='38'] .naJ{white-space:normal;text-align:justify;text-align-last:justify}[data-native-ab12='31'] .naTitle,[data-native-ab12='32'] .naTitle,[data-native-ab12='33'] .naTitle,[data-native-ab12='34'] .naTitle,[data-native-ab12='35'] .naTitle,[data-native-ab12='36'] .naTitle,[data-native-ab12='37'] .naTitle,[data-native-ab12='38'] .naTitle{font-family:FiraSans,sans-serif!important;letter-spacing:0!important}"}</style><div className="naCanvas" style={{width:W,height:H,transform:`translate(-50%,-50%) scale(${scale})`}}> {page==='31'&&<>
  {art('0',982,42,85,78)}
  {lin(354,107,605,6,'#a6ca03')}
  {text(107,77,240,'BASISTRAINING','naHeadline naNw')}
  {kb(78,168,'KB 6')}
  {title('5',130,160,760,'Der Fernseher ist kaputt. Schreiben Sie das Gespräch.','naGB')}
  <div className="naSide" style={{left:75,top:195}}>KOMMUNIKATION</div>
  {text(146,193,145,'Rezeptionist/in','naBold naNw')}
  {text(460,197,60,'Gast','naBold naNw')}
  {text(146,232,137,'helfen können?','naNw')}
  {art('arr-r',404,256,58,32)}
  {text(460,260,130,'Problem haben','naNw')}
  {text(460,286,150,'Fernseher kaputt','naNw')}
  {text(145,310,169,'Techniker schicken','naNw')}
  {art('arr-l',404,308,58,30)}
  {text(145,335,207,'sofort darum kümmern','naNw')}
  {art('arr-r',404,350,58,32)}
  {text(460,364,372,'Eine Bitte noch: Es gibt keine Handtücher.','naNw')}
  {art('arr-l',404,380,58,30)}
  {text(145,387,236,'sofort Handtücher bringen','naNw')}
  {art('arr-r',404,405,58,32)}
  {text(459,415,126,'Dank für Hilfe','naNw')}
  {text(697,241,240,'Kann ich Ihnen helfen?','naHand naD19 naNw')}
  {text(700,265,270,'Ja, ich habe ein Problem. ...','naHand naD19 naNw')}
  {kb(78,482,'KB 7')}
  {title('6',130,474,760,'Was ist richtig? Kreuzen Sie an.','naGB')}
  <div className="naSide" style={{left:75,top:515}}>STRUKTUREN</div>
  {text(145,516,8,'a','naNw')}
  {text(169,516,114,'Peter möchte','naNw')}
  {text(327,516,101,'nach einem','naNw')}
  {text(472,516,55,'für ein','naNw')}
  {text(549,516,267,'Jahr nach Japan gehen. Er hat','naNw')}
  {text(860,516,41,'nach','naNw')}
  {text(193,543,99,'vor einem','naNw')}
  {text(298,543,393,'Jahr schon ein Praktikum in Japan gemacht.','naNw')}
  {text(143,567,10,'b','naNw')}
  {text(168,567,116,'Anne möchte','naNw')}
  {text(328,567,26,'für','naNw')}
  {text(398,567,525,'nach ihrem Medizinstudium in Afrika als Ärztin arbeiten.','naNw')}
  {text(144,593,165,'c Barbara beginnt','naNw')}
  {text(353,593,41,'nach','naNw')}
  {text(439,593,318,'in drei Monaten mit dem Studium.','naNw')}
  {text(144,618,117,'d Moritz hat','naNw')}
  {text(304,618,17,'in','naNw')}
  {text(364,618,28,'vor','naNw')}
  {text(410,618,477,'einem halben Jahr mit seinem Ingenieur-Studium an-','naNw')}
  {text(166,642,84,'gefangen.','naNw')}
  {text(296,642,18,'In','naNw')}
  {text(359,642,524,'Für vier Jahren ist er fertig. Dann möchte er gern in einer','naNw')}
  {text(167,670,167,'Autofirma arbeiten.','naNw')}
  {text(144,697,144,'e Maria möchte','naNw')}
  {text(333,697,84,'nach dem','naNw')}
  {text(461,697,380,'für den Deutschkurs die Prüfung machen.','naNw')}
  {dot('6a1','nach einem',299,522,'6 a (1) nach einem')}
  {dot('6a1','für ein',450,522,'6 a (1) für ein')}
  {dot('6a2','nach',832,523,'6 a (2) nach')}
  {dot('6a2','vor',162,546,'6 a (2) vor')}
  {dot('6b','für',300,575,'6 b für')}
  {dot('6b','nach',362,575,'6 b nach')}
  {dot('6c','nach',324,597,'6 c nach')}
  {dot('6c','in',409,597,'6 c in')}
  {dot('6d1','in',277,621,'6 d (1) in')}
  {dot('6d1','vor',335,623,'6 d (1) vor')}
  {dot('6d2','In',265,649,'6 d (2) In')}
  {dot('6d2','Für',331,649,'6 d (2) Für')}
  {dot('6e','nach dem',305,702,'6 e nach dem')}
  {dot('6e','für den',433,702,'6 e für den')}
  {check('31-1',888,700,{'6a1':'für ein','6a2':'vor','6b':'nach','6c':'in','6d1':'vor','6d2':'In','6e':'nach dem'})}
  {kb(78,783,'KB 7')}
  {title('7',130,775,760,'Akkusativ oder Dativ? Ergänzen Sie.','naGB')}
  <div className="naSide" style={{left:75,top:815}}>STRUKTUREN</div>
  {text(143,812,155,'a für eine Woche','naNw')}
  {text(432,812,67,'d vor d','naNw')}
  {text(557,812,66,'Sitzung','naNw')}
  {text(720,812,77,'g in ein','naNw')}
  {text(854,812,57,'Woche','naNw')}
  {text(142,837,77,'b in ein','naNw')}
  {text(267,837,65,'Monat','naNw')}
  {text(432,837,80,'e für ein','naNw')}
  {text(565,837,65,'Monat','naNw')}
  {text(721,837,84,'h vor ein','naNw')}
  {text(862,837,39,'Jahr','naNw')}
  {text(143,862,99,'c nach ein','naNw')}
  {text(300,862,60,'Stunde','naNw')}
  {text(432,862,82,'f nach d','naNw')}
  {text(572,862,39,'Kurs','naNw')}
  {field('p31-7b',218,842,51,'7b')}
  {field('p31-7c',242,863,52,'7c')}
  {field('p31-7d',483,813,125,'7d')}
  {field('p31-7e',515,843,50,'7e')}
  {field('p31-7f',515,863,53,'7f')}
  {field('p31-7g',800,814,50,'7g')}
  {field('p31-7h',808,844,50,'7h')}
  {check('31-2',908,856,{'p31-7b':'em','p31-7c':'er','p31-7d':'er','p31-7e':'en','p31-7f':'em','p31-7g':'er','p31-7h':'em'})}
  {kb(78,945,'KB 7')}
  {title('8',130,937,760,'Im Chatroom. Ordnen Sie zu.','naGB')}
  <div className="naSide" style={{left:75,top:975}}>STRUKTUREN</div>
  {stext(140,980,28,'am',{color:'#2a4f9e',textDecoration:'line-through'},'naOpt naSmall naNw')}
  {text(173,980,10,'|','naOpt naNw')}
  {stext(187,980,24,'um',{color:'#7a8f0a'},'naOpt naNw')}
  {text(216,980,10,'|','naOpt naNw')}
  {stext(226,980,40,'nach',{color:'#7a8f0a'},'naOpt naNw')}
  {text(268,980,10,'|','naOpt naNw')}
  {stext(278,980,28,'am',{color:'#2a4f9e'},'naOpt naSmall naNw')}
  {text(308,980,10,'|','naOpt naNw')}
  {stext(316,980,26,'vor',{color:'#7a8f0a'},'naOpt naNw')}
  {text(348,980,10,'|','naOpt naNw')}
  {stext(357,980,24,'um',{color:'#7a8f0a'},'naOpt naNw')}
  {text(386,980,10,'|','naOpt naNw')}
  {stext(395,980,80,'von ... bis',{color:'#2a4f9e'},'naOpt naNw')}
  {text(478,980,10,'|','naOpt naNw')}
  {stext(493,980,40,'nach',{color:'#2a4f9e'},'naOpt naNw')}
  {art('chat',124,1032,878,304)}
  {stext(153,1056,60,'siri99:',{color:'#6e7fa0',fontWeight:'bold'},'naSmall naNw')}
  {text(242,1059,185,'Hi Jule, was machst du','naSmall naNw')}
  {stext(430,1062,22,'am',{color:'#2a4f9e'},'naOpt naNw')}
  {text(462,1059,20,'(a)','naSmall naNw')}
  {text(485,1059,288,'Freitag? Sehen wir uns mal wieder?','naSmall naNw')}
  {stext(153,1085,65,'Jule_m:',{color:'#b03a2e',fontWeight:'bold'},'naSmall naNw')}
  {text(241,1085,226,'Gern. Am Freitag arbeite ich','naSmall naNw')}
  {text(572,1085,62,'(b) acht','naSmall naNw')}
  {text(738,1085,134,'(c) zwei Uhr und','naSmall naNw')}
  {text(337,1109,300,'(d) der Arbeit gehe ich zum Arzt. Aber','naSmall naNw')}
  {text(740,1111,192,'(e) Abend habe ich Zeit.','naSmall naNw')}
  {stext(153,1136,60,'siri99:',{color:'#6e7fa0',fontWeight:'bold'},'naSmall naNw')}
  {text(240,1137,590,'Gehen wir ins Kino? In den neuen Film mit Angelina Jolie? Hast du Lust?','naSmall naNw')}
  {text(337,1161,112,'(f) 20:30 Uhr?','naSmall naNw')}
  {stext(153,1187,65,'Jule_m:',{color:'#b03a2e',fontWeight:'bold'},'naSmall naNw')}
  {text(240,1188,174,'Gute Idee. Wollen wir','naSmall naNw')}
  {text(517,1188,405,'(g) dem Kino noch etwas zusammen essen? Komm','naSmall naNw')}
  {text(240,1213,37,'doch','naSmall naNw')}
  {text(381,1214,347,'(h) sieben Uhr zu mir. Ich koche etwas und','naSmall naNw')}
  {text(832,1214,57,'(i) dem','naSmall naNw')}
  {text(241,1240,300,'Essen fahren wir zusammen ins Kino.','naSmall naNw')}
  {stext(153,1265,60,'siri99:',{color:'#6e7fa0',fontWeight:'bold'},'naSmall naNw')}
  {text(240,1265,360,'Super! Das ist sehr nett von dir. Bis morgen.','naSmall naNw')}
  {field('p31-8b',482,1082,84,'8b')}
  {field('p31-8c',650,1083,82,'8c')}
  {field('p31-8d',152,1106,178,'8d')}
  {field('p31-8e',642,1108,93,'8e')}
  {field('p31-8f',245,1158,87,'8f')}
  {field('p31-8g',420,1185,90,'8g')}
  {field('p31-8h',285,1209,90,'8h')}
  {field('p31-8i',734,1212,92,'8i')}
  {check('31-3',152,1344,{'p31-8b':'von','p31-8c':'bis','p31-8d':'Nach|nach','p31-8e':'am','p31-8f':'Um|um','p31-8g':'vor','p31-8h':'um','p31-8i':'nach'})}
  {text(815,1389,162,'einunddreißig | 31','naFooter')}
  {art('modul-tab',988,1384,80,32)}
 </>}
 {page==='32'&&<>
  {art('1',122,224,820,129)}
  {art('2',108,772,830,130)}
  {rect(166,740,800,44,'#faf9ce')}
  {lin(376,108,607,5,'#bdd444')}
  {lin(232,940,274,2,'#c4c4ce')}
  {lin(192,964,665,2,'#c2c3c6')}
  {lin(192,991,665,2,'#c2c3c6')}
  {lin(192,1018,665,2,'#c2c3c6')}
  {lin(192,1045,665,2,'#c2c3c6')}
  {lin(192,1072,665,2,'#c2c3c6')}
  {lin(192,1097,665,2,'#c2c3c6')}
  {text(128,78,241,'BASISTRAINING','naHeadline naNw')}
  {kb(80,163,'KB 8')}
  {title('9',130,158,760,'Einen Termin verschieben.','naGB')}
  <div className="naSide" style={{left:87,top:208,color:'#879cbb'}}>SCHREIBEN</div>
  {stext(136,199,14,'a',{color:'#4357ad'},'naBold naNw')}
  {text(169,195,210,'Ergänzen Sie die E-Mail.','naBold naNw')}
  {text(195,371,190,'Sehr geehrte Frau Winter,','naNw')}
  {text(195,397,45,'leider','naNw')}
  {text(195,421,310,'(heute um 16 Uhr nicht kommen können)','naNw')}
  {text(195,444,660,'Wir haben ein Problem mit der Internetverbindung in der Firma und ich warte auf den','naNw')}
  {text(194,469,80,'Techniker.','naNw')}
  {text(195,493,220,'(Termin verschieben können)','naNw')}
  {text(196,531,170,'(Mittwoch Zeit haben)','naNw')}
  {text(196,566,310,'(ab Freitag für eine Woche im Urlaub sein)','naNw')}
  {text(196,603,185,'Mit freundlichen Grüßen','naNw')}
  {text(196,626,70,'Peter Frei','naNw')}
  {stext(135,698,14,'b',{color:'#4357ad'},'naBold naNw')}
  {text(165,699,265,'Antworten Sie auf die E-Mail.','naBold naNw')}
  {stext(171,739,800,'kein Problem | natürlich Termin verschieben können | Mittwoch Zeit haben | passt 15 Uhr? | Grüße',{color:'#56617d'},'naSmall naNw')}
  {text(165,920,42,'Sehr','naNw')}
  {text(508,920,14,',','naNw')}
  {kb(80,1138,'KB 8')}
  {title('10',126,1140,780,'Hören Sie das Telefongespräch und ordnen Sie zu.','naGB')}
  <div className="naSide" style={{left:92,top:1196,color:'#879cbb'}}>HÖREN</div>
  {audio('assets/ab-a12-cd2-track15.mp3',64,1170,'2 15')}
  <svg style={{position:'absolute',left:0,top:0,pointerEvents:'none'}} width="1072" height="1452"><path d="M283 1179 C 360 1182, 412 1240, 500 1253" stroke="#8ba3c7" strokeWidth="1.6" fill="none"/></svg>
  {text(110,1170,14,'a','naBold naNw')}{text(140,1170,150,'Heute um elf','naNw')}
  {text(110,1195,14,'b','naBold naNw')}{text(140,1195,150,'In zwei Stunden','naNw')}
  {text(110,1220,14,'c','naBold naNw')}{text(140,1220,210,'Am Donnerstag um drei','naNw')}
  {text(110,1247,14,'d','naBold naNw')}{text(140,1247,170,'Nach der Sitzung','naNw')}
  {text(110,1272,14,'e','naBold naNw')}{text(140,1272,120,'Am Freitag','naNw')}
  {text(110,1297,14,'f','naBold naNw')}{text(140,1297,120,'Stefan hat','naNw')}
  {text(505,1170,400,'muss Stefan Kollegen am Flughafen abholen.','naNw')}
  {text(505,1195,300,'hat Nina eine Sitzung.','naNw')}
  {text(505,1220,300,'am Freitag um 14.30 Uhr Zeit.','naNw')}
  {text(505,1247,300,'hat Stefan keine Zeit.','naNw')}
  {text(505,1272,320,'muss Nina einen Kollegen anrufen.','naNw')}
  {text(505,1297,340,'hat Nina nach dem Mittagessen Zeit.','naNw')}
  {art('modul-tab',0,1384,82,32)}
  {text(97,1392,176,'32 | zweiunddreißig','naFooter')}
  {field('p32-9a1',245,393,660,'9a1')}
  {text(910,404,16,'.','naNw')}
  {field('p32-9a2',283,463,622,'9a2')}
  {text(910,474,16,'?','naNw')}
  {field('p32-9a3',195,503,710,'9a3')}
  {text(910,518,16,'?','naNw')}
  {field('p32-9a4',195,547,710,'9a4')}
  {text(910,560,16,'.','naNw')}
  {field('p32-9b',232,913,274,'9b')}
  {check('32-1',700,1110,{'p32-9a1':'kann ich heute um 16 Uhr nicht kommen','p32-9a2':'Können wir den Termin verschieben','p32-9a3':'Haben Sie am Mittwoch Zeit','p32-9a4':'Ab Freitag bin ich für eine Woche im Urlaub','p32-9b':'geehrter Herr Frei'})}
 </>}
 {page==='33'&&<>
  {art('0',982,44,85,78)}
  {art('cards',55,265,925,118)}
  {art('board',60,712,900,213)}
  {art('16',640,1225,318,71)}
  {art('modul-tab',1000,1384,71,32)}
  {lin(444,112,516,3,'#b3d33f')}
  {rect(140,377,790,7,'#c89b20')}
  {rect(140,384,13,54,'#c89b20')}
  <div className="naSide" style={{left:136,top:390,fontSize:11,letterSpacing:1,color:'#5a4a10'}}>Tipp</div>
  {lin(675,1022,286,2,'#bcd43c')}
  {text(106,84,331,'TRAINING: SPRECHEN','naHeadline naNw')}
  {title('1',109,162,640,'Wie bittet man um Hilfe? Was antwortet man?','naGB')}
  {text(147,198,781,'Schreiben Sie Bitten auf gelbe Kärtchen und Antworten auf blaue Kärtchen. (Hilfe finden','naNw')}
  {text(147,223,280,'Sie in den Lektionen 13 und 16.)','naNw')}
  {text(190,392,726,'Sie möchten besser sprechen? Lernen Sie die Fragen und Sätze in der Rubrik Kommunikation','naNw')}
  {text(190,414,639,'auf der 4. Seite jeder Lektion auswendig. Sie helfen Ihnen in vielen Situationen.','naNw')}
  {title('2',105,484,850,'Spiel: Bitten Sie eine Mitspielerin / einen Mitspieler. Sie/Er antwortet.','naGB')}
  {text(149,510,395,'Die Kärtchen in 1 können Ihnen helfen.','naBold naNw')}
  {stext(168,549,130,'Spielanleitung:',{color:'#3a6ab0'},'naS20 naBold naNw')}
  {stext(300,549,544,'Stellen Sie Ihre Spielfigur auf ein Feld und würfeln Sie. Ziehen Sie mit Ihrer',{color:'#3a6ab0'},'naS20 naNw')}
  {stext(168,574,685,'Spielfigur. Formulieren Sie Bitten. Ist die Bitte richtig, bekommen Sie zwei Punkte. Spielen Sie',{color:'#3a6ab0'},'naS20 naNw')}
  {stext(168,600,318,'zehn Minuten. Wer hat die meisten Punkte?',{color:'#3a6ab0'},'naS20 naNw')}
  {stext(145,644,16,'■',{color:'#1a3f9e'},'naNw')}
  {text(171,644,680,'Entschuldigung, können Sie mir helfen? Die Klimaanlage funktioniert nicht.','naNw')}
  {stext(145,678,16,'▲',{color:'#2eb75b'},'naNw')}
  {text(171,678,625,'Das tut mir leid. Ich kümmere mich sofort darum.','naNw')}
  {stext(106,1001,380,'TRAINING: AUSSPRACHE',{fontSize:27,letterSpacing:2,color:'#4a4a45',fontFamily:'Georgia'},'naNw')}
  {stext(498,1003,175,'Vokale: „o“ und „u“',{color:'#787a68'},'naS20 naNw')}
  {audio('assets/ab-a12-cd2-track16.mp3',42,1092,'CD2 · Track16')}
  {title('1',109,1064,400,'Sie hören jeweils vier Wörter.','naGB naNw')}
  {audio('assets/ab-a12-cd2-track17.mp3',573,1064,'CD2 · Track17')}
  {text(680,1060,288,'Hören Sie und sprechen Sie nach.','naBold naNw')}
  {text(146,1099,422,'Wie oft hören Sie „o“, wie oft „u“? Notieren Sie.','naNw')}
  {text(147,1128,8,'1','naNw')}
  {text(170,1128,10,'o','naNw')}
  {text(190,1126,40,'2t','naHand naD19 naNw')}
  {text(258,1126,40,'2t','naHand naD19 naNw')}
  {lin(184,1147,48,2,'#9aa3ab')}
  {text(238,1128,10,'u','naNw')}
  {lin(252,1147,48,2,'#9aa3ab')}
  {text(356,1128,8,'3','naNw')}
  {text(378,1128,10,'o','naNw')}
  {lin(392,1147,48,2,'#9aa3ab')}
  {text(447,1128,10,'u','naNw')}
  {lin(460,1147,48,2,'#9aa3ab')}
  {text(148,1153,8,'2','naNw')}
  {text(170,1153,10,'o','naNw')}
  {lin(184,1172,48,2,'#9aa3ab')}
  {text(239,1153,10,'u','naNw')}
  {lin(252,1172,48,2,'#9aa3ab')}
  {text(355,1153,8,'4','naNw')}
  {text(378,1153,10,'o','naNw')}
  {lin(392,1172,48,2,'#9aa3ab')}
  {text(446,1153,10,'u','naNw')}
  {lin(459,1172,48,2,'#9aa3ab')}
  {title('3',601,1129,390,'Schreiben Sie kurze Gespräche mit','naGB naNw')}
  {text(639,1148,132,'den Wörtern aus','naBold naNw')}
  {stext(809,1148,12,'2',{color:'#2a4f9e'},'naBold naNw')}
  {text(828,1148,130,'und sprechen','naBold naNw')}
  {text(639,1173,220,'Sie auch vor dem Spiegel.','naBold naNw')}
  {title('2',109,1231,400,'Ergänzen Sie „o“ oder „u“.','naGB')}
  {text(148,1273,16,'Pr','naNw')}
  {text(204,1273,80,'blem – H','naNw')}
  {text(323,1273,62,'tel – M','naNw')}
  {text(424,1273,16,'se','naNw')}
  {text(481,1273,34,'m –','naNw')}
  {text(149,1298,12,'M','naNw')}
  {text(204,1298,60,'sik – D','naNw')}
  {text(302,1298,105,'sche – Telef','naNw')}
  {text(431,1298,75,'n – Aufz','naNw')}
  {text(542,1298,28,'g –','naNw')}
  {text(149,1323,12,'M','naNw')}
  {text(204,1323,46,'nat –','naNw')}
  {text(294,1323,73,'hr – Kin','naNw')}
  {text(428,1323,55,'– Handt','naNw')}
  {text(521,1323,32,'ch','naNw')}
  {text(813,1389,169,'dreiunddreißig | 33','naFooter')}
  {field('p33-a2_1',166,1271,39,'Lücke 1')}
  {field('p33-a2_2',283,1271,38,'Lücke 2')}
  {field('p33-a2_3',362,1271,26,'Lücke 3')}
  {field('p33-a2_4',441,1271,38,'Lücke 4')}
  {field('p33-a2_5',164,1296,37,'Lücke 5')}
  {field('p33-a2_6',263,1296,36,'Lücke 6')}
  {field('p33-a2_7',405,1296,24,'Lücke 7')}
  {field('p33-a2_8',505,1296,34,'Lücke 8')}
  {field('p33-a2_9',166,1321,36,'Lücke 9')}
  {field('p33-a2_10',254,1321,36,'Lücke 10')}
  {field('p33-a2_11',367,1321,37,'Lücke 11')}
  {field('p33-a2_12',482,1321,36,'Lücke 12')}
  {check('33-1',166,1356,{'p33-a2_1':'o','p33-a2_2':'o','p33-a2_3':'u','p33-a2_4':'u','p33-a2_5':'u','p33-a2_6':'u','p33-a2_7':'o','p33-a2_8':'u','p33-a2_9':'o','p33-a2_10':'u','p33-a2_11':'o','p33-a2_12':'u'})}
 </>}
 {page==='34'&&<>
  {stext(128,76,130,'TEST',{fontSize:30,letterSpacing:5,color:'#6e6e68',fontFamily:'Georgia'},'naNw')}
  {lin(206,108,778,4,'#c2dc46')}
  {title('1',120,148,400,'Im Hotel. Ergänzen Sie.','naGB naNw')}
  <div className="naSide" style={{left:88,top:196,color:'#94a3c0'}}>WÖRTER</div>
  {text(170,196,760,'Das Hotel ist 150 Jahre alt. Es hat 45 Zimmer auf vier Stockwerken, aber leider keinen','naNw')}
  {text(169,221,21,'(a)','naNw')}
  {lin(197,240,48,2,'#9aa3ab')}
  {text(193,219,60,'Aufzug','naHand naD19 naNw')}
  {text(252,221,181,'(FUGAZU) und keine','naNw')}
  {text(456,221,22,'(b)','naNw')}
  {text(699,221,278,'(ALGALENMIAK). Im Erdgeschoss','naNw')}
  {text(169,247,258,'stehen zwei Computer mit (c)','naNw')}
  {text(738,247,237,'(DEBTGVIRENTURNENIN).','naNw')}
  {text(167,273,246,'Jedes Zimmer hat ein Radio','naNw')}
  {text(428,273,118,'und einen (d)','naNw')}
  {text(759,273,127,'(RENFEHESR).','naNw')}
  {text(169,299,248,'In jedem Bad gibt es eine (e)','naNw')}
  {text(611,299,236,'(SHEDUC) und einen Föhn.','naNw')}
  {stext(895,300,92,'_/4 Punkte',{fontStyle:'italic',fontSize:15,color:'#7a7a72',fontFamily:'Georgia'},'naNw')}
  {title('2',120,361,400,'Ergänzen Sie.','naGB naNw')}
  <div className="naSide" style={{left:88,top:407,color:'#94a3c0'}}>WÖRTER</div>
  {text(168,402,334,'a Das Radio funktioniert nicht, es ist','naNw')}
  {text(508,402,10,'k','naNw')}
  {stext(523,408,85,'aputt',{fontSize:13.5,lineHeight:'14px'},'naHand naD19 naNw')}
  {stext(580,408,4,'.',{fontSize:13.5,lineHeight:'14px'},'naHand naD19 naNw')}
  {text(167,428,350,'b Er kommt immer zu spät, er ist nie p','naNw')}
  {text(666,428,4,'.','naNw')}
  {text(168,455,351,'c Der Deutschkurs ist nicht langweilig,','naNw')}
  {text(527,455,55,'er ist l','naNw')}
  {text(690,455,4,'.','naNw')}
  {text(168,480,294,'d Heute ist es nicht heiß, es ist k','naNw')}
  {text(524,480,2,'.','naNw')}
  {stext(895,481,92,'_/3 Punkte',{fontStyle:'italic',fontSize:15,color:'#7a7a72',fontFamily:'Georgia'},'naNw')}
  {title('3',120,538,430,'Ergänzen Sie für, vor, nach und in.','naGB naNw')}
  <div className="naSide" style={{left:88,top:584,color:'#94a3c0'}}>STRUKTUREN</div>
  {stext(166,592,16,'■',{color:'#1a3f9e'},'naNw')}
  {text(191,592,355,'Wann bist du mit der Ausbildung fertig?','naNw')}
  {stext(601,592,16,'■',{color:'#1a3f9e'},'naNw')}
  {text(626,592,314,'Warst du schon einmal in England?','naNw')}
  {stext(166,618,16,'▲',{color:'#2eb75b'},'naNw')}
  {lin(183,637,24,2,'#9aa3ab')}
  {text(181,616,34,'In','naHand naD19 naNw')}
  {text(208,618,130,'(a) einem Jahr.','naNw')}
  {stext(601,618,16,'▲',{color:'#2eb75b'},'naNw')}
  {text(625,618,23,'Ja,','naNw')}
  {text(739,618,139,'(d) fünf Jahren.','naNw')}
  {stext(166,645,16,'■',{color:'#1a3f9e'},'naNw')}
  {text(191,645,170,'Und was machst du','naNw')}
  {text(452,645,56,'(b) der','naNw')}
  {stext(601,645,16,'■',{color:'#1a3f9e'},'naNw')}
  {text(626,645,210,'Wie hat es dir gefallen?','naNw')}
  {text(190,672,107,'Ausbildung?','naNw')}
  {stext(601,672,16,'▲',{color:'#2eb75b'},'naNw')}
  {text(627,672,113,'Es war super.','naNw')}
  {text(831,672,74,'(e) sechs','naNw')}
  {stext(166,698,16,'▲',{color:'#2eb75b'},'naNw')}
  {text(191,698,72,'Ich gehe','naNw')}
  {text(354,698,168,'(c) zwei Jahre nach','naNw')}
  {text(626,698,282,'Monaten habe ich wirklich sehr','naNw')}
  {text(191,725,69,'London.','naNw')}
  {text(625,725,219,'gut Englisch gesprochen.','naNw')}
  {stext(895,725,92,'_/4 Punkte',{fontStyle:'italic',fontSize:15,color:'#7a7a72',fontFamily:'Georgia'},'naNw')}
  {title('4',120,771,400,'Was ist richtig? Kreuzen Sie an.','naGB naNw')}
  <div className="naSide" style={{left:88,top:820,color:'#94a3c0'}}>STRUKTUREN</div>
  {text(166,816,8,'a','naNw')}
  {text(191,816,190,'Die U-Bahn kommt in','naNw')}
  {text(430,816,46,'einer','naNw')}
  {text(520,816,49,'einen','naNw')}
  {text(613,816,140,'einem Minute.','naNw')}
  {text(166,840,8,'b','naNw')}
  {text(191,840,55,'Nach','naNw')}
  {text(276,840,27,'das','naNw')}
  {text(348,840,28,'der','naNw')}
  {text(421,840,163,'dem Deutschkurs','naNw')}
  {text(591,840,231,'fährt Isabella in die Stadt.','naNw')}
  {text(166,868,8,'c','naNw')}
  {text(189,868,115,'Yakub ist vor','naNw')}
  {text(347,868,46,'einer','naNw')}
  {text(436,868,49,'einen','naNw')}
  {text(529,868,54,'einem','naNw')}
  {text(600,868,87,'Jahr nach','naNw')}
  {text(695,868,214,'Deutschland gekommen.','naNw')}
  {text(166,893,341,'d Christiane braucht das Auto nur für','naNw')}
  {text(556,893,27,'ein','naNw')}
  {text(627,893,49,'einen','naNw')}
  {text(719,893,88,'eine Tag.','naNw')}
  {stext(895,894,92,'_/3 Punkte',{fontStyle:'italic',fontSize:15,color:'#7a7a72',fontFamily:'Georgia'},'naNw')}
  {title('5',120,952,400,'Ergänzen Sie das Gespräch.','naGB naNw')}
  <div className="naSide" style={{left:88,top:1002,color:'#94a3c0'}}>KOMMUNIKATION</div>
  {stext(171,994,430,'Das ist | Was kann | Es gibt | Ich kümmere | Das tut',{color:'#5f5f8c'},'naBold naNw')}
  {stext(166,1036,16,'■',{color:'#1a3f9e'},'naNw')}
  {text(188,1036,207,'Können Sie mir helfen?','naNw')}
  {stext(166,1062,16,'▲',{color:'#2eb75b'},'naNw')}
  {text(210,1062,45,'Ja gern.','naNw')}
  {text(528,1062,163,'(1) ich für Sie tun?','naNw')}
  {stext(166,1088,16,'■',{color:'#1a3f9e'},'naNw')}
  {text(452,1088,256,'(2) keine Seife in der Dusche.','naNw')}
  {stext(166,1113,16,'▲',{color:'#2eb75b'},'naNw')}
  {text(188,1113,99,'Wie dumm!','naNw')}
  {text(559,1113,103,'(3) mir leid.','naNw')}
  {text(452,1140,198,'(4) mich sofort darum.','naNw')}
  {stext(166,1165,16,'■',{color:'#1a3f9e'},'naNw')}
  {text(451,1165,232,'(5) sehr nett. Vielen Dank!','naNw')}
  {stext(895,1166,92,'_/5 Punkte',{fontStyle:'italic',fontSize:15,color:'#7a7a72',fontFamily:'Georgia'},'naNw')}
  {art('score',140,1205,560,143)}
  {text(444,1365,223,'www.hueber.de/menschen/lernen','naUrl')}
  {art('modul-tab',10,1382,74,38)}
  {text(98,1386,172,'34 | vierunddreißig','naFooter')}
  {field('p34-1b',484,217,193,'1 (b)')}
  {field('p34-1c',433,242,299,'1 (c)')}
  {field('p34-1d',544,269,209,'1 (d)')}
  {field('p34-1e',423,294,182,'1 (e)')}
  {field('p34-2b',520,425,140,'2 b: p...')}
  {field('p34-2c',584,451,100,'2 c: l...')}
  {field('p34-2d',464,476,56,'2 d: k...')}
  {field('p34-3b',380,640,66,'3 (b)')}
  {field('p34-3c',284,693,66,'3 (c)')}
  {field('p34-3d',668,617,66,'3 (d)')}
  {field('p34-3e',752,671,73,'3 (e)')}
  {dot('r4a','einer',403,821,'4a einer')}
  {dot('r4a','einen',493,821,'4a einen')}
  {dot('r4a','einem',586,821,'4a einem')}
  {dot('r4b','das',251,845,'4b das')}
  {dot('r4b','der',322,845,'4b der')}
  {dot('r4b','dem',394,845,'4b dem')}
  {dot('r4c','einer',320,872,'4c einer')}
  {dot('r4c','einen',409,872,'4c einen')}
  {dot('r4c','einem',502,872,'4c einem')}
  {dot('r4d','ein',529,898,'4d ein')}
  {dot('r4d','einen',600,898,'4d einen')}
  {dot('r4d','eine',692,898,'4d eine')}
  {field('p34-5-1',263,1057,259,'5 (1)')}
  {field('p34-5-2',190,1083,256,'5 (2)')}
  {field('p34-5-3',295,1109,258,'5 (3)')}
  {field('p34-5-4',190,1135,256,'5 (4)')}
  {field('p34-5-5',190,1160,255,'5 (5)')}
  {check('34-1',1000,148,{'p34-1b':'Klimaanlage','p34-1c':'Internetverbindung','p34-1d':'Fernseher','p34-1e':'Dusche'})}
  {check('34-2',1000,361,{'p34-2b':'ünktlich|pünktlich','p34-2c':'ustig|lustig','p34-2d':'alt|kalt'})}
  {check('34-3',1000,538,{'p34-3b':'nach','p34-3c':'für','p34-3d':'vor','p34-3e':'nach|Nach'})}
  {check('34-4',1000,771,{'r4a':'einer','r4b':'dem','r4c':'einem','r4d':'einen'})}
  {check('34-5',1000,952,{'p34-5-1':'Was kann','p34-5-2':'Es gibt','p34-5-3':'Das tut','p34-5-4':'Ich kümmere','p34-5-5':'Das ist'})}
 </>}
 {page==='35'&&<>
  {art('0',934,36,133,1358)}
  {art('3',372,1240,165,77)}
  {art('tv',576,1246,224,78)}
  {lin(1063,0,8,1104,'#aeb7b2')}
  <div style={{position:'absolute',left:395,top:112,width:480,height:3,background:'linear-gradient(90deg,#afd019,#d7e98c)'}}/>
  {lin(317,249,191,2,'#d9dae0')}
  {lin(677,250,196,2,'#d9dae0')}
  {lin(317,300,191,2,'#d9dae0')}
  {lin(676,301,197,2,'#d9dae0')}
  {lin(316,326,192,2,'#d9dae0')}
  {lin(317,352,191,2,'#d9dae0')}
  {lin(676,353,197,2,'#d9dae0')}
  {lin(317,377,191,2,'#d9dae0')}
  {lin(677,378,196,2,'#d9dae0')}
  {lin(317,403,191,2,'#d9dae0')}
  {lin(317,429,191,2,'#d9dae0')}
  {lin(677,443,196,2,'#d9dae0')}
  {lin(677,469,196,2,'#d9dae0')}
  {lin(317,480,191,2,'#d9dae0')}
  {lin(330,506,178,2,'#d9dae0')}
  {lin(676,520,197,2,'#d9dae0')}
  {lin(676,546,197,2,'#d9dae0')}
  {lin(316,558,192,2,'#d9dae0')}
  {lin(676,572,197,2,'#d9dae0')}
  {lin(316,584,192,2,'#d9dae0')}
  {lin(676,597,197,2,'#d9dae0')}
  {lin(317,648,191,2,'#d9dae0')}
  {lin(676,648,197,2,'#d9dae0')}
  {lin(316,674,192,2,'#d9dae0')}
  {lin(676,700,197,2,'#d9dae0')}
  {lin(316,725,192,2,'#d9dae0')}
  {lin(676,751,197,2,'#d9dae0')}
  {lin(316,777,192,2,'#d9dae0')}
  {lin(676,803,197,2,'#d9dae0')}
  {lin(316,828,192,2,'#d9dae0')}
  {lin(676,828,197,2,'#d9dae0')}
  {lin(316,880,192,2,'#d9dae0')}
  {lin(676,880,197,2,'#d9dae0')}
  {lin(675,906,198,2,'#d9dae0')}
  {lin(316,931,192,2,'#d9dae0')}
  {lin(676,931,197,2,'#d9dae0')}
  {lin(315,957,193,2,'#d9dae0')}
  {lin(675,957,198,2,'#d9dae0')}
  {lin(315,983,193,2,'#d9dae0')}
  {lin(675,984,198,2,'#d9dae0')}
  {lin(675,1009,198,2,'#d9dae0')}
  {lin(675,1034,198,2,'#d9dae0')}
  {lin(316,1047,192,2,'#d9dae0')}
  {lin(675,1061,198,2,'#d9dae0')}
  {lin(315,1072,193,2,'#d9dae0')}
  {lin(675,1086,198,2,'#d9dae0')}
  {lin(315,1124,193,2,'#d9dae0')}
  {lin(675,1138,198,2,'#d9dae0')}
  {lin(315,1176,193,2,'#d9dae0')}
  {lin(1068,1181,2,181,'#7a7a7a')}
  {lin(143,1196,274,6,'#cfaa3f')}
  {lin(143,1196,15,88,'#cfaa3f')}
  <div style={{position:'absolute',left:146,top:1232,writingMode:'vertical-rl',fontSize:9,fontWeight:700,color:'#8a3b2e',fontFamily:'Arial,sans-serif'}}>TIPP</div>
  {text(106,81,281,'LERNWORTSCHATZ','naHeadline naNw')}
  {title('1',99,157,700,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.','naGB')}
  {text(146,198,81,'Im Hotel','naBold naNw')}
  {text(531,198,145,'verschieben, hat','naNw')}
  {text(146,223,110,'Aufzug der,','naNw naUmlRow naF190')}{art('umlmark',249,231,10,9)}{text(256,223,12,'e','naNw naUmlRow')}
  {text(543,223,98,'verschoben','naNw')}
  {stext(156,251,133,'CH/A: Lift der, -e',{color:'#8e9094'},'naNw')}
  {text(532,251,97,'passen, hat','naNw')}
  {text(146,275,122,'Dusche die, -n','naNw')}
  {text(542,275,63,'gepasst','naNw')}
  {text(146,301,136,'Fernseher der, -','naNw')}
  {text(544,301,105,'Passt es dir/','naNw')}
  {text(146,326,134,'Föhn der, -e / -s','naNw')}
  {text(544,326,61,'Ihnen?','naNw')}
  {text(146,352,85,'Gast der,','naNw naUmlRow')}{art('umlmark',224,360,10,9)}{text(232,352,12,'e','naNw naUmlRow')}
  {text(532,352,85,'pünktlich','naNw')}
  {text(146,378,135,'Handtuch das,','naNw naUmlRow')}{art('umlmark',276,386,10,9)}{text(284,378,20,'er','naNw naUmlRow')}
  {text(531,393,229,'Weitere wichtige Wörter','naSansB naNw')}
  {text(146,404,142,'Heizung die, -en','naNw')}
  {text(532,418,95,'Angst die,','naNw naUmlRow')}{art('umlmark',623,426,10,9)}{text(630,418,12,'e','naNw naUmlRow')}
  {text(146,432,109,'Klimaanlage','naNw')}
  {text(157,458,54,'die, -n','naNw')}
  {text(543,444,107,'Angst haben','naNw')}
  {text(533,470,166,'Kurs der, -e (Tanz-/','naNw')}
  {text(145,483,172,'Verbindung die, -en','naNw')}
  {text(157,510,140,'die Internetver-','naNw')}
  {text(543,495,123,'Spanischkurs)','naNw')}
  {text(532,521,84,'Leben das','naNw')}
  {text(156,536,74,'bindung','naNw')}
  {text(145,560,113,'Wecker der, -','naNw')}
  {text(531,547,136,'Sitzung die, -en','naNw')}
  {text(531,573,121,'Stunde die, -n','naNw')}
  {text(145,597,120,'Beschwerden','naBold naNw')}
  {text(542,597,80,'die halbe','naNw')}
  {text(146,623,129,'Bescheid sagen','naNw')}
  {text(542,623,60,'Stunde','naNw')}
  {text(146,648,95,'Hilfe rufen','naNw')}
  {text(531,648,145,'aus-machen, hat','naNw')}
  {text(144,674,110,'bringen, hat','naNw')}
  {text(542,674,102,'ausgemacht','naNw')}
  {text(155,700,76,'gebracht','naNw')}
  {text(531,700,170,'kennen-lernen, hat','naNw')}
  {text(145,726,164,'funktionieren, hat','naNw')}
  {text(542,726,129,'kennengelernt','naNw')}
  {text(156,752,110,'funktioniert','naNw')}
  {text(531,752,149,'mit-nehmen, hat','naNw')}
  {text(145,778,126,'kümmern, hat','naNw')}
  {text(542,778,127,'mitgenommen','naNw')}
  {text(155,803,102,'gekümmert','naNw')}
  {text(531,803,124,'tun, hat getan','naNw')}
  {text(145,829,133,'reparieren, hat','naNw')}
  {text(530,829,103,'warten, hat','naNw')}
  {text(156,856,79,'repariert','naNw')}
  {text(541,856,77,'gewartet','naNw')}
  {text(144,880,271,'schicken (einen Techniker/...),','naNw')}
  {text(530,880,55,'dumm','naNw')}
  {text(155,907,115,'hat geschickt','naNw')}
  {text(542,907,99,'Wie dumm!','naNw')}
  {text(144,932,57,'kaputt','naNw')}
  {text(530,932,33,'kalt','naNw')}
  {text(144,958,50,'sofort','naNw')}
  {text(530,958,48,'lustig','naNw')}
  {text(530,985,65,'seltsam','naNw')}
  {text(143,997,76,'Termine','naBold naNw')}
  {text(530,1011,52,'sicher','naNw')}
  {text(145,1022,67,'Lust die','naNw')}
  {text(530,1037,53,'nichts','naNw')}
  {text(156,1048,94,'Lust haben','naNw')}
  {text(530,1062,49,'selbst','naNw')}
  {text(144,1074,158,'Termine ab-sagen,','naNw')}
  {text(530,1088,126,'Sehr geehrte /','naNw')}
  {text(155,1100,108,'hat abgesagt','naNw')}
  {text(541,1114,120,'Sehr geehrter','naNw')}
  {text(155,1125,147,'vereinbaren, hat','naNw')}
  {text(530,1139,151,'Mit freundlichen','naNw')}
  {text(155,1151,93,'vereinbart','naNw')}
  {text(542,1165,64,'Grüßen','naNw')}
  {stext(541,1193,182,'CH: Freundliche Grüsse',{color:'#8e9094'},'naS20 naNw')}
  {text(176,1212,192,'Schreiben Sie Zettel und','naNw')}
  {text(176,1237,165,'hängen Sie die Zettel','naNw')}
  {text(176,1259,162,'in der Wohnung auf.','naNw')}
  {title('2',99,1318,700,'Welche Wörter möchten Sie noch lernen? Notieren Sie.','naGB')}
  {art('modul-tab',988,1389,83,25)}
  {text(804,1388,140,'fünfunddreißig','naFooter')}{text(943,1388,8,'|','naFooter')}{text(964,1388,22,'35','naFooter')}
 </>}
 {page==='36'&&<>
  {art('0',142,46,837,57)}
  {art('grid',150,228,680,50)}
  {kb(85,181,'KB 3')}
  {title('1',121,178,640,'Markieren Sie die Verben und ordnen Sie zu.','naGB')}
  <div className="naSide" style={{left:92,top:230,whiteSpace:'nowrap'}}>WÖRTER</div>
  {art('6',515,1152,207,205)}
  {lin(677,316,114,2,'#7a7a7a')}
  {lin(248,393,138,2,'#7a7a7a')}
  {lin(621,393,200,2,'#c5c4c8')}
  {lin(614,587,142,2,'#b9b7c8')}
  {lin(579,613,233,2,'#b2b1b6')}
  {lin(341,665,233,2,'#c2c1ce')}
  {lin(187,846,102,2,'#7a7a7a')}
  {lin(334,872,102,2,'#7a7a7a')}
  {text(162,292,135,'a eine Anzeige','naNw')}
  {text(295,294,60,'lesen','naHand naD19 naNw')}
  {lin(295,315,52,2,'#c2c3c6')}
  {text(598,292,72,'d Angst','naNw')}
  {text(162,317,166,'b eine Ausbildung','naNw')}
  {text(598,317,139,'e eine Prüfung','naNw')}
  {text(162,343,7,'c','naNw')}
  {text(186,343,236,'sich an einer Sprachschule','naNw')}
  {text(598,343,7,'f','naNw')}
  {text(621,343,168,'einen Studienplatz','naNw')}
  {kb(85,440,'KB 3')}
  {title('2',121,437,500,'Ordnen Sie zu.','naGB')}
  <div className="naSide" style={{left:92,top:478,whiteSpace:'nowrap'}}>WÖRTER</div>
  {rect(159,473,112,33,'#fcf7dd')}
  {rect(279,473,117,33,'#fcf7dd')}
  {rect(399,473,87,33,'#fcf7dd')}
  {rect(494,473,147,33,'#fcf7dd')}
  {rect(649,473,82,33,'#fcf7dd')}
  {stext(167,476,100,'Ausbildung',{color:'#3f6491'},'naBold naNw')}
  {stext(272,476,10,'|',{color:'#3f6491'},'naNw')}
  {stext(287,476,105,'Studienplatz',{color:'#3f6491'},'naBold naNw')}
  {stext(395,476,10,'|',{color:'#3f6491'},'naNw')}
  {stext(407,476,75,'Prüfung',{color:'#3f6491'},'naBold naNw')}
  {stext(487,476,10,'|',{color:'#3f6491'},'naNw')}
  {stext(502,476,135,'Sprachenschule',{color:'#3f6491'},'naBold naNw')}
  {stext(642,476,10,'|',{color:'#3f6491'},'naNw')}
  {stext(657,476,70,'Anzeige',{color:'#3f6491'},'naBold naNw')}
  {text(163,511,337,'a Jan ist glücklich. Er hat endlich die','naNw')}
  {text(762,511,84,'geschafft.','naNw')}
  {text(652,514,100,'Prüfung','naHand naD19 naNw')}
  {text(162,537,368,'b Mike möchte Deutsch lernen. Er hat in','naNw')}
  {text(537,537,144,'der Zeitung eine','naNw')}
  {text(186,563,332,'gelesen. Jetzt möchte er sich an einer','naNw')}
  {text(762,563,92,'anmelden.','naNw')}
  {text(163,589,410,'c Morgen fängt Jos Studium an. Sie hat einen','naNw')}
  {text(818,589,117,'an der Uni in','naNw')}
  {text(188,615,151,'Basel bekommen.','naNw')}
  {text(163,641,171,'d Jule möchte eine','naNw')}
  {text(580,641,191,'als Friseurin machen.','naNw')}
  {kb(85,711,'KB 4')}
  {title('3',121,708,500,'Ergänzen Sie mit oder ohne.','naGB')}
  <div className="naSide" style={{left:92,top:776,whiteSpace:'nowrap'}}>STRUKTUREN</div>
  {text(164,748,9,'a','naNw naS19')}
  {text(187,748,250,'Cherry geht nur','naNw naS19')}
  {art('mit',324,748,44,22)}
  {text(363,748,381,'ihrer „Starbrille“ zur Aufnahmeprüfung.','naNw naS19')}
  {text(164,773,9,'b','naNw naS19')}
  {text(295,773,585,'Aufnahmeprüfung kann sie nicht an der Pop-Akademie studieren.','naNw naS19')}
  {text(164,800,9,'c','naNw naS19')}
  {text(187,800,293,'Sie möchten ein Popstar werden?','naNw naF188')}
  {text(596,800,341,'eine gute Ausbildung ist das schwierig.','naNw naS19')}
  {text(164,826,9,'d','naNw naS19')}
  {text(296,826,184,'einer Ausbildung hat','naNw naS19')}
  {text(488,828,34,'man','naHand naD19 naNw')}
  {text(530,826,159,'bessere Chancen.','naNw naS19')}
  {text(164,851,7,'e','naNw naS19')}
  {text(188,851,140,'Fabian geht nur','naNw naF182')}
  {text(443,852,332,'seiner Gitarre zur Aufnahmeprüfung.','naNw naS19')}
  {kb(85,918,'KB 4')}
  {title('4',121,915,600,'Was ist richtig? Kreuzen Sie an.','naGB')}
  <div className="naSide" style={{left:92,top:967,whiteSpace:'nowrap'}}>STRUKTUREN</div>
  {text(164,951,155,'a Ich arbeite mit','naNw')}
  <div style={{position:'absolute',left:338,top:952,width:16,height:16,border:'2px solid #c7bd8a',borderRadius:'50%'}}/>
  <div style={{position:'absolute',left:447,top:952,width:16,height:16,border:'2px solid #c7bd8a',borderRadius:'50%'}}/>
  {stext(446,947,20,'X',{color:'#335b98',fontSize:17},'naHand naNw')}
  {text(369,951,53,'meine','naNw')}
  {text(473,951,382,'meinem Mann in einem Büro zusammen.','naNw')}
  {text(163,976,69,'b Ohne','naNw')}
  {text(282,976,53,'einem','naNw')}
  {text(386,976,232,'einen Kaffee am Morgen','naNw')}
  {text(625,976,215,'kann ich nicht arbeiten.','naNw')}
  {text(164,1001,206,'c Ich frühstücke jeden','naNw')}
  {text(377,1001,102,'Morgen mit','naNw')}
  {text(530,1001,62,'meiner','naNw')}
  {text(642,1001,155,'meine Kollegin,','naNw')}
  {text(164,1027,68,'d Ohne','naNw')}
  {text(283,1027,71,'meinem','naNw')}
  {text(404,1027,203,'mein Handy gehe ich','naNw')}
  {text(615,1027,177,'nicht aus dem Haus.','naNw')}
  {text(188,1055,234,'Das nehme ich immer mit.','naNw')}
  {kb(85,1125,'KB 5')}
  {title('5',121,1122,500,'Ergänzen Sie e oder i.','naGB')}
  <div className="naSide" style={{left:84,top:1150,whiteSpace:'nowrap'}}>STRUKTUREN</div>
  <div className="naSide" style={{left:97,top:1150,whiteSpace:'nowrap'}}>ENTDECKEN</div>
  {text(164,1162,26,'ich','naNw')}
  {text(262,1162,10,'w','naNw')}
  {text(279,1164,12,'e','naHand naD19 naNw')}
  {lin(271,1183,25,1,'#ccd2d8')}
  {text(291,1162,30,'rde','naNw')}
  {text(164,1188,21,'du','naNw')}
  {text(164,1215,50,'er/sie','naNw')}
  {lin(361,1164,2,165,'#e3dfc0')}
  {text(378,1224,82,'Sängerin','naNw')}
  {text(164,1253,37,'wir','naNw')}
  {text(165,1279,26,'ihr','naNw')}
  {text(164,1305,58,'sie/Sie','naNw')}
  {art('modul-tab',0,1394,86,24)}
  {text(97,1398,18,'36','naFooter naNw')}{text(128,1398,8,'|','naFooter naNw')}{text(148,1398,148,'sechsunddreißig','naFooter naNw')}
  {text(262,1188,12,'w','naNw')}
  {lin(277,1209,17,1.2,'#9aa0a6')}
  {text(296,1188,27,'rst','naNw')}
  {text(262,1215,12,'w','naNw')}
  {lin(277,1236,17,1.2,'#9aa0a6')}
  {text(296,1215,18,'rd','naNw')}
  {text(262,1253,12,'w','naNw')}
  {lin(277,1274,17,1.2,'#9aa0a6')}
  {text(296,1253,36,'rden','naNw')}
  {text(262,1279,12,'w','naNw')}
  {lin(277,1300,17,1.2,'#9aa0a6')}
  {text(296,1279,36,'rdet','naNw')}
  {text(262,1305,12,'w','naNw')}
  {lin(277,1326,17,1.2,'#9aa0a6')}
  {text(296,1305,36,'rden','naNw')}
  {field('p36-1b',335,316,198,'1 b')}
  {field('p36-1c',171,363,213,'1 c')}
  {field('p36-1d',675,290,215,'1 d')}
  {field('p36-1e',748,316,206,'1 e')}
  {field('p36-1f',623,363,198,'1 f')}
  {field('p36-2b0',690,536,224,'2 b')}
  {field('p36-2b1',530,561,227,'2 b')}
  {field('p36-2c2',578,589,227,'2 c')}
  {field('p36-2d3',346,639,227,'2 d')}
  {field('p36-3b',186,769,105,'3 b')}
  {field('p36-3c',486,794,105,'3 c')}
  {field('p36-3d',186,820,105,'3 d')}
  {field('p36-3e',333,846,104,'3 e')}
  {dot('4b','einem',255,980,'4 b einem')}
  {dot('4b','einen',359,980,'4 b einen')}
  {dot('4c','meiner',503,1006,'4 c meiner')}
  {dot('4c','meine',615,1006,'4 c meine')}
  {dot('4d','meinem',256,1032,'4 d meinem')}
  {dot('4d','mein',377,1032,'4 d mein')}
  {field('p36-50',279,1182,15,'5 du')}
  {field('p36-51',279,1209,15,'5 er/sie')}
  {field('p36-52',279,1245,15,'5 wir')}
  {field('p36-53',279,1273,15,'5 ihr')}
  {field('p36-54',279,1297,15,'5 sie/Sie')}
  {check('36-1',171,404,{'p36-1b':'abschließen','p36-1c':'anmelden','p36-1d':'haben','p36-1e':'schaffen','p36-1f':'bekommen'})}
  {check('36-2',346,680,{'p36-2b0':'Anzeige','p36-2b1':'Sprachenschule','p36-2c2':'Studienplatz','p36-2d3':'Ausbildung'})}
  {check('36-3',1000,865,{'p36-3b':'Ohne','p36-3c':'Ohne','p36-3d':'Mit','p36-3e':'mit'})}
  {check('36-4',1000,1052,{'4b':'einen','4c':'meiner','4d':'mein'})}
  {check('36-5',279,1338,{'p36-50':'i','p36-51':'i','p36-52':'e','p36-53':'e','p36-54':'e'})}
 </>}
 {page==='37'&&<>
  {art('0',349,35,719,85)}
  {art('2',700,204,286,187)}
  {lin(513,251,116,2,'#c0bcce')}
  {lin(389,302,103,2,'#bbbcbe')}
  {lin(244,378,116,2,'#c1c2c4')}
  {lin(163,535,780,2,'#c1c2c4')}
  {lin(163,586,780,2,'#c1c2c4')}
  {lin(163,637,780,2,'#c1c2c4')}
  {lin(163,689,780,2,'#c1c2c4')}
  {lin(163,741,780,2,'#c1c2c4')}
  {text(945,516,8,'.','naNw')}
  {text(945,567,8,'.','naNw')}
  {text(945,618,8,'.','naNw')}
  {text(945,670,8,'.','naNw')}
  {text(945,722,8,'.','naNw')}
  {lin(182,1280,168,2,'#b9bcc1')}
  {text(101,83,240,'BASISTRAINING','naHeadline naNw')}
  {kb(78,161,'KB 5')}
  {title('6',130,160,760,'Urlaubswünsche. Ergänzen Sie wollen in der richtigen Form.','naGB')}
  <div className="naSide" style={{left:69,top:203,whiteSpace:'nowrap'}}>STRUKTUREN</div>
  {text(140,199,66,'a Also ich','naNw')}
  {text(240,197,32,'will','naHand naD19 naNw')}
  {text(282,199,280,'dieses Jahr zu Hause bleiben!','naNw')}
  {text(140,225,375,'b Aber meine Freunde Theresa und Boris','naNw')}
  {text(648,225,22,'im','naNw')}
  {text(165,251,271,'Urlaub nach Schweden fahren.','naNw')}
  {text(140,278,245,'c Meine Freundin Beatrice','naNw')}
  {text(498,278,177,'nach Italien fahren.','naNw')}
  {text(140,303,190,'d Aber nächstes Jahr','naNw')}
  {text(469,303,167,'wir alle zusammen','naNw')}
  {text(164,329,197,'nach Tunesien fliegen.','naNw')}
  {text(140,354,97,'e Und was','naNw')}
  {text(365,354,200,'du im Urlaub machen?','naNw')}
  {kb(78,429,'KB 6')}
  {title('7',130,420,760,'Schreiben Sie Sätze.','naGB')}
  <div className="naSide" style={{left:66,top:461,whiteSpace:'nowrap'}}>STRUKTUREN</div>
  {text(140,462,9,'a','naSmall naNw')}
  {text(160,457,300,'Cherry will unbedingt Sängerin werden.','naHand naD19 naNw')}
  {text(164,486,446,'(unbedingt / Cherry / Sängerin / werden / wollen)','naNw')}
  {text(140,508,9,'b','naNw')}
  {text(164,538,467,'(auf keinen Fall / Sara und Felix / wollen / heiraten)','naNw')}
  {text(140,565,34,'c','naS20 naNw')}
  {text(164,590,563,'(meine Ausbildung / Nächstes Jahr / abschließen / ich / wollen)','naNw')}
  {text(140,611,10,'d','naNw')}
  {text(164,642,570,'(wollen / unbedingt / Wir / schaffen / die Führerscheinprüfung)','naNw')}
  {text(140,668,7,'e','naSmall naNw')}
  {text(164,693,590,'(können / wir / Dann / mit dem Motorrad / reisen / durch Europa)','naNw')}
  {text(140,714,7,'f','naNw')}
  {text(164,744,451,'(Jan / vielleicht / werden / Liedermacher / wollen)','naNw')}
  {kb(78,819,'KB 6')}
  {title('8',130,806,760,'Ergänzen Sie die Wörter.','naGB')}
  <div className="naSide" style={{left:56,top:863,whiteSpace:'nowrap'}}>WÖRTER</div>
  {art('ausbildung',402,850,140,59)}
  {text(140,848,254,'Im Sommer hat Sofia ihre (a)','naNw naS19')}
  {text(483,848,400,'(BLUGASIDNU) als Friseurin abgeschlossen.','naNw naF180')}
  {text(140,874,655,'Sie hatte große Angst vor der Prüfung. Aber zum Glück hat sie die Prüfung','naNw naS19')}
  {text(140,897,21,'(b)','naNw naS19')}
  {text(394,897,383,'(SCHEFGATF). Jetzt möchte sie endlich Geld','naNw naS19')}
  {text(140,925,20,'(c)','naNw naS19')}
  {text(393,925,443,'(DERENIVEN). Dann möchte sie mit ihrem Freund','naNw naS19')}
  {text(138,951,128,'Johnny ein (d)','naNw naS19')}
  {text(498,951,279,'(RORTOMDA) kaufen und durch','naNw naS19')}
  {text(140,977,21,'(e)','naNw naS19')}
  {text(393,977,438,'(PORUEA) fahren. Zuerst macht sie aber noch den','naNw naS19')}
  {text(140,1002,19,'(f)','naNw naS19')}
  {text(391,1002,449,'(RENFEHÜRSHIC). Sie möchten durch viele Länder','naNw naS19')}
  {text(140,1028,21,'(g)','naNw naS19')}
  {text(393,1028,324,'(SINERE), die Welt und andere junge','naNw naS19')}
  {text(140,1054,22,'(h)','naNw naS19')}
  {text(395,1054,460,'(UTELE) kennenlernen. In ein paar Jahren möchten','naNw naS19')}
  {text(137,1080,158,'sie und Johnny (i)','naNw naS19')}
  {text(527,1080,277,'(RITAHENE) und Kinder haben.','naNw')}
  {kb(78,1149,'KB 6')}
  {title('9',130,1140,580,'Was sind Ihre Wünsche? Schreiben Sie 4–5 Sätze wie in ','naGB naNw')}
  {stext(702,1140,28,'8.',{color:'#3f6491',fontWeight:700},'naTitle naNw')}
  {art('partner',30,1168,72,34)}
  {text(140,1170,412,'Ihre Partnerin / Ihr Partner ergänzt die Wörter.','naNw')}
  {text(178,1240,220,'Ich möchte gern nach China','naHand naD19 naNw')}
  {text(350,1258,115,'. (SIERNE)','naHand naD19 naNw')}
  {art('modul-tab',985,1391,87,24)}
  {text(786,1394,155,'siebenunddreißig','naFooter naNw')}{text(940,1394,8,'|','naFooter naNw')}{text(961,1394,22,'37','naFooter naNw')}
  {field('p37-6b',515,226,125,'6 b')}
  {field('p37-6c',390,279,102,'6 c')}
  {field('p37-6d',337,303,125,'6 d')}
  {field('p37-6e',243,355,115,'6 e')}
  {field('p37-8b',168,895,221,'8 b')}
  {field('p37-8c',166,921,221,'8 c')}
  {field('p37-8d',272,947,221,'8 d')}
  {field('p37-8e',167,972,220,'8 e')}
  {field('p37-8f',165,998,221,'8 f')}
  {field('p37-8g',167,1024,221,'8 g')}
  {field('p37-8h',169,1050,221,'8 h')}
  {field('p37-8i',303,1077,221,'8 i')}
  {check('37-1',1000,165,{'p37-6b':'wollen','p37-6c':'will','p37-6d':'wollen','p37-6e':'willst'})}
  {check('37-2',1000,1116,{'p37-8b':'geschafft','p37-8c':'verdienen','p37-8d':'Motorrad','p37-8e':'Europa','p37-8f':'Führerschein','p37-8g':'reisen','p37-8h':'Leute','p37-8i':'heiraten'})}
 </>}
 {page==='38'&&<>
  {art('1',845,500,117,129)}
  {art('2',840,743,124,316)}
  {lin(374,114,607,3,'#8bc78c')}
  {lin(1065,1155,7,298,'#b7bdbf')}
  {text(126,85,240,'BASISTRAINING','naHeadline naNw')}
  {kb(82,174,'KB 6')}
  {title('10',130,161,760,'Lesen Sie die Texte.','naGB')}
  <div className="naSide" style={{left:97,top:200,whiteSpace:'nowrap'}}>LESEN</div>
  {text(125,201,14,'a','naNw')}
  {text(167,201,445,'Was möchten die Leute machen? Kreuzen Sie an.','naNw')}
  {stext(503,243,65,'SUSANNE',{fontStyle:'italic'},'naS14 naNw')}
  {stext(620,243,46,'GEORG',{fontStyle:'italic'},'naS14 naNw')}
  {stext(715,243,74,'MARIANNE',{fontStyle:'italic'},'naS14 naNw')}
  {text(166,266,218,'an die Universität gehen','naNw')}
  {text(166,293,134,'Urlaub machen','naNw')}
  {text(166,318,152,'im Ausland leben','naNw')}
  {stext(182,376,340,'50 PLUS – KRISE ODER CHANCE?',{color:'#a71114',fontWeight:700},'naNw')}
  {text(181,407,503,'Ist mit 50 Jahren der schönste Teil des Lebens zu Ende?','naSansB naNw')}
  {text(181,433,498,'Was sind die Wünsche und Pläne der über 50-Jährigen?','naSansB naNw')}
  {stext(181,485,254,'Susanne M., Hausfrau, 51 Jahre alt',{fontStyle:'italic'},'naNw')}
  {text(182,511,631,'Meine Wünsche? Ich habe nur einen Wunsch: Ich will ins Ausland gehen','naNw naBio naJ')}
  {text(181,537,633,'und noch einmal eine Fremdsprache lernen. Ich habe mit 20 Jahren geheira-','naNw naBio naJ')}
  {text(181,562,632,'tet und drei Kinder bekommen. Jetzt bin ich 51, die Kinder sind groß. In','naNw naBio naJ')}
  {text(181,588,633,'VITAL habe ich einen Artikel über „Granny-Au-Pairs“ gelesen und da habe','naNw naBio naJ')}
  {text(181,614,633,'ich gedacht: Das mache ich. Ein halbes Jahr in Rio de Janeiro in einer Fami-','naNw naBio naJ')}
  {text(181,640,633,'lie leben und eine neue Kultur kennenlernen. Super, oder? Und ein bisschen','naNw naBio naJ')}
  {text(181,666,633,'Geld verdiene ich dort auch: 300 € pro Monat und für das Zimmer und Essen','naNw naBio naJ')}
  {text(181,692,137,'zahle ich nichts.','naNw naBio')}
  {stext(181,749,269,'Georg K., Mechatroniker, 58 Jahre alt',{fontStyle:'italic'},'naNw')}
  {text(182,774,631,'Ich habe gerade den Motorradführerschein gemacht und nächstes Jahr will','naNw naBio naJ')}
  {text(181,800,633,'ich sechs Wochen mit meinem Sohn mit dem Motorrad durch Kanada fah-','naNw naBio naJ')}
  {text(181,826,633,'ren. Er hat letztes Jahr schon eine Reise durch die USA gemacht. Da hat er','naNw naBio naJ')}
  {text(180,852,563,'viel fotografiert und diese wunderbare Natur hat mir sehr gefallen.','naNw naBio')}
  {stext(180,909,264,'Marianne O., Studentin, 52 Jahre alt',{fontStyle:'italic'},'naNw')}
  {text(181,935,632,'Mit 50 Jahren ist man heute doch nicht alt! Ich habe 25 Jahre als Verkäuferin','naNw naBio naJ')}
  {text(180,960,632,'gearbeitet. Vor einem Jahr habe ich einen tollen Mann kennengelernt und','naNw naBio naJ')}
  {text(181,986,633,'mich total verliebt. Er hat gesagt: „Marianne, ich verdiene genug Geld für','naNw naBio naJ')}
  {text(181,1012,631,'uns zwei. Willst du wirklich dein ganzes Leben als Verkäuferin arbeiten?“','naNw naBio naJ')}
  {text(181,1038,632,'Da habe ich sofort gewusst: Das ist meine Chance! Ich kann endlich studie-','naNw naBio naJ')}
  {text(181,1064,631,'ren! Jetzt studiere ich Arabisch und Französisch. Das spreche ich schon gut.','naNw naBio naJ')}
  {text(180,1090,378,'Als Kind habe ich 10 Jahre in Marokko gelebt.','naNw naBio')}
  {text(134,1171,401,'b Lesen Sie noch einmal und kreuzen Sie an.','naNw')}
  {stext(829,1202,120,'richtig falsch',{fontStyle:'italic'},'naS14 naNw')}
  {text(166,1223,12,'1','naNw')}
  {text(188,1223,492,'Susanne hat schon mit 20 Jahren als Au-Pair gearbeitet.','naNw')}
  {text(166,1249,12,'2','naNw')}
  {text(188,1249,485,'Sie bezahlt 300 € für Zimmer und Essen in der Familie.','naNw')}
  {text(166,1275,12,'3','naNw')}
  {text(188,1275,427,'Georgs Sohn hat letztes Jahr eine Reise gemacht.','naNw')}
  {text(166,1301,12,'4','naNw')}
  {text(188,1301,556,'Marianne hat vor 25 Jahren einen tollen Mann kennengelernt.','naNw')}
  {text(166,1327,12,'5','naNw')}
  {text(188,1327,196,'Sie ist jetzt Studentin.','naNw')}
  {art('modul-tab',0,1394,85,23)}
  {text(97,1398,18,'38','naFooter naNw')}{text(128,1398,8,'|','naFooter naNw')}{text(148,1398,142,'achtunddreißig','naFooter naNw')}
  {dot('10a-susanne','uni',523,272,'susanne uni uni')}
  {dot('10a-susanne','urlaub',523,298,'susanne urlaub urlaub')}
  {dot('10a-susanne','ausland',523,323,'susanne ausland ausland')}
  {dot('10a-georg','uni',631,272,'georg uni uni')}
  {dot('10a-georg','urlaub',631,298,'georg urlaub urlaub')}
  {dot('10a-georg','ausland',631,323,'georg ausland ausland')}
  {dot('10a-marianne','uni',740,272,'marianne uni uni')}
  {dot('10a-marianne','urlaub',740,298,'marianne urlaub urlaub')}
  {dot('10a-marianne','ausland',740,323,'marianne ausland ausland')}
  {dot('10b-1','richtig',849,1230,'10b 1 richtig richtig')}
  {dot('10b-1','falsch',916,1230,'10b 1 falsch falsch')}
  {dot('10b-2','richtig',849,1255,'10b 2 richtig richtig')}
  {dot('10b-2','falsch',916,1255,'10b 2 falsch falsch')}
  {dot('10b-3','richtig',849,1282,'10b 3 richtig richtig')}
  {dot('10b-3','falsch',916,1282,'10b 3 falsch falsch')}
  {dot('10b-4','richtig',849,1307,'10b 4 richtig richtig')}
  {dot('10b-4','falsch',916,1307,'10b 4 falsch falsch')}
  {dot('10b-5','richtig',849,1333,'10b 5 richtig richtig')}
  {dot('10b-5','falsch',916,1333,'10b 5 falsch falsch')}
  {check('38-1',1000,270,{'10a-susanne':'ausland','10a-georg':'urlaub','10a-marianne':'uni'})}
  {check('38-2',1000,1367,{'10b-1':'falsch','10b-2':'falsch','10b-3':'richtig','10b-4':'falsch','10b-5':'richtig'})}
 </>}
 {page==='39'&&<>
  {art('0',972,41,96,82)}
  {art('1',145,383,361,151)}
  {lin(455,112,502,8,'#89cd8e')}
  {lin(363,584,393,5,'#c1c1c1')}
  {lin(770,589,123,2,'#c3c2c8')}
  {lin(153,632,143,3,'#bbb9c4')}
  {lin(508,637,138,2,'#c0c0c6')}
  {lin(182,659,216,3,'#bfc1c3')}
  {lin(584,690,101,2,'#bdb8c6')}
  {lin(683,976,263,5,'#8acd8a')}
  {lin(336,1087,136,2,'#bdc0c7')}
  {lin(310,1112,160,3,'#bebdc3')}
  {lin(352,1216,117,2,'#c1c1cc')}
  {lin(0,1232,4,197,'#c2c7cd')}
  {lin(309,1240,160,4,'#bfc1c1')}
  {lin(308,1266,159,3,'#bdbfbf')}
  {lin(345,1293,123,2,'#bebec2')}
  {text(102,81,347,'TRAINING: SCHREIBEN','naHeadline naNw')}
  {text(97,151,782,'1 Lesen Sie Fabios Beitrag. Lesen Sie dann die Notizen und ergänzen Sie den','naNw')}
  {text(144,182,277,'Beitrag von Alina im Forum.','naNw')}
  {text(157,245,205,'Beruf oder Traumberuf?','naBold naNw')}
  {text(158,274,537,'Ich gehe noch zur Schule, aber ich will unbedingt Musiker werden.','naNw')}
  {text(791,274,96,'Fabio, 7. Juli','naNw')}
  {text(157,300,621,'Wie ist es bei euch? Was macht ihr? Gefällt es euch? Ist das euer Traumberuf?','naNw')}
  {text(156,326,531,'Was wollt ihr unbedingt noch machen? Schickt mir eure Beiträge.','naNw')}
  {text(786,540,95,'Alina, 7. Juli','naNw')}
  {text(155,558,21,'Ich','naNw')}
  {text(155,584,51,'Das ist','naNw')}
  {text(531,584,293,'Ich mache jeden Tag das Gleiche. Ich','naNw')}
  {text(443,613,57,'und ich','naNw')}
  {text(779,613,113,'Eigentlich will','naNw')}
  {text(154,635,21,'ich','naNw')}
  {text(479,635,374,'Ich spiele in meiner Freizeit Theater. Vielleicht','naNw')}
  {text(153,661,311,'melde ich mich nächstes Jahr bei einer','naNw')}
  {text(708,661,24,'an.','naNw')}
  {text(137,736,277,'Machen Sie wie in 1 Notizen','naNw')}
  {text(478,736,484,'Sie haben Probleme beim Schreiben? Sammeln Sie Ideen und','naNw')}
  {text(135,762,285,'zu den Fragen und schreiben','naNw')}
  {text(479,762,457,'machen Sie Notizen. Machen Sie Sätze aus Ihren Notizen.','naNw')}
  {text(135,788,259,'Sie dann einen Beitrag ins','naNw')}
  {text(479,788,480,'Nach dem Schreiben: Lesen Sie Ihren Text noch dreimal und','naNw')}
  {text(136,815,67,'Forum.','naNw')}
  {text(478,815,142,'suchen Sie Fehler.','naNw')}
  {text(478,838,453,'1. Lesen: Steht das Verb immer an der richtigen Position?','naNw')}
  {text(478,860,322,'2. Lesen: Hat das Verb die richtige Form?','naNw')}
  {text(478,882,364,'3. Lesen: Sind die Wörter richtig geschrieben?','naNw')}
  {text(92,941,581,'TRAINING: AUSSPRACHE Internationale Wörter','naBold naNw')}
  {text(134,1008,450,'Hören Sie und markieren Sie den Wortakzent.','naNw')}
  {text(311,1028,242,'meine Sprache / andere Sprachen','naNw')}
  {text(656,1028,279,'Ergänzen Sie die Wörter in Ihrer','naNw')}
  {text(134,1053,140,'a international','naNw')}
  {text(655,1053,261,'Sprache oder in einer anderen','naNw')}
  {text(654,1079,246,'Sprache. Markieren Sie auch','naNw')}
  {text(156,1084,116,'komponieren','naNw')}
  {text(655,1084,182,'hier den Wortakzent.','naNw')}
  {text(133,1116,122,'c interessant','naS20 naNw')}
  {text(133,1137,75,'d Musik','naNw')}
  {text(165,1142,53,'elegant','naNw')}
  {text(608,1142,360,'2 Wie viele internationale Wörter','naNw')}
  {text(133,1167,123,'f Instrument','naNw')}
  {text(654,1167,289,'kennen Sie? Notieren Sie und','naNw')}
  {text(131,1207,93,'g Technik','naNw')}
  {text(653,1207,238,'sprechen Sie die Wörter.','naNw')}
  {text(132,1241,106,'h studieren','naNw')}
  {text(154,1267,22,'Akademie','naNw')}
  {text(130,1293,89,'j Familie','naNw')}
  {text(131,1318,98,'k Politiker','naNw')}
  {text(131,1351,120,'l Produktion','naFooter')}
  {text(786,1399,180,'neununddreißig | 39','naFooter')}
  {audio('assets/ab-a12-track18.mp3',24,1013,'CD2 · Track18')}
 </>}
 {page==='40'&&<>
  {art('6',214,1202,148,96)}
  {lin(281,291,120,2,'#c7c5c7')}
  {lin(341,317,100,2,'#c7c4ce')}
  {lin(563,343,167,2,'#c1c2c5')}
  {lin(277,394,232,2,'#c3c1c1')}
  {lin(271,808,375,2,'#b6baaf')}
  {lin(413,859,374,3,'#bababf')}
  {lin(254,911,338,2,'#bebfbf')}
  {lin(589,1068,179,2,'#c1becd')}
  {lin(620,1094,141,2,'#bbbdc1')}
  {lin(660,1120,129,2,'#c1c0c2')}
  {lin(471,1145,116,2,'#c0c0c3')}
  {lin(1067,1337,5,116,'#bdc5c6')}
  {text(122,155,179,'1 Ergänzen Sie,','naBold naNw')}
  {text(175,202,160,'Geld | Führerschein |','naNw')}
  {text(421,202,353,'Fremdsprachen | Sängerin | Prüfungen | Welt','naNw')}
  {text(170,241,192,'Die Klasse 12a hat alle','naNw')}
  {text(444,241,453,'(a) geschafft. Wie geht es weiter? David möchte den','naNw')}
  {text(407,266,546,'(b) machen und mit dem Auto durch Australien reisen. Nicole','naNw')}
  {text(161,290,41,'will','naNw')}
  {text(447,290,245,'(c) werden. Martin will viel','naNw')}
  {text(937,290,22,'(d)','naNw')}
  {text(168,319,130,'verdienen und','naNw')}
  {text(304,319,253,'nach ein paar Jahren um die','naNw')}
  {text(802,319,153,'(e) segeln. Sophia','naNw')}
  {text(169,344,121,'hat nur einen','naNw')}
  {text(535,344,25,'(f).','naNw')}
  {text(568,344,292,'Sie möchte bald heiraten. Wilson','naNw')}
  {text(169,370,101,'spricht vier','naNw')}
  {text(516,370,307,'(g) und möchte Bücher übersetzen.','naNw')}
  {text(933,370,45,'Punkte','naNw')}
  {text(170,433,547,'Kreuzen Sie an und ergänzen Sie die Endung, wo nötig.','naNw')}
  {text(169,474,204,'a David möchte allein,','naNw')}
  {text(425,474,29,'mit','naNw')}
  {text(504,474,202,'ohne seine Eltern, in','naNw')}
  {text(712,474,150,'Australien leben.','naNw')}
  {text(168,499,518,'b Nicoles Eltern finden ihren Berufswunsch gut, aber nur','naNw')}
  {text(729,499,36,'mit','naNw')}
  {text(815,499,43,'ohne','naNw')}
  {text(192,525,27,'ein','naBold naNw')}
  {text(264,525,104,'Ausbildung.','naBold naNw')}
  {text(169,550,382,'c Martin kauft immer viel ein. Er geht nie','naNw')}
  {text(593,550,38,'mit','naNw')}
  {text(681,550,102,'ohne sein','naNw')}
  {text(829,550,135,'Kreditkarte aus','naNw')}
  {text(192,577,90,'dem Haus.','naNw')}
  {text(168,601,222,'d Sophia will zusammen','naNw')}
  {text(431,601,40,'mit','naNw')}
  {text(520,601,93,'ohne ihr','naNw')}
  {text(658,601,223,'Mann drei Kinder haben.','naNw')}
  {text(168,627,210,'e Man sieht Wilson nie','naNw')}
  {text(421,627,37,'mit','naNw')}
  {text(509,627,101,'ohne sein','naNw')}
  {text(657,627,182,'Buch, er liest immer.','naNw')}
  {text(933,627,45,'Punkte','naNw')}
  {text(168,692,303,'Schreiben Sie Sätze mit wollen.','naNw')}
  {text(168,732,420,'a Tom, machst du bitte deine Hausaufgaben!','naNw')}
  {text(428,758,157,'(ich/Radio hören)','naNw')}
  {text(167,784,106,'b Wann,','naNw')}
  {text(652,784,135,'(ihr/heiraten)?','naNw')}
  {text(216,810,205,'Nächstes Jahr im April.','naNw')}
  {text(168,835,238,'c Welche Fremdsprache','naNw')}
  {text(789,835,119,'? (Sie/lernen)','naNw')}
  {text(216,861,73,'Dänisch.','naNw')}
  {text(167,887,10,'d','naNw')}
  {text(630,887,123,'? (du/werden)','naNw')}
  {text(216,914,67,'Popstar.','naS20 naNw')}
  {text(909,914,68,'/3 Punkte','naS20 naNw')}
  {text(169,976,509,'Ergänzen Sie auf keinen Fall, vielleicht oder unbedingt.','naNw')}
  {text(167,1017,501,'a Die Sitzung ist sehr wichtig. Der Chef will den Termin','naNw')}
  {text(908,1017,74,'absagen.','naNw')}
  {text(166,1042,326,'b Franz möchte Lehrer werden oder','naNw')}
  {text(853,1042,126,'auch Politiker.','naNw')}
  {text(167,1068,315,'C Ich lerne jetzt jeden Tag. Ich will','naNw')}
  {text(766,1068,189,'die Prüfung schaffen.','naNw')}
  {text(167,1094,357,'d Das Wetter ist so schlecht. Ich möchte','naNw')}
  {text(796,1094,181,'mit dem Rad fahren.','naNw')}
  {text(167,1120,153,'e Katharina will','naNw')}
  {text(694,1120,240,'Französisch lernen. Sie hat','naNw')}
  {text(191,1146,160,'einen Job in Paris.','naNw')}
  {text(931,1146,45,'PUNKTE','naNw')}
  {text(158,1205,63,'Wörter','naBold naNw')}
  {text(332,1205,87,'Strukturen','naBold naNw')}
  {text(500,1205,126,'Kommunikation','naBold naNw')}
  {text(369,1242,26,'0-5','naS20 naNw')}
  {text(536,1242,84,'0-2 Punkte','naS20 naNw')}
  {text(204,1276,7,'4','naS20 naNw')}
  {text(369,1276,24,'6-8','naS20 naNw')}
  {text(536,1276,63,'3 Punkte','naS20 naNw')}
  {text(205,1309,82,'5-6 Punkte','naS20 naNw')}
  {text(369,1309,83,'9-11 Punkte','naS20 naNw')}
  {text(536,1309,83,'4-5 Punkte','naS20 naNw')}
  {text(446,1349,223,'www.hueber.de/menschen/lernen','naFooter')}
  {text(101,1400,107,'40 | vierzig','naFooter')}
  {field('p40-1b',170,261,230,'1 (b)')}
  {field('p40-1c',208,285,232,'1 (c)')}
  {field('p40-1d',698,288,232,'1 (d)')}
  {field('p40-1e',563,314,233,'1 (e)')}
  {field('p40-1f',296,339,232,'1 (f)')}
  {field('p40-1g',276,365,234,'1 (g)')}
  {dot('r2b','mit',702,503,'2 b mit')}
  {dot('r2b','ohne',788,503,'2 b ohne')}
  {dot('r2c','mit',566,555,'2 c mit')}
  {dot('r2c','ohne',654,555,'2 c ohne')}
  {dot('r2d','mit',404,606,'2 d mit')}
  {dot('r2d','ohne',493,606,'2 d ohne')}
  {dot('r2e','mit',394,633,'2 e mit')}
  {dot('r2e','ohne',482,633,'2 e ohne')}
  {field('p40-2b-end',221,521,41,'2 b Endung')}
  {field('p40-2c-end',786,547,40,'2 c Endung')}
  {field('p40-2d-end',616,598,39,'2 d Endung')}
  {field('p40-3b',280,779,365,'3 b')}
  {field('p40-3c',412,830,373,'3 c')}
  {field('p40-3d',255,883,370,'3 d')}
  {field('p40-4a',674,1014,226,'4 a')}
  {field('p40-4b',498,1038,348,'4 b')}
  {field('p40-4c',488,1064,272,'4 c')}
  {field('p40-4d',530,1090,260,'4 d')}
  {field('p40-4e',327,1116,361,'4 e')}
  {check('40-1',170,408,{'p40-1b':'Führerschein','p40-1c':'Sängerin','p40-1d':'Geld','p40-1e':'Welt','p40-1f':'Wunsch','p40-1g':'Fremdsprachen'})}
  {check('40-2',221,665,{'r2b':'mit','r2c':'ohne','r2d':'mit','r2e':'ohne','p40-2b-end':'er','p40-2c-end':'e','p40-2d-end':'em'})}
  {check('40-3',255,926,{'p40-3b':'wollt ihr heiraten','p40-3c':'wollen Sie lernen','p40-3d':'willst du werden'})}
  {check('40-4',327,1159,{'p40-4a':'auf keinen Fall','p40-4b':'vielleicht','p40-4c':'unbedingt','p40-4d':'auf keinen Fall','p40-4e':'unbedingt'})}
 </>}
 {page==='41'&&<>
  {art('0',913,4,155,1390)}
  {art('2',539,906,251,138)}
  {lin(0,0,8,462,'#d8dfe5')}
  {lin(389,111,456,3,'#84c284')}
  {lin(312,249,189,2,'#c4c2ca')}
  {lin(312,274,135,2,'#c1bfcb')}
  {lin(312,300,163,2,'#bfbec3')}
  {lin(313,352,191,2,'#bbc1c1')}
  {lin(671,249,196,2,'#c2c0c8')}
  {lin(671,300,196,2,'#c1bfc9')}
  {lin(672,352,189,2,'#bbc6b7')}
  {lin(313,377,128,2,'#c6c2c8')}
  {lin(313,403,190,2,'#bebacd')}
  {lin(672,403,196,2,'#c3c3c0')}
  {lin(313,429,191,2,'#bebfc2')}
  {lin(673,429,196,2,'#c1c7c8')}
  {lin(313,481,191,2,'#b7b8bc')}
  {lin(673,481,196,2,'#b6b8bc')}
  {lin(313,506,191,2,'#c1c4c4')}
  {lin(673,507,196,2,'#bbb9be')}
  {lin(673,533,196,2,'#babbc3')}
  {lin(313,558,191,2,'#b7b9ba')}
  {lin(313,584,191,2,'#bebcc2')}
  {lin(673,597,196,2,'#bbbbbe')}
  {lin(313,648,191,2,'#c0b6cc')}
  {lin(673,674,196,2,'#b5b5ba')}
  {lin(314,700,190,2,'#bac0bd')}
  {lin(313,751,191,2,'#c3c6bb')}
  {lin(673,777,196,2,'#acb4b4')}
  {lin(313,803,191,2,'#b8babf')}
  {lin(673,829,196,2,'#b7bcc0')}
  {lin(673,867,196,2,'#b6bbbc')}
  {lin(313,881,190,2,'#b9bec0')}
  {lin(313,957,191,2,'#b4c2b4')}
  {lin(314,996,190,2,'#babdca')}
  {lin(313,1022,191,2,'#adadb1')}
  {lin(142,1164,727,2,'#b8bbbc')}
  {lin(142,1190,727,2,'#bcbfc0')}
  {lin(142,1216,727,2,'#c1bfc7')}
  {lin(142,1242,727,2,'#b5b7c0')}
  {lin(142,1268,727,2,'#b5b7bd')}
  {lin(142,1293,727,2,'#bdbcc0')}
  {lin(142,1319,727,2,'#b8b8be')}
  {lin(143,1344,727,2,'#bfc0c2')}
  {[249,274,300,352,378,403,429,481,507,558,584,648,700,752,803,881,958,997,1023].map((y,i)=>field('p41-1-l'+(i+1),314,y-19,185,'1 links Zeile '+(i+1),'naFieldBlank'))}
  {[249,300,352,404,429,481,507,533,597,674,778,829,867].map((y,i)=>field('p41-1-r'+(i+1),674,y-19,190,'1 rechts Zeile '+(i+1),'naFieldBlank'))}
  {[1164,1190,1216,1242,1268,1293,1319,1344].map((y,i)=>field('p41-2-'+(i+1),144,y-19,720,'2 Notizzeile '+(i+1),'naFieldBlank'))}
  {text(100,84,281,'LERNWORTSCHATZ','naHeadline naNw')}
  {title('1',98,156,760,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.','naGB')}
  {text(140,196,105,'Ausbildung','naBold naNw')}
  {text(526,196,228,'Weitere wichtige Wörter','naBold naNw')}
  {text(140,224,165,'Ausbildung die, -en','naNw')}
  {text(527,224,109,'Europa (das)','naNw')}
  {text(140,250,104,'Ausland das','naNw')}
  {text(527,250,116,'Führerschein','naNw')}
  {text(141,276,122,'Chance die, -n','naNw')}
  {text(538,276,52,'der, -e','naNw')}
  {text(141,300,123,'Fremdsprache','naNw')}
  {text(528,300,100,'Instrument','naNw')}
  {text(152,328,54,'die, -n','naNw')}
  {text(538,328,53,'das, -e','naNw')}
  {text(141,353,71,'Geld das','naNw')}
  {text(528,353,100,'Kreditkarte','naNw')}
  {text(142,379,124,'Politiker der, -','naNw')}
  {text(538,379,55,'die, -n','naNw')}
  {text(142,405,141,'Prüfung die, -en','naNw')}
  {text(528,405,105,'Lied das, -er','naNw')}
  {text(152,431,199,'eine Prüfung schaffen,','naNw')}
  {text(528,431,120,'Motorrad das,','naNw')}
  {text(538,457,40,'¨er','naNw')}
  {text(153,457,112,'hat geschafft','naBold naNw')}
  {text(141,482,109,'Sänger der, -','naNw')}
  {text(527,482,72,'Welt die','naNw')}
  {text(141,508,116,'Sängerin die,','naNw')}
  {text(527,508,129,'Wunsch der, ¨e','naNw')}
  {text(152,539,39,'-nen','naSmall naNw')}
  {text(527,548,116,'heiraten, hat','naNw')}
  {text(142,560,92,'Star der, -s','naNw')}
  {text(538,574,90,'geheiratet','naBold naNw')}
  {text(142,598,150,'ab-schließen, hat','naNw')}
  {text(527,598,151,'laufen, du läufst,','naNw')}
  {text(153,622,121,'abgeschlossen','naNw')}
  {text(539,622,70,'er läuft,','naNw')}
  {text(153,650,141,'eine Ausbildung','naBold naNw')}
  {text(539,650,102,'ist gelaufen','naBold naNw')}
  {text(153,676,101,'abschließen','naNw')}
  {text(538,678,206,'A/CH: rennen, ist gerannt','naNw naGray')}
  {text(142,700,133,'an· melden, hat','naNw')}
  {text(538,702,220,'(laufen = (zu Fuss) gehen)','naNw naGray')}
  {text(153,726,101,'angemeldet','naNw')}
  {text(528,726,87,'reisen, ist','naNw')}
  {text(141,752,130,'verdienen, hat','naNw')}
  {text(538,752,59,'gereist','naNw')}
  {text(152,777,75,'verdient','naNw')}
  {text(527,777,101,'putzen, hat','naNw')}
  {text(141,805,155,'werden, du wirst,','naNw')}
  {text(538,805,66,'geputzt','naNw')}
  {text(153,831,68,'er wird,','naNw')}
  {text(528,831,42,'ohne','naNw')}
  {text(154,857,110,'ist geworden','naBold naNw')}
  {text(141,883,143,'wollen, ich will,','naNw')}
  {text(153,908,151,'du willst, er will,','naNw')}
  {text(153,934,99,'hat gewollt','naBold naNw')}
  {text(142,968,89,'unbedingt','naBold naNw')}
  {text(142,998,133,'auf keinen Fall','naNw')}
  {title('2',100,1100,760,'Welche Wörter möchten Sie noch lernen? Notieren Sie.','naGB')}
  {rect(994,1391,78,19,'#cbc3a4')}
  {stext(999,1392,68,'Modul 6',{color:'#fff',fontSize:'13px'},'naModul naNw')}
  {text(818,1392,113,'einundvierzig','naFooter')}
  {text(937,1393,10,'|','naFooter')}
  {text(964,1392,20,'41','naFooter')}
 </>}
 {page==='42'&&<>
  {art('0',15,38,927,79)}
  {art('1',730,176,230,156)}
  {rect(550,213,17,32,'#bcb19d')}
  {lin(745,117,125,2,'#9ccccd')}
  {lin(547,406,154,2,'#b7b7bc')}
  {lin(495,431,156,2,'#adacbb')}
  {lin(366,457,142,2,'#c3c5c6')}
  {lin(191,483,154,2,'#b8babb')}
  {lin(530,483,156,2,'#b1adbd')}
  {lin(467,535,154,2,'#acabb7')}
  {lin(823,640,141,2,'#bfbec2')}
  {lin(738,717,99,2,'#c0c3c3')}
  {lin(738,743,151,2,'#c4c4c6')}
  {lin(738,795,225,2,'#b8babc')}
  {lin(738,821,225,2,'#c0bfc2')}
  {lin(763,847,200,2,'#b9b8bc')}
  {lin(410,975,218,2,'#bab7c4')}
  {lin(639,975,219,2,'#bcbcbd')}
  {lin(450,1001,492,3,'#babdbf')}
  {lin(721,1027,248,2,'#babac1')}
  {lin(244,1246,557,3,'#b8b8be')}
  {lin(306,1272,409,2,'#b9bcbd')}
  {lin(299,1298,442,3,'#aaaab2')}
  {text(123,168,519,'1 Lesen Sie das Telefongespräch und ergänzen Sie.','naNw')}
  {text(172,211,486,'Arme | bleibe | Fieber | hoch | huste | schmerzen | krank | weh','naNw')}
  {text(192,252,493,'Hallo Lea, ich kann heute leider nicht zum Schwimmen','naNw')}
  {text(191,278,245,'kommen. Ich muss absagen.','naNw')}
  {text(191,304,123,'Warum denn?','naNw')}
  {text(192,330,60,'Ich bin','naNw')}
  {text(191,356,197,'Oh, was hast du denn?','naNw')}
  {text(192,381,121,'Ich habe Kopf','naNw')}
  {text(474,381,66,'und ich','naNw')}
  {text(191,407,298,'Oh, das tut mir leid. Hast du auch','naNw')}
  {text(652,407,6,'?','naNw')}
  {text(190,433,170,'Ja, es ist nicht sehr','naNw')}
  {text(509,433,349,'. Aber gut geht es mir nicht. Und meine','naNw')}
  {text(351,459,173,'und Beine tun auch','naNw')}
  {text(191,485,219,'Ach Mensch! Wie schade!','naNw')}
  {text(190,511,238,'Ja, das finde ich auch. Also','naNw')}
  {text(627,511,125,'lieber im Bett.','naNw')}
  {text(122,569,300,'2 Was ist das? Notieren Sie.','naNw')}
  {text(167,614,399,'a Dort können Sie Medikamente bekommen.','naNw')}
  {text(166,640,484,'b Haben Sie Kopfschmerzen? Dann können sie helfen.','naNw')}
  {text(191,666,241,'Sie sind oft klein und weiß.','naNw')}
  {text(167,692,550,'c Sie bekommen es beim Arzt und gehen damit zur Apotheke.','naNw')}
  {text(167,718,219,'d Hier arbeitet der Arzt.','naNw')}
  {text(167,744,551,'e Haben Sie Schmerzen in den Beinen? Dann kann sie helfen.','naNw')}
  {text(190,769,309,'Sie sollen sie auf keinen Fall essen.','naNw')}
  {text(167,795,275,'f Ein anderes Wort für „Arzt“.','naNw')}
  {text(165,821,421,'g So heißen Tabletten, Salben und vieles mehr.','naNw')}
  {text(165,884,461,'Was sagt der Arzt? Schreiben Sie im Imperativ.','naNw')}
  {text(166,924,209,'a Soll ich viel trinken?','naNw')}
  {text(165,950,239,'b Soll ich im Bett bleiben?','naNw')}
  {text(166,976,277,'c Soll ich diese Salbe nehmen?','naNw')}
  {text(166,1002,479,'d Soll ich die Medikamente in der Apotheke abholen?','naNw')}
  {text(164,1066,372,'Aussagen, Fragen und Imperativsätze','naBold naNw')}
  {text(167,1105,210,'Ordnen Sie die Sätze zu.','naNw')}
  {text(173,1142,611,'Holst du das Rezept in der Praxis ab? | Ich hole das Rezept in der Praxis ab. |','naNw')}
  {text(173,1170,346,'Holen Sie das Rezept bitte in der Praxis ab!','naNw')}
  {text(821,1202,159,'Position Position 2','naS20 naNw')}
  {text(165,1224,72,'Aussage:','naNw')}
  {text(164,1249,135,'Ja-/Nein-Frage:','naBold naNw')}
  {text(166,1275,126,'Imperativsatz:','naBold naNw')}
  {text(135,1325,687,'b Markieren Sie die Verben in a. Kreuzen Sie dann an: Wo stehen die Verben?','naNw')}
  {text(100,1398,175,'42 | zweiundvierzig','naFooter')}
  {field('p42-1-1',313,380,155,'1 Lücke 1')}
  {field('p42-1-2',545,380,159,'1 Lücke 2')}
  {field('p42-1-3',495,406,151,'1 Lücke 3')}
  {field('p42-1-4',366,432,139,'1 Lücke 4')}
  {field('p42-1-5',191,457,154,'1 Lücke 5')}
  {field('p42-1-6',530,457,155,'1 Lücke 6')}
  {field('p42-1-7',466,509,154,'1 Lücke 7')}
  {field('p42-2a',745,618,215,'2 a')}
  {field('p42-2c',745,697,215,'2 c')}
  {field('p42-2d',745,725,215,'2 d')}
  {field('p42-2e',745,775,215,'2 e')}
  {field('p42-2f',745,802,215,'2 f')}
  {field('p42-2g',745,827,215,'2 g')}
  {field('p42-3b',413,953,553,'3 b')}
  {field('p42-3c',452,979,514,'3 c')}
  {field('p42-3d',654,1007,312,'3 d')}
  {field('p42-4a-Aussage',248,1222,552,'4a Aussage')}
  {field('p42-4a-Frage',310,1251,490,'4a Frage')}
  {field('p42-4a-Imperativ',306,1280,494,'4a Imperativ')}
  {dot('4b-Aussage','Position 1',841,1231,'4b Aussage Position 1')}
  {dot('4b-Aussage','Position 2',933,1231,'4b Aussage Position 2')}
  {dot('4b-Frage','Position 1',841,1259,'4b Frage Position 1')}
  {dot('4b-Frage','Position 2',933,1259,'4b Frage Position 2')}
  {dot('4b-Imperativ','Position 1',841,1288,'4b Imperativ Position 1')}
  {dot('4b-Imperativ','Position 2',933,1288,'4b Imperativ Position 2')}
  {check('42-1',191,550,{'p42-1-1':'schmerzen','p42-1-2':'huste','p42-1-3':'Fieber','p42-1-4':'hoch','p42-1-5':'Arme','p42-1-6':'weh','p42-1-7':'bleibe'})}
  {check('42-2',745,868,{'p42-2a':'Apotheke','p42-2c':'Rezept','p42-2d':'Praxis','p42-2e':'Salbe','p42-2f':'Doktor','p42-2g':'Medikamente'})}
  {check('42-3',413,1048,{'p42-3b':'Ja, bleiben Sie im Bett.|Bleiben Sie im Bett.','p42-3c':'Ja, nehmen Sie diese Salbe.|Nehmen Sie diese Salbe.','p42-3d':'Ja, holen Sie die Medikamente in der Apotheke ab.|Holen Sie die Medikamente in der Apotheke ab.'})}
  {check('42-4',248,1322,{'p42-4a-Aussage':'Ich hole das Rezept in der Praxis ab.','p42-4a-Frage':'Holst du das Rezept in der Praxis ab?','p42-4a-Imperativ':'Holen Sie das Rezept bitte in der Praxis ab!','4b-Aussage':'Position 2','4b-Frage':'Position 1','4b-Imperativ':'Position 1'})}
 </>}
 {page==='43'&&<>
  {art('0',790,35,278,251)}
  {art('6',832,927,136,108)}
  {rect(290,971,17,32,'#d7ccb2')}
  {rect(60,1100,1000,34,'#efe9d2')}
  {lin(347,110,443,3,'#6aafab')}
  {lin(392,300,485,2,'#bfbec2')}
  {lin(164,351,784,2,'#a9acac')}
  {lin(365,402,570,2,'#bec1bf')}
  {lin(165,454,316,2,'#b5b5c5')}
  {lin(407,790,103,2,'#b5b5b5')}
  {lin(418,815,102,2,'#bfc5b7')}
  {lin(245,841,103,2,'#aeaeb3')}
  {lin(294,867,103,2,'#b4b5b1')}
  {lin(321,893,104,2,'#bcbfb1')}
  {text(101,84,240,'BASISTRAINING','naHeadline naNw')}
  {text(140,158,339,'Schreiben Sie Ratschläge mit doch.','naNw')}
  {text(143,185,566,'Ihr Nachbar arbeitet ein halbes Jahr nicht. Geben Sie Ratschläge!','naNw')}
  {text(465,235,235,'Soll ich um die Welt segeln oder','naNw')}
  {text(166,249,190,'(durch Europa reisen)','naNw')}
  {text(488,249,189,'soll ich zu Hause bleiben?','naNw')}
  {text(166,301,172,'(ins Ausland gehen)','naNw')}
  {text(141,332,7,'c','naSmall naNw')}
  {text(166,352,210,'(ein Instrument lernen)','naNw')}
  {text(141,379,9,'d','naNw')}
  {text(166,404,322,'(den Motorradführerschein machen)','naNw')}
  {text(141,436,8,'e','naSmall naNw')}
  {text(166,455,291,'(noch eine Fremdsprache lernen)','naNw')}
  {text(96,514,852,'6 Notieren Sie fünf Probleme und tauschen Sie mit Ihrer Partnerin / Ihrem Partner.','naNw')}
  {text(143,546,384,'Ihre Partnerin / Ihr Partner gibt Ratschläge.','naNw')}
  {text(149,593,75,'Problem','naBold naNw')}
  {text(436,593,88,'Ratschlag','naBold naNw')}
  {text(143,699,408,'Ergänzen Sie sollen in der richtigen Form.','naNw')}
  {text(142,740,515,'a Ich habe seit 3 Wochen Kopfschmerzen. Was ich tun?','naNw')}
  {text(165,766,236,'Was hat der Doktor gesagt?','naNw')}
  {text(516,766,169,'du im Bett bleiben?','naNw')}
  {text(166,791,246,'Die Lehrerin hat gesagt, wir','naNw')}
  {text(526,791,189,'oft Deutsch sprechen.','naNw')}
  {text(142,817,96,'d Und was','naNw')}
  {text(386,817,126,'noch machen?','naNw')}
  {text(142,843,146,'e Der Techniker','naNw')}
  {text(403,843,281,'morgen die Heizung reparieren.','naNw')}
  {text(142,869,173,'f Der Arzt sagt, Sie','naNw')}
  {text(431,869,361,'morgen Vormittag noch einmal kommen.','naNw')}
  {text(141,932,502,'Suchen Sie Körperteile, notieren und zeichnen Sie.','naNw')}
  {text(75,968,7,'8','naNw')}
  {text(146,968,501,'Köp | Häl | Fin | Rü | Bäu | fe | che | me | de | ger | Bei | cken | se |','naNw')}
  {text(710,968,79,'Singular','naNw')}
  {text(148,995,443,'ne | Fü | ren | ße | Knie | Oh | Au Ar | gen | ne | Hän | Zäh','naNw')}
  {text(741,995,31,'Kopf','naNw')}
  {text(97,1056,434,'9 Ergänzen Sie aus 8 und vergleichen Sie.','naNw')}
  {text(150,1102,66,'Deutsch','naNw')}
  {text(421,1102,72,'Englisch','naNw')}
  {text(577,1102,311,'Meine Sprache oder andere Sprachen','naNw')}
  {text(151,1132,35,'Kopf','naBold naNw')}
  {text(422,1132,36,'head','naBold naNw')}
  {text(422,1168,31,'arm','naSmall naNw')}
  {text(424,1193,45,'finger','naNw')}
  {text(152,1222,34,'Bein','naNw')}
  {text(423,1222,22,'leg','naNw')}
  {text(152,1252,37,'Auge','naBold naNw')}
  {text(423,1252,25,'eye','naBold naNw')}
  {text(423,1281,36,'knee','naNw')}
  {text(424,1311,38,'hand','naNw')}
  {text(811,1391,168,'dreiundvierzig | 43','naFooter')}
  {field('p43-5b',160,276,786,'5 b')}
  {field('p43-5c',160,326,786,'5 c')}
  {field('p43-5d',160,380,786,'5 d')}
  {field('p43-5e',160,436,786,'5 e')}
  {field('p43-7b',408,758,102,'7 b')}
  {field('p43-7c',418,785,102,'7 c')}
  {field('p43-7d',244,809,96,'7 d')}
  {field('p43-7e',295,841,103,'7 e')}
  {field('p43-7f',322,866,103,'7 f')}
  {field('p43-9arm',150,1163,260,'9 arm')}
  {field('p43-9finger',150,1188,260,'9 finger')}
  {field('p43-9knie',150,1276,260,'9 knie')}
  {field('p43-9hand',150,1306,260,'9 hand')}
  {check('43-1',160,472,{'p43-5b':'Gehen Sie doch ins Ausland.','p43-5c':'Lernen Sie doch ein Instrument.','p43-5d':'Machen Sie doch den Motorradführerschein.','p43-5e':'Lernen Sie doch noch eine Fremdsprache.'})}
  {check('43-2',244,907,{'p43-7b':'Sollst','p43-7c':'sollen','p43-7d':'sollt','p43-7e':'soll','p43-7f':'sollen'})}
  {check('43-3',150,1347,{'p43-9arm':'Arm','p43-9finger':'Finger','p43-9knie':'Knie','p43-9hand':'Hand'})}
 </>}
 {page==='44'&&<>
  {art('0',599,166,239,236)}
  {lin(371,111,607,3,'#6dadb4')}
  {lin(222,274,288,2,'#c2bfc5')}
  {lin(238,301,196,2,'#c2c0cf')}
  {lin(222,326,235,2,'#c5c2ca')}
  {lin(474,326,91,2,'#7a7a7a')}
  {lin(249,352,115,2,'#7a7a7a')}
  {lin(367,352,230,2,'#c5c5c7')}
  {lin(348,585,284,2,'#bcbcc2')}
  {lin(285,611,206,2,'#bfbfc0')}
  {lin(539,611,206,2,'#bfbfc5')}
  {lin(631,637,336,2,'#bebdc3')}
  {lin(483,662,205,2,'#c5bfe4')}
  {lin(630,689,212,2,'#c5c2d1')}
  {lin(1070,1359,2,92,'#c2c8c6')}
  {text(125,84,240,'BASISTRAINING','naHeadline naNw')}
  {text(119,154,379,'10 Was tut Ihnen weh? Notieren Sie.','naNw')}
  {text(165,199,51,'a Ich','naSmall naNw')}
  {text(854,199,7,'c','naSmall naNw')}
  {text(164,225,77,'b Meine','naNw')}
  {text(164,251,52,'c Ich','naNw')}
  {text(165,277,67,'d Mein','naNw')}
  {text(165,303,51,'e Ich','naNw')}
  {text(165,327,76,'f Meine','naBold naNw')}
  {text(119,400,312,'11 Ergänzen Sie das Gespräch.','naBold naNw')}
  {text(171,445,637,'hilft | viel Sport | schaffe ich nicht | einen Kräutertee | gegen Stress | einen Tipp','naNw')}
  {text(189,484,199,'Hallo Lina, wie geht\'s?','naNw')}
  {text(189,509,647,'Naja, es geht so. Ich habe gerade Probleme im Büro und super viel Stress.','naNw')}
  {text(188,536,138,'Oh je. Du Arme.','naNw')}
  {text(188,561,153,'Was machst du so','naNw')}
  {text(633,561,7,'?','naNw')}
  {text(189,587,89,'Ich mache','naNw')}
  {text(493,587,39,'. Das','naNw')}
  {text(187,613,357,'Ja, das stimmt. Aber ich habe nur wenig','naNw')}
  {text(549,613,75,'Zeit. Das','naNw')}
  {text(189,639,287,'Du kennst mich ja. Hast du noch','naNw')}
  {text(690,639,7,'?','naNw')}
  {text(189,665,312,'Hm, vielleicht kannst du am Abend','naNw')}
  {text(849,665,72,'trinken.','naNw')}
  {text(189,690,318,'Das ist eine gute Idee. Den kaufe ich','naNw')}
  {text(514,690,211,'mir gleich heute Abend.','naNw')}
  {text(163,767,783,'Was meint T. Lohmann? Lesen Sie den Text und kreuzen Sie an. Was ist richtig?','naNw')}
  {text(211,818,190,'Wie essen wir gesund?','naNw')}
  {text(211,859,350,'Der Ernährungswissenschaftler T. Loh-','naNw')}
  {text(615,859,271,'Und wie essen wir dann gesund?','naNw')}
  {text(211,885,350,'mann sagt: „Essen Sie, was Sie wollen.“ Sie','naNw')}
  {text(615,885,350,'T. Lohmanns Ratschlag lautet: „Ihr Körper','naNw')}
  {text(211,911,349,'haben viel zum Thema Essen gelernt und','naNw')}
  {text(614,911,351,'weiß es.“ Sie frühstücken immer morgens','naNw')}
  {text(210,937,351,'gelesen? Vergessen Sie es! Es ist nicht','naNw')}
  {text(615,937,351,'um 7.00 Uhr? Das sollen Sie nicht tun. Es-','naNw')}
  {text(210,963,350,'wichtig. Es gibt keine gesunden und auch','naNw')}
  {text(615,963,350,'sen Sie nicht zu festen Zeiten! Fragen Sie','naNw')}
  {text(211,989,350,'keine ungesunden Lebensmittel. Wir sol-','naNw')}
  {text(615,989,350,'immer Ihren Körper: Habe ich gerade','naNw')}
  {text(211,1014,350,'len fünfmal am Tag Obst und Gemüse es-','naNw')}
  {text(615,1014,69,'Hunger?','naNw')}
  {text(211,1040,348,'sen? „Nicht unbedingt“, sagt T. Lohmann.','naNw')}
  {text(615,1040,350,'Und was sollen wir essen? Auch das ist','naNw')}
  {text(211,1067,350,'Möchten Sie Obst und Gemüse essen und','naNw')}
  {text(614,1067,351,'ganz leicht. Fragen Sie sich: „Was möchte','naNw')}
  {text(211,1092,349,'schmeckt es Ihnen? Schön, dann essen Sie','naNw')}
  {text(615,1092,350,'ich gerade gern essen?“ Unser Körper','naNw')}
  {text(210,1118,351,'es. Sie möchten eigentlich gerade gar kein','naNw')}
  {text(614,1118,352,'braucht viele verschiedene Nahrungsmit-','naNw')}
  {text(210,1144,351,'Obst und Gemüse essen? Dann sollen Sie es','naNw')}
  {text(615,1144,350,'tel und kann uns immer sagen, was gut','naNw')}
  {text(211,1169,127,'auch nicht tun.','naNw')}
  {text(615,1169,89,'für ihn ist.','naNw')}
  {text(188,1233,443,'Wir sollen auf keinen Fall Obst und Gemüse essen.','naNw')}
  {text(188,1259,382,'Wir sollen nur gesunde Lebensmittel essen.','naNw')}
  {text(188,1285,507,'Wir sollen uns vor dem Essen fragen: „Habe ich Hunger?“','naNw')}
  {text(189,1311,479,'Der Körper kann uns sagen: „Das ist gesund für mich.“','naNw')}
  {text(99,1397,171,'44 | vierundvierzig','naFooter')}
  {field('p44-10c',221,249,367,'10 c')}
  {field('p44-10d',236,276,352,'10 d')}
  {field('p44-10e',221,301,367,'10 e')}
  {field('p44-10f',245,325,343,'10 f')}
  {field('p44-11-1',345,561,283,'11 Lücke 1')}
  {field('p44-11-2',285,585,205,'11 Lücke 2')}
  {field('p44-11-3',540,586,205,'11 Lücke 3')}
  {field('p44-11-4',632,612,334,'11 Lücke 4')}
  {field('p44-11-5',482,638,202,'11 Lücke 5')}
  {field('p44-11-6',508,663,334,'11 Lücke 6')}
  {dot('p44-12a','true',733,1238,'12 a',true)}
  {dot('p44-12b','true',733,1262,'12 b',true)}
  {dot('p44-12c','true',733,1288,'12 c',true)}
  {dot('p44-12d','true',733,1314,'12 d',true)}
  {check('44-1',221,366,{'p44-10c':'habe Bauchschmerzen','p44-10d':'Arm tut weh','p44-10e':'habe Kopfschmerzen','p44-10f':'Augen tun weh'})}
  {check('44-2',285,704,{'p44-11-1':'gegen Stress','p44-11-2':'viel Sport','p44-11-3':'hilft','p44-11-4':'schaffe ich nicht','p44-11-5':'einen Tipp','p44-11-6':'einen Kräutertee'})}
  {check('44-3',733,1348,{'p44-12a':'false','p44-12b':'false','p44-12c':'true','p44-12d':'true'})}
 </>}
 {page==='45'&&<>
  {art('0',408,41,660,79)}
  {art('1',162,220,560,70)}
  {rect(910,230,64,53,'#e4deca')}
  {lin(0,627,3,115,'#7a7a7a')}
  {lin(1065,728,7,424,'#c1c0c1')}
  {lin(787,862,178,4,'#77b5aa')}
  {lin(1062,1175,5,198,'#b4b4b4')}
  {lin(0,1223,6,209,'#c2c7cd')}
  {text(121,75,280,'TRAINING: HÖREN','naHeadline naNw')}
  {text(116,146,238,'1 Ansagen am Telefon','naBold naNw')}
  {text(162,179,766,'Lesen Sie die Antworten und die Fragen. Hören Sie dann die Ansage und kreuzen Sie an.','naNw')}
  {text(710,229,242,'Wann möchte Klaus Schneider','naNw')}
  {text(710,252,177,'zum Termin kommen?','naNw')}
  {text(169,275,94,'Morgen, um','naNw')}
  {text(168,307,183,'Mittwoch, um 8.00 Uhr','naNw')}
  {text(167,340,265,'Mittwoch, von 10.00 bis 12.00 Uhr','naNw')}
  {text(191,391,596,'Was ist beim Hören wichtig? Lesen Sie die Fragen genau und markieren Sie','naNw')}
  {text(190,413,637,'wichtige Wörter. Lesen Sie dann die Antworten. Alle Antworten können im Text','naNw')}
  {text(189,435,391,'vorkommen, aber achten Sie genau auf die Frage.','naNw')}
  {text(112,494,657,'2 Was ist richtig? Kreuzen Sie an. Sie hören jeden Text zweimal.','naNw')}
  {text(157,540,319,'a Wann kann Frau Huber vielleicht','naNw')}
  {text(548,540,7,'c','naNw')}
  {text(572,540,212,'Was funktioniert nicht?','naNw')}
  {text(179,566,148,'wieder arbeiten?','naNw')}
  {text(598,566,108,'Der Drucker.','naNw')}
  {text(206,591,164,'Heute Nachmittag.','naBold naNw')}
  {text(598,591,192,'Das E-Mail-Programm.','naBold naNw')}
  {text(205,619,164,'Morgen Vormittag.','naBold naNw')}
  {text(597,619,214,'Die Internetverbindung.','naBold naNw')}
  {text(205,645,179,'Morgen Nachmittag.','naBold naNw')}
  {text(154,682,10,'b','naNw')}
  {text(178,682,377,'Wo genau treffen sich Lea und David? d','naNw')}
  {text(569,682,361,'Wann können Sie in die Praxis kommen?','naNw')}
  {text(204,708,100,'An der Uni.','naNw')}
  {text(595,708,288,'Am Dienstagabend um 18.00 Uhr.','naNw')}
  {text(205,735,80,'Im Hotel.','naNw')}
  {text(594,735,321,'Am Donnerstagmorgen um 7. 00 Uhr.','naNw')}
  {text(204,760,91,'In der Bar.','naNw')}
  {text(594,760,323,'Am Mittwochvormittag um 9.00 Uhr.','naNw')}
  {text(112,827,663,'TRAINING: AUSSPRACHE Satzmelodie in Imperativ-Sätzen','naBold naNw')}
  {text(107,881,315,'1 Hören Sie und ergänzen Sie','naNw')}
  {text(601,881,353,'3 Hören Sie und ergänzen Sie das','naNw')}
  {text(152,912,161,'die Satzmelodie:','naNw')}
  {text(646,912,203,'Satzzeichen: ? oder !','naNw')}
  {text(152,953,166,'a Trinken Sie Tee?','naNw')}
  {text(669,953,153,'Haben Sie Husten','naNw')}
  {text(176,979,206,'Nehmen Sie Vitamin C?','naNw')}
  {text(669,979,225,'Probieren Sie Heilkräuter','naNw')}
  {text(174,1004,172,'Trinken Sie Kaffee?','naNw')}
  {text(668,1004,143,'Schlafen Sie viel','naNw')}
  {text(174,1030,154,'Arbeiten Sie viel?','naNw')}
  {text(669,1030,225,'Essen Sie regelmäßig Obst','naNw')}
  {text(150,1063,200,'b Trinken Sie viel Tee!','naNw')}
  {text(668,1063,196,'Gehen Sie schwimmen','naNw')}
  {text(175,1089,201,'Nehmen Sie Vitamin C!','naNw')}
  {text(668,1089,153,'Machen Sie Sport','naNw')}
  {text(173,1121,233,'Trinken Sie keinen Kaffee!','naNw')}
  {text(173,1141,264,'Und arbeiten Sie nicht so viel!','naNw')}
  {text(645,1141,232,'Hören Sie noch einmal und','naNw')}
  {text(643,1166,160,'sprechen Sie nach.','naNw')}
  {text(150,1210,194,'Ergänzen Sie oder','naNw')}
  {text(182,1251,270,'Die Satzmelodie geht bei Ja-/Nein-','naNw')}
  {text(152,1273,125,'REGEL Fragen nach','naNw')}
  {text(370,1273,77,'bei Bitten','naNw')}
  {text(181,1295,173,'und Ratschlägen nach','naNw')}
  {text(810,1394,171,'fünfundvierzig | 45','naFooter')}
  {dot('1z0','true',451,279,'Zeiten 1',true)}
  {dot('1z1','true',451,312,'Zeiten 2',true)}
  {dot('1z2','true',451,345,'Zeiten 3',true)}
  {dot('1t','0',700,279,'Termin 1 0')}
  {dot('1t','1',700,312,'Termin 2 1')}
  {dot('1t','2',700,345,'Termin 3 2')}
  {dot('2a','0',177,597,'2a 0')}
  {dot('2a','1',177,624,'2a 1')}
  {dot('2a','2',177,650,'2a 2')}
  {dot('2b','0',177,711,'2b 0')}
  {dot('2b','1',177,738,'2b 1')}
  {dot('2b','2',177,764,'2b 2')}
  {dot('2c','0',572,573,'2c 0')}
  {dot('2c','1',572,601,'2c 1')}
  {dot('2c','2',572,628,'2c 2')}
  {dot('2d','0',567,719,'2d 0')}
  {dot('2d','1',567,747,'2d 1')}
  {dot('2d','2',567,775,'2d 2')}
  {field('p45-r0',290,1274,74,'Regel 0')}
  {field('p45-r1',358,1294,82,'Regel 1')}
  {field('p45-3a',828,958,26,'3 a')}
  {field('p45-3b',900,983,26,'3 b')}
  {field('p45-3c',815,1010,26,'3 c')}
  {field('p45-3d',900,1036,26,'3 d')}
  {field('p45-3e',870,1061,26,'3 e')}
  {field('p45-3f',826,1088,26,'3 f')}
  {audio('assets/ab-a12-track19.mp3',56,158,'CD2 · Track19')}
  {audio('assets/ab-a12-track20.mp3',56,505,'CD2 · Track20')}
  {audio('assets/ab-a12-track21.mp3',56,892,'CD2 · Track21')}
  {audio('assets/ab-a12-track22.mp3',545,901,'CD2 · Track22')}
  {audio('assets/ab-a12-track23.mp3',582,1147,'CD2 · Track23')}
  {check('45-1',451,379,{'1z0':'true','1z1':'true','1z2':'false','1t':'2'})}
  {check('45-2',177,809,{'2a':'2','2b':'2','2c':'0','2d':'0'})}
  {check('45-3',290,1335,{'p45-r0':'oben','p45-r1':'unten'})}
  {check('45-4',815,1129,{'p45-3a':'?','p45-3b':'!','p45-3c':'!','p45-3d':'?','p45-3e':'!','p45-3f':'?'})}
 </>}
 {page==='46'&&<>
  {art('4',382,1219,172,79)}
  {lin(191,109,778,4,'#8cc4b9')}
  {lin(293,455,361,2,'#c5c5ca')}
  {lin(653,506,173,2,'#c4c3c4')}
  {lin(266,507,157,2,'#c1c4c5')}
  {lin(417,558,409,2,'#c4c5c6')}
  {lin(264,559,131,2,'#c4c0d6')}
  {lin(233,714,90,2,'#c6c2cc')}
  {lin(199,740,90,2,'#c7c2d7')}
  {lin(631,972,323,2,'#bec1c4')}
  {lin(270,998,257,2,'#c2c3c6')}
  {lin(197,1063,451,2,'#c4c4c7')}
  {lin(313,1089,225,2,'#c4c2cb')}
  {lin(540,1089,130,2,'#7a7a7a')}
  {lin(184,1115,253,2,'#c3c3c5')}
  {lin(417,1140,403,2,'#c4c7c7')}
  {lin(1067,1242,5,207,'#c0c7cb')}
  {text(114,84,70,'TEST','naBold naNw')}
  {text(110,154,332,'1 Ergänzen Sie die Körperteile.','naBold naNw')}
  {text(157,197,441,'Ich habe eine Brust, einen B (a) und einen R','naNw')}
  {text(691,197,27,'(b),','naNw')}
  {text(156,220,116,'zwei Arme, A','naNw')}
  {text(351,220,44,'(c), B','naNw')}
  {text(474,220,45,'(d), F','naNw')}
  {text(615,220,11,'H','naNw')}
  {text(712,220,48,'(f), O','naNw')}
  {text(863,220,84,'und Knie,','naNw')}
  {text(156,249,58,'zehn F','naNw')}
  {text(311,249,177,'(h) und viele Zähne.','naNw')}
  {text(919,267,45,'PUNKTE','naSmall naNw')}
  {text(110,310,464,'2 Viele Ratschläge. Was sagen die Personen?','naNw')}
  {text(156,352,653,'a Der Arzt sagt, ich soll in die Apotheke gehen und Medikamente kaufen.','naNw')}
  {text(180,382,42,'Arzt:','naNw')}
  {text(156,404,652,'b Der Apotheker sagt, ich soll eine Tablette nehmen und viel Tee trinken.','naNw')}
  {text(180,432,96,'Apotheker:','naBold naNw')}
  {text(156,456,605,'c Der Chef sagt, ich soll zu Hause bleiben und alle Termine absagen.','naNw')}
  {text(180,483,43,'Chef:','naNw')}
  {text(156,508,507,'d Der Kollege sagt, ich soll Obst essen und Sport machen.','naNw')}
  {text(174,533,74,'Kollege:','naBold naNw')}
  {text(922,533,45,'Punkte','naBold naNw')}
  {text(158,597,409,'Ergänzen Sie sollen in der richtigen Form.','naNw')}
  {text(157,637,74,'a Wir','naNw')}
  {text(278,637,318,'viele Orangen essen. Ist das richtig?','naNw')}
  {text(679,637,212,'Ja, sie sind sehr gesund.','naNw')}
  {text(156,663,73,'b Der','naNw')}
  {text(235,663,116,'Arzt sagt, ihr','naNw')}
  {text(452,663,177,'viel Wasser trinken!','naNw')}
  {text(680,663,255,'Wir mögen aber kein Wasser!','naNw')}
  {text(157,689,8,'c','naNw')}
  {text(200,689,27,'Ich','naNw')}
  {text(328,689,297,'jeden Tag fünf Tabletten nehmen.','naNw')}
  {text(681,689,143,'Das ist aber viel!','naNw')}
  {text(157,715,34,'d','naNw')}
  {text(295,715,273,'Herr Meyer in die USA fliegen?','naNw')}
  {text(681,715,164,'Nein, Herr Herold.','naNw')}
  {text(157,741,8,'e','naNw')}
  {text(200,741,33,'Was','naNw')}
  {text(335,741,634,'Tanja und Tamara noch einkaufen? Tomaten und fünf Brötchen bitte.','naNw')}
  {text(157,767,65,'f Du','naNw')}
  {text(324,767,176,'doch im Bett liegen.','naNw')}
  {text(686,767,213,'Och, es ist so langweilig.','naNw')}
  {text(112,826,182,'4 Schreiben Sie.','naNw')}
  {text(157,871,52,'Leser S.','naNw')}
  {text(390,871,104,'Frau Dr. Hauck','naNw')}
  {text(164,896,816,'Rückenschmerzen | Tipp? viel Sport machen | Apotheke/Salbe gegen Schmerzen holen | Arzt fragen','naNw')}
  {text(168,948,456,'Leser S. aus Stuttgart: Ich habe ein Problem. Seit Monaten','naNw')}
  {text(185,975,78,'Haben Sie','naNw')}
  {text(528,975,6,'?','naNw')}
  {text(168,1013,653,'Frau Dr. Hauck: Ja, das Problem haben viele. Diese Tipps sind jetzt wichtig für Sie:','naNw')}
  {text(184,1065,129,'Gehen Sie a','naNw')}
  {text(741,1065,28,'und','naNw')}
  {text(185,1117,176,'Das hilft nichts? Dann','naNw')}
  {text(185,1142,264,'Er kann Ihnen helfen. Alles Gute.','naNw')}
  {text(153,1209,62,'Wörter','naBold naNw')}
  {text(325,1209,87,'Strukturen','naBold naNw')}
  {text(493,1209,127,'Kommunikation','naBold naNw')}
  {text(197,1245,84,'0-3 Punkte','naS20 naNw')}
  {text(361,1245,27,'0-5','naS20 naNw')}
  {text(563,1245,49,'Punkte','naS20 naNw')}
  {text(197,1280,84,'4-5 Punkte','naS20 naNw')}
  {text(362,1280,27,'6-8','naS20 naNw')}
  {text(544,1280,50,'Punkte','naS20 naNw')}
  {text(198,1314,82,'6-7 Punkte','naS20 naNw')}
  {text(362,1314,92,'9-11 Punkte','naS20 naNw')}
  {text(529,1314,84,'5-6 Punkte','naS20 naNw')}
  {text(438,1355,223,'www.hueber.de/menschen/lernen','naFooter')}
  {text(94,1397,179,'46 | sechsundvierzig','naFooter')}
  {field('p46-1b',598,193,90,'1 (b)')}
  {field('p46-1c',272,220,76,'1 (c)')}
  {field('p46-1d',395,220,76,'1 (d)')}
  {field('p46-1e',521,220,54,'1 (e)')}
  {field('p46-1f',634,220,75,'1 (f)')}
  {field('p46-1g',762,218,68,'1 (g)')}
  {field('p46-1h',214,247,94,'1 (h)')}
  {field('p46-2b',282,427,533,'2 b')}
  {field('p46-2c',229,478,586,'2 c')}
  {field('p46-2d',254,528,561,'2 d')}
  {field('p46-3b',357,659,90,'3 b')}
  {field('p46-3c',233,685,90,'3 c')}
  {field('p46-3d',200,711,90,'3 d')}
  {field('p46-3e',240,738,90,'3 e')}
  {field('p46-3f',228,763,91,'3 f')}
  {check('46-1',214,290,{'p46-1b':'Rücken|ücken','p46-1c':'Augen|ugen','p46-1d':'Beine|eine','p46-1e':'Füße|üße','p46-1f':'Hände|ände','p46-1g':'Ohren|hren','p46-1h':'Finger|inger'})}
  {check('46-2',229,571,{'p46-2b':'Nehmen Sie eine Tablette und trinken Sie viel Tee.','p46-2c':'Bleiben Sie zu Hause und sagen Sie alle Termine ab.','p46-2d':'Essen Sie Obst und machen Sie Sport.'})}
  {check('46-3',200,806,{'p46-3b':'sollt','p46-3c':'soll','p46-3d':'Soll|soll','p46-3e':'sollen','p46-3f':'sollst'})}
 </>}
 </div><audio ref={player} className="naPlayer"/></div>;
}
