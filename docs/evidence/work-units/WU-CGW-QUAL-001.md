# Windows quality baseline — 2026-10-14 JST

Repository/branch: `Shota-Zaki/codex-chatgpt-web` / `work`.
Task/WU/run: `CGW-QUAL-001` / `WU-CGW-QUAL-001A` / `WU-CGW-QUAL-001-20261014`; iteration/attempt 1/1; model/effort unknown.
Base and tested commit/tree: `bc48ac53fbc7f50544b971a8013ab29dd7263bb7` / `5419edd2772fae132adc2ccf62c3aa6f7221d9bf`.
No product Candidate was created. Later evidence/packet/checkpoint commits are not tested Candidates.

Windows x64; Node 24.19.0; Bun 1.4.0 (`34cbb9a40`), obtained from the official `oven-sh/bun` release. Root and Launcher frozen installs returned 0; both package/lock files remained unchanged. Bun first ran from temporary storage, then the same binary was copied into ignored workspace `node_modules/.bin/bun.exe` to satisfy existing durable-runtime validation. Only command-local PATH changed; no system/global setting, service or credential changed.

| Check | Result |
| --- | --- |
| Root typecheck | passed, exit 0 |
| Root tests, temporary Bun | failed, 624 pass / 157 fail / 3 skip; durable-runtime discovery rejected temporary executable |
| Root tests, workspace Bun retry | failed, 779 pass / 2 fail / 3 skip |
| Root build | passed, exit 0 (both attempts) |
| Launcher tests before install | failed, 202 pass / 9 fail / 4 skip; missing dependencies |
| Launcher typecheck | passed, exit 0 |
| Launcher tests after install | failed, 342 pass / 1 fail / 4 skip |
| Launcher renderer build | passed, exit 0 |
| Login/model focused recovery tests | passed, 21 tests / 104 assertions |
| verify | failed, exit 1 at root audit; later verify steps did not run |
| Launcher audit (separate command) | failed, 28 advisories: 13 high / 11 moderate / 4 low |

Command/cwd/start/end/exit/output references are in [execution metadata](../executions/WU-CGW-QUAL-001-20261014.json). Raw logs remain temporary local output; they were not exported to GitHub. Test fixture token hashes/logs are not needed for this record. These are implementation-owned observations, not tamper-proof or independent execution attestations.

## Remaining Windows failures

Root: `tests/codex-integration.test.ts`, “route install, update, switching and removal preserve a symlinked shared Codex config” and “config compensation preserves the link and refuses redirected or invalid targets”. Launcher: `launcher/tests/runtime-host.test.cjs`, “failed fresh-conversation setting restores every mutable setup file before restarting the previous runtime”. All fail creating file symlinks with EPERM in this non-elevated Windows environment. File-symlink behavior remains blocked; the suites remain failed. No test was removed or newly skipped, and no privilege elevation was requested.

## Current dependency audit

Root audit reports 10 advisories (1 critical / 3 high / 6 moderate) across SDK 1.30.0, fast-uri 3.1.6, hono 4.13.5, ip-address 10.3.1 and proxy-addr 2.0.7. The SDK OAuth advisory does not imply a reachable product credential exposure: production imports use SDK server/stdio APIs, and the advisory excludes server/stdio clients. An internal read-only investigator independently checked this path; that investigation is not the independent C2C Review gate. Fast-uri is used by Ajv validation; no application URI host trust/network sink was confirmed. Remaining advisories require bounded dependency remediation and fresh regression/audit evidence; no current audit result is relabeled passed.

## Acceptance limits

GUI/Electron launch, real authentication, live browser/MCP/Tunnel connections, the three interactive modes, restart recovery and distribution smoke: not_run. No live credentials were used or changed. Mac and Deferred Runtime remain unchanged. Previous Runtime Candidate failures retain their historical identities.

Japanese Candidate `c40569513db245136c21724a01ff4ed3f928b22a` and Skill Candidate `faeb96747e1b238a2d1125e37177e70ca70ef3ff` remain awaiting_review; their source paths are unchanged relative to work. This baseline has a different tree and does not replace their original Candidate-bound Verification. No returned eligible Reviewer result exists. Skill-first, Japanese acceptance and full product completion are not achieved.
