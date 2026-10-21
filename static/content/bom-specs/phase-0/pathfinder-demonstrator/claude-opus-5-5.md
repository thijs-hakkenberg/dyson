---
bomId: "bom-0-12"
itemName: "0A Pathfinder Demonstrator"
itemSlug: "pathfinder-demonstrator"
modelId: "claude-opus-5-5"
modelName: "Claude Opus 5.5"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-12: 0A Pathfinder Demonstrator — Technical Proposal

**Project Dyson, Phase 0A**
**Status:** Proposal for baseline. All numbers are engineering estimates at pre-Phase-A maturity. Confidence is low to medium; the basis for each figure is stated where it appears.

---

## 1. Executive Summary

The 0A Pathfinder is the one mission that turns Phase 0 from a paper study into a decision. It must give the KDP-0B board flight evidence, from the actual target, that the project-ending technologies work: excavation, beneficiation, primary Fe-Ni processing and containment. It must also show they work together, under autonomy, in microgravity, at a scale that can be extrapolated.

**Recommended architecture.** A single launch of about 25 t carries three elements:

1. **Carrier/Orbiter (C/O).** A 100 kWe solar-electric carrier, krypton baseline, with one iodine string flown for life data. It handles transfer, hover/orbit operations, ejecta monitoring, relay and product return.
2. **Surface Plant Module (SPM).** An anchored, roughly 8 t plant. It carries:
   - a 75 kWe sun-tracking array;
   - 150 kWh of storage;
   - a beneficiation train;
   - a centrifugal induction furnace at full 0B unit scale;
   - a subscale carbonyl refining cell;
   - integral containment.
3. **Two flight-standard mining robots** from the bom-0-2 design. They are powered over a 2 kV tether, carry 20 kWh batteries, and supply the plant with sealed regolith canisters.

A small **Product Shuttle** lifts cast Fe-Ni to the carrier. The carrier returns about 300 kg of product toward SEL1 and drops a 5–10 kg sample capsule at an Earth flyby.

**Design philosophy: "full-scale units, subscale plant; gravity-independent processes."** Every unit process with scale-sensitive physics flies at the size 0B will use. This covers the robot, the excavation head, the crucible and the canister port. Plant throughput is about 1/9–1/12 of the 0B reference.

Every unit process is designed to create its own body force, by centrifuge or forced feed. That way ground tests stay valid and the flight result extrapolates.

**Key numbers (current best estimate)**

| Parameter | Value |
|---|---|
| Launch mass | 24.8 t (range 21–27 t, depending on target Δv) |
| Dry mass, all elements | ≈16 t incl. 20% margin |
| Surface power | 75 kWe BOL at 1 AU; ~55 kW peak demand |
| Feed processed (full success) | ≥40 t regolith |
| Product (full success) | ≥4 t Fe-Ni, as ~55 kg centrifugally cast rings |
| Containment verification floor | escaping mass fraction measurable to 1×10⁻⁴ |
| Surface campaign | 12 months primary; 24+ months extended (SPM stays) |
| Launch / arrival / KDP-0B evidence | 2032–33 / 2034–35 / 2035–36 |

**Cost (bom-0-12 line, 0A only):** **$1.3–3.0B, point estimate $2.0B**, including a 25% project-held reserve. Launch, ops, ground segment and propellant are excluded; those sit in bom-0-8, 0-9, 0-10 and 0-16. Including them, the full-mission view is **$1.7–3.8B**. The 0B share of this line is **$0**.

**Position on round-2 figures**
- I agree with Claude's range in structure but narrow it.
- Gemini's $1.8–2.5B is plausible as a centre but too narrow for a low-confidence, first-of-kind estimate.
- GPT's $0.6–1.5B hardware figure is too low for ~16 t dry of first-of-kind industrial flight hardware plus a 100 kW SEP stage. GPT's $0.3–0.9B delivery figure is too high for a single launch. Details are in §9.

---

## 2. Purpose, Scope and Boundaries

### 2.1 What the Pathfinder must prove (and nothing more)

The pathfinder exists to retire the risks that would end the project at KDP-0B. Per D-02, those must reach **TRL 6 in a relevant environment with no waivers**. Flight at the candidate 0B target is the most relevant environment available. The demonstration is subscale in plant throughput, so I claim **TRL 6 for the 0B system** and **TRL 7 for the demonstrator configuration**.

| # | Project-ending question | Pathfinder answer |
|---|---|---|
| Q1 | Can we hold position and react excavation loads on a weak, possibly rubble-pile surface? | SPM anchoring plus robot self-anchoring; in-situ pull tests to 2 kN |
| Q2 | Can we excavate and move regolith to a plant at useful rates without losing it? | ≥0.8 t/day sealed-canister feed loop |
| Q3 | Does beneficiation (comminution + magnetic separation) work in µg on real material? | Centrifugal mill + magnetic drum; measured grade and recovery |
| Q4 | Can we melt, separate slag and cast Fe-Ni in µg, at full unit scale? | 50 kg-batch spinning induction crucible |
| Q5 | Can the product meet a Phase 1 specification, particularly sulfur? | In-situ assay + Earth lab assay of returned samples; carbonyl purity route |
| Q6 | Can we contain excavation fines, process dust and off-gas to a licensable level, and prove it? | Direct ejecta measurement from the carrier and perimeter sensors |
| Q7 | Can tethered robots, plant and power operate autonomously across up to ~20 min one-way light-time? | ≥72 h unattended production runs |
| Q8 | Does maintenance-by-robot work? | Robot replacement of plant ORUs (filters, mill liners, crucible) |

### 2.2 Explicit scope boundaries (no duplication)

| Item | Relationship to bom-0-12 |
|---|---|
| bom-0-1 Survey/Scouts | Supplies target data. Pathfinder target **must** be a bom-0-1-characterised 0B candidate. |
| bom-0-2 Mining Robots | Owns robot design and NRE. bom-0-12 buys **two flight units** and integration. |
| bom-0-3 Processing Plant | Owns the 0B plant design. Pathfinder flies bom-0-3 unit designs at flight-qualified maturity. Pathfinder adaptation and builds are carried here. |
| bom-0-4 Cargo Tugs | No tug qualification here. The carrier shares PPU/thruster families where possible and flies one iodine string as a life-data source. |
| bom-0-5 Site Power | Pathfinder array/PMAD/storage is a subscale instance of the 0-5 design; builds carried here. |
| bom-0-6 Water Pilot | Not carried. If the target turns out C-type, a co-manifest is a separate decision. |
| bom-0-8 Launch | Owns launch procurement. bom-0-12 sets the requirement (§4.6). |
| bom-0-9 / 0-10 | Own DSN and ground segment, and flight operations. bom-0-12 carries mission-specific flight software and the engineering analysis team. |
| bom-0-11 NRE/Ground R&D | Must deliver TRL 4–5 on all Q1–Q8 technologies by pathfinder PDR. Owns the dusty-vacuum regolith facility. |
| bom-0-13 Receiving Node | Optional product handoff target at SEL1; not a dependency. |
| bom-0-14 Spares | Pathfinder ORU set carried here; it doubles as a 0B maintainability demo. |
| bom-0-15 Debris | Owns the requirement. Pathfinder owns verification of it. |
| bom-0-16 EP Propellant | Supplies about 8.6 t Kr plus ~0.5 t I₂. |
| bom-0-17 Contingency | Holds the **reflight option** (§10.3), not this line. |

### 2.3 What the Pathfinder is *not*

- **It is not a production asset.** About 4 t of product has no economic value. Scope creep toward "small 0B" is a named risk (R-14).
- **It is not a crewed-capable vehicle.** Docking and servicing interfaces and structural reserve are provided; no human-rating.
- **It is not a technology zoo.** Every payload must map to Q1–Q8 or to a D-05 open decision.

---

## 3. Design Philosophy (Opinionated)

1. **Full-scale units, subscale plant.** These fly at 0B unit size:
   - the robot;
   - the excavation head and its containment skirt;
   - the sealed canister and docking port;
   - the crucible (50 kg batch);
   - the magnetic separator drum width.

   Throughput is reduced by running fewer units at lower duty. This avoids the classic pathfinder trap: proving a process at a scale whose physics, such as melt surface-to-volume ratio, dust generation per cut, or seal wear, does not extrapolate.

2. **Make every process gravity-independent.** If the furnace works because it spins at about 1 g at the wall, it behaves almost identically on Earth and at the asteroid. Ground test then becomes predictive, and the flight test confirms rather than discovers. Where a process cannot generate its own body force, such as excavation or particle transport, use positive mechanical containment, never ballistic transfer.

3. **Sealed batch logistics over continuous open flow.** Robots fill sealed 50 L canisters and dock them to the plant. Regolith is never in free flight outside an enclosure. This is the single biggest containment lever.

4. **Measure containment directly.** A mass balance (in versus out) cannot verify 99.9% containment, because accounting error is about ±1%. The pathfinder must detect escaping material directly and quantify it one order of magnitude below the interim ceiling.

5. **Graceful partial success.** Minimum mission success comes from the excavation and containment chain alone, which are the hardest licence and physics risks. Processing failures must not kill excavation data, and vice versa.

6. **Fly what 0B will fly.** The same PMAD voltage (2 kV robot bus), the same autonomy architecture and the same canister standard. Anything pathfinder-unique must be justified.

7. **Leave infrastructure behind.** The SPM stays on the surface and keeps operating as a long-duration environment and degradation testbed. It has 0B power and data interconnects in case the 0B site is co-located.

---

## 4. System Architecture

### 4.1 Mission elements

```
                     LAUNCH STACK (~24.8 t, single SHLV, C3 ≈ -2 km²/s² + lunar flyby)
 ┌──────────────────────────────────────────────────────────────────────────┐
 │  CARRIER / ORBITER (C/O)        5.5 t dry, 9.1 t propellant              │
 │   • 100 kWe BOL arrays (2 wings, ~300 m²)                                │
 │   • 4 × 25 kW Hall strings (3 × Kr, 1 × I₂ demo)                          │
 │   • 3 m Ka/X HGA, prox-link relay, ejecta lidar & dust instruments       │
 │   • Soft-capture for Product Shuttle; Earth SRC mounted                  │
 ├──────────────────────────────────────────────────────────────────────────┤
 │  SURFACE PLANT MODULE (SPM)     8.2 t (incl. 20% margin)                 │
 │   • 6 anchored legs, 75 kWe tracking array, 150 kWh battery              │
 │   • Beneficiation train, centrifugal furnace, carbonyl cell              │
 │   • Containment enclosure, tailings compactor, radiators 60 m²           │
 ├──────────────────────────────────────────────────────────────────────────┤
 │  MINING ROBOTS ×2               1.9 t total (incl. tether reels, margin) │
 ├──────────────────────────────────────────────────────────────────────────┤
 │  PRODUCT SHUTTLE                0.5 t wet                                │
 │  EARTH SAMPLE RETURN CAPSULE    0.05 t                                   │
 └──────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Concept of operations

```
 T0           T0+1.5–2 yr        +2–3 mo         +2 mo           +12 mo          +1–1.5 yr
 LAUNCH ──► SEP CRUISE ──► APPROACH & ──► SPM LANDING & ──► SURFACE ──► C/O RETURN
 lunar      Δv 4–6 km/s    CHARACTERISE   ANCHOR, ROBOT     CAMPAIGN     Δv 3–5 km/s
 flyby                     shape, spin,   DEPLOY,           (primary)    Earth flyby: SRC
                           gravity,       COMMISSION                     release; park
                           site select                                   SEL1 w/ 300 kg
                                                                │
                                         Interim TRL review ◄───┤ (campaign month 6)
                                         → KDP-0B evidence pkg  │
                                                                └─► SPM EXTENDED OPS
                                                                    (24+ mo, direct-to-Earth)
```

### 4.3 Surface configuration

```
                         ☀ (sun-tracking about body spin axis)
                    ┌──────────────────────┐
                    │  ARRAY WING A ~115 m²│
                    └──────────┬───────────┘
                               │ 2-axis mast (6 m)
                    ┌──────────┴───────────┐
       Radiator ════╡   SPM CORE           ╞════ Radiator   (60 m² total, edge-on to sun)
       (dust-shed   │ ┌──────┐ ┌────────┐  │      (dust-shed coating)
        coating)    │ │BENEF.│ │FURNACE │  │
                    │ └──────┘ └────────┘  │
                    │ ┌──────┐ ┌────────┐  │     Product Shuttle
                    │ │CARBNL│ │TAILINGS│  │◄─── (berthed on top deck)
                    │ └──────┘ └────────┘  │
                    │ [CANISTER PORTS ×2]  │
                    └─┬──┬────────────┬──┬─┘
                      ╱  ╲  anchored   ╱  ╲   6 legs, helical + penetrator anchors
           ~~~~~~~~~~~~~~~~~~~~~~~ REGOLITH SURFACE ~~~~~~~~~~~~~~~~~~~~~~~~~
               2 kV tether (≤300 m)            2 kV tether (≤300 m)
                  ╲                                  ╱
              ┌───────┐  dig site A          dig site B  ┌───────┐
              │ROBOT 1│  (skirted)            (skirted)  │ROBOT 2│
              └───────┘                                  └───────┘
         Perimeter dust-sensor masts ×4 at 50–150 m radius (deployed by robots)

     CARRIER/ORBITER in terminator orbit or body-fixed hover, 1–5 km:
     ejecta lidar, stereo imaging, relay, Product Shuttle rendezvous point
```

### 4.4 Process flow

```
 ROBOT DIG (skirted head) ──► SEALED 50 L CANISTER (60–80 kg) ──► DOCKING PORT (airlock-style)
                                                                         │
                         ┌───────────────────────────────────────────────┘
                         ▼
        [FEED HOPPER, forced-feed auger, enclosed]
                         │ 0.78 t/day design
                         ▼
        [CENTRIFUGAL ROLLER MILL] ─► [CLASSIFIER] ─► <2 mm
                         │                           │ oversize recirculated
                         ▼
        [ROTATING MAGNETIC DRUM SEPARATOR, SmCo, ~0.3 g body force]
            │ concentrate (~15% of feed; target ≥80% metal)  │ tailings (~85%)
            ▼                                                 ▼
   ┌────────────────────┐   ┌──────────────────┐     [TAILINGS COMPACTOR → BAGGED
   │ CENTRIFUGAL        │   │ CARBONYL CELL    │      BRICKS, robot-emplaced]
   │ INDUCTION FURNACE  │   │ (≤10 kg/day feed)│
   │ 50 kg batch, 30 kW │   │ CO 1–5 MPa,      │
   │ 1,550–1,600 °C,    │   │ 120–180 °C;      │
   │ Ar backfill ~5 kPa │   │ decompose on     │
   │ ~60 rpm @ r=0.25 m │   │ mandrel 200–250°C│
   └──┬───────────┬─────┘   └────┬───────┬─────┘
      │metal ring │slag annulus  │Fe/Ni  │residue (S, silicates) → tailings
      ▼           ▼              ▼deposit
  [Fe-Ni RINGS ~55 kg]  [SLAG → tailings]  [HIGH-PURITY SHELL/FOIL SAMPLES]
      │
      ├─► in-situ assay (XRF, LIBS, O/S analyser)
      └─► PRODUCT SHUTTLE (≤300 kg/trip) ─► Carrier/Orbiter

  OFF-GAS (S, volatiles, Fe vapour, CO leakage) ─► cold traps + getters + ESP ─► sealed storage
```

**Why centrifugal casting.** In a spinning crucible, the denser metal (ρ ≈ 7.9 t/m³) migrates to the outer wall. Silicate slag (ρ ≈ 2.8–3.3 t/m³) forms an inner annulus. This replaces gravity settling, which is impossible in µg.

The resulting product is a ring of roughly r_in 0.20 m, r_out 0.25 m, height 0.10 m. That is about 7 L, or about 55 kg. A ring is a convenient handling unit for the shuttle and for the receiving node.

At r = 0.25 m, 60 rpm (ω ≈ 6.3 rad/s) gives about 1 g at the wall. A ground test at 120–170 rpm (2–4 g) bounds the 1 g terrestrial perturbation to ≤25–50%.

### 4.5 Why two primary-processing routes (decision at PDR)

Native Fe-Ni in ordinary chondrites is intergrown with troilite (FeS). The Fe–FeS eutectic is at 988 °C, so the melt route will dissolve sulfur into the metal unless the slag chemistry removes it. Above about 0.05–0.1 wt% S, Fe-Ni becomes hot-short and is a poor structural material.

The carbonyl (Mond-type) route leaves sulfur in the residue and yields very high-purity Fe/Ni. It also deposits directly onto mandrels, which may suit thin Phase 1 structures. The cost is a toxic, high-pressure CO loop, which is itself a containment test.

**Recommendation**
- Fly the melt route as baseline: robust and high throughput.
- Fly a carbonyl cell at about 1/10 of furnace throughput as a co-primary experiment.
- Confirm or delete the carbonyl cell at PDR, based on bom-0-11 sulfur-partitioning tests on real meteorite feed and on the Phase 1 purity specification from bom-0-13.

Deleting it saves about $40–80M and about 300 kg. I would not delete it unless ground tests show the melt route reaches S ≤ 0.05% with in-situ slag.

### 4.6 Launch requirement (to bom-0-8)

| Parameter | Requirement |
|---|---|
| Injected mass | ≥25 t (design to 24.8 t CBE; 27 t worst case for Δv-adverse target) |
| Energy | C3 ≥ −2 km²/s², with lunar gravity assist to escape |
| Fairing | ≥7 m-class diameter preferred (SPM stowed ~4.6 m Ø × 9 m) |
| Candidate vehicles | Starship (with refuel), New Glenn (performance TBC); FH-Expendable only if the target allows ≤4 km/s outbound (≈21 t) |
| Fallback | Two launches with LEO/HEO mating (+$100–200M, +risk). Not preferred. |

---

## 5. Technical Specifications

### 5.1 Mass budget

**Surface Plant Module**

| Subsystem | CBE (kg) | Basis |
|---|---|---|
| Primary structure, 6 legs, dampers, anchors | 1,000 | Lander analog; anchor 6 × ~25 kg |
| Surface arrays 75 kWe + 2-axis mast | 900 | ~100 W/kg roll-out array + 150 kg mast/gimbal |
| PMAD incl. 2 kV robot bus, 120 V plant bus | 300 | ~4–5 kg/kW conversion |
| Battery 150 kWh | 900 | ~170 Wh/kg system-level Li-ion |
| Thermal: radiators 60 m², pumped loops | 550 | ~6 kg/m² panel + loops |
| Feed receiving, 2 canister docking ports | 200 | |
| Beneficiation train | 550 | Mill 250, separator 180, classifier/augers 120 |
| Centrifugal induction furnace, casting, slag handling, off-gas | 650 | 30 kW induction PSU ~150 kg; crucible spares ×3 |
| Carbonyl experiment cell | 250 | Pressure vessels, CO inventory 5 kg, decomposer |
| Containment: enclosures, ESP, filters, tailings compactor/bagger | 400 | |
| Verification instruments (XRF, LIBS, O/S analyser, cameras, dust detectors, perimeter masts ×4) | 200 | |
| Avionics, 1.5 m Ka/X HGA, prox-link, GNC | 250 | |
| Harness | 250 | ~4% of dry |
| Landing/hover propulsion (monoprop/cold gas) incl. 150 kg propellant | 250 | 30–50 m/s capability |
| **SPM CBE** | **6,850** | |
| **SPM with 20% margin** | **8,220** | |

**Other elements**

| Element | CBE (kg) | With margin (kg) |
|---|---|---|
| Mining robots ×2 (700 kg each, bom-0-2 design) | 1,400 | — |
| Tethers and reels ×2 | 200 | — |
| **Robots subtotal** | **1,600** | **1,920** |
| Product Shuttle (wet, incl. ~60 kg green monoprop) | — | 500 |
| Earth Sample Return Capsule | — | 50 |
| **Payload total delivered to target** | — | **≈10.7 t** |

**Carrier/Orbiter**

| Subsystem | CBE (kg) |
|---|---|
| Arrays 100 kWe | 1,000 |
| 4 Hall strings + PPUs + gimbals | 800 |
| Propellant tanks (Kr supercritical, I₂ solid) | 1,000 |
| Structure | 900 |
| Avionics, 3 m HGA | 250 |
| Proximity GNC (lidar, cameras) | 100 |
| Ejecta monitoring payload | 100 |
| Thermal | 250 |
| Soft-capture mechanism | 150 |
| **C/O dry CBE** | **4,550** |
| **C/O dry with 20% margin** | **5,460** |

### 5.2 Δv and propellant (rocket equation, Kr Hall at Isp 1,800 s, vₑ = 17.7 km/s)

| Leg | Δv | Mass basis | Propellant |
|---|---|---|---|
| Return | 4.0 km/s | 5.5 t dry + 0.7 t (shuttle + product) = 6.2 t | 1.6 t |
| Proximity operations | 0.3 km/s | ~18 t | 0.3 t |
| Outbound | 5.0 km/s | arrival 18.1 t → departure 24.0 t | 5.9 t |
| Reserve | 10% | | 0.8 t |
| **Total** | | | **≈8.6 t Kr + ~0.5 t I₂ demo string** |

**Thrust and cruise times**
- Thrust at 75 kW to the PPUs, η = 0.60: T = 2ηP/vₑ ≈ 5.1 N.
- Outbound acceleration ≈ 2.1×10⁻⁴ m/s². That is ≈275 days of thrusting, giving 1.5–2 years of cruise with coasts and array power falloff.
- Return acceleration ≈ 6.4×10⁻⁴ m/s². That is ≈75 days of thrusting.

**Target selection requirement (to bom-0-1):** round-trip SEP Δv ≤ 9 km/s; preferred ≤ 8 km/s. Every 1 km/s of outbound Δv costs about 1.5 t of launch mass.

**Propellant choice (relation to D-05).** For the pathfinder I recommend krypton for the mission-critical strings, with one iodine string as an in-flight life test. D-05 governs the production supply line. The pathfinder needs only about 8.6 t, which costs roughly $3–10M at $300–1,000/kg Kr, and it cannot afford a low-TRL thruster on the critical path.

This is a deliberate exception, flagged for owner confirmation. It still feeds D-05 with about 3,000–6,000 h of high-power iodine operating data in deep space.

### 5.3 Power

**Generation**

| Element | Value |
|---|---|
| SPM array | 75 kWe BOL at 1 AU; ~230 m² (≈330 W/m² module-level, 30% cells) |
| SPM array tracking | Sun-tracking about the body spin axis; gives ~50% day fraction vs ~32% average for a body-fixed array |
| Array output at 1.3 AU | ≈44 kW |

**Daytime operating loads**

| Load | Peak (kW) | Daily energy (kWh) |
|---|---|---|
| Furnace (2 × 50 kg batches; 50 kg × 1.3 MJ/kg ÷ 0.6 eff. = 30 kWh/batch) | 30 | 60 + hold ~20 |
| Mill + separator + augers | 5 | 40 |
| Robots via tether (2 × 4 kW) | 8 | 60 |
| Carbonyl cell | 3 | 30 |
| Containment (ESP, compressors, compactor) | 2 | 20 |
| Thermal control | 3 | 50 |
| Avionics, comms, instruments | 1.5 | 36 |
| Battery recharge | 8 | ~100 |
| **Total** | **~55** (furnace scheduled off-peak of robots) | **~420** |

**Storage:** 150 kWh. This sizing assumes:
- a night of 2–5 h for rotation periods of 4–10 h;
- the plant goes to a warm hold at night, keeping the furnace idle above 600 °C;
- 72 h of survival in dust-storm or safe mode at 2 kW.

This is consistent with the agreed 0.5–15 MWh per-site storage band for 0B. The pathfinder tests the "batch by day, hold by night" strategy that 0B is likely to use.

**Robot tether**

| Parameter | Value |
|---|---|
| Voltage | 2 kV DC (mid-band of the agreed 1–3 kV) |
| Delivered power | 5 kW at 2.5 A |
| Conductor | Al, 4 mm², 300 m (600 m loop): R ≈ 4.2 Ω, I²R ≈ 26 W |
| Mass | ≈0.15 kg/m incl. Kevlar strength member and abrasion jacket → 45 kg per tether |
| Data | Power-line comms on the tether + 2.4/5 GHz local wireless backup |
| Test points | 1, 2 and 3 kV, with deliberate 3 kV runs to bound arcing in the charged-dust/photoelectron sheath |

### 5.4 Thermal rejection

- **Waste heat:** ≈50 kW peak, since nearly all electrical input ends as heat.
- **Radiator sizing:** at 350 K and ε = 0.85, two-sided gross emission ≈1,450 W/m². After allowing for asteroid surface IR and solar backload, take ≈850–900 W/m² net. That gives **≈60 m² of panel** (planform), edge-on to the sun.
- **Furnace coil and crucible cooling:** a dedicated 450–500 K loop with its own panel section, to keep the low-temperature loop small.
- **Dust:** electrodynamic dust shield (EDS) electrodes on the radiator and array leading edges. The degradation rate (ε, α vs time) is measured continuously; this is a key 0B input.

### 5.5 Anchoring and stability

- **Gravity:** a 300 m body at 2,000 kg/m³ has GM ≈ 1.9 m³/s², surface g ≈ 8×10⁻⁵ m/s², and escape velocity ≈ 0.16 m/s. The SPM weighs about 0.7 N.
- **Loads:** robot reactions are taken by the robots' own anchors (bom-0-2 scope). SPM anchor loads come from mill and furnace spin-up torques (balanced by counter-rotating pairs), shuttle departure, and tether snatch. The design load is ≤500 N.
- **Anchors:** six legs, each with a helical screw anchor plus a backup penetrator (dual mechanisms for rubble-pile uncertainty). Each anchor is pull-tested in situ to 2 kN, giving ≥4× margin.
- **Fallback:** if anchoring fails, SPM operates "leaning" with low-thrust hold-down using cold gas (limited duration). In parallel, the robots run an excavation-and-containment-only campaign into canisters retrieved by the shuttle. This preserves minimum success (§7).
- **Target constraint:** rotation period ≥ 4 h. Faster spin can put the equatorial centrifugal term above gravity, making the regolith unretained.

### 5.6 Mining robots (requirements on bom-0-2 units)

| Parameter | Requirement |
|---|---|
| Mass | ≤800 kg each, incl. 20% margin |
| Battery | 20 kWh (within the 10–50 kWh agreed band); ≥2 h untethered mobility and safe-mode |
| Excavation | ≥0.5 t/day each, in ≤6 daylight hours |
| Excavation head | Counter-rotating cutters inside a compliant **containment skirt** sealed to the surface (≤1 mm leak gap target) |
| Payload | 2 × 50 L canisters (60–80 kg regolith each at 1.2–1.6 t/m³) |
| Self-anchoring | ≥1 kN reaction capability |
| Tether | 300 m, 2 kV, robot-side reel with tension control |
| Manipulator | 7-DOF, 50 kg payload; ORU replacement on the SPM |
| Autonomy | Dig–fill–seal–transit–dock cycle with no ground intervention |

### 5.7 Containment and verification

**Interim design ceiling, proposed per D-03 and pending bom-0-15 and the licensing state:**
- escaping mass ≤ **1×10⁻³ of mass handled** (≥99.9% containment), all particle sizes;
- no intentional release;
- off-gas: sulfur and CO losses ≤ 1×10⁻³ of inventory per cycle.

The pathfinder is **not** designed to meet the ceiling with margin and stop. It is designed to **measure the achieved loss fraction down to 1×10⁻⁴**, so the licensing state can set a final number from data. This follows ALARP.

**Verification chain**

| Measurement | Instrument | Sensitivity |
|---|---|---|
| Ejecta plume, 10 µm–10 cm | C/O-mounted scanning lidar + high-res stereo cameras at 1–5 km | Mass flux to ~0.1 g/min within 500 m |
| Fine dust flux, >1 µm | Impact detectors on 4 perimeter masts (50–150 m) | Flux to 10⁻⁶ g/m²/h |
| Local deposition | Witness plates, robot-read with microscope camera | Monthly maps |
| Off-gas | Mass spectrometers inside and outside the enclosure | ppm-level leak rates |
| Skirt and port seal performance | Pressure-decay and optical gap sensors | Per cycle |

**Calibration:** controlled tracer releases of known mass and size distribution, with distinctively shaped glass beads, early in the campaign.

**Escape physics:** with v_esc ≈ 0.16 m/s, anything leaving at more than cm/s is effectively lost. This is why ballistic or pneumatic transfer is banned.

---

## 6. Autonomy, Control and Communications

### 6.1 Light-time and autonomy layering

One-way light-time ranges from 0.5 to 20 min, depending on target geometry. Round-trip control is impossible for anything faster than campaign planning.

```
 LAYER            LOOP TIME      WHERE           AUTHORITY
 L0 Reflex        1 ms–1 s       robot/plant     servo, seal, arc-fault trip, crucible breach dump
 L1 Task          1 s–10 min     robot/plant     dig cycle, canister dock, batch melt, ORU swap
 L2 Coordination  min–hours      SPM executive   robot traffic, power scheduling, day/night plan
 L3 Campaign      daily–weekly   GROUND          goals, envelopes, parameter sweeps, test matrix
 ─────────────────────────────────────────────────────────────────────────────────────
 Fault protection: L0/L1 must reach a safe state in ≤5 s on containment breach,
 HV fault, or crucible anomaly; SPM survives ≥72 h in safe mode without ground.
```

**Requirements**
- **AUT-1:** ≥72 h unattended production with both robots, at least 3 times during the campaign. This is the key autonomy TRL 6 evidence.
- **AUT-2:** ground commands are goals and envelopes (e.g., "process 8 canisters at furnace profile B"). No real-time joystick operations.
- **AUT-3:** a hard-wired, ground-commandable kill path independent of flight software, for licensing.
- **AUT-4:** robots detect and avoid tether entanglement and crossing.
- **AUT-5:** onboard anomaly logging at full rate, with prioritised downlink.

### 6.2 Communications

| Link | Terminal | Rate (design) | Notes |
|---|---|---|---|
| C/O ↔ Earth | 3 m Ka/X, ~100 W RF | 2–15 Mbps at 1–1.5 AU (34 m DSN, Ka) | Primary science and engineering downlink |
| SPM ↔ Earth | 1.5 m Ka/X | 0.5–4 Mbps at 1.5 AU | Direct-to-Earth; primary after C/O departs |
| SPM ↔ C/O | S-band / UHF prox-link | 2–10 Mbps | Relay during the primary campaign |
| Robots ↔ SPM | Tether PLC + wireless | ≥10 Mbps | Video for local autonomy only |
| Safe-mode | X-band LGA | ≥50 bps cmd, ≥1 kbps tlm at 2 AU | |

**Data volume:** design for ≥5 GB/day during the campaign. For example, an 8 h pass at ~4 Mbps gives about 14 GB, which leaves margin. The round-1 figure of 2.5 TB/day (~230 Mbps) is rejected, consistent with the re-assessment. Contact need is about 8 h/day during critical phases and 2–4 h/day during steady operations.

bom-0-9 must cost this as procured DSN time or a commercial 18–34 m equivalent. Indicatively that is ~1,500–3,000 h/yr during operations.

---

## 7. Mission Success Criteria

| Level | Criteria | Evidence enables |
|---|---|---|
| **Minimum** | Characterise the target; anchor the SPM (or fallback); excavate ≥5 t into sealed canisters; measure loss fraction against the 10⁻³ ceiling with a floor ≤10⁻⁴; beneficiate ≥1 t; melt and cast ≥100 kg | KDP-0B on Q1, Q2, Q6 (licence); partial Q3/Q4 |
| **Full** | ≥40 t feed; ≥4 t Fe-Ni product; ≥1,000 h cumulative furnace hot time; ≥300 batches; ≥3 × 72 h unattended runs; ≥2,000 h of 2 kV tether operation; ≥3 robotic ORU swaps; product meets interim Phase 1 spec (below); ≥300 kg delivered toward SEL1; 5–10 kg samples to Earth labs | KDP-0B on all Q1–Q8, at TRL 6 no-waiver |
| **Extended** | ≥24 months surface operation; degradation curves (arrays, radiators, seals, crucibles); carbonyl purity route demonstrated at ≥99.5% Fe+Ni | 0B lifetime and spares model (bom-0-14) |

**Interim Phase 1 product specification.** This is a placeholder, to be frozen by bom-0-13 and Phase 1 by pathfinder CDR:

| Constituent | Limit |
|---|---|
| Fe + Ni + Co | ≥98 wt% |
| S | ≤0.05 wt% |
| P | ≤0.05 wt% |
| O | ≤0.2 wt% |
| Delivered form | Cast ring or bar |
| Mechanical | UTS ≥ 300 MPa as-cast after Earth-lab test |

---

## 8. Development Roadmap and Technology Readiness

### 8.1 Critical technologies

"PE" = project-ending at KDP-0B; these need TRL 6 with no waivers.

| ID | Technology | TRL now (est.) | By PDR (bom-0-11) | Pathfinder exit | PE? |
|---|---|---|---|---|---|
| T1 | Anchoring in rubble-pile/weak regolith | 3 | 5 | 6 | **Yes** |
| T2 | µg excavation with containment skirt | 3 | 5 | 6 | **Yes** |
| T3 | Sealed canister logistics and docking ports | 4 | 5 | 6–7 | **Yes** |
| T4 | Gravity-independent comminution + magnetic separation | 3 | 5 | 6 | **Yes** |
| T5 | Centrifugal induction melt/slag separation/casting | 2–3 | 5 | 6 | **Yes** |
| T6 | Off-gas/volatile (S) capture | 3 | 4–5 | 6 | **Yes** (licence) |
| T7 | Containment measurement to 10⁻⁴ | 3 | 5 | 6 | **Yes** (licence) |
| T8 | 2 kV tether power in dusty plasma | 3–4 | 5 | 6 | Yes |
| T9 | Multi-robot/plant autonomy under light-time | 4 | 5 | 6 | Yes |
| T10 | Dust-tolerant radiators and arrays (EDS) | 4 | 5 | 6 | No (0B degradable) |
| T11 | Carbonyl refining in µg | 3 | 4 | 5–6 | Conditional on purity spec |
| T12 | High-power iodine Hall (life) | 4 | 5 | 6 (life data) | No for pathfinder; feeds D-05 |
| T13 | Surface-to-orbit product shuttle and soft capture | 5 | 6 | 7 | No |

**Precursor recommendation (bom-0-11 scope, flagged).** Fly a free-flyer in LEO, about 300–500 kg, to test the centrifugal furnace and the magnetic separator on meteorite-analog feed in true µg, at roughly $60–150M around 2028–29. T5 is the lowest-TRL project-ending item. Discovering a melt-handling surprise after a $2B launch is the worst outcome in the programme.

### 8.2 Schedule

```
            2027   2028   2029   2030   2031   2032   2033   2034   2035   2036   2037
 MCR/SRR    ■■■■
 bom-0-11 TRL4–5  ■■■■■■■■■■■■
 LEO furnace precursor     ■■■■■■■■
 bom-0-1 scouts (target)  ■■■■■■■■■■■■■■■
 PDR                          ◆ (Q2 2029: shortlist ≤3 targets)
 CDR                                ◆ (Q2 2030: target commit, product spec frozen)
 Build / I&T                        ■■■■■■■■■■■■■■
 Launch                                           ◆ (Q4 2032–2033, window-dependent)
 Cruise                                           ■■■■■■■■■■
 Prox ops / landing / commission                            ■■■
 Surface campaign (primary)                                    ■■■■■■■■■
 Interim TRL review → KDP-0B package                              ◆
 C/O return, Earth flyby SRC                                            ■■■■■◆
 SPM extended ops                                                        ■■■■■■■■■■■
```

**Critical path:** target data (bom-0-1) → CDR target commit → launch window. A slip of the scouts slips the pathfinder one-for-one unless the design is target-agnostic within an envelope. The recommended envelope is:
- diameter 150 m–1.5 km;
- rotation period ≥ 4 h;
- free metal ≥ 8 wt%;
- round-trip Δv ≤ 9 km/s.

**KDP-0B evidence timing.** I recommend that KDP-0B can be taken at campaign month 6, after ≥1,000 h cumulative processing and the containment calibration, without waiting for product return. Earth-lab assay arrives about 12–18 months later as confirmation. If the samples contradict in-situ assay, 0B can be paused before major hardware commitment, because 0B long-lead items are the reversible part.

---

## 9. Cost Analysis

### 9.1 Basis

- **Analogies:** OSIRIS-REx (~$1.0B development, ~2.1 t dry); Psyche (~$1.0B incl. launch; ~2.7 t dry; SEP); Gateway PPE (~60 kW SEP, >$0.4B). Commercial lunar landers sit at the low end.
- **Mass-based check:** ≈16 t dry of mostly first-of-kind hardware. At $60–100k/kg (commercial-style, reuse of buses and thrusters) to $150–200k/kg (agency-style, novel), that gives $1.0–3.2B for development and production. I centre at about $110k/kg.
- **Excluded from bom-0-12:**
  - launch (bom-0-8);
  - DSN/ground (bom-0-9);
  - flight ops staffing (bom-0-10);
  - ground R&D, facilities and the LEO precursor (bom-0-11);
  - propellant (bom-0-16);
  - programme contingency and the reflight option (bom-0-17).

### 9.2 bom-0-12 line estimate (FY2026 $M)

| WBS | Element | Low | Point | High | Basis |
|---|---|---|---|---|---|
| 12.1 | PM / SE / MA (≈10%) | 110 | 160 | 230 | Standard wraps |
| 12.2 | Carrier/Orbiter (100 kW SEP bus, 4 strings, prox GNC, capture) | 250 | 340 | 450 | PPE analog, commercial thrusters |
| 12.3 | SPM bus (structure, anchors, power 75 kW, battery, thermal, avionics) | 200 | 290 | 400 | Large lander analog |
| 12.4 | Processing payload (beneficiation, furnace, carbonyl, containment) | 250 | 380 | 550 | First-of-kind; EM + QM + FM |
| 12.5 | Mining robots ×2 flight units + tethers + integration | 80 | 130 | 200 | bom-0-2 design; ~$40–100M per unit |
| 12.6 | Product Shuttle + Earth SRC | 40 | 65 | 100 | Small-spacecraft + Stardust/OSIRIS-REx SRC heritage |
| 12.7 | Verification and ejecta instruments | 40 | 55 | 80 | |
| 12.8 | System I&T, environmental and dusty-vacuum campaigns (facility in 0-11) | 100 | 140 | 200 | Includes dirty-integration handling |
| 12.9 | Mission flight software and autonomy | 100 | 140 | 200 | Multi-agent autonomy is a large FSW job |
| 12.10 | Mission engineering team and analysis (through extended ops) | 50 | 70 | 100 | |
| 12.11 | Pathfinder ORUs and spares (crucibles, liners, filters) | 20 | 30 | 50 | Doubles as 0B maintainability demo |
| | **Subtotal** | **1,240** | **1,800** | **2,560** | |
| 12.12 | Project-held reserve (≈0–25% applied asymmetrically) | 60 | 200 | 440 | |
| | **bom-0-12 total (0A)** | **≈1,300** | **≈2,000** | **≈3,000** | |
| | **0B share** | **0** | **0** | **0** | Extended SPM ops (~$10–25M/yr) carried in bom-0-10 if the 0B site is co-located |

### 9.3 Full-mission view (for decision makers; not double-counted)

| Line | Pathfinder-attributable | Basis |
|---|---|---|
| bom-0-12 (this line) | $1.3–3.0B | Table above |
| bom-0-8 launch | $0.15–0.45B | Single SHLV: ~$150M (FH-E class) to ~$300M+ (refuelled Starship or uncertain pricing); +$0.1–0.2B if dual launch |
| bom-0-9 / 0-10 ground & ops (~5–6 yr) | $0.2–0.35B | $35–60M/yr |
| bom-0-16 propellant | $5–15M | 8.6 t Kr + 0.5 t I₂ |
| bom-0-11 LEO furnace precursor (recommended) | $0.06–0.15B | Free-flyer analog |
| **Full mission** | **$1.7–3.8B** | |

### 9.4 Disagreements with round-2 figures

**Claude ($1.5–4B).** Directionally right. My range is narrower on the high side because launch, ops and propellant are explicitly split out to their own lines. The $4B tail implicitly double-counts those or assumes agency-style $200k/kg throughout.

**Gemini ($1.8–2.5B).** The centre is plausible and close to my $2.0B point. However, a ±16% band on a first-of-kind, TRL-2–3 industrial payload is not credible. Historical cost growth on first-of-kind planetary missions is commonly 30–60%. The band should carry the low confidence everyone agreed it has.

**GPT ($0.6–1.5B hardware + $0.3–0.9B delivery).**
- *Hardware is too low.* $0.6B would buy about 16 t dry at roughly $40k/kg, which is below even commercial GEO-satellite pricing for hardware that includes a novel furnace, robots, an anchored lander and 100 kW SEP. A smaller pathfinder could hit $0.6–0.9B, but only by one or more of:
  - dropping to one robot;
  - deleting product return;
  - shrinking to ~30 kW;
  - flying non-full-scale crucibles.

  Each of these forfeits a TRL 6 claim. That is the wrong trade for a gate whose purpose is no-waiver evidence.
- *Delivery is too high* for a single launch, unless it embeds ops or a two-launch architecture. I recommend designing to one launch.

### 9.5 Cost-reduction levers (ranked by evidence lost per $ saved)

| Lever | Saving | Evidence lost | Recommendation |
|---|---|---|---|
| Delete bulk product delivery to SEL1 (keep SRC) | $20–40M + ~1 t launch mass | Handoff demo only | **Accept if receiving node not ready** |
| Delete carbonyl cell | $40–80M | Purity route (if S problem) | Decide at PDR on ground data |
| Use commercial SEP bus with fewer strings (60 kW) | $50–100M | Longer cruise (+6–9 mo) | Trade at SRR |
| One robot instead of two | $50–80M | Multi-robot autonomy, redundancy | **Reject** |
| Subscale crucible | $30–60M | T5 extrapolation | **Reject** |
| Skip LEO precursor | $60–150M (in 0-11) | Early T5 risk retirement | **Reject** |

---

## 10. Risk Assessment

### 10.1 Top risks

Likelihood (L) and impact (I) are rated 1–5.

| ID | Risk | L | I | Mitigation |
|---|---|---|---|---|
| R-01 | Target not selected by CDR (scout slip) | 4 | 4 | Target-agnostic design envelope; shortlist ≤3 at PDR; launch-period studies for each |
| R-02 | Cost growth (first-of-kind) | 4 | 4 | Project reserve; descope ladder (§9.5); independent cost estimate at each gate; design-to-cost on bus elements |
| R-03 | Launch mass growth beyond single SHLV | 4 | 3 | 20% margin held; target Δv ceiling; carbonyl/bulk-return descopes free ~1.3 t |
| R-04 | µg melt behaviour (wetting, slag entrainment, crucible attack) | 3 | 5 | Gravity-independent design; LEO precursor; 3 spare crucibles; refractory life tests ≥1,000 cycles on ground |
| R-05 | Sulfur cannot be removed to spec via melt route | 3 | 4 | Carbonyl cell; flux trials using in-situ Ca/Mg silicates; early Phase 1 spec freeze |
| R-06 | Containment ceiling not met | 3 | 5 (licence) | Sealed canister logistics; skirt redesign ORU; measurement capability lets the licence be set on data |
| R-07 | Anchoring fails in rubble pile | 3 | 4 | Dual anchor types; in-situ pull tests; hover/hold-down fallback preserving minimum success |
| R-08 | Dust degradation of radiators, arrays, mechanisms, seals | 4 | 3 | EDS, labyrinth seals, robotic cleaning, ORU swap; measure for bom-0-14 |
| R-09 | 2 kV tether arcing or abrasion in dusty plasma | 3 | 3 | Tested to 3 kV; arc-fault trip ≤1 ms; robot battery safe-mode; spare tether |
| R-10 | Regolith metal grade or texture worse than scout data | 3 | 3 | Grade ≥8 wt% in target envelope; separator tunable field and speed |
| R-11 | Autonomy faults cause loss of robot | 3 | 3 | Two robots; conservative envelopes; staged autonomy release during commissioning |
| R-12 | SEP failure in 2+ yr cruise | 2 | 5 | 3+1 strings (any 2 Kr strings complete the mission with schedule loss); Kr for reliability |
| R-13 | Single mission fails, KDP-0B slips 4–6 yr | 2 | 5 | Reflight option (§10.3); partial-success design |
| R-14 | Scope creep into "mini-0B" production | 3 | 3 | Every payload traced to Q1–Q8; owner sign-off on additions |
| R-15 | Licensing for in-space resource processing not in place | 3 | 4 | Engage the licensing state at SRR; pathfinder as first licence case; bom-0-15 lead |

### 10.2 Risk map

```
 Impact 5 |        R-12,13   R-04, R-06
        4 |                  R-05, R-07, R-15   R-01, R-02
        3 |                  R-09, R-10, R-11, R-14   R-03, R-08
        2 |
        1 |
          +----------------------------------------------
             1        2          3                 4       5   Likelihood
```

### 10.3 Reflight option (carried in bom-0-17, not here)

Procure long-lead spares sufficient for a second build:
- crucible and induction PSU;
- mill;
- one SPM structure set;
- PPUs.

The cost is $150–300M. Exercise to a full reflight (+$0.9–1.5B) only on a mission failure. This bounds the KDP-0B slip at about 3 years instead of about 6.

---

## 11. Manufacturing and Integration Considerations

- **Model philosophy.**
  - Carrier: protoflight, using commercial SEP elements.
  - SPM bus: protoflight.
  - Processing payload: full EM → QM → FM. This is first-of-kind and project-critical, and it is the part where test-as-you-fly matters most.
- **Dirty integration.** The processing payload and robots must be tested with simulant and real meteorite-analog material, then cleaned for flight. Design for decontamination: sealed enclosures with bake-out and blow-down ports. Avoid untestable "never-been-dirty" mechanisms.
- **Long-lead and unusual items:**
  - space-rated 30 kW, 10–50 kHz induction power supply (no flight heritage at this power);
  - SmCo magnet assemblies (NdFeB loses coercivity above ~80–150 °C);
  - refractory crucibles (zirconia/alumina/BN-lined; vendor qualification);
  - high-pressure CO components (industrial heritage, space-qualification needed);
  - 2 kV slip rings and tether reels.
- **Commonality.** The PMAD 2 kV bus, canister standard, docking port, and robot ORU interfaces are defined once in bom-0-2, 0-3 and 0-5, and flown identically. A pathfinder-only interface variant requires a waiver.
- **Handling the stack.** The SPM is stowed at ~4.6 m Ø × 9 m, with arrays and radiators folded. A large-fairing launch is needed; this is a design driver tied to R-03.

---

## 12. Open Engineering Questions

1. **Sulfur partitioning.** What S content does melt-route Fe-Ni reach using only in-situ slag? This decides the carbonyl cell, and possibly the 0B process route. Need real-chondrite ground tests by PDR.
2. **Phase 1 product spec.** What composition, form and tolerance does Phase 1 actually require? The pathfinder spec in §7 is a placeholder; it must be frozen by CDR.
3. **Final containment number.** The 10⁻³ interim ceiling needs a debris-environment model of the target's heliocentric neighbourhood and Earth-crossing fraction, plus licensing-state input. Is 10⁻⁴ measurement floor sufficient?
4. **Pathfinder target = 0B target?** I argue yes, for TRL relevance. If the 0B target is unknown at pathfinder CDR, how representative must a surrogate be?
5. **Rubble-pile anchoring.** Is a 2 kN pull-out achievable in low-cohesion regolith? Alternative: net or bag-anchor concepts. The bom-0-1 scouts must return in-situ geotechnical data, so penetrometers on scouts are a recommended requirement.
6. **Night strategy.** Is "batch by day, warm hold by night" the right 0B choice, versus larger storage or thermal storage in the melt? The pathfinder should fly a test matrix covering both.
7. **Iodine exception.** Does the owner accept krypton as the pathfinder's critical-path propellant, with iodine as a demo string, under D-05?
8. **Product return value.** Is bulk delivery to SEL1 worth ~1 t of launch mass and $20–40M if the receiving node (bom-0-13) is not operating by ~2037?
9. **Rotation-period limits.** What is the minimum rotation period at which surface operations remain safe, given centrifugal versus gravitational acceleration?
10. **Tether voltage selection.** Should the 0B system go to 3 kV to cut tether mass? The pathfinder test plan includes 3 kV runs, but the flight baseline is 2 kV for margin.
11. **Crucible life.** Is ≥300 batches per crucible achievable? If not, crucible spares dominate the bom-0-14 mass flow for 0B.
12. **LEO precursor funding.** Will bom-0-11 fund the centrifugal-furnace free-flyer? If not, R-04 likelihood should be raised to 4.

---

## 13. Recommendations to the Owner

1. **Baseline** the three-element architecture (C/O + SPM + 2 robots, plus shuttle and SRC) with the "full-scale units, subscale plant; gravity-independent processes" philosophy.
2. **Carry bom-0-12 at $1.3–3.0B (point $2.0B), 0A only, $0 in 0B.** Show the full-mission view of $1.7–3.8B alongside it, so decision makers see the true commitment.
3. **Fund the LEO centrifugal-furnace precursor** in bom-0-11.
4. **Hold the reflight long-lead option** ($150–300M) in bom-0-17.
5. **Confirm the krypton exception** to D-05 for the pathfinder's critical path.
6. **Set target-selection requirements on bom-0-1 now:** Δv ≤ 9 km/s round trip, rotation period ≥ 4 h, free metal ≥ 8 wt%, in-situ geotechnical data.
7. **Allow KDP-0B to be taken on 6 months of surface data**, with Earth-lab assay as a confirmatory, pause-able checkpoint.