import {useNativeCanvas,Canvas,Words} from './shared';
import {LineMatching} from '../exercises/LineMatching';

export function NativeAB12L23({page}:{page:string}){
 const c=useNativeCanvas(page);
 const {text,art,field,rule,ruleT,dot,check,title,kb,hand,audio}=c;const set=c.set;
 return <Canvas page={page} root={c.root} player={c.player} scale={c.scale}>
 {page==='84'&&<>
  {art('hero',8,30,742,60)}
  {kb(58,136,'KB 3')}
  {title('1',88,124,620,'Ordnen Sie zu.','naRB naNw')}
  <div className="naSide naSideB" style={{left:64,top:165}}>WÖRTER</div>
  <div className="naBank" style={{left:122,top:162,width:592,height:22}}/>
  <div className="naBank" style={{left:122,top:186,width:592,height:20}}/>
  <div className="naText naS14 naNw" style={{left:124,top:164,width:600}}><Words text="Die Sonne scheint. | "/><span className="naStrikeB"><Words text="Es wird bald sehr windig."/></span><Words text=" | Es ist bewölkt. | Es ist kühl. | Es ist schön warm. |"/></div>
  <div className="naText naS14 naNw" style={{left:124,top:188,width:600}}><Words text="Es regnet schon lange. | "/><span className="naStrikeB"><Words text="Es wird kälter."/></span><Words text=" | Man sieht nicht viele Wolken. | Es gibt bald ein Gewitter."/></div>
  {art('foto-a',120,208,152,88)}
  {art('foto-b',336,208,152,88)}
  {art('foto-c',552,208,156,88)}
  {art('hand-b',336,300,152,17)}
  {art('hand-c',554,300,150,17)}
    {field('84-1-a1',121,297,151,'Foto A Zeile 1')}
  {field('84-1-a2',121,316,151,'Foto A Zeile 2')}
  {field('84-1-a3',121,336,151,'Foto A Zeile 3')}
  {field('84-1-b1',339,316,151,'Foto B Zeile 1')}
  {field('84-1-b2',339,336,151,'Foto B Zeile 2')}
  {field('84-1-c1',557,316,151,'Foto C Zeile 1')}
  {field('84-1-c2',557,336,151,'Foto C Zeile 2')}
  {check('84-1',714,344,{'84-1-a1':'Die Sonne scheint|Es ist schön warm|Man sieht nicht viele Wolken','84-1-a2':'Die Sonne scheint|Es ist schön warm|Man sieht nicht viele Wolken','84-1-a3':'Die Sonne scheint|Es ist schön warm|Man sieht nicht viele Wolken','84-1-b1':'Es ist bewölkt|Es ist kühl','84-1-b2':'Es ist bewölkt|Es ist kühl','84-1-c1':'Es regnet schon lange|Es gibt bald ein Gewitter','84-1-c2':'Es regnet schon lange|Es gibt bald ein Gewitter'})}
  {kb(58,380,'KB 3')}
  {title('2',88,376,620,'Ergänzen Sie.','naRB naNw')}
  <div className="naSide naSideB" style={{left:64,top:404}}>WÖRTER</div>
  {text(121,404,16,'a')}{text(140,404,110,'Es ist heute sehr','naS14 naNw')}{art('hand-2a',244,400,36,28)}{text(290,404,230,'(ginble). Man kann den Kirchturm im','naS14 naNw')}{field('84-2-a',544,404,78,'2 a Nebel')}{text(628,404,80,'(benle) fast','naS14 naNw')}
  {text(140,424,100,'nicht sehen.','naS14')}
  {text(121,444,16,'b')}{text(140,444,190,'Oh, sieh mal, wie schön der','naS14 naNw')}{field('84-2-b1',327,442,77,'2 b Schnee')}{text(410,444,300,'(cheens) in den Bergen ist. Morgen soll es','naS14 naNw')}
  {text(140,464,80,'noch mehr','naS14 naNw')}{field('84-2-b2',215,462,78,'2 b schneien')}{text(300,464,90,'(neisnech).','naS14 naNw')}
  {text(121,484,16,'c')}{text(140,484,250,'Morgen bekommen wir wieder mehr','naS14 naNw')}{field('84-2-c',386,481,75,'2 c Wind')}{text(466,484,290,'(dnwi). Dann können wir weiter segeln.','naS14 naNw')}
  {text(121,504,16,'d')}{text(140,504,255,'Die Kinder können nicht schlafen. Es','naS14 naNw')}{field('84-2-d1',391,501,78,'2 d donnert')}{text(475,504,90,'(tnnored) und','naS14 naNw')}{field('84-2-d2',572,501,78,'2 d blitzt')}{text(655,504,60,'(iltbtz).','naS14 naNw')}
  {text(121,524,16,'e')}{text(140,524,260,'Morgen wird das Wetter super. Es wird','naS14 naNw')}{field('84-2-e1',401,520,71,'2 e sonnig')}{text(478,524,240,'(gionns) und wir bekommen','naS14 naNw')}
  {text(140,544,30,'25','naS14')}{field('84-2-e2',157,540,78,'2 e Grad')}{text(245,544,60,'(drag).','naS14 naNw')}
  {check('84-2',640,538,{'84-2-a':'Nebel','84-2-b1':'Schnee','84-2-b2':'schneien','84-2-c':'Wind','84-2-d1':'donnert','84-2-d2':'blitzt','84-2-e1':'sonnig','84-2-e2':'Grad'})}
  {kb(58,584,'KB 3')}
  <div className="naTitle naRB" style={{left:88,top:579,width:660}}><b>3</b><Words text="Suchen Sie Wetterwörter in "/><span className="naBlue">1</span><Words text=" und "/><span className="naBlue">2</span><Words text=" und im Kursbuch."/></div>
  <div className="naSide naSideB" style={{left:64,top:590}}>WÖRTER</div>
  {text(118,606,620,'Ergänzen Sie in der Tabelle so viele Wörter wie möglich.','naInst naNw')}
  <div className="naTblBox" style={{left:122,top:627,width:590,height:75}}/>
  <div className="naTblHead" style={{left:123,top:628,width:588,height:24}}/>
  <div className="naTblH" style={{left:122,top:652,width:590}}/>
  <div className="naTblH" style={{left:122,top:677,width:590}}/>
  <div className="naTblV" style={{left:316,top:627,height:75}}/>
  <div className="naTblV" style={{left:514,top:627,height:75}}/>
  <div className="naTblCell" style={{left:128,top:631}}>Nomen</div>
  <div className="naTblCell" style={{left:322,top:631}}>Adjektive</div>
  <div className="naTblCell" style={{left:520,top:631}}>Verben</div>
  {art('hand-n1',124,654,62,18)}
  {art('hand-v1',516,655,56,17)}
  {art('hand-n2',124,678,62,18)}
  {art('hand-a2',320,678,48,20)}
  {text(522,677,20,'/','naPencil')}
  {kb(58,724,'KB 3')}
  {title('4',88,719,640,'Ergänzen Sie die Gespräche.','naRB naNw')}
  <div className="naSide naSideB" style={{left:64,top:795}}>KOMMUNIKATION</div>
  {text(121,745,16,'a')}{text(138,745,14,'■','naSq')}{text(150,745,55,'Morgen','naS14 naNw')}{art('hand-4a',202,747,106,20)}{text(312,745,350,'(Sonne, scheinen). Wollen wir an die See fahren?','naS14 naNw')}
  {text(138,765,14,'▲','naTri')}{text(150,765,110,'Ach nein, da','naS14 naNw')}{field('84-4-a',262,764,292,'4 a ist es immer so windig')}{text(560,765,150,'(immer, so, windig, sein).','naS14 naNw')}
  {text(150,785,320,'Ich möchte lieber im Café in der Sonne sitzen.','naS14 naNw')}
  {text(121,803,16,'b')}{text(138,803,14,'■','naSq')}{text(150,803,45,'Hier','naS14 naNw')}{field('84-4-b1',186,803,437,'4 b regnet es schon seit drei Tagen')}{text(640,803,100,'(es, regnen,','naS14 naNw')}
  {text(150,823,560,'schon, seit drei Tagen). Da kann man ja nur schlechte Laune bekommen. Wie ist denn','naS14 naNw')}
  {text(150,843,320,'das Wetter bei euch? Ist es auch so schlecht?','naS14 naNw')}
  {text(138,862,14,'▲','naTri')}{text(150,862,395,'Nein, wir haben wunderschönes Frühlingswetter.','naS14 naNw')}{field('84-4-b2',520,862,208,'4 b Es ist warm und sonnig')}
  {field('84-4-b2x',155,881,78,'4 b Fortsetzung','naFieldBlank')}{text(240,881,480,'(es, warm, sein, und, sonnig). Kommt uns doch am Wochenende besuchen!','naS14 naNw')}
  {text(121,900,16,'c')}{text(138,900,14,'■','naSq')}{text(150,900,300,'Wie ist das Wetter im Winter in Österreich?','naS14 naNw')}
  {text(138,920,14,'▲','naTri')}{text(150,920,105,'In den Bergen','naS14 naNw')}{field('84-4-c1',252,920,355,'4 c ist es kalt')}{text(615,920,100,'(es, kalt, sein) und','naS14 naNw')}
  {field('84-4-c2',154,939,224,'4 c gibt es viel Schnee')}{text(385,939,220,'(es, viel Schnee, geben). Aber oft','naS14 naNw')}{field('84-4-c3x',602,939,93,'4 c Fortsetzung','naFieldBlank')}
  {field('84-4-c3',154,959,331,'4 c scheint auch die Sonne')}{text(495,959,220,'(auch, Sonne, scheinen).','naS14 naNw')}
  {text(121,978,16,'d')}{text(138,978,14,'■','naSq')}{text(150,978,215,'Tschüs, bis heute Abend.','naS14 naNw')}{text(370,978,14,'▲','naTri')}{text(390,978,320,'Tschüs. Und vergiss deine Regenjacke nicht. Heute Nach-','naS14 naNw')}
  {text(150,998,55,'mittag','naS14 naNw')}{field('84-4-d',200,998,389,'4 d gibt es ein Gewitter')}{text(600,998,190,'(es, Gewitter, geben).','naS14 naNw')}
  {check('84-4',150,1022,{'84-4-a':'ist es immer so windig','84-4-b1':'regnet es schon seit drei Tagen','84-4-b2':'Es ist warm und sonnig','84-4-c1':'ist es kalt','84-4-c2':'gibt es viel Schnee|es gibt viel Schnee','84-4-c3':'scheint auch die Sonne','84-4-d':'gibt es ein Gewitter|gibt es Gewitter'})}
  {art('modul-tab',8,1048,54,22)}
  {text(70,1050,200,'84  |  vierundachtzig','naFooter')}
 </>}
 {page==='85'&&<>
  <div className="naBasis" style={{left:60,top:48}}>BASISTRAINING</div>
  <div className="naRuleP" style={{left:390,top:84,width:324}}/>
  <div className="naRedL" style={{left:728,top:28,width:71,height:58}}>23</div>
  {kb(32,112,'KB 4')}
  {title('5',55,107,640,'Ergänzen und vergleichen Sie.','naRB naNw')}
  {art('globe',27,132,34,32)}
  <div className="naSide naSideB" style={{left:64,top:196}}>WÖRTER</div>
  <div className="naTblBox" style={{left:102,top:142,width:613,height:156}}/>
  <div className="naTblHead" style={{left:103,top:143,width:611,height:21,background:'#e6e0ca'}}/>
  <div className="naTblH" style={{left:102,top:164,width:613}}/>
  <div className="naTblV" style={{left:286,top:142,height:156}}/>
  <div className="naTblV" style={{left:458,top:142,height:156}}/>
  <div className="naTblCell naTblCellS" style={{left:109,top:147}}>Deutsch</div>
  <div className="naTblCell naTblCellS" style={{left:293,top:147}}>Englisch</div>
  <div className="naTblCell naTblCellS" style={{left:465,top:147}}>Meine Sprache oder andere Sprachen</div>
  {text(108,167,40,'der ','naS14 naNw')}{art('orden',134,165,42,19)}
  {text(292,167,100,'the north','naS14 naNw')}
  {text(108,189,60,'der O','naS14 naNw')}{field('85-5-1',136,184,66,'Osten')}
  {text(292,189,100,'the east','naS14 naNw')}
  {text(108,211,60,'der S','naS14 naNw')}{field('85-5-2',136,209,66,'Süden')}
  {text(292,211,100,'the south','naS14 naNw')}
  {text(108,234,60,'der W','naS14 naNw')}{field('85-5-3',136,234,66,'Westen')}
  {text(292,234,100,'the west','naS14 naNw')}
  {text(108,256,160,'Norddeutschland','naS14 naNw')}
  {text(292,256,160,'Northern Germany','naS14 naNw')}
  {text(108,277,160,'Süddeutschland','naS14 naNw')}
  {text(292,277,160,'Southern Germany','naS14 naNw')}
  {field('85-5-n1',465,163,240,'Meine Sprache Zeile 1','naFieldBlank')}
  {field('85-5-n2',465,185,240,'Meine Sprache Zeile 2','naFieldBlank')}
  {field('85-5-n3',465,207,240,'Meine Sprache Zeile 3','naFieldBlank')}
  {field('85-5-n4',465,230,240,'Meine Sprache Zeile 4','naFieldBlank')}
  {field('85-5-n5',465,252,240,'Meine Sprache Zeile 5','naFieldBlank')}
  {field('85-5-n6',465,273,240,'Meine Sprache Zeile 6','naFieldBlank')}
  {check('85-5',620,300,{'85-5-1':'osten|Osten','85-5-2':'süden|Süden','85-5-3':'westen|Westen'})}
  {kb(30,313,'KB 4')}
  <div className="naTitle naRB naNw" style={{left:55,top:311,width:680}}><b>6</b><Words text="Wie ist das Wetter in "/><span className="naBlue">…?</span><Words text=" Hören Sie und ordnen Sie zu."/></div>
  {audio('assets/ab-cd2-track36.mp3',28,336,'2 36')}
  <div className="naSide naSideB" style={{left:64,top:366}}>HÖREN</div>
  {art('map',80,338,298,374)}
  {art('wetter',378,383,144,279)}
  {field('85-6-1',150,440,30,'Kästchen bei Hamburg','naFieldBlank naFieldC')}
  {field('85-6-2',305,476,30,'Kästchen bei Berlin','naFieldBlank naFieldC')}
  {field('85-6-3',128,503,30,'Kästchen bei Köln','naFieldBlank naFieldC')}
  {field('85-6-4',240,623,32,'Kästchen bei München','naFieldBlank naFieldC')}
  {check('85-6',600,690,{'85-6-1':'4','85-6-2':'3','85-6-3':'2','85-6-4':'1'})}
  {kb(30,745,'KB 4')}
  <div className="naTitle naRB naNw" style={{left:55,top:743,width:680}}><b>7</b><Words text="Wählen Sie einen Ort auf der Wetterkarte in "/><span className="naBlue">6</span><Words text="."/></div>
  <div className="naSide naSideB" style={{left:64,top:806}}>SPRECHEN</div>
  <div className="naDots" style={{left:32,top:768}}/>
  {text(103,772,16,'a','naS14 naNw')}{text(118,772,600,'Wie ist das Wetter? Machen Sie Notizen.','naS14 naNw')}
  {text(103,805,16,'b','naS14 naNw')}{text(118,805,640,'Erzählen Sie. Ihre Partnerin / Ihr Partner rät: Wo sind Sie?','naS14 naNw')}
  <div className="naBubble" style={{left:140,top:833,width:355,height:75}}/>
  {text(155,845,330,'Hier ist das Wetter nicht so toll. Es ist neblig und nicht','naS14 naIt naNw')}
  {text(155,867,330,'besonders warm. Wir haben … Grad. … Wo bin ich?','naS14 naIt naNw')}
  <div className="naBubble" style={{left:528,top:856,width:160,height:60}}/>
  {text(548,873,130,'Bist du in …?','naS14 naIt naNw')}
  {kb(30,910,'KB 4')}
  {title('8',55,907,400,'Ordnen Sie zu.','naRB naNw')}
  <div className="naSide naSideB" style={{left:64,top:968}}>STRUKTUREN</div>
  <div className="naBank" style={{left:98,top:938,width:180,height:24}}/>
  {text(106,941,172,'arbeitslos | wolkenlos | farblos','naS14 naNw naBankInk')}
  {text(103,966,16,'a','naS14 naNw')}{text(118,966,445,'Heute ist so schönes Wetter. Die Sonne scheint und der Himmel ist','naS14 naNw')}{field('85-8-a',567,963,112,'wolkenlos')}{text(685,966,10,'.','naS14')}
  {text(103,988,16,'b','naS14 naNw')}{text(118,988,350,'Seit letztem Frühjahr sucht Hannes einen Job. Er ist','naS14 naNw')}{field('85-8-b',472,985,112,'arbeitslos')}{text(590,988,10,'.','naS14')}
  {text(103,1008,16,'c','naS14 naNw')}{text(118,1008,483,'In Norddeutschland war der Winter in diesem Jahr besonders grau und','naS14 naNw')}{field('85-8-c',605,1005,118,'farblos')}{text(729,1008,10,'.','naS14')}
  {check('85-8',118,1030,{'85-8-a':'wolkenlos','85-8-b':'arbeitslos','85-8-c':'farblos'})}
  {art('modul-tab',740,1043,68,20)}
  <div className="naText naFooter" style={{left:420,top:1046,width:310,textAlign:'right'}}>fünfundachtzig&nbsp;&nbsp;|&nbsp;&nbsp;85</div>
 </>}
 {page==='86'&&<>
  <div className="naBasisL" style={{left:90,top:51}}>BASISTRAINING</div>
  <div className="naRuleP" style={{left:277,top:72,width:451}}/>
  {kb(59,136,'KB 5')}
  {title('9',88,124,620,'Ordnen Sie zu.','naRB naNw')}
  <div className="naSide naSideB naSideC" style={{left:60,top:155}}>STRUKTUREN</div>
  <div className="naBank" style={{left:120,top:150,width:600,height:24}}/>
  <div className="naText naNw naBankInk" style={{left:124,top:152,width:600}}><Words text="er hat gestern lange gefeiert | es schneit zu viel | ihr Fahrrad ist kaputt | "/><span className="naStrikeB"><Words text="sie fahren morgen in"/></span></div>
  <div className="naText naNw naBankInk" style={{left:124,top:173,width:200}}><span className="naStrikeB"><Words text="den Urlaub"/></span></div>
  {art('imgA',119,206,156,78)}
  {art('imgB',284,206,160,78)}
  {art('imgC',456,206,153,78)}
  {art('imgD',625,206,147,78)}
  {text(119,327,16,'A','naNw naBookSerif')}{text(140,327,310,'Luca und Alina suchen den Reiseführer,','naNw naBookSerif')}
  {art('ex9a',138,344,230,20)}
  {text(119,375,16,'B','naNw naBookSerif')}{text(140,375,240,'Herr Brunner muss noch','naNw naBookSerif')}
  {text(140,393,300,'ein paar Stunden in München bleiben,','naNw naBookSerif')}
  {text(139,414,33,'denn','naNw naBookSerif')}{field('86-9-b',175,411,240,'9 B')}{text(419,414,10,'.')}
  {text(451,326,14,'C','naNw naBookSerif')}{text(469,326,170,'Urs ist heute sehr müde,','naNw naBookSerif')}
  {text(468,346,33,'denn','naNw naBookSerif')}{field('86-9-c',500,343,220,'9 C')}{text(724,346,10,'.')}
  {text(451,393,14,'D','naNw naBookSerif')}{text(468,393,260,'Sandra kommt heute nicht pünktlich,','naNw naBookSerif')}
  {text(468,415,33,'denn','naNw naBookSerif')}{field('86-9-d',500,411,227,'9 D')}{text(731,415,10,'.')}
  {check('86-9',640,442,{'86-9-b':'es schneit zu viel','86-9-c':'er hat gestern lange gefeiert','86-9-d':'ihr Fahrrad ist kaputt'})}
  {kb(59,470,'KB 5')}
  <div className="naTitle naRB naNw" style={{left:88,top:466,width:640}}><b>10</b><Words text="Ergänzen Sie die Sätze aus "/><span className="naBlue">9</span><Words text="."/></div>
  <div className="naSide naSideB naSideC" style={{left:48,top:492}}>STRUKTUREN</div>
  <div className="naSide naSideB naSideC" style={{left:62,top:492}}>ENTDECKEN</div>
  <div className="naTblBox" style={{left:130,top:488,width:605,height:111}}/>
  <div className="naTblHead" style={{left:131,top:489,width:603,height:24}}/>
  <div className="naTblH" style={{left:130,top:513,width:605}}/>
  <div className="naTblH" style={{left:130,top:537,width:605}}/>
  <div className="naTblH" style={{left:130,top:557,width:605}}/>
  <div className="naTblH" style={{left:130,top:578,width:605}}/>
  <div className="naTblV" style={{left:172,top:489,height:48}}/>
  <div className="naTblV" style={{left:255,top:488,height:111}}/>
  <div className="naTblV" style={{left:345,top:488,height:111}}/>
  <div className="naTblV" style={{left:433,top:488,height:111}}/>
  <div className="naTblCell naTblCellS" style={{left:174,top:496}}>Position 0</div>
  <div className="naTblCell naTblCellS" style={{left:262,top:496}}>Position 1</div>
  <div className="naTblCell naTblCellS" style={{left:351,top:496}}>Position 2</div>
  {text(140,520,30,'…')}
  {art('ex10ex',170,518,540,38)}
  {field('86-10-r1c0',172,537,83,'10 Zeile 1 Position 0','naFieldNL')}{field('86-10-r1c1',260,537,85,'10 Zeile 1 Position 1','naFieldNL')}{field('86-10-r1c2',350,537,83,'10 Zeile 1 Position 2','naFieldNL')}{field('86-10-r1c3',438,537,297,'10 Zeile 1 Rest','naFieldNL')}
  {field('86-10-r2c0',172,558,83,'10 Zeile 2 Position 0','naFieldNL')}{field('86-10-r2c1',260,558,85,'10 Zeile 2 Position 1','naFieldNL')}{field('86-10-r2c2',350,558,83,'10 Zeile 2 Position 2','naFieldNL')}{field('86-10-r2c3',438,558,297,'10 Zeile 2 Rest','naFieldNL')}
  {field('86-10-r3c0',172,579,83,'10 Zeile 3 Position 0','naFieldNL')}{field('86-10-r3c1',260,579,85,'10 Zeile 3 Position 1','naFieldNL')}{field('86-10-r3c2',350,579,83,'10 Zeile 3 Position 2','naFieldNL')}{field('86-10-r3c3',438,579,297,'10 Zeile 3 Rest','naFieldNL')}
  {check('86-10',620,608,{'86-10-r1c0':'denn','86-10-r1c1':'es','86-10-r1c2':'schneit','86-10-r1c3':'zu viel','86-10-r2c0':'denn','86-10-r2c1':'er','86-10-r2c2':'hat','86-10-r2c3':'gestern lange gefeiert','86-10-r3c0':'denn','86-10-r3c1':'ihr Fahrrad','86-10-r3c2':'ist','86-10-r3c3':'kaputt'})}
  {kb(59,640,'KB 5')}
  {title('11',88,630,640,'Schreiben Sie die Sätze mit denn.','naRB naNw')}
  <div className="naSide naSideB naSideC" style={{left:60,top:662}}>STRUKTUREN</div>
  {text(121,657,16,'a','naNw naBookSerif')}{text(140,657,480,'Ich kann leider nicht kommen. Ich habe einen Termin beim Zahnarzt.','naNw naBookSerif')}
  {art('ex11a',130,684,480,13)}
  {text(121,697,16,'b','naNw naBookSerif')}{text(140,697,560,'In dem Haus kann man nicht mehr wohnen. Nach dem Sturm war das Dach kaputt.','naNw naBookSerif')}
  {art('ex11b',128,714,87,18)}{rule(137,733,591)}{text(728,718,10,'.')}
  {text(121,735,16,'c','naNw naBookSerif')}{text(139,735,480,'Ella kommt heute nicht mit in die Disco. Sie hat morgen eine Prüfung.','naNw naBookSerif')}
  {field('86-11-c',130,751,598,'11 c')}{text(729,753,10,'.')}
  {text(121,775,16,'d','naNw naBookSerif')}{text(139,775,560,'Mit dem Urlaub hatten wir wirklich Glück. Das Wetter war ein Traum.','naNw naBookSerif')}
  {field('86-11-d',130,790,598,'11 d')}{text(729,793,10,'.')}
  {check('86-11',620,816,{'86-11-c':'Ella kommt heute nicht in die Disco, denn sie hat morgen eine Prüfung|Ella kommt heute nicht mit in die Disco, denn sie hat morgen eine Prüfung','86-11-d':'Mit dem Urlaub hatten wir wirklich Glück, denn das Wetter war ein Traum'})}
  {kb(59,851,'KB 5')}
  {title('12',88,843,640,'Verbinden Sie.','naRB naNw')}
  <div className="naSide naSideB naSideC" style={{left:60,top:884}}>STRUKTUREN</div>
  {text(121,870,16,'a','naNw naBookSerif')}{text(121,890,16,'b','naNw naBookSerif')}{text(121,911,16,'c','naNw naBookSerif')}{text(121,931,16,'d','naNw naBookSerif')}
  <svg className="naEx12Ex" viewBox="0 0 807 1094" aria-hidden="true"><path d="M330 883 C372 883 380 923 390 923" fill="none" stroke="#5b84bd" strokeWidth="2"/><path d="M423 923 L463 923" fill="none" stroke="#5b84bd" strokeWidth="2"/></svg>
  <LineMatching id="86-12" left={['Soll ich das Kleid nehmen','Am See darf man nicht grillen','Ich mache gern Urlaub am Meer,','Der Techniker muss kommen,']} right={['denn','aber','oder','und']} values={c.values} onMatch={set} leftX={138} rightX={352} leftWidth={220} rightWidth={75} ys={[870,890,911,931]} width={807} height={1094} fontSize={13.5} multiple={true}/>
  <LineMatching id="86-12r" left={['denn','aber','oder','und']} right={['die Spülmaschine funktioniert nicht.','am liebsten bin ich in den Bergen.','findest du den Rock schöner?','Baden ist auch verboten.']} values={c.values} onMatch={set} leftX={433} rightX={430} leftWidth={6} rightWidth={280} ys={[870,890,911,931]} width={807} height={1094} fontSize={13.5} multiple={true}/>
  {check('86-12',620,960,{'86-12-0':'2|','86-12-1':'3','86-12-2':'1','86-12-3':'0','86-12r-0':'0','86-12r-1':'1','86-12r-2':'2|','86-12r-3':'3'})}
  {art('modul-tab',8,1049,60,16)}
  {text(76,1050,200,'86  |  sechsundachtzig','naFooter')}
 </>}
 {page==='87'&&<>
  <div className="naTrainHead" style={{left:71,top:62}}>TRAINING: HÖREN</div>
  <div className="naRuleP" style={{left:287,top:82,width:440}}/>
  <div className="naRedL" style={{left:727,top:26,width:69,height:59}}>23</div>
  <div className="naOrangeTab" style={{left:796,top:27,width:5,height:62}}/>
  {title('1',68,124,620,'Gespräch in der Kantine.','naRB naNw naS15')}
  {text(102,144,580,'Sehen Sie das Bild an. Was meinen Sie? Was passiert hier? Was sagen die Personen?','naInst naInst15 naNw')}
  <div className="naBank" style={{left:100,top:170,width:360,height:21}}/>
  <div className="naBankBlue" style={{left:107,top:172}}><Words text="Familie | Arbeit | "/><span className="naStrikeD"><Words text="Urlaub"/></span><Words text=" | Krankheit | Haushalt | Wetter …"/></div>
  {art('kantine',100,206,277,156)}
  {art('tail1',412,214,35,28)}
  <div className="naBubble" style={{left:415,top:203,width:231,height:57,border:'1px solid #dbd8cd'}}/>
  {text(465,213,160,'Der Mann sieht krank aus.','naBookSerif naBk87 naNw')}
  {text(506,231,90,'Vielleicht …','naBookSerif naBk87 naNw')}
  {art('tail2',457,302,42,30)}
  <div className="naBubble" style={{left:478,top:281,width:228,height:50,border:'1px solid #dbd8cd'}}/>
  {text(533,285,140,'Ich glaube, die Frau war','naBookSerif naBk87 naNw')}
  {text(573,304,60,'im Urlaub!','naBookSerif naBk87 naNw')}
  <div className="naTipBox" style={{left:414,top:344,width:302,height:77}}/>
  <div className="naTipTop" style={{left:420,top:350,width:296,height:5}}/>
  <div className="naTipBar" style={{left:420,top:350,width:9,height:69}}/>
  <div className="naTipp" style={{left:415,top:359,width:14,height:60}}>Tipp</div>
  {text(445,357,275,'Sie finden das Hören besonders schwierig?','naBookSerif naBk87 naNw')}
  {text(445,373,275,'Überlegen Sie vor dem Hören: Was ist die','naBookSerif naBk87 naNw')}
  {text(445,389,275,'Situation? Wo sind die Personen? Was sagen','naBookSerif naBk87 naNw')}
  {text(445,405,275,'die Personen vielleicht?','naBookSerif naBk87 naNw')}
  {audio('assets/ab-cd2-track37.mp3',26,449,'2 37')}
  {title('2',68,453,640,'Hören Sie nun das Gespräch und korrigieren Sie die Sätze.','naRB naNw naS15')}
  {text(103,483,16,'a','naBookSerif naBk87')}<div className="naText naBookSerif naBk87 naNw" style={{left:121,top:483,width:250}}><span className="naStrikeB"><Words text="Peter"/></span><Words text=" war im Urlaub krank."/></div>
  {art('hand2a',493,481,75,20)}{rule(496,497,65)}
  {text(103,503,16,'b','naBookSerif naBk87')}{text(121,503,280,'Das Hotelzimmer war sauber.','naBookSerif naBk87 naNw')}
  {text(103,523,16,'c','naBookSerif naBk87')}{text(121,523,280,'Das Wetter war zu warm.','naBookSerif naBk87 naNw')}
  {text(103,542,16,'d','naBookSerif naBk87')}{text(121,542,360,'Peters Frau möchte nächstes Jahr wieder nach Italien.','naBookSerif naBk87 naNw')}
  {text(103,562,16,'e','naBookSerif naBk87')}{text(121,562,370,'Der Urlaub von Peters Kollegin war nicht schön.','naBookSerif naBk87 naNw')}
  {text(103,581,16,'f','naBookSerif naBk87')}{text(121,581,200,'Sie war in Italien.','naBookSerif naBk87 naNw')}
  {field('87-2-b',497,497,151,'2 b')}
  {field('87-2-c',497,517,151,'2 c')}
  {field('87-2-d',497,536,151,'2 d')}
  {field('87-2-e',497,556,151,'2 e')}
  {field('87-2-f',497,575,151,'2 f')}
  {check('87-2',620,604,{'87-2-b':'schmutzig','87-2-c':'kalt','87-2-d':'nicht wieder','87-2-e':'schön','87-2-f':'Portugal'})}
  <div className="naTrainHead" style={{left:71,top:668}}>TRAINING: AUSSPRACHE</div>
  {text(365,675,105,'Vokal „ö“','naVokal naNw')}
  <div className="naRuleP" style={{left:434,top:687,width:281}}/>
  {audio('assets/ab-cd2-track38.mp3',26,723,'2 38')}
  {title('1',68,726,330,'Wann hören Sie „ö“? Kreuzen Sie an.','naRB naNw naS15')}
  {text(124,760,40,'1. Wort','naColH naNw')}{text(179,760,40,'2. Wort','naColH naNw')}
  {[0,1,2,3,4,5].map(i=><span key={i}>
    {text(101,775+i*19.4+((i===4)?1:0),14,String(i+1),'naBookSerif naBk87')}
    {dot('a1r'+(i+1),'1',136,774+Math.round(i*19.4),'Reihe '+(i+1)+' Wort 1',false,'naDotS')}
    {dot('a1r'+(i+1),'2',191,774+Math.round(i*19.4),'Reihe '+(i+1)+' Wort 2',false,'naDotS')}
  </span>)}
  {text(416,726,14,'b','naBookSerif naBk87')}{text(435,726,120,'Mädchen','naBookSerif naBk87 naNw')}{text(435,746,120,'Brötchen','naBookSerif naBk87 naNw')}{text(435,765,220,'Mädchen möchten Brötchen.','naBookSerif naBk87 naNw')}
  {text(416,799,14,'c','naBookSerif naBk87')}{text(435,796,120,'Fan','naBookSerif naBk87 naNw')}{text(435,814,120,'Föhn','naBookSerif naBk87 naNw')}{text(435,834,180,'Ein Föhn vom Fan','naBookSerif naBk87 naNw')}
  {text(416,863,14,'d','naBookSerif naBk87')}{text(435,863,120,'Kellner','naBookSerif naBk87 naNw')}{text(435,883,120,'Köln','naBookSerif naBk87 naNw')}{text(435,902,330,'Ein Kölner Kellner ist ein Kellner aus Köln.','naBookSerif naBk87 naNw')}
  {text(416,935,14,'e','naBookSerif naBk87')}{text(435,932,120,'sonnig','naBookSerif naBk87 naNw')}{text(435,951,120,'bewölkt','naBookSerif naBk87 naNw')}{text(435,970,300,'im Norden sonnig, im Osten bewölkt','naBookSerif naBk87 naNw')}
  {audio('assets/ab-cd2-track39.mp3',26,918,'2 39')}
  {title('2',68,921,400,'Hören Sie und sprechen Sie dann.','naRB naNw naS15')}
  {text(101,954,14,'a','naBookSerif naBk87')}{text(120,954,120,'Wetter','naBookSerif naBk87 naNw')}{text(114,971,120,'Wort','naBookSerif naBk87 naNw')}{text(121,989,200,'macht: Wetterwörter','naBookSerif naBk87 naNw')}
  {art('modul-tab',739,1047,59,17)}
  <div className="naText naFooter" style={{left:420,top:1048,width:313,textAlign:'right'}}>siebenundachtzig&nbsp;&nbsp;|&nbsp;&nbsp;87</div>
 </>}
 {page==='88'&&<>
  <div className="naTestHead" style={{left:80,top:64}}>TEST</div>
  <div className="naTestRule" style={{left:140,top:85,width:590}}/>
  <div className="naSideT" style={{left:52,top:157}}>WÖRTER</div>
  {title('1',68,124,640,'Das Wetter in Deutschland. Ordnen Sie zu.','naRB naNw naS15')}
  <div className="naBank" style={{left:111,top:153,width:457,height:19}}/>
  <div className="naBank88" style={{left:115,top:155}}><Words text="Wolken | scheint | Sturm | neblig | Grad | "/><span className="naStrikeB"><Words text="Gewitter"/></span><Words text=" | regnet | Himmel | warm"/></div>
  {text(111,184,16,'a','naBookSerif naBk88')}{text(130,183,155,'In Frankfurt gibt es ein','naBookSerif naBk88 naNw',14.2)}
  {art('hand1a',288,185,58,13)}{ruleT(290,198,54)}{text(350,183,55,'und es','naBookSerif naBk88 naNw',13.4)}{field('88-1a',396,178,97,'1 a')}{text(495,183,10,'.','naBookSerif naBk88 naNw naPrd')}
  {text(111,204,16,'b','naBookSerif naBk88')}{text(130,203,55,'In Köln','naBookSerif naBk88 naNw',14)}{field('88-1b1',183,198,96,'1 b1')}{text(284,203,115,'die Sonne, es ist','naBookSerif naBk88 naNw',14)}{field('88-1b2',395,198,96,'1 b2')}{text(493,203,10,'.','naBookSerif naBk88 naNw naPrd')}
  {text(111,223,16,'c','naBookSerif naBk88')}{text(130,222,125,'In Dresden ist der','naBookSerif naBk88 naNw',14)}{field('88-1c1',252,217,97,'1 c1')}{text(354,222,122,'blau, es gibt keine','naBookSerif naBk88 naNw',13.9)}{field('88-1c2',477,217,97,'1 c2')}{text(576,221,10,'.','naBookSerif naBk88 naNw naPrd')}
  {text(111,243,16,'d','naBookSerif naBk88')}{text(130,242,330,'In München ist es sehr windig, es gibt bald einen','naBookSerif naBk88 naNw',14.1)}{field('88-1d',460,237,97,'1 d')}{text(558,241,10,'.','naBookSerif naBk88 naNw naPrd')}
  {text(111,262,16,'e','naBookSerif naBk88')}{text(130,262,115,'In Hamburg ist es','naBookSerif naBk88 naNw',13.9)}{field('88-1e1',251,256,98,'1 e1')}{text(349,262,90,', es hat nur 3','naBookSerif naBk88 naNw',13.9)}{field('88-1e2',439,256,96,'1 e2')}{text(537,261,10,'.','naBookSerif naBk88 naNw naPrd')}
  <div className="naPts" style={{left:640,top:262}}>_ / 8 Punkte</div>
  {check('88-1',640,282,{'88-1a':'regnet','88-1b1':'scheint','88-1b2':'warm','88-1c1':'Himmel','88-1c2':'Wolken','88-1d':'Sturm','88-1e1':'neblig','88-1e2':'Grad'})}
  <div className="naSideT" style={{left:55,top:343}}>STRUKTUREN</div>
  {title('2',68,309,640,'Bilden Sie Wörter mit -los und ergänzen Sie.','naRB naNw naS15')}
  <div className="naBank" style={{left:111,top:338,width:255,height:18}}/>
  <div className="naBank88" style={{left:115,top:340,fontSize:12.6}}><Words text="kosten- | wolken- | arbeits- | "/><span className="naStrikeB"><Words text="fehler-"/></span><Words text=" | farb-"/></div>
  {text(111,369,16,'a','naBookSerif naBk88')}{text(130,369,82,'Mein Test ist','naBookSerif naBk88 naNw',14)}
  {art('hand2a',216,369,51,18)}{ruleT(218,383,46)}{text(266,369,10,'.','naBookSerif naBk88 naNw naPrd')}{text(274,369,240,'Ich habe keinen Fehler gemacht!','naBookSerif naBk88 naNw',14)}
  {text(111,388,16,'b','naBookSerif naBk88')}{text(130,387,468,'Man kann im Zentrum parken, aber es ist teuer. Hinter der Post ist es','naBookSerif naBk88 naNw',14)}{field('88-2b',596,383,124,'2 b')}{text(722,387,10,'.','naBookSerif naBk88 naNw naPrd')}
  {text(111,409,16,'c','naBookSerif naBk88')}{text(130,408,245,'Das Wetter ist schön, der Himmel ist','naBookSerif naBk88 naNw',14)}{field('88-2c',376,402,116,'2 c')}{text(494,406,10,'.','naBookSerif naBk88 naNw naPrd')}
  {text(111,428,16,'d','naBookSerif naBk88')}{text(130,427,278,'Es regnet seit Stunden. Alles ist grau und','naBookSerif naBk88 naNw',14.1)}{field('88-2d',407,421,116,'2 d')}{text(525,425,10,'.','naBookSerif naBk88 naNw naPrd')}
  {text(111,446,16,'e','naBookSerif naBk88')}{text(129,445,266,'Thomas hat keinen Job mehr, er ist jetzt','naBookSerif naBk88 naNw',14.1)}{field('88-2e',400,441,116,'2 e')}{text(518,444,10,'.','naBookSerif naBk88 naNw naPrd')}
  <div className="naPts" style={{left:640,top:447}}>_ / 4 Punkte</div>
  {check('88-2',640,467,{'88-2b':'kostenlos','88-2c':'wolkenlos','88-2d':'farblos','88-2e':'arbeitslos'})}
  <div className="naSideT" style={{left:55,top:527}}>STRUKTUREN</div>
  {title('3',68,493,640,'Schreiben Sie Sätze mit denn.','naRB naNw naS15')}
  {text(111,524,16,'a','naBookSerif naBk88')}{text(131,524,195,'Ich gehe heute zum Zahnarzt,','naBookSerif naBk88 naNw',14)}
  {art('hand3a',330,525,136,14)}{ruleT(333,539,130)}{text(465,524,10,'.','naBookSerif naBk88 naNw naPrd')}
  {text(130,544,150,'(ich / Zahnweh haben)','naCue88',13.5)}
  {text(111,564,16,'b','naBookSerif naBk88')}{text(130,563,325,'Wir fahren am Samstag zu den Großeltern, denn','naBookSerif naBk88 naNw',13.8)}{field('88-3b',456,558,264,'3 b')}{text(720,562,10,'.','naBookSerif naBk88 naNw naPrd')}
  {text(130,583,170,'(unsere Oma / krank sein)','naCue88',13.3)}
  {text(111,602,16,'c','naBookSerif naBk88')}{text(129,602,215,'Wir müssen zu Fuß gehen, denn','naBookSerif naBk88 naNw',13.8)}{field('88-3c',346,597,374,'3 c')}{text(722,600,10,'.','naBookSerif naBk88 naNw naPrd')}
  {text(130,622,185,'(der Aufzug / nicht funktionieren)','naCue88',13.7)}
  {text(111,641,16,'d','naBookSerif naBk88')}{text(130,640,175,'Niko macht ein Fest, denn','naBookSerif naBk88 naNw',14.1)}{field('88-3d',308,636,412,'3 d')}{text(720,639,10,'.','naBookSerif naBk88 naNw naPrd')}
  {text(130,661,195,'(er / Wohnung gefunden haben)','naCue88',13.4)}
  <div className="naPts" style={{left:640,top:662}}>_ / 3 Punkte</div>
  {check('88-3',640,682,{'88-3b':'denn unsere Oma ist krank|unsere Oma ist krank','88-3c':'denn der Aufzug funktioniert nicht|der Aufzug funktioniert nicht','88-3d':'denn er hat eine neue Wohnung gefunden|er hat eine neue Wohnung gefunden'})}
  <div className="naSideT" style={{left:52,top:741}}>KOMMUNIKATION</div>
  {title('4',68,707,640,'Ordnen Sie zu.','naRB naNw naS15')}
  <div className="naBank" style={{left:111,top:737,width:596,height:42}}/>
  <div className="naBank88b" style={{left:115,top:739,fontSize:13.3}}><Words text="ich arbeite am Wochenende | der Schnee ist traumhaft | ich backe gern | deine Partys sind immer"/></div>
  <div className="naBank88b" style={{left:115,top:759,fontSize:13.5}}><Words text="lustig | ich schreibe am Montag eine Prüfung | ich habe Geburtstag"/></div>
  {text(112,786,300,'Hallo, ich mache am Freitag eine Party, denn','naBookSerif naBk88 naNw',14)}{field('88-4a',415,782,305,'4 a')}{text(721,785,10,'.','naBookSerif naBk88 naNw naPrd')}
  {text(112,807,140,'Könnt ihr kommen?','naBookSerif naBk88 naNw',14)}
  <div className="naBltSq" style={{left:110,top:831,background:'#053594'}}/>
  {text(130,826,190,'Klar, ich komme gern, denn','naBookSerif naBk88 naNw',14)}{field('88-4b',318,821,402,'4 b')}{text(721,823,10,'.','naBookSerif naBk88 naNw naPrd')}
  <div className="naBltTr" style={{left:111,top:851,borderBottomColor:'#20ac4f'}}/>
  {text(130,844,265,'Leider nein. Ich muss viel lernen, denn','naBookSerif naBk88 naNw',14)}{field('88-4c',395,840,324,'4 c')}{text(721,842,10,'.','naBookSerif naBk88 naNw naPrd')}
  <div className="naBltCi" style={{left:111,top:870,background:'#a40265'}}/>
  {text(130,865,105,'Nur kurz, denn','naBookSerif naBk88 naNw',14)}{field('88-4d',236,860,229,'4 d')}{text(471,865,270,'und muss am Samstag früh aufstehen.','naBookSerif naBk88 naNw',14)}
  <div className="naBltTr" style={{left:111,top:890,borderBottomColor:'#f7ae0a'}}/>
  {text(129,883,300,'Tolle Idee. Ich bringe zwei Kuchen mit, denn','naBookSerif naBk88 naNw',14)}{field('88-4e',432,879,287,'4 e')}{text(721,881,10,'.','naBookSerif naBk88 naNw naPrd')}
  <div className="naBltSq" style={{left:110,top:909,background:'#df0702'}}/>
  {text(130,903,345,'Ich weiß nicht. Vielleicht gehe ich Ski fahren, denn','naBookSerif naBk88 naNw',14.2)}{field('88-4f',478,899,242,'4 f')}{text(721,902,10,'.','naBookSerif naBk88 naNw naPrd')}
  <div className="naPts" style={{left:640,top:928}}>_ / 6 Punkte</div>
  {check('88-4',640,950,{'88-4a':'ich habe Geburtstag','88-4b':'deine Partys sind immer lustig','88-4c':'ich schreibe am Montag eine Prüfung','88-4d':'ich arbeite am Wochenende','88-4e':'ich backe gern','88-4f':'der Schnee ist traumhaft'})}
  <div className="naScore" style={{left:205,top:932,width:373,height:106}}/>
  <div className="naScoreH" style={{left:205,top:932,width:373,height:27}}/>
  {text(212,938,120,'Wörter','naScoreT naNw')}{text(341,938,120,'Strukturen','naScoreT naNw')}{text(460,938,130,'Kommunikation','naScoreT naNw')}
  {[0,1,2].map(r=><span key={r}>
    <i className={'naSDot naSD'+(r===0?'R':r===1?'Y':'G')} style={{left:222,top:964+r*26}}/>{text(245,963+r*26,90,['0–4 Punkte','5–6 Punkte','7–8 Punkte'][r],'naScoreR naNw')}
    <i className={'naSDot naSD'+(r===0?'R':r===1?'Y':'G')} style={{left:342,top:964+r*26}}/>{text(369,963+r*26,90,['0–3 Punkte','4–5 Punkte','6–7 Punkte'][r],'naScoreR naNw')}
    <i className={'naSDot naSD'+(r===0?'R':r===1?'Y':'G')} style={{left:462,top:964+r*26}}/>{text(494,963+r*26,90,['0–3 Punkte','4 Punkte','5–6 Punkte'][r],'naScoreR naNw')}
  </span>)}
  {art('modul8-tab',0,1047,48,20)}
  <div className="naText naFoot88" style={{left:60,top:1050,width:200}}>88&nbsp;&nbsp;|&nbsp;&nbsp;achtundachtzig</div>
  <div className="naText naFoot88" style={{left:420,top:1046,width:180,textAlign:'right'}}>www.hueber.de/menschen/lernen</div>
 </>}
 </Canvas>;
}
