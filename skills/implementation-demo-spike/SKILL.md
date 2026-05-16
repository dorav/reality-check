---
name: implementation-demo-spike
description: Prove an intended workflow can run through the major moving parts before investing in production hardening, broad tests, or polish. Use after product, technical, and interface direction are plausible but the integrated happy path still needs evidence through UI, API, persistence, SDKs, model behavior, workers, filesystem, or browser rendering.
---

# Implementation Demo Spike Skill

## Purpose

Use this skill to prove that the intended workflow can run through all major moving parts before investing in production hardening, broad tests, and polish.

This spike comes after product alignment, technical risk reduction, and interface design for uncertain work.

## Difference From Technical Spike

A technical spike asks:

> Can the risky technology or approach work?

An implementation demo spike asks:

> Can the product's happy path work through the major parts of this system?

## When To Use

Use this skill when:

- The product direction is known but still unproven end-to-end.
- The technical approach is plausible but the integrated workflow has not been demonstrated.
- Multiple moving parts must cooperate: UI, API, service, persistence, external SDK, model behavior, worker, filesystem, or browser rendering.
- The team wants to pause and inspect before committing to full implementation.

## Obligations

The demo must map to the approved golden workflow.

It should include all major moving parts, even if some parts are mocked, hard-coded, or simplified.

It should make clear:

- Which moving parts are real
- Which moving parts are mocked or partial
- Which parts are intentionally ugly or incomplete
- Which non-trivial error paths are included
- Which risks remain before production delivery

## Happy Path

Demonstrate the core workflow from the user's perspective.

Use practical evidence:

- curl session
- browser walkthrough
- e2e test
- screenshot/video evidence
- visual regression check
- API response plus persisted state check
- local script that exercises the full path

For product/agent/UI features, prefer e2e, curl, and visual checks over relying only on unit tests.

## Non-Trivial Error Paths

Include error paths in the demo when the behavior affects product or architecture.

Examples:

- invalid input preview versus hard failure
- partial success versus all-or-nothing
- retry behavior
- permission denied
- dependency failure
- conflict with newer state
- model/tool violation
- missing generated artifact

If error handling can reasonably wait, list it as not proven yet.

## Test Investment

Do not overinvest in full TDD or broad regression coverage during this spike.

Use just enough tests or scripts to prove the demo and prevent immediate confusion. Full production tests belong in established-pattern delivery after the user accepts the direction.

## User Inspection Checkpoint

Pause after the demo.

The user should be able to say:

- Yes, this is the direction I wanted.
- No, this works technically but is the wrong product behavior.
- The core is right, but the interface or UI needs adjustment.
- This should go back to product alignment, technical spike, or interface design.

Do not convert the demo into full implementation until this checkpoint is satisfied.

## Exit Criteria

Leave this skill only when:

- The golden workflow has been demonstrated through the major moving parts.
- Evidence is available and inspectable.
- Known mocks and gaps are named.
- Important error-path decisions are either demonstrated or explicitly deferred.
- The user has had a chance to inspect before full delivery begins.
