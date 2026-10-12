# Phase 0 BOM — completeness and closure assessment

*2026-10-11 · Reviewer: Claude (Claude Code), not a debate participant · Machine-readable
version: [`findings.yaml`](findings.yaml), which is what the models receive.*

## Why now

The Phase 0 specifications were written in January–February 2026 by Claude Opus 4.5/4.6,
Gemini 3 Pro and GPT-5.2, and each item was specified on its own. Building the 3D explorer
forced every number into one model of the system. Items that read well alone stopped adding
up together, and the explorer has logged more than twenty consensus issues (`src/lib/explore/CONSENSUS-ISSUES.md`).
The 2026-05-11 holistic review (Claude Opus 4.7, Gemini 3.1 Pro, GPT-5.5 Pro; in
`dyson-research/publications/holistic-review/`) named the same risk first: *"the coupled
architecture fails to close when integrated"*, and asked for a versioned reference
architecture.

This assessment checks Phase 0, the first phase, as a system: does the BOM contain
everything the phase needs, and do the items' numbers agree with each other?

## Summary

**Phase 0 does not close as specified.** The material chain is the clearest case:

| Stage | As specified | Annual mass |
|---|---|---|
| Mining (20 robots) | 1,000+ t/robot/yr target; 2–5 t/h excavators | 20 kt/yr to 350–880 kt/yr (duty cycle unstated) |
| Transport (10–15 tugs) | 200 t payload, 6–10 km/s, ~150–250 kWe EP | ~1.3–2 kt/yr at the stated cadence; **~0.3–0.6 kt/yr** if power-limited |
| Processing station | 50 kt/yr throughput, 1–2.5 MW | needs ~2–90 MW for that throughput |

Transport is short by 25–100× (P0-F01), and the station is under-powered by 1–2 orders of
magnitude (P0-F03). Meanwhile 95 of the 100 MW of arrays have no assigned load (P0-F04).
The pieces exist to fix this, but no document connects them.

Beyond closure, the BOM leaves out whole categories the phase cannot run without: launch,
communications and operations, crew (if any), tug propellant supply, development and
pathfinders, spares and contingency (P0-F08 to F14). Eight of the nine concluded Phase 0
deliberations were never written back into the specs (P0-F15). Finally, the project
describes Phase 0 as "pure research" while budgeting $15.7B of hardware (P0-F17).

| Severity | Count | Findings |
|---|---|---|
| Blocking | 1 | F01 transport capacity |
| Major | 14 | F02–F05, F06, F08–F12, F15, F17–F19 |
| Minor | 4 | F07, F13, F14, F16 |

## Findings by theme

### Closure — the numbers between items

- **F01 Transport (blocking).** About 150–250 kWe of Hall thrusters gives ~8–13 N on a
  ~300 t loaded tug. A 6–10 km/s round trip is then ~5–10 years of thrusting, not the
  ~1.5 years that "10+ cycles in 15 years" implies.
- **F02 Mining.** The robot document gives both 1,000 t/yr and 2–5 t/h (17–44 kt/yr if
  continuous) for the same robot. Neither the duty cycle nor the concentration ratio is
  stated.
- **F03 Station power.** Refining 50 kt/yr of Al, Fe, Ni and Si takes ~2–90 MW depending on
  the product mix, against 1–2.5 MW specified.
- **F04 Arrays.** 100 MW is specified, ~5 MW of it is allocated, and there is no split
  between L4/L5 and the asteroids. 200–500 MWh of batteries are specified for L4/L5, which
  has no eclipse.

### Plausibility

- **F05 Array cost.** $5/W installed reads as a terrestrial price. Space arrays cost tens to
  hundreds of $/W, before launching ~1,000 t.
- **F06 Prospecting.** 20 asteroids per satellite per year is beyond a 100 kg spacecraft's
  Δv. "Survey" needs a definition.
- **F07 Robots.** The robot mass (2.5–3.5 t) and the 500 kg robot assumed in rq-0-26
  disagree. 20–50 kW of solar excavation power on a walking robot is unexplained.

### Gaps — not in the BOM

- **F08** Launch services.
- **F09** Communications, ground segment and mission operations.
- **F10** Crew transport, habitat and life support, if the station is "human-tended".
- **F11** Krypton or iodine supply for the tugs. The ISPP units produce propellant that no
  Phase 0 vehicle uses.
- **F12** Development, pathfinders, test campaigns, replacement units and contingency.
- **F13** Organisational infrastructure has no specification at all.
- **F14** Debris, contamination and regulatory compliance.
- **F18** No fallback if microgravity metallurgy fails. rq-0-11 already requires 0.05–0.15 g
  zones that the station does not have.
- **F19** Phase 0's output is not tied to Phase 1's demand or delivery point: the station is
  at L4/L5, the Phase 1 node at L1.

### Stale documents and contradictions

- **F15** Only rq-0-26 reached a spec. rq-0-11, 14, 18, 28, 29, 30, 47 and 48 are concluded
  but not reflected in any spec.
- **F16** Consensus documents disagree with the BOM on prospecting fleet size, transport
  fleet size and propellant, and the ISPP site. They were synthesised from Opus 4.5 although
  Opus 4.6 specs exist.
- **F17** "Phase 0 is pure research" (homepage) versus $15.7B of Phase 0 hardware and a
  decision-gate sequence that ends at a PDR.

## What this asks of the models

For each item, and for the phase as a whole, the panel is asked to:

1. **Test each finding.** Answer agree, partly or disagree, with the calculation. Several
   findings here are order-of-magnitude estimates and may be wrong in detail.
2. **Revise the spec.** Give ranges and a basis for each changed value.
3. **State interfaces.** Give mass, power, propellant and data flows to the other items.
4. **Propose a BOM delta.** Items to add, remove, split or resize.
5. **Keep disagreements.** Where models still differ, both positions stay; the
   reconciliation does not pick a winner.

The phase-level prompt also asks for:

- a closed budget table covering mass flow, power, Δv and trip time, and cost;
- a split of Phase 0 into 0A (research and pathfinders) and 0B (industrial build-out), with
  the gate between them.

Nothing is applied automatically. The reconciliation proposes changes; accepting them into
`content.ts` and the specs is a human decision. Any change to a consensus figure should also
update the explorer's `core/metrics.ts` and `core/models.ts`.

## Model note

Re-assessing with the same generation that wrote the specs mostly measures self-consistency.
The plan is:

- **Round 1:** run with the May 2026 panel (`--panel=may`).
- **Round 2:** bring in the newest models (`--panel=latest`). They review round 1's
  reconciliation rather than starting cold, so the debate accumulates.

Every exchange is archived as raw JSON. This answers the holistic review's reproducibility
point.
