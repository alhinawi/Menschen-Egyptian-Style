import {useContext, useEffect, useRef, useState, useSyncExternalStore} from 'react';
import {getFeedbackVoices, setFeedbackVoices, subscribeFeedbackVoices} from './check-sound-preference';
import {ReaderContext} from './ReaderControls';
import {useAuth, signIn, signUp, signOut} from '../auth/useAuth';
import {getAuthConfig, googleLoginUrl} from '../auth/api';

// Profile avatar in the reader toolbar. The panel holds the live account
// (Google sign-in or email/password via the Menscheny API) plus the sound
// setting; language switching is still قريبا. Arabic in the panel is set in
// Cairo (see tailwind.css) to match the site's typography standard.
export function ReaderProfile() {
  const store = useContext(ReaderContext)!;
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  const voicesOn = useSyncExternalStore(subscribeFeedbackVoices, getFeedbackVoices, () => false);
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [googleOn, setGoogleOn] = useState(false);
  const anchor = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    let live = true;
    getAuthConfig().then((c) => {
      if (live) setGoogleOn(c.google);
    });
    const away = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!anchor.current?.contains(target) && !target?.closest?.('.soundToggle')) setOpen(false);
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('click', away);
    document.addEventListener('keydown', escape);
    return () => {
      live = false;
      document.removeEventListener('click', away);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  const soundOn = snapshot.soundOn !== false;
  const avatar = auth.user?.avatar ?? null;

  return (
    <span data-react-theme-slot="" className="profileAnchor" ref={anchor}>
      <button
        type="button"
        className="profileTrigger"
        aria-label="الحساب والإعدادات"
        title="الحساب والإعدادات"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        {avatar ? (
          <img className="profileAvatarImg" src={avatar} alt="" referrerPolicy="no-referrer" />
        ) : (
          <svg viewBox="0 0 24 24" width={22} height={22} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="3.6" />
            <path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />
          </svg>
        )}
      </button>
      {open && (
        <div className="profilePanel" dir="rtl" role="dialog" aria-label="الحساب والإعدادات">
          {auth.status === 'authed' && auth.user ? (
            <SignedInBlock name={auth.user.name} email={auth.user.email} avatar={avatar} onSignOut={() => void signOut()} />
          ) : (
            <SignInBlock googleOn={googleOn} />
          )}
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
          <button
            type="button"
            className="profileRow profileChoice profileVoiceChoice"
            role="switch"
            aria-checked={voicesOn}
            aria-label="أصوات الناس"
            aria-describedby="feedbackVoicesHint"
            onClick={() => setFeedbackVoices(!voicesOn)}
          >
            <span className="profileVoiceLabel">
              <span>أصوات الناس</span>
              <small id="feedbackVoicesHint">تعليقات صوتية مع نتيجة الحل</small>
            </span>
            <span className="profileVoiceSwitch" data-on={voicesOn} aria-hidden="true"><span /></span>
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

function SignedInBlock({name, email, avatar, onSignOut}: {name: string; email: string; avatar: string | null; onSignOut: () => void}) {
  return (
    <>
      <div className="profileRow authUserRow">
        {avatar ? (
          <img className="authUserAvatar" src={avatar} alt="" referrerPolicy="no-referrer" />
        ) : (
          <span className="authUserAvatar authUserInitial" aria-hidden="true">{name.trim().charAt(0) || '؟'}</span>
        )}
        <span className="authUserText">
          <b>{name}</b>
          <small dir="ltr">{email}</small>
        </span>
      </div>
      <button type="button" className="authBtn authBtnGhost" onClick={onSignOut}>
        تسجيل الخروج
      </button>
    </>
  );
}

function SignInBlock({googleOn}: {googleOn: boolean}) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      if (mode === 'login') await signIn(email, password);
      else await signUp(name, email, password);
    } catch (e) {
      const code = e instanceof Error ? e.message : '';
      setError(
        code === 'invalid_credentials'
          ? 'البريد أو كلمة السر مش صح'
          : code === 'validation_failed'
            ? 'راجع البيانات: اسم من حرفين، بريد صحيح، وكلمة سر 8 أحرف على الأقل'
            : 'حصلت مشكلة في الاتصال. جرّب تاني.',
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="profileSection">الحساب</div>
      {googleOn && (
        <a className="authBtn authBtnGoogle" href={googleLoginUrl()}>
          <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden="true">
            <path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.1h6.5c-.1 1.1-.8 2.7-2.4 3.8l3.7 2.9c2.3-2.1 3.7-5.2 3.7-8.6z"/>
            <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.7-2.9c-1 .7-2.4 1.2-4.2 1.2-3.2 0-5.9-2.1-6.8-5.1L1.3 17.2C3.3 21.2 7.3 24 12 24z"/>
            <path fill="#FBBC05" d="M5.2 14.3c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.3 6.8C.5 8.4 0 10.1 0 12s.5 3.6 1.3 5.2l3.9-2.9z"/>
            <path fill="#EA4335" d="M12 4.7c1.8 0 3 .8 3.7 1.4l3.3-3.2C17.9 1.1 15.2 0 12 0 7.3 0 3.3 2.8 1.3 6.8l3.9 2.9c.9-2.9 3.6-5 6.8-5z"/>
          </svg>
          الدخول بحساب Google
        </a>
      )}
      {googleOn && <div className="authOr">أو بالبريد</div>}
      <form
        className="authForm"
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
      >
        {mode === 'register' && (
          <input
            className="authInput"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="الاسم"
            autoComplete="name"
            required
            minLength={2}
          />
        )}
        <input
          className="authInput"
          type="email"
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="البريد الإلكتروني"
          autoComplete="email"
          required
        />
        <input
          className="authInput"
          type="password"
          dir="ltr"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={mode === 'register' ? 'كلمة سر (8 أحرف على الأقل)' : 'كلمة السر'}
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          required
          minLength={8}
        />
        {error && <div className="authError" role="alert">{error}</div>}
        <button className="authBtn authBtnPrimary" type="submit" disabled={busy}>
          {busy ? 'لحظة…' : mode === 'login' ? 'تسجيل الدخول' : 'إنشاء الحساب'}
        </button>
        <button
          type="button"
          className="authSwitch"
          onClick={() => {
            setMode((m) => (m === 'login' ? 'register' : 'login'));
            setError(null);
          }}
        >
          {mode === 'login' ? 'لسه ماعندكش حساب؟ سجّل جديد' : 'عندك حساب بالفعل؟ ادخل'}
        </button>
      </form>
    </>
  );
}
