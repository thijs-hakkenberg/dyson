---
phase: phase-0
item: bom-0-6
round: 1
type: reassessment
modelId: claude-opus-5-5
modelName: "Claude Opus 5.5"
endpoint: databricks-claude-opus-5-5
findings: 8607ae186f99
priorRound: null
generated: 2026-10-11T20:48:34.179Z
seconds: 262.774
---

# bom-0-6 In-Situ Propellant Production Systems (Phase 0): Re-assessment

## Summary of position

**The core problem is not the hardware.** In Phase 0 the ISPP item produces propellant (LOX, LH₂, water) that **no Phase 0 vehicle burns**. The tugs (bom-0-4) are krypton/iodine electric, and the station sits at L4/L5 and needs almost no chemical delta-v.

The item should be **re-scoped**:

- **Phase 0A:** volatile capture only, carried in bom-0-3 and costed there.
- **Phase 0B (years 3–5):** gated deployment of 1–2 station-integrated modules.
- **Product:** clean water first. LOX/GH₂ is optional. LH₂ liquefaction is deferred.

Whether ISPP is worth anything in Phase 0 depends on one architectural decision the BOM has not made: **what the tugs burn.**

---

## 1. Findings

### P0-F11: Tug propellant not in the BOM; ISPP output has no Phase 0 consumer

**Verdict: Agree.** The finding's estimate holds up, and the gap is larger than stated.

**Tug propellant demand (estimate).** Assumptions:

- Tug dry mass 10–20 t. This is my estimate; a $133M unit implies a large SEP vehicle.
- Returned cargo 100–300 t.
- Low-thrust Δv of 3–5 km/s per leg between the NEA and the L4/L5 station.
- Round trip of 1.5–2 years.

Krypton/iodine case, Isp 1,800 s (vₑ = 17.7 km/s), using the 4 km/s mid case:

- Mass-ratio factor: e^(4/17.7) − 1 = 0.254.
- Outbound, empty (15 t): 3.8 t.
- Return, loaded (215 t): 54.6 t.
- **Total ≈ 58 t per round trip.**
- Per vehicle: ≈ 30–40 t/yr.
- **Fleet of 15: ≈ 450–600 t/yr. Envelope over all assumptions: 200–1,500 t/yr.**

**Power check.** Spreading 58 t over about 1.2 years of thrusting gives ṁ ≈ 1.5×10⁻³ kg/s.

- P = ½ṁvₑ²/η = ½ × 1.5×10⁻³ × (17,700)² / 0.6 ≈ 0.4 MW per tug.
- This is a large but credible SEP tug. If the tugs really run at ~1,800 s, the ~100 t round-trip figure is the right order.

**Supply check.**

| Propellant | World supply | Fleet share | Assessment |
|---|---|---|---|
| Krypton | Estimated ~300–600 t/yr. Scaled from xenon production (~50–70 t/yr) by atmospheric mass abundance (~8×). Low confidence. | ~30–300% | **Fails at fleet scale for the same reason xenon did.** Krypton price is volatile (spiked 2022). |
| Iodine | ~30–33 kt/yr (USGS Mineral Commodity Summaries) | 1–5% | Supply is fine. |

Iodine has its own problems:

- High-power iodine Hall thrusters are TRL ~4. Flight heritage is small: ThrustMe NPT30-I2 (2020) is a sub-kW gridded ion thruster.
- Iodine is corrosive, condenses in feed lines and on spacecraft surfaces, and needs a heated feed system.
- **Logistics cost is unbudgeted.** At an estimated $1,000–5,000/kg delivered to Sun–Earth L4/L5, 600 t/yr costs **$0.6–3 B/yr**. Over a decade that is comparable to or larger than the entire $15.7 B Phase 0 BOM.

**Who consumes ISPP output in Phase 0 as currently specified?** Effectively nobody.

- Station-keeping at L4/L5 is a few m/s per year.
- Mining-robot reaction control is tonnes per year at most.
- Crewed visits (if rq-0-18 is adopted) need O₂ and water for life support, also tonnes per year.
- **Chemical demand: estimated < 20–50 t/yr in total.** A 600 t LOX + 100 t LH₂ tank farm (rq-0-30) has no Phase 0 customer.

**Way to close both gaps.** Make **water** the tug propellant, burned in water-compatible electric propulsion (electrothermal or RF/microwave thrusters, Isp ~800–1,000 s).

- At 1,000 s, mass-ratio factor = e^(4/9.81) − 1 = 0.50.
- Per round trip: 7.5 t outbound + 108 t return ≈ 116 t.
- Fleet demand: **≈ 0.9–1.2 kt/yr water (envelope 0.4–2.5 kt/yr)**.
- Required jet power is similar to the iodine case (~0.3 MW per tug for the same trip time), because lower Isp is offset by higher mass flow.

Water supply matches. The rq-0-14 Phase 0B gate is ≥25 kt/yr processed. At 5–20 wt% water in CI/CM-type feedstock, the station handles **1.25–5 kt/yr of water**. This is the same order as tug demand.

The weak link is maturity: water EP at 100s of kW per thruster is TRL ~3–4. That is the real trade.

**Proposed change:**

- Move ISPP hardware to Phase 0B per rq-0-14.
- Change the primary product to purified water.
- Add a BOM line for tug propellant supply.
- Run a binding Year-1–2 trade of iodine-from-Earth vs. water-EP. Water-EP qualification is about $100–300M of NRE.

---

### P0-F15: Concluded deliberations never written back into the spec

**Verdict: Agree.** The ISPP consensus reflects none of rq-0-14, rq-0-30, rq-0-47 or rq-0-48.

Several of those deliberations also contain numbers that do not survive a check:

**rq-0-14 (propellant production scope)**

- *What it changes:* hardware moves to Phase 0B, gated at ≥25 kt/yr; volatile capture (5–10 t) goes into Phase 0A inside bom-0-3; a 4–5 MW power backbone; the site is L4/L5, not the lunar south pole.
- *Check of its claim that 500 kW yields only 70–90 t/yr:*
  - 500 kW × 8,760 h × 0.85 availability = 3.7 GWh/yr.
  - At a station-side chain of 8–16 kWhₑ/kg water (feedstock delivered, LOX + GH₂, no LH₂), that is **230–470 t/yr**.
  - The 70–90 t/yr figure is pessimistic by 3–5×. It only holds if all extraction heat is electric and LH₂ liquefaction is included.

**rq-0-30 (cryogenic boil-off)**

- *What it changes:* ZBO storage behind a sunshield; two-stage cryocooling (80 K intercept plus 20 K stage); subcooled LH₂.
- *Check of its 20 K cooling-power claim:*
  - Carnot COP at 20 K rejecting to 300 K is 20/280 = 0.071.
  - Space cryocoolers achieve 15–20% of Carnot, so COP ≈ 0.011–0.014.
  - A 15–40 W heat lift therefore needs **1.1–3.6 kW**, not the 700 W claimed.
- *Check of its subcooling margin:*
  - Warming 100 t LH₂ from 15 K to 20.3 K absorbs ≈ 100 t × 9 kJ/(kg·K) × 5.3 K ≈ 4.8 GJ.
  - At 40 W that lasts ~1,400 days; at 135 W, ~410 days.
  - The claimed 190 days corresponds to ~290 W, so the claim is conservative and holds.
- *Tank-farm sizing:* 100 t LH₂ + 600 t LOX is mis-sized. The 100 t of LH₂ alone needs ~900 t of water, several years of Phase 0B output.
- *Its "30–40% Isp penalty" argument:* this compares storable chemical propellant against LOX/LH₂. That is the wrong comparison when the tugs are electric.

**rq-0-47 (sunshield)**

- *What it changes:* a 10–13 t, 60 m-class modular sunshield, owned by no BOM line.
- *Inconsistency:* its residual heat leak (40–135 W for a 50 t LH₂ tank) is higher than rq-0-30's (15–40 W for 100 t). The more conservative 40–135 W should govern.
- *Phase 0B sizing:* if the product is water and LOX only, a 15–20 m initial shield is sufficient. LOX at 90 K is far more tolerant than LH₂.

**rq-0-48 (MLI degradation)**

- *What it changes:* LBMLI insulation; cryocooler hardware sized at 3× laboratory MLI performance and power at 4×; outer-layer replacement every 7–10 years.
- *Effect on this item:* cryocooler power **5–40 kW**, plus a robotic servicing capability that is not in the BOM.

**rq-0-11 (hybrid gravity zones, 0.05–0.15 g)**

- *Benefit:* if ISPP is hosted in a spun section, gas/liquid separation in the electrolyser and the extraction gas handling become much easier.
- *Conflict:* rq-0-47 abandoned station spin. Local rotating modules are compatible with both, but this must be resolved.

**rq-0-18 (human-rating of tugs)**

- *Effect:* adds a small O₂/water life-support consumer, ~1–10 t/yr (estimate).

**rq-0-28 (ISRU cost methodology)**

- *Effect:* invalidates the "$200–500/kg delivered" claim at Phase 0B scale.
- *Check:* $1–2 B capex amortised over 5–10 years at 200–500 t/yr gives **$400–2,000/kg before operations**.
- $200–500/kg requires kt/yr throughput.
- Breakeven only exists if there is a consumer (see F11).

**rq-0-26 (excavation)**

- *Effect:* bucket-wheel and counter-rotating excavation belong to bom-0-2. Remove them from the ISPP description.

**rq-0-29 (governance)**

- *Effect:* no change to this item.

**Proposed change:** apply the values above (see section 2) and correct the rq-0-14 and rq-0-30 numbers flagged here.

---

### P0-F16: Consensus documents disagree with the BOM

**Verdict: Agree.** I disagree only on which document should yield.

**Inconsistencies:**

- **BOM text:** "NEA bucket-wheel, 1,000 °C", whereas the consensus recommends the lunar south pole plus an EML1 depot. The rq-0-14 deliberation instead places ISPP at the L4/L5 station.
- **Lunar site is unsupported:** the Phase 0 BOM contains no lunar lander, lunar power or EML1 depot, so the lunar recommendation cannot be executed within this phase.
- **Provenance:** the consensus header says Claude Opus 4.6 and "Date: 2025", while the BOM says Opus 4.5 and 2026-01-31.
- **Parser defect:** divergent-views.yaml truncates statements at decimal points ("(2", "~$6"). This is a regeneration bug.

**The 1,000 °C figure is technically wrong for water.**

- Phyllosilicate dehydroxylation in CI/CM chondrites occurs mostly at ~400–770 °C. This is based on thermogravimetric work on carbonaceous chondrites (e.g. Garenne et al. 2014; King et al. 2015).
- Going to 1,000 °C roughly doubles sensible heat:
  - cp ≈ 0.8–1.0 kJ/(kg·K) × 1,000 K ≈ 0.22–0.28 kWh per kg regolith.
  - At 10% water, that is ~2.2–2.8 kWhₜₕ per kg water before heat recuperation, versus ~1.1–1.4 kWhₜₕ at ~500 °C.
- It also releases more SO₂ from troilite, CO/CO₂ from carbonates, and organics. These contaminate the feed to a PEM electrolyser.

**Authoritative figures:** the **BOM line plus the concluded deliberations** (rq-0-14 location and phasing) should govern. The consensus should be regenerated from them, not the other way round.

**Proposed change:**

- Regenerate the consensus with an L4/L5 station-integrated, Phase 0B scope.
- Replace "bucket-wheel / 1,000 °C" with "receives pre-mined feedstock from bom-0-2/0-4; 450–750 °C extraction".
- Fix the YAML parser.

---

## 2. Revised specification

| Parameter | Old | New (range) | Basis | Confidence |
|---|---|---|---|---|
| Deployment phase | Phase 0 | Phase 0B, gated at ≥25 kt/yr station throughput | rq-0-14 | high |
| Site | Lunar south pole / NEA bucket-wheel | Integrated at L4/L5 Material Processing Station | rq-0-14; BOM has no lunar assets | high |
| Excavation | Bucket-wheel, counter-rotating | None (moved to bom-0-2) | rq-0-26 | high |
| Quantity | 4 units | 2 modules (1–2) | Demand calculation (F11) | medium |
| Unit cost | $500M | FOAK $250–600M (incl. share of NRE); recurring $100–250M | Consensus GPT range; rq-0-14 | low |
| Item total | $2.0B | ~$0.9B ($0.6–1.45B) incl. NRE $250–600M | Sum | low |
| Extraction temperature | 1,000 °C | 450–750 °C (high end optional for organics) | Chondrite TGA literature | medium |
| Extraction heat | unspecified | 0.15–0.25 kWhₜₕ/kg regolith; ≈1–2.5 kWhₜₕ/kg water at 10 wt%; solar-thermal | cp × ΔT calculation | medium |
| Electrolysis energy | 4–8 kWh/kg H₂O | PEM 5.3–6.5 kWhₑ/kg H₂O; SOEC 3.5–4.5 kWhₑ plus heat | HHV minimum 4.41 kWh/kg H₂O; PEM 48–58 kWh/kg H₂ | high |
| Chain energy (feedstock delivered) | 13–22 kWh/kg | Water only: 1–3 kWhₑ/kg. LOX + GH₂: 8–16 kWhₑ/kg. With LH₂: 12–22 kWhₑ/kg | Calculation | medium |
| Module electric power | 250 kWe | 0.5–1.0 MWe | Sized to demand | medium |
| Output per MWe-year (LOX + GH₂) | ~140–180 t (rq-0-14) | 400–900 t water processed | 8.76 GWh × 0.85 / (8–16 kWh/kg) | medium |
| Primary product | LOX / LH₂ | Purified water. LOX/GH₂ optional. LH₂ deferred | F11 consumer analysis | medium |
| Gas cleanup | none | S/C/organic scrub ahead of electrolysis, ~0.3–0.8 kWh/kg | Judgement | low |
| Cryogenic storage | 100 t LH₂ + 600 t LOX | Phase 0B: 0 t LH₂; 50–200 t LOX; 200–1,000 t water (non-cryogenic, ~273–300 K) | Demand calculation | medium |
| Cryocooler power | 10–20 kW | 5–40 kW (LOX-only storage at the low end) | Carnot/COP calculation; rq-0-48 margins | medium |
| Unit cost of propellant | $200–500/kg | $400–2,000/kg at Phase 0B scale | Amortisation calculation | low |
| Comms latency | 1.3 s – 24 min | ~8.3 min one-way (1 AU); design for 30+ days unattended | Geometry | high |

---

## 3. Interfaces

| With | Flow | Value | In BOM? |
|---|---|---|---|
| bom-0-3 | mass (feedstock in) | 1.25–5 kt/yr water-equivalent available at ≥25 kt/yr throughput; ISPP takes 0.4–1.8 kt/yr | Partly (volatile capture not yet in bom-0-3 spec) |
| bom-0-3 | other (structure, thermal) | Hard points; waste-heat rejection 0.3–1.5 MWₜₕ; part of the 4–5 MW backbone | No |
| bom-0-5 | power | 0.5–2 MWe plus cryocoolers 5–40 kW | Yes (BOM 100 MW vs. rq-0-14 2.5 MW disagree) |
| bom-0-5 / bom-0-3 | power (thermal) | 0.3–1.5 MWₜₕ solar concentrator for extraction | No |
| bom-0-4 | propellant | Kr/I: 0 t/yr. Water-EP: 0.4–2.5 kt/yr water | **No** |
| bom-0-4 | propellant (supply from Earth) | Iodine 200–1,500 t/yr | **No** |
| bom-0-2 | propellant | RCS/consumables, < 10–20 t/yr | No |
| crew / rq-0-18 | mass | O₂/water 1–10 t/yr | No |
| bom-0-7 / operations | data | Telemetry ~0.1–1 Mbps; 8 min latency | No |

---

## 4. Missing items or scope

1. **Tug propellant supply.** Either iodine launched from Earth (estimated $0.6–3 B/yr) or water-EP thruster development plus qualification ($100–300M NRE). This is the largest omission in the phase.
2. **Propellant storage segment.** Tanks, LBMLI, a sunshield sized to the Phase 0B product, cryocoolers, and transfer couplings to a standard interface (PDPIS). Estimated $150–500M. rq-0-47's 60 m / 10–13 t shield is only needed if LH₂ is adopted later.
3. **Volatile capture in Phase 0A.** Belongs to bom-0-3: 5–10 t, $50–150M. It must be written into the bom-0-3 spec, not just the deliberation.
4. **Robotic servicing.** Module swap, MLI outer-layer replacement, electrolyser stack replacement. No BOM line provides it.
5. **Propellant demand model.** rq-0-14 Action 1. It is a prerequisite for sizing this item and does not exist.
6. **Power baseline reconciliation.** The 2.5 MW station (rq-0-14) and the 100 MW array (bom-0-5) are irreconcilable as written.

---

## 5. Remaining disagreements and open questions

- **Iodine vs. water EP.** Iodine is ready sooner but creates a perpetual Earth-logistics bill and corrosion and contamination risks. Water EP closes the ISRU loop, but it costs roughly 2× the propellant mass and needs a low-TRL high-power thruster. Reasonable engineers will differ. The decision should be binding by Year 2.
- **Is there any Phase 0 value in LOX/LH₂?** It only has value if Phase 1 commits to chemical stages. Otherwise MRE and LH₂ work are Phase 1+ R&D, not Phase 0 hardware.
- **Site.** The lunar south pole offers short latency and Artemis customers. The L4/L5 station has co-located feedstock. This re-assessment follows rq-0-14, but a lunar demonstration may still be the cheaper first test of extraction. It would fall outside this BOM.
- **Feedstock water content.** 5–20 wt% spans 4× in output. Real yields from Phase 0A volatile capture should set Phase 0B module size.
- **Spin vs. no spin** for electrolysis phase separation (rq-0-11 vs. rq-0-47).
- **Krypton supply figure.** This is an estimate scaled from xenon. It needs a market source before krypton is formally ruled out.
- **Earth-delivered cost to L4/L5.** $1–20k/kg spans the case for and against ISRU. It needs the rq-0-28 methodology.

```yaml
item: bom-0-6
model: claude-opus-4
findings:
  - id: P0-F11
    verdict: agree
    summary: Fleet Kr/I demand is ~200–1,500 t/yr (krypton fails on world supply, iodine is supply-feasible but costs ~$0.6–3B/yr to deliver), and ISPP chemical output has essentially no Phase 0 consumer.
    proposed_change: Move ISPP hardware to Phase 0B, make purified water the primary product, add a tug-propellant supply line, and run a binding iodine-vs-water-EP trade by Year 2.
  - id: P0-F15
    verdict: agree
    summary: rq-0-14/30/47/48/11/18/28/26 change ISPP phasing, site, product, storage sizing and cost, and several of their own numbers (500 kW yield, 20 K cryocooler power, tank-farm size) are off by 2–5x.
    proposed_change: Apply the revised spec (Phase 0B, L4/L5, 0.5–1 MWe modules, 5–40 kW cryo, no LH2 in Phase 0B) and correct the rq-0-14 yield and rq-0-30 cooling-power figures.
  - id: P0-F16
    verdict: agree
    summary: Consensus (lunar south pole, EML1) contradicts both the BOM text and rq-0-14 (L4/L5 station), and the BOM's 1,000 C bucket-wheel description is technically wrong for water extraction.
    proposed_change: Regenerate the consensus with BOM plus deliberations as authoritative, extraction at 450–750 C on pre-mined feedstock, and fix the YAML truncation bug.
revised_spec:
  - parameter: deployment phase
    old: Phase 0
    new: Phase 0B gated at >=25 kt/yr station throughput
    range: [3, 5]
    unit: program year
    basis: literature
    confidence: high
  - parameter: quantity
    old: 4
    new: 2
    range: [1, 2]
    unit: modules
    basis: calculation
    confidence: medium
  - parameter: unit cost (FOAK)
    old: 500
    new: 400
    range: [250, 600]
    unit: USD M
    basis: judgement
    confidence: low
  - parameter: item total incl NRE
    old: 2000
    new: 900
    range: [600, 1450]
    unit: USD M
    basis: calculation
    confidence: low
  - parameter: extraction temperature
    old: 1000
    new: 600
    range: [450, 750]
    unit: degC
    basis: literature
    confidence: medium
  - parameter: electrolysis specific energy (PEM)
    old: 4-8
    new: 5.9
    range: [5.3, 6.5]
    unit: kWhe/kg H2O
    basis: calculation
    confidence: high
  - parameter: chain energy LOX+GH2 (feedstock delivered)
    old: 13-22
    new: 12
    range: [8, 16]
    unit: kWhe/kg H2O
    basis: calculation
    confidence: medium
  - parameter: module electric power
    old: 250
    new: 750
    range: [500, 1000]
    unit: kWe
    basis: calculation
    confidence: medium
  - parameter: output per MWe-year
    old: 140-180
    new: 600
    range: [400, 900]
    unit: t H2O processed/yr
    basis: calculation
    confidence: medium
  - parameter: LH2 storage in Phase 0B
    old: 100
    new: 0
    range: [0, 10]
    unit: t
    basis: judgement
    confidence: medium
  - parameter: LOX storage in Phase 0B
    old: 600
    new: 100
    range: [50, 200]
    unit: t
    basis: calculation
    confidence: medium
  - parameter: cryocooler power
    old: 10-20
    new: 15
    range: [5, 40]
    unit: kWe
    basis: calculation
    confidence: medium
  - parameter: delivered propellant cost at Phase 0B scale
    old: 200-500
    new: 1000
    range: [400, 2000]
    unit: USD/kg
    basis: calculation
    confidence: low
  - parameter: tug propellant demand (Kr/I at 1800 s)
    old: unspecified
    new: 600
    range: [200, 1500]
    unit: t/yr
    basis: calculation
    confidence: medium
  - parameter: tug propellant demand (water EP at 1000 s)
    old: unspecified
    new: 1100
    range: [400, 2500]
    unit: t/yr
    basis: calculation
    confidence: low
interfaces:
  - with: bom-0-3
    flow: mass
    value: 0.4-1.8 kt/yr water feed drawn from 1.25-5 kt/yr available
    in_bom: false
  - with: bom-0-5
    flow: power
    value: 0.5-2 MWe plus 5-40 kWe cryocooling
    in_bom: true
  - with: bom-0-5
    flow: power
    value: 0.3-1.5 MWth solar-thermal for extraction
    in_bom: false
  - with: bom-0-4
    flow: propellant
    value: 0 t/yr if Kr/I; 400-2500 t/yr water if water-EP adopted
    in_bom: false
  - with: bom-0-4
    flow: propellant
    value: 200-1500 t/yr iodine from Earth if Kr/I retained
    in_bom: false
  - with: bom-0-2
    flow: propellant
    value: <10-20 t/yr RCS/consumables
    in_bom: false
  - with: bom-0-7
    flow: data
    value: 0.1-1 Mbps telemetry, ~8.3 min one-way latency
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-6
    quantity: 2
    unit_cost_usd: [250000000, 600000000]
    rationale: Phase 0B gated, station-integrated water/LOX modules sized to demand rather than 4 x $500M Phase 0 units with no consumer.
  - action: add
    item: Tug propellant supply (iodine logistics or water-EP qualification)
    quantity: 1
    unit_cost_usd: [100000000, 3000000000]
    rationale: 200-1500 t/yr of tug propellant is unbudgeted; range spans water-EP NRE (low) to one year of iodine delivery (high).
  - action: add
    item: Propellant storage segment (tanks, LBMLI, sunshield, cryocoolers, transfer interface)
    quantity: 1
    unit_cost_usd: [150000000, 500000000]
    rationale: rq-0-30/47/48 storage hardware has no owning BOM line.
  - action: add
    item: Robotic servicing capability
    quantity: 1
    unit_cost_usd: [100000000, 400000000]
    rationale: Module swap and MLI and electrolyser replacement are assumed by rq-0-48 and the consensus but not provided.
  - action: keep
    item: bom-0-3
    quantity: 1
    unit_cost_usd: [50000000, 150000000]
    rationale: Phase 0A volatile capture and ISPP design-for provisions should be written into bom-0-3 at this incremental cost.
open_questions:
  - Will tugs burn iodine imported from Earth or water from ISPP via water-compatible electric propulsion, and can water EP reach flight TRL at ~0.3 MW per tug in time?
  - What is the measured water yield of the actual feedstock captured in Phase 0A (5-20 wt% spans 4x in module size)?
  - Does any Phase 0 or early Phase 1 vehicle require LOX/LH2, or should cryogenic production be deferred to Phase 1 entirely?
  - What is world krypton production from a market source, to confirm or reject krypton formally?
  - Is ISPP hosted in a spun section (rq-0-11) or a non-rotating station (rq-0-47), which governs electrolyser phase-separation design?
  - What is the true delivered cost per kg from Earth to Sun-Earth L4/L5 under the rq-0-28 methodology, which sets ISPP breakeven?
  - Which power baseline governs, 2.5-5 MW (rq-0-14) or 100 MW (bom-0-5)?
```
