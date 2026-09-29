# Next Work

このJSON blockだけを次WUの正本とする。2026-09-30にremote work HEADと既存Evidenceを再照合した。001A/Bは既に実施済みなので再実装せず、Skill-first設計切替WUから進める。

```json
{
  "schema_version": 2,
  "work_unit": {
    "task_id": "CGW-C2C-SKILL-001",
    "work_unit_id": "WU-CGW-C2C-SKILL-001A",
    "goal": "Skill-firstへのPhase方針・受入境界・既存Runtime保留を正本へ反映し、失効した旧NEXTをremote work HEADとA/B Evidenceへ照合する",
    "implementer": "Codex",
    "complexity": "high",
    "recommended_capability": "architecture-sensitive",
    "selected_model": "runtime_user_choice",
    "selected_effort": "runtime_user_choice",
    "scope": [
      "AGENTS.md",
      "docs/project/PROJECT_BRIEF.md",
      "docs/design/REQUIREMENTS.md",
      "docs/design/BASIC_DESIGN.md",
      "docs/design/DETAILED_DESIGN.md",
      "docs/design/C2C_MIGRATION_AUDIT.md",
      "docs/project/TASKS.md",
      "docs/project/NEXT_WORK.md",
      "docs/project/AI_WORK_STATE.md"
    ],
    "preconditions": [
      "GitHub remote work/main HEADを再取得する。直近観測work=07805ee4c10d26d59714eaa7875b4d72dc9bf135、main=293341084ac7a1ddd2de12fede3706023f5b6474。",
      "001A/001B candidate、Evidence、失敗をremoteから読み直し再実装しない。",
      "参照sourceはcodex-with-chatgpt@89af4fa34952fe58e017b095ae2f793420cf05b0固定、読み取りのみ。"
    ],
    "steps": [
      "Skill + existing Codex Runtime + GitHubへのPhase切替を正本へ反映する。",
      "Skill acceptanceとDeferred Runtime acceptance、Reviewer権限、Native/remote-reference、Evidence/Done semanticsを分ける。",
      "既存骨格/provenance/license、001A/B Evidenceを保持しfailed/not_run結果を変更しない。",
      "remote work HEADと変更pathを比較してworkへ通常commit/readbackする。"
    ],
    "exit_condition": "current design docs/checkpoints agree on Skill-first and existing A/B results remain unchanged; next finite WU is the implementation packet update",
    "verification_ids": [
      "V-SKILL-DES-001"
    ],
    "implementation_packet": "docs/implementation/WU-CGW-C2C-SKILL_PACKET.md"
  },
  "reason": "Remote work already contains WU-001A/B; the prior NEXT_WORK pointed at completed 001A, so this phase switch starts with current-state reconciliation and design supersession."
}
```
