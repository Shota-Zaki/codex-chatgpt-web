# Requirements

目的とProject境界は [PROJECT_BRIEF](../project/PROJECT_BRIEF.md) を参照する。

## Functional requirements

| ID | Requirement | Acceptance condition |
| --- | --- | --- |
| FR-JP-001 | 初回セットアップを日本語-firstにする | 保存済み言語がない状態で、言語選択画面自体が日本語で表示され、日本語が初期選択になる。言語選択画面は省略しない |
| FR-JP-002 | 保存済み言語設定を維持する | `en` / `zh-CN` / `zh-TW` / `ja` / `ko` の有効な保存値は従来どおり使用される |
| FR-JP-003 | upstreamの既存i18nを再利用する | `i18n.ts`、`limits-copy.ts`、`languages.json` を維持し、日本語専用の別UI treeを作らない |
| FR-JP-004 | 残存するユーザー向け英語を監査する | UI表示として残る英語を識別し、安全に翻訳できるものだけを既存i18nへ寄せる |
| FR-JP-005 | 機械契約文字列を保全する | connector名、selector、endpoint、protocol、診断判定など表示以外にも使われる文字列を翻訳で破壊しない |
| FR-LOOP-001 | 実装と独立レビューを反復する | Codex実装後にC2Cが現在のsource、diff、test記録を独立確認し、修正PLANまたはDoneを返す |
| FR-LOOP-002 | 実装担当を差し替え可能な契約にする | 現在はLuna-highを標準実装担当とするが、Acceptanceと設計はモデル固有仕様に依存しない |
| FR-UP-001 | upstream追従性を維持する | fork固有の製品コード差分を最小化し、`main` は明示指示なしに変更しない |
| FR-UP-002 | 既存機能を維持する | Browser-only / Full harness / Zero Risk、モデル選択、MCP、Tunnel、runtime等の挙動を日本語化Work Unitで変更しない |

## Non-functional requirements / Constraints

| ID | Constraint |
| --- | --- |
| NFR-MAINT-001 | 日本語化は局所差分とし、upstream merge時の競合面積を最小化する |
| NFR-TEST-001 | localization / state / renderer既存テストを壊さず、追加挙動には回帰テストを追加する |
| NFR-SEC-001 | 認証、Cookie、API key、Tunnel credential、MCP権限境界を日本語化理由で変更しない |
| NFR-BRANCH-001 | 開発は `work`、`main` Promotionはユーザーの明示指示時のみ |
| NFR-REVIEW-001 | reviewerは実装担当の説明だけでなくC2Cのread-only toolで実体を確認する |
| NFR-SCOPE-001 | `CodeX-Chat-Develop` を構成・依存・文書へ追加しない |

## Open decisions

現時点で、日本語-firstの初回表示は保存stateの既定値を変更せず、Renderer側の `null` fallbackだけを `ja` にする方式を採用する。

理由:

- `language: null` が示す「未選択」の意味を保存層で維持できる。
- 言語選択画面を省略しない。
- 他言語利用者が最初に選択できる。
- 変更箇所を `App.tsx` の局所差分に限定できる。
