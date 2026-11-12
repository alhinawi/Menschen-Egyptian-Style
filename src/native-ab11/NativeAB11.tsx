import {useLayoutEffect,useRef,useState} from 'react';
import './native-ab11.css';
const norm=(s:string)=>s.normalize('NFC').toLocaleLowerCase('de').trim().replace(/[.!?]+$/,'').replace(/\s+/g,' ');
function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\S/.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-phrase={text} data-word={w.replace(/^[.,!?„"()]+|[.,!?“"()]+$/g,'')}>{w}</span>:w)}</>}
export function NativeAB11({page}:{page:string}){
 const key='native-ab11-'+page, host=useRef<HTMLDivElement>(null);
 const [scale,SS]=useState(1),[v,S]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}}),[graded,G]=useState<Record<string,boolean>>({}),[active,A]=useState('');
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const measure=()=>SS(Math.min(el.clientWidth/1075,el.clientHeight/1521));measure();const ro=new ResizeObserver(measure);ro.observe(el);return ()=>ro.disconnect()},[]);
 const set=(id:string,value:string)=>{const n={...v,[id]:value};S(n);localStorage.setItem(key,JSON.stringify(n));G({})};
 const text=(x:number,y:number,w:number,s:string,cls='')=><div className={'nabText '+cls} style={{left:x,top:y,width:w}}><Words text={s}/></div>;
 const img=(name:string,x:number,y:number,w:number,h:number)=><img className="nabArt" src={`assets/native-ab11/p${page}-${name}.png`} alt={'Originalabbildung '+name} style={{left:x,top:y,width:w,height:h}}/>;
 const field=(id:string,x:number,y:number,w:number,label:string,cls='')=><input className={'nabInput '+cls} style={{left:x,top:y,width:w}} aria-label={label} data-native-field={id} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const open=(id:string,x:number,y:number,w:number,h:number,label:string)=><textarea className="nabInput nabOpen" style={{left:x,top:y,width:w,height:h}} aria-label={label} data-native-field={id} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const choice=(id:string,value:string,x:number,y:number,label:string)=><input type="radio" className="nabRadio" style={{left:x,top:y}} name={key+'-'+id} aria-label={label} checked={v[id]===value} onChange={()=>set(id,value)}/>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="nabCheck" style={{left:x,top:y}} data-native-task={id}><button onClick={()=>G({...graded,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}>Prüfen ✓</button><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const title=(n:string,y:number,s:string,kb:string,side='Strukturen')=><>{text(130,y+7,40,kb,'nabKB')}<div className="nabNumber" style={{left:170,top:y}}>{n}</div>{text(212,y,810,s,'nabTitle')}<div className="nabSide" style={{left:141,top:y+45}}>{side}</div></>;
 const head=(s:string)=><>{text(160,142,750,s,'nabHeader')}<div className="nabHeaderLine"/></>;
 return <div className="nativeAB11" ref={host} data-native-ab11-page={page}><div className="nabCanvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='6'&&<>
 {img('cover',70,115,330,78)}<div className="nabBanner" style={{left:400,top:115,width:613,height:78}}/>{text(488,135,520,'Hallo! Ich bin Nicole ...','nabCoverTitle')}
 {title('1',250,'Ordnen Sie zu.','KB 2')}{text(218,291,620,'heiße | du | Hallo | heißt | ich | ich | wer | wie','nabBank')}
 {text(213,331,390,'■  Hallo! Ich bin Wiebke. Und')}{field('1-wer',468,332,82,'1a Und wer')}{text(238,357,55,'bist')}{field('1-du',275,358,110,'1a bist du')}{text(386,357,25,'?')}
 {text(213,383,28,'▲','nabGreen')}{field('1-hallo',240,383,95,'1a Hallo')}{text(336,383,15,',')}{field('1-ich',348,383,75,'1a ich')}{text(423,383,200,'bin Stefan.')}
 {text(600,332,235,'■  Ich heiße René. Und')}{field('1-wie',806,333,80,'1b wie')}{field('1-heisst',624,357,112,'1b heißt')}{text(740,357,70,'du?')}{text(600,383,66,'▲  Ich')}{field('1-heisse',660,383,128,'1b heiße')}{text(793,383,110,'Alfred.')}
 {check('1',215,416,{'1-wer':'wer','1-du':'du','1-hallo':'Hallo','1-ich':'ich','1-wie':'wie','1-heisst':'heißt','1-heisse':'heiße'})}
 {title('2',447,'Sortieren Sie.','KB 3','Kommunikation')}{img('dialogue',689,442,331,222)}
 {['Ja, ich komme aus Deutschland.\nUnd woher kommst du, Roberto? Aus Portugal?','Aus Brasilien? Wow!','Ich heiße Melanie.','Nein, ich komme aus Brasilien.','Hallo! Ich heiße Roberto, und wer bist du?','Und woher kommst du? Aus Deutschland?'].map((s,i)=>{const y=[485,537,562,587,613,639][i];return <div key={i}>{field('2-'+i,214,y-3,28,'2 Satz '+(i+1),'nabCircle')}{text(247,y,450,s)}</div>})}
 {check('2',215,671,{'2-0':'4','2-1':'6','2-2':'2','2-3':'5','2-4':'1','2-5':'3'})}
 {title('3',708,'Ordnen Sie zu.','KB 3')}
 <svg className="nabLines" width="1075" height="1521" aria-hidden="true"><path d="M278 752 C400 752,320 830,443 830"/>{Object.entries(v).filter(([k])=>k.startsWith('3-')).map(([k,val])=><path key={k} d={`M400 ${750+Number(k.slice(2))*26} C422 ${750+Number(k.slice(2))*26},420 ${750+Number(val)*26},446 ${750+Number(val)*26}`}/>)}</svg>
 {['Wie','Ich heiße','Woher','Ich komme','Wer','Ich'].map((s,i)=><button key={s} className={'nabMatch '+(active===''+i?'isActive':'')} style={{left:237,top:737+i*26,width:162}} onClick={()=>A(''+i)} disabled={i===0} aria-label={'3 links '+String.fromCharCode(97+i)+' '+s}>{String.fromCharCode(97+i)}  {s}</button>)}
 {['bin Pedro.','kommst du?','aus der Schweiz.','heißt du?','bist du?','Sandra.'].map((s,i)=><button key={s} className="nabMatch" style={{left:449,top:737+i*26,width:210}} onClick={()=>{if(active&&active!=='0'){set('3-'+active,''+i);A('')}}} aria-label={'3 rechts '+s}>{s}</button>)}
 {check('3',215,900,{'3-1':'5','3-2':'1','3-3':'2','3-4':'4','3-5':'0'})}
 {title('4',935,'Ergänzen Sie.','KB 3')}
 {text(214,979,330,'a  ■  Hallo! Ich bin Simon.')}{field('4-wie',443,979,125,'4a Wie')}{text(258,1005,160,'heißt du?')}
 {text(235,1031,65,'▲  Ich','nabGreen')}{field('4-heisse',295,1031,126,'4a heiße')}{text(431,1031,75,'Steffi.')}
 {text(235,1057,65,'■  Und')}{field('4-woher',300,1057,137,'4a woher')}{text(442,1057,95,'kommst')}{field('4-du',258,1083,132,'4a du')}{text(394,1083,176,'? Aus Österreich?')}
 {text(235,1109,100,'▲  Nein, ich')}{field('4-komme',337,1109,130,'4a komme')}{text(475,1109,70,'aus')}{text(259,1135,250,'Deutschland.')}
 {text(607,979,260,'b  ■  Hallo! Ich bin Sofia,')}{field('4-und',834,979,130,'4b und')}{text(661,1005,40,'wer')}{field('4-bist',705,1005,121,'4b bist')}{text(831,1005,55,'du?')}
 {text(635,1031,24,'▲','nabGreen')}{field('4-ich',661,1031,128,'4b Ich')}{text(793,1031,170,'heiße Philipp.')}
 {text(635,1057,121,'■  Und woher')}{field('4-kommst',760,1057,125,'4b kommst')}{text(889,1057,55,'du?')}
 {text(635,1083,120,'▲  Ich komme')}{field('4-aus',760,1083,125,'4b aus')}{text(889,1083,150,'der Schweiz.')}
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
 {text(page==='7'?991:50,1485,80,'Modul 1','nabFooter')}{text(page==='7'?920:130,1485,500,page+'  |  '+({'6':'sechs','7':'sieben'} as Record<string,string>)[page],'nabFooter')}
 </div></div>
}
