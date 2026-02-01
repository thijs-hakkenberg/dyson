---
questionId: "rq-1-35"
slug: "non-cooperative-target-capture"
title: "Non-cooperative target capture capability"
questionType: "engineering-decision"
priority: "medium"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-6"
sourceBOMItemSlug: "orbital-tugs"
sourceBOMItemName: "Orbital Tugs"
relatedBOMItems:
  - "bom-1-6"
  - "bom-1-5"
tags:
  - "capture"
  - "rendezvous"
  - "grappling"
  - "autonomy"
createdDate: "2026-02-01"
---

## Background

Orbital Tugs for Phase 1 Initial Swarm Deployment are solar electric propulsion vehicles designed to transport 2,000-8,000 kg payloads throughout the cislunar and heliocentric operating environment. The consensus specification assumes a standardized docking interface (IDSS-derived or project-specific) enabling payload capture, power pass-through, and data connectivity. However, this assumption presupposes that all target objects will be cooperative—actively station-keeping, presenting known interface geometry, and communicating their pose state.

The question of non-cooperative target capture arises because operational reality rarely matches ideal assumptions. During a multi-decade construction campaign involving thousands of assets, some fraction of payloads, partially assembled structures, or even other tugs will inevitably become uncontrolled due to thruster failures, communication loss, attitude control system faults, or collision damage. The consensus document explicitly identifies this as Open Question #5: whether tugs must capture tumbling or uncontrolled payloads requiring vision-based pose estimation and grapple mechanisms.

## Why This Matters

This decision directly impacts tug mass budget, sensor suite complexity, manipulator requirements, autonomy software scope, and unit cost. The consequences cascade through multiple project dimensions:

**Fleet Operations Continuity**: If tugs cannot capture non-cooperative targets, any asset that loses attitude control becomes debris requiring disposal rather than recovery. At projected fleet scales of 800+ tugs and thousands of swarm elements, even a 1% annual failure rate produces dozens of stranded assets per year that cannot be salvaged, refueled, or repositioned.

**Debris Mitigation**: Unrecoverable assets in the operating volume create collision hazards. The consensus recommends graduated autonomy with collision avoidance response times under 1 second, but avoidance is insufficient if debris density grows unchecked. Active debris removal capability provides a mitigation pathway.

**Cost Recovery**: At unit costs ranging from $1.15M (Gemini estimate) to $60-120M (GPT estimate), stranded tugs represent significant capital loss. Non-cooperative capture enables asset recovery, component harvesting, and depot-based repair rather than write-off.

**Contingency Operations**: The divergent views show GPT advocating for Hybrid Service Tugs with chemical backup specifically for "tow truck" contingency operations. Non-cooperative capture capability is the enabling technology for this operational concept.

## Key Considerations

**Sensor Requirements**: Cooperative docking uses relative navigation fiducials (specified in the recommended Swarm Logistics Standard). Non-cooperative capture requires LIDAR-based 3D reconstruction, vision-based pose estimation algorithms, and potentially thermal imaging for tumble characterization. This adds 15-30 kg sensor mass and significant software complexity.

**Manipulator Design**: Standard docking interfaces assume aligned, stationary mating. Capturing tumbling objects requires either a grapple mechanism (robotic arm with end effector) capable of matching target rotation, or net/tether systems for initial stabilization. Robotic arms add 40-80 kg mass and introduce additional failure modes.

**Autonomy Tier Implications**: The consensus specifies fully autonomous execution for collision avoidance and fault response. Non-cooperative capture demands similar autonomy levels—human-in-the-loop control is impractical for matching tumble rates up to several degrees per second with communication latencies of seconds to minutes.

**Thruster Authority**: Matching a tumbling target's motion requires rapid attitude changes. The baseline 8× 22N hydrazine RCS thrusters (Claude specification) may be insufficient; GPT's recommended 200N biprop thrusters provide greater authority for dynamic proximity operations.

**Mission Timeline Impact**: Non-cooperative capture operations may require hours of observation and approach planning versus minutes for cooperative docking, reducing fleet throughput if service tugs are frequently diverted.

## Research Directions

1. **Failure Mode Analysis**: Conduct probabilistic assessment of asset failure modes across the projected 15-year Phase 1 timeline. Quantify expected annual rate of non-cooperative targets by category (communication loss, attitude control failure, collision damage) to establish capture capability requirements.

2. **Sensor Trade Study**: Evaluate LIDAR, stereo vision, and structured light systems for tumble characterization and pose estimation. Determine mass, power, and cost penalties for adding non-cooperative sensing to the baseline tug avionics suite versus concentrating capability in dedicated service tugs.

3. **Manipulator Architecture Survey**: Review heritage grapple systems (Canadarm, MEV, Astroscale ELSA-d) for applicability to tug mass and power constraints. Assess whether a standardized "capture ring" installed on all project assets could simplify grapple design while maintaining non-cooperative utility.

4. **Autonomy Algorithm Benchmarking**: Test vision-based pose estimation algorithms against representative tumble scenarios (0.1-5.0 deg/s rotation rates) in simulation. Establish minimum sensor resolution and processing requirements for safe autonomous approach.

5. **Tiered Capability Assessment**: Model fleet operations with three scenarios—no non-cooperative capability, capability on dedicated service tugs only (1:5 ratio per Claude), and capability on all tugs—to quantify lifecycle cost and debris accumulation differences.
