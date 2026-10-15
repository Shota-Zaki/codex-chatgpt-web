# Independent Review Request — broker test termination

Repository: Shota-Zaki/codex-chatgpt-web; branch: work; Task: CGW-QUAL-001; WU: WU-CGW-QUAL-001B; Run: WU-CGW-QUAL-001B-20261015; iteration 1.
Base: 98c500294f6d2b909625028e957edaab492907eb; Candidate: 671a9c25d2a73baf98a2a2a61225747eb5ca8e0f; Candidate/tested tree: c61b94ea6491699c604985401809f6cb945afd20.
Changed path: tests/chatgpt-web-harness.test.ts. Acceptance/Verification: AC-QUAL-001 / V-QUAL-001. Evidence: docs/evidence/work-units/WU-CGW-QUAL-001B.md; design: docs/implementation/WU-CGW-QUAL-001B_PACKET.md.

Use an eligible separate ChatGPT Web/Astra context and independently fetch GitHub Base/Candidate/tree/diff, test and broker callers, Task/acceptance and Evidence. Verify an effective read-only boundary; do not run shell, change files/Git/Tasks, access secrets or administer repositories. Return only project ReviewResult JSON with exact identity, boundary evidence and accepted/findings/blocked/error. Internal debugging is not independent acceptance.

Check that successful calls cannot satisfy the rejection assertions, Error type and both original message conditions remain checked, finally cleanup does not mask a product failure, no skip/timeout inflation occurs and no runtime contract changes. The two-test and original-selection termination results are scope-specific; root whole-suite symlink failures and residual Launcher audit failures remain incomplete. Source startup/renderer/CLI smoke is unpackaged and synthetic, not live or visual acceptance. Note the missing minimal baseline raw log and retained exec metadata; do not infer stronger evidence than recorded.

Workflow: awaiting_review. Parent Task Done still requires all required checks and independent acceptance.
