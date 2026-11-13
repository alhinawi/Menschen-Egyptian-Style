import {useEffect,useLayoutEffect,useRef,useState} from 'react';
import './line-matching.css';
type Props={id:string;left:string[];right:string[];values:Record<string,string>;onMatch:(key:string,value:string)=>void;leftX:number;rightX:number;leftWidth:number;rightWidth:number;ys:number[];rightYs?:number[];width?:number;height?:number;fontSize?:number;itemHeights?:number[];rightHeights?:number[];multiline?:boolean;lineHeight?:number;example?:[number,number];multiple?:boolean;dotR?:number};
/** Dots are the line endpoints. All connecting strokes stay inside the gap. */
export function LineMatching({id,left,right,values,onMatch,leftX,rightX:baseRightX,leftWidth,rightWidth:baseRightWidth,ys,rightYs=ys,width=1075,height=1521,fontSize=22,itemHeights=[],rightHeights=[],multiline=false,lineHeight=24,example,multiple=false,dotR=5.5}:Props){
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{const clear=(e:Event)=>{if(root.current?.closest<HTMLElement>('.page')?.dataset.page===String((e as CustomEvent).detail.page)){setActive(null);drag.current=null;setPointer(null)}};document.addEventListener('menschen:reset-current-page',clear);return()=>document.removeEventListener('menschen:reset-current-page',clear)},[]);
 const pair=(i:number,j:number)=>{if(!multiple){onMatch(id+'-'+i,String(j));return}const fixed=example?.[0]===i?example[1]:undefined;const current=(values[id+'-'+i]||'').split(',').filter(Boolean).map(Number);const next=j===fixed?current:current.includes(j)?current.filter(x=>x!==j):[...current,j];if(fixed!==undefined&&!next.includes(fixed))next.push(fixed);onMatch(id+'-'+i,[...new Set(next)].sort((a,b)=>a-b).join(','))};
 const rightX=baseRightX+40,rightWidth=baseRightWidth-40;
 const palette=['#1769e0','#009a45','#942bd1','#f07b00','#00a7b5','#8b8700'];const color=(i:number)=>palette[i%palette.length];
 const drag=useRef<{index:number;x:number;y:number;moved:boolean}|null>(null);const [pointer,setPointer]=useState<{x:number;y:number}|null>(null);
 const [active,setActive]=useState<number|null>(null);
 // The left dots must sit in the clear gap after the longest rendered left
 // item. Text width depends on the device font, so measure it instead of
 // trusting leftWidth: a fixed pixel guess puts the dots on top of the words
 // on devices with wider serif metrics.
 const itemRefs=useRef<(HTMLButtonElement|null)[]>([]);
 const [measuredStart,setMeasuredStart]=useState<number|null>(null);
 const end=rightX-9;
 useLayoutEffect(()=>{const measure=()=>{const el0=root.current;if(!el0)return;const box=el0.getBoundingClientRect();if(box.width<2)return;const scale=width/box.width;let maxText=0;for(const btn of itemRefs.current){if(!btn)continue;const rng=document.createRange();rng.selectNodeContents(btn);for(const r of Array.from(rng.getClientRects()))maxText=Math.max(maxText,(r.right-box.left)*scale);rng.detach()};if(maxText>0)setMeasuredStart(Math.min(Math.max(leftX+leftWidth+6,maxText+8),end-16))};measure();document.fonts?.ready.then(measure);const ro=new ResizeObserver(measure);if(root.current)ro.observe(root.current);return()=>ro.disconnect()},[leftX,leftWidth,width,end,left.length]);
 const start=measuredStart??leftX+leftWidth+6,mid=(start+end)/2;
 return <div ref={root} className="sharedMatching" data-matching={id}>
  {left.map((text,i)=><button key={'l'+i} ref={el=>{itemRefs.current[i]=el}} type="button" className={'sharedMatchItem'+(active===i?' selected':'')} style={{left:leftX/width*100+'%',top:ys[i]/height*100+'%',width:leftWidth/width*100+'%',height:(itemHeights[i]??24)/height*100+'%',whiteSpace:multiline?'pre-line':'nowrap',fontSize:fontSize/width*100+'cqw',lineHeight:lineHeight/width*100+'cqw',paddingRight:12/width*100+'cqw'}} aria-label={id+' links '+i+' '+text} aria-pressed={active===i} disabled={example?.[0]===i&&!multiple} onPointerDown={e=>{if(example?.[0]===i&&!multiple)return;e.currentTarget.setPointerCapture(e.pointerId);drag.current={index:i,x:e.clientX,y:e.clientY,moved:false};setActive(i)}} onPointerMove={e=>{const d=drag.current;if(!d)return;if(Math.hypot(e.clientX-d.x,e.clientY-d.y)>4)d.moved=true;const box=e.currentTarget.closest('.sharedMatching')!.getBoundingClientRect();if(d.moved)setPointer({x:(e.clientX-box.left)/box.width*width,y:(e.clientY-box.top)/box.height*height})}} onPointerUp={e=>{const d=drag.current;if(!d)return;if(d.moved){const target=document.elementFromPoint(e.clientX,e.clientY)?.closest<HTMLButtonElement>('[data-match-right]');if(target?.closest('.sharedMatching')===e.currentTarget.closest('.sharedMatching')){pair(d.index,Number(target.dataset.matchRight));setActive(null)}}drag.current=null;setPointer(null)}} onPointerCancel={()=>{drag.current=null;setPointer(null)}} onClick={()=>{if(active!==i)setActive(i)}}>{text}</button>)}
  {right.map((text,i)=><button key={'r'+i} type="button" className="sharedMatchItem" data-match-right={i} style={{left:rightX/width*100+'%',top:rightYs[i]/height*100+'%',width:rightWidth/width*100+'%',height:(rightHeights[i]??24)/height*100+'%',whiteSpace:multiline?'pre-line':'nowrap',fontSize:fontSize/width*100+'cqw',lineHeight:lineHeight/width*100+'cqw',paddingLeft:5/width*100+'cqw'}} aria-label={id+' rechts '+i+' '+text} onClick={()=>{if(active!==null){pair(active,i);setActive(null)}}}>{text}</button>)}
  <svg className="sharedMatchLines" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
   {left.flatMap((_,i)=>{const raw=values[id+'-'+i];const targets=raw===undefined?[]:(multiple?raw.split(',').filter(Boolean).map(Number):[Number(raw)]);if(example?.[0]===i&&!targets.includes(example[1]))targets.push(example[1]);return [...new Set(targets)].filter(j=>Number.isInteger(j)&&rightYs[j]!==undefined).map(j=>{const y=ys[i]+12,y2=rightYs[j]+12;return <path key={i+'-'+j} d={`M${start} ${y} C${mid} ${y},${mid} ${y2},${end} ${y2}`} stroke={color(i)} strokeWidth="3" fill="none"/>})})}
   {pointer&&active!==null&&<path d={`M${start} ${ys[active]+12} Q${(start+pointer.x)/2} ${ys[active]+12},${pointer.x} ${pointer.y}`} stroke={color(active)} strokeWidth="3" fill="none" strokeDasharray="5 4"/>}
   {left.map((_,i)=><circle key={'l'+i} cx={start} cy={ys[i]+12} r={dotR} fill={active===i?color(i):'#fff'} stroke={color(i)} strokeWidth="2"/>)}
   {right.map((_,i)=><circle key={'r'+i} cx={end} cy={rightYs[i]+12} r={dotR} fill="#fff" stroke="#245b9b" strokeWidth="2"/>)}
  </svg>
 </div>;
}
