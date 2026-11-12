export interface NativeWord{t:string;x:number;y:number;w:number;h:number;ph?:string;c?:string;b?:number;r?:number;f?:number;cy?:number;l?:number}
export interface NativeBlock{x:number;w:number;cy:number;f:number;b:number;sa?:number;ws:{t:string;c?:string;ph?:string}[]}
export interface NativeField{id:string;group:string;kind:'text'|'radio'|'checkbox'|'select';label:string;answer?:string;name?:string;value?:string;x:number;y:number;w:number;h:number;options?:{value:string;label:string}[];maxlen?:number}
export interface NativePage{book:string;page:number;w:number;h:number;words:NativeWord[];blocks:NativeBlock[];art:{src:string;x:number;y:number;w:number;h:number}[];fields:NativeField[];audio:{id:string;src:string;label:string;x:number;y:number;w:number;h:number}[];paper?:string;checks?:Record<string,number[]>;compact?:string[];review:{status:string;notes:string[]}}
const files=import.meta.glob('./p*.json',{eager:true,import:'default'}) as Record<string,NativePage>;
export const kb11Pages:Record<string,NativePage>=Object.fromEntries(Object.values(files).map(d=>[String(d.page),d]));
