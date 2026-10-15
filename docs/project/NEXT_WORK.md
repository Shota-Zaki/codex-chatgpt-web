# Next Work

このJSON blockだけを次WUの正本とする。2026-10-15 JSTにLauncher依存修正、brokerテスト終了修正、隔離Windows source起動・再起動のEvidenceをGitHubへ反映・readbackした。独立Reviewと未達受入は維持し、ローカルdirectory package検証へ進む。

```json
{
  "schema_version": 2,
  "work_unit": {
    "task_id": "CGW-QUAL-001",
    "work_unit_id": "WU-CGW-QUAL-001C",
    "goal": "Verify existing runtime bundle and isolated Windows directory package without publishing, installing or changing credentials/OS state; preserve open Review/security gates",
    "implementer": "Codex",
    "selected_model": "runtime_user_choice",
    "selected_effort": "runtime_user_choice",
    "scope": [
      "docs/evidence/work-units/WU-CGW-QUAL-001C.md"
    ],
    "preconditions": [
      "Re-fetch GitHub work and current code/evidence anchors",
      "Read WU-CGW-QUAL-001C_PACKET; product/package/locks unchanged in this verification-only unit",
      "Inspect current builder help/profile/autostart behavior before commands; no signing/TLS or permission bypass"
    ],
    "steps": [
      "Prepare existing runtime bundle with supported script and capture exact tested tree",
      "Inspect installed builder options and attempt isolated directory build with publishing disabled",
      "Validate embedded runtime/assets/licenses and safely isolated packaged smoke if possible",
      "Save observed failures/blocks and precise limits; never convert untested/live/Review states into passes",
      "Commit/readback evidence then synchronize checkpoint and select next genuinely executable bounded work"
    ],
    "exit_condition": "Current local directory build/runtime/packaged startup status has actual evidence or a precise verified blocker; not release/deploy/full product acceptance",
    "verification_ids": [
      "V-QUAL-001"
    ],
    "implementation_packet": "docs/implementation/WU-CGW-QUAL-001C_PACKET.md"
  },
  "reason": "Launcher advisory correction and test-termination correction are implemented; avoid duplicate code/commit. Continue independent local packaging verification. Residual no-patch advisories, symlink privileges and eligible external Reviews remain incomplete.",
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
    "Packaged startup, visual Japanese/onboarding and live mode/auth/browser/MCP/Tunnel acceptance remain incomplete; unpackaged isolated source startup/restart passed",
    "Explicit $c2c invocation, independent read-only Reviewer and operational Finding/Fix/re-Review loop not_run or awaiting_review",
    "Launcher residual http-cache-semantics GHSA-ch52-4w7c-c8xp and sprintf-js GHSA-hp3w-g68c-fv3c have no published patched release; audit/verify remain failed",
    "Broker test termination correction Candidate671a9c2 passed matched diagnostics but awaits independent Review and parent required acceptance"
  ]
}
```
