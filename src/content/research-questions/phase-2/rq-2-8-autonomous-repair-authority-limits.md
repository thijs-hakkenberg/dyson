---
questionId: "rq-2-8"
slug: "autonomous-repair-authority-limits"
title: "Autonomous repair authority limits"
questionType: "discussion"
priority: "high"
status: "open"
sourcePhase: "phase-2"
sourceBOMItemId: "bom-2-2"
sourceBOMItemSlug: "maintenance-drones"
sourceBOMItemName: "Maintenance Drones"
relatedBOMItems:
  - "bom-2-2"
  - "bom-1-3"
tags:
  - "autonomy"
  - "authority"
  - "repair"
  - "risk-management"
createdDate: "2026-02-01"
---

## Background

Maintenance drones for Project Dyson's Phase 2 Swarm Expansion require Level 4+ autonomy as specified in the consensus document, driven by fundamental communication constraints: round-trip light-lag to Earth ranges from 8-16+ minutes depending on orbital position. This latency makes real-time human control impossible for routine operations and creates a critical governance challenge. The fleet architecture—whether Claude's 50,000-unit three-class system, GPT's two-tier MD-A/MD-B structure, or Gemini's 5,000 Weaver units—must operate with autonomous fault detection, task execution, and contingency handling while maintaining human oversight for exceptions. The consensus document explicitly identifies this as an open question: "How much repair authority should drones have without human approval?"

The repair philosophy divergence among models compounds this challenge. Claude supports component-level repair with onboard welding/brazing capability, while Gemini advocates strict "Swap-and-Drop" doctrine with no in-situ repair. GPT recommends swap-first with advanced repair deferred. Each approach implies different risk profiles for autonomous action—replacing a standardized ORU carries different failure consequences than autonomous welding on a structural member.

## Why This Matters

Undefined authority limits create a paralysis-or-catastrophe dilemma. Conservative limits requiring Earth approval for most actions would create operational bottlenecks: with 10 million satellites and failure rates driving fleet sizing, thousands of maintenance events may occur daily. A 16-minute minimum response cycle per approval request would collapse system throughput. Conversely, overly permissive autonomy risks cascading failures—a drone misdiagnosing a fault and executing an inappropriate repair could damage functional satellites or propagate errors across the swarm.

The economic stakes are substantial. Unit costs range from $400K-$20M depending on drone class, but the satellites they service represent the core energy-collection infrastructure. A single autonomous decision error affecting collector optics or structural integrity could destroy assets worth orders of magnitude more than the drone itself. The recommended approach to "deploy inspection fleet first to build reliability datasets" depends on establishing what actions those inspectors can take autonomously during the data-gathering phase.

Fleet management software investment—identified as critical in the consensus—cannot proceed without defined authority boundaries. Predictive maintenance algorithms, task scheduling, and anomaly triage systems require explicit decision trees specifying which conditions trigger autonomous action versus escalation.

## Key Considerations

**Latency constraints**: At 8-16+ minutes round-trip, any operation requiring real-time feedback cannot involve Earth-based approval. Force-controlled manipulation with compliant contact dynamics (specified for all servicer arms) generates continuous feedback loops incompatible with communication delays.

**Operation risk stratification**: ORU swaps using standardized interfaces (≤8 kg inspector-serviceable, ≤60 kg servicer-serviceable) with kinematic datum patterns and blind-mate connectors represent lower-risk operations than structural repairs. The consensus recommendation to prioritize swap-and-replace specifically cites reduced robotic complexity.

**Failure mode uncertainty**: The open question regarding "swarm element failure mode distribution" directly impacts authority design. Without knowing what fraction of failures are recoverable by ORU swap versus requiring in-situ repair, authority thresholds cannot be optimally calibrated.

**Fleet heterogeneity**: Inspector drones (14-52 kg) have different capability envelopes than servicer drones (180-320 kg). Authority limits may need class-specific definitions—GPT's MD-A micro-drones without Hall thrusters have fundamentally different operational profiles than full servicers.

**Depot architecture interaction**: Regional maintenance depots provide communications relay to Earth. Depot spacing (still undefined) affects whether intermediate authority delegation to depot-based systems is feasible.

## Research Directions

1. **Develop a risk-tiered operation taxonomy** categorizing all anticipated maintenance actions by reversibility, asset value at risk, and time-criticality. Map each category to authority levels: fully autonomous, depot-approved, or Earth-approved.

2. **Analyze ISS and satellite servicing mission authority precedents**, particularly Orbital Express, MEV-1/2, and Canadarm operations. Extract lessons on autonomous grapple authority, tool deployment limits, and escalation triggers that achieved acceptable risk profiles.

3. **Model queue dynamics under various authority thresholds** using projected failure rates and fleet sizes. Determine the maximum Earth-approval fraction sustainable without creating maintenance backlogs that degrade swarm performance.

4. **Design a graduated authority expansion protocol** where drones earn increased autonomy based on demonstrated performance. Define metrics, sample sizes, and confidence intervals required before authority upgrades.

5. **Specify depot-level authority delegation architecture** enabling regional approval for medium-risk operations without Earth latency, while maintaining audit trails and override capability for fleet management oversight.
