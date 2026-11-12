import {serviceLifecycle} from './lifecycle';
import {flushSync} from 'react-dom';
import {selectionStore} from '../meanings/selectionStore';
import {meaningStore} from '../meanings/meaningStore';
import type {MeaningSnapshot} from '../meanings/meaningStore';
export default function mount(){
const lifecycle=serviceLifecycle(),setTimeout=lifecycle.timeout,requestAnimationFrame=lifecycle.frame;
/* Local Egyptian Arabic meanings. Pronunciation plays only after a learner taps. */
return(()=>{
const names={nicole:'نيكول',paco:'باكو',winfried:'ڤينفريد',wachter:'ڤاختر',rodriguez:'رودريجز',ewa:'إيڤا',wolska:'ڤولسكا',angela:'أنجيلا',merkel:'ميركل',wolfgang:'ڤولفجانج',amadeus:'أماديوس',mozart:'موتسارت',johann:'يوهان',von:'من / ڤون في الأسامي',goethe:'جوته',cleopatra:'كليوباترا',agatha:'أجاثا',christie:'كريستي',mahatma:'مهاتما',gandhi:'غاندي',pablo:'بابلو',picasso:'بيكاسو',mutter:'أم',teresa:'تريزا',riemann:'ريمان',nathalie:'ناتالي',valerie:'ڤاليري',wulf:'ڤولف'};
Object.assign(window.MENSCHEN_WORDS,names);
const selectionNorm=(s: string)=>s.normalize('NFC').replace(/[’]/g,"'").replace(/^\s*(?:[0-9]+|[a-z](?=\s))\s*[.)]?\s*(?=[A-ZÄÖÜ])/,'').toLocaleLowerCase('de').replace(/([a-zäöüß])(\d)/g,'$1 $2').replace(/(\d)([a-zäöüß])/g,'$1 $2').replace(/[^a-zäöüß0-9]+/g,' ').trim();
const norm=(s: string)=>s.normalize('NFC').trim().replace(/[’]/g,"'").replace(/\s+/g,' ').replace(/[.!?…]+$/g,'').toLocaleLowerCase('de');
const phrases=new Map(Object.entries(window.MENSCHEN_PHRASES).map(([k,v])=>[norm(k),v]));
const words=window.MENSCHEN_WORDS,records=window.PRONUNCIATION_INDEX||[];
const dialog=document.querySelector<HTMLDialogElement>('.meaningPopup')!;
let current: any,mode: 'word'|'sentence'='word',tapMode: 'word'|'sentence'='word';try{tapMode=(localStorage.getItem('menschen-translation-mode') as 'word'|'sentence')||'word'}catch{}
const activeAudio=new Audio();let audioPath: string|undefined,audioQueue: string[]=[],queueAt=0;activeAudio.onended=()=>{if(++queueAt<audioQueue.length){activeAudio.src=audioQueue[queueAt];activeAudio.play().catch(()=>{})}};
function play(){activeAudio.pause();if(!audioPath)return;audioQueue=current?.selectionParts?current.selectionParts.flatMap((p: any)=>p.audio||[]):[audioPath];queueAt=0;activeAudio.src=audioQueue[0];activeAudio.play().catch(()=>{meaningStore.update({pendingHidden:false,pending:'التسجيل مشتغلش. اضغط اسمع النطق عشان تجرّب تاني.'})})}
function refresh(autoplay=false){
 let view: Partial<MeaningSnapshot>;
 if(current?.selectionParts){const parts=current.selectionParts;audioPath=parts.flatMap((p: any)=>p.audio||[])[0];view={mode:'sentence',german:parts.map((p: any)=>p.text).join('\n\n'),arabic:parts.map((p: any)=>p.arabic||'الجزء ده لسه ناقص من الترجمة.').join('\n\n'),wordDisabled:true,sentenceDisabled:true,audioDisabled:!audioPath,pendingHidden:parts.every((p: any)=>p.audio?.length),pending:'بعض أجزاء التحديد لسه ناقصها تسجيل. هنشغّل الأجزاء الجاهزة.'};}
 else{const text=mode==='sentence'?current.phrase:current.word;const translated=mode==='sentence'?phrases.get(norm(text)):words[norm(text)];const record=records.find((r: any)=>r.type===mode&&norm(r.text)===norm(text));audioPath=window.PRONUNCIATION_FILES?.[record?.id];view={german:text,arabic:translated||'ترجمة الجملة دي لسه بتتراجع.',sentenceDisabled:!phrases.has(norm(current.phrase)),wordDisabled:!current.word,mode,audioDisabled:!audioPath,pendingHidden:!!audioPath,pending:mode==='sentence'?'نطق الجملة دي لسه بيتجهّز. التسجيلات الأصلية شغّالة جوّه التمارين.':'نطق الكلمة دي لسه بيتجهّز. تقدر تختار الجملة لو نطقها جاهز.'};}
 flushSync(()=>meaningStore.update(view));if(autoplay)play();}

function open(word: string|undefined, phrase: string, wanted: 'word'|'sentence'){activeAudio.pause();current={word:word||'',phrase};mode=wanted;refresh();if(!dialog.open)dialog.showModal();play()}
window.openBookMeaning=open;
meaningStore.connect({word(){mode='word';refresh(true)},sentence(){mode='sentence';refresh(true)},play,pause:()=>activeAudio.pause()});
window.initMeanings=()=>{
const selector='.abBody p,.abBody h1,.abBody h2,.abBody h3,.abBody td,.abBody th,.abBody .wordbank,.page h1,.page h2,.page .instruction,.page .assign>span,.page .dialog,.page .person span,.page .bookDialogue span,.page .gapdialog p,.page .bookLines,.page .speakerTable td:first-child,.page .grammar td,.page .communicationTable td,.page .feelings,.page .communication,.batch p,.batch .profile label,.batch .treePerson span,.batch .opinion label>span,.batch .choiceRows label>span,.batch .corrections span,.batch .nameRiddle span,.batch .grammarNote';
const escape=(s: string)=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const phraseRx=new RegExp(Object.keys(window.MENSCHEN_PHRASES).sort((a,b)=>b.length-a.length).map(escape).join('|'),'giu');
function wordNodes(text: string, phrase: string){const out=document.createDocumentFragment();for(const token of text.split(/([A-Za-zÄÖÜäöüß]+(?:[’'-][A-Za-zÄÖÜäöüß]+)*)/)){if(/^[A-Za-zÄÖÜäöüß]/.test(token)&&words[norm(token)]){const span=document.createElement('span');span.className='tapWord';span.textContent=token;span.dataset.word=token;span.dataset.phrase=phrase;span.tabIndex=0;span.setAttribute('role','button');span.setAttribute('aria-label',token+' · Bedeutung');out.append(span)}else out.append(document.createTextNode(token))}return out}
for(const el of document.querySelectorAll(selector)){const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement!.closest('.tapWord,.tapSentence,.translation,button:not(.feeling),select,input,.number')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});const nodes: Node[]=[];while(walker.nextNode())nodes.push(walker.currentNode);for(const node of nodes){const text=node.textContent!;if(!/[A-Za-zÄÖÜäöüß]/.test(text))continue;const out=document.createDocumentFragment();let pos=0;phraseRx.lastIndex=0;for(const match of text.matchAll(phraseRx)){const from=match.index,to=from+match[0].length;if(/[A-Za-zÄÖÜäöüß]/.test(text[from-1]||'')||/[A-Za-zÄÖÜäöüß]/.test(text[to]||''))continue;if(from>pos)out.append(wordNodes(text.slice(pos,from),text.trim()));const sentence=document.createElement('span');sentence.className='tapSentence';sentence.dataset.phrase=match[0];sentence.tabIndex=-1;sentence.append(wordNodes(match[0],match[0]));out.append(sentence);pos=to;}if(pos<text.length)out.append(wordNodes(text.slice(pos),text.trim()));(node as ChildNode).replaceWith(out)}}

function setMode(){document.body.dataset.translationMode=tapMode;selectionStore.update({mode:tapMode});document.querySelectorAll<HTMLElement>('.tapSentence').forEach(s=>{s.tabIndex=tapMode==='sentence'?0:-1;s.setAttribute('role',tapMode==='sentence'?'button':'group');s.setAttribute('aria-label',s.dataset.phrase+' · Satzbedeutung')})}setMode();const toggleMode=()=>{tapMode=tapMode==='word'?'sentence':'word';try{localStorage.setItem('menschen-translation-mode',tapMode)}catch{}setMode()};
// Selection mode leaves native highlight handles in control instead of page turns.
let selecting=false,chosen='',chosenRange: Range|null=null;
const toggleSelection=()=>{selecting=!selecting;document.body.dataset.textSelection=String(selecting);selectionStore.update({selecting});if(selecting)createArtworkLayers();if(!selecting){window.getSelection()?.removeAllRanges();selectionStore.update({actionHidden:true})}};

function createArtworkLayers(){for(const pg of document.querySelectorAll<HTMLElement>('.page')){pg.querySelectorAll<HTMLElement>('.artText').forEach((e: any)=>e.remove());const pr=pg.getBoundingClientRect(),ratio=pr.width/900;if(!ratio)continue;for(const img of pg.querySelectorAll<HTMLImageElement>('img')){const regions=window.ARTWORK_TEXT?.[img.getAttribute('src')!.split('/').pop()!];if(!regions)continue;const r=img.getBoundingClientRect(),style=getComputedStyle(img),contain=style.objectFit==='contain',cover=style.objectFit==='cover';let width=r.width/ratio,height=r.height/ratio,iw=width,ih=height;const aspect=img.naturalWidth/img.naturalHeight;if(contain||cover){const factor=(contain?Math.min:Math.max)(width/img.naturalWidth,height/img.naturalHeight);iw=img.naturalWidth*factor;ih=img.naturalHeight*factor}const left=(r.left-pr.left)/ratio+(width-iw)/2,top=(r.top-pr.top)/ratio+(height-ih)/2;for(const region of regions){const el=document.createElement('span');el.className='artText';el.dataset.unitId=region.id;el.textContent=region.text;const [x,y,w,h]=region.box;Object.assign(el.style,{left:(left+x*iw)+'px',top:(top+y*ih)+'px',width:(w*iw)+'px',height:(h*ih)+'px',fontSize:Math.max(7,h*ih*.75)+'px'});pg.append(el)}}}}
window.createArtworkLayers=createArtworkLayers;window.menschenBook?.on('flip',()=>{if(selecting)requestAnimationFrame(createArtworkLayers)});
function selectionChanged(){if(!selecting||dialog.open)return;const sel=window.getSelection(),text=sel?.toString().trim();const node=sel?.anchorNode,el=(node?.nodeType===Node.ELEMENT_NODE?node:node?.parentElement) as Element;if(!text||!el?.closest('.page')||text.length>1500){selectionStore.update({actionHidden:true});return}chosen=text;chosenRange=sel!.getRangeAt(0).cloneRange();selectionStore.update({actionHidden:false});selectionStore.update({actionLabel:'ترجم التحديد واسمعه: '+text})}
document.addEventListener('selectionchange',selectionChanged);document.querySelector<HTMLInputElement>('#pageJump')!.addEventListener('change',()=>{if(selecting)setTimeout(createArtworkLayers,0)});function compose(text: string){
 const n=selectionNorm(text),exact=Object.entries(window.MENSCHEN_PHRASES).find(([k])=>selectionNorm(k)===n);const exactWord=words[n];const clip=(t: any)=>{const r=records.find((r: any)=>selectionNorm(r.text)===selectionNorm(t));return window.PRONUNCIATION_FILES?.[(r?.id as string)]};
 if(exact||exactWord)return {text,arabic:exact?.[1]||exactWord,audio:[clip(exact?.[0]||text)].filter(Boolean)};
 const entries=Object.entries(window.MENSCHEN_PHRASES).map(([k,v])=>({k,v,n:selectionNorm(k)})).filter(x=>x.n).sort((a,b)=>b.n.length-a.n.length);let rest=n,arabic: string[]=[],audio: string[]=[];
 while(rest){const found=entries.find((e: any)=>rest===e.n||rest.startsWith(e.n+' '));if(!found)return null;arabic.push(found.v as string);const path=clip(found.k);if(path)audio.push(path);rest=rest.slice(found.n.length).trim()}
 return {text,arabic:arabic.join(' '),audio};
}
function selectedUnits(text: string, range?: Range|null){
 const units=window.BOOK_TEXT_UNITS||[],n=selectionNorm(text);const file=location.pathname.split('/').pop()||'index.html';let candidates=units.filter((u: any)=>u.occurrences.some((o: any)=>o.file===file));
 const page=range?.startContainer?.parentElement?.closest('.page');if(page&&range!.endContainer?.parentElement?.closest('.page')===page)candidates=candidates.filter((u: any)=>u.occurrences.some((o: any)=>o.page===(page as HTMLElement).dataset.page));
 const verb=range?.startContainer?.parentElement?.closest('.verbSentence');if(verb){const unit=candidates.find((u: any)=>selectionNorm(u.text)===selectionNorm((verb as HTMLElement).dataset.phrase!));if(unit)return [unit]}
 const artwork=range?[...document.querySelectorAll<HTMLElement>('.artText')].filter((e: any)=>range.intersectsNode(e)&&e.textContent.trim()).map((e: any)=>candidates.find((u: any)=>u.id===e.dataset.unitId)).filter(Boolean):[];
 const exact=candidates.find((u: any)=>selectionNorm(u.text)===n);if(exact&&!artwork.length)return [exact];
 if(range){const grouped=new Map<Element,{text: string, hit: boolean}>();for(const pg of document.querySelectorAll<HTMLElement>('.page')){const walk=document.createTreeWalker(pg,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT);while(walk.nextNode()){const node=walk.currentNode;if(node.nodeType===Node.ELEMENT_NODE&&!(node as Element).matches('br,input'))continue;let el=(node.nodeType===Node.TEXT_NODE?node.parentElement:node) as Element;if(el!.closest('button,select,textarea,.n,.sub,.pageNo,.number,.bigN,.feedback,.helper')||(el!.matches('input')&&['radio','checkbox'].includes((el as HTMLInputElement).type)))continue;let target=el.matches('input,br')?el.parentElement!:el;while(target.parentElement&&target.matches('span,b,strong,i,em,small,a')&&!target.matches('.treePerson>span,.person>div>span,.assign>span'))target=target.parentElement;if(!grouped.has(target))grouped.set(target,{text:'',hit:false});const g=grouped.get(target)!;g.text+=el.matches('br')?' ':el.matches('input')?'___':node.textContent!;if(node.nodeType===Node.TEXT_NODE&&node.textContent!.trim()&&range.intersectsNode(node))g.hit=true}}
 const overlap=[...artwork];for(const g of grouped.values()){if(!g.hit)continue;const unit=candidates.find((u: any)=>selectionNorm(u.text)===selectionNorm(g.text));if(unit&&!overlap.includes(unit))overlap.push(unit)}if(overlap.length)return overlap;
 }

 if(artwork.length)return artwork;
 const containing=candidates.filter((u: any)=>selectionNorm(u.text).includes(n));if(containing.length)return [containing.sort((a: any,b: any)=>a.text.length-b.text.length)[0]];
 const hits=candidates.filter((u: any)=>{const t=selectionNorm(u.text);return t.length>2&&n.includes(t)});
 if(hits.length){hits.sort((a: any,b: any)=>n.indexOf(selectionNorm(a.text))-n.indexOf(selectionNorm(b.text))||b.text.length-a.text.length);return hits.filter((u: any,i: number)=>!hits.some((v: any,j: number)=>j!==i&&v.text.length>u.text.length&&selectionNorm(v.text).includes(selectionNorm(u.text))))}
 return [];
}
const translateSelection=()=>{const text=chosen;selectionStore.update({actionHidden:true});if(!text)return;let matched=selectedUnits(text,chosenRange);let parts=matched.map((u: any)=>{const base=compose(u.text)||{text:u.text,arabic:u.arabic,audio:[u.audio].filter(Boolean)};return {text:u.text,arabic:window.BOOK_UNIT_ARABIC?.[u.id]||base.arabic||'الجزء ده لسه ناقص من الترجمة.',audio:window.BOOK_UNIT_AUDIO?.[u.id]?[window.BOOK_UNIT_AUDIO[u.id]]:base.audio||[]}});if(!parts.length){const composed=compose(text);if(composed)parts=[composed]}
 if(!parts.length)parts=[{text,arabic:'التحديد ده لسه ناقص من الترجمة. بنكمّل كل النصوص المطبوعة، بما فيها التعليمات.',audio:[]}];
 activeAudio.pause();current={selectionParts:parts};mode='sentence';refresh();if(!dialog.open)dialog.showModal();play();window.getSelection()?.removeAllRanges()};

selectionStore.connect({toggleMode,toggleSelection,translate:translateSelection});
const stage=document.querySelector<HTMLElement>('#pageStage')!;stage.addEventListener('click',(e: any)=>{if(selecting)return;const word=e.target.closest('.tapWord'),sentence=e.target.closest('.tapSentence');if(!word&&!sentence)return;e.stopPropagation();if(tapMode==='sentence'||!word)open(word?.dataset.word,sentence?.dataset.phrase||word.dataset.phrase,'sentence');else open(word.dataset.word,sentence?.dataset.phrase||word.dataset.phrase,'word')});stage.addEventListener('keydown',(e: any)=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('.tapWord,.tapSentence')){e.preventDefault();e.stopPropagation();e.target.click()}});for(const span of document.querySelectorAll<HTMLElement>('.tapWord,.tapSentence'))for(const type of ['mousedown','touchstart'])span.addEventListener(type,(e: any)=>e.stopPropagation());
};
return()=>{lifecycle.dispose();activeAudio.onended=null;activeAudio.pause();activeAudio.removeAttribute('src');meaningStore.connect({});selectionStore.connect({});delete window.openBookMeaning;delete window.initMeanings};
})();

}
