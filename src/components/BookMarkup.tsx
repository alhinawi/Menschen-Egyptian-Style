import {CheckButton} from './CheckButton';
import {PageImage} from './PageImage';
import {renderNative} from './nativeComponents';
import {WordBank} from '../exercises/WordBank';
import {RatingDot} from '../persistence/RatingDot';
import {TaskControl, TaskFeedback, TaskMode} from '../exercises/CustomTasks';
import {createElement, memo, useLayoutEffect} from 'react';
import type {ReactNode} from 'react';
import {CoverSocials} from './CoverSocials';
import {navigateHref} from '../navigate';
import {SelectionControls} from '../meanings/SelectionControls';
import {PersistentField} from '../persistence/PersistentFields';
import {QuizForm, QuizFeedback, AnswerField} from '../exercises/QuizState';
import {ReaderControl, ZoomValue} from './ReaderControls';
import type {MarkupAttrs, MarkupNode} from '../types/book';

export const READER_HELP='اضغط على الكلمة لمعناها بالمصري · كبّر للقراءة · اسحب يمين أو شمال للتقليب';

const aliases: Record<string, string> = {class: 'className', for: 'htmlFor', tabindex: 'tabIndex', readonly: 'readOnly', maxlength: 'maxLength', colspan: 'colSpan', rowspan: 'rowSpan', contenteditable: 'contentEditable', autoplay: 'autoPlay', playsinline: 'playsInline', crossorigin: 'crossOrigin', srcset: 'srcSet', viewbox: 'viewBox', spellcheck: 'spellCheck', autofocus: 'autoFocus'};
const booleans = new Set(['hidden', 'disabled', 'checked', 'multiple', 'selected', 'controls', 'loop', 'autoplay', 'muted', 'required', 'readonly', 'open', 'autofocus', 'novalidate']);

function style(value: string): Record<string, string> {
  return Object.fromEntries(value.split(';').filter(x => x.includes(':')).map(x => {
    const i = x.indexOf(':');
    const k = x.slice(0, i).trim();
    return [k.startsWith('--') ? k : k.replace(/-([a-z])/g, (_, x: string) => x.toUpperCase()), x.slice(i + 1).trim()];
  }));
}

// Attributes are forwarded to DOM elements verbatim, so they stay `any` here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = Record<string, any>;

function render(node: MarkupNode, key: string | number, formKey: string | null = null, quizEnabled = false, taskKey: string | null = null, standalone = false): ReactNode {
  const path = String(key);
  if (typeof node === 'string') return node;
  const [tag, attrs, children] = node;
  if(attrs.class?.split(' ').includes('helpBanner'))return <div key={key} className="helpBanner" dir="rtl" lang="ar-EG">{READER_HELP}</div>;
  if(attrs.id==='palette')return <button key={key} id="palette" hidden aria-hidden="true" tabIndex={-1} style={{display:'none'}}/>;
  if(attrs.class?.split(' ').includes('controls')) {
    const navigation=children.filter(child=>Array.isArray(child)&&['prev','pageJump','next'].includes(child[1].id));
    const tools=children.filter(child=>!navigation.includes(child));
    return <nav key={key} className="controls"><div className="readerPageNavigation" aria-label="Page navigation">{navigation.map((child,n)=>render(child,`page-nav-${key}-${n}`,null,quizEnabled,null,standalone))}</div><div className="readerToolRow">{tools.map((child,n)=>render(child,`bottom-tool-${key}-${n}`,null,quizEnabled,null,standalone))}</div></nav>;
  }

  const props: Props = {key};
  // Legacy adapters still write this marker; it is no longer a toolbar item.
  if (attrs.id === 'progress') return createElement('span', {key, id: 'progress', hidden: true, 'aria-hidden': true, style: {display: 'none'}});
  const native = renderNative(tag, attrs, key);
  if (native !== undefined) return native;
  if (tag === 'ReactTaskMode') return createElement(TaskMode, {key, kind: attrs.kind});
  if (tag === 'ReactSelectionControls') return createElement(SelectionControls, {key});
  for (const [k, v] of Object.entries(attrs)) {
    if (k.startsWith('on')) {
      if (k === 'onclick' && v === 'history.back()') props.onClick = () => history.back();
      else if (k === 'onclick' && v === "window.open(this.src,'_blank')") props.onClick = (e: React.MouseEvent<HTMLImageElement>) => window.open(e.currentTarget.src, '_blank', 'noopener');
      else if (k === 'onchange' && v === 'location.href=this.value') props.onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {void navigateHref(e.currentTarget.value);};
      continue;
    }
    if (k === 'selected') continue;
    if (k === 'style') props.style = style(v);
    else if (k === 'value' && ['input', 'select', 'textarea'].includes(tag)) props.defaultValue = v;
    else if (k === 'checked') props.defaultChecked = true;
    else props[aliases[k] || k] = booleans.has(k) ? true : v;
  }
  if (attrs.class?.split(' ').includes('coverSocials')) return createElement(tag, props, createElement(CoverSocials));
  if (tag === 'select') {
    const selected = children.filter((n): n is [string, MarkupAttrs, MarkupNode[]] => Array.isArray(n) && n[0] === 'option' && 'selected' in n[1]).map(n => n[1].value ?? n[2].join(''));
    if (selected.length) props.defaultValue = props.multiple ? selected : selected[0];
  }
  if (tag === 'img' && attrs.id === 'paper') return createElement(tag, props);
  if (tag === 'img') return createElement(PageImage, props);
  if (tag === 'textarea') {
    props.defaultValue = children.join('');
    return createElement(PersistentField, {key, tag, attrs: props, children: []});
  }
  if (tag === 'form' && (attrs.class?.split(' ').some(c => ['batchQuiz', 'simpleQuiz'].includes(c)) || ['names', 'speakers'].includes(attrs.id)) && quizEnabled) formKey = attrs['data-key'] || attrs.id;
  if ('data-answer-group' in attrs) {
    taskKey = path;
    props['data-react-task-id'] = path;
  }
  const rendered = children.map((child, i) => render(child, path + '.' + i, formKey, quizEnabled, taskKey, standalone));
  if (attrs.class?.split(' ').includes('markBank')) return createElement(WordBank, {key, tag, attrs: props, words: children.join('').split('|').map(w => w.trim()).filter(Boolean)});
  if (attrs.class?.split(' ').includes('rateDot')) return createElement(RatingDot, {key, tag, attrs: props, children: rendered});
  if (quizEnabled) {
    if (['originFeedback', 'musicFeedback', 'verbsFeedback'].includes(attrs.id)) return createElement(TaskFeedback, {key, tag, attrs: {...props, 'data-task-feedback': attrs.id, 'data-section-feedback': 'true'}, children: rendered});
    if (taskKey && attrs.class?.split(' ').includes('feedback')) return createElement(TaskFeedback, {key, tag, attrs: {...props, 'data-task-feedback': taskKey}, children: rendered});
    if (['checkOrigin', 'checkMusic', 'verbs'].includes(attrs.id) || 'data-check-verbs' in attrs || 'data-check-marks' in attrs || 'data-pick' in attrs || attrs.class?.split(' ').some(c => ['verbWord', 'markWord'].includes(c)) || taskKey && tag === 'button' && attrs.class?.split(' ').includes('check')) return createElement(TaskControl, {key, tag, attrs: {...props, 'data-react-task-id': path}, children: rendered});
    if (attrs['data-section-field']) return createElement(AnswerField, {key, tag, attrs: props, answerId: path, children: rendered});
  }
  if (formKey && quizEnabled) {
    if (tag === 'form') return createElement(QuizForm, {key, attrs: props, children: rendered});
    if (attrs.class?.split(' ').includes('feedback')) return createElement(QuizFeedback, {key, tag, attrs: props, formKey, children: rendered});
    if ('data-answer' in attrs) return createElement(AnswerField, {key, tag, attrs: props, answerId: formKey + ':' + path, children: rendered});
  }
  if (!standalone && (['prev', 'next', 'plus', 'minus', 'fit', 'pageJump', 'lessonNav', 'closeAudio', 'palette', 'audioToggle', 'clearMap'].includes(attrs.id) || attrs.class?.split(' ').some(c => ['soundToggle', 'listen', 'coverOpen'].includes(c)) || 'data-jump' in attrs || 'data-color' in attrs)) return createElement(ReaderControl, {key, tag, attrs: {...props, 'data-react-control-id': path}, children: rendered});
  if (attrs.id === 'zoomValue') return createElement(ZoomValue, {key, tag, attrs: props, children: rendered});
  if (['input', 'select'].includes(tag)) return createElement(PersistentField, {key, tag, attrs: props, children: rendered});
  if(tag==='button'&&children.some(c=>typeof c==='string'&&c.includes('Prüfen')))return createElement(CheckButton,props);
  return createElement(tag, props, ...rendered);
}

// The printed content is immutable. PageFlip and exercise adapters own their
// documented DOM islands until their React ports replace those adapters.
export const BookMarkup = memo(function BookMarkup({nodes, quizEnabled = false}: {nodes: MarkupNode[]; quizEnabled?: boolean}) {
  const hasControls=(items:MarkupNode[]):boolean=>items.some(node=>typeof node!=='string'&&(node[1].class?.split(' ').includes('controls')||hasControls(node[2])));
  const controls=hasControls(nodes);
  useLayoutEffect(() => {
    if (!controls) return;
    const header = document.querySelector<HTMLElement>('header:not(.page header)');
    const bar = document.querySelector<HTMLElement>('.controls');
    const sync = () => {
      document.body.classList.add('readerSplitControls');
      document.documentElement.style.setProperty('--reader-header-height', `${header?.getBoundingClientRect().height || 60}px`);
      document.documentElement.style.setProperty('--reader-controls-height', `${bar?.getBoundingClientRect().height || 56}px`);
    };
    const observer = new ResizeObserver(sync);if(header)observer.observe(header);if(bar)observer.observe(bar);sync();
    return () => {observer.disconnect();document.body.classList.remove('readerSplitControls');};
  }, [nodes]);
  const standalone = nodes.some(node => typeof node !== 'string' && node[1].id === 'canvas');
  return <>{nodes.map((node,i)=>render(node,i,null,quizEnabled,null,standalone))}</>;
});
