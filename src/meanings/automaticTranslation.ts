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
const inFlight=new Map<string,Promise<string>>();
const chunks=(text:string)=>{const out:string[]=[];let part='';for(const word of text.split(/\s+/)){if(new TextEncoder().encode(word).length>500)throw new Error('Text too long');const next=part?part+' '+word:word;if(new TextEncoder().encode(next).length>480){out.push(part);part=word}else part=next}if(part)out.push(part);return out};
// Two anonymous providers, tried in order for every chunk. Google comes first:
// it has no per-IP daily quota. MyMemory stays as fallback - its free tier caps
// how much one IP may translate per day, and on shared mobile carrier IPs that
// cap is what made some sentences fail while others (cached) still worked.
async function translateChunk(part:string):Promise<string>{
 try{
  const params=new URLSearchParams({client:'gtx',sl:'de',tl:'ar',dt:'t',q:part});
  const response=await fetch('https://translate.googleapis.com/translate_a/single?'+params,{signal:AbortSignal.timeout(12000),credentials:'omit',referrerPolicy:'no-referrer'});
  if(!response.ok)throw new Error('Translation unavailable');
  const data=await response.json();
  const segments:unknown=data?.[0];
  const translated=(Array.isArray(segments)?segments:[]).map(segment=>Array.isArray(segment)&&typeof segment[0]==='string'?segment[0]:'').join('');
  if(!translated.trim())throw new Error('Translation unavailable');
  return translated;
 }catch{/* Google unreachable or throttled - try MyMemory before giving up. */}
 const params=new URLSearchParams({q:part,langpair:'de|ar',mt:'1'});
 const response=await fetch('https://api.mymemory.translated.net/get?'+params,{signal:AbortSignal.timeout(12000),credentials:'omit',referrerPolicy:'no-referrer'});
 if(!response.ok)throw new Error('Translation unavailable');
 const data=await response.json();const translated=data?.responseData?.translatedText;
 if(Number(data.responseStatus)!==200||data?.quotaFinished===true||typeof translated!=='string'||!/[\u0600-\u06ff]/.test(translated))throw new Error('Translation unavailable');
 const decoder=document.createElement('textarea');decoder.innerHTML=translated;return decoder.value;
}
export function automaticArabic(text:string):Promise<string>{
 const normalized=key(text);try{const cache=JSON.parse(localStorage.getItem(machineCacheKey)||'{}');if(cache[normalized])return Promise.resolve(cache[normalized])}catch{}
 const previous=inFlight.get(normalized);if(previous)return previous;
 const request=(async()=>{
  if(!text.trim()||text.length>2000)throw new Error('Text too long');
  const output:string[]=[];
  for(const part of chunks(text))output.push(await translateChunk(part));
  const result=output.join(' ');
  try{const cache=JSON.parse(localStorage.getItem(machineCacheKey)||'{}');cache[normalized]=result;const entries=Object.entries(cache).slice(-500);localStorage.setItem(machineCacheKey,JSON.stringify(Object.fromEntries(entries)))}catch{}
  return result;
 })();
 inFlight.set(normalized,request);void request.finally(()=>inFlight.delete(normalized)).catch(()=>{});return request;
}
