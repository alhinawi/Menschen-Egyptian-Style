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
 const title=(n:string,x:number,y:number,w:number,t:string)=><div className="naTitle" style={{left:x,top:y,width:w}}><b>{n}</b><Words text={t}/></div>;
 const hand=(x:number,y:number,w:number,t:string)=><div className="naText naHand" style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const audio=(src:string,x:number,y:number,label:string)=><button className="naAudio" style={{left:x,top:y}} aria-label={'Originalaudio '+label+' abspielen'} onClick={()=>{if(player.current){player.current.src=src;player.current.play().catch(()=>{})}}}>▶ {label}</button>;

 return <div className="nativeAB12" ref={root} data-native-ab12={page}><div className="naCanvas" style={{width:W,height:H,transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='59'&&<>
  {art('lesson-tab',980,32,86,88)}
  {text(112,86,290,'LERNWORTSCHATZ','naHeadline')}
  <div className="naHeadRule" style={{left:400,top:100,width:360}}/>
  {title('1',107,158,700,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.')}
  <div className="naSide" style={{left:78,top:300}}>WORTER</div>
  {text(152,200,160,'Aussehen','naBold')}
  {([['Bart der, ¨e',231],['Haar das, -e',256],['blond',293],['dick',319],['dünn',345],['glatt',371],['grau',402],['hübsch',422],['schlank',448]] as [string,number][]).map(([t,y],i)=>
   <div key={i}>{text(154,y+2,170,t)}{field('59-1-a'+i,326,y+22,192,t+' übersetzen')}</div>)}
  {text(154,500,160,'Charakter','naBold')}
  {([['freundlich/',526],['unfreundlich',552],['fröhlich',577],['glücklich/',603],['unglücklich',629],['komisch',655],['seltsam',681],['sympathisch/',706],['unsympathisch',732],['traurig',759]] as [string,number][]).map(([t,y],i)=>
   <div key={i}>{text(155,y+2,180,t)}{[1,2,4,5,6,8,9].includes(i)&&field('59-1-c'+i,326,y+22,192,t.replace('/','')+' übersetzen')}</div>)}
  {text(539,200,300,'Weitere wichtige Wörter','naBold')}
  {([['Bäckerei die,',229,534],['-en',260,549],['Hausfrau die,',280,534],['-en',312,549],['beschweren (sich),',345,533],['hat sich',371,545],['beschwert',396,544],['erkennen, hat',422,534],['erkannt',448,545],['geboren sein,',474,533],['ist geboren',500,545],['vergessen,',531,533],['du vergisst,',551,545],['er vergisst,',578,545],['hat vergessen',603,545],['gleich',641,534],['laut',667,534],['ledig',693,534]] as [string,number,number][]).map(([t,y,x],i)=>
   <div key={i}>{text(x,y+2,240,t)}</div>)}
  {[260,312,396,448,500,603,641,667,693].map((y,i)=>field('59-1-w'+i,686,+y+22,198,'Übersetzung '+(i+1)))}
  {art('strip',912,120,160,1240)}
  {art('tipprule',230,810,236,20)}
  {art('tipp',198,826,68,48)}
  {text(267,837,220,'Machen Sie Wortbilder.','naSmall')}
  {art('handwriting',470,748,320,130)}
  {title('2',107,916,700,'Welche Wörter möchten Sie noch lernen? Notieren Sie.')}
  {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i=>field('59-2-'+i,155,985+i*30,600,'Notizzeile '+(i+1)))}
  {text(811,1386,160,'neunundfünfzig  |  59','naFooter')}
  {art('modul-tab',1008,1384,64,30)}
 </>}
 </div><audio ref={player} className="naPlayer"/></div>;
}
