# Stop And Replan Skill

## Purpose

Use this skill when continuing to patch is likely to waste time or harden the wrong design.

The goal is to stop the loop, identify the wrong assumption, and choose a new direction deliberately.

## When To Use

Trigger this skill when any of the following happen:

- The user says the result is not what they wanted.
- The implementation passes tests but fails product inspection.
- A core term changes meaning.
- A second redesign happens in the same feature.
- A third review/fix cycle happens without a clean product demo.
- A new persisted schema, source-of-truth model, domain concept, or public interface appears unexpectedly.
- Live/e2e/visual verification contradicts unit-test confidence.
- Review feedback changes product behavior or interface shape.
- The agent cannot explain how the current approach satisfies the golden workflow.
- Bug fixes are addressing symptoms without a stable root cause.

## Core Rule

Stop patching.

Do not continue implementation until the direction is revalidated. Patching under a wrong product or architecture assumption increases sunk cost and makes the later redesign harder.

## Replan Obligations

Clarify:

- What happened
- What assumption was wrong or unproven
- What evidence exposed the problem
- What parts of the current work are reusable
- What parts should be discarded
- Which options are available
- Which spike or delivery path should run next
- What decision the user needs to make

Do not bury uncertainty. Make it visible.

## Common Replan Routes

Route back to product alignment when:

- The user-visible behavior is wrong.
- Key terms were misunderstood.
- The golden workflow was missing or inadequate.
- UI shape or product flow is wrong.

Route back to technical risk spike when:

- The chosen technology cannot do what was assumed.
- Runtime, scaling, deployment, security, or SDK behavior is uncertain.
- New failures suggest the technical boundary is not understood.

Route back to interface design spike when:

- The source of truth is wrong or unclear.
- The API/schema/domain shape is unstable.
- Review/fix work requires new contracts.
- A new concept appears that will be hard to change later.

Route to implementation demo spike when:

- Product and interface shape are plausible but have not been proven through the major moving parts.

## Handling Existing Work

Separate reusable work from sunk cost.

Reusable examples:

- tests that capture real desired behavior
- isolated adapters
- useful schema validation
- clarified failure cases
- verification scripts
- review findings

Likely discardable examples:

- broad implementation built around the wrong source of truth
- UI that exposes the wrong mental model
- schema fields based on unstable product semantics
- tests that lock in wrong behavior
- hardening for an implementation path no longer chosen

## Exit Criteria

Leave this skill only when:

- The wrong assumption is identified.
- The next route is selected.
- The user has enough information to approve the new direction.
- No further patching happens under the old assumption.
