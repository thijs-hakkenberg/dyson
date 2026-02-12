---
questionId: "rq-2-32"
slug: "comparative-feedstock-economics-multi-source"
title: "Comparative feedstock economics across multiple material sources"
questionType: "analysis"
priority: "high"
status: "open"
sourcePhase: "phase-2"
sourceBOMItemId: "bom-2-3"
sourceBOMItemSlug: "manufacturing-expansion"
sourceBOMItemName: "Additional Manufacturing Capacity"
relatedBOMItems:
  - "bom-2-3"
  - "bom-1-1"
  - "bom-1-4"
  - "bom-1-5"
relatedResearchQuestions:
  - "rq-1-21"
  - "rq-1-49"
  - "rq-1-50"
  - "rq-1-51"
  - "rq-2-20"
tags:
  - "economics"
  - "feedstock"
  - "ISRU"
  - "comparative-analysis"
  - "asteroid-mining"
  - "alternative-sources"
arxivReferences:
  - "1808.05099"
  - "1810.03836"
  - "1612.00709"
  - "2103.02435"
  - "2208.12617"
createdDate: "2026-02-13"
---

## Background

Project Dyson's feedstock strategy has evolved around asteroid ISRU as the primary material source, with alternative sources (Mercury, Moon, gas giants) acknowledged but not systematically compared. As the project scales from Phase 1 demonstration (1,000 collector units) to Phase 2 mass production (100,000+ units), the economics of material acquisition become the dominant cost driver—potentially exceeding manufacturing costs by an order of magnitude.

The asteroid mining economics literature provides initial cost baselines. Calla et al. (2018, arxiv:1808.05099) develop a comprehensive economic model for asteroid water extraction, finding baseline costs of approximately $1,136/kg for returned water—high enough that only in-space use cases (propellant, radiation shielding) close economically. Hein et al. (2018, arxiv:1810.03836) provide a techno-economic assessment framework for asteroid mining ventures, identifying throughput rate and equipment reuse as the two dominant cost drivers. Graps et al. (2016, arxiv:1612.00709) survey the asteroid mining landscape through the ASIME initiative, cataloging available resources and extraction challenges across asteroid taxonomic types. Lewicki et al. (2021, arxiv:2103.02435) analyze near-term asteroid utilization pathways, focusing on water and platinum-group metals as initial commercial targets.

Zhang (2022, arxiv:2208.12617) takes a broader view, analyzing energy economics pathways for Kardashev scale advancement including multi-source material strategies. This civilizational perspective is essential: a project that aims to capture a significant fraction of solar output cannot rely on a single feedstock source indefinitely.

No existing study provides a direct cross-comparison of $/kg-delivered for the four candidate sources (asteroids, Moon, Mercury, gas giants) under consistent assumptions. This question addresses that gap.

## Why This Matters

Material source selection at Phase 2 scale has cascading implications:

**Cost Dominance**: At 100,000+ units, even small differences in $/kg-delivered translate to trillions of dollars. If lunar materials cost 10× less to deliver than asteroid materials for certain elements, the savings could fund the entire lunar export infrastructure.

**Supply Chain Resilience**: A single-source feedstock strategy creates a single point of failure. Asteroid discovery of unfavorable composition, orbital dynamics preventing timely delivery, or processing technology failures could stall construction. Multi-source capability provides strategic redundancy.

**Element-Specific Optimization**: Different sources offer different element mixes. Asteroids provide water, carbon, and platinum-group metals. The Moon provides aluminum and titanium. Mercury provides silicon and iron in enormous quantities. The optimal strategy likely involves multiple sources supplying different element categories.

**Phase Transition Triggers**: Understanding the comparative economics determines when to activate each source. If asteroid ISRU becomes uneconomical above 10,000 units/year due to target depletion or logistics constraints, the crossover to lunar or Mercury sources must be planned in advance.

**Capital Allocation**: Phase 2's $50T+ budget must be allocated between manufacturing capacity, material acquisition, and infrastructure. Without comparative economics, this allocation is guesswork.

## Key Considerations

- **Consistent Cost Framework**: All sources must be compared using identical cost categories: prospecting/characterization, extraction/processing, transport to construction site, quality assurance, and infrastructure amortization. Different studies use different cost frameworks, making direct comparison unreliable without normalization.

- **Throughput Rate Effects**: Hein et al. (2018) identify throughput as the dominant cost lever. At small scales, all ISRU is expensive. At large scales, fixed infrastructure costs are amortized and marginal costs dominate. The crossover scale varies by source.

- **Technology Readiness Discount**: Sources requiring more speculative technology (Mercury self-replicating factories, gas giant atmospheric mining) should be discounted for risk. A risk-adjusted $/kg metric would capture both economic cost and probability of achieving projected costs.

- **Time Value**: Materials available sooner are worth more than materials available later, even at higher $/kg. A lunar bootstrap delivering materials in 2035 may be more valuable than cheaper asteroid materials available in 2045.

- **Energy Cost Inclusion**: All processing is ultimately limited by energy availability. Sources with abundant local energy (Mercury: 6.7× solar flux; Moon: 1× during daytime) have fundamentally different cost structures than asteroid targets (variable solar flux, no stable platform).

| Source | Mass Available | Delta-V to 1 AU | Solar Flux | Key Elements | Earliest Phase |
|--------|---------------|-----------------|------------|-------------|---------------|
| NEA (C-type) | 10¹⁸-10²⁰ kg | 0.5-4 km/s | Variable | H₂O, C, Fe, Ni, PGMs | Phase 1 |
| NEA (S-type) | 10¹⁸-10²⁰ kg | 0.5-4 km/s | Variable | Fe, Ni, Si, Mg | Phase 1 |
| Moon | 7.3×10²² kg | 2.4 km/s escape | 1× (day) | Si, Al, Fe, Ti, O₂ | Phase 1-2 |
| Mercury | 3.3×10²³ kg | ~9 km/s | 6.7× | Si, Fe, S, Mg | Phase 2-3 |
| Gas giants | 10²⁷+ kg (atm) | 30-60 km/s | 0.04-0.0025× | H, He, CH₄, NH₃ | Phase 3+ |

## Research Directions

1. **Normalized $/kg Model**: Build a parametric cost model that calculates $/kg-of-useful-element-delivered-to-1AU for each source under consistent assumptions. Include capital amortization over 10, 25, and 50-year periods. Sensitivity-test against throughput rate, energy cost, and technology readiness assumptions.

2. **Element-Specific Source Optimization**: For each element critical to swarm construction (Si, Fe, Al, Ti, Cu, O₂, H₂O, C, PGMs), identify the lowest-cost source at each production scale (10, 100, 1,000, 10,000, 100,000 tonnes/year). Produce an optimal multi-source procurement strategy.

3. **Phase-Dependent Source Portfolio**: Model the optimal source mix at each project phase. Phase 1 may be 100% asteroid or lunar. Phase 2 may be 60% asteroid + 40% lunar. Phase 3 may shift to 80% Mercury as self-replicating factories come online. Quantify the portfolio evolution.

4. **Risk-Adjusted Comparison**: Apply technology readiness levels (TRL) and probability of success estimates to each source pathway. Calculate the risk-adjusted expected cost, accounting for the possibility that Mercury factories may not achieve projected costs or gas giant mining may not be feasible at all.

5. **Supply Chain Network Design**: Model the multi-source supply chain as a network optimization problem. Determine optimal depot locations (L1, L2, asteroid belt), transport fleet composition, and inventory management strategies for a multi-source feedstock system.

6. **Depletion and Scalability Limits**: For each source, estimate the maximum sustainable extraction rate before the resource is effectively depleted or extraction costs rise sharply. Determine at what swarm scale each source becomes the bottleneck.
