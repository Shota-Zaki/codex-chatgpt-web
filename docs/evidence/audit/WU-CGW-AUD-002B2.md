# WU-CGW-AUD-002B2 — 常駐入口・Skill・package設定

日付: 2026-09-25。Task: CGW-AUD-002。sourceは `Shota-Zaki/codex-with-chatgpt@89af4fa34952fe58e017b095ae2f793420cf05b0`。

| source path | Git blob SHA | 確認範囲 |
| --- | --- | --- |
| scripts/macos-service.mjs | a3bb3b2824e3aa361e5ab7da797b8b0f79e4bce0 | 全文 |
| skill/SKILL.md | ce88111ced6d0a46417dc9542b4648b83db278a5 | 全体取得と500行以降の末尾を追加取得 |
| pnpm-workspace.yaml | 5ed0b5af0d45919f64c66edfb16a5f4512461fa1 | 全文 |
| .npmrc | 56d20c620227775940e184dfab1d2117833be0d5 | 全文 |

## Mac service入口

planは設定計画を表示し、prepare/install-agent/start-agent/stop-agent/statusは区別されている。rootでの準備を拒否し、既存LaunchAgentの上書きを避け、UUID、Node path、build済みartifact、runtime directory、run.lockを確認する。これらの防御は保持する。

runtimeDir・共有Workspace・volume・labelは旧製品/特定ホスト向けであり、そのままコピーして使わない。M15/M16/M23に従い製品の設定adapterへ切り出す。prepareはファイルを生成する操作であり、読み取り専用のplanと区別する。今回はどのservice操作も実行していない。

## Skillの再利用範囲

小さいINIT/PLAN/EXECUTED/REVIEW/HANDOFF、MCPからの独立取得、Secret拒否、未知PID保全、work/readbackの考え方はM18へ再利用する。

固定Workspace/checkout/state/runtime/hostname、旧CLIのsetup/doctor、接続再設定手順は製品設定と明示管理操作へ置き換える。文書に書かれた命令を現在の作業権限と解釈しない。Skillに対象Repositoryを書くだけではsource MCPのRepository選択能力にはならず、F04のadapterが必要。

「Bridge停止」の見出しの下にstartコマンドがある箇所は、障害状態からの復旧なのか停止操作なのかを表示上明確にする。recordでtests passed等を手入力する例は利用例であり、実行成功の証明にはしない。統合版はHost recorderが実command/exit/revisionを観測する。

## 初回package Packetの補正

pnpm-workspace.yamlに `allowBuilds: { esbuild: true }` がある。sourceの依存設定を維持するため、このファイルも隔離packageへ移植する。許可対象を全dependencyへ広げない。

.npmrcは `store-dir=.tooling/pnpm-store` のローカルcache配置だけを定める。統合版ではcache配置をHost側の運用設定とし、このsourceの.npmrcは初回packageへコピーしない。UPSTREAM.jsonにこの意図的非採用を記録する。依存のinstall許可を変更する理由として扱わない。

初回Packetは設定/provenanceのWU-A、inert entry/testのWU-B、正本checkpointのWU-Cへ分割する。source lock、NodeNext、license、pnpm allowBuildsの確認と、実装・検証を同じ巨大更新へ詰め込まない。

## 残る監査

全test本文とfixture対応、推移的依存、scripts/poc-client.mjs、既存本体のadapter接合箇所の本文確認が残る。本体src directoryでbridge/cli/codex-integration各moduleの存在は確認したが、存在確認を接合点の実装監査済みとは扱わない。

静的確認のみ。CLI/service操作、依存install、test/typecheck/build、Luna委任、C2C live、Mac実機は未実施。
