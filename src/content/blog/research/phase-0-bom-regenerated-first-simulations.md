---
slug: "phase-0-bom-regenerated-first-simulations"
title: "Phase 0, Re-costed: The New BOM and What the Asteroid Catalogue Says"
description: "Three models re-specified all 17 Phase 0 items. Then we tested the plan against the real near-Earth asteroid catalogue and against cost history. The trajectories are tighter than planned, propellant is about double, and at the planned scale asteroid metal costs about five times shipping from Earth."
author: "Project Dyson Team"
date: "2026-10-25"
category: "Research"
tags:
  - "phase-0"
  - "bom"
  - "simulation"
  - "trajectories"
  - "economics"
  - "multi-model"
---

# Phase 0, Re-costed: The New BOM and What the Asteroid Catalogue Says

In October the owner accepted a new structure for Phase 0: 17 items instead of 7, split into a funded research phase (0A) and a production option (0B) decided later. This post covers the next two steps. First, the three-model panel re-specified every item. Then we checked the result against data the models did not have: the real asteroid catalogue and the history of space cost overruns.

## The regenerated BOM

Claude Opus 5.5, Gemini 3.1 Pro and GPT-6.1 Sol each wrote a full specification for every item, with the accepted structure and the revised architecture as context. Claude then synthesised a consensus for each one, keeping the points where the models disagree. There are 51 specifications and 17 consensus documents in all.

With contingency, the totals are:

- **0A (committed): $8.8–18.4 billion.** Over half the base is research, ground facilities and qualification ($3.9–6.6 billion), and about $1.6 billion is the pathfinder mission.
- **0B (option): $23–81 billion.** Launch, the processing plant and the tug fleet are the largest lines.

Every cell is a range. Totals add lows to lows and highs to highs, so the full range is wider than any likely outcome. The consensus planning values are on the [feasibility report](/analysis/feasibility#bom), and each item's page shows the three models' positions side by side.

The new 0A range sits above one assumption behind decision D-01: that 0A costs $3.5–16 billion. We logged that rather than edit the decision. The owner decides whether it still holds.

## Test 1: can we actually reach the asteroids?

The consensus gives each vehicle a budget:

- **Scouts:** 3.5 km/s of electric-propulsion Δv from a launch that just escapes Earth.
- **Cargo tugs:** 5 km/s per leg between the asteroid and the Sun–Earth L1 node, and a round trip within 3 years.

We screened all 42,806 near-Earth asteroids in NASA JPL's Small-Body Database against those numbers. The screen uses direct transfers for departures in 2030–2040, with a margin for low thrust.

**No asteroid of about 100 m or more meets all three budgets.**

- **Scouts need a bigger launch, not more propulsion.** From a bare escape launch, only 2 large asteroids are within even 4.5 km/s. If the launcher adds a modest excess speed (C3 = 10 km²/s²), 92 are within 3.5 km/s. Real missions such as Hayabusa2 and OSIRIS-REx launched with more than that.
- **Tug legs of 5 km/s are too tight.** The best round trip under that limit takes 4.7 years. At 6.5 km/s per leg, 15 asteroids close within 4 years.
- **Fifteen is below twenty.** Claude's own test in the scout specification was that fewer than 20 reachable candidates would reopen the architecture. The screen doesn't yet model gravity assists, which would only add candidates, so this is the next thing to check.
- **Most candidates have never been classified.** Only 44 of the 718 large asteroids that pass the orbit filter have a measured spectral type. The remote survey has to classify them before scouts can be targeted.

## Test 2: what does a kilogram cost?

A second model follows the whole chain:

1. The plant's output and the tug round-trip times from the screen give the fleet size.
2. The fleet size gives propellant and launch mass.
3. Those give the cost per kilogram delivered to the L1 node.

The comparison is shipping the same mass from Earth at the same launch price.

At the planned scale (about 1.2 kt a year for a 6–6.5-year run):

- **Propellant is about twice the plan:** around 660 t of iodine a year, against 230–400 t. Imported mass is about two-thirds of the product mass, so the proposed limit of one half fails.
- **More mass goes up than comes back.** About 6.4 kt is launched to deliver 3.6 kt, and 70% of the launched mass is propellant.
- **Cost:** about $21,000 per kg against about $4,300 from Earth, so roughly five times as much. Cheaper launch doesn't change the ranking, because it helps the Earth option at least as much.

What does close the gap is running longer and larger. Hardware is paid once, propellant every year. With a 20-year run at 2.5 kt a year and more efficient thrusters, asteroid metal comes within about 20% of Earth supply.

This is decision D-01's framing in numbers. Phase 0 at this scale builds a capability; it does not save money.

## Test 3: is the contingency enough?

Treating the consensus ranges as the whole uncertainty, the contingency rates look generous. But those ranges measure how far three models' estimates spread, not how much first-of-kind space hardware overruns. With growth factors typical of past NASA projects added:

- **0B:** the 65% contingency rate reaches the intended 80% confidence.
- **0A:** the 45% rate reaches only about 57% confidence, because nearly all of 0A is new development.
- **The $16B assumption** holds with probability 0.6–0.8, depending on how long 0A runs.

## What happens next

The results are in [rq-0-52](/questions/low-thrust-trajectories-cadence), [rq-0-61](/questions/phase-0b-cost-vs-earth-supply) and [rq-0-84](/questions/phase-0-cost-confidence). Next:

- **Optimised trajectories** with lunar and Earth flybys for the best 15–40 asteroids.
- **Tug and plant replacement** added to the long-run cases.
- **Three new questions:** debris escape (rq-0-85), how the asteroid's spin sets power storage and contact with Earth (rq-0-86), and who owns programme management (rq-0-87).
- **Literature reviews** on the four unknowns that could end the project: anchoring in rubble, recoverable metal, iodine thruster life, and carbonyl refining.

Two findings go to the owner: whether assumption A4 still holds, and whether 0A's contingency rate should rise. The models' disagreements stay on record. The new findings are logged as consensus issues CI-26 to CI-31.

The code and data are in the repository (`publications/scripts/` and `publications/data/`), including the asteroid catalogue as downloaded.
