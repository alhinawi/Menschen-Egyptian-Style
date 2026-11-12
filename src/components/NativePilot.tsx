import {useRef,useState} from 'react';
import './native-pilot.css';
function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\S/.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-phrase={text} data-word={w.replace(/^[.,!?„"()]+|[.,!?“"()]+$/g,'')}>{w}</span>:w)}</>}
export function NativePilot({page}:{page:string}){
 const key='native-pilot-kb11-'+page;const player=useRef<HTMLAudioElement>(null);
 const [v,S]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});const [graded,G]=useState<Record<string,boolean>>({});
 const set=(id:string,value:string)=>{const next={...v,[id]:value};S(next);localStorage.setItem(key,JSON.stringify(next))};
 const text=(x:number,y:number,w:number,s:string,cls='')=><div className={'npText '+cls} style={{left:x,top:y,width:w}}><Words text={s}/></div>;
 const img=(name:string,x:number,y:number,w:number,h:number)=><img className="npArt" src={`assets/book-crops/native-p${page}-${name}.png`} alt={`Originalabbildung ${name}`} style={{left:x,top:y,width:w,height:h}}/>;
 const field=(id:string,x:number,y:number,w:number,label:string)=><input className="npInput" style={{left:x,top:y,width:w}} aria-label={label} data-native-field={id} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const choice=(id:string,value:string,x:number,y:number,label:string)=><input type="radio" className="npRadio" style={{left:x,top:y}} name={key+'-'+id} aria-label={label} checked={v[id]===value} onChange={()=>set(id,value)}/>;
 const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\s+/g,' ');
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="npCheck" style={{left:x,top:y}}><button onClick={()=>G({...graded,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(s=>normalize(s)===normalize(v[k]||'')))})}>Prüfen ✓</button><output>{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const title=(n:string,x:number,y:number,w:number,s:string)=><div className="npText npTitle" style={{left:x,top:y,width:w}}><b className="npNum">{n}</b><Words text={s}/></div>;
 const audio=(track:string,x:number,y:number)=><audio ref={player} controls aria-label={'Originalaudio '+track} src={'assets/kb-cd2-track'+track+'.mp3'} style={{position:'absolute',left:x,top:y,width:360,height:36}}/>;
 return <div className="nativePilot" data-native-page={page}><div className="npCanvas">
 {page==='41'&&<>
  {img('hero',0,0,1075,1009)}
  {title('1',162,1040,670,'Sehen Sie das Foto an. Was für ein Kompliment macht der Mann wohl der Frau?')}
  {text(580,1093,230,'Ich glaube, er sagt: Du …','npSpeech')}
  {title('2',162,1142,690,'Was passt? Hören Sie und kreuzen Sie an.')}
  {text(572,1175,90,'Gespräch')}{[1,2,3].map(c=>text(672+(c-1)*52,1175,25,''+c))}
  <button className="npListen" style={{left:104,top:1149}} aria-label="Originalaudio 2 01 abspielen" onClick={()=>player.current?.play()}>▶ 2 01</button>
  {['Du kannst wirklich toll kochen.','Du kannst ja super tanzen.','Deine Augen sind sehr schön.'].map((s,r)=><div key={s}>{text(202,1205+r*38,370,String.fromCharCode(97+r)+' '+s)}{[1,2,3].map((c)=>choice('gespraech'+c,String.fromCharCode(97+r),672+(c-1)*52,1205+r*38,`Gespräch ${c}: ${s}`))}</div>)}
  {img('cook',520,1190,53,65)}{img('dance',470,1230,50,56)}{img('eyes',508,1274,75,42)}
  {check('task2',200,1326,{gespraech1:'b',gespraech2:'c',gespraech3:'a'})}
  {title('3',162,1390,390,'Welches Gespräch passt am besten zum Foto? Machen Sie eine Kursstatistik.')}
  {text(580,1372,140,'Frauen','npHand')}{text(733,1372,140,'Männer','npHand')}
  {[1,2,3].map((n,i)=><div key={n}>{text(560,1401+i*27,30,''+n)}{field('stat-f'+n,589,1398+i*27,110,'Gespräch '+n+' Frauen')}{field('stat-m'+n,740,1398+i*27,110,'Gespräch '+n+' Männer')}</div>)}
  <aside className="npAside" style={{left:850,top:973,width:203,height:396}}><Words text={'Hören: Aussagen zu Freizeitaktivitäten\n\nSprechen: Komplimente machen: Du kannst super tanzen!; über Hobbys/Fähigkeiten sprechen: Mein Hobby ist tanzen. Ich kann gut singen.; um etwas bitten: Kann ich telefonieren?; sich bedanken: Oh, danke!\n\nWortfeld: Freizeitaktivitäten\nGrammatik: Modalverb können; Satzklammer: Du kannst super Gitarre spielen.'}/></aside>
 </>}
 {page==='42'&&<>
  {img('vocab',0,65,1075,145)}
  {text(110,255,30,'AB','npAB')}{title('4',146,250,780,'Du kannst ja super tanzen!')}{text(160,293,750,'a  Lesen Sie die Komplimente und ordnen Sie zu.','npTitle')}
  {img('collage',40,323,738,247)}
  {['Sie können aber toll Ski fahren.','Du kannst wirklich sehr gut Gitarre spielen.','Wow! Du kannst ja super tanzen.','Du kannst wirklich gut Tennis spielen.'].map((s,i)=><div key={s}>{i===0?text(794,326,35,'1'):field('kompliment'+i,794,326+i*68,35,'Bildnummer: '+s)}{text(838,326+i*68,210,s)}</div>)}
  {check('4a',160,581,{kompliment1:'5',kompliment2:'10',kompliment3:'8'})}
  {text(160,635,850,'b  Was machen die anderen Personen? Suchen Sie die Wörter im Bildlexikon und schreiben Sie.','npTitle')}
  {field('4b',196,699,715,'Andere Personen: Tätigkeiten')}
  {text(110,755,30,'AB','npAB')}{title('5',146,750,780,'Schreiben Sie die Sätze in die Tabelle.')}{text(192,780,650,'Verwenden Sie die passende Form von können.','npTitle')}
  {['a  können - wirklich super - du - Gitarre - spielen','b  ihr - können - gut - tanzen?','c  Ski fahren - Sie - aber toll - können','d  können - Tennis - spielen - ja super - er','e  Schach - Sie - können - spielen?'].map((s,i)=>text(194,817+i*28,570,s))}
  {text(720,780,270,'können\nich          kann\ndu           kannst\ner/sie/es    kann\nwir          können\nihr          könnt\nsie/Sie      können','npGrammar')}
  {[['Du','kannst','wirklich super Gitarre','spielen.'],['','Könnt','ihr gut','tanzen?'],['Sie','können','aber toll Ski','fahren.'],['Er','kann','ja super Tennis','spielen.'],['','Können','Sie Schach','spielen?']].map((row,r)=><div key={'sentence'+r}>{row.map((answer,c)=>answer?<input key={c} className="npInput npSentenceCell" style={{left:[194,273,367,599][c],top:956+r*23,width:[75,90,228,91][c]}} aria-label={`Aufgabe 5 Satz ${String.fromCharCode(97+r)}, Spalte ${c+1}`} data-native-field={`satz${r}-${c}`} value={v[`satz${r}-${c}`]||''} onChange={e=>set(`satz${r}-${c}`,e.target.value)}/>:null)}</div>)}
  {check('5',194,1080,Object.fromEntries([['Du','kannst','wirklich super Gitarre','spielen.'],['','Könnt','ihr gut','tanzen?'],['Sie','können','aber toll Ski','fahren.'],['Er','kann','ja super Tennis','spielen.'],['','Können','Sie Schach','spielen?']].flatMap((row,r)=>row.flatMap((a,c)=>a?[[`satz${r}-${c}`,a]]:[]))))}
  {text(700,965,330,'Du kannst wirklich sehr gut Gitarre spielen.\nKannst du das noch einmal sagen?','npGrammar')}
  {text(110,1135,30,'AB','npAB')}{title('6',146,1130,780,'Ich kann ein bisschen Schach spielen.')}{text(160,1166,850,'a  Ordnen Sie die Wörter.','npTitle')}{text(195,1200,830,'ein bisschen | gar nicht | toll / sehr gut / super | nicht | gut | nicht so gut','npBank')}
  {text(205,1238,210,'☺ toll / sehr gut / super','npHand')}
  {['gut','ein bisschen','nicht so gut','nicht','gar nicht'].map((a,i)=>field('skala'+i,420+i*107,1237,i===2?105:98,'Skala '+(i+1)))}
  {check('6a',205,1277,{skala0:'gut',skala1:'ein bisschen',skala2:'nicht so gut',skala3:'nicht',skala4:'gar nicht'})}
  {text(160,1330,860,'b  Wer kann was? Arbeiten Sie auf Seite 83. Ihre Partnerin / Ihr Partner arbeitet auf Seite 86.','npTitle')}
  {text(160,1390,850,'c  Was können Sie gut / gar nicht? Sprechen Sie.','npTitle')}{text(195,1423,820,'kochen | singen | malen | Schach spielen | Ski fahren | Fußball spielen | backen | Gitarre spielen | …','npBank')}
  {text(195,1464,830,'■ Ich kann ein bisschen Schach spielen. Und du?\n▲ Ich kann nicht gut Schach spielen. Aber ich kann gut malen.')}
 </>}
 {page==='55'&&<>
  {text(520,135,520,'PROJEKT LANDESKUNDE','npModule')}
  {title('1',163,238,830,'Was ist richtig? Lesen Sie das Rezept und kreuzen Sie an.')}
  {text(200,286,770,'Labskaus  eine norddeutsche Spezialität','npRecipeTitle')}
  {text(225,352,740,'Labskaus kommt aus Norddeutschland und ist ein traditionelles Seefahreressen. Früher war Labskaus ein Resteessen. Resteessen bedeutet: Man kauft nicht extra ein. Man sieht nach: Was hat man zu Hause? Daraus kocht man dann etwas. Und heute macht man Labskaus nicht mehr aus Resten. Man verwendet frische Zutaten.','npRecipe')}
  {text(225,468,740,'Sie möchten Labskaus selbst machen? Das ist ganz leicht:\nStampfen Sie Corned Beef und Kartoffeln und würzen Sie mit Salz und Pfeffer. Sie können auch Zwiebeln dazugeben.\nDazu essen Sie Spiegelei und Gewürzgurke.','npRecipe')}
  {text(225,590,390,'Sie brauchen:\n500 g Kartoffeln\n350 g Corned Beef\n3 Zwiebeln\nSalz, Pfeffer\nSpiegelei         , Gewürzgurke','npRecipe')}
  {img('food',656,522,304,205)}{img('egg',315,706,39,41)}{img('pickle',486,704,78,25)}
  {text(210,783,360,'a  Labskaus kommt aus')}{choice('a','at',438,783,'Labskaus kommt aus Österreich')}<div className="npFlag npAustria" style={{left:470,top:783}}/>{choice('a','de',552,783,'Labskaus kommt aus Deutschland')}<div className="npFlag npGermany" style={{left:590,top:783}}/>
  {text(210,822,400,'b  Das Gericht macht man heute')}{choice('b','reste',515,822,'Heute aus Resten')}{text(548,822,140,'aus Resten.')}{choice('b','frisch',655,822,'Heute aus frischen Zutaten')}{text(688,822,300,'aus frischen Zutaten.')}
  {text(210,861,400,'c  Für Labskaus brauchen Sie')}{choice('c','keine',489,861,'keine Kartoffeln')}{text(522,861,180,'keine Kartoffeln.')}{choice('c','viele',684,861,'viele Kartoffeln')}{text(718,861,230,'viele Kartoffeln.')}
  {check('1',210,909,{a:'de',b:'frisch',c:'viele'})}
  {title('2',163,966,850,'Typische Gerichte aus den deutschsprachigen Ländern')}
  {text(180,1010,790,'a  Wählen Sie ein typisches Gericht aus Deutschland, Österreich oder der Schweiz. Suchen Sie Fotos und Informationen im Internet und machen Sie Notizen zu den Fragen. Schreiben Sie dann ein Rezept wie in 1.','npTitle')}
  {['1  Wie heißt das Gericht?','2  Woher kommt es?','3  Sie möchten das Gericht kochen. Was brauchen Sie?'].map((s,i)=><div key={s}>{text(210,1100+i*57,500,s)}{field('rezept'+i,210,1124+i*57,480,s)}</div>)}
  {text(180,1305,550,'b  Präsentieren Sie Ihr Gericht im Kurs und machen Sie ein Kursrezeptbuch mit allen Gerichten.','npTitle')}
  {text(260,1400,430,'Mein Gericht heißt Käsefondue. Es kommt aus der Schweiz. Du brauchst: Käse, Wein und Brot.','npSpeech')}
  {img('recipe',729,1072,217,293)}
 </>}
 {text(842,page==='42'?1510:1470,220,({41:'einundvierzig',42:'zweiundvierzig',55:'fünfundfünfzig'} as Record<string,string>)[page]+' | '+page,'npFooter')}
 </div><div className="nativeAudioBelow">{page==='41'?audio('01',0,0):null}<span>{page==='41'?'Originalaudio · ':''}Antworten werden gespeichert</span></div></div>
}
