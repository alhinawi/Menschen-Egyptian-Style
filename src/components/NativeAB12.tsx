import {CheckButton} from './CheckButton';
import {LinedArea} from './LinedArea';
import {PageImage} from './PageImage';
import {usePageReset} from '../exercises/usePageReset';
import {useLayoutEffect,useRef,useState} from 'react';
import './native-ab12.css';

function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\p{L}/u.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-word={w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text}>{w}</span>:w)}</>}
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\s+/g,' ');

const SCP=(sel:string)=>['30','52','59','65'].map(p=>`[data-native-ab12='${p}'] ${sel}`).join(',');

export function NativeAB12({page}:{page:string}){
 const W=+page>=66?807:1072, H=+page>=66?1094:1449;
 const root=useRef<HTMLDivElement>(null),player=useRef<HTMLAudioElement>(null);
 const [scale,ss]=useState(.6);const key='native-ab12-'+page;
 const [values,sv]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});
 const [results,sr]=useState<Record<string,boolean>>({});
 const [saved,sn]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=root.current!;const obs=new ResizeObserver(()=>ss(Math.min(el.clientWidth/W,(el.clientHeight-38)/H)));obs.observe(el);return ()=>obs.disconnect()},[W,H]);
 usePageReset(page,key,()=>{sv({});sr({})});
 const set=(id:string,v:string)=>{const n={...values,[id]:v};sv(n);localStorage.setItem(key,JSON.stringify(n))};
 const text=(x:number,y:number,w:number,t:string,cls='')=><div className={'naText '+cls} style={{left:x,top:y,width:w}}><Words text={t}/></div>;
const bank=(x:number,y:number,w:number,parts:[string,boolean][])=><div className={'naText naOpt naNw naBank'} style={{left:x,top:y,width:w}}>{parts.map(([t,strike],i)=><span key={i}>{i>0&&' | '}{strike?<span className="naStrike"><Words text={t}/></span>:<Words text={t}/>}</span>)}</div>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="naArt" src={`assets/book-crops/native-ab12-p${page}-${name}.png`} alt={'Originalillustration '+name} style={{left:x,top:y,width:w,height:h}}/>;
 const field=(id:string,x:number,y:number,w:number,label:string,cls='')=><input className={'naField '+cls} aria-label={label} data-native-field={id} style={{left:x,top:y,width:w}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>;
 const rule=(x:number,y:number,w:number)=><div className="naRule" style={{left:x,top:y,width:w}}/>;
 const dot=(id:string,value:string,x:number,y:number,label:string,checkbox=false)=><input className="naDot" type={checkbox?'checkbox':'radio'} aria-label={label} data-value={value} name={key+'-'+id} checked={checkbox?values[id]==='true':values[id]===value} onChange={e=>set(id,checkbox?String(e.target.checked):value)} style={{left:x,top:y}}/>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="naCheck" data-check={id} style={{left:x,top:y}}><CheckButton answers={answers} onClick={()=>sr({...results,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(v=>normalize(v)===normalize(values[k]||(a==='false'?'false':''))))})}></CheckButton><output aria-live="polite">{id in results?(results[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const title=(n:string,x:number,y:number,w:number,t:string,cls='')=><div className={'naTitle '+cls} style={{left:x,top:y,width:w}}><b>{n}</b><Words text={t}/></div>;
 // p52 Rückblick L18/1: comma/'und' lists graded as exact sets against the official key (order- and article-tolerant).
 const setList=(s:string)=>s.split(/,|\s+und\s+/i).map(t=>t.normalize('NFC').trim().replace(/^(der|die|das)\s+/i,'').toLocaleLowerCase('de').replace(/[.!?]+$/,'').trim()).filter(Boolean).sort().join(' ');
 const mark52=(id:string,ok:boolean)=>{root.current?.querySelectorAll(`[data-native-field="${id}"]`).forEach(e=>e.setAttribute('data-check-mark',ok?'ok':'bad'))};
 const check52t3=(x:number,y:number)=><div className="naCheck naStack" data-check="52-t3" data-check-layout="stack" style={{left:x,top:y}}><CheckButton onClick={()=>{const c1=setList(values['52-t3-c1']||'')===setList('Kopf, Arme, Beine, Hals, Bauch'),c2=setList(values['52-t3-c2']||'')===setList('Rücken, Brust, Hand, Finger, Fuß, Knie, Ohr, Auge, Zahn, Nase, Mund');mark52('52-t3-c1',c1);mark52('52-t3-c2',c2);sr({...results,'52-t3':c1&&c2})}}></CheckButton><output aria-live="polite">{'52-t3' in results?(results['52-t3']?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const save52=(id:string,x:number,y:number)=>null;
 const gl=(x:number,y:number,t:string,bg?:string)=><div className="naGL" style={{left:x,top:y,...(bg?{background:bg}:{})}}>{t}</div>;
 const kb=(x:number,y:number,t:string)=><div className="naKB" style={{left:x,top:y}}>{t}</div>;
 const hand=(x:number,y:number,w:number,t:string)=><div className="naText naHand" style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const audio=(src:string,x:number,y:number,label:string)=><button className="naAudio" style={{left:x,top:y}} aria-label={'Originalaudio '+label+' abspielen'} onClick={()=>{if(player.current){player.current.src=src;player.current.play().catch(()=>{})}}}>▶ {label}</button>;

 return <div className="nativeAB12" ref={root} data-native-ab12={page}><style>{`@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-400.woff2') format('woff2');font-weight:400}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-700.woff2') format('woff2');font-weight:700}@font-face{font-family:DroidSerif;src:url('assets/fonts/droid-serif-400.ttf') format('truetype');font-weight:400;font-display:swap}${SCP('.naTitle')}{font-family:FiraSans,sans-serif!important;letter-spacing:0!important;font-size:21px!important}${SCP('.naText')},${SCP('.naBold')},${SCP('.naLet')},${SCP('.naDlg')}{font-family:DroidSerif,Georgia,serif!important;font-size:20px!important;letter-spacing:-0.65px}${SCP('.naField')}{font-family:DroidSerif,Georgia,serif!important;font-size:19px!important;letter-spacing:-0.65px}${SCP('.naText.naS20')}{font-size:18px!important}${SCP('.naSmall')}{font-size:16.5px!important}${SCP('.naD19')}{font-size:17.5px!important}${SCP('.naUrl')}{font-size:11.5px!important;font-family:Georgia,serif;color:#333;line-height:13px}[data-native-ab12='52'] .naText,[data-native-ab12='52'] .naBold,[data-native-ab12='52'] .naLet,[data-native-ab12='52'] .naDlg,[data-native-ab12='52'] .naField{letter-spacing:0!important}[data-native-ab12='52'] .naTitle{font-size:22px!important}[data-native-ab12='52'] .naFoot52{font-size:17px!important;color:#202020!important}[data-native-ab12='89'] .naHeadline{font-size:23px!important;letter-spacing:0!important}[data-native-ab12='89'] .naWHead{font-family:FiraSans,sans-serif!important;font-weight:700!important}[data-native-ab12='52'] .naTitle.naRB b{top:-3px}[data-native-ab12='52'] .naField.naList52{font-size:12px!important}[data-native-ab12='52'] .naCheck.naStack{flex-direction:column;align-items:center;gap:4px;width:108px}[data-native-ab12='52'] .naCheck.naStack output{white-space:nowrap;text-align:center}`}</style><div className={'naCanvas'+(W<1000?' naNarrow':'')} style={{width:W,height:H,transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='89'&&<>
  {art('lesson-tab',738,18,62,75)}
  {text(75,61,300,'LERNWORTSCHATZ','naHeadline')}
  <div className="naHeadRule" style={{left:292,top:83,width:364,borderBottom:'2px solid #4a4a45'}}/>
  {title('1',78,123,540,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.','naRB naNw')}
  {text(96,151,160,'Wetter','naWHead')}
  {text(396,151,240,'Himmelsrichtungen','naWHead')}
  {text(396,309,240,'Weitere wichtige Wörter','naWHead')}
  {text(105,171,150,'Wetter das')}
  {text(105,190,150,'Gewitter das, -')}
  {field('89-1-l1',234,190,144,'Gewitter das, - übersetzen')}
  {text(105,209,150,'Grad das, -e')}
  {field('89-1-l2',234,209,144,'Grad das, -e übersetzen')}
  {text(105,229,150,'Nebel der')}
  {field('89-1-l3',234,229,144,'Nebel der übersetzen')}
  {text(105,249,150,'Regen der')}
  {field('89-1-l4',234,249,144,'Regen der übersetzen')}
  {text(105,268,150,'Schnee der')}
  {field('89-1-l5',234,268,144,'Schnee der übersetzen')}
  {text(105,287,150,'Sonne die, -n')}
  {field('89-1-l6',234,287,144,'Sonne die, -n übersetzen')}
  {text(105,307,150,'Sturm der, ¨e')}
  {field('89-1-l7',234,307,144,'Sturm der, ¨e übersetzen')}
  {text(105,326,150,'Wind der, -e')}
  {field('89-1-l8',234,326,144,'Wind der, -e übersetzen')}
  {text(105,345,150,'Wolke die, -n')}
  {field('89-1-l9',234,345,144,'Wolke die, -n übersetzen')}
  {text(105,376,150,'regnen, hat')}
  {text(114,395,150,'geregnet')}
  {field('89-1-l11',234,395,144,'geregnet übersetzen')}
  {text(105,415,150,'schneien, hat')}
  {text(114,434,150,'geschneit')}
  {field('89-1-l13',234,434,144,'geschneit übersetzen')}
  {text(105,454,150,'scheinen, hat')}
  {text(114,473,150,'geschienen')}
  {field('89-1-l15',234,473,144,'geschienen übersetzen')}
  {text(105,503,150,'kühl')}
  {field('89-1-l16',234,503,144,'kühl übersetzen')}
  {text(105,519,150,'neblig')}
  {field('89-1-l17',234,519,144,'neblig übersetzen')}
  {text(105,538,150,'sonnig')}
  {field('89-1-l18',234,538,144,'sonnig übersetzen')}
  {text(105,557,150,'warm')}
  {field('89-1-l19',234,557,144,'warm übersetzen')}
  {text(105,576,150,'windig')}
  {field('89-1-l20',234,576,144,'windig übersetzen')}
  {text(397,171,150,'Himmelsrichtung')}
  {text(406,191,150,'die, -en')}
  {field('89-1-r1',505,188,148,'die, -en übersetzen')}
  {text(396,210,150,'Norden der')}
  {field('89-1-r2',505,207,148,'Norden der übersetzen')}
  {text(396,230,150,'Süden der')}
  {field('89-1-r3',505,227,148,'Süden der übersetzen')}
  {text(396,250,150,'Osten der')}
  {field('89-1-r4',505,246,148,'Osten der übersetzen')}
  {text(396,270,150,'Westen der')}
  {field('89-1-r5',505,266,148,'Westen der übersetzen')}
  {text(396,328,150,'Dach das, ¨er')}
  {field('89-1-r6',505,324,148,'Dach das, ¨er übersetzen')}
  {text(396,347,150,'Frühjahr das, -e')}
  {field('89-1-r7',505,344,148,'Frühjahr das, -e übersetzen')}
  {text(396,367,150,'Glas das, ¨er')}
  {field('89-1-r8',505,363,148,'Glas das, ¨er übersetzen')}
  {text(396,386,150,'Glück das')}
  {field('89-1-r9',505,383,148,'Glück das übersetzen')}
  {text(396,405,150,'Himmel der')}
  {field('89-1-r10',505,402,148,'Himmel der übersetzen')}
  {text(396,421,150,'Laune die, -n')}
  {field('89-1-r11',505,422,148,'Laune die, -n übersetzen')}
  {text(396,444,150,'Reiseführer')}
  {text(405,460,150,'der, -')}
  {field('89-1-r13',505,461,148,'der, - übersetzen')}
  {text(396,484,150,'Traum der, ¨e')}
  {field('89-1-r14',505,480,148,'Traum der, ¨e übersetzen')}
  {art('tipp',433,545,136,42)}
  {text(461,550,110,'Suchen Sie','naSmall')}
  {text(461,568,130,'Wortfamilien.','naSmall')}
  {art('handwriting',360,605,265,60)}
  {art('strip',665,95,140,915)}
  {title('2',78,686,540,'Welche Wörter möchten Sie noch lernen? Notieren Sie.','naRB naNw')}
  <LinedArea id="89-2-text" values={values} set={set} x={106} tops={[713, 732, 752, 772, 791, 811, 830, 849, 869, 888, 908, 927, 947, 966, 986, 1005]} w={546} boxH={20} label="Notizen" legacyIds={["89-2-0", "89-2-1", "89-2-2", "89-2-3", "89-2-4", "89-2-5", "89-2-6", "89-2-7", "89-2-8", "89-2-9", "89-2-10", "89-2-11", "89-2-12", "89-2-13", "89-2-14", "89-2-15"]}/>
  {text(598,1046,150,'neunundachtzig  |  89','naFooter')}
  {art('modul-tab',746,1051,54,14)}
  {save52('89-1',234,620)}
  {save52('89-2',234,1034)}
 </>}
 {page==='52'&&<>
  <div className="naBand52"/>
  {text(129,70,320,'RÜCKBLICK','naHeadline')}
  {text(126,158,480,'Wählen Sie eine Aufgabe zu Lektion','naSec naNw')}
  {gl(508,161,'17','#74c655')}
  <div className="naGRule" style={{left:540,top:186,width:438,height:3,background:'#b5d8b2'}}/>
  {art('mag1',70,216,54,52)}
  {title('1',125,225,780,'Lesen Sie noch einmal Ihre Pläne im Kursbuch auf Seite 31 (Aufgabe 6).','naRB naNw')}
  {text(165,254,600,'Wann wollen Sie was machen? Schreiben Sie.','naD20 naNw')}
  {text(167,291,340,'Im August / Im Sommer ...','naD20')}
  {text(167,316,250,'In zwei Jahren ...','naD20')}
  {text(167,341,250,'In zehn Jahren ...','naD20')}
  {text(167,374,60,'...','naD20')}
  {art('hand1',448,302,388,76)}
  {field('52-t1-a1',230,371,770,'Eigener Satz 1','naFieldBlank')}
  {field('52-t1-a2',167,404,833,'Eigener Satz 2','naFieldBlank')}
  {field('52-t1-a3',167,429,820,'Eigener Satz 3','naFieldBlank')}
  {save52('52-t1',880,250)}
  {art('pen1',72,448,49,50)}
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
  {save52('52-t2',880,461)}
  {text(120,689,480,'Wählen Sie eine Aufgabe zu Lektion','naSec naNw')}
  {gl(502,692,'18','#5a9d97')}
  <div className="naGRule" style={{left:534,top:717,width:432,height:3,background:'#a0c4ca'}}/>
  {art('mag2',70,744,48,52)}
  {title('1',119,756,850,'Lesen Sie noch einmal den Ratgeber im Kursbuch auf Seite 35 und notieren Sie.','naRB naNw')}
  {text(162,795,295,'Diese Körperteile stehen im Text:','naD20 naNw')}
  {field('52-t3-c1',495,793,467,'Körperteile im Text','naList52')}
  {text(161,821,350,'Diese Körperteile stehen nicht im Text:','naD20 naNw')}
  {field('52-t3-c2',550,820,412,'Körperteile nicht im Text','naList52')}
  {check52t3(968,791)}
  {art('pen2',70,872,46,52)}
  {title('2',117,884,830,'Was machen Sie gegen Stress? Machen Sie Notizen und schreiben\nSie dann einen Ratgeber.','naRB naPre')}
  {text(159,949,170,'Gegen Stress hilft:','naD19 naNw')}
  {field('52-t4-d1',322,950,644,'Gegen Stress hilft')}
  {art('hand4',150,986,395,102)}
  {field('52-t4-d2',167,1100,833,'Eigener Ratgeber 1','naFieldBlank')}
  {field('52-t4-d3',167,1132,833,'Eigener Ratgeber 2','naFieldBlank')}
  {field('52-t4-d4',167,1164,833,'Eigener Ratgeber 3','naFieldBlank')}
  {save52('52-t4',880,882)}
  {art('modul',0,1388,72,24)}
  {text(96,1388,220,'52 \u00a0|\u00a0 zweiundfünfzig','naFooter naFoot52')}
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
  <LinedArea id="83-2-text" values={values} set={set} x={98} tops={[763, 783, 802, 822, 841, 861, 880, 900, 919, 939, 958, 977, 997]} w={550} boxH={20} label="Notizen" legacyIds={["83-2-0", "83-2-1", "83-2-2", "83-2-3", "83-2-4", "83-2-5", "83-2-6", "83-2-7", "83-2-8", "83-2-9", "83-2-10", "83-2-11", "83-2-12"]}/>
  {text(600,1049,135,'dreiundachtzig \u00a0|\u00a0 83','naFooter')}
  {art('modul-tab',738,1048,66,26)}
 </>}
 {page==='30'&&<>
  {art('header',0,0,1072,102)}
  {kb(78,178,'KB 4')}
  {title('1',130,172,760,'Ergänzen Sie das Gespräch. Schreiben Sie Sätze.','naGB')}
  <div className="naSide" style={{left:75,top:200}}>KOMMUNIKATION</div>
  {bank(172,215,800,[['sehr nett sein',false],['nicht funktionieren',false],['für Sie tun können',true],['sofort kümmern',false],['Ihre Hilfe brauchen',false]])}
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
  {bank(172,524,800,[['Föhn',false],['Internetverbindung',false],['Fernseher',true],['Dusche',false],['Klimaanlage',false],['Aufzug',false],['Minibar',false]])}
  {bank(172,550,800,[['Schwimmbad',false],['Restaurant',false],['Radio',false],['Tennisplatz',false],['Telefon',false]])}
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
  <LinedArea id="59-2-text" values={values} set={set} x={155} tops={[955, 981, 1007, 1033, 1059, 1085, 1111, 1137, 1163, 1189, 1215, 1241, 1267]} w={600} boxH={27} label="Notizen" legacyIds={["59-2-0", "59-2-1", "59-2-2", "59-2-3", "59-2-4", "59-2-5", "59-2-6", "59-2-7", "59-2-8", "59-2-9", "59-2-10", "59-2-11", "59-2-12"]}/>
  {text(811,1384,160,'neunundfünfzig  |  59','naFooter')}
  {art('modul-tab',1008,1384,64,30)}
 </>}
 {page==='23'&&<>
  {art('lesson-tab',971,33,94,86)}
  <div className="naText naHeadline" style={{left:105,top:89,width:290,fontSize:27.5,letterSpacing:2.2}}><Words text="LERNWORTSCHATZ"/></div>
  <div className="naHeadRule" style={{left:400,top:112,width:476,borderBottom:'2px solid #f1ae23'}}/>
  {title('1',100,161,700,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.','naOB')}
  {text(144,200,160,'In der Stadt','naBold')}
  {text(144,225,170,'Bibliothek die, -en','naS21')}{field('23-1-l1',316,223,189,'Bibliothek die, -en übersetzen')}
  {text(144,251,170,'Geschäft das, -e /','naS21')}
  {text(155,277,160,'Laden der, \u00a8','naS21')}{field('23-1-l2',316,275,189,'Laden der, \u00a8 übersetzen')}
  {text(144,303,160,'Hafen der, \u00a8','naS21')}{field('23-1-l3',316,301,189,'Hafen der, \u00a8 übersetzen')}
  {text(144,329,170,'Jugendherberge','naS21')}
  {text(155,354,80,'die, -n','naS21')}{field('23-1-l4',316,352,189,'Jugendherberge die, -n übersetzen')}
  {text(144,380,170,'Kindergarten','naS21')}
  {text(155,406,80,'der, \u00a8','naS21')}{field('23-1-l5',316,404,189,'Kindergarten der, \u00a8 übersetzen')}
  {text(144,431,160,'Kirche die, -n','naS21')}{field('23-1-l6',316,429,189,'Kirche die, -n übersetzen')}
  {text(144,458,160,'Markt der, \u00a8e','naS21')}{field('23-1-l7',316,456,189,'Markt der, \u00a8e übersetzen')}
  {text(144,483,160,'Park der, -s','naS21')}{field('23-1-l8',316,481,189,'Park der, -s übersetzen')}
  {text(144,509,170,'Rathaus das, \u00a8er','naS21')}{field('23-1-l9',316,507,189,'Rathaus das, \u00a8er übersetzen')}
  {text(144,534,170,'Schloss das, \u00a8er','naS21')}{field('23-1-l10',316,532,189,'Schloss das, \u00a8er übersetzen')}
  {text(144,560,170,'Spielplatz der, \u00a8e','naS21')}{field('23-1-l11',316,558,189,'Spielplatz der, \u00a8e übersetzen')}
  {text(144,586,160,'Turm der, \u00a8e','naS21')}{field('23-1-l12',316,584,189,'Turm der, \u00a8e übersetzen')}
  {text(144,639,250,'Weitere wichtige Wörter','naBold')}
  {text(144,663,170,'Ausländer der, -','naS21')}{field('23-1-l13',316,661,189,'Ausländer der, - übersetzen')}
  {text(144,689,160,'Blick der, -e','naS21')}{field('23-1-l14',316,687,189,'Blick der, -e übersetzen')}
  {text(534,201,170,'Mensch der, -en','naS21')}{field('23-1-r1',706,201,164,'Mensch der, -en übersetzen')}
  {text(534,227,150,'Reisebüro','naS21')}
  {text(545,258,80,'das, -s','naS21')}{field('23-1-r2',675,249,195,'Reisebüro das, -s übersetzen')}
  {text(534,279,160,'Rezept das, -e','naS21')}{field('23-1-r3',675,278,195,'Rezept das, -e übersetzen')}
  {text(534,304,150,'Urlaub der','naS21')}{field('23-1-r3b',675,300,195,'Urlaub der übersetzen')}
  {text(545,333,200,'CH: Ferien die (Pl.)','naGray naS20')}
  {text(534,356,150,'Wetter das','naS21')}{field('23-1-r4',675,351,195,'Wetter das übersetzen')}
  {text(534,394,160,'danken, hat','naS21')}
  {text(545,420,120,'gedankt','naS21')}{field('23-1-r5',675,416,195,'danken übersetzen')}
  {text(534,446,160,'fehlen, hat','naS21')}
  {text(545,472,120,'gefehlt','naS21')}{field('23-1-r6',675,468,195,'fehlen übersetzen')}
  {text(534,498,160,'gehören, hat','naS21')}
  {text(545,524,120,'gehört','naS21')}{field('23-1-r7',675,519,195,'gehören übersetzen')}
  {text(534,562,120,'wichtig','naS21')}{field('23-1-r8',675,557,195,'wichtig übersetzen')}
  {text(534,601,120,'alle','naS21')}{field('23-1-r9',675,596,195,'alle übersetzen')}
  {text(534,632,120,'wenig','naS21')}{field('23-1-r10',675,621,195,'wenig übersetzen')}
  {text(534,654,120,'zu Hause','naS21')}{field('23-1-r11',675,647,195,'zu Hause übersetzen')}
  {art('tipp',146,744,440,104)}
  {text(172,751,400,'Sehen Sie den Lernwortschatz „In der Stadt“ an.','naSmall')}
  {text(172,775,400,'Schließen Sie das Buch.','naSmall')}
  {text(172,799,400,'Schreiben Sie jetzt die Wörter mit Artikel auf.','naSmall')}
  {text(172,823,400,'Wie viele Wörter kennen Sie?','naSmall')}
  {art('handwriting',600,743,125,52)}
  <div className="naCheck" data-check="23-save" style={{left:740,top:161}}><CheckButton onClick={()=>sn(s=>({...s,['23-save']:true}))}/><output aria-live="polite">{saved['23-save']?'Gespeichert':''}</output></div>
  {title('2',98,895,760,'Welche Wörter möchten Sie noch lernen? Notieren Sie.','naOB')}
  <LinedArea id="23-2-text" values={values} set={set} x={150} tops={[931, 957, 983, 1009, 1034, 1060, 1086, 1111, 1137, 1163, 1189, 1215, 1240, 1266, 1292, 1317]} w={545} boxH={27} label="Notizen" legacyIds={["23-2-1", "23-2-2", "23-2-3", "23-2-4", "23-2-5", "23-2-6", "23-2-7", "23-2-8", "23-2-9", "23-2-10", "23-2-11", "23-2-12", "23-2-13", "23-2-14", "23-2-15", "23-2-16"]}/>
  <div className="naCheck" data-check="23-n-save" style={{left:600,top:900}}><CheckButton onClick={()=>sn(s=>({...s,['23-n-save']:true}))}/><output aria-live="polite">{saved['23-n-save']?'Gespeichert':''}</output></div>
  {art('strip',910,132,145,1218)}
  {text(793,1384,195,'dreiundzwanzig \u00a0|\u00a0 23','naFooter')}
  {art('modul-tab',999,1379,67,27)}
 </>}
 {page==='95'&&<>
  {art('lesson-tab',727,29,76,63)}
  <div className="naText naHeadline" style={{left:76,top:63,width:190,fontSize:22,letterSpacing:1.7}}><Words text="LERNWORTSCHATZ"/></div>
  <div className="naHeadRule" style={{left:308,top:84,width:349,borderBottom:'2px solid #e55330'}}/>
  {title('1',75,115,500,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.','naFB')}
  {text(78,151,160,'Feste und Feiern','naBold')}
  {text(78,172,130,'Fest das, -e')}{field('95-1-l1',238,168,140,'Fest das, -e übersetzen')}
  {text(78,191,130,'Feier die, -n')}{field('95-1-l2',238,188,140,'Feier die, -n übersetzen')}
  {text(78,211,120,'Ostern das')}{field('95-1-l3',238,207,140,'Ostern das übersetzen')}
  {text(89,231,180,'A: Ostern die (Pl)','naGray')}
  {text(78,249,150,'Weihnachten das')}{field('95-1-l4',238,246,140,'Weihnachten das übersetzen')}
  {text(89,270,190,'A: Weihnachten die (Pl)','naGray')}
  {text(78,298,140,'bestehen, hat')}
  {text(89,318,120,'bestanden')}{field('95-1-l5',238,314,140,'bestehen übersetzen')}
  {text(78,337,140,'gratulieren, hat')}
  {text(89,357,120,'gratuliert')}{field('95-1-l6',238,353,140,'gratulieren übersetzen')}
  {text(78,376,140,'schenken, hat')}
  {text(89,396,120,'geschenkt')}{field('95-1-l7',238,392,140,'schenken übersetzen')}
  {text(78,434,150,'Glückwünsche','naBold')}
  {text(78,454,140,'Glückwunsch')}
  {text(89,477,80,'der, \u00a8e')}{field('95-1-l8',238,470,140,'Glückwunsch der, \u00a8e übersetzen')}
  {text(78,503,130,'Alles Gute!')}{field('95-1-l9',238,499,140,'Alles Gute! übersetzen')}
  {text(78,522,80,'Frohe')}
  {text(89,542,140,'Weihnachten!')}{field('95-1-l10',238,538,140,'Frohe Weihnachten! übersetzen')}
  {text(78,562,140,'Gutes / Frohes')}
  {text(89,581,120,'neues Jahr!')}{field('95-1-l11',238,577,140,'Gutes Frohes neues Jahr! übersetzen')}
  {text(78,601,140,'Gut gemacht!')}{field('95-1-l12',238,597,140,'Gut gemacht! übersetzen')}
  {text(78,620,120,'Herzlichen')}
  {text(89,639,140,'Glückwunsch!')}{field('95-1-l13',238,636,140,'Herzlichen Glückwunsch! übersetzen')}
  {text(78,678,200,'Weitere wichtige Wörter','naBold')}
  {text(78,698,140,'Bekannte der/')}
  {text(89,717,80,'die, -n')}{field('95-1-l14',238,713,140,'Bekannte der die, -n übersetzen')}
  {text(78,737,120,'CD die, -s')}{field('95-1-l15',238,733,140,'CD die, -s übersetzen')}
  {text(401,153,150,'Getränk das, -e')}{field('95-1-r1',510,149,148,'Getränk das, -e übersetzen')}
  {text(401,172,140,'Ticket das, -s')}{field('95-1-r2',510,169,148,'Ticket das, -s übersetzen')}
  {text(409,193,180,'A: Fahrkarte die, -n','naGray')}
  {text(409,213,170,'CH: Billet das, -s','naGray')}
  {text(401,231,140,'Reise die, -n')}{field('95-1-r3',510,227,148,'Reise die, -n übersetzen')}
  {text(401,251,140,'Verwandte der/')}
  {text(409,270,80,'die, -n')}{field('95-1-r4',510,266,148,'Verwandte der die, -n übersetzen')}
  {text(401,303,150,'antworten, hat')}
  {text(409,323,130,'geantwortet')}{field('95-1-r5',510,315,148,'antworten übersetzen')}
  {text(401,342,150,'gewinnen, hat')}
  {text(409,361,120,'gewonnen')}{field('95-1-r6',510,354,148,'gewinnen übersetzen')}
  {text(401,381,150,'um·ziehen, ist')}
  {text(409,401,120,'umgezogen')}{field('95-1-r7',510,393,148,'umziehen übersetzen')}
  {text(401,426,110,'zufrieden')}{field('95-1-r8',510,422,148,'zufrieden übersetzen')}
  {text(401,455,110,'draußen')}{field('95-1-r9',510,451,148,'draußen übersetzen')}
  {text(401,478,120,'gemeinsam')}{field('95-1-r10',510,471,148,'gemeinsam übersetzen')}
  {text(401,503,120,'hoffentlich')}{field('95-1-r11',510,499,148,'hoffentlich übersetzen')}
  {text(401,523,100,'endlich')}{field('95-1-r12',510,519,148,'endlich übersetzen')}
  {text(401,543,100,'schade')}{field('95-1-r13',510,539,148,'schade übersetzen')}
  {art('tipp',407,578,170,58)}
  {text(435,595,140,'Notieren Sie wichtige','naSmall')}
  {text(435,611,140,'Termine auf Deutsch.','naSmall')}
  {art('handwriting',411,645,248,58)}
  {title('2',80,791,500,'Welche Wörter möchten Sie noch lernen? Notieren Sie.','naFB')}
  <LinedArea id="95-2-text" values={values} set={set} x={109} tops={[821, 841, 860, 879, 899, 919, 938, 957, 977, 997]} w={545} boxH={20} label="Notizen" legacyIds={["95-2-1", "95-2-2", "95-2-3", "95-2-4", "95-2-5", "95-2-6", "95-2-7", "95-2-8", "95-2-9", "95-2-10"]}/>
  {art('strip',648,135,160,865)}
  {text(596,1047,140,'fünfundneunzig \u00a0|\u00a0 95','naFooter')}
  {art('modul-tab',745,1050,53,18)}
 </>}
 {page==='65'&&<>
  {art('lesson-tab',973,55,99,68)}
  <div className="naText naHeadline" style={{left:104,top:84,width:290,fontSize:27.5,letterSpacing:2.2}}><Words text="LERNWORTSCHATZ"/></div>
  <div className="naHeadRule" style={{left:396,top:111,width:509,borderBottom:'2px solid #8b2a78'}}/>
  {title('1',100,160,700,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.','naPB')}
  {text(144,195,160,'Im Haushalt','naBold')}
  {text(531,197,240,'Weitere wichtige Wörter','naBold')}
  {text(144,223,160,'Abfall der, ¨e','naS21')}{field('65-1-l1',316,221,189,'Abfall der, ¨e übersetzen')}
  {text(144,249,160,'Boden der, ¨','naS21')}{field('65-1-l2',316,247,189,'Boden der, ¨ übersetzen')}
  {text(144,274,160,'Geschirr das','naS21')}{field('65-1-l3',327,273,178,'Geschirr das übersetzen')}
  {text(144,300,160,'Haushalt der','naS21')}{field('65-1-l4',345,299,160,'Haushalt der übersetzen')}
  {text(144,326,160,'Ordnung die /','naS21')}
  {text(156,352,160,'Unordnung die','naS21')}{field('65-1-l5',319,350,186,'Ordnung Unordnung übersetzen')}
  {text(144,376,160,'Spülmaschine','naS21')}
  {text(155,404,80,'die, -n','naS21')}{field('65-1-l6',345,402,160,'Spülmaschine die, -n übersetzen')}
  {text(154,432,360,'CH: Abwaschmaschine die, -n','naGray naS20')}
  {text(144,455,160,'Wäsche die','naS21')}{field('65-1-l7',315,453,190,'Wäsche die übersetzen')}
  {text(144,494,200,'ab·trocknen, hat','naS21')}
  {text(155,517,160,'abgetrocknet','naS21')}{field('65-1-l8',315,518,190,'abtrocknen übersetzen')}
  {text(144,545,200,'ab·waschen, hat','naS21')}
  {text(155,569,160,'abgewaschen','naS21')}{field('65-1-l9',342,570,163,'abwaschen übersetzen')}
  {text(143,597,230,'spülen, hat gespült','naS21')}
  {text(155,623,170,'Geschirr spülen','naS21')}{field('65-1-l10',322,621,183,'spülen übersetzen')}
  {text(154,652,430,'CH: den Abwasch machen oder abwaschen','naGray naS19')}
  {text(143,675,190,'waschen, hat','naS21')}
  {text(153,700,160,'gewaschen')}{field('65-1-l11',314,698,191,'waschen übersetzen')}
  {text(143,739,160,'ordentlich','naS21')}{field('65-1-l12',314,737,191,'ordentlich übersetzen')}
  {text(143,765,160,'sauber','naS21')}{field('65-1-l13',314,763,191,'sauber übersetzen')}
  {text(143,791,160,'schmutzig','naS21')}{field('65-1-l14',315,789,190,'schmutzig übersetzen')}
  {text(531,225,150,'Anruf der, -e')}{field('65-1-r1',675,222,197,'Anruf der, -e übersetzen')}
  {text(531,250,200,'Anrufbeantworter')}
  {text(542,277,80,'der, -')}{field('65-1-r2',675,274,197,'Anrufbeantworter der, - übersetzen')}
  {text(531,303,150,'Antwort die,')}
  {text(542,329,60,'-en')}{field('65-1-r3',675,326,197,'Antwort die, -en übersetzen')}
  {text(532,353,150,'Brief der, -e')}{field('65-1-r4',675,351,197,'Brief der, -e übersetzen')}
  {text(531,379,150,'Größe die, -n')}{field('65-1-r5',675,377,197,'Größe die, -n übersetzen')}
  {text(532,405,150,'Information die,')}
  {text(542,437,60,'-en')}{field('65-1-r6',675,429,197,'Information die, -en übersetzen')}
  {text(531,470,120,'auf sein')}{field('65-1-r7',675,467,197,'auf sein übersetzen')}
  {text(542,497,150,'CH: offen sein','naGray')}
  {text(531,522,150,'hassen, hat')}
  {text(541,545,120,'gehasst')}{field('65-1-r8',675,545,197,'hassen übersetzen')}
  {text(530,573,190,'zu·machen, hat')}
  {text(542,599,120,'zugemacht')}{field('65-1-r9',675,596,197,'zumachen übersetzen')}
  {text(531,637,120,'fertig')}{field('65-1-r10',675,635,197,'fertig übersetzen')}
  {text(530,668,120,'ganz')}{field('65-1-r11',675,660,197,'ganz übersetzen')}
  {text(530,689,120,'schnell')}{field('65-1-r12',675,686,197,'schnell übersetzen')}
  {art('tipp',313,837,295,52)}
  {text(347,844,255,'Suchen Sie Wörter mit gleicher','naSmall')}
  {text(347,867,255,'oder ähnlicher Bedeutung.','naSmall')}
  {art('handwriting',640,805,155,40)}
  {title('2',98,921,760,'Welche Wörter möchten Sie noch lernen? Notieren Sie.','naPB')}
  <LinedArea id="65-2-text" values={values} set={set} x={140} tops={[956, 982, 1008, 1034, 1060, 1085, 1111, 1137, 1163, 1189, 1215, 1240, 1266, 1292, 1317]} w={730} boxH={27} label="Notizen" legacyIds={["65-2-1", "65-2-2", "65-2-3", "65-2-4", "65-2-5", "65-2-6", "65-2-7", "65-2-8", "65-2-9", "65-2-10", "65-2-11", "65-2-12", "65-2-13", "65-2-14", "65-2-15"]}/>
  {art('strip',908,128,164,1243)}
  {text(803,1384,180,'fünfundsechzig \u00a0|\u00a0 65','naFooter')}
  {art('modul-tab',992,1388,80,27)}
 </>}
 </div><audio ref={player} className="naPlayer"/></div>;
}
