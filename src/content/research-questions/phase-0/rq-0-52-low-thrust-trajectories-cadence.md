---
questionId: "rq-0-52"
slug: "low-thrust-trajectories-cadence"
title: "Low-thrust trajectories and cycle cadence to candidate NEAs"
questionType: "simulation"
status: "investigating"
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

## Results so far (2026-10-25): catalogue screen

A first pass over the whole JPL Small-Body Database (42,806 near-Earth asteroids, retrieved 2026-10-25) tested the regenerated consensus budgets against real orbits. Method: two-body ephemerides, direct (zero-revolution) Lambert transfers on a 15-day × 16-flight-time grid for 2030–2040 departures, low-thrust Δv taken as 1.15 × impulsive, each burn checked against the vehicle's acceleration, SEL1 as the departure and return point. Code: `publications/scripts/nea_accessibility.py`; data and the full candidate table: `publications/data/nea-catalogue/`.

**The budgets in the consensus do not close as written.** For asteroids of about 100 m or more (H ≤ 22), none meets all three: a scout reaching it with ≤3.5 km/s from C3 ≈ 0 (bom-0-1), and a tug round trip with ≤5 km/s per leg inside 3 years (bom-0-4).

| Constraint relaxed | Jointly accessible, H ≤ 22 (H ≤ 23) |
|---|---|
| None (consensus as written) | 0 (0) |
| Scouts launched to C3 = 10 km²/s² | 0 (1) |
| … and tug cycles up to 4 years | 0 (2) |
| … and tug legs up to 5.75 km/s | 5 (17) |
| … and tug legs up to 6.5 km/s | 15 (37) |
| … and legs up to 7.5 km/s, cycles up to 5 years, scouts 4.5 km/s | 39 (81) |

What the screen shows:

1. **Scouts need launch energy, not more EP.** From C3 ≈ 0 only 2 large targets lie within 4.5 km/s. With launch to C3 = 10 km²/s² (v∞ 3.2 km/s), 92 are within 3.5 km/s. Hayabusa2 and OSIRIS-REx both launched to C3 21–29 km²/s². This is a cheap change to bom-0-1's launch assumption.
2. **Tug legs of 5 km/s are too tight.** Under that cap the shortest round trip to any large target is 4.7 years. At 6.5 km/s, 9 targets close within 3 years and 15 within 4. At 7.5 km/s, 31 close within 3 years.
3. **Fewer than 20 candidates at any setting near the consensus.** Claude's bom-0-1 falsifier ("fewer than 20 such candidates would reopen the architecture") is met unless legs of 7.5 km/s or longer cycles are accepted.
4. **Taxonomy is the gap.** Only 44 of the 718 large asteroids that pass the orbit filter have a measured spectral type (31 metal-plausible). Among the 15 jointly accessible ones, 2 are metal-plausible by taxonomy and 13 are unclassified. The remote survey (bom-0-1) has to classify before scouts can be targeted.

Limits of this pass: no gravity assists (a lunar or Earth flyby can save roughly 1 km/s a leg), no multi-revolution or optimised low-thrust arcs, solar power held at its 1 AU value, and the low-thrust factor itself (1.0–1.4; the leg-cap columns double as that sensitivity). Each limit cuts both ways except gravity assists, which would only add candidates.

## Second pass (2026-11-12): revolutions, lunar flybys, optimised low thrust

Code: `publications/scripts/trajectory_opt.py`, `run_trajectory_study.py`. Data: `publications/data/nea-trajectories/`.

The second pass adds what the first left out. Transfers may make one or two extra revolutions round the Sun. A lunar flyby at the Earth end of a leg is modelled as a free Earth-relative excess speed of 1.0 or 1.5 km/s, with 30 days allowed for phasing. For the 150 best-ranked asteroids of H ≤ 22 (of 379 eligible), every candidate leg is then re-solved as a low-thrust optimisation at the tug's actual thrust (1.5 MW, 175 t outbound and 330 t inbound), in place of the flat 15% allowance.

**Tug round trips (optimised low thrust, asteroids with H ≤ 22):**

| Leg Δv cap, cycle limit | No flyby | Lunar flyby 1.0 km/s | Lunar flyby 1.5 km/s |
|---|---|---|---|
| 5.0 km/s, 3 yr (the consensus budget) | 0 | 7 | 12 |
| 5.0 km/s, 4 yr | 2 | 20 | 46 |
| 5.75 km/s, 4 yr | 9 | 41 | 68 |
| 6.5 km/s, 4 yr | 16 | 58 | 83 |

**Scout and tug together (scout ≤ 3.5 km/s of EP):**

| Scout departure | Tug | Targets |
|---|---|---|
| C3 ≈ 0 | no flyby, 5.0 km/s, 3 yr (consensus as written) | 0 |
| C3 = 10 km²/s² | no flyby, 6.5 km/s, 4 yr | 16 |
| lunar flyby 1.0 km/s | flyby 1.0, 5.0 km/s, 3 yr | 3 |
| lunar flyby 1.0 km/s | flyby 1.0, 6.5 km/s, 4 yr | 10 |
| lunar flyby 1.5 km/s | flyby 1.5, 5.0 km/s, 4 yr | 21 |
| C3 = 10 km²/s² | flyby 1.5, 5.0 km/s, 4 yr | 45 |
| C3 = 10 km²/s² | flyby 1.5, 6.5 km/s, 4 yr | 82 |

What it shows:

1. **The falsifier of 20 candidates is cleared, but only with two changes together:** scouts launched to C3 = 10 km²/s² and tugs using a lunar flyby at each end with cycles up to 4 years (45 targets inside the consensus 5 km/s leg cap). Without flybys the count is 16, as in the first pass.
2. **The 3-year cycle does not hold.** At 3 years no combination reaches 20; the best is 12 for the tug alone.
3. **A lunar flyby is worth more than 1.5 km/s of tug Δv budget.** Flyby at 5.0 km/s and 4 years (20–46 targets) beats no flyby at 6.5 km/s (16).
4. **The scout, not the tug, limits a flyby-only plan.** A lunar flyby gives the scout at most 1.5 km/s, against 3.2 km/s from a C3 = 10 launch; 28 of the 150 shortlisted targets are within 3.5 km/s after a 1.5 km/s flyby, 141 after a C3 = 10 launch.
5. **Thrust time rules out more legs than Δv does.** Of about 34,000 candidate legs, 38% can be flown by the tug as specified; the rest need more thrusting time than the flight allows. Where a leg can be flown, the optimised Δv is close to the impulsive figure (median ratio 1.01–1.03, 10th–90th percentile 0.76–1.51), so the flat 15% allowance was not biased on average, only too uniform.
6. **Repeat windows are scarce.** With a 1.0 km/s flyby, 19 targets have departure opportunities in three or more separate years (6.5 km/s, cycle ≤ 4 yr); without a flyby, 4. A production run needs repeat windows, so this is the stricter test.
7. **Taxonomy is still the gap.** Of the 82 targets in the loosest row above, 75 are unclassified and 3 are metal-plausible by taxonomy. (99942) Apophis, an Sq-type, is among the targets that close with a flyby.

Limits of this pass:

- **The flyby gain is an assumption.** The 1.0–1.5 km/s figure is recalled from the asteroid-redirect trajectory studies and has not been checked against a source. It is applied as an energy credit with free direction; the Moon's 5° inclination and the transfer between the flyby and the SEL1 node are not modelled.
- **Screening-grade optimisation.** Two-body dynamics, 20 segments per leg, thrust acceleration fixed at the leg's starting mass (conservative), solar power held at its 1 AU value (optimistic beyond 1 AU).
- **Counts are lower bounds.** Stage 2 covers 150 of 379 eligible asteroids, seeded from a 20-day departure grid.
- **Not modelled:** Earth resonant flybys, which add about a year per use, and double lunar flybys.

## Next steps

1. Find a source for the lunar-flyby excess speed and its geometric limits; this is now the assumption the result rests on.
2. Re-run the chain model (rq-0-61) with per-target cycle time, Δv and thrust time from `targets.csv`, and trade tug power against cycle time.
3. Hand the shortlist to the remote survey for taxonomy and rotation (bom-0-1, rq-0-50).
4. Higher-fidelity check of the best ten targets (ephemeris model, flyby geometry).
