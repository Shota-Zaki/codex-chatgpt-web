# Tasks

このJSON blockだけをTask状態の正本とする。有限scopeは `docs/implementation/WORK_UNITS.md` と各Packetを参照する。文書TaskのDoneは製品統合や動的受入のDoneを意味しない。未完了の依存Taskを飛ばさず、独立Ready Taskを進める。

```json
{
  "schema_version": 2,
  "tasks": [
    {
      "id": "CGW-AUD-001",
      "purpose": "固定HEADに基づく主要C2C経路の静的監査・全機能分類を記録する",
      "status": "Done",
      "priority": "P0",
      "dependencies": [],
      "scope": [
        "docs/design/C2C_MIGRATION_AUDIT.md"
      ],
      "acceptance": [
        {
          "id": "AC-AUD-001",
          "condition": "両Repositoryのwork/main、比較、source固定SHAを記録する"
        },
        {
          "id": "AC-AUD-002",
          "condition": "M01〜M24とF01〜F09、確認済み/未精査/未実行を分離する"
        }
      ],
      "verification": [
        {
          "id": "V-AUD-001",
          "required": true,
          "method": "GitHub取得と固定source本文確認、監査文書のreadback。完全監査はCGW-AUD-002へ分離。",
          "acceptance": [
            "AC-AUD-001",
            "AC-AUD-002"
          ],
          "targets": [
            "docs/design/C2C_MIGRATION_AUDIT.md"
          ]
        }
      ],
      "risk": "Repository baselineを誤ると以後の移植判断全体が誤る",
      "complexity": "medium",
      "recommended_capability": "architecture-sensitive",
      "implementation_packet": {
        "state": "not_required",
        "path": null
      },
      "references": [
        "docs/design/REQUIREMENTS.md",
        "docs/design/DETAILED_DESIGN.md",
        "docs/implementation/WORK_UNITS.md",
        "docs/evidence/work-units/WU-CGW-INTEGRATION-PLAN-001.md"
      ]
    },
    {
      "id": "CGW-AUD-002",
      "purpose": "完全監査の未精査範囲を閉じ、移植前レビューを完了する",
      "status": "Done",
      "priority": "P0",
      "dependencies": [
        "CGW-AUD-001"
      ],
      "scope": [
        "docs/design/C2C_MIGRATION_AUDIT.md",
        "docs/evidence/audit/**"
      ],
      "acceptance": [
        {
          "id": "AC-AUD-003",
          "condition": "固定source commitの主要実装、全test本文、PoC、frozen lock/推移的依存、Host接合点まで静的coverageを埋める"
        },
        {
          "id": "AC-AUD-004",
          "condition": "各sourceの固定SHA、Finding、移植判断をEvidenceへ記録し、動的test/build/live/配布受入と区別する"
        }
      ],
      "verification": [
        {
          "id": "V-AUD-002",
          "required": true,
          "method": "AUD-002A/B1/B2/B3/C1/C2/C3のEvidenceとC2C_MIGRATION_AUDITをGitHubからreadbackし、固定source static auditの未読主要範囲がないことを確認する。",
          "acceptance": [
            "AC-AUD-003",
            "AC-AUD-004"
          ],
          "targets": [
            "docs/design/C2C_MIGRATION_AUDIT.md",
            "docs/evidence/audit/**"
          ]
        }
      ],
      "risk": "sourceの防御・欠陥・依存を見落とすと既知リスクをそのまま移植する",
      "complexity": "high",
      "recommended_capability": "architecture-sensitive",
      "implementation_packet": {
        "state": "not_required",
        "path": null
      },
      "references": [
        "docs/design/REQUIREMENTS.md",
        "docs/design/DETAILED_DESIGN.md",
        "docs/implementation/WORK_UNITS.md"
      ]
    },
    {
      "id": "CGW-DES-001",
      "purpose": "製品内C2C統合の要求・権限境界・契約・実装Packetを確定する",
      "status": "Done",
      "priority": "P0",
      "dependencies": [
        "CGW-AUD-002"
      ],
      "scope": [
        "AGENTS.md",
        "docs/project/PROJECT_BRIEF.md",
        "docs/design/REQUIREMENTS.md",
        "docs/design/BASIC_DESIGN.md",
        "docs/design/DETAILED_DESIGN.md",
        "docs/implementation/WORK_UNITS.md",
        "docs/implementation/WU-CGW-C2C-001_PACKET.md"
      ],
      "acceptance": [
        {
          "id": "AC-DES-001",
          "condition": "独立Node C2C、Host adapter、Reviewer read-only、Repository/Snapshot/Evidence/Auth境界を定義する"
        },
        {
          "id": "AC-DES-002",
          "condition": "Implementer=Codex、selected model/effort=runtime user choiceとし、model IDをArchitecture/Taskへ固定しない"
        },
        {
          "id": "AC-DES-003",
          "condition": "Acceptance/Verification、最終Task graph、Work Unit方針、最初のImplementation Packet、利用フローを矛盾なく同期する"
        }
      ],
      "verification": [
        {
          "id": "V-DES-001",
          "required": true,
          "method": "AGENTS/PROJECT_BRIEF/REQUIREMENTS/BASIC_DESIGN/DETAILED_DESIGN/TASKS/WORK_UNITS/initial Packetを相互照合してGitHub readbackする。製品コード実装はこのTaskに含めない。",
          "acceptance": [
            "AC-DES-001",
            "AC-DES-002",
            "AC-DES-003"
          ],
          "targets": [
            "AGENTS.md",
            "docs/project/PROJECT_BRIEF.md",
            "docs/design/REQUIREMENTS.md",
            "docs/design/BASIC_DESIGN.md",
            "docs/design/DETAILED_DESIGN.md",
            "docs/project/TASKS.md",
            "docs/implementation/WORK_UNITS.md",
            "docs/implementation/WU-CGW-C2C-001_PACKET.md"
          ]
        }
      ],
      "risk": "権限境界・snapshot・model選択契約の矛盾は後続実装を全面的に不安定化する",
      "complexity": "high",
      "recommended_capability": "architecture-sensitive",
      "implementation_packet": {
        "state": "not_required",
        "path": null
      },
      "references": [
        "docs/design/REQUIREMENTS.md",
        "docs/design/DETAILED_DESIGN.md",
        "docs/implementation/WORK_UNITS.md",
        "docs/evidence/work-units/WU-CGW-INTEGRATION-PLAN-001.md"
      ]
    },
    {
      "id": "CGW-C2C-001",
      "purpose": "通信しない隔離Node package骨格を作る",
      "status": "Ready",
      "priority": "P0",
      "dependencies": [
        "CGW-AUD-002",
        "CGW-DES-001"
      ],
      "scope": [
        "packages/c2c-review/package.json",
        "packages/c2c-review/pnpm-lock.yaml",
        "packages/c2c-review/pnpm-workspace.yaml",
        "packages/c2c-review/tsconfig.json",
        "packages/c2c-review/vitest.config.ts",
        "packages/c2c-review/LICENSE",
        "packages/c2c-review/UPSTREAM.json",
        "packages/c2c-review/src/index.ts",
        "packages/c2c-review/tests/import-boundary.test.ts"
      ],
      "acceptance": [
        {
          "id": "AC-C2C-001",
          "condition": "importでlisten/spawn/state変更を起こさず、server起動やUIを追加しない"
        },
        {
          "id": "AC-C2C-002",
          "condition": "source lock/NodeNext/MIT/provenanceを維持しroot Bun依存を変更しない"
        },
        {
          "id": "AC-C2C-003",
          "condition": "C2C packageのtest/typecheck/buildと本体の影響確認を実行記録する"
        }
      ],
      "verification": [
        {
          "id": "V-C2C-001",
          "required": true,
          "method": "Packetの設定8ファイル、inert entry/test等4ファイル、checkpoint3文書を別WUで実施。GitHub独立reviewと実行証跡。",
          "acceptance": [
            "AC-C2C-001",
            "AC-C2C-002",
            "AC-C2C-003"
          ],
          "targets": [
            "packages/c2c-review/package.json",
            "packages/c2c-review/pnpm-lock.yaml",
            "packages/c2c-review/pnpm-workspace.yaml",
            "packages/c2c-review/tsconfig.json",
            "packages/c2c-review/vitest.config.ts",
            "packages/c2c-review/LICENSE",
            "packages/c2c-review/UPSTREAM.json",
            "packages/c2c-review/src/index.ts",
            "packages/c2c-review/tests/import-boundary.test.ts"
          ]
        }
      ],
      "risk": "Node/pnpm境界やimport副作用を誤るとBun本体へ依存・起動副作用が漏れる",
      "complexity": "medium",
      "recommended_capability": "routine-implementation",
      "implementation_packet": {
        "state": "ready",
        "path": "docs/implementation/WU-CGW-C2C-001_PACKET.md"
      },
      "references": [
        "docs/design/REQUIREMENTS.md",
        "docs/design/DETAILED_DESIGN.md",
        "docs/implementation/WORK_UNITS.md",
        "docs/implementation/WU-CGW-C2C-001_PACKET.md"
      ]
    },
    {
      "id": "CGW-C2C-002",
      "purpose": "Workspace/Secret共通部を移植しmetadataと読取境界を補強する",
      "status": "Backlog",
      "priority": "P0",
      "dependencies": [
        "CGW-AUD-002",
        "CGW-C2C-001"
      ],
      "scope": [
        "packages/c2c-review/src/workspace/**",
        "packages/c2c-review/src/config/paths.ts",
        "packages/c2c-review/src/logger/**",
        "packages/c2c-review/tests/*workspace*",
        "packages/c2c-review/tests/*search*"
      ],
      "acceptance": [
        {
          "id": "AC-C2C-004",
          "condition": "F01/F06のmetadata・外向きsymlink・同時変更・巨大行を拒否/制限する"
        },
        {
          "id": "AC-C2C-005",
          "condition": "親ignore優先、Secret、rg/Node検索失敗、環境allowlistを保全する"
        }
      ],
      "verification": [
        {
          "id": "V-C2C-002",
          "required": true,
          "method": "共通部/Workspace/検索の3 WUに分け、既存fixtureと追加canaryを実行。",
          "acceptance": [
            "AC-C2C-004",
            "AC-C2C-005"
          ],
          "targets": [
            "packages/c2c-review/src/workspace/**",
            "packages/c2c-review/src/config/paths.ts",
            "packages/c2c-review/src/logger/**",
            "packages/c2c-review/tests/*workspace*",
            "packages/c2c-review/tests/*search*"
          ]
        }
      ],
      "risk": "Workspace escape・Secret metadata漏洩・ignore回避はReviewer境界を破る",
      "complexity": "high",
      "recommended_capability": "architecture-sensitive",
      "implementation_packet": {
        "state": "planned",
        "path": null,
        "note": "Task開始前に5〜10ファイル程度のWork Unitへ分割して作成する"
      },
      "references": [
        "docs/design/REQUIREMENTS.md",
        "docs/design/DETAILED_DESIGN.md",
        "docs/implementation/WORK_UNITS.md"
      ]
    },
    {
      "id": "CGW-C2C-003",
      "purpose": "RepositoryViewとcommit固定Git reviewを実装する",
      "status": "Backlog",
      "priority": "P0",
      "dependencies": [
        "CGW-C2C-002"
      ],
      "scope": [
        "packages/c2c-review/src/workspace/**",
        "packages/c2c-review/tests/*repository*",
        "packages/c2c-review/tests/*git*",
        "packages/c2c-review/tests/*revision*"
      ],
      "acceptance": [
        {
          "id": "AC-C2C-006",
          "condition": "単一/複数Repo・未知ID・曖昧指定・親境界の契約を満たす"
        },
        {
          "id": "AC-C2C-007",
          "condition": "既存diff modeを維持しbase/head/revision、rename両側拒否、stale/失敗/ページングを検証する"
        }
      ],
      "verification": [
        {
          "id": "V-C2C-003",
          "required": true,
          "method": "Repo viewとGit snapshotを別WUにし、commit済み変更をfixtureで独立取得する。",
          "acceptance": [
            "AC-C2C-006",
            "AC-C2C-007"
          ],
          "targets": [
            "packages/c2c-review/src/workspace/**",
            "packages/c2c-review/tests/*repository*",
            "packages/c2c-review/tests/*git*",
            "packages/c2c-review/tests/*revision*"
          ]
        }
      ],
      "risk": "複数Repo混同やstale commit reviewは誤ったcodeを受入対象にする",
      "complexity": "high",
      "recommended_capability": "deep-debug",
      "implementation_packet": {
        "state": "planned",
        "path": null,
        "note": "Task開始前に5〜10ファイル程度のWork Unitへ分割して作成する"
      },
      "references": [
        "docs/design/REQUIREMENTS.md",
        "docs/design/DETAILED_DESIGN.md",
        "docs/implementation/WORK_UNITS.md"
      ]
    },
    {
      "id": "CGW-C2C-004",
      "purpose": "実行証跡v2と限定inboxを実装する",
      "status": "Backlog",
      "priority": "P0",
      "dependencies": [
        "CGW-C2C-003"
      ],
      "scope": [
        "packages/c2c-review/src/execution/**",
        "integrations/c2c/evidence/**",
        "packages/c2c-review/tests/*execution*",
        "tests/c2c-evidence*"
      ],
      "acceptance": [
        {
          "id": "AC-C2C-008",
          "condition": "Repo/Task/run/commit/command/exitと証跡を束縛しlegacy unboundを受入から除外する"
        },
        {
          "id": "AC-C2C-009",
          "condition": "F02/F03の状態領域共有・metadata Secret・欠落/改変body・並行更新を補強する"
        }
      ],
      "verification": [
        {
          "id": "V-C2C-004",
          "required": true,
          "method": "schema/broker、sanitize/store、Host recorderを別WUで検証。テスト自己申告だけをtrustedにしない。",
          "acceptance": [
            "AC-C2C-008",
            "AC-C2C-009"
          ],
          "targets": [
            "packages/c2c-review/src/execution/**",
            "integrations/c2c/evidence/**",
            "packages/c2c-review/tests/*execution*",
            "tests/c2c-evidence*"
          ]
        }
      ],
      "risk": "自己申告・別Repo・古いtest・Secret-bearing outputをtrusted Evidenceへ混入する危険がある",
      "complexity": "high",
      "recommended_capability": "architecture-sensitive",
      "implementation_packet": {
        "state": "planned",
        "path": null,
        "note": "Task開始前に5〜10ファイル程度のWork Unitへ分割して作成する"
      },
      "references": [
        "docs/design/REQUIREMENTS.md",
        "docs/design/DETAILED_DESIGN.md",
        "docs/implementation/WORK_UNITS.md"
      ]
    },
    {
      "id": "CGW-C2C-005",
      "purpose": "OAuth/Pairingと9つのread-only MCPを移植・接続する",
      "status": "Backlog",
      "priority": "P0",
      "dependencies": [
        "CGW-C2C-003",
        "CGW-C2C-004"
      ],
      "scope": [
        "packages/c2c-review/src/auth/**",
        "packages/c2c-review/src/pairing/**",
        "packages/c2c-review/src/mcp/**",
        "packages/c2c-review/src/bridge/server.ts",
        "packages/c2c-review/tests/*oauth*",
        "packages/c2c-review/tests/*mcp*"
      ],
      "acceptance": [
        {
          "id": "AC-C2C-010",
          "condition": "9 toolのallowlistとRepo/証跡adapterを接続しwrite/任意shell/管理toolを公開しない"
        },
        {
          "id": "AC-C2C-011",
          "condition": "PKCE/scope/resource/client/Workspace/refresh/revoke/Pairing/admin拒否を検証する"
        }
      ],
      "verification": [
        {
          "id": "V-C2C-005",
          "required": true,
          "method": "auth、MCP、HTTP/adminの3 WU。隔離stateと合成Workspaceで試験しliveとは分離。",
          "acceptance": [
            "AC-C2C-010",
            "AC-C2C-011"
          ],
          "targets": [
            "packages/c2c-review/src/auth/**",
            "packages/c2c-review/src/pairing/**",
            "packages/c2c-review/src/mcp/**",
            "packages/c2c-review/src/bridge/server.ts",
            "packages/c2c-review/tests/*oauth*",
            "packages/c2c-review/tests/*mcp*"
          ]
        }
      ],
      "risk": "OAuth/resource/scope/Admin境界の欠陥はread-only保証を破る",
      "complexity": "high",
      "recommended_capability": "architecture-sensitive",
      "implementation_packet": {
        "state": "planned",
        "path": null,
        "note": "Task開始前に5〜10ファイル程度のWork Unitへ分割して作成する"
      },
      "references": [
        "docs/design/REQUIREMENTS.md",
        "docs/design/DETAILED_DESIGN.md",
        "docs/implementation/WORK_UNITS.md"
      ]
    },
    {
      "id": "CGW-C2C-006",
      "purpose": "privacy/bootstrap/TunnelとHost lifecycle adapterを統合する",
      "status": "Backlog",
      "priority": "P0",
      "dependencies": [
        "CGW-C2C-005"
      ],
      "scope": [
        "packages/c2c-review/runtime/**",
        "packages/c2c-review/bin/**",
        "packages/c2c-review/src/tunnel/**",
        "packages/c2c-review/src/bridge/runtime.ts",
        "packages/c2c-review/src/process/**",
        "integrations/c2c/runtime/**"
      ],
      "acceptance": [
        {
          "id": "AC-C2C-012",
          "condition": "全Node入口のprivacyと子process envを維持し本体Bunには副作用を与えない"
        },
        {
          "id": "AC-C2C-013",
          "condition": "private namespace、所有者、port、timeout、start/attach/stopを検証し旧serviceを変更しない"
        }
      ],
      "verification": [
        {
          "id": "V-C2C-006",
          "required": true,
          "method": "入口/privacy、Tunnel、Host lifecycleを別WU。fixture外のDNS/credential/service変更を行わない。",
          "acceptance": [
            "AC-C2C-012",
            "AC-C2C-013"
          ],
          "targets": [
            "packages/c2c-review/runtime/**",
            "packages/c2c-review/bin/**",
            "packages/c2c-review/src/tunnel/**",
            "packages/c2c-review/src/bridge/runtime.ts",
            "packages/c2c-review/src/process/**",
            "integrations/c2c/runtime/**"
          ]
        }
      ],
      "risk": "process所有権・Tunnel・private stateの誤操作は別instanceや既存設定へ影響する",
      "complexity": "high",
      "recommended_capability": "architecture-sensitive",
      "implementation_packet": {
        "state": "planned",
        "path": null,
        "note": "Task開始前に5〜10ファイル程度のWork Unitへ分割して作成する"
      },
      "references": [
        "docs/design/REQUIREMENTS.md",
        "docs/design/DETAILED_DESIGN.md",
        "docs/implementation/WORK_UNITS.md"
      ]
    },
    {
      "id": "CGW-C2C-007",
      "purpose": "統合版C2Cの単体機能・Security受入を行う",
      "status": "Backlog",
      "priority": "P0",
      "dependencies": [
        "CGW-C2C-002",
        "CGW-C2C-003",
        "CGW-C2C-004",
        "CGW-C2C-005",
        "CGW-C2C-006"
      ],
      "scope": [
        "packages/c2c-review/tests/**",
        "tests/c2c-*",
        "docs/evidence/c2c-acceptance/**"
      ],
      "acceptance": [
        {
          "id": "AC-C2C-014",
          "condition": "workspace/read/search/git_status/git_diff/test_status/executionを統合版で実行確認する"
        },
        {
          "id": "AC-C2C-015",
          "condition": "Secret/escape/read-only/無認証/別Repo/古い証跡の拒否を実証しtest/typecheck/buildを記録する"
        }
      ],
      "verification": [
        {
          "id": "V-C2C-007",
          "required": true,
          "method": "全tool副作用観測と拒否fixture。本体/Launcher回帰も実行し、未実行は未実行のまま残す。",
          "acceptance": [
            "AC-C2C-014",
            "AC-C2C-015"
          ],
          "targets": [
            "packages/c2c-review/tests/**",
            "tests/c2c-*",
            "docs/evidence/c2c-acceptance/**"
          ]
        }
      ],
      "risk": "静的test存在を実動作PASSへ誤変換する危険がある",
      "complexity": "high",
      "recommended_capability": "deep-debug",
      "implementation_packet": {
        "state": "planned",
        "path": null,
        "note": "Task開始前に5〜10ファイル程度のWork Unitへ分割して作成する"
      },
      "references": [
        "docs/design/REQUIREMENTS.md",
        "docs/design/DETAILED_DESIGN.md",
        "docs/implementation/WORK_UNITS.md"
      ]
    },
    {
      "id": "CGW-ENV-001",
      "purpose": "正しい統合版C2Cへのlive connector接続を受け入れる",
      "status": "Deferred",
      "priority": "P1",
      "dependencies": [
        "CGW-C2C-007"
      ],
      "scope": [
        "docs/evidence/c2c-live/**"
      ],
      "acceptance": [
        {
          "id": "AC-ENV-001",
          "condition": "接続先製品/Workspace/Repository/稼働artifactを確認しworkspace_info等が実動作する"
        },
        {
          "id": "AC-ENV-002",
          "condition": "旧source connectorの復旧だけでは統合版受入にせず、既存Credentialの無断変更を行わない"
        }
      ],
      "verification": [
        {
          "id": "V-ENV-001",
          "required": true,
          "method": "現在はaccount-connect 400で未実施。権限・接続先を確認した正規経路でのみ再開する。",
          "acceptance": [
            "AC-ENV-001",
            "AC-ENV-002"
          ],
          "targets": [
            "docs/evidence/c2c-live/**"
          ]
        }
      ],
      "risk": "誤connector/Workspace/RepositoryやCredential変更でlive受入を偽装する危険がある",
      "complexity": "high",
      "recommended_capability": "architecture-sensitive",
      "implementation_packet": {
        "state": "not_required",
        "path": null
      },
      "references": [
        "docs/design/REQUIREMENTS.md",
        "docs/design/DETAILED_DESIGN.md",
        "docs/implementation/WORK_UNITS.md",
        "docs/design/C2C_MIGRATION_AUDIT.md"
      ]
    },
    {
      "id": "CGW-LOOP-001",
      "purpose": "ユーザー選択Codex implementer→独立C2C Review→Finding→Fix→再Reviewを手動で成立させる",
      "status": "Backlog",
      "priority": "P0",
      "dependencies": [
        "CGW-C2C-007",
        "CGW-ENV-001"
      ],
      "scope": [
        "docs/evidence/manual-loop/**",
        "integrations/c2c/manual/**",
        "tests/fixtures/c2c-loop/**"
      ],
      "acceptance": [
        {
          "id": "AC-LOOP-001",
          "condition": "実行時にユーザーが選択したCodex model/effort、Repository/Task/Run/Iteration、Candidate/TestedTree、command/exitをEvidenceへ記録する"
        },
        {
          "id": "AC-LOOP-002",
          "condition": "独立ReviewerがC2Cだけでsnapshotを読み、実Finding→修正commit→再Verification→再Reviewを少なくとも1循環実証する"
        },
        {
          "id": "AC-LOOP-003",
          "condition": "Reviewerへwrite/shell/admin権限を渡さず、接続失敗時に同じimplementation/commitを自動再実行しない"
        }
      ],
      "verification": [
        {
          "id": "V-LOOP-001",
          "required": true,
          "method": "実証跡でreview-fix-reviewを確認。fixture使用時はその条件を明記し本番へ故意の欠陥を入れない。",
          "acceptance": [
            "AC-LOOP-001",
            "AC-LOOP-002",
            "AC-LOOP-003"
          ],
          "targets": [
            "docs/evidence/manual-loop/**",
            "integrations/c2c/manual/**",
            "tests/fixtures/c2c-loop/**"
          ]
        }
      ],
      "risk": "ReviewerとImplementerの権限混同、stale Evidence、duplicate implementationで独立Reviewが形骸化する",
      "complexity": "high",
      "recommended_capability": "architecture-sensitive",
      "implementation_packet": {
        "state": "planned",
        "path": null,
        "note": "Task開始前に5〜10ファイル程度のWork Unitへ分割して作成する"
      },
      "references": [
        "docs/design/REQUIREMENTS.md",
        "docs/design/DETAILED_DESIGN.md",
        "docs/implementation/WORK_UNITS.md"
      ]
    },
    {
      "id": "CGW-LOOP-002",
      "purpose": "手動受入後に自動Development Loopを実装する",
      "status": "Backlog",
      "priority": "P1",
      "dependencies": [
        "CGW-LOOP-001"
      ],
      "scope": [
        "integrations/development-loop/**",
        "tests/development-loop/**"
      ],
      "acceptance": [
        {
          "id": "AC-LOOP-004",
          "condition": "PLAN/IMPLEMENT/VERIFY/REVIEW/FIX/DONE/BLOCKED/ERROR/CANCELLEDをrun/Task/Repoへ束縛しcheckpoint/resume/dedupeする"
        },
        {
          "id": "AC-LOOP-005",
          "condition": "iteration limit、phase timeout、cancel、retry policy、stale review拒否、duplicate implementation/commit防止を実装する"
        },
        {
          "id": "AC-LOOP-006",
          "condition": "selected modelが利用不能ならBlockedで再選択を要求しsilent fallbackや権限自動昇格を行わない"
        }
      ],
      "verification": [
        {
          "id": "V-LOOP-002",
          "required": true,
          "method": "state machine、review dispatch、復旧を別WUにし障害注入を実行。",
          "acceptance": [
            "AC-LOOP-004",
            "AC-LOOP-005"
          ],
          "targets": [
            "integrations/development-loop/**",
            "tests/development-loop/**"
          ]
        }
      ],
      "risk": "retry/resume設計不備で無限loop・二重実装・duplicate commitを起こす",
      "complexity": "high",
      "recommended_capability": "architecture-sensitive",
      "implementation_packet": {
        "state": "planned",
        "path": null,
        "note": "Task開始前に5〜10ファイル程度のWork Unitへ分割して作成する"
      },
      "references": [
        "docs/design/REQUIREMENTS.md",
        "docs/design/DETAILED_DESIGN.md",
        "docs/implementation/WORK_UNITS.md"
      ]
    },
    {
      "id": "CGW-LAUNCHER-001",
      "purpose": "手動受入後に既存Launcherへ統合状態と操作を追加する",
      "status": "Backlog",
      "priority": "P1",
      "dependencies": [
        "CGW-LOOP-001"
      ],
      "scope": [
        "launcher/src/**",
        "launcher/electron/**",
        "launcher/tests/**"
      ],
      "acceptance": [
        {
          "id": "AC-LAUNCHER-001",
          "condition": "既存i18n/IPC/全localeを使いC2C/Implementer/Review状態、Finding、Verification、Blocked理由、Start/Stop/Resumeを表示する"
        },
        {
          "id": "AC-LAUNCHER-002",
          "condition": "現在のCodex runtime catalogからmodel/effortを選択し、固定model enum/ID対応表を追加しない"
        },
        {
          "id": "AC-LAUNCHER-003",
          "condition": "private token/raw secret outputをRendererへ返さず既存mode/起動とservice所有権を維持する"
        }
      ],
      "verification": [
        {
          "id": "V-LAUNCHER-001",
          "required": true,
          "method": "状態表示、限定操作、i18n回帰を別WU。単一の巨大App.tsx改変を避ける。",
          "acceptance": [
            "AC-LAUNCHER-001",
            "AC-LAUNCHER-002"
          ],
          "targets": [
            "launcher/src/**",
            "launcher/electron/**",
            "launcher/tests/**"
          ]
        }
      ],
      "risk": "private token露出、固定model化、既存i18n/Runtime UI回帰を起こし得る",
      "complexity": "medium",
      "recommended_capability": "routine-implementation",
      "implementation_packet": {
        "state": "planned",
        "path": null,
        "note": "Task開始前に5〜10ファイル程度のWork Unitへ分割して作成する"
      },
      "references": [
        "docs/design/REQUIREMENTS.md",
        "docs/design/DETAILED_DESIGN.md",
        "docs/implementation/WORK_UNITS.md"
      ]
    },
    {
      "id": "CGW-PKG-001",
      "purpose": "Node/C2Cの同梱・provenance・配布物検証を整える",
      "status": "Backlog",
      "priority": "P1",
      "dependencies": [
        "CGW-C2C-006"
      ],
      "scope": [
        "scripts/build-runtime-bundle.ts",
        "launcher/scripts/prepare-runtime.cjs",
        "scripts/smoke-release.ts",
        "tests/c2c-package*",
        "docs/evidence/c2c-package/**"
      ],
      "acceptance": [
        {
          "id": "AC-PKG-001",
          "condition": "built artifactにC2C/必要Node/runtime/通知が含まれclean環境で検証できる"
        },
        {
          "id": "AC-PKG-002",
          "condition": "buildだけを行いRelease/Deploy/signing credential変更を自動実行しない"
        }
      ],
      "verification": [
        {
          "id": "V-PKG-001",
          "required": true,
          "method": "runtime bundle追加、package smokeを別WU。署名/配布/実機不足は明記。",
          "acceptance": [
            "AC-PKG-001",
            "AC-PKG-002"
          ],
          "targets": [
            "scripts/build-runtime-bundle.ts",
            "launcher/scripts/prepare-runtime.cjs",
            "scripts/smoke-release.ts",
            "tests/c2c-package*",
            "docs/evidence/c2c-package/**"
          ]
        }
      ],
      "risk": "Node/C2C/lock/licenseの同梱漏れやplatform差で配布物だけ壊れる可能性がある",
      "complexity": "medium",
      "recommended_capability": "routine-implementation",
      "implementation_packet": {
        "state": "planned",
        "path": null,
        "note": "Task開始前に5〜10ファイル程度のWork Unitへ分割して作成する"
      },
      "references": [
        "docs/design/REQUIREMENTS.md",
        "docs/design/DETAILED_DESIGN.md",
        "docs/implementation/WORK_UNITS.md"
      ]
    },
    {
      "id": "CGW-MAC-001",
      "purpose": "Mac miniで製品全体の24時間運用を受け入れる",
      "status": "Backlog",
      "priority": "P1",
      "dependencies": [
        "CGW-PKG-001",
        "CGW-LOOP-002",
        "CGW-LAUNCHER-001"
      ],
      "scope": [
        "packages/c2c-review/runtime/**",
        "integrations/c2c/macos/**",
        "docs/evidence/mac-24h/**"
      ],
      "acceptance": [
        {
          "id": "AC-MAC-001",
          "condition": "supervisor/worker、UUID/drive脱落・復帰、lock/backoff/log rotation、所有者排他を維持する"
        },
        {
          "id": "AC-MAC-002",
          "condition": "24hのhealth/資源/ログ/再起動とWeb認証・GUI依存を分けて記録する"
        }
      ],
      "verification": [
        {
          "id": "V-MAC-001",
          "required": true,
          "method": "承認済みMac環境の実観測。mockを実機PASSへ変換せず、OS service変更は別承認。",
          "acceptance": [
            "AC-MAC-001",
            "AC-MAC-002"
          ],
          "targets": [
            "packages/c2c-review/runtime/**",
            "integrations/c2c/macos/**",
            "docs/evidence/mac-24h/**"
          ]
        }
      ],
      "risk": "24h運用、volume脱落、所有権競合、log肥大は短時間testでは検出しにくい",
      "complexity": "high",
      "recommended_capability": "deep-debug",
      "implementation_packet": {
        "state": "planned",
        "path": null,
        "note": "Task開始前に5〜10ファイル程度のWork Unitへ分割して作成する"
      },
      "references": [
        "docs/design/REQUIREMENTS.md",
        "docs/design/DETAILED_DESIGN.md",
        "docs/implementation/WORK_UNITS.md"
      ]
    },
    {
      "id": "CGW-PARITY-001",
      "purpose": "sourceとの機能・Security同等性を証拠付きで判定する",
      "status": "Backlog",
      "priority": "P0",
      "dependencies": [
        "CGW-AUD-002",
        "CGW-C2C-007",
        "CGW-PKG-001"
      ],
      "scope": [
        "docs/design/C2C_MIGRATION_AUDIT.md",
        "docs/evidence/c2c-parity/**"
      ],
      "acceptance": [
        {
          "id": "AC-PARITY-001",
          "condition": "M01〜M24とF01〜F09に対する移植/差分/意図的非採用/実行結果を対応付ける"
        },
        {
          "id": "AC-PARITY-002",
          "condition": "依存・配布artifactを含むSecurity検証を行い、未受入や同一OS user隔離の限界を残す"
        }
      ],
      "verification": [
        {
          "id": "V-PARITY-001",
          "required": true,
          "method": "機能比較、Security fixture、依存/配布物監査。既知のsource不備はそのまま継承しない。",
          "acceptance": [
            "AC-PARITY-001",
            "AC-PARITY-002"
          ],
          "targets": [
            "docs/design/C2C_MIGRATION_AUDIT.md",
            "docs/evidence/c2c-parity/**"
          ]
        }
      ],
      "risk": "sourceとの機能・Security差を見落とし同等性を過大評価する危険がある",
      "complexity": "high",
      "recommended_capability": "architecture-sensitive",
      "implementation_packet": {
        "state": "not_required",
        "path": null
      },
      "references": [
        "docs/design/REQUIREMENTS.md",
        "docs/design/DETAILED_DESIGN.md",
        "docs/implementation/WORK_UNITS.md"
      ]
    },
    {
      "id": "CGW-JP-001",
      "purpose": "既存i18nと初回言語選択を維持して日本語firstにする",
      "status": "Ready",
      "priority": "P0",
      "dependencies": [],
      "scope": [
        "launcher/src/App.tsx",
        "launcher/tests/renderer-wiring.test.cjs"
      ],
      "acceptance": [
        {
          "id": "AC-JP-001",
          "condition": "language未選択時はjaで言語選択stageを維持する"
        },
        {
          "id": "AC-JP-002",
          "condition": "保存済み有効localeを優先し他言語を削除しない"
        },
        {
          "id": "AC-JP-003",
          "condition": "state保存形式、MCP/browser/model/Tunnel/runtimeを変更しない"
        }
      ],
      "verification": [
        {
          "id": "V-JP-001",
          "required": true,
          "method": "renderer/localization/state test、Launcher test/typecheck/build、独立diff review。",
          "acceptance": [
            "AC-JP-001",
            "AC-JP-002",
            "AC-JP-003"
          ],
          "targets": [
            "launcher/src/App.tsx",
            "launcher/tests/renderer-wiring.test.cjs"
          ]
        }
      ],
      "risk": "fallback以外を変更するとonboarding/state/他localeへ不要な回帰を作る",
      "complexity": "low",
      "recommended_capability": "mechanical-edit",
      "implementation_packet": {
        "state": "planned",
        "path": null,
        "note": "Task開始前に5〜10ファイル程度のWork Unitへ分割して作成する"
      },
      "references": [
        "docs/design/REQUIREMENTS.md",
        "docs/design/DETAILED_DESIGN.md",
        "docs/implementation/WORK_UNITS.md"
      ]
    },
    {
      "id": "CGW-JP-002",
      "purpose": "ユーザー向け残存英語を監査し既存i18nへ移す",
      "status": "Backlog",
      "priority": "P1",
      "dependencies": [
        "CGW-JP-001"
      ],
      "scope": [
        "launcher/src/**",
        "launcher/electron/**",
        "launcher/tests/**"
      ],
      "acceptance": [
        {
          "id": "AC-JP-004",
          "condition": "表示文言と機械契約を分類し安全な表示だけ翻訳する"
        },
        {
          "id": "AC-JP-005",
          "condition": "既存全localeとlocalization testを維持する"
        }
      ],
      "verification": [
        {
          "id": "V-JP-002",
          "required": true,
          "method": "1表示面ずつ5〜10ファイル以内のWUで監査/変更/回帰を行う。",
          "acceptance": [
            "AC-JP-004",
            "AC-JP-005"
          ],
          "targets": [
            "launcher/src/**",
            "launcher/electron/**",
            "launcher/tests/**"
          ]
        }
      ],
      "risk": "機械契約やselectorまで翻訳するとRuntime連携を壊す可能性がある",
      "complexity": "medium",
      "recommended_capability": "mechanical-edit",
      "implementation_packet": {
        "state": "planned",
        "path": null,
        "note": "Task開始前に5〜10ファイル程度のWork Unitへ分割して作成する"
      },
      "references": [
        "docs/design/REQUIREMENTS.md",
        "docs/design/DETAILED_DESIGN.md",
        "docs/implementation/WORK_UNITS.md"
      ]
    },
    {
      "id": "CGW-UP-001",
      "purpose": "upstream主要機能と将来追従性を検証する",
      "status": "Backlog",
      "priority": "P1",
      "dependencies": [
        "CGW-JP-002",
        "CGW-LOOP-002",
        "CGW-LAUNCHER-001",
        "CGW-PKG-001"
      ],
      "scope": [
        "docs/evidence/upstream/**",
        "docs/design/C2C_MIGRATION_AUDIT.md"
      ],
      "acceptance": [
        {
          "id": "AC-UP-001",
          "condition": "mainとの差分が局所化され、source/base出自と再適用手順がある"
        },
        {
          "id": "AC-UP-002",
          "condition": "本体/Launcherの全検証と主要modeの回帰を確認しmainを変更しない"
        }
      ],
      "verification": [
        {
          "id": "V-UP-001",
          "required": true,
          "method": "固定baseとのdiff、scratch上の追従検証、test/typecheck/build/verify。未検証は残す。",
          "acceptance": [
            "AC-UP-001",
            "AC-UP-002"
          ],
          "targets": [
            "docs/evidence/upstream/**",
            "docs/design/C2C_MIGRATION_AUDIT.md"
          ]
        }
      ],
      "risk": "統合差分がupstream追従不能な形へ拡大する危険がある",
      "complexity": "high",
      "recommended_capability": "architecture-sensitive",
      "implementation_packet": {
        "state": "planned",
        "path": null,
        "note": "Task開始前に5〜10ファイル程度のWork Unitへ分割して作成する"
      },
      "references": [
        "docs/design/REQUIREMENTS.md",
        "docs/design/DETAILED_DESIGN.md",
        "docs/implementation/WORK_UNITS.md"
      ]
    },
    {
      "id": "CGW-FIN-001",
      "purpose": "全ての必須受入と証拠を確認して統合完成を判定する",
      "status": "Backlog",
      "priority": "P0",
      "dependencies": [
        "CGW-AUD-002",
        "CGW-C2C-007",
        "CGW-ENV-001",
        "CGW-LOOP-001",
        "CGW-LOOP-002",
        "CGW-LAUNCHER-001",
        "CGW-MAC-001",
        "CGW-PARITY-001",
        "CGW-JP-002",
        "CGW-UP-001"
      ],
      "scope": [
        "docs/evidence/final/**",
        "docs/project/TASKS.md"
      ],
      "acceptance": [
        {
          "id": "AC-FIN-001",
          "condition": "全必須Acceptanceを対象code anchorと実行証跡で確認し、Blocked/not_runをPASSにしない"
        },
        {
          "id": "AC-FIN-002",
          "condition": "Accepted HistoryとCurrent Validationを分離し、公開の承認とは別に完成を報告する"
        }
      ],
      "verification": [
        {
          "id": "V-FIN-001",
          "required": true,
          "method": "Evidence実体・SHA・Repository/Task/Run/Iteration/Candidate/TestedTree/model/effort/command/exit・独立reviewを監査し、Current Validationだけで判定する。",
          "acceptance": [
            "AC-FIN-001",
            "AC-FIN-002"
          ],
          "targets": [
            "docs/evidence/final/**",
            "docs/project/TASKS.md"
          ]
        }
      ],
      "risk": "過去PASS・Blocked・別snapshotのEvidenceを混ぜると未完成をDone判定する",
      "complexity": "high",
      "recommended_capability": "architecture-sensitive",
      "implementation_packet": {
        "state": "not_required",
        "path": null
      },
      "references": [
        "docs/design/REQUIREMENTS.md",
        "docs/design/DETAILED_DESIGN.md",
        "docs/implementation/WORK_UNITS.md"
      ]
    }
  ]
}
```
