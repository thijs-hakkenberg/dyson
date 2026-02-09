---
slug: "depot-spacing-logistics-findings"
title: "Maintaining a Billion Units: Optimal Depot Spacing for Swarm Operations"
description: "Discrete event logistics simulation reveals that 150,000-200,000 km depot spacing achieves <7 day mean time to repair with 85%+ fleet utilization for billion-unit maintenance operations."
author: "Research Team"
date: "2026-02-03"
category: "Research"
tags:
  - "simulation"
  - "research-question"
  - "phase-2"
  - "logistics"
  - "depot"
  - "discrete-event-simulation"
relatedPhases:
  - "phase-2"
---

# Maintaining a Billion Units: Optimal Depot Spacing for Swarm Operations

When your swarm contains 10 million collectors, maintenance becomes a logistics challenge of unprecedented scale. We built a discrete event simulator to answer: **How should maintenance depots be distributed to minimize response time while controlling costs?**

## The Challenge

At scale, the Dyson swarm faces daunting maintenance requirements:
- **10 million collectors** spread across millions of km³
- **2% annual failure rate** = 200,000 failures/year
- **Response time matters**—unrepaired units degrade swarm performance

The depot architecture must balance:
- Response time (closer depots = faster repair)
- Infrastructure cost (more depots = higher investment)
- Fleet utilization (efficient drone deployment)

## The Key Finding: 150,000-200,000 km Spacing

**Depot spacing of 150,000-200,000 km achieves optimal cost-efficiency.**

| Depot Spacing | Depots Required | MTTR | Fleet Util | Cost/Mission |
|--------------|-----------------|------|------------|--------------|
| 50,000 km | 2,500+ | 2 days | 60% | $500k |
| 100,000 km | 800 | 4 days | 75% | $350k |
| **150,000 km** | **400** | **5 days** | **85%** | **$280k** |
| **200,000 km** | **250** | **7 days** | **88%** | **$250k** |
| 500,000 km | 50 | 15 days | 95% | $400k |

The sweet spot provides:
- Acceptable mean time to repair (<7 days)
- High fleet utilization (>85%)
- Minimum cost per service mission

## Why Dense Spacing Fails

Intuition suggests closer depots = faster repair. But the simulation reveals diminishing returns:

**At 50,000 km spacing:**
- 2,500+ depots required
- Each depot underutilized (60%)
- Propellant wasted on short hops
- Infrastructure cost dominates

The drones spend more time idle than servicing.

## Why Sparse Spacing Fails

**At 500,000 km spacing:**
- Only 50 depots, but...
- 15-day mean time to repair
- Long transit times waste drone capacity
- Some failures go unserviced

Response time exceeds acceptable limits for swarm performance.

## Fleet Sizing at Scale

For a 10 million collector swarm with 2% annual failure rate:

| Fleet Component | Count | Purpose |
|-----------------|-------|---------|
| Inspector Drones | 20,000 | Detection and diagnosis |
| Servicer Drones | 2,000 | Repair and replacement |
| Depots | 250-400 | Base of operations |

**Total propellant consumption: 500-1,500 tonnes/year**

This is substantial but achievable with ISRU propellant production.

## The Logistics Model

Each service mission follows this sequence:
1. **Failure detection** (inspector patrol)
2. **Dispatch servicer** from nearest depot
3. **Transit to failed unit** (Hall-effect thrusters)
4. **Repair/replace** (cold-gas proximity ops)
5. **Return to depot** for refuel/rearm

Transit time dominates the cycle. Depot spacing directly determines transit distance.

## Propellant Economics

With Hall-effect thrusters at 1,500-2,000 s Isp:

| Mission Type | Propellant/Mission | Annual Total |
|-------------|-------------------|--------------|
| Inspector sortie | 50-100 kg | 1,000 tonnes |
| Servicer mission | 200-500 kg | 400 tonnes |
| **Total** | — | **1,400 tonnes** |

At optimized spacing, propellant consumption is minimized while maintaining response time.

## Depot Architecture

Each depot (at 150,000 km spacing) requires:
- **Drone complement**: 50 inspectors, 8 servicers
- **Propellant storage**: 50-100 tonnes
- **ORU inventory**: 500-1,000 common spares
- **Power**: 50-100 kW (solar)
- **Communication**: Relay to Earth/regional coordinator

**Total depot mass: ~500-1,000 tonnes each**

## The Response Time Distribution

The simulation generates MTTR distributions:

| Percentile | Response Time |
|------------|---------------|
| 50th | 4 days |
| 90th | 8 days |
| 95th | 12 days |
| 99th | 18 days |

**95% of failures are addressed within 12 days**—acceptable for swarm performance given the 10% graceful degradation tolerance.

## Try It Yourself

We've published the [interactive simulator](/questions/depot-spacing-logistics-architecture/simulator) so you can explore depot architectures. Adjust spacing, fleet sizes, swarm scale, and failure rates to see how MTTR and costs change.

## Methodology

The simulation uses:
- **Discrete event simulation** with failure generation
- **Nearest-depot dispatch algorithm**
- **Delta-V calculations** for transit costs
- **50+ Monte Carlo runs** per configuration

Results represent relative comparisons between architectures.

## Implications for Phase 2

### 1. Plan for ~300 Depots

This provides coverage for 10M+ collectors with acceptable response time.

### 2. Size Drone Fleet at 20,000+ Inspectors

Early detection is critical—invest in inspection capacity.

### 3. Budget 1,500 tonnes/year Propellant

ISRU must supply maintenance fleet propellant at scale.

### 4. Standardize ORUs Across Fleet

Common replacement units simplify inventory and reduce logistics complexity.

## What's Next

This research answers RQ-2-7, providing validated depot architecture for Phase 2 maintenance operations. The 150,000-200,000 km spacing becomes the baseline for infrastructure planning.

Remaining work:
- Propellant supply chain architecture
- Failure mode spatial distribution analysis
- Fleet degradation scenario modeling

---

**Research Question:** [RQ-2-7: Optimal depot spacing and logistics architecture](/questions/depot-spacing-logistics-architecture)

**Interactive Tool:** [Depot Logistics Simulator](/questions/depot-spacing-logistics-architecture/simulator)
