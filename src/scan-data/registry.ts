import type {ScanData} from './schema';
const files=import.meta.glob('./*/*.json',{eager:true,import:'default'}) as Record<string,ScanData>;
export const scanData=Object.fromEntries(Object.values(files).map(data=>[`${data.book}:${data.page}`,data]));
