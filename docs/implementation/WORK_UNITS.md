# Work Unit catalogue

Task状態の正本は `docs/project/TASKS.md`。この文書は実装順序と有限scopeの分割表であり、実装済み一覧ではない。最初の詳細Packetは [WU-CGW-C2C-001_PACKET](WU-CGW-C2C-001_PACKET.md)。

## Scopeの数え方

製品・test・設定・UPSTREAM manifest・Evidenceを含め、1つの実装WUは原則10ファイル以内とする。Task.scopeのglobは複数WUの総範囲であり、glob全体を一括編集してよい意味ではない。各WU開始時にexact pathsをPacketへ確定し、10ファイルを超える場合はさらに分割する。

各WU後のTASKS/NEXT_WORK/AI_WORK_STATEの3文書更新は、別のcheckpoint WUへ切り離す。製品8ファイル＋Evidence1ファイル＋checkpoint3ファイルを「9ファイル」と数えない。

下表の `P` は `packages/c2c-review`。各実装WUは記載した製品/fixture群の中から最大8ファイル、必要な出自manifestとEvidenceを加えて合計10以下にする。未存在のpathは設計上の予定pathで、sourceと同名とは限らない。

## Audit / design

| WU | 親Task | 有限scope / 出口 |
| --- | --- | --- |
| WU-CGW-AUD-001 | CGW-AUD-001 | 固定HEAD比較、主要source経路とM01〜24/F01〜09を監査文書へ保存。動的受入と分離 |
| WU-CGW-AUD-002A | CGW-AUD-002 | sourceのbin/bootstrap/config/logger/CLIを5〜10ファイル単位で精査し、入口の権限・副作用とcoverageを記録 |
| WU-CGW-AUD-002B | CGW-AUD-002 | sourceの残りTunnel/provision/service/Skillを5〜10ファイル単位で精査。既存本体の実行・会話・MCP接続箇所も取得してadapter接合点を確定 |
| WU-CGW-AUD-002C | CGW-AUD-002 | sourceの全test本文とlock/dependency設定を5〜10ファイル単位で確認。実装→test対応と不足を記録。未実行はPASSにしない |
| WU-CGW-INTEGRATION-PLAN-001 | CGW-DES-001 | 要求/構成/詳細契約とPacketを小さい文書commitへ分けて更新。Task graph、参照、readbackを確認 |

監査WUのsource fileは読む対象でありsource Repositoryへ書き込まない。更新対象は統合先の監査/Evidence文書。C2C完全監査の残件を、設計文書のDoneで解消したことにしない。

## Package / core / policy

| WU | 親Task | 主対象 / 出口 |
| --- | --- | --- |
| WU-CGW-C2C-001A | CGW-C2C-001 | Packetのpackage/lock/tsconfig/vitest/LICENSE/UPSTREAM/index/import-boundary testとEvidence、合計9ファイル。通信しない骨格 |
| WU-CGW-C2C-001B | CGW-C2C-001 | TASKS/NEXT_WORK/AI_WORK_STATEの3ファイルだけ。実行証跡と工程レビューに基づき状態を更新 |
| WU-CGW-C2C-002A | CGW-C2C-002 | P/src/config/paths.ts、logger、workspace/ignore.tsと対応test、出自。private namespaceと上位denyを移植 |
| WU-CGW-C2C-002B | CGW-C2C-002 | P/src/workspace/manager.ts、metadata policy helper、workspace/privacy/race/limit fixture。F01/F06を補強 |
| WU-CGW-C2C-002C | CGW-C2C-002 | P/src/workspace/search.ts、search tests。rg/Node共通Policy、失敗/timeout/不完全結果の扱い |
| WU-CGW-C2C-003A | CGW-C2C-003 | Repository registry/viewとscope fixture。単一/複数/不明Repo、親Workspace境界の継承 |
| WU-CGW-C2C-003B | CGW-C2C-003 | Git/revision readerとgit/snapshot tests。commit range、固定source、rename Secret、cursor/stale、失敗 |

Pへ既存sourceを移植する際は、原文・blob SHA・局所patch・対応testを記録する。source未精査部分を先に丸ごとコピーしない。依存追加でpackage/lockも変える場合は、それもファイル上限へ算入する。

## Evidence / authentication / transport

| WU | 親Task | 主対象 / 出口 |
| --- | --- | --- |
| WU-CGW-C2C-004A | CGW-C2C-004 | P/src/execution/schema/recordsとfixture。manifest v2と旧record unbound、Repo/run/Task/commit束縛 |
| WU-CGW-C2C-004B | CGW-C2C-004 | execution/output/sanitize/storeとfixture。metadata/本文の読取gate、欠落/digest/並行更新/上限 |
| WU-CGW-C2C-004C | CGW-C2C-004 | integrations/c2c/evidenceのHost recorder/brokerとtest。限定inboxだけを実装側へ共有 |
| WU-CGW-C2C-005A | CGW-C2C-005 | P/src/auth、pairingとtestsをさらに8製品ファイル以下に分割。PKCE/scope/resource/client/refresh/revoke |
| WU-CGW-C2C-005B | CGW-C2C-005 | P/src/mcp/server.tsと契約/統合test。9 toolのみ、Repo/snapshot/evidence接続、未知tool拒否 |
| WU-CGW-C2C-005C | CGW-C2C-005 | P/src/mcp/http.ts、bridge/server.tsとHTTP/admin fixture。公開bearerとprivate管理面の分離 |
| WU-CGW-C2C-006A | CGW-C2C-006 | P/runtime/bootstrap/privacy、bin入口、最小CLI入口とruntime fixture。全起動経路の送信制限 |
| WU-CGW-C2C-006B | CGW-C2C-006 | P/src/tunnelの必要moduleとfixtureを8製品ファイル以下に分割。Named/Quick互換、env allowlist、明示provision |
| WU-CGW-C2C-006C | CGW-C2C-006 | Pのruntime identityとintegrations/c2c/runtimeのlifecycle、test。所有者/port/namespace/停止安全性 |

005/006の複数ファイル群は全体を1commitに詰め込まない。importsの依存順を確認し、途中状態の未実行・未完成を正確に記録する。fixtureの合成data/隔離state/loopback試験と、実Workspaceや外部公開の開始は分離する。

## Acceptance before automation

| WU | 親Task | 出口 |
| --- | --- | --- |
| WU-CGW-C2C-007A | CGW-C2C-007 | 9 toolの正常系、Repo/commit/実行証跡scope、test/typecheck/buildの実行結果 |
| WU-CGW-C2C-007B | CGW-C2C-007 | Secret/escape/auth/read-only副作用/欠落・古い証跡の拒否。全Required Verificationのreadback |
| WU-CGW-ENV-001 | CGW-ENV-001 | 正しい統合製品・artifact・Workspaceのlive接続。単に旧connectorが接続できたことを統合受入としない |
| WU-CGW-LOOP-001 | CGW-LOOP-001 | 実Luna実装→独立C2C読取→Finding→修正commit→再Review。合成fixture利用時はその範囲を明示 |

C2C live接続が失敗した場合はENV/manual受入のみ保留し、独立Readyの監査・日本語化・local検証を続ける。自動ループや新Launcher UIへ先回りしてGateを省略しない。

## After manual acceptance

| WU | 親Task | 主対象 / 出口 |
| --- | --- | --- |
| WU-CGW-LOOP-002A | CGW-LOOP-002 | integrations/development-loopのstate machineとtest。wire stateとlocal checkpoint、Task/run/Repo |
| WU-CGW-LOOP-002B | CGW-LOOP-002 | review dispatch/Result validation/次Packet生成とtest。実装contextとReviewer contextの分離 |
| WU-CGW-LOOP-002C | CGW-LOOP-002 | journal/resume/dedupe/cancel/deadlineと障害fixture。重複実行・stale承認の拒否 |
| WU-CGW-LAUNCHER-001A | CGW-LAUNCHER-001 | 既存IPCを介した状態/Evidence/Finding表示とtest |
| WU-CGW-LAUNCHER-001B | CGW-LAUNCHER-001 | 有限の開始/停止/再開/確認操作とtest。private token非露出、所有者排他 |
| WU-CGW-LAUNCHER-001C | CGW-LAUNCHER-001 | 既存i18n全localeへ表示文言を追加しlocalization/renderer回帰 |
| WU-CGW-PKG-001A | CGW-PKG-001 | runtime bundleとNode/C2C同梱・license/provenance。root/launcher既存buildへの小さい接合 |
| WU-CGW-PKG-001B | CGW-PKG-001 | built artifactのclean起動/欠落/境界smoke。Release/Deployは実行しない |
| WU-CGW-MAC-001A | CGW-MAC-001 | supervisor/worker、設定adapter、fixture。旧serviceと衝突しない所有者/namespace |
| WU-CGW-MAC-001B | CGW-MAC-001 | 明示承認されたMac環境の24h観測、volume/再起動/認証/GUI依存をEvidenceへ記録 |
| WU-CGW-PARITY-001 | CGW-PARITY-001 | M01〜24/F01〜09の機能・Security対応表と実行証拠、依存/配布物確認 |
| WU-CGW-UP-001 | CGW-UP-001 | 固定upstream/baseとの差分、scratchでの追従検証、本体/Launcher主要mode回帰 |
| WU-CGW-FIN-001 | CGW-FIN-001 | 全受入をcode anchorと現在revisionに照合し最終判定。公開は別の明示指示 |

PKGはC2C runtime移植後に独立して着手できる。PKGの準備をauto loopや新Launcher UIの先行実装に利用しない。

## Independent Japanese WUs

`WU-CGW-JP-001` はApp.tsxの2つのnull fallback、renderer-wiring test、Evidenceを対象にする。checkpoint3文書は別WU。stateのlanguage:null、言語選択stage、他locale、machine IDを維持する。

`CGW-JP-002` は表示面ごとにexact pathsを決め、ユーザー向け英語の分類→既存i18n変更→locale回帰を5〜10ファイル以内で繰り返す。C2C移植と同じWUに混ぜない。

## Completion record

各WUは取得→変更→検証→work commit/push→GitHub readback→独立工程レビュー→checkpointの順に記録する。外部環境が使えない項目は未実行のまま残す。Accepted code anchorと後続Evidence commitを区別し、文書だけの更新を製品の実行成功として扱わない。
