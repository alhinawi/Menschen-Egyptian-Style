import {CheckButton} from '../components/CheckButton';
import {useLayoutEffect,useRef,useState} from 'react';
import {usePageReset} from '../exercises/usePageReset';
import {LineMatching} from '../exercises/LineMatching';
import './native-ab11.css';
import './native-ab11-lessons45.css';
import './native-ab11-test88.css';
const norm=(s:string)=>s.normalize('NFC').toLocaleLowerCase('de').replace(/[.,!?;:’']/g,'').replace(/[–−]/g,'-').trim().replace(/\s+/g,' ');
function Words({s}:{s:string}){return <>{s.split(/(\s+)/).map((w,i)=>/\S/.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-phrase={s} data-word={w.replace(/^[.,!?„"()]+|[.,!?“"()]+$/g,'')}>{w}</span>:w)}</>}
export const test88Answers:Record<string,string>={
 't2-a':'Am Nachmittag habe ich Fußball gespielt',
 't2-b1':'Hast du Monika gesehen','t2-b2':'Wir haben viel gelacht',
 't2-c1':'Habt ihr heute Nachmittag eingekauft','t2-c2':'Anna hat Englisch gelernt','t2-c3':'ich habe Hausaufgaben gemacht',
 't2-d1':'hast du zum Frühstück gegessen','t2-d2':'habe einen Kaffee getrunken',
 't2-e1':'hast du heute gemacht','t2-e2':'habe bis 12 Uhr geschlafen','t2-e3':'haben meine Freunde und ich lange gefeiert',
 't3-a':'habe ich eingekauft','t3-b':'15 bis 17 Uhr habe ich Tennis gespielt|15-17 Uhr habe ich Tennis gespielt','t3-c':'hast du heute gemacht','t3-d':'mit Anna Deutsch gelernt','t3-e':'Am Nachmittag habe ich gearbeitet|Nachmittags habe ich gearbeitet'};
export function NativeAB11Test88(){
 const page=88,key='native-ab11-88',host=useRef<HTMLDivElement>(null),[scale,SS]=useState(1),[v,S]=useState<Record<string,string>>(()=>{try{return {...JSON.parse(localStorage.getItem('native-ab11-line-88')||'{}'),...JSON.parse(localStorage.getItem(key)||'{}')}}catch{return {}}}),[graded,G]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const measure=()=>SS(Math.min(el.clientWidth/901,el.clientHeight/1275));measure();const ro=new ResizeObserver(measure);ro.observe(el);return()=>ro.disconnect()},[]);
 usePageReset(page,key,()=>{S({});G({});localStorage.removeItem('native-ab11-line-88')});
 const set=(id:string,value:string)=>{const next={...v,[id]:value};S(next);localStorage.setItem(key,JSON.stringify(next));G({})};
 const Y=(y:number)=>y<423?y*.88:y<=840?y-50.76:y*.88+50.4;
 const txt=(x:number,y:number,w:number,s:string,cls='')=><div className={'mText '+cls} style={{left:x,top:cls==='mFooter'?y:Y(y),width:w}}><Words s={s}/></div>;
 const f=(id:string,x:number,y:number,w:number)=>{const ctx=document.createElement('canvas').getContext('2d');if(ctx)ctx.font="16px 'Times New Roman'";const size=Math.max(10,Math.min(16,16*(w-8)/(ctx?.measureText(v[id]||'').width||1)));return <input className="mField" data-native-field={id} aria-label={id} style={{left:x,top:Y(y),width:w,fontSize:size}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>};
 const title=(n:string,y:number,s:string)=><><div className="mNumber red" style={{left:112,top:Y(y)}}>{n}</div>{txt(148,y,690,s,'mTitle')}</>;
 const expected=[4,2,5,0,6,3,1];
 const check=(id:string,y:number,test:()=>boolean)=><div className="mCheck" data-native-task={id} style={{left:149,top:Y(y)}}><CheckButton type="button" answers={Object.fromEntries(Object.entries(test88Answers).filter(([k])=>k.startsWith(id+'-')))} onClick={()=>G({...graded,[id]:test()})}></CheckButton><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const group=(prefix:string)=>Object.entries(test88Answers).filter(([k])=>k.startsWith(prefix)).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')));
 return <div className="nativeAB11 nativeAB11Module1 nativeAB11Lessons45 nativeAB11Test88" data-native-ab11-page="88" ref={host}><div className="nabCanvas mCanvas" style={{top:0,transformOrigin:'top center',transform:`translate(-50%,0) scale(${scale})`}}>
 {txt(112,125,180,'TEST','mHeader')}<div className="p88Rule" style={{left:181,top:Y(143),width:641}}/>
 {title('1',182,'Was passt? Ordnen Sie zu.')}
 <div className="nabSide" style={{left:92,top:225}}>WÖRTER</div>
 <LineMatching id="ab88-1" left={['a  Wein','b  die Hausaufgaben','c  Fahrrad','d  Spanisch','e  die Zeitung','f  Freunde','g  das Zimmer']} right={['lernen','aufräumen','machen','einladen','trinken','fahren','lesen']} values={v} onMatch={set} leftX={149} rightX={382} leftWidth={180} rightWidth={230} ys={[218,240,262,284,306,328,350].map(Y)} width={901} height={1275} fontSize={17} example={[0,4]}/>
 {txt(750,356,85,'_ / 6 Punkte','p88Points')}{check('t1',382,()=>expected.every((r,i)=>i===0||v['ab88-1-'+i]===''+r))}
 {title('2',423,'Schreiben Sie Sätze im Perfekt.')}
 <div className="nabSide" style={{left:92,top:465}}>STRUKTUREN</div>
 {txt(149,460,25,'a')}{txt(172,460,20,'▪','p88Square')}{txt(188,460,202,'Hast du heute gearbeitet?','mExample')}{txt(394,460,420,'(heute/arbeiten/du)')}
 {txt(172,486,20,'▴','p88Triangle')}{txt(188,486,194,'Ja, aber nur bis 14 Uhr.')}{f('t2-a',359,482,456)}{txt(817,486,9,'.')}{txt(188,510,525,'(Fußball spielen/am Nachmittag/ich)')}
 {txt(149,540,25,'b')}{txt(172,540,20,'▪','p88Square')}{f('t2-b1',188,536,477)}{txt(666,540,9,'?')}{txt(680,540,160,'(sehen/Monika/du)')}
 {txt(172,566,20,'▴','p88Triangle')}{txt(188,566,125,'Ja, letzte Woche.')}{f('t2-b2',311,562,376)}{txt(688,566,9,'.')}{txt(702,566,180,'(viel/wir/lachen)')}
 {txt(149,596,25,'c')}{txt(172,596,20,'▪','p88Square')}{f('t2-c1',188,592,367)}{txt(556,596,9,'?')}{txt(570,596,250,'(einkaufen/heute Nachmittag/ihr)')}
 {txt(172,622,20,'▴','p88Triangle')}{txt(188,622,45,'Nein,')}{f('t2-c2',231,618,415)}{txt(651,622,220,'(Anna, Englisch lernen)')}
 {txt(188,648,35,'und')}{f('t2-c3',222,644,355)}{txt(578,648,9,'.')}{txt(592,648,235,'(Hausaufgaben machen/ich)')}
 {txt(149,678,25,'d')}{txt(172,678,20,'▪','p88Square')}{txt(188,678,40,'Was')}{f('t2-d1',227,674,395)}{txt(623,678,9,'?')}{txt(637,678,240,'(zum Frühstück/essen/du)')}
 {txt(172,704,20,'▴','p88Triangle')}{txt(188,704,98,'Müsli. Und ich')}{f('t2-d2',286,700,365)}{txt(652,704,9,'.')}{txt(666,704,210,'(trinken/einen Kaffee)')}
 {txt(149,734,25,'e')}{txt(172,734,20,'▪','p88Square')}{txt(188,734,40,'Was')}{f('t2-e1',227,730,443)}{txt(671,734,9,'?')}{txt(685,734,190,'(heute/machen/du)')}
 {txt(172,760,20,'▴','p88Triangle')}{txt(188,760,111,'Nicht viel. Ich')}{f('t2-e2',301,756,366)}{txt(668,760,9,'.')}{txt(682,760,186,'(schlafen/bis 12 Uhr)')}
 {txt(188,786,65,'Gestern')}{f('t2-e3',254,782,561)}{txt(817,786,9,'.')}{txt(188,810,630,'(meine Freunde und ich/lange feiern)')}
 {txt(744,815,90,'_ / 11 Punkte','p88Points')}{check('t2',840,()=>group('t2-'))}
 {title('3',884,'Ergänzen Sie den Chat. Schreiben Sie.')}
 <div className="nabSide" style={{left:92,top:935}}>KOMMUNIKATION</div>
 {txt(176,918,280,'Kelubia:\n- lange schlafen, einkaufen,\n  15-17 Uhr: Tennis spielen','p88Notes')}{txt(459,918,340,'Neyla:\n- Vormittag: mit Anna Deutsch lernen,\n  Nachmittag: arbeiten','p88Notes')}
 <div className="p88ChatRule" style={{left:161,top:Y(983),width:664}}/>
 {txt(174,994,69,'NEYLA:','p88Name')}{txt(246,994,590,'Hallo Kelubia, wie geht’s? Was hast Du denn heute alles gemacht?')}
 {txt(174,1020,72,'Kelubia:')}{txt(246,1020,35,'Ach,')}{txt(280,1020,180,'ich habe lange geschlafen.','mExample')}{txt(465,1020,45,'Dann')}{f('t3-a',511,1016,278)}{txt(790,1020,9,'.')}{txt(805,1020,35,'(a)')}
 {txt(246,1046,34,'Von')}{f('t3-b',281,1042,508)}{txt(790,1046,9,'.')}{txt(805,1046,35,'(b)')}
 {txt(246,1072,112,'Und Du? Was')}{f('t3-c',359,1068,430)}{txt(790,1072,9,'?')}{txt(805,1072,35,'(c)')}
 {txt(174,1098,69,'NEYLA:','p88Name')}{txt(246,1098,157,'Am Vormittag habe ich')}{f('t3-d',407,1094,382)}{txt(790,1098,9,'.')}{txt(805,1098,35,'(d)')}
 {f('t3-e',246,1120,543)}{txt(790,1124,9,'.')}{txt(805,1124,35,'(e)')}
 {txt(246,1150,575,'Jetzt räume ich noch auf, dann gehe ich schlafen.')}
 {txt(174,1176,72,'Kelubia:')}{txt(246,1176,560,'Na, dann - Gute Nacht!')}
 <div className="p88ChatRule" style={{left:161,top:Y(1200),width:664}}/>
 {check('t3',1210,()=>group('t3-'))}{txt(750,1216,85,'_ / 5 Punkte','p88Points')}
 <div className="p88Score"><b>Wörter</b><b>Strukturen</b><b>Kommunikation</b>{[['0-3','0-5','0-2'],['4','6-8','3'],['5-6','9-11','4-5']].map((r,i)=>r.map((s,j)=><span key={i+'-'+j}><i style={{background:['#d71910','#edcf00','#3b9e24'][i]}}/>{s} Punkte</span>))}</div>
 {txt(520,1240,240,'www.hueber.de/menschen/lernen','mFooter')}
 {txt(112,1242,350,'Modul 4    88  |  achtundachtzig','mFooter')}
 </div></div>;
}
