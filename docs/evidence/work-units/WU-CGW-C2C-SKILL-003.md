# WU-CGW-C2C-SKILL-003 operational paths Evidence

## Run and Candidate identity

- Repository / branch: `Shota-Zaki/codex-chatgpt-web` / `work`
- Task / WU: `CGW-C2C-SKILL-003` / `WU-CGW-C2C-SKILL-003A`
- Run / iteration / attempt: `WU-CGW-C2C-SKILL-003A-20260930` / 1 / 1
- Implementer: Codex. Model / effort: `unknown` (not available in tool output).
- Base/checkpoint commit: `9ac913fecc1ce65d870b0f3dde94a04d6d0cf109`
- Skill Candidate under evaluation: `faeb96747e1b238a2d1125e37177e70ca70ef3ff`
- Candidate tree: `ad0ab1e7ee1a82c8fa7c10f04e49439833120434`
- The Candidate tested for static/fixture checks is unchanged. This Evidence/checkpoint commit is not substituted for it.

## Native Skill path

- Verification: `not_run`.
- Reason: The active Codex thread is attached to the original local `main` checkout; the repository-scoped Skill exists on remote `work` and in a separate managed worktree. This thread did not expose a native Skill discovery/call confirmation for that worktree. No local/global installation, app setting, credential, or launcher setting was changed.
- Safe setup/use steps for a supported Codex environment:
  1. Open `Shota-Zaki/codex-chatgpt-web` on the `work` branch in a Codex workspace where `.agents/skills/c2c/SKILL.md` is present.
  2. Confirm that the environment actually discovers the repository Skill and invoke `$c2c`. Record the observed invocation result and Candidate/branch.
  3. If it is not discovered, use the remote-reference prompt below. Do not treat the GitHub commit as proof of Native discovery and do not change user-wide configuration to force it.

## Remote-reference path

- GitHub connector retrieval: `passed` for the exact Skill Candidate commit. The existing GitHub connection fetched all six files by their path and returned these blob SHAs:

| Path | Remote blob SHA |
| --- | --- |
| `.agents/skills/c2c/SKILL.md` | `9edfd6624a5093f80734d6bc586e7e182f37c823` |
| `.agents/skills/c2c/references/workflow.md` | `3d1591ab2472fbc4b24bf025f1f3893a50efa597` |
| `.agents/skills/c2c/references/review.md` | `e83f12405d4d39f24fe012539f9ec822a8ff2930` |
| `.agents/skills/c2c/references/evidence.md` | `b6f8d9b2bde0d9137e40ef043fde28041164f320` |
| `.agents/skills/c2c/assets/review-request.md` | `caa1baf808ddf7e307431314563548b3046f696e` |
| `.agents/skills/c2c/assets/review-result.json` | `3f58becb5cdfa608c9650b4131c8edb526d48474` |

- Verification scope: fetch and blob readback only. Timestamps and durable connector-output URL were not exposed. Output source: GitHub connector result in this task, summarized in this record.
- Running a separate consumer session with the prompt: `not_run`. No second Codex/ChatGPT context was started.

Reusable remote-reference start prompt:

```text
Use the existing GitHub connection to fetch the current `work` version of `.agents/skills/c2c/SKILL.md` from Shota-Zaki/codex-chatgpt-web, plus only the references/assets it links. Follow it as remote instructions; do not claim native Skill discovery. Start with `$c2c` and report the source commit.
```

This is manual file retrieval, not automatic Native Skill detection.

## Independent Reviewer

- Review workflow: `awaiting_review`.
- Review status: `not_run`; no separate Reviewer context was created or contacted. The implementer did not self-review and does not claim independent acceptance.
- Candidate-bound packet: `docs/evidence/reviews/C2C-SKILL-002-CANDIDATE.md`.
- The remote Review must fetch the same repository/branch/base/candidate and confirm the actual effective read-only boundary. If unavailable or not demonstrably read-only, retain `awaiting_review`/`blocked`.

## Operational acceptance summary

| Path | Result | Meaning |
| --- | --- | --- |
| Native discovery and `$c2c` invocation | `not_run` | Follow the setup steps above in a supported repository-scoped Codex workspace |
| GitHub retrieval of Candidate Skill/references/assets | `passed` | Six paths fetched from Candidate and blob identities matched |
| Remote-reference consumer session | `not_run` | The prompt is ready; no separate consumer was started |
| Separate Review and permissions | `awaiting_review` | Packet saved, result absent |
| Full implement → Review → Finding → fix → re-Review | `not_run` | Tabletop fixtures do not count as operational loop acceptance |

`CGW-C2C-SKILL-003` remains open. A returned Reviewer JSON must be saved in `docs/evidence/reviews/C2C-SKILL-002-RESULT.json`, checked against this Candidate, and followed by a synchronized Task checkpoint. Findings require a new Candidate and fresh Verification/Review.
