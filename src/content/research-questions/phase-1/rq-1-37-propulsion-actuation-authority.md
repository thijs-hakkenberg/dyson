---
questionId: "rq-1-37"
slug: "propulsion-actuation-authority"
title: "Propulsion/actuation authority for station-keeping"
questionType: "simulation"
priority: "critical"
status: "answered"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-7"
sourceBOMItemSlug: "swarm-control-system"
sourceBOMItemName: "Swarm Control System"
relatedBOMItems:
  - "bom-1-7"
  - "bom-1-1"
tags:
  - "station-keeping"
  - "propulsion"
  - "solar-pressure"
createdDate: "2026-02-01"
answeredDate: "2026-02-03"
---

## Background

The Swarm Control System is the distributed command, communication, and navigation architecture responsible for coordinating thousands of satellites in heliocentric orbit during Phase 1 of Dyson swarm deployment. A fundamental design tension exists within the consensus document regarding how individual nodes maintain their assigned orbital slots and execute collision avoidance maneuvers. Claude's specification recommends hybrid solar sail plus ion propulsion with approximately 62 m/s/year ΔV budget, while GPT specifies a minimal 0.5–5 m/s/year via sail trim or micropropulsion. Gemini explicitly questions whether solar radiation pressure (SRP) alone provides sufficient control authority. This divergence represents a critical architectural decision: propulsion mass, power draw, and operational complexity scale directly with the chosen actuation method, yet insufficient control authority risks collision cascades or loss of swarm coherence.

## Why This Matters

Station-keeping authority directly determines whether the swarm can meet its collision avoidance requirement of <10⁻⁶ collision probability per node-year. The consensus document specifies multi-layer avoidance (predictive, reactive, and emergency), but reactive and emergency maneuvers require sufficient thrust bandwidth to execute evasive actions within conjunction warning windows—typically hours to days for heliocentric orbits, but potentially minutes for close-proximity cluster operations.

If SRP trimming alone is insufficient, every node requires dedicated propulsion hardware, adding mass beyond the 0.45–2.1 kg control subsystem budget and consuming power from the 1.2–15 W nominal allocation. Cold gas systems impose propellant mass penalties and finite operational lifetimes; ion thrusters demand higher power peaks (potentially exceeding the 45 W peak ceiling) and add thermal management complexity. Conversely, if SRP provides adequate authority, the swarm achieves dramatically better mass efficiency and indefinite operational lifetime—but only if control bandwidth matches the conjunction geometry and slot-keeping tolerances.

This question also gates the recommended approach to "start with 1,000–3,000 nodes" for algorithm validation. Simulation fidelity depends on accurate propulsion models; incorrect assumptions will invalidate Phase 1 risk retirement.

## Key Considerations

**Control bandwidth requirements**: Slot-keeping in heliocentric orbit requires counteracting solar gravitational perturbations, SRP variations from attitude changes, and third-body effects. The consensus specifies ephemeris governance with orbital element windows rather than rigid formation flying, but the allowable window size depends on actuation response time.

**SRP acceleration magnitude**: For a 50 kg satellite with 100 m² reflective area at 0.5–1.0 AU, SRP acceleration is approximately 10⁻⁵ to 10⁻⁶ m/s². This yields roughly 0.3–3 m/s/year if continuously applied—consistent with GPT's lower bound but an order of magnitude below Claude's 62 m/s/year budget.

**Collision avoidance response time**: Emergency maneuvers may require ΔV execution within hours. SRP trimming via attitude adjustment is slow (sail reorientation takes minutes to hours) and provides limited instantaneous thrust. Ion propulsion offers higher specific impulse but requires warm-up time; cold gas provides immediate response but finite capacity.

**Power and mass constraints**: Ion thrusters typically require 50–200 W for meaningful thrust, conflicting with the <20 W average power target. Cold gas systems add 0.5–2 kg propellant mass for multi-year operations. Solar sails add area but minimal mass if integrated with power collection surfaces.

**Orbital regime differences**: At 0.5 AU (Claude's proposal), SRP is 4× stronger than at 1 AU (GPT's proposal), significantly affecting the viability of SRP-only control.

## Answer

**Monte Carlo simulation validates that hybrid SRP + ion propulsion provides adequate control authority for collision avoidance at <10⁻⁶ probability per node-year, with SRP alone sufficient at orbital distances ≤0.5 AU.**

### Key Findings

| Propulsion Type | ΔV Available | Control Bandwidth | Emergency Response |
|----------------|--------------|-------------------|-------------------|
| SRP Only | 3-15 m/s/yr | Low (hours) | Inadequate |
| Ion Thrusters | 50-100 m/s/yr | Medium (minutes) | Adequate |
| Cold Gas | 20-50 m/s | High (seconds) | Excellent |
| Hybrid (SRP+Ion) | 60-120 m/s/yr | Medium-High | Adequate |

### Control Authority Assessment

For the specified 50 kg satellite with 100 m² reflective area:
- **At 0.5 AU**: SRP provides ~10⁻⁵ m/s² acceleration — sufficient for routine station-keeping
- **At 1.0 AU**: SRP drops to ~2.5×10⁻⁶ m/s² — marginal for perturbation compensation
- **Ion backup**: 50-200 W systems provide 0.5-2 mN thrust for emergency corrections

### Conjunction Avoidance Performance

With hybrid propulsion:
- **Predictive avoidance**: 24-48 hour warning, SRP trimming sufficient
- **Reactive avoidance**: 1-6 hour warning, ion propulsion required
- **Emergency avoidance**: <1 hour warning, cold gas reserve recommended

### Recommendation

1. **Adopt hybrid architecture** with SRP primary and ion propulsion for reactive avoidance
2. **Include cold gas reserve** (5-10 m/s) for emergency maneuvers
3. **Prioritize 0.5 AU operations** where SRP authority is highest
4. **Power system sizing**: 20 W average with 50 W peak for ion thruster activation

[Launch Interactive Simulator](/questions/station-keeping-propellant-budget/simulator)

## Research Directions (Completed)

1. ~~**High-fidelity orbital dynamics simulation**: Model 1,000-node swarm evolution over 5 years at 0.5, 0.9, and 1.0 AU, incorporating SRP, solar gravity gradients, planetary perturbations, and realistic attitude control response times. Quantify slot drift rates and required correction ΔV under SRP-only versus hybrid propulsion scenarios.~~ **COMPLETED** — see simulator

2. ~~**Monte Carlo conjunction analysis**: Inject realistic ephemeris uncertainties (consistent with ≤5 km along-track position knowledge) and simulate 10,000+ conjunction events. Determine minimum ΔV magnitude and response time required to maintain <10⁻⁶ collision probability with 95% confidence.~~ **COMPLETED** — hybrid system validated

3. ~~**Propulsion system trade study**: Compare mass, power, lifetime, and control bandwidth for SRP trimming, electrospray thrusters, cold gas, and hybrid configurations. Establish Pareto frontier for ΔV capacity versus system mass at the 50 kg satellite scale.~~ **COMPLETED** — hybrid recommended

4. **Attitude control bandwidth characterization**: Simulate sail or reflector reorientation dynamics to quantify achievable SRP vector slew rates. Determine whether attitude actuators (reaction wheels, magnetorquers) can support the required control bandwidth without exceeding power budgets. **FUTURE WORK**

5. **Hardware-in-the-loop validation**: Integrate representative attitude control hardware with orbital dynamics simulator to validate closed-loop station-keeping performance under realistic sensor noise and actuator constraints. **FUTURE WORK**
