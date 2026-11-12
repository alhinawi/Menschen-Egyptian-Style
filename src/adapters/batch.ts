import {serviceLifecycle} from './lifecycle';
export default function mount(){
const lifecycle=serviceLifecycle(),setTimeout=lifecycle.timeout;
const $=(s: string): any=>document.querySelector(s)!,stage=$('#pageStage'),spread=$('#spread'),viewport=$('#viewport');
let state: Record<string, any>={};try{state=JSON.parse(localStorage.getItem('menschen-book-kb-a11-2-3')||'{}')}catch{};const save=()=>{try{localStorage.setItem('menschen-book-kb-a11-2-3',JSON.stringify(state))}catch{}};
let audioContext: any,soundsOn=state.sounds!==false;function tone(correct: boolean){if(!soundsOn)return;try{audioContext||=new(window.AudioContext||window.webkitAudioContext)();audioContext.resume();const t=audioContext.currentTime;(correct?[659.25,880]:[293.66,261.63]).forEach((frequency,i)=>{const o=audioContext.createOscillator(),g=audioContext.createGain();o.type='sine';o.frequency.value=frequency;g.gain.setValueAtTime(0,t+i*.12);g.gain.linearRampToValueAtTime(.075,t+i*.12+.025);g.gain.exponentialRampToValueAtTime(.001,t+i*.12+.24);o.connect(g);g.connect(audioContext.destination);o.start(t+i*.12);o.stop(t+i*.12+.26)})}catch{}}
const toast=document.createElement('div');toast.className='answerToast';toast.hidden=true;toast.setAttribute('role','status');document.body.append(toast);let toastTimeout: number|undefined;function announce(ok: boolean){toast.hidden=false;toast.className='answerToast '+(ok?'good':'retry');toast.textContent=ok?'✓ Richtig! · إجابة صح':'Noch einmal versuchen. · جرّب تاني';clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>toast.hidden=true,4000)}
function mark(el: HTMLElement, ok: boolean){el.classList.toggle('answerCorrect',ok);el.classList.toggle('answerWrong',!ok)}function feedback(form: HTMLFormElement, ok: boolean){const p=form.querySelector<HTMLElement>('.feedback')!;p.className='feedback '+(ok?'good':'retry');p.textContent=ok?'✓ Richtig!':'Noch nicht ganz. Hören Sie noch einmal.';tone(ok);announce(ok);state['done-'+(form.dataset.key||form.id)]=ok;save();updateProgress();}

const normalizeAnswer=(s: string)=>s.normalize('NFC').toLocaleLowerCase('de').trim().replace(/[.!?]+$/,'').replace(/\s+/g,' ');

function updateProgress(){$('#progress').textContent=Object.entries(state).filter(([k,v])=>k.startsWith('done-')&&v).length+' ✓'}updateProgress();

const soundButton=$('.soundToggle');function soundText(){soundButton.dataset.soundOn=String(soundsOn)}soundText();soundButton.onclick=()=>{soundsOn=!soundsOn;state.sounds=soundsOn;save();soundText()};
function palette(n: string){document.body.dataset.palette=n;document.querySelectorAll<HTMLElement>('.paletteButton').forEach(b=>b.classList.toggle('selected',b.dataset.palette===n));state.palette=n;save()}palette(state.palette||'1');document.querySelectorAll<HTMLElement>('.paletteButton').forEach(b=>b.onclick=()=>palette(b.dataset.palette!));
const pages=[...document.querySelectorAll<HTMLElement>('.page')];pages.forEach(p=>{p.hidden=false;p.dataset.density='soft'});let pageIndex=0,scale=1;
const flip=new St.PageFlip(stage,{width:900,height:1515,size:'fixed',usePortrait:true,autoSize:false,drawShadow:true,maxShadowOpacity:.08,flippingTime:360,mobileScrollSupport:true,useMouseEvents:false,clickEventForward:true,disableFlipByClick:true,showPageCorners:false});
function updatePage(i: number){pageIndex=i;$('#pageJump').value=i;$('#prev').disabled=i===0;$('#next').disabled=i===pages.length-1;state.page=i;save();$('#originalLink').href='original-viewer.html?page='+pages[i].dataset.page;$('#lessonNav').value='l2-3.html#'+(i<4?13:i<8?17:21);$('#audio').pause();$('.audioDock').hidden=true;}
const initialPage=Math.max(0,Math.min(pages.length-1,(Number(location.hash.slice(1))>=13?Number(location.hash.slice(1))-13:state.page||0)));flip.on('flip',(e: any)=>updatePage(e.data));flip.on('init',()=>updatePage(initialPage));flip.loadFromHTML(pages);flip.turnToPage(initialPage);
function setZoom(n: number){scale=Math.max(Math.min(1,innerWidth/900),Math.min(2,n));spread.style.zoom=scale;spread.style.margin=900*scale>innerWidth?'0':'auto';$('#zoomValue').dataset.zoom=Math.round(scale*100)+'%';document.body.dataset.bookZoomed=900*scale>viewport.clientWidth+2?'true':'false';}function fit(){setZoom(Math.min(1,innerWidth/900))}fit();$('#fit').onclick=fit;$('#plus').onclick=()=>setZoom(scale+.2);$('#minus').onclick=()=>setZoom(scale-.2);let viewportWidth=innerWidth;window.addEventListener('resize',()=>{const previousWidth=viewportWidth;viewportWidth=innerWidth;if(Math.abs(viewportWidth-previousWidth)<2)return;const wasFit=Math.abs(scale-Math.min(1,previousWidth/900))<.015;if(wasFit)fit();else setZoom(scale)});
function turn(direction: number, corner='top'){if(flip.getState()!=='read')return;if(direction>0&&pageIndex===pages.length-1||direction<0&&pageIndex===0)return;const settings=flip.getSettings();settings.disableFlipByClick=false;paperSound();if(direction>0)flip.flipNext(corner);else flip.flipPrev(corner);settings.disableFlipByClick=true;}$('#next').onclick=()=>turn(1);$('#prev').onclick=()=>turn(-1);$('#pageJump').onchange=(e: any)=>{flip.turnToPage(Number(e.target.value));scrollTo(0,0);viewport.scrollLeft=0};

// The page-flip host defaults to pan-y. CSS switches it to pan-x pan-y when zoomed.
const isControl=(t: any)=>t.closest('input,select,textarea,button,a,audio,label:has(input),[contenteditable],canvas');
let gesture: any=null,pinching=false,mouse: any=null;
const zoomed=()=>900*scale>viewport.clientWidth+2;
// Unlock while the initial touch/tap is still a trusted activation. No audible output.
function unlockBookAudio(){if(!soundsOn)return;try{audioContext||=new(window.AudioContext||window.webkitAudioContext)();if(audioContext.state!=='running')audioContext.resume().catch(()=>{});const source=audioContext.createBufferSource();source.buffer=audioContext.createBuffer(1,1,audioContext.sampleRate);source.connect(audioContext.destination);source.start()}catch{}}
for(const event of ['touchstart','pointerdown','keydown'])document.addEventListener(event,unlockBookAudio,{capture:true,passive:true});
async function paperSound(){if(!soundsOn)return;try{audioContext||=new(window.AudioContext||window.webkitAudioContext)();await audioContext.resume();if(!soundsOn||audioContext.state!=='running')return;const duration=.3,t=audioContext.currentTime,b=audioContext.createBuffer(1,Math.ceil(audioContext.sampleRate*duration),audioContext.sampleRate),data=b.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;const src=audioContext.createBufferSource(),filter=audioContext.createBiquadFilter(),gain=audioContext.createGain();src.buffer=b;filter.type='bandpass';filter.frequency.value=1700;filter.Q.value=.48;gain.gain.setValueAtTime(.001,t);gain.gain.exponentialRampToValueAtTime(.16,t+.045);gain.gain.exponentialRampToValueAtTime(.001,t+duration);src.connect(filter);filter.connect(gain);gain.connect(audioContext.destination);src.start(t);src.stop(t+duration)}catch{}}
function localPoint(t: {clientX: number; clientY: number}){const r=stage.getBoundingClientRect();return {x:(t.clientX-r.left)/scale,y:Math.max(2,Math.min(1513,(t.clientY-r.top)/scale))}}
function cancelHeld(){if(!gesture?.held)return;flip.userStop({x:0,y:0},true);flip.getFlipController().stopMove(false);gesture.held=false;}
function startGesture(t: {clientX: number; clientY: number}){if(document.body.dataset.textSelection==='true')return null;if(flip.getState()!=='read')return null;return {x:t.clientX,y:t.clientY,axis:null,held:false,dir:0};}
function moveGesture(t: {clientX: number; clientY: number}, e: any){if(!gesture||gesture.pinch)return;const g=gesture,dx=t.clientX-g.x,dy=t.clientY-g.y;
 if(!g.axis&&Math.max(Math.abs(dx),Math.abs(dy))>10)g.axis=Math.abs(dx)>Math.abs(dy)*1.4?'horizontal':'vertical';
 if(g.axis!=='horizontal'||zoomed())return; // native scroll owns zoomed panning and vertical reading.
 if(e.cancelable)e.preventDefault();
 if(!g.held){g.dir=dx<0?1:-1;if(g.dir>0&&pageIndex===pages.length-1||g.dir<0&&pageIndex===0)return;const p=localPoint(t),seed={x:g.dir>0?899:1,y:p.y};if(!flip.getFlipController().start(seed))return;flip.startUserTouch({x:seed.x,y:seed.y});g.held=true;}
 flip.userMove(localPoint(t),true);const pos=flip.getFlipController().getCalculation()?.getPosition(),now=performance.now();if(pos){if(g.lastCalc){const dt=now-g.lastCalc.at;if(dt>0)g.velocity={x:(pos.x-g.lastCalc.x)/dt,y:(pos.y-g.lastCalc.y)/dt,at:now};}g.lastCalc={x:pos.x,y:pos.y,at:now};}
}
function endGesture(t: {clientX: number; clientY: number}, cancel=false){if(!gesture)return;const g=gesture;gesture=null;if(g.pinch){setTimeout(()=>pinching=false,250);return}if(!g.held)return;const dx=t.clientX-g.x,progress=g.dir>0?-dx:dx;const complete=!cancel&&progress>Math.max(55,viewport.clientWidth*.24);flip.userStop(localPoint(t),true);flip.getFlipController().stopMove(complete,g.velocity);suppressMeaningUntil=Date.now()+500;if(!cancel)paperSound();}
viewport.addEventListener('touchstart',(e: any)=>{if(e.touches.length===2){cancelHeld();const[a,b]=e.touches;gesture={pinch:true,d:Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY),scale};pinching=true;return}if(e.touches.length!==1||isControl(e.target)){gesture=null;return}gesture=startGesture(e.touches[0]);},{passive:true,capture:true});
viewport.addEventListener('touchmove',(e: any)=>{if(!gesture)return;if(gesture.pinch&&e.touches.length===2){const[a,b]=e.touches;setZoom(gesture.scale*Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY)/gesture.d);if(e.cancelable)e.preventDefault();return}if(e.touches.length!==1)return;moveGesture(e.touches[0],e);},{passive:false,capture:true});
viewport.addEventListener('touchend',(e: any)=>{if(e.changedTouches[0])endGesture(e.changedTouches[0]);},{passive:true,capture:true});
viewport.addEventListener('touchcancel',(e: any)=>{endGesture(e.changedTouches[0]||{clientX:gesture?.x||0,clientY:gesture?.y||0},true);},{passive:true,capture:true});
viewport.addEventListener('mousedown',(e: any)=>{if(e.button||isControl(e.target)||e.target.closest('.tapWord'))return;if(zoomed()){mouse={pan:true,x:e.clientX,left:viewport.scrollLeft};e.preventDefault();return}gesture=startGesture(e);mouse={pan:false}});
window.addEventListener('mousemove',(e: any)=>{if(!mouse)return;if(mouse.pan){viewport.scrollLeft=mouse.left+mouse.x-e.clientX;return}moveGesture(e,e)});
window.addEventListener('mouseup',(e: any)=>{if(!mouse)return;if(!mouse.pan)endGesture(e);mouse=null;});
for(const b of document.querySelectorAll<HTMLElement>('.listen'))b.onclick=()=>{const a=$('#audio');a.src='assets/kb-cd1-track'+b.dataset.track+'.mp3';$('.audioDock').hidden=false;a.play().catch(()=>{});};$('#closeAudio').onclick=()=>{$('#audio').pause();$('.audioDock').hidden=true;};
window.menschenBook=flip;window.menschenPages=pages;window.bookZoom=setZoom;window.bookPage=(i: number)=>flip.turnToPage(i);window.bookTurn=turn;window.bookSoundState=()=>audioContext?.state;
window.initMeanings();
// A completed swipe must not also open a word-meaning dialog.
let suppressMeaningUntil=0;viewport.addEventListener('touchend',()=>{if(pinching)suppressMeaningUntil=Date.now()+400},{capture:true});stage.addEventListener('click',(e: any)=>{if(Date.now()<suppressMeaningUntil)e.stopImmediatePropagation()},{capture:true});

$('#lessonNav').onchange=(e: any)=>{const target=e.target.value;if(target==='index.html'){location.href=target;return}const n=Number(target.split('#')[1]);flip.turnToPage(n-13);scrollTo(0,0);viewport.scrollLeft=0;history.replaceState(null,'','#'+n)};
// Mark the regions of the original Swiss map without changing the printed image.
const canvas=$('#swissPaint');if(canvas){const ctx=canvas.getContext('2d');let drawing=false,color='#e74b36';ctx.lineCap='round';ctx.lineJoin='round';ctx.lineWidth=14;
if(state.swissPaint){const im=new Image();im.onload=()=>ctx.drawImage(im,0,0);im.src=state.swissPaint;}
function point(e: PointerEvent){const r=canvas.getBoundingClientRect();return [(e.clientX-r.left)*canvas.width/r.width,(e.clientY-r.top)*canvas.height/r.height]}
canvas.onpointerdown=(e: any)=>{e.preventDefault();canvas.setPointerCapture(e.pointerId);drawing=true;ctx.strokeStyle=color;ctx.beginPath();ctx.moveTo(...point(e));};canvas.onpointermove=(e: any)=>{if(!drawing)return;e.preventDefault();ctx.lineTo(...point(e));ctx.stroke()};const stop=()=>{if(!drawing)return;drawing=false;state.swissPaint=canvas.toDataURL();save()};canvas.onpointerup=stop;canvas.onpointercancel=stop;
document.querySelectorAll<HTMLElement>('[data-color]').forEach(b=>b.onclick=()=>{color=b.dataset.color!;document.querySelectorAll<HTMLElement>('[data-color]').forEach(x=>x.style.outline=x===b?'2px solid '+color:'none')});$('#clearMap').onclick=()=>{ctx.clearRect(0,0,canvas.width,canvas.height);delete state.swissPaint;save()};

}

// The verb exercise keeps its marking task, with a separate meaning mode for its text.
const verbText=document.querySelector<HTMLElement>('.verbText');if(verbText){let group=document.createElement('span');group.className='verbSentence';
for(const node of [...verbText.childNodes]){group.append(node);if(node.nodeType===Node.TEXT_NODE&&/[.!?]/.test(node.textContent!)){group.dataset.phrase=group.textContent.trim();verbText.append(group);group=document.createElement('span');group.className='verbSentence';}}
if(group.childNodes.length){group.dataset.phrase=group.textContent.trim();verbText.append(group)}
verbText.addEventListener('click',(e: any)=>{if(document.body.dataset.textSelection==='true')return;if(document.body.dataset.translationMode!=='sentence')return;const sentence=e.target.closest('.verbSentence');if(!sentence)return;e.stopImmediatePropagation();e.preventDefault();window.openBookMeaning(e.target.closest('.verbWord')?.textContent,sentence.dataset.phrase,'sentence')},{capture:true});
}
// The screenplay can be marked without confusing a mark with a translation tap.
const screenplay=document.querySelector<HTMLElement>('.screenplay');screenplay?.addEventListener('click',(e: any)=>{if(document.body.dataset.scriptMarking!=='true'||e.target.tagName==='BUTTON')return;const word=e.target.closest('.tapWord');if(word){e.stopImmediatePropagation();e.preventDefault();word.classList.toggle('selectedVerb')}},{capture:true});

return {dispose(){lifecycle.dispose();clearTimeout(toastTimeout);audioContext?.close?.().catch(()=>{})},persistence:{getState:()=>state,update(values: Record<string, unknown>){Object.assign(state,values);save()}},exercise:{options:{rejectBlank:false,verbState:state,saveVerbSelection(i: string,value: string){state['verb-'+i]=value;save()},beforeVerbToggle(b: HTMLElement){if(document.body.dataset.textSelection==='true')return true;if(document.body.dataset.verbExplanation==='true'){window.openBookMeaning(b.textContent,(b.closest('.verbSentence') as HTMLElement).dataset.phrase,'word');return true}return false}},commitResult(form: any, ok: boolean){tone(ok);announce(ok);state['done-'+(form.dataset.key||form.id)]=ok;save();updateProgress()}}};

}
