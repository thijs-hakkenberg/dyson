---
questionId: "rq-1-51"
slug: "lunar-electromagnetic-launch-material-export"
title: "Lunar electromagnetic launch systems for material export"
questionType: "analysis"
priority: "medium"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-5"
sourceBOMItemSlug: "mass-drivers"
sourceBOMItemName: "Mass Drivers"
relatedBOMItems:
  - "bom-1-5"
  - "bom-1-6"
relatedResearchQuestions:
  - "rq-1-21"
  - "rq-1-50"
tags:
  - "Moon"
  - "mass-driver"
  - "electromagnetic-launch"
  - "material-export"
  - "alternative-sources"
arxivReferences:
  - "2106.11443"
  - "2410.09616"
createdDate: "2026-02-13"
---

## Background

Electromagnetic launch from the lunar surface is one of the oldest proposed methods for space resource utilization, dating to O'Neill's mass driver concepts in the 1970s. The Moon's low escape velocity (2.4 km/s), negligible atmosphere, and abundant surface materials make it an ideal candidate for electromagnetic catapult systems. Two recent papers advance this concept: one analyzing electromagnetic launch system architectures for lunar export (arxiv:2106.11443), and another evaluating advanced coilgun designs for space resource applications (arxiv:2410.09616).

Project Dyson already includes mass drivers as a Phase 1 BOM item (bom-1-5), but the consensus design focuses on asteroid-to-orbit applications. Lunar mass drivers face different engineering constraints: higher gravity (1.62 m/s²) requiring greater acceleration, but stable foundations, abundant solar power, and well-characterized trajectories to collection points at Earth-Moon Lagrange points or heliocentric transfer orbits.

This question examines the specific engineering requirements and economics of lunar electromagnetic launch as the export mechanism for a lunar feedstock supply chain, complementing rq-1-50's analysis of regolith processing.

## Why This Matters

The viability of the Moon as a feedstock source depends critically on the cost and throughput of material export:

**Cost per Kilogram**: Electromagnetic launch is propellantless, with marginal launch costs dominated by electrical energy. At lunar solar power costs, this could achieve <$10/kg to escape velocity, compared to $100-1,000/kg for chemical propulsion. The infrastructure capital cost must be amortized over total throughput to determine true cost-effectiveness.

**Throughput Scaling**: Mass drivers scale linearly with track length and power input. A 1 km track could achieve 1,000+ launches per day at modest acceleration loads (<50g for bulk materials), potentially exporting millions of tonnes per year from a single installation.

**Synergy with BOM-1-5**: The mass driver technology developed for asteroid applications (bom-1-5) shares core electromagnetic accelerator technology with lunar launchers. Engineering development can serve both applications, reducing per-application costs.

**Catcher System Requirements**: Launched payloads must be captured at the destination. Options include L2 catch stations, solar-sail-equipped payloads that navigate to destination, or direct injection into heliocentric transfer orbits with rendezvous at the construction site.

## Key Considerations

- **Acceleration Limits**: Bulk raw materials (regolith, metal ingots) can withstand high acceleration (100g+), enabling shorter tracks. Processed components (PV cells, electronics) require gentler acceleration (<10g), requiring longer tracks or separate transport.

- **Track Alignment and Aiming**: The Moon's surface is curved; long tracks must account for curvature. The track must be aimed precisely to hit catch basins at L1/L2 or inject into transfer orbits. Azimuth and elevation adjustment mechanisms add complexity.

- **Power Requirements**: Launching a 10 kg payload to escape velocity at 50g acceleration requires ~290 kJ per launch over ~5 seconds, or ~58 kW average power. At 1,000 launches/day, this requires ~2.4 MW of continuous power generation capacity with energy storage for burst delivery.

- **Dust and Wear**: Electromagnetic track components operating in the lunar dust environment face abrasion and contamination. Sealed linear motor designs may be necessary, adding mass and complexity.

- **Orbital Mechanics Integration**: Launched payloads have fixed velocity vectors determined by track orientation and timing. Trajectory design must match launch windows to desired destination orbits, potentially limiting launch rate during unfavorable geometric periods.

## Research Directions

1. **Lunar Mass Driver Design Point**: Define a reference design for a lunar electromagnetic launcher optimized for bulk material export (10-100 kg payloads, 2.4+ km/s muzzle velocity, 50g acceleration). Estimate mass, power, track length, and construction requirements.

2. **Export Cost Model**: Calculate $/kg delivered to 1 AU construction zone as a function of: launcher capital cost, solar power system cost, annual throughput, maintenance cadence, and catcher system infrastructure. Compare against asteroid ISRU delivery costs from rq-1-21.

3. **Catcher Architecture Trade Study**: Evaluate catch/collection options for electromagnetically launched payloads: L2 accumulation depot, autonomous payload maneuvering (small propulsion added to each payload), or direct heliocentric injection with construction-site rendezvous.

4. **Track Siting Optimization**: Analyze optimal lunar surface locations considering: solar illumination (polar rim vs. equatorial), line-of-sight to target orbits, proximity to processing facilities (rq-1-50), and terrain suitability for track construction.

5. **Technology Heritage Assessment**: Review current terrestrial electromagnetic launch developments (EMALS, railgun programs) and assess technology readiness for adaptation to lunar conditions. Identify the critical technology gaps requiring pre-Phase-1 demonstration.
