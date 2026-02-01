---
questionId: "rq-1-40"
slug: "slot-reallocation-governance"
title: "Slot reallocation governance protocol"
questionType: "discussion"
priority: "high"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-7"
sourceBOMItemSlug: "swarm-control-system"
sourceBOMItemName: "Swarm Control System"
relatedBOMItems:
  - "bom-1-7"
tags:
  - "slot-management"
  - "governance"
  - "failure-handling"
createdDate: "2026-02-01"
---

## Background

The Swarm Control System governs the coordination, navigation, and collision avoidance of thousands of satellites operating in heliocentric orbit. The consensus architecture implements an "Ephemeris Governance" model rather than rigid formation flying—each node is assigned an orbital element window and keep-out tube defining its permitted operational volume. This approach, combined with the three-tier federated architecture (individual nodes, ~100-node clusters, and 3–5 beacon/relay spacecraft), creates a distributed system where slot assignments are fundamental to collision avoidance and swarm coherence.

The question of slot reallocation governance arises directly from the consensus requirement for collision probability <10⁻⁶ per node-year and the acceptance of 1–3% annual node failure rate using automotive-grade components. With a Phase 1 deployment of 1,000–3,000 nodes, this translates to 10–90 node failures annually. Each failure creates an orphaned slot that must be either reassigned, quarantined, or absorbed—while simultaneously preventing the failed node's uncontrolled drift from triggering cascading conjunction events with neighboring satellites.

## Why This Matters

Slot reallocation governance is a critical failure-handling mechanism with direct implications for swarm safety and operational continuity. Without a well-defined protocol:

- **Cascading Conflicts**: A drifting failed node may violate keep-out tubes of adjacent slots, forcing emergency avoidance maneuvers that consume limited ΔV budgets (0.5–5 m/s/year per GPT specifications). Multiple simultaneous avoidances could trigger chain reactions across cluster boundaries.

- **Density Violations**: The consensus specifies distributed conjunction screening with beacon-broadcast catalogs. If slot reassignment lags behind failure detection, the ephemeris catalog becomes stale, degrading collision prediction accuracy below the 10⁻⁶ threshold.

- **Resource Stranding**: Orphaned slots represent lost energy collection capacity. Efficient reallocation enables replacement nodes to occupy vacated positions, maintaining swarm power output during the 50-year operational lifetime.

- **Autonomy Requirements**: Nodes must survive 7–30+ days without ground contact. The governance protocol must function entirely within the autonomous decision-making envelope, executed by cluster coordinators and beacon spacecraft without human-in-the-loop approval for time-critical reassignments.

This question directly impacts the software architecture of the formally verified seL4 kernel, the beacon catalog broadcast format, and the cluster coordinator duty cycle (itself an open question in the consensus).

## Key Considerations

**Failure Detection Latency**: How quickly can a node failure be confirmed? The consensus specifies ≤10 ms swarm-wide time synchronization, but detecting a non-responsive node requires multiple missed heartbeats. False positives (temporary communication loss) must not trigger premature slot reassignment.

**Slot Geometry Constraints**: Keep-out tubes and orbital element windows have physical dimensions tied to navigation accuracy (±1 m to ≤5 km depending on model). Reassignment must respect minimum separation distances while maximizing packing efficiency.

**Authority Hierarchy**: The three-tier architecture creates ambiguity—should cluster coordinators (Tier 2) authorize intra-cluster reassignments autonomously, or must beacon spacecraft (Tier 3) approve all changes to the master ephemeris catalog? Latency to beacon spacecraft may be seconds to minutes depending on swarm geometry.

**ΔV Cost of Slot Migration**: Moving a replacement node into a vacated slot consumes propulsion budget. With only 0.5–5 m/s/year available, slot reassignment frequency is constrained by cumulative ΔV expenditure.

**Quarantine vs. Reassignment**: Some slots adjacent to failed nodes may require temporary quarantine rather than immediate reassignment, creating buffer zones until the failed node's trajectory is fully characterized.

## Research Directions

1. **Develop Failure Classification Taxonomy**: Define categories (graceful shutdown, sudden failure, partial degradation, communication loss) with corresponding response protocols. Map each category to detection signatures, confirmation thresholds, and reassignment urgency levels.

2. **Model Slot Adjacency Graphs**: Create network models of slot interdependencies within clusters. Simulate failure propagation scenarios to identify critical slots whose loss triggers disproportionate reassignment cascades. Use Monte Carlo methods with the planned 10,000+ node simulation environment.

3. **Design Distributed Consensus Protocol**: Evaluate Byzantine fault-tolerant algorithms (PBFT, Raft) for cluster-level slot reassignment decisions. Determine minimum quorum requirements given the ~100 nodes per cluster and rotating coordinator architecture.

4. **Quantify Reassignment ΔV Budgets**: Calculate typical slot migration costs as a function of orbital element window size and swarm density. Establish annual reassignment capacity limits compatible with the 0.5–5 m/s/year propulsion budget.

5. **Prototype Beacon Catalog Update Mechanism**: Define the data structure, authentication requirements (per-node identity keys), and broadcast cadence for ephemeris catalog amendments. Test update propagation latency against the 30-day autonomous operation requirement.
