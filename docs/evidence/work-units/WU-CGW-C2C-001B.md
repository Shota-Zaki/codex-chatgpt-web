# WU-CGW-C2C-001B evidence

## Scope and anchors

- Repository: `Shota-Zaki/codex-chatgpt-web`; branch: `work`; task: `CGW-C2C-001`.
- Work unit: `WU-CGW-C2C-001B`; run: `WU-CGW-C2C-001B-20260929`; iteration: 1; attempt: 1.
- Starting work HEAD: `1a0c7c544465ef70d81f3b300ef63126990e781d`.
- Candidate package commit: `3da307be6ecb87638d8fada4b712f77822732447`.
- Candidate and tested tree: `614a16ee1ddc2a0751ca76dbab6f0eafd369f01e`.
- Fixed source: `Shota-Zaki/codex-with-chatgpt@89af4fa34952fe58e017b095ae2f793420cf05b0`.
- Implementer: Codex. The runtime does not expose the selected model ID or effort to this evidence operation; neither is inferred.
- Verification host: macOS arm64; Node `v26.9.0`, pnpm `11.24.0`, Bun `1.4.0`.

## Changes

| Path | Change |
| --- | --- |
| `packages/c2c-review/src/index.ts` | Exports package identity, fixed-source provenance, a contract marked `inert-skeleton`, and its type. Values are literals and frozen objects only. |
| `packages/c2c-review/tests/import-boundary.test.ts` | Checks the exported contract, statically restricts entry-point statements to pure exported constants/types, and observes common startup, network, filesystem-write, and timer APIs during import. |
| `packages/c2c-review/UPSTREAM.json` | Adds two `local` entries with null source paths and blob SHAs; the existing seven provenance records remain intact. |
| `docs/evidence/work-units/WU-CGW-C2C-001B.md` | Records this run and verification. |

The test observes child-process spawn/fork/exec APIs, common filesystem write APIs, server listen, socket/TLS connection, `fetch`, timers, and compares cwd, environment, and exit code before and after import. Its limitation is that these spies do not prove absence of every possible native/runtime side effect, and this one entry-point test does not establish read-only behavior for future package functionality or all future tools. The source-shape check disallows imports and non-literal top-level execution in this entry point.

No Bridge, MCP server, OAuth, Pairing, Workspace reader, Evidence broker, Tunnel, service, Development Loop, UI, or live C2C behavior was added or started. The C2C source repository was read-only.

## Verification

Commands ran against the candidate tree before the evidence-only commit. Package commands used the pinned pnpm `11.24.0`; root and Launcher commands used Bun `1.4.0`.

| Command / cwd | Status | Result |
| --- | --- | --- |
| `node --version` / package cwd | passed | `v26.9.0` |
| `pnpm --version` / package cwd | passed | `11.24.0` |
| `pnpm install --frozen-lockfile` / `packages/c2c-review` | passed | Lockfile frozen; SDK `1.30.0`, Zod `3.25.76`; lock unchanged. |
| `pnpm run typecheck` / `packages/c2c-review` | passed | Exit 0. |
| `pnpm run test` / `packages/c2c-review` | passed | 1 test passed. |
| `pnpm run build` / `packages/c2c-review` | passed | Exit 0. |
| `bun install --frozen-lockfile` / repository root | passed | Exit 0; root lock unchanged. |
| `bun install --frozen-lockfile` / `launcher` | passed | Exit 0; Launcher lock unchanged. |
| `bun run typecheck` / repository root | passed | Exit 0. |
| `bun run test` / repository root | failed | 777 passed, 3 skipped, 4 failed of 784. Failures: `an absolute deadline never hides a failed personalization rollback` (timeout), `passkey login authenticates in normal Chrome before isolated offline pipe capture`, `production and DEV setup reject the removed connector-name option before configuration`, and `multipart planning leaves room for final attachments and execution instructions without losing history` (timeout). These are outside the changed paths; no baseline rerun was performed. |
| `bun run build` / repository root | passed | Exit 0. |
| `bun run --cwd launcher typecheck` | passed | Exit 0. |
| `bun run --cwd launcher test` | passed | 344 passed, 2 platform skips, 0 failed. |
| `bun run --cwd launcher build` | passed | Exit 0. |
| `bun run verify` / repository root | failed | Version sync passed. `bun audit` stopped the gate on four locked-dependency advisories: two high for `fast-uri@3.1.6`, two moderate for `ip-address@10.3.1`. Later subcommands inside this gate were not run; the relevant typecheck/test/build commands are reported separately above. Dependency and lock changes are outside this WU. |

The first root test attempt used a temporary checkout and Bun path, which the repository's durable-runtime guard rejected. The recorded root-suite result above is from the corrected verification checkout outside the guard's temporary roots. A first root typecheck invocation also lacked that temporary Bun directory on `PATH`; its corrected invocation passed.

## Acceptance and GitHub readback

- `AC-C2C-001`: passed for this entry point within the stated observation limits; import-boundary test passed. This is not a claim about future C2C tools or full read-only acceptance.
- `AC-C2C-002`: passed; package lock, NodeNext, MIT, source provenance, root Bun files, Launcher, and fixed source were preserved.
- `AC-C2C-003`: verification was executed and recorded, but not all required results passed: the root suite had four failures and `bun run verify` stopped at audit. Do not mark the parent Task Done at WU-C.
- GitHub readback of candidate commit `3da307be6ecb87638d8fada4b712f77822732447` returned all three changed paths. Compare from the starting HEAD showed only the three code/provenance paths above. The evidence file is added in a separate commit.
- `main` remained `293341084ac7a1ddd2de12fede3706023f5b6474`; root `bun.lock` and `launcher/bun.lock` were unchanged.
- `not_run`: C2C Runtime, live connector, and live review acceptance; these are outside WU-B.
- `blocked`: none.

Next work unit: `WU-CGW-C2C-001C`, the three-document checkpoint. Keep `CGW-C2C-001` Ready; Required Verification includes failures that must remain visible in the checkpoint.
