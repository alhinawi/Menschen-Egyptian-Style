// Verification email sender.
//
// With RESEND_API_KEY set on the worker, mail goes out through Resend's REST
// API from EMAIL_FROM. Without a key the debug outbox logs the link to the
// worker log instead; when EMAIL_DEBUG_OUTBOX = "true" the API also echoes
// the link in its JSON response so local development and tests can complete
// the flow. The echo never happens while a real key is configured.

export interface EmailEnv {
  RESEND_API_KEY?: string
  EMAIL_FROM?: string
  EMAIL_DEBUG_OUTBOX?: string
}

const DEFAULT_FROM = 'Menschen <onboarding@resend.dev>'

export function debugOutboxOn(env: EmailEnv): boolean {
  return !env.RESEND_API_KEY && env.EMAIL_DEBUG_OUTBOX === 'true'
}

function verificationEmailHtml(name: string, link: string): string {
  const safeName = name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f7f3ea;font-family:Georgia,'Times New Roman',serif;color:#2f2a22">
  <div style="max-width:480px;margin:0 auto;background:#fffdf8;border:1px solid #e3d9c4;border-radius:14px;padding:28px">
    <div style="font-size:20px;font-weight:bold;margin-bottom:14px">Menschen.</div>
    <p style="font-size:15px;line-height:1.6">Hi ${safeName},</p>
    <p style="font-size:15px;line-height:1.6">Please confirm this email address for your Menschen account. The link works for 24 hours.</p>
    <p style="margin:22px 0"><a href="${link}" style="display:inline-block;background:#6b4f2a;color:#fff;padding:11px 22px;border-radius:999px;text-decoration:none;font-size:15px">Verify my email</a></p>
    <p style="font-size:14px;line-height:1.6" dir="rtl" lang="ar">أكّد بريدك الإلكتروني لحسابك في Menschen من اللينك ده. اللينك شغال ٢٤ ساعة.</p>
    <p style="font-size:12px;color:#8a8171;line-height:1.5">If you did not create this account, you can ignore this email.<br>لو مش انت اللي عملت الحساب ده، تجاهل الإيميل ده.</p>
  </div>
</body></html>`
}

export async function sendVerificationEmail(env: EmailEnv, to: string, name: string, link: string): Promise<void> {
  if (!env.RESEND_API_KEY) {
    console.log(`[debug-outbox] verification email to ${to}: ${link}`)
    return
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.EMAIL_FROM ?? DEFAULT_FROM,
      to: [to],
      subject: 'Menschen - verify your email',
      html: verificationEmailHtml(name, link),
    }),
  })
  if (!res.ok) {
    console.error('resend send failed', res.status, await res.text())
    throw new Error('email_send_failed')
  }
}
