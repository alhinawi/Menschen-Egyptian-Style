// Keeps each check control (button + result label) off printed content.
// Printed content = the page's images (ink pixels) plus tappable words, fields and other controls.
type Rect={left:number;top:number;right:number;bottom:number};
const RESERVED_LABEL=96; // CSS px reserved right of the button for "Noch einmal"
const STACK_LABEL=26; // CSS px reserved below the button when the label stacks (data-check-layout="stack")
const STEP=6,RADIUS=260,INK_LIMIT=0.015,SCALE=0.5;
function rectOf(e:Element):Rect{const r=e.getBoundingClientRect();return {left:r.left,top:r.top,right:r.right,bottom:r.bottom}}
function hit(a:Rect,b:Rect){return a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top}
function inkGrid(page:HTMLElement,pr:Rect,skip:Element){
 const w=Math.max(1,Math.ceil((pr.right-pr.left)*SCALE)),h=Math.max(1,Math.ceil((pr.bottom-pr.top)*SCALE));
 const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
 const ctx=canvas.getContext('2d',{willReadFrequently:true});if(!ctx)return null;
 ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h);
 for(const img of page.querySelectorAll('img')){
  if(skip.contains(img)||!img.complete||!img.naturalWidth)continue;
  const r=img.getBoundingClientRect();if(r.width<1||r.height<1)continue;
  try{ctx.drawImage(img,(r.left-pr.left)*SCALE,(r.top-pr.top)*SCALE,r.width*SCALE,r.height*SCALE)}catch{return null}
 }
 let data:Uint8ClampedArray;try{data=ctx.getImageData(0,0,w,h).data}catch{return null}
 const sum=new Uint32Array((w+1)*(h+1));
 for(let y=0;y<h;y++){let row=0;for(let x=0;x<w;x++){const i=(y*w+x)*4,r=data[i],g=data[i+1],b=data[i+2];
  const lum=.3*r+.59*g+.11*b,spread=Math.max(r,g,b)-Math.min(r,g,b);
  row+=(lum<205||spread>45)?1:0;sum[(y+1)*(w+1)+x+1]=sum[y*(w+1)+x+1]+row}}
 return (x0:number,y0:number,x1:number,y1:number)=>{
  const a=Math.max(0,Math.floor((x0-pr.left)*SCALE)),b=Math.max(0,Math.floor((y0-pr.top)*SCALE)),c=Math.min(w,Math.ceil((x1-pr.left)*SCALE)),d=Math.min(h,Math.ceil((y1-pr.top)*SCALE));
  if(c<=a||d<=b)return 0;
  const n=sum[d*(w+1)+c]-sum[b*(w+1)+c]-sum[d*(w+1)+a]+sum[b*(w+1)+a];return n/((c-a)*(d-b));
 };
}
export function placeCheck(button:HTMLButtonElement){
 const box=button.parentElement as HTMLElement|null,page=button.closest<HTMLElement>('.page');
 if(!box||!page||getComputedStyle(box).position!=='absolute')return;
 const bt0=button.getBoundingClientRect();if(!bt0.width)return;
 box.style.translate='';
 const bt=rectOf(button),pr=rectOf(page),scale=bt.right-bt.left>0?(bt.right-bt.left)/(button.offsetWidth||1):1;
 const boxR=rectOf(box);
 const stacked=box.dataset.checkLayout==='stack';
 const w=Math.max(boxR.right-boxR.left,bt.right-bt.left+(stacked?0:RESERVED_LABEL*scale)),h=Math.max(boxR.bottom-boxR.top,bt.bottom-bt.top+(stacked?STACK_LABEL*scale:0));
 const ink=inkGrid(page,pr,box);
 const obstacles:Rect[]=[];
 for(const e of page.querySelectorAll('.tapWord,.nativeWord,input,select,textarea,button,output,[data-native-field]')){
  if(box.contains(e)||e.hasAttribute('hidden'))continue;
  if(e instanceof HTMLButtonElement&&e.classList.contains('compactCheckButton')){const r=rectOf(e);obstacles.push({left:r.left,top:r.top,right:r.left+(r.right-r.left)+RESERVED_LABEL*scale,bottom:r.bottom});continue}
  const r=rectOf(e);if(r.right-r.left>0&&r.bottom-r.top>0)obstacles.push(r);
 }
 const free=(dx:number,dy:number)=>{
  const x=boxR.left+dx,y=boxR.top+dy,r={left:x,top:y,right:x+w,bottom:y+h};
  if(r.left<pr.left+2||r.right>pr.right-2||r.top<pr.top+2||r.bottom>pr.bottom-2)return false;
  if(obstacles.some(o=>hit(r,o)))return false;
  return !ink||ink(r.left,r.top,r.right,r.bottom)<INK_LIMIT;
 };
 let best:[number,number]|null=free(0,0)?[0,0]:null;
 if(!best){
  const cand:[number,number,number][]=[];
  for(let dy=-RADIUS;dy<=RADIUS;dy+=STEP)for(let dx=-RADIUS;dx<=RADIUS;dx+=STEP)cand.push([dx,dy,Math.hypot(dx,dy*1.25)]);
  cand.sort((a,b)=>a[2]-b[2]);
  for(const [dx,dy] of cand)if(free(dx,dy)){best=[dx,dy];break}
 }
 box.dataset.checkPlaced=best?(best[0]||best[1]?'moved':'clear'):'blocked';
 if(best&&(best[0]||best[1]))box.style.translate=`${best[0]/scale}px ${best[1]/scale}px`;
}
export function watchCheckPlacement(button:HTMLButtonElement){
 let timer=0;
 const run=()=>{try{placeCheck(button)}catch{/* placement is cosmetic */}};
 const queue=()=>{clearTimeout(timer);timer=window.setTimeout(run,160)};
 const page=button.closest('.page');
 const ro=new ResizeObserver(queue);if(page)ro.observe(page);
 window.addEventListener('resize',queue);
 page?.addEventListener('load',queue,true);
 const first=[250,900,2200].map(ms=>window.setTimeout(run,ms));
 return()=>{clearTimeout(timer);first.forEach(clearTimeout);ro.disconnect();window.removeEventListener('resize',queue);page?.removeEventListener('load',queue,true)};
}
