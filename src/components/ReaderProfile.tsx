import {useTranslationLanguage} from '../meanings/translation-language';
import {useUiLanguage} from '../ui-language';
import {useContext, useEffect, useRef, useState, useSyncExternalStore} from 'react';
import {getFeedbackVoices, setFeedbackVoices, subscribeFeedbackVoices} from './check-sound-preference';
import {ReaderContext} from './ReaderControls';
import {useAuth, signIn, signUp, signOut, applyUser} from '../auth/useAuth';
import {AvatarPicker} from './AvatarPicker';
import {LeaderboardPanel} from './LeaderboardPanel';
import {getAuthConfig, googleLoginUrl, lastGoogleAccount, resendVerification} from '../auth/api';
import type {ApiUser} from '../auth/api';
import {getSyncStatus, subscribeSyncStatus} from '../auth/progress-sync';

// Profile avatar in the reader toolbar. The panel holds the live account
// (Google sign-in or email/password via the Menscheny API) plus the sound
// setting and persisted interface language. Arabic in the panel is set in
// Cairo (see tailwind.css) to match the site's typography standard.
export function ReaderProfile() {
  const {language, t, setLanguage} = useUiLanguage();
  const {choice, setTranslationLanguage} = useTranslationLanguage();
  const store = useContext(ReaderContext)!;
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  const voicesOn = useSyncExternalStore(subscribeFeedbackVoices, getFeedbackVoices, () => false);
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [googleOn, setGoogleOn] = useState(false);
  const [verifyOn, setVerifyOn] = useState(false);
  const [board, setBoard] = useState(false);
  const anchor = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    let live = true;
    getAuthConfig().then((c) => {
      if (!live) return;
      setGoogleOn(c.google);
      setVerifyOn(c.emailVerification);
    });
    const away = (e: MouseEvent) => {
      const target = e.target as Element | null;
      // A click that unmounted its own target (e.g. saving inside the avatar
      // crop overlay) bubbles from a detached node - it was a panel action,
      // not an outside click.
      if (target && !target.isConnected) return;
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
  // A stored photo URL that stops loading (e.g. a changed Google picture)
  // falls back to the initial placeholder instead of a broken image.
  const [avatarBroken, setAvatarBroken] = useState(false);
  useEffect(() => setAvatarBroken(false), [avatar]);
  const showAvatar = avatar && !avatarBroken ? avatar : null;

  return (
    <span data-react-theme-slot="" className="profileAnchor" ref={anchor}>
      <button
        type="button"
        className="profileTrigger"
        aria-label={t('الحساب والإعدادات')}
        title={t('الحساب والإعدادات')}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {setOpen(o => !o); setBoard(false);}}
      >
        {showAvatar ? (
          <img className="profileAvatarImg" src={showAvatar} alt="" referrerPolicy="no-referrer" onError={() => setAvatarBroken(true)} />
        ) : (
          <svg viewBox="0 0 24 24" width={22} height={22} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="3.6" />
            <path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />
          </svg>
        )}
      </button>
      {open && (
        <div className="profilePanel" dir={language === 'ar' ? 'rtl' : 'ltr'} role="dialog" aria-label={t('الحساب والإعدادات')}>
          {!board && <>
          {auth.status === 'authed' && auth.user ? (
            <SignedInBlock user={auth.user} avatar={showAvatar} onSignOut={() => void signOut()} onAvatarError={() => setAvatarBroken(true)} />
          ) : (
            <SignInBlock googleOn={googleOn} />
          )}
          {auth.emailNotice === 'ok' && <div className="verifyOk" role="status">{t('Email verified')}</div>}
          {(auth.emailNotice === 'expired' || auth.emailNotice === 'invalid') && (
            <div className="authError" role="alert">{t('Verification link expired or invalid')}</div>
          )}
          {auth.user && auth.user.email_verified === false && verifyOn && <VerifyEmailBlock />}
          </>}
          {board ? (
            <LeaderboardPanel onClose={() => setBoard(false)} />
          ) : (
          <>
          <button type="button" className="profileRow profileChoice profileBoardLink" onClick={() => setBoard(true)}>
            <span>{t('Leaderboard')}</span>
            <span className="profileState" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" />
                <path d="M7 6H4a3 3 0 0 0 3 5M17 6h3a3 3 0 0 1-3 5" />
              </svg>
            </span>
          </button>
          <div className="profileSection">{t('الإعدادات')}</div>
          <button
            type="button"
            className="profileRow profileChoice"
            aria-pressed={soundOn}
            onClick={() => (document.querySelector('.soundToggle') as HTMLButtonElement | null)?.click()}
          >
            <span>{t('الصوت')}</span>
            <span className="profileState">{soundOn ? t('شغال') : t('مقفول')}</span>
          </button>
          <button
            type="button"
            className="profileRow profileChoice profileVoiceChoice"
            role="switch"
            aria-checked={voicesOn}
            aria-label={t('أصوات الناس')}
            aria-describedby="feedbackVoicesHint"
            onClick={() => setFeedbackVoices(!voicesOn)}
          >
            <span className="profileVoiceLabel">
              <span>{t('أصوات الناس')}</span>
              <small id="feedbackVoicesHint">{t('تعليقات صوتية مع نتيجة الحل')}</small>
            </span>
            <span className="profileVoiceSwitch" data-on={voicesOn} aria-hidden="true"><span /></span>
          </button>
          <div className="profileSection" id="interfaceLanguageLabel">{t('Language')}</div>
          <div className="profileLanguageOptions" role="group" aria-labelledby="interfaceLanguageLabel">
          {(['ar', 'en', 'de'] as const).map(code => <button key={code} type="button" className="profileRow profileChoice profileLanguageChoice" lang={code} aria-pressed={language === code} onClick={() => setLanguage(code)}>
            <span>{code === 'ar' ? 'العربية' : code === 'de' ? 'Deutsch' : 'English'}</span>
            <span className="profileLanguageCheck" aria-hidden="true">{language === code ? '✓' : ''}</span>
          </button>)}
          </div>
          <div className="profileSection" id="translationLanguageLabel">{t('Translation language')}</div>
          <div className="profileLanguageOptions profileTranslationOptions" role="group" aria-labelledby="translationLanguageLabel">
          {(['ar','en','de'] as const).map(code => <button key={code} type="button" className="profileRow profileChoice profileTranslationChoice" aria-pressed={choice === code} onClick={() => setTranslationLanguage(code)}>
            <span>{t(code === 'ar' ? 'Arabic' : code === 'de' ? 'German' : 'English')}</span>
            <span className="profileLanguageCheck" aria-hidden="true">{choice === code ? '✓' : ''}</span>
          </button>)}
          </div>
          </>
          )}
        </div>
      )}
    </span>
  );
}

function SignedInBlock({user, avatar, onSignOut, onAvatarError}: {user: ApiUser; avatar: string | null; onSignOut: () => void; onAvatarError: () => void}) {
  const {t} = useUiLanguage();
  const sync = useSyncExternalStore(subscribeSyncStatus, getSyncStatus, getSyncStatus);
  const [picking, setPicking] = useState(false);
  const {name, email} = user;
  if (picking) {
    return <AvatarPicker user={user} onSaved={(u) => {applyUser(u); setPicking(false);}} onClose={() => setPicking(false)} />;
  }
  return (
    <>
      <div className="profileRow authUserRow">
        <button type="button" className="authUserAvatarBtn" aria-label={t('Change profile photo')} title={t('Change profile photo')} onClick={() => setPicking(true)}>
          {avatar ? (
            <img className="authUserAvatar" src={avatar} alt="" referrerPolicy="no-referrer" onError={onAvatarError} />
          ) : (
            <span className="authUserAvatar authUserInitial" aria-hidden="true">{name.trim().charAt(0) || t('؟')}</span>
          )}
          <span className="authUserAvatarEdit" aria-hidden="true"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#fffefa" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m15 5 4 4M4 16l-1 5 5-1L20 8a2.8 2.8 0 0 0-4-4L4 16Z" /></svg></span>
        </button>
        <span className="authUserText">
          <b>{name}</b>
          <small dir="ltr">{email}</small>
        </span>
      </div>
      <div className="profileSyncRow" data-state={sync} role="status">
        <span className="profileSyncDot" aria-hidden="true" />
        <span>{sync === 'syncing' ? t('Syncing your progress…') : sync === 'error' ? t('Sync failed - will retry') : t('Progress saved & synced')}</span>
      </div>
      <button type="button" className="authBtn authBtnGhost" onClick={onSignOut}>
        {t('Sign out')}
      </button>
    </>
  );
}

function SignInBlock({googleOn}: {googleOn: boolean}) {
  const {t} = useUiLanguage();
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
          ? t('البريد أو كلمة السر مش صح')
          : code === 'validation_failed'
            ? t('راجع البيانات: اسم من حرفين، بريد صحيح، وكلمة سر 8 أحرف على الأقل')
            : t('حصلت مشكلة في الاتصال. جرّب تاني.'),
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="profileSection">{t('الحساب')}</div>
      {googleOn && (
        <>
        <a className="authBtn authBtnGoogle" href={googleLoginUrl()}>
          <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden="true">
            <path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.1h6.5c-.1 1.1-.8 2.7-2.4 3.8l3.7 2.9c2.3-2.1 3.7-5.2 3.7-8.6z"/>
            <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.7-2.9c-1 .7-2.4 1.2-4.2 1.2-3.2 0-5.9-2.1-6.8-5.1L1.3 17.2C3.3 21.2 7.3 24 12 24z"/>
            <path fill="#FBBC05" d="M5.2 14.3c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.3 6.8C.5 8.4 0 10.1 0 12s.5 3.6 1.3 5.2l3.9-2.9z"/>
            <path fill="#EA4335" d="M12 4.7c1.8 0 3 .8 3.7 1.4l3.3-3.2C17.9 1.1 15.2 0 12 0 7.3 0 3.3 2.8 1.3 6.8l3.9 2.9c.9-2.9 3.6-5 6.8-5z"/>
          </svg>
          {t('الدخول بحساب Google')}
        </a>
        </>
      )}
      {googleOn && <div className="authOr">{lastGoogleAccount() && <a className="authAnotherGoogle" href={googleLoginUrl(true)}>{t('Use another Google account')}</a>}<span>{t('أو بالبريد')}</span></div>}
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
            placeholder={t('الاسم')}
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
          placeholder={t('البريد الإلكتروني')}
          autoComplete="email"
          required
        />
        <input
          className="authInput"
          type="password"
          dir="ltr"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={mode === 'register' ? t('كلمة سر (8 أحرف على الأقل)') : t('كلمة السر')}
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          required
          minLength={8}
        />
        {error && <div className="authError" role="alert">{t(error)}</div>}
        <button className="authBtn authBtnPrimary" type="submit" disabled={busy}>
          {busy ? t('لحظة…') : mode === 'login' ? t('تسجيل الدخول') : t('إنشاء الحساب')}
        </button>
        <button
          type="button"
          className="authSwitch"
          onClick={() => {
            setMode((m) => (m === 'login' ? 'register' : 'login'));
            setError(null);
          }}
        >
          {mode === 'login' ? t('لسه ماعندكش حساب؟ سجّل جديد') : t('عندك حساب بالفعل؟ ادخل')}
        </button>
      </form>
    </>
  );
}

// Shown to email/password accounts until they confirm the inbox. Hidden when
// the worker has no mail sender configured (config.emailVerification), so the
// panel never claims an email was sent when none can be.
function VerifyEmailBlock() {
  const {t} = useUiLanguage();
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className="verifyNotice" role="status">
      <span className="verifyNoticeText">{t('Please verify your email address')}</span>
      {failed ? (
        <span className="authError" role="alert">{t('Connection problem. Please try again.')}</span>
      ) : (
        <button
          type="button"
          className="authSwitch verifyResend"
          disabled={sent}
          onClick={() => void resendVerification().then(() => setSent(true)).catch(() => setFailed(true))}
        >
          {sent ? t('Verification email sent') : t('Resend verification email')}
        </button>
      )}
    </div>
  );
}
