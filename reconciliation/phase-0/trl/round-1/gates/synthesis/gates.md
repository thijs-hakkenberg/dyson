---
step: gates
item: gates
type: synthesis
synthesizer: claude-opus-5-5
panel: [claude-opus-5-5, gemini-3-1-pro, gpt-6-1-sol]
generated: 2026-10-17T22:00:08.459Z
---

# Consolidated Phase 0 Gate Set under D-02: Rapporteur Synthesis

**Sources:** Claude Opus 5.5 ("Claude"), Gemini 3.1 Pro ("Gemini"), GPT-6.1 Sol ("GPT").

**Conventions**
- Every criterion, threshold and timing is attributed to the model(s) that proposed it.
- Where positions differ, the full range is shown and each position is listed. Nothing is averaged.
- The rapporteur adds no technical claims. Where models cite facts that conflict, the conflict is recorded and not resolved.

---

## 1. Points of agreement

All three models agree on the following:

1. **Structure.** There are three programme decisions: KDP-0A, the 0A mid-term review (MTR) and KDP-0B. There are also four discriminating, non-TRL gates: target, demand, economics and licence.
2. **KDP-0B technology rule.** Project-ending technologies must be at TRL 6 in a relevant environment, with no waivers.
3. **Fallback.** Failure at KDP-0B, or at any discriminating gate, leads to the pre-committed outcome **"0A only, Earth supply."** The models disagree on whether a bounded slip, extension or redesign may come first (see §6).
4. **Target evidence.** Telescopic or spectral classification is insufficient. Sampled grade from scouts is required.
5. **Debris limit.** The ≤ 1 t/yr per site escape figure (D-03) is the reference. Its status differs between models (see §4).
6. **Current gates.** All five current gates (gate-1 to gate-5) are listed as retired in every model's YAML.

Claude and GPT, but not Gemini, also agree on these points:
- Panel TRL ratings are planning baselines, not evidence-register findings.
- At least one complete metallurgy route must reach TRL 6. Not all routes need to.
- T26 should be TRL 4 (integrated breadboard) at MTR.
- The software should use mandatory-criterion logic rather than percentage readiness.

---

## 2. Gate sequence and timing

All months are counted from the start of 0A.

| Gate | Claude | Gemini | GPT | Envelope |
|---|---|---|---|---|
| KDP-0A | 0–3 | 0 | 0 | 0–3 |
| Scout PDR | 12–24 | — | — | 12–24 (Claude only) |
| Scout launch release | — | — | 48–108 | 48–108 (GPT only) |
| 0A MTR | 36–60 | 36–60 | 24–48 | 24–60 |
| g-target | 60–108 (interim at MTR) | 48–84 | 60–180 | 48–180 |
| g-demand | 48–132 (indicative at MTR) | 60–96 | 72–180 | 48–180 |
| g-licence | in principle 48–72; final 84–144 | 60–96 | 60–180 | 48–180 |
| Pathfinder results review | 84–144 | — | — | 84–144 (Claude only) |
| g-economics | 90–150 | 60–96 | 72–180 | 60–180 |
| Optional water-pilot release | (folded into KDP-0B) | (gate-3 revised; no gate) | 72–180 | — |
| KDP-0B | 96–156 | 72–120 | 96–180 | 72–180 |
| Sunset | month 180, automatic execution of fallback | — | set via rq-0-63; M180 is "a planning boundary, not authority for an automatic fifteen-year commitment" | disputed |

**Stated drivers for KDP-0B timing**

- **Claude:** the date is set by the pathfinder chain (pathfinder PDR, build, cruise and operations) and the slowest AD² 7 paths. Claude explicitly declines to adopt Gemini's lower bound because the pathfinder chain constrains the date independently.
- **Gemini:** the date is set by 6–10+ year estimates to TRL 6 for T01, T04 and T18.
- **GPT:** the date is set by the coupled excavation–anchoring–handling–processing path, propulsion endurance and the timing of target samples. GPT says the window "is not an average of panel estimates."

---

## 3. Cross-cutting disputes

| Issue | Claude | Gemini | GPT |
|---|---|---|---|
| **Status of panel TRLs** | Not evidence. Plan to the lower bound. Ratings without evidence are downgraded at KDP-0A. Notes that Gemini's higher ratings (e.g. T24 4–5, T16 3–4, T10 3–4) lack cited test data. | Not addressed. | Planning baselines. Unsupported ratings are marked "explicitly provisional." Higher endpoints require test reports, not a panel ruling. |
| **Use of AD² probabilities** | Gives an illustrative joint probability of about 0.15% that all 15 project-ending technologies reach TRL 6. Correlation might raise this by one to two orders of magnitude. Labelled "an illustration, not a forecast." | Not addressed. | AD² anchors "should not be multiplied into a programme success probability," because the developments are strongly dependent. AD² should drive sequencing, reserve and funding of alternatives. |
| **AD² planning rules** | Tiered rules. AD² 6 requires two or more funded approaches until MTR. AD² 7 must be re-assessed at ≤ 5 by MTR, or KDP-0B cannot be scheduled. | High-AD² items need physical experimental evidence at MTR, not simulation alone. | AD² sets test sequencing, reserves and alternative-route funding. No numeric re-assessment threshold. |
| **TRL 6 scale rule** | Proposes no more than 10× extrapolation in throughput or power, unless governing regimes are shown to be preserved. Duration can be met by partial test plus a validated wear model. | Not addressed. | "No fixed 'acceptable scale factor' can be assumed in advance." Extrapolation must be justified by test-validated models. Accelerated testing needs a validated degradation model. |
| **Composite and system TRL** | Weakest critical sub-rating (as Claude attributes its own position). | Not addressed. | Do not average and do not automatically take the weakest. Assess the integration itself. An unvalidated critical function still blocks the system claim. |
| **D-02 "TRL 4–5 for internal 0A milestones"** | Conflicts with flight-project practice. Scout and pathfinder critical technologies should be at TRL 6 at their own PDR. 4–5 should apply only to 0B development milestones. | Applies TRL 4–5 at MTR. | TRL 4 or 5 at MTR as tranche releases. Scouts must be TRL 8 before launch. |
| **Role of the pathfinder** | On the KDP-0B critical path. TRL 6 for regolith-contact technologies (T04, T05, T08, T16, T19, T24) "cannot be reached on the ground." | Included in 0A scope. No critical-path claim. | Pathfinder and relevant-environment demonstrations are cited as evidence. No critical-path claim. |
| **T01 test facility** | MW-class plume pumping exceeds demonstrated facilities. The owner chooses between (a) ground modules plus a cluster model and (b) a flight subset. | — | Lists MW cluster integration as unproven. No facility claim. |

### Project-ending classification for KDP-0B

**Agreed core (all three models):** T01, T02, T03, T04, T05, T08, T10, T14, T15, T16, T19, T21, T22, T24.

**Disputed members:**

| Technology | Claude | Gemini | GPT |
|---|---|---|---|
| T25 | Project-ending (split; ruling due at KDP-0A) | Project-ending | TRL 6 as "selected reference implementation," grouped with T09, T12, T20 |
| T26 | Claude's view: project-ending for integrated fleet command. Owner ruling is architecture-change, "possibly project-ending." Open in rq-0-64. | Not listed | TRL 6 integrated service at KDP-0B |
| T18 | 0A flight technology (TRL 6 at scout PDR) | Project-ending | TRL 6 technology maturity before KDP-0B |
| T11 | 0A flight technology | In prose list; absent from YAML | TRL 6 technology maturity before KDP-0B |
| T09, T12, T20 | Architecture-change: TRL ≥ 5, waiverable, with a funded path to 6 | Not listed | TRL 6 for selected implementations; substitutions reassessed |

**Split classes needing an owner ruling (Claude's list):** T02, T10, T14, T15, T22, T24, T25, T26. Claude holds these at TRL 6, no waiver, until they are ruled on.

### Scout readiness

| Model | Position |
|---|---|
| Claude | TRL 6 at scout PDR (month 12–24). Treats TRL 7–8 as "a result of the mission, not an entry criterion." Flags that the panel's target of 8 conflates the two. |
| Gemini | T11 and T18 at TRL 7 within the g-target criterion. |
| GPT | TRL 8 for the actual scout system before each launch. TRL 6 technology maturity before KDP-0B. |

Claude's own summary records the earlier panel baseline as Claude 7, Gemini 8, GPT 6. The positions in this round are as shown in the table. The milestones also differ: PDR, target gate and launch.

---

## 4. Discriminating gates: thresholds by model

### g-target

| Element | Claude | Gemini | GPT |
|---|---|---|---|
| Metric | Lower 90% confidence bound of recoverable yield (kg product per kg ore after beneficiation) | Fe-Ni mass fraction | Confidence-bounded recoverable grade and inventory after measured beneficiation and recovery |
| Threshold | At or above the KDP-0B base-case yield, set by rq-0-61 using rq-0-51. Architecture implies about 4–5%, with a corner range of 1.3–16%. | Set by rq-0-50 | Set by rq-0-50 and rq-0-51 before final target commitment |
| Targets required | Primary **and** backup | Not specified | At least one sampled primary |
| Physical data | Shape, spin, cohesion and boulder distribution sufficient to close T04/T16 design loads | — | Geotechnical compatibility and spatial variability |
| Transport | Round trip to SEL1 within the tug envelope (1.5–5 yr) | — | Close 150–300 t payload and 1.5–5 yr cycle, or approve a resized architecture |

### g-demand

| Element | Claude | Gemini | GPT |
|---|---|---|---|
| Meaning of "within 3×" | **Quantity:** signed annual demand at least one third of nameplate output, about 0.2–0.8 kt/yr, overlapping the delivery window | **Quantity:** kt/yr demanded against capacity, set by rq-0-58 | **Ambiguous:** numerator, denominator and epoch are unspecified. GPT proposes a **timing** reading (accepted date span ≤ 3× elapsed time from a common epoch). The gate is "not objectively passable" until this is resolved. |
| "Signed" | Flags circularity, since Phase 1 is the same project. Proposes a funded Phase 1 line item or an external offtaker. The owner defines the term. | — | Signed specification, quantities, delivery node and dated schedule |
| Product specification | Required; needed to qualify T22 | — | Required (T22) |
| Sizing | Demand sizes 0B scale | — | Size only to accepted demand. A 3× allowance is not permission to overproduce. |

### g-economics

| Element | Claude | Gemini | GPT |
|---|---|---|---|
| Threshold | 0B P70 $/kg ≤ R × Earth-supply P50 $/kg at SEL1. R is set by the owner. Claude cites D-01 ("capability programme, not a cost saving") as implying R may exceed 1. | Delivered $/kg must **undercut** Earth supply | Expected delivered cost no higher than Earth supply, plus an owner-approved downside bound. A capability subsidy requires a **new explicit owner decision**, "not a relabelled economics pass." |
| Robustness | The decision must not reverse across the launch-price range. Notes current dispersion: $22–195B from the panel against $15.7B in the BOM. | — | Sensitivity to grade, utilisation, replacement and delay |
| Estimate band | ±30% or better | — | — |

The models disagree on whether a premium above cost parity can pass inside this gate (Claude) or needs a separate owner decision (GPT). Gemini sets the threshold below parity.

### g-licence

| Element | Claude | Gemini | GPT |
|---|---|---|---|
| Status of ≤ 1 t/yr | Interim, ALARP; final value set by rq-0-41 | Used as the threshold | Interim, "not a licence." rq-0-41 and the licensing state set the binding limit, particle and velocity classes, confidence, averaging interval and abnormal-event limits. |
| Verification | Pathfinder-measured escape below the limit, with detection limit ≤ 10% of the limit (Claude's proposal). T08 at TRL 6. | T08 at TRL 6 | Uncertainty-bounded annualised escape including credible failures. T04, T08 and T19 at TRL 6. Measurement uncertainty must fit within the limit. |
| Other | ITU and national frequency coordination for 15–29 assets | — | GPT notes the ceiling equals about 99.992–99.998% retention of tailings |
| Fail | No waiver: no 0B production; 0A only | 0A only | Redesign and reapply within a bounded extension, **or** prohibit 0B |

---

## 5. Technology criteria at the MTR

| Criterion | Claude | Gemini | GPT |
|---|---|---|---|
| TRL 4 scope | All project-ending 0B technologies, with relevant environment documented | T04, T06, T07, T16, T18, T23 | Retained pathfinder-critical functions (adds T09, T20, T25); T11 and T18 |
| TRL 5 | Pathfinder payload (T04, T05, T08, T16, T19, T24) at MTR | "TRL 4–5" in prose | TRL 5 as a release condition before each relevant-environment demonstration; not a blanket MTR criterion |
| Metallurgy | At least two routes (of T06, T17, T07, T23) at TRL 4; narrow to two or fewer at pass | Down-select the route at MTR; T17 not listed | TRL 4 for any route that continues to receive funding; routes are not averaged |
| AD² re-assessment | ≤ 5 for every project-ending technology | — | — |
| Other | D-05 propellant decided; T26 at TRL 4; licensing state engaged in writing; indicative demand schedule | — | T26 at TRL 4; this is a "tranche decision," so an unmet item cannot receive its planned demonstration |

---

## 6. Failure outcomes

| Trigger | Claude | Gemini | GPT |
|---|---|---|---|
| KDP-0A | Re-plan 0A, bounded to 6 months | Project hold | Defer, or restrict to ground research and remote survey |
| MTR | One funded re-plan; on a second fail, stop 0B spend | Restructure ground R&D; delay or cancel pathfinder | Stop failed routes; bounded corrective programme, or complete 0A without production |
| g-target | One further scout wave (≤ 36 months, inside sunset), then fallback | Fallback | Resample or change target within a prospecting cap, then fallback |
| g-demand | Defer 0B at minimal option-keeping spend; re-test at Phase 1 milestones | Fallback | Reduce or defer 0B |
| g-economics | Fallback; re-test on pre-set shifts in launch price or demand | Fallback | Earth supply; subsidy only by a new owner decision |
| KDP-0B | One slip inside the month-180 sunset, then fallback | Fallback | Bounded extension, or fallback |
| Water pilot | Drop the pilot | — | Drop the pilot; no lunar-water or cryogenic switch |

---

## 7. Disposition of current gates

| Gate | Claude | Gemini (prose) | GPT |
|---|---|---|---|
| gate-1 | Retire and replace with route-specific criteria; c3 (slag) survives in T07/T23 | "Revise," split into T06, T07, T23 | Retire and replace; rotation is an alternative to test, not a fallback |
| gate-2 | Retire; cryocooler/MLI survive as T14 sub-criteria if D-05 selects argon. Flags uncertainty about the c1 "20 W-class cooler" evidence text. | Retire | Retire; cryogenic work moves to the deferred register |
| gate-3 | Retire; fold into KDP-0B as a C-type-only criterion (TRL 5) | "Revise" to a T13 pilot | Revise into an optional pilot gate (TRL 6 before operational commitment); not a production veto |
| gate-4 | Revise into g-target | Replace with g-target | Revise into g-target |
| gate-5 | Retire; mass, power and ±30% cost criteria move to KDP-0B | Replace with KDP-0B plus discriminating gates | Retire; integrated closure becomes KDP-0B evidence |

Gemini's prose says "revise" for gates 1, 3, 4 and 5, but its YAML lists all five as retired. The consolidated block follows the unanimous YAML entry.

**Software changes**

| Model | Proposed changes |
|---|---|
| Claude | Map to T-IDs through a single table (GPT IDs such as `asteroid-mining-bucket-wheel` are cited as inconsistent); add an any-of composite criterion type; add a sunset field; make no-waiver criteria block readiness. |
| GPT | Conditional applicability; distinguish "not evidenced" from "tested and failed"; mandatory-criterion logic in place of percentage readiness; exclude retired and deferred gates from next-gate selection; record signed decisions. |

---

## 8. Owner rulings and unresolved items

**Owner rulings required**
1. Split risk classes: T02, T10, T14, T15, T22, T24, T25, T26.
2. Classification of T11, T18, T09, T12 and T20 at KDP-0B.
3. Economics premium R, or whether any premium requires a separate decision.
4. The meaning of "within 3×" (quantity or timing) and of "signed" demand.
5. Sunset: automatic (Claude) or a planning boundary (GPT).
6. Whether the licence gate allows redesign and reapplication.
7. Scale rule: a fixed ≤ 10× limit (Claude) or none fixed in advance (GPT).
8. Composite TRL method.
9. Scout TRL milestone.
10. Treatment of D-02's "TRL 4–5 for internal 0A milestones" for flight projects.
11. Choice of T01 TRL 6 path (Claude only).

**Factual discrepancies between models (not adjudicated)**

| Item | Claude | GPT |
|---|---|---|
| Iodine EP flight demonstration (Rafalskyi et al. 2021) | "roughly 10² W class" | "approximately 20 W" |
| iROSA / ROSA scale | "tens of kW" per wing (approximate) | "approximately 20 kW per iROSA assembly" |
| X3 Hall thruster | ~100 kW | ~102 kW |
| NEXT life test | >50,000 h (approximate) | >51,000 h |

Claude also marks the ISS thermal figure (~70 kWth) and the Bennu paper attribution as unverified. These should go to the rq-0-62 evidence register.

---

```yaml
gates:
  - id: kdp-0a
    name: KDP-0A — authorise bounded Phase 0A
    type: kdp
    month: { min: 0, max: 3 }   # Claude 0-3; Gemini 0; GPT 0
    proposed_by: [Claude, Gemini, GPT]
    disputed: true   # breadth of entry criteria differs
    purpose: Authorise 0A research, survey, scouts and one pathfinder without committing to 0B production.
    criteria:
      - id: kdp-0a-baseline
        description: Baseline architecture and funding approved
        metric: Signed D-01 and D-02 decisions
        threshold: Approved
        technologies: []
        trl_required: null
        evidence_from: [decisions.md, D-01, D-02]
        proposed_by: [Gemini]
      - id: kdp-0a-evidence
        description: Evidence register for every T-rating; panel agreement is not test evidence
        metric: Fraction of T01-T26 ratings with evidence entries (configuration, relevant environment, scale and duration gaps, AD2)
        threshold: "100%. Claude: unsupported ratings downgraded and planning to lower bound. GPT: unsupported ratings marked provisional."
        technologies: [T01, T02, T03, T04, T05, T06, T07, T08, T09, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26]
        trl_required: null
        evidence_from: [rq-0-62]
        proposed_by: [Claude, GPT]
        disputed: true   # downgrade vs mark provisional
      - id: kdp-0a-reclassify
        description: Split risk classes ruled using the D-02 fallback test
        metric: Owner ruling recorded per split classification
        threshold: All of T02, T10, T14, T15, T22, T24, T25, T26 ruled
        technologies: [T02, T10, T14, T15, T22, T24, T25, T26]
        trl_required: null
        evidence_from: [rq-0-62, rq-0-64]
        proposed_by: [Claude]
      - id: kdp-0a-plans
        description: Funded development paths for project-ending technologies
        metric: "Claude: approved TRL 6 plan per project-ending technology naming the relevant-environment test and scale rule; AD2 >= 6 carries >= 2 funded approaches. GPT: approved work packages and test specifications; no universal TRL entry floor."
        threshold: All project-ending technologies covered
        technologies: [T01, T02, T03, T04, T05, T08, T10, T14, T15, T16, T19, T21, T22, T24, T25]
        trl_required: null
        evidence_from: [rq-0-62, rq-0-63]
        proposed_by: [Claude, GPT]
        disputed: true
      - id: kdp-0a-pathfinder-scope
        description: Pathfinder scope traced to the technologies it must qualify
        metric: Traceability matrix of pathfinder tests to T-IDs and TRL 6 claims
        threshold: "Covers T04, T05, T08, T16, T19, T24 (partial T10, T21)"
        technologies: [T04, T05, T08, T10, T16, T19, T21, T24]
        trl_required: null
        evidence_from: [rq-0-63]
        proposed_by: [Claude]
      - id: kdp-0a-commitments
        description: Pre-commit outcomes and threshold-setting
        metric: "Claude: owner records failure outcomes, sunset month, economics premium R and definition of signed demand. GPT: owners and deadlines approved for all four discriminating thresholds; sunset and extension limits via rq-0-63."
        threshold: All recorded or approved
        technologies: []
        trl_required: null
        evidence_from: [D-01, D-02, rq-0-63, rq-0-50, rq-0-58, rq-0-61, rq-0-41]
        proposed_by: [Claude, GPT]
        disputed: true   # values committed now (Claude) vs plans to set them (GPT)
    pass: "Fund 0A; 0B retained only as a gated option (Claude, GPT); Phase 1 carries Earth supply as baseline until KDP-0B (Claude)."
    fail: "Claude: re-plan 0A, bounded to 6 months; Phase 1 assumes Earth supply. Gemini: project hold. GPT: defer, or restrict to ground research and remote survey."

  - id: 0a-scout-pdr
    name: Rendezvous scout PDR
    type: review
    month: { min: 12, max: 24 }   # Claude only
    proposed_by: [Claude]
    disputed: true   # scout TRL position; see g-scout-flight and g-target
    purpose: Commit scout flight hardware with critical technologies at flight-project readiness.
    criteria:
      - id: scout-pdr-bus
        description: Scout bus, EP and proximity operations ready for flight design
        metric: TRL of scout critical technologies
        threshold: TRL 6 (Claude; Gemini places T11 at TRL 7 in g-target; GPT requires TRL 8 actual system before launch)
        technologies: [T11]
        trl_required: 6
        evidence_from: [rq-0-62]
        proposed_by: [Claude]
        disputed: true
      - id: scout-pdr-assay
        description: Subsurface sampling and bulk assay ready, or descoped assay adopted
        metric: TRL of T18 payload, or approved descope (GRNS-class + surface sample + impactor exposure)
        threshold: TRL 6, or descope with stated grade-uncertainty penalty
        technologies: [T18]
        trl_required: 6
        evidence_from: [rq-0-50]
        proposed_by: [Claude]
        disputed: true
      - id: scout-pdr-dsn
        description: DSN-level communications for 4-10 scouts
        metric: Allocated contact plan with DSN or equivalent
        threshold: Signed allocation
        technologies: [T26]
        trl_required: null
        evidence_from: [rq-0-64]
        proposed_by: [Claude]
    pass: Build and launch scouts.
    fail: Fly descoped assay; g-target carries a wider uncertainty bound.

  - id: g-scout-flight
    name: Configuration-specific scout launch release
    type: review
    month: { min: 48, max: 108 }   # GPT only
    proposed_by: [GPT]
    disputed: true   # scout TRL position
    purpose: Prevent programme-level approval from substituting for qualification of each actual scout.
    criteria:
      - id: scout-qualified
        description: Qualification of the actual scout spacecraft and sampling/assay installation
        metric: Flight-system test results verify predictions for the selected configuration
        threshold: TRL 8 actual system before each launch (GPT; contrast Claude TRL 6 at PDR, Gemini TRL 7)
        technologies: [T11, T18]
        trl_required: 8
        evidence_from: [scout flight qualification tests, sampling and assay calibration tests]
        proposed_by: [GPT]
        disputed: true
      - id: scout-command-release
        description: Command and recovery implementation for the scout mission qualified
        metric: End-to-end acceptance tests including outages, authentication and safe recovery
        threshold: Flight acceptance requirements met for the 0A service configuration
        technologies: [T26]
        trl_required: null
        evidence_from: [rq-0-64]
        proposed_by: [GPT]
    pass: Release only qualified scout configurations for launch.
    fail: Hold the affected launch; redesign, requalify or cancel within the approved 0A cap.

  - id: 0a-mtr
    name: 0A mid-term review
    type: review
    month: { min: 24, max: 60 }   # Claude 36-60; Gemini 36-60; GPT 24-48
    proposed_by: [Claude, Gemini, GPT]
    disputed: true
    purpose: Confirm 0B paths are real, discriminate metallurgy routes, release or withhold the next demonstration tranche.
    criteria:
      - id: mtr-trl4
        description: Laboratory validation of critical functions
        metric: TRL 4 exit criteria met (lab test agrees with prediction; relevant environment documented)
        threshold: "Claude: all project-ending 0B technologies. Gemini: T04, T06, T07, T16, T18, T23, with physical experimental evidence for high-AD2 items. GPT: each retained pathfinder-critical function (adds T09, T20, T25); unmet items withheld from their tranche."
        technologies: [T01, T02, T03, T04, T05, T08, T09, T10, T14, T15, T16, T18, T19, T20, T21, T22, T24, T25]
        trl_required: 4
        evidence_from: [rq-0-62, rq-0-54, rq-0-51, rq-0-6, rq-0-26, rq-0-60, rq-0-11, rq-0-56]
        proposed_by: [Claude, Gemini, GPT]
        disputed: true   # scope
      - id: mtr-trl5-pathfinder
        description: Pathfinder payload or relevant-environment demonstration items validated with scaling defined
        metric: TRL 5 exit criteria met
        threshold: "Claude: pathfinder payload technologies at MTR. GPT: TRL 5 as a release condition before each relevant-environment demonstration, not a blanket MTR criterion. Gemini: TRL 4-5 in prose."
        technologies: [T04, T05, T08, T16, T19, T24]
        trl_required: 5
        evidence_from: [rq-0-6, rq-0-26, rq-0-51, rq-0-62]
        proposed_by: [Claude, GPT]
        disputed: true
      - id: mtr-ad2
        description: Path clarity on hard technologies
        metric: Re-assessed AD2
        threshold: AD2 <= 5 for every project-ending technology
        technologies: [T01, T04, T08, T10, T16, T19, T21]
        trl_required: null
        evidence_from: [rq-0-62]
        proposed_by: [Claude]
        disputed: true   # GPT uses AD2 for sequencing and funding only, no numeric threshold
      - id: mtr-metallurgy
        description: Metallurgy route evidence assessed separately per route
        metric: Yield, product quality, mass balance and reagent recycle/loss data on representative feed
        threshold: "Claude: at least 2 of T06, T17, T07, T23 at TRL 4; narrow to <= 2 on pass. Gemini: down-select route at MTR (T17 not listed). GPT: TRL 4 for any route receiving further funding; routes not averaged."
        technologies: [T06, T07, T17, T23]
        trl_required: 4
        evidence_from: [rq-0-56, rq-0-11]
        proposed_by: [Claude, Gemini, GPT]
        disputed: true
      - id: mtr-prospecting
        description: Novel scout sampling and assay functions validated
        metric: Sampling disturbance, bias, depth coverage and assay uncertainty on representative materials
        threshold: TRL 4; TRL 5 before relevant-environment prototype tranche (GPT). Gemini lists T18 at TRL 4.
        technologies: [T11, T18]
        trl_required: 4
        evidence_from: [rq-0-50]
        proposed_by: [Gemini, GPT]
      - id: mtr-command
        description: Integrated authenticated command and recovery breadboard
        metric: T26 integrated-service TRL with fault injection
        threshold: TRL 4; component heritage alone insufficient (GPT)
        technologies: [T26]
        trl_required: 4
        evidence_from: [rq-0-64]
        proposed_by: [Claude, GPT]
      - id: mtr-propellant
        description: Tug propellant selected
        metric: D-05 decision
        threshold: Decided
        technologies: [T01, T14]
        trl_required: null
        evidence_from: [rq-0-52, rq-0-53, rq-0-54, rq-0-55]
        proposed_by: [Claude]
      - id: mtr-licence-demand
        description: Licensing state engaged and demand indicated
        metric: Written engagement from licensing state; indicative Phase 1 demand schedule
        threshold: Both present
        technologies: [T08]
        trl_required: null
        evidence_from: [rq-0-41, rq-0-58]
        proposed_by: [Claude]
    pass: "Continue toward KDP-0B. Claude: freeze pathfinder payload; narrow metallurgy to <= 2 routes. Gemini: down-select metallurgy route. GPT: fund qualified tranches only; update schedule with remaining AD2."
    fail: "Claude: one funded re-plan with KDP-0B slip inside sunset; second fail stops 0B spend (0A only, Earth supply). Gemini: restructure ground R&D; delay pathfinder. GPT: stop or withhold failed routes; bounded corrective programme, or complete 0A without production."

  - id: g-target
    name: Target gate — sampled recoverable Fe-Ni
    type: discriminating
    month: { min: 48, max: 180 }   # Claude 60-108 (interim at MTR); Gemini 48-84; GPT 60-180
    proposed_by: [Claude, Gemini, GPT]
    disputed: true
    purpose: Confirm an accessible sampled target whose recoverable Fe-Ni supports the 0B plan.
    criteria:
      - id: target-grade
        description: Sampled recoverable Fe-Ni grade
        metric: "Claude: lower 90% CB of kg product per kg ore after beneficiation, from excavation-depth samples. Gemini: Fe-Ni mass fraction. GPT: confidence-bounded recoverable grade and inventory after measured beneficiation and recovery."
        threshold: "Claude: >= KDP-0B base-case yield set by rq-0-61 via rq-0-51 (architecture implies ~4-5%; corner range 1.3-16%), primary and backup. Gemini: set by rq-0-50. GPT: set by rq-0-50/51 before final commitment; at least one sampled primary."
        technologies: [T04, T05, T16, T18]
        trl_required: null
        evidence_from: [rq-0-50, rq-0-51, rq-0-61]
        proposed_by: [Claude, Gemini, GPT]
        disputed: true   # metric definition; backup target required or not
      - id: target-geotech
        description: Physical/geotechnical characterisation
        metric: Shape, spin, cohesion, boulder distribution (Claude); geotechnical properties and spatial variability (GPT)
        threshold: Sufficient to close T04/T16 design loads
        technologies: [T04, T16]
        trl_required: null
        evidence_from: [rq-0-50]
        proposed_by: [Claude, GPT]
      - id: target-transport
        description: Transport feasibility to SEL1
        metric: Round-trip delta-v, windows, power history and cycle cadence within tug envelope
        threshold: "Claude: within envelope (1.5-5 yr round trip) for primary and backup. GPT: close 150-300 t payload and 1.5-5 yr cycle, or approve resized architecture before KDP-0B."
        technologies: [T01, T02, T14, T25]
        trl_required: null
        evidence_from: [rq-0-52, rq-0-59]
        proposed_by: [Claude, GPT]
        disputed: true
      - id: target-scout-trl
        description: Scout and sampling systems mature enough to produce target evidence
        metric: TRL assessment
        threshold: TRL 7 (Gemini; contrast Claude TRL 6 at PDR, GPT TRL 8 before launch)
        technologies: [T11, T18]
        trl_required: 7
        evidence_from: [rq-0-50]
        proposed_by: [Gemini]
        disputed: true
    pass: Baseline primary (and, per Claude, backup) target; fix yield in the delivered-cost model.
    fail: "Claude: one further scout wave (<= 36 months, inside sunset), then 0A only, Earth supply. Gemini: 0A only, Earth supply. GPT: resample or change target within a prospecting cap, then 0A only, Earth supply."

  - id: g-demand
    name: Demand gate — signed Phase 1 schedule
    type: discriminating
    month: { min: 48, max: 180 }   # Claude 48-132 (indicative at MTR); Gemini 60-96; GPT 72-180
    proposed_by: [Claude, Gemini, GPT]
    disputed: true
    purpose: Size 0B to binding Phase 1 demand rather than projections.
    criteria:
      - id: demand-3x
        description: Signed Phase 1 demand satisfies the D-02 within-3x condition
        metric: "Claude and Gemini: ratio of signed annual demand (kt/yr) to planned 0B output. GPT: interpretation unresolved; proposes accepted delivery-date span <= 3x elapsed time from a common 0A epoch."
        threshold: "Claude: signed demand >= one third of nameplate (~0.2-0.8 kt/yr) with schedule overlap. Gemini: set by rq-0-58. GPT: set by rq-0-58 once 3x is defined; not objectively passable until then."
        technologies: []
        trl_required: null
        evidence_from: [rq-0-58]
        proposed_by: [Claude, Gemini, GPT]
        disputed: true   # quantity vs timing interpretation
      - id: demand-signed-definition
        description: Definition of signed demand
        metric: Owner definition recorded
        threshold: "Claude: funded Phase 1 baseline line item at Phase 1's own KDP, or external offtaker; flags circularity. GPT: signed specification, quantities, delivery node and dated schedule."
        technologies: []
        trl_required: null
        evidence_from: [rq-0-58, D-02]
        proposed_by: [Claude, GPT]
        disputed: true
      - id: demand-spec
        description: Product specification agreed
        metric: Signed specification (composition, form, tolerances)
        threshold: Exists and is testable by T22 qualification
        technologies: [T22]
        trl_required: null
        evidence_from: [rq-0-58]
        proposed_by: [Claude, GPT]
    pass: Demand sets the maximum justified 0B scale; do not size above accepted demand (GPT).
    fail: "Claude: defer 0B at minimal option-keeping spend; re-test at Phase 1 milestones. Gemini: 0A only, Earth supply. GPT: reduce or defer 0B; absent adequate demand, 0A only, Earth supply."

  - id: g-economics
    name: Economics gate — delivered cost vs Earth supply
    type: discriminating
    month: { min: 60, max: 180 }   # Claude 90-150; Gemini 60-96; GPT 72-180
    proposed_by: [Claude, Gemini, GPT]
    disputed: true
    purpose: Compare fully burdened delivered Fe-Ni at SEL1 with equivalent Earth supply.
    criteria:
      - id: eco-ratio
        description: Delivered cost on a common basis (capital, reagents and spares, propellant, operations, delay)
        metric: 0B $/kg at SEL1 against Earth-supply $/kg at SEL1
        threshold: "Claude: 0B P70 <= R x Earth P50, R set by owner (may exceed 1 per D-01), numbers via rq-0-61. Gemini: must undercut Earth supply. GPT: expected cost no higher than Earth supply plus owner downside bound; any capability subsidy is a separate owner decision."
        technologies: [T01, T05, T14, T22]
        trl_required: null
        evidence_from: [rq-0-61, rq-0-57, rq-0-53, rq-0-52, rq-0-28, rq-0-56]
        proposed_by: [Claude, Gemini, GPT]
        disputed: true   # whether a premium above parity can pass this gate
      - id: eco-robustness
        description: Decision robustness
        metric: "Claude: sign of (ratio - R) across launch-price and yield ranges. GPT: downside exposure and sensitivity to grade, utilisation, replacement and delay."
        threshold: Does not reverse across stated ranges (Claude)
        technologies: []
        trl_required: null
        evidence_from: [rq-0-61, rq-0-57, rq-0-50]
        proposed_by: [Claude, GPT]
      - id: eco-confidence
        description: Cost estimate confidence
        metric: Estimate uncertainty band
        threshold: "+/- 30% or better"
        technologies: []
        trl_required: null
        evidence_from: [rq-0-28, rq-0-57]
        proposed_by: [Claude]
    pass: Economic condition for 0B satisfied.
    fail: "All: Earth supply. Claude: re-test on pre-set shifts in launch price or demand. GPT: subsidy only by new explicit owner decision."

  - id: g-licence
    name: Licence gate — debris, tailings and operating envelope
    type: discriminating
    month: { min: 48, max: 180 }   # Claude in principle 48-72, final 84-144; Gemini 60-96; GPT 60-180
    proposed_by: [Claude, Gemini, GPT]
    disputed: true
    purpose: Obtain licensing-state authorisation with a numeric escape limit the system is shown to meet.
    criteria:
      - id: licence-limit
        description: Written authorisation (Claude cites OST Article VI) with escape limit, verification method and tailings requirement for 13-47 kt/yr
        metric: Approved escaped-mass limit per site (GPT adds particle/velocity classes, confidence, averaging interval, abnormal-event limits)
        threshold: "Gemini: <= 1 t/yr. Claude: interim <= 1 t/yr ALARP; final set by rq-0-41. GPT: <= 1 t/yr is interim only, not a licence; binding value from rq-0-41 and the licensing state."
        technologies: [T08]
        trl_required: null
        evidence_from: [rq-0-41, D-03]
        proposed_by: [Claude, Gemini, GPT]
        disputed: true   # status of the 1 t/yr figure
      - id: licence-verification
        description: Containment and escape verification demonstrated
        metric: "Claude: measured pathfinder escape vs limit and detection limit. GPT: uncertainty-bounded annualised escape incl. excavation, transfers, storage and credible failures. Gemini: escaped t/yr."
        threshold: "Claude: below limit; detection limit <= 10% of limit. GPT: compliant with uncertainty included. Gemini: <= 1 t/yr."
        technologies: [T04, T08, T19]   # Claude and Gemini: T08 only; GPT adds T04, T19
        trl_required: 6
        evidence_from: [rq-0-41, pathfinder, containment tests]
        proposed_by: [Claude, Gemini, GPT]
        disputed: true
      - id: licence-frequency
        description: Frequency coordination for 15-29 assets
        metric: National filing and ITU coordination status
        threshold: Coordinated
        technologies: [T26]
        trl_required: null
        evidence_from: [rq-0-64]
        proposed_by: [Claude]
    pass: Licensed operating envelope accepted for production.
    fail: "Claude: no waiver; no 0B production; 0A only. Gemini: 0A only, Earth supply. GPT: redesign and reapply within a bounded extension, or prohibit 0B and retain Earth supply."

  - id: pf-results
    name: Pathfinder results review
    type: review
    month: { min: 84, max: 144 }   # Claude only
    proposed_by: [Claude]
    disputed: true   # scale rule disputed by GPT
    purpose: Convert pathfinder operations at the NEA into TRL 6 claims under a pre-agreed scale rule.
    criteria:
      - id: pf-regolith
        description: Regolith-contact technologies demonstrated at the target
        metric: TRL 6 exit criterion, with extrapolation <= 10x or governing regimes preserved (Claude); GPT rejects any fixed factor in favour of test-validated models
        threshold: All pathfinder-assigned technologies
        technologies: [T04, T05, T08, T16, T19, T24]
        trl_required: 6
        evidence_from: [pathfinder, rq-0-6, rq-0-26, rq-0-51]
        proposed_by: [Claude]
        disputed: true
      - id: pf-autonomy
        description: Autonomy and maintenance over duration-relevant operations
        metric: Operating hours, interventions, faults recovered without ground
        threshold: Set at MTR against 0B duty cycle
        technologies: [T10, T21]
        trl_required: 6
        evidence_from: [pathfinder]
        proposed_by: [Claude]
    pass: Feed TRL 6 evidence to KDP-0B.
    fail: Re-fly or redesign if inside the sunset; otherwise 0A only, Earth supply.

  - id: kdp-0b
    name: KDP-0B — exercise the 0B option
    type: kdp
    month: { min: 72, max: 180 }   # Claude 96-156; Gemini 72-120; GPT 96-180
    proposed_by: [Claude, Gemini, GPT]
    disputed: true
    purpose: Decide whether, and at what scale, to fund in-space Fe-Ni production; AND logic across all criteria (GPT, Claude).
    criteria:
      - id: kdp-0b-core
        description: Agreed core project-ending technologies at TRL 6 in relevant environment
        metric: TRL 6 exit criterion per technology
        threshold: All, no waivers
        technologies: [T01, T02, T03, T04, T05, T08, T10, T14, T15, T16, T19, T21, T22, T24]
        trl_required: 6
        evidence_from: [rq-0-62, rq-0-54, rq-0-51, rq-0-26, rq-0-41, pathfinder]
        proposed_by: [Claude, Gemini, GPT]
      - id: kdp-0b-disputed-members
        description: Technologies whose project-ending status differs by model
        metric: TRL and classification per owner ruling at KDP-0A
        threshold: "T25: project-ending (Claude, Gemini) vs TRL 6 selected implementation (GPT). T26: project-ending (Claude view; open in rq-0-64) vs TRL 6 integrated service (GPT); not listed by Gemini. T18: project-ending (Gemini) vs TRL 6 technology maturity (GPT) vs 0A flight technology (Claude). T11: Gemini prose only; TRL 6 maturity (GPT)."
        technologies: [T11, T18, T25, T26]
        trl_required: 6
        evidence_from: [rq-0-62, rq-0-64, rq-0-50]
        proposed_by: [Claude, Gemini, GPT]
        disputed: true
      - id: kdp-0b-route
        description: At least one complete metallurgy route end-to-end, routes assessed separately
        metric: Feed-to-qualified-product performance (recovery, throughput, reagent losses, waste)
        threshold: ">= 1 route at TRL 6; Claude chain includes T05, T19, T22; GPT includes T05, T22. Gemini sets no KDP-0B metallurgy criterion."
        technologies: [T05, T06, T07, T17, T19, T22, T23]
        trl_required: 6
        evidence_from: [rq-0-56, rq-0-11]
        proposed_by: [Claude, GPT]
        disputed: true   # chain boundary; absent from Gemini
      - id: kdp-0b-support
        description: Power distribution, storage, cargo handling and navigation
        metric: TRL of selected implementations with documented scaling
        threshold: "Claude: T09, T12, T20 at TRL >= 5, waiverable, funded path to 6 before 0B CDR. GPT: T09, T12, T20, T25 at TRL 6 for selected implementations; substitutions reassessed."
        technologies: [T09, T12, T20, T25]
        trl_required: null   # 5 (Claude) vs 6 (GPT)
        evidence_from: [rq-0-60, rq-0-59, rq-0-62]
        proposed_by: [Claude, GPT]
        disputed: true
      - id: kdp-0b-four-gates
        description: All four discriminating gates passed for the same configuration
        metric: Status of g-target, g-demand, g-economics, g-licence
        threshold: All passed
        technologies: []
        trl_required: null
        evidence_from: [rq-0-50, rq-0-58, rq-0-61, rq-0-41]
        proposed_by: [Claude, Gemini, GPT]
      - id: kdp-0b-closure
        description: Integrated design closure (mass, power, thermal, reliability, maintenance, logistics, cost, schedule)
        metric: Budget margins and reserves
        threshold: "Claude: >= 20% mass, >= 15% power. GPT: closure and reserve policy approved before final review; no unresolved project-ending assumptions."
        technologies: [T01, T02, T03, T04, T05, T08, T10, T14, T15, T16, T19, T20, T21, T22, T24, T26]
        trl_required: null
        evidence_from: [rq-0-62, rq-0-63, rq-0-52, rq-0-61]
        proposed_by: [Claude, GPT]
        disputed: true
      - id: kdp-0b-water
        description: Water pilot, only if target is C-type
        metric: TRL of water extraction pilot
        threshold: TRL 5, else drop pilot (Claude); GPT handles in g-water-pilot at TRL 6 and not as a production veto
        technologies: [T13]
        trl_required: 5
        evidence_from: [rq-0-55]
        proposed_by: [Claude]
        disputed: true
      - id: kdp-0b-sunset
        description: Programme sunset
        metric: Month by which KDP-0B must pass
        threshold: "Claude: month 180, fallback executes automatically. GPT: set via rq-0-63; M180 is a planning boundary, not an automatic commitment. Gemini: none."
        technologies: []
        trl_required: null
        evidence_from: [rq-0-63]
        proposed_by: [Claude, GPT]
        disputed: true
    pass: Fund 0B at the scale set by signed demand and the delivered-cost model.
    fail: "Claude: one slip inside the month-180 sunset, then 0A only, Earth supply, with 0A results archived and published. Gemini: 0A only, Earth supply. GPT: explicit bounded extension, or 0A only, Earth supply."

  - id: g-water-pilot
    name: Optional C-type water-pilot release
    type: review
    month: { min: 72, max: 180 }   # GPT only; Claude folds into KDP-0B; Gemini revises gate-3 without a gate
    proposed_by: [GPT]
    disputed: true
    purpose: Authorise a water pilot only if independently justified, without making production propellant a Phase 0 dependency.
    criteria:
      - id: water-pilot-readiness
        description: Extraction, capture, purification and containment for selected C-type feed
        metric: Yield, purity, energy, losses and scale-up validation for a 10-100 t/yr pilot
        threshold: TRL 6 before operational pilot commitment (GPT; Claude TRL 5 at KDP-0B)
        technologies: [T13]
        trl_required: 6
        evidence_from: [rq-0-27, rq-0-33, rq-0-40]
        proposed_by: [GPT]
        disputed: true
    pass: Authorise a separately budgeted pilot without production LOX/LH2 infrastructure.
    fail: Drop or defer the pilot without blocking an otherwise qualified Fe-Ni programme.

retired: [gate-1, gate-2, gate-3, gate-4, gate-5]   # unanimous in all YAML; Gemini prose says "revise" for gates 1, 3, 4, 5
```
