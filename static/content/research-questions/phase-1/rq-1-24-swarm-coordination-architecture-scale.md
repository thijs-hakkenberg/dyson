---
questionId: "rq-1-24"
slug: "swarm-coordination-architecture-scale"
title: "Swarm coordination architecture at scale (millions of units)"
questionType: "simulation"
priority: "high"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-4"
sourceBOMItemSlug: "assembly-node"
sourceBOMItemName: "Assembly Node Hub"
relatedBOMItems:
  - "bom-1-4"
  - "bom-1-7"
  - "bom-2-1"
tags:
  - "swarm-coordination"
  - "scalability"
  - "architecture"
createdDate: "2026-02-01"
---

## Background

The Assembly Node Hub (ANH) serves as the central manufacturing and coordination facility for Phase 1 Dyson swarm deployment, with a target production throughput of 1–1.7 MW-equivalent of solar collector capacity per month. As the swarm grows from initial deployment to millions of individual collector units—each potentially 100 m² to 1 km² in size—the coordination architecture must scale accordingly. The consensus document identifies this as Open Question #6, noting fundamental uncertainty about whether coordination should be centralized (ANH as master), distributed (peer-to-peer), or hierarchical, and what communication bandwidth and compute resources are required.

The ANH's communications specification calls for high-bandwidth Earth link (50 Mbps–1 Gbps) via optical and/or Ka/X-band RF, plus local mesh network for swarm coordination. However, these specifications were derived for initial operations, not for managing millions of autonomous units spread across heliocentric orbits. The three-tier hierarchical autonomy model (reflexive/reactive, tactical/task, strategic/mission) established for ANH operations must extend to swarm-wide coordination without creating bottlenecks or single points of failure.

## Why This Matters

Swarm coordination architecture is a critical path dependency for the entire Dyson swarm concept. Failure to establish a scalable architecture will result in one of several catastrophic outcomes:

**Collision and debris cascades**: Without coordinated stationkeeping, collector units operating in overlapping orbital regimes risk collisions. At millions of units, even a 0.001% annual collision rate produces thousands of debris-generating events per year, potentially triggering Kessler-syndrome dynamics that destroy the swarm.

**Throughput limitations**: If the ANH becomes a coordination bottleneck, production capacity becomes meaningless—units cannot be deployed faster than they can be tracked and commanded. The 1–1.7 MW/month production target assumes deployed units can be integrated into the swarm without backlog.

**Power transmission efficiency**: Dyson swarm energy collection requires coordinated beam-pointing or power routing. Uncoordinated units cannot contribute effectively to aggregate power delivery, undermining the fundamental project objective.

**Maintenance and fault response**: The 10–30 year design life assumes units can be identified, diagnosed, and serviced. Without scalable tracking and health monitoring, failed units become unrecoverable debris.

## Key Considerations

**Communication bandwidth scaling**: If each collector unit requires 1 kbps average telemetry/command bandwidth, one million units demand 1 Gbps aggregate—already at the upper limit of the specified Earth link. At 10 million units, the architecture must either dramatically reduce per-unit bandwidth requirements or implement hierarchical aggregation.

**Light-time constraints**: At 1 AU baseline operations, Earth round-trip communication latency is approximately 16 minutes. The autonomy-first operations philosophy already acknowledges this constraint, but swarm-internal coordination faces similar challenges as the swarm expands spatially.

**Computational load**: Collision avoidance for N objects scales as O(N²) for naive pairwise checking. At one million units, this represents 10¹² pair evaluations per update cycle—requiring either massive parallelization or hierarchical spatial partitioning algorithms.

**Failure mode propagation**: Centralized architectures offer simplicity but create single points of failure. Fully distributed architectures are resilient but may exhibit emergent instabilities or consensus failures. The recommended "pause and safe" fault handling philosophy must extend to swarm-level coordination failures.

**Heterogeneous unit types**: Phase 1 may deploy uniform collector units, but later phases will include relay stations, maintenance vehicles, and upgraded collector designs. The architecture must accommodate heterogeneous participants with different capabilities and requirements.

## Research Directions

1. **Agent-based swarm simulation**: Develop a simulation environment modeling 10⁶–10⁸ collector units with realistic orbital mechanics, communication delays, and failure modes. Test centralized, distributed, and hierarchical coordination algorithms under nominal operations and stress scenarios (mass failures, communication outages, collision events).

2. **Communication protocol analysis**: Model bandwidth requirements for different coordination architectures, including telemetry compression, event-driven versus polling communication, and hierarchical aggregation schemes. Determine minimum viable per-unit bandwidth and identify architecture-specific bottlenecks.

3. **Spatial partitioning algorithm benchmarking**: Evaluate octree, k-d tree, and other spatial indexing approaches for collision avoidance and neighbor discovery at swarm scale. Quantify computational requirements and latency for different update frequencies and spatial densities.

4. **Hierarchical autonomy extension study**: Design a multi-tier coordination hierarchy (unit → local cluster → regional coordinator → ANH → ground) with defined interfaces, authority boundaries, and escalation protocols. Analyze failure mode propagation and recovery strategies at each tier.

5. **Terrestrial swarm technology survey**: Review coordination architectures from satellite mega-constellations (Starlink, OneWeb), drone swarms, and distributed computing systems. Identify applicable patterns and scaling limits from operational systems managing 10³–10⁴ nodes.
