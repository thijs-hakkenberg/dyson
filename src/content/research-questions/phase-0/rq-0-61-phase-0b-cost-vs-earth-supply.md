---
questionId: "rq-0-61"
slug: "phase-0b-cost-vs-earth-supply"
title: "Phase 0B delivered cost per kg versus Earth supply"
questionType: "analysis"
status: "investigating"
priority: "critical"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-3"
sourceBOMItemSlug: "material-processing-station"
sourceBOMItemName: "Material Processing Station"
relatedBOMItems:
  - "bom-0-3"
  - "bom-0-4"
  - "bom-0-2"
relatedResearchQuestions:
  - "rq-0-28"
  - "rq-0-43"
  - "rq-0-57"
  - "rq-0-58"
  - "rq-0-50"
  - "rq-0-51"
tags:
  - "economics"
  - "cost-model"
  - "isru"
createdDate: "2026-10-12"
---

## Background

The panel does not agree whether 0B material beats Earth supply. Claude: ~$1,300–11,000/kg (after correcting a round-1 units error), "about as likely as not (33–66%)" to beat Earth supply. GPT: "millions of dollars per kilogram", which the rapporteur shows is inconsistent with GPT's own envelope (~$3,000–20,000/kg). Claude and GPT both dispute rq-0-28's finding that Phase 0 costs are "approximately correct".

Raised by the Phase 0 re-assessment (round 2, 2026-10-12): `reconciliation/phase-0/round-2/reconciliation/phase.md` and `reconciliation/phase-0/decisions.md`.

## Why This Matters

This is the economics gate of D-02 and decides the honest framing of 0B (D-01).

## How this gets answered

- **Analysis** — A delivered-cost model with explicit ranges and a single cost basis, fed by rq-0-50, 0-51, 0-57 and 0-58; multiverse analysis across defensible assumptions.

## Research Directions

1. $/kg at the node with uncertainty.
2. Break-even launch price.
3. Reconcile with rq-0-28 and rq-0-43.

## Results so far (2026-10-25): chain closure model

A Monte Carlo model follows the chain the regenerated consensus describes: plant output → tug cycles (cycle time and Δv per leg from the rq-0-52 catalogue screen) → fleet → propellant → imported and launched mass → 0B cost → $/kg delivered to SEL1. It compares against shipping the same mass from Earth at the same launch price, plus 20–25% contingency (Claude's DEL-007 rule). Lines not recomputed come from the consensus envelopes in `src/lib/data/phase-0-bom.json`. Assumptions that are not in any consensus document (commissioning time, site-power mass, spares mass, Earth material cost) are listed in the results file. Code: `publications/scripts/phase0_chain_model.py`; results: `publications/data/phase0-chain/results.json`.

| Case (P50) | Tugs | Iodine t/yr | Import ratio | Launch kt | Delivered kt | $/kg delivered | × Earth |
|---|---|---|---|---|---|---|---|
| Reference: catalogue legs ≤6.5 km/s, ≤4-yr cycle, 1.0–1.3 kt/yr, 6–6.5 yr run | 19 | 663 | 0.66 | 6.4 | 3.6 | 21,400 | 5.1 |
| Consensus budgets as written (5 km/s legs, 3-yr cycle) | 18 | 505 | 0.51 | 5.3 | 3.7 | 18,600 | 4.4 |
| Isp 3,000–3,500 s | 19 | 478 | 0.48 | 5.1 | 3.6 | 19,400 | 4.6 |
| 2.3–2.7 kt/yr | 39 | 1,407 | 0.62 | 12.5 | 7.8 | 16,500 | 3.9 |
| Run 15 years | 19 | 663 | 0.66 | 13.0 | 13.7 | 8,700 | 2.1 |
| Run 20 years, Isp 3,000–3,500 s, 2.3–2.7 kt/yr | 39 | 1,002 | 0.45 | 25.2 | 42.2 | 4,900 | 1.2 |

$/kg is 0B only, with 0B contingency at 65%. Earth supply is about $4,300/kg at P50.

What the model shows:

1. **At the planned scale and run, 0B launches more mass than it delivers.** About 6.4 kt goes up to deliver 3.6 kt, and 70% of the launched mass is propellant. No launch price makes 0B cheaper than Earth supply in that case: lowering the price helps the Earth option at least as much. This is the D-01 framing in numbers: Phase 0 at this scale is a capability programme.
2. **Propellant is about twice the consensus planning figure.** The consensus carries 230–400 t/yr. The legs the catalogue supports (5.6–6.5 km/s) give 520–860 t/yr. The import-ratio limit proposed for the gates (≤0.50 interim, ≤0.35 target) fails in 97% of reference draws. Isp of 3,000–3,500 s brings it to about 0.48.
3. **What would close it is run length and scale, not cheaper launch.** The hardware is a one-off and the propellant is not, so cost per kilogram falls with years of operation. Parity with Earth supply needs roughly 20 years at 2.5 kt/yr with Isp above 3,000 s (P50 1.2× Earth; 16% of draws beat it), well beyond the 6–6.5-year 0B the consensus prices.
4. **The biggest levers on $/kg** (rank correlation) are launch price (+0.51), cycle time (+0.42), tug payload (−0.31) and Isp (−0.21).

Limits: tug, plant and robot replacement over long runs is not modelled, which flatters the 15–20-year cases. Gravity assists (rq-0-52) would lower Δv and propellant. Product value at SEL1 beyond its mass (for example avoided Earth-departure constraints) is not credited.

## Next steps

1. Re-run with optimised trajectories once rq-0-52 has them.
2. Add replacement cycles for tugs, plant trains and robots to the long-run cases.
3. Put the import ratio and the launched-to-delivered mass ratio into the economics gate (rq-0-82), alongside $/kg.

