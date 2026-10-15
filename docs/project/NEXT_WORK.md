# Next Work

このJSON blockだけを次WUの正本とする。保存済み4言語のWindows表示確認はEvidenceと画像をGitHubでreadback済み。次の優先事項は独立Review結果の取得であり、実装済みWUを繰り返さない。

```json
{
  "schema_version": 2,
  "work_unit": {
    "task_id": "CGW-JP-001",
    "work_unit_id": "WU-CGW-JP-001B",
    "status": "awaiting_review",
    "goal": "Obtain and validate a separate-context effectively read-only GitHub ReviewResult for Candidate c40569513db245136c21724a01ff4ed3f928b22a; do not duplicate implementation",
    "implementer": "Codex",
    "selected_model": "runtime_user_choice",
    "selected_effort": "runtime_user_choice",
    "scope": [
      "docs/evidence/reviews/WU-CGW-JP-001-CANDIDATE.md"
    ],
    "preconditions": [
      "Re-fetch work and look for a real independent ReviewResult",
      "Verify separate Reviewer context and effective read-only permission boundary; do not substitute this implementer or write-enabled agents"
    ],
    "steps": [
      "Reviewer independently fetches Repository/Branch/Base/Candidate/source/Evidence from GitHub",
      "Validate result identity and required Verification; findings require a new bounded fix Candidate and fresh review",
      "If unavailable preserve awaiting_review; re-evaluate truly ready independent WUs without bypassing dependencies"
    ],
    "exit_condition": "Accepted matching independent Review plus all required Verification, or preserved awaiting_review with concrete external blocker",
    "implementation_packet": "docs/evidence/reviews/WU-CGW-JP-001-CANDIDATE.md"
  },
  "reason": "WU-001D verification evidence and four original JPEGs committed/readback at2996d4d. Dependency audit finds no further independent bounded implementation WU currently eligible. JP-002 depends on accepted JP-001; Runtime remains Deferred. Five review packets have no Result; current tools do not establish eligible separate read-only Reviewer.",
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
    "Unsigned local directory startup, null-language ja/saved en restart and saved ja/zh-CN/zh-TW/ko interaction-stage controls observed; signed installer/distribution and live mode/auth/browser/MCP/Tunnel acceptance remain incomplete",
    "Explicit $c2c invocation, independent read-only Reviewer and operational Finding/Fix/re-Review loop not_run or awaiting_review",
    "Launcher residual http-cache-semantics GHSA-ch52-4w7c-c8xp and sprintf-js GHSA-hp3w-g68c-fv3c have no published patched release; audit/verify remain failed",
    "Broker test termination correction Candidate671a9c2 passed matched diagnostics but awaits independent Review and parent required acceptance"
  ]
}
```
