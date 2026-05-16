# Reality Check

Reality Check is a plugin-style set of skills for planning, spiking, implementing, reviewing, and verifying features without losing the user's intended product outcome.

Core principle:

> Prove direction before polishing implementation. Prove product behavior before declaring success.

## Files

- `SKILL.md` — top-level orchestrator/router
- `skills/product-alignment/SKILL.md`
- `skills/technical-risk-spike/SKILL.md`
- `skills/interface-design-spike/SKILL.md`
- `skills/implementation-demo-spike/SKILL.md`
- `skills/established-pattern-delivery/SKILL.md`
- `skills/review-triage/SKILL.md`
- `skills/verification-gates/SKILL.md`
- `skills/stop-and-replan/SKILL.md`
- `scripts/init-git-repo.sh` — optional helper to initialize this folder as a Git repo
- `scripts/create-github-repo.sh` — optional helper to create/push a GitHub repo with `gh`

## Create A Git Repo

From this folder:

```bash
./scripts/init-git-repo.sh
```

Or manually:

```bash
git init
git add .
git commit -m "Initial Reality Check skill plugin"
```

Create and push a GitHub repo:

```bash
gh repo create dorav/reality-check \
  --private \
  --source=. \
  --remote=origin \
  --push
```

## Install Options

Clone into another project:

```bash
mkdir -p .agents/plugins
git clone git@github.com:dorav/reality-check.git .agents/plugins/reality-check
```

Add as a submodule:

```bash
git submodule add git@github.com:dorav/reality-check.git .agents/plugins/reality-check
```

Install by Git URL with npm-compatible package managers:

```bash
npm install git+ssh://git@github.com/dorav/reality-check.git
```
