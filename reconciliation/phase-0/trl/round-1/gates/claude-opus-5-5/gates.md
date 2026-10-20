---
step: gates
item: gates
modelId: claude-opus-5-5
modelName: "Claude Opus 5.5"
endpoint: databricks-claude-opus-5-5
generated: 2026-10-17T21:55:17.810Z
seconds: 290.463
---

# Phase 0 Decision Gates under D-02: Proposed Gate Set

## Summary of findings

1. **The panel TRL baseline is not yet evidence.** It is a set of model ratings. Rating rule 2 states that consensus and design studies cannot support TRL ≥ 3. KDP-0A must therefore tie every rating to an evidence-register entry (rq-0-62). Until then, plan to the **lower bound** of each panel range. Gemini's higher, "high-confidence" ratings (for example T24 at 4–5, T16 at 3–4, T10 at 3–4) carry no cited test data in the baseline.

2. **The "project-ending" list is too long, and part of it is inflated.** The panel field takes the most severe class any model assigned. That makes 15 0B technologies project-ending: T01–T05, T08, T10, T14–T16, T19, T21, T22, T24, T25. Two 0A technologies are also project-ending, T11 and T18.
   - **The joint odds of passing are very low.** Treating each technology's AD² probability as independent gives a best case of about 0.15% that all 15 reach TRL 6 on one plan. This uses the most favourable AD² for each.
   - **Correlation would raise this, but not enough.** Correlated success could lift it by one to two orders of magnitude. First-pass success would still be unlikely.
   - **This is an illustration, not a forecast.** Mankins' probabilities are not calibrated for joint use.
   - **Two consequences follow.** The pre-committed fallback ("0A only, Earth supply") is the most probable KDP-0B outcome as the list stands. And reclassifying the split ratings is a KDP-0A task, not a formality.

3. **TRL 6 in a relevant environment cannot be reached on the ground for the regolith-contact technologies.** These are T04, T05, T08, T16, T19 and T24. Parabolic flights give seconds of microgravity, and drop towers give less. Neither can test anchoring, sustained excavation or particle escape at the required duration. **The 0A pathfinder is therefore on the KDP-0B critical path.** The pathfinder flight sets the earliest feasible KDP-0B date, not the technology's own ground test programme.

4. **The metallurgy routes are each architecture-change, but together they are project-ending.** The routes are T06, T17, T07 and T23. The gate must be "at least one route at TRL 6, end-to-end with T05, T19 and T22." It must not require all four, and it must not ignore them.

5. **D-02's "TRL 4–5 for internal 0A milestones" conflicts with flight-project practice for the scouts and the pathfinder.** NASA practice expects critical technologies at TRL 6 by a flight project's PDR. I recommend the owner state explicitly that scout and pathfinder critical technologies follow TRL 6 at their own PDR. The 4–5 rule should apply only to 0B development milestones.

---

## 1. KDP structure

| Gate | Months from 0A start | What drives the timing |
|---|---|---|
| **KDP-0A** | 0–3 | Programme start |
| Scout PDR (internal review) | 12–24 | Scout critical technologies |
| **0A mid-term review (MTR)** | 36–60 | TRL 4 across 0B technologies (≈2–4 yr); scout launch window; D-05 propellant choice |
| g-target (final) | 60–108 | Scout build (36–60) + cruise (12–36) + operations (6–18). Hayabusa2 took about 3.5 yr from launch (2014) to arrival at Ryugu. |
| Pathfinder results review | 84–144 | Pathfinder PDR after MTR, then build (24–36), cruise (12–30) and duration-relevant operations (6–18) |
| **KDP-0B** | 96–156 | Pathfinder results plus the slowest AD² 7 path (T16 and T04: 8–14 yr per Claude, 7–12 per GPT, 4–8 per Gemini) |
| Proposed sunset | 180 | If KDP-0B has not passed by month 180, the "0A only, Earth supply" outcome executes automatically. This is my proposal; the owner must commit it. |

**Divergence kept visible.** Gemini's lower year bounds would allow KDP-0B around month 60–72. I do not adopt them, because the pathfinder chain constrains the date independently of technology readiness.

### KDP-0A (month 0–3)

**Purpose:** authorise 0A, fix the evidence basis and pre-commit every outcome.

**Entry and exit criteria:**
- **Evidence register.** Each T-rating is linked to a cited test or paper, or downgraded to the highest level its evidence supports (rq-0-62).
- **Reclassification.** Every split risk class has been ruled on using the D-02 test: "does a fallback exist inside 0B that keeps the 0B option alive?"
- **Funded technology plans.** Each project-ending technology has a funded plan to TRL 6, with a named relevant-environment test (ground, ISS, pathfinder, or analysis plus test data).
- **Pathfinder scope.** The pathfinder's scope is tied to the technologies it must qualify (see §2).
- **Owner commitments.** The owner has committed the failure outcomes, the sunset date and the economics premium R (see §3).

**Outcomes:**
- **Go:** fund 0A.
- **No-go:** re-plan 0A. Phase 1 assumes Earth supply in the meantime.

### 0A mid-term review (month 36–60)

**Purpose:** confirm the paths to KDP-0B are real, down-select, and stop spending on options that cannot close.

Criteria are in §2 and §3. The essentials are:
- **Readiness.** Every project-ending 0B technology is at TRL 4, meeting the exit criterion: lab test agreeing with predictions, **and** a documented definition of the relevant environment.
- **Path clarity.** AD² for each project-ending technology has been re-assessed at ≤ 5. A clear path must exist.
- **Metallurgy.** At least two metallurgy routes are at TRL 4.
- **Propellant.** D-05 has been decided.
- **Scouts.** The scouts have launched.
- **Licensing.** The licensing state has engaged in writing.
- **Demand.** An indicative Phase 1 demand schedule exists.

**Outcomes:**
- **Pass:** continue to KDP-0B, freeze the pathfinder payload and narrow metallurgy to at most two routes.
- **Partial:** re-plan named technologies once, and slip the KDP-0B date within the cap.
- **Fail:** see §4.

### KDP-0B (month 96–156)

**Purpose:** decide whether to exercise the 0B real option, and size it.

**Criteria:**
- Every project-ending technology at TRL 6 in its relevant environment, with **no waivers**.
- At least one metallurgy route at TRL 6, end-to-end.
- All four discriminating gates passed.
- Mass, power and cost estimates closed (§5).

**Outcomes:**
- **Pass:** fund 0B at a scale set by signed demand and the delivered-cost model.
- **Fail:** "0A only, Earth supply," or one bounded slip within the sunset.

---

## 2. Technology criteria

### 2a. Scale: demonstrated versus required

Only heritage I am confident of is cited. Approximate figures are marked.

| T | Best demonstrated | Required | Ratio |
|---|---|---|---|
| T01 SEP | **Flight:** Psyche SPT-140, ~4.5 kW per thruster (launched 2023); Dawn array ~10 kW at 1 AU. **Ground:** X3 nested Hall ~100 kW (U. Michigan / NASA Glenn, 2017, reported). **Life:** NEXT long-duration test >50,000 h at ~7 kW (approximate figure). **Iodine:** ThrustMe NPT30-I2 on Beihangkongshi-1 (2020; Rafalskyi et al., *Nature* 2021), roughly 10² W class. | 1–2.5 MWe per tug, iodine or argon, 20–40 kh duty | Ground power 10–25×; flight ~200–500×; iodine ~10⁴×. Life is shown only at kW class and only for xenon. |
| T02 arrays | ROSA flight experiment on ISS (2017); iROSA (2021 onward); DART used ROSA. Largest wings are tens of kW (approximate). | 1–2.5 MW per tug; 2.5–8 MW site | About 10²× per wing (approximate) |
| T03 radiators | ISS active thermal control, order of ~70 kWth (unverified figure) | 1–9 MWth plant; 50–800 kWth per tug | About 15–130× (unverified) |
| T04 / T16 / T19 | **Sampling only:** OSIRIS-REx TAG (2020) and Hayabusa2 (2019). **Anchoring:** Philae (2014) harpoons did not fire and the lander bounced. **Ground:** RASSOR counter-rotating drums (lunar simulant, 1 g). No small-body anchoring has succeeded. | 0.5–5 t/h, 6–20 robots, multi-year | Not meaningful: one-off gram-scale events against continuous t/h operation |
| T06 carbonyl | Mond process, industrial at Clydach since 1902, in 1 g with terrestrial feed | Meteoritic Fe-Ni with Co and S, in microgravity, with CO recycle closure | Chemistry at TRL 9 terrestrially. Microgravity gas–solid contacting is not demonstrated. Fluidised beds rely on gravity. |
| T07 / T23 | Levitation melting on ISS (ESA EML; ESL), mm–cm samples | ≥1 t batch at 0.05–0.15 g (rq-0-11) | About 10⁵–10⁶× by mass. No partial-g melt has ever been run. |
| T12 | MEV-1 docked to Intelsat 901 (2020); ISS berthing of tens of tonnes | 150–300 t, autonomous, repeated | About 10× in mass, with no autonomous repetition |
| T14 | Dawn ~425 kg Xe; Psyche ~1 t Xe (approximate) | Hundreds of t per tug | About 10²–10³× |

### 2b. Risk class used for the gates (divergence shown)

| Class at KDP-0B | Technologies | Notes |
|---|---|---|
| Project-ending, unanimous | T01, T03, T04, T05, T08, T16, T19, T21 | TRL 6, no waiver |
| Project-ending, split | T02 (C, Gm: arch-change); T10 (C: arch-change); T14 (C, Gm: arch-change); T15 (C: arch-change); T22 (Gm: arch-change); T24 (C: arch-change); T25 (C, G: arch-change) | Rule on each at KDP-0A. They are held at TRL 6, no waiver, until ruled. |
| Composite project-ending | Metallurgy: at least one of T06, T17, T07, T23 | Each member is architecture-change |
| Architecture-change | T09, T12, T13 (when a C-type target is chosen), and the individual metallurgy routes | TRL 5 plus documented scaling at KDP-0B; waiverable with a funded path to 6 |
| T26 | Owner ruling: architecture-change, "possibly project-ending" | **My view:** treat the integrated authenticated fleet command service as project-ending for an uncrewed, multi-year, 15–29-asset 0B. **Still open** in rq-0-64. |
| 0A flight | T11, T18; T26 at DSN level (sub-rating TRL 9) | TRL 6 at scout PDR. TRL 7–8 is a *result* of the mission, not an entry criterion. The panel's target of 8 conflates the two. |

*In the table, C = Claude, Gm = Gemini, G = GPT.*

### 2c. TRL required per gate

| Gate | Requirement |
|---|---|
| Scout PDR | T11 bus and EP at TRL 6. Hayabusa2 (about 600 kg, ion EP, rendezvous plus sampling) bounds this class, so the bus may already justify a higher rating. **This needs evidence-register confirmation.** T18 subsurface bulk assay at TRL 6, otherwise fly a descoped assay: GRNS-class remote bulk elemental, surface sample, and impactor exposure (Hayabusa2 SCI heritage). |
| 0A-MTR | All project-ending 0B technologies at TRL 4, with relevant-environment definitions documented. Pathfinder payload technologies (T04, T05, T08, T16, T19, T24, and partially T10 and T21) at TRL 5, meaning ground relevant-environment components plus documented scaling. At least two metallurgy routes at TRL 4. T26 integrated breadboard at TRL 4. |
| Pathfinder results | Pathfinder technologies at TRL 6. The pathfinder's operation at the NEA is the relevant environment. |
| KDP-0B | All project-ending technologies at TRL 6. At least one metallurgy route at TRL 6. Architecture-change technologies at TRL 5 or above. |

**The scale rule needs owner adoption.** TRL 6 needs a "representative" prototype, so define representative in advance.
- **Proposed limit.** A TRL 6 claim may not extrapolate more than 10× in throughput or power from the tested article. Where it does, it must show that the governing regimes are preserved. Examples are the cohesion-to-gravity ratio for regolith, anchor reaction against excavation reaction force, and plume interaction in clusters.
- **Duration.** Duration targets such as 20–40 kh SEP life and multi-year seal life are met by partial-duration testing plus a wear model validated against that test. The HERMeS / AEPS magnetic-shielding programme is the precedent for this approach.
- **Why this matters.** Without an agreed rule, the TRL 6 call becomes negotiable at the gate.

### 2d. How AD² sets timing and structure

| AD² at KDP-0A | Planning rule |
|---|---|
| ≤ 4 | Plan to the mid-point of years-to-target |
| 5 | Plan to the upper bound; single approach allowed |
| 6 | Plan to the upper bound; fund ≥ 2 approaches until MTR |
| 7 (T04, T16, some T19/T08/T07/T17 ratings) | Plan to the upper bound plus a re-plan contingency. **MTR criterion: AD² must be re-assessed at ≤ 5.** Otherwise KDP-0B cannot be scheduled, and the MTR fail outcome applies. |

**Facility constraint for T01.** MW-class plume pumping exceeds what existing vacuum facilities have demonstrated (the 100 kW X3 test is the reported ceiling I know of). The T01 TRL 6 plan must therefore choose between two paths:
- **(a) Ground module plus model.** Test 100–250 kW modules on the ground and add a validated cluster plume model.
- **(b) Flight subset.** A flight of a cluster subset. One option is a pathfinder powered by roughly 100–300 kW SEP, which would also exercise T02 and T03.

Option (b) adds pathfinder cost and risk. The owner decides; I do not.

---

## 3. Discriminating gates

### g-target: sampled grade (month 60–108; interim at MTR)

- **Criterion.** Recoverable native Fe-Ni must be measured on samples from excavation depth, at the primary target and at one backup.
- **Metric.** The lower 90% confidence bound of recoverable yield, measured as kg of product per kg of ore after beneficiation (rq-0-51).
- **The implied threshold is already in the architecture.** The design numbers are 0.6–2.5 kt/yr of product against 13–47 kt/yr of tailings.
  - At consistent corners, recoverable yield is about 4–5%.
  - Across all corners it spans about 1.3–16%.
- **Threshold.** The lower bound must be at or above the yield assumed in the KDP-0B delivered-cost base case. That value is **set by rq-0-61, using rq-0-51.**
- **Target classes.** Ordinary chondrite metal content falls from H to L to LL. Hayabusa found Itokawa to be LL-like (Nakamura et al., *Science* 2011), which is the low-metal end. Target selection will matter a great deal.
- **Physical data required.** Shape, spin, surface cohesion and boulder distribution must be known to engineering accuracy. OSIRIS-REx found Bennu's near-surface to be far weaker than expected; I recall the 2022 *Science* and *Science Advances* papers, but have not verified the authors. Spin state, shape, cohesion and boulder distribution feed the T16 and T04 design directly.
- **Trajectory.** Round trip to SEL1 must fit the tug envelope at the cycle cadence (rq-0-52).
- **Evidence.** rq-0-50, rq-0-51, rq-0-52; scout data.

### g-demand: signed Phase 1 schedule (month 48–132; indicative at MTR)

- **Criterion.** A signed Phase 1 offtake schedule for Fe-Ni at SEL1. It must state quantity, product specification and dates.
- **Metric.** The ratio of signed annual demand to planned 0B output.
- **Threshold.** Within 3× (D-02). Signed demand must be at least one third of planned 0B nameplate output, about 0.2–0.8 kt/yr. It must also overlap the 0B delivery window.
- **The product specification must exist.** T22 cannot be qualified without one.
- **Open issue: who signs?** Phase 1 is the same project, so "signed" risks being circular. I recommend counting either of these:
  - a funded Phase 1 baseline line item, approved at Phase 1's own KDP; or
  - an external offtaker.
- **The owner must define "signed."**
- **Evidence.** rq-0-58 and the Phase 1 re-assessment.

### g-economics: delivered cost (month 90–150)

- **Criterion.** The delivered cost of 0B Fe-Ni at SEL1 must be compared with Earth supply delivered to SEL1, on the same basis (process issue 5).
- **Metric.** The ratio of 0B cost to Earth-supply cost, per kg.
- **What 0B cost includes:**
  - amortised 0B capital;
  - the reagent and spares import stream;
  - tug propellant (D-05);
  - operations;
  - cost of delay.
- **Threshold.** The 0B cost at P70 must be no more than R × the Earth-supply cost at P50 over the demand window.
- **R is a value choice the owner must make.**
  - D-01 calls Phase 0 "a capability programme, not a cost saving." That implies R may exceed 1.
  - R = 1 means cost parity.
  - The number is **set by rq-0-61**, with quotes from rq-0-57.
- **Robustness test.** The decision must not reverse across the launch-price range. Today's dispersion makes this a real test: the panel gives $22–195B against the BOM's $15.7B, and GPT's per-kg figures are internally inconsistent (process issue 6).
- **Evidence.** rq-0-57, rq-0-61, rq-0-28, rq-0-53.

### g-licence: debris limit (in principle at MTR, month 48–72; final 84–144)

- **Criterion.** A written authorisation from the licensing state, under Outer Space Treaty Article VI (authorisation and continuing supervision).
- **What the authorisation must state:**
  - a numeric escaped-mass limit per site;
  - a verification method;
  - a tailings-management requirement covering 13–47 kt/yr.
- **Metric 1: agreed limit.** The interim limit is ≤ 1 t/yr escaped per site, ALARP (D-03, proposed). The final value is **set by rq-0-41**.
- **Metric 2: demonstrated performance.** Escape measured on the pathfinder must meet the limit, with the detection limit at ≤ 10% of the limit. This is my proposal.
- **Metric 3: frequency licences.** Frequency coordination is in hand for 15–29 assets. Coordination through national filing with the ITU is a precondition for the T26 service.
- **No waiver is possible.** A missing licence ends 0B regardless of readiness.
- **Evidence.** rq-0-41 (stakeholder), T08 tests, pathfinder data.

---

## 4. Failure outcomes (pre-committed)

| Gate | Fail condition | Outcome |
|---|---|---|
| KDP-0A | No evidence register, no reclassification, or no funded TRL plans | Re-plan 0A (bounded to 6 months). Phase 1 assumes Earth supply. |
| Scout PDR | T11 or T18 below TRL 6 | Fly a descoped assay. Grade uncertainty widens, so g-target carries a wider bound. |
| 0A-MTR | A project-ending technology below TRL 4, or with AD² still ≥ 6–7 and no clear path | One funded re-plan, with KDP-0B slipping within the sunset. On a second fail: stop 0B development spend and run "0A only, Earth supply." |
| 0A-MTR | Fewer than two metallurgy routes at TRL 4 | Continue the surviving route, accepting single-route risk. With none: 0A only. |
| g-target | No primary plus backup meeting the yield bound | One further scout wave, bounded to ≤ 36 months and within the sunset. Then 0A only, Earth supply. |
| g-demand | Signed demand below one third of nameplate | Defer 0B. Keep the option alive at minimal spend, with re-test at Phase 1 milestones. Earth supply for Phase 1. |
| g-economics | Ratio above R at P70 | 0A only, Earth supply. Re-test when launch-price or demand data shift by a pre-set amount. |
| g-licence | No authorisation, or the limit is not met | No 0B production. No waiver. 0A only. |
| Pathfinder | Pathfinder technologies not at TRL 6 | Re-fly or redesign if there is time before the sunset. Otherwise 0A only. |
| KDP-0B | Any project-ending technology below TRL 6, or any discriminating gate failed | One slip, within the month-180 sunset. Then 0A only, Earth supply. |

**What "0A only, Earth supply" means:**
- Phase 1 sources Fe-Ni from Earth launch to SEL1.
- 0A data and technology are archived and published as a capability return.
- The 0B option can be re-opened only by a new KDP with all four discriminating gates re-run.

---

## 5. Changes from the current gates (decision-gates.ts)

| Current gate | Action | Reason |
|---|---|---|
| gate-1 Microgravity materials processing | **Retire and replace** with route-specific metallurgy criteria at MTR and KDP-0B | **Three reasons.** First, Si zone refining (c2) is out of Phase 0, since Si is deferred. Second, a 100 g ISS melt (c1) does not discriminate between routes: no-melt routes do not melt, and rotating routes need ≥1 t at 0.05–0.15 g (rq-0-11). Third, its fail outcome ("redesign with rotation") is now one of the contested routes, not a fallback. The slag criterion (c3) survives inside T07 and T23. |
| gate-2 Cryogenic propellant | **Retire** | No production LOX/LH₂ in Phase 0. **One exception:** if D-05 selects argon, which is stored at about 87 K, the cryocooler and MLI criteria survive as T14 sub-criteria. Separately, the c1 evidence text ("20 W-class cooler") should be checked. My recollection is that GODU-LH2 used a ground commercial cryocooler of several hundred W at 20 K. I am unsure of this. |
| gate-3 ISRU water | **Retire as a gate; fold in** as a KDP-0B criterion that applies only if the target is C-type | The pilot is 10–100 t/yr, and its failure is cost-increase or architecture-change, not gating. Its fail path (lunar water) is irrelevant now. |
| gate-4 Asteroid target selection | **Revise into g-target** | The C-type/water criterion is wrong for an Fe-Ni product. Telescopic composition is not *sampled grade*. The destination changes from L4/L5 to SEL1. Month 24 is infeasible because sampled grade needs scout data. |
| gate-5 Phase 0 PDR | **Retire; its criteria move into KDP-0B** | Its "TRL ≥ 5 or approved waiver" contradicts D-02 (TRL 6, no waivers for project-ending technologies). The mass, power and ±30% cost criteria move into KDP-0B. Its "$8–15B" evidence is stale against the panel's $22–195B. |

**Code and registry fixes** (these extend process issue 7):
- `relatedTRLIds` uses model-generated IDs that are inconsistent across models. For example, GPT used `asteroid-mining-bucket-wheel` for T16 and `microgravity-metallurgy` for T23. Gates should reference T-IDs, generated from one mapping table.
- Add a criterion type for "any-of" composites, needed for metallurgy.
- Add a sunset field.
- `getGateReadiness` treats all criteria as equal. A no-waiver criterion should block readiness outright.

---

## Disagreements left open (not averaged)

- **Split risk classes.** T02, T10, T14, T15, T22, T24, T25 and T26 need an owner ruling at KDP-0A.
- **Scout target TRL.** The panel's target of 8 versus my proposal of 6 at PDR (Claude 7, Gemini 8, GPT 6).
- **KDP-0B earliest date.** Gemini's lower year ranges versus the pathfinder-chain constraint.
- **Composite headline rule for T26.** Weakest critical sub-rating (Claude) versus integration-specific assessment (GPT). This also governs the metallurgy-plus-beneficiation composite.
- **The economics premium R, and the definition of "signed" demand.** Both are owner values, not technical findings.

---

```yaml
gates:
  - id: kdp-0a
    name: KDP-0A — authorise 0A
    type: kdp
    month: { min: 0, max: 3 }
    purpose: Authorise 0A on an evidence-backed TRL baseline with all outcomes, sunset and economics premium pre-committed.
    criteria:
      - id: kdp-0a-c1
        description: Every T-rating tied to cited evidence or downgraded to what evidence supports
        metric: Fraction of T01-T26 ratings with evidence-register entries meeting the claimed level's exit criterion
        threshold: 100%
        technologies: [T01, T02, T03, T04, T05, T06, T07, T08, T09, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26]
        trl_required: null
        evidence_from: [rq-0-62]
      - id: kdp-0a-c2
        description: Split risk classes ruled by the D-02 fallback test
        metric: Owner ruling recorded for each split classification
        threshold: All of T02, T10, T14, T15, T22, T24, T25, T26 ruled
        technologies: [T02, T10, T14, T15, T22, T24, T25, T26]
        trl_required: null
        evidence_from: [rq-0-62, rq-0-64]
      - id: kdp-0a-c3
        description: Funded TRL 6 plan per project-ending technology, naming the relevant-environment test and scale rule
        metric: Plans approved; AD2 >= 6 technologies carry >= 2 funded approaches
        threshold: 100% of project-ending technologies
        technologies: [T01, T02, T03, T04, T05, T08, T10, T14, T15, T16, T19, T21, T22, T24, T25]
        trl_required: null
        evidence_from: [rq-0-62, rq-0-63]
      - id: kdp-0a-c4
        description: Pathfinder scope mapped to the technologies it must qualify
        metric: Traceability matrix of pathfinder tests to T-ids and TRL 6 claims
        threshold: Covers T04, T05, T08, T16, T19, T24 (partial T10, T21)
        technologies: [T04, T05, T08, T10, T16, T19, T21, T24]
        trl_required: null
        evidence_from: [rq-0-63]
      - id: kdp-0a-c5
        description: Owner commits failure outcomes, sunset month, economics premium R and definition of signed demand
        metric: Recorded decisions
        threshold: All recorded
        technologies: []
        trl_required: null
        evidence_from: [D-01, D-02]
    pass: Fund 0A; Phase 1 planning carries Earth supply as baseline until KDP-0B.
    fail: Re-plan 0A (bounded to 6 months); Phase 1 assumes Earth supply.
  - id: 0a-scout-pdr
    name: Rendezvous scout PDR
    type: review
    month: { min: 12, max: 24 }
    purpose: Commit scout flight hardware with critical technologies at flight-project readiness.
    criteria:
      - id: scout-c1
        description: Scout bus, EP and proximity operations ready for flight design
        metric: TRL of scout critical technologies
        threshold: TRL 6
        technologies: [T11]
        trl_required: 6
        evidence_from: [rq-0-62]
      - id: scout-c2
        description: Subsurface sampling and bulk grade assay ready, or descoped assay adopted
        metric: TRL of T18 payload, or approved descope (GRNS-class + surface sample + impactor exposure)
        threshold: TRL 6, or descope with stated grade-uncertainty penalty
        technologies: [T18]
        trl_required: 6
        evidence_from: [rq-0-50]
      - id: scout-c3
        description: DSN-level communications for 4-10 scouts
        metric: Allocated contact plan with DSN or equivalent
        threshold: Signed allocation
        technologies: [T26]
        trl_required: null
        evidence_from: [rq-0-64]
    pass: Build and launch scouts.
    fail: Fly descoped assay; g-target carries the wider uncertainty bound.
  - id: 0a-mtr
    name: 0A mid-term review
    type: review
    month: { min: 36, max: 60 }
    purpose: Confirm every 0B path is real, down-select metallurgy, freeze pathfinder payload, and stop spend on options that cannot close.
    criteria:
      - id: mtr-c1
        description: Project-ending 0B technologies at TRL 4 with relevant environment documented
        metric: TRL 4 exit criteria met (lab test agrees with prediction; relevant-environment definition documented)
        threshold: All project-ending technologies
        technologies: [T01, T02, T03, T04, T05, T08, T10, T14, T15, T16, T19, T21, T22, T24, T25]
        trl_required: 4
        evidence_from: [rq-0-54, rq-0-51, rq-0-6, rq-0-26, rq-0-60]
      - id: mtr-c2
        description: Path clarity on hard technologies
        metric: Re-assessed AD2
        threshold: AD2 <= 5 for every project-ending technology
        technologies: [T04, T08, T16, T19, T01, T10, T21]
        trl_required: null
        evidence_from: [rq-0-62]
      - id: mtr-c3
        description: Pathfinder payload technologies validated in ground relevant environment with scaling defined
        metric: TRL 5 exit criteria met (relevant-environment test agrees with prediction; scaling requirements documented)
        threshold: All pathfinder payload technologies
        technologies: [T04, T05, T08, T16, T19, T24]
        trl_required: 5
        evidence_from: [rq-0-6, rq-0-26, rq-0-51]
      - id: mtr-c4
        description: At least two metallurgy routes at TRL 4
        metric: Count of routes meeting TRL 4 exit criteria with yield and reagent-recycle data
        threshold: ">= 2 of T06, T17, T07, T23"
        technologies: [T06, T17, T07, T23]
        trl_required: 4
        evidence_from: [rq-0-56, rq-0-11]
      - id: mtr-c5
        description: Tug propellant selected
        metric: D-05 decision
        threshold: Decided
        technologies: [T01, T14]
        trl_required: null
        evidence_from: [rq-0-53, rq-0-54, rq-0-52, rq-0-55]
      - id: mtr-c6
        description: Integrated comms and authenticated command breadboard
        metric: T26 integrated-service TRL
        threshold: TRL 4
        technologies: [T26]
        trl_required: 4
        evidence_from: [rq-0-64]
      - id: mtr-c7
        description: Licensing state engaged and demand indicated
        metric: Written engagement from licensing state; indicative Phase 1 demand schedule
        threshold: Both present
        technologies: [T08]
        trl_required: null
        evidence_from: [rq-0-41, rq-0-58]
    pass: Continue to KDP-0B; freeze pathfinder payload; narrow metallurgy to <= 2 routes.
    fail: One funded re-plan with KDP-0B slip inside the sunset; on second fail, stop 0B spend — 0A only, Earth supply.
  - id: g-target
    name: Target gate — sampled grade
    type: discriminating
    month: { min: 60, max: 108 }
    purpose: Confirm a primary and backup NEA whose sampled recoverable Fe-Ni yield supports the 0B cost case.
    criteria:
      - id: tgt-c1
        description: Recoverable native Fe-Ni yield from excavation-depth samples
        metric: Lower 90% confidence bound of kg product per kg ore after beneficiation
        threshold: set by rq-0-61 (architecture implies ~4-5%, corner range 1.3-16%)
        technologies: [T18, T05]
        trl_required: null
        evidence_from: [rq-0-50, rq-0-51]
      - id: tgt-c2
        description: Physical characterisation to engineering accuracy
        metric: Shape, spin, surface cohesion, boulder distribution
        threshold: Sufficient to close T04/T16 design loads
        technologies: [T04, T16]
        trl_required: null
        evidence_from: [rq-0-50]
      - id: tgt-c3
        description: Transport feasibility to SEL1
        metric: Round-trip delta-v and cycle cadence within tug envelope (1.5-5 yr round trip)
        threshold: Within envelope for primary and backup
        technologies: [T01]
        trl_required: null
        evidence_from: [rq-0-52, rq-0-59]
    pass: Select primary and backup targets; fix yield in the delivered-cost model.
    fail: One additional scout wave (<= 36 months, inside sunset); then 0A only, Earth supply.
  - id: g-demand
    name: Demand gate — signed Phase 1 schedule
    type: discriminating
    month: { min: 48, max: 132 }
    purpose: Size 0B to binding demand rather than projections.
    criteria:
      - id: dem-c1
        description: Signed Phase 1 Fe-Ni offtake at SEL1 (definition of "signed" set by owner at KDP-0A)
        metric: Ratio of signed annual demand to planned 0B output, with schedule overlap
        threshold: Within 3x (signed demand >= one third of nameplate, ~0.2-0.8 kt/yr)
        technologies: []
        trl_required: null
        evidence_from: [rq-0-58]
      - id: dem-c2
        description: Product specification agreed
        metric: Signed specification (composition, form, tolerances)
        threshold: Exists and is testable by T22 qualification
        technologies: [T22]
        trl_required: null
        evidence_from: [rq-0-58]
    pass: Demand sizes the 0B scale input to KDP-0B.
    fail: Defer 0B at minimal option-keeping spend; Earth supply for Phase 1; re-test at Phase 1 milestones.
  - id: g-licence
    name: Licence gate — debris limit agreed
    type: discriminating
    month: { min: 60, max: 144 }
    purpose: Obtain a licensing-state authorisation with a numeric escape limit the system is shown to meet.
    criteria:
      - id: lic-c1
        description: Written authorisation under Outer Space Treaty Article VI
        metric: Numeric escaped-mass limit per site, verification method, tailings requirement
        threshold: set by rq-0-41 (interim ALARP and <= 1 t/yr per site)
        technologies: [T08]
        trl_required: null
        evidence_from: [rq-0-41]
      - id: lic-c2
        description: Containment and escape verification demonstrated
        metric: Measured escape on pathfinder against limit; detection limit
        threshold: Below limit; detection limit <= 10% of limit
        technologies: [T08]
        trl_required: 6
        evidence_from: [rq-0-41, pathfinder]
      - id: lic-c3
        description: Frequency coordination for 15-29 assets
        metric: National filing and ITU coordination status
        threshold: Coordinated
        technologies: [T26]
        trl_required: null
        evidence_from: [rq-0-64]
    pass: Licence condition for 0B satisfied.
    fail: No 0B production; no waiver — 0A only, Earth supply.
  - id: pf-results
    name: Pathfinder results review
    type: review
    month: { min: 84, max: 144 }
    purpose: Convert pathfinder operations at the NEA into TRL 6 claims under the pre-agreed scale rule.
    criteria:
      - id: pf-c1
        description: Regolith-contact technologies demonstrated at the target
        metric: TRL 6 exit criterion (test performance agrees with prediction) at <= 10x extrapolation or with governing regimes preserved
        threshold: All pathfinder-assigned technologies
        technologies: [T04, T05, T08, T16, T19, T24]
        trl_required: 6
        evidence_from: [pathfinder, rq-0-6, rq-0-26, rq-0-51]
      - id: pf-c2
        description: Autonomy and maintenance over duration-relevant operations
        metric: Operating hours, interventions, faults recovered without ground
        threshold: Set at MTR against 0B duty-cycle requirement
        technologies: [T10, T21]
        trl_required: 6
        evidence_from: [pathfinder]
    pass: Feed TRL 6 evidence to KDP-0B.
    fail: Re-fly or redesign if inside the sunset; otherwise 0A only, Earth supply.
  - id: g-economics
    name: Economics gate — delivered cost vs Earth supply
    type: discriminating
    month: { min: 90, max: 150 }
    purpose: Show 0B delivered Fe-Ni at SEL1 is within the owner's premium of Earth supply, robust across launch prices.
    criteria:
      - id: eco-c1
        description: Delivered cost ratio on a common basis
        metric: 0B P70 $/kg at SEL1 (capital, reagent and spares import, propellant, operations, cost of delay) over Earth-supply P50 $/kg at SEL1
        threshold: "<= R, R set by owner at KDP-0A; numbers set by rq-0-61"
        technologies: []
        trl_required: null
        evidence_from: [rq-0-61, rq-0-57, rq-0-53, rq-0-28]
      - id: eco-c2
        description: Decision robustness
        metric: Sign of (ratio - R) across launch-price and yield ranges
        threshold: Does not reverse across stated ranges
        technologies: []
        trl_required: null
        evidence_from: [rq-0-61, rq-0-57, rq-0-50]
      - id: eco-c3
        description: Cost estimate confidence
        metric: Estimate uncertainty band
        threshold: "+/- 30% or better"
        technologies: []
        trl_required: null
        evidence_from: [rq-0-28, rq-0-57]
    pass: Economics condition for 0B satisfied.
    fail: 0A only, Earth supply; re-test only on pre-set shifts in launch price or demand.
  - id: kdp-0b
    name: KDP-0B — exercise the 0B option
    type: kdp
    month: { min: 96, max: 156 }
    purpose: Decide whether and at what scale to fund in-space Fe-Ni production.
    criteria:
      - id: kdp-0b-c1
        description: Project-ending technologies at TRL 6 in relevant environment, no waivers
        metric: TRL 6 exit criterion met per technology
        threshold: All, no waivers (list as ruled at KDP-0A)
        technologies: [T01, T02, T03, T04, T05, T08, T10, T14, T15, T16, T19, T21, T22, T24, T25, T26]
        trl_required: 6
        evidence_from: [pathfinder, rq-0-54, rq-0-60, rq-0-62]
      - id: kdp-0b-c2
        description: At least one metallurgy route end-to-end with beneficiation, solids handling and product qualification
        metric: TRL of best route as an integrated chain
        threshold: ">= 1 route at TRL 6"
        technologies: [T06, T17, T07, T23, T05, T19, T22]
        trl_required: 6
        evidence_from: [rq-0-56, rq-0-11]
      - id: kdp-0b-c3
        description: Architecture-change technologies ready with a path
        metric: TRL with documented scaling; funded path to TRL 6 before 0B CDR
        threshold: TRL >= 5 (waiverable)
        technologies: [T09, T12, T20]
        trl_required: 5
        evidence_from: [rq-0-60, rq-0-62]
      - id: kdp-0b-c4
        description: Discriminating gates passed
        metric: Status of g-target, g-demand, g-economics, g-licence
        threshold: All passed
        technologies: []
        trl_required: null
        evidence_from: [rq-0-50, rq-0-58, rq-0-61, rq-0-41]
      - id: kdp-0b-c5
        description: Mass and power budgets close
        metric: Mass margin; power margin
        threshold: ">= 20% mass, >= 15% power"
        technologies: [T02, T15, T20]
        trl_required: null
        evidence_from: [rq-0-63]
      - id: kdp-0b-c6
        description: Water pilot (only if target is C-type)
        metric: TRL of water extraction pilot
        threshold: TRL 5, else drop pilot
        technologies: [T13]
        trl_required: 5
        evidence_from: [rq-0-55]
    pass: Fund 0B at the scale set by signed demand and the delivered-cost model.
    fail: One slip inside the month-180 sunset; then 0A only, Earth supply, with 0A results archived and published.
retired: [gate-1, gate-2, gate-3, gate-4, gate-5]
```
