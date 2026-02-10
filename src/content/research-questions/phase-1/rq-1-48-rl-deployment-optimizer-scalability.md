---
questionId: "rq-1-48"
slug: "rl-deployment-optimizer-scalability"
title: "Reinforcement learning deployment optimizer and 100K+ unit scalability"
questionType: "simulation"
priority: "low"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-7"
sourceBOMItemSlug: "swarm-control-system"
sourceBOMItemName: "Swarm Control System"
relatedBOMItems:
  - "bom-1-7"
  - "bom-1-1"
  - "bom-1-6"
relatedResearchQuestions:
  - "rq-1-43"
  - "rq-1-19"
  - "rq-1-24"
tags:
  - "reinforcement-learning"
  - "trajectory-optimization"
  - "scalability"
  - "deployment-sequencing"
createdDate: "2026-02-10"
---

## Background

The RQ-1-43 ML trajectory deployment optimizer uses a trained MLP for delta-V estimation combined with greedy/NN-guided heuristics to sequence swarm unit deployment. The NN has been retrained on the deployment regime (0.9-1.1 AU, val MSE 0.0005) and produces accurate transfer cost estimates, but the NN-guided strategy matches sequential performance because all swarm slots share the same orbital radius -- the NN receives identical (r1, r2) for every candidate and cannot differentiate them. This structural limitation, plus scalability challenges, motivate exploration of RL-based approaches.

## Why This Matters

The current simulator achieves ~95% accuracy for deployment cost estimation at Phase 1 scale but cannot address:

**Reinforcement learning gaps:**
- The current NN-guided strategy uses a trained estimator with greedy optimization, not true RL policy learning. Even with a retrained deployment-regime NN, the strategy cannot outperform sequential because it evaluates individual hops, not multi-hop chains.
- An RL agent (e.g., PPO or SAC) could learn deployment policies that discover batch-like clustering automatically by optimizing over sequences of transfers
- Policy transfer from small (1K unit) training environments to large (100K+) deployment scenarios requires curriculum learning or hierarchical decomposition

**Scalability challenges:**
- Combinatorial explosion: 100K units with 50 tugs creates an action space that greedy methods cannot effectively search
- The current O(N^2) nearest-neighbor search in the greedy strategy becomes prohibitive above ~10K units
- Hierarchical decomposition (cluster-level planning + intra-cluster sequencing) is needed but not implemented

**Real-time replanning:**
- Anomaly response: tug failures, missed insertion windows, collision avoidance maneuvers require online replanning
- The current strategies assume deterministic execution without contingency handling
- Real-time NN inference for replanning requires model distillation to run on flight-grade processors

**N-body trajectory propagation:**
- Current Hohmann/NN approximation ignores gravitational perturbations from planets during multi-month transfers
- High-fidelity N-body propagation for 100K+ concurrent transfers requires GPU-accelerated integration
- Low-thrust trajectory optimization (for electric propulsion tugs) differs fundamentally from impulsive Hohmann assumptions

## Simulation Approach

This question requires GPU-accelerated RL training infrastructure (PPO/SAC with vectorized environments) and high-fidelity orbital mechanics propagation. The recommended approach is offline training with policy export for browser-based visualization of learned deployment strategies.
