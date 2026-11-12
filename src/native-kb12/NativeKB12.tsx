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
 {page==='13'&&<>
 {text(465,76,545,'Wie findest du Ottos Haus?','nkBookTitle')}{text(1010,40,90,'14','nkLesson')}{art('hero',0,126,1100,834)}
 {audio('assets/kb-cd3-track05.mp3',48,1050,'3 05')}{title('1',105,1048,690,'Sehen Sie das Bild an und hören Sie.')}{text(150,1080,650,'Kennen Sie Computerspiele wie „Glückstadt“?\nSpielen Sie gern Computerspiele? Welche?','nkBold')}
 {title('2',105,1154,715,'Sehen Sie die Häuser auf dem Bild an. Zu wem passt das?')}{text(150,1190,660,'Kreuzen Sie an. Hilfe finden Sie im Bildlexikon.','nkBold')}
 {text(518,1220,100,'Vanilla','nkHand nkSmall')}{text(622,1220,100,'Otto','nkHand nkSmall')}
 {['Das Haus ist groß und elegant.','Das Haus ist klein und gemütlich.','Im Garten sind viele Blumen.','Im Garten steht ein Baum.','Das Haus hat viele Fenster.','Das Haus hat eine Treppe.'].map((t,i)=><div key={t}>{text(150,1252+i*27,390,String.fromCharCode(97+i)+'  '+t)}{dot('2-'+i,'vanilla',540,1252+i*27,'Vanilla: '+t)}{dot('2-'+i,'otto',622,1252+i*27,'Otto: '+t)}</div>)}
 {check('2',150,1425,{'2-0':'otto','2-1':'vanilla','2-2':'vanilla','2-3':'vanilla','2-4':'otto','2-5':'otto'})}
 <aside className="nkAside" style={{left:834,top:987,width:220,height:370}}><Words text={'Sprechen: etwas beschreiben und bewerten: Das Haus ist groß. / Ottos Garten finde ich nicht so schön.\nLesen: Wohnungsanzeigen\nSchreiben: E-Mail\nWortfelder: Wohnungen und Häuser\nGrammatik: Possessivartikel (Nominativ/Akkusativ) sein - ihr; Genitiv bei Eigennamen: Ottos Haus'}/></aside>
 </>}
 {page==='14'&&<>
 {art('vocab',0,0,1100,103)}{['• Haus','• Garten','• Blume','• Baum','• Treppe','• Garage'].map((t,i)=>text(i*183+10,108,170,t,'nkCenter nkSmall'))}
 {title('3',126,180,440,'Wie heißen die Zimmer?')}{text(171,210,410,'Notieren Sie die Buchstaben.','nkBold')}{art('house',601,170,372,411)}
 {text(177,249,26,'A','nkHand')}{text(204,249,160,'• Kinderzimmer','nkBank')}
 {field('3-W',354,247,27,'Wohnzimmer',true)}{text(389,249,190,'• Wohnzimmer','nkBank')}
 {[['K','Küche','A','Arbeitszimmer'],['S','Schlafzimmer','B','Bad'],['T','Toilette','F','Flur'],['E','Erdgeschoss','1','erster Stock']].map((r,i)=><div key={i}>{field('3-'+r[0],178,288+i*40,26,r[1],true)}{text(210,290+i*40,170,'• '+r[1],'nkBank')}{field('3-'+r[2],389,288+i*40,26,r[3],true)}{text(420,290+i*40,170,'• '+r[3],'nkBank')}</div>)}
 {check('3',177,465,{'3-W':'G','3-K':'F','3-A':'D','3-S':'B','3-B':'C','3-T':'E','3-F':'H','3-E':'J','3-1':'I'})}
 {audio('assets/kb-cd3-track06.mp3',70,612,'3 06')}{title('4',126,609,900,'Elena, Maria und „Glückstadt“. Hören Sie und kreuzen Sie an.')}{art('students',789,647,166,165)}
 {[['Elena und Maria','spielen ein Computerspiel.','wohnen auch in Glückstadt.'],['Otto ist','Single und hat keine Kinder.','geschieden und hat zwei Kinder.'],['Vanilla ist','Ottos Nachbarin.','Ottos Frau.'],['Elena und Maria\nmeinen: Otto braucht','eine Frau.','keine Frau.']].map((r,i)=><div key={i}>{text(173,651+i*67,245,String.fromCharCode(97+i)+'   '+r[0])}{[1,2].map((j)=><div key={j}>{dot('4-'+i,String(j),421,650+i*67+(j-1)*27,r[0]+': '+r[j])}{text(455,650+i*67+(j-1)*27,325,r[j])}</div>)}</div>)}
 {text(642,844,250,'Genitiv\nOttos Nachbarin =\ndie Nachbarin von Otto','nkInfo')}{check('4',173,922,{'4-0':'1','4-1':'1','4-2':'1','4-3':'1'})}
 {title('5',126,966,910,'Und rechts ist sein Wohnzimmer.')}{audio('assets/kb-cd3-track06.mp3',70,1002,'3 06')}{text(138,1002,880,'a  Hören Sie noch einmal und ergänzen Sie sein, seine oder seinen.','nkBold')}
 {text(173,1040,410,'1  Da oben ist sein Balkon. Und da hinten ist')}{field('5a-1a',616,1038,95,'Garage Possessivartikel')}{text(717,1040,160,'Garage - und')}{field('5a-1b',855,1038,95,'Auto Possessivartikel')}{text(957,1040,100,'Auto.')}
 {text(173,1067,75,'2  Und')}{field('5a-2',247,1065,100,'Haus Possessivartikel')}{text(354,1067,600,'Haus? Wie findest du Ottos Haus?')}
 {text(173,1094,26,'3')}{field('5a-3a',200,1092,100,'Haus finde ich schön')}{text(309,1094,260,'Haus finde ich schön. Aber')}{field('5a-3b',573,1092,100,'Garten mag ich nicht so')}{text(682,1094,350,'Garten mag ich nicht so.')}
 {text(173,1121,345,'4  Was ist denn mit Ottos Frau? -')}{field('5a-4',520,1119,100,'Frau Possessivartikel')}{text(629,1121,400,'Frau? Otto hat keine Frau.')}
 {text(173,1148,335,'5  Aber von wem sind denn dann')}{field('5a-5',514,1146,100,'Kinder Possessivartikel')}{text(623,1148,220,'Kinder?')}
 {check('5a',173,1180,{'5a-1a':'seine','5a-1b':'sein','5a-2':'sein','5a-3a':'Sein','5a-3b':'seinen','5a-4':'Seine','5a-5':'seine'})}
 {text(138,1221,560,'b  Ergänzen Sie.','nkBold')}
 <div className="nkGrammar" style={{left:173,top:1256,width:398,height:185}}>
 {text(25,6,160,'Nominativ\nDa ist …','nkSmall')}{text(196,6,200,'Akkusativ\nIch mag …','nkSmall')}
 {field('5b-1',24,53,130,'Da ist Balkon')}{text(196,54,220,'seinen      Balkon.','nkHand')}
 {text(24,80,130,'sein','nkHand')}{field('5b-2',196,79,100,'Ich mag Haus')}{text(305,80,90,'Haus.')}
 {field('5b-3',24,106,130,'Da ist Garage')}{text(196,107,220,'seine       Garage.','nkHand')}
 {text(24,133,165,'Da sind …','nkSmall')}{text(196,133,200,'Ich mag …','nkSmall')}
 {field('5b-4',24,155,130,'Da sind Kinder')}{text(196,155,220,'seine       Kinder.','nkHand')}
 </div>{art('directions',617,1256,264,187)}{check('5b',173,1450,{'5b-1':'sein','5b-2':'sein','5b-3':'seine','5b-4':'seine'})}
 </>}
 {page==='15'&&<>
 {art('vocab',0,0,1100,104)}{['• Fenster','• Balkon','• Erdgeschoss','• erster Stock','• Keller'].map((t,i)=>text(i*200+7,108,190,t,'nkCenter nkSmall'))}{text(1010,40,90,'14','nkLesson')}
 {title('6',106,179,400,'sein und ihr')}{text(119,222,440,'a  Wie finden Sie Ottos Haus? Sprechen Sie.','nkBold')}{text(150,262,410,'▲ Wie findest du Ottos Garten?\n■ Seinen Garten mag ich nicht so.\n   Aber sein Haus ist schön.')}
 {text(588,236,415,'Ich finde … interessant/langweilig/…\n… mag ich besonders / gar nicht / nicht so.\nAber/Und … sieht toll / … / nicht so schön aus.','nkBank nkSmall')}
 {text(119,367,450,'b  Und wie finden Sie Vanillas Haus?','nkBold')}{text(150,410,410,'■ Vanillas Haus ist gemütlich.\n▲ Ihren Garten mag ich besonders.')}
 <div className="nkGrammar" style={{left:598,top:364,width:380,height:135}}>{text(12,4,365,'Nominativ       Akkusativ','nkSmall')}{['• ihr Balkon','• ihr Haus','• ihre Garage','• ihre Blumen'].map((t,i)=><div key={t}>{text(20,29+i*25,170,t,'nkSmall')}{i===0?text(210,29,140,'ihren','nkHand'):field('6b-akk'+i,210,27+i*25,135,'Akkusativ: '+t)}</div>)}</div>
 {title('7',106,515,910,'Gegenstände beschreiben. Arbeiten Sie zu zweit auf Seite 75.')}
 {title('8',106,579,910,'Der „Glückstadt“-Wohnungsmarkt')}{text(119,624,900,'a  Überfliegen Sie die Anzeigen und notieren Sie:','nkBold')}{text(152,668,900,'① Wer sucht eine Wohnung / ein Haus?     ② Wer bietet eine Wohnung / ein Haus an?')}
 {text(138,711,35,'A')}{field('8a-A',173,708,80,'Anzeige A: 1 oder 2')}{text(137,743,426,'Glückstadt/Stadtmitte. Schöne 2-Zimmer-Wohnung (54 m²) im 3. Stock (Aufzug!) mit Küche, Bad und Balkon. Eigener Stellplatz in der Tiefgarage. 400 € plus 120,0 € Nebenkosten. Sofort frei. braun@ab-immo.com','nkAd')}
 {text(138,839,35,'B')}{field('8a-B',173,836,80,'Anzeige B: 1 oder 2')}{text(137,871,426,'Polizistin sucht dringend 1½- bis 2-Zimmer-Wohnung in Glückstadt/Stadtmitte oder Nord, ca. 40 bis 50 m² (nicht über 500 € inkl.). Gern auch möbliert. Kontakt: gittiweiß@polizei-glueckstadt.org','nkAd')}
 {text(138,967,35,'C')}{field('8a-C',173,964,80,'Anzeige C: 1 oder 2')}{text(137,999,426,'Blumenstraße 12. Nettes kleines Haus, 120 m², 4 Zi., Küche, 2 Bäder. Schöner großer Garten (700 m²!). Miete 880 € plus NK (200 €). Kontakt: vanilla@btx.net','nkAd')}
 {text(582,711,35,'D')}{field('8a-D',617,708,80,'Anzeige D: 1 oder 2')}{text(581,743,426,'Glückstadt-Süd. Apartment, 32 m², im EG. Wohn- und Schlafraum plus Küche (mit Kühlschrank und Herd). Monatsmiete: 320 € inkl. NK. braun@ab-immo.com','nkAd')}
 {text(582,839,35,'E')}{field('8a-E',617,836,80,'Anzeige E: 1 oder 2')}{text(581,871,300,'Super! Wohnen wie auf dem Land und doch mitten in der Stadt: WGM - Wohnpark Glückstadt Mitte. Nur noch 11 Wohnungen frei. 30 bis 70 m² / Warmmiete 360 bis 880 €/Monat. Ihr Vermieter: Glückstadtbau AG. Tel. 34758','nkAd')}{art('floorplan',892,841,113,116)}
 {text(694,1014,245,'m² = der Quadratmeter','nkInfo nkSmall')}{check('8a',150,1097,{'8a-A':'2|bietet an','8a-B':'1|sucht','8a-C':'2|bietet an','8a-D':'2|bietet an','8a-E':'2|bietet an'})}
 {text(119,1140,900,'b  Lesen Sie die Anzeigen noch einmal. Was passt zusammen? Markieren Sie die Wörter in den Anzeigen und ordnen Sie zu.','nkBold')}
 {text(150,1207,240,'1  Nebenkosten    d','nkHand')}{text(378,1207,140,'2  Vermieter')}{field('8b-2',521,1205,44,'Vermieter')}{text(586,1207,140,'3  möbliert')}{field('8b-3',727,1205,44,'möbliert')}{text(792,1207,110,'4  Miete')}{field('8b-4',902,1205,44,'Miete')}
 {text(150,1252,870,'a  Man bezahlt sie jeden Monat für seine Wohnung oder sein Haus.\nb  Die neue Wohnung ist nicht leer. In der Küche stehen z.B. ein Tisch und Stühle.\nc  Das ist eine Person oder eine Firma. Sie vermietet die Wohnung oder das Haus und bekommt die Miete.\nd  Man bezahlt sie zusammen mit der Miete, zum Beispiel für Wasser, Müll oder Licht.','nkSmall')}
 {check('8b',150,1373,{'8b-2':'c','8b-3':'b','8b-4':'a'})}{title('9',106,1424,920,'Wie sieht Ihr Traumhaus aus? Arbeiten Sie zu zweit auf Seite 76.')}
 </>}
 {page==='16'&&<>
 {text(8,45,95,'14','nkLesson')}{text(121,99,780,'SCHREIBTRAINING','nkModule')}
 {title('10',116,156,910,'Meine neue Wohnung')}{text(162,186,870,'Sie sind gerade umgezogen und schreiben eine E-Mail an eine Freundin / einen Freund.','nkBold')}
 {text(130,250,880,'a  Wie ist Ihre neue Wohnung? Ergänzen Sie.','nkBold')}
 <svg aria-hidden="true" style={{position:'absolute',left:200,top:277,width:650,height:215,pointerEvents:'none'}} viewBox="0 0 650 215"><g fill="none" stroke="#8eb8ce" strokeWidth="2"><ellipse cx="302" cy="75" rx="93" ry="43"/><path d="M209 63 L40 16 M209 88 L90 135 M370 47 L500 8 M393 80 L600 110 M302 118 L302 205"/></g></svg>{text(414,328,180,'Meine neue\nWohnung','nkSpeech')}{text(224,300,150,'Kosten?')}{field('10-kosten',222,331,170,'Kosten der Wohnung')}{text(266,365,150,'Zimmer?')}{field('10-zimmer',222,399,170,'Zimmer der Wohnung')}{text(632,285,150,'Größe?')}{field('10-groesse',622,318,160,'Größe der Wohnung')}{text(610,369,150,'negativ?')}{field('10-negativ',610,404,405,'Was ist negativ?')}{text(456,433,150,'positiv?')}{field('10-positiv',456,470,406,'Was ist positiv?')}
 {text(805,336,220,'das Bad: kein\nFenster','nkSmall')}{text(884,462,160,'die Küche:\nsehr groß','nkSmall')}
 {text(130,520,910,'b  In welcher Reihenfolge wollen Sie die Punkte aus a erwähnen? Sortieren Sie.','nkBold')}{field('10-reihenfolge',163,558,840,'Reihenfolge der Punkte')}
 {text(130,602,910,'c  Wählen Sie eine Anrede, passende Sätze und eine Grußformel und schreiben Sie die E-Mail.','nkBold')}
 {text(163,649,695,'Liebe/Lieber …, | Hallo …,\nich bin umgezogen. Meine Wohnung ist … m² groß und kostet … |\nSie hat eine Küche / ein Bad / … |\nToll ist: Die Küche / Das Wohnzimmer hat/ist … |\nLeider hat das Bad / … kein Fenster / … |\nHerzliche Grüße | Liebe Grüße | Viele Grüße','nkBank')}
 <textarea className="nkOpen" style={{left:879,top:647,width:190,height:169}} aria-label="Meine E-Mail" value={values['10-email']||''} onChange={e=>set('10-email',e.target.value)}/>
 {text(121,839,460,'GRAMMATIK','nkModule')}{text(652,839,420,'KOMMUNIKATION','nkModule')}
 <div className="nkCommunication" style={{left:121,top:885,width:510}}>
 <section><h3><Words text="Genitiv bei Eigennamen"/></h3><p><Words text={'Ottos Nachbarin = die Nachbarin von Otto\nVanillas Garten = der Garten von Vanilla'}/></p></section>
 <section><h3><Words text="Possessivartikel sein/ihr"/></h3><table className="nkPossessive"><thead><tr><th></th><th colSpan={2}><Words text="Nominativ"/></th><th colSpan={2}><Words text="Akkusativ"/></th><th></th></tr></thead><tbody><tr><td></td><td colSpan={2}><Words text="Da ist …"/></td><td colSpan={2}><Words text="Ich mag …"/></td><td></td></tr>{[['• Garten','sein','ihr','seinen','ihren','Garten.'],['• Haus','sein','ihr','sein','ihr','Haus.'],['• Küche','seine','ihre','seine','ihre','Küche.'],['Da sind …','','','Ich mag …','',''],['• Kinder','seine','ihre','seine','ihre','Kinder.']].map((r,i)=><tr key={i}>{r.map((t,j)=><td key={j}><Words text={t}/></td>)}</tr>)}</tbody></table><p><Words text="auch so bei: finden, …"/></p></section>
 </div>
 <div className="nkCommunication" style={{left:653,top:885,width:431}}><section><h3><Words text="Häuser und Wohnungen beschreiben"/></h3><p><Words text={'Das Haus ist groß/klein und hat sieben/… Zimmer.\nIm Erdgeschoss / Im ersten Stock sind drei Zimmer.\nHier vorne links ist die Küche / das …\nDa hinten ist seine Garage / ihr …\nNeben dem Haus ist eine Garage.'}/></p></section><section><h3><Words text="Häuser und Wohnungen bewerten"/></h3><p><Words text={'Ich finde … interessant/langweilig/…\n… mag ich besonders / gar nicht / nicht so.\nAber/Und … sieht toll / … / nicht so schön aus.'}/></p></section></div>
 </>}
 {page==='17'&&<>
 {art('hero',0,0,1100,987)}{text(425,44,585,'In Giesing wohnt das Leben!','nkHeroTitle')}{text(1010,38,90,'15','nkLesson')}
 {title('1',118,1033,700,'Der Blick aus meinem Fenster.')}{text(132,1078,670,'a  Was sehen Sie auf den Bildern? Hilfe finden Sie im Bildlexikon.','nkBold')}
 {text(132,1120,665,'b  Was passt? Hören Sie und ordnen Sie zu.','nkBold')}
 {[7,8,9,10,11,12].map((t,i)=>audio(`assets/kb-cd3-track${String(t).padStart(2,'0')}.mp3`,135+i*103,1152,'3 '+String(t).padStart(2,'0')))}
 {text(164,1192,80,'Text')}{text(164,1227,80,'Foto')}{[1,2,3,4,5,6].map((t,i)=><div key={t}>{text(262+i*73,1192,44,''+t)}{field('1b-'+t,252+i*73,1225,44,'Text '+t+' Foto')}</div>)}
 {check('1b',164,1268,{'1b-1':'c','1b-2':'f','1b-3':'b','1b-4':'a','1b-5':'d','1b-6':'e'})}
 {title('2',118,1325,700,'Was sehen Sie aus Ihrem Fenster? Mögen Sie den Blick?')}{text(164,1370,570,'• Café | • Park | • Hafen | • Straße | • Meer | …','nkBank')}
 {text(520,1412,310,'Ich sehe eine Straße. Ich mag den Blick nicht so gern. Was siehst du?','nkSpeech')}{field('2-blick',164,1417,325,'Der Blick aus meinem Fenster')}
 <aside className="nkAside" style={{left:836,top:973,width:220,height:380}}><Words text={'Sprechen: einen Ort bewerten: Giesing ist ganz normal. Das gefällt mir.; nach Einrichtungen fragen und darauf antworten: Gibt es eigentlich auch ein Kino in …?\nLesen: Blog\nWortfelder: Einrichtungen und Orte in der Stadt\nGrammatik: Verben mit Dativ / Personalpronomen im Dativ: Das gefällt mir.'}/></aside>
 </>}
 {page==='18'&&<>
 {art('vocab',0,0,1100,104)}{['• Turm','• Kirche','• Schloss','• Rathaus','• Markt','• Altstadt','• Geschäft / • Laden'].map((t,i)=>text(i*155+8,108,155,t,'nkCenter nkSmall'))}
 {title('3',120,179,930,'Überfliegen Sie Marlenes Blog.')}{text(133,224,900,'a  Worüber schreibt Marlene? Kreuzen Sie an.','nkBold')}
 {['über ihre Stadt','über ihr Stadtviertel','über ihre Straße'].map((t,i)=><div key={t}>{dot('3a',t,168+i*283,270,t)}{text(202+i*283,270,245,t)}</div>)}{check('3a',167,309,{'3a':'über ihr Stadtviertel'})}
 {text(133,355,890,'b  Zu welchen Themen finden Sie Links?\n    Notieren Sie. Nicht alle Wörter passen!','nkBold')}
 {text(167,419,650,'Reisebüro | Kino | Film | Bibliothek | Schule | Jugendherberge | Museum | Friseur | Wetter | Glückstadt | Fotos | Restaurants | Rezepte | Theater','nkBank')}
 <textarea className="nkOpen" style={{left:825,top:413,width:205,height:92}} aria-label="Themen der Links" value={values['3b']||'Reisebüro, …'} onChange={e=>set('3b',e.target.value)}/>
 {title('4',120,523,930,'Mein Lieblingsviertel')}{text(133,567,930,'a  Lesen Sie den Blog und die Kommentare noch einmal. Was ist richtig? Kreuzen Sie an.','nkBold')}
 {['Giesing ist ein Stadtviertel in München.','Marlene wohnt sehr gern in Giesing.','In Giesing wohnen keine Ausländer.','In Giesing gibt es leider nur sehr wenige Geschäfte.'].map((t,i)=><div key={t}>{text(167,611+i*26,560,`${i+1}  ${t}`)}{dot('4a-'+i,'',740,611+i*26,t,true)}</div>)}{check('4a',167,711,{'4a-0':'true','4a-1':'true','4a-2':'false','4a-3':'false'})}
 <div className="nkBlog" style={{left:60,top:742,width:1030,height:700}}>
 <header><Words text="MARLENES BLOG"/></header><div className="nkBlogMain"><h2><Words text="In Giesing wohnt das Leben!"/></h2><span className="nkDate">21. Juni</span><img src="assets/native-kb12/p18-marlene.png" alt="Marlene"/>
 <p><Words text={'Seit einem halben Jahr lebe ich in München, in meinem Lieblingsviertel Giesing. Giesing ist ganz normal. Giesing ist nicht toll. Giesing ist nicht „in“. Und genau das gefällt mir so gut. Hier leben Alte und Junge zusammen, Arbeiter und Studenten, Deutsche und Ausländer. Der Stadtteil gehört uns allen und hier finden wir auch alles: Es gibt Läden, Werkstätten, viele Kneipen und Restaurants. Ich wohne mit meiner Familie in der Tegernseer Landstraße. Von hier aus kommen wir überall sehr gut zu Fuß hin: Der Kindergarten ist gleich um die Ecke, zur Schule ist es auch nicht weit, mein Friseur ist im Nachbarhaus und zur Post sind es keine 50 Meter. Ich sag’s ja: Giesing ist ganz normal und das finde ich super so!'}/></p>
 <h4><Words text="Kommentare"/></h4><p className="nkBlogComment"><Words text={'Hallo Marlene! Gratuliere! Dein Blog gefällt mir. Und dein Text über Giesing hilft mir sehr. Ich möchte nämlich bald in München studieren. Ich habe noch keine Wohnung dort, aber vielleicht kenne ich jetzt ja schon mal den richtigen Stadtteil. Eine Frage noch: Gibt es eigentlich auch ein Kino in Giesing? Ich danke dir!\n„Claudia aus Essen“ 26. Juni um 22:12 Uhr   Antworten'}/></p><p className="nkBlogComment"><Words text={'Ja, Giesing ist schon okay. Aber so toll ist es nun auch wieder nicht. Andere Stadtteile sind auch schön. Mir gefallen die Maxvorstadt und das Lehel sehr gut.\n„Teddybär“ 28. Juni um 16:43 Uhr   Antworten'}/></p></div>
 <img className="nkBlogAdRail" src="assets/native-kb12/p18-adrail.png" alt="Theater im Turm, Aktuelles"/><div className="nkBlogLinks"><h3><Words text="Links"/></h3><Words text={'München-Wetter\n(Regen oder Sonne?)\nHermis Küche\n(Tolle Kochrezepte!)\nGlückstadt-Fanseite\n(Für alle „Glückstadt“-Spieler)'}/><img src="assets/native-kb12/p18-travel.png" alt="WR Wächterreisen"/></div>
 </div>
 </>}
 {page==='19'&&<>
 {art('vocab',0,0,1100,102)}{['• Kindergarten','• Spielplatz','• Schule','• Jugendherberge','• Bibliothek'].map((t,i)=>text(10+i*200,106,190,t,'nkCenter nkSmall'))}{text(1010,39,90,'15','nkLesson')}
 {text(119,180,580,'b  Lesen Sie den Blog noch einmal. Was gibt es in Giesing?\n    Was davon gibt es auch in Ihrem Heimatort /\n    in Ihrem Stadtviertel? Notieren Sie.','nkBold nkCompact')}
 {text(716,180,145,'Giesing','nkHand')}{text(870,180,160,'Mein Heimatort','nkHand')}{field('4b-giesing',716,217,145,'Giesing: Einrichtungen')}{field('4b-heimat',870,217,155,'Mein Heimatort: Einrichtungen')}
 {text(119,290,900,'c  Was meinen Sie? Kreuzen Sie an oder schreiben Sie selbst etwas.\n    Vergleichen Sie dann mit Ihrer Partnerin / Ihrem Partner.','nkBold')}{text(151,358,600,'Marlene')}
 {[['kauft gern ein.','findet Einkaufen nicht so wichtig.'],['liebt die Ruhe auf dem Land.','lebt gern in der Stadt.'],['ist gern allein.','ist gern unter Menschen.'],['hat Kinder.','hat keine Kinder.']].map((r,i)=><div key={i}>{text(151,391+i*27,30,''+(i+1))}{r.map((t,j)=><div key={t}>{dot('4c-'+i,''+j,179+j*341,391+i*27,t)}{text(212+j*341,391+i*27,330,t)}</div>)}</div>)}
 {text(151,499,26,'5')}{field('4c-left',179,497,295,'Marlene: eigene Meinung 1')}{field('4c-right',520,497,355,'Marlene: eigene Meinung 2')}
 {title('5',106,559,920,'Das gefällt mir.')}{text(119,604,900,'a  Was bedeuten die markierten Wörter aus dem Blog? Ordnen Sie zu.','nkBold')}
 {text(151,650,360,'1  Der Stadtteil gehört uns allen.')}{text(151,681,240,'2  Das gefällt mir.')}{field('5a-2',396,679,40,'Das gefällt mir: Buchstabe')}{text(151,726,230,'3  Ich danke dir.')}{field('5a-3',396,724,40,'Ich danke dir: Buchstabe')}{text(151,757,230,'4  Das hilft mir.')}{field('5a-4',396,755,40,'Das hilft mir: Buchstabe')}
 {text(520,650,500,'a  Das ist wichtig für mich.\nb  Alle sind hier zu Hause und können sagen:\n   „Das ist mein Viertel.“\nc  Das finde ich gut.\nd  Vielen Dank für deine Hilfe!')}{text(453,650,35,'↘ b','nkHand')}{check('5a',151,798,{'5a-2':'c','5a-3':'d','5a-4':'a'})}
 {text(119,848,920,'b  Welche Personalpronomen stehen bei den markierten Wörtern? Ergänzen Sie.','nkBold')}
 <div className="nkGrammar" style={{left:151,top:892,width:820,height:143}}>{text(20,9,600,'Personalpronomen','nkBold')}{text(20,47,150,'Nominativ')}{text(20,84,150,'Dativ\nDas gefällt','nkTiny')}{['ich','du','er/es/sie','wir','ihr','sie/Sie'].map((t,i)=>text(185+i*103,47,110,t))}{text(185,86,100,'mir','nkHand')}{field('5b-du',288,83,80,'Dativ du')}{text(391,86,120,'ihm/ihm/ihr','nkRed nkSmall')}{field('5b-wir',494,83,80,'Dativ wir')}{text(597,86,100,'euch','nkRed')}{text(700,86,115,'ihnen/Ihnen','nkRed nkSmall')}{text(20,119,750,'auch so nach: gehören, danken, helfen …','nkSmall')}</div>
 {check('5b',151,1048,{'5b-du':'dir','5b-wir':'uns'})}{text(119,1094,920,'c  Urlaubsorte bewerten: Wem gefällt was? Arbeiten Sie auf Seite 73.\n    Ihre Partnerin / Ihr Partner arbeitet auf Seite 77.','nkBold')}
 {title('6',106,1180,570,'Stadt und Natur')}{text(151,1213,540,'Arbeiten Sie zu zweit. Lesen Sie den Blog noch einmal und suchen Sie Wörter zu den beiden Themen.','nkBold')}{text(716,1187,320,'In der Natur: Landschaft,\nMeer, Wald, …\nIn der Stadt: Läden, …','nkHand')}{field('6-natur',716,1271,320,'Weitere Wörter: Stadt und Natur')}
 {title('7',106,1320,920,'Was ist Ihr Lieblingsviertel?')}{text(151,1355,600,'Machen Sie Notizen und erzählen Sie dann im Kurs.\n- Was gefällt Ihnen (nicht) an dem Viertel?\n- Was gibt es in dem Viertel? Was fehlt?\n- Was für Leute wohnen da?','nkSmall')}{text(716,1355,320,'Wien - Neubau\nEs gibt: Kneipen, Museen,\nLäden …','nkHand')}{field('7-viertel',716,1434,320,'Mein Lieblingsviertel: Notizen')}
 </>}
 {page==='20'&&<>
 {text(8,45,95,'15','nkLesson')}{text(121,99,780,'MINI-PROJEKT','nkModule')}{title('8',120,154,920,'Wie gut kennen Sie die anderen aus Ihrem Kurs?')}
 {text(133,202,910,'a  Was möchten Sie von den anderen wissen? Machen Sie einen Fragebogen und tauschen Sie ihn mit einer anderen Person.','nkBold')}
 {text(167,266,805,'Beruf | Sprache | Hobby | Farbe | Obst | Computerspiel | Buch | Urlaubsort | …','nkBank')}
 {art('questions',163,313,89,241)}
 {['Mein Lieblingsrestaurant:','Meine Lieblingsstadt:','Mein Lieblingsfilm:','Mein(e)','Mein(e)','','',''].map((t,i)=><div key={i}>{text(271,334+i*27,300,`${i+1}  ${t}`)}{i>2?field('8a-frage'+i,420,332+i*27,135,'Frage '+(i+1)):null}{field('8a-antwort'+i,560,332+i*27,400,'Antwort '+(i+1))}</div>)}
 {text(133,599,920,'b  Beantworten Sie die Fragen und notieren Sie Ihren Namen auf den Fragebogen.\n    Mischen Sie dann alle Fragebögen.','nkBold')}{field('8b-name',560,655,400,'Name auf dem Fragebogen')}
 {text(133,706,580,'c  Ziehen Sie einen Fragebogen und erzählen Sie.\n    Die anderen raten: Von wem sind die Antworten?','nkBold')}{text(710,701,320,'Das Lieblingsrestaurant heißt „Cantina México“. Die Lieblingsstadt ist …','nkSpeech')}
 {text(121,822,460,'GRAMMATIK','nkModule')}{text(526,822,520,'KOMMUNIKATION','nkModule')}
 <div className="nkCommunication" style={{left:121,top:867,width:360}}><section><h3><Words text="Personalpronomen im Dativ"/></h3><table className="nkDativ"><thead><tr><th><Words text="Nominativ"/></th><th><Words text="Dativ"/></th></tr></thead><tbody>{[['ich','mir'],['du','dir'],['er/es','ihm'],['sie','ihr'],['wir','uns'],['ihr','euch'],['sie/Sie','ihnen/Ihnen']].map(([a,b])=><tr key={a}><td><Words text={a}/></td><td className="nkRed"><Words text={b}/></td></tr>)}</tbody></table></section><section><h3><Words text="Verben mit Dativ"/></h3><table className="nkDativ"><tbody>{[['Das','gehört','mir.'],['Das','gefällt','dir.'],['Das','hilft','ihm.'],['Ich','danke','ihr.']].map((r,i)=><tr key={i}>{r.map((t,j)=><td key={j} className={j===1?'nkRed':''}><Words text={t}/></td>)}</tr>)}</tbody></table></section></div>
 <div className="nkCommunication" style={{left:526,top:867,width:477}}><section><h3><Words text="einen Ort bewerten"/></h3><p><Words text={'Was gefällt Ihnen/euch (nicht) an dem Viertel?\nGiesing ist ganz normal und das finde ich super so / ist schon okay. / Das finde ich gut.\nAber so toll ist es nun auch wieder nicht.'}/></p></section><section><h3><Words text="nach Einrichtungen fragen und darauf antworten"/></h3><p><Words text={'Gibt es eigentlich auch ein Kino / … in …?\nIn … gibt es leider nur sehr wenige Geschäfte / …\nEs gibt viele Kneipen und Restaurants.'}/></p></section></div>
 </>}
 {text(Number(page)%2?865:88,1480,160,({9:'neun | 9',10:'10 | zehn',11:'elf | 11',12:'12 | zwölf',13:'dreizehn | 13',14:'14 | vierzehn',15:'fünfzehn | 15',16:'16 | sechzehn',17:'siebzehn | 17',18:'18 | achtzehn',19:'neunzehn | 19',20:'20 | zwanzig'} as Record<string,string>)[page],'nkFooter')}
 {text(Number(page)%2?1025:5,1480,75,'Modul 5','nkModuleFooter')}
 {page==='10'&&<>{text(86,256,25,'Spiel & Spaß','nkSide')}{text(86,623,25,'Spiel & Spaß','nkSide')}</>}
 {page==='11'&&<>{text(69,325,25,'noch einmal?','nkSide')}{text(69,1000,25,'Diktat','nkSide')}</>}
 {page==='12'&&<>{text(84,451,25,'Beruf','nkSide')}{text(84,838,25,'Audiotraining','nkSide')}{text(84,949,25,'Karaoke','nkSide')}</>}
 {(Number(page)<13?[page==='9'?1074:page==='10'?190:page==='11'?209:166]:({13:[1168],14:[184,644,976],15:[184,584],16:[],17:[],18:[184,527],19:[563,1324],20:[]} as Record<string,number[]>)[page]||[]).map(y=>text(85,y,30,'AB','nkAB'))}
 {page==='14'&&text(86,679,25,'noch einmal?','nkSide')}
 {page==='15'&&<>{text(78,232,25,'Film','nkSide')}{text(78,521,25,'Spiel & Spaß','nkSide')}{text(78,633,25,'Interessant?','nkSide')}{text(78,1418,25,'Diktat','nkSide')}</>}
 {['16','20'].includes(page)&&<>{text(83,page==='16'?602:242,25,'Beruf','nkSide')}{text(83,840,25,'Audiotraining','nkSide')}{text(83,959,25,'Karaoke','nkSide')}</>}
 {page==='17'&&text(83,1268,25,'Interessant?','nkSide')}
 {page==='19'&&<>{text(78,297,25,'Spiel & Spaß','nkSide')}{text(78,1100,25,'Spiel & Spaß','nkSide')}{text(78,1362,25,'Diskutieren','nkSide')}</>}
 </div><audio ref={player} className="nkPlayer" hidden={['15','16','18','19','20'].includes(page)} controls aria-label="Originalaudio"/></div>
}
export const nativeKB12Pages=new Set(['9','10','11','12','13','14','15','16','17','18','19','20']);
