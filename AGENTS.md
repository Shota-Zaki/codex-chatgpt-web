# AGENTS.md

このRepositoryは `miuuyy/codex-chatgpt-web` のfork。upstream主要機能・他locale・追従性を維持し、`Shota-Zaki/codex-with-chatgpt` のC2Cを独立Node Runtimeとして製品内へ統合する。

## 正本

- 目的: `docs/project/PROJECT_BRIEF.md`
- 要求・設計・移植監査: `docs/design/`
- Task状態: `docs/project/TASKS.md` のJSON
- 次のWU: `docs/project/NEXT_WORK.md` のJSON
- 再開情報: `docs/project/AI_WORK_STATE.md` のJSON
- 実行証跡: `docs/evidence/`
- Luna-high実装Packet: `docs/implementation/`

2026-09-25の統合設計時点では、C2C製品コードはまだ未統合。文書・Packetの存在を実装完了と解釈しない。旧方針の「C2Cは外部利用のみ」は統合設計によって置き換える。「同等機能を全面rewriteせず再利用する」という保守方針は維持する。

## Branch / 変更権限

`work` が開発正本。通常の小さいcommit/pushはworkへ行い、GitHubからreadbackする。`main` はupstream/公開基準であり、merge、Release、Deploy、Repository削除・Archive、既存Credential変更、課金操作はユーザーの明示指示時に扱う。source Repositoryを変更する作業は今回の範囲に含めない。`CodeX-Chat-Develop` へ依存しない。

## 役割

Astraは調査・設計・移植判断・Acceptance・Task分割・実装委任・独立レビューを担当する。大量の製品コード編集はCodex Luna-highが担当する。

Codex Luna-highは設計済みWUの編集、test/typecheck/build、Git操作、Finding修正を担当する。モデル表示名を未知のCLI/API model IDへ推測変換しない。実際の選択モデル・effortを記録し、無断のモデル切替を成功として報告しない。

C2CはAIモデルそのものではなく、独立ReviewerへWorkspace/source/diff/execution evidenceを提供するread-only境界。Reviewer contextにはCodexのwrite/shell/管理権限を渡さない。修正はReviewerが実行せず、Findingを受けたHostが次のLuna-high Packetとして委任する。

## 製品構成

```text
codex-chatgpt-web
  upstream Web / Codex Runtime       write可能な実装担当
  packages/c2c-review                Node / pnpm / read-only MCP
  integrations/c2c                   小さいHost adapter
  integrations/development-loop      手動循環受入後のorchestrator
  launcher                          既存UIへの局所追加
```

上記の新規ディレクトリは実装予定であり、現在存在するという意味ではない。

C2CをBun本体へ直接importしない。package/lockfile、OAuth、private state、公開MCPと管理APIの境界を分離する。CodexにC2C状態領域全体を書込許可せず、実行証跡inboxだけを限定共有する。readOnlyHintや別processだけをOS sandboxの証明としない。

## 工程

1. 固定sourceの監査・A/B/C/D/E分類。未精査範囲も記録する。
2. 要求・基本/詳細設計と移植ゲートを確定する。
3. 通信しないpackage骨格から、小さいWUで移植と補強を行う。
4. C2C単体の機能・Secret・Workspace・read-only受入を行う。
5. Luna-high → C2C Review → Finding → Fix → 再Reviewを実際に成立させる。
6. その後に自動Development LoopとLauncher追加UIを実装する。

実WorkspaceでのC2C起動・外部公開へ進む前に、完全監査残件と該当Security gateを満たす。受入のための合成fixture・一時Workspace・隔離state・loopback試験は実運用開始と区別して実施できる。文書上の設計決定やpackage骨格の作成は、未受入Runtimeを実運用する許可ではない。

CLI全体をReviewerへ公開しない。sourceのsetup/doctor等には設定変更があり、doctor --no-fixも無副作用とは限らない。統合Hostでは診断と修復・保存・Pairing等の管理操作を分離する。

## 日本語化

既存の `launcher/src/i18n.ts`、`limits-copy.ts`、`launcher/electron/languages.json` を利用し、他localeと保存済み言語を維持する。日本語専用UI treeを作らない。DOM selector、connector名、MCP名、endpoint、CLI option、protocol fieldなど機械契約は翻訳しない。

`CGW-JP-001` は `launcher/src/App.tsx` のdocumentLanguage/languageの未選択fallbackだけをenからjaへ変更する。`launcher/electron/state.cjs` の `language: null` と言語選択stageは維持する。日本語化とC2C移植を同一WUへ混ぜない。

## 検証・Done

WUは原則5〜10ファイル以内。製品差分とcheckpoint更新が合わせて大きくなる場合は別WUへ分ける。

製品コード変更では対象に応じて以下を実行し、command/cwd/exit code/対象commitと出力を記録する。

```sh
bun run typecheck
bun run test
bun run build
bun run --cwd launcher typecheck
bun run --cwd launcher test
bun run --cwd launcher build
bun run verify
```

C2C packageにはsource由来のpnpm test/typecheck/buildとNode runtime testsを別に用意する。実在するscriptを確認して使い、存在しないscriptや未実行試験をPASSにしない。配布・live browser・Mac実機の検証は単体testと区別する。

受入対象はRepo/Task/run/base/headに結び付ける。古い結果、別Repo、欠落output、途中切れdiff、取得エラーは成功の証拠にならない。C2C完成前の工程レビューはGitHub上の独立diff確認と実行証跡で行い、live C2C受入とは別に記録する。最終Doneは必須AcceptanceとRequired Verificationを満たしたときだけ。

## エラー復旧

1回の失敗で全体を止めず、失敗したTask/WUへ影響を限定する。GitHub大規模書込は少数ファイルの取得→変更→commit→readbackへ分割する。SHA競合は最新HEAD/該当blobを読み直して再適用し、force pushしない。

tool上限前には完了commit、未commit、次WU、未実行検証を正本へ保存する。404/取得失敗はtree/list/別の小scopeで確認し、同じ失敗を盲目的に繰り返さない。C2C接続失敗はENV/live ReviewをDeferredとし、設計・移植準備・local tests・文書・他Ready Taskを継続する。接続復旧のために別Workspaceを選んだり既存Credentialを変更したりしない。

## 共通Rules参照

既存正本から継承した参照: `Shota-Zaki/development-rules` / main / 3.1.1 / `c55ffb6b6f21bdb9c78f70f6a47e59c75a3f74b5`。本作業ではこのRules Repositoryの最新状態を再検証していない。このforkにはRules Snapshot一式を複製せず、必要な同期は独立WUとする。
