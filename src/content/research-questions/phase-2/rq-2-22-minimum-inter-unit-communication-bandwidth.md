---
questionId: "rq-2-22"
slug: "minimum-inter-unit-communication-bandwidth"
title: "Minimum Inter-Unit Communication Bandwidth"
questionType: "analysis"
priority: "high"
status: "open"
sourcePhase: "phase-2"
sourceBOMItemId: "bom-2-1"
sourceBOMItemSlug: "collector-units-phase-2"
sourceBOMItemName: "Collector Units (Phase 2)"
relatedBOMItems:
  - "bom-2-1"
  - "bom-1-8"
  - "bom-1-7"
tags:
  - "communications"
  - "bandwidth"
  - "swarm"
  - "coordination"
category: "communications"
createdDate: "2026-02-09"
arxivSources:
  - "1805.03737"
  - "2302.14587"
---

## Background

Effective swarm coordination requires inter-unit communication to share state information, propagate commands, and achieve consensus. The minimum bandwidth required per unit fundamentally constrains hardware design, power allocation, and coordination algorithm selection. At Dyson swarm scales, communication hardware represents a significant fraction of unit mass and power budget.

Research papers arXiv:1805.03737 and arXiv:2302.14587 analyze communication requirements for large-scale distributed space systems, providing models for bandwidth needs under various coordination paradigms and identifying tradeoffs between communication capacity and system performance.

The communication subsystem design must balance multiple competing requirements: sufficient bandwidth for coordination, acceptable power consumption, manageable hardware mass, and resilience to interference and jamming in a dense RF environment.

## Why This Matters

This question carries **high priority** because communication hardware sizing directly affects unit mass, cost, and power budget at every unit across the entire swarm.

**Mass Budget Impact**: Communication transceivers, antennas, and associated power systems contribute to unit mass. Over billions of units, even small mass increases represent enormous aggregate launch mass during Phase 1 or processing requirements during Phase 2 ISRU.

**Power Budget Impact**: RF transmission power scales with data rate and range requirements. Communication power consumption competes with other unit functions and reduces net power available for transmission to Earth or other productive uses.

**Coordination Capability**: Bandwidth constraints limit what coordination algorithms are feasible. Insufficient bandwidth may preclude distributed consensus, require hierarchical communication architectures, or limit response speed to dynamic conditions.

**Interference Management**: Dense RF environments with billions of transmitters require careful spectrum management. Higher per-unit bandwidth requirements increase spectrum congestion and may require more sophisticated interference mitigation.

**Cost Scaling**: Communication hardware costs scale with capability. Understanding minimum requirements avoids over-specification that wastes resources while ensuring sufficient capability for operational needs.

## Key Considerations

**Coordination Algorithm Requirements**: Different coordination approaches have vastly different communication needs. Local-only algorithms (each unit communicates with immediate neighbors) require less bandwidth than global consensus algorithms (all units participate in distributed agreement).

**Update Rate vs. Bandwidth**: Bandwidth requirements scale with update rate. Slower coordination cycles reduce bandwidth needs but may limit swarm responsiveness to changing conditions or emergencies.

**State Vector Size**: Each unit must communicate its state (position, velocity, health, task status) to neighbors or coordinators. State vector size directly determines per-update bandwidth requirements.

**Compression Opportunities**: Predictable state trajectories enable differential encoding or predictive compression. The achievable compression ratio depends on state predictability and acceptable latency.

**Hierarchical Communication**: Hierarchical architectures where local clusters communicate internally and exchange summaries externally can dramatically reduce average bandwidth requirements while maintaining coordination capability.

**Asymmetric Communication**: Units may have different transmit and receive bandwidth. Asymmetric designs (low transmit, high receive) may optimize for scenarios where commands flow down from coordinators and status flows up.

**Emergency vs. Routine**: Routine coordination may require low bandwidth while emergency responses (collision avoidance, swarm reconfiguration) require burst capacity. Sizing for peak vs. average loads affects hardware requirements.

## Research Directions

1. **Algorithm-Specific Bandwidth Modeling**: Analyze candidate swarm coordination algorithms to determine their bandwidth requirements as a function of swarm size, update rate, and reliability requirements.

2. **Communication Architecture Tradeoff Study**: Compare flat, hierarchical, and hybrid communication architectures to identify optimal approaches for Dyson-scale deployment considering bandwidth, latency, and fault tolerance.

3. **Hardware Survey and Projection**: Survey available and projected space-qualified communication hardware to determine achievable bandwidth/mass/power ratios and identify technology development needs.

4. **Interference Simulation**: Model the RF environment of a dense swarm to determine spectrum management requirements and identify bandwidth limitations imposed by interference rather than hardware.

5. **Minimum Viable Coordination Definition**: Define the minimum coordination capability required for safe swarm operation and derive bandwidth requirements from this operational baseline.
