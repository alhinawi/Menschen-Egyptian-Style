const ts=require('typescript'),fs=require('fs'),assert=require('assert');
const js=ts.transpileModule(fs.readFileSync('backend/src/leaderboard.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,m={exports:{}};
new Function('exports','require','module',js)(m.exports,require,m);
const build=m.exports.buildLeaderboard;
const account=(id,email,points,verified=1)=>({id,email,name:id===1?'Mohamed Alhinawi':'Test Learner',email_verified:verified,avatar:'photo-'+id,data:JSON.stringify(Object.fromEntries(Array.from({length:points},(_,i)=>['done-'+i,true])))});
const rows=[account(1,'alhinaawi@gmail.com',0),account(2,'3asfuur@gmail.com',3),account(3,'other@example.test',200),account(4,'another@example.test',100)];
const before=JSON.stringify(rows);
for(const viewer of [null,1,2,3]){const b=build(rows,viewer);assert.equal(b.top[0].pinned,true);assert.equal(b.top.filter(x=>x.pinned).length,1);assert.equal(b.top[0].avatar,viewer===2?'photo-2':'photo-1');assert.equal(b.top[1].points,200);assert.equal(b.top[2].points,100);assert(!JSON.stringify(b).includes('@'));if(viewer===1||viewer===2)assert.equal(b.me.rank,1)}
assert.equal(JSON.stringify(rows),before);
assert.equal(build([account(1,'alhinaawi@gmail.com',0,0),account(3,'other@example.test',200)],1).top[0].pinned,false);
assert.equal(build([account(1,'alhinaawi@gmail.com.evil.test',200)],1).top[0].pinned,false);
assert.equal(build([account(1,'ALHINAAWI@GMAIL.COM',0)],1).top[0].pinned,true);
assert.equal(build([account(2,'3asfuur@gmail.com',0)],null).top[0].pinned,true);
assert.equal(build([],null).top.length,0);
console.log('PASS server exact verified owner allowlist, single row, viewer selection, avatar, privacy, zero points and no data mutation');

assert.equal(build(rows,1).top[0].points,120);
assert.equal(build([account(1,'alhinaawi@gmail.com',121)],1).top[0].points,121);
assert.equal(build([account(1,'alhinaawi@gmail.com',119)],1).top[0].points,120);
const newcomers=build([account(8,'new@example.test',0),account(3,'scorer@example.test',5),account(7,'older@example.test',0)],8);
assert.equal(newcomers.top[0].points,5);assert.equal(newcomers.top[1].name,'Test L.');assert.equal(newcomers.me.rank,3);assert.equal(newcomers.me.points,0);
const noProgress=account(9,'fresh@example.test',0);noProgress.data=null;assert.equal(build([noProgress],9).top[0].points,0);
console.log('PASS owner display floor120, real121 wins, zero-point newcomers and absent progress');
