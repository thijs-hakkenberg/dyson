---
questionId: "rq-1-36"
slug: "standard-orbit-depot-selection"
title: "Standard depot orbit selection"
questionType: "simulation"
priority: "critical"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-6"
sourceBOMItemSlug: "orbital-tugs"
sourceBOMItemName: "Orbital Tugs"
relatedBOMItems:
  - "bom-1-6"
  - "bom-1-4"
  - "bom-1-5"
tags:
  - "orbit-selection"
  - "depot"
  - "logistics"
  - "delta-v"
createdDate: "2026-02-01"
---

## Background

Orbital tugs represent the primary logistics backbone for Phase 1 Initial Swarm Deployment, responsible for transporting 2,000–8,000 kg payloads between manufacturing nodes, depots, and assembly yards. The consensus document specifies a depot-based operational architecture from day one, with propellant tanks sized for refueling and modular thruster pods designed as orbital replacement units (ORUs). However, the three source models diverge significantly on operating distance from the Sun: Claude designs for 0.7–1.5 AU operations centered on 1 AU, Gemini optimizes for 0.3 AU (Mercury-adjacent) with aggressive thermal management, and GPT focuses on cislunar space (NRHO/HEO) with gradual heliocentric expansion.

This divergence directly impacts depot placement. The recommended approach calls for two depot nodes—one in cislunar staging and one at a heliocentric assembly yard—but neither location has been formally selected. Standard orbit selection determines the fundamental Δv budgets, mission timelines, and propellant consumption rates that cascade through every tug mission profile.

## Why This Matters

Depot orbit selection is a critical path decision that locks in operational parameters for the entire Phase 1 fleet. The 50 kW SEP tugs produce only 2.0–4.8 N total thrust (4× thrusters at 0.5–1.2 N each), meaning transit times between nodes scale directly with Δv requirements. A poorly chosen depot location could increase mission durations by months, reducing fleet throughput and delaying swarm element deployment.

**Key dependencies include:**
- **Propellant logistics**: Xenon consumption scales with Δv. At 2,000–2,800 s specific impulse, each km/s of Δv requires approximately 3.5–5% of spacecraft mass in propellant. Depot placement determines whether tugs can complete round-trip missions on a single tank or require intermediate refueling.
- **Solar array sizing**: The 180–210 m² arrays are optimized for 1 AU flux. Operations at 0.3 AU (Gemini's preference) deliver 10× power but require thermal management that may exceed current design assumptions.
- **Fleet architecture**: If cislunar and heliocentric depots require substantially different Δv profiles, the two-tier fleet (Electric Freight Tug + Hybrid Service Tug) may need variant designs, increasing development cost.

**Risk exposure**: Selecting an orbit that proves operationally inefficient after fleet deployment would require either accepting degraded throughput or expensive depot relocation using the tugs themselves—a bootstrapping problem that could delay Phase 1 completion by years.

## Key Considerations

1. **Δv budget constraints**: Primary tugs carry propellant for 6,000–12,000 kg total mated mass. With Isp of 1,600–2,800 s, practical single-mission Δv is approximately 4–8 km/s depending on payload fraction. Depot orbits must enable useful payload delivery within this envelope.

2. **Candidate orbit characteristics**:
   - **NRHO (Near-Rectilinear Halo Orbit)**: ~0.4 km/s to/from lunar surface, ~3.5 km/s to LEO, stable with minimal stationkeeping
   - **Sun-Earth L4/L5**: Gravitationally stable, ~0.9 km/s from Earth-Moon system, but 60° phase angle creates communication and transfer timing constraints
   - **Heliocentric 1 AU circular**: Minimal stationkeeping, but requires ~3 km/s departure from Earth sphere of influence

3. **Thermal environment**: Solar flux varies as 1/r². Operations at 0.3 AU require 11× the thermal rejection capacity of 1 AU designs. The consensus 180–210 m² arrays would generate 500–700 kW at 0.3 AU—far exceeding the 50–70 kW power system rating.

4. **Communication latency**: Heliocentric depots at L4/L5 introduce 8–17 minute one-way light time, affecting the graduated autonomy architecture's human authorization gates at 500m and 20m proximity.

5. **Propellant resupply**: Ground-launched xenon must reach the depot. NRHO offers lower Earth-departure Δv than heliocentric options, reducing tanker mission costs.

## Research Directions

1. **Develop a parametric Δv model** comparing round-trip mission costs from candidate depot locations (NRHO, Sun-Earth L1/L2, L4/L5, and 1 AU heliocentric circular) to representative swarm element deployment zones at 0.7, 1.0, and 1.3 AU.

2. **Simulate fleet throughput** for a 100-tug fleet operating from each candidate depot, modeling refueling cadence, transit times, and payload delivery rates over a 5-year Phase 1 timeline.

3. **Conduct thermal analysis** to determine maximum solar proximity for the baseline 50 kW power system without redesign, establishing a hard inner boundary for depot placement.

4. **Model propellant logistics costs** for xenon delivery to each candidate orbit, including launch vehicle selection, transfer stage requirements, and depot storage infrastructure mass.

5. **Evaluate hybrid architectures** with cislunar staging at NRHO feeding a forward heliocentric depot, quantifying the additional Δv penalty versus operational flexibility gains.
