import {AB12Canvas,AB12Helpers,normalize} from '../ab12-shared';
import {CheckButton} from '../CheckButton';

function P69(h:AB12Helpers){const {line:ln,runs:rn,wl,art,field,rule,dot,check,title,kb,side,audio,strike,head,foot,tab,modTab,box,rect,values,set,results,sr}=h;return <>
  {<div style={{position:'absolute',left:107,top:150,width:608,height:206,background:'linear-gradient(to bottom,#dfe7ee 0px,#e9e9dd 10px,#fdfde9 18px,#fefef2 55%,#ffffff 94%)',boxShadow:'3px 3px 5px rgba(60,70,90,.22)'}}/>}
  {<div style={{position:'absolute',left:702,top:164,width:13,height:188,background:'linear-gradient(to left,#c3dcf3 0,#e8f2fb 60%,rgba(253,253,243,0) 100%)'}}/>}
  {rect(344,83,392,3,'#9a4580')}
  {rect(506,722,216,2,'#9a4580')}
  {rect(409,564,290,3,'#b8890c')}
  {rect(409,564,11,86,'#b8890c')}
  {<div style={{position:'absolute',left:409,top:626,writingMode:'vertical-rl',transform:'rotate(180deg)',font:'bold 8px Arial',color:'#1f1c10'}}>Tipp</div>}
  {rect(110,912,275,3,'#d3d9e0')}
  {rect(110,912,3,84,'#d3d9e0')}
  {<div style={{position:'absolute',left:113,top:973,writingMode:'vertical-rl',transform:'rotate(180deg)',font:'bold 7px Arial',color:'#31353c',letterSpacing:1}}>REGEL</div>}
  {[[166,793,19],[220,793,19],[293,793,19],[379,793,19],[139,811,18],[204,811,21],[285,811,19],[353,811,20]].map(([x,y,w])=><div key={'r'+y+x} className='naRule' style={{left:x,top:y,width:w,borderBottom:'1px solid #c6c6ce'}}/>)}
  {art('badge21',733,24,75,56)}
  {art('igel',443,368,283,90)}
  {art('hw1',106,561,258,20)}
  {art('hw2',106,582,266,21)}
  {art('hw3',106,603,232,19)}
  {art('smr',248,485,18,14)}
  {art('smf',465,485,15,14)}
  {wl(87,22,[{x:78,w:122,t:"TRAINING:"},{x:210,w:128,t:"SCHREIBEN"}])}
  {box('1',75,120)}  {rn(110,123,375,17,[{t:'Lesen Sie den Beitrag und notieren Sie die Regeln.',b:1}],{fam:'fira'})}
  {wl(188,14,[{x:125,w:53,t:'REGELN',b:1,c:'#124f9b'},{x:187,w:16,t:'IM',b:1,c:'#124f9b'},{x:211,w:84,t:'MIETSHAUS',b:1,c:'#124f9b'}])}
  {wl(206,10,[{x:566,w:24,t:'Paco,',c:'#797a7b'},{x:596,w:5,t:'7.',c:'#797a7b'},{x:606,w:51,t:'September',c:'#797a7b'}])}
  {wl(227,14,[{x:126,w:27,t:"Mein"},{x:158,w:59,t:"Vermieter"},{x:223,w:19,t:"hat"},{x:247,w:22,t:"sich"},{x:275,w:44,t:"gestern"},{x:325,w:34,t:"schon"},{x:365,w:39,t:"wieder"},{x:411,w:64,t:"beschwert."},{x:482,w:16,t:"Ich"},{x:504,w:28,t:"habe"},{x:538,w:21,t:"laut"},{x:566,w:33,t:"Musik"},{x:605,w:39,t:"gehört"},{x:650,w:22,t:"und"}])}
  {wl(246,14,[{x:125,w:35,t:"sofort"},{x:166,w:44,t:"klingelt"},{x:215,w:11,t:"er"},{x:231,w:14,t:"an"},{x:250,w:19,t:"der"},{x:273,w:21,t:"Tür."},{x:299,w:28,t:"Also,"},{x:334,w:15,t:"ich"},{x:356,w:18,t:"bin"},{x:379,w:35,t:"gegen"},{x:420,w:27,t:"viele"},{x:454,w:37,t:"Regeln"},{x:498,w:10,t:"in"},{x:514,w:35,t:"einem"},{x:556,w:32,t:"Haus."},{x:595,w:22,t:"Und"},{x:624,w:20,t:"ihr?"},{x:649,w:24,t:"Was"}])}
  {wl(265,14,[{x:126,w:34,t:"meint"},{x:166,w:21,t:"ihr?"},{x:192,w:42,t:"Schickt"},{x:241,w:18,t:"mir"},{x:265,w:25,t:"eure"},{x:297,w:79,t:"Kommentare."}])}
  {ln(126,282,547,14,'Immer heißt es: Das darfst du nicht. Das ist verboten. Sei leise! Bei uns im Haus ist es ganz schlimm.',{i:1,cls:'naDroid69'})}
  {ln(126,301,553,14,'Ich spiele in einer Band, aber am Mittag darf ich nicht üben. Wir dürfen nicht auf dem Balkon grillen.',{i:1,cls:'naDroid69'})}
  {ln(126,321,531,14,'In der Woche darf ich keine Party feiern. Laute Musik ist natürlich auch verboten. Ich frage mich:',{i:1,cls:'naDroid69'})}
  {ln(125,340,177,14,'Wo bleibt da der Spaß im Leben?',{i:1,cls:'naDroid69'})}  {wl(356,10,[{x:566,w:31,t:'Moritz',c:'#797a7b'},{x:602,w:14,t:'am',c:'#797a7b'},{x:621,w:5,t:'7.',c:'#797a7b'},{x:631,w:51,t:'September',c:'#797a7b'}])}
  {box('2',74,394)}  {rn(109,395.5,158,17,[{t:'Wie ist es bei Ihnen?',b:1}],{fam:'fira'})}  {wl(442,14,[{x:85,w:8,t:'a',c:'#3e5a96'},{x:110,w:46,t:'Welche'},{x:162,w:41,t:'Regeln'},{x:209,w:27,t:'gibt'},{x:241,w:20,t:'es?'},{x:267,w:59,t:'Ergänzen'},{x:331,w:18,t:'Sie'},{x:354,w:23,t:'den'},{x:382,w:60,t:'Wortigel.'}])}
  {wl(471,14,[{x:85,w:8,t:'b',c:'#3e5a96'},{x:110,w:24,t:'Wie'},{x:139,w:41,t:'finden'},{x:185,w:18,t:'Sie'},{x:208,w:19,t:'die'},{x:234,w:49,t:'Regeln?'},{x:289,w:59,t:'Ergänzen'},{x:353,w:18,t:'Sie'},{x:377,w:53,t:'Smileys.'}])}
  {wl(499,14,[{x:111,w:20,t:"Das"},{x:137,w:33,t:"finde"},{x:176,w:18,t:"ich"},{x:201,w:47,t:"richtig:"},{x:329,w:21,t:"Das"},{x:356,w:33,t:"finde"},{x:395,w:18,t:"ich"},{x:419,w:42,t:"falsch:"}])}
  {box('3',75,529)}  {rn(109,532.5,475,17,[{t:'Sortieren Sie Ihre Notizen und schreiben Sie einen Kommentar.',b:1}],{fam:'fira'})}
  {ln(435,573,257,14,'Wie schreiben Sie gute Texte? Sortieren Sie',{cls:'naDroid69'})}
  {ln(434,589,239,14,'vor dem Schreiben Ihre Notizen. Womit',{cls:'naDroid69'})}
  {ln(434,606,245,14,'wollen Sie anfangen? In welcher Reihen-',{cls:'naDroid69'})}
  {ln(435,623,231,14,'folge wollen Sie die Punkte erwähnen?',{cls:'naDroid69'})}
  {ln(435,639,189,14,'Nummerieren Sie Ihre Notizen.',{cls:'naDroid69'})}
  {wl(726,22,[{x:79,w:122,t:'TRAINING:'},{x:210,w:149,t:'AUSSPRACHE'}])}  {wl(728,17,[{x:375,w:45,t:'Vokale:'},{x:426,w:20,t:'„ä“'},{x:452,w:23,t:'und'},{x:482,w:19,t:'„e“'}],{i:1})}
  {box('1',75,743)}  {rn(111,746,195,17,[{t:'Ergänzen Sie „ä“ oder „e“.',b:1}],{fam:'fira'})}  {rn(517,744.5,205,17,[{t:'Hören Sie die Gedichte und',b:1}],{fam:'fira'})}
  {rn(516,764.5,142,17,[{t:'sprechen Sie dann.',b:1}],{fam:'fira'})}
  {wl(810,14,[{x:518,w:20,t:"Das"},{x:545,w:36,t:"Leben"},{x:588,w:13,t:"ist"},{x:608,w:37,t:"voller"},{x:651,w:46,t:"Regeln:"}])}
  {wl(830,14,[{x:517,w:16,t:"An"},{x:539,w:21,t:"der"},{x:565,w:41,t:"Ampel"},{x:612,w:47,t:"stehen,"}])}
  {wl(850,14,[{x:112,w:36,t:"Hören"},{x:155,w:17,t:"Sie"},{x:179,w:23,t:"und"},{x:208,w:57,t:"sprechen"},{x:271,w:17,t:"Sie"},{x:295,w:34,t:"nach."},{x:516,w:32,t:"ohne"},{x:555,w:34,t:"Hund"},{x:596,w:11,t:"in"},{x:613,w:63,t:"Geschäfte"},{x:681,w:38,t:"gehen"}])}
  {wl(869,14,[{x:517,w:25,t:"und"},{x:547,w:16,t:"im"},{x:570,w:27,t:"Park"},{x:604,w:22,t:"nur"},{x:632,w:21,t:"auf"},{x:658,w:22,t:"den"},{x:687,w:45,t:"Wegen."}])}
  {box('2',76,883)}  {rn(111,882.5,320,17,[{t:'Hören Sie noch einmal und kreuzen Sie an.',b:1}],{fam:'fira'})}
  {wl(900,14,[{x:518,w:44,t:'Keinen'},{x:570,w:33,t:'Helm'},{x:608,w:46,t:'tragen,'}])}
  {wl(918,14,[{x:517,w:20,t:"das"},{x:543,w:14,t:"ist"},{x:562,w:73,t:"gefährlich,"}])}
  {wl(937,14,[{x:517,w:28,t:"aber"},{x:550,w:24,t:"mal"},{x:579,w:51,t:"ehrlich,"}])}
  {wl(948,13,[{x:154,w:22,t:'sind',c:'#4e545a'},{x:181,w:26,t:'lang.',c:'#4e545a'}])}  {wl(964,13,[{x:155,w:22,t:'sind',c:'#4e545a'},{x:181,w:27,t:'kurz.',c:'#4e545a'}])}  {wl(959,15,[{x:517,w:69,t:'Fußgänger'},{x:591,w:40,t:'sagen:'}])}
  {wl(981,13,[{x:155,w:40,t:'können',c:'#4e545a'},{x:199,w:23,t:'lang',c:'#4e545a'},{x:226,w:24,t:'oder',c:'#4e545a'},{x:254,w:24,t:'kurz',c:'#4e545a'},{x:282,w:25,t:'sein.',c:'#4e545a'}])}  {wl(978,15,[{x:518,w:14,t:'Es'},{x:536,w:27,t:'geht'},{x:569,w:30,t:'auch'},{x:605,w:35,t:'ohne!'}])}
  {wl(998,14,[{x:136,w:45,t:"Achtung:"},{x:190,w:34,t:"Kurzes"},{x:230,w:14,t:"„ä“"},{x:250,w:19,t:"und"},{x:274,w:15,t:"„e“"},{x:294,w:40,t:"klingen"},{x:339,w:35,t:"gleich!"}])}
  {wl(1063,12,[{x:606,w:96,t:"neunundsechzig"},{x:715,w:2,t:"|"},{x:729,w:13,t:"69"}])}
  {modTab(752,1049,'Modul 7')}
  {box('3',482,745)}
  {audio('assets/ab-cd2-track31.mp3',71,834,'2 31')}
  {audio('assets/ab-cd2-track33.mp3',446,749,'2 33')}
  {audio('assets/ab-cd2-track32.mp3',40,884,'2 32')}
  {wl(792,14,[{x:110,w:8,t:'a'},{x:128,w:36,t:'Gesch'},{x:186,w:9,t:'ft'},{x:201,w:7,t:'–'},{x:214,w:5,t:'z'},{x:240,w:26,t:'lten'},{x:271,w:7,t:'–'},{x:284,w:9,t:'H'},{x:313,w:17,t:'lm'},{x:335,w:7,t:'–'},{x:348,w:32,t:'Fußg'},{x:400,w:29,t:'nger'}])}
  {wl(812,14,[{x:110,w:8,t:'b'},{x:129,w:7,t:'N'},{x:158,w:18,t:'he'},{x:179,w:7,t:'–'},{x:191,w:13,t:'W'},{x:226,w:7,t:'g'},{x:237,w:6,t:'–'},{x:248,w:37,t:'Fahrr'},{x:305,w:22,t:'der'},{x:331,w:8,t:'–'},{x:344,w:8,t:'R'},{x:374,w:18,t:'gel'}])}
  {field('p69-a1a1',166,781,19,'1 a 1','naFieldBlank')}
  {field('p69-a1a2',220,781,19,'1 a 2','naFieldBlank')}
  {field('p69-a1a3',293,781,19,'1 a 3','naFieldBlank')}
  {field('p69-a1a4',379,781,19,'1 a 4','naFieldBlank')}
  {field('p69-a1b1',139,799,18,'1 b 1','naFieldBlank')}
  {field('p69-a1b2',204,799,21,'1 b 2','naFieldBlank')}
  {field('p69-a1b3',285,799,19,'1 b 3','naFieldBlank')}
  {field('p69-a1b4',353,799,20,'1 b 4','naFieldBlank')}
  {wl(932,13,[{x:136,w:17,t:'Die',b:1},{x:158,w:38,t:'Vokale',b:1},{x:201,w:16,t:'„ä“',b:1},{x:223,w:21,t:'und',b:1},{x:250,w:16,t:'„e“',b:1}])}
  {field('p69-igel1',725,384,68,'Wortigel 1','naFieldBlank')}
  {field('p69-igel2',448,438,82,'Wortigel 2','naFieldBlank')}
  {field('p69-igel3',724,437,68,'Wortigel 3','naFieldBlank')}
  {dot('a2','lang',135,932,'Aussprache 2: sind lang.')}
  {dot('a2','kurz',135,951,'Aussprache 2: sind kurz.')}
  {dot('a2','langOderKurz',135,970,'Aussprache 2: koennen lang oder kurz sein.')}
  {check('confidence-p69-a2',420,982,{'a2':'langOderKurz'})}
  {check('g1',434,792,{'p69-a1a1':'ä','p69-a1a2':'e','p69-a1a3':'e','p69-a1a4':'ä','p69-a1b1':'ä','p69-a1b2':'e','p69-a1b3':'ä','p69-a1b4':'e'})}
  {<div style={{position:'absolute',left:60,top:1115,width:690,height:240,background:'#ffffff',border:'1.5px solid #d8d4c4'}}/>}
  {box('1',72,1123)}
  {rn(106,1126,320,17,[{t:'Notieren Sie die Regeln.',b:1}],{fam:'fira'})}
  {ln(80,1150,400,14,'Beispiel: nicht laut Musik hören',{i:1,cls:'naDroid69'})}
  {field('p69-s1r1',80,1176,560,'Schreiben 1 Regel 1','naFieldBlank')}
  {field('p69-s1r2',80,1221,560,'Schreiben 1 Regel 2','naFieldBlank')}
  {field('p69-s1r3',80,1266,560,'Schreiben 1 Regel 3','naFieldBlank')}
  {[1203,1248,1293].map(y=><div key={'pr'+y} className='naRule' style={{left:80,top:y,width:560,borderBottom:'1px solid #c6c6ce'}}/>)}
  {(()=>{const KEYS=['am mittag nicht üben','nicht auf dem balkon grillen','in der woche keine party feiern'];const IDS=['p69-s1r1','p69-s1r2','p69-s1r3'];const marks=Object.fromEntries(IDS.map(k=>[k,KEYS.join('|')]));return <div className="naCheck" data-check="s1" style={{left:80,top:1310}}><CheckButton answers={marks} onClick={()=>{const got=IDS.map(k=>normalize(values[k]||''));sr({...results,s1:KEYS.every(k=>got.includes(k))&&got.every(g=>KEYS.includes(g))})}}></CheckButton><output aria-live="polite">{('s1' in results)?(results.s1?'✓ Richtig!':'Noch einmal'):''}</output></div>})()}
</>}

export function NativeAB12P69({page}:{page:string}){
 if(page==='69')return <AB12Canvas page={page} width={810} height={1370}>{P69}</AB12Canvas>;
 return null;
}
