---
questionId: "rq-0-43"
slug: "mass-closure-ratio-validation"
title: "Mass closure ratio validation for ISRU economics"
questionType: "engineering-decision"
status: "open"
priority: "high"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-3"
sourceBOMItemSlug: "material-processing-station"
sourceBOMItemName: "Material Processing Station"
relatedBOMItems:
  - "bom-0-3"
  - "bom-0-6"
  - "bom-2-3"
parentQuestionId: "rq-0-28"
tags:
  - "mass-closure"
  - "ISRU"
  - "economics"
  - "self-replicating"
  - "validation"
createdDate: "2026-02-10"
---

## Background

The rq-0-28 resolution established the capacity cost model as the replacement for linear cost scaling, fundamentally changing Project Dyson's budget methodology. The new model's economics depend critically on the mass closure ratio — the fraction of a manufacturing system's mass that can be produced from in-situ materials. The consensus assumes 96% closure for Phase 3a foundries, meaning only 4% of mass must be imported from Earth. This single parameter is the highest-leverage unknown in the entire ISRU economic model: at 96% closure, costs drop by 1,000x; at 80% closure, the reduction is only 5x.

## Why This Matters

The mass closure ratio determines:
- How many seed units must be launched from Earth to bootstrap the system
- The exponential growth rate of manufacturing capacity
- The steady-state import requirement (and thus ongoing Earth-launch costs)
- Whether the capacity cost model actually delivers the predicted cost reductions
- The timeline from seed deployment to self-sustaining operations

A 96% closure ratio has never been demonstrated for any manufacturing system, terrestrial or space-based. The closest analogs (biological organisms) achieve >99% mass closure but over evolutionary timescales with different material constraints.

## Key Considerations

- Electronics, sensors, and control systems contain rare elements not found in asteroids
- Optical components require extreme purity not easily achieved via ISRU
- Seals, lubricants, and polymers require specific organic chemistry
- Each non-ISRU component creates an ongoing Earth-supply dependency
- Closure ratio likely improves over time as ISRU capabilities mature
- Different product types have different achievable closure ratios

## Research Directions

1. **Component-level closure analysis**: For each BOM item in Phases 1-3, decompose into materials and classify each as asteroid-available, synthesizable from asteroid feedstock, or Earth-import-only.

2. **Critical element identification**: Identify the specific elements and compounds that limit closure ratio, quantifying their mass fraction in each manufactured product.

3. **Closure improvement roadmap**: Map the technology development path from current capabilities (~0% closure) through Phase 1 (~50%) to Phase 3 targets (~96%), identifying key milestones.

4. **Sensitivity analysis**: Model budget estimates across a range of closure ratios (50%, 70%, 85%, 96%, 99%) to understand which threshold transitions matter most economically.

5. **Terrestrial analog benchmarking**: Study the most self-sufficient terrestrial manufacturing facilities to establish empirical upper bounds on closure ratio with current technology.
