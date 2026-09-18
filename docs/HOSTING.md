# Hosted Dreamerie playtest

## Release status

Dreamerie was deployed on Render on 2026-09-18 at **https://dreamerie-playtest.onrender.com**. The user approved the $7.25/month compute-and-disk estimate, plus applicable usage charges and taxes. HTTPS health, browser session creation, room creation and room persistence after refresh pass. Service auto-deploy is Off and Blueprint Auto Sync is paused. Milestone 0.2.8 remains in progress: hosted multiplayer, physical-device testing and the actual-host backup/recovery rehearsal are still pending. See [PLAYTEST_RECORD.md](PLAYTEST_RECORD.md) and [SCALING_PLAN.md](SCALING_PLAN.md); this is a small supervised playtest, with no measured public capacity claim.

**Approved access:** anyone with the site link can enter and create a room, without a shared password or account signup. Joining a particular room still requires its invitation/code. Each browser gets its own protected session; the public site link does not grant another player’s seat, private clues or host controls. There is no public room directory or automatic matchmaking. The Blueprint has maintenance mode disabled, so a successful authorized deployment opens the site immediately. Review the actual hosting price before creating paid resources.

## Proposed deployment

Use the root [render.yaml](../render.yaml) in the owner's Render account, connected to this Git repository. The proposal has one Node 24 service in Ohio, plan `0.5c-512mb`, one 1 GB persistent disk at `/var/data`, and no automatic deploys. Build with `npm ci --include=dev && npm test && npm run build`; start with `npm start`. Tests run on isolated temporary databases. Production opens/migrates its own database only when the service starts. The GitHub workflow separately checks Linux/Node 24 on pushes and pull requests; it does not deploy.

On 2026-09-18, Render's deployment review displayed **$7 + $0.25/month**, before bandwidth, build usage, workspace fees and taxes. The user approved this deployment; it is not a capacity guarantee. Review current prices before adding resources. A cancellation reminder is set for October 18; it does not automatically cancel hosting or stop charges. [Render pricing](https://render.com/pricing), [compute plans](https://render.com/docs/compute-plans).

The disk permits one service instance and causes a brief interruption on deploy. Keep `numInstances: 1`; do not add autoscaling or a second writer to this SQLite setup. The service runs the existing midnight/expiry loop itself; its disk is unavailable to a separate cron service and to build/pre-deploy jobs. [Disk constraints](https://render.com/docs/disks).

## Setup after hosting-cost review

1. Run `npm test` and `npm run build`; commit and push the reviewed files using the handoff's Git commands. Confirm the GitHub checks pass. They have not run merely because the workflow file exists.
2. For a new deployment, choose **New → Blueprint**, connect this repository and inspect every proposed resource and price before accepting. Do not create a duplicate of the existing Dreamerie deployment. Importing provisions paid resources, and a successful deployment opens public access. Verify service auto-deploy is Off; separately set **Blueprint Settings → Auto Sync → No** to keep infrastructure updates manual.
3. Set `APP_ORIGIN` to the exact generated HTTPS origin, such as `https://your-chosen-name.onrender.com`, without a trailing slash or path. The name/URL is assigned by Render; do not assume the example is yours. If the creation screen requires the value before the URL is known, use a temporary HTTPS example and correct it with a redeploy before sharing the link. The page can load during setup, but wrong-origin mutations fail closed and rooms cannot be created. Do not change the URL mid-playtest: cookies belong to the browser's original hostname.
4. Confirm `NODE_ENV=production`, `HOST=0.0.0.0`, `DATABASE_PATH=/var/data/dreamerie.sqlite`, and Node major version 24. Let Render supply `PORT`. The production entry point rejects missing/relative database paths and database locations inside served `public/` or `dist/` directories. Absolute paths alone cannot prove that storage is mounted; inspect the disk in the dashboard.
5. Confirm maintenance mode is disabled and verify entry from a fresh browser: no shared password, a distinct browser session, and access only to rooms that browser creates or joins by invitation. No secrets belong in `VITE_*` variables, source files or shared screenshots.
6. Open `https://YOUR-HOST/api/health`, then the same host with `/?play=rooms`. Check HTTPS, cookies, invite links and two distinct browser sessions. The health response exposes only `{"ok":true}` and checks a database read; it is not proof that midnight scheduling, backup freshness or capacity is healthy.
7. Run the backup/restore rehearsal below on the actual host. Keep a verified copy off the service disk. Record the URL, deployed commit, actual monthly charges, operator, backup location and real-device outcomes in [PLAYTEST_RECORD.md](PLAYTEST_RECORD.md).

The local database is **not uploaded** automatically. Start hosted rooms fresh unless the owner explicitly requests a private data migration. Existing local cookies do not become hosted player credentials.

## Backup and recovery

Build first so the maintenance commands exist. They use SQLite's online backup API and validate integrity, foreign keys, the supported schema and serialized gameplay. `backup` and `restore` create a **new** `.sqlite` file; they reject an existing destination or sidecars, unsupported sources and destinations inside served asset directories. They do not run migrations or advance days. A failure returns a nonzero exit status; never treat failed output as a usable snapshot. [SQLite backup API through better-sqlite3](https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#backupdestination-options---promise).

Local PowerShell example, using unused filenames:

```powershell
npm run build
npm run db:backup -- ./data/dreamerie.sqlite ./data/backups/before-release.sqlite
npm run db:verify -- ./data/backups/before-release.sqlite
npm run db:restore -- ./data/backups/before-release.sqlite ./data/restored-rehearsal.sqlite
```

To inspect that **copy**, stop the local room service, set its database path in that terminal, and start it. Use the original browser profile and original local address so its session cookie still matches. Check a saved hand, locked guesses, revealed results and the cutoff. Starting the service applies the normal time catch-up/expiry policy to the copy.

```powershell
$env:DATABASE_PATH = Join-Path $PWD 'data/restored-rehearsal.sqlite'
npm run dev:server
```

After checking, stop that service and open a fresh terminal for the normal default database. Do not overwrite the real database for a rehearsal.

On Render, run these in the service's **Shell**, where the disk is mounted, choosing a fresh filename each time:

```sh
npm run db:backup -- /var/data/dreamerie.sqlite /var/data/backups/before-release-001.sqlite
npm run db:verify -- /var/data/backups/before-release-001.sqlite
npm run db:restore -- /var/data/backups/before-release-001.sqlite /var/data/rehearsal-001.sqlite
```

A same-disk backup does not survive loss of that disk/account. Transfer only verified snapshots to an owner-controlled private location using the provider's SSH/SCP instructions; never serve them through an HTTP route. Take a snapshot before each deploy and at least daily during a supervised playtest. This milestone supplies manual commands, not an automated off-site backup service. Assign a person to run and verify them; do not call backups operational before that is done. [Render file transfer](https://render.com/docs/disks#transferring-files).

For actual recovery, enable maintenance mode, note that choices after the snapshot will be lost, restore into a new filename on the disk, change `DATABASE_PATH` to that new absolute path and restart. Never replace or rename a live SQLite file while its WAL/SHM sidecars are in use. Verify the restored service before reopening access. Preserve the old database until recovery is accepted. Reverting application code does not revert data or migrations; unsupported schema versions must fail rather than be forced open.

Snapshots contain private clues, guesses and browser credential hashes. Restrict access and set an explicit off-site retention/deletion policy before unattended backups. Room expiry deletes live private records, not historical backups or SQLite page remnants. Do not promise seven-day erasure from every storage copy.

## Hosted acceptance checks

- Play full two- and six-person weeks on separate phone/desktop browsers. Verify preparation, six stable cards, lock/unlock, reveal, score and every recap image. Record real Safari/Chrome versions; emulated widths do not replace device testing.
- Refresh during preparation, guessing and reveal; briefly disconnect and background the phone. Resume without rerolling or losing accepted choices. An unconfirmed request must reconcile safely rather than silently make another choice.
- Restart/redeploy while a room exists. Confirm identities, cutoffs, clues, boards and results survive. Do not move the database out of the disk mount.
- Leave a real hosted midnight cutoff with all tabs closed. Check scheduled progress and the missed-day policy on return. Verify final completion, early closure, 24-hour lobby expiry and seven-day recap expiry in the appropriate long-running test. Local controlled-clock tests already cover the boundaries; the public service has no time-changing endpoint.
- Check host closure after a reveal: keep only revealed points/cards; reject later guesses and new joins. Starting another room must leave the prior unexpired recap.
- Verify public entry with a fresh browser and direct API requests: the homepage loads without credentials, same-origin session creation succeeds, and private room reads without membership fail. Invitations join a new seat; they cannot recover another player’s state or host rights.
- Confirm health, browser console and server errors without logging request bodies, cookies, passwords or clues. Observe CPU/memory, disk growth, response times and midnight catch-up delay in the actual hosting plan. Test forwarded-address/rate-limit behavior behind the actual proxy before increasing the audience; do not blindly trust user-supplied forwarding headers.

Stop for owner acceptance after the hosted human playtest. Deployment preparation and local tests alone do not complete 0.2.8.
