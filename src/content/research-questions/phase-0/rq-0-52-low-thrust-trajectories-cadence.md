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

## Cheaper phasing: many burns, longer transfers (2026-11-19)

Phasing was solved again with a burn every 20 days instead of two in all, and with transfers of up to 360 days (two revolutions) as well as 20–200 (`node_phasing_multi.py`, `run_node_phasing_multi.py`). The transfer is split into coasts, solved by multiple shooting, and the sum of the burns is minimised. With many short coasts this approaches what a low-thrust tug pays. It is the same grid of 16 start places and offsets of one to four eighths either way. Each cell keeps the cheaper of this and the two-burn cost. 2,654 of 2,816 transfers were found, and none passes closer to Earth than 1.23 million km, so the Moon, which the model leaves out, does not come into it.

| Offset round the orbit | Two burns, best over 20–200 days | Many burns, best over 20–360 days |
|---|---|---|
| 1/8 | 204–208 m/s | 185–187 m/s |
| 2/8 | 382–399 m/s | 349–352 m/s |
| 3/8 | 513–536 m/s | 466–469 m/s |
| 1/2 | 572 m/s | 511–512 m/s |

(Ranges are the medians over start places for the two directions.) The saving is 8–12%. Most of it comes within about four months: beyond 120 days, adding time or burns lowers the cost by only a few per cent more (for one eighth: 196 m/s at 120 days, 191 at 200, 187 at 360).

The cost follows the chord of the phase shift, about 2 sin(Δφ/2) times that of half an orbit (196, 362 and 473 m/s predicted from 512 m/s, against 185, 350 and 468 found). That is what a linear oscillator does. Close to the orbit the motion round it is nearly harmonic, and the period hardly changes with the size of the orbit. So a tug cannot drift round cheaply by waiting, however many burns it has. Shifting the phase means turning the state round, and that costs about the same whenever it is done. Only a route that leaves the orbit's neighbourhood, along its unstable and stable manifolds, could escape this. A local search from a guess that slides along the orbit does not find such a route.

Parking count with the cheaper phasing (one station, phasing charged):

| Caps | Two-burn phasing | Many-burn phasing |
|---|---|---|
| 5 km/s, 4 yr | 6–11 | 6–11 (one more target at two of the eight places) |
| 6.5 km/s, 4 yr | 36–39 | 36–39 (one more at two places) |
| 5 km/s, 5 yr | 38–46 | 38–46 (one more at one place) |

What this settles:

1. **Cheaper phasing does not change the arrangement.** At the consensus caps, parking still gives 6–11 against 11–12 for four stations. At the relaxed caps it still matches about two stations. The point made above (several stations do better than parking) holds with phasing priced near its floor for nearby routes.
2. **Phasing costs about 190 m/s per eighth of the orbit, and waiting longer does not help.** A move of one to three eighths takes 4–9% of a 5 km/s leg, and a parked tug may need one at each end of its cycle. More stations are the way to cover more of the orbit, not more time spent phasing.

How firm: the optimiser is local and starts from one guess. Routes along the orbit's manifolds were not searched and might be much cheaper, but would take longer. One node orbit was run.

Results: `publications/data/nea-trajectories/node-phasing-multi-halo-120.json`; `parking_multi_burn_phasing` in `node-stations-direct-halo-120[-c6.5-y4|-c5-y5].json`.

## The node leg flown with the Moon's gravity (2026-11-23)

Every count above comes from legs whose swingby is patched. Where the path crosses the Moon's orbital distance, with the Moon there, the excess velocity is turned at once, and the Moon does not pull at any other time. Here each leg is flown again with the Moon's gravity throughout (`moon_gravity.py`, `run_moon_gravity_check.py`). The Sun–Earth three-body model's Earth point becomes the Earth–Moon barycentre, with the Earth and the Moon either side of it and the Moon on its inclined orbit, placed by the leg's clocks. The leg is solved by multiple shooting from the patched path. Nodes are every 10 days, and the patched turn is replaced by the perilune state of the matching hyperbola. A correction burn is allowed at every node, and the sum of the burns is minimised. The escape must give the same excess velocity within the escape window and the time budget, and the tug must stay at least 100 km above the Moon. The extra Δv over the patched burn is charged to the leg.

Checked: one station at place 0, halo 120,000 km node orbit, 5 km/s and five years (the proposed position above, 32 targets). For each target, the legs of its three shortest cycles were checked, 125 legs in all. Each leg was solved again by `node_leg_direct.reachable`, which reproduces its stored delivery, and then flown in the full model.

| | |
|---|---|
| Legs whose full-model path joins (within 1 km and 0.1 m/s, ≥ 100 km above the Moon) | 109 of 125 |
| Extra Δv over the patched burn, joined legs: quartiles | 70 / 135 / 222 m/s |
| 90th percentile, largest | 348 m/s, 572 m/s |
| Under 50 / 50–150 / 150–300 / over 300 m/s | 20 / 43 / 32 / 14 legs |
| Correction burns over 1 m/s per leg (quartiles) | 5 / 6 / 10 |
| Legs whose extra Δv exceeds their headroom to 5 km/s | 20 of 109 |
| Escape date moved | under 0.14 days |
| **Targets still closing, unjoined legs kept at their patched cost** | **27 of 32** |
| **Targets still closing, unjoined legs dropped** | **24 of 32** |

Lost either way: 2015 HV182, 2020 UF2, 363305, 459200, 470975. Lost too if unjoined legs are dropped: 2015 NA14, 2025 VD24, 89136.

Where the cost comes from: the patched path is far off from the start, not only at the swingby. Over every 10-day stretch, it misses by 700–2,000 km and 2–6 m/s when flown with the Moon. These legs spend months 450,000–1,600,000 km from Earth before the swingby, some of it just beyond the Moon's orbit. Near the Moon, the patched crossing and the real hyperbola differ by 25,000–45,000 km and 60–260 m/s. The Moon itself is where the clocks put it (65–3,600 km from the patched crossing point). So the patched model leaves out a real, leg-to-leg varying cost of about 0.1–0.2 km/s, and it is not small next to the median headroom of about 0.46 km/s.

Two set-ups were tried and dropped, recorded here so they are not repeated. Holding the Earth fixed and adding the Moon's pull on it makes the tug drift about 12.5 m/s (about 10,000 km per 10 days) against every patched state. That is an artefact of mixing frames: it more than doubled the apparent cost. Allowing only one correction, two days before the swingby, rarely converges. Neither does a continuation from a small share of the Moon's mass, because at a small share the swingby passes tens of km from a point Moon.

What this settles:

1. **The proposed position survives the Moon's gravity: 24–27 targets with one station at 5 km/s and five years**, against 32 patched. That still clears the falsifier's 20, with less room. Neither end of the range is preferred. Unjoined legs may have a full-model path that a better start would find, or none.
2. **Patched-swingby leg costs are optimistic by a median of about 135 m/s** on these slow halo-to-escape legs. Counts elsewhere in this note (the consensus caps, more stations, parking) are patched and should be read as upper bounds by about this much per leg. The consensus-cap counts, which had no room, are the ones most likely to drop.

How firm: the extra Δv is an upper bound. SLSQP was stopped at its iteration cap (300, restarted three times) before it reported convergence, and on test legs more iterations lowered it (for example 18 to 9 m/s). The recount uses only each target's three shortest cycles; a lost target may still close by a longer one, which were not checked. Both make 24–27 a lower bound for this model. The Moon is on a circular inclined orbit, and the Sun's pull on the Moon and the planets is left out (an ephemeris check is the next step for the best targets). One station place and one node orbit were run.

Results: `publications/data/nea-trajectories/node-moon-gravity-halo-120-p0-c5-y5.json`, per leg `node-moon-gravity-halo-120-p0-c5-y5-legs.csv`.

## Novelty and positioning review (2026-11-24)

Before any paper is written on these results, an outside research agent checked them against the literature. It worked from a brief (`publications/handover/rq-0-52-nea-tug-cycles-literature-brief.md`) that put our results as nine claims, C1–C9. Its review is in `research/novelty-review.md`, and the sources are added to `research/papers.yaml` with the reviewer's read levels. Its verdicts, as given:

| Claim | Reviewer's verdict | Deciding sources |
|---|---|---|
| C1. 2–6 targets at 5 km/s and 4 yr, one station | new | none counts round trips from a libration-point node |
| C2. 11–15 at best arrangement; falsifier unmet | new | none counts station arrangements on a halo |
| C3. 17–27 at 6.5 km/s; 26–34 at 5 yr | partly known | the sensitivity to caps is published (Tyler & Wittig 2021: +20% threshold, +50% targets) |
| C4. Interpolated reach tables over-count | partly known; the size and direction are new | no published check of a v∞ reach table against a direct solve |
| C5. Station place on the halo worth a factor 2–3 | new | halo phase is a variable in Chen et al. 2016b and Qi & de Ruiter 2020, but never carried through to a count |
| C6. Phasing follows the chord law, ~512 m/s per half orbit, and waiting does not help | known, partly contradicted | Sato, Kitamura & Shima 2015 (same shape, Earth–Moon L2, 397 m/s at half an orbit); Fu, Wang & Zhang 2023 (on a lunar DRO, cost does fall with time) |
| C7. Patched swingby under-prices legs by a median of 135 m/s | new, but an outlier | published model-transition penalties for related problems are a few m/s |
| C8. Mixed-frame drift of ~12.5 m/s per node | known as a class; drop | Jorba-Cuscó, Farrés & Jorba 2018 (the bicircular problem is not coherent) |
| C9. v∞ 1.2–1.46 km/s; direction limited by the Moon's plane | known | Casalino & Lantoine 2020: C₃ 1.5 km²/s² in any direction, ±30° at C₃ 2; our band sits between them |

Where the review misreads our runs (recorded here, the review is kept as received):

1. It describes C7 as a distribution "over 1,816 legs". The Moon check covered 125 legs at one station place. 1,816 is the number of legs solved with the patched swingby.
2. It suggests our finding that waiting does not help may come from a time horizon of about 0.67 of an orbit (120 days). Phasing was in fact solved out to 360 days, about two periods of the node orbit, and the cost for one eighth fell only from 196 to 187 m/s. That is beyond the 1.5 periods where Fu et al.'s cost levels off. Their orbit (a stable lunar DRO) is not ours, so both are kept: on a Sun–Earth halo, as solved, waiting barely helps.
3. It dates Sato et al. 2015 "seven years" before our claim; it is eleven. Minor.

What the review changes (proposed positions, not settled):

1. **C8 is withdrawn as a claim.** It stays as a methods note citing the known incoherence of bicircular models. The coherent models (quasi-bicircular, Rosales et al. 2023; Li et al. 2025, 2026) are what a referee will compare our construction against, and checking against one is an open item.
2. **C6 and C9 become calibrations, not findings.** C6 places a Sun–Earth halo of 120,000 km on the published Earth–Moon curves. C9's only new element is the inclined, regressing lunar orbit. Sato et al.'s manifold detour (3.2 times cheaper at half an orbit, worth it above about 70°) is the benchmark for the manifold-phasing next step.
3. **C7 needs a second number before it is claimed.** The 135 m/s is what it costs to *repair* the patched designs. Nodes and settings were kept where the patched solution put them, and SLSQP was stopped short. A leg optimised from scratch in the full model could be much cheaper. Until a few legs are, the claim is "an upper bound on repairing patched-swingby designs, growing with time spent near the Moon's orbit", not "what the Moon costs". A referee will compare it with a few m/s (Tyler & Wittig, Fu et al.), 28 kg of 9,664 (Casalino & Lantoine) and ARTEMIS's flown corrections (deep-space manoeuvres up to 24 m/s).
4. **Several stations may be answering the wrong question.** Chen, Kawakatsu & Hanada 2016b, which the brief missed, price reaching the Moon at any lunar phase from a halo of 100,000 km at about 14 m/s. Our solver already lets the departure date and burn vary (±10 days, up to 300 m/s). But it needs a given v∞ vector on a given date, not just a lunar encounter, and it does not let the tug wait extra revolutions on the halo before leaving. If waiting opens enough lunar geometry, the station-arrangement result (C2) weakens. This should be checked before a paper is framed around station arrangements.
5. **Prior work to cite and set ourselves apart from:** Peng, Zhang & Gao 2024 (reusable probes from a lunar DRO station, 105 asteroids, but flybys from cislunar space). Xie & Dempster 2022 (1,684 of 24,149 NEAs for low-thrust round trips from Earth, with no node or swingby constraint). The easily-retrievable-objects line (García Yárnoz et al. 2013; Tyler & Wittig 2021): one-way, no reuse, no Moon. Tan et al. 2021–2023 (capture of asteroids, not tugs, to Sun–Earth L1/L2 with a lunar flyby), the nearest work to our return leg. Our return legs are mirrored escapes, which is an assumption no source tests.

The paper, if written, would rest on C1, C2, C4, C5 and C7, with C3, C6 and C9 as context. It is provisionally Paper 12 ("NEA tug cycles through a Sun–Earth halo node with lunar swingbys"); number 06 is the cryogenic paper.

## Next steps

1. Before framing a paper: (a) re-optimise five legs from scratch in the full model, to see how much of the 135 m/s is repair rather than the Moon; (b) let the tug wait whole revolutions on the halo before leaving, to test whether several stations are needed (Chen et al. 2016b).
1. Moon's gravity for the remaining station places and caps (about two hours per place at 125 legs), and the longer cycles of the targets lost here; more SLSQP iterations to tighten the upper bounds.
1. Check the full-model construction against a coherent four-body model (quasi-bicircular).
1. Phasing along the node orbit's unstable and stable manifolds (an excursion away and back), the only route the chord argument above does not cover; benchmark: Sato et al. 2015's 3.2× saving at half an orbit. Worth doing only if parking is to be kept as an alternative to more stations.
1. Scout launch trade, remaining: a priced ride-along to lunar transfer, the Earth flyby's turn limit, arrival date against Δv, and loiter before the swingby.
2. Re-run the chain model (rq-0-61) with per-target cycle time, Δv and thrust time from `targets.csv`, and trade tug power against cycle time.
3. Hand the shortlist to the remote survey for taxonomy and rotation (bom-0-1, rq-0-50).
4. Higher-fidelity check of the best ten targets (ephemeris model, flyby geometry).
