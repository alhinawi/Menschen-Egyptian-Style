import {AB12Canvas,AB12Helpers} from '../ab12-shared';

const BLUE='#003080';
const MG='#a060a0';
const TB='#d5d1b2';
const TY='#f2eac4';

function P76(h:AB12Helpers){const {line:ln,wl,art,area,rect}=h;const D='naDroid76';
 return <>
  {ln(92,61,161,27.5,'RÜCKBLICK',{cls:'naRb76'})}

  {/* Lektion 20 */}
  {ln(91,126,283,17.5,'Wählen Sie eine Aufgabe zu Lektion',{b:1,c:BLUE,cls:D})}
  {rect(381,127,23,15,'#700060')}
  {wl(140,12,[{x:386,w:13,t:'20',b:1,c:'#fff'}])}
  {rect(406,140,330,2,'#a06ab5')}

  {art('m1',58,166,62,32)}
  {ln(124,173,575,16,'Lesen Sie noch einmal im Kursbuch auf Seite 48 die E-Mail von Gert (Aufgabe 9).',{b:1,cls:D})}
  {ln(99,206,8,14.5,'a',{b:1,cls:D})}
  {ln(123,207,332,14.5,'Was macht Gert gern? Was kann er gut? Wie ist er?',{cls:D})}
  {art('hw1',116,230,96,30)}
  {ln(100,272,9,14.5,'b',{b:1,cls:D})}
  {ln(124,274,561,14.5,'Die perfekte Mitbewohnerin / Der perfekte Mitbewohner. Schreiben Sie zu folgenden',{cls:D})}
  {ln(124,290,57,14.5,'Punkten:',{cls:D})}
  {ln(123,322,104,15,'• Wie ist sie/er?',{cls:D})}
  {ln(123,342,221,15,'• Was macht sie/er gern und gut?',{cls:D})}
  {ln(123,361,153,15,'• Was macht sie/er oft?',{cls:D})}
  {art('hw2',116,384,266,28)}

  {art('m2',50,430,70,36)}
  {ln(122,437,577,16,'Wie ist eine NICHT perfekte Mitbewohnerin / ein NICHT perfekter Mitbewohner?',{b:1,cls:D})}
  {ln(122,454,103,16,'Schreiben Sie.',{b:1,cls:D})}
  {art('hw3',116,482,281,30)}

  {/* Lektion 21 */}
  {ln(91,544,283,17.5,'Wählen Sie eine Aufgabe zu Lektion',{b:1,c:BLUE,cls:D})}
  {rect(381,546,23,15,'#700060')}
  {wl(559,12,[{x:386,w:13,t:'21',b:1,c:'#fff'}])}
  {rect(420,559,316,2,'#a06ab5')}

  {art('m3',56,586,64,30)}
  {ln(122,594,535,16.5,'Sehen Sie noch einmal das Bild im Kursbuch auf Seite 51 (Aufgabe 6) an',{b:1,cls:D})}
  {ln(122,612,330,13,'und wählen Sie zwei Personen. Ergänzen Sie die Tabelle.',{b:1,cls:D})}

  {/* Tabelle 1 */}
  {rect(122,641,615,24,TY)}
  {rect(121,640,616,1,TB)}{rect(121,665,616,1,TB)}{rect(121,721,616,1,TB)}{rect(121,758,616,1,TB)}{rect(121,828,616,1,TB)}
  {rect(121,640,1,189,TB)}{rect(275,640,1,189,TB)}{rect(429,640,1,189,TB)}{rect(583,640,1,189,TB)}{rect(737,640,1,189,TB)}
  {ln(283,647,52,13.5,'Person 1',{b:1,cls:'naTblHdr76'})}
  {ln(437,647,53,13.5,'Person 2',{b:1,cls:'naTblHdr76'})}
  {ln(590,647,53,13.5,'Person 3',{b:1,cls:'naTblHdr76'})}
  {ln(128,667,140,13.5,'Was machen die Perso-',{cls:D})}
  {ln(128,685,128,13.5,'nen? Ist das erlaubt/',{cls:D})}
  {ln(128,700,62,13.5,'verboten?',{cls:D})}
  {ln(128,730,119,13.5,'Wie finden Sie das?',{cls:D})}
  {ln(128,775,127,13.5,'Machen Sie das auch',{cls:D})}
  {ln(128,794,95,13.5,'manchmal/nie?',{cls:D})}
  {art('hwt1a',278,672,148,40)}
  {art('hwt1b',278,726,130,30)}
  {art('hwt1c',278,762,152,66)}
  {area('p76-t1-r1-p2',434,670,144,47,'Tabelle 1 Person 2 erlaubt/verboten')}
  {area('p76-t1-r1-p3',588,670,144,47,'Tabelle 1 Person 3 erlaubt/verboten')}
  {area('p76-t1-r2-p2',434,725,144,30,'Tabelle 1 Person 2 Wie finden Sie das')}
  {area('p76-t1-r2-p3',588,725,144,30,'Tabelle 1 Person 3 Wie finden Sie das')}
  {area('p76-t1-r3-p2',434,763,144,61,'Tabelle 1 Person 2 manchmal/nie')}
  {area('p76-t1-r3-p3',588,763,144,61,'Tabelle 1 Person 3 manchmal/nie')}

  {art('m4',48,848,70,38)}
  {ln(121,852,515,16.7,'Sie wohnen in einer WG oder wollen ein Zimmer in einer WG mieten.',{b:1,cls:D})}
  {ln(121,878,400,13,'Notieren Sie: Welche Regeln gibt es? Welche Regeln akzeptieren Sie?',{b:1,cls:D})}

  {/* Tabelle 2 */}
  {rect(122,904,615,22,TY)}
  {rect(121,903,616,1,TB)}{rect(121,926,616,1,TB)}{rect(121,978,616,1,TB)}{rect(121,1011,616,1,TB)}
  {rect(121,903,1,109,TB)}{rect(326,903,1,109,TB)}{rect(531,903,1,109,TB)}{rect(737,903,1,109,TB)}
  {ln(128,908,104,13.5,'Regeln in der WG',{b:1,cls:'naTblHdr76'})}
  {ln(333,908,146,13.5,'Wie finde ich die Regel?',{b:1,cls:'naTblHdr76'})}
  {ln(538,908,91,13.5,'Das mache ich.',{b:1,cls:'naTblHdr76'})}
  {art('hwt2a',124,933,160,37)}
  {art('hwt2b',277,934,235,36)}
  {art('hwt2c',533,928,185,49)}
  {art('hwdots',124,988,21,18)}
  {area('p76-t2-r2-c1',149,983,171,25,'Tabelle 2 weitere Regel')}
  {area('p76-t2-r2-c2',330,983,197,25,'Tabelle 2 weitere Regel Meinung')}
  {area('p76-t2-r2-c3',535,983,198,25,'Tabelle 2 weitere Regel Verhalten')}

  {art('badge',0,1048,62,24)}
  {wl(1067,12,[{x:70,w:14,t:'76',b:1}])}
  {rect(95,1056,1,12,'#202020')}
  {ln(109,1056,95,13,'sechsundsiebzig',{cls:'naFoot76'})}
 </>;
}

export function NativeAB12P76({page}:{page:string}){
 if(page==='76')return <AB12Canvas page={page} width={807} height={1094}>{P76}</AB12Canvas>;
 return null;
}
