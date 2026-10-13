# Root dependency correction — WU-CGW-SEC-001A

Repository/branch/task/run: Shota-Zaki/codex-chatgpt-web / work / CGW-SEC-001 / WU-CGW-SEC-001A-20261014; iteration/attempt 1/1. Model/effort: unknown. Limits: Skill defaults (3 iterations, 2 phase retries, 120-minute phase deadline, 30-minute command timeout).

Base commit/tree: dea108843b4607740501060ba1f49a8f37e82e3c / ea33d4374953483a15287451753b47482ae3f61d.
Candidate commit/tree: f2a311c795ea4644dcc57b18995547b5e81426cf / cc3779b24cc7b0c73f8fa3a7d65dde1cea7b15a8.
Post-change tested tree: same Candidate tree. This later evidence commit is not a tested Candidate. GitHub work HEAD and all three changed file contents were fetched; remote blob identities matched Candidate blobs.

## Scope and security boundary

Changed root package.json/bun.lock and tests/dependency-security.test.ts only. Pin the minimal compatible SDK 1.x security version 1.31.0; change fast-uri to 3.1.8, hono to 4.13.7, and pin ip-address 10.7.1 / proxy-addr 2.0.8. Unrelated dependency versions/overrides and Launcher package/lock are preserved. No application authentication, model, locale, MCP transport or runtime source changed.

Baseline root audit reported 10 advisories across those packages. URI serialization could place an attacker-controlled port string into an authority; link-local classification omitted part of fe80::/10; subnet checks could match different address families. Three focused regressions failed on the old resolved packages and passed on this Candidate, including alternate injected port strings and legitimate numeric-port/subnet/address controls.

The actual product exploitability is narrower than package advisory severity. Ajv uses fast-uri for URI/schema resolution; no application URI-host trust/network sink was established. Production SDK use is McpServer + StdioServerTransport, with no HTTP OAuth client path found. The [SDK advisory](https://github.com/advisories/GHSA-6qxp-vccf-f47h) excludes servers/stdio clients; do not infer credential exposure here. The [URI normalization advisory](https://github.com/advisories/GHSA-hrr3-gc8f-f4qj), [link-local advisory](https://github.com/advisories/GHSA-rpw4-54j3-4h4q) and [proxy trust advisory](https://github.com/advisories/GHSA-jqcg-44mw-7w3h) establish package correction targets. Installed/locked versions and audit complement the selected trigger tests; those tests alone do not prove every named advisory behavior.

Pre-patch investigator and fresh bypass/regression reviewer performed source-only internal checks, with no edits or test execution. No concrete surviving locked vulnerable route or compatibility regression was reported. These contexts are internal technical checks, not C2C independent accepted Review and not an OS-enforced read-only certification.

## Results

- Root audit: passed, zero vulnerabilities reported (108 packages); prior failure retained in quality baseline.
- Typecheck and root runtime build: passed. Frozen install: passed, package/lock unchanged.
- URI/address regression plus strict-output/MCP-observation/Zero Risk stdio tests: passed, 17 tests and 140 assertions.
- Full root suite: failed, 782 passed / 2 failed / 3 existing skips, 58 files, 5903 assertions. Same two file-symlink EPERM failures as the pre-change Windows baseline. No new skip, removed test or elevation.
- An earlier combined focused selection including chatgpt-web-harness stopped progressing and was terminated after about 218 seconds; observed exit -1 is preserved as failed. The owned process was identified by PID, exact executable and command before stopping. The subsequent full suite ran that harness successfully, but the combined-selection hang remains an unresolved test-order/process-lifecycle concern; it is not relabeled passed.
- verify: failed at launcher:audit after root audit passed. Later verify checks did not run. Launcher still has 28 audit advisories and its baseline file-symlink failure. This root correction does not claim Launcher acceptance.

Outcome under fix-finding: blocked for complete verification/acceptance. The reproduced package triggers no longer reproduce and legitimate focused controls pass; relevant full-suite/verify gates still fail. Implementation is committed, independent Review remains awaiting_review. No claim of Task Done or complete security remediation.

## Execution metadata

Source: Windows exec output and locally captured metadata; implementation-owned. Raw logs are temporary local output only and are not published. Dates below are UTC; user-facing run date is 2026-10-14 JST. Digest/blob identity is not tamper-proof execution evidence.

```json
[
  {
    "finishedAt": "2026-10-13T22:50:49.6964134Z",
    "cwd": "C:\\project\\codex-chatgpt-web",
    "startedAt": "2026-10-13T22:50:49.4971771Z",
    "command": "bun test ./tests/dependency-security.test.ts",
    "exitCode": 1,
    "attemptId": "security-trigger-before",
    "status": "failed",
    "outputReference": "C:/Users/shota/AppData/Local/Temp/cgw-20261014-verification/security-trigger-before.log",
    "testedTree": "unknown (pre-Candidate reproduction or dependency installation)"
  },
  {
    "exitCode": 0,
    "cwd": "C:\\project\\codex-chatgpt-web",
    "startedAt": "2026-10-13T22:50:58.8803536Z",
    "finishedAt": "2026-10-13T22:51:02.6016223Z",
    "command": "bun install",
    "attemptId": "security-install",
    "status": "passed",
    "outputReference": "C:/Users/shota/AppData/Local/Temp/cgw-20261014-verification/security-install.log",
    "testedTree": "unknown (pre-Candidate reproduction or dependency installation)"
  },
  {
    "finishedAt": "2026-10-13T22:51:16.6877214Z",
    "cwd": "C:\\project\\codex-chatgpt-web",
    "exitCode": 0,
    "command": "bun run typecheck",
    "startedAt": "2026-10-13T22:51:13.8428783Z",
    "attemptId": "security-typecheck",
    "status": "passed",
    "outputReference": "C:/Users/shota/AppData/Local/Temp/cgw-20261014-verification/security-typecheck.log",
    "testedTree": "cc3779b24cc7b0c73f8fa3a7d65dde1cea7b15a8"
  },
  {
    "finishedAt": "2026-10-13T22:54:54.6482956Z",
    "cwd": "C:\\project\\codex-chatgpt-web",
    "exitCode": -1,
    "command": "bun test ./tests/dependency-security.test.ts ./tests/responses-text-controls.test.ts ./tests/mcp-observation.test.ts ./tests/zero-risk-mcp-lifecycle.test.ts ./tests/chatgpt-web-harness.test.ts",
    "startedAt": "2026-10-13T22:51:16.6990821Z",
    "attemptId": "security-focused",
    "status": "failed",
    "outputReference": "C:/Users/shota/AppData/Local/Temp/cgw-20261014-verification/security-focused.log",
    "testedTree": "cc3779b24cc7b0c73f8fa3a7d65dde1cea7b15a8"
  },
  {
    "finishedAt": "2026-10-13T22:54:54.8426766Z",
    "cwd": "C:\\project\\codex-chatgpt-web",
    "exitCode": 0,
    "command": "bun audit",
    "startedAt": "2026-10-13T22:54:54.6518944Z",
    "attemptId": "security-audit",
    "status": "passed",
    "outputReference": "C:/Users/shota/AppData/Local/Temp/cgw-20261014-verification/security-audit.log",
    "testedTree": "cc3779b24cc7b0c73f8fa3a7d65dde1cea7b15a8"
  },
  {
    "finishedAt": "2026-10-13T22:55:01.3240024Z",
    "cwd": "C:\\project\\codex-chatgpt-web",
    "exitCode": 0,
    "command": "bun run build",
    "startedAt": "2026-10-13T22:54:54.8482934Z",
    "attemptId": "security-build",
    "status": "passed",
    "outputReference": "C:/Users/shota/AppData/Local/Temp/cgw-20261014-verification/security-build.log",
    "testedTree": "cc3779b24cc7b0c73f8fa3a7d65dde1cea7b15a8"
  },
  {
    "startedAt": "2026-10-13T22:54:24.0064380Z",
    "exitCode": 0,
    "finishedAt": "2026-10-13T22:54:31.4540177Z",
    "command": "bun test ./tests/dependency-security.test.ts ./tests/responses-text-controls.test.ts ./tests/mcp-observation.test.ts ./tests/zero-risk-mcp-lifecycle.test.ts",
    "cwd": "C:\\project\\codex-chatgpt-web",
    "attemptId": "security-focused-isolated",
    "status": "passed",
    "outputReference": "C:/Users/shota/AppData/Local/Temp/cgw-20261014-verification/security-focused-isolated.log",
    "testedTree": "cc3779b24cc7b0c73f8fa3a7d65dde1cea7b15a8"
  },
  {
    "startedAt": "2026-10-13T22:54:31.4730392Z",
    "exitCode": 0,
    "finishedAt": "2026-10-13T22:54:31.6609953Z",
    "command": "bun audit",
    "cwd": "C:\\project\\codex-chatgpt-web",
    "attemptId": "security-audit-confirmed",
    "status": "passed",
    "outputReference": "C:/Users/shota/AppData/Local/Temp/cgw-20261014-verification/security-audit-confirmed.log",
    "testedTree": "cc3779b24cc7b0c73f8fa3a7d65dde1cea7b15a8"
  },
  {
    "startedAt": "2026-10-13T22:54:31.6675604Z",
    "exitCode": 0,
    "finishedAt": "2026-10-13T22:54:38.1539670Z",
    "command": "bun run build",
    "cwd": "C:\\project\\codex-chatgpt-web",
    "attemptId": "security-build-confirmed",
    "status": "passed",
    "outputReference": "C:/Users/shota/AppData/Local/Temp/cgw-20261014-verification/security-build-confirmed.log",
    "testedTree": "cc3779b24cc7b0c73f8fa3a7d65dde1cea7b15a8"
  },
  {
    "startedAt": "2026-10-13T22:54:38.1588935Z",
    "exitCode": 1,
    "finishedAt": "2026-10-13T22:54:38.6529219Z",
    "command": "bun run verify",
    "cwd": "C:\\project\\codex-chatgpt-web",
    "attemptId": "security-verify",
    "status": "failed",
    "outputReference": "C:/Users/shota/AppData/Local/Temp/cgw-20261014-verification/security-verify.log",
    "testedTree": "cc3779b24cc7b0c73f8fa3a7d65dde1cea7b15a8"
  },
  {
    "command": "bun test ./tests",
    "exitCode": 1,
    "cwd": "C:\\project\\codex-chatgpt-web",
    "startedAt": "2026-10-13T22:52:38.7347202Z",
    "finishedAt": "2026-10-13T22:55:16.4021662Z",
    "attemptId": "security-root-tests",
    "status": "failed",
    "outputReference": "C:/Users/shota/AppData/Local/Temp/cgw-20261014-verification/security-root-tests.log",
    "testedTree": "cc3779b24cc7b0c73f8fa3a7d65dde1cea7b15a8"
  },
  {
    "exitCode": 0,
    "command": "bun install --frozen-lockfile",
    "finishedAt": "2026-10-13T22:56:28.0486674Z",
    "cwd": "C:\\project\\codex-chatgpt-web",
    "startedAt": "2026-10-13T22:56:27.8858109Z",
    "attemptId": "security-frozen",
    "status": "passed",
    "outputReference": "C:/Users/shota/AppData/Local/Temp/cgw-20261014-verification/security-frozen.log",
    "testedTree": "cc3779b24cc7b0c73f8fa3a7d65dde1cea7b15a8"
  }
]
```

## Remaining gates

Eligible different-context read-only GitHub Review, combined focused selection investigation, symlink-capable Windows verification, Launcher security correction, interactive modes/GUI/live/restart acceptance remain incomplete. Existing Japanese and Skill packets remain awaiting_review. Deferred Runtime, main, fixed source, credentials, services, releases and deployments remain unchanged.
