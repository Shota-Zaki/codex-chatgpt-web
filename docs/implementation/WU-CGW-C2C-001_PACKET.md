# Luna-high implementation Packet: WU-CGW-C2C-001

## Goal / 現在地

`Shota-Zaki/codex-chatgpt-web/work` に、C2Cを移植するための**通信しない独立Node package骨格**を作る。C2C本体・live review・開発ループは未統合。このPacketの完了はC2C統合完成ではない。

Task: `CGW-C2C-001`。標準実装担当: Codex Luna-high。Packetは作成済みだが、作成時点でLunaへの送信・実行は行っていない。

正本は `AGENTS.md`、`docs/project/TASKS.md`、`docs/design/{REQUIREMENTS,BASIC_DESIGN,DETAILED_DESIGN,C2C_MIGRATION_AUDIT}.md`。最新の監査残件はNEXT_WORKを優先する。

## 開始確認

監査開始時の本体work: `af6af7f5ba32700ebb030b2288934495710a19de`。main基準: `293341084ac7a1ddd2de12fede3706023f5b6474`。これらを現在HEADと推測せず、実装前にremote work/mainとローカルbranch/statusを再取得する。既存差分・並行作業を上書き/reset/force pushで消さない。

CGW-AUD-002の完全監査は未完了。骨格は未精査serviceをimportしない有限scopeとして準備しているが、Runtime移植・実Workspaceでの起動・外部公開へは該当監査とSecurity gateを満たしてから進む。

Lunaの実model ID/effortは利用可能なCodex設定で確認して記録する。表示名から未知IDを推測しない。別モデルの実行をLuna実行と報告しない。

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

Evidenceに開始/終了commit、tested tree/code anchor、cwd、command、exit code、時刻、Node/pnpm/Bun/model/effort、差分、未実行と理由を記録する。Evidenceを保存した後続HEADを過去のtest対象へ書き換えない。

## Independent review / WU-C: checkpoint — 3ファイル

A/Bごとにworkへcommit/pushし、GitHubから実ファイルとcommitをreadbackする。main/source/root Bun/Launcher/既存Credential/Tunnel/OS serviceが無変更であることも確認する。

AstraがGitHub実差分と実行証跡を独立確認する。C2C未完成のため、この工程レビューをlive C2C受入とは呼ばない。FindingはLunaが次の有限WUで修正する。

その後のWU-Cでは次の3文書だけを更新する。

```text
docs/project/TASKS.md
docs/project/NEXT_WORK.md
docs/project/AI_WORK_STATE.md
```

AC-C2C-001〜003 / V-C2C-001と工程レビューを満たした場合だけCGW-C2C-001をDoneへ進める。未実行・失敗は明記し、完全監査残件やlive受入は別Taskのまま残す。

## Exit / recovery

出自・固定依存・pnpm build policy・NodeNext・MITを保った独立packageとtestがあり、importが無副作用で、本体へ無関係な差分がないことを確認する。

Bridge公開、実Workspace読取、Pairing、service install、C2C Review、auto loop、新Launcher UIはこのPacket外。失敗は該当WUへ限定し、SHA競合は最新SHAの再取得・再適用、書込失敗は少数ファイルへ分割する。終了時には完了commit、実行結果、未実行、次WUを短く報告する。
