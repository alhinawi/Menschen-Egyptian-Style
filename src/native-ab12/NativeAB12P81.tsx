import {usePageReset} from '../exercises/usePageReset';
import {useLayoutEffect,useRef,useState} from 'react';
import {PageImage} from '../components/PageImage';
import {CheckButton} from '../components/CheckButton';
import '../components/native-ab12.css';

function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\p{L}/u.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-word={w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text}>{w}</span>:w)}</>}
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\s+/g,' ');

// Training: Aussprache 1 — Wortakzent. Value token per vowel: the letter, with a 1-based
// suffix when the letter repeats in the word ('am besten': a, e1, e2), so the stressed
// first e of 'besten' is graded apart from the unstressed second e.
const stressTokens=(word:string)=>{const vowels=[...word].map(c=>c.toLowerCase()).filter(c=>/[aeiou]/.test(c));const counts:Record<string,number>={};vowels.forEach(c=>counts[c]=(counts[c]||0)+1);const seen:Record<string,number>={};return vowels.map(c=>{seen[c]=(seen[c]||0)+1;return counts[c]>1?c+seen[c]:c})};
const A1_ITEMS:[string,string,string][]=[['p81-a1-dunkel','dunkel','u'],['p81-a1-golden','golden','o'],['p81-a1-hose','Hose','o'],['p81-a1-getragen','getragen','a'],['p81-a1-mantel','Mantel','a'],['p81-a1-ambesten','am besten','a e1|e1'],['p81-a1-bluse','Bluse','u'],['p81-a1-danke','danke','a'],['p81-a1-bitte','bitte','i']];

export function NativeAB12P81({page}:{page:string}){
 const W=810, H=1095;
 const root=useRef<HTMLDivElement>(null),player=useRef<HTMLAudioElement>(null);
 const [scale,ss]=useState(.6);const key='native-ab12-'+page;
 const [values,sv]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});
 const [results,sr]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{if(document.fonts){['400 13px DroidSerif','700 13px DroidSerif','600 15px FiraSans','700 13px FiraSans','500 13px FiraSans','600 13px FiraSans'].forEach(f=>{try{document.fonts.load(f)}catch{}})}},[]);
 useLayoutEffect(()=>{const el=root.current!;const obs=new ResizeObserver(()=>ss(Math.min(el.clientWidth/W,(el.clientHeight-38)/H)));obs.observe(el);return ()=>obs.disconnect()},[]);
 usePageReset(page,key,()=>{sv({});sr({})});
 const set=(id:string,v:string)=>{const n={...values,[id]:v};sv(n);localStorage.setItem(key,JSON.stringify(n))};
 const text=(x:number,y:number,w:number,t:string,cls='')=><div className={'naText '+cls} style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const lin=(x:number,y:number,w:number,h:number,c:string)=><div style={{position:'absolute',left:x,top:y,width:w,height:h,background:c}}/>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="naArt" src={`assets/book-crops/native-ab12-p${page}-${name}.png`} alt={'Originalillustration '+name} style={{left:x,top:y,width:w,height:h}}/>;
 const gap=(id:string,x:number,y:number,w:number,label:string)=><input className="naField naGap81" aria-label={label} data-native-field={id} style={{left:x,top:y,width:w}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>;
 const dot=(id:string,value:string,x:number,y:number,label:string)=><input type="radio" className="naDot naDot81" name={key+'-'+id} aria-label={label} data-native-field={id} value={value} style={{left:x,top:y}} checked={values[id]===value} onChange={()=>set(id,value)}/>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="naCheck" data-check={id} style={{left:x,top:y}}><CheckButton answers={answers} onClick={()=>sr({...results,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(v=>normalize(v)===normalize(values[k]||'')))})}/><output aria-live="polite">{id in results?(results[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const num=(x:number,y:number,n:string)=><div className="naNum81" style={{left:x,top:y}}>{n}</div>;
 const audio=(x:number,y:number,t:string)=><><div className="naTri81" style={{left:x,top:y}}/><div className="naAudio81" style={{left:x+9,top:y-3}}>{t}</div></>;

 // Training: Aussprache 1 — clickable vowels for marking the Wortakzent.
 // Field value = marked vowel letters in word order, space-joined (matches the answers map).
 const StressWord=({id,word}:{id:string;word:string})=>{
  const wr=useRef<HTMLSpanElement>(null);
  const [rects,setRects]=useState<{cx:number;by:number;l:number;t:number;w:number;h:number}[]>([]);
  const vchars=[...word].map((c,i)=>({c,i})).filter(v=>/[aeiou]/.test(v.c));
  const marked=(values[id]||'').split(' ').filter(s=>s.length).map(Number).filter(n=>n<vchars.length);
  useLayoutEffect(()=>{
   const el=wr.current;if(!el)return;
   const tn=el.firstChild;if(!tn||tn.nodeType!==3)return;
   const measure=()=>{
    const base=el.getBoundingClientRect();if(!base.width)return;
    const list:{cx:number;by:number;l:number;t:number;w:number;h:number}[]=[];
    for(const {i} of vchars){
     const r=document.createRange();r.setStart(tn,i);r.setEnd(tn,i+1);
     const b=r.getBoundingClientRect();
     list.push({cx:(b.left-base.left)/scale+(b.width/scale)/2,by:(b.bottom-base.top)/scale,l:(b.left-base.left)/scale,t:(b.top-base.top)/scale,w:b.width/scale,h:b.height/scale});
    }
    setRects(list);
   };
   measure();
   let live=true;document.fonts?.ready.then(()=>{if(live)measure()}).catch(()=>{});
   return ()=>{live=false};
  },[word,scale]);
  const toggle=(vi:number)=>{
   const cur=new Set(marked);
   if(cur.has(vi))cur.delete(vi);else cur.add(vi);
   set(id,[...cur].sort((a,b)=>a-b).join(' '));
   wr.current?.removeAttribute('data-check-mark');
  };
  const tokens=stressTokens(word);
  return <span ref={wr} className="naStressWord" data-native-field={id} data-value={marked.map(vi=>tokens[vi]||'').join(' ')} data-empty={marked.length?'0':'1'}>
   {word}
   {rects.map((r,vi)=><span key={vi} className="naStressHit" style={{left:r.l-1.5,top:r.t,width:r.w+3,height:r.h+3}} onClick={()=>toggle(vi)}/>)}
   {rects.map((r,vi)=>marked.includes(vi)?<span key={'m'+vi} className="naStressMark" style={{left:r.cx,top:r.by-1}}/>:null)}
  </span>;
 };

 if(page!=='81')return null;
 return <div className="nativeAB12" ref={root} data-native-ab12={page}><style>{`@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-400.woff2') format('woff2');font-weight:400}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-700.woff2') format('woff2');font-weight:700}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-500.ttf') format('truetype');font-weight:500}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-600.woff2') format('woff2');font-weight:600}@font-face{font-family:DroidSerif;src:url('assets/fonts/droid-serif-400.ttf') format('truetype');font-weight:400}@font-face{font-family:DroidSerif;src:url('assets/fonts/droid-serif-700.woff2') format('woff2');font-weight:700}
[data-native-ab12='81'] .naText{font-family:DroidSerif,Georgia,serif!important;font-size:13px!important;color:#2b2b2b!important;letter-spacing:0;position:absolute;white-space:nowrap}
[data-native-ab12='81'] .naArt{position:absolute;object-fit:fill}
[data-native-ab12='81'] .naNum81{position:absolute;width:26px;height:18px;background:#e30613;color:#fff;font:700 13px/18px FiraSans,sans-serif;text-align:center}
[data-native-ab12='81'] .naT81{font-family:FiraSans,sans-serif!important;font-weight:700;font-size:14.5px!important;color:#17141c!important}
[data-native-ab12='81'] .naT81s{font-family:FiraSans,sans-serif!important;font-weight:700;font-size:15.6px!important;color:#17141c!important}
[data-native-ab12='81'] .naInst81{font-family:FiraSans,sans-serif!important;font-weight:600;font-size:13.8px!important;color:#1a1a1a!important}
[data-native-ab12='81'] .naInstL81{font-family:FiraSans,sans-serif!important;font-weight:600;font-size:15.8px!important;color:#1a1a1a!important}
[data-native-ab12='81'] .naSub81{font-family:FiraSans,sans-serif!important;font-weight:500;font-size:13.8px!important;color:#1a1a1a!important}
[data-native-ab12='81'] .naSerifB81{font-weight:700;font-size:12px!important}
[data-native-ab12='81'] .naTipp81{font-size:11.5px!important}
[data-native-ab12='81'] .naTippI81{font-style:italic}
[data-native-ab12='81'] .naSign81{font-family:FiraSans,sans-serif!important;font-size:11.6px!important}
[data-native-ab12='81'] .naBus81{font-size:11.8px!important}
[data-native-ab12='81'] .naAex81{font-size:13.5px!important}
[data-native-ab12='81'] .naBlue81{font-family:FiraSans,sans-serif!important;font-weight:700;font-size:12.5px!important;color:#0b4ba5!important}
[data-native-ab12='81'] .naRed81{font-weight:700;font-size:15px!important;color:#b21007!important}
[data-native-ab12='81'] .naSmall81{font-weight:400;font-size:12.5px!important;color:#2b2b2b!important}
[data-native-ab12='81'] .naSmallH81{font-weight:400;font-size:10.5px!important;color:#2b2b2b!important}
[data-native-ab12='81'] .naStmtL81{font-size:13.3px!important}
[data-native-ab12='81'] .naZet281{font-size:12.5px!important}
[data-native-ab12='81'] .naLab81{font-family:FiraSans,sans-serif!important;font-weight:700;font-size:13px!important;color:#3b5da0!important}
[data-native-ab12='81'] .naBank81{font-family:FiraSans,sans-serif!important;font-weight:400;font-size:12.9px!important;color:#46548a!important}
[data-native-ab12='81'] .naBank81 .naPipe{color:#8a8a8a;font-weight:400}
[data-native-ab12='81'] .naHead81{font-size:20px!important;letter-spacing:2.1px!important;color:#4d4d4a!important}
[data-native-ab12='81'] .naItal81{font-style:italic;font-size:14px!important;color:#555!important}
[data-native-ab12='81'] .naAudio81{position:absolute;font:600 10px FiraSans,sans-serif;color:#3ea0d8}
[data-native-ab12='81'] .naTri81{position:absolute;width:0;height:0;border-left:6px solid #3ea0d8;border-top:4px solid transparent;border-bottom:4px solid transparent}
[data-native-ab12='81'] .naRegel81{font-size:12px!important}
[data-native-ab12='81'] .naFoot81{font-size:14px!important;color:#333!important;text-align:right}
[data-native-ab12='81'] .naTippT81{position:absolute;font:700 8px FiraSans,sans-serif;color:#4b2d07;writing-mode:vertical-rl;transform:rotate(180deg)}
[data-native-ab12='81'] .naCanvas .naField.naGap81{height:17px!important;font:14px DroidSerif,Georgia,serif!important;color:#1c3f8f!important;border-bottom:1px solid #9a9a9b!important}
[data-native-ab12='81'] .naCanvas .naDot.naDot81{width:13px!important;height:13px!important;border-width:1.5px!important}
[data-native-ab12='81'] .naStressWord{position:relative;white-space:nowrap}
[data-native-ab12='81'] .naStressHit{position:absolute;cursor:pointer;border-radius:2px}
[data-native-ab12='81'] .naStressHit:hover{background:rgba(28,63,143,.16)}
[data-native-ab12='81'] .naStressMark{position:absolute;width:5px;height:5px;border-radius:50%;background:#1c3f8f;pointer-events:none;transform:translateX(-50%)}
[data-native-ab12='81'] .naStressWord[data-check-mark='ok'] .naStressMark{background:#2f7d4f}
[data-native-ab12='81'] .naStressWord[data-check-mark='bad'] .naStressMark{background:#c62f2f}
[data-native-ab12='81'] .naStressWord[data-check-mark='bad'][data-empty='1']{box-shadow:0 2px 0 #c62f2f}
[data-native-ab12='81'] .naCheck{position:absolute;display:flex;align-items:center;gap:6px}
[data-native-ab12='81'] .naCheck output{font:600 13px FiraSans,sans-serif;color:#26764c}
`}</style><div className="naCanvas naNarrow" style={{width:W,height:H,transform:`translate(-50%,-50%) scale(${scale})`}}>

  {/* header */}
  {text(73,66,230,'TRAINING: LESEN','naHead81')}
  {lin(302,85,499,2,'#e30613')}
  {art('badge',730,24,78,67)}

  {/* ex 1 Schilder und Zettel */}
  {num(71,112,'1')}
  {text(105,114,150,'Schilder und Zettel','naT81')}
  {text(70,143,12,'a','naLab81')}
  {text(105,144,260,'Was passt zusammen? Ordnen Sie zu.','naInst81')}
  {lin(107,173,387,18,'#fcfada')}
  <div className="naText naBank81" style={{left:110,top:174,width:385}}>morgen <span className="naPipe">|</span> nach <span className="naPipe">|</span> Nachmittag <span className="naPipe">|</span> <s>bis</s> <span className="naPipe">|</span> ohne <span className="naPipe">|</span> nie <span className="naPipe">|</span> keine <span className="naPipe">|</span> manchmal</div>
  {text(105,201,25,'ab:','')}
  {art('bis',126,204,19,16)}
  {text(150,201,75,'Vormittag:','')}
  {gap('p81-1a0',228,200,84,'1a Vormittag')}
  {text(314,201,35,'vor:','')}
  {gap('p81-1a1',352,200,86,'1a vor')}
  {text(446,201,30,'mit:','')}
  {gap('p81-1a2',474,200,80,'1a mit')}
  {text(99,223,45,'viele:','')}
  {gap('p81-1a3',140,217,90,'1a viele')}
  {text(233,223,50,'heute:','')}
  {gap('p81-1a4',282,218,88,'1a heute')}
  {text(382,223,50,'immer:','')}
  {gap('p81-1a5',434,219,76,'1a immer')}
  {text(529,223,25,'oft:','')}
  {gap('p81-1a6',556,218,76,'1a oft')}
  {check('81-1a',648,215,{'p81-1a0':'Nachmittag','p81-1a1':'nach','p81-1a2':'ohne','p81-1a3':'keine','p81-1a4':'morgen','p81-1a5':'nie','p81-1a6':'manchmal'})}

  {/* 1b Zettel + TIPP */}
  {text(70,257,12,'b','naLab81')}
  {text(105,261,270,'Lesen Sie den Zettel und kreuzen Sie an.','naInst81')}
  {text(105,280,240,'Im Bekleidungsgeschäft am Fenster','naSub81')}
  {text(211,306,140,'Räumungsverkauf','naRed81')}
  {text(112,328,330,'50 % auf alle Jacken, Hemden, Blusen und Kleider','')}
  {text(189,346,180,'Nur noch bis zum 31. März','naZet281')}
  {text(467,363,40,'richtig','naSmallH81')}
  {text(517,363,40,'falsch','naSmallH81')}
  {text(105,378,330,'Nach dem 31. März gibt es viele Sonderangebote.','')}
  {text(105,398,330,'Vor dem 31. März gibt es viele Sonderangebote.','')}
  {dot('p81-1b1','richtig',478,382,'1b Satz 1 richtig')}
  {dot('p81-1b1','falsch',527,382,'1b Satz 1 falsch')}
  {dot('p81-1b2','richtig',478,402,'1b Satz 2 richtig')}
  {dot('p81-1b2','falsch',527,402,'1b Satz 2 falsch')}
  {check('81-1b',105,420,{'p81-1b1':'falsch','p81-1b2':'richtig'})}
  {lin(574,289,162,5,'#be8e0a')}
  {lin(574,289,12,117,'#be8e0a')}
  <div className="naTippT81" style={{left:575,top:374}}>TIPP</div>
  {text(600,296,130,'Sie haben Probleme','naTipp81')}
  {text(600,313,120,'beim Lesen von','naTipp81')}
  {text(600,330,120,'Schildern? Achten','naTipp81')}
  {text(600,347,130,'Sie besonders auf die','naTipp81')}
  {text(600,364,110,'kleinen Wörter:','naTipp81')}
  {text(600,381,125,'ab oder bis, vor oder','naTipp81 naTippI81')}
  {text(600,398,80,'nach …','naTipp81 naTippI81')}

  {/* ex 2 Lesen */}
  {num(71,444,'2')}
  {text(105,446,450,'Lesen Sie jetzt die Schilder und Zettel und kreuzen Sie an.','naInstL81')}
  {text(70,472,12,'a','naLab81')}
  {text(105,476,200,'Im Supermarkt an der Tür','naSub81')}
  {text(115,503,80,'Inventur','naBlue81 naSign81')}
  {text(113,519,310,'Am Dienstag haben wir Inventur.','naSign81')}
  {text(113,536,330,'Wir haben daher leider ab 15.00 Uhr geschlossen.','naSign81')}
  {text(113,553,410,'Am Mittwochmorgen können Sie wieder wie gewohnt bei uns einkaufen.','naSign81')}
  {text(105,583,390,'Der Supermarkt ist am Mittwochmorgen wieder geöffnet.','naStmtL81')}
  {text(516,584,44,'richtig','naSmall81')}
  {text(589,584,44,'falsch','naSmall81')}
  {dot('p81-2a','richtig',496,586,'2a richtig')}
  {dot('p81-2a','falsch',569,586,'2a falsch')}
  {text(70,618,12,'b','naLab81')}
  {text(105,622,180,'An der Bushaltestelle','naSub81')}
  {text(224,650,160,'Sehr geehrte Fahrgäste!','naSerifB81')}
  {text(128,668,350,'Ab dem 01. Juli fährt der Bus Nr. 13 nur bis zum Stadttor.','naBus81')}
  {text(115,686,380,'Fahrgäste bis zum Hauptbahnhof nehmen bitte den Bus Nr. 5.','naBus81')}
  {text(105,719,470,'Die Buslinie 13 fährt nach dem 01. Juli wieder bis zum Hauptbahnhof.','naStmtL81')}
  {text(597,720,44,'richtig','naSmall81')}
  {text(672,720,44,'falsch','naSmall81')}
  {dot('p81-2b','richtig',577,722,'2b richtig')}
  {dot('p81-2b','falsch',651,722,'2b falsch')}
  {check('81-2',724,714,{'p81-2a':'richtig','p81-2b':'falsch'})}

  {/* AUSSPRACHE */}
  {text(73,767,290,'TRAINING: AUSSPRACHE','naHead81')}
  {text(369,773,100,'unbetontes „e“','naItal81')}
  {lin(473,790,246,2,'#e30613')}
  {audio(34,821,'2 34')}
  {num(71,815,'1')}
  {text(105,816,250,'Hören Sie und markieren Sie den','naInstL81')}
  {text(97,833,100,'Wortakzent.','naInstL81')}
  <div className="naText naAex81" style={{left:105,top:866,width:320}}>Gürtel – Schuhe – <StressWord id='p81-a1-dunkel' word='dunkel'/> – <StressWord id='p81-a1-golden' word='golden'/> –</div>
  <div style={{position:'absolute',left:115,top:878,width:6,height:6,borderRadius:3,background:'#8dd11c'}}/>
  <div style={{position:'absolute',left:185,top:879,width:10,height:2,background:'#b56b39'}}/>
  <div className="naText naAex81" style={{left:105,top:885,width:330}}><StressWord id='p81-a1-hose' word='Hose'/> – <StressWord id='p81-a1-getragen' word='getragen'/> – <StressWord id='p81-a1-mantel' word='Mantel'/> – <StressWord id='p81-a1-ambesten' word='am besten'/> –</div>
  <div className="naText naAex81" style={{left:105,top:905,width:190}}><StressWord id='p81-a1-bluse' word='Bluse'/> – <StressWord id='p81-a1-danke' word='danke'/> – <StressWord id='p81-a1-bitte' word='bitte'/></div>
  {(()=>{const answers=Object.fromEntries(A1_ITEMS.map(([id,,a])=>[id,a]));const val=(id:string,word:string)=>{const toks=stressTokens(word);return (values[id]||'').split(' ').filter(s=>s.length).map(Number).map(vi=>toks[vi]||'').join(' ')};return <div className="naCheck" data-check="81-a1" style={{left:203,top:902}}><CheckButton answers={answers} onClick={()=>sr({...results,'81-a1':A1_ITEMS.every(([id,word,a])=>a.split('|').some(v=>normalize(v)===normalize(val(id,word))))})}/><output aria-live="polite">{'81-a1' in results?(results['81-a1']?'✓ Richtig!':'Noch einmal'):''}</output></div>})()}
  {audio(373,822,'2 35')}
  {num(411,815,'3')}
  {text(443,816,250,'Hören Sie und sprechen Sie nach.','naInstL81')}
  {text(442,845,10,'a','naAex81')}
  {text(461,845,230,'Meine Schuhe sind dunkelbraun.','naAex81')}
  {text(442,864,10,'b','naAex81')}
  {text(461,864,280,'Ich habe noch nie einen Gürtel getragen.','naAex81')}
  {text(442,884,10,'c','naAex81')}
  {text(461,884,200,'Die Bluse hier gefällt mir am','naAex81')}
  {text(459,903,60,'besten.','naAex81')}
  {text(442,923,10,'d','naAex81')}
  {text(460,923,210,'Alles ist golden: seine Schuhe,','naAex81')}
  {text(460,943,190,'seine Hose, sein Hemd und','naAex81')}
  {text(460,962,90,'sein Mantel.','naAex81')}

  {/* ex 2 Was ist richtig + REGEL */}
  {num(71,950,'2')}
  {text(104,953,240,'Was ist richtig? Kreuzen Sie an.','naT81s')}
  {lin(104,983,280,41,'#f4f9f9')}
  {art('regeltab',103,982,14,44)}
  {text(129,985,255,'Am Wort-Ende bei Wörtern mit -e, -el, -en,','naRegel81')}
  {text(129,1003,260,'-er hört man „e“ nur wenig oder gar nicht.','naRegel81')}
  {dot('p81-a2','ja',132,1021,'Regel Ja')}
  {dot('p81-a2','nein',180,1021,'Regel Nein')}
  {text(147,1017,20,'Ja.','naRegel81')}
  {text(200,1019,35,'Nein.','naRegel81')}
  {check('81-a2',250,1014,{'p81-a2':'ja'})}

  {art('woman',666,893,72,145)}

  {/* footer */}
  {text(561,1051,172,'einundachtzig | 81','naFoot81')}
  {lin(758,1052,52,16,'#d9d0ab')}
  <div style={{position:'absolute',left:758,top:1052,width:52,height:16,color:'#fff',font:'600 9.5px FiraSans,sans-serif',display:'flex',alignItems:'center',justifyContent:'center'}}>Modul 8</div>
 </div><audio ref={player} className="naPlayer"/></div>;
}
