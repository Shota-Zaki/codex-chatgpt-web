# AGENTS.md

このRepositoryは `miuuyy/codex-chatgpt-web` のforkであり、元実装への追従性を最優先する。

## 目的

- upstreamの機能・構成をできるだけ維持したまま、日本語利用を第一候補にする。
- 実装はCodex、設計・独立レビューは `Shota-Zaki/codex-with-chatgpt` のC2Cループを使用する。
- `CodeX-Chat-Develop` には依存しない。

Project固有仕様は `docs/project/PROJECT_BRIEF.md` と `docs/design/` を参照する。
現在Taskは `docs/project/TASKS.md`、次の1 Work Unitは `docs/project/NEXT_WORK.md`、再開上の注意は `docs/project/AI_WORK_STATE.md` を正本とする。

## Branch

- `main`: upstream追従・公開基準。明示指示なしに変更しない。
- `work`: 日本語化、検証、開発文書、実装差分の正本。

upstreamからの更新を取り込む際は、まず元実装との差分を確認し、fork固有差分を最小限に保つ。

## 役割分担

### 設計・レビュー

`Shota-Zaki/codex-with-chatgpt` のC2C Bridgeを使用する。

- 対象Repositoryを `codex-chatgpt-web` に固定する。
- source、git diff、test記録をC2Cの読み取り専用MCPから独立確認する。
- 実装担当の自己申告だけでDoneにしない。
- 問題があれば次の小さいWork Unitを返す。

### 実装

現在の標準実装担当は **Codex Luna-high**。

- `work` 上だけで実装する。
- 設計正本とAcceptanceを変更せずに実装する。
- ファイル編集、shell、Git、test、typecheck、buildを担当する。
- 1 Work Unitを小さく保ち、実装後にC2Cレビューへ渡す。
- モデル固有の挙動を製品仕様へ埋め込まない。

## 実装ループ

```text
codex-chatgpt-web
  設計・調査
      ↓
Codex Luna-high
  workへ実装・検証
      ↓
codex-with-chatgpt
  C2Cでdiff/test/sourceを独立レビュー
      ↓
修正PLANまたはDONE
      ↓
必要ならLuna-highへ戻す
```

レビュー時は `codex-with-chatgpt` の既存SkillとINIT / EXECUTED / REVIEWループを再利用し、このRepository側へ重複したBridge実装を追加しない。

## 日本語化方針

1. 既存の `launcher/src/i18n.ts`、`launcher/src/limits-copy.ts`、`launcher/electron/languages.json` を再利用する。
2. 日本語のために英語文字列をソース全体へ直接埋め込まない。
3. Protocol、connector名、selector、endpoint、エラー判定用の機械契約文字列は、UI表示と明確に分離されていない限り翻訳しない。
4. 他言語を削除しない。
5. 初回表示を日本語にする場合も、言語選択画面と既存の保存済み言語設定を維持する。
6. 日本語化と機能変更を同じWork Unitへ混ぜない。

## 最初の実装方針

新規状態の `language: null` は維持する。
`launcher/electron/state.cjs` の保存形式は変更しない。

初回UIのフォールバックだけを日本語にするため、`launcher/src/App.tsx` の未選択時言語を `"en"` から `"ja"` へ変更する。
これにより言語選択画面は残り、初期選択だけ日本語になる。

## 検証

製品コードを変更したWork Unitでは、最低限対象に応じて以下を実行する。

```sh
bun run --cwd launcher typecheck
bun run --cwd launcher test
bun run --cwd launcher build
bun run verify
```

実行できない検証を成功扱いにしない。GitHub APIだけで作業した場合は未実行として残す。

## 共通Rules

参照基準:

- Repository: `Shota-Zaki/development-rules`
- Version: `3.1.1`
- Branch: `main`
- Commit: `c55ffb6b6f21bdb9c78f70f6a47e59c75a3f74b5`

このforkには現時点でRules Snapshot一式を複製しない。fork固有差分を小さくするため、Project正本とこの入口だけを追加し、必要になった時点で独立Work Unitとして同期する。
