# WU-CGW-INTEGRATION-PLAN-001 — 実施記録

日付: 2026-09-25。Repository: Shota-Zaki/codex-chatgpt-web。Branch: work。

## 結果の境界

全機能のA/B/C/D/E分類、採用Architecture、要求/基本/詳細設計、Task分割、最初のLuna-high Packetを保存した。**完全監査には残件があり、製品コードのC2C統合・日本語first変更・Luna実装・live Reviewはまだ行っていない。**

CGW-AUD-001は主要経路と分類の文書Task、CGW-DES-001は設計/Packetの文書TaskとしてDone。CGW-AUD-002はIn Progress。文書のDoneを製品完成へ読み替えない。

## 基準commit

| 対象 | SHA |
| --- | --- |
| 本体 main基準 | 293341084ac7a1ddd2de12fede3706023f5b6474 |
| 本体 work開始点 | af6af7f5ba32700ebb030b2288934495710a19de |
| 本Evidence作成直前のcheckpoint | ce276e55a8d84ca93b232ab3155d6ab63c44ffed |
| C2C source work固定点 | 89af4fa34952fe58e017b095ae2f793420cf05b0 |
| C2C source main | 9663b88753e35c76796c5bce000293e0bd22cd9e |

checkpointは本Evidence自身のcommitを含まない。最終HEADはGitHubのworkから取得する。sourceのwork/mainは終了前のbranch取得でも固定点と一致した。

## 更新した正本と成果物

運用/目的: AGENTS.md、docs/project/PROJECT_BRIEF.md。

設計: docs/design/REQUIREMENTS.md、BASIC_DESIGN.md、DETAILED_DESIGN.md、C2C_MIGRATION_AUDIT.md。

進捗/再開: docs/project/TASKS.md、NEXT_WORK.md、AI_WORK_STATE.md。

委任準備: docs/implementation/WORK_UNITS.md、WU-CGW-C2C-001_PACKET.md。

追加監査Evidence: docs/evidence/audit/WU-CGW-AUD-002A.md、WU-CGW-AUD-002B1.md、WU-CGW-AUD-002B2.md。

本Evidenceを含め15文書。旧BOOTSTRAP Evidenceは履歴として保持し、現在方針は新しい正本を参照する。

## 確認した内容

両Repositoryの最新work/mainと固定差分を取得した。本体の開始時差分はProject文書だけだった。sourceのMCP、Workspace/Secret、Git、execution、OAuth/Pairing、Bridge/daemon、設定/CLI、Tunnel、Node privacy、Mac supervisor/service、Skillを静的確認し、M01〜24/F01〜09へ整理した。

追加監査はAの8ファイル、B1の8ファイル、B2の4ファイル。取得blob・確認範囲・未実行・Task対応を各Evidenceへ保存した。全test本文・推移的依存・PoC・本体adapter接合箇所は未精査として残す。

採用構成は独立Node/pnpm C2C child processと小さいBun Host adapter。実装writeとReviewer read-only、公開MCPとprivate管理面、実行inboxとauth/runtime/判定storeを分離する。C2CはAIモデルではなく独立Reviewerへのデータ面と定義した。

Repo/base/head/revisionと実行証跡を結び付け、stale/別Repo/欠落output/途中切れ/取得失敗を成功にしない契約を追加した。Named失敗時のstate保全、provision前検証、DNS readback、診断と設定変更の分離もTaskへ反映した。

## 文書Verification

| 項目 | 実施結果 |
| --- | --- |
| 固定source本文と移植表の照合 | 主要経路と上記追加範囲を実施。完全監査は未完了 |
| TASKS JSON parse | 実施、21 Task |
| Task/Acceptance/Verification ID重複 | 重複なしをプログラム検証 |
| 依存Task存在とcycle | 存在・非循環をプログラム検証 |
| VerificationからAcceptanceへの参照 | 各Task内参照をプログラム検証 |
| 保存内容一致 | localで検証したTASKSのGit blob SHAとGitHub readback SHAが一致 |
| 新旧方針 | 外部C2C専用方針を製品内統合へ置換。main/source変更なしの範囲を保持 |
| 正本readback | 本Evidence以外の更新文書は作成前にGitHubから再取得済み。本Evidenceも保存後に取得する |

検証したTASKS blob: `1ffd883d7437c2f1ba58a42c23ceae6f9b3fe682`。

Task内訳はDone 2 / In Progress 1 / Ready 2 / Backlog 15 / Deferred 1。製品の完成率を示す数字ではない。初回Luna Packetは設定8ファイル、inert entry/test等4ファイル、checkpoint3文書。pnpm esbuild許可を保持し、cache配置の非採用理由も明記した。

## 未実施 / 未受入

製品の依存install、test、typecheck、build、C2C単体受入、OAuth live、Secret/escape/read-only実試験、Luna実装、Review/Fix/再Review、Mac実機/24時間観測、配布物Security同等性は未実施。

Luna Packetは準備済みだが送信・実行していない。コードはまだ移植していない。日本語firstも設計とTaskのみで、App.tsxや保存stateは変更していない。

## エラーと復旧

project connector workspace_infoはaccount-connectの400エラーで失敗。原因を以前の内部エラーと同一とは断定せず、ENV/live受入だけDeferredとしてGitHub作業を継続した。別Workspace接続やCredential変更は行っていない。

Packet更新にSHA不一致409が1件あった。最新全文を分割取得して確認し、最新blob SHAで同じ意図の修正を再適用、commit `1f9963462089243123266466f4adef346811be02` とreadbackで解消した。force push、reset、失敗操作の成功扱いは行っていない。

## 次のWU

NEXT_WORKの `WU-CGW-AUD-002C1`。固定sourceのhelpers/workspace/privacy/search/git/execution/MCP/OAuthの8テスト本文を確認し、既存assertionと不足fixtureを整理する。その後に残りtests/依存と本体接合箇所を精査する。

C2C単体→手動Review/Fix/再Review→自動Development Loop/Launcherの順序を維持する。未実施をPASSにせず、実装・検証を行ったcode anchorと後続Evidence commitを区別する。main merge、Release、Deploy、削除、Archive、Credential変更、課金は今回実行していない。
