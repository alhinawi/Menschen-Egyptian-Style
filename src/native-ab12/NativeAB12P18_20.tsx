import {usePageReset} from '../exercises/usePageReset';
import {useLayoutEffect,useRef,useState} from 'react';
import '../components/native-ab12.css';
import './native-ab12-p18-29.css';

function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\p{L}/u.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-word={w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text}>{w}</span>:w)}</>}
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\s+/g,' ');

export function NativeAB12P18_20({page}:{page:string}){
 const W=1071,H=1452;
 const root=useRef<HTMLDivElement>(null),player=useRef<HTMLAudioElement>(null);
 const [scale,ss]=useState(.6);const key='native-ab12-'+page;
 const [values,sv]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});
 const [results,sr]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=root.current!;const obs=new ResizeObserver(()=>ss(Math.min(el.clientWidth/W,(el.clientHeight-38)/H)));obs.observe(el);return ()=>obs.disconnect()},[W,H]);
 usePageReset(page,key,()=>{sv({});sr({})});
 const set=(id:string,v:string)=>{const n={...values,[id]:v};sv(n);localStorage.setItem(key,JSON.stringify(n))};
 const text=(x:number,y:number,w:number,t:string,cls='')=><div className={'naText '+cls} style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><img className="naArt" src={`assets/book-crops/native-ab12-p${page}-${name}.png`} alt={'Originalillustration '+name} style={{left:x,top:y,width:w,height:h}}/>;
 const field=(id:string,x:number,y:number,w:number,label:string,cls='')=><input className={'naField '+cls} aria-label={label} data-native-field={id} style={{left:x,top:y,width:w}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>;
 const rule=(x:number,y:number,w:number)=><div className="naRule" style={{left:x,top:y,width:w}}/>;
 const circle=(id:string,x:number,y:number,label:string)=><input className="naCNum" aria-label={label} data-native-field={id} style={{left:x,top:y}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false} inputMode="numeric" maxLength={1}/>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>,cls='')=><div className={'naCheck '+cls} data-check={id} style={{left:x,top:y}}><button onClick={()=>sr({...results,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(v=>normalize(v)===normalize(values[k]||(a==='false'?'false':''))))})}>Prüfen ✓</button><output aria-live="polite">{id in results?(results[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const title=(n:string,x:number,y:number,w:number,t:string,cls='')=><div className={'naTitle '+cls} style={{left:x,top:y,width:w}}><b>{n}</b><Words text={t}/></div>;
 const kb=(x:number,y:number,t:string)=><div className="naKB" style={{left:x,top:y}}>{t}</div>;
 const audio=(src:string,x:number,y:number,label:string)=><button className="naAudio" style={{left:x,top:y}} aria-label={'Originalaudio '+label+' abspielen'} onClick={()=>{if(player.current){player.current.src=src;player.current.play().catch(()=>{})}}}>▶ {label}</button>;

 return <div className="nativeAB12" ref={root} data-native-ab12={page}><style>{"@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-400.woff2') format('woff2');font-weight:400}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-700.woff2') format('woff2');font-weight:700}"}</style><div className={'naCanvas'+(W<1000?' naNarrow':'')} style={{width:W,height:H,transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='18'&&<>
  {art('head-photo',6,38,348,81)}
  <div style={{position:'absolute',left:354,top:38,width:621,height:81,background:'#fbd479'}}/>
  <div className="naText" style={{left:417,top:56,width:520,fontFamily:"FiraSans,'Trebuchet MS',sans-serif",fontWeight:700,fontSize:34,color:'#2b1608'}}><Words text="In Giesing wohnt das Leben!"/></div>
  {kb(78,160,'KB 3')}
  {title('1',125,156,600,'Wo sind die Personen?','naOB naNw')}
  <div className="naSide" style={{left:55,top:225}}>WÖRTER</div>
  {audio('assets/ab-a12-cd2-track10.mp3',38,216,'2 10')}
  {art('globe',70,240,42,42)}
  {text(125,216,20,'a','naExL')}
  {text(161,214,400,'Hören Sie und nummerieren Sie.')}
  {circle('p18-nKirche',154,253,'Kirche Nummer')}
  {circle('p18-nSpielplatz',249,253,'Spielplatz Nummer')}
  <div className="naCNumPrint" style={{left:373,top:253}}>1</div>
  {circle('p18-nWald',491,253,'Wald Nummer')}
  {circle('p18-nMeer',573,253,'Meer Nummer')}
  {circle('p18-nCafé',664,253,'Café Nummer')}
  {circle('p18-nHafen',739,253,'Hafen Nummer')}
  {text(186,253,60,'Kirche')}
  {text(281,253,90,'Spielplatz')}
  {text(407,253,90,'Flughafen')}
  {text(523,253,55,'Wald')}
  {text(605,253,55,'Meer')}
  {text(696,253,40,'Café')}
  {text(771,253,55,'Hafen')}
  {check('g1',850,242,{'p18-nKirche':'3','p18-nSpielplatz':'2','p18-nWald':'6','p18-nMeer':'5','p18-nCafé':'7','p18-nHafen':'4'},'naCheckCol')}
  {text(125,302,20,'b','naExL')}
  {text(161,302,500,'Ergänzen Sie aus a. Notieren und vergleichen Sie.')}
  <div style={{position:'absolute',left:150,top:338,width:825,height:29,background:'#f0ead6'}}/>
  {text(159,341,200,'Deutsch','naTh')}
  {text(451,341,150,'Englisch','naTh')}
  {text(648,341,320,'Meine Sprache oder andere Sprachen','naTh naNw')}
  {[372,405,437,470,502,535,567].map(y=><div key={y} className="naTRule" style={{left:150,top:y,width:825}}/>)}
  {art('hint-1',155,368,290,30)}
  {art('hint-2',155,397,290,30)}
  {art('hint-3',155,430,290,30)}
  {art('hint-4',155,459,290,30)}
  {art('hand-meer',155,489,290,30)}
  {art('hint-6',155,518,290,30)}
  {art('hand-wald',155,545,290,30)}
  {field('p18-dCafé',158,368,285,'café auf Deutsch','naFieldBlank')}
  {field('p18-dHafen',158,397,285,'harbour auf Deutsch','naFieldBlank')}
  {field('p18-dFlughafen',158,430,285,'airport auf Deutsch','naFieldBlank')}
  {field('p18-dKirche',158,459,285,'church auf Deutsch','naFieldBlank')}
  {field('p18-dSpielplatz',158,518,285,'playground auf Deutsch','naFieldBlank')}
  {text(451,370,150,'café')}
  {text(451,399,150,'harbour')}
  {text(451,432,150,'airport')}
  {text(451,461,150,'church')}
  {text(451,491,150,'sea')}
  {text(451,520,150,'playground')}
  {text(451,549,150,'forest')}
  {[370,399,432,461,491,520,549].map((y,i)=>field('p18-ms'+(i+1),650,y,315,'Meine Sprache Zeile '+(i+1),'naFieldBlank'))}
  {check('g2',150,582,{'p18-dCafé':'Café','p18-dHafen':'Hafen','p18-dFlughafen':'Flughafen','p18-dKirche':'Kirche','p18-dSpielplatz':'Spielplatz'})}
  {kb(78,610,'KB 3')}
  {title('2',125,606,600,'Was ist das? Ergänzen Sie.','naOB naNw')}
  <div className="naSide" style={{left:55,top:650}}>WÖRTER</div>
  <div className="naBank" style={{left:165,top:652}}>
   <span className="tapWord" role="button" tabIndex={0} data-word="Kin" data-phrase="Kin">Kin</span>{' | '}
   <span className="tapWord" role="button" tabIndex={0} data-word="me" data-phrase="me">me</span>{' | '}
   <span className="tapWord" role="button" tabIndex={0} data-word="ge" data-phrase="ge">ge</span>{' | '}
   <span className="tapWord" role="button" tabIndex={0} data-word="Ber" data-phrase="Ber">Ber</span>{' | '}
   <span className="tapWord" role="button" tabIndex={0} data-word="Ju" data-phrase="Ju">Ju</span>{' | '}
   <span className="tapWord" role="button" tabIndex={0} data-word="no" data-phrase="no">no</span>{' | '}
   <span className="tapWord" role="button" tabIndex={0} data-word="gend" data-phrase="gend">gend</span>{' | '}
   <span className="tapWord" role="button" tabIndex={0} data-word="her" data-phrase="her">her</span>{' | '}
   <span className="tapWord" role="button" tabIndex={0} data-word="Bäu" data-phrase="Bäu">Bäu</span>{' | '}
   <span className="tapWord" role="button" tabIndex={0} data-word="ge" data-phrase="ge">ge</span>{' | '}
   <span className="tapWord" role="button" tabIndex={0} data-word="Rat" data-phrase="Rat">Rat</span>{' | '}
   <span className="tapWord" role="button" tabIndex={0} data-word="haus" data-phrase="haus">haus</span>{' | '}
   <span className="tapWord" role="button" tabIndex={0} data-word="Ki" data-phrase="Ki">Ki</span>{' | '}
   <b className="naBankB"><span className="tapWord" role="button" tabIndex={0} data-word="der" data-phrase="der">der</span></b>{' | '}
   <b className="naBankB"><span className="tapWord" role="button" tabIndex={0} data-word="gar" data-phrase="gar">gar</span></b>{' | '}
   <span className="tapWord" role="button" tabIndex={0} data-word="ber" data-phrase="ber">ber</span>{' | '}
   <b className="naBankB"><span className="tapWord" role="button" tabIndex={0} data-word="ten" data-phrase="ten">ten</span></b>{' | '}
   <span className="tapWord" role="button" tabIndex={0} data-word="ge" data-phrase="ge">ge</span>
  </div>
  {text(163,698,20,'a')}
  {text(163,810,20,'b')}
  {text(442,698,20,'c')}
  {text(442,810,20,'d')}
  {text(697,693,20,'e')}
  {text(697,808,20,'f')}
  {art('photo-a',231,693,110,70)}
  {art('photo-b',237,812,103,68)}
  {art('photo-c',495,695,104,66)}
  {art('photo-d',490,810,106,68)}
  {art('photo-e',776,690,138,76)}
  {art('photo-f',725,803,106,66)}
  {art('hand-kindergarten',183,770,112,28)}
  {rule(185,800,205)}
  {rule(185,906,205)}
  {rule(448,802,203)}
  {rule(448,906,203)}
  {rule(694,802,201)}
  {rule(694,906,201)}
  {field('p18-2b',187,878,203,'Bild b','naFieldBlank')}
  {field('p18-2c',448,774,201,'Bild c','naFieldBlank')}
  {field('p18-2d',448,878,201,'Bild d','naFieldBlank')}
  {field('p18-2e',694,774,199,'Bild e','naFieldBlank')}
  {field('p18-2f',694,878,199,'Bild f','naFieldBlank')}
  {check('g3',905,872,{'p18-2b':'Rathaus','p18-2c':'Jugendherberge','p18-2d':'Kino','p18-2e':'Bäume','p18-2f':'Berge'},'naCheckCol')}
  {kb(78,937,'KB 3')}
  {title('3',125,933,600,'Wo bin ich? Notieren Sie.','naOB naNw')}
  {art('bubble',690,925,170,52)}
  <div className="naSide" style={{left:55,top:975}}>WÖRTER</div>
  <div className="naBank" style={{left:171,top:978}}>
   <span className="tapWord" role="button" tabIndex={0} data-word="Park" data-phrase="Park">Park</span>{' | '}
   <b className="naBankB"><span className="tapWord" role="button" tabIndex={0} data-word="Geschäft" data-phrase="Geschäft/Laden">Geschäft</span><span className="tapWord" role="button" tabIndex={0} data-word="Laden" data-phrase="Geschäft/Laden">/Laden</span></b>{' | '}
   <span className="tapWord" role="button" tabIndex={0} data-word="Bibliothek" data-phrase="Bibliothek">Bibliothek</span>{' | '}
   <span className="tapWord" role="button" tabIndex={0} data-word="Turm" data-phrase="Turm">Turm</span>{' | '}
   <span className="tapWord" role="button" tabIndex={0} data-word="Schloss" data-phrase="Schloss">Schloss</span>{' | '}
   <b className="naBankB"><span className="tapWord" role="button" tabIndex={0} data-word="Markt" data-phrase="Markt">Markt</span></b>{' | '}
   <span className="tapWord" role="button" tabIndex={0} data-word="Fluss" data-phrase="Fluss">Fluss</span>
  </div>
  {text(164,1014,14,'a')}
  {text(189,1014,400,'Ich bin shoppen.')}
  {art('hand-3a',650,1005,360,32)}
  {text(164,1039,14,'b')}
  {text(189,1039,420,'Ich suche Bücher, aber ich kaufe sie nicht.')}
  {field('p18-3b',654,1039,346,'Antwort 3b')}
  {text(164,1064,14,'c')}
  {text(189,1064,430,'Ich bin in einem Haus. Es ist sehr groß.')}
  {text(189,1091,430,'Ich wohne hier nicht. Ich bin im Urlaub')}
  {text(189,1118,430,'und sehe mir das Haus an.')}
  {field('p18-3c',654,1116,346,'Antwort 3c')}
  {text(164,1142,14,'d')}
  {text(189,1142,440,'Ich gehe spazieren. Hier sind Bäume, aber ich')}
  {text(189,1168,440,'bin nicht im Wald. Ich bin in einer Stadt.')}
  {field('p18-3d',654,1172,346,'Antwort 3d')}
  {text(164,1194,14,'e')}
  {text(189,1194,470,'Ich bin in der Stadtmitte. Am Donnerstag gibt es')}
  {text(189,1221,440,'hier immer Obst und Gemüse.')}
  {art('hand-3e',650,1213,200,30)}
  {field('p18-3e',758,1218,242,'Antwort 3e')}
  {text(164,1246,14,'f')}
  {text(189,1246,440,'Ich bin in einer Kirche und habe einen Blick')}
  {text(189,1273,440,'auf die Stadt von oben.')}
  {field('p18-3f',654,1274,346,'Antwort 3f')}
  {text(164,1298,14,'g')}
  {text(189,1298,440,'Das Wetter ist schön und ich schwimme.')}
  {text(189,1324,440,'Ich bin im Wasser, aber nicht im Meer.')}
  {field('p18-3g',654,1325,346,'Antwort 3g')}
  {check('g4',160,1358,{'p18-3b':'in einer Bibliothek.','p18-3c':'in einem Schloss.','p18-3d':'in einem Park.','p18-3e':'Markt','p18-3f':'auf einem Turm.','p18-3g':'in einem Fluss.'})}
  {art('modul-tab',0,1380,92,42)}
  {text(100,1392,200,'18  |  achtzehn','naFooter naNw')}
 </>}
 </div><audio ref={player} className="naPlayer"/></div>;
}
