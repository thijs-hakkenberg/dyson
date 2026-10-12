---
questionId: "rq-0-51"
slug: "microgravity-beneficiation-ratio"
title: "Beneficiation ratio for native Fe-Ni in microgravity"
questionType: "experimentation"
status: "open"
priority: "critical"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-2"
sourceBOMItemSlug: "mining-robots"
sourceBOMItemName: "Mining Robots"
relatedBOMItems:
  - "bom-0-2"
  - "bom-0-3"
relatedResearchQuestions:
  - "rq-0-10"
  - "rq-0-6"
tags:
  - "beneficiation"
  - "magnetic-separation"
  - "mass-flow"
createdDate: "2026-10-12"
---

## Background

Every closed mass-flow chain from the panel concentrates at the site before shipping: Claude 5–15:1, Gemini ~5–8:1, GPT 4:1 (25% yield). None is backed by data at representative feed in microgravity. Claude names a falsifier: a ratio below 3:1 breaks co-located processing.

Raised by the Phase 0 re-assessment (round 2, 2026-10-12): `reconciliation/phase-0/round-2/reconciliation/phase.md` and `reconciliation/phase-0/decisions.md`.

## Why This Matters

The concentration ratio sets robot count, site power and the product per tonne excavated. Co-location (agreed by all three models) depends on it.

## How this gets answered

- **Experiment** — Magnetic and size separation of representative regolith simulant at reduced gravity (parabolic flight, drop tower, then the 0A pathfinder).
- **Simulation** — DEM of grain transport in the separator to bound throughput.

## Research Directions

1. Build a simulant with realistic metal grain size and attachment (metal bonded in clay matrices is Gemini's falsifier).
2. Measure yield and grade against throughput.
3. Feed the result into rq-0-61.
