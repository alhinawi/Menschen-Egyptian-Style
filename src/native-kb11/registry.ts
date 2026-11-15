export interface NativeWord{t:string;x:number;y:number;w:number;h:number;ph?:string;c?:string;b?:number;r?:number;f?:number;cy?:number;l?:number}
export interface NativeBlock{x:number;w:number;cy:number;f:number;b:number;sa?:number;sb?:number;ws:{t:string;c?:string;ph?:string}[]}
export interface NativeField{id:string;group:string;kind:'text'|'radio'|'checkbox'|'select';label:string;answer?:string;name?:string;value?:string;x:number;y:number;w:number;h:number;options?:{value:string;label:string}[];maxlen?:number;circle?:boolean}
export interface NativeMarkSpot{id:string;x:number;y:number;w:number;h:number}
export interface NativeMarkTask{id:string;spots:NativeMarkSpot[];correct:string[];check:[number,number]}
export interface NativePanelField{id:string;label:string;answer?:string;placeholder?:string;textarea?:boolean;pre?:string}
export interface NativePanelSection{id:string;title:string;hint?:string;neutral?:boolean;fields:NativePanelField[]}
export interface NativePage{book:string;page:number;w:number;h:number;words:NativeWord[];blocks:NativeBlock[];art:{src:string;x:number;y:number;w:number;h:number}[];fields:NativeField[];audio:{id:string;src:string;label:string;x:number;y:number;w:number;h:number;task?:string}[];paper?:string;checks?:Record<string,number[]>;compact?:string[];panel?:NativePanelSection[];marks?:NativeMarkTask[];review:{status:string;notes:string[]}}
const files = import.meta.glob<NativePage>('./p*.json', {import: 'default'});
export const kb11Pages: Record<string, NativePage> = {};
const pending = new Map<string, Promise<void>>();
export async function loadKB11Pages(pages: string[]): Promise<void> {
 await Promise.all(pages.map(page => {
  const load = files[`./p${page}.json`];
  if (!load || kb11Pages[page]) return;
  let request = pending.get(page);
  if (!request) {
   request = load().then(data => {kb11Pages[page] = data;});
   pending.set(page, request);
   void request.catch(() => pending.delete(page));
  }
  return request;
 }));
}
