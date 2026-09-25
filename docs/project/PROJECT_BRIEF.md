# Project Brief

## Purpose

`codex-chatgpt-web`を本体として、`Shota-Zaki/codex-with-chatgpt`のC2Cを製品内へ再利用統合する。ChatGPT Web/Astraによる設計、Codex Luna-highによる実装、別Reviewer contextによるC2C read-onlyレビュー、Finding修正・再レビューを1つの製品で扱う。

```text
Astra design / plan
  → Codex Luna-high implement / test / build
  → independent Reviewer reads through C2C
  → Finding → Luna-high fix → re-review
  → verified Done
```

C2Cは証拠を読み取る仕組みであり、それ自体がAI Reviewerや実装Runtimeではない。

## 現在地

2026-09-25の統合設計開始時点では、workに設計・Task文書があるだけで、製品コードのC2C統合はまだ開始していない。今回の正本更新も統合実装・live受入を意味しない。開始時の固定HEADと監査結果は[C2C_MIGRATION_AUDIT](../design/C2C_MIGRATION_AUDIT.md)に記録する。

旧方針の「C2Cは外部Repositoryから利用するだけ」は置き換える。sourceを全面rewriteするのではなく、Node package/child processとして局所移植し、出自とlocal patchを追跡する。

## Target users

日本語でChatGPT Web/Codexを利用する開発者。主運用は24時間稼働Mac miniを開発ホストとし、日常操作は既存Launcher等から行う。upstream利用者の既存locale・機能・設定も維持する。

## Boundary

対象は、既存i18nによる日本語first、C2C Review Engine、Repo/実行証跡adapter、手動review循環、その後の自動Development LoopとLauncher局所追加、Mac常駐運用、upstream追従とSecurity同等性確認。

本体のBrowser-only / Full harness / Zero Risk、既存モデル選択、browser/MCP/Tunnel/runtimeの主要機能を保全する。選択modeがwriteを許可しない場合、開発ループのために勝手に権限を引き上げない。

他localeの削除、日本語専用別UI、Bunへの全面移植、独自Bridgeの重複rewrite、`CodeX-Chat-Develop`の復元は範囲に含めない。

## Ownership

- 製品・設計・実装正本: `Shota-Zaki/codex-chatgpt-web/work`
- upstream/公開基準: main。明示指示があるまで変更しない。
- source: `Shota-Zaki/codex-with-chatgpt`の監査固定SHA。今回sourceへ書き込まない。
- Astra: 設計・分割・Acceptance・独立レビュー。
- Luna-high: 有限WUの実装・検証・修正。
- Host: 実行委任、限定証跡inbox、checkpoint管理。
- C2C: read-onlyデータ面。OAuth/管理/private stateを実装側から分離。

## Completion

upstream主要機能と全localeの維持、日本語first、C2C統合と単体受入、実際のLuna→Review→Fix→Review、test/typecheck/build成功、Secret/Workspace/read-only境界、Mac24時間運用、追従可能な出自管理、sourceとの機能・Security同等性が揃った状態を統合完成とする。

未実施・環境依存・BlockedはPASSやDoneへ読み替えない。完全監査残件、移植、単体受入、手動循環、自動化、Launcher、Mac実機は別Taskとして進捗を分離する。

## References

[REQUIREMENTS](../design/REQUIREMENTS.md) / [BASIC_DESIGN](../design/BASIC_DESIGN.md) / [DETAILED_DESIGN](../design/DETAILED_DESIGN.md) / [TASKS](TASKS.md) / [NEXT_WORK](NEXT_WORK.md)
