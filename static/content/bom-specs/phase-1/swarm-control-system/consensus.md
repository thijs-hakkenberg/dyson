---
bomId: "bom-1-7"
itemName: "Swarm Control System"
itemSlug: "swarm-control-system"
type: "consensus"
generated: "2026-02-01"
phase: "phase-1"
---

# Swarm Control System - Synthesized Technical Specifications
## Phase 1 - Initial Swarm Deployment

---

## Key Specifications

All models agree on the following core specifications:

- **Hierarchical/Distributed Architecture**: Control system uses tiered autonomy with local satellite decision-making for safety-critical functions (collision avoidance) and higher-level coordination for optimization, avoiding centralized single points of failure.

- **Collision Avoidance Latency**: Autonomous onboard collision detection and avoidance must execute within <60 seconds of threat confirmation, with detection screening at 1 Hz or better.

- **Radiation-Hardened Computing**: Node processors require radiation tolerance of 50-100 krad TID minimum, with ECC memory, watchdog timers, and fault-tolerant architectures (lockstep cores or TMR).

- **Time Synchronization**: Swarm-wide time sync accuracy of ≤10 ms (1σ) required for coordination, TDMA scheduling, and ephemeris consistency; achieved via disciplined oscillators (OCXO or CSAC) synchronized to beacon/nexus broadcasts.

- **Position Knowledge Requirements**: Along-track position uncertainty ≤5 km (1σ), cross-track/radial ≤2 km (1σ), achieved through radiometric ranging, solar/stellar attitude determination, and dynamics modeling.

- **Communication Architecture**: Beacon/relay assets provide time authority, ephemeris bulletins, and store-and-forward capability; nodes communicate via scheduled TDMA windows rather than continuous mesh.

- **Node Autonomy Duration**: Individual satellites must survive and operate safely for 30+ days without ground or beacon contact, maintaining safe separation and basic functions.

- **Graceful Degradation**: No single node or relay failure should degrade overall swarm performance by more than 0.1%; system designed for eventual consistency rather than strong consistency.

---

## Divergent Views

- **Initial Swarm Size**: Claude recommends 10,000-100,000 satellites for Phase 1 to demonstrate meaningful scale; GPT suggests 1,000 nodes as minimum viable for proving scalable deployment and control.

- **Cluster Organization**: Claude proposes formal cluster hierarchy with ~100 satellites per cluster and elected cluster heads with enhanced capabilities (+50 kg, 2x compute); GPT treats the swarm as a "statistical constellation" without rigid cluster structures, using beacon-centric coordination instead.

- **Coordination Infrastructure**: Claude specifies 4 dedicated Nexus stations at Lagrange points (Earth L4/L5, Venus L4, Mars L5) with 5m dishes and 100 Gbps optical terminals; GPT recommends 3-5 smaller Beacon/Relay spacecraft (35-60 kg each, ESPA-class) with simpler S/X-band communications.

- **Node Computing Power**: Claude specifies 500 MHz quad-core RISC-V with 512 MB RAM and 2 TOPS neural accelerator at 15-25W; GPT recommends 2-10 GFLOPS equivalent MCU/SoC with 512 MB RAM at 2.5-12W, prioritizing simplicity and manufacturability.

- **Communication Bandwidth**: Claude designs for 1-10 Gbps optical crosslinks between satellites; GPT explicitly recommends deferring optical crosslinks to Phase 1.5, using only S-band/UHF at 1-10 kb/day per node for Phase 1.

- **Control Philosophy**: Claude emphasizes "swarm as ecosystem" with emergent behavior management and formation maintenance; GPT advocates "ephemeris governance" treating nodes as independent agents with assigned orbital slots and keep-out tubes rather than formation flying.

---

## Open Questions

1. **Node Actuation Method**: Is station-keeping achieved via solar radiation pressure (SRP) trim only, or does each node require micropropulsion? This fundamentally affects control bandwidth, ΔV budget (0.5-10 m/s/year), and collision avoidance response time.

2. **Ranging and Navigation Method Selection**: Two-way S-band ranging to beacons vs. time-difference-of-arrival with multiple beacons vs. inter-satellite ranging—each approach has different implications for power, antenna pointing requirements, and achievable accuracy.

3. **Minimum Safe Spacing Policy**: What node density and separation distance is acceptable for Phase 1? Claude suggests ~50,000 km mean separation; GPT implies tighter spacing is possible with robust conjunction screening. Conservative spacing simplifies control but reduces collection efficiency.

4. **Slot Ownership and Reallocation Governance**: How are orbital slots reassigned when nodes fail, drift, or are decommissioned? Requires robust policy to prevent cascading conflicts and maintain swarm integrity over decades.

5. **Software Update Strategy at Scale**: How to safely deploy delta updates, signed images, and rollback capability across thousands to millions of nodes without risking mass failures or security vulnerabilities.

6. **End-of-Life and Disposal Protocol**: What is the passivation and disposal plan for failed nodes in heliocentric orbit? Drift to designated "graveyard" bands, or accept debris accumulation at operational altitudes?

---

## Recommended Approach

1. **Adopt Tiered Autonomy Architecture**: Implement three-tier control (satellite/cluster/swarm or node/beacon/ground) with strict subsidiarity—collision avoidance decisions made locally within 60 seconds, regional coordination at minute-to-hour timescales, global optimization at day-to-week timescales.

2. **Start with Conservative Beacon-Centric Design**: Deploy 3 beacon/relay spacecraft initially (scalable to 5+) providing time authority, ephemeris bulletins, and store-and-forward. Defer dedicated Nexus stations and optical crosslinks until Phase 2 when swarm exceeds 10,000 nodes.

3. **Design for Statistical Constellation, Not Formation Flying**: Assign each node an orbital element set with keep-out tubes and mean anomaly windows rather than rigid formation geometry. Use "ephemeris governance" with periodic global optimization nudges rather than continuous tight formation control.

4. **Prioritize Manufacturability Over Performance**: Select COTS-derived, radiation-characterized components over full rad-hard where possible. Target node SCS mass <0.5 kg, power <15W average, and unit cost <$2,000 at 1,000+ quantity to enable scaling.

5. **Implement Robust Safety Kernel**: Develop formally verified safety-critical software for collision avoidance and safe-mode behavior. Limit autonomous maneuver authority (ΔV <1 m/s without coordination) and enforce safety envelopes on all commanded actions.

6. **Build Comprehensive Simulation Infrastructure Early**: Invest in Monte Carlo simulation (10,000+ node swarms) and hardware-in-loop testbeds before flight hardware. Validate time sync, TDMA scheduling, conjunction screening, and emergent behavior under degraded conditions.

7. **Plan Incremental Scaling Milestones**: Target 10-node orbital demonstration (TRL 6) at month 18, 200-node pre-production validation (TRL 7) at month 28, and 1,000-node Phase 1 operational capability (TRL 8) at month 36, with architecture designed to scale to 100,000+ nodes without fundamental redesign.