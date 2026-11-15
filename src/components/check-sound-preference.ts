// One opt-in for all books and all feedback voice pools. No saved value means plain SFX.
const key = 'menschen.feedbackVoices';
const changed = 'menschen-feedback-voices-changed';
let enabled = false;
try { enabled = localStorage.getItem(key) === 'true'; } catch { /* Private storage can be unavailable. */ }
export const getFeedbackVoices = () => enabled;
export function setFeedbackVoices(value: boolean) {
  enabled = value;
  try { localStorage.setItem(key, String(value)); } catch { /* Keep the choice for this session. */ }
  window.dispatchEvent(new Event(changed));
}
export function subscribeFeedbackVoices(notify: () => void) {
  const storage = (event: StorageEvent) => {
    if (event.key !== key && event.key !== null) return;
    enabled = event.newValue === 'true' && event.key === key;
    notify();
  };
  window.addEventListener(changed, notify);
  window.addEventListener('storage', storage);
  return () => {
    window.removeEventListener(changed, notify);
    window.removeEventListener('storage', storage);
  };
}
