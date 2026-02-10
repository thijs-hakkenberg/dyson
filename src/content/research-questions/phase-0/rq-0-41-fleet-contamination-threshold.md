---
questionId: "rq-0-41"
slug: "fleet-contamination-threshold"
title: "Fleet-level contamination acceptability threshold for excavation operations"
questionType: "engineering-decision"
status: "open"
priority: "medium"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-2"
sourceBOMItemSlug: "mining-robots"
sourceBOMItemName: "Mining Robots"
relatedBOMItems:
  - "bom-0-2"
  - "bom-0-1"
parentQuestionId: "rq-0-26"
relatedResearchQuestions:
  - "rq-0-9"
tags:
  - "contamination"
  - "debris"
  - "fleet-operations"
  - "particle-containment"
createdDate: "2026-02-10"
---

## Background

The rq-0-26 bucket-wheel design includes integrated housing for particle containment during excavation. The target is >99% containment efficiency, but at 20,000+ tonnes of material processed per robot per year across a fleet of 20 robots, even 1% escape represents 4,000+ tonnes of ejected particles annually. These particles can contaminate optical surfaces, jam mechanisms, degrade solar arrays, and create collision hazards for nearby spacecraft.

## Why This Matters

The contamination threshold determines:
- Required containment housing design complexity and mass
- Operational spacing between robots and other assets
- Maintenance intervals for optical and mechanical systems
- Whether prospecting satellites can operate in proximity to active mining
- Long-term asteroid environment degradation affecting future operations

At fleet scale, the cumulative debris environment around a mining operation could become self-sustaining if ejection rates exceed natural dispersal rates, creating a persistent contamination cloud that affects all operations.

## Key Considerations

- Particle ejection velocities may exceed asteroid escape velocity (cm/s to m/s)
- Electrostatic charging of ejected particles complicates prediction and mitigation
- Optical surfaces (solar arrays, sensors, cameras) are most sensitive to contamination
- Particle sizes range from microns to centimeters with different hazard profiles
- Multiple robots operating simultaneously create overlapping contamination zones
- Self-cleaning mechanisms add mass and complexity to all nearby systems

## Research Directions

1. **Debris environment modeling**: Simulate the particle population around an asteroid with 20 active excavators at various containment efficiencies, predicting steady-state debris density.

2. **Containment efficiency testing**: Measure actual particle escape rates from enclosed bucket-wheel prototypes using various housing designs and sealing approaches.

3. **Fleet spacing optimization**: Determine minimum safe operating distances between excavators and between excavators and other assets as a function of containment efficiency.

4. **Contamination impact assessment**: Quantify degradation rates for solar arrays, optical sensors, and mechanical systems as a function of particle flux exposure.

5. **Mitigation hierarchy**: Define a tiered approach from source containment (housing design) to path control (electrostatic barriers) to receiver protection (self-cleaning surfaces).
