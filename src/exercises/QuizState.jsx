import {createContext,createElement,useContext,useSyncExternalStore} from 'react';
import {flushSync} from 'react-dom';
export const QuizContext=createContext(null);
const normalize=s=>String(s).normalize('NFC').toLocaleLowerCase('de').trim().replace(/[.!?]+$/,'').replace(/\s+/g,' ');
export function evaluateQuiz(form,{rejectBlank=false,radioTargets=false,lessonOne=false,speakerAnswers=[]}={}){
 if(lessonOne&&form.id==='names'){const statuses=['paco','nicole'].map(name=>{const el=form.querySelector('input[name='+name+']:checked');return{el:el?.closest('label')||form,ok:el?.value===(name==='paco'?'Paco':'Nicole')}});return{ok:statuses.every(s=>s.ok),statuses}}
 if(lessonOne&&form.id==='speakers'){const data=new FormData(form),statuses=speakerAnswers.map((answer,i)=>({el:form.querySelectorAll('tbody tr')[i],ok:data.get('s'+i)===String(answer)}));return{ok:statuses.every(s=>s.ok),statuses}}
 const fields=[...form.querySelectorAll('[data-answer]')].filter(el=>!radioTargets||el.type!=='radio');
 const statuses=fields.map(el=>{
  let ok;
  if(el.type==='checkbox')ok=el.checked===(el.dataset.answer==='true');
  else if(lessonOne)ok=el.value.trim()===el.dataset.answer;
  else{const value=normalize(el.classList.contains('radioGroup')?el.querySelector('input:checked')?.value||'':el.value);ok=(!rejectBlank||value!=='')&&el.dataset.answer.split('|').some(a=>normalize(a)===value)}
  return{el,ok};
 });
 if(radioTargets){const groups={};for(const el of form.querySelectorAll('input[type=radio]'))(groups[el.name]||=[]).push(el);for(const group of Object.values(groups)){const target=group.find(el=>el.dataset.answer!==undefined),ok=!!target?.checked;for(const el of group){const host=el.closest('label,td')||el;if(el===target||el.checked)statuses.push({el:host,ok:el===target&&ok});else host.classList.remove('answerCorrect','answerWrong')}}}
 const unique=form.dataset.key!=='ab2-t3'||new Set([...form.querySelectorAll('input')].map(i=>normalize(i.value))).size===4;
 return{ok:unique&&statuses.length>0&&statuses.every(s=>s.ok),statuses};
}
export function createQuizStore(){
 let runtime=null,snapshot={results:{},fields:{}},listeners=new Set();
 return {subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn)},getSnapshot:()=>snapshot,
  connect(value){runtime=value;return()=>{runtime=null;listeners.clear()}},
  submit(form){if(!runtime)return;const result=evaluateQuiz(form,runtime.options),key=form.dataset.key||form.id,fields={...snapshot.fields};for(const {el,ok}of result.statuses){if(el.dataset.reactAnswerId)fields[el.dataset.reactAnswerId]=ok;else{el.classList.toggle('answerCorrect',ok);el.classList.toggle('answerWrong',!ok)}}snapshot={results:{...snapshot.results,[key]:result.ok},fields};runtime.commitResult(form,result.ok);listeners.forEach(fn=>fn())}
 };
}
export function QuizForm({attrs,children}){const store=useContext(QuizContext);return createElement('form',{...attrs,onSubmit:e=>{e.preventDefault();flushSync(()=>store.submit(e.currentTarget))}},...children)}
export function QuizFeedback({tag,attrs,formKey,children}){const store=useContext(QuizContext),snapshot=useSyncExternalStore(store.subscribe,store.getSnapshot,store.getSnapshot);const result=snapshot.results[formKey];return createElement(tag,{...attrs,className:result===undefined?attrs.className:'feedback '+(result?'good':'retry')},result===undefined?children:result?'✓ Richtig!':'Noch nicht ganz. Hören Sie noch einmal.')}
export function AnswerField({tag,attrs,answerId,children}){const store=useContext(QuizContext),snapshot=useSyncExternalStore(store.subscribe,store.getSnapshot,store.getSnapshot),status=snapshot.fields[answerId];return createElement(tag,{...attrs,'data-react-answer-id':answerId,className:(attrs.className||'')+(status===undefined?'':status?' answerCorrect':' answerWrong')},...children)}
