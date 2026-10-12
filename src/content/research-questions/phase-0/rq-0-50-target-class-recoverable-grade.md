---
questionId: "rq-0-50"
slug: "target-class-recoverable-grade"
title: "Target asteroid class and recoverable product grade"
questionType: "experimentation"
status: "open"
priority: "critical"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-1"
sourceBOMItemSlug: "prospecting-satellites"
sourceBOMItemName: "Prospecting Satellites"
relatedBOMItems:
  - "bom-0-1"
  - "bom-0-2"
  - "bom-0-3"
relatedResearchQuestions:
  - "rq-0-5"
  - "rq-0-39"
tags:
  - "target-selection"
  - "composition"
  - "fe-ni"
  - "water"
createdDate: "2026-10-12"
---

## Background

The re-assessment panel split on what the first target is. Claude: one site cannot give both products; S-type gives native Fe-Ni, C-type gives water plus magnetite. Gemini: a C/M-type chondrite gives 8–12 wt% metal and 5–10 wt% water from the same feed. GPT: a metal-bearing target with ~20% recoverable metal, as a gate condition. The assumed native-metal content ranges from 2% (LL chondrite) to 20%.

Raised by the Phase 0 re-assessment (round 2, 2026-10-12): `reconciliation/phase-0/round-2/reconciliation/phase.md` and `reconciliation/phase-0/decisions.md`.

## Why This Matters

Recoverable grade is the main sensitivity point of the whole Phase 0B case (D-01). Below ~5% recoverable Fe-Ni, the 0B economics fail at any scale. Whether one site can supply metal and water decides whether ISPP has a role at all (D-05).

## How this gets answered

- **Literature research** — Meteorite-analogue and sample-return literature (LL/L/H/CI/CM; Hayabusa, Hayabusa2, OSIRIS-REx) for native-metal and water content by class, with the spread.
- **Experiment** — 0A rendezvous scouts: remote spectra do not certify bulk grade (GPT). Sample at depth on ≥2 candidates.

## Research Directions

1. Define "recoverable" (grade after beneficiation, not bulk) and the threshold that feeds the target gate.
2. Rank the top ~10 candidates by class confidence and access Δv (with rq-0-52).
3. Specify the minimum sampling campaign that decides the gate.
