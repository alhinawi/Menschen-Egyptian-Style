import {AB12Canvas,AB12Helpers} from '../ab12-shared';

const R1='KALDEVERGESSENFAGUERKENNENLÜTAGEFALLENEDERBEKOMMENZUTERVERSTEHEN';
const R2='REDASBEZAHLENZUTAS';
const FIXED=new Set([5,6,7,8,9,10,11,12,13]); // VERGESSEN printed example
const EXPECT=[20,21,22,23,24,25,30,31,32,33,34,35,36,37,42,43,44,45,46,47,48,49,56,57,58,59,60,61,62,63,69,70,71,72,73,74,75,76].join(',');
const C1=[111.5,121,130,138.5,148,157,166,175.5,184.5,193.5,201.5,209,217,227,236.5,245,254,264,273.5,282.5,292.5,301.5,311,322,332,342,351.5,360.5,370,378.5,387.5,397,405,412.5,422.5,430.5,438.5,448.5,458.5,467.5,476.5,485.5,495,503.5,512.5,520.5,532.5,545.5,556.5,566,575.5,585,594.5,603.5,612,620.5,630.5,639,647.5,655.5,664.5,673.5,684,693.5];
const C2=[111,120.5,128.5,138.5,147.5,156,164.5,173,182,192,202,210.5,219.5,229,237.5,247,256.5,265.5];

function P73(h:AB12Helpers){const {line:ln,runs:rn,wl,art,field,check,box,modTab,values,set}=h;const D='naDroid73';
 const marked=new Set((values['p73-2-mark']||'').split(',').filter(Boolean).map(Number));
 const toggle=(i:number)=>{if(FIXED.has(i))return;const s=new Set(marked);if(s.has(i))s.delete(i);else s.add(i);set('p73-2-mark',[...s].sort((a,b)=>a-b).join(','))};
 const gridRow=(txt:string,off:number,y:number,C:number[])=><>{[...txt].map((ch,k)=>{const i=off+k;const fx=FIXED.has(i);const w=Math.min(12,(k>0?C[k]-C[k-1]:12),(k<C.length-1?C[k+1]-C[k]:12))-0.5;return <button key={i} className={'naGridL73'+(fx?' fix':(marked.has(i)?' mrk':''))} style={{left:C[k]-w/2,top:y,width:w,height:20,minWidth:0,minHeight:0,padding:0,lineHeight:'20px'}} aria-label={'2 Buchstabe '+(i+1)+' '+ch} onClick={()=>toggle(i)}>{ch}</button>})}</>;
 return <>
  {art('topbars',733,28,46,64)}
  {ln(73,59,584,25,'WIEDERHOLUNGSSTATION: GRAMMATIK',{cls:'naHdr73'})}
  {box('1',94,124,'#c80e04')}  {rn(125,126,306,15,[{t:'Ergänzen Sie haben oder sein im Präteritum.',b:1}],{fam:'fira'})}
  <div className='naPanel73'/>
  {art('scrollbar',644,155,19,143)}
  {ln(129,169,52,13,'Hallo Elly,',{cls:'naLetter73'})}
  {ln(129,186,79,13,"wie geht\u2019s Dir?",{cls:'naLetter73'})}
  {art('warst',210,177,36,21)}
  {/* spacing around handwriting per scan */}
  {ln(250,186,230,13.6,'(a) Du schon einmal in Graz? Jonas und ich',{cls:'naLetter73'})}
  {field('p73-1b',483,182,57,'1 b','naFieldBlank')}
  {ln(546,186,48,14,'(b) letzte',{cls:'naLetter73'})}
  {ln(129,202,94,13,'Woche in Graz. Es',{cls:'naLetter73'})}
  {field('p73-1c',228,197,57,'1 c','naFieldBlank')}
  {ln(291,202,98,13,'(c) wunderbar! Wir',{cls:'naLetter73'})}
  {field('p73-1d',394,197,56,'1 d','naFieldBlank')}
  {ln(456,202,169,13,'(d) auch immer schönes Wetter.',{cls:'naLetter73'})}
  {ln(129,218,318,13,'Am Mittwoch sind noch Mona und Tim gekommen und wir',{cls:'naLetter73'})}
  {field('p73-1e',458,214,57,'1 e','naFieldBlank')}
  {ln(521,218,78,13,'(e) so viel Spaß',{cls:'naLetter73'})}
  {ln(129,234,124,13,'zusammen. Am Freitag',{cls:'naLetter73'})}
  {field('p73-1f',258,230,54,'1 f','naFieldBlank')}
  {ln(318,234,285,13,'(f) ich den ganzen Tag allein mit Mona shoppen. Die',{cls:'naLetter73'})}
  {ln(129,251,41,13,'Männer',{cls:'naLetter73'})}
  {field('p73-1g',175,246,57,'1 g','naFieldBlank')}
  {ln(238,251,73,13,'(g) keine Lust.',{cls:'naLetter73'})}
  {art('smiley',316,249,15,16)}
  {ln(129,267,62,13,'Viele Grüße',{cls:'naLetter73'})}
  {ln(129,283,32,13,'Tanja',{cls:'naLetter73'})}
  {[[483,199,57],[228,213,57],[394,214,56],[458,230,57],[258,245,54],[175,262,57]].map(([x,y,w])=><div key={'u1'+x} className='naRule' style={{left:x,top:y,width:w,borderBottom:'1px solid #9aa4b5'}}/>)}
  {[[332,445,108],[285,464,107],[282,484,130],[349,503,111],[337,523,123]].map(([x,y,w])=><div key={'u2'+x} className='naRule' style={{left:x,top:y,width:w,borderBottom:'1px solid #9aa4b5'}}/>)}
  {check('g1',600,252,{'p73-1b':'waren','p73-1c':'war','p73-1d':'hatten','p73-1e':'hatten','p73-1f':'war','p73-1g':'hatten'})}
  {box('2',94,330,'#c80e04')}  {rn(125,332,600,15,[{t:'Markieren Sie die Verben und ergänzen Sie dann die Verben in der richtigen Form.',b:1}],{fam:'fira'})}
  <div className='naGridBand73'/>
  <div className='naGridHl73'/>
  {gridRow(R1,0,355,C1)}
  {gridRow(R2,64,374,C2)}
  {check('g2',712,382,{'p73-2-mark':EXPECT,'p73-2b':'gefallen','p73-2c':'bekommen','p73-2d':'bezahlt','p73-2e':'erkannt','p73-2f':'verstanden'})}
  {ln(108,409,8,13,'a',{cls:D})}{ln(126,409,283,13,'Entschuldigung! Ich habe den Termin total',{cls:D})}
  {art('vergessen-hand',414,410,54,18)}
  {ln(108,429,8,13,'b',{cls:D})}{ln(126,429,201,13,'Und, wie hat euch das Konzert',{cls:D})}
  {field('p73-2b',332,423,108,'2 b','naFieldBlank')}{ln(446,429,6,13,'?',{cls:D})}
  {ln(108,448,8,13,'c',{cls:D})}{ln(126,448,154,13,'Haben Sie meine E-Mail',{cls:D})}
  {field('p73-2c',285,442,107,'2 c','naFieldBlank')}{ln(398,448,6,13,'?',{cls:D})}
  {ln(108,468,8,13,'d',{cls:D})}{ln(126,468,151,13,'Hast du die Miete schon',{cls:D})}
  {field('p73-2d',282,462,130,'2 d','naFieldBlank')}{ln(418,468,6,13,'?',{cls:D})}
  {ln(108,487,8,13,'e',{cls:D})}{ln(126,487,218,13,'Wow Barbara, ich habe dich nicht',{cls:D})}
  {field('p73-2e',349,481,111,'2 e','naFieldBlank')}{ln(465,487,253,13,'. Seit wann hast du denn kurze Haare?',{cls:D})}
  {ln(108,507,8,13,'f',{cls:D})}{ln(126,507,206,13,'Den letzten Satz habe ich nicht',{cls:D})}
  {field('p73-2f',337,501,123,'2 f','naFieldBlank')}{ln(465,507,238,13,'. Können Sie ihn bitte wiederholen?',{cls:D})}
  {box('3',94,544,'#c80e04')}  {rn(125,546,286,15,[{t:'Notizzettel. Ergänzen Sie die Pronomen.',b:1}],{fam:'fira'})}
  <div className='naNoteBand73' style={{left:138,top:568,width:562,height:121}}/>{ln(108,572,8,13,'a',{cls:D})}{art('n3a',141,570,342,26)}
  {ln(108,592,8,13,'b',{cls:D})}{art('n3b',141,583,441,40)}
  {field('p73-3b',487,586,73,'3 b','naFieldBlank')}
  {ln(108,633,8,13,'c',{cls:D})}{art('n3c',141,629,444,19)}
  {field('p73-3c',385,625,93,'3 c','naFieldBlank')}
  {ln(108,653,8,13,'d',{cls:D})}{art('n3d',141,648,361,21)}
  {field('p73-3d',425,646,63,'3 d','naFieldBlank')}
  {ln(108,672,8,13,'e',{cls:D})}{art('n3e',142,663,560,25)}
  {field('p73-3e1',322,665,133,'3 e 1','naFieldBlank')}{field('p73-3e2',538,665,102,'3 e 2','naFieldBlank')}
  {check('g3',715,688,{'p73-3b':'sie','p73-3c':'ihn','p73-3d':'es','p73-3e1':'dich','p73-3e2':'ihn'})}
  {box('4',94,719,'#c80e04')}  {rn(125,721,545,15,[{t:'Im Flugzeug. Was darf man (nicht) / muss man / kann man? Schreiben Sie.',b:1}],{fam:'fira'})}
  {rect4()}
  <div style={{position:'absolute',left:333,top:748,width:102,height:19,background:'#f7fbd8'}}/>
  {ln(113,750,95,13,'Handy benutzen',{c:'#3f4c75',cls:'naStrip73'})}
  {ln(216,749,4,16,'|',{cls:'naPipe73'})}
  {ln(224,750,97,13,'Filme anschauen',{c:'#3f4c75',cls:'naStrip73'})}
  {ln(328,749,4,16,'|',{cls:'naPipe73'})}
  {ln(335,750,95,13,'sich anschnallen',{c:'#3f4c75',cls:'naStrip73 naSk73'})}
  {ln(439,749,4,16,'|',{cls:'naPipe73'})}
  {ln(446,750,44,13,'rauchen',{c:'#3f4c75',cls:'naStrip73'})}
  {ln(498,749,4,16,'|',{cls:'naPipe73'})}
  {ln(505,750,68,13,'etwas essen',{c:'#3f4c75',cls:'naStrip73'})}
  {ln(581,749,4,16,'|',{cls:'naPipe73'})}
  {ln(589,750,72,13,'Musik hören',{c:'#3f4c75',cls:'naStrip73'})}
  {art('flug-hand',106,776,227,22)}
  {box('5',94,827,'#c80e04')}  {rn(125,829,300,15,[{t:'Schreiben Sie Sätze mit ',b:1},{t:'bitte',i:1},{t:' im Imperativ.',b:1}],{fam:'fira'})}
  <div className='naBand73'/>
  {art('icon1',179,847,29,39)}
  {art('icons3',376,847,57,39)}
  {[885,915,937,959,981,1003,1022].map(y=><div key={'h5'+y} className='naRule' style={{left:108,top:y,width:612,borderBottom:'1px solid #d8d8d8'}}/>)}
  {[108,315,520,719].map(x=><div key={'v5'+x} className='naRule' style={{left:x,top:847,height:175,borderLeft:'1px solid #d8d8d8'}}/>)}
  {art('sei-hand',109,892,214,22)}
  {art('seid-hand',315,892,138,22)}
  {ln(524,897,100,13,'nicht so laut sein',{cls:D})}
  {ln(524,919,121,13,'Geschirr abtrocknen',{cls:D})}
  {ln(524,941,107,13,'Küche aufräumen',{cls:D})}
  {ln(524,964,117,13,'Musik leise machen',{cls:D})}
  {ln(524,986,152,13,'Schlüssel nicht vergessen',{cls:D})}
  {ln(524,1009,76,13,'Tisch decken',{cls:D})}
  {[916,938,961,983,1006].map((y,i)=><div key={'f5'+i}>{field('p73-5s'+i,112,y-6,200,'5 S '+(i+1),'naFieldBlank')}{field('p73-5p'+i,318,y-6,200,'5 P '+(i+1),'naFieldBlank')}</div>)}
  {check('g4',728,1004,{'p73-5s0':'Trockne bitte das Geschirr ab.','p73-5p0':'Trocknet bitte das Geschirr ab.','p73-5s1':'Räum bitte die Küche auf.','p73-5p1':'Räumt bitte die Küche auf.','p73-5s2':'Mach bitte die Musik leise.','p73-5p2':'Macht bitte die Musik leise.','p73-5s3':'Vergiss bitte den Schlüssel nicht.','p73-5p3':'Vergesst bitte den Schlüssel nicht.','p73-5s4':'Deck bitte den Tisch.','p73-5p4':'Deckt bitte den Tisch.'})}
  {<div style={{position:'absolute',left:60,top:1115,width:690,height:320,background:'#ffffff',border:'1.5px solid #d8d4c4'}}/>}
  {box('4',72,1123,'#c80e04')}
  {rn(106,1126,420,15,[{t:'Im Flugzeug. Schreiben Sie die S\u00e4tze.',b:1}],{fam:'fira'})}
  {ln(80,1176,95,13,'Handy benutzen',{c:'#3f4c75',cls:'naStrip73'})}
  {ln(80,1220,97,13,'Filme anschauen',{c:'#3f4c75',cls:'naStrip73'})}
  {ln(80,1264,44,13,'rauchen',{c:'#3f4c75',cls:'naStrip73'})}
  {ln(80,1308,68,13,'etwas essen',{c:'#3f4c75',cls:'naStrip73'})}
  {ln(80,1352,72,13,'Musik h\u00f6ren',{c:'#3f4c75',cls:'naStrip73'})}
  {field('p73-4a',215,1170,505,'4 Handy benutzen','naFieldBlank')}
  {field('p73-4b',215,1214,505,'4 Filme anschauen','naFieldBlank')}
  {field('p73-4c',215,1258,505,'4 rauchen','naFieldBlank')}
  {field('p73-4d',215,1302,505,'4 etwas essen','naFieldBlank')}
  {field('p73-4e',215,1346,505,'4 Musik hoeren','naFieldBlank')}
  {[1197,1241,1285,1329,1373].map(y=><div key={'r4'+y} className='naRule' style={{left:215,top:y,width:505,borderBottom:'1px solid #9aa4b5'}}/>)}
  {check('ex4',80,1392,{'p73-4a':'Im Flugzeug darf man das Handy nicht benutzen|Man darf im Flugzeug das Handy nicht benutzen','p73-4b':'Im Flugzeug kann man Filme anschauen|Man kann im Flugzeug Filme anschauen','p73-4c':'Im Flugzeug darf man nicht rauchen|Man darf im Flugzeug nicht rauchen','p73-4d':'Im Flugzeug kann man etwas essen|Man kann im Flugzeug etwas essen','p73-4e':'Im Flugzeug kann man Musik h\u00f6ren|Man kann im Flugzeug Musik h\u00f6ren'})}
  {modTab(758,1056,'Modul 7')}
  {wl(1063,12,[{x:614,w:93,t:'dreiundsiebzig'},{x:715,w:1,t:'|'},{x:728,w:11,t:'73'}])}
 </>}
function rect4(){return <div className='naStripBand73'/>}

export function NativeAB12P73({page}:{page:string}){
 if(page==='73')return <AB12Canvas page={page} width={810} height={1450}>{P73}</AB12Canvas>;
 return null;
}
