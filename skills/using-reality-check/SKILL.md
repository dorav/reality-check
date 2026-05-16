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

Keep this state privately while working, and surface it when the direction changes, a gate is reached, or the user needs to make a decision.

Track:

- Current phase
- Current assumption
- Biggest risk
- Not proven yet
- Decision needed
- Next checkpoint

Checkpoint example:

> Phase: interface design. Assumption: invitations are persisted before emails are sent. Biggest risk: duplicate pending invites. Not proven yet: retry behavior after email failure. Decision needed: all-or-nothing versus partial success. Next checkpoint: approve API shape before implementation.

Also maintain short ledgers when the work is non-trivial. Keep them short and update them only when new information changes the work:

- Assumptions ledger: what is being assumed and why
- Not-proven-yet ledger: what has not been verified yet
- Decision ledger: important choices and their rationale
- Interface/schema deviation ledger: changes to public, persisted, or domain-level contracts
- Review triage ledger: review comments and their classification

## Intake Classification

Before implementation, classify the work yourself from the user's request and the codebase context.

Use one of these paths:

1. **Established-pattern delivery**: the feature follows an existing architecture and implementation pattern. The task is another instance of something the codebase already knows how to do.
2. **Uncertain-feature path**: product behavior, technical approach, interface shape, safety model, or verification strategy is uncertain.
3. **Review/fix path**: the current task is driven by review comments, failed tests, a bug report, or user dissatisfaction with a previous attempt.
4. **Stop-and-replan path**: the current implementation may be solving the wrong problem.

Tell the user which path you chose in one short sentence. Ask the user to choose only when the difference is a product decision you cannot infer. When unsure, choose the uncertain-feature path.

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

## Gate Responsibilities

Each sub-skill owns its own detailed obligations and examples. Do not treat this root skill as the source of truth for phase details.

Use the phase skills for these gates:

- Product direction: draft golden workflows, clarify terms, identify non-goals, and give the user a chance to correct direction.
- Technical risk: prove risky technology, integration, scaling, safety, or operational assumptions with bounded evidence.
- Interface shape: show diagrams and code-level contracts before new APIs, schemas, domain concepts, source-of-truth models, or agent tools harden.
- Implementation demo: demonstrate the approved workflow through the major moving parts before broad hardening and polish.
- Full delivery: verify build, integration, product behavior, visual state, safety boundaries, and regressions before claiming completion.

If a gate seems unnecessary, state the reason briefly and name the evidence that replaces it. Silent skipping is a process failure.

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
