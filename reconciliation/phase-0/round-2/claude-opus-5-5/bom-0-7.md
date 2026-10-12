---
phase: phase-0
item: bom-0-7
round: 2
type: reassessment
modelId: claude-opus-5-5
modelName: "Claude Opus 5.5"
endpoint: databricks-claude-opus-5-5
findings: b907d2fc76f4
priorRound: 1
framework: 18f503fe4ec6
generated: 2026-10-12T09:44:49.423Z
seconds: 240.393
---

# bom-0-7 Organizational Infrastructure: Round 2 Re-assessment

**Reviewer stance.** I agree with the previous round on most of the direction. I disagree with it on four specifics:

- **Liability insurance.** Two of the three panellists overstate it.
- **Cost comparison.** It failed because the panel used three different durations. The fix is to express the cost as an annual run-rate.
- **Launch line.** Its value is unsupported, and is probably low by up to an order of magnitude once a mass estimate is made.
- **Severity.** "Minor vs major" conflates cost severity with schedule severity.

All legal citations below are from my own knowledge and are flagged where they need counsel verification.

---

## 1. Findings

### P0-F13: Organizational infrastructure has no specification at all

**Verdict: agree.** I would split the severity rating into two:

- **Cost severity: minor.** The plausible range for this item is about $50–200M over 10 years. That is 0.3–1.3% of the ~$15.7B phase, so no realistic error here moves the phase total much.
  - Phase hardware sum: 0.16 + 1.0 + 10.0 + 2.0 + 0.5 + 2.0 + 0.05 = **$15.71B**.
- **Schedule severity: major.** Every flight item (bom-0-1 to bom-0-6) needs four things before it flies, and nothing else in the BOM provides them:
  - an authorizing state under Outer Space Treaty (OST) Art. VI;
  - UN registration under the Registration Convention;
  - ITU frequency filings;
  - a planetary-protection categorization.

**Lead times show why this is on the critical path:**

- **ITU non-GSO filings.** Advance publication can be lodged up to 7 years before bringing into use, and coordination commonly takes 2 or more years.
- **FAA Part 450 launch licences.** These have a 180-day statutory review clock, after pre-application consultation.
- **Novel-activity mission authorization.** Asteroid mining is novel, and some states, notably the US, have no settled mission-authorization path for it (*legal claim, verify*).

**Cost of delay (CD3 framing).** The function is cheap and the cost of delaying it is large.

- If the $15.7B is spent over roughly 10 years, the programme burns about $1.6B/yr.
- A one-year authorization slip that idles a standing workforce costs, at an assumed 5–10% of annual spend, **about $80–160M per year of delay**.
- That is 10–30× the annual cost of the function (§2).
- Underfunding it is therefore a bad trade, regardless of the stage argument GPT made.

**Proposed change:**

- Write the spec (§2).
- Set the severity label to "major (schedule) / minor (cost)" so reviewers stop arguing past each other.

### P0-F15: Eight of nine concluded deliberations were never written back (as applied to bom-0-7)

**Verdict: partly.**

- **Agreed:** rq-0-29 has not been written back. It is the only deliberation that directly specifies this item.
- **Cannot verify** the repository-wide "eight of nine" count from the material provided. I side with GPT on this.
- **Mechanical write-back is wrong for rq-0-29.** That conclusion was designed for a volunteer community. Its review triggers are 100 contributors and **$50K** of external funding. The BOM, by contrast, is a $15.7B professional programme. Writing rq-0-29 back verbatim would create a spec whose scale assumptions are off by about 5 orders of magnitude ($50K vs $15.7B, a ratio of ~3×10⁵). Write-back must be adapted, not copied.

**Disposition of each deliberation for bom-0-7 only.** No deliberation changes this item's mass or power. Several change its workload.

| Deliberation | Effect on bom-0-7 | Revised value |
|---|---|---|
| rq-0-29 governance | Adopt the governance shell. Adapt the review triggers to programme scale. Defer the Charter Trust (§2). | See §2 |
| rq-0-14 propellant in Phase 0B at ≥25 kt/yr | Resource-rights workstream: legal opinions in at least one resource-law state. Candidates: US CSLCA 2015 (51 USC §51303), Luxembourg law of 20 Jul 2017, UAE Federal Law 12/2019, Japan 2021 Space Resources Act. | $3–10M one-time plus 1–2 FTE |
| rq-0-18 human-rating of tugs | Bom-0-7 must hold the safety-authority *independence* function (it reports to governance, not to the programme). If crew are ever carried, add a 14 CFR Part 460 compliance path. The baseline should state that no crew carriage is authorized in Phase 0. | 1–2 FTE (part of the review board) |
| rq-0-28 ISRU cost methodology | An independent cost-estimate function reporting to governance, not to the programme. | 1–2 FTE |
| rq-0-11 gravity zones | Rotating structures add conjunction and safety review content only. The round-1 check holds: 1.50 rpm at 0.05 g and 2.59 rpm at 0.15 g on r = 20 m (ω = √(g/r)). | none |
| rq-0-30, -47, -48 (cryogenic boil-off, sunshield, MLI degradation) | No effect beyond technical review authority. | none |

**GPT's illustrative calculations are confirmed:**

- **Electrolysis of 25 kt/yr water:**
  - Flow: 25×10⁶ kg ÷ 3.156×10⁷ s = 0.79 kg/s.
  - Power: 0.79 kg/s × 15.9 MJ/kg = 12.6 MW at theoretical minimum, or 16–21 MW at 60–80% efficiency.
- **Electrolysis if "25 kt/yr" means hydrogen:**
  - Power: 0.79 kg/s × 142 MJ/kg = 112 MW at theoretical minimum, or 140–190 MW at the same efficiencies.
  - That alone exceeds the 100 MW of bom-0-5.
- **Boil-off at 1 kW heat leak:**
  - Heat per day: 86.4 MJ.
  - LH₂ (latent heat 446 kJ/kg): 86.4 MJ ÷ 446 kJ/kg ≈ 194 kg/day.
  - LOX (latent heat 213 kJ/kg): 86.4 MJ ÷ 213 kJ/kg ≈ 406 kg/day.

These are not bom-0-7 matters. They should go to a phase power-allocation closure.

**Proposed change:**

- Write rq-0-29 back in adapted form.
- Add the four review and authority functions above to bom-0-7.
- Require a disposition register for every deliberation, as GPT proposed.

---

## 2. Revised specification

**Scope boundary (proposed).** bom-0-7 covers:

- governance;
- legal, regulatory, licensing and export control;
- independent cost and safety review;
- records and the knowledge archive;
- corporate insurances and third-party liability (TPL) premiums.

bom-0-7 **excludes**:

- PM/SE/MA;
- mission operations and the ground segment;
- launch;
- property insurance and retained risk;
- the endowment.

**Cost is specified as an annual run-rate plus one-time costs.** This removes the 5-yr vs 10-yr confusion that blocked round 1.

### Cost build (estimate)

**Staffing**

| Function | FTE |
|---|---|
| Governance and administration | 4–6 |
| Legal, regulatory and licensing | 4–8 |
| Export control | 2–4 |
| Records and knowledge | 2–3 |
| Independent cost and safety review | 2–4 |
| **Total** | **14–25** |

- Fully burdened rate: **$200–350k per FTE** (CH, LU and US mix; judgement).
- Staff cost: $2.8–8.8M/yr.

**Other annual costs**

| Line | Annual cost | Basis |
|---|---|---|
| Outside counsel | $1–4M/yr | 1,000–3,000 h at $500–1,300/h |
| Filings and fees (ITU cost recovery, national licences, registration) | $0.1–0.5M/yr | estimate |
| Insurance: D&O, general liability, in-orbit TPL premiums | $0.3–2M/yr | see below |
| IT and archive | $0.2–1M/yr | see below |

**Totals**

- **Run-rate: $4.4–16.3M/yr.**
- **One-time: $2–8M.** Covers entity formation, the legal-architecture study, licence drafting, export classification, and resource-rights opinions.

### Why TPL is smaller than round 1 assumed

- **Launch-phase TPL** is carried under the *launch provider's* licence. In the US this is the FAA maximum probable loss (MPL) requirement, with government payment of excess claims under 51 USC §50915 (*verify*).
- **Deep-space operations carry little third-party exposure.**
  - Liability Convention Art. II makes liability absolute only for damage on Earth's surface or to aircraft.
  - Art. III applies a fault standard in space.
  - The ~1 AU asteroid operations have essentially no third parties to damage.
- **Residual exposure** is limited to LEO and transfer phases and any Earth-approach trajectories.
- **Typical in-orbit TPL premiums** are tens to low hundreds of $k per year per policy for €60–100M limits. This is estimated; I have no broker quote.
- **Conclusion.** Claude's $15–120M and Gemini's $75M reserve are too high for in-orbit TPL. **$3–20M over 10 years is my estimate.**
- **Exception.** If bom-0-4 brings mined material toward Earth, this changes sharply and needs re-assessment.

### Archive sizing

- **Governance records:**
  - Meeting video: 500–1,000 h/yr at ~1 GB/h ≈ 0.5–1 TB/yr.
  - Documents: <0.1 TB/yr.
- **Engineering PDM/CAD/simulation:** 10–100 TB/yr. This belongs to PM/SE, but the archive should mirror it.
- **Storage cost:**
  - Volume: 100 TB × 3 replicas ≈ 300 TB stored.
  - At ~$20/TB-month cloud pricing, 300 TB × $20 × 12 ≈ $72k/yr.
  - Labour, restore testing and provenance dominate. GPT is right on this point. Gemini's 10 Gbps backbone and five-zone vault is over-specified for Phase 0.

### Specification table

| Parameter | Old | New (range) | Basis | Confidence |
|---|---|---|---|---|
| Cost, annual run-rate | unspecified | $9M/yr ($4.4–16.3M) | calculation from judgement inputs | low–medium |
| Cost, one-time | unspecified | $5M ($2–8M) | judgement | low |
| Cost, 10-yr total incl. 20% contingency | $50M | $110M ($55–200M) | calculation | low |
| Cost, 5-yr total incl. 20% contingency | $50M | $55M ($29–108M) | calculation | low |
| Staff | unspecified | 18 FTE (14–25) | judgement | medium |
| Legal entities in Phase 0 | 1 | 2 (2–3): Swiss Verein (ZGB Art. 60 ff.) plus a licence-holding operating entity in a resource-law state, with Luxembourg or US the lead candidates | literature + judgement | medium |
| Stewardship Council | unspecified | 7 (5–9), staggered 3–4 yr terms, 8-yr service limit | judgement | medium |
| Charter Trust | (rq-0-29: 15-yr terms, ≥5 jurisdictions) | Phase 0 deliverable is a *design study only*; establishment at a milestone | judgement | medium |
| Sortition use in Phase 0 | rq-0-29: Charter Trustees | Advisory/oversight panels only | judgement (evidence base is deliberative mini-publics, not asset-holding trusts) | low |
| Governance review triggers | 100 contributors / $50K / first prototype | Add programme-scale triggers: entity first holds a licence; first contract >$10M; first launch; Phase 0B start | judgement | medium |
| Liquidity reserve | 5 yr opex | 1–2 yr opex initially (~$9–30M), 5 yr as later target; accounted as financing | judgement | medium |
| Funding caps (donor ≤15%, government ≤25%) | applies to "organization" | Apply to Entity A (Verein) only. Allow disclosed, time-limited exceptions. No donor control over safety or review functions. | judgement | medium |
| Specification licence | bespoke copyleft | CERN OHL v2-S for hardware; CC BY-SA 4.0 for documents; plus a restricted annex for export-controlled data | literature | medium |
| Leadership overlap | mandatory 12 months | 3–12 months, documented handover required | judgement | medium |
| Mass / propellant / orbital power | n/a | 0 / 0 / 0 | definition | high |
| Archive ingest (governance) | unspecified | 1 TB/yr (0.5–5), 3 replicas, annual restore test | calculation | medium |

### Export control and copyleft

- Spacecraft hardware and technical data sit in **ITAR USML Category XV** or **EAR 9A515** (*verify*).
- "Published" information can fall outside both regimes (15 CFR 734.7; ITAR public-domain definition). However, the *initial act of publishing* controlled data can itself require authorization.
- Copyleft-from-day-one therefore needs export classification *before* publication, not after.
- This is a binding constraint on rq-0-29's "planned fragmentation" principle.

---

## 3. Interfaces

| With | Flow | Value | In BOM? |
|---|---|---|---|
| bom-0-1 (32 sats) | data/other: UN registration, ITU filings, national licences, debris-mitigation plans, TPL | ~32 registrations; 1–3 ITU network filings; 1 licence campaign | false (no owner) |
| bom-0-2 (robots) | other: resource-rights opinion, PP categorization (expected COSPAR Cat I/II, assessed by a national agency, not "filed with COSPAR") | 1 assessment per target body | false |
| bom-0-3 (station) | other: authorization, registration, risk-retention decision | ~$10B asset exceeds the ~$0.5–0.75B per-risk market capacity (estimate) | false |
| bom-0-4 (tugs) | other: trajectory and Earth-approach review, TPL triggers, crew prohibition | 0 crew in baseline | false |
| bom-0-5 (power) | power | 0 MW orbital; 0.01–0.05 MW terrestrial (offices and IT, not from bom-0-5) | n/a |
| bom-0-6 (ISRU) | other: resource-rights authorization; independent cost review (rq-0-28) | 1 review per design milestone | false |
| all flight items | data: Decision Journal plus engineering archive mirror | 1–5 TB/yr governance; 10–100 TB/yr mirrored engineering | false |
| ground segment (missing) | data: spectrum coordination for deep-space bands (X 8.4 GHz, Ka 32 GHz Category B) | — | false |

---

## 4. Missing items or scope

**PM/SE/MA.** Agree it is missing.

- **Estimate:** $1.5–3.5B, which is 10–22% of hardware (judgement; NASA flight-project "wraps" are often 15–30%, lower for large repeated units).
- **Condition:** this is conditional on a WBS dictionary confirming hardware prices exclude it.
- **Not in bom-0-7.** It must not be placed in bom-0-7, which would mix governance with execution.

**Launch.** Claude's $2–8B is unsupported. A rough mass estimate (mine, low confidence):

| Item | Mass estimate |
|---|---|
| 32 satellites × 100–500 kg | 3–16 t |
| 20 robots × 1–10 t | 20–200 t |
| Station | 100–2,000 t |
| 15 tugs × 5–30 t | 75–450 t |
| 100 MW arrays at 7–10 kg/kW (ROSA-class ~100–150 W/kg) | 700–1,000 t |
| **Total delivered to LEO, before escape propellant** | **~0.9–3.7 kt** |

- At $1.5–5k/kg to LEO: **~$1.4–18B**.
- Escape and transfer propellant could add another 1–2×.
- **Range: $2–20B, low confidence.**
- A phase mass budget is the prerequisite. The solar array alone may be the largest launch driver.

**Other missing lines**

- **Mission operations and ground segment (including deep-space comm):** $0.5–1.5B. Agree with Claude, low confidence.
- **Risk retention / self-insurance reserve:** keep as a financing line, sized only after broker indications. I would not put a number on it yet. Claude's $0.3–1.5B is a placeholder at best.
- **Endowment / liquidity reserve:** financing, not cost. Show it separately.

---

## 5. Remaining disagreements and open questions

- **Jurisdiction of the operating entity.**
  - Luxembourg has a mission-authorization regime for resource activities under its 2017 law.
  - The US has resource rights but an unsettled path for authorizing novel activities.
  - Switzerland, as far as I know, has no comprehensive space act in force; a draft is in progress (*verify*).
  - This favours Luxembourg (or Japan) for the licence holder, but legal opinion decides it.
- **Whether independent safety and cost review belongs in bom-0-7 or in PM/SE.**
  - In bom-0-7, it is independent of the programme.
  - In PM/SE, it is embedded in the programme.
  - This is a values trade-off, not a fact to settle: independence versus integration and speed.
- **Phase split.** Should the volunteer research and governance stage be a separate phase from the professional programme? I lean yes; reasonable people differ.
- **Earth approach.** Does any Phase 0 trajectory bring mined material to Earth or cislunar space? This flips the TPL and planetary-protection analysis.
- **The commitment problem from rq-0-29.** It remains unresolved and is not an engineering quantity.

---

## 6. Decision-quality critique

**Methods used:**

- the Composite Scaffold for each decision;
- **ACH** for D1 (cost);
- **QOC** for D3 (jurisdiction);
- **GRADE EtD** for D4 (Charter Trust/sortition);
- **CD3/real options** for D2 and D4 timing.

Likelihood and confidence are stated separately (IPCC style).

### Decision A: bom-0-7 cost (D1, B1a/b/c)

1. **Frame.** A property decision on an existence decision that was never framed: the scope boundary. It is reversible, since budget lines are re-baselined annually. The problem is *complicated* (knowable by estimation), not complex.
2. **Criteria (should come first).** Coverage of authorization-critical functions (weight 0.4); estimate defensibility (0.3); comparability across lines (0.2); low phase cost impact (0.1).
3. **Options.**
   - Keep $50M (GPT).
   - $150M with a reserve (Gemini).
   - $160M broad scope (Claude).
   - A run-rate with an explicit scope boundary (this review).
   - The null option: leave unspecified (rejected; fails the coverage criterion).
4. **Matrix.**
   - The three round-1 options score differently mainly because of *scope and duration*, not estimation.
   - The run-rate option dominates on comparability.
5. **Sensitivity vs trade-off.**
   - Duration and FTE rate are **sensitivity points**: cost scales linearly with each.
   - Insurance inclusion is a scope sensitivity point.
   - No real trade-off point exists here, which is why it should be settled by definition, not debate.
6. **Certainty.** Staff cost is medium confidence. TPL is low (no broker data).
7. **ACH hypotheses:**
   - H1: the line is underfunded.
   - H2: the line is adequate, and the gap is scope creep from PM/SE and insurance.
   - H3: hardware prices already include these functions.
   - The evidence (scope lists, the 5-vs-10-year baselines, and the absence of a WBS) disconfirms H1 *as stated* least well. H2 is least disconfirmed. H3 is untested.
   - Falsification test: a WBS dictionary for bom-0-1 to bom-0-6.
8. **Decision (Y-statement).** In the context of a $15.7B phase with no ops or PM lines, facing three non-comparable estimates, specify bom-0-7 as $4.4–16.3M/yr plus $2–8M one-time with an explicit exclusion list. This makes estimates comparable, accepting that the 10-yr total ($55–200M) remains wide.
9. **Consequences.** It forces the PM/SE, ops and insurance existence decisions onto other lines.
   - **Weakest DQ link: frame.** Round 1 debated numbers before fixing scope and duration.
   - **Likelihood** the 10-yr cost exceeds $50M: *likely* (≈70–85%). **Confidence:** medium.

### Decision B: Severity of P0-F13 (D2)

1. **Frame.** An executive (prioritization) decision. Fully reversible.
2. **Criteria.** Schedule risk to flight items; cost impact; reviewer attention.
3. **Options.** Minor; major; stage-dependent (GPT); split label (this review).
4. **Matrix.** The split label is the only option that is accurate on both cost and schedule.
5. **Trade-off point?** No. The disagreement came from using one label for two attributes, schedule and cost, that point in opposite directions.
6. **Certainty.** Authorization lead times are medium-to-high confidence (ITU and FAA rules are published).
7. **Key assumption:** the programme intends to fly within ~5–7 years of formation.
   - Falsifier: an approved schedule showing first launch more than 7 years out. That would make GPT's stage-dependent label adequate.
8. **Decision.** Major (schedule) / minor (cost), warranted by CD3: delay costs ~$80–160M/yr against a $4–16M/yr function.
9. **Consequences.** Licensing work starts before hardware design freeze.
   - **Weakest DQ link: values.** Nobody stated what "severity" measures.
   - **Likelihood** authorization becomes critical path if unstaffed: *likely* (≈65–80%). **Confidence:** medium.

### Decision C: Entity structure and jurisdiction (A2, D3). QOC used.

1. **Frame.** An existence decision. Hard to reverse: re-domiciling a licence holder is slow and may need state consent.
2. **Criteria (QOC):** (a) resource-rights statute; (b) mission-authorization path for novel activities; (c) export-control friction; (d) neutrality and legitimacy; (e) launch-state proximity.
3. **Options.** Single Swiss Verein; Verein plus a Luxembourg operator; Verein plus a US operator; multi-state subsidiaries (Gemini).
4. **Matrix (judgement):**
   - The single Verein fails (a) and (b).
   - Luxembourg scores well on (a), (b) and (d), and is weaker on (e).
   - The US scores well on (a) and (e), but is weaker on (b), (c) and (d).
   - Multi-state hedges everything, but scores poorly on cost and complexity.
5. **Trade-off point.** US versus Luxembourg trades launch and industrial access against neutrality and authorization clarity. This is **a values question**, not resolvable by more facts beyond the legal opinion.
6. **Certainty.** Statute existence is medium-high. Their applicability to this activity is low (unverified).
7. **Key assumption:** a Verein can control a licensed operator without the authorizing state treating the Verein as the de facto operator.
   - Falsifier: a counsel opinion from the candidate state's regulator.
8. **Decision.** Two entities: the Verein for governance, plus an operator in a resource-law state. Defer the choice of state to the legal study. Accepted downside: 12 months before the operator exists.
9. **Consequences.** Constrains the funding-cap scope and the export-control posture.
   - **Weakest DQ link: information.** No legal citation was verified.
   - **Likelihood** that a two-entity structure is required: *very likely* (>90%). **Confidence:** medium.

### Decision D: Charter Trust, sortition, 15-yr terms (D4). GRADE EtD used.

1. **Frame.** A property decision on a governance existence decision. Effectively a one-way door once assets and trustees are installed.
2. **Criteria (GRADE EtD):** capture resistance (benefit); loss of competence and accountability (harm); certainty of evidence; values; resource use; acceptability; feasibility.
3. **Options.**
   - Establish now (Gemini): 15 trustees, 15-yr terms.
   - Board of 5–7 with 3–4-yr terms; sortition advisory only (GPT).
   - Study now, establish at a milestone (Claude and this review).
4. **Matrix.**
   - The evidence for sortition comes from citizens' assemblies, which are short-lived deliberative bodies. It does not come from fiduciary trusts holding assets over decades. This is indirect evidence, so certainty is **low**.
   - Feasibility of five jurisdictions in Phase 0 is low.
   - Gemini's "high, literature" label is not supported and should be **low**.
5. **Trade-off point.** Term length trades capture resistance (longer is better) against accountability and competence drift (shorter is better). This is a **values question**.
6. **Certainty.** Low for the 15-yr/15-seat specifics. Moderate that some anti-capture mechanism is needed.
7. **Key assumption:** capture is the dominant failure mode in Phase 0.
   - Falsifier: the rq-0-29 action-5 persistence study. If irrelevance and funding collapse dominate early failures, the Trust is premature.
8. **Decision.** Study now. Use sortition for advisory panels. Real-options value: deferring 3–5 years costs little (no assets are at risk yet) and buys evidence.
9. **Consequences.** It unlocks the constitutional-convention design question (rq-0-29 open question 3).
   - **Weakest DQ link: information.** Evidence quality was mislabelled.
   - **Likelihood** the 15-yr/15-seat design is optimal: *unlikely* (≈15–30%). **Confidence:** low.

### Decision E: Insurance placement (D8, B6)

1. **Frame.** A scope decision. Reversible.
2. **Criteria.** Legal compliance; capital efficiency; insurability.
3. **Options.**
   - TPL in bom-0-7 (Claude).
   - Reserve in bom-0-7 (Gemini).
   - Everything outside pending quotes (GPT).
   - Premiums in bom-0-7 and retained risk as a separate financing line (this review).
4. **Matrix.** The physics and law of the Liability Convention (absolute on Earth, fault-based in space) show that the deep-space third-party exposure assumed in round 1 is near zero.
5. **Sensitivity point.** Whether any trajectory approaches Earth. This single assumption moves TPL by about 10× or more.
6. **Certainty.** Medium on the legal structure. Low on premium levels.
7. **Key assumption:** launch TPL sits with the launch provider.
   - Falsifier: the launch contract terms and the FAA licence holder of record.
8. **Decision.** $3–20M over 10 yr inside bom-0-7. Retained risk on the ~$10B station handled as a separate financing line. Accepted downside: uninsured property loss.
9. **Consequences.** It forces a programme-level risk-appetite decision.
   - **Weakest DQ link: reasoning.** Round 1 treated launch, in-orbit and deep-space liability as one exposure.
   - **Likelihood** that round-1 TPL figures are overstated: *likely* (≈70%). **Confidence:** medium-low.

### Decision F: PM/SE and launch BOM additions (B3, B4)

1. **Frame.** An existence decision on new lines. Reversible.
2. **Criteria.** Completeness of the phase cost; traceability of each estimate.
3. **Options.** Add with values; add unsized; do not add.
4. **Matrix.** Adding with traceable values best meets both criteria. The B4 value is not traceable.
5. **Sensitivity points.** PM/SE percentage (±$1B) and launch $/kg × mass (±$10B). Launch is the dominant sensitivity of the whole phase, and no one has a mass budget.
6. **Certainty.** Low for both.
7. **Key assumption:** hardware prices exclude PM/SE and launch.
   - Falsifier: a WBS dictionary.
8. **Decision.** Add both. Size launch at $2–20B pending a mass budget, rather than Claude's untraceable $2–8B.
9. **Consequences.** The phase total likely becomes about $20–40B, not $15.7B.
   - **Weakest DQ link: alternatives.** Round 1 never considered that launch could exceed the hardware cost.
   - **Likelihood** launch exceeds $8B: *about as likely as not* (≈40–60%). **Confidence:** low.

---

```yaml
item: bom-0-7
model: Claude (Anthropic), round-2 reviewer
findings:
  - id: P0-F13
    verdict: agree
    summary: No specification exists; the gap is minor in cost (0.3-1.3% of a $15.7B phase) but major in schedule because authorization, registration, ITU and planetary-protection functions gate every flight item.
    proposed_change: Write the spec as an annual run-rate with explicit scope exclusions and relabel severity as major-schedule/minor-cost.
  - id: P0-F15
    verdict: partly
    summary: rq-0-29 is not written back, but must be adapted from a $50K volunteer scale to a $15.7B programme rather than copied, and the repository-wide eight-of-nine count is unverified here.
    proposed_change: Write back rq-0-29 in adapted form and add resource-rights, independent cost-review and independent safety-authority functions from rq-0-14, rq-0-28 and rq-0-18, with a disposition register for all deliberations.
revised_spec:
  - parameter: annual_run_rate_cost
    old: unspecified
    new: 9000000
    range: [4400000, 16300000]
    unit: USD/yr
    basis: calculation
    confidence: low
  - parameter: one_time_cost
    old: unspecified
    new: 5000000
    range: [2000000, 8000000]
    unit: USD
    basis: judgement
    confidence: low
  - parameter: ten_year_total_incl_20pct_contingency
    old: 50000000
    new: 110000000
    range: [55000000, 200000000]
    unit: USD
    basis: calculation
    confidence: low
  - parameter: staff
    old: unspecified
    new: 18
    range: [14, 25]
    unit: FTE
    basis: judgement
    confidence: medium
  - parameter: legal_entities_phase0
    old: 1
    new: 2
    range: [2, 3]
    unit: entities
    basis: judgement
    confidence: medium
  - parameter: stewardship_council_size
    old: 5-7
    new: 7
    range: [5, 9]
    unit: members
    basis: judgement
    confidence: medium
  - parameter: council_term
    old: 3
    new: 3.5
    range: [3, 4]
    unit: yr (staggered, 8 yr service limit)
    basis: judgement
    confidence: medium
  - parameter: charter_trust_term
    old: 15
    new: deferred to design study
    range: [6, 15]
    unit: yr
    basis: judgement
    confidence: low
  - parameter: in_orbit_TPL_premiums_10yr
    old: unspecified
    new: 8000000
    range: [3000000, 20000000]
    unit: USD
    basis: judgement
    confidence: low
  - parameter: liquidity_reserve_initial
    old: 5 yr opex
    new: 1.5
    range: [1, 2]
    unit: yr opex (financing, not cost)
    basis: judgement
    confidence: medium
  - parameter: governance_archive_ingest
    old: unspecified
    new: 1
    range: [0.5, 5]
    unit: TB/yr
    basis: calculation
    confidence: medium
  - parameter: orbital_mass_power_propellant
    old: unspecified
    new: 0
    range: [0, 0]
    unit: t/yr, MW, t/yr
    basis: calculation
    confidence: high
interfaces:
  - with: bom-0-1
    flow: data
    value: 32 UN registrations, 1-3 ITU network filings, licence and debris-mitigation dossiers
    in_bom: false
  - with: bom-0-2
    flow: other
    value: 1 planetary-protection categorization and resource-rights opinion per target body
    in_bom: false
  - with: bom-0-3
    flow: other
    value: authorization, registration and risk-retention decision for ~$10B asset
    in_bom: false
  - with: bom-0-4
    flow: other
    value: trajectory/Earth-approach review; 0 crew authorized
    in_bom: false
  - with: bom-0-5
    flow: power
    value: 0 MW orbital (0.01-0.05 MW terrestrial, not from bom-0-5)
    in_bom: true
  - with: bom-0-6
    flow: other
    value: resource-rights authorization and independent cost review per design milestone
    in_bom: false
  - with: phase
    flow: data
    value: 1-5 TB/yr governance archive plus 10-100 TB/yr mirrored engineering data
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-7
    quantity: 1
    unit_cost_usd: [55000000, 200000000]
    rationale: 10-yr equivalent of a $4.4-16.3M/yr run-rate plus $2-8M one-time and 20% contingency, with PM/SE, ops, launch, property insurance and reserves excluded.
  - action: split
    item: Organizational liquidity reserve (financing)
    quantity: 1
    unit_cost_usd: [9000000, 30000000]
    rationale: 1-2 yr of bom-0-7 opex held as financing rather than expenditure.
  - action: add
    item: Program management, systems engineering and mission assurance
    quantity: 1
    unit_cost_usd: [1500000000, 3500000000]
    rationale: 10-22% of hardware, conditional on a WBS dictionary confirming hardware prices exclude it.
  - action: add
    item: Launch and transport to operating site
    quantity: 1
    unit_cost_usd: [2000000000, 20000000000]
    rationale: Estimated 0.9-3.7 kt to LEO (100 MW arrays alone ~0.7-1 kt) at $1.5-5k/kg plus escape propellant; requires a phase mass budget.
  - action: add
    item: Mission operations and ground segment
    quantity: 1
    unit_cost_usd: [500000000, 1500000000]
    rationale: No line covers operations, deep-space communications or spectrum use.
  - action: add
    item: Risk retention / self-insurance reserve (financing)
    quantity: 1
    unit_cost_usd: [0, 1500000000]
    rationale: The ~$10B station exceeds per-risk market capacity; size only after broker indications.
open_questions:
  - Which state authorizes the operating entity (Luxembourg, US, Japan, other), and can a Swiss Verein control it without being treated as the de facto operator?
  - Does any Phase 0 trajectory bring mined material toward Earth or cislunar space, which would change TPL and planetary-protection exposure by an order of magnitude?
  - Do bom-0-1 to bom-0-6 unit costs include PM/SE, launch and operations (WBS dictionary needed)?
  - What is the phase mass budget, given that 100 MW of arrays alone may be ~0.7-1 kt to LEO?
  - Does independent safety and cost review sit in bom-0-7 (independence) or in PM/SE (integration)? This is a values trade-off.
  - Does "25 kt/yr" in rq-0-14 mean water or hydrogen? Hydrogen would need 140-190 MW against a 100 MW supply.
  - Which representative specs are ITAR/EAR-controlled, and what restricted annex does copyleft publication require?
  - What evidence supports sortition and long terms for asset-holding trusts, as opposed to deliberative assemblies?
```
