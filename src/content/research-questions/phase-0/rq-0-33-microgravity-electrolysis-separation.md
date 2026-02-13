---
questionId: "rq-0-33"
slug: "microgravity-electrolysis-separation"
title: "Industrial-scale microgravity electrolysis gas-liquid separation"
questionType: "experimentation"
status: "investigating"
priority: "high"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-6"
sourceBOMItemSlug: "ispp-systems"
sourceBOMItemName: "In-Situ Propellant Production Systems"
relatedBOMItems:
  - "bom-0-6"
  - "bom-0-3"
parentQuestionId: "rq-0-14"
tags:
  - "electrolysis"
  - "microgravity"
  - "gas-liquid-separation"
  - "propellant-production"
  - "magnetic-separation"
externalReferences:
  - "NatureChem-2025-romero-calvo-magnetic-electrolysis"
  - "npjMicrogravity-2022-magnetic-phase-separation"
  - "npjMicrogravity-2022-electrolysis-reduced-gravity"
  - "EUCASS-2023-romeo-water-propulsion"
createdDate: "2026-02-10"
---

## Background

Water electrolysis in microgravity faces a fundamental engineering challenge: gas-liquid separation. On Earth, buoyancy naturally separates hydrogen and oxygen gas bubbles from the liquid water electrolyte. In microgravity, gas bubbles remain attached to electrode surfaces, reducing active area and eventually blocking electrolysis entirely. This problem has been demonstrated in small-scale ISS experiments but never addressed at the industrial scale (500-750 kW) required for Phase 0 propellant production.

## Why This Matters

Gas-liquid separation efficiency directly determines:
- Electrolysis cell operational duty cycle (must periodically clear accumulated gas)
- Electrode degradation rate (gas blanketing causes local overheating)
- System power efficiency (gas-covered electrodes waste electrical energy as heat)
- Product gas purity (incomplete separation contaminates H2 with O2 and vice versa)
- Scaling feasibility from laboratory demonstration to production systems

If gas-liquid separation cannot be solved at scale, propellant production may require artificial gravity (rotation), fundamentally changing the station architecture.

## Key Considerations

- Centrifugal separators work but add mass, complexity, and moving parts
- Capillary-based phase separators are passive but limited in throughput
- Membrane electrode assemblies (PEM) may offer inherent separation but at higher cost
- Alkaline electrolysis produces larger bubbles that may be easier to manage
- ISS Oxygen Generation System provides some operational data but at 1/1000th the required scale

## Research Directions

1. **ISS electrolysis scaling experiment**: Design and deploy a 1-10 kW electrolysis experiment on ISS to characterize gas-liquid separation behavior at intermediate scales between laboratory and production.

2. **Centrifugal separator sizing study**: Model rotating phase separators at production scale, quantifying mass, power, and reliability against passive alternatives.

3. **PEM vs. alkaline trade study**: Compare proton exchange membrane and alkaline electrolysis architectures specifically for microgravity operability, not just efficiency.

4. **Parabolic flight bubble dynamics**: Conduct systematic measurements of bubble nucleation, growth, and detachment on electrode surfaces across multiple electrolyte compositions and current densities.

5. **Hybrid gravity approach**: Evaluate whether localized rotation (spinning the electrolysis cell itself) provides sufficient separation without requiring station-wide artificial gravity.
