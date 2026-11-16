const fs=require('node:fs'),assert=require('node:assert/strict');
const css=fs.readFileSync('src/ui-language.css','utf8');
const rule=css.match(/html\[data-ui-language\] body \.page \.nkb\[data-native-book="kb-a11"\]\[data-native-page="10"\] input:is\(\[type="radio"\],\[type="checkbox"\]\):focus:not\(:focus-visible\)\{([^}]+)\}/);
assert(rule,'trial must stay scoped to KB A1.1 p10 and pointer focus');assert(rule[1].includes('outline:none!important'));assert(rule[1].includes('box-shadow:none!important'));assert(!rule[1].includes('background'),'X ink must remain');assert(!rule[1].includes('border:'),'printed rings must remain');
console.log('PASS p10-only pointer oval removal, keyboard/ink/printed rings unchanged');
