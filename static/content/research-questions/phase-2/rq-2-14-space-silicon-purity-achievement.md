---
questionId: "rq-2-14"
slug: "space-silicon-purity-achievement"
title: "Space-based silicon purity achievement"
questionType: "experimentation"
priority: "critical"
status: "open"
sourcePhase: "phase-2"
sourceBOMItemId: "bom-2-3"
sourceBOMItemSlug: "manufacturing-expansion"
sourceBOMItemName: "Manufacturing Expansion"
relatedBOMItems:
  - "bom-2-3"
  - "bom-0-3"
tags:
  - "silicon"
  - "purity"
  - "zone-refining"
  - "solar-cells"
createdDate: "2026-02-01"
---

## Background

The Manufacturing Expansion BOM item specifies Autonomous Manufacturing Nodes (AMNs) capable of producing 2,000-5,000 m²/day of thin-film solar collectors, with a target of 94% mass closure from in-situ resources and only 6-10% of total node mass sourced from Earth. Solar cells represent a critical output product, as the Dyson swarm's primary function is energy collection. The consensus document explicitly identifies silicon purity achievement as an unresolved question: specifically, whether 99.99% (4N) purity silicon can be produced via space-based zone refining, or whether solar-grade silicon must remain in the Earth-supplied mass fraction.

Asteroid feedstock contains silicon primarily as silicates (olivine, pyroxene, plagioclase), requiring reduction to elemental silicon before purification. The recommended Molten Oxide Electrolysis (MOE) process can extract silicon from oxide melts, but the resulting metallurgical-grade silicon typically achieves only 98-99% purity. Terrestrial solar cell production requires 6N-9N (99.9999-99.9999999%) purity for crystalline silicon cells, or 4N-5N for some thin-film applications.

## Why This Matters

Silicon purity directly determines whether the swarm can achieve its self-replication targets. If space-based purification cannot reach solar-cell-grade purity:

- **Mass closure drops significantly**: Solar cells could constitute 15-30% of collector mass. If silicon wafers must be Earth-supplied, the 6-10% Earth-sourced target becomes unachievable, potentially doubling or tripling launch mass requirements.
- **Replication cycle extends**: The 18-24 month replication target assumes local production of all major subsystems. Earth-supply dependencies introduce 6-12 month logistics delays per node.
- **Exponential growth stalls**: With 30% of production capacity allocated to replication, any bottleneck in critical components cascades through the entire fleet expansion timeline.

Conversely, if 4N+ purity is achievable in-situ, the project gains substantial schedule and cost margin. This question also determines whether thin-film (amorphous silicon, CIGS) or crystalline silicon architectures should be baselined—thin-film tolerates lower purity but has reduced efficiency and potentially worse radiation degradation.

## Key Considerations

**Feedstock Variability**: The consensus document flags asteroid composition variability as an open question. Silicon content in target asteroids ranges from 15-25% by mass (S-type) to <5% (M-type metallic). Impurity profiles (iron, aluminum, calcium, magnesium) vary significantly and affect purification difficulty.

**Zone Refining in Microgravity**: Terrestrial float-zone refining uses surface tension to maintain molten zone geometry against gravity. Microgravity eliminates convective mixing but introduces new challenges: Marangoni convection dominates, potentially improving segregation efficiency but complicating thermal control. No validated data exists for multi-pass zone refining at production scale in space.

**Power and Thermal Budget**: Zone refining requires sustained temperatures of 1,414°C (silicon melting point) with precise thermal gradients. The 20-50 MW electrical allocation per node must support refining alongside MOE (12 MW thermal for smelting) and other processes. Thermal rejection capacity of 35-60 MW may constrain simultaneous high-temperature operations.

**Contamination Control**: The consensus document emphasizes strict zoning between dirty and clean operations. Zone refining requires extreme cleanliness—any crucible contact introduces impurities. Containerless processing (electromagnetic levitation) may be necessary but adds complexity.

**Alternative Pathways**: Thin-film technologies (amorphous silicon, cadmium telluride, perovskites) require lower purity feedstock but introduce other constraints—cadmium toxicity, tellurium scarcity, perovskite radiation stability unknowns.

## Research Directions

1. **Microgravity Zone Refining Demonstration**: Design and execute ISS or free-flyer experiments to validate silicon zone refining in microgravity. Measure achievable purity versus number of passes, characterize Marangoni-driven segregation coefficients, and establish process parameters for 4N+ output.

2. **MOE Output Characterization**: Analyze metallurgical-grade silicon produced by MOE from simulated asteroid feedstock (CI, CM, S-type compositions). Quantify impurity concentrations (B, P, Fe, Al, Ca) and determine required purification factor to reach solar-cell grade.

3. **Thin-Film Purity Threshold Testing**: Fabricate amorphous silicon and microcrystalline silicon thin-film cells using 3N, 4N, and 5N feedstock. Measure efficiency, degradation rates under proton/electron irradiation, and establish minimum acceptable purity for 25-year design life.

4. **Containerless Processing Feasibility Study**: Evaluate electromagnetic levitation melting and zone refining for silicon at production rates of 10-100 kg/day. Assess power requirements, coil contamination risks, and integration with AMN thermal architecture.

5. **Hybrid Architecture Trade Study**: Model swarm economics under scenarios where crystalline silicon cells are Earth-supplied versus locally-produced thin-film. Quantify breakeven purity threshold where in-situ production becomes cost-effective despite lower cell efficiency.
