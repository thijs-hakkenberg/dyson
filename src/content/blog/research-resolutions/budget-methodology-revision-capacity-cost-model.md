---
slug: "budget-methodology-revision-capacity-cost-model"
title: "From $10 Quadrillion to $9 Trillion: Adopting the Capacity Cost Model"
description: "A fundamental revision to Project Dyson cost estimates based on multi-model consensus. Self-replicating ISRU economics reduce Phase 2-3 budgets by 10-1,350x."
author: "Project Dyson Team"
date: "2026-02-09"
category: "Research Resolutions"
tags:
  - "budget"
  - "methodology"
  - "ISRU"
  - "self-replicating"
  - "economics"
  - "capacity-cost-model"
relatedPhases:
  - "phase-2"
  - "phase-3a"
  - "phase-3b"
---

# From $10 Quadrillion to $9 Trillion: Adopting the Capacity Cost Model

Today we're announcing a **fundamental revision** to Project Dyson's budget methodology, reducing total estimated costs from ~$10.3 quadrillion to ~$9 trillion—a reduction of over 1,000x for later phases. This isn't a correction of arithmetic errors or updated material prices. It's a recognition that **our previous methodology was categorically wrong** for a self-replicating, autonomous, in-situ manufacturing architecture.

## The Problem: Linear Scaling in a Non-Linear System

Our original estimates used a straightforward approach: estimate per-unit cost, multiply by unit count. For Phase 2's 100,000 solar collectors at $50M each, that gives $5 trillion. For Phase 3a's 10^12 computational tiles, the numbers become astronomical.

This methodology works well for **procurement-based systems** where every unit must be manufactured on Earth, launched into space, and assembled by human workers. It's how we correctly estimated Phase 0-1 costs.

But Project Dyson isn't a procurement program after Phase 1. It's a **self-replicating ISRU manufacturing system**. The architecture is explicitly designed to:

- Extract raw materials from asteroids (free feedstock)
- Process materials using solar power (free energy)
- Manufacture components using autonomous robots (no labor costs)
- Replicate the factories themselves (exponential capacity growth)

Applying linear unit costs to this architecture is like calculating the cost of a forest by multiplying (cost of one tree) × (number of trees). The methodology doesn't match the system.

## The Solution: Capacity Cost Model

After structured deliberation between Claude Opus 4.6, Gemini 3 Pro, and GPT-5.2 ([full discussion](/questions/isru-cost-methodology-validation)), we've adopted a **capacity cost model** that decomposes costs into five components:

| Component | Description | Scales With |
|-----------|-------------|-------------|
| **Seed Investment** | Earth-manufactured foundries, initial robots, first-generation hardware | Fixed (one-time) |
| **Bootstrap Operations** | Support during ramp-up before self-sufficiency | Time (years) |
| **Import Streams** | "Vitamin" components that can't be ISRU-manufactured | Mass fraction × total mass |
| **Oversight & Governance** | Software, coordination, quality assurance | System complexity (log scale) |
| **Risk Reserves** | Contingency for unknown unknowns | Percentage of above |

Under this model, **marginal cost approaches zero** once the manufacturing infrastructure is operational. The cost of the 100,000th solar collector isn't $50M—it's approximately the control system overhead to track and manage one additional unit.

## Revised Budget Summary

| Phase | Previous Estimate | Revised Estimate | Reduction |
|-------|-------------------|------------------|-----------|
| Phase 0 | $15.7B | $15.7B | 1x (unchanged) |
| Phase 1 | $158B | $158B | 1x (unchanged) |
| **Phase 2** | **$5.1T** | **$375B** | **~14x** |
| **Phase 3a** | **$10.2Q** | **$7.5T** | **~1,350x** |
| **Phase 3b** | **$110T** | **$1.5T** | **~73x** |
| **Total** | **~$10.3Q** | **~$9.2T** | **~1,100x** |

Phases 0-1 remain unchanged because they represent Earth-based development and first-of-kind manufacturing, where traditional cost estimation applies.

## What Changed in Each Phase

### Phase 2: Swarm Expansion ($5.1T → $375B)

The original estimate assumed 100,000 collectors at $50M each. The revised estimate recognizes:

- **Self-replicating foundries** ($150B) are the primary cost driver—not the collectors they produce
- **Seed deployment** ($50B) for initial collector production before ISRU maturity
- **Vitamin imports** ($80B) for components that can't be asteroid-sourced (rad-hard processors, precision optics)
- **Swarm governance software** ($40B) scales with system complexity, not unit count

Once foundries are operational, collector production costs approach the control system overhead.

### Phase 3a: Matrioshka Brain ($10.2Q → $7.5T)

The original estimate multiplied 10^12 tiles × $10,000/tile. The revised estimate recognizes:

- **Self-replicating foundries** ($2T) remain the primary cost driver
- **Semiconductor vitamins** ($800B) for the ~4% of tile components that require Earth sourcing
- **Tile architecture R&D** ($200B) is a one-time investment regardless of production volume
- **Distributed OS development** ($500B) scales with complexity, not tile count

The 1,350x reduction reflects that **most Phase 3a mass is ISRU-manufactured** from asteroid feedstock using solar power and autonomous robots.

### Phase 3b: Stellar Engine ($110T → $1.5T)

The original estimate used linear scaling for stellar-scale infrastructure. The revised estimate recognizes:

- **Fusion engine R&D** ($400B) is the highest-uncertainty item but a one-time investment
- **Mass lifting R&D** ($300B) for solar chromosphere interaction
- **Shkadov mirrors** ($150B) are structurally simple and fully ISRU-producible
- Most infrastructure **reuses Phase 2/3a foundries** with minimal additional seed investment

## The "Vitamin Problem"

One critical insight from the discussion: **96% mass closure does not equal 96% cost reduction**.

Self-replicating foundries can produce structural materials, solar cells, and basic electronics from asteroid feedstock. But certain "vitamin" components—rad-hard processors, precision optics, specific dopants, catalysts—may require Earth sourcing indefinitely.

The cost floor for each phase is determined by:
\`\`\`
Import Cost = (Total Mass) × (Non-ISRU Fraction) × ($/kg to operational zone)
\`\`\`

For Phase 3a with ~10^11-10^12 kg total mass, even 0.01% Earth-sourced material represents tens of billions in import costs. This is why the **tile architecture trade study** is now the highest-priority engineering activity—designs that minimize vitamin requirements dominate the cost equation.

## What This Means for Feasibility

The methodology change transforms Project Dyson's feasibility narrative:

**Previous framing**: "A $10 quadrillion program requiring civilization-scale coordination over millennia"

**Revised framing**: "A $9 trillion program—extraordinarily ambitious but within the economic capacity of a civilization generating $100T+ in annual GDP"

For comparison:
- Global military spending: ~$2T/year
- Apollo program (inflation-adjusted): ~$300B
- International Space Station: ~$150B
- Artemis program (projected): ~$100B

Phase 2 at $375B is roughly equivalent to 15-20 years of current global space budgets. This is fundable through public programs, private investment, or international coordination—not requiring economic miracles.

## Remaining Uncertainties

The revised estimates depend on several unresolved questions:

1. **Mass closure ratio**: If actual closure plateaus at 80-90% instead of 96%+, import costs could increase 5-50x
2. **In-situ semiconductor fabrication**: Can rad-hard processors be manufactured from asteroid feedstock?
3. **Multi-generational replication fidelity**: Do self-replicating systems degrade across thousands of generations?
4. **Autonomy maturity**: How much human oversight do trillion-unit swarms actually require?

These questions are **testable**—which is fundamentally more optimistic than facing irreducible economic barriers. Phase 1's closure ratio milestones will provide empirical data to refine Phase 2+ estimates.

## Updated BOM Documentation

All Phase 2-3 BOM items now include:
- **CAPACITY MODEL** notation indicating the new methodology
- Cost basis decomposed into seed investment, vitamins, and software components
- Revised confidence levels (generally improved due to better methodology fit)

Explore the updated specifications:
- [Phase 2 BOM](/plan/phase-2)
- [Phase 3a BOM](/plan/phase-3a)
- [Phase 3b BOM](/plan/phase-3b)

## Recommended Actions

Based on the multi-model consensus, we're implementing five programmatic changes:

1. **Formally retire linear unit-cost methodology** for Phase 2+ budgeting
2. **Commission "Vitamin Analysis"** as highest-priority systems engineering study
3. **Add closure ratio milestones** as Phase 1 program gates
4. **Fund tile architecture trade study** for Phase 3a vitamin minimization
5. **Establish Swarm Governance Software** as separately budgeted line item

## Conclusion

This revision doesn't make Project Dyson "cheap." $9 trillion is still an extraordinary investment requiring decades of sustained commitment. But it changes the conversation from "economically implausible" to "economically ambitious but achievable."

The key insight is that **self-replicating ISRU systems have fundamentally different economics** than procurement-based space programs. Our methodology now matches our architecture.

---

*The full multi-model discussion is available at [rq-0-28: ISRU Cost Methodology Validation](/questions/isru-cost-methodology-validation). We invite scrutiny of both the methodology and the revised estimates.*
