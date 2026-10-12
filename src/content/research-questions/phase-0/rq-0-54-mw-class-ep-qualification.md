---
questionId: "rq-0-54"
slug: "mw-class-ep-qualification"
title: "MW-class electric propulsion: life, thermal load and plume compatibility"
questionType: "experimentation"
status: "open"
priority: "critical"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-4"
sourceBOMItemSlug: "transport-vehicles"
sourceBOMItemName: "Transport Vehicles"
relatedBOMItems:
  - "bom-0-4"
  - "bom-0-5"
relatedResearchQuestions:
  - "rq-0-16"
tags:
  - "electric-propulsion"
  - "qualification"
  - "thermal"
  - "iodine"
createdDate: "2026-10-12"
---

## Background

The revised architecture relies on 1–2.5 MWe tugs. The panel rates high-power iodine at TRL 2–4 (the TRL table still says 6–7 for "100+ kW SEP"). Life requirements differ: Claude ≥10,000 h; Gemini 5,000 h at ≥100 kWe; GPT total-impulse qualification for the actual 20,000–40,000 h duty. How much of the thrusters' ~0.8 MW of losses the spacecraft must reject is open (Claude: PPU losses only; GPT: must be measured). Gemini raises iodine plume corrosion of arrays.

Raised by the Phase 0 re-assessment (round 2, 2026-10-12): `reconciliation/phase-0/round-2/reconciliation/phase.md` and `reconciliation/phase-0/decisions.md`.

## Why This Matters

Tug life and thermal design are project-ending for the transport chain, and set the propellant choice (D-05).

## How this gets answered

- **Experiment** — Life and wear testing of a MW-class cluster (or 100–250 kW modules toward it); thermal-vacuum measurement of heat conducted into the spacecraft; plume deposition on array coupons.
- **Literature research** — Existing high-power Hall/MPD/VASIMR test data.

## Research Directions

1. Total-impulse qualification plan for the real duty cycle.
2. Thermal load fraction to the bus.
3. Plume compatibility per propellant.
