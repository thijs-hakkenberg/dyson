---
questionId: "rq-0-40"
slug: "excavation-thermal-volatile-preservation"
title: "Thermal management for volatile preservation during excavation"
questionType: "engineering-decision"
status: "open"
priority: "high"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-2"
sourceBOMItemSlug: "mining-robots"
sourceBOMItemName: "Mining Robots"
relatedBOMItems:
  - "bom-0-2"
  - "bom-0-6"
  - "bom-0-3"
parentQuestionId: "rq-0-26"
tags:
  - "thermal-management"
  - "volatiles"
  - "excavation"
  - "water-preservation"
  - "waste-heat"
createdDate: "2026-02-10"
---

## Background

The dual bucket-wheel excavation system validated in rq-0-26 generates approximately 50 kW of waste heat during continuous operation. For the water-first resource strategy (rq-0-27), preserving volatiles (water ice, organics) during excavation is critical — but mechanical excavation generates heat through friction, and uncontrolled heating of volatile-rich regolith can cause premature sublimation, losing the most valuable resource fraction before it reaches the processing station.

## Why This Matters

Volatile loss during excavation directly reduces:
- Water extraction yield from each tonne of excavated material
- Economic return of the water-first strategy
- Propellant production capacity
- Overall ISRU system efficiency

If excavation-induced heating causes 20-50% volatile loss, the effective water content of delivered material drops from 10-20% to 5-15%, requiring proportionally more material throughput to meet propellant production targets. This cascades into higher excavation rates, more robot wear, and increased power consumption.

## Key Considerations

- 50 kW waste heat distributed across bucket-wheel contact area and housing
- Asteroid surface temperatures vary from ~100 K (shadowed) to ~400 K (sunlit)
- Water ice sublimation begins at ~150 K in vacuum
- Mechanical friction at cutting surfaces creates localized hot spots
- Excavated material in transit from bucket to hopper continues to warm
- Enclosed housing (required for particle containment) traps waste heat
- Shorter material dwell time in heated zones reduces volatile loss

## Research Directions

1. **Thermal modeling of excavation process**: Model heat generation and transfer during bucket-wheel excavation of volatile-bearing regolith, quantifying volatile loss as a function of operating parameters.

2. **Shadow-side excavation strategy**: Evaluate operational concepts where excavation occurs on the shadowed side of the asteroid to minimize solar heating contribution and leverage cold sink temperatures.

3. **Active cooling of cutting surfaces**: Design heat rejection systems for bucket teeth and housing that limit contact temperature below volatile sublimation thresholds.

4. **Material transfer optimization**: Minimize dwell time of excavated material in heated zones through rapid transfer mechanisms between excavator and sealed transport containers.

5. **Volatile loss budget**: Establish acceptable volatile loss percentages at each stage (excavation, transfer, storage, transport) to define thermal requirements for the complete material handling chain.
