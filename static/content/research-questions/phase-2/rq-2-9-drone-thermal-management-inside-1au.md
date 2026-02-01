---
questionId: "rq-2-9"
slug: "drone-thermal-management-inside-1au"
title: "Drone thermal management inside 1 AU"
questionType: "engineering-decision"
priority: "high"
status: "open"
sourcePhase: "phase-2"
sourceBOMItemId: "bom-2-2"
sourceBOMItemSlug: "maintenance-drones"
sourceBOMItemName: "Maintenance Drones"
relatedBOMItems:
  - "bom-2-2"
  - "bom-1-3"
tags:
  - "thermal-management"
  - "inner-solar-system"
  - "radiators"
createdDate: "2026-02-01"
---

## Background

Maintenance drones are autonomous spacecraft responsible for inspecting, servicing, and repairing the millions of collector satellites comprising the Dyson swarm. The Phase 2 consensus specification defines a heterogeneous fleet architecture with inspection drones (14-52 kg) and servicer drones (180-320 kg), all powered by triple-junction GaAs solar arrays sized for operations between 0.6-1.2 AU. However, the consensus document explicitly identifies thermal management inside 1 AU as an open question, noting that "if Phase 2 extends to 0.3-0.6 AU orbits, current thermal designs may be inadequate."

This question arises because solar flux increases with the inverse square of distance from the Sun. At 0.6 AU, incident flux is approximately 2.8× Earth-orbit levels (~3,800 W/m²); at 0.3 AU, it reaches ~11× (~15,200 W/m²). Drones designed for 1 AU operations face component temperatures exceeding qualification limits, accelerated degradation of solar arrays, and potential thermal runaway during proximity operations near sun-facing collector surfaces.

## Why This Matters

The inner solar system represents the highest-value real estate for energy collection—a collector at 0.3 AU intercepts 11× more solar flux than one at 1 AU. Maintaining these assets is therefore critical to overall swarm power output. If maintenance drones cannot operate reliably inside 1 AU, the project faces three unacceptable outcomes:

1. **Coverage gaps**: Inner swarm elements become effectively unserviceable, creating reliability dead zones where failed collectors accumulate
2. **Accelerated fleet attrition**: Drones dispatched to inner regions experience shortened lifespans, undermining the 10-15 year design lifetime target and inflating replacement costs
3. **Operational constraints**: Maintenance windows become restricted to specific orbital geometries or eclipse periods, reducing sortie tempo and increasing mean time to repair

The thermal design also directly impacts propellant budget. Hall-effect thrusters operate at elevated temperatures; xenon propellant tanks require thermal conditioning. If radiator area must increase substantially, drone wet mass grows, reducing the number of serviceable elements per sortie and cascading into larger fleet requirements.

## Key Considerations

**Heat sources and sinks**: Drones must reject heat from solar array absorption, thruster operation (Hall thrusters run at 200-400°C channel temperatures), avionics dissipation, and robotic arm actuators under load. At 0.3 AU, the Sun-facing hemisphere receives ~15 kW/m²; the anti-Sun hemisphere can radiate to deep space at ~3K, but view factors to nearby collector surfaces may limit effective sink temperature.

**Solar array thermal limits**: Triple-junction GaAs cells degrade above ~150°C. At 0.3 AU, passive array temperatures could exceed 200°C without mitigation. Array feathering (tilting to reduce projected area) reduces power generation proportionally, potentially below minimum bus requirements for propulsion and manipulation.

**Battery thermal sensitivity**: Lithium-ion batteries (implied by 0.5-5+ kWh capacity specifications) require operation between -20°C and +60°C. Eclipse transients and variable duty cycles complicate thermal buffering.

**Radiator sizing tradeoffs**: Increasing radiator area adds mass and deployed surface area, complicating stowage, increasing collision cross-section, and raising unit cost. The consensus estimates $0.4-20M per drone depending on class; radiator-driven mass growth could push costs toward the upper bound.

**Proximity operations**: Servicer drones must approach and grapple collector elements that may themselves be at elevated temperatures. Radiant heat transfer during docking and manipulation adds transient thermal loads not present in cruise phases.

## Research Directions

1. **Develop thermal models for representative drone configurations** at 0.3, 0.5, and 0.6 AU, incorporating solar array orientation, radiator view factors, and duty-cycle-dependent internal dissipation. Identify which components exceed qualification limits first and by what margin.

2. **Evaluate active thermal control architectures** including deployable sunshades, pumped-fluid loops with deployable radiators, and variable-conductance heat pipes. Quantify mass, power, and reliability penalties relative to passive designs adequate for >1 AU.

3. **Analyze operational mitigations** such as restricting inner-AU sorties to eclipse corridors, limiting continuous proximity operation duration, or accepting reduced solar array output via feathering. Determine whether these constraints are compatible with maintenance tempo requirements.

4. **Assess depot thermal design implications**: If drones return to depots for cooling between sorties, depot spacing inside 1 AU may need to decrease, affecting logistics architecture and propellant delivery strategies.

5. **Prototype and test high-temperature-tolerant subsystems** including solar array coatings with enhanced emissivity, wide-temperature-range battery chemistries, and thermally isolated manipulator actuators to expand the operational envelope without full vehicle redesign.
