---
questionId: "rq-2-18"
slug: "vacuum-dust-particulate-control"
title: "Vacuum dust/particulate control for manufacturing"
questionType: "experimentation"
priority: "critical"
status: "open"
sourcePhase: "phase-2"
sourceBOMItemId: "bom-2-3"
sourceBOMItemSlug: "manufacturing-expansion"
sourceBOMItemName: "Manufacturing Expansion"
relatedBOMItems:
  - "bom-2-3"
  - "bom-1-4"
tags:
  - "dust-control"
  - "vacuum"
  - "cleanliness"
  - "manufacturing"
createdDate: "2026-02-01"
---

## Background

The Manufacturing Expansion BOM item specifies autonomous manufacturing nodes producing 10-25 tonnes/day of refined structural metals and 2,000-5,000 m²/day of thin-film collector material. These operations span an extreme cleanliness gradient—from raw asteroid crushing and thermal processing at 1,800°C to precision thin-film vapor deposition requiring near-semiconductor-grade environments. The consensus document explicitly identifies dust and particulate control as a potential "mission-killer" (GPT assessment) and notes vacuum chamber puncture risk from uncontrolled debris (Gemini). Unlike terrestrial manufacturing, these nodes cannot rely on atmospheric filtration, HEPA systems, or positive-pressure cleanrooms. All particulate management must occur in hard vacuum across facilities with 25-year design lives.

## Why This Matters

Thin-film solar collectors represent the primary output enabling swarm expansion. Contamination of vapor deposition surfaces or substrate handling systems directly degrades collector efficiency and lifetime. A 1% reduction in collector optical performance across the swarm compounds into massive energy losses at scale. More critically, particulate intrusion into precision mechanisms—robotic actuators, optical alignment systems, and sealed bearings—accelerates wear and triggers failure cascades that autonomous repair systems may not address within the 30-day unattended operation requirement.

The consensus recommends strict zoning with sealed interfaces between "dirty" and "clean" zones, but this architectural approach requires validated engineering solutions. If electrostatic and mechanical dust control cannot achieve required cleanliness levels, the project faces three unpalatable options: accept degraded collector performance and shortened component lifetimes, dramatically increase Earth-supplied mass fraction beyond the 6-10% target by importing pre-fabricated clean components, or redesign the manufacturing architecture entirely—potentially abandoning co-located refining and fabrication.

Dependencies include thermal system reliability (radiator contamination affects the 35-60 MW rejection capacity), self-replication feasibility (94% mass closure requires on-site thin-film production), and fleet scaling (coordination challenges at hundreds of nodes multiply if contamination-induced failures increase maintenance burden).

## Key Considerations

**Particulate Sources and Characteristics**: Asteroid crushing generates particles from sub-micron fines to millimeter-scale fragments. Solar furnace smelting at 1,800°C produces metal vapor condensates and oxide particulates. Molten Oxide Electrolysis generates aerosolized slag. Each source has distinct particle size distributions, electrostatic properties, and chemical compositions affecting control strategies.

**Vacuum Behavior**: Without atmospheric drag, particles follow ballistic trajectories indefinitely. Electrostatic charging from solar UV and plasma environments causes particles to adhere to surfaces unpredictably. Outgassing from thermal processes creates transient local pressure gradients that can transport contaminants across zones.

**Cleanliness Requirements**: Thin-film deposition typically requires Class 100 (ISO 5) or better equivalent conditions. Precision mechanisms need Class 1000 (ISO 6) environments. Quantifying achievable cleanliness in vacuum manufacturing environments without terrestrial analogs remains unresolved.

**Control Technologies**: Candidate approaches include electrostatic precipitators (effective for charged particles, less so for neutrals), mechanical baffles and labyrinth seals (mass penalty, wear surfaces), dedicated vacuum pumping with cold traps (power and thermal load), magnetic separation (ferrous materials only), and physical airlocks with sacrificial getter surfaces.

**Mass and Power Budget**: The consensus allocates 12,000+ m² radiator area for thermal rejection. Contamination control systems compete for mass allocation within the 2,400-2,500 tonne node budget and power allocation within the 20-50 MW electrical envelope.

## Research Directions

1. **Characterize Particulate Generation Rates**: Conduct laboratory crushing and thermal processing experiments on meteorite analog materials under vacuum conditions. Measure particle size distributions, generation rates per tonne processed, and electrostatic charge states. Establish baseline contamination flux values for facility design.

2. **Evaluate Electrostatic Precipitation Effectiveness**: Test multi-stage electrostatic precipitator designs against characterized particle populations in vacuum chambers. Determine capture efficiency as a function of particle size, charge state, and precipitator geometry. Quantify power consumption and electrode maintenance requirements over simulated operational cycles.

3. **Prototype Zonal Isolation Interfaces**: Design and test sealed transfer mechanisms (material airlocks, robotic handoff systems) that maintain cleanliness gradients while enabling continuous material flow. Measure particle transmission rates across interfaces under realistic throughput conditions (10-25 tonnes/day equivalent).

4. **Validate Thin-Film Process Tolerance**: Determine actual contamination sensitivity of candidate thin-film deposition processes (vapor deposition, sputtering) by introducing controlled particulate levels. Establish pass/fail cleanliness thresholds rather than assuming terrestrial cleanroom standards apply.

5. **Develop Integrated Contamination Model**: Create computational models linking particulate generation, transport physics in vacuum, control system performance, and downstream impacts on collector efficiency and mechanism lifetime. Use this model to optimize zoning architecture and control system sizing within mass/power constraints.
