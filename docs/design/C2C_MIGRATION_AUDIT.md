# C2C migration audit

調査開始日: 2026-09-25、静的監査更新日: 2026-09-26。統合先は `Shota-Zaki/codex-chatgpt-web/work`。移植判断の静的監査であり、製品統合・live受入・Security同等性の証明ではない。固定source tree、全test本文、PoC、依存lock、主要Host接合点までの静的分類を完了した。動的なtest/typecheck/build/live/配布/24h受入は別Taskであり、この文書のDoneに含めない。

## 1. 固定基準

| Repository | main | work at audit start |
| --- | --- | --- |
| codex-chatgpt-web | 293341084ac7a1ddd2de12fede3706023f5b6474 | af6af7f5ba32700ebb030b2288934495710a19de |
| codex-with-chatgpt | 9663b88753e35c76796c5bce000293e0bd22cd9e | 89af4fa34952fe58e017b095ae2f793420cf05b0 |

GitHub compareで本体の開始時workはmainより9 ahead / 0 behind。差分はProject文書9ファイルだけで製品コードは同一、root/Launcher versionは6.1.0。C2Cは88 ahead / 0 behind、version 0.1.3。

以後sourceは `Shota-Zaki/codex-with-chatgpt@89af4fa34952fe58e017b095ae2f793420cf05b0`。sourceとmainは変更せず、固定点から必要な実装を移植する。

本体はBun 1.4.0 / Zod 4.4.3。sourceの宣言はNode >=20 / pnpm 11.24.0、lockの直接依存解決はMCP SDK 1.30.0 / Zod 3.25.76。SDK specifierのlatestを再解決せずfrozen lockを使う。これらは確認したsourceの値で、現在の推奨最新版や全Node版での動作保証ではない。

## 2. Coverage / 未完了範囲

本文を確認した主要source:

- src/mcp、workspace、execution、auth、pairing、bridge、process、sessionの各module。
- src/configのsandbox-allow/paths/endpoint/ui-prefs、logger、cli/index.ts全文、bin/c2c.js。
- src/tunnelのNamed/Quick、detect、hostname、named-provision、protocol、provider、state、およびsrc/version.ts。
- runtimeのbootstrap/privacy/service-common/macos-supervisor/service-worker、scripts/macos-service.mjs、skill/SKILL.md。
- package.json、lockfileの直接依存部分、pnpm-workspace.yaml、.npmrc、tsconfig/vitest/LICENSE、architecture/security/protocol文書。
- 本体のProject正本・package、tree/差分に加え、Runtime/Launcher/配布/MCP/model catalogの主要接合候補本文。

追加監査の固定blobと範囲:

- [AUD-002A](../evidence/audit/WU-CGW-AUD-002A.md): 起動入口・CLI・設定・logger等8ファイル。
- [AUD-002B1](../evidence/audit/WU-CGW-AUD-002B1.md): Tunnel補助・provision・version等8ファイル。
- [AUD-002B2](../evidence/audit/WU-CGW-AUD-002B2.md): service入口・Skill・pnpm設定4ファイル。
- [AUD-002B3](../evidence/audit/WU-CGW-AUD-002B3.md): PoC、frozen lock/推移的依存、Host Runtime/Launcher/MCP/model接合点。
- [AUD-002C1](../evidence/audit/WU-CGW-AUD-002C1.md): Workspace/Search/Git/Execution/MCP/OAuthの中核test 8ファイル。
- [AUD-002C2](../evidence/audit/WU-CGW-AUD-002C2.md): CLI/secure state/endpoint/logger/pairing/port/prefs/record test 8ファイル。
- [AUD-002C3](../evidence/audit/WU-CGW-AUD-002C3.md): runtime/privacy/service/sandbox/session/tunnel/Windows test 8ファイル。

**静的監査の残件:** この固定source commitについて、移植判断に必要な主要実装・全test本文・PoC・依存lock・Host接合点の分類は完了した。将来source commitを更新する場合は差分再監査が必要。

**別の動的受入:** Vitest/Node runtime tests/Bun tests/typecheck/build、公開OAuth/実MCP、配布物、Mac24h、runtimeでユーザーが選択したCodex implementerと独立Review循環。現時点では全て未実施。静的監査DoneをSecurity同等性や製品AcceptanceのPASSに読み替えない。

## 3. A/B/C/D/E分類

A=そのまま移植候補、B=adapter経由再利用、C=本体既存機能と統合、D=統合版では非採用、E=独立Node Runtime維持。Aでもtest/license/出自確認は必要。Dはsource削除を意味しない。

| ID | 機能 | 分類 | 移植判断 / 必須確認 |
| --- | --- | --- | --- |
| M01 | 9つのread-only MCP | E | packages/c2c-review、本体MCPとは別server/endpoint/auth。未知tool/不足scope拒否 |
| M02 | Workspace境界 | B | WorkspacePolicy + RepositoryView。親とRepo両境界、metadata/realpath/symlink/競合 |
| M03 | .c2cignore/Secret規則 | A | 上位denyを継承。negation/読取失敗/64KiB超/更新競合で保護を失わない |
| M04 | read/list/search | B | 全経路で同じPolicy。巨大行/ページング/timeout/incompleteを区別 |
| M05 | Git status/diff | B | Repo rootとcommit range。旧mode保持、rename両側拒否、固定argv、失敗判定 |
| M06 | test_status/execution_summary | B | Hostが記録、C2Cは読取。Repo/Task/run/commit束縛、古い/別Repo拒否 |
| M07 | execution_output/sanitize | B | 本文・metadata・読取時gate。欠落/改変/上限/並行append |
| M08 | OAuth/bearer | E | 専用issuer/resource/state。PKCE/client/redirect/scope/refresh/revoke |
| M09 | Pairing | A | 単回・期限・試行上限を保持。rate limitとbounded state |
| M10 | Bridge/Admin API | E | loopback private管理面。公開MCPとtoken/権限を分離 |
| M11 | Node fetch制限 | E | 全Node入口で初期化。Bunへ副作用なし。health限定、header除去、redirect拒否 |
| M12 | Named/Quick Tunnel | E | 当初別管理。Named常駐と明示Quick互換。env、所有者、終了完了 |
| M13 | Tunnel/DNS/認証provision | E | 明示Host操作。外部操作前preflight、DNS readback、Named失敗時state保全 |
| M14 | daemon/runtime identity | E | private namespace、owner、deadline。unknown PIDや別Workspaceをkillしない |
| M15 | Mac supervisor/worker | E | UUID/drive脱落・復帰/lock/backoff/log上限を保持。24h実機確認 |
| M16 | paths/logger/prefs/endpoint | B | auth/証跡/判定を分離。権限/symlink/Secret/locale、診断と変更を分離 |
| M17 | session/checkpoint | B | run/Repo/revisionと関連付け。task切替/再送/二重実行拒否 |
| M18 | Control protocol/Skill | C | 小さい制御メッセージと既存会話adapter。Repo dataを実行指示にしない |
| M19 | Codex/browser/model | C | 本体Runtime/catalogを再利用。ImplementerはCodex、model/effortはruntimeでユーザー選択。選択値をEvidenceへ記録し、未知ID推測やsilent fallbackなし |
| M20 | Launcher | C | 手動循環後に既存i18n/IPCへ局所追加。全locale/token非露出/owner一意 |
| M21 | 重複UI/日本語専用UI tree | D | 追加しない。他localeと本体機能を保持 |
| M22 | 状態領域全体のsandbox許可 | D | 原実装を採用せず限定inboxのみ共有。auth/runtime/判定へ書込不可 |
| M23 | 旧常駐設定のそのままコピー | D | 旧serviceを乗っ取らず製品設定adapterへ。既存credential/DNS保全 |
| M24 | source/fixture/license/lock/build policy | A | 出自blob/local patch/MIT/pnpm esbuild許可を保持。cache配置は別管理 |

sourceのCLI全体はReviewer APIではない。診断はB、setup/pair/unpair/tunnel等はE側の明示管理操作に分離する。

## 4. Findings / 移植ゲート

P0/P1は統合上の優先度であり、実環境で悪用を実証したCVSS評価ではない。

### F01 / P0 — metadataがWorkspace Policyを通らない

Workspaceの.c2c.json、project検出のpackage.jsonはreadJsonIfExistsへ直接渡され、通常readFileのignore/Secret Policyを通らない。ignoreしたpackageのname/scripts等がworkspace_infoへ出ないfixtureが必要。

helper自身のleaf symlink拒否は確認済み。通常の外向きleaf symlinkをそのまま読めるとは断定しない。この防御を保ち、同時差替えを別途検証する。流出の実機再現は未実施。

### F02 / P0 — private state全体のCodex書込許可

ensureSandboxAllowlistはgetStateDir全体をwritable_rootsへ追加する。同じroot内のauth/runtime/executionを統合版で丸ごと共有しない。限定inboxとprivate stateを分ける。

setupと既定doctorもこのhelperを呼ぶ。doctor --no-fixでもhealthy endpointを保存する分岐があるため、無副作用診断と保存/修復/Pairingを別操作へ分ける。

### F03 / P0 — execution metadataと読取gate

tests/notes/changedFiles/exitStatusはschema確認のみで保存・応答される。output本文は保存時sanitizeのみで読取時再検査がなく、欠落bodyを空文字okにする。metadataも含めSecret除去、読取gate、欠落/改変/並行更新検知を追加する。

### F04 / P0 — 複数Repoとcommit後レビュー

sourceの9 toolにはrepository引数がなく、Gitはworkspace.root、記録はworkspace.id単位。git_diffのheadは作業ツリー対HEADで、commit済みbase→headではない。RepositoryView、明示commit range、revision固定readを追加し、空diffを受入成功と推測しない。

### F05 / P1 — 不完全な結果・診断・provisionの成功判定

rgのclose理由や一部ignore例外、Git失敗が不完全/空結果になる経路がある。error/timeout/incomplete/fallbackを明示する。

doctor --jsonはreport出力後にreturnし、後段の失敗exitCodeへ進まない。401だけではOAuth機能、HTTP成功だけではWorkspace/artifactを証明できない。Quick provider内のservice/status本文確認は存在し、CLI診断と区別して維持する。

routeDnsはalready exists等だけで成功扱いし、createTunnelは出力中UUIDがあれば終了statusより先に結果を返す経路がある。統合版は要求したTunnel/DNS bindingをreadbackして確認する。

### F06 / P1 — 読取上限・競合・ログ

readFileの最初の巨大行、全行数取得、resolve/stat/probe/stream間の競合をfixtureで検証する。巨大入力・UTF-8境界・symlink差替え・timeoutの受入を追加する。

CLI logsは全体を読み込んでから行数を絞り、共通logger内にはrotationがない。Mac service.logだけでなく全ログの保存・表示にも上限を設ける。

### F07 / P1 — OAuthの厳密化

未知scopeのみでもsupported scopes全体へ戻る処理と、記録したresourceをtoken発行で照合しない経路がある。省略と不正値を分け、issuer/resource/client/redirect/Workspace/Repo/scopeを束縛する。PKCE/refresh/revoke/metadata/Host/proxyを検証する。既存HTML escape/CSP/no-storeは保全する。

### F08 / P1 — service所有権・provision失敗・配布

旧Macの固定path/label/volumeは製品adapterへ切り出し、Launcher/launchdのownerを一意にする。旧service/stateを自動移行・停止しない。Node/C2C/runtime/MITが配布物に含まれることをclean環境で確認する。

Named設定失敗はQuick stateへ上書きしok:true/fallback:trueを返すsource挙動がある。統合版は失敗時に既存Named stateを保全し、Quick切替を明示操作へ分ける。zone等の検証をlogin/create/DNSより前に行う。途中の残存資源を記録し、無断削除やCredential変更で復旧しない。

Quick stopのSIGTERM送信と終了完了は別。所有childの終了観測/deadline/再起動競合を検証する。正式binと未build時tsxはともにbootstrapを通すが、取得確認は実行成功の証明ではない。

### F09 / P1 — live未受入

project connector workspace_infoは `ConnectorClientError 400: We couldn't connect your account. Please try again.` で失敗した。以前の内部エラーと同じ原因とは断定しない。公開tool schemaのRepository対応と固定sourceの非対応にも差があり、稼働artifactは未確認。

CGW-ENV-001だけをDeferredとし、別Workspaceや認証変更で迂回せず、設計・監査・local準備・GitHub反映を継続する。旧connector復旧だけを統合製品のlive受入としない。

## 5. 検証と保証範囲

固定source commitのtest本文はC1/C2/C3で静的確認した。既存testはworkspace/privacy/search/git/MCP/OAuth/Pairing/execution/runtime/Tunnel/session等の防御を広く持つ一方、F01〜F09を統合製品として閉じるにはRepository選択、commit snapshot、Evidence v2、metadata共通Policy、厳密OAuth、失敗意味論、Host ownership等の追加fixtureが必要。追加fixtureは各Findingに結び付け、合成Secret canaryと一時Workspaceを使う。実credentialや個人ファイルを使わない。

readOnlyHintはmetadataでありOS sandboxではない。child processも同一OS userの権限を自動的には減らさない。保証対象はReviewer経路からWorkspace write/任意shell/管理操作を公開しないこと。敵対的な同一OS userまで隔離できるとは未検証で主張しない。

## 6. 採用構成と次工程

独立Node package/child processと小さいBun Host adapterを採用する。C2CはAIモデルではなく、別Reviewer contextが証拠を取得するread-onlyデータ面。

初回Implementation PacketはCodex実装担当向けに、設定8ファイル→inert entry/test等4ファイル→checkpoint文書の順へ分割する。特定modelへ固定せず、Taskには推奨capabilityだけを持たせ、実model/effortは実行時にユーザーが選択する。Packetの送信・製品コード実装はまだ行っていない。設計正本/Acceptance/Task graphの確定後、単体受入→手動Review/Fix/再Review→自動化/Launcherの順序を維持する。
