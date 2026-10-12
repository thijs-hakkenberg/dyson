---
questionId: "rq-0-59"
slug: "phase-0-delivery-node"
title: "Phase 0 → Phase 1 delivery node"
questionType: "simulation"
status: "open"
priority: "high"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-4"
sourceBOMItemSlug: "transport-vehicles"
sourceBOMItemName: "Transport Vehicles"
relatedBOMItems:
  - "bom-0-4"
  - "bom-1-4"
relatedResearchQuestions:
  - "rq-0-52"
  - "rq-0-58"
tags:
  - "logistics"
  - "orbit"
  - "sel1"
  - "phase-interface"
createdDate: "2026-10-12"
---

## Background

Claude and Gemini pick SEL1 (Gemini cites a 1.5–2.5 km/s each-way penalty from L4/L5); GPT says auto-relocating to L1 is "too strong" and wants joint optimisation with Phase 1, noting L1 needs station-keeping and traffic management. D-04 uses SEL1 as a reference only.

Raised by the Phase 0 re-assessment (round 2, 2026-10-12): `reconciliation/phase-0/round-2/reconciliation/phase.md` and `reconciliation/phase-0/decisions.md`.

## Why This Matters

Sets tug cadence, the receiving node ($200–600M) and Phase 1 logistics.

## How this gets answered

- **Simulation** — Joint logistics study: candidate NEAs → candidate nodes (SEL1, SEL4/5, EML1, NEA-local storage) with Phase 1 node location as a variable.

## Research Directions

1. Δv, cadence and traffic per node.
2. Re-decide at KDP-0B.
