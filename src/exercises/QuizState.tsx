import {createContext, createElement, useContext, useSyncExternalStore} from 'react';
import type {ReactNode} from 'react';
import {flushSync} from 'react-dom';
import {PersistentField} from '../persistence/PersistentFields';
import {sectionTasks} from './CustomTasks';
import type {ExerciseRuntime, QuizOptions} from '../types/runtime';

export const QuizContext = createContext<QuizStore | null>(null);

const normalize = (s: unknown): string => String(s).normalize('NFC').toLocaleLowerCase('de').trim().replace(/[.!?]+$/, '').replace(/\s+/g, ' ');

export interface QuizStatus {
  el: HTMLElement;
  ok: boolean;
}

export interface QuizResult {
  ok: boolean;
  statuses: QuizStatus[];
}

export function evaluateQuiz(form: HTMLFormElement, {rejectBlank = false, radioTargets = false, lessonOne = false, speakerAnswers = []}: QuizOptions = {}): QuizResult {
  if (lessonOne && form.id === 'names') {
    const statuses = ['paco', 'nicole'].map(name => {
      const el = form.querySelector<HTMLInputElement>('input[name=' + name + ']:checked');
      return {el: (el?.closest('label') || form) as HTMLElement, ok: el?.value === (name === 'paco' ? 'Paco' : 'Nicole')};
    });
    return {ok: statuses.every(s => s.ok), statuses};
  }
  if (lessonOne && form.id === 'speakers') {
    const data = new FormData(form);
    const statuses = speakerAnswers.map((answer, i) => ({el: form.querySelectorAll('tbody tr')[i] as HTMLElement, ok: data.get('s' + i) === String(answer)}));
    return {ok: statuses.every(s => s.ok), statuses};
  }
  const fields = [...form.querySelectorAll<HTMLInputElement>('[data-answer]')].filter(el => !radioTargets || el.type !== 'radio');
  const statuses: QuizStatus[] = fields.map(el => {
    let ok: boolean;
    if (el.type === 'checkbox') ok = el.checked === (el.dataset.answer === 'true');
    else if (lessonOne) ok = el.value.trim() === el.dataset.answer;
    else {
      const value = normalize(el.classList.contains('radioGroup') ? el.querySelector<HTMLInputElement>('input:checked')?.value || '' : el.value);
      ok = (!rejectBlank || value !== '') && el.dataset.answer!.split('|').some(a => normalize(a) === value);
    }
    return {el, ok};
  });
  if (radioTargets) {
    const groups: Record<string, HTMLInputElement[]> = {};
    for (const el of form.querySelectorAll<HTMLInputElement>('input[type=radio]')) (groups[el.name] ||= []).push(el);
    for (const group of Object.values(groups)) {
      const target = group.find(el => el.dataset.answer !== undefined);
      const ok = !!target?.checked;
      for (const el of group) {
        const host = (el.closest('label,td') || el) as HTMLElement;
        if (el === target || el.checked) statuses.push({el: host, ok: el === target && ok});
        else host.classList.remove('answerCorrect', 'answerWrong');
      }
    }
  }
  const unique = form.dataset.key !== 'ab2-t3' || new Set([...form.querySelectorAll<HTMLInputElement>('input')].map(i => normalize(i.value))).size === 4;
  return {ok: unique && statuses.length > 0 && statuses.every(s => s.ok), statuses};
}

interface QuizSnapshot {
  results: Record<string, boolean>;
  fields: Record<string, boolean | undefined>;
  selections: Record<string, boolean>;
  taskResults: Record<string, boolean>;
}

export interface QuizStore {
  subscribe(fn: () => void): () => void;
  getSnapshot(): QuizSnapshot;
  connect(value?: ExerciseRuntime): () => void;
  completeTask(key: string, ok: boolean): void;
  toggleTask(el: HTMLElement): void;
  checkTask(button: HTMLElement): void;
  submit(form: HTMLFormElement): void;
  resetPage(page: HTMLElement): void;
}

export function createQuizStore(): QuizStore {
  let runtime: ExerciseRuntime | null = null,
    snapshot: QuizSnapshot = {results: {}, fields: {}, selections: {}, taskResults: {}},
    listeners = new Set<() => void>();
  return {
    subscribe(fn) {
      listeners.add(fn);
      return () => {listeners.delete(fn);};
    },
    getSnapshot: () => snapshot,
    connect(value) {
      runtime = value ?? null;
      if (runtime?.options.verbState) {
        const selections: Record<string, boolean> = {};
        document.querySelectorAll<HTMLElement>('.verbWord').forEach((el, i) => {selections[el.dataset.reactTaskId!] = runtime!.options.verbState!['verb-' + i] ?? i === 1;});
        snapshot = {...snapshot, selections};
        listeners.forEach(fn => fn());
      }
      return () => {runtime = null; listeners.clear();};
    },
    completeTask(key, ok) {
      runtime?.commitResult({dataset: {key}}, ok);
    },
    toggleTask(el) {
      if (!runtime) return;
      const id = el.dataset.reactTaskId!;
      const selections = {...snapshot.selections};
      if (el.matches('.verbWord') && runtime.options.beforeVerbToggle?.(el)) return;
      if (el.hasAttribute('data-pick')) {
        const group = el.closest('[data-answer-group]')!;
        if (el.hasAttribute('data-multi')) {
          selections[id] = !selections[id];
        } else {
          for (const peer of group.querySelectorAll<HTMLElement>('[data-pick]')) if (peer.dataset.scope === el.dataset.scope) selections[peer.dataset.reactTaskId!] = false;
          selections[id] = true;
        }
      } else {
        selections[id] = !selections[id];
        if (runtime.options.verbState && el.matches('.verbWord')) {
          const i = [...document.querySelectorAll('.verbWord')].indexOf(el);
          runtime.options.saveVerbSelection?.(i, selections[id]);
        }
      }
      snapshot = {...snapshot, selections};
      listeners.forEach(fn => fn());
    },
    checkTask(button) {
      if (!runtime) return;
      const fields = {...snapshot.fields}, taskResults = {...snapshot.taskResults};
      let ok = true;
      let host: {dataset: {key?: string}};
      let key: string;
      const section = sectionTasks[button.id];
      if (section) {
        host = {dataset: {key: '#' + button.id}};
        key = section.feedback;
        document.querySelectorAll<HTMLInputElement | HTMLSelectElement>(section.selector).forEach((el, i) => {
          const correct = el.value.trim() === section.answers[i];
          fields[el.dataset.reactAnswerId!] = correct;
          ok &&= correct;
        });
      } else if (button.closest('[data-answer-group]')) {
        const group = button.closest('[data-answer-group]') as HTMLElement;
        const buttons = [...group.querySelectorAll<HTMLElement>('[data-pick]')];
        host = (group.closest('.batchQuiz') || group) as HTMLElement;
        key = group.dataset.reactTaskId!;
        let any = false;
        for (const el of buttons) {
          const picked = el.classList.contains('picked');
          if (picked) {
            any = true;
            const correct = el.dataset.correct === 'true';
            fields[el.dataset.reactTaskId!] = correct;
            ok &&= correct;
          } else if (el.dataset.correct === 'true' && el.dataset.required === 'true') {
            fields[el.dataset.reactTaskId!] = false;
            ok = false;
          }
        }
        ok &&= any;
      } else {
        const group = button.dataset.checkMarks ? document.querySelector(button.dataset.checkMarks) as HTMLElement : document.body;
        key = button.dataset.checkMarks ? group.id : 'verbs';
        host = {dataset: {key}};
        for (const el of group.querySelectorAll<HTMLElement>(button.dataset.checkMarks ? '.markWord' : '.verbWord')) {
          const selected = el.classList.contains('selectedVerb');
          const target = (button.dataset.checkMarks ? el.dataset.target : el.dataset.verb) === 'true';
          const correct = selected === target;
          fields[el.dataset.reactTaskId!] = selected || target ? correct : undefined;
          ok &&= correct;
        }
      }
      taskResults[key!] = ok;
      snapshot = {...snapshot, fields, taskResults};
      runtime.commitResult(host!, ok);
      listeners.forEach(fn => fn());
    },
    resetPage(page) {
      const next={results:{...snapshot.results},fields:{...snapshot.fields},selections:{...snapshot.selections},taskResults:{...snapshot.taskResults}};
      for(const form of page.querySelectorAll<HTMLFormElement>('form'))delete next.results[form.dataset.key||form.id];
      for(const el of page.querySelectorAll<HTMLElement>('[data-react-answer-id],[data-react-task-id],[id]')){
        if(el.dataset.reactAnswerId)delete next.fields[el.dataset.reactAnswerId];
        if(el.dataset.reactTaskId){delete next.selections[el.dataset.reactTaskId];delete next.fields[el.dataset.reactTaskId];delete next.taskResults[el.dataset.reactTaskId]}
        if(el.id)delete next.taskResults[el.id];
      }
      if(page.querySelector('.verbWord'))delete next.taskResults.verbs;for(const el of page.querySelectorAll<HTMLElement>('.verbWord')){const i=[...document.querySelectorAll('.verbWord')].indexOf(el);runtime?.options.saveVerbSelection?.(i,false)}
      page.querySelectorAll('.answerCorrect,.answerWrong').forEach(el=>el.classList.remove('answerCorrect','answerWrong'));
      snapshot=next;listeners.forEach(fn=>fn());
    },
    submit(form) {
      if (!runtime) return;
      const result = evaluateQuiz(form, runtime.options);
      const key = form.dataset.key || form.id;
      const fields = {...snapshot.fields};
      for (const {el, ok} of result.statuses) {
        if (el.dataset.reactAnswerId) fields[el.dataset.reactAnswerId] = ok;
        else {
          el.classList.toggle('answerCorrect', ok);
          el.classList.toggle('answerWrong', !ok);
        }
      }
      snapshot = {...snapshot, results: {...snapshot.results, [key]: result.ok}, fields};
      runtime.commitResult(form, result.ok);
      listeners.forEach(fn => fn());
    }
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Attrs = Record<string, any>;

export function QuizForm({attrs, children}: {attrs: Attrs; children: ReactNode[]}) {
  const store = useContext(QuizContext)!;
  return createElement('form', {...attrs, onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => {e.preventDefault(); flushSync(() => store.submit(e.currentTarget));}}, ...children);
}

export function QuizFeedback({tag, attrs, formKey, children}: {tag: string; attrs: Attrs; formKey: string; children: ReactNode[]}) {
  const store = useContext(QuizContext)!;
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  const result = snapshot.results[formKey];
  return createElement(tag, {...attrs, className: result === undefined ? attrs.className : 'feedback ' + (result ? 'good' : 'retry')}, result === undefined ? children : result ? '✓ Richtig!' : 'Noch nicht ganz. Hören Sie noch einmal.');
}

export function AnswerField({tag, attrs, answerId, children}: {tag: string; attrs: Attrs; answerId: string; children: ReactNode[]}) {
  const store = useContext(QuizContext)!;
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  const status = snapshot.fields[answerId];
  const props = {...attrs, 'data-react-answer-id': answerId, className: (attrs.className || '') + (status === undefined ? '' : status ? ' answerCorrect' : ' answerWrong')};
  if (['input', 'select', 'textarea'].includes(tag)) return createElement(PersistentField, {tag, attrs: props, children});
  return createElement(tag, props, ...children);
}
