# Reality Check

Reality Check is a multi-skill collection for AI coding agents. It helps agents plan, spike, implement, review, and verify features without drifting away from the user's intended product outcome.

Core principle:

> Prove direction before polishing implementation. Prove product behavior before declaring success.

## Install

List the skills in this repository:

```bash
npx skills add dorav/reality-check --list
```

Install all skills:

```bash
npx skills add dorav/reality-check --all
```

Install a specific skill:

```bash
npx skills add dorav/reality-check --skill reality-check
npx skills add dorav/reality-check --skill verification-gates
```

Install from a local checkout:

```bash
npx skills add .
```

## Available Skills

### reality-check

Top-level orchestrator for choosing the right path through product alignment, technical risk spikes, interface design, implementation demos, delivery, review triage, and verification.

Use when planning, implementing, redesigning, reviewing, rescuing, or verifying a feature where the agent might otherwise optimize for code completion instead of the desired product behavior.

### product-alignment

Aligns on the user outcome before implementation by drafting golden workflows, clarifying ambiguous terms, identifying non-goals, and defining what would make the feature fail even if tests pass.

### technical-risk-spike

Reduces uncertainty around risky technology, runtime behavior, SDKs, permissions, generated output, integrations, scaling, security, and deployment assumptions.

### interface-design-spike

Makes system shape visible before implementation with diagrams and code-level contracts for APIs, schemas, domain concepts, agent tools, UI contracts, events, and source-of-truth boundaries.

### implementation-demo-spike

Proves the intended happy path through the major moving parts before investing in production hardening, broad regression tests, or polish.

### established-pattern-delivery

Guides full implementation once the product direction, technical approach, and interface shape are sufficiently known or already follow an established codebase pattern.

### review-triage

Classifies review comments, automated reviewer notes, failed tests, and bug-fix loops before patching so fixes preserve product intent and address the right class of risk.

### verification-gates

Checks that build, integration, product, visual, regression, and deployment verification are complete before calling a feature done.

### stop-and-replan

Stops patching when evidence shows the current approach is wrong, unstable, or hardening the wrong design, then routes back to the right planning or spike path.

## Skill Structure

This repository follows the Agent Skills format used by `vercel-labs/skills`:

- `skills/reality-check/SKILL.md` - top-level orchestrator skill
- `skills/<skill-name>/SKILL.md` - independently discoverable phase skills
- `scripts/` - optional repository helper scripts

Every skill lives under `skills/` and includes YAML frontmatter with `name` and `description`.

## Validate

Run the local validation check:

```bash
npm run validate
```

If you have network access and want to smoke-test the upstream installer:

```bash
npx skills add . --list
```

## Repository Helpers

Initialize this folder as a Git repo:

```bash
./scripts/init-git-repo.sh
```

Create and push a GitHub repo with `gh`:

```bash
./scripts/create-github-repo.sh
```
