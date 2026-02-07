---
questionId: "rq-1-33"
slug: "tug-end-of-life-disposal"
title: "End-of-life disposal protocol for orbital tugs"
questionType: "discussion"
priority: "low"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-6"
sourceBOMItemSlug: "orbital-tugs"
sourceBOMItemName: "Orbital Tugs"
relatedBOMItems:
  - "bom-1-6"
tags:
  - "end-of-life"
  - "disposal"
  - "debris"
  - "recycling"
createdDate: "2026-02-01"
---

## Background

Orbital Tugs are the primary logistics workhorses for Phase 1 Initial Swarm Deployment, designed to transport 2,000-8,000 kg payloads across cislunar and heliocentric space using 50 kW-class Solar Electric Propulsion systems. The consensus specification establishes a 7-15 year operational design lifetime with thruster lifetimes of 20,000-50,000 hours. Given the recommended fleet architecture of 800+ units operating across distances from 0.3-1.5 AU, the project will inevitably face decisions about what to do with tugs that reach end-of-life due to thruster degradation, propellant system contamination, avionics failures, or accumulated radiation damage.

The consensus document identifies three potential disposal pathways—solar impact, graveyard orbit parking, or in-situ recycling/salvage—but provides no resolution on which approach to adopt. This question arises because disposal protocol selection affects tug design requirements (propellant reserves, structural interfaces), operational planning (Δv budgets, depot locations), and long-term project sustainability.

## Why This Matters

**Debris Management at Scale**: With 800+ tugs planned, even a 5% annual attrition rate produces 40+ decommissioned vehicles per year by steady-state operations. Without a coherent disposal strategy, Project Dyson risks creating a debris field that threatens its own swarm elements and complicates future orbital operations.

**Design Freeze Dependencies**: The disposal protocol directly impacts propellant budgeting. Solar impact from 1 AU requires approximately 20-30 km/s Δv—far exceeding any practical reserve. Graveyard orbit insertion requires 50-500 m/s depending on location. In-situ salvage requires structural provisions for disassembly. These requirements must be locked before finalizing tank sizing and structural design.

**Resource Recovery Potential**: Each tug contains 180-210 m² of solar arrays, dual-string avionics, and potentially reusable structural aluminum. At $9.5-60M per unit (depending on cost model), recovered materials could offset Phase 2 manufacturing costs if salvage infrastructure exists.

**Regulatory and Operational Precedent**: Phase 1 establishes operational norms that will scale through subsequent phases. A disposal protocol that works for hundreds of tugs must scale to thousands without creating navigational hazards or resource waste.

## Key Considerations

**Δv Budget Constraints**: Hall-Effect Thrusters with 1,600-2,800 seconds Isp provide excellent efficiency but low thrust (0.5-1.2 N per thruster). End-of-life tugs may have degraded thrust capability, limiting disposal maneuver options. Reserving propellant for disposal reduces operational payload capacity throughout the tug's service life.

**Operating Distance Variability**: Tugs operating at 0.3 AU (Gemini's Mercury-adjacent design point) face different disposal economics than those at 1.5 AU. Solar impact becomes more accessible closer to the Sun; graveyard orbits become less defined in heliocentric space versus cislunar operations.

**Salvage Infrastructure Timing**: In-situ recycling requires depot-based disassembly capability that may not exist in early Phase 1. The recommended approach specifies depot-based operations with ORU-designed thruster pods and PPU modules, suggesting some salvage capability is planned, but full recycling infrastructure represents significant additional investment.

**Failure Mode Diversity**: Controlled disposal assumes the tug retains propulsion and attitude control. Tugs that fail catastrophically (avionics failure, collision damage) cannot execute disposal maneuvers and become uncontrolled debris regardless of protocol.

**Propellant State at End-of-Life**: Xenon remaining in tanks at decommissioning represents recoverable value if salvage is selected, but contamination risk if fluid transfer is attempted from degraded systems.

## Research Directions

1. **Quantify Disposal Δv Requirements**: Model the propellant mass required for solar impact, heliocentric graveyard orbit insertion, and return-to-depot trajectories from representative operating locations (0.3 AU, 1.0 AU, Sun-Earth L4/L5). Compare against typical end-of-life propellant reserves assuming 85% mission utilization.

2. **Survey Existing Space Debris Mitigation Standards**: Review IADC guidelines, NASA-STD-8719.14, and ESA debris mitigation requirements for applicability to heliocentric operations. Identify whether Project Dyson requires novel regulatory frameworks or can adapt existing cislunar standards.

3. **Develop Salvage Value Model**: Estimate recoverable material value (solar cells, xenon, aluminum structure, electronics) versus salvage operation cost for different depot locations. Determine break-even fleet size where dedicated salvage infrastructure becomes economically justified.

4. **Analyze Failure Mode Statistics**: Review historical SEP mission data (Dawn, SMART-1, Starlink) to characterize failure modes and estimate what percentage of tugs will retain sufficient capability for controlled disposal versus becoming uncontrolled debris.

5. **Design Passive Safe Disposal Features**: Investigate whether tugs can incorporate passive deorbit mechanisms (drag sails for cislunar, solar radiation pressure devices for heliocentric) that activate on loss of control, reducing reliance on active disposal maneuvers.
