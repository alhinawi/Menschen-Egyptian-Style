import {useEffect,useRef,useState} from 'react';
import type {CSSProperties,PointerEvent} from 'react';

// Printed legend colors of exercise 9a ("Markieren Sie die Gebiete farbig").
const COLORS:[string,string][]=[['#e74b36','Deutsch'],['#15a7d5','Französisch'],['#8ebc24','Italienisch'],['#e99516','Rätoromanisch']];
// The Switzerland map art on p20 sits at (760,141) sized 277x184 in page coordinates (1072x1516).
export function KB11P20MapPaint({value,onChange,pos}:{value:string;onChange:(id:string,val:string)=>void;pos:(x:number,y:number,w:number,h:number)=>CSSProperties}){
 const canvasRef=useRef<HTMLCanvasElement>(null);
 const drawing=useRef(false);
 const [color,setColor]=useState(COLORS[0][0]);
 useEffect(()=>{
  const c=canvasRef.current;if(!c)return;
  const ctx=c.getContext('2d');if(!ctx)return;
  ctx.clearRect(0,0,c.width,c.height);
  if(value){const im=new Image();im.onload=()=>ctx.drawImage(im,0,0);im.src=value;}
 },[value]);
 const point=(e:PointerEvent):[number,number]=>{const c=canvasRef.current!;const r=c.getBoundingClientRect();return [(e.clientX-r.left)*c.width/r.width,(e.clientY-r.top)*c.height/r.height]};
 const down=(e:PointerEvent)=>{e.preventDefault();e.stopPropagation();const c=canvasRef.current!;c.setPointerCapture(e.pointerId);const ctx=c.getContext('2d')!;drawing.current=true;ctx.strokeStyle=color;ctx.lineCap='round';ctx.lineJoin='round';ctx.lineWidth=13;ctx.beginPath();ctx.moveTo(...point(e));};
 const move=(e:PointerEvent)=>{if(!drawing.current)return;e.preventDefault();const ctx=canvasRef.current!.getContext('2d')!;ctx.lineTo(...point(e));ctx.stroke();};
 const up=()=>{if(!drawing.current)return;drawing.current=false;onChange('mapPaint',canvasRef.current!.toDataURL());};
 return <>
  <div className="nkbPaintTools" style={pos(123,336,480,24)}>
   {COLORS.map(([c,label])=><button key={c} type="button" data-color={c} style={{outline:color===c?'2px solid '+c:'none'}} onClick={()=>setColor(c)}>{label}</button>)}
   <button type="button" onClick={()=>{const c=canvasRef.current!;c.getContext('2d')!.clearRect(0,0,c.width,c.height);onChange('mapPaint','');}}>Löschen</button>
  </div>
  <canvas ref={canvasRef} className="nkbPaint" aria-label="Karte farbig markieren" width={277} height={184} style={pos(760,141,277,184)} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}/>
 </>;
}
