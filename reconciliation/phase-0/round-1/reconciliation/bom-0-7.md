---
phase: phase-0
item: bom-0-7
round: 1
type: reconciliation
synthesizer: claude-opus-5-5
panel: [claude-opus-5-5, gemini-3-8-flash, gpt-6-1-sol]
generated: 2026-10-11T23:25:15.404Z
---

# Reconciliation: bom-0-7 Organizational Infrastructure (Phase 0, Round 1)

**Panel:** Claude Opus 5.5 ("Claude"), Gemini 3.8 Flash ("Gemini"), GPT-6.1 Sol ("GPT").

**Attribution note.** The YAML blocks carry different model labels from the response headers:
- Gemini's YAML says `model: claude-3-7-sonnet`.
- GPT's YAML says `model: OpenAI ChatGPT`.

This document attributes positions by response header. The repository records should be corrected.

**Baseline assumptions differ, which affects every cost comparison below.**

| | Claude | Gemini | GPT |
|---|---|---|---|
| Phase 0 duration for costing | ~10 yr | ~10 yr | 5 yr (stated as a costing assumption, not a requirement) |
| Currency year | 2025 USD | not stated | 2026 USD |
| Scope boundary | Excludes property/launch insurance, PM/SE/MA and the endowment | Includes a liability/insurance reserve; PM/SE excluded if prime contracts absorb it | Excludes mission ops, hardware insurance premiums, launch and flight-risk premiums |

---

## 1. Verdict matrix

| Finding | Claude | Gemini | GPT |
|---|---|---|---|
| **P0-F13**: Organizational infrastructure has no specification | **agree** (raise severity minor → major) | **agree** (severity not addressed) | **agree** ("minor" acceptable only while a discussion community; major before funding, staffing, contracting or launch) |
| **P0-F15**: Concluded deliberations not written back (as applied to bom-0-7) | **agree** | **agree** | **partly** |

**Where the panel stands:**

- **P0-F13:** The panel is unanimous that no executable spec exists and that rq-0-29 covers governance but not regulatory and operational obligations. Severity is unresolved:
  - Claude: major now, because authorization is on the critical path of bom-0-1 to bom-0-6.
  - GPT: severity depends on project stage.
  - Gemini: silent.
- **P0-F15:** The panel is unanimous that rq-0-29 has not been written into bom-0-7. GPT dissents on scope:
  - It cannot verify the repository-wide "eight of nine" count from the excerpts.
  - It holds that a concluded deliberation is not automatically a validated requirement, so write-back must pass calculation, evidence and design review.
  - Claude and Gemini treat write-back as directly actionable for this item.

---

## 2. Agreed changes (supported by all three models)

| # | Change | Consolidated value / range | Notes on support |
|---|---|---|---|
| A1 | Write a formal bom-0-7 specification that adopts the rq-0-29 governance architecture and adds regulatory and operational functions. | Minimum function set named by all three: mission authorization/registration (OST Art. VI), spectrum/ITU coordination, planetary-protection assessment, third-party liability/insurance, and decision/records archive. | Export control is named by Claude (ITAR/EAR) and GPT ("restricted-information handling"; "no license… overrides export controls"), but not by Gemini. Space-traffic coordination is named by Claude and GPT, and by Gemini only as "orbital slots/tracking coordination". |
| A2 | Separate the governance body from the entity that holds licences, contracts, staff and assets. | Two or more legal entities: a Swiss Verein/association plus an operating or contracting entity. | Claude: 2 (range 2–3), operating entity in Luxembourg or US. Gemini: Verein plus operating subsidiaries (US/EU/Japan) plus a Charter Trust. GPT: association plus a distinct contracting/employment entity "when needed". Jurisdiction and timing diverge (§3). |
| A3 | bom-0-7 carries no spaceflight mass, propellant or orbital power allocation. | 0 t/yr mass, 0 t/yr propellant, 0 MW from bom-0-5. | Claude and GPT state this explicitly. Gemini describes the item as non-hardware. GPT adds terrestrial power of 0.01–0.05 MW (judgement). |
| A4 | Include an append-only Decision Journal and knowledge archive in bom-0-7 scope. | Ingest about 1–20 TB/yr (Claude 1–10; GPT 2–20). | Gemini gives no volume. Architecture differs (§3, D9). |
| A5 | The current $50M line is not validated as adequate for its undefined scope. | No consolidated value (see D1). | Claude and Gemini call it too low. GPT keeps it only as a provisional ceiling and says the 0.32% ratio "does not validate adequacy". |
| A6 | Assign program management / systems engineering explicitly; it cannot be assumed absorbed by a volunteer or small governance body. | No consolidated value (see D7). | Claude proposes a new line. Gemini raises it as an open question. GPT lists it as missing scope. |

---

## 3. Preserved divergences

### D1: bom-0-7 cost

| Position | Model | Value | Reasoning |
|---|---|---|---|
| Resize upward, broad scope including in-orbit TPL and contingency | Claude | **$160M (range $75–365M)**, 10 yr | Bottom-up: formation $3–10M; legal/regulatory/export staff of 10–20 FTE at $30–90M; in-orbit TPL $15–120M; PP $2–10M; SSA/ITU $5–30M; records $3–20M; 0B resource rights $5–15M; contingency 20–25%. |
| Resize upward, including a liability/insurance reserve | Gemini | **$150M (range $100–250M)**, 10 yr | Legal maintenance $15M; ITU/COSPAR filings $10M; knowledge infrastructure $30M; governance/sortition $20M; launch and orbital liability reserve $75M. Argues 0.3% overhead is unrealistic against a cited 3–8% for institutional coordination. |
| Keep $50M as a provisional ceiling; estimated spend is lower | GPT | **$27M (range $16–43M)**, 5 yr; GPT's own 10-yr figure is $31–83M before reserves | 12–20 FTE at $180–260k fully burdened, plus $0.8–2.8M/yr services, plus $1–3M formation. Flight-risk premiums and operational functions excluded. |

Most of the gap comes from three sources:
- **Duration:** 5 vs 10 yr.
- **Insurance inclusion:** Claude in-orbit TPL $40M mid; Gemini $75M reserve; GPT excluded.
- **Staff rate:** Claude $300k per FTE; GPT $180–260k.

### D2: Severity of P0-F13
- **Claude:** major now. Authorization blocks every launch.
- **GPT:** minor while a discussion community, major before funding or flight procurement.
- **Gemini:** no position.

### D3: Operating-entity jurisdiction
- **Claude:** Luxembourg S.A. or US LLC/PBC. Claude states Switzerland has no space law in force and no space-resource regime, and cites US CSLCA 2015, Luxembourg 2017, UAE 2019 and Japan 2021.
- **Gemini:** subsidiaries in launch/procurement states (US, EU, Japan). Charter Trust anchored in Switzerland, Singapore and Uruguay.
- **GPT:** Switzerland is "credible" as an initial option but not a demonstrated optimum. Operations, funding, export control and licensing "may favor another structure". Neutrality confers no regulatory immunity.

### D4: Charter Trust, trustee count and term length

| Model | Position |
|---|---|
| Gemini | Phase 0 spec includes a multi-jurisdictional Charter Trust with **15 sortition trustees (11–21), 15-year non-renewable terms**, confidence "high", basis "literature". |
| Claude | Charter Trust is a later phase; Phase 0 cost covers study only. Stewardship Council of 5–7. |
| GPT | 15-year terms are "too long to adopt without evidence". Proposes a board of **5–7 with staggered 3–4-yr terms** and a 6–8-yr service limit. Five jurisdictions are "a later resilience measure, not a Phase 0 minimum". Sortition is not established as the "strongest" anti-capture mechanism; use it initially for advisory or oversight panels. |

### D5: Other rq-0-29 provisions challenged only by GPT
Claude and Gemini adopt rq-0-29 largely as given. GPT proposes changes to:
- **Immutable mission:** replace with a difficult amendment process plus a lawful dissolution clause.
- **License:** use CERN OHL v2 rather than a bespoke copyleft.
- **Leadership overlap:** 3–12 months "where feasible", replacing a mandatory 12 months.
- **Liquidity reserve:** 1–2 years initially, with 5 years as a later target.
- **Funding caps:** time-limited, disclosed exceptions.

### D6: Funding caps
- **Claude:** keep the donor cap at ≤15%. The government cap of ≤25% "may make Phase 0 unfundable"; either lift it or apply it only to Entity A.
- **GPT:** caps are useful targets; permit disclosed, time-limited exceptions approved by independent directors; prohibit donor control over safety.
- **Gemini:** not addressed.

### D7: Size and placement of PM/SE/MA
- **Claude:** new BOM line at **$1.5–3B** (10–20% of ~$15.7B hardware, judgement based on NASA practice). Says a volunteer meritocracy cannot substitute for this.
- **Gemini:** standard G&A/PM is 5–10% (**$750M–1.5B**). Elsewhere Gemini cites 3–8%. If the Verein acts as lead system integrator, $150M is undersized by ≥4×; otherwise $150M suffices.
- **GPT:** missing scope, not sized. Its exclusion is conditional on whether hardware prices already include it.

### D8: Insurance treatment
- **Claude:** in-orbit TPL inside bom-0-7 ($15–120M). Launch TPL is normally carried by the launch provider under FAA MPL. Property insurance is excluded; at 5–10% it would cost $0.8–1.6B. The ~$10B station exceeds the ~$0.5–0.7B per-risk market capacity, so Claude proposes self-insurance through a separate reserve line.
- **Gemini:** a $75M (range $40–120M) launch and orbital liability reserve inside bom-0-7, sized to ~$100M MPL per launch campaign.
- **GPT:** no supportable premium can be calculated from the BOM. Premiums and retained losses sit outside bom-0-7, pending broker indications.

### D9: Archive architecture
- **Gemini:** mirrored across 5 geopolitical zones with offline optical/tape vaults, a ~10 Gbps backbone, and a physical vault such as a Swiss mountain or Arctic archive.
- **GPT:** 80–800 TB over 10 yr with 3 replicas. Restore testing and provenance "matter more than raw capacity". Annual restore test.
- **Claude:** "negligible infrastructure", software plus archival staff, $3–20M.

### D10: Planetary protection
- **Claude:** small bodies mostly COSPAR Cat I/II, documentation-level, $2–10M (basis literature, medium). Cites Hayabusa2 and OSIRIS-REx as Cat V unrestricted returns.
- **Gemini:** Cat II for B/C-type NEAs. Lists "20 COSPAR filings" against the mining robots.
- **GPT:** mission-specific assessment before design freeze, depending on target, trajectory, contact and Earth return. COSPAR guidance "is not itself a universal operating license".

### D11: Phase structure
- **Claude:** leans toward splitting Phase 0 into a volunteer research/governance phase and a professional program, or confining the rq-0-29 model to the governance shell. Notes the $50K trigger vs ~$16B scale mismatch.
- **GPT:** asks for approved duration and boundaries of 0A/0B. Says volunteer votes cannot override a licence holder's legal duties.
- **Gemini:** frames this as the national-registration vs anti-capture tension.

### D12: Handling of the other deliberations (P0-F15)
- **Claude:** maps organizational effects:
  - rq-0-14: resource-rights workstream, $5–15M.
  - rq-0-18: independent technical/safety authority; 14 CFR 460 if crewed.
  - rq-0-28: independent cost-estimate function, 2–3 FTE.
  - rq-0-11: adds conjunction and safety review content only.
  - rq-0-30, -47, -48: no effect beyond review authority.
- **GPT:** proposes a disposition register and illustrative calculations, explicitly *not* specifications:
  - rq-0-11 rotation: 0.05–0.15 g at 20 m gives 1.5–2.6 rpm.
  - rq-0-14 at 25 kt/yr of water: 16–22 MW for electrolysis plus 8–77 MW heating, so the 100 MW phase supply "does not yet have a closed allocation". If the 25 kt/yr is hydrogen, electrolysis alone needs 143–200 MW.
  - rq-0-30 boil-off: 1 kW heat leak gives ~190 kg/day LH₂ or ~410 kg/day LOX.
  - rq-0-18: crew carriage not authorized in baseline.
  - rq-0-28: the $2B bom-0-6 figure is an unvalidated allowance.
- **Gemini:** no per-deliberation disposition.

---

## 4. Proposed BOM delta (proposals for human review; none adopted)

| # | Action | Item | Supporting model(s) | Qty | Unit-cost range (USD) | Confidence (as stated) |
|---|---|---|---|---|---|---|
| B1a | **resize** | bom-0-7 | Claude | 1 | 75M – 365M (mid 160M), 10 yr | low |
| B1b | **resize** | bom-0-7 | Gemini | 1 | 100M – 250M (mid 150M), 10 yr | medium |
| B1c | **keep** (as provisional ceiling) | bom-0-7 | GPT | 1 five-year appropriation ceiling | 50M (estimated spend 16–43M) | low |
| B2 | **split** | Organizational reserve / endowment, accounted as financing rather than expenditure | GPT (delta). Claude excludes the endowment (~$50–100M) as financing but adds no line. | 1 | 15M – 40M (GPT) | medium (GPT) |
| B3 | **add** | Program management, systems engineering and mission assurance | Claude (delta). Gemini sizes it at $750M–1.5B in an open question only. GPT flags it as missing. | 1 | 1.5B – 3B (Claude) | not stated; basis judgement |
| B4 | **add** | Launch and transport to operating site | Claude (delta). GPT flags it as missing, unsized. | 1 | 2B – 8B (Claude) | not stated |
| B5 | **add** | Mission operations and ground segment | Claude (delta). GPT flags it as missing. Gemini mentions DSN/ground coordination. | 1 | 500M – 1.5B (Claude) | not stated |
| B6 | **add** | Risk retention / self-insurance reserve | Claude (delta). GPT flags "flight-risk insurance and retained losses" as missing and unpriceable from the BOM. | 1 | 300M – 1.5B (Claude) | not stated |

B1a, B1b and B1c are mutually exclusive alternatives. The panel has not converged on one.

---

## 5. Open questions and what would settle them

| Question | Raised by | What would settle it |
|---|---|---|
| Phase 0 duration and 0A/0B boundaries; whether to split into volunteer and professional phases | GPT, Claude | A programme decision fixing duration. Re-run all three cost builds on a common duration and currency year. |
| Are PM/SE, mission ops and launch already inside hardware prices? | GPT, Gemini, Claude | A WBS dictionary for bom-0-1 to bom-0-6 stating inclusions (GPT's rq-0-28 recommendation). |
| Operating-entity jurisdiction (Luxembourg, US, multi-state) and launching-state liability exposure | Claude, Gemini, GPT | Jurisdiction-specific legal opinion covering mission authorization, resource rights, export control and Liability Convention exposure. |
| Copyleft openness vs ITAR/EAR, and whether a restricted annex is required | Claude (GPT concurs in principle) | Export classification of representative GNC, autonomy and EP specs by qualified counsel. |
| Liability limits, insurance terms, indemnities and retained losses | Claude, GPT, Gemini | Broker indications for in-orbit TPL and deep-space operations. Confirm whether launch TPL sits with the launch provider. |
| Government funding cap (≤25%): scope and fundability | Claude, GPT | Funding-source analysis against comparable programmes, and a decision whether the cap applies to Entity A only. |
| Charter Trust timing, trustee count and term length; sortition evidence | Divergence D4 | Literature review of term-length and sortition governance evidence. Decide whether the Trust is a Phase 0 deliverable or a study. |
| Meaning of "25 kt/yr" (water, H₂, combined, or delivered product) | GPT | Definition by the rq-0-14 owner. Then a phase power-allocation closure against the 100 MW supply. |
| Planetary-protection category per mission | GPT, Claude, Gemini | A target list with contact and Earth-return plans, then mission-specific COSPAR categorization. |
| Verification of the "eight of nine" write-back count and the content of the other deliberations | GPT | Supply the full deliberation records and a disposition register. |
| Can a non-state Verein keep autonomy while relying on state Art. VI/VIII supervision? | Gemini | Legal analysis of the control relationship between Entity A and the licensed operator. |

---

## Reviewer note

These are consistency checks on the panel's own figures, not new technical claims.

1. **Claude staff high end.** Claude states 10–20 FTE × $300k × 10 yr with a $250–400k rate range, but books a $90M high. 20 FTE × $400k × 10 yr is $80M. The high bound should be reconciled or its basis stated.
2. **Gemini PM/G&A percentage.** Gemini cites 3–8% in its P0-F15 reasoning and 5–10% in its open questions. One basis should be chosen.
3. **Claude launch line (B4).** The text cites $3–20k/kg, but no delivered mass is given to derive the $2–8B range.
4. **Confidence labels.** Gemini labels the Charter Trust structure and 15 trustee seats as "high" confidence, basis "literature", without a cited source. GPT disputes the supporting evidence.
5. **Legal citations.** None of the panel's citations were independently verified in this round. These include Claude's status of Swiss space law, the national resource laws, the EAR/ITAR sections and 14 CFR parts, and GPT's Swiss Civil Code articles. They should be verified before adoption.
6. **Model labels.** The YAML model labels should be corrected (see the attribution note at the top).
