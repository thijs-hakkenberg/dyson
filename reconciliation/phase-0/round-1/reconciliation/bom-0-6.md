---
phase: phase-0
item: bom-0-6
round: 1
type: reconciliation
synthesizer: claude-opus-5-5
panel: [claude-opus-5-5, gemini-3-8-flash, gpt-6-1-sol]
generated: 2026-10-11T23:23:24.146Z
---

# Reconciliation: bom-0-6 In-Situ Propellant Production Systems (Phase 0, round 1)

**Model labels.** Responses are identified by their headers: **Claude** (Claude Opus 5.5), **Gemini** (Gemini 3.8 Flash) and **GPT** (GPT-6.1 Sol). The YAML `model:` fields do not match these headers. Claude's reads `claude-opus-4`, Gemini's reads `claude-3-5-sonnet-20241022`, and GPT's reads `GPT-5.2`. See the Reviewer note.

---

## 1. Verdict matrix

| Finding | Claude | Gemini | GPT |
|---|---|---|---|
| **P0-F11**: Tug propellant not in the BOM; ISPP output has no Phase 0 consumer | agree | agree | partly |
| **P0-F15**: Concluded deliberations not written back into the spec | agree | agree | partly |
| **P0-F16**: Consensus documents disagree with the BOM | agree | agree | agree |

**P0-F11.** All three models agree on the core gap:

- The tugs (bom-0-4) burn krypton or iodine.
- ISPP produces water, LOX and LH₂.
- So ISPP has no committed Phase 0 customer.

GPT agrees with the interface gap but disputes how demand was estimated. It argues annual tug demand cannot be derived from fleet count and a per-trip allowance, and must come from trajectories and payloads. Claude and Gemini accept the finding's framing. Claude also produces its own estimate.

**P0-F15.** All three models agree that rq-0-14 (and the later thermal deliberations) are not reflected in the ISPP spec. They differ on how to write them back:

- **Gemini** writes the deliberation conclusions back largely as stated, including the rq-0-30 cooling power figures and the tank-farm sizing.
- **Claude and GPT** write back the architecture but reject several numbers:
  - the rq-0-14 yield at 500 kW;
  - the rq-0-30 cryocooler power;
  - the tank-farm sizing.
- **GPT** also says the "eight of nine" omission claim cannot be verified from the material supplied.

**P0-F16.** All three models agree that three architectures are mixed together:

- the BOM text (NEA bucket-wheel at 1,000 °C);
- the consensus (lunar south pole plus an EML1 depot);
- rq-0-14 (integrated into the L4/L5 station).

All three would adopt station-integrated recovery. GPT adds that regenerating the prose alone does not resolve the mismatch. It also argues that model-version metadata does not decide which engineering requirement is correct.

---

## 2. Agreed changes (supported by all three models)

| Change | Consolidated value / range | Notes on attribution |
|---|---|---|
| **Site** | Integrated into the material processing station (bom-0-3). No lunar south pole node, no NEA surface units, no EML1 depot as baseline. | All three. GPT adds that the station orbit must be stated explicitly: Sun–Earth or Earth–Moon L4/L5. Claude assumes Sun–Earth L4/L5 when costing logistics. Gemini states only "L4/L5". |
| **Phasing** | Phase 0A: volatile capture and reserved interfaces. Phase 0B: production hardware. | All three, following rq-0-14. Claude and Gemini use the ≥25 kt/yr station-throughput gate directly. GPT accepts it as a programme gate but would add measured water yield, customer demand and delivered-power margin as criteria. |
| **Excavation** | Removed from bom-0-6. Feedstock comes from bom-0-2 and bom-0-3. | All three. Claude cites rq-0-26 for this. |
| **Extraction temperature** | The universal 1,000 °C figure is retired. | All three. They do **not** agree on a replacement range (see §3). |
| **Product** | Purified water becomes a product, alongside or ahead of LOX. | All three include water. They differ on the priority of LH₂ (see §3). |
| **Quantity and cost** | Below the current 4 × $500M mandatory plants. | All three move away from four mandatory $500M units. Values diverge (see §3). |
| **Tug propellant interface** | Recorded as unresolved in the bom-0-4 interface. Zero ISPP output is compatible with the current Kr/I configuration. | All three. Claude and GPT state "0 t/yr" explicitly. Gemini marks it as a mismatch. |
| **Phase 0A volatile capture in bom-0-3** | Condenser and raw-volatile storage of about 5–10 t, written into bom-0-3. | Claude (5–10 t, $50–150M) and Gemini (5,000–10,000 kg, about $100M design-for reservation). GPT agrees with the capture provision ($100–300M, booked once across bom-0-3 and bom-0-6). GPT also warns that 5–10 t of storage cannot absorb the water that accumulates over time. |

### Points made by two models and not contested by the third

These are listed separately because the third model did not address them. They are not unanimous.

| Point | Supporting models | Third model |
|---|---|---|
| The rq-0-14 figure of 70–90 t/yr at 500 kW is too pessimistic. Claude gives 230–470 t/yr; GPT gives 350–580 t/yr. | Claude, GPT | Gemini does not address it. |
| The $200–500/kg delivered-cost claim does not close at Phase 0B or pilot scale. Claude gives $400–2,000/kg; GPT gives about $670–2,000/kg. | Claude, GPT | Gemini does not address it. |
| The 100 MW array (bom-0-5) and the 1–2.5 MW station power assumed in rq-0-14 need reconciling. | Claude, GPT | Gemini notes the 100 MW pool, marks the interface "Partially" in the BOM, and does not flag a conflict. |
| Iodine is supply-feasible at about 1–5% of world output (about 30–35 kt/yr, USGS). | Claude, GPT | Gemini does not quantify iodine. |
| Hydrogen handling still needs a plan even if LH₂ liquefaction is deferred. Claude specifies GH₂; GPT adds hydrogen disposition as a missing item. | Claude, GPT | Gemini discusses venting or burning GH₂ as a trade option. |
| The phase BOM total is about $15.7B (GPT: $15.71B), not $10B. | Claude, GPT | Not addressed. |

---

## 3. Preserved divergences

### 3.1 LH₂ liquefaction and the product mix

- **Claude:** Water first, LOX/GH₂ optional, LH₂ deferred.
  - Phase 0B storage: 0 t LH₂ and 50–200 t LOX.
  - Reason: there is no Phase 0 chemical consumer, so a 600 t LOX plus 100 t LH₂ farm has no customer.
- **GPT:** Water first, LOX plus managed H₂ "when demanded", LH₂ deferred.
  - Reasons: no defined customer, and flight-scale storage and transfer are unresolved.
- **Gemini:** Produce both water and cryogenic LOX/LH₂.
  - Its spec includes about 44 kWe of LH₂ liquefaction and keeps the rq-0-30 tank farm of 100 t LH₂ and 600 t LOX.
  - Customers would be transfer stages and third-party commercial or cislunar tugs.
  - It lists "LOX-only plus GH₂" as an open trade, noting the option reduces complexity by 70% but loses 12% of fuel mass.

### 3.2 Number of modules, unit power, and throughput

| | Claude | Gemini | GPT |
|---|---|---|---|
| Modules | 2 (range 1–2) | 1 flight skid plus 1 ground qualification unit (range 1–2) | 0 in Phase 0A; 0–4 customer-gated in Phase 0B |
| Electric power | 0.5–1.0 MWe per module | 375 kWe (300–600) in total | 20–120 kWe per module; 0.1–0.5 MWe for the pilot |
| Conversion | 400–900 t water per MWe-year. Interface: ISPP draws 0.4–1.8 kt/yr. | 500 t/yr water processed (range 200–1,000 or 250–1,000) | 25–75 t per module per year; 100–300 t/yr for the fleet |
| Basis | Sized to demand for water-EP tugs | Sized to a ≥25 kt/yr C-type ore gate | Demand-limited pilot judgement (low confidence) |

**Why the sizes differ.**

- Claude sizes production to a possible water-EP tug demand of about 1 kt/yr.
- Gemini sizes to the ore gate.
- GPT sizes to a pilot with no customer committed.

### 3.3 Cost of the item

| Model | Proposal |
|---|---|
| **Claude** | About $0.9B in total (range $0.6–1.45B). Includes NRE of $250–600M. FOAK unit $250–600M; recurring units $100–250M. |
| **Gemini** | $450M programme (range $350–600M in the table, $350–500M in the YAML). The F16 text also gives $500M: a $100M Phase 0A reservation plus a $400M Phase 0B deployment. |
| **GPT** | Keep $2B as a conditional envelope. Development $300–600M, four skids at $100–250M each, and integration $100–300M, giving $0.8–1.9B. Excludes deployment and major depot infrastructure. |

### 3.4 Extraction temperature

- **Claude:** 450–750 °C.
  - Basis: phyllosilicate dehydroxylation in CI/CM chondrites occurs at about 400–770 °C (citing Garenne et al. 2014 and King et al. 2015).
  - Going to 1,000 °C roughly doubles the sensible heat and releases more SO₂, CO/CO₂ and organics.
- **Gemini:** 200–500 °C.
  - Basis: 80% of free and clay-bound water desorbs in this range.
  - It treats ISPP as having a liquid water interface, with heating done in bom-0-3.
- **GPT:** Staged processing specific to the feedstock.
  - About 200–400 K for sublimation of free ice.
  - About 600–1,100 K for trials on hydrated material (about 327–827 °C).
  - Final setpoints need tests.
- **The conflict:** Claude and Gemini make conflicting claims about the temperature at which most water is released from carbonaceous chondrites.

### 3.5 Electrolysis and chain specific energy

- **Claude:**
  - PEM: 5.3–6.5 kWhₑ/kg H₂O.
  - LOX plus GH₂ chain: 8–16 kWhₑ/kg.
  - Water only: 1–3 kWhₑ/kg.
  - With LH₂: 12–22 kWhₑ/kg.
- **Gemini:** PEM or SOEC at 4.5–5.5 kWh/kg H₂O.
- **GPT:**
  - PEM electrolysis alone: 5.6–6.7 kWh/kg water.
  - With auxiliaries and LOX liquefaction: 6–10 kWh/kg.
  - Both exclude LH₂ liquefaction and raw-material heating.

### 3.6 Cryogenic thermal claims (rq-0-30, rq-0-47, rq-0-48)

**Cryocooler power for 15–40 W at 20 K**

- **Claude:** 1.1–3.6 kW, based on 15–20% of Carnot. This compares with the 700 W claimed.
- **GPT:** 1–11 kW, based on 5–20% of Carnot. A 700 W allowance is "not conservative".
- **Gemini:** Accepts 10–20 kWe for the farm, and a ZBO figure of 15 kWe (10–30) including a 3× margin.

**Item cryocooler power**

- **Claude:** 5–40 kW.
- **Gemini:** 15 kWe.
- **GPT:** Should be derived from a heat-leak model rather than fixed.

**Tank farm (100 t LH₂ + 600 t LOX)**

- **Claude:** Mis-sized. The 100 t of LH₂ alone needs about 900 t of water.
- **GPT:** The 6:1 ratio is not stoichiometric; electrolysis gives 8:1. The LH₂ would need about 1,400 m³, roughly a 14 m sphere.
- **Gemini:** Retains the farm in the shadow of the 60 m shield.

**The 190-day subcooling claim**

- **Claude:** Calculates it as conservative, so it holds.
- **GPT:** It needs an explicit enthalpy and heat-leak calculation. Subcooling does not reduce steady-state heat leak.

**Sunshield size**

- **Claude:** A 15–20 m initial shield is enough for water and LOX. The 60 m, 10–13 t shield is needed only if LH₂ is adopted.
- **GPT:** Do not automatically assign a 60 m shield to a small pilot.
- **Gemini:** Places the farm in the 60 m shadow.
- **Claude also notes:** rq-0-47's residual heat leak (40–135 W) exceeds rq-0-30's (15–40 W), and the higher figure should govern.

**MLI and LBMLI (rq-0-48)**

- **Claude and Gemini:** Adopt the margins.
- **GPT:** Treat the 2–3.5× degradation figure and the preference for LBMLI as hypotheses to validate.

### 3.7 Tug propellant demand and supply

**Kr/I demand**

- **Claude:**
  - About 58 t per round trip.
  - Fleet total about 450–600 t/yr, within an envelope of 200–1,500 t/yr.
  - About 0.4 MW per tug.
- **GPT:**
  - 100 t per trip implies about 250–540 t of final mass moved.
  - 1,000–1,500 t/yr if every tug makes one trip per year.
  - Inbound transport of 25 kt/yr alone would need about 2,200–4,600 t/yr, which GPT calls illustrative only.
  - Fleet power about 7.6–9.9 MW for 1,000 t/yr.
  - Annual demand cannot be determined without trajectories.
- **Gemini:** About 100 t/yr in its open question.

**Krypton supply**

- **Claude:** About 300–600 t/yr world supply, scaled from xenon with low confidence. Krypton fails at fleet scale.
- **Gemini:** About 300 t/yr, which would be severely strained.
- **GPT:** No reliable inventory figure is available. It gives an air-processing check instead: about 300 Mt of air per year for 1,000 t of krypton.

**Iodine delivery cost**

- **Claude:** $0.6–3B/yr at an estimated $1,000–5,000/kg delivered.
- **GPT:** Leaves the cost unestimated.

### 3.8 Water electric propulsion as the closing architecture

- **Claude:**
  - Proposes water EP as the way to close both gaps: electrothermal or RF/microwave thrusters at an Isp of about 800–1,000 s.
  - Fleet demand would be about 0.9–1.2 kt/yr of water, which matches 1.25–5 kt/yr of station supply.
  - Water EP is TRL about 3–4 at hundreds of kW. Qualification NRE would be $100–300M.
  - Calls for a binding iodine-versus-water-EP trade by Year 2.
- **Gemini:**
  - Water-plasma Hall thrusters at an Isp of about 1,200–1,600 s, or steam-thermal at about 190–210 s.
  - Presents switching bom-0-4 to water plasma as directly aligning ISPP output with tug demand.
- **GPT:**
  - Treats water-fed propulsion as a possible vehicle redesign, not an assumed interface.
  - Assigns zero committed Phase 0A tug consumption.
  - Holds that neither chemical nor Kr/I propulsion is universally superior.

### 3.9 Chemical consumer vehicles

- **Gemini:** Lists high-thrust chemical transfer tugs or excursion vehicles as missing scope if LOX/LH₂ is kept.
- **Claude:** LOX/LH₂ has value only if Phase 1 commits to chemical stages. Otherwise it is Phase 1+ R&D.
- **GPT:** A lunar mine, landers or an EML1 depot would be separate optional BOM lines.

### 3.10 Recovered water at the station gate

- **Claude:** 1.25–5 kt/yr, from 5–20 wt% water. No recovery factor is stated.
- **Gemini:** 1,250–5,000 t/yr, from 25–50 kt at 5–10 wt%. Its ISPP feedstock interface is 500–1,500 t/yr in the spec and 250–1,250 t/yr in the interface table.
- **GPT:** 625–4,500 t/yr, from 5–20 wt% with 50–90% recovery.

### 3.11 Module mass, extraction heat, autonomy and data

**Module dry mass**

- **Gemini:** 12.5 t (10–18).
- **GPT:** 2–8 t, excluding arrays and bulk storage.
- **Claude:** No figure.

**Extraction heat**

- **Claude:** 0.15–0.25 kWhₜₕ/kg regolith, delivered by a 0.3–1.5 MWₜₕ solar concentrator.
- **GPT:**
  - 0.10–0.22 kWh/kg as the base figure.
  - An allowance of 0.15–0.45 kWh/kg, giving 0.5–1.6 MWₜₕ.
  - This load is shared with material processing.

**Data and autonomy**

- **Gemini:** 10 Mbps continuous, "Level 3 autonomy".
- **Claude:** 0.1–1 Mbps, about 8.3 min one-way latency, designed for 30+ days unattended.
- **GPT:** Numerical autonomy levels are not universal requirements. Specify unattended duration, fault containment and recovery instead.

### 3.12 Spin (rq-0-11 vs rq-0-47)

- **Claude:** A spun section would make gas/liquid separation easier, but conflicts with rq-0-47. This must be resolved.
- **Gemini:** The station is non-spinning and uses capillary PMDs.
- **GPT:** No global ISPP spin requirement. Separate dusty processing from clean cryogenic zones.

### 3.13 Which document governs

- **Claude:** The BOM line plus the concluded deliberations govern, and the consensus should be regenerated from them.
- **Gemini:** The station-integrated module is authoritative.
- **GPT:**
  - The phase BOM sets quantity and budget, but its technical description is superseded.
  - The consensus cannot be regenerated from specs that were not supplied.
  - Model-generation metadata should be recorded separately from requirements provenance.

---

## 4. Proposed BOM delta (proposals for human review; nothing here is adopted)

| # | Action | Item | Supporting models | Quantity | Unit cost range | Confidence |
|---|---|---|---|---|---|---|
| 1a | resize | bom-0-6 | Claude | 2 modules (1–2) | $250–600M (FOAK, including a share of NRE); item total $0.6–1.45B | low |
| 1b | resize | bom-0-6 | Gemini | 1 integrated skid | $350–500M (YAML); $350–600M (table) | medium (Gemini's own rating) |
| 1c | split | bom-0-6 → development and qualification programme | GPT | 1 programme | $300–600M | low (judgement) |
| 1d | split | bom-0-6 → conditional Phase 0B production skids | GPT | 0–4 | $100–250M each | low (judgement) |
| 2 | add / keep in bom-0-3 | Phase 0A volatile capture and reserved ISPP interfaces | Claude (keep bom-0-3, $50–150M); GPT (add, booked once, $100–300M); Gemini (design-for reservation of about $100M, in prose only) | 1 | $50–300M across the proposals | low–medium |
| 3 | add | Tug propellant supply (iodine logistics or water-EP qualification) | Claude ($100M–3B); GPT (Kr/I procurement, unestimated) | 1 | $100M–3B (Claude); null (GPT) | low |
| 4 | add | Propellant storage segment: tanks, LBMLI, sunshield, cryocoolers, transfer interface | Claude ($150–500M); GPT (cryogenic storage and transfer qualification, unestimated); Gemini (cryogenic transfer system as missing scope, uncosted) | 1 | $150–500M (Claude); null (GPT) | low |
| 5 | add | Bulk water storage and hydrogen disposition | GPT | 1, sized to inventory | null | low |
| 6 | add | Robotic servicing capability | Claude ($100–400M); GPT (deployment and servicing as missing scope, no line) | 1 | $100–400M | low |
| 7 | conditional add | High-thrust chemical consumer vehicles (needed only if LOX/LH₂ is kept) | Gemini (missing scope, uncosted) | — | not estimated | — |
| 8 | conditional add | Lunar extraction and EML1 depot as separate options, not defaults | GPT | — | not estimated | — |
| 9 | flag (no line) | Tug power systems, possibly multi-MW across the fleet, to sit in bom-0-4 | GPT | — | not estimated | — |
| 10 | flag (no line) | Volatile purification and gas cleanup ahead of electrolysis | GPT (missing scope); Claude (spec line, about 0.3–0.8 kWh/kg) | — | not estimated | low |

---

## 5. Open questions and what would settle them

| Question | Raised by | What would settle it |
|---|---|---|
| Will the tugs burn iodine from Earth or water from ISPP? Can water EP reach flight TRL at about 0.3 MW per tug, and at which Isp (Claude ~800–1,000 s; Gemini ~1,200–1,600 s)? | Claude, Gemini, GPT | A binding propulsion trade by Year 2 (Claude). Thruster life and throughput qualification. A trajectory-based fleet demand model (GPT; this is also Action 1 of rq-0-14, per Claude). |
| What are the actual trajectories, payloads and utilisation that set tug propellant demand? | GPT, Claude | A trajectory analysis that treats outbound and inbound legs separately. |
| What is world krypton production? | Claude, Gemini, GPT | A market or industry source. Claude says this is needed before krypton is formally ruled out. |
| At what temperature is water actually released, and what is the recoverable yield, from representative feedstock (5–20 wt%, recovery 50–90%)? | Claude, GPT, plus the Claude–Gemini temperature conflict | Thermogravimetric and process tests on representative material. Measured Phase 0A capture yields used to size Phase 0B modules. |
| Is any LOX or LH₂ customer committed in Phase 0B or early Phase 1? | Claude, Gemini, GPT | A propellant demand model and Phase 1 architecture decisions. |
| Is the station at Sun–Earth or Earth–Moon L4/L5? | GPT | An architecture decision. It affects thermal, communications and logistics figures. |
| Which power baseline governs: 1–5 MW at the station (rq-0-14) or 100 MW (bom-0-5)? How much is delivered at each deployment stage? | Claude, GPT | A power budget reconciliation across bom-0-3, bom-0-5 and bom-0-6. |
| What is the actual 20 K cryocooler power and hold time? Which heat leak governs, rq-0-30 (15–40 W) or rq-0-47 (40–135 W)? | Claude, GPT; Gemini accepts rq-0-30 | An explicit heat-leak and enthalpy model for the actual inventory and geometry. Flight cryocooler COP data. |
| What inventory size justifies cryogenic storage over water storage with deferred conversion? | GPT, Claude | A storage trade sized against demand. |
| Should the ISPP be hosted in a spun section (rq-0-11) or a non-rotating station (rq-0-47)? | Claude, Gemini | A station layout decision. Electrolyser phase-separation design in each case. |
| What is the delivered cost per kg from Earth to L4/L5? Claude gives a span of $1–20k/kg. | Claude, GPT | Applying the rq-0-28 methodology. |
| Should water be extracted at the asteroid or at the station? | GPT | A combined trade of logistics mass, metals demand and trajectories. |
| LOX-only with high-pressure GH₂ storage, or full LH₂ liquefaction? | Gemini, Claude, GPT | A trade covering complexity, cooling power and the value of the lost hydrogen. |

---

## Reviewer note

The following were observed during reconciliation. They are not panel positions.

1. **Model identity labels are inconsistent.** None of the three YAML `model:` fields matches its response header. Gemini's response also refers to "Gemini's proposal" in the third person. Provenance should be confirmed before the outputs are archived. This echoes the metadata concern raised under P0-F16.
2. **Gemini's power derivation has a units error.** It writes "500 t/yr = 5.7×10⁴ kg/hr". Its own LOX and LH₂ rates (50.7 and 6.34 kg/hr) and its 285 kWe result are consistent with about 57 kg/hr, so the stated figure appears to be a typo. It should still be corrected.
3. **Gemini's cost figures are internally inconsistent:**
   - $500M total in the F16 text;
   - $450M in the table, with a range of $350–600M;
   - $350–500M in the YAML.
4. **Claude's add #3 mixes cost types.** Its $100M–3B range combines a one-time NRE with an annual iodine delivery cost. Recurring and non-recurring costs would need separating before review.
5. **Claude's bom-0-3 mass interface is marked inconsistently.** It is "Partly" in the prose table and `in_bom: false` in the YAML.
6. **Total phase cost impact is missing.** No model summed the effect of its proposed adds on the $15.7B phase total.
7. **Temperatures are reported in mixed units.** GPT uses K while Claude and Gemini use °C. Values should be put on one scale before the temperature divergence is adjudicated.
