import {useLayoutEffect,useRef,useState} from 'react';
import './native-kb12.css';
function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\p{L}/u.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-word={w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text}>{w}</span>:w)}</>}
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\s+/g,' ');
export function NativeKB12({page}:{page:string}){
 const root=useRef<HTMLDivElement>(null),player=useRef<HTMLAudioElement>(null);const [scale,ss]=useState(.6);const key='native-kb12-'+page;
 const [values,sv]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});const [results,sr]=useState<Record<string,boolean>>({});const [drawing,sd]=useState(false);
 useLayoutEffect(()=>{const el=root.current!;const obs=new ResizeObserver(()=>ss(Math.min(el.clientWidth/1100,(el.clientHeight-38)/1504)));obs.observe(el);return ()=>obs.disconnect()},[]);
 const set=(id:string,v:string)=>{const n={...values,[id]:v};sv(n);localStorage.setItem(key,JSON.stringify(n))};
 const text=(x:number,y:number,w:number,t:string,cls='')=><div className={'nkText '+cls} style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><img className="nkArt" src={`assets/native-kb12/p${page}-${name}.png`} alt={'Originalillustration '+name} style={{left:x,top:y,width:w,height:h}}/>;
 const field=(id:string,x:number,y:number,w:number,label:string,round=false)=><input className={'nkField'+(round?' nkRound':'')} aria-label={label} data-native-field={id} style={{left:x,top:y,width:w}} value={values[id]||''} onChange={e=>set(id,e.target.value)} spellCheck={false}/>;
 const dot=(id:string,value:string,x:number,y:number,label:string,checkbox=false)=><input className="nkDot" type={checkbox?'checkbox':'radio'} aria-label={label} name={key+'-'+id} checked={checkbox?values[id]==='true':values[id]===value} onChange={e=>set(id,checkbox?String(e.target.checked):value)} style={{left:x,top:y}}/>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="nkCheck" data-check={id} style={{left:x,top:y}}><button onClick={()=>sr({...results,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(v=>normalize(v)===normalize(values[k]||(a==='false'?'false':''))))})}>Prüfen ✓</button><output aria-live="polite">{id in results?(results[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const title=(n:string,x:number,y:number,w:number,t:string)=><div className="nkTitle" style={{left:x,top:y,width:w}}><b>{n}</b><Words text={t}/></div>;
 const audio=(src:string,x:number,y:number,label:string)=><button className="nkAudio" style={{left:x,top:y}} aria-label={'Originalaudio '+label+' abspielen'} onClick={()=>{if(player.current){player.current.src=src;player.current.play().catch(()=>{})}}}>▶ {label}</button>;
 return <div className="nativeKB12" ref={root} data-native-kb12={page}><div className="nkCanvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='9'&&<>
  {art('hero',0,0,1100,1000)}{text(390,43,625,'Wir suchen das Hotel Maritim.','nkHeroTitle')}{text(1015,38,85,'13','nkLesson')}
  <aside className="nkAside" style={{left:834,top:996,width:220,height:345}}><Words text={'Hören: Wegbeschreibung\nSprechen: Wegbeschreibung: An der Ampel fahren Sie nach links.; jemanden um Hilfe bitten: Entschuldigung. Eine Frage bitte …\nWortfeld: Institutionen und Plätze in der Stadt\nGrammatik: lokale Präpositionen + Dativ: Wo? - Vor dem Restaurant.'}/></aside>
  {audio('assets/kb-cd3-track01.mp3',48,1044,'3 01')}{title('1',105,1042,680,'Im Auto')}
  {text(118,1080,690,'a  Sehen Sie das Foto an, hören Sie und kreuzen Sie an. Was ist richtig?','nkBold nkCompact')}
  {['Die beiden suchen etwas.','Die Frau sagt, der Stadtplan stimmt.','Die Frau macht den Navigator an.'].map((t,i)=><div key={t}>{text(149,1140+i*25,400,`${i+1}  ${t}`)}{dot('1a-'+i,'',535,1140+i*25,t,true)}</div>)}
  {check('1a',150,1220,{'1a-0':'true','1a-1':'true','1a-2':'false'})}
  {text(118,1266,685,'b  Hören Sie noch einmal. Wer sagt das? Die Frau (F), der Navigator (N) oder keiner (k)?','nkBold nkCompact')}
  {['Nach 600 Metern bitte rechts abbiegen. ↱','Fahr geradeaus weiter! ↑','Bitte links abbiegen. ↰','Bitte wenden Sie. ↴','Fahr zurück! ↧'].map((t,i)=><div key={t}>{text(149,1335+i*25,455,`${i+1}  ${t}`)}{i===0?text(599,1335,35,'N','nkHand'):field('1b-'+i,594,1333+i*25,30,t,true)}</div>)}
  {check('1b',150,1465,{'1b-1':'F','1b-2':'k','1b-3':'N','1b-4':'k'})}{text(660,1380,210,'1000 Meter (m) =\n1 Kilometer (km)','nkInfo')}
 </>}
 {page==='10'&&<>
  {art('vocab',0,0,1100,105)}{['auf','an','neben','vor','hinter'].map((t,i)=>text(85+i*218,108,120,t,'nkCenter nkSmall'))}
  {title('2',117,183,880,'Der Blick von oben. Was sehen Sie hier?')}{text(165,213,850,'Sehen Sie das Bildlexikon an und ergänzen Sie.','nkBold')}
  {art('overhead',160,253,760,117)}{art('solids',872,380,168,182)}
  {text(164,388,500,'Der Stab ist …')}
  {['A','B','C','D','E','F','G','H','I'].map((l,i)=>{const col=i<5?0:1,row=i<5?i:i-5,x=164+col*351,y=416+row*27;return <div key={l}>{text(x,y,30,l)}{i<2?text(x+26,y,150,i===0?'an':'über','nkHand'):field('2-'+l,x+26,y-2,150,l+' Präposition')}{text(x+182,y,210,i===1||i===2?'der Pyramide.':i===5?'den Würfeln.':'dem Würfel.')}</div>})}
  {check('2',164,560,{'2-C':'unter','2-D':'neben','2-E':'vor','2-F':'zwischen','2-G':'auf','2-H':'hinter','2-I':'in'})}
  {title('3',117,607,880,'In der Stadt. Was ist was? Ordnen Sie zu.')}
  {text(164,650,820,'① • Stadtmitte / • Zentrum | ② • Bahnhof | ③ • Dom | ④ • Bank | ⑤ • Restaurant | ⑥ • Post | ⑦ • Polizei | ⑧ • Ampel | ⑨ • Brücke | ⑩ • Café','nkBank')}
  {art('map',162,709,844,390)}
  <svg className="nkRoute" viewBox="0 0 844 390" style={{left:162,top:709,width:844,height:390,pointerEvents:drawing?'auto':'none'}} aria-label="Weg in den Stadtplan zeichnen" onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId);const r=e.currentTarget.getBoundingClientRect();set('route',(values.route||'')+' M '+((e.clientX-r.left)/r.width*844).toFixed(1)+' '+((e.clientY-r.top)/r.height*390).toFixed(1))}} onPointerMove={e=>{if(!e.currentTarget.hasPointerCapture(e.pointerId))return;const r=e.currentTarget.getBoundingClientRect();set('route',(values.route||'')+' L '+((e.clientX-r.left)/r.width*844).toFixed(1)+' '+((e.clientY-r.top)/r.height*390).toFixed(1))}} onPointerUp={e=>e.currentTarget.releasePointerCapture(e.pointerId)}><path d={values.route||''} fill="none" stroke="#255fbe" strokeWidth="4" strokeLinecap="round"/></svg>
  <div className="nkDrawTools" style={{left:515,top:1109}}><button type="button" aria-pressed={drawing} onClick={()=>sd(!drawing)}>{drawing?'Zeichnen beenden':'Weg einzeichnen (5a)'}</button><button type="button" onClick={()=>set('route','')}>Weg löschen</button></div>
  {[775,816,873,1021,1050].map((y,i)=>field('3-l'+i,160,y+11,43,'Karte links '+(i+1)))}
  {[701,833,949,1031].map((y,i)=>field('3-r'+i,970,y+11,43,'Karte rechts '+[1,3,4,5][i]))}{text(973,766,40,'1','nkHand')}
  {check('3',164,1109,{'3-l0':'5','3-l1':'4','3-l2':'7','3-l3':'9','3-l4':'8','3-r0':'10','3-r1':'2','3-r2':'3','3-r3':'6'})}
  {audio('assets/kb-cd3-track02.mp3',55,1164,'3 02')}{title('4',117,1161,900,'Hören Sie das Gespräch im Auto weiter und kreuzen Sie an.')}
  {text(570,1194,100,'richtig','nkSmall')}{text(678,1194,100,'falsch','nkSmall')}
  {['Die beiden suchen ein Hotel.','Der Mann hilft. Er kennt das Hotel.','Die Frau sagt, das Hotel ist in der Nähe.'].map((t,i)=><div key={t}>{text(164,1220+i*27,400,String.fromCharCode(97+i)+'  '+t)}{dot('4-'+i,'richtig',586,1220+i*27,'richtig: '+t)}{dot('4-'+i,'falsch',678,1220+i*27,'falsch: '+t)}</div>)}
  {check('4',164,1310,{'4-0':'richtig','4-1':'falsch','4-2':'falsch'})}
  {text(189,1363,180,'helfen\nich       helfe\ndu        hilfst\ner/sie    hilft','nkInfo')}{art('friends',751,1215,349,255)}
 </>}
 {page==='11'&&<>
  {art('vocab',0,0,1100,103)}{['zwischen','über','unter','in'].map((t,i)=>text(113+i*238,108,120,t,'nkCenter nkSmall'))}{text(1015,43,85,'13','nkLesson')}
  {audio('assets/kb-cd3-track03.mp3',48,183,'3 03')}{title('5',105,179,870,'Wo ist das Hotel?')}
  {text(117,223,870,'a  Hören Sie das Gespräch weiter.\n    Tragen Sie den Weg und das Hotel in den Plan in 3 ein.','nkBold')}
  {field('5a-route',154,281,810,'Weg und Hotel: Notizen für den Plan in 3')}
  {text(117,321,870,'b  Hören Sie noch einmal und kreuzen Sie an.','nkBold')}
  {['Das ist in','Ach, das „Maritim“ ist','Ja, zwischen','Dann kommen Sie unter','An','Vor','An'].map((t,i)=>{const y=365+i*29;const opts=[['der','die'],['in das','im'],['dem','der'],['eine','einer'],['der','die'],['dem','das'],['die','den']][i];const suffix=['Stadtmitte.','Zentrum?','Bahnhof und dem Dom.','Brücke durch.','Ampel fahren Sie nach links.','Restaurant fahren Sie nach rechts.','Cafés fahren Sie vorbei.'][i];const x=[290,400,320,427,230,235,230][i];return <div key={i}>{text(150,y,x-154,`${i+1}  ${t}`)}{opts.map((o,j)=><div key={o}>{dot('5b-'+i,o,x+j*102,y,o+': '+t)}{text(x+30+j*102,y,75,o)}</div>)}{text(x+210,y,500,suffix)}</div>})}
  {check('5b',150,576,{'5b-0':'der','5b-1':'im','5b-2':'dem','5b-3':'einer','5b-4':'der','5b-5':'dem','5b-6':'den'})}
  {text(117,622,870,'c  Lesen Sie die Sätze in b noch einmal und ergänzen Sie.','nkBold')}
  <div className="nkGrammar" style={{left:150,top:660,width:664,height:183}}>
   {text(20,8,240,'Nominativ','nkBold')}{text(350,8,270,'Dativ','nkBold')}
   {['• der/ein   Bahnhof','• das/ein   Restaurant','• die/eine  Ampel','• die/–     Cafés/Häuser'].map((t,i)=><div key={t}>{text(20,39+i*25,270,t)}{i===0?text(350,39,65,'dem','nkHand'):field('5c-'+i,350,37+i*25,65,'Dativ '+t)}{text(420,39+i*25,240,['einem  Bahnhof','einem  Restaurant','einer  Ampel','–       Cafés/Häusern'][i])}</div>)}
   {text(288,38,65,'vor')}{text(288,142,370,'auch so bei: auf, an, neben, hinter, zwischen, über, unter, in','nkSmall')}
  </div>
  {text(848,674,170,'in dem = im\nan dem = am','nkInfo')}{check('5c',150,854,{'5c-1':'dem','5c-2':'der','5c-3':'den'})}
  {title('6',105,902,920,'Wo ist Laura? Arbeiten Sie auf Seite 73.')}
  {title('7',105,958,920,'Wegbeschreibungen. Ordnen Sie zu.')}
  {text(150,1002,850,'Entschuldigung! | Ich bin auch fremd hier. | Können Sie mir helfen? | … einen/zwei/… Kilometer geradeaus. Und dann sehen Sie schon … | Wo ist denn hier …? | Kennen Sie …? | Wenden Sie. | Das ist in der Nähe (von) … | Ich suche … | Trotzdem: Dankeschön! | Tut mir leid. Ich bin nicht von hier. | Sie biegen rechts/links ab. | Sie fahren/gehen geradeaus / nach rechts / nach links. | … die nächste Straße rechts/links. | Sehr nett! Vielen Dank!','nkBank')}
  {['nach dem Weg fragen','sich bedanken','den Weg beschreiben','den Weg nicht kennen'].map((t,i)=><div key={t}>{text(153+i*211,1155,205,t,'nkHand nkSmall')}<textarea className="nkOpen" style={{left:153+i*211,top:1185,width:205,height:120}} aria-label={t} value={values['7-'+i]||(i===0?'Entschuldigung! …':'')} onChange={e=>set('7-'+i,e.target.value)}/></div>)}
  {title('8',105,1344,630,'Einen Weg beschreiben: Wie gut ist Ihr Gedächtnis?')}{text(148,1400,530,'Arbeiten Sie zu zweit auf Seite 74.','nkBold')}
  {art('turns',760,1270,277,195)}
 </>}
 {page==='12'&&<>
  {text(8,45,95,'13','nkLesson')}{text(121,99,660,'SPRECHTRAINING','nkModule')}{art('hikers',743,75,249,143)}
  {title('9',118,157,610,'Jemanden um Hilfe bitten')}{audio('assets/kb-cd3-track04.mp3',62,200,'3 04')}
  {text(132,200,780,'a  Welche Sätze sind höflich? Hören Sie und kreuzen Sie an.','nkBold')}
  {['Entschuldigen Sie bitte. Kann ich Sie etwas fragen? Wo finde ich das Café Schiffer?','Entschuldigen Sie. Haben Sie einen Moment Zeit? Kennen Sie das Café Schiffer?','Hallo, Sie! Helfen Sie mir! Ich suche das Café Schiffer.','Hallo! Wo ist denn das Café Schiffer?','Entschuldigung. Eine Frage bitte: Wo ist denn das Café Schiffer?'].map((t,i)=><div key={t}>{text(161,244+i*27,800,`${i+1}  ${t}`)}{dot('9a-'+i,'',962,244+i*27,'Satz '+(i+1),true)}</div>)}
  {check('9a',163,387,{'9a-0':'true','9a-1':'true','9a-2':'false','9a-3':'false','9a-4':'true'})}
  {text(132,439,470,'b  Sie kennen den Weg nicht.\n    Bitten Sie nun höflich um Hilfe.','nkBold')}{text(566,435,220,'Entschuldigung.\nEine Frage bitte: …','nkSpeech')}
  {art('station',162,504,249,205)}{art('dom',505,504,218,205)}{art('sacher',806,424,189,286)}
  {text(162,720,270,'Bahnhof','nkSmall')}{text(514,720,270,'Kölner Dom','nkSmall')}{text(812,720,220,'Hotel Sacher','nkSmall')}
  {text(121,786,450,'GRAMMATIK','nkModule')}{text(644,786,430,'KOMMUNIKATION','nkModule')}
  <div className="nkGrammar nkSummary" style={{left:122,top:830,width:475,height:490}}>
   <b className="nkBar"><Words text="Wo? → Lokale Präpositionen mit Dativ"/></b>
   <table><thead><tr><th colSpan={2}><Words text="Nominativ"/></th><th colSpan={2}><Words text="Dativ"/></th></tr></thead><tbody>
   <tr><td><Words text="Da ist …"/></td><td><Words text="Wo ist das Hotel? Es ist …"/></td><td><Words text="definiter Artikel"/></td><td><Words text="indefiniter Artikel"/></td></tr>
   {[['• der/ein Dom.','dem Dom.','einem Dom.'],['• das/ein Café.','dem Café.','einem Café.'],['• die/eine Post.','der Post.','einer Post.'],['Da sind …','',''],['• die / – Banken/Häuser.','den Banken/Häusern.','– Banken/Häusern.']].map((row,i)=><tr key={i}><td><Words text={row[0]}/></td><td><Words text={i===3?'':'neben'}/></td><td><Words text={row[1]}/></td><td><Words text={row[2]}/></td></tr>)}
   </tbody></table><p><Words text="auch so: auf, an, vor, hinter, zwischen, über, unter, in"/><br/><Words text="! in dem = im    an dem = am"/></p>
  </div>
  <div className="nkCommunication" style={{left:643,top:830,width:385}}>
  {[
   ['jemanden um Hilfe bitten','Entschuldigung! | Entschuldigen Sie (bitte). | Können Sie mir helfen? | Kann ich Sie etwas fragen? | Haben Sie einen Moment Zeit? | Eine Frage bitte: …'],
   ['nach dem Weg fragen','Kennen Sie / Wo finde ich …? | Ich suche …'],
   ['sich bedanken und darauf reagieren','Sehr nett! Vielen Dank! | Ach so. Schade. Trotzdem: Dankeschön!\nBitte, gern. | Kein Problem.'],
   ['den Weg beschreiben','Sie fahren zuerst geradeaus und dann nach rechts. | Sie biegen rechts/links ab. | Sie fahren die nächste/zweite/… Straße links/rechts. | Das ist in der Nähe von … | Sie fahren zwei Kilometer geradeaus.\nWenden Sie. | Sie gehen/fahren zurück. | Und dann sehen Sie das Hotel / … schon.'],
   ['den Weg nicht kennen','Nein. Tut mir leid. | Ich bin auch fremd hier. | Ich bin nicht von hier.']
  ].map(([h,t])=><section key={h}><h3><Words text={h}/></h3><p><Words text={t}/></p></section>)}
  </div>
 </>}
 {text(Number(page)%2?926:20,1480,160,({9:'neun | 9',10:'10 | zehn',11:'elf | 11',12:'12 | zwölf'} as Record<string,string>)[page],'nkFooter')}
 {text(Number(page)%2?1025:5,1480,75,'Modul 5','nkModuleFooter')}
 {page==='10'&&<>{text(86,256,25,'Spiel & Spaß','nkSide')}{text(86,623,25,'Spiel & Spaß','nkSide')}</>}
 {page==='11'&&<>{text(69,325,25,'noch einmal?','nkSide')}{text(69,1000,25,'Diktat','nkSide')}</>}
 {page==='12'&&<>{text(84,451,25,'Beruf','nkSide')}{text(84,838,25,'Audiotraining','nkSide')}{text(84,949,25,'Karaoke','nkSide')}</>}
 {text(85,page==='9'?1074:page==='10'?190:page==='11'?209:166,30,'AB','nkAB')}
 </div><audio ref={player} className="nkPlayer" controls aria-label="Originalaudio"/></div>
}
export const nativeKB12Pages=new Set(['9','10','11','12']);
