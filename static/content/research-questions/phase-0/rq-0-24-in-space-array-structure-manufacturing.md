---
questionId: "rq-0-24"
slug: "in-space-array-structure-manufacturing"
title: "In-space manufacturing of array structures"
questionType: "experimentation"
priority: "medium"
status: "open"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-5"
sourceBOMItemSlug: "solar-power-arrays"
sourceBOMItemName: "Solar Power Arrays"
relatedBOMItems:
  - "bom-0-5"
  - "bom-0-3"
  - "bom-2-3"
tags:
  - "in-space-manufacturing"
  - "structures"
  - "ISRU"
createdDate: "2026-01-31"
---

## Background

The Solar Power Arrays for Phase 0 operations require 100 MW of generating capacity using modular 2 MW units based on triple-junction III-V solar cells (InGaP/GaAs/Ge). The consensus document explicitly identifies in-space manufacturing of structural components as a design consideration for later phases, noting that "array structures be manufactured in space using station output" remains an open question. This question emerges from the fundamental tension between the high launch costs of pre-fabricated array structures and the potential for using the station's own power output to manufacture subsequent expansion capacity on-site.

The recommended approach calls for phased deployment aligned with Processing Station power needs, with flat-plate designs initially and concentrator options for expansion. This phasing creates a natural opportunity: once initial arrays are operational, their output could theoretically power manufacturing processes to produce structural elements for additional arrays, creating a self-reinforcing growth cycle essential to Dyson swarm economics.

## Why This Matters

The cost estimates for the Solar Power Arrays range from $3.50 to $5.00 per watt installed, with the $500M budget for 100 MW representing the upper bound at $5/W. A significant portion of this cost derives from launching structural mass—deployment booms, mounting frames, tracking mechanisms, and thermal management systems—from Earth. If structural components can be manufactured at the L4/L5 location using locally processed materials, the cost per watt for expansion phases could drop substantially.

This capability directly impacts Project Dyson's scaling trajectory. The Dyson swarm will ultimately require power generation capacity many orders of magnitude beyond 100 MW. If each megawatt of expansion requires full Earth-launch logistics, the project faces compounding cost barriers. Conversely, if 70-80% of structural mass can be produced in-space, expansion becomes limited primarily by raw material availability and cell manufacturing—a fundamentally different constraint profile.

Dependencies include the Processing Station's material output capabilities, availability of suitable feedstocks (aluminum, steel, or composite precursors), and development of space-qualified manufacturing equipment. The 15-year design life requirement means structures must meet rigorous standards regardless of manufacturing origin.

## Key Considerations

**Material Requirements**: Array structures must withstand thermal cycling, maintain dimensional stability for sun tracking systems, and resist degradation over the 15-year minimum lifespan. Aluminum alloys are traditional choices, but in-space options may include processed regolith-derived metals or carbon composites from asteroid-sourced materials.

**Power Budget**: Manufacturing processes (extrusion, forming, welding, or additive manufacturing) require substantial energy input. The 100 MW initial capacity with 500 MWh storage must first satisfy Processing Station operational needs before surplus can support manufacturing. Energy storage sizing directly affects manufacturing duty cycles.

**Precision Requirements**: The 600V DC distribution system and autonomous sun tracking demand structural tolerances compatible with electrical interconnects and pointing accuracy. In-space manufacturing must achieve tolerances comparable to Earth-fabricated components.

**Module Size Tradeoffs**: The divergent views on module size (1 MW to 5 MW) affect manufacturing scale. Smaller 1 MW modules may be more feasible for early in-space production; larger 5 MW modules offer efficiency but require more sophisticated manufacturing infrastructure.

**Cell Integration**: While structures may be manufactured in-space, the III-V solar cells (32-36% efficiency) require semiconductor fabrication capabilities unlikely to be available in early phases. Hybrid approaches—in-space structures with Earth-supplied cells—may be optimal.

## Research Directions

1. **Structural Mass Fraction Analysis**: Quantify the mass breakdown of 2 MW array modules to determine what percentage of total mass could feasibly be manufactured in-space. Identify which components (primary structure, deployment mechanisms, thermal systems, electrical harnesses) are candidates for local production versus Earth supply.

2. **Manufacturing Process Trade Study**: Evaluate candidate manufacturing technologies (aluminum extrusion, additive manufacturing, composite layup) for space deployment. Assess power requirements, equipment mass, feedstock flexibility, and achievable tolerances for each approach against array structural specifications.

3. **Feedstock Pathway Mapping**: Identify viable material sources at L4/L5 or nearby asteroid targets. Characterize processing requirements to convert raw materials into manufacturing-ready feedstock, and estimate the Processing Station capacity needed to support array structure production rates.

4. **Prototype Demonstration Planning**: Design a subscale experiment to manufacture a representative structural element (deployment boom segment or mounting bracket) using Processing Station output. Define success criteria for mechanical properties, dimensional accuracy, and production rate.

5. **Economic Break-Even Analysis**: Calculate the cumulative power generation capacity at which in-space manufacturing infrastructure investment becomes cost-effective compared to continued Earth launch, using the $3.50-$5.00/W installed cost range as baseline.
