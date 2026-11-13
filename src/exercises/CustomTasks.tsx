import {CheckButton} from '../components/CheckButton';
import {createElement, useContext, useSyncExternalStore, useState, useEffect} from 'react';
import type {ReactNode} from 'react';
import {QuizContext} from './QuizState';

export interface SectionTask {
  selector: string;
  answers: string[];
  feedback: string;
}

export const sectionTasks: Record<string, SectionTask> = {
  checkOrigin: {selector: '#origin select', answers: ['Nicole', 'Paco', 'Paco', 'Paco', 'Nicole'], feedback: 'originFeedback'},
  checkMusic: {selector: '#flags select', answers: ['1', '5', '2', '4', '3'], feedback: 'musicFeedback'},
  verbs: {selector: '.verb input', answers: ['st', 'e'], feedback: 'verbsFeedback'}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Attrs = Record<string, any>;

export function TaskControl({tag, attrs, children}: {tag: string; attrs: Attrs; children: ReactNode[]}) {
  const store = useContext(QuizContext)!;
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  const id = attrs['data-react-task-id'] as string;
  const selected = snapshot.selections[id];
  const status = snapshot.fields[id];
  const props: Attrs = {...attrs};
  if (selected !== undefined) props.className = (props.className || '').replace(/\b(selectedVerb|picked)\b/g, '') + (selected ? (attrs['data-pick'] !== undefined ? ' picked' : ' selectedVerb') : '');
  if (status !== undefined) props.className = (props.className || '').replace(/\b(answerCorrect|answerWrong)\b/g, '') + (status ? ' answerCorrect' : ' answerWrong');
  props.onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (attrs['data-pick'] !== undefined || (attrs.className as string | undefined)?.split(' ').some(c => ['verbWord', 'markWord'].includes(c))) store.toggleTask(e.currentTarget);
    else store.checkTask(e.currentTarget);
  };
  if(tag==='button'&&children.some(c=>typeof c==='string'&&c.includes('Prüfen')))return createElement(CheckButton,props);
  return createElement(tag, props, ...children);
}

export function TaskFeedback({tag, attrs, children}: {tag: string; attrs: Attrs; children: ReactNode[]}) {
  const store = useContext(QuizContext)!;
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  const result = snapshot.taskResults[attrs['data-task-feedback'] as string];
  return createElement(tag, {...attrs, className: result === undefined ? attrs.className : (attrs.className || '') + ' ' + (result ? 'good' : 'retry')}, result === undefined ? children : result ? '✓ Richtig!' : attrs['data-section-feedback'] ? 'Noch einmal hören.' : 'Noch nicht ganz. Versuchen Sie es noch einmal.');
}

export function TaskMode({kind}: {kind: string}) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    document.body.dataset[kind === 'verbs' ? 'verbExplanation' : 'scriptMarking'] = String(enabled);
    return () => {delete document.body.dataset[kind === 'verbs' ? 'verbExplanation' : 'scriptMarking'];};
  }, [kind, enabled]);
  return <button type="button" className="check" onClick={() => setEnabled(v => !v)}>{kind === 'verbs' ? (enabled ? 'Modus: Wörter erklären' : 'Modus: Verben markieren') : 'Verben markieren: ' + (enabled ? 'an' : 'aus')}</button>;
}
