#!/usr/bin/env node
/**
 * One-time backfill for the bounded leaderboard (migration 0006).
 *
 * Computes each learner's score (count of done-* exercise flags inside the
 * synced progress blob) and stores it in users.score / users.score_updated_at,
 * so GET /api/leaderboard reads an indexed top-N instead of joining and
 * parsing every progress blob on every view.
 *
 * Order of operations for the live database:
 *   1. wrangler d1 migrations apply menscheny --remote   (adds the columns)
 *   2. node scripts/backfill-scores.mjs                  (scores everyone)
 *   3. wrangler deploy                                   (new bounded code)
 *   4. node scripts/backfill-scores.mjs                  (catch stragglers
 *      who wrote progress under the old code during step 2)
 * Old code ignores the new columns, and new code only reads them, so every
 * intermediate state is safe; running 1 -> 3 -> 2 also works, the board just
 * shows stale zeros until step 4.
 *
 * Reads are batched (keyset on users.id, 50 rows per SELECT by default) with
 * a pause between batches so the account-wide free D1 daily quota is not
 * drained in one burst. Idempotent: only users with score_updated_at IS NULL
 * are processed, so re-runs skip finished users and never overwrite scores
 * written by live progress syncs.
 *
 * Usage:
 *   CF_API_TOKEN=... CF_ACCOUNT_ID=... node scripts/backfill-scores.mjs [--dry]
 *
 * D1_DATABASE_ID defaults to the menscheny database from wrangler.jsonc.
 * BATCH (default 50) and SLEEP_MS (default 250) tune the pace.
 * --dry prints the scores it would write without writing.
 */

const ACCOUNT = process.env.CF_ACCOUNT_ID
const TOKEN = process.env.CF_API_TOKEN
const DB = process.env.D1_DATABASE_ID ?? '23b928e7-87bb-48da-8e88-889a79c7c073'
const BATCH = Number(process.env.BATCH ?? 50)
const SLEEP_MS = Number(process.env.SLEEP_MS ?? 250)
const DRY = process.argv.includes('--dry')

if (!ACCOUNT || !TOKEN) {
  console.error('Set CF_ACCOUNT_ID and CF_API_TOKEN (a token with D1 edit access).')
  process.exit(1)
}

// Same walker as src/leaderboard.ts pointsOf; keep the two in sync.
function pointsOf(data) {
  try {
    let n = 0
    const walk = (v) => {
      if (typeof v === 'string') {
        try {
          const inner = JSON.parse(v)
          if (typeof inner === 'object' && inner !== null) walk(inner)
        } catch {
          // plain string setting, no exercises inside
        }
        return
      }
      if (typeof v !== 'object' || v === null) return
      const entries = Object.entries(v)
      // Sub-answer flags ('done-<exercise>:f-<field>') count one each; once an exercise has
      // any, its group flag stops counting. Same rule as pointsOf in src/leaderboard.ts.
      const done = entries.filter(([k, val]) => k.startsWith('done-') && val === true).map(([k]) => k)
      const parents = new Set(done.filter((k) => k.includes(':f-')).map((k) => k.slice(0, k.indexOf(':f-'))))
      n += done.filter((k) => !parents.has(k)).length
      for (const [k, val] of entries) {
        if (!(k.startsWith('done-') && val === true)) walk(val)
      }
    }
    walk(JSON.parse(data))
    return n
  } catch {
    return 0
  }
}

async function d1(sql, params = []) {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT}/d1/database/${DB}/query`,
    {
      method: 'POST',
      headers: { authorization: `Bearer ${TOKEN}`, 'content-type': 'application/json' },
      body: JSON.stringify({ sql, params }),
    },
  )
  const body = await res.json()
  if (!body.success) throw new Error(`D1 query failed: ${JSON.stringify(body.errors)}`)
  return body.result[0]
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

let after = 0
let scored = 0
let rowsRead = 0
let rowsWritten = 0

for (;;) {
  // Keyset pagination over users never scored yet (progress writes under the
  // new code set score_updated_at, so live activity is never overwritten).
  const page = await d1(
    `SELECT u.id, p.data FROM users u JOIN progress p ON p.user_id = u.id
     WHERE u.id > ? AND u.score_updated_at IS NULL
     ORDER BY u.id ASC LIMIT ?`,
    [after, BATCH],
  )
  const rows = page.results ?? []
  if (rows.length === 0) break

  for (const row of rows) {
    const points = pointsOf(row.data ?? '{}')
    if (DRY) {
      console.log(`user ${row.id}: ${points} points`)
    } else {
      const w = await d1('UPDATE users SET score = ?, score_updated_at = ? WHERE id = ?', [
        points,
        new Date().toISOString(),
        row.id,
      ])
      rowsWritten += w.meta?.rows_written ?? 0
    }
    scored++
  }
  rowsRead += page.meta?.rows_read ?? 0
  after = rows[rows.length - 1].id
  console.log(`${DRY ? '[dry] ' : ''}${scored} users scored so far (last id ${after})`)

  if (rows.length < BATCH) break
  await sleep(SLEEP_MS)
}

console.log(
  `${DRY ? '[dry] ' : ''}done: ${scored} users scored, ${rowsRead} rows read, ${rowsWritten} rows written`,
)
