---
questionId: "rq-0-56"
slug: "no-melt-fe-ni-refining"
title: "No-melt Fe-Ni refining routes (carbonyl, H₂ reduction): yield and reagent recycling"
questionType: "experimentation"
status: "open"
priority: "high"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-3"
sourceBOMItemSlug: "material-processing-station"
sourceBOMItemName: "Material Processing Station"
relatedBOMItems:
  - "bom-0-3"
relatedResearchQuestions:
  - "rq-0-11"
  - "rq-0-13"
tags:
  - "metallurgy"
  - "carbonyl"
  - "hydrogen-reduction"
  - "microgravity"
createdDate: "2026-10-12"
---

## Background

The panel split on the metallurgy route. Claude baselines routes needing no gravity (magnetic beneficiation, then carbonyl or H₂ reduction), with centrifugal melting only at pilot scale. Gemini baselines a rotating furnace at 0.05–0.15 g (rq-0-11). GPT: "gas/solid metallurgy is not automatically gravity-independent"; rotating modules are an experimentally gated hypothesis. GPT also asks for the reagent and precision-spare import stream.

Raised by the Phase 0 re-assessment (round 2, 2026-10-12): `reconciliation/phase-0/round-2/reconciliation/phase.md` and `reconciliation/phase-0/decisions.md`.

## Why This Matters

If no-melt routes work, the artificial-gravity module (+20–60 t, $0.5–2B) may be unnecessary; if not, rq-0-11 becomes the critical path.

## How this gets answered

- **Experiment** — Representative-feed carbonyl and H₂-reduction yield at reduced gravity; reagent (CO, H₂) recovery and losses.
- **Literature research** — Terrestrial carbonyl-nickel/iron process data and its gravity dependence.
- **Analysis** — Process BOM with recycling losses and the import stream it implies.

## Research Directions

1. Yield and purity vs throughput.
2. Reagent make-up rate (t/yr imported).
3. Comparison with partial-g melting (rq-0-11).
