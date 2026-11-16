const fs=require('node:fs'),assert=require('node:assert/strict');
const hop=fs.readFileSync('src/components/LessonHop.tsx','utf8'),css=fs.readFileSync('src/reader-transitions.css','utf8');
for(const stale of ['setFlipAngle','rotateY(','makeVeil','HOP_FLAG','lessonJson'])assert(!hop.includes(stale),'no preliminary/arrival hop effect: '+stale);
assert(hop.includes('void navigateLesson(target.slug, target.token)'));assert(hop.includes('gesture.flipping = true'));assert(hop.includes("window.addEventListener('mousemove', onMouseMove, true)"));
assert(css.includes('::view-transition-new(root){animation:none;opacity:1;z-index:1}'));assert(css.includes('animation:lessonDoorOpen 720ms'));assert(!css.includes('lessonDoorReveal'));
console.log('PASS shared door only; no live viewport flip/reset, arrival settle or incoming slide');
