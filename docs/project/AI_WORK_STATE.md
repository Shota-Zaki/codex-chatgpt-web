# AI Work State

このJSON blockだけを再開情報の正本とする。Task状態は `docs/project/TASKS.md`、次の有限WUは `docs/project/NEXT_WORK.md` を参照する。

```json
{
  "schema_version": 2,
  "branch": "work",
  "main_commit": "293341084ac7a1ddd2de12fede3706023f5b6474",
  "observed_work_head_before_this_checkpoint": "07805ee4c10d26d59714eaa7875b4d72dc9bf135",
  "checkpoint_id": "CGW-C2C-SKILL-001",
  "pending_changes": [
    "AGENTS.md",
    "docs/project/PROJECT_BRIEF.md",
    "docs/project/TASKS.md",
    "docs/project/NEXT_WORK.md",
    "docs/project/AI_WORK_STATE.md",
    "docs/design/REQUIREMENTS.md",
    "docs/design/BASIC_DESIGN.md",
    "docs/design/DETAILED_DESIGN.md",
    "docs/design/C2C_MIGRATION_AUDIT.md"
  ],
  "source": {
    "repository": "Shota-Zaki/codex-with-chatgpt",
    "fixed_work_commit": "89af4fa34952fe58e017b095ae2f793420cf05b0",
    "modified": false
  },
  "current_status": {
    "CGW-AUD-001": "Done",
    "CGW-AUD-002": "Done",
    "CGW-DES-001": "Done (prior Runtime proposal; superseded for current phase)",
    "CGW-C2C-001": "Ready (Deferred Runtime; 001A/B artifacts preserved)",
    "CGW-C2C-SKILL-001": "Ready",
    "CGW-C2C-SKILL-002": "Backlog",
    "CGW-C2C-SKILL-003": "Backlog",
    "CGW-JP-001": "Ready",
    "CGW-ENV-001": "Deferred (Runtime)"
  },
  "resume_notes": [
    "2026-09-30: source of truth is GitHub Shota-Zaki/codex-chatgpt-web/work. Live remote read returned work 07805ee4c10d26d59714eaa7875b4d72dc9bf135 and main 293341084ac7a1ddd2de12fede3706023f5b6474; re-read before every write. The original workspace checkout remains on main and is untouched.",
    "WU-CGW-C2C-001A/B already ran. Do not recreate package/index/tests. Preserve packages/c2c-review, LICENSE, UPSTREAM.json and both evidence files as deferred Runtime history.",
    "001B candidate 3da307be6ecb87638d8fada4b712f77822732447/tree 614a16ee1ddc2a0751ca76dbab6f0eafd369f01e had four root bun test failures (two named tests and two timeout tests as listed in its Evidence); bun run verify failed at bun audit for fast-uri@3.1.6 (high) and ip-address@10.3.1 (moderate). No comparison baseline rerun was recorded. Keep these failures failed; do not infer pre-existing causes.",
    "New phase target is one instruction-only .agents/skills/c2c entry using existing Codex Runtime + existing GitHub integration. No new C2C MCP/OAuth/Pairing/Tunnel/daemon/server/broker/Launcher integration or paid API.",
    "The fixed read-only source remains Shota-Zaki/codex-with-chatgpt@89af4fa34952fe58e017b095ae2f793420cf05b0. If adapting its Skill, preserve source attribution and MIT licensing; omit fixed Mac paths and its old C2C-only tools/CLI operations.",
    "Task status is in TASKS, next work is in NEXT_WORK, resume state here, Evidence in docs/evidence. Skill acceptance and Deferred Runtime acceptance are separate. Native Skill discovery, remote-reference use, fixtures, separate Reviewer read-only permissions, and full operational loop each need distinct evidence.",
    "No separate Reviewer context has been invoked. Same-context self-review cannot be marked independent. Save a Review Packet and use awaiting_review until a separate ChatGPT Web/Astra session independently fetches the named Candidate from GitHub with read-only access.",
    "Execution fields: Repository/Branch/Task/Run/Iteration/Attempt/Base/Candidate commit and tree/Tested tree/command/cwd/exitCode/start/finish/model/effort/output/source. Never guess unobserved metadata or retarget past runs. Verification=passed|failed|not_run|blocked; Review=accepted|findings|blocked|error.",
    "Finite retries/iterations/deadlines; cancel prevents next phase. Reviewer failure resumes review, never duplicates implementation. Finding fix binds to a new candidate and fresh Verification. Secret, token, cookie, key, and restricted log data never enter skill, evidence, packet, or GitHub.",
    "Current WU: WU-CGW-C2C-SKILL-001A. Previous NEXT_WORK was stale (pointed to already completed 001A); the next WU will update WORK_UNITS and the Skill Implementation Packet. Current design/task changes are uncommitted in isolated worktree; before commit re-fetch remote work and reapply on concurrency."
  ]
}
```
