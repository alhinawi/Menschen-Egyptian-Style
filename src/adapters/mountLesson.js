// Temporary boundary for proven exercise/page-fold code while individual
// engines move to React hooks. Every installed listener/timer is disposed.
export function mountLesson(initializers){
 const listeners=[],timeouts=[],intervals=[],disposers=[];let exercise=null,persistence=null;
 const originalAdd=EventTarget.prototype.addEventListener;
 const originalTimeout=window.setTimeout,originalInterval=window.setInterval;
 const before=new Set(document.body.children);
 EventTarget.prototype.addEventListener=function(type,listener,options){listeners.push([this,type,listener,options]);return originalAdd.call(this,type,listener,options)};
 window.setTimeout=(...args)=>{const id=originalTimeout(...args);timeouts.push(id);return id};
 window.setInterval=(...args)=>{const id=originalInterval(...args);intervals.push(id);return id};
 try{initializers.forEach(init=>{const result=init();if(result?.exercise)exercise=result.exercise;if(result?.persistence)persistence=result.persistence;if(typeof result==='function')disposers.push(result)})}
 finally{EventTarget.prototype.addEventListener=originalAdd;window.setTimeout=originalTimeout;window.setInterval=originalInterval}
 const dispose=()=>{
  disposers.reverse().forEach(fn=>fn());
  document.querySelectorAll('audio').forEach(a=>{a.pause();a.removeAttribute('src');a.load()});
  listeners.forEach(([target,type,fn,options])=>target.removeEventListener(type,fn,options));
  timeouts.forEach(clearTimeout);intervals.forEach(clearInterval);
  window.menschenBook?.destroy?.();
  [...document.body.children].filter(n=>!before.has(n)).forEach(n=>n.remove());
 };
 dispose.exercise=exercise;dispose.persistence=persistence;return dispose;
}
