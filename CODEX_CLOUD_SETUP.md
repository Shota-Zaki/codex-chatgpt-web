# Codex Cloudセットアップ指示 — codex-chatgpt-web

対象: `Shota-Zaki/codex-chatgpt-web` / `work`。目的は本体とC2C Skill-first開発のCloud検証環境。小工程で進め、モデル・effortは実行時の利用者選択を維持する。本書は手順であり、実行済みEvidenceやTask台帳ではない。

## 方式と保護境界

AGENTS.md、docs/project/PROJECT_BRIEF.mdと現在Taskを優先。C2Cは.agents/skills/c2c/を入口に既存Codex Runtime・GitHub連携を使う。独自Node/MCP/OAuth/Tunnel/daemon移植はDeferred。packages/c2c-review、既存Launcher、Browser-only/Full harness/Zero Risk、他locale、過去Evidenceは削除・無効化しない。固定source Shota-Zaki/codex-with-chatgpt@89af4fa34952fe58e017b095ae2f793420cf05b0は読取のみ。
GitHub Actions、main、既存Credential、DNS、OS service、Release/Deployを変更しない。setup会話ではsource/package/lock/Skill/Taskを変更せず、必要な修正は別coding taskへ分ける。

## CS-01: 入力と対象

読む: AGENTS.md、docs/project/PROJECT_BRIEF.md・TASKS.md・NEXT_WORK.md・AI_WORK_STATE.md、package.json、bun.lock、launcher/package.jsonと同ディレクトリの既存lock、.agents/skills/c2c/SKILL.md、.c2cignore。Skillのreferences/assetsは必要な範囲だけ読む。
git status --short、git branch --show-current、git rev-parse HEADを実行。remote対象を確認してgit fetch origin work。認証入りURLをログへ出さず、dirty treeのreset/cleanやmain/別Task branchの強制切替をしない。OS/arch、Bun、Node、Pythonを実測。
成功: work基準・開始SHA・現行Skill候補と保護範囲が確定。

## CS-02: 固定依存

調査時はbun@1.4.0、engines bun=1.4.0。開始時に現行packageManager/enginesを再照合し、公式配布元から必要版を用意。取得不能なら勝手に最新版へ変更しない。
rootでbun install --frozen-lockfile。Launcherは現行package/lockと既存verify/build scriptから別installの要否を確定する。rootの成功だけでLauncher依存も導入済みと扱わない。既存Electron等のinstall scriptとdownload先を確認し、承認を一括緩和しない。
成功: 必要なroot/Launcher installが完了、両lock不変。

## CS-03: 本体とLauncherを別々に検証

rootで個別実行。
```sh
bun run typecheck
bun test ./tests
bun run build
bun run launcher:typecheck
bun run launcher:test
bun run launcher:build
```
最後にbun run verifyを実行し、何が走ったかscripts/verify.tsと結果を対応付ける。過去のtest failure/advisoryを新Candidateへ付け替えず、現在の結果を別記録する。auditはnetwork可否と検出内容を分け、失敗を無視するため自動upgradeしない。
成功: 本体・Launcher・既存verifyのcommand/cwd/exitが区別された表を作成。

## CS-04: Skillの確認

.agents/skills/c2c/SKILL.mdのfrontmatter、参照先、単一入口、権限境界を静的確認する。既存validatorがあるならその必要Python依存を確認して実行する。PyYAML等が必要でも無根拠に最新版を導入せず、validatorの指定と互換性を記録する。
GitにSkillがあること、Codexのnative catalogで検出されたこと、実際に呼び出したことを別項目で記録。ローカルPCの個人SkillがCloudへ自動同期されたと仮定しない。専用の$c2c CLIサブコマンドや存在しないdry-runを作らない。実呼出は権限とTask scopeが揃った独立工程へ分離する。
成功: static/reference/native discovery/invocationを各々passed/not_run/blockedで判定。

## CS-05: 認証・起動・レビュー

Browser用Cookie/ログインprofile/既存tokenをCloudへコピーしない。setup、app/launcher、smoke:subagents:live、smoke:codex等の実ログイン・外部接続経路を自動実行しない。必要な起動確認は現行fixture/loopback入口がある場合だけ。CloudでGUIを操作できると仮定しない。
現在NEXT_WORKがawaiting_reviewなら維持する。このsetupを独立Reviewとみなさず、同じ実装contextの自己Reviewをacceptedにしない。独立Reviewerは別contextで、固定Repository/Branch/Base/Candidate/treeをGitHubから取得し、read-only境界を確認する。環境準備を理由に既存Review gateを開かない。
成功: GUI/live接続/Skill運用/独立Reviewが未受入なら未受入のまま明記。

## CS-06: 再利用・引継ぎ

Install scriptへ固定Bun・root/必要Launcherのfrozen install・実際に必要な検証依存を保存。Start skillは既定でGUI/Tunnel/daemonを起動しない。必要時のfixture入口と所有processだけの停止を記載。
Only me、Package managersと必要な公式配布先だけ。設定権限がなければ全文を出力し未設定と報告。再installでlockとSkill不変を確認。Environment Publishを製品公開と混同せず、未Publishは未Publish。Publish後の新規Taskで最小検証とSkill検出を再確認する。
報告: CS別状態、版、開始SHA、command/cwd/exit、Install script、Start skill、Secret名のみ、通信先、既存failure、Skill検出/呼出、Review待ち、次の1工程。

失敗はversion/network/認証/native依存/既存コード/Skill参照に分類。安全な修正後の同一工程retryは最大2回。TLS無効化、lock削除、テスト弱体化は禁止。source修正は別coding task。参照元の固定SHAを勝手にworkの最新へ変更しない。

2026-10-11 Owner依頼による静的手順追加。既存Task状態・Skill・本体・固定source・mainは変更しない。
公式資料: https://developers.openai.com/codex/environments/cloud-environments
