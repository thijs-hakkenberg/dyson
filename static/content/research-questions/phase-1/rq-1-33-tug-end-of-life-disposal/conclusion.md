---
questionId: "rq-1-33"
questionSlug: "tug-end-of-life-disposal"
type: "discussion-conclusion"
generatedBy: "claude-opus-4-6"
generated: "2026-02-07"
roundCount: 1
terminationReason: "unanimous-conclude"
---

# Conclusion: End-of-Life Disposal Protocol for Orbital Tugs

## Summary

The discussion conclusively establishes that a **tiered disposal protocol** is the appropriate framework for managing end-of-life orbital tugs across the Project Dyson fleet. Solar impact is definitively eliminated as a disposal option due to prohibitive Δv requirements (26-29 km/s from 1.0 AU) that are physically incompatible with degraded end-of-life SEP systems and would impose unacceptable propellant reserves that devastate operational payload capacity across 800+ vehicles. The remaining three pathways—depot-return salvage, heliocentric graveyard orbit parking, and passive safety backstops—form a complementary hierarchy that addresses the full spectrum of end-of-life scenarios, from nominal retirement to catastrophic failure.

The primary pathway of **depot-return salvage** is strongly favored on both economic and sustainability grounds. Each tug carries $2-5M in conservatively estimated recoverable value (solar arrays, xenon, structural aluminum, avionics components), and the existing ORU-based modular design philosophy already provides the architectural foundation for disassembly. Return-to-depot Δv requirements of 50-500 m/s from most operational locations are well within the capability of degraded thrusters, particularly given that retiring tugs face no schedule pressure and can execute slow spiral trajectories over 6-18 months. A phased infrastructure buildout—starting with simple propellant recovery and passivated parking in Phase 1A, scaling to robotic disassembly by Phase 1B, and full material recycling by Phase 1C—aligns salvage capability with fleet retirement rates without requiring premature capital investment.

The protocol imposes modest but non-trivial design requirements: a **3-5% Δv budget reserve** (300-750 m/s equivalent), standardized xenon transfer interfaces, autonomous passivation systems with watchdog timers, and passive tracking aids such as retroreflector arrays. The total hardware mass impact is estimated at 5-15 kg per tug plus the propellant reserve, trading approximately 120,000-200,000 kg of cumulative fleet payload capacity for responsible debris management and long-term resource recovery. This trade is justified by the alternative scenario of 40+ uncontrolled derelicts accumulating annually in the operational zone, which would threaten swarm elements and complicate all subsequent project phases.

## Key Points

- **Solar impact is eliminated** as a disposal pathway due to Δv requirements exceeding end-of-life tug capability by an order of magnitude; no propellant reserve scheme can make this viable without crippling operational performance.

- **Depot-return salvage is the primary disposal pathway**, leveraging the already-specified ORU modular architecture and depot-based operations model. Break-even for dedicated salvage infrastructure is estimated at 20-30 tug retirements per year, a threshold reached well within Phase 1 steady-state operations.

- **Heliocentric graveyard orbits serve as the secondary fallback** for tugs that cannot return to depot, with designated bands at 0.15-0.25 AU and 1.8-2.2 AU selected to avoid operational zones and planetary orbits. Passivation (xenon venting, battery discharge, array feathering) is mandatory before graveyard insertion.

- **Passive safety features are a non-negotiable baseline requirement** for all tugs, including autonomous passivation on loss of command (30-90 day timeout), retroreflector tracking aids, and solar array feathering to minimize radiation pressure perturbations on derelicts. These features address the estimated 1-3% of vehicles that will experience failures precluding controlled disposal.

- **The disposal protocol must be locked before design freeze** because it directly impacts tank sizing (2-3% volume increase), propellant budgeting (3-5% Δv reserve), structural interfaces, and flight software architecture. Deferring this decision propagates uncertainty into every tug subsystem.

- **Self-imposed regulatory discipline equivalent to IADC/NASA-STD-8719.14 standards** should be adopted despite the absence of formal heliocentric debris regulations, both to establish scalable operational norms for subsequent phases and to preempt future regulatory intervention.

## Unresolved Questions

1. **What is the actual failure mode distribution for long-duration SEP missions at fleet scale?** Historical data from Dawn, SMART-1, and Starlink provides limited statistical basis for predicting what percentage of 800+ tugs will retain sufficient propulsion for controlled disposal versus becoming uncontrolled derelicts. The 1-3% catastrophic failure estimate needs validation against more representative datasets or Monte Carlo modeling.

2. **Where exactly should salvage depots be located, and how many are needed?** The protocol assumes tugs can return to "a depot," but optimal depot placement for salvage operations depends on the spatial distribution of tug retirements across 0.3-1.5 AU, which in turn depends on mission profiles not yet fully defined. A dedicated logistics study is needed to determine whether existing operational depots suffice or whether purpose-built salvage stations are required.

3. **How should contaminated xenon and radiation-degraded solar cells be handled?** The salvage value model assumes recovered materials have meaningful utility, but xenon from degraded propellant systems may require reprocessing infrastructure that doesn't yet exist in the architecture, and solar cells at 70% efficiency after 15 years of radiation exposure may not justify the cost of removal and redeployment versus raw material recycling.

4. **What governance structure should the Orbital Debris Control Board take, and what authority does it need?** The recommendation for an internal oversight body is sound in principle, but its relationship to mission operations, design authority, and any future international regulatory frameworks for heliocentric space remains undefined.

## Recommended Actions

1. **Formally adopt the tiered disposal protocol (Salvage → Graveyard → Passive Safety) as a project baseline requirement** and issue a design directive incorporating the 3-5% Δv reserve, autonomous passivation system, standardized fluid transfer interfaces, and retroreflector arrays into the tug specification before design freeze. Assign mass and power budgets for these features in the next spacecraft bus iteration.

2. **Commission a Δv and trajectory analysis** modeling depot-return, graveyard orbit insertion, and failure-drift trajectories from a representative grid of operational locations (0.3, 0.7, 1.0, 1.3, 1.5 AU at multiple orbital phases). This analysis should quantify the 3-5% Δv reserve with greater precision and identify operational locations where graveyard orbit becomes the only viable option due to excessive return-to-depot costs.

3. **Develop a salvage infrastructure phasing plan and cost model** that maps salvage capability milestones (Phase 1A propellant recovery, Phase 1B robotic disassembly, Phase 1C full recycling) to projected fleet retirement rates, identifies required depot modifications, and calculates the net present value of recovered materials against salvage infrastructure investment. This model should determine the break-even fleet size with greater rigor than the current $50-100M rough estimate.

4. **Design and prototype the autonomous passivation system**, including the watchdog timer logic, safe-mode valve actuation sequences for xenon venting, battery discharge protocols, and array feathering commands. This is a safety-critical system that must function reliably after years of dormancy and under degraded avionics conditions; it warrants early development and testing independent of the broader tug development schedule.

5. **Establish a fleet asset tracking and disposal planning function** within project operations that maintains a catalog of all tug health states, projects end-of-life timelines based on thruster hour accumulation and degradation telemetry, and pre-plans disposal trajectories 12-24 months before anticipated retirement. This operational capability is prerequisite to executing the tiered protocol at scale and should be stood up concurrent with initial fleet deployment.