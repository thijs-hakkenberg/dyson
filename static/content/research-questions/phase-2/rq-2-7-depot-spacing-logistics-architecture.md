---
questionId: "rq-2-7"
slug: "depot-spacing-logistics-architecture"
title: "Optimal depot spacing and logistics architecture"
questionType: "simulation"
priority: "critical"
status: "open"
sourcePhase: "phase-2"
sourceBOMItemId: "bom-2-2"
sourceBOMItemSlug: "maintenance-drones"
sourceBOMItemName: "Maintenance Drones"
relatedBOMItems:
  - "bom-2-2"
  - "bom-1-6"
tags:
  - "depot"
  - "logistics"
  - "fleet-sizing"
  - "propellant"
createdDate: "2026-02-01"
---

## Background

Maintenance Drones constitute the autonomous servicing infrastructure for Project Dyson's Phase 2 Swarm Expansion, responsible for continuous inspection, fault detection, and repair of up to 10 million satellite collectors. The consensus architecture establishes a depot-centric operations model where regional maintenance stations provide refueling, spare parts storage, tool exchange, and communications relay to Earth. However, the optimal spacing between these depots remains undefined, representing a critical gap in the logistics architecture.

The drone fleet operates under significant propulsion constraints. Inspector-class drones (15-50 kg) use Hall-effect thrusters with xenon propellant delivering 1,500-2,000 s specific impulse for transit, while cold-gas nitrogen thrusters handle proximity operations. Servicer-class drones (180-250 kg) carry substantially more propellant but face higher mass penalties per maneuver. The consensus recommends depot spacing that supports inspector patrol ranges of 150-200 days and servicer mission ranges of 60-90 days without return—but these operational windows must be translated into physical distances given the swarm's orbital geometry and delta-v budgets.

## Why This Matters

Depot spacing directly determines three interdependent parameters: total depot count, fleet size requirements, and propellant consumption rates. These collectively represent the largest recurring cost drivers for swarm maintenance operations.

If depots are spaced too far apart, drones expend excessive propellant on transit rather than productive servicing, reducing sortie efficiency and requiring larger propellant reserves per drone. This cascades into heavier drone wet masses, longer refueling cycles, and potential coverage gaps during high-failure-rate periods. Conversely, over-dense depot placement multiplies infrastructure costs—each depot requires its own propellant storage, spare parts inventory, communications equipment, and periodic resupply from Earth or in-situ production facilities.

The propellant delivery architecture compounds this complexity. Dedicated tanker drones add fleet overhead but enable flexible depot resupply; centralized hub returns simplify logistics but create single points of failure and longer turnaround times. This decision affects whether depots can operate autonomously for extended periods or require frequent external support.

Fleet sizing estimates vary dramatically based on depot assumptions: Claude's 50,000-drone fleet versus Gemini's 5,000-unit Weaver concept reflects fundamentally different logistics philosophies. Without resolving depot architecture, Phase 2 cannot finalize production quantities, launch manifests, or operational budgets.

## Key Considerations

**Propulsion delta-v budgets**: Hall thrusters at 1,500-2,000 s Isp provide efficient transit, but xenon storage mass limits total mission delta-v. Inspector drones (particularly GPT's 14-15 kg MD-A variant without Hall thrusters) depend entirely on cold-gas systems, severely constraining range and requiring denser depot placement.

**Orbital mechanics**: Swarm elements occupy varying heliocentric distances (0.6-1.2 AU nominal, potentially 0.3-0.6 AU in extended operations). Depot-to-satellite transfer costs depend on relative orbital phasing, inclination differences, and whether Hohmann-like transfers or continuous low-thrust spirals are employed.

**Failure rate distribution**: Depot placement should correlate with expected failure density. If failures cluster near specific orbital zones (e.g., higher radiation environments or thermal stress regions), asymmetric depot spacing may optimize response times.

**Resupply cadence**: Depots require periodic replenishment of xenon, nitrogen, ORU spares, and potentially replacement tools. Resupply mission frequency from Earth or lunar/asteroid sources constrains how much buffer inventory each depot must maintain.

**Communications latency**: Depots serve as Earth communication gateways. Spacing affects mesh network topology and whether drone-to-depot links can maintain reliable S-band or Ka-band connectivity across patrol ranges.

**Thermal constraints**: Operations inside 1 AU impose thermal management challenges. Depot placement must account for whether drones can safely loiter at certain heliocentric distances during refueling.

## Research Directions

1. **Develop a parametric logistics simulation** modeling drone patrol patterns, failure response times, and propellant consumption across depot spacing scenarios from 50,000 km to 500,000 km intervals. Vary inspector/servicer fleet ratios and compare total system mass, cost, and mean-time-to-repair metrics.

2. **Characterize delta-v requirements** for representative servicing missions using high-fidelity orbital mechanics, including station-keeping at target satellites, multi-target sorties, and return-to-depot transfers across the 0.6-1.2 AU operational envelope.

3. **Model propellant supply chain architectures** comparing dedicated tanker drone networks, depot-to-depot transfer schemes, and centralized hub resupply. Quantify infrastructure mass, launch costs, and resilience to supply disruptions.

4. **Analyze failure mode spatial distributions** using reliability models for swarm elements to identify whether depot placement should be uniform or weighted toward high-stress orbital regions.

5. **Simulate fleet degradation scenarios** where depot loss or propellant shortages occur, evaluating how spacing affects system graceful degradation and recovery timelines.
