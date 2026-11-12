export interface NaBox {x:number;y:number;w:number;h:number}
export interface NaCrop extends NaBox {src:string;alt:string}
export interface NaRect extends NaBox {c:string}
export interface NaLine extends NaBox {c?:string}
export interface NaWordStyle {c?:string;b?:1;h?:1}
export interface NaWordAdd extends NaBox {text:string;style?:NaWordStyle}
export interface NaAudio extends NaBox {id:string;src:string;label:string}
export interface NaPage {
  page:number;
  crops:NaCrop[];
  rects:NaRect[];
  lines:NaLine[];
  wordStyle:Record<string,NaWordStyle>;
  drop:number[];
  checks:Record<string,NaBox>;
  audioAdd?:NaAudio[];
  linesRemove?:NaBox[];
  wordsAdd?:NaWordAdd[];
}
const files=import.meta.glob('./pages/*.json',{eager:true,import:'default'}) as Record<string,NaPage>;
export const nativeAB12Pages:Record<string,NaPage>=Object.fromEntries(Object.values(files).map(d=>[String(d.page),d]));
