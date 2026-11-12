import {useLayoutEffect,useRef,useState} from 'react';
import './native-ab12.css';

function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\p{L}/u.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-word={w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text}>{w}</span>:w)}</>}
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\s+/g,' ');

export function NativeAB12({page}:{page:string}){
 const W=+page>=66?807:1072, H=+page>=66?1094:1449;
 const root=useRef<HTMLDivElement>(null),player=useRef<HTMLAudioElement>(null);
 const [scale,ss]=useState(.6);const key='native-ab12-'+page;
 const [values,sv]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});
 const [results,sr]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=root.current!;const obs=new ResizeObserver(()=>ss(Math.min(el.clientWidth/W,(el.clientHeight-38)/H)));obs.observe(el);return ()=>obs.disconnect()},[W,H]);
 const set=(id:string,v:string)=>{const n={...values,[id]:v};sv(n);localStorage.setItem(key,JSON.stringify(n))};
 const text=(x:number,y:number,w:number,t:string,cls='')=><div className={'naText '+cls} style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><img className="naArt" src={`assets/book-crops/native-ab12-p${page}-${name}.png`} alt={'Originalillustration '+name} style={{left:x,top:y,width:w,height:h}}/>;
 const field=(id:string,x:number,y:number,w:number,label:string,cls='')=><input className={'naField '+cls} aria-label={label} data-native-field={id} style={{left:x,top:y,width:w}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>;
 const rule=(x:number,y:number,w:number)=><div className="naRule" style={{left:x,top:y,width:w}}/>;
 const dot=(id:string,value:string,x:number,y:number,label:string,checkbox=false)=><input className="naDot" type={checkbox?'checkbox':'radio'} aria-label={label} name={key+'-'+id} checked={checkbox?values[id]==='true':values[id]===value} onChange={e=>set(id,checkbox?String(e.target.checked):value)} style={{left:x,top:y}}/>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="naCheck" data-check={id} style={{left:x,top:y}}><button onClick={()=>sr({...results,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(v=>normalize(v)===normalize(values[k]||(a==='false'?'false':''))))})}>Prüfen ✓</button><output aria-live="polite">{id in results?(results[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const title=(n:string,x:number,y:number,w:number,t:string,cls='')=><div className={'naTitle '+cls} style={{left:x,top:y,width:w}}><b>{n}</b><Words text={t}/></div>;
 const gl=(x:number,y:number,t:string,bg?:string)=><div className="naGL" style={{left:x,top:y,...(bg?{background:bg}:{})}}>{t}</div>;
 const kb=(x:number,y:number,t:string)=><div className="naKB" style={{left:x,top:y}}>{t}</div>;
 const hand=(x:number,y:number,w:number,t:string)=><div className="naText naHand" style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const audio=(src:string,x:number,y:number,label:string)=><button className="naAudio" style={{left:x,top:y}} aria-label={'Originalaudio '+label+' abspielen'} onClick={()=>{if(player.current){player.current.src=src;player.current.play().catch(()=>{})}}}>▶ {label}</button>;

 return <div className="nativeAB12" ref={root} data-native-ab12={page}><style>{"@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-400.woff2') format('woff2');font-weight:400}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-700.woff2') format('woff2');font-weight:700}"}</style><div className={'naCanvas'+(W<1000?' naNarrow':'')} style={{width:W,height:H,transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='89'&&<>
  {art('lesson-tab',738,18,62,75)}
  {text(75,63,300,'LERNWORTSCHATZ','naHeadline')}
  <div className="naHeadRule" style={{left:388,top:78,width:270}}/>
  {title('1',78,116,540,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.','naRB naNw')}
  {text(96,145,160,'Wetter','naWHead')}
  {text(396,145,240,'Himmelsrichtungen','naWHead')}
  {text(396,303,240,'Weitere wichtige Wörter','naWHead')}
  {text(105,168,150,'Wetter das')}
  {text(105,187,150,'Gewitter das, -')}
  {field('89-1-l1',234,187,144,'Gewitter das, - übersetzen')}
  {text(105,206,150,'Grad das, -e')}
  {field('89-1-l2',234,206,144,'Grad das, -e übersetzen')}
  {text(105,226,150,'Nebel der')}
  {field('89-1-l3',234,226,144,'Nebel der übersetzen')}
  {text(105,245,150,'Regen der')}
  {field('89-1-l4',234,245,144,'Regen der übersetzen')}
  {text(105,265,150,'Schnee der')}
  {field('89-1-l5',234,265,144,'Schnee der übersetzen')}
  {text(105,284,150,'Sonne die, -n')}
  {field('89-1-l6',234,284,144,'Sonne die, -n übersetzen')}
  {text(105,304,150,'Sturm der, ¨e')}
  {field('89-1-l7',234,304,144,'Sturm der, ¨e übersetzen')}
  {text(105,324,150,'Wind der, -e')}
  {field('89-1-l8',234,324,144,'Wind der, -e übersetzen')}
  {text(105,343,150,'Wolke die, -n')}
  {field('89-1-l9',234,343,144,'Wolke die, -n übersetzen')}
  {text(105,373,150,'regnen, hat')}
  {text(114,392,150,'geregnet')}
  {field('89-1-l11',234,392,144,'geregnet übersetzen')}
  {text(105,412,150,'schneien, hat')}
  {text(114,431,150,'geschneit')}
  {field('89-1-l13',234,431,144,'geschneit übersetzen')}
  {text(105,451,150,'scheinen, hat')}
  {text(114,470,150,'geschienen')}
  {field('89-1-l15',234,470,144,'geschienen übersetzen')}
  {text(105,500,150,'kühl')}
  {field('89-1-l16',234,500,144,'kühl übersetzen')}
  {text(105,519,150,'neblig')}
  {field('89-1-l17',234,519,144,'neblig übersetzen')}
  {text(105,538,150,'sonnig')}
  {field('89-1-l18',234,538,144,'sonnig übersetzen')}
  {text(397,168,150,'Himmelsrichtung')}
  {text(406,187,150,'die, -en')}
  {field('89-1-r1',505,187,148,'die, -en übersetzen')}
  {text(396,207,150,'Norden der')}
  {field('89-1-r2',505,207,148,'Norden der übersetzen')}
  {text(396,227,150,'Süden der')}
  {field('89-1-r3',505,227,148,'Süden der übersetzen')}
  {text(396,246,150,'Osten der')}
  {field('89-1-r4',505,246,148,'Osten der übersetzen')}
  {text(396,265,150,'Westen der')}
  {field('89-1-r5',505,265,148,'Westen der übersetzen')}
  {text(396,324,150,'Dach das, ¨er')}
  {field('89-1-r6',505,324,148,'Dach das, ¨er übersetzen')}
  {text(396,344,150,'Frühjahr das, -e')}
  {field('89-1-r7',505,344,148,'Frühjahr das, -e übersetzen')}
  {text(396,363,150,'Glas das, ¨er')}
  {field('89-1-r8',505,363,148,'Glas das, ¨er übersetzen')}
  {text(396,383,150,'Glück das')}
  {field('89-1-r9',505,383,148,'Glück das übersetzen')}
  {text(396,402,150,'Himmel der')}
  {field('89-1-r10',505,402,148,'Himmel der übersetzen')}
  {text(396,422,150,'Laune die, -n')}
  {field('89-1-r11',505,422,148,'Laune die, -n übersetzen')}
  {text(396,441,150,'Reiseführer')}
  {text(405,461,150,'der, -')}
  {field('89-1-r13',505,461,148,'der, - übersetzen')}
  {text(396,480,150,'Traum der, ¨e')}
  {field('89-1-r14',505,480,148,'Traum der, ¨e übersetzen')}
  {art('tipp',433,545,136,42)}
  {text(461,550,110,'Suchen Sie','naSmall')}
  {text(461,568,130,'Wortfamilien.','naSmall')}
  {art('handwriting',360,605,265,60)}
  {art('strip',665,95,140,915)}
  {title('2',78,686,540,'Welche Wörter möchten Sie noch lernen? Notieren Sie.','naRB naNw')}
  {[713,732,752,772,791,811,830,849,869,888,908,927,947,966,986,1005].map((y,i)=>field('89-2-'+i,102,y,525,'Notizzeile '+(i+1)))}
  {text(598,1046,150,'neunundachtzig  |  89','naFooter')}
  {art('modul-tab',722,1038,50,24)}
 </>}
 {page==='52'&&<>
  <div className="naBand52"/>
  {text(129,70,320,'RÜCKBLICK','naHeadline')}
  {text(126,158,480,'Wählen Sie eine Aufgabe zu Lektion','naSec naNw')}
  {gl(508,161,'17','#74c655')}
  <div className="naGRule" style={{left:540,top:186,width:438,height:3,background:'#b5d8b2'}}/>
  {art('mag1',70,216,56,52)}
  {title('1',125,225,780,'Lesen Sie noch einmal Ihre Pläne im Kursbuch auf Seite 31 (Aufgabe 6).','naRB naNw')}
  {text(165,254,430,'Wann wollen Sie was machen? Schreiben Sie.','naD20')}
  {text(167,291,340,'Im August / Im Sommer ...','naD20')}
  {text(167,316,250,'In zwei Jahren ...','naD20')}
  {text(167,341,250,'In zehn Jahren ...','naD20')}
  {text(167,374,60,'...','naD20')}
  {art('hand1',448,302,388,76)}
  {field('52-t1-a1',230,371,770,'Eigener Satz 1','naFieldBlank')}
  {field('52-t1-a2',167,404,833,'Eigener Satz 2','naFieldBlank')}
  {field('52-t1-a3',167,429,820,'Eigener Satz 3','naFieldBlank')}
  {art('pen1',72,448,56,50)}
  {title('2',122,459,830,'Sie haben 100 000 € gewonnen. Was machen Sie? Schreiben Sie.','naRB naNw')}
  {text(166,498,140,'Reisen?','naD20')}
  {text(165,523,140,'Hobbys?','naD20')}
  {text(163,551,140,'Auto?','naD20')}
  {text(163,578,60,'...','naD20')}
  {art('hand23',318,520,200,60)}
  {field('52-t2-b1',260,495,740,'Eigene Idee 1','naFieldBlank')}
  {field('52-t2-b2',230,574,770,'Eigene Idee 2','naFieldBlank')}
  {field('52-t2-b3',167,606,833,'Eigene Idee 3','naFieldBlank')}
  {field('52-t2-b4',167,634,833,'Eigene Idee 4','naFieldBlank')}
  {text(120,689,480,'Wählen Sie eine Aufgabe zu Lektion','naSec naNw')}
  {gl(502,692,'18','#5a9d97')}
  <div className="naGRule" style={{left:534,top:717,width:432,height:3,background:'#a0c4ca'}}/>
  {art('mag2',70,744,56,52)}
  {title('1',119,756,850,'Lesen Sie noch einmal den Ratgeber im Kursbuch auf Seite 35 und notieren Sie.','naRB naNw')}
  {text(162,795,295,'Diese Körperteile stehen im Text:','naD20 naNw')}
  {field('52-t3-c1',456,793,510,'Körperteile im Text')}
  {text(161,821,350,'Diese Körperteile stehen nicht im Text:','naD20 naNw')}
  {field('52-t3-c2',510,820,456,'Körperteile nicht im Text')}
  {art('pen2',70,872,56,52)}
  {title('2',117,884,830,'Was machen Sie gegen Stress? Machen Sie Notizen und schreiben\nSie dann einen Ratgeber.','naRB naPre')}
  {text(159,949,170,'Gegen Stress hilft:','naD19 naNw')}
  {field('52-t4-d1',322,950,644,'Gegen Stress hilft')}
  {art('hand4',150,986,395,102)}
  {field('52-t4-d2',167,1100,833,'Eigener Ratgeber 1','naFieldBlank')}
  {field('52-t4-d3',167,1132,833,'Eigener Ratgeber 2','naFieldBlank')}
  {field('52-t4-d4',167,1164,833,'Eigener Ratgeber 3','naFieldBlank')}
  {art('modul',0,1388,72,24)}
  {text(96,1388,175,'52 \u00a0|\u00a0 zweiundfünfzig','naFooter naFoot52')}
 </>}
 {page==='83'&&<>
  {art('lesson-tab',723,25,78,97)}
  <div className="naText naHeadline" style={{left:69,top:63,width:230,fontSize:21,letterSpacing:1.5}}><Words text="LERNWORTSCHATZ"/></div>
  <div className="naHeadRule" style={{left:311,top:85,width:339,borderBottom:'2px solid #dc2a27'}}/>
  {title('1',65,123,560,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.','naRB naNw')}
  {text(99,151,160,'Kleidung','naWHead')}
  {text(391,151,240,'Weitere wichtige Wörter','naWHead')}
  {([['Kleidung die',169],['Bluse die, -n',188],['Jacke die, -n',208],['Gürtel der, -',228],['Hemd das, -en',247],['Hose die, -n',266],['Hut der, ¨e',286],['Kleid das, -er',305],['Mantel der, ¨',325],['Mütze die, -n',344]] as [string,number][]).map(([t,y],i)=>
   <div key={t}>{text(99,y,150,t)}{field('83-1-l'+(i+1),228,y,144,t+' übersetzen')}</div>)}
  {text(107,367,150,'A: Haube die, -n','naGray')}
  {text(107,387,150,'CH: Kappe die, -n','naGray')}
  {text(99,403,150,'Pullover der, -')}{field('83-1-l11',228,403,144,'Pullover der, - übersetzen')}
  {text(99,422,150,'Rock der, ¨e')}{field('83-1-l12',228,422,144,'Rock der, ¨e übersetzen')}
  {text(107,445,170,'CH: auch: der Jupe, -s','naGray')}
  {text(99,461,150,'Schuh der, -e')}{field('83-1-l13',228,461,144,'Schuh der, -e übersetzen')}
  {text(99,481,150,'Socke die, -n')}{field('83-1-l14',228,481,144,'Socke die, -n übersetzen')}
  {text(99,500,150,'Strumpf der, ¨e')}{field('83-1-l15',228,500,144,'Strumpf der, ¨e übersetzen')}
  {text(107,523,200,'CH: Strumpfhose die, -n oder','naGray')}
  {text(107,543,150,'Kniesocke die,-n','naGray')}
  {text(99,560,150,'Strumpfhose')}
  {text(108,578,150,'die, -n')}{field('83-1-l16',228,578,144,'Strumpfhose die, -n übersetzen')}
  {text(99,597,150,'T-Shirt das, -s')}{field('83-1-l17',228,597,144,'T-Shirt das, -s übersetzen')}
  {text(391,169,150,'Text der, -e')}{field('83-1-r1',500,169,148,'Text der, -e übersetzen')}
  {text(391,199,150,'an·haben, hat')}
  {text(400,218,150,'angehabt')}{field('83-1-r2',500,218,148,'anhaben übersetzen')}
  {text(391,240,150,'an·ziehen, hat')}
  {text(400,259,150,'angezogen')}{field('83-1-r3',500,257,148,'anziehen übersetzen')}
  {text(391,279,150,'erzählen, hat')}
  {text(400,296,150,'erzählt')}{field('83-1-r4',500,296,148,'erzählen übersetzen')}
  {text(391,325,150,'klug')}{field('83-1-r5',500,325,148,'klug übersetzen')}
  {text(391,355,150,'als')}{field('83-1-r6',500,355,148,'als übersetzen')}
  {text(400,374,150,'schöner als')}{field('83-1-r7',500,374,148,'schöner als übersetzen')}
  {text(391,394,150,'(genau)so wie')}{field('83-1-r8',500,394,148,'(genau)so wie übersetzen')}
  {text(391,413,150,'(genau)so schön')}
  {text(400,433,150,'wie')}{field('83-1-r9',500,433,148,'(genau)so schön wie übersetzen')}
  {text(391,452,150,'zuletzt')}{field('83-1-r10',500,452,148,'zuletzt übersetzen')}
  {text(391,471,150,'zurzeit')}{field('83-1-r11',500,471,148,'zurzeit übersetzen')}
  {text(391,500,150,'Klasse!')}{field('83-1-r12',500,500,148,'Klasse! übersetzen')}
  {text(400,523,150,'A/CH: Super!','naGray')}
  {text(391,540,150,'Toll!')}{field('83-1-r13',500,540,148,'Toll! übersetzen')}
  {art('tipp',246,646,168,56)}
  {text(273,650,140,'Schneiden Sie Bilder','naSmall naNw')}
  {text(273,669,140,'aus und ergänzen Sie','naSmall naNw')}
  {text(273,687,130,'die Kleidung.','naSmall naNw')}
  {art('scissors',414,608,137,85)}
  {art('strip',648,100,157,920)}
  {title('2',65,737,560,'Welche Wörter möchten Sie noch lernen? Notieren Sie.','naRB naNw')}
  {[763,783,802,822,841,861,880,900,919,939,958,977,997].map((y,i)=>field('83-2-'+i,98,y,550,'Notizzeile '+(i+1)))}
  {text(600,1049,135,'dreiundachtzig \u00a0|\u00a0 83','naFooter')}
  {art('modul-tab',738,1048,66,26)}
 </>}
 {page==='30'&&<>
  {art('header',0,0,1072,102)}
  {kb(78,178,'KB 4')}
  {title('1',130,172,760,'Ergänzen Sie das Gespräch. Schreiben Sie Sätze.','naGB')}
  <div className="naSide" style={{left:75,top:200}}>KOMMUNIKATION</div>
  {([['sehr nett sein',172,113],['nicht funktionieren',299,158],['sofort kümmern',637,131],['Ihre Hilfe brauchen',783,130]] as [string,number,number][]).map(([t,x,w])=>text(x,215,w,t,'naOpt naNw'))}
  {text(471,215,160,'für Sie tun können','naOpt naStrike naNw')}
  {[289,462,635,773].map(x=>text(x,215,12,'|','naOpt'))}
  {text(167,250,22,'■','naSq')}
  {text(189,252,40,'Was','naDlg naNw')}
  {art('hand1',225,246,240,40)}
  {rule(462,271,126)}
  {text(591,252,20,'?','naDlg')}
  {text(167,276,22,'▲','naTri')}
  {text(190,273,32,'Ich','naDlg naNw')}
  {field('p30-1a',221,270,291,'Antwort 1a')}
  {text(516,273,16,'.','naDlg')}
  {text(190,299,400,'Die Klimaanlage in meinem Zimmer','naDlg naNw')}
  {field('p30-1b',188,321,399,'Antwort 1b')}
  {text(593,334,16,'.','naDlg')}
  {text(167,361,22,'■','naSq')}
  {text(189,361,200,'Das tut mir leid. Ich','naDlg naNw')}
  {field('p30-1c',372,361,188,'Antwort 1c')}
  {text(189,388,60,'mich','naDlg naNw')}
  {field('p30-1d',252,386,178,'Antwort 1d')}
  {text(438,390,90,'darum.','naDlg naNw')}
  {text(167,414,22,'▲','naTri')}
  {text(189,414,40,'Das','naDlg naNw')}
  {field('p30-1e',232,413,189,'Antwort 1e')}
  {text(429,414,200,'. Vielen Dank!','naDlg naNw')}
  {art('rezeption',636,250,414,226)}
  {check('30-1',190,444,{'p30-1a':'brauche Ihre Hilfe','p30-1b':'funktioniert nicht','p30-1c':'kümmere','p30-1d':'sofort','p30-1e':'ist sehr nett'})}
  {kb(78,490,'KB 5')}
  {title('2',130,482,760,'Was bedeuten die Bilder im Hotel? Ordnen Sie zu.','naGB')}
  <div className="naSide" style={{left:75,top:520}}>WÖRTER</div>
  {([['Föhn',171,42],['Internetverbindung',226,158],['Dusche',491,50],['Klimaanlage',563,97],['Aufzug',673,58],['Minibar',744,52]] as [string,number,number][]).map(([t,x,w])=>text(x,524,w,t,'naOpt naNw'))}
  {text(397,524,80,'Fernseher','naOpt naStrike naNw')}
  {[216,389,476,545,665,735,800].map(x=>text(x,524,10,'|','naOpt'))}
  {([['Schwimmbad',170,109],['Restaurant',293,88],['Radio',395,45],['Tennisplatz',452,92],['Telefon',556,60]] as [string,number,number][]).map(([t,x,w])=>text(x,550,w,t,'naOpt naNw'))}
  {[283,385,444,548].map(x=>text(x,550,10,'|','naOpt'))}
  {([['a',0,189],['d',0,409],['g',0,629],['j',0,844],['b',1,189],['e',1,409],['h',1,629],['k',1,844],['c',2,189],['f',2,409],['i',2,629],['l',2,844]] as [string,number,number][]).map(([l,r,x])=>
   <div key={l}>{text(x-26,[585,726,877][r]+4,20,l)}{art('icon-'+l,x,[585,726,877][r],92,92)}</div>)}
  {art('fernseher-hand',175,668,150,34)}
  {([['p30-2d',384,679,154,'Bild d'],['p30-2g',595,679,155,'Bild g'],['p30-2j',816,682,149,'Bild j'],['p30-2b',160,821,157,'Bild b'],['p30-2e',384,821,154,'Bild e'],['p30-2h',595,824,155,'Bild h'],['p30-2k',816,825,149,'Bild k'],['p30-2c',160,975,157,'Bild c'],['p30-2f',384,977,154,'Bild f'],['p30-2i',595,979,155,'Bild i'],['p30-2l',816,980,149,'Bild l']] as [string,number,number,number,string][]).map(([id,x,y,w,l])=>field(id,x,y,w,l))}
  {check('30-2',160,1011,{'p30-2b':'der Aufzug','p30-2c':'das Telefon','p30-2d':'die Internetverbindung','p30-2e':'das Radio','p30-2f':'das Restaurant','p30-2g':'die Dusche','p30-2h':'die Klimaanlage','p30-2i':'das Schwimmbad','p30-2j':'der Föhn','p30-2k':'die Minibar','p30-2l':'der Tennisplatz'})}
  {kb(78,1052,'KB 5')}
  {title('3',130,1058,820,'Was haben Sie auf einer Reise in Ihrem KOFFER? Finden Sie Wörter.','naGB')}
  <div className="naSide" style={{left:75,top:1090}}>WÖRTER</div>
  {(['K','O','F','F','E','R'] as string[]).map((l,i)=>{const y=Math.round(1090+i*25.8);return <div key={i}>{text(374,y,26,l,'naLet')}{i!==2&&field('p30-3-'+i,398,y-5,205,'KOFFER-Zeile '+(i+1))}{i!==2&&field('p30-3-l'+i,160,y-5,205,'KOFFER-Zeile '+(i+1)+' links')}</div>})}
  {art('foehn',386,1136,104,32)}
  {kb(78,1278,'KB 5')}
  {title('4',130,1270,900,'Machen Sie ein Rätsel für Ihre Partnerin / Ihren Partner wie in 3 zu einem Thema aus den Lektionen 13–15.','naGB')}
  {text(55,1298,26,'●','naOpt')}
  {text(95,1298,26,'●','naOpt')}
  {art('modul-tab',0,1382,58,42)}
  {text(80,1388,150,'30  |  dreißig','naFooter')}
 </>}
 {page==='59'&&<>
  {art('lesson-tab',980,32,86,88)}
  {text(112,84,290,'LERNWORTSCHATZ','naHeadline')}
  <div className="naHeadRule" style={{left:400,top:100,width:360}}/>
  {title('1',107,158,700,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.')}
  <div className="naSide" style={{left:78,top:300}}>WÖRTER</div>
  {text(152,196,160,'Aussehen','naBold')}
  {text(154,225,170,'Bart der, ¨e')}
  {field('59-1-aBar',326,221,192,'Bart der, ¨e übersetzen')}
  {text(154,251,170,'Haar das, -e')}
  {field('59-1-aHaa',326,247,192,'Haar das, -e übersetzen')}
  {text(154,290,170,'blond')}
  {field('59-1-ablo',326,286,192,'blond übersetzen')}
  {text(154,316,170,'dick')}
  {field('59-1-adic',326,312,192,'dick übersetzen')}
  {text(154,342,170,'dünn')}
  {field('59-1-adün',326,338,192,'dünn übersetzen')}
  {text(154,368,170,'glatt')}
  {field('59-1-agla',326,364,192,'glatt übersetzen')}
  {text(154,394,170,'grau')}
  {field('59-1-agra',326,390,192,'grau übersetzen')}
  {text(154,419,170,'hübsch')}
  {field('59-1-ahüb',326,415,192,'hübsch übersetzen')}
  {text(154,445,170,'schlank')}
  {field('59-1-asch',326,441,192,'schlank übersetzen')}
  {text(154,496,160,'Charakter','naBold')}
  {text(155,523,180,'freundlich/')}
  {text(166,548,180,'unfreundlich')}
  {field('59-1-cunfr',326,544,192,'unfreundlich übersetzen')}
  {text(155,574,180,'fröhlich')}
  {field('59-1-cfröh',326,570,192,'fröhlich übersetzen')}
  {text(155,600,180,'glücklich/')}
  {text(166,626,180,'unglücklich')}
  {field('59-1-cungl',326,622,192,'unglücklich übersetzen')}
  {text(155,652,180,'komisch')}
  {field('59-1-ckomi',326,648,192,'komisch übersetzen')}
  {text(155,678,180,'seltsam')}
  {field('59-1-cselt',326,674,192,'seltsam übersetzen')}
  {text(155,703,180,'sympathisch/')}
  {text(166,729,180,'unsympathisch')}
  {field('59-1-cunsy',326,725,206,'unsympathisch übersetzen')}
  {text(155,755,180,'traurig')}
  {field('59-1-ctrau',326,751,206,'traurig übersetzen')}
  {text(539,196,300,'Weitere wichtige Wörter','naBold')}
  {text(541,225,240,'Bäckerei die,')}
  {text(551,251,240,'-en')}
  {field('59-1-w265',686,247,198,'-en Übersetzung')}
  {text(541,277,240,'Hausfrau die,')}
  {text(551,303,240,'-en')}
  {field('59-1-w317',686,299,198,'-en Übersetzung')}
  {text(540,340,240,'beschweren (sich),')}
  {text(552,366,240,'hat sich')}
  {text(552,392,240,'beschwert')}
  {field('59-1-w406',686,388,198,'beschwert Übersetzung')}
  {text(541,419,240,'erkennen, hat')}
  {text(552,445,240,'erkannt')}
  {field('59-1-w459',686,441,198,'erkannt Übersetzung')}
  {text(540,471,240,'geboren sein,')}
  {text(552,496,240,'ist geboren')}
  {field('59-1-w510',686,492,198,'ist geboren Übersetzung')}
  {text(540,522,240,'vergessen,')}
  {text(552,548,240,'du vergisst,')}
  {text(552,574,240,'er vergisst,')}
  {text(552,600,240,'hat vergessen')}
  {field('59-1-w614',686,596,198,'hat vergessen Übersetzung')}
  {text(540,638,240,'gleich')}
  {field('59-1-w652',686,634,198,'gleich Übersetzung')}
  {text(540,664,240,'laut')}
  {field('59-1-w678',686,660,198,'laut Übersetzung')}
  {text(540,690,240,'ledig')}
  {field('59-1-w704',686,686,198,'ledig Übersetzung')}
  {art('strip',912,120,160,1240)}
  {art('tipprule',230,810,236,20)}
  {art('tipp',198,826,68,48)}
  {text(267,835,220,'Machen Sie Wortbilder.','naSmall')}
  {art('handwriting',470,748,320,130)}
  {title('2',107,916,700,'Welche Wörter möchten Sie noch lernen? Notieren Sie.')}
  {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i=>field('59-2-'+i,155,955+i*26,600,'Notizzeile '+(i+1)))}
  {text(811,1384,160,'neunundfünfzig  |  59','naFooter')}
  {art('modul-tab',1008,1384,64,30)}
 </>}
 </div><audio ref={player} className="naPlayer"/></div>;
}
