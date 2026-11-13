import {AB12Canvas,AB12Helpers} from '../ab12-shared';

const DOT_X=[662,691,721];
const DOT_LBL=['gut','mittel','schwach'];

function P74(h:AB12Helpers){const {line:ln,wl,art,field,rule,dot,modTab}=h;const D='naDroid74';
 const conf=(id:string,y:number)=><>{DOT_X.map((x,i)=>dot(id,''+(i+1),x,y,'Selbsteinschätzung '+id+' '+DOT_LBL[i]))}</>;
 return <>
  {ln(90,61,330,25,'SELBSTEINSCHÄTZUNG',{cls:'naHdr74'})}
  {art('das-kann-ich',424,54,166,36)}
  {art('dots',658,117,83,24)}
  {ln(89,125,120,15,'Ich kann jetzt …',{b:1,c:'#18408f',cls:D})}

  {/* 1: eine Person beschreiben */}
  {ln(89,148,177,13.5,'… eine Person beschreiben:',{b:1,cls:D})}
  {ln(272,148,22,13.5,'L19',{cls:D})}
  {conf('s1',149)}
  {ln(106,166,135,13.5,'Walter ist ein bisschen',{cls:D})}
  {rule(246,179,78)}{field('p74-s1-1',246,162,78,'1 Walter ist ein bisschen','naFieldBlank')}
  {ln(326,166,6,13.5,'.',{cls:D})}
  {ln(107,185,72,13.5,'Er hat einen',{cls:D})}
  {rule(184,197,79)}{field('p74-s1-2',184,180,79,'1 Er hat einen','naFieldBlank')}
  {ln(266,185,59,13.5,'und keine',{cls:D})}
  {rule(329,197,88)}{field('p74-s1-3',329,180,89,'1 und keine','naFieldBlank')}
  {ln(420,185,6,13.5,'.',{cls:D})}
  {art('1',439,129,95,85)}

  {/* 2: erstaunt reagieren */}
  {ln(89,221,142,13.5,'… erstaunt reagieren:',{b:1,cls:D})}
  {ln(237,221,21,13.5,'L19',{cls:D})}
  {conf('s2',221)}
  {art('sym-tri',105,241,12,11)}
  {ln(124,239,163,13.5,'Brad Pitt ist wieder Single.',{cls:D})}
  {art('sym-sq',299,239,12,11)}
  {ln(313,239,11,13.5,'E',{cls:D})}
  {rule(324,251,59)}{field('p74-s2-1',324,234,59,'2 E','naFieldBlank')}
  {ln(385,239,8,13.5,'?',{cls:D})}
  {art('sym-circ',104,258,13,14)}
  {ln(123,259,375,13.5,'Vor zwei Monaten hat Mark sein Kind an der Kasse vergessen.',{cls:D})}
  {art('sym-dia',104,275,13,13)}
  {ln(122,277,7,13.5,'A',{cls:D})}
  {rule(131,289,47)}{field('p74-s2-2',131,272,47,'2 A','naFieldBlank')}
  {ln(184,277,5,13.5,'k',{cls:D})}
  {rule(191,289,66)}{field('p74-s2-3',191,272,66,'2 k','naFieldBlank')}
  {ln(259,277,138,13.5,"! Das gibt's doch nicht.",{cls:D})}

  {/* 3: Aufforderungen und Bitten formulieren */}
  {ln(89,312,280,13.5,'… Aufforderungen und Bitten formulieren:',{b:1,cls:D})}
  {ln(371,312,23,13.5,'L20',{cls:D})}
  {conf('s3',311)}
  {ln(88,329,42,13.5,'Sophie,',{cls:D})}
  {rule(135,343,468)}{field('p74-s3-1',135,326,468,'3 Sophie','naFieldBlank')}
  {ln(604,329,5,13.5,'!',{cls:D})}
  {ln(89,349,96,13.5,'Lara und Simon,',{cls:D})}
  {rule(191,361,412)}{field('p74-s3-2',191,344,412,'3 Lara und Simon','naFieldBlank')}
  {ln(604,349,5,13.5,'!',{cls:D})}
  {art('auff',612,301,45,84)}

  {/* 4: über Regeln sprechen */}
  {ln(89,385,161,13.5,'… über Regeln sprechen:',{b:1,cls:D})}
  {ln(255,385,21,13.5,'L21',{cls:D})}
  {conf('s4',385)}
  {ln(89,401,23,13.5,'Man',{cls:D})}
  {rule(118,416,88)}{field('p74-s4-1a',118,399,88,'4 Man hier 1','naFieldBlank')}
  {ln(210,401,23,13.5,'hier',{cls:D})}
  {rule(238,416,272)}{field('p74-s4-1b',238,399,272,'4 Man hier 1 Ende','naFieldBlank')}
  {ln(511,401,6,13.5,'.',{cls:D})}
  {ln(89,422,36,13.5,'Das ist',{cls:D})}
  {rule(130,434,118)}{field('p74-s4-2',130,417,118,'4 Das ist','naFieldBlank')}
  {ln(250,422,6,13.5,'.',{cls:D})}
  {ln(89,441,23,13.5,'Man',{cls:D})}
  {rule(118,456,88)}{field('p74-s4-3a',118,439,88,'4 Man hier 2','naFieldBlank')}
  {ln(205,441,28,13.5,'hier',{cls:D})}
  {rule(238,456,220)}{field('p74-s4-3b',238,439,220,'4 Man hier 2 Ende','naFieldBlank')}
  {ln(461,441,6,13.5,'.',{cls:D})}
  {ln(89,462,72,13.5,'Das ist nicht',{cls:D})}
  {rule(166,474,118)}{field('p74-s4-4',166,457,118,'4 Das ist nicht','naFieldBlank')}
  {ln(286,462,6,13.5,'.',{cls:D})}
  {art('sign-eat',523,384,46,63)}
  {art('sign-phone',476,434,43,54)}

  {/* 5: meine Meinung sagen */}
  {ln(89,498,163,13.5,'… meine Meinung sagen:',{b:1,cls:D})}
  {ln(258,498,21,13.5,'L21',{cls:D})}
  {conf('s5',498)}
  {ln(89,515,251,13.5,'Im Flugzeug darf man nicht telefonieren.',{cls:D})}
  {ln(342,515,75,13.5,'Das finde ich',{cls:D})}
  {rule(423,528,136)}{field('p74-s5-1',423,511,136,'5 Das finde ich','naFieldBlank')}
  {art('smile-pos',559,512,24,20)}
  {ln(89,533,75,13.5,'Ich finde das',{cls:D})}
  {rule(168,546,128)}{field('p74-s5-2',168,529,128,'5 Ich finde das','naFieldBlank')}
  {art('smile-neg',294,530,30,20)}
  {ln(89,551,27,13.5,'Ich v',{cls:D})}
  {rule(117,564,137)}{field('p74-s5-3',117,547,137,'5 Ich v','naFieldBlank')}
  {ln(258,551,214,13.5,'das nicht. Das kann doch nicht so s',{cls:D})}
  {rule(469,564,104)}{field('p74-s5-4',469,547,104,'5 so s','naFieldBlank')}
  {ln(580,551,31,13.5,'sein.',{cls:D})}

  {/* Ich kenne */}
  {ln(89,612,92,14,'Ich kenne …',{b:1,c:'#18408f',cls:D})}
  {ln(89,635,174,13.5,'… 8 Wörter zum Aussehen:',{b:1,cls:D})}
  {ln(269,635,22,13.5,'L19',{cls:D})}
  {conf('k1',635)}
  {ln(105,653,173,13,'4 Wörter für mein Aussehen:',{cls:D})}
  {rule(105,684,501)}{field('p74-k1-1',105,667,501,'8 Wörter Zeile 1','naFieldBlank')}
  {ln(105,689,443,13,'4 Wörter für das Aussehen von meiner Traumfrau / meinem Traummann:',{cls:D})}
  {rule(105,720,501)}{field('p74-k1-2',105,703,501,'8 Wörter Zeile 2','naFieldBlank')}

  {ln(89,743,188,13.5,'… 6 Charaktereigenschaften:',{b:1,cls:D})}
  {ln(283,743,21,13.5,'L19',{cls:D})}
  {conf('k2',742)}
  {ln(106,761,69,13,'Positiv (3x):',{cls:D})}
  {rule(177,774,430)}{field('p74-k2-1',177,757,430,'Positiv','naFieldBlank')}
  {ln(106,780,74,13,'Negativ (3x):',{cls:D})}
  {rule(186,792,420)}{field('p74-k2-2',186,775,420,'Negativ','naFieldBlank')}

  {ln(89,816,198,13.5,'… 10 Aktivitäten im Haushalt:',{b:1,cls:D})}
  {ln(292,816,23,13.5,'L20',{cls:D})}
  {conf('k3',814)}
  {ln(106,834,379,13,'Das mache ich ganz gern. / Das finde ich nicht so schlimm (5x):',{cls:D})}
  {rule(105,865,501)}{field('p74-k3-1',105,848,501,'Aktivitäten gern','naFieldBlank')}
  {ln(106,870,107,13,'Das hasse ich (5x):',{cls:D})}
  {rule(218,883,388)}{field('p74-k3-2',218,866,388,'Aktivitäten hasse','naFieldBlank')}

  {ln(89,906,233,13.5,'… 5 Regeln in Verkehr und Umwelt:',{b:1,cls:D})}
  {ln(328,906,21,13.5,'L21',{cls:D})}
  {conf('k4',905)}
  {rule(105,937,501)}{field('p74-k4-1',105,920,501,'Regeln Zeile 1','naFieldBlank')}
  {rule(105,955,501)}{field('p74-k4-2',105,938,501,'Regeln Zeile 2','naFieldBlank')}

  {modTab(2,1056,'Modul 7')}
  {wl(1063,12,[{x:68,w:12,t:'74',b:1},{x:92,w:1,t:'|'}])}
  {ln(106,1052,88,12,'vierundsiebzig')}
 </>;
}

export function NativeAB12P74({page}:{page:string}){
 if(page==='74')return <AB12Canvas page={page} width={807} height={1094}>{P74}</AB12Canvas>;
 return null;
}
