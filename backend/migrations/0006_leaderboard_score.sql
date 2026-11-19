-- Bounded leaderboard reads: denormalized per-user score = count of
-- checked-off exercises (done-* flags) in the learner's synced progress
-- blob. Maintained on every progress write (saveProgress) and backfilled
-- once for existing users by scripts/backfill-scores.mjs.
--
-- Before this, GET /api/leaderboard joined users LEFT JOIN progress and
-- parsed every progress blob in the worker on every view: rows read grew
-- with total users, and CPU with total blob bytes. After: an indexed
-- top-N (LIMIT 11) plus two owner rows per board view.
--
-- Additive only. score_updated_at NULL marks users the backfill has not
-- scored yet; the script skips anyone already scored, so live writes and
-- re-runs are safe.

ALTER TABLE users ADD COLUMN score INTEGER NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN score_updated_at TEXT;

-- Serves ORDER BY score DESC, id ASC LIMIT n and the per-viewer rank count
-- (range scan over score) without touching the table.
CREATE INDEX idx_users_score ON users(score DESC, id ASC);
