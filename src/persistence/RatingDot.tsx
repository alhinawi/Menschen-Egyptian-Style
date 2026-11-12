import {createElement, useContext, useEffect, useState} from 'react';
import type {ReactNode} from 'react';
import {PersistenceContext} from './PersistentFields';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Attrs = Record<string, any>;

export function RatingDot({tag, attrs, children}: {tag: string; attrs: Attrs; children: ReactNode[]}) {
  const controller = useContext(PersistenceContext)!;
  const [selected, setSelected] = useState('');
  const key = 'rate-' + attrs['data-rating-key'];
  useEffect(() => {
    setSelected((controller.read(key) as string) || '');
    const update = (e: Event) => {
      const detail = (e as CustomEvent<{key: string; value: string}>).detail;
      if (detail.key === key) setSelected(detail.value);
    };
    document.addEventListener('reader-rating', update);
    return () => document.removeEventListener('reader-rating', update);
  }, [controller, key]);
  function click(): void {
    const value = selected === attrs['data-v'] ? '' : (attrs['data-v'] as string);
    controller.update({[key]: value});
    document.dispatchEvent(new CustomEvent('reader-rating', {detail: {key, value}}));
  }
  return createElement(tag, {...attrs, className: (attrs.className || '') + (selected === attrs['data-v'] ? ' selected' : ''), onClick: click}, ...children);
}
