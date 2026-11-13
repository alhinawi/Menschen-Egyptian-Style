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
export function NativeAB11Module3Review({page}:{page:string}){
 const host=useRef<HTMLDivElement>(null),audio=useRef<HTMLAudioElement>(null),[scale,SS]=useState(1),[,T]=useState(''),[v,S]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem('native-ab11-'+page)||'{}')}catch{return {}}}),[graded,G]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const measure=()=>SS(Math.min(el.clientWidth/901,el.clientHeight/1275));measure();const ro=new ResizeObserver(measure);ro.observe(el);return()=>ro.disconnect()},[]);
 usePageReset(page,'native-ab11-'+page,()=>{S({});G({})});
 const set=(id:string,value:string)=>{const next={...v,[id]:value};S(next);localStorage.setItem('native-ab11-'+page,JSON.stringify(next));G({})};
 const sy=page==='71'?.78:page==='72'?.59:.58;const Y=(y:number)=>130+(y-130)*sy;
 const txt=(x:number,y:number,w:number,s:string,cls='')=><div className={'mText '+cls} style={{left:x,top:cls==='mFooter'?y:Y(y),width:w}}><Words s={s}/></div>;
 const bank=(y:number,s:string,emphasis:string)=><div className="mText mBank" style={{left:525,top:Y(y),width:314}}>{s.split(emphasis).map((part,i)=><span key={i}>{i>0&&<mark><Words s={emphasis}/></mark>}<Words s={part}/></span>)}</div>;
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
 const vocab=(words:string[],x:number,y:number,step:number)=>words.map((word,i)=><span key={word}>{txt(x,y+i*step,160,word,'mVocabText')}{f('vocab-'+x+'-'+y+'-'+i,x+164,y+i*step-2,x===476?145:136,'Übersetzung '+word)}</span>);
 const cross=(id:string,x:number,y:number,len:number,blue:number)=><div className="mCrossRow" style={{left:x,top:Y(y),width:len*27,height:27}}>{Array.from({length:len},(_,i)=><div key={i} className={i===blue?'solution':''}/>) }<input data-native-field={id} aria-label={id+' Kreuzworträtsel'} maxLength={len} value={v[id]||''} onChange={e=>set(id,e.target.value)} /></div>;
 const strike=(id:string,x:number,y:number,words:string[],fixed='')=><div className="mStrikeRow" style={{left:x,top:Y(y)}}>{words.map((s,i)=><span key={s}><button disabled={!!fixed} className={(fixed?fixed===s:v[id]===s)?'struck':''} aria-label={id+' streichen '+s} onClick={()=>set(id,v[id]===s?'':s)}>{s}</button>{i<words.length-1?' – ':''}</span>)}</div>;
 const setMatches=(id:string,items:string[])=>{const got=(v[id]||'').split(/\s*[,;/]\s*|\s+und\s+|\s+/).map(norm).filter(Boolean).sort();return got.join('|')===items.map(norm).sort().join('|')};
 return <div className="nativeAB11 nativeAB11Module1 nativeAB11Lessons45 nativeAB11Next45 nativeAB11Module3Review" ref={host} data-native-ab11-page={page}><div className="nabCanvas mCanvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='71'&&<>
 {head('LERNWORTSCHATZ')}<div className="nabModule">9</div>{art('strip',785,178,116,1003)}{title('1',211,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.','',132,650)}
 {txt(168,255,300,'Lebensmittel','mTitle')}{vocab(['Apfel der, ¨','Braten der, -','Brötchen das, -'],168,287,29)}{txt(168,376,315,'A: Semmel die, -n / CH: Brötli das, -','mSmall')}
 {vocab(['Brot das, -e','Butter die','Ei das, -er','Eis das','Fisch der, -e','Fleisch das','Käse der','Kartoffel die, -n'],168,407,28)}{txt(168,634,315,'A: Erdapfel der, ¨','mSmall')}
 {vocab(['Kuchen der, -','das Stück Kuchen','Milch die','Obst das'],168,665,28)}{txt(168,780,315,'CH: Früchte (Pl)','mSmall')}
 {vocab(['Orange die, -n','Reis der','Sahne die'],168,811,28)}{txt(168,897,315,'A: Schlagobers der\nCH: Rahm der','mSmall')}
 {vocab(['Salat der, -e','Schinken der','Schokolade die, -n','Suppe die, -n','Tee der, -s','Tomate die, -n'],168,958,28)}{txt(168,1129,315,'A: Paradeiser der, -','mSmall')}{vocab(['Wurst die, ¨e','Zitrone die, -n','Zwiebel die, -n'],168,1160,28)}
 {txt(476,255,300,'Rund ums Essen','mTitle')}{vocab(['Durst der','Durst haben','Frühstück das, -e'],476,287,29)}{txt(476,376,300,'CH: auch: Morgenessen das','mSmall')}{vocab(['Hunger der','Hunger haben','Kühlschrank der, ¨e'],476,407,29)}{txt(476,496,300,'A: auch: Eiskasten der, ¨','mSmall')}
 {vocab(['essen, du isst, er isst','frühstücken','mögen, du magst, er mag','schmecken'],476,540,43)}{txt(476,713,300,'CH: fein sein','mSmall')}{vocab(['trinken'],476,744,29)}
 {txt(476,805,300,'Guten Appetit','mTitle')}{vocab(['Gleichfalls! / Ebenfalls!'],476,838,29)}
 {txt(476,916,300,'Weitere wichtige Wörter','mTitle')}{vocab(['Einladung die, -en','Speisekarte die, -n','Wochenende das, -n','möchten','kennen','etwas','erst','schon','ja, gern / ja, bitte ↔','nein, danke'],476,949,33)}
 {txt(168,1260,290,'Lernen Sie Wörter in Gruppen.','mTip mSmall')}{txt(230,1310,250,'die Orange     der Apfel\n          Obst\n        die Zitrone','mExample')}{open('eigene-gruppen',476,1306,309,65,'Eigene Wortgruppen')}
 {title('2',1410,'Welche Wörter möchten Sie noch lernen? Notieren Sie.','',132,650)}{open('eigene-woerter',168,1450,617,49,'Eigene Wörter')}
 </>}
 {page==='72'&&<>
 {head('WIEDERHOLUNGSSTATION: WORTSCHATZ')}{title('1',211,'Wie heißen die Tage?')}
 {txt(168,255,365,'a  Diese Tage beginnen mit einem M:','mSmall')}{txt(540,255,100,'Mittwoch','mExample')}{f('u1-a',648,253,191,'Weitere Tage mit M')}
 {txt(168,292,365,'b  Diese Tage haben 7 Buchstaben:','mSmall')}{f('u1-b',540,290,299,'Tage mit 7 Buchstaben')}
 {txt(168,329,365,'c  Diese Tage beginnen mit einem D:','mSmall')}{f('u1-c',540,327,299,'Tage mit D')}
 {rule('u1',168,367,()=>setMatches('u1-a',['Montag'])&&setMatches('u1-b',['Freitag','Samstag','Sonntag'])&&setMatches('u1-c',['Dienstag','Donnerstag']))}
 {title('2',428,'Wie geht es weiter? Ordnen Sie zu.')}{txt(168,470,670,'Mittag | halb sieben | Vormittag | immer | Nacht | Viertel vor sieben |\noft | Abend | Viertel nach sieben | Nachmittag | manchmal','mBank')}
 {txt(168,537,150,'a  nie – manchmal –','mSmall')}{f('u2-a1',325,535,128)}{txt(460,537,20,'–','mSmall')}{f('u2-a2',487,535,128)}
 {txt(168,576,75,'b  Morgen –','mSmall')}{['u2-b1','u2-b2','u2-b3','u2-b4','u2-b5'].map((id,i)=><span key={id}>{f(id,250+i*119,574,111)}{i<4&&txt(363+i*119,576,8,'–','mSmall')}</span>)}
 {txt(168,615,20,'c','mSmall')}{f('u2-c1',193,613,161)}{txt(359,615,10,'–','mSmall')}{f('u2-c2',375,613,161)}{txt(544,615,81,'– sieben –','mSmall')}{f('u2-c3',634,613,205)}{check('u2',168,652)}
 {title('3',713,'Was machen die Personen? Schreiben Sie.')}{txt(284,755,150,'Lösungswort','mSmall')}{f('u3-lw',435,753,169)}
 {[['u3-1',332,810,5,2],['u3-2',197,853,9,7],['u3-3',359,896,5,1],['u3-4',278,939,6,4],['u3-5',224,982,7,6]].map(([id,x,y,len,blue],i)=><span key={id}>{txt(Number(x)-26,Number(y)+3,20,''+(i+1),'mSmall')}{cross(String(id),Number(x),Number(y),Number(len),Number(blue))}</span>)}
 {art('paint',620,755,93,89)}{art('cigarette',729,755,98,84)}{art('pot',660,845,87,98)}{art('pool',737,885,107,105)}{art('food',603,970,133,65)}{check('u3',168,1038)}
 {title('4',1100,'Was passt nicht? Streichen Sie das falsche Wort durch.')}{strike('u4-a',168,1145,['Kuchen','Schokolade','Salat','Eis'],'Salat')}{strike('u4-b',168,1184,['Schinken','Sahne','Wurst','Braten'])}{strike('u4-c',520,1145,['Brötchen','Orange','Zitrone','Apfel'])}{strike('u4-d',520,1184,['Kartoffel','Tomate','Zwiebel','Käse'])}{rule('u4',168,1222,()=>v['u4-b']==='Sahne'&&v['u4-c']==='Brötchen'&&v['u4-d']==='Käse')}
 {title('5',1283,'Welcher Ort passt? Ordnen Sie zu.')}
 {[['a','cheche','Gehe am Samstag zur Ü30 Party. Tanz und Musik bis morgens.'],['b','Waldbad','Das Waldbad hat jetzt bis 20 Uhr geöffnet!'],['c','Krissy007','Bin heute in Ricks Café. Happy Hour ab 18 Uhr. Alle Cocktails nur 4,90 Euro.'],['d','sixtus','Neuer Film mit George Clooney! Wer geht am Donnerstagabend mit?'],['e','joschasauer','Ich besuche mit Michelle die Ausstellung „Picasso und Co“. Ist super!!']].map((r,i)=>{const y=1330+i*92;return <span key={r[0]}>{txt(168,y,20,r[0],'mSmall')}{<div className="mText" style={{left:193,top:Y(y)+28,width:515,fontSize:14}}><Words s={r[2]}/></div>}</span>})}
 <LineMatching id="u5match" left={['cheche','Waldbad','Krissy007','sixtus','joschasauer']} right={['Kino','Bar','Disco','Museum','Schwimmbad']} values={v} onMatch={set} leftX={193} rightX={714} leftWidth={510} rightWidth={160} ys={[1330,1422,1514,1606,1698].map(Y)} width={901} height={1275} fontSize={18} example={[0,2]}/>
 {rule('u5',168,1838,()=>[2,4,1,0,3].every((r,i)=>i===0||v['u5match-'+i]===''+r))}
 </>}
 {page==='73'&&<>
 {head('WIEDERHOLUNGSSTATION: GRAMMATIK')}{title('1',211,'Was macht Paul diese Woche? Schreiben Sie.')}
 {['MO','DI','MI','DO','FR','SA','SO'].map((s,i)=><div key={s} className="mWeekDay" style={{left:168+i*75,top:Y(253),width:75,height:116*sy}}><b>{s}</b><div><Words s={['20:30\nKino mit\nJan','Mittag:\nEssen mit\nPeter','Abend:\nTreffen\nJuliane','10:30\nMail\nschreiben','17:00\nTennis mit\nBen','11:00\nRad fahren\nmit Susi','lange\nschlafen ☺\nAbend:\nDVD sehen'][i]}/></div></div>)}
 {txt(710,253,130,'Am Montag geht\nPaul um halb neun\nmit Jan ins Kino.\nAm Dienstagmittag\n…','mExample')}{open('eigene-paul',168,432,671,46,'Pauls Woche')}
 {title('2',523,'Ergänzen Sie die Verben im Chat in der richtigen Form.')}
 <div className="mChatFrame" style={{left:168,top:Y(565),width:671,height:589*sy}}/>{txt(180,578,650,'CARLOS1704  Deutsche Freunde gesucht!','mUser')}{txt(180,615,650,'Hallo, ich bin Carlos aus Barcelona und ich spreche Englisch, Deutsch und natürlich\nSpanisch. Ich mag Sport. Und ihr? (sprechen)','mSmall')}
 {txt(180,682,650,'TS  Hallo Carlos! Ich bin Teresa aus Salzburg. Ich mache auch viel Sport und ich lese gern.','mSmall')}{f('u2-f1',180,718,110)}{txt(297,720,115,'du gern Ski?','mSmall')}{f('u2-f2',419,718,110)}{txt(536,720,300,'du auch gern Bücher? (fahren – lesen)','mSmall')}
 {txt(180,764,177,'CARLOS1704  Nein, ich','mSmall')}{f('u2-f3',364,762,110)}{txt(481,764,355,'keine Bücher. Tut mir leid ☹. Aber ich habe DVDs.','mSmall')}{f('u2-f4',180,801,110)}{txt(297,803,535,'du auch gern Filme? (lesen – sehen)','mSmall')}
 {txt(180,847,650,'TS  Jaaaaaa, sehr gern. Ich habe nicht viele DVDs. Aber ich gehe oft mit Freunden ins\nKino. Wo','mSmall')}{f('u2-f5',256,880,110)}{txt(373,882,464,'du denn deine Freunde? Auf dem Sofa zu Hause mit vielen','mSmall')}{txt(180,917,650,'DVDs ☺? (treffen)','mSmall')}{txt(180,960,650,'CARLOS1704  … ☹','mUser')}
 {txt(180,1003,190,'TS  Entschuldigung. Hey,','mSmall')}{f('u2-f6',377,1001,110)}{txt(494,1003,342,'du jetzt nicht mehr mit mir? (sprechen)','mSmall')}{txt(180,1055,650,'CARLOS1704  Doch, Teresa, natürlich. Sorry.','mSmall')}{check('u2',168,1164)}
 {title('3',1226,'Schreiben Sie Sätze. Beginnen Sie mit dem markierten Wort.')}
 {txt(168,1270,345,'a  Am Samstag möchte ich gern in die Disco gehen.','mExample')}{bank(1268,'gehen – am Samstag – in die Disco –\nich – möchten – gern','am Samstag')}{bank(1330,'du – kommen – können – auch','können')}{open('u3-b',193,1310,315,46,'3b Satz mit Können')}
 {bank(1374,'ich – leider – können – kommen – nicht','leider')}{open('u3-c',193,1371,315,46,'3c Satz mit Leider')}{bank(1435,'ich – am Wochenende – fahren – nach Wien','am Wochenende')}{open('u3-d',193,1432,315,46,'3d Satz mit Am Wochenende')}{check('u3',168,1484)}
 {title('4',1546,'Ergänzen Sie die Verben.')}{txt(168,1588,670,'möchte | magst | Möchtest | magst','mBank')}{txt(168,1630,670,'a  ▪ Magst du auch einen Orangensaft?','mSmall')}{txt(193,1667,100,'▴ Nein danke. Ich','mSmall')}{f('u4-a2',300,1665,142)}{txt(449,1667,390,'jetzt nichts trinken.','mSmall')}
 {txt(168,1704,190,'b  ▪ Hallo Emma, du','mSmall')}{f('u4-b1',365,1702,112)}{txt(484,1704,355,'doch die Gruppe Wise Guys, oder?','mSmall')}{txt(193,1741,646,'▴ Ja klar. Warum?','mSmall')}{txt(193,1778,646,'▪ Ich habe für das Konzert am Freitag zwei Tickets und Christian hat keine Zeit.','mSmall')}{f('u4-b2',193,1813,142)}{txt(342,1815,497,'du mitkommen?','mSmall')}{txt(193,1852,646,'▴ Sehr gern! Super!','mSmall')}{check('u4',168,1900,{'u4-a2':'möchte','u4-b1':'magst','u4-b2':'Möchtest'})}
 </>}
 {txt(Number(page)%2?704:48,1254,Number(page)%2?190:400,(Number(page)%2?'':'Modul 3   ')+page+' | '+({'71':'einundsiebzig','72':'zweiundsiebzig','73':'dreiundsiebzig'} as Record<string,string>)[page]+(Number(page)%2?'  Modul 3':''),'mFooter')}
 </div><audio className="nabPlayer" ref={audio} controls hidden aria-label="Originalaudio Arbeitsbuch"/></div>;
}
