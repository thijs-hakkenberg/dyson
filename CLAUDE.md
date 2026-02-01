# CLAUDE.md - AI Assistant Guide for Project Dyson

This document provides context for AI assistants working on Project Dyson, a Dyson swarm construction planning platform.

## Project Context

Project Dyson is a **non-profit initiative** planning the construction of a Dyson swarm through phased development. The project uses a **multi-model consensus approach** where specifications from Claude, Gemini, and GPT are synthesized into agreed engineering approaches.

### Core Philosophy

- **Free-form LLM proposals** → **Consensus synthesis** → **Divergent views documentation**
- Each AI provides opinionated technical proposals; consensus identifies agreements
- Divergent views are preserved, not eliminated - they inform future decision-making
- Cost estimates emerge from LLM specifications, not predetermined targets

## Key File Locations

### Data Files

| File | Purpose |
|------|---------|
| `src/lib/services/bom/bom-data.ts` | BOM item metadata (slug, name, quantity, cost, category) |
| `src/lib/services/content.ts` | Full phase definitions with detailed BOM, objectives, timelines |
| `src/lib/types/index.ts` | TypeScript interfaces for Phase, BOMItem, etc. |

### Content Files

| Location | Purpose |
|----------|---------|
| `static/content/bom-specs/phase-0/` | Phase 0 LLM specs and consensus docs |
| `static/content/bom-specs/phase-1/` | Phase 1 LLM specs and consensus docs |

### Scripts

| Script | Purpose |
|--------|---------|
| `scripts/query-bom-specs.js` | Generates LLM specs and consensus documents |

## Common Operations

### Adding a New BOM Item

1. Add metadata to `src/lib/services/bom/bom-data.ts`:
   - Add to appropriate `PHASE_X_BOM_ITEMS` array
   - Add slug mapping to `BOM_ITEM_SLUGS`

2. Add full definition to `src/lib/services/content.ts`:
   - Add to the phase's `bom` array with all fields

3. Generate specifications:
   ```bash
   export DATABRICKS_TOKEN=...
   node scripts/query-bom-specs.js --phase=phase-X --item=item-slug
   node scripts/query-bom-specs.js --phase=phase-X --item=item-slug --consensus-only
   ```

### Regenerating Specifications

To regenerate specs for an existing item:

```bash
# Regenerate all LLM specs (overwrites existing)
node scripts/query-bom-specs.js --phase=phase-1 --item=collector-units

# Regenerate just consensus (uses existing LLM specs)
node scripts/query-bom-specs.js --phase=phase-1 --item=collector-units --consensus-only
```

### Updating Cost Estimates

After generating consensus documents:

1. Read the consensus.md files to extract cost figures
2. Update `bom-data.ts` quantity and cost fields
3. Update `content.ts` with unitCost, totalCost, and phase totalCost

**Important:** Keep `bom-data.ts` and `content.ts` in sync - they contain overlapping data for different purposes.

## Content Workflow Philosophy

### LLM Specification Format

Each LLM provides a **free-form technical proposal** including:
- Design philosophy and approach
- Technical specifications (dimensions, mass, power)
- System architecture with ASCII diagrams
- Cost analysis with assumptions
- Risk assessment
- Open engineering questions

### Consensus Document Format

The consensus.md includes exactly these sections:
- **Key Specifications** - Points where all models agree
- **Divergent Views** - Specific disagreements with attribution
- **Open Questions** - Unresolved engineering challenges
- **Recommended Approach** - Synthesized recommendations

### Divergent Views YAML

Machine-readable format for tracking disagreements:
```yaml
bomId: "bom-1-1"
itemSlug: "collector-units"
topics:
  - id: "unit-size"
    topic: "Unit Size/Power Output"
    positions:
      - statement: "recommends large 10,000 m² units"
        models: ["Claude"]
```

## Important Conventions

### File Naming

- LLM specs: `claude-opus-4-5.md`, `gemini-3-pro.md`, `gpt-5-2.md`
- Consensus: `consensus.md`
- Divergent views: `divergent-views.yaml`

### Frontmatter Schema

All markdown files require frontmatter:
```yaml
---
bomId: "bom-X-Y"
itemName: "Human Readable Name"
itemSlug: "url-safe-slug"
modelId: "claude-opus-4-5"  # or omit for consensus
modelName: "Claude Opus 4.5"
generated: "YYYY-MM-DD"
phase: "phase-X"
type: "consensus"  # only for consensus.md
---
```

### BOM ID Format

- Phase 0: `bom-0-1`, `bom-0-2`, ...
- Phase 1: `bom-1-1`, `bom-1-2`, ...
- Phase 2: `bom-2-1`, `bom-2-2`, ...

### Cost Format

- In `bom-data.ts`: String format like `"$100B"`, `"$15B"`, `"$500M"`
- In `content.ts`: Numeric format like `100000000000` (in dollars)

## Tech Stack

- **Framework:** SvelteKit with TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Cloudflare Pages via Terraform
- **LLM APIs:** Databricks serving endpoints

## Build Commands

```bash
npm run dev      # Development server
npm run check    # TypeScript checking
npm run build    # Production build
npm run preview  # Preview production build
```

## Notes for AI Assistants

1. **Always read before editing** - Use Read tool before making changes
2. **Keep files in sync** - bom-data.ts and content.ts have overlapping data
3. **Preserve divergent views** - Don't try to "resolve" disagreements between models
4. **Use existing patterns** - Follow the format of existing spec files
5. **Run checks** - Use `npm run check` to verify TypeScript after changes
