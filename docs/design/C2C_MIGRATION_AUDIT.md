# C2C migration audit

調査日: 2026-09-25。統合先は `Shota-Zaki/codex-chatgpt-web/work`。これは移植判断の静的監査であり、製品の統合完了・live受入・Security同等性の証明ではない。

## 1. 固定した調査基準

| Repository | main | work |
| --- | --- | --- |
| codex-chatgpt-web | 293341084ac7a1ddd2de12fede3706023f5b6474 | af6af7f5ba32700ebb030b2288934495710a19de |
| codex-with-chatgpt | 9663b88753e35c76796c5bce000293e0bd22cd9e | 89af4fa34952fe58e017b095ae2f793420cf05b0 |

GitHub compareで、本体workはmainより9 commits ahead / 0 behind。差分は既存のProject文書9ファイルだけで、製品コードは同一。package.jsonは6.1.0。C2C workはmainより88 commits ahead / 0 behindで、package.jsonは0.1.3。

以後、sourceという表記は `Shota-Zaki/codex-with-chatgpt@89af4fa34952fe58e017b095ae2f793420cf05b0` を意味する。sourceを変更せず、この固定点から統合先へ必要な実装を移植する。mainも変更しない。

本体はBun 1.4.0 / Zod 4.4.3。sourceはNode >=20 / pnpm 11.24.0で、lockfileの直接依存にはMCP SDK 1.30.0 / Zod 3.25.76がある。sourceのpackage.jsonにはSDKのspecifierがlatestと書かれているが、移植時はlockfileを固定し、latestの再解決で移植差分に依存更新を混ぜない。依存の安全性監査は別途必要。

## 2. 監査の範囲と限界

全機能群を以下の移植表へ分類した。コード本文を確認した主要経路は次のとおり。

- `src/mcp/server.ts`, `src/mcp/http.ts`
- `src/workspace/{manager,ignore,search,git}.ts`
- `src/execution/{records,output,sanitize}.ts`
- `src/auth/{oauth,store,middleware}.ts`, `src/pairing/manager.ts`
- `src/bridge/{server,runtime}.ts`, `src/process/daemon.ts`
- `src/session/state.ts`, `src/config/sandbox-allow.ts`
- `src/tunnel/cloudflared-named.ts`
- `runtime/{privacy,service-common,macos-supervisor,service-worker}.mjs`
- sourceのarchitecture/security/protocol文書、両package.json、source lockfileの直接依存部分、source test tree、本体Project正本。

未精査: CLI全分岐、残りのconfig/logger/Tunnel補助実装、bootstrap/bin/serviceインストール入口、Skill全文、全テスト本文、全推移的依存と配布物。これらは `CGW-AUD-002` で精査する。**全ソース全行の完全監査が完了したとは扱わない。** 未精査ファイルの移植前には当該内容を固定SHAから取得して確認する。

既存テストはtree上で存在を確認しただけのものを含む。Vitest、Node runtime tests、Bun tests、typecheck、build、Mac実機試験は今回未実行。存在確認をPASSへ変換しない。

## 3. 移植分類

A=そのまま移植候補、B=adapter経由再利用、C=本体既存機能と統合、D=統合版では採用しない部分、E=独立Node Runtimeとして維持。Aもテスト・ライセンス・出自確認を免除しない。Dはsourceの削除を意味しない。

| ID | 機能 / source | 分類 | 移植先・判断 | 必須確認 |
| --- | --- | --- | --- | --- |
| M01 | 9つのread-only MCP、`src/mcp/*` | E | `packages/c2c-review`。既存本体MCPとは別server/endpoint/auth context | tools/listの厳密allowlist、無認証/不足scope拒否、未知tool拒否 |
| M02 | Workspace境界、`workspace/manager.ts` | B | WorkspacePolicy + RepositoryView。親Workspaceと選択Repoの両境界を維持 | realpath、symlink、メタデータ読取、同名/大小文字、競合中の変更 |
| M03 | `.c2cignore`と共通Secret規則、`workspace/ignore.ts` | A | 規則と上位deny優先を維持。Repo viewでも親規則を継承 | negation、symlink、64KiB超、読取失敗、更新競合 |
| M04 | file read/list/search | B | 全経路を同一Policyへ統一。rg/Nodeの差を明示 | ページング、巨大行、検索失敗/timeout、規則エラー時の不完全結果 |
| M05 | Git status/diff、`workspace/git.ts` | B | 選択RepoのGit rootを検証。既存modeを維持しcommit rangeを追加 | rename両側Secret拒否、literal pathspec、no external diff/textconv、失敗を成功扱いしない |
| M06 | test_status / execution_summary | B | 実装Hostが記録、C2Cは読取。Repo/Task/run/commitに紐付け | stale/cross-repo/未実施/欠落/改ざん証跡を拒否 |
| M07 | execution_output / sanitize | B | 本文だけでなくmetadataと読取時も保護。証跡保存を分離 | private key拒否、redaction、欠落body、上限、並行append |
| M08 | OAuth + bearer、`src/auth/*` | E | C2C専用issuer/resource/stateを保持。本体認証と合体しない | PKCE、client/redirect/resource、scope、refresh rotation、revocation |
| M09 | Pairing、`pairing/manager.ts` | A | ワンタイム・期限・試行上限のアルゴリズムを再利用 | 再利用拒否、レート制限、bounded state |
| M10 | Bridge / Admin API、`src/bridge/*` | E | loopback専用管理面。公開MCPに管理権限を渡さない | admin token、proxy拒否、公開health最小化、port衝突 |
| M11 | Node fetch送信制限、`runtime/privacy.mjs` | E | Node起動入口で適用。本体Bunのglobal fetchへ適用しない | health以外拒否、header除去、redirect拒否、bootstrap経由の全起動 |
| M12 | Named/Quick Tunnel、`src/tunnel/*` | E | 本体Tunnelと当初別管理。Mac常駐はNamed、Quickは互換用途の明示操作 | env allowlist、二重起動、再起動、protocol、固定hostname |
| M13 | Tunnel作成/DNS/認証のprovisioning | E | 通常起動から切り離したHost管理操作として保持 | 明示承認、既存credential保全。自動実行しない |
| M14 | Node daemon / runtime identity | E | private namespaceと所有者を検証しattach/start/stop | unknown PID/別Workspaceをkillしない、deadline、再起動競合 |
| M15 | Mac supervisor / worker | E | 監視とworker分離を維持。製品名・保存先はBの設定adapterで注入 | UUID/drive脱落/再接続、lock、backoff、log rotation、24h試験 |
| M16 | state paths / logger / prefs | B | 認証、実行証跡、レビュー判定の保存先を分離。表示は既存i18nへ | 0700/0600、symlink、秘密を含むmetadata、locale維持 |
| M17 | session/checkpoint、`src/session/state.ts` | B | 既存checkpointを保持しrun/repo/revisionを関連付ける | task切替、再送dedupe、再起動後に実装を重複実行しない |
| M18 | INIT/PLAN/EXECUTED/REVIEW protocol、Skill | C | 小さいControl Messageを本体の会話連携adapterへ。実データはC2C | Project dataは指示ではない。固定契約・権限が常に優先 |
| M19 | Codex実行、browser/model選択 | C | 本体の既存Runtimeを使用。Luna-highは実行設定、仕様へmodel IDを固定しない | 選択モデル/effortの実測、silent fallbackを隠さない |
| M20 | Launcher表示/操作 | C | 既存Launcherへ局所追加。手動循環受入後に着手 | i18n全locale、private tokenをRendererへ返さない、起動所有者一意 |
| M21 | 旧standalone UI/言語設定の重複導線 | D | 日本語専用UI treeや別の本体設定画面を増やさない | 本体の他locale・既存機能を削除しない |
| M22 | `ensureSandboxAllowlist`の状態領域丸ごと許可 | D | 原実装のまま採用しない。Hostの証跡inboxだけ書込許可する | CodexからC2C auth/runtime/review判定へ書き込めない |
| M23 | 旧製品の常駐設定・自動起動のそのままコピー | D | 旧サービス乗っ取りを避け、承認済み製品設定に置換 | 既存サービス・credential・DNSを変更しない |
| M24 | ソース・test fixtures・license/依存lock | A | 出自manifestとMIT通知を保持。対応fixtureを小分け移植 | ファイル別blob SHA、local patch、生成物除外、依存/配布物監査 |

## 4. 静的Findingと移植ゲート

優先度は統合着手・受入上の優先度であり、実環境で悪用を実証したCVSS評価ではない。

### F01 / P0: metadataが通常の読取境界を通らない

`Workspace` constructorの`.c2c.json`、`detectProject()`の`package.json`はrootにjoinしたパスを直接readJsonIfExistsへ渡す。通常readFileのresolve/Secret規則を通らない。ignore指定したpackageや外向きsymlinkを使うfixtureで、workspace_infoからname/scripts等が流出しないことを追加検証する。実機での再現は未実施。

### F02 / P0: Codexへの状態領域全体の書込許可

`src/config/sandbox-allow.ts::ensureSandboxAllowlist`はgetStateDir全体をCodexのwritable_rootsへ追加する。同じsourceのauth/runtime/execution保存先がこの配下にあるため、統合版でそのまま採用すると実装側とreview管理側の境界を崩す。実行Host所有の限定inboxとC2C private stateを分離する。

### F03 / P0: execution metadataと保存後の本文

`records.ts`のtests/notes/changedFiles/exitStatusはschema validationだけで保存され、MCPへ返る。output.tsは保存時に本文をsanitizeするが、読取時は再検査せず、欠落bodyを空文字としてokにする。自由形式metadataの秘密除去、読取時gate、欠落/改変/並行更新検知が必要。保存済みログを無条件に信頼しない。

### F04 / P0: 複数Repositoryとcommit後レビューの契約不足

sourceの9 toolにはrepository引数がなく、gitはworkspace.root、実行記録はworkspace.id単位。Mac文書のrepos集合rootは通常そのものがGit repoではない。git_diffのheadは作業ツリー対HEADで、commit済みbase→headではない。RepositoryViewと明示commit rangeを追加する。空diffを変更なし・受入済みと推測しない。

### F05 / P1: 不完全な検索・Git結果が明示されない

rg検索はclose時の終了理由を検査せず結果を返し、行handler内ではignore判定例外もcatchされる。Git失敗の一部はisRepo:false/空結果となる。呼出側はこれらを成功・問題なしへ変換しない。error code、timeout、不完全結果、fallback条件を明示する。

### F06 / P1: 読取資源上限と同時変更

readFileは最初の取得行がmaxBytesを超えても収集でき、総行数のため全体を読み続ける。resolve/stat/binary probe/streamが別操作のため同時差替え時の境界保証も別途検証が必要。巨大単一行、symlink差替え、UTF-8ページ境界、検索timeoutのfixtureを用意する。実証済みexploitとは記録しない。

### F07 / P1: OAuthの厳密化

filterScopesは未知scopeだけの要求でも全supported scopesへ戻す。resourceはauthorization codeに記録されるが、確認したtoken発行経路では照合されない。空省略と不正値を分離し、C2C issuer/resource/client/redirectと有効scopeを束縛する。公開前にPKCE、失効、再認証、metadata/Host/proxy処理をまとめて試験する。

### F08 / P1: service所有権と配布境界

sourceのMac runtimeDir/label/volumeは旧製品・現ホスト向け固定値を持つ。Launcher supervisorとlaunchdが同時にC2Cを所有しない契約が必要。Node/C2Cのstateは別namespace、既存sourceサービスを勝手に停止・移行しない。配布物にC2C runtime/Node/通知が本当に含まれることも後段で検証する。

### F09 / P1: live接続とsource契約の不一致は未解決

今回のproject connector workspace_infoは `ConnectorClientError 400: We couldn't connect your account. Please try again.` で失敗。以前の内部エラーと同じ原因とは断定しない。利用可能tool schemaのRepository対応と固定sourceの非対応にも差があるが、稼働中artifact/commitは未確認。別Workspaceへの接続や認証の変更で無理に迂回しない。CGW-ENV-001だけDeferredとし、設計・local実装準備は継続する。

## 5. 再利用と追加検証

既存test候補: `workspace.test.ts`, `workspace-privacy.test.ts`, `search.test.ts`, `git.test.ts`, `mcp-integration.test.ts`, `oauth.test.ts`, `pairing.test.ts`, `execution-output.test.ts`, `record-cli.test.ts`, `runtime.test.ts`, `tunnel.test.ts`, `session.test.ts`, `tests/runtime/*.node.mjs`。既存fixtureの何を再利用したかを各WUへ記録する。

追加fixtureはF01〜F09に対応付ける。機密値には合成canaryだけを使う。実credentialや実Workspace外の個人ファイルを使う必要はない。拒否試験で書込・読取拒否を観測できること、snapshot/Repo/Taskが一致することを実動作で確認する。

readOnlyHintはtool metadataでありOS sandboxではない。child process分離も同一OS userの権限を自動的には減らさない。製品の保証対象はReviewer経路からWorkspace write/任意shell/管理操作を公開しないこと。敵対的な実装プロセスまで含むOS隔離は別の運用境界として評価し、未検証なら保証しない。

## 6. 結論

採用: 独立Node package + child process、Bun本体には小さいHost adapter、手動review循環先行。C2Cの独立Reviewerとは、C2CがAIそのものになる意味ではなく、別review contextがread-only C2C経由で証拠を独立取得する意味。

安全な最初のWUは通信しないpackage骨格とprovenance/lock/test。sourceの無条件丸ごとコピー、既存C2C状態領域の流用、未受入の自動Doneは行わない。完全監査残件、動的Security検証、Mac実機確認、live loopはTASKSで別々に追跡する。
