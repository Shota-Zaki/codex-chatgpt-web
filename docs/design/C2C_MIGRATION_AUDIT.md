# C2C migration audit

調査日: 2026-09-25。統合先は `Shota-Zaki/codex-chatgpt-web/work`。移植判断の静的監査であり、製品統合・live受入・Security同等性の証明ではない。

## 1. 固定した調査基準

| Repository | main | work at audit start |
| --- | --- | --- |
| codex-chatgpt-web | 293341084ac7a1ddd2de12fede3706023f5b6474 | af6af7f5ba32700ebb030b2288934495710a19de |
| codex-with-chatgpt | 9663b88753e35c76796c5bce000293e0bd22cd9e | 89af4fa34952fe58e017b095ae2f793420cf05b0 |

GitHub compareで、本体の開始時workはmainより9 commits ahead / 0 behind。差分はProject文書9ファイルだけで、製品コードは同一。root/Launcherのpackage.jsonは6.1.0。C2C workはmainより88 commits ahead / 0 behindで、package.jsonは0.1.3。

以後sourceは `Shota-Zaki/codex-with-chatgpt@89af4fa34952fe58e017b095ae2f793420cf05b0` を意味する。sourceを変更せず固定点から必要な実装を移植する。mainも変更しない。

本体はBun 1.4.0 / Zod 4.4.3。sourceの宣言はNode >=20 / pnpm 11.24.0、lockfileの直接依存解決はMCP SDK 1.30.0 / Zod 3.25.76。SDK specifierはlatestだが、移植時はlockfileを固定し、latestの再解決で依存更新を混ぜない。現在の推奨最新版や全Node版での動作保証を示す値ではない。依存の安全性監査は別途必要。

## 2. Coverage / 限界

全機能群をM01〜M24へ分類した。本文確認済みの主要sourceは以下。

- `src/mcp/{server,http}.ts`
- `src/workspace/{manager,ignore,search,git}.ts`
- `src/execution/{records,output,sanitize}.ts`
- `src/auth/{oauth,store,middleware,html}.ts`, `src/pairing/manager.ts`
- `src/bridge/{server,runtime}.ts`, `src/process/daemon.ts`
- `src/session/state.ts`, `src/config/{sandbox-allow,paths,endpoint,ui-prefs}.ts`, `src/logger/index.ts`
- `src/cli/index.ts`全文、`bin/c2c.js`
- `src/tunnel/cloudflared-named.ts`
- `runtime/{bootstrap,privacy,service-common,macos-supervisor,service-worker}.mjs`
- sourceのarchitecture/security/protocol文書、両package.json、source lockfileの直接依存部分、tsconfig/vitest/LICENSE、source test tree、本体Project正本。

追加8ファイルの固定blobとCLI全文の取得範囲は [WU-CGW-AUD-002A](../evidence/audit/WU-CGW-AUD-002A.md) に記録した。この追加確認によりF01のsymlink評価、F02/F05のCLI診断、F06/F08のログ範囲を精密化した。

**未精査:** 残りTunnel補助/provision、serviceインストール入口、Skill全文、全test本文、全推移的依存と配布物、既存本体のadapter接合点の詳細。`CGW-AUD-002`と後段の配布物/parity Taskで確認する。全ソース全行の完全監査は未完了。未精査ファイルの移植前に固定SHAから本文を取得して確認する。

Vitest、Node runtime tests、Bun tests、typecheck、build、Mac実機試験は今回未実行。既存testにはtree上の存在しか確認していないものがある。存在確認をPASSへ変換しない。

## 3. A/B/C/D/E移植分類

A=そのまま移植候補、B=adapter経由再利用、C=本体既存機能と統合、D=統合版では採用しない部分、E=独立Node Runtimeとして維持。Aもtest/license/出自確認を免除しない。Dはsourceの削除ではない。

| ID | 機能 / source | 分類 | 判断 | 必須確認 |
| --- | --- | --- | --- | --- |
| M01 | 9つのread-only MCP、src/mcp | E | packages/c2c-review。本体MCPとは別server/endpoint/auth | 厳密tools allowlist、無認証/不足scope/未知tool拒否 |
| M02 | Workspace境界、manager.ts | B | WorkspacePolicy + RepositoryView。親Workspaceと選択Repoの両境界 | realpath、symlink、metadata、同名/大小文字、競合 |
| M03 | .c2cignoreと共通Secret規則 | A | 上位denyと規則を保持。Repo viewでも親規則を継承 | negation、symlink、64KiB超、読取失敗、更新競合 |
| M04 | file read/list/search | B | 全経路を同じPolicyへ。rg/Nodeの差を明示 | 巨大行、ページング、timeout、不完全結果 |
| M05 | Git status/diff | B | 選択Repo rootを検証。既存mode維持とcommit range追加 | rename両側Secret、literal pathspec、external diff/textconv拒否、失敗判定 |
| M06 | test_status / execution_summary | B | Hostが記録、C2Cは読取。Repo/Task/run/commitへ束縛 | stale/cross-repo/未実施/欠落/改変の拒否 |
| M07 | execution_output / sanitize | B | 本文・metadata・読取時gate。証跡保存を分離 | private key、redaction、欠落body、上限、並行append |
| M08 | OAuth / bearer | E | C2C専用issuer/resource/state。本体認証へ合体しない | PKCE、client/redirect/resource/scope、refresh/revoke |
| M09 | Pairing | A | 単回使用・期限・試行上限を保持 | 再利用拒否、rate limit、bounded state |
| M10 | Bridge / Admin API | E | loopback管理面。公開MCPへ管理権限を渡さない | admin token、proxy拒否、health最小化、port衝突 |
| M11 | Node fetch制限 | E | Node起動入口で適用。Bun global fetchへ適用しない | health以外拒否、header除去、redirect拒否、全入口 |
| M12 | Named/Quick Tunnel | E | 当初は本体Tunnelと別管理。Mac常駐はNamed、Quickは明示互換用途 | env、二重起動、復旧、protocol、hostname |
| M13 | Tunnel/DNS/認証のprovision | E | 通常起動から分離したHost管理操作 | 明示承認、既存credential保全、自動実行しない |
| M14 | Node daemon / runtime identity | E | private namespaceと所有者を検証してattach/start/stop | unknown PID/別Workspaceをkillしない、deadline、競合 |
| M15 | Mac supervisor / worker | E | 監視とworker分離。製品名/保存先はBの設定adapter | UUID、drive脱落/復帰、lock、backoff、全ログ上限、24h |
| M16 | paths/logger/prefs/endpoint | B | auth/証跡/判定を分離。既存i18nへ表示を寄せる | 0700/0600、symlink、Secret、locale、診断の副作用 |
| M17 | session/checkpoint | B | 既存checkpointとrun/Repo/revisionの関連付け | task切替、再送dedupe、再起動時二重実行拒否 |
| M18 | Control protocol / Skill | C | 本体会話adapter。Control Messageは小さく、実データはC2C | Repo dataを実行指示としない、権限と契約を優先 |
| M19 | Codex実行/browser/model | C | 本体Runtimeを利用。Luna-highは実行設定でID推測固定しない | 実model/effort、silent fallback非隠蔽 |
| M20 | Launcher表示/操作 | C | 手動循環受入後に既存Launcherへ局所追加 | 全locale、token非露出、所有者一意 |
| M21 | 旧standalone UI/言語設定の重複 | D | 日本語専用UI treeや本体設定画面の重複を作らない | 他locale・本体機能維持 |
| M22 | 状態領域全体のsandbox許可 | D | 原実装のまま使わず、Host証跡inboxだけ限定共有 | Codexからauth/runtime/判定へ書き込めない |
| M23 | 旧常駐設定/自動起動のそのままコピー | D | 旧serviceを乗っ取らず、承認済み製品設定へ置換 | 既存service/credential/DNS保全 |
| M24 | source/test fixtures/license/lock | A | 出自manifestとMIT通知、対応fixtureを小分け移植 | blob SHA、local patch、生成物除外、依存/配布監査 |

CLI全体はReviewer向けAPIではない。診断/状態読取はB、setup/pair/unpair/tunnel等の管理操作はE側の明示操作へ分離する。既存CLIを無条件に公開する形の統合はしない。

## 4. Findings / 移植ゲート

P0/P1は統合着手・受入上の優先度。実環境で悪用を実証したCVSS評価ではない。

### F01 / P0: metadataがWorkspace Policyを通らない

Workspace constructorの.c2c.json、detectProjectのpackage.jsonはrootにjoinしたpathを直接readJsonIfExistsへ渡し、通常readFileのignore/Secret Policyを通らない。ignore指定したpackageのname/scripts等がworkspace_infoへ出ないことをfixtureで確認する。

追加監査でreadJsonIfExists自身に通常ファイル判定とleaf symlink拒否を確認した。通常の外向きleaf symlinkをそのまま読めるとは断定しない。この既存防御を保持し、同時差替えは別途検証する。実機での流出再現は未実施。

### F02 / P0: Codexへのprivate state全体の書込許可

ensureSandboxAllowlistはgetStateDir全体をCodex writable_rootsへ追加する。auth/runtime/executionが同じroot配下にあるため、統合版でそのまま採用すると実装側とreview管理側の境界を崩す。限定inboxとC2C private stateを分離する。

setupと既定doctorにもこのhelperの呼出がある。またdoctor --no-fixでもhealthy endpointをpersistWorkspaceEndpointへ渡す分岐があり、診断の無副作用保証には使えない。診断と保存/修復/Pairingを分離する。

### F03 / P0: execution metadataと読取時の保護

records.tsのtests/notes/changedFiles/exitStatusはschema validationだけで保存されMCPへ返る。output.tsは保存時に本文をsanitizeするが読取時には再検査せず、欠落bodyを空文字okにする。metadata Secret除去、読取gate、欠落/改変/並行更新検知が必要。保存済みログを無条件に信頼しない。

### F04 / P0: 複数Repoとcommit後レビューの契約不足

sourceの9 toolにrepository引数はなく、gitはworkspace.root、記録はworkspace.id単位。Mac文書のrepos集合rootは通常そのものがGit repoではない。git_diffのheadは作業ツリー対HEADであり、commit済みbase→headではない。RepositoryViewと明示commit rangeを追加する。空diffを受入済みと推測しない。

### F05 / P1: 不完全な結果・診断の成功判定

rgはclose時の終了理由を検査せず結果を返し、行handlerはignore判定例外もcatchする。Git失敗の一部はisRepo:false/空結果になる。error/timeout/incomplete/fallbackを明示し、問題なしへ変換しない。

doctor --jsonはreport出力後にreturnし、後段の失敗時exitCode設定へ進まない。未認証MCPの401だけでOAuth機能を受入済みにはできず、healthのHTTP成功だけでは正しいWorkspace/artifactも証明できない。Hostは個別report・identity・実toolとauth試験を確認する。

### F06 / P1: 読取上限と同時変更

readFileは最初の取得行がmaxBytesを超えても収集でき、総行数取得のため全体を読む。resolve/stat/binary probe/streamは別操作で、同時差替え時の保証は未検証。巨大行、symlink差替え、UTF-8ページ境界、検索timeoutのfixtureが必要。

CLI logsはログ全文を読んでから行数を切り出す。共通logger自体にrotationはなく、Mac service.logだけのrotationで全ログの長期運用を保証しない。ログ保存・表示の上限も対象とする。

### F07 / P1: OAuthの厳密化

filterScopesは未知scopeだけの要求でも全supported scopesへ戻す。resourceはauthorization codeに記録されるが、確認したtoken発行経路では照合されない。省略と不正値を分け、issuer/resource/client/redirect/Workspace/scopeを束縛する。PKCE、失効、再認証、metadata/Host/proxy処理を公開前に試験する。既存HTML escape/CSP/no-store等の防御は保持する。

### F08 / P1: service所有権と配布境界

Mac runtimeDir/label/volumeは旧製品・現ホスト向け固定値を持つ。Launcherとlaunchdが同じC2Cを二重所有しない契約とprivate namespaceが必要。旧sourceサービスを自動停止・移行しない。配布物へのNode/C2C/runtime/licenseの実同梱とclean起動も確認する。

正式binと未build時のtsx起動の双方でbootstrapを通す既存実装は追加確認済み。ただしNode entryの取得確認は配布物の実行成功を意味しない。

### F09 / P1: live未受入 / source契約との不一致

今回のproject connector workspace_infoは `ConnectorClientError 400: We couldn't connect your account. Please try again.` で失敗。以前の内部エラーと同じ原因とは断定しない。利用可能tool schemaのRepository対応と固定sourceの非対応にも差があるが、稼働artifact/commitは未確認。

別Workspaceや認証変更で迂回せず、CGW-ENV-001をDeferredとする。設計、残り監査、local実装準備、GitHub反映は継続する。旧source connectorの復旧だけを統合製品のlive受入としない。

## 5. 再利用と追加検証

既存test候補はworkspace、workspace-privacy、search、git、mcp-integration、oauth、pairing、execution-output、record-cli、runtime、tunnel、session、tests/runtime/*.node.mjs。既存fixtureの再利用範囲を各WUで記録する。

追加fixtureはF01〜F09に紐付け、合成canaryを使う。実credentialやWorkspace外の個人ファイルで試す必要はない。Repo/snapshot/Task/runの一致、拒否時の読取・書込副作用、エラーを成功へ変換しないことを実動作で確認する。

readOnlyHintはtool metadataでありOS sandboxではない。child processも同一OS userの権限を自動的には減らさない。保証対象はReviewer経路からWorkspace write/任意shell/管理操作を公開しないこと。敵対的な実装processまで含むOS隔離は別の運用境界として評価し、未検証で保証しない。

## 6. 結論 / 次の工程

独立Node package + child processを採用し、Bun本体は小さいHost adapterで接続する。C2CはAIモデルではなく、別Reviewer contextが証拠を独立取得するread-onlyデータ面。

通信しない骨格のLuna Packetは作成済み。NEXT_WORKでは残りの完全監査を優先する。sourceの無条件コピー、既存private state流用、未受入の自動Doneは行わない。単体受入→手動Review/Fix/再Review→自動化/Launcherの順序を維持する。
