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

- **The flyby gain was an assumption when this pass was run.** It has since been checked against the literature; see the next section. The size holds, the 30-day allowance and the free direction do not.
- **Screening-grade optimisation.** Two-body dynamics, 20 segments per leg, thrust acceleration fixed at the leg's starting mass (conservative), solar power held at its 1 AU value (optimistic beyond 1 AU).
- **Counts are lower bounds.** Stage 2 covers 150 of 379 eligible asteroids, seeded from a 20-day departure grid.
- **Not modelled:** Earth resonant flybys, which add about a year per use, and double lunar flybys.

## Flyby assumption checked against the literature (2026-11-13)

The review is in `research/analysis.md`, with sources in `research/papers.yaml`.

- **Size: supported.** Four independent trajectory analyses give 1.2–1.46 km/s of Earth-relative excess speed from lunar flybys, for capture as well as escape. The best-supported single value is 1.4 km/s; the 1.5 km/s case above is slightly high.
- **Time: not supported.** The sources need 60–200 days per assisted leg, not 30.
- **Direction: not supported as modelled.** A short flyby sequence is limited to about 30° from the ecliptic; 61% of the legs in this study are inside that.
- **No source** for the wait at the SEL1 node for a suitable lunar encounter, or for capture of a loaded tug back to that node.

Targets of about 100 m or more that close a tug cycle of four years or less, re-counted (`publications/data/nea-trajectories/flyby-check.json`):

| Flyby, leg Δv cap | As run (30 d, any direction) | 90 d | 90 d and within 30° of the ecliptic |
|---|---|---|---|
| 1.0 km/s, 5.0 km/s | 20 | 12 | 5 |
| 1.5 km/s, 5.0 km/s | 45 | 28 | 16 |
| 1.0 km/s, 6.5 km/s | 58 | 33 | 17 |
| 1.5 km/s, 6.5 km/s | 82 | 53 | 31 |

The last column is a lower bound, because it drops out-of-plane legs instead of re-optimising them. With a supported flyby the falsifier of 20 candidates does not clear at 5 km/s per leg and four years. It clears at 6.5 km/s per leg, or at five-year cycles (51–83 targets at 90 days, before the direction limit). The scout constraint was not re-applied.

## Third pass (2026-11-13): the flyby from a three-body model

The literature check left the leg between the SEL1 node and the Moon without a source, so it is now computed. `publications/scripts/cislunar_flyby.py` flies a tug from a periodic orbit about SEL1 to the Moon in the Sun–Earth three-body problem, turns it at one or two lunar swingbys, and records every escape with its speed, direction and time. The leg optimiser then limits the flyby credit by direction using that table (`run_trajectory_flyby_model.py`).

What the three-body model shows:

1. **The swingby gives more than assumed in the ecliptic and less out of it.** Within 90 days of a 150 m/s node burn the median reach is 1.58 km/s in the ecliptic, 1.35 km/s at 15–30° latitude, 0.87 km/s at 30–45°, 0.46 km/s at 45–60° and nothing above 60°.
2. **The coast from the node to the Moon sets the time, and it is bought with a burn at the node.** The fastest first lunar encounter comes 65 days after a 50 m/s burn, 37 days after 150 m/s and 22 days after 300 m/s. Escape at 1.4 km/s or more follows at 77, 53 and 36 days. Without a burn the coast takes about four months.
3. **Each solution needs the Moon at one phase**, which comes round once a synodic month. The study adds a mean wait of 15 days per assisted leg.
4. **The simplified swingby holds up.** In 15 encounters re-flown with the Moon's gravity acting throughout, the largest escape speed was 0.95–1.13 times the simplified model's (median 0.99), with the same out-of-plane reach.

Targets of about 100 m or more that close a tug cycle, of the 150 studied. Leg Δv includes the node burn; cycle time runs node to node.

| Leg Δv cap | Cycle ≤ 4 yr | Cycle ≤ 5 yr |
|---|---|---|
| 5.0 km/s | 26 | 67 |
| 5.75 km/s | 39 | 93 |
| 6.5 km/s | 54 | 116 |

With node burns limited to 150 m/s the first row is 23 and 65. For comparison, the second pass counted 20–45 at 5.0 km/s and four years, and the literature-corrected filter 5–16. The falsifier of 20 candidates clears at the consensus leg cap, narrowly, and with room at five-year cycles. Median cycle at the 5.0 km/s cap is 4.6 years.

Limits of this pass:

- **Node orbits are planar** (Lyapunov orbits, 20,000–200,000 km from SEL1 on the Sun side). Halo orbits are not modelled.
- **The Moon is on a circular orbit in the ecliptic.** Its 5° inclination is ignored.
- **The node burn is impulsive.** At the tug's thrust 150 m/s takes 4–8 days and 300 m/s takes 8–16.
- **Return is taken as the mirror image of departure**, which the equations allow; it was not computed separately, and the tug's position on the node orbit is treated as plannable.
- **At most two swingbys**, the second after an in-plane transfer.

Results: `publications/data/cislunar-flyby/` and `publications/data/nea-trajectories/{legs-flyby-model.csv, flyby-model.json}`.

### Scout constraint on the third-pass targets (2026-11-14)

A scout must reach its asteroid within 3.5 km/s of its own propulsion (bom-0-1). `run_scout_flyby_model.py` applies that to the targets above for two ways of starting. The swingby option is computed in the same three-body model: a launch that just reaches the Moon, one swingby, escape.

| Tug leg Δv cap, cycle | Tug only | And scout launched to C3 = 10 km²/s² | And scout launched to C3 ≈ 0 with a lunar swingby |
|---|---|---|---|
| 5.0 km/s, 4 yr | 26 | 26 | 8–16 |
| 5.0 km/s, 5 yr | 67 | 67 | 21–31 |
| 6.5 km/s, 4 yr | 53 | 52 | 11–21 |
| 6.5 km/s, 5 yr | 114 | 112 | 21–31 |

1. **Launched to C3 = 10, the scout does not bind.** 141 of the 150 studied targets are within the scout's 3.5 km/s, and every target that closes at the 5 km/s tug cap is among them. The joint count at the consensus tug budget and four years is 26.
2. **Launched to C3 ≈ 0 with a lunar swingby, the scout is the limit.** 22–32 targets are within reach, and 8–16 of the 26 remain. The range is the launch energy: the swingby gives 1.5 km/s in the ecliptic from a launch at C3 ≤ −1.0 km²/s², which matches the published single-flyby figures, and 1.8 km/s from C3 = −0.2. Both were re-flown with the Moon's gravity acting throughout and agree within 2% (`validation.json`), so the range reflects how close to escape the launch is, not model error.
3. **So the falsifier of 20 clears only with the C3 = 10 scout launch**, which the consensus does not specify (it gives C3 ≈ 0). That is open trade question 1.2 in the plan, and this is its answer on target count; the launch-mass side of the trade is not done.
4. **Taxonomy is still the gap.** Of the 26, 23 are unclassified and one is metal-plausible by taxonomy.

Tug-only counts in this table differ by one or two from the table above at the looser caps because they are re-assembled from the rounded leg file. Results: `publications/data/nea-trajectories/{targets-flyby-model.csv, scout-flyby-model.json, scout-flyby-model-low-launch.json}`.

### Scout launch trade (2026-11-15)

The launch-mass side of open question 1.2: what each way of leaving Earth costs. `run_scout_launch_sweep.py` re-solves the scout transfer to all 150 targets for a launch to C3 = 0, to C3 ≈ 0 with a lunar swingby, and straight to C3 = 2 to 20 km²/s², this time keeping transfers above 3.5 km/s. `run_scout_launch_trade.py` adds the mass, launcher and shared-launch checks.

**Targets against launch energy and scout Δv.** Joint count with the tug at a 5 km/s leg cap and a four-year cycle (26 targets):

| Scout leaves by | Scout Δv 3.5 km/s | 4.0 | 4.5 | Δv for all 26 |
|---|---|---|---|---|
| Launch to C3 = 0, no assist | 0 | 1 | 3 | 7.1 km/s |
| C3 ≈ 0 and a lunar swingby | 8–16 | 19–23 | 25–26 | 4.2–5.0 km/s |
| Launch to C3 = 4 | 20 | 26 | 26 | 4.0 km/s |
| Launch to C3 = 6 | 26 | 26 | 26 | 3.4 km/s |
| Launch to C3 = 10 | 26 | 26 | 26 | 2.7 km/s |

1. **C3 = 10 is more than these targets need.** C3 = 6 keeps all 26 inside 3.5 km/s, and C3 = 4 keeps 20. At the looser tug settings C3 = 6 keeps 62 of 67 (five-year cycle) and 45 of 53 (6.5 km/s legs).
2. **The swingby route closes with about 1 km/s more scout Δv.** At 4.5 km/s it reaches 25–26 of the 26. Claude's scout is designed for 4.5 km/s and GPT's for 4.81 km/s ideal, with 3.5 km/s allocated to the transfer, so on those designs the swingby route spends the margin and the secondary target, not new hardware.
3. **Electric Δv is cheap in mass and dear in thruster hours.** On Claude's 550 kg scout, 3.5 → 4.5 km/s is 32 kg more (518 → 550 kg) and 3,900 → 5,200 firing hours, against a planned qualification of 6,500 h. Gemini's 250 kg scout on one 600 W thruster needs 6,800 h at 3.5 km/s and 9,000 h at 4.5 km/s, so the swingby route does not close for that design.

**What the launch costs.** Launcher payload against C3 is our estimate from published payloads of a Falcon 9 class vehicle (the provider's curve was not obtained): 2.2–2.7 t to C3 = 10 and 3.3–3.6 t to C3 = 0 with the first stage recovered, 4.0–4.6 t to C3 = 10 expended.

4. **On a dedicated launch, C3 = 10 costs nothing extra.** A pair of scouts is 0.5–1.1 t. The launcher has more than twice that at C3 = 10, so the price is the same at either energy: about $70–100M a launch at published prices, or three launches for six scouts against a 0A launch line of $250–900M (bom-0-8). ESCAPADE, two 535 kg spacecraft, flew for about $20M on an early New Glenn.
5. **Two scouts on one launch to C3 = 10 must leave on the same day in the same direction.** Of the 325 pairs among the 26 targets, 25 can share a launch with both scouts inside 3.5 km/s (219 of 2,211 pairs among the 67). So pairs can share, but the launch fixes which two asteroids go together. This is a lower bound: the second scout was put on the first one's best launch, not a jointly chosen one.
6. **C3 ≈ 0 is only cheaper as a ride-along, and a ride-along gives up the date.** Janus lost its asteroids, and ESCAPADE its ride, when the main passenger's launch changed. The swingby gives back the choice of direction, not of date. A 500–550 kg scout also needs the 700 kg class of ride-along port; the standard large port carries 320 kg. No price for a ride-along to lunar transfer was found.

**Two ways to add energy after a C3 ≈ 0 launch.**

7. **A chemical burn at perigee** of 0.45–0.53 km/s raises C3 ≈ 0 to C3 = 10. It adds 96–113 kg and a second propulsion system: 614–631 kg in all for Claude's scout, above its 600 kg envelope, and 548–563 kg for GPT's.
8. **A loop under thrust and an Earth flyby** (the route Hayabusa flew, and close to what ESCAPADE flew chemically). In our solver 0.6–0.7 km/s of thrust over 1.3–2.1 years turns the swingby's 1.5–1.8 km/s into a return at 3.2 km/s. If the flyby can then point that speed anywhere, all 26 targets are inside 3.5 km/s. That is an upper bound: the flyby's turn is limited and was not modelled. It delays arrival by 1.3–2.1 years.

**Proposed position for question 1.2** (a bet, to be revisited, not a ruling):

- Size the scout launch for C3 ≈ 6 on a dedicated launch per pair, and choose each pair from the asteroid pairs that can share one.
- Keep 4.5 km/s or more of ideal Δv on the scout, as Claude and GPT already do. That keeps the C3 ≈ 0 ride-along with a lunar swingby open as a fallback that reaches 25–26 of the 26.
- Revisit if a ride-along to lunar transfer is priced well below a dedicated launch, if iodine thruster life (rq-0-54) falls short of about 5,200 h, or if the halo-orbit and inclined-Moon extension changes the tug's target set.

Limits: the scout's acceleration is held at the 525 kg reference while its mass changes by up to 10%; the least-Δv transfers found are long (median 700 days) and arrival date was not traded; loiter orbits before a swingby are not modelled; prices are published list or contract figures, not quotes. Results: `publications/data/nea-trajectories/{scout-launch-sweep.csv, scout-launch-sweep.json, scout-launch-trade.json}`.

## Fourth pass (2026-11-15): halo node orbits and the Moon's inclined orbit

The third pass kept the node on planar orbits and the Moon in the ecliptic. `run_cislunar_flyby_3d.py` removes both simplifications.

- **Moon's orbit.** It is tilted 5.1° to the ecliptic, so a departure meets the Moon only where its path crosses the Moon's orbit plane. The out-of-plane part of the node burn is solved to make that happen, inside the same burn budget. The Moon's node line turns once a year against the Sun–Earth line, so the reach is tabulated by that angle and the leg optimiser reads it for the date of each leg.
- **Node orbits.** Two northern halo orbits, 120,000 and 300,000 km above the ecliptic at their highest (the first is the size SOHO flies), next to the three planar orbits.
- **One swingby.** In the third pass the second swingby added at most 0.07 km/s to the reach in any direction band, so it is left out here.

Check: with the tilt set to zero and the whole burn in the ecliptic, the new code reproduces the third pass's single-swingby reach tables exactly, with the same 1,151 encounters.

**Reach.** Median excess speed within 15° of the ecliptic, km/s:

| Node burn, days from burn to escape | Third pass | Planar orbits, tilted Moon | Halo orbits, tilted Moon |
|---|---|---|---|
| 150 m/s, 60 d | 1.42 | 1.31 | 0 |
| 150 m/s, 90 d | 1.58 | 1.53 | 1.36 |
| 150 m/s, 150 d | 1.62 | 1.60 | 1.55 |
| 300 m/s, 60 d | 1.64 | 1.62 | 1.60 |
| 300 m/s, 105 d | 1.65 | 1.64 | 1.63 |

**Targets.** Tug legs re-solved against each table (`run_trajectory_flyby_model.py --model=…`), 150 targets:

| Tug leg Δv cap, cycle | Third pass | Planar orbits, tilted Moon | Halo orbits, tilted Moon |
|---|---|---|---|
| 5.0 km/s, 4 yr | 26 | 25 | 23 |
| 5.0 km/s, 4 yr, 150 m/s burns only | 23 | 21 | 13 |
| 5.0 km/s, 5 yr | 67 | 65 | 58 |
| 5.75 km/s, 4 yr | 39 | 38 | 34 |
| 6.5 km/s, 4 yr | 53 | 52 | 48 |
| 6.5 km/s, 5 yr | 114 | 110 | 108 |

1. **The Moon's tilt costs almost nothing.** One target of 26 is lost. The out-of-plane part of the burn it needs is small: a median of 5° of the burn's direction at 300 m/s and 11° at 150 m/s.
2. **A halo node orbit costs three targets of 26, and makes the larger burn necessary.** The burn has to cancel the orbit's motion across the ecliptic before the tug can meet the Moon. With 300 m/s available, 23 targets close. With 150 m/s only, 13 do, and in most directions no escape is reached within 60 days. A 50 m/s burn from a halo orbit rarely reaches the Moon at all.
3. **The falsifier of 20 still clears, at 23**, with a halo node, burns up to 300 m/s, and scouts launched to C3 = 6 or more. All 23 are inside the scout's 3.5 km/s from C3 = 6. With a C3 ≈ 0 launch and a lunar swingby 14 are within 3.5 km/s and all 23 within 4.5 km/s.
4. **No target is gained and cycle times do not move.** The targets that remain keep their cycle (median change 0.0 years); the ones lost were at the edge of the Δv cap or the cycle limit.
5. **The chain model does not move** (rq-0-61): at 5 km/s legs and four years the import ratio is 0.45–0.46 and the cost ratio to Earth supply is 4.9×, 2.5× and 1.7× for 6.25, 10 and 20 years, on all three models.

Limits of this pass: the scout's launch-to-Moon swingby still uses the Moon in the ecliptic; the return is still the mirror image, not computed separately; the swingby is patched and was checked against the Moon's gravity only in the planar case; node orbits are sampled at 16 points and the node angle in 60° steps; the phase of the tug on its node orbit is taken as plannable. Results: `publications/data/cislunar-flyby/{reach-3d-planar-orbits.json, reach-3d-halo.json, summary-3d.json, summary-3d-inc0.json}` and `publications/data/nea-trajectories/{legs-flyby-3d-*.csv, flyby-3d-*.json, flyby-3d-compare.json, targets-flyby-3d.csv}`.

## Fifth pass (2026-11-16): the return leg, and where the station is on its orbit

The fourth pass took the return to the node as the mirror image of the departure, and took the best of every place on every node orbit of a kind. This pass checks the first and removes the second.

**The mirror image is exact, and was checked by flying arrivals forwards.** Reflecting a path in the plane through the Sun, the Earth and the ecliptic pole and reversing time leaves the equations unchanged. A northern halo orbit maps onto itself, and the Moon stays prograde with its node at 180° − node. `run_flyby_arrival_check.py` takes 2,483 departures (two halo orbits and one planar orbit), reflects each, and integrates it forwards from the edge of the Earth's sphere of influence. Every one meets the Moon's orbit plane (within 2.3 km), leaves the swingby with the same excess speed inside the allowed turn, and reaches the same node orbit within 830 km with an insertion burn inside the budget. The direction, node angle and station place the leg solver looks up for an arrival are those of the departure it mirrors. So nothing changes from this.

**What the mirror image hid is that the tug must return to where the station is.** A station is on one orbit, at one place on it, on any given day. The node orbits have periods of 175 to 179 days, so the place is fixed by the date and by where the station was first put. A tug cannot choose it. The reach tables now carry the station's place at the moment of escape as a further dimension (eighths of the period), for three single orbits, from a run with four times the departures (`run_cislunar_flyby_3d.py --station`). The legs were re-solved for eight initial station places on each orbit (`run_trajectory_flyby_model.py --model=station-<orbit> --phase0=k`).

Reach within 15° of the ecliptic, median over direction, node angle and station place (km/s); the pooled column is the fourth pass:

| Node burn, days to escape | Pooled halo orbits | Halo 120,000 km | Halo 300,000 km | Planar 100,000 km |
|---|---|---|---|---|
| 150 m/s, 90 d | 1.36 | 0.81 | 0.00 | 0.86 |
| 150 m/s, 150 d | 1.55 | 1.07 | 0.91 | 1.05 |
| 300 m/s, 60 d | 1.60 | 0.98 | 0.96 | 0.83 |
| 300 m/s, 105 d | 1.63 | 1.30 | 1.26 | 1.37 |

Targets closing, as the range over the eight initial station places:

| Tug leg Δv cap, cycle | Pooled halo (fourth pass) | Halo 120,000 km | Halo 300,000 km | Planar 100,000 km (pooled planar: 25 / 65 / 52 / 110) |
|---|---|---|---|---|
| 5.0 km/s, 4 yr | 23 | 7–9 | 5–7 | 4–6 |
| 5.0 km/s, 4 yr, 150 m/s burns only | 13 | 3–5 | 2–4 | 1–4 |
| 5.0 km/s, 5 yr | 58 | 33–42 | 26–31 | 25–30 |
| 5.75 km/s, 4 yr | 34 | 14–21 | 12–15 | 9–14 |
| 6.5 km/s, 4 yr | 48 | 24–30 | 20–25 | 17–27 |
| 6.5 km/s, 5 yr | 108 | 83–91 | 76–88 | 74–79 |

What this shows:

1. **The falsifier of 20 is no longer shown to clear at 5 km/s legs and four-year cycles.** With the station at one place on one orbit, 5 to 9 targets close, against 23 when the place was free. It takes legs of 6.5 km/s (20–30 targets) or cycles of five years (26–42) to pass 20.
2. **The loss is in the four-year cycle limit more than in the Δv.** A leg now has to leave or arrive on a date when the station is well placed, which costs waiting time. At a five-year limit about two thirds of the pooled targets remain; at four years about a third.
3. **Where the station is first put matters little** (7–9, 5–7, 4–6 across the eight places), so this is not something a choice of initial place repairs. Which targets close does change: only 3 of the halo 120,000 km orbit's targets close for every initial place, and 15 for at least one.
4. **The smaller halo orbit does better than the larger one**, and the one planar orbit tried does no better than either.
5. **Scouts do not cut these further**: every target that closes is within the scout's 3.5 km/s from a launch to C3 = 6.
6. **The chain cost model still does not move** (rq-0-61): with 9 targets (halo 120,000 km) or 5 (halo 300,000 km) the import ratio is 0.46–0.47 and the cost ratio to Earth supply 4.9–5.2×, 2.6× and 1.7× for 6.25, 10 and 20 years. The model needs few targets; the falsifier is about how many exist to choose from.

How firm the new counts are: they are a low estimate, as the pooled 23 was a high one. The finer tables are not converged. Halving the departures lowers the mean in-plane reach by 3–4% (`station-reach-convergence.json`), and on one case (halo 120,000 km, first station place) lowers the count from 9 to 7 and from 41 to 36 at five years. The leg solver also tries departure dates 20 days apart, which is coarse once only some dates are good. The true count at 5 km/s and four years lies between about 9 and 23, and nothing here says it reaches 20.

Limits of this pass: station place in eighths of the period and node angle in 60° steps, interpolated; one swingby; the swingby patched, not flown with the Moon's gravity; a 14.8-day mean wait for the Moon, during which the station moves less than one bin; three orbits out of the two families. Results: `publications/data/cislunar-flyby/{arrival-check.json, reach-3d-station-*.json, summary-3d-station.json, station-reach-convergence.json}`, `publications/data/nea-trajectories/{flyby-station-compare.json, targets-flyby-station.csv}` and `publications/data/phase0-chain/flyby-station-*.json`.

## Count settled with the station's place fixed (2026-11-17)

The fifth pass left the count between about 9 and 23. Here the leg between the node and the edge of the Earth's sphere of influence is solved for each tug leg directly, instead of read from a table (`node_leg_direct.py`, `run_node_legs_direct.py`). On the date of the leg, with the station where it is, the Moon where it is and its node line where it is, a least-squares solver looks for a burn at the station (date, direction, size up to the budget) and a swingby (turn up to the lowest pass, any azimuth). These must give exactly the excess velocity the leg uses, with the escape within 10 days of the leg's date and within the leg's time budget. Seeds come from the sample of 8 million escapes behind the station tables. Where the full excess speed cannot be had in the wanted direction, the most that can is found by stepping the speed up from a reachable one, and the shortfall is charged to the tug's thrusters one for one. Arrivals are solved as their mirror image. Re-flying stored escapes with the single-trajectory code reproduces them to a few metres per second.

Halo 120,000 km node orbit (the best of the three in the fifth pass), 5 km/s legs, four-year cycles, burns up to 300 m/s:

| Station's place at J2000 | Legs from the pooled table | Legs from this station's table | Either | Table said |
|---|---|---|---|---|
| First eighth | 6 | 4 | 6 | 9 |
| Fifth eighth | 3 | 2 | 3 | 8 |

Of the 235 legs behind the pooled 23, the right excess velocity could be delivered in full for 9–11. For 67–78 it could be delivered only in part, and for 24–40 no stored escape came near enough to start from. Even ignoring the Δv and cycle caps, only 9–11 of the 23 targets have both an outbound and a return leg that can be flown at all.

What this settles:

1. **At 5 km/s legs and four-year cycles, with one station on one node orbit, the count is in single figures: 3–6.** The tables over-counted as well as under-counted. Interpolating between bins credited directions and dates no single trajectory reaches. So the fifth pass's 5–9 was not a low estimate after all, and the falsifier of 20 is not met at the consensus leg Δv and cycle.
2. **The cycles of the targets that do close are not longer** (median 3.5 years), so the chain cost model is unaffected (rq-0-61, fifth-pass section).
3. **What would restore the count is choice of the station's place,** which none of the specs provide: several stations spread round the orbit, or a tug that can park and wait on the orbit before leaving. Or else the caps are relaxed. The fifth pass's tables put 20 within reach at 6.5 km/s legs or five-year cycles, but those counts carry the same over-count and have not been checked directly.

How firm: the solver is local, so a leg it fails on is not proven impossible. But it recovers known escapes from perturbed starts, and its seeds are the densest sample yet. Only two targets close in both station places tried. The count cannot reach 20 unless most of the legs it fails on are in fact reachable. Two station places of eight were run on one orbit (a run takes 7 to 25 minutes, though one stalled for hours on slow solves).

Results: `publications/data/nea-trajectories/node-legs-direct-halo-120-p{0,4}[-station-legs].json`.

## Several stations, or tugs parking on the node orbit (2026-11-17)

The count above holds for one station, whose place on the node orbit is fixed by the date. Here the same 235 legs are solved directly from each of the eight station places, an eighth of the orbit apart (`run_node_legs_direct.py --phase0=0,…,7`). They are then combined for 1, 2, 4 or 8 stations spread evenly round the orbit, with every rotation of each set counted (`run_node_stations_direct.py`). A tug leaves from any station of the set and comes back to any. The stricter count makes it come back to the one it left. The escape may fall 10 days either side of the leg's date, which moves the place by about half an eighth, so eight places together cover the orbit. Eight stations therefore also stand for one station whose tugs park on the orbit and leave from wherever they need to. The cost of moving round the orbit to get there (phasing), and of getting back to the station afterwards, is not charged, so that count is an upper bound for parking. Each leg had at most 15 minutes of solving; none ran out. The two places run before (first and fifth eighths) gave the same counts again.

Halo 120,000 km node orbit, 5 km/s legs, four-year cycles, burns up to 300 m/s:

| Stations on the node orbit | Targets | Returning to the station it left | Median cycle |
|---|---|---|---|
| 1 (each of 8 places) | 2–6 | 2–6 | 3.1–3.6 yr |
| 2, opposite | 7–10 | 4–8 | 3.3–3.6 yr |
| 4 | 11–12 | 8–10 | 3.4–3.5 yr |
| 8, or one station with tugs parking anywhere (phasing not charged) | 15 | 11 | 3.5 yr |

Of the 235 distinct legs, 64 can be delivered in full from some place, and 201 at least in part. A leg delivered in full is typically delivered from only one place of the eight.

**Phasing priced (2026-11-18).** For parking, the tug has to move round the orbit from the station to the place it leaves from, and back from where it arrives. A two-burn transfer in the Sun–Earth three-body model does this (`node_phasing.py`, `run_node_phasing.py`). It was solved by shooting for 16 start places, offsets of one to four eighths either way, and 20 to 200 days. The cost is about 200 m/s per eighth (median 208 m/s for one eighth, 382–399 for two, 513–536 for three, 572 for half the orbit), at a best duration of about four months. Charged out of the leg's 5 km/s and added to the cycle, this gives **6–11 targets with one station and parking tugs**, depending on where the station is (median cycle 3.5–3.7 years). Two burns is an upper bound on phasing cost; more burns or revolutions may cost less. So parking lies between 6–11 and the uncharged 15. Eight of the 23 targets close from no place.

What this settles:

1. **Choice of place roughly trebles the count, but does not reach 20 at the consensus caps.** Even with the place free and phasing free, 15 targets close at 5 km/s legs and four-year cycles. The remaining gap from the pooled table's 23 is the tables' interpolation over-count, not the station's place. So the falsifier is not met at these caps by any number of stations.
2. **Several stations do better than parking at this phasing cost.** Four stations give 11–12; one station with tugs paying for two-burn phasing gives 6–11. A tug that must return to the station it left loses about a quarter.
3. **The cycles stay at about 3.5 years**, so the chain cost ratios of rq-0-61 hold (they were the same for 5, 9, 23 and 26 targets).
4. **The falsifier now turns on the caps.** Reaching 20 needs faster legs, longer cycles, or both, as well as choice of place. The tables put 20 within reach at 6.5 km/s or five years, but that has to be checked directly.

How firm: the solver is local, as before. The eight-station count leaves out the phasing cost, so for parking it is an upper bound. One node orbit was run.

Results: `publications/data/nea-trajectories/node-legs-direct-halo-120-p{0..7}.json` with per-leg `…-legs.csv`, `node-stations-direct-halo-120.json` (includes the parking count with phasing), `targets-node-stations-direct-halo-120.csv`, `node-phasing-halo-120.json`.

## Relaxed caps solved directly (2026-11-18)

The same direct solve and combination at the two relaxed caps that the fifth pass's tables said would reach 20. Every leg of a cycle within the caps on the pooled table was solved from all eight station places (`run_node_legs_direct.py --phase0=0,…,7 --cap=… --cycle=…`), with legs already solved reused. That is 801 distinct legs at 6.5 km/s and four years, and 1,816 at 5 km/s and five years. None ran out of time. The count is then made as above (`run_node_stations_direct.py --cap=… --cycle=…`).

Halo 120,000 km node orbit, burns up to 300 m/s:

| Stations on the node orbit | 5 km/s, 4 yr | 6.5 km/s, 4 yr | 5 km/s, 5 yr |
|---|---|---|---|
| 1 (each of 8 places) | 2–6 | 17–27 | 26–34 |
| 1, tugs parking, two-burn phasing charged | 6–11 | 36–39 | 38–46 |
| 2, opposite | 7–10 | 31–37 | 39–42 |
| 4 | 11–12 | 39–41 | 46–47 |
| 8 (or parking, phasing not charged) | 15 | 41 | 51 |
| Targets closing on the pooled table | 23 | 48 | 58 |
| Median cycle, one station | 3.1–3.6 yr | 3.5 yr | 4.4 yr |

At 6.5 km/s, 7 of the 8 station places reach 20 with one station. At five years all 8 do. Requiring the tug to return to the station it left changes nothing with one station, and costs 2–5 targets with more.

What this settles:

1. **The falsifier is met with one station once either cap is relaxed, and not at the consensus caps.** At 5 km/s and four years no arrangement reaches 20 (at most 15). At 6.5 km/s and four years one station gives 17–27, and at 5 km/s and five years 26–34. So the count depends on the caps far more than on the stations: raising either cap does more than any number of stations.
2. **The direct solve keeps about half the table's targets at the relaxed caps** (41 of 48 and 51 of 58 with the place free; 17–34 with one station). It kept about two-thirds at the consensus caps (15 of 23). The over-count from interpolation is real, but the margin at the relaxed caps survives it.
3. **Which cap to relax is a trade, not settled here.** rq-0-61 found that 6.5 km/s legs take the import ratio over its 0.50 limit (0.55), while five-year cycles keep it at 0.47 but cost more over a short run (5.8× against 4.9× at 6.25 years). The cycles solved directly at five years (median 4.4 years with one station) are close to the 4.3 years that result used. Proposed position: **five-year cycles with one station**, which gives 26–34 targets at the consensus leg Δv, with more stations kept as the way to add margin. The chain model run on these legs bears it out (rq-0-61, 2026-11-19). The import ratio stays at 0.44–0.46, and what it costs is a fleet of 24–25 tugs instead of about 20, and about a fifth more over a 6.25-year run (6.0× Earth supply against 4.8×).
4. **Parking with two-burn phasing does almost as well as two stations at the relaxed caps** (36–39 and 38–46). At the consensus caps it is the worse choice.

How firm: the solver is local, so these counts are lower bounds on what the model allows, and the relaxed-cap counts clear 20 with room. One node orbit was run. The cycle cap of five years was not combined with 6.5 km/s (2,730 legs at eight places, about a day of computing).

Results: `publications/data/nea-trajectories/node-legs-direct-halo-120-p{0..7}-c{6.5-y4,5-y5}.json` with per-leg `…-legs.csv`, `node-stations-direct-halo-120-c{6.5-y4,5-y5}.json`, `targets-node-stations-direct-halo-120-c{6.5-y4,5-y5}.csv`.

## Next steps

1. Look for cheaper phasing than two burns (several burns, low thrust over more revolutions); at about 200 m/s per eighth it decides whether parking can stand in for more stations.
1. Check the inclined swingby against the Moon's gravity.
1. Scout launch trade, remaining: a priced ride-along to lunar transfer, the Earth flyby's turn limit, arrival date against Δv, and loiter before the swingby.
2. Re-run the chain model (rq-0-61) with per-target cycle time, Δv and thrust time from `targets.csv`, and trade tug power against cycle time.
3. Hand the shortlist to the remote survey for taxonomy and rotation (bom-0-1, rq-0-50).
4. Higher-fidelity check of the best ten targets (ephemeris model, flyby geometry).
