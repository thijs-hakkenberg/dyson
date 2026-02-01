---
questionId: "rq-1-22"
slug: "autonomous-assembly-reliability-target"
title: "Autonomous assembly reliability target (95%+)"
questionType: "experimentation"
priority: "critical"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-4"
sourceBOMItemSlug: "assembly-node"
sourceBOMItemName: "Assembly Node Hub"
relatedBOMItems:
  - "bom-1-4"
  - "bom-1-3"
tags:
  - "reliability"
  - "autonomy"
  - "testing"
  - "assembly"
createdDate: "2026-02-01"
---

## Background

The Assembly Node Hub (ANH) serves as the primary manufacturing and deployment platform for Project Dyson's Phase 1 swarm construction. With a target production throughput of 1–1.7 MW-equivalent of solar collector capacity per month, the ANH must autonomously fabricate, integrate, and deploy solar collector units—either 100 m² thin-film tiles (~45 kg each) or larger membrane structures—using 4–8 robotic manipulator arms with both heavy-lift (500+ kg) and precision (<1 mm) capabilities.

The consensus document explicitly identifies autonomous assembly reliability as an open question, asking whether robotic assembly can achieve "95%+ first-pass success rate" and what ground testing, on-orbit learning, and human-in-the-loop backup strategies are required. This question arises directly from the autonomy-first operational architecture mandated by light-time delays, which limit ground oversight to "policy and exception handling" rather than real-time teleoperation.

## Why This Matters

Achieving the 95%+ first-pass success rate is critical for three interconnected reasons:

**Throughput viability**: At the target rate of 1–1.7 MW-equivalent monthly, the ANH must complete hundreds of assembly operations per month. If first-pass success drops to 85%, the rework burden consumes manipulator time, thermal budget, and consumables—potentially reducing effective throughput by 30–40% when accounting for diagnosis, repositioning, and retry cycles.

**Cascade failure risk**: Failed assemblies that escape detection become debris or malformed swarm elements. With millions of units planned at scale, even a 1% undetected defect rate produces tens of thousands of anomalous collectors that complicate swarm coordination, degrade power collection efficiency, and potentially generate collision hazards.

**Mission timeline impact**: The recommended pathfinder demonstrator mission depends on validating this reliability target at 1/5 scale before committing to full ANH development ($10–18B program cost). Failure to demonstrate achievable reliability thresholds could delay Phase 1 by years or force fundamental architecture changes.

The 10–30 year design life further compounds reliability requirements—manipulator systems must maintain precision tolerances across thousands of thermal cycles and millions of operational cycles without human servicing access.

## Key Considerations

**Precision requirements vs. environmental factors**: The <1 mm positioning accuracy specification must be maintained despite thermal gradients (2.4–4.0 MW rejection capacity implies significant heat flux), structural flexure across 18–340 m hub configurations, and vibration from concurrent manufacturing operations.

**Autonomy tier allocation**: The three-tier hierarchical autonomy model (reflexive/reactive, tactical/task, strategic/mission) must correctly partition assembly decisions. Which failure modes trigger immediate reactive safing versus tactical retry versus strategic ground escalation? Incorrect partitioning either overwhelms ground operators or permits cascading failures.

**Sensor and verification architecture**: First-pass success requires real-time quality verification. What sensor modalities (machine vision, force/torque feedback, dimensional metrology) provide sufficient defect detection without adding mass, power, or failure modes?

**Learning and adaptation**: On-orbit conditions will differ from ground testing. The system must incorporate learning mechanisms to improve success rates over time while maintaining safety constraints—a challenging balance between adaptation and predictability.

**Tool-changing reliability**: The consensus specifies tool-changing systems for manipulators. Each tool change introduces additional failure modes; tool-change reliability directly multiplies into overall assembly reliability.

## Research Directions

1. **Analog ground testing campaign**: Establish a thermal-vacuum assembly testbed replicating ANH manipulator configurations. Execute 10,000+ assembly cycles across representative tile types, measuring first-pass success, failure mode distribution, and degradation trends. Target statistical confidence intervals for the 95% threshold.

2. **Failure mode effects and criticality analysis (FMECA)**: Systematically catalog assembly failure modes (misalignment, incomplete bonding, handling damage, sensor false-positives/negatives) and map each to autonomy tier response. Quantify which failures are recoverable on-orbit versus mission-ending.

3. **Sensor fusion architecture trade study**: Compare verification approaches—stereo vision, structured light, contact probing, electrical continuity testing—against mass, power, reliability, and defect detection probability. Determine minimum viable sensor suite for 95% first-pass with 99% defect detection.

4. **Human-in-the-loop latency simulation**: Model ground operator intervention scenarios at realistic light-time delays (8–20 minutes round-trip depending on orbital location). Determine maximum acceptable intervention rate before throughput degradation exceeds tolerance, establishing the effective floor for autonomous success rate.

5. **Accelerated life testing of manipulator subsystems**: Subject representative manipulator joints, end effectors, and tool-change mechanisms to accelerated thermal cycling and operational loads. Establish degradation curves to predict when precision tolerances will drift below <1 mm threshold, informing servicing intervals and redundancy requirements.
