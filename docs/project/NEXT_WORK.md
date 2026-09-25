# Next Work

このJSON blockだけを次WUの正本とする。作成済みLuna Packetの準備と、Lunaへの送信・実行を区別する。

```json
{
  "schema_version": 1,
  "work_unit": {
    "task_id": "CGW-AUD-002",
    "work_unit_id": "WU-CGW-AUD-002A",
    "goal": "固定sourceの起動入口・CLI・設定・loggerの未精査範囲を閉じ、移植前の権限と副作用を確認する",
    "scope": [
      "docs/design/C2C_MIGRATION_AUDIT.md",
      "docs/evidence/audit/WU-CGW-AUD-002A.md"
    ],
    "steps": [
      "両Repositoryのwork/mainをGitHubから再取得し、本体の現在HEADと監査固定sourceとの差分・並行作業を確認する",
      "source 89af4fa34952fe58e017b095ae2f793420cf05b0のbin/c2c.js、runtime/bootstrap.mjs、src/config/paths.ts、src/config/endpoint.ts、src/config/ui-prefs.ts、src/logger/index.ts、src/cli/index.ts、src/auth/html.tsを読む。長いCLIは行範囲に分ける",
      "公開/管理/実装権限、privacy初期化、credential露出、ファイル境界、CLI副作用、異常終了を確認し、固定blobと確認範囲をEvidenceへ記録する",
      "監査済みの主要経路と合わせてFindingを更新する。未読の残りTunnel/service/Skill/全tests/依存を監査済みにしない",
      "このWUでsource Repositoryや製品コードを書き換えず、監査/Evidenceの2ファイルを小さくworkへcommitしてGitHubからreadbackする",
      "別checkpoint WUでTASKS/NEXT_WORK/AI_WORK_STATEの3文書を更新する。CGW-AUD-002は残るB/C範囲が閉じるまでDoneにしない",
      "その後はWORK_UNITSのAUD-002B/Cを優先する。初回Luna実装Packetはdocs/implementation/WU-CGW-C2C-001_PACKET.mdに準備済みで、実行委任はまだ行っていない"
    ],
    "exit_condition": "8つのsource fileの静的監査範囲・Finding・未確認事項を記録し、GitHub readbackと次WUへのcheckpointを完了する。C2C liveや製品testsのPASSとは扱わない",
    "verification_ids": [
      "V-AUD-002"
    ]
  },
  "reason": "主要経路と機能分類・統合設計・初回Packetは保存したが、完全監査は未完了のため、移植実装より先に残件を確認する"
}
```
