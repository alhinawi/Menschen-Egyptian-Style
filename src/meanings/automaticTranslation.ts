// Anonymous, on-demand fallback only. Never writes into the curated dictionaries.
export const machineCacheKey='menschen-machine-ar-v1';
export const missingQueueKey='menschen-missing-translations-v1';
const key=(text:string)=>text.normalize('NFC').trim().replace(/\s+/g,' ').toLocaleLowerCase('de');
export const hasCuratedTranslation=(value:unknown):value is string=>typeof value==='string'&&!!value.trim()&&!/(?:لسه ناقص|لسه بتتراجع|بنكمّل كل النصوص)/.test(value);
type Missing={text:string;kind:string;file:string;page:string;firstSeen:string};
export function recordMissingTranslation(text:string,kind:string){
 try{const queue:Missing[]=JSON.parse(localStorage.getItem(missingQueueKey)||'[]');const file=location.pathname.split('/').pop()||'index.html';const jump=document.querySelector('#pageJump') as HTMLSelectElement|null;const page=jump?document.querySelectorAll<HTMLElement>('.page')[Number(jump.value)]?.dataset.page||'':'';
 if(!queue.some(x=>key(x.text)===key(text)&&x.kind===kind&&x.file===file&&x.page===page)){queue.push({text,kind,file,page,firstSeen:new Date().toISOString()});localStorage.setItem(missingQueueKey,JSON.stringify(queue.slice(-3000)))}}catch{/* Private mode or full storage must not stop translation. */}
}
export function downloadMissingTranslations(){
 let rows:Missing[]=[];try{rows=JSON.parse(localStorage.getItem(missingQueueKey)||'[]')}catch{}const quote=(s:string)=>'"'+(/^[=+@-]/.test(s)?"'":'')+s.replace(/"/g,'""')+'"';const body='\ufeff'+[['German','Kind','File','Page','First seen'],...rows.map(r=>[r.text,r.kind,r.file,r.page,r.firstSeen])].map(row=>row.map(quote).join(',')).join('\r\n');const url=URL.createObjectURL(new Blob([body],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='missing-egyptian-translations.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
const inFlight=new Map<string,Promise<string>>();
const chunks=(text:string)=>{const out:string[]=[];let part='';for(const word of text.split(/\s+/)){if(new TextEncoder().encode(word).length>500)throw new Error('Text too long');const next=part?part+' '+word:word;if(new TextEncoder().encode(next).length>480){out.push(part);part=word}else part=next}if(part)out.push(part);return out};
export function automaticArabic(text:string):Promise<string>{
 const normalized=key(text);try{const cache=JSON.parse(localStorage.getItem(machineCacheKey)||'{}');if(cache[normalized])return Promise.resolve(cache[normalized])}catch{}
 const previous=inFlight.get(normalized);if(previous)return previous;
 const request=(async()=>{
  if(!text.trim()||text.length>2000)throw new Error('Text too long');
  const output:string[]=[];
  for(const part of chunks(text)){
   const params=new URLSearchParams({q:part,langpair:'de|ar',mt:'1'});
   const response=await fetch('https://api.mymemory.translated.net/get?'+params,{signal:AbortSignal.timeout(10000),credentials:'omit',referrerPolicy:'no-referrer'});
   if(!response.ok)throw new Error('Translation unavailable');
   const data=await response.json();const translated=data?.responseData?.translatedText;
   if(Number(data.responseStatus)!==200||typeof translated!=='string'||!/[\u0600-\u06ff]/.test(translated))throw new Error('Translation unavailable');
   const decoder=document.createElement('textarea');decoder.innerHTML=translated;output.push(decoder.value);
  }
  const result=output.join(' ');
  try{const cache=JSON.parse(localStorage.getItem(machineCacheKey)||'{}');cache[normalized]=result;const entries=Object.entries(cache).slice(-500);localStorage.setItem(machineCacheKey,JSON.stringify(Object.fromEntries(entries)))}catch{}
  return result;
 })();
 inFlight.set(normalized,request);void request.finally(()=>inFlight.delete(normalized)).catch(()=>{});return request;
}
