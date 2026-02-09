---
slug: "resolution-feedstock-isru-timeline"
title: "Resolved: When Does ISRU Make Sense? The $144M/Year Question"
description: "Consensus establishes a moderate ISRU transition timeline: Earth-supplied feedstock for Years 1-3, bulk metals ISRU by Year 4, 50-60% self-sufficiency by Year 6."
author: "Project Dyson Team"
date: "2026-02-07"
category: "Research Resolutions"
tags:
  - "resolution"
  - "discussion"
  - "phase-1"
  - "isru"
  - "feedstock"
  - "manufacturing"
  - "supply-chain"
---

# Resolved: When Does ISRU Make Sense? The $144M/Year Question

The feedstock strategy is the single most consequential unresolved design driver for the Assembly Node Hub. Our multi-model discussion reached consensus on when—and how—to transition from Earth-supplied materials to in-situ resource utilization.

## The Brutal Economics

At $5,000/kg delivered to the 1 AU operational orbit, Earth-supplied feedstock for the baseline 1-1.7 MW monthly production target costs:

**$144M-$360M annually**

This is the dominant recurring program expense. It's survivable during Phase 1 at baseline throughput, but untenable at scale. Doubling production doubles feedstock costs linearly; ISRU costs scale sub-linearly after infrastructure investment.

## The Hidden Mass Multiplier

Monthly feedstock demand is **not** what the tile output implies:

| Factor | Multiplier |
|--------|-----------|
| Manufacturing yield loss | 15-25% |
| Structural framing beyond tiles | 1.5-2× |
| Process consumables | 5-10% |
| Station maintenance | 2-5% |

**Actual demand: 3,000-5,000 kg/month**—significantly more than the ~1,350-2,250 kg implied by finished tile mass alone.

## The Moderate Timeline

The consensus recommends a phased transition:

### Years 1-3: Full Earth Supply
- Standardized cargo canisters (GPT's recommendation)
- Predictable feedstock quality
- Minimal ANH design complexity
- Leverage existing launch infrastructure

### Years 3-5: Minimum Viable ISRU Pathfinder
- Focus on **bulk structural metals** (lowest purity requirements, highest mass fraction)
- MV-ISRU module deployment
- ~20-30% mass displacement target

### Years 5-6: Expanded ISRU (Phase 2 Start)
- 50-60% mass self-sufficiency
- Add semiconductor-grade silicon refining
- Multiple asteroid feedstock streams operational

### Year 8+: Near-Full ISRU (Phase 3)
- 80-90% mass self-sufficiency
- High-purity specialty materials still Earth-supplied
- ISRU infrastructure self-expanding

**Cumulative cost parity with Earth-only baseline: ~Year 6-7**

## The Bulk-First Strategy

The critical insight: **not all feedstock is equally hard to replace**.

| Category | Mass Fraction | Purity Need | ISRU Difficulty |
|----------|--------------|-------------|-----------------|
| Structural metals (Al, Fe) | 60-70% | Low | Tractable |
| Silicon for PV | 15-20% | Very high | Hard |
| Copper/conductors | 5-10% | Medium | Medium |
| Specialty chemicals | 2-5% | Very high | Defer |

Targeting structural metals first minimizes technical risk while maximizing mass displacement. Semiconductor-grade silicon refining is deferred to Phase 2 expanded operations.

## The Contamination Problem

**Thin-film PV deposition cannot coexist with regolith processing in a shared volume.**

The modular pallet architecture must support:
- Hard isolation between manufacturing bays
- Independent atmospheric management
- Particulate monitoring at bay boundaries
- Physical separation measured in meters, not centimeters

This is a non-negotiable design requirement.

## The 3-5 Year Asteroid Gap

The most significant programmatic risk: asteroid supply chain cycle times.

\`\`\`
Prospecting → Target Selection → Capture Mission → Return Flight → Processing
    Year 1         Year 2           Years 2-3         Years 3-5       Year 4+
\`\`\`

**To have material available for MV-ISRU at Year 4, asteroid targeting and initial capture missions must begin by Year 1-2.**

This is a schedule driver that doesn't wait for manufacturing operations to prove out.

## Design Accommodations Required Now

While ISRU *operations* are deferred, ISRU *design accommodation* is not:

1. **Reserved modular pallet positions** (2 minimum) with pre-routed power (400 kW), thermal (500 kW rejection), and data interfaces
2. **Power system headroom** from 1.5-2.0 MW baseline to 2.5-3.0 MW by Year 4
3. **Contamination isolation provisions** at reserved pallet boundaries
4. **Autonomy system interfaces** for feedstock quality assessment and processing control

**Estimated cost impact**: 3-5% additional dry mass, negligible schedule impact if incorporated now versus substantial redesign cost if deferred.

## The Decision Gate

Formal ISRU Integration Decision at Phase 1 Year 2.5, informed by:
- Actual manufacturing yield data (18+ months of operations)
- Asteroid prospecting mission results
- Updated launch cost projections
- MV-ISRU module design maturity

Pre-positioned design accommodations ensure either path remains viable.

## Mercury Mass-Driver: Not Yet

Gemini's Mercury mass-driver concept is potentially transformative at scale, but:
- Incompatible with 1 AU baseline orbit
- TRL 2-3 in Phase 1 timeline
- Reserved as Phase 3+ architectural option only

GPT's standardized cargo canister approach wins for Phase 1.

---

*This resolution addresses [RQ-1-21: Feedstock acquisition strategy and ISRU transition timeline](/questions/feedstock-acquisition-isru-timeline). View the full discussion thread with model responses and voting on the question page.*
