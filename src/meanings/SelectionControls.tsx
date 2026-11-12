import {useSyncExternalStore} from 'react';
import {createPortal} from 'react-dom';
import {selectionStore} from './selectionStore';

export function SelectionControls() {
  const s = useSyncExternalStore(selectionStore.subscribe, selectionStore.getSnapshot, selectionStore.getSnapshot);
  return <><span className="translationControls"><button aria-label={s.mode === 'word' ? 'Übersetzen: Wort' : 'Übersetzen: Satz'} title={s.mode === 'word' ? 'Übersetzen: Wort' : 'Übersetzen: Satz'} className="meaningModeToggle" type="button" lang="de" aria-pressed={s.mode === 'sentence'} onClick={() => selectionStore.act('toggleMode')}>{s.mode === 'word' ? 'Wort' : 'Satz'}</button><button aria-label={s.selecting ? 'Textauswahl: Frei' : 'Textauswahl: Gesperrt'} title={s.selecting ? 'Textauswahl: Frei' : 'Textauswahl: Gesperrt'} className="selectionModeToggle" type="button" lang="de" aria-pressed={s.selecting} onClick={() => selectionStore.act('toggleSelection')}>{s.selecting ? 'Frei' : 'Gesperrt'}</button></span>{createPortal(<button type="button" className="selectionMeaningAction" lang="de" hidden={s.actionHidden} aria-label="Auswahl übersetzen und anhören" onPointerDown={e => e.preventDefault()} onClick={() => selectionStore.act('translate')}>Auswahl übersetzen und anhören</button>, document.body)}</>;
}
