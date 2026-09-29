# WU-CGW-C2C-SKILL-001 design and packet Evidence

## Run identity and candidate

- Repository / branch: `Shota-Zaki/codex-chatgpt-web` / `work`
- Task / WU: `CGW-C2C-SKILL-001` / `WU-CGW-C2C-SKILL-001A` + `WU-CGW-C2C-SKILL-001B`
- Run / iteration / final attempt: `WU-CGW-C2C-SKILL-001-20260930` / 1 / 4
- Implementer: Codex. Selected model and effort: `unknown` (not exposed in the captured tool output).
- Starting Base commit: `07805ee4c10d26d59714eaa7875b4d72dc9bf135`
- Final design/packet Candidate commit: `7354dff3de49e9331ce98f998b6f51c3cc63b5d0`
- Candidate tree / tested tree: `f90a154a6acfe4e8ad0eda983c6fa9c831b977f4` / same
- Later Evidence/checkpoint commit is not the tested Candidate. The source-of-truth branch may advance after that Evidence commit; do not retarget this record.
- Candidate changes comprise commit `7b6de71461277bf7bb8a3089bdf578cda992b571` (9 files: current policy/design/task graph) and commit `7354dff3de49e9331ce98f998b6f51c3cc63b5d0` (8 files: acceptance correction, finite WUs, Skill Packet and NEXT/checkpoint). The latter changed paths: `docs/design/BASIC_DESIGN.md`, `docs/design/DETAILED_DESIGN.md`, `docs/design/REQUIREMENTS.md`, `docs/implementation/WORK_UNITS.md`, `docs/implementation/WU-CGW-C2C-001_PACKET.md`, `docs/implementation/WU-CGW-C2C-SKILL_PACKET.md`, `docs/project/AI_WORK_STATE.md`, `docs/project/NEXT_WORK.md`.

## Existing work preserved

`WU-CGW-C2C-001A/B` and their records were read from remote `work` before this change. Their code/evidence files and `packages/c2c-review` have no changed paths from the starting HEAD. The A/B acceptance and B's failures remain in [001A Evidence](WU-CGW-C2C-001A.md) and [001B Evidence](WU-CGW-C2C-001B.md): root `bun run test` failed with four tests and `bun run verify` failed at `bun audit` advisories. No baseline rerun was made; this Evidence makes no claim about when those failures began.

## Verification attempts

Each command was run in `/Users/zaki/.codex/worktrees/c2c-skill-first/codex-chatgpt-web`. Time values are the UTC timestamps printed by the shell; the tool did not expose model/effort or a durable log URL. Output source is the Codex `exec_command` result for this run, summarized in this Evidence.

| Attempt | Command / start–finish | Status | Output / scope |
| --- | --- | --- | --- |
| 1 | `git diff --check` + inline Python static assertions; `2026-09-29T15:14:05Z` / finish not separately captured | failed | Python detected that Requirements lacked the exact Verification/Review status contract (it was then present only in Detailed Design). Corrected Requirements in WU-001B; do not count this attempt as passing. This first check targeted the then-current commit `7b6de71461277bf7bb8a3089bdf578cda992b571` / tree `31ac9cd99be0e3497edbb8bc9e1d975c4f31f749`. |
| 2 | Inline Python check expecting the literal `[Deferred Runtime]` in the legacy Packet; start `2026-09-29T15:21:56Z` / finish not captured | failed | Assertion expectation was too specific: the packet had already labeled it “Deferred Node/MCP Runtime track.” This was a checker mismatch, not a changed acceptance result. |
| 3 | Inline Python cross-check with the same over-specific `Skill-first` literal expectation in AGENTS; exact start/finish not captured | failed | AGENTS states the phase change in Japanese and names Codex Skill / existing Runtime / GitHub, without that English phrase. This was a checker mismatch. |
| 4 | `git diff --check`; `2026-09-29T15:23:25Z` / `2026-09-29T15:23:25Z` | passed | No whitespace errors on committed Candidate tree `f90a154a…`. |
| 4 | Inline Python cross-check: parse fenced JSON in TASKS/NEXT_WORK/AI_WORK_STATE; unique Task IDs; all dependencies resolve; verify Runtime vs Skill phases; verify checkpoint Base; require exact Verification/Review enums in Requirements and Detailed Design; resolve required source-of-truth paths and legacy Packet/WU labels. `2026-09-29T15:23:25Z` / `2026-09-29T15:23:25Z` | passed | All 11 individual checks printed PASS. Tested at HEAD `7354dff3…`, whose tree equals the Candidate tree above. The printed output also confirmed the exact eight WU-001B changed paths. |
| 4 | `git diff --name-only 07805ee4…..HEAD -- docs/evidence/work-units/WU-CGW-C2C-001A.md docs/evidence/work-units/WU-CGW-C2C-001B.md packages/c2c-review`; same start/finish as above | passed | Output `no`: prior A/B Evidence and package paths were not changed. |

The final successful cross-check tests the version-controlled Candidate tree; the two checker-mismatch failures remain visible above. No product code, root/Launcher package, lockfile, CI, source repository, main, or existing runtime/auth configuration was changed.

## Acceptance state

- Skill-first design / Task split / finite WU plan / packet / commit readback: `passed`.
- Separate independent Reviewer for this document-only design work: `not_run`; no separate Reviewer context was started. This status is not represented as a review acceptance. Skill-candidate Review remains mandatory under `CGW-C2C-SKILL-003`.
- Native Skill load and `$c2c` invocation: `not_run` (Skill files are not yet created).
- Remote-reference use, fixture workflow, runtime tests, existing Runtime acceptance: `not_run` here.
- Existing parent Runtime Task `CGW-C2C-001`: still `Ready`, tagged `Deferred Runtime`; it is not Done. The root test/audit failures above remain failed as reported by the earlier candidate's Evidence.

## Source attribution

The workflow retains only generally applicable small-WU/readback/recovery ideas from [`Shota-Zaki/codex-with-chatgpt@89af4fa34952fe58e017b095ae2f793420cf05b0` `skill/SKILL.md`](https://github.com/Shota-Zaki/codex-with-chatgpt/blob/89af4fa34952fe58e017b095ae2f793420cf05b0/skill/SKILL.md), blob `ce88111ced6d0a46417dc9542b4648b83db278a5`. That source repository is unchanged. Source license is MIT (`LICENSE` blob `718f931a2eda70e424562874c367cd5cf3c9d575`); no source implementation, Mac path, C2C-only CLI/tool contract, Tunnel, or service instruction was copied into this design.

## Next work

After this Evidence and checkpoint commit, `docs/project/NEXT_WORK.md` advances to `WU-CGW-C2C-SKILL-002A` to create the six instruction-only Skill files. The Native, remote-reference, fixture, independent-review and full loop acceptance stays separate.
