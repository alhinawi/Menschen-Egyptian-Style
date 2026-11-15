-- Email verification for password sign-ups. Google sign-ins count as verified
-- because Google has already checked the inbox. Additive only.
ALTER TABLE users ADD COLUMN email_verified INTEGER NOT NULL DEFAULT 0;
CREATE TABLE email_verification_tokens (
  token_hash TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  expires_at TEXT NOT NULL
);
CREATE INDEX idx_email_verification_tokens_user ON email_verification_tokens(user_id);
