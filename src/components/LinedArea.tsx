import type {CSSProperties} from 'react';

type Props = {
  id: string;
  values: Record<string, string>;
  set: (id: string, value: string) => void;
  x: number;
  /** Top of each former one-line field, in page units. The first and last define the line pitch. */
  tops: number[];
  w: number;
  label: string;
  /** Ids of the former one-line fields: their saved text is merged into the first load of the new textarea. */
  legacyIds?: string[];
  /** Draw the rules (when they are not already printed in the page background). */
  rules?: boolean;
  /** Height of one former field box; its bottom edge is where the rule sits. */
  boxH?: number;
  className?: string;
};

/** One multi-line free-writing textarea whose line height equals the rule spacing, so text sits on the ruled lines. */
export function LinedArea({id, values, set, x, tops, w, label, legacyIds = [], rules = true, boxH = 27, className = ''}: Props) {
  const n = tops.length;
  const pitch = n > 1 ? (tops[n - 1] - tops[0]) / (n - 1) : boxH;
  const top = tops[0] + boxH - pitch;
  const saved = values[id];
  const value = saved ?? legacyIds.map(l => values[l] || '').join('\n').replace(/\n+$/, '');
  const style = {left: x, top, width: w, '--la-lh': pitch + 'px', '--la-h': pitch * n + 'px'} as CSSProperties;
  return <textarea className={'naField naLined ' + (rules ? 'naLinedRules ' : '') + className} aria-label={label} data-native-field={id} style={style} rows={n} value={value} onChange={e => set(id, e.target.value)} autoComplete="off" spellCheck={false} />;
}
