import {CheckButton} from '../components/CheckButton';
import {PageImage} from '../components/PageImage';
import {usePageReset} from '../exercises/usePageReset';
import {LineMatching} from '../exercises/LineMatching';
import {useLayoutEffect,useRef,useState} from 'react';
import './native-ab11.css';
const norm=(s:string)=>s.normalize('NFC').toLocaleLowerCase('de').trim().replace(/[.,!?;:’']/g,'').replace(/\s+/g,' ');
function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\S/.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-phrase={text} data-word={w.replace(/^[.,!?„"()]+|[.,!?“"()]+$/g,'')}>{w}</span>:w)}</>}
export function NativeAB11({page}:{page:string}){
 const key='native-ab11-'+page, host=useRef<HTMLDivElement>(null);
 const audio=useRef<HTMLAudioElement>(null);const [track,T]=useState('');
 const [scale,SS]=useState(1),[v,S]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}}),[graded,G]=useState<Record<string,boolean>>({}),[active,A]=useState('');
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const measure=()=>SS(Math.min(el.clientWidth/1075,el.clientHeight/1521));measure();const ro=new ResizeObserver(measure);ro.observe(el);return ()=>ro.disconnect()},[]);
 usePageReset(page,'native-ab11-'+page,()=>{S({});G({});A('')});
 const set=(id:string,value:string)=>{const n={...v,[id]:value};S(n);localStorage.setItem(key,JSON.stringify(n));const group=page==='7'&&id.startsWith('6-')?'6a':page==='9'&&id.startsWith('1-')?(id.startsWith('1-q')?'1a':'1b'):id.startsWith('mark-10-')?'10':id.split('-')[0];G(prev=>{const next={...prev};delete next[group];return next})};
 const text=(x:number,y:number,w:number,s:string,cls='')=><div className={'nabText '+cls} style={{left:x,top:y,width:w}}><Words text={s}/></div>;
 const img=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="nabArt" src={`assets/native-ab11/p${page}-${name}.png`} alt={'Originalabbildung '+name} style={{left:x,top:y,width:w,height:h}}/>;
 const field=(id:string,x:number,y:number,w:number,label:string,cls='')=>{const measure=document.createElement('canvas').getContext('2d');if(measure)measure.font="22px 'Times New Roman'";const measured=measure?.measureText(v[id]||'').width||0;const fontSize=measured>w-6?Math.max(12,22*(w-6)/measured):22;const mark=(v['mark-'+id]||'').split(':').map(Number);let gradient='none';if(id.startsWith('10-')&&mark.length===2){const ctx=document.createElement('canvas').getContext('2d');if(ctx){ctx.font="22px 'Times New Roman'";const start=3+ctx.measureText((v[id]||'').slice(0,mark[0])).width,end=3+ctx.measureText((v[id]||'').slice(0,mark[1])).width;gradient=`linear-gradient(to right, transparent ${start}px, #ffea54 ${start}px, #ffea54 ${end}px, transparent ${end}px)`}}return <input className={'nabInput '+cls+(id.startsWith('10-')?' nabEnding':'')} style={{left:x,top:y,width:w,'--ending-mark':gradient,'--native-input-size':fontSize+'px'} as React.CSSProperties} aria-label={label} title={id.startsWith('10-')?'Endung markieren: Buchstaben im Eingabefeld auswählen':undefined} data-native-field={id} value={v[id]||''} onChange={e=>set(id,e.target.value)} onSelect={e=>{if(id.startsWith('10-')){const t=e.currentTarget;if(t.selectionStart!==t.selectionEnd)set('mark-'+id,t.selectionStart+':'+t.selectionEnd)}}}/>};
 const open=(id:string,x:number,y:number,w:number,h:number,label:string)=><textarea className="nabInput nabOpen" style={{left:x,top:y,width:w,height:h,'--native-open-height':h+'px'} as React.CSSProperties} aria-label={label} data-native-field={id} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const choice=(id:string,value:string,x:number,y:number,label:string)=><input type="radio" className="nabRadio" style={{left:x,top:y}} name={key+'-'+id} aria-label={label} checked={v[id]===value} onChange={()=>set(id,value)}/>;
 const arrow=(id:string,x:number,y:number,label:string)=><button className="nabArrow" style={{left:x,top:y}} aria-label={'Satzmelodie '+label} data-native-arrow={id} onClick={()=>set(id,v[id]==='down'?'up':'down')}>{v[id]==='down'?'↘':v[id]==='up'?'↗':'_'}</button>;
 const option=(id:string,value:string,x:number,y:number,label:string)=><label className="nabOption" style={{left:x,top:y}}><input type="radio" name={key+'-'+id} aria-label={id+' '+label} checked={v[id]===value} onChange={()=>set(id,value)}/><span>{label}</span></label>;
 const listen=(n:string,x:number,y:number)=><button className="nabListen" style={{left:x,top:y}} aria-label={'Originalaudio 1 '+n} onClick={()=>{T(n);if(audio.current){audio.current.src='assets/ab-cd1-track'+n.padStart(2,'0')+'.mp3';audio.current.play().catch(()=>{})}}}>▶ 1 {n}</button>;
 const checkRule=(id:string,x:number,y:number,validate:()=>boolean)=><div className="nabCheck" style={{left:x,top:y}} data-native-task={id}><CheckButton onClick={()=>G({...graded,[id]:validate()})}></CheckButton><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="nabCheck" style={{left:x,top:y}} data-native-task={id}><CheckButton onClick={()=>G({...graded,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}></CheckButton><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const title=(n:string,y:number,s:string,kb:string,side='Strukturen')=><>{text(130,y+7,40,kb,'nabKB')}<div className="nabNumber" style={{left:170,top:y}}>{n}</div>{text(212,y,810,s,'nabTitle')}<div className="nabSide" style={{left:141,top:y+45}}>{side}</div></>;
 const head=(s:string)=><>{text(160,142,750,s,'nabHeader')}<div className="nabHeaderLine"/></>;
 return <div className="nativeAB11" ref={host} data-native-ab11-page={page}><div className="nabCanvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='6'&&<>
 {img('cover',70,115,330,78)}<div className="nabBanner" style={{left:400,top:115,width:613,height:78}}/>{text(488,135,520,'Hallo! Ich bin Nicole ...','nabCoverTitle')}
 {title('1',250,'Ordnen Sie zu.','KB 2')}{text(218,291,620,'heiße | du | Hallo | heißt | ich | ich | wer | wie','nabBank')}
 {text(213,331,390,'■  Hallo! Ich bin Wiebke. Und')}{field('1-wer',486,332,64,'1a Und wer')}{text(238,357,55,'bist')}{field('1-du',275,358,110,'1a bist du')}{text(386,357,25,'?')}
 {text(213,383,28,'▲','nabGreen')}{field('1-hallo',240,383,95,'1a Hallo')}{text(336,383,15,',')}{field('1-ich',348,383,75,'1a ich')}{text(423,383,200,'bin Stefan.')}
 {text(600,332,235,'■  Ich heiße René. Und')}{field('1-wie',806,333,80,'1b wie')}{field('1-heisst',624,357,112,'1b heißt')}{text(740,357,70,'du?')}{text(600,383,66,'▲  Ich')}{field('1-heisse',660,383,128,'1b heiße')}{text(793,383,110,'Alfred.')}
 {check('1',215,416,{'1-wer':'wer','1-du':'du','1-hallo':'Hallo','1-ich':'ich','1-wie':'wie','1-heisst':'heißt','1-heisse':'heiße'})}
 {title('2',447,'Sortieren Sie.','KB 3','Kommunikation')}{img('dialogue',689,442,331,222)}
 {['Ja, ich komme aus Deutschland.\nUnd woher kommst du, Roberto? Aus Portugal?','Aus Brasilien? Wow!','Ich heiße Melanie.','Nein, ich komme aus Brasilien.','Hallo! Ich heiße Roberto, und wer bist du?','Und woher kommst du? Aus Deutschland?'].map((s,i)=>{const y=[485,537,562,587,613,639][i];return <div key={i}>{field('2-'+i,214,y-3,28,'2 Satz '+(i+1),'nabCircle')}{text(247,y,450,s)}</div>})}
 {check('2',215,671,{'2-0':'4','2-1':'6','2-2':'2','2-3':'5','2-4':'1','2-5':'3'})}
 {title('3',708,'Ordnen Sie zu.','KB 3')}
 <LineMatching id="3" left={['a  Wie','b  Ich heiße','c  Woher','d  Ich komme','e  Wer','f  Ich']} right={['bin Pedro.','kommst du?','aus der Schweiz.','heißt du?','bist du?','Sandra.']} values={v} onMatch={set} leftX={237} rightX={449} leftWidth={156} rightWidth={210} ys={Array.from({length:6},(_,i)=>737+i*26)} example={[0,3]}/>
 {check('3',215,900,{'3-1':'5','3-2':'1','3-3':'2','3-4':'4','3-5':'0'})}
 {title('4',935,'Ergänzen Sie.','KB 3')}
 {text(214,979,330,'a  ■  Hallo! Ich bin Simon.')}{field('4-wie',473,979,95,'4a Wie')}{text(258,1005,160,'heißt du?')}
 {text(235,1031,65,'▲  Ich','nabGreen')}{field('4-heisse',295,1031,126,'4a heiße')}{text(431,1031,75,'Steffi.')}
 {text(235,1057,65,'■  Und')}{field('4-woher',300,1057,137,'4a woher')}{text(442,1057,95,'kommst')}{field('4-du',258,1083,132,'4a du')}{text(394,1083,176,'? Aus Österreich?')}
 {text(235,1109,100,'▲  Nein, ich')}{field('4-komme',357,1109,110,'4a komme')}{text(475,1109,70,'aus')}{text(259,1135,250,'Deutschland.')}
 {text(607,979,260,'b  ■  Hallo! Ich bin Sofia,')}{field('4-und',869,979,95,'4b und')}{text(661,1005,40,'wer')}{field('4-bist',705,1005,121,'4b bist')}{text(831,1005,55,'du?')}
 {text(635,1031,24,'▲','nabGreen')}{field('4-ich',661,1031,128,'4b Ich')}{text(793,1031,170,'heiße Philipp.')}
 {text(635,1057,121,'■  Und woher')}{field('4-kommst',783,1057,102,'4b kommst')}{text(889,1057,55,'du?')}
 {text(635,1083,120,'▲  Ich komme')}{field('4-aus',783,1083,102,'4b aus')}{text(889,1083,150,'der Schweiz.')}
 {check('4',215,1168,{'4-wie':'Wie','4-heisse':'heiße','4-woher':'woher','4-du':'du','4-komme':'komme','4-und':'und','4-bist':'bist','4-ich':'Ich','4-kommst':'kommst','4-aus':'aus'})}
 {title('5',1178,'Länder','KB 4','Wörter')}{text(211,1216,310,'a  Welches Land passt? Ordnen Sie zu.','nabSmallTitle')}{text(530,1216,490,'Deutschland | Frankreich | Österreich | die Schweiz | die Türkei','nabBank nabLanderBank')}
 {img('landmarks',215,1250,811,111)}
 {['Brandenburger Tor','Eiffelturm','Stephansdom','Matterhorn','Hagia Sophia'].map((s,i)=><div key={s}>{text([230,415,534,705,908][i],1369,[155,100,145,150,150][i],s,'nabCaption')}{i===2?text(545,1394,110,'Österreich','nabExample'):field('5-'+i,[224,397,545,685,888][i],1394,[125,105,110,140,140][i],'5 '+s)}</div>)}
 {check('5',215,1433,{'5-0':'Deutschland','5-1':'Frankreich','5-3':'die Schweiz|Schweiz','5-4':'die Türkei|Türkei'})}
 </>}
 {page==='7'&&<>
 {head('BASISTRAINING')}<div className="nabModule">1</div>{img('usa',749,140,221,190)}{text(170,209,30,'b','nabTitle')}{text(203,209,610,'Suchen Sie typische Fotos und schreiben Sie die Länder-\nnamen auf Kärtchen. Ihre Partnerin / Ihr Partner ordnet zu.','nabSmallTitle')}
 {title('6',300,'du oder Sie?','KB 6a','Kommunikation')}{text(170,341,450,'a  Ordnen Sie zu.','nabTitle')}
 {img('du-sie',194,362,787,97)}{text(202,480,100,'du: 1,','nabExample')}{field('6-du',275,480,127,'6a du')}{text(599,480,80,'Sie:')}{field('6-sie',640,480,173,'6a Sie')}{check('6a',202,517,{'6-du':'3','6-sie':'2, 4|2,4|2 und 4'})}
 {text(170,537,810,'b  du oder Sie? Ergänzen und vergleichen Sie.','nabTitle')}
 <div className="nabTable" style={{left:202,top:561,width:796,height:92}}><div>Deutsch</div><div>Englisch</div><div>Meine Sprache oder andere Sprachen</div><div>du</div><div>you</div><div><input aria-label="6b du in meiner Sprache" value={v['6b-du']||''} onChange={e=>set('6b-du',e.target.value)}/></div><div>Sie</div><div>you</div><div><input aria-label="6b Sie in meiner Sprache" value={v['6b-sie']||''} onChange={e=>set('6b-sie',e.target.value)}/></div></div>
 {title('7',691,'du oder Sie? Kreuzen Sie an.','KB 6a','Kommunikation')}
 {text(202,735,175,'a  Woher kommen')}<input className="nabRadio" type="radio" style={{left:385,top:735}} disabled aria-label="7a Beispiel du"/>{text(415,735,48,'du')}<input className="nabRadio" type="radio" style={{left:463,top:735}} disabled checked readOnly aria-label="7a Beispiel Sie"/>{text(494,735,90,'Sie,')}{text(227,761,300,'Herr Svendson?')}
 {text(202,786,300,'b  Hallo, ich bin Tine. Und wer bist')}{choice('7-b','du',227,812,'7b du')}{text(260,812,45,'du')}{choice('7-b','Sie',305,812,'7b Sie')}{text(337,812,100,'Sie?')}
 {text(590,735,240,'c  Kolja, woher kommst')}{choice('7-c','du',835,735,'7c du')}{text(868,735,45,'du')}{choice('7-c','Sie',913,735,'7c Sie')}{text(946,735,70,'Sie?')}
 {text(590,761,285,'d  Frau Klein, woher kommen')}{choice('7-d','du',874,761,'7d du')}{text(907,761,43,'du')}{choice('7-d','Sie',950,761,'7d Sie')}{text(983,761,62,'Sie?')}
 {text(590,787,192,'e  Woher kommst')}{choice('7-e','du',784,787,'7e du')}{text(817,787,45,'du,')}{choice('7-e','Sie',865,787,'7e Sie')}{text(898,787,130,'Sie, Shema?')}
 {check('7',202,843,{'7-b':'du','7-c':'du','7-d':'Sie','7-e':'du'})}
 {title('8',878,'Ergänzen Sie.','KB 6a')}
 {text(202,914,720,'a  ■  Woher kommst du?')}{text(225,940,165,'▲  Ich komm')}{field('8-a1',353,940,42,'8a Endung komme 1')}{text(400,940,490,'aus Spanien. Und du?')}
 {text(225,966,163,'■  Ich komm')}{field('8-a2',353,966,42,'8a Endung komme 2')}{text(400,966,360,'aus dem Iran.')}
 {text(202,992,200,'b  ■  Hallo. Ich heiß')}{field('8-b1',398,992,42,'8b Endung heiße 1')}{text(444,992,205,'Maria. Und wie heiß')}{field('8-b2',647,992,42,'8b Endung heißt')}{text(693,992,75,'du?')}
 {text(225,1018,150,'▲  Ich heiß')}{field('8-b3',343,1018,42,'8b Endung heiße 2')}{text(390,1018,180,'Michael.')}
 {text(202,1044,390,'c  ■  Guten Tag, Frau Matard. Woher komm')}{field('8-c1',621,1044,42,'8c Endung kommen')}{text(670,1044,330,'Sie? Aus Frankreich?')}
 {text(225,1070,205,'▲  Nein, ich komm')}{field('8-c2',423,1070,42,'8c Endung komme')}{text(470,1070,280,'aus der Schweiz.')}
 {check('8',202,1098,{'8-a1':'e','8-a2':'e','8-b1':'e','8-b2':'t','8-b3':'e','8-c1':'en','8-c2':'e'})}
 {title('9',1129,'Schreiben Sie Sätze zu den Fotos.','KB 6c')}
 {img('person-a',202,1156,133,184)}{img('person-b',495,1156,133,184)}{img('person-c',645,1156,120,184)}{img('person-d',797,1156,133,184)}{text(350,1183,135,'Das ist Philipp\nLahm. Er\nkommt aus\nDeutschland.','nabExample')}
 {text(215,1369,180,'Philipp Lahm,\nDeutschland','nabCaption')}{text(500,1369,160,'Wolfgang Amadeus\nMozart, Österreich','nabCaption')}{text(650,1369,140,'Prinz Felipe,\nSpanien','nabCaption')}{text(801,1369,140,'Martina Hingis,\nSchweiz','nabCaption')}
 {open('9',202,1414,785,60,'9 Sätze zu den Fotos')}
 </>}
 {page==='8'&&<>
 {head('BASISTRAINING')}
 {title('10',250,'Ergänzen Sie und markieren Sie die Endungen.','KB 6c','Strukturen entdecken')}
 <div className="nabGrid" style={{left:202,top:286,width:795,height:155}}/>
 {text(403,290,150,'heißen','nabBold')}{text(603,290,150,'kommen','nabBold')}{text(803,290,150,'sein','nabBold')}
 {['ich','du','Sie','er/sie'].map((s,i)=>text(207,321+i*31,140,s))}
 {text(404,321,130,'heiße','nabExample')}{text(805,321,100,'bin','nabExample')}{text(805,383,100,'sind','nabExample')}
 {field('10-ich-kommen',562,318,95,'10 ich kommen')}
 {field('10-du-heissen',390,349,95,'10 du heißen')}{field('10-du-kommen',562,349,95,'10 du kommen')}{field('10-du-sein',788,349,95,'10 du sein')}
 {field('10-sie-heissen',390,380,95,'10 Sie heißen')}{field('10-sie-kommen',562,380,95,'10 Sie kommen')}
 {field('10-er-heissen',390,411,95,'10 er/sie heißen')}{field('10-er-kommen',562,411,95,'10 er/sie kommen')}{field('10-er-sein',788,411,95,'10 er/sie sein')}
 {check('10',202,452,{'10-ich-kommen':'komme','10-du-heissen':'heißt','10-du-kommen':'kommst','10-du-sein':'bist','10-sie-heissen':'heißen','10-sie-kommen':'kommen','10-er-heissen':'heißt','10-er-kommen':'kommt','10-er-sein':'ist'})}
 {title('11',488,'Was ist richtig? Markieren Sie.','KB 6d')}
 {text(202,508,450,'a  Wer  bist / ist / sind  das?')}{text(202,535,60,'b  Das')}{option('11-b','bin',270,535,'bin')}{text(308,535,20,'/')}{option('11-b','sind',328,535,'sind')}{text(371,535,20,'/')}{option('11-b','ist',391,535,'ist')}{text(427,535,165,'Frau Wachter.')}
 {text(202,562,100,'c  Woher')}{option('11-c','komme',300,562,'komme')}{text(371,562,20,'/')}{option('11-c','kommst',391,562,'kommst')}{text(472,562,20,'/')}{option('11-c','kommen',492,562,'kommen')}{text(225,589,130,'Sie?')}
 {text(625,508,95,'d  Peter')}{option('11-d','komme',720,508,'komme')}{text(791,508,20,'/')}{option('11-d','kommst',811,508,'kommst')}{text(892,508,20,'/')}{option('11-d','kommt',912,508,'kommt')}{text(647,535,340,'aus Spanien.')}
 {text(625,562,97,'e  Woher')}{option('11-e','kommst',722,562,'kommst')}{text(803,562,20,'/')}{option('11-e','kommt',823,562,'kommt')}{text(890,562,20,'/')}{option('11-e','kommen',910,562,'kommen')}{text(647,589,360,'Frau Wallander?')}
 {check('11',202,620,{'11-b':'ist','11-c':'kommen','11-d':'kommt','11-e':'kommt'})}
 {title('12',655,"Wie geht's? Ordnen Sie zu.",'KB 7','Kommunikation')}
 {text(207,697,805,'Nicht so gut. | Sehr gut, danke. | Auch gut. | Es geht. | Gut, danke.','nabBank')}
 {text(202,740,30,'a')}{img('verygood',225,732,60,27)}{field('12-a',287,734,270,'12a Befinden')}
 {text(202,773,30,'b')}{img('good',225,767,28,27)}{text(280,770,170,'Auch gut.','nabExample')}
 {text(583,740,30,'c')}{img('okay',610,732,28,27)}{field('12-c',645,734,260,'12c Befinden')}
 {text(583,773,30,'d')}{img('bad',610,767,28,27)}{field('12-d',645,767,260,'12d Befinden')}
 {check('12',202,807,{'12-a':'Sehr gut, danke|Gut, danke','12-c':'Es geht','12-d':'Nicht so gut'})}
 {title('13',844,'Ergänzen Sie.','KB 7','Kommunikation')}
 {text(207,884,773,'Und wie geht es dir? | Und Ihnen? | Wie geht es Ihnen? | Wie geht’s?','nabBank')}
 {text(207,927,230,'a  ▲  Guten Tag Herr Stein!')}{text(450,927,180,'Wie geht es Ihnen?','nabExample')}{text(230,953,140,'■  Gut, danke.')}{field('13-a',371,951,200,'13a Gegenfrage')}{text(230,979,190,'▲  Auch gut.')}
 {text(633,927,175,'b  ●  Hallo Svenja!')}{field('13-b1',815,926,185,'13b Frage')}{text(659,953,130,'■  Sehr gut!')}{field('13-b2',795,952,205,'13b Gegenfrage')}{text(659,979,300,'●  Ach, nicht so gut.')}
 {check('13',202,1009,{'13-a':'Und Ihnen','13-b1':"Wie geht's|Wie geht’s|Wie geht es dir",'13-b2':"Und wie geht's dir|Und wie geht’s dir|Und wie geht es dir"})}
 {title('14',1046,'Welche Namen hören Sie? Notieren Sie.','KB 9','Hören')}{listen('02',112,1079)}
 {text(207,1090,30,'a')}{field('14-a',234,1086,350,'14a Name')}{text(207,1120,30,'b')}{field('14-b',234,1116,350,'14b Name')}{text(633,1090,30,'c')}{field('14-c',660,1086,340,'14c Name')}{text(633,1120,30,'d')}{field('14-d',660,1116,340,'14d Name')}
 {check('14',202,1152,{'14-a':'Lothar Müller','14-b':'Lena Egger','14-c':'Yvonne Schuster','14-d':'Sebastian Wimmer'})}
 {title('15',1190,'Begrüßung und Abschied - Markieren Sie und ordnen Sie zu.','KB 10','Kommunikation')}
 <div className="nabRibbon" style={{position:'absolute',left:190,top:1230,width:840}}>{['ich','hallo','ausnein','gutentag','woher','aufwiedersehen','ich','gutenacht','esgehtfraudu','tschüs','wie','gutenabend','heißt'].map((w,i)=>['hallo','gutentag','aufwiedersehen','gutenacht','tschüs','gutenabend'].includes(w)?<button key={i} className={v['15-mark-'+w]==='true'?'marked':''} aria-label={'15 markieren '+w} onClick={()=>set('15-mark-'+w,v['15-mark-'+w]==='true'?'':'true')}>{w}</button>:<span key={i}>{w}</span>)}</div>
 {[['a',230,1274,'Gute Nacht'],['c',511,1274,'Tschüs'],['e',792,1274,'Hallo'],['b',230,1369,'Guten Tag'],['d',511,1369,'Auf Wiedersehen'],['f',792,1369,'Guten Abend']].map(([id,x,y,label])=><div key={id}>{text(Number(x)-21,Number(y),25,String(id))}{img('greeting-'+id,Number(x),Number(y),116,72)}{id==='e'||id==='b'?text(Number(x)+124,Number(y)+2,140,String(label),'nabExample'):field('15-'+id,Number(x)+124,Number(y)+2,125,'15'+id+' Gruß')}</div>)}
 {check('15',202,1450,{'15-a':'Gute Nacht','15-c':'Tschüs|Tschüss','15-d':'Auf Wiedersehen','15-f':'Guten Abend','15-mark-hallo':'true','15-mark-gutentag':'true','15-mark-aufwiedersehen':'true','15-mark-gutenacht':'true','15-mark-tschüs':'true','15-mark-gutenabend':'true'})}
 </>}
 {page==='9'&&<>
 {head('TRAINING: HÖREN')}<div className="nabModule">1</div>
 {title('1',220,'Wie heißt du?','','')}
 {text(170,261,800,'a  Ergänzen Sie in den Fragen: wie, woher oder wer?','nabTitle')}
 {text(202,302,350,'1  ■  Wie heißt du?')}{text(225,330,365,'▲  Mein Name ist Miguel Munoz.','nabExample')}{text(575,330,30,'/')}{text(596,330,25,'▲','nabGreen')}{field('1-answer-1',620,327,329,'1b Antwort 1')}
 {text(202,365,51,'2  ■')}{field('1-q2',250,359,105,'1a Frage 2')}{text(363,365,230,'kommst du?')}{text(225,393,25,'▲','nabGreen')}{field('1-answer-2a',250,390,320,'1b Antwort 2 kurz')}{text(575,393,30,'/')}{text(596,393,25,'▲','nabGreen')}{field('1-answer-2b',620,390,329,'1b Antwort 2 lang')}
 {text(202,428,100,'3  ■  Und')}{field('1-q3',291,422,108,'1a Frage 3')}{text(404,428,205,'ist das?')}{text(225,456,25,'▲','nabGreen')}{field('1-answer-3a',250,453,320,'1b Antwort 3 Name')}{text(575,456,30,'/')}{text(596,456,25,'▲','nabGreen')}{field('1-answer-3b',620,453,329,'1b Antwort 3 voller Name')}
 {text(202,491,225,'4  ■  Hallo, Frau Burgos.')}{field('1-q4',429,485,105,'1a Frage 4')}{text(540,491,190,'geht es Ihnen?')}{text(225,519,25,'▲','nabGreen')}{field('1-answer-4a',250,516,320,'1b Antwort 4 lang')}{text(575,519,30,'/')}{text(596,519,25,'▲','nabGreen')}{field('1-answer-4b',620,516,329,'1b Antwort 4 kurz')}
 {check('1a',202,552,{'1-q2':'Woher','1-q3':'wer','1-q4':'Wie'})}
 {text(170,591,820,'b  Ordnen Sie die passenden Antworten in a zu.','nabTitle')}
 {text(202,631,800,'Das ist Frau Burgos. | Gut, danke. Und Ihnen? | Aus Spanien. | Das ist Anna Burgos. | Ich heiße\nMiguel. | Ich komme aus Spanien. | Mein Name ist Miguel Munoz. | Danke, gut.','nabBank')}
 {check('1b',202,688,{'1-answer-1':'Ich heiße Miguel','1-answer-2a':'Aus Spanien','1-answer-2b':'Ich komme aus Spanien','1-answer-3a':'Das ist Frau Burgos','1-answer-3b':'Das ist Anna Burgos','1-answer-4a':'Gut, danke. Und Ihnen','1-answer-4b':'Danke, gut'})}
 {title('2',736,'Hören Sie und kreuzen Sie an.','','')}{listen('03',88,733)}{listen('04',88,755)}{listen('05',88,777)}
 {text(202,778,650,'a  Woher kommt Frau Talipa?')}
 {choice('2-a','oesterreich',222,815,'2a Österreich')}{img('austria',257,810,48,32)}{text(312,815,200,'aus Österreich')}{choice('2-a','spanien',446,815,'2a Spanien')}{img('spain',480,810,48,32)}{text(535,815,180,'aus Spanien')}{choice('2-a','russland',663,815,'2a Russland')}{img('russia',697,810,48,32)}{text(751,815,190,'aus Russland')}
 {text(202,861,650,'b  Wie geht es Laura?')}{choice('2-b','sehrgut',222,899,'2b Sehr gut')}{img('verygood',255,891,60,27)}{text(320,899,170,'Sehr gut.')}{choice('2-b','gut',446,899,'2b Gut')}{img('good',480,891,28,27)}{text(515,899,100,'Gut.')}{choice('2-b','esgeht',663,899,'2b Es geht')}{img('okay',696,891,28,27)}{text(731,899,140,'Es geht.')}
 {text(202,944,650,'c  Welcher Name passt?')}{choice('2-c','alioscha',222,982,'2c Alioscha')}{text(256,982,180,'Alioscha')}{choice('2-c','aliosha',446,982,'2c Aliosha')}{text(480,982,180,'Aliosha')}{choice('2-c','aljoscha',663,982,'2c Aljoscha')}{text(697,982,180,'Aljoscha')}
 {text(835,868,168,'Zuerst lesen -\ndann hören','nabTipTitle')}{text(835,919,168,'1. Lesen Sie zuerst\n   die Fragen.\n2. Hören Sie dann.','nabTip')}
 {check('2',202,1021,{'2-a':'oesterreich','2-b':'esgeht','2-c':'aljoscha'})}
 {text(160,1080,800,'TRAINING: AUSSPRACHE','nabHeader')}{text(570,1090,400,'Satzmelodie','nabExample')}
 {title('1',1140,'Hören Sie und sprechen Sie nach.','','')}{listen('06',95,1144)}
 {text(202,1183,435,'■  Wie heißt du? ↘\n▲  Ich heiße Paco. ↘  Und wer bist du? ↗\n■  Ich bin Nicole. ↘')}
 {title('2',1300,'Ergänzen Sie die Regel: ↗ oder ↘.','','')}
 {text(230,1344,360,'Wie ist die Satzmelodie ...?','nabBold')}{text(230,1377,400,'bei Aussagen (Ich heiße Paco.):')}{arrow('au2-a',575,1373,'2 Aussagen')}{text(230,1407,420,'bei W-Fragen (Wie heißt du?):')}{arrow('au2-w',575,1403,'2 W-Fragen')}{text(230,1437,430,'bei Rückfragen (Und wer bist du?):')}{arrow('au2-r',623,1433,'2 Rückfragen')}
 {check('au2',202,1471,{'au2-a':'down','au2-w':'down','au2-r':'up'})}
 <div className="nabNumber" style={{left:610,top:1140}}>3</div>{text(652,1140,390,'Hören Sie und ergänzen Sie ↘ oder ↗.\nSprechen Sie dann mit Ihrer Partnerin /\nIhrem Partner.','nabTitle')}{listen('07',565,1144)}
 {text(652,1235,190,'■  Hallo.')}{arrow('au3-hallo',760,1232,'3 Hallo')}
 {text(652,1267,175,'▲  Hallo, Paco.')}{arrow('au3-paco',814,1264,'3 Hallo Paco')}{text(860,1267,170,'Wie geht es dir?')}{arrow('au3-dir',1007,1264,'3 Wie geht es dir')}
 {text(652,1299,105,'■  Danke,')}{arrow('au3-danke',752,1296,'3 Danke')}{text(800,1299,50,'gut.')}{arrow('au3-gut',846,1296,'3 gut')}{text(893,1299,90,'Und dir?')}{arrow('au3-unddir',986,1296,'3 Und dir')}
 {check('au3',652,1343,{'au3-hallo':'down','au3-paco':'down','au3-dir':'down','au3-danke':'down','au3-gut':'down','au3-unddir':'up'})}
 </>}
 {page==='10'&&<>
 {head('TEST')}
 {title('1',220,'Was passt zusammen? Ordnen Sie zu.','','Wörter')}
 {text(202,264,810,'Abend | Morgen | Auf | Guten | Nacht | Gute | Guten | Wiedersehen | Tag | Guten','nabBank')}
 {text(202,307,200,'Guten Tag','nabExample')}{field('1-g1',409,307,210,'1 Gruß 1')}{field('1-g2',637,307,195,'1 Gruß 2')}{field('1-g3',202,337,195,'1 Gruß 3')}{field('1-g4',409,337,210,'1 Gruß 4')}
 {checkRule('1',202,365,()=>{const a=[1,2,3,4].map(n=>norm(v['1-g'+n]||''));return new Set(a).size===4&&['Guten Morgen','Guten Abend','Gute Nacht','Auf Wiedersehen'].every(s=>a.includes(norm(s)))})}
 {text(910,355,140,'/ 4 Punkte','nabPoints')}{title('2',395,'Was ist richtig? Kreuzen Sie an.','','Wörter')}
 {text(202,431,140,'■  Hallo, wer')}
 <input className="nabRadio" type="radio" style={{left:337,top:429}} checked disabled readOnly aria-label="2 Beispiel bist"/>{text(370,431,65,'bist')}
 <input className="nabRadio" type="radio" style={{left:437,top:429}} disabled aria-label="2 Beispiel kommst"/>{text(470,431,120,'kommst du?')}
 {text(202,458,60,'▲  Ich')}{choice('2-1a','bin',273,455,'2 Ich bin')}{text(307,458,45,'bin')}{choice('2-1a','komme',359,455,'2 Ich komme')}{text(393,458,185,'komme  Max.')}
 {text(202,484,125,'■  Und der')}{choice('2-1b','Familienname',325,481,'2 Familienname')}{text(359,484,200,'Familienname')}{choice('2-1b','Vorname',225,507,'2 Vorname')}{text(259,510,200,'Vorname?')}{text(202,538,280,'▲  Wachter.')}
 {choice('2-2a','Woher',602,429,'2 Woher')}{text(636,431,85,'Woher')}{choice('2-2a','Wie',727,429,'2 Wie')}{text(761,431,55,'Wie')}{text(825,431,180,'kommst du?')}
 {choice('2-2b','Aus',602,455,'2 Aus')}{text(636,458,50,'Aus')}{choice('2-2b','Aus dem',689,455,'2 Aus dem')}{text(723,458,114,'Aus dem')}{text(840,458,180,'Österreich.')}
 {text(575,484,82,'■  Und')}{choice('2-2c','was',663,481,'2 was')}{text(697,484,47,'was')}{choice('2-2c','wie',683,481,'2 wie')}{text(785,484,235,'wie  geht es dir?')}
 {choice('2-2d','Nein',602,507,'2 Nein')}{text(636,510,72,'Nein.')}{choice('2-2d','Sehr gut',710,507,'2 Sehr gut')}{text(744,510,200,'Sehr gut!')}
 {check('2',202,567,{'2-1a':'bin','2-1b':'Familienname','2-2a':'Woher','2-2b':'Aus','2-2c':'wie','2-2d':'Sehr gut'})}
 {text(910,572,140,'/ 6 Punkte','nabPoints')}{title('3',605,'Ergänzen Sie die Verben in der richtigen Form.','','Strukturen')}
 {text(202,635,390,'a  ■  Wie heißt du? (heißen)')}
 {text(226,659,55,'▲  Ich')}{field('3-a1',285,656,110,'3a Ich Marie')}{text(401,659,180,'Marie. (heißen)')}
 {text(226,683,135,'■  Und woher')}{field('3-a2',368,680,100,'3a kommst du')}{text(474,683,100,'du?')}{text(250,707,180,'(kommen)')}{text(226,731,265,'▲  Aus der Schweiz.')}
 {text(202,765,130,'b  ■  Und wie')}{field('3-b',340,762,100,'3b heißen Sie')}{text(446,765,190,'Sie? (heißen)')}{text(226,789,300,'▲  Juana Weinrich.')}
 {text(635,635,100,'▲  Woher')}{field('3-c1',740,632,96,'3 Woher kommen Sie')}{text(843,635,210,'Sie? (kommen)')}
 {text(635,659,55,'■  Ich')}{field('3-c2',697,656,101,'3 Ich komme')}{text(805,659,240,'aus Deutschland.')}{text(660,683,190,'(kommen)')}
 {text(607,715,102,'c  ▲  Wer')}{field('3-d1',715,712,115,'3c bist du')}{text(837,715,190,'du? (sein)')}
 {text(635,739,55,'■  Ich')}{field('3-d2',697,736,107,'3c bin Paco')}{text(811,739,200,'Paco. (sein)')}
 {text(607,771,105,'d  ▲  Wer')}{field('3-e1',718,768,110,'3d ist das')}{text(834,771,190,'das? (sein)')}
 {text(635,795,191,'■  Frau Delgado. Sie')}{field('3-e2',835,792,115,'3d kommt aus Spanien')}{text(660,821,330,'aus Spanien. (kommen)')}
 {check('3',202,854,{'3-a1':'heiße','3-a2':'kommst','3-b':'heißen','3-c1':'kommen','3-c2':'komme','3-d1':'bist','3-d2':'bin','3-e1':'ist','3-e2':'kommt'})}
 {text(910,857,140,'/ 9 Punkte','nabPoints')}{title('4',893,'Ergänzen Sie.','','Kommunikation')}
 {text(202,934,390,'a  ■  Hallo Susan, wie geht es dir?','nabExample')}
 {text(225,966,28,'▲','nabGreen')}{field('4-response1',255,963,211,'4a Antwort 1')}{img('good',480,963,28,27)}
 {text(250,995,50,'Und')}{field('4-dir',298,992,130,'4a dir')}{text(435,995,100,'? (du)')}
 {text(225,1024,28,'■')}{field('4-response2',255,1021,230,'4a Antwort 2')}{img('verygood',879,1021,60,27)}
 {text(607,934,395,'b  ■  Guten Morgen Herr Bux,')}{field('4-question',660,963,267,'4b Frage')}{text(932,966,25,'?')}
 {text(635,995,28,'▲','nabGreen')}{field('4-response3',665,992,283,'4b Antwort 1')}{img('bad',957,991,28,27)}
 {text(660,1021,50,'Und')}{field('4-Ihnen',711,1018,149,'4b Ihnen')}{text(867,1021,100,'? (Sie)')}
 {text(635,1053,28,'■')}{field('4-response4',665,1050,200,'4b Antwort 2')}{img('verygood',879,1050,60,27)}
 {check('4',202,1085,{'4-dir':'dir','4-Ihnen':'Ihnen'})}{text(400,1092,600,'Prüfen: dir / Ihnen. Freie Antworten werden gespeichert.','nabSmall')}
 {text(910,1088,140,'/ 7 Punkte','nabPoints')}{title('5',1126,'Ordnen Sie und schreiben Sie Gespräche.','','Kommunikation')}
 {text(202,1167,810,'Hallo, ich heiße Oborowski. | Ich komme aus Italien, und du? | Ich heiße Johanna. |\nSind Sie Frau Rode? | Aus der Türkei. | Wie bitte? Obolanski? | Wie geht’s? | Nein,\nmein Name ist Koch. | Sehr gut. Und dir? | Ich bin Elisa, und du?','nabBank')}
 {text(202,1250,245,'■  Ich bin Elisa, und du?\n▲  Ich heiße Johanna.','nabExample')}
 {[2,3,4,5].map((n,i)=>{const x=i%2?750:445,y=i<2?1248:1315;return <div key={n}>{text(x-25,y,25,'■')}{field('5-'+n+'a',x,y-3,255,'5 Gespräch '+n+' erste Zeile')}{text(x-25,y+29,25,'▲','nabGreen')}{field('5-'+n+'b',x,y+26,255,'5 Gespräch '+n+' zweite Zeile')}</div>})}
 {checkRule('5',202,1379,()=>{const pairs=[['Hallo, ich heiße Oborowski.','Wie bitte? Obolanski?'],['Ich komme aus Italien, und du?','Aus der Türkei.'],['Sind Sie Frau Rode?','Nein, mein Name ist Koch.'],['Wie geht’s?','Sehr gut. Und dir?']].map(p=>p.map(norm).join('~'));const actual=[2,3,4,5].map(n=>[v['5-'+n+'a']||'',v['5-'+n+'b']||''].map(norm).join('~'));return new Set(actual).size===4&&actual.every(p=>pairs.includes(p))})}
 {text(910,1379,140,'/ 8 Punkte','nabPoints')}<div className="nabScore" style={{left:202,top:1409}}><b>Wörter</b><b>Strukturen</b><b>Kommunikation</b>{[['0-5 Punkte','0-4 Punkte','0-7 Punkte'],['6-7 Punkte','5-7 Punkte','8-12 Punkte'],['8-10 Punkte','8-9 Punkte','13-15 Punkte']].map((row,r)=>row.map((label,c)=><div key={r+'-'+c}><i style={{background:['#d71a13','#edce09','#2c9d27'][r]}}/>{label}</div>))}</div>{text(480,1485,420,'www.hueber.de/menschen/lernen','nabSmall')}
 </>}
 {page==='11'&&<>
 {head('LERNWORTSCHATZ')}<div className="nabModule">1</div>
 {title('1',235,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.','','')}
 {text(202,280,360,'Begrüßung und Abschied','nabBold')}
 {[
 ['Hallo',315],['Guten Morgen',393],['Guten Tag',419],['Guten Abend',471],['Gute Nacht',497],['Auf Wiedersehen',523],['Tschüs',575],['Ich heiße /',704],['Ich bin ...',730],['Mein Name ist ...',756],['Das ist ...',782],['Wer ...?',820],['Wie ...?',846],['Frau die, -en',920],['Herr der, -en',946],['Name der, -n',972],['Vorname der, -n',998],['Familienname',1024]
 ].map(([s,y],i)=><div key={String(s)}>{text(202,Number(y),250,String(s))}{field('wort-l'+i,371,Number(y)+1,180,'1 Übersetzung '+s)}</div>)}
 {text(215,341,350,'A: auch: Servus / Grüß dich','nabSmall')}{text(215,367,350,'CH: auch: Hoi / Sali / Salü','nabSmall')}{text(215,445,350,'A: Grüß Gott / CH: Grüezi','nabSmall')}{text(215,549,350,'CH: Adieu','nabSmall')}{text(215,601,350,'A: Servus / Baba','nabSmall')}{text(215,627,350,'CH: Adieu / Ade / Adie','nabSmall')}
 {text(202,676,300,'Name','nabBold')}{text(202,892,300,'Personalien','nabBold')}{text(215,1050,250,'der, -n')}
 {text(582,280,300,'Herkunft','nabBold')}{text(582,427,300,'Länder','nabBold')}{text(582,590,300,'Befinden','nabBold')}{text(582,778,350,'Weitere wichtige Wörter','nabBold')}
 {[
 ['Woher ...?',315],['kommen aus ...',354],['aus ...',393],['Land das, ¨-er',458],['Deutschland',484],['Österreich',510],['Schweiz die',536],['Wie geht’s?',621],['sehr gut',660],['gut',686],['es geht',712],['nicht so gut',738],['Alphabet das, -e',809],['buchstabieren',848],['auch',887],['danke',913],['ja',939],['nein',965],['sehr',991],['und',1017]
 ].map(([s,y],i)=><div key={String(s)}>{text(582,Number(y),230,String(s))}{field('wort-r'+i,725,Number(y)+1,193,'1 Übersetzung '+s)}</div>)}
 {[['hello',236,110],['greet',415,98],['how',602,102],['evening',750,110],['night',921,121],['bye',1104,119],['shake',1313,91]].map(([name,y,h],i)=><div key={String(name)}>{img('cartoon-'+name,941,Number(y),134,Number(h))}{field('bild-'+i,963,Number(y)+Number(h)+16,108,'1 Bildwort '+(i+1))}</div>)}
 {text(430,1081,185,'Lernen Sie Fragen\nund Antworten\nzusammen.','nabTip')}{text(595,1112,300,'Wie geht es dir? - Danke, gut.\nWie heißen Sie? - Ich bin ...','nabExample')}
 {title('2',1180,'Welche Wörter möchten Sie noch lernen? Notieren Sie.','','')}
 {open('eigene-woerter',202,1226,715,170,'2 Weitere Wörter und Notizen')}
 </>}
 {text(Number(page)%2?991:50,1485,80,'Modul 1','nabFooter')}{text(Number(page)%2?920:130,1485,500,page+'  |  '+({'6':'sechs','7':'sieben','8':'acht','9':'neun','10':'zehn','11':'elf'} as Record<string,string>)[page],'nabFooter')}
 </div><audio ref={audio} className="nabPlayer" controls hidden={!track} aria-label="Originalaudio Arbeitsbuch"/></div>
}
