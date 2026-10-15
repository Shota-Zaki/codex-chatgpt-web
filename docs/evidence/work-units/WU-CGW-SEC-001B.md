# Launcher dependency correction — WU-CGW-SEC-001B

Repository/branch/task/run: Shota-Zaki/codex-chatgpt-web / work / CGW-SEC-001 / WU-CGW-SEC-001B-20261015; iteration/attempt 1/1; model/effort unknown.
Base commit/tree: 15d9b132436a53bd508d45b9fd6b020db3c604e5 / 1c4875a961f4ecc9508f78724adee3059477f5e5.
Candidate commit/tree: 570e21a33bbe4061e28bcb923f2e87184581a38d / 5bb367f4c3769d42b7040b9e59fe4c5bc83f5c10.
Post-change tested tree: 5bb367f4c3769d42b7040b9e59fe4c5bc83f5c10. Later evidence/checkpoint commits are not tested Candidates.
Environment: Windows x64, Node 24.19.0, Bun 1.4.0. Limits: 3 iterations, 2 phase retries, 120-minute phase deadline, 30-minute command timeout (Skill defaults).

## Change and package boundary

Only launcher/package.json, launcher/bun.lock and launcher/tests/dependency-security.test.cjs changed. Fast-uri override becomes 3.1.8. Targeted Bun transitive update preserves brace-expansion major lines (1.1.21 / 2.1.7 / 5.0.12), source-map-js 1.2.2, and undici major lines (6.29.0 / 7.30.0). The pinned Bun installer selected the current within-parent-range undici releases; no global cross-major override or new direct dependency was introduced. The diff changes only these affected lock resolutions. Direct Electron 41.10.7, Vite 6.4.3, all other direct versions, root package/lock, lockfileVersion 1, locale/authentication/runtime source and packaging settings remain unchanged.

Official [Bun targeted update documentation](https://bun.sh/docs/pm/cli/update) and actual Bun 1.4.0 dry-run established that transitive package names update their existing major lines without adding direct dependencies. Nested/version-scoped overrides were avoided because [current Bun docs](https://bun.sh/docs/pm/overrides) use lockfileVersion 3 for them. Frozen reinstall passed without changes. GitHub branch HEAD, Candidate commit/tree and all three changed file contents were fetched; remote blob identities matched the committed files.

## Reachability and retained contracts

Brace expansion reaches build globs via minimatch 3/5/9/10 (asar/universal/filelist/glob/builder); no remote-user-to-glob path was established. Ajv uses fast-uri for builder schema/reference validation; no Launcher URI-host security decision was found. PostCSS consumes source-map-js input maps even though emitted sourcemaps are disabled, so build-input DoS is plausible. node-gyp uses undici 6 Agent/EnvHttpProxyAgent/RetryAgent/fetch; Electron get 5 uses built-in fetch and optional undici 7 proxy dispatchers. Updating npm undici does not update Node/Electron's bundled fetch/WebSocket implementation.

The new tests resolve dependencies from their owning packages, exercise hostile port strings and invalid indexed offsets, preserve valid port/source-map/glob behavior, and run retry/body controls for both undici majors against an isolated loopback HTTP server. The URI and invalid-offset checks failed before correction. Initial post-update validation had an incorrect source-map lookup assumption (column-zero indexed lookup returned null); the legitimate control now checks the complete emitted mapping instead. This test correction was not a product/source change. Final focused Node execution passed all four tests.

Fresh source-only internal investigator and patch reviewer found no concrete surviving corrected locked route or new compatibility regression. They made no edits and ran no tests. Their internal analysis is not independent C2C accepted Review and does not establish an OS-enforced read-only boundary.

## Verification results

- Launcher audit: failed with 2 residual advisories (1 high / 1 moderate), down from the freshly reproduced 28 (13 high / 11 moderate / 4 low). No audit filter/skip/allowlist was added.
- Typecheck and renderer production build: passed.
- Focused regression/compatibility: passed, 4 tests; frozen install: passed, lock unchanged.
- Full Launcher tests: failed, 346 passed / 1 failed / 4 existing skips (351 total). Remaining failure creates a file symlink with EPERM in runtime-host fresh-conversation setup compensation. Same environmental failure as prior baseline; no skip or privilege elevation added.
- The attempted focused Bun script wrapper actually invokes the whole test glob and failed at the same symlink test; retain that command as failed. The direct Node command is the successful four-test scope.
- verify: failed at Launcher audit after version check and root audit passed; subsequent checks did not run. No claim that the full verifier passed.
- Packaged executable/download/proxy/TLS smoke is not established by the four library controls. GUI/live authentication and operational modes remain not_run for this Candidate.

Outcome: blocked for complete security/required Verification acceptance. The corrected package triggers no longer reproduce and legitimate focused controls pass, but two advisories, required test/verify failures and independent Review remain incomplete. Workflow: awaiting_review. No Task Done or all-advisories-fixed claim.

## Residual advisories and alternatives

1. [http-cache-semantics GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp): advisory/API lists no patched release. Path is app-builder-lib → Electron get 3 → Got → cacheable-request. Examined Got defaults cache to undefined and enables the policy only with a configured cache; no shared HTTP cache was enabled by the downloader. Electron file cache is a separate mechanism. Cross-user disclosure is not demonstrated here, but the package advisory stays unresolved.
2. [sprintf-js GHSA-hp3w-g68c-fv3c](https://github.com/advisories/GHSA-hp3w-g68c-fv3c): advisory/API lists no patched release. Path is older downloader optional global-agent → roarr. Examined logger calls use fixed literal messages and put URL/error values in structured objects; attacker-controlled precision-format input was not found. The package advisory stays unresolved.

Possible follow-up: a verified upstream fix/release; a separately investigated maintained dependency migration that removes the old downloader path; or a bounded local patch after a reproducible reachable defect and compatibility contract are established. Forcing Electron get 3 to 5, inventing a patched version, suppressing audit, or changing authentication/TLS would not be a justified shortcut. No such change was made.

Follow-up registry observation on 2026-10-15: public npm latest metadata reports electron-builder 26.15.3, app-builder-lib 26.15.3 (still declares Electron get ^3.0.0), and Electron get 5.1.0. The installed builder is already the current maintained release; no compatible newer parent release removing the older dependency path was available in that observation. Source: exec/Invoke-RestMethod GET of the three public registry latest endpoints; per-request start/end unknown. No registry credentials or package writes were used. This strengthens the recorded upstream blocker; it does not close either advisory.

## Complete baseline audit inventory (28 reported entries)

The inventory preserves affected-version entries, including repeated GHSA IDs across separate major ranges; it is not 28 distinct CVEs.

```json
[
  {
    "package": "brace-expansion@5.0.9, 1.1.18, 2.1.4",
    "severity": "high",
    "description": "brace-expansion: DoS via uncontrolled recursion on nested brace groups causing stack exhaustion (>=4.0.0 <5.0.11)",
    "advisory": "https://github.com/advisories/GHSA-qhr7-859c-m2p7",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "brace-expansion@5.0.9, 1.1.18, 2.1.4",
    "severity": "high",
    "description": "brace-expansion: DoS via uncontrolled recursion in parseCommaParts causing stack exhaustion (<1.1.19)",
    "advisory": "https://github.com/advisories/GHSA-6j4f-fj2g-mc7p",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "brace-expansion@5.0.9, 1.1.18, 2.1.4",
    "severity": "high",
    "description": "brace-expansion: DoS via uncontrolled recursion in parseCommaParts causing stack exhaustion (>=2.0.0 <2.1.5)",
    "advisory": "https://github.com/advisories/GHSA-6j4f-fj2g-mc7p",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "brace-expansion@5.0.9, 1.1.18, 2.1.4",
    "severity": "high",
    "description": "brace-expansion: DoS via uncontrolled recursion in parseCommaParts causing stack exhaustion (>=4.0.0 <5.0.10)",
    "advisory": "https://github.com/advisories/GHSA-6j4f-fj2g-mc7p",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "brace-expansion@5.0.9, 1.1.18, 2.1.4",
    "severity": "moderate",
    "description": "brace-expansion: Quadratic-time expansion of the `{a},b}` rewrite causes CPU denial of service (<1.1.21)",
    "advisory": "https://github.com/advisories/GHSA-q2hr-2g5m-vwhr",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "brace-expansion@5.0.9, 1.1.18, 2.1.4",
    "severity": "moderate",
    "description": "brace-expansion: Quadratic-time expansion of the `{a},b}` rewrite causes CPU denial of service (>=2.0.0 <2.1.7)",
    "advisory": "https://github.com/advisories/GHSA-q2hr-2g5m-vwhr",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "brace-expansion@5.0.9, 1.1.18, 2.1.4",
    "severity": "moderate",
    "description": "brace-expansion: Quadratic-time expansion of the `{a},b}` rewrite causes CPU denial of service (>=4.0.0 <5.0.12)",
    "advisory": "https://github.com/advisories/GHSA-q2hr-2g5m-vwhr",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "brace-expansion@5.0.9, 1.1.18, 2.1.4",
    "severity": "high",
    "description": "brace-expansion: DoS via uncontrolled recursion on nested brace groups causing stack exhaustion (<1.1.20)",
    "advisory": "https://github.com/advisories/GHSA-qhr7-859c-m2p7",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "brace-expansion@5.0.9, 1.1.18, 2.1.4",
    "severity": "high",
    "description": "brace-expansion: DoS via uncontrolled recursion on nested brace groups causing stack exhaustion (>=2.0.0 <2.1.6)",
    "advisory": "https://github.com/advisories/GHSA-qhr7-859c-m2p7",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "fast-uri@3.1.6",
    "severity": "high",
    "description": "fast-uri vulnerable to authority injection via an unvalidated port in serialize (>=3.0.0 <3.1.7)",
    "advisory": "https://github.com/advisories/GHSA-qw65-cvwx-89v3",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "fast-uri@3.1.6",
    "severity": "high",
    "description": "fast-uri vulnerable to host confusion via an unclosed bracket in the URI authority (=3.1.6)",
    "advisory": "https://github.com/advisories/GHSA-58mr-gqgx-xq4g",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "fast-uri@3.1.6",
    "severity": "moderate",
    "description": "fast-uri vulnerable to inconsistent host case normalization via percent-encoded octets (>=3.0.0 <3.1.8)",
    "advisory": "https://github.com/advisories/GHSA-hrr3-gc8f-f4qj",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "http-cache-semantics@4.2.0",
    "severity": "high",
    "description": "http-cache-semantics max-stale handling can disclose cross-user cached responses (<=4.2.0)",
    "advisory": "https://github.com/advisories/GHSA-ch52-4w7c-c8xp",
    "disposition": "unresolved; no published patched version"
  },
  {
    "package": "source-map-js@1.2.1",
    "severity": "high",
    "description": "source-map-js allows event-loop denial of service through indexed source-map section offsets (>=1.0.0 <1.2.2)",
    "advisory": "https://github.com/advisories/GHSA-68fv-2mgg-jv7q",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "sprintf-js@1.1.3",
    "severity": "moderate",
    "description": "sprintf-js vulnerable to denial of service through unbounded precision specifiers (<=1.1.3)",
    "advisory": "https://github.com/advisories/GHSA-hp3w-g68c-fv3c",
    "disposition": "unresolved; no published patched version"
  },
  {
    "package": "undici@7.29.0, 6.28.0",
    "severity": "moderate",
    "description": "undici vulnerable to Denial of Service via unhandled error in WebSocket permessage-deflate decompression (>=7.28.0 <7.29.1)",
    "advisory": "https://github.com/advisories/GHSA-3wwx-pv8p-q78v",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "undici@7.29.0, 6.28.0",
    "severity": "moderate",
    "description": "undici vulnerable to Denial of Service via unhandled error in WebSocket permessage-deflate decompression (>=6.25.0 <6.28.1)",
    "advisory": "https://github.com/advisories/GHSA-3wwx-pv8p-q78v",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "undici@7.29.0, 6.28.0",
    "severity": "moderate",
    "description": "undici vulnerable to Denial of Service via orphaned RetryHandler response body (>=7.11.0 <7.29.1)",
    "advisory": "https://github.com/advisories/GHSA-pmjh-fq2x-6v4x",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "undici@7.29.0, 6.28.0",
    "severity": "low",
    "description": "undici vulnerable to downstream response splitting via retry interceptor (>=7.0.0 <7.29.1)",
    "advisory": "https://github.com/advisories/GHSA-r53p-7pc4-xj5r",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "undici@7.29.0, 6.28.0",
    "severity": "low",
    "description": "undici vulnerable to downstream response splitting via retry interceptor (<6.28.1)",
    "advisory": "https://github.com/advisories/GHSA-r53p-7pc4-xj5r",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "undici@7.29.0, 6.28.0",
    "severity": "high",
    "description": "undici vulnerable to Denial of Service via unrequested WebSocket subprotocol (>=7.0.0 <7.29.1)",
    "advisory": "https://github.com/advisories/GHSA-rfgv-xxqx-mfg5",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "undici@7.29.0, 6.28.0",
    "severity": "high",
    "description": "undici vulnerable to Denial of Service via unrequested WebSocket subprotocol (>=6.7.0 <6.28.1)",
    "advisory": "https://github.com/advisories/GHSA-rfgv-xxqx-mfg5",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "undici@7.29.0, 6.28.0",
    "severity": "moderate",
    "description": "undici vulnerable to Denial of Service via unbounded decompression of compressed responses (>=7.15.0 <7.29.1)",
    "advisory": "https://github.com/advisories/GHSA-3xpg-4rpp-hhhm",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "undici@7.29.0, 6.28.0",
    "severity": "moderate",
    "description": "undici vulnerable to cross-user cookie disclosure via Set-Cookie caching in shared caches (>=7.0.0 <7.29.1)",
    "advisory": "https://github.com/advisories/GHSA-2jfj-6hjv-fm6j",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "undici@7.29.0, 6.28.0",
    "severity": "low",
    "description": "undici vulnerable to response truncation via oversized chunked responses in the dump interceptor (>=7.1.0 <7.29.1)",
    "advisory": "https://github.com/advisories/GHSA-2gqq-gqf2-x968",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "undici@7.29.0, 6.28.0",
    "severity": "high",
    "description": "undici vulnerable to TLS certificate validation bypass via dropped connect options in BalancedPool (>=7.24.1 <7.29.1)",
    "advisory": "https://github.com/advisories/GHSA-w293-vg96-wgc3",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "undici@7.29.0, 6.28.0",
    "severity": "low",
    "description": "undici vulnerable to caching and replay of unsafe HTTP method responses (>=7.0.0 <7.29.1)",
    "advisory": "https://github.com/advisories/GHSA-8436-99hf-9mmv",
    "disposition": "absent from post-change audit; corrected package resolution"
  },
  {
    "package": "undici@7.29.0, 6.28.0",
    "severity": "moderate",
    "description": "undici vulnerable to Denial of Service via WebSocketStream unclean close (>=7.0.0 <7.29.1)",
    "advisory": "https://github.com/advisories/GHSA-rx4f-c7p8-82vq",
    "disposition": "absent from post-change audit; corrected package resolution"
  }
]
```

## Execution metadata

Source: Windows exec outputs/local command metadata, implementation-owned. All timestamps UTC; run date 2026-10-15 JST. Raw logs are temporary local references, not GitHub-exported confidential logs. Hash/blob matching is not tamper-proof or independent execution proof. A post-update direct test attempt before the legitimate-control correction returned exit 1; exact start/end and durable output reference were not captured (unknown), source is exec tool output in this chat.

```json
[
  {
    "exitCode": 1,
    "cwd": "C:\\project\\codex-chatgpt-web",
    "startedAt": "2026-10-15T11:37:20.5915022Z",
    "command": "bun run launcher:audit",
    "finishedAt": "2026-10-15T11:37:20.8830704Z",
    "attemptId": "launcher-audit-before",
    "status": "failed",
    "outputReference": "C:/Users/shota/AppData/Local/Temp/cgw-20261015-verification/launcher-audit-before.log",
    "testedTree": "unknown (baseline reproduction or dependency installation)"
  },
  {
    "startedAt": "2026-10-15T11:39:55.6960408Z",
    "exitCode": 1,
    "command": "node --test tests/dependency-security.test.cjs",
    "cwd": "C:\\project\\codex-chatgpt-web\\launcher",
    "finishedAt": "2026-10-15T11:39:58.9256924Z",
    "attemptId": "launcher-security-before",
    "status": "failed",
    "outputReference": "C:/Users/shota/AppData/Local/Temp/cgw-20261015-verification/launcher-security-before.log",
    "testedTree": "unknown (baseline reproduction or dependency installation)"
  },
  {
    "cwd": "C:\\project\\codex-chatgpt-web\\launcher",
    "exitCode": 0,
    "command": "bun update brace-expansion undici source-map-js fast-uri",
    "finishedAt": "2026-10-15T11:40:12.4771589Z",
    "startedAt": "2026-10-15T11:40:08.8182970Z",
    "attemptId": "launcher-security-update",
    "status": "passed",
    "outputReference": "C:/Users/shota/AppData/Local/Temp/cgw-20261015-verification/launcher-security-update.log",
    "testedTree": "unknown (baseline reproduction or dependency installation)"
  },
  {
    "finishedAt": "2026-10-15T11:40:37.9635228Z",
    "command": "bun run launcher:typecheck",
    "exitCode": 0,
    "startedAt": "2026-10-15T11:40:36.1068216Z",
    "cwd": "C:\\project\\codex-chatgpt-web",
    "attemptId": "launcher-typecheck",
    "status": "passed",
    "outputReference": "C:/Users/shota/AppData/Local/Temp/cgw-20261015-verification/launcher-typecheck.log",
    "testedTree": "5bb367f4c3769d42b7040b9e59fe4c5bc83f5c10"
  },
  {
    "finishedAt": "2026-10-15T11:40:44.0776818Z",
    "command": "bun run --cwd launcher test tests/dependency-security.test.cjs",
    "exitCode": 1,
    "startedAt": "2026-10-15T11:40:37.9878592Z",
    "cwd": "C:\\project\\codex-chatgpt-web",
    "attemptId": "launcher-security-focused",
    "status": "failed",
    "outputReference": "C:/Users/shota/AppData/Local/Temp/cgw-20261015-verification/launcher-security-focused.log",
    "testedTree": "5bb367f4c3769d42b7040b9e59fe4c5bc83f5c10"
  },
  {
    "finishedAt": "2026-10-15T11:40:48.7321533Z",
    "command": "bun run launcher:test",
    "exitCode": 1,
    "startedAt": "2026-10-15T11:40:44.0885682Z",
    "cwd": "C:\\project\\codex-chatgpt-web",
    "attemptId": "launcher-tests",
    "status": "failed",
    "outputReference": "C:/Users/shota/AppData/Local/Temp/cgw-20261015-verification/launcher-tests.log",
    "testedTree": "5bb367f4c3769d42b7040b9e59fe4c5bc83f5c10"
  },
  {
    "finishedAt": "2026-10-15T11:40:52.8944925Z",
    "command": "bun run launcher:build",
    "exitCode": 0,
    "startedAt": "2026-10-15T11:40:48.7426236Z",
    "cwd": "C:\\project\\codex-chatgpt-web",
    "attemptId": "launcher-build",
    "status": "passed",
    "outputReference": "C:/Users/shota/AppData/Local/Temp/cgw-20261015-verification/launcher-build.log",
    "testedTree": "5bb367f4c3769d42b7040b9e59fe4c5bc83f5c10"
  },
  {
    "finishedAt": "2026-10-15T11:40:53.1011575Z",
    "command": "bun run launcher:audit",
    "exitCode": 1,
    "startedAt": "2026-10-15T11:40:52.9032292Z",
    "cwd": "C:\\project\\codex-chatgpt-web",
    "attemptId": "launcher-audit-after",
    "status": "failed",
    "outputReference": "C:/Users/shota/AppData/Local/Temp/cgw-20261015-verification/launcher-audit-after.log",
    "testedTree": "5bb367f4c3769d42b7040b9e59fe4c5bc83f5c10"
  },
  {
    "finishedAt": "2026-10-15T11:40:53.7497253Z",
    "command": "bun run verify",
    "exitCode": 1,
    "startedAt": "2026-10-15T11:40:53.1087100Z",
    "cwd": "C:\\project\\codex-chatgpt-web",
    "attemptId": "verify-after",
    "status": "failed",
    "outputReference": "C:/Users/shota/AppData/Local/Temp/cgw-20261015-verification/verify-after.log",
    "testedTree": "5bb367f4c3769d42b7040b9e59fe4c5bc83f5c10"
  },
  {
    "cwd": "C:\\project\\codex-chatgpt-web\\launcher",
    "startedAt": "2026-10-15T11:41:06.9303471Z",
    "finishedAt": "2026-10-15T11:41:07.2504105Z",
    "exitCode": 0,
    "command": "node --test tests/dependency-security.test.cjs",
    "attemptId": "launcher-security-node",
    "status": "passed",
    "outputReference": "C:/Users/shota/AppData/Local/Temp/cgw-20261015-verification/launcher-security-node.log",
    "testedTree": "5bb367f4c3769d42b7040b9e59fe4c5bc83f5c10"
  },
  {
    "cwd": "C:\\project\\codex-chatgpt-web\\launcher",
    "startedAt": "2026-10-15T11:41:07.2733172Z",
    "finishedAt": "2026-10-15T11:41:07.3168002Z",
    "exitCode": 0,
    "command": "bun install --frozen-lockfile",
    "attemptId": "launcher-frozen",
    "status": "passed",
    "outputReference": "C:/Users/shota/AppData/Local/Temp/cgw-20261015-verification/launcher-frozen.log",
    "testedTree": "5bb367f4c3769d42b7040b9e59fe4c5bc83f5c10"
  }
]
```

Existing Japanese, Skill and root dependency Candidates remain awaiting eligible independent Review. No main/source/credential/DNS/service/release/deployment or Deferred Runtime change.
