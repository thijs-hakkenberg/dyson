---
questionId: "rq-0-35"
slug: "radiation-shielding-mass-validation"
title: "Radiation shielding mass requirement validation for crew modules"
questionType: "engineering-decision"
status: "investigating"
priority: "high"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-4"
sourceBOMItemSlug: "transport-vehicles"
sourceBOMItemName: "Transport Vehicles"
relatedBOMItems:
  - "bom-0-4"
parentQuestionId: "rq-0-18"
tags:
  - "radiation"
  - "shielding"
  - "crew-safety"
  - "mass-budget"
  - "hybrid-shielding"
externalReferences:
  - "StemRad-2024-astrorad-space-radiation"
  - "LifeSciSpace-2023-hybrid-shielding-methods"
  - "NewSpaceEcon-2025-active-radiation-shielding"
  - "NASA-2015-real-martians-radiation"
  - "Frontiers-2023-deep-space-radiation-mitigation"
  - "ANS-2025-deep-space-radiation-controls"
createdDate: "2026-02-10"
---

## Background

The rq-0-18 resolution established a modular human-rating approach where all 10 transport vehicles get human-ratable structure, with crew kits installed on 3 vehicles. The discussion estimated radiation shielding mass at 4,000-8,000 kg per crew module — a 2x uncertainty range that significantly affects the vehicle's payload capacity in human-rated configuration. At the lower bound, the mass penalty is manageable (2-4% of 200,000 kg payload). At the upper bound, it begins to compete meaningfully with cargo capacity.

## Why This Matters

Shielding mass directly determines:
- Net payload capacity when operating in crew configuration
- Crew module kit total mass and associated launch costs
- Acceptable mission duration (less shielding = shorter maximum transit)
- Number of crew rotations possible per vehicle lifetime
- Whether water-based shielding (from ISRU) could supplement or replace launched shielding mass

The L4/L5 operating environment is fully outside Earth's magnetosphere, exposing crew to unshielded solar energetic particles and galactic cosmic rays during multi-week to multi-month transits on ion propulsion.

## Key Considerations

- Transit duration on ion propulsion (weeks to months) determines cumulative dose
- Solar particle events can deliver large acute doses requiring storm shelter capability
- GCR dose rates at 1 AU outside magnetosphere are approximately 0.5-1 mSv/day
- NASA career dose limits constrain total crew exposure across multiple missions
- Water and polyethylene are more mass-efficient shielding per unit area than aluminum
- In-situ produced water could serve as propellant and shielding simultaneously

## Research Directions

1. **Monte Carlo radiation transport modeling**: Simulate radiation dose profiles for representative crew module geometries with various shielding thicknesses and materials, using actual L4/L5 radiation environment data.

2. **Dual-use water shielding analysis**: Evaluate designs where propellant water stored around the crew compartment provides radiation shielding, reducing dedicated shielding mass.

3. **Storm shelter optimization**: Design a minimum-volume storm shelter within the crew module for solar particle events, establishing the mass floor for acute dose protection.

4. **Mission duration constraints**: Calculate maximum allowable transit times as a function of shielding mass, establishing the design trade space between mass and operational flexibility.

5. **Comparison with commercial crew benchmarks**: Evaluate shielding approaches from Orion, Starship, and commercial station designs for applicability to deep-space transport.
