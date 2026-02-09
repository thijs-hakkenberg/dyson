---
slug: "resolution-autonomous-repair-authority"
title: "Resolved: How Much Can Repair Drones Decide On Their Own?"
description: "Consensus on a five-tier authority framework where 95% of maintenance is autonomous. The math is brutal: human approval for even routine operations would double fleet size."
author: "Project Dyson Team"
date: "2026-02-07"
category: "Research Resolutions"
tags:
  - "resolution"
  - "discussion"
  - "phase-2"
  - "autonomy"
  - "repair"
  - "governance"
  - "drones"
---

# Resolved: How Much Can Repair Drones Decide On Their Own?

With 10 million swarm elements and 100-500 daily maintenance events, the authority limits for autonomous repair drones become a civilization-scale governance problem. Our multi-model discussion reached consensus on a framework that acknowledges a brutal mathematical reality.

## The Math is Unforgiving

At 8-16+ minute communication latencies to Earth:
- Requiring human approval for even **10%** of maintenance events would create catastrophic queuing delays
- Fleet utilization would collapse
- Effective fleet size would need to **double** to maintain throughput

The autonomous envelope must cover **~95% of anticipated maintenance events by volume**—not from preference for autonomy, but from hard mathematical constraints.

## The Five-Tier Framework

| Tier | Authority Level | Example Operations |
|------|----------------|-------------------|
| 0 | Fully autonomous, no reporting | Routine inspection scans |
| 1 | Autonomous with logging | Standard ORU swaps, cleaning |
| 2 | Autonomous with depot notification | Multi-ORU replacements, minor anomalies |
| 3 | Requires depot approval | Structural repairs, non-standard procedures |
| 4 | Requires Earth approval | Decommissioning, swarm topology changes, software updates |

The boundaries are calibrated by:
- **Reversibility**: Can the action be undone?
- **Asset value at risk**: What's the worst-case loss?
- **Time-criticality**: Can we wait for approval?

## Depots as Governance Nodes

**Critical architectural insight**: Maintenance depots must serve as intermediate governance nodes, not merely logistics hubs.

Spacing depots so every swarm element falls within **0.5 light-seconds** of at least one depot enables:
- Near-real-time oversight for medium-risk operations
- Three-layer authority hierarchy (drone → depot → Earth)
- Resolution of the latency problem without sacrificing meaningful human oversight

Depots hold Tier 3 approval authority and Tier 4 recommendation authority.

## Swap-First Enables Scale

The repair philosophy choice directly affects governance throughput:

| Philosophy | Typical Tier | Governance Impact |
|------------|-------------|-------------------|
| ORU swap | Tier 1 | Bounded-risk, reversible, autonomous |
| In-situ weld/braze | Tier 3+ | Requires depot approval |

**Swap-first isn't just an engineering preference—it's a governance throughput decision.**

Every standardized ORU swap is a deterministic, reversible Tier 1 operation. Every in-situ weld is Tier 3 at minimum. Adopting component-level in-situ repair would shift significant operations into depot-approval tiers, creating bottlenecks.

## Drone Class Authority Caps

| Drone Class | Mass | Max Authority |
|-------------|------|---------------|
| Inspector | 14-52 kg | Tier 1 |
| Servicer | 180-320 kg | Tier 2 (Tier 3 with depot approval) |
| Depot systems | — | Tier 3 approval, Tier 4 recommendation |

## Decision Logic: Deterministic, Not ML

**Authority decision logic must be implemented as deterministic, auditable rule sets**—not ML-based judgment.

Why:
1. Traceability for post-incident forensics
2. Safety certification requires provable properties
3. Regulatory defensibility

Cryptographic authorization tokens with expiration times govern Tier 3-4 approvals.

## Graduated Authority Expansion

Trust is built empirically:

1. **Start compressed**: Tier 1 operations temporarily elevated to Tier 2-3
2. **Expansion threshold**: 1,000 successful operations at <0.5% anomaly rate before downgrading a procedure type
3. **Automatic regression**: Fleet-wide authority compression upon any satellite-damaging incident

This graduated approach provides a defensible pathway from initial deployment to full autonomous operations.

## Communication Blackout Protocol

Solar conjunction or relay failures could sever Earth contact for extended periods. **Unresolved**: whether drones should:
- Maintain current authority levels
- Automatically compress to conservative envelope
- Expand depot authority during blackouts

## Precedent Analysis

The discussion draws on:
- **ISS Canadarm2** autonomous modes
- **Orbital Express** proximity operations
- **MEV-1/2** servicing missions
- **Astrobee** free-flyer operations

Each provides specific lessons for escalation triggers, grapple authority limits, and post-incident revisions.

## Unresolved Questions

1. What is the actual swarm element failure mode distribution?
2. What depot spacing and count is feasible within mass/cost budgets?
3. How should correlated failures (solar storms, debris fields) modify thresholds in real time?
4. What governance applies during communication blackouts?

## Recommended Actions

1. **Develop complete operation taxonomy** with tier mapping
2. **Model fleet throughput** under proposed tier structure
3. **Analyze ISS/Orbital Express/MEV precedents** for specific protocol designs
4. **Define depot authority delegation** as priority within depot design
5. **Design Phase A graduated authority campaign** for initial fleet deployment

---

*This resolution addresses [RQ-2-8: Autonomous repair authority limits](/questions/autonomous-repair-authority-limits). View the full discussion thread with model responses and voting on the question page.*
