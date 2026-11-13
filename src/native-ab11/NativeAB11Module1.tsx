import {CheckButton} from '../components/CheckButton';
import {PageImage} from '../components/PageImage';
import {usePageReset} from '../exercises/usePageReset';
import {useLayoutEffect,useRef,useState} from 'react';
import {scanData} from '../scan-data/registry';
import './native-ab11.css';
import './native-ab11-module1.css';
const norm=(s:string)=>s.normalize('NFC').toLocaleLowerCase('de').trim().replace(/[.,!?;:’']/g,'').replace(/\s+/g,' ');
function Words({s}:{s:string}){return <>{s.split(/(\s+)/).map((w,i)=>/\S/.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-phrase={s} data-word={w.replace(/^[.,!?„"()]+|[.,!?“"()]+$/g,'')}>{w}</span>:w)}</>}
const grid=['HSMHEDSWI','RALASJPOB','MVEBEORHH','ARBEITENE','CHENNKCEI','HUNCMOHNS','EICFPMEAS','NABIGMNIE','STUDIEREN','PRATRNULG'];
const gridWords:Record<string,number[]>={SEIN:[1,4,4,4],MACHEN:[2,0,7,0],HABEN:[0,3,4,3],LEBEN:[1,2,5,2],ARBEITEN:[3,0,3,7],KOMMEN:[4,5,9,5],SPRECHEN:[0,6,7,6],WOHNEN:[0,7,5,7],HEISSEN:[2,8,8,8],STUDIEREN:[8,0,8,8]};
export function NativeAB11Module1({page}:{page:string}){
 const host=useRef<HTMLDivElement>(null),audio=useRef<HTMLAudioElement>(null),[scale,SS]=useState(1),[track,T]=useState(''),[v,S]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem('native-ab11-'+page)||'{}')}catch{return {}}}),[graded,G]=useState<Record<string,boolean>>({}),[start,ST]=useState<number[]|null>(null);
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const measure=()=>SS(Math.min(el.clientWidth/901,el.clientHeight/1275));measure();const ro=new ResizeObserver(measure);ro.observe(el);return()=>ro.disconnect()},[]);
 usePageReset(page,'native-ab11-'+page,()=>{S({});G({})});
 const set=(id:string,value:string)=>{const next={...v,[id]:value};S(next);localStorage.setItem('native-ab11-'+page,JSON.stringify(next));G({})};
 const sy=page==='20'||page==='22'?.87:page==='24'?.86:page==='25'?.76:page==='26'?.8:page==='27'?.78:1;const Y=(y:number)=>130+(y-130)*sy;
 const txt=(x:number,y:number,w:number,s:string,cls='')=><div className={'mText '+cls} style={{left:x,top:cls==='mFooter'?y:Y(y),width:w}}><Words s={s}/></div>;
 const f=(id:string,x:number,y:number,w:number,label=id)=>{const ctx=document.createElement('canvas').getContext('2d');if(ctx)ctx.font="18px 'Times New Roman'";const size=Math.max(10,Math.min(18,18*(w-5)/(ctx?.measureText(v[id]||'').width||1)));return <input className="mField" data-native-field={id} aria-label={label} style={{left:x,top:Y(y),width:w,height:22*sy,fontSize:size}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>};
 const open=(id:string,x:number,y:number,w:number,h:number,label=id)=><textarea className="mField mOpen" data-native-field={id} aria-label={label} style={{left:x,top:Y(y),width:w,height:h*sy,'--mopen-height':h*sy+'px'} as React.CSSProperties} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="mArt" alt={'Originalabbildung '+name} src={`assets/native-ab11/p${page}-${name}.png`} style={{left:x,top:Y(y),width:w,height:h*sy}}/>;
 const title=(n:string,y:number,s:string,kb='',x=132,w=700)=><>{kb&&txt(96,y+5,34,kb,'mKB')}<div className={'mNumber '+(Number(page)>=24?'red':'')} style={{left:x,top:Y(y)}}>{n}</div>{txt(x+35,y,w-35,s,'mTitle')}</>;
 const head=(s:string)=><>{txt(132,135,740,s,'mHeader')}<div className="mRule"/></>;
 const data=scanData['ab-a11:'+page];
 const answers=(group:string)=>Object.fromEntries(data.fields.filter(f=>f.group===group&&f.kind!=='radio'&&f.kind!=='checkbox'&&f.answer!==undefined).map(f=>[f.id,f.answer!]));
 const check=(id:string,x:number,y:number,expected=answers(id))=><div className="mCheck" data-native-task={id} style={{left:x,top:Y(y)}}><CheckButton onClick={()=>G({...graded,[id]:Object.entries(expected).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}></CheckButton><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const rule=(id:string,x:number,y:number,test:()=>boolean)=><div className="mCheck" data-native-task={id} style={{left:x,top:Y(y)}}><CheckButton onClick={()=>G({...graded,[id]:test()})}></CheckButton><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const listen=(n:string,x:number,y:number)=><button className="mListen" aria-label={'Originalaudio 1 '+n} style={{left:x,top:Y(y)}} onClick={()=>{T(n);if(audio.current){audio.current.src='assets/ab-cd1-track'+n+'.mp3';audio.current.play().catch(()=>{})}}}>▶ 1 {n}</button>;
 const arrow=(id:string,x:number,y:number)=><button className="mArrow" data-native-field={id} aria-label={'Satzmelodie '+id} style={{left:x,top:Y(y)}} onClick={()=>set(id,v[id]==='↗'?'↘':'↗')}>{v[id]||' '}</button>;
 const radio=(id:string,val:string,x:number,y:number,label:string)=><input className="mRadio" type="radio" name={'native-ab11-'+page+'-'+id} aria-label={label} style={{left:x,top:Y(y)}} checked={v[id]===val} onChange={()=>set(id,val)}/>;
 const confidence=(id:string,y:number)=><>{[0,1,2].map((c)=><span key={c}>{radio('confidence-'+id,''+c,753+c*32,y,'Selbsteinschätzung '+id+' '+['grün','gelb','rot'][c])}</span>)}</>;
 const lights=(y:number)=><>{['#41a700','#edcf00','#e4310c'].map((c,i)=><i className="mLight" key={c} style={{left:753+i*32,top:Y(y),background:c}}/>)}</>;
 const score=(y:number,rows:string[][])=><div className="mScore" style={{left:168,top:Y(y)}}><b>Wörter</b><b>Strukturen</b><b>Kommunikation</b>{rows.map((row,r)=>row.map((s,c)=><div key={r+'-'+c}><i style={{background:['#d71910','#edcf00','#3b9e24'][r]}}/>{s} Punkte</div>))}</div>;
 const highlight=(id:string,x:number,y:number,words:string[],label=id)=><div className="mHighlight" style={{left:x,top:Y(y)}}>{words.map((w,i)=><span key={w}><button aria-label={label+' '+w} className={v[id]===w?'marked':''} onClick={()=>set(id,w)}>{w}</button>{i<words.length-1?'/':''}</span>)}</div>;
 const inlineChoice=(n:number,words:string[])=> <span className="mInlineChoice">{words.map((w,i)=><span key={w}><button aria-label={'u4-'+n+' '+w} className={v['u4-'+n]===w?'marked':''} onClick={()=>set('u4-'+n,w)}>{w}</button>{i===0?'/':''}</span>)}</span>;
 const cell=(id:string,x:number,y:number,length:number,offset:number)=> <div className="mCrossRow" style={{left:x,top:Y(y)}}>{Array.from({length},(_,i)=><input key={i} aria-label={id+' Buchstabe '+(i+1)} data-crossword={id+'-'+i} maxLength={1} className={i===offset?'solution':''} value={(v[id]||'')[i]?.trim()||''} onChange={e=>{const a=(v[id]||' '.repeat(length)).padEnd(length,' ').split('');a[i]=e.target.value.toLocaleUpperCase('de');set(id,a.join(''));if(e.target.value)(e.currentTarget.nextElementSibling as HTMLInputElement)?.focus()}}/>)}</div>;
 return <div className="nativeAB11 nativeAB11Module1" ref={host} data-native-ab11-page={page}><div className="nabCanvas mCanvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='20'&&<>
 {head('BASISTRAINING')}{title('11',200,'Meine Familie. Ergänzen Sie den Stammbaum\nund schreiben Sie einen Text wie in 10.','KB 7',132,425)}
 {txt(164,251,390,'Mein Bruder heißt Alfred. Er arbeitet bei …','mExample')}{open('familie-text',164,278,370,55,'11 eigener Familientext')}
 <svg style={{position:'absolute',left:560,top:Y(180)}} width="280" height={140*sy} viewBox="0 0 280 140" preserveAspectRatio="none"><g fill="none" stroke="#e4c70b" strokeWidth="3"><circle cx="109" cy="4" r="7"/><circle cx="119" cy="4" r="7"/><circle cx="176" cy="68" r="7"/><circle cx="186" cy="68" r="7"/></g><path d="M35 15V45H170V15 M100 45V70 M100 80V102H240V80 M170 102V125H115 M170 125H230" fill="none" stroke="#999"/></svg>
 {[['oma',560,174],['opa',714,174],['mutter',615,238],['vater',755,238],['kind1',627,302],['kind2',750,302]].map(([id,x,y])=><span key={String(id)} className="mTreeField">{f('tree-'+id,Number(x),Number(y),82,'11 Stammbaum '+id)}</span>)}
 {title('12',354,'Ordnen Sie zu, ergänzen und vergleichen Sie.','KB 7')}{txt(168,389,660,'Freund | Kollege | Student | Partnerin | Ärztin','mBank')}
 <div style={{position:'absolute',left:168,top:Y(421),width:690,height:190*sy,background:'repeating-linear-gradient(white 0 28px,#ddd 28px 29px)',borderTop:(48*sy)+'px solid #fff8ce',boxSizing:'border-box'}}/>
 {['Deutsch ♂','Deutsch ♀','Englisch ♂ und ♀','Meine Sprache oder\nandere Sprachen ♂','Meine Sprache oder\nandere Sprachen ♀'].map((s,i)=>txt(172+i*137,424,136,s,'mSmall'))}
 {['Kollege','Partner','','Arzt',''].map((s,i)=>s?txt(173,474+i*28,127,s,i===0?'mExample':''):f(i===2?'u12-r3m':'u12-r5m',173,472+i*28,126))}
 {['Kollegin','','Freundin','','Studentin'].map((s,i)=>s?txt(310,474+i*28,127,s):f(i===1?'u12-r2w':'u12-r4w',310,472+i*28,126))}
 {['colleague','partner','friend','doctor','student'].map((s,i)=><span key={s}>{txt(447,474+i*28,130,s)}{f('sprache-m-'+i,585,472+i*28,125,'12 eigene Sprache männlich '+s)}{f('sprache-w-'+i,722,472+i*28,125,'12 eigene Sprache weiblich '+s)}</span>)}
 {check('u12',168,620)}
 {title('13',659,'Was spricht man wo? Notieren Sie.','KB 9')}{txt(168,692,670,'deutsch | eng | fran | ita | lie | lisch | nisch | nisch | rus | sisch | sisch | spa | zö','mBank')}
 {txt(184,724,200,'Land                   Sprache','mTitle')}{txt(545,724,275,'Land                   Sprache','mTitle')}
 {['Österreich','England','Spanien','Frankreich','Italien','Russland'].map((s,i)=>{const x=i<3?168:525,y=752+i%3*25;return <span key={s}>{txt(x,y,127,String.fromCharCode(97+i)+'  '+s)}{i===0?txt(x+128,y,145,'Deutsch','mExample'):f('u13-'+String.fromCharCode(97+i),x+128,y-2,145)}</span>})}{check('u13',168,832)}
 {title('14',873,'Ergänzen Sie.','KB 9')}
 <div style={{position:'absolute',left:168,top:Y(906),width:320,height:190*sy,background:'repeating-linear-gradient(white 0 26px,#eee 26px 27px)',borderTop:(26*sy)+'px solid #fff8ce',boxSizing:'border-box'}}/>
 {txt(255,908,110,'kommen','mTitle')}{txt(368,908,130,'sprechen (e→i)','mTitle')}
 {['ich','du','er/sie','wir','ihr','sie/Sie'].map((s,i)=><span key={s}>{txt(174,935+i*26,70,s)}{i===1?<>{txt(255,961,105,'kommst','mExample')}{txt(368,961,105,'sprichst','mExample')}</>:<>{f('u14-'+['ich','du','er','wir','ihr','sie'][i]+'-kommen',255,933+i*26,106)}{f('u14-'+['ich','du','er','wir','ihr','sie'][i]+'-sprechen',368,933+i*26,108)}</>}</span>)}
 {check('u14',520,1057)}
 {title('15',1110,'Ergänzen Sie die Verben.','KB 9')}
 {txt(169,1141,330,'a  ▪ Welche Sprachen sprichst du?','mSmall')}{txt(189,1162,36,'▴ Ich','mSmall')}{f('u15-a2',228,1160,72)}{txt(305,1162,185,'Deutsch und Englisch.','mSmall')}
 {txt(169,1185,164,'b  ▪ Wie viele Sprachen','mSmall')}{f('u15-b1',335,1183,82)}{txt(422,1185,45,'Sie?','mSmall')}{txt(189,1208,300,'▴ Drei: Englisch, Französisch und Spanisch.','mSmall')}
 {txt(169,1231,84,'c  ▪ Woher','mSmall')}{f('u15-c1',256,1229,85)}{txt(346,1231,42,'ihr?','mSmall')}{txt(189,1254,41,'▴ Wir','mSmall')}{f('u15-c2',233,1252,85)}{txt(323,1254,145,'aus der Schweiz.','mSmall')}
 {f('u15-d1',547,1139,79)}{txt(631,1141,188,'ihr Französisch?','mSmall')}{txt(527,1162,205,'d  ▴ Ja, und Deutsch.','mSmall')}
 {txt(527,1185,43,'e  ▪ Wo','mSmall')}{f('u15-e1',575,1183,82)}{txt(662,1185,33,'Sie?','mSmall')}{txt(547,1208,31,'▴ Wir','mSmall')}{f('u15-e2',580,1206,82)}{txt(667,1208,83,'in Graz.','mSmall')}
 {txt(527,1231,17,'f  ▪','mSmall')}{f('u15-f1',549,1229,75)}{txt(629,1231,80,'Sie Kinder?','mSmall')}{txt(547,1254,41,'▴ Ja, wir','mSmall')}{f('u15-f2',607,1252,80)}{txt(692,1254,112,'zwei Kinder.','mSmall')}
 {txt(527,1281,67,'g  ▪ Das','mSmall')}{f('u15-g1',598,1279,80)}{txt(683,1281,140,'meine Kinder.','mSmall')}{txt(547,1308,22,'Sie','mSmall')}{f('u15-g2',574,1306,110)}{txt(689,1308,140,'Tim und Tomma.','mSmall')}{check('u15',168,1348)}
 </>}
 {page==='21'&&<>
 {head('TRAINING: SPRECHEN')}<div className="nabModule">3</div>
 {title('1',191,'Sich vorstellen')}{txt(145,228,250,'a  Welche Sätze passen zu den\n   Fragen an der Tafel?\n   Markieren Sie.','mTitle')}{art('class',405,187,415,271)}
 {['Ich heiße …','Ich arbeite bei …','Meine Telefonnummer ist …','Ich spreche …','Ich bin … Jahre alt.','Ich bin verheiratet.','Ich bin … von Beruf.','Ich studiere in …','Ich habe zwei Kinder.','Ich wohne in …','Ich komme aus …'].map((s,i)=>{const x=i<4?169:i<8?405:588,y=472+(i<4?i:i<8?i-4:i-8)*22;return <button className={'mPhrase '+(i===0||v['mark-'+i]?'marked':'')} key={s} disabled={i===0} style={{left:x,top:Y(y)}} aria-label={'1a Satz markieren '+s} onClick={()=>set('mark-'+i,v['mark-'+i]?'':'1')}>{s}</button>})}
 {txt(145,581,650,'b  Das bin ich! Notieren Sie mindestens fünf Sätze.','mTitle')}{txt(185,624,340,'Ich heiße Julia.\nIch komme aus … und ich wohne in …','mExample')}{open('eigene-saetze',185,671,340,52,'1b mindestens fünf eigene Sätze')}
 {txt(548,581,290,'Lernen Sie Sätze zu Ihrer Person auswendig.\nSie helfen beim Small Talk.','mSmall mTip')}
 {txt(132,751,720,'TRAINING: AUSSPRACHE','mHeader')}{txt(508,763,280,'Satzmelodie bei Fragen','mSmall')}
 {title('1',804,'Was hören Sie? Ergänzen Sie die\nSatzmelodie: ↘ oder ↗.','',132,365)}{listen('11',96,807)}
 {['Wer ist das?','Ist das deine Frau?','Bist du verheiratet?','Wie heißt deine Frau?','Heißt deine Frau Steffi?','Was ist sie von Beruf?'].map((s,i)=><span key={s}>{txt(168,852+i*24,240,s)}{i<2?txt(i===0?260:307,852+i*24,30,i===0?'↘':'↗','mExample'):arrow('ap1-'+(i+1),[0,0,328,347,366,347][i],850+i*24)}</span>)}{check('ap1',168,1001)}
 {title('2',1043,'Ergänzen Sie die Regel.','',132,365)}{txt(179,1082,250,'↗ | ↘','mBank')}{txt(179,1115,270,'Bei W-Fragen (Wer? Wie? Was? …)\ngeht die Satzmelodie nach unten:','mSmall')}{arrow('ap2-1',407,1133)}{txt(179,1164,270,'Bei Ja-/Nein-Fragen geht die Satz-\nmelodie nach oben:','mSmall')}{arrow('ap2-2',320,1182)}{check('ap2',168,1218)}
 {title('3',804,'Ergänzen Sie die Satzmelodie (↘, ↗).\nHören Sie dann und vergleichen Sie.','',509,342)}{listen('12',470,807)}
 {txt(545,862,300,'▪ Das ist deine Freundin, ↘ oder? ↗','mSmall')}
 {txt(545,889,40,'▴ Nein.','mSmall')}{arrow('ap3-1',590,887)}{txt(626,889,200,'Das ist nicht meine','mSmall')}{txt(563,914,76,'Freundin.','mSmall')}{arrow('ap3-2',640,912)}{txt(676,914,150,'Das ist meine','mSmall')}{txt(563,939,76,'Schwester.','mSmall')}{arrow('ap3-3',640,937)}
 {txt(545,965,255,'▪ Wohnt sie auch in Deutschland?','mSmall')}{arrow('ap3-4',800,963)}
 {txt(545,991,40,'▴ Nein.','mSmall')}{arrow('ap3-5',590,989)}{txt(626,991,160,'Sie wohnt in Polen.','mSmall')}{arrow('ap3-6',785,989)}
 {txt(545,1017,40,'▪ Aha.','mSmall')}{arrow('ap3-7',587,1015)}{txt(623,1017,210,'Aber sie spricht Deutsch,','mSmall')}{txt(563,1042,40,'oder?','mSmall')}{arrow('ap3-8',610,1040)}
 {txt(545,1068,286,'▴ Sie spricht Polnisch, Deutsch und','mSmall')}{txt(563,1093,72,'Englisch.','mSmall')}{arrow('ap3-9',638,1091)}
 {txt(545,1119,160,'▪ Ist sie verheiratet?','mSmall')}{arrow('ap3-10',708,1117)}
 {txt(545,1145,40,'▴ Nein.','mSmall')}{arrow('ap3-11',590,1143)}{txt(625,1145,220,'Sie ist nicht verheiratet.','mSmall')}{check('ap3',545,1182)}
 {listen('13',505,1223)}{txt(545,1223,300,'Hören Sie noch einmal und sprechen Sie nach.','mSmall')}
 </>}
 {page==='22'&&<>
 {head('TEST')}{title('1',200,'Familie. Ergänzen Sie.')}
 {txt(161,235,150,'Eltern:')}{txt(328,235,73,'Vater und')}{f('u1-mutter',405,233,162)}
 {f('u1-geschwister',161,261,140)}{f('u1-bruder',328,261,138)}{txt(471,263,160,'und Schwester')}
 {txt(161,291,150,'Kinder:')}{txt(328,291,73,'Sohn und')}{f('u1-tochter',405,289,162)}
 {f('u1-grosseltern',161,317,140)}{txt(328,319,235,'Oma / Opa und Großmutter /')}{f('u1-grossvater',570,317,160)}
 {txt(161,347,150,'Enkelkinder:')}{txt(328,347,73,'Enkel und')}{f('u1-enkelin',405,345,162)}{check('u1',168,380)}
 {title('2',425,'Schreiben Sie die Fragen.')}{txt(163,462,660,'a  Thea / ist / deine Tochter   Ist Thea deine Tochter?','mExample')}
 {txt(163,489,560,'b  sprechen / welche Sprachen / deine Kinder')}{f('u2-b',185,510,545)}{txt(735,512,20,'?')}
 {['ist / dein / Vater / das','verheiratet / bist / du','wo / du / wohnst'].map((s,i)=><span key={s}>{txt(163,542+i*27,198,String.fromCharCode(99+i)+'  '+s)}{f('u2-'+String.fromCharCode(99+i),365,540+i*27,365)}{txt(735,542+i*27,20,'?')}</span>)}{check('u2',168,625)}
 {title('3',666,'Beantworten Sie die Fragen aus Aufgabe 2.')}{txt(163,700,666,'a  Ja, Thea ist meine Tochter.','mExample')}
 {txt(163,730,16,'b')}{f('u3-b',185,728,287)}{txt(477,730,330,'Französisch, Englisch und Deutsch.')}
 {txt(163,758,68,'c  Ja, das')}{f('u3-c',236,756,317)}{txt(163,786,78,'d  Nein, ich')}{f('u3-d',246,784,307)}
 {txt(163,814,16,'e')}{f('u3-e',185,812,270)}{txt(461,814,170,'in Stuttgart.')}{check('u3',168,835)}
 {title('4',877,'Ergänzen Sie mein-/dein-.')}{txt(174,915,650,'Hallo Eduardo,','mExample')}{txt(174,943,405,"wie geht's? Ich bin jetzt in Deutschland, in Bremen. Hier wohnt",'mSmall mExample')}{f('u4-bruder',590,941,100)}{txt(697,943,80,'Bruder.','mSmall')}
 {txt(174,972,202,'Ich mache hier ein Praktikum.','mSmall mExample')}{f('u4-kollegen',384,970,110)}{txt(502,972,250,'Kollegen sind super. Wie geht es Dir?','mSmall mExample')}
 {txt(174,1001,83,'Was machen','mSmall mExample')}{f('u4-frau',262,999,105)}{txt(375,1001,60,'Frau und','mSmall')}{f('u4-sohn',442,999,86)}{txt(534,1001,50,'Sohn?','mSmall')}{txt(174,1028,250,'Tschüs, Anna','mExample')}{check('u4',168,1058)}
 {title('5',1101,'Ja, nein oder doch? Schreiben Sie die Antworten.')}
 {txt(168,1135,450,'a  Hannah ist nicht deine Tochter, oder?    +','mSmall')}{txt(550,1135,295,'Doch, Hannah ist meine Tochter.','mExample mSmall')}
 {['Sprichst du Spanisch?','Du bist nicht verheiratet, oder?','Ist Frau Duate deine Lehrerin?','Du arbeitest nicht in Österreich, oder?'].map((s,i)=><span key={s}>{txt(168,1164+i*26,378,String.fromCharCode(98+i)+'  '+s+'  '+(i===0||i===3?'+':'−'),'mSmall')}{f('u5-'+String.fromCharCode(98+i),550,1162+i*26,285)}</span>)}
 {check('u5',168,1275)}{score(1310,[['0-3','0-6','0-2'],['4-5','7-9','3'],['6-7','10-12','4']])}
 </>}
 {page==='23'&&<>
 {head('LERNWORTSCHATZ')}<div className="nabModule">3</div>{art('strip',783,181,118,1004)}
 {title('1',208,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.','',132,645)}
 {txt(165,244,280,'Familie','mTitle')}{txt(486,244,276,'Sprachen','mTitle')}
 {['Familie die, -n','Vater der, ¨','Mutter die, ¨','Eltern (Pl)','Sohn der, ¨e','Tochter die, ¨','Großvater der, ¨ /\n  Opa der, -s','Großmutter die, ¨ /\n  Oma die, -s','Großeltern (Pl)','Enkelin die, -nen','Enkel der, -','Bruder der, ¨','Schwester die, -n','Geschwister (Pl)','(Ehe)Mann der, ¨er','(Ehe)Frau die, -en'].map((s,i)=>{const y=267+i*23+(i>6?23:0)+(i>7?23:0);return <span key={s}>{txt(165,y,140,s)}{f('vocab-familie-'+i,309,y-2+(i===6||i===7?20:0),147,'Übersetzung '+s)}</span>})}
 {['Sprache die, -n','sprechen,\n  du sprichst, er spricht','Deutsch','Welche …?','Wie viele …?'].map((s,i)=>{const y=[267,299,351,385,409][i];return <span key={s}>{txt(486,y,150,s)}{f('vocab-sprache-'+i,608,y-2,151,'Übersetzung '+s)}</span>})}
 {txt(486,448,280,'Weitere wichtige Wörter','mTitle')}
 {['Bild das, -er','Freund der, -e','Kollege der, -n','Partner der, -','ja','nein','doch','ein bisschen','bitte','genau','mein','dein'].map((s,i)=>{const y=473+i*23+(i>3?12:0)+(i>9?8:0);return <span key={s}>{txt(486,y,140,s)}{f('vocab-wichtig-'+i,608,y-2,151,'Übersetzung '+s)}</span>})}
 {txt(176,674,270,'Notieren Sie Verben\nmit Vokalwechsel so:','mSmall mTip')}{txt(340,722,130,'ich spreche\ndu sprichst\nsie/er spricht','mExample')}
 {title('2',826,'Welche Wörter möchten Sie noch lernen? Notieren Sie.','',132,642)}{open('eigener-wortschatz',168,859,595,300,'2 weiterer eigener Wortschatz')}
 </>}
 {page==='24'&&<>
 {head('WIEDERHOLUNGSSTATION: WORTSCHATZ')}
 {title('1',210,'Sich begrüßen und sich verabschieden? Ergänzen Sie.')}
 {txt(154,245,200,'Begrüßung','mTitle')}{txt(500,245,200,'Abschied','mTitle')}
 {txt(154,275,175,'a  Hallo')}{['b','c','d'].map((s,i)=><span key={s}>{txt(154,302+i*27,18,s)}{f('u1-'+s,175,300+i*27,165)}</span>)}
 {['e','f','g'].map((s,i)=><span key={s}>{txt(500,275+i*27,18,s)}{f('u1-'+s,523,273+i*27,i===1?204:160)}</span>)}
 {art('hello',363,248,116,101)}{art('bye',738,234,130,109)}{check('u1',168,387)}
 {title('2',431,"Ruths Familie")}{txt(131,469,440,'a  Sehen Sie den Stammbaum an und ergänzen Sie.','mTitle')}
 <svg style={{position:'absolute',left:546,top:Y(430)}} width="301" height={360*sy} viewBox="0 0 301 360" preserveAspectRatio="none"><path d="M31 105H166 M100 105V125 M100 233H239 M171 233V252 M78 252H266 M78 252V261 M175 252V261 M266 252V261" fill="none" stroke="#b2b185" strokeWidth="2"/><g fill="none" stroke="#dcbd00" strokeWidth="2"><circle cx="97" cy="105" r="6"/><circle cx="105" cy="105" r="6"/><circle cx="167" cy="233" r="6"/><circle cx="175" cy="233" r="6"/></g></svg>
 {[['franz','Franz',541,430,73,85],['marianne','Marianne',675,430,74,85],['katharina','Katharina',613,558,72,85],['peter','Peter',748,558,74,85],['ruth','Ruth',590,695,68,82],['justus','Justus',683,695,76,82],['jakob','Jakob',780,695,69,82]].map(([id,name,x,y,w,h])=><span key={String(id)}>{art(String(id),Number(x),Number(y),Number(w),Number(h))}{txt(Number(x),Number(y)+Number(h)+3,95,String(name),'mSmall')}</span>)}
 {txt(157,506,390,'1  Peter: Justus ist mein Sohn.','mExample mSmall')}
 {txt(157,535,340,'2  Jakob: Franz und Marianne sind','mSmall')}{txt(177,555,48,'meine','mSmall')}{f('u2a-2',229,553,165)}
 {txt(157,583,213,'3  Marianne: Ruth ist meine','mSmall')}{f('u2a-3',373,581,143)}
 {txt(157,611,220,'4  Peter: Marianne ist meine','mSmall')}{f('u2a-4',381,609,130)}
 {txt(157,639,182,'5  Ruth: Franz ist mein','mSmall')}{f('u2a-5',343,637,168)}
 {txt(157,667,139,'6  Katharina: Mein','mSmall')}{f('u2a-6',302,665,93)}{txt(401,667,110,'heißt Peter.','mSmall')}{check('u2a',168,696)}
 {txt(131,730,460,'b  Was machen Jakob, Justus und Ruth? Ordnen Sie zu.','mTitle')}
 {txt(163,764,402,'geschieden | Geschwister | Jahre alt | wohne | Ausbildung |\narbeite | habe | von Beruf','mBank')}
 {art('jakob',175,824,62,40)}{art('justus',175,882,62,42)}{art('ruth',175,944,62,42)}
 {txt(157,827,17,'1')}{txt(251,827,74,'Ich bin 19')}{f('u2b-a',330,825,111)}{txt(447,827,100,'(a) und')}{txt(251,852,111,'mache eine')}{f('u2b-b',366,850,140)}{txt(512,852,30,'(b).')}
 {txt(157,885,17,'2')}{txt(251,885,107,'Ich bin 23 und')}{f('u2b-c',363,883,120)}{txt(489,885,175,'(c) in Köln.')}
 {txt(251,910,204,'Ich bin verheiratet. Ich')}{f('u2b-d',460,908,135)}{txt(602,910,240,'(d) als Journalist.')}
 {txt(157,947,17,'3')}{txt(251,947,26,'Ich')}{f('u2b-e',280,945,105)}{txt(390,947,64,'(e) zwei')}{f('u2b-f',459,945,147)}{txt(612,947,230,'(f). Ich bin 26 Jahre alt,')}
 {f('u2b-g',251,974,159)}{txt(416,976,150,'(g) und Sekretärin')}{f('u2b-h',570,974,160)}{txt(735,976,30,'(h).')}{check('u2b',168,1008)}
 {title('3',1046,'Berufe. Lösen Sie das Rätsel.')}
 {['a','b','c','d','e','f'].map((s,i)=><span key={s}>{txt(166+i*110,1080+i*15,20,s,'mSmall')}{art('job-'+s,181+i*110,1086+i*15,76,92)}</span>)}
 {txt(169,1186,125,'Lösungswort:','mSmall')}{f('u3-solution',294,1184,100,'3 Lösungswort')}
 {txt(232,1219,22,'a','mSmall')}<div className="mCrossRow" style={{left:255,top:Y(1216)}}>{'KELLNER'.split('').map((c,i)=><span className={i===2?'solution':''} key={i}>{c}</span>)}</div>
 {['b','c','d','e','f'].map((id,i)=>{const offset=[1,2,2,4,1][i],length=[13,14,9,7,16][i];return <span key={id}>{txt(303-offset*24-23,1251+i*26,20,id,'mSmall')}{cell('u3-'+id,303-offset*24,1248+i*26,length,offset)}</span>})}{check('u3',680,1370,{...answers('u3'),'u3-solution':'LEHRER'})}
 </>}
 {page==='25'&&<>
 {head('WIEDERHOLUNGSSTATION: GRAMMATIK')}
 {title('1',206,'Schreiben Sie Gespräche.')}
 {txt(168,242,340,'a  ▪ Ist Sergio Ingenieur?','mExample')}{txt(520,242,300,'(Sergio – ist – Ingenieur)')}
 {txt(188,270,37,'▴ Ja,')}{f('u1-a',231,268,255)}{txt(520,270,330,'(arbeitet – er – Siemens – bei)')}
 {['b','c','d','e'].map((s,i)=>{const y=[307,363,419,503][i];return <span key={s}>{txt(168,y,26,s+'  ▪')}{f('u1-'+s,205,y-2,280)}{txt(488,y,16,'?')}{txt(520,y,330,['(er – kommt – woher)','(wohnt – wo – er)','(Geschwister – er – wie viele – hat)','(Sprachen – spricht – welche – er)'][i])}{i!==2?txt(188,y+26,330,['▴ Aus Mexiko.','▴ In Berlin.','','▴ Spanisch und Deutsch.'][i]):<>{txt(188,y+26,15,'▴')}{f('u1-d2',205,y+24,280)}{txt(520,y+26,310,'(eine Schwester – hat – er)')}</>}</span>})}{check('u1',168,565)}
 {title('2',608,'Mein Name ist …','',132,260)}{txt(143,643,252,'a  Suchen Sie noch 9 Verben.','mTitle')}{txt(407,608,441,'b  Ergänzen Sie die Verben aus a in der richtigen Form.','mTitle')}
 {grid.map((row,r)=>row.split('').map((letter,c)=>{const marked=Object.entries(gridWords).some(([word,a])=>{if(word!=='SEIN'&&!v['found-'+word])return false;const [r1,c1,r2,c2]=a,dr=Math.sign(r2-r1),dc=Math.sign(c2-c1);return Array.from({length:word.length},(_,i)=>r1+dr*i===r&&c1+dc*i===c).some(Boolean)});return <button key={r+'-'+c} className={'mGridCell '+(marked?'marked':'')+(start?.[0]===r&&start?.[1]===c?' active':'')} style={{left:174+c*24,top:Y(681+r*24)}} aria-label={'Wortgitter '+r+' '+c+' '+letter} onClick={()=>{if(!start){ST([r,c]);return}const entry=Object.entries(gridWords).find(([,a])=>(a[0]===start[0]&&a[1]===start[1]&&a[2]===r&&a[3]===c)||(a[2]===start[0]&&a[3]===start[1]&&a[0]===r&&a[1]===c));if(entry)set('found-'+entry[0],v['found-'+entry[0]]?'':'1');ST(null)}}>{letter}</button>}))}
 {txt(174,929,160,'ß = ss','mSmall')}{rule('u2a',168,958,()=>Object.keys(gridWords).every(w=>w==='SEIN'||v['found-'+w]==='1'))}
 {txt(434,649,318,'▪ Hallo, mein Name ist Lena und wie','mSmall')}{f('u2b-1',754,646,77)}{txt(834,649,24,'du?','mSmall')}
 {txt(434,677,409,'▴ Hallo Lena, ich bin Jorgo, und das ist mein Bruder Wassili.','mSmall')}
 {txt(434,705,61,'▪ Woher','mSmall')}{f('u2b-2',499,702,113)}{txt(617,705,53,'ihr?','mSmall')}{txt(434,733,220,'▴ Aus Griechenland.','mSmall')}
 {txt(434,761,89,'▪ Und was','mSmall')}{f('u2b-3',527,758,95)}{txt(627,761,230,'ihr hier in Österreich?','mSmall')}
 {txt(434,789,37,'▴ Ich','mSmall')}{f('u2b-4',476,786,109)}{txt(590,789,260,'an der Universität in Wien und','mSmall')}
 {txt(454,817,51,'Wassili','mSmall')}{f('u2b-5',510,814,121)}{txt(636,817,210,'als Programmierer. Und du?','mSmall')}
 {txt(434,845,35,'▪ Ich','mSmall')}{f('u2b-6',474,842,90)}{txt(569,845,140,'in Hamburg und','mSmall')}{f('u2b-7',713,842,86)}{txt(804,845,52,'einen','mSmall')}
 {txt(454,873,400,'Job als Kellnerin. Wie viele Jahre wohnst du schon in','mSmall')}{txt(454,897,160,'Österreich?','mSmall')}{txt(434,925,200,'▴ Zwei Jahre.','mSmall')}
 {txt(434,953,207,'▪ Was! Nur zwei Jahre? Du','mSmall')}{f('u2b-8',647,950,109)}{txt(762,953,96,'sehr gut Deutsch!','mSmall')}{txt(434,981,160,'▴ Danke!','mSmall')}{check('u2b',434,1009)}
 {title('3',1050,'Lesen Sie die Informationen zu Isabel und schreiben Sie Sätze mit nicht.')}
 {txt(168,1083,238,'STECKBRIEF','mBank')}{txt(175,1111,237,'Name: Isabel\nAdresse: Veilchenweg37, Oberhausen\nFamilienstand: Single\nBeruf: Sekretärin\nHerkunft: Schweiz','mSmall')}
 {txt(434,1086,405,'a  Köln wohnen: Isabel wohnt nicht in Köln.','mSmall mExample')}
 {['als Krankenschwester arbeiten:','verheiratet sein:','aus Österreich kommen:'].map((s,i)=><span key={s}>{txt(434,1114+i*40,410,String.fromCharCode(98+i)+'  '+s,'mSmall')}{f('u3-'+String.fromCharCode(98+i),455,1131+i*40,381)}</span>)}
 {check('u3',434,1252)}
 {title('4',1296,'Was ist richtig? Markieren Sie.')}{art('ferdinand',779,1320,70,86)}{art('elena',735,1450,73,80)}
 <div className="mParagraph" style={{left:179,top:Y(1332),width:578}}>Das ist Ferdinand. Er ist {inlineChoice(1,['mein','meine'])} {inlineChoice(2,['Kollege','Kollegin'])}. Er ist auch {inlineChoice(3,['Journalist','Journalistin'])} von Beruf. Wir {inlineChoice(4,['arbeiten','arbeite'])} jetzt {inlineChoice(5,['als','bei'])} MEDIA.COM in Hamburg. Ferdinand {inlineChoice(6,['wohne','wohnt'])} allein, aber er {inlineChoice(7,['hast','hat'])} viele Freunde.</div>
 <div className="mParagraph" style={{left:179,top:Y(1445),width:533}}>Das ist {inlineChoice(8,['mein','meine'])} {inlineChoice(9,['Chef','Chefin'])}. Sie {inlineChoice(10,['heiße','heißt'])} Elena Goldoni. Sie kommt {inlineChoice(11,['in','aus'])} Italien. Aber sie {inlineChoice(12,['lebt','lebst'])} vierzig Jahre {inlineChoice(13,['bei','in'])} Deutschland. Sie {inlineChoice(14,['spreche','spricht'])} perfekt Deutsch und Italienisch.</div>
 {check('u4',168,1553,Object.fromEntries(['mein','Kollege','Journalist','arbeiten','bei','wohnt','hat','meine','Chefin','heißt','aus','lebt','in','spricht'].map((a,i)=>['u4-'+(i+1),a])))}
 </>}
 {page==='26'&&<>
 {head('SELBSTEINSCHÄTZUNG')}{txt(502,139,300,'Das kann ich!','mExample')}{txt(138,205,320,'Ich kann jetzt …','mBlue')}{lights(188)}
 {txt(138,234,603,'… andere begrüßen und mich verabschieden:  L01','mTitle')}{confidence('s1',224)}{txt(159,261,90,'Hallo/Guten')}{f('s1-1',252,259,447,'1 eigene Begrüßung')}
 {txt(138,306,603,'… mich und andere vorstellen:  L01/L02/L03','mTitle')}{confidence('s2',296)}{txt(159,334,70,'Ich heiße')}{f('s2-name',233,332,106)}{txt(345,334,92,'Ich komme')}{f('s2-herkunft',441,332,142)}{txt(588,334,120,'und ich wohne')}{f('s2-wohnort',159,359,135)}{txt(301,361,92,'Ich spreche')}{f('s2-sprache',398,359,142)}
 {txt(138,407,603,'… nach dem Befinden fragen und über mein Befinden sprechen:  L01','mTitle')}{confidence('s3',397)}
 {txt(159,435,78,'du: ▪ Wie')}{f('s3-1',242,433,189)}{txt(438,435,78,'? ▴ Danke,')}{f('s3-2',521,433,69)}{txt(596,435,68,'☺ Und')}{f('s3-3',670,433,45)}
 {txt(159,462,50,'Sie: ▪')}{f('s3-4',213,460,240)}{txt(458,462,20,'?')}{txt(194,489,18,'▪')}{f('s3-5',213,487,240)}{txt(460,489,67,'☹ Und')}{f('s3-6',532,487,128)}{txt(664,489,16,'?')}{check('s3',580,520)}
 {txt(138,562,603,'… nachfragen und buchstabieren:  L01','mTitle')}{confidence('s4',552)}{txt(159,590,430,'▪ Mein Name ist Chanya Ndiaye.')}{txt(159,617,18,'▴')}{f('s4-1',181,615,243)}{txt(429,617,16,'?')}
 {txt(159,644,45,'▪ Ich')}{f('s4-2',209,642,165)}{txt(379,644,170,': C-H-A-N- …')}{check('s4',580,644)}
 {txt(138,688,603,'… nach dem Beruf fragen und über meinen Beruf sprechen:  L02','mTitle')}{confidence('s5',678)}{txt(159,716,146,'▪ Was bist du von')}{f('s5-1',310,714,117)}{txt(432,716,52,'? ▴ Ich')}{f('s5-antwort',489,714,213,'5 eigener Beruf')}{check('s5',580,745)}
 {txt(138,789,603,'… über Persönliches sprechen:  L02','mTitle')}{confidence('s6',779)}
 {['Familienstand: Ich bin','Kinder: Ich','Alter: Ich'].map((s,i)=><span key={s}>{txt(165,817+i*26,170,s)}{f('s6-'+i,340,815+i*26,274,'6 eigene Angabe '+s)}</span>)}
 {txt(138,906,603,'… meine Familie beschreiben:  L03','mTitle')}{confidence('s7',896)}{txt(165,934,90,'Das ist/sind')}{f('s7-person',259,932,354)}
 {f('s7-name',165,959,115)}{txt(286,961,90,'kommt aus')}{f('s7-herkunft',381,959,157)}{txt(545,961,100,'und wohnt in')}{f('s7-ort',165,986,200)}
 {txt(138,1036,320,'Ich kenne …','mBlue')}
 {txt(138,1064,603,'… 5 Länder und Sprachen:  L01/L03','mTitle')}{confidence('k1',1054)}{open('k1-eigen',168,1090,542,49,'5 Länder und Sprachen')}
 {txt(138,1172,603,'… 5 Berufe:  L02','mTitle')}{confidence('k2',1162)}{open('k2-eigen',168,1198,542,49,'5 eigene Berufe')}
 {txt(138,1290,603,'… die Zahlen bis 100:  L02','mTitle')}{confidence('k3',1280)}
 {['10 zehn','17 siebzehn','23','38','40','50','60','70','80','90','100'].map((s,i)=>{const x=168+(i%4)*148,y=1320+Math.floor(i/4)*29;return <span key={s}>{txt(x,y,32,s.split(' ')[0],'mSmall')}{i<2?txt(x+25,y,120,s.split(' ')[1],'mExample mSmall'):f('z-'+s,x+26,y-2,115)}</span>})}{check('k3',690,1376)}
 {txt(138,1425,603,'… 10 Familienmitglieder:  L03','mTitle')}{confidence('k4',1415)}{open('k4-eigen',168,1451,542,49,'10 eigene Familienmitglieder')}
 </>}
 {page==='27'&&<>
 {head('SELBSTEINSCHÄTZUNG')}{txt(502,139,300,'Das kann ich!','mExample')}{txt(135,206,320,'Ich kann auch …','mBlue')}{lights(190)}
 {txt(135,233,603,'… W-Fragen stellen und auf Fragen antworten:  L01/L02/L03','mTitle')}{confidence('s8',225)}
 {['heißt ihr?','kommen Madita und Mia?','sprichst du?','wohnen Sie?','ist das?'].map((s,i)=>{const y=263+i*28,x=[357,465,370,380,376][i],w=[173,137,170,228,240][i];return <span key={s}>{txt(154,y,16,'▪')}{f('s8-'+(i+1)+'q',173,y-2,98)}{txt(277,y,x-281,s,'mSmall')}{txt(x-15,y,15,'▴','mSmall')}{f('s8-'+(i+1)+'a',x,y-2,w)}{txt(x+w+4,y,200,['Sandra und Simone.','aus Schweden.','Spanisch und Englisch.','in Madrid.','ist Pedro.'][i],'mSmall')}</span>})}
 {check('s8',580,409,{...answers('s8'),'s8-3q':'Was|Welche Sprachen'})}
 {txt(135,449,603,'… Aussagen verneinen (Negation):  L02','mTitle')}{confidence('s9',441)}{txt(154,478,105,'Markus wohnt')}{f('s9-1',264,476,108)}{txt(378,478,85,'in Köln und')}{txt(154,505,20,'ist')}{f('s9-2',180,503,108)}{txt(294,505,130,'verheiratet.')}{txt(490,478,230,'Markus: Stuttgart\nFamilienstand: Single','mExample')}{check('s9',580,532)}
 {txt(135,574,603,'… nach Familienmitgliedern fragen und sie benennen (Possessivartikel):  L03','mTitle')}{confidence('s10',566)}
 {txt(154,603,212,'▴ Sind das deine Eltern?','mSmall')}{txt(366,603,100,'▪ Ja, das sind','mSmall')}{f('s10-1',472,601,86)}{txt(564,603,70,'Eltern. Das','mSmall')}{txt(366,630,66,'ist','mSmall')}{f('s10-2',436,628,83,'meine Mutter')}{txt(523,630,100,'Mutter und das','mSmall')}{txt(366,657,36,'ist','mSmall')}{f('s10-3',406,655,87)}{txt(498,657,100,'Vater.','mSmall')}{check('s10',636,657)}
 {txt(135,704,603,'… Ja-/Nein-Fragen stellen und mit ja/nein/doch antworten:  L03','mTitle')}{confidence('s11',696)}
 {txt(154,733,17,'▪')}{f('s11-1q',174,731,80)}{txt(260,733,230,'das deine Eltern?')}
 {txt(154,761,22,'☺ ▴','mSmall')}{f('s11-1a',181,759,199)}{txt(391,761,22,'☹ ▴','mSmall')}{f('s11-1b',418,759,228)}
 {txt(154,789,17,'▪')}{f('s11-2q',174,787,80)}{txt(260,789,330,'dein Bruder nicht verheiratet?')}
 {txt(154,817,22,'☺ ▴','mSmall')}{f('s11-2a',181,815,199)}{txt(391,817,22,'☹ ▴','mSmall')}{f('s11-2b',418,815,228)}{check('s11',658,815)}
 {txt(135,867,640,'Üben / Wiederholen möchte ich noch …','mBlue')}{open('ueben',135,892,557,28,'Üben und Wiederholen eigene Notiz')}
 {txt(135,951,650,'RÜCKBLICK','mHeader')}{txt(135,996,650,'Wählen Sie eine Aufgabe zu Lektion 1','mBlue')}
 {title('1',1034,'Wer ist das? Sehen Sie im Kursbuch auf den Seiten 9 und 10 nach und schreiben Sie.','',135,710)}
 {['nicole','paco','wachter'].map((s,i)=><span key={s}>{art(s,172+i*194,1065,102,98)}{open('r1-person-'+i,157+i*194,1170,147,72,'Rückblick Person '+(i+1))}</span>)}
 {title('2',1289,'Suchen Sie Fotos. Wer ist das? Stellen Sie die Personen vor.','',135,710)}{art('mesut',172,1328,102,120)}{txt(305,1348,250,'Das ist Mesut Özil. Er\nkommt aus Deutschland.','mExample')}{open('r2-personen',555,1328,250,120,'Rückblick eigene Personen vorstellen')}
 </>}
 {page==='28'&&<>
 {head('RÜCKBLICK')}{txt(135,212,680,'Wählen Sie eine Aufgabe zu Lektion 2','mBlue')}
 {title('1',252,'Was ist richtig? Kreuzen Sie an und vergleichen Sie mit dem Kursbuch auf Seite 78.','',135,710)}
 {txt(461,289,130,'Helga Stiemer','mTableHead mSmall')}{txt(586,289,65,'Carlos','mTableHead mSmall')}{txt(654,289,65,'Sonja','mTableHead mSmall')}{txt(716,289,120,'Bo Martinson','mTableHead mSmall')}
 {['Sie arbeiten nicht.','Sie sind nicht verheiratet.','Sie kommen nicht aus Deutschland.','Er hat keine Kinder.','Er wohnt in Essen.','Sie wohnt in Leipzig.'].map((s,r)=><span key={s}>{txt(176,321+r*29,278,String.fromCharCode(97+r)+'  '+s)}{['helga','carlos','sonja','bo'].map((person,c)=>{const id='t-'+String.fromCharCode(97+r)+'-'+person;return <input key={id} type="checkbox" className="mCheckbox" data-native-field={id} aria-label={s+' '+person} style={{left:[467,588,658,763][c],top:Y(319+r*29)}} checked={r===0&&c<2||v[id]==='true'} disabled={r===0&&c<2} onChange={e=>set(id,''+e.target.checked)}/>})}</span>)}
 {rule('t1',168,507,()=>data.fields.filter(f=>f.group==='t1').every(f=>(f.id==='t-a-helga'||f.id==='t-a-carlos'?'true':v[f.id]||'false')===f.answer))}
 {title('2',549,'Wählen Sie eine Kursteilnehmerin / einen Kursteilnehmer oder einen\nProminenten. Ergänzen Sie den Steckbrief und schreiben Sie einen Text.','',135,710)}
 {txt(171,602,223,'STECKBRIEF','mBank')}
 {['Vorname','Familienname','Herkunft','Wohnort','Beruf','Alter','Familienstand','Kinder'].map((s,i)=><span key={s}>{txt(182,637+i*23,114,s+':','mSmall')}{f('r22-'+i,300,635+i*23,150,'Steckbrief '+s)}</span>)}
 {txt(485,623,300,'Das ist …\n… kommt aus …\n…','mExample')}{open('r22-text',485,693,333,120,'2 eigener Personentext')}
 {txt(143,859,680,'Wählen Sie eine Aufgabe zu Lektion 3','mBlue')}
 {title('1',900,'Lesen Sie den Stammbaum im Kursbuch auf Seite 19. Was sagt Olga?','',143,690)}{art('olga',750,936,93,135)}
 {txt(177,938,400,'„Ich bin Olga. Das ist mein Mann. Er heißt')}{f('o-1',578,936,142)}
 {txt(177,972,103,'Ich habe zwei')}{f('o-2',285,970,120)}
 {txt(177,1006,103,'Meine Tochter')}{f('o-3',285,1004,243)}{txt(535,1006,100,'und mein')}{f('o-4',177,1038,353)}{txt(535,1040,20,'“')}{check('r31',177,1076)}
 {title('2',1120,'Ihre Familie. Was sagt Ihre Mutter / Ihr Bruder …? Schreiben Sie.','',143,690)}
 {txt(193,1163,270,'Ich heiße …\nDas ist mein/meine …\nSie/Er …','mExample')}{open('r32-text',470,1163,340,76,'2 eigener Familientext')}
 </>}
 {txt(Number(page)%2?704:48,1254,Number(page)%2?190:400,Number(page)%2?({'21':'einundzwanzig','23':'dreiundzwanzig','25':'fünfundzwanzig','27':'siebenundzwanzig'} as Record<string,string>)[page]+' | '+page+'  Modul 1':'Modul 1   '+page+' | '+({'20':'zwanzig','22':'zweiundzwanzig','24':'vierundzwanzig','26':'sechsundzwanzig','28':'achtundzwanzig'} as Record<string,string>)[page],'mFooter')}
 </div><audio className="nabPlayer" ref={audio} controls hidden={!track} aria-label="Originalaudio Arbeitsbuch"/></div>;
}
