# WU-CGW-QUAL-001B — bounded broker test termination investigation

Repository/branch: Shota-Zaki/codex-chatgpt-web / work. Parent Task: CGW-QUAL-001. Authorized by the active goal's independent quality work.

## Observed baseline

The original combined security/MCP/harness selection stopped after broker revocation and was terminated after approximately 218 seconds in the prior run. Fresh 2026-10-15 Windows/Bun 1.4.0 filtering to only “batches parallel ChatGPT MCP calls into one native Responses round” and “revoking a turn rejects pending invocations and invalidates its binding” also exceeded an external 30-second deadline. The pending call has a 10-second timeout, so test termination was not established. A separate ordinary-await synthetic broker registration/invocation/revoke/resolve/close control completed immediately. These observations do not yet prove a broker production defect or the exact Bun matcher mechanism.

## Exact scope and constraints

Initial code scope: `tests/chatgpt-web-harness.test.ts`, only the revocation test. Evidence: `docs/evidence/work-units/WU-CGW-QUAL-001B.md`; independent Review request: `docs/evidence/reviews/WU-CGW-QUAL-001B-CANDIDATE.md`. This packet is a separate design artifact. Checkpoint changes are separate.

Compare normal Promise settlement plus synchronous Error assertions against pending-promise rejection matchers. Preserve both rejection outcomes, Error type, revoked-message condition and stale-binding rejection condition. Retain broker close and cleanup; no deleted assertions, extra skip, timeout increase, runtime/authentication/TLS changes or weaker platform acceptance. Do not alter production broker code without a separately confirmed defect and revised bounded scope.

## Verification and completion

Capture exact test/tree/command/cwd/start/end/exit/signal with an external deadline so a stalled matcher cannot hang the verification process indefinitely. The two-test selection has 30 seconds; the full original combined selection has 180 seconds (diagnostic limits). Compare the same scope before/after. Run root typecheck and applicable whole-root regression; preserve unrelated Windows file-symlink failures and residual Launcher advisories. Only commit a correction if the reproduction supports it; otherwise retain failed evidence and investigate the next concrete hypothesis within finite Skill limits. Independent C2C Review remains required; internal debugging is not acceptance.
