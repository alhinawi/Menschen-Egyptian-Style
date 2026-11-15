import {createContext,useContext} from 'react';
import type {InputHTMLAttributes,SelectHTMLAttributes} from 'react';
import {fixedChoices} from './fixedChoices';
import './fixed-choices.css';

export const ChoiceScope=createContext({book:'',page:''});
/** Only audited, explicitly listed picks become selects. No answer-key inference. */
export function ChoiceInput(props:InputHTMLAttributes<HTMLInputElement>){
 const scope=useContext(ChoiceScope);
 const id=(props as Record<string,unknown>)['data-native-field']??(props as Record<string,unknown>)['data-field-id'];
 const options=typeof id==='string'?fixedChoices(scope.book,scope.page,id):undefined;
 if(!options||props.type==='radio'||props.type==='checkbox')return <input {...props}/>;
 const {type,autoComplete,spellCheck,maxLength,inputMode,onSelect,checked,defaultChecked,...rest}=props;
 const raw=String(props.value??props.defaultValue??'');
 const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de');
 const value=options.find(o=>normalize(o)===normalize(raw))??raw;
 return <select {...rest as SelectHTMLAttributes<HTMLSelectElement>} value={value} data-fixed-choice="true"><option value=""/>{raw&&!options.includes(value)&&<option value={raw} disabled>{raw}</option>}{options.map(o=><option key={o} value={o}>{o}</option>)}</select>;
}
