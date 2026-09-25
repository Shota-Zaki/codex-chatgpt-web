# Work Unit: WU-CGW-BOOTSTRAP-001

## Target

- Repository: `Shota-Zaki/codex-chatgpt-web`
- Branch: `work`
- Start commit: `293341084ac7a1ddd2de12fede3706023f5b6474`
- Command intent: forkをupstream追従可能な日本語-first + C2C review運用へ初期化する
- Product code changed: no

## Changes

- `AGENTS.md`: fork固有のBranch、役割分担、日本語化、C2C review契約を追加。
- `docs/project/PROJECT_BRIEF.md`: 目的と境界を定義。
- `docs/design/REQUIREMENTS.md`: 日本語化・review loop・upstream維持要件を定義。
- `docs/design/BASIC_DESIGN.md`: 責務とデータフローを定義。
- `docs/design/DETAILED_DESIGN.md`: 最初の2行変更を含む実装契約を定義。
- `docs/project/TASKS.md`: TaskとAcceptanceを定義。
- `docs/project/NEXT_WORK.md`: Luna-high向け最初のWork Unitを定義。
- `docs/project/AI_WORK_STATE.md`: 再開checkpointを保存。

## Impact classification

| Area | Decision |
| --- | --- |
| implementation | unchanged。製品コードは変更していない |
| requirements | update。日本語-first、C2C review、upstream維持を定義 |
| architecture | update。実装担当とreview担当の責務を分離 |
| contracts | update。初回locale fallbackとreview evidence契約を定義 |
| rules | unchanged。共通Rules 3.1.1を参照し、Snapshot複製は今回行わない |
| tasks | update |
| resume | update |
| verification | update。次Work Unitのrequired verificationを定義 |
| publication | unchanged。mainは変更しない |

## Validation

GitHub上で各追加ファイルをreadbackして内容とbranch反映を確認する。
Product test/buildは製品コード未変更のため本Work Unitでは実行対象外。

C2C live接続はこのChatGPTセッションでは内部エラーとなったため、`CGW-ENV-001` へ分離する。
