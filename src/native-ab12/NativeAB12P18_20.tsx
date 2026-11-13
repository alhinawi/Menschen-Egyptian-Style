import {CheckButton} from '../components/CheckButton';
import {PageImage} from '../components/PageImage';
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
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="naArt" src={`assets/book-crops/native-ab12-p${page}-${name}.png`} alt={'Originalillustration '+name} style={{left:x,top:y,width:w,height:h}}/>;
 const field=(id:string,x:number,y:number,w:number,label:string,cls='')=><input className={'naField '+cls} aria-label={label} data-native-field={id} style={{left:x,top:y,width:w}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>;
 const rule=(x:number,y:number,w:number)=><div className="naRule" style={{left:x,top:y,width:w}}/>;
 const dot=(id:string,value:string,x:number,y:number,label:string)=><input type="radio" className="naDot" name={key+'-'+id} aria-label={label} data-native-field={id} style={{left:x,top:y}} checked={values[id]===value} onChange={()=>set(id,value)}/>;
 const pick=(id:string,value:string,x:number,y:number,label:string)=><button type="button" className={'naPick'+(values[id]===value?' selected':'')} aria-label={label} aria-pressed={values[id]===value} data-native-field={id} onClick={()=>set(id,value)} style={{left:x,top:y}}>{value}</button>;
 const circle=(id:string,x:number,y:number,label:string)=><input className="naCNum" aria-label={label} data-native-field={id} style={{left:x,top:y}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false} inputMode="numeric" maxLength={1}/>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>,cls='')=><div className={'naCheck '+cls} data-check={id} style={{left:x,top:y}}><CheckButton onClick={()=>sr({...results,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(v=>normalize(v)===normalize(values[k]||(a==='false'?'false':''))))})}></CheckButton><output aria-live="polite">{id in results?(results[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const title=(n:string,x:number,y:number,w:number,t:string,cls='')=><div className={'naTitle '+cls} style={{left:x,top:y,width:w}}><b>{n}</b><Words text={t}/></div>;
 const kb=(x:number,y:number,t:string)=><div className="naKB" style={{left:x,top:y}}>{t}</div>;
 const audio=(src:string,x:number,y:number,label:string)=><button className="naAudio" style={{left:x,top:y}} aria-label={'Originalaudio '+label+' abspielen'} onClick={()=>{if(player.current){player.current.src=src;player.current.play().catch(()=>{})}}}>▶ {label}</button>;

 return <div className="nativeAB12" ref={root} data-native-ab12={page}><style>{"@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-400.woff2') format('woff2');font-weight:400}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-700.woff2') format('woff2');font-weight:700}"}</style><div className={'naCanvas'+(W<1000?' naNarrow':'')} style={{width:W,height:H,transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='18'&&<>
  {art('head-photo',6,38,348,81)}
  <div style={{position:'absolute',left:354,top:38,width:621,height:81,background:'#fbd479'}}/>
  <div className="naText" style={{left:417,top:56,width:520,fontFamily:"FiraSans,'Trebuchet MS',sans-serif",fontWeight:700,fontSize:34,color:'#2b1608'}}><Words text="In Giesing wohnt das Leben!"/></div>
  {kb(78,160,'KB 3')}
  {title('1',116,180,600,'Wo sind die Personen?','naOB naNw')}
  <div className="naSide" style={{left:55,top:225}}>WÖRTER</div>
  {audio('assets/ab-a12-cd2-track10.mp3',38,216,'2 10')}
  {art('globe',70,240,42,42)}
  {text(125,216,20,'a','naExL')}
  {text(161,214,400,'Hören Sie und nummerieren Sie.')}
  {circle('p18-nKirche',155,258,'Kirche Nummer')}
  {circle('p18-nSpielplatz',251,258,'Spielplatz Nummer')}
  <div className="naCNumPrint" style={{left:377,top:258}}>1</div>
  {circle('p18-nWald',498,258,'Wald Nummer')}
  {circle('p18-nMeer',576,258,'Meer Nummer')}
  {circle('p18-nCafé',662,258,'Café Nummer')}
  {circle('p18-nHafen',745,258,'Hafen Nummer')}
  {text(186,253,60,'Kirche','naF21')}
  {text(281,253,90,'Spielplatz','naF21')}
  {text(407,253,90,'Flughafen','naF21')}
  {text(523,253,55,'Wald','naF21')}
  {text(605,253,55,'Meer','naF21')}
  {text(696,253,40,'Café','naF21')}
  {text(771,253,55,'Hafen','naF21')}
  {check('g1',850,242,{'p18-nKirche':'3','p18-nSpielplatz':'2','p18-nWald':'6','p18-nMeer':'5','p18-nCafé':'7','p18-nHafen':'4'},'naCheckCol')}
  {text(125,302,20,'b','naExL')}
  {text(161,302,500,'Ergänzen Sie aus a. Notieren und vergleichen Sie.')}
  <div style={{position:'absolute',left:150,top:335,width:825,height:32,background:'#f0ead6'}}/>
  <div className="naTFrame" style={{left:150,top:335,width:825,height:238}}/>
  <div className="naTCol" style={{left:443,top:335,height:238}}/>
  <div className="naTCol" style={{left:638,top:335,height:238}}/>
  {text(159,341,200,'Deutsch','naTh')}
  {text(451,341,150,'Englisch','naTh')}
  {text(648,341,320,'Meine Sprache oder andere Sprachen','naTh naNw')}
  {[395.5,425,454.5,484,513.5,543].map(y=><div key={y} className="naTRule" style={{left:150,top:y,width:825}}/>)}
  {['café','harbour','airport','church','sea','playground','forest'].map((word,i)=>text(451,366+i*29.5,170,word,'naTableEnglish'))}
  {['hint-1','hint-2','hint-3','hint-4','hand-meer','hint-6','hand-wald'].map((name,i)=>art(name+'-clean',159,368+i*29.5,282,26))}
  {['p18-dCafé','p18-dHafen','p18-dFlughafen','p18-dKirche',null,'p18-dSpielplatz',null].map((id,i)=>id?field(id,158,367+i*29.5,275,'Deutsch Zeile '+(i+1),'naFieldBlank'):null)}
  {Array.from({length:7},(_,i)=>field('p18-ms'+(i+1),650,367+i*29.5,315,'Meine Sprache Zeile '+(i+1),'naFieldBlank'))}
  {check('g2',150,577,{'p18-dCafé':'Café','p18-dHafen':'Hafen','p18-dFlughafen':'Flughafen','p18-dKirche':'Kirche','p18-dSpielplatz':'Spielplatz'},'naCheckSm')}
  {kb(78,610,'KB 3')}
  {title('2',119,620,600,'Was ist das? Ergänzen Sie.','naOB naNw')}
  <div className="naSide" style={{left:55,top:650}}>WÖRTER</div>
  <div className="naBank" style={{left:152,top:647}}>
   <s><span className="tapWord" role="button" tabIndex={0} data-word="Kin" data-phrase="Kin">Kin</span></s>{' | '}
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
   <s><span className="tapWord" role="button" tabIndex={0} data-word="der" data-phrase="der">der</span></s>{' | '}
   <s><span className="tapWord" role="button" tabIndex={0} data-word="gar" data-phrase="gar">gar</span></s>{' | '}
   <span className="tapWord" role="button" tabIndex={0} data-word="ber" data-phrase="ber">ber</span>{' | '}
   <s><span className="tapWord" role="button" tabIndex={0} data-word="ten" data-phrase="ten">ten</span></s>{' | '}
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
  {title('3',121,943,600,'Wo bin ich? Notieren Sie.','naOB naNw')}
  {art('bubble',690,925,170,52)}
  <div className="naSide" style={{left:55,top:975}}>WÖRTER</div>
  <div className="naBank" style={{left:158,top:973}}>
   <span className="tapWord" role="button" tabIndex={0} data-word="Park" data-phrase="Park">Park</span>{' | '}
   <s><span className="tapWord" role="button" tabIndex={0} data-word="Geschäft" data-phrase="Geschäft/Laden">Geschäft</span><span className="tapWord" role="button" tabIndex={0} data-word="Laden" data-phrase="Geschäft/Laden">/Laden</span></s>{' | '}
   <span className="tapWord" role="button" tabIndex={0} data-word="Bibliothek" data-phrase="Bibliothek">Bibliothek</span>{' | '}
   <span className="tapWord" role="button" tabIndex={0} data-word="Turm" data-phrase="Turm">Turm</span>{' | '}
   <span className="tapWord" role="button" tabIndex={0} data-word="Schloss" data-phrase="Schloss">Schloss</span>{' | '}
   <span className="tapWord" role="button" tabIndex={0} data-word="Markt" data-phrase="Markt">Markt</span>{' | '}
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
 {page==='19'&&<>
  {text(120,55,270,'BASISTRAINING','naHead')}
  <div className="naHeadRule" style={{left:368,top:93,width:617}}/>
  {art('tab15',986,14,85,104)}
  {kb(70,166,'KB 3')}
  {art('pair-icon',52,190,50,26)}
  {kb(70,295,'KB 4')}
  <div className="naSide" style={{left:92,top:353,fontSize:10,letterSpacing:1}}>HÖREN</div>
  {kb(70,501,'KB 5')}
  <div className="naSide" style={{left:92,top:534,fontSize:10,letterSpacing:1}}>STRUKTUREN</div>
  {kb(70,836,'KB 5')}
  <div className="naSide" style={{left:86,top:863,fontSize:10,letterSpacing:1,whiteSpace:'pre-line'}}>{'STRUKTUREN\nENTDECKEN'}</div>
  {kb(70,1067,'KB 5')}
  <div className="naSide" style={{left:92,top:1098,fontSize:10,letterSpacing:1}}>WÖRTER</div>
  {title('4',120,154,600,'Wo bin ich?','naOB naNw')}
  {text(152,198,20,'a','naBold')}
  {text(182,198,270,'Schreiben Sie Aufgaben wie in')}
  {text(463,198,20,'3:','naBlue naBold')}
  {text(485,198,310,'Was sehen Sie? Was machen Sie dort?')}
  {text(152,224,20,'b','naBold')}
  {text(181,224,520,'Tauschen Sie mit Ihrer Partnerin / Ihrem Partner. Sie/Er rät.')}
  {audio('assets/ab-a12-cd2-track11.mp3',55,316,'2 11')}
  {title('5',120,284,700,'Hören Sie Marlenes Podcast. Was ist falsch? Korrigieren Sie.','naOB naNw')}
  {text(152,324,20,'a','naBold')}
  {text(181,324,215,'In Giesing haben früher')}
  {text(402,324,55,'keine','naBlue naStrike')}
  {text(455,324,110,'Arbeiter gewohnt.')}
  {art('viele',636,322,84,38)}
  {text(152,350,20,'b','naBold')}
  {text(181,350,430,'In Giesing sind die Wohnungen sehr teuer.')}
  {field('p19-5b',642,352,201,'Korrektur 5b')}
  {text(152,376,20,'c','naBold')}
  {text(180,376,430,'Es gibt in Giesing ein Kino, aber kein Theater.')}
  {field('p19-5c',642,378,201,'Korrektur 5c')}
  {text(152,402,20,'d','naBold')}
  {text(180,402,430,'Das Kulturzentrum ist in einer Kirche.')}
  {field('p19-5d',642,403,201,'Korrektur 5d')}
  {text(152,428,20,'e','naBold')}
  {text(179,428,430,'Im Kulturzentrum kann man nicht tanzen.')}
  {field('p19-5e',642,429,201,'Korrektur 5e')}
  {check('g5',870,350,{'p19-5b':'nicht so teuer','p19-5c':'ein Theater','p19-5d':'in einem Bahnhof','p19-5e':'tanzen'},'naCheckCol')}
  {title('6',120,490,700,'Was passt? Markieren Sie.','naOB naNw')}
  {text(152,530,20,'a','naBold naF21')}
  {text(177,530,44,'Wie','naF21')}
  <div className="naText naF21" style={{left:221,top:530,width:62}}><span className="naHl"><Words text="gefällt"/></span></div>
  {text(283,530,240,'/ gefallen dir der Stadtteil?','naF21')}
  {text(535,530,150,'– Toll, besonders','naF21')}
  {pick('6a2','gefällt',692,530,'gefällt (6a)')}
  {text(754,530,14,'/','naF21')}
  {pick('6a2','gefallen',768,530,'gefallen (6a)')}
  {text(850,530,70,'mir die','naF21')}
  {text(177,556,60,'Cafés.','naF21')}
  {text(152,582,20,'b','naBold naF21')}
  {pick('6b1','Gehört',177,582,'Gehört (6b)')}
  {text(241,582,14,'/','naF21')}
  {pick('6b1','Gehören',256,582,'Gehören (6b)')}
  {text(341,582,175,'die Schlüssel Dörte?','naF21')}
  {text(524,582,200,'– Nein, das sind meine.','naF21')}
  {text(734,582,200,'Aber der Schlüssel auf','naF21')}
  {text(176,608,90,'dem Tisch','naF21')}
  {pick('6b2','gehört',274,608,'gehört (6b)')}
  {text(337,608,14,'/','naF21')}
  {pick('6b2','gehören',351,608,'gehören (6b)')}
  {text(436,608,60,'Dörte.','naF21')}
  {text(152,634,20,'c','naBold naF21')}
  {text(177,634,615,'Du kannst das Rezept nicht lesen? Dann brauchst du eine neue Brille.','naF21')}
  {text(176,660,30,'Die','naF21')}
  {pick('6c','hilft',216,660,'hilft (6c)')}
  {text(260,660,14,'/','naF21')}
  {pick('6c','helfen',272,660,'helfen (6c)')}
  {text(343,660,40,'dir.','naF21')}
  {text(152,688,20,'d','naBold naF21')}
  {text(175,688,430,'Clemens möchte Deutsch lernen und macht viele','naF21')}
  {text(611,688,84,'Übungen.','naF21')}
  {text(701,688,28,'Die','naF21')}
  {text(741,688,82,'Übungen','naF21')}
  {pick('6d','hilft',828,688,'hilft (6d)')}
  {text(869,688,14,'/','naF21')}
  {pick('6d','helfen',884,688,'helfen (6d)')}
  {text(175,714,40,'ihm.','naF21')}
  {text(152,742,20,'e','naBold naF21')}
  {pick('6e1','Schmeckt',174,742,'Schmeckt (6e)')}
  {text(264,742,14,'/','naF21')}
  {pick('6e1','Schmecken',277,742,'Schmecken (6e)')}
  {text(388,742,125,'dir der Salat?','naF21')}
  {text(521,742,230,'– Nein, aber die Kartoffeln','naF21')}
  {pick('6e2','schmeckt',759,742,'schmeckt (6e)')}
  {text(846,742,14,'/','naF21')}
  {pick('6e2','schmecken',861,742,'schmecken (6e)')}
  {text(174,768,120,'mir sehr gut.','naF21')}
  {check('g6',160,796,{'6a2':'gefallen','6b1':'Gehören','6b2':'gehört','6c':'hilft','6d':'helfen','6e1':'Schmeckt','6e2':'schmecken'},'naCheckSm')}
  {title('7',120,826,850,'Ergänzen Sie die passenden Verben aus 6 in der richtigen Form.','naOB naNw')}
  {text(152,888,110,'Der Stadtteil')}
  {art('gefaellt7',266,872,146,44)}
  {text(152,913,116,'Der Schlüssel')}
  {field('p19-7a',268,913,104,'Verb 7a')}
  {text(152,939,100,'Die Übung')}
  {field('p19-7b',268,939,104,'Verb 7b')}
  {text(152,963,100,'Der Salat')}
  {field('p19-7c',268,963,92,'Verb 7c')}
  {['mir.','dir.','ihm/ihr.','uns.','euch.','Ihnen/Ihnen.'].map((t,i)=>text(416,867+[0,21,50,73,101,128][i],100,t))}
  {text(574,893,125,'Die Stadtteile')}
  {field('p19-7d',695,893,128,'Verb 7d')}
  {text(574,918,125,'Die Schlüssel')}
  {field('p19-7e',695,918,128,'Verb 7e')}
  {text(574,944,125,'Die Übungen')}
  {field('p19-7f',695,944,128,'Verb 7f')}
  {text(574,970,125,'Die Salate')}
  {field('p19-7g',695,970,128,'Verb 7g')}
  {['mir.','dir.','ihm/ihr.','uns.','euch.','Ihnen/Ihnen.'].map((t,i)=>text(845,867+[0,21,50,73,101,128][i],100,t))}
  {check('g7',152,1008,{'p19-7a':'gehört','p19-7b':'hilft','p19-7c':'schmeckt','p19-7d':'gefallen','p19-7e':'gehören','p19-7f':'helfen','p19-7g':'schmecken'},'naCheckCol')}
  {title('8',120,1057,900,'Ergänzen Sie gehören/gefallen/danken/helfen/schmecken in der richtigen Form.','naOB naNw')}
  {text(146,1099,20,'a','naBold')}
  {text(170,1099,150,'Welcher Stadtteil')}
  {art('gefaellt8',322,1092,56,38)}
  {text(383,1099,330,'dir besonders gut? – Ich mag das Lehel.')}
  {text(146,1126,20,'b','naBold')}
  {text(170,1126,36,'Wir')}
  {field('p19-8b',208,1122,129,'Verb 8b')}
  {text(341,1126,390,'dir für deine Hilfe. – Ich habe euch gern geholfen.')}
  {text(146,1152,20,'c','naBold')}
  {text(170,1152,140,'Kann ich Ihnen')}
  {field('p19-8c',312,1148,124,'Verb 8c')}
  {text(443,1152,140,'? – Nein, danke.')}
  {text(146,1179,20,'d','naBold')}
  {text(170,1179,315,'Die vielen Kneipen und Restaurants')}
  {field('p19-8d',490,1175,122,'Verb 8d')}
  {text(625,1179,110,'mir sehr gut.')}
  {text(146,1206,20,'e','naBold')}
  {field('p19-8e',170,1202,125,'Verb 8e')}
  {text(302,1206,360,'dir das Buch? – Nein, das ist nicht mein Buch.')}
  {text(146,1232,20,'f','naBold')}
  {field('p19-8f',170,1228,125,'Verb 8f')}
  {text(302,1232,500,'euch der Kuchen? – Ja, sehr gut. Können wir das Rezept haben?')}
  {check('g8',146,1270,{'p19-8b':'danken','p19-8c':'helfen','p19-8d':'gefallen','p19-8e':'Gehört','p19-8f':'Schmeckt'},'naCheckCol')}
  {text(830,1392,140,'neunzehn  |  19','naFooter naNw')}
  {art('modul',978,1386,93,36)}
 </>}
 {page==='20'&&<>
  {text(124,86,240,'BASISTRAINING','naHead')}
  <div className="naHeadRule" style={{left:371,top:112,width:602}}/>
  {kb(78,182,'KB 5')}
  <div className="naSide" style={{left:92,top:222,fontSize:7.5,letterSpacing:.5}}>STRUKTUREN</div>
  {title('9',120,176,600,'Was passt? Kreuzen Sie an.','naOB naNw')}
  {text(163,220,12,'a')}
  {text(187,218,320,'Marlene meint, Giesing ist normal. Das gefällt','naF21')}
  <div className="naDotPrint" style={{left:617,top:218}}/>
  {text(644,218,34,'mir')}
  <div className="naDotPrint" style={{left:699,top:218}}/>
  {art('x9a',698,218,24,24)}
  {text(725,218,32,'ihr')}
  <div className="naDotPrint" style={{left:775,top:218}}/>
  {text(801,218,38,'ihm')}
  {text(859,218,80,'sehr gut.')}
  {text(162,244,12,'b')}
  {text(186,244,575,'Wir feiern nächste Woche eine große Party. Viele Freunde helfen','naF21')}
  {dot('9b','uns',780,247,'9b uns')}
  {text(807,244,40,'uns.')}
  {dot('9b','euch',866,247,'9b euch')}
  {text(893,244,50,'euch.')}
  {dot('9b','ihnen',184,268,'9b ihnen')}
  {text(223,268,60,'ihnen.')}
  {text(162,293,12,'c')}
  {text(187,294,345,'Ihr habt uns toll geholfen! Wir danken','naF21')}
  {dot('9c','uns',556,296,'9c uns')}
  {text(583,294,40,'uns.')}
  {dot('9c','euch',646,296,'9c euch')}
  {text(673,294,50,'euch.')}
  {dot('9c','ihnen',748,296,'9c ihnen')}
  {text(775,294,60,'ihnen.')}
  {text(162,320,12,'d')}
  {text(187,321,335,'Das sind Marks Schlüssel. Sie gehören','naF21')}
  {dot('9d','dir',540,321,'9d dir')}
  {text(567,319,36,'dir.')}
  {dot('9d','ihm',631,321,'9d ihm')}
  {text(658,320,40,'ihm.')}
  {dot('9d','ihr',726,321,'9d ihr')}
  {text(753,321,32,'ihr.')}
  {text(162,346,12,'e')}
  {text(187,346,355,'Du kannst die Lehrerin fragen. Sie hilft','naF21')}
  {dot('9e','dir',558,348,'9e dir')}
  {text(585,345,36,'dir.')}
  {dot('9e','ihm',649,348,'9e ihm')}
  {text(676,346,40,'ihm.')}
  {dot('9e','euch',744,348,'9e euch')}
  {text(771,348,50,'euch.')}
  {check('g1',905,300,{'9b':'uns','9c':'euch','9d':'ihm','9e':'dir'},'naCheckCol')}
  {kb(78,414,'KB 5')}
  <div className="naSide" style={{left:92,top:455,fontSize:7.5,letterSpacing:.5}}>STRUKTUREN</div>
  {title('10',120,408,600,'Ergänzen Sie.','naOB naNw')}
  {text(162,452,12,'a')}
  {text(186,450,310,'Hallo Maria und Pedro, wie geht es','naF21')}
  {art('euch10a',494,450,48,22)}
  {text(547,450,120,'– Danke, gut.','naF21')}
  {text(161,475,12,'b')}
  {text(186,475,530,'Maria, kommst du? – Ja, Pedro, ich komme gleich und helfe','naF21')}
  {field('p20-10b',722,471,125,'10b')}
  {text(855,475,8,'.')}
  {text(162,502,12,'c')}
  {text(185,502,490,'Wir haben Probleme mit den Hausaufgaben. Kannst du','naF21')}
  {field('p20-10c',676,496,129,'10c')}
  {text(810,502,160,'helfen? – Ja, klar.','naF21')}
  {text(162,527,12,'d')}
  {text(186,527,500,'Pedro, sind das deine Bücher? – Nein, sie gehören nicht','naF21')}
  {field('p20-10d',683,523,128,'10d')}
  {text(812,527,8,'.')}
  {text(185,553,170,'Sie gehören Maria.','naF21')}
  {text(162,580,12,'e')}
  {text(185,579,600,'Was machst du? – Ich schreibe eine Postkarte an Sandra und danke','naF21')}
  {field('p20-10e',785,575,122,'10e')}
  {text(185,604,170,'für die Einladung.','naF21')}
  {text(162,630,12,'f')}
  {text(186,630,660,'Hast du am Sonntag Zeit? – Nein, Peter und Anja ziehen um und ich helfe','naF21')}
  {field('p20-10f',184,649,129,'10f')}
  {text(322,664,8,'.')}
  {check('g2',950,600,{'p20-10b':'dir','p20-10c':'uns','p20-10d':'mir','p20-10e':'ihr','p20-10f':'ihnen'},'naCheckCol')}
  {kb(78,724,'KB 7')}
  <div className="naSide" style={{left:92,top:763,fontSize:7.5,letterSpacing:.5}}>LESEN</div>
  {title('11',120,718,600,'Welche Anzeige passt? Lesen Sie und notieren Sie dann.','naOB naNw naT21')}
  {art('ad1',128,746,278,248)}
  {art('ad2',446,770,254,145)}
  {art('ad3',123,1008,329,137)}
  {art('ad4',458,946,367,89)}
  {art('ad5',455,1050,315,100)}
  {art('ad6',728,668,284,294)}
  <div style={{position:'absolute',left:159,top:1188,width:838,height:27,background:'#f5efcd'}}/>
  <div className="naTFrame" style={{left:158,top:1187,width:841,height:150}}/>
  <div className="naTCol" style={{left:866,top:1187,height:150}}/>
  {text(874,1192,70,'Anzeige','naTh')}
  {text(167,1221,10,'a')}
  {text(186,1219,660,'Ihre Tochter ist 5 Jahre alt und liebt Bücher.','naS19')}
  {text(166,1251,10,'b')}
  {text(187,1249,660,'Sie sind neu in der Stadt und möchten Menschen treffen. Sie machen gern Sport.','naS19')}
  {text(166,1281,10,'c')}
  {text(187,1279,300,'Sie mögen Musik.','naS19')}
  {text(166,1311,10,'d')}
  {text(187,1309,300,'Sie suchen einen Deutschkurs.','naS19')}
  {field('p20-11a',872,1232,105,'Anzeige a','naFieldBlank')}
  {field('p20-11b',872,1259,105,'Anzeige b','naFieldBlank')}
  {field('p20-11c',872,1289,105,'Anzeige c','naFieldBlank')}
  {field('p20-11d',872,1318,105,'Anzeige d','naFieldBlank')}
  {check('g3',158,1350,{'p20-11a':'4','p20-11b':'1','p20-11c':'6','p20-11d':'3'})}
  {art('modul-tab',0,1384,86,30)}
  {text(100,1392,200,'20  |  zwanzig','naFooter naNw')}
 </>}
 </div><audio ref={player} className="naPlayer"/></div>;
}
