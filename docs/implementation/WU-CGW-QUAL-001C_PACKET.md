# WU-CGW-QUAL-001C — isolated local directory-package verification

Repository/branch: Shota-Zaki/codex-chatgpt-web / work. Parent Task: CGW-QUAL-001. Continue only after re-fetching work and restoring the current checkpoint.

## Purpose and exact scope

Unpackaged Windows startup/exit/restart now has isolated smoke evidence in WU-CGW-QUAL-001B. Verify the remaining local directory-package/runtime-bundle boundary using existing scripts and the current dependency Candidates. This is reversible local verification, not a Release, Deploy, installer installation, live login or full product acceptance.

Tracked scope: `docs/evidence/work-units/WU-CGW-QUAL-001C.md` and synchronized checkpoint as a separate commit. Read existing `launcher/scripts/prepare-runtime.cjs`, `launcher/scripts/package.cjs`, `launcher/scripts/smoke-package.cjs`, runtime-install/command/profile/main code and installed builder CLI help. No product/package/lock/source change is authorized by this verification-only unit. Any confirmed product defect needs a separately bounded fix packet/new Candidate.

## Procedure

1. Record current GitHub code/evidence anchors and tested tree, Windows/Bun/Node/Electron versions and finite limits.
2. Prepare existing runtime bundle using `bun run --cwd launcher build:runtime`; verify only expected ignored build outputs change and package/locks stay identical.
3. Inspect installed electron-builder CLI help. If supported, build a Windows directory target with publishing disabled and an isolated output directory. Preserve existing signing/TLS/validation settings. Do not invoke the installer/distributable smoke script or remove existing artifacts.
4. Validate local embedded runtime/entrypoint, relevant dependencies/license notices and renderer assets. If a directory executable can safely use the existing smoke path with isolated data/core/Codex home, use it; inspect autostart/profile code first to avoid affecting user's OS login settings. Use a workspace-owned ignored durable root if existing runtime validation rejects temporary paths. Never reuse actual credentials, browser profile, application state, default OS registration or services.
5. Run only owned bounded child processes, save exit/time/marker freshness and stop only verified owned processes if a deadline expires. No arbitrary blanket process termination. No administrator escalation or symlink/validation bypass.
6. Record package/launch errors as failed or blocked, not success. Distinguish unsigned local directory build, packaged startup, real installer/distribution, visual locale acceptance, authentication and operational modes. Residual no-patch advisories and all independent Review gates remain open.

Skill limits: 3 iterations, 2 phase retries, 120-minute phase deadline, 30-minute command timeout. No future monitor or automatic release/publication is created.
