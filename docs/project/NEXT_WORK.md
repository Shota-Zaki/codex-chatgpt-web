# Next Work

このJSON blockだけを次WUの正本とする。2026-09-30にremote work HEADと既存Evidenceを再照合した。001A/Bは既に実施済みなので再実装せず、Skill-first設計切替WUから進める。

```json
{
  "schema_version": 2,
  "work_unit": {
    "task_id": "CGW-C2C-SKILL-002",
    "work_unit_id": "WU-CGW-C2C-SKILL-002A",
    "goal": "create the single instruction-only C2C Skill and the three focused reference files and two handoff assets; do not add scripts, Runtime or user-wide settings",
    "implementer": "Codex",
    "complexity": "high",
    "recommended_capability": "architecture-sensitive",
    "selected_model": "runtime_user_choice",
    "selected_effort": "runtime_user_choice",
    "scope": [
      ".agents/skills/c2c/SKILL.md",
      ".agents/skills/c2c/references/workflow.md",
      ".agents/skills/c2c/references/review.md",
      ".agents/skills/c2c/references/evidence.md",
      ".agents/skills/c2c/assets/review-request.md",
      ".agents/skills/c2c/assets/review-result.json"
    ],
    "preconditions": [
      "refetch remote work and TASKS/NEXT_WORK/AI_WORK_STATE; last verified design Candidate was 7354dff3de49e9331ce98f998b6f51c3cc63b5d0/tree f90a154a6acfe4e8ad0eda983c6fa9c831b977f4",
      "confirm CGW-C2C-SKILL-001 Done and CGW-C2C-SKILL-002 Ready; CGW-C2C-001 Runtime still Ready/Deferred",
      "review official Skill format and pinned source/license refs in the Packet; do not use fixed Mac paths or old C2C CLI/MCP/Tunnel steps"
    ],
    "steps": [
      "create valid name/description frontmatter with trigger/exclusion/precondition/workflow/exit conditions",
      "link workflow/review/evidence details without duplicating them in the entry",
      "make ReviewRequest bind repository/branch/task/run/iteration/base/candidate/acceptance/verification/evidence/scope/read-only/result",
      "make ReviewResult a constrained result template with accepted/findings/blocked/error and finding locations/evidence",
      "keep operations natural language, bounded, no execution script/server/credential/user-wide config",
      "commit six files to work and read them back from GitHub"
    ],
    "exit_condition": "six Skill files are present and linked; no runtime/helper dependency; commit and readback complete; next WU performs static and safe fixture validation on the exact candidate tree",
    "verification_ids": [
      "V-SKILL-STATIC-001"
    ],
    "implementation_packet": "docs/implementation/WU-CGW-C2C-SKILL_PACKET.md"
  },
  "reason": "Skill-first phase design and split Runtime/Skill acceptance are complete and statically checked; now implement the single declared entry and resources."
}
```
