---
questionId: "rq-0-21"
slug: "optimal-module-size-manufacturing"
title: "Optimal module size for manufacturing and deployment"
questionType: "engineering-decision"
priority: "medium"
status: "open"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-5"
sourceBOMItemSlug: "solar-power-arrays"
sourceBOMItemName: "Solar Power Arrays"
relatedBOMItems:
  - "bom-0-5"
  - "bom-1-2"
tags:
  - "module-design"
  - "manufacturing"
  - "deployment"
createdDate: "2026-01-31"
---

## Background

The Solar Power Arrays for Phase 0 operations require 100 MW of generation capacity at 1 AU, constructed using modular architecture with triple-junction III-V solar cells (InGaP/GaAs/Ge). The consensus document identifies modular design as fundamental to the system architecture, but the three AI models diverge significantly on optimal module sizing: Claude recommends 2 MW modules, Gemini prefers 1 MW for easier handling, and GPT suggests 5 MW for efficiency gains. This five-fold range in recommended sizes represents a critical engineering decision that affects nearly every aspect of the array system—from manufacturing tooling and launch vehicle selection to on-orbit assembly procedures and maintenance protocols.

The current recommendation of 2 MW modules represents a compromise position, but this decision requires rigorous engineering analysis rather than simple averaging. Module size directly influences the number of discrete units (50 modules at 2 MW vs. 100 at 1 MW vs. 20 at 5 MW), interconnection complexity, and the granularity of fault tolerance in the distributed architecture.

## Why This Matters

Module size selection creates cascading dependencies throughout the project:

**Manufacturing Impact**: Larger modules may achieve better economies of scale in cell integration and structural fabrication, but require larger production facilities and more complex quality assurance. The $500M budget ($5/W installed) leaves limited margin per the consensus document, making manufacturing efficiency critical.

**Launch and Deployment**: Module dimensions and mass directly determine launch vehicle compatibility and payload utilization. A 5 MW module masses approximately 2.5x a 2 MW module, potentially requiring dedicated heavy-lift launches rather than rideshare opportunities. Conversely, 100 individual 1 MW modules multiply handling operations and deployment complexity.

**Fault Tolerance**: The distributed architecture specification requires graceful degradation. Smaller modules provide finer granularity—losing one 1 MW module represents 1% capacity loss versus 5% for a 5 MW unit. However, more modules mean more potential failure points in interconnections and power management systems.

**In-Space Manufacturing Pathway**: The recommended approach includes designing for in-space manufacturing of structural components in later phases. Module size establishes the baseline for future production tooling and assembly infrastructure at the Processing Station.

## Key Considerations

**Mass and Volume Constraints**: Each module must fit within launch fairing dimensions (typically 5m diameter for commercial vehicles) and mass limits. Power-to-mass ratios for III-V arrays typically range 100-150 W/kg, suggesting 2 MW modules mass 13,000-20,000 kg.

**Electrical Architecture**: The 600V DC primary distribution system must accommodate module-level power electronics. Larger modules reduce the number of DC-DC converters and distribution nodes but increase per-unit converter ratings and potential single-point failure impact.

**Deployment Mechanisms**: Autonomous sun tracking requires gimbal systems scaled to module size. Larger modules need more robust (heavier) tracking mechanisms; smaller modules multiply the number of independent tracking systems requiring coordination.

**Thermal Management**: Cell efficiency of 32-36% means 64-68% of incident energy becomes waste heat. Module size affects thermal gradients and radiator sizing—larger modules may experience greater temperature differentials across the array surface.

**Maintenance and Replacement**: The 15-year design life with <1.5%/year degradation suggests eventual module replacement. Smaller modules enable targeted replacement of degraded sections; larger modules may require replacing functional cells alongside degraded ones.

**Assembly Operations**: On-orbit assembly time scales with module count and interconnection complexity. The tradeoff between fewer large modules (simpler assembly, higher per-unit risk) versus many small modules (complex assembly, distributed risk) requires quantitative analysis.

## Research Directions

1. **Launch Vehicle Trade Study**: Analyze payload capacity, fairing dimensions, and cost-per-kilogram for candidate launch vehicles (Falcon Heavy, Starship, New Glenn, Vulcan) against 1 MW, 2 MW, and 5 MW module configurations. Calculate total launch costs and manifest efficiency for each scenario.

2. **Reliability and Availability Modeling**: Develop fault tree analysis for each module size option, incorporating cell degradation rates, power electronics failure modes, and interconnection reliability. Quantify system availability over the 15-year design life.

3. **Manufacturing Process Analysis**: Engage with III-V cell manufacturers (Spectrolab, SolAero, AZUR SPACE) to obtain production scaling data. Determine minimum efficient production batch sizes and how unit costs vary with module dimensions.

4. **Assembly Sequence Simulation**: Model on-orbit assembly timelines for each configuration, including robotic handling constraints, EVA requirements, and electrical integration procedures. Identify the module size that minimizes total deployment schedule risk.

5. **Thermal-Structural Finite Element Analysis**: Perform coupled thermal-structural modeling for candidate module sizes to validate structural integrity across operational temperature ranges and identify any size-dependent failure modes.
