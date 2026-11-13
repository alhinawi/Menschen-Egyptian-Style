import {useSyncExternalStore} from 'react';
import {createPortal} from 'react-dom';
import {selectionStore} from './selectionStore';

export function SelectionControls() {
  const s = useSyncExternalStore(selectionStore.subscribe, selectionStore.getSnapshot, selectionStore.getSnapshot);
  return <><span className="translationControls"><button aria-label={s.mode === 'word' ? 'Translate: Word' : 'Translate: Sentence'} title={s.mode === 'word' ? 'Translate: Word' : 'Translate: Sentence'} className="meaningModeToggle" type="button" lang="en" aria-pressed={s.mode === 'sentence'} onClick={() => selectionStore.act('toggleMode')}>{s.mode === 'word' ? 'Word' : 'Sentence'}</button></span>{createPortal(<button type="button" className="selectionMeaningAction" lang="en" hidden={s.actionHidden} aria-label="Translate selection and listen" onPointerDown={e => e.preventDefault()} onClick={() => selectionStore.act('translate')}>Translate selection and listen</button>, document.body)}</>;
}
