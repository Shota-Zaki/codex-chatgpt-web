# Independent Review Request — Launcher dependencies

Repository: Shota-Zaki/codex-chatgpt-web; branch: work; Task: CGW-SEC-001; WU: WU-CGW-SEC-001B; Run: WU-CGW-SEC-001B-20261015; iteration/attempt 1/1.
Base: 15d9b132436a53bd508d45b9fd6b020db3c604e5; Candidate: 570e21a33bbe4061e28bcb923f2e87184581a38d; Candidate/tested tree: 5bb367f4c3769d42b7040b9e59fe4c5bc83f5c10.
Changed paths: launcher/package.json, launcher/bun.lock, launcher/tests/dependency-security.test.cjs.
Acceptance/Verification: AC-SEC-001 / V-SEC-001. Evidence: docs/evidence/work-units/WU-CGW-SEC-001B.md. Packet: docs/implementation/WU-CGW-QUAL-001_PACKET.md.

Use an eligible separate ChatGPT Web/Astra context. Independently fetch the exact GitHub Base/Candidate/tree, complete diff, package callers, Task/acceptance and Evidence. Verify actual effective read-only GitHub permissions; do not run commands, edit files, write Git/Task state, administer repositories or access secrets. A write-enabled context without demonstrated restriction cannot claim read-only acceptance. Return only project assets/review-result.json shape, with exact identity, reviewer boundary, accepted/findings/blocked/error and source-backed Findings.

Check each corrected resolution, preserved major/API/direct-version/lock semantics, hostile and legitimate controls, unchanged root/auth/locales/packaging behavior and no hidden vulnerable duplicate. Examine the two unpatched advisory paths without treating absence of a proven product exploit as package advisory closure. Full Launcher suite remains failed at file-symlink EPERM; verify remains failed at residual Launcher audit; packaged GUI/download/proxy/TLS behavior is not proved by library controls. Determine blocking regressions or evidence mismatches; no Task Done based solely on reduced advisory count.

Review workflow: awaiting_review. No eligible independent Result is supplied. Internal patch review does not substitute for this gate.
