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

## Next steps

1. Optimised low-thrust trajectories, with lunar and Earth flybys, for the 15–40 best candidates (pykep or an equivalent).
2. Feed per-target cycle time and Δv into fleet size and propellant (done in a first form in rq-0-61).
3. Hand the shortlist to the remote survey for taxonomy and rotation (bom-0-1, rq-0-50).

