import {AB12Canvas,AB12Helpers} from '../ab12-shared';

function P70(h:AB12Helpers){const {line:ln,runs:rn,wl,art,field,rule,dot,check,title,kb,side,audio,strike,head,foot,tab,modTab,box,rect,values,set}=h;return <>
  {rect(118,152,444,21,'#fcfbdd')}
  {[148,185,212,247,276,308,333,370,411,442,475,501,533].map(x=><div key={x} style={{position:'absolute',left:x,top:154,width:1,height:17,background:'#b9bccb'}}/>)}
  {rect(117,910,385,23,'#eae8d3')}
  {rect(118,683,460,19,'#f6f8dc')}
  {rect(118,702,256,19,'#f6f8dc')}
  {<div style={{position:'absolute',left:609,top:302,width:165,height:116,background:'#0440b0',borderRadius:8}}/>}
  {<div style={{position:'absolute',left:247,top:330,width:13,height:14,border:'1.5px solid #d2d3b8',borderRadius:'50%'}}/>}
  {[[138,500],[138,520],[138,540],[138,560],[138,597],[137,733],[137,772],[137,811],[137,850]].map(([x,y])=><div key={'sq'+y} style={{position:'absolute',left:x,top:y,width:7,height:7,background:'#0a3a91'}}/>)}
  {[[439,501],[439,520],[439,539],[439,559],[439,599],[137,752],[137,791],[137,830],[137,870]].map(([x,y])=><div key={'tr'+y} style={{position:'absolute',left:x,top:y,width:9,height:9,background:'#3aa13c',clipPath:'polygon(50% 0,100% 100%,0 100%)'}}/>)}
  {[[460,198,165],[637,218,90],[378,237,62],[556,237,66],[214,257,62],[552,276,68],[196,529,104],[530,549,95],[163,567,85],[484,607,94],[180,762,272],[180,801,540],[180,840,540],[180,879,540]].map(([x,y,w])=><div key={'r'+y+x} className='naRule' style={{left:x,top:y,width:w,borderBottom:'1px solid #c6c6ce'}}/>)}
  {art('xcirc',159,327,21,19)}
  {art('sm1',148,748,17,16)}
  {art('sm2',148,787,17,16)}
  {art('sm3',148,827,17,16)}
  {art('sm4',148,865,17,16)}
  {art('dotr',122,937,19,16)}
  {art('doty',122,961,19,16)}
  {art('dotg',122,988,19,16)}
  {wl(85,22,[{x:91,w:52,t:'TEST'}])}  {rect(148,84,585,2,'#a3357f')}
  {box('1',88,122)}  {rn(120,123,490,17,[{t:'Regeln in „Ordnungsstadt“. Bilden Sie Wörter und ordnen Sie zu.',b:1}],{fam:'fira'})}
  {wl(195,15,[{x:121,w:6,t:'a'}])}  {ln(140,182,250,15,'Der See ist für alle da. Hier dürfen Sie',{cls:'naDroid70'})}  {ln(397,182,24,15,'baden',{i:1,c:'#476fac'})}  {ln(431,182,23,15,'und',{cls:'naDroid70'})}  {ln(627,182,4,15,'.',{cls:'naDroid70'})}
  {wl(217,15,[{x:122,w:6,t:'b'}])}  {ln(140,204,268,15,'In Ordnungsstadt gibt es viele Fahrräder.',{cls:'naDroid70'})}  {ln(417,204,209,15,'Alle Fahrer müssen einen Helm',{cls:'naDroid70'})}  {ln(730,204,4,15,'.',{cls:'naDroid70'})}
  {wl(236,15,[{x:121,w:6,t:'c'}])}  {ln(140,223,199,15,'Im Park sind viele Spielplätze.',{cls:'naDroid70'})}  {ln(347,223,29,15,'Bitte',{cls:'naDroid70'})}  {ln(445,223,104,15,'Sie Ihr Fahrrad,',{cls:'naDroid70'})}  {ln(628,223,44,15,'Sie auf',{cls:'naDroid70'})}
  {ln(140,243,72,15,'Kinder und',{cls:'naDroid70'})}  {ln(282,243,155,15,'Sie Hunde an die Leine.',{cls:'naDroid70'})}
  {wl(275,15,[{x:121,w:6,t:'d'}])}  {ln(139,262,408,15,'Vor dem Krankenhaus müssen Sie leise sein und dürfen nicht',{cls:'naDroid70'})}  {ln(622,262,4,15,'.',{cls:'naDroid70'})}
  {box('2',88,296)}  {rn(120,297,240,17,[{t:'Was ist richtig? Kreuzen Sie an.',b:1}],{fam:'fira'})}
  {ln(122,329,27,15,'Hier',{cls:'naDroid70'})}  {ln(184,329,48,15,'können',{cls:'naDroid70'})}  {ln(268,329,47,15,'müssen',{cls:'naDroid70'})}  {ln(330,329,211,15,'(a) Kinder bis 14 Jahren spielen,',{cls:'naDroid70'})}
  {ln(121,350,49,15,'aber sie',{cls:'naDroid70'})}  {ln(205,350,43,15,'dürfen',{cls:'naDroid70'})}  {ln(283,350,43,15,'wollen',{cls:'naDroid70'})}  {ln(341,350,133,15,'(b) nicht Rad fahren.',{cls:'naDroid70'})}
  {ln(122,370,73,15,'Am Morgen',{cls:'naDroid70'})}  {ln(231,370,42,15,'wollen',{cls:'naDroid70'})}  {ln(310,370,47,15,'können',{cls:'naDroid70'})}  {ln(373,370,224,15,'(c) die Kinder nicht auf dem Platz',{cls:'naDroid70'})}
  {ln(121,389,166,15,'spielen, und nach 20 Uhr',{cls:'naDroid70'})}  {ln(322,389,44,15,'dürfen',{cls:'naDroid70'})}  {ln(401,389,47,15,'müssen',{cls:'naDroid70'})}  {ln(464,389,86,15,'(d) sie gehen.',{cls:'naDroid70'})}
  {ln(121,409,67,15,'Die Kinder',{cls:'naDroid70'})}  {ln(226,409,48,15,'können',{cls:'naDroid70'})}  {ln(310,409,47,15,'müssen',{cls:'naDroid70'})}  {ln(373,409,170,15,'(e) etwas trinken, aber sie',{cls:'naDroid70'})}
  {ln(142,428,42,15,'dürfen',{cls:'naDroid70'})}  {ln(220,428,48,15,'müssen',{cls:'naDroid70'})}  {ln(283,428,225,15,'(f) keine Glasflaschen mitbringen.',{cls:'naDroid70'})}
  {box('3',88,462)}  {rn(120,463,410,17,[{t:'Ergänzen Sie dürfen oder müssen in der richtigen Form.',b:1}],{fam:'fira'})}
  {wl(508,15,[{x:121,w:5,t:'a'}])}  {ln(152,495,23,15,'Darf',{i:1,c:'#4065a0'})}  {ln(182,495,148,15,'ich hier fotografieren?',{cls:'naDroid70'})}  {ln(456,495,120,15,'Nein, leider nicht.',{cls:'naDroid70'})}
  {wl(528,15,[{x:120,w:7,t:'b'}])}  {ln(152,514,37,15,'Wann',{cls:'naDroid70'})}  {ln(307,514,68,15,'ihr gehen?',{cls:'naDroid70'})}  {ln(456,514,276,15,'In 10 Minuten, der Zug fährt um 13.30 Uhr.',{cls:'naDroid70'})}
  {wl(546,15,[{x:120,w:6,t:'c'}])}  {ln(152,533,162,15,'Gehen wir ein Eis essen?',{cls:'naDroid70'})}  {ln(455,533,68,15,'Später, ich',{cls:'naDroid70'})}  {ln(631,533,46,15,'lernen.',{cls:'naDroid70'})}
  {wl(566,15,[{x:120,w:6,t:'d'}])}  {ln(253,553,121,15,'die Kinder auf der',{cls:'naDroid70'})}  {ln(454,553,178,15,'Ja, das ist eine Spielstraße.',{cls:'naDroid70'})}
  {ln(152,573,100,15,'Straße spielen?',{cls:'naDroid70'})}
  {wl(606,15,[{x:120,w:6,t:'e'}])}  {ln(153,592,220,15,'Die Ampel ist rot. Wie heißt dann',{cls:'naDroid70'})}  {ln(455,592,22,15,'Wir',{cls:'naDroid70'})}  {ln(585,592,81,15,'hier warten.',{cls:'naDroid70'})}
  {ln(156,612,64,15,'die Regel?',{cls:'naDroid70'})}
  {box('4',88,647)}  {rn(120,648,210,17,[{t:'Ergänzen Sie die Gespräche.',b:1}],{fam:'fira'})}
  {wl(694,15,[{x:125,w:30,t:"Diese",c:'#364d77'},{x:162,w:29,t:"Regel",c:'#304d7f'},{x:198,w:13,t:"ist",c:'#34517d'},{x:218,w:9,t:"in",c:'#214478'},{x:234,w:53,t:"Ordnung.",c:'#2d4d7b'},{x:294,w:1,t:"|"},{x:301,w:19,t:"Das",c:'#244777'},{x:326,w:28,t:"finde",c:'#2e4b77'},{x:361,w:16,t:"ich",c:'#2d4d78'},{x:383,w:17,t:"gar",c:'#385686'},{x:407,w:30,t:"nicht",c:'#2e4777'},{x:442,w:24,t:"gut.",c:'#274878'},{x:472,w:1,t:"|"},{x:479,w:19,t:"Das",c:'#2b4f82'},{x:505,w:13,t:"ist",c:'#2a4171'},{x:524,w:37,t:"falsch.",c:'#314d7a'},{x:568,w:1,t:"|"}])}
  {wl(713,15,[{x:125,w:19,t:"Das",c:'#3a577c'},{x:150,w:13,t:"ist",c:'#475d85'},{x:168,w:10,t:"ja",c:'#3b5981'},{x:184,w:47,t:"wirklich",c:'#3e5884'},{x:237,w:23,t:"sehr",c:'#314f7f'},{x:266,w:64,t:"gefährlich,",c:'#324f7c'},{x:336,w:32,t:"oder?",c:'#2b4a7b'}])}
  {wl(743,15,[{x:120,w:5,t:"a"},{x:152,w:20,t:"Ich"},{x:177,w:22,t:"soll"},{x:205,w:68,t:"manchmal"},{x:280,w:26,t:"Obst"},{x:312,w:38,t:"essen."},{x:357,w:15,t:"Ist"},{x:378,w:20,t:"das"},{x:404,w:51,t:"richtig?"}])}
  {wl(764,15,[{x:449,w:5,t:"."},{x:458,w:16,t:"Du"},{x:480,w:33,t:"sollst"},{x:518,w:35,t:"jeden"},{x:559,w:21,t:"Tag"},{x:585,w:27,t:"Obst"},{x:618,w:38,t:"essen."}])}
  {wl(782,15,[{x:119,w:7,t:"b"},{x:152,w:33,t:"Mein"},{x:191,w:45,t:"Freund"},{x:242,w:36,t:"segelt"},{x:284,w:16,t:"im"},{x:307,w:41,t:"Herbst"},{x:354,w:16,t:"im"},{x:376,w:47,t:"Pazifik."}])}
  {wl(821,15,[{x:120,w:4,t:"c"},{x:152,w:39,t:"Meine"},{x:198,w:43,t:"Kinder"},{x:247,w:43,t:"wollen"},{x:296,w:20,t:"nie"},{x:321,w:17,t:"im"},{x:344,w:58,t:"Haushalt"},{x:407,w:46,t:"helfen!"}])}
  {wl(860,15,[{x:119,w:6,t:"d"},{x:151,w:73,t:"Autofahrer"},{x:229,w:48,t:"müssen"},{x:283,w:43,t:"immer"},{x:331,w:37,t:"einen"},{x:373,w:29,t:"Gurt"},{x:407,w:55,t:"anlegen."}])}
  {wl(924,15,[{x:122,w:40,t:'Wörter'},{x:246,w:65,t:'Strukturen'},{x:373,w:94,t:'Kommunikation'}])}
  {wl(949,11,[{x:150,w:18,t:'0-3'},{x:176,w:36,t:'Punkte'},{x:274,w:20,t:'0-4'},{x:306,w:37,t:'Punkte'},{x:396,w:21,t:'0-2'},{x:426,w:37,t:'Punkte'}])}
  {wl(975,11,[{x:150,w:5,t:'4'},{x:161,w:37,t:'Punkte'},{x:274,w:17,t:'5-7'},{x:306,w:37,t:'Punkte'},{x:396,w:8,t:'3'},{x:411,w:36,t:'Punkte'}])}
  {wl(1000,11,[{x:151,w:18,t:'5-6'},{x:176,w:36,t:'Punkte'},{x:274,w:18,t:'8-9'},{x:306,w:37,t:'Punkte'},{x:398,w:8,t:'4'},{x:412,w:35,t:'Punkte'}])}
  {wl(1029,12,[{x:332,w:166,t:"www.hueber.de/menschen/lernen"}])}
  {wl(1064,12,[{x:68,w:12,t:"70"},{x:92,w:1,t:"|",bg:'#cccfd0'},{x:107,w:40,t:"siebzig"}])}
  {wl(168,15,[{x:125,w:20,t:'gen',c:'#3a4f84'},{x:159,w:17,t:'ben',c:'#3a4f84'},{x:191,w:18,t:'ach',c:'#3a4f84'},{x:222,w:24,t:'grill',c:'#3a4f84'},{x:254,w:19,t:'pen',c:'#3a4f84'},{x:286,w:16,t:'tra',c:'#3a4f84'},{x:314,w:13,t:'ba',c:'#2b62c0',s:1},{x:339,w:17,t:'men',c:'#3a4f84'},{x:376,w:29,t:'schie',c:'#3a4f84'},{x:418,w:17,t:'ten',c:'#3a4f84'},{x:448,w:18,t:'den',c:'#2b62c0',s:1},{x:482,w:13,t:'hu',c:'#3a4f84'},{x:508,w:16,t:'len',c:'#3a4f84'},{x:537,w:20,t:'neh',c:'#3a4f84'}])}
  {ln(627,313,51,10.9,'Spielplatz',{c:'#ffffff',fam:'sans',b:1})}
  {ln(626,330,117,11,'für Kinder bis 14 Jahren',{c:'#ffffff',fam:'sans'})}
  {ln(626,347,75,10.6,'von 13 – 20 Uhr',{c:'#ffffff',fam:'sans'})}
  {ln(626,363,134,11.2,'keine Hunde, Glasflaschen',{c:'#ffffff',fam:'sans'})}
  {ln(626,380,75,11.4,'Radfahren und',{c:'#ffffff',fam:'sans'})}
  {ln(627,397,123,11.5,'Fußballspielen verboten',{c:'#ffffff',fam:'sans'})}
  {ln(673,266,60,10,'_ / 6 PUNKTE',{c:'#666666',ls:1,cls:'naDroid70'})}
  {ln(672,443,61,10,'_ / 5 PUNKTE',{c:'#666666',ls:1,cls:'naDroid70'})}
  {ln(672,618,61,10,'_ / 4 PUNKTE',{c:'#666666',ls:1,cls:'naDroid70'})}
  {ln(671,891,61,10,'_ / 4 PUNKTE',{c:'#666666',ls:1,cls:'naDroid70'})}
  {<div style={{position:'absolute',left:64,top:138,writingMode:'vertical-rl',transform:'rotate(180deg)',font:'9px Arial',color:'#7086b1',letterSpacing:1.5}}>Wörter</div>}
  {<div style={{position:'absolute',left:64,top:341,writingMode:'vertical-rl',transform:'rotate(180deg)',font:'9px Arial',color:'#7086b1',letterSpacing:1.5}}>Strukturen</div>}
  {<div style={{position:'absolute',left:64,top:521,writingMode:'vertical-rl',transform:'rotate(180deg)',font:'9px Arial',color:'#7086b1',letterSpacing:1.5}}>Strukturen</div>}
  {<div style={{position:'absolute',left:64,top:683,writingMode:'vertical-rl',transform:'rotate(180deg)',font:'9px Arial',color:'#7086b1',letterSpacing:1.5}}>Kommunikation</div>}
  {art('dotr',246,937,19,16)}
  {art('dotr',372,937,19,16)}
  {art('doty',246,961,19,16)}
  {art('doty',372,961,19,16)}
  {art('dotg',246,988,19,16)}
  {art('dotg',372,988,19,16)}
  {modTab(18,1048,'Modul 7')}
  {field('p70-1a',460,186,165,'1a','naFieldBlank')}
  {field('p70-1b',637,205,90,'1b','naFieldBlank')}
  {field('p70-1c1',378,224,62,'1c1','naFieldBlank')}
  {field('p70-1c2',556,224,66,'1c2','naFieldBlank')}
  {field('p70-1c3',214,244,62,'1c3','naFieldBlank')}
  {field('p70-1d',552,264,68,'1d','naFieldBlank')}
  {dot('r2b','dürfen',184,349,'2 b dürfen')}
  {dot('r2b','wollen',263,350,'2 b wollen')}
  {dot('r2c','wollen',211,369,'2 c wollen')}
  {dot('r2c','können',289,369,'2 c können')}
  {dot('r2d','dürfen',302,388,'2 d dürfen')}
  {dot('r2d','müssen',380,389,'2 d müssen')}
  {dot('r2e','können',205,408,'2 e können')}
  {dot('r2e','müssen',289,408,'2 e müssen')}
  {dot('r2f','dürfen',121,427,'2 f dürfen')}
  {dot('r2f','müssen',200,427,'2 f müssen')}
  {field('p70-3b',196,514,104,'3b','naFieldBlank')}
  {field('p70-3c',530,534,95,'3c','naFieldBlank')}
  {field('p70-3d',163,552,85,'3d','naFieldBlank')}
  {field('p70-3e',484,592,94,'3e','naFieldBlank')}
  {field('p70-4a',180,734,272,'4a','naFieldBlank')}
  {field('p70-4b',180,782,540,'4b','naFieldBlank')}
  {field('p70-4c',180,820,540,'4c','naFieldBlank')}
  {field('p70-4d',180,859,540,'4d','naFieldBlank')}
  {check('g1',743,186,{'p70-1a':'grillen','p70-1b':'tragen','p70-1c1':'schieben','p70-1c2':'achten','p70-1c3':'nehmen','p70-1d':'hupen'})}
  {check('g2',525,433,{'r2b':'dürfen','r2c':'können','r2d':'müssen','r2e':'können','r2f':'dürfen'})}
  {check('g3',610,614,{'p70-3b':'müsst','p70-3c':'muss','p70-3d':'Dürfen|dürfen','p70-3e':'müssen'})}
  {check('g4',600,884,{'p70-4a':'Das ist falsch.|Das ist falsch','p70-4b':'Das ist ja wirklich sehr gefährlich, oder?','p70-4c':'Das finde ich gar nicht gut.|Das finde ich gar nicht gut','p70-4d':'Diese Regel ist in Ordnung.|Diese Regel ist in Ordnung'})}
</>}

export function NativeAB12P70({page}:{page:string}){
 if(page==='70')return <AB12Canvas page={page} width={807} height={1094}>{P70}</AB12Canvas>;
 return null;
}
