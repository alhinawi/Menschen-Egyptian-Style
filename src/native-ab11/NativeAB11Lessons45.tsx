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
export function NativeAB11Lessons45({page}:{page:string}){
 const host=useRef<HTMLDivElement>(null),audio=useRef<HTMLAudioElement>(null),[scale,SS]=useState(1),[,T]=useState(''),[v,S]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem('native-ab11-'+page)||'{}')}catch{return {}}}),[graded,G]=useState<Record<string,boolean>>({}),[start,ST]=useState<number[]|null>(null);
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const measure=()=>SS(Math.min(el.clientWidth/901,el.clientHeight/1275));measure();const ro=new ResizeObserver(measure);ro.observe(el);return()=>ro.disconnect()},[]);
 usePageReset(page,'native-ab11-'+page,()=>{S({});G({});A({})});
 const set=(id:string,value:string)=>{const next={...v,[id]:value};S(next);localStorage.setItem('native-ab11-'+page,JSON.stringify(next));G({})};
 const sy=page==='31'?.8:page==='32'?.79:page==='33'?.8:page==='34'?.75:page==='36'?.78:page==='37'?.69:.91;const Y=(y:number)=>130+(y-130)*sy;
 const txt=(x:number,y:number,w:number,s:string,cls='')=><div className={'mText '+cls} style={{left:x,top:cls==='mFooter'?y:Y(y),width:w}}><Words s={s}/></div>;
 const f=(id:string,x:number,y:number,w:number,label=id)=>{const ctx=document.createElement('canvas').getContext('2d');if(ctx)ctx.font="18px 'Times New Roman'";const size=Math.max(10,Math.min(18,18*(w-5)/(ctx?.measureText(v[id]||'').width||1)));return <ChoiceInput placeholder={page==='36'&&id.startsWith('u1-')?({'u1-1':'___e__________','u1-2':'____a_______','u1-3':'________e_','u1-4':'____i____','u1-6':'__c_','u1-7':'_l______','u1-8':'___l__','u1-9':'__s___','u1-10':'__tt_'} as Record<string,string>)[id]:undefined} className="mField" data-native-field={id} aria-label={label} style={{left:x,top:Y(y),width:w,height:22*sy,fontSize:size}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>};
 const open=(id:string,x:number,y:number,w:number,h:number,label=id)=><textarea className="mField mOpen" data-native-field={id} aria-label={label} style={{left:x,top:Y(y),width:w,height:h*sy,'--mopen-height':h*sy+'px'} as React.CSSProperties} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="mArt" alt={'Originalabbildung '+name} src={`assets/native-ab11/p${page}-${name}.png`} style={{left:x,top:Y(y),width:w,height:h*sy}}/>;
 const title=(n:string,y:number,s:string,kb='',x=132,w=700)=><>{kb&&txt(96,y+5,34,kb,'mKB')}<div className={'mNumber '+''} style={{left:x,top:Y(y)}}>{n}</div>{txt(x+35,y,w-35,s,'mTitle')}</>;
 const head=(s:string)=><>{txt(132,135,740,s,'mHeader')}<div className="mRule"/></>;
 const data=scanData['ab-a11:'+page];
 const answers=(group:string)=>Object.fromEntries(data.fields.filter(f=>f.group===group&&f.kind!=='radio'&&f.kind!=='checkbox'&&f.answer!==undefined).map(f=>[f.id,f.answer!]));
 const check=(id:string,x:number,y:number,expected=answers(id))=><div className="mCheck" data-native-task={id} style={{left:x,top:Y(y)}}><CheckButton onClick={()=>G({...graded,[id]:Object.entries(expected).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}></CheckButton><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const rule=(id:string,x:number,y:number,test:()=>boolean)=><div className="mCheck" data-native-task={id} style={{left:x,top:Y(y)}}><CheckButton onClick={()=>G({...graded,[id]:test()})}></CheckButton><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const listen=(n:string,x:number,y:number,t?:string)=><button className="mListen" data-task={t} aria-label={'Originalaudio 1 '+n} style={{left:x,top:Y(y)}} onClick={()=>{T(n);if(audio.current){audio.current.src='assets/ab-cd1-track'+n+'.mp3';audio.current.play().catch(()=>{})}}}>▶ 1 {n}</button>;
 const arrow=(id:string,x:number,y:number)=><button className="mArrow" data-native-field={id} aria-label={'Satzmelodie '+id} style={{left:x,top:Y(y)}} onClick={()=>set(id,v[id]==='↗'?'↘':'↗')}>{v[id]||' '}</button>;
 const radio=(id:string,val:string,x:number,y:number,label:string)=><ChoiceInput className="mRadio" type="radio" data-native-radio={data.fields.find(f=>f.kind==='radio'&&f.name===id&&(f.value===label||f.value===({r:'richtig',f:'falsch'}[val]||val)))?.id} data-value={val} name={'native-ab11-'+page+'-'+id} aria-label={label} style={{left:x,top:Y(y)}} checked={v[id]===val} onChange={()=>set(id,val)}/>;
 const confidence=(id:string,y:number)=><>{[0,1,2].map((c)=><span key={c}>{radio('confidence-'+id,''+c,753+c*32,y,'Selbsteinschätzung '+id+' '+['grün','gelb','rot'][c])}</span>)}</>;
 const lights=(y:number)=><>{['#41a700','#edcf00','#e4310c'].map((c,i)=><i className="mLight" key={c} style={{left:753+i*32,top:Y(y),background:c}}/>)}</>;
 const score=(y:number,rows:string[][])=><div className="mScore" style={{left:168,top:Y(y)}}><b>Wörter</b><b>Strukturen</b><b>Kommunikation</b>{rows.map((row,r)=>row.map((s,c)=><div key={r+'-'+c}><i style={{background:['#d71910','#edcf00','#3b9e24'][r]}}/>{s} Punkte</div>))}</div>;
 const highlight=(id:string,x:number,y:number,words:string[],label=id)=><div className="mHighlight" style={{left:x,top:Y(y)}}>{words.map((w,i)=><span key={w}><button aria-label={label+' '+w} className={v[id]===w?'marked':''} onClick={()=>set(id,w)}>{w}</button>{i<words.length-1?'/':''}</span>)}</div>;
 const inlineChoice=(n:number,words:string[])=> <span className="mInlineChoice">{words.map((w,i)=><span key={w}><button aria-label={'u4-'+n+' '+w} className={v['u4-'+n]===w?'marked':''} onClick={()=>set('u4-'+n,w)}>{w}</button>{i===0?'/':''}</span>)}</span>;
 const cell=(id:string,x:number,y:number,length:number,offset:number)=> <div className="mCrossRow" style={{left:x,top:Y(y)}}>{Array.from({length},(_,i)=><ChoiceInput key={i} aria-label={id+' Buchstabe '+(i+1)} data-crossword={id+'-'+i} maxLength={1} className={i===offset?'solution':''} value={(v[id]||'')[i]?.trim()||''} onChange={e=>{const a=(v[id]||' '.repeat(length)).padEnd(length,' ').split('');a[i]=e.target.value.toLocaleUpperCase('de');set(id,a.join(''));if(e.target.value)(e.currentTarget.nextElementSibling as HTMLInputElement)?.focus()}}/>)}</div>;
 const [active,A]=useState<Record<string,number>>({});
 const match=(id:string,left:string[],right:string[],expected:number[],x:number,y:number,w:number,step=29)=> <><LineMatching id={id} left={left} right={right} values={v} onMatch={set} leftX={x} rightX={x+w*.58} leftWidth={w*.42-12} rightWidth={w*.42} ys={left.map((_,i)=>Y(y+i*step))} rightYs={right.map((_,i)=>Y(y+i*step))} width={1075} height={1521} fontSize={18} example={id==='u7match'?undefined:[0,expected[0]]}/>{rule(id,x,y+left.length*step+9,()=>expected.every((j,i)=>(id!=='u7match'&&i===0)||v[id+'-'+i]===''+j))}</>;
 return <div className="nativeAB11 nativeAB11Module1 nativeAB11Lessons45" ref={host} data-native-ab11-page={page}><div className="nabCanvas mCanvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='30'&&(()=>{
 const txt=(x:number,y:number,w:number,s:string,c='')=><div className={'mText '+c} style={{left:x,top:y,width:w}}><Words s={s}/></div>;
 const f=(id:string,x:number,y:number,w:number)=><ChoiceInput className="mField" data-native-field={id} aria-label={id} style={{left:x,top:y,width:w}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const art=(n:string,x:number,y:number,w:number,h:number)=><PageImage className="mArt" alt={'Originalabbildung '+n} src={'assets/native-ab11/p30-'+n+'.png'} style={{left:x,top:y,width:w,height:h}}/>;
 const title=(n:string,y:number,s:string,kb:string)=><>{txt(109,y+5,30,kb,'mKB')}<div className="mP30Number" style={{top:y}}>{n}</div>{txt(178,y+1,680,s,'mTitle')}</>;
 const c=(id:string,x:number,y:number)=><div className="mCheck" data-native-task={id} style={{left:x,top:y}}><CheckButton onClick={()=>G({...graded,[id]:Object.entries(answers(id)).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}/><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 return <><div className="mP30Banner"/>{art('hero-source',145,98,120,67)}{txt(405,116,450,'Der Tisch ist schön!','mHeader')}
 {title('1',214,'Ergänzen Sie das Gespräch.','KB 3')}{txt(121,252,24,'KOMMUNIKATION','mP30Rail')}
 {txt(180,247,670,'Er ist wirklich schön, aber sehr teuer. | Nur 55 Euro! Das ist aber günstig! |\nUnd wie viel kostet der Stuhl? | Was kostet denn das Bild? | Ja, bitte.','mBank')}
 {txt(177,300,290,'▪ Guten Tag, brauchen Sie Hilfe?')}{txt(485,321,36,'a  ▴')}{art('ja-ink',520,320,58,24)}{f('u1-a',578,318,268)}
 {txt(177,342,270,'▪ 55 Euro!')}{txt(485,364,36,'b  ▴')}{f('u1-b',521,360,325)}
 {txt(177,385,290,'▪ Ja, das ist ein Sonderangebot.')}{txt(485,406,36,'c  ▴')}{f('u1-c',521,402,325)}
 {txt(177,427,295,'▪ Der Stuhl kostet 1200 Euro.\n    Der Designer heißt Nilsson.')}{txt(485,470,36,'d  ▴')}{f('u1-d',521,466,325)}{txt(177,490,270,'▪ Finden Sie?')}
 <svg className="mP30Arrows" width="34" height="184" style={{position:'absolute',left:433,top:313}}><defs><marker id="p30-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="#929292"/></marker></defs>{[[1,2,27,11],[27,28,5,37],[2,49,27,58],[27,72,5,81],[2,91,27,100],[27,105,5,115],[2,132,27,145],[27,167,5,179]].map((p,i)=><path key={i} d={`M${p[0]} ${p[1]}L${p[2]} ${p[3]}`} fill="none" stroke="#999" strokeWidth=".8" markerEnd="url(#p30-arrow)"/>)}</svg>{c('u1',849,489)}
 {title('2',564,'Meine Möbel','KB 4')}{txt(121,601,24,'WÖRTER','mP30Rail')}{txt(151,596,700,'a   Ergänzen Sie die Nomen mit Artikel.','mTitle')}
 {txt(179,629,670,'Bett | Bild | Lampe | Sessel | Stuhl | Sofa | Tisch | Schrank | Teppich','mBank')}
 {art('room-source',320,665,375,178)}{['l1','l2','l3','l4','l5'].map((s,i)=>f('u2a-'+s,178,675+i*28,138))}{['r1','r2','r3','r4'].map((s,i)=>s==='r3'?art('bett-ink',700,753,64,23):f('u2a-'+s,700,[676,714,0,788][i],138))}{c('u2a',849,807)}
 {art('pair-icon',92,870,39,30)}{txt(151,871,680,'b   Notieren Sie 10 Nomen aus den Lektionen 1 bis 3.\n    Ihre Partnerin / Ihr Partner sucht die Artikel im Wörterbuch.','mTitle')}{art('dictionary',628,862,218,94)}
 <textarea className="mP30Own" data-native-field="eigene-nomen" aria-label="2b zehn eigene Nomen" style={{left:178,top:917,width:429,height:39}} value={v['eigene-nomen']||''} onChange={e=>set('eigene-nomen',e.target.value)}/>
 {title('3',966,'Ergänzen Sie der, das oder die und vergleichen Sie.','KB 4')}{art('globe-icon',107,990,26,25)}{txt(121,1029,24,'STRUKTUREN','mP30Rail')}
 <div className="mP30Table"><b>Deutsch</b><b>Englisch</b><b>Meine Sprache oder andere Sprachen</b>{['Mann,','Kind,','Frau,'].map((s,i)=><span key={s}><div>{f('u3-r'+(i+1)+'a',5,1,48)}<i style={{left:57}}>{s}</i>{f('u3-r'+(i+1)+'b',104,1,48)}<i style={{left:156}}>{['Tisch','Bett','Lampe'][i]}</i></div><div>{['the man, the table','the child, the bed','the woman, the lamp'][i]}</div><div>{f('eigene-sprache-'+i,0,1,277)}</div></span>)}</div>{c('u3',849,1069)}
 <div className="mP30Footer"><em>Modul 2</em>30&nbsp; | &nbsp;dreißig</div>
 </>})()}
 {page==='31'&&<>
 {head('BASISTRAINING')}<div className="nabModule">4</div>{title('4',208,'Welche Zahlen hören Sie?','KB 5')}{txt(143,246,350,'a  Kreuzen Sie an.','mTitle')}{listen('14',96,247,'4a')}
 {['323|332','17 000|70 000','350 000|355 000','1100|1010','64 200|46 200','100 000|1 000 000'].map((s,i)=>{const x=i<3?168:530,y=281+(i%3)*27;return <span key={s}>{txt(x,y,20,''+(i%3+1+(i<3?0:3)))}{s.split('|').map((val,j)=><span key={val}>{radio('u4a-'+(i+1),j===0?'l':'r',x+30+j*125,y+1,val)}{txt(x+51+j*125,y,110,val)}</span>)}</span>})}{rule('u4',168,372,()=>['r','l','r','l','l','r'].every((a,i)=>v['u4a-'+(i+1)]===a))}
 {listen('15',96,417,'4b')}{txt(143,417,650,'b  Hören Sie noch einmal und sprechen Sie nach.','mTitle')}
 {title('5',477,'Was kosten die Möbel? Notieren Sie die Preise.','KB 6')}
 {['lamp','shelf','dining','rug'].map((s,i)=><span key={s}>{txt(168+i*167,517,20,String.fromCharCode(97+i))}{art(s,174+i*167,535,145,108)}{f('u5-'+String.fromCharCode(97+i),214+i*167,649,89)}{txt(309+i*167,651,20,'€')}{listen(''+(16+i),168+i*167,679)}</span>)}{check('u5',168,710)}
 {title('6',756,'Wie sagt man das? Ergänzen Sie. Hören Sie dann.','KB 6')}{listen('20',96,756,'6')}
 {['0,99 €','0,59 €','9,99 €','69,00 €','77,77 €','178,95 €'].map((s,i)=>{const x=i<3?168:520,y=801+(i%3)*39;return <span key={s}>{txt(x,y,21,String.fromCharCode(97+i))}{txt(x+30,y,82,s,'mBank')}{i===0?txt(x+116,y,224,'neunundneunzig Cent','mExample'):i===5?open('u6-f',x+116,y-2,220,42,'6f Preis in Worten'):f('u6-'+String.fromCharCode(97+i),x+116,y-2,i<3?214:220)}</span>})}{check('u6',168,929)}
 {title('7',975,'Was passt zusammen? Ordnen Sie zu und ergänzen Sie.','KB 7')}
 {match('u7match',['Der Sessel ist modern.','Die Lampe ist schön.','Das Bett ist auch nicht schlecht.'],['Sie kommt aus Italien.','Es ist aber sehr klein.','Und er ist praktisch.'],[2,0,1],168,1018,550,28)}
 {txt(168,1160,88,'● der → er','mExample')}{txt(346,1158,16,'●','p31DotR')}{f('u7-sie',362,1158,42)}{txt(408,1160,72,'→ sie')}{txt(493,1158,16,'●','p31DotG')}{f('u7-es',509,1158,42)}{txt(555,1160,72,'→ es')}{check('u7',168,1196)}
 {title('8',1240,'Ergänzen Sie.','KB 7')}
 {txt(168,1278,310,'a  ▪ Was kostet denn der Schrank?\n   ▴ Er kostet 799 Euro.','mSmall mExample')}
 {txt(168,1336,35,'b  ▪','mSmall')}{f('u8-b1',206,1334,65)}{txt(278,1336,180,'Sofa ist schön!','mSmall')}{txt(187,1363,25,'▴ Ja,','mSmall')}{f('u8-b2',218,1361,70)}{txt(293,1363,175,'ist nicht schlecht.','mSmall')}
 {txt(168,1393,174,'c  ▪ Woher kommt','mSmall')}{f('u8-c1',344,1391,67)}{txt(416,1393,70,'Teppich?','mSmall')}{txt(188,1420,140,'Aus Tunesien?','mSmall')}{txt(188,1447,58,'▴ Nein,','mSmall')}{f('u8-c2',249,1445,67)}{txt(322,1447,170,'kommt aus Marokko.','mSmall')}
 {txt(520,1278,22,'d  ▪','mSmall')}{f('u8-d1',548,1276,60)}{txt(614,1278,228,'Couch kostet 399 Euro, oder?','mSmall')}{txt(538,1305,57,'▴ Nein,','mSmall')}{f('u8-d2',598,1303,64)}{txt(667,1305,150,'kostet 299 Euro, das','mSmall')}{txt(538,1332,230,'ist ein Sonderangebot.','mSmall')}
 {txt(520,1370,310,'e  ▪ Die Lampe ist wirklich schön.','mSmall')}{txt(538,1397,17,'▴','mSmall')}{f('u8-e',559,1395,65)}{txt(630,1397,200,'kommt aus Italien. Der','mSmall')}{txt(538,1424,300,'Designer heißt Giuliano Rossi.','mSmall')}{check('u8',520,1460)}
 </>}
 {page==='32'&&(()=>{
 const t=(x:number,y:number,w:number,s:string,c='')=><div className={'mText '+c} style={{left:x,top:y,width:w}}><Words s={s}/></div>;
 const f=(id:string,x:number,y:number,w:number)=><ChoiceInput className="mField" data-native-field={id} aria-label={id} style={{left:x,top:y,width:w}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const art=(n:string,x:number,y:number,w:number,h:number)=><PageImage className="mArt" alt={'Originalabbildung '+n} src={'assets/native-ab11/p32-'+n+'.png'} style={{left:x,top:y,width:w,height:h}}/>;
 const title=(n:string,y:number,s:string,kb:string)=><>{t(92,y+5,29,kb,'mKB')}<div className="mP32Number" style={{top:y}}>{n}</div>{t(159,y,683,s,'mTitle')}</>;
 const c=(id:string,x:number,y:number,test?:()=>boolean)=><div className="mCheck" data-native-task={id} style={{left:x,top:y}}><CheckButton onClick={()=>G({...graded,[id]:test?test():Object.entries(answers(id)).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}/><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 return <>{t(125,141,300,'BASISTRAINING','mHeader')}<div className="mP32Rule"/>
 {title('9',205,'Schreiben Sie die SMS fertig.','KB 7')}{t(102,243,18,'SCHREIBEN','mP32Rail')}{t(163,237,400,'praktisch | sehr günstig | 199 Euro | Sonderangebot','mBank')}{art('phone-source',568,211,227,212)}
 {t(181,280,392,'Hallo Barbara,\nbin im Möbelhaus. Die Couch hier ist schön, oder?','mSMS')}{['l1','l2','l3'].map((id,i)=>f('u9-'+id,181,322+i*21,295))}{t(181,386,350,'Kommst Du auch? Brauche Deine Hilfe!\nMarlene','mSMS')}{c('u9',810,407)}
 {title('10',469,'Schön oder hässlich?','KB 9')}{t(102,507,18,'WÖRTER','mP32Rail')}{t(136,503,650,'a   Notieren Sie die Wörter.','mTitle')}
 {['wersch','hichsäls','galn','nösch','nielk','zurk','orßg','etlich'].map((s,i)=>{const col=i<3?0:i<6?1:2,r=i<3?i:i<6?i-3:i-6,x=[161,399,635][col],y=[533,532,530][col]+r*21;return <span key={s}>{t(x,y,100,(i+1)+'   '+s)}{i===0?art('schwer-ink',256,535,53,19):f('u10a-'+(i+1),[257,495,732][col],y-1,90)}</span>})}{c('u10a',839,577)}
 {t(137,619,650,'b   Ergänzen Sie die Wörter aus a.','mTitle')}
 {['bed-short','bed-long','chair-big','chair-small','lamp-ugly','lamp-beautiful','work-hard','work-easy'].map((n,i)=>{const xy=[[184,647,115,75],[328,645,117,77],[537,640,119,77],[674,640,116,74],[187,785,117,71],[329,784,115,71],[537,783,119,72],[671,781,118,74]][i];return art(n+'-source',...xy as [number,number,number,number])})}
 {t(161,650,25,'1')}{t(520,648,25,'3')}{t(161,788,25,'2')}{t(520,784,25,'4')}
 {t(183,724,200,'Das Bett ist zu')}{t(539,722,230,'Der Stuhl ist zu')}{f('u10b-1a',183,746,106)}{f('u10b-1b',328,745,106)}{f('u10b-3a',539,744,106)}{f('u10b-3b',680,743,104)}
 {t(184,862,280,'Der Mann findet die Lampe')}{f('u10b-2a',383,858,86)}{t(470,862,10,'.')}{t(184,883,280,'Die Frau findet die Lampe')}{f('u10b-2b',376,880,93)}{t(470,883,10,'.')}
 {t(539,860,230,'Die Aufgabe ist')}{art('schwer2-ink',538,882,54,20)}{f('u10b-4b',681,881,101)}{c('u10b',833,891)}
 {title('11',938,'Welche Antwort passt? Kreuzen Sie an und finden Sie das Lösungswort.','KB 10')}{t(108,975,18,'KOMMUNIKATION','mP32Rail')}
 {['Guten Morgen, hier ist dein Kaffee.','Guten Tag, wie geht es Ihnen?','Brauchen Sie Hilfe?','Vielen Dank für das Geschenk.','Das macht 9,99 Euro.'].map((s,i)=>{const x=i<3?165:487,y=[968,1031,1095,965,1028][i];return <span key={s}>{t(x,y,17,String.fromCharCode(97+i))}<i className="mP32Square" style={{left:x+18,top:y+5}}/>{t(x+36,y,330,s)}{[['Danke, gut.','Vielen Dank.'],['Nein, danke.','Danke, gut.'],['Ja, bitte.','Vielen Dank.'],['Bitte, bitte.','Nein, danke.'],['Ja, bitte?','Wie bitte?']][i].map((a,j)=><span key={a}><label className="mP32Option" style={{left:x+39,top:y+25+j*21}}>{i===0?<i/>:<ChoiceInput type="radio" data-native-radio={'u11-'+String.fromCharCode(97+i)+(j+1)} data-value={j} name={'native-ab11-32-u11-'+String.fromCharCode(97+i)} aria-label={String.fromCharCode(97+i)+' '+a} checked={v['u11-'+String.fromCharCode(97+i)]===''+j} onChange={()=>set('u11-'+String.fromCharCode(97+i),''+j)}/>}<span>{[['L','S'],['E','U'],['P','O'],['E','T'],['A','R']][i][j]}</span></label>{t(x+59,y+24+j*21,260,a)}</span>)}{i===0&&art('x-ink',201,1011,19,20)}</span>})}
 {t(488,1104,150,'Lösung:')}{['a','b','c','d','e'].map((s,i)=><span key={s}>{t(488+i*39,1125,25,s)}{i===0?art('s-ink',486,1148,17,20):f('u11-los-'+s,488+i*39,1146,22)}</span>)}
 {c('u11',744,1140,()=>['1','0','0','1'].every((a,i)=>v['u11-'+['b','c','d','e'][i]]===a)&&['U','P','E','R'].every((a,i)=>norm(v['u11-los-'+['b','c','d','e'][i]]||'')===norm(a)))}{art('footer-source',29,1212,230,25)}
 </>})()}
 {page==='33'&&(()=>{
 const t=(x:number,y:number,w:number,s:string,c='')=><div className={'mText '+c} style={{left:x,top:y,width:w}}><Words s={s}/></div>;
 const f=(id:string,x:number,y:number,w:number)=><ChoiceInput className="mField" data-native-field={id} aria-label={id} style={{left:x,top:y,width:w}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const spriteOffsets:Record<string,number>={"c-ink":0,"footer":17,"paper-a":39,"paper-b":74,"paper-c":116,"paper-d":154,"question-ink":195,"rule-rail":224,"tip-rail":329};
 const art=(n:string,x:number,y:number,w:number,h:number)=><div className="mP33Art" style={{left:x,top:y,width:w,height:h}}><PageImage className="mP33Sprite" alt={'Originalabbildung '+n} src="assets/native-ab11/p33-source-sprite.png" style={{left:0,top:-spriteOffsets[n],width:332,height:428}}/></div>;
 const title=(n:string,x:number,y:number,s:string,w=700)=><><div className="mP33Number" style={{left:x,top:y}}>{n}</div>{t(x+38,y,w,s,'mTitle')}</>;
 const c=(id:string,x:number,y:number,test?:()=>boolean)=><div className="mCheck" data-native-task={id} style={{left:x,top:y}}><CheckButton onClick={()=>G({...graded,[id]:test?test():Object.entries(answers(id)).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}/><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const audioButton=(n:string,x:number,y:number)=><button className="mP33Audio" style={{left:x,top:y}} data-track={n} aria-label={'Audio 1 '+n} onClick={()=>{if(audio.current){audio.current.src='assets/ab-cd1-track'+n+'.mp3';void audio.current.play().catch(()=>{})}}}><i>▶</i> 1 {n}</button>;
 return <>{t(130,133,400,'TRAINING: LESEN','mHeader')}<div className="mP33Rule" style={{left:357,top:153,width:476}}/><div className="mP33Tab">4</div>
 {title('1',128,198,'Bringen Sie die E-Mails in die richtige Reihenfolge.')}
 {t(165,250,95,'E-Mail:','mSansBold')}{[1,2,3,4].map((n,i)=><span key={n}>{t(242+i*35,229,25,''+n)}<i className="mP33TableCell" style={{left:229+i*35,top:224}}/>{n===1?art('c-ink',239,254,16,17):f('u1-'+n,231+i*35,251,29)}</span>)}{c('u1',389,248)}
 {art('paper-a',133,278,321,35)}{art('paper-b',453,274,332,42)}{art('paper-c',157,450,316,38)}{art('paper-d',475,418,325,41)}
 {t(153,317,22,'A','mCircle')}{t(176,318,300,'Hallo Susi,\ndanke für den Tipp. Bei Möbel Amra\nkostet ein Sofa 199 € und ein Bett 149 €.\nDas finde ich nicht teuer und die Möbel\nsind wirklich schön.\nGruß Johannes','mMail')}
 {t(459,318,22,'B','mCircle')}{t(486,320,310,'Hallo Johannes,\nbei MÖBEL AMRA in der Blücherstraße gibt es\ngünstige Möbel. Und sie sind wirklich schön.\nSusi','mMail')}
 {t(168,493,22,'C','mCircle')}{t(194,494,300,'Hallo Susi,\nich brauche ein Sofa und ein Bett für mein\nZimmer. Wo finde ich günstige Möbel in\nBerlin? Weißt du das? Ich habe wirklich\nnicht viel Geld. ☹\nGruß Johannes','mMail')}{art('question-ink',224,601,211,29)}
 {t(487,466,22,'D','mCircle')}{t(515,463,300,'Hallo Johannes, super! ☺\nBis bald\nSusi','mMail')}
 {art('tip-rail',522,526,18,99)}<div className="mP33TipTop"/>{t(551,532,280,'Markieren Sie in Texten die Antworten\nauf die W-Fragen: Wer schreibt? Was\nbraucht er/sie? Wo findet er/sie …?\nWie viel kostet …? Wie findet er/sie\n…? So verstehen Sie den Text besser.','mTipText')}
 {title('2',133,675,'Kreuzen Sie an.')}{t(487,685,160,'richtig     falsch','mSmall')}
 {['Susi braucht Möbel.','MÖBEL AMRA hat billige Möbel.','Ein Sofa kostet 149 Euro.','Johannes findet die Möbel hässlich.'].map((s,i)=><span key={s}>{t(170,705+i*21,450,String.fromCharCode(97+i)+'  '+s)}{['r','f'].map((val,j)=><ChoiceInput key={val} type="radio" className="mP33Radio" data-native-radio={'u2-'+String.fromCharCode(97+i)+'-'+val} name={'native-ab11-33-u2-'+String.fromCharCode(97+i)} aria-label={String.fromCharCode(97+i)+' '+val} style={{left:500+j*57,top:707+i*21}} checked={v['u2-'+String.fromCharCode(97+i)]===val} onChange={()=>set('u2-'+String.fromCharCode(97+i),val)}/>)}</span>)}{c('u2',815,772,()=>['f','r','f','f'].every((a,i)=>v['u2-'+String.fromCharCode(97+i)]===a))}
 {t(137,835,480,'TRAINING: AUSSPRACHE','mHeader')}{t(458,840,300,'lange und kurze Vokale','mItalic')}
 <div className="mP33Rule" style={{left:628,top:853,width:212}}/>
 {title('1',136,886,'Hören Sie und sprechen Sie nach.',360)}{audioButton('21',98,894)}{title('3',543,883,'Hören Sie und sprechen Sie nach.',320)}{audioButton('22',503,891)}
 <div className="mP33Vowels">{[['a',[['','a','ber',1],['L','a','mpe',0],['l','a','ng',0],['It','a','lien',1],['pr','a','ktisch',0]]],['e',[['B','e','tt',0],['schw','e','r',1],['s','e','hr',1],['S','e','ssel',0],['schl','e','cht',0]]],['i',[['w','ie','',1],['v','ie','l',1],['T','i','sch',0],['b','i','llig',0],['n','i','cht',0]]],['o',[['S','o','fa',1],['gr','o','ß',1],['k','o','sten',0],['S','o','nderangebot',0]]],['u',[['St','u','hl',1],['k','u','rz',0],['z','u','',1],['g','u','t',1],['h','u','ndert',0]]]].map(([vowel,words])=><div key={vowel as string}>{vowel as string}　{(words as (string|number)[][]).map((a,i)=><span key={i}>{i>0?' – ':''}<span className="tapWord" role="button" tabIndex={0} data-word={a.slice(0,3).join('')} data-phrase={(words as (string|number)[][]).map(p=>p.slice(0,3).join('')).join(' – ')}>{a[0]}<span className={a[3]?'long':'short'}>{a[1]}</span>{a[2]}</span></span>)}</div>)}</div>
 {t(579,914,300,'a  Aber die Lampe aus Italien ist\n    praktisch.\nb  Das Bett ist sehr schwer.\nc  Wie viel? Der Tisch ist nicht billig.\nd  Oh! So groß! Das Sofa ist im\n    Sonderangebot.\ne  Der Stuhl ist gut. Nur hundert Euro.','mSpeech')}
 {title('2',137,1056,'Ergänzen Sie die Regel.')}{art('rule-rail',172,1083,20,105)}<div className="mP33RuleTop"/>
 {t(195,1091,150,'kurz • | lang –','mBank')}{t(191,1117,400,'Vokale spricht man im Deutschen','mRuleText')}{f('au2-1',416,1113,133)}{t(553,1117,200,'(a, e …) oder','mRuleText')}
 {f('au2-2',191,1134,136)}{t(330,1136,530,'(a, e …). Vokal vor Doppel-Konsonant (ll, ss, tt …) ist immer','mRuleText')}
 {f('au2-3',191,1153,136)}{t(330,1155,260,'. Die Kombination „ie“ ist','mRuleText')}{f('au2-4',498,1151,133)}{t(634,1155,180,'. Man spricht i.','mRuleText')}
 {t(191,1174,480,'Der Buchstabe „h“ vor Konsonant (hl …) macht den Vokal','mRuleText')}{f('au2-5',574,1170,135)}{t(711,1174,10,'.','mRuleText')}{c('au2',816,1176)}{art('footer',719,1201,182,22)}
 </>})()}
 {page==='34'&&(()=>{
 const t=(x:number,y:number,w:number,s:string,c='')=><div className={'mText '+c} style={{left:x,top:y,width:w}}><Words s={s}/></div>;
 const f=(id:string,x:number,y:number,w:number)=><ChoiceInput className="mField" data-native-field={id} aria-label={id} style={{left:x,top:y,width:w}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const offsets:Record<string,number>={"number":0,"tisch":20,"klein":38,"der":57,"es":74,"score":92,"footer":227};
 const art=(n:string,x:number,y:number,w:number,h:number)=><div className="mP34Art" style={{left:x,top:y,width:w,height:h}}><PageImage className="mP34Sprite" alt={'Originalabbildung '+n} src="assets/native-ab11/p34-source-sprite.png" style={{left:0,top:-offsets[n],width:422,height:253}}/></div>;
 const title=(n:string,x:number,y:number,s:string,w=700)=><><div className="mP34Number" style={{left:x,top:y}}>{n}</div>{t(x+35,y,w,s,'mTitle')}</>;
 const c=(id:string,x:number,y:number)=><div className="mCheck" data-native-task={id} style={{left:x,top:y}}><CheckButton onClick={()=>G({...graded,[id]:Object.entries(answers(id)).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}/><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const points=(n:string,x:number,y:number)=>t(x,y,90,'_ / '+n+' Punkte','mPoints');
 return <>{t(136,143,200,'TEST','mHeader')}<div className="mP34Rule"/>
 {title('1',135,208,'Schreiben Sie die Zahlen.')}{t(114,246,15,'WÖRTER','mP34Rail')}
 {t(172,238,600,'a  Das kostet fünfhunderttausendfünfundvierzig Euro:')}{art('number',575,234,84,20)}
 {['achthundertdreiundzwanzig','dreitausendneunhundertachtundsiebzig','achthundertvierundachtzigtausend'].map((s,i)=><span key={s}>{t(172,259+i*21,580,String.fromCharCode(98+i)+'  Das kostet '+s+' Euro:')}{f('t1-'+String.fromCharCode(98+i),[526,610,576][i],252+i*21,110)}</span>)}{points('3',774,297)}{c('t1',841,312)}
 {title('2',138,356,'Ergänzen Sie die Möbel.',330)}{title('3',494,349,'Wie heißt das Gegenteil?\nErgänzen Sie.',340)}{t(117,395,15,'WÖRTER','mP34Rail')}{t(486,384,15,'WÖRTER','mP34Rail')}
 {['chits:','petipch:','eplam:','tebt:','knschar:'].map((s,i)=><span key={s}>{t(175,389+i*21,100,String.fromCharCode(97+i)+'  '+s)}{i===0?art('tisch',272,388,36,18):f('t2-'+String.fromCharCode(97+i),274,386+i*21,111)}</span>)}{points('4',410,475)}{c('t2',466,487)}
 {['groß','schön','kurz','billig'].map((s,i)=><span key={s}>{t(531,403+i*21,100,String.fromCharCode(97+i)+'  '+s+'   –')}{i===0?art('klein',622,404,32,19):f('t3-'+String.fromCharCode(97+i),622,399+i*21,80)}</span>)}{points('3',774,468)}{c('t3',841,483)}
 {title('4',142,526,'Ergänzen Sie den Artikel.')}{t(122,565,15,'STRUKTUREN','mP34Rail')}
 {t(178,558,20,'a')}{t(214,556,111,'Wie viel kostet')}{t(350,556,120,'Teppich?')}{art('der',324,558,23,17)}
 {['Couch ist wirklich schön.','Sofa kostet 3999 Euro.','Stuhl ist günstig.','Sessel kostet 19,99 Euro.'].map((s,i)=><span key={s}>{t(178,579+i*21,20,String.fromCharCode(98+i))}{f('t4-'+String.fromCharCode(98+i),217,575+i*21,84)}{t(306,577+i*21,260,s)}</span>)}
 {['299 Euro.','Ja und so praktisch!','Was? Das ist aber sehr teuer.','Finden Sie?','Oh. Das ist billig.'].map((s,i)=><span key={s}><i className="mP34Triangle" style={{left:526,top:559+i*21}}/>{t(545,551+i*21,300,s)}<i className="mP34Square" style={{left:196+i*.6,top:566+i*21}}/></span>)}{points('4',779,637)}{c('t4',842,653)}
 {title('5',145,696,'Ergänzen Sie die Personalpronomen.')}{t(126,734,15,'STRUKTUREN','mP34Rail')}
 {t(181,727,430,'a  Ich finde das Bett sehr schön. Was kostet')}{t(516,727,10,'?')}{art('es',500,726,16,18)}
 {['Der Schrank ist billig und','Das Bild ist sehr modern.','Die Lampe ist nicht schlecht.','Der Tisch ist sehr teuer.'].map((s,i)=>{const x=[393,390,420,378][i],w=[83,83,84,84][i];return <span key={s}>{t(181,748+i*21,350,String.fromCharCode(98+i)+'  '+s)}{f('t5-'+String.fromCharCode(98+i),x,743+i*21,w)}{t(x+w+6,745+i*21,300,['ist praktisch.','ist von Pablo Picasso.','kostet nur 78 Euro.','kommt aus Italien.'][i])}</span>})}{points('4',781,806)}{c('t5',843,821)}
 {title('6',148,865,'Ordnen Sie zu.')}{t(129,903,15,'KOMMUNIKATION','mP34Rail')}{t(187,895,670,'Vielen Dank | Sie kostet | Das ist | Wie viel kostet | Kann ich Ihnen helfen | zu teuer | Brauchen Sie','mBank')}
 {t(186,929,110,'   Guten Tag.')}{f('t6-a',285,921,309)}{t(597,921,80,'(a)?')}
 {t(186,950,110,'   Ja, gerne.')}{f('t6-b',279,943,254)}{t(537,942,270,'(b) denn der Teppich?')}
 {t(186,972,250,'   79,99 Euro.')}{t(186,993,360,'   Was, er kostet nur 79,99 Euro?')}{f('t6-c',427,984,107)}{t(538,983,220,'(c) aber billig!')}
 {t(186,1014,300,'   Ja, das ist ein Sonderangebot.')}{f('t6-d',424,1006,205)}{t(633,1004,120,'(d) auch')}
 {t(205,1035,135,'eine Lampe?')}{f('t6-e',301,1028,204)}{t(509,1027,270,'(e) jetzt 125 Euro.')}
 {t(186,1057,18,' ')}{f('t6-f',207,1050,233)}{t(445,1048,138,'(f), aber das ist')}{f('t6-g',558,1048,94)}{t(658,1046,70,'(g).')}{[936,980,1023].map(y=><i key={y} className="mP34Square" style={{left:186,top:y}}/>)}{[957,1000,1064].map(y=><i key={y} className="mP34Triangle" style={{left:186,top:y}}/>)}{points('7',785,1050)}{c('t6',844,1070)}
 {art('score',435,1089,422,135)}{art('footer',49,1217,234,26)}
 </>})()}
 {page==='35'&&(()=>{
 const t=(x:number,y:number,w:number,s:string,c='')=><div className={'mText '+c} style={{left:x,top:y,width:w}}><Words s={s}/></div>;
 const f=(id:string,x:number,y:number,w:number,label:string)=><ChoiceInput className="mField" data-native-field={id} aria-label={label} style={{left:x,top:y,width:w}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const offsets:Record<string,number>={"strip":0,"tip":992,"ink":1048,"footer":1128};
 const art=(n:string,x:number,y:number,w:number,h:number)=><div className="mP35Art" style={{left:x,top:y,width:w,height:h}}><PageImage className="mP35Sprite" alt={'Originalabbildung '+n} src="assets/native-ab11/p35-source-sprite.png" style={{left:0,top:-offsets[n],width:245,height:1152}}/></div>;
 const title=(n:string,x:number,y:number,s:string)=><><div className="mP35Number" style={{left:x,top:y}}>{n}</div>{t(x+36,y,680,s,'mTitle')}</>;
 const row=(id:string,x:number,y:number,text:string,fieldX:number,w:number)=> <span key={id}>{t(x,y,205,text)}{f(id,fieldX,y-3,w,'Übersetzung '+text)}</span>;
 return <>{t(133,124,600,'LERNWORTSCHATZ','mHeader')}<div className="mP35Rule"/><div className="mP35Tab">4</div>{art('strip',797,183,104,992)}
 {title('1',131,189,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.')}
 {t(168,221,260,'Möbel','mBold')}{t(489,219,260,'Geld','mBold')}
 {['Möbel (Pl.)','Bett das, -en','Bild das, -er','Lampe die, -n','Schrank der, ¨e','  A: Kasten der, ¨','Sessel der, -','  A/CH: Fauteuil der, -s','Sofa das, -s /\n  Couch die, -(e)s / -en','Stuhl der, ¨e','  A: auch: Sessel der, -','Teppich der, -e','Tisch der, -e'].map((s,i)=>{const ys=[242,263,284,305,326,349,369,392,422,466,489,508,529];return s.startsWith('  ')?t(177,ys[i],250,s.trim(),'mVariant'):row('vocab-moebel-'+i,168,ys[i],s,309,161)})}
 {t(170,571,280,'Etwas beschreiben','mBold')}{['groß','hässlich','klein','kurz','lang','leicht','modern','praktisch','(nicht) schlecht','schön','schwer','sehr (groß/\n  klein/…)','zu (groß/klein/…)'].map((s,i)=>row('vocab-adj-'+i,170,[593,614,635,656,677,698,719,740,761,782,803,839,882][i],s,311,161))}
 {['Euro der, -s','100 Euro','Cent der, -s','Preis der, -e','Angebot das, -e','Sonderangebot','kosten','machen','  das macht …','günstig/billig','teuer'].map((s,i)=>row('vocab-geld-'+i,s.startsWith('  ')?499:489,[241,262,283,304,325,346,379,400,421,453,475][i],s.trim(),609,158))}
 {t(491,517,280,'Weitere wichtige Wörter','mBold')}{['Hilfe die, -n','Zimmer das, -','brauchen','finden','sagen','nur','wirklich'].map((s,i)=>row('vocab-weiter-'+i,491,[538,559,591,612,633,665,686][i],s,611,156))}
 {art('tip',517,739,245,56)}{art('ink',525,820,195,80)}
 {title('2',137,952,'Welche Wörter möchten Sie noch lernen? Notieren Sie.')}
 <textarea className="mP35Own" data-native-field="eigene-woerter" aria-label="2 weiterer eigener Wortschatz" style={{left:173,top:974,width:598,height:210}} value={v['eigene-woerter']||''} onChange={e=>set('eigene-woerter',e.target.value)}/>{art('footer',716,1191,185,24)}
 </>})()}
 {page==='36'&&<>
 <div className="mLessonBanner" style={{left:385,top:Y(91),width:460,height:74*sy}}/>{art('hero',224,91,130,74)}{txt(419,112,435,'Was ist das? - Das ist ein F.','mHeader')}
 {title('1',214,'Ergänzen Sie.','KB 2')}{art('objects',168,253,680,55)}
 {[4,8,6,7,5,2,10,1,3,9].map((n,i)=>i===4?<span className="mObjectNumber" style={{left:168+i*68,top:Y(310)}}>5</span>:<ChoiceInput className="mObjectNumber" inputMode="numeric" aria-label={'u1 Bild '+(i+1)} data-native-field={'u1-picture-'+i} style={{left:168+i*68,top:Y(310)}} value={v['u1-picture-'+i]||''} onChange={e=>set('u1-picture-'+i,e.target.value)}/>)}
 {['der','das','die'].map((s,i)=>txt(168+i*228,334,226,'● '+s,'mBank'))}
 {['Kugelschreiber','Fotoapparat','Schlüssel','Bleistift','Feuerzeug','Buch','Flasche','Brille','Tasche','Kette'].map((word,i)=>{const col=i<4?0:i<6?1:2,r=i<4?i:i<6?i-4:i-6,x=168+col*228,y=373+r*29;return <span key={word}>{txt(x,y,24,''+(i+1))}{i===4?txt(x+28,y,186,'Feuerzeug','mExample'):f('u1-'+(i+1),x+28,y-2,186)}</span>})}{rule('u1',168,503,()=>Object.entries(answers('u1')).every(([id,a])=>norm(v[id]||'')===norm(a))&&[4,8,6,7,5,2,10,1,3,9].every((n,i)=>i===4||v['u1-picture-'+i]===''+n))}
 {title('2',549,'Ergänzen Sie ein/eine und der/das/die.','KB 2')}{txt(168,591,650,'a  Hier ist ein Feuerzeug. Das Feuerzeug ist praktisch.','mExample')}
 {['Das ist|Kinderbrille.|Brille ist sehr leicht.','Hier ist|Fotoapparat.|Fotoapparat kostet 299 Euro.','Hier ist|Kette.|Kette ist modern.','Das ist|Buch.|Buch ist interessant.'].map((s,i)=>{const a=s.split('|'),y=624+i*30;return <span key={s}>{txt(168,y,109,String.fromCharCode(98+i)+'  '+a[0])}{f('u2-'+String.fromCharCode(98+i)+'1',282,y-2,74)}{txt(362,y,151,a[1])}{f('u2-'+String.fromCharCode(98+i)+'2',519,y-2,73)}{txt(598,y,248,a[2],'mSmall')}</span>})}{check('u2',168,763)}
 {title('3',810,'Was ist richtig? Markieren Sie.','KB 2')}
 {txt(168,852,199,'a  ▪ Guten Tag.','mSmall')}{txt(188,879,200,'▴ Guten Tag. Ich brauche','mSmall')}{txt(207,906,190,'eine / die Brille.','mExample')}{art('glasses',397,856,118,81)}
 {txt(168,968,360,'b  ▪ Was kostet','mSmall')}{highlight('u3-b1',278,968,['eine','die'])}{txt(375,968,88,'Couch?','mSmall')}{highlight('u3-b2',188,995,['Eine','Die'])}{txt(291,995,179,'Couch kostet','mSmall')}{txt(188,1022,113,'299 Euro.','mSmall')}{art('couch',393,1018,120,75)}
 {txt(550,852,74,'c  ▪ Wo ist','mSmall')}{highlight('u3-c',627,852,['ein','der'])}{txt(717,852,123,'Schlüssel?','mSmall')}{txt(570,879,175,'▴ Hier ist er!','mSmall')}{art('keys',754,885,88,78)}
 {txt(550,970,74,'d  ▪ Ist','mSmall')}{highlight('u3-d',627,970,['ein','das'])}{txt(723,970,121,'Buch gut?','mSmall')}{txt(570,997,190,'▴ Ja, sehr gut.','mSmall')}{art('book',690,1028,118,75)}
 {rule('u3',168,1117,()=>['die','Die','der','das'].every((a,i)=>v[['u3-b1','u3-b2','u3-c','u3-d'][i]]===a))}
 {title('4',1160,'Ergänzen Sie ein - eine - kein - keine.','KB 2')}
 {['Frau.','Sofa.','Sonderangebot.','Stadt.'].map((s,i)=>{const y=1204+i*79;return <span key={s}>{txt(168,y,27,String.fromCharCode(97+i),'mSmall')}{[0,1].map(c=><span key={c}>{txt(204+c*335,y+13,55,'Das ist','mSmall')}{i===0?txt(265+c*335,y+13,85,c===0?'keine':'eine','mExample'):f('u4-'+String.fromCharCode(97+i)+(c===0?'-l':'-r'),265+c*335,y+11,81)}{txt(352+c*335,y+13,140,s,'mSmall')}</span>)}{i===0?<>{art('woman-no',444,y,58,64)}{art('woman-yes',782,y,60,65)}</>:i===1?<>{art('armchair',450,y,65,55)}{art('sofa',781,y,71,55)}</>:i===2?<>{txt(452,y+15,74,'159 €','mBank')}{txt(789,y+15,65,'79 €','mBank')}</>:<>{art('city',447,y,76,52)}{art('austria',780,y,75,55)}</>}</span>})}{check('u4',168,1525)}
 </>}
 {page==='37'&&<>
 {head('BASISTRAINING')}<div className="nabModule">5</div>{title('5',206,'Was ist das? Was glauben Sie?','KB 2')}{txt(143,245,420,'a  Ergänzen Sie.','mTitle')}{art('sketches',593,290,119,223)}
 {['Ein Stift? Ein Buch?','Eine Kette? Eine Flasche?','Ein Schrank? Ein Tisch?','Eine Brille? Eine Lampe?'].map((s,i)=>{const y=289+i*72;return <span key={s}>{txt(168,y,395,(i+1)+'  ▪ Was ist das? '+s,'mSmall')}{txt(188,y+28,66,'▴ Das ist','mSmall')}{i===0?txt(258,y+28,323,'kein Buch, das ist ein Stift.','mExample'):f('u5-'+(i+1),258,y+26,320)}</span>})}{check('u5',168,576)}
 {txt(143,629,699,'b  Zeichnen Sie eigene Aufgaben wie in a. Was ist das? Was glaubt Ihre Partnerin / Ihr Partner?','mTitle')}<svg onMouseDown={e=>e.stopPropagation()} onTouchStart={e=>e.stopPropagation()} className="mDrawing" viewBox="0 0 670 75" aria-label="5b eigene Aufgaben zeichnen" style={{left:168,top:Y(664),width:670,height:75*sy}} onPointerDown={e=>{e.preventDefault();e.stopPropagation();e.currentTarget.setPointerCapture(e.pointerId);const r=e.currentTarget.getBoundingClientRect();set('eigene-zeichnung',(v['eigene-zeichnung']||'')+' M '+((e.clientX-r.left)/r.width*670).toFixed(1)+' '+((e.clientY-r.top)/r.height*75).toFixed(1))}} onPointerMove={e=>{e.stopPropagation();if(!e.currentTarget.hasPointerCapture(e.pointerId))return;const r=e.currentTarget.getBoundingClientRect();set('eigene-zeichnung',(v['eigene-zeichnung']||'')+' L '+((e.clientX-r.left)/r.width*670).toFixed(1)+' '+((e.clientY-r.top)/r.height*75).toFixed(1))}} onPointerUp={e=>e.currentTarget.releasePointerCapture(e.pointerId)}><path d={v['eigene-zeichnung']||''} fill="none" stroke="#315e9f" strokeWidth="3" strokeLinecap="round"/></svg><button className="mEraseDrawing" style={{left:743,top:Y(738)}} onClick={()=>set('eigene-zeichnung','')}>Löschen</button>
 {title('6',760,'nicht oder kein-? Kreuzen Sie an.','KB 2')}
 {['Das ist|nicht|keine|schwer.','Ich habe|nicht|keine|Kinder.','Ich finde das Sofa|nicht|kein|schön.','Ich lebe|nicht|keine|in Deutschland.','Das ist|nicht|kein|richtig.'].map((s,i)=>{const a=s.split('|'),y=803+i*29;return <span key={s}>{txt(168,y,219,String.fromCharCode(97+i)+'  '+a[0])}{[0,1].map(j=><span key={j}>{i===0?<i className={'mPrintedRadio '+(j===0?'selected':'')} style={{left:393+j*117,top:Y(y+1)}}/>:radio('u6-'+String.fromCharCode(97+i),''+j,393+j*117,y+1,a[j+1])}{txt(418+j*117,y,91,a[j+1])}</span>)}{txt(659,y,180,a[3])}</span>})}{rule('u6',168,950,()=>['1','0','0','0'].every((a,i)=>v['u6-'+String.fromCharCode(98+i)]===a))}
 {title('7',1002,'Ordnen Sie zu, ergänzen und vergleichen Sie.','KB 2')}{txt(168,1040,665,'nicht | kein | keine | kein | nicht','mBank')}{txt(168,1073,665,'Deutsch                         Englisch                         Meine Sprache oder andere Sprachen','mBank')}
 {['Das ist kein Buch.','Das ist','Das ist','Ich bin','Ich komme'].map((s,i)=>{const y=1107+i*29;return <span key={s}>{txt(168,y,i===0?225:78,s,'mSmall')}{i>0&&<>{f('u7-'+['','flasche','schluessel','verheiratet','graz'][i],253,y-2,97)}{txt(356,y,105,['','Flasche.','Schlüssel.','verheiratet.','aus Graz.'][i],'mSmall')}</>}{txt(470,y,226,['This is not a book.','This is not a bottle.','This is not a key.','I am not married.','I do not come from Graz.'][i],'mSmall')}{f('eigene-sprache-'+i,704,y-2,139)}</span>})}{check('u7',168,1267)}
 {title('8',1320,'Ordnen Sie zu.','KB 3')}
 {['lamp','chair','book','bottle','key'].map((id,i)=>art(id,319,1358+i*39,55,34))}
 {match('u8',['a  Die Lampe','b  Der Stuhl','c  Das Buch','d  Die Flasche','e  Der Schlüssel'],['ist aus Metall.','ist aus Plastik.','ist aus Glas.','ist aus Papier.','ist aus Holz.'],[2,4,3,1,0],168,1358,650,39)}
 </>}
 {txt(Number(page)%2?704:48,page==='37'?1340:1254,Number(page)%2?190:400,(Number(page)%2?'':'Modul 2   ')+page+' | '+({'30':'dreißig','31':'einunddreißig','32':'zweiunddreißig','33':'dreiunddreißig','34':'vierunddreißig','35':'fünfunddreißig','36':'sechsunddreißig','37':'siebenunddreißig'} as Record<string,string>)[page]+(Number(page)%2?'  Modul 2':''),'mFooter')}
 </div><audio className="nabPlayer" ref={audio} controls hidden aria-label="Originalaudio Arbeitsbuch"/></div>;
}
