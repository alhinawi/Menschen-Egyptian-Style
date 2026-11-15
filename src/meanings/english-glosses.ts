// Reviewed English batches are merged automatically. Keep each batch scoped
// to its book/page range so corpus work never touches runtime code.
const batches=import.meta.glob<Record<string,string>>('./english/*.json',{eager:true,import:'default'});
export const normalizeEnglishKey=(text:string)=>text.normalize('NFC').trim().replace(/[’]/g,"'").replace(/\s+/g,' ').replace(/^[.,:;!?"'„“”‚‘()\[\]{}<>|/\\–—-]+|[.,:;!?"'„“”‚‘()\[\]{}<>|/\\–—-]+$/g,'').toLocaleLowerCase('de');
export const ENGLISH_GLOSSES:Record<string,string>={'it-spezialist':'IT specialist'};
for(const path of Object.keys(batches).sort())for(const [german,english]of Object.entries(batches[path])){
 if(typeof english==='string'&&english.trim())ENGLISH_GLOSSES[normalizeEnglishKey(german)]=english;
}
export function englishGloss(text:string):string|undefined{
 const exact=ENGLISH_GLOSSES[normalizeEnglishKey(text)];if(exact)return exact;
 // Multi-paragraph selections keep their boundaries. Only join fully covered
 // parts, never translate a sentence word by word.
 const parts=text.split(/\n\s*\n/).map(p=>p.trim()).filter(Boolean);
 if(parts.length>1){const translated=parts.map(p=>ENGLISH_GLOSSES[normalizeEnglishKey(p)]);if(translated.every(Boolean))return translated.join('\n\n');}
 return undefined;
}
