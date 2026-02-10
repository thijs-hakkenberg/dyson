---
questionId: "rq-0-42"
slug: "autonomous-excavation-adaptation"
title: "Autonomous excavation adaptation to voids and heterogeneous material"
questionType: "engineering-decision"
status: "open"
priority: "high"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-2"
sourceBOMItemSlug: "mining-robots"
sourceBOMItemName: "Mining Robots"
relatedBOMItems:
  - "bom-0-2"
parentQuestionId: "rq-0-26"
relatedResearchQuestions:
  - "rq-0-6"
  - "rq-0-39"
tags:
  - "autonomy"
  - "excavation"
  - "adaptation"
  - "heterogeneous-material"
  - "voids"
createdDate: "2026-02-10"
---

## Background

Rubble pile asteroids like Bennu and Ryugu have been shown to contain significant internal voids, boulders of varying size, and heterogeneous material composition. The dual bucket-wheel excavation system validated in rq-0-26 must operate autonomously for months without ground intervention. When the excavator encounters an unexpected void (sudden loss of resistance), a large boulder (sudden spike in resistance), or a material transition (e.g., from loose regolith to consolidated matrix), it must adapt in real-time to avoid damage, maintain excavation efficiency, and continue autonomous operations.

## Why This Matters

Autonomous adaptation capability determines:
- Robot operational lifetime (encountering unexpected material causes damage if not managed)
- Excavation throughput consistency (stops and restarts reduce annual yield)
- Fleet reliability (each failure removes capacity from the mining operation)
- Ground intervention frequency (adaptation failures require human decision-making)
- Minimum fleet size for reliable throughput (more robust robots = fewer needed)

At 1,000+ tonnes per robot per year over a 5-year lifetime, each robot will encounter thousands of material transitions and heterogeneities. The adaptation system must handle these routinely without human input.

## Key Considerations

- Void encounter could cause loss of anchoring or sudden robot movement
- Boulder encounter could stall bucket wheels, overload motors, or break teeth
- Material transitions change optimal excavation speed and depth of cut
- Sensing lag (camera, force/torque) limits reaction time at excavation speed
- Learning from one robot's experience could benefit the fleet (shared adaptation)
- Pre-mapping with ground-penetrating radar reduces but cannot eliminate surprises

## Research Directions

1. **Force-torque sensing requirements**: Define the sensing bandwidth and resolution needed to detect material transitions within one bucket revolution, enabling real-time speed and depth adjustment.

2. **Void encounter protocols**: Design autonomous responses to sudden loss of cutting resistance, including anchoring system response and safe retreat procedures.

3. **Boulder management strategies**: Develop decision algorithms for whether to excavate around, break through, or relocate when encountering boulders larger than bucket capacity.

4. **Fleet learning architecture**: Design a system where excavation experience from one robot (material maps, adaptation outcomes) is shared with the fleet to improve collective performance.

5. **Simulation environment development**: Create a high-fidelity excavation simulator with heterogeneous asteroid models for training and validating autonomous adaptation algorithms before deployment.
