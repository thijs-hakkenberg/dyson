---
questionId: "rq-0-52"
slug: "low-thrust-trajectories-cadence"
title: "Low-thrust trajectories and cycle cadence to candidate NEAs"
questionType: "simulation"
status: "open"
priority: "high"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-4"
sourceBOMItemSlug: "transport-vehicles"
sourceBOMItemName: "Transport Vehicles"
relatedBOMItems:
  - "bom-0-4"
  - "bom-0-1"
relatedResearchQuestions:
  - "rq-0-19"
  - "rq-0-16"
tags:
  - "trajectory"
  - "low-thrust"
  - "cadence"
  - "transport"
createdDate: "2026-10-12"
---

## Background

The panel agrees tugs need 1–2.5 MWe but not on cadence. Claude and GPT get 1.5–3 years per round trip, limited by windows. Gemini gets 3.8 years including synodic waits. Propellant demand differs 2–7× partly for this reason (per-cycle vs continuous burn-duty accounting).

Raised by the Phase 0 re-assessment (round 2, 2026-10-12): `reconciliation/phase-0/round-2/reconciliation/phase.md` and `reconciliation/phase-0/decisions.md`.

## Why This Matters

Cadence sets fleet size, propellant demand (D-05) and whether ~1 kt/yr can be delivered at all. The "8 km/s" access bound in the gates should be replaced by integrated trajectory closure (GPT).

## How this gets answered

- **Simulation** — Low-thrust trajectory optimisation (solar-power variation with distance, departure/return windows) for the top ~10 candidates, at 1–2.5 MWe and Isp 2,000–3,000 s.

## Research Directions

1. Report Δv, time of flight and synodic constraints per candidate.
2. Derive fleet size and annual propellant per architecture.
3. Settle the propellant demand method (rapporteur note 5).
