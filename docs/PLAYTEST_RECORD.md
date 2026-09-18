# Prototype 0.2.8 playtest record

Status: deployed on Render on 2026-09-18; initial hosted smoke checks pass. Full multiplayer and physical-device acceptance remain pending.

| Item | Result |
| --- | --- |
| Hosted URL / deployed commit | https://dreamerie-playtest.onrender.com / `52e2e3822e5bf2ae983bcb4b0c37d7af89df17f9`; Render reports Live after the APP_ORIGIN update |
| Owner / hosting account | User-owned Dreamerie workspace on Render; Hobby workspace |
| Actual compute, disk, workspace and usage charges | User approved provisioning at the displayed $7/month service + $0.25/month disk estimate. Usage and taxes additional; final invoice not yet available. |
| Initial hosted smoke checks | HTTPS health returns `{"ok":true}`; browser session and test-room creation succeed; host seat and invitation survive refresh. Service auto-deploy is Off and Blueprint Auto Sync is paused. |
| Initial playtest access | Public entry and room creation verified in Chrome. Cross-session membership/privacy checks and human multiplayer testing remain pending on the actual host. |
| Linux / Node 24 CI | Workflow prepared; not yet run on GitHub |
| Local backup/restore rehearsal | Pass: private state, identities, deadlines, results and command receipts survive an online snapshot and restore into a separate database |
| Actual-host restore / off-site verified copy | Pending |
| iPhone Safari / Android Chrome | Pending physical-device testing |
| Desktop browser / 2-player week | Pending hosted testing |
| Six-player human week | Pending hosted testing |
| Real hosted midnight, all browsers closed | Pending |
| Restart/redeploy and phone background/resume | Pending hosted testing |
| Closure, lobby expiry and recap expiry | Local automated coverage exists; actual-host observation pending |
| Representative concurrency / latency / bandwidth | Not measured; no public capacity claim |
| User acceptance | Pending |

Record failures, misunderstandings and improvements after each session. In particular, note whether players understand dream clues, lock/unlock, recognition points, the two-player scoring consequence and what happens when a day is missed. Do not record actual passwords, cookies or private dream clues here.
