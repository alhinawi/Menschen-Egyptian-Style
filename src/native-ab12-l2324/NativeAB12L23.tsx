import {useNativeCanvas,Canvas,Words} from './shared';

export function NativeAB12L23({page}:{page:string}){
 const c=useNativeCanvas(page);
 const {text,art,field,rule,dot,check,title,kb,hand,audio}=c;
 return <Canvas page={page} root={c.root} player={c.player} scale={c.scale}>
 {page==='84'&&<>
  {art('hero',8,30,742,60)}
  {kb(58,136,'KB 3')}
  {title('1',88,124,620,'Ordnen Sie zu.','naRB naNw')}
  <div className="naSide naSideB" style={{left:64,top:168}}>WÖRTER</div>
  <div className="naBank" style={{left:122,top:162,width:592,height:22}}/>
  <div className="naBank" style={{left:122,top:186,width:592,height:20}}/>
  <div className="naText naS14 naNw" style={{left:124,top:164,width:600}}><Words text="Die Sonne scheint. | Es wird bald sehr windig. | Es ist bewölkt. | Es ist kühl. | Es ist schön warm. |"/></div>
  {art('strike1',250,158,205,30)}
  <div className="naText naS14 naNw" style={{left:124,top:188,width:600}}><Words text="Es regnet schon lange. | Es wird kälter. | Man sieht nicht viele Wolken. | Es gibt bald ein Gewitter."/></div>
  {art('strike2',203,181,109,27)}
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
  {check('84-1',121,359,{'84-1-a1':'Die Sonne scheint|Es ist schön warm|Man sieht nicht viele Wolken','84-1-a2':'Die Sonne scheint|Es ist schön warm|Man sieht nicht viele Wolken','84-1-a3':'Die Sonne scheint|Es ist schön warm|Man sieht nicht viele Wolken','84-1-b1':'Es ist bewölkt|Es ist kühl','84-1-b2':'Es ist bewölkt|Es ist kühl','84-1-c1':'Es regnet schon lange|Es gibt bald ein Gewitter','84-1-c2':'Es regnet schon lange|Es gibt bald ein Gewitter'})}
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
  {check('84-2',140,563,{'84-2-a':'Nebel','84-2-b1':'Schnee','84-2-b2':'schneien','84-2-c':'Wind','84-2-d1':'donnert','84-2-d2':'blitzt','84-2-e1':'sonnig','84-2-e2':'Grad'})}
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
 </Canvas>;
}
