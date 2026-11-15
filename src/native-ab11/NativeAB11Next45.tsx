import {ChoiceInput} from '../exercises/ChoiceInput';
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
 const f=(id:string,x:number,y:number,w:number,label=id)=>{const ctx=document.createElement('canvas').getContext('2d');if(ctx)ctx.font="18px 'Times New Roman'";const size=Math.max(10,Math.min(18,18*(w-5)/(ctx?.measureText(v[id]||'').width||1)));return <ChoiceInput placeholder={hints[id]} className="mField" data-native-field={id} aria-label={label} style={{left:x,top:Y(y),width:w,height:22*sy,fontSize:size}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>};
 const open=(id:string,x:number,y:number,w:number,h:number,label=id)=><textarea className="mField mOpen" data-native-field={id} aria-label={label} style={{left:x,top:Y(y),width:w,height:h*sy,'--mopen-height':h*sy+'px'} as React.CSSProperties} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="mArt" alt={'Originalabbildung '+name} src={`assets/native-ab11/p${page}-${name}.png`} style={{left:x,top:Y(y),width:w,height:h*sy}}/>;
 const title=(n:string,y:number,s:string,kb='',x=132,w=700)=><>{kb&&txt(96,y+5,34,kb,'mKB')}<div className={'mNumber '+''} style={{left:x,top:Y(y)}}>{n}</div>{txt(x+35,y,w-35,s,'mTitle')}</>;
 const head=(s:string)=><>{txt(132,135,740,s,'mHeader')}<div className="mRule"/></>;
 const data=scanData['ab-a11:'+page];
 const answers=(group:string)=>Object.fromEntries(data.fields.filter(f=>f.group===group&&f.kind!=='radio'&&f.kind!=='checkbox'&&f.answer!==undefined).map(f=>[f.id,f.answer!]));
 const check=(id:string,x:number,y:number,expected=answers(id))=><div className="mCheck" data-native-task={id} style={{left:x,top:Y(y)}}><CheckButton answers={expected} onClick={()=>G({...graded,[id]:Object.entries(expected).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}></CheckButton><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const rule=(id:string,x:number,y:number,test:()=>boolean)=><div className="mCheck" data-native-task={id} style={{left:x,top:Y(y)}}><CheckButton onClick={()=>G({...graded,[id]:test()})}></CheckButton><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const listen=(n:string,x:number,y:number,t?:string)=><button className="mListen" data-task={t} aria-label={'Originalaudio 1 '+n} style={{left:x,top:Y(y)}} onClick={()=>{T(n);if(audio.current){audio.current.src='assets/ab-cd1-track'+n+'.mp3';audio.current.play().catch(()=>{})}}}>▶ 1 {n}</button>;
 const radio=(id:string,val:string,x:number,y:number,label:string)=><ChoiceInput className="mRadio" type="radio" data-value={val} name={'native-ab11-'+page+'-'+id} aria-label={label} style={{left:x,top:Y(y)}} checked={v[id]===val} onChange={()=>set(id,val)}/>;
 const score=(y:number,rows:string[][])=><div className="mScore" style={{left:168,top:Y(y)}}><b>Wörter</b><b>Strukturen</b><b>Kommunikation</b>{rows.map((row,r)=>row.map((s,c)=><div key={r+'-'+c}><i style={{background:['#d71910','#edcf00','#3b9e24'][r]}}/>{s} Punkte</div>))}</div>;
 const [active,A]=useState<Record<string,number>>({});
 const match=(id:string,left:string[],right:string[],expected:number[],x:number,y:number,w:number,step=29)=> <><LineMatching id={id} left={left} right={right} values={v} onMatch={set} leftX={x} rightX={x+w*.58} leftWidth={w*.42-12} rightWidth={w*.42} ys={left.map((_,i)=>Y(y+i*step))} rightYs={right.map((_,i)=>Y(y+i*step))} width={901} height={1275} fontSize={18} example={[0,expected[0]]}/>{rule(id,x,y+left.length*step+9,()=>id==='u11a'?v[id+'-3']==='1'&&new Set([v[id+'-1'],v[id+'-2']]).size===2&&[v[id+'-1'],v[id+'-2']].every(s=>s==='0'||s==='3'):expected.every((j,i)=>i===0||v[id+'-'+i]===''+j))}</>;
 const colorChip=(id:string,x:number,y:number,shape='round')=><button className={'mColorChip '+shape} aria-label={id+' Farbe wählen'} style={{left:x,top:Y(y),background:v[id]||'white'}} onClick={()=>set(id,['white','black','#e83d2d','#efcf21','#ed8825','#2772bd','#47994b','#9a6030'][(['white','black','#e83d2d','#efcf21','#ed8825','#2772bd','#47994b','#9a6030'].indexOf(v[id]||'white')+1)%8])}/>;
 const stress=(id:string,x:number,y:number,s:string)=><div className="mStressSentence" style={{left:x,top:Y(y)}}>{s.split(' ').map((w,i)=><span key={i}><button className={norm(v[id]||'')===norm(w)?'stressed':''} aria-label={id+' '+w} onClick={()=>set(id,w)}>{w}</button>{' '}</span>)}</div>;
 const [snakeStart,SN]=useState<number|null>(null);const snake='EFAMBLAUETUGINFEUERZEUGALVIECKIGUNTSEIFELUGEKUNSTSTOFFAVIRBORANGEWERRUNDUMOMETALLABIN';
 const snakeClick=(at:number)=>{if(snakeStart===null){SN(at);return}const lo=Math.min(snakeStart,at),hi=Math.max(snakeStart,at),key='snake-'+lo+'-'+hi;set(key,v[key]==='1'?'0':'1');SN(null)};
 return <div className="nativeAB11 nativeAB11Module1 nativeAB11Lessons45 nativeAB11Next45" ref={host} data-native-ab11-page={page}><div className="nabCanvas mCanvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='38'&&(()=>{
 const t=(x:number,y:number,w:number,s:string,c='')=><div className={'mText '+c} style={{left:x,top:y,width:w}}><Words s={s}/></div>;
 const f=(id:string,x:number,y:number,w:number)=><ChoiceInput placeholder={hints[id]} className="mField" data-native-field={id} aria-label={id} style={{left:x,top:y,width:w}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const offsets:Record<string,number>={"products":0,"example":324,"wie":346,"footer":367};
 const art=(n:string,x:number,y:number,w:number,h:number)=><div className="mP38Art" style={{left:x,top:y,width:w,height:h}}><PageImage className="mP38Sprite" alt={'Originalabbildung '+n} src="assets/native-ab11/p38-source-sprite.png" style={{left:0,top:-offsets[n],width:422,height:398}}/></div>;
 const title=(n:string,y:number,s:string,kb:string)=> <>{t(91,y+5,29,kb,'mKB')}<div className="mP38Number" style={{top:y}}>{n}</div>{t(158,y,700,s,'mTitle')}</>;
 const c=(id:string,x:number,y:number,test:()=>boolean)=><div className="mCheck" data-native-task={id} style={{left:x,top:y}}><CheckButton onClick={()=>G({...graded,[id]:test()})}/><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const group=(id:string)=>Object.entries(answers(id)).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')));
 return <>{t(124,135,400,'BASISTRAINING','mHeader')}<div className="mP38Rule"/>
 {title('9',201,'Ergänzen und malen Sie die Farben und Formen.','KB 3')}{t(101,234,15,'WÖRTER','mP38Rail')}<div className="mP38ColorTable"/>
 {['schwarz','rot','gelb','orange','eckig','weiss','blau','gruen','braun','rund'].map((id,i)=>{const x=i<5?165:523,y=236+(i%5)*25;return <span key={id}>{f('u9-'+id,x,y,98)}{i===0||id==='eckig'||id==='rund'?<i className={'mP38Color '+(id==='eckig'?'square':'round')} style={{left:x+116,top:y+4,background:i===0?'black':'white'}}/>:<button className="mP38Color round" aria-label={'farbe-'+id+' Farbe wählen'} style={{left:x+116,top:y+4,background:v['farbe-'+id]||'white'}} onClick={()=>{const colors=['white','black','#e83d2d','#efcf21','#ed8825','#2772bd','#47994b','#9a6030'];set('farbe-'+id,colors[(colors.indexOf(v['farbe-'+id]||'white')+1)%8])}}/>}</span>})}
 {c('u9',840,351,()=>group('u9')&&Object.entries({rot:'#e83d2d',gelb:'#efcf21',orange:'#ed8825',weiss:'white',blau:'#2772bd',gruen:'#47994b',braun:'#9a6030'}).every(([id,color])=>(v['farbe-'+id]||'white')===color))}
 {title('10',412,'Beschreiben Sie die Produkte.','KB 5')}{t(104,447,15,'SCHREIBEN','mP38Rail')}{art('products',581,411,299,324)}
 {t(160,443,650,'a  Super-Regenschirm - schwarz - sehr groß - neu - € 30')}{art('example',180,465,422,22)}
 {['b  Sessel Luxor - rot - fünf Jahre alt - € 50','c  Tasche - Kunststoff - orange - sehr praktisch - neu - € 78','d  Uhr - braun - sehr modern - € 37','e  Lampe - schwarz - Plastik - zwei Jahre alt - € 12'].map((s,i)=>{const y=496+i*54;return <span key={s}>{t(160,y,650,s)}{i===0&&t(181,y+21,90,'Der Sessel')}<textarea className="mP38Writing" data-native-field={'u10-'+String.fromCharCode(98+i)} aria-label={'10 '+String.fromCharCode(98+i)+' eigene Beschreibung'} style={{left:i===0?255:181,top:y+20,width:i===0?461:535,height:24}} value={v['u10-'+String.fromCharCode(98+i)]||''} onChange={e=>set('u10-'+String.fromCharCode(98+i),e.target.value)}/></span>})}
 {c('u10',843,722,()=>Object.entries({'u10-b':'Der Sessel Luxor ist rot und fünf Jahre alt. Er kostet 50 Euro','u10-c':'Die Tasche ist orange, aus Kunststoff, sehr praktisch und neu. Sie kostet 78 Euro','u10-d':'Die Uhr ist braun und sehr modern. Sie kostet 37 Euro','u10-e':'Die Lampe ist schwarz, aus Plastik und zwei Jahre alt. Sie kostet 12 Euro'}).every(([k,a])=>norm(v[k]||'')===norm(a)||(k==='u10-b'&&norm('Der Sessel '+(v[k]||''))===norm(a))))}
 {title('11',753,'Wie schreibt man das?','KB 6')}{t(107,786,15,'KOMMUNIKATION','mP38Rail')}{t(138,786,650,'a   Ordnen Sie zu.','mTitle')}
 <LineMatching id="u11a" left={['Wie','Wie','Wie','Bitteschön,']} right={['heißt das auf Deutsch?','kein Problem.','schreibt man das?','bitte?']} values={v} onMatch={set} leftX={165} rightX={310} leftWidth={100} rightWidth={420} ys={[814,836,858,880]} width={901} height={1275} fontSize={16} example={[0,2]} dotR={2} leftDotXs={[206,206,206,256]} rightDotXs={[339,339,339,339]}/>
 {c('u11a',814,891,()=>v['u11a-3']==='1'&&new Set([v['u11a-1'],v['u11a-2']]).size===2&&[v['u11a-1'],v['u11a-2']].every(s=>s==='0'||s==='3'))}
 {t(139,924,700,'b   Ergänzen Sie das Gespräch mit Wendungen aus a.','mTitle')}
 {t(165,953,180,'▪  Entschuldigung.')}{f('u11b-1',308,949,410)}{t(165,974,650,'▴  Das ist eine Zeitung!')}{t(165,995,18,'▪')}{art('wie',184,996,130,21)}{t(317,995,20,'?')}{t(165,1016,650,'▴  Z-E-I-T-U-N-G')}
 {t(165,1037,120,'▪  Z-E-I- …')}{f('u11b-2',254,1033,466)}{t(721,1037,20,'?')}{t(165,1058,650,'▴  Z-E-I-T-U-N-G …')}{t(165,1079,650,'▪  Vielen Dank.')}{t(165,1100,20,'▴')}{f('u11b-3',185,1096,535)}{c('u11b',817,1117,()=>data.fields.filter(f=>f.id.startsWith('u11b-')).every(f=>(f.answer||'').split('|').some(a=>norm(v[f.id]||'')===norm(a))))}{art('footer',28,1206,232,31)}
 </>})()}
 {page==='39'&&(()=>{
 const t=(x:number,y:number,w:number,s:string,c='')=><div className={'mText '+c} style={{left:x,top:y,width:w}}><Words s={s}/></div>;
 const f=(id:string,x:number,y:number,w:number)=><ChoiceInput className="mField" data-native-field={id} aria-label={id} style={{left:x,top:y,width:w}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const offsets:Record<string,number>={"portrait": 0, "plz": 104, "name": 121, "email": 141, "stress": 163, "footer": 322};
 const art=(n:string,x:number,y:number,w:number,h:number)=><div className="mP39Art" style={{left:x,top:y,width:w,height:h}}><PageImage className="mP39Sprite" alt={'Originalabbildung '+n} src="assets/native-ab11/p39-source-sprite.png" style={{left:0,top:-offsets[n],width:338,height:347}}/></div>;
 const title=(n:string,x:number,y:number,w:number,s:string)=> <><div className="mP39Number" style={{left:x,top:y}}>{n}</div>{t(x+37,y-1,w-37,s,'mTitle')}</>;
 const c=(id:string,x:number,y:number,test:()=>boolean)=><div className="mCheck" data-native-task={id} style={{left:x,top:y}}><CheckButton onClick={()=>G({...graded,[id]:test()})}/><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const group=(id:string)=>Object.entries(answers(id)).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')));
 const radio=(id:string,val:string,x:number,y:number,label:string)=><ChoiceInput className="mRadio" type="radio" data-value={val} name={'native-ab11-39-'+id} aria-label={label} style={{left:x,top:y}} checked={v[id]===val} onChange={()=>set(id,val)}/>;
 const listen=(n:string,x:number,y:number)=><button className="mListen" aria-label={'Originalaudio 1 '+n} style={{left:x,top:y}} onClick={()=>{T(n);if(audio.current){audio.current.src='assets/ab-cd1-track'+n+'.mp3';audio.current.play().catch(()=>{})}}}>▶ 1 {n}</button>;
 return <>{t(140,129,400,'TRAINING: SCHREIBEN','mHeader')}<div className="mP39Rule" style={{left:430,top:152,width:411}}/><div className="mP39Module">5</div>
 {title('1',138,193,700,'Formulare. Ordnen Sie zu.')}
 {t(175,227,450,'Beruf | Familienname | Straße | Vorname | E-Mail | Ort | PLZ | Telefon','mP39Bank')}
 {t(434,280,200,'Paul Paulsen','mP39Name')}{['Diplom-Ingenieur','Resseltstr.15','6020 Innsbruck','0043 / 676 - 37 20 207','paul@paul.at'].map((s,i)=>t(434,[301,324,341,362,379][i],220,s))}
 {f('f-vorname',174,264,170)}{f('f-beruf',174,292,170)}{art('plz',174,336,39,17)}<i className="mP39Line" style={{left:174,top:350,width:170}}/>{f('f-telefon',174,354,170)}
 {['familienname','strasse','ort','email'].map((id,i)=>f('f-'+id,660,[224,249,279,380][i],174))}
 <svg className="mP39FormLines" viewBox="0 0 901 1275"><path d="M354 284 L426 289 M354 312 L427 313 M351 350 L427 352 M351 374 L427 374 M528 288 L650 245 M555 313 L651 270 M522 335 L650 298 M540 352 L580 319 M542 387 L652 399"/></svg>
 {c('f1',842,402,()=>group('f1'))}<div className="mP39Tip"/><span className="mP39TipRail">TIPP</span>{t(202,443,600,'Sie müssen oft Ihre Adresse sagen oder die Adresse von anderen\nverstehen. Achten Sie besonders auf Wörter wie Ort, Postleitzahl …\nSo verstehen Sie wichtige Informationen.','mP39TipText')}
 {title('2',138,533,720,'Lesen Sie die Informationen über Jurj Kulintsev und ergänzen Sie die Kundenkarte.')}{art('portrait',169,568,99,104)}
 {t(283,575,595,'Jurj Kulintsev kommt aus Russland. Jetzt wohnt er zusammen mit seiner\nFrau in der Schweiz, in der Helvetiastraße 18 in 3005 Bern. Er hat eine\nAusbildung als Informatiker und arbeitet jetzt als Programmierer bei\nDATNET. Er findet Bern sehr schön.','mP39Bio')}
 <div className="mP39Card"/><div className="mP39CardBand"/>{t(183,690,130,'KAUFHAUS','mP39CardTitle')}{t(302,690,320,'KAUFGUT','mP39CardTitle mP39CardWhite')}
 {t(183,726,400,'Antrag auf eine Kundenkarte:')}{radio('k-anrede','Herr',184,747,'Herr')}{t(203,747,50,'Herr')}{radio('k-anrede','Frau',243,747,'Frau')}{t(262,747,50,'Frau')}
 {['Name:','Vorname:','Straße:'].map((s,i)=>t(183,768+i*21,80,s))}{art('name',247,769,55,20)}{f('k-vorname',248,786,174)}{f('k-strasse',248,807,174)}
 {['PLZ, Ort:','Beruf:','E-Mail:'].map((s,i)=>t(452,768+i*21,110,s))}{f('k-plzort',518,765,165)}{f('k-beruf',518,786,165)}{art('email',512,810,134,22)}{c('f2',712,802,()=>v['k-anrede']==='Herr'&&group('f2'))}
 {t(140,876,400,'TRAINING: AUSSPRACHE','mHeader')}{t(462,886,130,'Satzakzent','mP39Subtitle')}<div className="mP39Rule" style={{left:546,top:899,width:295}}/>
 {title('1',138,925,370,'Hören Sie und kreuzen Sie in der\nRegel an.')}{listen('23',99,931)}{art('stress',172,980,338,159)}
 <div className="mP39Regel"/><span className="mP39RuleRail">REGEL</span>{t(201,1151,300,'Der Satzakzent ist','mP39Bold')}{radio('regel','letztes-wort',202,1168,'immer auf dem letzten Wort.')}{t(220,1168,350,'immer auf dem letzten Wort.')}{radio('regel','wichtige-info',202,1187,'auf der wichtigen oder neuen Information.')}{t(220,1187,370,'auf der wichtigen oder neuen Information.')}{c('au1',137,1210,()=>v.regel==='wichtige-info')}
 {title('2',523,925,355,'Markieren Sie den Satzakzent.')}{listen('24',483,931)}{t(560,949,330,'Hören Sie dann und vergleichen Sie.','mP39Instruction')}
 <div className="mP39Stress" style={{left:560,top:981}}>a&nbsp;&nbsp; Wie <u>heißt</u> das auf Deutsch?</div>
 {['b  Das ist eine Uhr.','c  Sie ist aus Plastik.','d  Ist das eine Seife?','e  Das ist keine Seife, das ist eine Brille.'].map((s,i)=><div key={s} className="mP39Stress" style={{left:560,top:1002+i*21}}>{s.split(' ').map((w,j)=> <span key={j}><button className={norm(v['au2-'+String.fromCharCode(98+i)]||'')===norm(w)?'stressed':''} aria-label={'au2-'+String.fromCharCode(98+i)+' '+w} onClick={()=>set('au2-'+String.fromCharCode(98+i),w)}>{w}</button>{' '}</span>)}</div>)}{c('au2',560,1141,()=>['Uhr','Plastik','Seife','Brille'].every((a,i)=>norm(v['au2-'+String.fromCharCode(98+i)]||'')===norm(a)))}
 {listen('25',523,1104)}{t(560,1097,310,'Hören Sie noch einmal und sprechen\nSie nach.','mP39Instruction')}{art('footer',705,1200,196,25)}
 </>})()}
 {page==='40'&&(()=>{
 const t=(x:number,y:number,w:number,s:string,c='')=><div className={'mText '+c} style={{left:x,top:y,width:w}}><Words s={s}/></div>;
 const f=(id:string,x:number,y:number,w:number)=><ChoiceInput placeholder={hints[id]} className="mField" data-native-field={id} aria-label={id} style={{left:x,top:y,width:w}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const offsets:Record<string,number>={"blau": 0, "kein": 17, "red": 35, "yellow": 57, "green": 78, "footer": 99, "web": 128};
 const art=(n:string,x:number,y:number,w:number,h:number)=><div className="mP40Art" style={{left:x,top:y,width:w,height:h}}><PageImage className="mP40Sprite" alt={'Originalabbildung '+n} src="assets/native-ab11/p40-source-sprite.png" style={{left:0,top:-offsets[n],width:198,height:147}}/></div>;
 const title=(n:string,x:number,y:number,s:string,rail:string)=> <><div className="mP40Number" style={{left:x,top:y}}>{n}</div>{t(x+37,y-2,700,s,'mTitle')}{t(x-21,y+33,15,rail,'mP40Rail')}</>;
 const c=(id:string,x:number,y:number,test:()=>boolean)=><div className="mCheck" data-native-task={id} style={{left:x,top:y}}><CheckButton onClick={()=>G({...graded,[id]:test()})}/><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const group=(id:string)=>Object.entries(answers(id)).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')));
 const radio=(id:string,val:string,x:number,y:number)=><ChoiceInput className="mRadio" type="radio" data-value={val} name={'native-ab11-40-'+id} aria-label={id+' '+val} style={{left:x,top:y}} checked={v[id]===val} onChange={()=>set(id,val)}/>;
 const square=(x:number,y:number)=><i className="mP40Square" style={{left:x,top:y}}/>;const tri=(x:number,y:number)=><i className="mP40Triangle" style={{left:x,top:y}}/>;
 return <>{t(125,135,200,'TEST','mHeader')}<div className="mP40Rule"/>
 {title('1',124,199,'Markieren Sie und ordnen Sie zu.','WÖRTER')}
 <div className="mP40Snake" style={{left:161,top:232}}>{[snake.slice(0,55),snake.slice(55)].map((line,row)=><div key={row}>{line.split('').map((s,i)=>{const index=i+(row?55:0),marked=(index>=4&&index<=7)||Object.keys(v).some(k=>{if(!k.startsWith('snake-')||v[k]!=='1')return false;const [,a,b]=k.split('-').map(Number);return index>=a&&index<=b});return <button key={index} className={(marked?'marked ':'')+(snakeStart===index?'active':'')} aria-label={'Buchstabenschlange '+index+' '+s} onClick={()=>snakeClick(index)}>{s}</button>})}</div>)}</div>
 {t(162,285,120,'Farben:')}{art('blau',237,284,35,17)}<i className="mP40Line" style={{left:240,top:300,width:104}}/>{f('t1-farben',364,280,101)}{t(162,307,120,'Formen:')}{f('t1-formen-1',240,302,104)}{f('t1-formen-2',364,302,101)}
 {t(487,280,180,'Gegenstände:')}{f('t1-gegenstaende-1',597,277,105)}{f('t1-gegenstaende-2',724,277,100)}{t(487,302,180,'Materialien:')}{f('t1-materialien-1',597,299,105)}{f('t1-materialien-2',724,299,100)}
 {t(761,334,100,'_ / 7 PUNKTE','mP40Points')}{c('t1',840,323,()=>norm(v['t1-farben']||'')==='orange'&&[['formen',['eckig','rund']],['gegenstaende',['Feuerzeug','Seife']],['materialien',['Kunststoff','Metall']]].every(([key,words])=>(words as string[]).every(a=>[v['t1-'+key+'-1'],v['t1-'+key+'-2']].map(s=>norm(s||'')).includes(norm(a))))&&Object.keys(v).filter(k=>k.startsWith('snake-')&&v[k]==='1').length===7&&['FEUERZEUG','ECKIG','SEIFE','KUNSTSTOFF','ORANGE','RUND','METALL'].every(word=>{const i=snake.indexOf(word);return v['snake-'+i+'-'+(i+word.length-1)]==='1'}))}
 {title('2',127,347,'Kreuzen Sie an.','WÖRTER')}<div className="mP40Table"/>{t(468,370,80,'richtig')}{t(550,368,80,'falsch')}
 {['Familienname:|Maria','Postleitzahl:|6003','Wohnort:|Luzern','Straße:|Bahnhofstr.','Geburtsdatum:|3066','E-Mail:|eva111@t-on.ch'].map((s,i)=>{const y=399+i*27,a=s.split('|');return <span key={s}>{t(170,y,25,String.fromCharCode(97+i))}{t(204,y,140,a[0],'mP40Label')}{t(331,y-1,160,a[1])}{['richtig','falsch'].map((val,j)=>i===0?<i key={val} className={'mP40PrintedRadio '+(j===1?'selected':'')} style={{left:471+j*83,top:y}}/>:radio('t2-'+String.fromCharCode(97+i),val,471+j*83,y))}</span>})}
 {t(762,525,100,'_ / 5 PUNKTE','mP40Points')}{c('t2',840,514,()=>['richtig','richtig','richtig','falsch','richtig'].every((a,i)=>v['t2-'+String.fromCharCode(98+i)]===a))}
 {title('3',131,592,'Ergänzen Sie ein/eine/kein/keine.','STRUKTUREN')}
 {t(168,624,25,'a')}{square(185,630)}{t(204,623,300,'Danke für die Hilfe.')}{tri(186,652)}{t(205,645,250,'Bitte, das ist')}{art('kein',296,644,29,18)}{t(327,645,170,'Problem.')}
 {t(168,678,25,'b')}{square(185,683)}{t(204,677,300,'Wer ist Amelie?')}{tri(187,705)}{t(204,699,100,'Sie ist')}{f('t3-b',251,694,85)}{t(341,699,170,'Freundin von')}{t(204,720,250,'Sarah.')}
 {t(169,752,25,'c')}{square(186,757)}{t(204,751,300,'Hier ist der Bleistift!')}{tri(187,779)}{t(205,773,150,'Das ist doch')}{f('t3-c1',296,768,84)}{t(385,773,170,'Bleistift, das')}{t(205,795,35,'ist')}{f('t3-c2',228,790,84)}{t(317,795,210,'Kugelschreiber!')}{square(187,822)}{t(205,817,300,'Oh, Entschuldigung.')}
 {t(524,619,25,'d')}{square(541,624)}{t(560,618,340,'Wie heißt das Wort? „Doch“ oder\n„noch“?')}{tri(542,670)}{t(561,661,160,'„Noch“. Das ist')}{f('t3-d',674,656,84)}{t(763,661,100,'„n“.')}
 {t(525,705,25,'e')}{square(542,711)}{t(561,704,300,'Was kostet die Tasche?')}{tri(543,733)}{t(561,726,100,'Das ist')}{f('t3-e1',614,721,84)}{t(703,726,190,'Tasche, das ist')}{f('t3-e2',561,743,84)}{t(650,748,190,'Geldbörse.')}
 {t(526,782,25,'f')}{square(543,787)}{t(561,781,300,'Wie heißt das auf Deutsch?')}{tri(544,809)}{t(561,803,100,'Das ist')}{f('t3-f',614,798,84)}{t(703,803,190,'Fotoapparat.')}{t(768,842,100,'_ / 7 PUNKTE','mP40Points')}{c('t3',840,831,()=>group('t3'))}
 {title('4',135,878,'Was sagen die Personen? Ergänzen Sie.','KOMMUNIKATION')}
 {square(172,917)}{t(192,911,350,'Entschuldigung, „a biro“,')}{f('t4-a',378,906,166)}{t(545,911,210,'auf Deutsch? (a)')}
 {tri(173,940)}{t(192,933,90,'Ah,')}{f('t4-b',220,928,83)}{t(307,933,250,'ein Kugelschreiber. (b)')}
 {square(173,960)}{f('t4-c',192,950,119)}{t(312,955,70,'? (c)')}{tri(174,984)}{t(192,977,400,'Ein Kugelschreiber.')}
 {square(174,1003)}{t(192,999,330,'Ah, danke. Und noch eine Frage,')}{f('t4-d',435,994,180)}{t(619,999,130,'das? (d)')}
 {tri(175,1027)}{t(192,1021,500,'K-U-G-E-L-S-C-H-R-E-I-B-E-R.')}
 {square(175,1048)}{t(192,1043,90,'Vielen')}{f('t4-e',246,1038,55)}{t(303,1043,100,'! (e)')}
 {tri(176,1070)}{t(192,1065,140,'Bitte, kein')}{f('t4-f',272,1060,101)}{t(376,1065,100,'! (f)')}{t(771,1057,100,'_ / 6 PUNKTE','mP40Points')}{c('t4',840,1046,()=>group('t4'))}
 <div className="mP40Score">{['Wörter','Strukturen','Kommunikation'].map(s=><b key={s}>{s}</b>)}{[['0–6','0–3','0–3'],['7–9','4–5','4'],['10–12','6–7','5–6']].map((row,i)=>row.map((s,j)=><div key={i+'-'+j}>{art(['red','yellow','green'][i],5,5,21,22)}<span>{s} Punkte</span></div>))}</div>{art('footer',34,1206,198,29)}{art('web',653,1204,189,19)}
 </>})()}
 {txt(Number(page)%2?704:48,1254,Number(page)%2?190:400,(Number(page)%2?'':'Modul 2   ')+page+' | '+({'38':'achtunddreißig','39':'neununddreißig','40':'vierzig'} as Record<string,string>)[page]+(Number(page)%2?'  Modul 2':''),'mFooter')}
 </div><audio className="nabPlayer" ref={audio} controls hidden aria-label="Originalaudio Arbeitsbuch"/></div>;
}
