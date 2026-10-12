---
phase: phase-0
item: bom-0-7
round: 2
type: reassessment
modelId: gpt-6-1-sol
modelName: "GPT-6.1 Sol"
endpoint: databricks-gpt-6-1-sol
findings: b907d2fc76f4
priorRound: 1
framework: 18f503fe4ec6
generated: 2026-10-12T09:44:49.427Z
seconds: 227.76
---

# Re-assessment: bom-0-7 Organizational Infrastructure

**Recommendation:** Replace the undefined $50M line with a **ten-year organizational-services planning allowance of approximately $65M, range $40–105M, in constant 2026 USD**. This excludes flight operations, program-wide systems engineering, launch services, flight insurance premiums, retained-loss funding and an endowment. Those exclusions require explicit owners and separate cost accounts.

The organization should be a **governance association plus a legally accountable operating entity**, not a volunteer council attempting to act as spacecraft operator. Multi-century governance is an objective to preserve future options—not a capability that Phase 0 can demonstrate.

**Evidence boundary:** The supplied material contains rq-0-29, summaries of the other deliberations, and the previous reconciliation. It does not contain the repository, the complete eight other deliberations, mission profiles or insurance quotations. I can verify arithmetic and assess the proposed architecture; I cannot independently verify the repository-wide write-back count or manufacture replacement spacecraft masses from these excerpts.

## 1. Findings

### P0-F13 — Organizational infrastructure has no specification

**Verdict: agree. Severity: major for the hardware-development phase; minor only for a discussion community.**

The supplied record explicitly says no specification exists. rq-0-29 provides useful governance intentions, but not an executable organization specification.

The phase hardware subtotal is:

\[
160+1{,}000+10{,}000+2{,}000+500+2{,}000
=15{,}660\ \text{million USD}.
\]

The current organizational allowance represents:

\[
\frac{\$50\text{M}}{\$15{,}660\text{M}}=0.32\%.
\]

That ratio **neither proves inadequacy nor validates adequacy**. The missing scope, duration and allocation of responsibilities are the actual defects. Generic overhead percentages cannot resolve them.

The omission becomes blocking before flight procurement because:

- Non-governmental space activities require authorization and continuing supervision by the appropriate State under **Outer Space Treaty Article VI**.
- Registration and international liability involve States; creating a Swiss association does not discharge those obligations.
- Contracts, employment, export compliance, spectrum use, safety decisions and insurance require accountable legal persons and named authorities.
- Volunteer governance cannot override an operator’s statutory duties or a safety stop.

**Proposed change:** Adopt the specification below, with stage-specific formation, procurement and flight gates. Do not adopt rq-0-29’s unsupported claims that sortition is the “strongest” anti-capture mechanism or that a five-jurisdiction trust is necessary in Phase 0.

---

### P0-F15 — Eight concluded deliberations were not written back

**Verdict: partly.**

I agree that **rq-0-29 is not implemented in bom-0-7**. The excerpts also support a serious requirements-management gap. I cannot verify “eight of nine” across the repository, and a concluded discussion is not automatically a physically valid or approved requirement.

The correction is a **controlled disposition process**, not verbatim incorporation. Each conclusion needs an owner, evidence, affected requirements, interface changes, cost consequences and approval or rejection with rationale.

#### Per-deliberation disposition

| Deliberation | Change required in bom-0-7 | Technical disposition elsewhere in the phase |
|---|---|---|
| **rq-0-26 — excavation** | Verify that its incorporation includes traceable requirements and interface ownership. | Reportedly incorporated; not independently checked here. Torque balance does not eliminate reaction forces, anchoring requirements or transient torque. |
| **rq-0-11 — hybrid gravity zones** | Require a reviewed station safety case and configuration decision. No orbital mass or power assigned to bom-0-7. | Treat **0.05–0.15 g** as a candidate process-zone requirement, not demonstrated smelting necessity. Specify radius, rotating mass, throughput and utilities before revising station mass or cost. |
| **rq-0-14 — propellant deployment** | Separate 0A design work from 0B deployment authorization; require a production-rate definition and resource-rights review. | Replace “four systems deployed in Phase 0” with a **design/deployment decision gate**. The **≥25 kt/yr** basis is unresolved: feed water, combined product, hydrogen or delivered propellant yield radically different designs. |
| **rq-0-18 — tug structural human-rating** | Assign independent safety authority and configuration control. | Baseline remains **uncrewed**. Preserve a separately assessed upgrade path if useful; do not call structural reinforcement “human-rating.” Crew transport requires much more than stronger structure. |
| **rq-0-28 — ISRU costing** | Include independent estimate review and a WBS scope dictionary within the staffing allowance. | Retain $2B for bom-0-6 only as an **unvalidated allowance** pending mass, throughput, development, deployment and operations estimates. |
| **rq-0-29 — governance** | Implement the association/operator split, succession, decision records, licensing, financial controls and review triggers specified below. | No physical spacecraft mass, orbital power or propellant increment. |
| **rq-0-30 — boil-off** | Require a thermal/propellant budget and acceptance evidence before procurement. | Specify heat leak, allowable loss and storage duration—not an unsupported percentage loss. Cooler power, shielding mass and replenishment must enter the hardware budgets. |
| **rq-0-47 — sunshield** | Record the responsible thermal-design authority and review gate. | Shield dimensions, mass, attitude constraints and thermal performance remain **TBD**; the conclusion text is absent. |
| **rq-0-48 — MLI degradation** | Require end-of-life thermal performance and an inspection/replacement disposition. | Replace beginning-of-life-only insulation assumptions with exposure-dependent end-of-life limits. Numerical degradation factors require test data or a justified environmental analogue. |

#### Physics checks supporting the dispositions

**Artificial gravity.** With \(a=\omega^2r\), assuming a process zone at \(r=20\ \text{m}\):

\[
n=\frac{60}{2\pi}\sqrt{\frac{a}{r}}
=1.5\text{–}2.6\ \text{rpm}
\]

for \(a=0.05\text{–}0.15g\), using \(g=9.81\ \text{m/s}^2\).

The previous reconciliation’s calculation holds. It does **not** establish that smelting needs this gravity range, nor determine the rotating structure’s mass. Rotating equipment also introduces bearings or rotating utilities, balance control and failure-containment requirements.

**Production-rate ambiguity.** As an illustrative—not adopted—case, suppose **25 kt/yr means water electrolyzed**, with no losses:

\[
25{,}000\ \text{t water/yr}
\rightarrow
2{,}780\ \text{t H}_2/\text{yr}
+
22{,}220\ \text{t O}_2/\text{yr}.
\]

Using an engineering planning range of **50–60 kWh/kg H₂** for electrolysis, consistent with published practical electrolyzer performance:

\[
E=2.78\times10^6\ \text{kg/yr}\times(50\text{–}60)\ \text{kWh/kg}
=139\text{–}167\ \text{GWh/yr}.
\]

Thus:

\[
P_{\rm calendar}=16\text{–}19\ \text{MW};
\qquad
P_{\rm operating}=18\text{–}24\ \text{MW}
\]

at 80–90% annual operating availability.

If **25 kt/yr means hydrogen**, electrolysis alone becomes approximately **143–171 MW calendar-average**, before mining, thermal extraction, liquefaction or transport. This would exceed the nominal 100 MW phase generation.

For a water-feed case, assume, solely for sensitivity analysis:

- Recoverable water fraction: 5–20% by mass.
- Regolith heated from approximately 20°C to 1000°C.
- Mean heat capacity: 0.7–1.0 kJ/kg/K.
- No heat recovery.

Then:

\[
\dot m_{\rm regolith}
=\frac{25{,}000}{0.05\text{–}0.20}
=125{,}000\text{–}500{,}000\ \text{t/yr}.
\]

\[
q=c_p\Delta T
\approx0.69\text{–}0.98\ \text{MJ/kg}.
\]

The ideal sensible-heating load is approximately **2.7–15.5 MW calendar-average**. At 80–90% availability and 50–80% electrical-to-useful-heat efficiency, operating electrical demand is roughly **4–39 MW**, excluding dehydration chemistry, water vaporization, equipment losses and downstream processing.

These assumptions are estimates, not asteroid measurements. In particular, a universal 1000°C extraction requirement should be challenged against target mineralogy and extraction tests.

**Conclusion:** Even the water-feed interpretation does not close the 100 MW allocation. The array rating must be distinguished from end-of-life usable power at the chosen heliocentric distance.

**Boil-off.** Near normal boiling points, approximate latent heats are:

- LH₂: \(L_v\approx445\ \text{kJ/kg}\)
- LOX: \(L_v\approx213\ \text{kJ/kg}\)

For a continuous 1 kW heat leak:

\[
\dot m=\frac{Q}{L_v}.
\]

This gives approximately **194 kg/day LH₂** or **406 kg/day LOX**. The previous reconciliation’s values hold, within rounding.

These are vented-equivalent rates for saturated liquid, not universal operational losses. Subcooling, pressure rise, refrigeration and operating cycles change the result. Neither tank insulation mass nor refrigeration power can be inferred from heat leak alone.

---

## 2. Revised specification

### 2.1 Scope and cost basis

**Assumptions:** Ten-year Phase 0 costing period; constant 2026 USD; professional organizational services supporting a hardware program, but not performing all program integration or mission operations.

A transparent estimate is:

\[
C_{\rm base}=C_{\rm formation}
+T(N_{\rm FTE}c_{\rm FTE}+C_{\rm services}).
\]

| Component | Planning range | Basis |
|---|---:|---|
| Formation, initial legal architecture and policies | $1–3M | Judgement; procurement of specialist services |
| Average organizational staffing | 12–20 FTE | Judgement; excludes flight controllers and program-wide engineering |
| Fully burdened annual staff cost | $180–260k/FTE-year | Planning assumption, not a quoted labor market survey |
| External counsel, audits, governance administration, archive and specialist support | $0.8–2.8M/year | Judgement; exclude work already performed by staff |
| Cost uncertainty allowance | 25% of base | Judgement; not an insurance reserve |

Bounds:

\[
C_{\rm low}=1.25[1+10(12\times0.18+0.8)]
=\$38\text{M},
\]

\[
C_{\rm high}=1.25[3+10(20\times0.26+2.8)]
=\$104\text{M}.
\]

A central planning case is:

\[
1.25[2+10(16\times0.22+1.6)]
\approx \$67\text{M}.
\]

**Adopt approximately $65M, range $40–105M.** These are scenario bounds, not a statistical confidence interval. The same model for five years gives approximately **$20–55M**. Thus the former $50M could be workable for a narrower five-year scope; it is not demonstrably sufficient for the assumed ten-year scope.

### 2.2 Changed parameters and requirements

| Parameter | Old → proposed new | Basis | Confidence |
|---|---|---|---|
| Costed duration | Unspecified → **10 years**, subject to phase approval; sensitivity 5–10 years | Judgement | Low |
| Organizational cost | $50M undefined → **$65M planning value; $40–105M** | Calculation above | Low |
| Legal architecture | Unspecified → **association plus accountable operator**; initially 2 entities, potentially 3 if justified | Swiss Civil Code Arts. 60–79; OST Art. VI; judgement | Medium |
| Association jurisdiction | Implicit Swiss preference → **Swiss association as provisional choice**, subject to counsel, banking and funding review | Literature/legal framework plus judgement | Medium |
| Operating jurisdiction | Unspecified → **select after authorization, liability, tax, funding and export-control comparison** | Judgement | High that selection is necessary; low on winner |
| Governing board | Unspecified → **5–7 members; staggered three-year terms; normally two consecutive terms** | Judgement, informed by nonprofit practice | Medium |
| Charter Trust | Implied mature architecture → **study and migration option only in Phase 0** | Judgement | Medium |
| Sortition | Claimed strongest protection → **optional oversight pilot**, not a substitute for qualified fiduciaries | OECD deliberative-process evidence; limited transferability | Low |
| Constitutional continuity | “Immutable mission” → **mission-preserving charter with difficult lawful amendment and dissolution provisions** | Legal practicality; judgement | Medium |
| Succession | Mandatory 12-month overlap → **3–12 months where feasible**, with documented deputies and emergency access transfer | Judgement | Medium |
| Funding concentration | Hard 15% donor/25% government caps → **targets with disclosed, time-limited exceptions**; no donor veto over safety | Judgement | Medium |
| Liquidity | Five-year operating reserve → **initial 1–2-year target; later five-year aspiration** | Judgement | Low |
| Knowledge archive | Unspecified → **2–20 TB/year organizational ingest allowance**, three independently administered copies, annual restore tests | Capacity estimate; preservation practice | Low on volume; medium on controls |
| Orbital allocation | Unspecified → **0 t/yr mass, 0 MW orbital power, 0 t/yr propellant** | Scope definition | High |

The annual base expenditure above is approximately $3–8M. Accordingly:

- One to two years of organizational liquidity: roughly **$3–16M**.
- Five years: roughly **$15–40M**.

These are **balance-sheet funding targets**, not additional annual expenditure. An endowment intended to fund operations indefinitely would require a different calculation based on spending policy and investment risk.

### 2.3 Mandatory functional requirements

#### Legal entity and accountability

- The association maintains the public mission, contributor process and canonical records.
- The operator holds contracts, relevant authorizations, assets and employment obligations.
- A written delegation identifies who can commit funds, approve configurations, accept risks and stop unsafe work.
- Contribution-based technical standing must not be confused with legal voting membership, fiduciary responsibility or authority to operate spacecraft.

#### Licensing and openness

Use existing licenses rather than create a new omnibus license:

- Hardware designs: **CERN Open Hardware Licence v2**, choosing permissive, weakly reciprocal or strongly reciprocal terms deliberately.
- Software: appropriate existing open-source licenses, with dependency and patent review.
- Documents and suitable data: an appropriate Creative Commons or data license.
- Restricted information: a separately controlled annex after export, security, privacy and contractual review.

No license guarantees that all physical infrastructure or resource production remains open. Patent ownership, copyright scope, interoperability and contract terms require separate analysis.

#### Liability and insurance

Before procurement, document:

- Launching-State exposure and operator obligations.
- Applicable cross-waivers, indemnities and financial-responsibility requirements.
- Which party buys launch liability coverage and which risks remain with the project.
- In-orbit third-party liability, property, cyber and employer coverage requirements.
- Broker quotations, exclusions, deductibles, aggregation limits and retained-loss funding.

**Insurance administration is in bom-0-7; flight premiums and loss reserves are not.** A statutory liability amount, maximum probable loss, policy limit, premium and funded reserve are different quantities.

#### Planetary protection

Produce a mission-specific determination covering target, trajectory, contact, sample handling and Earth return.

COSPAR policy is an authoritative technical reference, but **not itself a universal permit**. Asteroid spectral class alone is insufficient to assign a category. OSIRIS-REx and Hayabusa2 provide relevant sample-return heritage; they do not automatically determine the category of industrial asteroid operations.

#### Spectrum and traffic coordination

- Coordinate spectrum through the relevant national administration and applicable ITU processes.
- Establish spacecraft identity, tracking, ephemeris, maneuver-notification and emergency-contact arrangements.
- Provide covariance-bearing orbital products where appropriate.
- Establish conjunction assessment and collision-response responsibilities.
- Maintain disposal, fragmentation prevention and passivation plans appropriate to mission orbit.

There is no single global “space-traffic licence” that resolves all of these functions.

#### Decision records

Maintain versioned requirements, interface documents, assumptions, dissent and approval records. Preserve provenance and corrections without pretending the original record never existed. Public records must support restricted annexes and lawful privacy handling.

AI-generated summaries may assist retrieval; they must not become the authoritative record without source traceability.

### 2.4 Acceptance gates

| Gate | Required evidence | Accountable acceptance |
|---|---|---|
| **Formation** | Entity documents, bank and accounting controls, membership rules, conflict policy, initial delegation | Founding board |
| **Major procurement** | Operator selected; WBS scope dictionary; reviewed mission concept; independent cost review; authorization pathway; preliminary hazards and insurance allocation | Operator board and program authority |
| **Target/design freeze** | Planetary-protection determination; export classification; spectrum plan; thermal/propellant/power interfaces closed to the agreed maturity | Technical and regulatory authorities |
| **Flight authorization** | Applicable licences and State processes completed; financial responsibility demonstrated; operations, traffic and emergency plans verified; unresolved safety issues dispositioned | Licence holder—not contributor vote |
| **Annual continuity review** | Financial audit, concentration disclosures, restore test, succession exercise and compliance review | Board with independent oversight |

Crossing 100 contributors or receiving $50K may trigger an internal governance review. These thresholds are not appropriate substitutes for the procurement and flight gates of a multibillion-dollar program.

---

## 3. Interfaces

**Orbital quantities below apply only to bom-0-7.** They do not imply that the ground segment or hardware items need no resources.

| Interface | Mass | Orbital power | Propellant | Data/other exchange | BOM status |
|---|---:|---:|---:|---|---|
| **bom-0-1 Prospectors** | 0 t/yr | 0 MW | 0 t/yr | Authorization, registration inputs, spectrum records, target assessments and approved requirements | Organizational line exists; interface unspecified |
| **bom-0-2 Mining robots** | 0 t/yr | 0 MW | 0 t/yr | Surface-contact assessment, autonomy responsibility, extraction permits/rights analysis and hazard dispositions | Interface unspecified |
| **bom-0-3 Processing station** | 0 t/yr | 0 MW | 0 t/yr | Configuration approvals, process safety case, station registration and rotating-zone review | Interface unspecified |
| **bom-0-4 Transport vehicles** | 0 t/yr | 0 MW | 0 t/yr | Liability allocation, traffic protocols, fleet configuration and explicit uncrewed baseline | Interface unspecified |
| **bom-0-5 Power arrays** | 0 t/yr | **0 MW allocation to bom-0-7** | 0 t/yr | Approved usable-power budgets, heliocentric-distance assumptions and degradation margins | Interface unspecified |
| **bom-0-6 Propellant systems** | 0 t/yr | 0 MW | **0 t/yr consumed or produced by bom-0-7** | Production definition, cost methodology, resource rights and thermal/propellant acceptance evidence | Interface unspecified |
| **Terrestrial services** | Not a spaceflight allocation | **0.01–0.05 MW estimated terrestrial demand** | 0 t/yr | Offices, computing, security and archive services | No explicit facilities/ground-service line |

Organizational archive allowance: **2–20 TB/year logical ingest**. Three copies over ten years imply **60–600 TB**, before overhead and prior holdings. This excludes raw science, imagery and continuous flight telemetry.

The volume alone averages approximately **0.5–5 Mbit/s**. Peak transfers require more, but it does not justify the previous proposal for a dedicated 10 Gbit/s backbone.

**Missing interface owner:** The ground segment must generate tracking, covariance, command and maneuver products. bom-0-7 defines responsibilities and retains records; it does not generate operational navigation solutions.

---

## 4. Missing items or scope

| Missing scope | Treatment |
|---|---|
| **Program management, systems engineering and mission assurance** | Add an explicit account or identify inclusion in prime contracts. Do not add a percentage on top of already-included costs. |
| **Launch and delivery to operating sites** | Establish mass, destination, staging and launch-service assumptions before pricing. |
| **Ground segment and mission operations** | Define fleet coverage, autonomy, communications, staffing, navigation and emergency response. |
| **Flight insurance and retained losses** | Separate premiums, purchased limits and funded retention. Obtain quotes; no credible numeric allowance follows from this BOM alone. |
| **Organizational liquidity/endowment** | Track financing separately from expenditure; initial liquidity target approximately $3–16M under this staffing model. |
| **Independent safety and regulatory reviews** | Assign owners; distinguish organizational review from detailed engineering assurance. |
| **Raw scientific and operational data infrastructure** | Excluded from the organizational archive allowance. |
| **Crew-support capability** | Excluded. Structural provisions on a tug are not life support, abort capability, rescue, habitation or complete human-rating. |
| **Phase-wide contingency and cost escalation** | Current item totals do not show consistent treatment. Avoid adding overlapping reserves. |

I do **not** endorse the previous reconciliation’s numerical allowances for launch, flight operations, self-insurance or PM/SE as adopted BOM values. They may be useful order-of-magnitude scenarios, but lack the scope and physical drivers needed for a revised estimate.

---

## 5. Remaining disagreements and open questions

### Disagreements with the previous reconciliation

1. **$150–160M is not compelled by the evidence.** Those proposals combine differing durations, staffing, insurance reserves and organizational functions. On a common ten-year, non-flight-services scope, approximately $40–105M is more transparent.

2. **An insurance reserve is not a premium estimate.** The $75M reserve proposal cannot be derived from a nominal $100M launch liability amount. Launch-provider coverage also does not automatically remove all customer exposures.

3. **Sortition is not demonstrated to be the strongest anti-capture mechanism.** OECD evidence supports structured public deliberation, not fifteen-year fiduciary trusteeships operating asteroid infrastructure.

4. **A five-jurisdiction trust is premature.** It can add legal complexity, cost and correlated compliance obligations. Geographic distribution is a resilience strategy, not proof of independence.

5. **Planetary-protection categories are not reliably assigned from B/C spectral classes alone.** Mission-specific review is necessary.

6. **A bespoke copyleft license is unnecessary and risky.** Existing licenses provide clearer precedent; openness still needs patent, export and security controls.

7. **Swiss legal status should not be asserted from stale text.** Verify legislation and the authorization pathway at entity selection. Likewise, **14 CFR Part 460** is not a general deep-space human-rating standard.

8. **Mandatory twelve-month overlap and immutable governance are too rigid.** They may harm emergency succession or lawful adaptation.

9. **The previous reviewer’s arithmetic correction holds:** 20 FTE × $400k/FTE-year × 10 years is **$80M**, not $90M, absent another stated cost component.

### Questions that remain decision-critical

- Is Phase 0 five or ten years, and what separates 0A from 0B?
- Which hardware prices include development, integration, launch, operations and assurance?
- What does 25 kt/yr measure, and at what location and availability?
- Which State or States authorize the operator, and what activities are covered?
- What are the target bodies, return plans and operating orbits?
- What are the flight risk limits and actual insurance terms?
- Is public-benefit legitimacy expressed through contributor merit, public representation, funder obligations or a combination?
- Does Phase 0 include any crewed mission? The recommended baseline says no.

### Principal published references

- **Outer Space Treaty** (1967), Arts. VI–VIII; **Liability Convention** (1972); **Registration Convention** (1975), available through UNOOSA.
- **Swiss Civil Code**, Arts. 60–79, associations.
- **CERN Open Hardware Licence version 2** (2020), license texts and guidance.
- **COSPAR Policy on Planetary Protection**, current applicable edition to be confirmed at mission review.
- **ITU Radio Regulations** and applicable national spectrum procedures.
- **UN COPUOS Space Debris Mitigation Guidelines** (2007) and **Long-term Sustainability Guidelines** (2019).
- **NASA NPR 8705.2**, human-rating requirements for NASA space systems; applicable revision and contractual relevance must be determined.
- **OECD, Innovative Citizen Participation and New Democratic Institutions** (2020).
- **NDSA Levels of Digital Preservation**, version 2.0 (2019).
- **U.S. DOE hydrogen-production technical targets and electrolyzer performance publications**; system boundaries must be matched when applying kWh/kg figures.
- **NIST Chemistry WebBook**, hydrogen and oxygen thermophysical data.

These establish frameworks and physical properties. They do not establish this project’s staffing cost, trustee count or insurance price.

---

## 6. Decision-quality critique

The earlier reconciliation usefully preserved disagreement. Its weakest general feature is that it compared **different scopes as if they were alternative prices for the same product**.

The following reviews use the Composite Scaffold. Legal and safety conditions are **musts**, not weighted preferences. Illustrative weights below structure debate; they are not measured utilities or a computed optimum.

### Decision A — Association versus accountable operator

1. **Frame/type:** Partly irreversible existence/executive decision; legally complicated. Choose who governs the mission and who operates assets.
2. **Criteria/weights:** After legal-compliance screening: accountability 35%, fundability 25%, coordination 20%, independence 20%.
3. **Options:** Volunteer association alone; association plus operator; immediately create many operating subsidiaries.
4. **Assessment matrix:**

   | Option | Accountability | Fundability | Coordination | Independence |
   |---|---|---|---|---|
   | Association alone | Unproven | Weak at flight scale | Simple initially | Strong formal autonomy |
   | Association + operator | Stronger | Stronger | Manageable boundary | Requires safeguards |
   | Many subsidiaries now | Potentially strong | Unproven | Complex | Geographic diversity, not guaranteed independence |

5. **Sensitivity/trade-off:** Operating jurisdiction is sensitive to authorization and export rules. Separation trades some direct contributor control for legally enforceable accountability.
6. **Evidence certainty:** **High confidence** that an authorization/accountability structure is necessary. **Medium confidence** that two entities are the best Phase 0 arrangement. Authorization problems are **likely** without early legal work; this is an engineering judgement, not a measured probability.
7. **Assumption/falsifier:** Assumes one operator can cover the planned activities. A legal opinion requiring materially different national operators would falsify it.
8. **Decision/warrant/downside:** Choose association plus operator because distinct responsibilities need explicit holders; accept entity-maintenance cost and a delegation boundary.
9. **Consequences:** Enables contracting and authorization studies; constrains contributor votes over operations.

**Weakest link:** information—mission jurisdiction and funding sources are unknown.  
**Parallel method:** **QOC**, separating legal “musts” from preferences. A simple weighted score cannot legalize an otherwise infeasible option.

### Decision B — Cost and scope of bom-0-7

1. **Frame/type:** Reversible budget/property decision, but scope omission can block procurement.
2. **Criteria/weights:** Scope completeness 40%, traceability 25%, affordability 20%, adaptability 15%.
3. **Options:** Keep undefined $50M; define narrow organizational services; combine governance, program integration and flight-risk funding.
4. **Assessment matrix:**

   | Option | Completeness | Traceability | Affordability | Adaptability |
   |---|---|---|---|---|
   | Undefined $50M | Poor | Poor | Apparently favorable | Poor |
   | Scoped $40–105M | Good within boundary | Good | Plausible, unquoted | Good |
   | Broad $150M+ account | Potentially broader | Poor without WBS | Uncertain | Risks hidden overlap |

5. **Sensitivity/trade-off:** Duration and staffing are sensitivities. Including insurance is primarily a **scope change**, not evidence of expensive governance. More assurance versus lower cost is a genuine values trade-off once duties are fixed.
6. **Evidence certainty:** **High confidence** in arithmetic; **low confidence** in staffing demand and rates. The ten-year range is **plausible**, not “likely at 90%.”
7. **Assumption/falsifier:** Assumes flight operations and integration sit elsewhere. A WBS assigning them to bom-0-7 invalidates this estimate.
8. **Decision/warrant/downside:** Adopt $65M planning value with $40–105M scenario bounds because the estimate is inspectable; accept that it is not a procurement commitment.
9. **Consequences:** Requires separate owners for excluded functions and an annual staffing/cost refresh.

**Weakest link:** frame in the earlier reconciliation; information in this estimate.  
**Parallel method:** **GRADE Evidence-to-Decision**, which exposes the distinction between a desirable scope and weak evidence about its resource use.

### Decision C — Trust, sortition, terms and funding caps

1. **Frame/type:** Complex constitutional decision; preserve reversibility rather than claim century-scale optimization.
2. **Criteria/weights:** Capture resistance 30%, accountability 25%, participation/equity 20%, adaptability 15%, administrative cost 10%.
3. **Options:** Fifteen-year sortition trust now; conventional staggered board now; board plus experimentally evaluated oversight panel.
4. **Assessment matrix:**

   | Option | Capture resistance | Accountability | Participation | Adaptability |
   |---|---|---|---|---|
   | Long-term sortition trust | Uncertain | Legally untested here | Pool-dependent | Low |
   | Staggered board | Moderate with controls | Familiar | Potential insider bias | Higher |
   | Board + oversight pilot | Potential improvement | Preserved | Can broaden | Higher |

5. **Sensitivity/trade-off:** Eligibility rules strongly affect sortition outcomes. Long terms trade continuity against removability. Funding caps trade independence against capital access. These are partly **values questions**, not facts a literature search will settle.
6. **Evidence certainty:** **Low confidence** in claims of superior multi-century protection. A premature multi-jurisdiction trust is **likely to increase administrative complexity**, but its net benefit is unknown.
7. **Assumption/falsifier:** Assumes simpler governance can resist early capture. Funding-control simulations, a red-team takeover exercise or actual concentrated funding with board veto rights could falsify that assumption.
8. **Decision/warrant/downside:** Use a 5–7-member board, limited consecutive terms, disclosures and pilot oversight; defer the trust. Accept less constitutional permanence in return for learning and accountability.
9. **Consequences:** Requires review triggers, qualified successor recruitment and lawful amendment provisions.

**Weakest link:** information for the sortition claim; values for independence versus fundability.  
**Parallel methods:** **GRADE EtD** for equity, feasibility and evidence transferability; **ACH** to test whether longevity is better explained by immutable rules, adaptation, resource continuity or external legitimacy.

### Decision D — Flight compliance, safety authority and insurance

1. **Frame/type:** Blocking executive/safety decision with potentially irreversible harm.
2. **Criteria/weights:** Legal compliance and minimum safety are musts. Among feasible options: risk reduction 40%, continuity 25%, cost 20%, transparency 15%.
3. **Options:** Proceed with generic allowances; satisfy all launch obligations only; use mission-specific authorization, hazards and insurance gates.
4. **Assessment matrix:**

   | Option | Legal feasibility | Residual-risk visibility | Cost visibility |
   |---|---|---|---|
   | Generic allowance | Unproven | Poor | Superficial |
   | Launch-only compliance | Incomplete for operations | Partial | Partial |
   | Mission-specific gates | Demonstrable | Stronger | Quote-dependent |

5. **Sensitivity/trade-off:** State, orbit and mission architecture change obligations. Openness versus export/security restrictions is a genuine trade-off. Premium versus funded retention is a financial-risk trade-off.
6. **Evidence certainty:** **High confidence** that generic filing counts and reserves are insufficient. **Low confidence** in premium prices. Some operations are **likely** to require bespoke coverage or retention, but their cost is unknown.
7. **Assumption/falsifier:** Assumes proposed operations can be authorized and financed. Regulator rejection, unacceptable exclusions or unaffordable financial-responsibility terms falsify it.
8. **Decision/warrant/downside:** Use mission-specific gates and independent safety authority; accept delay and specialist expense rather than confuse a reserve with compliance.
9. **Consequences:** Constrains publication, procurement and flight; requires a separately funded ground/operator capability.

**Weakest link:** information—targets, flight profiles and contractual allocations are absent.  
**Parallel methods:** **QOC** for purchased cover versus retention; an **assurance-case approach** for gate evidence. The previous reserve proposals lack the warrant connecting risk exposure to dollar value.

### Decision E — Write-back, technical deployment and missing phase accounts

1. **Frame/type:** Configuration-control decision; reversible documentation changes, potentially irreversible hardware commitments.
2. **Criteria/weights:** Physical validity and safety are musts. Then traceability 35%, interface closure 30%, timeliness 20%, option preservation 15%.
3. **Options:** Automatically adopt conclusions; leave them as discussions; formally disposition each conclusion.
4. **Assessment matrix:**

   | Option | Physical validity | Traceability | Timeliness | Option preservation |
   |---|---|---|---|---|
   | Automatic adoption | Unproven | Superficial | Fast | Poor |
   | No write-back | Unresolved | Poor | Delays later decisions | Apparent only |
   | Controlled disposition | Tested | Strong | Slower initially | Strong |

5. **Sensitivity/trade-off:** The meaning of 25 kt/yr is a major power sensitivity. Early crew accommodation trades future flexibility against current mass and development cost. Thermal margins trade mass/power against propellant retention.
6. **Evidence certainty:** **High confidence** in the unit calculations; **low confidence** in absent designs. It is **very likely** that the hydrogen-output interpretation exceeds 100 MW using the stated electrolysis assumptions.
7. **Assumption/falsifier:** Assumes discussion conclusions can be translated into measurable requirements. Full records showing already-approved, closed interfaces would falsify the claim that they remain unresolved.
8. **Decision/warrant/downside:** Require owner-led disposition and retain uncrewed baseline; accept review effort and possible rejection of earlier consensus.
9. **Consequences:** Unlocks defensible revisions of station, tug and ISRU budgets; blocks unsupported numerical resizing.

**Weakest link:** commitment—the previous reconciliation identifies omissions without assigning approval authority or closure dates.  
**Parallel method:** **ACH** on competing throughput interpretations. The unit-sensitive power calculation discriminates between them more effectively than model agreement does.

### Decision F — Archive, succession and long-term reserves

1. **Frame/type:** Reversible resilience/property decision, with gradual loss risks.
2. **Criteria/weights:** Recoverability 35%, provenance 25%, continuity 20%, lifecycle cost 20%.
3. **Options:** Elaborate vault and network now; ordinary managed storage only; independently administered replicas with tested restoration and migration.
4. **Assessment matrix:**

   | Option | Recoverability | Provenance | Continuity | Cost |
   |---|---|---|---|---|
   | Elaborate vault/network | Unproven without tests | Design-dependent | Institution-dependent | High |
   | Ordinary storage only | Vulnerable to common failures | Variable | Weak | Low |
   | Replicas + exercises | Testable | Stronger | Stronger | Moderate |

5. **Sensitivity/trade-off:** Administrator independence matters more than replica count alone. Public transparency trades against privacy and security. Larger cash reserves improve continuity but delay technical spending.
6. **Evidence certainty:** **Medium confidence** in replication, format management and restoration controls; **low confidence** in projected ingest. Untested archives are **likely** to conceal recovery defects over long periods.
7. **Assumption/falsifier:** Assumes organizational records fit within the allowance. An inventory showing dominant raw telemetry would falsify it and require a separate data-system budget.
8. **Decision/warrant/downside:** Adopt three independent copies, annual restores and succession exercises; accept ongoing maintenance rather than promise permanent preservation.
9. **Consequences:** Requires named custodians, migration funding, access succession and reserve policy review.

**Weakest link:** information on actual records, and commitment to recurring exercises.  
**Parallel method:** **QOC** distinguishes archival appearance from demonstrated recovery. A successful restore after simulated loss of the principal organization is the relevant test.

**Disposition of the previous BOM deltas:** Replace B1a–B1c with the common-scope estimate above; retain B2 as financing, not expenditure; retain B3–B6 as required scope decisions but withdraw their unsupported dollar ranges pending WBS, mass, staffing and insurance evidence.

```yaml
item: bom-0-7
model: OpenAI ChatGPT
findings:
  - id: P0-F13
    verdict: agree
    summary: No executable specification exists, and governance discussion alone does not provide the accountability and compliance needed for the hardware phase.
    proposed_change: Establish an association-plus-operator specification with explicit authority, succession, licensing, liability, planetary-protection and traffic-coordination gates.
  - id: P0-F15
    verdict: partly
    summary: The governance write-back gap is evident, but the repository-wide count and numerical consequences of absent deliberations cannot be independently verified.
    proposed_change: Create an owner-led disposition register and incorporate conclusions only after evidence, physical interfaces, costs and approval authority are reviewed.
revised_spec:
  - parameter: Ten-year organizational-services planning cost
    old: 50000000
    new: 65000000
    range: [40000000, 105000000]
    unit: constant 2026 USD
    basis: calculation
    confidence: low
  - parameter: Costing duration
    old: unspecified
    new: 10
    range: [5, 10]
    unit: years
    basis: judgement
    confidence: low
  - parameter: Average organizational staffing
    old: unspecified
    new: 16
    range: [12, 20]
    unit: FTE
    basis: judgement
    confidence: low
  - parameter: Initial legal entities
    old: unspecified
    new: 2
    range: [2, 3]
    unit: entities
    basis: judgement
    confidence: medium
  - parameter: Governing board size
    old: unspecified
    new: 7
    range: [5, 7]
    unit: members
    basis: judgement
    confidence: medium
  - parameter: Planned leadership overlap
    old: mandatory 12 months in deliberation
    new: 6
    range: [3, 12]
    unit: months
    basis: judgement
    confidence: medium
  - parameter: Organizational archive logical ingest allowance
    old: unspecified
    new: 10
    range: [2, 20]
    unit: TB/year
    basis: judgement
    confidence: low
  - parameter: Independently administered archive copies
    old: unspecified
    new: 3
    range: [3, 3]
    unit: copies
    basis: judgement
    confidence: medium
  - parameter: Initial organizational liquidity funding target
    old: unspecified
    new: 8000000
    range: [3000000, 16000000]
    unit: constant 2026 USD
    basis: calculation
    confidence: low
  - parameter: Orbital power allocation
    old: unspecified
    new: 0
    range: [0, 0]
    unit: MW
    basis: judgement
    confidence: high
interfaces:
  - with: bom-0-1
    flow: mass
    value: 0 t/year
    in_bom: false
  - with: bom-0-2
    flow: mass
    value: 0 t/year
    in_bom: false
  - with: bom-0-3
    flow: mass
    value: 0 t/year
    in_bom: false
  - with: bom-0-4
    flow: propellant
    value: 0 t/year
    in_bom: false
  - with: bom-0-5
    flow: power
    value: 0 MW orbital allocation
    in_bom: false
  - with: bom-0-6
    flow: propellant
    value: 0 t/year consumed or produced by organizational infrastructure
    in_bom: false
  - with: phase organizational records
    flow: data
    value: 2-20 TB/year logical archival ingest excluding raw mission telemetry
    in_bom: false
  - with: terrestrial services
    flow: power
    value: 0.01-0.05 MW estimated terrestrial demand
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-7
    quantity: 1 ten-year organizational-services package
    unit_cost_usd: [40000000, 105000000]
    rationale: Replace the undefined allowance with a scoped staffing-and-services estimate excluding program integration, flight operations and flight-risk financing.
  - action: split
    item: Organizational liquidity funding
    quantity: 1 separately accounted financing target
    unit_cost_usd: [3000000, 16000000]
    rationale: Separate one to two years of organizational liquidity from operating expenditure and from any future endowment.
open_questions:
  - What duration and deployment boundaries define Phase 0A and Phase 0B?
  - Which hardware prices already include development, integration, assurance, launch and operations?
  - Does 25 kt/year mean water feed, combined propellant, hydrogen output or delivered usable product?
  - Which jurisdiction and State authorization pathways cover the operating entity and its activities?
  - What target bodies, trajectories, operating orbits and Earth-return plans determine mission-specific obligations?
  - What premiums, exclusions, liability limits and retained-loss requirements are established by regulator and broker evidence?
  - Does Phase 0 contain any crewed mission beyond a separately assessed future upgrade option?
  - What do the full deliberation records and repository disposition history actually show?
  - Who owns and funds the missing program integration, ground operations, launch and flight-risk accounts?
```
