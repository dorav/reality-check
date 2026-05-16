---
name: product-alignment
description: Use before implementing new or ambiguous product behavior, UI flows, user-facing workflows, or acceptance criteria - drafts golden workflows, clarifies terms, and identifies non-goals.
---

# Product Alignment Skill

## Purpose

Use this skill to align on the product direction before implementation. It reduces the risk of building a technically correct feature that does not match what the user wanted.

## When To Use

Use this skill when:

- The feature is new or ambiguous.
- The user outcome is more important than a specific implementation request.
- Terms like editable, resumable, reliable, integrated, safe, high-quality, done, or working could have multiple meanings.
- UI shape or user flow is not agreed yet.
- A previous implementation technically worked but did not satisfy the user.

## Obligations

Before moving on, ensure these are clear enough for the user to inspect:

- What user problem is being solved
- Who the feature is for
- What should happen from the user's point of view
- What should not be built
- Which terms might be misunderstood
- Which examples, mocks, competitor references, screenshots, or written scenarios clarify the desired direction
- What would make the result fail even if the code compiles and tests pass

Avoid rigid templates. Use only as much structure as needed to create alignment.

## Golden Workflow

Draft one or more golden workflows from the user's request. The assistant drafts; the user approves, edits, or rejects.

A golden workflow is a concrete product acceptance example, not a formal test plan.

It should include:

- Starting state
- User action
- Expected result
- Follow-up or persistence behavior when relevant
- Failure conditions that capture product intent

Generic example:

> A team admin opens the members page, uploads a CSV with five email addresses, sees a preview of valid and invalid rows, fixes one invalid row, sends the invites, and sees the invited users appear with pending status. After refreshing the page, the pending invites are still visible. Uploading the same CSV again does not create duplicate invites.
>
> This fails if invalid rows disappear without explanation, if only one invite can be sent, if duplicate invites are created, or if the UI appears to work but the result is not persisted.

## Key Term Check

Identify product terms that need concrete definitions. For each term, ask what observable behavior would prove it.

Examples:

- “Editable” can mean changing text, moving objects, changing settings, changing generated source, or changing persisted state.
- “Resumable” can mean continuing a conversation, reading latest saved state, preserving manual edits, or replaying previous context.
- “Safe” can mean permission-safe, data-safe, reversible, fail-closed, auditable, or isolated from secrets.
- “Done” can mean implemented, tested, demoed, visually inspected, deployed, or accepted by the user.

## UI Shape

For UI work, do not jump directly into implementation. First align on the rough shape.

Useful alignment tools:

- Text walkthroughs
- Low-fidelity mocks
- Screenshots or competitor examples
- State diagrams
- Before/after examples
- User stories with pass/fail criteria

When a grill-me or adversarial-review skill is available, use it before accepting UI shape or major product direction.

## Non-Goals

Explicitly name non-goals. Non-goals prevent agents and reviewers from expanding the feature into adjacent work.

A non-goal should be specific enough to stop implementation drift.

Weak: “Do not overbuild.”

Better: “Do not add role templates, scheduled invites, or CSV import history in this release.”

## Exit Criteria

Leave this skill only when:

- The user-facing behavior is concrete enough to demo.
- At least one golden workflow has been drafted.
- Major ambiguous terms have concrete meanings.
- Non-goals are known.
- The user has had a chance to correct the direction.

If the technical spike later changes what is feasible or desirable, return to this skill.
