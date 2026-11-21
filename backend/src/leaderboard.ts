// Leaderboard assembly + scoring.
//
// Scores are denormalized: `users.score` holds the count of checked-off
// exercises (done-* flags) in the learner's synced progress blob. It is
// written on every progress save (see saveProgress in index.ts) and was
// backfilled once from existing blobs (scripts/backfill-scores.mjs). The
// public board therefore reads a bounded, indexed top-N instead of joining
// and parsing every progress blob on every view.
//
// Display-only owner pin. Never writes scores, progress or account data.
// Email identity is checked on the server and must already be verified.
export const OWNER_EMAILS = ['alhinaawi@gmail.com', '3asfuur@gmail.com'];
// A presentation floor only. Stored exercise totals are never modified.
export const OWNER_DISPLAY_BASE = 120;

export type LeaderboardAccount = {
  id: number
  name: string
  email: string
  email_verified: number
  avatar: string | null
  score: number
}

export type BoardEntry = {
  id: number
  name: string
  points: number
  avatar: string | null
  pinned: boolean
  rank: number
}

// Full names on the board: the owner asked for them (2026-11-21), replacing
// the earlier privacy abbreviation ("Mohamed S.").
function displayName(full: string): string {
  return full.trim() || 'Learner'
}

// Points = checked-off exercises (done-* flags) across the learner's synced
// progress blob. The sync blob's top-level values are JSON strings (one per
// localStorage key); exercise states live inside those. The backfill script
// carries the same walker; keep the two in sync.
export function pointsOf(data: string): number {
  try {
    let n = 0
    const walk = (v: unknown) => {
      if (typeof v === 'string') {
        try {
          const inner: unknown = JSON.parse(v)
          if (typeof inner === 'object' && inner !== null) walk(inner)
        } catch {
          // plain string setting, no exercises inside
        }
        return
      }
      if (typeof v !== 'object' || v === null) return
      for (const [k, val] of Object.entries(v)) {
        if (k.startsWith('done-') && val === true) n++
        else walk(val)
      }
    }
    walk(JSON.parse(data))
    return n
  } catch {
    return 0
  }
}

export const isVerifiedOwner = (r: { email: string; email_verified: number }) =>
  r.email_verified === 1 && OWNER_EMAILS.includes(r.email.toLowerCase())

// One owner row, not two. Prefer the caller's verified owner account.
export function pickOwner(rows: LeaderboardAccount[], viewerId: number | null): LeaderboardAccount | null {
  const owners = rows.filter(isVerifiedOwner)
  return owners.find((r) => r.id === viewerId) ?? owners.find((r) => r.email.toLowerCase() === OWNER_EMAILS[0]) ?? owners[0] ?? null
}

// Assemble the public top slice from a bounded row set: the verified owner
// accounts (2 by construction) plus the indexed top-N-by-score query result.
// The sort mirrors the SQL ORDER BY (score DESC, id ASC) exactly so a
// viewer's displayed rank matches the rank the count query computes. Tie
// order for equal scores is now id ASC for everyone (previously name order
// for non-zero scores): deterministic, index-backed, and consistent between
// the top slice and the rank count.
export function buildTop(rows: LeaderboardAccount[], viewerId: number | null, limit = 10): BoardEntry[] {
  const owner = pickOwner(rows, viewerId)
  // Only the pinned owner row shows: a second verified owner account (the
  // owner's other login) must not appear again at its real score.
  const rest = rows.filter((r) => r !== owner && !isVerifiedOwner(r)).sort((a, b) => b.score - a.score || a.id - b.id)
  const board = [...(owner ? [owner] : []), ...rest].slice(0, limit)
  return board.map((r, i) => ({
    id: r.id,
    name: r === owner ? r.name : displayName(r.name),
    points: r === owner ? Math.max(OWNER_DISPLAY_BASE, r.score) : r.score,
    // Every learner's chosen photo shows on the board (demo starters always
    // had photos, and the owner wants real students' photos visible too);
    // anonymous students keep the grey silhouette on the client.
    avatar: r.avatar ?? null,
    pinned: r === owner,
    rank: i + 1,
  }))
}

// Strip internal ids before the payload leaves the worker (the public board
// never exposed them).
export const publicTop = (top: BoardEntry[]) => top.map(({ id, ...entry }) => entry)
