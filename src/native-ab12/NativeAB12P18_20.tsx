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
 const dot=(id:string,value:string,x:number,y:number,label:string)=><input type="radio" className="naDot" name={key+'-'+id} aria-label={label} data-native-field={id} style={{left:x,top:y}} checked={values[id]===value} onChange={()=>set(id,value)}/>;
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
  {text(452,198,20,'3:','naBlue naBold')}
  {text(475,198,310,'Was sehen Sie? Was machen Sie dort?')}
  {text(152,224,20,'b','naBold')}
  {text(181,224,520,'Tauschen Sie mit Ihrer Partnerin / Ihrem Partner. Sie/Er rät.')}
  {audio('assets/ab-a12-cd2-track11.mp3',55,316,'2 11')}
  {title('5',120,284,700,'Hören Sie Marlenes Podcast. Was ist falsch? Korrigieren Sie.','naOB naNw')}
  {text(152,324,20,'a','naBold')}
  {text(181,324,215,'In Giesing haben früher')}
  {text(402,324,55,'keine','naBlue')}
  {text(455,324,110,'Arbeiter gewohnt.')}
  {art('viele',636,322,84,38)}
  {text(152,350,20,'b','naBold')}
  {text(181,350,430,'In Giesing sind die Wohnungen sehr teuer.')}
  {field('p19-5b',642,346,201,'Korrektur 5b')}
  {text(152,376,20,'c','naBold')}
  {text(180,376,430,'Es gibt in Giesing ein Kino, aber kein Theater.')}
  {field('p19-5c',642,372,201,'Korrektur 5c')}
  {text(152,402,20,'d','naBold')}
  {text(180,402,430,'Das Kulturzentrum ist in einer Kirche.')}
  {field('p19-5d',642,398,201,'Korrektur 5d')}
  {text(152,428,20,'e','naBold')}
  {text(179,428,430,'Im Kulturzentrum kann man nicht tanzen.')}
  {field('p19-5e',642,424,201,'Korrektur 5e')}
  {check('g5',870,350,{'p19-5b':'nicht so teuer','p19-5c':'ein Theater','p19-5d':'in einem Bahnhof','p19-5e':'tanzen'},'naCheckCol')}
  {title('6',120,490,700,'Was passt? Markieren Sie.','naOB naNw')}
  {text(152,530,20,'a','naBold')}
  {text(177,530,44,'Wie')}
  <div className="naText" style={{left:221,top:530,width:62}}><span className="naHl"><Words text="gefällt"/></span></div>
  {text(283,530,406,'/ gefallen dir der Stadtteil? – Toll, besonders')}
  {dot('6a2','gefällt',689,533,'gefällt (6a)')}
  {text(719,533,62,'gefällt')}
  {text(785,533,12,'/')}
  {dot('6a2','gefallen',798,533,'gefallen (6a)')}
  {text(828,533,76,'gefallen')}
  {text(912,533,60,'mir die')}
  {text(177,552,60,'Cafés.')}
  {text(152,582,20,'b','naBold')}
  {dot('6b1','Gehört',174,582,'Gehört (6b)')}
  {text(204,582,65,'Gehört')}
  {text(272,582,12,'/')}
  {dot('6b1','Gehören',284,582,'Gehören (6b)')}
  {text(314,582,78,'Gehören')}
  {text(400,582,530,'die Schlüssel Dörte? – Nein, das sind meine. Aber der')}
  {text(177,608,90,'dem Tisch')}
  {dot('6b2','gehört',271,608,'gehört (6b)')}
  {text(301,608,64,'gehört')}
  {text(368,608,12,'/')}
  {dot('6b2','gehören',379,608,'gehören (6b)')}
  {text(409,608,77,'gehören')}
  {text(492,608,60,'Dörte.')}
  {text(152,634,20,'c','naBold')}
  {text(180,634,620,'Du kannst das Rezept nicht lesen? Dann brauchst du eine neue Brille.')}
  {text(177,661,30,'Die')}
  {dot('6c','hilft',210,661,'hilft (6c)')}
  {text(240,661,48,'hilft')}
  {text(292,661,12,'/')}
  {dot('6c','helfen',303,661,'helfen (6c)')}
  {text(333,661,55,'helfen')}
  {text(392,661,40,'dir.')}
  {text(152,688,20,'d','naBold')}
  {text(180,688,630,'Clemens möchte Deutsch lernen und macht viele Übungen. Die Übungen')}
  {dot('6d','hilft',818,688,'hilft (6d)')}
  {text(848,688,48,'hilft')}
  {text(899,688,12,'/')}
  {dot('6d','helfen',910,688,'helfen (6d)')}
  {text(940,688,55,'helfen')}
  {text(177,714,40,'ihm.')}
  {text(152,742,20,'e','naBold')}
  {dot('6e1','Schmeckt',172,742,'Schmeckt (6e)')}
  {text(202,742,88,'Schmeckt')}
  {text(293,742,12,'/')}
  {dot('6e1','Schmecken',304,742,'Schmecken (6e)')}
  {text(334,742,101,'Schmecken')}
  {text(443,742,360,'dir der Salat? – Nein, aber die Kartoffeln')}
  {dot('6e2','schmeckt',174,768,'schmeckt (6e)')}
  {text(204,768,87,'schmeckt')}
  {text(294,768,12,'/')}
  {dot('6e2','schmecken',305,768,'schmecken (6e)')}
  {text(335,768,101,'schmecken')}
  {text(444,768,110,'mir sehr gut.')}
  {check('g6',152,806,{'6a2':'gefallen','6b1':'Gehören','6b2':'gehört','6c':'hilft','6d':'helfen','6e1':'Schmeckt','6e2':'schmecken'},'naCheckCol')}
  {title('7',120,826,850,'Ergänzen Sie die passenden Verben aus 6 in der richtigen Form.','naOB naNw')}
  {text(152,888,110,'Der Stadtteil')}
  {art('gefaellt7',266,872,146,44)}
  {text(152,917,116,'Der Schlüssel')}
  {field('p19-7a',268,917,104,'Verb 7a')}
  {text(152,940,100,'Die Übung')}
  {field('p19-7b',268,943,104,'Verb 7b')}
  {text(152,968,100,'Der Salat')}
  {field('p19-7c',268,971,92,'Verb 7c')}
  {['mir.','dir.','ihm/ihr.','uns.','euch.','Ihnen/Ihnen.'].map((t,i)=>text(416,867+[0,21,50,73,101,128][i],100,t))}
  {text(574,888,125,'Die Stadtteile')}
  {field('p19-7d',695,890,128,'Verb 7d')}
  {text(574,917,125,'Die Schlüssel')}
  {field('p19-7e',695,919,128,'Verb 7e')}
  {text(574,940,125,'Die Übungen')}
  {field('p19-7f',695,945,128,'Verb 7f')}
  {text(574,968,125,'Die Salate')}
  {field('p19-7g',695,971,128,'Verb 7g')}
  {['mir.','dir.','ihm/ihr.','uns.','euch.','Ihnen/Ihnen.'].map((t,i)=>text(845,867+[0,21,50,73,101,128][i],100,t))}
  {check('g7',940,900,{'p19-7a':'gehört','p19-7b':'hilft','p19-7c':'schmeckt','p19-7d':'gefallen','p19-7e':'gehören','p19-7f':'helfen','p19-7g':'schmecken'},'naCheckCol')}
  {title('8',120,1057,900,'Ergänzen Sie gehören/gefallen/danken/helfen/schmecken in der richtigen Form.','naOB naNw')}
  {text(146,1099,20,'a','naBold')}
  {text(170,1099,150,'Welcher Stadtteil')}
  {art('gefaellt8',322,1092,56,38)}
  {text(383,1099,330,'dir besonders gut? — Ich mag das Lehel.')}
  {text(146,1126,20,'b','naBold')}
  {text(170,1126,36,'Wir')}
  {field('p19-8b',208,1122,129,'Verb 8b')}
  {text(341,1126,390,'dir für deine Hilfe. — Ich habe euch gern geholfen.')}
  {text(146,1152,20,'c','naBold')}
  {text(170,1152,140,'Kann ich Ihnen')}
  {field('p19-8c',312,1148,124,'Verb 8c')}
  {text(443,1152,140,'? — Nein, danke.')}
  {text(146,1179,20,'d','naBold')}
  {text(170,1179,315,'Die vielen Kneipen und Restaurants')}
  {field('p19-8d',490,1175,122,'Verb 8d')}
  {text(625,1179,110,'mir sehr gut.')}
  {text(146,1206,20,'e','naBold')}
  {field('p19-8e',170,1202,125,'Verb 8e')}
  {text(302,1206,360,'dir das Buch? — Nein, das ist nicht mein Buch.')}
  {text(146,1232,20,'f','naBold')}
  {field('p19-8f',170,1228,125,'Verb 8f')}
  {text(302,1232,500,'euch der Kuchen? — Ja, sehr gut. Können wir das Rezept haben?')}
  {check('g8',146,1270,{'p19-8b':'danken','p19-8c':'helfen','p19-8d':'gefallen','p19-8e':'Gehört','p19-8f':'Schmeckt'},'naCheckCol')}
  {text(830,1392,140,'neunzehn  |  19','naFooter naNw')}
  {art('modul',978,1386,93,36)}
 </>}
 </div><audio ref={player} className="naPlayer"/></div>;
}
