import {serviceLifecycle} from './lifecycle';
import {flushSync} from 'react-dom';
import {scanStore} from '../scan/scanStore';
export default function mount(){
'use strict';
const lifecycle=serviceLifecycle(),setTimeout=lifecycle.timeout;
const $=s=>document.querySelector(s),data=window.AB1720_PAGES,stage=$('#pageStage'),spread=$('#spread'),viewport=$('#viewport'),storage='menschen-ab-a12-l17-20-v1';
let state={};try{state=JSON.parse(localStorage.getItem(storage)||'{}')}catch{};const save=()=>{try{localStorage.setItem(storage,JSON.stringify(state))}catch{}};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>{const t=String(s).normalize('NFC').toLocaleLowerCase('de').trim();if(/^[.!?]+$/.test(t))return t;return t.replace(/[.!?]+$/,'').replace(/[„“"']/g,'').replace(/\s*\/\s*/g,'/').replace(/\s+/g,' ')};
let pageIndex=0,scale=1,timer;

function notify(s){const n=$('#notice');n.textContent=s;n.hidden=false;clearTimeout(timer);timer=setTimeout(()=>n.hidden=true,3500)}

const pages=[...stage.children];
const flip=new St.PageFlip(stage,{width:900,height:1220,size:'fixed',usePortrait:true,autoSize:false,drawShadow:true,maxShadowOpacity:.08,flippingTime:360,mobileScrollSupport:true,useMouseEvents:false,clickEventForward:true,disableFlipByClick:true,showPageCorners:false});
function progress(){$('#progress').textContent=Object.entries(state).filter(([k,v])=>k.startsWith('done-')&&v).length+' ✓'}
function updatePage(i){pageIndex=i;const p=data[i];$('#pageJump').value=p.page;$('#prev').disabled=i===0;$('#next').disabled=i===pages.length-1;$('#practiceCount').textContent=p.exercises.length;$('#lessonNav').value=p.page<42?36:p.page<48?42:p.page<54?48:p.page<60?54:60;state.page=i;save();history.replaceState(null,'','#'+p.page);$('#audio').pause();$('.audioDock').hidden=true;progress()}
let initialPage=Math.max(0,Math.min(29,state.page||0));const hashPage=Number(location.hash.slice(1));if(hashPage>=36&&hashPage<=65)initialPage=hashPage-36;
flip.on('flip',e=>updatePage(e.data));flip.on('init',()=>updatePage(initialPage));flip.loadFromHTML(pages);flip.turnToPage(initialPage);updatePage(initialPage);
function setZoom(n){scale=Math.max(Math.min(1,innerWidth/900),Math.min(2,n));spread.style.zoom=scale;spread.style.margin=900*scale>innerWidth?'0':'auto';$('#zoomValue').dataset.zoom=Math.round(scale*100)+'%';document.body.dataset.bookZoomed=900*scale>viewport.clientWidth+2?'true':'false'}
function fit(){setZoom(Math.min(1,innerWidth/900))}fit();$('#fit').onclick=fit;$('#plus').onclick=()=>setZoom(scale+.2);$('#minus').onclick=()=>setZoom(scale-.2);let viewportWidth=innerWidth;window.addEventListener('resize',()=>{const previousWidth=viewportWidth;viewportWidth=innerWidth;if(Math.abs(viewportWidth-previousWidth)<2)return;const wasFit=Math.abs(scale-Math.min(1,previousWidth/900))<.015;if(wasFit)fit();else setZoom(scale)});
function turn(d,corner='top'){if(flip.getState()!=='read')return;if(d>0&&pageIndex===29||d<0&&pageIndex===0)return;const settings=flip.getSettings();settings.disableFlipByClick=false;if(d>0)flip.flipNext(corner);else flip.flipPrev(corner);settings.disableFlipByClick=true}
function jump(p){flip.turnToPage(Number(p)-36);scrollTo(0,0);viewport.scrollLeft=0}
$('#next').onclick=()=>turn(1);$('#prev').onclick=()=>turn(-1);$('#pageJump').onchange=e=>jump(e.target.value);$('#lessonNav').onchange=e=>jump(e.target.value);
window.addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||e.target.closest('input,select,textarea'))return;if(e.key==='ArrowRight')turn(1);if(e.key==='ArrowLeft')turn(-1)});
// Same held-page touch behavior as the approved book, scaled to this workbook's scan ratio.
let gesture=null,pinching=false,mouse=null;const zoomed=()=>900*scale>viewport.clientWidth+2;
function localPoint(t){const r=stage.getBoundingClientRect();return{x:(t.clientX-r.left)/scale,y:Math.max(2,Math.min(1218,(t.clientY-r.top)/scale))}}
function cancelHeld(){if(!gesture?.held)return;flip.userStop({x:0,y:0},true);flip.getFlipController().stopMove(false);gesture.held=false}
function startGesture(t){if(flip.getState()!=='read')return null;return{x:t.clientX,y:t.clientY,axis:null,held:false,dir:0}}
function moveGesture(t,e){if(!gesture||gesture.pinch)return;const g=gesture,dx=t.clientX-g.x,dy=t.clientY-g.y;if(!g.axis&&Math.max(Math.abs(dx),Math.abs(dy))>10)g.axis=Math.abs(dx)>Math.abs(dy)*1.4?'horizontal':'vertical';if(g.axis!=='horizontal'||zoomed())return;if(e.cancelable)e.preventDefault();if(!g.held){g.dir=dx<0?1:-1;if(g.dir>0&&pageIndex===29||g.dir<0&&pageIndex===0)return;const p=localPoint(t),seed={x:g.dir>0?899:1,y:p.y};if(!flip.getFlipController().start(seed))return;flip.startUserTouch(seed);g.held=true}flip.userMove(localPoint(t),true);const pos=flip.getFlipController().getCalculation()?.getPosition(),now=performance.now();if(pos){if(g.lastCalc){const dt=now-g.lastCalc.at;if(dt>0)g.velocity={x:(pos.x-g.lastCalc.x)/dt,y:(pos.y-g.lastCalc.y)/dt,at:now}}g.lastCalc={x:pos.x,y:pos.y,at:now}}}
function endGesture(t,cancel=false){if(!gesture)return;const g=gesture;gesture=null;if(g.pinch){setTimeout(()=>pinching=false,250);return}if(!g.held)return;const dx=t.clientX-g.x,progress=g.dir>0?-dx:dx,complete=!cancel&&progress>Math.max(55,viewport.clientWidth*.24);flip.userStop(localPoint(t),true);flip.getFlipController().stopMove(complete,g.velocity)}
viewport.addEventListener('touchstart',e=>{if(e.touches.length===2){cancelHeld();const[a,b]=e.touches;gesture={pinch:true,d:Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY),scale};pinching=true;return}if(e.touches.length!==1){gesture=null;return}gesture=startGesture(e.touches[0])},{passive:true,capture:true});
viewport.addEventListener('touchmove',e=>{if(!gesture)return;if(gesture.pinch&&e.touches.length===2){const[a,b]=e.touches;setZoom(gesture.scale*Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY)/gesture.d);if(e.cancelable)e.preventDefault();return}if(e.touches.length===1)moveGesture(e.touches[0],e)},{passive:false,capture:true});
viewport.addEventListener('touchend',e=>{if(e.changedTouches[0])endGesture(e.changedTouches[0])},{passive:true,capture:true});viewport.addEventListener('touchcancel',e=>endGesture(e.changedTouches[0]||{clientX:gesture?.x||0,clientY:gesture?.y||0},true),{passive:true,capture:true});
viewport.addEventListener('mousedown',e=>{if(e.button)return;if(zoomed()){mouse={pan:true,x:e.clientX,left:viewport.scrollLeft};e.preventDefault();return}gesture=startGesture(e);mouse={pan:false}});window.addEventListener('mousemove',e=>{if(!mouse)return;if(mouse.pan){viewport.scrollLeft=mouse.left+mouse.x-e.clientX;return}moveGesture(e,e)});window.addEventListener('mouseup',e=>{if(!mouse)return;if(!mouse.pan)endGesture(e);mouse=null});
function renderPractice(){flushSync(()=>scanStore.refresh(data[pageIndex]))}
scanStore.connect({getState:()=>state,update(values,clearKey){Object.assign(state,values);if(clearKey)delete state['done-'+clearKey];save();progress()}});
window.menschenBook=flip;window.menschenPages=pages;window.bookZoom=setZoom;window.bookPage=i=>flip.turnToPage(i);window.bookTurn=turn;window.ab1720={data,renderPractice,storage};
return()=>{lifecycle.dispose();clearTimeout(timer);scanStore.connect(null)};
}
