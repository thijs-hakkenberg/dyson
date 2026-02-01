# Project Dyson

A non-profit initiative planning the construction of a Dyson swarm - a megastructure composed of thousands to millions of orbiting solar collectors designed to capture a significant fraction of the Sun's energy output.

## Overview

Project Dyson is an open-source planning platform that aggregates technical specifications from multiple AI models (Claude, Gemini, GPT) to develop consensus engineering approaches for the construction of a Dyson swarm. The project breaks down this massive undertaking into phased bill-of-materials (BOM) items with detailed specifications, cost estimates, and technical analyses.

### Phases

- **Phase 0: Space Resource Processing** - Establishing asteroid mining and material processing infrastructure
- **Phase 1: Initial Swarm Deployment** - Building and deploying the first 1,000 solar collector units
- **Phase 2: Swarm Expansion** - Scaling to 100,000+ collector satellites

## Directory Structure

```
project_dyson/
├── src/
│   ├── routes/              # SvelteKit pages
│   │   └── plan/           # Phase and BOM item pages
│   └── lib/
│       ├── services/
│       │   ├── bom/        # BOM data and utilities
│       │   │   └── bom-data.ts    # Phase BOM items metadata
│       │   └── content.ts  # Phase definitions with full BOM details
│       └── types/          # TypeScript interfaces
├── static/
│   └── content/
│       └── bom-specs/      # LLM-generated specifications
│           ├── phase-0/    # Phase 0 BOM item specs
│           └── phase-1/    # Phase 1 BOM item specs
├── scripts/
│   └── query-bom-specs.js  # LLM specification generator
└── terraform/              # Cloudflare deployment config
```

## BOM Specification Workflow

The project uses a multi-model consensus approach for technical specifications:

### 1. Generate LLM Specifications

Each BOM item gets specifications from 3 different LLMs:

```bash
# Set your Databricks API token
export DATABRICKS_TOKEN=your_token_here

# Generate specs for a single item
node scripts/query-bom-specs.js --phase=phase-1 --item=collector-units

# Generate specs for all items in a phase
node scripts/query-bom-specs.js --phase=phase-1

# Generate for a specific model only
node scripts/query-bom-specs.js --phase=phase-1 --model=claude-opus-4-5
```

**Output:** Creates `claude-opus-4-5.md`, `gemini-3-pro.md`, and `gpt-5-2.md` in `static/content/bom-specs/<phase>/<item>/`

### 2. Generate Consensus Documents

After all LLM specs exist, synthesize them into consensus:

```bash
node scripts/query-bom-specs.js --phase=phase-1 --consensus-only
```

**Output:** Creates `consensus.md` and `divergent-views.yaml` for each item

### 3. Update Cost Data

Extract consensus cost estimates and update:
- `src/lib/services/bom/bom-data.ts` - Phase BOM metadata
- `src/lib/services/content.ts` - Full phase definitions with costs

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type checking
npm run check

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Create a `.env` file:

```
DATABRICKS_TOKEN=your_databricks_api_token
DATABRICKS_WORKSPACE=https://your-workspace.azuredatabricks.net
```

## Deployment

The project deploys to Cloudflare Pages via Terraform:

```bash
cd terraform
terraform init
terraform apply
```

See `terraform/` directory for configuration details.

## Content Files

### Specification Files (`static/content/bom-specs/`)

Each BOM item directory contains:

| File | Description |
|------|-------------|
| `claude-opus-4-5.md` | Claude's technical proposal |
| `gemini-3-pro.md` | Gemini's technical proposal |
| `gpt-5-2.md` | GPT's technical proposal |
| `consensus.md` | Synthesized specification with key agreements |
| `divergent-views.yaml` | Structured data on model disagreements |

### Frontmatter Schema

```yaml
---
bomId: "bom-1-1"
itemName: "Solar Collector Units"
itemSlug: "collector-units"
modelId: "claude-opus-4-5"  # or "consensus"
modelName: "Claude Opus 4.5"
generated: "2026-02-01"
phase: "phase-1"
type: "consensus"  # only for consensus.md
---
```

## License

Open source - see LICENSE file for details.

## Contributing

This is a research project exploring the technical feasibility of megastructure construction. Contributions to specifications, cost analysis, and technical review are welcome.
