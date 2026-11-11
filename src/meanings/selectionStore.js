let snapshot={mode:'word',selecting:false,actionHidden:true,actionLabel:'ترجم التحديد واسمعه'},actions={},listeners=new Set();
export const selectionStore={getSnapshot:()=>snapshot,subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn)},update(next){snapshot={...snapshot,...next};listeners.forEach(fn=>fn())},connect(next){actions=next;return()=>{actions={}}},act(name){actions[name]?.()}};
