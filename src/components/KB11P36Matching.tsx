import {useEffect,useState} from 'react';
import {CheckButton} from './CheckButton';
const phrases=['Tschüs.','Brenner IT-Consulting.','Schmidt.','Christian Schmidt.','Guten Tag, hier ist Marlene Neumann.','Hallo, hier ist Marlene.','Auf Wiederhören.'];
const categories=['sich melden (Person A)','sich melden (Person B)','sich verabschieden'];
const answers=[2,0,0,0,1,1,2];
export function KB11P36Matching({values,onMatch,width:W,height:H}:{values:Record<string,string>;onMatch:(k:string,v:string)=>void;width:number;height:number}){
 const[active,setActive]=useState<number|null>(null),[checked,setChecked]=useState(false);
 useEffect(()=>{const reset=(e:Event)=>{if(String((e as CustomEvent).detail.page)==='36'){setChecked(false);setActive(null)}};document.addEventListener('menschen:reset-current-page',reset);return()=>document.removeEventListener('menschen:reset-current-page',reset)},[]);
 const xs=[153,203,253,303,353,403,453],rs=[590,665,740];
 const pos=(x:number,y:number,w:number,h:number)=>({left:x/W*100+'%',top:y/H*100+'%',width:w/W*100+'%',height:h/H*100+'%'});
 return <><div className="kb36Matching" data-matching="task9a">
 <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">{phrases.map((_,i)=>{const j=Number(values['task9a-'+i]);if(values['task9a-'+i]===undefined)return null;const y=309+i*2;return <path key={i} d={`M${xs[i]} 316 L${xs[i]} ${y} L${rs[j]} ${y} L${rs[j]} 316`} stroke={checked?(j===answers[i]?'#268250':'#bd3838'):'#42658a'} fill="none" strokeWidth="1"/>})}</svg>
 {phrases.map((t,i)=><button key={i} className={active===i?'active':''} style={pos(xs[i]-19,300,38,32)} aria-label={'task9a links '+i+' '+t} onClick={()=>setActive(i)}><span className="kb36Num">{i+1}</span><span className="kb36Dot"/></button>)}
 {categories.map((t,j)=><button key={j} style={pos(rs[j]-23,300,46,32)} aria-label={'task9a rechts '+j+' '+t} onClick={()=>{if(active!==null){onMatch('task9a-'+active,String(j));setActive(null)}}}><span className="kb36Num">{'ABC'[j]}</span><span className="kb36Dot"/></button>)}
 </div><div className="nkbCheck nkbCheckLm" style={{...pos(150,428,150,26),position:'absolute',zIndex:9}}><CheckButton onClick={()=>setChecked(true)}/><output>{checked?(answers.every((a,i)=>values['task9a-'+i]===String(a))?'✓ Richtig!':'Noch einmal'):''}</output></div></>;
}
