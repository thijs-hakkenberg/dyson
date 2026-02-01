---
questionId: "rq-1-15"
slug: "thruster-plume-contamination"
title: "Thruster plume and outgassing contamination control"
questionType: "experimentation"
priority: "high"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-3"
sourceBOMItemSlug: "assembly-robots"
sourceBOMItemName: "Assembly Robots"
relatedBOMItems:
  - "bom-1-3"
  - "bom-1-1"
  - "bom-1-2"
tags:
  - "contamination"
  - "thruster-plumes"
  - "outgassing"
createdDate: "2026-02-01"
---

## Background

Assembly robots for Project Dyson's Phase 1 deployment rely on Hall-effect thrusters with xenon propellant as their primary propulsion system, achieving specific impulse of 1,600–2,000 seconds for repositioning between work sites. The consensus architecture specifies three robot classes—heavy manipulators (1,000–2,500 kg), precision assemblers (150–500 kg), and logistics drones (50–100 kg)—all operating in proximity to thin-film photovoltaic collectors and sensitive optical systems including laser communication terminals and metrology sensors.

This contamination control question emerges directly from the operational reality that hundreds to thousands of robots will maneuver continuously near pristine optical surfaces. Thruster plumes deposit propellant residue and sputtered electrode material, while spacecraft outgassing releases volatile organic compounds, plasticizers, and silicone-based contaminants. The consensus document explicitly identifies this as an open question: "How to prevent thruster plumes, outgassing, and debris from degrading thin-film photovoltaics and optical sensors? What are acceptable exposure thresholds?"

## Why This Matters

Contamination directly threatens the core mission objective—energy collection efficiency. Thin-film photovoltaics can lose 1–5% efficiency per microgram/cm² of deposited contaminants, with some molecular species causing irreversible chemical degradation. Over the 5–20 year design life specified for assembly robots, cumulative exposure from thousands of thruster firings could reduce collector output by 10–30% or more.

The optical inter-satellite links specified for high-bandwidth local coordination are particularly vulnerable. Ka/X-band and optical communication systems require clean apertures; even nanometer-scale contamination films degrade laser link margins. If robots cannot communicate reliably, the Level 4+ autonomous coordination required due to communication latency becomes impossible.

This question creates critical dependencies for multiple design decisions:
- **Thruster placement and gimbal authority** on all robot classes
- **Keep-out zone definitions** around collector surfaces during assembly
- **Material selection** for robot structures, thermal blankets, and cable insulation
- **Operational choreography** for multi-robot assembly sequences
- **Maintenance intervals** for optical system cleaning (if cleaning is even feasible without consumables)

Failure to resolve contamination control could force either costly redesigns late in development or acceptance of degraded swarm performance that compounds over decades.

## Key Considerations

**Thruster plume characteristics**: Hall-effect thrusters produce divergent plumes (typically 40–60° half-angle) containing xenon ions, neutral xenon, and sputtered cathode/anode material (primarily molybdenum, tungsten, or carbon). Ion energies of 100–300 eV can cause sputtering damage to surfaces within line-of-sight.

**Outgassing sources and rates**: Spacecraft materials typically outgas at rates of 0.1–1% total mass loss over mission life, with most occurring in the first year. At 0.7–1.0 AU initial operating distance (per recommended approach), thermal cycling between sunlit and eclipse operations accelerates outgassing.

**Surface sensitivity thresholds**: GaAs triple-junction solar cells tolerate contamination better than thin-film alternatives, but the consensus specifies these for robot power systems, not necessarily for the collectors being assembled. Collector material specifications remain an open question per the "Tile/Collector Interface Finalization" item.

**Operational geometry**: Precision assemblers require ±0.1mm positioning accuracy, implying close-proximity operations where plume exposure is most severe. The 5–6.5m arm reach of heavy manipulators provides some standoff distance but limits assembly flexibility.

**Cleaning constraints**: The consensus document notes the challenge of keeping optical sensors clean "without consumables, especially if operating near asteroid-sourced materials." Any contamination control strategy must assume no resupply of cleaning agents.

## Research Directions

1. **Characterize Hall-effect thruster plume composition and deposition rates**: Conduct ground-based vacuum chamber testing with flight-representative thrusters, measuring deposition thickness and composition at various angles and distances. Establish quantitative contamination budgets per thruster firing as a function of geometry.

2. **Establish photovoltaic and optical surface contamination thresholds**: Test representative thin-film collector materials and optical coatings under controlled contamination exposure, determining acceptable cumulative dose limits for efficiency degradation below 5% over 20 years.

3. **Evaluate thruster placement and operational exclusion zones**: Model plume propagation for each robot class configuration, defining minimum standoff distances and prohibited firing orientations relative to sensitive surfaces. Assess impact on maneuver authority and assembly sequence efficiency.

4. **Develop and test passive contamination mitigation approaches**: Investigate plume shields, baffles, and surface coatings that resist contamination adhesion. Evaluate atomic oxygen exposure (if operating at higher altitudes for testing) as a natural cleaning mechanism.

5. **Prototype electrostatic or UV-based surface cleaning systems**: Design robot-mounted cleaning tools that require no consumables—electrostatic dust removal, UV photodesorption, or mechanical wiping with reusable elements. Quantify cleaning effectiveness and integration mass/power penalties.
