# Independent Review

## Reviewer context and permissions

The standard Reviewer is a separate ChatGPT Web/Astra context. The implementer may use a separate Codex session or subagent only if the user explicitly chooses it. A context that implemented the Candidate is not independent, even if it adopts a reviewer role later.

The Reviewer must fetch the stated Repository, Branch, Base, Candidate, diff, relevant source files, Acceptance, and Evidence from GitHub itself. The implementer's summary may orient the Reviewer but cannot replace retrieval. Reviewer gets read-only instructions and no implementation, arbitrary shell, Git write, or repository administration. Inspect the effective tools and inherited permissions. If the available context cannot satisfy this boundary, return `blocked` or keep the workflow `awaiting_review` instead of claiming read-only operation.

Do not launch an external model, contact another person, switch models, or collect results through an unapproved channel. The implementer provides the review request to the authorized separate context and collects its result through the user-approved workflow.

## Retrieval and identity checks

Before reading for findings, verify:

1. Repository exactly matches the packet.
2. Branch, Base commit, Candidate commit, and Candidate tree exactly match the packet.
3. The Base exists and the complete Base-to-Candidate diff is available.
4. Changed source, acceptance, verification records, and referenced Evidence are available from that Repository.
5. No supplied result is stale, truncated, missing, from another repo/branch, or bound to a different Candidate.
6. The Reviewer did not implement the Candidate and has no write/shell/admin actions in the review workflow.

For any mismatch, do not judge it as an accepted Review. Return `blocked` with the precise mismatch and missing data. An error retrieving GitHub is `error`; preserve the packet so the implementer can retry review without recreating the Candidate.

## Review outcome

Return the project-owned JSON shape in [../assets/review-result.json](../assets/review-result.json). Its statuses are:

- `accepted`: every required acceptance was checked against this Candidate; no blocking Finding remains.
- `findings`: one or more actionable Findings are present.
- `blocked`: identity, access boundary, or required input is missing or mismatched.
- `error`: retrieval/review failed before a reliable judgment could be made.

Each Finding should identify a stable ID, severity, affected path and line (when known), acceptance ID, concrete evidence, and remediation. Distinguish a code issue from missing verification. Do not mark test status `passed` from code inspection alone. Do not change files or save the Result to the repository; return it to the implementer for storage and Task updates.

## After Review

The implementer verifies the returned `identity` against GitHub and saves the result under `docs/evidence/`. `accepted` on a stale or different Candidate does not satisfy current acceptance. For `findings`, create a bounded fix WU and new iteration/attempt; produce a new Candidate, bind fresh Verification to its tree, and send a new Review packet. For `blocked` or `error`, retain the same Candidate and resume at Review when the issue is resolved.
