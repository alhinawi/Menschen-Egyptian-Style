import {AB12Canvas,AB12Helpers} from '../ab12-shared';
import './native-ab12-p66.css';

function P66(h:AB12Helpers){const {line:ln,runs:rn,wl,art,field,rule,dot,check,title,kb,side,audio,strike,head,foot,tab,modTab,box,rect,values,set}=h;return <>
  {rect(326,26,416,64,'#e3b0d5')}
  {rect(123,158,468,28,'#fbfbd3')}
  {rect(226,433,513,23,'#ebe7cb')}
  {[122,226,354,482,610,739].map(x=><div key={'tv'+x} className='naRule' style={{left:x,top:433,width:0,height:156,borderLeft:'1px solid #e4e6d8',borderBottom:'none'}}/>)}
  {[433,456,478,500,523,545,567,589].map(y=><div key={'th'+y} className='naRule' style={{left:122,top:y,width:617,borderBottom:'1px solid #eceee0'}}/>)}
  {rule(138,752,596)}
  {rule(137,801,597)}
  {rule(137,850,596)}
  {rule(137,899,596)}
  {rule(136,948,597)}
  {rule(136,996,597)}
  {art('hw1',242,197,97,26)}
  {art('hw2',136,683,206,23)}
  {art('photos',7,26,319,60)}
  {art('icon',718,46,23,28)}
  {art('signi',340,184,47,62)}
  {art('signs',574,220,125,190)}
  {wl(70,33,[{x:340,w:41,t:'Bei'},{x:391,w:45,t:'Rot'},{x:445,w:77,t:'musst'},{x:533,w:30,t:'du'},{x:576,w:97,t:'stehen,'},{x:686,w:26,t:'...'}])}
  {title('1',80,126,200,'Ergänzen Sie.','naTitleM')}
  {wl(175,15,[{x:130,w:31,t:'einen',c:'#3a5a94'},{x:167,w:28,t:'Helm',c:'#3a5a94'},{x:201,w:37,t:'tragen',c:'#3a5a94'},{x:243,w:1,t:'|',c:'#3a5a94'},{x:251,w:36,t:'Hunde',c:'#3a5a94'},{x:293,w:29,t:'nicht',c:'#3a5a94'},{x:328,w:62,t:'mitkommen',c:'#3a5a94'},{x:392,w:4,t:'|',c:'#3a5a94'},{x:403,w:99,t:'stehen bleiben',c:'#2f5da8',s:1},{x:505,w:3,t:'|',c:'#3a5a94'},{x:511,w:12,t:'zu',c:'#3a5a94'},{x:526,w:19,t:'Fuß',c:'#3a5a94'},{x:550,w:35,t:'gehen',c:'#3a5a94'}])}
  {wl(213,15,[{x:125,w:6,t:"a"},{x:144,w:27,t:"Hier"},{x:177,w:31,t:"muss"},{x:215,w:27,t:"man"}])}
  {wl(262,15,[{x:125,w:6,t:"b"},{x:144,w:27,t:"Hier"},{x:176,w:28,t:"darf"},{x:209,w:27,t:"man"},{x:243,w:22,t:"nur"}])}
  {wl(311,15,[{x:125,w:4,t:"c"},{x:143,w:103,t:"Motorradfahrer"},{x:252,w:48,t:"müssen"}])}
  {wl(359,15,[{x:124,w:6,t:"d"},{x:143,w:12,t:"In"},{x:161,w:19,t:"die"},{x:186,w:67,t:"Bibliothek"},{x:259,w:43,t:"dürfen"}])}
  {rn(112,405.9,559,18,[{t:"Ergänzen Sie die Tabelle. Hilfe finden Sie in "},{t:"1",b:1,c:'#1f408c'},{t:" und am Beispiel von können."}],{b:1,fam:'sans'})}
  {wl(451,17,[{x:233,w:46,t:'können'},{x:360,w:42,t:'wollen'},{x:489,w:46,t:'müssen'},{x:617,w:42,t:'dürfen'}])}
  {wl(472,15,[{x:130,w:16,t:"ich"},{x:233,w:28,t:"kann"},{x:361,w:21,t:"will"},{x:489,w:28,t:"muss"},{x:617,w:25,t:"darf"}])}
  {wl(494,15,[{x:129,w:14,t:"du"},{x:233,w:39,t:"kannst"},{x:360,w:32,t:"willst"},{x:489,w:34,t:"musst"}])}
  {wl(516,15,[{x:129,w:52,t:"er/es/sie"},{x:233,w:28,t:"kann"},{x:360,w:22,t:"will"}])}
  {wl(538,15,[{x:129,w:20,t:"wir"},{x:233,w:43,t:"können"},{x:360,w:39,t:"wollen"}])}
  {wl(561,15,[{x:130,w:16,t:"ihr"},{x:232,w:34,t:"könnt"},{x:360,w:29,t:"wollt"},{x:489,w:32,t:"müsst"}])}
  {wl(583,15,[{x:129,w:39,t:"sie/Sie"},{x:233,w:43,t:"können"},{x:360,w:38,t:"wollen"}])}
  {title('3',80,635,300,'Sortieren Sie die Sätze.','naTitleM')}
  {wl(681,15,[{x:122,w:5,t:'a'},{x:140,w:28,t:'darf'},{x:171,w:7,t:'/'},{x:182,w:47,t:'Warum'},{x:235,w:6,t:'/'},{x:246,w:27,t:'hier'},{x:277,w:7,t:'/'},{x:289,w:28,t:'man'},{x:318,w:7,t:'/'},{x:330,w:45,t:'grillen'},{x:382,w:6,t:'/'},{x:393,w:34,t:'nicht'}])}
  {wl(731,17,[{x:140,w:33,t:"nicht"},{x:178,w:7,t:"/"},{x:190,w:56,t:"Flugzeug"},{x:246,w:8,t:"/"},{x:264,w:16,t:"Im"},{x:286,w:6,t:"/"},{x:297,w:26,t:"darf"},{x:323,w:8,t:"/"},{x:340,w:53,t:"rauchen"},{x:399,w:6,t:"/"},{x:410,w:18,t:"ich"}])}
  {wl(779,17,[{x:140,w:66,t:"Radfahrer"},{x:211,w:6,t:"/"},{x:222,w:81,t:"Deutschland"},{x:309,w:6,t:"/"},{x:320,w:48,t:"Müssen"},{x:373,w:7,t:"/"},{x:385,w:11,t:"in"},{x:402,w:6,t:"/"},{x:413,w:37,t:"einen"},{x:456,w:33,t:"Helm"},{x:494,w:7,t:"/"},{x:506,w:42,t:"tragen"}])}
  {wl(827,15,[{x:138,w:22,t:"wir"},{x:165,w:6,t:"/"},{x:176,w:20,t:"See"},{x:202,w:6,t:"/"},{x:213,w:45,t:"Dürfen"},{x:263,w:7,t:"/"},{x:274,w:38,t:"baden"},{x:318,w:5,t:"/"},{x:329,w:16,t:"im"}])}
  {wl(876,15,[{x:138,w:37,t:"musst"},{x:181,w:6,t:"/"},{x:192,w:47,t:"Warum"},{x:245,w:6,t:"/"},{x:255,w:37,t:"heute"},{x:297,w:6,t:"/"},{x:308,w:14,t:"zu"},{x:327,w:6,t:"/"},{x:338,w:48,t:"bleiben"},{x:391,w:6,t:"/"},{x:403,w:38,t:"Hause"},{x:446,w:6,t:"/"},{x:457,w:15,t:"du"}])}
  {wl(925,15,[{x:138,w:37,t:"leider"},{x:180,w:6,t:"/"},{x:192,w:20,t:"Ihr"},{x:217,w:6,t:"/"},{x:228,w:32,t:"dürft"},{x:267,w:6,t:"/"},{x:278,w:34,t:"nicht"},{x:317,w:6,t:"/"},{x:328,w:39,t:"zelten"},{x:373,w:6,t:"/"},{x:385,w:25,t:"hier"}])}
  {wl(974,17,[{x:138,w:66,t:"Bibliothek"},{x:210,w:6,t:"/"},{x:222,w:31,t:"muss"},{x:258,w:7,t:"/"},{x:270,w:42,t:"Handy"},{x:317,w:6,t:"/"},{x:329,w:12,t:"In"},{x:347,w:6,t:"/"},{x:359,w:31,t:"mein"},{x:396,w:6,t:"/"},{x:407,w:21,t:"der"},{x:433,w:5,t:"/"},{x:444,w:73,t:"ausmachen"},{x:523,w:6,t:"/"},{x:534,w:18,t:"ich"}])}
  {wl(1060,12,[{x:68,w:13,t:"66"},{x:93,w:1,t:"|"},{x:108,w:97,t:"sechsundsechzig"}])}
  {kb(46,133,'KB 3')}
  {side(62,165,'WÖRTER')}
  {kb(46,408,'KB 3')}
  {box('2',80,403)}
  {side(62,420,'STRUKTUREN ENTDECKEN')}
  {kb(46,641,'KB 3')}
  {side(62,700,'STRUKTUREN')}
  {field('p66-1b',268,246,287,'1 b')}
  {field('p66-1c',327,295,259,'1 c')}
  {field('p66-1d',344,345,230,'1 d')}
  {([['p66-3b','b',138,739,587,15],['p66-3c','c',137,787,585,14],['p66-3d','d',137,835,585,15],['p66-3e','e',137,884,585,15],['p66-3f','f',136,933,587,15],['p66-3g','g',136,982,587,14]] as const).map(([id,lbl,x,y,w,hh])=>
    <input key={id} className='naField naFieldBlank naP66S' aria-label={'Satz '+lbl} data-native-field={id} style={{left:x,top:y,width:w,['--h' as any]:hh+'px'}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>
  )}
  {wl(752,15,[{x:731,w:5,t:'.'}])}
  {wl(801,15,[{x:730,w:7,t:'?'}])}
  {wl(850,15,[{x:730,w:7,t:'?'}])}
  {wl(899,15,[{x:729,w:7,t:'?'}])}
  {wl(948,15,[{x:731,w:5,t:'.'}])}
  {wl(996,15,[{x:731,w:5,t:'.'}])}
  {modTab(4,1047,'Modul 7')}
  {wl(731,15,[{x:122,w:5,t:'b'}])}
  {wl(779,15,[{x:122,w:5,t:'c'}])}
  {wl(827,15,[{x:122,w:6,t:'d'}])}
  {wl(876,15,[{x:122,w:6,t:'e'}])}
  {wl(925,15,[{x:122,w:5,t:'f'}])}
  {wl(974,15,[{x:122,w:6,t:'g'}])}
  {field('p66-2m3',488,502,117,'müssen er/es/sie')}
  {field('p66-2m4',488,524,117,'müssen wir')}
  {field('p66-2m6',488,569,117,'müssen sie/Sie')}
  {field('p66-2d2',616,479,119,'dürfen du')}
  {field('p66-2d3',616,502,119,'dürfen er/es/sie')}
  {field('p66-2d4',616,524,119,'dürfen wir')}
  {field('p66-2d5',616,546,119,'dürfen ihr')}
  {field('p66-2d6',616,569,119,'dürfen sie/Sie')}
  {check('g1',190,375,{'p66-1b':'zu Fuß gehen','p66-1c':'einen Helm tragen','p66-1d':'Hunde nicht mitkommen'})}
  {check('g2',129,604,{'p66-2m3':'muss','p66-2m4':'müssen','p66-2m6':'müssen','p66-2d2':'darfst','p66-2d3':'darf','p66-2d4':'dürfen','p66-2d5':'dürft','p66-2d6':'dürfen'})}
  {check('g3',220,1031,{'p66-3b':'Im Flugzeug darf ich nicht rauchen.','p66-3c':'Müssen Radfahrer in Deutschland einen Helm tragen?','p66-3d':'Dürfen wir im See baden?','p66-3e':'Warum musst du heute zu Hause bleiben?','p66-3f':'Ihr dürft hier leider nicht zelten.','p66-3g':'In der Bibliothek muss ich mein Handy ausmachen.'})}
</>}

export function NativeAB12P66to71({page}:{page:string}){
 if(page==='66')return <AB12Canvas page={page} width={807} height={1094}>{P66}</AB12Canvas>;
 return null;
}
