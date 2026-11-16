const fs=require('node:fs'),assert=require('node:assert/strict');
const css=fs.readFileSync('src/tailwind.css','utf8');
const row=css.match(/button\.profileVoiceChoice,button\.profileVoiceChoice:is\(:hover,:active,:focus,:focus-visible\)\{([^}]+)\}/)?.[1];
assert(row,'voice toggle must override sticky hover and pointer focus');
for(const declaration of ['background:none','outline:none','box-shadow:none','-webkit-tap-highlight-color:transparent','user-select:none'])assert(row.includes(declaration),declaration);
assert(css.includes('.profileVoiceChoice:focus-visible .profileVoiceSwitch{outline:2px solid #35634e;outline-offset:2px}'),'keyboard users retain a cue on the switch itself');
const component=fs.readFileSync('src/components/ReaderProfile.tsx','utf8');
assert(component.includes('role="switch"'));assert(component.includes('aria-checked={voicesOn}'));
console.log('PASS: no row hover/focus/tap rectangle; switch keyboard cue and state semantics retained');
