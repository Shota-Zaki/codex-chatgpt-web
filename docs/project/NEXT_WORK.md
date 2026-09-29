# Next Work

このJSON blockだけを次WUの正本とする。2026-09-30にremote work HEADと既存Evidenceを再照合した。001A/Bは既に実施済みなので再実装せず、Skill-first設計切替WUから進める。

```json
{
  "schema_version": 2,
  "work_unit": {
    "task_id": "CGW-C2C-SKILL-003",
    "work_unit_id": "WU-CGW-C2C-SKILL-003A",
    "goal": "record Native Skill discovery/invocation separately from the passed GitHub fetch path, and obtain an actual separate Reviewer result only if a user-authorized context with a verified read-only boundary is available",
    "implementer": "Codex",
    "complexity": "high",
    "recommended_capability": "architecture-sensitive",
    "selected_model": "runtime_user_choice",
    "selected_effort": "runtime_user_choice",
    "scope": [
      "docs/evidence/work-units/WU-CGW-C2C-SKILL-003.md",
      "docs/project/TASKS.md",
      "docs/project/NEXT_WORK.md",
      "docs/project/AI_WORK_STATE.md"
    ],
    "preconditions": [
      "fetch current work HEAD and Candidate faeb96747e1b238a2d1125e37177e70ca70ef3ff/tree ad0ab1e7ee1a82c8fa7c10f04e49439833120434; don't retarget its verification",
      "Native load requires repository Skill actually discoverable in selected Codex environment; don't modify user-wide settings/credentials to force discovery",
      "Independent review must come from a different ChatGPT Web/Astra context; don't use implementer self-review or start an unrequested subagent/external message",
      "Reviewer must fetch exact repo/branch/base/candidate/source/Evidence from GitHub and inspect effective read-only capability"
    ],
    "steps": [
      "test and record Native read/load/$c2c invocation if visible in a supported Codex environment; otherwise record not_run with repo-scoped opening instructions",
      "remote-reference fetch for current work SKILL/references already passed by GitHub blob readback; keep separate from Native result",
      "if separate Reviewer is available through the user's authorized flow, send the saved packet; otherwise keep awaiting_review",
      "record implementation, fixture, Native, remote fetch, independent Reviewer, and full loop operation acceptance separately"
    ],
    "exit_condition": "Native and remote-reference evidence remain distinct; independent Review is accepted only after a real separate read-only fetch/result; otherwise preserve awaiting_review and keep Task open",
    "verification_ids": [
      "V-SKILL-OPS-001"
    ],
    "implementation_packet": "docs/implementation/WU-CGW-C2C-SKILL_PACKET.md"
  },
  "reason": "Skill files, static acceptance, safe tabletop fixtures, GitHub readback and a complete Reviewer packet are saved. Operational Native/Reviewer checks are the only remaining current-phase gates."
}
```
