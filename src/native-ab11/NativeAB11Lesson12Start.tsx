import {PageImage} from '../components/PageImage';
import {usePageReset} from '../exercises/usePageReset';
import {useLayoutEffect,useRef,useState} from 'react';
import {scanData} from '../scan-data/registry';
import {CheckButton} from '../components/CheckButton';
import './native-ab11.css';
import './native-ab11-lessons45.css';
import './native-ab11-module4.css';
const norm=(s:string)=>s.normalize('NFC').toLocaleLowerCase('de').trim().replace(/[.,!?;:’']/g,'').replace(/\s+/g,' ');
function Words({s}:{s:string}){return <>{s.split(/(\s+)/).map((w,i)=>/\S/.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-phrase={s} data-word={w.replace(/^[.,!?„"()]+|[.,!?“"()]+$/g,'')}>{w}</span>:w)}</>}
export function NativeAB11Lesson12Start({page}:{page:string}){
 const host=useRef<HTMLDivElement>(null),audio=useRef<HTMLAudioElement>(null),[scale,SS]=useState(1),[track,T]=useState(''),[v,S]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem('native-ab11-'+page)||'{}')}catch{return {}}}),[graded,G]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const measure=()=>SS(Math.min(el.clientWidth/901,el.clientHeight/1275));measure();const ro=new ResizeObserver(measure);ro.observe(el);return()=>ro.disconnect()},[]);
 usePageReset(page,'native-ab11-'+page,()=>{S({});G({})});
 const set=(id:string,value:string)=>{const next={...v,[id]:value};S(next);localStorage.setItem('native-ab11-'+page,JSON.stringify(next));G({})};
 const Y=(y:number)=>(y/0.7266-66)*0.7713;
 const txt=(x:number,y:number,w:number,s:string,cls='')=><div className={'mText '+cls} style={{left:x,top:Y(y),width:w}}><Words s={s}/></div>;
 const f=(id:string,x:number,y:number,w:number,label=id)=>{const ctx=document.createElement('canvas').getContext('2d');if(ctx)ctx.font="16px 'Times New Roman'";const size=Math.max(10,Math.min(16,16*(w-6)/(ctx?.measureText(v[id]||'').width||1)));return <input className="mField" data-native-field={id} aria-label={label} style={{left:x,top:Y(y),width:w,fontSize:size}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>};
 const open=(id:string,x:number,y:number,w:number,h:number,label=id)=><textarea className="mField mOpen" data-native-field={id} aria-label={label} style={{left:x,top:Y(y),width:w,'--mopen-height':Y(y+h)-Y(y)+'px'} as React.CSSProperties} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="mArt" alt={'Originalabbildung '+name} src={`assets/native-ab11/p${page}-${name}.png`} style={{left:x,top:Y(y),width:w,height:Y(y+h)-Y(y)}}/>;
 const data90=scanData['ab-a11:90'];
 const ans90=(group:string)=>Object.fromEntries((data90?.fields||[]).filter(fl=>fl.group===group&&fl.kind!=='radio'&&fl.kind!=='checkbox'&&fl.answer!==undefined).map(fl=>[fl.id,fl.answer!]));
 const XS=(x:number)=>x*0.7266,YS=(y:number)=>(y-78)*0.7718;
 const tS=(x:number,y:number,w:number,s:string,cls='')=><div className={'mText '+cls} style={{left:XS(x),top:YS(y),width:w}}><Words s={s}/></div>;
 const fS=(id:string,x:number,y:number,w:number,label=id)=>{const ctx=document.createElement('canvas').getContext('2d');if(ctx)ctx.font="16px 'Times New Roman'";const size=Math.max(10,Math.min(16,16*(w*0.7266-6)/(ctx?.measureText(v[id]||'').width||1)));return <input className="mField" data-native-field={id} aria-label={label} style={{left:XS(x),top:YS(y),width:w*0.7266,fontSize:size}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>};
 const oS=(id:string,x:number,y:number,w:number,lines:number,label=id)=><textarea className="mField mOpen" data-native-field={id} aria-label={label} style={{left:XS(x),top:YS(y),width:w*0.7266,'--mopen-height':lines*19+'px'} as React.CSSProperties} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const aS=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="mArt" alt={'Originalabbildung '+name} src={`assets/native-ab11/p${page}-${name}.png`} style={{left:XS(x),top:YS(y),width:w*0.7266,height:h*0.7718}}/>;
 const rS=(fid:string,group:string,val:string,x:number,y:number,label:string)=><input className="mRadio" data-native-radio={fid} type="radio" name={'native-ab11-'+page+'-'+group} aria-label={label} style={{left:XS(x),top:YS(y)}} checked={v[group]===val} onChange={()=>set(group,val)}/>;
 const checkS=(id:string,x:number,y:number,expected=ans90(id))=><div className="mCheck" data-native-task={id} style={{left:XS(x),top:YS(y)}}><CheckButton onClick={()=>G({...graded,[id]:Object.entries(expected).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}/><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const ruleS=(id:string,x:number,y:number,test:()=>boolean)=><div className="mCheck" data-native-task={id} style={{left:XS(x),top:YS(y)}}><CheckButton onClick={()=>G({...graded,[id]:test()})}/><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const listenS=(n:string,x:number,y:number)=><button className="mPlay" aria-label={'Originalaudio 1 '+n} style={{left:XS(x),top:YS(y)}} onClick={()=>{T(n);if(audio.current){audio.current.src='assets/ab-cd1-track'+parseInt(n)+'.mp3';audio.current.play().catch(()=>{})}}}>▶ 1 {n}</button>;
 const title=(n:string,y:number,s:string)=><><div className="mNumber" style={{left:132,top:Y(y)}}>{n}</div>{txt(167,y,620,s,'mTitle')}</>;
 const head=(s:string)=><>{txt(137,130,740,s,'mHeader')}<div className="mRule4"/></>;
 return <div className="nativeAB11 nativeAB11Module1 nativeAB11Lessons45 nativeAB11Next45 nativeAB11Lesson12Start" ref={host} data-native-ab11-page={page}><div className="nabCanvas mCanvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='89'&&<>
 {head('LERNWORTSCHATZ')}<div className="mModuleChip">11</div>{art('strip',785,156,116,1008)}
 {title('1',183,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.')}
 {txt(169,225,140,'Mein Tag','mVocabHead')}{txt(490,225,290,'Weitere wichtige Wörter','mVocabHead')}
 {txt(169,246,140,'Arbeit die, -en','mVocabText')}{f('v1-arbeit',307,241,157,'Übersetzung Arbeit')}
 {txt(169,267,140,'Hausaufgabe\n   (machen) die, -n','mVocabText')}{f('v1-hausaufgabe',307,283,157,'Übersetzung Hausaufgabe')}
 {txt(169,308,140,'Pause (machen)\n   die, -n','mVocabText')}{f('v1-pause',307,326,157,'Übersetzung Pause')}
 {txt(169,352,140,'Zeitung die, -en','mVocabText')}{f('v1-zeitung',307,347,157,'Übersetzung Zeitung')}
 {txt(169,384,140,'auf·räumen, hat\n   aufgeräumt','mVocabText')}{f('v1-aufraeumen',307,400,157,'Übersetzung aufräumen')}
 {txt(169,426,140,'ein·laden, du\n   lädst ein, er lädt ein, hat eingeladen','mVocabText')}{f('v1-einladen',307,421,157,'Übersetzung einladen')}
 {txt(169,468,140,'kaufen, hat\n   gekauft','mVocabText')}{f('v1-kaufen',307,485,157,'Übersetzung kaufen')}
 {txt(169,511,140,'lachen, hat\n   gelacht','mVocabText')}{f('v1-lachen',307,527,157,'Übersetzung lachen')}
 {txt(169,553,140,'lernen, hat\n   gelernt','mVocabText')}{f('v1-lernen',307,570,157,'Übersetzung lernen')}
 {txt(169,596,140,'reden, hat geredet','mVocabText')}{f('v1-reden',307,590,157,'Übersetzung reden')}
 {txt(169,621,140,'schlafen,\n   du schläfst, er schläft, hat geschlafen','mVocabText')}{f('v1-schlafen',307,612,157,'Übersetzung schlafen')}
 {txt(169,670,140,'täglich','mVocabText')}{f('v1-taeglich',307,665,157,'Übersetzung täglich')}
 {txt(169,692,140,'ab','mVocabText')}{f('v1-ab',307,697,157,'Übersetzung ab')}
 {txt(169,714,140,'von … bis','mVocabText')}{f('v1-vonbis',307,718,157,'Übersetzung von bis')}
 {txt(490,246,120,'Baby das, -s','mVocabText')}{f('v2-baby',607,241,160,'Übersetzung Baby')}
 {txt(490,267,120,'Fahrrad\n   (fahren) das, -er\n   CH: Velo, das -s','mVocabText')}{f('v2-fahrrad',607,262,160,'Übersetzung Fahrrad')}
 {txt(490,331,120,'Geschenk das, -e','mVocabText')}{f('v2-geschenk',607,327,160,'Übersetzung Geschenk')}
 {txt(490,352,120,'Monat der, -e','mVocabText')}{f('v2-monat',607,348,160,'Übersetzung Monat')}
 {txt(490,373,120,'Paar das, -e','mVocabText')}{f('v2-paar',607,369,160,'Übersetzung Paar')}
 {txt(490,395,120,'Party die, -s','mVocabText')}{f('v2-party',607,390,160,'Übersetzung Party')}
 {txt(490,416,120,'Reise die, -n\n   (Dienstreise/Privatreise)','mVocabText')}{f('v2-reise',607,412,160,'Übersetzung Reise')}
 {txt(490,459,120,'Sport der','mVocabText')}{f('v2-sport',607,453,160,'Übersetzung Sport')}
 {txt(490,479,120,'Wein der, -e','mVocabText')}{f('v2-wein',607,475,160,'Übersetzung Wein')}
 {txt(490,511,120,'denken, hat\n   gedacht','mVocabText')}{f('v2-denken',607,527,160,'Übersetzung denken')}
 {txt(490,553,120,'meinen, hat\n   gemeint','mVocabText')}{f('v2-meinen',607,570,160,'Übersetzung meinen')}
 {txt(490,607,120,'fertig (sein)','mVocabText')}{f('v2-fertig',607,602,160,'Übersetzung fertig')}
 {txt(490,628,120,'interessant','mVocabText')}{f('v2-interessant',607,623,160,'Übersetzung interessant')}
 {txt(490,650,120,'lange','mVocabText')}{f('v2-lange',607,645,160,'Übersetzung lange')}
 {txt(490,670,120,'langweilig','mVocabText')}{f('v2-langweilig',607,665,160,'Übersetzung langweilig')}
 {txt(490,692,120,'letzt- (letzten\n   Freitag /\n   letztes Jahr /\n   letzte Woche)','mVocabText')}{f('v2-letzt1',607,687,160,'Übersetzung letzt- letzten Freitag')}{f('v2-letzt2',607,729,160,'Übersetzung letztes Jahr')}{f('v2-letzt3',607,751,160,'Übersetzung letzte Woche')}
 {txt(490,782,120,'schwanger','mVocabText')}{f('v2-schwanger',607,772,160,'Übersetzung schwanger')}
 {txt(490,808,120,'für','mVocabText')}{f('v2-fuer',607,803,160,'Übersetzung für')}
 {txt(490,833,120,'… mal (zwei-/\n   drei-/viermal)','mVocabText')}{f('v2-mal',607,846,160,'Übersetzung mal')}
 {txt(490,890,120,'Wirklich?','mVocabText')}{f('v2-wirklich',607,878,160,'Übersetzung Wirklich')}
 <div className="mTippTab">TIPP</div><div className="mTippRule"/>
 {txt(198,808,290,'Schreiben Sie Sätze.\nBenutzen Sie neue\nund alte Wörter.','mTippText')}
 {txt(309,865,250,'Ich habe mein\nZimmer aufgeräumt.','mExample')}
 {txt(413,928,250,'Die Party ist\nlangweilig.','mExample')}
 {title('2',1013,'Welche Wörter möchten Sie noch lernen? Notieren Sie.')}
 {open('eigene-woerter',167,1048,600,126,'Eigene Wörter notieren')}
 </>}
 {page==='89'&&<>{txt(560,1203,185,'neunundachtzig | 89','mFooter')}<div className="mModulFooter">Modul 4</div></>}
 {page==='90'&&<>
 {aS('hero',63,93,382,89)}<div className="mL12Bars"/><div className="mL12Banner"/>
 {tS(560,150,330,'Was ist denn hier passiert?','mL12Name')}
 <div className="mSideLbl" style={{left:XS(155),top:YS(389)}}>Wörter</div>
 <div className="mSideLbl" style={{left:XS(150),top:YS(1230)}}>Hören</div>
 {tS(144,306,45,'KB 3','mKB')}
 <div className="mNumber mNum12" style={{left:XS(187),top:YS(291)}}>1</div>{tS(236,290,290,'Monate und Jahreszeiten','mTitle')}
 {tS(199,348,20,'a','mBlue')}{tS(238,336,610,'Ergänzen und vergleichen Sie. Ordnen Sie dann die Bilder zu.','mInstr')}
 {aS('icon-globe',135,332,41,38)}
 {aS('photo1',238,373,194,149)}{aS('photo2',446,373,248,149)}{aS('photo3',702,373,230,149)}{aS('photo4',940,373,223,149)}
 <div className="mTableHead90"/><div className='mGridV90' style={{left:XS(239),top:YS(546),height:296}}/><div className='mGridV90' style={{left:XS(703),top:YS(546),height:296}}/><div className='mGridV90' style={{left:XS(963),top:YS(546),height:296}}/><div className='mGridH90' style={{left:XS(150),top:YS(655),width:734}}/><div className='mGridH90' style={{left:XS(150),top:YS(681),width:734}}/><div className='mGridH90' style={{left:XS(150),top:YS(714),width:734}}/><div className='mGridH90' style={{left:XS(150),top:YS(740),width:734}}/><div className='mGridH90' style={{left:XS(150),top:YS(773),width:734}}/><div className='mGridH90' style={{left:XS(150),top:YS(798),width:734}}/><div className='mGridH90' style={{left:XS(150),top:YS(823),width:734}}/><div className='mGridH90' style={{left:XS(150),top:YS(857),width:734}}/><div className='mGridH90' style={{left:XS(150),top:YS(882),width:734}}/><div className='mGridH90' style={{left:XS(150),top:YS(907),width:734}}/>
 {tS(247,556,50,'Foto','mVocabHead')}{tS(305,553,190,'Deutsch','mVocabHead')}{tS(716,550,110,'Englisch','mVocabHead')}{tS(971,546,190,'Meine Sprache oder','mVocabHead')}{tS(971,571,190,'andere Sprachen','mVocabHead')}
 {tS(248,612,20,'4','mExample')}{tS(306,608,110,'Winter')}{tS(495,614,60,'Januar,')}
 {tS(496,641,15,'F')}{fS('u1-w-feb',516,633,132,'Winter Februar')}{tS(653,641,12,',')}
 {tS(496,667,15,'M')}{fS('u1-w-mae',516,659,82,'Winter März')}
 {tS(716,611,100,'winter')}{tS(827,611,140,'January, Feb-')}{tS(827,633,140,'ruary, March')}
 {fS('u1-f2',242,700,55,'Foto Frühling')}{tS(302,702,15,'F')}{fS('u1-fr',318,694,150,'Jahreszeit Frühling')}
 {fS('u1-fr1',500,692,80,'Frühling April')}{tS(581,700,12,',')}{fS('u1-fr2',588,692,85,'Frühling Mai')}{tS(674,700,12,',')}{fS('u1-fr3',504,718,100,'Frühling Juni')}
 {tS(716,692,100,'spring')}{tS(827,692,140,'April, May,')}{tS(828,720,60,'June')}
 {fS('u1-f3',242,764,55,'Foto Sommer')}{fS('u1-so',311,753,135,'Jahreszeit Sommer')}
 {fS('u1-so1',500,751,55,'Sommer Juli')}{tS(556,759,12,',')}{fS('u1-so2',500,776,125,'Sommer August')}{tS(626,784,12,',')}{fS('u1-so3',500,801,200,'Sommer September')}
 {tS(716,752,100,'summer')}{tS(827,752,140,'July, August,')}{tS(830,776,120,'September')}
 {fS('u1-f4',242,848,55,'Foto Herbst')}{fS('u1-he',311,837,135,'Jahreszeit Herbst')}
 {fS('u1-he1',500,835,140,'Herbst Oktober')}{tS(641,843,12,',')}{fS('u1-he2',500,860,150,'Herbst November')}{tS(651,868,12,',')}{fS('u1-he3',500,885,160,'Herbst Dezember')}
 {tS(719,836,100,'autumn')}{tS(830,836,110,'October,')}{tS(831,860,120,'November,')}{tS(832,886,120,'December')}
 {fS('u1-ms1',975,659,180,'Meine Sprache Winter')}{fS('u1-ms2',975,718,180,'Meine Sprache Frühling')}{fS('u1-ms3',975,802,180,'Meine Sprache Sommer')}{fS('u1-ms4',975,886,180,'Meine Sprache Herbst')}
 {tS(207,954,20,'b','mBlue')}{tS(245,946,420,'Welche Jahreszeit, welcher Monat ist das?','mInstr')}
 {aS('fruehling',230,988,192,84)}
 {aS('striche',510,975,510,65)}{fS('u1b-1',520,988,100,'b Monat April')}{fS('u1b-2',700,988,90,'b Monat Mai')}{fS('u1b-3',890,988,125,'b Jahreszeit Sommer')}
 {tS(208,1106,20,'c','mBlue')}{tS(245,1087,860,'Machen Sie eigene Aufgaben wie in b und tauschen Sie mit Ihrer Partnerin / Ihrem Partner.','mInstr')}
 {aS('icon-partner',115,1075,70,47)}
 {checkS('u1',1120,1122)}
 <div className="mNumber mNum12" style={{left:XS(197),top:YS(1170)}}>2</div>{tS(242,1170,320,'Jahreszahlen und Monate','mTitle')}
 {tS(153,1181,45,'KB 3','mKB')}
 {listenS('51',142,1214)}
 {tS(209,1223,20,'a','mBlue')}{tS(246,1216,700,'Welche Jahreszahlen hören Sie? Kreuzen Sie an. Wie heißt das Lösungswort?','mInstr')}
 {tS(246,1255,15,'a','mSans')}{tS(291,1259,32,'(H)','mOptCode')}{rS('u2a-a1','u2a-a','H',330,1258,'a H 1789')}{tS(358,1256,42,'1789','mSans')}{tS(436,1259,32,'(S)','mOptCode')}{rS('u2a-a2','u2a-a','S',472,1258,'a S 1798')}{tS(498,1256,42,'1798','mSans')}
 {tS(246,1286,15,'b','mSans')}{tS(291,1289,32,'(O)','mOptCode')}{rS('u2a-b1','u2a-b','O',330,1288,'b O 2017')}{tS(356,1286,42,'2017','mSans')}{tS(437,1289,32,'(E)','mOptCode')}{rS('u2a-b2','u2a-b','E',472,1288,'b E 2170')}{tS(500,1286,42,'2170','mSans')}
 {tS(246,1316,15,'c','mSans')}{tS(292,1319,36,'(M)','mOptCode')}{rS('u2a-c1','u2a-c','M',330,1318,'c M 1980')}{tS(356,1316,42,'1980','mSans')}{tS(437,1319,32,'(R)','mOptCode')}{rS('u2a-c2','u2a-c','R',472,1318,'c R 1918')}{tS(500,1316,42,'1918','mSans')}
 {tS(246,1346,15,'d','mSans')}{tS(292,1349,32,'(B)','mOptCode')}{rS('u2a-d1','u2a-d','B',330,1347,'d B 1576')}{tS(355,1346,42,'1576','mSans')}{tS(437,1349,32,'(P)','mOptCode')}{rS('u2a-d2','u2a-d','P',472,1347,'d P 1376')}{tS(500,1346,42,'1376','mSans')}
 {tS(688,1259,15,'e','mSans')}{tS(724,1256,32,'(E)','mOptCode')}{rS('u2a-e1','u2a-e','E',758,1255,'e E 2011')}{tS(788,1253,42,'2011','mSans')}{tS(873,1256,32,'(S)','mOptCode')}{rS('u2a-e2','u2a-e','S',906,1255,'e S 2001')}{tS(936,1253,42,'2001','mSans')}
 {tS(688,1282,15,'f','mSans')}{tS(724,1286,32,'(T)','mOptCode')}{rS('u2a-f1','u2a-f','T',758,1285,'f T 313')}{tS(788,1283,42,'313','mSans')}{tS(873,1286,32,'(K)','mOptCode')}{rS('u2a-f2','u2a-f','K',910,1285,'f K 333')}{tS(929,1283,42,'333','mSans')}
 {tS(689,1328,130,'Lösungswort:')}{fS('u2a-lw',838,1329,160,'Lösungswort')}
 {listenS('52',142,1398)}
 {tS(212,1407,20,'b','mBlue')}{tS(246,1396,700,'Wie heißt die Jahreszahl? Lesen Sie laut. Hören und vergleichen Sie dann.','mInstr')}
 {tS(248,1449,15,'a','mSans')}{tS(272,1449,45,'2054','mSans')}{tS(340,1449,15,'b','mSans')}{tS(360,1449,45,'1255','mSans')}{tS(454,1449,15,'c','mSans')}{tS(477,1449,45,'1966','mSans')}{tS(562,1449,15,'d','mSans')}{tS(588,1449,45,'1832','mSans')}{tS(678,1449,15,'e','mSans')}{tS(702,1449,45,'2001','mSans')}
 {tS(212,1514,20,'c','mBlue')}{tS(248,1505,400,'Wann haben die Personen Geburtstag?','mInstr')}
 {aS('hanne',672,1498,226,36)}
 {aS('bernd',672,1522,138,42)}{fS('u2c-1',826,1542,253,'Bernd Monat')}
 {aS('sabine',672,1548,138,46)}{fS('u2c-2',826,1568,253,'Sabine Monat')}
 {aS('florian',672,1578,143,46)}{fS('u2c-3',826,1600,253,'Florian Monat')}
 {ruleS('u2',1095,1592,()=>v['u2a-a']==='H'&&v['u2a-b']==='E'&&v['u2a-c']==='R'&&v['u2a-d']==='B'&&v['u2a-e']==='S'&&v['u2a-f']==='T'&&norm(v['u2a-lw']||'')==='herbst'&&['u2c-1','u2c-2','u2c-3'].every(k=>ans90('u2')[k].split('|').some(s=>norm(s)===norm(v[k]||''))))}
 {tS(174,1669,30,'90','mFooterL')}{tS(212,1669,10,'|','mFooterL')}{tS(234,1669,80,'neunzig','mFooterL')}<div className="mModulFooterL">Modul 4</div>
 </>}
 </div><audio className="nabPlayer" ref={audio} controls hidden={!track} aria-label="Originalaudio Arbeitsbuch"/></div>;
}
