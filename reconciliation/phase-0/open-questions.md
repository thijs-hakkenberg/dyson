# Phase 0 — open-question register after re-assessment round 2

*2026-10-12. Every open question from the round-2 reconciliation
([`phase.md`](round-2/reconciliation/phase.md) §5 and the Reviewer note), and every question
the owner decisions ([`decisions.md`](decisions.md)) could not settle by reasoning, mapped to
the research-question register (`src/content/research-questions/phase-0/`,
`src/lib/services/critical-path.ts`).*

**How each question gets answered:**

| Method | What it means | Register type |
|---|---|---|
| **Literature** | Published data, sample returns, heritage, market data | `meta-research` |
| **Experiment** | Physical tests: ground, parabolic, ISS, or the 0A pathfinder | `experimentation` |
| **Simulation** | Computational models: DEM, trajectories, ejecta | `simulation` |
| **Analysis** | Desk calculation or modelling from existing inputs | `analysis` |
| **Stakeholder** | Cannot be reasoned to an answer; needs external parties or the owner's values | `discussion` |

A question can need several methods. The first one listed is the one to start with.

## New questions (rq-0-50 … rq-0-63)

| RQ | Question | Methods | Priority | Feeds |
|---|---|---|---|---|
| rq-0-50 | Target asteroid class and recoverable product grade | Literature → Experiment (0A sampling) | critical | D-01 A3, target gate |
| rq-0-51 | Beneficiation ratio for native Fe-Ni in microgravity | Experiment, Simulation | critical | D-01 A5, siting |
| rq-0-52 | Low-thrust trajectories and cycle cadence to candidate NEAs | Simulation | high | D-05, fleet size, propellant demand |
| rq-0-53 | EP propellant supply audit (I, Ar, Kr, Xe) | Literature | high | D-05 |
| rq-0-54 | MW-class EP: life, thermal load, plume compatibility | Experiment, Literature | critical | D-05, KDP-0B |
| rq-0-55 | Water EP: does it close Phase 0 transport? | Analysis, Literature | medium | D-05, ISPP scope |
| rq-0-56 | No-melt Fe-Ni refining (carbonyl, H₂): yield, reagent recycling | Experiment, Literature, Analysis | high | metallurgy route, rq-0-11 |
| rq-0-57 | Delivered cost per kg to NEA sites and SEL1 | Literature (quotes) | high | D-01 A2, cost basis |
| rq-0-58 | Phase 1 material demand for Phase 0 output | Analysis (needs the Phase 1 re-assessment) | critical | D-01, demand gate |
| rq-0-59 | Phase 0 → Phase 1 delivery node | Simulation | high | D-04 |
| rq-0-60 | HV power tethers on abrasive regolith: insulation life | Experiment, Literature | medium | robot power |
| rq-0-61 | Phase 0B delivered cost per kg vs Earth supply | Analysis | critical | economics gate |
| rq-0-62 | TRL / AD² re-baseline for the revised architecture | Analysis, Literature | critical | D-02 gate thresholds |
| rq-0-63 | Integrated schedule: 0A, gates, 0B ramp | Analysis | high | D-02, cost of delay |

## Reopened or updated questions

| RQ | Change | Why | Methods |
|---|---|---|---|
| rq-0-41 | **Retyped to stakeholder discussion**, priority high | D-03: the debris limit cannot be reasoned to a number. The tailings stream (13–47 kt/yr) was added to its scope. | Simulation (ejecta, tailings), Experiment (containment), **Stakeholder** (licensing state) |
| rq-0-26 | **answered → investigating** | The torque figures imply 480–1,900 rpm, not a bucket wheel. Subsystem mass and the status of counter-rotation are disputed. | Simulation (DEM), Experiment |
| rq-0-20 | **answered → investigating** | The "15–20× world xenon production" claim is unsupported. Demand is now 150–1,200 t/yr. | Literature → rq-0-53 |
| rq-0-28 | **answered → investigating** | "Phase 0 costs approximately correct" is disputed: the panel gives $22–195B against the BOM's $15.7B. | Analysis → rq-0-61 |
| rq-0-6 | note added | Excavation power disputed ~10× (2–15 kWe vs 40–100 kWe) | Simulation (DEM), Experiment |
| rq-0-11 | note added | Whether gravity is needed at all is contested; the scale-gap framing is disputed | Experiment (≥1 t batch at 0.05–0.15 g) vs rq-0-56 |
| rq-0-16 | note added | The 30,000 h kW-class Hall result does not cover MW-class or iodine | Experiment → rq-0-54 |

## Round-2 open questions already covered elsewhere

| Panel question (§5) | Where it lives |
|---|---|
| Solar-grade Si in space vs Earth-supplied | rq-0-15, rq-0-44. The panel narrowed the product to Fe-Ni; Si is deferred, so these stay open but off the 0A critical path. |
| Reagent and precision-spare import stream | rq-0-56 (process BOM with recycling losses) |
| Array, launch, ground and propellant supplier quotes | rq-0-57 (launch), rq-0-53 (propellant). Array and ground quotes are procurement tasks at KDP-0B. |
| Iodine plume corrosion of arrays | rq-0-54 |
| Fraction of tug propulsion losses rejected by the bus | rq-0-54 |

## Owner decisions that remain provisional

These are decisions in [`decisions.md`](decisions.md) whose *interim* answer is recorded but
whose final answer waits on the questions above:

| Decision | Interim position | Final answer waits on |
|---|---|---|
| D-01 0B go and scale | Gated real option | rq-0-58, rq-0-61, rq-0-50, rq-0-57 |
| D-02 gate thresholds | Structure agreed; TRL 6 at KDP-0B | rq-0-62, rq-0-63 |
| D-03 debris limit | ALARP + interim ≤1 t/yr per site | rq-0-41 (licensing state) |
| D-04 delivery node | SEL1 reference | rq-0-59, rq-0-58 |
| D-05 tug propellant | Iodine reference, argon alternate | rq-0-53, rq-0-54, rq-0-52, rq-0-55 |

## Process issues (not research questions)

These are fixes to the re-assessment pipeline and the documents, not questions about the
plan:

1. **Phase-level prompt missed seven deliberation conclusions.** It carried only rq-0-28, so
   Claude and GPT saw the others as one-line summaries. The item prompts were complete.
   Fix: include every mapped conclusion in the phase prompt.
2. **The prompts did not include the TRL table or decision gates**, so the panel's gates use
   no TRL criteria. Fix: add `trl-assessment.ts` and `decision-gates.ts` to the phase prompt.
3. **Model self-identification is unreliable.** GPT-6.1 Sol wrote `model: GPT-5.2`; Gemini
   wrote a role name. Fix: the script fills `model` from metadata.
4. **The Gemini seat was Flash (3.8)**, because the October workspace serves no Gemini Pro.
   Note this in any publication of the round.
5. **Cost bases differ** ($/kg to LEO vs delivered) and **propellant demand methods differ**
   (per-cycle vs burn-duty). Normalise these in the next round's prompt (rq-0-57, rq-0-52).
6. **Arithmetic check.** GPT's "millions of dollars per kg" is inconsistent with its own
   envelope (~$3,000–20,000/kg).
7. **Status drift between files.** Some questions disagree between the question file and
   `critical-path.ts` (e.g. rq-0-47 and rq-0-48: `open` in the file, `answered` in the
   registry). One source should be generated from the other.
