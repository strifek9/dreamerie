export const lobbySchema = `
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  credential_hash TEXT NOT NULL UNIQUE,
  expires_at INTEGER NOT NULL
);
CREATE TABLE rooms (
  id TEXT PRIMARY KEY,
  invite_code TEXT NOT NULL UNIQUE,
  host_id TEXT NOT NULL,
  phase TEXT NOT NULL DEFAULT 'lobby' CHECK (phase IN ('lobby','preparation','guessing','revealed','complete','closed','expired')),
  revision INTEGER NOT NULL DEFAULT 1,
  created_at INTEGER NOT NULL,
  expires_at INTEGER
);
CREATE TABLE memberships (
  player_id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL REFERENCES rooms(id),
  session_id TEXT NOT NULL REFERENCES sessions(id),
  display_name TEXT NOT NULL,
  name_key TEXT NOT NULL,
  accent_slot INTEGER NOT NULL CHECK (accent_slot BETWEEN 0 AND 5),
  UNIQUE(room_id, session_id),
  UNIQUE(room_id, name_key),
  UNIQUE(room_id, accent_slot)
);
CREATE INDEX memberships_session ON memberships(session_id);
CREATE TABLE command_receipts (
  session_id TEXT NOT NULL REFERENCES sessions(id),
  request_id TEXT NOT NULL,
  fingerprint TEXT NOT NULL,
  room_id TEXT NOT NULL REFERENCES rooms(id),
  PRIMARY KEY(session_id, request_id)
);
PRAGMA user_version = 1;
`
