import {useSyncExternalStore} from 'react';
import {createPortal} from 'react-dom';
import {meaningStore} from './meaningStore';

export function MeaningDialog() {
  const s = useSyncExternalStore(meaningStore.subscribe, meaningStore.getSnapshot, meaningStore.getSnapshot);
  return createPortal(<dialog className="meaningPopup" onClose={() => meaningStore.act('pause')} onClick={e => {if (e.target === e.currentTarget) e.currentTarget.close();}}><div className="meaningHeader flex items-center justify-between gap-2"><div className="meaningModes flex gap-1.5"><button className={'meaningWord' + (s.mode === 'word' ? ' selected' : '')} type="button" lang="ar" disabled={s.wordDisabled} onClick={() => meaningStore.act('word')}>الكلمة</button><button className={'meaningSentence' + (s.mode === 'sentence' ? ' selected' : '')} type="button" lang="ar" disabled={s.sentenceDisabled} onClick={() => meaningStore.act('sentence')}>الجملة</button></div><button type="button" className="meaningClose" aria-label="Schließen" onClick={e => (e.currentTarget.closest('dialog') as HTMLDialogElement | null)?.close()}>×</button></div><h3 lang="de" className="meaningGerman">{s.german}</h3><p className="meaningArabic" lang="ar-EG" dir="rtl">{s.arabic}</p><button type="button" className="pronounceButton" lang="ar-EG" disabled={s.audioDisabled} onClick={() => meaningStore.act('play')}>♫ اسمع النطق</button><small lang="ar-EG" dir="rtl" className="audioPending" hidden={s.pendingHidden}>{s.pending}</small></dialog>, document.body);
}
