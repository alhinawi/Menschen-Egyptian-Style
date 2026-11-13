import {createElement} from 'react';
import type {ComponentType, ReactNode} from 'react';
import type {MarkupAttrs, MarkupNode} from '../types/book';
import {loadKB11Pages} from '../native-kb11/registry';
import {loadScanPages, scanData} from '../scan-data/registry';

// Loading is completed before React mounts a lesson. Do not use Suspense here:
// legacy adapters bind their controls in the first layout effect.
const loaders = {
  NativeAB12P31to46: () => import('../native-ab12/NativeAB12P31to46').then(m => m.NativeAB12P31to46),
  NativeAB12L23: () => import('../native-ab12-l2324/NativeAB12L23').then(m => m.NativeAB12L23),
  NativeAB11Test88: () => import('../native-ab11/NativeAB11Test88').then(m => m.NativeAB11Test88),
  AB11LineMatching88: () => import('../exercises/AB11LineMatching88').then(m => m.AB11LineMatching88),
  NativeAB11Lesson10Start: () => import('../native-ab11/NativeAB11Lesson10Start').then(m => m.NativeAB11Lesson10Start),
  NativeAB11Lesson10Mid: () => import('../native-ab11/NativeAB11Lesson10Mid').then(m => m.NativeAB11Lesson10Mid),
  NativeAB11Module3Close: () => import('../native-ab11/NativeAB11Module3Close').then(m => m.NativeAB11Module3Close),
  NativeAB11Module3Review: () => import('../native-ab11/NativeAB11Module3Review').then(m => m.NativeAB11Module3Review),
  NativeAB11Lesson9Close: () => import('../native-ab11/NativeAB11Lesson9Close').then(m => m.NativeAB11Lesson9Close),
  ClipMarkers: () => import('./ClipMarkers').then(m => m.ClipMarkers),
  NativePage: () => import('./NativePage').then(m => m.NativePage),
  NativePilot: () => import('./NativePilot').then(m => m.NativePilot),
  NativeKB12: () => import('../native-kb12/NativeKB12').then(m => m.NativeKB12),
  NativeAB11Lesson9Start: () => import('../native-ab11/NativeAB11Lesson9Start').then(m => m.NativeAB11Lesson9Start),
  NativeAB11Lesson8Close: () => import('../native-ab11/NativeAB11Lesson8Close').then(m => m.NativeAB11Lesson8Close),
  NativeAB11Lesson8Start: () => import('../native-ab11/NativeAB11Lesson8Start').then(m => m.NativeAB11Lesson8Start),
  NativeAB11Lesson7Close: () => import('../native-ab11/NativeAB11Lesson7Close').then(m => m.NativeAB11Lesson7Close),
  NativeAB11Next45: () => import('../native-ab11/NativeAB11Next45').then(m => m.NativeAB11Next45),
  NativeAB11Lessons45: () => import('../native-ab11/NativeAB11Lessons45').then(m => m.NativeAB11Lessons45),
  NativeAB11Module1: () => import('../native-ab11/NativeAB11Module1').then(m => m.NativeAB11Module1),
  NativeAB11Next: () => import('../native-ab11/NativeAB11Next').then(m => m.NativeAB11Next),
  NativeAB11: () => import('../native-ab11/NativeAB11').then(m => m.NativeAB11),
  NativeKb11: () => import('./NativeKb11').then(m => m.NativeKb11),
  HybridScan: () => import('./HybridScan').then(m => m.HybridScan),
  NativeAB12: () => import('./NativeAB12').then(m => m.NativeAB12),
  NativeAB12P66to71: () => import('./ab12-ranges/NativeAB12P66').then(m => m.NativeAB12P66to71),
  NativeAB12P67: () => import('./ab12-ranges/NativeAB12P67').then(m => m.NativeAB12P67),
  NativeAB12P68: () => import('./ab12-ranges/NativeAB12P68').then(m => m.NativeAB12P68),
  NativeAB12P69: () => import('./ab12-ranges/NativeAB12P69').then(m => m.NativeAB12P69),
  NativeAB12P70: () => import('./ab12-ranges/NativeAB12P70').then(m => m.NativeAB12P70),
  NativeAB12P71: () => import('./ab12-ranges/NativeAB12P71').then(m => m.NativeAB12P71),
  NativeAB12P18_20: () => import('../native-ab12/NativeAB12P18_20').then(m => m.NativeAB12P18_20),
  NativeAB12Lesson13: () => import('../native-ab12/NativeAB12Lesson13').then(m => m.NativeAB12Lesson13),
  NativeAB12Range: () => import('../native-ab12/NativeAB12Range').then(m => m.NativeAB12Range),
};
type Name = keyof typeof loaders;
const components = new Map<Name, ComponentType<any>>();
const pending = new Map<Name, Promise<void>>();
const rangeFiles = import.meta.glob('../native-ab12/range/p*.json');
const rangePages = new Set(Object.keys(rangeFiles).map(p => p.match(/p(\d+)\.json$/)![1]));
function pick(name: Name, props: Record<string, any>) { return {name, props}; }
function select(tag: string, attrs: MarkupAttrs) {
  if(tag === 'ClipButton')return pick('ClipMarkers',{book:'kb-a11',page:'',number:Number(attrs.number)});
  if(tag === 'NativePage')return pick('NativePage',{book:attrs.book,page:attrs.page});
  if(tag === 'NativePilot')return pick('NativePilot',{page:attrs.page});
  if(tag === 'NativeKB12')return pick('NativeKB12',{page:attrs.page});
  if(tag === 'NativeAB11Test88')return pick('NativeAB11Test88',{});
  if(tag === 'AB11LineMatching88')return pick('AB11LineMatching88',{});
  if(tag === 'HybridScan' && attrs.book==='ab-a11' && ['77','78'].includes(String(attrs.page)))return pick('NativeAB11Lesson10Start',{page:String(attrs.page)});
  if(tag === 'HybridScan' && attrs.book==='ab-a11' && ['79','80','81','82'].includes(String(attrs.page)))return pick('NativeAB11Lesson10Mid',{page:String(attrs.page)});
  if(tag === 'HybridScan' && attrs.book==='ab-a11' && ['74','75','76'].includes(String(attrs.page)))return pick('NativeAB11Module3Close',{page:String(attrs.page)});
  if(tag === 'HybridScan' && attrs.book==='ab-a11' && ['71','72','73'].includes(String(attrs.page)))return pick('NativeAB11Module3Review',{page:String(attrs.page)});
  if(tag === 'HybridScan' && attrs.book==='ab-a11' && ['68','69','70'].includes(String(attrs.page)))return pick('NativeAB11Lesson9Close',{page:String(attrs.page)});
  if(tag === 'HybridScan' && attrs.book==='ab-a11' && ['65','66','67'].includes(String(attrs.page)))return pick('NativeAB11Lesson9Start',{page:String(attrs.page)});
  if(tag === 'HybridScan' && attrs.book==='ab-a11' && ['62','63','64'].includes(String(attrs.page)))return pick('NativeAB11Lesson8Close',{page:String(attrs.page)});
  if(tag === 'HybridScan' && attrs.book==='ab-a11' && ['60','61'].includes(String(attrs.page)))return pick('NativeAB11Lesson8Start',{page:String(attrs.page)});
  if(tag === 'HybridScan' && attrs.book==='ab-a12' && rangePages.has(String(attrs.page)))return pick('NativeAB12Range',{page:String(attrs.page)});
  if(tag === 'HybridScan' && attrs.book==='ab-a12' && Number(attrs.page)>=31 && Number(attrs.page)<=46 && !rangePages.has(String(attrs.page)))return pick('NativeAB12P31to46',{page:String(attrs.page)});
  if(tag === 'NativeAB12L23')return pick('NativeAB12L23',{page:attrs.page});
  if(tag === 'HybridScan' && attrs.book==='ab-a12' && ['86'].includes(String(attrs.page)))return pick('NativeAB12L23',{page:String(attrs.page)});
  if(tag === 'NativeAB12')return pick('NativeAB12',{page:attrs.page});
  if(tag === 'HybridScan' && attrs.book==='ab-a12' && ['66'].includes(String(attrs.page)))return pick('NativeAB12P66to71',{page:String(attrs.page)});
  if(tag === 'HybridScan' && attrs.book==='ab-a12' && ['67'].includes(String(attrs.page)))return pick('NativeAB12P67',{page:String(attrs.page)});
  if(tag === 'HybridScan' && attrs.book==='ab-a12' && ['68'].includes(String(attrs.page)))return pick('NativeAB12P68',{page:String(attrs.page)});
  if(tag === 'HybridScan' && attrs.book==='ab-a12' && ['69'].includes(String(attrs.page)))return pick('NativeAB12P69',{page:String(attrs.page)});
  if(tag === 'HybridScan' && attrs.book==='ab-a12' && ['70'].includes(String(attrs.page)))return pick('NativeAB12P70',{page:String(attrs.page)});
  if(tag === 'HybridScan' && attrs.book==='ab-a12' && ['71'].includes(String(attrs.page)))return pick('NativeAB12P71',{page:String(attrs.page)});
  if(tag === 'NativeAB12L13')return pick('NativeAB12Lesson13',{page:attrs.page});
  if(tag === 'HybridScan' && attrs.book==='ab-a12' && ['18','19','20'].includes(String(attrs.page)))return pick('NativeAB12P18_20',{page:String(attrs.page)});
  if(tag === 'HybridScan' && attrs.book==='ab-a11' && ['57','58','59'].includes(String(attrs.page)))return pick('NativeAB11Lesson7Close',{page:String(attrs.page)});
  if(tag === 'HybridScan' && attrs.book==='ab-a11' && ['38','39','40'].includes(String(attrs.page)))return pick('NativeAB11Next45',{page:String(attrs.page)});
  if(tag === 'HybridScan' && attrs.book==='ab-a11' && ['30','31','32','33','34','35','36','37'].includes(String(attrs.page)))return pick('NativeAB11Lessons45',{page:String(attrs.page)});
  if(tag === 'HybridScan' && attrs.book==='ab-a11' && ['20','21','22','23','24','25','26','27','28'].includes(String(attrs.page)))return pick('NativeAB11Module1',{page:String(attrs.page)});
  if(tag === 'HybridScan' && attrs.book==='ab-a11' && ['12','13','14','15','16','17','18','19'].includes(String(attrs.page)))return pick('NativeAB11Next',{page:String(attrs.page)});
  if(tag === 'HybridScan' && attrs.book==='ab-a11' && ['6','7','8','9','10','11'].includes(String(attrs.page)))return pick('NativeAB11',{page:String(attrs.page)});
  if(tag === 'NativeKb11')return pick('NativeKb11',{page:attrs.page});
  if(tag === 'HybridScan'){return pick('HybridScan',{book:attrs.book,page:attrs.page});}
  return null;
}
export async function prepareNativeComponents(nodes: MarkupNode[]): Promise<void> {
  const selected: NonNullable<ReturnType<typeof select>>[] = [];
  const scans: {book: string; page: string}[] = [];
  function walk(items: MarkupNode[]) {
    for (const node of items) {
      if (typeof node === 'string') continue;
      const [tag, attrs, children] = node;
      const entry = select(tag, attrs);
      if (entry) selected.push(entry);
      // Native AB11 ports also consume their old page's scan metadata.
      if (tag === 'HybridScan') scans.push({book: attrs.book, page: String(attrs.page)});
      walk(children);
    }
  }
  walk(nodes);
  await Promise.all([
    loadScanPages(scans),
    loadKB11Pages(selected.filter(e => e.name === 'NativeKb11').map(e => String(e.props.page))),
    ...[...new Set(selected.map(e => e.name))].map(name => {
      let request = pending.get(name);
      if (!request) {
        request = loaders[name]().then(component => { components.set(name, component as ComponentType<any>); });
        pending.set(name, request);
        void request.catch(() => pending.delete(name));
      }
      return request;
    }),
  ]);
}
export function renderNative(tag: string, attrs: MarkupAttrs, key: string | number): ReactNode | undefined {
  const entry = select(tag, attrs);
  if (!entry) return undefined;
  const component = components.get(entry.name);
  if (!component) throw new Error('Native component was not prepared: ' + entry.name);
  if (entry.name === 'HybridScan') {
    const data = scanData[attrs.book + ':' + attrs.page];
    return data ? createElement(component, {key, data}) : null;
  }
  return createElement(component, {key, ...entry.props});
}
