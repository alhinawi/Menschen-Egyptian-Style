import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';

const storage = 'menschen-site-theme';

interface ThemeOption {
  id: string;
  name: string;
  mode: 'light' | 'dark';
  swatch: string;
}

const options: ThemeOption[] = [
  {id: 'light', name: 'Light', mode: 'light', swatch: '#fffefa'},
  {id: 'dark', name: 'Dark', mode: 'dark', swatch: '#202a25'},
  {id: 'paper', name: 'Paper', mode: 'light', swatch: '#f3ead7'},
  {id: 'sand', name: 'Sand', mode: 'light', swatch: '#eadfc9'},
  {id: 'forest', name: 'Forest', mode: 'dark', swatch: '#17392b'},
  {id: 'burgundy', name: 'Burgundy', mode: 'dark', swatch: '#48212e'},
  {id: 'ocean', name: 'Ocean', mode: 'dark', swatch: '#123c48'},
  {id: 'midnight', name: 'Midnight', mode: 'dark', swatch: '#182942'},
  {id: 'slate', name: 'Slate', mode: 'dark', swatch: '#303640'},
  {id: 'plum', name: 'Plum', mode: 'dark', swatch: '#3b2647'}
];

interface ThemeChoice {
  id?: string;
  mode: 'light' | 'dark';
  palette: string;
}

function saved(): ThemeChoice {
  let chosen: ThemeChoice = {mode: 'light', palette: '1'};
  try {chosen = {...chosen, ...JSON.parse(localStorage.getItem(storage) || '{}')};} catch { /* ignore corrupted storage */ }
  chosen.id ||= (chosen.mode === 'dark' ? 'dark' : chosen.palette === '2' ? 'forest' : 'light');
  return chosen;
}

export function ReaderThemes() {
  const [chosen, setChosen] = useState<ThemeChoice>(saved);
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const option = options.find(o => o.id === chosen.id) || options[0];
  useLayoutEffect(() => {
    let node = document.querySelector<HTMLElement>('[data-react-theme-slot]');
    let owned = false;
    if (!node) {
      node = document.createElement('span');
      node.dataset.reactThemeSlot = '';
      (document.querySelector('.controls') || document.querySelector('header') || document.body).append(node);
      owned = true;
    }
    setSlot(node);
    return () => {if (owned) node!.remove();};
  }, []);
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = option.mode;
    document.documentElement.dataset.readerTheme = option.id;
    document.body.dataset.palette = chosen.palette;
    try {localStorage.setItem(storage, JSON.stringify({...chosen, mode: option.mode}));} catch { /* storage may be unavailable */ }
    window.menschenTheme = () => ({...chosen, mode: option.mode});
  }, [chosen, option]);
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {if (e.key === storage) setChosen(saved());};
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  const close = () => dialog.current?.close();
  return <>{slot && createPortal(<button type="button" className="themesTrigger" aria-haspopup="dialog" aria-controls="themesMenu" aria-label={'Themes: ' + option.name} onClick={() => dialog.current?.showModal()}>◐ Themes</button>, slot)}{createPortal(<dialog ref={dialog} id="themesMenu" className="themesMenu" aria-labelledby="themesTitle" onClick={e => {if (e.target !== dialog.current) return; const r = dialog.current!.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close();}}><div className="themesHeading"><h2 id="themesTitle">Themes</h2><button className="themesClose" aria-label="Close themes" onClick={close}>×</button></div><p>اختر الشكل اللي يريح عينك</p><div className="themeOptions">{options.map(o => <button key={o.id} data-mode={o.id} aria-pressed={chosen.id === o.id} onClick={() => setChosen(v => ({...v, id: o.id}))}><i style={{background: o.swatch}}/><span>{o.name}</span></button>)}</div></dialog>, document.body)}</>;
}

export function CrossBookNavigation() {
  useEffect(() => {
    const select = document.querySelector<HTMLSelectElement>('.headerBrand select');
    if (!select) return;
    const change = (e: Event) => {
      const url = new URL((e.target as HTMLSelectElement).value, location.href);
      if (url.pathname !== location.pathname) {
        e.stopImmediatePropagation();
        location.href = url.href;
      }
    };
    select.addEventListener('change', change, true);
    return () => select.removeEventListener('change', change, true);
  }, []);
  return null;
}
