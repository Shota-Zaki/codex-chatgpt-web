# Next Work

このJSON blockだけを次WUの正本とする。2026-09-30にremote work HEADと既存Evidenceを再照合した。001A/Bは既に実施済みなので再実装せず、Skill-first設計切替WUから進める。

```json
{
  "schema_version": 2,
  "work_unit": {
    "task_id": "CGW-C2C-SKILL-003",
    "work_unit_id": "WU-CGW-C2C-SKILL-003B",
    "goal": "resume only when an actual separate Reviewer result for the saved Skill Candidate is returned; independently verify identity/permissions and record it, or preserve awaiting_review",
    "implementer": "Codex",
    "complexity": "high",
    "recommended_capability": "architecture-sensitive",
    "selected_model": "runtime_user_choice",
    "selected_effort": "runtime_user_choice",
    "scope": [
      "docs/evidence/reviews/C2C-SKILL-002-RESULT.json",
      "docs/evidence/work-units/WU-CGW-C2C-SKILL-003.md",
      "docs/project/TASKS.md",
      "docs/project/NEXT_WORK.md",
      "docs/project/AI_WORK_STATE.md"
    ],
    "preconditions": [
      "A different ChatGPT Web/Astra context completed the request in docs/evidence/reviews/C2C-SKILL-002-CANDIDATE.md and returned its JSON result via an authorized user workflow",
      "fetch current GitHub work and verify candidate faeb96747e1b238a2d1125e37177e70ca70ef3ff/tree ad0ab1e7ee1a82c8fa7c10f04e49439833120434 is still the named review target",
      "validate reviewer context was independent and effective read-only access was established; same-context or unverified-permission results cannot be accepted"
    ],
    "steps": [
      "if no result is supplied, make no duplicate code change and keep workflow awaiting_review",
      "validate exact Repository/Branch/Task/Run/Iteration/Base/Candidate/tree identity against GitHub",
      "persist returned JSON without adding secrets, save any Findings and evidence references, and update Task state",
      "if accepted and all other Required Verification passes on this Candidate, evaluate Done; if findings, create bounded fix WU/new Candidate and bind fresh verification/review"
    ],
    "exit_condition": "real ReviewResult and boundary evidence match the Candidate; accepted permits proceeding only if Native/other Required gates pass, findings start a new iteration, absent result stays awaiting_review",
    "verification_ids": [
      "V-SKILL-OPS-001"
    ],
    "implementation_packet": "docs/implementation/WU-CGW-C2C-SKILL_PACKET.md"
  },
  "reason": "2026-10-02 recovery confirmed native catalog discovery/manual load and unchanged Skill files since the Candidate. Explicit invocation and full operational verification remain not_run. No actual independent Reviewer result exists; preserve 003B awaiting_review and do not duplicate implementation or self-review."
}
```
