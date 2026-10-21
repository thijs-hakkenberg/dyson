---
bomId: "bom-0-6"
itemName: "Water Pilot (C-type target only)"
itemSlug: "ispp-systems"
modelId: "claude-opus-5-5"
modelName: "Claude Opus 5.5"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-6 Water Pilot (C-type Target Only): Technical Proposal

**Phase:** 0B (conditional), with a small 0A sub-line
**Critical technology:** T13 Asteroid water extraction pilot. TRL 2–4 now, target 6, AD² 5–6, architecture-change.
**Status:** Proposal for human review. It supersedes the bom-0-6 "In-Situ Propellant Production Systems" line and all L4/L5 ISPP framings.

---

## 0. Position summary

| Decision | My position | Basis |
|---|---|---|
| What the item is | A water capture, purification and storage pilot integrated with bom-0-3 at the target NEA. It is flown only if the target is C-complex and hydrated. | D-05; revised architecture (ship product, not ore; no central station) |
| What it is not | No LOX/LH₂, no cryogenic storage, no sunshield, no production electrolysis, no EML1 depot, no tug propellant supply. | Agreed by all three; D-05 |
| Quantity | **1 pilot unit.** Two canister-retorts in one skid. | Information purchase, not production |
| Output | **10–30 t/yr water**, design point 25 t/yr at 4 wt% recoverable water. Stretch up to about 50 t/yr if ore exceeds 6 wt%. | Sized by the TRL-6/7 evidence need and site consumables, not by tug demand |
| Ore handled | 600–1,000 t/yr side-stream from bom-0-3 crushing (≤2 mm) | §6 |
| Mass | **7–11 t** launched (point estimate 9.5 t with 25% margin) | §7 bottom-up |
| Power | **55–100 kWₑ** peak, about 65 kWₑ average while operating | §7 |
| Cost, 0A sub-line | **$15–38M**, unconditional (desk study, feedstock characterisation, TRL-5 breadboard) | §12 |
| Cost, 0B | **$135–315M**, spent only if G-W0 confirms a C-type target | §12 |
| Probability-weighted 0B | About $27–126M at P(C-type) = 20–40% | Judgement; see §2.3 |
| Scale-up option W-2 | Full-stream capture kit on bom-0-3's dewatering front-end, 100–300 t/yr, $60–150M. **Not baselined.** Needs a signed consumer. | §5.4 |

**Disagreements with Round 2 (detail in §14)**
- **Gemini (2 units, 1,500 t/yr, high confidence): rejected.** That output needs about 37 kt/yr of ore and roughly 1.3 MWₜₕ of heating. This exceeds the entire site's process scale, and nothing in Phase 0 would consume it.
- **Claude (10–100 t/yr): upper end rejected.**
- **GPT (10–30 t/yr, $100–300M): closest to my view.** My floor is higher because a sulfidation-qualified EDU is unavoidable.

**The key insight that changes how this item should be framed**
If the target is C-type, water handling is not optional. bom-0-3 must dewater all of its ore before or during reducing Fe-oxides. At about 7 kt/yr of ore and 4 wt% water, that liberates around 280 t/yr of water whether anyone wants it or not. So the real choice is between capturing it and venting it under the bom-0-15 contamination budget.

The pilot is therefore three things:
1. The T13 evidence package.
2. The pathfinder for bom-0-3's mandatory dewatering front-end in the C-type branch.
3. The data source for any later decision on water as a product, a reductant make-up or EP propellant.

---

## 1. Design philosophy

1. **Buy information, not tonnes.** The pilot's job is to move T13 to TRL 6 (ground EDU) and then TRL 7 (on site) at representative granular, thermal, chemical and microgravity conditions. Production rate is a by-product.
2. **Keep the hot zone free of solids-handling seals.** The most likely failure in asteroid volatile extraction is abrasive dust at 600 °C in a sealed valve or rotary seal. I remove that failure mode by design: ore is loaded cold into sealed canisters, and only the canister is heated.
3. **Gravity independence by construction.** Spun canisters produce about 0.4 g at the wall. This gives packed-bed wall contact for heat transfer and centrifugal dust rejection from the vapour stream. There is no reliance on free-flowing regolith.
4. **Freeze, don't condense.** Water is captured as frost by vapour deposition on cold fins, then melted in batch in a closed volume. This avoids two-phase gas–liquid separation in microgravity.
5. **Specify performance and contaminant limits, not one temperature.** Following GPT Decision D, temperature is a controlled variable inside a qualified 150–800 °C envelope. The nominal staged profile caps at 650 °C.
6. **Count every flow once.** Pilot retort heating is booked in bom-0-6, because the pilot owns its retorts. Heating for any full-stream dewatering (option W-2) stays in bom-0-3.
7. **Stringency follows reversibility (D-02).** The 0A spend is cheap and reversible. Spending on 0B hardware requires the target gate.

---

## 2. Why the pilot exists, and when it flies

### 2.1 The C-type branch and the Fe-Ni baseline

C-complex targets are poor native-metal sources:
- CI chondrites have essentially no free metal.
- CM chondrites have under about 1% free metal.
- CR chondrites carry several percent Fe-Ni metal in a hydrated matrix.

A C-type selection therefore means one of two things. Either bom-0-3 produces reduced Fe-Ni from magnetite and sulfides, or the target is a CR-like, metal-bearing, hydrated body. Either way bom-0-3 needs a dewatering front-end, and may need H₂ reductant make-up or a carbothermal route using indigenous carbon (CI carries about 3–4 wt% C).

The pilot serves both. It provides make-up water to a bom-0-3 H₂ loop, which bom-0-3 itself electrolyses. It also provides the design data for a dewatering front-end.

### 2.2 Consumers, in priority order

| # | Consumer | Need | Status |
|---|---|---|---|
| 1 | T13 qualification evidence (KDP-0B, Phase 1 decisions) | Yield vs temperature, contaminants, seal and trap life | Certain if the pilot flies |
| 2 | bom-0-3 reductant-loop make-up and thermal-loop fill | 1–20 t/yr H₂O-equivalent (Claude's 1–20 t/yr H₂ make-up is an upper bound in a loop-dominated design) | Depends on bom-0-3 process choice |
| 3 | Water-EP truth data (bom-0-4 / bom-0-16 desk study, D-05) | Real impurity spectrum for thruster tests; 0.1–1 t returned to SEL1 if requested | Desk study only |
| 4 | Phase 1 offtake at SEL1 (bom-0-13) | Unknown | No signed demand |
| — | Tug propellant | Not a consumer | Water EP at 1–2.5 MWₑ × 10–18 tugs needs 3–15 kt/yr, which is 100–500× the pilot (§14.4) |

### 2.3 Probability that it flies

Target selection will be driven by Fe-Ni yield. My judgement:
- P(selected target is C-complex and hydrated) ≈ 20–40%.
- This rises to 30–50% if a CR-like metal-plus-hydrated body is found.
- If the target is S, M or X type, **bom-0-6 closes at the target gate** with only the 0A sub-line spent.

---

## 3. Feedstock design basis

| Parameter | Design value | Range carried | Basis / note |
|---|---|---|---|
| Recoverable water at ≤650 °C | **4 wt%** | 2–8 wt% (floor 2%) | CM TGA dehydroxylation 400–770 °C (Garenne et al. 2014; King et al. 2015). Surface regolith may be partially dehydrated (Ryugu's 2.7 µm band is weaker than CI meteorites). This is deliberately below bulk meteorite H₂O. |
| Water released 150–250 °C | 15–30% of recoverable | — | Adsorbed and interlayer water |
| Water released 250–450 °C | 20–40% | — | Oxyhydroxides, early dehydroxylation |
| Water released 450–650 °C | 30–60% | — | Serpentine and saponite dehydroxylation |
| Carbon | 2–4 wt% | — | CI/CM organics and carbonates. A source of CO₂, CO, CH₄ and condensable organics. |
| Sulfur | 2–6 wt% | — | Sulfides and sulfates. Source of SO₂, H₂S and S₂; drives the material choice (§10). |
| Cl, N | 0.01–0.1 wt% | — | HCl, NH₃ in the condensate |
| Bulk density, crushed ≤2 mm | 1.1–1.3 t/m³ | — | Grain density about 2.4 t/m³; high porosity |
| Feed size | ≤2 mm | ≤5 mm acceptable | Set by heat penetration in a 4-hour batch |

The 0A characterisation campaign (§11) must replace these numbers with TGA-EGA data on CI, CM and CR meteorites, published Ryugu and Bennu sample data, and the scouts' in-situ hydration measurements.

---

## 4. Requirements

### 4.1 Top-level functional requirements (proposed)

| ID | Requirement |
|---|---|
| WP-F1 | Extract water from C-complex ore supplied by bom-0-3 at ≤2 mm, in microgravity, under vacuum, uncrewed. |
| WP-F2 | Produce water to Grade W1, and on demand Grade W2 (§4.3). |
| WP-F3 | Store 5–20 t of water (design 10 t) at 278–310 K, tolerating freeze–thaw without damage. |
| WP-F4 | Dispense water to bom-0-3, to tug cargo containers (bom-0-4) or to controlled rejection into tailings. |
| WP-F5 | Measure and downlink yield vs temperature, off-gas composition, condensate chemistry and component wear for each batch. |
| WP-F6 | Operate 30 days unattended. Make safe autonomously within 1 s of any fault (power, pressure, temperature). |
| WP-F7 | Keep solid release to ≥99.9% mass retention of handled ore (interim, D-03 ALARP). Vent non-condensables only through one designated vent, logged against the bom-0-15 budget. |
| WP-F8 | Produce no LOX, LH₂ or stored H₂/O₂ inventory. The diagnostic electrolysis cell recombines its products (§6.7). |

### 4.2 Performance requirements

| Parameter | Threshold | Goal |
|---|---|---|
| Water output (at 4 wt% ore) | 10 t/yr | 25–30 t/yr |
| Extraction efficiency (captured ÷ TGA-recoverable at the same profile) | ≥75% | ≥90% |
| Availability | ≥60% | ≥75% |
| Canister seal life | 500 thermal cycles | 1,500 |
| Specific heating energy (electric, at the retort) | ≤0.45 kWh/kg ore | ≤0.30 |
| Design life on site | 3 yr | 5 yr |

### 4.3 Product water specification (the Phase 1 tie)

This is my proposal for the material, purity and date tie demanded by the re-assessment.

| Grade | Use | Conductivity | TOC | Total S | Cl⁻ | NH₄⁺ | Particulates | pH |
|---|---|---|---|---|---|---|---|---|
| W0 raw | Rejection, or re-processing | — | — | — | — | — | — | 2–5 expected |
| **W1 process** | bom-0-3 loop make-up, thermal fill | ≤10 µS/cm | ≤10 ppm | ≤5 ppm | ≤1 ppm | ≤2 ppm | ≤10 µm | 5–8 |
| **W2 electrolysis / EP test** | PEM feed, EP test, Phase 1 offtake | ≤1 µS/cm (near ASTM Type II) | ≤0.5 ppm | ≤0.1 ppm | ≤0.05 ppm | ≤0.1 ppm | ≤1 µm | 6–7.5 |

**Date tie:** any Phase 1 consumer that wants W2 water at SEL1 must sign quantity and grade before KDP-0B. Without that signature, export is not designed in beyond a single 1 m³ cargo-container interface.

---

## 5. System architecture

### 5.1 Process flow

```
            bom-0-3 crusher/beneficiation (≤2 mm, cold)
                         │  ~3.3 t/day side-stream
                         ▼
   ┌──────────────────────────────────────────────────────────────────┐
   │ FEED & CANISTER STATION (ambient)                                │
   │  feed buffer 2 m³ → canister fill (330 kg) → lid seal (metal     │
   │  C-ring) → leak check (pressure decay) → load into retort sleeve │
   └───────────┬──────────────────────────────────────────┬───────────┘
               ▼                                          ▼
   ┌──────────────────────┐                  ┌──────────────────────┐
   │ RETORT A             │                  │ RETORT B             │
   │ spun canister 20–40  │  counter-        │ spun canister 20–40  │
   │ rpm, 0.4 g at wall   │  rotating pair   │ rpm, 0.4 g at wall   │
   │ resistive heater     │  (net H ≈ 0)     │ resistive heater     │
   │ sleeve, staged       │                  │ sleeve, staged       │
   │ 150→250→450→650 °C   │                  │ (offset by ½ cycle)  │
   │ 0.1–5 kPa sweep      │                  │                      │
   └──────────┬───────────┘                  └───────────┬──────────┘
              │ axial vapour exit (cooled rotary joint)   │
              └──────────────────┬────────────────────────┘
                                 ▼
                ┌────────────────────────────────┐
                │ HOT-GAS FILTER, 400 °C         │  dust → back-pulse
                │ sintered FeCrAl candles        │  → canister / tailings
                └───────────────┬────────────────┘
                                ▼
                ┌────────────────────────────────┐
                │ PRE-COOLER 920 K → 310 K       │  → main loop / 330 K radiator
                │ (kept above water dew point)   │
                └───────────────┬────────────────┘
                                ▼ stage-routed by valve manifold
      ┌────────────────────────────────────────────────────────┐
      │ TRAP 1A/1B (245–255 K): H₂O frost  ◄── cold radiator   │
      │ alternating deposit / melt                             │
      └──────────┬───────────────────────────────┬─────────────┘
                 │ melt (closed volume, 280 K)    │ residual gas
                 ▼                                ▼
      ┌──────────────────────┐        ┌───────────────────────────┐
      │ RAW WATER W0 bag     │        │ TRAP 2A/2B (185–200 K):   │
      │ 0.5 m³               │        │ SO₂, NH₃, organics, HCl   │
      └──────────┬───────────┘        │ → chemisorbent bed (solid │
                 ▼                    │   waste to tailings)      │
      ┌──────────────────────────────┐└────────────┬──────────────┘
      │ PURIFICATION (WPA-derived)   │             ▼
      │ degas membrane → carbon →    │  non-condensables (CO₂, CO,
      │ catalytic oxidation (TOC) →  │  CH₄, N₂, H₂) → single vent,
      │ mixed-bed IX → 0.2 µm filter │  mass-logged (bom-0-15)
      │ W1 ↔ W2 polish loop          │
      └──────────┬───────────────────┘
                 ▼
      ┌──────────────────────────────┐   ┌───────────────────────────┐
      │ STORAGE 2 × 5 m³ bladders    │──►│ DISPENSE: bom-0-3 loop,   │
      │ freeze-tolerant, 278–310 K   │   │ cargo container (bom-0-4),│
      └──────────┬───────────────────┘   │ or reject to tailings     │
                 ▼                       └───────────────────────────┘
      ┌──────────────────────────────┐
      │ DIAGNOSTIC PEM CELL 1 kWₑ    │  H₂ + O₂ → catalytic recombiner
      │ (W2 acceptance + degradation)│  → back to W0 (closed loop)
      └──────────────────────────────┘
```

### 5.2 Batch timeline (one retort; Retort B offset by about 2.4 h)

```
 t (h)  0      0.5         1.5         2.5         3.8   4.3  4.8
        |load  |stage 1    |stage 2    |stage 3    |cool |swap|
        |& seal|150→250 °C |250→450 °C |450→650 °C |>200°C|   |
 route: --     Trap 1A     Trap 1A     Trap 1B     Trap 2  --
 water: 0      15–30%      20–40%      30–60%      tail
 quality       best        good        dirtiest (S, C co-release)
```

Stage 3 water goes to its own trap so that dirty condensate does not foul the higher-quality stage 1–2 product. If the stage 3 contaminant load proves uneconomic to purify, operations can drop it. That decision is one of the experiments.

### 5.3 Site integration

```
                     sun
                      ↓
   ═══════ bom-0-5 site arrays ═══════      (pilot allocation ≤100 kWₑ)
                 │ site DC bus
   ┌─────────────┴──────────────────────────────────────────────┐
   │  bom-0-3 PROCESSING PLANT TRUSS (anchored at NEA)          │
   │                                                            │
   │  crusher ──side-stream──► [bom-0-6 SKID]                   │
   │      │                    ┌──────────────────────────────┐ │
   │      │                    │ retorts A/B · traps · purif. │ │
   │      ▼                    │ storage · avionics           │ │
   │  Fe-Ni line ◄── W1 water ─┤                              │ │
   │  (H₂ loop / thermal)      └──┬──────────┬───────────┬────┘ │
   │                              │          │           │      │
   │      tailings ◄── spent ore ─┘          │           │      │
   │      (bom-0-3 / bom-0-15)               │           │      │
   └─────────────────────────────────────────┼───────────┼──────┘
                cold radiator 25 m² (shaded)─┘           │
                main radiator 20 m²                      └► vent
                                                          (anti-sun,
                                                          away from
                                                          cold
                                                          surfaces)
   bom-0-4 tug docking ◄── water cargo container (optional, ≤1 m³/trip)
   bom-0-9 site relay  ◄── telemetry 20–100 kbps avg
```

### 5.4 Scale-up option W-2 (not baselined)

If a consumer for 100–300 t/yr is signed (bom-0-3 loop or Phase 1), the scale-up does not copy the pilot. It adds the pilot's proven trap, purification and storage train to bom-0-3's full-stream dewatering kiln:
- **What it would cost:** about $60–150M, 3–6 t of additional hardware, and 40–120 m² of cold radiator.
- **What it would need:** pilot site data through G-W3.
- **Ownership:** heating stays in bom-0-3.

This is Gemini's magnitude (0.3 kt/yr water), reached through a gated path instead of a baseline.

---

## 6. Subsystem specifications

### 6.1 Feed and canister station

- **Feed buffer:** 2 m³ hopper with an agitated screw outlet. It receives ore by enclosed conveyor from bom-0-3, which owns crushing and sizing.
- **Canisters:**
  - 14 in service plus 2 spare (spares booked in bom-0-14).
  - FeCrAl, 0.30 m³, Ø 0.70 m × 0.80 m, 38–45 kg each.
  - Internal radial fins on a 60 mm pitch improve heat penetration.
- **Lid seal:** double metal C-ring (silver-plated, sulfidation-tolerant alloy). The flange runs about 150 °C cooler than the bed because of a finned standoff. There is a leak-check port between the rings.
- **Fill:** 330 kg at about 1.15 t/m³ and 95% fill. It is centrifugally compacted at about 0.1 g during fill.
- **Handling:** a pilot-owned 2-axis gantry loader (0.25 t) moves canisters between the fill station, retort sleeves and dump chute. Nothing touches hot solids except the canister interior. Emptying runs at under 80 °C by reverse spin and lid-open into an enclosed tailings chute.

### 6.2 Canister-retorts (×2, counter-rotating)

| Parameter | Value |
|---|---|
| Configuration | Fixed resistive heater sleeve; the canister spins inside on cool-end bearings |
| Spin rate | 20–40 rpm (0.18–0.7 g at r = 0.35 m; nominal 30 rpm ≈ 0.35 g) |
| Angular momentum | The pair counter-rotates, so net angular momentum is under 5% of one unit. This avoids torque on bom-0-3 structure. |
| Heater | NiCr/FeCrAl elements outside the canister, in a sealed Ar-filled sleeve; 30 kW per retort peak |
| Bed temperature envelope | 150–800 °C qualified; profile nominally capped at 650 °C |
| Internal pressure | 0.1–5 kPa. Low pressure lowers dehydration temperature and limits retained water. |
| Sweep | Optional recirculated CO₂ or H₂O at 0.1–1 g/s to shorten residence time (an experiment variable) |
| Vapour exit | Axial port, cooled rotary joint (bellows-loaded carbon face plus labyrinth) at under 200 °C. Leakage goes outward to vacuum. |
| Mixing | Stationary plough on a retractable arm. It turns the centrifugally packed bed once per revolution. |
| Insulation | Multi-foil plus microporous silica; sleeve OD ≤1.1 m, skin ≤60 °C |
| Mass per retort | 0.65–0.75 t including drive, sleeve, insulation and joint |

**Energy check (per batch)**
- Ore: 330 kg × 0.30 kWh/kg = 99 kWh.
- Canister and fins: about 4 kWh.
- Sleeve losses at about 4 kW × 4.3 h ≈ 17 kWh.
- Total: about 120 kWh per batch, or 28 kW average per retort. Two retorts staggered draw about 56 kWₑ.
- The envelope is 0.15–0.45 kWh/kg ore. There is no heat recuperation in the pilot; at 56 kW, the hardware cost of recovery exceeds the array cost it saves (§12.4).

**Throughput check**
- 2 retorts × 5 batches/day × 330 kg = 3.3 t/day.
- At 70% availability: 843 t/yr ore.
- At 4 wt% and 90% capture: **30 t/yr**. At 2 wt%: 15 t/yr. At 75% capture and 60% availability: 10–22 t/yr.

### 6.3 Hot-gas filtration and pre-cooling

- **Filters:** sintered FeCrAl candles at about 400 °C. Area 0.4 m² per train; dual trains with back-pulse using the process gas. Removal ≥99.9% at ≥1 µm. Most dust is already rejected centrifugally because vapour leaves at the axis.
- **Pre-cooler:** finned counterflow gas-to-liquid exchanger feeding the main pumped loop (Galden, or a water/glycol loop kept above freezing). It cools gas from about 920 K to 310–320 K. Gas stays above the water dew point (about 280 K at 1 kPa H₂O), so no condensation occurs in the pre-cooler.

### 6.4 Cold traps (vapour deposition)

| Item | Trap 1A/1B (water) | Trap 2A/2B (secondary) |
|---|---|---|
| Fin temperature | 245–255 K | 185–200 K |
| Fin area | 4 m² each | 1.5 m² each |
| Frost capacity | 40 kg each (about 8 mm frost) | 5 kg each |
| Cycle | Deposit ≤8 h, then isolate, melt at 280–285 K in a sealed volume, drain under bladder pressure | Deposit ≤48 h, then regenerate into a chemisorbent bed |
| Cooling | Pumped loop to the 25 m² cold radiator | 1.5 kWₑ Stirling or pulse-tube cooler (load ≤0.5 kW, about 20% Carnot) |
| Design load | Average 3.9 kW (120 kg/day × 2.83 MJ/kg deposition). Peaks of 10–12 kW are buffered by fin and frost thermal mass. | ≤0.5 kW |

**Cold radiator sizing**
- Rejection: ε = 0.9, two-sided, at 235 K, gives σT⁴ ≈ 0.9 × 5.67×10⁻⁸ × 3.05×10⁹ ≈ 156 W/m² per side, or about 310 W/m² in total.
- Allowing for an NEA IR and albedo environment with a sunshade, net rejection is about 200–250 W/m².
- 3.9 kW average therefore needs 16–20 m². **I specify 25 m² (range 20–40).** The radiator sits behind a 30 m² single-layer shade.
- This is the only "sunshield" in the item. It is a radiator shade, not a cryogenic shield.

**Contamination logic**
- Water deposits selectively at 250 K, because CO₂'s frost point at its partial pressure is about 150 K.
- SO₂, NH₃ and heavier organics partly co-deposit. That is why stage 3 is routed separately and why Trap 2 exists.
- Non-condensables (CO₂, CO, CH₄, N₂, H₂) are vented. Estimated mass is 0.3–1.5% of ore, so 3–13 t/yr. **This is comparable to water output and must be in the bom-0-15 budget.**

### 6.5 Purification

The heritage is the ISS Water Processor Assembly architecture, whose daily throughput of about 100 kg/day is the same order as our 85–120 kg/day. The feed, however, is very different: acidic, high in sulfur, high in organics. The design accounts for that difference rather than assuming heritage carries over.

| Stage | Function | Note |
|---|---|---|
| Membrane degasser | Removes dissolved CO₂, H₂S, SO₂ | Gas returns to Trap 2 |
| Neutralising and activated-carbon bed | Raises pH, adsorbs organics | Consumable |
| Catalytic oxidation reactor (about 130 °C, O₂ from the recombiner side-stream or stored) | TOC from about 100 ppm to under 1 ppm | WPA-like VRA |
| Mixed-bed ion exchange | Conductivity from tens of µS/cm to ≤1 µS/cm | Largest consumable |
| 0.2 µm filter and UV | Particulates | — |
| Polish loop | W1 to W2 on demand | — |
| Capacity | 150 kg/day design (1.3–1.8× the average need) | — |
| Power | 2–5 kWₑ | — |
| Consumables | 150–400 kg/yr resin and carbon (resupplied via bom-0-14). Depends strongly on stage 3 contaminant load. | Key 0A measurement |

I agree with Claude that gas cleanup belongs inside bom-0-6. Gemini's separate $80–150M skid is over-scoped for 120 kg/day.

### 6.6 Storage and disposition

- **Tanks:** 2 × 5 m³ bladders, fluoropolymer-lined, aramid-restrained, inside a 0.6 t housing. Total 10 t (range 5–20 t).
- **Freeze-thaw tolerance:** verified for ≥50 cycles. Survival heating is not relied upon.
- **Fill time:** 10 t at 25 t/yr fills in about 5 months. **I reject both Claude's 100–1,000 t and GPT's 30–100 t inventories for this pilot.** A buffer larger than about six months of output only makes sense with a signed consumer.

**Disposition policy (proposed), in order:**
1. Supply bom-0-3 on request.
2. Hold a W2 reserve of at least 1 t for diagnostics and export samples.
3. Export by cargo container if a bom-0-4 trip has spare capacity and a signed requester exists.
4. Controlled rejection by injecting it into the tailings stream, where it freezes and is retained. This is never vented.

### 6.7 Diagnostic electrolysis cell

- A 1 kWₑ PEM stack processes about 3–4 kg H₂O per day at 5.6–6.5 kWh/kg. Its purpose is to prove W2 water is electrolyser-grade and to measure degradation from trace contaminants such as S and Cl.
- H₂ and O₂ are recombined catalytically and returned as water. There is no storage, no venting and no propellant.
- This is the only electrolysis in bom-0-6. Production electrolysis, if bom-0-3 adopts an H₂ loop, is bom-0-3's scope.

### 6.8 Thermal control

| Loop | Temperature | Load | Rejection |
|---|---|---|---|
| Main loop (pre-cooler, electronics, drives, purification) | 300–330 K | 12–25 kW, including about 8 kW of sensible heat from off-gas and sleeve leakage | 20 m² two-sided at 330 K. That gives about 1.2 kW/m² gross and about 0.8 kW/m² net with environment and view factor, so 15–30 m². I specify 20 m². |
| Cold loop (Trap 1) | 235–255 K | 3.9 kW average, 12 kW peak | 25 m², shaded |
| Trap 2 cooler | 190 K | ≤0.5 kW | Cooler heat goes to the main loop |
| Retort sleeves | Skin ≤60 °C | About 8 kW radiated | Partly direct to space; local view-factor shields protect the cold radiator |
| Spent ore | Leaves at under 80 °C after cool-down | About 50% of heating energy | Heat goes to the bed and canister, then radiates through the sleeve during cool-down |

Waste-heat rejection is explicit, as the re-assessment requires. Total rejected heat is about 60–100 kW, matching electrical input.

### 6.9 Power

- **Interface:** two feeders from the bom-0-5 site DC bus. I propose 300–600 VDC to match the bom-0-5 standard; this is TBD with bom-0-5.
- **Allocation:** ≤100 kWₑ peak, ≤70 kWₑ average.
- **Local bus:** pilot power-distribution unit with a 3 kWh local battery for safe-mode only (valve closing, avionics, 30-minute data retention).
- **Interruption tolerance:** batches can pause at any stage. Heaters off, valves closed, the canister cools sealed and resumes later. NEA rotation-driven eclipses or power cuts therefore cost throughput, not hardware. Bulk storage stays with bom-0-5, sized per site.

### 6.10 Analytical and diagnostic suite (the real product)

| Instrument | Purpose |
|---|---|
| Residual gas analyser (1–200 amu), on each retort exit and on the vent | Evolved gas analysis vs temperature: an in-situ TGA-EGA |
| Canister mass by a spin-down inertial method plus condensate mass flow | Yield closure ≤±5% |
| Thermocouples: 12 per canister bed via the rotary slip ring, plus sleeve and flange | Heat penetration model |
| Conductivity, pH, TOC analyser, ion-selective electrodes (Cl⁻, NH₄⁺, SO₄²⁻) | Grade verification for every melt |
| Frost-thickness optical sensors, cameras on traps and the filter | Trap and fouling behaviour |
| Seal leak-check (pressure decay), vibration and torque on drives | Life data |
| Retained sample archive: 20 × 50 ml water, 20 × 10 g residue, sealed | Optional return via a bom-0-4 trip to SEL1 |

### 6.11 Structure and stowage

- **Skid:** a 4.2 m × 4.2 m × 6.5 m truss frame, launched within a 5 m-class fairing envelope. It is stowed with radiators folded.
- **Mechanical interface:** a 4-point interface to bom-0-3 plant structure. bom-0-6 has no propulsion or attitude control of its own.
- **Delivery:** bom-0-4 tug delivery from the Earth departure orbit set by bom-0-8.
- **Servicing:** grapple fixtures and ORU-replaceable retorts, traps, purification beds and cooler. These are serviceable by bom-0-2 robots or tug-borne manipulators, consistent with the agreed "docking and servicing interfaces, not human-rating" direction.

---

## 7. Budgets

### 7.1 Mass

| Element | Mass (t) |
|---|---|
| Retorts 2× (drum sleeve, heaters, drives, joints) | 1.40 |
| Canisters 14× | 0.60 |
| Loader, feed buffer, fill and dump chutes | 0.60 |
| Hot-gas filters and manifolds and valves | 0.30 |
| Traps 4× and valve manifold | 0.60 |
| Cold radiator 25 m², shade 30 m², loop | 0.50 |
| Main radiator 20 m², pumped loop, pre-cooler | 0.45 |
| Trap 2 cooler | 0.10 |
| Purification | 0.80 |
| Storage bladders and housing | 0.60 |
| Diagnostic PEM cell and recombiner | 0.05 |
| Analytics suite | 0.15 |
| Avionics, PDU, harness, battery | 0.50 |
| Structure, interface, grapples | 1.00 |
| **Subtotal (CBE)** | **7.65** |
| Design margin 25% | 1.90 |
| **Launch mass (dry, excluding spares)** | **≈9.5 (range 7–11)** |
| Year-1 consumables (resin, carbon), booked as bom-0-14 cargo | 0.2–0.4 |
| Initial spares (2 canisters, 1 seal set, 1 trap ORU, filters), bom-0-14 | 0.8–1.2 |

### 7.2 Power (operating)

| Load | Average kWₑ | Peak kWₑ |
|---|---|---|
| Retort heaters (2) | 56 | 70 |
| Drives, plough, loader | 2 | 5 |
| Main and cold loop pumps | 1.5 | 2.5 |
| Trap 2 cooler | 1.5 | 2 |
| Purification (incl. catalytic oxidation reactor) | 3 | 5 |
| Diagnostic PEM | 0.5 | 1 |
| Storage heaters (when not frozen-tolerant mode) | 0.5 | 2 |
| Avionics and analytics | 1 | 1.5 |
| **Total** | **≈66** | **≈89** (allocation 100) |

Array cost attributable in bom-0-5 is 100 kWₑ × $30–150/W ≈ $3–15M hardware, plus delivery.

### 7.3 Data

| Stream | Rate |
|---|---|
| Housekeeping | 5–10 kbps continuous |
| Per-batch science (RGA scans, thermal maps, chemistry) | ≈150–400 MB/day |
| Images and video (on demand) | Burst ≤1 Mbps |
| **Average downlink** | **20–100 kbps; ≤1 GB/day** |
| Uplink | Campaign files ≤1 MB/week; patches ≤50 MB/quarter |

This is consistent with Claude and GPT's 0.1–1 Mbps envelope; I sit at its low end. The round-1 230 Mbps figure is rejected.

---

## 8. Interface control summary

| Interface | Counterpart | Value / content | Owner of the shared quantity |
|---|---|---|---|
| Ore side-stream | bom-0-3 | 600–1,000 t/yr, ≤2 mm, ≤5% moisture-free fines loss, enclosed conveyor | bom-0-3 crushing; bom-0-6 from the hopper inward |
| Spent ore return | bom-0-3 / bom-0-15 | 560–960 t/yr at under 80 °C, enclosed chute | bom-0-3 tailings |
| Water out | bom-0-3 | W1 up to 20 t/yr, 0.1–5 kg/min, 280–300 K | bom-0-6 to the flange |
| Mechanical | bom-0-3 truss | 4-point, ≤10 t, loads from the counter-rotating pair | bom-0-3 structure |
| Power | bom-0-5 | ≤100 kWₑ, 2 feeders, DC bus standard TBD | bom-0-5 |
| Data | bom-0-9 | Site LAN (SpaceWire or Ethernet TBD), 20–100 kbps average to Earth | bom-0-9 |
| Operations | bom-0-10 | Weekly campaign planning, ≤2 FTE equivalent during commissioning, 0.5 thereafter | bom-0-10 |
| Delivery | bom-0-4 / bom-0-8 | 9.5 t plus about 1 t spares; one tug slot | bom-0-4 / bom-0-8 |
| Vent and contamination | bom-0-15 | 3–13 t/yr non-condensables, single vent, plume model, zero solids by design | bom-0-15 sets the limit |
| Export | bom-0-4 / bom-0-13 | 1 m³ cargo container interface; flight only on signed request | bom-0-13 |
| Water-EP data | bom-0-4 / bom-0-16 | Condensate impurity spectrum, W2 samples | Desk study per D-05 |
| Ground R&D | bom-0-11 | Shared thermal-vacuum chambers; T13 test reports | bom-0-6 owns T13 content |

---

## 9. Autonomy, control and communications

**Light time and control approach**
- One-way light time is up to about 17 minutes at a 2 AU Earth range, plus conjunction outages of 2–4 weeks.
- Therefore all batch-level control is onboard. The ground sets campaigns: a temperature-profile matrix, sweep settings and stage routing.

**Autonomy levels (functional requirements, not labels)**

| Function | Onboard | Ground |
|---|---|---|
| Batch sequencing, stage routing, trap switching | Fully autonomous, closed-loop on RGA water signal (stage ends when dH₂O/dt < threshold) | Sets profiles |
| Purification grade control | Autonomous; diverts out-of-spec water to W0 | Approves bed changes |
| Canister handling | Autonomous with machine-vision verification | Reviews anomalies |
| FDIR | Autonomous | Post-event review |
| Experiment re-planning | Advisory onboard (suggests profiles) | Decides |

**FDIR safe-state:** heaters off, all isolation valves closed, retorts spun down over 60 s, traps held, bladders sealed, telemetry buffered for 30 days.

**Triggers:**
- Sleeve or canister over-temperature: more than 50 K above setpoint.
- Pressure more than 10 kPa, or a pressure-decay leak.
- Unexpected species, such as H₂ above 5% in the vent, which may indicate a reaction.
- Loss of power.
- Drive torque anomaly.
- Loss of the bom-0-3 interlock.

**Requirement:** 30 days unattended with ≥50% of nominal throughput maintained.

**Software:** this item reuses the bom-0-3 plant-control framework and software-classification process. It adds about 40–60k SLOC of new application code.

**Comms:** all traffic goes through bom-0-9's site relay. bom-0-6 has no direct-to-Earth link. DSN or commercial ground time is costed in bom-0-9.

---

## 10. Manufacturing and materials

- **Sulfidation is the main materials risk.** Ni-base superalloys suffer catastrophic sulfidation near the Ni–Ni₃S₂ eutectic (about 637 °C), which is exactly at the top of the nominal profile.
  - Canisters, fins and filters: alumina-forming FeCrAl (Kanthal APM-class), qualified for H₂S/SO₂/H₂O at 650–800 °C.
  - Heater sleeve interior: Co-Ni-Cr-Si sulfidation-resistant alloy (HR-160 class) or aluminised 310 stainless.
  - Avoid Ni-rich alloys anywhere in the hot gas path.
- **Seals:** metal C-rings with silver or gold plating checked for compatibility with sulfur. Silver tarnishes, so gold is preferred despite cost. Carbon-face rotary joint below 200 °C.
- **Wetted cold side:** 316L and Ti-6Al-4V. Assume condensate at pH 2–5 with sulfite and sulfate; the alloy choice must account for this.
- **Fabrication:**
  - FeCrAl canisters are spun or deep-drawn with electron-beam-welded fins. All 16 are a single production lot.
  - Radiators are aluminium honeycomb with embedded loop tubing, using standard spacecraft supply chains.
  - Purification is a derivative of ISS WPA ORUs from the incumbent supplier base, re-qualified for the new chemistry.
- **Production quantity:**
  - 1 flight unit.
  - 1 EDU/qualification unit, which stays on the ground as the anomaly-resolution testbed.
  - No production line. Unit cost is DDT&E-dominated.
- **Test infrastructure:** a thermal-vacuum chamber of at least 5 m with a cold shroud representative of the radiator environment. A spin rig. Sulfur-tolerant exhaust handling. A CI/CM simulant supply of about 30–60 t for EDU campaigns: commercially available CI and CM simulants, spiked to TGA-matched water, C and S content.

---

## 11. Development roadmap and technology readiness

### 11.1 Decomposition of T13

| Element | Description | TRL now | Heritage | AD² | Path to TRL 6 |
|---|---|---|---|---|---|
| T13a | Granular heating of hydrated ore in a spun canister in microgravity | 3 | Lunar oxygen and lab volatile work; no µg spun-bed data | 6 | Breadboard, then centrifuge plus parabolic or suborbital tests, then full-scale EDU in thermal-vacuum |
| T13b | Selective vapour deposition from dirty off-gas | 4–5 | Cryopumping; ISS condensation | 4 | Breadboard on real meteorite off-gas |
| T13c | Purification of asteroid condensate to W1/W2 | 4 | ISS WPA at TRL 9 for a different feed | 5 | Bench on real condensate, then EDU loop |
| T13d | Sulfidation-resistant hot structure and seal life (500–1,500 cycles) | 4 | Industrial FeCrAl | 5 | Coupon and seal cycling in synthetic off-gas |
| T13e | Autonomous batch control and FDIR | 5 | Industrial PLC; spacecraft FDIR | 3 | Hardware-in-the-loop with the EDU |
| T13f | Freeze-tolerant bladder storage | 5 | Flight bladders | 3 | 50-cycle test |

**Classification under D-02**
- In the C-type branch, T13a, T13b and T13d are project-ending for bom-0-3's dewatering front-end, because there is no Fe-Ni route without dewatering.
- They must therefore reach **TRL 6 by KDP-0B with no waiver**.
- In non-C-type branches, T13 is not a KDP-0B criterion.

### 11.2 Gates specific to bom-0-6

| Gate | Timing (Y0 = 0A start) | Pass criteria | Fail action |
|---|---|---|---|
| **G-W0 Target** (rides on the programme target gate) | Y3–Y5, after bom-0-1 scouts | Target spectrally C-complex. Scout in-situ hydration ≥2 wt% bound H₂O equivalent over the candidate mining area. bom-0-3 confirms a dewatering front-end is required. | Close bom-0-6. Archive 0A data. Zero 0B spend. |
| **G-W1 Consumer** | With G-W0 + 12 months | A documented need for ≥10 t/yr from bom-0-3 (loop or thermal fill), **or** confirmation that the dewatering-pathfinder rationale stands. Phase 1 offtake optional. | Downscope to the T13 evidence package only (single retort, no export interface, saving about $15–30M). |
| **G-W2 TRL 6 / KDP-0B** | Y5–Y6 | EDU in thermal-vacuum: yield within ±25% of TGA prediction; capture efficiency ≥75%; W1 achieved for 30 consecutive batches; seals ≥500 cycles; µg granular tests show heat-penetration time within ±30% of model. | No KDP-0B pass in the C-type branch. Fallbacks: carbothermal process change in bom-0-3, or Earth-supplied reductant via bom-0-8. |
| **G-W3 Site commissioning** | Deployment + 6 months | ≥10 t water cumulative at W1; contaminant budget held | Hold W-2. Continue as a science asset or terminate. |
| **G-W-2 Scale-up option** | G-W3 + 6–12 months | Signed consumer for ≥100 t/yr, and the measured cost model | Do not exercise |

### 11.3 Schedule

```
Year:      0    1    2    3    4    5    6    7    8    9   10   11
0A sub:    [desk study + TGA/EGA campaign]
                [breadboard T13a/b/d → TRL 4–5 ]
                          ◆G-W0 (target gate, window Y3–Y5)
0B (cond):                [Ph B][ Ph C: EDU build/test ]
                                     ◆G-W1     ◆G-W2 = KDP-0B
                                          [ Ph D: flight unit ][launch/tug]
                                                         [site ops ≥3 yr]
                                                              ◆G-W3
```

The critical point is that the 0A breadboard must run before the target is known. If T13 waited for G-W0 at Y3–Y5, it could not reach TRL 6 by a Y5–Y6 KDP-0B. This sets the deadline for the $15–38M 0A sub-line: it buys schedule for the C-type branch.

### 11.4 Request to bom-0-12 (costed there, not here)

If the 0A pathfinder visits a C-type body, I request that bom-0-12 carry a volatile-extraction experiment:
- About 50–150 kg, 1–3 kWₑ.
- A single mini-canister with 5 kg batches, an RGA, and a 250 K cold finger.
- It would give TRL 7 evidence for T13a/b at about one hundredth of the pilot's scale before KDP-0B.

---

## 12. Cost analysis

### 12.1 0A sub-line (unconditional)

| Element | Range ($M) | Basis |
|---|---|---|
| Desk study: process, interfaces, water-supply side of the water-EP desk study (D-05) | 2–5 | 6–12 FTE-yr |
| Feedstock characterisation: TGA-EGA on CI, CM and CR meteorites (purchase or loan), sample-science collaborations, simulant development | 3–8 | Lab campaign of about 200 runs; simulant 5–10 t |
| Breadboard canister-retort (¼ scale), trap train, seal and coupon cycling in synthetic off-gas → TRL 4–5 | 8–20 | Analogous to lunar ISRU breadboards |
| Purification bench on real condensate | 2–5 | — |
| **0A total** | **15–38** | Booked in bom-0-6 under a 0A sub-line and **excluded from bom-0-11** to keep the option value visible |

### 12.2 0B (conditional on G-W0)

| Element | Range ($M) | Basis |
|---|---|---|
| Phase B–D DDT&E: design, analysis, software, µg granular tests (parabolic/suborbital $3–10M included) | 55–130 | About 7.6 t CBE first-of-kind process hardware, about 60 person-yr/yr for 4–5 yr |
| EDU / qualification unit (full scale, 2 retorts, full trap and purification train) | 25–55 | About 60–70% of flight-unit recurring cost |
| Flight unit (recurring) | 35–80 | About $5–10k/kg CBE for process hardware with no production line |
| AIT including bom-0-3 interface simulator | 10–25 | — |
| Site commissioning and 3-year sustaining engineering (not mission operations) | 10–25 | 3–6 FTE |
| **0B total** | **135–315** | — |
| Probability-weighted at P(C-type) 20–40% | ≈27–126 | — |

### 12.3 Excluded, booked elsewhere (order-of-magnitude for completeness)

| Item | Owner | Estimate |
|---|---|---|
| Launch, about 10.5 t including spares | bom-0-8 | $20–55M at $2–5k/kg to the departure orbit |
| Tug transport slot | bom-0-4 | One 150–300 t-class trip share, about 5% of capacity |
| 100 kWₑ of arrays and distribution | bom-0-5 | $3–15M hardware |
| Spares and consumables (about 1–1.6 t over 3 years) | bom-0-14 | $10–25M |
| Operations (planning, staffing) | bom-0-10 | $3–8M/yr |
| Comms | bom-0-9 | Marginal |
| Plume and contamination analysis | bom-0-15 | $1–3M |
| Contingency | bom-0-17 | Programme-level; not duplicated here |

### 12.4 Unit economics (why this is an information purchase)

- **Pilot:** ($150–355M hardware and development) ÷ (about 75–100 t over 3–5 years) gives **$1.5–4.7M/t**, or about $1,500–4,700/kg at the NEA, before transport.
- **Comparison:** this is no better than Earth-supplied water delivered to SEL1, which I estimate at roughly $3–10k/kg. That estimate assumes $1.5–3k/kg to LEO and a 2–3.5× transfer multiplier. My central estimate sits inside Claude's $1–20k/kg band.
- **Scale-up W-2:** about $60–150M incremental for 100–300 t/yr over 5 years, or 0.5–1.5 kt. That is **$40–300/kg incremental**, before tug transport and the opportunity cost of displacing Fe-Ni from tugs.
- **Conclusion:** the pilot is justified only as T13 evidence and dewatering-pathfinder risk reduction. The water business case lives entirely in W-2, and only with a consumer. That matches Claude's "missing piece is a customer" finding.

---

## 13. Risk assessment

Likelihood and consequence are each scored 1–5.

| # | Risk | L | C | Mitigation |
|---|---|---|---|---|
| R1 | Surface regolith partly dehydrated, giving under 2 wt% recoverable water | 3 | 4 | Scout hydration mapping at G-W0; select the mining area; the pilot still yields T13 data at low output |
| R2 | Canister seal or rotary-joint failure from dust and sulfur | 3 | 4 | Cold solids handling; double C-rings with an inter-seal monitor; ORU joints; ≥500-cycle EDU proof |
| R3 | Sulfidation or corrosion of the hot path | 3 | 4 | FeCrAl / Co-Ni-Cr-Si; no Ni-rich alloys; coupon program in 0A; cap at 650 °C nominal |
| R4 | Purification consumables far exceed 400 kg/yr because of stage 3 contaminants | 3 | 3 | Stage-3 routing and optional rejection; 0A measurement on real condensate; regenerable IX as a design option |
| R5 | Microgravity heat penetration slower than modelled | 3 | 3 | Fins at 60 mm pitch; plough; variable spin; parabolic and suborbital tests; bom-0-12 request |
| R6 | Trap fouling by co-deposited SO₂ or organics degrades water grade | 3 | 3 | Two temperature levels; alternating traps; melt-and-reprocess loop |
| R7 | Vent plume contaminates the 235 K radiator or bom-0-3 optics and arrays | 2 | 4 | Single vent with anti-sun pointing; view-factor exclusion; plume model in bom-0-15; mass logging |
| R8 | Schedule: G-W0 late (Y5), so TRL 6 slips past KDP-0B | 3 | 5 | Pre-target 0A breadboard; EDU long-lead items released at G-W0 − 6 months on a gated low-cost advance (≤$5M) |
| R9 | No consumer emerges; the pilot is seen as stranded | 4 | 2 | Frame as the T13 and dewatering pathfinder; G-W1 downscope path |
| R10 | Scope creep back to production ISPP, LH₂ or water EP to "give it a customer" | 3 | 4 | Requirement WP-F8; W-2 needs a signed consumer; configuration control under bom-0-7 |
| R11 | Double-counting heat or capture with bom-0-3 | 3 | 2 | §1 principle 6 and §8 ownership table |
| R12 | Momentum or vibration from the spinning pair disturbs bom-0-3 | 2 | 2 | Counter-rotation; synchronised spin-up; isolators |

**Fallbacks if T13 fails (C-type branch)**
1. bom-0-3 switches to carbothermal reduction using indigenous carbon. Dewatering still happens, but water is rejected rather than captured; this needs a larger bom-0-15 vent budget.
2. Earth-supplied reductant via bom-0-8. H₂ make-up at a few t/yr is affordable at a few $M/yr.
3. Re-target to a non-C body at the next window.

---

## 14. Disagreements with Round 2

### 14.1 Gemini: 2 units, 1,500 t/yr, $250–450M, high confidence (rejected)

**Scale does not fit the site**
- 1,500 t/yr at 4 wt% needs 37.5 kt/yr of ore. That is 5× the ore needed for about 1 kt/yr of Fe-Ni product, and above the abandoned 25 kt/yr central-station scale.
- Heating alone would be 37.5 kt × 0.3 kWh/kg ≈ 11 GWh/yr, or about 1.3 MWₜₕ continuous. That consumes most of a 1–2.5 MWₑ site.

**No Phase 0 consumer at that scale**
- There is no LOX/LH₂ and water EP is a desk study.
- Even Gemini's own fleet propellant estimate (380–510 t/yr) assumes water EP, which D-05 does not select.

**Confidence**
- High confidence is not supportable for a technology at TRL 2–4.

### 14.2 Claude: 1 × 10–100 t/yr, $150–400M (upper end rejected)

- I agree with the lower half. 100 t/yr needs 2.5–5 kt/yr of side-stream ore, which turns a pilot into a production unit without a consumer.
- The top of the cost range follows from that upper sizing.
- I agree with Claude's placement of gas cleanup and its real-options framing.

### 14.3 GPT: 1 × 10–30 t/yr, $100–300M (closest)

- I adopt GPT's quantity.
- I raise the cost floor to $135M for 0B plus $15M for 0A because of the sulfidation-qualified EDU and the purification re-qualification.
- I adopt GPT's position that heating should be counted once, but I assign pilot retort heating to bom-0-6 because the pilot owns its retorts.

### 14.4 Water EP as a sizing driver (rejected for bom-0-6)

- Propellant demand is ṁ = 2ηP/vₑ². At Isp 1,000 s and η = 0.5, that is about 330 t per MWₑ-yr.
- A fleet of 10–18 tugs at 1–2.5 MWₑ needs 3–15 kt/yr at full duty.
- That is 100–500× this pilot and about 10–50× even option W-2.
- Water EP would need its own Phase 1-scale gate. The pilot's contribution is impurity data for the desk study only.

### 14.5 Reconciliation content now superseded

- **Siting at L4/L5:** superseded; processing is co-located at the NEA.
- **The PEM production chain** (5.2–7.0 kWh/kg; 7–11 kWh/kg chain): applies only to the diagnostic cell and to bom-0-3 if it adopts an H₂ loop.
- **The cryocooler dispute** (700 W vs 1–11 kWₑ), the rq-0-30 subcooling margin, rq-0-47/48 heat leak and MLI, and the 35–60 m sunshield: all moot for Phase 0. **I recommend these deliberations be marked "Phase 1 reference, not applicable to Phase 0"** under bom-0-7 configuration control, rather than corrected and written back into a Phase 0 specification.
- **The 25 kt/yr gate:** irrelevant to this item. My gates are target, consumer and TRL (§11.2), consistent with Claude and GPT's Round 2 demand-gate logic.

### 14.6 Water inventory

- Claude's 100–1,000 t and GPT's 30–100 t are both larger than this pilot needs.
- I specify 10 t (5–20 t), plus a disposition policy (§6.6) that ends in retention in tailings, never venting.

---

## 15. Open engineering questions

| # | Question | What settles it | Needed by |
|---|---|---|---|
| Q1 | Recoverable water vs temperature and pressure for real C-complex surface material, including space-weathered regolith | 0A TGA-EGA campaign; scout spectra and hydration data | G-W0 |
| Q2 | Does bom-0-3 in a C-type branch use an H₂ loop, a carbothermal route or another route? This sets the pilot's internal consumer. | bom-0-3 process trade | G-W1 |
| Q3 | Stage-3 contaminant load (S, C, Cl) and the resulting purification consumable mass | Real-meteorite condensate bench tests | Phase B |
| Q4 | Heat-penetration time in a centrifugally packed 0.35 g bed of hydrated, cohesive fines | Spin rig, then parabolic tests | PDR |
| Q5 | Seal life under sulfur-laden dust at 500–650 °C flange conditions | 0A seal cycling | G-W2 |
| Q6 | Allowable non-condensable vent mass and plume geometry at the site (3–13 t/yr) | bom-0-15 modelling (ALARP, D-03) | PDR |
| Q7 | Site DC bus voltage and availability profile, including NEA rotation and eclipse | bom-0-5 site design | Phase B |
| Q8 | Is there any Phase 1 demand for W2 water at SEL1 (shielding, EP tests, life support)? | bom-0-13 and Phase 1 manifest | KDP-0B |
| Q9 | Can bom-0-12 carry the volatile-extraction experiment if its target is C-type? | bom-0-12 accommodation study | bom-0-12 PDR |
| Q10 | Optimal nominal temperature cap (550 vs 650 vs 750 °C) balancing yield against S/C co-release and energy. This is a trade-off point, not a fact. | EDU test matrix plus value weights ratified by the owner | G-W2 |
| Q11 | Should controlled water rejection into tailings or venting be permitted at all? This sets the bom-0-15 budget for the whole C-type branch. | bom-0-15 and the licensing state (D-03) | KDP-0B |
| Q12 | Whether CR-like metal-bearing hydrated targets exist among accessible NEAs. This would raise P(pilot flies) and change bom-0-3's metal yield. | bom-0-1 survey | G-W0 |

---

## 16. Recommended BOM entry (for human review)

| Field | Value |
|---|---|
| ID / name | bom-0-6 Water Pilot (C-type target only) |
| Phase | 0A sub-line (unconditional); 0B (conditional on G-W0) |
| Quantity | 0A: ground breadboards only. 0B: 1 flight skid (2 canister-retorts) + 1 EDU |
| Performance | 10–30 t/yr water (design 25 t/yr at 4 wt%), Grade W1/W2, 10 t storage |
| Mass / power | 7–11 t launch; ≤100 kWₑ peak, about 66 kWₑ average |
| Cost | 0A **$15–38M**; 0B **$135–315M**; option W-2 $60–150M (not baselined) |
| Confidence | Low on cost; medium on mass and power; low on yield (feedstock-limited) |
| Gates | G-W0 target, G-W1 consumer, G-W2 TRL 6 (= KDP-0B in the C-type branch), G-W3 commissioning |
| Explicit exclusions | LOX/LH₂, cryogenic storage, sunshield (except the radiator shade), production electrolysis, tug propellant, EML1 depot, excavation, full-stream dewatering heat |
| Supersedes | bom-0-6 ISPP ($2.0B, 4 × $500M); consensus and rq-0-14/30/47/48 as Phase 0 governing documents |