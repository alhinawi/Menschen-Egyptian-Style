import {useEffect,useRef} from 'react';
import type {ButtonHTMLAttributes} from 'react';
import './check-button.css';
export function CheckButton({className='',...props}:ButtonHTMLAttributes<HTMLButtonElement>){
 const ref=useRef<HTMLButtonElement>(null);
 useEffect(()=>{const el=ref.current;if(!el)return;let frame=0;
  const update=()=>{const r=el.getBoundingClientRect();if(!r.width)return;const scale=r.width/el.offsetWidth,size=Math.max(40,r.width),page=el.closest('.page')||document.body;
   const obstacles=[...page.querySelectorAll('input,select,textarea,button')].filter(e=>e!==el&&!e.hasAttribute('hidden')&&getComputedStyle(e).visibility!=='hidden').map(e=>e.getBoundingClientRect()).filter(r=>r.width&&r.height);
   const candidates=[[r.left,r.top],[r.right-size,r.top],[r.left,r.bottom-size],[r.right-size,r.bottom-size],[r.left+(r.width-size)/2,r.top+(r.height-size)/2]];
   const chosen=candidates.find(([x,y])=>obstacles.every(o=>x+size<=o.left||x>=o.right||y+size<=o.top||y>=o.bottom));
   const [x,y]=chosen||candidates[0];el.dataset.checkHitClear=String(!!chosen);el.style.setProperty('--check-hit-size',size/scale+'px');el.style.setProperty('--check-hit-left',(x-r.left)/scale+'px');el.style.setProperty('--check-hit-top',(y-r.top)/scale+'px');
  };const queue=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(update)};const ro=new ResizeObserver(queue);ro.observe(el);const page=el.closest('.page');if(page)ro.observe(page);window.addEventListener('resize',queue);const timer=setInterval(queue,300);queue();return()=>{cancelAnimationFrame(frame);clearInterval(timer);ro.disconnect();window.removeEventListener('resize',queue)};
 },[]);
 return <button {...props} ref={ref} className={'compactCheckButton '+className} aria-label="Prüfen" title="Prüfen">✓</button>;
}
