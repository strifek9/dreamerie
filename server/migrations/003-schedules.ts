export const scheduleSchema = `
CREATE TABLE room_schedules (
  room_id TEXT PRIMARY KEY REFERENCES rooms(id),
  deadline INTEGER NOT NULL CHECK(deadline > 0),
  time_zone TEXT NOT NULL CHECK(time_zone = 'America/Chicago'),
  policy_version INTEGER NOT NULL CHECK(policy_version = 1)
);
CREATE INDEX room_schedules_due ON room_schedules(deadline);
PRAGMA user_version = 3;
`
