# AI Work State

このJSON blockだけを構造化情報の正本とする。

```json
{
  "schema_version": 1,
  "branch": "work",
  "base_commit": "293341084ac7a1ddd2de12fede3706023f5b6474",
  "checkpoint_id": "WU-CGW-BOOTSTRAP-001",
  "pending_changes": [],
  "resume_notes": [
    "Fork時点のupstream相当HEADは293341084ac7a1ddd2de12fede3706023f5b6474（v6.1.0）。mainは変更しない。",
    "upstreamには既にREADME.ja.md、launcher/src/i18n.tsのja辞書、limits-copy.tsのja辞書、languages.jsonのja localeが存在する。",
    "日本語firstはstate既定値を変えず、App.tsxのnull fallbackだけをjaへ変更する設計。言語選択画面を維持する。",
    "現在の標準実装担当はCodex Luna-high。実装後はShota-Zaki/codex-with-chatgptの既存C2C read-only review loopでdiff/source/test evidenceを独立確認する。",
    "CodeX-Chat-Developは構成から除外済みで、今後依存させない。",
    "このChatGPTセッションからC2C workspace_infoを呼び出すとconnector内部エラーになったため、live C2C受入はCGW-ENV-001としてDeferred。Repository上の作業は継続する。"
  ]
}
```
