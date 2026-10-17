---
step: gates
item: gates
modelId: gpt-6-1-sol
modelName: "GPT-6.1 Sol"
endpoint: databricks-gpt-6-1-sol
generated: 2026-10-17T21:55:17.812Z
seconds: 169.057
---

## Recommendation

**Replace the March gate set with three programme decisions and four independent discriminating gates.** KDP-0B is an **AND decision**, not an average readiness score:

1. Every project-ending technology meets **TRL 6 in its defined relevant environment**, without waiver.
2. At least one complete Fe-Ni production route meets that requirement.
3. Target, demand, economics and licence gates all pass.
4. The integrated design closes at the scale supported by those four gates.

Failure does **not** invalidate 0A as a research programme. The default fallback is **“0A only, Earth supply”**, with continued research requiring its own bounded authorisation.

The supplied TRLs are planning baselines, **not verified evidence-register findings**. In particular, a panel range extending to TRL 4 or 5 is not evidence that those exit criteria have been met.

---

## 1. KDP structure and timing

Months below are relative to authorised 0A start; no calendar start date is supplied. These are proposed planning windows, not demonstrated development durations.

| Decision | Proposed timing | Purpose and pass outcome | Pre-committed failure outcome |
|---|---:|---|---|
| **KDP-0A** | **M0** | Authorise bounded research, surveys, scout development and one pathfinder. Approve test requirements, evidence register, funding limits and stopping rules—not production infrastructure. | Defer or reduce 0A to affordable ground research and remote survey. No implied 0B commitment. |
| **0A mid-term review** | **M24–48** | Require laboratory validation of critical functions, discriminate between metallurgy routes, and approve the next ground/flight demonstration tranche. | Drop failed routes; redesign the pathfinder if justified; otherwise complete only independently valuable science and survey work. |
| **KDP-0B** | **M96–180** | Authorise a specifically sized production capability only after TRL 6 and all four discriminating gates pass. | No production procurement. Permit only an explicitly funded, time-bounded extension or select **0A only, Earth supply**. |

### Why not retain a month-60 production commitment?

The baseline development estimates span roughly:

- **AD² 7:** excavation/anchoring, rotating smelting and some handling or containment approaches—approximately **5–15 years**, depending on the assessor and route.
- **AD² 6:** propulsion, metallurgy, autonomy and maintenance—approximately **4–12 years**.
- **AD² 4–5:** storage and some power, handling and navigation elements—approximately **2–10 years**.

The M96–180 window is driven by the **coupled excavation–anchoring–handling–processing path**, propulsion endurance, and the opportunity to obtain target samples. It is not an average of panel estimates.

AD² should determine **test sequencing, reserve and alternative-route funding**. Its working probability anchors should not be multiplied into a programme success probability: the developments are strongly dependent.

**Schedule condition:** at KDP-0A, establish a funded decision calendar and programme sunset through rq-0-63. M180 is a planning boundary, not authority for an automatic fifteen-year commitment.

---

## 2. Technology criteria

### Assessment rules at every review

Each credited TRL must have:

- a configuration-controlled assessed object;
- cited test results and predictions against which they were compared;
- a defined relevant environment;
- demonstrated/required **scale and duration ratios**;
- explicit scaling requirements and remaining uncertainties.

Do not assign a system TRL by averaging component ratings or automatically taking the weakest component. Assess the integration itself; an unvalidated critical function nevertheless blocks the claimed system demonstration.

### Technology obligations by decision

| Technology scope | KDP-0A | 0A mid-term review | Before KDP-0B |
|---|---|---|---|
| **T01–T05, T08, T10, T14–T16, T19, T21, T22, T24**: production-enabling common systems | Audit baseline and fund advancement; no universal TRL entry floor | **TRL 4** for the critical functions retained for the pathfinder; **TRL 5** for breadboards explicitly being released to a relevant-environment demonstration | **TRL 6**, no waiver where project-ending |
| **T06 carbonyl; T17 H₂ reduction; T07 rotating smelting; T23 native-metal rotating production** | Preserve separate assessed objects and test plans | **TRL 4** for a route to receive further development funding; **TRL 5** before its relevant-environment prototype demonstration | **At least one complete selected route at TRL 6**; not every alternative |
| **T09, T12, T20, T25**: tether distribution, cargo handling, storage, cargo navigation | Requirements and replacement options established | **TRL 4**, or TRL 5 where scheduled for pathfinder use | **TRL 6 for the selected reference implementation**; a substitution must itself be assessed |
| **T11 scouts; T18 sampling and bulk assay** | Mission-specific development and representative-sampling requirements | **TRL 4–5** for novel critical subsystems | **TRL 6 technology maturity before dependence at KDP-0B**; actual scout systems must be **TRL 8 before launch**. Target-gate evidence must already have been obtained |
| **T26 integrated communications and authenticated command** | Retain owner’s **provisional TRL 3** headline, subject to evidence audit | **TRL 4 integrated breadboard**; TRL 5 before relevant-environment service demonstration | **TRL 6** for the production command service; separately qualify the service needed by 0A flights |
| **T13 optional C-type water pilot** | Conditional scope only | **TRL 4–5** if retained | Not a production veto. Require **TRL 6 before committing to an operational pilot** |
| Solar-grade Si, oxide-derived Al/Si, production LOX/LH₂ | **Deferred** | No readiness obligation | No Phase-0 gate |

The mid-term review is a **tranche decision**: a technology that misses its milestone cannot receive its planned demonstration commitment merely because unrelated technologies passed. A bounded continuation can be approved without declaring the failed criterion met.

### Required scale and environment closure

Before a TRL 6 claim, require the following in the relevant test specification:

- **T01/T14:** selected propellant, representative PPU/thruster/feed integration, **1–2.5 MWe per tug**, and credible qualification of **20,000–40,000 operating hours**. Accelerated testing needs a validated degradation model; short high-power operation is insufficient.
- **T02/T15:** **1–2.5 MWe tug arrays** and **2.5–8 MW site supply**, deployment, distribution and degraded output over the actual 0.9–1.3 AU operating envelope.
- **T03:** separate assessments for **1–9 MWth plant** and **50–800 kWth tug** heat rejection. Different temperatures, fluid loops and deployment configurations cannot share one unqualified rating.
- **T04/T16/T19/T24:** **2–3.5 t robots**, **0.5–5 t/h excavation**, 9–25% duty cycle, credible reaction-force closure, abrasive charged regolith and mission-life mechanisms.
- **T05/T06/T07/T17/T22/T23:** measured feed composition, recovery, reagent losses, product properties and throughput supporting **0.6–2.5 kt/yr delivered product**. For T07, explicitly demonstrate **0.05–0.15 g** separation; the proposed ≥1 t batch is a discriminating experiment, not by itself TRL 6.
- **T08:** management of **13–47 kt/yr tailings**, including failures, with measured escape and a validated annualisation model.
- **T09/T20:** **1–3 kV** moving tethers, **10–50 kWh robot batteries**, and **0.5–15 MWh distributed storage**.
- **T10/T21/T26:** unattended operation, fault injection, recovery, maintenance and trustworthy command over mission-representative delays and outages.
- **T12/T25:** **150–300 t cargo**, representative inertia, flexible modes and low-thrust/proximity transitions; SEL1 operations must be distinguished from asteroid-local operations.
- **T13:** if retained, **10–100 t/yr water**, not a production cryogenic-propellant system.

A TRL 6 demonstration need not reproduce annual output for a full year or fly the entire commercial plant. It must demonstrate a sufficiently representative subsystem and justify the remaining scale and duration extrapolation with test-validated models. **No fixed “acceptable scale factor” can be assumed in advance.**

### Heritage cross-checks—not readiness credit for the full architecture

Examples of evidence that can support, but cannot close, the register:

| Physical evidence | Demonstrated/required comparison | What remains unproven |
|---|---|---|
| **X3 nested-channel Hall-thruster ground testing, 2017**, reached approximately **102 kW** | About **0.041–0.102** of required tug electrical power, before resolving PPU and system boundaries | MW cluster integration, selected propellant, lifetime and plume compatibility |
| **NASA NEXT long-duration ground test, completed 2013**, exceeded **51,000 h** at kW-class xenon operation | Operating-hour ratio exceeds the required range; **power, propellant and configuration ratios do not** | Cannot transfer lifetime qualification to MW iodine or argon systems |
| **Rafalskyi et al., Nature, 2021, “In-orbit demonstration of an iodine electric propulsion system”** | Approximately **20 W** demonstration: about **8×10⁻⁶–2×10⁻⁵** of tug power | MW iodine feed, materials compatibility, lifetime and plume effects |
| **ROSA ISS demonstration, 2017; iROSA operational deployments beginning 2021** | Approximately **20 kW per iROSA assembly**, or **0.008–0.02** of a tug requirement and **0.0025–0.008** of site power | MW deployment dynamics, electrical architecture and asteroid-site installation |
| **Hayabusa2 sampling, 2019, return 2020; OSIRIS-REx collection, 2020, return 2023** | Returned material was approximately **5.4 g** and **121.6 g**, respectively—far below bulk production scale | Representative subsurface resource grade, recoverability and sustained excavation |
| **NASA DINET on EPOXI, 2008** | Deep-space DTN flight demonstration; no meaningful scalar ratio to a **15–29-asset authenticated command service** | Configuration-specific security, key lifecycle, recovery and service capacity |

These examples explain why high component heritage and low architecture-level ratings can coexist. I have not been supplied with a verified physical test supporting each baseline TRL 3–5 claim, particularly for the metallurgy and integrated service objects.

**Disagreement retained:** T24 remains disputed at TRL 2–5; T07/T23 at TRL 2 versus 2–3; and several power and handling technologies at TRL 2–3 versus 4–5. Higher endpoints require the corresponding test reports, not a panel ruling. T26 remains provisional TRL 3, with TRL 4 conditional on an integrated breadboard.

---

## 3. Four discriminating gates

These gates are independent of TRL. A mature plant can still fail every one of them.

| Gate | Criterion and metric | Threshold and evidence |
|---|---|---|
| **Target** | Sampled, spatially defensible **recoverable Fe-Ni grade**, accessible inventory, geotechnical properties and transport compatibility | rq-0-50/51 must set minimum grade, inventory and confidence before final target commitment. At least one sampled primary target must support the selected production plan; a metal-rich spectral classification is insufficient. Evidence: scout sampling/assay, recovery tests on representative material, geotechnical results and rq-0-52 trajectories |
| **Demand** | Signed Phase 1 material specification, quantities, delivery node and dated schedule | Resolve the exact interpretation of **“within 3×”** through rq-0-58 before applying it. Recommended: the signed schedule’s earliest/latest accepted dates for each material tranche span no more than 3× elapsed time from the common 0A epoch, supplemented by explicit delivery windows. Size 0B only to accepted demand; do not treat a 3× timing allowance as permission to overproduce |
| **Economics** | Risk-adjusted, fully burdened **delivered $/accepted kg at SEL1**, compared with an equivalent Earth-supply service | rq-0-61 sets the required competitiveness margin and uncertainty rule before bid/model evaluation. Recommended minimum: no higher expected delivered cost than Earth supply, plus an owner-approved downside bound. Include development, financing/capital basis, replacements, reagents, propellant, losses and schedule risk. Evidence: rq-0-53/57 quotes, rq-0-52 transport model, measured process BOM and signed demand |
| **Licence** | State-agreed operating envelope, debris accounting, escape verification and disposal/tailings method | The **≤1 t/yr/site** figure is interim, not a licence. rq-0-41 and the licensing state set the binding threshold, particle/velocity classes, confidence, averaging interval and abnormal-event limits. Require ALARP and authority acceptance |

The proposed interim escape ceiling corresponds to only **2.1×10⁻⁵–7.7×10⁻⁵** of the annual tailings mass—approximately **99.992–99.998% retention**, if tailings were the only escape source. Excavation and other losses consume the same allowance. Measurement uncertainty must fit inside the approved limit.

**Important demand ambiguity:** the supplied “within 3×” wording does not identify its numerator, denominator or epoch. The recommended interpretation above is a proposal, not an accepted owner decision. Until that ambiguity is resolved, the demand gate is not objectively passable.

---

## 4. Failure policy

- **Metallurgy route fails:** terminate that route; continue an alternative only if it has its own credible funded path. Failure of all complete routes ends 0B.
- **Project-ending technology misses TRL 6:** no waiver and no production commitment. Redesign, bounded extension, or **0A only, Earth supply**.
- **Target fails:** resample or select another accessible target within a prospecting cap. No open-ended search.
- **Demand fails:** reduce or defer 0B; do not build speculative capacity.
- **Economics fails:** retain Earth supply. A deliberate capability subsidy requires a **new explicit owner decision**, not a relabelled economics pass.
- **Licence fails:** no production deployment or operation under the rejected envelope. Redesign containment or stop 0B.
- **Optional water pilot fails:** drop the pilot; no presumed switch to lunar water, chemical propulsion or production cryogenics.
- **Scout or command qualification fails:** hold the affected launch. The scientific value of remaining 0A work does not waive flight safety or trustworthy command requirements.

---

## 5. Changes to `decision-gates.ts`

| Current gate | Action |
|---|---|
| **gate-1: Microgravity Materials Processing** | **Retire and replace.** Assess separate Fe-Ni routes. Remove mandatory silicon purity, electronic-grade material and a presumed central station. Rotation is an alternative to test, not an automatic successful fallback. |
| **gate-2: Cryogenic Propellant Architecture** | **Retire from Phase 0.** Replace its transport relevance with T01/T14 selected-EP-propellant validation. Preserve cryogenic work only in the deferred register. |
| **gate-3: Water Extraction** | **Revise as optional pilot release.** No production propellant dependency; no automatic lunar-water fallback. Replace 1 kg/day with evidence supporting the selected 10–100 t/yr pilot. |
| **gate-4: Asteroid Target Selection** | **Revise into g-target.** Replace three spectroscopically water-bearing objects with sampled recoverable Fe-Ni resources. Replace fixed impulsive Δv and L4/L5 destination with validated low-thrust schedules to SEL1. |
| **gate-5: Phase 0 PDR** | **Retire and replace with the three decision points.** Remove TRL-5 waivers, month-60 production assumption, obsolete cost claims and the requirement to pass deferred gates. Retain integrated mass, power, thermal, reliability and cost closure as KDP-0B evidence. |

Software changes should also:

- support **conditional applicability**, evidence references and configuration identifiers;
- distinguish **“not evidenced”** from **“tested and failed”**;
- replace percentage readiness as a go/no-go calculation with mandatory-criterion logic;
- exclude retired/deferred gates from “next gate” selection;
- record signed decisions and approved scope, rather than inferring approval from `met: true`.

```yaml
gates:
  - id: kdp-0a
    name: Authorise bounded Phase 0A capability programme
    type: kdp
    month: { min: 0, max: 0 }
    purpose: Authorise research, survey, scout development and one pathfinder without committing to production.
    criteria:
      - id: kdp-0a-evidence
        description: Audit assessed objects and baseline evidence without treating panel agreement as test evidence.
        metric: Every retained technology has a configuration, evidence status, relevant environment, scale and duration gaps, target TRL and AD2 assessment.
        threshold: All retained technologies registered; unsupported ratings explicitly provisional.
        technologies: [T01, T02, T03, T04, T05, T06, T07, T08, T09, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26]
        trl_required: null
        evidence_from: [rq-0-62, configuration-controlled evidence register]
      - id: kdp-0a-programme
        description: Establish funded development paths, decision dates, extension limits and stopping rules.
        metric: Approved work packages, test specifications, resource envelope and programme sunset.
        threshold: Signed bounded 0A authorisation with no automatic 0B commitment.
        technologies: []
        trl_required: null
        evidence_from: [rq-0-63, rq-0-58, rq-0-61]
      - id: kdp-0a-threshold-plan
        description: Assign owners and deadlines for all discriminating thresholds.
        metric: Target, demand, economics and licence threshold-setting plans approved.
        threshold: All four plans approved before consequential production or target commitments.
        technologies: []
        trl_required: null
        evidence_from: [rq-0-50, rq-0-58, rq-0-61, rq-0-41]
    pass: Fund bounded 0A and retain 0B only as a gated real option.
    fail: Defer authorisation or restrict activity to affordable ground research and remote survey.

  - id: 0a-mtr
    name: Phase 0A mid-term evidence and route review
    type: review
    month: { min: 24, max: 48 }
    purpose: Release only the next development tranche supported by laboratory evidence and a credible demonstration path.
    criteria:
      - id: mtr-common-functions
        description: Validate critical common functions retained for the pathfinder.
        metric: Documented breadboard performance agrees with predictions; relevant environments and scaling gaps are defined.
        threshold: TRL 4 for each retained pathfinder-critical function; unmet items cannot receive their planned demonstration release.
        technologies: [T01, T02, T03, T04, T05, T08, T09, T10, T14, T15, T16, T19, T20, T21, T22, T24, T25]
        trl_required: 4
        evidence_from: [rq-0-62, rq-0-54, rq-0-51, rq-0-60, rq-0-26, critical-function laboratory tests]
      - id: mtr-metallurgy
        description: Select further metallurgy work using separate physical evidence for each candidate route.
        metric: Measured recovery, product quality, mass balance, reagent losses and energy use on representative feed.
        threshold: TRL 4 for any route receiving further development funding; routes are not averaged.
        technologies: [T06, T07, T17, T23]
        trl_required: 4
        evidence_from: [rq-0-56, rq-0-11, comparative metallurgy breadboard tests]
      - id: mtr-prospecting
        description: Validate novel scout sampling and assay functions against resource-characterisation requirements.
        metric: Sampling disturbance, bias, depth coverage and assay uncertainty measured on representative materials.
        threshold: TRL 4; TRL 5 required before release to the relevant-environment prototype tranche.
        technologies: [T11, T18]
        trl_required: 4
        evidence_from: [rq-0-50, sampling and assay calibration tests]
      - id: mtr-command
        description: Validate integrated authenticated command, recovery and outage handling in a laboratory breadboard.
        metric: End-to-end fault-injection results for delay, outage, compromised or expired credentials and recovery.
        threshold: TRL 4 integrated-service exit criteria; component heritage alone is insufficient.
        technologies: [T26]
        trl_required: 4
        evidence_from: [rq-0-64, integrated command-service breadboard tests]
      - id: mtr-tranche-release
        description: Apply relevant-environment entry holds to each retained demonstration.
        metric: Breadboard tests validate the functions and scaling assumptions needed by the proposed demonstration.
        threshold: TRL 5 before committing the corresponding relevant-environment prototype demonstration.
        technologies: [T01, T02, T03, T04, T05, T06, T07, T08, T09, T10, T14, T15, T16, T17, T19, T20, T21, T22, T23, T24, T25, T26]
        trl_required: 5
        evidence_from: [rq-0-62, relevant-environment breadboard tests]
    pass: Fund qualified next tranches, downselect routes and update the integrated schedule using remaining AD2 difficulty.
    fail: Stop failed routes or withhold their tranche; authorise only a bounded corrective programme or complete 0A without production.

  - id: g-scout-flight
    name: Configuration-specific scout launch release
    type: review
    month: { min: 48, max: 108 }
    purpose: Prevent programme-level research approval from substituting for qualification of each actual scout.
    criteria:
      - id: scout-qualified
        description: Complete qualification of the actual scout spacecraft and its sampling and assay installation.
        metric: Flight-system test results verify predictions for the selected mission configuration.
        threshold: TRL 8 actual system before each launch; schedule follows demonstrated readiness and launch opportunity.
        technologies: [T11, T18]
        trl_required: 8
        evidence_from: [scout flight qualification tests, sampling and assay calibration tests]
      - id: scout-command-release
        description: Qualify the command and recovery implementation required by the scout mission.
        metric: End-to-end mission acceptance tests include outages, authentication and safe recovery.
        threshold: Flight acceptance requirements met for the actual 0A service configuration.
        technologies: [T26]
        trl_required: null
        evidence_from: [rq-0-64, scout command-service acceptance tests]
    pass: Release only qualified scout configurations for launch.
    fail: Hold the affected launch; redesign, requalify or cancel within the approved 0A cap.

  - id: g-target
    name: Sampled recoverable Fe-Ni resource and accessible target
    type: discriminating
    month: { min: 60, max: 180 }
    purpose: Establish that an accessible sampled target supports the selected production plan.
    criteria:
      - id: target-resource
        description: Verify recoverable grade, accessible inventory, spatial variability and geotechnical compatibility.
        metric: Confidence-bounded recoverable Fe-Ni grade and inventory after measured beneficiation and process recovery.
        threshold: set by rq-0-50 and rq-0-51 before final target commitment
        technologies: [T04, T05, T16, T18]
        trl_required: null
        evidence_from: [rq-0-50, rq-0-51, scout sampling and assay, representative-feed recovery tests]
      - id: target-transport
        description: Demonstrate transport compatibility with the selected target and SEL1 delivery plan.
        metric: Validated trajectories, departure windows, power history, payload, propellant and round-trip cadence.
        threshold: Close the selected 150-300 t payload and 1.5-5 year cycle assumptions or approve a resized architecture before KDP-0B.
        technologies: [T01, T02, T14, T25]
        trl_required: null
        evidence_from: [rq-0-52, rq-0-59, test-validated propulsion models]
    pass: Accept the sampled primary target and production envelope for final sizing.
    fail: Resample or change target within a prospecting cap; otherwise choose 0A only, Earth supply.

  - id: g-demand
    name: Signed Phase 1 demand and delivery schedule
    type: discriminating
    month: { min: 72, max: 180 }
    purpose: Size production only to accepted Phase 1 requirements.
    criteria:
      - id: demand-signed
        description: Obtain signed material specifications, quantities, delivery node and dated acceptance schedule.
        metric: Accepted kilograms by specification and delivery window, with an explicit definition of the 3x schedule condition.
        threshold: set by rq-0-58; signed demand and the D-02 within-3x condition are mandatory
        technologies: [T22]
        trl_required: null
        evidence_from: [rq-0-58, signed Phase 1 demand schedule]
    pass: Set the maximum justified 0B scale and product acceptance requirements.
    fail: Reduce or defer 0B; absent adequate signed demand, retain 0A only, Earth supply.

  - id: g-economics
    name: Delivered-cost competitiveness against Earth supply
    type: discriminating
    month: { min: 72, max: 180 }
    purpose: Compare equivalent accepted material delivery services on a common cost and risk basis.
    criteria:
      - id: economics-comparison
        description: Compare fully burdened 0B and Earth-supply costs at the agreed delivery node and schedule.
        metric: Expected delivered dollars per accepted kilogram, downside exposure and sensitivity to grade, utilisation, replacement and delay.
        threshold: set by rq-0-61 before final evaluation; competitiveness margin and downside rule require owner approval
        technologies: [T01, T05, T14, T22]
        trl_required: null
        evidence_from: [rq-0-61, rq-0-57, rq-0-53, rq-0-52, rq-0-56, signed supplier quotations, measured process BOM]
    pass: Accept the scoped economic case for KDP-0B.
    fail: Use Earth supply; any capability subsidy requires a new explicit owner decision rather than an economics pass.

  - id: g-licence
    name: Agreed debris, tailings and operating envelope
    type: discriminating
    month: { min: 60, max: 180 }
    purpose: Obtain licensing-state acceptance of a verifiable production operating envelope.
    criteria:
      - id: licence-limit
        description: Agree binding escape limits, particle classes, confidence, averaging intervals and abnormal-event treatment.
        metric: Approved annual escaped mass and event limits with a measurement and reporting protocol.
        threshold: set by rq-0-41 and the licensing state; interim ceiling is <=1 t/year/site with ALARP
        technologies: [T08]
        trl_required: null
        evidence_from: [rq-0-41, licensing-state agreement, debris and tailings risk assessment]
      - id: licence-verification
        description: Demonstrate containment and escape verification for the approved operating envelope.
        metric: Uncertainty-bounded annualised escape including excavation, transfers, tailings storage and credible failures.
        threshold: Comply with the agreed limit and ALARP; measurement uncertainty must be included.
        technologies: [T04, T08, T19]
        trl_required: 6
        evidence_from: [rq-0-41, containment tests, escape-sensor calibration, test-validated ejecta models]
    pass: Accept the licensed operating envelope for production commitment.
    fail: Redesign and reapply within a bounded extension or prohibit 0B production and retain Earth supply.

  - id: kdp-0b
    name: Commit to demand-sized in-space production
    type: kdp
    month: { min: 96, max: 180 }
    purpose: Authorise only a specifically sized production capability supported by technology, resource, demand, economics and licence evidence.
    criteria:
      - id: kdp-0b-common-critical
        description: Demonstrate all retained project-ending common technologies as representative systems or subsystems.
        metric: Performance agrees with predictions in defined relevant environments with validated scale and duration extrapolation.
        threshold: TRL 6 for every project-ending assessed object; no waivers.
        technologies: [T01, T02, T03, T04, T05, T08, T10, T14, T15, T16, T19, T21, T22, T24]
        trl_required: 6
        evidence_from: [rq-0-62, rq-0-54, rq-0-51, rq-0-26, rq-0-41, pathfinder and relevant-environment subsystem demonstrations]
      - id: kdp-0b-production-route
        description: Demonstrate at least one complete Fe-Ni production route without transferring credit between incompatible routes.
        metric: Representative feed-to-qualified-product performance including recovery, throughput, reagent losses and waste.
        threshold: At least one complete selected route reaches TRL 6; assess T06, T17, T07 and T23 separately.
        technologies: [T05, T06, T07, T17, T22, T23]
        trl_required: 6
        evidence_from: [rq-0-56, rq-0-11, selected-route relevant-environment demonstration]
      - id: kdp-0b-selected-support
        description: Demonstrate the selected power-distribution, storage, handling and navigation implementations.
        metric: Performance at representative voltage, energy, cargo inertia, operating environment and fault conditions.
        threshold: TRL 6 for selected implementations; substitutions require reassessment.
        technologies: [T09, T12, T20, T25]
        trl_required: 6
        evidence_from: [rq-0-60, rq-0-59, relevant-environment support-system demonstrations]
      - id: kdp-0b-prospecting-technology
        description: Validate sampling and assay technology maturity separately from the resource decision.
        metric: Documented representative subsystem demonstration with controlled sampling and assay errors.
        threshold: TRL 6 minimum for technology dependence; actual scout launch qualification remains TRL 8.
        technologies: [T11, T18]
        trl_required: 6
        evidence_from: [rq-0-50, scout subsystem demonstrations, sampling and assay validation]
      - id: kdp-0b-command
        description: Demonstrate the integrated production communications and authenticated command service.
        metric: End-to-end delay, outage, key lifecycle, fleet recovery and capacity results agree with predictions.
        threshold: TRL 6 integrated service; component heritage is reported separately.
        technologies: [T26]
        trl_required: 6
        evidence_from: [rq-0-64, relevant-environment command-service demonstration]
      - id: kdp-0b-four-gates
        description: Require all four independent discriminating gates to pass for the same production configuration.
        metric: Signed target, demand, economics and licence decisions reference a common scope and evidence baseline.
        threshold: g-target AND g-demand AND g-economics AND g-licence passed.
        technologies: []
        trl_required: null
        evidence_from: [rq-0-50, rq-0-58, rq-0-61, rq-0-41, signed discriminating-gate decisions]
      - id: kdp-0b-integration
        description: Close the integrated production and transport design at the approved demand-sized scale.
        metric: Mass, power, thermal, reliability, maintenance, consumables, logistics, cost and schedule balances with explicit reserves.
        threshold: Approved closure and reserve policy set before final review; no unresolved project-ending assumptions.
        technologies: [T01, T02, T03, T04, T05, T08, T10, T14, T15, T16, T19, T21, T22, T24, T26]
        trl_required: null
        evidence_from: [rq-0-62, rq-0-63, rq-0-52, rq-0-61, integrated design and test-validation dossier]
    pass: Authorise scoped 0B detailed implementation and procurement within the accepted resource, demand, economics and licence envelope.
    fail: No production commitment; approve only an explicit bounded extension or select 0A only, Earth supply.

  - id: g-water-pilot
    name: Optional C-type water-pilot release
    type: review
    month: { min: 72, max: 180 }
    purpose: Authorise a water pilot only if independently justified without making production propellant a Phase 0 dependency.
    criteria:
      - id: water-pilot-readiness
        description: Demonstrate extraction, capture, purification and containment for the selected C-type feed and pilot design.
        metric: Water yield, purity, energy, losses and scale-up validation supporting the selected 10-100 t/year pilot.
        threshold: TRL 6 before operational pilot commitment; applicable only if the pilot is retained.
        technologies: [T13]
        trl_required: 6
        evidence_from: [rq-0-27, rq-0-33, rq-0-40, representative-feed water-pilot tests]
    pass: Authorise the separately budgeted pilot without production LOX/LH2 infrastructure.
    fail: Drop or defer the pilot without blocking an otherwise qualified Fe-Ni production programme.

retired: [gate-1, gate-2, gate-3, gate-4, gate-5]
```
