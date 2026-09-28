# Dreamerie web analytics

## Cloudflare setup — September 28, 2026

The owner selected free Cloudflare Web Analytics to start; Plausible/gameplay events may be considered later. The existing `dreamerie-playtest.onrender.com` hostname is registered in the owner's Cloudflare account. No domain, DNS, hosting, subscription, security or account permission changes were made.

**Status: live and collecting.** Following explicit owner approval, release `9eaad35554abd777b58cbd8c73272eba9159a6b7` was committed, pushed and deployed to the existing Render service. Deployment `dep-dat94aojo6nc73eobp4g` succeeded in 4m20s. One Cloudflare script is present on the live page, and the dashboard reports 2 visits / 2 page views after ordinary verification visits. Dashboard ingestion confirms delivery; individual network request status was not captured. No hosted daily round was started and no saved progress was cleared.

Open [Cloudflare Dashboard](https://dash.cloudflare.com/), then **Analytics → Web analytics → dreamerie-playtest.onrender.com**. Reports cover traffic, referrers, device/browser/country breakdowns and page performance. This is not a gameplay dashboard: no score/time/puzzle ID/guess/streak data or custom events are sent by our integration. Visits are not an exact cross-day count of distinct people. Blockers and sampling can affect totals; historical traffic before installation cannot be recovered.

`src/analytics/cloudflare.ts` loads the official module asynchronously, once, only for production builds at the exact HTTPS live origin. Local development, production previews on localhost/LAN, the separate V2 host and URLs with `dream`, `review` or `version` preview parameters are excluded. No reads/writes to cookies, localStorage or saved rounds are added. Analytics never gates Start or any gameplay action. A blocked/unavailable analytics script must not prevent play.

The embedded token is Cloudflare's public website identifier, not an account API credential. Do not introduce API keys into frontend code. We use the dashboard's manual snippet because hosting stays on Render. No Cloudflare proxy or paid features are needed.

To switch to a custom domain, update the registered hostname and exact origin guard together. To remove tracking or switch vendors, remove the installer call/import from `src/main.tsx` and add the approved replacement separately; don't silently run both. Cloudflare history is not assumed to import into Plausible. Adding gameplay measurements requires separate scoped instrumentation.

Sources: [manual installation](https://developers.cloudflare.com/web-analytics/get-started/), [collected performance data and storage behavior](https://developers.cloudflare.com/speed/observatory/rum-beacon/), [limitations and custom events](https://developers.cloudflare.com/web-analytics/faq/).

## Verified release

All 74 tests and production build/typecheck pass locally, on Render and in GitHub's successful check job (run `36448999173`). Analytics tests cover production/origin restrictions, preview exclusion, once-only script installation and optional-failure isolation. A production build served on localhost contains no Cloudflare script and restores the previous 2/5 · 1:23 result and streak unchanged; Home/View result work and browser errors are empty. Live homepage and health return 200; the live bundle is `index-PvFPaiP7.js`. Hosted browser verifies enabled Start, one async module script with the registered public site token, and no errors. Cloudflare's report populated after a short reporting delay. Initial counts include verification visits and are not organic player totals. V2 is unchanged.

Published Conventional Commit: `feat(analytics): add production-only Cloudflare web analytics`.

Future approved V3 deployments must select the exact approved commit for the existing Render service, never latest main. Do not change hosting settings or rebuild the separate V2 site. This documentation-only publication record requires no redeployment.
