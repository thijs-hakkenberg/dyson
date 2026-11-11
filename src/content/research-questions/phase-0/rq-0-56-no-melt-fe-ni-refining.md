---
questionId: "rq-0-56"
slug: "no-melt-fe-ni-refining"
title: "No-melt Fe-Ni refining routes (carbonyl, H₂ reduction): yield and reagent recycling"
questionType: "experimentation"
status: "investigating"
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

## Results so far (2026-11-11): process-route simulator

A screening simulator pushes one mass balance (metal, troilite, silicate, with sulfur tracked) through ten candidate flowsheets: grinding and magnetic separation, then optionally hydrogen desulfurisation or liquation, then one of three finishers (hot-press sinter, centrifuge melt, or carbonyl). Each step is a first-order physical model. Twenty-three uncertain parameters are drawn by Monte Carlo, and a random search tries 600 designs per route. Code: `publications/scripts/smelting_sim.py`; results: `publications/data/smelting-routes/results.json`.

A design passes when it meets a product tier and, at the same time, yields ≥75% of the mined metal, uses ≤7 kWh/kg and imports ≤20 kg per tonne of product. The tiers are: structural (S ≤ 0.05%, Fe+Ni ≥ 98%), envelope (S ≤ 0.10%, ≥ 97%; GPT's proposal), remelt stock (S ≤ 0.5%) and bulk mass (S ≤ 2%).

Best design per route, H-chondrite feed (L and enstatite feeds rank the same way):

| Route | Product S, P50 (P90) | Fe+Ni | Yield | kWh/kg | Imports kg/t | Pass: structural / envelope / remelt / bulk |
|---|---|---|---|---|---|---|
| grind → H₂ → melt | <0.01% | ~100% | 0.93 | 1.0 | 10 | 1.00 / 1.00 / 1.00 / 1.00 |
| grind → H₂ → sinter | <0.01% | 98.7% | 0.93 | 0.6 | 4 | 0.72 / 0.90 / 1.00 / 1.00 |
| grind → carbonyl | 0 | ~100% | 0.81 | 1.7 | 24 | 0.35 / 0.35 / 0.35 / 0.35 |
| grind → melt + vacuum hold | 0.25% (1.0%) | 99.5% | 0.92 | 4.9 | 11 | 0.25 / 0.33 / 0.68 / 0.99 |
| grind → melt + CaO flux | 0.30% (0.67%) | 99.7% | 0.92 | 1.1 | 20 | 0.00 / 0.04 / 0.40 / 0.51 |
| grind → liquation → melt | 0.85% (1.5%) | 99.0% | 0.92 | 1.0 | 13 | 0.00 / 0.00 / 0.20 / 0.99 |
| grind → melt | 2.9% (4.4%) | 94% | 0.85 | 0.7 | 10 | 0.00 / 0.00 / 0.00 / 0.24 |

What the simulator shows:

1. **It reproduces the known obstacle.** Plain melting leaves 1–3% sulfur at any gravity level, because all the carried troilite dissolves in the metal. Flux fixes it only with about 60 kg of imported CaO per tonne at useful doses. This matches the bom-0-3 consensus.
2. **A candidate route exists: take the sulfur out as gas before melting.** Below the Fe–FeS eutectic (≤950 °C), hydrogen converts troilite to iron and H₂S. The H₂S freezes out in a cold trap and the hydrogen recirculates. Make-up is 2 g of hydrogen per 32 g of sulfur, about 1 kg per tonne of product. The equilibrium is unfavourable (K ≈ 3×10⁻³), so about 35 kg of hydrogen circulates per kg of sulfur removed; that costs blower and trap power, not imports.
3. **Liquation does not work at this sulfur level.** The Fe–S liquid is only about 20% of the pore volume, and capillary forces hold that much in the bed even at thousands of g.
4. **Carbonyl gives the cleanest product but fails on yield and time** in two draws out of three, across the range assumed for its kinetics.
5. **The melt needs little gravity once the feed is a concentrate.** With metal as the continuous phase, slag inclusions clear at 0.1–1 g in 20 minutes: purity is 97.9% at 10⁻⁴ g, 99.8% at 0.1 g and ~100% at 1 g. A short-arm or small spinning crucible is enough. This narrows rq-0-11's "minimum gravity" question for this route.

**What would falsify the hydrogen route.** Its result rests on one number: the time constant of hydrogen desulfurisation for 100 µm troilite at about 900 °C, assumed here to be 2–40 hours.

| Time constant | Pass rate, 24 h hold | 48 h hold | 96 h hold |
|---|---|---|---|
| 2–8 h | 1.00 | 1.00 | 1.00 |
| 8–14 h | 0.77 | 1.00 | 1.00 |
| 14–22 h | 0.14 | 0.94 | 1.00 |
| 22–40 h | 0.01 | 0.28 | 0.99 |

Grind size matters as much, because the time scales with the square of particle size: at a 48 h hold the pass rate is 1.00 at 60 µm, 0.85 at 100 µm, 0.56 at 150 µm and 0.18 at 250 µm. Fine, cohesive powder is exactly what is hard to handle in microgravity, so this is the route's real trade.

The same test for carbonyl: at 100 bar and 72 hours it passes only if the iron time constant is under about 30 hours (0.27 pass rate in that bin, near zero above it). At 200 bar and 168 hours it reaches about 0.3–0.4 for time constants up to 120 hours.

**Limits.** This is a screening model, not a design. Every parameter range is an engineering estimate awaiting the literature check (PLAN-2026-11 §4.4). Not modelled: phosphorus and carbon in the metal, troilite sealed inside metal grains where gas cannot reach it, the bed sintering shut at 900 °C, hydrogen consumed reducing iron oxides in carried silicate (the water can be trapped and electrolysed), and the equipment mass of each route. The beneficiation model is the weakest part: how much troilite stays locked to the metal sets the starting sulfur for every route.

## Next steps

1. Literature (§4.4): measured rates for H₂ desulfurisation of troilite and pyrrhotite, carbonyl extraction from meteoritic metal, and troilite–metal intergrowth in ordinary chondrites.
2. A bench test anyone with a tube furnace can run: ground H-chondrite or a troilite–iron simulant in flowing hydrogen at 850–950 °C, sulfur against time and particle size. This is the cheapest experiment that can end or confirm the route.
3. Add equipment mass and a fluidised or stirred bed model, so throughput per tonne of plant can be compared across routes.
4. Owner: the Phase 1 sulfur limit (PLAN §1.5). If "remelt stock" is acceptable, more routes open; if "bulk mass" is enough, plain melting already passes.

