// Exercise feedback must never become the lesson player's source. Duck the
// current lesson while feedback is audible and restore its exact volume.
let lesson:HTMLAudioElement|null=null;
let feedback:HTMLAudioElement|null=null;
const volumes=new Map<HTMLAudioElement,number>();
function restore(){for(const [audio,volume]of volumes){audio.volume=volume;}volumes.clear();}
function duck(audio:HTMLAudioElement){if(!volumes.has(audio))volumes.set(audio,audio.volume);audio.volume=Math.min(audio.volume,0.15);}
export const isFeedbackAudio=(audio:HTMLAudioElement)=>audio.dataset.readerAudioRole==='feedback';
export function noteLessonAudio(audio:HTMLAudioElement){if(isFeedbackAudio(audio))return;lesson=audio;if(feedback&&!feedback.paused&&!feedback.ended)duck(audio);}
export function prepareFeedbackAudio(audio:HTMLAudioElement){
 audio.dataset.readerAudioRole='feedback';
 if(audio.dataset.feedbackPrepared)return;
 audio.dataset.feedbackPrepared='true';
 const start=()=>{feedback=audio;if(lesson&&!lesson.paused&&!lesson.ended)duck(lesson);};
 const finish=()=>{if(feedback===audio){feedback=null;restore();}};
 audio.addEventListener('play',start);
 for(const event of ['ended','pause','error','abort','emptied'])audio.addEventListener(event,finish);
}
