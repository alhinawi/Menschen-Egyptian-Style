import {usePageReset} from '../exercises/usePageReset';
import {useLayoutEffect,useRef,useState} from 'react';
import {PageImage} from '../components/PageImage';
import {CheckButton} from '../components/CheckButton';
import '../components/native-ab12.css';

function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\p{L}/u.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-word={w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text}>{w}</span>:w)}</>}
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\s+/g,' ');

export function NativeAB12P82({page}:{page:string}){
 const W=807, H=1094;
 const root=useRef<HTMLDivElement>(null),player=useRef<HTMLAudioElement>(null);
 const [scale,ss]=useState(.6);const key='native-ab12-'+page;
 const [values,sv]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});
 const [results,sr]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{if(document.fonts){['400 13px DroidSerif','700 13px DroidSerif','400 22px DroidSerif','600 15px FiraSans','700 13px FiraSans','600 12px FiraSans'].forEach(f=>{try{document.fonts.load(f)}catch{}})}},[]);
 useLayoutEffect(()=>{const el=root.current!;const obs=new ResizeObserver(()=>ss(Math.min(el.clientWidth/W,(el.clientHeight-38)/H)));obs.observe(el);return ()=>obs.disconnect()},[]);
 usePageReset(page,key,()=>{sv({});sr({})});
 const set=(id:string,v:string)=>{const n={...values,[id]:v};sv(n);localStorage.setItem(key,JSON.stringify(n))};
 const paintRadios=(answers:Record<string,string>)=>{Object.entries(answers).forEach(([f,correct])=>{
  const els=[...document.querySelectorAll(`[data-native-ab12="${page}"] input[type="radio"][data-native-field="${f}"]`)] as HTMLInputElement[];
  if(!els.length)return;
  const v=values[f]||'';
  els.forEach(el=>el.removeAttribute('data-check-mark'));
  if(v===correct){els.find(el=>el.value===v)?.setAttribute('data-check-mark','ok')}
  else if(v){els.find(el=>el.value===v)?.setAttribute('data-check-mark','bad')}
  else els.forEach(el=>el.setAttribute('data-check-mark','bad'));
 })};
 const text=(x:number,y:number,w:number,t:string,cls='')=><div className={'naText '+cls} style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="naArt" src={`/assets/book-crops/native-ab12-p${page}-${name}.png`} alt={'Originalillustration '+name} style={{left:x,top:y,width:w,height:h}}/>;
 const num=(x:number,y:number,n:string)=><div className="naNum82" style={{left:x,top:y}}>{n}</div>;
 const name82=(x:number,y:number,t:string,c:string)=><div className="naName82" style={{left:x,top:y,color:c}}>{t}</div>;
 const rail=(x:number,y:number,t:string)=><div className="naRail82" style={{left:x,top:y}}>{t}</div>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="naCheck" data-check={id} style={{left:x,top:y}}><CheckButton answers={answers} onClick={()=>{sr({...results,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(v=>normalize(v)===normalize(values[k]||'')))});paintRadios(answers)}}/><output aria-live="polite">{id in results?(results[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const dot=(id:string,value:string,x:number,y:number,label:string)=><input type="radio" className="naDot82" name={key+'-'+id} aria-label={label} data-native-field={id} value={value} style={{left:x,top:y}} checked={values[id]===value} onChange={()=>{set(id,value);document.querySelectorAll('[data-native-ab12="82"] input[data-native-field="'+id+'"]').forEach(i=>i.removeAttribute('data-check-mark'))}}/>;
 // ex1: single-letter cells between printed letters
 const L=(x:number,base:number,t:string,w=13)=><div className="naText naLet82" style={{left:x,top:base-15,width:w}}>{t}</div>;
 const G=(id:string,x:number,base:number,label:string,w=12)=><input className="naCell82" aria-label={label} data-native-field={id} style={{left:x,top:base-16,width:w}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false} maxLength={2}/>;
 // ex2/ex4: word/phrase fields ending on the printed rule
 const F=(id:string,x:number,ruleY:number,w:number,label:string)=><input className="naField82" aria-label={label} data-native-field={id} style={{left:x,top:ruleY-16,width:w}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>;
 const F4=(id:string,x:number,ruleY:number,w:number,label:string)=><input className="naField82 naF4x82" aria-label={label} data-native-field={id} style={{left:x,top:ruleY-16,width:w}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>;

 if(page!=='82')return null;
 return <div className="nativeAB12" ref={root} data-native-ab12={page}><style>{`@font-face{font-family:FiraSans;src:url('/assets/fonts/firasans-latin-400.woff2') format('woff2');font-weight:400}@font-face{font-family:FiraSans;src:url('/assets/fonts/firasans-latin-700.woff2') format('woff2');font-weight:700}@font-face{font-family:FiraSans;src:url('/assets/fonts/firasans-latin-600.woff2') format('woff2');font-weight:600}@font-face{font-family:DroidSerif;src:url('/assets/fonts/droid-serif-400.ttf') format('truetype');font-weight:400}@font-face{font-family:LibSerif;src:url('/assets/fonts/liberation-serif-regular.woff2') format('woff2');font-weight:400}@font-face{font-family:DroidSerif;src:url('/assets/fonts/droid-serif-700.woff2') format('woff2');font-weight:700}
[data-native-ab12='82'] .naText{font-family:DroidSerif,Georgia,serif;font-size:13.3px!important;color:#2b2b2b;letter-spacing:0;position:absolute;white-space:nowrap}
[data-native-ab12='82'] .naArt{position:absolute;object-fit:fill}
[data-native-ab12='82'] .naNum82{position:absolute;width:21px;height:19px;background:#e30613;color:#fff;font:700 13px/19px FiraSans,sans-serif;text-align:center}
[data-native-ab12='82'] .naT82{font-family:FiraSans,sans-serif!important;font-weight:600;font-size:15px!important;color:#17141c!important}
[data-native-ab12='82'] .naTest82{font-size:22px!important;letter-spacing:3px!important;color:#6e6e6e!important}
[data-native-ab12='82'] .naPkt82{font-size:12px!important;color:#666!important;font-variant:small-caps;letter-spacing:.5px}
[data-native-ab12='82'] .naName82{position:absolute;font:600 12px FiraSans,sans-serif}
[data-native-ab12='82'] .naRail82{position:absolute;font:600 10px FiraSans,sans-serif;color:#6f77ab;letter-spacing:2px;writing-mode:vertical-rl;transform:rotate(180deg)}
[data-native-ab12='82'] .naChat82{font-family:LibSerif,Georgia,serif!important;font-size:13.3px!important;color:#33454f!important}
[data-native-ab12='82'] .naLet82{font-size:13.3px!important;text-align:center}
[data-native-ab12='82'] .naCell82{position:absolute;height:16px;background:transparent;border:none;border-bottom:1.5px solid #9aa3ab;font:13px DroidSerif,Georgia,serif;color:#1c3f8f;padding:0;text-align:center;outline:none;box-sizing:border-box}
[data-native-ab12='82'] .naCanvas .naCell82[data-check-mark="ok"]{background:transparent!important;border-color:transparent!important;box-shadow:none!important;border-bottom:2px solid #2f7d4f!important;color:#1c3f8f!important}
[data-native-ab12='82'] .naCanvas .naCell82[data-check-mark="bad"]{background:transparent!important;border-color:transparent!important;box-shadow:none!important;border-bottom:2px solid #c62f2f!important;color:#1c3f8f!important}
[data-native-ab12='82'] .naCanvas input.naField82{position:absolute;height:17px;background:transparent;border:none;border-bottom:1.5px solid #b9b3a4;font:13px DroidSerif,Georgia,serif;color:#1c3f8f;padding:0 2px;outline:none;box-sizing:border-box}
[data-native-ab12='82'] .naCanvas input.naField82[data-check-mark="ok"]{background:transparent!important;border-color:transparent!important;box-shadow:none!important;border-bottom:2px solid #2f7d4f!important;color:#1c3f8f!important}
[data-native-ab12='82'] .naCanvas input.naField82[data-check-mark="bad"]{background:transparent!important;border-color:transparent!important;box-shadow:none!important;border-bottom:2px solid #c62f2f!important;color:#1c3f8f!important}
[data-native-ab12='82'] .naDot82{position:absolute;appearance:none;-webkit-appearance:none;width:13px!important;height:13px!important;border:1.5px solid #a8a8a8!important;border-radius:50%!important;background:#fff;margin:0!important;padding:0;cursor:pointer;outline:none;box-sizing:border-box}
[data-native-ab12='82'] .naDot82:checked{background:radial-gradient(circle at center,#444 0 3.5px,#fff 4.5px)}
[data-native-ab12='82'] .naDot82[data-check-mark="ok"]{border-color:#2f7d4f!important;box-shadow:0 0 0 2px rgba(47,125,79,.55)!important}
[data-native-ab12='82'] .naDot82[data-check-mark="bad"]{border-color:#c62f2f!important;box-shadow:0 0 0 2px rgba(198,47,47,.55)!important}
[data-native-ab12='82'] .naWB82{position:absolute;font-family:DroidSerif,Georgia,serif;font-size:13px;color:#2b2b2b;white-space:nowrap}
[data-native-ab12='82'] .naWB82 b{font-weight:400;background:#f8f2cd;padding:1px 1px}
[data-native-ab12='82'] .naFoot82{font-size:14px!important;color:#333!important}
[data-native-ab12='82'] .naUrl82{font-family:FiraSans,sans-serif!important;font-size:9px!important;color:#999!important}
[data-native-ab12='82'] .naCheck{position:absolute;display:flex;align-items:center;gap:6px}
[data-native-ab12='82'] .naCheck output{font:600 13px FiraSans,sans-serif;color:#26764c}
`}</style><div className="naCanvas naNarrow" style={{width:W,height:H,transform:`translate(-50%,-50%) scale(${scale})`}}>

  {/* TEST header */}
  {text(96,60,60,'TEST','naTest82')}
  <div style={{position:'absolute',left:150,top:81,width:642,height:2,background:'#e30613'}}/>
  {rail(74,192,'WÖRTER')}
  {rail(74,342,'STRUKTUREN')}
  {rail(74,540,'STRUKTUREN')}
  {rail(74,662,'KOMMUNIKATION')}

  {/* ex 1 Wie heißt die Kleidung? */}
  {num(96,115,'1')}
  {text(126,116,300,'Wie heißt die Kleidung? Ergänzen Sie.','naT82')}
  {/* a: Jacke */}
  {text(124,153,14,'a')}
  {text(145,153,158,'Mama, brauche ich eine')}
  {art('muetze',307,147,56,26)}
  {text(368,153,152,'– Ja, und mach deine')}
  {L(521,168,'J')}{G('p82-1a1',528,168,'1a Jacke 2')}{G('p82-1a2',542,168,'1a Jacke 3')}{G('p82-1a3',556,168,'1a Jacke 4')}{G('p82-1a4',570,168,'1a Jacke 5')}
  {text(586,153,115,'zu. Es ist kalt.')}
  {/* b: Socken */}
  {text(124,172,14,'b')}
  {text(145,172,290,'Meine Füße sind so kalt. – Hier sind warme')}
  {G('p82-1b1',437,187,'1b Socken 1',13)}{G('p82-1b2',453,187,'1b Socken 2',13)}{L(468,187,'c')}{L(484,187,'k')}{G('p82-1b3',501,187,'1b Socken 5',13)}
  {text(516,172,10,'.')}
  {/* c: Gürtel / Hose */}
  {text(124,192,14,'c')}
  {text(145,192,312,'Kann ich Ihnen helfen? – Gerne, ich suche einen')}
  {L(469,207,'G')}{L(484,207,'ü')}{G('p82-1c1',500,207,'1c Gürtel 3',11)}{G('p82-1c2',514,207,'1c Gürtel 4',11)}{G('p82-1c3',528,207,'1c Gürtel 5',11)}{G('p82-1c4',542,207,'1c Gürtel 6',11)}
  {text(556,192,68,'für meine')}
  {L(626,207,'H')}{G('p82-1c5',640,207,'1c Hose 2',11)}{G('p82-1c6',654,207,'1c Hose 3',11)}{G('p82-1c7',668,207,'1c Hose 4',11)}
  {text(680,192,8,'.')}
  {/* d: Kleid */}
  {text(124,211,14,'d')}
  {text(145,211,352,'Warst du auf der Hochzeit von Ann-Sophie? – Ja, ihr')}
  {G('p82-1d1',498,226,'1d Kleid 1',11)}{L(511,226,'l',8)}{G('p82-1d2',520,226,'1d Kleid 3',11)}{G('p82-1d3',534,226,'1d Kleid 4',11)}{L(548,226,'d',11)}
  {text(560,211,65,'war toll!')}
  {/* e: Pullover */}
  {text(124,231,14,'e')}
  {text(145,231,328,'Was trägst du im Büro? – Meistens ein Hemd mit')}
  {L(472,246,'P')}{G('p82-1e1',499,246,'1e Pullover 2',11)}{G('p82-1e2',512,246,'1e Pullover 3',11)}{G('p82-1e3',525,246,'1e Pullover 4',11)}{G('p82-1e4',538,246,'1e Pullover 5',11)}{G('p82-1e5',551,246,'1e Pullover 6',11)}{G('p82-1e6',564,246,'1e Pullover 7',11)}
  {text(577,231,12,'r.')}
  {/* f: Bluse */}
  {text(124,252,14,'f')}
  {text(145,252,388,'Anna, dein Hemd gefällt mir. – Oh danke, aber das ist eine')}
  {L(538,267,'B')}{G('p82-1f1',549,267,'1f Bluse 2',11)}{G('p82-1f2',560,267,'1f Bluse 3',11)}{L(571,267,'s',9)}{G('p82-1f3',582,267,'1f Bluse 5',11)}
  {text(594,252,8,'.')}
  {/* g: Hut */}
  {text(124,272,14,'g')}
  {text(145,272,202,'Meine Oma trägt immer einen')}
  {G('p82-1g1',346,287,'1g Hut 1',11)}{L(360,287,'u',9)}{G('p82-1g2',370,287,'1g Hut 3',11)}
  {text(382,272,72,'. – Klasse!')}
  {text(648,272,120,'_ / 8 Punkte','naPkt82')}
  {check('82-1',470,269,{'p82-1a1':'a','p82-1a2':'c','p82-1a3':'k','p82-1a4':'e','p82-1b1':'s','p82-1b2':'o','p82-1b3':'e','p82-1c1':'r','p82-1c2':'t','p82-1c3':'e','p82-1c4':'l','p82-1c5':'o','p82-1c6':'s','p82-1c7':'e','p82-1d1':'k','p82-1d2':'e','p82-1d3':'i','p82-1e1':'u','p82-1e2':'l','p82-1e3':'l','p82-1e4':'o','p82-1e5':'v','p82-1e6':'e','p82-1f1':'l','p82-1f2':'u','p82-1f3':'e','p82-1g1':'h','p82-1g2':'t'})}

  {/* ex 2 alt, gern, groß, gut */}
  {num(96,311,'2')}
  {text(126,312,420,'Ergänzen Sie alt, gern, groß, gut in der richtigen Form.','naT82')}
  {text(126,346,14,'a')}
  {text(145,346,80,'Duisburg ist')}
  {art('gross',226,346,30,25)}
  {text(258,346,24,'(+),')}
  {text(284,346,88,'München ist')}
  {F('p82-2a1',371,362,137,'2a München größer')}
  {text(510,346,32,'(++)')}
  {text(543,346,26,'und')}
  {F('p82-2a2',573,363,131,'2a Berlin am größten')}
  {text(145,365,115,'(+++) ist Berlin.')}
  {text(126,385,14,'b')}
  {text(145,385,90,'Niklas macht')}
  {F('p82-2b1',236,401,137,'2b gern')}
  {text(377,385,22,'(+)')}
  {text(399,385,44,'Sport,')}
  {F('p82-2b2',461,402,119,'2b am besten')}
  {text(585,385,36,'(+++)')}
  {text(623,385,125,'findet er Fußball.')}
  {text(126,405,14,'c')}
  {text(145,405,210,'Ich bin 15, mein Bruder Paul ist')}
  {F('p82-2c',359,421,116,'2c älter')}
  {text(479,405,52,'(++),')}
  {text(534,405,100,'er ist schon 20.')}
  {text(126,424,14,'d')}
  {text(145,424,146,'Tobias mag kein Obst,')}
  {F('p82-2d',291,440,134,'2d am liebsten')}
  {text(429,424,40,'(+++)')}
  {text(471,424,115,'isst er Schokolade.')}
  {text(126,443,14,'e')}
  {text(145,443,88,'Carla spricht')}
  {F('p82-2e',233,459,135,'2e besser')}
  {text(372,443,32,'(++)')}
  {text(405,443,258,'Deutsch als ich, ich mache noch viele Fehler.')}
  {text(126,463,14,'f')}
  {text(145,463,122,'Sandra mag Röcke')}
  {F('p82-2f',269,479,133,'2f lieber')}
  {text(406,463,34,'(++)')}
  {text(441,463,64,'als Hosen.')}
  {text(648,466,120,'_ / 8 Punkte','naPkt82')}
  {check('82-2',515,464,{'p82-2a1':'größer','p82-2a2':'am größten','p82-2b1':'gern','p82-2b2':'am besten','p82-2c':'älter','p82-2d':'am liebsten','p82-2e':'besser','p82-2f':'lieber'})}

  {/* ex 3 Was ist richtig? */}
  {num(96,505,'3')}
  {text(126,506,260,'Was ist richtig? Kreuzen Sie an.','naT82')}
  {text(124,539,14,'a')}
  {text(144,539,138,'Sie ist genauso groß')}
  {art('r3aempty',283,537,22,20)}
  {text(312,539,25,'als')}
  {art('r3ax',338,537,24,20)}
  {text(366,539,40,'wie')}
  {text(408,539,100,'ihre Freundin.')}
  {text(124,558,14,'b')}
  {text(144,558,152,'Karl hat mehr Urlaub')}
  {dot('p82-3b','als',302,563,'3b als')}{text(325,558,24,'als')}
  {dot('p82-3b','wie',358,563,'3b wie')}{text(380,558,38,'wie')}
  {text(421,558,82,'Franziska.')}
  {text(124,577,14,'c')}
  {text(144,577,172,'Hier ist es genauso schön')}
  {dot('p82-3c','als',319,583,'3c als')}{text(342,577,24,'als')}
  {dot('p82-3c','wie',380,583,'3c wie')}{text(402,577,38,'wie')}
  {text(443,577,92,'in der Schweiz.')}
  {text(124,596,14,'d')}
  {text(144,596,203,'Dominik spielt besser Gitarre')}
  {dot('p82-3d','als',352,602,'3d als')}{text(375,596,24,'als')}
  {dot('p82-3d','wie',408,602,'3d wie')}{text(430,596,38,'wie')}
  {text(471,596,40,'Udo.')}
  {text(124,616,14,'e')}
  {text(144,616,203,'Dieser Test ist genauso leicht')}
  {dot('p82-3e','als',344,622,'3e als')}{text(367,616,24,'als')}
  {dot('p82-3e','wie',404,622,'3e wie')}{text(427,616,38,'wie')}
  {text(467,616,136,'der Test in Lektion 7.')}
  {text(645,622,120,'_ / 4 Punkte','naPkt82')}
  {check('82-3',615,595,{'p82-3b':'als','p82-3c':'wie','p82-3d':'als','p82-3e':'wie'})}

  {/* ex 4 Ergänzen Sie die Sätze. */}
  {num(96,661,'4')}
  {text(126,662,240,'Ergänzen Sie die Sätze.','naT82')}
  <div className="naWB82" style={{left:126,top:698}}><b>wie langweilig</b>{' | '}<b>wahnsinnig teuer</b>{' | '}<b>total schön</b>{' | '}<b>am besten</b>{' | '}<b>fast täglich</b>{' | '}<b>viel praktischer</b></div>
  {name82(129,729,'Dita312:','#b04a4a')}
  {text(218,731,448,'Was zieht ihr gern an? Habt ihr ein Lieblingskleid oder ein Lieblingsshirt?','naChat82')}
  {name82(129,747,'Blue_ocean:','#1f8fc4')}
  {text(218,747,540,'Im Büro muss ich immer eine Bluse und einen Rock tragen. Zu Hause trage ich nur','naChat82')}
  {text(218,764,128,'Hosen, ich finde das','naChat82')}
  {F4('p82-4a',346,779,234,'4a viel praktischer')}
  {text(585,764,128,'(a) als Röcke und es','naChat82')}
  {text(218,782,88,'gefällt mir so','naChat82')}
  {F4('p82-4b',305,797,232,'4b am besten')}
  {text(542,782,30,'(b).','naChat82')}
  {name82(134,801,'Lola:','#3d6ea5')}
  {text(218,800,228,'Ich habe ein Lieblings-T-Shirt, das ist','naChat82')}
  {F4('p82-4c',447,815,236,'4c total schön')}
  {text(686,800,26,'(c).','naChat82')}
  {text(218,819,355,'Das habe ich im Hard-Rock-Café in Rom gekauft. Es war','naChat82')}
  {F4('p82-4d',218,852,237,'4d wahnsinnig teuer')}
  {text(457,837,168,'(d), 35 Euro! Ich trage es','naChat82')}
  {F4('p82-4e',218,868,237,'4e fast täglich')}
  {text(457,859,26,'(e).','naChat82')}
  {name82(129,873,'Dita312:','#b04a4a')}
  {text(218,872,162,'Was? Das gefällt dir? Ach,','naChat82')}
  {F4('p82-4f',378,887,234,'4f wie langweilig')}
  {text(617,872,26,'(f)!','naChat82')}
  {text(218,893,240,'Also, ich trage nur Kleidung von …','naChat82')}
  {text(645,900,120,'_ / 6 Punkte','naPkt82')}
  {check('82-4',470,900,{'p82-4a':'viel praktischer','p82-4b':'am besten','p82-4c':'total schön','p82-4d':'wahnsinnig teuer','p82-4e':'fast täglich','p82-4f':'wie langweilig'})}

  {/* Punktetabelle */}
  {art('punkte',343,928,400,112)}

  {/* footer */}
  <div style={{position:'absolute',left:2,top:1051,width:56,height:16,background:'#d9d0ab',color:'#fff',font:'600 9.5px FiraSans,sans-serif',display:'flex',alignItems:'center',justifyContent:'center'}}>Modul 8</div>
  {text(68,1050,15,'82','naFoot82')}{text(84,1050,8,'|','naFoot82')}{text(100,1050,110,'zweiundachtzig','naFoot82')}
  {text(565,1043,185,'www.hueber.de/menschen/lernen','naUrl82')}
 </div><audio ref={player} className="naPlayer"/></div>;
}
