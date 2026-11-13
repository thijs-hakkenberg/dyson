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

## Second pass (2026-11-12): optimised trajectories and replacements

Code: `publications/scripts/phase0_chain_model.py` (`trajectory='optimised'`, `replacements=True`), `run_phase0_chain_v2.py`. Data: `publications/data/phase0-chain/results-v2.json`.

Two things changed. Tug cycles now come from the optimised low-thrust legs of rq-0-52, each re-checked against the thrust of the tug being modelled. Runs longer than the hardware's service life now buy replacements: tugs and plant modules after 10–15 years, robots at 0.3–0.7 a year beyond the first six.

**Cost against Earth supply (P50 ratio, 1.0–1.3 kt a year, with replacements):**

| Trajectory setting | Targets | Import ratio | 6.25 yr | 10 yr | 15 yr | 20 yr |
|---|---|---|---|---|---|---|
| No flyby, legs ≤ 6.5 km/s | 16 | 0.58 | 5.2× | 2.8× | 2.1× | 1.9× |
| Lunar flyby 1.0 km/s, legs ≤ 5.0 km/s | 20 | 0.43 | 4.7× | 2.5× | 1.8× | 1.6× |
| Lunar flyby 1.0 km/s, legs ≤ 6.5 km/s | 58 | 0.52 | 5.0× | 2.7× | 2.0× | 1.8× |
| Lunar flyby 1.5 km/s, legs ≤ 5.0 km/s | 45 | 0.41 | 4.6× | 2.4× | 1.8× | 1.6× |

What it shows:

1. **The cost ratio barely moves at the planned scale.** About five times Earth supply for a six-year run, as in the first pass. Hardware and ground cost dominate, not trajectories.
2. **Lunar flybys fix the import ratio, not the cost.** With flybys and the 5 km/s cap, propellant falls to about 420 t a year and the import ratio to 0.41–0.43, inside the ≤ 0.50 limit. Without flybys it is 0.58.
3. **Replacements take back part of the long-run gain.** At 20 years they cost about $9B and raise the ratio from 1.55× to 1.8×. The first pass's "within about 20% of Earth" for a long, large run becomes 1.45× (2.3–2.7 kt a year, 20 years) and 1.3× at 5 kt a year. Asteroid supply beats Earth supply in at most 12% of draws in any case run.
4. **Picking a fast target helps modestly.** Sampling only the fastest quarter of targets lowers the six-year ratio from 4.7–5.0× to 3.9–4.1×.

**Tug sizing trade** (lunar flyby 1.0 km/s, legs ≤ 6.5 km/s, 10-year run; cells are targets that close / cost ratio / import ratio):

| Tug power | Isp 2,500 s, 150 t payload | Isp 2,500 s, 300 t | Isp 3,250 s, 150 t | Isp 3,250 s, 300 t |
|---|---|---|---|---|
| 0.75 MW | 49 / 2.7× / 0.52 | 21 / 2.1× / 0.37 | 39 / 2.4× / 0.38 | 12 / 1.9× / 0.27 |
| 1.0 MW | 56 / 2.8× / 0.55 | 39 / 2.2× / 0.43 | 53 / 2.5× / 0.41 | 24 / 2.0× / 0.30 |
| 1.5 MW | 58 / 3.1× / 0.59 | 54 / 2.4× / 0.48 | 58 / 2.8× / 0.45 | 48 / 2.2× / 0.35 |
| 3.0 MW | 58 / 3.9× / 0.71 | 58 / 2.8× / 0.54 | 58 / 3.5× / 0.53 | 58 / 2.5× / 0.40 |

5. **More tug power does not buy a shorter cycle.** Cycle time stays at 3.5–3.8 years across a fourfold range of power, because it is set by orbital phasing, not by thrust. Extra power only adds tug mass and cost.
6. **Payload per trip is the strongest lever on cost, and it trades against target choice.** Going from 150 t to 300 t per trip cuts the ratio by about a fifth, but a heavier tug can fly fewer legs: at 1.0 MW and 3,250 s, 300 t leaves 24 targets where 150 t leaves 53.
7. **Higher Isp helps on both counts** (cost and import ratio) and costs targets through lower thrust.

This gives a position on the tug question (plan item 1.3): keep the 5 km/s leg cap and plan on lunar flybys; allow 4-year cycles; do not raise tug power above about 1.5 MW; push payload per trip towards 250–300 t and Isp towards 3,000 s or more, to the extent the candidate count stays above 20. It should be revisited if the flyby gain turns out lower than 1.0 km/s, or if the metal-bearing targets turn out to be among those a heavier tug cannot reach.

Limits of this pass:

- It inherits the limits of rq-0-52, above all the unsourced lunar-flyby gain.
- A leg that the study's tug could not fly is never added back for a more powerful tug, so the benefit of more power is understated in target count (not in cycle time for the targets shown).
- 55% of tug mass and cost is assumed to scale with power; replacement lives and fractions are assumptions listed in the results file.
- Repeat departure windows are not enforced: the fleet is sized from average cycle time.

## Flyby assumption checked (2026-11-13)

The lunar-flyby gain these results rest on has been checked against the literature (rq-0-52, `research/analysis.md`). The size holds at about 1.4 km/s. The 30 days allowed per assisted leg does not; the sources need 60–200.

- **Cost and import ratio do not depend on the allowance.** At 90 days per assisted leg and four-year cycles the import ratio is 0.42–0.43 and a 20-year run costs 1.6× Earth supply, as before.
- **The target count does.** At 5 km/s per leg and four years it falls from 20–45 to 12–28, and to 5–16 once the flyby direction is limited to 30° from the ecliptic.
- **Five-year cycles restore the count but cost more.** 51–83 targets close, the fleet grows by three or four tugs, the six-year run rises from about 4.6× to 5.6–5.9× and the 20-year run from 1.6× to 1.75–1.8×. The import ratio stays at 0.42–0.44.

So the position recorded above (5 km/s cap, lunar flybys, four-year cycles) holds on cost and import ratio but leaves too few targets. The trade is now between a 6.5 km/s leg cap (import ratio about 0.48–0.51) and five-year cycles (more tugs). Results are in `publications/data/phase0-chain/flyby-allowance.json`.

## Next steps

1. Re-run with the flyby direction limit inside the trajectory optimiser (rq-0-52), then settle the trade between a 6.5 km/s leg cap and five-year cycles.
2. Enforce repeat departure windows per target when sizing the fleet.
3. Put the import ratio and the launched-to-delivered mass ratio into the economics gate (rq-0-82), alongside $/kg.
4. Re-run the bom-0-4 and bom-0-16 consensus with these findings.
