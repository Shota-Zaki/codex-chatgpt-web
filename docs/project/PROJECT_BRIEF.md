# Project Brief

## Purpose

`miuuyy/codex-chatgpt-web` の機能・構成・upstream追従性をできるだけ維持しながら、日本語利用を第一候補にしたforkとして運用する。

開発はCodexが実装し、`Shota-Zaki/codex-with-chatgpt` のC2C Bridgeを設計・独立レビュー層として使用する。実装とレビューを分離し、小さいWork Unitで反復する。

## Target users

- 日本語でCodex / ChatGPT Web連携を利用したい開発者。
- 主利用者はMac miniを常時稼働の開発ホストとして使い、Codexを実装担当、ChatGPTを設計・レビュー担当として運用する。
- upstreamの更新を継続して取り込みたいfork運用者。

## Project boundary

### 対象

- 既存i18n基盤を利用した日本語-first UX。
- 日本語表示の不足箇所の監査と最小修正。
- upstreamとの差分を小さく保つ運用。
- Codex Luna-highによる実装。
- `codex-with-chatgpt` の既存C2Cループによる独立レビュー。
- `work` での設計・実装・検証・Evidence管理。

### 対象外

- ChatGPT Web / Codex / MCP / Tunnelのコア機能の不要な再実装。
- 日本語化のための他言語削除。
- UI翻訳と無関係な大規模リファクタリング。
- `CodeX-Chat-Develop` への依存または復元。
- 明示指示のない `main` へのPromotion。
- C2C Bridgeと同等機能をこのRepositoryへ重複実装すること。

## Success direction

- 新規ユーザーが最初から日本語でセットアップを進められる。
- 既存ユーザーの保存済み言語設定は変わらない。
- upstream更新を取り込む際の競合が限定的である。
- Luna-high実装後にC2Cがsource/diff/test evidenceを独立確認し、修正またはDoneを判断できる。

## References

- 要件: [REQUIREMENTS](../design/REQUIREMENTS.md)
- 構成: [BASIC_DESIGN](../design/BASIC_DESIGN.md)
- 詳細契約: [DETAILED_DESIGN](../design/DETAILED_DESIGN.md)
