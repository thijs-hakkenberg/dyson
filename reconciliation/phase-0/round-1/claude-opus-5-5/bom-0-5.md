---
phase: phase-0
item: bom-0-5
round: 1
type: reassessment
modelId: claude-opus-5-5
modelName: "Claude Opus 5.5"
endpoint: databricks-claude-opus-5-5
findings: 8607ae186f99
priorRound: null
generated: 2026-10-11T20:44:46.627Z
seconds: 227.537
---

# bom-0-5 Solar Power Arrays (Phase 0): Re-assessment

**Summary.**
- **Capacity.** The 100 MW figure is roughly right, but only because the refining station needs about 35–80 MW. No document currently says so.
- **Storage.** The 500 MWh of storage is in the wrong place and about 20× too large.
- **Cost.** $5/W is a terrestrial price. A defensible space-delivered figure is about $20–160/W, central about $45/W, which puts the line at about $2–16B with a central value of about $4.5B.
- **Distribution voltage.** The 600 V DC primary bus does not work at station scale.

**Common assumptions.**
- 1 AU solar constant: 1,361 W/m².
- 1 year = 8,766 h. Average power of 1 MW for a year is 8.77 GWh.
- 50 kt/yr is taken to be the station's refined-product output (from P0-F03).
- I do not have the text of P0-F01. I carry an explicit reserve allocation for it.

---

## 1. Findings

### P0-F03: Station power cannot refine 50 kt/yr. Verdict: **agree**

**Conversion factor.** 1 kWh/kg × 50 kt/yr = 5×10⁷ kWh/yr, which is about **5.7 MW average**.

**Thermodynamic floors (checks on the finding's numbers):**

| Process | Basis | Floor |
|---|---|---|
| Fe heated 300 → 1,811 K plus fusion (≈1.1 + 0.25 MJ/kg) | Sensible + latent heat | ≈1.35 MJ/kg ≈ **0.37 kWh/kg** (heat) |
| Al₂O₃ → Al | ΔH_f 1,676 kJ/mol per 54 g Al | 31 MJ/kg ≈ **8.6 kWh/kg** |
| SiO₂ → Si | ΔH_f 911 kJ/mol per 28 g Si | 32.5 MJ/kg ≈ **9.0 kWh/kg** |
| FeO → Fe (if iron is not native) | ΔH_f 272 kJ/mol per 55.8 g | ≈ **1.35 kWh/kg** |

**Practical values, with sources:**
- Terrestrial Hall-Héroult aluminium runs at 13–15 kWh/kg with consumable carbon anodes.
- Carbon-free routes (molten regolith electrolysis, MRE, or inert anode) are estimated at 15–25 kWh/kg.
- Published MRE studies for lunar oxygen give roughly 10–15 kWh/kg O₂ at scale (Sibille, Schreiner et al.).
- Solar-grade silicon adds 30–100 kWh/kg. The Siemens process is about 40–60 kWh/kg in modern plants; upgraded metallurgical silicon (UMG) is lower but lower purity.

**Assumed product slate.** This is my estimate; no document fixes the slate.

| Product | kt/yr | kWh/kg (electrical-equivalent) | GWh/yr | MW avg |
|---|---|---|---|---|
| Native Fe-Ni: melt, cast, refine (carbonyl or remelt) | 35 | 0.5–1.5 | 18–53 | 2.0–6.0 |
| Al by MRE / inert anode | 4 | 15–25 | 60–100 | 6.8–11.4 |
| Metallurgical Si by MRE | 5 | 15–30 | 75–150 | 8.6–17.1 |
| Solar-grade upgrade (1 kt of the 5) | 1 | +30–100 | 30–100 | 3.4–11.4 |
| O₂ co-product (~0.9–1.1 kg per kg Al or Si) | ~10 | included above | — | — |
| Beneficiation of ~150 kt ore (crush, magnetic separation) | (150 ore) | 0.05–0.2 | 8–30 | 0.9–3.4 |
| Fabrication, housekeeping, thermal-control pumping | — | — | — | 2–5 |
| **Total average load** | | | | **≈24–54 MW** |

**Converting load to array size:**
- Divide by 0.85 for plant availability and 0.9 for power-management and distribution (PMAD) efficiency. This gives **31–71 MW at end of life (EOL)**.
- Allow about 12% degradation over 15 years. This gives **35–81 MW at beginning of life (BOL)**, central about 60 MW.
- If the feed is oxide-only, with no native metal, MRE iron at 5–8 kWh/kg × 35 kt adds 20–32 MW. That pushes the station alone to **≈100–120 MW**.

**Conclusions:**
- The 1–2.5 MW in the station consensus is wrong by a factor of 15–50.
- Supply should come from bom-0-5, explicitly allocated.
- Roughly 3–15 MW of the load is process heat: Fe-Ni melting, Si directional solidification, and ISPP regolith heating. Solar-thermal concentrators can supply this at much lower mass and cost per watt than photovoltaics (PV).

**Proposed change:**
- bom-0-3 states energy per kg per product, as in the table above.
- bom-0-5 allocates 70–85 MW BOL to the station.
- The station's product slate is fixed. Native-metal-rich feed is a design requirement; otherwise the power budget breaks.

### P0-F04: 100 MW with ~5 MW of loads, no site split, storage where there is no night. Verdict: **partly agree**

**Where I agree:**
- No allocation exists.
- The site split is unstated.
- Storage is mis-sited. Sun–Earth L4/L5 has no eclipse, and 500 MWh at 120–180 Wh/kg (pack level) is **2,800–4,200 t**. That is more than the arrays themselves.

**Where I disagree:**
- I disagree that "~95 MW has no load". Once P0-F03 is applied, the station absorbs most of it. The defect is documentation, not oversizing.

**Mining-site sizing.** Assume 2–4 active NEA sites, each with 5–10 robots and one ISPP unit.

*Per-site loads:*
- Robots: 5–10 × 20–50 kW at 50% duty, giving a peak of 0.1–0.5 MW.
- ISPP: 0.25 MWe.
- Avionics, communications and thermal control: 0.02–0.05 MW.
- Total per site: **0.4–0.8 MW peak**.

*Check on the ISPP figure:*
- Heating regolith at 10 wt% water: 10 kg regolith × ~0.9 MJ/kg plus about 3 MJ dehydration gives about 3.3 kWh per kg H₂O.
- Electrolysis: 4.4 kWh/kg H₂O thermodynamic, about 5.5 kWh/kg practical.
- Total: about 9 kWh per kg H₂O.
- So 250 kWe all-electric produces about **240 t/yr of water per unit**. If propellant demand is higher, ISPP power scales at about 9 kWh/kg, less any heat supplied by concentrators.

*Array derates:*
- Day/night operation: arrays must carry the load and recharge storage, a factor of about 2.2× the load.
- Heliocentric distance: NEA aphelia of about 1.3–1.5 AU reduce flux by 0.44–0.6×.
- Result: **1.5–3 MW nameplate (rated at 1 AU) per site**, and **6–12 MW for 4 sites**.

**Mining-site storage:**
- NEA rotation periods for 0.1–1 km bodies are about 2.2–10 h, so nights are about 1–5 h.
- Critical night load (robots and keep-warm; ISPP idles) is 0.1–0.5 MW, giving 0.1–2.5 MWh of night energy.
- Cycling is about 1,000–4,000 cycles/yr, or 15,000–60,000 over 15 years. That requires shallow depth of discharge (30–50%), as on LEO spacecraft, or lithium titanate (LTO) / lithium iron phosphate (LFP) chemistry.
- Result: **0.5–4 MWh installed per site**.

**Station storage:**
- Storage covers controlled shutdown, avionics and attitude safe-hold, and keeping MRE cells and electronics alive through faults: about 3–5 MW for 1–3 h.
- Result: **5–15 MWh**.
- Hot thermal mass in the MRE cells handles longer ride-through more cheaply.

**Total storage: about 7–30 MWh, 40–250 t, versus 200–500 MWh.**

**Flow batteries.** At about 20–30 Wh/kg, with electrolyte freezing and pumps to manage, they are not credible for space at this scale. Reject.

**Allocation (BOL, rated at 1 AU):**

| Use | MW |
|---|---|
| Station | 70–85 |
| Mining sites | 6–12 |
| Reserve for P0-F01, spares and growth | 5–10 |
| **Total** | **≈100** (range 80–130) |

### P0-F05: $5/W is far below current prices and excludes launch. Verdict: **agree**

**Current prices.**
- Space-qualified III-V cells sit at the high end of the finding's "tens to hundreds of $/W" range, typically well above $100/W at the coverglass-interconnected-cell (CIC) level. This is industry-quoted and order-of-magnitude.
- Heritage arrays at full array level are generally in the several-hundred $/W range.
- At heritage prices, 100 MW costs $30–100B. That is not a viable planning basis.

**Basis for the revised estimate:**
- Mass-produced flexible blankets, either thin III-V (inverted metamorphic, epitaxial lift-off, hydride vapour-phase epitaxy) or space-grade silicon heterojunction cells (the Starlink-class approach).
- Radiation is modest. L4/L5 and NEA orbits are interplanetary, with no trapped belts, so degradation is dominated by solar proton events. That makes silicon viable.

**Mass basis:**
- System specific power is 60–150 W/kg including structure, tracking and PMAD.
- So 100 MW is **670–1,700 t**. The finding's ~1,000 t is right as a central value.

**Launch arithmetic:**
- Cost in $/W = ($/kg) ÷ (W/kg).
- At 100 W/kg, $500/kg to LEO is $5/W, and $2,000/kg is $20/W.
- Moving from LEO to L4/L5 adds a 1.5–3× cost multiplier.
- With solar-electric propulsion (SEP): Δv about 6–7 km/s low-thrust, specific impulse about 2,000 s, propellant fraction about 0.30. That is **300–500 t of propellant**, which strains world krypton supply (estimated order 100 t/yr; I am not certain of this figure). Use iodine or chemical stages.

| Element | Low $/W | Central $/W | High $/W |
|---|---|---|---|
| Cells and blanket | 8 | 15 | 60 |
| Structure, deployment, tracking | 4 | 8 | 20 |
| PMAD and high-voltage distribution | 3 | 6 | 15 |
| Launch to LEO | 1 | 5 | 20 |
| LEO → L4/L5 and NEAs | 1.5 | 6 | 30 |
| Integration, robotic assembly, test, operations | 2 | 5 | 15 |
| Storage (7–30 MWh at $1–3k/kWh) | 0.1 | 0.3 | 0.9 |
| **Total** | **≈20** | **≈45** | **≈160** |

**Line cost: $2–16B, central ≈ $4.5B.** Confidence is low. Cost is driven by blanket manufacturing scale and launch price.

---

## 2. Revised specification

| Parameter | Old → New | Range | Basis | Confidence |
|---|---|---|---|---|
| Total capacity | 100 MW at 1 AU (unallocated) → 100 MW BOL nameplate, allocated | 80–130 MW | calculation (F03/F04) | medium |
| Station allocation | unspecified → 78 MW BOL | 70–85 | calculation | medium |
| Mining-site allocation | unspecified → 9 MW (4 sites × 1.5–3 MW) | 6–12 | calculation | low |
| Reserve / spares | unspecified → 8 MW | 5–10 | judgement | low |
| Cell technology | III-V 32–36% mandatory → technology-neutral; choose by $/W delivered at EOL (thin III-V or space Si) | 20–34% BOL | judgement | medium |
| Degradation | <1.5%/yr → 0.5–1.2%/yr (interplanetary) | 0.5–1.5 | literature (solar-proton fluence models) / judgement | medium |
| Array area | unspecified → ~0.3 km² (III-V) to ~0.45 km² (Si) | 0.27–0.5 | calculation: 100 MW ÷ (1,361 × η × 0.9) | medium |
| System specific power | ~100 W/kg implied → 60–150 W/kg | 60–150 | literature (ROSA-class ~100+ W/kg, wing level) / judgement | medium |
| Delivered mass | unspecified → ~1,000 t | 670–1,700 | calculation | medium |
| Primary distribution | 600 V DC → 1.5–5 kV DC trunk, step-down at loads (MRE needs low-voltage/high-current DC) | 1.5–5 | calculation (below) | medium |
| Storage, station | 200–500 MWh → 10 MWh | 5–15 | calculation | medium |
| Storage, per mining site | 0 → 2 MWh | 0.5–4 | calculation | low |
| Storage chemistry | Li-ion or flow → Li-ion (LFP/LTO), shallow depth of discharge at NEAs; no flow batteries | — | judgement | medium |
| Module size | 2 MW → 1–2 MW (2 MW ≈ 13–33 t, one launch) | 1–2 | calculation | medium |
| Unit cost | $5/W → $45/W | 20–160 | calculation | low |
| Line cost | $500M → $4.5B | 2–16 B | calculation | low |
| Solar-thermal option | concentrators for cells → concentrators for process heat (3–15 MW_th displaced) | 3–15 | calculation | low |

**Voltage calculation.** Take a 1 MW module at 600 V, giving 1,667 A, with a 400 m aluminium round trip and 2% loss.
- Allowed resistance: R = 20 kW ÷ 1,667² = 7.2 mΩ.
- Conductor cross-section: A = ρL/R = 2.8×10⁻⁸ × 400 ÷ 7.2×10⁻³ ≈ 15.6 cm².
- Mass: about **1.7 t per module**, or about 130 t across the station.
- At 3 kV, current falls 5× and copper/aluminium mass falls about 25×, to about 5 t total.

---

## 3. Interfaces

| With | Flow | Value | In BOM? |
|---|---|---|---|
| bom-0-3 Station | power | 45–70 MW average delivered (70–85 MW BOL nameplate) | **no**: station says 1–2.5 MW |
| bom-0-3 Station | mass (future) | 0.5–1 kt/yr solar-grade Si could feed ~100–400 MW/yr of cells at 2–5 g/W (judgement) | no |
| bom-0-3 Station | other (heat) | ~45–70 MW of waste heat to reject at the station | **no** radiator line |
| bom-0-2 Mining robots | power | 0.4–1.0 MW peak in total, including night-side | no |
| bom-0-6 ISPP | power | 4 × 0.25 MWe = 1 MWe, plus 0.3–1 MW_th if heating is solar-thermal | partly (power stated, source not) |
| bom-0-4 Tugs | mass | Deploy 6–12 MW (~60–200 t) of site arrays and storage to NEAs; replace 1–3%/yr | no |
| bom-0-4 Tugs | power | none (own arrays) | yes |
| bom-0-1 Prospectors | data | Site rotation period, pole orientation and heliocentric range for storage sizing | no |
| All | data | Telemetry and power-management commands, ~kbps per module, ~100 modules | no |
| Earth → L4/L5 | mass | 670–1,700 t once, then ~10–30 t/yr spares | **no launch line** |

---

## 4. Missing items or scope

1. **Earth-to-orbit launch and LEO → L4/L5 / NEA transport** for about 1,000 t of arrays, plus the station itself. No line provides it. Add a line of **$1–5B**.
2. **Station heat rejection.** Rejecting 45–70 MW is a major item.
   - At 300 K, a two-sided radiator with ε = 0.9 rejects about 800 W/m², needing about 60,000–90,000 m².
   - At 500 K it rejects about 6 kW/m², needing about 10,000 m².
   - This belongs in bom-0-3 or a new line.
3. **PMAD and high-voltage trunk, plus kA-class low-voltage DC conversion for MRE cells.** These are currently implicit.
4. **Robotic assembly of about 0.3–0.45 km² of array.** No assembly asset is listed.
5. **Solar-thermal concentrators** for process heat at the station and ISPP. This is optional but probably cheaper than PV for 3–15 MW_th.
6. **A product slate for bom-0-3.** Without it, power cannot be closed.

---

## 5. Remaining disagreements and open questions

- **Cell choice.** Thin III-V (higher W/kg, lower degradation) versus space silicon (cheapest per watt today at scale). This depends on vendor scale-up that I cannot verify. Reasonable engineers will differ.
- **Station product slate.** Native-metal feed gives about 60 MW; oxide-only feed gives over 100 MW. This choice dominates the whole line.
- **Night-side mining.** Daylight-only operation removes NEA storage but roughly halves robot throughput. Alternatives are polar or terminator siting, or mirrors.
- **Launch price.** $100/kg and $2,000/kg give a 4× swing in the line cost.
- **Concentrators.** Using them for process heat versus a PV-only architecture is a trade on simplicity versus mass and cost.
- **In-situ cell manufacture.** Feasibility and timing are unknown, but it could collapse later-phase costs.

```yaml
item: bom-0-5
model: claude-opus-4
findings:
  - id: P0-F03
    verdict: agree
    summary: A plausible 50 kt/yr slate (native Fe-Ni plus MRE Al/Si and some solar-grade Si) needs ~24-54 MW average, i.e. 35-81 MW BOL nameplate, versus the 1-2.5 MW in the station spec.
    proposed_change: Allocate 70-85 MW BOL of bom-0-5 to bom-0-3, require bom-0-3 to state kWh/kg per product, and fix a native-metal-rich product slate.
  - id: P0-F04
    verdict: partly
    summary: Allocation and site split are missing and storage is mis-sited and ~20x oversized, but once F03 is applied the station absorbs most of the 100 MW rather than it being unused.
    proposed_change: Split into station 70-85 MW, NEA sites 6-12 MW, reserve 5-10 MW; replace 200-500 MWh with ~10 MWh at the station and 0.5-4 MWh per mining site.
  - id: P0-F05
    verdict: agree
    summary: $5/W is a terrestrial price; mass-produced space arrays delivered to L4/L5 and NEAs cost about $20-160/W (central ~$45/W), with ~1,000 t to launch.
    proposed_change: Resize the line to ~$4.5B (range $2-16B) and add a separate launch/transport line.
revised_spec:
  - parameter: total_capacity_BOL
    old: 100 MW unallocated
    new: 100 MW allocated
    range: [80, 130]
    unit: MW
    basis: calculation
    confidence: medium
  - parameter: station_allocation
    old: unspecified
    new: 78
    range: [70, 85]
    unit: MW
    basis: calculation
    confidence: medium
  - parameter: mining_site_allocation
    old: unspecified
    new: 9
    range: [6, 12]
    unit: MW
    basis: calculation
    confidence: low
  - parameter: reserve_and_spares
    old: unspecified
    new: 8
    range: [5, 10]
    unit: MW
    basis: judgement
    confidence: low
  - parameter: installed_cost_per_watt
    old: 5
    new: 45
    range: [20, 160]
    unit: USD/W
    basis: calculation
    confidence: low
  - parameter: line_cost
    old: 0.5
    new: 4.5
    range: [2, 16]
    unit: USD billion
    basis: calculation
    confidence: low
  - parameter: system_specific_power
    old: unspecified
    new: 100
    range: [60, 150]
    unit: W/kg
    basis: literature
    confidence: medium
  - parameter: delivered_mass
    old: unspecified
    new: 1000
    range: [670, 1700]
    unit: t
    basis: calculation
    confidence: medium
  - parameter: primary_distribution_voltage
    old: 600
    new: 3000
    range: [1500, 5000]
    unit: V DC
    basis: calculation
    confidence: medium
  - parameter: station_storage
    old: 200-500
    new: 10
    range: [5, 15]
    unit: MWh
    basis: calculation
    confidence: medium
  - parameter: storage_per_mining_site
    old: 0
    new: 2
    range: [0.5, 4]
    unit: MWh
    basis: calculation
    confidence: low
  - parameter: degradation_rate
    old: "<1.5"
    new: 0.8
    range: [0.5, 1.5]
    unit: "%/yr"
    basis: judgement
    confidence: medium
  - parameter: array_area
    old: unspecified
    new: 0.35
    range: [0.27, 0.5]
    unit: km2
    basis: calculation
    confidence: medium
  - parameter: module_size
    old: 2
    new: 2
    range: [1, 2]
    unit: MW
    basis: calculation
    confidence: medium
interfaces:
  - with: bom-0-3
    flow: power
    value: 45-70 MW average delivered (70-85 MW BOL)
    in_bom: false
  - with: bom-0-3
    flow: other
    value: 45-70 MW waste heat to reject at station
    in_bom: false
  - with: bom-0-2
    flow: power
    value: 0.4-1.0 MW peak total incl. night-side
    in_bom: false
  - with: bom-0-6
    flow: power
    value: 1.0 MWe (4 x 0.25) plus 0.3-1 MWth optional solar-thermal
    in_bom: true
  - with: bom-0-4
    flow: mass
    value: 60-200 t one-time site arrays and storage to NEAs, 1-3%/yr replacement
    in_bom: false
  - with: bom-0-1
    flow: data
    value: rotation period, pole and heliocentric range per candidate site
    in_bom: false
  - with: launch-and-transport (missing)
    flow: mass
    value: 670-1700 t once to L4/L5 and NEAs, 10-30 t/yr spares
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-5
    quantity: 100 MW
    unit_cost_usd: [20, 160]
    rationale: Space-delivered mass-produced arrays cost ~$45/W central, not terrestrial $5/W.
  - action: split
    item: bom-0-5
    quantity: station 70-85 MW; NEA sites 6-12 MW with 0.5-4 MWh/site; reserve 5-10 MW
    unit_cost_usd: [20, 160]
    rationale: Sites have different flux, eclipse and storage needs and are tens of millions of km apart.
  - action: add
    item: Launch and in-space transport (Earth to L4/L5 and NEAs)
    quantity: 1 campaign (~1000 t arrays plus station)
    unit_cost_usd: [1000000000, 5000000000]
    rationale: No BOM line delivers hardware from Earth.
  - action: add
    item: Station heat rejection system
    quantity: 45-70 MW
    unit_cost_usd: [500000000, 3000000000]
    rationale: The refining loads imply tens of MW of waste heat, and no radiator is specified.
  - action: add
    item: Solar-thermal process-heat concentrators (optional)
    quantity: 3-15 MWth
    unit_cost_usd: [50000000, 500000000]
    rationale: Process heat for melting, Si solidification and ISPP heating is cheaper from mirrors than from PV.
open_questions:
  - What is the station product slate, native Fe-Ni versus oxide feed, which sets 60 versus over 100 MW?
  - Thin III-V or space silicon: which reaches the lowest delivered $/W at EOL at 100 MW/yr production scale?
  - Will mining run night-side, or daylight-only with storage removed?
  - What launch $/kg and which LEO-to-L4/L5 propulsion are assumed, given krypton supply limits?
  - When can station-produced solar-grade Si supply array replacement and expansion?
  - What does P0-F01 require from the reserve allocation?
```
