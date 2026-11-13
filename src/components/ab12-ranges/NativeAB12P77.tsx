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

  {ln(434,197.4,111,14,'„Für Lisa natürlich.“',{cls:'naDlg77'})}
  {ln(100,213.4,81,14,'„Nach rechts!“',{cls:'naDlg77'})}
  {ln(434,217.4,185,14,'„Gefällt dir Lisa wirklich so gut?“',{cls:'naDlg77'})}
  {ln(100,233.4,72,14,'„Anja, bitte!“',{cls:'naDlg77'})}
  {ln(434,236.4,270,14,'„Ja, klar, ich finde sie sehr schön und auch nett.',{cls:'naDlg77'})}
  {ln(100,252.4,267,14,'„Ich habe es aber auf dem Stadtplan gesehen.“',{cls:'naDlg77'})}
  {ln(443,256.4,59,14,'Du nicht?“',{cls:'naDlg77'})}
  {ln(101,271.4,233,14,'„Hier darf man nicht nach rechts fahren.“',{cls:'naDlg77'})}
  {ln(435,275.4,261,14,'„Ich weiß nicht, ich finde sie nicht so hübsch.“',{cls:'naDlg77'})}
  {ln(101,291.4,238,14,'„Warum nimmst du dann die Ringstraße?“',{cls:'naDlg77'})}
  {ln(435,295.4,166,14,'„Was gefällt dir nicht an ihr?“',{cls:'naDlg77'})}
  {ln(101,310.4,307,14,'„So können wir noch ein Stück von Wien sehen, bevor',{cls:'naDlg77'})}
  {ln(436,315.4,184,14,'„Naja ... ihre Haare sind zu kurz.“',{cls:'naDlg77'})}
  {ln(109,330.4,302,14,'die Party anfängt. Schau, rechts sind der Heldenplatz',{cls:'naDlg77'})}
  {ln(435,335.4,218,14,'„Was? Zu kurz? Die sind genau richtig.“',{cls:'naDlg77'})}
  {ln(110,349.4,227,14,'und die Hofburg, und dort ist schon das',{cls:'naDlg77'})}
  {ln(435,354.4,210,14,'„Und die Locken passen nicht zu ihr.“',{cls:'naDlg77'})}
  {ln(110,370.4,84,14,'Burgtheater …“',{cls:'naDlg77'})}
  {ln(435,373.4,176,14,'„Ach was, die sind sehr schön.“',{cls:'naDlg77'})}
  {ln(101,389.4,173,14,'Aber Anja schaut nicht hinaus.',{cls:'naDlg77'})}
  {ln(436,393.4,120,14,'Herr Rossmann bellt.',{cls:'naDlg77'})}
  {ln(101,408.4,168,14,'„Was ist los, Anja?“ fragt Paul.',{cls:'naDlg77'})}
  {ln(435,412.4,248,14,'„Siehst du, Herr Rossmann findet die Haare',{cls:'naDlg77'})}
  {ln(102,426.4,48,14,'„Nichts.“',{cls:'naDlg77'})}
  {ln(443,433.4,56,14,'auch gut.“',{cls:'naDlg77'})}
  {ln(102,447.4,312,14,'Das ist los: Paul redet die ganze Zeit nur noch von Lisa.',{cls:'naDlg77'})}
  {ln(435,451.4,245,14,'„Herr Rossmann findet die Haare hässlich.“',{cls:'naDlg77'})}
  {ln(102,467.4,175,14,'„Was ist denn das?“, fragt Anja.',{cls:'naDlg77'})}
  {ln(436,471.4,120,14,'Herr Rossmann bellt.',{cls:'naDlg77'})}
  {ln(102,486.4,97,14,'„Naja ... Blumen.“',{cls:'naDlg77'})}
  {ln(435,489.4,157,14,'„Herr Rossmann sagt Nein.“',{cls:'naDlg77'})}
  {ln(102,505.4,61,14,'„Für wen?“',{cls:'naDlg77'})}
  {ln(435,510.4,141,14,'„Herr Rossmann sagt Ja.“',{cls:'naDlg77'})}
  {ln(563,553.4,161,14,'Sie kommen in die Walfisch-',{cls:'naDlg77'})}
  {ln(562,573.4,152,14,'gasse. Paul parkt das Auto.',{cls:'naDlg77'})}
  {ln(562,592.4,165,14,'„Hier ist es schön“, sagt Paul.',{cls:'naDlg77'})}
  {ln(563,611.4,144,14,'„Eine Wohnung im ersten',{cls:'naDlg77'})}
  {ln(565,631.4,148,14,'Bezirk — nicht schlecht …“',{cls:'naDlg77'})}
  {ln(564,650.4,67,14,'„Ach was …“',{cls:'naDlg77'})}
  {ln(565,670.4,120,14,'Herr Rossmann bellt.',{cls:'naDlg77'})}
  {ln(564,689.4,121,14,'„Ja, genau, gehen wir,',{cls:'naDlg77'})}
  {ln(565,709.4,96,14,'Herr Rossmann!“',{cls:'naDlg77'})}
  {ln(564,728.4,150,14,'„Genau. Und vergiss deine',{cls:'naDlg77'})}
  {ln(565,748.4,114,14,'Blumen nicht, Paul.“',{cls:'naDlg77'})}

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
