import {createElement, memo} from 'react';
const aliases={class:'className',for:'htmlFor',tabindex:'tabIndex',readonly:'readOnly',maxlength:'maxLength',colspan:'colSpan',rowspan:'rowSpan',contenteditable:'contentEditable',autoplay:'autoPlay',playsinline:'playsInline',crossorigin:'crossOrigin',srcset:'srcSet',viewbox:'viewBox',spellcheck:'spellCheck',autofocus:'autoFocus'};
const booleans=new Set(['hidden','disabled','checked','multiple','selected','controls','loop','autoplay','muted','required','readonly','open','autofocus','novalidate']);
function style(value){return Object.fromEntries(value.split(';').filter(x=>x.includes(':')).map(x=>{let i=x.indexOf(':');let k=x.slice(0,i).trim();return[k.startsWith('--')?k:k.replace(/-([a-z])/g,(_,x)=>x.toUpperCase()),x.slice(i+1).trim()]}))}
function render(node,key){
 if(typeof node==='string')return node;
 const [tag,attrs,children]=node,props={key};
 for(let [k,v] of Object.entries(attrs)){
  if(k.startsWith('on')||k==='selected')continue;
  if(k==='style')props.style=style(v);
  else if(k==='value'&&['input','select','textarea'].includes(tag))props.defaultValue=v;
  else if(k==='checked')props.defaultChecked=true;
  else props[aliases[k]||k]=booleans.has(k)?true:v;
 }
 if(tag==='textarea'){props.defaultValue=children.join('');return createElement(tag,props)}
 return createElement(tag,props,...children.map(render));
}
// The printed content is immutable. PageFlip and exercise adapters own their
// documented DOM islands until their React ports replace those adapters.
export const BookMarkup=memo(function BookMarkup({nodes}){return nodes.map(render)});
