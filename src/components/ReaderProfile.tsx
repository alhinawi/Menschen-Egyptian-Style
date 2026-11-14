import {useContext, useEffect, useRef, useState, useSyncExternalStore} from 'react';
import {ReaderContext} from './ReaderControls';

// Profile avatar in the reader toolbar, where the theme button used to sit.
// Login/profile and language switching need accounts and i18n that do not
// exist yet, so those entries are marked قريبا (coming soon). The sound row
// is live: it drives the same sound state as the toolbar sound button.
export function ReaderProfile() {
  const store = useContext(ReaderContext)!;
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  const [open, setOpen] = useState(false);
  const anchor = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => {
      // The sound row forwards a programmatic click to the toolbar sound
      // button; that click must not count as "outside" and close the panel.
      const target = e.target as Element | null;
      if (!anchor.current?.contains(target) && !target?.closest?.('.soundToggle')) setOpen(false);
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('click', away);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('click', away);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);
  const soundOn = snapshot.soundOn !== false;
  return (
    <span data-react-theme-slot="" className="profileAnchor" ref={anchor}>
      <button
        type="button"
        className="profileTrigger"
        aria-label="Profile and settings"
        title="Profile and settings"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <svg viewBox="0 0 24 24" width={22} height={22} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="3.6" />
          <path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />
        </svg>
      </button>
      {open && (
        <div className="profilePanel" dir="rtl" role="dialog" aria-label="الحساب والإعدادات">
          <div className="profileRow">
            <span>تسجيل الدخول والبروفايل</span>
            <span className="profileSoon">قريبا</span>
          </div>
          <div className="profileSection">الإعدادات</div>
          <button
            type="button"
            className="profileRow profileChoice"
            aria-pressed={soundOn}
            onClick={() => (document.querySelector('.soundToggle') as HTMLButtonElement | null)?.click()}
          >
            <span>الصوت</span>
            <span className="profileState">{soundOn ? 'شغال' : 'مقفول'}</span>
          </button>
          <div className="profileSection">اللغة</div>
          <div className="profileRow">
            <span>العربية</span>
            <span className="profileSoon">قريبا</span>
          </div>
          <div className="profileRow">
            <span lang="en">English</span>
            <span className="profileSoon">قريبا</span>
          </div>
        </div>
      )}
    </span>
  );
}
