# Tasks

このJSON blockだけを構造化情報の正本とする。

```json
{
  "schema_version": 1,
  "tasks": [
    {
      "id": "CGW-JP-001",
      "purpose": "既存i18nと初回言語選択を維持したまま、新規ユーザーの初回表示を日本語-firstにする",
      "status": "Ready",
      "priority": "P0",
      "scope": [
        "launcher/src/App.tsx",
        "launcher/tests/renderer-wiring.test.cjs"
      ],
      "dependencies": [],
      "references": [
        "docs/design/REQUIREMENTS.md",
        "docs/design/DETAILED_DESIGN.md"
      ],
      "acceptance": [
        {
          "id": "AC-JP-001",
          "condition": "language未選択時のRenderer表示言語がjaで、言語選択stage自体は維持される"
        },
        {
          "id": "AC-JP-002",
          "condition": "保存済みの有効localeは従来どおり優先され、他言語サポートを削除しない"
        },
        {
          "id": "AC-JP-003",
          "condition": "state保存形式、MCP、browser、model、Tunnel、runtimeの挙動を変更しない"
        }
      ],
      "verification": [
        {
          "id": "V-JP-001",
          "required": true,
          "method": "renderer/localization/state回帰テスト、launcher typecheck/build、diff review",
          "acceptance": [
            "AC-JP-001",
            "AC-JP-002",
            "AC-JP-003"
          ],
          "targets": [
            "launcher/src/App.tsx",
            "launcher/tests/renderer-wiring.test.cjs",
            "launcher/tests/localization.test.cjs",
            "launcher/tests/state.test.cjs"
          ]
        }
      ]
    },
    {
      "id": "CGW-JP-002",
      "purpose": "既存i18nを利用してユーザー向け残存英語を監査し、安全な箇所だけ日本語化する",
      "status": "Backlog",
      "priority": "P1",
      "scope": [
        "launcher/src/**",
        "launcher/electron/**",
        "launcher/tests/**"
      ],
      "dependencies": [
        "CGW-JP-001"
      ],
      "references": [
        "docs/design/DETAILED_DESIGN.md"
      ],
      "acceptance": [
        {
          "id": "AC-JP-004",
          "condition": "ユーザー向け英語残存箇所が分類され、機械契約文字列を壊さず必要な表示文言だけ既存i18nへ移される"
        },
        {
          "id": "AC-JP-005",
          "condition": "既存の全localeとlocalization testが維持される"
        }
      ],
      "verification": [
        {
          "id": "V-JP-002",
          "required": true,
          "method": "hard-coded user-facing literal監査、launcher test/typecheck/build、C2C diff review",
          "acceptance": [
            "AC-JP-004",
            "AC-JP-005"
          ],
          "targets": [
            "launcher/src/i18n.ts",
            "launcher/src/limits-copy.ts",
            "launcher/tests/localization.test.cjs"
          ]
        }
      ]
    },
    {
      "id": "CGW-LOOP-001",
      "purpose": "Codex Luna-high実装とcodex-with-chatgpt独立レビューの反復ループをcodex-chatgpt-webで受入する",
      "status": "Ready",
      "priority": "P0",
      "scope": [
        "AGENTS.md",
        "docs/project/**",
        "docs/design/**",
        "docs/evidence/**"
      ],
      "dependencies": [],
      "references": [
        "docs/design/BASIC_DESIGN.md",
        "docs/design/DETAILED_DESIGN.md"
      ],
      "acceptance": [
        {
          "id": "AC-LOOP-001",
          "condition": "Luna-highがworkへ実装し、codex-with-chatgptがC2Cでsource/diff/test記録を独立取得してレビューできる"
        },
        {
          "id": "AC-LOOP-002",
          "condition": "review findingがある場合は次Work Unitへ戻し、Acceptanceを満たすまで反復できる"
        },
        {
          "id": "AC-LOOP-003",
          "condition": "codex-chatgpt-web側へC2C Bridgeの重複実装を追加しない"
        }
      ],
      "verification": [
        {
          "id": "V-LOOP-001",
          "required": true,
          "method": "CGW-JP-001の実装を対象に1回以上のC2C review cycleを実行し、取得したdiff/test/sourceとreview結果をEvidence化する",
          "acceptance": [
            "AC-LOOP-001",
            "AC-LOOP-002",
            "AC-LOOP-003"
          ],
          "targets": [
            "AGENTS.md",
            "docs/evidence/**"
          ]
        }
      ]
    },
    {
      "id": "CGW-ENV-001",
      "purpose": "Mac miniの統合Workspaceからcodex-with-chatgpt C2Cでcodex-chatgpt-webを安定して参照できることを実環境受入する",
      "status": "Deferred",
      "priority": "P1",
      "dependencies": [],
      "references": [
        "docs/design/DETAILED_DESIGN.md"
      ],
      "blocker": {
        "cause": "このChatGPTセッションからC2C workspace_infoを呼び出した際にconnector内部エラーとなり、実Workspace参照を検証できていない",
        "impact": "GitHub上の設計・実装準備は継続できるが、C2C live reviewの成立をPASSにはできない",
        "resume_condition": "Mac mini上のC2C BridgeとConnectorが正常化し、workspace_infoでcodex-chatgpt-web repositoryを取得できる"
      }
    },
    {
      "id": "CGW-UP-001",
      "purpose": "upstream更新時にmain相当とfork固有work差分を分離して追従できる運用を検証する",
      "status": "Backlog",
      "priority": "P1",
      "dependencies": [
        "CGW-JP-001"
      ],
      "references": [
        "docs/design/BASIC_DESIGN.md"
      ],
      "acceptance": [
        {
          "id": "AC-UP-001",
          "condition": "upstream更新を取り込んでも日本語first差分とProject管理層を局所差分として再適用できる"
        }
      ]
    }
  ]
}
```
