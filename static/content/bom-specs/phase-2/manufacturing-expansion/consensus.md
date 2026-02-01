---
bomId: "bom-2-3"
itemName: "Additional Manufacturing Capacity"
itemSlug: "manufacturing-expansion"
type: "consensus"
generated: "2026-02-01"
phase: "phase-2"
---

# Consensus Document: Additional Manufacturing Capacity for Phase 2 Swarm Expansion

## Key Specifications

- **Manufacturing Node Dry Mass**: All models converge on 2,400-2,500 tonnes per node (Claude: 2,400t; Gemini: 85,000t wet/dry unclear but structural frame comparable; GPT: 300-600t after build-out from 80-120t seed, scaling to similar operational mass)

- **Power Generation Requirement**: 20-50 MW electrical per manufacturing node (Claude: 50 MW peak; Gemini: 1.2 GW electric for larger facility; GPT: 20 MW continuous baseline)

- **Thermal Rejection Capacity**: 35-60 MW thermal rejection required, with radiator areas of 12,000+ m² (Claude: 35 MW/290t radiators; Gemini: 1.3 GW for larger scale; GPT: 40-60 MW with 12,000 m² radiators)

- **Self-Replication Target**: 18-24 month replication cycle with 90-94% mass closure from in-situ resources (Claude: 18 months, 94% closure; GPT: similar targets; Gemini: 20% capacity dedicated to replication)

- **Daily Metal Production**: 10-25 tonnes/day of refined structural metals per node (Claude: 10t finished product; GPT: 25t metals + 15t ceramics; Gemini: 1,200t/day feedstock consumption at larger scale)

- **Thin-Film Production**: 2,000-5,000 m²/day of collector/reflector film per node (GPT: 2,000 m²/day baseline; Gemini: 500 km²/day at full scale; Claude: 200 collectors/day at 50kg each)

- **Autonomy Level**: All models require 30+ days autonomous operation without human intervention, with multi-level control hierarchies (strategic/tactical/operational/reactive)

- **Earth-Supplied Mass Fraction**: Target <6-10% of total node mass from Earth (electronics, semiconductors, specialty catalysts) (Claude: 6%; GPT: <10%; Gemini: high-complexity components only)

- **Design Life**: 25 years operational lifetime with scheduled maintenance (Claude explicit; others implicit through reliability requirements)

## Divergent Views

- **Facility Scale Philosophy**: Claude recommends many smaller 2,400t Autonomous Manufacturing Nodes (AMNs) with replication-over-optimization strategy; Gemini prefers larger 85,000t Mobile Orbital Foundries (MOFs) with 450m length; GPT advocates modular pod-based nodes (300-600t) with standardized interfaces for incremental scaling.

- **Location Strategy**: Claude recommends Sun-Earth L4/L5 for stability and solar access; Gemini proposes stable resonant heliocentric orbits near deployment zones; GPT suggests heliocentric orbit at 0.9-1.1 AU near primary resource streams.

- **Power Architecture**: Claude specifies solar PV arrays (50 MW) with battery storage; Gemini recommends Concentrated Solar Thermal (CST) with molten salt storage (2.5 GW thermal); GPT proposes starting with PV+DC then migrating to solar-thermal Brayton as radiator mass becomes dominant.

- **Human Presence**: Claude assumes minimal human oversight with AI autonomy; Gemini explicitly questions necessity of humans (recommends skeleton crew of 6 initially, then phase out); GPT designs for fully autonomous operation from the start with no human presence assumed.

- **Primary Refining Process**: Claude emphasizes solar furnace smelting (12 MW thermal, 1,800°C) with carbothermic reduction; Gemini uses plasma separation; GPT strongly advocates Molten Oxide Electrolysis (MOE) for oxygen byproduct and electrical power compatibility.

- **Thermal Rejection Method**: Claude specifies conventional radiator panels (210t); Gemini proposes droplet radiators using liquid tin; GPT recommends two-loop system with NaK/molten salts but flags droplet radiators as high-risk due to contamination concerns.

## Open Questions

1. **Asteroid Composition Variability**: What is the actual compositional range of target asteroids, and how must processing systems adapt? All models flag this as critical for process design and yield predictions, requiring precursor missions.

2. **Silicon Purity Achievement**: Can 99.99% silicon purity be achieved with space-based zone refining for solar cell production, or will this require Earth supply? (Claude and GPT both identify this as unresolved)

3. **Thin-Film Material Selection**: Should collectors use polymer-based films (lighter, easier to handle) or inorganic films (better UV/radiation stability)? This affects swarm maintenance burden and lifetime. (GPT explicitly flags; Gemini assumes graphene-oxide substrate)

4. **Radiator Durability and Contamination**: How do radiators perform under long-term micrometeoroid bombardment and process contamination? All models identify thermal rejection as a critical bottleneck but lack validated lifetime data.

5. **Fleet Coordination at Scale**: At what fleet size (hundreds to thousands of nodes) do coordination, communication bandwidth, and software update challenges become dominant constraints? (Claude: Q9; GPT: inter-node logistics)

6. **Dust/Particulate Control in Vacuum**: Can electrostatic and mechanical dust control achieve the cleanliness levels required for thin-film production and precision mechanisms without atmospheric filtration? (GPT emphasizes as "mission-killer"; Gemini notes vacuum chamber puncture risk)

## Recommended Approach

1. **Adopt Modular, Replicable Node Architecture**: Deploy standardized manufacturing nodes in the 2,000-3,000 tonne class with pod-based subsystems and common mechanical/power/thermal/data interfaces. This enables graceful degradation, incremental scaling, and faster qualification cycles while supporting eventual self-replication.

2. **Prioritize Molten Oxide Electrolysis (MOE) for Primary Refining**: MOE avoids consumable electrodes, produces oxygen as a valuable byproduct, and scales well with solar-electric power. Supplement with solar furnace smelting for high-throughput metal production.

3. **Implement Strict Zoning for Contamination Control**: Physically separate "dirty" crushing/refining zones from "clean" thin-film and assembly zones using sealed interfaces, electrostatic precipitators, and dedicated vacuum pumping with filtration.

4. **Design for 18-Month Replication Cycle with 30% Capacity Allocation**: Each node should dedicate approximately 30% of production capacity to manufacturing components for new nodes, targeting 94% mass closure from in-situ resources. Accept efficiency trade-offs to enable exponential growth.

5. **Deploy Pathfinder/Demonstrator Mission Before Production Commitment**: Launch a 1-5 MW class orbital demonstrator that validates all key processes (crushing, MOE, vapor deposition, autonomous assembly) and retires critical technology risks before committing to full-scale production nodes.

6. **Establish Conservative Thermal Margins**: Size radiator systems with ≥30% margin above nominal requirements, use segmented/redundant radiator wings, and develop self-sealing coolant loops to address the thermal rejection bottleneck identified by all models.

7. **Invest Early in Fleet Autonomy Software and Digital Twins**: Develop the supervisory control, fault detection/isolation/recovery (FDIR), and fleet coordination software stack in parallel with hardware, using extensive simulation and digital twin models. Operations will be autonomy-limited if software lags hardware deployment.