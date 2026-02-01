---
questionId: "rq-1-17"
slug: "dust-debris-sensor-cleaning"
title: "Dust and debris management for optical sensors"
questionType: "engineering-decision"
priority: "medium"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-3"
sourceBOMItemSlug: "assembly-robots"
sourceBOMItemName: "Assembly Robots"
relatedBOMItems:
  - "bom-1-3"
  - "bom-2-2"
tags:
  - "dust"
  - "debris"
  - "sensor-cleaning"
  - "optics"
createdDate: "2026-02-01"
---

## Background

Assembly Robots for Phase 1 of the Dyson swarm deployment rely heavily on optical systems for navigation, precision manipulation, and inter-robot communication. The consensus document specifies sub-millimeter positioning accuracy (±0.5mm for heavy manipulators, ±0.1mm for precision assemblers) and optical inter-satellite links for high-bandwidth local coordination. These capabilities depend on unobstructed, clean optical surfaces—camera lenses, laser communication apertures, and metrology sensors.

The operating environment presents significant contamination challenges. Hall-effect thrusters using xenon propellant generate plumes during repositioning maneuvers. If operations occur near asteroid-sourced materials (as implied by in-situ resource utilization strategies), regolith dust becomes a persistent hazard. Additionally, spacecraft outgassing, micrometeorite impacts creating secondary debris, and material handling during assembly all contribute particulate contamination. The consensus document explicitly identifies this as an open question: "How to keep optical sensors and laser communications clean without consumables, especially if operating near asteroid-sourced materials?"

## Why This Matters

Optical system degradation directly threatens mission-critical capabilities across all three robot classes:

**Precision Assembly**: The 150–500 kg dexterous worker class requires ±0.1mm positioning accuracy. Even thin dust films on machine vision cameras can introduce measurement errors exceeding this tolerance, causing misaligned joints, failed connections, or structural defects in solar collector assemblies.

**Communication Reliability**: Optical inter-satellite links form the backbone of local coordination among robot swarms. Contaminated apertures reduce link margins, potentially fragmenting coordinated assembly operations. The backup UHF system lacks bandwidth for real-time coordination of precision tasks.

**Operational Lifespan**: Design life spans 5–20 years depending on robot class. Cumulative contamination without effective mitigation could render robots non-functional well before mechanical wear-out, undermining the project's economic model.

**Autonomy Constraints**: Level 4+ autonomy requires reliable sensor inputs for decision-making. Degraded optical systems force either conservative operational limits or increased risk of autonomous errors—both problematic given communication latency to Earth.

The "no consumables" constraint is critical. Robots must be serviceable by peer robots with no Earth return option. Cleaning systems requiring expendable fluids, wipes, or gases would create logistics dependencies incompatible with the 10,000+ unit swarm scale envisioned.

## Key Considerations

**Contamination Sources and Rates**: Hall-effect thruster plumes deposit material at rates dependent on geometry and firing frequency. Xenon itself is inert, but sputtered cathode material and facility contaminants from manufacturing may co-deposit. Asteroid regolith particles range from sub-micron to millimeter scale with varying electrostatic properties.

**Optical Surface Sensitivity**: Laser communication systems typically tolerate <1% obscuration before link degradation. Machine vision performance depends on application but generally requires >95% clear aperture for metrology-grade accuracy.

**Thermal Environment**: At 0.7–1.0 AU (Phase 1) or 0.5 AU (future phases with 5,480 W/m² solar flux), thermal cycling between sunlit and shadowed operations creates expansion/contraction that can crack contamination films or embed particles deeper into coatings.

**Electrostatic Effects**: Solar UV and plasma environment charge surfaces, attracting and retaining dust electrostatically. This is particularly problematic near asteroid materials, which exhibit complex triboelectric charging.

**Mass and Power Budgets**: Cleaning systems compete with primary mission equipment. The 45–600 kg logistics/transport class has minimal margin for auxiliary systems. Active cleaning mechanisms require power from the 2–15 kWh battery storage already allocated for peak loads and eclipse operations.

**Reliability Over Decades**: Any mechanical cleaning system (wipers, shutters) introduces wear mechanisms and failure modes. Passive approaches may be preferable for 20-year design life targets.

## Research Directions

1. **Characterize contamination flux models**: Develop quantitative predictions for deposition rates from Hall-effect thruster plumes at various standoff distances and angles. Incorporate asteroid regolith mobilization rates for different material handling scenarios. Establish threshold exposure limits for optical system classes.

2. **Evaluate electrostatic dust mitigation**: Investigate transparent conductive coatings (ITO, carbon nanotube films) with active charge control to repel particles. Review lunar dust mitigation research from Artemis program for applicable technologies. Quantify power requirements and coating durability under UV exposure.

3. **Design passive protection architectures**: Analyze retractable lens covers, labyrinth baffles, and sacrificial witness surfaces that can be periodically jettisoned. Model thermal and mechanical reliability over 20-year operational cycles.

4. **Prototype peer-robot cleaning operations**: Define interfaces allowing one robot to clean another's optics using non-contact methods (CO2 snow, UV-ozone, or electrostatic transfer). Assess compatibility with "robot-friendly fasteners" and external access panel requirements.

5. **Establish operational protocols**: Develop thruster firing exclusion zones, approach vectors for material handling, and sensor parking attitudes that minimize contamination exposure. Quantify mission efficiency impacts of contamination-avoidance maneuvers.
