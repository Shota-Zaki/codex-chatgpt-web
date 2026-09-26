# AI Work State

このJSON blockだけを再開情報の正本とする。Task状態は `docs/project/TASKS.md`、次の有限WUは `docs/project/NEXT_WORK.md` を参照する。

```json
{
  "schema_version": 2,
  "branch": "work",
  "main_commit": "293341084ac7a1ddd2de12fede3706023f5b6474",
  "observed_work_head_before_this_checkpoint": "ad2f1b5fe05d67809619de761e18979af8140022",
  "checkpoint_id": "CGW-DES-001",
  "pending_changes": [],
  "source": {
    "repository": "Shota-Zaki/codex-with-chatgpt",
    "fixed_work_commit": "89af4fa34952fe58e017b095ae2f793420cf05b0",
    "main_commit": "9663b88753e35c76796c5bce000293e0bd22cd9e",
    "modified": false
  },
  "current_status": {
    "CGW-AUD-001": "Done",
    "CGW-AUD-002": "Done",
    "CGW-DES-001": "Done",
    "CGW-C2C-001": "Ready",
    "CGW-JP-001": "Ready",
    "CGW-ENV-001": "Deferred"
  },
  "resume_notes": [
    "2026-09-26。統合先はShota-Zaki/codex-chatgpt-web/work。本体mainは293341084ac7a1ddd2de12fede3706023f5b6474のまま。このcheckpoint直前に観測したwork HEADはad2f1b5fe05d67809619de761e18979af8140022。再開時は必ずremote work/mainを再取得する。",
    "C2C sourceはShota-Zaki/codex-with-chatgpt@89af4fa34952fe58e017b095ae2f793420cf05b0へ固定。source Repository自体は変更していない。",
    "固定sourceの静的監査は完了。AUD-002A/B1/B2/B3/C1/C2/C3で主要実装、全test本文、PoC、frozen lock/推移的依存、Host Runtime/Launcher/MCP/model接合点を確認した。test本文確認は実行PASSではない。",
    "C2C_MIGRATION_AUDITのF01〜F09は移植時の補強要求として維持する。特にmetadata共通Policy、private state全体のCodex writable化禁止、Evidence v2、Repository/commit snapshot、失敗意味論、OAuth resource/scope、Named→Quickの暗黙fallback禁止、runtime ownership、live未受入を残す。",
    "Requirements、Basic Design、Detailed Design、Task graph、Work Unit、初回Implementation Packetを今回の要件へ同期済み。C2C製品コードはまだcodex-chatgpt-webへ統合されていない。",
    "ImplementerはCodexで固定するが、model/effortは固定しない。各RunまたはFix Iteration開始時に現在のCodex runtime catalogからユーザーが選択する。Taskはcomplexityとrecommended_capabilityだけを助言として持ち、model IDを製品仕様へ固定しない。利用不能ならBlocked / MODEL_SELECTION_STALEで再選択しsilent fallbackしない。",
    "Reviewerは独立C2C context。packages/c2c-reviewを別Node process/別lock/別endpoint/別authとして統合し、本体src/adapters/chatgpt-web/mcp-server.tsのwrite/exec実装面へReviewer toolsを混ぜない。",
    "Review SnapshotはRepository/Task/Run/Iteration/Base Commit/Candidate Commit/Tested Treeへ束縛する。working treeがcleanでもbase..candidateとcommit blobでReviewできる設計。最終AcceptanceのRequired VerificationはtestedTreeIdがcandidateCommitのtreeと一致する必要がある。",
    "Execution Evidence v2はattempt、command/cwd/start/end/exit/output、model/effortを記録し、passed/failed/not_run/blockedを区別する。Codexの自己申告だけをtrusted Evidenceにしない。",
    "Development LoopはPLAN→IMPLEMENT→VERIFY→REVIEW→FindingならFIX→VERIFY→REVIEW、acceptedならDONE。iteration limit、phase timeout、cancel、retry、checkpoint、resume、dedupe、stale review拒否、duplicate implementation/commit防止を必須にする。",
    "接続/auth/review transportエラーで同じIMPLEMENTを再実行しない。IMPLEMENT_COMPLETED後ならReview側からresumeする。Finding修正は新しいiteration/attemptとして扱う。",
    "Launcher統合はmanual Development Loop受入後。既存i18n/IPCを使いC2C/Implementer/Review状態、Finding、Verification、Blocked理由、Start/Stop/Resume、runtime model/effort選択を最小差分で追加する。固定model enumを作らずprivate token/raw secret outputをRendererへ出さない。",
    "日本語firstは独立Task CGW-JP-001。launcher/src/App.tsxの未選択fallback2箇所だけen→ja案を維持し、state.cjsのlanguage:null、既存言語選択stage、他locale、selector/MCP/endpoint/CLI等の機械契約を保持する。",
    "次の有限WUはWU-CGW-C2C-001A。通信しないNode packageのpackage/lock/workspace/tsconfig/vitest/LICENSE/UPSTREAM/Evidenceの8ファイルだけを扱う。src/index、Bridge/MCP/OAuth/Tunnel/serviceはまだ作らない。",
    "初回Packetはdocs/implementation/WU-CGW-C2C-001_PACKET.md。WU-A設定/provenance、WU-B inert entry/import-boundary test、WU-C checkpointへ分割済み。実装modelはruntime user choice。",
    "今回実施したのはGitHub上の静的監査、正本設計、Task/Packet更新、各commitのreadback。製品のtest/typecheck/build、C2C単体動的受入、live connector、manual loop、auto loop、Launcher統合、配布、Mac24hは未実施。",
    "過去のproject connector workspace_infoはConnectorClientError 400: We couldn't connect your account. Please try again.で失敗しており、live受入CGW-ENV-001だけDeferred。別Workspace・Credential変更・権限拡張で迂回しない。",
    "main merge、Release、Deploy、Repository削除、Archive、Credential変更、課金操作は実施していない。force push/resetも行っていない。CodeX-Chat-Developへ依存しない。"
  ]
}
```
