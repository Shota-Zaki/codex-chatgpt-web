# AI Work State

このJSON blockだけを再開情報の正本とする。Task状態はTASKS、次の有限WUはNEXT_WORKを参照する。

```json
{
  "schema_version": 1,
  "branch": "work",
  "base_commit": "293341084ac7a1ddd2de12fede3706023f5b6474",
  "checkpoint_id": "WU-CGW-INTEGRATION-PLAN-001",
  "pending_changes": [],
  "resume_notes": [
    "2026-09-25。統合先はShota-Zaki/codex-chatgpt-web/work。監査開始時workはaf6af7f5ba32700ebb030b2288934495710a19de、mainはbase_commit。開始時差分は文書のみでpackage versionは6.1.0。再開時には最新HEADを取得する。",
    "このcheckpoint記録直前の観測済みworkはe8de26563c280c9a822f058497d10f6ea2767c9f。この文書やEvidenceを含む最終HEADの自己参照ではない。最終HEADはGitHubから取得する。",
    "C2C source固定点はShota-Zaki/codex-with-chatgpt@89af4fa34952fe58e017b095ae2f793420cf05b0、source mainは9663b88753e35c76796c5bce000293e0bd22cd9e。今回はsourceを変更していない。",
    "旧方針の外部C2C専用利用は置換済み。本体Bun、独立Node/pnpmのpackages/c2c-review、小さいHost adapterを採用し、実装writeとReviewer read-onlyを分離する。新規製品directoryは設計上の予定で、まだ未実装。",
    "C2C本体、製品コード統合、日本語first変更、自動loop、新Launcher UIはまだ実装していない。今回の変更はAGENTSとdocsのみ。",
    "全機能のM01〜M24分類とF01〜F09を保存。主要経路に加えAUD-002Aの8ファイル、B1の8ファイル、B2の4ファイルを静的確認した。全test本文、推移的依存、PoC、本体接合箇所の残件があり、完全監査は未完了。",
    "次はWU-CGW-AUD-002C1。NEXT_WORKの8テストファイルを固定sourceから取得してassertionと不足fixtureを確認する。既存本文確認を実行PASSに変換しない。",
    "要求、基本/詳細設計、Task graph、WORK_UNITS、最初のLuna Packetを保存済み。Packetは設定8ファイル、inert entry/test等4ファイル、checkpoint3文書へ分割し、pnpmのesbuild build許可を保持する。Lunaへの送信・実行は未実施。",
    "日本語firstはApp.tsxの2つのnull fallbackだけをjaへ変更する独立Task。stateのlanguage:nullと既存言語選択stage、他locale、selector/MCP/endpoint/CLI等の機械契約を維持する。",
    "重要な追加契約はRepository選択、base/head固定diffとrevision read、Repo/Task/run/commitへ束縛した実行証跡、限定inboxとprivate auth/runtime/review stateの分離。metadata ignore、実行記録のSecret、OAuth scope/resource、診断とprovisionの誤った成功判定を補強する。",
    "Named失敗時に既存stateをQuickへ上書きせず、事前検証・DNS binding readback・明示切替を導入する設計。旧sourceのservice/credential/DNSは変更していない。",
    "project connector workspace_infoはConnectorClientError 400: We couldn't connect your account. Please try again.で失敗。以前の内部エラーと同じ原因とは未確認。live受入だけDeferred。別WorkspaceやCredential変更で迂回しない。",
    "実施した検証はGitHub固定source確認、文書readback、Task JSON/一意ID/依存graph/Acceptance参照の検証。製品test/typecheck/build、C2C単体/live、Mac実機/24h、Luna→Review→Fix→Reviewは未実施。",
    "Packet更新のSHA不一致409は最新全文とblob SHAを再取得して再適用し解消した。force pushやbranch resetは行っていない。失敗した書込を成功扱いしない。",
    "本作業はGitHub APIで小さい文書commitを保存している。pending_changesは未commitの予定変更を表し、ローカルcheckoutのcleanを実測したという意味ではない。",
    "main merge/Release/Deploy/削除/Archive/Credential変更/課金は実施していない。CodeX-Chat-Developへ依存しない。Accepted code anchorと後続Evidence commitを分け、古いテスト結果を現在HEADへ付け替えない。"
  ]
}
```
