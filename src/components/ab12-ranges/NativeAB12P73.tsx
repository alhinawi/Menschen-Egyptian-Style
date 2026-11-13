import {AB12Canvas,AB12Helpers} from '../ab12-shared';

const R1='KALDEVERGESSENFAGUERKENNENLÜTAGEFALLENEDERBEKOMMENZUTERVERSTEHEN';
const R2='REDASBEZAHLENZUTAS';
const FIXED=new Set([5,6,7,8,9,10,11,12,13]); // VERGESSEN printed example
const EXPECT=[20,21,22,23,24,25,30,31,32,33,34,35,36,37,42,43,44,45,46,47,48,49,56,57,58,59,60,61,62,63,69,70,71,72,73,74,75,76].join(',');
const gx=(i:number)=>Math.round(106+9.24*i);

function P73(h:AB12Helpers){const {line:ln,runs:rn,wl,art,field,check,box,modTab,values,set}=h;const D='naDroid73';
 const marked=new Set((values['p73-2-mark']||'').split(',').filter(Boolean).map(Number));
 const toggle=(i:number)=>{if(FIXED.has(i))return;const s=new Set(marked);if(s.has(i))s.delete(i);else s.add(i);set('p73-2-mark',[...s].sort((a,b)=>a-b).join(','))};
 const gridRow=(txt:string,off:number,y:number)=><>{[...txt].map((ch,k)=>{const i=off+k;const fx=FIXED.has(i);return <button key={i} className={'naGridL73'+(fx?' fix':(marked.has(i)?' mrk':''))} style={{left:gx(k),top:y,width:11,height:20,minWidth:0,minHeight:0,padding:0,lineHeight:'20px'}} aria-label={'2 Buchstabe '+(i+1)+' '+ch} onClick={()=>toggle(i)}>{ch}</button>})}</>;
 return <>
  {art('topbars',733,28,46,64)}
  {ln(73,59,584,25,'WIEDERHOLUNGSSTATION: GRAMMATIK',{cls:'naHdr73'})}
  {box('1',94,124,'#c80e04')}  {rn(125,126,306,15,[{t:'Ergänzen Sie haben oder sein im Präteritum.',b:1}],{fam:'fira'})}
  <div className='naPanel73'/>
  {art('scrollbar',644,158,15,134)}
  {ln(129,169,52,13,'Hallo Elly,',{cls:'naLetter73'})}
  {ln(129,186,87,13,"wie geht's Dir?",{cls:'naLetter73'})}
  {art('warst',213,184,34,15)}
  {ln(248,186,220,13,'(a) Du schon einmal in Graz? Jonas und ich',{cls:'naLetter73'})}
  {field('p73-1b',483,182,57,'1 b','naFieldBlank')}
  {ln(546,186,44,13,'(b) letzte',{cls:'naLetter73'})}
  {ln(129,203,94,13,'Woche in Graz. Es',{cls:'naLetter73'})}
  {field('p73-1c',228,197,57,'1 c','naFieldBlank')}
  {ln(291,203,98,13,'(c) wunderbar! Wir',{cls:'naLetter73'})}
  {field('p73-1d',394,197,56,'1 d','naFieldBlank')}
  {ln(456,203,169,13,'(d) auch immer schönes Wetter.',{cls:'naLetter73'})}
  {ln(129,220,318,13,'Am Mittwoch sind noch Mona und Tim gekommen und wir',{cls:'naLetter73'})}
  {field('p73-1e',458,214,57,'1 e','naFieldBlank')}
  {ln(521,220,78,13,'(e) so viel Spaß',{cls:'naLetter73'})}
  {ln(129,236,124,13,'zusammen. Am Freitag',{cls:'naLetter73'})}
  {field('p73-1f',258,230,54,'1 f','naFieldBlank')}
  {ln(318,236,285,13,'(f) ich den ganzen Tag allein mit Mona shoppen. Die',{cls:'naLetter73'})}
  {ln(129,252,41,13,'Männer',{cls:'naLetter73'})}
  {field('p73-1g',175,246,57,'1 g','naFieldBlank')}
  {ln(238,252,73,13,'(g) keine Lust.',{cls:'naLetter73'})}
  {art('smiley',314,251,17,14)}
  {ln(129,269,62,13,'Viele Grüße',{cls:'naLetter73'})}
  {ln(129,285,32,13,'Tanja',{cls:'naLetter73'})}
  {[[483,205,57],[228,222,57],[394,222,56],[458,239,57],[258,255,54],[175,265,57]].map(([x,y,w])=><div key={'u1'+x} className='naRule' style={{left:x,top:y,width:w,borderBottom:'1px solid #9aa4b5'}}/>)}
  {[[332,445,108],[285,464,107],[282,484,130],[349,503,111],[337,523,123]].map(([x,y,w])=><div key={'u2'+x} className='naRule' style={{left:x,top:y,width:w,borderBottom:'1px solid #9aa4b5'}}/>)}
  {check('g1',600,252,{'p73-1b':'waren','p73-1c':'war','p73-1d':'hatten','p73-1e':'hatten','p73-1f':'war','p73-1g':'hatten'})}
  {box('2',94,330,'#c80e04')}  {rn(125,332,600,15,[{t:'Markieren Sie die Verben und ergänzen Sie dann die Verben in der richtigen Form.',b:1}],{fam:'fira'})}
  {gridRow(R1,0,357)}
  {gridRow(R2,64,377)}
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
  {ln(108,572,8,13,'a',{cls:D})}{art('n3a',141,570,342,26)}
  {ln(108,592,8,13,'b',{cls:D})}{art('n3b',141,583,441,40)}
  {field('p73-3b',487,586,73,'3 b','naFieldBlank')}
  {ln(108,633,8,13,'c',{cls:D})}{art('n3c',141,629,434,18)}
  {field('p73-3c',385,625,93,'3 c','naFieldBlank')}
  {ln(108,653,8,13,'d',{cls:D})}{art('n3d',141,648,256,22)}
  {field('p73-3d',398,646,72,'3 d','naFieldBlank')}
  {ln(108,672,8,13,'e',{cls:D})}{art('n3e',142,663,546,23)}
  {field('p73-3e1',322,665,133,'3 e 1','naFieldBlank')}{field('p73-3e2',538,665,102,'3 e 2','naFieldBlank')}
  {check('g3',625,568,{'p73-3b':'sie','p73-3c':'ihn','p73-3d':'es','p73-3e1':'dich','p73-3e2':'ihn'})}
  {box('4',94,719,'#c80e04')}  {rn(125,721,545,15,[{t:'Im Flugzeug. Was darf man (nicht) / muss man / kann man? Schreiben Sie.',b:1}],{fam:'fira'})}
  {rect4()}
  <div style={{position:'absolute',left:333,top:748,width:102,height:19,background:'#f9f15e'}}/>
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
  {box('5',94,827,'#c80e04')}  {rn(125,829,300,15,[{t:'Schreiben Sie Sätze mit '},{t:'bitte',i:1},{t:' im Imperativ.',b:1}],{fam:'fira',b:1})}
  <div className='naBand73'/>
  {art('icon1',179,847,29,39)}
  {art('icons3',376,847,57,39)}
  {[885,915,937,959,981,1003,1022].map(y=><div key={'h5'+y} className='naRule' style={{left:108,top:y,width:612,borderBottom:'1px solid #d8d8d8'}}/>)}
  {[108,315,520,719].map(x=><div key={'v5'+x} className='naRule' style={{left:x,top:847,height:175,borderLeft:'1px solid #d8d8d8'}}/>)}
  {art('sei-hand',109,892,214,22)}
  {art('seid-hand',315,892,138,22)}
  {ln(524,897,116,13,'nicht so laut sein',{cls:D})}
  {ln(524,919,121,13,'Geschirr abtrocknen',{cls:D})}
  {ln(524,941,107,13,'Küche aufräumen',{cls:D})}
  {ln(524,964,117,13,'Musik leise machen',{cls:D})}
  {ln(524,986,152,13,'Schlüssel nicht vergessen',{cls:D})}
  {ln(524,1009,76,13,'Tisch decken',{cls:D})}
  {[916,938,961,983,1006].map((y,i)=><div key={'f5'+i}>{field('p73-5s'+i,112,y-6,200,'5 S '+(i+1),'naFieldBlank')}{field('p73-5p'+i,318,y-6,200,'5 P '+(i+1),'naFieldBlank')}</div>)}
  {check('g4',640,1024,{'p73-5s0':'Trockne bitte das Geschirr ab.','p73-5p0':'Trocknet bitte das Geschirr ab.','p73-5s1':'Räum bitte die Küche auf.','p73-5p1':'Räumt bitte die Küche auf.','p73-5s2':'Mach bitte die Musik leise.','p73-5p2':'Macht bitte die Musik leise.','p73-5s3':'Vergiss bitte den Schlüssel nicht.','p73-5p3':'Vergesst bitte den Schlüssel nicht.','p73-5s4':'Deck bitte den Tisch.','p73-5p4':'Deckt bitte den Tisch.'})}
  {modTab(758,1056,'Modul 7')}
  {wl(1063,12,[{x:614,w:93,t:'dreiundsiebzig'},{x:715,w:1,t:'|'},{x:728,w:11,t:'73'}])}
 </>}
function rect4(){return <div className='naStripBand73'/>}

export function NativeAB12P73({page}:{page:string}){
 if(page==='73')return <AB12Canvas page={page} width={810} height={1095}>{P73}</AB12Canvas>;
 return null;
}
