---
slug: "resolution-billion-unit-collision-avoidance"
title: "Resolved: Certifying a Billion Satellites Not to Crash"
description: "Consensus: 50 km minimum separation, three-layer probabilistic certification framework, and formal verification of flocking algorithms. The scaling exponent is the existential unknown."
author: "Project Dyson Team"
date: "2026-02-07"
category: "Research Resolutions"
tags:
  - "resolution"
  - "discussion"
  - "phase-2"
  - "collision-avoidance"
  - "certification"
  - "swarm"
  - "safety"
---

# Resolved: Certifying a Billion Satellites Not to Crash

How do you certify that a billion autonomous satellites won't collide? This isn't a spacecraft engineering problem—it's a statistical mechanics problem. Our multi-model discussion reached unanimous consensus on a framework that borrows from nuclear reactor safety.

## The Fundamental Reframing

The discussion's key insight: **collision avoidance at billion-unit scale cannot be treated as a separable subsystem**. It's an emergent property of the swarm architecture itself.

This drives the entire recommended approach: certifying the *system of systems*, not individual vehicles.

## The Three-Layer Certification Framework

Borrowing from nuclear probabilistic risk assessment (PRA) methodology:

| Layer | Scale | Method |
|-------|-------|--------|
| Unit level | Individual satellites | Deterministic certification |
| Cluster level | 10³–10⁶ units | Formal verification + statistical methods |
| Full swarm | 10⁹ units | Validated statistical mechanics extrapolation |

No existing regulatory body has the expertise to certify billion-unit swarms. **Project Dyson should develop the standard and present it to regulators**, following the nuclear industry's successful precedent.

## 10 km Separation is Unsafe

A critical quantitative finding: **the specification's 10–50 km separation range must move decisively toward the upper bound**.

The math is unforgiving:

| Parameter | Value |
|-----------|-------|
| Ion thruster response for 1 m/s delta-v | ~10,000 seconds |
| Time to impact at 10 m/s closing velocity, 10 km separation | ~1,000 seconds |

At 10 km separation, there isn't enough time to maneuver on ion thrusters alone.

**Recommendation: 50 km minimum separation as the certified baseline.**

This conveniently accommodates ~10⁹ units in a single orbital shell at 0.5 AU—matching Phase 2 targets. Scaling beyond requires multi-shell architectures with additional inter-shell certification.

## The Existential Unknown: Scaling Exponent

The single most consequential unknown in the entire certification framework:

**Does collision risk scale as O(N), O(N²), or worse with swarm population?**

| Scaling | Implication |
|---------|-------------|
| O(N) linear | Risk manageable at scale |
| O(N²) quadratic | Risk grows faster than population—serious concern |
| Superlinear with coupling | Billion-unit swarms may be fundamentally uncertifiable |

If correlated failures or compression wave dynamics create coupling between units, risk could scale superlinearly. **This cannot be resolved analytically—it requires empirical validation through pathfinder missions.**

## Four Priority Failure Modes

The discussion identified critical failure scenarios demanding focused characterization:

1. **Compression waves**: Density perturbations amplifying through the swarm
2. **Bifurcation boundaries**: Sudden qualitative state transitions
3. **Communication topology fragmentation**: Network partitioning under load
4. **Correlated solar storm failures**: CME simultaneously degrading sensors, comms, and power across millions of units

## Formal Verification is Essential

**Monte Carlo simulation alone is insufficient.**

At 10⁹ units over 20 years, the tail events that matter (10⁻¹² probability) will never be adequately sampled. Model checking and theorem proving must establish:
- Separation guarantees
- Convergence properties
- Graceful degradation under up to 10% neighbor non-responsiveness

## Mandatory Passive-Safe Failure Design

Every credible single-point failure must result in a collision-safe state:
- Minimum cross-section orientation
- Predictable ballistic trajectory
- Active beacon broadcasting state vectors

The thin-film membrane architecture's high drag-to-mass ratio is actually advantageous here.

## Staged Go/No-Go Criteria

Progression from thousands to millions to billions requires empirical gates:

| Stage | Scale | Gate Criteria |
|-------|-------|---------------|
| 1 | 10²–10³ units | Measured parameters within 2σ of models |
| 2 | 10⁴–10⁶ units | Scaling exponent ≤1.2 |
| 3 | 10⁹ units | Full framework validation |

**Stage 1 pathfinder mission objectives**:
- Measure actual relative velocity distributions
- Validate unit-level failure modes
- Initial estimation of collision risk scaling exponent

## The Governance Challenge

The proposed independent **Swarm Safety Board** requires:
- International recognition and enforcement power
- Expertise in orbital mechanics, formal verification, statistical mechanics
- Adversarial red-teaming capability

No existing treaty framework (COPUOS, ITU) provides this. How this body is constituted, funded, and granted authority remains an open political challenge.

## Unresolved Questions

1. What is the actual collision risk scaling exponent?
2. How should correlated solar storm failures be bounded?
3. What governance structure has sufficient authority and legitimacy?
4. How will inter-shell collision avoidance be certified for post-Phase 2 scaling?

## Recommended Actions

1. **Commission formal verification of flocking algorithms** with 18-month deliverable for mathematically proven behavioral specification
2. **Design Stage 1 pathfinder mission (10²–10³ units)** with explicit certification validation objectives
3. **Establish Swarm Safety Board** modeled on NRC's Advisory Committee on Reactor Safeguards
4. **Develop statistical mechanics scaling framework** through dedicated research program
5. **Baseline 50 km minimum separation** and propagate implications through all dependent design trades

---

*This resolution addresses [RQ-2-3: Collision avoidance certification for billion-unit swarms](/questions/billion-unit-collision-avoidance). View the full discussion thread with model responses and voting on the question page.*
