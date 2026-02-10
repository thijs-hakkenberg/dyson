---
questionId: "rq-0-11"
slug: "microgravity-metallurgy-scaling"
title: "Scaling microgravity metallurgy to industrial production"
questionType: "experimentation"
priority: "critical"
status: "open"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-3"
sourceBOMItemSlug: "material-processing-station"
sourceBOMItemName: "Material Processing Station"
relatedBOMItems:
  - "bom-0-3"
  - "bom-2-3"
tags:
  - "metallurgy"
  - "microgravity"
  - "manufacturing"
  - "scaling"
arxivReferences:
  - "2109.02201"
  - "2102.09815"
createdDate: "2026-01-31"
---

## Background

The Material Processing Station is a cornerstone infrastructure element for Project Dyson, designed to convert raw asteroid material into refined metals and semiconductors for swarm component manufacturing. The consensus specification calls for a modular station with initial mass of 400,000-500,000 kg, scaling to 800,000-1,000,000 kg at full build, capable of processing 50,000 tonnes of material annually. The station will produce structural metals (aluminum, iron, nickel) and potentially solar-grade silicon using either solar concentrator furnaces, electric arc furnaces, or a hybrid approach.

This question arises directly from the open questions identified across all three AI models: "Can microgravity metallurgy scale from lab experiments to industrial production?" Current microgravity metallurgy experience is limited to small-scale experiments aboard the ISS and parabolic flight campaigns, typically processing samples measured in grams. The Material Processing Station requires scaling this by approximately six to eight orders of magnitude to achieve the 50,000 tonnes/year throughput target.

## Why This Matters

This is classified as a critical priority question because the entire downstream manufacturing chain depends on reliable, high-quality feedstock production. If microgravity metallurgy cannot scale effectively, the project faces three potential outcomes:

1. **Station redesign**: Incorporating artificial gravity via rotation would fundamentally alter the station architecture, potentially doubling mass requirements and increasing the $10B baseline cost toward the upper $15B estimate.

2. **Quality degradation**: Accepting lower-purity outputs would compromise solar cell efficiency and structural integrity of swarm components, requiring either more material per unit or more frequent replacement cycles.

3. **Throughput limitations**: If batch sizes remain constrained, achieving 50,000 tonnes/year may require parallel processing lines, again increasing station mass and complexity.

The consensus recommendation to "conduct ISS metallurgy experiments before committing to station design" explicitly acknowledges this risk. The 30-40% contingency recommended for this "high-risk element" is largely driven by uncertainty in scaling behavior.

## Key Considerations

**Thermal management**: Smelting operations generate substantial waste heat. At 1-2.5 MW power capacity, the station must reject megawatts of thermal energy without convective cooling. Radiator sizing scales with processing throughput, and current designs assume efficient heat transfer from molten metal pools—behavior that differs significantly in microgravity.

**Melt containment**: Without gravity, molten metal forms spherical blobs governed by surface tension. Containing and directing 50,000 tonnes/year of liquid metal requires either electromagnetic confinement, crucible-based approaches with active positioning, or containerless processing. Each method has different scaling characteristics.

**Slag separation**: The open question regarding slag management in microgravity directly impacts purity. Terrestrial smelting relies on density differences to float slag; alternative separation mechanisms (electromagnetic, centrifugal, or chemical) must be validated at scale.

**Zone refining in zero-g**: Producing solar-grade silicon (if included in scope) requires zone refining. The optimal process parameters—heating rate, zone travel speed, impurity segregation coefficients—may differ substantially from terrestrial values due to altered convection patterns.

**Crew versus automation tradeoffs**: The divergent views on crew presence (quarterly visits versus annual) partly reflect uncertainty about how much human intervention scaling operations will require. Fully autonomous operation assumes predictable, well-characterized processes.

## Research Directions

1. **Graduated ISS experiment series**: Design a three-phase experiment campaign progressing from 100g to 10kg to 100kg batch sizes, measuring melt homogeneity, impurity distribution, and thermal profiles at each scale. This directly addresses the consensus recommendation for ISS experiments before design commitment.

2. **Computational fluid dynamics modeling**: Develop validated CFD models for molten aluminum, iron, and nickel behavior in microgravity, incorporating electromagnetic body forces. Calibrate against existing ISS data, then extrapolate to industrial batch sizes to identify potential instabilities or containment failures.

3. **Hybrid gravity testbed design**: Specify a rotating test section that could be integrated into the modular station architecture, allowing comparison of zero-g versus partial-g (0.01-0.1g) metallurgy at pilot scale. This provides a fallback if pure microgravity processing proves intractable.

4. **Slag separation mechanism prototyping**: Build and test three candidate slag separation systems—electromagnetic filtration, centrifugal separation, and flux-based chemical methods—at progressively larger scales in parabolic flight and ISS environments.

5. **Terrestrial analog facility**: Establish a ground-based processing line using electromagnetic levitation to simulate containerless microgravity conditions, enabling rapid iteration on process parameters before committing to orbital experiments.
