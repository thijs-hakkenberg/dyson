---
questionId: "rq-2-3"
slug: "billion-unit-collision-avoidance"
title: "Collision avoidance certification for billion-unit swarms"
questionType: "discussion"
priority: "critical"
status: "open"
sourcePhase: "phase-2"
sourceBOMItemId: "bom-2-1"
sourceBOMItemSlug: "collector-satellites"
sourceBOMItemName: "Collector Satellites"
relatedBOMItems:
  - "bom-2-1"
  - "bom-1-7"
tags:
  - "collision-avoidance"
  - "certification"
  - "governance"
  - "swarm"
arxivReferences:
  - "2504.21151"
createdDate: "2026-02-01"
---

## Background

Solar Collector Satellites for Phase 2 Swarm Expansion are designed as autonomous, thin-film membrane spacecraft operating in coordinated formations of unprecedented scale. The consensus specification calls for full autonomous operation (Level 4+) including station-keeping, fault isolation, and swarm coordination, with individual units maintaining **10–50 km minimum separation** using boid-like flocking algorithms. The specification explicitly acknowledges that "human-in-the-loop operations cannot scale to billions of units."

This question arises directly from Open Question #3 in the consensus document: the fundamental challenge of certifying and governing autonomous collision avoidance behaviors when the swarm population reaches billion-unit scales. Unlike traditional spacecraft operations where ground controllers can intervene in anomalies, the sheer number of collector satellites makes centralized oversight physically impossible. Each satellite must make real-time navigation decisions that, in aggregate, determine whether the entire swarm operates safely or cascades into catastrophic collision chains.

## Why This Matters

The consequences of inadequate collision avoidance certification are existential to Project Dyson. A single collision between two 225–2,500 kg satellites traveling at orbital velocities generates debris fields that can trigger Kessler syndrome—a cascading chain of collisions that could render entire orbital shells unusable. At billion-unit scales with 10–50 km separations, even statistically rare failure modes become near-certainties over the 10–25 year operational lifetime.

**Critical dependencies include:**
- **Swarm coordination architecture**: The distributed peer-to-peer mesh networking with hierarchical command structure cannot be finalized until collision avoidance protocols are certified
- **Autonomy software development**: Level 4+ autonomy requirements demand validated behavioral specifications before coding begins
- **Insurance and liability frameworks**: No entity will underwrite billion-unit deployments without certified safety margins
- **International regulatory approval**: Space traffic management authorities require demonstrated compliance before launch authorization

The recommended approach calls for "million-unit swarm coordination simulations" as one of two highest-priority investments. Without certification standards, these simulations have no acceptance criteria.

## Key Considerations

**Scale and statistical behavior**: Traditional spacecraft certification examines individual vehicle reliability. Billion-unit swarms require statistical approaches—what failure rate per unit per year is acceptable? At 10⁹ units over 20 years, even one-in-a-billion annual collision probability yields 20 expected collisions.

**Separation distance tradeoffs**: The 10–50 km minimum separation specification balances collision risk against swarm density. Larger separations reduce collision probability but require more orbital volume, potentially conflicting with power transmission geometry and increasing total swarm orbital footprint.

**Boid algorithm limitations**: Flocking algorithms excel at emergent coordination but can exhibit unexpected collective behaviors at scale. Edge cases—simultaneous thruster failures, communication blackouts, solar storm interference—must be characterized across the full operational envelope.

**Propulsion constraints**: Whether using gridded ion thrusters (Isp 3,000s), Hall-effect thrusters (Isp ~1,600s), or E-Sails, collision avoidance maneuvers consume propellant or power budgets. Certification must account for units with degraded maneuvering capability.

**Verification at scale**: No existing test infrastructure can physically validate billion-unit behaviors. Certification must rely on simulation, formal methods, and statistical inference from smaller deployments.

## Research Directions

1. **Develop probabilistic certification framework**: Establish mathematical foundations for swarm safety certification based on statistical mechanics rather than deterministic analysis. Define acceptable collision probability thresholds (e.g., <10⁻¹² per unit-pair-year) and derive required separation distances, sensor accuracies, and maneuver response times.

2. **Characterize boid algorithm failure modes**: Conduct systematic analysis of flocking algorithm edge cases through formal verification methods and Monte Carlo simulation. Identify parameter combinations that produce unstable collective behaviors, particularly under degraded communication or propulsion scenarios.

3. **Design hierarchical verification architecture**: Propose a tiered certification approach where individual unit behaviors are certified through traditional methods, cluster behaviors (10³–10⁶ units) through high-fidelity simulation, and full-swarm behaviors through statistical extrapolation with validated uncertainty bounds.

4. **Survey existing governance models**: Analyze analogous certification regimes—aviation autopilot certification, autonomous vehicle safety standards, nuclear reactor probabilistic risk assessment—for applicable methodologies. Engage with ITU, COPUOS, and national space agencies to understand regulatory expectations.

5. **Define pathfinder mission certification requirements**: Specify what collision avoidance demonstrations the recommended 0.5–0.8 AU pathfinder missions must achieve to validate scaling assumptions. Establish go/no-go criteria for proceeding from thousands to millions to billions of deployed units.
