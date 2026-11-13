import {AB12Canvas,AB12Helpers} from '../ab12-shared';

function P67(h:AB12Helpers){const {line:ln,runs:rn,wl,art,field,rule,dot,check,title,kb,side,audio,strike,head,foot,tab,modTab,box,rect}=h;return <>
  {rect(271,82,464,3,'#953c54')}
  {rect(169,150,559,22,'#e9e7ce')}
  {[82,169,312,470,728].map(x=><div key={'tv'+x} className='naRule' style={{left:x,top:150,width:0,height:308,borderLeft:'1px solid #ecead9',borderBottom:'none'}}/>)}
  {[150,172,243,315,387,458].map(y=><div key={'th'+y} className='naRule' style={{left:82,top:y,width:646,borderBottom:'1px solid #e7e7cb'}}/>)}
  {[[166,615,76],[315,615,86],[166,634,86],[278,634,86],[165,654,87],[281,654,87],[166,673,86],[166,693,86]].map(([x,y,w])=><div key={'r'+y+x} className='naRule' style={{left:x,top:y,width:w,borderBottom:'1px solid #cacad6'}}/>)}
  {art('badge21',736,32,74,60)}
  {art('globe',48,145,26,25)}
  {art('sign1',98,182,56,58)}
  {art('sign2',98,253,56,58)}
  {art('sign3',98,324,56,58)}
  {art('sign4',98,396,56,58)}
  {art('hwgrillen',174,193,86,26)}
  {art('esign1',120,524,46,52)}
  {art('esign2',233,524,46,52)}
  {art('esign3',341,524,46,52)}
  {art('esign4',450,524,48,52)}
  {art('esign5',548,524,47,52)}
  {art('esign6',649,524,48,52)}
  {art('hwmuss',158,580,40,22)}
  {art('slasha',214,586,46,16)}
  {art('dots',45,747,54,20)}
  {art('sign6a',484,718,92,90)}
  {art('sign6b',604,718,92,90)}
  {art('circX',128,858,26,26)}
  {art('circO',210,858,26,26)}
  {wl(85,21,[{x:83,w:181,t:"BASISTRAINING"}])}
  {title('4',80,124,400,'Ergänzen und vergleichen Sie.','naTitleM')}
  {wl(168,15,[{x:175,w:50,t:'Deutsch'},{x:318,w:53,t:'Englisch'},{x:476,w:39,t:'Meine'},{x:520,w:49,t:'Sprache'},{x:574,w:27,t:'oder'},{x:606,w:42,t:'andere'},{x:654,w:57,t:'Sprachen'}])}
  {wl(215,12,[{x:319,w:66,t:"Barbecuing"},{x:390,w:44,t:"allowed"}])}
  {wl(286,12,[{x:319,w:45,t:"Parking"},{x:369,w:44,t:"allowed"}])}
  {wl(358,12,[{x:319,w:63,t:"Swimming"},{x:387,w:44,t:"allowed"}])}
  {wl(429,12,[{x:319,w:25,t:"Dogs"},{x:349,w:46,t:"allowed"}])}
  {title('5',80,493,520,'Ergänzen Sie müssen, dürfen oder nicht dürfen in der richtigen Form.','naTitleM')}
  {wl(595,15,[{x:115,w:6,t:'a'},{x:133,w:28,t:'Hier'},{x:194,w:27,t:'man'},{x:290,w:39,t:'rechts'},{x:335,w:61,t:'abbiegen.'}])}
  {wl(615,15,[{x:114,w:7,t:'b'},{x:133,w:28,t:'Hier'},{x:249,w:18,t:'ich'},{x:273,w:37,t:'leider'},{x:407,w:90,t:'fotografieren.'}])}
  {wl(634,15,[{x:115,w:5,t:'c'},{x:133,w:28,t:'Hier'},{x:258,w:14,t:'du'},{x:371,w:56,t:'rauchen.'}])}
  {wl(654,15,[{x:115,w:6,t:'d'},{x:134,w:27,t:'Hier'},{x:258,w:19,t:'ihr'},{x:375,w:47,t:'Fußball'},{x:428,w:50,t:'spielen.'}])}
  {wl(673,15,[{x:115,w:6,t:'e'},{x:133,w:28,t:'Hier'},{x:258,w:18,t:'Sie'},{x:374,w:22,t:'Rad'},{x:403,w:46,t:'fahren.'}])}
  {wl(693,15,[{x:115,w:4,t:'f'},{x:133,w:28,t:'Hier'},{x:258,w:21,t:'wir'},{x:376,w:65,t:'geradeaus'},{x:447,w:46,t:'fahren.'}])}
  {wl(741,15,[{x:116,w:43,t:'Malen'},{x:165,w:21,t:'Sie'},{x:191,w:60,t:'Schilder'},{x:257,w:32,t:'oder'},{x:295,w:51,t:'suchen'},{x:351,w:21,t:'Sie'}],{b:1})}
  {wl(761,15,[{x:115,w:60,t:'Schilder'},{x:181,w:17,t:'im'},{x:205,w:61,t:'Internet'},{x:273,w:25,t:'und'},{x:306,w:70,t:'schreiben'}],{b:1})}
  {wl(780,15,[{x:115,w:21,t:'Sie'},{x:142,w:47,t:'eigene'},{x:195,w:69,t:'Aufgaben'},{x:270,w:26,t:'wie'},{x:303,w:12,t:'in'},{x:322,w:11,t:'5.',c:'#1d3c7f'}],{b:1})}
  {wl(800,15,[{x:115,w:58,t:"Tauschen"},{x:180,w:18,t:"Sie"},{x:204,w:21,t:"mit"},{x:232,w:29,t:"Ihrer"},{x:268,w:60,t:"Partnerin"},{x:333,w:7,t:"/"},{x:346,w:36,t:"Ihrem"},{x:389,w:50,t:"Partner."}])}
  {title('7',80,835,300,'Was passt? Kreuzen Sie an.','naTitleM')}
  {wl(878,15,[{x:115,w:6,t:"a"},{x:154,w:45,t:"Kannst"},{x:238,w:36,t:"Müsst"},{x:293,w:15,t:"du"},{x:314,w:43,t:"Tennis"},{x:363,w:53,t:"spielen?"},{x:422,w:6,t:"-"},{x:432,w:17,t:"Ja,"},{x:456,w:27,t:"aber"},{x:488,w:19,t:"ich"},{x:546,w:31,t:"muss"},{x:616,w:27,t:"darf"}])}
  {wl(897,15,[{x:134,w:15,t:"im"},{x:156,w:53,t:"Moment"},{x:215,w:33,t:"nicht"},{x:254,w:50,t:"spielen."},{x:311,w:19,t:"Ich"},{x:337,w:29,t:"habe"},{x:372,w:60,t:"Probleme"},{x:438,w:21,t:"mit"},{x:466,w:52,t:"meinem"},{x:524,w:51,t:"Rücken."}])}
  {wl(917,15,[{x:115,w:7,t:"b"},{x:153,w:33,t:"Sollst"},{x:226,w:36,t:"Willst"},{x:282,w:15,t:"du"},{x:304,w:36,t:"heute"},{x:346,w:21,t:"mit"},{x:373,w:23,t:"mir"},{x:402,w:47,t:"Fußball"},{x:455,w:54,t:"spielen?"},{x:514,w:7,t:"-"},{x:527,w:34,t:"Nein,"},{x:567,w:19,t:"ich"},{x:593,w:28,t:"habe"},{x:628,w:36,t:"leider"},{x:671,w:34,t:"keine"}])}
  {wl(936,15,[{x:133,w:28,t:"Zeit."},{x:168,w:20,t:"Ich"},{x:226,w:26,t:"darf"},{x:291,w:32,t:"muss"},{x:342,w:58,t:"arbeiten."}])}
  {wl(955,15,[{x:115,w:6,t:"c"},{x:135,w:20,t:"Der"},{x:162,w:42,t:"Doktor"},{x:210,w:28,t:"sagt,"},{x:244,w:15,t:"du"},{x:298,w:36,t:"willst"},{x:373,w:33,t:"sollst"},{x:424,w:23,t:"viel"},{x:453,w:54,t:"trinken."},{x:512,w:8,t:"—"},{x:526,w:19,t:"Ich"},{x:552,w:29,t:"habe"},{x:586,w:28,t:"aber"},{x:620,w:43,t:"keinen"},{x:670,w:38,t:"Durst."}])}
  {wl(975,15,[{x:115,w:7,t:"d"},{x:153,w:25,t:"Will"},{x:218,w:28,t:"Darf"},{x:259,w:18,t:"ich"},{x:283,w:27,t:"hier"},{x:315,w:61,t:"rauchen?"},{x:381,w:7,t:"-"},{x:394,w:34,t:"Nein,"},{x:434,w:19,t:"tut"},{x:458,w:24,t:"mir"},{x:487,w:27,t:"leid."},{x:521,w:20,t:"Das"},{x:547,w:16,t:"ist"},{x:568,w:27,t:"hier"},{x:600,w:34,t:"nicht"},{x:639,w:51,t:"erlaubt."}])}
  {wl(995,15,[{x:116,w:5,t:"e"},{x:135,w:18,t:"Ich"},{x:192,w:27,t:"darf"},{x:257,w:32,t:"muss"},{x:303,w:35,t:"heute"},{x:344,w:30,t:"noch"},{x:382,w:90,t:"Hausaufgaben"},{x:479,w:54,t:"machen."}])}
  {wl(1014,15,[{x:154,w:38,t:"Darfst"},{x:232,w:44,t:"Kannst"},{x:295,w:16,t:"du"},{x:317,w:22,t:"mir"},{x:345,w:48,t:"helfen?"},{x:398,w:8,t:"—",bg:'#cec6d7'},{x:410,w:16,t:"Ja,"},{x:433,w:27,t:"kein"},{x:467,w:57,t:"Problem."}])}
  {wl(1062,12,[{x:604,w:105,t:"siebenundsechzig"},{x:721,w:1,t:"|"},{x:735,w:12,t:"67"}])}
  {kb(46,122,'KB 3')}
  {side(62,183,'WÖRTER')}
  {kb(46,492,'KB 4')}
  {side(62,526,'STRUKTUREN')}
  {kb(46,727,'KB 4')}
  {box('6',70,730)}
  {kb(46,834,'KB 4')}
  {side(62,855,'STRUKTUREN')}
  {wl(524,13,[{x:139,w:6,t:'a'}])}
  {wl(524,13,[{x:252,w:6,t:'b'}])}
  {wl(524,13,[{x:360,w:6,t:'c'}])}
  {wl(524,13,[{x:470,w:6,t:'d'}])}
  {wl(524,13,[{x:567,w:6,t:'e'}])}
  {wl(524,13,[{x:669,w:5,t:'f'}])}
  {field('p67-4bd',174,262,120,'4 b Deutsch','naFieldBlank')}
  {field('p67-4cd',174,333,120,'4 c Deutsch','naFieldBlank')}
  {field('p67-4dd',174,405,120,'4 d Deutsch','naFieldBlank')}
  {field('p67-4am',476,191,240,'4 a Meine Sprache','naFieldBlank')}
  {field('p67-4bm',476,262,240,'4 b Meine Sprache','naFieldBlank')}
  {field('p67-4cm',476,333,240,'4 c Meine Sprache','naFieldBlank')}
  {field('p67-4dm',476,405,240,'4 d Meine Sprache','naFieldBlank')}
  {field('p67-5b1',165,603,78,'5 b 1','naFieldBlank')}
  {field('p67-5b2',316,603,86,'5 b 2','naFieldBlank')}
  {field('p67-5c',165,622,85,'5 c','naFieldBlank')}
  {field('p67-5d1',165,641,85,'5 d 1','naFieldBlank')}
  {field('p67-5d2',290,641,78,'5 d 2','naFieldBlank')}
  {field('p67-5e',165,661,85,'5 e','naFieldBlank')}
  {field('p67-5f',165,681,80,'5 f','naFieldBlank')}
  {modTab(752,1051,'Modul 7')}
  {dot('7a','muss',526,867,'7a muss')}
  {dot('7a','darf',598,867,'7a darf')}
  {dot('7b1','Sollst',135,906,'7b1 Sollst')}
  {dot('7b1','Willst',208,906,'7b1 Willst')}
  {dot('7b2','darf',208,925,'7b2 darf')}
  {dot('7b2','muss',273,925,'7b2 muss')}
  {dot('7c','willst',279,945,'7c willst')}
  {dot('7c','sollst',357,945,'7c sollst')}
  {dot('7d','Will',135,965,'7d Will')}
  {dot('7d','Darf',201,965,'7d Darf')}
  {dot('7e1','darf',173,985,'7e1 darf')}
  {dot('7e1','muss',238,985,'7e1 muss')}
  {dot('7e2','Darfst',135,1005,'7e2 Darfst')}
  {dot('7e2','Kannst',211,1005,'7e2 Kannst')}
  {check('g1',510,683,{'p67-5b1':'darf','p67-5b2':'nicht','p67-5c':'darfst','p67-5d1':'dürft','p67-5d2':'nicht','p67-5e':'dürfen','p67-5f':'müssen'})}
  {check('g2',128,1032,{'7a':'darf','7b1':'Willst','7b2':'muss','7c':'sollst','7d':'Darf','7e1':'muss','7e2':'Kannst'})}
</>}

export function NativeAB12P67({page}:{page:string}){
 if(page==='67')return <AB12Canvas page={page} width={810} height={1095}>{P67}</AB12Canvas>;
 return null;
}
