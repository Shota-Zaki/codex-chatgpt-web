# Next Work

このJSON blockだけを次WUの正本とする。2026-10-14 JSTにWindows baselineとroot依存修正のCandidate/EvidenceをGitHubへ反映・readbackした。独立Review待ちを維持し、依存しないLauncher advisory調査へ進む。

```json
{
  "schema_version": 2,
  "work_unit": {
    "task_id": "CGW-QUAL-001",
    "work_unit_id": "WU-CGW-QUAL-001B",
    "goal": "Confirm and correct broker revocation test termination while preserving Error type and revoked/stale-binding message assertions; no speculative production changes",
    "implementer": "Codex",
    "selected_model": "runtime_user_choice",
    "selected_effort": "runtime_user_choice",
    "scope": [
      "tests/chatgpt-web-harness.test.ts",
      "docs/evidence/work-units/WU-CGW-QUAL-001B.md",
      "docs/evidence/reviews/WU-CGW-QUAL-001B-CANDIDATE.md"
    ],
    "preconditions": [
      "Re-fetch latest GitHub work and packet",
      "Complete current baseline diagnostic process before source edits",
      "Compare same scope before/after; no skips/timeouts inflated or production broker change without proven defect"
    ],
    "steps": [
      "Record 30s two-test and 180s original-selection baseline outcomes",
      "Compare ordinary Promise settlement with pending rejection matcher, preserving exact rejection contracts",
      "If confirmed, run typecheck and matched diagnostics/full root regression at new tree",
      "Commit/readback Candidate, save verification and independent Review request",
      "Keep all residual advisories/Windows/Review gates incomplete and synchronize checkpoint"
    ],
    "exit_condition": "Confirmed bounded correction has Candidate and evidence, or precise next hypothesis/blocker saved; independent Review and full quality acceptance remain separate",
    "verification_ids": [
      "V-QUAL-001"
    ],
    "implementation_packet": "docs/implementation/WU-CGW-QUAL-001B_PACKET.md"
  },
  "reason": "Launcher WU-001B implemented/readback with complete 28-entry disposition and two no-patch advisories. Continue independent root termination investigation; do not repeat dependency implementation or bypass existing Review/JP dependencies.",
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
    },
    {
      "task_id": "CGW-SEC-001",
      "work_unit_id": "WU-CGW-SEC-001B",
      "candidate": "570e21a33bbe4061e28bcb923f2e87184581a38d",
      "packet": "docs/evidence/reviews/WU-CGW-SEC-001B-CANDIDATE.md"
    }
  ],
  "open_verification_conditions": [
    "Windows file-symlink privilege prevents root two/Launcher one test checks; no elevation or new skips",
    "Combined root focused-test selection hung and was terminated; full suite passed harness but this order concern remains unresolved",
    "GUI/Electron startup, live modes/authentication/browser/MCP/Tunnel/restart acceptance not_run",
    "Explicit $c2c invocation, independent read-only Reviewer and operational Finding/Fix/re-Review loop not_run or awaiting_review",
    "Launcher residual http-cache-semantics GHSA-ch52-4w7c-c8xp and sprintf-js GHSA-hp3w-g68c-fv3c have no published patched release; audit/verify remain failed"
  ]
}
```
