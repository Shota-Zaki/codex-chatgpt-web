# Next Work

このJSON blockだけを次WUの正本とする。2026-10-15 JSTにLauncher依存修正、brokerテスト終了修正、隔離Windows source起動・再起動のEvidenceをGitHubへ反映・readbackした。独立Reviewと未達受入は維持し、ローカルdirectory package検証へ進む。

```json
{
  "schema_version": 2,
  "work_unit": {
    "task_id": "CGW-QUAL-001",
    "work_unit_id": "WU-CGW-QUAL-001D",
    "goal": "Complete saved ja/zh-CN/zh-TW/ko visual controls using isolated profiles of the verified local directory artifact; keep independent Review and live acceptance incomplete",
    "implementer": "Codex",
    "selected_model": "runtime_user_choice",
    "selected_effort": "runtime_user_choice",
    "scope": [
      "docs/evidence/work-units/WU-CGW-QUAL-001D.md"
    ],
    "preconditions": [
      "Re-fetch current work and read WU-001D packet",
      "Re-use verified directory artifact only; no source/package/lock or actual user state changes",
      "Computer Use observes only uniquely returned owned Launcher window"
    ],
    "steps": [
      "Seed one isolated saved-locale profile per case and launch bounded owned child",
      "Observe localized interaction screen and saved locale persistence; no login/setup/privacy control actions",
      "Record snapshots as inline implementation observations, exact command/process bounds and unknown timestamps honestly",
      "Stop only verified owned processes, save evidence, commit/readback and synchronize checkpoint"
    ],
    "exit_condition": "Each saved-locale control has observed passed/failed/blocked status; no broad locale/JP/Task Done without required verification and independent Review",
    "verification_ids": [
      "V-QUAL-001"
    ],
    "implementation_packet": "docs/implementation/WU-CGW-QUAL-001D_PACKET.md"
  },
  "reason": "WU-001C packaging and limited Japanese/English visual observations are recorded/readback; no repeat implementation. Remaining saved-locale controls are safe independent quality work; external Review, unpatched advisories and live/privileged acceptance remain incomplete.",
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
    },
    {
      "task_id": "CGW-QUAL-001",
      "work_unit_id": "WU-CGW-QUAL-001B",
      "candidate": "671a9c25d2a73baf98a2a2a61225747eb5ca8e0f",
      "packet": "docs/evidence/reviews/WU-CGW-QUAL-001B-CANDIDATE.md"
    }
  ],
  "open_verification_conditions": [
    "Windows file-symlink privilege prevents root two/Launcher one test checks; no elevation or new skips",
    "Unsigned local Windows directory packaged startup, null-language Japanese and saved English/restart observed at5e20a32; remaining locale matrix, signed installer/distribution and live mode/auth/browser/MCP/Tunnel acceptance remain incomplete",
    "Explicit $c2c invocation, independent read-only Reviewer and operational Finding/Fix/re-Review loop not_run or awaiting_review",
    "Launcher residual http-cache-semantics GHSA-ch52-4w7c-c8xp and sprintf-js GHSA-hp3w-g68c-fv3c have no published patched release; audit/verify remain failed",
    "Broker test termination correction Candidate671a9c2 passed matched diagnostics but awaits independent Review and parent required acceptance"
  ]
}
```
