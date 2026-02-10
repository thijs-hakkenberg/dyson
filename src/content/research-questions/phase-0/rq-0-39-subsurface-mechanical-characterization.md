---
questionId: "rq-0-39"
slug: "subsurface-mechanical-characterization"
title: "Target asteroid subsurface mechanical property characterization"
questionType: "experimentation"
status: "open"
priority: "high"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-2"
sourceBOMItemSlug: "mining-robots"
sourceBOMItemName: "Mining Robots"
relatedBOMItems:
  - "bom-0-2"
  - "bom-0-1"
parentQuestionId: "rq-0-26"
relatedResearchQuestions:
  - "rq-0-6"
  - "rq-0-7"
tags:
  - "asteroid"
  - "subsurface"
  - "mechanical-properties"
  - "characterization"
  - "excavation"
createdDate: "2026-02-10"
---

## Background

The rq-0-26 resolution validated dual counter-rotating bucket-wheel excavation as the baseline mechanism, with 90-95% torque cancellation demonstrated in models. However, the bucket-wheel design parameters (tooth geometry, rotation speed, penetration depth) depend critically on the mechanical properties of the material being excavated. OSIRIS-REx's TAG operation at Bennu revealed an unexpectedly low-density, weak surface that the spacecraft sank into — demonstrating that surface observations alone cannot predict subsurface behavior.

## Why This Matters

Subsurface mechanical properties determine:
- Bucket tooth design (cutting vs. scooping geometry)
- Required excavation force and power consumption
- Material flow into buckets (cohesive vs. granular behavior)
- Housing and containment requirements for ejected particles
- Whether the excavator can operate continuously or must adapt to heterogeneous zones

Without characterization data, bucket-wheel designs are based on assumed properties that may be wrong by an order of magnitude. Bennu and Ryugu sample returns provide surface data but limited subsurface information.

## Key Considerations

- Rubble pile asteroids may have very different subsurface properties than monolithic bodies
- Porosity varies from near-surface (50-60%) to depth (20-40%)
- Cohesion from van der Waals forces dominates at small particle sizes
- Thermal processing of near-surface layers by solar heating may create sintered crusts
- Volatile content affects mechanical behavior (ice-cemented vs. dry regolith)
- Returned samples from Bennu and Ryugu provide ground truth for limited depths

## Research Directions

1. **Returned sample mechanical testing**: Conduct comprehensive mechanical testing (shear strength, cohesion, compressive strength) on Bennu and Ryugu samples at various confining pressures.

2. **Radar tomography mission design**: Specify prospecting satellite radar capabilities for subsurface density and structure mapping of target asteroids.

3. **Regolith simulant development**: Create improved asteroid regolith simulants calibrated against returned sample data, including volatile-bearing variants.

4. **Penetrometer mission concept**: Design a low-cost precursor mission deploying penetrometers on a target asteroid to measure subsurface strength profiles to 1-2 meter depth.

5. **Adaptive excavation algorithm**: Develop control algorithms that allow bucket-wheel systems to adapt in real-time to varying material properties, reducing dependence on pre-characterization accuracy.
