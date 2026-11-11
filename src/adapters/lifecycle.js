// Timers scheduled by a service after its initial mount still belong to it.
export function serviceLifecycle(){
 const pending=new Set(),frames=new Set();let disposed=false;
 return {
  timeout(fn,ms,...args){if(disposed)return;const id=window.setTimeout(()=>{pending.delete(id);if(!disposed)fn(...args)},ms);pending.add(id);return id},
  frame(fn){if(disposed)return;const id=window.requestAnimationFrame(time=>{frames.delete(id);if(!disposed)fn(time)});frames.add(id);return id},
  dispose(){if(disposed)return;disposed=true;for(const id of pending)window.clearTimeout(id);pending.clear();for(const id of frames)window.cancelAnimationFrame(id);frames.clear()}
 };
}
