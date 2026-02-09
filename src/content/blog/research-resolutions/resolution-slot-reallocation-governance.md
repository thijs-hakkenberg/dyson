---
slug: "resolution-slot-reallocation-governance"
title: "Resolved: Governing a Million Orbital Slots"
description: "Consensus on tiered-authority governance with append-only slot lifecycle, quarantine-first protocol, and Raft consensus. It's a trajectory uncertainty problem, not a distributed systems problem."
author: "Project Dyson Team"
date: "2026-02-07"
category: "Research Resolutions"
tags:
  - "resolution"
  - "discussion"
  - "phase-1"
  - "governance"
  - "swarm"
  - "coordination"
  - "slots"
---

# Resolved: Governing a Million Orbital Slots

When a swarm element fails, what happens to its orbital slot? With millions of nodes eventually operating in coordinated formations, this governance question scales to civilization-critical importance.

Our multi-model discussion reached consensus after two rounds of deliberation—and the winning insight reframes the entire problem.

## The Key Insight: It's a Trajectory Problem

The most significant realization: **slot reallocation is fundamentally a trajectory uncertainty propagation problem with a governance wrapper**, not primarily a distributed consensus challenge.

The correctness and efficiency of the entire protocol depends on how accurately the swarm can predict a failed node's future trajectory. This determines quarantine zone sizing—the single largest driver of operational impact on neighboring nodes.

| Failed Node State | Position Uncertainty at 7 Days | Quarantine Zone |
|-------------------|-------------------------------|-----------------|
| Tracked (retroreflector) | Tens of meters | 1-3 slots |
| Untracked (tumbling) | Kilometers | 5-15 slots |

This elevates **passive tracking capability** from nice-to-have to critical requirement.

## The Append-Only Architecture

Slots transition through a one-way lifecycle:

\`\`\`
NOMINAL → SUSPECT → QUARANTINED → RETIRED
\`\`\`

**Slots are never reused with the same ID.** Replacement capacity comes from minting new slots with fresh identifiers and authentication keys.

Why this matters:
1. **Dramatically simplifies formal verification** on the seL4 kernel
2. **Eliminates an entire class of state synchronization failures**
3. **Provides immutable audit trail** for post-incident analysis

## Quarantine-First Protocol

Every failure triggers **mandatory minimum 72-hour quarantine**.

Key design elements:
- Quarantine zones propagate with the failed node's predicted orbit (not fixed to original slot location)
- Inflation rates determined by trajectory uncertainty class
- Original slot becomes safe to reoccupy once dead node has drifted sufficiently far

## Tiered Authority Structure

| Tier | Entity | Authority |
|------|--------|-----------|
| 1 | Individual nodes | Self-status reporting only |
| 2 | Cluster coordinators | Full intra-cluster quarantine, retirement, slot minting |
| 3 | Beacon spacecraft | Cross-cluster propagation, catalog reconciliation |
| 4 | Earth ground segment | Policy changes, software updates |

**Critical design choice**: Cluster coordinators have full authority for time-critical operations without beacon approval. This enables operation within the 7-30 day autonomous window.

## Consensus Protocol: Raft, Not BFT

Intra-cluster slot state transitions use **leader-based Raft consensus** requiring the coordinator plus 2 independent witnesses.

Why not Byzantine Fault Tolerance?
- The threat model is hardware failures in **authenticated, formally verified nodes**
- BFT's O(n²) message complexity isn't justified
- Crash fault tolerance with O(n) complexity is sufficient

## Passive Tracking Requirements

**Every node must carry**:
- Corner cube retroreflectors (~50g × 4)
- Fail-safe RF beacon (~100g, independent power)

These enable neighbor-based trajectory estimation after primary system failure. Without them, quarantine zones grow to multi-kilometer scale and can consume 5-15 adjacent slots; with them, quarantine is limited to 1-3 slots.

**Total mass: ~250g per node**

## ΔV Conservation Strategy

The binding constraint on reallocation operations is the ΔV budget (0.5-5 m/s/year), not communication or computation.

Solutions:
1. **Pre-positioned spare nodes** (5% of cluster population) eliminate cascading slot migrations
2. **Dedicated 20% ΔV reserve per node** for collision avoidance only
3. **Hard cap**: 0.05 m/s per affected node per single reallocation event

## Unresolved Questions

1. **Correlated failure resilience**: What happens when 5+ simultaneous failures occur in a single cluster?
2. **Coordinator failure during active reallocation**: How does handover work mid-quarantine?
3. **Long-term slot density evolution**: How does the active/retired ratio evolve over 50 years?
4. **RF beacon electromagnetic compatibility**: Frequency selection and interference with primary comms?

## Recommended Actions

1. **Develop trajectory uncertainty propagation model** with validated quarantine zone inflation parameters
2. **Run Monte Carlo correlated failure campaigns** at 10,000+ node scale
3. **Formally specify slot state machine on seL4** with proven transition properties
4. **Prototype passive tracking subsystem** with ground/ISS-based validation
5. **Define beacon catalog reconciliation protocol** for 30-day autonomous operation scenarios

---

*This resolution addresses [RQ-1-40: Slot reallocation governance protocol](/questions/slot-reallocation-governance). View the full discussion thread including both rounds of deliberation on the question page.*
