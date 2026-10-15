# WU-CGW-QUAL-001D — saved-locale Windows visual controls

Repository/branch: Shota-Zaki/codex-chatgpt-web / work. Task CGW-QUAL-001; run 20261015-saved-locales; iteration 1. Implementer model/effort: unknown. Verification-only; no new product Candidate. Base/current documentation commit f3b7a66202bdc7432f8967aa26786a6612b1edb9/tree fc6148e120574746c7703c67d059070f8ff90623. Tested artifact source commit 5e20a322f797ac358ae1aaf0503317a89b59794a/tree b48e1b6f08a2268d927f7b901b304e3ecc5b7f9a, as built in [001C](WU-CGW-QUAL-001C.md); subsequent differences are documentation only. Candidate/base of prior fixes remain those named in their separate Review packets.

## Result and retained screens

Verification passed for the bounded saved-locale controls only. Each synthetic profile opens interaction stage 02 directly, displays its saved language, and preserves language/onboardingComplete=false/autoStart=false. Interaction mode is automatic under existing pre-setup normalization. No login, setup, language/mode/privacy action or real profile is used. All observed children were stopped after identity checks; exit 4294967295 is owned fixture termination, not successful normal application exit.

| Saved locale | Observed heading | Retained bounded app window |
|---|---|---|
| ja | ChatGPT の操作方法 | [ja](../visual/WU-CGW-QUAL-001D/ja.jpg) |
| zh-CN | ChatGPT 交互方式 | [zh-CN](../visual/WU-CGW-QUAL-001D/zh-CN.jpg) |
| zh-TW | ChatGPT 互動方式 | [zh-TW](../visual/WU-CGW-QUAL-001D/zh-TW.jpg) |
| ko | ChatGPT 상호작용 | [ko](../visual/WU-CGW-QUAL-001D/ko.jpg) |

Computer Use sky.list_windows selected exactly one returned window for the known generated executable, then get_window/get_window_state with screenshot and text. Original JPEG pixels are retained for independent GitHub access, without unrelated desktop or account data. ja/zh-CN/zh-TW were reopened with their existing isolated state solely to retain previously inline-only images; no reseeding. Korean cached original screenshot was retained. First observations and durable-capture runs remain distinct below. No screenshot inspection is represented as independent Review.

## Execution records

Source: local Node child-process/state-store records and native Computer Use tool observations. cwd and exact child command are in every record. Parent command: node C:/Users/shota/AppData/Local/Temp/cgw-20261015-package-verification/locale-ui.cjs <case> [existing-owned-root]. Initial attempt creates an isolated root and seeds only synthetic locale/onboarding/autoStart state; durable-capture attempt reuses the recorded root without writes to saved state. CODEX_CHATGPT_WEB_HOME, CODEX_HOME, CODEX_WEB_GPT_LAUNCHER_DATA_DIR point inside that root; ELECTRON_RUN_AS_NODE and VITE_DEV_SERVER_URL removed. Each child has 120-second bound. Stop-Process was applied only after verifying executable path and parent locale-ui.cjs command with matching case.

```json
{
  "run": "20261015-saved-locales",
  "iteration": 1,
  "model": "unknown",
  "effort": "unknown",
  "records": [
    {
      "command": [
        "C:\\Users\\shota\\AppData\\Local\\Temp\\cgw-20261015-package-verification\\directory-lT45Dp\\win-unpacked\\Codex Web GPT.exe"
      ],
      "cwd": "C:/project/codex-chatgpt-web",
      "case": "ja",
      "startedAt": "2026-10-15T12:14:24.212Z",
      "pid": 15108,
      "ownedRoot": "C:\\project\\codex-chatgpt-web\\.launcher-runtime\\qa-locale-ja-a0kN8h",
      "statePath": "C:\\project\\codex-chatgpt-web\\.launcher-runtime\\qa-locale-ja-a0kN8h\\launcher\\launcher-state.json",
      "initial": {
        "language": "ja",
        "onboardingComplete": false,
        "autoStart": false,
        "browserInteractionMode": "automatic"
      },
      "artifactSourceCommit": "5e20a322f797ac358ae1aaf0503317a89b59794a",
      "artifactSourceTree": "b48e1b6f08a2268d927f7b901b304e3ecc5b7f9a",
      "scope": "Isolated saved-locale visual control, no account/setup/mode/privacy actions",
      "finishedAt": "2026-10-15T12:15:12.409Z",
      "exitCode": 4294967295,
      "signal": null,
      "final": {
        "language": "ja",
        "onboardingComplete": false,
        "autoStart": false,
        "browserInteractionMode": "automatic"
      },
      "terminationScope": "Owned observation process stopped; not normal-exit acceptance"
    },
    {
      "command": [
        "C:\\Users\\shota\\AppData\\Local\\Temp\\cgw-20261015-package-verification\\directory-lT45Dp\\win-unpacked\\Codex Web GPT.exe"
      ],
      "cwd": "C:/project/codex-chatgpt-web",
      "case": "ja",
      "startedAt": "2026-10-15T12:22:28.756Z",
      "pid": 44344,
      "ownedRoot": "C:/project/codex-chatgpt-web/.launcher-runtime/qa-locale-ja-a0kN8h",
      "statePath": "C:\\project\\codex-chatgpt-web\\.launcher-runtime\\qa-locale-ja-a0kN8h\\launcher\\launcher-state.json",
      "initial": {
        "language": "ja",
        "onboardingComplete": false,
        "autoStart": false,
        "browserInteractionMode": "automatic"
      },
      "artifactSourceCommit": "5e20a322f797ac358ae1aaf0503317a89b59794a",
      "artifactSourceTree": "b48e1b6f08a2268d927f7b901b304e3ecc5b7f9a",
      "scope": "Isolated saved-locale visual control, no account/setup/mode/privacy actions",
      "finishedAt": "2026-10-15T12:22:56.548Z",
      "exitCode": 4294967295,
      "signal": null,
      "final": {
        "language": "ja",
        "onboardingComplete": false,
        "autoStart": false,
        "browserInteractionMode": "automatic"
      },
      "terminationScope": "Owned observation process stopped; not normal-exit acceptance"
    },
    {
      "command": [
        "C:\\Users\\shota\\AppData\\Local\\Temp\\cgw-20261015-package-verification\\directory-lT45Dp\\win-unpacked\\Codex Web GPT.exe"
      ],
      "cwd": "C:/project/codex-chatgpt-web",
      "case": "zh-CN",
      "startedAt": "2026-10-15T12:15:12.772Z",
      "pid": 13244,
      "ownedRoot": "C:\\project\\codex-chatgpt-web\\.launcher-runtime\\qa-locale-zh-CN-lh41vq",
      "statePath": "C:\\project\\codex-chatgpt-web\\.launcher-runtime\\qa-locale-zh-CN-lh41vq\\launcher\\launcher-state.json",
      "initial": {
        "language": "zh-CN",
        "onboardingComplete": false,
        "autoStart": false,
        "browserInteractionMode": "automatic"
      },
      "artifactSourceCommit": "5e20a322f797ac358ae1aaf0503317a89b59794a",
      "artifactSourceTree": "b48e1b6f08a2268d927f7b901b304e3ecc5b7f9a",
      "scope": "Isolated saved-locale visual control, no account/setup/mode/privacy actions",
      "finishedAt": "2026-10-15T12:15:44.862Z",
      "exitCode": 4294967295,
      "signal": null,
      "final": {
        "language": "zh-CN",
        "onboardingComplete": false,
        "autoStart": false,
        "browserInteractionMode": "automatic"
      },
      "terminationScope": "Owned observation process stopped; not normal-exit acceptance"
    },
    {
      "command": [
        "C:\\Users\\shota\\AppData\\Local\\Temp\\cgw-20261015-package-verification\\directory-lT45Dp\\win-unpacked\\Codex Web GPT.exe"
      ],
      "cwd": "C:/project/codex-chatgpt-web",
      "case": "zh-CN",
      "startedAt": "2026-10-15T12:22:56.539Z",
      "pid": 44216,
      "ownedRoot": "C:/project/codex-chatgpt-web/.launcher-runtime/qa-locale-zh-CN-lh41vq",
      "statePath": "C:\\project\\codex-chatgpt-web\\.launcher-runtime\\qa-locale-zh-CN-lh41vq\\launcher\\launcher-state.json",
      "initial": {
        "language": "zh-CN",
        "onboardingComplete": false,
        "autoStart": false,
        "browserInteractionMode": "automatic"
      },
      "artifactSourceCommit": "5e20a322f797ac358ae1aaf0503317a89b59794a",
      "artifactSourceTree": "b48e1b6f08a2268d927f7b901b304e3ecc5b7f9a",
      "scope": "Isolated saved-locale visual control, no account/setup/mode/privacy actions",
      "finishedAt": "2026-10-15T12:23:21.825Z",
      "exitCode": 4294967295,
      "signal": null,
      "final": {
        "language": "zh-CN",
        "onboardingComplete": false,
        "autoStart": false,
        "browserInteractionMode": "automatic"
      },
      "terminationScope": "Owned observation process stopped; not normal-exit acceptance"
    },
    {
      "command": [
        "C:\\Users\\shota\\AppData\\Local\\Temp\\cgw-20261015-package-verification\\directory-lT45Dp\\win-unpacked\\Codex Web GPT.exe"
      ],
      "cwd": "C:/project/codex-chatgpt-web",
      "case": "zh-TW",
      "startedAt": "2026-10-15T12:15:45.205Z",
      "pid": 13988,
      "ownedRoot": "C:\\project\\codex-chatgpt-web\\.launcher-runtime\\qa-locale-zh-TW-cevELE",
      "statePath": "C:\\project\\codex-chatgpt-web\\.launcher-runtime\\qa-locale-zh-TW-cevELE\\launcher\\launcher-state.json",
      "initial": {
        "language": "zh-TW",
        "onboardingComplete": false,
        "autoStart": false,
        "browserInteractionMode": "automatic"
      },
      "artifactSourceCommit": "5e20a322f797ac358ae1aaf0503317a89b59794a",
      "artifactSourceTree": "b48e1b6f08a2268d927f7b901b304e3ecc5b7f9a",
      "scope": "Isolated saved-locale visual control, no account/setup/mode/privacy actions",
      "finishedAt": "2026-10-15T12:16:17.048Z",
      "exitCode": 4294967295,
      "signal": null,
      "final": {
        "language": "zh-TW",
        "onboardingComplete": false,
        "autoStart": false,
        "browserInteractionMode": "automatic"
      },
      "terminationScope": "Owned observation process stopped; not normal-exit acceptance"
    },
    {
      "command": [
        "C:\\Users\\shota\\AppData\\Local\\Temp\\cgw-20261015-package-verification\\directory-lT45Dp\\win-unpacked\\Codex Web GPT.exe"
      ],
      "cwd": "C:/project/codex-chatgpt-web",
      "case": "zh-TW",
      "startedAt": "2026-10-15T12:23:21.812Z",
      "pid": 34600,
      "ownedRoot": "C:/project/codex-chatgpt-web/.launcher-runtime/qa-locale-zh-TW-cevELE",
      "statePath": "C:\\project\\codex-chatgpt-web\\.launcher-runtime\\qa-locale-zh-TW-cevELE\\launcher\\launcher-state.json",
      "initial": {
        "language": "zh-TW",
        "onboardingComplete": false,
        "autoStart": false,
        "browserInteractionMode": "automatic"
      },
      "artifactSourceCommit": "5e20a322f797ac358ae1aaf0503317a89b59794a",
      "artifactSourceTree": "b48e1b6f08a2268d927f7b901b304e3ecc5b7f9a",
      "scope": "Isolated saved-locale visual control, no account/setup/mode/privacy actions",
      "finishedAt": "2026-10-15T12:23:49.018Z",
      "exitCode": 4294967295,
      "signal": null,
      "final": {
        "language": "zh-TW",
        "onboardingComplete": false,
        "autoStart": false,
        "browserInteractionMode": "automatic"
      },
      "terminationScope": "Owned observation process stopped; not normal-exit acceptance"
    },
    {
      "command": [
        "C:\\Users\\shota\\AppData\\Local\\Temp\\cgw-20261015-package-verification\\directory-lT45Dp\\win-unpacked\\Codex Web GPT.exe"
      ],
      "cwd": "C:/project/codex-chatgpt-web",
      "case": "ko",
      "startedAt": "2026-10-15T12:16:17.391Z",
      "pid": 17880,
      "ownedRoot": "C:\\project\\codex-chatgpt-web\\.launcher-runtime\\qa-locale-ko-zayLNa",
      "statePath": "C:\\project\\codex-chatgpt-web\\.launcher-runtime\\qa-locale-ko-zayLNa\\launcher\\launcher-state.json",
      "initial": {
        "language": "ko",
        "onboardingComplete": false,
        "autoStart": false,
        "browserInteractionMode": "automatic"
      },
      "artifactSourceCommit": "5e20a322f797ac358ae1aaf0503317a89b59794a",
      "artifactSourceTree": "b48e1b6f08a2268d927f7b901b304e3ecc5b7f9a",
      "scope": "Isolated saved-locale visual control, no account/setup/mode/privacy actions",
      "finishedAt": "2026-10-15T12:16:59.243Z",
      "exitCode": 4294967295,
      "signal": null,
      "final": {
        "language": "ko",
        "onboardingComplete": false,
        "autoStart": false,
        "browserInteractionMode": "automatic"
      },
      "terminationScope": "Owned observation process stopped; not normal-exit acceptance"
    }
  ],
  "observations": [
    {
      "case": "ja",
      "purpose": "initial observation",
      "observedAt": "2026-10-15T12:14:50.804Z",
      "screenshotIds": [
        "screenshot-0"
      ]
    },
    {
      "case": "zh-CN",
      "purpose": "initial observation",
      "observedAt": "2026-10-15T12:15:34.414Z",
      "screenshotIds": [
        "screenshot-0"
      ]
    },
    {
      "case": "zh-TW",
      "purpose": "initial observation",
      "observedAt": "2026-10-15T12:16:06.793Z",
      "screenshotIds": [
        "screenshot-0"
      ]
    },
    {
      "case": "ko",
      "purpose": "initial observation",
      "observedAt": "2026-10-15T12:16:38.999Z",
      "screenshotIds": [
        "screenshot-0"
      ]
    },
    {
      "case": "ja",
      "purpose": "durable evidence",
      "observedAt": "2026-10-15T12:22:48.675Z"
    },
    {
      "case": "zh-CN",
      "purpose": "durable evidence",
      "observedAt": "2026-10-15T12:23:14.639Z"
    },
    {
      "case": "zh-TW",
      "purpose": "durable evidence",
      "observedAt": "2026-10-15T12:23:40.745Z"
    }
  ],
  "imageHashes": [
    {
      "case": "ja",
      "sha256": "eb7043b812e4a3bfb5d8c8555dd3659807fe76035af018697dd2c725d7c8444d"
    },
    {
      "case": "zh-CN",
      "sha256": "b6daeb77fb28352fafeb119a26d68e28a9a2d13aeee640c2c1d8f2fa13bf26a6"
    },
    {
      "case": "zh-TW",
      "sha256": "e0f5f1c334eb0355a70f04e471795c52d0ecd66c03d45bbfa19bd07a8c74037c"
    },
    {
      "case": "ko",
      "sha256": "21720cd7065ab565c4f0947fe8d13ba04c3056c4f5231b2ddf76be47c02f7054"
    }
  ]
}
```

Raw local output: C:/Users/shota/AppData/Local/Temp/cgw-20261015-package-verification/locale-<case>[-evidence].log and corresponding start/end JSON. Raw logs not published; selected synthetic records and bounded images above are durable output. Image digest is an integrity comparison, not immutable execution attestation. Artifact EXE SHA256 7ed86fafc5260c8a0c3103c6a96d6005f5979d5b132ec68855791d597d5907f7; app.asar cb87ee4651ef68ed0c1d3a90171b49706f1162a0d49cb3ab8f925b3ade817b5d rechecked unchanged before these observations. No source/package/lock edits or repeated full-suite run warranted.

## Remaining conditions and readiness audit

No independent ReviewResult is present on fetched work. Available review tools do not establish a separate effectively read-only Reviewer for these Candidate packets; internal agents cannot supply C2C acceptance. All five Candidate review gates remain awaiting_review. Explicit $c2c invocation/full Finding–Fix–reReview operation remain not_run/blocked. JP-002 still depends on accepted JP-001. Deferred Runtime remains deferred.

Fresh non-elevated Windows symlink probe 2026-10-15T12:18:06.596Z–12:18:06.598Z exits1/EPERM, status blocked; root two/Launcher one affected tests remain failed, no privilege change or added skip. GitHub advisory refresh still reports no first patched version for GHSA-ch52-4w7c-c8xp and GHSA-hp3w-g68c-fv3c; Launcher audit/verify remain failed with two advisories. Required signed installer/distribution and live mode/auth/browser/MCP/Tunnel acceptance remain incomplete. Previous typecheck/build/focused/full-test evidence retains its original Candidate and status.

Task dependency audit: after these controls, no other bounded implementation WU is ready under current permissions and acceptance prerequisites. Next priority is WU-CGW-JP-001B with an eligible independent GitHub-fetched ReviewResult. Task/Skill-first/product completion is not claimed.
