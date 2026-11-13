// Batch HTML-only tests no longer match the native routes. Keep compatibility
// coverage through current route loading, viewport safety and native grading.
const {spawnSync}=require('node:child_process');
for(const test of ['route-chunks','native-frame-height','native-kb12-circles']){
 console.log('NATIVE ROUTE REGRESSION',test);
 const r=spawnSync(process.execPath,['tests/react/'+test+'.cjs'],{stdio:'inherit'});
 if(r.status!==0)process.exit(r.status||1);
}
