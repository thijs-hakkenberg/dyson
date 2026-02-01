---
bomId: "bom-1-4"
itemName: "Assembly Node Hub"
itemSlug: "assembly-node"
type: "consensus"
generated: "2026-02-01"
phase: "phase-1"
---

# Assembly Node Hub - Phase 1 Consensus Technical Specifications

## Key Specifications

All models agree on the following core specifications:

- **Design Philosophy**: Modular, serviceable architecture with standardized interfaces enabling pallet/module replacement without full system shutdown; autonomy-first operations with ground providing supervisory oversight only
- **Operational Location**: Heliocentric orbit in the 0.7–1.0 AU range (Claude specifies Sun-Earth L1 halo orbit; GPT recommends ~1 AU corridor) for continuous solar access and manageable thermal/communications environment
- **Crew Configuration**: Fully autonomous robotic operations (0 permanent crew) with provisions for periodic human maintenance visits (Claude specifies 12-person capacity for visits)
- **Power Architecture**: High-voltage DC primary bus (1,000–10,000 VDC) to minimize conductor mass, with MW-class solar photovoltaic generation (1.5–2.8 GW range depending on production targets)
- **Thermal Management**: Waste heat rejection is the primary throughput-limiting constraint; multi-thousand m² radiator arrays required (Claude: 400m span radiators; GPT: 2,800–4,000 m² effective area at 350–400K)
- **Manufacturing Approach**: Phase 1 uses semi-processed/pre-fabricated feedstock rather than raw asteroid material processing; in-space metallurgy deferred to later phases
- **Robotic Assembly**: Multiple redundant robotic arms with tool-changing capability; parallel assembly cells/lines to achieve throughput targets (Claude: 4 parallel lines; GPT: 2 parallel cells)
- **Interface Standardization**: Single mechanical docking standard, unified power bus voltage, common data protocol across all modules and pallets
- **Design Life**: 10–50 years with continuous upgrade capability through modular replacement

## Divergent Views

- **Production Rate Targets**: Claude recommends 1,000 collector units/day (100 m² each, 14 kW output) within 24 months of IOC; GPT targets ~50 tiles/month (100 m² each, 20 kW output), approximately 1 MW equivalent monthly—a difference of roughly 600× in unit throughput
- **Total Hub Mass**: Claude proposes 45,000 metric tons for a mature distributed cluster; GPT specifies ~150,000 kg (150 metric tons) for a single modular hub—a 300× difference reflecting fundamentally different scale assumptions
- **Architecture Configuration**: Claude advocates a distributed cluster of specialized modules at 1–10 km separation connected by autonomous transfer vehicles; GPT recommends a single integrated modular hub with swappable pallets on a central truss spine
- **Power Generation Scale**: Claude specifies 2.5 GW peak / 1.8 GW continuous for the full cluster; GPT recommends 1.5 MW BOL at 1 AU—a ~1,000× difference tied to production rate assumptions
- **Collector Unit Design**: Claude specifies thin-film CIGS cells at 22% efficiency, 0.15 kg/m² areal density, 25-year life with solar sail + ion thruster stationkeeping; GPT proposes 10m × 10m membrane tiles with integrated conductors, edge stiffeners, and 20% efficiency with 0.75 system derate
- **Program Cost Estimates**: GPT provides detailed ROM of $15–18B for Phase 1 through 10 years operations; Claude does not provide cost figures, focusing on technical specifications only

## Open Questions

1. **Tile Architecture Selection**: Membrane tiles (lightweight, high area, complex handling) versus semi-rigid panels (easier handling, heavier mass)—what is the optimal trade for Phase 1 given robotic handling constraints and deployment requirements?

2. **Power Transmission Strategy**: Do Phase 1 swarm elements export power via laser/microwave beaming, or is initial deployment focused solely on power generation with telemetry, deferring transmission infrastructure to later phases?

3. **Feedstock Preprocessing Level**: What fraction of feedstock arrives pre-processed from Earth versus requiring in-situ refinement from asteroid sources? How does this ratio evolve through Phase 1?

4. **Radiation-Tolerant Autonomy Compute**: Should the program invest in fully rad-hardened computing for 10+ year life, or accept modular compute pallet replacement every 3–5 years as a maintenance item?

5. **Quality Assurance Philosophy**: 100% inspection of all units versus statistical sampling—what is the acceptable defect rate for early swarm deployment, and how does QA throughput constrain production rate?

6. **Orbital Debris and Traffic Management**: How do thousands to millions of deployed swarm elements coordinate stationkeeping, collision avoidance, and decommissioning without creating cascading debris hazards?

## Recommended Approach

1. **Adopt Modular Pallet Architecture**: Begin with GPT's single-hub modular pallet approach for Phase 1A/1B demonstrator missions, with standardized 1.5m × 2.5m pallet footprints and blind-mate connectors, enabling evolution toward Claude's distributed cluster architecture as production scales

2. **Size to Thermal Constraints First**: Design radiator area as the primary sizing parameter (target 4,000+ m² effective area), then scale power generation and manufacturing throughput to match thermal rejection capacity rather than optimizing for peak production rate

3. **Implement Phased Production Ramp**: Start with GPT's conservative 1 MW/month equivalent target for initial operations, with architecture designed to scale toward Claude's 1,000 units/day through modular expansion of assembly cells, radiators, and power generation

4. **Standardize Collector Unit Design**: Converge on ~100 m² thin-film membrane tiles with stiffened edges as the baseline swarm element, targeting 15–20% system-level efficiency at 1 AU, with standardized mechanical/electrical interfaces enabling mixed-source manufacturing in later phases

5. **Deploy Orbital Demonstrator First**: Execute GPT's Phase 1B approach—a 1/5 scale demonstrator (ANH-D) with 200 kW power and single assembly cell producing 20–50 tiles—before committing to full-scale ANH-1 construction

6. **Maintain Earth-Processed Feedstock for Phase 1**: Use pre-fabricated solar cell rolls, metal coil/strip, and packaged electronics from Earth supply chain; limit in-space manufacturing to brackets, stiffeners, and replacement parts until asteroid processing infrastructure matures

7. **Design for Graceful Degradation**: Implement Claude's fail-operational philosophy requiring >50% capability retention with loss of any single component; achieve through parallel assembly lines, redundant robotic arms, and sectionalized power/thermal buses