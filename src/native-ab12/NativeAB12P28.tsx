import {CheckButton} from '../components/CheckButton';
import {PageImage} from '../components/PageImage';
import {usePageReset} from '../exercises/usePageReset';
import {useLayoutEffect,useRef,useState} from 'react';
import '../components/native-ab12.css';
import './native-ab12-p18-29.css';
import './native-ab12-p28.css';

function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\p{L}/u.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-word={w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text}>{w}</span>:w)}</>}

export function NativeAB12P28({page}:{page:string}){
 const W=1071,H=1452;
 const root=useRef<HTMLDivElement>(null);
 const [scale,ss]=useState(.6);const key='native-ab12-'+page;
 const [values,sv]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});
 const [results,sr]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=root.current!;const obs=new ResizeObserver(()=>ss(Math.min(el.clientWidth/W,(el.clientHeight-38)/H)));obs.observe(el);return ()=>obs.disconnect()},[]);
 usePageReset(page,key,()=>{sv({});sr({})});
 const set=(id:string,v:string)=>{const n={...values,[id]:v};sv(n);localStorage.setItem(key,JSON.stringify(n))};
 const text=(x:number,y:number,w:number,t:string,cls='')=><div className={'naText '+cls} style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const stext=(x:number,y:number,w:number,t:string,cls='')=><div className={'naSans2 '+cls} style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="naArt" src={`assets/book-crops/native-ab12-p${page}-${name}.png`} alt={'Originalillustration '+name} style={{left:x,top:y,width:w,height:h}}/>;
 const field=(id:string,x:number,y:number,w:number,label:string)=><input className="naField" aria-label={label} data-native-field={id} style={{left:x,top:y,width:w}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>;
 const dot=(id:string,value:string,x:number,y:number,label:string)=><input type="radio" className="naDot" name={key+'-'+id} aria-label={label} data-native-field={id} value={value} style={{left:x,top:y}} checked={values[id]===value} onChange={()=>set(id,value)}/>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="naCheck" data-check={id} style={{left:x,top:y}}><CheckButton onClick={()=>sr({...results,[id]:Object.entries(answers).every(([k,a])=>values[k]===a)})}></CheckButton><output aria-live="polite">{id in results?(results[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const cols=[198,362,519,780],cws=[148,142,245,265],rows=['B','C','D','E'],ry=[369,400,431,462];
 const gridRows:[string,string][]=[['a','Ich finde deinen Blog sehr gut.'],['b','Ich kenne München.'],['c','Ich finde die Maxvorstadt und das Lehel super.'],['d','Ich suche bald eine Wohnung in München.'],['e','Ich möchte vielleicht in Giesing wohnen.']];

 return <div className="nativeAB12" ref={root} data-native-ab12={page}><style>{`@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-700.woff2') format('woff2');font-weight:700}@font-face{font-family:DroidSerif;src:url('assets/fonts/droid-serif-400.ttf') format('truetype');font-weight:400;font-display:swap}@font-face{font-family:DroidSerif;src:url('assets/fonts/droid-serif-700.woff2') format('woff2');font-weight:700;font-display:swap}`}</style><div className="naCanvas" style={{width:W,height:H,marginLeft:-W/2,marginTop:-H/2,transform:`scale(${scale})`}}>
  {text(129,71,350,'RÜCKBLICK','naRueck')}
  {stext(125,159,390,'Wählen Sie eine Aufgabe zu Lektion','naWahl')}{art('yel14',510,161,32,23)}<div className="naYelRule" style={{left:550,top:181,width:440,height:3}}/>
  {art('icons1',78,218,88,38)}
  {stext(169,221,760,'Lesen Sie noch einmal die Anzeigen im Kursbuch auf Seite 15 und ergänzen','naItem')}
  {stext(169,251,300,'Sie die Tabelle.','naItem')}
  <div className="naTh" style={{left:190,top:288,width:794,height:28}}/>
  {stext(199,292,150,'Zimmer','naThT')}{stext(363,292,140,'Größe','naThT')}{stext(520,292,240,'Was gibt es noch?','naThT')}{stext(782,292,150,'Kosten','naThT')}
  {[354,511,772].map(x=><div key={x} className="naVsep" style={{left:x,top:288,width:1,height:205}}/>)}
  {[366,398,429,460,491].map(y=><div key={y} className="naHrule" style={{left:190,top:y,width:793,height:1}}/>)}
  <div className="naFrame" style={{left:188,top:288,width:1,height:205}}/><div className="naFrame" style={{left:983,top:288,width:1,height:205}}/>
  {rows.map((r,i)=><div key={r} className="naRowLab" style={{left:158,top:374+i*31}}>{r}</div>)}
  <div className="naRowLab" style={{left:158,top:333}}>A</div>
  {art('hwrowa',195,318,760,48)}
  {rows.map((r,i)=>cols.map((c,j)=><input key={'t'+r+(j+1)} className="naField naFieldT" aria-label={'Tabelle '+r+(j+1)} data-native-field={'t'+r+(j+1)} style={{left:c,top:ry[i],width:cws[j]}} value={values['t'+r+(j+1)]||''} onChange={e=>set('t'+r+(j+1),e.target.value)} autoComplete="off" spellCheck={false}/>))}
  {art('icons2',78,518,88,36)}
  {stext(169,521,600,'Sie suchen Ihr Traumhaus. Schreiben Sie eine Anzeige.','naItem')}
  {art('hwtraum',175,570,370,128)}
  {stext(125,753,390,'Wählen Sie eine Aufgabe zu Lektion','naWahl')}{art('yel15',509,755,32,24)}<div className="naYelRule" style={{left:545,top:776,width:445,height:3}}/>
  {art('icons3',78,804,88,38)}
  {stext(169,806,620,'Welche Sätze passen zu Claudia, welche passen zu Teddybär?','naItem')}
  {stext(169,833,700,'Lesen Sie noch einmal die Kommentare zu Marlenes Blog im Kursbuch auf Seite 18','naBody')}
  {stext(169,859,200,'und kreuzen Sie an.','naBody')}
  {stext(657,888,80,'Claudia','naGridH')}{stext(763,888,90,'Teddybär','naGridH')}
  {gridRows.map(([id,tx],i)=><div key={id}>
    <div className="naSans2" style={{left:160,top:917+i*27.5,width:28}}><Words text={id}/></div>
    {stext(195,917+i*27.5,440,tx)}
    {dot('g'+id,'C',674,913+i*27.5,'Satz '+id+' Claudia')}{dot('g'+id,'T',786,913+i*27.5,'Satz '+id+' Teddybär')}
  </div>)}
  {check('grid',850,1018,{ga:'C',gb:'T',gc:'T',gd:'C',ge:'C'})}
  {art('icons4',78,1076,88,36)}
  {stext(169,1076,700,'Schreiben Sie einen Kommentar zu Marlenes Blog im Kursbuch auf Seite 18.','naItem')}
  {stext(169,1103,700,'Möchten Sie in Giesing wohnen? Warum / Warum nicht? Machen Sie erst Notizen.','naBody')}
  {stext(179,1157,230,'Das gefällt mir in Giesing:')}{field('n1',378,1153,570,'Notiz 1')}
  {stext(179,1183,290,'Das gefällt mir nicht so gut in Giesing:')}{field('n2',473,1179,475,'Notiz 2')}
  {stext(179,1209,230,'Das möchte ich noch wissen:')}{field('n3',404,1205,544,'Notiz 3')}
  {field('a1',140,1243,290,'Name')}{stext(444,1248,40,'aus','naIt')}{field('a2',478,1243,165,'Stadt')}{stext(655,1248,160,'hat geschrieben:','naIt')}
  {stext(220,1282,120,'Hallo Marlene!')}{field('h1',336,1274,650,'Kommentar Zeile 1')}
  {field('h2',219,1301,767,'Kommentar Zeile 2')}
  {field('h3',219,1326,767,'Kommentar Zeile 3')}
  {art('modul',0,1389,95,26)}{text(98,1394,30,'28','naFooter naFootNum')}<div className="naBarV" style={{left:150,top:1397,width:1,height:10}}/>{text(155,1391,150,'achtundzwanzig','naFooter')}
 </div></div>;
}
