import {CheckButton} from '../components/CheckButton';
import {PageImage} from '../components/PageImage';
import {usePageReset} from '../exercises/usePageReset';
import {useLayoutEffect,useRef,useState} from 'react';
import {scanData} from '../scan-data/registry';
import './native-ab11.css';
import './native-ab11-lessons45.css';
const norm=(s:string)=>s.replace(/…/g,'...').normalize('NFC').toLocaleLowerCase('de').trim().replace(/[.,!?;:’']/g,'').replace(/\s+/g,' ');
function Words({s}:{s:string}){return <>{s.split(/(\s+)/).map((w,i)=>/\S/.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-phrase={s} data-word={w.replace(/^[.,!?„"()]+|[.,!?“"()]+$/g,'')}>{w}</span>:w)}</>}
export function NativeAB11Lesson8Start({page}:{page:string}){
 const host=useRef<HTMLDivElement>(null),audio=useRef<HTMLAudioElement>(null),[scale,SS]=useState(1),[,T]=useState(''),[v,S]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem('native-ab11-'+page)||'{}')}catch{return {}}}),[graded,G]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const measure=()=>SS(Math.min(el.clientWidth/901,el.clientHeight/1275));measure();const ro=new ResizeObserver(measure);ro.observe(el);return()=>ro.disconnect()},[]);
 usePageReset(page,'native-ab11-'+page,()=>{S({});G({})});
 const set=(id:string,value:string)=>{const next={...v,[id]:value};S(next);localStorage.setItem('native-ab11-'+page,JSON.stringify(next));G({})};
 const sy=page==='60'?.81:.74;const Y=(y:number)=>130+(y-130)*sy;
 const txt=(x:number,y:number,w:number,s:string,cls='')=><div className={'mText '+cls} style={{left:x,top:cls==='mFooter'?y:Y(y),width:w}}><Words s={s}/></div>;
 const hints:Record<string,string>={};
 const f=(id:string,x:number,y:number,w:number,label=id)=>{const ctx=document.createElement('canvas').getContext('2d');if(ctx)ctx.font="18px 'Times New Roman'";const size=Math.max(10,Math.min(18,18*(w-5)/(ctx?.measureText(v[id]||'').width||1)));return <input placeholder={hints[id]} className="mField" data-native-field={id} aria-label={label} style={{left:x,top:Y(y),width:w,height:22*sy,fontSize:size}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>};
 const open=(id:string,x:number,y:number,w:number,h:number,label=id)=><textarea className="mField mOpen" data-native-field={id} aria-label={label} style={{left:x,top:Y(y),width:w,height:h*sy,'--mopen-height':h*sy+'px'} as React.CSSProperties} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="mArt" alt={'Originalabbildung '+name} src={`assets/native-ab11/p${page}-${name}.png`} style={{left:x,top:Y(y),width:w,height:h*sy}}/>;
 const title=(n:string,y:number,s:string,kb='',x=132,w=700)=><>{kb&&txt(96,y+5,34,kb,'mKB')}<div className={'mNumber '+''} style={{left:x,top:Y(y)}}>{n}</div>{txt(x+35,y,w-35,s,'mTitle')}</>;
 const head=(s:string)=><>{txt(132,135,740,s,'mHeader')}<div className="mRule"/></>;
 const data=scanData['ab-a11:'+page];
 const answers=(group:string)=>Object.fromEntries(data.fields.filter(f=>f.group===group&&f.kind!=='radio'&&f.kind!=='checkbox'&&f.answer!==undefined).map(f=>[f.id,f.answer!]));
 const check=(id:string,x:number,y:number,expected=answers(id))=><div className="mCheck" data-native-task={id} style={{left:x,top:Y(y)}}><CheckButton onClick={()=>G({...graded,[id]:Object.entries(expected).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}></CheckButton><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const rule=(id:string,x:number,y:number,test:()=>boolean)=><div className="mCheck" data-native-task={id} style={{left:x,top:Y(y)}}><CheckButton onClick={()=>G({...graded,[id]:test()})}></CheckButton><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const listen=(n:string,x:number,y:number)=><button className="mListen" aria-label={'Originalaudio 1 '+n} style={{left:x,top:Y(y)}} onClick={()=>{T(n);if(audio.current){audio.current.src='assets/ab-cd1-track'+n+'.mp3';audio.current.play().catch(()=>{})}}}>▶ 1 {n}</button>;
 const radio=(id:string,val:string,x:number,y:number,label:string)=><input className="mRadio" type="radio" name={'native-ab11-'+page+'-'+id} aria-label={label} style={{left:x,top:Y(y)}} checked={v[id]===val} onChange={()=>set(id,val)}/>;
 const score=(y:number,rows:string[][])=><div className="mScore" style={{left:440,top:Y(y)}}><b>Wörter</b><b>Strukturen</b><b>Kommunikation</b>{rows.map((row,r)=>row.map((s,c)=><div key={r+'-'+c}><i style={{background:['#d71910','#edcf00','#3b9e24'][r]}}/>{s} Punkte</div>))}</div>;
 const [endpoint,E]=useState<number|null>(null);
 const snake='LFEMPSCHWIMMBADLDHTPCBSMUSEUMVÜWBFRCCAFÉLZMSGWBORESTAURANTLCG WVTKINONFAKFUEDISCOKTJWGKONZERTBWOVPTHEATERMKVJESBARLEJRBN'.replace(/ /g,'');
 const selected=new Set((v.snake||'').split(',').filter(Boolean).map(Number));
 const mark=(i:number)=>{if(endpoint===null){E(i);return}const a=Math.min(i,endpoint),b=Math.max(i,endpoint),next=new Set(selected),erase=Array.from({length:b-a+1},(_,j)=>a+j).every(j=>next.has(j));for(let j=a;j<=b;j++)erase?next.delete(j):next.add(j);set('snake',[...next].sort((a,b)=>a-b).join(','));E(null)};
 const snakeExpected=new Set(['MUSEUM','CAFÉ','RESTAURANT','KINO','DISCO','KONZERT','THEATER','BAR'].flatMap(w=>Array.from({length:w.length},(_,i)=>snake.indexOf(w)+i)));
 const clocks=['09:55','14:30','17:10','20:15','11:45','07:05','15:50','16:35','09:25'];
 return <div className="nativeAB11 nativeAB11Module1 nativeAB11Lessons45 nativeAB11Next45 nativeAB11Lesson8Start" ref={host} data-native-ab11-page={page}><div className="nabCanvas mCanvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='60'&&<>
 {art('hero',28,77,261,68)}<div className="mLessonBanner" style={{left:323,top:77,width:520,height:68}}/>{txt(348,96,480,'Kein Problem. Ich habe Zeit!','mLessonName')}
 {title('1',211,'Freizeitaktivitäten','KB 4')}{txt(143,253,660,'a  Markieren Sie die Wörter.','mTitle')}
 <div className="mSnake" style={{left:168,top:Y(291),width:670}}>{[...snake].map((ch,i)=><button key={i} aria-label={'Buchstabenschlange '+i+' '+ch} className={(i>=5&&i<15||selected.has(i)?'marked':'')+(endpoint===i?' active':'')} disabled={i>=5&&i<15} onClick={()=>mark(i)}>{ch}</button>)}</div>
 {rule('l8-1a',168,367,()=>selected.size===snakeExpected.size&&[...snakeExpected].every(i=>selected.has(i)))}
 {txt(143,411,680,'b  Ergänzen Sie die Wörter aus a.','mTitle')}
 {[1,2,3,4,5,6,7,8,9].map((n)=>{const c=Math.floor((n-1)/3),r=(n-1)%3,x=168+c*230,y=446+r*113;return <span key={n}>{txt(x,y,20,''+n,'mTiny')}{art(''+n,x+27,y-4,125,68)}{n===4?txt(x,y+72,205,'das Schwimmbad','mExample'):f('b'+n,x,y+70,205)}</span>})}{check('l8-1b',168,776)}
 {title('2',820,'Korrigieren Sie die SMS. Schreiben Sie die Wörter richtig.','KB 4')}
 {txt(168,864,186,'BELEI Judith, gehen\nwir heute MITCHANGTA\nins NOKI?\nKlaus','mSMS')}{txt(373,864,140,'Liebe','mExample')}{f('b10',373,898,145)}{f('b11',373,932,145)}
 {txt(545,864,153,'LOHAL Klaus,\nich habe DIELER\nkeine TIZE.\nLiebe Grüße\nJudith','mSMS')}{f('b12',716,864,122)}{f('b13',716,898,122)}{f('b14',716,932,122)}{check('l8-2',168,1004)}
 {title('3',1048,'Lesen Sie die E-Mails. Schreiben Sie die Sätze neu und beginnen Sie mit den\nmarkierten Wörtern.','KB 4')}
 <div className="mNativeMail" style={{left:168,top:Y(1117),width:320}}>Hallo Clara,<br/>ich kann <mark>heute</mark> nicht in die Aurora-Bar<br/>kommen. Ich habe <mark>leider</mark> noch einen<br/>Termin mit meiner Chefin. Das tut mir sehr leid!<br/>Ich habe <mark>am Wochenende</mark> Zeit. Du auch?<br/>Viele Grüße Tina</div>
 {txt(545,1117,70,'Heute','mExample')}{open('b15',545,1145,293,47,'3 Satz1 nach Heute')}{open('b16',545,1205,293,47,'3 Satz2 Leider')}{open('b17',545,1265,293,47,'3 Satz3 Am Wochenende')}
 <div className="mNativeMail" style={{left:168,top:Y(1316),width:320}}>Hi Elias,<br/>ich gehe <mark>heute Nachmittag</mark> ins<br/>Schwimmbad. Kommst du mit?<br/>Grüße Simon</div>{open('b18',545,1330,293,52,'3 Satz4 Heute Nachmittag')}{check('l8-3',545,1414)}
 </>}
 {page==='61'&&<>
 {head('BASISTRAINING')}{title('4',211,'Wie spät ist es? Ergänzen Sie.','KB 5')}{txt(257,253,250,'Im Gespräch','mTitle')}{txt(545,253,280,'Im Radio/Fernsehen','mTitle')}{txt(257,282,250,'Es ist …')}{txt(545,282,280,'Es ist …')}
 {clocks.map((time,i)=>{const y=316+i*35,key=String.fromCharCode(97+i);return <span key={key}>{txt(168,y,20,key)}<div className={'mDigital '+(i%3===0?'red':'')} style={{left:191,top:Y(y)}}>{time}</div>{i===0?<>{txt(257,y,260,'fünf vor zehn.','mExample')}{txt(545,y,280,'neun Uhr fünfundfünfzig.','mExample')}</>:<>{f('l8-4-'+key+'g',257,y-2,270)}{f('l8-4-'+key+'r',545,y-2,293)}</>}</span>})}
 {check('l8-4',257,644,{...answers('l8-4'),'l8-4-dg':'Viertel nach acht|zwanzig Uhr fünfzehn','l8-4-eg':'Viertel vor zwölf|elf Uhr fünfundvierzig','l8-4-hg':'fünf nach halb fünf|fünfundzwanzig vor fünf','l8-4-ig':'fünf vor halb zehn|fünfundzwanzig nach neun'})}
 {title('5',700,'Ordnen Sie zu.','KB 7')}{txt(168,744,680,'Da kann ich leider nicht. | Das weiß ich noch nicht. | Ja, bis dann. |\nZwei Uhr ist okay. | Hm … Ja, warum nicht? Wann denn?','mBank')}{art('friends',628,800,216,174)}
 {txt(168,810,450,'▪  Sag mal, was machst du am Freitag?')}{txt(168,841,450,'●  Das weiß ich noch nicht.','mExample')}{txt(168,872,450,'▪  Fährst du mit mir Rad? Hast du Lust?')}{txt(168,905,20,'●')}{f('l8-5-2',192,903,420)}
 {txt(168,940,450,'▪  Am Vormittag.')}{txt(168,973,20,'●')}{f('l8-5-1',192,971,420)}{txt(192,1005,430,'Aber am Nachmittag habe ich Zeit.')}
 {txt(168,1040,630,'▪  Gut. Treffen wir uns um vier Uhr?')}{txt(168,1073,660,'●  Das ist zu spät. Kannst du vielleicht auch um zwei?')}{txt(168,1106,20,'▪')}{f('l8-5-3',192,1104,420)}
 {txt(168,1141,660,'●  Gut, dann bis Freitag.')}{txt(168,1174,20,'▪')}{f('l8-5-4',192,1172,280)}{txt(482,1174,100,'Tschüs!')}{check('l8-5',168,1215)}
 {title('6',1261,'Ergänzen Sie die Wochentage und vergleichen Sie.','KB 7')}{txt(168,1303,170,'Deutsch','mTitle mTableHead')}{txt(353,1303,160,'Englisch','mTitle mTableHead')}{txt(530,1303,308,'Meine Sprache oder andere Sprachen','mTitle mTableHead')}
 {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map((day,i)=>{const y=1337+i*30;return <span key={day}>{i===0?txt(168,y,170,'Montag','mExample'):f('l8-6-'+i,168,y-2,170)}{txt(353,y,160,day)}{f('eigene-sprache-'+i,530,y-2,308,'Eigene Übersetzung '+day)}</span>})}{check('l8-6',168,1566)}
 </>}
 {txt(Number(page)%2?704:48,1254,Number(page)%2?190:400,(Number(page)%2?'':'Modul 3   ')+page+' | '+(page==='60'?'sechzig':'einundsechzig')+(Number(page)%2?'  Modul 3':''),'mFooter')}
 </div><audio className="nabPlayer" ref={audio} controls hidden aria-label="Originalaudio Arbeitsbuch"/></div>;
}
