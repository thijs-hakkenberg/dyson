---
questionId: "rq-1-4"
slug: "high-voltage-arc-fault-behavior"
title: "High-voltage arc fault behavior in plasma environment"
questionType: "experimentation"
priority: "critical"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-1"
sourceBOMItemSlug: "collector-units"
sourceBOMItemName: "Collector Units"
relatedBOMItems:
  - "bom-1-1"
  - "bom-1-2"
  - "bom-2-1"
tags:
  - "high-voltage"
  - "arcing"
  - "plasma"
  - "fault-protection"
createdDate: "2026-02-01"
---

## Background

The Solar Collector Unit (SCU) represents the fundamental power-generating element of the Phase 1 Dyson swarm, utilizing thin-film photovoltaic membranes to capture solar energy for conversion and transmission. The consensus design specifies high-voltage DC power systems operating at 600-1200 VDC to enable efficient power aggregation across the swarm and minimize transmission losses. However, these voltage levels present significant challenges when operating in the space plasma environment, particularly at the proposed orbital distances of 0.3-1.0 AU where solar wind density and characteristics vary substantially.

The plasma environment near the Sun consists of ionized particles from the solar wind, with densities and temperatures that increase dramatically at closer orbital distances. When high-voltage conductors are exposed to this plasma, Paschen curve breakdown behavior changes fundamentally compared to terrestrial or vacuum conditions—the presence of free charge carriers can initiate arc faults at lower voltage thresholds than predicted by pure vacuum dielectric models. This question emerges directly from the consensus document's identification of high-voltage power management as a "critical path technology development" common to all architectural variants.

## Why This Matters

Arc faults in the SCU power system represent a potential single-point failure mode that contradicts the fundamental redundancy philosophy requiring "no single-point failures" and graceful degradation under 10% component loss. An uncontrolled arc event could:

1. **Destroy individual SCUs**: Sustained arcing can vaporize thin-film conductors (at areal densities of <100 g/m²), potentially destroying units worth $154,000-$4.9M each
2. **Propagate through the mesh network**: The inter-SCU electrical links for power aggregation could transmit fault energy to adjacent units, risking cascade failures
3. **Compromise swarm formation**: Uncontrolled thrust from arc-induced outgassing or structural damage could alter unit trajectories, increasing collision probability among the 1,000+ unit formation
4. **Invalidate beamed power transmission**: Phased array coherence for microwave transmission at 2.45 GHz or 5.8 GHz requires precise power delivery; arc-induced transients could disrupt beam steering electronics

The detection and isolation response time directly determines whether a fault remains localized or propagates. Given communication latency of minutes to Earth, the FDIR systems must autonomously detect, classify, and isolate arc faults faster than thermal runaway timescales—likely requiring sub-millisecond response for detection and millisecond-scale isolation.

## Key Considerations

**Voltage and Distance Tradeoffs**: The 600-1200 VDC operating range interacts differently with plasma at each proposed orbital distance. At 0.3 AU (Gemini's preference), solar wind density is approximately 10× higher than at 1.0 AU, potentially lowering breakdown thresholds significantly. The GPT recommendation to begin at 1.0 AU may provide a more benign plasma environment for initial system validation.

**Conductor Geometry**: Thin-film architectures with areal densities of 13-85 g/m² imply extremely thin conductor traces. Sharp edges and points concentrate electric fields, reducing effective breakdown voltage. The origami-folded or roll-out deployment mechanisms may create unintended geometric features that enhance field concentration.

**Thermal Coupling**: Operating temperatures of 120-200°C (maintained via passive radiative cooling with ε > 0.9) affect both plasma sheath characteristics and conductor material properties. Arc initiation thresholds vary with temperature.

**Detection Methods**: Current sensing, optical emission detection, and RF signature monitoring each offer different response speeds and false-positive rates. The autonomous FDIR requirement demands high reliability without ground-in-the-loop confirmation.

**Isolation Architecture**: Circuit topology determines whether solid-state disconnects, fuses, or physical separation mechanisms provide adequate isolation speed without excessive mass penalty.

## Research Directions

1. **Plasma chamber testing at representative conditions**: Conduct systematic breakdown voltage characterization of candidate conductor geometries (bus bars, thin-film traces, connector interfaces) in plasma environments simulating 0.3, 0.5, and 1.0 AU solar wind conditions across the 600-1200 VDC range.

2. **Arc propagation modeling**: Develop computational models of arc initiation and propagation in thin-film conductor networks, validated against chamber test data, to establish minimum conductor spacing and isolation gap requirements.

3. **FDIR response time characterization**: Experimentally determine the thermal damage timescales for representative thin-film structures under sustained arc conditions to establish maximum allowable detection-to-isolation latency.

4. **Solid-state protection device qualification**: Evaluate candidate arc fault circuit interrupters (AFCIs) and solid-state disconnects for response time, mass, and reliability under repeated fault cycling at operating temperatures.

5. **Flight heritage review**: Analyze arc fault incidents from ISS solar arrays, commercial GEO satellites, and deep-space missions to extract empirical data on fault signatures, propagation behavior, and successful mitigation strategies applicable to SCU design.
