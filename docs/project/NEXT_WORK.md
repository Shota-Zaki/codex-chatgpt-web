# Next Work

このJSON blockだけを次WUの正本とする。2026-09-30にremote work HEADと既存Evidenceを再照合した。001A/Bは既に実施済みなので再実装せず、Skill-first設計切替WUから進める。

```json
{
  "schema_version": 2,
  "work_unit": {
    "task_id": "CGW-C2C-SKILL-001",
    "work_unit_id": "WU-CGW-C2C-SKILL-001B",
    "goal": "statik checkで見つけたRequirement enum不足を補い、work unit分割とSkill実装Packetを作って旧Runtime PacketをDeferredと明記する",
    "implementer": "Codex",
    "complexity": "high",
    "recommended_capability": "architecture-sensitive",
    "selected_model": "runtime_user_choice",
    "selected_effort": "runtime_user_choice",
    "scope": [
      "docs/design/REQUIREMENTS.md",
      "docs/design/BASIC_DESIGN.md",
      "docs/design/DETAILED_DESIGN.md",
      "docs/implementation/WORK_UNITS.md",
      "docs/implementation/WU-CGW-C2C-001_PACKET.md",
      "docs/implementation/WU-CGW-C2C-SKILL_PACKET.md",
      "docs/project/NEXT_WORK.md",
      "docs/project/AI_WORK_STATE.md"
    ],
    "preconditions": [
      "GitHub work HEADと対象blobを再取得する。最後の確定candidateは7b6de71461277bf7bb8a3089bdf578cda992b571/tree 31ac9cd99be0e3497edbb8bc9e1d975c4f31f749。",
      "WU-CGW-C2C-SKILL-001A design commit is present; keep its initial failed verification attempt in Evidence and only record final static pass after testing a committed candidate tree.",
      "WU-CGW-C2C-001A/B and their evidence already exist; do not recreate or alter them except adding a top-level supersession note to the old implementation packet."
    ],
    "steps": [
      "RequirementsへVerification/Review enumとEvidence fieldsを追加し、static check failureを修正する。",
      "Basic/Detailed sectionsを明確にSkill-first/Deferred Runtimeへ区分する。",
      "Skill-first WUs exact file listsとsingle implementation packetを記述し、old C2C packetを保全してDeferred表示を加える。",
      "TASKS/NEXT_WORK/AI_WORK_STATEをcurrent WUとcandidateに揃え、GitHub workへcommit/readbackする。",
      "commit後に正本のJSON/dependency/path cross-checkを実行し、tested treeの一致を確認する。"
    ],
    "exit_condition": "one reusable Skill Packet and bounded WU plan are committed; old 001A/B remain intact; post-commit cross-check runs against the exact candidate tree; then checkpoint WU-001C updates Evidence and next task",
    "verification_ids": [
      "V-SKILL-DES-001"
    ],
    "implementation_packet": "docs/implementation/WU-CGW-C2C-SKILL_PACKET.md"
  },
  "reason": "First static cross-check found the Review/Verification status contract was present in Detailed Design but missing from Requirements acceptance semantics; correct it before accepting the design Task."
}
```
