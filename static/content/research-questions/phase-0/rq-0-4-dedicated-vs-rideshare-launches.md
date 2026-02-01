---
questionId: "rq-0-4"
slug: "dedicated-vs-rideshare-launches"
title: "Dedicated launches vs rideshare opportunities"
questionType: "engineering-decision"
priority: "medium"
status: "open"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-1"
sourceBOMItemSlug: "prospecting-satellites"
sourceBOMItemName: "Prospecting Satellites"
relatedBOMItems:
  - "bom-0-1"
tags:
  - "launch-strategy"
  - "cost-optimization"
  - "deployment"
createdDate: "2026-01-31"
---

## Background

Prospecting Satellites are the reconnaissance element of Project Dyson's resource acquisition pipeline, responsible for surveying near-Earth asteroids (NEAs) to identify suitable mining targets. The consensus document specifies a fleet of 50 satellites, each massing 80-120 kg with a 7-year design life, capable of surveying 20+ asteroids per satellite per year. The recommended approach explicitly calls for designing these satellites for rideshare launches to reduce per-unit launch costs, yet this remains listed as an open question requiring formal resolution.

This question arises because the total budget allocation of $250M for 50 units ($5M/unit) leaves limited margin for development cost overruns, with only 15-20% contingency recommended. Launch costs represent a significant fraction of any space mission budget, and the choice between dedicated and rideshare launches directly impacts whether the constellation can be deployed within budget while meeting survey timeline requirements.

## Why This Matters

The launch strategy decision cascades through multiple project dimensions:

**Schedule Risk**: The phased deployment plan calls for 5 pathfinder satellites before full constellation deployment. Rideshare opportunities are inherently unpredictable—suitable launches to appropriate orbital regimes may not align with project milestones. Dedicated launches offer schedule certainty but at premium cost.

**Orbital Flexibility**: Prospecting satellites must reach NEA-intercept trajectories, likely requiring Earth-escape or highly elliptical staging orbits. Rideshare missions typically target LEO, GEO, or specific interplanetary destinations, potentially requiring significant onboard delta-V to reach operational orbits. The divergent propulsion recommendations (green monopropellant vs. electric propulsion vs. hybrid) directly relate to this consideration—higher delta-V capability enables exploitation of less-optimal rideshare opportunities.

**Cost Sensitivity**: At $5M per unit with the recommended 15-20% contingency, launch costs must remain controlled. A dedicated small-sat launch (e.g., Rocket Lab Electron) costs $7-8M, potentially doubling per-unit costs. Rideshare to GTO or lunar trajectory might cost $1-2M per 100 kg unit, preserving budget for instrumentation and operations.

**Constellation Coherence**: The minimum constellation size for acceptable survey coverage remains an open question. If rideshare constraints force satellites into suboptimal orbital phasing, effective coverage may require more units than a coordinated dedicated-launch deployment.

## Key Considerations

**Mass and Volume Constraints**: At 80-120 kg with deployable solar arrays, these satellites fit within standard ESPA-class rideshare slots. However, deep-space-rated components and propellant mass may push toward the upper bound, limiting rideshare compatibility.

**Propulsion Architecture Dependency**: The unresolved propulsion debate directly impacts this decision. Electric propulsion (Gemini's recommendation) provides 2-3x the delta-V of green monopropellant for equivalent mass, enabling satellites to spiral out from LEO rideshares to escape trajectories—but adds 6-12 months of transit time per satellite.

**Communication Infrastructure**: X-band primary with S-band backup assumes DSN or equivalent ground station access. Rideshare-driven orbital dispersal may complicate communication scheduling across a 50-satellite constellation.

**Pathfinder Strategy**: The 5-satellite pathfinder phase offers an opportunity to validate both launch approaches. Mixed-mode deployment could provide empirical data before committing the remaining 45 units.

**Launch Market Dynamics**: The small-sat launch market is evolving rapidly. Dedicated lunar and interplanetary rideshare services (e.g., Astrobotic, Firefly) may offer intermediate options not available during initial project planning.

## Research Directions

1. **Rideshare Availability Analysis**: Survey planned launches over the next 5 years to destinations compatible with NEA prospecting (lunar flyby, Earth-escape, high-energy GTO). Quantify expected slot availability, cost per kg, and scheduling reliability for each trajectory class.

2. **Delta-V Budget Modeling**: For each candidate rideshare trajectory type, calculate required onboard delta-V to reach representative NEA targets. Map results against the three propulsion options to determine which combinations are feasible within the 80-120 kg mass budget.

3. **Cost-Schedule Trade Study**: Develop parametric models comparing total constellation deployment cost and timeline for pure-rideshare, pure-dedicated, and hybrid strategies. Include schedule risk monetization (cost of delays to downstream mining operations).

4. **Pathfinder Experiment Design**: Define a pathfinder deployment plan that tests both launch modes—e.g., 2 satellites on dedicated launch, 3 on rideshare—to gather empirical schedule and performance data before full constellation commitment.

5. **Propulsion Decision Coupling**: Coordinate with the propulsion system trade study to ensure launch strategy and propulsion architecture are resolved jointly, as these decisions are fundamentally interdependent.
