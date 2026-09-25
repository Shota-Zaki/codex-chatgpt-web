# Detailed Design

構成は [BASIC_DESIGN](BASIC_DESIGN.md)。ここは実装契約の正本。

## 1. Japanese-first launcher contract

### 1.1 対象

`launcher/src/App.tsx`

現在:

```tsx
const documentLanguage = snapshot?.state.language ?? "en";
...
const language = snapshot.state.language ?? "en";
```

変更後:

```tsx
const documentLanguage = snapshot?.state.language ?? "ja";
...
const language = snapshot.state.language ?? "ja";
```

上記2箇所以外を、CGW-JP-001の要件だけを理由に変更しない。

### 1.2 保存state

`launcher/electron/state.cjs` の以下は変更しない。

```js
language: null,
```

`null` は「ユーザーがまだ言語を確定していない」状態として維持する。

### 1.3 Onboarding state transition

既存の以下の意味を維持する。

```tsx
snapshot.state.language ? "interaction" : "language"
```

状態遷移:

| Saved language | Initial display language | Initial onboarding stage |
| --- | --- | --- |
| `null` | `ja` | `language` |
| `ja` | `ja` | `interaction` |
| `en` | `en` | `interaction` |
| `zh-CN` | `zh-CN` | `interaction` |
| `zh-TW` | `zh-TW` | `interaction` |
| `ko` | `ko` | `interaction` |

### 1.4 Existing locale ownership

- 一般UI: `launcher/src/i18n.ts`
- Limits UI: `launcher/src/limits-copy.ts`
- 対応locale: `launcher/electron/languages.json`
- native dialog/menu: `launcher/electron/main.cjs` 内の既存native copy

新しい日本語専用component treeは作らない。

## 2. Localization audit contract

CGW-JP-002では、ユーザーに直接見える英語を次の3分類で監査する。

### A. 翻訳対象

- button / label / helper text
- onboarding / settings / activity / limits の説明
- native dialog/menuの純粋な表示文言
- 固定の表示用status

### B. 表示と機械契約が混在しているため要分離

- backend messageを文字列matchしている診断文言
- connector名を含むmessage
- endpoint/path/pidを埋め込むmessage

翻訳する場合は既存の `localizeRuntimeMessage` とplaceholder方式を使い、backend側の契約文字列は維持する。

### C. 翻訳しない

- ChatGPT DOM selector
- connectorの正確な識別名
- MCP tool / protocol field
- HTTP endpoint
- environment variable
- CLI option
- test fixtureが機械契約として検証するliteral
- OpenAI / Codex側が要求する識別子

## 3. C2C review loop contract

### 3.1 Roles

```text
Designer / reviewer:
  codex-with-chatgpt + ChatGPT

Implementer:
  Codex Luna-high

Product repository:
  codex-chatgpt-web/work
```

### 3.2 Review input

レビュー担当は最低限次を独立取得する。

- repository identity
- branch
- git status
- current diff
- 変更対象source
- latest test/build execution record
- 必要なcommand output

実装担当の説明文だけをレビュー根拠にしない。

### 3.3 Review output

レビュー結果は次のどちらか。

```text
PLAN
- blocking finding
- affected file
- expected correction
- required verification

DONE
- acceptance IDs satisfied
- verification evidence checked
- remaining environment-only checks
```

### 3.4 Loop termination

TaskをDoneへ進められるのは、必須AcceptanceとRequired Verificationを満たした場合だけ。

C2C接続自体が利用できない場合:

- 製品実装・local testは継続する。
- review task / environment acceptanceは未完了のまま残す。
- 未実施reviewをPASS扱いにしない。

## 4. Upstream preservation contract

- `main` は明示指示なしに変更しない。
- fork固有の製品コード差分は `work` だけに置く。
- upstream update時は `main` のupstream相当点と `work` のfork差分を分離して比較する。
- 日本語化のための無関係なformat変更・rename・component分割を行わない。
- upstreamが日本語first相当の機能を実装した場合はfork差分を削除できるか確認する。

## 5. Test design inputs

| Requirement | Verification |
| --- | --- |
| FR-JP-001 | `App.tsx` のnull fallbackが `ja`、かつlanguage stage条件が維持されることを回帰テストで確認 |
| FR-JP-002 | 既存state testの全supported language persistenceがPASS |
| FR-JP-003 | i18n型チェック、localization test |
| FR-JP-004 / 005 | user-facing literal監査 + localization test |
| FR-LOOP-001 | C2Cでgit/source/test evidenceを取得した実review cycle |
| FR-UP-001 / 002 | base/head diffでscope外製品変更がないことを確認 |

実施結果はEvidenceへ保存し、Task statusの第二正本を作らない。
