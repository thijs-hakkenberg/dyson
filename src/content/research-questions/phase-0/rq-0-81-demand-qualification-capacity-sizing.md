---
questionId: "rq-0-81"
slug: "demand-qualification-capacity-sizing"
title: "What counts as bankable demand for Phase 0 output, and what nameplate capacity does it justify?"
questionType: "analysis"
status: "open"
priority: "critical"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-7"
sourceBOMItemSlug: "organizational-infrastructure"
sourceBOMItemName: "Organizational Infrastructure"
relatedBOMItems:
  - "bom-0-7"
  - "bom-0-3"
relatedResearchQuestions:
  - "rq-0-58"
  - "rq-0-61"
  - "rq-0-68"
tags:
  - "demand-gate"
  - "offtake"
  - "capacity-sizing"
  - "economics"
createdDate: "2026-10-20"
---

## Background

The owner has ruled that "within 3×" is a quantity ratio and that "signed" demand means specified, financially backed commitments (`gate-rulings.yaml` G-1.1, G-1.2). Still open from rq-0-68:

- **What backing qualifies.** Claude: committed purchase funding, or a costed Earth-supply baseline that would exist if 0B were cancelled, with an independent signatory. Gemini: binding external offtake or a funded internal Phase 1 line item. GPT: independent budget authority, plus counterparty-performance evidence for external demand.
- **Capacity authorised after a pass.** Claude: an availability-and-yield cap. Gemini: up to 3× demand. GPT: the smallest feasible configuration.
- **The measurement window.**

Feeds decision-sheet items 2.7 and 2.8 and the demand-window item.

## Why This Matters

D-01 sizes 0B by signed Phase 1 demand. Loose terms let the project size 0B on hope; tight ones may rule out the only customer, the project's own Phase 1.

## How this gets answered

- **Literature** — Offtake practice in project finance (take-or-pay, bankability tests, counterparty credit); government anchor-tenant service contracts (NASA COTS, Commercial Crew and CLPS); internal transfer pricing for a captive customer.
- **Simulation** — Capacity against demand under uncertain availability, yield and ramp. What do over-capacity (stranded cost) and under-capacity (Earth-supply top-up) cost per sizing rule? Reuses `isru-economics` and `supply-chain`.
- **Stakeholder** — Project-finance practitioners on whether a captive internal customer can count as bankable demand.

## Research Directions

1. Qualifying-instrument criteria from practice, including how a captive Phase 1 customer is treated.
2. Expected cost of each sizing rule (Claude, Gemini, GPT) under the rq-0-58 demand range.
3. A measurement-window rule that stops demand being shifted between periods.

**Owner decides afterwards:** how much stranded-capacity risk to accept.
