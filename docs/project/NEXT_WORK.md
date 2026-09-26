# Next Work

このJSON blockだけを次WUの正本とする。固定sourceの静的監査と統合設計は完了。製品コードのC2C統合はまだ開始していない。

```json
{
  "schema_version": 2,
  "work_unit": {
    "task_id": "CGW-C2C-001",
    "work_unit_id": "WU-CGW-C2C-001A",
    "goal": "通信しない独立Node packageの設定・frozen lock・provenance骨格だけを作り、C2C Runtimeをまだ起動しない",
    "implementer": "Codex",
    "complexity": "medium",
    "recommended_capability": "routine-implementation",
    "selected_model": "runtime_user_choice",
    "selected_effort": "runtime_user_choice",
    "scope": [
      "packages/c2c-review/package.json",
      "packages/c2c-review/pnpm-lock.yaml",
      "packages/c2c-review/pnpm-workspace.yaml",
      "packages/c2c-review/tsconfig.json",
      "packages/c2c-review/vitest.config.ts",
      "packages/c2c-review/LICENSE",
      "packages/c2c-review/UPSTREAM.json",
      "docs/evidence/work-units/WU-CGW-C2C-001A.md"
    ],
    "preconditions": [
      "remote work/mainとローカルbranch/statusを再取得し、並行変更を確認する",
      "TASKS.mdでCGW-AUD-002=Done、CGW-DES-001=Done、CGW-C2C-001=Readyを確認する",
      "docs/implementation/WU-CGW-C2C-001_PACKET.mdと現在の対象pathを読み、既存ファイルがあれば上書き前に内容を確認する",
      "現在のCodex runtime catalogから利用可能なmodel/effortをユーザーが選択し、Run Evidenceへ記録する。Taskからmodel IDを推測固定しない"
    ],
    "steps": [
      "source固定点Shota-Zaki/codex-with-chatgpt@89af4fa34952fe58e017b095ae2f793420cf05b0のpackage/lock/workspace/tsconfig/vitest/LICENSEを固定blobから取得する",
      "package名だけ@codex-chatgpt-web/c2c-reviewへ局所調整しprivate化する。未移植のbin/dev/service/runtime scriptを登録しない",
      "source pnpm-lock.yamlの解決をそのまま保持しlatestを再解決しない。pnpm-workspace.yamlのallowBuildsはesbuildだけを維持する",
      "UPSTREAM.jsonへsourceRepository/sourceCommit/sourceVersion/sourcePath/sourceBlobSha/targetPath/migrationClass/localPatchReasonを記録する。.npmrcのcache配置を非採用とした理由も残す",
      "root Bun package/lock、Launcher、main、source Repository、Credential、Tunnel、OS serviceを変更しない",
      "このWUではsrc/index.ts、Bridge、MCP、OAuth、Tunnel、serviceを作らず、通信・listen・spawn・live接続を開始しない",
      "依存/provenance/差分scopeを確認し、実行していないtest/typecheck/buildをPASSと記録しない",
      "workへ小さくcommit/pushし、GitHubから8ファイルとcommitをreadbackする。WU-Bへ進む前に独立差分確認する"
    ],
    "exit_condition": "8ファイルの設定/provenance骨格が固定source由来で作成され、無関係な本体差分がなく、GitHub readback済み。Runtime起動・C2C機能Acceptance・live接続は未実施のまま残す",
    "verification_ids": [
      "V-C2C-001"
    ],
    "implementation_packet": "docs/implementation/WU-CGW-C2C-001_PACKET.md"
  },
  "reason": "固定sourceの静的監査、要件、基本設計、詳細設計、Acceptance/Verification、Task graph、Work Unit分割、最初のImplementation Packetまで確定し、実装開始条件が揃ったため"
}
```
