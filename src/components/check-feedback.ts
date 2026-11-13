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
function sound(correct: boolean) {
 try {
  if (!audio || audio.state !== 'running') return;
  const context = audio, now = context.currentTime;
  const notes = correct ? [523.25, 659.25, 783.99, 1046.5] : [293.66, 246.94];
  notes.forEach((frequency, i) => {
   const oscillator = context.createOscillator(), gain = context.createGain();
   const start = now + i * (correct ? .085 : .105), duration = correct ? .22 : .16;
   oscillator.type = 'sine'; oscillator.frequency.value = frequency;
   gain.gain.setValueAtTime(0, start);
   gain.gain.linearRampToValueAtTime(.055, start + .012);
   gain.gain.exponentialRampToValueAtTime(.001, start + duration);
   oscillator.connect(gain); gain.connect(context.destination);
   oscillator.start(start); oscillator.stop(start + duration + .01);
   oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
  });
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
