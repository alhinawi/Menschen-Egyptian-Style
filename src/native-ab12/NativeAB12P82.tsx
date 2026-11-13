import {usePageReset} from '../exercises/usePageReset';
import {useLayoutEffect,useRef,useState} from 'react';
import {PageImage} from '../components/PageImage';
import {CheckButton} from '../components/CheckButton';
import '../components/native-ab12.css';

function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\p{L}/u.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-word={w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text}>{w}</span>:w)}</>}
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\s+/g,' ');

export function NativeAB12P82({page}:{page:string}){
 const W=807, H=1094;
 const root=useRef<HTMLDivElement>(null);
 const [scale,ss]=useState(.6);const key='native-ab12-'+page;
 const [values,sv]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});
 const [results,sr]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{if(document.fonts){['400 15px FiraSans','500 15px FiraSans','600 15px FiraSans','700 15px FiraSans','400 15px DroidSerif','700 15px DroidSerif'].forEach(f=>{try{document.fonts.load(f)}catch{}})}},[]);
 useLayoutEffect(()=>{const el=root.current!;const obs=new ResizeObserver(()=>ss(Math.min(el.clientWidth/W,(el.clientHeight-38)/H)));obs.observe(el);return ()=>obs.disconnect()},[]);
 usePageReset(page,key,()=>{sv({});sr({})});
 const set=(id:string,v:string)=>{const n={...values,[id]:v};sv(n);localStorage.setItem(key,JSON.stringify(n))};
 const text=(x:number,y:number,w:number,t:string,cls='')=><div className={'naText '+cls} style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const lin=(x:number,y:number,w:number,h:number,c:string)=><div style={{position:'absolute',left:x,top:y,width:w,height:h,background:c}}/>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="naArt" src={`assets/book-crops/native-ab12-p${page}-${name}.png`} alt={'Originalillustration '+name} style={{left:x,top:y,width:w,height:h}}/>;
 const field=(id:string,x:number,y:number,w:number,label:string,cls='')=><input className={'naField '+cls} aria-label={label} data-native-field={id} style={{left:x,top:y,width:w}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>;
 const dot=(id:string,x:number,y:number,label:string)=><input className="naDot" type="checkbox" aria-label={label} data-value="true" checked={values[id]==='true'} onChange={e=>set(id,String(e.target.checked))} style={{left:x,top:y}}/>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="naCheck" data-check={id} style={{left:x,top:y}}><CheckButton answers={answers} onClick={()=>sr({...results,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(v=>normalize(v)===normalize(values[k]||(a==='false'?'false':''))))})}/><output aria-live="polite">{id in results?(results[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const num=(x:number,y:number,n:string)=><div className="naNum82" style={{left:x,top:y}}>{n}</div>;
 const rail=(x:number,y:number,t:string)=><div className="naRail82" style={{left:x,top:y}}>{t}</div>;
 const circ=(x:number,y:number)=><div className="naCirc82" style={{left:x,top:y}}/>;
 const gap=(x:number,y:number,pat:string)=><div className={'naText naGap82'} style={{left:x,top:y}}>{pat.split(' ').map((t,i)=><span key={i}>{t.split('').map((ch,j)=>ch==='_'?<span key={j} className="naDash82"/>:(/\p{L}/u.test(ch)?<span key={j} className="tapWord" role="button" tabIndex={0} data-word={ch} data-phrase={pat}>{ch}</span>:ch))}</span>).reduce((a,e)=>[...a,' ',e],[] as any)}</div>;

 if(page!=='82')return null;
 return <div className="nativeAB12" ref={root} data-native-ab12={page}><style>{`@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-400.woff2') format('woff2');font-weight:400}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-700.woff2') format('woff2');font-weight:700}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-600.woff2') format('woff2');font-weight:600}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-500.ttf') format('truetype');font-weight:500}@font-face{font-family:DroidSerif;src:url('assets/fonts/droid-serif-400.ttf') format('truetype');font-weight:400}@font-face{font-family:DroidSerif;src:url('assets/fonts/droid-serif-700.woff2') format('woff2');font-weight:700}
[data-native-ab12='82'] .naText{font-family:DroidSerif,Georgia,serif!important;font-size:13.2px!important;color:#2b2b2b!important;letter-spacing:0!important;position:absolute;white-space:nowrap}
[data-native-ab12='82'] .naArt{position:absolute;object-fit:fill}
[data-native-ab12='82'] .naNum82{position:absolute;width:21px;height:17px;background:#e30613;color:#fff;font:700 13px/17px FiraSans,sans-serif;text-align:center}
[data-native-ab12='82'] .naRail82{position:absolute;font:600 10px FiraSans,sans-serif;color:#6f77ab;letter-spacing:2px;writing-mode:vertical-rl;transform:rotate(180deg)}
[data-native-ab12='82'] .naHead82{font-family:FiraSans,sans-serif!important;font-weight:600;font-size:15px!important;letter-spacing:2px!important;color:#4d4d4a!important}
[data-native-ab12='82'] .naT82{font-family:FiraSans,sans-serif!important;font-weight:700;font-size:16px!important;color:#17141c!important}
[data-native-ab12='82'] .naGap82{font-size:13.3px!important;letter-spacing:0!important;white-space:nowrap}
[data-native-ab12='82'] .naDash82{display:inline-block;width:9px;height:15px;border-bottom:1.5px solid #2b2b2b;vertical-align:baseline}
[data-native-ab12='82'] .naPkt82{font-family:FiraSans,sans-serif!important;font-size:11px!important;color:#777!important;text-align:right}
[data-native-ab12='82'] .naBank82{font-family:FiraSans,sans-serif!important;font-weight:500;font-size:12.7px!important;color:#333!important}
[data-native-ab12='82'] .naNameR82{font-family:FiraSansCond,FiraSans,sans-serif!important;font-weight:700;font-size:12.5px!important;color:#b23b2e!important}
[data-native-ab12='82'] .naNameB82{font-family:FiraSansCond,FiraSans,sans-serif!important;font-weight:700;font-size:12.5px!important;color:#3196d2!important}
[data-native-ab12='82'] .naNameP82{font-family:FiraSansCond,FiraSans,sans-serif!important;font-weight:700;font-size:12.5px!important;color:#7d3c98!important}
[data-native-ab12='82'] .naChat82{font-size:12px!important}
[data-native-ab12='82'] .naF133{font-size:13.3px!important}
[data-native-ab12='82'] .naF132{font-size:13.2px!important}
[data-native-ab12='82'] .naF1325{font-size:13.25px!important}
[data-native-ab12='82'] .naF130{font-size:13px!important}
[data-native-ab12='82'] .naF126{font-size:12.6px!important}
[data-native-ab12='82'] .naF1245{font-size:12.45px!important}
[data-native-ab12='82'] .naF124{font-size:12.4px!important}
[data-native-ab12='82'] .naFtH82{font-family:DroidSerif,Georgia,serif!important;font-weight:700;font-size:13px!important;color:#3a3a38!important}
[data-native-ab12='82'] .naFt82{font-size:12.7px!important;color:#555!important}
[data-native-ab12='82'] .naFtT82{font-size:10.5px!important;color:#555!important}
[data-native-ab12='82'] .naUrl82{font-size:11.4px!important;color:#555!important}
[data-native-ab12='82'] .naField{position:absolute;background:transparent;border:none;border-bottom:1.5px solid #c8c8c8;font:15px DroidSerif,Georgia,serif;color:#1c3f8f;padding:0 2px;outline:none}
[data-native-ab12='82'] .naField.naField82g{border:0!important;box-shadow:none!important;background:transparent!important;height:20px!important;min-height:0!important}
[data-native-ab12='82'] .naDot{width:17px!important;height:17px!important;border-width:1.3px!important;border-color:#d7d1c2!important}
[data-native-ab12='82'] .naCirc82{position:absolute;width:17px;height:17px;border:1.3px solid #d7d1c2;border-radius:50%;background:#fff}
[data-native-ab12='82'] .naCheck{position:absolute;display:flex;align-items:center;gap:6px}
[data-native-ab12='82'] .naCheck output{font:600 13px FiraSans,sans-serif;color:#26764c}
`}</style><div className="naCanvas naNarrow" style={{width:W,height:H,transform:`translate(-50%,-50%) scale(${scale})`}}>

  {/* header */}
  {text(96,66,80,'TEST','naHead82')}
  {lin(170,86,565,2,'#e30613')}

  {/* ex 1 */}
  {num(95,120,'1')}
  {rail(75,152,'WÖRTER')}
  {text(126,122,400,'Wie heißt die Kleidung? Ergänzen Sie.','naT82')}
  {text(127,154.5,16,'a','naF133')}
  {text(127,173.5,16,'b','naF133')}
  {text(127,193.5,16,'c','naF133')}
  {text(127,212.5,16,'d','naF133')}
  {text(127,232.5,16,'e','naF133')}
  {text(127,251.5,16,'f','naF133')}
  {text(127,271.5,16,'g','naF133')}
  {text(145,154.5,162,'Mama, brauche ich eine','naF130')}
  {art('muetze',304,151,69,23)}
  {text(378,154.5,145,'– Ja, und mach deine','naF133')}
  {gap(524,154.5,'J _ _ _ _')}{field('p82-1a',527,156,57,'1 a Jacke','naField82g')}
  {text(586,154.5,100,'zu. Es ist kalt.','naF133')}
  {text(145,173.5,290,'Meine Füße sind so kalt. – Hier sind warme','naF1325')}
  {gap(436,173.5,'_ _ c k _ _')}{field('p82-1b',436,175,80,'1 b Socken','naField82g')}
  {text(513,173.5,10,'.','naF133')}
  {text(145,193.5,165,'Kann ich Ihnen helfen?','naF133')}
  {text(318,194.5,152,'– Gerne, ich suche einen','naF1245')}
  {gap(474,193.5,'G ü _ _ _ _')}{field('p82-1c1',474,195,80,'1 c Gürtel','naField82g')}
  {text(556,193.5,66,'für meine','naF133')}
  {gap(626,193.5,'H _ _ _')}{field('p82-1c2',626,195,46,'1 c Hose','naField82g')}
  {text(675,193.5,10,'.','naF133')}
  {text(145,212.5,300,'Warst du auf der Hochzeit von Ann-Sophie?','naF133')}
  {text(444,213.5,47,'– Ja, ihr','naF126')}
  {gap(496,212.5,'_ l _ _ d')}{field('p82-1d',496,214,61,'1 d Kleid','naField82g')}
  {text(560,212.5,55,'war toll!','naF133')}
  {text(144,232.5,165,'Was trägst du im Büro?','naF133')}
  {text(314,233.5,156,'– Meistens ein Hemd mit','naF124')}
  {gap(472,232.5,'P _ _ _ _ _ _ _ r')}{field('p82-1e',472,234,104,'1 e Pullover','naField82g')}
  {text(144,251.5,200,'Anna, dein Hemd gefällt mir.','naF133')}
  {text(354,252.5,182,'– Oh danke, aber das ist eine','naF124')}
  {gap(538,251.5,'B _ _ s _')}{field('p82-1f',538,253,54,'1 f Bluse','naField82g')}
  {text(598,251.5,10,'.','naF133')}
  {text(145,271.5,202,'Meine Oma trägt immer einen','naF132')}
  {gap(346,271.5,'_ u _')}{field('p82-1g',346,273,34,'1 g Hut','naField82g')}
  {text(384,271.5,70,'. – Klasse!','naF133')}
  {text(645,272,91,'_ / 8 Punkte','naPkt82')}
  {check('82-1',126,292,{'p82-1a':'Jacke','p82-1b':'Socken','p82-1c1':'Gürtel','p82-1c2':'Hose','p82-1d':'Kleid','p82-1e':'Pullover','p82-1f':'Bluse','p82-1g':'Hut'})}

  {/* ex 2 */}
  {num(95,314,'2')}
  {rail(75,348,'STRUKTUREN')}
  {text(126,316,410,'Ergänzen Sie alt, gern, groß, gut in der richtigen Form.','naT82')}
  {text(126,349.5,18,'a')}{text(145,348.5,80,'Duisburg ist')}
  {art('gross',223,346,34,26)}
  {text(258,348.5,122,'(+), München ist')}
  {field('p82-2a1',371,341,137,'2 a größer')}
  {text(513,348.5,100,'(++) und')}
  {field('p82-2a2',572,341,133,'2 a am größten')}
  {text(126,368.5,42,'(+++)')}
  {text(184,368.5,70,'ist Berlin.')}
  {text(126,387.5,18,'b')}{text(145,387.5,88,'Niklas macht')}
  {field('p82-2b1',236,380,137,'2 b gern')}
  {text(376,387.5,62,'(+) Sport,')}
  {field('p82-2b2',443,380,137,'2 b am besten')}
  {text(584,387.5,155,'(+++) findet er Fußball.')}
  {text(126,407.5,18,'c')}{text(145,407.5,210,'Ich bin 15, mein Bruder Paul ist')}
  {field('p82-2c',358,400,137,'2 c älter')}
  {text(498,407.5,175,'(++), er ist schon 20.')}
  {text(126,427.5,18,'d')}{text(144,427.5,144,'Tobias mag kein Obst,')}
  {field('p82-2d',291,419,137,'2 d am liebsten')}
  {text(431,427.5,175,'(+++) isst er Schokolade.')}
  {text(126,446.5,18,'e')}{text(144,446.5,86,'Carla spricht')}
  {field('p82-2e',233,438,137,'2 e besser')}
  {text(373,446.5,300,'(++) Deutsch als ich, ich mache noch viele Fehler.')}
  {text(126,465.5,18,'f')}{text(144,465.5,120,'Sandra mag Röcke')}
  {field('p82-2f',269,458,137,'2 f lieber')}
  {text(409,465.5,110,'(++) als Hosen.')}
  {text(645,466,91,'_ / 8 Punkte','naPkt82')}
  {check('82-2',126,486,{'p82-2a1':'größer','p82-2a2':'am größten','p82-2b1':'gern','p82-2b2':'am besten','p82-2c':'älter','p82-2d':'am liebsten','p82-2e':'besser','p82-2f':'lieber'})}

  {/* ex 3 */}
  {num(95,510,'3')}
  {rail(75,540,'STRUKTUREN')}
  {text(126,512,300,'Was ist richtig? Kreuzen Sie an.','naT82')}
  {text(127,543.5,18,'a')}{text(144,543.5,150,'Sie ist genauso groß')}
  {circ(291,541.5)}{text(312,543.5,24,'als')}
  {art('x',342,537,22,23)}{text(368,544.5,24,'wie')}
  {text(408,543.5,100,'ihre Freundin.')}
  {text(127,562.5,18,'b')}{text(145,562.5,160,'Karl hat mehr Urlaub')}
  {dot('p82-r3b-als',304.5,561,'3 b als')}{text(325,562.5,24,'als')}
  {dot('p82-r3b-wie',359,561,'3 b wie')}{text(380,563.5,24,'wie')}
  {text(421,563.5,80,'Franziska.')}
  {text(127,582.5,18,'c')}{text(144,582.5,170,'Hier ist es genauso schön')}
  {dot('p82-r3c-als',326.5,580,'3 c als')}{text(348,582.5,24,'als')}
  {dot('p82-r3c-wie',381.5,580.5,'3 c wie')}{text(403,584.5,24,'wie')}
  {text(443,584.5,110,'in der Schweiz.')}
  {text(127,601.5,18,'d')}{text(144,601.5,200,'Dominik spielt besser Gitarre')}
  {dot('p82-r3d-als',354,600,'3 d als')}{text(375,601.5,24,'als')}
  {dot('p82-r3d-wie',409,600,'3 d wie')}{text(431,603.5,24,'wie')}
  {text(471,603.5,40,'Udo.')}
  {text(127,621.5,18,'e')}{text(144,621.5,190,'Dieser Test ist genauso leicht')}
  {dot('p82-r3e-als',351,619,'3 e als')}{text(373,621.5,24,'als')}
  {dot('p82-r3e-wie',406,619,'3 e wie')}{text(428,622.5,24,'wie')}
  {text(467,623.5,140,'der Test in Lektion 7.')}
  {text(645,622,91,'_ / 4 Punkte','naPkt82')}
  {check('82-3',126,642,{'p82-r3b-als':'false','p82-r3b-wie':'true','p82-r3c-als':'false','p82-r3c-wie':'true','p82-r3d-als':'true','p82-r3d-wie':'false','p82-r3e-als':'false','p82-r3e-wie':'true'})}

  {/* ex 4 */}
  {num(95,666,'4')}
  {rail(75,696,'KOMMUNIKATION')}
  {text(126,668,220,'Ergänzen Sie die Sätze.','naT82')}
  {lin(127,698,547,16,'#fafed7')}
  {text(130,700,545,'wie langweilig | wahnsinnig teuer | total schön | am besten | fast täglich | viel praktischer','naBank82')}
  {text(129,728.5,90,'Dita312:','naNameR82')}
  {text(219,731.5,450,'Was zieht ihr gern an? Habt ihr ein Lieblingskleid oder ein Lieblingsshirt?','naChat82')}
  {text(129,750.5,90,'Blue_ocean:','naNameB82')}
  {text(220,750.5,505,'Im Büro muss ich immer eine Bluse und einen Rock tragen. Zu Hause trage ich nur','naChat82')}
  {text(220,768.5,125,'Hosen, ich finde das','naChat82')}
  {field('p82-4a',346,758,205,'4 a viel praktischer')}
  {text(554,769.5,155,'(a) als Röcke und es','naChat82')}
  {text(218,786.5,86,'gefällt mir so','naChat82')}
  {field('p82-4b',303,776,234,'4 b am besten')}
  {text(542,787.5,40,'(b).','naChat82')}
  {text(134,800.5,60,'Lola:','naNameP82')}
  {text(220,803.5,225,'Ich habe ein Lieblings-T-Shirt, das ist','naChat82')}
  {field('p82-4c',448,794,233,'4 c total schön')}
  {text(687,804.5,40,'(c).','naChat82')}
  {text(220,822.5,340,'Das habe ich im Hard-Rock-Café in Rom gekauft. Es war','naChat82')}
  {field('p82-4d',218,830,234,'4 d wahnsinnig teuer')}
  {text(457,840.5,240,'(d), 35 Euro! Ich trage es','naChat82')}
  {field('p82-4e',218,848,234,'4 e fast täglich')}
  {text(457,859.5,40,'(e).','naChat82')}
  {text(134,872.5,90,'Dita312:','naNameR82')}
  {text(219,876.5,155,'Was? Das gefällt dir? Ach,','naChat82')}
  {field('p82-4f',378,866,233,'4 f wie langweilig')}
  {text(617,876.5,40,'(f)!','naChat82')}
  {text(218,895.5,220,'Also, ich trage nur Kleidung von …','naChat82')}
  {text(645,895,91,'_ / 6 Punkte','naPkt82')}
  {check('82-4',126,912,{'p82-4a':'viel praktischer','p82-4b':'am besten','p82-4c':'total schön','p82-4d':'wahnsinnig teuer','p82-4e':'fast täglich','p82-4f':'wie langweilig'})}

  {/* footer score table */}
  {lin(354,934,384,26,'#efe9d4')}
  {lin(353,934,1,103,'#e9eae4')}{lin(380,934,1,103,'#e9eae4')}{lin(477,934,1,103,'#e9eae4')}{lin(504,934,1,103,'#e9eae4')}{lin(603,934,1,103,'#e9eae4')}{lin(630,934,1,103,'#e9eae4')}{lin(738,934,1,103,'#e9eae4')}
  {lin(353,934,386,1,'#e9eae4')}{lin(353,960,386,1,'#e9eae4')}{lin(353,986,386,1,'#e9eae4')}{lin(353,1012,386,1,'#e9eae4')}{lin(353,1037,386,1,'#e9eae4')}
  {text(358,941,60,'Wörter','naFtH82')}
  {text(482,941,80,'Strukturen','naFtH82')}
  {text(608,941,110,'Kommunikation','naFtH82')}
  {art('fdot1',354,959,26,26)}{text(385,965,80,'0–4 Punkte','naFtT82')}
  {art('fdot2',477,959,26,26)}{text(508,968,80,'0–6 Punkte','naFtT82')}
  {art('fdot3',604,959,26,26)}{text(635,968,80,'0–3 Punkte','naFtT82')}
  {art('fdot4',354,985,26,26)}{text(385,994,80,'5–6 Punkte','naFtT82')}
  {art('fdot5',477,985,26,26)}{text(508,995,80,'7–9 Punkte','naFtT82')}
  {art('fdot6',604,986,26,26)}{text(635,995,80,'4 Punkte','naFtT82')}
  {art('fdot7',354,1009,26,26)}{text(385,1020,90,'7–8 Punkte','naFtT82')}
  {art('fdot8',477,1010,26,26)}{text(508,1020,90,'10–12 Punkte','naFtT82')}
  {art('fdot9',604,1011,26,26)}{text(635,1020,90,'5–6 Punkte','naFtT82')}

  {/* footer */}
  {art('modul-tab',8,1037,56,24)}
  {text(74,1049,140,'82 | zweiundachtzig','naFt82')}
  {text(565,1043,175,'www.hueber.de/menschen/lernen','naUrl82')}
 </div></div>;
}
