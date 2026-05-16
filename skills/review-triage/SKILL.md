---
name: review-triage
description: Use when receiving PR feedback, reviewer notes, failed tests, bug reports, or repeated fix requests - classifies issues before patching so fixes preserve product intent.
---

# Review Triage Skill

## Purpose

Use this skill to process review comments without turning them into an endless blind patch queue.

The goal is to preserve product intent while fixing real issues.

## When To Use

Use this skill when:

- A PR receives review comments.
- An automated reviewer or agent suggests fixes.
- The user asks to address review notes.
- A bug-fix loop is becoming repetitive.
- Review feedback may change product behavior, interface shape, source of truth, safety model, or architecture.

## Core Rule

Classify before patching.

Do not automatically apply review comments just because they are plausible. Decide whether each comment is a blocker, a valid improvement, a product/API concern, or something to defer.

## Categories

Classify each comment as one of:

- Product blocker: contradicts the intended user behavior or golden workflow
- Safety/security blocker: creates permission, privacy, secret, sandbox, injection, auth, or fail-open risk
- Correctness blocker: causes wrong state, data loss, stuck runs, invalid output, or broken behavior
- Integration blocker: breaks route/service/UI/runtime/deployment integration
- API/domain concern: changes or questions source of truth, schema, domain entity, event shape, or public contract
- Maintainability/polish: improves clarity, performance, readability, or future safety without blocking correctness
- Defer / won't fix: valid but out of scope, not worth cost now, duplicate, or based on a rejected assumption

## Actions

For each category:

- Product blocker: route to product alignment or stop-and-replan before patching
- Safety/security blocker: patch promptly and add verification that proves the boundary
- Correctness blocker: identify root cause, patch, and test the original failure mode
- Integration blocker: patch and run integration/manual checks
- API/domain concern: route to interface design if the change is high risk
- Maintainability/polish: patch if low-risk and scoped; otherwise defer
- Defer / won't fix: record the reason clearly

## Duplicate And Repeated Comments

Collapse duplicate comments before patching.

If the same issue appears multiple times, fix the root cause once and verify the class of failures, not each duplicated symptom separately.

If new review rounds keep finding issues in the same area, trigger stop-and-replan or a targeted technical/interface spike.

## Product Verification After Fixes

After substantial review/fix work, rerun the golden workflow or product verification.

A feature can become safer and more correct while drifting away from the desired user outcome. Review triage must prevent that.

## Response Discipline

When reporting back:

- State what was fixed and why.
- State what was deferred or rejected and why.
- Mention the verification performed.
- Mention if product/API direction changed.

Do not claim a review note is fixed unless the relevant behavior has been verified.

## Exit Criteria

Leave this skill only when:

- Review comments are classified.
- Patches have been applied only where appropriate.
- High-risk product/API/domain changes have been routed back to the right skill.
- The original product workflow has not been lost.
- Verification gates can be rerun.
