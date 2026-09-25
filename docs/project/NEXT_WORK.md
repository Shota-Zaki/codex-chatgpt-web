# Next Work

このJSON blockだけを次WUの正本とする。Luna Packetの作成と送信・実行を区別する。起動入口・CLI等の追加8ファイルは `docs/evidence/audit/WU-CGW-AUD-002A.md` に確認範囲を保存済み。

```json
{
  "schema_version": 1,
  "work_unit": {
    "task_id": "CGW-AUD-002",
    "work_unit_id": "WU-CGW-AUD-002B1",
    "goal": "固定sourceの残りTunnel補助・provision実装を精査し、通常起動と外部設定操作の境界を確定する",
    "scope": [
      "docs/design/C2C_MIGRATION_AUDIT.md",
      "docs/evidence/audit/WU-CGW-AUD-002B1.md"
    ],
    "steps": [
      "両Repositoryのwork/mainをGitHubから再取得し、本体の現在HEADと監査固定sourceとの差分・並行作業を確認する",
      "source 89af4fa34952fe58e017b095ae2f793420cf05b0のsrc/tunnel/cloudflared.ts、detect.ts、hostname.ts、named-provision.ts、protocol.ts、provider.ts、state.ts、src/version.tsの8ファイルを読む。長いファイルは行範囲へ分ける",
      "子process環境、固定argv、出力とSecret、停止・timeout・再起動、Named/Quick切替、DNS/credential操作の副作用を確認し、固定blobとFindingをEvidenceへ記録する",
      "旧sourceの診断/管理操作をReviewerへ公開しないこと、metadata/helperの既存防御を維持することをAUD-002Aと突合する",
      "source Repositoryや製品コードを変更せず、監査/Evidenceの2ファイルをworkへcommitしてGitHubからreadbackする",
      "別checkpoint WUでTASKS/NEXT_WORK/AI_WORK_STATEの3文書を更新する。serviceインストール入口・Skill・全tests/依存・既存本体adapter接合点が残る間はCGW-AUD-002をDoneにしない",
      "その後はAUD-002B2/Cで残る範囲を確認する。初回Luna Packetはdocs/implementation/WU-CGW-C2C-001_PACKET.mdに作成済みで、送信・実行はまだ行っていない"
    ],
    "exit_condition": "8ファイルの静的監査範囲・Finding・未確認事項とGitHub readbackを保存し、次の残件へcheckpointを進める。C2C liveや製品testsのPASSとは扱わない",
    "verification_ids": [
      "V-AUD-002"
    ]
  },
  "reason": "主要経路と追加8ファイルの監査・全機能分類・統合設計・初回Packetは保存したが、完全監査の残件を移植実装より先に確認する"
}
```
