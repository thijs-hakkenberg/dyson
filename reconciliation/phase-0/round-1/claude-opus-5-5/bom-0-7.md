---
phase: phase-0
item: bom-0-7
round: 1
type: reassessment
modelId: claude-opus-5-5
modelName: "Claude Opus 5.5"
endpoint: databricks-claude-opus-5-5
findings: 8607ae186f99
priorRound: null
generated: 2026-10-11T20:52:56.970Z
seconds: 141.24
---

# Re-assessment: bom-0-7 Organizational Infrastructure (Phase 0)

**Assumptions used throughout**
- Phase 0 runs about 10 years from entity formation to the first sustained ISRU operations. Phase 0B propellant production at ≥25 kt/yr comes from rq-0-14.
- Phase 0 hardware in the BOM totals about $15.7B. The BOM has no lines for launch, ground segment, operations or program management.
- Fully loaded cost of specialist legal and regulatory staff is $250–400k per person-year (US/EU/Swiss rates, 2025 dollars).
- All costs are in 2025 USD and are estimates unless a source is cited.

---

## 1. Findings

### P0-F13: Organizational infrastructure has no specification

**Verdict: agree. I would raise the severity from minor to major.**

The gap is real, and it matters more than "minor" implies, for three reasons.

**1. Authorization blocks every other item.** Outer Space Treaty Art. VI requires "authorization and continuing supervision by the appropriate State Party" for non-governmental space activities.
- No prospector, robot or tug launches without a national mission authorization.
- In the US this involves FAA launch licensing (14 CFR Part 450) and FCC/ITU spectrum filings.
- The US has no settled regime yet for novel in-space activities such as mining and processing.
- This item therefore sits on the critical path of bom-0-1 to bom-0-6. It is not just an overhead line.

**2. The rq-0-29 conclusion covers governance but not regulatory compliance.** It specifies a Swiss Verein, sortition, a Decision Journal and copyleft licensing. It does not address the operational needs the finding lists:
- mission authorization
- resource-rights jurisdiction
- export control
- third-party liability and insurance
- planetary protection
- space-traffic and spectrum coordination

**3. The rq-0-29 jurisdiction choice is incomplete for operations.** Switzerland is an OST party but has no national space law in force; a draft Federal Space Act was in consultation in 2023–24. Recognized space-resource property regimes exist in four jurisdictions:
- US: 51 U.S.C. §51303, CSLCA 2015
- Luxembourg: Law of 20 July 2017
- UAE: Federal Law 12/2019
- Japan: 2021 Space Resources Act

A Swiss Verein can remain the constitutional and governance shell. The operating entity that holds spacecraft and extracts resources must sit in a jurisdiction that authorizes and supervises the activity. Luxembourg or the US are the realistic candidates for Phase 0.

**Proposed change:** write the spec as two entities plus a set of regulatory functions (Section 2), and resize the cost line.

### P0-F15: Concluded deliberations not written back (as it applies to bom-0-7)

**Verdict: agree for this item.** The finding asks for changes to mass, power and cost per item. For bom-0-7, mass and power effects are about zero. The real effects are on scope and cost.

| Deliberation | Effect on bom-0-7 |
|---|---|
| rq-0-29 governance | This is the core input. It is not reflected anywhere because no spec exists. The spec below incorporates it. |
| rq-0-14 Phase 0B propellant ≥25 kt/yr | Resource-extraction rights and authorization must be granted before 0B begins. This adds a legal workstream of about $5–15M. It also confirms the Luxembourg/US operating-entity requirement. |
| rq-0-18 structural human-rating of tugs | Human-rating as a design margin needs no org change. Any future crewed use would trigger FAA human spaceflight rules (informed consent regime, 14 CFR 460) and a safety and mission-assurance authority. Phase 0 needs an independent technical authority function, which is cost-bearing but sits in the PM/SE line I propose adding. |
| rq-0-28 ISRU cost methodology | The organization should own an independent cost-estimate function and enforce the methodology. This is a governance requirement with little cost (2–3 FTE). |
| rq-0-11 hybrid gravity zones | No direct effect. Rotating structures add conjunction and safety review content. |
| rq-0-30, rq-0-47, rq-0-48 (cryo boil-off, sunshield, MLI) | No effect on bom-0-7 beyond design-review authority. |

**Proposed change:** add to the bom-0-7 spec the 0B resource-rights workstream, the independent cost and technical authority requirements, and a traceable record in the Decision Journal of each deliberation being written back. That record directly prevents the failure F15 found.

---

## 2. Revised specification

### Architecture

**Entity A: Governance Association (Swiss Verein, per rq-0-29)**
- Constitutional mission and charter, with the Stewardship Council of 5–7 members.
- Charter Trust design, which is a later phase; Phase 0 cost covers study only.
- Copyleft specification licensing and the Decision Journal.
- Holds no spacecraft and signs no flight contracts.

**Entity B: Operating Company (Luxembourg S.A. or US LLC/PBC)**
- Wholly controlled by Entity A, with charter-locked mission clauses.
- Holds mission authorizations, spectrum filings and resource rights.
- Holds insurance policies and hardware contracts, and employs staff.

**Regulatory functions inside Entity B**
- Mission authorization and licensing.
- Export control. ITAR/EAR compliance is mandatory because publishing open specs conflicts with USML Cat XV and EAR 9x515 controls on GNC, proximity operations and propulsion. The "published information" exclusions (EAR §734.7, ITAR §120.34) must be applied deliberately, case by case. Copyleft "publish everything from day one" cannot be applied blindly.
- Spectrum: ITU advance publication and coordination, FCC/BIPT.
- Planetary protection: COSPAR Policy.
- Space-traffic and conjunction coordination.
- Insurance and risk.

### Cost build-up (10-year Phase 0)

| Element | Basis | Low | Mid | High |
|---|---|---|---|---|
| Entity formation, charter, constitutional conventions, legal architecture study | Verein formation is trivial (under CHF 10k). The cost is counsel for a multi-jurisdiction structure plus 2–3 conventions. | $3M | $5M | $10M |
| Legal/regulatory/export-control staff | 10–20 FTE × $300k × 10 yr | $30M | $50M | $90M |
| Third-party liability insurance (in-orbit TPL; launch TPL is normally carried by the launch provider under FAA MPL) | About 70 spacecraft at $20–200k/yr each for $50–100M coverage, plus station cover. This is a market estimate; premiums are opaque. | $15M | $40M | $120M |
| Planetary protection | Small bodies are mostly COSPAR Cat I/II, which is documentation-level. Hayabusa2 and OSIRIS-REx returns were Cat V "unrestricted". | $2M | $5M | $10M |
| Space-traffic coordination, SSA services, ITU/FCC fees and coordination | Space-Track screening is free. Commercial SSA is about $0.1–1M/yr. ITU cost-recovery fees run tens of k$ per filing. | $5M | $15M | $30M |
| Knowledge escrow, Decision Journal, records systems | Software plus archival staff | $3M | $10M | $20M |
| Resource-rights / 0B authorization workstream (rq-0-14) | Novel licensing | $5M | $10M | $15M |
| Contingency | 20–25% | $13M | $27M | $70M |
| **Total** | | **~$75M** | **~$160M** | **~$365M** |

### Items explicitly excluded from bom-0-7

These are costs or funding mechanisms, not organizational infrastructure, and they belong in their own lines:
- **Property and launch insurance** on the $15.7B hardware. At 5–10% of insured value this would cost $0.8–1.6B. Global space insurance capacity is about $0.5–0.7B per risk, so the $10B station cannot be insured commercially. Treat it as self-insured through design redundancy and schedule reserve.
- **Program management, systems engineering and mission assurance.**
- **The rq-0-29 endowment of 5 years' opex.** This is about $50–100M of financing, not cost.

### Parameter changes

| Parameter | Old | New (range) | Basis | Confidence |
|---|---|---|---|---|
| bom-0-7 total cost | $50M | $160M ($75–365M) | Calculation (above) | Low–medium |
| Number of legal entities | 1 | 2 (2–3) | Literature/law: OST Art. VI and national resource laws | Medium |
| Operating-entity jurisdiction | Switzerland (implied) | Luxembourg or US | Literature | Medium |
| Regulatory/legal headcount | Unspecified | 15 FTE (10–20) | Judgement | Low |
| Third-party liability coverage per spacecraft | Unspecified | $60M (50–100) | Judgement plus FAA MPL practice | Low |
| Governance review triggers | 100 contributors, $50K funding | Keep these for the volunteer phase. Add triggers at first $100M committed and at first flight authorization. | Judgement | Medium |
| Funding concentration caps | Donor ≤15%, government ≤25% | Donor ≤15%. Government cap is open (see Section 5). | Judgement | Low |

---

## 3. Interfaces

Mass and power flows are essentially zero. The flows are authorizations, data and obligations.

| With | Flow | Value | In BOM? |
|---|---|---|---|
| bom-0-1 Prospecting satellites | Other: authorizations | 32 spacecraft mission authorizations, about 1–4 ITU filings, TPL cover | Partly (bom-0-7 exists; the scope did not) |
| bom-0-2 Mining robots | Other: resource rights, export control | 20 units; extraction authorization; ITAR/EAR classification of autonomy and proximity-ops software | No |
| bom-0-3 Processing station | Other: authorization, conjunction, insurance | 1 large asset; self-insurance decision for about $10B; rq-0-11 rotating-structure safety review | No |
| bom-0-4 Transport vehicles | Other: authorization, export control | 15 units; EP and GNC export classification; rq-0-18 human-rating safety authority | No |
| bom-0-5 Solar arrays | Other | Minor (integrated in host authorizations) | — |
| bom-0-6 ISRU propellant | Other: resource rights | 0B ≥25 kt/yr extraction licence | No |
| All items | Data | Decision Journal and spec repository. About 1–10 TB/yr of records, which is negligible infrastructure. | No |
| Ground segment (missing) | Data | Spectrum licences for all links | No |

---

## 4. Missing items or scope

These are outside bom-0-7, but this item assumes they exist.

1. **Launch and in-space transport to the operating site.**
   - There is no BOM line for this.
   - It is likely the second-largest Phase 0 cost after the station. At an estimated $3–20k/kg delivered beyond LEO, it is billions of dollars.
   - It is also the trigger for most licensing activity.
2. **Program management, systems engineering, safety and mission assurance, and independent cost estimation.**
   - Typical NASA/ESA project "wraps" are about 10–20% of hardware, which here is about $1.5–3B. This is a judgement based on NASA cost-estimating practice.
   - A volunteer meritocracy (rq-0-29) cannot substitute for this at the $15B scale.
3. **Mission operations and ground segment.**
   - This covers deep-space communications (DSN aperture time or commercial deep-space ground stations) and the operations staff for about 70 spacecraft over a decade.
   - Estimate $0.5–1.5B.
4. **Risk retention / self-insurance reserve** for assets that cannot be insured.
5. **Workforce.** The volunteer-to-employee transition becomes unavoidable at about the same time as the first hardware contract. Phase 0 is mostly a paid-workforce phase, not a volunteer one.

---

## 5. Remaining disagreements and open questions

- **Scale mismatch.** The rq-0-29 conclusion describes a volunteer organization with a $50K funding trigger, while the phase spends about $16B or more.
  - Reasonable engineers could argue Phase 0 should be split: Phase 0-a, a volunteer research and governance phase, and Phase 0-b, a professional program.
  - Alternatively the governance model could apply only to the Entity A shell.
  - I lean toward the split, but it is a structural choice, not a calculation.
- **The 25% government cap may make Phase 0 unfundable.** No $15B deep-space program has yet been funded without anchor government or near-government money.
  - Lifting the cap trades capture-resistance for feasibility.
  - Alternatively, apply the cap to Entity A's governance budget only, not to Entity B's contracts.
- **Copyleft openness vs export control.** It is unresolved how much GNC, autonomy and EP design can legally be published.
  - The answer may force a "restricted annex" to the canonical specs.
  - That directly affects the rq-0-29 forkability principle.
- **Jurisdiction.** Luxembourg offers a resource law and an EU base. The US offers the deepest launch and insurance market but ITAR exposure. A multi-state structure could combine them, at the price of Liability Convention "launching state" complexity.
- **Insurance strategy.** Choosing between commercial TPL plus self-insured property and a captive insurer is a judgement call. Premiums for novel deep-space ops are poorly known, and my TPL range spans almost an order of magnitude.

---

```yaml
item: bom-0-7
model: Claude
findings:
  - id: P0-F13
    verdict: agree
    summary: No spec exists and rq-0-29 covers governance only, omitting mission authorization, resource rights, export control, insurance, planetary protection and space-traffic coordination, which are on the critical path for every Phase 0 launch, so severity should be major.
    proposed_change: Specify a Swiss Verein governance shell plus a Luxembourg/US operating entity with regulatory, export-control, insurance, planetary-protection and SSA functions, and resize cost to about $160M.
  - id: P0-F15
    verdict: agree
    summary: rq-0-29 is unreflected because no spec exists, and rq-0-14 (0B resource rights), rq-0-18 (safety authority) and rq-0-28 (cost methodology ownership) add organizational scope, while the thermal/gravity deliberations have no effect on this item.
    proposed_change: Add 0B resource-rights workstream, independent cost and technical authority requirements, and Decision Journal traceability of deliberation write-back to the bom-0-7 spec.
revised_spec:
  - parameter: bom-0-7 total cost (10-yr Phase 0)
    old: 50000000
    new: 160000000
    range: [75000000, 365000000]
    unit: USD
    basis: calculation
    confidence: low
  - parameter: legal entities
    old: 1
    new: 2
    range: [2, 3]
    unit: entities
    basis: literature
    confidence: medium
  - parameter: legal/regulatory/export-control headcount
    old: unspecified
    new: 15
    range: [10, 20]
    unit: FTE
    basis: judgement
    confidence: low
  - parameter: third-party liability insurance cost over phase
    old: unspecified
    new: 40000000
    range: [15000000, 120000000]
    unit: USD
    basis: judgement
    confidence: low
  - parameter: TPL coverage per spacecraft
    old: unspecified
    new: 60000000
    range: [50000000, 100000000]
    unit: USD
    basis: judgement
    confidence: low
  - parameter: planetary protection compliance cost
    old: unspecified
    new: 5000000
    range: [2000000, 10000000]
    unit: USD
    basis: literature
    confidence: medium
  - parameter: space-traffic, SSA and spectrum coordination cost
    old: unspecified
    new: 15000000
    range: [5000000, 30000000]
    unit: USD
    basis: judgement
    confidence: low
interfaces:
  - with: bom-0-1
    flow: other
    value: 32 mission authorizations, 1-4 ITU filings, TPL cover
    in_bom: false
  - with: bom-0-2
    flow: other
    value: extraction authorization and export classification for 20 units
    in_bom: false
  - with: bom-0-3
    flow: other
    value: authorization, conjunction screening, self-insurance decision for ~10e9 USD asset
    in_bom: false
  - with: bom-0-4
    flow: other
    value: 15 vehicle authorizations, EP/GNC export classification, safety authority
    in_bom: false
  - with: bom-0-6
    flow: other
    value: resource-extraction licence for >=25 kt/yr (Phase 0B)
    in_bom: false
  - with: bom-0-5
    flow: power
    value: 0 MW
    in_bom: true
bom_delta:
  - action: resize
    item: bom-0-7
    quantity: 1
    unit_cost_usd: [75000000, 365000000]
    rationale: Bottom-up legal, regulatory, insurance, PP, SSA and records costs over a 10-year phase exceed $50M by about 3x.
  - action: add
    item: Program management, systems engineering and mission assurance
    quantity: 1
    unit_cost_usd: [1500000000, 3000000000]
    rationale: Typical 10-20% project wrap on ~$15.7B hardware is absent and cannot be carried by a volunteer governance body.
  - action: add
    item: Launch and transport to operating site
    quantity: 1
    unit_cost_usd: [2000000000, 8000000000]
    rationale: No BOM line delivers any Phase 0 hardware to space.
  - action: add
    item: Mission operations and ground segment
    quantity: 1
    unit_cost_usd: [500000000, 1500000000]
    rationale: About 70 deep-space assets need communications and operations for a decade.
  - action: add
    item: Risk retention / self-insurance reserve
    quantity: 1
    unit_cost_usd: [300000000, 1500000000]
    rationale: The station's value exceeds global per-risk space insurance capacity.
open_questions:
  - Should Phase 0 be split into a volunteer research/governance phase and a professional program phase given the $50K-trigger vs $16B scale mismatch?
  - Does the 25% government funding cap apply to the governance shell only or to all program funding, and is Phase 0 fundable under it?
  - How much GNC, autonomy and EP design can be published under copyleft without violating ITAR/EAR, and does this require a restricted annex?
  - Luxembourg vs US vs multi-state operating entity, given Liability Convention launching-state exposure?
  - Commercial TPL plus self-insurance vs captive insurer for novel deep-space operations?
```
