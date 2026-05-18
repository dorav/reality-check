---
name: rc-deliver-established-pattern
description: Use when product direction, technical approach, and interface shape are known enough to implement - delivers low-uncertainty work through focused tasks, tests, checks, and review handling.
---

# Established-Pattern Delivery Skill

## Purpose

Use this skill for full implementation when the product direction, technical approach, and interface shape are sufficiently known.

This is the delivery path for low-uncertainty work or for uncertain work after spikes have reduced the major risks.

## When To Use

Use this skill when:

- The feature follows an existing architecture or implementation pattern.
- The team has already agreed on product direction and interface shape.
- A spike or demo has proven the risky parts.
- The remaining work is implementation, tests, polish, and verification.

Do not use this skill to skip discovery when the direction is uncertain.

## Confirm The Pattern

Before coding, state the established pattern being followed.

Examples:

- Another CRUD endpoint following the existing service/repository/route shape
- Another UI panel following existing component conventions
- Another tool using the existing tool schema and transcript pattern
- Another provider adapter following existing adapter boundaries

If there is no real existing pattern, route back to product, technical, or interface spike.

Useful checkpoint shape:

> Pattern: Add another settings panel following `AccountSettingsPanel` with route-level loader, form action, Zod validation, and component-local pending state.
> Scope: UI component, route action, targeted validation tests, and one browser smoke.
> Not changing: persistence schema, public API shape, or navigation model.
> Verification between tasks: targeted test after validation, curl/action smoke after route wiring, screenshot after UI integration.

## Task Breakdown

Break work into area-focused tasks. Do not force every task to be a complete vertical slice.

Prefer tasks like:

- Types/schemas
- Persistence/repository
- Service/domain logic
- API route
- UI component shape
- UI integration
- Tests
- E2E/manual verification

This keeps implementation inspectable and prevents one giant patch from mixing product, API, UI, and persistence changes.

## UI Work

For UI changes, agree on the rough UI shape before coding.

Use:

- text walkthroughs
- low-fidelity mocks
- screenshots
- component sketches
- browser screenshots after implementation

When `superpowers:brainstorming`, `grill-me`, or adversarial-review skill is available, use one of them before finalizing significant UI shape. Choose the one that best fits the user's installed skills and the shape of the work.

## TDD And Tests

Use TDD for full implementation where practical:

- Write or update a failing targeted test.
- Implement the behavior.
- Run the targeted test.
- Add edge-case tests where they protect real risks.
- Run broader verification before final completion.

Do not write tests that only prove implementation details while missing the product behavior.

If TDD is not practical for a task, state why and choose the smallest verification loop that can catch the real risk.

## Manual And Integration Checks Between Tasks

Between tasks, use curl/manual/e2e/visual checks where applicable.

Examples:

- curl route after API implementation
- DB/persistence check after repository changes
- screenshot after UI work
- e2e flow after wiring
- live smoke after SDK/provider changes

Manual checks are not a substitute for tests, but they often reveal missing assumptions earlier than tests.

If no manual or integration check applies, state why before moving to final verification.

## Interface And Schema Changes

If implementation reveals a need for new or changed API/schema/domain concepts:

- classify the change by risk
- update the interface/schema deviation ledger
- route back to interface design if the change is high risk or changes product semantics

Do not silently introduce new persisted fields, public contracts, source-of-truth models, or domain entities while "just implementing."

## Exit Criteria

Leave this skill only when:

- The implementation follows the agreed pattern.
- Targeted tests cover the behavior.
- Relevant manual/integration checks have been run.
- Any review comments have been triaged.
- Verification gates are ready to run.
