const ts=require('typescript'),fs=require('fs'),assert=require('assert');
const source=fs.readFileSync('src/auth/leaderboard-starters.ts','utf8').replace("import {presetSvg} from './avatar-presets';","const presetSvg = (i:number)=>'<svg/>';");
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,m={exports:{}};
new Function('exports','require','module',js)(m.exports,require,m);
const rows=m.exports.leaderboardRows;
for(let n=0;n<=12;n++){
 const top=Array.from({length:Math.min(n,10)},(_,i)=>({rank:i+1,name:'Real '+i,points:1000-i}));
 const shown=rows(top,{rank:1,points:1000});
 assert.equal(shown.length,10);
 assert.equal(shown.filter(x=>!x.name.startsWith('Real')).length,Math.max(0,10-n));
 assert.equal(shown.filter(x=>x.name.startsWith('Real')).length,Math.min(10,n));
 if(n)assert(shown[0].own);
 assert.equal(rows(top,null,undefined,false).length,top.length);
}
assert.equal(rows([],null).filter(r=>r.avatar.endsWith('.webp')).length,7);
assert.equal(rows([],null).filter(r=>r.avatar.startsWith('data:')).length,3);
const low=rows([{rank:1,name:'Real learner',points:1}],{rank:1,points:1});
assert(low.find(r=>r.name==='Real learner').own);
assert.equal(low.filter(r=>r.name==='Real learner').length,1);
console.log('PASS: 0-12 scorers, one-for-one replacement, own highlight and launch switch');
