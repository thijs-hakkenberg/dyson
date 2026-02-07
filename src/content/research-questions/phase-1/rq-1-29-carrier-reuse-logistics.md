---
questionId: "rq-1-29"
slug: "carrier-reuse-logistics"
title: "Carrier/sabot reuse logistics"
questionType: "engineering-decision"
priority: "medium"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-5"
sourceBOMItemSlug: "mass-drivers"
sourceBOMItemName: "Mass Drivers"
relatedBOMItems:
  - "bom-1-5"
  - "bom-1-6"
tags:
  - "carrier"
  - "reusability"
  - "logistics"
createdDate: "2026-02-01"
---

## Background

Mass drivers for Project Dyson's Phase 1 deployment will launch payloads at velocities of 2.4–3.5 km/s using linear synchronous motor (coilgun) architecture. Each payload requires a carrier or sabot—a structural interface that couples the payload to the electromagnetic acceleration system, contains high-temperature superconducting (HTS) elements for field interaction, and protects cargo during the 100–1,000 g acceleration pulse. The consensus document reveals significant divergence on carrier strategy: Claude assumes disposable aluminum sabots where recovery cost exceeds material value; Gemini proposes reusable HTS-equipped "buckets" rated for 10,000 launches with a recirculation track; GPT recommends reusable carriers (1,000+ cycles) but flags return logistics as an open question. This divergence directly impacts system mass budget, operational complexity, and annual throughput feasibility.

## Why This Matters

The carrier reuse decision cascades through multiple critical system parameters:

**Mass throughput economics**: At Gemini's proposed 10-second launch cadence with 10 kg payloads, a disposable carrier strategy would consume carriers at 3.15 million units annually per driver. Even lightweight 2 kg aluminum sabots would require 6,300 tonnes/year of carrier material—representing 20% of the projected 31,536 tonnes/year throughput being consumed by the launch system itself. Reusable carriers rated for 10,000 cycles reduce this to 315 replacement units annually.

**HTS material constraints**: Reusable carriers with integrated REBCO superconducting elements represent significant embedded value. REBCO tape production capacity and cost may constrain how many carriers can be manufactured, making reuse economically mandatory rather than optional.

**Orbital capture system coupling**: The capture architecture (identified as undefined in Open Question #1) must be co-designed with carrier return logistics. If carriers must be returned from L1/L2 or heliocentric transfer orbits, the capture system transforms from a passive payload aggregator into an active carrier recovery and return infrastructure.

**Launch cadence feasibility**: High-cadence operations (6 launches/minute) require either a massive carrier inventory or a closed-loop recirculation system. Carrier availability becomes the rate-limiting factor if return logistics cannot match launch tempo.

## Key Considerations

**Carrier mass fraction**: Carrier mass relative to payload determines throughput efficiency. A 10 kg payload with a 5 kg carrier means 33% of launched mass is non-productive. Reusable carriers can tolerate higher mass if amortized over thousands of cycles.

**Thermal cycling degradation**: Carriers experience cryogenic temperatures during HTS coil operation, ambient lunar surface temperatures during staging, and potential heating during acceleration. REBCO tape performance degrades with thermal cycling; the 10,000-cycle target requires validation against realistic thermal profiles.

**Return delta-V requirements**: Carriers launched at 2.4 km/s lunar escape velocity require equivalent delta-V for return. Options include: (a) dedicated deceleration track at destination requiring duplicate infrastructure, (b) chemical or electric propulsion on carriers adding mass and complexity, (c) orbital tug retrieval adding fleet logistics, or (d) accepting one-way consumable loss.

**Surface recirculation**: Gemini's recirculation track concept keeps carriers on the lunar surface, avoiding orbital return entirely. This requires a parallel low-velocity return conveyor or rail system spanning the 1.8–3.4 km track length, plus carrier refurbishment stations.

**Inspection and refurbishment cadence**: Reusable carriers require periodic inspection for structural fatigue, HTS degradation, and ablation damage. Autonomous robotic inspection capability must match launch tempo without creating bottlenecks.

## Research Directions

1. **Carrier mass and material trade study**: Model carrier designs for 10 kg, 100 kg, and 500 kg payload classes. Quantify minimum carrier mass for each, including HTS coil assemblies, structural shell, and thermal protection. Calculate break-even reuse cycles where carrier manufacturing cost equals cumulative disposable carrier cost.

2. **Orbital mechanics analysis for return logistics**: Compute delta-V budgets for carrier return from L1, L2, NRHO, and heliocentric transfer trajectories. Evaluate propulsive return (chemical/electric), tug retrieval fleet sizing, and destination-based deceleration track requirements. Identify which capture architectures enable carrier recovery versus payload-only aggregation.

3. **Surface recirculation system concept design**: Develop preliminary design for a closed-loop carrier return system on the lunar surface. Estimate mass, power, and maintenance requirements for a conveyor or maglev return track operating in parallel with the primary accelerator.

4. **HTS thermal cycling test protocol**: Define accelerated life testing parameters to validate REBCO tape performance over 10,000 simulated launch cycles with representative thermal excursions. Identify failure modes and inspection intervals.

5. **Carrier inventory modeling**: Simulate carrier fleet dynamics under various launch cadences, return times, and refurbishment rates. Determine minimum fleet size to sustain 6 launches/minute with 95% availability, accounting for carriers in transit, under inspection, and in reserve.
