import {createContext,createElement,useContext,useSyncExternalStore} from 'react';
export const ReaderContext=createContext(null);
export function createReaderStore(){
 let listeners=new Set(),snapshot={ready:false,zoom:'',page:'',previousDisabled:true,nextDisabled:false},handlers=new Map(),restore=[];
 function publish(){const next={ready:true,zoom:document.querySelector('#zoomValue')?.dataset.zoom||document.querySelector('#zoomValue')?.textContent||'',soundOn:document.querySelector('.soundToggle')?.dataset.soundOn!=='false',page:document.querySelector('#pageJump')?.value||'',previousDisabled:document.querySelector('#prev')?.disabled||false,nextDisabled:document.querySelector('#next')?.disabled||false};if(JSON.stringify(next)!==JSON.stringify(snapshot)){snapshot=next;listeners.forEach(fn=>fn())}}
 return {subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn)},getSnapshot:()=>snapshot,
  connect(){
   for(const el of document.querySelectorAll('#prev,#next,#plus,#minus,#fit,#pageJump,#lessonNav,.soundToggle')){
    const key=el.id||'soundToggle',type=el.tagName==='SELECT'?'onchange':'onclick';
    if(typeof el[type]==='function'){handlers.set(key,el[type]);restore.push([el,type,el[type]]);el[type]=null}
   }
   window.menschenBook?.on('flip',publish);const observer=new MutationObserver(publish);for(const el of document.querySelectorAll('#zoomValue,.soundToggle'))observer.observe(el,{attributes:true,attributeFilter:['data-zoom','data-sound-on']});publish();
   return()=>{observer.disconnect();restore.forEach(([el,type,fn])=>{el[type]=fn});handlers.clear();restore=[];listeners.clear()};
  },act(key,event){handlers.get(key)?.call(event.currentTarget,{target:event.currentTarget,currentTarget:event.currentTarget,preventDefault:()=>event.preventDefault()});publish()}
 };
}
export function ReaderControl({tag,attrs,children}){
 const store=useContext(ReaderContext),snapshot=useSyncExternalStore(store.subscribe,store.getSnapshot,store.getSnapshot);
 const key=attrs.id||'soundToggle',props={...attrs};
 if(tag==='select')props.onChange=e=>store.act(key,e);else props.onClick=e=>store.act(key,e);
 if(key==='prev'&&snapshot.ready)props.disabled=snapshot.previousDisabled;
 if(key==='next'&&snapshot.ready)props.disabled=snapshot.nextDisabled;
 if(key==='soundToggle'){props['aria-pressed']=snapshot.soundOn!==false;props['aria-label']=snapshot.soundOn!==false?'Turn sound off':'Turn sound on';props.title=props['aria-label'];return createElement(tag,props,createElement('svg',{viewBox:'0 0 24 24',width:22,height:22,'aria-hidden':true,fill:'none',stroke:'currentColor',strokeWidth:1.8,strokeLinecap:'round',strokeLinejoin:'round'},createElement('path',{d:'M11 5 6 9H3v6h3l5 4V5Z'}),createElement('path',{className:'soundWaves',d:'M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14'}),createElement('path',{className:'soundSlash',d:'M3 3l18 18'})))}
 return createElement(tag,props,...children);
}
export function ZoomValue({tag,attrs,children}){const store=useContext(ReaderContext),snapshot=useSyncExternalStore(store.subscribe,store.getSnapshot,store.getSnapshot);return createElement(tag,attrs,snapshot.ready?snapshot.zoom:children)}
