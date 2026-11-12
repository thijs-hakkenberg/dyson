---
bomId: "bom-0-5"
itemName: "Site Power, Arrays and Storage"
itemSlug: "solar-power-arrays"
modelId: "claude-opus-5-5"
modelName: "Claude Opus 5.5"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-5 Site Power, Arrays and Storage (Phase 0B): Technical Proposal

**Status:** Proposal for configuration-control review. Numbers are planning values with stated bases. None is approved.
**Supersedes:** All round-1 and round-2 bom-0-5 material sized for the abandoned 50 kt/yr SEL4/L5 station. That includes the 60–100 MW nameplates, the 15–60 MW_th station heat rejection, and the 200–500 MWh battery bank. Those numbers do not apply to the revised architecture and should be marked superseded.

---

## 0. Summary

| Item | My recommendation |
|---|---|
| **Scope boundary** | Site power only: generation, HV distribution, storage and site power management at the target NEA. **Tug arrays are counted in bom-0-4**, built on a common array-wing product line shared with this item. |
| **Architecture** | Modular 200 kW Site Power Units (SPUs), sized by the target's spin state. **Class P** (polar, vertical tracking masts) is the baseline if the target passes a spin-state screen. **Class E** (two-axis tracking, day-only production) is the fallback. |
| **Site nameplate (BOL, 1 AU AM0)** | **Class P: 2.0 MW** (10 SPUs, N+1). **Class E: 3.8 MW** (19 SPUs, N+1). Envelope 1.2–8 MW across 0.6–2.5 kt/yr. |
| **Delivered EOL power at design distance (1.3 AU)** | Class P ≈ 0.9 MW. Class E ≈ 1.8 MW. |
| **Distribution** | Bipolar **±1 kV DC** (2 kV pole-to-pole) trunk, spines and robot ports. Qualification target ±1.5 kV. Array strings ≤300 V, fully encapsulated. kV exists only inside insulation. |
| **Storage** | Survival and ride-through, not production. **Class P 1.0 MWh; Class E 2.1 MWh.** Envelope 0.6–4.5 MWh. Robot batteries are in bom-0-2. |
| **Delivered mass to NEA** | Class P ≈ 45 t; Class E ≈ 79 t (both including 15% system margin). |
| **0B recurring cost (this line)** | Class P **$0.28–0.78B** (central $0.50B). Class E **$0.47–1.33B** (central $0.86B). Planning P50 **≈ $0.65B**. Excludes launch/transfer, NRE, spares and reserve, which sit in other lines. |
| **0A cost (this line)** | $10–25M: specification ownership, supplier RFIs, ICDs, long-lead options. All development is in bom-0-11; the pathfinder kit is in bom-0-12. |
| **Gate-critical technology** | Anchoring in cohesionless rubble (inside T15) is the item most likely to end the project. Relevant-environment TRL 6 requires a subscale SPU anchored and operated on an NEA by the bom-0-12 pathfinder. |

---

## 1. Design philosophy

1. **Size to signed demand, in 200 kW quanta.** The site nameplate is an output of three things: the bom-0-3 energy balance, the target spin state, and heliocentric distance. It is not an input. The SPU is the procurement unit, so the 0B gate buys N units and nothing more.
2. **Put the arrays where the sun is continuous.** Small asteroids have very large horizon dip. A 15 m mast near the spin pole of a 0.5 km body sees about 14° below the local horizontal. YORP evolution drives many small-NEA obliquities toward 0°/180°: Bennu ≈ 178°, Ryugu ≈ 172°, Itokawa ≈ 178°. A polar mast site therefore gets near-continuous sun on a large fraction of plausible targets. That halves array size and cuts storage by about half.
3. **Storage is for survival, never for production.** No production process may depend on stored energy. Every bom-0-3 process unit must tolerate an uncommanded cold shutdown. Fe-Ni melt freezing in a crucible is a scheduling loss, not a hardware loss. This is the key difference from the abandoned MRE design, where keep-alive drove storage.
4. **kV inside insulation only.** High voltage is needed to make robot tethers and spines light. It must never be exposed to the charged dust, terminator plasma and vented process gas near a small body.
5. **No exotic power in Phase 0.** Beaming, fission and free-flying tethered platforms are rejected (§3.4). Solar-thermal process heat is a bom-0-3 trade I recommend they run (§3.5).
6. **Site follows tug on cell technology.** Tug arrays (10–45 MW across the fleet) dominate total array demand. The site (1–8 MW) rides the same wing product and qualification. bom-0-5 does not run a separate cell programme.
7. **Autonomy sized to the light-time and pass schedule.** The site must protect itself in microseconds, stabilise in milliseconds, dispatch in minutes, and survive 72 h without contact (30 days in safe mode).

---

## 2. Scope, boundaries and the tug-array decision

### 2.1 In scope (bom-0-5)

- SPUs: wings, masts, drives, anchors, string-level MPPT and DC/DC up-conversion.
- Power Management Hub (PMH): switchgear, solid-state circuit breakers (SSCBs), the site power management controller (SPMC), secondary buses, hub storage and hub radiators.
- Power spines (trunk cables) and Power Distribution Nodes (PDNs) with robot tether ports.
- Distributed storage: hub, plant UPS and PDN buffers.
- Seed Power Kit (self-deploying first increment).
- Installation tooling and end-effectors used by bom-0-2 robots to install power hardware.
- Site-level power FDIR software.
- Power-hardware contamination tolerance (dust, iodine, Ni-carbonyl) within the limits set by bom-0-15.

### 2.2 Out of scope (owner shown)

| Excluded | Owner | Note |
|---|---|---|
| Tug solar arrays | bom-0-4 | Common wing product; see §2.3 |
| Robot tethers, reels, onboard 10–50 kWh batteries | bom-0-2 | bom-0-5 supplies ports and protection only |
| Process radiators, thermal storage, furnaces | bom-0-3 | bom-0-5 radiates only its own PMAD and battery losses |
| Water pilot power | bom-0-6 load; SPUs supplied here as a **priced option** (§8.4) | C-type target only |
| SEL1 receiving-node power | bom-0-13 | May reuse the SPU wing |
| Array/PMAD/battery development and qualification | bom-0-11 | Requirements in §7 |
| Pathfinder power kit | bom-0-12 | Requirements in §7.3 |
| Launch to space; transfer to the NEA | bom-0-8; bom-0-4 / bom-0-16 | Mass and volume given in §5 |
| Orbital spares beyond N+1 in place | bom-0-14 | Recommendation in §8.5 |
| Reserve | bom-0-17 | No reserve is embedded in my cost figures |

### 2.3 Tug arrays: counted with the tugs

**Decision: tug arrays are counted in bom-0-4.** The reasons:

- A tug array is an integral part of the propulsion system. Its mass drives the trajectory, its PMAD is coupled to the thrusters, and its qualification is for transit and thruster plume, not regolith and dust.
- Counting them here would make bom-0-5 a 15–50 MW line whose cost is dominated by hardware that never touches the site. That is what inflated the Gemini and GPT round-2 figures (§9).

**Coupling preserved:** one array-wing product line serves two customers. It has one cell and blanket qualification, under T02 in bom-0-11, and one supplier contract with call-off quantities. bom-0-5 holds a site-variant delta specification (dust, rotation-cycle count, low-sun-angle operation, vertical orientation). The site's 1–8 MW is 3–40% of the joint buy, which helps the volume price.

---

## 3. Architecture

### 3.1 Site power classes (selected by target spin state)

| Class | Applicability (screen at target gate) | Array mount | Illumination fraction | Production mode | Storage role |
|---|---|---|---|---|---|
| **P (polar)**, baseline | Principal-axis rotator. Pole within ~15° of ecliptic normal. A polar or high-latitude (≥75°) pad with horizon clearance from a 15–25 m mast. | Vertical wings on a mast rotating once per body rotation (VSAT-derived) | 0.85–0.95 (terrain-shadow model required) | Near-continuous | Fault ride-through, safe mode |
| **E (equatorial/general)**, fallback | Any principal-axis rotator, P = 2.5–20 h | Two-axis gimbal on a 5–8 m mast | 0.45–0.55 | Daylight only | Night keep-alive and ride-through |
| **X** | Tumbling (non-principal-axis), P > 20 h, or no anchorable pad | — | — | **Fail the target gate** for this architecture | — |

I am recommending that **spin state become a formal criterion in the target discriminating gate (D-02)**. Choosing Class E instead of Class P costs roughly +$0.35B and +34 t (§5, §8). That is a better use of a gate criterion than most mineralogical second-order effects.

**Horizon-dip basis.** Dip ≈ √(2h/R). For R = 250 m and h = 15 m, dip ≈ 20°. For R = 500 m and h = 15 m, dip ≈ 14°. At the pole, solar elevation oscillates within ±(90° − obliquity′) over the orbit, where obliquity′ is the pole's angle from the ecliptic normal. A mast whose dip exceeds that amplitude, plus local relief, sees continuous sun. Terrain-resolved shadow modelling from the bom-0-1 shape model is mandatory before the Class P assignment is accepted.

### 3.2 Site layout (Class P)

```
                       ECLIPTIC-NORMAL (spin axis, ~pole)
                                  ^
         SPU ring on polar cap    |      (mast heights staggered 15/20/25 m
     radius ~40-90 m from pole    |       to limit mutual shadowing at low sun)
                                  |
           SPU-3  o        o SPU-4
                \            /
       SPU-2 o---\--[PMH]--/---o SPU-5        PMH = Power Management Hub
                  /  |  |  \                        (switchgear, SPMC, 0.8 MWh,
           SPU-1 o   |  |   o SPU-6                  radiators, plant feeders)
              SPU-10 o  |  o SPU-7
                 SPU-9 o o SPU-8
                     |      |
          plant feeders     |
      [PROCESSING PLANT bom-0-3]  (adjacent, <=150 m; owns its own radiators)
                     |
        ============ SPINE A (±1 kV, ~0.6-1 km) ===========> to mid-latitude mining field
        ============ SPINE B (±1 kV, ~0.6-1 km) ===========> to second mining field
                 |          |          |
               [PDN-A1]   [PDN-A2]   [PDN-A3]    each PDN: 4 tether ports x 25 kW,
                 :          :          :          SSCBs, 25 kWh buffer, fiber hub
              robot      robot      robot         robots on 300-500 m HV tethers
              tether     tether     tether        (tether/reel/battery = bom-0-2)
```

In Class P, robots in a mining field at low latitude, where it may be local night, still draw continuous power from the polar hub. Robot operations become nearly 24/7, which is worth as much as the array saving.

### 3.3 Electrical one-line

```
 SPU (x N+1)                             PMH                                LOADS
+-------------------------+       +-------------------------------+
| Wing A strings <=300 V  |       |  BUS SECTION 1   BUS SECTION 2 |
|   -> MPPT/DC-DC (x4) ---+--+    |  +1 kV ===+====TIE====+=== +1 kV|
| Wing B strings <=300 V  |  |    |  MID  ----|-----------|---- MID |--> Plant feeders (2x, SSCB)
|   -> MPPT/DC-DC (x4) ---+--+    |  -1 kV ===+===========+=== -1 kV|    up to 1.2 MW (P) / 2.2 MW (E)
| roll ring (2 kV, 250 A) |  +====|=> SSCB                  SSCB <=|--> Spine A -> PDN A1..A3
| azimuth drive, anchor   | feeder|                                |--> Spine B -> PDN B1..B3
+-------------------------+       |  Bidirectional DC/DC <-> Li-ion|
                                  |  strings (4 x 0.2 MWh, Class P)|
                                  |  Secondary: 120 V DC (avionics,|
                                  |   heaters), 28 V DC (comms)    |
                                  |  SPMC (dual-string, cross-strap)|
                                  +-------------------------------+
 Grounding: structure and chassis tied to bus MID through high-resistance ground (~100 kOhm),
 continuous insulation monitoring on each pole. No reliance on asteroid "ground"
 (regolith is an insulator).
```

**Why bipolar ±1 kV:**
- Pole-to-structure potential is held at 1 kV, half the pole-to-pole voltage.
- One pole fault leaves the system able to run at half power, with pole isolation.
- It matches the agreed 1–3 kV robot-tether envelope.
- Silicon-carbide (SiC) power devices must be heavily derated for single-event burnout. A ±1 kV bus allows 3.3 kV-rated devices at ≤50% stress, or series-stacked 1.2/1.7 kV devices. A unipolar 3 kV bus would need >6 kV-rated parts with no radiation-tolerant heritage.

**Why strings at ≤300 V:** exposed cell interconnects at kV potential, near a terminator where dust and charging are active, are the most likely arcing failure. The 300 V string limit uses flight-proven SEP-array practice. All interconnects are encapsulated (grouted or coverglass-overlapped).

### 3.4 Alternatives considered and rejected for baseline

| Alternative | Why rejected | What would reopen it |
|---|---|---|
| Orbital microwave or laser beaming to the surface | End-to-end link efficiency in space is undemonstrated. Pointing to a rotating body and the receiver (rectenna) on rubble are both unproven. It adds a second spacecraft type. | A demonstrated >35% DC-to-DC end-to-end link at >100 kW |
| Fission surface power | Phase 0 needs about 1–4 MW; 40 kWe-class units would mean 25–100 reactors. There are licensing and launch-approval burdens, and the D-03 ALARP licensing state is still open. | Phase 1 demand at the 10 MW-plus scale on a non-solar-friendly target |
| Free-flying array platform with power tether to the surface | The body rotates beneath the platform. A tether from a sunward hover point to a surface hub only works with the hub at the pole. In that case, mast arrays at the pole do the same job without station-keeping (~0.5–1 N continuous thrust, ~1 t/yr propellant) or tether-dynamics risk. | A Class X target with a high-value orebody |
| Tug-as-site-power (docked tug backfeeding) | Tugs carrying 1–2.5 MW wings cannot safely operate in contact or near-contact with the surface. Their duty is transit. | Not reopened for Phase 0 |
| Electrochemical storage for night production (Class E) | About 2× array plus 4–8 MWh for roughly 1.6× throughput. Better bought as Class P via target selection, or as more SPUs. | A demand gate that needs more product from a Class E target |

### 3.5 Solar-thermal process heat (recommended trade for bom-0-3, not baselined here)

Induction melting at 35–50% electrical-to-melt efficiency is about 40% of the site's electrical energy (§4). A concentrator furnace (mirror on an SPU-type mast, about 600–900 m² of concentrator for 300 kW_th at 1.3 AU) could remove 0.3–0.5 MW_e from the array requirement. That would be 3–4 fewer SPUs, saving $80–200M.

It belongs to bom-0-3 because the furnace owns it. I ask bom-0-3 to carry it as an 0A trade with a decision before PDR. If accepted, bom-0-5 supplies the mast and drive as a variant SPU structure.

---

## 4. Load basis and sizing

### 4.1 Planning energy balance

These are **placeholders until bom-0-3 publishes its mass and energy balance**. Basis: 1.3 kt/yr delivered (panel centre), 1.4 kt/yr produced, feed-to-product 8:1 (ordinary-chondrite-like metal content with ~70% recovery), giving 11.2 kt/yr feed.

| Step (owner) | Basis | kWh/kg product (range) | Central |
|---|---|---|---|
| Excavation and haul (bom-0-2) | 0.04–0.08 kWh/kg feed × 8 | 0.3–0.6 | 0.40 |
| Comminution (bom-0-3) | 15–40 kWh/t feed × 8 (metal-bearing feed grinds poorly) | 0.12–0.32 | 0.20 |
| Magnetic and size separation | 3–8 kWh/t feed × 8 | 0.02–0.06 | 0.04 |
| Melt and consolidate, induction | Ideal ~0.33 kWh/kg (c_p 0.45–0.65 kJ/kg·K, 250→1,800 K, plus ~0.27 MJ/kg latent); 35–50% efficient | 0.7–1.2 | 0.90 |
| *Alternative: carbonyl (Mond) refining* | Gas handling, reactor heat, compression | *2–5* | *not central* |
| Forming, casting, packaging | — | 0.2–0.5 | 0.30 |
| Process auxiliaries (conveyors, gas, plant thermal) | — | 0.3–0.8 | 0.50 |
| **Process total** | | **1.6–3.5 (carbonyl: 3.5–7)** | **2.34** |

- Process energy: 2.34 kWh/kg × 1.4 Gg/yr = **3.3 GWh/yr**.
- House load, continuous: avionics, communications, PMAD standby, battery and plant survival heaters at 60 kW. Over 8,760 h that is **0.53 GWh/yr**.

### 4.2 Power build-up to nameplate

| Step | Class P | Class E | Basis |
|---|---|---|---|
| Production hours per year | 6,040 | 3,150 | 8,760 × illumination (0.92 / 0.48) × availability 0.75 |
| Process running load | 0.55 MW | 1.05 MW | 3.3 GWh ÷ hours |
| + house load | 0.06 | 0.06 | |
| + night recharge | ~0 | 0.15 | 130 kW × 3 h night (P = 6 h) at 90% round trip |
| × PMAD/distribution losses (1.06) | 0.65 | 1.33 | |
| × process-uncertainty margin (1.25, until bom-0-3 publishes) | 0.81 | 1.66 | |
| ÷ array-side factor (pointing, shadow, dust) | 0.90 → **0.90 MW** | 0.92 → **1.80 MW** | EOL at array, 1.3 AU |
| × distance (1.3²) ÷ (EOL/BOL × thermal gain) | ×1.69 ÷ (0.85 × 1.04) | ×1.69 ÷ (0.85 × 1.04) | III-V; cooler cells at 1.3 AU gain ~4% |
| Required BOL @1 AU | **1.72 MW** | **3.44 MW** | |
| SPUs (200 kW each) + 1 redundant | 9 + 1 = **10 (2.0 MW)** | 18 + 1 = **19 (3.8 MW)** | |

**Design distance.** Full production is specified at 1.3 AU. The site must:
- throttle production to 30% of full load down to 1.7 AU;
- hold survival mode to 2.0 AU, where Class P provides ~0.4 MW EOL, more than enough for house load;
- tolerate 0.8 AU perihelion thermally, which sets wing temperature and MPPT voltage range.

Targets with aphelion beyond 2.0 AU require a specific assessment at the target gate.

### 4.3 Throughput and class envelope

| Delivered product | Process basis | Class P nameplate | Class E nameplate |
|---|---|---|---|
| 0.6 kt/yr | Induction, central | 1.2 MW (6 SPUs) | 2.2 MW (11) |
| 1.3 kt/yr | Induction, central | **2.0 MW (10)** | **3.8 MW (19)** |
| 2.5 kt/yr | Induction, central | 3.4 MW (17) | 6.4 MW (32) |
| 2.5 kt/yr | Carbonyl, high | 5.0 MW (25) | ~8 MW (40) |

**Overall envelope: 1.2–8 MW BOL @1 AU.** This is the number the 0B gate refines.

---

## 5. Technical specifications

### 5.1 Site Power Unit, Class P (SPU-P)

| Parameter | Value | Basis / heritage |
|---|---|---|
| Rated power | 200 kW BOL @1 AU AM0, 28 °C | |
| Wings | 2 per SPU, ROSA-type roll-out blankets, each 10 m × 28 m (280 m²), oriented vertically, extending horizontally from the mast top in a "T" | Blanket and booms: ROSA/iROSA flight heritage. Vertical tracking: NASA VSAT (10–20 kW class, lunar) |
| Cell (reference) | Qualified III-V triple-junction, ≥29.5% BOL AM0, 100–150 µm coverglass. Same product as bom-0-4 | Si alternative allowed if bom-0-4 selects it (§5.6) |
| Array areal power | ~350 W/m² (packing 0.85) | 1,361 W/m² × 0.30 × 0.85 |
| Span / height | ~60 m tip-to-tip; blanket band 15–25 m above pad (staggered between units) | |
| Mast | Deployable truss, 25 m, stowed ≤3 m | Microgravity (~10⁻⁴ m/s²) loads are dominated by deployment and robot contact |
| Azimuth drive | Continuous rotation at body spin rate (2.5–12 h period); ±0.5° pointing | Drive torque <5 N·m (wing inertia ~4×10⁵ kg·m²) |
| Power transfer across rotation | Roll-ring assembly, 2 kV / 250 A, 15-year life | ISS SARJ/BGA roll-ring heritage. SARJ race damage (2007) is the lesson: bearing qualification is on the critical path |
| String voltage | ≤300 V, encapsulated interconnects | |
| SPU converters | 8 × 25 kW MPPT boost to ±1 kV, SiC at ≤50% rated voltage, 97% efficient | |
| Anchor / base | Holding ≥200 N any direction; overturning resistance ≥2 kN·m at pad; compliant mast foot | §6.6 |
| Mass | 1.9 t CBE; **2.3 t with 20% margin** (≈87 W/kg BOL) | Blanket 670 kg, booms 240, mast 300, drive and roll ring 150, base and anchor 250, converters 130, harness 80, thermal 60, avionics 20 |
| Design life | 12 years at site (10 production + 2 margin) | |
| EOL/BOL | ≥0.85 at 12 years, including a design SPE fluence of 1-in-20-year severity | III-V with ≥100 µm coverglass at 0.9–1.7 AU |
| Servicing | Converters, drive and roll ring are robot-replaceable ORUs with a standard bom-0-2 grapple | |

### 5.2 SPU-E (Class E variant)

The SPU-E uses the same wings and converters as the SPU-P. The differences:
- a 6 m mast;
- a two-axis gimbal (azimuth continuous, elevation ±90°);
- a lower base mass.

Mass is **2.2 t with margin**. The SPU-E must be qualified for one thermal cycle per rotation: about 1,500/yr at P = 6 h, ~18,000 over life, inside LEO-array experience. EOL/BOL is ≥0.82 to allow for thermal-cycling and interconnect fatigue.

### 5.3 Power Management Hub (PMH)

| Parameter | Value |
|---|---|
| Bus | Bipolar ±1 kV DC; two bus sections with a tie SSCB; designed to ±1.5 kV insulation class |
| Protection | SSCBs (SiC) on every feeder, spine and storage string. Trip <50 µs on di/dt; coordinated with PDNs |
| Secondary buses | 120 V DC (heaters, plant avionics), 28 V DC (communications, SPMC) |
| Controller | Dual-string SPMC, cross-strapped; radiation-tolerant processors |
| Losses | ~3% of throughput: 60 kW (P) / 120 kW (E) |
| Radiators | Two-sided, 320 K, ε = 0.85. ~120 m² (P) / ~170 m² (E). 0.7 t / 1.0 t |
| Hub structure and electronics mass | 3.0 t (P) / 3.5 t (E), excluding batteries |

### 5.4 Distribution: spines, PDNs and robot ports

| Element | Specification | Sizing check |
|---|---|---|
| SPU feeders | ≤150 m, ±1 kV, 125 A, ≤1% loss | 52 mm² Al per conductor; ~0.12–0.15 t per feeder with insulation and fibre |
| Spines (2) | 0.6–1 km each, 300 kW per spine, ≤4% loss, flat ribbon cable laid and pinned by robots | 105 mm² Al per conductor; ~0.8 t per spine |
| PDNs | 6 (3 per spine). Each: 4 tether ports × 25 kW, SSCBs, insulation monitor, 25 kWh buffer, fibre switch; 0.35 t | |
| Robot tether port | ±1 kV, 25 kW continuous (12.5 A), 40 kW 60 s peak. Blind-mate, dust-tolerant connector with fibre channel | Robot-side 500 m tether with 2 × 4 mm² Al loses ~4%, at ~35–40 kg (bom-0-2) |
| Cable environment | −170 °C to +130 °C surface; UV; micrometeoroids; dust abrasion | Polyimide/fluoropolymer insulation with abrasion jacket; buried or bermed where robots traffic |

### 5.5 Storage

| | Class P | Class E | Basis |
|---|---|---|---|
| Hub storage | 0.8 MWh (4 × 0.2 MWh strings) | 1.95 MWh (6 × 0.33 MWh strings) | P: 4 h × 130 kW keep-alive at ≤70% DoD (rare). E: 6 h night (P ≤ 12 h) × 130 kW at ≤40% DoD per cycle |
| PDN buffers | 6 × 25 kWh = 0.15 MWh | 0.15 MWh | Tether-port ride-through and robot safe-return |
| Plant UPS | Inside hub strings, dedicated feeder | Same | Controlled shutdown of plant |
| **Total** | **~1.0 MWh** (range 0.6–1.5) | **~2.1 MWh** (range 1.2–4.5; upper end for P → 20 h) | |
| Chemistry | Space-qualified Li-ion (NCA/NMC heritage). LFP or LTO as a trade for Class E cycle life | Class E needs ~15,000 cycles at 40% DoD over 10 years. Validate in 0A |
| Pack specific energy | 125 Wh/kg incl. BMS, thermal and structure | Pack, not cell, value |
| Mass | 6.4 t (+0.2 t per PDN set) | 15.6 t | |
| Thermal | 0–30 °C; heaters on 120 V bus | |

**Thermal storage:** not counted here. If bom-0-3 adopts thermal storage for plant warm-keeping, it reduces my keep-alive load. I treat that as an upside, not a credit.

### 5.6 Cell technology position

- **Must-pass screen:** the joint (tug + site) buy must be supplied at the required rate (≥10–15 MW/yr through 0B) with a signed delivery schedule.
- **Selection criterion:** delivered-EOL $/W, evaluated by bom-0-4 for the joint line.
- **Rough delivered trade:** III-V blankets at ~120 W/kg versus silicon at ~80 W/kg differ by ~4 t/MW. At $5–10k/kg delivered to the NEA, that is $20–40M/MW in delivery. Against this, III-V costs $50–80M/MW more in hardware, and silicon needs about 13% more nameplate for EOL.
- **Result:** the trade is close for the site, and the tug answer will dominate. Silicon at very high volume exists in-house at large LEO constellation operators, but not as a merchant supply qualified for interplanetary radiation. That availability question is the real discriminator, and the RFI must settle it.

### 5.7 Mass summary (delivered to NEA)

| Element | Class P (t) | Class E (t) |
|---|---|---|
| SPUs | 23.0 (10 × 2.3) | 41.8 (19 × 2.2) |
| PMH structure and electronics | 3.0 | 3.5 |
| Hub storage | 6.4 | 15.6 |
| PDNs (6, with buffers) | 2.1 | 2.1 |
| SPU feeders | 1.5 | 2.3 |
| Spines | 1.6 | 1.6 |
| Hub radiators | 0.7 | 1.0 |
| Installation tooling and end-effectors | 0.6 | 0.6 |
| **Subtotal (CBE + unit margins)** | **38.9** | **68.5** |
| System margin 15% | 5.8 | 10.3 |
| **Total** | **≈45 t** | **≈79 t** |
| System specific power (BOL @1 AU) | ~44 W/kg | ~48 W/kg |
| Stowed volume (estimate) | ~180 m³ | ~320 m³ |

A single bom-0-4 tug load (150–300 t payload) can carry either site power class together with a large share of the bom-0-3 plant.

---

## 6. Subsystems and interfaces

### 6.1 Seed Power Kit (bootstrap)

The first delivery must power the robots that install everything else, so it cannot rely on them.

- **Contents:** PMH plus 2 SPU-P, pre-integrated on a landing pallet; 0.4 MWh of the hub storage; 1 PDN.
- **Function:** self-anchors, raises the masts, and provides ~400 kW BOL with no robot assistance.
- **Commissioning target:** first power within 10 days of landing.
- The remaining SPUs, spines and PDNs are installed by bom-0-2 robots using bom-0-5 tooling, at a planned rate of 1 SPU per 5–10 days.
- **Reuse:** if the bom-0-12 pathfinder visited the same target, its surviving power kit is integrated as an additional source.

### 6.2 Interface table

| Interface | Counterpart | bom-0-5 provides | Counterpart provides | In BOM? |
|---|---|---|---|---|
| Robot power | bom-0-2 | ±1 kV ports, 25 kW each; protection; fibre data; port location map | Tether, reel, onboard battery, connector mating, power demand forecast | Yes (ports here; tethers in bom-0-2) |
| Plant power | bom-0-3 | Two ±1 kV feeders, up to 1.2 MW (P) / 2.2 MW (E); power-envelope grants; 4 h shutdown energy | Load profile, throttle 30–100%, **cold-shutdown tolerance on all units**, own radiators, emission limits | Yes |
| Plant contamination | bom-0-3, bom-0-15 | Array soiling budget ≤5% of power over life | Vents directed away from SPU sectors; Ni(CO)₄ containment (a carbonyl leak plates Ni onto arrays) | Yes |
| Tug proximity | bom-0-4 | Keep-out map; common wing ICD | No EP plume intersecting the site within 10 km; iodine deposition ≤ limit (iodine attacks Ag/Cu interconnects and connectors) | Yes |
| Water pilot | bom-0-6 | Optional 2–5 SPUs (0.4–1 MW), §8.4 | Load profile | Option only |
| Launch and transfer | bom-0-8, bom-0-4 | 45–79 t, ~180–320 m³, loads specification | Delivery to the NEA hold point and landing | Mass here; cost there |
| Comms | bom-0-9 | 10–20 kbps power housekeeping; event buffers on demand | Link and ground segment | Yes |
| Operations | bom-0-10 | Power-mode procedures, FDIR tables | Ops staffing, planning | Yes |
| Debris | bom-0-15 | Deployment releases nothing >1 mm; anchor ejecta below the bom-0-15 limit. Note: escape velocity is only ~0.5 m/s for a 0.5 km body, so disturbed regolith readily escapes | ALARP ceiling (D-03) | Yes |
| Site data | bom-0-1 | — | Shape model, spin state, pole, terrain shadows, surface strength, dust state | Yes |

### 6.3 Microgrid control: hierarchy and timing

| Layer | Time scale | Function | Located in |
|---|---|---|---|
| L0 Protection | µs–ms | SSCB local trip on di/dt and overcurrent; arc and ground-fault detection; pole isolation | Every SSCB |
| L1 Primary control | ms–s | V-I droop on all sources and storage; MPPT; battery charge/discharge | SPU converters, hub DC/DC |
| L2 Coordination | s–min | Load-shed tiers, bus-section reconfiguration, string balancing | SPMC |
| L3 Planning | h–days | Illumination forecast from shape model and ephemeris; dust/SPE warnings; 24 h power envelope granted to the plant scheduler | SPMC, with Earth uplink |
| L4 Earth | days–weeks | Configuration changes, software updates, anomaly resolution | bom-0-10 |

**Load-shed tiers:**
- T0: SPMC, communications, battery thermal. Never shed.
- T1: plant and SPU survival heat.
- T2: robots (signalled to return to dock on battery).
- T3: process loads.

### 6.4 Autonomy requirements

| ID | Requirement |
|---|---|
| PWR-AUT-01 | The site shall clear any single electrical fault and restore T0–T1 loads without Earth intervention within 60 s. |
| PWR-AUT-02 | The site shall operate without contact for 72 h in production mode and 30 days in safe mode (covers solar conjunction). |
| PWR-AUT-03 | One-way light time up to 20 min shall not affect any control loop. No ground-in-the-loop functions below L4. |
| PWR-AUT-04 | The SPMC shall predict per-SPU power at ≥95% accuracy 24 h ahead from the shape model and ephemeris (Class P terrain shadowing). |
| PWR-AUT-05 | Insulation resistance on each pole shall be monitored continuously. Degradation trend alerts shall be raised before the fault threshold. |

### 6.5 Data and communications

- **Housekeeping:** ~0.5 kbps per SPU; ~5 kbps hub. Total power telemetry about 10–20 kbps, summarised for downlink.
- **Event capture:** 10 kHz waveform capture buffered at each SSCB, downlinked on demand (~1–10 MB per event).
- **Site network:** optical fibre in every feeder, spine and robot tether. This gives galvanic isolation from kV and immunity to discharge EMI. PTP time synchronisation is used for protection coordination.
- **Bandwidth position:** consistent with rejecting the 230 Mbps round-1 figure. The power system needs under 1% of any plausible link.

### 6.6 Anchoring (the dominant technical risk)

**Evidence.** On Bennu, the OSIRIS-REx sampling head penetrated about 0.5 m with negligible resistance. Philae's harpoons failed to fire. Surface strength may therefore be close to zero.

**Loads.** A 2.3 t SPU weighs only ~0.2 N at 10⁻⁴ m/s² surface gravity. Any disturbance above that unseats it. Drive torques are under 5 N·m, but robot contact, deployment snap, thermal snap and outgassing are not small.

**Candidate concepts, all in the bom-0-11 0A trade:**
1. Boulder grip: a clamp or bolt onto a ≥3 m boulder.
2. Ballast-bag skirt: regolith-filled bags packed by robots around a broad base mat. This adds inertia, not weight.
3. Deep helical auger or "root" anchor where there is cohesion.
4. Distributed guy-line web to multiple anchor points.

**Requirement:** ≥200 N holding in any direction and ≥2 kN·m overturning, with a 2.0 factor of safety, demonstrated on the actual body by the pathfinder (§7.3).

---

## 7. Development roadmap and technology readiness

### 7.1 Critical technologies

The "now" column is my TRL assessment, inside the panel envelope.

| ID | Technology (site variant) | TRL now | 0A target (internal) | KDP-0B evidence (TRL 6, relevant environment, no waivers) |
|---|---|---|---|---|
| T02-S | 200 kW vertical-tracking mast wing (VSAT scale-up ×10–20) | 4 | 5: full-scale wing and mast deployment in a gravity-offload rig; partial-scale thermal-vacuum | Subscale SPU on an NEA (pathfinder) plus full-scale deploy/TVAC/rotation life test on the ground |
| T09 | ±1 kV distribution, dust-tolerant connectors, regolith-laid cable, robot tether ports | 3 | 5: plasma-chamber HV test with charged lunar/asteroid simulant dust; connector 1,000 mate cycles in dust | PDN plus tether port operated with a robot on an NEA (pathfinder); 2× voltage margin test |
| T15 | Integrated site generation: anchoring, roll ring at 2 kV/250 A, hub | 2–3 | 4–5: anchor concepts in low-g analogue (drop tower, parabolic, ISS-class experiment); roll-ring life test | **Pathfinder: ≥1 subscale SPU-P anchored and operating ≥6 months / ≥1,000 rotations on an NEA** |
| T20 | Storage and microgrid FDIR (SSCB, droop, SPMC) | 4–5 | 5: hardware-in-the-loop microgrid at ≥200 kW scale with real SSCBs; Class E battery cycle test started | HIL at full bus voltage; flight SSCB proton/heavy-ion SEB test; pathfinder mini-grid flight data |
| — | Rad-tolerant SiC kV converters | 4 | 5: heavy-ion SEB characterisation and derating rule | Converter ORU qualified (TVAC, radiation, EMI) |

### 7.2 Schedule

Y0 is the 0A start.

```
Y0   Y1   Y2   Y3   Y4   Y5   Y6   Y7   Y8   Y9   Y10  Y11  Y12  Y13
|--SRR/RFIs--|
     |--breadboards TRL4--|
               |----EDUs, TVAC, plasma/dust, HIL TRL5----|
                    |--pathfinder kit build (bom-0-12)--|
                                   |--launch/transfer--|--on-NEA ops--|
                                                    KDP-0B (Y8-Y9)
                                                         |--0B SPU production--|
                                                                  |--deliver--|
                                                                    first product Y12-Y13
```

### 7.3 Requirements placed on bom-0-12 (pathfinder)

The pathfinder must carry a power kit of about 4–6 t (costed in bom-0-12, ~$60–150M):

- 1 SPU-P at ~50 kW, with flight-design converters, roll ring and anchor;
- 1 mini-hub with 100 kWh;
- 1 PDN with 2 tether ports, operated with ≥1 tethered robot.

It must operate for ≥6 months. Without this flight, **KDP-0B cannot meet TRL 6 in a relevant environment for anchoring**. Ground analogues cannot reproduce cohesionless low-g regolith with charging. I consider this the single most important cross-item requirement in my scope.

### 7.4 Requirements placed on bom-0-11 (NRE)

These are site-specific items. The shared array-line NRE is costed separately with the tugs.

| Item | Estimate |
|---|---|
| SPU-P and SPU-E development | $60–120M |
| Roll ring | $15–30M |
| kV SSCBs and converters | $30–70M |
| Anchoring | $20–60M |
| HV, plasma and dust test campaigns | $10–25M |
| Battery cycle life | $5–15M |
| SPMC software and HIL | $15–30M |
| **Total (reference only; carried in bom-0-11)** | **$155–350M** |

---

## 8. Cost

All figures are 0B recurring hardware, integration and test. They exclude launch, transfer, NRE, orbital spares and reserve. Rates are planning allowances with no supplier quotations, consistent with the round-2 reviewer note.

### 8.1 Class P (2.0 MW, 1.0 MWh)

| Element | Basis | Low | Central | High ($M) |
|---|---|---|---|---|
| Wings (blanket, booms, deployers) | $30–120/W (agreed hardware envelope); central $75/W | 60 | 150 | 240 |
| Masts, azimuth drives, roll rings, anchors | $4–8M per SPU × 10 | 40 | 55 | 80 |
| SPU converters | $15–40/W | 30 | 50 | 80 |
| PMH (switchgear, SSCBs, SPMC, radiators) | — | 35 | 55 | 80 |
| Storage | $40–120M/MWh × 1.0 | 40 | 70 | 120 |
| PDNs | $3–6M × 6 | 18 | 25 | 36 |
| Cabling and connectors | — | 8 | 12 | 20 |
| Installation tooling | — | 10 | 15 | 25 |
| SE, I&T, production qualification, PM (~15%) | — | 40 | 65 | 100 |
| **Total** | | **281** | **497** | **781** |
| $/W installed (BOL @1 AU) | | 140 | **250** | 390 |

### 8.2 Class E (3.8 MW, 2.1 MWh)

| Element | Low | Central | High ($M) |
|---|---|---|---|
| Wings | 114 | 285 | 456 |
| Masts, 2-axis gimbals, anchors (19 × $3.5–7M) | 67 | 95 | 133 |
| SPU converters | 57 | 95 | 152 |
| PMH | 45 | 70 | 100 |
| Storage (2.1 MWh) | 84 | 150 | 252 |
| PDNs | 18 | 25 | 36 |
| Cabling | 10 | 15 | 25 |
| Tooling | 10 | 15 | 25 |
| SE, I&T, PM | 60 | 105 | 150 |
| **Total** | **465** | **855** | **1,329** |
| $/W | 122 | **225** | 350 |

### 8.3 Line summary

| | Value |
|---|---|
| 0A (this line) | $10–25M |
| 0B, Class P, 1.3 kt/yr | $0.28–0.78B (central $0.50B) |
| 0B, Class E, 1.3 kt/yr | $0.47–1.33B (central $0.86B) |
| **0B planning P50** (assuming ~60% probability the target gate yields Class P) | **≈ $0.65B** |
| 0B upper bound, 2.5 kt/yr, Class E, carbonyl | ~$1.9–2.4B |
| Reference: launch and transfer of 45–79 t (bom-0-8, bom-0-4) | ~$0.1–0.5B, depending on $/kg and tug amortisation |

### 8.4 Priced options

| Option | Content | Cost |
|---|---|---|
| Water pilot power (C-type target only) | +2–5 SPUs (0.4–1 MW) plus 1 PDN | $80–250M |
| Class E night production | ~2× SPUs plus 4–8 MWh | +$0.6–1.2B. **Not recommended**; buy Class P via target selection instead |
| Solar-thermal furnace support (if bom-0-3 adopts it) | Mast and drive variant | ~$10–20M **saving** net of 3–4 SPUs removed |

### 8.5 Spares recommendation for bom-0-14 (not in this line)

| Spare | Quantity |
|---|---|
| SPU converter ORUs | +10% |
| Battery modules | +15% |
| Roll ring | 1 |
| Azimuth drive | 1 |
| Spare PDN | 1 |
| Spool of spine cable | 1 |

Total ≈ 3–5 t, $40–100M.

---

## 9. Where I disagree with the round-2 figures

| Round-2 figure | My position | Why |
|---|---|---|
| **Gemini 50 MW site** | **Reject.** 1.2–8 MW envelope; 2.0 MW (P) / 3.8 MW (E) at 1.3 kt/yr | 50 MW is either a carry-over from the abandoned station or includes tug arrays. A 1.3 kt/yr Fe-Ni site needs ~3–4 GWh/yr. Even the 2.5 kt/yr carbonyl worst case needs ~8 MW. |
| **GPT 35–50 MW total** | Consistent only if it includes the tug fleet (10–18 × 1–2.5 MW = 10–45 MW). Under my boundary, the site is 1.2–8 MW. | The bookkeeping difference needs to be stated explicitly; the engineering may not actually disagree. |
| **Claude 2.5–8 MW site; $0.2–1.2B** | **Broadly agree.** I lower the floor to ~1.2 MW for Class P at 0.6 kt/yr. My cost ($0.28–1.33B) is very close. | The spin-state class lets the floor fall below 2.5 MW. |
| **Gemini $60–100M per MW** | Too low **at the system level** for a 2–4 MW site: I get $120–390/W. It is fine for wing hardware. | At this scale storage, masts, anchors, hub and PDNs are 50–60% of cost. Fixed costs do not scale down with MW. |
| **GPT $30–100/W; agreed $30–150/W "hardware"** | Accept **for wings only**. The site system costs $200–300/W central. | The panel range is an array number. Applying it to a site power system with storage and distribution understates the line by about 2×. |
| **Gemini storage ≤10–15 MWh** | **Reject as baseline.** 1.0 MWh (P) / 2.1 MWh (E); envelope 0.6–4.5 | Storage is survival-only because every process is cold-shutdown tolerant. 10–15 MWh is only justified if Class E with P > 20 h is accepted, and that target should fail the gate. |
| **GPT 1.3–3.3 MWh; GPT $50–140M/MWh** | Agree for Class E. I use $40–120M/MWh. | Same driver (night keep-alive). The slightly lower rate assumes volume pack procurement. |
| **Claude 0.5–3 MWh + thermal** | Agree. Thermal storage moves to bom-0-3 as an upside. | Avoids double-counting with plant thermal mass. |
| **Robot battery 10–50 kWh; 1–3 kV tether** | Adopt ±1 kV (2 kV pole-to-pole); qualify ±1.5 kV | Halves the potential to structure; matches SiC derating limits. |

---

## 10. Risk assessment

| # | Risk | L | C | Mitigation | Residual |
|---|---|---|---|---|---|
| R1 | Anchoring fails in cohesionless regolith (T15) | High | Project-ending | Four-concept 0A trade; pathfinder on-NEA demonstration as a KDP-0B entry criterion; boulder-grip fallback; target screen for anchorable pads | Medium |
| R2 | Target spin state forces Class E (or X) | Medium | +$0.35B, +34 t; or no target | Spin state in target gate; ground-based lightcurve and radar pole solutions before scout commitment | Low–Medium |
| R3 | bom-0-3 process energy above plan (e.g. carbonyl at 3.5–7 kWh/kg) | Medium | +50–100% SPUs | Modular SPU; 25% margin held until bom-0-3 CDR; solar-thermal trade | Low |
| R4 | HV arcing or charging at the terminator, made worse by plant vents and dust | Medium | Architecture change (T09) | ≤300 V encapsulated strings; kV only inside insulation; bipolar bus; insulation trending; plasma-chamber dust test at 2× voltage | Medium |
| R5 | Array soiling: electrostatic dust, robot ejecta, Ni(CO)₄ plating, iodine from tugs | Medium | −5 to −30% power | Mast height; keep-out sectors; plant emission ICD; tug plume exclusion; 5% soiling budget; robot-serviceable wiping trial in 0A | Low–Medium |
| R6 | SiC single-event burnout in kV converters during SPEs | Medium | Converter losses | ≤50% voltage derating; heavy-ion test; ORU spares; N+1 converters per SPU | Low |
| R7 | Roll-ring or drive bearing wear (cf. ISS SARJ 2007) | Low–Medium | Loss of an SPU | Life test at 1.5× rotations; ORU design; N+1 SPU | Low |
| R8 | Class E battery cycle life (~15,000 cycles) | Medium (E only) | Storage replacement | DoD ≤40%; LFP/LTO trade; module spares | Low |
| R9 | Array supply contention with the tug buy | Medium | Schedule | Joint contract; site call-off scheduled ahead of tug peak; Si alternate qualified | Medium |
| R10 | Heliocentric excursion beyond 1.7 AU halts production | Certain (orbit-dependent) | Throughput | Throttle and survival modes specified; operations plan schedules maintenance at aphelion | Accepted |
| R11 | Interface ownership and double counting (tethers, radiators, delivery) | Medium | Budget error | §2.2 boundary table under configuration control | Low |
| R12 | Seed kit fails to self-deploy (no robots yet) | Low–Medium | Site start delayed | Pathfinder heritage; two-mast redundancy within the kit | Low |

---

## 11. Open engineering questions

| # | Question | What settles it | Needed by |
|---|---|---|---|
| Q1 | Actual bom-0-3 kWh/kg for the chosen route (induction or carbonyl), with auxiliaries | Pilot mass and energy balance | bom-0-3 PDR |
| Q2 | Target spin state, pole, terrain shadowing and anchorable pads | Lightcurve and radar, then bom-0-1 scout shape model | Target gate |
| Q3 | Surface mechanical strength and anchor holding on the actual body | Pathfinder anchor test | KDP-0B |
| Q4 | Dust charging and levitation at polar/terminator sites on rubble piles | Pathfinder instruments; lab plasma and dust | KDP-0B |
| Q5 | Can bom-0-3 guarantee cold-shutdown tolerance on every unit? If not, storage grows sharply. | bom-0-3 FMEA | bom-0-3 SRR |
| Q6 | Cell selection for the joint array line, with qualified interplanetary radiation data | Supplier RFI (rate, price, warranty); bom-0-4 trade | 0A mid-term |
| Q7 | Is ±1.5 kV worth taking up for spine-mass savings? | Plasma/dust test margins; SiC device availability | 0A TRL-5 review |
| Q8 | Is a solar-thermal furnace better than induction? | bom-0-3 trade | bom-0-3 PDR |
| Q9 | Is aphelion beyond 2.0 AU allowed for the target set? | Target list; operations policy | Target gate |
| Q10 | How much regolith disturbance from anchoring and cable laying stays within the D-03 ALARP ceiling? | bom-0-15 modelling, using the escape-speed ejecta budget | bom-0-15 SRR |
| Q11 | Is the pathfinder target the same as the 0B target, letting the pathfinder kit join the site grid? | Programme decision | Pathfinder mission selection |

---

**Bottom line.** Site power for an Fe-Ni Phase 0B site is a **2–4 MW, roughly 45–80 t, roughly $0.5–0.9B** system, not a 50 MW one. Its cost is driven by balance-of-system and storage, not by cells. Its fate rests on two things: whether a mast can be anchored to rubble, and whether the chosen target has a usable pole. Both are cheap to learn in 0A, through target spin-state screening and a pathfinder anchor demonstration. Both are very expensive to learn after KDP-0B.