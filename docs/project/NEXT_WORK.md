# Next Work

このJSON blockだけを次WUの正本とする。2026-10-11にGitHub workの日本語first CandidateとEvidenceを再照合した。実装・検証済みで、独立Review結果の返却待ち。

```json
{
  "schema_version": 2,
  "work_unit": {
    "task_id": "CGW-SEC-001",
    "work_unit_id": "WU-CGW-SEC-001A",
    "goal": "Apply the bounded compatible root dependency security correction after current baseline and source-backed investigation; preserve failed Windows symlink checks and independent Review gates",
    "implementer": "Codex",
    "complexity": "medium",
    "recommended_capability": "deep-debug",
    "selected_model": "runtime_user_choice",
    "selected_effort": "runtime_user_choice",
    "scope": [
      "package.json",
      "bun.lock",
      "tests/dependency-security.test.ts",
      "docs/evidence/work-units/WU-CGW-SEC-001A.md",
      "docs/evidence/reviews/WU-CGW-SEC-001A-CANDIDATE.md"
    ],
    "preconditions": [
      "Re-fetch latest GitHub work and touched blobs before editing",
      "Parent and read-only internal investigator reconcile package reachability and patched versions",
      "No concurrent root implementation writer; no credential/authentication changes"
    ],
    "steps": [
      "Pin minimal compatible patched root packages for confirmed audit ranges; preserve all unrelated overrides and Launcher lock",
      "Run focused URI/address security controls and existing MCP/strict-output tests, audit/typecheck/build/full root tests",
      "Create Candidate, push work, read back exact changed files and tree",
      "Save eligible Review packet; keep awaiting_review until a separate effective read-only Reviewer returns matching JSON",
      "Synchronize checkpoint and proceed to independent Launcher advisory investigation"
    ],
    "exit_condition": "Candidate security correction has fresh evidence; missing independent Review or blocked Windows checks remain incomplete",
    "verification_ids": [
      "V-SEC-001"
    ],
    "implementation_packet": "docs/implementation/WU-CGW-QUAL-001_PACKET.md"
  },
  "reason": "Japanese WU-CGW-JP-001B and Skill 003B remain awaiting eligible external ReviewResult. Phase 3–4 root dependency remediation is independently executable under the goal objective. Do not repeat Japanese or Skill implementation.",
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
    }
  ]
}
```
