---
name: using-reality-check
description: Use when starting feature, review, bug-fix, redesign, rescue, or verification work - decides whether Reality Check applies before coding, patching, or claiming completion.
---

# Using Reality Check

## Purpose

Use this skill to plan and execute product features without losing the user's intended outcome during implementation, review, hardening, or bug-fix loops.

The core rule is:

> Prove direction before polishing implementation. Prove product behavior before declaring success.

Reality Check routes work through focused sub-skills. It is not a rigid report generator. Each phase has obligations: reduce the right uncertainty, expose assumptions, and create a useful checkpoint for the user.

## Start Here

Before implementation, review fixes, redesigns, bug fixes, or completion claims, decide whether Reality Check applies.

Use Reality Check when any of the following are true:

- The user asks to plan, implement, redesign, review, rescue, debug, bug-fix, or verify a feature.
- The feature introduces a new user workflow, domain concept, API, schema, agent behavior, or integration.
- Product behavior, UI flow, domain language, API shape, schema shape, agent behavior, or integration behavior could be misunderstood.
- The implementation depends on unfamiliar technology, unstable SDK behavior, generated output, AI agents, permissions, external systems, persistence, deployment, or difficult verification.
- Previous attempts produced too much review/fix churn or passed tests without satisfying the intended product behavior.
- Review notes, bug reports, failed tests, or redesigns are starting to drive the work more than the original product goal.
- You are about to say the work is done and product-level evidence has not been checked.

For tiny, local, clearly established changes, use the established-pattern delivery path directly.

## Running State

Maintain a lightweight running state throughout the work. Keep it concise; do not turn it into boilerplate.

Track:

- Current phase
- Current assumption
- Biggest risk
- Not proven yet
- Decision needed
- Next checkpoint

Also maintain short ledgers when the work is non-trivial:

- Assumptions ledger: what is being assumed and why
- Not-proven-yet ledger: what has not been verified yet
- Decision ledger: important choices and their rationale
- Interface/schema deviation ledger: changes to public, persisted, or domain-level contracts
- Review triage ledger: review comments and their classification

## Intake Classification

Before implementation, classify the work.

Ask which path applies:

1. **Established-pattern delivery**: the feature follows an existing architecture and implementation pattern. The task is another instance of something the codebase already knows how to do.
2. **Uncertain-feature path**: product behavior, technical approach, interface shape, safety model, or verification strategy is uncertain.
3. **Review/fix path**: the current task is driven by review comments, failed tests, a bug report, or user dissatisfaction with a previous attempt.
4. **Stop-and-replan path**: the current implementation may be solving the wrong problem.

When unsure, choose the uncertain-feature path.

## Paths

### Uncertain-Feature Path

Use this for new concepts, unclear product behavior, risky integrations, AI/agent features, new APIs, new persistence shapes, or anything likely to drift.

Flow:

1. Product alignment
2. Technical risk spike
3. Return to product alignment if technical findings change the product direction
4. Interface design spike with diagrams and code-level contracts
5. Implementation demo spike
6. User inspection checkpoint
7. Established-pattern delivery
8. Review triage as needed
9. Verification gates

### Established-Pattern Delivery Path

Use this when the feature is structurally similar to existing work and the main uncertainty is execution quality.

Flow:

1. Confirm the existing pattern being followed
2. Confirm UI/interface shape if relevant
3. Implement with area-focused tasks and TDD
4. Use curl/manual/e2e/visual checks between tasks where applicable
5. Review triage as needed
6. Verification gates

### Review/Fix Path

Use this when working from review comments, bug reports, or a failed implementation.

Flow:

1. Review triage
2. Root-cause analysis for bugs or repeated failures
3. Stop-and-replan if the fix changes product shape, interface shape, or source of truth
4. Patch only after classification
5. Rerun verification gates, including the golden workflow when applicable

## Sub-Skills

Route to these sub-skills:

- `skills/product-alignment/SKILL.md`
- `skills/technical-risk-spike/SKILL.md`
- `skills/interface-design-spike/SKILL.md`
- `skills/implementation-demo-spike/SKILL.md`
- `skills/established-pattern-delivery/SKILL.md`
- `skills/review-triage/SKILL.md`
- `skills/verification-gates/SKILL.md`
- `skills/stop-and-replan/SKILL.md`

## Phase Gates

### Product Direction Gate

Before meaningful implementation of uncertain work:

- Draft one or more golden workflows from the user's request.
- Define key terms that could be misunderstood.
- Identify non-goals.
- Ask the user to approve, edit, or reject the direction.

### Technical Risk Gate

Before relying on a risky technology or integration:

- Identify the largest technical unknowns.
- Test or demonstrate the unknown parts directly.
- Consider scaling, volatility, safety nets, security, operations, and deployment constraints.
- State what is mocked, hard-coded, incomplete, or still unproven.

### Interface Shape Gate

Before implementing new APIs, persisted schema, domain entities, agent tools, UI contracts, or service boundaries:

- Show the system shape in diagrams.
- Show code-level contracts: types, function signatures, routes, request/response examples, event shapes, or schema sketches.
- Classify which interfaces are public/stable versus internal/provisional.
- Call out concepts that will be painful to change later.

### Implementation Demo Gate

Before full implementation of uncertain work:

- Demonstrate the happy path through all major moving parts.
- Include known non-trivial error paths when the decision matters to product or architecture.
- Use e2e, curl, visual, or manual verification where applicable.
- Pause for user inspection before hardening and full test investment.

### Full Delivery Gate

Before declaring the feature done:

- Build verification passes.
- Integration verification passes.
- Product verification passes against the approved golden workflow.
- Visual verification passes when UI or rendering changed.
- Regression verification passes after review/fix rounds.
- Remaining unverified items are explicitly stated.

## Golden Workflow

A golden workflow is a concrete example of the feature working from the user's perspective. It is not a rigid template and is not automatically a test, although it may later become one.

The assistant should draft the golden workflow from the user's request. The user owns approval.

A good golden workflow describes:

- Starting state
- User action
- Expected result
- Persistence or follow-up behavior if relevant
- What would make the feature fail even if tests pass

Generic example:

> Feature request: Add bulk invite support for teams.
>
> Golden workflow: A team admin opens the members page, uploads a CSV with five email addresses, sees a preview of valid and invalid rows, fixes one invalid row, sends the invites, and sees the invited users appear with pending status. If the admin refreshes the page, the pending invites are still visible. If the admin uploads the same CSV again, existing pending invites are not duplicated.
>
> This fails if the system only accepts one invite at a time, hides invalid rows without explanation, creates duplicate invites, or appears to work in the UI but does not persist after refresh.

## Spikes

A spike is a bounded investigation or demo whose purpose is to reduce uncertainty before committing to full implementation.

Spike types:

- Product alignment spike: reduces uncertainty about what should be built.
- Technical risk spike: reduces uncertainty about whether the technology, integration, safety model, scaling model, or operational approach can work.
- Interface design spike: reduces uncertainty about contracts, domain concepts, and system boundaries. This phase should include diagrams and code-level contracts.
- Implementation demo spike: reduces uncertainty about whether the desired happy path works through all major moving parts.

A spike is not a stealth implementation. It may use mocks, hard-coded data, throwaway scripts, or partial implementations. It must end with clear evidence and remaining uncertainty.

## Review And Fix Discipline

Do not treat review comments as an automatic patch queue.

Classify each review comment first:

- Product blocker
- Safety/security blocker
- Correctness blocker
- Integration blocker
- API/domain concern
- Maintainability/polish
- Defer or won't fix

If review feedback changes product behavior, source of truth, interface shape, or persisted/domain concepts, route back to the relevant spike instead of patching blindly.

After any substantial review/fix round, rerun the product verification gate, not only targeted tests.

## Stop-And-Replan Triggers

Stop patching and replan when any of these happen:

- The user says the result is not what they wanted.
- The implementation passes tests but fails product inspection.
- A core term changes meaning.
- A second redesign happens in the same feature.
- A third review/fix cycle happens without a clean product demo.
- A new persisted schema, domain concept, source-of-truth model, or public interface appears unexpectedly.
- Live/e2e/visual verification contradicts unit-test confidence.
- The agent cannot explain how the current approach satisfies the golden workflow.

Route to `skills/stop-and-replan/SKILL.md`.

## Red Flags

Stop and route through Reality Check when you notice any of these thoughts:

| Thought | Reality Check response |
| --- | --- |
| "This is just implementation." | Confirm the product direction and existing pattern first. |
| "The review comment says exactly what to change." | Classify the comment before patching. |
| "Tests pass, so it is done." | Run the relevant verification gates. |
| "The UI compiles." | Check the actual workflow and visual state. |
| "The API shape can be adjusted later." | Route interface changes through interface design. |
| "The SDK probably works this way." | Spike the risky behavior directly. |
| "One more patch should fix it." | Replan if repeated patches are not converging on the product outcome. |

## Working Style

- Show partial findings early when they affect direction.
- Prefer short checkpoints over long process documents.
- Ask for user approval at phase gates for uncertain work.
- Keep full implementation work area-focused once the direction is known.
- Do not overinvest in tests and polish before proving the intended outcome.
- Do not declare success solely because code was changed or automated tests passed.
