---
questionId: "rq-2-12"
slug: "failure-mode-distribution"
title: "Swarm element failure mode distribution"
questionType: "meta-research"
priority: "high"
status: "open"
sourcePhase: "phase-2"
sourceBOMItemId: "bom-2-2"
sourceBOMItemSlug: "maintenance-drones"
sourceBOMItemName: "Maintenance Drones"
relatedBOMItems:
  - "bom-2-2"
  - "bom-2-1"
tags:
  - "failure-modes"
  - "repair-strategy"
  - "fleet-sizing"
createdDate: "2026-02-01"
---

## Background

Maintenance Drones for Phase 2 Swarm Expansion represent the autonomous servicing infrastructure required to sustain approximately 10 million satellite collectors in heliocentric orbit. The consensus document establishes a two-tier heterogeneous fleet architecture: lightweight inspection drones (15-50 kg class) for continuous patrol and fault detection, and medium servicer drones (180-250 kg class) for Orbital Replaceable Unit (ORU) replacement and moderate repairs. The recommended approach prioritizes swap-and-replace operations over in-situ repair to reduce robotic complexity and increase sortie tempo.

This question arises because the fleet sizing ratio between inspector and servicer drones—and the tool loadouts each servicer carries—depends entirely on understanding what types of failures actually occur in the swarm. The consensus document explicitly identifies this as an open question: determining what fraction of failures are recoverable by ORU swap versus requiring in-situ repair, structural patching, or full element replacement. Without this data, fleet procurement decisions worth potentially billions of dollars rest on assumptions rather than evidence.

## Why This Matters

The failure mode distribution directly determines three critical project parameters:

**Fleet composition and cost**: Claude's model proposes 35,000 Inspectors and 12,000 Technicians; GPT's approach scales fleet size to failure rates. If 90% of failures are simple ORU swaps, fewer servicers are needed. If 40% require structural repair or welding, the swap-first philosophy may leave significant swarm capacity unrecoverable, or require expensive Phase 3 acceleration.

**Depot logistics and spares inventory**: ORU sizing limits in the consensus (≤8 kg for inspector-serviceable, ≤60 kg for servicer-serviceable) assume certain failure modes dominate. Spares optimization algorithms cannot function without probability distributions across failure categories. Overstocking rare parts wastes launch mass; understocking common parts creates maintenance backlogs.

**Repair capability investment timing**: The consensus recommends developing advanced repair capabilities (welding, brazing, conductor rework) in parallel but deploying only after basic logistics are proven. If failure mode analysis reveals that 25% of failures require capabilities beyond ORU swap, this timeline may be inadequate, risking cumulative swarm degradation during the gap period.

The risk is asymmetric: underestimating complex failure rates leaves the swarm without repair capability when needed; overestimating them wastes resources on capabilities that sit idle.

## Key Considerations

**Collector satellite design maturity**: Failure modes depend heavily on swarm element architecture, which may not be finalized. Analysis must account for design variations or establish requirements that flow back to collector specifications.

**Environmental exposure variations**: Satellites at 0.6 AU experience different thermal cycling, radiation flux, and micrometeorite environments than those at 1.2 AU. Failure distributions likely vary with orbital position, complicating fleet deployment strategies.

**Failure detectability**: Some failure modes (electrical degradation, optical contamination) may be detectable by inspection drones; others (internal mechanism wear, cold-welding per the consensus open questions) may only manifest during attempted repair. This affects the inspector-to-servicer dispatch ratio.

**ORU boundary definitions**: The 8 kg and 60 kg ORU limits assume modular boundaries exist at convenient failure points. If common failures occur at non-modular interfaces (e.g., structural joints, cable harness mid-spans), the swap-first philosophy breaks down.

**Temporal evolution**: Early-life failures (infant mortality from manufacturing defects) differ from wear-out failures at year 10-15. Fleet sizing must accommodate changing distributions over the design lifetime.

## Research Directions

1. **Conduct heritage failure mode analysis**: Compile failure data from ISS ORU replacements, Hubble servicing missions, and commercial GEO satellite anomaly databases. Categorize by repair complexity (inspection-only, ORU swap, in-situ repair, non-recoverable) and map to analogous Dyson swarm subsystems.

2. **Develop probabilistic failure models for candidate collector designs**: Using reliability block diagrams and component-level failure rates from MIL-HDBK-217 or equivalent, simulate 10-year failure distributions for proposed swarm element architectures. Sensitivity analysis should identify which subsystems dominate each repair category.

3. **Define ORU boundary optimization criteria**: Working with swarm element designers, identify failure-prone interfaces and evaluate whether modular boundaries can be repositioned to maximize swap-recoverable failures. Quantify mass and complexity penalties for increased modularity.

4. **Establish failure taxonomy and classification protocol**: Create standardized categories (e.g., Class I: inspector-diagnosable/self-healing, Class II: ORU swap, Class III: in-situ repair, Class IV: element replacement) with clear criteria. This taxonomy enables consistent data collection once inspection fleet deploys.

5. **Model fleet sizing sensitivity to failure distribution assumptions**: Using the consensus fleet architectures, calculate required drone quantities and depot spares inventories across a range of failure distribution scenarios. Identify threshold values where architecture changes become necessary.
