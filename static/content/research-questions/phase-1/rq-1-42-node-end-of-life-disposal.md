---
questionId: "rq-1-42"
slug: "node-end-of-life-disposal"
title: "End-of-life disposal for failed swarm nodes"
questionType: "discussion"
priority: "medium"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-7"
sourceBOMItemSlug: "swarm-control-system"
sourceBOMItemName: "Swarm Control System"
relatedBOMItems:
  - "bom-1-7"
  - "bom-1-1"
tags:
  - "end-of-life"
  - "disposal"
  - "debris"
  - "passivation"
createdDate: "2026-02-01"
---

## Background

The Swarm Control System governs the autonomous operation, coordination, and safety of thousands of satellites in heliocentric orbit around the Sun. The consensus document specifies a Phase 1 deployment of 1,000–10,000 nodes operating at distances between 0.5 and 1.0 AU, with an accepted annual failure rate of 1–3% when using automotive-grade components with selective shielding. This failure rate, while acceptable for operational continuity, means that a mature 10,000-node swarm will generate 100–300 failed or degraded nodes per year. The consensus document explicitly identifies end-of-life disposal as an open question, asking whether the project should implement drift to "graveyard" bands, controlled deorbit, or accept debris persistence.

## Why This Matters

Unlike Earth orbit, heliocentric space lacks natural atmospheric drag for passive deorbit, meaning failed nodes will persist indefinitely on their orbital trajectories. With collision avoidance requirements targeting <10⁻⁶ probability per node-year, accumulated debris from failed nodes directly threatens the long-term viability of the swarm. A single uncontrolled node drifting through an active cluster could trigger cascading avoidance maneuvers, consuming the limited ΔV budget (0.5–62 m/s/year depending on propulsion architecture) across dozens of operational satellites.

The disposal protocol also affects hardware design decisions. If controlled disposal requires propulsive maneuvers, nodes must reserve fuel or maintain thruster functionality even as other systems degrade. If passivation is required (depleting batteries, venting propellant), the control system must detect imminent failure and execute shutdown sequences autonomously during the 7–30 day independent operation window. The choice between graveyard orbits versus debris acceptance influences orbital slot allocation algorithms and the ephemeris governance model specified in the recommended approach.

## Key Considerations

**Propulsion constraints**: The consensus shows significant divergence on station-keeping propulsion, with options ranging from solar sail trim only (0.5–5 m/s/year) to hybrid sail plus ion propulsion (~62 m/s/year). Disposal maneuvers to graveyard bands may require ΔV beyond what degraded nodes can provide, especially if propulsion systems fail before other subsystems.

**Detection and response time**: Nodes must survive 7–30+ days without ground contact. A failing node must either self-diagnose and execute disposal autonomously, or the cluster coordinator must detect anomalies and command disposal before communication is lost entirely.

**Orbital mechanics at scale**: At 0.5–1.0 AU, orbital periods range from approximately 130 to 365 days. Graveyard band separation must be sufficient to prevent conjunction with active swarm regions over multi-decade timescales, accounting for differential precession and solar radiation pressure effects.

**Passivation requirements**: Stored energy in batteries, residual propellant, and pressurized systems poses fragmentation risk. The 512 MB–4 GB onboard storage and 1.2–45 W power systems represent modest energy storage, but lithium battery failures could generate debris fragments.

**Catalog maintenance**: The beacon/relay spacecraft maintain ephemeris catalogs for conjunction screening. Failed nodes must either remain trackable (requiring some minimum radar cross-section or beacon functionality) or be removed from active tracking, accepting uncertainty in their trajectories.

## Research Directions

1. **Model graveyard band orbital dynamics**: Simulate candidate graveyard orbit locations (e.g., ±0.02 AU from active swarm bands) over 100-year timescales to determine minimum separation distances that prevent conjunction with operational zones, accounting for solar radiation pressure perturbations on 50 m² sail surfaces.

2. **Quantify disposal ΔV requirements**: Calculate the impulsive or low-thrust ΔV needed to transfer from operational slots to graveyard bands as a function of orbital radius, and compare against the propulsion budgets specified by each model (0.5 m/s/year minimum to 62 m/s/year maximum).

3. **Develop failure prediction algorithms**: Design onboard health monitoring that can predict imminent system failure with sufficient lead time (target: 48–72 hours) to execute autonomous disposal maneuvers or passivation sequences before control authority is lost.

4. **Assess debris persistence risk**: Model the long-term collision probability contribution of uncontrolled failed nodes versus the operational risk reduction from active disposal, establishing the cost-benefit threshold for disposal system complexity.

5. **Define passivation protocol**: Specify the sequence for safe end-of-life state—battery discharge levels, propellant venting procedures, and communication beacon deactivation—that minimizes fragmentation risk while maintaining trackability for catalog purposes.
