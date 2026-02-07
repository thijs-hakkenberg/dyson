---
questionId: "rq-1-41"
slug: "software-update-strategy-scale"
title: "Software update strategy at scale"
questionType: "engineering-decision"
priority: "high"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-7"
sourceBOMItemSlug: "swarm-control-system"
sourceBOMItemName: "Swarm Control System"
relatedBOMItems:
  - "bom-1-7"
tags:
  - "software-update"
  - "rollback"
  - "scalability"
createdDate: "2026-02-01"
---

## Background

The Swarm Control System governs autonomous operation of thousands of satellites in heliocentric orbit, each running formally verified software (seL4 or equivalent) on radiation-hardened processors with 512 MB–4 GB nonvolatile storage. The consensus document specifies that nodes must survive 7–30+ days without ground contact and operate with <2.5 kg control subsystem mass and <20 W average power consumption. Given these constraints, the question of how to safely deploy software updates across 1,000–10,000+ distributed nodes becomes critical. Unlike terrestrial systems with reliable connectivity and easy rollback, a faulty patch deployed to heliocentric satellites could render nodes permanently inoperable—with no physical recovery option.

## Why This Matters

A flawed software update strategy poses existential risk to the swarm. Consider the consequences:

- **Mass bricking scenario**: A single defective patch pushed to all nodes simultaneously could disable the entire swarm. With 1–3% annual hardware failure rate already accepted, software-induced failures must approach zero.
- **Collision avoidance dependency**: Nodes execute local collision avoidance without human-in-the-loop, targeting <10⁻⁶ collision probability per node-year. A software bug affecting trajectory prediction or maneuver execution could cascade into physical collisions.
- **Communication bandwidth constraints**: Optical ISL links provide 1–100 Gbps for backbone traffic, but S-band/UHF baseline links to beacons are far more limited. Delta updates must minimize bandwidth consumption while ensuring integrity.
- **Autonomous operation windows**: Nodes may operate 30+ days in free-run mode. Updates must not require continuous ground contact for validation or rollback authorization.
- **Scalability**: The strategy must function identically whether the swarm contains 1,000 or 100,000 nodes, without requiring proportional increases in ground infrastructure.

## Key Considerations

**Rollback architecture**: Each node requires sufficient nonvolatile storage (512 MB–4 GB available) to maintain at least two complete firmware images—active and fallback. The formally verified seL4 kernel must remain immutable or have its own protected recovery partition.

**Update propagation topology**: The three-tier federated architecture (individual nodes → ~100-node clusters → 3–5 beacon/relay spacecraft) suggests updates should cascade downward: beacons receive from ground, cluster coordinators receive from beacons, individual nodes receive from coordinators. This limits simultaneous exposure.

**Cryptographic authentication**: The consensus recommends authenticated, signed broadcasts with per-node identity keys to prevent spoofing. Updates must be cryptographically signed by ground authority and verified locally before installation.

**Staged rollout with canary nodes**: Rather than simultaneous deployment, updates should propagate to small test cohorts first. With ~100 nodes per cluster, deploying to 1–5% of nodes per cluster provides statistical validation before full rollout.

**Health attestation requirements**: Nodes must report post-update health metrics before the update propagates further. Metrics should include: successful boot, collision avoidance subsystem operational, communication links nominal, power consumption within bounds.

**Failure detection latency**: Given 7–30 day autonomous operation windows, the system must detect update failures within hours, not weeks. Local watchdog timers and automated rollback triggers are essential.

**Delta update efficiency**: Full firmware images may exceed practical bandwidth limits. Binary differencing (e.g., bsdiff) can reduce update payloads by 90%+, but increases complexity and rollback storage requirements.

## Research Directions

1. **Analyze terrestrial precedents at scale**: Study over-the-air update architectures from automotive (Tesla, GM) and IoT fleet management (AWS IoT, Azure Sphere) for staged rollout patterns, rollback mechanisms, and failure rate statistics across millions of devices.

2. **Define minimum viable rollback partition scheme**: Determine storage allocation between active image, fallback image, and delta cache given the 512 MB–4 GB constraint. Model storage requirements for maintaining N-version rollback capability.

3. **Develop canary cohort selection algorithm**: Design criteria for selecting test nodes that maximize coverage of hardware variants, orbital positions, and operational states while minimizing risk to critical swarm functions (cluster coordinators, high-traffic relay nodes).

4. **Prototype cryptographic verification pipeline**: Implement and benchmark signature verification (Ed25519 or similar) on candidate rad-hard RISC-V processors to establish verification latency and power consumption per update package.

5. **Simulate cascading failure scenarios**: Using the recommended 10,000+ node Monte Carlo simulation environment, inject software update failures at various propagation stages to quantify blast radius and validate containment mechanisms under realistic communication delays and node failure rates.
