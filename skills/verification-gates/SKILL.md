---
name: verification-gates
description: Use before claiming work is complete, fixed, or passing - verifies build, integration, product, visual, safety, and regression evidence beyond automated tests.
---

# Verification Gates Skill

## Purpose

Use this skill to prove that a feature works at the right levels before calling it done.

The core rule is:

> Automated tests passing is necessary but not sufficient when product behavior, UI, agents, integrations, or runtime behavior are involved.

## When To Use

Use this skill:

- before declaring a feature complete
- after implementation-demo spikes
- after full implementation
- after review/fix rounds
- after bug fixes
- whenever unit tests pass but the user-visible behavior is still uncertain

## Verification Layers

Use the layers that match the task.

### Build Verification

Examples:

- typecheck
- lint
- unit tests
- package verification command

This proves the codebase is internally consistent. It does not prove the product works.

### Integration Verification

Examples:

- curl requests
- service tests
- database persistence checks
- route wiring checks
- SDK/runtime smoke tests
- conflict/retry checks

This proves the parts are connected and state moves correctly.

### Product Verification

Run the approved golden workflow or the closest practical equivalent.

This proves the feature satisfies the user's intended behavior.

### Visual Verification

Use when UI, layout, rendering, screenshots, generated visuals, or browser state changed.

Examples:

- browser screenshot
- visual regression
- Playwright interaction
- checking empty/loading/error states
- inspecting generated artifacts visually

### Regression Verification

After review/fix rounds, rerun the golden workflow and any relevant integration/manual checks.

Do not assume a safety or correctness fix preserved product behavior.

### Safety/Security Verification

Use when permissions, sandboxing, secrets, external calls, file access, auth, or model/tool boundaries are involved.

Examples:

- disallowed action fails closed
- secrets are not exposed
- invalid path/input is rejected
- audit trail records relevant rejected activity
- cleanup runs on success and failure

## Choosing Evidence

Prefer evidence that would catch the actual risk.

Examples:

- Unit tests for pure logic and schema validation
- curl for API behavior and persisted state
- e2e for real user workflows
- visual checks for UI/rendering
- live smoke for third-party SDK/runtime assumptions
- manual inspection for early product demos

For agentic/product features, curl/e2e/browser/manual checks often find bugs that unit tests did not anticipate. Treat them as required evidence when the behavior is user-visible or integration-heavy.

Useful verification report shape:

| Layer | Evidence | Result |
| --- | --- | --- |
| Build | `npm run verify` | Pass |
| Integration | `curl POST /bulk-invites` plus DB query | Pass: three pending invites persisted |
| Product | Approved golden workflow walkthrough | Pass: invalid rows visible, duplicates skipped |
| Visual | Browser screenshot of preview and pending states | Pass |
| Safety | Path traversal fixture rejected | Pass |
| Regression | Retry duplicate test | Pass |

If a layer is skipped, state why and what risk remains. For example, "Visual verification skipped because this change only touches a CLI parser; remaining risk is covered by command-output snapshots."

## Golden Workflow Verification

A feature is not done until the approved golden workflow passes, unless the user explicitly narrows the task.

The workflow may be verified manually, with e2e automation, or with a mix of curl/API/browser checks. As the feature stabilizes, convert recurring golden workflows into automated regression checks when practical.

## Failure Handling

If a verification step fails:

1. State the observed symptom.
2. Identify the suspected root cause.
3. Gather evidence before patching.
4. Patch the root cause.
5. Rerun the original failing workflow, not only a new targeted test.
6. Update the not-proven-yet ledger.

If the failure reveals wrong product direction or wrong interface shape, route to stop-and-replan.

## Done Criteria

Only call the feature done when:

- Build verification passes.
- Relevant integration verification passes.
- Product verification passes against the approved golden workflow.
- Visual verification passes when UI/rendering changed.
- Safety/security verification passes when boundaries are involved.
- Regression verification passes after major review/fix rounds.
- Any unverified items are explicitly named.

If something could not be verified, be honest and do not imply it passed.
