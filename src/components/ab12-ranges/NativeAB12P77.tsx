import {AB12Canvas,AB12Helpers} from '../ab12-shared';

function P77(h:AB12Helpers){const {line:ln,wl,art,rect,modTab}=h;
 return <>
  {/* background: blue sky gradient + margin wedges */}
  <div style={{position:'absolute',left:0,top:0,width:810,height:1095,background:'linear-gradient(to bottom,#1f5eb2 0px,#2161b6 110px,#5a86c9 138px,#ccd9ee 158px,#e4e7f1 195px,#e6e8f0 800px,#e1e2ec 1010px)'}}/>
  <div style={{position:'absolute',left:0,top:130,width:64,height:400,background:'linear-gradient(to bottom,rgba(33,97,182,.95),rgba(33,97,182,0))'}}/>
  <div style={{position:'absolute',left:753,top:130,width:57,height:210,background:'linear-gradient(to bottom,rgba(38,100,184,.9),rgba(38,100,184,0))'}}/>

  {/* white reading panel */}
  <div style={{position:'absolute',left:65,top:143,width:690,height:645,background:'#fff',transform:'rotate(-1.8deg)',boxShadow:'2px 3px 6px rgba(20,40,90,.18)'}}/>

  {/* top-right module bars */}
  {rect(730,31,23,59,'#0d3d93')}
  {rect(755,31,20,59,'#68004c')}
  {rect(779,31,26,59,'#7e0011')}

  {ln(72,57,169,26.5,'LITERATUR',{cls:'naLit77'})}

  {/* magenta banner, rises to the right */}
  <div style={{position:'absolute',left:57,top:122,width:285,height:40,background:'#670251',transform:'rotate(-3.8deg)',display:'flex',alignItems:'center',justifyContent:'center'}}>
   <span style={{fontFamily:"FiraSans,sans-serif",fontSize:20.5,color:'#fff'}}>WIEDERSEHEN IN WIEN</span>
  </div>

  {ln(100,185,291,17.2,'Teil 3: Findest du Lisa wirklich schön?',{b:1,fam:'fira'})}

  {wl(210,14,[{x:434,w:22,t:"„Für"},{x:462,w:19,t:"Lisa"},{x:487,w:58,t:"natürlich.“"}])}
  {wl(226,14,[{x:100,w:32,t:"„Nach"},{x:137,w:41,t:"rechts!“"}])}
  {wl(230,14,[{x:434,w:41,t:"„Gefällt"},{x:480,w:14,t:"dir"},{x:499,w:19,t:"Lisa"},{x:523,w:43,t:"wirklich"},{x:571,w:11,t:"so"},{x:586,w:24,t:"gut?"}])}
  {wl(246,14,[{x:100,w:32,t:"„Anja,"},{x:138,w:34,t:"bitte!“"}])}
  {wl(249,14,[{x:434,w:19,t:"„Ja,"},{x:458,w:22,t:"klar,"},{x:486,w:15,t:"ich"},{x:506,w:27,t:"finde"},{x:537,w:14,t:"sie"},{x:556,w:22,t:"sehr"},{x:583,w:31,t:"schön"},{x:619,w:19,t:"und"},{x:643,w:25,t:"auch"},{x:674,w:25,t:"nett."}])}
  {wl(265,14,[{x:100,w:21,t:"„Ich"},{x:126,w:25,t:"habe"},{x:155,w:10,t:"es"},{x:170,w:23,t:"aber"},{x:198,w:18,t:"auf"},{x:219,w:22,t:"dem"},{x:246,w:51,t:"Stadtplan"},{x:303,w:53,t:"gesehen.“"}])}
  {wl(269,14,[{x:443,w:14,t:"Du"},{x:462,w:38,t:"nicht?“"}])}
  {wl(284,14,[{x:101,w:27,t:"„Hier"},{x:132,w:23,t:"darf"},{x:159,w:22,t:"man"},{x:187,w:27,t:"nicht"},{x:219,w:24,t:"nach"},{x:250,w:32,t:"rechts"},{x:287,w:44,t:"fahren.“"}])}
  {wl(288,14,[{x:435,w:21,t:"„Ich"},{x:461,w:26,t:"weiß"},{x:492,w:31,t:"nicht,"},{x:529,w:14,t:"ich"},{x:549,w:26,t:"finde"},{x:581,w:13,t:"sie"},{x:599,w:27,t:"nicht"},{x:632,w:11,t:"so"},{x:648,w:47,t:"hübsch.“"}])}
  {wl(304,14,[{x:101,w:43,t:"„Warum"},{x:149,w:41,t:"nimmst"},{x:194,w:12,t:"du"},{x:212,w:26,t:"dann"},{x:243,w:16,t:"die"},{x:265,w:68,t:"Ringstraße?“"}])}
  {wl(308,14,[{x:435,w:26,t:"„Was"},{x:466,w:34,t:"gefällt"},{x:505,w:14,t:"dir"},{x:524,w:27,t:"nicht"},{x:556,w:12,t:"an"},{x:574,w:24,t:"ihr?“"}])}
  {wl(323,14,[{x:101,w:18,t:"„So"},{x:124,w:39,t:"können"},{x:168,w:17,t:"wir"},{x:190,w:25,t:"noch"},{x:220,w:16,t:"ein"},{x:241,w:29,t:"Stück"},{x:274,w:19,t:"von"},{x:298,w:27,t:"Wien"},{x:330,w:34,t:"sehen,"},{x:370,w:29,t:"bevor"}])}
  {wl(328,14,[{x:436,w:28,t:"„Naja"},{x:471,w:11,t:"..."},{x:488,w:20,t:"ihre"},{x:513,w:30,t:"Haare"},{x:548,w:21,t:"sind"},{x:575,w:11,t:"zu"},{x:591,w:32,t:"kurz.“"}])}
  {wl(343,14,[{x:109,w:16,t:"die"},{x:130,w:28,t:"Party"},{x:162,w:45,t:"anfängt."},{x:213,w:35,t:"Schau,"},{x:253,w:32,t:"rechts"},{x:290,w:22,t:"sind"},{x:317,w:17,t:"der"},{x:339,w:63,t:"Heldenplatz"}])}
  {wl(348,14,[{x:435,w:31,t:"„Was?"},{x:471,w:13,t:"Zu"},{x:490,w:27,t:"kurz?"},{x:522,w:16,t:"Die"},{x:544,w:21,t:"sind"},{x:569,w:32,t:"genau"},{x:607,w:44,t:"richtig.“"}])}
  {wl(362,14,[{x:110,w:19,t:"und"},{x:133,w:16,t:"die"},{x:155,w:46,t:"Hofburg,"},{x:206,w:19,t:"und"},{x:231,w:22,t:"dort"},{x:258,w:12,t:"ist"},{x:275,w:30,t:"schon"},{x:311,w:17,t:"das"}])}
  {wl(367,14,[{x:435,w:26,t:"„Und"},{x:467,w:16,t:"die"},{x:488,w:36,t:"Locken"},{x:530,w:35,t:"passen"},{x:570,w:27,t:"nicht"},{x:602,w:11,t:"zu"},{x:620,w:22,t:"ihr.“"}])}
  {wl(383,14,[{x:110,w:64,t:"Burgtheater"},{x:180,w:10,t:"…“"}])}
  {wl(386,14,[{x:435,w:24,t:"„Ach"},{x:465,w:24,t:"was,"},{x:494,w:15,t:"die"},{x:514,w:21,t:"sind"},{x:541,w:22,t:"sehr"},{x:568,w:40,t:"schön.“"}])}
  {wl(402,14,[{x:101,w:24,t:"Aber"},{x:129,w:23,t:"Anja"},{x:158,w:35,t:"schaut"},{x:198,w:27,t:"nicht"},{x:231,w:39,t:"hinaus."}])}
  {wl(406,14,[{x:436,w:22,t:"Herr"},{x:464,w:53,t:"Rossmann"},{x:522,w:27,t:"bellt."}])}
  {wl(421,14,[{x:101,w:27,t:"„Was"},{x:132,w:13,t:"ist"},{x:150,w:17,t:"los,"},{x:172,w:34,t:"Anja?“"},{x:211,w:26,t:"fragt"},{x:242,w:25,t:"Paul."}])}
  {wl(425,14,[{x:435,w:37,t:"„Siehst"},{x:478,w:17,t:"du,"},{x:501,w:22,t:"Herr"},{x:528,w:53,t:"Rossmann"},{x:587,w:31,t:"findet"},{x:623,w:16,t:"die"},{x:644,w:30,t:"Haare"}])}
  {wl(439,14,[{x:102,w:49,t:"„Nichts.“"}])}
  {wl(446,14,[{x:443,w:25,t:"auch"},{x:473,w:27,t:"gut.“"}])}
  {wl(460,14,[{x:102,w:18,t:"Das"},{x:125,w:12,t:"ist"},{x:142,w:17,t:"los:"},{x:166,w:21,t:"Paul"},{x:192,w:27,t:"redet"},{x:224,w:16,t:"die"},{x:245,w:31,t:"ganze"},{x:281,w:21,t:"Zeit"},{x:308,w:17,t:"nur"},{x:330,w:25,t:"noch"},{x:360,w:19,t:"von"},{x:385,w:23,t:"Lisa."}])}
  {wl(464,14,[{x:435,w:28,t:"„Herr"},{x:469,w:53,t:"Rossmann"},{x:527,w:31,t:"findet"},{x:564,w:15,t:"die"},{x:585,w:30,t:"Haare"},{x:620,w:51,t:"hässlich.“"}])}
  {wl(480,14,[{x:102,w:26,t:"„Was"},{x:133,w:12,t:"ist"},{x:150,w:26,t:"denn"},{x:181,w:30,t:"das?“,"},{x:217,w:26,t:"fragt"},{x:246,w:27,t:"Anja."}])}
  {wl(484,14,[{x:436,w:22,t:"Herr"},{x:464,w:53,t:"Rossmann"},{x:522,w:26,t:"bellt."}])}
  {wl(499,14,[{x:102,w:29,t:"„Naja"},{x:137,w:11,t:"..."},{x:154,w:49,t:"Blumen.“"}])}
  {wl(502,14,[{x:435,w:28,t:"„Herr"},{x:469,w:53,t:"Rossmann"},{x:527,w:21,t:"sagt"},{x:555,w:33,t:"Nein.“"}])}
  {wl(518,14,[{x:102,w:22,t:"„Für"},{x:128,w:32,t:"wen?“"}])}
  {wl(523,14,[{x:435,w:27,t:"„Herr"},{x:469,w:53,t:"Rossmann"},{x:527,w:21,t:"sagt"},{x:553,w:19,t:"Ja.“"}])}
  {wl(566,14,[{x:563,w:15,t:"Sie"},{x:584,w:45,t:"kommen"},{x:634,w:9,t:"in"},{x:649,w:15,t:"die"},{x:669,w:48,t:"Walfisch-"}])}
  {wl(586,14,[{x:562,w:32,t:"gasse."},{x:600,w:21,t:"Paul"},{x:627,w:27,t:"parkt"},{x:659,w:17,t:"das"},{x:680,w:29,t:"Auto."}])}
  {wl(605,14,[{x:562,w:27,t:"„Hier"},{x:595,w:12,t:"ist"},{x:612,w:11,t:"es"},{x:627,w:39,t:"schön“,"},{x:672,w:22,t:"sagt"},{x:699,w:25,t:"Paul."}])}
  {wl(624,14,[{x:563,w:28,t:"„Eine"},{x:595,w:52,t:"Wohnung"},{x:652,w:12,t:"im"},{x:670,w:33,t:"ersten"}])}
  {wl(644,14,[{x:565,w:32,t:"Bezirk"},{x:602,w:6,t:"—"},{x:614,w:27,t:"nicht"},{x:646,w:45,t:"schlecht"},{x:696,w:10,t:"…“"}])}
  {wl(663,14,[{x:564,w:25,t:"„Ach"},{x:594,w:20,t:"was"},{x:620,w:10,t:"…“"}])}
  {wl(683,14,[{x:565,w:22,t:"Herr"},{x:593,w:53,t:"Rossmann"},{x:651,w:26,t:"bellt."}])}
  {wl(702,14,[{x:564,w:18,t:"„Ja,"},{x:587,w:36,t:"genau,"},{x:629,w:32,t:"gehen"},{x:666,w:20,t:"wir,"}])}
  {wl(722,14,[{x:565,w:22,t:"Herr"},{x:593,w:61,t:"Rossmann!“"}])}
  {wl(741,14,[{x:564,w:42,t:"„Genau."},{x:612,w:21,t:"Und"},{x:638,w:37,t:"vergiss"},{x:679,w:29,t:"deine"}])}
  {wl(761,14,[{x:565,w:39,t:"Blumen"},{x:610,w:31,t:"nicht,"},{x:647,w:31,t:"Paul.“"}])}

  {/* illustration + dark bottom band */}
  {art('scene',0,534,560,561)}
  {art('band',560,1000,250,95)}

  {/* footer on the dark band */}
  {ln(597,1052,101,11.5,'siebenundsiebzig',{cls:'naDroid77',ls:0.45})}
  {rect(710,1047,1,17,'#e5e5e5')}
  {ln(724,1051,15,12,'77',{cls:'naDroid77',ls:0.6})}
  {modTab(746,1052,'Modul 7')}
 </>;
}

export function NativeAB12P77({page}:{page:string}){
 if(page==='77')return <AB12Canvas page={page} width={810} height={1095}>{P77}</AB12Canvas>;
 return null;
}
