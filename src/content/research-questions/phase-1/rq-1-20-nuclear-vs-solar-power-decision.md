---
questionId: "rq-1-20"
slug: "nuclear-vs-solar-power-decision"
title: "Nuclear vs solar power decision for Assembly Node"
questionType: "engineering-decision"
priority: "critical"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-4"
sourceBOMItemSlug: "assembly-node"
sourceBOMItemName: "Assembly Node Hub"
relatedBOMItems:
  - "bom-1-4"
  - "bom-0-5"
tags:
  - "power-source"
  - "nuclear"
  - "solar"
  - "architecture"
createdDate: "2026-02-01"
---

## Background

The Assembly Node Hub (ANH) serves as the primary orbital manufacturing and assembly platform for Phase 1 Dyson swarm deployment, responsible for producing 1–1.7 MW-equivalent of solar collector capacity per month. This production throughput requires 1.5–2.0 MW of electrical generation capacity, creating a fundamental architectural decision point: whether to power the ANH with nuclear fission reactors, solar photovoltaics, or a hybrid system.

The consensus document reveals significant divergence among design approaches. Claude advocates for nuclear fission using four 500 kW Kilopower-derived reactors with solar backup, citing eclipse independence and compactness. Gemini specifies solar PV plus solar-thermal concentrators scaled to 120 MW at 0.39 AU (Mercury L1). GPT recommends solar PV only at 1.5 MW as a lower-risk Phase 1 baseline. The recommended approach currently favors solar PV with a parallel nuclear option study, but this decision requires rigorous technical validation before design freeze.

## Why This Matters

The power source selection cascades through virtually every ANH subsystem and drives mission-critical parameters:

**Thermal Management Coupling**: The ANH requires 2.4–4.0 MW thermal rejection capacity (2,800–4,800 m² radiator area). Nuclear reactors generate waste heat continuously regardless of manufacturing activity, while solar systems scale thermal load with power draw. This directly impacts the recommended 150% thermal margin sizing strategy.

**Mass Budget Impact**: Dry mass ranges from 120,000–450,000 kg depending on configuration. Nuclear systems offer superior power density (~40 W/kg for Kilopower-class) but require shielding mass. Solar arrays at 1 AU deliver ~100 W/kg but scale linearly with power demand and degrade over the 10–30 year design life.

**Orbital Location Dependency**: The recommended 1 AU baseline assumes solar viability. If nuclear proves necessary, inner-system migration (0.39–0.7 AU) becomes feasible earlier, potentially accelerating Phase 2 timelines and enabling co-location with Mercury feedstock sources.

**Program Risk and Cost**: GPT's $15–18B estimate versus Claude's $10B estimate partially reflects power architecture differences. Nuclear development carries regulatory, launch safety, and technology maturation risks. Solar carries eclipse vulnerability and array degradation risks over multi-decade operations.

**Autonomy Requirements**: Nuclear systems enable continuous operations during solar eclipses without battery mass penalties, simplifying the three-tier autonomy system's power management logic. Solar-only architectures require eclipse prediction, load shedding protocols, and potentially large battery banks.

## Key Considerations

**Power Density and Mass**: Kilopower-derived reactors at 500 kW each require approximately 1,500 kg per unit (including shielding), totaling ~6,000 kg for 2 MW. Equivalent solar arrays at 1 AU (~300 W/m², 20% efficiency) require ~33,000 m² and approximately 20,000 kg, plus power conditioning and potentially 10,000+ kg of batteries for eclipse operations.

**Technology Readiness**: Kilopower demonstrated 1 kW output in 2018 (KRUSTY test); scaling to 500 kW units requires significant development. Solar PV at MW scale is flight-proven (ISS operates at ~120 kW). The consensus recommends preserving interfaces for nuclear retrofit, implying solar baseline with upgrade path.

**Operational Flexibility**: Nuclear provides baseload power independent of orbital geometry, enabling operations during planetary shadow transits and supporting potential inner-system migration. Solar output varies with orbital distance squared—a 0.7 AU position increases flux by 2× versus 1 AU.

**Regulatory and Launch Constraints**: Nuclear payloads require launch safety approval, potentially limiting launch provider options and adding 2–3 years to development schedules. Fissile material handling adds ground processing complexity.

**Degradation and Lifetime**: Solar arrays degrade 1–3% annually from radiation and micrometeorite damage; 30-year operations may require array replacement. Nuclear fuel depletion depends on reactor design but typically supports 10–15 year cores.

## Research Directions

1. **Conduct Kilopower Scaling Analysis**: Commission a detailed study on scaling Kilopower technology from 1 kW demonstrated to 500 kW required, including timeline, cost, mass penalties from shielding, and integration constraints with modular pallet architecture.

2. **Model Eclipse and Shadow Scenarios**: Simulate ANH orbital mechanics at 1 AU baseline to quantify eclipse frequency, duration, and battery mass required for continuous operations. Compare against nuclear continuous-power mass budget.

3. **Perform Integrated Thermal Trade Study**: Model thermal rejection requirements for both architectures across manufacturing duty cycles, including peak loads during high-throughput operations and minimum loads during standby, to validate the 150% margin recommendation.

4. **Develop Hybrid Architecture Concept**: Design a solar-primary system with single 500 kW nuclear backup unit, evaluating whether partial nuclear capability provides sufficient eclipse bridging at acceptable mass and cost penalty.

5. **Assess Launch Safety and Regulatory Pathway**: Engage with relevant regulatory bodies to establish realistic timeline and cost estimates for nuclear launch approval, identifying critical path items that could delay Phase 1 deployment.
