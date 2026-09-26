# Basic Design

要求は[REQUIREMENTS](REQUIREMENTS.md)、移植判断は[C2C_MIGRATION_AUDIT](C2C_MIGRATION_AUDIT.md)。この文書は構成・責務・権限境界・利用フローの正本。新規構成要素はまだ製品コードへ統合されていない。

## 1. Components

```text
User / ChatGPT Web / Astra
  design / plan / acceptance / implementation packet
                |
                v
codex-chatgpt-web Host
  |
  +-- Existing Web / Codex Runtime
  |      |
  |      +-- runtime model catalog
  |      +-- selected Codex implementer (write / shell / test / build / Git)
  |
  +-- integrations/c2c/
  |      +-- Host evidence recorder / broker
  |      +-- Host lifecycle adapter
  |              |
  |              v
  |         packages/c2c-review/
  |         separate Node process / separate lock
  |         read-only MCP / OAuth / private admin / privacy
  |              |
  |              +-- WorkspacePolicy + RepositoryView
  |              +-- Review Snapshot
  |              +-- validated Execution Evidence
  |
  +-- integrations/development-loop/
  |      later: state machine / retry / resume / dedupe / dispatch
  |
  +-- launcher/
         existing UI; later: minimal Loop/C2C/model-selection UI

Independent Reviewer context --OAuth--> C2C /mcp
Independent Reviewer --ReviewResult--> Host
Host --finite Fix Packet--> user-selected Codex implementer
```

| Component | Responsibility | Boundary |
| --- | --- | --- |
| Existing Web/Codex Runtime | upstream機能と実装実行 | 本体MCP/browser selectors/model contractsを保全 |
| Runtime model selector | 現在利用可能なCodex model/effortを提示してRunへ束縛 | 固定model enum/IDを製品仕様へ持たない |
| Codex implementer | 有限Packetの編集、shell、test、build、Git | 選択mode以上へ権限を自動昇格しない |
| C2C Node package | source由来のread-onlyデータ面と認証 | Bunへ直接importせず別process・別lockfile |
| RepositoryView adapter | 登録Repoを一意に選び親WorkspaceとRepo両境界を維持 | 下位Repoで親ignoreを失わない |
| Evidence recorder / broker | 実commandの開始/終了、出力、対象revisionを捕捉・検証 | 実装側からは限定inboxのみ。auth/runtime/判定へ書込権限を渡さない |
| Review Snapshot | Repository/Task/Run/Iteration/Base/Candidate/TestedTreeを固定 | snapshot外の古い証跡を現在Reviewへ混ぜない |
| Host runtime adapter | 明示操作のstatus/start/attach/stop | private管理tokenはHost内部。所有者不明processを変更しない |
| Reviewer context | source/diff/evidenceの独立判断 | Codexのwrite/shell/test実行/管理toolsを持たない |
| Development Loop | Findingを検証して次の有限WUへ戻す | 手動循環受入後。C2C dataを実行命令としてevalしない |
| Launcher | 状態・model選択・操作・Finding・Verification表示 | 既存i18n/IPCを利用。追加UIは後段 |

C2Cを独立processとして統合することと、製品を別々に操作させることは同義ではない。1つのHostから管理しつつ、実装権限とReviewer権限を内部で分離する。

## 2. Data ownership

保存先は起動時にHostが検証し、Workspace外の製品private namespaceへ設定する。macOS候補は `~/Library/Application Support/codex-chatgpt-web/c2c-review`。旧source状態を自動移行・再利用しない。

| Store | Writer | Reader |
| --- | --- | --- |
| Repository source | 許可されたCodex Harness / Git | Codex implementer / C2C |
| Execution inbox | Hostの限定recorder | 検証・sanitizeを行うbroker |
| Sanitized evidence | trusted Host/broker | C2C read-only |
| Review snapshot | Host | C2C / Host |
| Review decision/checkpoint | HostがReviewer結果を検証して記録 | Host / 必要な表示層 |
| C2C OAuth/admin/runtime state | C2C / private Host管理面 | C2C / 必要最小限のHost |
| Selected model/effort | Hostがユーザー選択をRunへ記録 | Implementer dispatcher / Evidence / UI |

Codexのsandbox `writable_roots` へC2C private root全体を追加するsource helperは採用しない。記録のhashは同一性・改変検出の材料であり、敵対的な同一OS userに対する実行の暗号学的証明ではない。

## 3. Integration sequence

**Gate A — Static audit / design:** 固定sourceの主要実装、全test本文、PoC、依存lock、Host接合点を分類し、Requirements / Basic / Detailed / Task graph / initial Packetを確定する。2026-09-26時点で固定sourceの静的監査は完了。動的Acceptanceは含めない。

**Gate B — Inert package:** 通信しないNode package骨格、provenance、frozen lock、import無副作用testを作る。Bridge/Tunnel/serviceは起動しない。

**Gate C — C2C migration:** 小さいWUでWorkspace/Secret、Repository/Git snapshot、Execution Evidence、OAuth/MCP、privacy/runtimeを移植・補強する。NodeとBunの型/依存を混ぜない。

**Gate D — C2C acceptance:** 合成Workspace・isolated state・loopbackでread-only/Secret/Repository/snapshot/auth/test/typecheck/buildを受入する。未受入APIを外部公開しない。

**Gate E — Live + manual Development Loop:** 正しい統合版C2C connectorを確認し、ユーザー選択Codex implementer → Verify → C2C Review → Finding → Fix → Verify → Re-reviewを1回以上成立させる。

**Gate F — Automation / Launcher:** manual Loop受入後にstate machine、resume/dedupe/cancel/retryとLauncher追加UIを実装する。

**Gate G — Distribution / operations / parity:** Node/C2C同梱、Mac 24h、source parity、upstream回帰を完了する。

日本語firstの2行fallback変更はC2C移植と独立して先行できる。

## 4. Implementer model selection

製品の役割は次で固定するが、modelは固定しない。

```text
Implementer        = Codex
Recommended model  = optional / non-authoritative
Recommended input  = Task complexity + recommended_capability
Selected model     = runtime catalogからuser choice
Selected effort    = runtimeが提示する対応値からuser choice
Reviewer           = independent context through C2C
```

Task正本は `complexity: low | medium | high` と、必要に応じて次の `recommended_capability` を持てる。

- `mechanical-edit`
- `routine-implementation`
- `deep-debug`
- `architecture-sensitive`

これらはmodel名への固定mappingではない。Launcher/Hostはその時点のCodex runtime catalogを読み、利用可能なmodel/effortだけを提示する。Luna/Terra/Sol/Astra等の名称やmodel IDを製品Architectureへ列挙固定しない。

Run開始後にmodelが消失・利用不能・capability不整合になった場合は `Blocked / MODEL_SELECTION_STALE` とし、ユーザーへ再選択を要求する。別modelへのsilent fallbackを行わない。

Finding修正iterationは直前のmodel選択を表示上保持してよいが、自動確定しない。ユーザーは同じmodelを再選択しても、別modelへ明示変更してもよい。各attemptの実model/effortはExecution Evidenceへ記録する。

## 5. Product usage flow

### 5.1 PLAN

1. ChatGPT Web / AstraがRepositoryを調査し、Task、Acceptance、Verification、有限Implementation Packetを作る。
2. HostはWorkspace内のRepository registryを取得する。
3. Repositoryが1つなら一意に決定できる。複数ならユーザーへ対象Repository選択を要求し、自動で最初のRepoを選ばない。
4. Git root、現在branch、Base Commitを固定する。

### 5.2 IMPLEMENT

5. Host/Launcherが現在利用可能なCodex model catalogとeffortを表示する。
6. ユーザーがimplementer model/effortを選択する。
7. Hostが `Task + Run + Iteration + Repository + Base Commit + Packet digest + selected model/effort` をcheckpointへ保存する。
8. Codex implementerが許可されたwrite/shell/test/build/Gitを使ってPacketを実施する。
9. Evidence recorderは自己申告ではなく実commandの `command/cwd/start/end/exit/output` とmodel/effortを記録する。

### 5.3 VERIFY / SNAPSHOT

10. 実装後にCandidate Commitを確定する。
11. Required Verificationを実行し、検証対象の `testedTreeId` を記録する。
12. 最終Acceptanceに使うRequired VerificationはCandidate CommitのGit treeと一致しなければならない。実行後にcodeが変わった場合はstaleとして再実行する。
13. Hostが `Repository / Task / Run / Iteration / Base Commit / Candidate Commit / Tested Tree` をReview Snapshotとして固定する。

### 5.4 C2C REVIEW

14. Independent ReviewerはC2C OAuthを通し、9つのread-only toolsだけでsnapshotを読む。
15. Reviewerはsource、base→candidate diff、Git status、test/build/typecheck Evidence、必要なsanitized outputを独立取得する。
16. Reviewerは `accepted | findings | blocked | error` のReviewResultを返す。Reviewer自身は修正しない。

### 5.5 FIX / RE-REVIEW

17. `findings` の場合、HostがFindingをそのままshellへ流さず、Task scope/Acceptanceに照らして有限Fix Packetへ変換する。
18. 次Iteration開始時にmodel/effortをユーザーが確認・選択する。
19. Fix → Verify → 新Candidate/新Snapshot → C2C Reviewを繰り返す。
20. 接続エラーやreview timeoutでは同じimplementation attemptを再実行しない。checkpointからReview側を再開する。

### 5.6 DONE

21. current snapshotに対する全Required Verificationが `passed`、blocking Findingなし、reviewが `accepted`、staleでない場合のみDoneにできる。
22. `not_run / failed / blocked / error` はDoneへ変換しない。
23. main merge / Release / DeployはこのDone判定とは別のユーザー承認事項。

最初はこの流れをCLI/既存操作で手動受入する。自動化とLauncher統合は同じ契約をUI/state machineへ載せる後段作業とする。

## 6. Japanese-first

```text
saved language = null → App.tsx fallback ja → existing language stage
saved valid locale   → existing locale      → existing interaction stage
```

`launcher/electron/state.cjs` の `language: null` は保持する。初回表示の2行変更と回帰testだけを独立WUで扱う。他locale、native UI、limits UIの既存経路を利用する。

## 7. Runtime ownership / Mac

Desktop ownerまたはlaunchd ownerのどちらか1つがC2C lifecycleを所有する。Launcherが後から開いた場合は同じ製品namespace・Workspace・所有者が検証できたinstanceへattachする。旧`codex-with-chatgpt`のinstanceは自動取得・停止しない。

Mac常駐はsourceのsupervisor→worker構造、Named Tunnel、UUID確認、drive脱落時停止、bounded backoff、lock、log rotationを保持する。製品パス・label・Node実行パスはadapterで設定する。service install/DNS/Pairing/credential操作は実装を追加することと実環境で実行することを分ける。

C2Cのheadless受入と既存Web RuntimeのGUI/認証状態を区別する。browserの認証切れ等は明示的なNeeds User / Blocked状態へ落とし、偽の成功や無限再試行にしない。

## 8. Decisions

### D-001: Rendererの未選択fallbackを日本語化

採用。保存stateの既定値は変更しない。

### D-002: 外部C2C専用利用から製品内再利用へ変更

採用。旧「このRepositoryにC2Cを追加しない」はsuperseded。重複rewriteを避け、source由来のNode package/child processを局所的に組み込む。

### D-003: package/認証/管理面の分離

採用。初期統合ではBunとNodeのlockfileを合体させず、既存本体MCPとC2Cのendpoint/scopesを共有しない。共通化は同等性を実証した後の別判断とする。

### D-004: manual-first

採用。自動loopと新Launcher UIは手動循環の受入後。日本語firstの既存画面修正は独立して先行可能。

### D-005: snapshotと証跡の明示束縛

採用。Repository/Run/Task/Iteration/Base/Candidate/TestedTreeを固定し、空結果・stale結果・自己申告でDoneにしない。Accepted code anchorと後続の文書checkpoint commitを区別する。

### D-006: C2C Reviewerを既存実装用MCPへ混ぜない

採用。本体 `src/adapters/chatgpt-web/mcp-server.ts` はCodex write/exec能力を橋渡しする実装面であり、read-only Reviewer面とは別process/endpoint/authを維持する。

### D-007: Implementer modelを固定しない

採用。Taskはcapabilityを推奨できるがmodel IDを正本へ固定しない。runtime catalog + user choiceをRun Evidenceへ束縛し、利用不能時はBlockedとする。

### D-008: 静的監査と動的Acceptanceを分離

採用。2026-09-26に固定sourceの静的監査を閉じたが、test/build/live connector/配布/Mac24h/Security parityは各Taskの実行Evidenceが必要。

## 9. Open Decision / Deferred

- **Deferred — Launcher UI layout:** 表示項目と操作契約は確定したが、具体的な画面配置はmanual Loop受入後に既存Launcher構造を再確認して決める。
- **Deferred — production lifecycle owner default:** Desktop owner / launchd ownerの排他契約は確定。Mac 24h運用でどちらを標準にするかは実装・実機受入時に決める。
- **Deferred — live connector acceptance:** 正しい統合artifact完成後にのみ再開する。現在の外部接続状態を設計完了の条件にしない。
- **No blocking Open Decision for first implementation packet:** Inert Node package scaffold開始に必要なArchitecture/Security/Acceptance境界は確定している。
