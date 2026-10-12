---
phase: phase-0
item: bom-0-3
round: 1
type: reassessment
modelId: claude-opus-5-5
modelName: "Claude Opus 5.5"
endpoint: databricks-claude-opus-5-5
findings: 8607ae186f99
priorRound: null
generated: 2026-10-11T22:02:29.748Z
seconds: 288.922
---

# bom-0-3 Material Processing Station: Phase-0 Re-assessment

**Bottom line.** The station as specified cannot close, and the reason is not mainly the station itself.

- **Throughput is mismatched by about 100×.** The stated 50 kt/yr is roughly 100 times what the Phase-0 transport fleet can deliver.
- **Power is off by about 10×** for that throughput.
- **The location undercuts the crew plan.** Sun–Earth L4/L5 is 1 AU from Earth. That defeats quarterly crew visits and puts the station 60° of orbital arc away from the Phase-1 node at Sun–Earth L1.

I recommend four changes:

1. Re-baseline Phase 0A as a **pilot station of 1–5 kt/yr feed**, designed for modular growth.
2. Site it in **Earth–Moon space** (a lunar distant retrograde orbit or EML1/2), which has Keck/ARM study heritage.
3. Run it **uncrewed and teleoperated**.
4. Adopt the **rq-0-11 rotating smelter** and add a **gravity-independent carbonyl (Mond) route** for Fe-Ni.

Where I estimate rather than cite, I say so.

---

## 1. Findings

### P0-F01 — Transport capacity vs. station throughput: **Agree**

**Trip time, re-derived.** Assumptions:

- Electric power 150–250 kWe.
- Hall thruster at 1,500–2,500 s specific impulse (Isp), efficiency η = 0.55–0.65.
- Thrust-to-power ratio F/P = 2η/v_e ≈ 45–85 mN/kW. I use 50–65 mN/kW, giving thrust F ≈ 7.5–16 N.
- Payload 200 t; dry mass about 100–150 t.
- The 6–10 km/s round trip is split equally between the loaded and empty legs.

| Leg | Mass | Acceleration | Δv | Thrust time |
|---|---|---|---|---|
| Loaded | 300–350 t | 2.1–5.3×10⁻⁵ m/s² | 3–5 km/s | 2.4–6.3 yr |
| Empty | ~120 t | 6–13×10⁻⁵ m/s² | 3–5 km/s | 0.7–2.6 yr |

- One cycle takes **3–10 years** including operations, so a 15-year life gives 1.5–5 cycles, not 10+.
- Each vehicle delivers 200 t × (0.1–0.33)/yr = **20–67 t/yr**.
- Fifteen vehicles deliver **0.3–1.0 kt/yr**, which is 50–170× short of 50 kt/yr.

**What moving 50 kt/yr of raw feed would require.** Impulse per year ≈ (50 kt + ~25 kt tug dry mass) × 4 km/s + 25 kt × 4 km/s ≈ 4×10¹¹ N·s.

- Mean thrust ≈ 1.3×10⁴ N.
- Fleet power ≈ **210 MWe at 100% thrusting**, or about 250–300 MWe in practice.
- Propellant ≈ I/v_e ≈ **23 kt/yr**.

**Krypton supply makes this worse.** About 100 t of Kr per trip for 15 tugs means hundreds of t/yr. Global Kr production is, by my estimate, of order tens of t/yr; this needs verification. That is a bom-0-4 problem, but it supports the finding. Iodine is the only scalable choice among the listed propellants.

**Flight-study heritage agrees.** The Keck Institute ARM study (Brophy et al., 2012) found a 40 kWe SEP tug returning a ~500 t asteroid to lunar orbit in about 6–10 years. That relied on the lowest-Δv targets plus a lunar gravity assist.

- This works out to about 1.2 t/yr per kWe in the best case.
- Scaled to 3 MWe (15 × 200 kW), it gives **at most about 4–5 kt/yr**, and only for ultra-low-Δv near-Earth asteroids.

**Proposed change:**

- Phase 0A station nameplate: **1–5 kt/yr feed**.
- Station location: Earth–Moon space, the ARM-heritage destination.
- Asteroid targets: return Δv ≤ 0.5 km/s.
- The 50 kt/yr target becomes a gated **Phase 0B/1 design-for** goal. Reaching it requires either a 100–300 MWe transport system or moving primary processing to the asteroid and shipping product only.

### P0-F02 — Mining, transport and processing rates disagree: **Agree**

The 2–5 t/h rate and the 1,000 t/yr figure differ only through an unstated duty cycle. I assume an engineering duty cycle of 20–40%, limited by power, comms, maintenance and spin-state constraints.

- That gives 3.5–17.5 kt/yr per robot, or **70–350 kt/yr** for the fleet.
- That is 15–1,000× what transport can move.
- The robots are therefore transport-limited to about **5% utilisation**.

Concentration ratio (estimate):

- Ordinary chondrites hold about 10–20 wt% Fe-Ni metal.
- Magnetic and size separation can plausibly produce a 30–60% metal concentrate.
- That is a **2–4× concentration ratio**. On-robot beneficiation should be required.

**Consistent Phase-0A mass-flow chain** (low-Δv near-Earth asteroid, station in lunar DRO):

| Step | t/yr | Notes |
|---|---|---|
| Excavated | 4,000–20,000 | Robots at about 5–10% utilisation; tailings stay at the asteroid |
| Concentrated / loaded | 1,000–5,000 | 2–4× magnetic/size beneficiation |
| Transported | 1,000–5,000 | Fleet capacity 0.3–5 kt/yr, depending on Δv |
| Processed | 1,000–5,000 | Station nameplate |
| Fe-Ni product | 300–2,500 | Melt and carbonyl routes |
| O₂ (molten-regolith electrolysis, slag fraction) | 100–800 | |
| Al/Si (metallurgical grade) | 20–200 | Pilot only |
| Slag ceramics / shielding | 500–2,000 | Mostly a by-product |
| Water (if C-type feed) | 0–500 | Via bom-0-6 or station volatile capture |

**Proposed change:** cut the Phase-0A robot fleet to **4–8 units**, or redefine the robots as excavator-beneficiators. State the duty cycle (20–40%) and concentration ratio (2–4×) in both specs.

### P0-F03 — Station power vs. 50 kt/yr: **Agree** (with refinement)

Energy per kg. Values are physics estimates plus terrestrial analogues; furnace efficiency is 50–70%.

| Process | Energy | Basis |
|---|---|---|
| Heat and melt Fe-Ni (300→1,800 K, c_p ≈ 0.5 kJ/kg·K, latent heat 0.27 MJ/kg) | 0.3–0.36 kWh/kg theoretical; 0.5–0.8 delivered | Calculation |
| Carbonyl (Mond) refining of Fe-Ni | 0.5–1.5 kWh/kg | Vale Clydach analogue (estimate) |
| Melt whole silicate feed for slag separation | 0.4–0.55 kWh/kg theoretical; 0.6–1.0 delivered | Calculation |
| Molten-regolith electrolysis → O₂ + Fe/Si | 10–15 kWh/kg O₂ | Schreiner/Sibille MRE models |
| Al reduction | 13–20 kWh/kg | Hall–Héroult is ~13–15 on Earth; MRE worse |
| Metallurgical-grade Si | 11–20 kWh/kg | Terrestrial arc furnace analogue |
| Solar-grade Si (Siemens / upgraded-metallurgical route) | +40–100 kWh/kg | Terrestrial |
| Water extraction (10% water feed) | ~3 kWh/kg H₂O | Calculation |
| Electrolysis plus H₂ liquefaction | 6–7 kWh/kg propellant | Calculation |

Power at **50 kt/yr**, using 7,000 operating h/yr:

| Load | Energy |
|---|---|
| Melt all feed | 25–50 GWh |
| Fe-Ni refining, 15 kt | 10–20 GWh |
| Al/Si, 2 kt | 30–50 GWh |
| Solar-grade Si, 0.1 kt | 5–10 GWh |
| **Total** | **≈ 70–130 GWh/yr** |

- Average power is **10–20 MW**, of which about 5–10 MWe must be electric and the rest can be solar thermal.
- A pure molten-regolith-electrolysis flowsheet would push this toward 50–90 MW.

At **pilot scale (1–5 kt/yr)** the total is about **0.4–2 MW**, which the existing 1–2.5 MW envelope covers.

**Which line supplies it:**

- Electrical power should be allocated explicitly from bom-0-5: **1.5–3 MWe** for Phase 0A, plus the 4–5 MW backbone required by rq-0-14.
- **1–3 MWth of solar concentrator** should be listed within bom-0-3.

**bom-0-5 pricing is also wrong.** It is priced at $5/W.

- Flown arrays (ISS iROSA/ROSA class) cost roughly $300–1,000/W; aggressive future values are $20–50/W.
- At 100–200 W/kg, 100 MW would mass 500–1,000 t before launch costs.
- That line needs repricing or a sub-allocation by consumer.

### P0-F10 — Crew not budgeted: **Agree; decide uncrewed**

At Sun–Earth L4/L5 the station is about 1 AU from Earth.

- One-way light time is 8.3 min.
- Transfer takes months to years, or needs large Δv.
- Quarterly visits are physically impractical there.

In Earth–Moon space visits become possible, but cost rules them out.

- An Orion-class mission costs about $1–4B (estimate).
- Quarterly visits would cost **$4–16B/yr**, more than the whole phase budget.

**Decision:** Phase 0 is **uncrewed**.

- Remove the habitat and life support, saving about 20–40 t.
- Keep human-rated docking ports and structural provisions per rq-0-18, at about +1–3 t.
- Add teleoperation, which the 1.3 s latency in Earth–Moon space makes practical, plus robotic servicing and a spares logistics line.

### P0-F15 — Concluded deliberations not written back: **Agree** (with corrections to two conclusions)

| Deliberation | Change to bom-0-3 | My check |
|---|---|---|
| rq-0-11 (gravity zones) | Add rotating smelting module: 0.05–0.15 g, 40–60 m radius, 0.95–1.7 rpm. Mass penalty: I estimate **15–40 t**, not 10–15 t, because of counterweight, bearings and a MW-class power rotary joint. Cost +$0.5–1.5B. | ω²r at 50 m and 1.4 rpm = 1.07 m/s² ≈ 0.11 g ✓. Coriolis term 2ωv for 0.1 m/s flow = 0.03 m/s², about 3% of g, so not negligible ✓. MW-class rotary joints have no flight heritage; ISS SARJ is tens of kW. |
| rq-0-14 (propellant) | Power backbone 4–5 MW (+$50–150M, +2–5 t). Volatile capture 5–10 t in Phase 0A. Propellant module in Phase 0B. | **Error found.** "500 kW → 70–90 t/yr" is wrong by 5–8×. At 6–10 kWh/kg including extraction, 500 kW gives **440–730 t/yr**. 1,000 t/yr needs about **0.8–1.4 MW**, not "2+ MW". |
| rq-0-18 (human-rating) | Human-rated docking interface only. | Consistent with the uncrewed decision. |
| rq-0-28 (cost methodology) | Not provided to me; cannot assess. | Open. |
| rq-0-29 (governance) | No station hardware impact. | — |
| rq-0-30 (cryogenic) | Shadow zone and sunshield in primary structure. Cryocooler budget 10–20 kW. | Sunshield 900 m² × 0.2–0.5 kg/m² = 180–450 kg ✓; with structure, 1–3 t. **700 W per 100 t LH₂ tank looks optimistic.** The 20 K stage at 10–20% of Carnot (~70–140 W/W) on a 15–40 W heat leak needs 1–6 kW. The total of 10–20 kW still holds. The "190 days margin" implies a ~275 W leak; at 15–40 W the margin is 3.5–9 yr. That inconsistency is in the conservative direction. |
| rq-0-47 / rq-0-48 | Not provided to me; fold into the thermal design. | Open. |

**A further gap:** rq-0-14 and rq-0-30 assume a LOX/LH₂ consumer, but bom-0-4 transport is krypton/iodine electric propulsion. **No Phase-0 BOM line consumes LOX/LH₂.** Demand must be defined before the Phase 0B module is built.

### P0-F18 — No fallback if microgravity metallurgy fails: **Agree**

**Baseline:** gravity zones per rq-0-11.

- 0 g core for docking, storage and avionics.
- 0.05–0.15 g rotating smelter for melting and slag separation.
- 0 g refining module.

**Add a gravity-independent primary route:** magnetic concentrate → **carbonyl (Mond) process**, a gas-phase route with heritage at Vale Clydach since 1902.

- It yields Fe, Ni and Co, and can deposit foils by CVD.
- It needs no melt or slag handling.
- Carbon monoxide (CO) comes from C-type volatiles or is supplied from Earth.

**Costed fallbacks and gates:**

| Fallback | Trigger gate | Cost (estimate) |
|---|---|---|
| A. Carbonyl-only Fe-Ni (no Al/Si) | **Gate G1** (end of partial-gravity campaign, about year 4–5): slag-separation efficiency < 90% on ≥10 kg batches at ≤0.15 g, or rotary joint not qualified at ≥1 MW | $1–3B in place of the smelter arm; reduces product range |
| B. Earth-launched material for Phase 1 | **Gate G2** (pilot operations, about +2 yr): sustained < 50% of nameplate for 6 months, or delivered cost > $2,000/kg | $500–2,000/kg delivered to SE-L1. Phase-1 demand of 3.5–227 kt implies $2B to over $400B; competitive at the low end of demand |
| C. Lunar-surface processing (1/6 g, molten-regolith-electrolysis heritage) | G1 fails and Phase-1 demand > 50 kt | $15–40B; requires lunar launch infrastructure |

### P0-F19 — Phase-0 output not tied to Phase-1 demand: **Agree**

Phase-1 demand from the per-model figures:

- Collectors: 1,000 × 69–1,850 kg = **0.07–1.85 kt**.
- PV blankets: 5,000 × 0.69–45 t = **3.5–225 kt**.
- The Phase-1 duration is unstated. Over about 10 years, that is **0.35–23 kt/yr**.

What the station can and cannot supply:

- **Cannot supply:** PV-grade semiconductor. Asteroid-derived solar-grade silicon (6N) is not credible in Phase 0; it is research scale at kg/yr. Blankets will likely use Earth-made thin-film cells.
- **Can supply:** Fe-Ni structural stock, foil and wire; slag ceramics and shielding; and O₂/H₂O.

**Product-mix change:** Phase 0 prioritises Fe-Ni products, O₂/water and ceramics. Al/Si are pilot only, and solar-grade Si is R&D only.

**Location matters for delivery.**

- From SE-L4 to SE-L1 is about 60° of phasing, costing roughly 1–3 km/s.
- From an Earth–Moon DRO or EML2, low-energy manifold transfers to SE-L1 cost about 0.05–0.5 km/s, based on Genesis-type trajectory heritage.

No BOM line covers delivery to the Phase-1 node; one must be added.

---

## 2. Revised specification

| Parameter | Old | New | Range | Basis | Confidence |
|---|---|---|---|---|---|
| Location | SE-L4/L5 | Earth–Moon space (lunar DRO / EML1-2) | — | Judgement + ARM study | Medium |
| Phase-0A feed throughput | 50 kt/yr | 3 kt/yr | 1–5 | Calculation (F01) | Medium |
| Design-for throughput (Phase 0B/1, gated) | 50 kt/yr | 50 kt/yr | 20–50 | Judgement | Low |
| Electrical power, Phase 0A | 1–2.5 MW | 2 MWe | 1.5–3 | Calculation | Medium |
| Solar thermal (concentrators) | unspecified | 2 MWth | 1–3 | Calculation | Medium |
| Power backbone rating | unspecified | 4.5 MW | 4–5 | rq-0-14 | Medium |
| Power at 50 kt/yr | unspecified | 15 MW | 10–20 (50–90 if full MRE flowsheet) | Calculation | Low |
| Initial mass | 400–500 t | 300 t | 250–400 | Judgement (bottom-up) | Low |
| Rotating smelter | none | 0.1 g, 50 m, 1.4 rpm | 0.05–0.15 g | rq-0-11 | Medium |
| Rotating-module mass penalty | 10–15 t | 25 t | 15–40 | Judgement | Low |
| Fe-Ni refining route | melt only | melt + carbonyl | — | Literature (Mond) | Medium |
| Crew | quarterly visits | uncrewed, teleoperated; human-rated docking | — | Calculation (cost) | High |
| Volatile capture | none | 7 t | 5–10 | rq-0-14 | Medium |
| Propellant power per 1,000 t/yr | ~2+ MW implied | 1.1 MW | 0.8–1.4 | Calculation | Medium |
| Cryocooler power (Phase 0B) | 10–20 kW | 15 kW | 10–30 | rq-0-30 + check | Medium |
| Communication latency (one-way) | "reasonable" (8.3 min at SE-L4) | 1.3 s | 1.2–1.5 | Calculation | High |
| Unit cost | $10B | $12B | 8–20 | Judgement ($25–50k/kg all-in) | Low |
| Contingency | 30–40% (15–20% per rq-0-11) | 40% | 30–50 | Judgement (TRL 3–4) | Medium |
| Solar-grade Si output | in scope | R&D only | 0.001–1 | Judgement | Medium |

---

## 3. Interfaces

| With | Flow | Value | In BOM? |
|---|---|---|---|
| bom-0-4 | Mass in (concentrate) | 1–5 kt/yr | Yes (capacity short) |
| bom-0-4 / new line | Mass out (product to SE-L1) | 0.5–4 kt/yr | **No** |
| bom-0-2 | Data and mass (concentrate spec, assays) | 2–4× concentration ratio | Partly |
| bom-0-5 | Electrical power | 1.5–3 MWe (Phase 0A); 4–5 MW backbone | Yes, unallocated |
| bom-0-6 | Water / propellant | 0–0.7 kt/yr water; overlaps the station's Phase 0B module | Duplicated |
| bom-0-4 | Propellant | Krypton/iodine demand ~0.3–1 kt/yr; **station cannot supply it**; LOX/LH₂ has no consumer | **No** |
| bom-0-1 | Data (feed composition) | Target mineralogy | Yes |
| Earth logistics | Spares / consumables (CO, fluxes, electrodes) | 10–30 t/yr | **No** |
| Ground segment | Teleoperation and data | ~10–100 Mbps, continuous | **No** |
| bom-0-7 | Governance / data | — | Yes |

---

## 4. Missing items or scope

1. **Station launch and orbit transfer:** 250–400 t at roughly $3–10k/kg delivered, or **$1–4B**.
2. **Metallurgy R&D campaign** from rq-0-11 (partial-gravity rig, ISS refining, terrestrial analogue, CFD): **$0.55–0.81B**.
3. **Product delivery leg** from the station to the Phase-1 node at SE-L1.
4. **Robotic servicing, spares logistics and teleoperation ground segment:** $0.3–1B, plus 10–30 t/yr resupply.
5. **30-year operations cost:** none budgeted. I estimate $0.2–0.5B/yr.
6. **On-robot beneficiation** capability: not specified in bom-0-2.
7. **A consumer for LOX/LH₂.** Without one, the Phase 0B propellant module and bom-0-6 lack a justification.

---

## 5. Remaining disagreements and open questions

- **Location.** Three options remain defensible:
  - An Earth–Moon DRO, which I recommend for access, latency and delivery.
  - Co-location at the asteroid, which minimises ore transport but leaves 10–20 kt/yr of product needing about 20+ MWe of tugs.
  - SE-L4, near Earth Trojans, but those are few and high-inclination.
- **Is a Phase-0 station worth it at all?** If Phase-1 demand is at the low end (~3.5 kt), Earth launch at under $2,000/kg delivered may beat a $12B+ station. The case depends on Phase-1 duration and mass, which are unsettled.
- **Smelting route.** Solar-thermal, electric, carbonyl-first and molten-regolith electrolysis each trade product range against power and gravity sensitivity.
- **Rotation hardware.** Whether a rotating arm or a tethered smelter is easier is open. MW-class rotary power joints are unproven.
- **Contingency.** rq-0-11 argues for 15–20%. I hold 30–50% until G1 is passed.

```yaml
item: bom-0-3
model: Claude (Anthropic)
findings:
  - id: P0-F01
    verdict: agree
    summary: A 150-250 kWe Hall tug needs 3-10 yr per 6-10 km/s round trip, so 15 tugs deliver 0.3-1 kt/yr (at most ~5 kt/yr for ultra-low-dv targets per Keck ARM scaling), while 50 kt/yr would need ~210-300 MWe and ~23 kt/yr propellant.
    proposed_change: Re-baseline Phase 0A station to 1-5 kt/yr feed in Earth-Moon space with low-dv NEA targets, holding 50 kt/yr as a gated design-for goal.
  - id: P0-F02
    verdict: agree
    summary: At a 20-40% duty cycle the robots excavate 70-350 kt/yr, far beyond transport, and no concentration ratio is stated.
    proposed_change: Specify a 20-40% duty cycle and 2-4x on-robot beneficiation, adopt the chain 4-20 kt excavated to 1-5 kt transported/processed to 0.3-2.5 kt Fe-Ni, and cut the Phase 0A fleet to 4-8 robots.
  - id: P0-F03
    verdict: agree
    summary: 50 kt/yr needs ~10-20 MW (50-90 MW for a full MRE flowsheet), whereas a 1-5 kt/yr pilot needs 0.4-2 MW, which fits the existing envelope.
    proposed_change: Allocate 1.5-3 MWe from bom-0-5 plus 1-3 MWth of solar concentrators in bom-0-3, and reprice bom-0-5 ($5/W is 1-2 orders below flight cost).
  - id: P0-F10
    verdict: agree
    summary: Quarterly crew visits are impractical at SE-L4 and cost $4-16B/yr even in Earth-Moon space.
    proposed_change: Make Phase 0 uncrewed and teleoperated, remove the habitat (-20 to -40 t), and keep only human-rated docking provisions per rq-0-18.
  - id: P0-F15
    verdict: agree
    summary: rq-0-11, rq-0-14 and rq-0-30 change the station's mass, power and architecture, and rq-0-14 understates propellant per kW by 5-8x.
    proposed_change: Add a 15-40 t rotating smelter, a 4-5 MW backbone, 5-10 t volatile capture and a sunshield shadow zone, and correct propellant power to 0.8-1.4 MW per 1,000 t/yr.
  - id: P0-F18
    verdict: agree
    summary: No fallback exists, but a gravity-independent carbonyl Fe-Ni route plus Earth-launch and lunar options can be gated.
    proposed_change: Baseline rq-0-11 gravity zones plus a carbonyl route, with gates G1 (slag separation <90% at <=0.15 g or rotary joint unqualified) and G2 (pilot <50% of nameplate for 6 months) triggering the fallbacks.
  - id: P0-F19
    verdict: agree
    summary: Phase 1 needs ~3.5-227 kt total (about 0.35-23 kt/yr), mostly blanket mass the station cannot make as PV-grade, and SE-L4 is poorly placed for delivery to SE-L1.
    proposed_change: Prioritise Fe-Ni, O2/water and ceramics, demote solar-grade Si to R&D, relocate to Earth-Moon space, and add a product-delivery line to SE-L1.
revised_spec:
  - parameter: location
    old: Sun-Earth L4/L5
    new: Earth-Moon space (lunar DRO / EML1-2)
    range: [EML1, lunar DRO]
    unit: orbit
    basis: judgement
    confidence: medium
  - parameter: phase_0A_feed_throughput
    old: 50000
    new: 3000
    range: [1000, 5000]
    unit: t/yr
    basis: calculation
    confidence: medium
  - parameter: design_for_throughput
    old: 50000
    new: 50000
    range: [20000, 50000]
    unit: t/yr
    basis: judgement
    confidence: low
  - parameter: electrical_power_phase_0A
    old: 1-2.5
    new: 2
    range: [1.5, 3]
    unit: MWe
    basis: calculation
    confidence: medium
  - parameter: solar_thermal_power
    old: unspecified
    new: 2
    range: [1, 3]
    unit: MWth
    basis: calculation
    confidence: medium
  - parameter: power_backbone_rating
    old: unspecified
    new: 4.5
    range: [4, 5]
    unit: MW
    basis: judgement
    confidence: medium
  - parameter: power_at_50kt_per_yr
    old: unspecified
    new: 15
    range: [10, 90]
    unit: MW
    basis: calculation
    confidence: low
  - parameter: initial_mass
    old: 400-500
    new: 300
    range: [250, 400]
    unit: t
    basis: judgement
    confidence: low
  - parameter: rotating_smelter_gravity
    old: none
    new: 0.1
    range: [0.05, 0.15]
    unit: g
    basis: literature
    confidence: medium
  - parameter
