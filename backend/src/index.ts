import { OWNER_DISPLAY_BASE, OWNER_EMAILS, buildTop, isVerifiedOwner, pickOwner, pointsOf, publicTop, type BoardEntry, type LeaderboardAccount } from './leaderboard';
import { summarizeProgress } from './admin';
import { Hono, type MiddlewareHandler } from 'hono'
import { cors } from 'hono/cors'
import { hashPassword, newToken, sha256Hex, verifyPassword } from './crypto'
import { asBody, email, str, ValidationError } from './validate'
import { finishGoogleLogin, googleConfigured, startGoogleLogin } from './google'
import { debugOutboxOn, sendVerificationEmail } from './email'

type Env = {
  Bindings: Cloudflare.Env & { RESEND_API_KEY?: string; EMAIL_FROM?: string; EMAIL_DEBUG_OUTBOX?: string }
  Variables: { userId: number }
}

const SESSION_DAYS = 30
const MAX_PROGRESS_BYTES = 512_000

const app = new Hono<Env>()

app.use('/api/*', async (c, next) => {
  const allowed = c.env.ALLOWED_ORIGINS.split(',').map((s) => s.trim())
  return cors({ origin: (o) => (allowed.includes(o) ? o : null), allowHeaders: ['Content-Type', 'Authorization'], maxAge: 600 })(c, next)
})

app.onError((err, c) => {
  if (err instanceof ValidationError) return c.json({ error: 'validation_failed', fields: err.fields }, 422)
  console.error(err)
  return c.json({ error: 'server_error' }, 500)
})
app.notFound((c) => c.json({ error: 'not_found' }, 404))

async function json(c: { req: { json: () => Promise<unknown> } }) {
  try {
    return asBody(await c.req.json())
  } catch (e) {
    if (e instanceof ValidationError) throw e
    throw new ValidationError({ body: 'invalid JSON' })
  }
}

const auth: MiddlewareHandler<Env> = async (c, next) => {
  const m = /^Bearer (.+)$/.exec(c.req.header('Authorization') ?? '')
  if (!m) return c.json({ error: 'unauthorized' }, 401)
  const row = await c.env.DB.prepare(
    'SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?',
  )
    .bind(await sha256Hex(m[1]), new Date().toISOString())
    .first<{ user_id: number }>()
  if (!row) return c.json({ error: 'unauthorized' }, 401)
  c.set('userId', row.user_id)
  await next()
}

async function openSession(db: D1Database, userId: number) {
  const token = newToken()
  const expires = new Date(Date.now() + SESSION_DAYS * 86_400_000).toISOString()
  await db.prepare('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)').bind(await sha256Hex(token), userId, expires).run()
  return token
}

async function saveProgress(db: D1Database, userId: number, data: string, now: string) {
  // Keep the denormalized leaderboard score in the same batch as the blob
  // write, so the public board never has to parse progress JSON to rank.
  await db.batch([
    db.prepare(
      'INSERT INTO progress (user_id, data, updated_at) VALUES (?, ?, ?) ON CONFLICT(user_id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at',
    ).bind(userId, data, now),
    db.prepare('UPDATE users SET score = ?, score_updated_at = ? WHERE id = ?').bind(pointsOf(data), now, userId),
  ])
}

type UserRow = { id: number; name: string; email: string; created_at: string; avatar: string | null; google_avatar: string | null; email_verified: number }
const publicUser = (u: UserRow) => ({ id: u.id, name: u.name, email: u.email, created_at: u.created_at, avatar: u.avatar ?? null, google_avatar: u.google_avatar ?? null, email_verified: !!u.email_verified, owner: isVerifiedOwner(u) })
const USER_COLS = 'id, name, email, created_at, avatar, google_avatar, email_verified'

app.get('/api/ping', (c) => c.json({ ok: true, app: 'menscheny-api' }))

// Public feature flags for the auth UI (Google button stays hidden until the
// OAuth secrets are configured on the worker).
app.get('/api/auth/config', (c) =>
  c.json({ google: googleConfigured(c.env), emailVerification: Boolean(c.env.RESEND_API_KEY) || debugOutboxOn(c.env) }),
)

// Google OAuth: start (302 to Google) and callback (302 back to the site).
app.get('/api/auth/google/start', (c) => startGoogleLogin(c.req.raw, c.env))
app.get('/api/auth/google/callback', (c) => finishGoogleLogin(c.req.raw, c.env, openSession))

// ---------- email verification ----------
const VERIFY_TOKEN_HOURS = 24

// One live link per learner: a fresh request retires the older ones.
async function issueVerificationToken(db: D1Database, userId: number): Promise<string> {
  const token = newToken()
  const expires = new Date(Date.now() + VERIFY_TOKEN_HOURS * 3_600_000).toISOString()
  await db.prepare('DELETE FROM email_verification_tokens WHERE user_id = ?').bind(userId).run()
  await db.prepare('INSERT INTO email_verification_tokens (token_hash, user_id, expires_at) VALUES (?, ?, ?)').bind(await sha256Hex(token), userId, expires).run()
  return token
}

function siteOrigin(env: { ALLOWED_ORIGINS: string }, origin: string | null | undefined): string | null {
  if (!origin) return null
  return env.ALLOWED_ORIGINS.split(',').map((s) => s.trim()).includes(origin) ? origin : null
}

function verifyLink(requestUrl: string, token: string, origin: string | null): string {
  const base = `${new URL(requestUrl).origin}/api/auth/verify-email?token=${encodeURIComponent(token)}`
  return origin ? `${base}&origin=${encodeURIComponent(origin)}` : base
}

// The link in the email lands here (the learner's browser, no Authorization
// header), so this is a GET that verifies and redirects back to the site.
app.get('/api/auth/verify-email', async (c) => {
  const url = new URL(c.req.url)
  const token = url.searchParams.get('token') ?? ''
  const origin = siteOrigin(c.env, url.searchParams.get('origin'))
  const done = (status: string) =>
    origin ? c.redirect(`${origin}/#email-verified?status=${status}`, 302) : c.json({ status })
  if (!token) return done('invalid')
  const row = await c.env.DB.prepare('SELECT user_id, expires_at FROM email_verification_tokens WHERE token_hash = ?')
    .bind(await sha256Hex(token))
    .first<{ user_id: number; expires_at: string }>()
  if (!row) return done('invalid')
  await c.env.DB.prepare('DELETE FROM email_verification_tokens WHERE user_id = ?').bind(row.user_id).run()
  if (new Date(row.expires_at).getTime() < Date.now()) return done('expired')
  await c.env.DB.prepare('UPDATE users SET email_verified = 1 WHERE id = ?').bind(row.user_id).run()
  return done('ok')
})

app.use('/api/auth/resend-verification', auth)
app.post('/api/auth/resend-verification', async (c) => {
  const u = (await c.env.DB.prepare('SELECT id, name, email, email_verified FROM users WHERE id = ?')
    .bind(c.get('userId'))
    .first<{ id: number; name: string; email: string; email_verified: number }>())!
  if (u.email_verified) return c.json({ message: 'already_verified' })
  const token = await issueVerificationToken(c.env.DB, u.id)
  const link = verifyLink(c.req.url, token, siteOrigin(c.env, c.req.header('origin')))
  try {
    await sendVerificationEmail(c.env, u.email, u.name, link)
  } catch {
    return c.json({ error: 'email_send_failed' }, 502)
  }
  return c.json({ message: 'sent', ...(debugOutboxOn(c.env) ? { debug_verify_url: link } : {}) })
})

// ---------- auth ----------
app.post('/api/auth/register', async (c) => {
  const b = await json(c)
  const name = str(b, 'name', { min: 2, max: 60, required: true })!.trim()
  if (name.length < 2) throw new ValidationError({ name: 'at least 2 characters' })
  const mail = email(b)
  const password = str(b, 'password', { min: 8, max: 200, required: true })!

  const exists = await c.env.DB.prepare('SELECT 1 FROM users WHERE email = ?').bind(mail).first()
  if (exists) throw new ValidationError({ email: 'already registered' })

  const res = await c.env.DB.prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)')
    .bind(name, mail, await hashPassword(password))
    .run()
  const userId = Number(res.meta.last_row_id)
  const user = (await c.env.DB.prepare(`SELECT ${USER_COLS} FROM users WHERE id = ?`).bind(userId).first<UserRow>())!

  // Optional one-time migration: the visitor's localStorage progress blob moves into the account.
  const local = b.progress
  if (local !== undefined) {
    const data = JSON.stringify(local)
    if (data.length > MAX_PROGRESS_BYTES) throw new ValidationError({ progress: 'too large' })
    await saveProgress(c.env.DB, userId, data, new Date().toISOString())
  }
  // A new learner joins the board (zero-score rows fill it below 10 users).
  dropLeaderboardCache(c)

  // Password sign-ups start unverified: send the confirmation link without
  // blocking (or failing) the registration on a mail-provider error.
  const vToken = await issueVerificationToken(c.env.DB, userId)
  const vLink = verifyLink(c.req.url, vToken, siteOrigin(c.env, c.req.header('origin')))
  c.executionCtx.waitUntil(sendVerificationEmail(c.env, mail, name, vLink).catch((e) => console.error('verification email failed', e)))

  return c.json(
    { user: publicUser(user), token: await openSession(c.env.DB, userId), ...(debugOutboxOn(c.env) ? { debug_verify_url: vLink } : {}) },
    201,
  )
})

app.post('/api/auth/login', async (c) => {
  const b = await json(c)
  const mail = email(b)
  const password = str(b, 'password', { max: 200, required: true })!
  const row = await c.env.DB.prepare(`SELECT ${USER_COLS}, password_hash FROM users WHERE email = ?`)
    .bind(mail)
    .first<UserRow & { password_hash: string }>()
  // Run a hash even for unknown emails so timing does not reveal which emails exist.
  const ok = row ? await verifyPassword(password, row.password_hash) : (await hashPassword(password), false)
  if (!row || !ok) return c.json({ error: 'invalid_credentials' }, 401)
  return c.json({ user: publicUser(row), token: await openSession(c.env.DB, row.id) })
})

app.use('/api/auth/logout', auth)
app.post('/api/auth/logout', async (c) => {
  const token = /^Bearer (.+)$/.exec(c.req.header('Authorization') ?? '')![1]
  await c.env.DB.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(await sha256Hex(token)).run()
  return c.json({ message: 'logged_out' })
})

// ---------- me ----------
app.use('/api/me', auth)
app.get('/api/me', async (c) => {
  const u = (await c.env.DB.prepare(`SELECT ${USER_COLS} FROM users WHERE id = ?`).bind(c.get('userId')).first<UserRow>())!
  return c.json({ user: publicUser(u) })
})
const AVATAR_RE = /^(https:\/\/lh3\.googleusercontent\.com\/[\w=\-]+|data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+)$/
const AVATAR_MAX = 41_000 // ~30KB image as a base64 data URL

app.patch('/api/me', async (c) => {
  const b = await json(c)
  const name = str(b, 'name', { min: 2, max: 60 })?.trim()
  if (name) await c.env.DB.prepare('UPDATE users SET name = ? WHERE id = ?').bind(name, c.get('userId')).run()
  if ('avatar' in b) {
    const a = b.avatar
    if (a === null || a === '') {
      await c.env.DB.prepare('UPDATE users SET avatar = NULL WHERE id = ?').bind(c.get('userId')).run()
    } else if (a === 'google') {
      // Switch back to the Google profile photo captured at sign-in.
      const row = await c.env.DB.prepare('SELECT google_avatar FROM users WHERE id = ?').bind(c.get('userId')).first<{ google_avatar: string | null }>()
      if (!row?.google_avatar) throw new ValidationError({ avatar: 'no Google photo on this account' })
      await c.env.DB.prepare('UPDATE users SET avatar = google_avatar WHERE id = ?').bind(c.get('userId')).run()
    } else if (typeof a === 'string' && a.length <= AVATAR_MAX && AVATAR_RE.test(a)) {
      await c.env.DB.prepare('UPDATE users SET avatar = ? WHERE id = ?').bind(a, c.get('userId')).run()
    } else {
      throw new ValidationError({ avatar: 'image must be a jpeg/png/webp data URL under 30KB' })
    }
  }
  const u = (await c.env.DB.prepare(`SELECT ${USER_COLS} FROM users WHERE id = ?`).bind(c.get('userId')).first<UserRow>())!
  // Name/avatar show up on the public board.
  dropLeaderboardCache(c)
  return c.json({ user: publicUser(u) })
})

// ---------- progress sync ----------
app.use('/api/progress', auth)

app.get('/api/progress', async (c) => {
  const row = await c.env.DB.prepare('SELECT data, updated_at FROM progress WHERE user_id = ?').bind(c.get('userId')).first<{ data: string; updated_at: string }>()
  return c.json({ progress: row ? JSON.parse(row.data) : null, updated_at: row?.updated_at ?? null })
})

// Progress blobs are merged with union semantics, never replaced: a device
// that holds fewer keys (fresh browser, cleared storage) can never erase what
// another device already synced. Per key, progress wins over its absence (a
// checked-off exercise stays checked off, a written answer beats an empty
// one); genuine conflicts go to the incoming value.
const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

function preferScalar(server: unknown, incoming: unknown): unknown {
  if (server === true || incoming === true) return true
  if (typeof server === 'number' && typeof incoming === 'number') return Math.max(server, incoming)
  if (typeof server === 'string' && typeof incoming === 'string') return server && !incoming ? server : incoming
  return incoming === undefined ? server : incoming
}

function mergeJson(server: unknown, incoming: unknown): unknown {
  if (server === undefined) return incoming
  if (incoming === undefined) return server
  if (isPlainObject(server) && isPlainObject(incoming)) {
    const out: Record<string, unknown> = { ...server }
    for (const key of Object.keys(incoming)) out[key] = mergeJson(server[key], incoming[key])
    return out
  }
  return preferScalar(server, incoming)
}

function mergeValue(serverRaw: string | undefined, incomingRaw: string | undefined): string | undefined {
  if (serverRaw === undefined) return incomingRaw
  if (incomingRaw === undefined) return serverRaw
  if (serverRaw === incomingRaw) return incomingRaw
  let server: unknown, incoming: unknown
  try { server = JSON.parse(serverRaw) } catch { return incomingRaw }
  try { incoming = JSON.parse(incomingRaw) } catch { return incomingRaw }
  try { return JSON.stringify(mergeJson(server, incoming)) } catch { return incomingRaw }
}

function mergeBlobs(server: Record<string, string>, incoming: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = { ...server }
  for (const key of Object.keys(incoming)) {
    const merged = mergeValue(server[key], incoming[key])
    if (merged !== undefined) out[key] = merged
  }
  return out
}

app.put('/api/progress', async (c) => {
  const raw = await c.req.text()
  if (raw.length > MAX_PROGRESS_BYTES) throw new ValidationError({ progress: 'too large' })
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    throw new ValidationError({ body: 'invalid JSON' })
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) throw new ValidationError({ progress: 'object expected' })
  const body = parsed as Record<string, unknown>
  const incoming = (body.progress ?? body) as Record<string, unknown>
  if (isPlainObject(incoming) && Object.values(incoming).some((v) => typeof v !== 'string'))
    throw new ValidationError({ progress: 'values must be strings' })
  const existing = await c.env.DB.prepare('SELECT data FROM progress WHERE user_id = ?').bind(c.get('userId')).first<{ data: string }>()
  let serverBlob: Record<string, string> = {}
  if (existing) {
    try {
      const p = JSON.parse(existing.data)
      if (isPlainObject(p)) serverBlob = p as Record<string, string>
    } catch {
      // unreadable row: start the union from empty rather than failing
    }
  }
  const merged = mergeBlobs(serverBlob, incoming as Record<string, string>)
  const data = JSON.stringify(merged)
  if (data.length > MAX_PROGRESS_BYTES) throw new ValidationError({ progress: 'too large' })
  const now = new Date().toISOString()
  await saveProgress(c.env.DB, c.get('userId'), data, now)
  dropLeaderboardCache(c)
  return c.json({ progress: merged, updated_at: now })
})

// ---------- leaderboard ----------
// Points = checked-off exercises (done-* flags), denormalized onto
// users.score at every progress write (migration 0006 + one-time backfill).
// Public top 10 from a bounded, indexed read; the signed-in learner also
// gets their own rank, even outside the top 10. Names show in full (owner's
// choice, 2026-11-21; was first name + last initial).
const TOP_LIMIT = 10
// Extra row so the pinned owner can be lifted out of the slice without
// dropping the 10th place.
const TOP_QUERY_LIMIT = TOP_LIMIT + 1
const LEADERBOARD_CACHE_KEY = 'https://menscheny-api.internal/__leaderboard_top10'
const LEADERBOARD_CACHE_TTL_S = 60

type TopPayload = { top: BoardEntry[]; ownerId: number | null }

function dropLeaderboardCache(c: { executionCtx: { waitUntil(p: Promise<unknown>): void } }) {
  c.executionCtx.waitUntil(caches.default.delete(LEADERBOARD_CACHE_KEY).catch(() => false))
}

// Bounded reads only: the verified owner rows (2 by construction) and the
// indexed top slice. Never joins or parses progress blobs.
async function fetchTopRows(db: D1Database): Promise<LeaderboardAccount[]> {
  // COALESCE: a Google sign-in who never picked a photo still has
  // google_avatar; the board shows whichever photo the account holds.
  const COLS = 'id, name, email, email_verified, COALESCE(avatar, google_avatar) AS avatar, score'
  const [owners, top] = await db.batch([
    db.prepare(`SELECT ${COLS} FROM users WHERE email_verified = 1 AND lower(email) IN (?, ?)`).bind(...OWNER_EMAILS),
    db.prepare(`SELECT ${COLS} FROM users ORDER BY score DESC, id ASC LIMIT ?`).bind(TOP_QUERY_LIMIT),
  ])
  const byId = new Map<number, LeaderboardAccount>()
  for (const r of [...(owners.results ?? []), ...(top.results ?? [])] as unknown as LeaderboardAccount[]) byId.set(r.id, r)
  return [...byId.values()]
}

async function buildTopPayload(db: D1Database, viewerId: number | null): Promise<TopPayload> {
  const rows = await fetchTopRows(db)
  return { top: buildTop(rows, viewerId, TOP_LIMIT), ownerId: pickOwner(rows, viewerId)?.id ?? null }
}

app.get('/api/leaderboard', async (c) => {
  let viewerId: number | null = null
  const m = /^Bearer (.+)$/.exec(c.req.header('Authorization') ?? '')
  if (m) {
    const session = await c.env.DB.prepare('SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?')
      .bind(await sha256Hex(m[1]), new Date().toISOString())
      .first<{ user_id: number }>()
    viewerId = session?.user_id ?? null
  }

  // The public top slice is the same for everyone except a signed-in owner
  // (who pins their own account), so it is cached at the edge for 60s and
  // dropped on every score/profile write.
  let payload: TopPayload | null = null
  const hit = await caches.default.match(LEADERBOARD_CACHE_KEY)
  if (hit) {
    try {
      payload = (await hit.json()) as TopPayload
    } catch {
      payload = null
    }
  }

  let viewer: LeaderboardAccount | null = null
  if (viewerId !== null) {
    viewer =
      (await c.env.DB.prepare('SELECT id, name, email, email_verified, COALESCE(avatar, google_avatar) AS avatar, score FROM users WHERE id = ?')
        .bind(viewerId)
        .first<LeaderboardAccount>()) ?? null
  }
  const viewerIsOwner = viewer !== null && isVerifiedOwner(viewer)

  if (payload !== null && viewerIsOwner && payload.ownerId !== viewerId) payload = null
  if (payload === null) {
    payload = await buildTopPayload(c.env.DB, viewerIsOwner ? viewerId : null)
    if (!viewerIsOwner) {
      c.executionCtx.waitUntil(
        caches.default.put(
          LEADERBOARD_CACHE_KEY,
          new Response(JSON.stringify(payload), {
            headers: { 'content-type': 'application/json', 'cache-control': `public, max-age=${LEADERBOARD_CACHE_TTL_S}` },
          }),
        ),
      )
    }
  }

  let me: { rank: number; points: number } | null = null
  if (viewer !== null) {
    if (viewerIsOwner) {
      me = { rank: 1, points: Math.max(OWNER_DISPLAY_BASE, viewer.score) }
    } else {
      const onBoard = payload.top.find((r) => r.id === viewer.id)
      if (onBoard) {
        me = { rank: onBoard.rank, points: onBoard.points }
      } else {
        // Exact rank from the score index: count learners ahead in the same
        // (score DESC, id ASC) order, excluding owner accounts (the pinned
        // owner sits ahead of everyone and is added as the +1 below).
        const { above } = (await c.env.DB.prepare(
          `SELECT COUNT(*) AS above FROM users
           WHERE (score > ? OR (score = ? AND id < ?)) AND lower(email) NOT IN (?, ?)`,
        )
          .bind(viewer.score, viewer.score, viewer.id, ...OWNER_EMAILS)
          .first<{ above: number }>()) ?? { above: 0 }
        me = { rank: above + (payload.ownerId !== null ? 2 : 1), points: viewer.score }
      }
    }
  }

  return c.json({ top: publicTop(payload.top), me })
})

// ---------- teacher dashboard (owner only) ----------
// Owner-only views over the accounts/progress the site already stores.
// Nothing here writes; the dashboard is read-only. Queries stay bounded
// (indexed top-ups, PK-ordered pages, one progress blob per detail view),
// and the students list is edge-cached for a few seconds per owner token so
// re-opening the panel does not burn D1 reads.
app.use('/api/admin/*', auth)
app.use('/api/admin/*', async (c, next) => {
  const u = await c.env.DB.prepare('SELECT email, email_verified FROM users WHERE id = ?')
    .bind(c.get('userId'))
    .first<{ email: string; email_verified: number }>()
  if (!u || !isVerifiedOwner(u)) return c.json({ error: 'owner_only' }, 403)
  await next()
})

const ADMIN_CACHE_TTL_S = 30
const adminCacheKey = async (token: string, what: string) =>
  `https://menscheny-api.internal/__admin_${await sha256Hex(token)}_${what}`

app.get('/api/admin/overview', async (c) => {
  const weekAgo = new Date(Date.now() - 7 * 86_400_000).toISOString()
  const [totals, active] = await c.env.DB.batch([
    c.env.DB.prepare(
      'SELECT COUNT(*) AS students, SUM(CASE WHEN email_verified = 1 THEN 1 ELSE 0 END) AS verified, COALESCE(SUM(score), 0) AS total_points FROM users',
    ),
    c.env.DB.prepare('SELECT COUNT(*) AS active FROM progress WHERE updated_at >= ?').bind(weekAgo),
  ])
  const t = (totals.results?.[0] ?? {}) as { students?: number; verified?: number; total_points?: number }
  const a = (active.results?.[0] ?? {}) as { active?: number }
  return c.json({ students: t.students ?? 0, verified: t.verified ?? 0, total_points: t.total_points ?? 0, active_7d: a.active ?? 0 })
})

type AdminStudentRow = {
  id: number
  name: string
  email: string
  created_at: string
  email_verified: number
  avatar: string | null
  score: number
  last_activity: string | null
}

app.get('/api/admin/students', async (c) => {
  const url = new URL(c.req.url)
  const after = Math.max(0, Number(url.searchParams.get('after') ?? '0') || 0)
  const limit = Math.min(100, Math.max(1, Number(url.searchParams.get('limit') ?? '50') || 50))
  const token = /^Bearer (.+)$/.exec(c.req.header('Authorization') ?? '')![1]
  const cacheKey = await adminCacheKey(token, `students_${after}_${limit}`)
  const hit = await caches.default.match(cacheKey)
  if (hit) {
    return new Response(hit.body, { headers: { 'content-type': 'application/json', 'cache-control': `private, max-age=${ADMIN_CACHE_TTL_S}` } })
  }
  // PK-ordered keyset pagination: reads at most `limit` rows per call.
  const rows = await c.env.DB.prepare(
    `SELECT u.id, u.name, u.email, u.created_at, u.email_verified,
            COALESCE(u.avatar, u.google_avatar) AS avatar, u.score, p.updated_at AS last_activity
     FROM users u LEFT JOIN progress p ON p.user_id = u.id
     WHERE u.id > ? ORDER BY u.id ASC LIMIT ?`,
  )
    .bind(after, limit)
    .all<AdminStudentRow>()
  const payload = JSON.stringify({ students: rows.results ?? [] })
  c.executionCtx.waitUntil(
    caches.default.put(
      cacheKey,
      new Response(payload, {
        headers: { 'content-type': 'application/json', 'cache-control': `private, max-age=${ADMIN_CACHE_TTL_S}` },
      }),
    ),
  )
  return c.json({ students: rows.results ?? [] })
})

app.get('/api/admin/students/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (!Number.isInteger(id) || id <= 0) return c.json({ error: 'not_found' }, 404)
  const [user, prog] = await c.env.DB.batch([
    c.env.DB.prepare(`SELECT ${USER_COLS} FROM users WHERE id = ?`).bind(id),
    c.env.DB.prepare('SELECT data, updated_at FROM progress WHERE user_id = ?').bind(id),
  ])
  const u = (user.results?.[0] as unknown as UserRow | undefined) ?? undefined
  if (!u) return c.json({ error: 'not_found' }, 404)
  const p = (prog.results?.[0] as unknown as { data: string; updated_at: string } | undefined) ?? undefined
  // Counts and current pages only; written answers stay in the blob.
  const summary = p ? summarizeProgress(p.data) : null
  return c.json({ user: publicUser(u), last_activity: p?.updated_at ?? null, summary })
})

export default app
