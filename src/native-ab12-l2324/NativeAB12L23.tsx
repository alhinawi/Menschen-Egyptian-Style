import {useNativeCanvas,Canvas,Words} from './shared';

export function NativeAB12L23({page}:{page:string}){
 const c=useNativeCanvas(page);
 const {text,art,field,rule,dot,check,title,kb,hand,audio}=c;
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
  <div className="naBasis" style={{left:79,top:49}}>BASISTRAINING</div>
  <div className="naRuleP" style={{left:287,top:88,width:441}}/>
  {kb(59,136,'KB 5')}
  {title('9',88,124,620,'Ordnen Sie zu.','naRB naNw')}
  <div className="naSide naSideB" style={{left:64,top:190}}>STRUKTUREN</div>
  <div className="naBank" style={{left:120,top:150,width:600,height:24}}/>
  <div className="naText naS14 naNw naBankInk" style={{left:124,top:157,width:600}}><Words text="er hat gestern lange gefeiert | es schneit zu viel | ihr Fahrrad ist kaputt | sie fahren morgen in"/></div>
  <div className="naText naS14 naNw" style={{left:124,top:178,width:200}}><span className="naStrikeB"><Words text="den Urlaub"/></span></div>
  {art('imgA',119,206,156,78)}
  {art('imgB',284,206,160,78)}
  {art('imgC',456,206,153,78)}
  {art('imgD',625,206,147,78)}
  {text(119,331,16,'A','naS14')}{text(140,331,310,'Luca und Alina suchen den Reiseführer,','naS14 naNw')}
  {art('ex9a',138,344,230,20)}
  {text(119,380,16,'B','naS14')}{text(140,380,240,'Herr Brunner muss noch','naS14 naNw')}
  {text(140,398,300,'ein paar Stunden in München bleiben,','naS14 naNw')}
  {text(139,415,33,'denn','naS14 naNw')}{field('86-9-b',175,411,240,'9 B')}{text(419,415,10,'.','naS14')}
  {text(455,331,14,'C','naS14')}{text(469,331,170,'Urs ist heute sehr müde,','naS14 naNw')}
  {text(468,349,33,'denn','naS14 naNw')}{field('86-9-c',500,343,220,'9 C')}{text(724,349,10,'.','naS14')}
  {text(455,398,14,'D','naS14')}{text(468,398,260,'Sandra kommt heute nicht pünktlich,','naS14 naNw')}
  {text(468,418,33,'denn','naS14 naNw')}{field('86-9-d',500,411,227,'9 D')}{text(731,418,10,'.','naS14')}
  {check('86-9',640,442,{'86-9-b':'es schneit zu viel','86-9-c':'er hat gestern lange gefeiert','86-9-d':'ihr Fahrrad ist kaputt'})}
  {kb(59,478,'KB 5')}
  <div className="naTitle naRB naNw" style={{left:88,top:466,width:640}}><b>10</b><Words text="Ergänzen Sie die Sätze aus "/><span className="naBlue">9</span><Words text="."/></div>
  <div className="naSide naSideB" style={{left:64,top:520}}>STRUKTUREN ENTDECKEN</div>
  <div className="naTblBox" style={{left:130,top:488,width:605,height:112}}/>
  <div className="naTblHead" style={{left:131,top:489,width:603,height:24}}/>
  <div className="naTblH" style={{left:130,top:513,width:605}}/>
  <div className="naTblH" style={{left:130,top:537,width:605}}/>
  <div className="naTblH" style={{left:130,top:558,width:605}}/>
  <div className="naTblH" style={{left:130,top:579,width:605}}/>
  <div className="naTblV" style={{left:172,top:513,height:87}}/>
  <div className="naTblV" style={{left:255,top:488,height:112}}/>
  <div className="naTblV" style={{left:345,top:488,height:112}}/>
  <div className="naTblV" style={{left:433,top:488,height:112}}/>
  <div className="naTblCell naTblCellS" style={{left:174,top:496}}>Position 0</div>
  <div className="naTblCell naTblCellS" style={{left:262,top:496}}>Position 1</div>
  <div className="naTblCell naTblCellS" style={{left:351,top:496}}>Position 2</div>
  {text(140,521,30,'…','naS14')}
  {art('ex10ex',170,518,540,34)}
  {field('86-10-r1c0',172,537,83,'10 Zeile 1 Position 0')}{field('86-10-r1c1',260,537,85,'10 Zeile 1 Position 1')}{field('86-10-r1c2',350,537,83,'10 Zeile 1 Position 2')}{field('86-10-r1c3',438,537,297,'10 Zeile 1 Rest')}
  {field('86-10-r2c0',172,558,83,'10 Zeile 2 Position 0')}{field('86-10-r2c1',260,558,85,'10 Zeile 2 Position 1')}{field('86-10-r2c2',350,558,83,'10 Zeile 2 Position 2')}{field('86-10-r2c3',438,558,297,'10 Zeile 2 Rest')}
  {field('86-10-r3c0',172,579,83,'10 Zeile 3 Position 0')}{field('86-10-r3c1',260,579,85,'10 Zeile 3 Position 1')}{field('86-10-r3c2',350,579,83,'10 Zeile 3 Position 2')}{field('86-10-r3c3',438,579,297,'10 Zeile 3 Rest')}
  {check('86-10',620,608,{'86-10-r1c0':'denn','86-10-r1c1':'es','86-10-r1c2':'schneit','86-10-r1c3':'zu viel','86-10-r2c0':'denn','86-10-r2c1':'er','86-10-r2c2':'hat','86-10-r2c3':'gestern lange gefeiert','86-10-r3c0':'denn','86-10-r3c1':'ihr Fahrrad','86-10-r3c2':'ist','86-10-r3c3':'kaputt'})}
  {kb(59,642,'KB 5')}
  {title('11',88,630,640,'Schreiben Sie die Sätze mit denn.','naRB naNw')}
  <div className="naSide naSideB" style={{left:64,top:730}}>STRUKTUREN</div>
  {text(121,660,16,'a','naS14')}{text(140,660,470,'Ich kann leider nicht kommen. Ich habe einen Termin beim Zahnarzt.','naS14 naNw')}
  {art('ex11a',130,672,480,22)}
  {text(121,700,16,'b','naS14')}{text(140,700,560,'In dem Haus kann man nicht mehr wohnen. Nach dem Sturm war das Dach kaputt.','naS14 naNw')}
  {art('ex11b',128,714,87,18)}{rule(137,733,591)}{text(728,718,10,'.','naS14')}
  {text(121,738,16,'c','naS14')}{text(139,738,480,'Ella kommt heute nicht mit in die Disco. Sie hat morgen eine Prüfung.','naS14 naNw')}
  {field('86-11-c',130,751,598,'11 c')}{text(729,755,10,'.','naS14')}
  {text(121,778,16,'d','naS14')}{text(139,778,560,'Mit dem Urlaub hatten wir wirklich Glück. Das Wetter war ein Traum.','naS14 naNw')}
  {field('86-11-d',130,790,598,'11 d')}{text(729,794,10,'.','naS14')}
  {check('86-11',620,816,{'86-11-c':'Ella kommt heute nicht in die Disco, denn sie hat morgen eine Prüfung|Ella kommt heute nicht mit in die Disco, denn sie hat morgen eine Prüfung','86-11-d':'Mit dem Urlaub hatten wir wirklich Glück, denn das Wetter war ein Traum'})}
  {art('modul-tab',8,1049,60,16)}
  {text(76,1050,200,'86  |  sechsundachtzig','naFooter')}
 </>}
 </Canvas>;
}
