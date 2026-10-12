# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Project Dyson is a non-profit Dyson swarm construction planning platform using a **multi-model consensus approach**: independent LLM proposals (Claude, Gemini, GPT) are synthesized into engineering specifications, with disagreements preserved as machine-readable divergent views.

## Build & Test Commands

```bash
npm run dev          # Dev server (typically localhost:5173 or 5174)
npm run check        # Svelte + TypeScript checking
npm run build        # Production build (Cloudflare Pages static adapter)
npm run test:run     # Run all Vitest tests (24 files, ~2654 tests)

# Python tests (publications simulation code)
cd publications/scripts && source .venv/bin/activate
pytest -m "not slow" --tb=short -v    # Fast tests (~500 tests, ~30s)
pytest tests/test_water_extraction.py -v  # Single test file
```

**Pre-commit hook** runs both TypeScript and Python (fast) tests. Commits are blocked on test failure.

## Environment Variables

Stored in `.env` at project root. Required for LLM-calling scripts:
```bash
DATABRICKS_TOKEN=dapi...
DATABRICKS_WORKSPACE=https://adb-XXXX.XX.azuredatabricks.net
```

For background shell commands, use `export $(cat .env | xargs) &&` prefix (not `source .env`, which doesn't propagate to background processes).

## Architecture

**Framework:** SvelteKit 2 + TypeScript + Tailwind CSS. Static site deployed to Cloudflare Pages.

### Content Split: Bundled vs Runtime

- `src/content/` — Bundled at build time via Vite imports (research questions, blog posts, validations, org registry)
- `static/content/` — Fetched at runtime as static files (BOM specs, consensus docs, blueprint SVGs)

### Key Service Files

| File | Role |
|------|------|
| `src/lib/services/content.ts` | Phase definitions, BOM details, timelines |
| `src/lib/services/bom/bom-data.ts` | BOM item metadata (slug, name, quantity, cost) |
| `src/lib/services/critical-path.ts` | 49 research questions with status, dependencies, thread assignments |
| `src/lib/services/trl-assessment.ts` | 10 TRL assessments with current/target levels and risk ratings |
| `src/lib/services/decision-gates.ts` | Gate milestones and readiness criteria |
| `src/lib/services/bom-specs.ts` | Fetches/parses markdown specs from `static/content/bom-specs/` |

**Keep `bom-data.ts` and `content.ts` in sync** — they contain overlapping BOM data for different purposes.

### Research Questions

49 Phase 0 questions in `src/content/research-questions/phase-0/`. Each RQ has:
- `rq-0-XX-slug.md` — Frontmatter with questionId, slug, questionType, status
- `rq-0-XX-slug/` directory (if literature or discussion exists):
  - `research/arxiv-papers.yaml` + `research/analysis.md` — Literature review
  - `discussion.yaml` — Multi-model discussion metadata
  - `round-N/*.md` — Per-model per-round responses
  - `conclusion.md` — Final synthesis
  - `round-N/votes.yaml` — Voting records

Status values in `critical-path.ts`: `'open'`, `'investigating'`, `'answered'`

### Simulation Modules

`src/lib/services/simulation/` contains 20 Monte Carlo simulation modules (TypeScript), each with `__tests__/` dirs using Vitest. These run in-browser for interactive analysis pages.

`publications/scripts/` contains Python simulation code for papers:
- `isru_model.py` + `isru_mc.py` — Paper 01 ISRU economics
- `water_extraction_model.py` + `water_extraction_mc.py` — Paper 05 water source comparison
- Tests in `publications/scripts/tests/`
- Python venv at `publications/scripts/.venv`

### Publications

`publications/drafts/` contains LaTeX papers with versioned drafts (e.g., `03-multi-model-ai-consensus-m.tex`) and `reviews/version-X/` directories with AI peer review markdown per model.

`publications/handover/` contains structured literature handover files for external researchers.

`publications/data/` contains experimental data (controlled baselines, repeated trials, winner-hidden ablation).

## Key Scripts

```bash
# Generate BOM specs from LLMs
node scripts/query-bom-specs.js --phase=phase-0 --item=item-slug
node scripts/query-bom-specs.js --phase=phase-0 --item=item-slug --consensus-only

# Run multi-model deliberation
node scripts/run-discussion.js --question=<slug> --auto [--hidden-winner]

# Run AI peer review on a paper
node scripts/run-peer-review.js --paper=<NN> --version=<v> --model=<model-id>

# Re-assess a phase's BOM against reconciliation/<phase>/findings.yaml (see reconciliation/README.md)
node scripts/run-reassessment.js --phase=phase-0 --panel=may [--dry-run]
node scripts/run-reassessment.js --phase=phase-0 --synthesize
# Critique round: --round=2 --prior-round=1 applies src/content/methodology/decision-frameworks.md

# Model panels for discussions/specs/re-assessment: --panel=feb|may|oct|latest or --models=a,b,c
# (shared registry: scripts/lib/llm.js; --list-models, --discover)

# Run controlled baselines for Paper 03
node publications/scripts/run_controlled_baselines.cjs [--exp=1] [--exp=2]
```

All LLM-calling scripts require `DATABRICKS_TOKEN` and `DATABRICKS_WORKSPACE` environment variables.

## Content Conventions

### BOM Specs (`static/content/bom-specs/`)

Each BOM item has a directory with per-model markdown specs + `consensus.md` + `divergent-views.yaml` + optional `blueprint.svg`.

LLM spec filenames: `claude-opus-4-5.md`, `claude-opus-4-6.md`, `gemini-3-pro.md`, `gpt-5-2.md`

### Blog Posts (`src/content/blog/`)

Three categories: `research/`, `research-resolutions/`, `announcements/`. Auto-discovered from frontmatter. Blog routing uses flat slugs: `/blog/[slug]` (not category-based paths).

### Frontmatter Schema

All markdown content requires YAML frontmatter. BOM specs need `bomId`, `itemSlug`, `phase`, `modelId`. Blog posts need `slug`, `title`, `date`, `category`, `tags`.

### BOM ID Format

`bom-{phase}-{sequence}` — e.g., `bom-0-1` (Phase 0, item 1), `bom-1-3` (Phase 1, item 3).

### Validation Claims (`src/content/validations/index.yaml`)

Tracks empirical validation of LLM predictions. Each claim has status (`validated`, `partially-validated`, `outdated`), confidence score, and linked RQs.

## Multi-Model Consensus Workflow

1. LLM provides free-form technical proposal with specs, diagrams, costs, risks
2. Consensus synthesis identifies agreements, divergent views, open questions
3. Divergent views preserved in structured YAML with model attribution
4. Research questions drive deliberations when deeper analysis needed
5. Deliberation conclusions update `critical-path.ts` status and may create validation claims

**Preserve divergent views** — don't try to "resolve" disagreements between models. They inform future decision-making.

## Peer Review Script Configuration

Papers must be registered in `scripts/run-peer-review.js` under `PAPER_CONFIGS` with slug, directory, system prompt, expertise, and attention items. Currently configured: papers 01, 02, 03, 04, 05.
