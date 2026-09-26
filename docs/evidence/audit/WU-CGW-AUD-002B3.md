# WU-CGW-AUD-002B3 — PoC, dependency lock and host integration-point audit

- Audit type: static source inspection only
- C2C source fixed commit: `89af4fa34952fe58e017b095ae2f793420cf05b0`
- Host repository inspected at `Shota-Zaki/codex-chatgpt-web/work@3f949f8fb73208de1a72341cbf27ec28f11de4a6`
- No install/test/typecheck/build/live network acceptance was executed.

## Source PoC and package boundary

| File | Fixed blob |
| --- | --- |
| scripts/poc-client.mjs | `f4abaacd0c4fd7cf0a67d829c4ac7e56a0c174b0` |
| package.json | `097780c636d5bb240ccc94814f8b36a9d008a4d5` |
| pnpm-lock.yaml | `88336be7db815addbbd67c86bda9713cc57d284d` |
| pnpm-workspace.yaml | `5ed0b5af0d45919f64c66edfb16a5f4512461fa1` |

The PoC performs unauthenticated 401 discovery → OAuth metadata → dynamic client registration → pairing + PKCE → token exchange → MCP tool list → `workspace_info`/`read_file`, and confirms `.env` denial. It demonstrates the intended protocol sequence only; it does not bind Repository/base/candidate/TestedTree and does not replace integrated acceptance.

The frozen lock resolves the declared `@modelcontextprotocol/sdk: latest` to **1.30.0** and Zod to **3.25.76** at this source point. The lock contains the complete transitive graph (including Express/Hono/Jose/Ajv and build/test tooling); `pnpm-workspace.yaml` permits build scripts only for `esbuild`. Migration must copy the fixed lock/provenance rather than re-resolve `latest`. Static lock inspection is not a vulnerability scan; installed/bundled dependency acceptance remains CGW-PARITY-001/CGW-PKG-001.

## Host integration points

| Host file | Blob at inspected work HEAD | Decision |
| --- | --- | --- |
| src/service.ts | `93289a9c52b51c22c3ac05fae1f7e26e30632ff2` | Existing Responses daemon ownership/drain remains separate. |
| src/process.ts | `54623285cab1d00a20d3b268fc9b1be29beb4ff1` | Generic process helpers may inform adapters; no Reviewer shell surface. |
| launcher/electron/runtime.cjs | `96910bb2a0ac1fc3402f7a42759b5b8ac7d1b2cf` | Later Host lifecycle integration point; Renderer must not receive private C2C tokens. |
| launcher/electron/runtime-supervisor.cjs | `682cdd40285cca3354dab005f4a7b27c7fd89d37` | Existing owner/PID/restart safety should be reused conceptually, not bypassed. |
| launcher/electron/control-server.cjs | `2c9c5651fbe3e84e326f0cf6e24c27f68e3f6e4d` | Existing loopback/token pattern informs private control plane. |
| scripts/build-runtime-bundle.ts | `19df81075cfd5d19db73ac6fa762983c11161c4c` | C2C/Node packaging hook belongs in later packaging task. |
| launcher/scripts/prepare-runtime.cjs | `824f9dadbf84f7bfcc2d4dff712fd54b81d955bb` | Packaging orchestration remains host-owned. |
| src/adapters/chatgpt-web/mcp-server.ts | `822809459d54c86b035c439947e4a2dda587a744` | **Do not merge C2C Reviewer tools here**: this existing MCP surface intentionally bridges Codex write/exec/tool capabilities. |

## Implementer model integration points

| Host file | Blob | Finding |
| --- | --- | --- |
| src/model-catalog.ts | `3820878ecffd6206881a5f6c901c9b1c9afa8226` | Runtime catalog already preserves native models and augments available Web routes. |
| src/config.ts | `8a64e6032a2feb9e7ab0792bd2cf6af2285906bf` | Provider configuration exposes current model/effort capability rather than one architectural model. |
| src/cli.ts | `006da679ae74532ec6da71bd575d9dbccf261083` | DEV chat already has a `--model MODEL` selection surface. |
| launcher/src/App.tsx | `e9d3fac8840cd5b407697e56d58fa650609afc9b` | Existing i18n fallback is currently `en`; planned Japanese-first change remains a local fallback change. |

Therefore Development Loop must treat the implementer model as an **opaque runtime-selected Codex model reference + effort**, not as a fixed Luna/Terra/Sol/Astra enum. Capability labels in Tasks are advisory only. Missing/unavailable selected models cause a blocked selection state; there is no silent fallback.

## Static audit conclusion

The remaining source PoC/package and host-adapter connection points are now statically classified. Dynamic tests, live connector acceptance, packaging, Mac 24h behavior and integrated security parity remain intentionally separate acceptance tasks and are not PASS here.
