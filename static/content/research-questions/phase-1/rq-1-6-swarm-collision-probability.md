---
questionId: "rq-1-6"
slug: "swarm-collision-probability"
title: "Swarm collision probability and avoidance"
questionType: "simulation"
priority: "critical"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-1"
sourceBOMItemSlug: "collector-units"
sourceBOMItemName: "Collector Units"
relatedBOMItems:
  - "bom-1-1"
  - "bom-1-7"
  - "bom-2-1"
tags:
  - "collision-avoidance"
  - "swarm-coordination"
  - "formation"
createdDate: "2026-02-01"
---

## Background

The Solar Collector Unit (SCU) forms the fundamental building block of Project Dyson's Phase 1 swarm deployment. The consensus architecture specifies deployment of 1,000+ autonomous units operating in coordinated formation to enable phased array microwave power transmission at 2.45 GHz or 5.8 GHz. Unit sizes under consideration range from GPT's 40 m² tiles (69 kg) to Claude's 10,000 m² collectors (1,850 kg), with the recommended compromise falling in the 100-1,000 m² class. Each unit requires high autonomy with onboard fault detection, isolation, and recovery (FDIR) capabilities due to communication latency of several minutes to Earth. The mesh network topology with inter-SCU links demands precise formation geometry to maintain power transmission coherence—creating an inherent tension between the tight spacing required for beam forming and the collision risk introduced by operating hundreds or thousands of spacecraft in proximity.

## Why This Matters

Collision avoidance represents a critical path risk that could determine mission viability. Unlike traditional satellite constellations where units operate in distinct orbital slots, SCU swarm formations require coordinated proximity operations to achieve coherent microwave transmission. The consensus document explicitly identifies the redundancy philosophy as "graceful degradation where loss of 10% of units does not compromise mission"—but this assumes independent failure modes. A collision cascade (Kessler-syndrome dynamics) could rapidly exceed the 10% threshold and generate debris fields that compromise the entire formation.

The consequences bifurcate sharply based on research outcomes:
- **Favorable findings**: If collision probability can be maintained below acceptable thresholds (typically <10⁻⁶ per unit-year for crewed spaceflight standards) with reasonable inter-unit spacing, the swarm architecture remains viable with autonomous avoidance systems.
- **Unfavorable findings**: If required spacing for collision safety degrades phased array coherence below useful levels, the fundamental transmission architecture may require redesign—potentially necessitating physical tethering, rigid truss structures, or abandonment of distributed beam forming.

This question directly gates the swarm coordination subsystem design and influences propulsion budgets. The consensus specifies 20-100 m/s ΔV capability over mission life for station-keeping; collision avoidance maneuvers could consume significant portions of this budget if frequent or aggressive.

## Key Considerations

**Formation Geometry Requirements**: Phased array transmission coherence requires precise relative positioning. Element spacing for 2.45 GHz transmission (λ ≈ 12.2 cm) typically demands sub-wavelength accuracy for beam steering. The allowable position uncertainty envelope directly constrains minimum safe separation distances.

**Unit Physical Dimensions**: Collector areas span 40 m² to 10,000 m² across proposals. A 10,000 m² unit (Claude's specification) implies characteristic dimensions of ~100 m, while 40 m² tiles span ~6 m. Collision cross-sections scale accordingly, with larger units presenting proportionally greater risk per encounter.

**Attitude Dynamics**: The hybrid attitude control approach (reaction wheels plus solar radiation pressure) introduces attitude excursions during momentum management. Spin-stabilized designs (Gemini's 5 RPM proposal) create swept volumes that must be considered in spacing calculations.

**Propulsion Response Time**: Ion and electrospray propulsion systems provide low thrust (mN-class), limiting emergency maneuver capability. Detection-to-avoidance response chains must account for sensor latency, decision processing, and thruster response times measured in seconds to minutes.

**Autonomous Decision Authority**: Communication latency to Earth (8+ minutes round-trip at 1.0 AU) mandates onboard collision avoidance authority. The mesh network topology enables inter-SCU coordination but introduces distributed consensus challenges during close-approach scenarios.

**Debris Environment**: Operations at 0.3-1.0 AU expose the swarm to both natural micrometeoroid flux and any self-generated debris from deployment failures or component shedding.

## Research Directions

1. **Monte Carlo Orbital Simulation**: Develop high-fidelity N-body simulation incorporating solar radiation pressure, gravitational perturbations, and stochastic attitude variations for 1,000+ unit formations. Quantify collision probability as a function of inter-unit spacing across the 100 m to 10 km range.

2. **Phased Array Coherence Analysis**: Model microwave transmission efficiency degradation versus element spacing to establish the minimum formation density required for useful beam forming. Identify the spacing threshold where collision risk and transmission requirements intersect.

3. **Autonomous Avoidance Algorithm Development**: Design and benchmark distributed collision avoidance protocols compatible with mesh network latencies and ion propulsion response characteristics. Evaluate consensus algorithms for multi-unit close-approach scenarios.

4. **Propellant Budget Impact Assessment**: Calculate ΔV consumption for collision avoidance maneuvers under various encounter frequency assumptions. Determine whether the 20-100 m/s mission budget accommodates realistic avoidance requirements or necessitates propellant mass increases.

5. **Cascade Failure Modeling**: Simulate debris generation and propagation following single-unit collisions to characterize cascade probability and establish maximum acceptable initial collision rates for swarm survivability.
