---
questionId: "rq-0-84"
slug: "phase-0-cost-confidence"
title: "What confidence do the Phase 0 contingency rates buy, and is 0A within the D-01 assumption?"
questionType: "simulation"
status: "investigating"
priority: "critical"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-17"
sourceBOMItemSlug: "contingency-reserve"
sourceBOMItemName: "Contingency and Reserve"
relatedBOMItems:
  - "bom-0-17"
  - "bom-0-11"
  - "bom-0-12"
relatedResearchQuestions:
  - "rq-0-61"
  - "rq-0-63"
  - "rq-0-82"
tags:
  - "cost-risk"
  - "contingency"
  - "monte-carlo"
  - "d-01"
createdDate: "2026-10-25"
---

## Background

The regenerated bom-0-17 consensus sets contingency at 40–50% for 0A and 55–70% for 0B. It asks for the rates to be "computed, not chosen", with correlation and common-cause drivers modelled. The regenerated BOM puts 0A at $6.3–12.3B before contingency and $8.8–18.4B with it, against D-01 assumption A4 ("0A ($3.5–16B) is fundable"; CI-29 in the consensus issue log).

## Why This Matters

The 0A rate sets the funded authority under D-01, and A4's falsifier ("no funding path") is a reason to stop.

## How this gets answered

- **Simulation**: Monte Carlo over the consensus envelopes (lognormal, ends as P10/P90 or P5/P95), Gaussian copula with ρ 0–0.5, historical cost-growth factors on development lines, 0A duration from the D-02 KDP-0B window, and part of NRE as level-of-effort. Code: `publications/scripts/phase0_cost_risk.py`.

## Results so far (2026-10-25)

Results: `publications/data/phase0-cost-risk/results.json`.

| Case | 0A P50 | 0A P80 | Confidence of 0A funded at +45% | P(0A ≤ $16B) | Confidence of 0B funded at +65% |
|---|---|---|---|---|---|
| Envelopes only, ρ 0.3 | $8.9B | $10.4B | 0.95 | 1.00 | 0.96 |
| Cost growth median 1.3, P90 2.0, ρ 0.3 | $11.5B | $15.8B | 0.56 | 0.81 | 0.80 |
| Cost growth median 1.5, P90 2.5, ρ 0.3 | $13.2B | $18.9B | 0.43 | 0.68 | 0.70 |
| Growth 1.3/2.0, 0A 6–15 years, 30% of NRE level-of-effort | $14.1B | $19.5B | 0.36 | 0.63 | 0.80 |

1. **The envelopes alone understate risk.** They are the spread between model estimates. On that basis only 20–25% contingency would be needed for P80.
2. **With historical growth, 0B's 65% is about right and 0A's 45% is not.** 0A is almost all first-of-kind development (NRE and the pathfinder); 80% confidence would need about 90%.
3. **A4 holds with probability 0.6–0.8.** A longer 0A, as the D-02 window allows, is what pushes it down.

## Next steps

1. Item-specific growth factors by TRL and AD² instead of one factor.
2. Common-cause drivers (target properties, tug batch defects) as explicit shared variables.
3. Owner: re-check A4 and the 0A rate in decisions.md.
