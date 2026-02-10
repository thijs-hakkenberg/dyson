---
slug: "deployment-optimization-strategy-findings"
title: "Batch Wins: Comparing 4 Swarm Deployment Strategies via Monte Carlo"
description: "Monte Carlo comparison of sequential, batch, greedy, and NN-guided deployment strategies shows batch deployment wins 100% of runs. Deployment-regime NN retraining (val MSE 0.0005) fixes accuracy but not strategy — uniform-radius slots make NN trajectory optimization structurally irrelevant."
author: "Research Team"
date: "2026-02-10"
category: "Research"
tags:
  - "simulation"
  - "research-question"
  - "phase-1"
  - "deployment"
  - "trajectory-optimization"
  - "monte-carlo"
relatedPhases:
  - "phase-1"
---

# Batch Wins: Comparing 4 Swarm Deployment Strategies via Monte Carlo

Deploying 1,000+ collector units from an L1 assembly node to heliocentric orbits is a combinatorial logistics problem. The order in which units are placed, the trajectories they follow, and how tugs are reused all determine whether the deployment finishes in years or decades, and whether the propellant budget is feasible or blown. We built a Monte Carlo trajectory simulator to compare four deployment strategies head-to-head.

## The 4 Strategies

### Sequential (Round-Robin)

The simplest approach: deploy units one at a time to orbital slots in index order. Each tug picks up the next unit in the queue, delivers it to the next slot, and returns to L1. No optimization, no lookahead. This is the baseline.

### Batch (Cluster Delivery)

Group nearby orbital slots into clusters and deploy entire batches together. A tug delivers the first unit in a cluster, then transfers to nearby slots for subsequent units before returning to L1. Intra-cluster transfers are short, cheap hops compared to L1 round trips.

### Greedy (Nearest First)

At each decision point, the tug selects the nearest unfilled orbital slot from its current position. This locally optimal strategy avoids long transits but has no global awareness of slot distribution.

### NN-Guided (ML-Optimized)

A neural network trajectory estimator predicts transfer costs between arbitrary orbit pairs, enabling smarter slot selection than the greedy heuristic. The NN is a trained 3-layer MLP (128 neurons per layer, trained on 500K Hohmann transfer pairs, validation MSE 0.0049). However, it has a fundamental domain mismatch: the training data spans 0.3-3.0 AU transfers with delta-V ranging from 2.88 to 28,981 m/s, while deployment transfers operate in a narrow 0.99-1.01 AU band costing only 50-500 m/s. A bias floor (~0.15 in normalized output) causes the NN to overestimate these small transfers by 50-80x. A Hohmann sanity check catches this -- if the NN estimate exceeds 3x the Hohmann baseline, the system falls back to Hohmann. In practice, this triggers for every deployment-scale transfer, making NN-guided functionally equivalent to sequential deployment.

## The Result: Batch Dominates

Across all Monte Carlo runs with 500 units and a 50 km/s total ΔV budget, batch deployment wins 100% of the time.

| Strategy | ΔV Used (km/s) | Duration (days) | Propellant (tonnes) | Units Deployed | Completion Rate |
|----------|----------------|-----------------|---------------------|----------------|-----------------|
| **Batch** | **50.3** | **2,555** | **12.1** | **241** | **48%** |
| Sequential | 50.3 | 3,218 | 12.0 | 161 | 32% |
| Greedy | 50.2 | 3,412 | 12.0 | 200 | 40% |
| NN-Guided | 50.3 | 3,212 | 12.0 | 161 | 32% |

Batch deploys 48% of units compared to 32% for sequential -- a 50% improvement in deployment count within the same ΔV budget. It also finishes faster, completing its deployable set in 2,555 days versus 3,200+ for other strategies.

## Why Batch Wins

The advantage comes from three compounding effects:

### 1. Intra-Batch Transfers Are ~70% Cheaper

Once a tug reaches a cluster region, transferring between nearby slots costs a fraction of a full L1 round trip. A typical L1-to-slot transfer might cost 3-5 km/s, while an intra-cluster hop costs 0.5-1.5 km/s. Batch deployment exploits this by chaining 4-8 deliveries per outbound trip.

### 2. Fewer Return Trips

Sequential deployment requires one L1 return trip per unit. Batch deployment requires one return trip per cluster (4-8 units). This alone reduces deadhead transit by 75%.

### 3. More Efficient Tug Utilization

Tugs spend more time delivering and less time in transit. The batch strategy completes in 2,554 days because tugs are doing useful work on every leg. Sequential tugs waste 60%+ of their flight time on empty returns.

## The ΔV Budget Problem

The most striking finding is not which strategy wins, but that **none of them can deploy all 500 units within 50 km/s**.

Even the best strategy (batch) only deploys 48% of units before exhausting the ΔV budget. This reveals a fundamental constraint: 50 km/s is insufficient for full deployment of 500 units from L1 to distributed heliocentric orbits.

**Estimated ΔV requirements for full deployment:**

| Target | Required ΔV (km/s) |
|--------|-------------------|
| 50% deployment | ~50 |
| 75% deployment | ~75 |
| 100% deployment | ~100 |

This has major implications for Phase 1 planning: either the ΔV budget must increase (more propellant, more tugs), or the deployment architecture needs redesigning (multiple assembly nodes, staged deployment from different orbital positions).

## Scaling Behavior

We tested all four strategies across different swarm sizes to understand how performance scales.

| Units | Batch Deployed | Sequential Deployed | Batch Advantage | Propellant (Batch) |
|-------|---------------|--------------------|-----------------|--------------------|
| 100 | 85 (85%) | 62 (62%) | +37% | 4.8 tonnes |
| 500 | 241 (48%) | 161 (32%) | +50% | 12.1 tonnes |
| 1,000 | 390 (39%) | 258 (26%) | +51% | 18.3 tonnes |
| 2,000 | 612 (31%) | 402 (20%) | +52% | 28.7 tonnes |

Key observations:

- **Batch advantage grows with scale.** At 100 units batch is 37% better; at 2,000 units it is 52% better.
- **All strategies hit the same ΔV ceiling.** No strategy achieves full deployment at any scale above ~100 units within 50 km/s.
- **Propellant scales sub-linearly.** Doubling units does not double propellant because batch clustering becomes more efficient with denser slot distributions.

## What About the Neural Network?

The NN-guided strategy was designed to outperform greedy by using learned transfer cost estimates that account for orbital phasing, gravitational perturbations, and time-dependent geometry. We explored two generations of NN training.

### Generation 1: Broad-Domain NN (0.3-3.0 AU)

The initial NN was trained on 500K Hohmann transfer pairs spanning 0.3-3.0 AU, achieving a validation MSE of 0.0049 -- accurate for general interplanetary transfers. But deployment transfers operate in a narrow 0.99-1.01 AU band where delta-V costs are 50-500 m/s. The broad-domain NN had a ~5,000 m/s output floor (bias structure in normalized output space), overestimating deployment-scale transfers by 50-80x. A Hohmann sanity check (3x threshold) caught every prediction, causing 100% fallback to analytical Hohmann -- making NN-guided identical to sequential.

### Generation 2: Deployment-Regime NN (0.9-1.1 AU)

We retrained the NN specifically on the deployment regime: 500K samples with orbital radii in 0.9-1.1 AU (70% clustered in the 0.98-1.02 AU core), producing delta-V targets in the 1-3,323 m/s range. The retrained NN achieved validation MSE of 0.0005 -- a 10x improvement -- and produces accurate estimates: ~155 m/s for a typical L1-to-slot transfer at 0.99→1.0 AU, with correct TOF-dependent phasing sensitivity.

**The NN now passes the sanity check** for every deployment transfer. No more Hohmann fallback. The NN-guided strategy uses genuine NN predictions.

**But the strategic outcome didn't change.** NN-guided still matches sequential at 31.8% completion. The reason is structural, not a training failure:

1. **All swarm slots are at the same orbital radius** (1.0 AU). The NN receives inputs (r1, r2, tof), and since r2 is identical for every slot, it produces the same radial cost estimate for all candidates.
2. **The only differentiator is angular distance**, which determines the phasing cost. But angular distance is not an NN input -- it is added analytically after the NN call.
3. **The NN-guided slot selection degenerates to angular-proximity ordering**, which is equivalent to sequential when slots are indexed by angle from the assembly node.

This is a fundamental architectural limitation, not a training problem. The NN learns the correct function -- its predictions are accurate to within a few percent of analytical Hohmann -- but it cannot outperform the analytical model because it receives the same inputs for every candidate slot.

### What Would Actually Help

For NN-guided deployment to beat batch, the NN would need:
- **Angular position as an input** (4th dimension: r1, r2, tof, angular_distance)
- **Varying orbital radii** across slots (eccentricity, inclination)
- **Multi-body perturbation data** that creates slot-specific transfer cost differences invisible to the Hohmann model
- **Multi-hop optimization** where the NN evaluates chained transfers (slot A → slot B → slot C), enabling it to discover batch-like clustering automatically

## Try It Yourself

We have published the [interactive simulator](/questions/ml-trajectory-deployment-optimization/simulator) so you can explore these deployment strategies. Configure the swarm size, ΔV budget, and strategy to see how deployment progresses over time. The simulator runs full Monte Carlo sweeps and visualizes unit placement, tug trajectories, and cumulative metrics.

## Methodology

The simulation uses:
- **Hohmann transfer approximations** for L1-to-orbit and orbit-to-orbit ΔV calculations
- **Deployment-regime NN trajectory estimator** (3-layer MLP, 128 neurons, 500K training pairs in 0.9-1.1 AU, val MSE 0.0005) with Hohmann fallback when NN estimate exceeds 3x analytical baseline
- **Cluster assignment** via angular proximity for batch strategy
- **Monte Carlo execution** with randomized initial orbital slot distributions
- **Full tug lifecycle**: pickup at L1, transit to slot, deployment, return (or intra-cluster transfer)
- **50+ runs per configuration** for statistical validity

Results should be interpreted as relative comparisons between strategies. Absolute ΔV and duration values depend on orbital mechanics simplifications and will shift with higher-fidelity propagation.

## Implications for Phase 1

### 1. Adopt Batch Deployment as Baseline Strategy

Batch deployment from L1 should be the default planning assumption for Phase 1 collector deployment. It consistently outperforms alternatives by 50%+ in units deployed per ΔV.

### 2. Increase ΔV Budget or Add Assembly Nodes

50 km/s is insufficient for 1,000-unit deployment. Phase 1 planning should budget ~100 km/s or investigate distributed assembly (multiple L-points, in-orbit assembly) to reduce per-unit transfer costs.

### 3. NN Trajectory Estimation Is Accurate but Strategically Irrelevant

Retraining the NN on the deployment regime (0.9-1.1 AU) achieved 10x better accuracy (val MSE 0.0005) and produces correct estimates (~155 m/s for typical transfers). But NN-guided deployment still matches sequential because uniform-radius swarm slots give the NN identical inputs for every candidate. Future work should either add angular position as a 4th NN input or focus on multi-hop chain optimization where the NN evaluates sequences of transfers rather than individual hops.

### 4. Standardize Tug Operations for Cluster Delivery

Tug fleet design should optimize for cluster delivery patterns: multi-unit payload capacity, efficient station-keeping during intra-cluster hops, and rapid turnaround at L1.

## What's Next

This research partially answers RQ-1-43, establishing batch deployment as the clear winner among tested strategies. The NN trajectory estimator has been retrained on the deployment regime (0.9-1.1 AU, val MSE 0.0005) and produces accurate cost estimates, but provides no strategic advantage because uniform-radius slot selection is phasing-dominated and the NN cannot see angular position. Full resolution requires:
- Multi-hop NN optimization that evaluates transfer chains, not individual hops
- Adding angular position as a 4th NN input dimension
- Higher-fidelity orbital mechanics (patched conics, n-body) to create slot-specific cost variations
- Multi-tug fleet coordination modeling
- Integration with swarm control system architecture (bom-1-7)

---

**Research Question:** [RQ-1-43: ML trajectory optimization for swarm deployment](/questions/ml-trajectory-deployment-optimization)

**Interactive Tool:** [Deployment Trajectory Simulator](/questions/ml-trajectory-deployment-optimization/simulator)
