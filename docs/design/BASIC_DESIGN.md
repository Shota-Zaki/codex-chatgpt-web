# Basic Design

要求は[REQUIREMENTS](REQUIREMENTS.md)、移植判断は[C2C_MIGRATION_AUDIT](C2C_MIGRATION_AUDIT.md)。この文書は構成・責務・権限境界の正本。新規構成要素は未実装。

## 1. Components

```text
codex-chatgpt-web (existing Bun / browser / Codex Runtime)
  |
  +-- Codex implementation context (Luna-high, permitted writes)
  |
  +-- integrations/c2c/          Host adapters / evidence recorder
  |       |
  |       +-- packages/c2c-review/   separate Node child process
  |              read-only MCP / OAuth / private admin / privacy
  |              |
  |              +-- Workspace + RepositoryView (read)
  |              +-- validated execution evidence (read)
  |
  +-- integrations/development-loop/  later: state machine / delegation
  |
  +-- launcher/                 existing UI; later: small integration UI

Independent Reviewer context --OAuth--> C2C /mcp
Independent Reviewer --Finding metadata--> Host --new Packet--> Luna-high
```

| Component | Responsibility | Boundary |
| --- | --- | --- |
| Existing Web/Codex Runtime | upstream機能と実装実行 | 本体MCP/browser selectors/model contractsは保全 |
| C2C Node package | source由来のread-onlyデータ面と認証 | Bunへ直接importせず別process・別lockfile |
| RepositoryView adapter | 登録Repoを選び親WorkspaceとRepo両方の境界を維持 | 下位Repoで親ignoreを失わない |
| Evidence recorder | 実commandの出力/終了/対象revisionを捕捉 | 実装側からは限定inbox。auth/runtime/判定へ書込権限を渡さない |
| Host runtime adapter | 明示操作のstart/attach/status/stop | private管理tokenはHost内部。所有者不明processを変更しない |
| Reviewer context | source/diff/evidenceの独立判断 | Codexのwrite/shell/管理toolsを持たない |
| Development Loop | 検証済みFindingを次WUへ戻す | 手動循環受入後。C2C dataを実行命令としてevalしない |
| Launcher | 状態・操作・設定の表示 | 既存i18n/IPCを利用。追加UIは後段 |

C2Cを独立processとして統合することと、製品を別々に操作させることは同義ではない。1つのHostから管理しつつ、実装権限とReviewer権限を内部で分ける。

## 2. Data ownership

保存先は起動時にHostが検証し、Workspace外の製品private namespaceへ設定する。macOS候補は `~/Library/Application Support/codex-chatgpt-web/c2c-review`。旧source状態を自動移行・再利用しない。

| Store | Writer | Reader |
| --- | --- | --- |
| Repository source | 許可されたCodex Harness | Codex / C2C |
| Execution inbox | Hostの限定recorder | 検証・sanitizeを行うbroker |
| Sanitized evidence | trusted Host/broker | C2C read-only |
| Review decision/checkpoint | HostがReviewer結果を検証して記録 | Host / 必要な表示層 |
| C2C OAuth/admin/runtime state | C2C / private Host管理面 | C2C / 必要最小限のHost |

Codexのsandbox writable_rootsへC2C private root全体を追加するsource helperは採用しない。記録のhashは同一性・改変検出の材料であり、敵対的な同一OS userに対する実行の暗号学的証明ではない。

## 3. Integration sequence

**Gate A:** 固定sourceの主要経路・全機能分類・完全監査残件を記録し、要求/設計/Packetを用意する。

**Gate B:** 通信しないNode package骨格、provenance、lock、import無副作用test。ここではBridge/Tunnel/serviceを起動しない。

**Gate C:** 未精査sourceを閉じながら、小さいWUでWorkspace/Secret、Repo/Git、execution、auth/MCP、privacy/runtimeを移植・補強する。NodeとBunの型/依存を混ぜない。

**Gate D:** C2C単体受入。未受入APIの外部公開は行わない。local fixture試験は合成data・isolated temp stateで実施する。

**Gate E:** 手動Luna→C2C Review→Finding→Fix→再Reviewを実動作させる。接続不能ならこの受入だけ未完了。

**Gate F:** 自動Development LoopとLauncher追加UI、配布・Mac24h・upstream/source parityを完成させる。

## 4. Japanese-first

```text
saved language = null → App.tsx fallback ja → existing language stage
saved valid locale   → existing locale      → existing interaction stage
```

state.cjsのnullは保持する。初回表示の2行変更と回帰testだけを独立WUで扱う。他locale、native UI、limits UIの既存経路を利用する。

## 5. Runtime ownership / Mac

Desktop ownerまたはlaunchd ownerのどちらか1つがC2C lifecycleを所有する。Launcherが後から開いた場合は同じ製品namespace・Workspace・所有者が検証できたinstanceへattachする。旧codex-with-chatgptのinstanceは自動取得・停止しない。

Mac常駐はsourceのsupervisor→worker構造、Named Tunnel、UUID確認、drive脱落時停止、bounded backoff、lock、log rotationを保持する。製品パス・label・Node実行パスはadapterで設定する。service install/DNS/Pairing/credential操作は実装を追加することと実環境で実行することを分ける。

C2Cのheadless受入と既存Web RuntimeのGUI/認証状態を区別する。browserの認証切れ等は明示的なNeeds User状態へ落とし、偽の成功や無限再試行にしない。

## 6. Decisions

### D-001: Rendererの未選択fallbackを日本語化

維持。保存stateの既定値は変更しない。

### D-002: 外部C2C専用利用から製品内再利用へ変更

旧「このRepositoryにC2Cを追加しない」はsuperseded。重複rewriteを避け、source由来のNode package/child processを局所的に組み込む。

### D-003: package/認証/管理面の分離

採用。初期統合ではBunとNodeのlockfileを合体させず、既存本体MCPとC2Cのendpoint/scopesを共有しない。共通化は同等性を実証した後の別判断とする。

### D-004: manual-first

採用。自動loopと新Launcher UIは手動循環の受入後。日本語firstの既存画面修正は独立して先行可能。

### D-005: snapshotと証跡の明示束縛

採用。Repo/run/Task/commitを固定し、空結果・stale結果・自己申告でDoneにしない。Accept済みcode anchorと後続の文書checkpoint commitを区別する。

### D-006: 完全監査残件を隠さない

採用。構成を決めたことと全コード・依存・live Securityの受入は別。未精査codeの無条件copyやRuntime公開を避け、該当Taskで確認する。
