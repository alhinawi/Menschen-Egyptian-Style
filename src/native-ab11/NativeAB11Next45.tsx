import {CheckButton} from '../components/CheckButton';
import {PageImage} from '../components/PageImage';
import {usePageReset} from '../exercises/usePageReset';
import {LineMatching} from '../exercises/LineMatching';
import {useLayoutEffect,useRef,useState} from 'react';
import {scanData} from '../scan-data/registry';
import './native-ab11.css';
import './native-ab11-lessons45.css';
const norm=(s:string)=>s.normalize('NFC').toLocaleLowerCase('de').trim().replace(/[.,!?;:’']/g,'').replace(/\s+/g,' ');
function Words({s}:{s:string}){return <>{s.split(/(\s+)/).map((w,i)=>/\S/.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-phrase={s} data-word={w.replace(/^[.,!?„"()]+|[.,!?“"()]+$/g,'')}>{w}</span>:w)}</>}
export function NativeAB11Next45({page}:{page:string}){
 const host=useRef<HTMLDivElement>(null),audio=useRef<HTMLAudioElement>(null),[scale,SS]=useState(1),[,T]=useState(''),[v,S]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem('native-ab11-'+page)||'{}')}catch{return {}}}),[graded,G]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const measure=()=>SS(Math.min(el.clientWidth/901,el.clientHeight/1275));measure();const ro=new ResizeObserver(measure);ro.observe(el);return()=>ro.disconnect()},[]);
 usePageReset(page,'native-ab11-'+page,()=>{S({});G({});A({})});
 const set=(id:string,value:string)=>{const next={...v,[id]:value};S(next);localStorage.setItem('native-ab11-'+page,JSON.stringify(next));G({})};
 const sy=page==='39'?.76:page==='40'?.75:.83;const Y=(y:number)=>130+(y-130)*sy;
 const txt=(x:number,y:number,w:number,s:string,cls='')=><div className={'mText '+cls} style={{left:x,top:cls==='mFooter'?y:Y(y),width:w}}><Words s={s}/></div>;
 const hints:Record<string,string>={'u9-schwarz':'s_____z','u9-rot':'r_t','u9-gelb':'g__b','u9-orange':'o____e','u9-eckig':'e___g','u9-weiss':'w__ß','u9-blau':'b__u','u9-gruen':'g__n','u9-braun':'b___n','u9-rund':'r__d','t4-a':'w__ h____ d__','t4-b':'d__ i__','t4-c':'W__ b____','t4-d':'w__ s_______ m__','t4-e':'D___','t4-f':'P______'};
 const f=(id:string,x:number,y:number,w:number,label=id)=>{const ctx=document.createElement('canvas').getContext('2d');if(ctx)ctx.font="18px 'Times New Roman'";const size=Math.max(10,Math.min(18,18*(w-5)/(ctx?.measureText(v[id]||'').width||1)));return <input placeholder={hints[id]} className="mField" data-native-field={id} aria-label={label} style={{left:x,top:Y(y),width:w,height:22*sy,fontSize:size}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>};
 const open=(id:string,x:number,y:number,w:number,h:number,label=id)=><textarea className="mField mOpen" data-native-field={id} aria-label={label} style={{left:x,top:Y(y),width:w,height:h*sy,'--mopen-height':h*sy+'px'} as React.CSSProperties} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="mArt" alt={'Originalabbildung '+name} src={`assets/native-ab11/p${page}-${name}.png`} style={{left:x,top:Y(y),width:w,height:h*sy}}/>;
 const title=(n:string,y:number,s:string,kb='',x=132,w=700)=><>{kb&&txt(96,y+5,34,kb,'mKB')}<div className={'mNumber '+''} style={{left:x,top:Y(y)}}>{n}</div>{txt(x+35,y,w-35,s,'mTitle')}</>;
 const head=(s:string)=><>{txt(132,135,740,s,'mHeader')}<div className="mRule"/></>;
 const data=scanData['ab-a11:'+page];
 const answers=(group:string)=>Object.fromEntries(data.fields.filter(f=>f.group===group&&f.kind!=='radio'&&f.kind!=='checkbox'&&f.answer!==undefined).map(f=>[f.id,f.answer!]));
 const check=(id:string,x:number,y:number,expected=answers(id))=><div className="mCheck" data-native-task={id} style={{left:x,top:Y(y)}}><CheckButton onClick={()=>G({...graded,[id]:Object.entries(expected).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}></CheckButton><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const rule=(id:string,x:number,y:number,test:()=>boolean)=><div className="mCheck" data-native-task={id} style={{left:x,top:Y(y)}}><CheckButton onClick={()=>G({...graded,[id]:test()})}></CheckButton><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const listen=(n:string,x:number,y:number,t?:string)=><button className="mListen" data-task={t} aria-label={'Originalaudio 1 '+n} style={{left:x,top:Y(y)}} onClick={()=>{T(n);if(audio.current){audio.current.src='assets/ab-cd1-track'+n+'.mp3';audio.current.play().catch(()=>{})}}}>▶ 1 {n}</button>;
 const radio=(id:string,val:string,x:number,y:number,label:string)=><input className="mRadio" type="radio" data-value={val} name={'native-ab11-'+page+'-'+id} aria-label={label} style={{left:x,top:Y(y)}} checked={v[id]===val} onChange={()=>set(id,val)}/>;
 const score=(y:number,rows:string[][])=><div className="mScore" style={{left:168,top:Y(y)}}><b>Wörter</b><b>Strukturen</b><b>Kommunikation</b>{rows.map((row,r)=>row.map((s,c)=><div key={r+'-'+c}><i style={{background:['#d71910','#edcf00','#3b9e24'][r]}}/>{s} Punkte</div>))}</div>;
 const [active,A]=useState<Record<string,number>>({});
 const match=(id:string,left:string[],right:string[],expected:number[],x:number,y:number,w:number,step=29)=> <><LineMatching id={id} left={left} right={right} values={v} onMatch={set} leftX={x} rightX={x+w*.58} leftWidth={w*.42-12} rightWidth={w*.42} ys={left.map((_,i)=>Y(y+i*step))} rightYs={right.map((_,i)=>Y(y+i*step))} width={1075} height={1521} fontSize={18} example={[0,expected[0]]}/>{rule(id,x,y+left.length*step+9,()=>id==='u11a'?v[id+'-3']==='1'&&new Set([v[id+'-1'],v[id+'-2']]).size===2&&[v[id+'-1'],v[id+'-2']].every(s=>s==='0'||s==='3'):expected.every((j,i)=>i===0||v[id+'-'+i]===''+j))}</>;
 const colorChip=(id:string,x:number,y:number,shape='round')=><button className={'mColorChip '+shape} aria-label={id+' Farbe wählen'} style={{left:x,top:Y(y),background:v[id]||'white'}} onClick={()=>set(id,['white','black','#e83d2d','#efcf21','#ed8825','#2772bd','#47994b','#9a6030'][(['white','black','#e83d2d','#efcf21','#ed8825','#2772bd','#47994b','#9a6030'].indexOf(v[id]||'white')+1)%8])}/>;
 const stress=(id:string,x:number,y:number,s:string)=><div className="mStressSentence" style={{left:x,top:Y(y)}}>{s.split(' ').map((w,i)=><span key={i}><button className={norm(v[id]||'')===norm(w)?'stressed':''} aria-label={id+' '+w} onClick={()=>set(id,w)}>{w}</button>{' '}</span>)}</div>;
 const [snakeStart,SN]=useState<number|null>(null);const snake='EFAMBLAUETUGINFEUERZEUGALVIECKIGUNTSEIFELUGEKUNSTSTOFFAVIRBORANGEWERRUNDUMOMETALLABIN';
 const snakeClick=(at:number)=>{if(snakeStart===null){SN(at);return}const lo=Math.min(snakeStart,at),hi=Math.max(snakeStart,at),key='snake-'+lo+'-'+hi;set(key,v[key]==='1'?'0':'1');SN(null)};
 return <div className="nativeAB11 nativeAB11Module1 nativeAB11Lessons45 nativeAB11Next45" ref={host} data-native-ab11-page={page}><div className="nabCanvas mCanvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='38'&&<>
 {head('BASISTRAINING')}{title('9',210,'Ergänzen und malen Sie die Farben und Formen.','KB 3')}
 {['schwarz','rot','gelb','orange','eckig','weiss','blau','gruen','braun','rund'].map((id,i)=>{const x=i<5?168:518,y=257+(i%5)*29;return <span key={id}>{f('u9-'+id,x,y,145)}{i===0||id==='eckig'||id==='rund'?<i className={'mColorChip '+(id==='eckig'?'square':'round')} style={{left:x+159,top:Y(y),background:i===0?'black':'white'}}/>:colorChip('farbe-'+id,x+159,y,id==='eckig'?'square':'round')}</span>})}{rule('u9',168,415,()=>Object.entries(answers('u9')).every(([id,a])=>norm(v[id]||'')===norm(a))&&Object.entries({rot:'#e83d2d',gelb:'#efcf21',orange:'#ed8825',weiss:'white',blau:'#2772bd',gruen:'#47994b',braun:'#9a6030'}).every(([id,color])=>(v['farbe-'+id]||'white')===color))}
 {title('10',463,'Beschreiben Sie die Produkte.','KB 5')}
 {txt(168,505,650,'a  Super-Regenschirm - schwarz - sehr groß - neu - € 30')}{txt(188,535,595,'Der Regenschirm ist schwarz, sehr groß und neu. Er kostet 30 Euro.','mExample')}{art('umbrella',684,479,126,102)}
 {['b  Sessel Luxor - rot - fünf Jahre alt - € 50','c  Tasche - Kunststoff - orange - sehr praktisch - neu - € 78','d  Uhr - braun - sehr modern - € 37','e  Lampe - schwarz - Plastik - zwei Jahre alt - € 12'].map((s,i)=>{const y=592+i*75;return <span key={s}>{txt(168,y,650,s,'mSmall')}{open('u10-'+String.fromCharCode(98+i),188,y+25,530,44,'10 '+String.fromCharCode(98+i)+' eigene Beschreibung')}{art(['armchair','bag','watch','lamp'][i],748,y-3,84,72)}</span>})}
 {title('11',925,'Wie schreibt man das?','KB 6')}{txt(143,962,650,'a  Ordnen Sie zu.','mTitle')}
 {match('u11a',['Wie','Wie','Wie','Bitteschön,'],['heißt das auf Deutsch?','kein Problem.','schreibt man das?','bitte?'],[2,0,3,1],168,1000,660,27)}
 {txt(143,1156,650,'b  Ergänzen Sie das Gespräch mit Wendungen aus a.','mTitle')}
 {txt(168,1194,180,'▪ Entschuldigung.')}{f('u11b-1',354,1192,475)}{txt(168,1223,650,'▴ Das ist eine Zeitung!')}{txt(168,1252,650,'▪ Wie schreibt man das?','mExample')}{txt(168,1281,650,'▴ Z-E-I-T-U-N-G')}
 {txt(168,1310,130,'▪ Z-E-I- …')}{f('u11b-2',302,1308,475)}{txt(784,1310,25,'?')}{txt(168,1339,650,'▴ Z-E-I-T-U-N-G …')}{txt(168,1368,650,'▪ Vielen Dank.')}{txt(168,1397,20,'▴')}{f('u11b-3',191,1395,636)}{check('u11b',168,1431,Object.fromEntries(data.fields.filter(f=>f.id.startsWith('u11b-')).map(f=>[f.id,f.answer!])))}
 </>}
 {page==='39'&&<>
 {head('TRAINING: SCHREIBEN')}<div className="nabModule">5</div>{title('1',210,'Formulare. Ordnen Sie zu.')}
 {txt(168,253,660,'Beruf | Familienname | Straße | Vorname | E-Mail | Ort | PLZ | Telefon','mBank')}
 {txt(429,321,210,'Paul Paulsen','mExample')}{txt(429,352,240,'Diplom-Ingenieur\nResselstr.15\n6020 Innsbruck\n0043 / 676 - 37 20 207\npaul@paul.at')}
 {f('f-vorname',168,316,190)}{f('f-beruf',168,347,190)}{txt(168,393,190,'PLZ','mExample')}{f('f-telefon',168,424,190)}
 {['familienname','strasse','ort','email'].map((id,i)=>f('f-'+id,706,[280,311,342,456][i],150))}
 <svg className="mFormLines" style={{position:'absolute',left:358,top:Y(280),width:350,height:210*sy,pointerEvents:'none'}} viewBox="0 0 350 210"><path d="M0 39 L65 44 M0 70 L65 75 M0 116 L65 106 M0 147 L65 137 M200 44 L345 0 M205 75 L345 31 M230 106 L345 62 M187 168 L345 176" stroke="#999" fill="none"/></svg>
 {check('f1',168,500)}{txt(188,549,615,'Sie müssen oft Ihre Adresse sagen oder die Adresse von anderen\nverstehen. Achten Sie besonders auf Wörter wie Ort, Postleitzahl …\nSo verstehen Sie wichtige Informationen.','mSmall mTip')}
 {title('2',657,'Lesen Sie die Informationen über Jurj Kulintsev und ergänzen Sie die Kundenkarte.')}{art('portrait',168,703,95,104)}
 {txt(281,706,558,'Jurj Kulintsev kommt aus Russland. Jetzt wohnt er zusammen mit seiner\nFrau in der Schweiz, in der Helvetiastraße 18 in 3005 Bern. Er hat eine\nAusbildung als Informatiker und arbeitet jetzt als Programmierer bei\nDATNET. Er findet Bern sehr schön.','mSmall')}
 {txt(180,838,634,'KAUFHAUS KAUFGUT','mCardHeader')}{txt(180,873,600,'Antrag auf eine Kundenkarte:','mSmall')}{radio('k-anrede','Herr',180,902,'Herr')}{txt(205,900,62,'Herr','mSmall')}{radio('k-anrede','Frau',270,902,'Frau')}{txt(295,900,62,'Frau','mSmall')}
 {txt(180,932,75,'Name:','mSmall')}{txt(261,932,180,'Kulintsev','mExample')}{txt(180,963,75,'Vorname:','mSmall')}{f('k-vorname',261,961,174)}{txt(180,994,75,'Straße:','mSmall')}{f('k-strasse',261,992,174)}
 {txt(470,932,85,'PLZ, Ort:','mSmall')}{f('k-plzort',560,930,252)}{txt(470,963,85,'Beruf:','mSmall')}{f('k-beruf',560,961,252)}{txt(470,994,85,'E-Mail:','mSmall')}{txt(560,994,252,'jurj.kulintsev@web.ch','mExample')}
 {rule('f2',180,1037,()=>v['k-anrede']==='Herr'&&Object.entries(answers('f2')).every(([id,a])=>norm(v[id]||'')===norm(a)))}
 {txt(132,1090,710,'TRAINING: AUSSPRACHE','mHeader')}{txt(555,1101,270,'Satzakzent','mSmall')}
 {title('1',1145,'Hören Sie und kreuzen Sie in der\nRegel an.','',132,345)}{listen('23',96,1145,'1')}
 <div className="mPrintedStress" style={{left:168,top:Y(1210)}}>{[['a  ▪ Was ','ist',' das? ↘'],['   ▴ Das ist eine ','Kette','. ↘'],['   ▪ Wie ','schreibt',' man das? ↘'],['   ▴ Mit zwei ','Te','. ↘'],['','',''],['b  ▪ Und was ist ','das','? ↗ Ist das eine ','Kette','? ↗'],['   ▴ ','Nein','. ↘ Das ist keine ','Kette',', →'],['     das ist ein ','Ring','. ↘']].map((row,i)=><div key={i}>{row.map((s,j)=><span key={j} className={(j%2===1?'marked ':'')+'tapWord'} data-word={s.trim()} data-phrase={row.join('')} role="button" tabIndex={0}>{s}</span>)||' '}</div>)}</div>
 {txt(168,1450,330,'Der Satzakzent ist','mTitle')}{radio('regel','letztes-wort',168,1482,'immer auf dem letzten Wort.')}{txt(194,1480,300,'immer auf dem letzten Wort.','mSmall')}{radio('regel','wichtige-info',168,1510,'auf der wichtigen oder neuen Information.')}{txt(194,1508,340,'auf der wichtigen oder neuen Information.','mSmall')}{rule('au1',168,1541,()=>v.regel==='wichtige-info')}
 {title('2',1145,'Markieren Sie den Satzakzent.','',532,325)}{listen('24',494,1145,'1')}{txt(567,1180,290,'Hören Sie dann und vergleichen Sie.','mSmall')}{txt(567,1210,282,'a  Wie heißt das auf Deutsch?','mExample')}
 {['b  Das ist eine Uhr.','c  Sie ist aus Plastik.','d  Ist das eine Seife?','e  Das ist keine Seife, das ist eine Brille.'].map((s,i)=>stress('au2-'+String.fromCharCode(98+i),567,1242+i*34,s))}{rule('au2',567,1390,()=>['Uhr','Plastik','Seife','Brille'].every((a,i)=>norm(v['au2-'+String.fromCharCode(98+i)]||'')===norm(a)))}
 {listen('25',494,1435,'1')}{txt(567,1435,285,'Hören Sie noch einmal und sprechen\nSie nach.','mSmall')}
 </>}
 {page==='40'&&<>
 {head('TEST')}{title('1',210,'Markieren Sie und ordnen Sie zu.')}
 <div className="mSnake" style={{left:168,top:Y(253),width:670}}>{snake.split('').map((s,i)=>{const marked=(i>=4&&i<=7)||Object.keys(v).some(k=>{if(!k.startsWith('snake-')||v[k]!=='1')return false;const [,a,b]=k.split('-').map(Number);return i>=a&&i<=b});return <button key={i} className={(marked?'marked ':'')+(snakeStart===i?'active':'')} aria-label={'Buchstabenschlange '+i+' '+s} onClick={()=>snakeClick(i)}>{s}</button>})}</div>
 {txt(168,322,100,'Farben:')}{txt(274,322,115,'blau','mExample')}{f('t1-farben',398,320,120)}{txt(168,357,100,'Formen:')}{f('t1-formen-1',274,355,115)}{f('t1-formen-2',398,355,120)}
 {txt(540,322,145,'Gegenstände:')}{f('t1-gegenstaende-1',685,320,90)}{f('t1-gegenstaende-2',786,320,90)}{txt(540,357,140,'Materialien:')}{f('t1-materialien-1',685,355,90)}{f('t1-materialien-2',786,355,90)}
 {rule('t1',168,397,()=>norm(v['t1-farben']||'')==='orange'&&[['formen',['eckig','rund']],['gegenstaende',['Feuerzeug','Seife']],['materialien',['Kunststoff','Metall']]].every(([key,words])=>(words as string[]).every(a=>[v['t1-'+key+'-1'],v['t1-'+key+'-2']].map(s=>norm(s||'')).includes(norm(a))))&&Object.keys(v).filter(k=>k.startsWith('snake-')&&v[k]==='1').length===7&&['FEUERZEUG','ECKIG','SEIFE','KUNSTSTOFF','ORANGE','RUND','METALL'].every(word=>{const i=snake.indexOf(word);return v['snake-'+i+'-'+(i+word.length-1)]==='1'}))}
 {title('2',443,'Kreuzen Sie an.')}{txt(650,480,180,'richtig      falsch','mSmall')}
 {['Familienname:|Maria','Postleitzahl:|6003','Wohnort:|Luzern','Straße:|Bahnhofstr.','Geburtsdatum:|3066','E-Mail:|eva111@t-on.ch'].map((s,i)=>{const y=515+i*32,a=s.split('|');return <span key={s}>{txt(168,y,25,String.fromCharCode(97+i),'mSmall')}{txt(198,y,175,a[0],'mBank')}{txt(380,y,230,a[1])}{['richtig','falsch'].map((val,j)=>i===0?<i className={'mPrintedRadio '+(j===1?'selected':'')} style={{left:662+j*79,top:Y(y)}}/>:radio('t2-'+String.fromCharCode(97+i),val,662+j*79,y,val))}</span>})}{rule('t2',168,720,()=>['richtig','richtig','richtig','falsch','richtig'].every((a,i)=>v['t2-'+String.fromCharCode(98+i)]===a))}
 {title('3',766,'Ergänzen Sie ein/eine/kein/keine.')}
 {txt(168,810,330,'a  ▪ Danke für die Hilfe.\n   ▴ Bitte, das ist kein Problem.','mSmall mExample')}
 {txt(168,877,300,'b  ▪ Wer ist Amelie?','mSmall')}{txt(188,906,65,'▴ Sie ist','mSmall')}{f('t3-b',257,904,95)}{txt(358,906,150,'Freundin von','mSmall')}{txt(188,935,160,'Sarah.','mSmall')}
 {txt(168,977,300,'c  ▪ Hier ist der Bleistift.','mSmall')}{txt(188,1006,150,'▴ Das ist doch','mSmall')}{f('t3-c1',343,1004,85)}{txt(433,1006,95,'Bleistift, das','mSmall')}{txt(188,1035,21,'ist','mSmall')}{f('t3-c2',215,1033,85)}{txt(306,1035,195,'Kugelschreiber!','mSmall')}{txt(168,1064,300,'▪ Oh, Entschuldigung.','mSmall')}
 {txt(545,810,310,'d  ▪ Wie heißt das Wort? „Doch“ oder\n   „noch“?','mSmall')}{txt(565,868,120,'▴ „Noch“. Das ist','mSmall')}{f('t3-d',690,866,72)}{txt(768,868,65,'„n“.','mSmall')}
 {txt(545,922,310,'e  ▪ Was kostet die Tasche?','mSmall')}{txt(565,951,80,'▴ Das ist','mSmall')}{f('t3-e1',651,949,87)}{txt(744,951,105,'Tasche, das ist','mSmall')}{f('t3-e2',565,978,87)}{txt(658,980,175,'Geldbörse.','mSmall')}
 {txt(545,1035,310,'f  ▪ Wie heißt das auf Deutsch?','mSmall')}{txt(565,1064,80,'▴ Das ist','mSmall')}{f('t3-f',651,1062,87)}{txt(744,1064,110,'Fotoapparat.','mSmall')}{check('t3',168,1108)}
 {title('4',1156,'Was sagen die Personen? Ergänzen Sie.')}
 {txt(168,1200,280,'▪ Entschuldigung, „a biro“,','mSmall')}{f('t4-a',451,1198,240)}{txt(697,1200,160,'auf Deutsch? (a)','mSmall')}
 {txt(168,1230,42,'▴ Ah,','mSmall')}{f('t4-b',216,1228,105)}{txt(326,1230,230,'ein Kugelschreiber. (b)','mSmall')}{txt(168,1260,20,'▪','mSmall')}{f('t4-c',192,1258,165)}{txt(364,1260,65,'? (c)','mSmall')}{txt(168,1290,400,'▴ Ein Kugelschreiber.','mSmall')}
 {txt(168,1320,330,'▪ Ah, danke. Und noch eine Frage,','mSmall')}{f('t4-d',505,1318,240)}{txt(751,1320,95,'das? (d)','mSmall')}{txt(168,1350,600,'▴ K-U-G-E-L-S-C-H-R-E-I-B-E-R','mSmall')}
 {txt(168,1380,90,'▪ Vielen','mSmall')}{f('t4-e',262,1378,109)}{txt(377,1380,100,'! (e)','mSmall')}{txt(168,1410,131,'▴ Bitte, kein','mSmall')}{f('t4-f',305,1408,153)}{txt(464,1410,100,'! (f)','mSmall')}{check('t4',168,1448)}
 {score(1490,[['0-6','0-3','0-3'],['7-9','4-5','4'],['10-12','6-7','5-6']])}
 </>}
 {txt(Number(page)%2?704:48,1254,Number(page)%2?190:400,(Number(page)%2?'':'Modul 2   ')+page+' | '+({'38':'achtunddreißig','39':'neununddreißig','40':'vierzig'} as Record<string,string>)[page]+(Number(page)%2?'  Modul 2':''),'mFooter')}
 </div><audio className="nabPlayer" ref={audio} controls hidden aria-label="Originalaudio Arbeitsbuch"/></div>;
}
