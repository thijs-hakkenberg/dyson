---
questionId: "rq-1-34"
slug: "refueling-concept-operations"
title: "Refueling concept of operations"
questionType: "engineering-decision"
priority: "high"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-6"
sourceBOMItemSlug: "orbital-tugs"
sourceBOMItemName: "Orbital Tugs"
relatedBOMItems:
  - "bom-1-6"
  - "bom-1-4"
tags:
  - "refueling"
  - "depot"
  - "propellant-transfer"
createdDate: "2026-02-01"
---

## Background

Orbital Tugs represent the primary logistics backbone for Phase 1 Initial Swarm Deployment, responsible for transporting 2,000–8,000 kg payloads across cislunar and heliocentric space. These 50 kW-class Solar Electric Propulsion vehicles are designed for 7–15 year operational lifetimes with thruster endurance of 20,000–50,000 hours. The consensus document explicitly calls for depot-based operations, with propellant tanks sized for refueling and thruster pods designed as Orbital Replacement Units (ORUs). However, the three source models diverge significantly on *how* propellant transfer should occur: Claude assumes ground-launched xenon with depot refueling capability, Gemini recommends securing xenon futures with transition to alternative propellants, and GPT advocates "tank swap" modules at depots initially, deferring fluid transfer to later phases. This fundamental operational question must be resolved before freezing the tug design, as it directly impacts tank geometry, valve architecture, depot infrastructure, and fleet turnaround time.

## Why This Matters

The refueling concept of operations determines whether the tug fleet can achieve the sortie rates required for swarm construction or becomes bottlenecked at depot nodes. With xenon consumption rates of approximately 1–2 kg per 1,000 hours of thrusting at 50 kW power levels, a single tug executing continuous heliocentric transfers could consume 15–30 kg of propellant monthly. At fleet scales of 800+ units (per Claude's production estimate), aggregate propellant demand could reach 12,000–24,000 kg/month—requiring either massive ground-launch capacity or in-space propellant production.

The choice between fluid transfer, tank swap, and drop tanks creates cascading dependencies:

- **Fluid transfer** requires cryogenic-compatible (for future hydrogen options) or high-pressure xenon plumbing, leak detection systems, contamination control protocols, and precise mass gauging in microgravity—all adding complexity and failure modes.
- **Tank swap** simplifies the tug-depot interface but demands standardized tank modules, robotic exchange mechanisms, and larger depot storage capacity for empty/full tank inventories.
- **Drop tanks** minimize depot infrastructure but increase per-mission mass overhead and create debris management concerns.

Selecting the wrong architecture could strand tugs at depots awaiting propellant, increase unit costs by 20–40% through over-engineering, or create single-point failures in the logistics chain.

## Key Considerations

**Propellant Properties**: Xenon stores as a supercritical fluid at 60–80 bar and 20°C, simplifying thermal management but requiring high-pressure plumbing. Fluid transfer in microgravity demands positive expulsion systems (bladders or pistons) or settling thrust. Contamination with water vapor or hydrocarbons degrades Hall thruster cathodes.

**Interface Standardization**: The recommended Project Dyson Swarm Logistics Standard (SLS) must define xenon refuel coupling specifications before tug design freeze. IDSS-derived interfaces provide a starting point but lack propellant transfer provisions.

**Turnaround Time**: Tank swap could achieve 2–4 hour depot turnaround versus 8–24 hours for fluid transfer (including leak checks and system purging). At 800-unit fleet scale, this difference translates to thousands of additional sortie-days annually.

**Mass Budget Impact**: Dedicated tank swap modules add 15–25% dry mass overhead versus integrated tanks. Drop tanks may add 10–15% per mission but eliminate depot dwell time entirely.

**Contamination and Leak Detection**: Xenon leaks are difficult to detect visually. Helium mass spectrometry or pressure-decay testing requires specialized depot equipment. Contamination control demands Class 10,000 cleanroom-equivalent handling or better.

**Technology Readiness**: Fluid transfer has been demonstrated at small scales (Orbital Express, ISS) but never for high-pressure noble gases at the volumes required. Tank swap is mechanically simpler but requires robotic manipulation systems at TRL 6–7.

## Research Directions

1. **Survey existing xenon transfer heritage**: Analyze propellant loading procedures from Dawn, Psyche, and commercial GEO satellite programs to quantify leak rates, contamination incidents, and ground support equipment requirements. Extrapolate to orbital depot operations.

2. **Conduct trade study on tank module standardization**: Model three tank sizes (500 kg, 1,000 kg, 2,000 kg xenon capacity) against mission profiles to determine optimal swap module inventory. Include robotic exchange mechanism mass and depot storage volume in the trade space.

3. **Prototype microgravity xenon transfer**: Partner with ISS National Lab or commercial stations to demonstrate small-scale (10–50 kg) xenon transfer using positive expulsion bladders. Measure transfer efficiency, contamination levels, and time-to-completion.

4. **Develop contamination control protocol**: Define acceptable particulate and moisture levels for Hall thruster feed systems, then specify filtration, purging, and verification procedures for each refueling concept. Estimate recurring costs per refueling event.

5. **Model fleet logistics under each architecture**: Simulate 5-year fleet operations with 100, 400, and 800 tugs under fluid transfer, tank swap, and hybrid scenarios. Identify bottlenecks, depot sizing requirements, and sensitivity to component failures.
