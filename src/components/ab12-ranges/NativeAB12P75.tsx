import {AB12Canvas,AB12Helpers} from '../ab12-shared';

const DOT_X=[654,684,713];
const DOT_LBL=['gut','mittel','schwach'];
const B='#1f3e88';

function P75(h:AB12Helpers){const {line:ln,wl,art,field,rule,dot,rect}=h;const D='naDroid75';const H='naDroid75H';
 const conf=(id:string,y:number)=><>{DOT_X.map((x,i)=>dot(id,''+(i+1),x,y,'Selbsteinschätzung '+id+' '+DOT_LBL[i]))}</>;
 return <>
  {ln(83,58,327,25,'SELBSTEINSCHÄTZUNG',{cls:'naHdr75'})}
  {art('script',420,54,162,40)}
  {art('bars',738,35,72,70)}
  {art('dots',646,120,92,30)}
  {ln(84,119,95,15,'Ich kann auch',{b:1,c:B,cls:D})}
  {ln(185,119,15,15,'…',{b:1,c:B,cls:D})}

  {/* 1: Präteritum war/hatte */}
  {ln(83,144,355,13.5,'… über Vergangenes sprechen (Präteritum: war, hatte):',{b:1,cls:H})}
  {ln(441,144,18,13.5,'L19',{cls:D})}
  {conf('s1',154)}
  {ln(101,161,41,13.5,'Früher',{cls:D})}
  {rule(147,175,58)}{field('p75-s1-1',147,158,58,'1 Früher','naFieldBlank')}
  {ln(217,161,108,13.5,'Simone blond. Sie',{cls:D})}
  {rule(328,179,54)}{field('p75-s1-2',328,162,54,'1 Sie','naFieldBlank')}
  {ln(400,161,170,13.5,'kurze Haare und eine Brille.',{cls:D})}

  {/* 2: Perfekt, nicht trennbare Verben */}
  {ln(82,200,417,13.5,'… über Vergangenes sprechen (Perfekt: nicht trennbare Verben):',{b:1,cls:H})}
  {ln(505,200,19,13.5,'L19',{cls:D})}
  {conf('s2',207)}
  {ln(100,217,174,13.5,'Natascha hat sich verändert.',{cls:D})}
  {ln(278,217,27,13.5,'Tom',{cls:D})}
  {rule(308,233,64)}{field('p75-s2-1',308,213,64,'2 Tom','naFieldBlank')}
  {ln(377,217,130,13.5,'Natascha nicht sofort',{cls:D})}
  {rule(98,247,128)}{field('p75-s2-2',98,230,128,'2 erkennen','naFieldBlank')}
  {ln(236,236,74,13.5,'. (erkennen)',{cls:D})}
  {ln(98,253,17,13.5,'Sie',{cls:D})}
  {rule(120,265,55)}{field('p75-s2-3',120,249,55,'2 Sie','naFieldBlank')}
  {ln(211,253,149,13.5,'vor zwei Jahren ein Baby',{cls:D})}
  {rule(364,271,106)}{field('p75-s2-4',364,254,106,'2 Baby','naFieldBlank')}
  {ln(512,260,81,13.5,'. (bekommen)',{cls:D})}
  {ln(99,270,12,13.5,'Er',{cls:D})}
  {rule(116,283,61)}{field('p75-s2-5',116,266,61,'2 Er','naFieldBlank')}
  {ln(197,270,89,13.5,'das Baby leider',{cls:D})}
  {rule(343,288,82)}{field('p75-s2-6',343,271,82,'2 leider','naFieldBlank')}
  {ln(428,277,73,13.5,'. (vergessen)',{cls:D})}

  {/* 3: Imperativ du/ihr */}
  {ln(80,306,275,13.5,'… Befehle formulieren (Imperativ: du/ihr):',{b:1,cls:H})}
  {ln(366,306,20,13.5,'L20',{cls:D})}
  {conf('s3',316)}
  {ln(98,322,30,13.5,'Line,',{cls:D})}
  {rule(132,338,87)}{field('p75-s3-1',132,321,87,'3 Line','naFieldBlank')}
  {ln(223,322,31,13.5,'leise!',{cls:D})}
  {ln(97,340,105,12.8,'Line und Melanie,',{cls:D})}
  {rule(205,354,111)}{field('p75-s3-2',205,337,111,'3 Melanie','naFieldBlank')}
  {ln(322,340,96,12.8,'sofort da runter!',{cls:D})}

  {/* 4: Personalpronomen im Akkusativ */}
  {ln(79,379,431,13.5,'… sagen, wen man anrufen soll (Personalpronomen im Akkusativ):',{b:1,cls:H})}
  {ln(516,379,20,13.5,'L20',{cls:D})}
  {conf('s4',388)}
  {ln(96,394,50,13.5,'Lisa, ruf',{cls:D})}
  {rule(149,410,86)}{field('p75-s4-1',149,395,86,'4 ich','naFieldBlank')}
  {ln(242,394,152,13.5,'bitte heute noch an! (ich)',{cls:D})}
  {ln(96,412,50,13.5,'Lisa, ruf',{cls:D})}
  {rule(149,428,86)}{field('p75-s4-2',149,413,86,'4 er','naFieldBlank')}
  {ln(241,412,146,13.5,'bitte heute noch an! (er)',{cls:D})}

  {/* 5: Modalverben dürfen/müssen */}
  {ln(77,450,434,13.5,'… Verbote und Gebote ausdrücken (Modalverben: dürfen, müssen):',{b:1,cls:H})}
  {ln(509,450,17,13.5,'L21',{cls:D})}
  {conf('s5',460)}
  {ln(95,468,46,13.5,'Im Park',{cls:D})}
  {rule(157,483,52)}{field('p75-s5-1',157,466,52,'5 Park','naFieldBlank')}
  {ln(218,468,157,13.5,'man auf dem Weg bleiben.',{cls:D})}
  {ln(94,490,86,13.5,'Sieh mal! Hier',{cls:D})}
  {rule(193,506,59)}{field('p75-s5-2',193,489,59,'5 baden','naFieldBlank')}
  {ln(265,490,64,13.5,'wir baden.',{cls:D})}
  {art('sign-red',384,483,44,57)}
  {art('sign-green',330,494,48,54)}

  {/* Üben / Wiederholen */}
  {ln(75,555,259,15,'Üben / Wiederholen möchte ich noch',{b:1,c:B,cls:D})}
  {ln(339,555,13,15,'…',{b:1,c:B,cls:D})}
  {rect(73,598,518,2,'#c4c7cb')}
  {field('p75-ueben',73,580,518,'Üben/Wiederholen','naFieldBlank')}

  {/* RÜCKBLICK */}
  {ln(74,648,128,21,'RÜCKBLICK',{cls:'naRb75'})}
  {ln(71,702,286,15,'Wählen Sie eine Aufgabe zu Lektion',{b:1,c:B,cls:D})}
  {rect(361,706,22,13,'#22529a')}
  {wl(717,13.5,[{x:364,w:17,t:'19',b:1,c:'#fff'}])}
  <div className="naRect" style={{left:386,top:719,width:332,height:2,background:'#9bbed4',transform:'rotate(1deg)',transformOrigin:'left top'}}/>

  {/* Aufgabe 1 */}
  {art('t1',42,749,54,20)}
  {ln(101,754,548,13.5,'Sehen Sie noch einmal das Bild im Kursbuch auf Seite 42 (Aufgabe 4) an.',{b:1,cls:D})}
  {ln(101,774,494,13.5,'Wählen Sie eine Person. Beschreiben Sie die Person (Aussehen, Charakter).',{b:1,cls:D})}
  {art('hw1',106,810,204,44)}

  {/* Aufgabe 2 */}
  {art('t2',33,895,68,21)}
  {ln(98,900,554,13.5,'Wählen Sie eine Person aus Ihrer Familie. Wie war sie/er vor zehn Jahren?',{b:1,cls:D})}
  {ln(99,918,473,13.5,'Was haben Sie zusammen gemacht? Wie ist sie/er heute? Schreiben Sie.',{b:1,cls:D})}
  {art('hw2',108,956,210,66)}

  {art('badge',737,1050,66,25)}
  {wl(1070,12,[{x:717,w:11,t:'75',b:1}])}
  {rect(703,1059,1,12,'#202020')}
  {ln(600,1056,91,12,'fünfundsiebzig',{cls:'naFoot75'})}
 </>;
}

export function NativeAB12P75({page}:{page:string}){
 if(page==='75')return <AB12Canvas page={page} width={810} height={1095}>{P75}</AB12Canvas>;
 return null;
}
