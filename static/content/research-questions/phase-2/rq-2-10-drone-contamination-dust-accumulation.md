---
questionId: "rq-2-10"
slug: "drone-contamination-dust-accumulation"
title: "Drone self-cleaning and contamination control"
questionType: "engineering-decision"
priority: "medium"
status: "open"
sourcePhase: "phase-2"
sourceBOMItemId: "bom-2-2"
sourceBOMItemSlug: "maintenance-drones"
sourceBOMItemName: "Maintenance Drones"
relatedBOMItems:
  - "bom-2-2"
  - "bom-2-1"
tags:
  - "contamination"
  - "cleaning"
  - "proximity-operations"
createdDate: "2026-02-01"
---

## Background

Maintenance drones are autonomous robotic spacecraft responsible for inspecting, servicing, and repairing the millions of collector satellites comprising the Dyson swarm. The Phase 2 consensus architecture specifies a heterogeneous fleet of inspection drones (15-50 kg class) and servicer drones (180-250 kg class) operating from regional maintenance depots. These drones must operate in close proximity to collector satellites—often within centimeters—to perform visual inspection, ORU replacement, and potential repair operations using force-controlled robotic manipulators with 6-7 DOF arms.

The contamination control question arises because maintenance drones accumulate particulates, outgassed materials, and propellant residues during normal operations, while simultaneously working near optically sensitive collector surfaces. The consensus document explicitly identifies "contamination and dust accumulation" as an unresolved open question, noting that "electrostatic repulsion and plume impingement constraints remain unresolved." This creates a fundamental tension: drones must approach collector optics closely enough to service them without degrading the very surfaces they are designed to maintain.

## Why This Matters

Collector satellite efficiency depends directly on optical surface cleanliness. Even nanometer-scale contamination films can reduce reflectivity or absorptivity, degrading energy collection across millions of units. A maintenance drone that deposits contaminants during servicing operations could cause more harm than the fault it was dispatched to repair.

**Critical dependencies include:**
- **Propulsion system selection**: Cold-gas nitrogen thrusters are specified for proximity operations precisely because they produce cleaner exhaust than chemical alternatives, but even nitrogen plumes can redistribute surface particulates or cause thermal shock
- **Manipulator operations**: Force-controlled arms contacting collector structures may transfer lubricant residues, wear particles, or electrostatic-attracted dust
- **Fleet economics**: If drones require frequent depot returns for decontamination, the 150-200 day inspector patrol ranges and 60-90 day servicer mission ranges specified in the consensus become unachievable

**Risk consequences:**
- Systematic contamination could create a negative maintenance ROI where drone operations degrade swarm performance faster than failures would
- Electrostatic charging in the solar environment may cause drones to attract and retain dust, creating progressive contamination accumulation over the 10-15 year design lifetime
- Contaminated inspection sensors could generate false positives or miss actual faults, corrupting the reliability datasets needed to size the servicer fleet

## Key Considerations

**Contamination sources requiring mitigation:**
- Thruster exhaust products (nitrogen, xenon ions, trace impurities)
- Outgassing from polymers, adhesives, and thermal control coatings
- Wear debris from mechanical interfaces (grapple mechanisms, tool couplers, ORU latches)
- Lubricant migration from manipulator joints
- Electrostatically attracted interplanetary dust

**Operational constraints:**
- Solar flux at 0.6-1.2 AU (nominal) creates significant electrostatic charging; operations inside 0.6 AU exacerbate this
- Vacuum environment prevents convective cleaning; all particle removal must be mechanical, electrostatic, or radiative
- Thermal cycling (potentially hundreds of cycles per year) may cause differential expansion that releases trapped particulates

**Interface considerations:**
- The consensus mandates standardized grapple points and docking features on all swarm elements—these interfaces must incorporate contamination barriers
- Quick-change tool couplers on servicer arms represent high-contact-frequency contamination vectors
- Battery backup systems (0.5-5+ kWh) may outgas electrolyte if damaged

**Mass and power budgets:**
- Self-cleaning systems compete for mass allocation on 15-50 kg inspection drones where every kilogram affects patrol range
- Active cleaning mechanisms require power from solar arrays already sized for propulsion and payload operations

## Research Directions

1. **Characterize plume impingement envelopes**: Model cold-gas nitrogen and Hall thruster xenon plume expansion to establish minimum standoff distances and approach vectors that prevent direct impingement on collector optics. Validate against existing spacecraft proximity operations data (ISS, satellite servicing demonstrations).

2. **Evaluate electrostatic self-cleaning approaches**: Investigate conductive surface coatings and active charge management systems that repel dust accumulation. Assess compatibility with the 0.6-1.2 AU solar environment and potential extension to 0.3-0.6 AU high-flux operations identified in the thermal management open question.

3. **Design contamination-controlled manipulator systems**: Research hermetically sealed joint designs, solid lubricant alternatives, and particle-capturing bellows for the 7-DOF arms. Quantify wear particle generation rates over the 10-15 year design lifetime with depot refurbishment intervals.

4. **Develop proximity operations protocols**: Define approach corridors, thruster inhibit zones, and post-contact inspection requirements that minimize contamination transfer. Integrate with the Level 4+ autonomy systems to enable real-time contamination risk assessment.

5. **Prototype depot-based decontamination systems**: Design bakeout, UV exposure, or mechanical cleaning stations at maintenance depots to restore drone cleanliness during refueling stops, establishing acceptable contamination thresholds for return-to-service.
