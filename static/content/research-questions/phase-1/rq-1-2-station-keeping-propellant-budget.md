---
questionId: "rq-1-2"
slug: "station-keeping-propellant-budget"
title: "Station-keeping propellant budget vs solar radiation pressure"
questionType: "simulation"
priority: "high"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-1"
sourceBOMItemSlug: "collector-units"
sourceBOMItemName: "Collector Units"
relatedBOMItems:
  - "bom-1-1"
  - "bom-1-7"
tags:
  - "station-keeping"
  - "solar-pressure"
  - "formation-flying"
createdDate: "2026-02-01"
---

## Background

The Solar Collector Unit (SCU) represents the fundamental power-generating element of the Dyson swarm, designed as a thin-film photovoltaic membrane with areal densities ranging from 13 g/m² to 85 g/m² depending on configuration. These lightweight structures must maintain precise orbital positions and orientations to function both as efficient solar collectors and as coherent elements in a phased-array microwave power transmission system. The consensus document specifies ion or electrospray propulsion systems with 20-100 m/s ΔV capability over mission life for station-keeping, while also noting that solar radiation pressure can be utilized for attitude control. This creates a fundamental question: can the substantial solar radiation pressure at operational distances (particularly at 0.3-0.5 AU where solar flux reaches 5,480-15,000 W/m²) serve as the primary station-keeping mechanism, or will propellant-based systems remain essential?

## Why This Matters

This question directly impacts mission feasibility at scale. The consensus document identifies xenon supply as a critical constraint—Phase 1 at the proposed scale requires approximately 150 tonnes of xenon against global annual production of only ~70 tonnes. If propellant consumption exceeds mass budgets, the entire swarm architecture becomes unsustainable.

The answer determines:
- **Mass budget allocation**: Propellant mass competes directly with payload capacity. At Claude's specification of 1,850 kg total mass per 10,000 m² unit, even modest propellant requirements significantly impact system margins.
- **Mission lifetime**: A 20-100 m/s ΔV budget translates to finite operational life. If solar pressure can handle routine station-keeping, propellant reserves extend mission duration substantially.
- **Formation geometry precision**: Phased-array power transmission requires coherent beam forming across potentially thousands of units. Position errors of even meters can degrade transmission efficiency or cause dangerous beam divergence.
- **Manufacturing scalability**: Reducing or eliminating propellant systems simplifies unit design, reduces supply chain dependencies, and enables the graceful degradation philosophy where loss of 10% of units remains acceptable.

## Key Considerations

**Solar Radiation Pressure Magnitude**: At 1.0 AU, solar radiation pressure is approximately 4.56 μN/m². At 0.5 AU, this quadruples to ~18.2 μN/m². For a 10,000 m² collector at 0.5 AU, this yields ~182 mN continuous force—substantial for a 1,850 kg unit (acceleration ~0.1 mm/s²).

**Perturbation Forces**: Station-keeping must counteract gravitational perturbations from planetary bodies, solar wind variations, and differential solar pressure across the swarm. The magnitude of these disturbances varies significantly with orbital distance and formation geometry.

**Control Authority vs. Precision**: Solar pressure provides continuous, propellant-free force but offers limited control bandwidth. Gemini's spin-stabilization approach (5 RPM) with heliogyro solar pressure control suggests this is viable, but the consensus recommends hybrid attitude control with reaction wheels for fine pointing.

**Reflectivity Modulation**: Effective solar sailing requires variable reflectivity surfaces or articulated control vanes. The consensus specifies high-emissivity rear coatings (ε > 0.9) for thermal management, which may conflict with optimal solar pressure control surface properties.

**Formation Coherence Requirements**: With 1,000+ units maintaining phased-array transmission coherence, inter-unit spacing tolerances and autonomous avoidance capabilities must be quantified against achievable control precision.

## Research Directions

1. **High-Fidelity Orbital Dynamics Simulation**: Model SCU trajectories at 0.3, 0.5, and 1.0 AU incorporating solar radiation pressure, gravitational perturbations (Venus, Earth, Jupiter), solar wind variability, and unit-to-unit shadowing effects. Quantify ΔV requirements for maintaining formation geometry within phased-array coherence tolerances over 5-year mission life.

2. **Solar Pressure Control Authority Analysis**: Simulate achievable position and attitude control bandwidth using reflectivity modulation and articulated surfaces. Determine minimum response times and maximum correction magnitudes possible without propellant, comparing against formation-keeping requirements.

3. **Hybrid Control Strategy Optimization**: Develop control algorithms that maximize solar pressure utilization while reserving ion propulsion for perturbations exceeding solar pressure authority. Quantify propellant savings versus pure propulsive station-keeping across orbital distance options.

4. **Monte Carlo Failure Mode Analysis**: Simulate swarm behavior when individual units experience control system degradation. Determine collision probability and cascade failure risks under various inter-unit spacing assumptions (addressing the identified open question on swarm collision probability).

5. **Propellant Trade Study**: Compare xenon, krypton, and ionic liquid propellants for residual station-keeping requirements after solar pressure optimization. Quantify Isp penalties against supply chain feasibility for Phase 1 scale deployment.
