# Dreamerie web analytics

## Cloudflare setup — September 28, 2026

The owner selected free Cloudflare Web Analytics to start; Plausible/gameplay events may be considered later. The existing `dreamerie-playtest.onrender.com` hostname is registered in the owner's Cloudflare account. No domain, DNS, hosting, subscription, security or account permission changes were made.

**Status: account configured and code prepared locally; not committed, pushed or deployed. Live data collection is not yet verified.** Publish only after owner approval. After deployment, verify one script on the live page, a successful Cloudflare beacon request and incoming dashboard data (which may take several minutes). Do not start a hosted daily round or clear saved progress to test analytics.

Open [Cloudflare Dashboard](https://dash.cloudflare.com/), then **Analytics → Web analytics → dreamerie-playtest.onrender.com**. Reports cover traffic, referrers, device/browser/country breakdowns and page performance. This is not a gameplay dashboard: no score/time/puzzle ID/guess/streak data or custom events are sent by our integration. Visits are not an exact cross-day count of distinct people. Blockers and sampling can affect totals; historical traffic before installation cannot be recovered.

`src/analytics/cloudflare.ts` loads the official module asynchronously, once, only for production builds at the exact HTTPS live origin. Local development, production previews on localhost/LAN, the separate V2 host and URLs with `dream`, `review` or `version` preview parameters are excluded. No reads/writes to cookies, localStorage or saved rounds are added. Analytics never gates Start or any gameplay action. A blocked/unavailable analytics script must not prevent play.

The embedded token is Cloudflare's public website identifier, not an account API credential. Do not introduce API keys into frontend code. We use the dashboard's manual snippet because hosting stays on Render. No Cloudflare proxy or paid features are needed.

To switch to a custom domain, update the registered hostname and exact origin guard together. To remove tracking or switch vendors, remove the installer call/import from `src/main.tsx` and add the approved replacement separately; don't silently run both. Cloudflare history is not assumed to import into Plausible. Adding gameplay measurements requires separate scoped instrumentation.

Sources: [manual installation](https://developers.cloudflare.com/web-analytics/get-started/), [collected performance data and storage behavior](https://developers.cloudflare.com/speed/observatory/rum-beacon/), [limitations and custom events](https://developers.cloudflare.com/web-analytics/faq/).

## Verification and publication handoff

All 74 tests and production build/typecheck pass. Analytics tests cover production/origin restrictions, preview exclusion, once-only script installation and optional-failure isolation. A production build served on localhost contains no Cloudflare script and restores the previous 2/5 · 1:23 result and streak unchanged; Home/View result work and browser errors are empty. Cloudflare shows the registered site with zero data, as expected before deployment. Live script loading/beacon delivery/dashboard ingestion remain the release checks, not claimed complete.

Suggested Conventional Commit: `feat(analytics): add production-only Cloudflare web analytics`.

Only after explicit owner publication approval:

```powershell
git add -- AGENTS.md README.md package.json src/main.tsx src/analytics/cloudflare.ts tests/analytics.test.ts docs/ANALYTICS.md
git commit -m "feat(analytics): add production-only Cloudflare web analytics"
git push origin prototype/v3-dream-ritual
```

Then select that exact approved V3 commit for the existing Render service, never latest main. Do not change hosting settings or rebuild the separate V2 site.
