# Next Work

このJSON blockだけを次WUの正本とする。起動入口/CLI/Tunnel/service/Skillの追加監査は `docs/evidence/audit/WU-CGW-AUD-002A.md`、`WU-CGW-AUD-002B1.md`、`WU-CGW-AUD-002B2.md` に保存済み。Luna Packetは作成済みで、送信・実装は未実施。

```json
{
  "schema_version": 1,
  "work_unit": {
    "task_id": "CGW-AUD-002",
    "work_unit_id": "WU-CGW-AUD-002C1",
    "goal": "固定sourceの主要Security・MCPテスト本文を精査し、F01〜F09に対する既存検証と不足fixtureを対応付ける",
    "scope": [
      "docs/design/C2C_MIGRATION_AUDIT.md",
      "docs/evidence/audit/WU-CGW-AUD-002C1.md"
    ],
    "steps": [
      "両Repositoryの最新work/mainと本体の正本を再取得し、並行変更を確認する。sourceの監査固定点は89af4fa34952fe58e017b095ae2f793420cf05b0のまま維持する",
      "固定sourceのtests/helpers.ts、workspace.test.ts、workspace-privacy.test.ts、search.test.ts、git.test.ts、execution-output.test.ts、mcp-integration.test.ts、oauth.test.tsの8ファイルを読む。長いファイルは行範囲で末尾まで取得する",
      "各assertionが確認する機能、fixtureの前提、mock境界、未確認のmetadata/Repo/revision/Secret/失敗判定を整理し、固定blobとcoverageをEvidenceへ記録する",
      "テストの存在・本文確認と実行成功を区別する。静的確認でF01〜F09を解消済みにせず、追加fixtureと実装Taskへ対応付ける",
      "監査/Evidenceの2ファイルをworkへcommitし、GitHubからreadbackする。source Repositoryへ書き込まない",
      "別checkpoint WUでTASKS/NEXT_WORK/AI_WORK_STATEの3文書を更新する。残りtests/runtime tests、lock/推移的依存、scripts/poc-client.mjs、本体adapter接合箇所が残る間はCGW-AUD-002をDoneにしない",
      "残りのC2/C3とB3を小さく続行する。初回Luna Packetはdocs/implementation/WU-CGW-C2C-001_PACKET.md。設定8ファイル、inert entry/test等4ファイル、checkpoint3文書に分かれている"
    ],
    "exit_condition": "8ファイルの本文とassertionの確認範囲・不足fixture・固定blob・GitHub readbackを保存する。実行していないtest/build/C2C liveは未実施のまま残す",
    "verification_ids": [
      "V-AUD-002"
    ]
  },
  "reason": "全機能分類・採用構成・要求/詳細契約・Task・初回Packetは保存済みだが、完全監査の残件を隠さず先に閉じるため"
}
```
