---
bomId: "bom-0-7"
itemName: "Organizational Infrastructure"
itemSlug: "organizational-infrastructure"
modelId: "claude-opus-5-5"
modelName: "Claude Opus 5.5"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-7 Organizational Infrastructure: Phase 0A Technical Proposal

**Project Dyson, Phase 0: Space Resource Processing (revised architecture, post-2026 re-assessment)**
**Item owner:** Governance & Legal. **Status:** Proposal for the configuration baseline; not yet adopted.
**Funding status:** 0A funded under D-01. The 0B increment is shown separately and is sized at KDP-0B.

---

## 0. Executive summary

bom-0-7 is the legal, governance, regulatory and coordination infrastructure that makes the rest of Phase 0 legally executable. It covers:

- the entities that hold contracts, licences and liability;
- the authority that decides gates;
- the filings that make a spacecraft lawful to launch and operate;
- the independent review that keeps the programme honest.

It has no orbital mass, no orbital power and no propellant. Its failure mode is not cost overrun. Its failure mode is that a correctly built pathfinder sits on the ground because nobody holds an authorization, a frequency assignment or an export classification.

**My central recommendations**

| # | Recommendation | Basis |
|---|---|---|
| R1 | **Two legal entities**: a member-governed Association (owner) and a separately accountable Operator (licence holder). A third entity only if the export study demands it. | Panel consensus. Separation limits tort and regulatory exposure of the owner. |
| R2 | **Select the Operator's licensing state by a must/want screen within 12 months.** Luxembourg is the lead candidate, the US the alternate. | Authorization lead times put this decision on the Phase 0A critical path (§7). |
| R3 | **Cost as a run-rate plus one-time costs, bounded to the 0A period. Do not use a 10-year total.** | D-01 funds 0A only. A 10-year figure pre-commits 0B organizational spend. |
| R4 | **0A cost: $64M central over a 7-year 0A** (plausible $40–100M; scenario corners $30–130M). This excludes programme contingency, which sits in bom-0-17. | §9 bottom-up estimate. |
| R5 | **0B increment: $34M central** (plausible $20–55M), authorized only at KDP-0B. | §9. |
| R6 | **No flight insurance premiums in bom-0-7.** bom-0-7 administers insurance and holds the requirement. Premiums travel with the flight item (bom-0-12, bom-0-4, bom-0-8). | Avoids scope conflation, which was the largest driver of round-2 spread. |
| R7 | **Liquidity reserve ($8–20M) and a wind-down/safe-disposal escrow ($3–10M for 0A) are financing lines, not expenditure.** | Panel consensus on treatment. My own sizing. |
| R8 | **bom-0-7 owns the licence gate outright and the contract instrument for the demand gate.** | D-02. |
| R9 | **bom-0-7 owns command-authority policy and root-key custody for T26.** The comms service itself stays in bom-0-9 and bom-0-10. | T26 is architecture-changing. Authority and spectrum must not be locked to one architecture. |
| R10 | **Rate P0-F13 "major (schedule) / minor (cost)"** and track it on the critical path, not the cost register. | §7 critical-path analysis. |

**Where I depart from the round-2 envelope ($100–350M)**

My full-Phase-0 central estimate of about $98M sits at the bottom of that range, and my funded 0A commitment is about $64M. The gap comes from four things:

1. I exclude contingency, which would otherwise be double-counted with bom-0-17.
2. I exclude flight TPL premiums.
3. I refuse to pre-fund 0B-scale operations before KDP-0B.
4. My governance-archive cost is small, because engineering data belongs to bom-0-9 and PM/SE.

---

## 1. Design philosophy

1. **Authority before hardware.** Every flight item eventually needs an authorizing state, a registry entry, a frequency assignment, an export classification and a planetary-protection determination. These have fixed external lead times that money cannot compress. bom-0-7 is therefore scheduled backwards from the first pathfinder launch.

2. **Stringency follows reversibility (D-02).** The scale of approval depends on whether the decision can be undone:

   | Decision type | Examples | Approval |
   |---|---|---|
   | Reversible | Office location, tooling, advisory panel design | Officer level |
   | Hard to reverse | Licensing state, open licence choice, operator charter | Board, with legal opinion |
   | One-way | KDP-0B industrial commitment, any trajectory bringing >100 t toward Earth's vicinity | Both boards, independent review concurrence, public disclosure of any override |

3. **Separate owning from operating.** The Association decides what and whether. The Operator decides how, holds the licence and carries operational liability. A regulator must be able to identify one accountable operator. An owner that directs operations day-to-day risks being treated as the de facto operator.

4. **Open by default, closed by necessity, classified before release.** Designs are open (CERN OHL v2, CC BY-SA). Export-controlled data goes in a controlled annex. Command-authentication material is never published. Open design does not mean open keys.

5. **Govern what you can measure.** Every deliberation gets a disposition. Every gate has written pass criteria. Every number in the baseline has an owner, a basis and a falsifier.

6. **Small, professional core.** The organization runs on a core of roughly 16 FTE, with outside counsel used surgically. Volunteer contributors feed the engineering commons but do not hold licence-critical roles.

---

## 2. Scope definition (WBS dictionary entry)

### 2.1 In scope

| Code | Function | Notes |
|---|---|---|
| 7.1 | Legal entities and corporate governance | Formation, charters, boards, intercompany agreements, tax status, audit |
| 7.2 | Regulatory authorization and licensing | Mission authorization, registration, licence-gate dossier |
| 7.3 | Spectrum and ITU filings | Via the licensing state's administration |
| 7.4 | Space-resources legal programme | Carried over from rq-0-14 |
| 7.5 | Export control and release classification | Classification gate on every public release |
| 7.6 | Planetary-protection regulatory coordination | The engineering inputs come from other items |
| 7.7 | Insurance administration and risk-transfer strategy | Brokers, specifications, corporate policies. Flight premiums excluded. |
| 7.8 | Independent Safety Authority (ISA) | Carried over from rq-0-18. Organizational review only. |
| 7.9 | Independent Cost Review (ICR) | Carried over from rq-0-28 |
| 7.10 | Gate administration | Licence gate (owned); demand-gate contract instrument; KDP secretariat |
| 7.11 | Configuration-baseline authority and disposition register | Authority matrix and change-control board (CCB) charter. Execution sits in PM/SE. |
| 7.12 | Command authority and root-key custody policy | The governance half of T26 |
| 7.13 | IP and open-licence policy | Including industrial-partner terms for 0B |
| 7.14 | Governance records archive and succession | Includes operator-of-last-resort arrangements |
| 7.15 | Financing instruments | Liquidity reserve and wind-down escrow, held as financing |

### 2.2 Explicitly out of scope (with the owning item)

| Scope | Owner |
|---|---|
| Programme management, systems engineering, mission assurance (PM/SE/MA) | **Not currently assigned in the Phase 0 BOM; see Open Question OQ-1** |
| Ground stations, DSN or commercial aperture contracts, link engineering | bom-0-9 |
| Flight control, operational command keys, on-console operations | bom-0-10 |
| ALARP debris analysis and the interim design-ceiling number | bom-0-15 (bom-0-7 carries it to the regulator) |
| Launch services and launch-phase third-party liability | bom-0-8 (normally under the launch provider's licence) |
| Flight-specific insurance premiums | bom-0-12 for the pathfinder; bom-0-4 and bom-0-8 for 0B |
| Programme contingency | bom-0-17 |
| Engineering data storage, telemetry archives | bom-0-9 and PM/SE |
| Propellant supply audit | bom-0-16 |

**Disagreement flagged (OQ-1).** The round-2 reconciliation proposed a PM/SE/MA line (D3, $1.5–3.5B). That line does not appear in the bom-0-1 to bom-0-17 list, and none of the listed items obviously contains it. It must not drift into bom-0-7: governance is not execution, and the panel was unanimous on that. Either create the line, or the WBS dictionary must show it embedded in each hardware item. This is the single largest unowned scope risk I can see in the Phase 0 BOM, and bom-0-7 should raise it at the first CCB.

---

## 3. Physical and resource specifications

bom-0-7 has no orbital hardware. Its resource envelope is:

| Parameter | Value | Range | Basis |
|---|---|---|---|
| Orbital mass | 0 t | 0 | Panel consensus, high confidence |
| Orbital power | 0 MW | 0 | Panel consensus |
| EP propellant | 0 t/yr | 0 | Panel consensus |
| Terrestrial power | 0.02 MW | 0.01–0.05 | 2 small offices (5–10 kW), 3 key-custody/HSM sites (≤1 kW each), archive nodes (1–3 kW). Mostly remote workforce. Not drawn from bom-0-5. |
| Staff, 0A steady state | 16 FTE | 14–20 | §8 |
| Staff, 0A ramp (years 1–2) | 10 FTE | 8–12 | §8 |
| Staff, 0B increment | +6 FTE | +4–8 | §8 |
| Legal entities | 2 | 2–3 | §4 |
| Jurisdictions with physical presence | 2 | 2–3 | Operator state plus Association state, if different |
| Root-key custody sites | 3 | 3 | 3-of-5 quorum, ≥2 jurisdictions (§6) |
| Governance archive ingest | 1 TB/yr | 0.5–3 | Board, legal, regulatory and disposition records |
| Released-baseline escrow ingest | 10 TB/yr | 5–20 | Released configuration baselines only. Not raw telemetry. |
| Archive copies | 3, independently administered | 3 | Panel consensus |
| Archive restore test | Annual full restore; quarterly sample restore | — | Annual is the panel figure. I add quarterly samples, because restore failures are usually found late. |

**Archive sizing check.** Over a 7-year 0A, about 77 TB of logical data is held in 3 copies, roughly 230 TB raw. At cloud-archive or tape costs of about $1–5/TB-month, storage is $0.05–0.15M/yr even at the end of 0A. Labour and testing dominate. I therefore disagree with Gemini's $10M archive line: the governance archive costs under $3M across all of 0A, labour included.

---

## 4. System architecture: entities and governance

### 4.1 Entity structure

```
                    ┌─────────────────────────────────────────────┐
                    │      MEMBERS / CONTRIBUTORS ASSEMBLY        │
                    │  (elects Association Board; ratifies charter│
                    │   changes by 2/3; advisory sortition panel) │
                    └───────────────────┬─────────────────────────┘
                                        │ elects (staggered)
                    ┌───────────────────▼─────────────────────────┐
  ENTITY A          │     PROJECT DYSON ASSOCIATION (owner)        │
  (Swiss Verein     │  Board: 7 (5–9), 3-yr staggered, max 2 terms│
   provisional;     │  Reserved matters only:                     │
   co-location      │   • charter & mission  • KDP-0B approval    │
   with Operator    │   • Operator board appointments (minority)  │
   state preferred  │   • budget envelope   • open-licence policy │
   on tie)          │  Hosts: Independent Cost Review (ICR)       │
                    │         Disposition Register (owner copy)   │
                    └──────┬────────────────────────────┬─────────┘
                           │ 100% shareholder,          │ funds via
                           │ shareholder agreement      │ grant/service
                           │ (reserved matters list)    │ agreement
                    ┌──────▼────────────────────────────▼─────────┐
  ENTITY B          │        OPERATOR (licence holder)             │
  (Luxembourg lead; │  Board: 5 — 2 Association-nominated,        │
   US alternate;    │         3 independent (space/legal/finance) │
   selected by J-   │  Holds: mission authorizations, registry    │
   gate, §7)        │   entries, ITU assignments (via admin),     │
                    │   prime/sub contracts, insurance, export    │
                    │   licences, root command authority          │
                    │  Committees: Safety (hosts ISA), Audit/Risk │
                    └──────┬───────────────┬────────────────┬─────┘
                           │               │                │
                 ┌─────────▼───┐   ┌───────▼──────┐  ┌──────▼────────┐
                 │ Programme   │   │ Independent  │  │ General       │
                 │ Director    │   │ Safety Auth. │  │ Counsel /     │
                 │ (PM/SE/MA — │   │ (reports to  │  │ Regulatory    │
                 │  NOT bom-0-7│   │  Safety Cttee│  │ (bom-0-7)     │
                 │  scope)     │   │  not to PD)  │  └───────────────┘
                 └─────────────┘   └──────────────┘

  OPTIONAL ENTITY C (only if the export study requires it): a contracting
  subsidiary in the US, to procure US launch/components and hold US
  export licences. It would sit behind a technology control plan.
```

**Why the Operator has an independent-majority board.** A regulator applying "authorization and continuing supervision" (Outer Space Treaty Art. VI) needs to see that the licensee itself controls operations. If the Association's nominees held a majority and the Association directed operations, the owner could be treated as the operator. That would erode the separation that justifies two entities. Under this design the Association controls *whether* through its reserved matters. It does not control *how*.

**Disagreement with Gemini's Option 2 detail.** In Gemini's Option 2 the Verein "sorts trustees." I would not give a sortition body any appointment power over the licence holder in Phase 0. The evidence base for sortition in asset-holding or safety-critical governance is low; Claude and GPT are right on this, and Gemini's "high, literature" label should be downgraded. In Phase 0, sortition is used only for an **advisory panel** of 15–25 members on values questions: openness versus export restriction, and the distribution of resource benefits. That panel has a published-response obligation, not a veto.

**Charter Trust.** This is a Phase 0 design study only: $0.3–1.0M, including a red-team takeover exercise and funding-control simulations. The establishment decision is made at a milestone no earlier than KDP-0B.

### 4.2 Operator jurisdiction selection (decision J, due month 12)

Must-criteria are pass/fail. Weighting cannot rescue an option that fails one.

| Must-criterion | Test |
|---|---|
| M1 | A national regime under which a private deep-space resource mission can be authorized and supervised |
| M2 | The state's ITU administration will file and maintain space research service networks for the operator |
| M3 | A non-profit-owned operator is eligible to hold the authorization |
| M4 | Export-control regime compatible with open publication of non-controlled design data |
| M5 | State is party to the OST, Liability and Registration Conventions |

Want-criteria (weights illustrative, not measured utilities):

| Want-criterion | Weight |
|---|---|
| Authorization clarity and lead time | 0.25 |
| Liability and insurance regime (required limits, state indemnity) | 0.20 |
| Launch and industrial access | 0.20 |
| Neutrality and political durability | 0.15 |
| Tax and charitable treatment of intra-group flows | 0.10 |
| Cost of presence | 0.10 |

**Candidates and my prior** (to be overturned by counsel opinions; every legal statement here needs counsel verification):

- **Luxembourg (lead).** It has a dedicated space-resources law (2017) and a space-activities authorization law (2020) (*verify both*). It has an established agency and administration, and is neutral within Europe. Weakness: launch access is entirely third-party.
- **United States (alternate).** CSLCA 2015 recognizes resource rights for US citizens (51 U.S.C. ch. 513, *verify*), and launch and industrial access is strong. Weakness: there is no settled mission-authorization path for novel in-space activities (*verify current status*). ITAR/EAR exposure also hits a programme whose charter mandates open publication.
- **Japan.** It has a 2021 space-resources act (*verify*) and is a credible alternate. Weaknesses: language and cost of presence, and less familiarity with non-profit operators.
- **Switzerland as Operator state.** I do not recommend it as the baseline. Its status should be verified, but Claude reports no comprehensive space act in force. The panel's caution not to assert Swiss law "from stale text" applies to the Association location as well.

**Decision rule.** Run M1–M5 with written counsel opinions in each of 3–4 states ($0.5–1.5M). Hold one pre-application meeting with each surviving regulator. Score the survivors. Tie-break: co-locate the Association with the Operator. One regulator and one tax authority beats Swiss neutrality if the scores are close.

### 4.3 Board and term parameters

| Body | Size | Term | Limit | Notes |
|---|---|---|---|---|
| Association Board | 7 (5–9) | 3 yr staggered (2-2-3) | 2 consecutive terms | Thirds rotate, so no wholesale capture in one election |
| Operator Board | 5 | 3 yr staggered | 3 terms for independents | Majority independent. Licence-relevant fitness test. |
| Standing Review Board (SRB) | 5–7 external, part-time | Per-gate engagement | — | Supports ISA and ICR at KDPs |
| Advisory sortition panel | 15–25 | 18 months | 1 | Stipended. Published-response obligation. |
| Leadership overlap on executive succession | 6 months | 3–12 | — | Mandatory handover for General Counsel, ISA head and Secretary-General |

**Funding caps.** These are disclosed targets: no single funder above 25% of 3-year trailing revenue. A time-limited exception of up to 24 months is allowed, with board resolution and public disclosure. Hard caps would make 0A unfundable in early years. Undisclosed concentration is the actual capture risk.

---

## 5. Subsystem specifications

### 5.1 Regulatory authorization and licensing (7.2)

**Deliverables**

- **Pathfinder (bom-0-12) mission authorization dossier.** Mission description, safety case, debris ALARP case, planetary-protection determination request, insurance evidence and registration data.
- **0B pre-authorization dossier**, prepared in late 0A. It feeds the licence gate.
- A regulator engagement log and a commitments register. Every promise made to a regulator becomes a tracked requirement in the baseline.

**Key regulatory insight from D-04 (SEL1 receiving node)**

0B tugs will deliver 150–300 t Fe-Ni payloads to Sun–Earth L1, about 1.5 × 10⁶ km from Earth. Two consequences follow:

1. **Earth-proximity hazard.** A 300 t iron mass is about a 4.2 m sphere (ρ ≈ 7,900 kg/m³). Iron bodies of this size survive atmospheric entry in part. An Earth-impact probability requirement per transfer and per fleet-year is therefore a licensing driver for 0B, not just a good-practice item.
   - The analysis belongs to bom-0-15 and mission design.
   - bom-0-7 owns negotiating the threshold with the licensing state, in line with D-03's ALARP-plus-interim-ceiling approach.
   - I recommend proposing the regulator be asked to accept a ceiling no looser than 10⁻⁶ per transfer for Earth-intersecting failure modes, with ALARP below that. This is a placeholder for the D-03 process, not a baseline number.
2. **Third-party liability is no longer negligible in 0B.** Damage on Earth's surface falls under absolute liability (Liability Convention Art. II). This contradicts the round-2 assumption that deep-space operations have "essentially no third parties." That holds for 0A NEA operations and the pathfinder cruise. It does not hold for 0B deliveries to SEL1. Claude's own reopening trigger ("if bom-0-4 brings material toward Earth") is met by D-04.

**Planetary protection**

- COSPAR policy is guidance implemented by the national authority. It is not a permit and is not "filed with COSPAR."
- The expected outcome is Category II for the NEA and Category V "unrestricted Earth return" logic for any Earth-approaching product. This must be a mission-specific determination.
- **Open point.** It is not established whether delivery to SEL1 without atmospheric entry is treated as "Earth return." bom-0-7 requests a formal determination at pre-application.

### 5.2 Spectrum and ITU (7.3)

- **Two ITU regimes.** The NEA site (at >2 × 10⁶ km) is deep space under the ITU definition (RR No. 1.177, *verify*). The SEL1 node (about 1.5 × 10⁶ km) is **not** deep space and uses near-Earth space research allocations. Phase 0 therefore needs filings in both regimes.

  | Location | Regime | Typical bands (indicative) |
  |---|---|---|
  | NEA site | Deep-space SRS | X: 7145–7190 MHz up / 8400–8450 MHz down. Ka: 34.2–34.7 GHz up / 31.8–32.3 GHz down. |
  | SEL1 node | Near-Earth SRS | S: 2025–2110 / 2200–2290 MHz. X: 8450–8500 MHz. Ka: 25.5–27 GHz down. |

- **Architecture-neutral filings (T26 linkage).** T26 is TRL 3 with AD² 4, flagged "architecture-change." The comms architecture may move away from DSN-style apertures, for example to commercial deep-space ground networks or optical. Filings must therefore cover X and Ka in both regimes, so that no architecture change forces a re-filing. Optical links are largely outside ITU coordination, but they need national coordination for ground laser safety.
- **Lead time.** Advance publication information is normally submitted no earlier than about 7 years and no later than about 2 years before bringing into use (*verify current RR provisions*). This sets the first critical-path milestone (§7).
- **Cost.** ITU cost-recovery fees run roughly CHF 10–100k per filing depending on complexity (*verify*), plus administration fees. $0.1–0.4M/yr is allowed.

### 5.3 Space-resources legal programme (7.4, from rq-0-14)

- Opinions on resource-rights recognition in the Operator state.
- Compatibility with the Artemis Accords and positions taken in the UN COPUOS working group on space resources (*verify current status*).
- Treatment of Fe-Ni product transferred to a Phase 1 entity, which may be in a different state.
- Benefit-sharing policy, as a values question for the Association and its advisory panel.
- **Budget: $2–6M one-time (central $3.5M) plus 1 FTE.**

**Note on rq-0-14 "25 kt/yr".** Its meaning is undefined. If it means hydrogen output, it implies 140–190 MW of electrolysis, which is incompatible with Phase 0. It also conflicts with the current 0.6–2.5 kt/yr product range and with the abandoned LOX/LH₂ line. bom-0-7 dispositions it as **SUPERSEDED** and records the reason in the register. It does not carry it forward as a legal scale assumption.

### 5.4 Export control and release classification (7.5)

A three-tier release model:

```
  ┌───────────────┐    ┌───────────────────────┐    ┌──────────────────┐
  │ Author/owner  │───▶│ Classification gate   │───▶│ Tier assignment  │
  │ submits item  │    │ (Export Control Off.) │    └───┬────┬────┬────┘
  └───────────────┘    │ SLA: 10 working days  │        │    │    │
                       │ standard; 30 days if  │        ▼    ▼    ▼
                       │ agency ruling needed  │     OPEN  CTRL  SEC
                       └───────────────────────┘
  OPEN : CERN-OHL-S v2 (designs), CC BY-SA 4.0 (docs), CC BY 4.0
         (interface standards), Apache-2.0 (software). Public repo.
  CTRL : Controlled annex. Named-person access under licence/TCP.
         Expected: EP thruster detail, some GNC, certain processing
         know-how (verify categories; ITAR USML XV / EAR 9x515
         candidates).
  SEC  : Command authentication, key material, vulnerability data.
         Never published. Need-to-know.
```

- **Initial full-baseline classification: $0.5–2.0M one-time**, including any formal jurisdiction or commodity-classification requests.
- **Release SLA metrics:** at least 90% of items within 10 working days. The publication-compliance target is 0 unclassified releases. Any breach triggers a root-cause review reported to the Operator Audit/Risk Committee.
- **Licence choice (my opinion).**
  - CERN OHL v2-S for project-originated hardware.
  - CC BY 4.0 rather than BY-SA for interface standards. Interfaces should be maximally adoptable, including by proprietary suppliers to Phase 1.
  - Apache-2.0 for software. OHL does not cover software well, and Apache's patent grant matters.
  - This narrows the panel's "CERN OHL v2 + CC" consensus. It does not contradict it.

### 5.5 IP policy for industrial partners (7.13, 0B-relevant)

- **Partner background IP**, such as proprietary process know-how, may remain proprietary. It must carry:
  - a perpetual, royalty-free licence-back to the Operator for programme use;
  - source or know-how escrow released if the partner exits.
- **Foreground IP** funded by the programme is open per §5.4.
- **Interfaces are always open.**
- **Values trade-off.** Mandatory copyleft on partner know-how would shrink the 0B bidder pool. In my judgement 0B cannot afford that. The Association Board decides, with advisory panel input.

### 5.6 Insurance administration (7.7)

bom-0-7 carries:

| Element | Annual cost |
|---|---|
| Corporate policies: D&O, general liability, cyber, E&O, property | $0.2–0.6M/yr total |
| Broker retainer | |
| Insurance specification for each flight | |
| Collection of indications before each KDP | |
| Liaison with the launch provider on licence-holder-of-record | |

Distinct quantities, which round 1 conflated:

```
 Statutory/required limit (set by licensing state)
 Maximum probable loss (MPL, from safety case)
 Policy limit purchased
 Premium (expense, carried by flight item)
 Retention / self-insurance (financing, separate reserve line)
 State indemnification above limit (jurisdiction-dependent)
```

**Interface estimate passed to bom-0-12 (not costed here).** In-orbit TPL premium for the 0A pathfinder: **$0.5–3M total**. The basis is deep-space cruise with a short Earth-departure phase, with launch TPL under the launch provider. This is unverified until a broker indication is obtained, due by pathfinder PDR.

**0B.** Given §5.1, TPL for SEL1 deliveries is plausibly material, possibly $1–10M/yr for the fleet. It must be quoted before KDP-0B and is a licence-gate criterion.

### 5.7 Independent Safety Authority (7.8, from rq-0-18)

- **Staffing:** 2 FTE (head plus deputy), plus SRB members at KDPs.
- **Reporting:** to the Operator Board Safety Committee. It does **not** report to the Programme Director.
- **Authority:**
  - Hazard-acceptance authority for licence-relevant hazards: Earth-impact, debris ALARP, planetary protection, third-party.
  - Concurrence or non-concurrence at every KDP.
  - Its non-concurrence can be overridden only by both boards, with public disclosure.
- **Boundary:** the ISA reviews whether the safety case is adequate. It does not perform detailed engineering assurance, which stays with PM/SE/MA. This adopts GPT's distinction.
- **Values position on placement.** Independence matters more than integration speed for one-way decisions. Integration speed matters more for reversible ones. Hence the ISA sits outside the programme line, but its formal powers apply only at KDPs and licence-relevant hazards.

### 5.8 Independent Cost Review (7.9, from rq-0-28)

- **Staffing:** 1–2 FTE plus SRB cost members.
- **Reporting:** to the **Association** Board, which is the owner. Cost truth is the owner's concern under D-01, because 0B is a real option valued against its cost.
- **Deliverable:** an independent cost estimate (ICE) at KDP-B, KDP-C and KDP-0B. The ICE is compared with the programme estimate, and differences above 15% are reconciled in writing.
- **First task:** audit the WBS scope dictionary. Do bom-0-1 to bom-0-6 already include PM/SE, launch and operations? That is the falsifier for several round-2 hypotheses.

### 5.9 Gate administration (7.10)

D-02 has four discriminating gates. bom-0-7 owns one and supports two:

| Gate | bom-0-7 role | Pass criteria owned by bom-0-7 |
|---|---|---|
| **Licence** | **Owner** | (a) 0B authorization granted, or a written regulator indication with no blocking conditions. (b) ITU filings for both regimes published and coordination substantially complete. (c) PP determination issued. (d) TPL broker indications obtained and retention sized. (e) Export classification of the 0B baseline complete. (f) Earth-proximity safety case accepted in principle. **No waivers**, mirroring the TRL-6 no-waiver rule for KDP-0B. |
| **Demand** | Contract instrument | A signed offtake agreement with a material/purity/date specification. The Phase 1 signatory must have its own funded budget authority; an internal memo is not enough. Optional external offtakers. |
| Economics | Secretariat; ICE input | ICE delivered. Reconciliation documented. |
| Target | None (bom-0-1 owns it) | — |

**Regulatory Readiness Level (RRL).** A licence-side analogue to TRL, so that KDP-0B can treat the licence the same way it treats technology:

| RRL | Meaning |
|---|---|
| 1 | Regime identified |
| 2 | Counsel opinion: activity authorizable |
| 3 | Pre-application held; no blocking issues identified |
| 4 | Application lodged |
| 5 | Authorization granted for a comparable activity (e.g. the pathfinder) |
| 6 | Authorization (or binding indication) for the 0B activity itself |

- **KDP-0B requires RRL 6.** Internal 0A milestones require RRL 3–4, consistent with TRL 4–5.
- **Current RRL: 1–2.** No counsel opinion has been verified.

### 5.10 Configuration-baseline authority and disposition register (7.11)

- **Baseline B0.** Frozen at the first CCB after this proposal is adopted. Every pre-2026 document, including the 50 kt/yr L4/L5 station design, is stamped **SUPERSEDED: see B0** with a pointer.
- **Delegation-of-authority matrix.** Defines who may change what:
  - requirement thresholds: Operator Board;
  - design parameters: PM/SE CCB;
  - documents: owners.
- **Disposition register.** Every concluded deliberation (rq-*) gets a status of **ADOPTED / ADAPTED / REJECTED / DEFERRED / SUPERSEDED**, with an owner, closure date and the approving authority.
  - This closes GPT's "commitment" weakest link.
  - Target: 100% of concluded deliberations dispositioned within 90 days of conclusion.
- **P0-F15.** The "eight of nine not written back" count is unverified. The first action is a repository audit within 60 days, which either confirms the count or corrects it. Write-back means *disposition*, not verbatim copying.
  - Example: rq-0-29's crew and LH₂ content is dispositioned SUPERSEDED, because Phase 0 is uncrewed with no LOX/LH₂.

### 5.11 Command authority and root-key custody (7.12, T26 governance half)

| Requirement | Value |
|---|---|
| Root command-authority keys | Held in 3 HSM sites, across ≥2 jurisdictions |
| Root key operations quorum | 3 of 5 custodians. At least 1 custodian from the Operator Board or its delegate, plus at least 1 independent. |
| Operational command keys | Delegated to bom-0-10 under the root. Revocable within 4 h. |
| Custodian reachability for emergency re-key or revocation | 2 of 5 within 4 h, 24/7 |
| Key ceremony | Recorded, witnessed, annual rehearsal |
| Regulator-mandated disposal/passivation command capability | Must survive organizational insolvency. This is the operator-of-last-resort arrangement below. |
| Crypto agility | Mandatory. The T26 architecture change must not strand keys. |

**Operator-of-last-resort.** A pre-negotiated agreement with a qualified third-party operator, such as a commercial mission-operations provider or a space agency. It includes:

- escrowed root-key shares;
- the funded wind-down escrow (§9.4);
- a 30-day activation path to safe or passivate every asset.

This is cheap ($0.2–0.6M to set up). Without it, the regulator's continuing-supervision requirement has no answer to "what if the non-profit runs out of money?"

**Crew.** Phase 0 is uncrewed. 14 CFR Part 460 is not invoked, and bom-0-7 carries no crew-flight liability. I disagree with Gemini's round-2 position here. Structural reserve and docking interfaces on hardware are engineering margins, not "human-rating."

---

## 6. Autonomy, control and communication requirements (organizational)

| Requirement | Value | Rationale |
|---|---|---|
| Regulator anomaly notification | Within the licence-specified window (assume ≤24 h for safety-relevant events, ≤72 h otherwise; *verify per regime*) | Licence condition |
| Emergency board convening (Operator) | ≤24 h, remote quorum valid | Safety decisions on one-way events |
| Duty legal/regulatory officer | 24/7 on-call rota, 3 people minimum | Pairs with bom-0-10 operations |
| KDP decision package circulation | ≥15 working days before the board | Lets the ISA and ICR review |
| Public transparency | Quarterly governance report. Board minutes published within 30 days, with controlled and sensitive material redacted. Disposition register public. | Openness charter |
| Escalation path | bom-0-10 flight director → Operator duty officer → ISA head → Operator Board chair | Single, rehearsed chain |
| Annual exercises | 1 key-custody ceremony; 1 operator-of-last-resort tabletop; 1 archive full restore; 1 red-team governance-capture exercise | Converts paper arrangements into tested capability |

---

## 7. Development roadmap and critical path

### 7.1 Why P0-F13 is "major (schedule)"

The external lead times, working backwards from a pathfinder launch at year L:

```
  ITU API / filings          ≥2 yr before bringing into use (verify)
  National authorization     12–24 months review (typical; verify per state)
  Pre-application dialogue    6–12 months before lodging
  Operator entity existence   needed before pre-application (licensee identity)
  Jurisdiction selection      needed before operator formation
  Counsel opinions            3–6 months
```

Critical chain: opinions (0.5 yr), then selection (0.25), then formation (0.5), then pre-application (0.75), then authorization review (1.5), with roughly a 1.0 yr margin to launch. That is **about 4.5 years of bom-0-7 lead before pathfinder launch**.

ITU filings run in parallel but must start by about L−3 years.

If the pathfinder (bom-0-12) is to fly about 5–6 years after 0A start, then **bom-0-7 is on the critical path from month 0**. This is the falsifiable basis for the severity label. The label becomes **minor (schedule)** if the approved pathfinder launch date is more than 7 years after 0A start. That is the same falsifier Claude proposed, and I adopt it.

**Cost of delay.** A one-year slip of Phase 0A idles hardware teams and holds programme cost. It plausibly costs $80–160M per year of slip against bom-0-7's roughly $8M/yr, so delay costs about 10–20× the function itself at central values. This ratio is a judgement, not a measurement.

### 7.2 Timeline (0A, years from 0A start)

```
Year:          0    1    2    3    4    5    6    7
               |----|----|----|----|----|----|----|
Entity A form  ██
Counsel/J-gate ███▌ (J decision M12)
Operator form    ███
Baseline B0 /  ██ (CCB#1 M3; disposition audit M2)
 disposition   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ (continuous)
Export class.     █████ (full baseline by Y2.5)
ITU filings         ████████████  (deep-space + near-Earth)
Pre-application       ████
Pathfinder auth.          ████████ (lodge ~Y2.5, grant ~Y4)
PP determination          ████
Insurance (PF)               ███ (indication by PF PDR)
Op-of-last-resort      ███
Charter Trust study         ████
Pathfinder launch                         ▲ (~Y5–6, bom-0-12)
0B pre-auth dossier                    ██████
Licence gate (KDP-0B)                          ◆ (~Y7)
Staff (FTE)    8→12 | 14 ──────────── 16–19 ───────────|
```

### 7.3 Readiness status

| Element | Now | Needed at internal 0A milestones | Needed at KDP-0B |
|---|---|---|---|
| Licence (RRL) | 1–2 | 3–4 | **6, no waivers** |
| T26 governance (key custody, command authority policy) | Draft (this document) | Policy approved, ceremony rehearsed | Operator-of-last-resort tested by tabletop and live re-key |
| T26 technical (bom-0-9 / bom-0-10) | TRL 3 | TRL 4–5 | TRL 6 |
| Export classification | None | Baseline classified | 0B baseline classified |
| Disposition register | Missing (P0-F15) | 100% concluded deliberations dispositioned | Same |

---

## 8. Staffing plan

| Role | 0A ramp (Y1–2) | 0A steady | 0B increment |
|---|---|---|---|
| Secretary-General / Chief Governance Officer | 1 | 1 | — |
| General Counsel | 1 | 1 | — |
| Space regulatory counsel (Operator state) | 1 | 1.5 | +1 |
| Resource-rights counsel (rq-0-14) | 0.5 | 1 | — |
| Export Control Officer and analyst | 0.5 | 1.5 | +0.5 |
| Spectrum/ITU manager | 0.5 | 1 | +0.5 (near-Earth and fleet filings) |
| Licensing and PP coordinator | 0.5 | 1 | +1 |
| Insurance and risk manager | 0.5 | 0.5 | +0.5 |
| Finance, controller, audit and tax | 1.5 | 2 | +0.5 |
| Governance secretariat and membership | 1 | 1 | — |
| Records, archive and disposition register | 0.5 | 1 | — |
| Information security and key-custody officer | 0.5 | 1 | — |
| ISA (head plus deputy) | 1 | 2 | +0.5 |
| ICR | 0.5 | 1 | +0.5 |
| Contracts and offtake manager | — | 0.5 | +1 |
| **Total** | **~10 (8–12)** | **16 (14–20)** | **+6 (+4–8)** |

**Burdened rate.** $250k central ($210–290k). The mix of legal specialists in Luxembourg, Switzerland or the US pushes it above GPT's $180–260k. The use of outside counsel for peaks keeps it below Claude's $350k ceiling.

---

## 9. Cost analysis

All figures are constant 2026 USD. Ranges are scenario bounds, not confidence intervals. **No contingency is included; that belongs in bom-0-17.**

### 9.1 0A run-rate (steady state, per year)

| Line | Low | Central | High | Basis |
|---|---|---|---|---|
| Staff | 2.94 | 4.00 | 5.80 | 14–20 FTE × $210–290k |
| Outside counsel | 1.00 | 1.80 | 3.00 | Multi-jurisdiction peaks, opinions, licence support |
| Filings and fees (ITU, national, registry, IP) | 0.10 | 0.20 | 0.40 | §5.2 |
| Corporate insurance and broker | 0.20 | 0.35 | 0.60 | D&O, GL, cyber, E&O |
| SRB and external reviewers | 0.40 | 0.70 | 1.20 | 5–7 members, gate-loaded |
| Audit, accounting, tax | 0.20 | 0.35 | 0.60 | 2 entities, 2 jurisdictions |
| Governance operations (assemblies, advisory panel stipends, translation) | 0.20 | 0.35 | 0.60 | |
| IT, archive, security, HSM sites | 0.20 | 0.35 | 0.60 | §3 |
| Facilities (registered seats, small offices) | 0.20 | 0.30 | 0.50 | Remote-first |
| **Run-rate total** | **5.4** | **8.4** | **13.3** | $M/yr |

### 9.2 0A one-time

| Line | Low | Central | High |
|---|---|---|---|
| Entity formation, charters, intercompany agreements, tax status | 1.0 | 1.8 | 3.0 |
| Jurisdiction comparison opinions (3–4 states) | 0.5 | 0.9 | 1.5 |
| Resource-rights legal programme | 2.0 | 3.5 | 6.0 |
| Initial export classification | 0.5 | 1.0 | 2.0 |
| Pathfinder authorization dossier and PP determination | 1.0 | 1.8 | 3.0 |
| 0B pre-authorization and licence-gate dossier | 1.0 | 1.8 | 3.0 |
| Records, CCB and disposition tooling | 0.3 | 0.5 | 1.0 |
| Charter Trust design study and red-team | 0.3 | 0.5 | 1.0 |
| Operator-of-last-resort agreement | 0.2 | 0.3 | 0.6 |
| **One-time total** | **6.8** | **12.1** | **21.1** |

### 9.3 0A total

The 0A duration is 7 years central (5–9). Years 1–2 run at about 60% of steady state, so the effective run-rate years are 2 × 0.6 + (T − 2).

| Case | Effective years | Run-rate × years | One-time | **0A total** |
|---|---|---|---|---|
| Low corner (5 yr, all lows) | 4.2 | 22.8 | 6.8 | **$30M** |
| **Central (7 yr)** | 6.2 | 52.1 | 12.1 | **$64M** |
| High corner (9 yr, all highs) | 8.2 | 109.1 | 21.1 | **$130M** |
| **Plausible range** | | | | **$40–100M** |

### 9.4 Financing lines (not expenditure)

| Line | Value | Basis |
|---|---|---|
| Organizational liquidity reserve | $12M central ($8–20M) | 12–18 months of run-rate. Replenished; not spent. |
| 0A wind-down and safe-disposal escrow | $5M central ($3–10M) | 6–12 months of minimum pathfinder operations to safe or passivate by the operator-of-last-resort. Likely to become a licence condition. |
| 0B escrow | Sized at KDP-0B | Scales with fleet size (10–18 tugs) and SEL1 assets |
| Risk retention / self-insurance | Unsized until broker indications | Per §5.6 |

### 9.5 0B increment (gated; sized at KDP-0B)

| Element | Low | Central | High |
|---|---|---|---|
| Run-rate increment ($M/yr) | 1.9 | 3.5 | 5.5 |
| 0B duration (yr) | 6 | 8 | 10 |
| One-time (fleet and SEL1 authorization, near-Earth ITU, offtake contracts, Earth-proximity safety case regulatory work) | 3 | 6 | 10 |
| **0B increment total** | **$14M** | **$34M** | **$65M** |

**Phase 0 total for bom-0-7: $98M central (plausible ~$60–155M).** Only the 0A share, $64M, is committed now.

### 9.6 Reconciliation with round-2 figures

| Round-2 figure | My view | Reason |
|---|---|---|
| Consensus envelope $100–350M | **Too high for the commitment.** About right only as a ceiling for 0A+0B, if contingency and premiums are added back. | Double-counted contingency; premiums; 0B pre-funding |
| Claude $110M ($55–200M), 10-yr incl. 20% contingency | Close on run-rate ($9M vs my $8.4M) | Contingency belongs in bom-0-17. Duration should be tied to 0A. |
| Gemini $120M ($80–190M) | Disagree | $30M TPL premiums are flight-item costs. $10M archive is about 4× too high. 20% contingency double-counts. Its FTE count is inconsistent (12–18 vs 10–20). |
| GPT $65M ($40–105M) | Closest in total, by coincidence of structure | Its 10-year frame and 25% allowance differ, but its exclusion of premiums matches mine |
| 10-year costing duration (Gemini, GPT) | Reject | Under D-01, duration = 0A period plus a gated 0B increment |
| "No third parties at 1 AU" (round-2 TPL reasoning) | True for 0A, **false for 0B** | D-04 SEL1 deliveries of 150–300 t iron masses |

**Share of phase.** bom-0-7 is a small fraction of Phase 0 cost. The exact share depends on the unresolved launch, PM/SE and operations lines: under 1% if Phase 0 is $15–40B. That ratio proves nothing about adequacy. Scope and schedule do.

---

## 10. Interfaces (N² summary)

```
            Provides TO bom-0-7                 bom-0-7 provides TO
bom-0-1   target data for PP determination   ← → PP determination; resource-rights opinion
bom-0-2/3 hazard data; export-class inputs   ← → classification; IP terms for partners
bom-0-4   trajectories, Earth-proximity cases← → Earth-impact threshold (via regulator); TPL spec
bom-0-5   (none — terrestrial power separate)
bom-0-6   C-type mission profile             ← → PP category request
bom-0-8   launch contracts, provider licence ← → licence-holder-of-record; insurance interface
bom-0-9   frequency plan, link architecture  ← → ITU filings (both regimes), spectrum licences
bom-0-10  ops procedures, anomaly reports    ← → command-authority policy, root keys, notif. rules
bom-0-11  qualification evidence             ← → export classification of test data
bom-0-12  pathfinder safety/debris/PP case   ← → mission authorization; premium estimate $0.5–3M
bom-0-13  SEL1 node design                   ← → near-Earth filings; SEL1 regulatory case
bom-0-14  —                                    → export class of spares data
bom-0-15  ALARP analysis, interim ceiling    ← → regulator negotiation; ISA concurrence
bom-0-16  propellant supply audit            ← → (hazmat/export review if requested)
bom-0-17  —                                    → contingency excluded here; reserves are financing
Phase 1   material/purity/date spec, funding ← → offtake contract (demand gate)
```

Unresolved flag (Reviewer note): the bom-0-5 power interface was marked `in_bom: true` by Claude and `false` by GPT. My position is **false**. bom-0-7's terrestrial power is facility load and is not drawn from bom-0-5.

---

## 11. "Manufacturing" considerations

The organization is not manufactured, but it has to be produced reproducibly and survive staff turnover.

- **Template library.** Charters, intercompany agreements, delegation matrix, regulator dossiers, offtake and partner IP terms. All are version-controlled in the governance archive.
- **Process qualification.** Each recurring process is "qualified" by one dry run before it is relied on: classification gate, key ceremony, KDP package, regulator notification. This parallels qualification of hardware.
- **Manufacturing data in 0B.** Process know-how for Fe-Ni beneficiation and reduction is the most likely controlled-annex content and the most likely partner-proprietary IP. The §5.4 and §5.5 rules apply before any 0B industrial contract is let.

---

## 12. Risk assessment

| ID | Risk | L | I | Mitigation | Owner |
|---|---|---|---|---|---|
| OR-1 | No candidate state authorizes a non-profit-owned deep-space resource operator on the needed timeline | M | **Very high** (project-ending for 0B) | Parallel opinions in 3–4 states. Pre-application by month 18. Alternate state held warm. | GC |
| OR-2 | Regulator treats the Association as de facto operator, exposing it to liability | M | H | Reserved-matters-only control. Independent-majority Operator board. Counsel opinion before formation. | GC |
| OR-3 | Export controls force large portions of the design into the controlled annex, undermining the open charter | H | M | Early classification. Design for publishability. Accept the restricted annex as a values trade-off. | ECO |
| OR-4 | 0B Earth-proximity hazard and TPL make SEL1 deliveries unlicensable or uninsurable | M | **Very high** | Engage the regulator in 0A. Get broker indications early. Feed the alternative delivery point (re-decided at the 0B gate per D-04) back to the gate. | Licensing/ISA |
| OR-5 | ITU filing lapses or coordination failure | L–M | H | Architecture-neutral filings. Calendarized milestones. Dual-regime coverage. | Spectrum mgr |
| OR-6 | Funder concentration leads to capture | M | H | Disclosed caps. Staggered boards. Annual red-team. | Assoc. Board |
| OR-7 | Root-key compromise or loss | L | Very high | 3-of-5 quorum across ≥2 jurisdictions. Crypto agility. Annual ceremony. | InfoSec |
| OR-8 | Organizational insolvency strands flight assets | L–M | H | Liquidity reserve. Wind-down escrow. Operator-of-last-resort. | SG/CFO |
| OR-9 | International norms change (COPUOS resource framework, Accords divergence) | M | M | Monitoring. Flexible benefit-sharing policy. Multilateral engagement. | Resource counsel |
| OR-10 | Volunteer-to-professional transition causes cultural conflict and loss of contributors | M | M | Clear role split: commons versus licence-critical roles. Advisory panel. | SG |
| OR-11 | PM/SE/MA scope remains unowned (OQ-1), and the gap surfaces as cost growth attributed to "overhead" | H | H | Raise at CCB#1. ICR WBS audit within 6 months. | ICR |
| OR-12 | Unverified legal citations in the baseline are wrong | M | M | Counsel verification of every citation before B0 freeze. "Verify" tags remain until cleared. | GC |

---

## 13. Open engineering and organizational questions

| # | Question | What settles it | Needed by |
|---|---|---|---|
| OQ-1 | Where is PM/SE/MA in the Phase 0 BOM? | WBS dictionary decision at CCB#1 | M3 |
| OQ-2 | Do bom-0-1 to bom-0-6 prices include PM/SE, launch and ops? | ICR scope audit | M6 |
| OQ-3 | Which state licenses the Operator? | Counsel opinions plus pre-application meetings; J-gate | M12 |
| OQ-4 | Is SEL1 delivery without entry treated as "Earth return" for planetary protection? | Formal regulator determination | Pathfinder PDR |
| OQ-5 | Earth-impact probability ceiling for 150–300 t transfers | D-03 process: bom-0-15 modelling, then regulator | Before KDP-0B |
| OQ-6 | TPL limits, premiums and state indemnification for 0B SEL1 deliveries | Broker indications | Licence gate |
| OQ-7 | 0A duration and pathfinder launch date. Confirms or falsifies the "major (schedule)" label. | Approved phase schedule | M6 |
| OQ-8 | Controlled-annex content (USML/CCL categories) | Classification study, plus formal rulings if needed | Y2.5 |
| OQ-9 | Swiss Verein versus co-located Association | Tax and charitable comparison after the J-gate | M18 |
| OQ-10 | Does an internal Phase 1 signatory satisfy "signed demand" under D-01? | Association Board ruling. I propose it qualifies only if Phase 1 has its own funded budget authority. | Before demand gate |
| OQ-11 | Partner IP: proprietary background with licence-back, or mandatory copyleft? | Association Board values decision, with advisory panel input | Before the first 0B RFP |
| OQ-12 | The "eight of nine" write-back count | Repository audit | M2 |
| OQ-13 | Evidence for sortition and long terms in asset-holding trusts | Charter Trust study and red-team | Before any Trust decision (≥ KDP-0B) |

---

## 14. Proposed BOM entry (for CCB)

```yaml
id: bom-0-7
name: Organizational Infrastructure
phase: 0A (funded), 0B increment (gated at KDP-0B)
quantity: 1 (2 legal entities; 3rd conditional on export study)
orbital_mass_t_per_yr: 0
orbital_power_MW: 0
propellant_t_per_yr: 0
terrestrial_power_MW: {central: 0.02, range: [0.01, 0.05], from_bom_0_5: false}
staffing_FTE: {0A_ramp: [8, 12], 0A_steady: {central: 16, range: [14, 20]}, 0B_increment: [4, 8]}
cost_USD_2026:
  0A_run_rate_per_yr: {central: 8.4e6, range: [5.4e6, 13.3e6]}
  0A_one_time: {central: 12.1e6, range: [6.8e6, 21.1e6]}
  0A_total_7yr: {central: 64e6, plausible: [40e6, 100e6], corners: [30e6, 130e6]}
  0B_increment: {central: 34e6, plausible: [20e6, 55e6], corners: [14e6, 65e6]}
  contingency: excluded (bom-0-17)
  flight_insurance_premiums: excluded (bom-0-12 / bom-0-4 / bom-0-8); PF estimate 0.5–3M passed to bom-0-12
financing_lines:
  liquidity_reserve: {central: 12e6, range: [8e6, 20e6]}
  wind_down_escrow_0A: {central: 5e6, range: [3e6, 10e6]}
  risk_retention: unsized_pending_broker
critical_technologies:
  T26: {bom_0_7_role: "command authority, root-key custody, spectrum filings", technical_owner: [bom-0-9, bom-0-10]}
gates_owned: [licence]
gates_supported: [demand (contract instrument), economics (ICE)]
licence_gate_requirement: RRL 6, no waivers
severity_P0_F13: "major (schedule) / minor (cost); falsified if PF launch > 7 yr from 0A start"
confidence: {scope: medium, cost: low-medium, legal_facts: low (all citations 'verify')}
```

---

**Bottom line.** bom-0-7 is cheap, but it gates the schedule. Fund about $64M over 0A, staff it to about 16 professionals, and start the jurisdiction opinions in month 0. Treat the licence the way KDP-0B treats technology: RRL 6, no waivers. The most important things this item can do in its first 90 days are:

1. Force a decision on where PM/SE/MA lives.
2. Freeze baseline B0 and mark legacy documents superseded.
3. Tell the programme early that D-04's SEL1 deliveries make 0B a near-Earth liability problem, not a deep-space one.