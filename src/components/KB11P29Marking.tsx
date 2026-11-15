import type {CSSProperties} from 'react';

// Letter row of exercise 1b on p29 ("Was sehen Sie hier? Markieren Sie und sprechen Sie.").
// Geometry mirrors the six printed letter groups (block x/w from p29.json).
const GROUPS:{x:number;w:number;chars:string}[]=[
 {x:170,w:55,chars:'FPR'},
 {x:245,w:54,chars:'368'},
 {x:330,w:55,chars:'FTY'},
 {x:419,w:35,chars:'358'},
 {x:504,w:55,chars:'VUO'},
 {x:586,w:55,chars:'HWR'},
];
const CY=1029;
const P_CX=170+55*1.5/3; // printed example: the circled P in "F P R"
export function KB11P29Marking({values,onChange,pos}:{values:Record<string,string>;onChange:(id:string,val:string)=>void;pos:(x:number,y:number,w:number,h:number)=>CSSProperties}){
 const spots:{id:string;cx:number}[]=[];
 GROUPS.forEach((g,gi)=>{[...g.chars].forEach((_,ci)=>{spots.push({id:'t1b-'+gi+'-'+ci,cx:g.x+g.w*(ci+0.5)/g.chars.length})})});
 return <>
  <div aria-hidden="true" className="nkb29Ring" style={pos(P_CX-11,CY-11,22,22)}/>
  {spots.map(s=>{const on=values[s.id]==='1';return <button key={s.id} type="button" className={'nkb29Mark'+(on?' on':'')} style={pos(s.cx-12,CY-12,24,24)} aria-label="Zeichen markieren" aria-pressed={on} onClick={()=>onChange(s.id,on?'':'1')}/>})}
 </>;
}
