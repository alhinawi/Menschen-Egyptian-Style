const ts=require('typescript'),fs=require('fs'),assert=require('assert');
const source=fs.readFileSync('backend/src/google.ts','utf8').replace("import { newToken } from './crypto'","const newToken=()=> 'test-state'");
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,m={exports:{}};
new Function('exports','require','module',js)(m.exports,require,m);
(async()=>{const env={GOOGLE_CLIENT_ID:'test',GOOGLE_CLIENT_SECRET:'test',ALLOWED_ORIGINS:'https://example.com',DB:{prepare:()=>({bind:()=>({run:async()=>({})})})}};
for(const [query,hint,prompt] of [['',null,'select_account'],['&login_hint=returning%40example.com','returning@example.com',null],['&login_hint=returning%40example.com&choose_account=1',null,'select_account'],['&login_hint=invalid',null,null]]){
 const r=await m.exports.startGoogleLogin(new Request('https://api.example.com/api/auth/google/start?origin=https%3A%2F%2Fexample.com'+query),env);assert.equal(r.status,302);const params=new URL(r.headers.get('location')).searchParams;assert.equal(params.get('login_hint'),hint);assert.equal(params.get('prompt'),prompt);assert.equal(params.get('state'),'test-state');
}console.log('PASS first-time chooser, returning hint without forced chooser, switch-account override, invalid hint rejected');})().catch(e=>{console.error(e);process.exitCode=1});
