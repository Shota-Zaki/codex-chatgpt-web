# Next Work

このJSON blockだけを次WUの正本とする。2026-10-14 JSTにWindows baselineとroot依存修正のCandidate/EvidenceをGitHubへ反映・readbackした。独立Review待ちを維持し、依存しないLauncher advisory調査へ進む。

```json
{
  "schema_version": 2,
  "work_unit": {
    "task_id": "CGW-SEC-001",
    "work_unit_id": "WU-CGW-SEC-001B",
    "goal": "Investigate current Launcher dependency advisories and prepare/apply only compatible minimal security corrections; preserve direct Electron/Vite contracts and independent root Review wait",
    "implementer": "Codex",
    "complexity": "medium",
    "recommended_capability": "deep-debug",
    "selected_model": "runtime_user_choice",
    "selected_effort": "runtime_user_choice",
    "scope": [
      "launcher/package.json",
      "launcher/bun.lock",
      "launcher/tests/dependency-security.test.cjs",
      "docs/evidence/work-units/WU-CGW-SEC-001B.md",
      "docs/evidence/reviews/WU-CGW-SEC-001B-CANDIDATE.md"
    ],
    "preconditions": [
      "Re-fetch GitHub work HEAD and touched blobs",
      "Read WU-CGW-QUAL-001_PACKET and SEC-001A evidence; do not repeat root dependency implementation",
      "Trace electron/get/electron-builder/Vite transitive callers and version compatibility before editing, including multiple undici and brace-expansion major lines",
      "Fresh internal read-only investigator per fix-finding; do not treat it as independent C2C Review"
    ],
    "steps": [
      "Inspect current frozen Launcher resolutions and official advisories; separate runtime/build-tool reachability",
      "Prepare bounded exact-version strategy preserving major/API compatibility; do not force one major override across incompatible transitive callers",
      "Apply supported correction only; keep root package/lock unchanged",
      "Run frozen install, Launcher audit/typecheck/test/build and relevant security/legitimate controls; preserve symlink EPERM and new failures",
      "Commit Candidate to work, read back files/tree and save eligible independent Review packet",
      "Synchronize Task/Next/State; investigate combined root focused-selection hang as a separate quality WU"
    ],
    "exit_condition": "Compatible Launcher candidate and fresh evidence/readback exist or an explicit technical blocker is saved; no Done without required verification and eligible Review",
    "verification_ids": [
      "V-SEC-001"
    ],
    "implementation_packet": "docs/implementation/WU-CGW-QUAL-001_PACKET.md"
  },
  "reason": "Root dependency Candidate is committed and awaiting independent Review; Launcher 28 advisories remain independently executable. Japanese/Skill Review wait does not authorize JP-002 or Deferred Runtime.",
  "awaiting_review": [
    {
      "task_id": "CGW-JP-001",
      "work_unit_id": "WU-CGW-JP-001B",
      "candidate": "c40569513db245136c21724a01ff4ed3f928b22a",
      "packet": "docs/evidence/reviews/WU-CGW-JP-001-CANDIDATE.md"
    },
    {
      "task_id": "CGW-C2C-SKILL-003",
      "work_unit_id": "WU-CGW-C2C-SKILL-003B",
      "candidate": "faeb96747e1b238a2d1125e37177e70ca70ef3ff",
      "packet": "docs/evidence/reviews/C2C-SKILL-002-CANDIDATE.md"
    },
    {
      "task_id": "CGW-SEC-001",
      "work_unit_id": "WU-CGW-SEC-001A",
      "candidate": "f2a311c795ea4644dcc57b18995547b5e81426cf",
      "packet": "docs/evidence/reviews/WU-CGW-SEC-001A-CANDIDATE.md"
    }
  ],
  "open_verification_conditions": [
    "Windows file-symlink privilege prevents root two/Launcher one test checks; no elevation or new skips",
    "Combined root focused-test selection hung and was terminated; full suite passed harness but this order concern remains unresolved",
    "GUI/Electron startup, live modes/authentication/browser/MCP/Tunnel/restart acceptance not_run",
    "Explicit $c2c invocation, independent read-only Reviewer and operational Finding/Fix/re-Review loop not_run or awaiting_review"
  ]
}
```
