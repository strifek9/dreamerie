export const gameplaySchema = `
CREATE TABLE room_games (
  room_id TEXT PRIMARY KEY REFERENCES rooms(id),
  state_json TEXT NOT NULL CHECK(length(state_json) <= 256000)
);
CREATE TABLE round_outcomes (
  room_id TEXT NOT NULL REFERENCES rooms(id),
  round_id TEXT NOT NULL,
  player_id TEXT NOT NULL REFERENCES memberships(player_id),
  day_index INTEGER NOT NULL CHECK(day_index BETWEEN 0 AND 5),
  result_json TEXT NOT NULL,
  PRIMARY KEY(room_id, round_id, player_id),
  UNIQUE(room_id, day_index, player_id)
);
PRAGMA user_version = 2;
`
