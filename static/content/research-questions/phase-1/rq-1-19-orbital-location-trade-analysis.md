---
questionId: "rq-1-19"
slug: "orbital-location-trade-analysis"
title: "Optimal orbital location trade analysis"
questionType: "simulation"
priority: "critical"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-4"
sourceBOMItemSlug: "assembly-node"
sourceBOMItemName: "Assembly Node Hub"
relatedBOMItems:
  - "bom-1-4"
  - "bom-1-1"
  - "bom-1-2"
tags:
  - "orbit-selection"
  - "mission-design"
  - "trade-study"
createdDate: "2026-02-01"
---

## Background

The Assembly Node Hub (ANH) serves as the primary orbital manufacturing and deployment platform for Phase 1 of the Dyson swarm construction initiative. This facility—with a dry mass of 120,000–450,000 kg, 1.5–2.0 MW power generation, and throughput targets of 1–1.7 MW-equivalent solar collector capacity per month—represents the foundational infrastructure upon which all subsequent swarm expansion depends. The consensus document reveals significant divergence among technical analyses regarding optimal orbital placement: Sun-Earth L1 vicinity (~1 AU), Sun-Mercury L1 (~0.39 AU), or a heliocentric logistics corridor at 0.7–1.0 AU. Each location fundamentally alters thermal management requirements (2.4–4.0 MW rejection capacity, 2,800–4,800 m² radiator area), power system architecture, feedstock logistics, and swarm deployment geometry. This simulation study must quantify these interdependencies to inform a binding location decision before detailed design proceeds.

## Why This Matters

Orbital location selection is a critical path decision with irreversible downstream consequences across multiple subsystems:

**Thermal Management Scaling**: Solar flux increases by approximately 6.5× between 1 AU and 0.39 AU. The specified 2.4–4.0 MW thermal rejection system sized for 1 AU operations would require fundamental redesign—potentially 15,000–30,000 m² of radiator area—for Mercury-vicinity operations. Undersizing this system directly limits manufacturing throughput.

**Power Architecture Lock-In**: The nuclear vs. solar decision couples tightly to orbital location. Solar PV at 0.39 AU delivers ~6.5× the power density of 1 AU, potentially enabling the 120 MW solar-thermal architecture Gemini proposes. Conversely, nuclear fission (4×500 kW Kilopower-derived) provides eclipse independence critical for certain orbital geometries but adds mass and regulatory complexity.

**Communication Latency and Autonomy Requirements**: Light-time delays range from ~8 minutes (1 AU) to ~3 minutes (0.39 AU) one-way to Earth. The three-tier hierarchical autonomy system must accommodate these delays, but longer latencies increase reliance on onboard decision-making for time-critical assembly operations and fault response.

**Feedstock Logistics Cost**: If Mercury mass-driver feedstock acquisition is viable, co-location at Sun-Mercury L1 could reduce per-kilogram delivery costs by 60–80% compared to Earth-origin cargo tugs. However, this requires the electromagnetic "Catch" mechanism—an unproven technology—versus conventional cooperative docking.

**Swarm Deployment Geometry**: The final swarm architecture (partial shell, ring, or distributed cloud) dictates optimal hub placement for minimizing collector transit distances and station-keeping propellant over the 10–30 year operational life.

## Key Considerations

The simulation must parametrically evaluate:

- **Solar flux variation**: 1,361 W/m² at 1 AU scaling to ~8,900 W/m² at 0.39 AU
- **Thermal equilibrium temperatures** for passive and active radiator configurations across orbital distances
- **Delta-v budgets** for feedstock delivery from Earth, near-Earth asteroids, and Mercury surface mass-driver trajectories
- **Communication link margins** for 50 Mbps–1 Gbps optical/RF systems at varying Earth distances
- **Eclipse frequency and duration** for Lagrange point versus heliocentric orbit options
- **Swarm deployment transfer costs** from hub location to final collector operating orbits
- **Technology readiness levels** for thermal management, power generation, and feedstock acquisition at each candidate location

The recommended approach specifies 1 AU baseline for Phase 1 to "minimize thermal management complexity" and "reduce development risk," but this must be validated against lifecycle cost and schedule impacts of deferring inner-system migration.

## Research Directions

1. **Develop Multi-Objective Orbital Trade Model**: Construct a parametric simulation spanning 0.3–1.2 AU heliocentric distance, incorporating thermal balance, power generation, communication link budget, and delta-v cost functions. Weight objectives according to Phase 1 priorities (risk reduction, schedule, cost) versus full-program optimization.

2. **Perform Monte Carlo Feedstock Logistics Analysis**: Simulate 10,000+ delivery scenarios comparing Earth-origin cargo tugs, near-Earth asteroid sources, and Mercury mass-driver intercept trajectories. Quantify cost-per-kilogram sensitivity to orbital location and technology maturation assumptions.

3. **Execute Thermal System Sizing Sensitivity Study**: Model radiator area requirements across candidate orbits for the 1.5–2.0 MW power class with 150% margin specification. Identify thermal "cliff" locations where passive rejection becomes infeasible.

4. **Simulate Swarm Deployment Geometry Optimization**: For candidate final swarm architectures (0.5–1.5 AU operating radius), calculate cumulative delta-v and transit time for deploying 10,000+ collector units from each hub location option.

5. **Conduct Autonomy Latency Impact Assessment**: Model assembly task completion rates and fault recovery timelines as functions of communication delay, validating whether the three-tier autonomy architecture maintains 95%+ first-pass success across all candidate locations.
