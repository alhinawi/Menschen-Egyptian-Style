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
export function NativeAB11Lesson9Close({page}:{page:string}){
 const host=useRef<HTMLDivElement>(null),audio=useRef<HTMLAudioElement>(null),[scale,SS]=useState(1),[,T]=useState(''),[v,S]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem('native-ab11-'+page)||'{}')}catch{return {}}}),[graded,G]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const measure=()=>SS(Math.min(el.clientWidth/901,el.clientHeight/1275));measure();const ro=new ResizeObserver(measure);ro.observe(el);return()=>ro.disconnect()},[]);
 usePageReset(page,'native-ab11-'+page,()=>{S({});G({})});
 const set=(id:string,value:string)=>{const next={...v,[id]:value};S(next);localStorage.setItem('native-ab11-'+page,JSON.stringify(next));G({})};
 const sy=page==='68'?.67:page==='69'?.74:.62;const Y=(y:number)=>130+(y-130)*sy;
 const txt=(x:number,y:number,w:number,s:string,cls='')=><div className={'mText '+cls} style={{left:x,top:cls==='mFooter'?y:Y(y),width:w}}><Words s={s}/></div>;
 const hints:Record<string,string>={};
 const f=(id:string,x:number,y:number,w:number,label=id)=>{const ctx=document.createElement('canvas').getContext('2d');if(ctx)ctx.font="18px 'Times New Roman'";const size=Math.max(10,Math.min(18,18*(w-5)/(ctx?.measureText(v[id]||'').width||1)));return <input placeholder={hints[id]} className="mField" data-native-field={id} aria-label={label} style={{left:x,top:Y(y),width:w,height:22*sy,fontSize:size,zIndex:id.startsWith('t2-')?10:undefined}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>};
 const open=(id:string,x:number,y:number,w:number,h:number,label=id)=><textarea className="mField mOpen" data-native-field={id} aria-label={label} style={{left:x,top:Y(y),width:w,height:h*sy,'--mopen-height':h*sy+'px'} as React.CSSProperties} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="mArt" alt={'Originalabbildung '+name} src={`assets/native-ab11/p${page}-${name}.png`} style={{left:x,top:Y(y),width:w,height:h*sy}}/>;
 const title=(n:string,y:number,s:string,kb='',x=132,w=700)=><>{kb&&txt(96,y+5,34,kb,'mKB')}<div className={'mNumber '+''} style={{left:x,top:Y(y)}}>{n}</div>{txt(x+35,y,w-35,s,'mTitle')}</>;
 const head=(s:string)=><>{txt(132,135,740,s,'mHeader')}<div className="mRule"/></>;
 const data=scanData['ab-a11:'+page];
 const answers=(group:string)=>Object.fromEntries(data.fields.filter(f=>f.group===group&&f.kind!=='radio'&&f.kind!=='checkbox'&&f.answer!==undefined).map(f=>[f.id,f.answer!]));
 const check=(id:string,x:number,y:number,expected=answers(id))=><div className="mCheck" data-native-task={id} style={{left:x,top:Y(y)}}><CheckButton onClick={()=>G({...graded,[id]:Object.entries(expected).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}></CheckButton><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const rule=(id:string,x:number,y:number,test:()=>boolean,expected?:Record<string,string>)=><div className="mCheck" data-native-task={id} style={{left:x,top:Y(y)}}><CheckButton answers={expected} onClick={()=>G({...graded,[id]:test()})}></CheckButton><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const listen=(n:string,x:number,y:number)=><button className="mListen" aria-label={'Originalaudio 1 '+n} style={{left:x,top:Y(y)}} onClick={()=>{T(n);if(audio.current){audio.current.src='assets/ab-cd1-track'+n+'.mp3';audio.current.play().catch(()=>{})}}}>▶ 1 {n}</button>;
 const radio=(id:string,val:string,x:number,y:number,label:string)=><input className="mRadio" type="radio" data-value={val} name={'native-ab11-'+page+'-'+id} aria-label={label} style={{left:x,top:Y(y)}} checked={v[id]===val} onChange={()=>set(id,val)}/>;
 const score=(y:number,rows:string[][])=><div className="mScore" style={{left:440,top:Y(y)}}><b>Wörter</b><b>Strukturen</b><b>Kommunikation</b>{rows.map((row,r)=>row.map((s,c)=><div key={r+'-'+c}><i style={{background:['#d71910','#edcf00','#3b9e24'][r]}}/>{s} Punkte</div>))}</div>;
 const meal=(id:string,x:number,y:number,s:string)=><div className="mMenuLine" style={{left:x,top:Y(y),width:345}}><button aria-label={'Speisekarte markieren '+id} className={(v[id]==='1'||id==='menu-h1'&&v[id]===undefined)?'marked':''} onClick={()=>set(id,(v[id]==='1'||id==='menu-h1'&&v[id]===undefined)?'0':'1')}>{s}</button></div>;
 const compoundAccentAnswers=()=>Object.fromEntries(data.fields.filter(f=>f.group==='au1'&&f.id!=='au1-a'&&f.answer).flatMap(f=>{
  const r='abcde'.indexOf(f.id.slice(-1));
  const syllables=[[["Kar","tof","fel"],["Sa","lat"],["Kar","tof","fel","sa","lat"]],[["Kä","se"],["Bröt","chen"],["Kä","se","bröt","chen"]],[["Zwie","bel"],["Sup","pe"],["Zwie","bel","sup","pe"]],[["Obst"],["Ku","chen"],["Obst","ku","chen"]],[["Zi","tro","ne"],["Eis"],["Zi","tro","nen","eis"]]][r];
  return f.answer!.split(/\s+/).flatMap((token,c)=>{const at=syllables?.[c]?.findIndex(s=>norm(s).startsWith(norm(token)));return at!==undefined&&at>=0?[[`akzent-${r}-${c}`,String(at)]]:[]});
 }));
 const stress=(id:string,x:number,y:number,syllables:string[],correct:number,fixed=false)=><div className="mSyllables" data-native-field={fixed?undefined:id} data-value={v[id]??''} style={{left:x,top:Y(y)}}>{syllables.map((s,i)=><button key={i} aria-label={id+' Silbe '+i+' '+s} disabled={fixed} className={(fixed?correct===i:v[id]===''+i)?'stressed':''} onClick={()=>set(id,''+i)}>{s}</button>)}</div>;
 return <div className="nativeAB11 nativeAB11Module1 nativeAB11Lessons45 nativeAB11Next45 nativeAB11Lesson9Close" ref={host} data-native-ab11-page={page}><div className="nabCanvas mCanvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='68'&&<>
 {head('BASISTRAINING')}{title('9',211,'Wie heißen die Wörter?','KB 6')}{txt(168,253,670,'TERMIN | BROT | SALAT | BRÖTCHEN | LAMPE | OBST | STUHL | KÄSE | WURST | KALENDER\nTISCH | BÜRO','mBank')}
 {['lamp','salad','calendar','roll','bread','chair'].map((name,i)=>{const col=Math.floor(i/2),row=i%2,x=168+col*228,y=319+row*192,k=String.fromCharCode(97+i);return <span key={name}>{txt(x,y,20,k,'mTiny')}{art(name,x,y+19,194,119)}{i===0?txt(x,y+151,211,'die Tischlampe','mExample'):f('l9-9-'+k,x,y+149,211)}</span>})}{check('l9-9',168,709)}
 {title('10',754,'Lesen Sie die Speisekarte.','KB 7')}{txt(143,797,310,'a  Ordnen Sie zu.','mTitle')}{txt(168,838,320,'Hauptgerichte | Desserts |\nVorspeisen | Getränke','mBank')}{txt(143,914,338,'b  Was essen und trinken die Personen?\n    Markieren Sie in der Speisekarte und\n    schreiben Sie die Rechnung.','mTitle')}{art('couple',132,1032,355,230)}
 {txt(168,1320,320,'RESTAURANT Zur schönen Aussicht','mSmall')}{txt(168,1360,320,'Rechnung','mTitle')}{txt(168,1400,320,'Fisch mit Reis              6,80 €','mExample')}{open('eigene-rechnung',168,1444,320,122,'10b Rechnung')}
 {txt(523,786,320,'RESTAURANT','mSmall')}{txt(523,823,320,'Zur schönen Aussicht','mRestaurant')}{txt(523,882,320,'Öffnungszeiten: Dienstag–Sonntag 11 bis 24 Uhr\nMontag Ruhetag','mMenuText')}
 {f('l9-10a-1',523,958,225)}
 {['Kartoffelsuppe mit Brot                    3.80 €','Zwiebelsuppe mit Käse überbacken      3.50 €','Tomatensuppe mit Sahnehäubchen    3.80 €'].map((s,i)=>meal('menu-v'+i,523,998+i*29,s))}
 {f('l9-10a-2',523,1103,225)}
 {['Schweinebraten mit Knödel                  9.80 €','Fisch mit Reis                                    6.80 €','Wiener Schnitzel mit Kartoffelsalat     9.80 €','Großer Salat mit Schinken                   7.90 €'].map((s,i)=>meal('menu-h'+i,523,1143+i*29,s))}
 {f('l9-10a-3',523,1277,225)}
 {['Warmer Apfelstrudel mit Vanilleeis      4.80 €','Obstsalat','gemischtes Eis                                  3.50 €','Schokoladenkuchen hausgemacht        2.50 €'].map((s,i)=>meal('menu-d'+i,523,1317+i*29,s))}
 {txt(523,1451,330,'Getränke:','mExample')}
 {['Bier 0.3 l                                          2.80 €','Mineralwasser 0.4 l                           2.80 €','Apfelsaft 0.4 l                                  3.20 €','Orangensaft 0.4 l                              3.20 €','Cola 0.2 l                                         2.80 €'].map((s,i)=>meal('menu-g'+i,523,1487+i*29,s))}{check('l9-10a',523,1664)}
 </>}
 {page==='69'&&<>
 {head('TRAINING: SPRECHEN')}<div className="nabModule">9</div>{title('1',211,'Sie sprechen mit Freunden über das Thema „Essen und Trinken“.')}{txt(143,254,500,'a  Suchen Sie Wörter.','mTitle')}
 {['Essen','Getränke'].map((s,i)=><span key={s}><div className="mOval" style={{left:168+i*267,top:Y(322),width:156,height:44*sy}}><Words s={s}/></div>{i===0&&txt(295,293,120,'Brötchen','mExample')}{open('eigene-'+s,168+i*267,384,195,75,s+' sammeln')}</span>)}
 {txt(643,273,200,'Machen Sie sich Notizen zu\nwichtigen Themen (z.B.: Essen,\nFreizeit …). Sammeln Sie\nWörter zu diesen Themen und\nüberlegen Sie mögliche Fragen.\nSo fühlen Sie sich sicher.','mTip mSmall')}
 {txt(143,484,670,'b  Finden Sie Fragen.','mTitle')}{txt(168,527,670,'Was trinkst du immer zum Frühstück?\nIsst / Trinkst du gern …?\nMagst du …?\nWas ist dein Lieblingsessen?','mQuestionList')}{open('eigene-fragen',550,528,293,118,'Eigene Fragen')}
 {title('2',702,'Sprechen Sie mit Ihrer Partnerin / Ihrem Partner. Verwenden Sie dabei die Kärtchen.')}
 {['Tee','Käse','Lieblingsessen','Salat','Frühstück','Kuchen'].map((s,i)=><div key={s} className="mSpeakingCard" style={{left:168+i%3*230,top:Y(753+Math.floor(i/3)*144),width:206,height:112*sy}}><div><Words s="Thema: Essen und Trinken"/></div><Words s={s}/></div>)}
 {txt(168,1054,315,'▪ Trinkst du gern Tee?\n▴ Ja, oft.','mSmall')}{txt(510,1054,330,'▴ Was isst du gern zum Frühstück?\n▪ Ich frühstücke nur am Wochenende. Ich …','mSmall')}
 {txt(132,1170,670,'TRAINING: AUSSPRACHE','mHeader')}{txt(500,1177,340,'Wortakzent bei Komposita','mSmall')}
 {title('1',1232,'Hören Sie und markieren Sie den\nWortakzent.','',132,350)}{listen('41',96,1232)}
 {[[['Kar','tof','fel'],['Sa','lat'],['Kar','tof','fel','sa','lat']],[['Kä','se'],['Bröt','chen'],['Kä','se','bröt','chen']],[['Zwie','bel'],['Sup','pe'],['Zwie','bel','sup','pe']],[['Obst'],['Ku','chen'],['Obst','ku','chen']],[['Zi','tro','ne'],['Eis'],['Zi','tro','nen','eis']]].map((row,r)=><span key={r}>{txt(168,1315+r*37,18,'abcde'[r],'mSmall')}{row.map((s,c)=><span key={c}>{stress('akzent-'+r+'-'+c,194+[0,105,213][c],1315+r*37,s,[1,0,0,0,1][r]===1?(r===0&&c===1?1:c===1?0:1):0,r===0)}{c<2&&txt(194+[87,190][c],1315+r*37,20,'–','mSmall')}</span>)}</span>)}
 {/* Scan-data p69 au1-b..e gives the stressed syllable in each of the three words.
   Index 0 = first syllable, index 1 = second; row a is the printed example. */}
 {rule('au1',168,1510,()=>Object.entries(compoundAccentAnswers()).every(([id,a])=>v[id]===a),compoundAccentAnswers())}
 {listen('42',96,1564)}{txt(168,1564,320,'Hören Sie noch einmal und sprechen\nSie nach.','mTitle')}
 {title('2',1232,'Suchen Sie im Kursbuch (im Wörterbuch,\nin der alphabetischen Wortliste) fünf\nweitere Wörter. Sprechen Sie die Wörter.\nAchten Sie auf den Wortakzent.','',505,338)}{open('eigene-komposita',540,1390,303,180,'Fünf weitere Wörter und Wortakzent')}
 </>}
 {page==='70'&&<>
 {head('TEST')}{title('1',211,'Ordnen Sie zu.')}{txt(168,253,670,'Ei | Orangen | Suppe | Braten | Kuchen | Tee | Äpfel | Zitronen | Sahne','mBank')}
 {txt(168,301,670,'a  ▪ Guten Tag. Was möchten Sie?','mSmall')}{txt(192,335,260,'▴ Ein Stück Kuchen mit','mSmall')}{f('t1-a',453,333,161)}{txt(622,335,170,'bitte.','mSmall')}
 {txt(168,371,670,'b  ▪ Mama, können wir einen Obstsalat machen?','mSmall')}{txt(192,405,208,'▴ Gute Idee! Wir brauchen','mSmall')}{f('t1-b1',407,403,115)}{txt(529,405,10,',','mSmall')}{f('t1-b2',546,403,115)}{txt(668,405,40,'und','mSmall')}{f('t1-b3',714,403,125)}
 {txt(168,441,670,'c  ▪ Ich esse gern Müsli zum Frühstück, und du?','mSmall')}{txt(192,475,530,'▴ Ich esse immer Brot mit Wurst und Käse und manchmal auch ein','mSmall')}{f('t1-c',729,473,110)}
 {txt(168,511,168,'d  ▪ Hier ist der','mSmall')}{f('t1-d',343,509,160)}{txt(510,511,330,'mit Salat. Guten Appetit!','mSmall')}
 {txt(168,547,183,'e  ▴ Ich koche eine','mSmall')}{f('t1-e',358,545,160)}{txt(525,547,314,'mit Kartoffeln und Tomaten.','mSmall')}
 {txt(168,583,380,'f  ▪ Möchten Sie etwas trinken?  ▴ Oh ja! Einen','mSmall')}{f('t1-f',555,581,160)}{txt(722,583,117,'bitte.','mSmall')}
 {rule('l9t-1',168,631,()=>Object.entries(answers('l9t-1')).filter(([k])=>!k.startsWith('t1-b')).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))&&['t1-b1','t1-b2','t1-b3'].map(k=>norm(v[k]||'')).sort().join('|')===['Äpfel','Orangen','Zitronen'].map(norm).sort().join('|'))}
 {title('2',683,'Wie heißen die Artikel? Bilden Sie neue Wörter.')}
 {['Obst','Kartoffel','Apfel','Schinken'].map((s,i)=>{const y=730+i*39;return <span key={s}>{txt(168,y,18,'abcd'[i],'mSmall')}{i===0?txt(193,y,38,'das','mExample'):f('t2-'+'abcd'[i],193,y-2,45)}{i!==3&&f(['t2-k','t2-br','t2-s'][i],427,y-2,45)}{txt(610,y,28,'→','mSmall')}{i===3?txt(647,y,192,'der Obstsalat','mExample'):f('compound-'+i,647,y-2,192)}</span>})}
 <LineMatching id="t2match" left={['Obst','Kartoffel','Apfel','Schinken']} right={['\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0Kuchen','\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0Brötchen','\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0Suppe','\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0Salat']} values={v} onMatch={set} leftX={246} rightX={387} leftWidth={120} rightWidth={211} ys={[730,769,808,847].map(Y)} width={901} height={1275} fontSize={18} example={[0,3]}/><div className="mText mExample" style={{left:456,top:Y(847),width:38,zIndex:10}}><Words s="der"/></div>
 {rule('l9t-2',168,905,()=>Object.entries({...answers('l9t-2'),'compound-0':'der Apfelkuchen','compound-1':'das Schinkenbrötchen','compound-2':'die Kartoffelsuppe'}).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))&&[3,2,0,1].every((r,i)=>i===0||v['t2match-'+i]===''+r))}
 {title('3',958,'Ergänzen Sie die Verben in der richtigen Form.')}{txt(168,1001,670,'a  Was isst du gern zum Frühstück?','mSmall')}
 {[["b  Mö",'t3-b','ihr einen Kaffee?'],['c  Melanie ma','t3-c','keinen Braten.'],['d  Ich es','t3-d','sehr oft Schokolade.'],['e  Mö','t3-e','Sie einen Salat mit Schinken und Ei?']].map((r,i)=>{const y=1038+i*35,x=[234,308,256,240][i];return <span key={r[1]}>{txt(168,y,x-171,r[0],'mSmall')}{f(r[1],x,y-2,85)}{txt(x+93,y,839-x-93,r[2],'mSmall')}</span>})}{check('l9t-3',168,1195)}
 {title('4',1248,'Was ist richtig? Kreuzen Sie an.')}
 {[["Möchten Sie ein Eis?",'Ja, gleichfalls!','Oh ja, bitte!','Nein, bitte!'],['Guten Appetit!','Nein, gleichfalls!','Danke, ebenfalls!','Ja, gleichfalls!'],['Hier ist die Suppe. Möchten Sie auch einen Salat?','Nein, bitte!','Danke, bitte!','Nein, danke!'],['Frühstücken wir zusammen?','Ja, gern!','Ja, gleichfalls!','Ja, danke!'],['Magst du Fisch?','Bitte, nein!','Nein, gern.','Nein, nicht so gern.']].map((row,i)=><span key={i}>{txt(168,1295+i*82,670,'abcde'[i]+'  ▪ '+row[0],'mSmall')}{row.slice(1).map((s,j)=>{const x=193+j*218,y=1332+i*82;return <span key={j}>{radio('t4-'+'abcde'[i],s,x,y,s)}{txt(x+23,y,195,'▴ '+s,'mSmall')}</span>})}</span>)}
 {rule('l9t-4',168,1710,()=>['Oh ja, bitte!','Danke, ebenfalls!','Nein, danke!','Ja, gern!','Nein, nicht so gern.'].every((s,i)=>v['t4-'+'abcde'[i]]===s))}{score(1770,[['0–4','0–6','0–2'],['5–6','7–10','3'],['7–8','11–13','4–5']])}
 </>}
 {txt(Number(page)%2?704:48,1254,Number(page)%2?190:400,(Number(page)%2?'':'Modul 3   ')+page+' | '+({'68':'achtundsechzig','69':'neunundsechzig','70':'siebzig'} as Record<string,string>)[page]+(Number(page)%2?'  Modul 3':''),'mFooter')}
 </div><audio className="nabPlayer" ref={audio} controls hidden aria-label="Originalaudio Arbeitsbuch"/></div>;
}
