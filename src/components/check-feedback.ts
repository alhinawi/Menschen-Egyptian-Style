import successSound from '../assets/feedback/ok06_sparkle.mp3?url';
import errorSound from '../assets/feedback/err04_double.mp3?url';
import {scanData} from '../scan-data/registry';
import type {ScanField} from '../scan-data/schema';
// User-triggered grading feedback, shared by every compact check control.
let audio: AudioContext | undefined;
let stopEffect: (() => void) | undefined;
function readyAudio() {
 try {
  const Audio = window.AudioContext || (window as typeof window & {webkitAudioContext?: typeof AudioContext}).webkitAudioContext;
  if (!Audio) return;
  audio ??= new Audio();
  if (audio.state === 'suspended') void audio.resume().catch(() => {});
 } catch { /* Grading and visual feedback never depend on sound permission. */ }
}
const soundBytes = [errorSound,successSound].map(url=>fetch(url).then(response=>{
 if(!response.ok)throw new Error('Feedback sound unavailable');
 return response.arrayBuffer();
}).catch(()=>null));
const soundBuffers = new Map<boolean,Promise<AudioBuffer | null>>();
async function sound(correct: boolean) {
 if(document.querySelector<HTMLElement>('.soundToggle')?.dataset.soundOn==='false')return;
 try {
  const context=audio;
  if(!context)return;
  if(context.state==='suspended')await context.resume().catch(()=>{});
  if(context.state!=='running')return;
  let decoded=soundBuffers.get(correct);
  if(!decoded){
   decoded=soundBytes[correct?1:0].then(bytes=>bytes?context.decodeAudioData(bytes.slice(0)).catch(()=>null):null);
   soundBuffers.set(correct,decoded);
  }
  const buffer=await decoded;
  if(!buffer||context.state!=='running')return;
  const source=context.createBufferSource();source.buffer=buffer;
  source.connect(context.destination);source.onended=()=>source.disconnect();source.start();
 } catch { /* A muted or blocked device still gets normal exercise feedback. */ }
}
function fireworks() {
 stopEffect?.();
 const canvas = document.createElement('canvas');
 canvas.className = 'checkFireworks'; canvas.setAttribute('aria-hidden', 'true');
 Object.assign(canvas.style, {position:'fixed', inset:'0', width:'100%', height:'100%', pointerEvents:'none', zIndex:'2147483646'});
 document.body.append(canvas);
 const width = innerWidth, height = innerHeight, dpr = Math.min(devicePixelRatio || 1, 2);
 canvas.width = width * dpr; canvas.height = height * dpr;
 const ctx = canvas.getContext('2d');
 if (!ctx) { canvas.remove(); return; }
 ctx.scale(dpr, dpr);
 const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
 const colors = ['#ffb83e','#ff638d','#5bc9ed','#9a83ec','#59cda2'];
 const bursts = [{x:width*.28,y:height*.31,delay:0},{x:width*.73,y:height*.38,delay:260},{x:width*.5,y:height*.23,delay:520}];
 let frame = 0, timer = 0;
 const started = performance.now();
 const stop = () => { cancelAnimationFrame(frame); clearTimeout(timer); canvas.remove(); if(stopEffect===stop)stopEffect=undefined; };
 stopEffect=stop;
 const draw = (now:number) => {
  const elapsed = now-started; ctx.clearRect(0,0,width,height);
  for (const [b,burst] of bursts.entries()) {
   const t=(elapsed-burst.delay)/1000;
   if(t<0 || t>1.35)continue;
   const progress = reduced ? .38 : t;
   const alpha = Math.max(0,1-t/1.35);
   for(let i=0;i<(reduced?16:40);i++) {
    const angle=i*Math.PI*2/(reduced?16:40),speed=65+(i%5)*17;
    const x=burst.x+Math.cos(angle)*speed*progress,y=burst.y+Math.sin(angle)*speed*progress+(reduced?0:44*t*t);
    ctx.globalAlpha=alpha;ctx.strokeStyle=colors[(i+b)%colors.length];ctx.lineWidth=2.4;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-Math.cos(angle)*(reduced?3:7),y-Math.sin(angle)*(reduced?3:7));ctx.stroke();
   }
  }
  if(elapsed<1950)frame=requestAnimationFrame(draw);else stop();
 };
 frame=requestAnimationFrame(draw);timer=window.setTimeout(stop,2000);
}

// ---- Per-field marking after a check: wrong or unsolved = red, correct = green. ----
// Answer keys come only from the digitized page data (scan-data / native-data); fields without a key are never marked.
type KeyedPage={book:string;page:number;fields:ScanField[]};
const nativeFiles=import.meta.glob('../native-data/*/*.json',{eager:true,import:'default'}) as Record<string,KeyedPage>;
const normText=(x:string)=>x.normalize('NFC').toLocaleLowerCase('de').replace(/[„“”"’'‚‘]/g,'').trim().replace(/[.!?…]+$/,'').replace(/\s+/g,' ').trim();
const normSet=(x:string)=>x.split(/[\n;]+/).map(normText).filter(Boolean).sort().join('\n');
const pageSources=(page:string)=>[...Object.entries(scanData).filter(([k])=>k.endsWith(':'+page)).map(([,d])=>d as KeyedPage),...Object.values(nativeFiles).filter(d=>String(d.page)===page)];
const fieldEls=(root:ParentNode,id:string)=>[...root.querySelectorAll<HTMLElement>('[data-native-field]')].filter(e=>e.dataset.nativeField===id);
const registry=new WeakMap<HTMLButtonElement,Record<string,string>>();
export function registerCheckAnswers(button:HTMLButtonElement,answers?:Record<string,string>){if(answers)registry.set(button,answers);else registry.delete(button)}
interface Item{field:ScanField;els:HTMLElement[];radios?:HTMLInputElement[]}
const radioFieldEls=(root:ParentNode,f:ScanField)=>{const els=fieldEls(root,f.id);if(els.length||f.kind!=='radio')return els;const name=f.name||f.id;return [...root.querySelectorAll<HTMLInputElement>('input[type=radio]')].filter(r=>r.name.endsWith('-'+name)&&/(^|-)\d+$/.test(r.name.slice(0,-(name.length+1)))&&(r.dataset.value??r.dataset.val)===f.value)}
function keyedFields(button:HTMLButtonElement){
 const root=button.closest<HTMLElement>('.page')||document.body;
 const pageNo=root.dataset.page||button.closest<HTMLElement>('[data-native-page]')?.dataset.nativePage||'';
 const answers=registry.get(button);
 if(answers){
  // Page components that grade from an answers map hand the same map to the check button.
  const toggles=[...root.querySelectorAll<HTMLInputElement>('input[type=radio][data-value],input[type=checkbox][data-value]')];
  const items:Item[]=[];
  for(const [k,answer] of Object.entries(answers)){
   const els=fieldEls(root,k).filter(e=>!isToggle(e));
   const mine=toggles.filter(t=>t.name.endsWith('-'+k)&&/(^|-)\d+$/.test(t.name.slice(0,-(k.length+1))));
   if(!els.length&&!mine.length)continue;
   items.push({field:{id:k,answer,group:pageNo,kind:'text',label:k,x:0,y:0,w:0,h:0},els,radios:mine});
  }
  // A longer key owns a name it also ends with (for example "10a-susanne" over "susanne").
  for(const it of items)it.radios=it.radios?.filter(t=>!items.some(o=>o!==it&&o.field.id.length>it.field.id.length&&o.field.id.endsWith('-'+it.field.id)&&t.name.endsWith('-'+o.field.id)));
  return {root,pageNo,items};
 }
 const holder=button.closest<HTMLElement>('[data-native-task],[data-native-check]');
 const group=holder?.dataset.nativeTask||holder?.dataset.nativeCheck||'';
 let best:Item[]=[];
 for(const src of pageSources(pageNo)){
  const found=src.fields.filter(f=>f.answer!==undefined&&(!group||f.group===group)).map(field=>({field,els:radioFieldEls(root,field)})).filter(x=>x.els.length);
  if(found.length>best.length)best=found;
 }
 return {root,pageNo,items:best};
}
function isRight(f:ScanField,el:HTMLElement){
 const answer=f.answer!;
 if(el instanceof HTMLInputElement&&(el.type==='radio'||el.type==='checkbox'))return el.checked===(normText(answer)==='true');
 if(el instanceof HTMLSelectElement){const picked=[el.value,el.selectedOptions[0]?.textContent||''].map(normText);return answer.split('|').some(a=>picked.includes(normText(a)))}
 const value=(el as HTMLInputElement).value||'';
 if(f.unordered)return normSet(answer)===normSet(value);
 return answer.split('|').some(a=>normText(a)===normText(value));
}
function isToggle(el:HTMLElement){return el instanceof HTMLInputElement&&(el.type==='radio'||el.type==='checkbox')}
export function clearCheckMarks(root:ParentNode=document){root.querySelectorAll('[data-check-mark]').forEach(e=>e.removeAttribute('data-check-mark'))}
export function clearGroupMarks(button:HTMLButtonElement){for(const it of keyedFields(button).items)for(const el of [...it.els,...(it.radios||[])])el.removeAttribute('data-check-mark')}
export function markCheckFields(button:HTMLButtonElement,correct:boolean){
 const {pageNo,items}=keyedFields(button);
 if(!items.length)return 0;
 let marked=0;
 for(const it of items)for(const el of [...it.els,...(it.radios||[])])el.removeAttribute('data-check-mark');
 const set=(el:HTMLElement,ok:boolean)=>{el.setAttribute('data-check-mark',ok?'ok':'bad');marked++};
 const radioItems=items.filter(i=>i.field.kind==='radio'&&!i.radios?.length);
 const byName=new Map<string,Item[]>();
 for(const it of radioItems){const k=it.field.name||it.field.id;byName.set(k,[...(byName.get(k)||[]),it])}
 for(const group of byName.values()){
  const picked=group.find(it=>(it.els[0] as HTMLInputElement).checked);
  if(!picked)group.forEach(it=>it.els.forEach(el=>set(el,false)));
  else picked.els.forEach(el=>set(el,correct||normText(picked.field.answer!)==='true'));
 }
 for(const {field,els,radios} of items){
  if(field.kind==='radio'&&!radios?.length)continue;
  for(const el of els){
   const ok=correct||isRight(field,el);
   if(ok&&isToggle(el)&&!(el as HTMLInputElement).checked)continue;
   set(el,ok);
  }
  if(radios?.length){
   const answer=field.answer!;
   const alts=answer.split('|');
   const sorted=(pageNo==='64'&&field.id==='7a-2')||(pageNo==='67'&&field.id.startsWith('4a-'));
   const key=(x:string)=>normText(x).split(/\s*[,;]\s*/).sort().join('|');
   if(radios.every(r=>r.type==='checkbox')){
    // Single tick boxes: right when the box state matches the key ("true" = ticked).
    for(const r of radios){const ok=r.checked===(normText(answer)==='true');if(ok&&!r.checked)continue;set(r,correct||ok)}
   }else{
    const picked=radios.find(r=>r.checked);
    if(!picked)radios.forEach(r=>set(r,false));
    else{const v=picked.dataset.value||'';set(picked,correct||alts.some(a=>normText(a)===normText(v)||(sorted&&key(a)===key(v))))}
   }
  }
 }
 return marked;
}
if(typeof document!=='undefined'&&!(window as typeof window&{__checkMarkClear?:boolean}).__checkMarkClear){
 (window as typeof window&{__checkMarkClear?:boolean}).__checkMarkClear=true;
 const clear=(e:Event)=>{const t=e.target as HTMLElement|null;if(!t||!t.closest||!t.closest('.page'))return;t.removeAttribute('data-check-mark');if(t instanceof HTMLInputElement&&t.type==='radio'&&t.name)document.querySelectorAll<HTMLInputElement>('input[type=radio]').forEach(r=>{if(r.name===t.name)r.removeAttribute('data-check-mark')})};
 document.addEventListener('input',clear,true);document.addEventListener('change',clear,true);
}
const feedbackSelector='output,.feedback,[data-task-feedback],[role="status"]';
function feedbackScope(button:HTMLButtonElement) {
 let scope=button.parentElement;
 while(scope && !scope.classList.contains('page')) {
  if(scope.querySelector(feedbackSelector))return scope;
  scope=scope.parentElement;
 }
 return null;
}
export function syncCheckStatus(button:HTMLButtonElement): () => void {
 const scope=feedbackScope(button);if(!scope)return () => {};
 const update=()=>{
  scope.querySelectorAll<HTMLElement>(feedbackSelector).forEach(output=>{
   const text=output.textContent?.trim()||'';
   const wrong=/noch\s*(?:ein\s*mal|einmal|nicht)|versuchen\s+sie|try again/i.test(text);
   const correct=!wrong&&/(?:✓\s*)?richtig\s*!|all correct|alles richtig/i.test(text);
   if(wrong||correct)output.dataset.checkResult=correct?'success':'error';
   else delete output.dataset.checkResult;
  });
  if(!scope.querySelector('[data-check-result]'))clearGroupMarks(button);
 };
 update();const observer=new MutationObserver(update);
 observer.observe(scope,{childList:true,subtree:true,characterData:true});
 return()=>observer.disconnect();
}
export function beginCheckFeedback(button:HTMLButtonElement): () => void {
 // Called inside the click gesture, before the grading handler and React commit.
 readyAudio();
 const scope=feedbackScope(button);
 if(!scope)return () => {};
 let finished=false,frame=0,timer=0;
 const finish=()=>{finished=true;observer.disconnect();cancelAnimationFrame(frame);clearTimeout(timer)};
 const evaluate=()=>{
  if(finished||!button.isConnected)return;
  const text=[...scope.querySelectorAll(feedbackSelector)].map(x=>x.textContent||'').join(' ').trim();
  const wrong=/noch\s*(?:ein\s*mal|einmal|nicht)|versuchen\s+sie|try again/i.test(text);
  const correct=!wrong&&/(?:✓\s*)?richtig\s*!|all correct|alles richtig/i.test(text);
  if(!wrong&&!correct)return;
  finish();button.dataset.checkFeedback=correct?'success':'error';
  markCheckFields(button,correct);
  sound(correct);if(correct)fireworks();
  button.dispatchEvent(new CustomEvent('check-feedback',{bubbles:true,detail:{correct}}));
 };
 const observer=new MutationObserver(()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(evaluate)});
 observer.observe(scope,{childList:true,subtree:true,characterData:true});
 // Covers repeated checks where React leaves an identical result string in place.
 frame=requestAnimationFrame(()=>{frame=requestAnimationFrame(evaluate)});
 timer=window.setTimeout(finish,750);
 return finish;
}
