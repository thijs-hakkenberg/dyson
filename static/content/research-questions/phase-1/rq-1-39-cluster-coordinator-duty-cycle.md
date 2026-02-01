---
questionId: "rq-1-39"
slug: "cluster-coordinator-duty-cycle"
title: "Cluster coordinator rotation duty cycle"
questionType: "simulation"
priority: "medium"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-7"
sourceBOMItemSlug: "swarm-control-system"
sourceBOMItemName: "Swarm Control System"
relatedBOMItems:
  - "bom-1-7"
tags:
  - "coordination"
  - "duty-cycle"
  - "redundancy"
createdDate: "2026-02-01"
---

## Background

The Swarm Control System employs a three-tier federated architecture where approximately 100 satellites form logical clusters at the intermediate coordination level (Tier 2). Within each cluster, a designated coordinator node assumes elevated responsibilities: aggregating local state information, facilitating intra-cluster communication routing, performing conjunction screening for cluster members, and interfacing with the Tier 3 beacon/relay spacecraft. The consensus document explicitly recommends "cluster-level coordination with rotating coordinators" but leaves the rotation duty cycle as an open question, noting uncertainty about "how frequently should the coordinator role rotate within a cluster to balance power consumption, data transfer overhead, and single-point-of-failure risk."

This question arises because coordinator nodes operate under different power and thermal regimes than standard nodes. While baseline node power consumption ranges from 1.2–15 W nominal, coordinator functions—including increased communication activity, catalog maintenance, and inter-tier relay duties—likely push consumption toward or beyond the 20 W scalability threshold. The rotation mechanism must be characterized through simulation before flight validation.

## Why This Matters

The coordinator rotation duty cycle directly impacts three critical system properties:

**Power Budget Sustainability**: If rotation occurs too infrequently, coordinator nodes will deplete energy reserves faster than peers, creating premature failures in otherwise healthy hardware. With the consensus targeting 1–3% annual node failure rate using automotive-grade components, uneven power loading could concentrate failures among nodes that serve coordinator duty disproportionately.

**Single-Point-of-Failure Mitigation**: The consensus requires nodes to survive 7–30+ days without ground contact. If a coordinator fails mid-cycle, the cluster must seamlessly transfer authority. Longer duty cycles increase exposure to coordinator loss; shorter cycles increase handoff frequency and associated risks.

**State Transfer Overhead**: Each rotation requires synchronizing ephemeris data, conjunction screening queues, and communication routing tables across the cluster. With 512 MB–4 GB nonvolatile storage per node and optical ISL links at 1–100 Gbps, transfer time is non-trivial. Frequent rotations consume bandwidth that could otherwise support science data or navigation updates.

Incorrect duty cycle selection could cascade into collision avoidance failures if coordinator handoffs coincide with conjunction events, potentially violating the <10⁻⁶ collision probability per node-year requirement.

## Key Considerations

**Power Differential**: Quantify the watt-hour penalty for coordinator duty versus baseline operation. If coordinators consume 15–20 W versus 5 W baseline, a 24-hour duty cycle imposes 240–360 Wh additional load—significant for nodes sized around the 2.1 kg control unit mass budget.

**Handoff Latency**: With ≤10 ms swarm-wide time synchronization, handoff windows must be precisely coordinated. Simulation must characterize worst-case handoff duration under degraded communication conditions.

**Cluster Topology Dynamics**: Nodes drift within their assigned orbital element windows. Coordinator selection should favor nodes with favorable geometry for intra-cluster and inter-tier links, but geometry changes over time.

**Failure Mode Interaction**: Coordinator rotation must not conflict with collision avoidance maneuvers. If a node is executing emergency avoidance (reactive or emergency layer), it cannot simultaneously perform coordinator handoff.

**Scalability to 10,000+ Nodes**: With 100 nodes per cluster, Phase 1 involves 10–30 clusters initially scaling to 100+ clusters. Rotation protocols must not require global coordination.

## Research Directions

1. **Develop a Discrete-Event Simulation of Cluster Coordination**: Model 100-node clusters with realistic power consumption profiles (5 W baseline, 15–20 W coordinator), communication latency distributions, and node failure injection at 2–3% annual rate. Sweep duty cycles from 1 hour to 7 days and measure power variance, handoff success rate, and coordinator availability.

2. **Characterize State Transfer Requirements**: Quantify the data volume for complete coordinator state (ephemeris catalog, conjunction queue, routing tables) and measure transfer time over 1550 nm optical ISL at various ranges. Determine minimum handoff window duration.

3. **Monte Carlo Failure Analysis**: Inject coordinator failures at random points in duty cycles across 1,000+ simulation runs. Measure time-to-recovery, cluster availability degradation, and collision probability impact. Identify duty cycle lengths that minimize exposure without excessive handoff overhead.

4. **Evaluate Adaptive Rotation Policies**: Compare fixed-period rotation against event-driven policies (rotate on power threshold, geometry change, or predicted conjunction density). Assess complexity versus robustness tradeoffs.

5. **Hardware-in-the-Loop Validation**: Using representative rad-tolerant processors (RISC-V or ARM+FPGA), measure actual power consumption and processing latency for coordinator functions. Validate simulation assumptions against physical hardware before scaling to 10,000-node scenarios.
