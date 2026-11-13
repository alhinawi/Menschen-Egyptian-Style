// Size every answer cross from the circle's smaller dimension, not its wide hit box.
// The local CSS-pixel value scales with the book canvas at every reader zoom.
const seen=new WeakSet<HTMLInputElement>();
const resize=new ResizeObserver(entries=>{for(const {target} of entries){const el=target as HTMLInputElement;const w=el.offsetWidth,h=el.offsetHeight;
 // Some scan circles use a wide, padded hit rectangle. Its printed ring is
 // smaller than that rectangle's height; keep the cross inside that ring.
 const size=Math.min(w,h)*(w>h*1.25?.6:.7);if(size>0)el.style.setProperty('--answer-cross-size',size+'px')}});
const scan=()=>document.querySelectorAll<HTMLInputElement>('.page input[type=radio],.page input[type=checkbox]').forEach(el=>{if(!seen.has(el)){seen.add(el);resize.observe(el)}});
new MutationObserver(scan).observe(document.documentElement,{childList:true,subtree:true});
scan();
