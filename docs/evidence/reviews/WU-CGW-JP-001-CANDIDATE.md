# Independent Review Request — CGW-JP-001

Review the exact GitHub candidate independently. Fetch the repository and files directly; do not rely on the implementer's summary as evidence. Review only the bounded diff and its stated acceptance criteria. Do not run commands, make changes, or access/write other repositories.

## Review target

- Repository: `Shota-Zaki/codex-chatgpt-web`
- Branch: `work`
- Task / WU: `CGW-JP-001` / `WU-CGW-JP-001`
- Base commit: `0be25c5257607c45638fc53ba4fd1aeb675f24fa`
- Candidate commit: `c40569513db245136c21724a01ff4ed3f928b22a`
- Candidate tree: `05012315913d828ac78a4c60b7186852f46e4116`
- Evidence: `docs/evidence/work-units/WU-CGW-JP-001.md`
- Changed code paths: `launcher/src/App.tsx`, `launcher/tests/renderer-wiring.test.cjs`
- Work Unit catalogue: `docs/implementation/WORK_UNITS.md`

## Acceptance questions

1. When persisted `state.language` is absent (`null`), do both the document language and rendered copy default to Japanese?
2. Does the null value still keep the onboarding language-selection stage visible, with Japanese as its initial selected value?
3. Are saved valid locales and all other language behavior preserved?
4. Are the changes limited to the described fallback and regression assertion, without changing saved state format or unrelated runtime behavior?
5. Do the recorded verification results correspond to the named candidate tree, and are there blocking findings?

## Required result

Return a JSON result containing the exact repository, branch, task, WU, base commit, candidate commit, candidate tree, reviewer context identity/type, effective access boundary, review status (`accepted`, `findings`, `blocked`, or `error`), and Findings with file/line/severity when present. Do not report `accepted` unless the target identity and independent read-only review context are verified. Do not include credentials or secrets.
