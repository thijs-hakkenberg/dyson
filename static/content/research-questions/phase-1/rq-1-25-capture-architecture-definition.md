---
questionId: "rq-1-25"
slug: "capture-architecture-definition"
title: "Orbital capture architecture definition"
questionType: "engineering-decision"
priority: "critical"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-5"
sourceBOMItemSlug: "mass-drivers"
sourceBOMItemName: "Mass Drivers"
relatedBOMItems:
  - "bom-1-5"
  - "bom-1-6"
tags:
  - "capture-system"
  - "mass-driver"
  - "rendezvous"
createdDate: "2026-02-01"
---

## Background

Mass drivers represent the primary bulk material transport infrastructure for Phase 1 Dyson swarm deployment, designed to launch payloads at 2.4-3.5 km/s from lunar or Mercurian surfaces toward orbital aggregation points. The consensus document specifies coilgun architecture capable of launching 10-500 kg payloads at rates ranging from 5 launches/hour to 6 launches/minute, yielding annual throughput projections of 8,760-31,536 tonnes per driver. However, all three source models explicitly flag the orbital capture system as "critical but undefined"—the mass driver's utility is entirely contingent on successfully receiving, decelerating, and aggregating these payloads at their destination.

The capture architecture must accommodate payloads arriving at velocities between 2.4-3.5 km/s (depending on trajectory design), with velocity dispersions and positional uncertainties that remain unquantified until the capture system parameters are established. This creates a circular dependency: capture envelope sizing determines acceptable launch tolerances, which in turn constrain mass driver guidance requirements.

## Why This Matters

Without a defined capture architecture, the entire mass driver investment—estimated at 500-2,000 tonnes of imported conductor stock plus substantial in-situ infrastructure—delivers zero functional value. Payloads launched into heliocentric or cislunar trajectories without capture capability become orbital debris rather than construction material.

**Critical dependencies include:**
- **Guidance system requirements**: A ±50 km capture envelope (as recommended) versus a ±500 m precision rendezvous demands fundamentally different payload tracking and terminal guidance systems
- **Payload design constraints**: Net capture tolerates tumbling payloads; magnetic braking requires specific carrier configurations; autonomous tug rendezvous needs onboard propulsion and navigation
- **Throughput matching**: At 6 launches/minute (Gemini's cadence), the capture system must process one payload every 10 seconds—a rate incompatible with individual tug retrieval but potentially achievable with passive net or foam systems
- **Carrier reuse logistics**: The sabot/carrier strategy divergence (disposable vs. 10,000-cycle reusable) cannot be resolved without knowing whether carriers can be returned from the capture point

**Risk implications**: Selecting an undersized capture envelope forces tighter launch tolerances, increasing mass driver complexity and reducing throughput. Selecting an oversized envelope may require prohibitive capture system mass or energy expenditure.

## Key Considerations

**Velocity regime**: Payloads arrive at 2.4-3.5 km/s relative to the destination. Decelerating a 100 kg payload from 2.5 km/s requires dissipating 312.5 MJ of kinetic energy—equivalent to 87 kWh per payload. At 10 launches/hour, this represents 870 kWh/hour continuous thermal or mechanical load.

**Positional uncertainty**: Launch velocity tolerances of ±0.1% at 2.5 km/s yield ±2.5 m/s velocity dispersion. Over a 3-day cislunar transit, this compounds to positional uncertainty measured in hundreds of kilometers without mid-course correction.

**Payload survivability**: The consensus specifies payloads must survive 500 g qualification testing. Capture deceleration must remain below this threshold—at 500 g, stopping a 2.5 km/s payload requires 127 m of deceleration distance.

**Candidate architectures**:
- **Net capture**: Passive, scalable, tolerates tumbling—but net mass scales with capture envelope and velocity
- **Magnetic braking**: Contactless, potentially regenerative—requires conductive payload carriers and precise alignment
- **Foam deceleration**: High energy absorption—but consumable and generates debris
- **Autonomous tug rendezvous**: Maximum flexibility—but throughput-limited and propellant-intensive

**Mass budget sensitivity**: Capture system mass delivered to L1 or NRHO costs the same per-kilogram as any other payload until mass drivers become operational—a bootstrap problem.

## Research Directions

1. **Model velocity dispersion propagation**: Simulate launch tolerance stack-up (muzzle velocity ±0.1%, timing ±1 ms, pointing ±0.01°) through representative trajectories to quantify arrival uncertainty envelope at candidate aggregation points (EML1, EML2, NRHO).

2. **Conduct capture architecture trade study**: Evaluate net, magnetic braking, foam, and tug options against metrics of mass-per-capture, energy-per-capture, throughput capacity, and payload compatibility. Establish Pareto frontier for capture envelope size versus system mass.

3. **Define payload trim capability requirements**: Determine whether onboard cold-gas or electrospray thrusters on payloads can reduce capture envelope requirements cost-effectively, and specify delta-v budget for terminal guidance.

4. **Prototype magnetic braking at subscale**: Test eddy-current or superconducting magnetic deceleration using representative carrier geometries at 100-500 m/s to validate scaling laws before committing to full-velocity design.

5. **Establish capture-driver interface specification**: Define the contractual boundary between mass driver and capture system—arrival velocity tolerance, positional uncertainty, payload tumble rate limits, and carrier configuration requirements—to enable parallel development.
