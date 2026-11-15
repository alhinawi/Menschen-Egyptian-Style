import {ChoiceInput} from '../exercises/ChoiceInput';
import {CheckButton} from '../components/CheckButton';
import {PageImage} from '../components/PageImage';
import {usePageReset} from '../exercises/usePageReset';
import {useLayoutEffect,useRef,useState} from 'react';
import {scanData} from '../scan-data/registry';
import './native-ab11.css';
import './native-ab11-module1.css';
const norm=(s:string)=>s.normalize('NFC').toLocaleLowerCase('de').trim().replace(/[.,!?;:’']/g,'').replace(/\s+/g,' ');
function Words({s}:{s:string}){return <>{s.split(/(\s+)/).map((w,i)=>w==='▪'||w==='▴'?<i key={i} className={w==='▪'?'mSq':'mTri'} aria-hidden="true"/>:/\S/.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-phrase={s} data-word={w.replace(/^[.,!?„"()]+|[.,!?“"()]+$/g,'')}>{w}</span>:w)}</>}
const grid=['HSMHEDSWI','RALASJPOB','MVEBEORHH','ARBEITENE','CHENNKCEI','HUNCMOHNS','EICFPMEAS','NABIGMNIE','STUDIEREN','PRATRNULG'];
const gridWords:Record<string,number[]>={SEIN:[1,4,4,4],MACHEN:[2,0,7,0],HABEN:[0,3,4,3],LEBEN:[1,2,5,2],ARBEITEN:[3,0,3,7],KOMMEN:[4,5,9,5],SPRECHEN:[0,6,7,6],WOHNEN:[0,7,5,7],HEISSEN:[2,8,8,8],STUDIEREN:[8,0,8,8]};
export function NativeAB11Module1({page}:{page:string}){
 const host=useRef<HTMLDivElement>(null),audio=useRef<HTMLAudioElement>(null),[scale,SS]=useState(1),[,T]=useState(''),[v,S]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem('native-ab11-'+page)||'{}')}catch{return {}}}),[graded,G]=useState<Record<string,boolean>>({}),[start,ST]=useState<number[]|null>(null);
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const measure=()=>SS(Math.min(el.clientWidth/901,el.clientHeight/1275));measure();const ro=new ResizeObserver(measure);ro.observe(el);return()=>ro.disconnect()},[]);
 usePageReset(page,'native-ab11-'+page,()=>{S({});G({});ST(null)});
 const set=(id:string,value:string)=>{const next={...v,[id]:value};S(next);localStorage.setItem('native-ab11-'+page,JSON.stringify(next));G({})};
 const sy=page==='20'||page==='22'?.87:page==='24'?.86:page==='25'?.76:page==='26'?.8:page==='27'?.78:1;const Y=(y:number)=>page==='20'?(()=>{const a=[[0,0],[200,200],[251,251],[354,305],[421,365],[474,415],[620,548],[659,570],[692,602],[724,634],[752,655],[832,728],[873,750],[906,778],[935,806],[961,832],[1091,958],[1110,995],[1330,1200],[1500,1370]];let i=1;while(i<a.length-1&&y>a[i][0])i++;const [x0,y0]=a[i-1],[x1,y1]=a[i];return y0+(y-x0)*(y1-y0)/(x1-x0)})():page==='27'&&y>940?130+810*sy+(y-940):130+(y-130)*sy;const K=.838;
 const txt=(x:number,y:number,w:number,s:string,cls='')=><div className={'mText '+cls} style={{left:x,top:cls==='mFooter'?y:Y(y),width:w}}><Words s={s}/></div>;
 const f=(id:string,x:number,y:number,w:number,label=id)=>{const ctx=document.createElement('canvas').getContext('2d');if(ctx)ctx.font="18px 'Times New Roman'";const size=Math.max(10,Math.min(18,18*(w-5)/(ctx?.measureText(v[id]||'').width||1)));return <ChoiceInput className="mField" data-native-field={id} aria-label={label} style={{left:x,top:Y(y),width:w,height:22*sy,fontSize:size}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>};
 const open=(id:string,x:number,y:number,w:number,h:number,label=id)=><textarea className="mField mOpen" data-native-field={id} aria-label={label} style={{left:x,top:Y(y),width:w,height:h*sy,'--mopen-height':h*sy+'px'} as React.CSSProperties} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="mArt" alt={'Originalabbildung '+name} src={`assets/native-ab11/p${page}-${name}.png`} style={{left:x,top:Y(y),width:w,height:h*(page==='27'?1:sy)}}/>;
 const title=(n:string,y:number,s:string,kb='',x=132,w=700)=><>{kb&&txt(96,y+5,34,kb,'mKB')}<div className={'mNumber '+(Number(page)>=24?'red':'')} style={{left:x,top:Y(y)}}>{n}</div>{txt(x+35,y,w-35,s,'mTitle')}</>;
 const ink=(name:string,sx:number,top:number,w:number,h:number,alt='')=><PageImage className="mHelp" alt={alt} src={`assets/native-ab11/p${page}-${name}.png`} style={{left:sx*K,top:Y(top),width:w*K,height:h*K}}/>;
 const inkC=(name:string,cx:number,cy:number,w:number,h:number,alt='')=><PageImage className="mHelp" alt={alt} src={`assets/native-ab11/p${page}-${name}.png`} style={{left:cx,top:cy,width:w*K,height:h*K}}/>;
 const inkI=(name:string,h:number,alt='')=><PageImage className="mHelpI" alt={alt} src={`assets/native-ab11/p${page}-${name}.png`} style={{height:h*K}}/>;
 const rt=(scanY:number)=>scanY*K+223.5;
 const lined=(id:string,x:number,w:number,firstRule:number,lines:number,skip:number,label:string,deg=0)=><textarea className="mInk" data-native-field={id} aria-label={label} style={{left:x,top:Y(firstRule-16.4+skip*21.4),width:w,height:21.4*(lines-skip),transform:deg?`rotate(${deg}deg)`:undefined,transformOrigin:'0 0'} as React.CSSProperties} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const head=(s:string)=><>{txt(132,135,740,s,'mHeader')}<div className="mRule"/></>;
 const data=scanData['ab-a11:'+page];
 const answers=(group:string)=>Object.fromEntries(data.fields.filter(f=>f.group===group&&f.kind!=='radio'&&f.kind!=='checkbox'&&f.answer!==undefined).map(f=>[f.id,f.answer!]));
 const check=(id:string,x:number,y:number,expected=answers(id))=><div className="mCheck" data-native-task={id} style={{left:x,top:Y(y)}}><CheckButton onClick={()=>G({...graded,[id]:Object.entries(expected).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}></CheckButton><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const rule=(id:string,x:number,y:number,test:()=>boolean)=><div className="mCheck" data-native-task={id} style={{left:x,top:Y(y)}}><CheckButton onClick={()=>G({...graded,[id]:test()})}></CheckButton><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const save=(id:string,x:number,y:number)=>null;
 const listen=(n:string,x:number,y:number,t?:string)=><button className="mListen" data-task={t} aria-label={'Originalaudio 1 '+n} style={{left:x,top:Y(y)}} onClick={()=>{T(n);if(audio.current){audio.current.src='assets/ab-cd1-track'+n+'.mp3';audio.current.play().catch(()=>{})}}}>▶ 1 {n}</button>;
 const arrow=(id:string,x:number,y:number)=><button className="mArrow" data-native-field={id} aria-label={'Satzmelodie '+id} style={{left:x,top:Y(y)}} onClick={()=>set(id,v[id]==='↗'?'↘':'↗')}>{v[id]||' '}</button>;
 const radio=(id:string,val:string,x:number,y:number,label:string)=><ChoiceInput className="mRadio" type="radio" data-value={val} name={'native-ab11-'+page+'-'+id} aria-label={label} style={{left:x,top:Y(y)}} checked={v[id]===val} onChange={()=>set(id,val)}/>;
 const confidence=(id:string,y:number)=><>{[0,1,2].map((c)=><span key={c}>{radio('confidence-'+id,''+c,753+c*32,y,'Selbsteinschätzung '+id+' '+['grün','gelb','rot'][c])}</span>)}</>;
 const lights=(y:number)=><>{['#41a700','#edcf00','#e4310c'].map((c,i)=><i className="mLight" key={c} style={{left:753+i*32,top:Y(y),background:c}}/>)}</>;
 const score=(y:number,rows:string[][])=><div className="mScore" style={{left:168,top:Y(y)}}><b>Wörter</b><b>Strukturen</b><b>Kommunikation</b>{rows.map((row,r)=>row.map((s,c)=><div key={r+'-'+c}><i style={{background:['#d71910','#edcf00','#3b9e24'][r]}}/>{s} Punkte</div>))}</div>;
 const highlight=(id:string,x:number,y:number,words:string[],label=id)=><div className="mHighlight" style={{left:x,top:Y(y)}}>{words.map((w,i)=><span key={w}><button aria-label={label+' '+w} className={v[id]===w?'marked':''} onClick={()=>set(id,w)}>{w}</button>{i<words.length-1?'/':''}</span>)}</div>;
 const inlineChoice=(n:number,words:string[])=> <span className="mInlineChoice">{words.map((w,i)=><span key={w}><button aria-label={'u4-'+n+' '+w} className={v['u4-'+n]===w?'marked':''} onClick={()=>set('u4-'+n,w)}>{w}</button>{i===0?'/':''}</span>)}</span>;
 const cell=(id:string,x:number,y:number,length:number,offset:number)=> <div className="mCrossRow" style={{left:x,top:Y(y)}}>{Array.from({length},(_,i)=><ChoiceInput key={i} aria-label={id+' Buchstabe '+(i+1)} data-crossword={id+'-'+i} maxLength={1} className={i===offset?'solution':''} value={(v[id]||'')[i]?.trim()||''} onChange={e=>{const a=(v[id]||' '.repeat(length)).padEnd(length,' ').split('');a[i]=e.target.value.toLocaleUpperCase('de');set(id,a.join(''));if(e.target.value)(e.currentTarget.nextElementSibling as HTMLInputElement)?.focus()}}/>)}</div>;
 return <div className="nativeAB11 nativeAB11Module1" ref={host} data-native-ab11-page={page}><div className="nabCanvas mCanvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='20'&&(()=>{
 const T=(x:number,y:number,w:number,s:string,c='')=><div className={'mText '+c} style={{left:x,top:y,width:w}}><Words s={s}/></div>;
 const F=(id:string,x:number,y:number,w:number,label=id,c='')=><ChoiceInput className={'mField '+c} data-native-field={id} aria-label={label} style={{left:x,top:y,width:w}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const A=(n:string,x:number,y:number,w:number,h:number)=><PageImage className="mArt" alt={'Originalabbildung '+n} src={'assets/native-ab11/p20-'+n+'.png'} style={{left:x,top:y,width:w,height:h}}/>;
 const H=(n:string,y:number,s:string,k='KB 9',w=700)=><>{T(98,y+6,32,k,'mKB')}<div className="mNumber" style={{top:y}}>{n}</div>{T(167,y+1,w,s,'mTitle')}</>;
 const C=(g:string,y:number)=><div className="mCheck" data-native-task={g} style={{top:y}}><CheckButton onClick={()=>G({...graded,[g]:Object.entries(answers(g)).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}/><output aria-live="polite">{g in graded?(graded[g]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const bank=(x:number,y:number,w:number,s:string,scale=1)=><div className="mText mBank" style={{left:x,top:y,width:w,transform:`scaleX(${scale})`,transformOrigin:'0 0'}}><Words s={s}/></div>;
 return <>{head('BASISTRAINING')}{H('11',197,'Meine Familie. Ergänzen Sie den Stammbaum\nund schreiben Sie einen Text wie in 10.','KB 7',420)}
 {A('ink-brother',162,252,281,19)}<button className="mP20Write" onClick={()=>ST(start?null:[])} aria-label="11 Familientext schreiben">✎</button>{start&&<div className="mP20Panel"><button onClick={()=>ST(null)}>Schließen</button><textarea data-native-field="familie-text" aria-label="11 eigener Familientext" value={v['familie-text']||''} onChange={e=>set('familie-text',e.target.value)}/></div>}
 <svg style={{position:'absolute',left:559,top:171}} width="284" height="157"><g fill="none" stroke="#e4c70b" strokeWidth="3"><circle cx="100" cy="16" r="9"/><circle cx="112" cy="16" r="9"/><circle cx="169" cy="80" r="9"/><circle cx="181" cy="80" r="9"/></g><path d="M38 27V48H175V27 M107 48V69 M107 91V108H244V91 M244 108L237 134 M131 108L129 134" fill="none" stroke="#999"/></svg>
 {[['oma',559,172],['opa',695,172],['mutter',626,237],['vater',764,237],['kind1',646,300],['kind2',760,300]].map(([id,x,y])=>F('tree-'+id,Number(x),Number(y),77,'11 Stammbaum '+id,'mP20Tree'))}
 {H('12',303,'Ordnen Sie zu, ergänzen und vergleichen Sie.','KB 7')}{bank(167,337,300,'Freund | Kollege | Student | Partnerin | Ärztin')}{T(227,337,55,'Kollege','mP20Strike')}
 <div className="mP20Table" style={{left:167,top:365,width:699,height:175}}><div className="mP20TableHead" style={{height:44}}/>{[110,231,375,533].map(x=><i key={x} style={{left:x,height:175}}/>)}{[44,70,96,122,148,174].map(y=><b key={y} style={{top:y}}/>)}</div>
 {T(173,370,80,'Deutsch','mSmall')}{T(284,370,80,'Deutsch','mSmall')}{T(404,370,80,'Englisch','mSmall')}{T(490,370,40,'und','mSmall')}{[548,707].map(x=>T(x,370,159,'Meine Sprache oder\nandere Sprachen','mSmall'))}
 {A('male',234,365,25,28)}{A('female',345,365,23,29)}{A('male',467,365,25,28)}{A('female',519,365,23,29)}{A('male',668,380,25,28)}{A('female',827,380,23,29)}
 {['Kollege','Partner','','Arzt',''].map((s,i)=>s?(i===0?A('ink-kollege',173,416,44,17):T(173,416+i*26,100,s)):F(i===2?'u12-r3m':'u12-r5m',173,414+i*26,99,'12 männliche Form','mP20Cell'))}
 {['Kollegin','','Freundin','','Studentin'].map((s,i)=>s?T(284,416+i*26,110,s):F(i===1?'u12-r2w':'u12-r4w',284,414+i*26,108,'12 weibliche Form','mP20Cell'))}
 {['colleague','partner','friend','doctor','student'].map((s,i)=><span key={s}>{T(404,416+i*26,125,s)}{F('sprache-m-'+i,547,414+i*26,147,'12 eigene Sprache männlich '+s,'mP20Cell')}{F('sprache-w-'+i,706,414+i*26,153,'12 eigene Sprache weiblich '+s,'mP20Cell')}</span>)}{C('u12',548)}
 {H('13',570,'Was spricht man wo? Notieren Sie.')}{bank(172,601,555,'deutsch | eng | fran | ita | lie | lisch | nisch | nisch | rus | sisch | sisch | spa | zö',.89)}{T(172,601,52,'deutsch','mP20Strike')}
 {T(187,634,100,'Land','mTableLabel')}{T(296,634,145,'Sprache','mTableLabel')}{T(543,632,100,'Land','mTableLabel')}{T(651,632,145,'Sprache','mTableLabel')}
 {['Österreich','England','Spanien','Frankreich','Italien','Russland'].map((s,i)=>{const x=i<3?168:525,y=655+i%3*22;return <span key={s}>{T(x,y,129,String.fromCharCode(97+i)+'  '+s)}{i===0?<>{A('ink-deutsch',296,656,53,18)}<div className="mP20ExampleRule" style={{left:296,top:668,width:145}}/></>:F('u13-'+String.fromCharCode(97+i),i<3?296:652,y-1,143)}</span>})}{C('u13',728)}
 {H('14',750,'Ergänzen Sie.')}
 <div className="mP20Table" style={{left:170,top:778,width:319,height:180}}><div className="mP20TableHead" style={{height:27}}/>{[85,197].map(x=><i key={x} style={{left:x,height:180}}/>)}{[27,52,78,104,130,155,180].map(y=><b key={y} style={{top:y}}/>)}</div>
 {T(263,784,110,'kommen','mTableLabel')}{T(373,784,115,'sprechen (e→i)','mTableLabel')}
 {['ich','du','er/sie','wir','ihr','sie/Sie'].map((s,i)=><span key={s}>{T(176,810+i*25.5,70,s)}{i===1?<>{A('ink-kommst',262,835,47,18)}{A('ink-sprichst',373,835,49,20)}</>:<>{F('u14-'+['ich','du','er','wir','ihr','sie'][i]+'-kommen',260,807+i*25.5,102,'14 '+s+' kommen','mP20Cell')}{F('u14-'+['ich','du','er','wir','ihr','sie'][i]+'-sprechen',372,807+i*25.5,110,'14 '+s+' sprechen','mP20Cell')}</>}</span>)}{C('u14',944)}
 {H('15',994,'Ergänzen Sie die Verben.')}
 {(()=>{const D=(x:number,y:number,w:number,s:string)=>T(x,y,w,s,'mP20Dialogue');return <>
 {D(171,1027,165,'a  ▪ Welche Sprachen')}{A('ink-sprichst2',336,1025,49,20)}{D(387,1027,60,'du?')}
 {D(192,1048,43,'▴ Ich')}{F('u15-a2',239,1045,73)}{D(316,1048,210,'Deutsch und Englisch.')}
 {D(171,1070,177,'b  ▪ Wie viele Sprachen')}{F('u15-b1',351,1067,95)}{D(449,1070,50,'Sie?')}
 {D(192,1092,270,'▴ Drei: Englisch, Französisch und')}{D(209,1113,200,'Spanisch.')}
 {D(171,1135,85,'c  ▪ Woher')}{F('u15-c1',261,1132,104)}{D(370,1135,60,'ihr?')}
 {D(192,1157,43,'▴ Wir')}{F('u15-c2',242,1154,105)}{D(352,1157,160,'aus der Schweiz.')}
 {D(528,1027,29,'d  ▪')}{F('u15-d1',562,1024,95)}{D(662,1027,210,'ihr Französisch?')}{D(548,1048,220,'▴ Ja, und Deutsch.')}
 {D(528,1070,59,'e  ▪ Wo')}{F('u15-e1',590,1067,105)}{D(699,1070,65,'Sie?')}
 {D(548,1092,43,'▴ Wir')}{F('u15-e2',596,1089,105)}{D(706,1092,120,'in Graz.')}
 {D(528,1113,29,'f  ▪')}{F('u15-f1',563,1110,104)}{D(673,1113,145,'Sie Kinder?')}
 {D(548,1135,64,'▴ Ja, wir')}{F('u15-f2',619,1132,105)}{D(729,1135,145,'zwei Kinder.')}
 {D(528,1157,59,'g  ▪ Das')}{F('u15-g1',594,1154,94)}{D(694,1157,145,'meine Kinder.')}
 {D(565,1178,23,'Sie')}{F('u15-g2',592,1175,104)}{D(701,1178,155,'Tim und Tomma.')}
 </>})()}{C('u15',1174)}
 {[[111,235,'SCHREIBEN'],[111,367,'WÖRTER'],[112,606,'WÖRTER'],[114,786,'STRUKTUREN'],[114,1029,'STRUKTUREN']].map(([x,y,s])=><div className="mP20Rail" key={String(y)} style={{left:Number(x),top:Number(y)}}>{s}</div>)}
 <div className="mP20Footer"><em>Modul 1</em><span>20&nbsp;&nbsp; | &nbsp;&nbsp;zwanzig</span></div>
 </>})()}
 {page==='21'&&(()=>{
 const T=(x:number,y:number,w:number,s:string,c='')=><div className={'mText '+c} style={{left:x,top:y,width:w}}><Words s={s}/></div>;
 const H=(n:string,x:number,y:number,w:number,s:string)=><><div className="mNumber" style={{left:x,top:y}}>{n}</div>{T(x+36,y+1,w,s,'mTitle')}</>;
 const arrowAt=(id:string,x:number,y:number)=><button className="mArrow" data-native-field={id} aria-label={'Satzmelodie '+id} style={{left:x,top:y}} onClick={()=>set(id,v[id]==='↗'?'↘':'↗')}>{v[id]||' '}</button>;
 const C=(g:string,x:number,y:number)=><div className="mCheck" data-native-task={g} style={{left:x,top:y}}><CheckButton onClick={()=>G({...graded,[g]:Object.entries(answers(g)).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}/><output aria-live="polite">{g in graded?(graded[g]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 return <>{T(136,126,540,'TRAINING: SPRECHEN','mHeader')}<div className="mP21TopRule"/><div className="nabModule">3</div>
 {H('1',135,188,270,'Sich vorstellen')}{T(143,225,20,'a','mLetter')}{T(171,225,237,'Welche Sätze passen zu den\nFragen an der Tafel?\nMarkieren Sie.','mTitle')}{art('class',405,186,415,269)}
 {['Ich heiße …','Ich arbeite bei …','Meine Telefonnummer ist …','Ich spreche …','Ich bin … Jahre alt.','Ich bin verheiratet.','Ich bin … von Beruf.','Ich studiere in …','Ich habe zwei Kinder.','Ich wohne in …','Ich komme aus …'].map((s,i)=>{const x=i<4?169:i<8?404:588,y=467+(i<4?i:i<8?i-4:i-8)*21.4;return <button className={'mPhrase '+(i===0||v['mark-'+i]?'marked':'')} key={s} disabled={i===0} data-native-field={'mark-'+i} style={{left:x,top:y}} aria-label={'1a Satz markieren '+s} onClick={()=>set('mark-'+i,v['mark-'+i]?'':'1')}>{s}</button>})}
 <div className="mCheck" data-native-task="sr1a" style={{left:833,top:516}}><CheckButton onClick={()=>{const a:Record<string,string>={'mark-1':'1','mark-3':'1','mark-6':'1','mark-9':'1','mark-10':'1','mark-2':'','mark-4':'','mark-5':'','mark-7':'','mark-8':''};G({...graded,sr1a:Object.entries(a).every(([k,x])=>norm(v[k]||'')===norm(x))})}}/><output aria-live="polite">{'sr1a' in graded?(graded.sr1a?'✓ Richtig!':'Noch einmal'):''}</output></div>
 {T(143,574,20,'b','mLetter')}{T(169,574,370,'Das bin ich! Notieren Sie mindestens fünf Sätze.','mTitle')}
 <PageImage className="mArt" alt="Ich heiße Julia. Ich komme aus … und ich wohne in …" src="assets/native-ab11/p21-ink-profile.png" style={{left:185,top:626,width:228,height:36}}/>
 <textarea className="mP21Writing" data-native-field="eigene-saetze" aria-label="1b mindestens fünf eigene Sätze" value={v['eigene-saetze']||''} onChange={e=>set('eigene-saetze',e.target.value)}/>
 <div className="mP21Tip"><i>TIPP</i>{T(16,10,299,'Lernen Sie Sätze zu Ihrer Person auswendig.\nSie helfen beim Small Talk.','mSmall')}</div>
 {T(136,735,325,'TRAINING: AUSSPRACHE','mHeader')}{T(455,744,205,'Satzmelodie bei Fragen','mP21Subtitle')}<div className="mP21BottomRule"/>
 {H('1',132,791,310,'Was hören Sie? Ergänzen Sie die\nSatzmelodie: ↘ oder ↗.')}{listen('11',96,797,'1')}
 {['Wer ist das?','Ist das deine Frau?','Bist du verheiratet?','Wie heißt deine Frau?','Heißt deine Frau Steffi?','Was ist sie von Beruf?'].map((s,i)=><span key={s}>{T(168,838+i*21.4,280,s)}{i<2?T(i===0?257:308,838+i*21.4,25,i===0?'↘':'↗','mP21PrintedArrow'):arrowAt('ap1-'+(i+1),[0,0,312,330,344,329][i],836+i*21.4)}</span>)}{C('ap1',463,944)}
 {H('2',132,993,310,'Ergänzen Sie die Regel.')}
 <div className="mP21RuleBox"><i>REGEL</i></div>{T(185,1034,60,'↗ | ↘','mBank')}{T(185,1063,260,'Bei W-Fragen (Wer? Wie? Was? …)\ngeht die Satzmelodie nach unten:','mSmall')}{arrowAt('ap2-1',407,1080)}{T(185,1102,260,'Bei Ja-/Nein-Fragen geht die Satz-\nmelodie nach oben:','mSmall')}{arrowAt('ap2-2',315,1120)}{C('ap2',463,1119)}
 {H('3',509,794,319,'Ergänzen Sie die Satzmelodie (↘, ↗).\nHören Sie dann und vergleichen Sie.')}{listen('12',470,798,'1')}
 {T(545,851,293,'▪ Das ist deine Freundin, ↘ oder? ↗')}
 {T(545,873,60,'▴ Nein.')}{arrowAt('ap3-1',606,871)}{T(642,873,210,'Das ist nicht meine')}{T(563,894,75,'Freundin.')}{arrowAt('ap3-2',638,892)}{T(674,894,155,'Das ist meine')}{T(563,915,79,'Schwester.')}{arrowAt('ap3-3',642,913)}
 {T(545,937,258,'▪ Wohnt sie auch in Deutschland?')}{arrowAt('ap3-4',800,935)}
 {T(545,958,60,'▴ Nein.')}{arrowAt('ap3-5',606,956)}{T(641,958,145,'Sie wohnt in Polen.')}{arrowAt('ap3-6',784,956)}
 {T(545,979,56,'▪ Aha.')}{arrowAt('ap3-7',599,977)}{T(634,979,216,'Aber sie spricht Deutsch,')}{arrowAt('ap3-8',562,998)}{T(597,1000,80,'oder?')}
 {T(545,1022,305,'▴ Sie spricht Polnisch, Deutsch und')}{T(563,1043,68,'Englisch.')}{arrowAt('ap3-9',632,1041)}
 {T(545,1065,150,'▪ Ist sie verheiratet?')}{arrowAt('ap3-10',700,1063)}
 {T(545,1086,60,'▴ Nein.')}{arrowAt('ap3-11',606,1084)}{T(641,1086,210,'Sie ist nicht verheiratet.')}{C('ap3',845,1086)}
 {listen('13',500,1131,'2')}{T(543,1129,300,'Hören Sie noch einmal und sprechen\nSie nach.','mTitle')}
 <div className="mP21Footer">einundzwanzig&nbsp;&nbsp; | &nbsp;&nbsp;21 <em>Modul 1</em></div>
 </>})()}
 {page==='22'&&(()=>{
 const T=(x:number,y:number,w:number,s:string,c='')=><div className={'mText '+c} style={{left:x,top:y,width:w}}><Words s={s}/></div>;
 const F=(id:string,x:number,y:number,w:number)=>{const ctx=document.createElement('canvas').getContext('2d');if(ctx)ctx.font='16px KbDroid';const size=Math.max(10,Math.min(16,16*(w-5)/(ctx?.measureText(v[id]||'').width||1)));return <ChoiceInput className="mField" data-native-field={id} aria-label={id} style={{left:x,top:y,width:w,fontSize:size}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>};
 const A=(n:string,x:number,y:number,w:number,h:number)=><PageImage className="mArt" alt={'Originalabbildung '+n} src={'assets/native-ab11/p22-'+n+'.png'} style={{left:x,top:y,width:w,height:h}}/>;
 const H=(n:string,y:number,s:string)=><><div className="mNumber" style={{top:y}}>{n}</div>{T(162,y+1,700,s,'mTitle')}</>;
 const C=(g:string,y:number,points:string)=><>{T(759,y,80,'_ / '+points+' Punkte','mP22Points')}<div className="mCheck" data-native-task={g} style={{left:840,top:y-5}}><CheckButton onClick={()=>G({...graded,[g]:Object.entries(answers(g)).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}/><output aria-live="polite">{g in graded?(graded[g]?'✓ Richtig!':'Noch einmal'):''}</output></div></>;
 return <>{T(126,130,130,'TEST','mHeader')}<div className="mP22Rule"/>
 {H('1',194,'Familie. Ergänzen Sie.')}
 {T(161,227,150,'Eltern:')}{T(327,227,80,'Vater und')}{F('u1-mutter',403,222,163)}
 {F('u1-geschwister',161,245,137)}{F('u1-bruder',327,244,137)}{T(469,247,160,'und Schwester')}
 {T(161,270,150,'Kinder:')}{T(327,269,80,'Sohn und')}{F('u1-tochter',402,264,142)}
 {F('u1-grosseltern',161,288,116)}{A('ink-oma',327,290,30,16)}{T(355,290,178,'/ Opa und Großmutter /')}{F('u1-grossvater',535,286,120)}
 {T(161,311,150,'Enkelkinder:')}{T(327,311,80,'Enkel und')}{F('u1-enkelin',406,306,164)}{C('u1',311,'7')}
 {H('2',364,'Schreiben Sie die Fragen.')}
 {T(163,398,210,'a  Thea / ist / deine Tochter')}{A('ink-question',382,396,157,18)}
 {T(163,419,360,'b  sprechen / welche Sprachen / deine Kinder')}{F('u2-b',518,412,212)}{T(735,415,20,'?')}
 {['ist / dein / Vater / das','verheiratet / bist / du','wo / du / wohnst'].map((s,i)=><span key={s}>{T(163,441+i*21,198,String.fromCharCode(99+i)+'  '+s)}{F('u2-'+String.fromCharCode(99+i),360,434+i*21,370)}{T(735,437+i*21,20,'?')}</span>)}{C('u2',480,'4')}
 {H('3',534,'Beantworten Sie die Fragen aus Aufgabe 2.')}
 {T(164,567,16,'a')}{A('ink-answer',183,566,174,19)}
 {T(164,588,16,'b')}{F('u3-b',184,582,285)}{T(473,586,330,'Französisch, Englisch und Deutsch.')}
 {T(164,610,75,'c  Ja, das')}{F('u3-c',236,604,317)}{T(553,610,8,'.')}
 {T(164,631,90,'d  Nein, ich')}{F('u3-d',251,625,300)}{T(551,631,8,'.')}
 {T(164,652,16,'e')}{F('u3-e',188,647,264)}{T(457,650,170,'in Stuttgart.')}{C('u3',650,'4')}
 {H('4',702,'Ergänzen Sie mein-/dein-.')}{A('ink-email',172,747,569,100)}
 {F('u4-bruder',574,760,107)}{F('u4-kollegen',363,783,141)}{F('u4-frau',251,806,96)}{F('u4-sohn',406,804,81)}{C('u4',840,'4')}
 {H('5',893,'Ja, nein oder doch? Schreiben Sie die Antworten.')}
 {T(168,927,370,'a  Hannah ist nicht deine Tochter, oder?')}{A('ink-doch',548,923,202,19)}
 {['Sprichst du Spanisch?','Du bist nicht verheiratet, oder?','Ist Frau Duate deine Lehrerin?','Du arbeitest nicht in Österreich, oder?'].map((s,i)=><span key={s}>{T(168,949+i*21,378,String.fromCharCode(98+i)+'  '+s)}{F('u5-'+String.fromCharCode(98+i),550,940+i*21,268)}</span>)}
 {['+','+','−','−','+'].map((s,i)=>T(527,926+i*21.4,20,s,'mP22Plus'))}<div className="mP22ExampleRule"/>{C('u5',1032,'4')}
 {A('score',163,1050,422,133)}
 {[[105,231,'WÖRTER'],[107,400,'STRUKTUREN'],[109,571,'STRUKTUREN'],[111,740,'STRUKTUREN'],[112,931,'KOMMUNIKATION']].map(([x,y,s])=><div className="mP20Rail" key={String(y)} style={{left:Number(x),top:Number(y)}}>{s}</div>)}
 <div className="mP22Footer"><em>Modul 1</em><span>22&nbsp;&nbsp; | &nbsp;&nbsp;zweiundzwanzig</span></div>
 </>})()}
 {page==='23'&&<>
 {head('LERNWORTSCHATZ')}<div className="nabModule">3</div>{art('strip',783,181,118,1004)}
 {title('1',208,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.','',132,645)}
 {txt(165,244,280,'Familie','mTitle')}{txt(486,244,276,'Sprachen','mTitle')}
 {['Familie die, -n','Vater der, ¨','Mutter die, ¨','Eltern (Pl)','Sohn der, ¨e','Tochter die, ¨','Großvater der, ¨ /\n  Opa der, -s','Großmutter die, ¨ /\n  Oma die, -s','Großeltern (Pl)','Enkelin die, -nen','Enkel der, -','Bruder der, ¨','Schwester die, -n','Geschwister (Pl)','(Ehe)Mann der, ¨er','(Ehe)Frau die, -en'].map((s,i)=>{const y=262+i*21.4+(i>6?21.4:0)+(i>7?21.4:0);return <span key={s}>{txt(165,y,140,s)}{f('vocab-familie-'+i,305,y-2+(i===6||i===7?21.4:0),152,'Übersetzung '+s)}</span>})}
 {['Sprache die, -n','sprechen,\n  du sprichst, er spricht','Deutsch','Welche …?','Wie viele …?'].map((s,i)=>{const y=[262,294,347,379,400][i];return <span key={s}>{txt(486,y,150,s)}{f('vocab-sprache-'+i,605,y-2,157,'Übersetzung '+s)}</span>})}
 {txt(486,440,280,'Weitere wichtige Wörter','mTitle')}
 {['Bild das, -er','Freund der, -e','Kollege der, -n','Partner der, -','ja','nein','doch','ein bisschen','bitte','genau','mein','dein'].map((s,i)=>{const y=462+i*21.4+(i>3?10:0)+(i>9?10:0);return <span key={s}>{txt(486,y,140,s)}{f('vocab-wichtig-'+i,605,y-2,157,'Übersetzung '+s)}</span>})}
 <div className="mP23Tip"><i>TIPP</i><div>Notieren Sie Verben<br/>mit Vokalwechsel so:</div></div>{art('ink-sprechen',338,716,100,64)}
 {title('2',826,'Welche Wörter möchten Sie noch lernen? Notieren Sie.','',132,642)}<div className="mP23WritingRules"/>{open('eigener-wortschatz',168,840,595,320,'2 weiterer eigener Wortschatz')}
 <div className="mP23Footer">dreiundzwanzig&nbsp;&nbsp; | &nbsp;&nbsp;23 <em>Modul 1</em></div>
 </>}
 {page==='24'&&(()=>{
 const T=(x:number,y:number,w:number,s:string,c='')=><div className={'mText '+c} style={{left:x,top:y,width:w}}><Words s={s}/></div>;
 const F=(id:string,x:number,y:number,w:number,hint='')=><ChoiceInput className="mField" data-native-field={id} aria-label={id} placeholder={hint} style={{left:x,top:y,width:w}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const A=(n:string,x:number,y:number,w:number,h:number)=><PageImage className="mArt" alt={'Originalabbildung '+n} src={'assets/native-ab11/p24-'+n+'.png'} style={{left:x,top:y,width:w,height:h}}/>;
 const H=(n:string,x:number,y:number,w:number,s:string)=><><div className="mNumber red" style={{left:x,top:y}}>{n}</div>{T(x+35,y+1,w,s,'mTitle')}</>;
 const C=(g:string,x:number,y:number,expected=answers(g))=><div className="mCheck" data-native-task={g} style={{left:x,top:y}}><CheckButton onClick={()=>G({...graded,[g]:Object.entries(expected).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}/><output aria-live="polite">{g in graded?(graded[g]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 return <>{T(117,134,740,'WIEDERHOLUNGSSTATION: WORTSCHATZ','mHeader')}
 {H('1',119,209,700,'Sich begrüßen und sich verabschieden? Ergänzen Sie.')}
 {T(154,241,200,'Begrüßung','mTableLabel')}{T(499,235,200,'Abschied','mTableLabel')}
 {T(154,264,175,'a  Hallo')}{['b','c','d'].map((s,i)=><span key={s}>{T(154,286+i*21,18,s)}{F('u1-'+s,175,280+i*21,181,['____n   T__','_______r___','G____   _____'][i])}</span>)}
 {['e','f','g'].map((s,i)=><span key={s}>{T(499,257+i*22,18,s)}{F('u1-'+s,522,250+i*22,i===1?209:131,['____ N____','A_____________','_s_____'][i])}</span>)}
 {A('hello',363,244,116,101)}{A('bye',738,228,130,109)}{C('u1',842,318)}
 {H('2',122,378,430,'Ruths Familie')}{T(131,411,20,'a','mLetter')}{T(157,411,395,'Sehen Sie den Stammbaum an und ergänzen Sie.','mTitle')}
 {A('tree',539,347,313,375)}
 <div className="mText" style={{left:157,top:443,width:390}}><Words s="1  Peter: Justus ist mein "/>{inkI('sohn',20,'Sohn.')}</div>
 {T(157,464,318,'2  Jakob: Franz und Marianne sind meine')}{F('u2a-2',466,455,85)}{T(551,462,10,'.')}
 {T(157,485,220,'3  Marianne: Ruth ist meine')}{F('u2a-3',372,477,148)}{T(520,483,10,'.')}
 {T(157,506,220,'4  Peter: Marianne ist meine')}{F('u2a-4',374,498,124)}{T(498,504,10,'.')}
 {T(157,527,182,'5  Ruth: Franz ist mein')}{F('u2a-5',334,519,127)}{T(461,525,10,'.')}
 {T(157,548,145,'6  Katharina: Mein')}{F('u2a-6',304,540,64)}{T(372,546,110,'heißt Peter.')}{C('u2a',500,549)}
 {T(133,591,20,'b','mLetter')}{T(160,590,540,'Was machen Jakob, Justus und Ruth? Ordnen Sie zu.','mTitle')}
 <div className="mText mBank" style={{left:164,top:621,width:412,transform:'scaleX(.94)',transformOrigin:'left top'}}>{inkI('bank-geschieden',24,'geschieden')}<Words s=" | Geschwister | Jahre alt | wohne | Ausbildung |"/>{'\n'}{inkI('bank-arbeite',22,'arbeite')}<Words s=" | habe | von Beruf"/></div>
 {A('thumb-jakob',176,671,69,45)}{A('thumb-justus',176,721,69,45)}{A('thumb-ruth',176,777,69,45)}
 {T(161,676,17,'1')}{T(252,675,74,'Ich bin 19')}{F('u2b-a',326,668,105)}{T(436,673,100,'(a) und')}{T(252,697,84,'mache eine')}{F('u2b-b',337,690,106)}{T(448,694,30,'(b).')}
 {T(161,727,17,'2')}{T(252,727,107,'Ich bin 23 und')}{F('u2b-c',361,719,105)}{T(471,725,175,'(c) in Köln.')}
 {T(252,748,177,'Ich bin verheiratet. Ich')}{F('u2b-d',428,741,105)}{T(538,747,240,'(d) als Journalist.')}
 {T(161,783,17,'3')}{T(252,783,26,'Ich')}{F('u2b-e',282,775,104)}{T(391,779,64,'(e) zwei')}{F('u2b-f',453,772,104)}{T(562,777,230,'(f). Ich bin 26 Jahre alt,')}
 {F('u2b-g',252,799,106)}{T(364,800,150,'(g) und Sekretärin')}{F('u2b-h',501,794,105)}{T(611,798,30,'(h).')}{C('u2b',841,798)}
 {H('3',131,854,700,'Berufe. Lösen Sie das Rätsel.')}
 {[['a',180,902,62,96,166,890],['b',272,902,104,89,270,888],['c',422,899,46,95,413,887],['d',511,897,75,99,518,883],['e',625,947,61,92,637,933],['f',736,1026,69,87,729,1017]].map(([id,x,y,w,h,lx,ly])=><span key={String(id)}>{T(Number(lx),Number(ly),20,String(id))}{A('job-'+id+'-source',Number(x),Number(y),Number(w),Number(h))}</span>)}
 {T(168,1016,125,'Lösungswort:')}{F('u3-solution',272,1011,36)}
 <div className="mP24CrossExample" style={{left:193,top:1038}}><span>a</span>{([['K1',13,15],['E1',15,16],['L1',13,15],['L2',13,18],['N',11,16],['E2',15,17],['R',15,16]] as [string,number,number][]).map(([n,w,h],i)=><span className={i===3?'solution':''} key={n}><PageImage className="mCrossInk" alt={'KELLNER'[i]} src={'assets/native-ab11/p24-kellner-'+n+'.png'} style={{left:(26-w*K)/2,top:(23-h*K)/2,width:w*K,height:h*K}}/></span>)}</div>
 {['b','c','d','e','f'].map((id,i)=>{const offset=[1,2,2,4,1][i],length=[13,14,9,7,16][i],x=297-offset*26,y=1062+i*23.5;return <div className="mP24CrossRow" style={{left:x-26,top:y}} key={id}><span>{id}</span>{Array.from({length},(_,j)=><ChoiceInput key={j} aria-label={'u3-'+id+' Buchstabe '+(j+1)} data-crossword={'u3-'+id+'-'+j} maxLength={1} className={j===offset?'solution':''} value={(v['u3-'+id]||'')[j]?.trim()||''} onChange={e=>{const a=(v['u3-'+id]||' '.repeat(length)).padEnd(length,' ').split('');a[j]=e.target.value.toLocaleUpperCase('de');set('u3-'+id,a.join(''));if(e.target.value)(e.currentTarget.nextElementSibling as HTMLInputElement)?.focus()}}/>)}</div>})}{C('u3',841,1163,{...answers('u3'),'u3-solution':'LEHRER'})}
 <div className="mP24Footer"><em>Modul 1</em><span>24&nbsp;&nbsp; | &nbsp;&nbsp;vierundzwanzig</span></div>
 </>})()}
 {page==='25'&&(()=>{
 const txt=(x:number,y:number,w:number,s:string,cls='')=><div className={'mText '+cls} style={{left:x,top:y,width:w}}><Words s={s}/></div>;
 const f=(id:string,x:number,y:number,w:number)=>{const ctx=document.createElement('canvas').getContext('2d');if(ctx)ctx.font='15px KbDroid';const size=Math.max(9,Math.min(15,15*(w-5)/(ctx?.measureText(v[id]||'').width||1)));return <ChoiceInput className="mField" data-native-field={id} aria-label={id} style={{left:x,top:y,width:w,fontSize:size}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>};
 const art=(n:string,x:number,y:number,w:number,h:number)=><PageImage className="mArt" alt={'Originalabbildung '+n} src={'assets/native-ab11/p25-'+n+'.png'} style={{left:x,top:y,width:w,height:h}}/>;
 const title=(n:string,y:number,s:string)=><><div className="mNumber red" style={{left:135,top:y}}>{n}</div>{txt(170,y+1,700,s,'mTitle mP25TaskTitle')}</>;
 const check=(id:string,x:number,y:number,expected=answers(id))=><div className="mCheck" data-native-task={id} style={{left:x,top:y}}><CheckButton onClick={()=>G({...graded,[id]:Object.entries(expected).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}/><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 return <>{txt(132,130,720,'WIEDERHOLUNGSSTATION: GRAMMATIK','mHeader')}<div className="mP25Module"/>
 {title('1',204,'Schreiben Sie Gespräche.')}
 {txt(168,237,60,'a  ▪ ')}{art('sergio',204,219,127,39)}{txt(520,236,300,'(Sergio - ist - Ingenieur)')}
 {txt(188,259,37,'▴ Ja,')}{f('u1-a',228,252,255)}{txt(484,259,8,'.')}{txt(520,257,330,'(arbeitet - er - Siemens - bei)')}
 {['b','c','d','e'].map((s,i)=>{const y=[290,344,397,450][i];return <span key={s}>{txt(168,y,26,s+'  ▪')}{f('u1-'+s,205,y-7,274)}{txt(480,y-2,16,'?')}{txt(520,y-2,330,['(er - kommt - woher)','(wohnt - wo - er)','(Geschwister - er - wie viele - hat)','(Sprachen - spricht - welche - er)'][i])}{i!==2?txt(188,y+22,330,['▴ Aus Mexiko.','▴ In Berlin.','','▴ Spanisch und Deutsch.'][i]):<>{txt(188,y+22,15,'▴')}{f('u1-d2',205,y+15,274)}{txt(480,y+22,10,'.')}{txt(520,y+20,310,'(eine Schwester - hat - er)')}</>}</span>})}{check('u1',842,470)}
 {title('2',511,'Mein Name ist …')}{txt(143,545,20,'a','mLetter')}{txt(169,545,250,'Suchen Sie noch 9 Verben.','mTitle')}{txt(407,511,20,'b','mLetter')}{txt(433,511,420,'Ergänzen Sie die Verben aus a in der richtigen Form.','mTitle')}
 {grid.map((row,r)=>row.split('').map((letter,c)=>{const marked=Object.entries(gridWords).some(([word,a])=>{if(word!=='SEIN'&&!v['found-'+word])return false;const [r1,c1,r2,c2]=a,dr=Math.sign(r2-r1),dc=Math.sign(c2-c1);return Array.from({length:word.length},(_,i)=>r1+dr*i===r&&c1+dc*i===c).some(Boolean)});return <button key={r+'-'+c} className={'mGridCell '+(marked?'marked':'')+(start?.[0]===r&&start?.[1]===c?' active':'')} style={{left:169+c*25.8,top:574+r*21.4}} aria-label={'Wortgitter '+r+' '+c+' '+letter} onClick={()=>{if(!start){ST([r,c]);return}const entry=Object.entries(gridWords).find(([,a])=>(a[0]===start[0]&&a[1]===start[1]&&a[2]===r&&a[3]===c)||(a[2]===start[0]&&a[3]===start[1]&&a[0]===r&&a[1]===c));if(entry&&entry[0]!=='SEIN')set('found-'+entry[0],v['found-'+entry[0]]?'':'1');ST(null)}}>{letter}</button>}))}
 {txt(174,794,160,'ß = ss','mTiny')}
 <div className="mCheck" data-native-task="u2a" style={{left:392,top:792}}><CheckButton onClick={()=>G({...graded,u2a:Object.keys(gridWords).every(w=>w==='SEIN'||v['found-'+w]==='1')})}/><output aria-live="polite">{'u2a' in graded?(graded.u2a?'✓ Richtig!':'Noch einmal'):''}</output></div>
 <div className="mText" style={{left:434,top:545,width:318}}><Words s="▪ Hallo, mein Name "/>{inkI('ist',19,'ist')}<Words s=" Lena und wie"/></div>{f('u2b-1',709,538,95)}{txt(808,545,30,'du?')}
 {txt(434,566,424,'▴ Hallo Lena, ich bin Jorgo, und das ist mein Bruder Wassili.')}
 {txt(434,587,68,'▪ Woher')}{f('u2b-2',504,580,96)}{txt(604,587,53,'ihr?')}{txt(434,608,220,'▴ Aus Griechenland.')}
 {txt(434,629,84,'▪ Und was')}{f('u2b-3',520,622,93)}{txt(618,629,230,'ihr hier in Österreich?')}
 {txt(434,650,40,'▴ Ich')}{f('u2b-4',480,643,128)}{txt(613,650,245,'an der Universität in Wien und')}
 {txt(454,671,51,'Wassili')}{f('u2b-5',509,664,116)}{txt(632,671,225,'als Programmierer. Und du?')}
 {txt(434,692,40,'▪ Ich')}{f('u2b-6',479,685,99)}{txt(582,692,124,'in Hamburg und')}{f('u2b-7',704,685,85)}{txt(793,692,52,'einen')}
 <div className="mText" style={{left:454,top:713,width:400}}><Words s="Job als Kellnerin. Wie viele Jahre "/>{inkI('wohnst',20,'wohnst')}<Words s=" du schon in"/></div>{txt(454,734,160,'Österreich?')}{txt(434,755,200,'▴ Zwei Jahre.')}
 {txt(434,776,195,'▪ Was! Nur zwei Jahre? Du')}{f('u2b-8',633,769,110)}{txt(748,776,124,'sehr gut Deutsch!')}{txt(434,797,160,'▴ Danke!')}{check('u2b',842,795)}
 {title('3',838,'Lesen Sie die Informationen zu Isabel und schreiben Sie Sätze mit nicht.')}{art('steckbrief',159,866,247,132)}
 <div className="mText" style={{left:434,top:895,width:405}}><Words s="a  Köln wohnen: "/>{inkI('isabel-satz',20,'Isabel wohnt nicht in Köln.')}</div>
 {['als Krankenschwester arbeiten:','verheiratet sein:','aus Österreich kommen:'].map((s,i)=><span key={s}>{txt(434,916+i*21,410,String.fromCharCode(98+i)+'  '+s)}{f('u3-'+String.fromCharCode(98+i),[684,576,631][i],909+i*21,[161,269,214][i])}</span>)}{check('u3',842,975)}
 {title('4',1029,'Was ist richtig? Markieren Sie.')}{art('ferdinand',779,1024,69,83)}{art('elena',707,1119,72,82)}
 <div className="mParagraph" style={{left:179,top:1057,width:596}}>Das ist Ferdinand. Er ist <span className="mP25Example">mein</span>/meine {inlineChoice(2,['Kollege','Kollegin'])}. Er ist auch {inlineChoice(3,['Journalist','Journalistin'])} von Beruf. Wir {inlineChoice(4,['arbeiten','arbeite'])} jetzt {inlineChoice(5,['als','bei'])} MEDIA.COM in Hamburg. Ferdinand {inlineChoice(6,['wohne','wohnt'])} allein, aber er {inlineChoice(7,['hast','hat'])} viele Freunde.</div>
 <div className="mParagraph" style={{left:179,top:1133,width:526}}>Das ist {inlineChoice(8,['mein','meine'])} {inlineChoice(9,['Chef','Chefin'])}. Sie {inlineChoice(10,['heiße','heißt'])} Elena Goldoni. Sie kommt {inlineChoice(11,['in','aus'])} Italien. Aber sie {inlineChoice(12,['lebt','lebst'])} vierzig Jahre {inlineChoice(13,['bei','in'])} Deutschland. Sie {inlineChoice(14,['spreche','spricht'])} perfekt Deutsch und Italienisch.</div>
 {check('u4',842,1178,Object.fromEntries(['Kollege','Journalist','arbeiten','bei','wohnt','hat','meine','Chefin','heißt','aus','lebt','in','spricht'].map((a,i)=>['u4-'+(i+2),a])))}
 <div className="mP25Footer">fünfundzwanzig&nbsp;&nbsp; | &nbsp;&nbsp;25 <em>Modul 1</em></div>
 </>})()}
 {page==='26'&&(()=>{
 const txt=(x:number,y:number,w:number,s:string,c='')=><div className={'mText '+c} style={{left:x,top:y,width:w}}><Words s={s}/></div>;
 const f=(id:string,x:number,y:number,w:number)=><ChoiceInput className="mField" data-native-field={id} aria-label={id} style={{left:x,top:y,width:w}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const rate=(id:string,y:number)=><>{[0,1,2].map(i=><ChoiceInput key={i} className="mRadio" type="radio" name={'p26-'+id} aria-label={'Selbsteinschätzung '+id+' '+['grün','gelb','rot'][i]} style={{left:762+i*32,top:y-7}} checked={v['confidence-'+id]===''+i} onChange={()=>set('confidence-'+id,''+i)}/>)}</>;
 const heading=(id:string,y:number,s:string,lesson:string)=><><div className="mText mP26Heading" style={{left:140,top:y,width:610}}><b><Words s={'… '+s}/></b>{'  '+lesson}</div>{rate(id,y+2)}</>;
 const area=(id:string,y:number)=><textarea className="mP26Area" data-native-field={id} aria-label={id} style={{left:168,top:y,width:544,height:42}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const c=(id:string,x:number,y:number)=><div className="mCheck" data-native-task={id} style={{left:x,top:y}}><CheckButton onClick={()=>G({...graded,[id]:Object.entries(answers(id)).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}/><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 return <>{txt(138,123,600,'SELBSTEINSCHÄTZUNG','mHeader')}{inkC('dkich',509,121,200,37,'Das kann ich!')}{txt(139,198,320,'Ich kann jetzt …','mBlue')}
 <PageImage className="mArt" alt="grün gelb rot" src="assets/native-ab11/p26-lights.png" style={{left:755,top:183,width:90,height:27}}/>
 {heading('s1',224,'andere begrüßen und mich verabschieden:','L01')}{txt(159,244,90,'Hallo/Guten')}{f('s1-1',244,236,458)}
 {heading('s2',282,'mich und andere vorstellen:','L01/L02/L03')}{txt(159,303,70,'Ich heiße')}{f('s2-name',225,296,106)}{txt(337,303,92,'Ich komme')}{f('s2-herkunft',416,296,158)}{txt(578,303,120,'und ich wohne')}{f('s2-wohnort',159,317,116)}{txt(282,324,92,'Ich spreche')}{f('s2-sprache',364,317,139)}
 {heading('s3',360,'nach dem Befinden fragen und über mein Befinden sprechen:','L01')}
 {txt(160,381,80,'du:  ▪ Wie')}{f('s3-1',237,374,190)}{txt(430,381,76,'? ▴ Danke,')}{f('s3-2',505,374,77)}{txt(586,381,65,'☺ Und')}{f('s3-3',638,374,52)}{txt(691,381,12,'?')}
 {txt(160,402,48,'Sie:  ●','mP26Sie')}{f('s3-4',208,395,244)}{txt(454,402,12,'?')}{txt(195,423,18,'▪')}{f('s3-5',209,416,233)}{txt(444,423,65,'☹ Und')}{f('s3-6',501,416,138)}{txt(644,423,12,'?')}{c('s3',720,421)}
 {heading('s4',460,'nachfragen und buchstabieren:','L01')}{txt(160,481,430,'▪ Mein Name ist Chanya Ndiaye.')}{txt(160,502,18,'▴')}{f('s4-1',176,495,199)}{txt(378,502,14,'?')}{txt(160,523,45,'▪ Ich')}{f('s4-2',201,516,146)}{txt(351,523,170,': C-H-A-N- …')}{c('s4',720,521)}
 {heading('s5',556,'nach dem Beruf fragen und über meinen Beruf sprechen:','L02')}{txt(162,577,130,'▪ Was bist du von')}{f('s5-1',282,570,125)}{txt(409,577,54,'? ▴ Ich')}{f('s5-antwort',464,570,244)}{c('s5',720,579)}
 {heading('s6',618,'über Persönliches sprechen:','L02')}
 {['Familienstand: Ich bin','Kinder: Ich','Alter: Ich'].map((s,i)=><span key={s}>{txt(165,638+i*21,170,s)}{f('s6-'+i,[317,240,231][i],631+i*21,[298,375,384][i])}</span>)}
 {heading('s7',716,'meine Familie beschreiben:','L03')}{txt(165,737,90,'Das ist/sind')}{f('s7-person',243,730,318)}{f('s7-name',165,751,115)}{txt(285,758,90,'kommt aus')}{f('s7-herkunft',360,751,180)}{txt(544,758,110,'und wohnt in')}{f('s7-ort',165,772,193)}
 {txt(146,823,320,'Ich kenne …','mBlue')}{heading('k1',847,'5 Länder und Sprachen:','L01/L03')}{area('k1-eigen',864)}
 {heading('k2',928,'5 Berufe:','L02')}{area('k2-eigen',944)}
 {heading('k3',1008,'die Zahlen bis 100:','L02')}
 {['10','17','23','38','40','50','60','70','80','90','100'].map((s,i)=>{const x=[168,297,431,566][i%4],y=1027+Math.floor(i/4)*21;return <span key={s}>{txt(x,y,32,s)}{i<2?inkC(i===0?'zehn':'siebzehn',i===0?185:311,y+1,i===0?52:72,i===0?23:25,i===0?'zehn':'siebzehn'):f('z-'+s,x+(s==='100'?29:20),y-7,i===10?101:109)}</span>})}{c('k3',720,1068)}
 {heading('k4',1107,'10 Familienmitglieder:','L03')}{area('k4-eigen',1126)}
 <div className="mP26Footer"><em>Modul 1</em>26&nbsp; | &nbsp;sechsundzwanzig</div>
 </>})()}
 {page==='27'&&(()=>{
 const txt=(x:number,y:number,w:number,s:string,c='')=><div className={'mText '+c} style={{left:x,top:y,width:w}}><Words s={s}/></div>;
 const f=(id:string,x:number,y:number,w:number)=><ChoiceInput className="mField" data-native-field={id} aria-label={id} style={{left:x,top:y,width:w}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const art=(n:string,x:number,y:number,w:number,h:number)=><PageImage className="mArt" alt={'Originalabbildung '+n} src={'assets/native-ab11/p27-'+n+'.png'} style={{left:x,top:y,width:w,height:h}}/>;
 const rate=(id:string,y:number)=><>{[0,1,2].map(i=><ChoiceInput key={i} className="mRadio" type="radio" name={'p27-'+id} aria-label={'Selbsteinschätzung '+id+' '+['grün','gelb','rot'][i]} style={{left:755+i*32,top:y}} checked={v['confidence-'+id]===''+i} onChange={()=>set('confidence-'+id,''+i)}/>)}</>;
 const heading=(id:string,y:number,s:string,l:string)=><><div className="mText" style={{left:135,top:y,width:680}}><b><Words s={'… '+s}/></b>{'  '+l}</div>{rate(id,y+1)}</>;
 const c=(id:string,x:number,y:number,expected=answers(id))=><div className="mCheck" data-native-task={id} style={{left:x,top:y}}><CheckButton onClick={()=>G({...graded,[id]:Object.entries(expected).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}/><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const area=(id:string,x:number,y:number,w:number,h:number,deg=0)=><textarea className="mP27Area" data-native-field={id} aria-label={id} style={{left:x,top:y,width:w,height:h,transform:`rotate(${deg}deg)`}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 return <>{txt(132,123,600,'SELBSTEINSCHÄTZUNG','mHeader')}{art('dkich-ink',502,120,176,40)}<div className="mP27Module"/>{txt(134,198,320,'Ich kann auch …','mBlue')}
 <PageImage className="mArt" alt="grün gelb rot" src="assets/native-ab11/p26-lights.png" style={{left:749,top:185,width:90,height:27}}/>
 {heading('s8',223,'W-Fragen stellen und auf Fragen antworten:','L01/L02/L03')}
 {['heißt ihr?','kommen Madita und Mia?','sprichst du?','wohnen Sie?','ist das?'].map((s,i)=>{const y=243+i*20,x=[361,467,375,377,379][i],w=[199,133,165,250,265][i];return <span key={s}>{txt(154,y,16,'▪')}{f('s8-'+(i+1)+'q',168,y-7,[100,100,100,100,133][i])}{txt(i===4?305:272,y,220,s)}{txt(x-15,y,15,'▴')}{f('s8-'+(i+1)+'a',x,y-7,w)}{txt(x+w+4,y,220,['Sandra und Simone.','aus Schweden.','Spanisch und Englisch.','in Madrid.','ist Pedro.'][i])}</span>})}
 {c('s8',704,329,{...answers('s8'),'s8-3q':'Was|Welche Sprachen'})}
 {heading('s9',361,'Aussagen verneinen (Negation):','L02')}{txt(154,382,110,'Markus wohnt')}{f('s9-1',252,375,118)}{txt(374,382,95,'in Köln und')}{txt(154,403,25,'ist')}{f('s9-2',176,396,104)}{txt(284,403,130,'verheiratet.')}{art('markus-ink',485,365,139,55)}{c('s9',704,403)}
 {heading('s10',440,'nach Familienmitgliedern fragen und sie benennen (Possessivartikel):','L03')}
 {txt(154,460,85,'▴ Sind das')}{art('deine-ink',231,450,57,25)}{txt(288,460,70,'Eltern?')}{txt(353,460,96,'▪ Ja, das sind')}{f('s10-1',446,453,82)}{txt(533,460,93,'Eltern. Das ist')}{f('s10-2',628,453,69)}{txt(366,480,125,'Mutter und das ist')}{f('s10-3',490,473,73)}{txt(568,480,90,'Vater.')}{c('s10',704,477)}
 {heading('s11',519,'Ja-/Nein-Fragen stellen und mit ja/nein/doch antworten:','L03')}
 {txt(154,540,17,'▪')}{f('s11-1q',169,533,72)}{txt(245,540,210,'das deine Eltern?')}{txt(154,560,43,'☺ ▴')}{f('s11-1a',195,553,161)}{txt(366,560,38,'☹ ▴')}{f('s11-1b',403,553,158)}
 {txt(154,580,17,'▪')}{f('s11-2q',169,573,62)}{txt(235,580,330,'dein Bruder nicht verheiratet?')}{txt(154,600,43,'☺ ▴')}{f('s11-2a',195,593,161)}{txt(366,600,38,'☹ ▴')}{f('s11-2b',403,593,158)}{c('s11',704,599)}
 {txt(135,643,640,'Üben / Wiederholen möchte ich noch …','mBlue')}{area('ueben',135,662,557,22)}
 {txt(136,716,650,'RÜCKBLICK','mP27Back')}
 <div className="mP27Banner">Wählen Sie eine Aufgabe zu Lektion <mark>1</mark><i/></div>
 {art('find-icon',106,810,20,21)}<div className="mP27Number" style={{top:811}}>1</div>{txt(170,808,700,'Wer ist das? Sehen Sie im Kursbuch auf den Seiten 9 und 10 nach und schreiben Sie.','mTitle')}
 {art('nicole-source',171,840,102,100)}{art('paco-source',364,837,98,91)}{art('wachter-source',564,834,105,89)}{art('ex1-ink',146,935,575,100)}
 {f('r1-1a',202,951,94)}{f('r1-1b',261,972,38)}{f('r1-2a',397,937,110)}{f('r1-2b',388,958,119)}{f('r1-3a',578,933,136)}{f('r1-3b',578,954,136)}{c('r1',748,988)}{area('r1-person-0',162,988,137,22,-6)}{area('r1-person-1',369,982,139,22)}{area('r1-person-2',578,933,136,65)}
 {art('photo-icon',103,1052,24,28)}<div className="mP27Number" style={{top:1055}}>2</div>{txt(170,1052,700,'Suchen Sie Fotos. Wer ist das? Stellen Sie die Personen vor.','mTitle')}{art('mesut',172,1083,102,119)}{art('ex2-ink',294,1094,420,90)}
 {area('r2-left',307,1141,143,22,-7)}{area('r2-personen',558,1117,133,65)}
 <div className="mP27Footer">siebenundzwanzig&nbsp; | &nbsp;27 <em>Modul 1</em></div>
 </>})()}
 {page==='28'&&(()=>{
 const txt=(x:number,y:number,w:number,s:string,c='')=><div className={'mText '+c} style={{left:x,top:y,width:w}}><Words s={s}/></div>;
 const f=(id:string,x:number,y:number,w:number)=><ChoiceInput className="mField" data-native-field={id} aria-label={id} style={{left:x,top:y,width:w}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const art=(n:string,x:number,y:number,w:number,h:number)=><PageImage className="mArt" alt={'Originalabbildung '+n} src={'assets/native-ab11/p28-'+n+'.png'} style={{left:x,top:y,width:w,height:h}}/>;
 const title=(n:string,y:number,s:string,photo=false)=><>{art(photo?'photo-icon':'find-icon',104,y,24,26)}<div className="mP28Number" style={{top:y+2}}>{n}</div>{txt(170,y,700,s,'mTitle')}</>;
 const banner=(y:number,n:string)=><div className={'mP28Banner lesson'+n} style={{top:y}}>Wählen Sie eine Aufgabe zu Lektion <mark>{n}</mark><i/></div>;
 const area=(id:string,x:number,y:number,w:number,h:number)=><textarea className="mP28Area" data-native-field={id} aria-label={id} style={{left:x,top:y,width:w,height:h}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const c=(id:string,x:number,y:number,test=()=>Object.entries(answers(id)).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||''))))=><div className="mCheck" data-native-task={id} style={{left:x,top:y}}><CheckButton onClick={()=>G({...graded,[id]:test()})}/><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 return <>{txt(133,134,650,'RÜCKBLICK','mHeader')}{banner(205,'2')}{title('1',247,'Was ist richtig? Kreuzen Sie an und vergleichen Sie mit dem Kursbuch auf Seite 78.')}
 <div className="mP28Table"><div/>{['Helga Stiemer','Carlos','Sonja','Bo Martinson'].map(n=><div key={n}>{n}</div>)}{['Sie arbeiten nicht.','Sie sind nicht verheiratet.','Sie kommen nicht aus Deutschland.','Er hat keine Kinder.','Er wohnt in Essen.','Sie wohnt in Leipzig.'].map((s,r)=><span className="mP28TableRow" key={s}><div>{String.fromCharCode(97+r)}&nbsp; {s}</div>{['helga','carlos','sonja','bo'].map((person,c)=>{const id='t-'+String.fromCharCode(97+r)+'-'+person;return <div key={id}><ChoiceInput type="checkbox" className="mP28Pick" data-native-field={id} aria-label={s+' '+person} checked={r===0&&c<2||v[id]==='true'} disabled={r===0&&c<2} onChange={e=>set(id,''+e.target.checked)}/>{(r===0&&c<2||v[id]==='true')&&<i className="mP28X">X</i>}</div>})}</span>)}</div>
 {c('t1',841,431,()=>data.fields.filter(f=>f.group==='t1').every(f=>(f.id==='t-a-helga'||f.id==='t-a-carlos'?'true':v[f.id]||'false')===f.answer))}
 {title('2',480,'Wählen Sie eine Kursteilnehmerin / einen Kursteilnehmer oder einen\nProminenten. Ergänzen Sie den Steckbrief und schreiben Sie einen Text.',true)}
 {art('steckbrief',170,538,191,209)}{['Vorname','Familienname','Herkunft','Wohnort','Beruf','Alter','Familienstand','Kinder'].map((s,i)=>f('r22-'+i,284,575+i*21,116))}{art('text-ink',416,554,151,94)}{area('r22-text',415,620,391,151)}
 {banner(802,'3')}{title('1',840,'Lesen Sie den Stammbaum im Kursbuch auf Seite 19. Was sagt Olga?')}{art('olga',750,850,93,136)}
 {txt(177,874,400,'„Ich bin Olga. Das ist mein Mann. Er heißt')}{f('o-1',489,867,149)}{txt(639,874,12,'.')}
 {txt(177,905,135,'Ich habe zwei')}{f('o-2',281,898,106)}{txt(388,905,12,'.')}
 {txt(177,937,135,'Meine Tochter')}{f('o-3',285,930,244)}{txt(534,937,110,'und mein')}{f('o-4',177,954,256)}{txt(436,960,20,'“')}{c('r31',696,957)}
 {title('2',1011,'Ihre Familie. Was sagt Ihre Mutter / Ihr Bruder …? Schreiben Sie.',true)}{art('family-ink',190,1077,234,97)}{area('r32-text',370,1067,350,122)}
 <div className="mP28Footer"><em>Modul 1</em>28&nbsp; | &nbsp;achtundzwanzig</div>
 </>})()}
 {txt(Number(page)%2?704:48,1254,Number(page)%2?190:400,Number(page)%2?({'21':'einundzwanzig','23':'dreiundzwanzig','25':'fünfundzwanzig','27':'siebenundzwanzig'} as Record<string,string>)[page]+' | '+page+'  Modul 1':'Modul 1   '+page+' | '+({'20':'zwanzig','22':'zweiundzwanzig','24':'vierundzwanzig','26':'sechsundzwanzig','28':'achtundzwanzig'} as Record<string,string>)[page],'mFooter')}
 </div><audio className="nabPlayer" ref={audio} controls hidden aria-label="Originalaudio Arbeitsbuch"/></div>;
}
