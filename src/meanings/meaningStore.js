const initial={german:'',arabic:'',mode:'word',wordDisabled:true,sentenceDisabled:true,audioDisabled:true,pendingHidden:true,pending:''};
let snapshot=initial,actions={},listeners=new Set();
export const meaningStore={getSnapshot:()=>snapshot,subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn)},update(next){snapshot={...snapshot,...next};listeners.forEach(fn=>fn())},connect(next){actions=next;return()=>{actions={};snapshot=initial}},act(action){actions[action]?.()}};
