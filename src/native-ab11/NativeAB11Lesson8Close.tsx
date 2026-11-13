import {PageImage} from '../components/PageImage';
import {usePageReset} from '../exercises/usePageReset';
import {useLayoutEffect,useRef,useState} from 'react';
import {scanData} from '../scan-data/registry';
import './native-ab11.css';
import './native-ab11-lessons45.css';
const norm=(s:string)=>s.normalize('NFC').toLocaleLowerCase('de').trim().replace(/[.,!?;:’']/g,'').replace(/\s+/g,' ');
function Words({s}:{s:string}){return <>{s.split(/(\s+)/).map((w,i)=>/\S/.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-phrase={s} data-word={w.replace(/^[.,!?„"()]+|[.,!?“"()]+$/g,'')}>{w}</span>:w)}</>}
export function NativeAB11Lesson8Close({page}:{page:string}){
 const host=useRef<HTMLDivElement>(null),audio=useRef<HTMLAudioElement>(null),[scale,SS]=useState(1),[track,T]=useState(''),[v,S]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem('native-ab11-'+page)||'{}')}catch{return {}}}),[graded,G]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const measure=()=>SS(Math.min(el.clientWidth/901,el.clientHeight/1275));measure();const ro=new ResizeObserver(measure);ro.observe(el);return()=>ro.disconnect()},[]);
 usePageReset(page,'native-ab11-'+page,()=>{S({});G({})});
 const set=(id:string,value:string)=>{const next={...v,[id]:value};S(next);localStorage.setItem('native-ab11-'+page,JSON.stringify(next));G({})};
 const sy=page==='62'?.66:page==='63'?.76:.56;const Y=(y:number)=>130+(y-130)*sy;
 const txt=(x:number,y:number,w:number,s:string,cls='')=><div className={'mText '+cls} style={{left:x,top:cls==='mFooter'?y:Y(y),width:w}}><Words s={s}/></div>;
 const hints:Record<string,string>={};
 const f=(id:string,x:number,y:number,w:number,label=id)=>{const ctx=document.createElement('canvas').getContext('2d');if(ctx)ctx.font="18px 'Times New Roman'";const size=Math.max(10,Math.min(18,18*(w-5)/(ctx?.measureText(v[id]||'').width||1)));return <input placeholder={hints[id]} className="mField" data-native-field={id} aria-label={label} style={{left:x,top:Y(y),width:w,height:22*sy,fontSize:size}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>};
 const open=(id:string,x:number,y:number,w:number,h:number,label=id)=><textarea className="mField mOpen" data-native-field={id} aria-label={label} style={{left:x,top:Y(y),width:w,height:h*sy,'--mopen-height':h*sy+'px'} as React.CSSProperties} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="mArt" alt={'Originalabbildung '+name} src={`assets/native-ab11/p${page}-${name}.png`} style={{left:x,top:Y(y),width:w,height:h*sy}}/>;
 const title=(n:string,y:number,s:string,kb='',x=132,w=700)=><>{kb&&txt(96,y+5,34,kb,'mKB')}<div className={'mNumber '+''} style={{left:x,top:Y(y)}}>{n}</div>{txt(x+35,y,w-35,s,'mTitle')}</>;
 const head=(s:string)=><>{txt(132,135,740,s,'mHeader')}<div className="mRule"/></>;
 const data=scanData['ab-a11:'+page];
 const answers=(group:string)=>Object.fromEntries(data.fields.filter(f=>f.group===group&&f.kind!=='radio'&&f.kind!=='checkbox'&&f.answer!==undefined).map(f=>[f.id,f.answer!]));
 const check=(id:string,x:number,y:number,expected=answers(id))=><div className="mCheck" data-native-task={id} style={{left:x,top:Y(y)}}><button onClick={()=>G({...graded,[id]:Object.entries(expected).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}>Prüfen ✓</button><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const rule=(id:string,x:number,y:number,test:()=>boolean)=><div className="mCheck" data-native-task={id} style={{left:x,top:Y(y)}}><button onClick={()=>G({...graded,[id]:test()})}>Prüfen ✓</button><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const listen=(n:string,x:number,y:number)=><button className="mListen" aria-label={'Originalaudio 1 '+n} style={{left:x,top:Y(y)}} onClick={()=>{T(n);if(audio.current){audio.current.src='assets/ab-cd1-track'+n+'.mp3';audio.current.play().catch(()=>{})}}}>▶ 1 {n}</button>;
 const radio=(id:string,val:string,x:number,y:number,label:string)=><input className="mRadio" type="radio" data-val={val} name={'native-ab11-'+page+'-'+id} aria-label={label} style={{left:x,top:Y(y)}} checked={v[id]===val} onChange={()=>set(id,val)}/>;
 const score=(y:number,rows:string[][])=><div className="mScore" style={{left:440,top:Y(y)}}><b>Wörter</b><b>Strukturen</b><b>Kommunikation</b>{rows.map((row,r)=>row.map((s,c)=><div key={r+'-'+c}><i style={{background:['#d71910','#edcf00','#3b9e24'][r]}}/>{s} Punkte</div>))}</div>;
 const cb=(id:string,x:number,y:number,label:string,fixed=false)=><input className="mRadio" type="checkbox" aria-label={label} style={{left:x,top:Y(y)}} checked={fixed||v[id]==='1'} disabled={fixed} onChange={()=>set(id,v[id]==='1'?'0':'1')}/>;
 const stress=(id:string,x:number,y:number,syllables:string[])=><div className="mStressSentence" style={{left:x,top:Y(y)}}>{syllables.map((s,i)=><button key={i} aria-label={id+' Silbe '+i+' '+s} disabled={id==='wortakzent-0'} className={v[id]===''+i||id==='wortakzent-0'&&i===0?'stressed':''} onClick={()=>set(id,''+i)}>{s}</button>)}</div>;
 const ad=(id:string,x:number,y:number,w:number,s:string)=><div className="mNativeAd" style={{left:x,top:Y(y),width:w}}>{s.split(/(\s+)/).map((word,i)=>/\S/.test(word)?<button key={i} className={v[id+'-'+i]==='1'||id==='ad-a1'&&['am','Abend','schwimmen.'].includes(word)?'marked':''} aria-label={id+' markieren '+i+' '+word} onClick={()=>set(id+'-'+i,v[id+'-'+i]==='1'?'0':'1')}>{word}</button>:word)}</div>;
 const timeAnswers={...answers('l8t-3'),'l8t-3-at':'Morgen|der Morgen|am Morgen','l8t-3-bt':'Vormittag|der Vormittag|am Vormittag','l8t-3-ct':'Nachmittag|der Nachmittag|am Nachmittag','l8t-3-dt':'Abend|der Abend|am Abend','l8t-3-et':'Nacht|die Nacht|in der Nacht','l8t-3-cg':'Viertel nach drei|fünfzehn nach drei','l8t-3-dg':'fünf vor halb acht|fünfundzwanzig nach sieben'};
 return <div className="nativeAB11 nativeAB11Module1 nativeAB11Lessons45 nativeAB11Next45 nativeAB11Lesson8Close" ref={host} data-native-ab11-page={page}><div className="nabCanvas mCanvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='62'&&<>
 {head('BASISTRAINING')}{title('7',211,'Ergänzen Sie die Tageszeiten.','KB 7')}
 {['a','b','c','d','e','f'].map((k,i)=>{const x=168+i%3*225,y=253+Math.floor(i/3)*128;return <span key={k}>{txt(x,y,25,k.toUpperCase(),'mTiny')}{art('day-'+k,x+12,y,107,72)}{i===0?txt(x,y+81,204,'der Morgen','mExample'):f('l8-7-'+k,x,y+79,204)}</span>})}{check('l8-7',168,510)}
 {title('8',555,'Fridas Tag. Ordnen Sie zu und ergänzen Sie die Tageszeiten.','KB 7')}
 {['a','b','c','d','e','f'].map((k,i)=>{const x=168+i%3*225,y=596+Math.floor(i/3)*114;return <span key={k}>{txt(x-10,y,20,k.toUpperCase(),'mTiny')}{art('frida-'+k,x,y,198,99)}</span>})}
 {txt(168,838,660,'Ⓓ  Am Nachmittag trifft sie ihre Oma im Café.','mExample')}
 {['kino','isst','kaffee','disco','schwimmt'].map((k,i)=>{const y=871+i*31;return <span key={k}>{f('l8-8-'+k+'-l',168,y-2,24,'8 Bild '+k)}{f('l8-8-'+k+'-t',201,y-2,202,'8 Tageszeit '+k)}{txt(412,y,350,['geht sie ins Kino.','isst sie.','trinkt sie Kaffee.','geht sie in die Disco.','schwimmt sie.'][i])}</span>})}{check('l8-8',168,1040,{...answers('l8-8'),'l8-8-disco-t':'In der Nacht|Am Abend'})}
 {title('9',1084,'Was machen Sie am nächsten Sonntag?','KB 7')}{txt(168,1121,440,'Zeichnen Sie vier Aktivitäten und Uhren wie in 8.\nTauschen Sie mit Ihrer Partnerin / Ihrem Partner.\nSchreiben Sie Sätze zu den Bildern.','mSmall')}{art('bike',652,1086,177,126)}
 <svg onMouseDown={e=>e.stopPropagation()} onTouchStart={e=>e.stopPropagation()} className="mDrawing" viewBox="0 0 430 65" aria-label="9 eigene Aktivitäten zeichnen" style={{left:168,top:Y(1199),width:430,height:65*sy}} onPointerDown={e=>{e.preventDefault();e.stopPropagation();e.currentTarget.setPointerCapture(e.pointerId);const r=e.currentTarget.getBoundingClientRect();set('eigene-zeichnung',(v['eigene-zeichnung']||'')+' M '+((e.clientX-r.left)/r.width*430).toFixed(1)+' '+((e.clientY-r.top)/r.height*65).toFixed(1))}} onPointerMove={e=>{e.stopPropagation();if(!e.currentTarget.hasPointerCapture(e.pointerId))return;const r=e.currentTarget.getBoundingClientRect();set('eigene-zeichnung',(v['eigene-zeichnung']||'')+' L '+((e.clientX-r.left)/r.width*430).toFixed(1)+' '+((e.clientY-r.top)/r.height*65).toFixed(1))}} onPointerUp={e=>e.currentTarget.releasePointerCapture(e.pointerId)}><path d={v['eigene-zeichnung']||''} fill="none" stroke="#315e9f" strokeWidth="3" strokeLinecap="round"/></svg><button className="mEraseDrawing" style={{left:602,top:Y(1236)}} onClick={()=>set('eigene-zeichnung','')}>Löschen</button>
 {open('eigene-saetze',168,1278,670,43,'9 eigene Sätze')}
 {title('10',1351,'Hören Sie das Gespräch.','KB 7')}{listen('37',96,1351)}{txt(168,1388,550,'a  Wo sind Lukas und Susanna? Kreuzen Sie an.','mTitle')}
 {[[168,'kino','im Kino'],[308,'kneipe','in der Kneipe'],[503,'theater','im Theater']].map(([x,val,label])=><span key={val}>{radio('l8-10a',String(val),Number(x),1427,String(label))}{txt(Number(x)+25,1427,180,String(label))}</span>)}{rule('l8-10a',168,1468,()=>v['l8-10a']==='kneipe')}{art('ticket',727,1357,108,80)}{txt(727,1451,110,'die Kinokarte','mTiny')}
 {txt(168,1510,650,'b  Hören Sie noch einmal. Was ist richtig? Kreuzen Sie an.','mTitle')}
 {[['1  Lukas hat zwei',384,'kinokarten','Kinokarten.',555,'theaterkarten','Theaterkarten.'],['2  Susanna geht',370,'gern','gern',466,'nichtsogern','nicht so gern ins Theater.'],['3  Lukas hat zwei Karten für',465,'samstagnachmittag','Samstagnachmittag.',678,'samstagabend','Samstagabend.'],['4  Susanna geht am Samstag',465,'umvier','um vier Uhr',616,'umsieben','um sieben Uhr ins Kino.'],['5  Sie treffen sich',384,'umsieben','um sieben',528,'umviertelvoracht','um Viertel vor acht in der Bar im Stadttheater.']].map((r,i)=>{const y=1551+i*31;return <span key={i}>{txt(168,y,310,String(r[0]),'mSmall')}{radio('l8-10b-'+(i+1),String(r[2]),Number(r[1]),y,String(r[0])+' '+r[3])}{txt(Number(r[1])+22,y,210,String(r[3]),'mSmall')}{radio('l8-10b-'+(i+1),String(r[5]),Number(r[4]),y,String(r[0])+' '+r[6])}{txt(Number(r[4])+22,y,310,i===4?'um Viertel vor acht in der Bar\nim Stadttheater.':String(r[6]),'mSmall')}</span>})}
 {rule('l8-10b',168,1746,()=>['theaterkarten','gern','samstagabend','umvier','umsieben'].every((s,i)=>v['l8-10b-'+(i+1)]===s))}
 </>}
 {page==='63'&&<>
 {head('TRAINING: LESEN')}<div className="nabModule">8</div>{title('1',211,'Lesen Sie die Aufgaben und die Anzeigen.')}{txt(143,254,360,'a  Markieren Sie: Was? Wann?','mTitle')}{txt(143,290,360,'b  Welche Anzeige passt? Kreuzen Sie an.','mTitle')}
 {txt(546,247,292,'Sie suchen in Anzeigen nach einer bestimmten\nInformation. Markieren Sie wie im Beispiel. So\nfinden Sie die Information schneller.','mSmall mTip')}
 {txt(168,345,670,'A  Sie suchen Freunde für Freizeitaktivitäten am Wochenende.')}
 {txt(194,394,25,'1')}{radio('l8-les1-a','1',221,394,'A Anzeige1')}{txt(515,394,25,'2')}{radio('l8-les1-a','2',542,394,'A Anzeige2')}
 {ad('ad-a1',194,428,290,'Ich gehe oft am Abend schwimmen.\nAllein macht es keinen Spaß. ☹\nWer kommt mit? sara33@o2.de')}{ad('ad-a2',515,428,320,'Ich spiele gern Tennis, aber leider\nnicht so gut. Wer spielt mit mir?\nNur Samstag oder Sonntag.\nTel: 030-445 76 81')}
 {txt(168,579,670,'B  Sie sind Studentin und suchen einen Job im Büro.')}{txt(194,633,25,'1')}{radio('l8-les1-b','1',221,633,'B Anzeige1')}{txt(555,633,25,'2')}{radio('l8-les1-b','2',582,633,'B Anzeige2')}
 {ad('ad-b1',194,669,300,'Sie lieben die Alpen?\nDann sind Sie bei uns richtig!\nHotel Bergblick\nsucht Kellner/Kellnerin für Hotelbar.\nDi-So 19-24 Uhr\ninfo@Hotel-Bergblick.at')}{ad('ad-b2',555,669,283,'Hotel Augusta in Innsbruck\nsucht für das Sekretariat Aushilfe\nfür 10-15 Stunden pro Woche,\nam Vormittag.\nWir freuen uns auf Ihren Anruf:\n+43-256-5987-0')}
 {rule('l8-les1',168,846,()=>v['l8-les1-a']==='2'&&v['l8-les1-b']==='2')}
 {txt(132,921,540,'TRAINING: AUSSPRACHE','mHeader')}{txt(559,931,260,'unbetontes „e“','mSmall')}
 {title('1',979,'Hören Sie und markieren Sie den\nWortakzent.','',132,360)}{listen('38',96,979)}
 {[['Mor','gen'],['A','bend'],['Es','sen'],['Vier','tel'],['sie','ben'],['Mu','se','um'],['ge','hen']].map((s,i)=>{const x=168+i%4*85,y=1050+Math.floor(i/4)*43;return <span key={i}>{stress('wortakzent-'+i,x,y,s)}{cb('e-'+i,x+60,y+4,'e hören '+s.join(''),i===2)}</span>})}
 {txt(168,1161,345,'Hören Sie noch einmal. Wo hören Sie das „e“?\nKreuzen Sie an.','mTitle')}{listen('38',96,1161)}{rule('l8-aus1',168,1220,()=>[0,1,3,4].every(i=>v['e-'+i]!=='1')&&v['e-5']==='1'&&v['e-6']==='1')}
 {title('2',1281,'Was ist richtig? Kreuzen Sie an.','',132,360)}{txt(168,1322,345,'In betonten Silben (Museum) hört man\ndas „e“ gut.','mTitle')}{radio('l8-aus2-1','ja',168,1383,'Betonte Silben Ja')}{txt(192,1383,50,'Ja.','mSmall')}{radio('l8-aus2-1','nein',252,1383,'Betonte Silben Nein')}{txt(276,1383,60,'Nein.','mSmall')}
 {txt(168,1426,345,'In nicht betonten Silben (Viertel) hört\nman das „e“ gut.','mTitle')}{radio('l8-aus2-2','ja',168,1487,'Nicht betonte Silben Ja')}{txt(192,1487,50,'Ja.','mSmall')}{radio('l8-aus2-2','nein',252,1487,'Nicht betonte Silben Nein')}{txt(276,1487,60,'Nein.','mSmall')}{rule('l8-aus2',168,1532,()=>v['l8-aus2-1']==='ja'&&v['l8-aus2-2']==='nein')}
 {title('3',979,'Hören Sie.','',555,280)}{listen('39',518,979)}
 {txt(579,1026,265,'a  ▴ Gehen wir morgen Abend essen? ↗\n   ▪ Wann? ↗\n   ▴ Um Viertel vor sieben. ↘\n   ▪ Gute Idee. ↘\n\nb  ▴ Wie spät ist es? ↘\n   ▪ Viertel vor zehn. ↘ Warum? ↗\n   ▴ Dann können wir ins Museum\n     gehen. ↘ Um zehn! ↘\n   ▪ Ach nein. ↘ Keine Lust. ↘','mSmall')}
 {listen('40',518,1422)}{txt(579,1422,263,'Hören Sie noch einmal und\nsprechen Sie nach.','mTitle')}
 </>}
 {page==='64'&&<>
 {head('TEST')}{title('1',211,'Ergänzen Sie die Orte.')}
 {txt(168,253,650,'Ich gehe schon um 8 Uhr ins Schwimmbad (a). Schwimmen macht wirklich Spaß.','mSmall')}{txt(168,286,293,'Um 11 Uhr treffe ich meine Freundin im','mSmall')}{f('l8t-1-b',469,284,123)}{txt(600,286,240,'(b). Wir trinken zusammen','mSmall')}
 {txt(168,319,333,'einen Kaffee. Am Nachmittag gehen wir ins','mSmall')}{f('l8t-1-c',510,317,110)}{txt(628,319,215,'(c), aber ich finde den Film','mSmall')}{txt(168,352,302,'nicht so gut. Dann besuchen wir eine','mSmall')}{f('l8t-1-d',479,350,146)}{txt(634,352,210,'(d), die Bilder sind sehr schön','mSmall')}
 {txt(168,385,675,'und modern. Jetzt ist es 23 Uhr. Meine Freunde und ich tanzen in einer','mSmall')}{f('l8t-1-e',168,416,137)}{txt(315,418,50,'(e).','mSmall')}{check('l8t-1',168,461,{'l8t-1-b':'Café|Cafe','l8t-1-c':'Kino','l8t-1-d':'Ausstellung|Galerie','l8t-1-e':'Disco|Disko'})}
 {title('2',507,'Ergänzen Sie.')}{txt(168,549,28,'Die')}{f('l8t-2-1',202,547,100)}{txt(310,549,50,'hat 7')}{f('l8t-2-2',366,547,87)}{txt(461,549,185,'Sie heißen Montag,','mExample')}{f('l8t-2-3',649,547,85)}{f('l8t-2-4',744,547,94)}
 {[5,6,7,8].map((n,i)=><span key={n}>{f('l8t-2-'+n,168+i*168,584,154)}{txt(323+i*168,586,10,i===3?'.':',')}</span>)}{check('l8t-2',168,630)}
 {title('3',676,'Ergänzen Sie die Uhrzeit und die Tageszeit.')}
 {txt(168,761,116,'Im Gespräch','mSmall')}{txt(168,811,116,'Im Radio /\nFernsehen','mSmall')}{txt(168,880,116,'Tageszeit','mSmall')}
 {['07:45','10:50','15:15','19:25','23:30'].map((s,i)=>{const x=295+i*109,k=String.fromCharCode(97+i);return <span key={k}>{txt(x,719,20,k,'mTiny')}<div className="mDigital" style={{left:x+18,top:Y(717)}}>{s}</div>{f('l8t-3-'+k+'g',x,759,102)}{open('l8t-3-'+k+'r',x,805,102,64,'3 '+k+' Im Radio/Fernsehen')}{f('l8t-3-'+k+'t',x,878,102)}</span>})}{check('l8t-3',168,925,timeAnswers)}
 {title('4',971,'Schreiben Sie die Sätze neu.')}{txt(168,1013,345,'Hallo Marion,\nwir haben leider keine Zeit.\nThomas spielt heute Vormittag Tennis.\nIch treffe um 14 Uhr Anna.\nWir gehen am Abend ins Kino.\nKönnen wir vielleicht am Sonntag fahren?','mSmall')}
 {['Leider','Heute','Um 14 Uhr','Am Abend','Vielleicht'].map((s,i)=>{const y=1013+i*50;return <span key={s}>{txt(540,y,85,s,'mSmall')}{open('l8t-4-'+(i+1),628,y-2,210,44,'4 Satz '+(i+1))}</span>})}{check('l8t-4',540,1272)}
 {title('5',1327,'Ergänzen Sie um, am oder in.')}{txt(168,1369,670,'a  ▪ Wann gehen wir ins Museum?   ▴ Am Donnerstagabend.','mExample')}
 {txt(168,1403,365,'b  Mein Freund ist Arzt. Er arbeitet oft','mSmall')}{f('l8t-5-b',540,1401,55)}{txt(603,1403,150,'der Nacht.','mSmall')}{txt(168,1437,158,'c  Können wir','mSmall')}{f('l8t-5-c',331,1435,55)}{txt(394,1437,345,'Sonntag nach Graz fahren?','mSmall')}
 {txt(168,1471,245,'d  Meine Eltern kommen','mSmall')}{f('l8t-5-d1',419,1469,55)}{txt(482,1471,88,'Sonntag','mSmall')}{f('l8t-5-d2',575,1469,55)}{txt(638,1471,135,'11:30 Uhr.','mSmall')}{check('l8t-5',168,1515)}
 {title('6',1561,'Ergänzen Sie das Telefongespräch.')}{txt(168,1603,670,'Wann denn? | Da habe ich Zeit. | Hast du am Freitag Zeit? |\nLeider kann ich nicht. | Und am Samstag?','mBank')}
 {txt(168,1673,320,'▪  Hallo Paul, hier ist Annalena.','mSmall')}{f('l8t-6-a',491,1671,347)}{txt(192,1706,646,'(a) Vielleicht können wir ins Kino gehen.','mSmall')}
 {txt(168,1739,20,'▴')}{f('l8t-6-b',192,1737,332)}{txt(531,1739,300,'(b) Ich arbeite am Freitag.','mSmall')}{txt(168,1772,20,'▪')}{f('l8t-6-c',192,1770,332)}{txt(531,1772,30,'(c)','mSmall')}
 {txt(168,1805,160,'▴ Samstag ist gut.','mSmall')}{f('l8t-6-d',334,1803,250)}{txt(591,1805,30,'(d)','mSmall')}{f('l8t-6-e',628,1803,176)}{txt(810,1805,30,'(e)','mSmall')}{txt(168,1838,220,'▪  Um 20.30 Uhr.','mSmall')}{check('l8t-6',168,1879)}
 {score(1925,[['0-7','0-4','0-2'],['8-11','5-6','3'],['12-14','7-8','4-5']])}
 </>}
 {txt(Number(page)%2?704:48,1254,Number(page)%2?190:400,(Number(page)%2?'':'Modul 3   ')+page+' | '+({'62':'zweiundsechzig','63':'dreiundsechzig','64':'vierundsechzig'} as Record<string,string>)[page]+(Number(page)%2?'  Modul 3':''),'mFooter')}
 </div><audio className="nabPlayer" ref={audio} controls hidden={!track} aria-label="Originalaudio Arbeitsbuch"/></div>;
}
