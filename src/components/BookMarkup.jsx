import {createElement, memo} from 'react';
import {QuizContext,QuizForm,QuizFeedback,AnswerField} from '../exercises/QuizState';
import {ReaderControl,ZoomValue} from './ReaderControls';
const aliases={class:'className',for:'htmlFor',tabindex:'tabIndex',readonly:'readOnly',maxlength:'maxLength',colspan:'colSpan',rowspan:'rowSpan',contenteditable:'contentEditable',autoplay:'autoPlay',playsinline:'playsInline',crossorigin:'crossOrigin',srcset:'srcSet',viewbox:'viewBox',spellcheck:'spellCheck',autofocus:'autoFocus'};
const booleans=new Set(['hidden','disabled','checked','multiple','selected','controls','loop','autoplay','muted','required','readonly','open','autofocus','novalidate']);
function style(value){return Object.fromEntries(value.split(';').filter(x=>x.includes(':')).map(x=>{let i=x.indexOf(':');let k=x.slice(0,i).trim();return[k.startsWith('--')?k:k.replace(/-([a-z])/g,(_,x)=>x.toUpperCase()),x.slice(i+1).trim()]}))}
function render(node,key,formKey=null,quizEnabled=false){
 const path=String(key);
 if(typeof node==='string')return node;
 const [tag,attrs,children]=node,props={key};
 for(let [k,v] of Object.entries(attrs)){
  if(k.startsWith('on')){if(k==='onclick'&&v==='history.back()')props.onClick=()=>history.back();else if(k==='onclick'&&v==="window.open(this.src,'_blank')")props.onClick=e=>window.open(e.currentTarget.src,'_blank','noopener');else if(k==='onchange'&&v==='location.href=this.value')props.onChange=e=>{location.href=e.currentTarget.value};continue}if(k==='selected')continue;
  if(k==='style')props.style=style(v);
  else if(k==='value'&&['input','select','textarea'].includes(tag))props.defaultValue=v;
  else if(k==='checked')props.defaultChecked=true;
  else props[aliases[k]||k]=booleans.has(k)?true:v;
 }
 if(tag==='select'){const selected=children.filter(n=>Array.isArray(n)&&n[0]==='option'&&'selected' in n[1]).map(n=>n[1].value??n[2].join(''));if(selected.length)props.defaultValue=props.multiple?selected:selected[0]}
 if(tag==='textarea'){props.defaultValue=children.join('');return createElement(tag,props)}
 if(tag==='form'&&attrs.class?.split(' ').includes('batchQuiz')&&quizEnabled)formKey=attrs['data-key']||attrs.id;
 const rendered=children.map((child,i)=>render(child,path+'.'+i,formKey,quizEnabled));
 if(formKey&&quizEnabled){
  if(tag==='form')return createElement(QuizForm,{key,attrs:props,children:rendered});
  if(attrs.class?.split(' ').includes('feedback'))return createElement(QuizFeedback,{key,tag,attrs:props,formKey,children:rendered});
  if('data-answer' in attrs)return createElement(AnswerField,{key,tag,attrs:props,answerId:formKey+':'+path,children:rendered});
 }
 if(['prev','next','plus','minus','fit','pageJump','lessonNav'].includes(attrs.id)||attrs.class?.split(' ').includes('soundToggle'))return createElement(ReaderControl,{key,tag,attrs:props,children:rendered});
 if(attrs.id==='zoomValue')return createElement(ZoomValue,{key,tag,attrs:props,children:rendered});
 return createElement(tag,props,...rendered);
}
// The printed content is immutable. PageFlip and exercise adapters own their
// documented DOM islands until their React ports replace those adapters.
export const BookMarkup=memo(function BookMarkup({nodes,quizEnabled=false}){return nodes.map((node,i)=>render(node,i,null,quizEnabled))});
