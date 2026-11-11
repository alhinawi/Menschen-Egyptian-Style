import {TaskControl,TaskFeedback,TaskMode} from '../exercises/CustomTasks';
import {createElement, memo} from 'react';
import {CoverSocials} from './CoverSocials';
import {SelectionControls} from '../meanings/SelectionControls';
import {PersistentField} from '../persistence/PersistentFields';
import {QuizContext,QuizForm,QuizFeedback,AnswerField} from '../exercises/QuizState';
import {ReaderControl,ZoomValue} from './ReaderControls';
const aliases={class:'className',for:'htmlFor',tabindex:'tabIndex',readonly:'readOnly',maxlength:'maxLength',colspan:'colSpan',rowspan:'rowSpan',contenteditable:'contentEditable',autoplay:'autoPlay',playsinline:'playsInline',crossorigin:'crossOrigin',srcset:'srcSet',viewbox:'viewBox',spellcheck:'spellCheck',autofocus:'autoFocus'};
const booleans=new Set(['hidden','disabled','checked','multiple','selected','controls','loop','autoplay','muted','required','readonly','open','autofocus','novalidate']);
function style(value){return Object.fromEntries(value.split(';').filter(x=>x.includes(':')).map(x=>{let i=x.indexOf(':');let k=x.slice(0,i).trim();return[k.startsWith('--')?k:k.replace(/-([a-z])/g,(_,x)=>x.toUpperCase()),x.slice(i+1).trim()]}))}
function render(node,key,formKey=null,quizEnabled=false,taskKey=null){
 const path=String(key);
 if(typeof node==='string')return node;
 const [tag,attrs,children]=node,props={key};
 if(tag==='ReactTaskMode')return createElement(TaskMode,{key,kind:attrs.kind});
 if(tag==='ReactSelectionControls')return createElement(SelectionControls,{key});
 for(let [k,v] of Object.entries(attrs)){
  if(k.startsWith('on')){if(k==='onclick'&&v==='history.back()')props.onClick=()=>history.back();else if(k==='onclick'&&v==="window.open(this.src,'_blank')")props.onClick=e=>window.open(e.currentTarget.src,'_blank','noopener');else if(k==='onchange'&&v==='location.href=this.value')props.onChange=e=>{location.href=e.currentTarget.value};continue}if(k==='selected')continue;
  if(k==='style')props.style=style(v);
  else if(k==='value'&&['input','select','textarea'].includes(tag))props.defaultValue=v;
  else if(k==='checked')props.defaultChecked=true;
  else props[aliases[k]||k]=booleans.has(k)?true:v;
 }
 if(attrs.class?.split(' ').includes('coverSocials'))return createElement(tag,props,createElement(CoverSocials));
 if(tag==='select'){const selected=children.filter(n=>Array.isArray(n)&&n[0]==='option'&&'selected' in n[1]).map(n=>n[1].value??n[2].join(''));if(selected.length)props.defaultValue=props.multiple?selected:selected[0]}
 if(tag==='textarea'){props.defaultValue=children.join('');return createElement(PersistentField,{key,tag,attrs:props,children:[]})}
 if(tag==='form'&&(attrs.class?.split(' ').some(c=>['batchQuiz','simpleQuiz'].includes(c))||['names','speakers'].includes(attrs.id))&&quizEnabled)formKey=attrs['data-key']||attrs.id;
 if('data-answer-group' in attrs){taskKey=path;props['data-react-task-id']=path}
 const rendered=children.map((child,i)=>render(child,path+'.'+i,formKey,quizEnabled,taskKey));
 if(quizEnabled){
  if(['originFeedback','musicFeedback','verbsFeedback'].includes(attrs.id))return createElement(TaskFeedback,{key,tag,attrs:{...props,'data-task-feedback':attrs.id,'data-section-feedback':'true'},children:rendered});
  if(taskKey&&attrs.class?.split(' ').includes('feedback'))return createElement(TaskFeedback,{key,tag,attrs:{...props,'data-task-feedback':taskKey},children:rendered});
  if(['checkOrigin','checkMusic','verbs'].includes(attrs.id)||'data-check-verbs' in attrs||'data-check-marks' in attrs||'data-pick' in attrs||attrs.class?.split(' ').some(c=>['verbWord','markWord'].includes(c))||taskKey&&tag==='button'&&attrs.class?.split(' ').includes('check'))return createElement(TaskControl,{key,tag,attrs:{...props,'data-react-task-id':path},children:rendered});
  if(attrs['data-section-field'])return createElement(AnswerField,{key,tag,attrs:props,answerId:path,children:rendered});
 }
 if(formKey&&quizEnabled){
  if(tag==='form')return createElement(QuizForm,{key,attrs:props,children:rendered});
  if(attrs.class?.split(' ').includes('feedback'))return createElement(QuizFeedback,{key,tag,attrs:props,formKey,children:rendered});
  if('data-answer' in attrs)return createElement(AnswerField,{key,tag,attrs:props,answerId:formKey+':'+path,children:rendered});
 }
 if(['prev','next','plus','minus','fit','pageJump','lessonNav'].includes(attrs.id)||attrs.class?.split(' ').includes('soundToggle'))return createElement(ReaderControl,{key,tag,attrs:props,children:rendered});
 if(attrs.id==='zoomValue')return createElement(ZoomValue,{key,tag,attrs:props,children:rendered});
 if(['input','select'].includes(tag))return createElement(PersistentField,{key,tag,attrs:props,children:rendered});
 return createElement(tag,props,...rendered);
}
// The printed content is immutable. PageFlip and exercise adapters own their
// documented DOM islands until their React ports replace those adapters.
export const BookMarkup=memo(function BookMarkup({nodes,quizEnabled=false}){return nodes.map((node,i)=>render(node,i,null,quizEnabled))});
