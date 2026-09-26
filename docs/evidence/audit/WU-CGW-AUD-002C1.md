# WU-CGW-AUD-002C1 — C2C core test audit

- Audit type: static source inspection only
- Source repository: `Shota-Zaki/codex-with-chatgpt`
- Fixed source commit: `89af4fa34952fe58e017b095ae2f793420cf05b0`
- Tests were **not executed** in this WU. Presence/assertion review is not a runtime PASS.

## Files inspected

| File | Fixed blob |
| --- | --- |
| tests/helpers.ts | `fe8fc5ae3ded02c1a7e0ed4ec64be83bf2bf5bc0` |
| tests/workspace.test.ts | `a19a6f20acf551f99a5f8a043a112f4124af3d59` |
| tests/workspace-privacy.test.ts | `e50b563683618ded285474dd435c5b41ea4acabe` |
| tests/search.test.ts | `4d460f456d46d85fb5472c835c35e2517378193f` |
| tests/git.test.ts | `94f0354b277ee63005801509ef1657b3499f8c13` |
| tests/execution-output.test.ts | `5db48ebb642004889d09f6c614952276dfdf97d3` |
| tests/mcp-integration.test.ts | `695c6db26e95ff362a0c57865333139e0fdfafac` |
| tests/oauth.test.ts | `6d371d95598ee6e4516d8b7b2d6f02774fca8e6e` |

## Confirmed coverage

- Workspace traversal, absolute-path escape, symlink escape, common Secret paths, `.c2cignore`, binary rejection and line pagination.
- Parent `.c2cignore` deny cannot be negated by a child rule; per-directory rules are refreshed; symlink/oversized ignore files fail closed.
- Search strips common secret/injection environment variables, hides sensitive/noise paths, supports limits/globs/subdirectory search and ripgrep/Node engines.
- Git environment filtering, staged/unstaged/untracked status, sensitive-path suppression, diff pagination and sensitive rename provenance are tested.
- Execution output sanitizes bearer/pairing-shaped values and home paths, rejects private-key bodies and limits large logs.
- MCP integration exposes exactly nine V1 read-only tools and rejects a sample set of write/shell tool names. Per-tool OAuth scopes are exercised.
- OAuth covers discovery, PKCE S256, pairing, browser security headers, HTML escaping, one-time authorization codes, token expiry/revoke, Workspace binding and refresh-token rotation.

## Gaps that remain requirements for the integrated product

1. **F01 metadata policy**: `.c2c.json` and `package.json` project detection are positively tested, but the tests do not prove that metadata uses the same ignore/Secret policy as normal reads.
2. **F04 Repository/Snapshot**: tests are single-Workspace oriented. There is no explicit Repository selector, base/candidate commit range, revision-pinned read, stale snapshot or commit-after-clean-working-tree acceptance fixture.
3. **F03 Evidence v2**: output body sanitization exists, but metadata Secret sanitization, read-time revalidation, body integrity/missing-body detection and Repository/Task/Run/Iteration/commit binding are not covered.
4. **Search/Git failure semantics**: timeout/error/incomplete results are not comprehensively distinguished from an empty successful result.
5. **F07 OAuth strictness**: unknown-scope semantics, explicit resource binding, Repository binding and trusted public-base/proxy behavior remain additional fixtures.

## Migration decision

The existing tests are useful regression fixtures but are not the integrated-product acceptance suite. Preserve proven defensive behavior, add the missing Repository/Snapshot/Evidence/Security fixtures, and do not mark F01–F07 resolved from static test presence alone.
