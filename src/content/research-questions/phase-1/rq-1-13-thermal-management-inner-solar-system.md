---
questionId: "rq-1-13"
slug: "thermal-management-inner-solar-system"
title: "Thermal management at 0.5 AU or closer"
questionType: "engineering-decision"
priority: "critical"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-3"
sourceBOMItemSlug: "assembly-robots"
sourceBOMItemName: "Assembly Robots"
relatedBOMItems:
  - "bom-1-3"
  - "bom-1-4"
  - "bom-2-2"
tags:
  - "thermal-management"
  - "cooling"
  - "inner-solar-system"
createdDate: "2026-02-01"
---

## Background

Assembly Robots are the autonomous workforce responsible for constructing Dyson swarm elements in heliocentric orbit. The consensus architecture specifies three robot classes: heavy manipulators (1,000–2,500 kg), precision assemblers (150–500 kg), and logistics drones (50–100 kg). These systems must operate continuously for 5–20 year design lives while performing sub-millimeter precision tasks (±0.1mm to ±0.5mm positioning accuracy).

The thermal management question arises from a fundamental divergence in operational planning. Claude's specifications design explicitly for 0.5 AU operations, where solar flux reaches approximately 5,480 W/m²—nearly four times Earth-orbit intensity. The recommended approach suggests beginning at 0.7–1.0 AU (1,960–1,360 W/m²) with a growth path to closer operations. This creates a critical engineering decision: how to design thermal control systems that function reliably at inner solar system distances while maintaining the precision, power systems, and electronics performance required for assembly operations.

## Why This Matters

Thermal management directly constrains where the swarm can be constructed and at what rate. Operating closer to the Sun offers compelling advantages: higher solar flux increases power generation from the GaAs triple-junction arrays, reduces transit times for material delivery, and positions construction near the optimal energy-collection zone for the completed swarm.

However, thermal failure modes cascade catastrophically through robot systems:
- **Electronics degradation**: RAD750 and LEON4 processors have operational limits typically around 125°C; sustained elevated temperatures accelerate semiconductor aging and increase single-event upset rates
- **Battery thermal runaway**: Lithium-based storage systems (2–15 kWh per robot class) require tight temperature control; thermal runaway risks increase exponentially above 60°C
- **Precision loss**: Thermal expansion in manipulator arms and joints directly degrades positioning accuracy, potentially pushing systems outside the ±0.1mm tolerance required for precision assembly
- **Propellant management**: Hall-effect thruster xenon storage and feed systems require thermal stability for consistent Isp performance (1,600–2,000 seconds)

The mass/reliability tradeoff identified in the consensus document is critical: passive radiator systems add mass but have no failure modes, while active cooling loops offer better performance but introduce pumps, working fluids, and potential leak points across a 5–20 year operational life.

## Key Considerations

**Thermal Environment Severity**: At 0.5 AU, equilibrium temperature for a flat absorbing surface reaches approximately 394 K (121°C) assuming α/ε = 1.0. Actual robot surfaces with solar arrays, radiators, and mixed coatings will experience significant thermal gradients and cycling as orientation changes during operations.

**Power System Coupling**: The same solar flux that creates thermal challenges also drives power generation. GaAs triple-junction cells lose approximately 0.2%/°C efficiency above 25°C, creating a direct tradeoff between thermal control mass and power system performance.

**Duty Cycle Effects**: Assembly operations generate internal heat loads—electron beam welding systems (if adopted) consume up to 25 kW, manipulator actuators dissipate power during positioning, and flight computers generate continuous waste heat. Peak thermal loads during active work may exceed steady-state solar input.

**Radiator Sizing**: Passive radiator area scales roughly linearly with heat rejection requirements but faces geometric constraints on robot form factors. Heavy manipulators with 6.5m arm reach have different surface-area-to-volume ratios than compact logistics drones.

**Material Constraints**: Multi-layer insulation (MLI), optical solar reflectors (OSRs), and radiator coatings all degrade under UV exposure and particle bombardment over multi-year missions, requiring end-of-life thermal margins.

## Research Directions

1. **Develop thermal models for each robot class** at 0.5, 0.7, and 1.0 AU, incorporating realistic duty cycles for assembly operations, eclipse periods, and worst-case solar pointing scenarios. Quantify required radiator areas and mass penalties for passive-only solutions.

2. **Evaluate hybrid thermal architectures** combining passive radiators with deployable sunshields and limited active cooling for temperature-critical components (batteries, precision actuators). Assess failure mode impacts and graceful degradation paths.

3. **Analyze historical deep-space thermal control systems** from missions operating at comparable solar distances (MESSENGER, Parker Solar Probe, Solar Orbiter) to extract validated design rules, material performance data, and lessons learned on long-duration thermal cycling.

4. **Conduct trade study on operational constraints** versus thermal system mass—determine whether restricting robot orientations, limiting continuous operation time, or mandating periodic "cool-down" attitudes can reduce thermal control mass below passive-only solutions.

5. **Prototype and test critical thermal interfaces** including battery pack thermal management, precision joint thermal stability, and electronics cold-plate designs under simulated 0.5 AU flux conditions in vacuum chambers.
