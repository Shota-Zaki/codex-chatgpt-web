# Luna-high implementation Packet: WU-CGW-C2C-001

## Goal / 現在地

`Shota-Zaki/codex-chatgpt-web/work` に、C2Cを将来移植するための**通信しない独立Node package骨格**を作る。C2C本体の統合・起動・独立レビュー循環はまだ未実装。このPacketの完了をC2C統合完了と表現しない。

Task: `CGW-C2C-001`。標準実装担当: Codex Luna-high。この文書は委任用Packetであり、作成時点ではLunaへ送信・実行した記録ではない。

正本: `AGENTS.md`、`docs/project/TASKS.md`、`docs/design/{REQUIREMENTS,BASIC_DESIGN,DETAILED_DESIGN,C2C_MIGRATION_AUDIT}.md`。

## 1. 開始確認

本体の開始時workは `af6af7f5ba32700ebb030b2288934495710a19de`。これは監査開始点であり、実装開始時の最新HEADではない。実装前にGitHubのwork/mainとローカルbranch/statusを再取得し、設計commit以降の他作業を確認する。既存差分がある場合は所有者とscopeを確かめ、上書き・reset・force pushで取り除かない。

本体main基準: `293341084ac7a1ddd2de12fede3706023f5b6474`。今回mainへ書き込まない。sourceは読むだけで変更しない。

`CGW-AUD-002`の完全監査残件は未完了。骨格には未精査serviceをimportしないため、この有限WUは独立して着手できる。Bridge移植・実Workspaceでの起動・外部公開へ進むときは、対応監査とSecurity gateを満たす。

Lunaの実際のmodel ID・effortは利用可能なCodex設定を確認して記録する。表示名から未知のIDを推測しない。指定モデルが利用できなければその状況を記録し、別モデル実行をLuna実行と報告しない。

## 2. 固定source

```text
Repository: Shota-Zaki/codex-with-chatgpt
Commit: 89af4fa34952fe58e017b095ae2f793420cf05b0
Version: 0.1.3
```

| source file | 確認したGit blob SHA | 扱い |
| --- | --- | --- |
| package.json | 097780c636d5bb240ccc94814f8b36a9d008a4d5 | package名/private/利用できるscriptsだけ局所調整 |
| pnpm-lock.yaml | 88336be7db815addbbd67c86bda9713cc57d284d | 固定sourceの全文を取得して維持 |
| tsconfig.json | 48246224166b6f9d8e7a51235a44871dd61d594e | NodeNext設定を維持 |
| vitest.config.ts | dc3c799e87542ab109992c115c97702447db388c | 既存Vitest設定を維持 |
| LICENSE | 718f931a2eda70e424562874c367cd5cf3c9d575 | 原文を保持 |

sourceのlockfileの直接依存解決はMCP SDK 1.30.0 / Zod 3.25.76。source package.jsonのSDK specifierはlatestだが、このWUでは `--frozen-lockfile` で固定された解決を利用し、latestを再解決しない。specifierのpin化・依存の安全性改善は別WUでmanifestとlockの整合を取る。これらのバージョンが今の推奨最新版という意味ではない。

## 3. WU-A: 製品8ファイル + Evidence1ファイル

変更可能なファイルは以下の9つに限定する。

```text
packages/c2c-review/package.json
packages/c2c-review/pnpm-lock.yaml
packages/c2c-review/tsconfig.json
packages/c2c-review/vitest.config.ts
packages/c2c-review/LICENSE
packages/c2c-review/UPSTREAM.json
packages/c2c-review/src/index.ts
packages/c2c-review/tests/import-boundary.test.ts
docs/evidence/work-units/WU-CGW-C2C-001A.md
```

対象が既に存在したら、その内容・履歴を調べてこのPacketの前提を確認する。既存実装を新規骨格で置き換えない。scope追加が必要なら別WUとして正本へ分割する。

### package.json

privateな独立packageとし、package名は `@codex-chatgpt-web/c2c-review` を使う。sourceの依存・devDependencies・packageManager・Node engine宣言を保持する。現在実行可能なbuild / test / typecheckだけを用意し、まだ存在しないbin、dev entry、mac service、runtime test scriptは登録しない。rootのBun lockfile、root package.json、Launcher依存には変更を加えない。

sourceのNode >=20はsourceの宣言であり、このWUで全Node版の動作を証明する意味ではない。使用するNode/pnpmと依存engine条件の整合を確認して実際の値をEvidenceへ記録する。

### UPSTREAM.json

schemaVersion、sourceRepository、sourceCommit、sourceVersion、ファイル別sourcePath/sourceBlobSha/targetPath/migrationClass/localPatchReasonを記録する。変更したsourceファイルは元blobと調整内容を両方残す。

新規のindex/test/manifest自身には架空のsourceBlobShaを付けない。新規作成と明示する。コピーしたsourceのMIT通知を消さない。

### inert entry

`src/index.ts` は出自・契約の定数や型をexportする最小入口にする。Bridge/MCP/OAuth/Tunnel/runtime/CLIをimportしない。import時にlisten、spawn、fetch、stateファイル作成を起こさない。ダミーのreview成功や実装済みを返すAPIは作らない。

### tests

`tests/import-boundary.test.ts` で、入口の出自契約とimport無副作用を確認する。関連FS/process/network操作を観測できるfixtureを用い、必要ならmockの限界をEvidenceへ書く。これは将来のC2C全toolのread-only保証試験とは別。

Bun側からNode packageを直接importする試験を作らない。隔離したpackage内のtest/typecheck/buildが成立し、本体を変更していないことを確認する。

## 4. Verification

package scriptsを確認したうえで以下を実行する。version不整合やnetwork不足で失敗したら、lockを書き換えたりengine条件を無視したりせず、原因と未実行項目を記録する。

```sh
node --version
pnpm --version
pnpm --dir packages/c2c-review install --frozen-lockfile
pnpm --dir packages/c2c-review run typecheck
pnpm --dir packages/c2c-review run test
pnpm --dir packages/c2c-review run build
bun run typecheck
bun run test
bun run build
bun run --cwd launcher typecheck
bun run --cwd launcher test
bun run --cwd launcher build
bun run verify
```

sourceのNode runtime testsはこの骨格にまだ移植しないため、このWUでは適用外。適用外をPASSとして加算しない。依存インストールができない場合でも、manifest・固定source取得・test作成・静的scope確認・GitHub反映は進められるが、Required Verification未完了のTaskをDoneにしない。

Evidenceには、開始/終了commit、tested tree/code anchor、実行cwd、command、exit code、実行時刻、Node/pnpm/Bun/model/effort、変更ファイル、未実行と理由を記録する。後からEvidenceをcommitしたHEADを、過去のtest対象として書き換えない。生成されたdistやnode_modulesをcommitしない。

## 5. Commit / independent review / WU-B

WU-Aをworkへcommit/pushし、GitHubから変更ファイルとcommitをreadbackする。main、source repo、root Bun依存、Launcher、既存Credential、Tunnel、OS serviceに差分がないことも確認する。

AstraがGitHubの実差分と実行証跡を独立確認する。C2C未完成のため、この工程レビューをlive C2C受入と呼ばない。Findingがあれば同じscopeの次iterationで修正する。

その後、別の `WU-CGW-C2C-001B` で以下の3文書だけを更新する。

```text
docs/project/TASKS.md
docs/project/NEXT_WORK.md
docs/project/AI_WORK_STATE.md
```

V-C2C-001を満たして工程レビューが通ればCGW-C2C-001をDoneへ進める。検証未実施・失敗ならReview/In Progress等で残し、理由と次の独立Ready Taskを記録する。完全監査残件やC2C live受入を骨格の完了で解除しない。

## 6. Acceptance / Exit

AC-C2C-001〜003 / V-C2C-001を対象とする。出自・依存・NodeNext・MITを保った独立packageとtestがあり、importが無副作用で、本体への無関係な差分がないことを確認する。

このPacketではBridge公開、実Workspace読取、Pairing、service install、C2C Review、auto loop、新Launcher UIまで進めない。失敗はscopeを限定して記録し、同じエラーを盲目的に反復しない。SHA競合は最新SHAを再取得して再適用する。作業終了時には、完了commit・実行結果・未実行・次WUを短く報告する。
