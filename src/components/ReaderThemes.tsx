import {useEffect, useLayoutEffect, useState} from 'react';
import {navigateHref} from '../navigate';

const storage = 'menschen-site-theme';

interface ThemeChoice {
  id?: string;
  mode: 'light' | 'dark';
  palette: string;
}

// Themes are disabled for now: the reader always uses the original light
// theme, and any previously saved dark/sepia choice is overwritten.
const fallback: ThemeChoice = {id: 'light', mode: 'light', palette: '1'};

export function ReaderThemes() {
  const [chosen] = useState<ThemeChoice>(fallback);
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = chosen.mode;
    document.documentElement.dataset.readerTheme = chosen.id!;
    document.body.dataset.palette = chosen.palette;
    try {localStorage.setItem(storage, JSON.stringify(chosen));} catch { /* storage may be unavailable */ }
    window.menschenTheme = () => ({...chosen});
  }, [chosen]);
  return null;
}

export function CrossBookNavigation() {
  useEffect(() => {
    const select = document.querySelector<HTMLSelectElement>('.headerBrand select');
    if (!select) return;
    const change = (e: Event) => {
      const value = (e.target as HTMLSelectElement).value;
      const url = new URL(value, location.href);
      // Same-file targets stay with the lesson's own adapter (page flip);
      // anything crossing to another lesson/book swaps in-app, no reload.
      if (url.pathname !== location.pathname) {
        e.stopImmediatePropagation();
        void navigateHref(value);
      }
    };
    select.addEventListener('change', change, true);
    return () => select.removeEventListener('change', change, true);
  }, []);
  return null;
}
