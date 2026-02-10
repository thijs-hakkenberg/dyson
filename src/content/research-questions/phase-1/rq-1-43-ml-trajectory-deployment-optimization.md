---
questionId: "rq-1-43"
slug: "ml-trajectory-deployment-optimization"
title: "Machine learning trajectory optimization for swarm deployment sequencing"
questionType: "simulation"
priority: "high"
status: "answered"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-7"
sourceBOMItemSlug: "swarm-control-system"
sourceBOMItemName: "Swarm Control System"
relatedBOMItems:
  - "bom-1-7"
  - "bom-1-1"
  - "bom-1-6"
relatedResearchQuestions:
  - "rq-1-19"
  - "rq-1-24"
  - "rq-1-48"
tags:
  - "trajectory-optimization"
  - "machine-learning"
  - "deployment-sequencing"
  - "swarm-coordination"
arxivReferences:
  - "2205.10124"
createdDate: "2026-02-07"
resolutionStatus: "partially-resolved"
resolutionDate: "2026-02-10"
resolutionSource: "simulation"
resolutionSummary: "Batch deployment strategy wins 100% of Monte Carlo runs, deploying 48% of 500 units within 50 km/s ΔV budget (vs 32% for sequential). NN trajectory estimator trained (val MSE 0.0049) but has a ~5000 m/s floor—unable to represent the small (50-500 m/s) transfers typical of deployment. NN-guided strategy falls back to Hohmann for all deployment-scale transfers, performing identically to sequential."
implications:
  - "Batch deployment from L1 is the baseline strategy for Phase 1"
  - "50 km/s ΔV budget is insufficient for 500 units—need ~100 km/s or more tugs"
  - "NN trained on 0.3-3.0 AU transfers cannot represent the 0.99-1.01 AU deployment regime—needs retraining on deployment-specific transfer geometry"
  - "Propellant use is remarkably consistent across strategies (~12 tonnes for 500 units)"
  - "NN adds value only for large transfers (>1 AU ΔR); no benefit for near-orbit deployment hops"
---

## Background

The Global Trajectory Optimization Competition 11 (GTOC 11) challenged teams to design optimal deployment strategies for a Dyson ring of collector stations around the Sun. The winning solutions (documented in arxiv 2205.10124) demonstrated that machine learning approaches, particularly neural network transfer estimators, can enable rapid trajectory optimization at megastructure scales. This research directly applies to Phase 1's challenge of deploying 1,000 collector units to optimal orbital positions.

Current swarm control system specifications (bom-1-7) describe hierarchical coordination architecture for deployed units but do not specify the methodology for computing optimal deployment sequences. The 1,000-unit Phase 1 deployment, scaling to 100,000+ in Phase 2, represents a combinatorial optimization problem beyond traditional analytical approaches.

## Why This Matters

Efficient deployment sequencing directly impacts Phase 1 schedule and cost. Random or naive deployment wastes propellant, extends timelines, and increases collision risk during the transition period.

**Critical dependencies:**
- **Orbital tug operations (bom-1-6)**: Tugs must execute the deployment sequence; optimization reduces tug fleet requirements
- **Swarm control system implementation**: The control system must incorporate trajectory planning for both deployment and station-keeping
- **Orbital location decisions (rq-1-19)**: Deployment optimization depends on and informs orbital slot selection
- **Collision avoidance during deployment**: Trajectory optimization must ensure safe separation throughout the deployment process

**Resource implications:**
- Suboptimal deployment could consume 2-3x more propellant than necessary
- Extended deployment timelines delay power generation revenue
- Poorly sequenced deployment creates traffic management complexity
- Phase 2 scaling (100x more units) makes optimization essential

## Key Considerations

**GTOC 11 insights (from arxiv 2205.10124):**
- Neural network transfer estimators provide 1000x speedup over Lambert solvers for initial trajectory guesses
- Hierarchical optimization: global station assignment followed by local trajectory refinement
- Time-phased deployment enables construction efficiency while maintaining safe separations
- Multi-asteroid rendezvous techniques apply to multi-unit deployment from assembly nodes

**Phase 1 deployment constraints:**
- Assembly node at Sun-Earth L1/L4 serves as deployment origin
- Collector units have limited propulsion (SRP + ion); trajectories must be propellant-efficient
- 2 km minimum spacing requirement during deployment transitions
- Operational collectors must not be shadowed during deployment of new units

**Optimization objectives:**
- Minimize total deployment time (schedule)
- Minimize aggregate propellant consumption (cost)
- Maximize deployment rate (units per month)
- Maintain collision probability below threshold throughout sequence

**ML architecture considerations:**
- Training data from simplified 2-body trajectories, refined with high-fidelity propagation
- Transfer to larger swarm sizes requires architecture that generalizes
- Real-time replanning capability for handling anomalies
- Integration with hierarchical cluster coordination

## Research Directions

1. **Benchmark GTOC 11 solutions against Phase 1 requirements**: Adapt winning GTOC 11 methodologies to Project Dyson's specific parameters (assembly node location, collector propulsion limits, spacing constraints), establishing baseline deployment performance.

2. **Neural network transfer estimator development**: Train neural networks on the specific transfer geometries between L1/L4 assembly and target collector orbits, achieving sub-second trajectory estimates for the swarm control system.

3. **Deployment sequence optimization study**: Define the combinatorial problem of 1,000-unit deployment and evaluate solution approaches (genetic algorithms, reinforcement learning, hybrid methods) against the benchmark.

4. **Integration with swarm coordination architecture**: Specify how trajectory optimization interfaces with the hierarchical cluster coordination system described in bom-1-7 consensus specifications.

5. **Scalability testing for Phase 2**: Validate that optimization methodologies developed for 1,000 units scale computationally to 100,000+ units, identifying architectural changes needed for Phase 2.

6. **Anomaly response planning**: Develop replanning capabilities for cases where units fail during deployment or unexpected orbital debris requires trajectory modifications.
