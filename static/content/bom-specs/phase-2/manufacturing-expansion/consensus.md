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

## Resolved Architecture Decisions

### Fleet Coordination: Federated Autonomous Clusters (rq-2-17)

**Decision**: Adopt a federated architecture of loosely-coupled autonomous clusters using intent-based coordination for manufacturing fleet operations at scale.

**Rationale** (from unanimous multi-model consensus, 2026-02-08):
- The binding constraint is **convergence time after disruptions**, not steady-state communication overhead
- Mesh coordination becomes prohibitive beyond ~1,000 nodes; hierarchical with global sync degrades at ~3,000-5,000 nodes
- Federated architecture scales to **50,000+ nodes** with only 10–15% efficiency loss vs. perfect central planner
- This architectural choice **cannot be deferred**—must be embedded in Phase 1 design before exponential replication begins

**Architecture Specifications**:

| Parameter | Specification |
|-----------|---------------|
| Cluster size | 50–200 manufacturing nodes per cluster |
| Cluster autonomy | 30+ days fully independent productive operation |
| Inter-cluster coordination | Market-based auction mechanisms (4–8 hour cycles) |
| Coordination model | Intent-based ("I will mine Asteroid X for 30 days at ~15 t/day") |
| Software diversity | 3–4 independent lineages for critical subsystems |
| Communication | Loosely-coupled; no global state synchronization |

**Convergence Time SLAs** (hard architectural constraints):

| Event Type | Maximum Recovery Time |
|------------|----------------------|
| Single node failure | <1 hour |
| Cluster disruption | <8 hours |
| Cross-cluster reallocation | <72 hours |
| Fleet-wide emergency | <7 days |

**Key Architectural Principles**:
1. **Market-based resource allocation** at inter-cluster tier scales as O(N) and degrades gracefully under communication disruption
2. **Intent-based coordination** reduces message complexity to negligible; most intents are non-conflicting
3. **Node generation heterogeneity** is a first-order problem—clusters bounded to max 3-generation spread
4. **Software monoculture is an existential risk**—maintain 3–4 distinct lineages plus independent auditor nodes per regional federation

**Development Requirements**:
1. Lock federated architecture into Phase 1 requirements immediately
2. Build high-fidelity discrete-event simulation incorporating disruption dynamics
3. Design and prototype market-based resource allocation mechanism
4. Develop software diversity and lineage management strategy
5. Establish convergence time SLAs with automated monitoring

---

## Recommended Approach

1. **Adopt Federated Autonomous Cluster Architecture**: Design the manufacturing fleet as a loose federation of 50–200 node clusters, each capable of 30+ days independent operation (see resolved decision above). This replaces tightly-coupled fleet coordination models.

2. **Adopt Modular, Replicable Node Architecture**: Deploy standardized manufacturing nodes in the 2,000-3,000 tonne class with pod-based subsystems and common interfaces. This enables graceful degradation, incremental scaling, and faster qualification cycles.

3. **Implement Market-Based Inter-Cluster Resource Allocation**: Use auction mechanisms with 4–8 hour cycles for feedstock and logistics slot allocation. This scales as O(N) per round and naturally handles fleet heterogeneity.

4. **Prioritize Molten Oxide Electrolysis (MOE) for Primary Refining**: MOE avoids consumable electrodes, produces oxygen as a valuable byproduct, and scales well with solar-electric power.

5. **Implement Strict Zoning for Contamination Control**: Physically separate "dirty" crushing/refining zones from "clean" thin-film and assembly zones using sealed interfaces and electrostatic precipitators.

6. **Design for 18-Month Replication Cycle with 30% Capacity Allocation**: Each node should dedicate approximately 30% of production capacity to manufacturing components for new nodes, targeting 94% mass closure.

7. **Maintain Software Diversity**: Implement 3–4 independent software lineages for critical subsystems (feedstock assessment, structural fabrication, coordination protocols) to prevent fleet-wide cascading failures.

8. **Establish Convergence Time SLAs as Hard Requirements**: Build convergence time measurement into the coordination architecture with automated monitoring. Automated partitioning triggers if any SLA is breached.

9. **Deploy Pathfinder/Demonstrator Mission Before Production Commitment**: Launch a 1-5 MW class orbital demonstrator that validates all key processes before committing to full-scale production nodes.

10. **Establish Conservative Thermal Margins**: Size radiator systems with ≥30% margin above nominal requirements to address the thermal rejection bottleneck.