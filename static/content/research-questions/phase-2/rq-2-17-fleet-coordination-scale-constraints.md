---
questionId: "rq-2-17"
slug: "fleet-coordination-scale-constraints"
title: "Fleet coordination constraints at scale"
questionType: "simulation"
priority: "high"
status: "open"
sourcePhase: "phase-2"
sourceBOMItemId: "bom-2-3"
sourceBOMItemSlug: "manufacturing-expansion"
sourceBOMItemName: "Manufacturing Expansion"
relatedBOMItems:
  - "bom-2-3"
  - "bom-1-7"
tags:
  - "coordination"
  - "scalability"
  - "communication"
  - "software"
createdDate: "2026-02-01"
---

## Background

The Manufacturing Expansion BOM item specifies deployment of standardized manufacturing nodes in the 2,000-3,000 tonne class, each capable of 18-24 month self-replication cycles with 94% mass closure from in-situ resources. The consensus document explicitly identifies fleet coordination as an open question (referenced as "Claude: Q9; GPT: inter-node logistics"), asking: "At what fleet size (hundreds to thousands of nodes) do coordination, communication bandwidth, and software update challenges become dominant constraints?"

This question arises because the exponential growth strategy—with each node dedicating approximately 30% of production capacity to replication—will rapidly scale the fleet from initial deployment to potentially thousands of autonomous manufacturing units. Each node requires 30+ days of autonomous operation capability with multi-level control hierarchies (strategic/tactical/operational/reactive), creating a complex distributed system where coordination overhead may eventually consume more resources than productive manufacturing.

## Why This Matters

Fleet coordination directly determines whether the exponential growth model remains viable at scale. If coordination overhead scales superlinearly with node count, the project faces a hard ceiling on effective manufacturing capacity regardless of individual node performance.

**Critical dependencies include:**
- **Resource allocation**: Multiple nodes competing for asteroid feedstock, orbital slots, and logistics support require real-time deconfliction
- **Software synchronization**: Fleet-wide updates to autonomy software must propagate reliably across nodes operating with 30+ day autonomous windows
- **Fault propagation**: A coordination failure could cascade across interdependent nodes, potentially halting production across entire fleet segments
- **Communication infrastructure**: Deep-space communication latency (8-20 minutes to Earth at operational distances) means nodes must coordinate peer-to-peer

The consensus document's Recommended Approach explicitly states: "Operations will be autonomy-limited if software lags hardware deployment." If coordination constraints emerge at 500 nodes but the growth model assumes 5,000+ nodes for Phase 2 completion, the entire project timeline collapses.

## Key Considerations

**Communication bandwidth requirements**: Each node producing 10-25 tonnes/day of refined metals and 2,000-5,000 m²/day of thin-film requires continuous telemetry for quality control, inventory management, and logistics coordination. Aggregate bandwidth scales with N² for full mesh coordination or N·log(N) for hierarchical architectures.

**Latency tolerance**: Nodes at Sun-Earth L4/L5 (Claude's recommendation) versus heliocentric orbits at 0.9-1.1 AU (GPT's recommendation) face different inter-node communication delays. L4/L5 clustering enables sub-second coordination; distributed heliocentric deployment may impose minutes of latency between node clusters.

**Autonomy hierarchy complexity**: The four-level control hierarchy (strategic/tactical/operational/reactive) must scale across the fleet. Strategic decisions affecting hundreds of nodes require consensus mechanisms that don't bottleneck on single points of failure.

**Software update propagation**: With 25-year design life and continuous autonomous operation, nodes will require thousands of software updates. Update validation, rollback procedures, and version compatibility across heterogeneous node generations create combinatorial complexity.

**Failure mode correlation**: Shared software, common suppliers for the 6-10% Earth-sourced components, and similar operational environments create correlated failure risks that coordination systems must detect and isolate.

## Research Directions

1. **Develop discrete-event simulation of fleet growth dynamics**: Model node replication from initial deployment through 10,000+ units, tracking coordination message volume, resource contention events, and decision latency as functions of fleet size. Identify the inflection point where coordination overhead exceeds 5% of productive capacity.

2. **Benchmark hierarchical versus mesh coordination architectures**: Simulate both topologies under realistic failure scenarios (node loss, communication blackouts, software bugs). Quantify the tradeoff between mesh resilience and hierarchical efficiency at fleet sizes of 100, 1,000, and 10,000 nodes.

3. **Analyze software update propagation strategies**: Model staged rollout, canary deployment, and immediate fleet-wide update approaches. Determine maximum safe update frequency given 30-day autonomous operation windows and quantify rollback time requirements.

4. **Characterize communication bandwidth scaling**: Calculate per-node telemetry requirements based on production rates (10-25 t/day metals, 2,000-5,000 m²/day film) and coordination messaging. Project aggregate bandwidth at scale and identify infrastructure requirements (relay satellites, optical links, compression algorithms).

5. **Design and simulate fault isolation protocols**: Model cascading failure scenarios where coordination system bugs or resource conflicts propagate across nodes. Establish minimum isolation boundaries and recovery time objectives that preserve fleet-wide production continuity.
