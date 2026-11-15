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

## Next steps

1. Extend the three-body model to halo node orbits and the Moon's inclined orbit.
1. Scout launch trade, remaining: a priced ride-along to lunar transfer, the Earth flyby's turn limit, arrival date against Δv, and loiter before the swingby.
2. Re-run the chain model (rq-0-61) with per-target cycle time, Δv and thrust time from `targets.csv`, and trade tug power against cycle time.
3. Hand the shortlist to the remote survey for taxonomy and rotation (bom-0-1, rq-0-50).
4. Higher-fidelity check of the best ten targets (ephemeris model, flyby geometry).
