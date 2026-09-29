# WU-CGW-C2C-SKILL-002 Evidence

## Run identity and Candidate

- Repository / branch: `Shota-Zaki/codex-chatgpt-web` / `work`
- Task / WU: `CGW-C2C-SKILL-002` / `WU-CGW-C2C-SKILL-002A` (implementation), `WU-CGW-C2C-SKILL-002B` (verification/checkpoint)
- Run / iteration / attempt: `WU-CGW-C2C-SKILL-002-20260930` / 1 / 1
- Implementer: Codex. Selected model / effort: `unknown` (not exposed by captured tools).
- Base commit/tree: `fa01b11f78c4a9ba98f23206a8ed8d6eeaaf413a` / `d4f73ec9693ebc7684371d775a6a55da69326afb`
- Candidate commit/tree: `faeb96747e1b238a2d1125e37177e70ca70ef3ff` / `ad0ab1e7ee1a82c8fa7c10f04e49439833120434`
- Tested tree: `ad0ab1e7ee1a82c8fa7c10f04e49439833120434` (same as Candidate)
- Evidence/checkpoint commit is separate and is not represented as the tested tree.
- Changed files are exactly the six Skill files listed in the Candidate Review packet. No code in `packages/c2c-review`, existing app/runtime/MCP/auth, root or Launcher package/lock, or CI was changed.
- Model, effort, Python version, and tool-log URL: `unknown` / not exposed by captured execution output. Observation source below is the Codex `exec_command` result plus GitHub connector readback.

## Verification

Command cwd for shell checks: `/Users/zaki/.codex/worktrees/c2c-skill-first/codex-chatgpt-web`.

| Command / source | Start–finish UTC | Status | Result / output reference |
| --- | --- | --- | --- |
| `git diff --check` | `2026-09-29T15:34:39Z` – `2026-09-29T15:34:39Z` | passed | No whitespace issues on the committed Candidate tree. Output: this Evidence record and the captured `exec_command` output. |
| Inline Python frontmatter/reference/boundary cross-check (`python3 - <<'PY'`) | `2026-09-29T15:34:39Z` – `2026-09-29T15:34:39Z` | passed | Checked six required paths, exact `name`/`description`-only plain YAML frontmatter subset, name shape, nonempty description, every Markdown reference/asset target, all requested operations/status terms, JSON template fields and blocked default, absence of fixed Mac/C2C Runtime commands, and Review permission state `unknown`. Output: `manifest subset, six-file structure, links, JSON template and boundary checks: PASS`. |
| `python3 -m json.tool .agents/skills/c2c/assets/review-result.json` | `2026-09-29T15:34:39Z` – `2026-09-29T15:34:39Z` | passed | ReviewResult template parses as JSON. Output: `review-result.json: valid JSON`. |
| Inline Python tabletop fixture simulation (`python3 - <<'PY'`) | `2026-09-29T15:34:39Z` – `2026-09-29T15:34:39Z` | passed | Eight scenarios printed PASS: completed WU, wrong repo/candidate, not-run test, absent Reviewer, same-context self-review, review-wait resume without duplicate implementation, Finding to a new Candidate, and finite-limit/cancel/Secret stops. This simulates the documented decision table only; it is not a live Codex/GitHub state-machine execution or an independent Review. Output explicitly states this limitation. |
| GitHub connector fetch of SKILL.md, three references, and two assets at `faeb96747e1b238a2d1125e37177e70ca70ef3ff` | Timestamps not exposed | passed | All six remote blobs were retrieved and each blob SHA matched the committed Candidate; this validates remote-reference file retrieval only, not Native Skill detection or a separate session following the instructions. |
| `/Users/zaki/.codex/skills/.system/skill-creator/scripts/quick_validate.py .agents/skills/c2c` with system Python | Timestamps not exposed | blocked | Validator stopped at `ModuleNotFoundError: No module named 'yaml'`. Retried with the bundled workspace Python; it had the same missing PyYAML module. No package was installed. The official Skill format was checked using the supported `name` and `description` frontmatter fields plus the successful manual structural/link checks above. |

The output source is the current run's Codex tool result. No durable command-log URI was exposed, so none is fabricated. The final static and fixture commands ran after fetching the Candidate commit locally; `HEAD^{tree}` was `ad0ab1e7…` and matched GitHub Candidate tree. GitHub commit and six changed blobs were read back by the connector with matching SHAs.

## Fixture vs operational acceptance

- Safe tabletop fixture cases: `passed` as above.
- Native Skill read/load and `$c2c` invocation: `not_run`. This chat's active checkout remains on the local `main` path; the Skill is repository-scoped on remote `work`. No app-wide or user-wide Skill installation/settings were changed.
- Remote-reference GitHub file retrieval: `passed` for all six files at the exact Candidate commit.
- Separate session opening the supplied remote-reference start prompt and using the Skill: `not_run`.
- Independent Reviewer retrieval and effective read-only GitHub permissions: `awaiting_review`. A filled packet is saved at `docs/evidence/reviews/C2C-SKILL-002-CANDIDATE.md`; no Reviewer was started or simulated as real.
- Real implementation → independent Review → Finding → fix → new Candidate → re-Review operation: `not_run`.
- Existing Runtime tests/verification: unchanged; see WU-CGW-C2C-001B Evidence. Skill-only checks do not alter those results.

## Source attribution and limits

This instruction set adapts the small-WU, GitHub readback, and recovery approach from the read-only fixed source `Shota-Zaki/codex-with-chatgpt@89af4fa34952fe58e017b095ae2f793420cf05b0`, `skill/SKILL.md` blob `ce88111ced6d0a46417dc9542b4648b83db278a5`, licensed under MIT (`LICENSE` blob `718f931a2eda70e424562874c367cd5cf3c9d575`). Fixed paths, custom C2C tools/CLI, Tunnel, Pairing, OAuth, and service setup were not reused. Source repository was not changed.

The tabletop fixture validates only the written decision cases. The package-level `quick_validate.py` result is blocked by its missing Python dependency. No native discovery, actual separate-context review, read-only permission attestation, or full development-loop operational acceptance is claimed.
