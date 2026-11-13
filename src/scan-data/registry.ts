import type {ScanData} from './schema';
const files = import.meta.glob<ScanData>('./*/*.json', {import: 'default'});
export const scanData: Record<string, ScanData> = {};
const pending = new Map<string, Promise<void>>();
export async function loadScanPages(pages: {book: string; page: string}[]): Promise<void> {
  await Promise.all(pages.map(({book, page}) => {
    const key = `${book}:${page}`;
    const load = files[`./${book}/p${page}.json`];
    if (!load || scanData[key]) return;
    let request = pending.get(key);
    if (!request) {
      request = load().then(data => {scanData[key] = data;});
      pending.set(key, request);
      void request.catch(() => pending.delete(key));
    }
    return request;
  }));
}
