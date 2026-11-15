-- Keep the Google profile picture URL separate from the chosen avatar, so a
-- learner who uploaded a custom photo can switch back to their Google photo.
ALTER TABLE users ADD COLUMN google_avatar TEXT;
