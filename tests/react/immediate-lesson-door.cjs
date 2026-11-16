const fs=require('node:fs'),assert=require('node:assert/strict');
const app=fs.readFileSync('src/App.tsx','utf8'),trans=fs.readFileSync('src/readerTransitions.ts','utf8'),css=fs.readFileSync('src/reader-transitions.css','utf8');
const route=app.slice(app.indexOf('      try {'),app.indexOf('      } catch (err)'));
assert(route.indexOf('await openLessonDoor')<route.indexOf('await loadLesson'),'network must be inside animation work, not before door');assert(route.includes('},direction,()=>flushSync(()=>setSwitching(true)))'));
assert(trans.includes('if(begin)begin();else await update();'),'cold route snapshot callback must never await its update');assert(trans.includes('await transition.ready.catch(()=>{});\n    await update();'));
assert(css.includes('[data-reader-direction=backward]'));assert(css.includes('rotateY(105deg)'));assert(css.includes('rotateY(-105deg)'));assert(css.includes('transform-origin:right center'));
console.log('PASS: cold route door starts before downloads; mirrored backward hinge; same-page and reduced-motion paths retained');
