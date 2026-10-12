---
phase: phase-0
item: bom-0-7
round: 1
type: reassessment
modelId: gemini-3-8-flash
modelName: "Gemini 3.8 Flash"
endpoint: databricks-gemini-3-8-flash
findings: 8607ae186f99
priorRound: null
generated: 2026-10-11T19:02:01.822Z
seconds: 20.096
---

An engineering and institutional systems re-assessment of `bom-0-7` (Organizational Infrastructure) follows.

---

### 1. Findings

#### P0-F13: Organizational infrastructure has no specification at all
* **Verdict:** Agree.
* **Reasoning:** `bom-0-7` is listed in the Phase 0 BOM at $50M with "low" confidence, but lacks any parameterised technical/operational specification. Deliberation `rq-0-29` defined the architecture (layered Swiss Verein + multi-jurisdictional Charter Trust, sortition, copyleft hardware licensing, append-only decision journal, knowledge escrow). However, `rq-0-29` omitted critical operational realities that must accompany space-hardware execution: international regulatory registration (Outer Space Treaty Article VI/VII liability and Article VIII registry), spectrum licensing (ITU coordination for deep-space telemetry/telecommand across 32 prospectors and 15 tugs), Planetary Protection categorisation (COSPAR compliance for carbonaceous chondrites), and third-party mission liability insurance.
* **Proposed Change:** Generate the complete specification for `bom-0-7` incorporating `rq-0-29` architecture, sizing its Phase 0 budget across 10 years, and breaking out the legal, IT, spectrum/regulatory, and insurance cost centers.

#### P0-F15: Deliberations not written back into specs (Focus on `bom-0-7` / `rq-0-29`)
* **Verdict:** Agree.
* **Reasoning:** `rq-0-29` settled the governance model, but its operational and cost implications have not been integrated into Phase 0 cost books. A $50M allocation over the typical ~10-year Phase 0 ramp is approximately $5M/yr. For an enterprise handling $15.7B in procurements (satellites, mining robots, processing station, tugs), a pure 0.3% overhead ($50M) is unrealistically low if it includes launch/orbit liability underwriting, ITU filing fees, international legal defense, and multi-hub knowledge centers. Standard aerospace project management and institutional coordination (G&A, system engineering & integration, legal/regulatory) runs 3% to 8% of prime procurement. Even if engineering PM is absorbed in individual asset BOMs (`bom-0-1` through `bom-0-6`), institutional governance, international compliance, and registry require a realistic budget of $120M–$250M across Phase 0.
* **Proposed Change:** Formally adopt `rq-0-29` governance mechanisms into `bom-0-7` and adjust the Phase 0 organizational budget range to $150M [$100M, $250M] over 10 years, detailing legal entity maintenance, spectrum/regulatory filings, institutional knowledge systems, and statutory insurance reserves.

---

### 2. Revised Specification

`bom-0-7` does not consist of physical spaceflight hardware, but of institutional, digital, and legal infrastructure required to coordinate, license, and legally sustain the physical items (`bom-0-1` to `bom-0-6`) under international law.

#### Core Architecture (Derived from rq-0-29 & International Space Law)
1. **Constitutional Layer (Century-Scale):**
   * Multi-jurisdictional Charter Trust (anchored in Switzerland, Singapore, and Uruguay) with 15 sortition-selected trustees serving staggered 15-year non-renewable terms. Holds canonical open-hardware licenses, brand assets, and constitutional charter.
2. **Operational Coordination Layer (Swiss Verein + Operating Subsidiaries):**
   * Non-profit Swiss Verein managing the Apache-style meritocratic working groups, open RFC process, and contributor merit rosters.
   * Wholly owned operational contracting subsidiaries (e.g., commercial entities incorporated in launch/procurement states like the US, EU, or Japan) to hold launch licenses (FAA-AST, CNES), execute procurement contracts ($15B+ total), and hold physical asset title.
3. **Regulatory, Liability & Licensing Architecture:**
   * **ITU Spectrum Filings:** Advanced publication, coordination, and notification for deep-space X/Ka-band and optical links for 32 prospectors, 20 miners, 15 tugs, and 1 station.
   * **COSPAR Planetary Protection:** Planetary Protection Category II compliance documentation for target asteroids (B-type, C-type NEAs).
   * **UN Outer Space Treaty Registration:** Art. VI state supervision and Art. VIII registry agreements via sponsoring state signatories.
   * **Launch Liability Coverage:** Statutory third-party launch liability insurance up to Maximum Probable Loss (MPL) per launch (~$100M coverage tier per launch campaign).
4. **Knowledge Escrow & Memory Engine:**
   * Distributed, append-only Decision Journal with cryptographically signed git-backed ledgers, mirrored across 5 geopolitical zones (including offline optical/tape archive vaults) to prevent institutional amnesia across multi-decade crew/engineer turnovers.

#### Numerical Cost Sizing (10-Year Phase 0 Execution Horizon)
* **Legal Establishment & Multi-Jurisdictional Maintenance:** $1.5M/yr × 10 yr = $15M.
* **Spectrum (ITU) & Regulatory/COSPAR Filings:** $10M total (application fees, frequency coordination studies, legal filings across multiple space agencies).
* **Open Technical Infrastructure & Knowledge Vaults:** $3M/yr × 10 yr = $30M (distributed secure compute, decision ledger, open specs hosting, automated verification CI/CD pipelines).
* **Governance, Conventions & Sortition Administration:** $2M/yr × 10 yr = $20M (triennial constitutional conventions, trustee sortition logistics, independent audit councils).
* **Launch & Orbital Liability Insurance Reserve / Regulatory Indemnification:** $75M (pooled coverage for test campaigns, pre-launch risk mitigation, and launch-state MPL compliance).
* **Total Cost:** **$150M** (Range: $100M – $250M).

---

### 3. Interfaces

| Interface With | Flow Type | Value / Description | In Current BOM? |
|---|---|---|---|
| All Items (`bom-0-1` to `bom-0-6`) | Regulatory / Policy | Legal authorization, launch licenses, spectrum allocation, orbital slots | No (implicit) |
| All Items (`bom-0-1` to `bom-0-6`) | Data (Institutional) | Canonical spec repository, RFC governance, engineering decision journal | No |
| Ground Networks / Terrestrial Comms | Data | ~10 Gbps global backbone between distributed core knowledge vaults | No |
| Sovereign Launch States / Agencies | Legal / Financial | Outer Space Treaty Art. VI liability compliance, launch indemnification | No |

---

### 4. Missing Items or Scope

1. **Spectrum Filing and ITU Allocation Fees:** Coordinating deep-space communications across a fleet of 67+ discrete spacecraft in Phase 0 requires formal ITU slotting and ground-station tracking network coordination (e.g., DSN or commercial optical/RF networks).
2. **Launch Licensing & Third-Party Liability Underwriting:** Under the 1972 Space Liability Convention, the launching state is strictly liable. Spaceflight procurement requires mandatory insurance or sovereign indemnification up to the MPL. This cannot be zero-cost.
3. **Physical Headquarters / Secure Knowledge Escrow Cold-Storage:** Physical archival facilities (e.g., Swiss mountain vault or Arctic World Archive equivalent) for immutable hardware blueprints and software toolchains.

---

### 5. Remaining Disagreements and Open Questions

1. **Sovereign Non-Interference vs. Non-State Legal Standing:** International space law (OST 1967) recognizes *states*, not Swiss Vereins or autonomous trusts. Project Dyson must partner with or incorporate operational subsidiaries within sovereign states willing to sponsor and register deep-space asteroid extraction under domestic legislation (e.g., US Commercial Space Launch Competitiveness Act of 2015, Luxembourg Space Resources Act). How Project Dyson avoids national capture while requiring national registration remains an unresolved constitutional tension.
2. **Cap on G&A/Governance Overhead:** Is $150M adequate for a $15.7B multi-asset enterprise? In standard space acquisitions, corporate G&A and program management run ~5–10% ($750M–$1.5B). If individual prime item contracts absorb system integration, $150M is sufficient for the pure institutional/governance shell; if the Verein must act as the primary lead system integrator (LSI), this budget is undersized by at least a factor of 4.

---

```yaml
item: bom-0-7
model: claude-3-7-sonnet
findings:
  - id: P0-F13
    verdict: agree
    summary: Organizational infrastructure has no baseline specification document or quantitative operational breakdown despite rq-0-29 conclusion.
    proposed_change: Write formal specification based on rq-0-29 governance layers combined with space regulatory, ITU spectrum, and liability insurance requirements.
  - id: P0-F15
    verdict: agree
    summary: rq-0-29 multi-century governance conclusions and regulatory requirements were not incorporated into bom-0-7 sizing or costing.
    proposed_change: Adopt rq-0-29 architecture and revise 10-year Phase 0 budget from $50M to $150M [$100M, $250M].
revised_spec:
  - parameter: governance_structure
    old: unspecified
    new: Layered Swiss Verein + Multi-Jurisdictional Charter Trust with sortition trustees
    range: [3 jurisdictions, 5 jurisdictions]
    unit: entity_structure
    basis: literature
    confidence: high
  - parameter: organizational_operating_lifespan_phase0
    old: unspecified
    new: 10
    range: [8, 15]
    unit: yr
    basis: judgement
    confidence: medium
  - parameter: total_phase0_org_budget
    old: 50
    new: 150
    range: [100, 250]
    unit: MUSD
    basis: calculation
    confidence: medium
  - parameter: charter_trustee_seats
    old: unspecified
    new: 15
    range: [11, 21]
    unit: seats
    basis: literature
    confidence: high
  - parameter: regulatory_and_insurance_reserve
    old: unspecified
    new: 75
    range: [40, 120]
    unit: MUSD
    basis: calculation
    confidence: medium
interfaces:
  - with: bom-0-1
    flow: other
    value: 32 ITU frequency allocations and OST registrations
    in_bom: false
  - with: bom-0-2
    flow: other
    value: 20 COSPAR planetary protection filings
    in_bom: false
  - with: bom-0-3
    flow: other
    value: Orbital location authorization and liability indemnification
    in_bom: false
  - with: bom-0-4
    flow: other
    value: 15 deep-space flight authorizations and tracking coordination
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-7
    quantity: 1
    unit_cost_usd: [100000000, 250000000]
    rationale: Sizing budget across 10 years to include ITU filing fees, statutory launch/orbital third-party liability insurance, global knowledge escrow vaults, and multi-jurisdictional legal defense.
open_questions:
  - Can a non-state Swiss Verein maintain operational autonomy while relying on sovereign state signatories for Article VI/VIII Outer Space Treaty compliance?
  - Should systems engineering and integration (SE&I) be housed inside this organizational line item, or remain federated across prime contractor line items?
```
