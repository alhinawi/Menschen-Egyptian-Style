import {usePageReset} from '../exercises/usePageReset';
import {useLayoutEffect,useRef,useState} from 'react';
import {PageImage} from '../components/PageImage';
import {CheckButton} from '../components/CheckButton';
import '../components/native-ab12.css';

function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\p{L}/u.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-word={w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text}>{w}</span>:w)}</>}
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\s+/g,' ');

export function NativeAB12P78({page}:{page:string}){
 const W=807, H=1094;
 const root=useRef<HTMLDivElement>(null),player=useRef<HTMLAudioElement>(null);
 const [scale,ss]=useState(.6);const key='native-ab12-'+page;
 const [values,sv]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});
 const [results,sr]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{if(document.fonts){['400 13px DroidSerif','700 13px DroidSerif','400 23px DroidSerif','600 15px FiraSans','700 13px FiraSans','500 13px FiraSans','600 11px FiraSans'].forEach(f=>{try{document.fonts.load(f)}catch{}})}},[]);
 useLayoutEffect(()=>{const el=root.current!;const obs=new ResizeObserver(()=>ss(Math.min(el.clientWidth/W,(el.clientHeight-38)/H)));obs.observe(el);return ()=>obs.disconnect()},[]);
 usePageReset(page,key,()=>{sv({});sr({})});
 const set=(id:string,v:string)=>{const n={...values,[id]:v};sv(n);localStorage.setItem(key,JSON.stringify(n))};
 const text=(x:number,y:number,w:number,t:string,cls='')=><div className={'naText '+cls} style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="naArt" src={`assets/book-crops/native-ab12-p${page}-${name}.png`} alt={'Originalillustration '+name} style={{left:x,top:y,width:w,height:h}}/>;
 const num=(x:number,y:number,n:string)=><div className="naNum78" style={{left:x,top:y}}>{n}</div>;
 const kb=(x:number,y:number,t:string)=><div className="naKB78" style={{left:x,top:y}}>{t}</div>;
 const rail=(x:number,y:number,t:string)=><div className="naRail78" style={{left:x,top:y}}>{t}</div>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="naCheck" data-check={id} style={{left:x,top:y}}><CheckButton answers={answers} onClick={()=>sr({...results,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(v=>normalize(v)===normalize(values[k]||'')))})}/><output aria-live="polite">{id in results?(results[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const dot=(id:string,value:string,x:number,y:number,label:string)=><input type="radio" className="naDot naDot78" name={key+'-'+id} aria-label={label} data-native-field={id} value={value} style={{left:x,top:y}} checked={values[id]===value} onChange={()=>set(id,value)}/>;
 // ex1: one letter cell = either a printed letter or a single-letter gap field
 const L=(x:number,base:number,t:string)=><div className="naText naLet78" style={{left:x,top:base-15,width:13}}>{t}</div>;
 const G=(id:string,x:number,base:number,label:string)=><input className="naField78" aria-label={label} data-native-field={id} style={{left:x,top:base-16}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false} maxLength={2}/>;
 // ex3: clickable besser/lieber pair
 const pick=(id:string)=><span className="naPick78" data-native-field={id} data-value={values[id]||''} data-empty={values[id]?'0':'1'}>
  <span className={'naOpt78'+(values[id]==='besser'?' on78':'')} onClick={e=>{set(id,values[id]==='besser'?'':'besser');(e.currentTarget.closest('[data-native-field]') as HTMLElement)?.removeAttribute('data-check-mark')}}>besser</span>
  /<span className={'naOpt78'+(values[id]==='lieber'?' on78':'')} onClick={e=>{set(id,values[id]==='lieber'?'':'lieber');(e.currentTarget.closest('[data-native-field]') as HTMLElement)?.removeAttribute('data-check-mark')}}>lieber</span>
 </span>;
 const bul=(x:number,y:number,t:string,c:string)=><div className="naBul78" style={{left:x,top:y,color:c}}>{t}</div>;
 const B='#1f3e88';

 if(page!=='78')return null;
 return <div className="nativeAB12" ref={root} data-native-ab12={page}><style>{`@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-400.woff2') format('woff2');font-weight:400}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-700.woff2') format('woff2');font-weight:700}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-600.woff2') format('woff2');font-weight:600}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-500.ttf') format('truetype');font-weight:500}@font-face{font-family:DroidSerif;src:url('assets/fonts/droid-serif-400.ttf') format('truetype');font-weight:400}@font-face{font-family:DroidSerif;src:url('assets/fonts/droid-serif-700.woff2') format('woff2');font-weight:700}
[data-native-ab12='78'] .naText{font-family:DroidSerif,Georgia,serif;font-size:13px;color:#2b2b2b;letter-spacing:0;position:absolute;white-space:nowrap}
[data-native-ab12='78'] .naArt{position:absolute;object-fit:fill}
[data-native-ab12='78'] .naNum78{position:absolute;width:21px;height:17px;background:#e30613;color:#fff;font:700 13px/17px FiraSans,sans-serif;text-align:center}
[data-native-ab12='78'] .naKB78{position:absolute;font:600 10.5px FiraSans,sans-serif;color:#5ab0da}
[data-native-ab12='78'] .naRail78{position:absolute;font:600 10px FiraSans,sans-serif;color:#6f77ab;letter-spacing:2px;writing-mode:vertical-rl;transform:rotate(180deg)}
[data-native-ab12='78'] .naT78{font-family:FiraSans,sans-serif!important;font-weight:600;font-size:15px!important;color:#17141c!important}
[data-native-ab12='78'] .naTitle78{font-size:22.5px!important;letter-spacing:.7px!important;color:#1a1a1a!important}
[data-native-ab12='78'] .naLet78{font-size:15px!important}
[data-native-ab12='78'] .naField78{position:absolute;width:13px;height:16px;background:transparent;border:none;border-bottom:1.5px solid #9aa3ab;font:14px DroidSerif,Georgia,serif;color:#1c3f8f;padding:0;text-align:center;outline:none;box-sizing:border-box}
[data-native-ab12='78'] .naCanvas .naField78[data-check-mark="ok"]{background:transparent!important;border-color:transparent!important;box-shadow:none!important;border-bottom:2px solid #2f7d4f!important;color:#1c3f8f!important}
[data-native-ab12='78'] .naCanvas .naField78[data-check-mark="bad"]{background:transparent!important;border-color:transparent!important;box-shadow:none!important;border-bottom:2px solid #c62f2f!important;color:#1c3f8f!important}
[data-native-ab12='78'] .naPick78{position:relative;white-space:nowrap}
[data-native-ab12='78'] .naOpt78{cursor:pointer;border-radius:2px;padding:0 1px}
[data-native-ab12='78'] .naOpt78:hover{background:#eee}
[data-native-ab12='78'] .naOpt78.on78{background:#e3dc67}
[data-native-ab12='78'] .naPick78[data-check-mark="ok"] .naOpt78.on78{background:#bfe3c8}
[data-native-ab12='78'] .naPick78[data-check-mark="bad"] .naOpt78.on78{background:#f5c1c1}
[data-native-ab12='78'] .naPick78[data-check-mark="bad"][data-empty="1"]{box-shadow:0 2px 0 #c62f2f}
[data-native-ab12='78'] .naDot78{position:absolute;width:11px!important;height:11px!important;border-width:1.5px!important;margin:0!important}
[data-native-ab12='78'] .naBul78{position:absolute;font:11px Arial,sans-serif}
[data-native-ab12='78'] .naField5{position:absolute;height:17px;background:transparent;border:none;border-bottom:1.5px solid #9aa3ab;font:13.5px DroidSerif,Georgia,serif;color:#1c3f8f;padding:0 2px;outline:none;box-sizing:border-box}
[data-native-ab12='78'] .naCanvas .naField5[data-check-mark="ok"]{background:transparent!important;border-color:transparent!important;box-shadow:none!important;border-bottom:2px solid #2f7d4f!important;color:#1c3f8f!important}
[data-native-ab12='78'] .naCanvas .naField5[data-check-mark="bad"]{background:transparent!important;border-color:transparent!important;box-shadow:none!important;border-bottom:2px solid #c62f2f!important;color:#1c3f8f!important}
[data-native-ab12='78'] .naFoot78{font-size:14px!important;color:#333!important}
[data-native-ab12='78'] .naCheck{position:absolute;display:flex;align-items:center;gap:6px}
[data-native-ab12='78'] .naCheck output{font:600 13px FiraSans,sans-serif;color:#26764c}
`}</style><div className="naCanvas naNarrow" style={{width:W,height:H,transform:`translate(-50%,-50%) scale(${scale})`}}>

  {/* banner */}
  <div style={{position:'absolute',left:0,top:28,width:736,height:82,background:'linear-gradient(90deg,#f2c2c8 0%,#f6ccd1 55%,#fcd4d7 100%)'}}/>
  {art('photo',4,28,233,82)}
  {text(258,46,420,'Am besten sind seine Schuhe!','naTitle78')}

  {/* ex 1 Was haben die Leute an? */}
  {kb(56,141,'KB 2')}{num(91,133,'1')}
  {text(117,133,300,'Was haben die Leute an? Ergänzen Sie.','naT78')}
  {rail(72,232,'WÖRTER')}
  {art('hut',113,162,50,24)}
  {/* KLEID mit GÜRTEL */}
  {G('p78-1-kl1',119,199,'1 Kleid 1')}{L(132,199,'L')}{G('p78-1-kl2',146,199,'1 Kleid 2')}{G('p78-1-kl3',159,199,'1 Kleid 3')}{G('p78-1-kl4',172,199,'1 Kleid 4')}
  {text(185,183,25,'mit')}
  {L(212,199,'G')}{G('p78-1-gu1',225,199,'1 Gürtel 1')}{L(239,199,'R')}{G('p78-1-gu2',252,199,'1 Gürtel 2')}{G('p78-1-gu3',265,199,'1 Gürtel 3')}{G('p78-1-gu4',278,199,'1 Gürtel 4')}
  {/* STRUMPFHOSE */}
  {G('p78-1-st1',119,218,'1 Strumpfhose 1')}{G('p78-1-st2',132,218,'1 Strumpfhose 2')}{L(146,218,'R')}{G('p78-1-st3',159,218,'1 Strumpfhose 3')}{G('p78-1-st4',173,218,'1 Strumpfhose 4')}{G('p78-1-st5',186,218,'1 Strumpfhose 5')}{G('p78-1-st6',199,218,'1 Strumpfhose 6')}{L(213,218,'H')}{L(226,218,'O')}{G('p78-1-st7',240,218,'1 Strumpfhose 7')}{G('p78-1-st8',253,218,'1 Strumpfhose 8')}
  {/* JACKE */}
  {G('p78-1-ja1',119,237,'1 Jacke 1')}{G('p78-1-ja2',132,237,'1 Jacke 2')}{L(146,237,'C')}{L(159,237,'K')}{G('p78-1-ja3',172,237,'1 Jacke 3')}
  {/* MÜTZE */}
  {G('p78-1-mu1',448,180,'1 Mütze 1')}{G('p78-1-mu2',461,180,'1 Mütze 2')}{L(473,180,'T')}{L(485,180,'Z')}{G('p78-1-mu3',498,180,'1 Mütze 3')}
  {/* HEMD */}
  {G('p78-1-he1',448,199,'1 Hemd 1')}{G('p78-1-he2',461,199,'1 Hemd 2')}{L(474,199,'M')}{G('p78-1-he3',487,199,'1 Hemd 3')}
  {/* SPORTSCHUHE */}
  {L(446,218,'S')}{L(458,218,'P')}{L(469,218,'O')}{L(483,218,'R')}{L(496,218,'T')}{G('p78-1-sp1',509,218,'1 Sportschuhe 1')}{G('p78-1-sp2',522,218,'1 Sportschuhe 2')}{G('p78-1-sp3',535,218,'1 Sportschuhe 3')}{G('p78-1-sp4',548,218,'1 Sportschuhe 4')}{G('p78-1-sp5',561,218,'1 Sportschuhe 5')}{G('p78-1-sp6',574,218,'1 Sportschuhe 6')}
  {/* MANTEL */}
  {G('p78-1-ma1',434,237,'1 Mantel 1')}{G('p78-1-ma2',447,237,'1 Mantel 2')}{L(460,237,'A')}{G('p78-1-ma3',473,237,'1 Mantel 3')}{G('p78-1-ma4',486,237,'1 Mantel 4')}{G('p78-1-ma5',499,237,'1 Mantel 5')}
  {/* HOSE */}
  {G('p78-1-ho1',443,256,'1 Hose 1')}{L(456,256,'O')}{L(469,256,'S')}{G('p78-1-ho2',482,256,'1 Hose 2')}
  {/* PULLOVER */}
  {G('p78-1-pu1',449,275,'1 Pullover 1')}{G('p78-1-pu2',461,275,'1 Pullover 2')}{L(474,275,'L')}{L(486,275,'L')}{G('p78-1-pu3',499,275,'1 Pullover 3')}{L(511,275,'V')}{G('p78-1-pu4',524,275,'1 Pullover 4')}{G('p78-1-pu5',537,275,'1 Pullover 5')}
  {art('woman',300,156,125,150)}
  {art('man',617,145,59,154)}
  {check('78-1',190,248,{'p78-1-kl1':'k','p78-1-kl2':'e','p78-1-kl3':'i','p78-1-kl4':'d','p78-1-gu1':'ü','p78-1-gu2':'t','p78-1-gu3':'e','p78-1-gu4':'l','p78-1-st1':'s','p78-1-st2':'t','p78-1-st3':'u','p78-1-st4':'m','p78-1-st5':'p','p78-1-st6':'f','p78-1-st7':'s','p78-1-st8':'e','p78-1-ja1':'j','p78-1-ja2':'a','p78-1-ja3':'e','p78-1-mu1':'m','p78-1-mu2':'ü','p78-1-mu3':'e','p78-1-he1':'h','p78-1-he2':'e','p78-1-he3':'d','p78-1-sp1':'s','p78-1-sp2':'c','p78-1-sp3':'h','p78-1-sp4':'u','p78-1-sp5':'h','p78-1-sp6':'e','p78-1-ma1':'m','p78-1-ma2':'n','p78-1-ma3':'t','p78-1-ma4':'e','p78-1-ma5':'l','p78-1-ho1':'h','p78-1-ho2':'e','p78-1-pu1':'p','p78-1-pu2':'u','p78-1-pu3':'o','p78-1-pu4':'e','p78-1-pu5':'r'})}

  {/* ex 2 Malen (free) */}
  {kb(56,315,'KB 3')}{num(91,307,'2')}
  {art('partner',44,328,32,19)}
  {text(117,307,450,'Malen Sie eine Person wie in 1. Beschreiben Sie die Person.','naT78')}
  {text(117,327,510,'Ihre Partnerin / Ihr Partner malt. Vergleichen Sie die beiden Bilder.','naT78')}

  {/* ex 3 Was passt? Markieren Sie. */}
  {kb(56,386,'KB 4')}{num(91,377,'3')}
  {text(117,377,220,'Was passt? Markieren Sie.','naT78')}
  {rail(72,467,'STRUKTUREN')}
  <div className="naText" style={{left:137,top:405,width:360}}><Words text="a  Das T-Shirt gefällt mir "/><span style={{background:'#e3dc67',padding:'0 1px'}}>besser</span><Words text="/lieber als die Bluse."/></div>
  <div className="naText" style={{left:137,top:425,width:320}}><Words text="b  Ich mag "/>{pick('p78-3b')}<Words text=" Orangensaft als Cola."/></div>
  <div className="naText" style={{left:137,top:444,width:600}}><Words text="c  Mir schmeckt das Brot in Deutschland "/>{pick('p78-3c')}<Words text=" als das Brot in meinem Heimatland."/></div>
  <div className="naText" style={{left:137,top:464,width:300}}><Words text="d  Ich trage "/>{pick('p78-3d')}<Words text=" Kleider als Röcke."/></div>
  {check('78-3',440,459,{'p78-3b':'lieber','p78-3c':'besser','p78-3d':'lieber'})}

  {/* ex 4 als oder wie? */}
  {kb(56,519,'KB 4')}{num(91,512,'4')}
  {text(117,512,220,'als oder wie? Kreuzen Sie an.','naT78')}
  {rail(72,650,'STRUKTUREN')}
  {text(137,542,175,'a  Der Hut gefällt mir besser')}
  {art('xals',313,542,81,19)}
  {text(400,542,15,'wie')}{text(441,542,75,'die Mütze.')}
  {text(137,561,270,'b  Schau mal, die Bluse kostet genauso viel')}
  {dot('p78-4b','als',415,559,'4b als')}{text(437,561,20,'als')}
  {dot('p78-4b','wie',470,559,'4b wie')}{text(492,561,20,'wie')}
  {text(536,561,80,'das T-Shirt.')}
  {text(137,581,185,'c  Die Jacke finde ich schöner')}
  {dot('p78-4c','als',329,578,'4c als')}{text(351,581,20,'als')}
  {dot('p78-4c','wie',384,578,'4c wie')}{text(406,581,20,'wie')}
  {text(450,581,85,'den Mantel.')}
  {text(137,600,390,'d  Die Hose finde ich nicht schön. Nimm doch die Jeans hier.')}
  {text(137,620,160,'Die finde ich viel besser')}
  {dot('p78-4d','als',307,617,'4d als')}{text(329,620,20,'als')}
  {dot('p78-4d','wie',362,617,'4d wie')}{text(383,620,20,'wie')}
  {text(427,620,65,'die Hose.')}
  {text(137,639,205,'e  Ich mag T-Shirts genauso gern')}
  {dot('p78-4e','als',349,637,'4e als')}{text(371,639,20,'als')}
  {dot('p78-4e','wie',404,637,'4e wie')}{text(426,639,20,'wie')}
  {text(470,639,55,'Blusen.')}
  {check('78-4',532,635,{'p78-4b':'wie','p78-4c':'als','p78-4d':'als','p78-4e':'wie'})}

  {/* ex 5 Ergänzen Sie in der richtigen Form. */}
  {kb(56,697,'KB 4')}{num(91,687,'5')}
  {text(117,687,280,'Ergänzen Sie in der richtigen Form.','naT78')}
  {rail(72,850,'STRUKTUREN')}
  {bul(143,722,'■','#3b5da0')}{text(160,718,170,'Wie gefällt dir der Rock?')}
  {bul(143,742,'▲','#3eb371')}{text(160,737,295,'Der ist schön, aber das Kleid hier gefällt mir')}
  {art('besser',453,736,49,22)}
  {text(500,737,40,'. (gut)')}
  {bul(143,761,'●','#a30864')}{text(160,756,192,'Und mir gefällt die Jeans am')}
  <input className="naField5" aria-label="5a Jeans" data-native-field="p78-5a" style={{left:352,top:754,width:118}} value={values['p78-5a']||''} onChange={e=>set('p78-5a',e.target.value)} autoComplete="off" spellCheck={false}/>
  {text(475,756,45,'. (gut)')}
  {bul(143,800,'■','#3b5da0')}{text(160,795,175,'Wie findest du die Jacke?')}
  {bul(143,820,'▲','#3eb371')}{text(160,814,128,'Die blaue finde ich')}
  <input className="naField5" aria-label="5b blaue" data-native-field="p78-5b1" style={{left:288,top:812,width:117}} value={values['p78-5b1']||''} onChange={e=>set('p78-5b1',e.target.value)} autoComplete="off" spellCheck={false}/>
  {text(410,814,150,'als die schwarze. (gut)')}
  {bul(143,839,'●','#a30864')}{text(160,834,336,'Also, ich mag Blau nicht so gern. Schwarz mag ich')}
  <input className="naField5" aria-label="5b Schwarz" data-native-field="p78-5b2" style={{left:497,top:832,width:113}} value={values['p78-5b2']||''} onChange={e=>set('p78-5b2',e.target.value)} autoComplete="off" spellCheck={false}/>
  {text(160,854,110,'als Blau. (gern)')}
  {bul(143,898,'■','#3b5da0')}{text(160,893,300,'Wir müssen noch Obst kaufen. Was magst du')}
  <input className="naField5" aria-label="5c Obst" data-native-field="p78-5c1" style={{left:458,top:897,width:115}} value={values['p78-5c1']||''} onChange={e=>set('p78-5c1',e.target.value)} autoComplete="off" spellCheck={false}/>
  {text(577,893,60,'? (gern)')}
  {text(160,913,140,'Orangen oder Äpfel?')}
  {bul(143,937,'▲','#3eb371')}{text(160,932,170,'Ich mag Orangen genauso')}
  <input className="naField5" aria-label="5c Orangen" data-native-field="p78-5c2" style={{left:332,top:930,width:118}} value={values['p78-5c2']||''} onChange={e=>set('p78-5c2',e.target.value)} autoComplete="off" spellCheck={false}/>
  {text(455,932,120,'wie Äpfel. (gern)')}
  {bul(143,957,'■','#3b5da0')}{text(160,951,370,'Gut, dann kaufen wir beides. Und was trinkst du gern?')}
  {bul(143,976,'▲','#3eb371')}{text(160,970,228,'Das weißt du doch. … Ich mag am')}
  <input className="naField5" aria-label="5c Cola" data-native-field="p78-5c3" style={{left:392,top:968,width:113}} value={values['p78-5c3']||''} onChange={e=>set('p78-5c3',e.target.value)} autoComplete="off" spellCheck={false}/>
  {text(510,970,85,'Cola. (gern)')}
  {check('78-5',600,965,{'p78-5a':'besten','p78-5b1':'besser','p78-5b2':'lieber','p78-5c1':'lieber','p78-5c2':'gern','p78-5c3':'liebsten'})}

  {/* footer */}
  <div style={{position:'absolute',left:20,top:1049,width:48,height:18,background:'#d9d0ab',color:'#fff',font:'600 9.5px FiraSans,sans-serif',display:'flex',alignItems:'center',justifyContent:'center'}}>Modul 8</div>
  {text(68,1050,15,'78','naFoot78')}{text(90,1050,8,'|','naFoot78')}{text(107,1050,95,'achtundsiebzig','naFoot78')}
 </div><audio ref={player} className="naPlayer"/></div>;
}
