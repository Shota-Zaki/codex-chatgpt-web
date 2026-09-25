# Next Work

このJSON blockだけを構造化情報の正本とする。

```json
{
  "schema_version": 1,
  "work_unit": {
    "task_id": "CGW-JP-001",
    "work_unit_id": "WU-CGW-JP-001",
    "goal": "既存の言語選択フローと保存stateを維持したまま、未選択時のLauncher UIを日本語firstにする",
    "scope": [
      "launcher/src/App.tsx",
      "launcher/tests/renderer-wiring.test.cjs",
      "docs/evidence/work-units/WU-CGW-JP-001.md",
      "docs/evidence/CGW-JP-001/**",
      "docs/project/TASKS.md",
      "docs/project/NEXT_WORK.md",
      "docs/project/AI_WORK_STATE.md"
    ],
    "steps": [
      "開始時にwork HEADと既存差分を確認する",
      "launcher/src/App.tsxのdocumentLanguageとlanguageのnull fallbackだけをenからjaへ変更する",
      "snapshot.state.languageがnullのときlanguage onboarding stageを維持することをrenderer-wiring testへ追加する",
      "state.cjs、i18n.ts、limits-copy.ts、languages.jsonは要件上必要でない限り変更しない",
      "bun run --cwd launcher typecheck を実行する",
      "bun run --cwd launcher test を実行する",
      "bun run --cwd launcher build を実行する",
      "可能ならbun run verifyも実行する",
      "実行結果を記録し、codex-with-chatgptのC2C reviewへEXECUTEDとして渡す",
      "review findingがあれば同Taskの次iterationで修正し、問題がなければCGW-JP-001をDoneへ進める"
    ],
    "exit_condition": "V-JP-001のRequired VerificationとC2C review結果が確認できCGW-JP-001をDoneへ進められる、または未実行項目と再開条件を正確に保存する",
    "verification_ids": [
      "V-JP-001",
      "V-LOOP-001"
    ]
  },
  "reason": "日本語辞書はupstreamに既に存在するため、最初の製品差分を2行のfallback変更と回帰テストに限定する"
}
```
