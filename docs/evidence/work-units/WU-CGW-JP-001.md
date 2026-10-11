# WU-CGW-JP-001 implementation Evidence

## Run and Candidate identity

- Repository / branch: `Shota-Zaki/codex-chatgpt-web` / `work`
- Task / WU: `CGW-JP-001` / `WU-CGW-JP-001`
- Run / iteration / attempt: `WU-CGW-JP-001-20261011` / 1 / 1
- Implementer: Codex. Model / effort: `unknown` (runtime metadata was not available).
- Base commit / tree: `0be25c5257607c45638fc53ba4fd1aeb675f24fa` / `a3a25b55bff27576281893becdfcd7a8755f68b1`
- Candidate commit / tree: `c40569513db245136c21724a01ff4ed3f928b22a` / `05012315913d828ac78a4c60b7186852f46e4116`
- Tested tree: `05012315913d828ac78a4c60b7186852f46e4116` (same tree as Candidate).
- Candidate code was pushed to GitHub `work`; remote branch SHA and changed file contents were read back successfully.

## Change summary

- Changed the document language and renderer copy fallback from `en` to `ja` only when persisted `state.language` is `null`.
- Preserved the onboarding stage check based on the persisted value, so `language: null` still opens language selection. The selected initial choice is Japanese.
- Added a renderer-wiring assertion for both defaults, the language-selection stage, selected value, and language persistence call.
- No saved-state schema, other locales, machine ID, MCP, browser, model, Tunnel, or runtime behavior was changed.

## Verification

All recorded commands ran with cwd `/workspace/codex-chatgpt-web/launcher`. Timestamps are UTC; output source is the exec tool result in this run.

| Verification | Command | Start | Finish | Exit / result |
| --- | --- | --- | --- | --- |
| Launcher tests (includes renderer, localization, and state tests) | `node --test tests/*.test.cjs` | `2026-10-11T04:05:04Z` | `2026-10-11T04:05:10Z` | 0; 347 tests, 346 passed, 1 skipped, 0 failed |
| Typecheck | `./node_modules/.bin/tsc --noEmit` | `2026-10-11T04:05:10Z` | `2026-10-11T04:05:12Z` | 0 |
| Renderer production build | `./node_modules/.bin/vite build` | `2026-10-11T04:05:12Z` | `2026-10-11T04:05:13Z` | 0; 441 modules transformed |
| `git diff --check` | `git diff --check` | Before commit | Before commit | 0 |

`bun` is unavailable in this environment (`bun run test` exited 127: `bun: command not found`). The test suite, TypeScript compiler, and Vite build were run directly using the installed Node tools and all passed. No package or lockfile was changed.

## Independent diff review

- Review status: `awaiting_review`; no separate Reviewer context or result is available in this run.
- Candidate-bound packet: `docs/evidence/reviews/WU-CGW-JP-001-CANDIDATE.md`.
- This implementation Evidence does not claim independent acceptance. Keep the parent Task open until a separate Reviewer returns a result for this exact Candidate and tree.
