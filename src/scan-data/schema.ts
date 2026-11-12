export interface ScanBox {x:number;y:number;w:number;h:number}
export interface ScanWord extends ScanBox {text:string;phrase?:string}
export interface ScanField extends ScanBox {id:string;group:string;kind:'text'|'radio'|'checkbox'|'select';label:string;answer?:string;name?:string;value?:string;options?:{value:string;label:string}[]}
export interface ScanAudio extends ScanBox {id:string;src:string;label:string}
export interface ScanData {book:string;page:number;image:string;width:number;height:number;words:ScanWord[];fields:ScanField[];audio:ScanAudio[];groups:{id:string;label:string}[];review:{status:'partial'|'verified';verifiedWords:number;totalWords?:number;notes:string[]}}
