import {useEffect, useState} from 'react';

// Laptop-only page layout switcher: single page, two-page book spread, or a
// four-page overview grid. Rendered next to the zoom controls in the reader
// header; CSS hides it on touch and narrow screens, and the layout module
// refuses non-single modes there too.
const ITEMS: Array<{n: number; label: string; rects: Array<[number, number, number, number]>}> = [
  {n: 1, label: 'One page', rects: [[8, 4, 8, 16]]},
  {n: 2, label: 'Two pages side by side', rects: [[3, 4, 8, 16], [13, 4, 8, 16]]},
  {n: 4, label: 'Four pages per screen', rects: [[3, 2, 8, 10], [13, 2, 8, 10], [3, 12, 8, 10], [13, 12, 8, 10]]},
];

export function LayoutSwitch() {
  const [mode, setMode] = useState<number>(() => (window as any).menschenLayout?.getMode?.() ?? 1);
  useEffect(() => {
    const sync = () => setMode((window as any).menschenLayout?.getMode?.() ?? 1);
    window.addEventListener('menschen:layout', sync);
    sync();
    return () => window.removeEventListener('menschen:layout', sync);
  }, []);
  return (
    <span className="layoutSwitch" role="group" aria-label="Page layout">
      {ITEMS.map(item => (
        <button
          key={item.n}
          type="button"
          data-active={mode === item.n || undefined}
          aria-pressed={mode === item.n}
          aria-label={item.label}
          title={item.label}
          onClick={() => (window as any).menschenLayout?.setMode?.(item.n)}
        >
          <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round">
            {item.rects.map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} rx={1} />)}
          </svg>
        </button>
      ))}
    </span>
  );
}
