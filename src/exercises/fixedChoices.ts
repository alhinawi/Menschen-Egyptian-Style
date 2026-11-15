/** Audited against the task's printed choices. Never infer a bank from answers. */
import auditedRules from './fixed-choices.json';
type Rule={ids?:string[];prefix?:string;options:string[]};
const rules:Record<string,Rule[]>=auditedRules;
export function fixedChoices(book:string,page:string,id:string):string[]|undefined{
 return rules[book+':'+page]?.find(r=>r.ids?.includes(id)||(r.prefix!==undefined&&id.startsWith(r.prefix)))?.options;
}
