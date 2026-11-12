import {useContext, useSyncExternalStore} from 'react';
import {ReaderContext} from './ReaderControls';
import type {MarkupNode} from '../types/book';

interface Clip {src:string; title:string; watch:string}
export interface FilmMediaData {pages:string[]; clips:Record<string,Clip[]>}
// Video content lives below the fixed-size flip canvas, in normal page flow.
// This keeps the original page proportions and lets all three films be reached.
export function prepareFilmMedia(nodes:MarkupNode[]):{nodes:MarkupNode[]; media:FilmMediaData} {
 const media:FilmMediaData={pages:[],clips:{}};
 function walk(node:MarkupNode,page=''):MarkupNode|null {
  if(typeof node==='string')return node;
  const [tag,attrs,children]=node;
  if(tag==='section'&&attrs.class?.split(' ').includes('page')){page=attrs['data-page'];media.pages.push(page)}
  const iframe=tag==='div'?children.find(c=>Array.isArray(c)&&c[0]==='iframe'):undefined;
  if(iframe&&Array.isArray(iframe)&&page){
   let watch='';
   function link(n:MarkupNode):void{if(typeof n==='string')return;if(n[0]==='a'&&n[1].href)watch=n[1].href;for(const c of n[2])link(c)}
   link(node);
   (media.clips[page]??=[]).push({src:iframe[1].src,title:iframe[1].title,watch});
   return null;
  }
  const kept=children.map(c=>walk(c,page)).filter((c):c is MarkupNode=>c!==null);
  if(tag==='div'&&children.length>0&&!kept.some(c=>typeof c!=='string'||c.trim()))return null;
  return [tag,attrs,kept];
 }
 return {nodes:nodes.map(n=>walk(n)).filter((n):n is MarkupNode=>n!==null),media};
}
export function FilmMedia({media}:{media:FilmMediaData}) {
 const reader=useContext(ReaderContext)!;
 const snapshot=useSyncExternalStore(reader.subscribe,reader.getSnapshot,reader.getSnapshot);
 const page=media.pages[Number(snapshot.page)||0];
 const clips=media.clips[page];
 if(!snapshot.ready||!clips?.length)return null;
 return <section data-film-page={page} aria-label={`Film-Stationen · Seite ${page}`} className="mx-auto w-full max-w-[900px] px-4 pb-28 pt-6">
  <h2 className="font-serif text-xl text-(--accent)">Film-Stationen · Seite {page}</h2>
  {clips.map(clip=><div key={clip.src} className="my-5">
   <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
    <h3 className="m-0 font-serif text-base text-(--accent)">{clip.title}</h3>
    <a className="text-sm underline underline-offset-2 text-(--accent)" href={clip.watch} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>
   </div>
   <iframe className="block aspect-video w-full rounded border border-[#c9a45a] bg-black" src={clip.src} title={clip.title} loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/>
  </div>)}
 </section>;
}
