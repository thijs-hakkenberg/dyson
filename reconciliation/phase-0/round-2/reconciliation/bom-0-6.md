---
phase: phase-0
item: bom-0-6
round: 2
type: reconciliation
synthesizer: claude-opus-5-5
panel: [claude-opus-5-5, gemini-3-8-flash, gpt-6-1-sol]
framework: 18f503fe4ec6
generated: 2026-10-12T10:22:49.112Z
---

# Reconciliation: bom-0-6 In-Situ Propellant Production Systems (Phase 0, Round 2)

**Panel:** Claude Opus 5.5 ("Claude"), Gemini 3.8 Flash ("Gemini"), GPT-6.1 Sol ("GPT")
**Rapporteur role:** This document consolidates, attributes and preserves disagreement. It decides nothing. All BOM changes are proposals for human review.

---

## 1. Verdict matrix

| Finding | Claude | Gemini | GPT |
|---|---|---|---|
| **P0-F11**: Tug propellant not in BOM; ISPP output has no Phase 0 consumer | agree | agree | partly |
| **P0-F15**: Concluded deliberations not written back into specs | partly | agree | partly |
| **P0-F16**: Consensus documents disagree with the BOM | agree | agree | agree |

**Where the panel stands**

- **P0-F11:** All three agree on two points:
  - The current Kr/I tugs cannot consume ISPP products.
  - Tug propellant supply is unbudgeted.

  They disagree on the size of the demand and on whether water EP remains a live closure path. GPT's "partly" rests on its view that annual demand cannot be established from fleet count and per-trip allowances.
- **P0-F15:** All three agree that rq-0-14, rq-0-30, rq-0-47 and rq-0-48 are not reflected in the ISPP specification. The verdicts diverge for two reasons:
  - Claude and GPT cannot verify the "eight of nine" count from the material supplied.
  - Claude and GPT hold that several deliberation numbers must be corrected before write-back. Gemini adopts most of the deliberations as stated, though it also rejects the 700 W cryocooler figure.
- **P0-F16:** Unanimous agreement that the BOM line, the consensus and rq-0-14 describe incompatible architectures. The models differ on what should govern once the documents are reconciled.

---

## 2. Agreed changes

These are specification changes that all three models support, at least in direction. Where the values differ, the consolidated figure is the envelope of the panel's ranges, with each model's range shown.

| Parameter | Old | Consolidated new value / range | Per-model values | Notes |
|---|---|---|---|---|
| **Site / architecture** | Lunar south pole + EML1 (consensus); NEA surface bucket-wheel (BOM) | Integrated with bom-0-3 at L4/L5 | Claude: L4/L5, system TBD. Gemini: Sun–Earth L4/L5. GPT: Lagrange system unresolved. | Which L4/L5 system is chosen is a preserved divergence (§3.1). |
| **Extraction temperature** | Universal 1,000 °C | Reject the universal 1,000 °C. Use staged, feedstock-specific processing, envelope **150–800 °C**. | Claude: staged 150–400 and 400–750 °C. Gemini: 550 °C nominal (400–750), stepped 150/500 °C. GPT: feedstock-specific qualification envelope 300–800 °C. | All three cite Garenne et al. 2014 and King et al. 2015. |
| **Feedstock heating energy** | Unspecified | **0.15–0.45 kWhₜₕ/kg ore** | Claude: 0.15–0.3. Gemini: 0.22 (0.15–0.35). GPT: 0.15–0.45, including process losses. | Claude and GPT place heating in bom-0-3, counted once. Gemini does not state the allocation. |
| **PEM electrolysis specific energy** | 4–8 kWh/kg H₂O | **5.2–7.0 kWhₑ/kg H₂O** (all three ranges overlap at 5.6–6.5) | Claude: 5.5–7.0. Gemini: 5.2–6.5 (5.8 nominal). GPT: 5.6–6.7. | Claude: thermoneutral limit 4.41 kWh/kg. GPT: derived from DOE PEM data at 50–60 kWh/kg H₂. |
| **20 K cryocooler power for 15–40 W heat leak** | 700 W per tank (rq-0-30) | **About 1–11 kWₑ.** The 700 W figure is rejected by all three. | Claude: 1–5.6 kWₑ (10–20% Carnot, 300 K). Gemini: 2.68 kWₑ for 35 W (15% Carnot, 250 K), range 1.8–4.5. GPT: 1–11 kWₑ (5–20% Carnot). | All three state that 700 W implies roughly 30–80% of Carnot, or more than 55%. |
| **ISPP → tug chemical propellant flow (Phase 0)** | Implied | **0 t/yr LOX/LH₂** | All three | Water flow to tugs is a divergence (§3.2). |
| **Item cost** | $2.0B (4 × $500M) | Reduce substantially. Envelope about **$0.35–1.4B**, structured differently by each model. | Claude: $0.35–0.8B committed + $0–0.5B conditional. Gemini: $0.6B ($0.45–0.8B). GPT: $0.3–0.6B development + $0.2–0.8B conditional hardware and integration. | The structure is a divergence (§3.6). |
| **Phasing** | Monolithic Phase 0 deployment | Capture and interface reservation first; conversion deferred and gated. | All three | The gate criteria and whether a pilot flies in 0A are divergences (§3.5, §3.6). |
| **Gas cleanup / purification before electrolysis** | Absent | Required | Claude: inside bom-0-6. Gemini: separate skid (5 t, about $120M NRE). GPT: listed as missing scope. | Location and costing differ (§4). |

**Supported by two models, with the third silent or internally inconsistent**

- **Excavation removed from bom-0-6.** Explicit in Claude and GPT. Implicit in Gemini, which feeds the plant from smelter off-gas.
- **LH₂ liquefaction deferred to Phase 1.** Explicit in Claude and GPT. Gemini defers LH₂ in its Decision 2, but its revised-spec table still carries LH₂ ZBO cooling (2.8 kWₑ), a 35 m sunshield and a 56 t LH₂ yield (see Reviewer note).
- **Electrolysis chain energy, water to LOX + GH₂, excluding heating and LH₂.** Claude: 7–11 kWhₑ/kg. GPT: 6–10 kWhₑ/kg. Gemini gives no chain figure.
- **Water processed per 500 kWe.** Claude: 300–650 t/yr. GPT: 350–580 t/yr at 80% availability. Gemini: 500 t/yr at about 450 kWe including auxiliaries. All three are broadly consistent.
- **Electrolysis product split of 8:1 O:H by mass.** Claude and GPT state it. Both say rq-0-30's 100 t LH₂ + 600 t LOX is a 6:1 engine mixture ratio, not an electrolysis inventory. Gemini does not address this.

---

## 3. Preserved divergences

### 3.1 Which L4/L5 system

| Position | Held by | Reasoning |
|---|---|---|
| Sun–Earth L4/L5, high confidence | Gemini | Stated as fixed under rq-0-14. |
| Unresolved | Claude | The choice moves Earth-delivery cost, and so ISPP value, by about 2–5×. Claude names this as the weakest (information) link in D1. |
| Unresolved | GPT | Sun–Earth and Earth–Moon L4/L5 cannot share one communications, logistics or environmental specification. |

### 3.2 Tug propellant demand and the role of water EP (P0-F11)

**Demand estimate**

| Model | Method | Result |
|---|---|---|
| Claude | Power-limited: 2ηP/vₑ² at Isp 1,800 s, η 0.6, 0.5–1.5 MWe per tug, 60–90% duty | 100–130 t per MWe-yr. Fleet uses **0.6–2.4 kt/yr** (central about 1.3 kt/yr). |
| Gemini | Rocket equation per trip: 200 t, 4 km/s round trip, 1 trip per 1.5–2 years per tug | About 51 t per trip. Fleet uses **380–510 t/yr**. |
| GPT | Both methods, illustrative only | If 25 kt/yr crosses a 3–6 km/s loaded leg, at least **4,600–10,100 t/yr**. At 0.4 MW per tug, 15 tugs process only **610–790 t/yr**. GPT says demand is "not established" until a trajectory-and-power model exists. |

**Water EP**

| Position | Held by | Reasoning |
|---|---|---|
| Cannot close | Claude | At about 330 t/MWe-yr, water EP burns 0.6–1.5 t of water per tonne of payload, while ore holds 0.05–0.2 t/t. Claude calls Round 1's water-EP closure "circular": it assumed station water from 25 kt/yr of ore that the fleet cannot move. |
| Live alternative ("Camp B") | Gemini | Removes Earth logistics and closes the bom-0-6 business case. Downsides: Isp 800–1,200 s, erosion, low TRL at multi-hundred-kW scale. bom-0-4 should settle on either iodine or water EP. |
| Not a closure; carry as an alternative pending evidence | GPT | Do not switch propulsion "merely to give ISPP a customer." Carry iodine and water as explicit alternatives until trajectory, endurance and supply evidence closes. |

**Baseline propellant**

- Claude: baseline Earth-supplied iodine.
- Gemini: choose iodine or water EP.
- GPT: carry both as alternatives, and add a separately budgeted Kr/I supply line.

### 3.3 Propellant supply figures

| Quantity | Claude | Gemini | GPT |
|---|---|---|---|
| Iodine world output | about 30–33 kt/yr (USGS) | about 35–40 kt/yr (USGS 2024) | about 30–35 kt/yr (USGS MCS 2025) |
| Fleet share of iodine | 2–8% (feasible); 20–50% at gate scale (not credible) | about 1.3% | about 3% at 1 kt/yr; 15–33% at 5–10 kt/yr. GPT says Round 1's "1–5%" does not survive the higher-throughput case. |
| Krypton world output | 0.3–0.7 kt/yr, own estimate, **low confidence** (scaled from xenon) | 300–600 t/yr | **Rejects** the unsourced 300–600 t/yr as a procurement basis. Gives only an atmospheric lower-bound check of about 300 Mt of air per kt of Kr. |
| Krypton verdict | Fails: 2–4× world output | Fails: 80–160% of world output | Unverified at the required scale |
| Iodine delivered to L4/L5 | $1,000–5,000/kg, giving **$0.6–12B/yr** | $10,000–20,000/kg, giving **$5–10B/yr** | Not quantified |

Separately, Claude judges rq-0-14's $10–20k/kg Earth-supplied propellant cost as a "plausible upper range" within its wider $1–20k/kg band.

### 3.4 Correcting the deliberations (P0-F15)

| Item | Claude | Gemini | GPT |
|---|---|---|---|
| rq-0-14: 70–90 t/yr at 500 kW | Matches the **H₂ mass**; wrong by 4–8× as a propellant figure | Not challenged | Implies 39–50 kWh/kg, or large unreported downtime; "not an electrolysis-only result" |
| rq-0-30: 190-day subcooling margin | **Holds (conservative).** About 4.0 GJ stored; 3.2 years at 40 W; 190 days corresponds to about 240 W. Flags pressurant need near the triple point. | Adopted as stated | **Does not confirm it is conservative.** 2.5–5 GJ; 210–1,450 days at 40–135 W; 190 days corresponds to about 150–300 W. Needs H₂ property data, pressure limits, stratification and ortho/para treatment. |
| rq-0-47 (40–135 W) vs rq-0-30 (15–40 W) | The higher figure **governs**, giving 3–19 kWₑ at the 20 K stage | Uses 35 W | They are **not competing measurements** of one tank. Different inventory and geometry, so the larger cannot simply be chosen. 3–38 kWₑ at 40–135 W. |
| rq-0-48: MLI degradation 2–3.5× and LBMLI preference | Reasonable judgement; treat as a hypothesis | Adopted, with 3× cooler margin and 4× power margin | Unvalidated design hypotheses; use as test cases |
| rq-0-11, rq-0-18, rq-0-28, rq-0-29 | Not supplied; cannot verify | Not discussed | Gives dispositions for each (e.g. no automatic ISPP mass for human-rating; no ISPP hardware allowance for governance), but notes full conclusions for rq-0-28 and rq-0-29 were not supplied |
| Station spin | Not addressed | Non-spinning station with capillary PMDs; possible local centrifuge for phase separation | No whole-station spin required, but local acceleration is not prohibited. These are separate decisions. |

GPT adds four corrections that no other model raised:

- Smelter waste heat is an added tank heat load, not a cold sink.
- Subcooling does not reduce steady-state heat leak.
- 100 t of LH₂ occupies about 1,400 m³, a sphere roughly 14 m across.
- Insolation on a 100 t tank is about 204 kW before absorptance.

### 3.5 Phase 0B activation gate

| Position | Held by | Reasoning |
|---|---|---|
| Retain ≥25 kt/yr ore throughput and enforce it | Gemini | Do not deploy sunk capital before feedstock delivery is validated. Gemini names "commitment" against political pressure as the weakest link. |
| Replace with measured yield ≥200 t/yr **and** committed demand ≥200 t/yr **and** ≥0.5 MWe power margin | Claude | The fleet delivers only 2–7 kt/yr of ore, so 25 kt/yr is "very likely (~85%)" unreachable. As written, the gate "silently cancels ISPP." |
| Keep 25 kt/yr as a milestone, but it is neither necessary nor sufficient. Require measured yield, contracted demand, power and thermal margins, qualified transfer and storage, and lifecycle economics. | GPT | A small demonstration does not need 25 kt/yr. Commercial production needs more than throughput. |

### 3.6 Quantity, phasing of the first unit, and cost structure

| Model | Phase 0A | Phase 0B | Cost |
|---|---|---|---|
| Claude | **1 pilot (50–150 kWe)**, 3–8 t | 0–2 conditional 0.5 MWe modules, 8–15 t each | $0.35–0.8B committed + $0–0.5B conditional. Real-options justification: the pilot is worth its cost if Phase 1 demand has ≥30% probability (judgement). |
| Gemini | Interface reservation and volatile trap (about $100M) | 1 plant, 12 t (8–16), 450 kWe, 500 t/yr H₂O. F16 text also mentions a flight spare or ground qualification unit. | $0.6B total ($0.45–0.8B); separate prepurification skid $80–150M |
| GPT | **0 production skids** | 1 skid initially, second conditional; 5–15 t per skid; 100–300 t/yr; 0.1–0.5 MWₑ | $0.3–0.6B development + $0.2–0.8B conditional; capture $0.1–0.3B in bom-0-3, counted once. Committed phase total $14.11–14.61B; not a closed budget. |

Claude also notes a reasonable counter-position: capture-and-store only in Phase 0, with zero electrolysis. That is broadly Gemini's and GPT's Phase 0A position.

### 3.7 Water inventory

| Position | Held by | Reasoning |
|---|---|---|
| 100–1,000 t (nominal 300 t) | Claude | Storage for capture and stockpile |
| 30–100 t working inventory, with a disposition policy | GPT | At 625–4,500 t/yr recovery, 30–100 t fills in about 2–58 days. Full Phase 0A stockpiling "is not automatically justified" and may become a larger project than conversion. |
| Bladder tanks, size unspecified | Gemini | Simple storage at about 280 K |

### 3.8 Delivered product cost

| Position | Held by | Reasoning |
|---|---|---|
| $200–2,000/kg at the station. Central case $130–330/kg at full utilisation. | Claude | Claude partly disagrees with Round 1: the cost closes if the plant runs fully. The missing piece is a customer, not a cost pathway. |
| Not established | GPT | Capital-only $170–1,400/kg; the low end "is not a delivered-cost forecast." |
| Not addressed | Gemini | — |

### 3.9 Sunshield and product mix

| Model | Product mix | Sunshield |
|---|---|---|
| Claude | Water first; LOX only with a committed consumer | None for water; 10–20 m if LOX is stored; 60 m only with LH₂ in Phase 1 |
| Gemini | Water storage (Option B) with provision for on-demand LOX plus 350 bar GH₂ (Option C) | 35 m (25–45 m) modular 12-gore design |
| GPT | Water / LOX + managed GH₂ / LOX-LH₂ all uncommitted | Derive size from actual inventory and geometry; do not buy the 60 m shield now |

### 3.10 Interface values that depend on the throughput assumption

| Interface | Claude | Gemini | GPT |
|---|---|---|---|
| Volatile feed from bom-0-3 | 75–900 t/yr (fleet-limited; central about 300) | 500–1,500 t/yr | 625–4,500 t/yr (at 25 kt/yr ore) |
| Process heat | 0.1–0.5 MWₜₕ | Waste-heat rejection 350–500 kWₜₕ (a different flow) | 0.54–1.61 MWₜₕ |
| H₂ disposition | 1–20 t/yr H₂ make-up for a reductant loop in bom-0-3 | 50–100 t/yr GH₂ handling needed | 11–33 t/yr at pilot scale |
| bom-0-5 power conflict (100 MW vs 1–2.5 MW) | Conflicts. $5/W is 20–100× below present space PV cost; one figure must change. | "Shared 100 MW array / 2.5–5 MW bus" | Not necessarily contradictory (phase total vs initial allocation), but unreconciled |
| Data | 0.1–1 Mbps | 2 Mbps | 0.1–1 Mbps average |

### 3.11 What governs once documents are reconciled (P0-F16)

- **Claude:**
  - rq-0-14, as corrected, governs architecture.
  - The BOM governs quantity and budget.
  - Model provenance is metadata only.
  - Regenerate the consensus from the revised spec.
- **GPT:** proposes a hierarchy, highest first:
  1. configuration-controlled requirements;
  2. item specifications and change records;
  3. the BOM;
  4. model syntheses.

  The BOM records the existing estimate but is not proof that its technical description is correct. GPT would regenerate related consensuses only after their source specifications are reconciled. Neither a model consensus nor an uncorrected deliberation governs automatically.
- **Gemini:** rewrites the line item directly to one station plant at Sun–Earth L4/L5, operating at 450–700 °C, for $400–600M.

### 3.12 Fleet power and the 25 kt/yr gate

- **Claude** (only): the 15-tug fleet at about 1 MW per tug delivers 2–7 kt/yr of ore. Meeting 25 kt/yr would need about 60–150 MWe of tug power and 6–15 kt/yr of iodine. Claude also lists 7.5–22 MWe of fleet power with no assigned source.
- **GPT** independently reaches a similar power constraint (610–790 t/yr of propellant processed at 0.4 MW per tug).
- **Gemini** does not address fleet power.

---

## 4. Proposed BOM delta (for human review, not adopted)

| # | Action | Item | Supported by | Quantity | Unit-cost range (USD) | Confidence |
|---|---|---|---|---|---|---|
| 1 | **Resize** | bom-0-6, from 4 × $500M to reduced scope | All three (structure differs) | Claude: 1 pilot (50–150 kWe) with gas purification. Gemini: 1 station-integrated plant. GPT: see #2–#4. | Claude: 350M–800M. Gemini: 350M–650M. | Low (Claude, GPT); Medium (Gemini) |
| 2 | **Split** | bom-0-6 development and qualification programme, separate from hardware | GPT (Claude's committed/conditional split is similar in intent) | 1 | 300M–600M | Low |
| 3 | **Add / resize** | Conditional Phase 0B production modules or skids | Claude (0–2 modules of 0.5 MWe); GPT (1–2 skids) | Claude 0–2; GPT 1–2 | 100M–250M each (both) | Low |
| 4 | **Add** | Conditional pilot integration and commissioning | GPT | 1 | 100M–300M | Low |
| 5 | **Add / keep** | Volatile capture and bulk water storage, booked once in bom-0-3 | Claude (add); GPT (keep, add only if not already in the $10B station estimate); Gemini (a Phase 0A reservation of about $100M, carried inside bom-0-6) | 1 | 100M–300M (Claude, GPT); about 100M (Gemini) | Low |
| 6 | **Add** | Volatile prepurification / gas-cleanup skid | Gemini (separate item); Claude (included in #1); GPT (missing scope, uncosted) | 1 | 80M–150M (Gemini) | Medium (Gemini) |
| 7 | **Add (recurring)** | Tug propellant supply and logistics | Claude (costed); Gemini (in text: $5–10B/yr); GPT (separately budgeted Kr/I procurement, storage, loading, delivery; uncosted) | Claude 0.6–2.4 kt/yr; Gemini 380–510 t/yr; GPT pending a trajectory model | Claude: 0.6B–12B per year. Gemini: 5B–10B per year. | Medium (Claude, quantity); Low (cost) |
| 8 | **Remove** | Phase 0 LH₂ liquefaction, cryogenic tank farm, 60 m sunshield | Claude (remove); GPT ("do not purchase now"); Gemini (defers LH₂ in Decision 2 but keeps a 35 m shield and ZBO in its spec) | 0 | 0 | Medium |
| 9 | **Remove** | Integral bucket-wheel excavation from bom-0-6 | GPT (bom_delta); Claude (spec: excavation "None") | 1 scope element | 0 | High (Claude spec) |
| 10 | **Add** | Tug propulsion qualification line (iodine and/or water EP) | GPT (Decision B consequence) | — | Not costed | — |
| 11 | **Add** | Flight spare / ground qualification unit | Gemini (F16 text only) | 1 | Not separately costed | — |

Claude and GPT both caution that capture scope must not be double-counted across bom-0-3 and bom-0-6. GPT also states that the resulting phase total is not a closed budget, because propellant delivery, bulk storage, deployment and servicing remain incompletely costed.

---

## 5. Open questions: what would settle them

| Question | Divergence it settles | What would settle it | Raised by |
|---|---|---|---|
| Fleet power, trajectories, payloads, cadence | §3.2 demand (0.38 to more than 10 kt/yr); §3.5 gate reachability; §3.12 | A trajectory-and-power-based fleet model for bom-0-4. Claude's falsifier: bom-0-4 shows ≥60 MWe fleet power within its $2B budget. | All |
| Sun–Earth vs Earth–Moon L4/L5 | §3.1; ISPP value (2–5× per Claude) | An architecture decision record | All (Gemini assumes it settled) |
| Krypton world production | §3.3 | A market or supplier source | Claude, GPT |
| Iodine delivered cost and supplier expansion | §3.3 cost spread ($1–5k vs $10–20k/kg) | Launch pricing and refuelling-multiple analysis; supplier commitments | Claude, Gemini, GPT |
| Water-EP viability | §3.2 | Claude: a water thruster at Isp ≥1,500 s plus asteroid-site extraction demonstrated at ≥10 t/yr. GPT: a mission-equivalent endurance test including impurities and start cycles. Gemini: multi-hundred-kW qualification by Year 3. | All |
| Water release vs temperature and contaminant load | Agreed temperature envelope; yield; purification sizing | Thermogravimetry on Ryugu/Bennu and representative CI/CM material (Claude); integrated feedstock tests (GPT); measured S/N volatile concentrations (Gemini) | All |
| Committed Phase 0B/1 consumer for water, O₂ or H₂ | §3.5, §3.6, §3.9 | A binding mission manifest or propulsion decision (Claude's D3 falsifier; GPT's Decision C falsifier) | All |
| Need for impulsive chemical capture burns | §3.9 (Gemini's main risk for the Option B baseline) | Trajectory analysis for bom-0-4 capture windows | Gemini |
| Subcooling hold time and heat-leak governance | §3.4 | Tank-specific geometry and absorptance; LH₂ property data, pressure, stratification, ortho/para treatment | GPT (Claude computed it differently) |
| MLI and LBMLI degradation | §3.4 | Test data at L4/L5-representative fluences | Claude, GPT |
| Station power baseline (100 MW at $5/W vs 1–2.5 MW) | §3.10 | Reconciliation of delivered power, location, availability, commissioning date and concurrent loads | Claude, GPT |
| Whether the capture allowance is already inside the $10B station estimate | BOM delta #5 | A bom-0-3 cost breakdown | GPT |
| Water inventory before a customer exists | §3.7 | An inventory and disposition policy (retain, export, controlled rejection) | GPT |
| Does a bom-0-3 H₂ reduction loop justify Phase 0 electrolysis? | §3.6, §3.10 | bom-0-3 process design | Claude |
| Content of rq-0-11, rq-0-18, rq-0-28, rq-0-29 | P0-F15 "eight of nine" | Supply the full deliberation texts | Claude, GPT |

---

## 6. Decision-quality audit

**Methods each model used**

- **Claude:** the Composite Scaffold throughout; ACH for D4; GRADE EtD for D3; real options and Cost-of-Delay for D2 and D5; QOC for D5.
- **GPT:** QOC, GRADE EtD and ACH. GPT notes that its weights are "proposed review priorities, not approved programme values" and must be ratified.
- **Gemini:** the scaffold, with numeric weights and with QOC and ACH framing. It does not mention whether its weights need ratification.

### 6.1 Site, phasing and activation gate
(Claude D1 and D2; Gemini Decision 1; GPT Decision A)

| Model | Weakest link named | Scaffold steps found missing or unsupported | Trade-off / sensitivity classification |
|---|---|---|---|
| Claude (D1) | **Information**: the orbit was left unresolved | Step 7: the key assumption that Phase 0 consumers sit at the station is "falsified by F11." Step 5: the orbit is an unresolved sensitivity point. The warrant ("feedstock is already there") is sound for capture, weaker for production. | Sensitivity point: which L4/L5 |
| Claude (D2) | **Reasoning** | Step 8: Round 1 adopted the 25 kt/yr gate with no warrant linking throughput to propellant need. Steps 2 and 4: the throughput gate tests the wrong variable. Claude says GPT's Round 1 demand criteria "should govern." | Sensitivity point: tug fleet capacity |
| Gemini (D1) | **Commitment**: enforce the 25 kt/yr gate against pressure for a "prestige" demo | None identified in prior work. Gemini rates >90% likelihood, high confidence. It claims Option 3 achieves "90% of Option 1's utility at 10% of upfront cost." | Sensitivity: ore delivery schedule. Trade-off: 3–4 year demo delay vs about $1.5B saved. |
| GPT (A) | **Information**, then commitment | Step 6: claimed multi-billion savings from reserved interfaces rated **low confidence** (contrast Gemini's high-confidence capital saving). Step 8: the 25 kt/yr gate is neither necessary nor sufficient. | Sensitivity: capture yield. Trade-off: present interface cost vs future flexibility. |

### 6.2 Tug propellant: Kr/I vs water EP
(Claude D4; GPT Decision B; Gemini has no scaffolded decision, only "Camp A/B" in §5)

| Model | Weakest link named | Steps missing / unsupported | Classification |
|---|---|---|---|
| Claude | **Alternatives**: H3 (asteroid-site water) and the cost side of H1 were never developed | Step 3: alternatives incomplete. Step 7: Round 1's water-EP closure was "circular." ACH result: H1 (iodine) is least disconfirmed. Infeasibility of water EP from transported ore is "very likely, high confidence"; iodine affordability "about as likely as not, low confidence." | — |
| GPT | **Information** | Step 2: ISPP compatibility weighted at only 5%, which "must not dominate." Step 6: no defensible probability can yet be assigned for water-EP qualification. ACH result: "water closes both gaps" is the most assumption-dependent hypothesis. | Lower Isp vs feedstock simplicity is a values trade-off "only after mission feasibility is established" |
| Gemini | Not scaffolded | — | Presents iodine vs water as two camps without resolving them |

### 6.3 Product mix and cryogenic architecture
(Claude D3; Gemini Decision 2; GPT Decision C)

| Model | Weakest link named | Steps missing / unsupported | Classification |
|---|---|---|---|
| Claude | **Values**: Round 1 treated the question as a factual divergence | GRADE EtD: benefit of LH₂ now is low certainty. Round 1 Gemini's LH₂ retention "relied on rq-0-30 numbers that are wrong," which removes its information basis but not its values position. | **Reclassified as a trade-off point**: Isp and capability vs complexity, power and capital |
| Gemini | **Information**: tug trajectory analysis is not finalised; an impulsive chemical burn may be needed | GRADE: moderate evidence; 100 t LH₂ ZBO has no deep-space flight history | Trade-off: Option A's 450 s Isp vs subsystem fragility |
| GPT | **Values / customer commitment** | GRADE EtD: storage feasibility is better supported than affordability or operational readiness; ground ZBO and flight cryocoolers do not establish an operational large depot | Trade-off: higher chemical Isp vs complexity, "not evidence that one option is universally best." Sensitivity: heat leak, COP, transfer losses. |

### 6.4 Extraction temperature and process
(Claude D6; GPT Decision D; Gemini not scaffolded)

| Model | Weakest link named | Steps missing / unsupported | Classification |
|---|---|---|---|
| Claude | Not explicitly named | Step 1 framing: Round 1 rightly did not average the positions but "did not separate the factual part from the trade-off part" | **Mixed.** The fraction released below 400 °C is factual (settled by TGA); the setpoint is a trade-off between yield and energy/contamination. |
| GPT | **Information** | Rejects Round 1's "80% of clay-bound water below 500 °C" without feedstock-specific data. Proposes specifying performance and contaminant limits instead of a temperature. | Sensitivity: mineralogy and residence time. Trade-off: completeness of release vs energy, contamination and wear. |

### 6.5 Sizing, funding and configuration authority
(Claude D5; GPT Decision E; Gemini not scaffolded)

| Model | Weakest link named | Steps missing / unsupported | Classification |
|---|---|---|---|
| Claude | **Frame**: all three Round 1 models sized to different, unreconciled demand assumptions | Round 1 Claude sized to non-existent water-EP demand. Round 1 Gemini sized to the unreachable ore gate. Round 1 GPT's demand-gated structure is "most robust," but its $2B envelope overstates exposure. | Real-options framing (judgement) |
| GPT | **Commitment**, with weak cost information | Fixed four-unit procurement is "likely premature," medium confidence; all flight costs low confidence. Authority: an approved change record must identify the requirement, evidence, rejected alternatives, owner and BOM revision. | Sensitivity: utilisation dominates unit economics. Trade-off: development spend vs information. |

### 6.6 Other process critiques (GPT only)

GPT lists the following as Round 1 claims that should become verified functional requirements rather than assumptions:

- all-metal contacts;
- electrostatic dust mitigation;
- numerical autonomy levels;
- fixed data rates;
- the link between 30-day autonomy and quarterly crew visits;
- a "100 kW threshold" for storable propellant.

---

## Reviewer note

These are observations on consistency and provenance only. They introduce no new technical claims.

- **Provenance labels do not match.** The YAML `model:` fields read `claude-opus-4`, `senior-systems-engineer` and `ChatGPT`, against the headers Claude Opus 5.5, Gemini 3.8 Flash and GPT-6.1 Sol. This repeats the provenance problem that P0-F16 itself raises.
- **Gemini's submission is internally inconsistent on LH₂.** Decision 2 defers LH₂ liquefaction to Phase 1. Its revised-spec table and YAML, however, still carry an LH₂ ZBO cryocooler (2.8 kWₑ), a 35 m sunshield and a 56 t LH₂ yield.
- **Gemini's account of rq-0-30's cooling figure is ambiguous.** Its F15 summary attributes "~1.5–3.5 kWe" to rq-0-30, while its spec table lists rq-0-30's claim as 0.70 kWe.
- **Gemini's electrolyzer sizing basis may not match its stated recovery.** The 500 t/yr H₂O figure is labelled "sized to ≥25 kt/yr ore at 2–5% recovery." Its own stated range of 250–1,000 t/yr does not obviously correspond to that recovery span.
- **Unit typo in Claude.** The krypton entry "0.3–0.7 t × 10³/yr" is ambiguously written. Its prose and the derived "2–4× world output" ratio imply 0.3–0.7 kt/yr.
- **The demand basis behind ISPP sizing was never reconciled.** No model reconciled the three tug-demand methods (§3.2) into a single comparable basis. Every downstream ISPP sizing figure depends on that basis.
