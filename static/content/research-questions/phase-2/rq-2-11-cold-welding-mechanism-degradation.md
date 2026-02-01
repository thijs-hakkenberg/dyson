---
questionId: "rq-2-11"
slug: "cold-welding-mechanism-degradation"
title: "Cold-welding and mechanism degradation"
questionType: "experimentation"
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
  - "cold-welding"
  - "mechanisms"
  - "lubrication"
  - "longevity"
createdDate: "2026-02-01"
---

## Background

Maintenance Drones for Phase 2 Swarm Expansion comprise a heterogeneous fleet of inspection drones (14-52 kg) and servicer drones (180-320 kg) designed for 10-15 year operational lifetimes. These systems rely extensively on mechanical interfaces: robotic manipulators with 6-7 DOF and force/torque sensing, standardized grapple points, docking mechanisms, quick-change tool couplers, and kinematic datum patterns for repeatable positioning. The consensus document specifies that all swarm elements must incorporate standardized mechanical interfaces including latches, blind-mate connectors, and ORU attachment points. Given that servicer drones will perform thousands of grapple-release cycles over their operational lifetime, and inspection drones must repeatedly dock at depots for refueling across 150-200 day patrol cycles, the long-term integrity of these mechanical systems becomes a critical reliability concern.

## Why This Matters

Cold-welding—the spontaneous bonding of clean metal surfaces in vacuum—poses an existential threat to mechanism functionality. A single seized grapple latch could strand a servicer drone attached to a satellite, potentially damaging both assets. Lubricant degradation compounds this risk: conventional hydrocarbon lubricants sublimate in vacuum, while solid lubricants (MoS₂, PTFE) degrade under repeated thermal cycling between eclipse and solar exposure.

The consequences cascade through the entire maintenance architecture:

- **Fleet availability**: If 5% of servicer drones experience mechanism failures annually, the 3,000-12,000 unit fleet loses 150-600 units per year—potentially exceeding depot refurbishment capacity
- **Mission abort rates**: Force-controlled manipulation requires predictable friction coefficients; lubricant degradation causes unpredictable torque spikes that may trigger safety shutdowns
- **Depot logistics**: Tool exchange and ORU handling at depots involve repeated mate/demate cycles on identical interface pairs, concentrating wear and cold-weld risk at critical logistics nodes
- **Cost impact**: GPT estimates robotic arms dominate servicer costs ($8-20M per MD-B unit); premature arm replacement due to mechanism degradation would significantly increase lifecycle costs

This question directly affects whether the 10-15 year design lifetime is achievable without mid-life mechanism overhauls.

## Key Considerations

**Thermal environment**: Drones operating at 0.6-1.2 AU experience thermal cycling from approximately -150°C (eclipse) to +120°C (solar exposure). If Phase 2 extends to 0.3-0.6 AU as noted in open questions, peak temperatures could exceed +200°C, accelerating lubricant outgassing and increasing cold-weld susceptibility on freshly exposed surfaces.

**Material selection tradeoffs**: Dissimilar metal pairings (e.g., titanium latches against aluminum grapple fixtures) reduce cold-weld risk but introduce galvanic corrosion concerns if any moisture is present during ground processing. Hard coatings (TiN, DLC) provide wear resistance but may spall under repeated impact loading during docking.

**Cycle counts**: Assuming servicer drones perform 2-3 ORU replacements per sortie with 60-90 day mission cycles, each manipulator experiences approximately 20-40 grapple cycles annually, or 200-600 cycles over design life. Tool couplers may see 10× higher cycle counts if tools are frequently exchanged.

**Contamination interactions**: The consensus document identifies contamination as an open question. Outgassed lubricants may deposit on optical surfaces, while plume impingement from cold-gas thrusters could recontaminate cleaned mechanism surfaces.

**Force/torque sensing requirements**: The specified force-controlled manipulation depends on consistent mechanical behavior. Stick-slip friction from degraded lubricants produces discontinuous force signatures that complicate compliant contact control algorithms.

## Research Directions

1. **Accelerated life testing of candidate mechanism assemblies**: Construct representative grapple latch and tool coupler prototypes using baseline materials (likely 17-4PH stainless, 6061-T6 aluminum, Ti-6Al-4V). Subject to 1,000+ cycles under thermal-vacuum conditions simulating 0.6 AU environment (-150°C to +150°C cycling). Measure breakaway torque evolution, surface morphology changes via SEM, and mass loss from lubricant outgassing.

2. **Lubricant trade study with heritage data mining**: Compile performance data from ISS mechanisms, Hubble servicing hardware, and commercial satellite deployment systems. Evaluate dry-film lubricants (sputtered MoS₂, ion-plated Ag), liquid lubricants (Braycote, Krytox variants), and hybrid approaches against cycle count requirements and thermal range.

3. **Surface treatment evaluation**: Test hard coatings (TiN, TiAlN, DLC) and anti-galling treatments (Tiodize, Tufram) on representative interface geometries. Quantify coating adhesion under thermal cycling and impact loading representative of docking contact velocities (specified compliant contact dynamics suggest 1-5 cm/s approach rates).

4. **Design-for-maintenance analysis**: Evaluate whether critical mechanism components can be designed as depot-replaceable ORUs themselves, allowing scheduled mechanism refurbishment at 5-year intervals rather than requiring 15-year continuous operation.

5. **In-situ monitoring instrumentation**: Develop torque signature analysis algorithms capable of detecting incipient cold-weld or lubricant degradation from force/torque sensor data, enabling predictive maintenance before mechanism seizure occurs.
