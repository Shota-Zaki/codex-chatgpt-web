# Evidence and completion

## Record fields

Save records under the existing `docs/evidence/` tree. For every command or verification attempt, keep these fields:

| Field | Required handling |
| --- | --- |
| Repository / Branch / Task / Run / Iteration / Attempt | Exact identity from the remote source and run; no inferred identifiers |
| Base commit / Base tree | Commit/tree that the change was measured from |
| Candidate commit / Candidate tree | GitHub commit/tree actually proposed for Review |
| Tested tree | Exact tree the test or check evaluated; must equal Candidate tree for required Candidate acceptance |
| command / cwd | Exact executable command and working directory; include repeated attempts separately |
| exitCode / status | Observed code and `passed`, `failed`, `not_run`, or `blocked` |
| startedAt / finishedAt | Observed timestamps; write `unknown` if the environment did not expose them |
| model / effort | User-selected values observed in the runtime, otherwise `unknown` |
| output reference / source | Safe output location and origin, such as command log, CI, GitHub, or implementer self-report |

Also record the change scope, acceptance IDs, commit/readback result, Review request/result identity, limits, and unresolved conditions. A follow-up commit that adds only Evidence/checkpoint is not the Candidate that was tested. Keep the two commit identities distinct.

## Status rules

Verification: `passed | failed | not_run | blocked`.

- `passed` only when the command/check ran, returned the required result, and was bound to the intended scope/tree.
- `failed` means it ran and returned a failing result. Keep the command and observed failure.
- `not_run` means no execution occurred. Explain why.
- `blocked` means a required precondition, permission, or input prevented execution.

Review: `accepted | findings | blocked | error` as defined in [review.md](review.md). Workflow state `awaiting_review` means an independent Reviewer has not yet returned an eligible result; it is never an accepted Review.

An absent/truncated log, stale Candidate, wrong Repository, different tested tree, missing required command, or implementer self-report is not a pass. A digest can help check content identity; it does not make evidence tamper-proof or prove independent execution. Preserve earlier failed and `not_run` results even when a later attempt passes.

## Done gate

Done requires all of the following at the same Candidate:

1. Every Task-required Verification is `passed` and its tested tree equals the Candidate tree.
2. A different-context Reviewer fetched the same Candidate from GitHub and returned `accepted`.
3. No blocking Finding remains; every fix has fresh Candidate-bound Verification and Review.
4. Evidence is complete and agrees with the current Task, Candidate, and Review result.

If any condition is missing, keep the Task open, `awaiting_review`, `not_run`, or `blocked` as appropriate. Do not change the original A/B Runtime Evidence when reporting the Skill-first phase.
