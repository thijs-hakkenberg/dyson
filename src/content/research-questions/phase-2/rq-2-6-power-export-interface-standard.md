---
questionId: "rq-2-6"
slug: "power-export-interface-standard"
title: "Power export interface standard"
questionType: "engineering-decision"
priority: "critical"
status: "open"
sourcePhase: "phase-2"
sourceBOMItemId: "bom-2-1"
sourceBOMItemSlug: "collector-satellites"
sourceBOMItemName: "Collector Satellites"
relatedBOMItems:
  - "bom-2-1"
  - "bom-1-2"
tags:
  - "power-interface"
  - "standards"
  - "connectors"
  - "power-beaming"
createdDate: "2026-02-01"
---

## Background

Solar Collector Satellites form the primary energy harvesting infrastructure of the Phase 2 Dyson swarm, with individual units ranging from 5,000 m² to 1,000,000 m² in deployed area and generating power outputs from approximately 6.8 MW to multiple gigawatts per satellite. The consensus document identifies a fundamental architectural divergence: Claude's model integrates 2.5 GW microwave phased arrays directly onto each collector, Gemini includes solid-state phased arrays per unit, while GPT argues collectors should output DC only with dedicated relay/beaming nodes handling transmission. This decision—whether collectors should physically dock with high-voltage connectors, deploy robotic power tethers, or perform local RF/optical conversion—cascades through every aspect of the satellite design, from insulation mass budgets to operational concepts.

The recommended approach adopts GPT's architecture of separating collection from transmission, with collectors outputting standardized DC to dedicated relay/beaming nodes. However, the specific interface mechanism remains undefined. With electrical architectures operating at 1–5 kV DC and satellites maintaining 10–50 km minimum separation, the power export interface must bridge significant distances while handling multi-megawatt power levels.

## Why This Matters

This decision represents a critical path dependency affecting multiple subsystems simultaneously. The interface standard directly determines:

**Mass Budget Allocation**: Physical docking connectors require robust mechanical systems and heavy insulation rated for 1–5 kV. Robotic tethers demand deployment mechanisms, cable mass (potentially kilometers of conductor), and retrieval systems. Local RF/optical conversion adds transmitter mass but eliminates physical connections entirely. For satellites targeting 19–650 W/kg specific power, interface mass directly erodes the primary performance metric.

**Manufacturing Scalability**: The consensus emphasizes roll-to-roll processes and standardized interfaces for exponential production scaling to billions of units. A complex connector interface requiring precision machining scales poorly compared to integrated antenna arrays manufacturable via thin-film deposition.

**Operational Complexity**: With full autonomous operation required (Level 4+), the interface must support fault isolation and graceful degradation. Physical connections create single points of failure; wireless transmission enables redundancy through multiple relay paths. The 100–200 independent electrical zones per satellite must interface coherently with whatever export mechanism is selected.

**Swarm Coordination**: Boid-like flocking algorithms maintaining 10–50 km separation must accommodate interface operations. Physical docking requires precise rendezvous maneuvers incompatible with passive station-keeping; tether deployment constrains relative motion; wireless beaming permits greater operational flexibility.

## Key Considerations

**Voltage and Power Levels**: At 1–5 kV DC with satellites generating 6.8 MW (5,000 m² at 1,361 W/m² × 25% efficiency) to 5.5 GW (1 km² at 5,480 W/m² × 25% efficiency), current levels range from 1,360 A to over 1 MA. Physical connectors at these currents require massive conductor cross-sections; wireless transmission avoids this entirely.

**High-Voltage Arc Risk**: The consensus identifies arc management in multi-kilovolt systems as a critical open question requiring extensive vacuum testing. Physical connectors operating at 5 kV in space plasma environments present significant arcing risk during mate/demate cycles.

**Thermal Environment**: Operating at 0.5–0.8 AU with 4–6× solar flux creates thermal gradients that may cause connector misalignment or tether material degradation. Wireless systems avoid mechanical thermal stress.

**Degradation Tolerance**: The 10–25 year design lifetime with accepted gradual degradation favors interfaces that degrade gracefully. Wireless transmission efficiency may decrease with component aging while maintaining functionality; physical connectors tend toward binary failure modes.

**Relay Node Architecture**: If collectors output DC to dedicated relay/beaming nodes, the relay node design depends entirely on the interface standard. Relay nodes receiving power via tether require different architectures than those receiving microwave or optical beams.

## Research Directions

1. **Comparative Mass Analysis**: Model complete interface systems for each option—physical docking (connectors, alignment mechanisms, insulation), robotic tethers (deployment systems, cable mass for 10–50 km spans, retrieval mechanisms), and local RF/optical conversion (transmitter arrays, thermal management, pointing systems)—at the 5,000 m² and 1 km² satellite scales.

2. **Efficiency Chain Modeling**: Calculate end-to-end efficiency from PV output to relay node input for each interface type, including DC-DC conversion losses, transmission losses (resistive for tethers, atmospheric/geometric for wireless), and rectification losses at relay nodes.

3. **Failure Mode Analysis**: Develop fault trees for each interface option, quantifying failure probability over 10–25 year lifetimes and mapping failure modes against the 20% zone loss tolerance requirement.

4. **Swarm Dynamics Simulation**: Model interface operations within million-unit swarm coordination simulations, evaluating compatibility with boid-like flocking algorithms and autonomous collision avoidance requirements.

5. **Technology Readiness Assessment**: Evaluate current TRL for each interface component—space-rated multi-kilovolt connectors, kilometer-scale deployable tethers, and high-power microwave/optical transmitters—identifying development timelines and testing infrastructure requirements.
