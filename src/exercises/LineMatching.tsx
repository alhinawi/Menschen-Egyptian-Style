import {useRef,useState} from 'react';
import './line-matching.css';
type Props={id:string;left:string[];right:string[];values:Record<string,string>;onMatch:(key:string,value:string)=>void;leftX:number;rightX:number;leftWidth:number;rightWidth:number;ys:number[];rightYs?:number[];width?:number;height?:number;fontSize?:number;example?:[number,number]};
/** Dots are the line endpoints. All connecting strokes stay inside the gap. */
export function LineMatching({id,left,right,values,onMatch,leftX,rightX:baseRightX,leftWidth,rightWidth:baseRightWidth,ys,rightYs=ys,width=1075,height=1521,fontSize=22,example}:Props){
 const rightX=baseRightX+40,rightWidth=baseRightWidth-40;
 const palette=['#1769e0','#009a45','#942bd1','#f07b00','#00a7b5','#8b8700'];const color=(i:number)=>palette[i%palette.length];
 const drag=useRef<{index:number;x:number;y:number;moved:boolean}|null>(null);const [pointer,setPointer]=useState<{x:number;y:number}|null>(null);
 const [active,setActive]=useState<number|null>(null);const start=leftX+leftWidth+6,end=rightX-9,mid=(start+end)/2;
 return <div className="sharedMatching" data-matching={id}>
  {left.map((text,i)=><button key={'l'+i} type="button" className={'sharedMatchItem'+(active===i?' selected':'')} style={{left:leftX/width*100+'%',top:ys[i]/height*100+'%',width:leftWidth/width*100+'%',height:24/height*100+'%',fontSize:fontSize/width*100+'cqw',lineHeight:24/width*100+'cqw',paddingRight:12/width*100+'cqw'}} aria-label={id+' links '+i+' '+text} aria-pressed={active===i} disabled={example?.[0]===i} onPointerDown={e=>{if(example?.[0]===i)return;e.currentTarget.setPointerCapture(e.pointerId);drag.current={index:i,x:e.clientX,y:e.clientY,moved:false};setActive(i)}} onPointerMove={e=>{const d=drag.current;if(!d)return;if(Math.hypot(e.clientX-d.x,e.clientY-d.y)>4)d.moved=true;const box=e.currentTarget.closest('.sharedMatching')!.getBoundingClientRect();if(d.moved)setPointer({x:(e.clientX-box.left)/box.width*width,y:(e.clientY-box.top)/box.height*height})}} onPointerUp={e=>{const d=drag.current;if(!d)return;if(d.moved){const target=document.elementFromPoint(e.clientX,e.clientY)?.closest<HTMLButtonElement>('[data-match-right]');if(target?.closest('.sharedMatching')===e.currentTarget.closest('.sharedMatching')){onMatch(id+'-'+d.index,target.dataset.matchRight!);setActive(null)}}drag.current=null;setPointer(null)}} onPointerCancel={()=>{drag.current=null;setPointer(null)}} onClick={()=>{if(active!==i)setActive(i)}}>{text}</button>)}
  {right.map((text,i)=><button key={'r'+i} type="button" className="sharedMatchItem" data-match-right={i} style={{left:rightX/width*100+'%',top:rightYs[i]/height*100+'%',width:rightWidth/width*100+'%',height:24/height*100+'%',fontSize:fontSize/width*100+'cqw',lineHeight:24/width*100+'cqw',paddingLeft:5/width*100+'cqw'}} aria-label={id+' rechts '+i+' '+text} onClick={()=>{if(active!==null){onMatch(id+'-'+active,String(i));setActive(null)}}}>{text}</button>)}
  <svg className="sharedMatchLines" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
   {left.map((_,i)=>{const raw=example?.[0]===i?example[1]:values[id+'-'+i];if(raw===undefined||!Number.isInteger(Number(raw))||rightYs[Number(raw)]===undefined)return null;const y=ys[i]+12,y2=rightYs[Number(raw)]+12;return <path key={i} d={`M${start} ${y} C${mid} ${y},${mid} ${y2},${end} ${y2}`} stroke={color(i)} strokeWidth="3" fill="none"/>})}
   {pointer&&active!==null&&<path d={`M${start} ${ys[active]+12} Q${(start+pointer.x)/2} ${ys[active]+12},${pointer.x} ${pointer.y}`} stroke={color(active)} strokeWidth="3" fill="none" strokeDasharray="5 4"/>}
   {left.map((_,i)=><circle key={'l'+i} cx={start} cy={ys[i]+12} r="5.5" fill={active===i?color(i):'#fff'} stroke={color(i)} strokeWidth="2"/>)}
   {right.map((_,i)=><circle key={'r'+i} cx={end} cy={rightYs[i]+12} r="5.5" fill="#fff" stroke="#245b9b" strokeWidth="2"/>)}
  </svg>
 </div>;
}
