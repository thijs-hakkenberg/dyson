---
slug: "deployment-optimization-strategy-findings"
title: "Batch Wins: Comparing 4 Swarm Deployment Strategies via Monte Carlo"
description: "Monte Carlo comparison of sequential, batch, greedy, and NN-guided deployment strategies shows batch deployment wins 100% of runs, deploying 50% more units within the same ΔV budget."
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

A neural network trajectory estimator predicts transfer costs between arbitrary orbit pairs, enabling smarter slot selection than the greedy heuristic. The NN can account for phasing, multi-body effects, and time-dependent geometry that Hohmann approximations miss. **Note:** The NN weights have not yet been trained. The current implementation falls back to Hohmann transfer estimates, making it functionally equivalent to sequential deployment for now.

## The Result: Batch Dominates

Across all Monte Carlo runs with 500 units and a 50 km/s total ΔV budget, batch deployment wins 100% of the time.

| Strategy | ΔV Used (km/s) | Duration (days) | Propellant (tonnes) | Units Deployed | Completion Rate |
|----------|----------------|-----------------|---------------------|----------------|-----------------|
| **Batch** | **50.0** | **2,554** | **12.1** | **241** | **48%** |
| Sequential | 50.0 | 3,212 | 12.0 | 161 | 32% |
| Greedy | 50.0 | 3,180 | 12.0 | 163 | 33% |
| NN-Guided | 50.0 | 3,205 | 12.0 | 162 | 32% |

Batch deploys 48% of units compared to 32% for sequential -- a 50% improvement in deployment count within the same ΔV budget. It also finishes faster, completing its deployable set in 2,554 days versus 3,200+ for other strategies.

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

The NN-guided strategy is designed to outperform greedy by using learned transfer cost estimates that account for orbital phasing, gravitational perturbations, and time-dependent geometry. A trained NN could identify non-obvious transfer windows that are invisible to Hohmann approximations.

**Current status:** The NN weights have not yet been trained. An offline Python training script is available that generates trajectory training data from the simulation's orbital mechanics model. Until trained, the NN-guided strategy falls back to Hohmann estimates, which explains why its performance matches sequential deployment almost exactly.

**What a trained NN could unlock:**
- Better-than-Hohmann transfer estimates, potentially finding low-energy manifold transfers
- Dynamic slot reordering based on current orbital geometry
- Phasing-aware deployment that exploits planetary alignment windows
- Performance that could approach or exceed the batch strategy

Training the NN is one of the key next steps to fully resolve this research question. The status remains "partially-resolved" until the NN-guided strategy can be evaluated with trained weights.

## Try It Yourself

We have published the [interactive simulator](/questions/ml-trajectory-deployment-optimization/simulator) so you can explore these deployment strategies. Configure the swarm size, ΔV budget, and strategy to see how deployment progresses over time. The simulator runs full Monte Carlo sweeps and visualizes unit placement, tug trajectories, and cumulative metrics.

## Methodology

The simulation uses:
- **Hohmann transfer approximations** for L1-to-orbit and orbit-to-orbit ΔV calculations
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

### 3. Train the NN Trajectory Estimator

The NN-guided strategy has untapped potential. Training the neural network on high-fidelity trajectory data could reveal transfer optimizations that break the Hohmann approximation ceiling.

### 4. Standardize Tug Operations for Cluster Delivery

Tug fleet design should optimize for cluster delivery patterns: multi-unit payload capacity, efficient station-keeping during intra-cluster hops, and rapid turnaround at L1.

## What's Next

This research partially answers RQ-1-43, establishing batch deployment as the clear winner among tested strategies. Full resolution requires:
- Training and evaluating the NN trajectory estimator
- Higher-fidelity orbital mechanics (patched conics, n-body)
- Multi-tug fleet coordination modeling
- Integration with swarm control system architecture (bom-1-7)

---

**Research Question:** [RQ-1-43: ML trajectory optimization for swarm deployment](/questions/ml-trajectory-deployment-optimization)

**Interactive Tool:** [Deployment Trajectory Simulator](/questions/ml-trajectory-deployment-optimization/simulator)
