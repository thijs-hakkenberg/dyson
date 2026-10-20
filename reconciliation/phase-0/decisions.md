# Phase 0 — owner decisions after re-assessment round 2

*2026-10-12 · Method: [`src/content/methodology/decision-frameworks.md`](../../src/content/methodology/decision-frameworks.md),
the nine-step Composite Scaffold, with the "parallel test" (QOC, GRADE EtD, ACH) on D-01 ·
Inputs: [`round-2/reconciliation/phase.md`](round-2/reconciliation/phase.md) and the item reconciliations.*

The round-2 panel (Claude Opus 5.5, Gemini 3.8 Flash, GPT-6.1 Sol) agreed on the engineering
direction: co-located processing, a Fe-Ni product, MW-class tugs, an uncrewed phase, and a
0A/0B split. It left five choices it called **values or authority questions**. This document
walks each one through the scaffold and gives a recommendation. Each recommendation states
the values it assumes, so you can overrule the values rather than the arithmetic.

**Status of each decision: proposed, awaiting owner sign-off.** Nothing here changes the BOM
until signed. Where reasoning cannot settle a question, the decision is an interim position
and the question goes to the research-question register
([`open-questions.md`](open-questions.md)).

| # | Decision | Recommendation | Settles now? | Open questions raised |
|---|---|---|---|---|
| D-01 | What Phase 0B is for, and when to commit | Fund 0A. Hold 0B as a gated real option, sized at the gate by signed Phase 1 demand. Call Phase 0 a capability programme, not a cost saving. | Yes (framing). Scale is deferred. | rq-0-58, 0-61, 0-50, 0-57 |
| D-02 | Gate structure and stringency; use of TRL | Hybrid: NASA life-cycle gates with TRL/AD² for each critical technology, plus four discriminating gates (target, demand, economics, licence). Stringency follows reversibility. | Structure yes; thresholds need the TRL re-baseline | rq-0-62, 0-63 |
| D-03 | Escaped-debris and containment limit | Set an ALARP requirement with an interim design ceiling. The number itself goes to modelling, tests and the licensing state. | **No.** Interim value only. | rq-0-41 (reopened, retyped) |
| D-04 | Where Phase 0 delivers its product | Use SEL1 as the reference case. Re-decide jointly with Phase 1 at the 0B gate. | **No.** Reference only. | rq-0-59, 0-58 |
| D-05 | Tug propellant; water-EP track | Select no propellant yet. Cost iodine as the reference case and argon as the alternate, pending the supply audit and life tests. Water EP stays a desk study until a C-type target is confirmed. | Partly | rq-0-53, 0-54, 0-55, 0-52 |

**Was a TRL framework used for the gates?** Partly. See D-02.
- The site's existing gates (`src/lib/services/decision-gates.ts`) link each gate to TRL
  assessments, and the PDR gate requires "all key technologies at TRL ≥ 5".
- The round-2 panel's gates use **no** TRL criteria. This is a defect in the re-assessment
  pipeline: the prompts never included `trl-assessment.ts` or `decision-gates.ts`, so the
  panel could not use them.
- The TRL table also no longer matches the revised architecture. It rates "high-power SEP
  (100+ kW)" at TRL 6–7, while the panel rates the MW-class iodine tugs it now relies on at
  TRL 2–4. TRL is specific to scale and environment, which is why D-02 adds a re-baseline
  (rq-0-62).

---

## D-01 · What Phase 0B is for, and when to commit

**1. Frame and decision type.**
- **Type:** executive decision (Kruchten); it sets the programme's purpose.
- **Reversibility:** committing to 0B hardware ($17–175B across the panel) is a one-way
  door. Funding 0A and deferring 0B is a two-way door.
- **Cynefin domain:** *complex*. The outcome depends on unknowns that only probing resolves:
  recoverable metal grade, Phase 1 demand, launch price.
- **Decision rights (RAPID):** the project owner decides; the panel gave input.
- **Decision basis (Howard):**
  - *Know:* the 50 kt/yr station fails, and a co-located Fe-Ni plant could deliver ~1 kt/yr.
  - *Can do:* the options below.
  - *Want:* the criteria below.
- **Frame correction (GPT's weakest-link finding).** Round 1 went from "50 kt/yr does not
  close" straight to "build a smaller industry". It never asked whether Phase 0 should build
  industry at all, rather than gather evidence and buy material from Earth. That question
  is the frame here.

**2. Criteria and weights**, stated before the options. The swing weights reference the
actual spread between the best and worst option on each criterion.

| Criterion | What "good" means | Swing weight |
|---|---|---|
| C1 Evidence value | Retires the existential ISRU risks (metallurgy, excavation, autonomy) the swarm thesis rests on | 0.30 |
| C2 Capital at risk before evidence | Little money is committed before those risks are retired | 0.25 |
| C3 Usefulness to Phase 1 | Delivers material or capability Phase 1 actually needs | 0.15 |
| C4 Cost per kg against Earth supply | Delivered $/kg is competitive | 0.10 |
| C5 Time to first useful product | — | 0.10 |
| C6 Option value | Keeps later choices open | 0.10 |

*Musts* (Kepner-Tregoe screen):
- **M1:** no hardware commitment without a closed mass, power and cost baseline.
- **M2:** the public description of Phase 0 must match its budget (finding P0-F17).

*Values assumption:* C1 and C2 together carry 55% of the weight. This reflects a project
whose stated discipline is "answer the questions before spending on hardware". If your
priority is speed to Phase 1, raise C5 and C3 and see the sensitivity in step 5.

**3. Options**, including the null option and rejected options with arguments (Tyree).
- **O0, null.** 0A only: research, scouts and one pathfinder. No in-space production is
  planned, and Phase 1 is baselined on Earth-supplied material.
- **O1.** Commit now to an industrial 0B of ~1 kt/yr Fe-Ni (the round-1 direction).
- **O2.** 0A now. 0B is a real option whose go and scale are decided at a gate, from signed
  Phase 1 demand and a delivered-cost model.
- **O3.** 0A, then a pilot-scale 0B demonstrator (10–100 t/yr) as a pure capability
  programme. Industrial scale is a later, separate decision.
- **O4, lunar-first processing.** *Rejected.* Claude calls it "a poor fit for an Fe-Ni
  product", and GPT rates it a separate strategic alternative at $5–15B. It changes the
  resource, not the uncertainty.
- **O5, the original 50 kt/yr central station.** *Rejected.* It fails M1; the panel was
  unanimous that it cannot close.

**4. Assessment matrix (QOC).** Scores run 1 (worst) to 5 (best).

| | C1 (.30) | C2 (.25) | C3 (.15) | C4 (.10) | C5 (.10) | C6 (.10) | **Weighted** |
|---|---|---|---|---|---|---|---|
| O0 0A only | 3 | 5 | 2 | 4 | 5 | 3 | **3.65** |
| O1 commit 0B now | 4 | 1 | 4 | 2 | 3 | 1 | **2.65** |
| **O2 gated real option** | 5 | 4 | 4 | 3 | 2 | 5 | **4.10** |
| O3 pilot only | 5 | 4 | 2 | 1 | 2 | 4 | **3.50** |
| O4 lunar-first | 3 | 2 | 2 | 2 | 2 | 2 | **2.30** |

Score bases:
- **C2:** the panel's capital before the first gate. O1 = 0A + 0B ($22–195B); O0, O2 and O3
  = 0A only ($3.5–16B).
- **C4:** Claude's recomputed $1,300–11,000/kg for 0B, against $2,500–12,000/kg for Earth
  delivery to SEL1. A pilot is uneconomic per kg.
- **C5:** Earth supply is available now. Any 0B option arrives 3–6 years after its gate
  (Claude, GPT).

**5. Sensitivity and trade-off points (ATAM).**
- **Trade-off point: evidence value (C1) against capital protection (C2).** O2 leads O0 until
  C2 is weighted ~2.7× C1 (at C1 0.15, C2 0.40 they tie). That is a *values* choice:
  how much you will pay to learn whether in-space industry works.
- **Sensitivity point: launch price.** Claude's falsifier is sustained delivery below
  ~$1,000/kg to LEO. Then Earth supply dominates C4 and C5, and O0 overtakes O2 for
  Phase 0–1. O2 survives because its gate re-tests exactly this.
- **Sensitivity point: recoverable metal grade.** GPT's chain assumes ~20% recoverable metal,
  Gemini's 8–12%, Claude's 2–20% depending on class. Below ~5%, 0B fails C4 at any scale.
- **Sensitivity point: Phase 1 demand.** Claude puts it at 0.04–11 kt/yr. C3 swings from 2
  to 5 across that range.

**6. Evidence certainty** (calibrated, after the IPCC and ICD 203 conventions).

| Claim | Likelihood | Confidence | Basis |
|---|---|---|---|
| The 50 kt/yr central station cannot close | virtually certain | high | All three models, independent derivations |
| A co-located Fe-Ni plant delivers ~0.6–2.5 kt/yr | likely | low | Three chains disagree on duty cycle (9–25%) and grade |
| 0B beats Earth supply on $/kg in Phase 0–1 | about as likely as not (33–66%) | low | Claude 33–66%. GPT's "millions $/kg" is an arithmetic error (rapporteur note 2). Gemini silent. |
| Microgravity or partial-g metallurgy works at t-batch scale | unknown | low | No t-scale data; rq-0-11 is a deliberation, not a test |
| Phase 1 needs Phase 0 material at all | unknown | low | Demand range spans 65× |

**GRADE Evidence-to-Decision.**

| Factor | Assessment |
|---|---|
| Benefits | Retires existential risk; keeps the ISRU path open |
| Harms | Delay, and a 0A spend that may end in "no" |
| Certainty | Low |
| Values | Capability over near-term cost (the assumption above) |
| Resources | $3.5–16B before the gate |
| Feasibility | Moderate |
| Acceptability | Requires honest public framing |

→ **Conditional recommendation for O2.**

**ACH** (anchoring check). Three hypotheses were scored against the panel's evidence:
- **H1:** in-space Fe-Ni production is needed for Phase 1.
- **H2:** Earth supply suffices through Phase 1.
- **H3:** lunar supply is better.

No hypothesis is eliminated. H3 is the most disconfirmed: it is a poor product fit and costs
more. H1 and H2 both survive.

The evidence that would discriminate between them is not engineering. It is the **Phase 1
demand schedule** and **delivered launch price**, both cheap to obtain by analysis and quotes.

*Parallel-test signal.* QOC and GRADE favour O2. ACH says the weakest link is *information*,
and that the discriminating information is cheap. So O2 should begin with the cheap
analyses (rq-0-58, rq-0-57) **before** the 0A hardware milestones. They can show whether 0B
matters at all.

**7. Key assumptions and their falsifiers.**

| Assumption | What would falsify it |
|---|---|
| A1: the swarm thesis needs in-space material by Phase 2 | Phase 2 mass demand fits within plausible launch capacity and price |
| A2: delivered launch price stays above ~$1,000/kg to LEO through Phase 1 | Sustained quotes below that (rq-0-57) |
| A3: an accessible NEA has ≥5% recoverable Fe-Ni | 0A rendezvous and sampling below that (rq-0-50) |
| A4: 0A ($3.5–16B) is fundable | No funding path; then O0 by default |
| A5: beneficiation ≥3:1 in microgravity | Claude's falsifier: below 3:1 (rq-0-51) |

*Premortem.* "It is 2040 and 0A was wasted." The most likely story: no target met A3, and the
project had not pre-committed to O0 on that outcome. Mitigation: write the O0 fallback
into the gate (D-02).

**8. Decision, warrant and accepted downside (Y-statement).**

> In the context of a Phase 0 whose original BOM does not close, facing a choice between
> committing to in-space industry now and proving it first, **we choose O2**: fund 0A
> (research, rendezvous scouts, one pathfinder) and hold 0B as a gated real option whose
> go/no-go and scale are set at the gate by signed Phase 1 demand and a delivered-cost
> model. We do this to retire the existential ISRU risks with the least capital at risk,
> **accepting** that Phase 1 may start on Earth-supplied material, and that in-space
> production arrives 3–6 years later than an immediate commitment would deliver it.

*Warrant (Toulmin).* In a complex domain with a one-way capital commitment, probing first and
deciding at the gate beats committing up front. The option is worth holding because 0A can
actually resolve its key unknowns (A3, A5) and cheap desk work can resolve the others (A1,
A2).

*Qualifier:* conditional, low certainty.

*Rebuttal:* if launch prices fall as Claude's falsifier describes, O0 becomes the better
choice for Phase 0–1. The gate exists to catch that.

**9. Consequences and follow-on decisions (Kruchten).**
- **Enables** D-02, which must include a demand gate and an economics gate.
- **Constrains** the BOM: Phase 0 is split into 0A and 0B, and 0B items carry "conditional on
  gate" status and costs.
- **Requires:**
  - a Phase 1 demand schedule (rq-0-58);
  - a delivered-cost model (rq-0-61);
  - a homepage rewrite of "Phase 0 is pure research" to "Phase 0A is research and
    pathfinders; industrial 0B only if the gates pass";
  - a revisit of CI-15 (Phase 0 start date).
- **Conflicts with** any public claim that Phase 0 makes material cheaper than Earth supply.

*Decision Quality after this decision.*
- Frame ✔, alternatives ✔, values: stated but **yours to confirm**, reasoning ✔.
- Information ✘ is the weakest link (rq-0-58, 0-57, 0-50).
- Commitment: pending sign-off.

---

## D-02 · Gate structure, stringency and TRL

**1. Frame.** A property decision on the 0A→0B process. Reversible: gates can be revised
before they bite. *Complicated* domain: good practice exists (NASA NPR 7123.1 and NPR 7120.5
life-cycle reviews and KDPs; the TRL scale and AD² difficulty rating; ECSS-E-HB-11A on TRL
assessment), so the problem is applying it, not inventing it.

**2. Criteria.**

| Criterion | Weight |
|---|---|
| C1 Discriminating power: would a pass or fail change a decision? (strong inference) | .30 |
| C2 Coverage of project-ending risks (metallurgy, excavation, autonomy, propulsion life, demand) | .25 |
| C3 Objectivity and measurability | .15 |
| C4 Legibility to funders and agencies (industry-standard vocabulary) | .15 |
| C5 Cost of delay the gates impose | .15 |

**3. Options.**
- **G0, null.** Keep `decision-gates.ts`: 5 gates, mixed TRL and performance criteria,
  scheduled before their technologies are ready (CI-18).
- **GA.** The union of the panel's gates: about nine performance-threshold gates (Claude
  G1–G9, GPT's 7), no TRL.
- **GB.** Gemini's minimal four gates.
- **GC.** TRL-only, NASA style: every critical technology at TRL 6 by the 0B PDR.
- **GD, hybrid.**
  - NASA life-cycle structure, with KDP-0A at start, a 0A mid-term review and KDP-0B.
  - Each critical technology carries a TRL target *and* an AD² rating.
  - Four discriminating gates that TRL cannot express:
    - **Target:** a sampled grade at or above the A3 threshold.
    - **Demand:** a signed Phase 1 schedule known to within 3×.
    - **Economics:** delivered $/kg against Earth supply.
    - **Licence:** debris limit agreed with the licensing state.
  - Every failure outcome is pre-committed, including "fall back to O0".

**4. QOC.**

| | C1 | C2 | C3 | C4 | C5 | **Σ** |
|---|---|---|---|---|---|---|
| G0 | 2 | 2 | 3 | 3 | 3 | 2.45 |
| GA | 4 | 4 | 4 | 2 | 2 | 3.40 |
| GB | 2 | 2 | 4 | 2 | 5 | 2.75 |
| GC | 2 | 3 | 4 | 5 | 3 | 3.15 |
| **GD** | 5 | 5 | 4 | 5 | 2 | **4.40** |

Why TRL alone (GC) is not enough:
- TRL rates a technology's maturity. It says nothing about whether the architecture closes,
  whether demand exists, or whether $/kg competes. Those are the three things D-01 hinges on.
- TRL is also scale-specific. The current table's "SEP TRL 6–7" is true at 100 kW and
  misleading at the 1–2.5 MW the tugs need, which the panel rates TRL 2–4.

**5. Points.**
- **Trade-off point (Claude DQ5): gate stringency against schedule.** Claude says "Likely
  (66–90%) at least one of G3/G6/G7 fails or forces a re-scope." Gemini: a 2–3 year delay
  buys >80% less capital exposure.
- **Sensitivity point: the TRL threshold at KDP-0B.** TRL 6 versus TRL 5 moves the 0B date by
  years for the MW-class EP and partial-g metallurgy lines.

**6. Evidence certainty.**

| Claim | Likelihood | Confidence |
|---|---|---|
| NASA-style TRL-6-at-PDR reduces cost growth | likely | medium (GAO's annual assessments of major projects repeatedly link immature technology at PDR/CDR to cost and schedule growth) |
| The panel's specific thresholds (hours, tonnes, %) | — | low (no elicited risk appetite, per Claude DQ5) |

**7. Assumptions and falsifiers.**
- **A1:** the project will seek agency or institutional partners, so legibility matters.
  Falsifier: a purely private funding path.
- **A2:** critical technologies can reach TRL 6 in 0A. Falsifier: the rq-0-62 re-baseline
  shows TRL ≤3 with AD² ≥ 4 for any project-ending technology; the gate then becomes a
  research-only programme.

**8. Decision.**

> In the context of a 0A→0B commitment that is one-way and expensive, facing gates that
> either ignore TRL (panel) or rely on it alone (classic), **we choose GD**: NASA life-cycle
> KDPs, a TRL target plus AD² for each critical technology, and four discriminating gates
> (target, demand, economics, licence) with pre-committed failure outcomes. We do this so
> that every gate can change a decision and speaks a funder's language, **accepting** a
> longer 0A and that some thresholds are provisional until the TRL re-baseline.

*Stringency follows reversibility.* That is the values rule assumed here; confirm or change it.
- **One-way gates (KDP-0B):** TRL 6 in a relevant environment for project-ending
  technologies, with no waivers.
- **Two-way, internal 0A milestones:** TRL 4–5 is enough.

**9. Consequences.**
- Rewrite `decision-gates.ts` after sign-off: re-time the gates to technology readiness
  (closes CI-18), and add the target, demand, economics and licence gates.
- Re-baseline the TRL table for the revised architecture (rq-0-62). It covers 6 of 33 BOM
  items today (CI-19).
- Produce an integrated 0A/gate/0B schedule (rq-0-63); no model gave one.
- Pipeline fix: include the TRL table and the gates in future re-assessment prompts.

---

## D-03 · Escaped-debris and containment limit

**1. Frame.** A property decision with external authority. It is **not the project's alone
to make.** The licensing state, other operators and planetary-protection norms have a say.
*Complex* domain. It is a one-way door once licensed.

**2. Criteria.**
- Safety of own assets: arrays, optics, tugs.
- Third-party and legal acceptability.
- Containment mass and cost.
- Long-term site usability.
- Precedent for the rest of the swarm.

**3. Options.**
- ≤ 10 kg/yr per site (GPT; 99.999875% at 8 kt/yr).
- ≥ 99.9% capture for grains > 5 µm (Gemini; ~35 t/yr at 35 kt/yr).
- ≤ 0.1–1 t/yr per site (Claude).
- An ALARP requirement with no fixed number.
- **Null:** keep 99% (rejected unanimously as a safety criterion).

**4. QOC.** Not scorable with confidence. Every criterion depends on ejecta behaviour and
consequence data that do not exist. Claude also flags that the **tailings stream (13–47 kt/yr)
is the larger problem**, and none of the options address it.

**5. Points.** A trade-off point between containment mass and complexity on one side and
third-party risk on the other. GPT and Claude both call the threshold a values question.

**6. Evidence certainty.** Very low. There are no ejecta-trajectory models for the site and
no containment tests at representative feed.

**7. Key assumption.** Escaped grains do not reach a hazardous population outside the
asteroid's sphere of influence. Falsifier: ejecta modelling shows long-lived heliocentric
streams.

**8. Decision: interim only.**

> **We cannot reason our way to the number.** Adopt the structure now:
> - an **ALARP** requirement: reduce escape until further reduction is grossly
>   disproportionate;
> - an **interim design-sizing ceiling of ≤ 1 t/yr escaped per site** (Claude's upper bound),
>   used only to size containment hardware in 0A;
> - a stated aspiration of ≤ 10 kg/yr (GPT);
> - a tailings-management requirement.
>
> The binding limit is set at the **licence gate** (D-02), from three inputs: ejecta
> modelling, containment tests, and agreement with the licensing state.

**9. Consequences.**
- rq-0-41 is reopened as a `discussion` question with external stakeholders. It needs
  simulation (ejecta, tailings) and experiments (containment).
- The panel's $50–300M debris line stays a placeholder.

---

## D-04 · Where Phase 0 delivers its product

**1. Frame.** A property decision. Reversible until 0B tugs and the receiving node are
designed. *Complicated*: it can be solved by a joint logistics study, but only once Phase 1
is known.

**2. Criteria.**
- Round-trip Δv and cadence.
- Proximity to the Phase 1 assembly node (bom-1-4, placed at Sun–Earth L1 in the current
  consensus).
- Station-keeping and traffic.
- Comms latency.
- Thermal environment.

**3. Options.**
- **SEL1.** Claude; Gemini at high confidence, citing a 1.5–2.5 km/s each-way penalty from
  L4/L5.
- **SEL4/L5.** The original station site.
- **NEA-local storage**, with Phase 1 tugs collecting.
- **EML1.**
- **Defer to a joint optimisation.** GPT: auto-relocating to L1 is "too strong".

**4. QOC.** SEL1 scores best on proximity and Δv under the *current* Phase 1 consensus, and
worst on station-keeping and traffic. The ranking depends entirely on where Phase 1
assembles, which is itself unreconciled (CI-22: the node's size differs 19× between models).

**5. Points.** A sensitivity point on Phase 1 node location: every option's score moves
with it.

**6. Evidence certainty.** Low. No trajectory study exists for candidate NEAs (rq-0-52).

**7. Key assumption.** Phase 1 assembles at SEL1. Falsifier: the Phase 1 re-assessment
moves the node.

**8. Decision: reference only.**

> Use **SEL1 as the reference case** for 0A sizing, because the current Phase 1 consensus
> puts the node there. **Re-decide at KDP-0B jointly with Phase 1**, from a simulation of
> candidate NEA → node trajectories.

**9. Consequences.**
- rq-0-59 (simulation) and rq-0-58 (demand) are added.
- The Phase 1 receiving node ($200–600M, Claude/GPT) stays conditional.

---

## D-05 · Tug propellant, and whether to fund water electric propulsion

**1. Frame.** A property decision. Reversible until tug PDR. *Complicated*: a supply audit and
life tests can answer it. The panel was unanimous that xenon is not the baseline and that
no LOX/LH₂ is produced in Phase 0.

**2. Criteria.**

| Criterion | Weight |
|---|---|
| Supply security at 150–1,200 t/yr | .30 |
| MW-class performance and life | .25 |
| Recurring delivered cost | .20 |
| Spacecraft compatibility (iodine corrosion of arrays and optics) | .15 |
| Qualification cost | .10 |

**3. Options.**
- **Iodine.** Supply ~3–3.5×10⁴ t/yr world (all three agree). TRL 2–4 at high power.
- **Argon.** Abundant, lower thrust/power, mature at low power.
- **Krypton.** Supply poorly documented: Claude 10²–10³ t/yr, Gemini 150–180 t/yr.
- **Xenon.** Pilot scale only, at 50–100 t/yr world.
- **Water EP.** Isp 800–1,200 s (Gemini), with a mass ratio of ~21 at 200 s for 6 km/s
  (GPT). Low TRL at multi-hundred kW.
- **Null.** Keep "krypton/iodine" as the BOM states.

**4. QOC.**

| | Supply | Perf/life | Cost | Compat. | Qual. | Σ |
|---|---|---|---|---|---|---|
| Iodine | 5 | 2 | 4 | 2 | 2 | 3.30 |
| Argon | 5 | 2 | 4 | 5 | 3 | 3.85 |
| Krypton | 2 | 3 | 3 | 5 | 3 | 3.00 |
| Xenon | 1 | 4 | 1 | 5 | 4 | 2.65 |
| Water | 4 | 1 | 5 | 4 | 1 | 3.15 |

Argon leads iodine mainly on compatibility, and that score rests on an unquantified
corrosion risk raised by Gemini alone. The spread is within scoring noise. **The matrix
does not discriminate; the data would.**

**5. Points.**
- **Trade-off point (Claude DQ4, GPT B): Isp at fixed power**, cadence against recurring
  propellant cost.
- **Sensitivity point: MW-class lifetime.** Life is unproven for every option, so whichever
  passes life test first wins.

**6. Evidence certainty.**
- Iodine supply ≫ demand: likely, medium confidence.
- Krypton supply: low confidence.
- MW-class life for any propellant: unknown.
- Demand: 150–1,200 t/yr, with a methods conflict (per-cycle versus burn-duty; rapporteur
  note 5) to be reconciled.

**7. Assumptions and falsifiers.**
- **A1:** a MW-class Hall or MPD cluster reaches the 20,000–40,000 h total-impulse duty.
  Falsifier: life tests (rq-0-54).
- **A2:** demand ≤ 600 t/yr. Falsifier: rq-0-52 trajectories with Gemini's burn-duty method.
- **A3:** water EP is only worth it at a C-type target. Falsifier: rq-0-55 shows closure
  for imported water too.

**8. Decision.**

> Do **not select** a propellant now. Cost **iodine as the reference case** and **argon as
> the alternate**, and drop "krypton" from the BOM text until the supply audit supports it.
> Fund the supply audit (literature/market) and MW-class life and thermal tests
> (experiment) in 0A. Water EP is a **desk study** (mass-ratio closure) and becomes a funded
> qualification track only if 0A confirms a C-type target. This keeps the tug design
> propellant-agnostic until data exist, **accepting** that tug PDR may wait for life-test
> results.

**9. Consequences.**
- rq-0-53 (supply audit) and rq-0-54 (life, thermal load, plume compatibility) are added.
- rq-0-55 (water EP) and rq-0-52 (trajectories and cadence) are added.
- rq-0-16 and rq-0-20 are reopened.
- The BOM text for bom-0-4 changes after sign-off.

---

## Sign-off

| Decision | Values assumed | Your call |
|---|---|---|
| D-01 | Evidence value and capital protection outweigh speed (C1 + C2 = 55%) | ☐ accept ☐ change weights ☐ choose another option |
| D-02 | Stringency follows reversibility; partners will want TRL vocabulary | ☐ accept ☐ amend |
| D-03 | ALARP + interim ≤ 1 t/yr ceiling until licence gate | ☐ accept ☐ amend |
| D-04 | SEL1 as reference, re-decided with Phase 1 | ☐ accept ☐ amend |
| D-05 | Propellant-agnostic tug; iodine reference, argon alternate | ☐ accept ☐ amend |

After sign-off, apply in one change:
- the BOM (0A/0B split and revised items in `content.ts` and `bom-data.ts`);
- the specs and `divergent-views.yaml`;
- `decision-gates.ts`;
- the explorer figures;
- the homepage text;
- the CI-15 to CI-20 closures.
