# Requirements

目的は[PROJECT_BRIEF](../project/PROJECT_BRIEF.md)、移植元の事実と未確認事項は[C2C_MIGRATION_AUDIT](C2C_MIGRATION_AUDIT.md)を参照。以下は完成時の要求であり、実装済み機能一覧ではない。

## 2026-09-29 Phase amendment: Skill-first

このPhaseでは新しい独自Node Runtime、C2C MCP、OAuth/Pairing、Tunnel、常駐daemon、実行管理server、Evidence broker、Launcher UIを実装しない。現在の対象は `.agents/skills/c2c/` の1入口Skillと、その参照資料、templates、Candidate-bound Evidence・Task/checkpointである。既存Codex Runtime/GitHub connectorを利用する。

旧 `FR-C2C-*` とRuntime専用の受入は撤回せずDeferred trackへ移す。`packages/c2c-review`、WU-CGW-C2C-001A/B、そのLICENSE/UPSTREAM/Evidenceを保持する。既存実装の成果、失敗、source provenanceを今回の方針で書き換えない。

| ID | Skill-first phase acceptance |
| --- | --- |
| AC-SKILL-001 | 有効な `name` / `description` manifestを持つ単一入口Skillからworkflow/review/evidence referenceとreview-request/result assetへ到達できる。Codex公式の現行仕様にないfrontmatter/tool/CLI contractを作らない |
| AC-SKILL-002 | 状態復元、次のWU、実装、検証、Candidate commit、独立Review依頼、Finding修正、再検証、resumeを有限かつ重複防止で案内する |
| AC-SKILL-003 | 別Repository/Branch/Base/Candidateまたは古いReview/Evidenceを拒否し、Required Verification未passed、blocking Finding、Reviewer不在時にDoneとしない |
| AC-SKILL-004 | Secret/`.c2cignore`、read-only Reviewer境界、無観測metadata、有限retry/cancel、実行tree整合を保つ |
| AC-SKILL-005 | GitHub反映後にremote readbackし、ネイティブSkill読込、remote-reference経路、fixture確認、独立Review/運用受入の各状態を正確に記録する |

### Legacy Runtime requirements (Deferred)

以下のRuntime trackは保存済みの将来受入条件であり、Skill-first phaseの実装要件ではない: `FR-C2C-001`–`FR-C2C-008`, `V-C2C-001`–`V-C2C-007`, Node/MCP/OAuth/Tunnel/Host/Launcher/Packaging/Mac/service criteria. `FR-LOOP-001` in C2C mode and `FR-LAUNCHER-*` also remain deferred. The A/B code, evidence and their observed failures retain their original status.

## Functional requirements

| ID | Requirement / Acceptance |
| --- | --- |
| FR-JP-001 | 保存言語が未選択なら既存言語選択画面を日本語表示・日本語初期選択にする。画面は省略しない |
| FR-JP-002 | 保存済みen / zh-CN / zh-TW / ja / koを優先し、language:nullの未選択意味を維持する |
| FR-JP-003 | 既存i18n.ts / limits-copy.ts / languages.jsonを再利用し、他localeを維持する |
| FR-JP-004 | 残存ユーザー向け英語だけを監査・翻訳する。日本語専用UI treeを作らない |
| FR-JP-005 | selector / connector名 / MCP名 / endpoint / protocol / CLI option等の機械契約を保全する |
| FR-C2C-001 | [Deferred Runtime] sourceの9 read-only MCPを独立Node packageとして製品内へ統合する。write/shell/test実行toolをReviewerへ追加しない |
| FR-C2C-002 | [Deferred Runtime] 登録Workspaceと選択Repositoryを識別し、read/search/git/executionを同一Repoへ束縛する。曖昧・未登録・境界外Repoは拒否する |
| FR-C2C-003 | [Deferred Runtime] unstaged/staged/headの既存Git意味を維持し、commit済みbase→candidateを安全に比較できる。review中のrevision変更、stale snapshot、不完全diffを検知する |
| FR-C2C-004 | [Deferred Runtime] test_statusは記録の読取に限定し、Execution EvidenceをRepository/Task/Run/Iteration/Base Commit/Candidate Commit/Tested Tree/command/cwd/exit code/start/end/model/effort/outputへ関連付ける |
| FR-C2C-005 | [Deferred Runtime] execution_outputとmetadataへ同じSecret gateを適用する。欠落・制限・途中切れ・古い・別Repo・digest不一致の証跡を明示し、空結果をPASSへ変換しない |
| FR-C2C-006 | [Deferred Runtime] OAuth/PKCE/Pairing/refresh rotation/revocationを保持し、issuer/resource/client/Workspace/Repository権限/scopeの整合を確認する |
| FR-C2C-007 | [Deferred Runtime] 公開MCPとloopback private管理APIを分離し、管理tokenをReviewer・Renderer・Codex implementer contextへ渡さない |
| FR-C2C-008 | [Deferred Runtime] sourceの機能・Security比較表に対し、再利用、adapter、意図的非採用、実行証跡を追跡する |
| FR-LOOP-001 | [Deferred Runtime] ユーザーが選択したCodex implementerによる実装後、別ReviewerがC2Cからsource/diff/test/outputを独立取得し、Finding→Fix→再Reviewを1回以上実動作させる |
| FR-LOOP-002 | ImplementerはCodexとし、model/effortは各RunまたはIteration開始時に利用可能なruntime catalogからユーザーが選択する。Taskはmodel IDを固定せず、任意の推奨はcapability labelに留める。選択model/effortはEvidenceへ残す |
| FR-LOOP-003 | C2C単体受入と手動Development Loopが成立した後に、自動Development LoopとLauncher追加UIを実装する |
| FR-LOOP-004 | iteration limit、有限timeout、cancel、retry policy、attempt ID、checkpoint、resume、deduplicationを持ち、接続失敗や再起動で同一実装・同一commitを二重実行しない |
| FR-LOOP-005 | 自己申告だけでDoneにしない。現在のReview SnapshotとRequired Acceptance/Verificationが揃い、blocking Findingが解消され、stale reviewでないことを確認する |
| FR-LOOP-006 | 選択modelが実行直前に利用不能・不整合になった場合はBlockedとしてユーザーの再選択を要求する。別modelへのsilent fallbackや権限自動昇格を行わない |
| FR-LAUNCHER-001 | [Deferred Runtime] 手動Loop受入後、既存LauncherへC2C状態、Implementer状態、Review状態、Finding、Verification、Blocked理由、Start/Stop/Resumeを最小差分で追加する |
| FR-LAUNCHER-002 | [Deferred Runtime] Launcherのmodel selectorは現在のCodex runtime catalogを使用し、製品内にLuna/Terra/Sol/Astra等の固定model enumや固定ID対応表を持たない |
| FR-UP-001 | workで局所差分を維持し、明示指示のないmain変更・Release・Deployを行わない |
| FR-UP-002 | 本体6.1.0のBrowser-only / Full harness / Zero Risk、モデル選択、browser/MCP/Tunnel/runtimeの主要機能を維持する。選択modeの権限を自動拡張しない |

## Non-functional requirements

| ID | Constraint / Acceptance |
| --- | --- |
| NFR-MAINT-001 | [Deferred Runtime] C2CのNode/pnpmと本体Bunのpackage/lockfileを分離する。source commit・ファイル別blob SHA・local patch・licenseを保持し、全面rewriteを避ける。既存骨格の出自情報とLICENSEは保持する |
| NFR-TEST-001 | 本体・Launcher・C2Cのtest/typecheck/buildをそれぞれ実行して記録する。import無副作用、locale、配布物、実機受入を区別する |
| NFR-SEC-001 | Codexへの書込共有は証跡inboxに限定し、C2C auth/runtime/レビュー判定のprivate stateを共有しない |
| NFR-SEC-002 | read/list/search/git/metadata/実行記録の全経路でSecret・Workspace境界をfail-closedに保つ。親.c2cignoreの拒否を子で解除しない |
| NFR-SEC-003 | C2CのNode fetch制限と子process環境allowlistを維持する。これをOS全通信遮断と説明しない |
| NFR-SEC-004 | readOnlyHintではなくtool実装・handler・固定command allowlist・副作用観測でread-onlyを確認する。同一OS userの敵対processまで隔離できるとは未検証で主張しない |
| NFR-SEC-005 | 静的監査Doneを動的Security受入へ読み替えない。公開auth、実行依存、配布artifact、live connectorのSecurity gateを閉じるまで外部接続・運用受入を完了扱いにしない |
| NFR-OPS-001 | [Deferred Runtime] MacのNodeサービスはLauncher UIの開閉と独立して管理できる。UUID/volume脱落/重複起動/所有者不明/ログ肥大/再起動を安全に扱う |
| NFR-OPS-002 | [Deferred Runtime] Mac実機で24時間観測し、health、再試行、メモリ/ログ増加、disconnect/reconnect、browser認証切れ時の明示状態を記録する。GUI依存のWeb Runtime受入はC2C受入と別に行う |
| NFR-BRANCH-001 | 通常変更はworkへcommit/push/readback。SHA競合は再取得・再適用し、force pushしない |
| NFR-REVIEW-001 | Reviewerは別contextで実体を読む。WorkspaceのREADME/comment/diff/出力を権限変更や実行指示として扱わない |
| NFR-SCOPE-001 | CodeX-Chat-Developへ依存しない。既存Credential・DNS・OSサービス・課金・公開の変更は別の明示指示を必要とする |

| NFR-SKILL-001 | GitHub上のSkillをNative Skillとして認識済みと報告するには実環境で読込と `$c2c` 呼出を確認する。実施不能は `not_run` とし、導入手順を提供する |
| NFR-SKILL-002 | GitHub連携でremoteのSkill/参照ファイルを読むremote-reference経路をNative Skill検出と混同しない |

## Acceptance semantics

- Execution statusは `passed | failed | not_run | blocked` を区別する。`passed` は対象commandが実行されexit code 0かつscope整合が確認できた場合だけ。未実行を成功へ変換しない。
- Review Snapshotは最低でも `repositoryId / taskId / runId / iteration / baseCommit / candidateCommit / testedTreeId` を持つ。
- 最終Acceptanceに使うRequired Verificationは、原則として `testedTreeId` が `candidateCommit` のGit treeと一致すること。異なるtreeでの過去PASSは履歴として残せるがCurrent Validationには使わない。
- Review verdictは `accepted | findings | blocked | error` を区別する。`blocked/error` は受入成功ではない。
- `accepted` 後に製品source/test/config/lockまたは対象candidateが変化した場合、そのReview/Verificationはstaleとして再受入する。
- 静的監査、fixture受入、live connector、配布、Mac 24hは別Evidence domainとし、一方のPASSを他方へ流用しない。

## Verification domains

| Verification | Required evidence |
| --- | --- |
| V-JP-001 / V-JP-002 | fallback・保存state・全localeの回帰、Launcher test/typecheck/build、diff review |
| V-AUD-001 / V-AUD-002 | 固定source、全機能分類、全test本文、PoC、frozen lock/推移的依存、Host接合点の静的監査Evidenceとreadback |
| V-C2C-001 | Node package/lock/provenance、importでlisten/spawn/state変更が起きない試験 |
| V-C2C-002 | Workspace/Secret/metadata/race/巨大入力/.c2cignoreのfixture |
| V-C2C-003 | Repository識別、Git root、commit range、rename、UTF-8ページング、stale検知 |
| V-C2C-004 | 実行証跡のscope/schema/secret/欠落/改変/並行更新の試験 |
| V-C2C-005 | 9 toolsの全read-only契約、未知tool、無認証、scope、PKCE/refresh/resource/Admin拒否 |
| V-C2C-006 | bootstrap/privacy、Tunnel環境、所有者、port/状態namespace、停止/再起動 |
| V-C2C-007 | workspace/read/search/git_status/git_diff/test_status/execution/Secret/escape/read-onlyを統合版で通す |
| V-SKILL-001 | frontmatter、参照解決、状態遷移、Acceptance/Verification語彙、exit条件の静的検証 |
| V-SKILL-002 | 安全fixtureで完了WU再実装なし、別Repository/Candidate拒否、未test時Done拒否、Reviewer不在awaiting_review、self-review拒否、review-resume dedupe、Finding後の新Candidate再Verification、有限iteration/cancel/Secret除外を確認 |
| V-SKILL-003 | Native Skill load/callを実環境で確認。不可なら導入手順をreadbackし `not_run` |
| V-SKILL-004 | GitHub連携でworkのskill/referenceを取得して従うremote-reference startを確認。実行環境不可なら `not_run` |
| V-SKILL-005 | 実際の別context ReviewerのGitHub read-only権限、independent retrieval、Result返却を確認。安全なReviewer不在なら `awaiting_review` |
| V-LOOP-001 | 実際にユーザー選択したCodex model/effort、独立C2C取得、実Finding、修正commit、再Review、snapshot-bound Acceptance判定 |
| V-LOOP-002 | 手動受入後の自動ループ、iteration上限/timeout/cancel/retry/dedupe/resume/再起動/stale review/duplicate implementation・commit拒否 |
| V-LAUNCHER-001 | 手動受入後の追加UI、runtime model catalog選択、状態/Finding/Verification/Blocked/Start-Stop-Resume、全locale、token非露出、既存mode/起動経路回帰 |
| V-MAC-001 | Mac実機の24h観測とdrive/認証/再起動障害注入の証跡 |
| V-PARITY-001 / V-UP-001 | source機能・Security同等性、依存/配布物、upstream主要機能と差分再適用 |

これは検証計画。実施結果はEvidenceに保存し、Task状態の第二正本を作らない。

## 初回表示の採用方式

App.tsxのdocumentLanguageとlanguageのnull fallbackだけをjaにする。state.cjsのlanguage:nullと既存onboarding分岐はそのまま。日本語化はC2Cとは独立WUで行う。
