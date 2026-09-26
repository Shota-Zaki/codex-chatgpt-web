# WU-CGW-AUD-002C3 — C2C runtime and lifecycle test audit

- Audit type: static source inspection only
- Source repository: `Shota-Zaki/codex-with-chatgpt`
- Fixed source commit: `89af4fa34952fe58e017b095ae2f793420cf05b0`
- Vitest/Node runtime tests were not executed.

## Files inspected

| File | Fixed blob |
| --- | --- |
| tests/runtime.test.ts | `8781f715a0443f05569540c29e402bea7e3b1277` |
| tests/runtime/localization.node.mjs | `9921bc4ca817cd24c809b2d77218aa45f6445513` |
| tests/runtime/privacy.node.mjs | `0a19db1d6c4c99fe16d51569d1d82361ac0d60f2` |
| tests/runtime/service.node.mjs | `9f799150a62b1c1350b588e034e2b8b0bc9dbbf8` |
| tests/sandbox-allow.test.ts | `9f31b76be1d14f1d71b656148e897b1fc0846ef7` |
| tests/session.test.ts | `1b769d9812e833eda40a7c97fff95f31302e4802` |
| tests/tunnel.test.ts | `8a5a009e56f00b6ace11015f2f4fcd9cd05c2ec9` |
| tests/windows-process.test.ts | `f5f5d5ccd52a07886b1958ac8937744a705ecf1b` |

## Defensive behavior worth preserving

- Child-process environment allowlists remove API keys, Git injection variables, `NODE_OPTIONS` and proxy secrets.
- Runtime observation distinguishes missing/dead/unknown/healthy rather than killing an uncertain live process.
- Privacy bootstrap denies arbitrary egress, strips credentials from public health probes and disallows public request bodies.
- Mac service helpers validate volume UUID/mount/realpath, use bounded retries, protect config/log permissions, reject log symlinks and ambiguous locks.
- Session checkpoints are bounded and survive expected conversation-pointer changes.
- Tunnel process handling prevents duplicate starts and checks a service-identity health payload rather than HTTP 200 alone.
- Windows subprocess tests require hidden background windows.

## Source behavior intentionally not adopted unchanged

1. **F02 — whole state writable root**: `tests/sandbox-allow.test.ts` explicitly verifies adding the complete C2C state directory to Codex `sandbox_workspace_write.writable_roots`. Integrated design replaces this with a narrow Host-owned evidence inbox; auth/runtime/review-decision state stays private.
2. **F08 — implicit Named→Quick fallback**: `tests/tunnel.test.ts` explicitly expects failed Named provisioning to persist Quick preference and return fallback success. Integrated design keeps existing Named state intact and requires an explicit Quick-mode action.
3. Source service paths/labels/volume assumptions are not product ownership rules. They become adapter inputs and later Mac acceptance cases.
4. Source localization checks are source-specific; the integrated product keeps all existing `codex-chatgpt-web` locales and uses its i18n system.

## Additional lifecycle acceptance

The integrated runtime must prove owner identity before stop/restart, distinguish SIGTERM request from process exit, cap/log retries, preserve state on failed provisioning, and never use an uncertain PID/port as authority.
