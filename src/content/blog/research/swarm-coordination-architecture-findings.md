---
slug: "swarm-coordination-architecture-findings"
title: "Scaling to a Million Units: Why Hierarchical Coordination Wins"
description: "Discrete event simulation demonstrates that hierarchical coordination scales to 1M+ nodes while centralized architectures bottleneck at ~10,000. Optimal coordinator duty cycle: 24-48 hours."
author: "Research Team"
date: "2026-02-03"
category: "Research"
tags:
  - "simulation"
  - "research-question"
  - "phase-1"
  - "phase-2"
  - "coordination"
  - "discrete-event-simulation"
relatedPhases:
  - "phase-1"
  - "phase-2"
---

# Scaling to a Million Units: Why Hierarchical Coordination Wins

The Dyson swarm will eventually comprise millions of autonomous units. We built a discrete event simulator to answer the critical question: **What coordination architecture can scale that far?**

## The Three Questions

This simulation addresses three interrelated research questions:
- **RQ-1-24**: How do coordination architectures scale to millions of units?
- **RQ-1-39**: What's the optimal duty cycle for cluster coordinators?
- **RQ-2-17**: At what fleet size do coordination constraints dominate?

## The Key Finding: Hierarchy is Essential

**Hierarchical coordination scales to 1M+ nodes; centralized hits bottlenecks at ~10,000.**

| Architecture | Scalability Limit | Communication Overhead |
|-------------|-------------------|----------------------|
| Centralized | ~10,000 nodes | 5-15% |
| **Hierarchical** | **1,000,000+ nodes** | **2-8%** |
| Mesh | ~100,000 nodes | 10-25% |

The centralized approach fails not because of bandwidth, but because of message processing latency at the central node.

## Why Centralized Fails

In a centralized architecture:
- Every node reports to a single coordinator
- Message processing time: O(N)
- At 10,000 nodes, queue depth exceeds acceptable latency
- At 100,000 nodes, the system becomes unresponsive

**The bottleneck isn't bandwidth—it's processing time.**

## Why Mesh Becomes Inefficient

Mesh topology provides excellent resilience but:
- Message complexity: O(N²) for gossip protocols
- At 100,000 nodes, overhead exceeds 25% of communication bandwidth
- Coordination consistency becomes unreliable

Mesh works well for small clusters but not swarm-scale operations.

## The Hierarchical Solution

The hierarchical architecture uses ~100-node clusters with rotating coordinators:

\`\`\`
       [Ground Control]
              |
       [Regional Coordinators] (10-100)
              |
       [Cluster Coordinators] (100-1000)
              |
       [Node Clusters] (50-100 nodes each)
\`\`\`

**Message complexity: O(N × log(N))**—scalable to millions.

## Coordinator Duty Cycle: The 24-Hour Sweet Spot

The simulation tested duty cycles from 1 hour to 7 days:

| Duty Cycle | Power Variance | Handoff Success | Availability |
|-----------|---------------|-----------------|--------------|
| 1 hour | <5% | 95% | 99.9% |
| 6 hours | 8% | 98% | 99.8% |
| **24 hours** | **12%** | **99.5%** | **99.5%** |
| **48 hours** | **18%** | **99.8%** | **99.2%** |
| 7 days | 35% | 99.9% | 98% |

**24-48 hours provides optimal balance:**
- Low enough handoff frequency to minimize overhead
- Short enough exposure to limit single-point-of-failure risk
- Predictable timing for handoff scheduling

## Power Budget Implications

Coordinator duty comes with power overhead:
- Baseline node: 5 W average
- Coordinator mode: 15-20 W average

With 24-hour duty cycles in 100-node clusters:
- Each node serves as coordinator ~1% of the time
- Average power impact: ~0.15 W per node
- Acceptable within power budget

## State Transfer Requirements

Each coordinator handoff requires transferring:
- Ephemeris catalog: 10-50 MB
- Conjunction queue: 1-5 MB
- Routing tables: 0.5-1 MB

**Total transfer time: 1-10 seconds over optical ISL**

This is fast enough to complete handoffs without disrupting cluster operations.

## The 50,000-Node Inflection Point

For manufacturing fleet coordination (RQ-2-17), the simulation identifies:

| Fleet Size | Hierarchical Overhead | Coordination Viable? |
|-----------|----------------------|---------------------|
| 1,000 | 1% | Yes |
| 10,000 | 2% | Yes |
| **50,000** | **4%** | **Inflection point** |
| 100,000 | 6% | Marginal |
| 500,000 | 10% | Requires optimization |

**At ~50,000 nodes, coordination overhead reaches 5%**—our target threshold for acceptable overhead. Beyond this, additional optimizations are required.

## Recommendations for Phase 1

### 1. Implement Hierarchical Architecture from Day One

Don't start with centralized and migrate later—design for hierarchy from the beginning.

### 2. Use 100-Node Clusters with 24-Hour Rotation

This provides:
- Manageable cluster size for coordination
- Predictable handoff scheduling
- Balanced power distribution

### 3. Design for 1M+ Node Scalability

Even if Phase 1 deploys only 10,000 units, the architecture must support Phase 2 scale.

### 4. Limit Per-Node Bandwidth to 0.5-1 kbps

This constraint ensures the architecture scales without bandwidth bottlenecks.

## Try It Yourself

We've published the [interactive simulator](/questions/swarm-coordination-architecture-scale/simulator) so you can explore coordination architectures. Adjust node count, topology, cluster size, and duty cycle to see how overhead and scalability change.

## Methodology

The simulation uses:
- **Discrete event simulation** with message passing
- **Topology modeling** (centralized, hierarchical, mesh)
- **Power consumption profiles** for coordinator vs baseline nodes
- **50-100 Monte Carlo runs** per configuration

Results represent relative comparisons between architectures.

## What's Next

This research answers RQ-1-24, RQ-1-39, and RQ-2-17, providing validated coordination architecture for Phase 1 and Phase 2. The hierarchical approach with rotating coordinators is now the baseline design.

Remaining work:
- Spatial partitioning algorithm benchmarking
- Adaptive rotation policy evaluation
- Hardware-in-the-loop validation

---

**Research Questions:**
- [RQ-1-24: Swarm coordination architecture at scale](/questions/swarm-coordination-architecture-scale)
- [RQ-1-39: Cluster coordinator duty cycle](/questions/cluster-coordinator-duty-cycle)
- [RQ-2-17: Fleet coordination scale constraints](/questions/fleet-coordination-scale-constraints)

**Interactive Tool:** [Swarm Coordination Simulator](/questions/swarm-coordination-architecture-scale/simulator)
