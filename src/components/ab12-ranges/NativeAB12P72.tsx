import {AB12Canvas,AB12Helpers} from '../ab12-shared';

function P72(h:AB12Helpers){const {line:ln,runs:rn,wl,art,field,rule,dot,check,title,kb,side,audio,strike,head,foot,tab,modTab,box,rect,values,set}=h;const D='naDroid72';return <>
  {ln(94,60,585,25,'WIEDERHOLUNGSSTATION: WORTSCHATZ',{fam:'serif',c:'#111111',ls:1.5})}
  {box('1',94,124)}  {rn(125,126,444,15,[{t:'Ergänzen Sie die Vokale (a, e, i, o, ö, u, ü) und ordnen Sie zu.',b:1}],{fam:'fira'})}
  {rect(124,154,349,19,'#fbf9d4')}
  {ln(128,157,41,13,'gl ckl ch',{c:'#4d6a98',cls:'naSk72'})}
  {ln(181,157,36,13,'schl nk',{c:'#4d6a98',cls:'naSk72'})}
  {ln(230,157,24,13,'bl nd',{c:'#4d6a98',cls:'naSk72'})}
  {ln(267,157,22,13,'tr  r g',{c:'#4d6a98',cls:'naSk72'})}
  {ln(301,157,35,13,'k m sch',{c:'#4d6a98',cls:'naSk72'})}
  {ln(349,157,20,13,'d ck',{c:'#4d6a98',cls:'naSk72'})}
  {ln(381,157,41,13,'fr  ndl ch',{c:'#4d6a98',cls:'naSk72'})}
  {ln(436,157,33,13,'h bsch',{c:'#4d6a98',cls:'naSk72'})}
  {[175,224,261,294,343,375,429].map(x=>ln(x,157,3,13,'|',{c:'#4d6a98'}))}
  {art('ue-hand',133,155,15,13)}
  {field('p72-1-w1i',155,150,12,'1 glücklich i','naFieldBlank')}
  {field('p72-1-w2a',201,150,12,'1 schlank a','naFieldBlank')}
  {field('p72-1-w3o',239,150,12,'1 blond o','naFieldBlank')}
  {field('p72-1-w4au',273,150,15,'1 traurig au','naFieldBlank')}
  {field('p72-1-w4i',284,150,9,'1 traurig i','naFieldBlank')}
  {field('p72-1-w5o',305,150,11,'1 komisch o','naFieldBlank')}
  {field('p72-1-w5i',316,150,9,'1 komisch i','naFieldBlank')}
  {field('p72-1-w6i',354,150,11,'1 dick i','naFieldBlank')}
  {field('p72-1-w7eu',389,150,16,'1 freundlich eu','naFieldBlank')}
  {field('p72-1-w7i',411,150,9,'1 freundlich i','naFieldBlank')}
  {field('p72-1-w8ue',441,150,11,'1 hübsch ü','naFieldBlank')}
  {rect(124,181,578,23,'#e9e4c5')}
  {ln(130,185,60,15,'Aussehen',{b:1,cls:D})}
  {ln(419,186,68,15,'Charakter',{b:1,cls:D})}
  {[204,227,249,271,293].map(y=><div key={'tr'+y} className='naRule' style={{left:124,top:y,width:578,borderBottom:'1px solid #dcd8c8'}}/>)}
  {[124,414,702].map(x=><div key={'tv'+x} style={{position:'absolute',left:x,top:181,width:1,height:112,background:'#dcd8c8'}}/>)}
  {art('glueck-hand',416,206,90,30)}
  {[206,229,251,273].map((y,i)=>field('p72-1-a'+(i+1),130,y,270,'1 Aussehen Zeile '+(i+1),'naFieldBlank'))}
  {[229,251,273].map((y,i)=>field('p72-1-c'+(i+2),420,y,270,'1 Charakter Zeile '+(i+2),'naFieldBlank'))}
  {check('g1',655,300,{'p72-1-w1i':'i','p72-1-w2a':'a','p72-1-w3o':'o','p72-1-w4au':'au','p72-1-w4i':'i','p72-1-w5o':'o','p72-1-w5i':'i','p72-1-w6i':'i','p72-1-w7eu':'eu','p72-1-w7i':'i','p72-1-w8ue':'ü','p72-1-a1':'schlank|blond|dick|hübsch','p72-1-a2':'schlank|blond|dick|hübsch','p72-1-a3':'schlank|blond|dick|hübsch','p72-1-a4':'schlank|blond|dick|hübsch','p72-1-c2':'traurig|komisch|freundlich','p72-1-c3':'traurig|komisch|freundlich','p72-1-c4':'traurig|komisch|freundlich'})}
  {box('2',94,330)}  {rn(125,332,407,15,[{t:'Was passt nicht? Streichen Sie das falsche Wort durch.',b:1}],{fam:'fira'})}
  {[['a',358,'Wäsche:',52],['b',378,'Zimmer:',55],['c',398,'Tisch:',38],['d',417,'Geschirr:',58],['e',436,'Bad:',27],['f',459,'Boden:',43]].map(([l,y,t,w])=><div key={'e2'+l}>{ln(125,y as number,5,15,l as string,{cls:D})}{ln(142,y as number,w as number,15,t as string,{cls:D})}</div>)}
  {strike('s-a',216,358,['abtrocknen','bügeln','aufhängen'],' – ','abtrocknen')}
  {strike('s-b',217,378,['aufräumen','rausbringen','staubsaugen'])}
  {strike('s-c',217,398,['decken','spülen','putzen'])}
  {strike('s-d',217,417,['abwaschen','abtrocknen','wischen'])}
  {strike('s-e',217,436,['kochen','putzen','aufräumen'])}
  {strike('s-f',217,459,['staubsaugen','backen','wischen'])}
  {check('g2',650,466,{'s-b':'rausbringen','s-c':'spülen','s-d':'wischen','s-e':'kochen','s-f':'backen'})}
  {box('3',94,504)}  {rn(125,506,297,15,[{t:'Der Ampelmann. Ergänzen Sie den Text.',b:1}],{fam:'fira'})}
  {art('p1',124,535,75,114)}
  {art('p2',227,534,171,115)}
  {art('p3',429,547,60,89)}
  {art('p4',525,536,82,113)}
  {art('p5',629,532,113,114)}
  {rect(125,671,437,16,'#fbfbdb')}
  {ln(128,672,42,15,'dürfen',{c:'#4d6a98'})}
  {ln(173,672,3,15,'|',{c:'#4d6a98'})}
  {ln(179,672,46,15,'schiebt',{c:'#4d6a98'})}
  {ln(228,672,3,15,'|',{c:'#4d6a98'})}
  {ln(235,672,83,15,'Fahrradfahrer',{c:'#4d6a98'})}
  {ln(321,672,3,15,'|',{c:'#4d6a98'})}
  {ln(327,672,91,15,'stehen bleiben',{c:'#4d6a98'})}
  {ln(421,672,3,15,'|',{c:'#4d6a98'})}
  {ln(427,672,42,15,'Regeln',{c:'#4d6a98',cls:'naStrikeBlue72'})}
  {ln(472,672,3,15,'|',{c:'#4d6a98'})}
  {ln(478,672,32,15,'trägt',{c:'#4d6a98'})}
  {ln(513,672,3,15,'|',{c:'#4d6a98'})}
  {ln(519,672,40,15,'achten',{c:'#4d6a98'})}
  <div className='naRule' style={{left:500,top:725,width:195,borderBottom:'1px solid #c6c6ce'}}/>
  <div className='naRule' style={{left:193,top:744,width:195,borderBottom:'1px solid #c6c6ce'}}/>
  <div className='naRule' style={{left:132,top:763,width:194,borderBottom:'1px solid #c6c6ce'}}/>
  <div className='naRule' style={{left:466,top:763,width:89,borderBottom:'1px solid #c6c6ce'}}/>
  <div className='naRule' style={{left:429,top:880,width:196,borderBottom:'1px solid #c6c6ce'}}/>
  <div className='naRule' style={{left:192,top:900,width:194,borderBottom:'1px solid #c6c6ce'}}/>
  {ln(133,712,20,15,'Die',{cls:D})}
  {art('regeln-hand',153,709,48,26)}
  {ln(200,711,297,15,'für Ampeln sind einfach. Bei Rot müssen Sie',{cls:D})}
  {field('p72-3_0',500,706,195,'3 Lücke 1','naFieldBlank')}
  {ln(698,712,5,15,',',{cls:D})}
  {ln(132,731,57,15,'bei Grün',{cls:D})}
  {field('p72-3_1',192,725,196,'3 Lücke 2','naFieldBlank')}
  {ln(392,731,172,15,'Sie gehen. Autofahrer und',{cls:D})}
  {field('p72-3_2',132,744,196,'3 Lücke 3','naFieldBlank')}
  {ln(331,751,129,15,'müssen auf Ampeln',{cls:D})}
  {field('p72-3_3',466,744,89,'3 Lücke 4','naFieldBlank')}
  {ln(558,751,118,15,'– und natürlich',{cls:D})}
  {ln(132,770,104,15,'auch Fußgänger.',{cls:D})}
  {ln(133,789,359,15,'Die Ampeln für Fußgänger sehen aber besonders aus:',{cls:D})}
  {ln(132,809,545,15,'Sie haben einen „Ampelmann“. Dieser Ampelmann ist in Deutschland sehr bekannt.',{cls:D})}
  {ln(133,828,322,15,'Es gibt ihn seit 1961, er ist also über 50 Jahre alt.',{cls:D})}
  {ln(132,847,441,15,'Viele Länder haben einen Ampelmann. Sie sehen verschieden aus.',{cls:D})}
  {ln(133,867,277,15,'Manchmal ist er dick oder dünn, manchmal',{cls:D})}
  {field('p72-3_4',428,861,197,'3 Lücke 5','naFieldBlank')}
  {ln(629,868,71,15,'er ein Fahr-',{cls:D})}
  {ln(133,887,54,15,'rad oder',{cls:D})}
  {field('p72-3_5',192,881,194,'3 Lücke 6','naFieldBlank')}
  {ln(390,887,290,15,'einen Hut, und manchmal gibt es auch eine',{cls:D})}
  {ln(132,906,66,15,'Ampelfrau.',{cls:D})}
  {check('g3',230,905,{'p72-3_0':'stehen bleiben','p72-3_1':'dürfen','p72-3_2':'Fahrradfahrer','p72-3_3':'achten','p72-3_4':'schiebt','p72-3_5':'trägt'})}
  {modTab(2,1056,'Modul 7')}
  {wl(1063,12,[{x:74,w:11,t:'72'},{x:96,w:1,t:'|'},{x:110,w:93,t:'zweiundsiebzig'}])}
</>}

export function NativeAB12P72({page}:{page:string}){
 if(page==='72')return <AB12Canvas page={page} width={807} height={1094}>{P72}</AB12Canvas>;
 return null;
}
