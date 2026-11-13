import {CheckButton} from '../components/CheckButton';
import {PageImage} from '../components/PageImage';
import {usePageReset} from '../exercises/usePageReset';
import {useLayoutEffect,useRef,useState} from 'react';
import {scanData} from '../scan-data/registry';
import './native-ab11.css';
import './native-ab11-lessons45.css';
import './native-ab11-lesson10mid.css';
const norm=(s:string)=>s.normalize('NFC').toLocaleLowerCase('de').trim().replace(/[.,!?;:’']/g,'').replace(/\s+/g,' ');
function Words({s}:{s:string}){return <>{s.split(/(\s+)/).map((w,i)=>/\S/.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-phrase={s} data-word={w.replace(/^[.,!?„"()]+|[.,!?“"()]+$/g,'')}>{w}</span>:w)}</>}
export function NativeAB11Lesson10Mid({page}:{page:string}){
 const host=useRef<HTMLDivElement>(null),audio=useRef<HTMLAudioElement>(null),[scale,SS]=useState(1),[,T]=useState(''),[v,S]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem('native-ab11-'+page)||'{}')}catch{return {}}}),[graded,G]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const measure=()=>SS(Math.min(el.clientWidth/901,el.clientHeight/1275));measure();const ro=new ResizeObserver(measure);ro.observe(el);return()=>ro.disconnect()},[]);
 usePageReset(page,'native-ab11-'+page,()=>{S({});G({})});
 const set=(id:string,value:string)=>{const next={...v,[id]:value};S(next);localStorage.setItem('native-ab11-'+page,JSON.stringify(next));G({})};
 const Y=(y:number)=>y;
 const txt=(x:number,y:number,w:number,s:string,cls='')=><div className={'mText '+cls} style={{left:x,top:cls==='mFooter'?y:Y(y),width:w}}><Words s={s}/></div>;
 const f=(id:string,x:number,y:number,w:number,label=id)=>{const ctx=document.createElement('canvas').getContext('2d');if(ctx)ctx.font="16px 'Times New Roman'";const size=Math.max(11,Math.min(16,16*(w-6)/(ctx?.measureText(v[id]||'').width||1)));return <input className="mField" data-native-field={id} aria-label={label} style={{left:x,top:Y(y),width:w,fontSize:size}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>};
 const open=(id:string,x:number,y:number,w:number,h:number,label=id)=><textarea className="mField mOpen" data-native-field={id} aria-label={label} style={{left:x,top:Y(y),width:w,'--mopen-height':h+'px'} as React.CSSProperties} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="mArt" alt={'Originalabbildung '+name} src={`assets/native-ab11/p${page}-${name}.png`} style={{left:x,top:Y(y),width:w,height:h}}/>;
 const title=(n:string,y:number,s:string,kb='',x=149)=><>{kb&&txt(x-42,y+5,40,kb,'mKB')}<div className="mNumber" style={{left:x,top:Y(y)}}>{n}</div>{txt(x+35,y,700,s,'mTitle')}</>;
 const head=(s:string,ruleX:number,ruleY:number,x=143,y=138)=><>{txt(x,y,740,s,'mHeader')}<div className="mHRule" style={{left:ruleX,top:ruleY,width:900-ruleX}}/></>;
 const data=scanData['ab-a11:'+page];
 const answers=(group:string)=>Object.fromEntries(data.fields.filter(fl=>fl.group===group&&fl.kind!=='radio'&&fl.kind!=='checkbox'&&fl.answer!==undefined).map(fl=>[fl.id,fl.answer!]));
 const check=(id:string,x:number,y:number,expected=answers(id))=><div className="mCheck" data-native-task={id} style={{left:x,top:Y(y)}}><CheckButton onClick={()=>G({...graded,[id]:Object.entries(expected).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}></CheckButton><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const rule=(id:string,x:number,y:number,test:()=>boolean)=><div className="mCheck" data-native-task={id} style={{left:x,top:Y(y)}}><CheckButton onClick={()=>G({...graded,[id]:test()})}></CheckButton><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const markS=(x:number,y:number)=><div className="mText mMark" style={{left:x,top:Y(y),width:16}}><span className="mSq">■</span></div>;
 const markT=(x:number,y:number)=><div className="mText mMark" style={{left:x,top:Y(y),width:16}}><span className="mTr">▲</span></div>;
 const markSB=(x:number,base:number)=><div className="mText mMarkSq" style={{left:x,top:Y(base-11),width:11,height:11}}/>;
 const markTB=(x:number,base:number)=><div className="mText mMarkTr" style={{left:x,top:Y(base-11)}}/>;
 const listen=(n:string,x:number,y:number)=><button className="mListen" aria-label={'Originalaudio 1 '+n} style={{left:x,top:Y(y)}} onClick={()=>{T(n);if(audio.current){audio.current.src='assets/ab-cd1-track'+parseInt(n)+'.mp3';audio.current.play().catch(()=>{})}}}>▶ 1 {n}</button>;
 const radioG=(fid:string,group:string,val:string,x:number,y:number,label:string)=><input className="mRadio" data-native-radio={fid} type="radio" name={'native-ab11-'+page+'-'+group} aria-label={label} style={{left:x,top:Y(y)}} checked={v[group]===val} onChange={()=>set(group,val)}/>;
 const side=(s:string,y:number)=><div className="nabSide" style={{left:100,top:Y(y)}}>{s}</div>;
 const sq='▪';
 const footerW:Record<string,string>={'79':'neunundsiebzig','80':'achtzig','81':'einundachtzig','82':'zweiundachtzig','83':'dreiundachtzig','84':'vierundachtzig','85':'fünfundachtzig','86':'sechsundachtzig','87':'siebenundachtzig'};
 return <div className={"nativeAB11 nativeAB11Module1 nativeAB11Lessons45 nativeAB11Lesson10Mid"+(Number(page)>=84?' nativeAB11L11':'')} ref={host} data-native-ab11-page={page}><div className="nabCanvas mCanvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>
 <div className="mPageInner" style={{position:'absolute',left:87,top:0,width:901,height:1275}}>
 {page==='79'&&<>
 {art('tab',863,90,38,66)}
 {head('BASISTRAINING',345,154)}
 {side('STRUKTUREN',235)}{side('STRUKTUREN',563)}{side('STRUKTUREN',864)}
 {title('4',202,'Trennbar oder nicht? Ergänzen Sie, wo nötig.','KB 5')}
 <div className="mText" style={{left:177,top:230,width:560}}><Words s={'a  '+sq+' '}/><span className="mExample">Steigt</span><Words s=" ihr am Goetheplatz "/><span className="mExample">ein</span><Words s="? (einsteigen)"/></div>
 <div className="mText" style={{left:177,top:254,width:560}}><Words s={'b  '+sq+' Wann '}/><span className="mExample">telefonierst</span><Words s=" du mit Oma ____/____? (telefonieren)"/></div>
 {txt(177,276,36,'c  '+sq)}{txt(212,276,92,'Heute Abend')}{f('u4-c1',305,272,87)}{txt(398,276,40,'wir')}{f('u4-c2',441,272,77)}{txt(524,276,290,'. Kommst du auch? (fernsehen)')}
 {txt(177,294,36,'d  '+sq)}{txt(212,294,75,'Wo')}{f('u4-d1',244,294,100)}{txt(352,294,45,'ihr')}{f('u4-d2',402,294,78)}{txt(486,294,110,'? (umsteigen)')}
 {txt(177,318,36,'e  '+sq)}{f('u4-e1',212,318,88)}{txt(311,318,170,'ich bitte einen Kaffee')}{txt(486,318,220,'______? (bekommen)')}
 {txt(177,339,36,'f  '+sq)}{txt(211,339,75,'Vielleicht')}{f('u4-f1',291,335,84)}{txt(383,339,250,'ich am Samstag meine Freundin')}{f('u4-f2',639,335,76)}{txt(721,339,120,'. (mitbringen)')}
 {txt(177,361,36,'g  '+sq)}{txt(211,361,95,'Am Sonntag')}{f('u4-g1',310,363,77)}{txt(394,361,175,'ich erst um 12 Uhr')}{txt(575,361,80,'______.')}{txt(650,361,120,'(frühstücken)')}
 {check('u4',177,384)}
 {title('5',419,'Schreiben Sie eigene Sätze wie in 4 und tauschen Sie mit Ihrer\nPartnerin / Ihrem Partner.','KB 5')}
 {open('u5-own',177,468,660,46,'5 eigene Sätze')}
 {title('6',525,'Schreiben Sie Sätze.')}
 {txt(177,560,30,'a')}{txt(197,558,340,'aussteigen/am Rathausplatz/wir.')}
 {txt(177,581,30,'b')}{txt(197,579,340,'der Zug/wo/abfahren/nach Berlin?')}
 {txt(177,604,30,'c')}{txt(197,602,340,'mich/du/anrufen?')}
 {txt(533,560,30,'d')}{txt(553,558,300,'dich/abholen/um 16.45 Uhr/ich.')}
 {txt(533,581,30,'e')}{txt(553,579,300,'einen Kuchen/ihr/mitbringen?')}
 {txt(533,604,30,'f')}{txt(553,602,300,'ankommen/wann/der Bus?')}
 <div className="mGridTable" style={{left:175,top:626,width:420,height:151}}/>
 {txt(184,640,18,'a')}{txt(184,665,18,'b')}{txt(184,689,18,'c')}{txt(184,714,18,'d')}{txt(184,738,18,'e')}{txt(184,763,18,'f')}
 <div className="mText mExample" style={{left:206,top:640,width:95}}>Wir</div><div className="mText mExample" style={{left:310,top:640,width:60}}>steigen</div><div className="mText mExample" style={{left:378,top:640,width:160}}>am Rathausplatz</div><div className="mText mExample" style={{left:548,top:640,width:45}}>aus.</div>
 {txt(206,665,60,'Wo')}{f('u6-b2',305,661,67)}<div className="mText mExample" style={{left:378,top:665,width:160}}>der Zug nach Berlin</div>{f('u6-b4',545,661,35)}{txt(583,665,15,'?')}
 {f('u6-c1',203,685,102)}{f('u6-c2',305,685,67)}{f('u6-c3',372,685,173)}{f('u6-c4',545,685,47)}{txt(597,689,15,'?')}
 {f('u6-d1',203,710,102)}{f('u6-d2',305,710,67)}{f('u6-d3',372,710,173)}{f('u6-d4',545,710,47)}{txt(597,714,15,'.')}
 {f('u6-e1',203,734,102)}{f('u6-e2',305,734,67)}{f('u6-e3',372,734,173)}{f('u6-e4',545,734,47)}{txt(597,738,15,'?')}
 {f('u6-f1',203,759,102)}{f('u6-f2',305,759,67)}{f('u6-f3',372,759,173)}{f('u6-f4',545,759,47)}{txt(597,763,15,'?')}
 {check('u6',620,795)}
 {title('7',833,'Fremd in der Stadt. Was denkt Jutta? Schreiben Sie.','KB 6')}
 {art('woman',131,879,272,241)}
 <div className="mText mExample" style={{left:422,top:862,width:330}}>Also, ich steige am Flughafen in die S-Bahn ein.</div>
 {txt(422,888,135,'Am Hauptbahnhof')}{f('u7-1',561,882,151)}
 {f('u7-2',421,907,193)}{txt(620,907,130,'. Am Eifelplatz')}
 {f('u7-3',421,926,140)}{txt(566,926,65,'und')}{f('u7-4',636,926,116)}
 {f('u7-5',421,947,320)}{txt(746,947,15,'.')}
 <div className="mText mExample" style={{left:427,top:1020,width:310}}>Zentrum Köln → „Schulz und Partner“ (Praktikum Mo-Fr)</div>
 <div className="mText mExample" style={{left:427,top:1044,width:310}}>– am Flughafen in die S-Bahn einsteigen</div>
 <div className="mText mExample" style={{left:427,top:1066,width:310}}>– am Hauptbahnhof in die U-Bahn umsteigen</div>
 <div className="mText mExample" style={{left:427,top:1088,width:310}}>– am Eifelplatz aussteigen</div>
 <div className="mText mExample" style={{left:427,top:1110,width:310}}>– Frau Lerch anrufen</div>
 {rule('u7',421,975,()=>{const seg=(...ids:string[])=>norm(ids.map(k=>v[k]||'').join(' '));return seg('u7-1','u7-2').includes(norm('steige ich in die U-Bahn um'))&&norm(v['u7-3']||'')===norm('steige ich aus')&&seg('u7-4','u7-5').includes(norm('rufe Frau Lerch an'))})}
 </>}
 {page==='80'&&<>
 {head('BASISTRAINING',345,150)}
 {side('WÖRTER',261)}{side('KOMMUNIKATION',683)}{side('HÖREN',1067)}
 {title('8',203,'Ergänzen Sie und vergleichen Sie.','KB 7',125)}
 <div className="mText mBankList" style={{left:158,top:233,width:340}}><Words s="Flugzeug | Taxi | Straßenbahn | "/><span className="mStruck">Zug</span><Words s=" | U-Bahn | Bus"/></div>
 <div className="mTableHead8" style={{left:255,top:258,width:630}}><span style={{left:34}}>Deutsch</span><span style={{left:158}}>Englisch</span><span style={{left:342,whiteSpace:'nowrap'}}>Meine Sprache oder andere Sprachen</span></div>
 {['a','b','c','d','e','f'].map((k,i)=>{const y=301+i*51;return <span key={k}>{txt(161,y,18,k)}{art('photo'+k,167,y-7,131,58)}</span>})}
 <div className="mText mExample" style={{left:305,top:301,width:115}}>der Zug.</div>
 {txt(413,301,150,'train')}{txt(413,355,150,'plane')}{txt(413,410,150,'taxi')}{txt(413,462,170,'tram, streetcar')}{txt(413,513,150,'bus')}{txt(413,558,170,'underground')}
 {f('u8-b',291,355,113)}{f('u8-c',291,406,113)}{f('u8-d',291,457,113)}{f('u8-e',291,508,113)}{f('u8-f',291,560,113)}
 {['a','b','c','d','e','f'].map((k,i)=>f('u8s-'+k,700,299+i*51,155,'8 eigene Sprache '+k))}
 {check('u8',161,608)}
 {title('9',641,'Mike in München, Teil 1','KB 7',125)}
 {txt(161,679,300,'Ordnen Sie die Fragen zu.','mTitle')}
 <div className="mText mBank" style={{left:161,top:705,width:480,fontSize:14}}><Words s="Wann kommst du? | Holst du mich ab? | Nimmst du den Zug? | "/><span className="mStruck">Hast du Zeit?</span></div>
 {art('man',695,556,202,218)}
 <div className="mText" style={{left:165,top:740,width:520}}><span className="mSq">■</span><Words s="  Hallo Tom, hier ist Mike."/></div>
 <div className="mText" style={{left:165,top:761,width:520}}><span className="mTr">▲</span><Words s="  Hallo Mike, wie geht's?"/></div>
 <div className="mText" style={{left:165,top:783,width:560}}><span className="mSq">■</span><Words s="  Gut, danke. Ich bin nächste Woche in München und möchte dich gern besuchen."/></div>
 <div className="mText mExample" style={{left:181,top:805,width:200}}>Hast du Zeit?</div>
 <div className="mText" style={{left:165,top:826,width:120}}><span className="mTr">▲</span><Words s="  Ja natürlich!"/></div>{f('u9-q1',296,821,534)}
 <div className="mText" style={{left:165,top:848,width:300}}><span className="mSq">■</span><Words s="  Am Mittwoch, um 20:50 Uhr."/></div>
 <div className="mText" style={{left:165,top:868,width:16}}><span className="mTr">▲</span></div>{f('u9-q2',181,864,650)}
 <div className="mText" style={{left:165,top:890,width:275}}><span className="mSq">■</span><Words s="  Ja. Ich komme am Ostbahnhof an."/></div>{f('u9-q3',444,889,384)}
 <div className="mText" style={{left:165,top:911,width:560}}><span className="mTr">▲</span><Words s="  Na klar, gern. Ich arbeite bis 20 Uhr. Dann hole ich dich ab."/></div>
 <div className="mText" style={{left:165,top:932,width:300}}><span className="mSq">■</span><Words s="  Danke, dann bis Mittwoch!"/></div>
 {check('u9',167,954)}
 {title('10',996,'Mike in München, Teil 2','KB 7',125)}
 {txt(161,1027,400,'Hören Sie. Was ist richtig? Kreuzen Sie an.','mTitle')}{listen('43',93,1049)}
 {[['a','Wann ist Mike in München?','Um 18:30 Uhr.','Um 19:00 Uhr.',1055],['b','Mike fährt …','zum Flughafen.','nach Daglfing.',1080],['c','Er nimmt …','die S-Bahn.','die U-Bahn.',1100],['d','Wie lange dauert die Fahrt?','20 Minuten','7 Minuten',1120],['e','Was bringt Mike mit?','Wurst','Brot',1139]].map(([k,q,o1,o2,y])=><span key={k as string}>{txt(166,y as number,255,(k as string)+'  '+(q as string))}{radioG('u10-'+k+'1','u10-'+k,'1',423,y as number,q+' '+o1)}{txt(442,y as number,135,o1 as string)}{radioG('u10-'+k+'2','u10-'+k,'2',581,y as number,q+' '+o2)}{txt(602,y as number,150,o2 as string)}</span>)}
 {rule('u10',166,1162,()=>v['u10-a']==='1'&&v['u10-b']==='2'&&v['u10-c']==='1'&&v['u10-d']==='2'&&v['u10-e']==='2')}
 </>}
 {page==='81'&&<>
 {art('tab',860,74,41,66)}
 {head('TRAINING:  HÖREN',536,140,140,122)}
 {title('1',185,'Wo sind die Personen? Hören Sie und kreuzen Sie an.','',147)}{listen('44-46',93,190)}
 {txt(275,222,200,'Foto A     Foto B     Foto C')}
 {[1,2,3].map(r=><span key={r}>{txt(176,218+r*22,100,'Durchsage '+r)}{radioG('u1-d'+r+'a','u1-d'+r,'a',291,218+r*22,'Durchsage '+r+' Foto A')}{radioG('u1-d'+r+'b','u1-d'+r,'b',367,218+r*22,'Durchsage '+r+' Foto B')}{radioG('u1-d'+r+'c','u1-d'+r,'c',445,218+r*22,'Durchsage '+r+' Foto C')}</span>)}
 {rule('g1',505,262,()=>v['u1-d1']==='b'&&v['u1-d2']==='c'&&v['u1-d3']==='a')}
 {txt(187,318,20,'A')}{txt(385,318,20,'B')}{txt(615,318,20,'C')}
 {art('photoa',177,336,184,105)}{art('photob',384,336,201,104)}{art('photoc',610,336,193,100)}
 {title('2',471,'Durchsagen','',149)}
 {txt(156,505,530,'a  Lesen Sie die Aufgaben. Markieren Sie alle Zahlen und Uhrzeiten.','mTitle')}
 {txt(178,541,20,'1')}{txt(179,562,470,'Die Passagiere von Flug 134 können jetzt einsteigen.')}{txt(179,583,470,'Die Passagiere von Flug 243 können jetzt einsteigen.')}
 {txt(178,615,20,'2')}{txt(179,634,470,'Die U5 fährt am Montag nur bis zum Ostbahnhof.')}{txt(179,658,470,'Der Bus Nr. 58 fährt am Montag nur bis zum Ostbahnhof.')}
 {txt(178,690,20,'3')}{txt(179,708,470,'Der ICE 756 aus Hamburg kommt heute um 13:27 Uhr an.')}{txt(179,731,470,'Der ICE 756 aus Hamburg kommt heute um 13:50 Uhr an.')}
 {radioG('u2-1a','u2-1','a',621,557,'Satz 1a')}{radioG('u2-1b','u2-1','b',621,578,'Satz 1b')}
 {radioG('u2-2a','u2-2','a',621,630,'Satz 2a')}{radioG('u2-2b','u2-2','b',621,652,'Satz 2b')}
 {radioG('u2-3a','u2-3','a',621,704,'Satz 3a')}{radioG('u2-3b','u2-3','b',621,726,'Satz 3b')}
 <div className="mTipBox" style={{left:687,top:555,width:168,height:105}}><div className="mTipLabel">TIPP</div><div className="mTipText"><Words s="Achten Sie auf Zahlen und Uhrzeiten. Am Bahnhof/Flughafen … müssen Sie Zahlen und Zeiten richtig verstehen."/></div></div>
 {listen('44-46',93,773)}{txt(179,768,600,'b  Hören Sie noch einmal. Welche Sätze sind richtig? Kreuzen Sie in a an.','mTitle')}
 {rule('g2',700,700,()=>v['u2-1']==='b'&&v['u2-2']==='b'&&v['u2-3']==='b')}
 {txt(140,829,300,'TRAINING:  AUSSPRACHE','mHeader')}{txt(554,835,240,'Wortakzent bei trennbaren Verben','mScript2')}<div className="mHRule" style={{left:832,top:841,width:67}}/>
 {listen('47',93,881)}{title('1',876,'Hören Sie und markieren Sie den\nWortakzent.','',154)}
 <div className="mText" style={{left:182,top:932,width:280}}>fahren – <u>ab</u>fahren | kommen –<br/><u>an</u>kommen | kaufen – <u>ein</u>kaufen |<br/>sehen – <u>fern</u>sehen | bringen –<br/><u>mit</u>bringen</div>
 {listen('48',138,1026)}{txt(183,1028,450,'Hören Sie noch einmal und sprechen Sie nach.','mTitle')}
 {title('2',1064,'Richtig oder falsch? Kreuzen Sie an.','',149)}
 <div className="mRegelBox" style={{left:200,top:1100,width:240,height:62}}><div className="mRegelLabel">REGEL</div>{txt(210,1106,220,'Der Wortakzent ist bei trennbaren Verben auf dem trennbaren Wortteil.','mSmall')}</div>
 {radioG('u4-r','u4','r',207,1139,'richtig')}{txt(228,1139,60,'richtig')}{radioG('u4-f','u4','f',296,1139,'falsch')}{txt(318,1139,60,'falsch')}
 {rule('g4',207,1165,()=>v['u4']==='r')}
 {listen('49',536,875)}{title('3',872,'Hören Sie.\nSprechen Sie dann.','',586)}
 <div className="mText" style={{left:614,top:932,width:220}}>Ich <u>nehme</u> heut' den Zug.<br/><u>Ein</u>steigen<br/><u>Aus</u>steigen<br/><u>Um</u>steigen<br/>Vorsicht an Gleis <u>sieben</u>!</div>
 <div className="mText" style={{left:614,top:1044,width:220}}>Ich <u>nehme</u> heut' den Zug.<br/><u>Ab</u>fahren<br/><u>An</u>kommen<br/><u>An</u>rufen<br/>Holst du mich bitte <u>ab</u>?</div>
 </>}
 {page==='82'&&<>
 {txt(110,140,80,'TEST','mHeader')}
 <div className="mHRule" style={{left:174,top:156,width:636}}/>
 {side('WÖRTER',236)}{side('WÖRTER',363)}{side('STRUKTUREN',533)}{side('KOMMUNIKATION',819)}
 {title('1',198,'Wie heißen die Wörter?','',118)}
 <div className="mText mBig" style={{left:148,top:235,width:420}}><span className="mStruck" style={{color:'#315e9f'}}>hafen</span><Words s=" | stelle | bahn | steig | hof | zeug"/></div>
 {txt(145,266,18,'a','mBig')}{txt(164,266,80,'Straßen','mBig')}{f('u1-a',243,264,102)}
 {txt(144,288,18,'b','mBig')}{txt(164,288,44,'Flug','mBig')}<div className="mText mExample" style={{left:200,top:288,width:32}}><span className="mStruck">hafen</span></div>{txt(230,288,14,'/','mBig')}{txt(243,288,48,'Flug','mBig')}{f('u1-b',291,286,105)}
 {txt(461,266,18,'c','mBig')}{txt(481,266,40,'Bahn','mBig')}{f('u1-c1',522,264,102)}{txt(638,266,14,'/','mBig')}{txt(658,266,40,'Bahn','mBig')}{f('u1-c2',698,264,102)}
 {txt(462,288,18,'d','mBig')}{txt(481,288,42,'Halte','mBig')}{f('u1-d',522,286,131)}
 {txt(742,288,80,'_ / 5 Punkte','mPunkte')}
 {check('t1',660,303)}
 {title('2',325,'Ordnen Sie zu.','',118)}
 <div className="mText" style={{left:150,top:362,width:440}}><Words s="Gleis | Koffer | U-Bahn | "/><span className="mStruck" style={{color:'#315e9f'}}>Gepäck</span><Words s=" | Taxi | Halt | Zug"/></div>
 {txt(145,398,16,'a')}{markS(163,396)}<div className="mText" style={{left:179,top:395,width:330}}><Words s="Guten Tag, Herr Baltaci. Haben Sie"/></div>
 {markT(163,414)}<div className="mText mExample" style={{left:181,top:413,width:80}}>Gepäck?</div><div className="mExRule" style={{left:179,top:432,width:72}}/>
 {markT(163,438)}<div className="mText" style={{left:179,top:437,width:72}}><Words s="Ja, zwei"/></div>{f('u2-a',251,432,76)}{txt(333,437,100,'und die Tasche.')}
 {txt(144,457,16,'b')}{markS(163,458)}<div className="mText" style={{left:179,top:457,width:75}}><Words s="Nächster"/></div>{f('u2-b',254,455,91)}{txt(351,457,90,'Königsplatz.')}
 {txt(466,398,16,'c')}{markS(484,396)}<div className="mText" style={{left:500,top:395,width:100}}><Words s="Wo fährt der"/></div>{f('u2-c1',596,391,69)}{txt(669,395,140,'nach Stuttgart ab?')}
 {markT(484,414)}<div className="mText" style={{left:500,top:413,width:32}}><Words s="Auf"/></div>{f('u2-c2',532,410,64)}{txt(600,413,22,'17.')}
 {txt(466,437,16,'d')}{markS(484,438)}<div className="mText" style={{left:500,top:437,width:300}}><Words s="Es ist schon sehr spät. Jetzt fährt"/></div>
 {txt(500,457,45,'keine')}{f('u2-d1',544,452,65)}{txt(612,457,45,'mehr.')}
 {markT(484,479)}<div className="mText" style={{left:500,top:478,width:160}}><Words s="Dann nehmen wir ein"/></div>{f('u2-d2',654,472,145)}{txt(801,478,15,'.')}
 {txt(743,503,80,'_ / 6 Punkte','mPunkte')}
 {check('t2',655,501)}
 {title('3',500,'Ergänzen Sie das Gespräch.','',118)}
 {markS(148,534)}<div className="mText" style={{left:165,top:531,width:440}}><Words s="Guten Morgen Ella, hier ist Karin. Wo bist du?"/></div>
 {markT(148,553)}<div className="mText" style={{left:165,top:552,width:120}}><Words s="Hallo Karin. Ich"/></div><div className="mText mExample" style={{left:283,top:552,width:185}}>steige gerade in den Zug ein</div><div className="mExRule" style={{left:283,top:571,width:177}}/>{txt(470,552,28,'(a).')}{txt(500,552,240,'(einsteigen/in den Zug /gerade)')}
 {markS(148,575)}<div className="mText" style={{left:165,top:574,width:55}}><Words s="Wann"/></div>{f('u3-b',218,567,269)}{txt(496,574,40,'(b)?')}{txt(533,574,130,'(du/ankommen)')}
 {markT(148,597)}<div className="mText" style={{left:165,top:596,width:520}}><Words s="Um 09.35 Uhr am Ostbahnhof und um 09.45 Uhr am Hauptbahnhof."/></div>
 {markS(148,619)}<div className="mText" style={{left:165,top:618,width:90}}><Words s="Kannst du"/></div>{f('u3-c',254,609,363)}{txt(629,618,30,'(c)?')}
 {txt(166,637,270,'(aussteigen/am Hauptbahnhof/bitte)')}
 {txt(166,659,28,'Ich')}{f('u3-d',196,652,302)}{txt(504,659,30,'(d).')}{txt(534,659,110,'(abholen/dich)')}
 {markT(148,682)}<div className="mText" style={{left:165,top:681,width:200}}><Words s="Super, vielen Dank."/></div>
 {markS(148,704)}<div className="mText" style={{left:165,top:703,width:40}}><Words s="Jetzt"/></div>{f('u3-e',203,694,549)}{txt(759,703,25,'(e),')}
 {txt(166,722,480,'(einkaufen/ich/Brötchen) dann können wir zusammen frühstücken.')}
 {markT(148,746)}<div className="mText" style={{left:165,top:745,width:280}}><Words s="Gute Idee. Also dann, bis bald."/></div>
 {txt(743,745,80,'_ / 8 Punkte','mPunkte')}
 {check('t3',590,745)}
 {title('4',780,'Schreiben Sie vier Gespräche.','',118)}
 <div className="mText" style={{left:151,top:818,width:570}}><Words s="Nehmt ihr ein Taxi? | "/><span className="mStruck" style={{color:'#315e9f'}}>Wo fährt der Zug nach Köln ab?</span><Words s=" | Ich habe leider keine Zeit. | Am"/></div>
 <div className="mText" style={{left:151,top:839,width:580}}><Words s="Rathausplatz. | Um 09:45 Uhr. | Nein, die U-Bahn. | "/><span className="mStruck" style={{color:'#315e9f'}}>Auf Gleis 15.</span><Words s=" | Holst du mich ab? |"/></div>
 {txt(151,862,320,'Wann kommt der Zug an? | Wo steigst du um?')}
 {markS(148,891)}<div className="mText mExample" style={{left:166,top:891,width:300}}>Wo fährt der Zug nach Köln ab?</div><div className="mExRule" style={{left:163,top:910,width:295}}/>
 {markT(148,913)}<div className="mText mExample" style={{left:166,top:913,width:200}}>Auf Gleis 15.</div><div className="mExRule" style={{left:163,top:932,width:295}}/>
 {markS(148,941)}{f('u4-l1',163,941,295)}{markT(148,963)}{f('u4-l2',163,963,295)}
 {markS(148,993)}{f('u4-l3',163,993,295)}{markT(148,1014)}{f('u4-l4',163,1014,295)}
 {markS(503,888)}{f('u4-r1',520,888,295)}{markT(503,909)}{f('u4-r2',520,909,295)}
 {markS(503,939)}{f('u4-r3',520,939,295)}{markT(503,960)}{f('u4-r4',520,960,295)}
 {txt(743,1023,80,'_ / 4 Punkte','mPunkte')}
 {check('t4',640,988)}
 <div className="mScore mScore82" style={{left:139,top:1056}}><b>Wörter</b><b>Strukturen</b><b>Kommunikation</b>{[['0–5','0–4','0–2'],['6–8','5–6','3'],['9–11','7–8','4']].map((row,r)=>row.map((s,c)=><div key={r+'-'+c}><i style={{background:['#d71910','#edcf00','#3b9e24'][r]}}/>{s} Punkte</div>))}</div>
 {txt(357,1174,200,'www.hueber.de/menschen/lernen','mScoreLink')}
 </>}
 {page==='84'&&<>
 <div className="mBannerPink" style={{left:338,top:96,width:472,height:64}}/>
 {art('banner',93,94,255,68)}
 {art('bannertitle',360,108,430,44)}
 {side('STRUKTUREN',251)}{side('WÖRTER',647)}{side('STRUKTUREN',780)}{side('STRUKTUREN',964)}
 {title('1',214,'Was macht Lisa? Ergänzen Sie um – am – von ... bis – ab.','KB 3',116)}
 {art('cal',101,267,341,167)}
 {f('u1-1',465,316,75,'1 Am')}{txt(545,322,150,'Montag frühstückt Lisa')}{f('u1-2',716,316,60,'1 um')}{txt(781,322,60,'7 Uhr.')}
 {art('exab',474.5,353.1,17.8,17.4)}{txt(505,348,280,'8 Uhr arbeitet sie.')}
 {f('u1-3',465,368,75,'1 Von')}{txt(545,369,18,'18')}{f('u1-4',565,368,65,'1 bis')}{txt(636,369,250,'19 Uhr kauft sie ein und')}{txt(477,393.5,100,'kocht.')}
 {f('u1-5',465,412,75,'1 Am')}{txt(555,417,320,'Abend geht sie mit Klaus ins Kino.')}
 {check('u1',745,440)}
 {title('2',502,'Was machen Sie heute?','KB 3',118)}
 {art('dots',58,519,58,33)}
 <div className="mText mInstr" style={{left:148,top:Y(532),width:450}}><Words s={'Ergänzen Sie den Kalender. Ihre Partnerin /\nIhr Partner schreibt einen kurzen Text wie in '}/><b className="mInstrRef"><Words s="1."/></b></div>
 {art('cal2',505,478,290,202)}
 {title('3',602,'Was machst du gern?','KB 4',120)}
 <div className="mText mInstr mInstrRef" style={{left:123,top:Y(637.5),width:20}}><b><Words s="a"/></b></div><div className="mText mInstr" style={{left:149,top:Y(637.5),width:300}}><Words s="Wie heißen die Verben?"/></div>
 {txt(148.5,671,110,'NACHEM','mAnagram')}{f('u3a-1',263,664,229,'3a NACHEM')}
 {txt(148.5,692,110,'FAHLESCN','mAnagram')}{f('u3a-2',263,683,229,'3a FAHLESCN')}
 {txt(148.5,713,110,'HENFENERS','mAnagram')}{art('exfernsehen',262.5,714,60.7,19.3)}
 {txt(148.5,734,110,'RAFEHN','mAnagram')}{f('u3a-4',263,725,229,'3a RAFEHN')}
 {txt(505.5,688,120,'RUMAFUÄNE','mAnagram')}{f('u3a-5',708,676,185,'3a RUMAFUÄNE')}
 {txt(505.5,708.5,120,'NESEL','mAnagram')}{f('u3a-6',708,700,185,'3a NESEL')}
 {txt(505.5,729,120,'NELREN','mAnagram')}{f('u3a-7',708,721,185,'3a NELREN')}
 {check('u3a',640,752)}
 <div className="mText mInstr mInstrRef" style={{left:125.3,top:Y(775),width:20}}><b><Words s="b"/></b></div><div className="mText mInstr" style={{left:149,top:Y(775),width:450}}><Words s="Ergänzen Sie die Verben aus "/><b className="mInstrRef"><Words s="a"/></b><Words s=" in der richtigen Form."/></div>
 {txt(151,809,16,'1')}{art('exsiehst',168.1,810.7,41.8,16.4)}{txt(222,809,120,'du am Abend gern')}{art('exfern',346.9,808.5,28,19.3)}{txt(378,809,10,'?')}
 {txt(151,825,16,'2')}{f('u3b-2a',167,821,94,'3b 2 Räumst')}{txt(264,827,200,'du gern deine Wohnung')}{f('u3b-2b',167,844,51,'3b 2 auf')}{txt(224,847,20,'?')}
 {txt(153,867,16,'3')}{f('u3b-3',171,863,84,'3b 3 Schläfst')}{txt(260,867,200,'du am Wochenende lange?')}
 {txt(498,795,16,'4')}{f('u3b-4',520,793,91,'3b 4 Liest')}{txt(615,797,180,'du gern Zeitung?')}
 {txt(498,818,16,'5')}{f('u3b-5',520,814,91,'3b 5 Fährst')}{txt(615,818,180,'du gern Fahrrad?')}
 {txt(498,839,16,'6')}{f('u3b-6',520,835,91,'3b 6 Lernst')}{txt(615,841,180,'du gern Deutsch?')}
 {txt(498,858,16,'7')}{f('u3b-7',520,854,91,'3b 7 Machst')}{txt(615,860,190,'du gern Hausaufgaben?')}
 {check('u3b',640,885)}
 {title('4',924,'Ergänzen Sie haben in der richtigen Form.','KB 5',125)}
 {markSB(152.4,970)}{art('exhaben',171,956,37,21)}{txt(210,956,300,'(a) wir jetzt alles für die Party?','mDlg')}
 {markTB(153,990.5)}{txt(173,976.5,200,'Ich denke ja.','mDlg')}
 {markSB(152.4,1012.5)}{f('u4-b',173,994.5,69,'4 b Hast')}{txt(248,998.5,380,'(b) du auch Brot gekauft?','mDlg')}
 {markTB(153,1032.5)}{txt(173,1018.5,80,'Ja klar. Das','mDlg')}{f('u4-c',258.8,1014.5,65.4,'4 c habe')}{txt(330,1018.5,330,'(c) ich doch heute Morgen schon gekauft.','mDlg')}
 {markSB(152.4,1055)}{txt(173,1041,270,'Und wo ist der Geburtstagskuchen?','mDlg')}
 {markTB(153,1077)}{txt(173,1063,90,'Den Kuchen','mDlg')}{f('u4-d',267.5,1059,72,'4 d hat')}{txt(346,1063,470,'(d) Julia gebacken. Sie bringt ihn heute Abend zur Party mit.','mDlg')}
 {markSB(152.4,1098)}{txt(173,1083.5,130,'Sehr gut. Und was','mDlg mDlg165')}{f('u4-e',324.2,1080,79.2,'4 e haben')}{txt(410,1084,160,'(e) wir zu trinken?','mDlg')}
 {markTB(153,1118)}{txt(173,1104,240,'Wein, Mineralwasser und Saft.','mDlg')}
 {markSB(152.4,1139)}{txt(173,1125,105,'Super! Und wo','mDlg')}{f('u4-f',285,1121,74.1,'4 f habt')}{txt(365,1125,240,'(f) ihr das Geschenk für Julia?','mDlg')}
 {markTB(153,1159)}{txt(173,1145,540,'Das ist noch in Claudias Auto. Sie kommt um sechs Uhr und bringt es mit.','mDlg')}
 {markSB(152.4,1184.5)}{txt(173,1170,115,'Gut, ich glaube, jetzt','mDlg mDlg165')}{f('u4-g',334,1166.5,72.3,'4 g haben')}{txt(412,1170.5,170,'(g) wir wirklich alles.','mDlg')}
 {check('u4',620,1160)}
 </>}
 {page==='83'&&<>
 {head('LERNWORTSCHATZ',362,151.5,125,133)}
 {title('1',196,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.','',132)}
 {txt(158,229,320,'Verkehr und Reisen','mVocabHead')}{txt(480,229,290,'Weitere wichtige Wörter','mVocabHead')}
 {([['l1',253,'Bahnhof der,',266],['l3',319,'Bus der, -se',330],['l4',339,'Halt der, -e/-s',351],['l5',360,'Haltestelle die, -n',373],['l6',381,'Flughafen der,',394],['l7',403,'Flugzeug das, -e',415],['l8',424,'Gepäck das',436],['l9',445,'Gleis das, -e',457],['l10',466,'Koffer der, -',478],['l11',487,'S-Bahn die, -en',500],['l12',508,'Straßenbahn die,\n  -en auch: Tram die, -s',521],['l13',552,'Taxi das, -s',565],['l14',572,'U-Bahn die, -en',585],['l15',593,'Verkehrsmittel\n  das, -',627],['l16',637,'Zug der,',650],['l17',668,'ab·fahren, du\n  fährst ab,\n  er fährt ab',722],['l18',731,'ab·holen',744],['l19',752,'an·kommen',765],['l20',775,'aus·steigen',786],['l21',796,'ein·steigen',807],['l22',817,'um·steigen',829]] as [string,number,string,number][]).map(([id,y,s,ry])=><span key={id}>{txt(159,y,282,s,'mVocab')}{f('v-'+id,300,ry-20,154,'Übersetzung: '+s.split(/[\n ]/)[0])}</span>)}
 {art('uml1',256.5,257,13.5,10)}{art('uml6',269.4,383.6,8.7,10.9)}{art('uml16',223.8,641.7,12.35,8.7)}
 <div className="mText mVocab" style={{left:159,top:275,width:282}}><Words s="Bahnsteig der, -e"/><span className="mVocabCH">{'\n  CH: das Perron, -s'}</span></div>{f('v-l2',300,268,154,'Übersetzung: Bahnsteig')}
 {([['r1',253,'Minute die, -n',264],['r2',275,'Vorsicht die',288],['r3',299,'zu Hause',312],['r4',315,'Entschuldigen\n  Sie.',352],['r5',368,'an·rufen',381],['r6',389,'bekommen',402],['r7',406,'ein·kaufen',419],['r8',432,'fern·sehen, du\n  siehst fern,\n  er sieht fern',487],['r9',496,'mit·bringen',509],['r10',517,'nehmen, du\n  nimmst, er nimmt',531],['r11',570,'also\n  also dann',606],['r12',615,'gerade',628],['r13',634,'nächste',647],['r14',666,'viel',679],['r15',689,'auf\n  auf Gleis 10',721],['r16',731,'bis\n  Bis bald!',765]] as [string,number,string,number][]).map(([id,y,s,ry])=><span key={id}>{txt(481,y,290,s,'mVocab')}{f('v-'+id,600,ry-20,157,'Übersetzung: '+s.split(/[\n ]/)[0])}</span>)}
 <div className="mTippBar" style={{left:167,top:851,width:12,height:95}}><span>TIPP</span></div>
 <div className="mTippRule" style={{left:167,top:851,width:415,height:4}}/>
 <div className="mText mTipp" style={{left:195,top:860,width:400}}><Words s={'Sie lesen den Satz:\n„Wir '}/><span className="mHi"><Words s="steigen"/></span><Words s=" dann in Flensburg in den Bus "/><span className="mHi"><Words s="um"/></span><Words s={'.“\nSie verstehen „steigen“ nicht und suchen im Wörterbuch.\nAchten Sie auch auf das Satzende.\nSuchen Sie „umsteigen“ im Wörterbuch.'}/></div>
 {title('2',1001,'Welche Wörter möchten Sie noch lernen? Notieren Sie.','',132)}
 {open('u2-notes',170,1018,600,156,'2 Eigene Wörter')}
 {art('tab',844,84,57,67)}
 {art('photos',794,168,107,1010)}
 </>}
 {Number(page)%2?<>{<div className="mText mFooter" style={{left:708,top:({79:1207,81:1191,83:1203,85:1202,87:1209} as Record<string,number>)[page]||1208,width:180}}><Words s={footerW[page]}/><b className="mFooterB">{'  |  '+page}</b></div>}{txt(841,(({79:1207,81:1191,83:1203,85:1202,87:1209} as Record<string,number>)[page]||1208)-13,60,'Modul 4','mFooter mFooterTab mFooterTabOdd')}</>:<>{txt(30,({80:1209,82:1206,84:1212,86:1204} as Record<string,number>)[page]||1208,60,'Modul 4','mFooter mFooterTab')}<div className="mText mFooter mFooterEven" style={{left:103,top:({80:1209,82:1206,84:1212,86:1204} as Record<string,number>)[page]||1208,width:40}}>{page}</div><div className="mText mFooter mFooterEven" style={{left:130.7,top:({80:1209,82:1206,84:1212,86:1204} as Record<string,number>)[page]||1208,width:12}}>|</div><div className="mText mFooter mFooterEven" style={{left:145,top:({80:1209,82:1206,84:1212,86:1204} as Record<string,number>)[page]||1208,width:120}}><Words s={footerW[page]}/></div></>}
 </div></div><audio className="nabPlayer" ref={audio} controls hidden aria-label="Originalaudio Arbeitsbuch"/></div>;
}
