---
phase: phase-0
item: bom-0-7
round: 2
type: reassessment
modelId: gemini-3-8-flash
modelName: "Gemini 3.8 Flash"
endpoint: databricks-gemini-3-8-flash
findings: b907d2fc76f4
priorRound: 1
framework: 18f503fe4ec6
generated: 2026-10-12T09:44:49.427Z
seconds: 49.927
---

# Re-assessment: bom-0-7 Organizational Infrastructure (Phase 0)

## 1. Findings

### P0-F13: Organizational infrastructure has no specification at all
- **Verdict:** Agree.
- **Reasoning:** bom-0-7 was budgeted at $50M without an architectural specification, interface definition, or compliance pathway. An engineering project coordinating ~16 BUSD in hardware across international jurisdictions requires formal legal personhood, space liability structuring (Articles VI/VII OST, 1972 Liability Convention), spectrum filings (ITU Radio Regulations Art. 9/11), and export-control clearance (e.g. ITAR Category XV / EAR 9A515). Without an operating entity authorized under national legislation (e.g., US CSLCA 2015, Luxembourg Space Resources Act 2017), hardware procurement cannot legally execute, making this a major blocker.
- **Proposed change:** Write the complete engineering, legal, and regulatory specification for bom-0-7 incorporating the multi-layer model: a Swiss Verein (governance/canonical spec) coupled with one or more operational subsidiaries in commercial space resource jurisdictions.

### P0-F15: Eight of nine concluded deliberations were never written back into the specs
- **Verdict:** Agree.
- **Reasoning:** rq-0-29 directly addresses governance, but the eight other concluded deliberations (e.g. rq-0-11, rq-0-14, rq-0-18, rq-0-28) alter physical requirements, power budgets, and compliance scope. For bom-0-7:
  - **rq-0-14** (ISRU at $\ge 25\text{ kt/yr}$): Establishes massive extraterrestrial resource extraction, requiring national licensing and deep-space spectrum/claim coordination under national resource laws and the Artemis Accords/COPUOS frameworks.
  - **rq-0-18** (Structural human-rating of tugs): Requires bom-0-7 to maintain a System Safety and Mission Assurance (SSMA) regulatory authority and handle crew-flight liability (e.g. 14 CFR 460 / FAA AST).
  - **rq-0-28** (Cost methodology): Demands independent cost-estimation and audit capabilities within the governance architecture.
- **Proposed change:** Write explicit compliance, legal advisory, and assurance tracking lines into bom-0-7 to service rq-0-14, rq-0-18, and rq-0-28.

---

## 2. Revised Specification

### 2.1 Scope Definition & Cost Breakdown

The organizational infrastructure operates across a **10-year Phase 0 baseline**. It is structured into two distinct legal layers to isolate mission integrity from operational liability:
1. **Entity A (Governance & Canonical Spec):** Swiss Verein established under Swiss Civil Code (ZGB Art. 60–79), maintaining the copyleft open specification (CERN OHL v2 / CC-BY-SA), sortition-based Charter Trust studies, and immutable mission integrity.
2. **Entity B (Operating & Contracting Arm):** Commercial operating corporation(s) established in jurisdictions with statutory space-resource regimes (e.g., Luxembourg Société Anonyme or US Delaware C-Corp/PBC) to hold FAA/ITU/COSPAR licenses, enter into hardware procurement prime contracts, employ core engineering staff, and execute launch and operational third-party liability (TPL) policies.

#### Cost Model (10-Year Phase 0 Baseline):
- **Corporate & Regulatory Setup:** Formation, multi-jurisdiction structuring, tax rulings, statutory auditing: **$5M** ($3M–$8M).
- **In-House Legal, Regulatory & Governance Staff:** 12–18 FTEs fully burdened at $275k/FTE/yr (General Counsel, Export/Sanctions Compliance, ITU/Spectrum Coordinator, Environmental/NEPA/Planetary Protection Lead, Sortition Secretariat): **$40M** ($30M–$50M).
- **External Retainers & Specialized Filings:** Outside counsel (space law, export/CFIUS, Swiss cantonal), ITU filing fees, COSPAR notifications, FAA payload reviews: **$15M** ($10M–$25M).
- **In-Orbit Third-Party Liability (TPL) Insurance:** Space liability policies for deep-space and orbital operations (excluding launch provider MPL which is wrapped into launch contracts). Market capacity for commercial in-orbit TPL is typically $50M–$250M coverage; estimated annual premiums for fleet deployment across 10 years: **$30M** ($15M–$60M).
- **Knowledge Escrow & Append-Only Archive:** Triple-redundant multi-geopolitical storage (WORM media, optical/tape vault, software maintenance, continuous restore testing, ~50 TB cumulative over 10 yr): **$10M** ($5M–$15M).
- **Contingency (20%):** **$20M** ($15M–$30M).
- **Total bom-0-7 Baseline:** **$120M** (Range: $80M–$190M).

*Note on PM/SE/MA and Financing Reserves:* Program Management, Systems Engineering, and Mission Assurance (PM/SE/MA) for hardware development is specifically **excluded** from bom-0-7; it belongs as programmatic overhead (standard 10–15% on $16B hardware = $1.6B–$2.4B) or inside prime contractor costs. Financial endowment reserves are categorized as treasury/financing, not procurement expenditures.

### 2.2 Parameter Table

| Parameter | Old Value | New Value | Range | Unit | Basis | Confidence |
|---|---|---|---|---|---|---|
| Phase 0 Duration | unspecified | 10 | [7, 12] | yr | Judgement | high |
| Total Cost (bom-0-7) | $50M | $120M | [80, 190] | MUSD (2026) | Calculation (bottom-up) | medium |
| In-House Regulatory Staff | unspecified | 15 | [10, 20] | FTE | Literature (aerospace standard) | medium |
| Legal Entities | 1 | 2 | [2, 3] | entities | Literature (Swiss ZGB / Lux Space Act) | high |
| Archive Storage Volume | unspecified | 50 | [20, 200] | TB | Calculation (engineering docs + telemetry) | medium |
| Terrestrial IT Power | unspecified | 0.02 | [0.01, 0.05] | MW | Calculation (redundant data servers) | high |
| Spacecraft Mass / Orbital Power | unspecified | 0 | [0, 0] | kg / MW | Calculation (ground-only item) | high |
| Governance Body Staggered Term | unspecified | 4 | [3, 5] | yr | Literature (corporate governance) | high |

---

## 3. Interfaces

| Interface With | Flow | Value | In BOM? | Notes |
|---|---|---|---|---|
| bom-0-1 (Prospecting) | Legal/Regulatory | 32 filings | No | ITU spectrum coordination & COSPAR Cat II clearance |
| bom-0-2 (Mining Robots) | Legal/Regulatory | 20 assets | No | Art. VI national authorization & export classifications (EAR/ITAR) |
| bom-0-3 (Processing Station) | Legal/Liability | 1 facility | No | Orbital registration, TPL policy ($10B asset risk retention) |
| bom-0-4 (Tugs) | Regulatory/Safety | 15 spacecraft | No | Conjunction assessment (SSA), propulsion/safety certification |
| bom-0-6 (ISRU Systems) | Legal/Property | 4 sites | No | Space-resource extraction rights under national legislation |
| Ground Segment / Telemetry | Data | ~5–10 TB/yr | No | Secure ingestion into immutable decision journal & archive |

---

## 4. Missing Items or Scope

The current Phase 0 BOM carries an accounting gap: it prices hardware prototypes as isolated items without the programmatic, operational, and financial infrastructure needed to launch and control them.

1. **Program Management, Systems Engineering & Mission Assurance (PM/SE/MA):** Hardware totaling $15.66B requires dedicated flight project management, systems integration, interface verification, and risk management. NASA/ESA flight-heritage standards dictate 10–18% of hardware costs. **Add line: $1.8B [$1.5B, $2.5B].**
2. **Launch & Trans-Lunar/Interplanetary Injection:** The BOM prices satellites and processing stations dry at factory gate. Launching ~100+ tonnes of prospecting, mining, and tug assets to deep space requires dedicated heavy lift. **Add line: Launch & Orbit Delivery, $2.5B [$1.5B, $4.0B].**
3. **Deep-Space Communications & Mission Operations (Ground Segment):** Network operations centers, DSN/ESTRACK lease time, flight software ops teams over 10 years. **Add line: Ground Segment & Operations, $600M [$400M, $1.0B].**
4. **Endowment / Treasury Reserve:** Buffer for multi-year cash flow stability against geopolitical shifts. Managed as capital financing, not expensed hardware.

---

## 5. Remaining Disagreements and Open Questions

1. **Jurisdictional Independence vs. Treaty Enforcement:** Under Article VI of the Outer Space Treaty, non-governmental entities require authorization and continuing supervision by an appropriate State Party. Can the project maintain its "planned fragmentation" and neutrality when its operating arm must strictly comply with national export controls (e.g. US ITAR / Lux legislation) that can mandate censorship of dual-use hardware specifications?
2. **Sortition Efficacy in Technical Capital Projects:** While sortition is robust against political factional capture, randomly selecting trustees from a non-specialist or self-selected pool to oversee multi-billion-dollar aerospace capital decisions risks paralysis or capture by permanent staff. The exact role, qualification screening, and term length (e.g., 4 vs 15 years) remains disputed.
3. **Phase 0 Duration & Boundary:** Whether Phase 0 is 5 years ($50M ceiling) or 10 years ($120M–$160M) depends on whether flight demonstration is included or if Phase 0 is purely analytical/prototyping.

---

## 6. Decision-Quality Critique

### Decision 1: Establishing a Two-Layer Legal Architecture (Swiss Verein + Commercial Operating Entity)

```
                       ┌───────────────────────────────┐
                       │  Entity A: Swiss Verein       │
                       │  - Governance & Mission Trust │
                       │  - Open Hardware Spec (CERN)  │
                       └──────────────┬────────────────┘
                                      │ Enforces Charter
                                      ▼
                       ┌───────────────────────────────┐
                       │  Entity B: Operating Entity   │
                       │  (Luxembourg S.A. / US Corp)  │
                       │  - Licenses, Contracts, Staff │
                       │  - ITU, TPL, Launch Permits   │
                       └───────────────────────────────┘
```

#### 1. Frame & Decision Type
- **Frame:** How to maintain multi-century mission fidelity, open specifications, and resistance to state capture while simultaneously acquiring binding legal standing to enter commercial contracts, procure aerospace hardware, obtain launch licenses, and satisfy OST Article VI/VII state supervision.
- **Type:** Executive / Structural architectural decision. Reversible in early phases via restructuring, but highly sticky once contracts and frequency filings are executed (Two-way door early, One-way door post-procurement).
- **Domain:** Complex (Cynefin).

#### 2. Criteria and Weights (Swing Weights, 100 pt total)
- **C1: Regulatory Feasibility & Licensing Authority:** Ability to hold space licenses, ITU spectrum slots, and launch clearances under existing international space law (Weight: 35).
- **C2: Anti-Capture & Mission Persistence:** Resistance to hostile corporate takeover, state expropriation, or commercial pivot across generations (Weight: 30).
- **C3: Operational Agility & Contracting Speed:** Ability to hire aerospace talent, issue binding multi-million-dollar subcontracts, and hold intellectual property/trade-secret access without bureaucratic gridlock (Weight: 20).
- **C4: Tax Efficiency & Jurisdictional Neutrality:** Minimizing friction in international cross-border transfers and protecting core mission specifications under political neutrality (Weight: 15).

#### 3. Options
- **Option 1 (Baseline - Unitary Swiss Verein):** Single Swiss Verein directly hires staff, holds assets, signs procurement contracts, and interfaces with regulators.
- **Option 2 (Bifurcated Structure):** Swiss Verein holds mission charter, sorts trustees, and licenses the canonical specification (CERN OHL) to a wholly or partially controlled operating subsidiary (Luxembourg S.A. or US Benefit Corp) that manages operations, contracting, and regulatory compliance.
- **Option 3 (Distributed Consortium / Foundation):** Decentralized network of peer foundations operating by treaty-like bilateral MoUs across 5 jurisdictions without a centralized operating subsidiary.

#### 4. Assessment Matrix (QOC / Kepner-Tregoe Scoring: 1–5 Scale)

| Criteria (Weight) | Option 1: Unitary Verein | Option 2: Bifurcated Structure | Option 3: Distributed Consortium |
|---|---|---|---|
| **C1: Regulatory (35)** | 2 (Switzerland lacks statutory commercial space-mining legislation; Art VI path ambiguous) | **5** (Subsidiary in Luxembourg/US directly accesses established space-resource statutes) | 3 (Fragmented licensing risks conflicting state obligations) |
| **C2: Anti-Capture (30)** | 4 (Strong Swiss statutory protection for non-profits, but vulnerable to liability piercing) | **4** (Liability firewall protects Verein; mission locked by charter covenants) | 5 (High structural redundancy across jurisdictions) |
| **C3: Agility (20)** | 2 (Consensus/volunteer governance ill-suited for multi-million-dollar supply contracts) | **4** (Standard corporate subsidiary executes standard FAR/commercial aerospace contracts) | 1 (Severe coordination paralysis across independent foundations) |
| **C4: Neutrality (15)** | 5 (Swiss neutrality well-established) | **4** (Verein remains neutral; subsidiary operates under host nation commercial law) | 4 (Geographically diversified but complex tax status) |
| **Weighted Total** | **3.05 / 5.00** | **4.45 / 5.00** | **3.10 / 5.00** |

#### 5. Sensitivity vs. Trade-Off Points (ATAM Analysis)
- **Trade-off Point:** *Mission Openness vs. Regulatory Compliance.* Openness and neutrality pull toward a pure Swiss association with copyleft licensing. National security and launch authorization pull toward an operating entity in a spacefaring nation subject to export control (ITAR/EAR). The two-layer structure is the direct architectural compromise.
- **Sensitivity Point:** The legal enforceability of the charter covenants between Entity A and Entity B. If local corporate law renders the operating subsidiary's directors personally liable for prioritizing the Verein charter over local fiduciary/creditor duties, the firewall collapses.

#### 6. Evidence Certainty (GRADE / IPCC Framework)
- **Space Resource Law Status:** High confidence ($>90\%$ likelihood). Verified statutory regimes exist in the US (CSLCA 2015), Luxembourg (2017), UAE (2019), and Japan (2021). Switzerland has ratified the OST (1969) but lacks domestic implementing legislation for private off-world resource exploitation.
- **Corporate Liability Ring-Fencing:** Moderate confidence ($60\text{--}80\%$ likelihood). Piercing the corporate veil is rare in civil and common law without fraud, but deep-space environmental damage / catastrophic collision creates untested tort liability under Article VII OST.

#### 7. Key Assumptions & Disconfirmation (ACH / Premortem)
- **Assumption 1:** A non-profit Swiss Verein can legally and effectively maintain voting or covenant control over a commercial aerospace operating corporation without making the Verein liable for the subsidiary's space-flight torts.
  *Disconfirmation Test:* Legal review by Swiss and Luxembourgish corporate counsel demonstrating that directional control breaches limited liability under cross-border corporate governance doctrines.
- **Assumption 2:** National regulatory bodies (e.g. Luxembourg Space Agency, US FAA/AST, FCC) will issue operating licenses to a commercial entity whose ultimate charter obligates public disclosure of engineering specs under CERN OHL.
  *Disconfirmation Test:* Rejection of license application under national export control (e.g. ITAR 120.10 definition of public domain vs defense services).

#### 8. Decision, Warrant & Accepted Downside (Toulmin / Y-Statement)
- **Statement:** *In the context of multi-century interplanetary infrastructure development, facing the incompatibility between volunteer-driven open-source governance and sovereign space-regulatory licensing, we decide to establish a bifurcated legal architecture (Swiss Verein for canonical governance and specification ownership; commercial operating subsidiary for procurement, licensing, and liability), to achieve full regulatory compliance and contracting capacity while insulating core mission integrity, accepting the added overhead of multi-entity administration, tax filing complexity, and cross-border governance tensions.*
- **Warrant:** Operating aerospace hardware requires state sponsorship under Article VI of the OST; states only sponsor legal persons subject to their jurisdiction. A pure unincorporated or non-profit volunteer association cannot satisfy these statutory burdens.
- **Accepted Downside:** Administrative overhead of maintaining multiple legal entities ($3M–$5M initial, ~$1M/yr maintenance), plus structural friction between the volunteer/sortition council and commercial executive leadership.

#### 9. Weakest Link in Decision Quality Chain
- **Information.** The interface between international space resource rights (Artemis Accords vs. Moon Agreement signatories) and copyleft hardware licensing is unprecedented. We lack empirical precedent for a copyleft entity operating industrial-scale deep-space resource extraction.

---

### Decision 2: Sizing and Scope Boundary for bom-0-7 ($50M vs. $120M vs. Sized with PM/SE)

#### 1. Frame & Decision Type
- **Frame:** Does bom-0-7 cover strictly corporate/governance/licensing legal infrastructure ($80M–$190M), or must it absorb program-level systems engineering, launch risk insurance, and PM ($1.5B–$3.0B)?
- **Type:** Executive / WBS Architectural Decomposition.
- **Domain:** Complicated (Cynefin).

#### 2. Trade-Off Analysis & Reconciliation
- Conflating organizational/legal infrastructure with Program Management / Systems Engineering / Mission Assurance (PM/SE/MA) breaks standard aerospace work breakdown structures (NASA NPR 7120.5 standard WBS).
- Sizing bom-0-7 at $50M is an artifact of treating it as a 5-year web-based open-source foundation, ignoring 10-year regulatory filings, in-orbit third-party liability insurance, and compliance retainers across 32 satellites and 20 mining systems.
- Conversely, inflating bom-0-7 to $2B+ by stuffing flight systems integration into a Swiss non-profit line item creates false governance overhead.
- **Resolution:**
  - Resize **bom-0-7 to $120M (range $80M–$190M)** for corporate, legal, licensing, sortition governance, and archival storage.
  - Create an explicit new BOM line for **Program Management & Systems Engineering (PM/SE/MA)** at **$1.8B [$1.5B, $2.5B]** (~11.5% of Phase 0 flight hardware).
  - Treat launch provider third-party liability as an element wrapped into launch service contracts, but retain an in-orbit TPL insurance pool ($30M baseline) inside bom-0-7.

---

```yaml
item: bom-0-7
model: claude-opus-4-6
findings:
  - id: P0-F13
    verdict: agree
    summary: bom-0-7 completely lacks an engineering and legal specification, which blocks procurement, licensing, and launch execution across all other phase items.
    proposed_change: Adopt a complete specification detailing a two-layer legal structure (Swiss Verein plus commercial operating subsidiary), 10-year baseline costing, regulatory compliance pathways, and knowledge archive specs.
  - id: P0-F15
    verdict: agree
    summary: Concluded deliberations rq-0-14, rq-0-18, and rq-0-28 directly impose regulatory, safety assurance, and independent auditing burdens that were never integrated into bom-0-7.
    proposed_change: Expand bom-0-7 scope to incorporate space-resource rights legal filings (rq-0-14), flight-safety assurance oversight (rq-0-18), and independent cost-estimation capabilities (rq-0-28).
revised_spec:
  - parameter: phase_duration
    old: unspecified
    new: 10
    range: [7, 12]
    unit: yr
    basis: judgement
    confidence: high
  - parameter: total_cost
    old: $50M
    new: 120
    range: [80, 190]
    unit: MUSD
    basis: calculation
    confidence: medium
  - parameter: in_house_regulatory_staff
    old: unspecified
    new: 15
    range: [10, 20]
    unit: FTE
    basis: literature
    confidence: medium
  - parameter: legal_entities_count
    old: 1
    new: 2
    range: [2, 3]
    unit: entities
    basis: literature
    confidence: high
  - parameter: archive_storage_volume
    old: unspecified
    new: 50
    range: [20, 200]
    unit: TB
    basis: calculation
    confidence: medium
  - parameter: terrestrial_power
    old: unspecified
    new: 0.02
    range: [0.01, 0.05]
    unit: MW
    basis: calculation
    confidence: high
  - parameter: spacecraft_mass
    old: unspecified
    new: 0
    range: [0, 0]
    unit: kg
    basis: calculation
    confidence: high
  - parameter: board_term_length
    old: unspecified
    new: 4
    range: [3, 5]
    unit: yr
    basis: literature
    confidence: high
interfaces:
  - with: bom-0-1
    flow: other
    value: 32 filings (ITU/COSPAR)
    in_bom: false
  - with: bom-0-2
    flow: other
    value: 20 assets (licensing/export)
    in_bom: false
  - with: bom-0-3
    flow: other
    value: 1 facility (TPL policy)
    in_bom: false
  - with: bom-0-4
    flow: other
    value: 15 spacecraft (SSA/safety)
    in_bom: false
  - with: bom-0-6
    flow: other
    value: 4 sites (resource claims)
    in_bom: false
  - with: ground_segment
    flow: data
    value: 10 TB/yr (archival data)
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-7
    quantity: 1
    unit_cost_usd: [80000000, 190000000]
    rationale: Sized for a 10-year baseline covering multi-entity legal maintenance, in-house regulatory FTEs, specialized counsel, in-orbit TPL insurance, and append-only archival infrastructure.
  - action: add
    item: program_management_systems_engineering
    quantity: 1
    unit_cost_usd: [1500000000, 2500000000]
    rationale: Essential flight project management, systems integration, safety, and mission assurance standard for ~$16B aerospace hardware portfolio (excluded from bom-0-7).
  - action: add
    item: launch_and_orbital_delivery
    quantity: 1
    unit_cost_usd: [1500000000, 4000000000]
    rationale: Trans-lunar and deep-space launch/injection costs for prospecting fleet, mining robots, and processing station mass.
  - action: add
    item: mission_operations_and_ground_segment
    quantity: 1
    unit_cost_usd: [400000000, 1000000000]
    rationale: Ground tracking stations, mission control facilities, and deep-space network time over 10 years of operations.
open_questions:
  - Can an open-source copyleft hardware charter survive national export control restrictions (ITAR/EAR) when operating dual-use space robotics?
  - Will national space-licensing bodies permit ultimate governance oversight by a sortition-selected international assembly?
  - How will third-party liability indemnification above available commercial insurance capacity be backstopped without sovereign state underwriting?
```
