# WU-CGW-AUD-002C2 — C2C support test audit

- Audit type: static source inspection only
- Source repository: `Shota-Zaki/codex-with-chatgpt`
- Fixed source commit: `89af4fa34952fe58e017b095ae2f793420cf05b0`
- Tests were not executed.

## Files inspected

| File | Fixed blob |
| --- | --- |
| tests/cli-workspace-flag.test.ts | `6883d3f9104d7d234d9e0d9d1064e0708a8f8872` |
| tests/config-paths.test.ts | `3acb95a0a70b791ccda140236688864d8eb7774f` |
| tests/endpoint.test.ts | `81ffba3de6563c38d30a994f3164fdef0af60047` |
| tests/logger.test.ts | `11ff3aac1f7cd78b055f19017073c38cd18c3272` |
| tests/pairing.test.ts | `015968da562bc92b0c23e0fe8191ff0dbda51bfe` |
| tests/port.test.ts | `e39535a6c5c7fc2d9a1e484d0fd01e08eaaa4cb0` |
| tests/prefs.test.ts | `6ad21b55ab5e5ebaa313a0975ae94d4b3546e870` |
| tests/record-cli.test.ts | `c2c9200b5569288028a73df73e11daae296d1785` |

## Confirmed coverage

- Machine-wide CLI commands tolerate a leftover Workspace flag.
- Secure state JSON is written atomically with owner-only permissions where applicable and refuses symlink state files.
- Connector endpoint normalization/naming behavior is tested.
- Logger repairs restrictive permissions and refuses symlink log targets.
- Pairing is one-time, expires, limits attempts and rate-limits by IP.
- Bridge binding remains loopback-only; port collisions choose another port; public health does not expose Workspace identity.
- UI prefs keep setup choice separate from credentials.
- `c2c record` validates numeric fields before persistence.

## Migration notes

- Connector naming/UI localization from the source is not copied as a second UI system; the host product's existing i18n and connector ownership remain canonical.
- Source execution records are too weak for integrated acceptance: validation of iteration/counts is retained, but the schema must become Evidence v2 with Repository/Task/Run/Iteration/Candidate/TestedTree/model/effort/command/cwd/timestamps/exit/output binding.
- Port fallback is acceptable only inside the private Node runtime. The Host adapter must bind the selected runtime instance to the resulting endpoint and must never infer identity from “some healthy port”.
