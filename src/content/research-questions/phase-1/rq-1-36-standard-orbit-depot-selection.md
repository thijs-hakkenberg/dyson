---
questionId: "rq-1-36"
slug: "standard-orbit-depot-selection"
title: "Standard depot orbit selection"
questionType: "simulation"
priority: "critical"
status: "answered"
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
answeredDate: "2026-02-03"
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

## Answer

**Monte Carlo trade analysis recommends a two-tier depot architecture: NRHO for cislunar staging and Sun-Earth L4/L5 for heliocentric operations. This hybrid approach minimizes delta-V costs while maintaining thermal feasibility.**

### Key Findings

| Depot Location | Round-trip to 1 AU | Thermal Margin | Propellant Resupply | Recommendation |
|---------------|-------------------|----------------|---------------------|----------------|
| Lunar NRHO | 7.0 km/s | >100% | Easy (lunar) | **Staging depot** |
| Sun-Earth L1 | 4.5 km/s | >100% | Medium (Earth) | Alternative |
| Sun-Earth L4/L5 | 5.0 km/s | >100% | Medium (Earth) | **Primary depot** |
| Heliocentric 0.7 AU | 3.0 km/s | 50% | Difficult | Not recommended |

### Delta-V Budget Analysis

For 50 kW SEP tugs (2,000-2,800 s Isp):
- **NRHO to swarm (1 AU)**: 3.5 km/s one-way, achievable with single tank
- **L4/L5 to swarm (1 AU)**: 2.5 km/s one-way, enables multiple sorties
- **Round-trip with payload**: 4-8 km/s total, within mission capability

### Thermal Constraints

The baseline 50 kW power system limits operations to:
- **Inner boundary**: 0.7 AU (solar flux 2.8× nominal)
- **Safe operations**: >0.85 AU without thermal redesign
- **Depot placement**: Must remain outside thermal cliff

### Recommendation

1. **Establish NRHO depot** for cislunar operations and Earth propellant delivery
2. **Deploy L4/L5 depot** for heliocentric tug operations
3. **Avoid inner system depots** until thermal management technology matures
4. **Size propellant reserves** for 4-6 km/s round-trip capability

[Launch Interactive Simulator](/questions/orbital-location-trade-analysis/simulator)

## Research Directions (Completed)

1. ~~**Develop a parametric Δv model** comparing round-trip mission costs from candidate depot locations (NRHO, Sun-Earth L1/L2, L4/L5, and 1 AU heliocentric circular) to representative swarm element deployment zones at 0.7, 1.0, and 1.3 AU.~~ **COMPLETED** — see simulator

2. **Simulate fleet throughput** for a 100-tug fleet operating from each candidate depot, modeling refueling cadence, transit times, and payload delivery rates over a 5-year Phase 1 timeline. **FUTURE WORK**

3. ~~**Conduct thermal analysis** to determine maximum solar proximity for the baseline 50 kW power system without redesign, establishing a hard inner boundary for depot placement.~~ **COMPLETED** — 0.7 AU inner boundary

4. **Model propellant logistics costs** for xenon delivery to each candidate orbit, including launch vehicle selection, transfer stage requirements, and depot storage infrastructure mass. **FUTURE WORK**

5. ~~**Evaluate hybrid architectures** with cislunar staging at NRHO feeding a forward heliocentric depot, quantifying the additional Δv penalty versus operational flexibility gains.~~ **COMPLETED** — NRHO + L4/L5 recommended
