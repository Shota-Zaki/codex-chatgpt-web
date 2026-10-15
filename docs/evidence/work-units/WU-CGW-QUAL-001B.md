# Broker test termination correction and isolated Windows startup

Repository/branch/task/run: Shota-Zaki/codex-chatgpt-web / work / CGW-QUAL-001 / WU-CGW-QUAL-001B-20261015; iteration 1; command attempts identified below; model/effort unknown.
Base commit/tree: 98c500294f6d2b909625028e957edaab492907eb / 5235fd391932842d843e8dcf5e3d0525b77a8355.
Candidate commit/tree: 671a9c25d2a73baf98a2a2a61225747eb5ca8e0f / c61b94ea6491699c604985401809f6cb945afd20. Post-change checks used this staged tree, later committed unchanged. Evidence/checkpoint commits are not tested Candidates.
Design: docs/implementation/WU-CGW-QUAL-001B_PACKET.md. Limits: Skill defaults, with stricter external diagnostic deadlines (two tests 30s, combined 180s, whole root 240s). No test timeout increase, new skip or runtime permission change.

## Reproduction and correction

The original revocation test used pending-promise rejection matchers. On Windows/Bun 1.4.0, a two-test selection (parallel delivery and revocation) timed out after 30s, and the original five-file selection timed out after 180s. Both stopped after the broker's revocation diagnostic. An ordinary-await synthetic control registered/invoked/revoked/resolved/closed the same broker path immediately.

Only tests/chatgpt-web-harness.test.ts changed. The revocation test now awaits normal Promise settlement before synchronous assertions, checks each rejection is an Error with the same revoked / already-finished message condition, and closes the broker in finally. Successful Promise resolution produces undefined and fails the Error assertion. No production broker, transport, token, authentication, locale or mode code changed. The exact Bun internal mechanism is not established; this is a test-harness termination correction, not proof of a production broker defect.

Matched post-change results:

- The same two-test selection passed: 2 tests, 12 assertions, 329ms (external process elapsed about 0.35s).
- The original five-file selection passed: 103 tests, 769 assertions, 37.41s, within the same 180s bound.
- Root typecheck passed.
- Full root suite failed: 782 passed / 2 failed / 3 existing skips, 787 tests / 5905 assertions / 155.58s. Failures remain the two file-symlink EPERM cases in codex-integration.test.ts. No other root failure was observed. They are not relabeled passed.
- GitHub work HEAD and the changed test content were fetched; remote blob 51d69a3ceefade7f6e6d6fe5db580fe4d0137fa0 matches the Candidate file.

The minimal baseline metadata was preserved from the original exec result after its temporary raw log was accidentally reused by the after attempt. The original baseline raw log is no longer available at that filename; the record explicitly cites the exec observation instead. The combined baseline raw log/metadata and both after outputs have separate paths. No baseline is marked successful from a missing log.

## Independent Windows startup observation

Using installed Electron 41.10.7 and built renderer, the existing --launcher-smoke-test path was executed in a fresh isolated temporary production-profile data/core/Codex home. A synthetic state selected ja, onboardingComplete=true and autoStart=false to support hidden startup. No user's saved state, login/browser credentials or global settings were imported. Startup smoke skips authentication refresh and updater checks; no setup/daemon/Tunnel or installed distribution was launched.

First startup exited 0 and wrote ok/version 6.1.0/platform win32/packaged false/runtimeVerified true. Re-launching against the same isolated data also exited 0, retained ja/onboardingComplete/autoStart controls, loaded renderer and verified CLI version. Post-run marker mtime 2026-10-15T11:53:00.103Z is inside the second command's start/end interval, establishing a fresh marker rather than reusing the first result. Child launch used windowsHide and a 45s external timeout. Raw diagnostic logs remain local, not published.

This proves an unpackaged Windows source startup/exit/restart and selected synthetic-state persistence only. It does not prove packaged startup, visual Japanese/onboarding acceptance, real authentication, browser/MCP/Tunnel operation or the three interactive modes. Those remain not_run or incomplete.

## Execution records

Source: exec/Node child-process observations on Windows; implementation-owned, not independent/tamper-proof execution proof. Dates UTC; user run date 2026-10-15 JST. Unobserved metadata remains unknown. Diagnostic output references are temporary local files; no confidential raw logs or credentials are exported.

```json
[
  {
    "timeoutMs": 30000,
    "finishedAt": "2026-10-15T11:45:15.144Z",
    "cwd": "C:/project/codex-chatgpt-web",
    "outputReference": "Original exec tool output in this chat; temporary minimal log was overwritten by subsequent after attempt",
    "status": "failed",
    "errorCode": "ETIMEDOUT",
    "signal": "SIGTERM",
    "source": "Observed baseline metadata returned by quality-repro helper, preserved from exec output",
    "command": [
      "C:\\project\\codex-chatgpt-web\\node_modules\\.bin\\bun.exe",
      "test",
      "./tests/chatgpt-web-harness.test.ts",
      "-t",
      "batches parallel ChatGPT MCP|revoking a turn rejects pending"
    ],
    "exitCode": null,
    "startedAt": "2026-10-15T11:44:45.124Z",
    "attemptId": "quality-minimal-before",
    "testedTree": "unknown (diagnostic baseline before staged Candidate)"
  },
  {
    "command": [
      "C:\\project\\codex-chatgpt-web\\node_modules\\.bin\\bun.exe",
      "test",
      "./tests/dependency-security.test.ts",
      "./tests/responses-text-controls.test.ts",
      "./tests/mcp-observation.test.ts",
      "./tests/zero-risk-mcp-lifecycle.test.ts",
      "./tests/chatgpt-web-harness.test.ts"
    ],
    "cwd": "C:/project/codex-chatgpt-web",
    "startedAt": "2026-10-15T11:45:15.225Z",
    "finishedAt": "2026-10-15T11:48:15.245Z",
    "exitCode": null,
    "signal": "SIGTERM",
    "errorCode": "ETIMEDOUT",
    "status": "failed",
    "outputReference": "C:\\Users\\shota\\AppData\\Local\\Temp\\cgw-20261015-verification\\quality-combined.log",
    "timeoutMs": 180000,
    "attemptId": "quality-combined-before",
    "testedTree": "unknown (diagnostic baseline before staged Candidate)"
  },
  {
    "command": [
      "C:\\project\\codex-chatgpt-web\\node_modules\\.bin\\bun.exe",
      "test",
      "./tests/chatgpt-web-harness.test.ts",
      "-t",
      "batches parallel ChatGPT MCP|revoking a turn rejects pending"
    ],
    "cwd": "C:/project/codex-chatgpt-web",
    "startedAt": "2026-10-15T11:48:53.319Z",
    "finishedAt": "2026-10-15T11:48:53.671Z",
    "exitCode": 0,
    "signal": null,
    "errorCode": null,
    "status": "passed",
    "outputReference": "C:\\Users\\shota\\AppData\\Local\\Temp\\cgw-20261015-verification\\quality-minimal.log",
    "timeoutMs": 30000,
    "attemptId": "quality-minimal-after",
    "testedTree": "c61b94ea6491699c604985401809f6cb945afd20"
  },
  {
    "command": [
      "C:\\project\\codex-chatgpt-web\\node_modules\\.bin\\bun.exe",
      "test",
      "./tests/dependency-security.test.ts",
      "./tests/responses-text-controls.test.ts",
      "./tests/mcp-observation.test.ts",
      "./tests/zero-risk-mcp-lifecycle.test.ts",
      "./tests/chatgpt-web-harness.test.ts"
    ],
    "cwd": "C:/project/codex-chatgpt-web",
    "startedAt": "2026-10-15T11:49:20.948Z",
    "finishedAt": "2026-10-15T11:49:58.379Z",
    "exitCode": 0,
    "signal": null,
    "errorCode": null,
    "status": "passed",
    "outputReference": "C:\\Users\\shota\\AppData\\Local\\Temp\\cgw-20261015-verification\\quality-combined-after.log",
    "timeoutMs": 180000,
    "attemptId": "quality-combined-after",
    "testedTree": "c61b94ea6491699c604985401809f6cb945afd20"
  },
  {
    "exitCode": 0,
    "finishedAt": "2026-10-15T11:50:04.0473882Z",
    "cwd": "C:\\project\\codex-chatgpt-web",
    "startedAt": "2026-10-15T11:49:57.3308943Z",
    "status": "passed",
    "command": "bun run typecheck",
    "attemptId": "quality-typecheck",
    "testedTree": "c61b94ea6491699c604985401809f6cb945afd20"
  },
  {
    "command": [
      "C:\\project\\codex-chatgpt-web\\node_modules\\.bin\\bun.exe",
      "test",
      "./tests"
    ],
    "cwd": "C:/project/codex-chatgpt-web",
    "startedAt": "2026-10-15T11:50:04.098Z",
    "finishedAt": "2026-10-15T11:52:39.699Z",
    "exitCode": 1,
    "signal": null,
    "errorCode": null,
    "status": "failed",
    "outputReference": "C:\\Users\\shota\\AppData\\Local\\Temp\\cgw-20261015-verification\\quality-root-after.log",
    "timeoutMs": 240000,
    "attemptId": "quality-root-after",
    "testedTree": "c61b94ea6491699c604985401809f6cb945afd20"
  },
  {
    "command": [
      "C:\\project\\codex-chatgpt-web\\launcher\\node_modules\\electron\\dist\\electron.exe",
      "C:\\project\\codex-chatgpt-web\\launcher",
      "--hidden",
      "--launcher-smoke-test"
    ],
    "cwd": "C:/project/codex-chatgpt-web",
    "startedAt": "2026-10-15T11:51:39.949Z",
    "finishedAt": "2026-10-15T11:51:41.227Z",
    "exitCode": 0,
    "signal": null,
    "errorCode": null,
    "status": "passed",
    "marker": {
      "ok": true,
      "version": "6.1.0",
      "platform": "win32",
      "packaged": false,
      "runtimeVerified": true
    },
    "outputReference": "C:\\Users\\shota\\AppData\\Local\\Temp\\cgw-20261015-verification\\launcher-source-smoke.log",
    "scratch": "C:\\Users\\shota\\AppData\\Local\\Temp\\cgw-20261015-verification\\launcher-smoke-9v4EIy",
    "scope": "Unpackaged isolated source startup, renderer load and CLI version only; not packaged/live authentication/mode/locale visual acceptance",
    "timeoutMs": 45000,
    "attemptId": "launcher-source-smoke",
    "testedTree": "c61b94ea6491699c604985401809f6cb945afd20"
  },
  {
    "command": [
      "C:\\project\\codex-chatgpt-web\\launcher\\node_modules\\electron\\dist\\electron.exe",
      "C:\\project\\codex-chatgpt-web\\launcher",
      "--hidden",
      "--launcher-smoke-test"
    ],
    "cwd": "C:/project/codex-chatgpt-web",
    "startedAt": "2026-10-15T11:52:59.471Z",
    "finishedAt": "2026-10-15T11:53:00.146Z",
    "exitCode": 0,
    "signal": null,
    "errorCode": null,
    "status": "passed",
    "marker": {
      "ok": true,
      "version": "6.1.0",
      "platform": "win32",
      "packaged": false,
      "runtimeVerified": true
    },
    "persistedControl": true,
    "selectedState": {
      "before": {
        "language": "ja",
        "onboardingComplete": true,
        "autoStart": false
      },
      "after": {
        "language": "ja",
        "onboardingComplete": true,
        "autoStart": false
      }
    },
    "outputReference": "C:\\Users\\shota\\AppData\\Local\\Temp\\cgw-20261015-verification\\launcher-source-restart.log",
    "scratch": "C:/Users/shota/AppData/Local/Temp/cgw-20261015-verification/launcher-smoke-9v4EIy",
    "scope": "Unpackaged isolated source startup/restart, renderer load and CLI version only; not packaged/live authentication/mode/locale visual acceptance",
    "timeoutMs": 45000,
    "markerWrittenAt": "2026-10-15T11:53:00.103Z",
    "markerFreshnessObservedAfterRun": true,
    "markerFreshnessSource": "Post-run filesystem stat of isolated marker before any later launch",
    "attemptId": "launcher-source-restart",
    "testedTree": "c61b94ea6491699c604985401809f6cb945afd20"
  }
]
```

## Acceptance

Implementation and matched termination checks are complete; parent quality Task remains open because required Windows symlink and broader acceptance are incomplete. Independent Review workflow is awaiting_review; no eligible separate-context JSON exists. Launcher dependency Candidate 570e21a retains 2 no-patch advisories, so audit/verify still fail. Existing JP/Skill/root dependency Review gates remain open. Main, fixed source, Deferred Runtime, credentials, services, releases and deployment are unchanged.
