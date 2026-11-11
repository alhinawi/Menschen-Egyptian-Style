import {useEffect,useLayoutEffect,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
const storage='menschen-site-theme';
const options=[{id:'light',name:'Light',mode:'light',swatch:'#fffefa'},{id:'dark',name:'Dark',mode:'dark',swatch:'#202a25'},{id:'paper',name:'Paper',mode:'light',swatch:'#f3ead7'},{id:'sand',name:'Sand',mode:'light',swatch:'#eadfc9'},{id:'forest',name:'Forest',mode:'dark',swatch:'#17392b'},{id:'burgundy',name:'Burgundy',mode:'dark',swatch:'#48212e'},{id:'ocean',name:'Ocean',mode:'dark',swatch:'#123c48'},{id:'midnight',name:'Midnight',mode:'dark',swatch:'#182942'},{id:'slate',name:'Slate',mode:'dark',swatch:'#303640'},{id:'plum',name:'Plum',mode:'dark',swatch:'#3b2647'}];
function saved(){let chosen={mode:'light',palette:'1'};try{chosen={...chosen,...JSON.parse(localStorage.getItem(storage)||'{}')}}catch{}chosen.id||=(chosen.mode==='dark'?'dark':chosen.palette==='2'?'forest':'light');return chosen}
export function ReaderThemes(){
 const [chosen,setChosen]=useState(saved),[slot,setSlot]=useState(null),dialog=useRef(null);
 const option=options.find(o=>o.id===chosen.id)||options[0];
 useLayoutEffect(()=>{let node=document.querySelector('[data-react-theme-slot]'),owned=false;if(!node){node=document.createElement('span');node.dataset.reactThemeSlot='';(document.querySelector('.controls')||document.querySelector('header')||document.body).append(node);owned=true}setSlot(node);return()=>{if(owned)node.remove()}},[]);
 useLayoutEffect(()=>{document.documentElement.dataset.theme=option.mode;document.documentElement.dataset.readerTheme=option.id;document.body.dataset.palette=chosen.palette;try{localStorage.setItem(storage,JSON.stringify({...chosen,mode:option.mode}))}catch{}window.menschenTheme=()=>({...chosen,mode:option.mode})},[chosen,option]);
 useEffect(()=>{const onStorage=e=>{if(e.key===storage)setChosen(saved())};window.addEventListener('storage',onStorage);return()=>window.removeEventListener('storage',onStorage)},[]);
 const close=()=>dialog.current.close();
 return <>{slot&&createPortal(<button type="button" className="themesTrigger" aria-haspopup="dialog" aria-controls="themesMenu" aria-label={'Themes: '+option.name} onClick={()=>dialog.current.showModal()}>◐ Themes</button>,slot)}{createPortal(<dialog ref={dialog} id="themesMenu" className="themesMenu" aria-labelledby="themesTitle" onClick={e=>{if(e.target!==dialog.current)return;const r=dialog.current.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close()}}><div className="themesHeading"><h2 id="themesTitle">Themes</h2><button className="themesClose" aria-label="Close themes" onClick={close}>×</button></div><p>اختر الشكل اللي يريح عينك</p><div className="themeOptions">{options.map(o=><button key={o.id} data-mode={o.id} aria-pressed={chosen.id===o.id} onClick={()=>setChosen(v=>({...v,id:o.id}))}><i style={{background:o.swatch}}/><span>{o.name}</span></button>)}</div></dialog>,document.body)}</>;
}
const hintKey='menschen-audio-hint-seen-v1';
export function AudioHint(){
 const [hidden,setHidden]=useState(()=>{try{return !!localStorage.getItem(hintKey)}catch{return false}});
 function close(){setHidden(true);try{localStorage.setItem(hintKey,'1')}catch{}}
 useEffect(()=>{const click=e=>{if(e.target.closest('.listen'))close()};document.addEventListener('click',click);return()=>document.removeEventListener('click',click)},[]);
 return createPortal(<aside className="audioDiscover" dir="rtl" lang="ar-EG" hidden={hidden}><span>اضغط ▶ في الدرس عشان تسمع صوتيات الكتاب</span><button type="button" aria-label="إخفاء النصيحة" onClick={close}>×</button></aside>,document.body);
}
export function CrossBookNavigation(){
 useEffect(()=>{const select=document.querySelector('.headerBrand select');if(!select)return;const change=e=>{const url=new URL(e.target.value,location.href);if(url.pathname!==location.pathname){e.stopImmediatePropagation();location.href=url.href}};select.addEventListener('change',change,true);return()=>select.removeEventListener('change',change,true)},[]);return null;
}
