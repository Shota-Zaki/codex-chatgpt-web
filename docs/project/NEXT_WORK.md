# Next Work

このJSON blockだけを次WUの正本とする。2026-10-11にGitHub workの日本語first CandidateとEvidenceを再照合した。実装・検証済みで、独立Review結果の返却待ち。

```json
{
  "schema_version": 2,
  "work_unit": {
    "task_id": "CGW-JP-001",
    "work_unit_id": "WU-CGW-JP-001B",
    "goal": "resume only when an actual separate Reviewer result for the saved Japanese-first Candidate is returned; independently verify identity/permissions and record it, or preserve awaiting_review",
    "implementer": "Codex",
    "complexity": "low",
    "recommended_capability": "mechanical-edit",
    "selected_model": "runtime_user_choice",
    "selected_effort": "runtime_user_choice",
    "scope": [
      "docs/evidence/reviews/WU-CGW-JP-001-RESULT.json",
      "docs/evidence/work-units/WU-CGW-JP-001.md",
      "docs/project/TASKS.md",
      "docs/project/NEXT_WORK.md",
      "docs/project/AI_WORK_STATE.md"
    ],
    "preconditions": [
      "A different ChatGPT Web/Astra context completed docs/evidence/reviews/WU-CGW-JP-001-CANDIDATE.md and returned a JSON result via an authorized user workflow",
      "fetch current GitHub work and verify Candidate c40569513db245136c21724a01ff4ed3f928b22a/tree 05012315913d828ac78a4c60b7186852f46e4116 is still the named target",
      "validate Reviewer context was independent and effective read-only access was established; same-context or unverified-permission results cannot be accepted"
    ],
    "steps": [
      "if no result is supplied, make no duplicate code change and keep Review awaiting_review",
      "validate exact Repository/Branch/Task/Run/Iteration/Base/Candidate/tree identity against GitHub",
      "persist returned JSON without secrets, update Evidence and the Task checkpoint",
      "if accepted, evaluate Done against all Required Verification; if findings, create a bounded fix WU/new Candidate and bind fresh verification/review"
    ],
    "exit_condition": "a real ReviewResult and boundary evidence match the Candidate; accepted permits Done only if all Required Verification passes, findings start a new iteration, absent result stays awaiting_review",
    "verification_ids": [
      "V-JP-001"
    ],
    "implementation_packet": "docs/evidence/reviews/WU-CGW-JP-001-CANDIDATE.md"
  },
  "reason": "WU-CGW-JP-001 implementation and Launcher verification are complete on Candidate c40569513db245136c21724a01ff4ed3f928b22a. Independent diff review is the only remaining Required gate; do not self-review, duplicate implementation, or mark Done without an eligible ReviewResult."
}
```
