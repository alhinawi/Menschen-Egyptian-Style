import {CheckButton} from '../components/CheckButton';
import {PageImage} from '../components/PageImage';
import {usePageReset} from '../exercises/usePageReset';
import {LineMatching} from '../exercises/LineMatching';
import {scanData} from '../scan-data/registry';
import {useLayoutEffect,useRef,useState} from 'react';
import './native-ab11.css';
const norm=(s:string)=>s.normalize('NFC').toLocaleLowerCase('de').trim().replace(/[.,!?;:’']/g,'').replace(/\s+/g,' ');
function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\S/.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-phrase={text} data-word={w.replace(/^[.,!?„"()]+|[.,!?“"()]+$/g,'')}>{w}</span>:w)}</>}
export function NativeAB11Next({page}:{page:string}){
 const key='native-ab11-'+page, host=useRef<HTMLDivElement>(null);
 const audio=useRef<HTMLAudioElement>(null);const [,T]=useState('');
 const [scale,SS]=useState(1),[v,S]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}}),[graded,G]=useState<Record<string,boolean>>({}),[active,A]=useState('');
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const measure=()=>SS(Math.min(el.clientWidth/1075,el.clientHeight/1521));measure();const ro=new ResizeObserver(measure);ro.observe(el);return ()=>ro.disconnect()},[]);
 usePageReset(page,'native-ab11-'+page,()=>{S({});G({});A('')});
 const set=(id:string,value:string)=>{const n={...v,[id]:value};S(n);localStorage.setItem(key,JSON.stringify(n));const group=id.startsWith('stress-')?'ua1':id.startsWith('ua2')?'ua2':page==='7'&&id.startsWith('6-')?'6a':page==='9'&&id.startsWith('1-')?(id.startsWith('1-q')?'1a':'1b'):id.startsWith('mark-')?id.split('-')[1]:id.split('-')[0];G(prev=>{const next={...prev};delete next[group];return next})};
 const py=(y:number)=>page==='18'?y:page==='12'?y*.93:page==='13'?y*.94:page==='15'?y*.94:page==='19'?y*.94:y;
 const text=(x:number,y:number,w:number,s:string,cls='')=><div className={'nabText '+cls} style={{left:x,top:cls==='nabFooter'?y:py(y),width:w}}><Words text={s}/></div>;
 const img=(name:string,x:number,y:number,w:number,h:number)=><PageImage className={'nabArt '+(page==='13'&&name==='pronouns'?'nabPronouns':'')} src={`assets/native-ab11/p${page}-${name}.png`} alt={'Originalabbildung '+name} style={{left:x,top:py(y),width:w,height:h}}/>;
 const field=(id:string,x:number,y:number,w:number,label:string,cls='')=>{const measure=document.createElement('canvas').getContext('2d');if(measure)measure.font="22px 'Times New Roman'";const measured=measure?.measureText(v[id]||'').width||0;const fontSize=measured>w-6?Math.max(12,22*(w-6)/measured):22;const mark=(v['mark-'+id]||'').split(':').map(Number);let gradient='none';if(mark.length===2){const ctx=document.createElement('canvas').getContext('2d');if(ctx){ctx.font="22px 'Times New Roman'";const start=3+ctx.measureText((v[id]||'').slice(0,mark[0])).width,end=3+ctx.measureText((v[id]||'').slice(0,mark[1])).width;gradient=`linear-gradient(to right, transparent ${start}px, #ffea54 ${start}px, #ffea54 ${end}px, transparent ${end}px)`}}return <input className={'nabInput '+cls+(' nabEnding')} style={{left:x,top:py(y),width:w,'--ending-mark':gradient,'--native-input-size':fontSize+'px'} as React.CSSProperties} aria-label={label} title={id.startsWith('10-')?'Endung markieren: Buchstaben im Eingabefeld auswählen':undefined} data-native-field={id} value={v[id]||''} onChange={e=>set(id,e.target.value)} onSelect={e=>{{const t=e.currentTarget;if(t.selectionStart!==t.selectionEnd)set('mark-'+id,t.selectionStart+':'+t.selectionEnd)}}}/>};
 const open=(id:string,x:number,y:number,w:number,h:number,label:string)=><textarea className="nabInput nabOpen" style={{left:x,top:py(y),width:w,height:h,'--native-open-height':h+'px'} as React.CSSProperties} aria-label={label} data-native-field={id} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const choice=(id:string,value:string,x:number,y:number,label:string)=><input type="radio" data-value={value} data-native-radio={page==='15'&&id==='ua2'?(value==='fixed'?'ua2-r1':'ua2-r2'):undefined} className="nabRadio" style={{left:x,top:py(y)}} name={key+'-'+id} aria-label={label} checked={v[id]===value} onChange={()=>set(id,value)}/>;
 const listen=(n:string,x:number,y:number,t?:string)=><button className="nabListen" data-task={t} style={{left:x,top:py(y)}} aria-label={'Originalaudio 1 '+n} onClick={()=>{T(n);if(audio.current){audio.current.src='assets/ab-cd1-track'+n.padStart(2,'0')+'.mp3';audio.current.play().catch(()=>{})}}}>▶ 1 {n}</button>;
 const checkRule=(id:string,x:number,y:number,validate:()=>boolean)=><div className="nabCheck" style={{left:x,top:py(y)}} data-native-task={id}><CheckButton onClick={()=>G({...graded,[id]:validate()})}></CheckButton><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="nabCheck" style={{left:x,top:py(y)}} data-native-task={id}><CheckButton answers={answers} onClick={()=>G({...graded,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}></CheckButton><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const title=(n:string,y:number,s:string,kb:string,side='Strukturen')=><>{text(130,y+7,40,kb,'nabKB')}<div className="nabNumber" style={{left:170,top:py(y)}}>{n}</div>{text(212,y,810,s,'nabTitle')}<div className="nabSide" style={{left:141,top:py(y+45)}}>{side}</div></>;
 const head=(s:string)=><>{text(160,142,750,s,'nabHeader')}<div className="nabHeaderLine"/></>;
 const data=scanData['ab-a11:'+page];
 const endingStyle=(id:string)=>{const m=(v['mark-'+id]||'').split(':').map(Number),ctx=document.createElement('canvas').getContext('2d');if(m.length!==2||!ctx)return {};ctx.font="20px 'Times New Roman'";const a=4+ctx.measureText((v[id]||'').slice(0,m[0])).width,b=4+ctx.measureText((v[id]||'').slice(0,m[1])).width;return {backgroundImage:`linear-gradient(to right,transparent ${a}px,#fff066 ${a}px,#fff066 ${b}px,transparent ${b}px)`}};
 const keyAnswers=(group:string)=>Object.fromEntries(data.fields.filter(f=>f.group===group&&f.answer!==undefined&&f.kind!=='radio').map(f=>[f.id,f.answer!]));
 const checkGroup=(group:string,x:number,y:number)=>check(group,x,y,keyAnswers(group));
 const match=(id:string,left:string[],right:string[],x:number,y:number,rx:number,gap:number,example?:[number,number])=><LineMatching id={id} left={left} right={right} values={v} onMatch={set} leftX={x} rightX={rx} leftWidth={id==='lesen1'?260:230} rightWidth={440} ys={left.map((_,i)=>py(y+i*gap))} rightYs={right.map((_,i)=>py(y+i*gap))} example={example}/>;
 const multi=(id:string,x:number,y:number,w:number,h:number,label:string)=>open(id,x,y,w,h,label);
 return <div className="nativeAB11 nativeAB11Next" ref={host} data-native-ab11-page={page}><div className="nabCanvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='12'&&<>
 {img('banner',55,107,330,79)}<div className="nabBanner" style={{left:385,top:107,width:613,height:79}}/>{text(473,128,520,'Ich bin Journalistin.','nabCoverTitle')}
 {title('1',248,'Berufe','KB 2b','Wörter')}{text(171,288,600,'a  Ordnen Sie zu.','nabTitle')}{text(209,328,760,'Architektin | Ärztin | Lehrer | Schauspieler | Sekretärin | Verkäufer','nabBank')}
 {[['architect',202,94],['teacher',342,94],['actor',482,94],['seller',622,94],['secretary',762,87],['doctor',902,94]].map(([name,x,w],i)=><div key={String(name)}>{img(String(name),Number(x),365,Number(w),80)}{i===0?text(Number(x),452,130,'Architektin','nabExample'):field('u1a-'+(i+1),Number(x),452,105,'1a Foto '+(i+1))}</div>)}
 {checkGroup('u1a',202,489)}
 {text(171,527,850,'b  Wie heißen die Berufe auf Deutsch und in Ihrer Sprache? Ergänzen und vergleichen Sie.','nabTitle')}
 <div className="nabForeignTable" style={{left:208,top:py(568),width:795}}><b>Deutsch</b><b>Englisch</b><b>Meine Sprache oder andere Sprachen</b>{['IT specialist','journalist','architect','student','secretary',''].map((label,i)=><div className="nabForeignRow" key={i}>{i===0?<span className="nabExample">IT-Spezialist</span>:<input aria-label={'1b Deutsch '+(label||'eigener Beruf')} data-native-field={i<5?'u1b-'+label:'u1b-own'} value={v[i<5?'u1b-'+label:'u1b-own']||''} onChange={e=>set(i<5?'u1b-'+label:'u1b-own',e.target.value)}/>}<span>{label}</span><input aria-label={'1b meine Sprache '+i} value={v['own-language-'+i]||''} onChange={e=>set('own-language-'+i,e.target.value)}/></div>)}</div>
 {checkGroup('u1b',202,777)}
 {title('2',817,'Ordnen Sie zu.','KB 2c')}
 {match('u2',['a  Ich arbeite als','b  Frau Stern arbeitet bei','c  Katharina hat','d  Peter macht','e  Herr Wagner ist'],['Siemens.','eine Ausbildung als Mechatroniker bei Airbus.','einen Job als Kellnerin.','Ingenieur von Beruf.','Friseurin.'],209,858,590,26,[0,4])}
 {check('u2',202,995,{'u2-1':'0','u2-2':'2','u2-3':'1','u2-4':'3'})}
 {title('3',1034,'Ordnen Sie zu.','KB 2c','Wörter')}{text(209,1074,730,'arbeite | habe | mache | mache | bin | bin','nabBank')}{text(209,1112,450,'Was machst du beruflich?')}
 {text(209,1142,370,'a  Ich mache eine Ausbildung als')}{text(232,1168,300,'Krankenschwester.')}
 {text(209,1197,56,'b  Ich')}{field('u3-b',270,1194,104,'3b bin')}{text(380,1197,170,'Schülerin.')}
 {text(209,1227,56,'c  Ich')}{field('u3-c',270,1224,104,'3c bin')}{text(380,1227,230,'Historikerin von Beruf.')}
 {text(607,1142,56,'d  Ich')}{field('u3-d',669,1139,104,'3d mache')}{text(779,1142,260,'ein Praktikum bei Vestas.')}
 {text(607,1172,56,'e  Ich')}{field('u3-e',669,1169,104,'3e arbeite')}{text(779,1172,230,'als Journalistin.')}
 {text(607,1202,56,'f  Ich')}{field('u3-f',669,1199,104,'3f habe')}{text(779,1202,260,'einen Job als Verkäufer.')}
 {checkGroup('u3',202,1260)}
 {title('4',1300,'Ordnen Sie zu.','KB 3a','Wörter')}{text(209,1337,825,'geschieden | leben | Single | verheiratet | nicht verheiratet | zwei Kinder','nabBank')}
 {img('status',650,1371,425,82)}
 {text(209,1376,345,'a  Stefan und Tanja sind verheiratet.')}{text(209,1405,123,'b  Sie haben')}{field('u4-b',339,1402,280,'4b Kinder')}
 {text(209,1435,230,'c  Maike und Martin sind')}{field('u4-c',445,1432,175,'4c Familienstand')}
 {text(209,1465,133,'d  Maria ist')}{field('u4-d',347,1462,190,'4d Familienstand')}
 {text(209,1494,226,'e  Tom und Klara sind')}{field('u4-e1',438,1490,225,'4e Familienstand')}{text(670,1494,90,', aber sie')}{field('u4-e2',767,1490,136,'4e leben')}{text(909,1494,155,'zusammen.')}
 {checkGroup('u4',202,1525)}
 </>}
 {page==='13'&&<>
 {head('BASISTRAINING')}<div className="nabModule">2</div>
 {title('5',228,'Alles falsch. Was ist richtig?','KB 3b')}{img('couple',202,276,128,184)}
 {text(344,276,120,'Sandra und\nStefan,\nDeutschland,\nSingles, leben\nzusammen,\nSabine:\nKellnerin,\nMichael: bei\nSany','nabSmall')}
 {text(478,277,520,'Das sind Sabine und Michael. Sie kommen aus Österreich. Sie sind verheiratet. Sie leben allein. Sabine arbeitet als Verkäuferin und Michael arbeitet bei Telespeak.','nabWrap')}
 {text(478,366,250,'Falsch','nabBold')}{text(748,366,250,'Richtig','nabBold')}{text(478,399,270,'Das sind nicht Sabine und Michael.\nSie kommen nicht aus ...','nabExample nabSmall')}{text(748,399,250,'Das sind Sandra und Stefan.','nabExample nabSmall')}
 {multi('u5-r2',748,436,249,48,'5 Weitere Korrektur')}{checkGroup('u5',478,489)}
 {title('6',529,'Ordnen Sie zu.','KB 3b','Wörter')}{text(264,566,410,'ich | er | sie | wir | sie','nabBank')}
 {img('pronoun1',202,597,90,135)}{img('pronoun2',342,625,116,128)}{img('pronoun3',486,583,121,118)}{img('pronoun4',626,625,121,133)}{img('pronoun5',798,625,184,157)}
 {field('u6-1',235,647,46,'6 Bild 1')}{text(389,655,45,'er','nabExample')}{field('u6-3',522,611,44,'6 Bild 3')}{field('u6-4',663,671,51,'6 Bild 4')}{field('u6-5',847,644,50,'6 Bild 5')}
 {checkGroup('u6',202,773)}
 {title('7',806,'Was ist richtig? Kreuzen Sie an.','KB 3b')}
 {text(209,846,355,'a  Svenja und Torben sind verheiratet.')}{text(579,846,360,'☑  Sie    ◯  Ich    haben keine Kinder.')}
 {text(209,876,240,'b  Herr Peters lebt allein.')}{choice('u7-b','Er',464,872,'7b Er')}{text(497,876,40,'Er')}{choice('u7-b','Sie',545,872,'7b Sie')}{text(578,876,280,'Sie   ist geschieden.')}
 {text(209,906,210,'c  Melanie ist Single.')}{choice('u7-c','Sie',420,902,'7c Sie')}{text(453,906,42,'Sie')}{choice('u7-c','Ich',503,902,'7c Ich')}{text(536,906,270,'Ich   lebt allein.')}
 {text(209,936,235,'d  Ich habe zwei Kinder.')}{choice('u7-d','Sie',456,932,'7d Sie')}{text(489,936,42,'Sie')}{choice('u7-d','Er',539,932,'7d Er')}{text(572,936,330,'Er   heißen Finn und Mika.')}
 {check('u7',202,970,{'u7-b':'Er','u7-c':'Sie','u7-d':'Sie'})}
 {title('8',1010,'Ergänzen Sie und markieren Sie die Endungen.','KB 3d','Strukturen entdecken')}
 <div className="nabConjugation" style={{left:209,top:py(1050)}}><b/><>{['machen','leben','wohnen','arbeiten','haben','sein'].map(s=><b key={s}>{s}</b>)}</>{['ich','du','er/sie','wir','ihr','sie/Sie'].map((s,r)=><div className="nabConjRow" key={s}><span>{s}</span>{['machen','leben','wohnen','arbeiten','haben','sein'].map((verb,c)=>{const given=({ '0-0':'mache','1-3':'arbeitest','1-4':'hast','2-0':'macht','2-3':'arbeitet','2-4':'hat','2-5':'ist','3-1':'leben','4-2':'wohnt','5-2':'wohnen','5-5':'sind'} as Record<string,string>)[r+'-'+c],id='u8-'+['ich','du','ersie','wir','ihr','sieSie'][r]+'-'+verb;return given?<span key={verb}>{given}</span>:<input key={verb} data-native-field={id} aria-label={'8 '+s+' '+verb} value={v[id]||''} onChange={e=>set(id,e.target.value)} onSelect={e=>{const t=e.currentTarget;if(t.selectionStart!==t.selectionEnd)set('mark-'+id,t.selectionStart+':'+t.selectionEnd)}} style={endingStyle(id)} className={v['mark-'+id]?'hasEnding':''}/>})}</div>)}</div>
 {checkGroup('u8',202,1256)}
 {title('9',1307,'Ergänzen Sie die Verben in der richtigen Form.','KB 3d')}
 {text(209,1336,760,'a  Was machst (machen) du beruflich?')}
 {text(209,1364,53,'b  Ich')}{field('u9-b1',268,1361,110,'9b sein')}{text(384,1364,200,'(sein) Studentin und')}{field('u9-b2',592,1361,110,'9b haben')}{text(709,1364,350,'(haben) einen Job als Verkäuferin.')}
 {text(209,1392,51,'c  Wo')}{field('u9-c',268,1389,110,'9c wohnen')}{text(384,1392,410,'(wohnen) ihr?')}
 {text(209,1420,56,'d  Wir')}{field('u9-d',268,1417,110,'9d wohnen')}{text(384,1420,500,'(wohnen) in Dortmund.')}
 {text(209,1448,56,'e  Wir')}{field('u9-e1',268,1445,110,'9e leben')}{text(384,1448,236,'(leben) zusammen und')}{field('u9-e2',628,1445,110,'9e haben')}{text(744,1448,290,'(haben) ein Kind.')}
 {text(209,1476,56,'f  Wer')}{field('u9-f1',278,1473,110,'9f sein 1')}{text(394,1476,215,'(sein) das? - Das')}{field('u9-f2',611,1473,110,'9f sein 2')}{text(728,1476,330,'(sein) Joachim und Philipp.')}
 {text(209,1504,169,'g  Niklas und Felix')}{field('u9-g',385,1501,110,'9g arbeiten')}{text(502,1504,390,'(arbeiten) bei Hansebek.')}
 {checkGroup('u9',202,1538)}
 </>}
 {page==='14'&&<>
 {head('BASISTRAINING')}
 {title('10',238,'Markieren Sie und notieren Sie die Zahlen.','KB 4','Wörter')}
 <div className="nabNumberSnake" style={{left:202,top:282,width:780}}>{['neunzehn','fünfundachtzig','zwanzig','sechsunddreißig','acht','drei','siebenundsiebzig','sechzehn','neun','dreiundzwanzig'].map((s,i)=><span key={s}><button className={i===0||v['number-'+i]?'marked':''} onClick={()=>set('number-'+i,v['number-'+i]?'':'true')} aria-label={'10 Zahl markieren '+s}>{s}</button>{i===5?<br/>:null}</span>)}</div>
 {text(202,340,50,'19,','nabExample')}{field('u10-zahlen',252,337,600,'10 Zahlen notieren')}{checkGroup('u10',202,381)}
 {title('11',422,'Wie ist die Telefonnummer? Hören Sie und kreuzen Sie an.','KB 4','Wörter')}{listen('08',112,460,'11')}
 {['030 / 52 79 91 36','0171 / 85 67 03 25','06391 / 32 44 67','08233 / 25 38 57'].map((s,i)=><div key={s}>{text(202,470+i*31,24,String.fromCharCode(97+i))}{choice('u11-'+i,'l',231,466+i*31,'11'+String.fromCharCode(97+i)+' links')}{text(266,470+i*31,210,s)}{choice('u11-'+i,'r',495,466+i*31,'11'+String.fromCharCode(97+i)+' rechts')}{text(530,470+i*31,250,['030 / 52 79 91 63','0171 / 58 67 02 25','06391 / 32 44 57','08233 / 52 36 59'][i])}</div>)}
 {check('u11',202,604,{'u11-0':'r','u11-1':'l','u11-2':'r','u11-3':'r'})}
 {title('12',655,'Rechenaufgaben','KB 5','Wörter')}{text(171,694,790,'a  Lesen Sie laut und ergänzen Sie.','nabTitle')}{text(737,649,230,'Fünfzehn und\nsiebenunddreißig\nist ...','nabSpeech')}
 {['fünfzehn + siebenunddreißig','sechsundfünfzig + acht','dreiunddreißig + neun','fünfundzwanzig + siebenundsechzig'].map((s,i)=><div key={s}>{text(202,739+i*31,420,String.fromCharCode(97+i)+'  '+s+' =')}{field('u12-'+String.fromCharCode(97+i),635,736+i*31,282,'12'+String.fromCharCode(97+i)+' Ergebnis')}</div>)}
 {checkGroup('u12',202,875)}
 {text(171,917,835,'b  Schreiben Sie eigene Aufgaben wie in a und tauschen Sie mit Ihrer Partnerin /\nIhrem Partner.','nabTitle')}{multi('eigene-aufgaben',202,973,715,54,'12b eigene Rechenaufgaben')}
 {title('13',1070,'Lesen Sie das Porträt und beantworten Sie die Fragen.','KB 7','Lesen')}
 {text(214,1114,580,'Ich heiße Marie Durant und komme aus Luxemburg. Momentan lebe ich in Heidelberg. Ich arbeite hier als Journalistin. Ich bin nicht verheiratet, aber ich lebe mit meinem Partner zusammen. Er heißt Steven und ist zurzeit arbeitslos. Wir haben ein Kind. Julie ist jetzt schon 3 Jahre alt.','nabWrap nabReading')}{img('marie',814,1098,176,156)}
 {['Was ist Marie Durant von Beruf?','Was macht Steven beruflich?','Sind Marie und Steven verheiratet?','Marie und Steven haben zwei Kinder.','Wo wohnen Marie und Steven?','Wie alt ist Julie?'].map((s,i)=>{const x=[554,517,585,600,545,393][i],y=1280+i*29;return <div key={s}>{text(209,y,420,String.fromCharCode(97+i)+'  '+s)}{i===2||i===3?text(x,y,55,'Nein,','nabExample'):null}{field('u13-'+String.fromCharCode(97+i),x+(i===2||i===3?60:0),y-3,995-x-(i===2||i===3?60:0),'13'+String.fromCharCode(97+i)+' Antwort')}</div>})}
 {checkGroup('u13',202,1460)}
 </>}
 {page==='15'&&<>
 {head('TRAINING: LESEN')}<div className="nabModule">2</div>
 {title('1',235,'Angaben zur Person. Was passt zusammen? Verbinden Sie.','','')}
 {match('lesen1',['Was studieren Sie?','Sind Sie verheiratet?','Wie alt sind Sie?','Was machen Sie beruflich?','Wie heißen Sie?','Woher kommen Sie?'],['Alter','Herkunft','Ausbildung','Familienstand','Name','Beruf'],192,279,540,26,[0,2])}
 {check('lesen1',202,447,{'lesen1-1':'3','lesen1-2':'0','lesen1-3':'5','lesen1-4':'4','lesen1-5':'1'})}
 {title('2',488,'Lesen Sie die Texte und ergänzen Sie die Steckbriefe.','','')}
 {['j','f'].map((prefix,i)=>{const x=190+i*300;return <div key={prefix}><div className={'nabProfile '+(i?'yellow':'')} style={{left:x,top:py(529),width:263,height:240}}><div>STECKBRIEF</div></div>{['Name','Alter','Herkunft','Ausbildung','Beruf','Arbeitgeber','Familienstand','Kinder'].map((s,r)=>{const yy=568+r*25,given=prefix==='j'?({'Name':'Julia','Ausbildung':'studiert Medizin','Beruf':'Studentin'} as Record<string,string>)[s]:({'Ausbildung':'Studium','Kinder':'keine'} as Record<string,string>)[s],id='u2-'+prefix+'-'+({'Name':'name','Alter':'alter','Herkunft':'herkunft','Ausbildung':'ausbildung','Beruf':'beruf','Arbeitgeber':'arb','Familienstand':'fam','Kinder':'kind'} as Record<string,string>)[s];return <div key={s}>{text(x+10,yy,140,s+':',s==='Familienstand'?'nabCardLabel':'nabSmall')}{given?text(x+110,yy,147,given,'nabExample nabSmall'):s==='Arbeitgeber'&&prefix==='j'?<>{field('u2-j-arb1',x+110,yy-3,67,'2 Julia Arbeitgeber 1')}{text(x+178,yy,10,'/')}{field('u2-j-arb2',x+191,yy-3,64,'2 Julia Arbeitgeber 2')}</>:field(id,x+110,yy-3,145,'2 '+prefix+' '+s)}</div>})}</div>})}
 {text(801,534,195,'Lesen Sie zuerst\ndie Aufgabe genau.\nMarkieren Sie\ndann die wichtigen\nStellen im Text.','nabTip')}
 {text(202,811,720,'1   Das ist Julia. Sie ist 24 Jahre alt und studiert Medizin an der Universität in München. Aber sie kommt aus England. Julia ist mit Frank verheiratet. Sie haben keine Kinder.','nabWrap nabReading')}{img('julia',905,790,96,125)}
 {text(202,923,720,'2   Frank ist 28 Jahre alt und kommt aus Österreich. Er ist mit Julia verheiratet und arbeitet als Ingenieur bei BMW. Jetzt lebt er schon zwei Jahre in München.','nabWrap nabReading')}{img('frank',940,920,89,116)}
 {checkGroup('u2',202,1035)}
 {text(160,1080,520,'TRAINING: AUSSPRACHE','nabHeader')}{text(555,1090,280,'Wortakzent','nabExample')}
 {title('1',1140,'Welche Silbe ist betont? Hören Sie und markieren Sie den Wortakzent.','','')}{listen('09',112,1143,'1')}
 <div className="nabStress" style={{left:202,top:py(1180),width:810}}>{['Student','Journalist','Ingenieur','Schauspieler','Arzt','Lehrer','Verkäufer','Kellner','Friseur','Schüler','Krankenschwester'].map((word,i)=><span key={word}><button onClick={()=>A(active===word?'':word)} aria-label={'Wortakzent '+word} className={active===word?'isActive':''}>{word.split('').map((char,j)=><span key={j} className={v['stress-'+word]===''+j?'stressMark':''}>{char}</span>)}</button>{i<10?' - ':''}</span>)}</div>
 {page==='15'&&['Student','Journalist','Ingenieur','Schauspieler','Arzt','Lehrer','Verkäufer','Kellner','Friseur','Schüler','Krankenschwester'].includes(active)&&<div className="nabStressChooser" style={{left:202,top:py(1055),width:800}}><b>Betonten Vokal wählen: {active}</b><button aria-label="Wortakzent schließen" onClick={()=>A('')}>×</button><div>{active.split('').map((c,j)=><button key={j} data-stress-letter={active+'-'+j} onClick={()=>{set('stress-'+active,''+j);A('')}}>{c}</button>)}</div></div>}
 {checkRule('ua1',202,1252,()=>Object.entries({Student:[4],Journalist:[7],Ingenieur:[5,6,7],Schauspieler:[3,4],Arzt:[0],Lehrer:[1],Verkäufer:[4,5],Kellner:[1],Friseur:[4,5],Schüler:[3],Krankenschwester:[2]}).every(([word,letters])=>letters.includes(Number(v['stress-'+word]??-1))))}
 {title('2',1292,'Ordnen Sie die Wörter aus 1 zu und kreuzen Sie dann an: Was ist richtig?','','')}
 <div className="nabStressTable" style={{left:202,top:py(1334),width:576,height:125}}>{['Silbe 1   ▰ ▱ ▱','Silbe 2   ▱ ▰ ▱','letzte Silbe   ▱ ▱ ▰'].map((s,i)=><div key={s}><b>{s}</b><span className="nabExample">{['Arzt','Student',''][i]}</span><textarea data-native-field={'ua2-s'+(i+1)} aria-label={'Wortakzent '+s} value={v['ua2-s'+(i+1)]||''} onChange={e=>set('ua2-s'+(i+1),e.target.value)}/></div>)}</div>
 {text(801,1337,226,'Der Wortakzent ist','nabBold nabSmall')}{choice('ua2','fixed',806,1364,'Wortakzent immer auf Silbe 2')}{text(839,1368,210,'immer auf Silbe 2.','nabSmall')}{choice('ua2','flexibel',806,1394,'Wortakzent flexibel')}{text(839,1398,225,'flexibel. Den richtigen\nWortakzent findet man\nim Wörterbuch.','nabSmall')}
 {checkRule('ua2',202,1470,()=>{const expected=[['Schauspieler','Lehrer','Kellner','Schüler','Krankenschwester'],['Verkäufer','Friseur'],['Journalist','Ingenieur']];return expected.every((list,i)=>{const actual=(v['ua2-s'+(i+1)]||'').split(/[,;\n]+/).map(norm).filter(Boolean);return actual.length===list.length&&list.every(w=>actual.includes(norm(w)))})&&v.ua2==='flexibel'})}
 {title('3',1512,'Hören Sie die Berufe aus 1 noch einmal und sprechen Sie nach.','','')}{text(212,1539,760,'Achten Sie auf den Wortakzent.','nabTitle')}{listen('10',112,1515,'3')}
 </>}
 {page==='16'&&<>
 {head('TEST')}
 {title('1',234,'Ordnen Sie zu.','','Wörter')}{text(202,274,805,'Alter | Wohnort | Beruf | Herkunft | Name | Arbeitgeber | Familienstand','nabBank')}
 {['Name','Wohnort','Herkunft','Alter'].map((s,i)=><div key={s}>{text(202,315+i*27,20,String.fromCharCode(97+i))}{i===0?text(227,315,174,'Name','nabExample'):field('u1-'+String.fromCharCode(97+i),227,312+i*27,174,'1'+String.fromCharCode(97+i))}{text(424,315+i*27,220,['Maria Oberhuber','83026 Rosenheim','Deutschland','33 Jahre'][i])}</div>)}
 {['verheiratet','Lehrerin','„Sprachschule\nRosenheim“'].map((s,i)=><div key={s}>{text(625,315+i*27,20,String.fromCharCode(101+i))}{field('u1-'+String.fromCharCode(101+i),650,312+i*27,174,'1'+String.fromCharCode(101+i))}{text(848,315+i*27,185,s)}</div>)}{checkGroup('u1',202,418)}
 {title('2',458,'Ergänzen Sie die Zahlen.','','Wörter')}
 {['neunundneunzig','vierundfünfzig','fünfundvierzig','fünfzehn','fünfzig'].map((s,i)=>{const x=i<3?202:625,y=501+(i<3?i:i-3)*28;return <div key={s}>{text(x,y,228,String.fromCharCode(97+i)+'  '+s)}{i===0?text(x+253,y,60,'99','nabExample'):field('u2-'+String.fromCharCode(97+i),x+253,y-3,65,'2'+String.fromCharCode(97+i))}</div>})}{checkGroup('u2',202,590)}
 {title('3',630,'Wie heißen die Berufe?','','Wörter')}{text(202,670,825,'Kran | cha | Schau | tin | schwes | ter | Stu | rin | ni | spie | fe | ken | Me | käu | ker | ler | den | Ver | tro','nabBank')}
 {text(202,714,145,'a  Verkäuferin','nabExample')}{['b','c','d','e'].map((s,i)=><div key={s}>{text(350+i*165,714,20,s)}{field('u3-'+s,373+i*165,711,133,'3'+s+' Beruf')}</div>)}
 {checkRule('u3',202,750,()=>{const words=['b','c','d','e'].map(s=>norm(v['u3-'+s]||''));return words.length===new Set(words).size&&['Krankenschwester','Schauspieler','Studentin','Mechatroniker'].every(s=>words.includes(norm(s)))})}
 {title('4',790,'Ergänzen Sie.','','Strukturen')}
 {text(202,830,390,'a  ▪ Wo studiert (studieren) er?\n     In Hamburg?\n   ▴ Nein, er studiert nicht in Hamburg.','nabSmall')}
 {text(202,922,260,'b  ▪ Alina und Rainer, wo')}{field('u4-b-v',470,919,128,'4b wohnen')}{text(226,951,385,'(wohnen) ihr? In München?')}{text(226,980,40,'Ja,')}{field('u4-b-a',267,977,330,'4b Antwort')}
 {text(202,1023,130,'c  ▪ Wie alt')}{field('u4-c-v',338,1020,105,'4c sein')}{text(450,1023,190,'(sein) Sie? 35?')}{text(226,1052,92,'Nein, ich')}{field('u4-c-a',322,1049,276,'4c Antwort')}
 {text(625,830,71,'d  ▪ Wo')}{field('u4-d-v',702,827,190,'4d arbeiten')}{text(898,830,143,'(arbeiten)')}{text(650,859,300,'du? Bei Siemens?')}{text(650,888,70,'Ja, ich')}{field('u4-d-a',729,885,295,'4d Antwort')}
 {text(625,937,102,'e  ▪ Woher')}{field('u4-e-v',730,934,112,'4e kommen')}{text(849,937,180,'(kommen) Simon')}{text(650,966,390,'und Selina? Aus der Schweiz?')}{text(650,995,90,'Nein, sie')}{multi('u4-e-a',745,992,278,65,'4e Antwort')}
 {checkGroup('u4',202,1095)}
 {title('5',1135,'Welche Antwort passt? Kreuzen Sie an.','','Kommunikation')}
 {['Wo arbeitest du?','Und woher kommen Sie?','Was machen Sie gerade?','Wie alt sind die Kinder?','Wo arbeiten Sie?'].map((s,i)=>{const x=i<2?202:i<4?492:829,y=1175+(i%2&&i<4?121:0);return <div key={s}>{text(x,y,i===4?215:310,String.fromCharCode(97+i)+'  ▪  '+s,'nabSmall')}{[0,1].map(j=><div key={j}>{choice('u5-'+i,''+j,x+29,y+28+j*41,'5'+String.fromCharCode(97+i)+' Antwort '+(j+1))}{text(x+63,y+32+j*41,i===4?150:260,[['Als IT-Spezialist.','Bei EASY COMPUTER.'],['Aus Frankreich.','In Frankreich.'],['Ich glaube, sie macht eine\nAusbildung als Friseurin.','Ich mache eine Ausbildung\nals Friseurin.'],['Zwei, drei und fünf.','Sie ist zehn.'],['In Frankfurt.','Aus Frankfurt.']][i][j],'nabSmall')}</div>)}</div>})}
 {check('u5',202,1412,{'u5-0':'1','u5-1':'0','u5-2':'1','u5-3':'0','u5-4':'0'})}
 <div className="nabScore" style={{left:492,top:1410}}><b>Wörter</b><b>Strukturen</b><b>Kommunikation</b>{[['0-7 Punkte','0-4 Punkte','0-2 Punkte'],['8-11 Punkte','5-6 Punkte','3 Punkte'],['12-14 Punkte','7-8 Punkte','4-5 Punkte']].map((row,r)=>row.map((label,c)=><div key={r+'-'+c}><i style={{background:['#d71a13','#edce09','#2c9d27'][r]}}/>{label}</div>))}</div>
 </>}
 {page==='17'&&<>
 {head('LERNWORTSCHATZ')}<div className="nabModule">2</div>
 {title('1',235,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.','','')}
 {text(202,278,350,'Arbeit und Ausbildung','nabBold')}
 {['Arbeitgeber der, -','Ausbildung die,\n-en','Beruf der, -e','Hochschule die,\n-n / Universität die, -en','Job der, -s','Praktikum das,\nPraktika','Schule die, -n','Stelle die, -n','arbeiten als/bei ...','studieren','arbeitslos','von Beruf','Was ...?'].map((s,i)=>{const y=[307,335,385,412,469,497,553,581,617,645,683,711,749][i];return <div key={s}>{text(202,y,220,s,'nabVocab')}{field('vocab-work-'+i,i===3?450:374,y+(i===3?26:6),i===3?114:190,s+' Übersetzung')}</div>})}
 {text(202,794,350,'Berufe','nabBold')}
 {['Architekt der, -en','Arzt der, ¨e','Friseur der, -e','Ingenieur der, -e','Journalist der, -en','Kellner der, -','Krankenschwester\ndie, -n','Lehrer der, -','Mechatroniker\nder, -','Student der, -en','Schauspieler der, -','Schüler der, -','Sekretär der, -e','Verkäufer der, -'].map((s,i)=>{const y=[820,848,876,930,958,986,1014,1068,1096,1150,1178,1206,1234,1262][i];return <div key={s}>{text(202,y,230,s,'nabVocab')}{field('vocab-jobs-'+i,374,y+4,190,s+' Übersetzung')}</div>})}
 {text(210,904,345,'CH: Coiffeur der, -e / Coiffeuse die, -n','nabSmall')}
 {text(603,278,350,'Persönliches','nabBold')}
 {['Alter das','Familienstand\nder','Jahr das, -e','... Jahre alt sein','Kind das, -er','leben','allein leben','zusammenleben','wohnen in','geschieden','verheiratet','in','Wo ...?'].map((s,i)=>{const y=[307,335,412,440,469,511,539,567,595,638,666,708,736][i];return <div key={s}>{text(603,y,197,s,'nabVocab')}{field('vocab-person-'+i,770,y+5,190,s+' Übersetzung')}</div>})}
 {text(611,385,270,'CH: Zivilstand der','nabSmall')}
 {text(603,781,350,'Weitere wichtige Wörter','nabBold')}
 {['glauben','haben','machen','richtig','falsch','super','aber','kein-','nicht'].map((s,i)=>{const y=810+i*29;return <div key={s}>{text(603,y,163,s,'nabVocab')}{field('vocab-more-'+i,770,y+4,190,s+' Übersetzung')}</div>})}
 {text(632,1092,300,'Schreiben Sie neue\nWörter und Beispielsätze\nauf Kärtchen.','nabTip')}{text(631,1181,310,'leben\nWir leben in Malaga.\narbeiten\nIch arbeite nicht.','nabExample')}
 {img('photos',960,210,115,1210)}
 {title('2',1315,'Welche Wörter möchten Sie noch lernen? Notieren Sie.','','')}{multi('newwords',202,1363,760,112,'Neue Wörter')}
 </>}
 {page==='18'&&<>
 {img('banner',55,107,330,79)}<div className="nabBanner" style={{left:385,top:107,width:613,height:79}}/>{text(473,128,458,'Das ist meine Mutter.','nabCoverTitle')}
 {title('1',247,'Was passt? Kreuzen Sie an.','KB 3')}{img('mother',790,226,188,246)}
 {text(209,280,420,'a  Ist das    ☑ dein    ◯ deine    Vater?')}
 {['b','c','d1','d2','e','f'].map((s,i)=>{const y=308+i*23,x=[349,410,429,327,368,368][i],labels=i===1?['dein','deine']:['mein','meine'];return <div key={s}>{text(209,y,x-209,[s[0]+'  Ja, das ist',s+'  Und das? Ist das','d  Nein, das ist nicht','   Das ist','e  Das hier ist','f  Und das ist'][i])}{choice('u1-'+s,labels[0],x,y-4,'1'+s+' '+labels[0])}{text(x+31,y,62,labels[0])}{choice('u1-'+s,labels[1],x+99,y-4,'1'+s+' '+labels[1])}{text(x+130,y,70,labels[1])}{text(x+207,y,125,['Vater.','Oma?','Oma.','Mutter.','Oma.','Opa.'][i])}</div>})}
 {check('u1',202,450,{'u1-b':'mein','u1-c':'deine','u1-d1':'meine','u1-d2':'meine','u1-e':'meine','u1-f':'mein'})}
 {title('2',479,'Ordnen Sie zu.','KB 4')}
 {text(209,514,466,'Bist du verheiratet? | Wer ist das? | Ist das dein Mann? | Das sind meine Eltern. | Wie heißt deine Schwester? | Ist deine Schwester verheiratet? | Mein Opa lebt in Spanien. | Meine Schwester hat zwei Kinder. | Was ist deine Mutter von Beruf? | Hast du Kinder?','nabBank nabWrap')}
 {text(686,514,255,'Ja/Nein-Fragen','nabBold nabSmall')}{text(686,536,260,'Bist du verheiratet?','nabExample nabSmall')}{multi('u2-janein',686,558,260,41,'2 weitere Ja Nein Fragen')}{text(686,598,265,'W-Fragen/Aussagen','nabBold nabSmall')}{text(686,620,260,'Mein Opa lebt in Spanien.','nabExample nabSmall')}{multi('u2-wfragen',686,642,260,41,'2 weitere W Fragen und Aussagen')}
 {checkRule('u2',202,656,()=>[['u2-janein',['Ist das dein Mann?','Ist deine Schwester verheiratet?','Hast du Kinder?']],['u2-wfragen',['Wer ist das?','Das sind meine Eltern.','Wie heißt deine Schwester?','Meine Schwester hat zwei Kinder.','Was ist deine Mutter von Beruf?']]].every(([id,list])=>{const actual=(v[id as string]||'').split(/[,?!.]+/).map(norm).filter(Boolean);return (list as string[]).every(s=>actual.includes(norm(s)))&&actual.length===(list as string[]).length}))}
 {title('3',692,'Schreiben Sie Sätze.','KB 4')}
 {text(209,727,616,'a  wer / das / ist   Wer ist das?','nabExample')}
 {['das / Frau / ist / deine','das / nein / Schwester / ist / meine','verheiratet / du / bist','geschieden / nicht / bin / ich'].map((s,i)=>{const x=[444,580,427,523][i];return <div key={s}>{text(209,753+i*29,x-216,String.fromCharCode(98+i)+'  '+s)}{field('u3-'+String.fromCharCode(98+i),x,751+i*29,1000-x,'3'+String.fromCharCode(98+i)+' Satz')}</div>})}{checkGroup('u3',202,866)}
 {title('4',915,'Aussagen und Fragen','KB 4')}{text(209,950,713,'Machen Sie Übungen wie in 3. Ihre Partnerin / Ihr Partner schreibt Sätze.','nabTitle')}{multi('partner-saetze',209,985,695,35,'4 eigene Sätze')}
 {title('5',1034,'Kreuzen Sie an.','KB 5','Kommunikation')}
 {img('rings',420,1071,34,23)}{img('children',470,1105,50,38)}{img('rings2',504,1139,43,25)}{img('flag',583,1173,53,35)}
 {['Ist Lisa geschieden?','Sind das deine Kinder?','Vroni ist nicht verheiratet.','Roberto kommt nicht aus Spanien.'].map((s,i)=><div key={s}>{text(209,1071+i*34,430,String.fromCharCode(97+i)+'  '+s)}{i===0?text(676,1071,222,'☑ Ja.      ◯ Nein.'): <>{choice('u5-'+String.fromCharCode(97+i),i===1?'Ja':'Doch',678,1067+i*34,'5'+String.fromCharCode(97+i)+' ja doch')}{text(706,1071+i*34,65,i===1?'Ja.':'Doch.')}{choice('u5-'+String.fromCharCode(97+i),'Nein',779,1067+i*34,'5'+String.fromCharCode(97+i)+' Nein')}{text(806,1071+i*34,90,'Nein.')}</>}</div>)}
 {check('u5',202,1197,{'u5-b':'Nein','u5-c':'Doch','u5-d':'Nein'})}
 {title('6',1232,'Ergänzen Sie ja, nein oder doch.','KB 5','Kommunikation')}
 {text(209,1267,722,'a  Ist deine Schwester verheiratet?  Ja, meine Schwester ist verheiratet.')}
 {['Leben deine Eltern in Kiel?','Du studierst nicht, oder?','Deine Schwester ist auch Schauspielerin, oder?','Deine Frau heißt nicht Sandra, oder?'].map((s,i)=>{const x=[512,491,744,638][i],y=[1295,1324,1353,1422][i];return <div key={s}>{text(209,y,x-216,String.fromCharCode(98+i)+'  '+s)}{field('u6-'+String.fromCharCode(98+i),x,y-3,88,'6'+String.fromCharCode(98+i))}{text(i===2?750:x+94,i===2?y+24:y,i===2?285:1040-x-94,[', meine Eltern leben nicht in Kiel.',', ich studiere Physik.',', sie ist auch Schauspielerin.',', sie heißt Sandra.'][i])}</div>})}
 {checkGroup('u6',202,1459)}
 </>}
 {page==='19'&&<>
 {head('BASISTRAINING')}<div className="nabModule">3</div>
 {title('7',235,'Ordnen Sie zu.','KB 6','Wörter')}{text(202,275,820,'Schwester | Vater | Sohn | Opa | Enkelin | (Ehe-)Frau | Großvater','nabBank')}
 {text(202,324,110,'♂','nabGender')}{text(400,324,110,'♀','nabGender')}{text(632,324,110,'♂','nabGender')}{text(835,324,110,'♀','nabGender')}
 {text(202,371,153,'Sohn','nabExample')}{text(202,398,153,'Bruder')}{field('u7-m1',202,425,153,'7 Vater')}
 {text(400,371,153,'Tochter')}{field('u7-w1',400,398,153,'7 Schwester')}{text(400,425,153,'Mutter')}
 {text(632,371,153,'(Ehe-)Mann')}{text(632,398,153,'Enkel')}{field('u7-m2a',632,425,153,'7 Opa')}{field('u7-m2b',632,452,153,'7 Großvater')}
 {field('u7-w2a',835,368,153,'7 Ehefrau')}{field('u7-w2b',835,395,153,'7 Enkelin')}{text(835,425,153,'Oma')}{text(835,452,153,'Großmutter')}
 {checkGroup('u7',202,494)}
 {title('8',534,'Silbenrätsel. Ergänzen Sie.','KB 6','Wörter')}{text(202,574,560,'der | el | el | groß | kin | schwes | tern | tern | tern','nabBank')}
 {img('a',165,620,187,136)}{img('b',385,630,167,124)}{img('c',579,606,190,148)}{img('d',795,568,216,148)}
 {text(202,792,412,'a  Meine Kinder auf Sylt.')}{text(202,823,99,'b  Meine')}{field('u8-b',308,820,153,'8b Eltern')}{text(468,823,170,'in den Alpen.')}
 {text(621,792,99,'c  Meine')}{field('u8-c',727,789,153,'8c Großeltern')}{text(886,792,160,'bei der goldenen\nHochzeit.')}
 {text(621,853,165,'d  Ich und meine')}{field('u8-d',793,850,153,'8d Schwestern')}{text(953,853,100,'in Paris.')}
 {checkGroup('u8',202,891)}
 {title('9',931,'Ordnen Sie zu.','KB 6')}{text(202,971,760,'dein | deine | mein | mein | mein | meine | meine','nabBank')}
 {text(202,1011,700,'▪ Sind das deine (a) Kinder auf dem Bild?')}
 {text(202,1042,131,'▴ Ja, das sind')}{field('u9-b',339,1039,115,'9b meine')}{text(460,1042,253,'(b) Kinder. Das hier ist')}{field('u9-c',720,1039,115,'9c meine')}{text(841,1042,190,'(c) Tochter Leonie und')}
 {text(225,1073,115,'das hier ist')}{field('u9-d',346,1070,115,'9d mein')}{text(467,1073,325,'(d) Sohn Torben. Und hier ist')}{field('u9-e',799,1070,115,'9e mein')}{text(920,1073,120,'(e) Bruder.')}
 {text(202,1104,126,'▪ Was macht')}{field('u9-f',335,1101,115,'9f dein')}{text(456,1104,185,'(f) Bruder?')}
 {text(202,1135,20,'▴')}{field('u9-g',230,1132,115,'9g Mein')}{text(352,1135,675,'(g) Bruder lebt in Berlin und arbeitet als IT-Spezialist.')}
 {checkGroup('u9',202,1174)}
 {title('10',1214,'Familienrätsel. Ergänzen Sie und beantworten Sie die Fragen.','KB 7')}
 {text(202,1254,235,'Meine Schwester heißt')}{field('u10-l1',443,1251,130,'10 Schwester')}{text(580,1254,140,'Sie studiert Physik')}
 {text(202,1284,102,'in Berlin.')}{field('u10-l2',309,1281,69,'10 meine Eltern')}{text(384,1284,310,'Eltern leben in Konstanz.')}{field('u10-l3',698,1281,72,'10 mein Vater')}
 {text(202,1314,352,'Vater Georg arbeitet als Journalist und')}{field('u10-l4',560,1311,104,'10 meine Mutter')}{text(671,1314,88,'Mutter')}
 {text(202,1344,360,'ist Lehrerin, genau wie mein Opa.')}{field('u10-l5',568,1341,85,'10 meine Oma')}{text(660,1344,110,'Oma Karen')}
 {text(202,1374,333,'arbeitet nicht mehr, sie ist Rentnerin.')}{field('u10-l6',541,1371,83,'10 meine Großeltern')}{text(631,1374,140,'Großeltern leben')}
 {text(202,1404,510,'in Österreich. Genau wie ich.')}{img('tree',790,1261,255,199)}
 {['Wie heiße ich?','Wie heißt meine Mutter?','Wie heißt mein Opa?'].map((s,i)=><div key={s}>{text(202,1450+i*30,265,String.fromCharCode(97+i)+'  '+s)}{field('u10-'+String.fromCharCode(97+i),478,1447+i*30,273,'10'+String.fromCharCode(97+i))}</div>)}
 {checkGroup('u10',815,1490)}
 </>}
 {text(Number(page)%2?991:50,1485,80,'Modul 1','nabFooter')}{text(Number(page)%2?810:130,1485,175,Number(page)%2?({'13':'dreizehn','15':'fünfzehn','17':'siebzehn','19':'neunzehn'} as Record<string,string>)[page]+' | '+page:page+' | '+({'12':'zwölf','14':'vierzehn','16':'sechzehn','18':'achtzehn'} as Record<string,string>)[page],'nabFooter')}
 </div><audio ref={audio} className="nabPlayer" controls hidden aria-label="Originalaudio Arbeitsbuch"/></div>;
}
