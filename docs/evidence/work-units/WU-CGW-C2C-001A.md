# WU-CGW-C2C-001A evidence

## Scope and anchors

- Repository: `Shota-Zaki/codex-chatgpt-web`; branch: `work`; task: `CGW-C2C-001`.
- Work unit: `WU-CGW-C2C-001A`; run: `WU-CGW-C2C-001A-20260926`; iteration: 1; attempt: 1.
- Implementer: Codex. This remote GitHub operation does not expose the exact user-selected model ID or effort, so neither is inferred or recorded as a fixed implementation choice.
- Starting work HEAD: `8897311fc0abfd2ee1bda60f5607330c6f36927e`.
- Fixed source: `Shota-Zaki/codex-with-chatgpt@89af4fa34952fe58e017b095ae2f793420cf05b0`, version `0.1.3`.
- Package candidate commit: `b481365ac7a310fd1a23619242af7d8ce7c9be0a`; candidate tree: `fe7feff94d78ac4c5acbcd3c9649c3e7a892dffa`. This evidence file is a later documentation commit and is not represented as a tested package tree.

## Changes and readback

| Commit | Scope | GitHub readback |
| --- | --- | --- |
| `45a749441b26fe62777e5704a022f3a2923b4ab5` | package.json, pnpm-workspace.yaml, tsconfig.json | All three files, commit and work HEAD retrieved; contents matched intended text. |
| `ae48f98cc14e6288111e2aff7c3af5dcd94abb7d` | pnpm-lock.yaml, vitest.config.ts, LICENSE | All three files, commit and work HEAD retrieved; each blob SHA matched the fixed source. |
| `b481365ac7a310fd1a23619242af7d8ce7c9be0a` | UPSTREAM.json | File, commit and work HEAD retrieved; contents matched intended text. |

The fixed source files were fetched from the exact commit. `UPSTREAM.json` records their observed Git blob SHAs and the local package change. Source `.npmrc` was read (blob `56d20c620227775940e184dfab1d2117833be0d5`) and not adopted because it only selects `.tooling/pnpm-store` for cache placement.

## Static verification

- `package.json` keeps the source dependency/devDependency specifiers, Node engine and pnpm manager. Only the scoped name, private flag and scripts/entry points for unported functionality were changed. The retained scripts are build, test and typecheck; none was executed here.
- The lock is byte-for-byte equal to fixed source blob `88336be7db815addbbd67c86bda9713cc57d284d`. Its importer resolves `@modelcontextprotocol/sdk` to `1.30.0` and `zod` to `3.25.76`; no dependency was re-resolved.
- `pnpm-workspace.yaml` permits only `esbuild` builds. `tsconfig.json` uses `NodeNext` for module and resolution. The original MIT license text and notice are preserved.
- GitHub compare from starting HEAD to the package candidate shows exactly seven added files under `packages/c2c-review/`. Root Bun files, Launcher, `main`, and the source repository did not change.
- No `src/index.ts`, Bridge, MCP server, OAuth, Pairing, Tunnel, service, Host adapter, Development Loop or UI was added. No C2C Runtime was started.

## Verification status

| Verification | Status | Reason |
| --- | --- | --- |
| GitHub source/blob/provenance, package/lock/static scope and independent diff inspection | passed | Fixed-commit fetch, file readback, commit readback, branch HEAD and compare completed. |
| `pnpm install --frozen-lockfile`, C2C typecheck/test/build | not_run | execution environment unavailable for this remote GitHub-only work unit; no dependency installation was performed. |
| Root Bun and Launcher typecheck/test/build/verify | not_run | execution environment unavailable for this remote GitHub-only work unit. |
| Import side-effect test, live C2C connector and runtime acceptance | not_run | The inert entry and test belong to WU-CGW-C2C-001B; live acceptance is later work. |

No unexecuted command is counted as PASS. `CGW-C2C-001` remains Ready until WU-B verification and WU-C checkpoint satisfy its required acceptance. Next work unit: `WU-CGW-C2C-001B`. This record does not authorize implementing it in WU-A.
