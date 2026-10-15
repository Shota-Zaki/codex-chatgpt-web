# Local Windows directory-package verification — WU-CGW-QUAL-001C

Repository/branch/task/run: Shota-Zaki/codex-chatgpt-web / work / CGW-QUAL-001 / WU-CGW-QUAL-001C-20261015. Iteration 1; attempts are identified below; model/effort unknown.
Base/tested commit: 5e20a322f797ac358ae1aaf0503317a89b59794a; tested tree: b48e1b6f08a2268d927f7b901b304e3ecc5b7f9a. Verification-only unit; no new product Candidate. Later evidence/checkpoint commits are not tested code Candidates. Relevant prior code anchors remain Launcher dependencies 570e21a, broker test 671a9c2, Japanese fallback c405695; none of their original verification records is retargeted.
Packet: docs/implementation/WU-CGW-QUAL-001C_PACKET.md. Environment: Windows x64, Node 24.19.0, Bun 1.4.0, Electron 41.10.7, electron-builder 26.15.3. Limits: 3 iterations, 2 retries per phase, 120-minute phase deadline, 30-minute command timeout; directory build had a stricter 10-minute timeout, packaged smoke 90 seconds, UI children 120 seconds.

## Observed results

| Check | Result / scope |
| --- | --- |
| Existing runtime preparation script | passed, exit 0; fixed Bun, production frozen install and notices generated |
| Local Windows x64 directory build | passed, exit 0; --dir, --publish never; no installer or distributable wrapper invoked |
| Prepared and embedded runtime validation | passed; same bundle ID, 6,025 manifest files, required CLI/Bun/license/notices present |
| Packaged startup / isolated runtime placement / CLI version | passed; fresh marker ok=true, packaged=true, runtimeVerified=true, version=6.1.0, platform=win32; installed bundle fully validated |
| Archive inspection | passed; 1,194 app.asar entries, main and renderer present; residual http-cache-semantics/sprintf-js paths absent from app archive and embedded runtime manifest |
| Japanese initial-language visual check | passed for the observed packaged Windows screen; heading Japanese, Japanese initial selection, all five locale rows present |
| English selection/save/restart control | passed for the isolated profile; English copy after selecting English, language=en persisted on Continue, restart opens the English interaction stage |
| Signing | local application executable observed NotSigned via Get-AuthenticodeSignature; no release-signing acceptance |
| Root/Launcher package, lock and tracked source preservation | git status/diff clean after verification; generated files only in ignored build/runtime or isolated local output roots |

## Local packaging and isolation

The installed builder help confirmed --dir / --win / --x64 / --publish never. The command used a new temporary output directory. Existing signing/resource-edit settings remained intact; the child refused configured signing identities and set the same no-identity auto-discovery behavior as the existing package script. Builder logs mention signtool stages, but the resulting application is NotSigned; this is not evidence of a signed release. No certificate was generated or installed. No registry installer, service, release, deploy or publication action ran.

Prepared, embedded and isolated installed runtime identities matched bundle d88da67f67502e3c6818a1da4246cfc531e434ed9563302ab21064a1d2184afb. The application smoke used --dev-profile --hidden --launcher-smoke-test and a new ignored workspace-owned durable root. This avoids actual production data/autostart state while exercising packaged runtime install, renderer load and version invocation. Runtime hashes/manifest were checked without disabling validation.

Artifact SHA256 values identify local bytes only, not tamper-proof execution or independent review:

- app.asar: cb87ee4651ef68ed0c1d3a90171b49706f1162a0d49cb3ab8f925b3ade817b5d
- Codex Web GPT.exe: 7ed86fafc5260c8a0c3103c6a96d6005f5979d5b132ec68855791d597d5907f7

Residual packages being absent from these runtime artifacts narrows exposure for this package. It does not remove their build-tree advisories or make audit/verify pass. Both no-patch advisories remain unresolved.

## Bounded visual observations

Computer Use Skill (@oai/sky through node_repl) inspected only the locally built Launcher. The first hidden process had no targetable window, so no visual pass is claimed from it; it ended at its owned 120-second diagnostic limit. A separately recorded visible launch exposed one unique window whose returned process path matched the exact generated executable. No fake or guessed window handles were used.

The new isolated production profile was seeded with language=null, onboardingComplete=false and autoStart=false. A requested manual browser-interaction value is normalized back to automatic by existing state rules before setup; the harness label describing manual interaction was intent, not effective state. No actual user/browser credentials were copied. A blank browser-host page and public update check were observed, along with a read-only route-status fail-safe in the isolated core home. No authentication dialog, setup, mode selection or update installation was operated.

Observed screenshot: heading “言語を選択”, Japanese subtitle, Japanese row selected, and English / 简体中文 / 繁體中文 / 日本語 / 한국어 rows visible. The language-selection stage remained present. Accessibility initially exposed only regions, so an observation-bound coordinate click selected English. Refreshed screenshot/accessibility then showed “Choose your language”, selected English and all locale rows. An observed Continue button (index 34 in that observation) was clicked once; the isolated state file read language=en, onboardingComplete=false and autoStart=false. After animation settled, screenshot/accessibility showed “ChatGPT interaction” and stage 2 / 3 in English.

The same isolated state was reopened without reseeding. A newly returned window showed the English interaction stage directly, confirming saved-locale precedence in that instance. No mode/privacy/security control was clicked. The UI processes were bounded observation fixtures: first and second ended at diagnostic limits; the re-opened child was stopped only after exact executable and parent command identity matched the owned helper. Those process termination statuses are not normal-exit acceptance. Normal packaged exit is established by the separate smoke command's exit 0.

UI screenshots/accessibility trees are inline Computer Use results in this chat; durable screenshot URLs and exact per-action timestamps were not supplied (unknown). No raw desktop screenshots or unrelated window inventory were exported to GitHub. Observations are implementation-owned, not independent Reviewer evidence. This expands current Windows visual evidence, not the old Japanese Candidate's tested tree or Review verdict.

## Execution metadata

Source: Windows exec/Node child-process results, local manifest/archive inspection, and Computer Use observations. Dates below UTC; user run date 2026-10-15 JST. Raw logs/artifacts remain local temporary/ignored outputs; only safe metadata is retained here.

```json
[
  {
    "startedAt": "2026-10-15T11:58:02.0764416Z",
    "finishedAt": "2026-10-15T11:58:48.4482765Z",
    "exitCode": 0,
    "cwd": "C:\\project\\codex-chatgpt-web",
    "command": "bun run --cwd launcher build:runtime",
    "recordId": "runtime-build",
    "testedTree": "b48e1b6f08a2268d927f7b901b304e3ecc5b7f9a"
  },
  {
    "command": [
      "C:\\Program Files\\nodejs\\node.exe",
      "C:\\project\\codex-chatgpt-web\\launcher\\node_modules\\electron-builder\\out\\cli\\cli.js",
      "--win",
      "--x64",
      "--dir",
      "--publish",
      "never",
      "--config.directories.output=C:\\Users\\shota\\AppData\\Local\\Temp\\cgw-20261015-package-verification\\directory-lT45Dp"
    ],
    "cwd": "C:\\project\\codex-chatgpt-web\\launcher",
    "startedAt": "2026-10-15T11:59:15.396Z",
    "finishedAt": "2026-10-15T11:59:24.984Z",
    "exitCode": 0,
    "signal": null,
    "errorCode": null,
    "status": "passed",
    "outputReference": "C:\\Users\\shota\\AppData\\Local\\Temp\\cgw-20261015-package-verification\\directory-build.log",
    "output": "C:\\Users\\shota\\AppData\\Local\\Temp\\cgw-20261015-package-verification\\directory-lT45Dp",
    "timeoutMs": 600000,
    "publish": "never",
    "installerInvoked": false,
    "signingIdentityUsed": false,
    "recordId": "directory-build",
    "testedTree": "b48e1b6f08a2268d927f7b901b304e3ecc5b7f9a"
  },
  {
    "command": [
      "C:\\Users\\shota\\AppData\\Local\\Temp\\cgw-20261015-package-verification\\directory-lT45Dp\\win-unpacked\\Codex Web GPT.exe",
      "--dev-profile",
      "--hidden",
      "--launcher-smoke-test"
    ],
    "cwd": "C:/project/codex-chatgpt-web",
    "verificationStartedAt": "2026-10-15T12:00:19.358Z",
    "startedAt": "2026-10-15T12:00:50.361Z",
    "finishedAt": "2026-10-15T12:01:13.246Z",
    "exitCode": 0,
    "signal": null,
    "errorCode": null,
    "status": "passed",
    "marker": {
      "ok": true,
      "version": "6.1.0",
      "platform": "win32",
      "packaged": true,
      "runtimeVerified": true
    },
    "markerFresh": true,
    "preparedAndEmbeddedBundleId": "d88da67f67502e3c6818a1da4246cfc531e434ed9563302ab21064a1d2184afb",
    "runtimeFiles": 6025,
    "installedValid": true,
    "ownedRoot": "C:\\project\\codex-chatgpt-web\\.launcher-runtime\\qa-packaged-20261015-THq4Jz",
    "outputReference": "C:\\Users\\shota\\AppData\\Local\\Temp\\cgw-20261015-package-verification\\packaged-smoke.log",
    "timeoutMs": 90000,
    "scope": "Unsigned local directory-package startup; isolated development profile with existing runtime install and version check; no installer, live credentials, OS autostart or release",
    "recordId": "packaged-smoke",
    "testedTree": "b48e1b6f08a2268d927f7b901b304e3ecc5b7f9a"
  },
  {
    "command": "node artifact-inspection.cjs",
    "cwd": "C:/project/codex-chatgpt-web",
    "startedAt": "2026-10-15T12:09:43.853Z",
    "finishedAt": "2026-10-15T12:09:44.060Z",
    "exitCode": 0,
    "status": "passed",
    "appAsarEntries": 1194,
    "containsRenderer": true,
    "containsMain": true,
    "appResidualPackagePaths": [],
    "runtimeResidualManifestPaths": [],
    "bundleId": "d88da67f67502e3c6818a1da4246cfc531e434ed9563302ab21064a1d2184afb",
    "runtimeFiles": 6025,
    "artifacts": {
      "appAsarSha256": "cb87ee4651ef68ed0c1d3a90171b49706f1162a0d49cb3ab8f925b3ade817b5d",
      "executableSha256": "7ed86fafc5260c8a0c3103c6a96d6005f5979d5b132ec68855791d597d5907f7"
    },
    "scope": "Inspect generated local artifacts; absence in these artifacts does not close build-tree advisories",
    "recordId": "artifact-inspection",
    "testedTree": "b48e1b6f08a2268d927f7b901b304e3ecc5b7f9a"
  },
  {
    "command": [
      "C:\\Users\\shota\\AppData\\Local\\Temp\\cgw-20261015-package-verification\\directory-lT45Dp\\win-unpacked\\Codex Web GPT.exe"
    ],
    "cwd": "C:/project/codex-chatgpt-web",
    "startedAt": "2026-10-15T12:03:34.104Z",
    "pid": 43224,
    "ownedRoot": "C:\\project\\codex-chatgpt-web\\.launcher-runtime\\qa-language-20261015-L03gug",
    "statePath": "C:\\project\\codex-chatgpt-web\\.launcher-runtime\\qa-language-20261015-L03gug\\launcher\\launcher-state.json",
    "finishedAt": "2026-10-15T12:05:34.173Z",
    "exitCode": null,
    "signal": "SIGTERM",
    "declaredHarnessScope": "Read-only visual initial-language verification; isolated production profile, manual browser interaction, no credentials/setup; owned child terminated after observation or diagnostic deadline",
    "effectiveScope": "Isolated production profile; requested manual state normalizes to automatic before setup. No account/login actions or real credentials. Owned UI child terminated after observation/deadline, not a normal-exit test.",
    "recordId": "language-ui-end",
    "testedTree": "b48e1b6f08a2268d927f7b901b304e3ecc5b7f9a"
  },
  {
    "command": [
      "C:\\Users\\shota\\AppData\\Local\\Temp\\cgw-20261015-package-verification\\directory-lT45Dp\\win-unpacked\\Codex Web GPT.exe"
    ],
    "cwd": "C:/project/codex-chatgpt-web",
    "startedAt": "2026-10-15T12:05:45.826Z",
    "pid": 44504,
    "ownedRoot": "C:\\project\\codex-chatgpt-web\\.launcher-runtime\\qa-language-20261015-YZBH0d",
    "statePath": "C:\\project\\codex-chatgpt-web\\.launcher-runtime\\qa-language-20261015-YZBH0d\\launcher\\launcher-state.json",
    "finishedAt": "2026-10-15T12:07:45.924Z",
    "exitCode": null,
    "signal": "SIGTERM",
    "declaredHarnessScope": "Read-only visual initial-language verification; isolated production profile, manual browser interaction, no credentials/setup; owned child terminated after observation or diagnostic deadline",
    "effectiveScope": "Isolated production profile; requested manual state normalizes to automatic before setup. No account/login actions or real credentials. Owned UI child terminated after observation/deadline, not a normal-exit test.",
    "recordId": "language-ui-visible-end",
    "testedTree": "b48e1b6f08a2268d927f7b901b304e3ecc5b7f9a"
  },
  {
    "command": [
      "C:\\Users\\shota\\AppData\\Local\\Temp\\cgw-20261015-package-verification\\directory-lT45Dp\\win-unpacked\\Codex Web GPT.exe"
    ],
    "cwd": "C:/project/codex-chatgpt-web",
    "startedAt": "2026-10-15T12:08:16.138Z",
    "pid": 36860,
    "ownedRoot": "C:/project/codex-chatgpt-web/.launcher-runtime/qa-language-20261015-YZBH0d",
    "statePath": "C:\\project\\codex-chatgpt-web\\.launcher-runtime\\qa-language-20261015-YZBH0d\\launcher\\launcher-state.json",
    "finishedAt": "2026-10-15T12:08:53.967Z",
    "exitCode": 4294967295,
    "signal": null,
    "declaredHarnessScope": "Read-only visual initial-language verification; isolated production profile, manual browser interaction, no credentials/setup; owned child terminated after observation or diagnostic deadline",
    "effectiveScope": "Isolated production profile; requested manual state normalizes to automatic before setup. No account/login actions or real credentials. Owned UI child terminated after observation/deadline, not a normal-exit test.",
    "recordId": "language-ui-reopen-end",
    "testedTree": "b48e1b6f08a2268d927f7b901b304e3ecc5b7f9a"
  }
]
```

## Still incomplete

Independent Review of the saved Candidates; real installation/distribution and signing; live login/browser/MCP/Tunnel and actual mode execution; complete locale visual matrix; privileged file-symlink checks; unresolved Launcher build-tree advisories. Prior required test/verify failures stay failed. No Task Done, Skill-first completion, Deferred Runtime restart or whole-product acceptance is claimed.
