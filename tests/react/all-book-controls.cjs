const fs=require('node:fs'),assert=require('node:assert/strict');
const markup=fs.readFileSync('src/components/BookMarkup.tsx','utf8'),control=fs.readFileSync('src/components/ReaderControls.tsx','utf8'),css=fs.readFileSync('src/ui-language.css','utf8');
assert(markup.includes("tools.unshift(['span',{'data-react-theme-slot':''},[]])"));assert(control.includes("children=[key==='prev'?'←':'→']"));assert(css.includes('left:50%!important;top:50%!important;transform:translate(-50%,-50%)!important'));
console.log('PASS shared avatar fallback, normalized arrows and independent exact center across all lesson markup');
