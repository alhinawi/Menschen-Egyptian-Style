const fs=require('node:fs'),assert=require('node:assert/strict');
const css=fs.readFileSync('src/ui-language.css','utf8');
assert(css.includes('select[data-compact-choice="true"]:not([multiple]):not([size])'));
assert(css.includes('background-image:none!important;padding:0!important;text-indent:0!important;text-align:center!important;text-align-last:center!important;'));
assert(fs.readFileSync('src/components/NativeKb11.tsx','utf8').includes("'data-compact-choice':f.w<=40&&f.h<=42?'true':undefined"));
let total=0;for(const page of [10,14,31,47,56]){const d=JSON.parse(fs.readFileSync(`src/native-kb11/p${page}.json`));const picks=d.fields.filter(f=>f.kind==='select'&&f.w<=40&&f.h<=42);assert(picks.length>0);total+=picks.length;}
assert.equal(total,21);console.log('PASS21 audited compact native selects retain full text area');
