// Teacher dashboard (owner only): who registered in the book and what each
// student solved. Lives at teacher.html, rendered by main.tsx instead of the
// book reader. Reads the owner-only /api/admin/* endpoints; the server checks
// the verified owner email on every call, so this page shows data only after
// the owner signs in. Arabic-first (his panel), Cairo type, Tailwind only.

import {useEffect, useState} from 'react';
import * as api from '../auth/api';
import {ANONYMOUS_AVATAR} from '../auth/anonymous-avatar';

type Stage = 'loading' | 'login' | 'denied' | 'ready' | 'offline';

const FONT = "font-['Cairo',system-ui,sans-serif]";
const CARD = 'rounded-2xl border border-[#e3dccb] bg-white/85 shadow-[0_2px_14px_rgba(57,53,43,0.06)]';

function fmtDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString('en-GB', {day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'});
}

function LoginForm({onDone}: {onDone: () => void}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      await api.login(email.trim(), password);
      onDone();
    } catch {
      setError('البريد أو كلمة السر غلط');
      setBusy(false);
    }
  }
  return (
    <form onSubmit={submit} className={`${CARD} mx-auto w-full max-w-sm p-6`}>
      <h1 className="m-0 text-xl font-bold text-[#39352b]">لوحة تحكم الطلاب</h1>
      <p className="mt-1 mb-5 text-sm text-[#6a6f75]">سجّل دخولك بحساب المالك عشان تشوف الطلاب وتقدمهم.</p>
      <label className="block text-sm font-semibold text-[#39352b]">
        البريد الإلكتروني
        <input
          type="email"
          required
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 mb-3 block w-full rounded-xl border border-[#d8cdb4] bg-white px-3 py-2 text-left outline-none focus:border-[#713c46]"
        />
      </label>
      <label className="block text-sm font-semibold text-[#39352b]">
        كلمة السر
        <input
          type="password"
          required
          dir="ltr"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 mb-4 block w-full rounded-xl border border-[#d8cdb4] bg-white px-3 py-2 text-left outline-none focus:border-[#713c46]"
        />
      </label>
      {error && <div className="mb-3 text-sm font-semibold text-[#b3261e]" role="alert">{error}</div>}
      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-xl bg-[#713c46] py-2.5 font-bold text-white transition hover:bg-[#5d313a] disabled:opacity-60"
      >
        {busy ? 'جاري الدخول…' : 'دخول'}
      </button>
      <a href="index.html" className="mt-4 block text-center text-sm font-semibold text-[#713c46] underline">رجوع للكتاب</a>
    </form>
  );
}

function StatCard({label, value}: {label: string; value: number}) {
  return (
    <div className={`${CARD} p-4 text-center`}>
      <div className="text-3xl font-extrabold text-[#713c46]">{value}</div>
      <div className="mt-1 text-sm font-semibold text-[#6a6f75]">{label}</div>
    </div>
  );
}

function StudentDetail({id}: {id: number}) {
  const [detail, setDetail] = useState<api.AdminStudentDetail | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    let live = true;
    setDetail(null);
    setError(false);
    api.getAdminStudent(id).then((d) => live && setDetail(d)).catch(() => live && setError(true));
    return () => {
      live = false;
    };
  }, [id]);
  if (error) return <div className="p-4 text-sm font-semibold text-[#b3261e]">تعذر تحميل تفاصيل الطالب. جرّب تاني.</div>;
  if (!detail) return <div className="p-4 text-sm text-[#6a6f75]">جاري التحميل…</div>;
  if (!detail.summary || detail.summary.lessons.length === 0) {
    return <div className="p-4 text-sm text-[#6a6f75]">لسه مفيش تقدم محفوظ للطالب ده.</div>;
  }
  const s = detail.summary;
  return (
    <div className="p-4">
      <div className="mb-3 flex flex-wrap gap-4 text-sm font-semibold text-[#39352b]">
        <span>الدروس المفتوحة: <b className="text-[#713c46]">{s.lessons_touched}</b></span>
        <span>تمارين محلولة: <b className="text-[#713c46]">{s.exercises_done}</b></span>
        <span>إجابات مكتوبة: <b className="text-[#713c46]">{s.answered_fields}</b></span>
      </div>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-[#e3dccb] text-[#6a6f75]">
            <th className="py-2 text-right font-semibold">الدرس</th>
            <th className="py-2 text-center font-semibold">الصفحة الحالية</th>
            <th className="py-2 text-center font-semibold">تمارين محلولة</th>
            <th className="py-2 text-center font-semibold">إجابات مكتوبة</th>
          </tr>
        </thead>
        <tbody>
          {s.lessons.map((l) => (
            <tr key={l.lesson} className="border-b border-[#f1ecdf]">
              <td className="py-2 font-semibold text-[#39352b]" dir="ltr">{l.lesson}</td>
              <td className="py-2 text-center">{l.page === null ? '—' : l.page + 1}</td>
              <td className="py-2 text-center font-bold text-[#713c46]">{l.exercises_done}</td>
              <td className="py-2 text-center">{l.answered_fields}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TeacherDashboard() {
  const [stage, setStage] = useState<Stage>('loading');
  const [overview, setOverview] = useState<api.AdminOverview | null>(null);
  const [students, setStudents] = useState<api.AdminStudent[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);

  async function load() {
    try {
      const me = await api.me();
      if (!me.user.owner) {
        setStage('denied');
        return;
      }
      const [ov, list] = await Promise.all([api.getAdminOverview(), api.getAdminStudents()]);
      setOverview(ov);
      setStudents(list.students);
      setStage('ready');
    } catch (e) {
      // 401 already cleared the token inside api.ts: ask for sign-in.
      if (!api.getToken()) setStage('login');
      else if (e instanceof Error && e.message === 'owner_only') setStage('denied');
      else setStage('offline');
    }
  }

  useEffect(() => {
    if (!api.getToken()) {
      setStage('login');
      return;
    }
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div dir="rtl" lang="ar" className={`${FONT} min-h-screen bg-[#f7f3ea] px-4 py-8 text-[#39352b]`}>
      <div className="mx-auto max-w-3xl">
        {stage === 'loading' && <p className="text-center text-[#6a6f75]">جاري التحميل…</p>}
        {stage === 'login' && <LoginForm onDone={() => { setStage('loading'); void load(); }} />}
        {stage === 'denied' && (
          <div className={`${CARD} mx-auto max-w-sm p-6 text-center`}>
            <h1 className="m-0 text-xl font-bold">لوحة تحكم الطلاب</h1>
            <p className="mt-2 text-sm text-[#6a6f75]">الصفحة دي لصاحب الكتاب بس. سجّل دخولك بحساب المالك.</p>
            <a href="index.html" className="mt-4 inline-block text-sm font-semibold text-[#713c46] underline">رجوع للكتاب</a>
          </div>
        )}
        {stage === 'offline' && (
          <div className={`${CARD} mx-auto max-w-sm p-6 text-center`}>
            <h1 className="m-0 text-xl font-bold">لوحة تحكم الطلاب</h1>
            <p className="mt-2 text-sm text-[#6a6f75]">اللوحة محتاجة اتصال بالنت دلوقتي. جرّب تحديث الصفحة بعد شوية.</p>
            <button type="button" onClick={() => { setStage('loading'); void load(); }} className="mt-4 rounded-xl bg-[#713c46] px-6 py-2 font-bold text-white">إعادة المحاولة</button>
          </div>
        )}
        {stage === 'ready' && overview && (
          <>
            <header className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="m-0 text-2xl font-extrabold">لوحة تحكم الطلاب</h1>
                <p className="mt-1 text-sm text-[#6a6f75]">المسجلون في الكتاب وتقدم كل طالب</p>
              </div>
              <a href="index.html" className="rounded-xl border border-[#d8cdb4] bg-white px-4 py-2 text-sm font-bold text-[#713c46]">الكتاب</a>
            </header>
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatCard label="طالب مسجل" value={overview.students} />
              <StatCard label="بريد موثق" value={overview.verified} />
              <StatCard label="نشط آخر ٧ أيام" value={overview.active_7d} />
              <StatCard label="مجموع النقاط" value={overview.total_points} />
            </div>
            {students.length === 0 ? (
              <div className={`${CARD} p-6 text-center text-sm text-[#6a6f75]`}>لسه مفيش طلاب مسجلين.</div>
            ) : (
              <div className="flex flex-col gap-3">
                {students.map((s) => (
                  <div key={s.id} className={`${CARD} overflow-hidden`}>
                    <button
                      type="button"
                      onClick={() => setOpenId(openId === s.id ? null : s.id)}
                      className="flex w-full items-center gap-3 p-4 text-right"
                      aria-expanded={openId === s.id}
                    >
                      <img
                        src={s.avatar || ANONYMOUS_AVATAR}
                        alt=""
                        referrerPolicy="no-referrer"
                        onError={(e) => { if (e.currentTarget.src !== ANONYMOUS_AVATAR) e.currentTarget.src = ANONYMOUS_AVATAR; }}
                        className="h-11 w-11 shrink-0 rounded-full border border-[#e3dccb] object-cover"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-bold">{s.name}</span>
                        <span className="block truncate text-xs text-[#6a6f75]" dir="ltr">{s.email}</span>
                      </span>
                      <span className="shrink-0 text-center">
                        <span className="block text-lg font-extrabold text-[#713c46]">{s.score}</span>
                        <span className="block text-[11px] text-[#6a6f75]">نقطة</span>
                      </span>
                      <span className="hidden shrink-0 text-left text-[11px] leading-4 text-[#6a6f75] sm:block">
                        آخر نشاط<br />{fmtDate(s.last_activity)}
                      </span>
                    </button>
                    {openId === s.id && (
                      <div className="border-t border-[#e3dccb] bg-[#fbf8f1]">
                        <div className="flex flex-wrap gap-x-6 gap-y-1 px-4 pt-3 text-[11px] text-[#6a6f75]">
                          <span>سجل يوم: {fmtDate(s.created_at)}</span>
                          <span>آخر نشاط: {fmtDate(s.last_activity)}</span>
                          <span>البريد: {s.email_verified ? 'موثق ✓' : 'مش موثق'}</span>
                        </div>
                        <StudentDetail id={s.id} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
