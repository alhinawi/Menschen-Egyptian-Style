const ts=require('typescript'),fs=require('fs'),assert=require('assert');
const source=fs.readFileSync('src/auth/leaderboard-starters.ts','utf8').replace("import {ANONYMOUS_AVATAR} from './anonymous-avatar';","const ANONYMOUS_AVATAR = 'data:anonymous';");
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

assert.equal(rows([{rank:1,name:'No photo',points:1000}],null)[0].avatar,'data:anonymous');
assert.equal(rows([{rank:1,name:'Photo',points:1000,avatar:'https://example.test/photo.webp'}],null)[0].avatar,'https://example.test/photo.webp');

const anonPositions=rows([],null).flatMap((r,i)=>r.avatar==='data:anonymous'?[i+1]:[]);assert.deepEqual(anonPositions,[1,6,9]);
assert(anonPositions.every((r,i)=>!i||r-anonPositions[i-1]>1));
const pinned=rows([{rank:1,name:'Mohamed Alhinawi',points:0,pinned:true,avatar:'owner-photo'}],{rank:1,points:0});
assert.equal(pinned[0].name,'Mohamed Alhinawi');assert.equal(pinned[0].points,0);assert.equal(pinned[0].avatar,'owner-photo');assert(pinned[0].own);
assert(rows([],null).every(r=>/^[A-Za-z ]+$/.test(r.name)));

for(let n=1;n<=10;n++){
 const zeroes=Array.from({length:n},(_,i)=>({rank:i+1,name:'New '+i,points:0}));
 const board=rows(zeroes,{rank:n,points:0});assert.equal(board.length,10);assert.equal(board.filter(r=>r.points===0).length,n);assert.equal(board[9].name,'New '+(n-1));assert(board[9].own);
}
const mixed=rows([{rank:1,name:'Owner',points:120,pinned:true},{rank:2,name:'Learner',points:10},{rank:3,name:'New',points:0}],{rank:3,points:0});assert.equal(mixed[0].name,'Owner');assert.equal(mixed[9].name,'New');assert(mixed[9].own);
console.log('PASS newcomers last at0, 10 rows, demos fade1:1 and disappear at10 real rows');

const ownerBoard=rows([{rank:1,name:'Owner',points:120,pinned:true,avatar:'owner-photo'}],null);
assert.equal(ownerBoard[1].name,'Maryam Adel');assert.equal(ownerBoard[1].avatar,'data:anonymous');assert.equal(ownerBoard[2].name,'Ahmed Hassan');assert(ownerBoard[2].avatar.endsWith('profile-1.webp'));
