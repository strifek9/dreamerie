// Existing rooms keep personal clues, including waiting rooms created before this release.
export const roomModeSchema = `
ALTER TABLE rooms ADD COLUMN mode TEXT NOT NULL DEFAULT 'personal' CHECK(mode IN ('classic', 'personal'));
PRAGMA user_version = 4;
`
