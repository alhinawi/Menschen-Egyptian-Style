import {useState, useContext, createElement} from 'react';
import {QuizContext} from './QuizState';

const normalize = (s: string): string => s.normalize('NFC').toLocaleLowerCase('de').trim().replace(/[.!?]+$/, '').replace(/\s+/g, ' ');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Attrs = Record<string, any>;

export function WordBank({tag, attrs, words}: {tag: string; attrs: Attrs; words: string[]}) {
  const store = useContext(QuizContext)!;
  const [selected, setSelected] = useState<Record<number, boolean>>({});
  const [result, setResult] = useState<boolean | null>(null);
  const [statuses, setStatuses] = useState<Record<number, boolean>>({});
  function check(): void {
    const answers = (attrs['data-answer'] as string).split('|').map(normalize);
    const next: Record<number, boolean> = {};
    words.forEach((word, i) => {next[i] = !!selected[i] === answers.includes(normalize(word));});
    const ok = Object.values(next).every(Boolean);
    setStatuses(next);
    setResult(ok);
    store.completeTask(attrs['data-key'] as string, ok);
  }
  return <>{createElement(tag, attrs, words.map((word, i) => <span key={i} className={'tapMark' + (selected[i] ? ' marked' : '') + (statuses[i] === undefined ? '' : statuses[i] ? ' answerCorrect' : ' answerWrong')} onClick={() => setSelected(v => ({...v, [i]: !v[i]}))}>{word}</span>))}<button type="button" className="check" onClick={check}>Prüfen ✓</button><p role="status" className={'feedback' + (result === null ? '' : result ? ' good' : ' retry')}>{result === null ? '' : result ? '✓ Richtig!' : 'Noch nicht ganz. Hören Sie noch einmal.'}</p></>;
}
