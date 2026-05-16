# Technical Risk Spike Skill

## Purpose

Use this skill to reduce technical uncertainty before committing to a full implementation.

A technical spike is not a stealth implementation. It may use mocks, hard-coded data, simplified scripts, fake persistence, or partial code. Its purpose is to answer risky questions quickly and honestly.

## When To Use

Use this skill when:

- A new SDK, model, framework, runtime, deployment mechanism, database pattern, or integration is involved.
- The feature depends on generated output, agents, file access, external services, streaming, permissions, background work, or unusual runtime behavior.
- The team does not yet know whether the intended product behavior is technically feasible.
- Scaling, security, reliability, or observability risks are unclear.

## Obligations

A technical spike must identify the highest technical unknowns and reduce them directly.

It should make clear:

- Which parts are real
- Which parts are mocked or hard-coded
- Which unknowns were reduced
- Which risks remain
- Whether the findings affect product direction
- Whether an interface design spike is needed next
- What demo or evidence supports the conclusion

## Technical Unknowns

Ask what must be learned before implementation is safe.

Examples:

- Can the SDK/runtime do the required thing?
- Does it work in the target deployment environment?
- Does it expose enough events, state, errors, and identifiers to debug failures?
- Can it be constrained to the required permissions?
- Can it integrate without changing the intended product behavior?
- What happens when the happy path fails halfway?

## Scaling Questions

Consider scale early, even if first release does not need full scalability.

Ask:

- What happens with 10, 1,000, or 100,000 items/users/runs?
- Is the expensive part CPU, IO, network, model calls, rendering, storage, DB writes, locks, or queueing?
- Does the approach create long requests, background work, large payloads, cache pressure, or contention?
- What is the expected bottleneck?
- What scale can be explicitly deferred for the first version?

## Volatility-Based Design

Identify what is likely to change.

Consider volatility across:

- Product behavior
- UI shape
- API contract
- Persistence schema
- Domain concepts
- Model/provider behavior
- Third-party SDK behavior
- Permissions and security requirements
- Data shape
- Operational environment
- Performance assumptions

Design response:

- Stable parts can be implemented directly.
- Volatile external APIs should usually sit behind adapters.
- Volatile product semantics should not be baked into persistent schemas too early.
- Highly uncertain fields should not become permanent domain concepts casually.
- If the volatile part is central to the feature, keep the spike small and inspectable.

## Safety Nets

Identify how likely failures will be caught.

Ask:

- What tests would catch the most important bugs?
- Is a unit test enough?
- Do we need curl, e2e, visual, manual, or live smoke verification?
- What failure would look like success unless explicitly checked?
- What logging, transcript entries, audit records, traces, screenshots, or metrics are needed?
- How will repeated failures be diagnosed?

## Security And Safety

Ask:

- What input is untrusted?
- What files, environment variables, secrets, tokens, user data, or network paths could be exposed?
- What can the user, model, dependency, or external service read or write?
- Are there path traversal, injection, auth, permission, sandbox, data leakage, SSRF, XSS, or persistence risks?
- What must fail closed?
- What must be auditable?
- What is the rollback or cleanup path?

## Classical Tech Stack Questions

Consider:

- Dependency maturity and stability
- Runtime compatibility
- Deployment constraints
- Version pinning and upgrade risk
- Failure modes
- Observability and debuggability
- Migration cost
- Rollback strategy
- Maintainability
- How much code is owned by the app versus outsourced to a dependency
- Whether the approach creates hidden operational requirements

## Demo And Evidence

When possible, produce a small demo or proof that targets the risky unknown directly.

Good spike demos are narrow:

- A script proving an SDK event stream contains needed events
- A curl flow proving an endpoint can persist expected state
- A local mock proving a streaming UI can handle disconnects
- A browser smoke proving the UI can display the state shape
- A sandbox test proving disallowed file access fails closed

Do not overinvest in full test coverage or polish during the spike. Use enough verification to trust the conclusion.

## Exit Criteria

Leave this skill only when:

- The main technical unknowns are answered or explicitly still unresolved.
- Scaling, volatility, safety nets, security, and operational risks have been considered.
- The user can inspect the evidence or demo when relevant.
- Any product-direction impact is routed back to product alignment.
- Any new system boundary or domain contract is routed to interface design.
