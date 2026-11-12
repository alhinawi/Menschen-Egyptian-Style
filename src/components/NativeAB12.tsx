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
 const field=(id:string,x:number,y:number,w:number,label:string)=><input className="naField" aria-label={label} data-native-field={id} style={{left:x,top:y,width:w}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>;
 const rule=(x:number,y:number,w:number)=><div className="naRule" style={{left:x,top:y,width:w}}/>;
 const dot=(id:string,value:string,x:number,y:number,label:string,checkbox=false)=><input className="naDot" type={checkbox?'checkbox':'radio'} aria-label={label} name={key+'-'+id} checked={checkbox?values[id]==='true':values[id]===value} onChange={e=>set(id,checkbox?String(e.target.checked):value)} style={{left:x,top:y}}/>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="naCheck" data-check={id} style={{left:x,top:y}}><button onClick={()=>sr({...results,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(v=>normalize(v)===normalize(values[k]||(a==='false'?'false':''))))})}>Prüfen ✓</button><output aria-live="polite">{id in results?(results[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const title=(n:string,x:number,y:number,w:number,t:string,cls='')=><div className={'naTitle '+cls} style={{left:x,top:y,width:w}}><b>{n}</b><Words text={t}/></div>;
 const kb=(x:number,y:number,t:string)=><div className="naKB" style={{left:x,top:y}}>{t}</div>;
 const hand=(x:number,y:number,w:number,t:string)=><div className="naText naHand" style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const audio=(src:string,x:number,y:number,label:string)=><button className="naAudio" style={{left:x,top:y}} aria-label={'Originalaudio '+label+' abspielen'} onClick={()=>{if(player.current){player.current.src=src;player.current.play().catch(()=>{})}}}>▶ {label}</button>;

 return <div className="nativeAB12" ref={root} data-native-ab12={page}><div className={'naCanvas'+(W<1000?' naNarrow':'')} style={{width:W,height:H,transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='89'&&<>
  {art('lesson-tab',738,18,62,75)}
  {text(75,64,300,'LERNWORTSCHATZ','naHeadline')}
  <div className="naHeadRule" style={{left:388,top:78,width:270}}/>
  {title('1',78,116,540,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.','naRB naNw')}
  {text(96,148,160,'Wetter','naWHead')}
  {text(105,171,140,'Wetter das')}
  {([['Gewitter das, -',195],['Grad das, -e',213],['Nebel der',233],['Regen der',254],['Schnee der',272],['Sonne die, -n',293],['Sturm der, ¨e',312],['Wind der, -e',331],['Wolke die, -n',350]] as [string,number][]).map(([t,y],i)=>
   <div key={i}>{text(105,y-2,140,t)}{field('89-1-w'+i,220,y-7,127,t+' übersetzen')}</div>)}
  {([['regnen, hat',379],['geregnet',398],['schneien, hat',418],['geschneit',436],['scheinen, hat',457],['geschienen',476]] as [string,number][]).map(([t,y],i)=>
   <div key={i}>{text(105,y-2,140,t)}{i%2===1&&field('89-1-v'+i,220,y-7,127,'Partizip übersetzen')}</div>)}
  {([['kühl',506],['neblig',525],['sonnig',544],['warm',569],['windig',584]] as [string,number][]).map(([t,y],i)=>
   <div key={i}>{text(105,y-2,140,t)}{field('89-1-a'+i,220,y-7,127,t+' übersetzen')}</div>)}
  {text(396,150,240,'Himmelsrichtungen','naWHead')}
  {text(397,170,220,'Himmelsrichtung')}
  {text(397,190,100,'die, -en')}
  {field('89-1-h0',460,185,133,'Himmelsrichtung übersetzen')}
  {([['Norden der',214],['Süden der',233],['Osten der',254],['Westen der',273]] as [string,number][]).map(([t,y],i)=>
   <div key={i}>{text(396,y-2,100,t)}{field('89-1-h'+(i+1),460,y-7,133,t+' übersetzen')}</div>)}
  {text(396,307,240,'Weitere wichtige Wörter','naWHead')}
  {([['Dach das, ¨er',331],['Frühjahr das, -e',350],['Glas das, ¨er',370],['Glück das',389],['Himmel der',409],['Laune die, -n',429]] as [string,number][]).map(([t,y],i)=>
   <div key={i}>{text(396,y-2,110,t)}{field('89-1-x'+i,460,y-7,133,t+' übersetzen')}</div>)}
  {text(396,445,110,'Reiseführer')}
  {field('89-1-x6',460,440,133,'Reiseführer übersetzen')}
  {text(414,465,60,'der, -')}
  {field('89-1-x7',460,452,133,'Reiseführer der übersetzen')}
  {text(396,486,110,'Traum der, ¨e')}
  {field('89-1-x8',460,481,133,'Traum übersetzen')}
  {art('tipp',433,545,136,42)}
  {text(461,551,110,'Suchen Sie','naSmall')}
  {text(461,569,130,'Wortfamilien.','naSmall')}
  {art('handwriting',360,605,265,60)}
  {art('strip',665,95,140,915)}
  {title('2',78,686,540,'Welche Wörter möchten Sie noch lernen? Notieren Sie.','naRB naNw')}
  {[713,732,752,772,791,811,830,849,869,888,908,927,947,966,986,1005].map((y,i)=>field('89-2-'+i,102,y,525,'Notizzeile '+(i+1)))}
  {text(598,1047,150,'neunundachtzig  |  89','naFooter')}
  {art('modul-tab',722,1038,50,24)}
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
  {rule(472,271,116)}
  {text(591,252,20,'?','naDlg')}
  {text(167,276,22,'▲','naTri')}
  {text(190,277,32,'Ich','naDlg naNw')}
  {field('p30-1a',221,270,291,'Antwort 1a')}
  {text(516,277,16,'.','naDlg')}
  {text(190,304,400,'Die Klimaanlage in meinem Zimmer','naDlg naNw')}
  {field('p30-1b',188,321,399,'Antwort 1b')}
  {text(593,334,16,'.','naDlg')}
  {text(167,366,22,'■','naSq')}
  {text(189,368,200,'Das tut mir leid. Ich','naDlg naNw')}
  {field('p30-1c',372,361,188,'Antwort 1c')}
  {text(189,392,60,'mich','naDlg naNw')}
  {field('p30-1d',252,386,178,'Antwort 1d')}
  {text(438,394,90,'darum.','naDlg naNw')}
  {text(167,420,22,'▲','naTri')}
  {text(189,421,40,'Das','naDlg naNw')}
  {field('p30-1e',232,413,189,'Antwort 1e')}
  {text(429,421,200,'. Vielen Dank!','naDlg naNw')}
  {art('rezeption',636,250,414,226)}
  {check('30-1',190,446,{'p30-1a':'brauche Ihre Hilfe','p30-1b':'funktioniert nicht','p30-1c':'kümmere','p30-1d':'sofort','p30-1e':'ist sehr nett'})}
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
  {title('3',130,1044,820,'Was haben Sie auf einer Reise in Ihrem KOFFER? Finden Sie Wörter.','naGB')}
  <div className="naSide" style={{left:75,top:1090}}>WÖRTER</div>
  {(['K','O','F','F','E','R'] as string[]).map((l,i)=>{const y=1086+i*27;return <div key={i}>{text(374,y,26,l,'naLet')}{i!==2&&field('p30-3-'+i,398,y-7,205,'KOFFER-Zeile '+(i+1))}{i!==2&&field('p30-3-l'+i,160,y-7,205,'KOFFER-Zeile '+(i+1)+' links')}</div>})}
  {art('foehn',386,1130,104,32)}
  {kb(78,1278,'KB 5')}
  {title('4',130,1270,900,'Machen Sie ein Rätsel für Ihre Partnerin / Ihren Partner wie in 3 zu einem Thema aus den Lektionen 13–15.','naGB')}
  {text(55,1298,26,'●','naOpt')}
  {text(95,1298,26,'●','naOpt')}
  {art('modul-tab',0,1382,58,42)}
  {text(80,1388,150,'30  |  dreißig','naFooter')}
 </>}
 {page==='59'&&<>
  {art('lesson-tab',980,32,86,88)}
  {text(112,86,290,'LERNWORTSCHATZ','naHeadline')}
  <div className="naHeadRule" style={{left:400,top:100,width:360}}/>
  {title('1',107,158,700,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.')}
  <div className="naSide" style={{left:78,top:300}}>WÖRTER</div>
  {text(152,200,160,'Aussehen','naBold')}
  {([['Bart der, ¨e',231],['Haar das, -e',256],['blond',293],['dick',319],['dünn',345],['glatt',371],['grau',402],['hübsch',422],['schlank',448]] as [string,number][]).map(([t,y],i)=>
   <div key={i}>{text(154,y+2,170,t)}{field('59-1-a'+i,326,y-5,192,t+' übersetzen')}</div>)}
  {text(154,500,160,'Charakter','naBold')}
  {([['freundlich/',526],['unfreundlich',552],['fröhlich',577],['glücklich/',603],['unglücklich',629],['komisch',655],['seltsam',681],['sympathisch/',706],['unsympathisch',732],['traurig',759]] as [string,number][]).map(([t,y],i)=>
   <div key={i}>{text(155,y+2,180,t)}{[1,2,4,5,6,8,9].includes(i)&&field('59-1-c'+i,326,y-5,192,t.replace('/','')+' übersetzen')}</div>)}
  {text(539,200,300,'Weitere wichtige Wörter','naBold')}
  {([['Bäckerei die,',229,534],['-en',260,549],['Hausfrau die,',280,534],['-en',312,549],['beschweren (sich),',345,533],['hat sich',371,545],['beschwert',396,544],['erkennen, hat',422,534],['erkannt',448,545],['geboren sein,',474,533],['ist geboren',500,545],['vergessen,',531,533],['du vergisst,',551,545],['er vergisst,',578,545],['hat vergessen',603,545],['gleich',641,534],['laut',667,534],['ledig',693,534]] as [string,number,number][]).map(([t,y,x],i)=>
   <div key={i}>{text(x,y+2,240,t)}</div>)}
  {[260,312,396,448,500,603,641,667,693].map((y,i)=>field('59-1-w'+i,686,+y-5,198,'Übersetzung '+(i+1)))}
  {art('strip',912,120,160,1240)}
  {art('tipprule',230,810,236,20)}
  {art('tipp',198,826,68,48)}
  {text(267,837,220,'Machen Sie Wortbilder.','naSmall')}
  {art('handwriting',470,748,320,130)}
  {title('2',107,916,700,'Welche Wörter möchten Sie noch lernen? Notieren Sie.')}
  {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i=>field('59-2-'+i,155,955+i*26,600,'Notizzeile '+(i+1)))}
  {text(811,1386,160,'neunundfünfzig  |  59','naFooter')}
  {art('modul-tab',1008,1384,64,30)}
 </>}
 </div><audio ref={player} className="naPlayer"/></div>;
}
