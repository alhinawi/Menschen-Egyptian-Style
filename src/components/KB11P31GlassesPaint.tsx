import {useEffect,useRef} from 'react';
import type {CSSProperties,PointerEvent} from 'react';

// L5 task 4a: "Zeichnen Sie eine Brille in das Foto." The Frau Paulig photo
// art on p31 sits at (625,192) sized 143x179 in page coordinates (848x1200).
// Dark pen like a learner's drawing; strokes persist in the page state.
export function KB11P31GlassesPaint({value,onChange,pos}:{value:string;onChange:(id:string,val:string)=>void;pos:(x:number,y:number,w:number,h:number)=>CSSProperties}){
 const canvasRef=useRef<HTMLCanvasElement>(null);
 const drawing=useRef(false);
 useEffect(()=>{
  const c=canvasRef.current;if(!c)return;
  const ctx=c.getContext('2d');if(!ctx)return;
  ctx.clearRect(0,0,c.width,c.height);
  if(value){const im=new Image();im.onload=()=>ctx.drawImage(im,0,0);im.src=value;}
 },[value]);
 const point=(e:PointerEvent):[number,number]=>{const c=canvasRef.current!;const r=c.getBoundingClientRect();return [(e.clientX-r.left)*c.width/r.width,(e.clientY-r.top)*c.height/r.height]};
 const down=(e:PointerEvent)=>{e.preventDefault();e.stopPropagation();const c=canvasRef.current!;c.setPointerCapture(e.pointerId);const ctx=c.getContext('2d')!;drawing.current=true;ctx.strokeStyle='#20303f';ctx.lineCap='round';ctx.lineJoin='round';ctx.lineWidth=4.5;ctx.beginPath();ctx.moveTo(...point(e));};
 const move=(e:PointerEvent)=>{if(!drawing.current)return;e.preventDefault();const ctx=canvasRef.current!.getContext('2d')!;ctx.lineTo(...point(e));ctx.stroke();};
 const up=()=>{if(!drawing.current)return;drawing.current=false;onChange('glassesPaint',canvasRef.current!.toDataURL());};
 return <>
  <canvas ref={canvasRef} className="nkbPaint nkbPaintPen" aria-label="Brille in das Foto zeichnen" width={143} height={179} style={pos(625,192,143,179)} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}/>
  <div className="nkbPaintTools" style={pos(625,376,143,20)}>
   <button type="button" onClick={()=>{const c=canvasRef.current!;c.getContext('2d')!.clearRect(0,0,c.width,c.height);onChange('glassesPaint','');}}>Neu zeichnen ×</button>
  </div>
 </>;
}
