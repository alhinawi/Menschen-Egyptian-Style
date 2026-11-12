import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import manifest from './lessons/manifest.json';
import './adapters/page-flip';
const pages=import.meta.glob(['./lessons/*.json','!./lessons/manifest.json']);
const adapters=import.meta.glob(['./adapters/**/*.js','!./adapters/mountLesson.js','!./adapters/page-flip.js']);
async function start(){
 const filename=decodeURIComponent(location.pathname.split('/').pop())||'index.html';
 const config=manifest[filename]||manifest['index.html'];
 await Promise.all(config.styles.map(href=>new Promise((resolve,reject)=>{const el=document.createElement('link');el.rel='stylesheet';el.href=href;el.onload=resolve;el.onerror=reject;document.head.append(el)})));
 const [data,...modules]=await Promise.all([pages['./lessons/'+config.slug+'.json'](),...config.initializers.map(name=>adapters['./adapters/'+name+'.js']())]);
 for(const [key,value]of Object.entries(config.bodyAttrs||{}))document.body.setAttribute(key,Array.isArray(value)?value.join(' '):value);
 createRoot(document.getElementById('react-book-root')).render(<App nodes={data.default} initializers={modules.map(m=>m.default)} config={config}/>);
}
start().catch(error=>{console.error(error);document.getElementById('react-book-root').textContent='تعذّر فتح الدرس. جرّب تحديث الصفحة.'});
