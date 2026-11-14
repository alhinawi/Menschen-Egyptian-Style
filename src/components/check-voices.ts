// Voice clips a finished check plays. Adding a clip: drop the mp3 into src/assets/feedback
// and add one import + one list entry here. A check that found filled-but-wrong answers
// picks at random from wrongVoices; one with fields still empty or only partly solved picks
// from incompleteVoices; a fully correct check picks from correctVoices. The same clip never
// plays twice in a row within a pool, and clips download lazily on the first played check.
import wrongVoice1 from '../assets/feedback/wrong01_fashel.mp3?url';
import wrongVoice2 from '../assets/feedback/wrong02_rakkiz.mp3?url';
import wrongVoice3 from '../assets/feedback/wrong04_yabni.mp3?url';
import wrongVoice4 from '../assets/feedback/wrong05_mosatl.mp3?url';
import wrongVoice5 from '../assets/feedback/wrong06_kamel.mp3?url';
import wrongVoice6 from '../assets/feedback/wrong07_minya.mp3?url';
import wrongTone from '../assets/feedback/err04_double.mp3?url';
import emptyVoice1 from '../assets/feedback/empty01_fady.mp3?url';
import emptyVoice2 from '../assets/feedback/empty02_gaweb.mp3?url';
import laughVoice1 from '../assets/feedback/laugh01_rakkiz.mp3?url';
import rightVoice1 from '../assets/feedback/right01_aywa.mp3?url';
import rightVoice2 from '../assets/feedback/right02_aash.mp3?url';
import rightVoice3 from '../assets/feedback/right03_yasalam.mp3?url';
import rightVoice4 from '../assets/feedback/right04_bismallah.mp3?url';
import rightVoice5 from '../assets/feedback/right05_mdammer.mp3?url';
import sparkleTone from '../assets/feedback/ok06_sparkle.mp3?url';

export const wrongVoices: string[] = [wrongVoice1, wrongVoice2, wrongVoice3, wrongVoice4, wrongVoice5, wrongVoice6, wrongTone, laughVoice1];
export const incompleteVoices: string[] = [emptyVoice1, emptyVoice2, laughVoice1, wrongVoice2];
export const correctVoices: string[] = [rightVoice1, rightVoice2, rightVoice3, rightVoice4, rightVoice5, sparkleTone];
