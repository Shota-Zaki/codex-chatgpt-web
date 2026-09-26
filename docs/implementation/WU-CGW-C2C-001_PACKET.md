# Codex implementation Packet: WU-CGW-C2C-001

## Goal / 現在地

`Shota-Zaki/codex-chatgpt-web/work` に、C2Cを移植するための**通信しない独立Node package骨格**を作る。C2C本体・live review・開発ループは未統合。このPacketの完了はC2C統合完成ではない。

Task: `CGW-C2C-001`。ImplementerはCodex。`recommended_capability: routine-implementation` は助言であり、model/effortはRun開始時に現在のCodex runtime catalogからユーザーが選択する。Packet作成時点では製品コード実装は未実施。

正本は `AGENTS.md`、`docs/project/TASKS.md`、`docs/design/{REQUIREMENTS,BASIC_DESIGN,DETAILED_DESIGN,C2C_MIGRATION_AUDIT}.md`。固定sourceの静的監査 `CGW-AUD-002` と統合設計 `CGW-DES-001` はDoneで、最初の実装TaskとしてこのPacketを開始できる。動的C2C受入・live接続・Development Loop受入は後続Task。

## 開始確認

過去の監査開始HEADを現在HEADと推測しない。実装開始時にremote `work` / `main` とローカルbranch/statusを再取得し、`TASKS.md` で `CGW-AUD-002=Done`、`CGW-DES-001=Done`、`CGW-C2C-001=Ready` を確認する。既存差分・並行作業を上書き/reset/force pushで消さない。

このPacketはGate Bの**通信しない骨格**だけを作る。Bridge/MCP/OAuth/Tunnel/service、実Workspace読取、外部公開は開始しない。静的監査がDoneでも、動的Security Acceptanceやlive受入が済んだことにはしない。

Run開始時に現在利用可能なCodex model/effortを提示し、ユーザーが選択した値を記録する。Task/Packetからmodel IDを推測・固定しない。選択modelが利用不能なら `Blocked / MODEL_SELECTION_STALE` とし、別modelへsilent fallbackしない。

## 固定sourceと出自

source: `Shota-Zaki/codex-with-chatgpt@89af4fa34952fe58e017b095ae2f793420cf05b0`、version 0.1.3。sourceは読み取り専用。

| source file | Git blob SHA | 扱い |
| --- | --- | --- |
| package.json | 097780c636d5bb240ccc94814f8b36a9d008a4d5 | 名前/private/実在scriptsだけ局所調整 |
| pnpm-lock.yaml | 88336be7db815addbbd67c86bda9713cc57d284d | 全文を固定取得して維持 |
| pnpm-workspace.yaml | 5ed0b5af0d45919f64c66edfb16a5f4512461fa1 | esbuildだけのallowBuildsを保持 |
| tsconfig.json | 48246224166b6f9d8e7a51235a44871dd61d594e | NodeNextを維持 |
| vitest.config.ts | dc3c799e87542ab109992c115c97702447db388c | 既存Vitest設定を維持 |
| LICENSE | 718f931a2eda70e424562874c367cd5cf3c9d575 | 原文を保持 |
| .npmrc | 56d20c620227775940e184dfab1d2117833be0d5 | .tooling/pnpm-storeというcache配置のみ。今回はコピーせず理由をmanifestへ記録 |

source lockの直接依存はSDK 1.30.0 / Zod 3.25.76。packageのSDK specifierがlatestでも、frozen lockで固定された解決を利用し、このWUでlatestを再解決しない。specifier pin化や依存の安全性改善は別WUでmanifestとlockの整合を取る。これらの版が今の推奨最新版という意味ではない。

## WU-A: 設定とprovenance — 8ファイル

```text
packages/c2c-review/package.json
packages/c2c-review/pnpm-lock.yaml
packages/c2c-review/pnpm-workspace.yaml
packages/c2c-review/tsconfig.json
packages/c2c-review/vitest.config.ts
packages/c2c-review/LICENSE
packages/c2c-review/UPSTREAM.json
docs/evidence/work-units/WU-CGW-C2C-001A.md
```

既存pathがあれば内容と履歴を調べ、作成済み実装を骨格で置き換えない。

package名は `@codex-chatgpt-web/c2c-review`、privateとする。sourceのdependencies/devDependencies/packageManager/engine宣言を保持する。最終的に存在するbuild/test/typecheckを用意し、未移植bin/dev/service/runtime-testを登録しない。rootのBun package/lockfileとLauncher依存は変更しない。

pnpm-workspace.yamlのesbuild許可を維持し、全依存へのbuild許可へ広げない。.npmrcはruntime契約ではなくsourceのcache配置なのでコピーせず、Hostの既存cache運用に任せる。cache生成物・node_modules・distをcommitしない。

UPSTREAM.jsonにはschemaVersion、sourceRepository、sourceCommit、sourceVersion、sourcePath/sourceBlobSha/targetPath/migrationClass/localPatchReasonを記録する。新規manifest/index/testには架空のsourceBlobShaを付けない。コピーしたMIT通知を保持する。

このWUはまだindexがない設定段階。依存解決・provenance・差分scopeを確認してcommit/readbackし、test/buildを実行したことにしない。

## WU-B: inert entryとtest — 4ファイル

```text
packages/c2c-review/src/index.ts
packages/c2c-review/tests/import-boundary.test.ts
packages/c2c-review/UPSTREAM.json
docs/evidence/work-units/WU-CGW-C2C-001B.md
```

indexは出自・契約の定数や型をexportする最小入口。Bridge/MCP/OAuth/Tunnel/runtime/CLIをimportせず、importでlisten/spawn/fetch/state変更を起こさない。ダミーreview成功や統合済みを返すAPIは作らない。

import-boundary testでは出自と無副作用を確認する。FS/process/network操作を観測できるfixtureを用い、mockの限界もEvidenceへ記録する。これは将来のC2C全toolのread-only保証とは別。本体BunからNode packageを直接importしない。

## Required Verification

実在するscriptsを確認して以下を実行する。Node >=20はsourceの宣言であり全Node版の動作保証ではない。使用Node/pnpmと依存engine条件の整合を確認する。version/network不足で失敗した場合、lockを勝手に再生成したりengine条件を無視したりしない。

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

sourceのNode runtime testsは骨格に未移植なので適用外。適用外はPASSに加算しない。実行不能でも固定source取得・設定・test作成・静的確認・GitHub反映は継続できるが、Required Verificationが未完了ならTaskをDoneにしない。

EvidenceにRepository/Task/Run/Iteration/attempt、開始/終了commit、Candidate Commit、candidate tree/tested tree、cwd、command、exit code、時刻、Node/pnpm/Bun、実際に選択したmodel/effort、差分、未実行と理由を記録する。Required VerificationをAcceptanceへ使う場合はtested treeが対象Candidateのtreeと一致することを確認する。Evidenceを保存した後続HEADを過去のtest対象へ書き換えない。

## Independent review / WU-C: checkpoint — 3ファイル

A/Bごとにworkへcommit/pushし、GitHubから実ファイルとcommitをreadbackする。main/source/root Bun/Launcher/既存Credential/Tunnel/OS serviceが無変更であることも確認する。

AstraがGitHub実差分と実行証跡を独立確認する。C2C未完成のため、この工程レビューをlive C2C受入とは呼ばない。Findingは次の有限Fix Packetへ変換し、そのIteration開始時にユーザーが選択したCodex implementerが修正する。

その後のWU-Cでは次の3文書だけを更新する。

```text
docs/project/TASKS.md
docs/project/NEXT_WORK.md
docs/project/AI_WORK_STATE.md
```

AC-C2C-001〜003 / V-C2C-001と工程レビューを満たした場合だけCGW-C2C-001をDoneへ進める。未実行・失敗は明記し、C2C機能受入・live接続・manual Development Loopは別Taskのまま残す。

## Exit / recovery

出自・固定依存・pnpm build policy・NodeNext・MITを保った独立packageとtestがあり、importが無副作用で、本体へ無関係な差分がないことを確認する。

Bridge公開、実Workspace読取、Pairing、service install、C2C Review、auto loop、新Launcher UIはこのPacket外。失敗は該当WUへ限定し、SHA競合は最新SHAの再取得・再適用、書込失敗は少数ファイルへ分割する。終了時には完了commit、実行結果、未実行、次WUを短く報告する。
