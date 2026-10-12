# Transfer point-field allowlist follow-up

The migration source `23f831a` is live on both providers. Before cutover, a synthetic adversarial test confirmed that parseSession's valid point object could retain unrelated nested properties inside the private export file. There was no network disclosure or change to source storage.

This authorized narrow correction clones transferred guess/pending points as **only `{x,y}`**. All documented session fields—card, day, original start, elapsed guess times, guesses and pending side—remain exact. Import uses the same normalization. Existing-record comparisons ignore unknown point properties for matching purposes while leaving destination/source raw records untouched. Different existing days remain conflicts and are never replaced.

Verification: **111 full tests pass**, including malformed/future/unsupported/duplicate/oversized input, active deadline and marker continuity, conflict recheck, repeat import, write-failure rollback and adversarial nested-field exclusion. Both provider builds/typecheck pass. A real browser local two-origin test injects a synthetic non-game field into stored pending points, verifies the field is absent from the file and target, and verifies source storage remains byte-identical. The game bundles/CSS/artwork are unchanged; only the helper bundle changes.

Evidence under `docs/transfer-allowlist-20261012/`. Final live deployment IDs and asset verification are recorded separately after deployment. No other migration features, layout/rules, runtime/billing/access or redirect changes.
