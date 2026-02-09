---
bomId: "bom-1-7"
itemName: "Swarm Control System"
itemSlug: "swarm-control-system"
type: "consensus"
generated: "2026-02-01"
phase: "phase-1"
---

# Swarm Control System - Consensus Technical Specification
## Phase 1 - Initial Swarm Deployment

---

## Key Specifications

All three models converge on the following technical parameters:

- **Hierarchical Architecture**: All models agree on a tiered control structure with individual satellites/nodes at the base, intermediate cluster/group coordination, and a top-level swarm/beacon authority layer—rejecting both pure centralization and pure decentralization.

- **Node Control Unit Mass**: 0.45–2.1 kg per satellite for the control/compute/comm subsystem (Claude: 2.1 kg full SCU; Gemini: 0.45 kg; GPT: 0.45 kg), with consensus that the target should be <2.5 kg.

- **Node Power Consumption**: 1.2–15 W nominal, 8–45 W peak across models, with agreement that average power should remain under 20 W for scalability.

- **Radiation-Hardened Processing**: All specify rad-tolerant processors (RISC-V preferred by Claude and Gemini; ARM+FPGA acceptable per GPT) with ECC memory (512 MB–4 GB nonvolatile storage).

- **Optical Inter-Satellite Links**: All models recommend 1550 nm laser communication for high-bandwidth backbone links, with data rates of 1–100 Gbps depending on tier/range.

- **Collision Avoidance Requirement**: Target collision probability <10⁻⁶ per node-year (Claude targets 10⁻¹², Gemini and GPT target 10⁻⁶), with multi-layer avoidance (predictive + reactive + emergency).

- **Autonomous Operation**: All models require nodes to survive 7–30+ days without ground contact, with local collision avoidance executed without human-in-the-loop.

- **Time Synchronization**: Agreement on ≤10 ms swarm-wide time sync using OCXO or chip-scale atomic clocks disciplined by a central time authority.

- **Cluster Size**: Approximately 100 satellites per logical cluster/group for intermediate coordination (Claude: 100; Gemini: 100; GPT: implicit in beacon coverage).

- **Formally Verified Software Kernel**: All models recommend seL4 or equivalent mathematically verified RTOS for safety-critical functions.

---

## Divergent Views

- **Phase 1 Swarm Size**: Claude proposes 10,000 satellites at 0.5 AU; Gemini proposes 10,000 units at 0.9 AU; GPT recommends starting with 1,000 nodes near 1 AU to prove scalability before expansion.

- **Primary Communication Method (Node-to-Node)**: Claude specifies optical ISL (1550 nm laser) as primary for all tiers; Gemini recommends 60 GHz V-band RF for intra-cluster with optical only for cluster-to-keeper; GPT prefers S-band/UHF baseline with optical deferred to Phase 1.5.

- **Central Coordination Asset**: Claude distributes coordination across 12 gateway satellites with no single hub; Gemini proposes a dedicated "Swarm Keeper" station at L1 or co-orbital; GPT recommends 3–5 "Beacon/Relay" spacecraft as time/catalog authorities.

- **Navigation Approach**: Claude relies on inter-satellite optical ranging (±1 m) plus stellar/solar sensors with Earth-based DSN calibration; Gemini uses star trackers + IMU with no inter-satellite ranging (optical flow via cameras instead); GPT uses beacon radiometric ranging + EKF with position knowledge of ≤5 km along-track.

- **Manufacturing Philosophy**: Claude specifies full rad-hard components (100 krad tolerance) with 50-year MTBF; Gemini advocates automotive-grade (AEC-Q100) with spot shielding, accepting 2–3% annual failure rate; GPT takes a middle path with COTS + radiation characterization and selective hardening.

- **Station-Keeping Propulsion**: Claude recommends hybrid solar sail + ion propulsion (~62 m/s/year budget); Gemini questions whether solar radiation pressure alone provides sufficient control authority; GPT specifies 0.5–5 m/s/year via sail trim or microprop, favoring minimal propellant.

---

## Open Questions

1. **Propulsion/Actuation Authority**: Can solar radiation pressure trimming alone provide sufficient control bandwidth for collision avoidance and slot-keeping, or is dedicated propulsion (cold gas, ion) required? What is the minimum ΔV budget per year?

2. **Optical Surface Degradation**: At what rate do micrometeoroid impacts degrade laser communication lens performance, and when does bit error rate become unsustainable—requiring fallback to RF?

3. **Cluster Coordinator Duty Cycle**: How frequently should the coordinator role rotate within a cluster to balance power consumption, data transfer overhead, and single-point-of-failure risk?

4. **Slot Reallocation Governance**: When a node fails or drifts out of its assigned orbital slot, what is the protocol for reassigning slots to prevent cascading conflicts or density violations?

5. **Software Update Strategy at Scale**: How do we safely deploy delta updates to thousands of nodes with rollback capability, preventing mass bricking from a faulty patch?

6. **End-of-Life Disposal**: What is the passivation and disposal protocol for failed nodes in heliocentric orbit—drift to "graveyard" bands, controlled deorbit, or acceptance of debris persistence?

---

## Resolved Architecture Decisions

### Heterogeneous Hierarchical Architecture: Shepherd/Flock Model (rq-1-24)

**Decision**: Adopt a two-class heterogeneous spacecraft system with dedicated "Shepherd" coordinators and mass-optimized "Flock" collector units.

**Rationale** (from unanimous multi-model consensus, 2026-02-08):
- Simulation data definitively ruled out centralized control (bottlenecked at ~10,000 nodes) and pure mesh topologies (prohibitive overhead beyond ~100,000 nodes)
- Hierarchical approach scales to **1,000,000+ nodes with only 2–8% communication overhead**—an order of magnitude better than mesh alternatives
- Equipping every collector with coordinator-capable hardware imposes unacceptable mass penalty at scale; concentrating compute into dedicated Shepherds keeps collector units simple

**Architecture Specifications**:

| Component | Specification |
|-----------|---------------|
| Shepherd:Flock ratio | 1:1,000–5,000 |
| Shepherd capabilities | High-gain comms, edge GPU, collision avoidance for sector, larger propellant reserves |
| Flock unit design | Mass-optimized collector, minimal compute, heartbeat-only telemetry |
| Cluster membership | Dynamic spatial partitioning (octree/voxel), units hand over between Shepherds |
| Telemetry model | Exception-based ("silence by default")—nominal units transmit only heartbeats |
| Collision avoidance | Computed per-sector by Shepherd; O(1) complexity vs swarm size |

**Key Architectural Principles**:
1. **Dynamic spatial partitioning** replaces static clustering—accounts for orbital drift
2. **Exception-based telemetry** reduces aggregate bandwidth by ~100× vs full telemetry streams
3. **ANH commands Shepherds, not units**—workload stays constant as swarm grows (20–200 Shepherds)
4. **Collision avoidance is spatially decomposed**—each Shepherd handles only its sector plus buffer zone

**Development Requirements**:
1. Define Shepherd spacecraft specification (SWaP, compute, comms suite, propellant budget)
2. Benchmark spatial partitioning algorithms (octree vs k-d tree vs S2-geometry) under realistic orbital conditions
3. Prototype exception-based telemetry protocol at 10⁵, 10⁶, 10⁷ unit scales
4. Conduct Shepherd failure mode and recovery analysis for correlated failures

---

## Recommended Approach

1. **Adopt Heterogeneous Shepherd/Flock Architecture**: Deploy dedicated Shepherd coordinator spacecraft at 1:1,000–5,000 ratio managing mass-optimized Flock collector units (see resolved decision above). This replaces the previous rotating-coordinator model.

2. **Use Dynamic Spatial Partitioning**: Define cluster membership by physical volume (octree/voxel grid in orbital space), with units handing over between Shepherds as they traverse sectors. Static clustering breaks within months due to orbital perturbations.

3. **Implement Exception-Based Telemetry**: Nominal units transmit only periodic heartbeat chirps; Shepherds aggregate and summarize for ANH. Full telemetry streams opened only on fault detection.

4. **Start with 1,000–3,000 Nodes for Phase 1**: Begin at the lower end of proposed swarm sizes to validate the Shepherd/Flock model before scaling to 10,000+. Use this phase to retire coordination and autonomy risks.

5. **Use Hybrid Communication**: Deploy S-band/UHF for Flock-to-Shepherd links (robust, simple), with optical ISL for Shepherd-to-Shepherd backbone and ANH links.

6. **Design for Graceful Degradation**: Maintain 200% signal overlap between adjacent Shepherd sectors for seamless handover on Shepherd failure. Nodes must survive 30 days in passive safe mode if orphaned.

7. **Invest Heavily in Simulation and Hardware-in-the-Loop Testing**: Build a 10,000+ node software simulation with Monte Carlo error injection before flight. Validate Shepherd failure recovery and sector handover logic.

8. **Formally Verify Safety-Critical Software**: Use seL4 or equivalent verified microkernel for the safety envelope. Limit maneuver authority in software to prevent runaway thrust commands.