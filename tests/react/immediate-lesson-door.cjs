const fs=require('node:fs'),assert=require('node:assert/strict');
const app=fs.readFileSync('src/App.tsx','utf8'),trans=fs.readFileSync('src/readerTransitions.ts','utf8'),css=fs.readFileSync('src/reader-transitions.css','utf8');
assert(!app.includes('aria-label="Loading"'));assert(!app.includes('setSwitching'));assert(app.indexOf('await prepareDestination(slug,token)')<app.indexOf('await openLessonDoor(async'));
assert(trans.includes('work=Promise.resolve().then(update)'));assert(trans.includes('await work;'));assert(css.includes('rotateY(105deg)'));assert(css.includes('rotateY(-105deg)'));
console.log('PASS no spinner, cold destination prewarm/old page retained, one mirrored door');
