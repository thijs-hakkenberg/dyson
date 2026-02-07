---
questionId: "rq-0-27"
slug: "water-first-resource-strategy"
title: "Water-first resource extraction strategy for early ISRU operations"
questionType: "engineering-decision"
priority: "critical"
status: "open"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-3"
sourceBOMItemSlug: "material-processing-station"
sourceBOMItemName: "Material Processing Station"
relatedBOMItems:
  - "bom-0-3"
  - "bom-0-6"
  - "bom-0-2"
relatedResearchQuestions:
  - "rq-0-14"
  - "rq-0-6"
tags:
  - "water"
  - "volatiles"
  - "ISRU"
  - "resource-strategy"
  - "propellant"
arxivReferences:
  - "1702.00335"
  - "1810.03836"
createdDate: "2026-02-07"
---

## Background

Current Phase 0 specifications prioritize metal extraction for Dyson swarm construction materials, with propellant production listed as a secondary consideration (rq-0-14). However, recent techno-economic analyses of asteroid mining (arxiv 1810.03836) and excavation studies (arxiv 1702.00335) suggest that water/volatiles should be the primary extraction target in early operations. Water provides immediate propellant value (enabling further operations), requires simpler processing than metals, and commands high in-space value per unit mass.

The addition of ISPP systems (bom-0-6) to Phase 0 creates an opportunity to reexamine the overall resource extraction strategy. A water-first approach would prioritize hydrated C-type asteroids, optimize mining robots for volatile extraction, and configure the material processing station with water recovery as the primary throughput path.

## Why This Matters

The resource extraction sequence fundamentally shapes Phase 0 infrastructure design and downstream economics. Choosing the wrong priority could strand investments or delay self-sustaining operations.

**Economic arguments for water-first:**
- Water has immediate utility as propellant (H2/O2) for transport vehicles and orbital tugs
- In-space propellant eliminates Earth-launch costs for fuel (~$10,000/kg to LEO)
- Water processing is lower-temperature than metal refining (easier early operations)
- Spacecraft reusability depends on propellant availability (arxiv 1810.03836 emphasizes this)

**Dependencies affected:**
- **Target asteroid selection**: Water-first favors C-type carbonaceous asteroids over M-type metallics
- **Mining robot design (bom-0-2)**: Volatiles extraction may use different mechanisms than bulk regolith mining
- **Material processing station (bom-0-3)**: Water extraction requires thermal processing; metals require smelting
- **Transport vehicle operations (bom-0-4)**: In-situ propellant enables expanded operational envelopes

**Risk consequences:**
- Metal-first approach may require continuous Earth-launched propellant until infrastructure matures
- Water-first approach may delay structural material availability for Phase 1
- Hybrid approach requires more complex processing station design

## Key Considerations

**Water extraction process (from arxiv 1702.00335):**
- Heat regolith to 150-500°C to release adsorbed water
- Higher temperatures (up to 1000°C) release chemically bound water from hydrated minerals
- Condensation and electrolysis produce H2 and O2 propellants
- Lower energy requirements than metal processing

**Economic analysis (from arxiv 1810.03836):**
- Spacecraft reusability is critical for positive NPV
- Water/propellant enables reusability at lower infrastructure investment
- Initial missions should prioritize enabling future missions over direct return
- Break-even occurs faster with water-first strategy

**Asteroid target implications:**
- C-type asteroids: 10-20% water content, common in main belt and NEA population
- Water concentrated in hydrated clay minerals (phyllosilicates)
- Prospecting satellites (bom-0-1) should prioritize water detection
- Some high-water targets may have weaker structural metals

**Processing station configuration:**
- Water-first: thermal processing chambers, condensers, electrolysis cells as primary systems
- Metal-first: furnaces, zone refining, casting as primary systems
- Hybrid: modular design allowing both pathways but higher initial mass

## Research Directions

1. **Techno-economic model adaptation**: Extend arxiv 1810.03836 analysis to Project Dyson's specific mission parameters, calculating NPV and break-even timelines for water-first vs. metal-first vs. hybrid strategies.

2. **Target asteroid reranking**: Reevaluate the prospecting satellite target list with water content as primary criterion, identifying high-water NEA targets accessible within Phase 0 timeline.

3. **Processing station trade study**: Design three variants of the material processing station (water-primary, metal-primary, balanced) comparing mass, power, complexity, and throughput for each strategy.

4. **Mining robot volatile extraction study**: Define modifications to mining robot design for optimizing volatile extraction from hydrated regolith, including thermal preconditioning and vapor capture.

5. **Propellant depot architecture**: Specify the storage and distribution infrastructure for in-situ produced propellant, including depot locations, tank sizing, and logistics to transport vehicles and orbital tugs.

6. **Phase 1 material timeline analysis**: Determine the minimum metal production rate required to support Phase 1 swarm construction, establishing the constraint on how long water-first prioritization can persist.
