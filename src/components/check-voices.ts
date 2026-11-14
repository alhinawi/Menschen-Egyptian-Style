// Voice clips a failed check teases the learner with. Adding a clip: drop the mp3 into
// src/assets/feedback and add one import + one list entry here. A check that found
// filled-but-wrong answers picks at random from wrongVoices; one with fields still empty
// or only partly solved picks from incompleteVoices. The same clip never plays twice in a
// row within a pool, and clips download lazily on the first failed check.
import wrongVoice1 from '../assets/feedback/wrong01_fashel.mp3?url';
import wrongVoice2 from '../assets/feedback/wrong02_rakkiz.mp3?url';
import emptyVoice1 from '../assets/feedback/empty01_fady.mp3?url';
import emptyVoice2 from '../assets/feedback/empty02_gaweb.mp3?url';

export const wrongVoices: string[] = [wrongVoice1, wrongVoice2];
export const incompleteVoices: string[] = [emptyVoice1, emptyVoice2];
