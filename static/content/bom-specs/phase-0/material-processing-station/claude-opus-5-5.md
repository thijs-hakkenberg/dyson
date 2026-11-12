---
bomId: "bom-0-3"
itemName: "Processing Plant at the Target NEA"
itemSlug: "material-processing-station"
modelId: "claude-opus-5-5"
modelName: "Claude Opus 5.5"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-3: Processing Plant at the Target NEA

**Technical proposal for Phase 0B, with the 0A work it depends on**

Prepared for Project Dyson Phase 0 under the 2026 re-assessment baseline (D-01 to D-05). Status: proposal for human review, not a panel decision.

---

## 0. Position in brief

1. **What it is.** One uncrewed, modular refinery anchored on the surface of an S-type NEA. Mine-side beneficiation skids sit at the pit. It ships certified Fe-Ni product in canisters to tugs, bound for the SEL1 receiving node (bom-0-13).
2. **Size is chosen at the gate.** The plant is built from identical **process trains of 0.6 kt/yr nameplate product each**. The reference is 3 trains, giving 1.8 kt/yr nameplate and **1.3 kt/yr annual average delivered** at 72% availability. At KDP-0B, signed Phase 1 demand sets N = 2–6 trains, which covers 0.6–2.5 kt/yr.
3. **Process route.** I baseline a **no-melt carbonyl route** (T06): dry beneficiation, then sequential selective carbonylation, then vapour co-decomposition to Fe-Ni powder or pellets, then an H₂ anneal.
   - This departs from the panel's lean toward partial-gravity melting.
   - Partial-gravity melting in short-arm (5 m) centrifuge cartridges (T07/T23) is carried as the **qualified alternate** to a Route Selection Review (RSR) in 0A.
   - H₂ reduction of oxide FeO (T17) is research-only. It is reactivated only if the confirmed target is L/LL-type with low free metal.
4. **The tailings problem is about 200× larger than round 2 stated.** At a co-located plant the tailings stream is **~18 kt/yr** (range 9–43), not 75–120 t/yr. Containment of that stream (T08) is the licensing-critical design driver. My answer is **face-side beneficiation with direct backfill-and-cap** into the mined void.
5. **Mass:** 264 t dry MEV (225–350) plus ~40 t initial consumables and canisters. That is **~305 t delivered** (240–390), within one to two tug loads.
6. **Power:** **0.85 MWe installed allocation** (0.6–1.1) and **~0.5 MWe average** (0.35–0.7), about 3.4 kWh per kg of product.
7. **Heat rejection:** ~0.65 MW average and ~0.9 MW peak, across three temperature loops. That needs **~950 m² of radiator** (700–1,300) at 6–9 t.
8. **Cost.**
   - 0A (bom-0-3 engineering only): **$80–200M**.
   - 0B (3 trains): **$4.5–9.5B, reference ~$6.8B**, excluding launch, transport, power, robots, spares, operations and risk reserve.
   - I recommend a 50% risk reserve on this item, held in bom-0-17.
   - Relative to round 2: GPT's $3B low end is too low; Claude's $12B high end is too high for this scope.
9. **Gating.** KDP-0B for this item needs these at TRL 6, no waivers, demonstrated on real target material by the bom-0-12 pathfinder: T03 (plant side), T05, the selected refining route (T06 or T07), T08, T10, T19, T21 and T22.

---

## 1. Scope and boundaries

**In scope (bom-0-3):**
- Beneficiation: comminution, classification and magnetic separation.
- Concentrate handling.
- Primary refining (carbonyl trains).
- Product finishing: anneal, granulation, canister forming.
- Product QA and lot certification.
- On-site product storage.
- Product transfer from surface to a tug in stand-off.
- Tailings and residue containment hardware.
- Plant-internal power distribution.
- Plant thermal control and radiators.
- Plant avionics, autonomy software and internal maintenance robotics.
- Plant structure and anchoring.
- Initial process-fluid charge.
- 0A plant engineering through PDR.

**Out of scope, with owners:**

| Function | Owner | What bom-0-3 provides or needs |
|---|---|---|
| Excavation, ROM haul, robot fleet | bom-0-2 | ROM delivered to beneficiation skid hoppers. Robots also run backfill compaction passes (§9). |
| Generation, arrays, storage, HV bus | bom-0-5 | 0.85 MWe allocation; 120 kW night essential load (§8) |
| NEA–SEL1 transport | bom-0-4 | Canisters on a standard pallet at a stand-off rendezvous |
| Launch to space | bom-0-8 | ~16 launch packages of ≤20 t (§13) |
| Technology maturation TRL 2→6 (ground) | bom-0-11 | Demand signal: $0.6–1.4B plant-related (§15) |
| Flight pathfinder | bom-0-12 | Plant payload requirements (§15) |
| Spares flow | bom-0-14 | ORU list; 10–20 t/yr (§11) |
| Containment requirement, budget and verification | bom-0-15 | bom-0-3 owns the physical containment hardware. bom-0-15 owns the ceiling and its verification. |
| Process consumables delivery | bom-0-8 / bom-0-4 | ≤25 t/yr formic acid plus inert gas (§6.4) |
| Comms links, ground stations | bom-0-9 | Data rates (§10) |
| Operations staff | bom-0-10 | Autonomy level (§10) |

**Explicitly not proposed:**
- Any SEL4/L5 station.
- Any rotating module larger than a 5 m cartridge.
- Any MW-class rotary joint.
- Molten regolith electrolysis, Al or Si.
- LOX/LH₂, cryogenics or sunshields.
- Crew provisions. Robotic berthing interfaces and structural reserve are kept, and are not labelled "human-rated".

---

## 2. Design philosophy

1. **Gravity-agnostic before gravity-substitute.** Choose unit operations that do not need body force: gas–solid reactions, forced-feed compression, gas-entrained classification and vapour transport. Use rotation only inside small, sealed devices such as drum separators and phase separators, where rotation is cheap and well understood. Avoid architecture-scale rotation.
2. **Don't melt what you can volatilise.** Melting chondritic metal brings in troilite sulfur (the Fe-FeS eutectic is at 988 °C), slag separation, refractory consumption and 1,800 K handling. Carbonyl chemistry rejects S, Co, P and silicates at the gas-phase boundary.
3. **Size the plant by demand, in modules.** Identical trains let KDP-0B choose N from signed demand (D-01). Common infrastructure is sized for N = 4; skids are added beyond that.
4. **Handle tailings where they are made.** About 88% of mined mass is waste. Never haul it to the refinery.
5. **The package is the product.** Canisters are CVD-formed on site from product and delivered as feedstock, so there is no Earth tare loop after commissioning.
6. **Launch inert, charge on site.** The plant launches with no CO or carbonyls aboard. Process gases come from formic acid, a storable liquid, after arrival.
7. **Everything that wears is an ORU.** Internal ORUs are ≤500 kg, handled by plant manipulators. External ORUs are ≤5 t, handled by bom-0-2/bom-0-14 robots. Nothing is designed for crew.
8. **Autonomy is a safety function, not an ops convenience.** Fault containment never depends on the ground.

---

## 3. Reference target and site

### 3.1 Reference body (for design; the target gate decides)

| Parameter | Reference | Design envelope | Basis |
|---|---|---|---|
| Spectral and meteorite class | S-type, H-chondrite-like | H or L; E-type acceptable | Most common accessible metal-bearing NEAs |
| Diameter | 500 m | 0.3–2 km | Large enough for 12 yr of mining; small enough for low escape velocity |
| Bulk density | 2.0 t/m³ (rubble pile) | 1.5–2.7 | Itokawa ~1.9 |
| Surface gravity | 1.4×10⁻⁴ m/s² | 0.5–5×10⁻⁴ | At 500 m, 2.0 t/m³ |
| Escape velocity | 0.26 m/s | 0.1–0.9 m/s | — |
| Free metal in ROM | 10 wt% | 6–15 wt% | H chondrites have ~15–19 wt% metal; ~10% assumed recoverable at the mineable size fraction |
| Metal composition | Fe 90, Ni 9, Co 0.45 wt% | Ni 6–12 | Kamacite + taenite average |
| Troilite | 5 wt% | 3–8 | H-chondrite norm |
| Rotation period | 6 h | 3–20 h | Sets night length and storage (bom-0-5) |
| Surface temperature | 380 K day, 180 K night | 150–400 K | At ~1 AU |

### 3.2 Target acceptance criteria (proposed interface to bom-0-1)

This addresses reviewer note 5. The plant can be designed only against a target that meets all of the following:

| ID | Criterion | Threshold | Measurement |
|---|---|---|---|
| TA-1 | Free (magnetic) metal, ROM <100 mm | ≥6 wt% (design 10) | In-situ sampling + magnetic fraction; GRS/NS |
| TA-2 | Metal grain D50 in regolith | ≥50 µm | Microscopy of scout samples |
| TA-3 | Metal Ni content | 5–15 wt% | XRF/LIBS on magnetic fraction |
| TA-4 | Troilite | ≤8 wt% | XRD / S assay |
| TA-5 | Carbonaceous or hydrated content | ≤0.5 wt% C | Prevents CO-poisoning surprises; flags C-types to bom-0-6 |
| TA-6 | Mineable regolith inventory | ≥0.5 Mt within 300 m of one site, ≥2 m deep | Radar / seismic / trenching |
| TA-7 | Lateral heterogeneity in TA-1 | ≤±30% (1σ) over mine area | ≥20 distributed samples |
| TA-8 | Night length at chosen site | ≤6 h (or polar site with ≥70% insolation) | Spin state; sizes bom-0-5 storage |
| TA-9 | Anchoring | ≥20 kN pull-out per anchor at the plant pad | Scout / pathfinder pull test |

If the target is L/LL-type (free metal 2–6%), the ROM:product ratio exceeds 35:1. In that case T17 (oxide reduction) moves from research to architecture change, and the gate re-opens.

### 3.3 Site layout (reference, N = 3)

```
                       sun (varies with rotation)
                              |
   TUG STAND-OFF  <-- 2-5 km, thrusters off during transfer, plume keep-out >= 5 km -->
        ^
        | product lighter (catapult-assisted, <=1 m/s)
        |
  +-----+-------------------------------------------------------------+
  |  PRODUCT TRANSFER PAD      PLANT CORE (anchored truss, ~60 x 45 m) |
  |  [catapult][catch arm]     +-------------------------------------+ |
  |        |                   | Hall A: Carbonyl trains 1-3         | |
  |  PRODUCT YARD (racks,      |  (18 reactors, gas loop, compress.) | |
  |  <=600 t canisters) <------| Hall B: Decomposers, anneal, CVD    | |
  |                            |  canister former, QA lab, packaging | |
  |                            | Avionics vault | Power distribution | |
  |                            +-------------------------------------+ |
  |   RADIATOR FIELD (vertical panels, >=3 m above surface, ~950 m2)   |
  |   RESIDUE STORE (caged, segregated; PGM-enriched)                  |
  +------------------^--------------------------^----------------------+
                     | sealed concentrate        | HV bus + fibre (bom-0-5)
                     | containers, ~6.3 t/day    |
  +------------------+------+     100-500 m     +---------------------+
  | BENEFICIATION SKID 1    |                   | ARRAY FIELD (bom-0-5)|
  | at Pit A face           |                   +---------------------+
  | ROM -> HPGR -> classify |
  | -> drum magnetic sep    |
  | tailings -> enclosed    |
  | conveyor -> backfill    |
  +-------------------------+
  | BENEFICIATION SKID 2 (Pit B, relocatable every 1-2 yr)            |
  +-------------------------------------------------------------------+
     Mining robots (bom-0-2), 1-3 kV tethered, feed skids within <=150 m
```

---

## 4. Product specification (Phase 1 tie-in)

This is proposed as the controlled interface to bom-0-13 and Phase 1. It must be countersigned by the customer before KDP-0B.

| Property | Grade CF-1 (baseline) | Grade CF-2 (option) | Basis |
|---|---|---|---|
| Form | Annealed granules 2–10 mm in sealed canisters | Powder D50 3–8 µm (AM / powder-metallurgy feed) | Inco-pellet and BASF carbonyl-iron-powder heritage |
| Ni | 5–10 wt%, set per lot ±0.5 | 0–50 wt% on request | Vapour blending of Ni(CO)₄ / Fe(CO)₅ streams |
| Co | ≤0.1 wt% | ≤0.1 | Co carbonyl forms slowly at the operating pressure; Co reports to residue |
| C | ≤0.03 wt% | ≤0.05 | After H₂ decarburisation (as-decomposed is ~0.5–1%) |
| O | ≤0.15 wt% | ≤0.2 | H₂ anneal |
| S, P | ≤0.005, ≤0.01 wt% | same | Rejected at the gas phase |
| Lot | 20 t, certified; 1 t canisters | 0.5 t canisters | — |
| Canister | CVD Fe-Ni shell, 1.5 mm wall, ~25 kg, counted as product | same | "The package is the product" |
| Certificate | Composition by inline LIBS + XRF, inert-gas-fusion O/N, combustion C/S; density; PSD; digital lot passport | same | — |

**Uses at SEL1:**
- Melting or forging feedstock.
- Powder-metallurgy or additive-manufactured structural parts.
- Radiation shielding and ballast.
- Soft-magnetic cores. Carbonyl Fe is an industrial magnetic-core powder, a plausible Phase 1 power-electronics use.

**Not supplied:** PV, semiconductors, Al, Si or oxygen.

---

## 5. Process route selection

### 5.1 Candidate routes (my scoring; weights in brackets)

| Criterion [weight] | R1 Carbonyl no-melt (T06) | R2 Partial-g melt, 5 m centrifuge (T07/T23) | R3 Solid-state consolidation of concentrate only | R4 H₂ reduction (T17) |
|---|---|---|---|---|
| Gravity dependence [15] | Very low (small rotary separators only) | Needs 0.1 g on the rotor | Low | Low |
| Product purity vs. spec [20] | High: S, P, Co, silicates rejected | Low–medium: troilite S 0.2–1% without CaO flux import | Very low: 30% gangue | Medium |
| Energy [10] | ~3.4 kWh/kg product | ~3–5 kWh/kg + refractory | ~1 kWh/kg | 10–20 kWh/kg incl. electrolysis |
| Terrestrial heritage of chemistry [15] | High: Inco carbonyl Ni since 1902; BASF carbonyl Fe powder | High for melting; none for centrifuge slag tapping | Medium | High for H₂-DRI |
| Max temperature, materials [10] | ≤700 °C (anneal) | ≥1,550 °C, crucible cartridges | ~1,100 °C | ~1,000 °C |
| Consumables from Earth [10] | CO / H₂ make-up ≤25 t/yr (formic acid) | Crucibles + CaO flux, 30–80 t/yr | Little | H₂ make-up, electrolysers |
| Hazard / contamination [10] | Toxic, photo-decomposing carbonyls; must be zero-vent | Molten metal, splash, outgassing | Low | H₂ leaks |
| Failure mode recoverability [10] | Batch; reactor can be isolated | Frozen-melt cartridge loss | Benign | Benign |
| **Weighted (0–10)** | **7.4** | **5.6** | 3.8 (fails purity) | 3.5 (fails energy) |

**My position.** R1 is the baseline and R2 the alternate. Both are carried to TRL 4–5 until the **Route Selection Review (RSR, ~2029/30)**. Only the selected route is taken to TRL 6. Once selected it becomes project-ending, so no waiver is allowed at KDP-0B.

**R1's critical unknown, and the reason R2 is kept alive:** carbonylation kinetics and CO-loss rate on real meteoritic kamacite/taenite concentrate at ≤10 MPa. Asteroid metal surfaces are unoxidised and troilite-bearing, and sulfur is a known carbonylation promoter. Both should help, but neither has been demonstrated at relevant scale on relevant feed.

**R1 falsifiers:**
- Fe extraction <70% in 72 h at 10 MPa and 200 °C on ≤1 mm concentrate.
- CO loss >1% of circulated CO.
- Product C >0.1% after anneal.

**Why R2 has lower purity.** Magnetic separation does not remove troilite intergrown with metal. In a melt, FeS dissolves into the Fe-Ni, and desulfurising needs a basic slag. Chondrites carry only ~1.8 wt% CaO, so the slag needs imported CaO or yields structurally inferior metal. I flag this as the single strongest argument against making partial-gravity melting the baseline. The other panel members did not address it.

### 5.2 Why the 50 m rotating arm stays dead

Even if R2 is selected, I follow Claude's geometry:
- 5 m arm at 4.2 rpm for 0.1 g.
- 8–25 t per cartridge.
- On-rotor power ≤0.3 MW through a rated slip ring.

The 50 m figure is a human-comfort heuristic with no process basis. It also creates the MW rotary-joint development (Gemini's $150–250M) that the uncrewed architecture does not need.

---

## 6. Process architecture (baseline R1)

### 6.1 Process flow diagram

```
 ROM (<=100 mm, sealed robot containers, assay-tagged)
   |
   v   ===== BENEFICIATION SKID (x2, at the pit; T05, T19) =====
 [Receiving bin, piston feeder] -> [Scalper 25 mm] --oversize--> [Jaw/roll crusher, forced feed]
   |                                                                |
   v                                                                v
 [HPGR, 1.5-3 kWh/t] <---------------------------------------------+
   |
   v
 [Closed-loop gas classification: N2/Ar at 30-50 kPa, cyclones, sintered-metal filters]
   | <1 mm                        >1 mm -> back to HPGR (circulating load ~150%)
   v
 [Rotary drum magnetic separator x3 (rougher / cleaner / scavenger), drum 0.6 m, rim 1-2 g]
   |  concentrate (70% metal)          | non-magnetic tailings (~88% of ROM)
   v                                   v
 [Sealed concentrate containers]     [Enclosed screw conveyor -> backfill compactor -> cap]
   |  ~6.3 t/day (ref)
   v   ===== REFINERY (plant core) =====
 STAGE 1 Ni carbonylation: 0.1-0.5 MPa, 50-80 C -----> Ni(CO)4 vapour ---+
   |  (same reactor, sequential)                                         |
 STAGE 2 Fe carbonylation: 5-10 MPa, 150-200 C ------> Fe(CO)5 ----------+
   |  48 h reaction + 12 h load/purge/eject; piston-confined packed beds |
   v                                                                     v
 [Residue: silicate + troilite + Co + PGM] -> briquette -> RESIDUE STORE   [Condensers + rotary phase separators]
                                                                          |  liquid carbonyl buffer tanks
                                                                          v
                                       [Vapour blender: set Ni %] -> [DECOMPOSERS 250-300 C, 0.1-0.5 MPa]
                                                |                       |                  |
                                     CO (+ trace CO2) <-------+    powder/pellet       CVD on heated mandrels
                                                |             |         |                  | (canister shells)
                       [CO cleanup: CO2 + C -> 2CO (900 C); CH4 -> C + 2H2]               |
                                                |             |         v                  v
                       [Compressors -> 5-10 MPa] -> back to Stage 2   [H2 ANNEAL 550-700 C: C->CH4, O->H2O]
                                                                         |
                       [Formic acid make-up: HCOOH -> CO + H2O | CO2 + H2] |
                                                                         v
                                                [Granulate / screen -> fill CVD canister -> seal -> QA -> 20 t lot]
                                                                         |
                                                                         v
                                                          PRODUCT YARD -> LIGHTER -> TUG
```

### 6.2 Reference mass balance (N = 3, annual average)

| Stream | t/yr (ref) | Range | Notes |
|---|---|---|---|
| ROM to skids | 20,100 | 10,800–45,000 | Free metal 10% (6–15) |
| Concentrate | 2,300 | 1,600–3,100 | Beneficiation recovery 80% (70–90), grade 70% (55–85) |
| **Tailings, beneficiation** | **17,800** | **9,200–43,000** | Backfilled at the pit (§9) |
| Metal carbonylated | 1,370 | — | Extraction 85% (75–92) |
| Carbonylation residue | 930 | 650–1,300 | Segregated, caged; PGM-enriched (~10–30 ppm, illustrative) |
| Finishing loss / off-spec not recycled | 70 | 40–120 | Yield 95% (92–97) |
| **Product delivered to tugs** | **1,300** | **N-dependent: 0.6–2.5 kt** | 72% plant availability |

- ROM:concentrate ≈ 8.7:1. This sits inside Claude's 5–15:1.
- ROM:product ≈ 15.5:1, range 8–35:1.
- GPT's ~33:1 is my low case. I agree with GPT that the factors must move together. The range above comes from correlated low-low-low and high-high-high cases, not mixed extremes.
- **Flag to bom-0-2:** the fleet must deliver **~55 t/day ROM average** (30–125). This is far above the 0.2–1 kt/yr feed assumed for the abandoned station. Face-side beneficiation keeps the haul to ROM only, over ≤150 m.

### 6.3 Unit sizing (per train unless stated)

| Unit | Qty (N = 3) | Size / rating | Mass (each) | Basis |
|---|---|---|---|---|
| Beneficiation skid | 2 (each 60% of N = 3 load) | 2.5 t/h ROM nameplate | 18 t | 20.1 kt/yr ÷ 0.70 utilisation ≈ 3.3 t/h; 50% margin |
| HPGR (per skid) | 1 | 0.5 m rolls, 2.5 t/h, 15 kW | 5 t | Compressive breakage works on forced feed; ductile metal flattens, aiding liberation |
| Drum magnetic separators (per skid) | 3 | 0.6 m dia, NdFeB, rim 1–2 g | 0.4 t | Centrifugal force replaces gravity for non-magnetic ejection |
| Carbonylation reactors | 6 per train (5 active + 1 standby), 18 total | 0.5 m³ bed, 0.65 m ID, design 10 MPa / 220 °C, piston-confined | 1.2 t | 2.9 t/day concentrate per train; 60 h cycle; 1.75 t/bed |
| CO compressors | 4 plant-wide (3 + 1) | 0.05 kg/s each, 0.2→7 MPa, 4-stage | 1.5 t | 3.2 kt/yr CO circulated |
| Decomposers | 2 per train | 0.6 t/day each, 250–300 °C | 2.5 t | 1.64 t/day product per train nameplate |
| H₂ anneal furnaces | 1 per train | 2 t/day, 550–700 °C | 2 t | — |
| CVD canister former | 1 plant-wide | 4 mandrels, ~0.25 mm/h deposition, ~3 canisters/day | 4 t | ~1,300 canisters/yr |
| Product lighters | 2 | 20 t payload, cold-gas (N₂) terminal thrusters | 3.5 t dry | ~65 loaded trips/yr |

**Materials note.** CO at pressure attacks Fe and Ni walls and forms carbonyl. All wetted surfaces at 50–220 °C must be **Cu-lined or high-Cr stainless**, never Ni alloys. This follows Inco and BASF practice and is a design rule, not an option.

**Microgravity note.** Fe(CO)₅/Ni(CO)₄ separation by distillation is avoided. Ni is pulled first at low pressure and Fe second at high pressure, and the vapours are re-blended for alloy. Where phase separation is needed (condensers), the design uses ISS-heritage rotary separators. A rotating-packed-bed ("HiGee") column is the fallback.

### 6.4 Process-fluid closure and Earth make-up

| Loop | Inventory | Closure mechanism | Make-up requirement | Make-up from Earth |
|---|---|---|---|---|
| CO | 12 t | Boudouard C and CO₂ re-formed (CO₂ + C → 2CO at ~900 °C); CH₄ from anneal cracked to C + 2H₂ | **≤0.3% of circulated CO** (≤10 t/yr). Goal 0.1%. | ≤16 t/yr HCOOH (dehydration route) |
| H₂ | 0.3 t | Recovered from CH₄ cracking; product O leaves as H₂O, cracked in a ~2 kW electrolysis cell | ≤1 t/yr | ≤23 t/yr HCOOH (dehydrogenation route), or equivalent |
| Classifier gas (N₂ or Ar) | 1.5 t per skid | Sealed loop; filters | ≤2 t/yr | Ar synergy with alternate EP propellant (D-05) |
| **Total consumables** | — | — | — | **≤25 t/yr** (10–40), outbound on tugs |

Formic acid is chosen because it is a storable liquid at ambient temperature, non-cryogenic, and can yield CO or H₂ depending on catalyst. It also means no CO or carbonyl is ever launched.

The 0.3% loss ceiling is a cost-driven requirement. At a delivered cost of ~$3–8k/kg to the NEA, each 1% of CO loss costs about $100–270M/yr.

---

## 7. Subsystem specifications

### 7.1 Beneficiation skids (T05, T19): 2 units, relocatable

- **Envelope and mass:** 12 × 4.5 × 4.5 m stowed. Anchored on four legs with helical anchors. 18 t CBE each.
- **Enclosure:** dust-tight, pressurised to 30–50 kPa with N₂/Ar. The gas makes classification possible and gives a pressure-differential leak check.
- **Comminution:** target P80 ≤ 500 µm, set by H-chondrite metal grain size and liberation.
  - Energy 8 kWh/t ROM (3–15). Regolith-dominated feed is at the low end; coherent boulders at the high end.
- **Separation:** three drum stages.
  - Design point: 80% recovery at 70% grade.
  - Online magnetic susceptibility and LIBS sampling on both concentrate and tailings at 1 Hz.
- **Relocation:** every 1–2 yr as the pit advances, moved by bom-0-2 robots with tether re-routing by bom-0-5. Downtime ≤10 days per move.
- **Skid power:** 35 kW nameplate each, at 1–3 kV from the robot/site bus, converted on the skid.

### 7.2 Concentrate logistics

- Sealed 1 t containers, standardised with the bom-0-2 ROM container interface.
- About 6.3 t/day, carried 100–500 m by robot or a tethered cart.
- Plant-side buffer: 7 days (~45 t). This decouples refinery cycles from mining and skid moves.

### 7.3 Refinery Hall A: carbonyl trains (T06)

- **Hall structure:** 30 × 20 × 8 m enclosed truss with MLI and a dust skin. Not pressurised. Each pressure system is its own containment.
- **Containment:** three-barrier gas design.
  1. Pressure boundary.
  2. Guard jacket with sniffing, on all carbonyl-wetted lines.
  3. Hall-level cold-trap scrubber (−40 °C) on any relief path.
- **Zero intentional release:** no carbonyl vent to vacuum under any fault. Relief goes to a dump tank sized for the full inventory of the largest train.
- **Control:** each reactor is an isolatable batch unit. A failed reactor is valved out, purged to the gas loop, and swapped as an ORU of ~1.2 t by the external robot through a hall hatch.

### 7.4 Refinery Hall B: decomposition, finishing, QA, packaging (T22)

- **Decomposers** run in free-space powder mode or seeded-pellet mode. Product is collected by gas-flow cyclones and sintered-metal filters, which do not depend on gravity.
- **CVD canister former:** Fe-Ni shells on heated split mandrels.
- **QA laboratory:** LIBS, XRF, inert-gas-fusion O/N, combustion C/S using O₂ from the anneal-water electrolysis cell, laser PSD and gas pycnometer. A retained-sample library of 1 kg per lot is shipped to SEL1 for independent re-assay.
- **Packaging:** granules are fed by vibratory/pneumatic feed into canisters, which are electron-beam or friction-stir lid-sealed and serialised.

### 7.5 Product yard and transfer (interface to bom-0-4)

- **Yard capacity:** 600 t. That is two 300 t tug loads, about 5.5 months of output at N = 3, covering synodic or tug-schedule slips.
- **Lighter operations:**
  - The tug parks at a 2–5 km stand-off with EP off. Iodine plume deposition on radiators and QA optics is a contamination hazard (D-05).
  - A surface electric catapult (10 m stroke) tosses a loaded lighter at 0.3–0.6 m/s, below escape velocity.
  - The lighter uses cold-gas thrusters only for terminal rendezvous, away from the surface.
  - On return, a capture arm catches it. Thrusters fire only away from the surface.
  - Δv per round trip is ≤1.5 m/s, about 40 kg N₂ per trip and ~3 t N₂ per year. That N₂ is included in the consumables envelope.
- **Why not land the tug:** a 300 t pallet weighs ~40 N at the reference body, so a 2 MWe tug could lift it. But its plume would loft regolith, which is a direct T08 violation.

### 7.6 Alternate R2 configuration (if selected at RSR)

- Four centrifuge cartridges on 5 m arms at 4.2 rpm (0.1 g).
- 150 kW induction per cartridge; 200 kg concentrate per batch.
- Slag decant by tilt; sealed ingot moulds.
- On-rotor power ≤0.3 MW total through a rated slip ring.
- CaO flux import 30–80 t/yr.
- Mass delta about +25 to +60 t versus R1. Product limited to melt feedstock, with S up to 0.3%, unless flux is imported.

---

## 8. Power and thermal budgets

### 8.1 Electrical load (N = 3)

| Load | Nameplate (kW) | Annual avg (kW) | Night essential (kW) |
|---|---|---|---|
| Beneficiation skids (2) | 70 | 50 | 10 (thermal keep-alive) |
| Carbonylation heat + thermal maintenance | 20 | 15 | 15 |
| CO compression | 105 | 75 | 20 (reduced) |
| Decomposition (3 trains, incl. losses) | 300 | 215 | 30 (hot standby) |
| CO regeneration / CH₄ cracking | 25 | 18 | 0 |
| H₂ anneal | 45 | 32 | 15 |
| CVD canister forming, packaging, QA | 20 | 15 | 5 |
| Product transfer (catapult and lighter charging) | 10 | 4 | 0 |
| Thermal control pumps and heaters | 30 | 25 | 15 |
| Avionics, compute, local network | 15 | 15 | 10 |
| Internal robotics | 60 (peak) | 20 | 0 |
| **Total** | **~670 (+ peak margin → 0.85 MWe installed allocation; range 0.6–1.1)** | **~485 → 0.5 MWe (0.35–0.7)** | **~120** |

- Energy per product: ~3.3 kWh/kg (2–6). Per concentrate: ~1.9 kWh/kg, consistent with GPT's proposed ≤2 kWh/kg gate.
- A mechanical-vapour-recompression heat pump that lifts carbonylator exotherm (~76 kW per train at 180 °C) to decomposer temperature could cut ~120 kW. It is carried as an option, because of the added rotating machinery.
- **bom-0-5 storage implication:** 120 kW × 3 h night (reference 6 h rotation) ≈ 0.4 MWh, plus 30% margin, so ~0.5 MWh for the plant. Carbonyl reactors ride through on their own thermal mass. Over a 6 h night, decomposers and anneal idle. This sits at the bottom of the 0.5–15 MWh band.
- **Rejected:** Gemini's 2.2 MWe follows from MRE and multi-stream scope, which is now outside the accepted scope.

### 8.2 Heat rejection (T03, plant side)

Waste heat equals electrical input plus reaction exotherm: ~0.67 MW + ~0.23 MW ≈ **0.9 MW peak, ~0.65 MW average**.

| Loop | Temp | Duty (kW peak) | Technology | Effective flux | Area |
|---|---|---|---|---|---|
| LT | 300–320 K | 180 | Pumped single-phase loop, body-mounted panels | ~450 W/m² | 400 m² |
| MT | 400–430 K | 300 | Ti/water heat-pipe panels on a pumped water loop (~5 bar) | ~1.8 kW/m² | 170 m² |
| HT | 500–700 K | 100 | Direct radiating furnace jackets + small panels | ~3 kW/m² | 35 m² |
| Skids (×2) | 310 K | 70 | Skid-integral panels | ~450 W/m² | 155 m² |
| **Total + 25% margin** | — | **~650 → design 900** | — | — | **~950 m² (700–1,300); 6–9 t** |

**Effective flux assumptions:**
- Two-sided vertical panels, ε = 0.85, ≥3 m above surface, edge-on to the sun where geometry allows.
- Degradation for hot-ground view factor in daytime (surface ~380 K), fin efficiency 0.7, and dust accumulation of 5% end-of-life.

**AD² note:** plant-side T03 is easier than tug-side T03. Temperatures are moderate and heat-pipe panel heritage exists. My plant-side AD² is 4–5. The tug's MW-class lightweight radiators remain the hard case (bom-0-4).

---

## 9. Tailings, residue and particle containment (T08)

**Scale.** About 17.8 kt/yr of <1 mm silicate tailings (range 9–43 kt) on a body with **0.26 m/s escape velocity**.

**Physics.** On km-scale bodies, grains below ~1 mm are cohesion-dominated (van der Waals), so a static, compacted deposit is stable. Escape comes from:
- Handling energy: conveyor discharge, impacts, pneumatic leaks.
- Electrostatic lofting at the terminator.
- Thruster plumes.
- Micrometeoroid gardening.

Bennu's observed particle ejection shows the background is non-zero even with no activity.

**Design: face-side backfill-and-cap**

```
 PIT ADVANCE  --->
 +---------------------------------------------------------------+
 |  CAPPED     |  COMPACTING   | ACTIVE FILL |   OPEN VOID  | FACE |<- robots excavate
 |  (mesh/foil |  (robot roller|  (enclosed  |  (just mined)|      |
 |   anchored) |   passes)     |   chute exit|              |      |
 +---------------------------------------------------------------+
        ^              ^              ^
   Fe-Ni foil cap   bom-0-2 robots   enclosed screw conveyor from skid, exit <=0.5 m above fill,
   (plant product)   ~0.6 relative   discharge velocity <=0.05 m/s (<20% of v_esc)
                     density gain
```

- **Void budget:** 17.8 kt at ~1.6 t/m³ is ~11,000 m³/yr, for example 100 × 50 × 2.2 m. Backfill volume roughly equals mined volume, because tailings at slightly higher compaction replace ROM.
- **Cap:** 0.1 mm Fe-Ni foil from the CVD line (~0.8 kg/m²), over ~5,000 m²/yr, is **~4 t/yr of product (0.3% of output)**. It is anchored by tailings briquettes. The cap suppresses electrostatic lofting and micrometeoroid-driven escape from the deposit surface.
- **Residue store:** carbonylation residue (~930 t/yr) is kept separate from tailings. It is briquetted and caged in mesh bays at the plant, retained as a real option on Co and PGM recovery.
- **Enclosure leakage:** all pneumatic exhausts pass through sintered-metal filters at ≥99.97% for 0.3 µm before any relief path.

**Interim allocation.** Under D-03, bom-0-15 owns the number. I propose for bom-0-3: **≤0.5 t/yr escaping particulate, ≤2.5×10⁻⁵ of ROM throughput, ALARP below that.** This is tighter than 99.99% containment.

**Verification:** witness plates and dust counters around the pit, lidar plume monitoring during conveyor discharge, and a 6-month measured campaign on the pathfinder.

**Design driver to bom-0-15:** if the licensing state demands ≤10⁻⁶, the cap moves from mesh to sintered crust. A sintered crust needs ~10× the energy and is not in the 0.85 MWe allocation.

---

## 10. Autonomy, control and communications (T10)

### 10.1 Control hierarchy

```
 L4 GROUND (bom-0-10): campaign plans, weekly; lot release concurrence; anomaly board
        | 10-100 kbit/s up / 0.3-1 Mbit/s avg down, light-time 0.5-20 min, conjunctions to 30 d
 L3 PLANT PLANNER: schedules trains, skids, lighter ops, maintenance; digital twin (MPC)
        | horizon hours-weeks; re-plans on fault
 L2 TRAIN / SKID SUPERVISORS: batch sequencing, recipe control, health monitoring
        | response <= 60 s
 L1 UNIT CONTROLLERS: reactors, compressors, decomposers, drums (redundant, rad-tolerant)
        | response <= 1 s
 L0 HARDWIRED SAFETY: overpressure, overtemp, carbonyl leak -> isolate/dump; no software
          response <= 100 ms; cannot be overridden remotely
```

### 10.2 Autonomy requirements (proposed)

| ID | Requirement |
|---|---|
| AU-1 | Operate for ≥30 days without ground contact at ≥50% of nameplate, with no loss of safety function |
| AU-2 | Detect, isolate and safe any single gas-system fault without ground action. Carbonyl leak of ≥1 g/h detected within ≤10 min. |
| AU-3 | Autonomous shutdown/restart of any train from cold within ≤72 h |
| AU-4 | Ground intervention rate ≤1 per 14 days, averaged per quarter, after 6 months of commissioning |
| AU-5 | ≥90% of ORU replacements completed robotically at first attempt; teleoperation used only for diagnosis |
| AU-6 | Onboard storage ≥60 days of full-rate telemetry (~40 TB) |
| AU-7 | Every lot certificate generated autonomously; ground concurrence is required only for first-of-grade lots |

### 10.3 Communications requirements (to bom-0-9)

| Parameter | Value | Basis |
|---|---|---|
| Downlink, average | 0.3–1 Mbit/s (3–11 GB/day) | ~20,000 sensor channels at decimated rates + summaries + selected video |
| Downlink, burst | 20–50 Mbit/s for maintenance video | Consistent with the Claude/GPT range; rejects 230 Mbit/s |
| Uplink | 10–100 kbit/s | Plans, software patches |
| Local site network | Fibre in tethers ≥1 Gbit/s; wireless mesh ≥100 Mbit/s | Skids, robots, lighters |

---

## 11. Maintenance and spares (T21; interface to bom-0-14)

| Wear item | Life (est.) | ORU mass | Annual demand |
|---|---|---|---|
| HPGR roll sets (hard-faced, abrasive silicates) | 10–20 kh | 2–4 t per set | ~1 set/yr across both skids |
| Drum magnet shells / liners | 20 kh | 0.1 t | 3–6 |
| Reactor pistons, seals, filter plates | 300–500 cycles | 0.2 t | ~6 |
| Compressor cartridges | 15–25 kh | 0.5 t | 1–2 |
| Decomposer liners / heaters | 10 kh | 0.3 t | 3–6 |
| Sintered-metal filters | 3–8 kh | 0.05 t | 20–40 |
| Electronics LRUs | MTBF 50–100 kh | ≤0.05 t | 10–30 |
| **Total spares flow** | — | — | **10–20 t/yr (3–6% of plant dry mass)** |

**Maintenance cadence:**
- Plant-wide mean time between ORU replacements is ~3–7 days.
- Two rail-mounted manipulators per hall and one mobile unit handle internal ORUs of ≤500 kg.
- External ORUs of ≤5 t are handled by bom-0-2 robots fitted with a standard grapple end-effector.

---

## 12. Interface summary

| Interface | Direction | Key parameters |
|---|---|---|
| bom-0-1 → 0-3 | Target data | TA-1 to TA-9 (§3.2); ≥20 samples; magnetic-fraction assays |
| bom-0-2 → 0-3 | ROM | 55 t/day avg (30–125); ≤100 mm; 1 t sealed containers; assay tag; ≤150 m haul |
| 0-3 → bom-0-2 | Services | Backfill compaction passes; external ORU handling; skid relocation |
| bom-0-5 → 0-3 | Power | 0.85 MWe allocation (0.6–1.1); plant bus 1 kV DC (proposed); skids at 1–3 kV; 120 kW night essential; ~0.5 MWh plant storage share |
| 0-3 → bom-0-4 | Product | 300 t pallet of 1 t canisters; stand-off 2–5 km; tug EP off within 5 km; ≤2 lighter ops/day |
| bom-0-4 → 0-3 | Inbound | ≤25 t/yr consumables; 10–20 t/yr spares; empty pallets |
| 0-3 → bom-0-13 | Product spec | CF-1/CF-2 (§4); lot certificates; retained samples |
| bom-0-15 ↔ 0-3 | Containment | ≤0.5 t/yr escape (interim); zero carbonyl vent; plume keep-out |
| bom-0-9 / 0-10 | Data / ops | §10 |
| bom-0-16 | EP propellant | No process interface. Iodine-plume keep-out only. Ar classifier-gas synergy if Ar is selected. |

---

## 13. Manufacturing, AI&T, launch and installation

### 13.1 Manufacturing approach

- **Process equipment** (vessels, HPGR, compressors, furnaces) is built by chemical-process and mining OEMs. Space qualification adds lightweighting, launch loads, outgassing control and ORU interfaces.
  - This is the main lever on $/kg. The roughly 60% of plant mass that is heavy process equipment should cost terrestrial-industrial × 3–5, not spacecraft rates.
- **Avionics, robotics and autonomy** follow spacecraft practice.
- **Production line:** 1 qualification train, 3 flight trains and 2 flight skids.
- **Feed for testing:**
  - Synthetic H-chondrite simulant: crushed ultramafic + Fe-Ni shot + FeS, at tonne scale.
  - Iron meteorite metal (Campo del Cielo is available at tonnes) for carbonylation kinetics.
  - Fresh ordinary-chondrite falls for small-batch validation. Weathered finds have oxidised metal and are not representative.

### 13.2 Earth AI&T

- **End-to-end hot test** of the qualification train for ≥2,000 h lights-out, on simulant, with full CO recycle.
- **Module-level thermal-vacuum** in a large chamber such as NASA Armstrong's Plum Brook.
- **Charging:** flight trains are tested with CO, then **purged and passivated before shipping**, and launched inert.

### 13.3 Launch packaging (to bom-0-8)

- About 16 packages of ≤20 t, ≤5 m diameter, ≤12 m long.
- Examples: each skid is 1 package; each train is 2 (reactor rack + gas/decomposer rack); hall structures 4; radiators and thermal 2; product transfer 1; consumables and canisters 2.
- Aggregated at a staging orbit and carried by 1–2 tug flights (bom-0-4) of 150–300 t.

### 13.4 Installation sequence at the NEA (~9–12 months)

1. Power and robots arrive first (bom-0-5, bom-0-2).
2. Pad survey and anchor pull tests (TA-9).
3. Truss and halls go up.
4. Radiators are deployed, then thermal loops filled and checked out.
5. Skid 1 is commissioned on live ROM. Its concentrate is stockpiled (no feed lag, which answers GPT's start-up question).
6. Process gas is made from formic acid; train 1 is commissioned with first lots held for certification.
7. Trains 2 and 3 are brought up.
8. Skid 2 is brought up.
9. The first pallet ships.

---

## 14. Development roadmap and TRL

### 14.1 Schedule (indicative; gates are event-driven, not date-driven)

```
         2027  2028  2029  2030  2031  2032  2033  2034  2035  2036-38  2039-40  2041  2042  2043-44
 0A  [Ph A][-- bench T05/T06/T07/T19 --]
                 [RSR]
                       [-- ground integrated pilot 1/50 scale --]
                       [-- ugravity tests: parabolic/ISS/free-flyer --]
                                   [-- pathfinder build (bom-0-12) --][-- pathfinder ops at target --]
                 [SRR]       [PDR]                                       [KDP-0B: demand, economics, licence, target; TRL 6]
 0B                                                                         [CDR][-- build, AI&T --][launch/transfer]
                                                                                                    [install][commission]
                                                                                                          [first pallet][first SEL1 delivery]
```

The critical path runs through pathfinder operations on real target regolith. Without them, T05, T08 and T19 cannot reach TRL 6 in a relevant environment.

### 14.2 Critical technology plan

| Tech | Now | 0A milestone (TRL 4–5) | TRL 6 evidence at KDP-0B | Venue | My AD² |
|---|---|---|---|---|---|
| T03 plant radiators | 4–5 (panels) / 3 (dusty surface integration) | Full-size MT panel segment in TVAC with simulant dust; ≤10% deviation from model | Panel segment + loop on pathfinder for ≥6 months | TVAC; pathfinder | 4–5 |
| T05 beneficiation | 2–4 | Recovery ≥75% at grade ≥65% on simulant and falls; skid breadboard 50 kg/h in vacuum | ≥10 t of real target ROM processed, ≥500 h; ≤12 kWh/t | Lab; parabolic; pathfinder | 5–6 |
| T06 carbonyl (if selected) | 2–3 | Kinetics on meteoritic metal; 10 kg closed-loop batch; RSR data | 100 kg/batch ground pilot for 1,000 h. Pathfinder cell: ≥10 kg/batch × ≥100 cycles on target concentrate with injected faults; ≥80% extraction in ≤72 h; CO loss ≤0.3% | Lab; ISS/free-flyer phase-separation test; pathfinder | 6 |
| T07/T23 melt (alternate) | 2–3 | 5 m rotating analogue: ≥90% recovery on 10 kg melts; S partition data | Only if selected | Ground centrifuge; orbital centrifuge | 6–7 |
| T08 containment | 2–3 | Backfill-and-cap in vacuum chamber; cohesion tests (drop tower) | Measured escape ≤ interim ceiling over ≥6 months at the pathfinder pit | Chamber; pathfinder | 6–7 |
| T10 autonomy | 2–4 | Digital twin; ground pilot 2,000 h lights-out | Pathfinder ≥30 days uncontacted; AU-1 to AU-4 met | Ground; pathfinder | 6 |
| T17 H₂ reduction | 2–4 | Desk study + bench only | Not required unless the target is L/LL | Lab | (6–7, deferred) |
| T19 bulk solids | 2–3 | HPGR forced-feed and pneumatic loop in parabolic flight and vacuum | Pathfinder skid ≥500 h without unrecoverable jam | Parabolic; pathfinder | 6–7 |
| T21 maintenance | 2–4 | Full-scale ORU mock-ups; 50 swaps | ≥20 robotic ORU swaps at the pathfinder, ≥90% first-attempt success | Ground; pathfinder | 6 |
| T22 product / QA | 2–4 | In-situ QA vs. Earth lab on 20 lots, ≤10% relative bias | Pathfinder product lot (≥100 kg) re-assayed at SEL1/Earth and **accepted by the Phase 1 customer** | Lab; pathfinder | 5–6 |

**Demand signals to other lines (not bom-0-3 cost):**
- bom-0-11: $0.6–1.4B for plant-related maturation, including the ground integrated pilot.
- bom-0-12: a plant payload of ~5–10 t (subscale skid at 50 kg/h, one carbonyl or melt cell, finishing/QA, containment instrumentation), roughly $0.3–0.8B.

### 14.3 Proposed bom-0-3 inputs to the four discriminating gates (D-02)

- **Target:** TA-1 to TA-9 met.
- **Demand:** signed offtake ≥0.6 kt/yr for ≥5 yr against CF-1/CF-2, with the customer countersigning the spec. This sets N.
- **Economics:** see §15.4.
- **Licence:** the containment ceiling issued by the licensing state is achievable with backfill-and-cap. Otherwise, re-scope the cap.

---

## 15. Cost

### 15.1 Basis

- Estimating classes by mass:
  - Heavy process equipment, ~60% of dry mass: $8–20k/kg recurring.
  - Mechanisms and process control, ~28%: $25–50k/kg.
  - Avionics and robotics, ~12%: $60–120k/kg.
- DDT&E is a factor of ~0.7–0.8× first-unit recurring, given the multi-train production line.
- 2026 USD. Launch, transport, power, robots, spares, operations and risk reserve are excluded, each with its own line.

### 15.2 Mass budget

| # | Subsystem | CBE (t) |
|---|---|---|
| 1 | Beneficiation skids (2) incl. skid radiators | 36 |
| 2 | Backfill and cap equipment | 6 |
| 3 | Concentrate handling and buffer | 6 |
| 4 | Carbonylation reactors (18) + piping | 28 |
| 5 | Gas loop: compressors, condensers, tanks, CO regen, formic processor, analysers | 19 |
| 6 | Decomposers (6) + cyclones/filters | 15 |
| 7 | Anneal, CVD canister former, granulation | 12 |
| 8 | Packaging, QA lab, product yard racks | 10 |
| 9 | Product transfer (catapult, capture arm, 2 lighters) | 11 |
| 10 | Plant thermal control (950 m² incl. loops) | 11 |
| 11 | Power distribution and conditioning | 6 |
| 12 | Avionics, compute, sensors, network | 4 |
| 13 | Internal maintenance robotics | 9 |
| 14 | Structure, enclosures, dust/MMOD shields, 24 anchors | 38 |
| | **Dry CBE** | **211** |
| | MGA 25% | 53 |
| | **Dry MEV** | **264 (225–350)** |
| | Initial charge: ~20 t HCOOH, 3 t inert gas, 2 t misc. | 25 |
| | Earth start-up canister pool (until CVD line is qualified) | 15 |
| | **Delivered total** | **~305 (240–390)** |

### 15.3 Cost rollup

| Element | 0A ($M) | 0B ($B) |
|---|---|---|
| Plant systems engineering, flowsheet model and digital twin, ICDs, RSR, SRR/PDR | 80–200 (ref 130) | — |
| DDT&E (flight design, EM/QM, software, qualification) | — | 1.6–3.4 |
| Flight hardware production (3 trains, 2 skids, common infrastructure, product transfer) | — | 2.1–4.6 |
| System AI&T incl. 2,000 h end-to-end hot test | — | 0.4–0.9 |
| Installation and commissioning engineering | — | 0.2–0.5 |
| Initial consumables and canister pool (hardware only) | — | 0.03–0.1 |
| **Total bom-0-3** | **$80–200M** | **$4.5–9.5B (ref ~$6.8B)** |

**Scaling with N (at the gate):**

| Trains (N) | Approx. 0B cost | Note |
|---|---|---|
| 2 | ~$5.9B (−$0.6–1.0B vs. N = 3) | — |
| 4 | ~$7.5B (+$0.5–0.9B) | — |
| 5–6 | +~$0.8B per train + ~$0.4B per added skid | Common infrastructure is re-sized above N = 4 |

All-in, including DDT&E, this is ~$26k/kg dry, below spacecraft norms only because heavy process equipment dominates the mass.

**Recommended reserve:** 50% (40–60%) on bom-0-3 at KDP-0B, i.e. $2.3–4.8B, held in **bom-0-17** and not double-counted here. I agree with GPT that selecting an architecture does not earn a contingency cut.

**Operating demand on other lines (for reference only):**
- Consumables delivery: ~$40–150M/yr.
- Spares (bom-0-14): $0.1–0.4B/yr.
- Plant operations team (bom-0-10): $40–90M/yr.

### 15.4 Economics gate: illustration, not an estimate

Plant plus a share of power, ops and risk, at roughly $15–25B over 12 yr × 1.3 kt/yr (15.6 kt), gives **~$1.0–1.6k/kg at the NEA pallet**. Tug transport to SEL1 comes on top.

Earth delivery to SEL1 is $5–15k/kg (expendable, today) or $0.5–3k/kg (refuelled reusable). Per Claude, report both ends and do not average.

**Conclusion:** the plant is competitive only against today's expendable launch. Against mature reusable launch it is roughly a coin-flip. This supports D-01's framing: Phase 0 is a capability programme, not a cost saving.

---

## 16. Risk assessment (top 12)

Likelihood (L) and consequence (C) are on a 1–5 scale.

| # | Risk | L | C | Mitigation | Owner tech |
|---|---|---|---|---|---|
| R1 | Carbonyl kinetics on real feed too slow at ≤10 MPa | 3 | 4 | Early meteorite kinetics; RSR keeps R2; larger beds or 15 MPa design margin | T06 |
| R2 | Poor liberation (fine metal intergrowths) raises comminution energy and lowers recovery | 3 | 4 | TA-2 criterion; HPGR + finer classification; skid power margin | T05 |
| R3 | Particle escape exceeds the licensed ceiling | 3 | 5 (licence-ending) | Face-side backfill-and-cap; low discharge velocity; plume keep-out; sintered-crust upgrade path | T08 |
| R4 | Abrasive wear outpaces robotic maintenance | 3 | 4 | Hard-faced rolls; ORU design; spares flow budget; wear-rate data from the pathfinder | T21 |
| R5 | Autonomy fault cascades in the gas system | 2 | 5 | L0 hardwired safety; batch isolation; dump tanks; fault-injection campaigns | T10 |
| R6 | Carbonyl leak photodecomposes and deposits Fe on arrays or radiators | 2 | 4 | Zero-vent design; guard jackets; array siting upwind of relief paths (geometric); witness coupons | T08 / bom-0-15 |
| R7 | CO loss >0.3% drives Earth make-up cost | 3 | 3 | Leak-tight design; C/O loop closure; formic-acid logistics | T06 |
| R8 | No signed Phase 1 demand | 3 | 5 (0B not exercised) | Real-option structure; CF-2 powder grade widens the market; null option is Earth supply | Gate |
| R9 | Night thermal cycling condenses or freezes carbonyl in lines | 2 | 3 | Trace heating on essential bus; drain-to-tank on night entry; TA-8 | T03 |
| R10 | Rubble-pile anchoring or pad settlement | 2 | 4 | TA-9 pull tests; distributed anchors; truss with adjustable feet | T21 |
| R11 | Product fails C/O spec | 2 | 3 | Anneal margin; off-spec recycle to decomposer | T22 |
| R12 | Iodine plume contamination from tugs | 2 | 3 | 5 km keep-out with EP off; lighter transfer | bom-0-4 / 15 |

**Project-ending combinations:** R3 alone; R1 together with R2 (both routes stall on feed); R8 alone (by design, the 0B option is simply not exercised).

---

## 17. Where I disagree with the round-2 figures

| Topic | Round 2 | Mine | Why |
|---|---|---|---|
| 0B cost | Claude $4–12B; Gemini $6.5–9.5B; GPT $3–7B | **$4.5–9.5B, ref $6.8B (N = 3)** | GPT's $3B implies ~$11k/kg all-in including DDT&E for a first-of-kind autonomous chemical plant, below GEO-comsat recurring rates. Claude's $12B top needs ~500 t, which follows only from the melt route plus a rotor and a 2× margin. |
| Mass | Claude 250–500 t; GPT 180–300 t | **264 t dry MEV; ~305 t delivered (240–390)** | GPT's low end omits thermal, product transfer, consumables and MGA. 500 t is not needed without a large rotor. |
| Process baseline | Panel leans partial-gravity melt (Gemini baseline; GPT cartridges first; Claude co-baseline) | **Carbonyl baseline, melt alternate, RSR in 0A** | Gravity independence and sulfur rejection (troilite) favour carbonyl. No panel member addressed S partition in melt. |
| Tailings | 75–120 t/yr residue (old station context) | **~18 kt/yr tailings + ~0.9 kt/yr residue** | Co-location moves the whole gangue stream onto a 0.26 m/s escape-velocity body. T08 is the dominant licence risk. |
| Rotating geometry | Gemini/GPT 50 m | **None at plant scale; 5 m cartridges only if R2** | Agree with Claude. 50 m is a human-comfort heuristic. |
| Power | Claude 0.8; GPT 1.0; Gemini 2.2 MWe | **0.85 MWe installed, 0.5 MWe average** | Per-flowsheet calculation as GPT asked. MRE excluded from scope. |
| ROM:product | 10:1 to ~33:1 | **15.5:1 ref (8–35:1)** | Correlated cases only. |
| ROM feed | 0.2–1 kt/yr (station era) | **11–45 kt/yr (ref 20)** | A 1.3 kt/yr product needs this. Flagged to bom-0-2 for robot fleet sizing. |
| Radiators | Claude ~700 m²; GPT 500–1,500 m² | **~950 m² (700–1,300), 6–9 t** | Surface view factor to hot ground degrades flux. |
| T03 plant AD² | 5–6 | **4–5 (plant side)** | Moderate-temperature heat-pipe heritage. The tug is the hard case. |

---

## 18. Open engineering questions

1. **Carbonylation kinetics and CO loss** on fresh, troilite-bearing meteoritic Fe-Ni concentrate at 5–10 MPa. This is the first-order RSR question.
2. **Ni/Fe selectivity** of sequential carbonylation, and Co partition. Can stage 1 deliver ≥80% of Ni at ≤5% Fe co-extraction?
3. **Microgravity carbonyl condensing and phase separation** at 12 t/day. Do rotary separators scale, or is a HiGee column needed?
4. **Liberation size** of metal in the actual target regolith (TA-2). Does HPGR alone liberate, or is attrition grinding needed?
5. **HPGR forced-feed behaviour** in vacuum and µg with cohesive fines: jamming, roll skidding, circulating load.
6. **Escape fraction from backfill-and-cap** under terminator electrostatic lofting. Is a foil cap sufficient, or is sintered crust required?
7. **Licensing-state ceiling** (D-03). Does a ceiling ≤10⁻⁶ of throughput force a power re-allocation?
8. **Phase 1 product form.** Does the customer want granules, powder or consolidated billet? Billet adds a 1,200 °C sinter/forge step of ~60–100 kW and ~10 t.
9. **CVD canister** wall integrity and seal qualification for the tug launch/thrust environment.
10. **Night length vs. storage.** Is a polar or high-obliquity site available? It could raise availability from 72% to ~85%.
11. **Product transfer.** Catapult-plus-lighter versus a tug-mounted tether winch. Which is lower risk for T08?
12. **Residue real option.** Is the PGM/Co-enriched residue worth caging, about 1 kt/yr of storage mass?
13. **R2 sulfur.** If melt is selected, is CaO-flux import (30–80 t/yr) or downstream desulfurisation at SEL1 preferable?
14. **Heat-pump recovery** of carbonylation exotherm. Is ~120 kW savings worth the added rotating machinery at 12 yr life?
15. **Common-scope cost normalisation** across bom-0-3/-5/-2/-4 before the economics gate (GPT/Claude concern). This proposal is offered as one normalised input, not as the comparison itself.

---

## 19. Key requirements (proposed, for configuration control)

| ID | Requirement |
|---|---|
| PP-R-001 | Deliver CF-1 product at N × 0.6 kt/yr nameplate; annual average ≥72% of nameplate after 12 months of commissioning |
| PP-R-002 | Design life 12 yr (10–15) with replaceable process modules; structure 20 yr |
| PP-R-003 | Total installed electrical allocation ≤0.85 MWe at N = 3; night essential ≤120 kW |
| PP-R-004 | Reject ≥0.9 MW peak heat across LT/MT/HT loops at end of life with dust |
| PP-R-005 | Zero intentional release of metal carbonyls; CO release ≤10 t/yr |
| PP-R-006 | Particulate escape ≤0.5 t/yr (interim, ALARP; final value from bom-0-15) |
| PP-R-007 | No process gases or carbonyls aboard at launch |
| PP-R-008 | All life-limited items are ORUs (≤500 kg internal, ≤5 t external) with robotic interfaces; no crew provisions; robotic berthing only |
| PP-R-009 | Meet AU-1 to AU-7 (§10.2) |
| PP-R-010 | Earth consumable make-up ≤25 t/yr at N = 3 |
| PP-R-011 | Product lots certified on site to §4 with retained samples; first-of-grade lots require customer concurrence |
| PP-R-012 | Tug EP thrusting prohibited within 5 km of the site during product transfer |

---

*This proposal supersedes all bom-0-3 content that assumed a central SEL4/L5 station, crew, LOX/LH₂, MRE, Al/Si or a 50 m rotating arm. All figures are proposals for review against the D-01 to D-05 baseline, not panel decisions.*