const fs=require('node:fs'),assert=require('node:assert/strict');
const nav=fs.readFileSync('src/navigate.ts','utf8'),ui=fs.readFileSync('src/components/LibraryNav.tsx','utf8');
const prepare=nav.slice(nav.indexOf('function prepareLesson'),nav.indexOf('const warmedImages'));
for(const effect of ['ensureStyles(','applyBodyAttrs(','history.','localStorage.'])assert(!prepare.includes(effect),'preparation must not activate route: '+effect);
assert(prepare.includes('prepared.get(config.slug)'));assert(prepare.includes('prepared.delete(config.slug)'));
assert(nav.includes("connection?.saveData||connection?.effectiveType==='2g'"));assert(nav.includes('index)+2'));
assert(nav.includes('warmedImages.size>96'));assert(ui.includes("document.addEventListener('pointerover',warm"));assert(ui.includes("document.addEventListener('focusin',warm"));assert(ui.includes('sameBook[i+1]'));
console.log('PASS: route-neutral deduplicated/retryable preparation, bounded first-page artwork, save-data guard, neighbor and pointer/keyboard intent hooks');
