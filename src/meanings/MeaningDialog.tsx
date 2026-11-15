import {germanGloss} from './german-glosses';
import {useUiLanguage} from '../ui-language';
import {useTranslationLanguage} from './translation-language';
import {englishGloss} from './english-glosses';
import {useSyncExternalStore} from 'react';
import {createPortal} from 'react-dom';
import './automatic-translation.css';
import {meaningStore} from './meaningStore';

export function MeaningDialog() {
  const {t} = useUiLanguage();
  const {target} = useTranslationLanguage();
  const s = useSyncExternalStore(meaningStore.subscribe, meaningStore.getSnapshot, meaningStore.getSnapshot);
  const english = englishGloss(s.german);
  const german = germanGloss(s.german);
  const gloss = target==='de'?german:english;
  return createPortal(<dialog data-translation-language={target} data-translation-source={target!=='ar'?(gloss?'reviewed':'missing'):(s.machine?'machine':'curated')} data-translation-state={s.machineState} className="meaningPopup" onClose={() => meaningStore.act('pause')} onClick={e => {if (e.target === e.currentTarget) e.currentTarget.close();}}><div className="meaningHeader flex items-center justify-between gap-2"><div className="meaningModes flex gap-1.5"><button className={'meaningWord' + (s.mode === 'word' ? ' selected' : '')} type="button" lang="en" disabled={s.wordDisabled} onClick={() => meaningStore.act('word')}>Word</button><button className={'meaningSentence' + (s.mode === 'sentence' ? ' selected' : '')} type="button" lang="en" disabled={s.sentenceDisabled} onClick={() => meaningStore.act('sentence')}>Sentence</button></div><button type="button" className="meaningClose" aria-label="Close" onClick={e => (e.currentTarget.closest('dialog') as HTMLDialogElement | null)?.close()}>×</button></div><h3 lang="de" className="meaningGerman">{s.german}</h3><p aria-live="polite" className="meaningArabic meaningTranslation" lang={target==='ar'?'ar-EG':target} dir={target==='ar'?'rtl':'ltr'}>{target==='ar'?s.arabic:(gloss || t(target==='de'?'German explanation is not available for this text yet.':'English translation is not available for this text yet.'))}</p>{target==='ar'&&s.machineState==='error'&&<button type="button" className="machineRetry" lang="en" onClick={()=>meaningStore.act('retryTranslation')}>Translate again</button>}<button type="button" className="pronounceButton" lang="en" disabled={s.audioDisabled} onClick={() => meaningStore.act('play')}>♫ Listen</button></dialog>, document.body);
}
