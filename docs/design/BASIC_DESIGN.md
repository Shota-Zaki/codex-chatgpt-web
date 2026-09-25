# Basic Design

要求は [REQUIREMENTS](REQUIREMENTS.md)。ここは構成・責務・境界の正本。

## Components / Responsibilities

| Component | Responsibility | Inputs | Outputs / Dependencies |
| --- | --- | --- | --- |
| `codex-chatgpt-web` upstream core | ChatGPT Webモデル、launcher、browser、MCP、runtime | upstream source | forkが維持する製品基盤 |
| Launcher i18n | UI文言と言語切替 | `Language`, saved state | locale別copy |
| Japanese-first adapter | 未選択時だけ日本語を既定表示にする | `state.language === null` | `ja` UI。言語選択自体は維持 |
| Codex implementation role | 設計済みWork Unitの実装・test・Git | TASKS / NEXT_WORK / design | `work` の差分と実行記録 |
| `codex-with-chatgpt` C2C | source / diff / test evidenceの読み取り専用レビュー | Workspace内 `codex-chatgpt-web` | 修正PLANまたはDone |
| Project source-of-truth | 要件、設計、Task、次作業、checkpoint | 本docs | モデル非依存の実装契約 |

## Data flow / Ownership

```text
Project正本
  ↓ Implementation Packet
Codex Luna-high
  ↓ edit / test / commit
codex-chatgpt-web/work
  ↓ read-only source / diff / execution record
codex-with-chatgpt C2C
  ↓ review
修正PLAN ──────────────┐
  ↓                    │
Codex Luna-high ←──────┘
  ↓
Acceptanceを満たせばDone
```

- 製品コードの所有先は `codex-chatgpt-web/work`。
- レビュー結果は製品仕様そのものではなく、Project正本のAcceptanceに対する判定材料。
- C2C Bridgeは実装を行わない。
- `codex-with-chatgpt` へ `codex-chatgpt-web` 固有の製品コードを移さない。

## Japanese-first flow

新規state:

```text
state.language = null
        ↓
App.tsx fallback = "ja"
        ↓
言語選択画面を日本語で表示
        ↓
日本語が初期選択
        ↓
ユーザーがContinue
        ↓
既存state更新経路で "ja" を保存
```

保存済みstate:

```text
state.language = "en" / "zh-CN" / "zh-TW" / "ja" / "ko"
        ↓
fallbackは使用しない
        ↓
保存済みlocaleをそのまま表示
```

## Cross-cutting policies

- i18n辞書の型整合を維持する。
- machine-readable / machine-matchedな英語文字列は表示層へ分離できる場合だけ翻訳する。
- 日本語化のためにDOM selectorやChatGPT UI検出ロジックを変更しない。
- upstream同期はfork固有差分を再適用できる粒度で管理する。
- reviewはC2Cのread-only境界を維持する。

## Decisions

### D-001: state defaultではなくRenderer fallbackを日本語化

採用。

`DEFAULT_STATE.language = "ja"` へ変える案は、未選択状態を失い、言語選択ステージをスキップする可能性があるため採用しない。

### D-002: C2Cを重複実装しない

採用。

`codex-with-chatgpt` に既にINIT → PLAN → EXECUTED → independent reviewのループがあるため、このRepositoryには対象RepositoryとAcceptanceだけを定義する。
