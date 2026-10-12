# Cloudflare static migration candidate

Source baseline: `ee4073b552db51daacce19237f231f51c366aae5`. Owner explicitly authorized migrating now, including code, commits/pushes and free Cloudflare static deployment. Retain Render as a reachable fallback; no main-link cutover or redirect before continuity is verified. No paid upgrade, R2, database, domain purchase, new credentials or expanded OAuth scopes.

## Hosting and access

Use Workers Static Assets, name `dreamerie`, existing authorized account and its observed `kouvang0109` workers.dev subdomain. Candidate address: `https://dreamerie.kouvang0109.workers.dev`. Existing account-read and Workers-script access suffices for preflight; Pages access is absent. No login/scopes/token creation was performed. Billing/subscription API read returned 403 and was not retried with greater access.

The config has no application Worker entrypoint, bindings, Worker-first routes, databases or paid resources. Wrangler provides its tiny default no-op 404 handler; real pages/images use static-asset delivery. Cloudflare documents free/unlimited static-asset requests and no additional asset-storage charge. Free asset constraints are 20,000 files and 25 MiB per file. Do not enable paid/runtime features as a workaround.

Sources checked October 12, 2026:
- https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/
- https://developers.cloudflare.com/workers/platform/limits/
- https://developers.cloudflare.com/workers/static-assets/headers/
- https://developers.cloudflare.com/workers/static-assets/get-started/

## Artwork and cache semantics

`npm run prepare:cloudflare` inventories artworkSources for all **966** resolvable saved-card IDs, including all **383** current cards, and prepares only their dependencies. All source/master/history files remain in Git/public locally, untouched. **363** referenced legacy full-frame PNG deliveries are encoded offline as lossless WebP, verifying exact native dimensions, RGBA pixels and ICC bytes. Existing lossless deliveries are copied unchanged. Identical bytes deduplicate by full SHA256.

The Vite Cloudflare-only plugin replaces required source URL literals with `/art/<full-sha256>.webp` before chunk hashing. All current/historical geometry, masks, images and original rules stay unchanged. Cloudflare output has no PNG masters/provenance exports or unrelated public history, but retains every artwork dependency needed to render imported historical saves. Full-artifact hashes are verified after copying. All dates/holidays from 2026 through 2046 resolve to packaged sources.

Measured candidate output: **4,619 files**, **1,599,622,723 bytes**, largest **2,687,952 bytes**; versus prior full approximately 6.61 GB output. Cache policy: fingerprinted JS/CSS and full-content-hash artwork are one-year immutable; HTML retains platform revalidation, and progress pages use no-store/no-referrer. Changed bytes produce new artwork URLs and changed rendered chunks produce new filenames. Mutable HTML is never cached forever. Missing artwork returns 404, not SPA HTML. Asset hash literals increase compressed code entropy: candidate JS total approximately 564 KB gzip versus the old approximately 384 KB; native per-day image payload is unchanged. This is a delivery-format tradeoff, not a layout or image-quality change.

## Progress continuity

Separate `/progress.html` page is built for BOTH origins. Old Render canonical/analytics origin remains Render in its normal build. The Cloudflare build uses its new canonical and existing analytics origin guard with the same public vendor token, no new custom events/token. Provider hostname registration/actual reporting must be checked in the account dashboard; current credentials do not expose that management screen. The transfer helper itself installs no analytics.

User-initiated workflow:
1. On `https://dreamerie.onrender.com/progress.html`, save a private progress JSON file.
2. On `https://dreamerie.kouvang0109.workers.dev/progress.html`, choose that file, review missing/matching/conflicting counts, then restore missing days.
3. Return to Dreamerie and check the result/streak before promoting a new public link.

The file is read locally, never uploaded or included in query strings/referrers. It includes only exact game records (days/card IDs/start/guesses/pending), not arbitrary browser storage. Known IDs, day bounds, session schema, future starts, duplicate days, guess limits and input-size limits are validated before writing. Existing days—including malformed/different records—are never overwritten. Import rechecks under the same daily Web Locks used by gameplay. Quota failures roll back new records; source storage is never changed. Imported active rounds keep their original start and unpaused deadline. Repeat imports are safe. Controls remain disabled until the helper has loaded.

This is a snapshot, not ongoing sync. Finish the current round and close other game tabs before exporting where possible; if progress changes afterward, export again. Keep the original site and private backup until checked. No automatic relocation, storage clearing, cross-device account or forced redirect.

## Checks completed locally

- **110 tests** passed (106 existing plus four transfer safety tests), zero failures/skips/cancellations.
- TypeScript, normal Render build and Cloudflare build pass; 383-card metadata gate and historical 120-pair/240-PNG validator pass.
- Required-artifact coverage for all saved IDs and all calendar dates/holidays through 2046; file-count/size/free limits, encoded pixel/ICC checks and artifact SHA256 checks pass.
- Isolated Chromium/Edge touch emulation: preferred five viewport/DPR sizes, native aspect/crop placement and touch coordinates, five actual confirmations, cap, reload/Continue, historical artwork, original expiry; newly completed/restored results first pinch, pan, fitted page scroll, reset/re-pinch, overlays, orientation, native pointer/touch cancellation; loading/failure/retry, background expiry, same-tab midnight, saved next-day result, spoiler-free share/copy adapters/fallback.
- Two local origins: export privacy, review-before-write, conflicts/repeats/invalid files, unchanged source/unrelated storage, imported active marker/original expiry; no JS errors on successful runs.
- Local Workers routing/header semantics: HTML revalidates; transfer no-store/no-referrer; hashed artwork immutable; missing art 404. CLI static-only dry run passes.

The first helper test exposed premature clicking before module handlers were loaded; disabled-until-ready controls fix it. A browser-harness DOM return was changed to Boolean for CDP serialization. Rebuilding an actively watched artifact temporarily interrupted the local server; restarting after the complete build resolved it. These tooling/setup failures are not hidden in the successful evidence.

Physical Samsung Chrome confirmation, other physical devices, actual native share sheet/clipboard and dashboard analytics attribution remain unverified. User-reported good feedback and approved sharing experience are accepted; no new visual preview or first-feedback gate is introduced.

## Deployment/cutover sequence

Push the tested migration branch and deploy the exact candidate artifact to the new free static Worker. Verify release marker and code/art/header samples plus bounded live game/transfer checks. Make the helper reachable on the existing Render site without redirecting or changing its preferred game, verify continuity again, and retain Render. Report final source commit and deployment IDs separately. Public main-link promotion and any migration notice remain parent/user cutover decisions. Never cancel/delete Render, change account/billing or expand access without explicit action-time authorization.

Evidence: `docs/cloudflare-migration-20261012/`; generated artifacts/native copies remain under ignored `.validation/`, with reproducible scripts in `scripts/`. No secrets are stored in repo or evidence.
