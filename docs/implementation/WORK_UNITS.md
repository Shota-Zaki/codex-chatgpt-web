# Work Unit catalogue

Task状態は `docs/project/TASKS.md` が正本。この文書は有限scopeと順序を定義し、実装済み一覧ではない。最初の詳細Packetは [WU-CGW-C2C-001_PACKET](WU-CGW-C2C-001_PACKET.md)。

## Scope

製品・test・設定・出自manifest・Evidenceを合計し、1つのWUは原則10ファイル以内とする。Task.scopeのglobは複数WU全体の範囲であり、一括編集の許可ではない。各WU開始時にexact pathsを確定し、超過する場合は分割する。

TASKS/NEXT_WORK/AI_WORK_STATEの3文書更新は別checkpoint WUにする。製品8ファイル＋Evidence1＋checkpoint3を9ファイルと数えない。下表の `P` は `packages/c2c-review`。新規pathは予定であって実装済みではない。依存追加でpackage/lockを変える場合も上限に含める。

## Audit / design

| WU | 親Task | 有限scope / 出口 |
| --- | --- | --- |
| WU-CGW-AUD-001 | CGW-AUD-001 | 固定HEADと主要経路、全機能M01〜24/F01〜09の分類。動的受入と区別 |
| WU-CGW-AUD-002A | CGW-AUD-002 | bin/bootstrap/config/logger/CLI等8ファイル。取得範囲とFindingは同名Evidenceへ保存 |
| WU-CGW-AUD-002B1 | CGW-AUD-002 | 残りTunnel/provision/version等8ファイル。Named失敗・DNS確認・停止完了のゲート |
| WU-CGW-AUD-002B2 | CGW-AUD-002 | service入口/Skill/pnpm-workspace/.npmrc。固定設定、管理操作、依存build許可を確認 |
| WU-CGW-AUD-002B3 | CGW-AUD-002 | 本体bridge/CLI/Codex接合点、source PoC、package配布設定をexact pathsで精査 |
| WU-CGW-AUD-002C1〜 | CGW-AUD-002 | source全test本文とlock/推移的依存を5〜10ファイルずつ確認。coverageと不足を記録 |
| WU-CGW-INTEGRATION-PLAN-001 | CGW-DES-001 | 要求・構成・契約・Packet・Task graphを小さい文書commitへ分け、readback |

AUD-002A/B1/B2の静的確認記録は `docs/evidence/audit/` にある。残る範囲を確認するまでCGW-AUD-002は未完了。監査対象sourceは読むだけで、source Repositoryへ書き込まない。

## Initial package — 改訂後の分割

| WU | 親Task | exact scope / 出口 |
| --- | --- | --- |
| WU-CGW-C2C-001A | CGW-C2C-001 | package/lock/pnpm-workspace/tsconfig/vitest/LICENSE/UPSTREAMとEvidence、合計8ファイル。設定だけで起動しない |
| WU-CGW-C2C-001B | CGW-C2C-001 | index/import-boundary test/UPSTREAM更新/Evidence、合計4ファイル。無副作用と実行検証 |
| WU-CGW-C2C-001C | CGW-C2C-001 | TASKS/NEXT_WORK/AI_WORK_STATEの3文書のみ。独立工程レビューに基づくcheckpoint |

pnpm-workspace.yamlのesbuild限定allowBuildsもsourceの移植対象。.npmrcのcache配置はHost運用として非採用理由をmanifestへ記録する。Aだけではtest/build済みにならず、Bの検証とレビューが必要。

## Core / policy / evidence

| WU | 親Task | 主対象 / 出口 |
| --- | --- | --- |
| WU-CGW-C2C-002A | CGW-C2C-002 | P/src/config/paths.ts、logger、ignoreとfixture。private namespace、上位deny |
| WU-CGW-C2C-002B | CGW-C2C-002 | Workspace manager/metadata policyとfixture。F01/F06の境界・巨大入力・競合 |
| WU-CGW-C2C-002C | CGW-C2C-002 | searchとfixture。rg/Node共通Policy、失敗/timeout/incomplete |
| WU-CGW-C2C-003A | CGW-C2C-003 | Repository registry/viewとfixture。単一/複数/不明Repoと親境界 |
| WU-CGW-C2C-003B | CGW-C2C-003 | Git/revision readerとfixture。commit range、rename拒否、cursor/stale |
| WU-CGW-C2C-004A | CGW-C2C-004 | execution schema/recordsとfixture。manifest v2、旧unbound、scope束縛 |
| WU-CGW-C2C-004B | CGW-C2C-004 | output/sanitize/storeとfixture。metadata/read gate、欠落/digest/並行更新/上限 |
| WU-CGW-C2C-004C | CGW-C2C-004 | integrations/c2c/evidenceのrecorder/brokerとtest。限定inboxのみ共有 |

上記module群から、出自manifest/Evidenceを含め最大10ファイルになるexact pathsを選ぶ。未精査sourceを丸ごとコピーせず、元blobとlocal patchと対応fixtureを記録する。

## Auth / runtime

| WU | 親Task | 主対象 / 出口 |
| --- | --- | --- |
| WU-CGW-C2C-005A | CGW-C2C-005 | auth/pairingとtests。必要なら複数WUへ分割。PKCE/scope/resource/refresh/revoke |
| WU-CGW-C2C-005B | CGW-C2C-005 | MCP serverと契約tests。9 toolのみ、Repo/snapshot/evidence、未知tool拒否 |
| WU-CGW-C2C-005C | CGW-C2C-005 | MCP HTTP/Bridgeとtests。公開bearerとprivate Admin分離 |
| WU-CGW-C2C-006A | CGW-C2C-006 | bootstrap/privacy/bin/最小CLI入口とfixture。全入口の送信制限 |
| WU-CGW-C2C-006B | CGW-C2C-006 | Tunnel moduleとfixtureを小分け。Named失敗時state保全、明示Quick切替、DNS readback、事前検証 |
| WU-CGW-C2C-006C | CGW-C2C-006 | runtime identity/Host lifecycleとtests。owner/port/namespace/停止完了 |

合成data・隔離state・loopbackの試験と、実Workspace起動/外部公開を区別する。通常診断と設定変更、Pairing、provisionを混在させない。

## Manual acceptance before automation

| WU | 親Task | 出口 |
| --- | --- | --- |
| WU-CGW-C2C-007A | CGW-C2C-007 | 全9 tool正常系、Repo/commit/証跡束縛、実test/typecheck/build |
| WU-CGW-C2C-007B | CGW-C2C-007 | Secret/escape/auth/read-only副作用/古い証跡拒否、全Required Verification |
| WU-CGW-ENV-001 | CGW-ENV-001 | 正しい統合製品・artifact・Workspaceへのlive接続。旧connector復旧と区別 |
| WU-CGW-LOOP-001 | CGW-LOOP-001 | 実Luna→独立C2C取得→実Finding→修正commit→再Review。fixture利用時は明示 |

live接続失敗はENV/manual受入へ限定し、独立Readyの監査・日本語化・local検証を続ける。自動ループや新Launcher UIで手動ゲートを省略しない。

## After manual acceptance

| WU | 親Task | 主対象 / 出口 |
| --- | --- | --- |
| WU-CGW-LOOP-002A | CGW-LOOP-002 | state machine/tests、wire stateとlocal checkpointの区別 |
| WU-CGW-LOOP-002B | CGW-LOOP-002 | review dispatch/Result検証/次Packet。実装とReviewer contextの分離 |
| WU-CGW-LOOP-002C | CGW-LOOP-002 | journal/resume/dedupe/cancel/deadline、障害fixture |
| WU-CGW-LAUNCHER-001A | CGW-LAUNCHER-001 | 既存IPC経由の状態/Evidence/Finding表示とtest |
| WU-CGW-LAUNCHER-001B | CGW-LAUNCHER-001 | 限定start/stop/resume/確認。token非露出とowner排他 |
| WU-CGW-LAUNCHER-001C | CGW-LAUNCHER-001 | 既存i18n全localeとrenderer/localization回帰 |
| WU-CGW-PKG-001A | CGW-PKG-001 | Node/C2C/runtime/通知のbundleと小さい既存build接合 |
| WU-CGW-PKG-001B | CGW-PKG-001 | built artifactのclean起動/欠落/境界smoke。Release/Deployなし |
| WU-CGW-MAC-001A | CGW-MAC-001 | supervisor/worker/設定adapter/fixture。旧serviceと非衝突 |
| WU-CGW-MAC-001B | CGW-MAC-001 | 承認済みMacで24h観測、volume/再起動/認証/GUI依存 |
| WU-CGW-PARITY-001 | CGW-PARITY-001 | M01〜24/F01〜09対応、機能・Security・依存・配布物の証拠 |
| WU-CGW-UP-001 | CGW-UP-001 | 固定base差分、scratch追従、本体/Launcher主要mode回帰 |
| WU-CGW-FIN-001 | CGW-FIN-001 | 全受入をcode anchor/現在revisionへ照合。公開とは別判定 |

PKGはC2C runtime移植後に独立着手できるが、auto loopや新UIを先行させる理由にしない。

## Independent Japanese WUs

WU-CGW-JP-001はApp.tsxの2つのnull fallback、renderer-wiring test、Evidence。checkpointは別WU。stateのlanguage:null、言語選択stage、他locale、machine IDは保持する。

CGW-JP-002は表示面ごとにexact pathsを決め、分類→既存i18n→回帰を5〜10ファイル以内で反復する。C2C移植と混ぜない。

## Record

取得→変更→検証→work commit/push→GitHub readback→独立工程レビュー→checkpointを記録する。未実行・失敗はそのまま残す。Accepted code anchorと後続Evidence commitを区別し、文書更新を製品の実行成功として扱わない。
