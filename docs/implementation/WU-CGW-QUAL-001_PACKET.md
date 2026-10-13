# Windows quality and dependency remediation packet

Repository: `Shota-Zaki/codex-chatgpt-web`; branch: `work`.
Authorized by the 2026-10-14 goal objective, phases 3–4. These tasks are independent of Japanese-first Review acceptance and do not resume Deferred Runtime.

## WU-CGW-QUAL-001A — Windows baseline

Base/tested commit: `bc48ac53fbc7f50544b971a8013ab29dd7263bb7`; tree: `5419edd2772fae132adc2ccf62c3aa6f7221d9bf`.
Scope: `docs/evidence/work-units/WU-CGW-QUAL-001.md`, `docs/evidence/executions/WU-CGW-QUAL-001-20261014.json`.

Use Bun 1.4.0 and frozen root/Launcher locks. Record installation separately. Run root and Launcher typecheck/tests/build and verify, with timestamps, exit codes and exact tested tree. Preserve every failed attempt. Separate temporary-Bun discovery failure, Windows symlink privileges, actual code failures and audit advisories. No privilege elevation, new skips, test removal, TLS bypass or ignored audit failures.

Baseline evidence is implementation-owned and does not satisfy independent review or GUI/live Windows acceptance. The Japanese and Skill code Candidates remain unchanged. Keep Review packets awaiting an eligible result.

## WU-CGW-QUAL-001B — Confirmed Windows/test defects

Before implementation, re-fetch work and write a bounded packet with exact failing tests and at most 10 source/test/evidence paths. Only fix reproduced defects. An unavailable file-symlink privilege is a blocked environment check; do not substitute a weaker assertion or claim the symlink behavior passed. Require fresh Candidate-bound verification and independent Review.

## WU-CGW-SEC-001A — Root dependency advisories

Scope ceiling: `package.json`, `bun.lock`, one focused dependency regression test if warranted, Evidence and Review packet (at most 5 paths). Check advisory affected/patched ranges against actual package versions and production callers before selecting a change. Investigate SDK OAuth, URI parsing, HTTP server and address-trust paths; audit severity alone does not prove a reachable application exploit.

Targeted compatible patched dependencies may be selected only to address identified advisories and preserve existing MCP/stdio/model/browser/authentication contracts. Do not run indiscriminate audit fix or update dependencies to hide test failures. SDK major migration, authentication redesign and credential changes are outside this packet. Run audit, typecheck, focused MCP/transport tests and root build, then complete applicable root regression checks. An unchanged audited package is not a security acceptance pass.

## WU-CGW-SEC-001B — Launcher dependency advisories

Separate root and Launcher locks. Inspect Electron download/build and Vite/renderer dependency callers. Freeze direct versions except the minimal documented compatible security correction. Determine exact paths and patch boundary before editing; test/typecheck/build/package compatibility evidence and independent Review remain required. No release, deploy or signing changes.

## Completion and bounds

Task records live in TASKS; NEXT_WORK selects one executable WU. Three implementation iterations, two retries per phase, 120-minute phase deadline, 30-minute command timeout (Skill defaults). Cancel prevents another phase. Preserve past Runtime failures and all locales. Do not mark Done without matching verification and an eligible independent accepted Review. Record GUI, real login, mode operation, release and Mac 24-hour acceptance separately as not_run when unobserved.
