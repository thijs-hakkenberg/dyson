---
bomId: "bom-0-4"
itemName: "MW-class Cargo Tugs"
itemSlug: "transport-vehicles"
modelId: "claude-opus-5-5"
modelName: "Claude Opus 5.5"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-4 MW-class Cargo Tugs: Technical Proposal

**Phase 0B item, with Phase 0A design work**
**Proposed configuration baseline: TUG-BL-0. For review only; nothing here is approved.**

---

## 0. Executive summary

**What the tug does.** The tug is an uncrewed solar-electric vehicle. It shuttles pallets of reduced Fe-Ni product from the processing plant at the target NEA (bom-0-3) to the Phase 1 receiving node at SEL1 (bom-0-13). It then returns empty pallets and, optionally, small equipment.

**Recommended point design**

| Parameter | Value |
|---|---|
| Array power | **1.5 MWe BOL at 1 AU**; ~1.1 MWe at 1 AU after 12 years |
| PPU input power | 1.2 MW nominal |
| Thrusters | 16 iodine Hall heads (15 active, 1 spare) in 4 pods |
| Specific impulse | 2,500 s nominal; throttleable 1,600–2,800 s |
| Thrust | ~57 N at 1.2 MW |
| Dry mass | 45 t (38–60 t) |
| Iodine capacity | 100 t, in swappable cassettes |
| Payload | 220 t nominal; 300 t rated at Δv ≤ 4.3 km/s per leg |
| Fleet | **12 tugs**, bought in two gated tranches (4 + 8) |
| Delivered product | **~0.95 kt/yr** (0.65–1.3 kt/yr) at a reference 2.5-year cycle |
| Fleet propellant demand | ~280 t/yr (200–450) |

**The opinion this design rests on.** At the reference target (3.5 km/s per leg), any vehicle above about 0.6 MW finishes its thrusting in under 1.3 years. The cycle is then set by trajectory windows, not by power. My own sizing supports Claude's round-2 critique on this point.

I still use MW-class power, which the binding range requires, for two things that do raise delivered tonnage per dollar:

1. **Window independence.** The tug carries the Δv capacity (≤ 5 km/s per leg) to depart off-optimum and still close a 2.5–3-year cycle. That widens the usable fraction of each synodic period and the set of eligible targets.
2. **Higher Isp.** Running at 2,500 s rather than ~2,000 s cuts propellant per cycle by about 15–20%. Propellant logistics, not vehicle capital, is the largest recurring cost of Phase 0 transport.

I therefore sit at the **low end of the 1.0–2.5 MWe range**, the knee of the curve (§4.3). The structure carries a growth scar to 2.0 MWe, to be activated only if the named-target trajectory study demands it.

**Cost of this item**

| Element | Point | Range |
|---|---|---|
| 0A design through PDR | $65M | $40–90M |
| 0B average unit recurring, arrays included | $280M | $175–450M |
| 0B item total (12 tugs, 28 pallets, GSE, sustaining) | $3.8B | $2.4–5.9B |

These figures exclude NRE (bom-0-11), launch (bom-0-8), propellant (bom-0-16), spares (bom-0-14) and operations (bom-0-10). §9 states the demand placed on each.

**Bottom line on economics.** Transport costs roughly **$0.6–1.2k per kg delivered** to SEL1. That is about parity with Starship-era Earth delivery, not a saving. This is consistent with D-01: Phase 0 transport is a **capability demonstration**.

---

## 1. Scope, boundaries and baseline control

### 1.1 In scope (bom-0-4)
- Tug vehicles (12 in the baseline), including their **own solar arrays**. Split accounting from bom-0-5 is agreed.
- **Product pallets** (reusable cargo frames) and the Pallet Standard Interface (PSI).
- The tug side of all interfaces: PSI latches, the propellant-cassette bay, the ORU (orbital replaceable unit) servicing interfaces and the docking target set.
- Tug-specific ground support equipment and the production line.
- Production-phase sustaining engineering.
- Phase 0A system design to PDR, with no flight hardware.

### 1.2 Out of scope (demand stated in §9, not costed here)

| Excluded scope | Owner |
|---|---|
| Thruster, array and feed qualification; the MW iodine test facility | bom-0-11 |
| Flight demonstration of a full wing and a thruster pod | bom-0-12 pathfinder |
| Launch and high-energy injection of tugs | bom-0-8 |
| Iodine supply, cassette filling and cassette ownership | bom-0-16 |
| Wear kits and spare heads | bom-0-14 |
| Servicing robotics, pallet storage and unloading at SEL1 | bom-0-13 |
| Product staging platform at the NEA | bom-0-3 |
| Ground segment and mission operations | bom-0-9, bom-0-10 |
| Contamination and disposal requirements (tug complies) | bom-0-15 |

### 1.3 Baseline control
- TUG-BL-0 supersedes the round-1 designs (800 kWe and 1.5 MW human-rated freighters) and the round-2 300 kWe / 15-vehicle concept.
- Those documents should be marked **SUPERSEDED**. They describe a different architecture: a cislunar station fed with ore.
- No crew provisions are carried. I keep only generic docking, power and data interfaces and structural reserve, not a "human-rating" label (§5.8).

---

## 2. Design philosophy

1. **Size power to the Δv envelope and the cycle, not to the reference target.** Throughput is window-limited. Surplus power is spent on Isp and window flexibility, not on speed.
2. **No fluid or solid propellant transfer in Phase 0.** Iodine travels in sealed, swappable 10 t cassettes. This turns the T14 transfer problem into a mechanism problem, which is easier to qualify.
3. **Wear parts are consumables.** Hall-thruster wear kits (pole covers, cathode, gas distributor, channel inserts) are swapped robotically at SEL1 every cycle. No head is required to survive 15 years.
4. **The tug never touches the asteroid.** It captures a pallet from a staging platform at a standoff of 1 km or more. This keeps a 160 m, 4,600 m² vehicle out of dust, plume and regolith environments.
5. **Graceful degradation is free.** Because power is not the binding constraint, losing a head, a pod or even a wing costs schedule margin, not deliveries.
6. **Node-agnostic.** Swapping SEL1 for SEL2, EML1 or a high Earth orbit changes low-thrust Δv by about 0.1–0.5 km/s, which is inside the envelope. D-04 can be re-decided at the 0B gate without redesign.
7. **Propellant-agnostic until PDR.** There is a common spine and power/propulsion architecture, with two feed-module variants: Iodine Feed Module (IFM, the reference) and Argon Feed Module (AFM, the alternate), per D-05.

---

## 3. Mission concept

### 3.1 Reference cycle (2.5 years)

```
 SEL1 node                                          Target NEA (co-located plant)
 ─────────                                          ─────────────────────────────
 [Service 30–45 d]                                  
   • drop loaded pallet                             
   • take empty pallet                              
   • swap 6–10 iodine cassettes                     
   • swap 15 wear kits (robotic, bom-0-13)          
        │                                           
        │  OUTBOUND  ~0.7–0.9 yr  (thrust ~0.25 yr, coast/phase rest)
        │  m0 ≈ 115 t (45 dry + 6 pallet + ~60 I2 + ≤20 t optional equipment)
        └──────────────────────────────────────────►  [Prox ops 30–90 d]
                                                       • holds 10 km/1 km/100 m/20 m
                                                       • drop empty pallet, capture loaded
                                                         pallet at staging platform ≥1 km
                                                       • (optional) deliver site equipment
        ┌──────────────────────────────────────────◄
        │  RETURN  ~0.9–1.1 yr  (thrust ~0.65 yr)
        │  m0 ≈ 315 t (45 dry + 220 t product + 6 t pallet + ~45 t I2)
        ▼
 [Window margin / phasing ~0.3–0.5 yr]
```

### 3.2 Design-reference Δv
- **Reference:** 3.5 km/s per leg (low-thrust, node ↔ NEA), 7 km/s round trip.
- **Envelope:** 5 km/s per leg (10 km/s round trip). This covers off-optimal departures, a poorer target, or GPT's 8 km/s reference with margin.
- **Assumption A-01:** the target-gate trajectory study (Copernicus or EMTG on the named target) confirms a cycle of 3.0 years or less at 5 km/s per leg or less. This is the single most important unverified assumption (§12, OQ-1).

---

## 4. Technical specification

### 4.1 Top-level specification (TUG-BL-0)

| Parameter | Value | Basis / assumption |
|---|---|---|
| Array power, BOL at 1 AU | 1.50 MWe | 4 wings × 1,152 m² at ~330 W/m² BOL at operating temperature |
| Array power, EOL at 1 AU (12 yr) | ~1.10 MWe | 1.5%/yr degradation in heliocentric space; 5% iodine-contamination allowance |
| Power at 1.2 AU | ~0.72 × the 1 AU value | 1/r², partly offset by cooler cells |
| PPU input, nominal | 1.2 MW; 1.0 MW from year ~8 | ~100 kW reserved for housekeeping, feed heaters, thermal, margin |
| Bus | 300 V-class array bus; SiC discharge converters ≥ 97% | Direct-drive at ~600 V is an option after plasma-arcing tests |
| Thrusters | 16 nested-channel Hall heads, 100 kW rated, 80 kW nominal at 600 V | 15 active, 1 hot spare; magnetically shielded |
| Isp | 2,500 s nominal (1,600–2,800 s) | 600 V discharge, iodine (127 u, similar to Xe) |
| Total efficiency | 0.58 (0.48–0.62) | Thruster 0.60 × PPU 0.97 |
| Thrust | 57 N at 1.2 MW and 2,500 s; ~95 N in high-thrust mode at 1,600 s | F = 2ηP/vₑ |
| Mass flow | 2.32 g/s (73 t/yr continuous) | |
| Dry mass | 45 t (38–60) | §4.4, including 20% margin |
| Iodine capacity | 100 t (10 cassettes × 10 t; 20.3 m³) | Envelope case 85 t + 5 t reserve |
| Payload | 220 t nominal; 300 t at ≤ 4.3 km/s per leg | §4.2 |
| Pallet tare | ~6 t (reusable), carried both ways | |
| Optional outbound equipment | ≤ 20 t per trip | Costs ~3.1 t I₂ per 20 t at reference Δv |
| Max acceleration (empty) | ~5×10⁻⁴ m/s² | Loads are trivial; launch loads govern structure |
| Design life | 15 yr / 6 cycles; ORU-serviceable | |
| Wing span | ~160 m tip-to-tip; spine ~40 m | |
| Stowed envelope | ≤ 8 m diameter × ≤ 18 m | Super-heavy fairing class |
| Battery | 50 kWh Li-ion | Safe mode and shadow excursions only |
| Waste heat to radiators | ~60 kWt (100 kWt design) | Pumped single-phase loop, ~160 m² |

### 4.2 Propellant and Δv budget (Isp 2,500 s, vₑ = 24.5 km/s, dry 45 t, pallet 6 t)

| Case | Return final mass | Return I₂ | Outbound final mass | Outbound I₂ | Burned | Loaded (incl. reserve) | Thrust time* |
|---|---|---|---|---|---|---|---|
| Reference: 220 t, 3.5 km/s per leg | 271 t | 41.6 t | 96 t | 14.7 t | 56 t | **~60 t** | 0.93 yr |
| 300 t, 3.5 km/s per leg | 351 t | 53.9 t | 109 t | 16.7 t | 71 t | 75 t | 1.17 yr |
| Envelope: 220 t, 5 km/s per leg | 271 t | 61.3 t | 117 t | 26.5 t | 88 t | 93 t | 1.45 yr |
| 300 t, 4.3 km/s per leg (rated limit) | 351 t | 66.3 t | 121 t | 23.0 t | 89 t | 94 t | 1.47 yr |

\*Thrust time divides burned propellant by 73 t/yr and by an average power factor of 0.83 (heliocentric distance plus duty).

**Argon alternate (AFM).** Assumptions: Isp ~2,900 s, η ~0.45, thrust ~37 N at 1.2 MW, dry mass +7 t for supercritical COPVs (~125 m³ at 300 bar) or +5 t for a cryogenic tank with a 1–2 kW cryocooler. At the reference Δv the AFM burns ~50 t/cycle with ~1.6 years of thrusting, which closes. At the 5 km/s envelope it needs ~2.4 years of thrusting, which does **not** close a 2.5–3-year cycle. Argon therefore shrinks the target envelope; it does not end the programme.

### 4.3 Why 1.5 MWe? (power trade, reference payload 220 t)

| Array BOL | Ops power | Dry | Ref thrust time | Envelope thrust time | Envelope fits 2.5–3 yr cycle? | Unit cost Δ vs 1.5 MWe |
|---|---|---|---|---|---|---|
| 1.0 MWe | 0.8 MW | 39 t | 1.3 yr | 2.0 yr | No | −$45M |
| **1.5 MWe** | **1.2 MW** | **45 t** | **0.9 yr** | **1.4 yr** | **Yes, ~1 yr margin** | 0 |
| 2.0 MWe | 1.6 MW | 51 t | 0.7 yr | 1.1 yr | Yes | +$50M |
| 2.5 MWe | 2.0 MW | 57 t | 0.6 yr | 0.9 yr | Yes | +$100M |

- Going from 1.5 to 2.5 MWe saves about 0.3–0.5 years of thrusting inside a cycle that is window-limited anyway.
- That costs about $1.2B across 12 tugs (+$100M each), and buys throughput only if the window study shows windows narrower than ~1.5 years.
- 1.5 MWe is therefore the knee. The 2.0 MWe growth scar (a fifth and sixth wing, PPU slots, radiator area reserve) costs about 1.5 t and $5M per tug, and preserves the option.

### 4.4 Mass budget (t)

| Subsystem | CBE | Range | Notes |
|---|---|---|---|
| Solar array wings (4) incl. masts and SADAs | 10.0 | 7.5–15 | 150 W/kg wing-level target (iROSA-class heritage is ~100–120 W/kg) |
| Thruster heads (16) and gimbals | 4.0 | 3.2–5.5 | ~200–250 kg/head (X3 was ~230 kg) |
| PPUs / discharge converters | 2.4 | 1.5–3.6 | ~2 kg/kW |
| Iodine feed: cassette bay, heated lines, valves | 2.0 | 1.5–3.0 | Lines at 150–180 °C |
| Cassettes (10 empty, ~0.25 t each) | 2.5 | 2.0–4.0 | Counted as dry mass while installed |
| Power distribution, harness, 50 kWh battery | 2.3 | 1.5–3.5 | |
| Primary structure (spine, pod outriggers, PSI) | 6.0 | 4.5–9.0 | Launch-load driven |
| Thermal: pumped loop and ~160 m² radiators | 2.0 | 1.5–3.0 | |
| GNC, avionics, prox-ops sensors | 1.0 | 0.7–1.5 | |
| RCS (green monoprop, 16 × 22 N) incl. 1 t propellant | 1.5 | 1.0–2.0 | For empty-tug prox ops and abort |
| Comms (2 m Ka/X HGA, LGAs, transponders) | 0.3 | 0.2–0.5 | |
| Docking, ORU and servicing interfaces | 1.5 | 1.0–2.5 | Generic, standard; no crew rating |
| **Subtotal** | **35.5** | | |
| Margin (20% + growth scar) | 9.5 | | |
| **Dry total** | **45** | **38–60** | |

### 4.5 Configuration

```
                         SUN  (array normal; vehicle rolls about spine,
                          │    SADAs track about the boom axis)
                          ▼
   ┌───────────────────────┐   ┌───────────────────────┐
   │  WING 1  16 m × 72 m  │   │  WING 2  16 m × 72 m  │
   │  1,152 m², ~375 kW    │   │                       │
   └──────────┬────────────┘   └───────────┬───────────┘
              └────────── SADA-P ───────────┘
                           ║ boom
 ═══[PSI ring]═[PALLET]══[CASSETTE BAY]══[AVIONICS/PPU]══[RADIATORS]══╦══[POD A][POD B]
     4 m dia    220 t     10 × 10 t I2     + battery       160 m²      ║   4 heads each
     latches    Fe-Ni                                      edge-on     ║  ±10° gimbals
               ◄── CG loaded     ◄── CG empty                          ╚══[POD C][POD D]
                           ║ boom                                      ──► plume (aft)
              ┌────────── SADA-S ───────────┐
   ┌──────────┴────────────┐   ┌───────────┴───────────┐
   │  WING 3               │   │  WING 4               │
   └───────────────────────┘   └───────────────────────┘

   THRUST DIRECTION  ◄────────── (tug "pushes" the pallet; thrust line on spine axis)
   Pods canted ~8° outboard; plume keep-out cone keeps 0.5 MW of thruster radiative
   and plume loss off the array and radiator surfaces.
```

**Mass properties**
- Loaded CG sits about 20 m forward of the pods.
- A 0.3 m lateral CG error in the pallet needs about 0.9° of gimbal, well inside ±10°.
- The first array mode is expected at ~0.03–0.08 Hz. Attitude control uses notch filters and slow thrust vectoring, plus two double-gimbal CMGs for the roll axis.

---

## 5. Subsystem breakdown

### 5.1 Electric propulsion (T01)

**Head**
- Nested two-channel, magnetically shielded Hall thruster, 100 kW rated, run at 80 kW and 600 V (~133 A).
- Derating trades thrust density for life, which is acceptable because the system is power-rich.

**Cluster**
- 4 pods × 4 heads. Each pod has its own PPU string.
- One head failing costs 1/15 of thrust. Losing one pod still leaves 0.9 MW of usable power.

**Life**
- Reference cycle: ~3.7 t per head. Envelope cycle: ~5.9 t per head.
- **Requirement:** qualified throughput of **≥ 6 t I₂ per wear-kit interval**. With a 1.5× life factor, that means ≥ 9 t demonstrated by test plus erosion modelling.
- Context: NEXT demonstrated 918 kg; HERMeS projects more than 1.7 t on xenon. 9 t is therefore a step change. It depends on magnetic shielding moving the life limit from the channel to replaceable pole covers and the cathode.
- Wear kits are swapped every cycle, so fleet demand is **~72 kits/yr plus ~5 replacement heads/yr**.

**Cathode**
- Iodine poisons BaO dispensers. The baseline is LaB₆ or C12A7-electride cathodes on iodine.
- **Fallback:** a 3 t noble-gas cathode-feed tank (Kr or Ar, ~5% of flow, ~15 t/yr fleet-wide).
- This must be decided by the T01 TRL-5 milestone.

**Throttle modes**
- High-Isp (2,800 s) for cruise when windows allow.
- High-thrust (1,600 s, ~95 N) for window catch-up and prox-ops collision avoidance. At 315 t this gives 0.1 m/s in about 5 minutes.

### 5.2 Power (T02)

**Arrays**
- Four flexible blanket wings, each 16 m × 72 m (rolled or Z-folded).
- Cells: IMM or multijunction at ≥ 30%. Packing factor 0.9.
- Wings are ORU-replaceable at the node, as a contingency and not a planned swap.

**Electrical**
- 300 V-class strings, plasma-hardened against arcing: grouted interconnects, no exposed conductor above ~100 V differential.
- Discharge converters are SiC at ≥ 97%. Magnet, keeper and heater supplies are conventional.

**Environment**
- Specific risk: iodine back-flow deposition on cover glass (contamination allowance 5%).
- Plume geometry and the "edge-on" pod cant are design drivers.

**Other power functions**
- **No dockside power** is required at the node or the NEA; the tug is always self-powered.
- **Option (not baselined):** a 200 kW power-export port through the PSI, for contingency support of the node or the plant. It is flagged OQ-9.

### 5.3 Thermal (T03 at tug level)
- Heat load: PPU losses ~36 kW, avionics and battery ~5 kW, back-conduction from thruster mounts ~15 kW, feed-heater loss ~4 kW, giving ~60 kWt. The design point is 100 kWt.
- Rejection: a single-phase pumped loop at 40–60 °C feeding ~160 m² of two-sided radiators, edge-on to the sun. ISS-ETCS-class heritage puts this at TRL 5–6 today.
- About 480 kW of thruster loss leaves through the plume and by direct radiation from the heads. It is a **geometry** problem (view factors to arrays and radiators), not a radiator-sizing problem.
- **Position:** T03 is project-ending for the plant (bom-0-3, bom-0-5) but **not for the tug**. I propose reclassifying the tug instance of T03 to "architecture-change, AD² 4". The plant's T03 retires the shared risk.

### 5.4 Propellant storage and feed (T14)

**Iodine Cassette Module (ICM)**
- 10 t solid I₂ (2.03 m³) in a Hastelloy- or Ti-lined shell with integral heaters, ~0.25 t empty.
- Fluid connections: one sublimation outlet with dual valves. Mechanical: a 4-point berthing latch with a power/data connector.

**Feed**
- Iodine is heated in the cassette to give ~2.3 g/s of vapour through heated lines (150–180 °C) to the pod flow controllers.
- Sublimation power is 0.57 kW (246 kJ/kg × 2.32 g/s). Including line and valve heaters the total is ~3 kW.

**Bay and swap**
- The tug has 10 slots. A typical cycle swaps 6–10 cassettes at SEL1 using the node manipulator (bom-0-13).
- Empty cassettes are left at the node for refill (vapour transfer) or retirement under bom-0-16 and bom-0-15. They are **never released**.

**Material compatibility**
- No aluminium in wetted paths. Seals are PTFE/FFKM qualified for multi-year iodine exposure.

### 5.5 Payload handling (T12)

**Product pallet**
- Reusable Ti-Al truss frame, ~6 t. Envelope ≤ 6 m diameter × 4 m.
- Holds up to 300 t of Fe-Ni billets, e.g. ~440 billets of 500 kg (220 t ≈ 28 m³ at 7.9 g/cm³), each with dual restraint.
- Pallet pool: 2 × fleet + 4 = **28 pallets**.

**Pallet Standard Interface (PSI)**
- 4 m androgynous ring with 4 structural latches and a compliant soft-capture stage.
- Capture rated for ≤ 2 cm/s closing speed: 20 J at 100 t.
- Two-fault-tolerant against inadvertent release: three independent inhibits, consistent with D-03 ALARP.

**Product acceptance specification (tug requirement on bom-0-3)**

| Item | Requirement |
|---|---|
| Mass | ≤ 300 t, certified to ±1% |
| CG | Within 0.25 m of the PSI axis |
| Loose particulates | None > 1 mm |
| Outgassing | Below the bom-0-15 limit |
| Fiducials | Passive retroreflectors and AprilTag-class targets on every pallet |

**At the NEA**
- The tug docks to the pallet held on the plant's staging platform, which stays ≥ 1 km from the surface in a terminator or hover station.
- The tug does **not** carry a manipulator for this.
- If bom-0-3 cannot provide a staging platform, the fallback is a 1.5 t tug-mounted capture arm pair. That is an architecture change; see OQ-3.

### 5.6 GNC and navigation (T25)

**Cruise**
- Onboard low-thrust guidance (Dawn-heritage approach) with weekly ground ephemeris and trajectory updates.
- Radiometric navigation (X-band, ΔDOR as needed) plus optical navigation against stars and the target.

**NEA approach**
- Optical navigation, then shape-model-relative navigation.
- Flash lidar (≤ 5 km) and fiducial tracking of the staging platform and pallet.
- Holds at 10 km, 1 km, 100 m and 20 m.
- Autonomous abort to a passively safe trajectory: high-thrust EP mode plus RCS.

**SEL1**
- Halo station-keeping (~2–10 m/s/yr) and node-relative navigation using cooperative targets.
- Plume keep-out: no firing above 10 kW within a 30° cone of the node inside 5 km. This is a bom-0-15 interface value.

**Attitude**
- Gimbal thrust-vector control in cruise. CMGs for roll. RCS for prox ops when EP is off.
- Sun-safe mode needs < 5 kW, met from arrays or the battery.

### 5.7 Avionics, autonomy and FDIR
- Radiation-tolerant dual-string computers with cross-strapping. A separate prox-ops computer handles lidar and vision.
- **Autonomous FDIR:**
  - head drop-out and cluster rebalance within 60 s;
  - PPU string isolation;
  - wing fault isolation;
  - cassette heater fault and changeover;
  - autonomous retreat to safe trajectories during prox ops.
- **Ground role:** go/no-go at each prox-ops hold, plus weekly cruise updates. Light-time to the NEA is 8–17 minutes one way at 1–2 AU, so everything below the 100 m hold is onboard-closed-loop.

### 5.8 Interfaces kept in place of "human-rating"
- One generic standard docking interface (IDSS-compatible geometry, ~0.4 t), used for node berthing. It is not crew-rated.
- Standard power and data connectors on the PSI and the ORUs.
- No 3 g load case, no crew kits, no shelter.
- I side with Claude and GPT. The extra mass is ~0.4 t (1% of dry mass) and buys servicing access now. It does not imply any crew capability.

### 5.9 Communications (bom-0-9 interface)

**Hardware:** X-band TT&C on LGAs and the HGA; Ka-band data on a 2.0 m HGA with a 50 W TWTA.

**Link estimate (Ka, 32 GHz, 2.0 m HGA ≈ 54 dBi)**

| Distance | Ground station | Rate |
|---|---|---|
| 2 AU | 34 m (~79 dBi), C/N₀ ≈ 66 dB-Hz | ~1.4 Mbps |
| 2 AU | 18 m commercial | ~350 kbps |
| 1 AU | 18 m commercial | ~1.4 Mbps |

**Demand**
- Cruise: 2–10 kbps averaged, as 4 h/week contacts at 50–200 kbps.
- Prox ops: 1–5 Mbps bursts.
- Fleet total < 1 GB/day; contact time ≈ 50 antenna-hours/week plus prox-ops campaigns.
- DSN is not assumed free.

---

## 6. System block diagram

```
          ┌───────────── 4 × ARRAY WINGS (1.5 MWe BOL) ─────────────┐
          │      plasma-hardened 300 V-class strings, 2 SADAs        │
          └──────────────┬──────────────────────────────────────────┘
                         │ 300 V main bus (4 sectioned buses, cross-tie)
      ┌──────────────────┼──────────────────────────────┐
      ▼                  ▼                              ▼
 ┌─────────┐   ┌────────────────────┐          ┌────────────────┐
 │ 4 × PPU │   │ Housekeeping PCDU  │          │ 50 kWh battery │
 │ strings │   │ avionics, heaters, │◄────────►│ safe mode only │
 │ ≥97% SiC│   │ CMG, RCS, comms    │          └────────────────┘
 └────┬────┘   └─────────┬──────────┘
      │ 600 V discharge  │ 28/120 V
      ▼                  ▼
 ┌──────────────┐  ┌───────────────┐   ┌───────────────────────────┐
 │ 16 HALL HEADS│  │ C&DH dual     │◄─►│ GNC: star trackers, IMU,  │
 │ 4 pods×4     │  │ string + prox │   │ OpNav cams, flash lidar,  │
 │ gimbals ±10° │  │ ops computer  │   │ fiducial tracker          │
 └──────▲───────┘  └───────┬───────┘   └───────────────────────────┘
        │ I2 vapour        │                 ┌──────────────────┐
 ┌──────┴────────────┐     └────────────────►│ X/Ka comms, 2 m  │
 │ Heated feed, flow │                       │ HGA              │
 │ ctrl, 10 cassette │                       └──────────────────┘
 │ slots (100 t I2)  │
 └───────────────────┘   ┌──────────────────────────────────────┐
                         │ Pumped-loop thermal, 160 m² radiator │
                         └──────────────────────────────────────┘
 Mechanical: PSI ring (pallet) | generic docking port | ORU grapple fixtures
```

---

## 7. Interfaces with other Phase 0 items

| Item | Interface | Tug-side value / requirement |
|---|---|---|
| bom-0-1 Scouts | Target ephemeris, shape and spin, dust environment | Required before CDR; must be added to bom-0-1 requirements |
| bom-0-2 Robots | Optional outbound carriage | ≤ 20 t per trip, inside the PSI or on the pallet |
| bom-0-3 Plant | Staging platform at ≥ 1 km; loaded pallet ready at tug arrival; product spec (§5.5) | Pallet hand-off ≤ 10 days |
| bom-0-5 Site power | None in baseline | Optional power-export port (OQ-9) |
| bom-0-8 Launch | 12 launches of ≤ 65 t (45 t dry + ≤ 20 t I₂), stowed ≤ 8 × 18 m | Injection to C3 ≥ −2 km²/s² or perigee ≥ 20,000 km. **No MW-array deployment in LEO**, because of drag, conjunction risk and Van Allen belt dose. |
| bom-0-9 Comms | §5.9 | < 1 GB/day fleet; ~50 h/week |
| bom-0-10 Ops | 12 vehicles, staggered prox-ops campaigns | ~4.8 node services/yr and ~4.8 NEA campaigns/yr |
| bom-0-11 NRE | Thruster, array, feed and PSI qualification; MW iodine facility | §9 |
| bom-0-12 Pathfinder | Flight of 1 full wing and 1 pod (2 heads active) | Needed for TRL 6 on T01 and T02 |
| bom-0-13 SEL1 node | Berthing, pallet storage, cassette and wear-kit swap robotics | Service time ≤ 45 days. Dockside power: zero. |
| bom-0-14 Spares | ~72 wear kits/yr, ~5 heads/yr, ~1 PPU string/yr | §9 |
| bom-0-15 Debris | No-release, plume keep-out, iodine deposition, disposal | §11.2 |
| bom-0-16 EP supply | ~280 t/yr I₂ (200–450) in ICMs; cathode gas ≤ 15 t/yr if fallback | ICM spec owned jointly |

---

## 8. Fleet sizing and throughput

**Fleet formula:** N = D × T_cycle / (m_payload × A), where D is delivered demand and A is availability (0.90 assumed).

**Delivered kt/yr with 12 tugs**

| Cycle → / Payload ↓ | 2.0 yr | 2.5 yr | 3.0 yr | 3.5 yr |
|---|---|---|---|---|
| 180 t | 0.97 | 0.78 | 0.65 | 0.56 |
| **220 t** | 1.19 | **0.95** | 0.79 | 0.68 |
| 260 t | 1.40 | 1.12 | 0.94 | 0.80 |

**Tugs required for 1.0 kt/yr at 220 t**

| Cycle | Tugs |
|---|---|
| 2.0 yr | 10 |
| 2.5 yr | 13 |
| 3.0 yr | 15 |
| 3.5 yr | 18 |

**Recommendation:** procure **Tranche 1 = 4 tugs** at KDP-0B. Size **Tranche 2 (baseline 8, range 6–14)** at a second gate, after the first tug's first full cycle. The inputs are:
- the demonstrated cycle time;
- wear-kit life;
- signed Phase 1 demand (D-01).

This keeps 0B a real option in practice and not only on paper.

**Delivery clumping.** One target means shared window structure, so deliveries arrive in clusters. Node storage (bom-0-13) should size for 3–5 pallets (~1 kt) arriving within 6 months.

---

## 9. Cost analysis

### 9.1 Unit recurring cost (average over 12 units, ~90% learning curve, 2026 $)

| Element | Point | Range | Basis |
|---|---|---|---|
| Solar arrays (1.5 MW) | $98M | $60–150M | $40–100/W at an 18 MW production lot; inside the agreed $30–150/W band |
| Thruster heads (16) | $48M | $32–80M | $2–5M per 100 kW head |
| PPUs / converters (1.2 MW) | $30M | $18–48M | $15–40/W |
| Iodine feed and cassette bay | $10M | $6–18M | |
| Power distribution, harness, battery | $8M | $5–14M | |
| Structure, mechanisms, SADAs, PSI | $22M | $14–35M | |
| Thermal | $8M | $5–14M | |
| GNC, avionics, RCS, prox-ops sensors | $18M | $12–30M | |
| Comms | $6M | $4–10M | |
| AI&T, launch-site ops, fee | $30M | $20–50M | |
| **Unit total** | **$280M** | **$175–450M** | First unit ~1.4× the average |

### 9.2 Item total, split 0A and 0B

| Line | 0A | 0B | Basis |
|---|---|---|---|
| Tug system engineering and design to PDR (no flight hardware) | $40–90M (pt $65M) | — | ~60–100 FTE × 4 yr plus analysis tools. Not duplicated in bom-0-11. |
| Tranche 1: 4 tugs including first production article | — | $0.85–2.1B (pt $1.35B) | First-unit premium |
| Tranche 2: 8 tugs, gated (6–14) | — | $1.3–3.2B (pt $2.0B) | |
| Product pallets (28) | — | $28–84M (pt $56M) | $1–3M each |
| Production GSE, deployment test rigs, integration facility fit-out | — | $60–150M | |
| Production-phase sustaining engineering (~8 yr) | — | $120–240M | |
| **Total bom-0-4** | **$40–90M** | **$2.4–5.9B (pt $3.8B)** | |

### 9.3 Demand placed on other lines (not costed in bom-0-4)

| Line | Tug-driven demand |
|---|---|
| bom-0-11 NRE | **$0.9–2.3B**: 100 kW iodine head and wear-kit qualification incl. ~16,000 h wear test ($400–900M, incl. MW-class iodine vacuum facility); full-scale wing qualification ($150–400M); PPU ($80–200M); feed and ICM ($50–150M); PSI and T25 hardware-in-loop ($50–150M); EM and qualification model ($200–500M) |
| bom-0-12 Pathfinder | Full wing (~375 kW) plus a 2-head pod in heliocentric flight |
| bom-0-8 Launch | 12 heavy launches plus high-energy injection |
| bom-0-16 Propellant | ~280 t/yr. At $0.5–1.5k/kg delivered to SEL1 this is **$140–420M/yr**, the dominant recurring cost |
| bom-0-14 Spares | Wear kits 72/yr × $0.4–1.0M plus 5 heads/yr × $3M ≈ **$45–90M/yr** |
| bom-0-10 Ops | Fleet ops team, est. $40–80M/yr |

### 9.4 Transport cost per kilogram

| Component | Annual cost |
|---|---|
| Fleet capital $3.8B over 15 yr | ~$250M/yr |
| Propellant | ~$140–420M/yr |
| Spares | ~$45–90M/yr |
| Operations | ~$40–80M/yr |
| **Total** | **~$475–840M/yr** |

At ~0.95 kt/yr this is **~$0.5–0.9k/kg**. Including NRE amortisation it is **~$0.6–1.2k/kg**. This is not cheaper than Earth launch in the Starship era. It is the price of the capability (D-01).

**What lowers the number**
- Higher Isp.
- Larger payloads at low-Δv targets.
- In Phase 1, ISRU propellant replacing Earth-launched iodine.

---

## 10. Development roadmap and technology readiness

### 10.1 Critical technologies (tug instance)

| ID | Technology | Now | 0A milestone (TRL 4–5) | KDP-0B evidence for TRL 6 | AD² | Class |
|---|---|---|---|---|---|---|
| T01 | 100 kW iodine Hall head and MW cluster | 2–3 (Xe/Kr nested Hall ground-tested at ~100 kW, TRL 4 for Xe) | 2029: TRL 4, breadboard head 500 h on I₂. 2031: TRL 5, EM head + PPU, ≥ 4,000 h, erosion model validated. | 4-head pod at 320–400 kW in chamber ≥ 1,000 h; lead head ≥ 10,000 h with model predicting ≥ 9 t; 2 heads ≥ 2,000 h in flight (bom-0-12) | 6 | Project-ending |
| T02 | 1,150 m² HV wing | 3 (flight heritage only at ~20–30 kW per wing) | 2029: subscale deploy and plasma-arcing tests. 2031: full-length ground deploy with offload. | One full wing deployed and operated ≥ 6 months on pathfinder; I₂ contamination coupons | 5 | Project-ending |
| T03 | ~100 kWt pumped-loop radiator | 5 | 2030: TVAC of radiator panel and loop | Qualification-model loop at full heat load in TVAC | 4 | **Propose: architecture-change for the tug** |
| T12 | 300 t pallet capture via PSI | 3 | 2030: 6-DOF HIL with full-scale PSI | Pathfinder capture of a ≥ 5 t dummy pallet; ground drop-tower or air-bearing at mass-scaled dynamics | 5 | Architecture-change |
| T14 | 100 t I₂ cassettes and 2.3 g/s feed | 2–3 (flight heritage at ~kg scale, ThrustMe) | 2030: ICM EM, sublimation at full pod flow | 2-yr materials exposure; robotic swap demonstrated on ground and on pathfinder | 5–6 | Project-ending |
| T25 | NEA and SEL1 nav for a 160 m flexible low-thrust vehicle | 3–4 (small-body heritage: OSIRIS-REx, Hayabusa2) | 2031: HIL with flex model | Pathfinder at the target or analogue: autonomous approach to 20 m hold | 5 | Project-ending |

**Iodine's hidden advantage: testability at MW scale.** Iodine condenses on cold surfaces at about −50 °C. That makes pumping a MW-class plume feasible, whereas xenon, krypton and argon need 20–40 K cryopanels at enormous area. A full-pod iodine test is affordable. A full-pod argon test is close to infeasible in existing facilities, which must be weighed in D-05.

### 10.2 Schedule (indicative)

```
2027  2028  2029  2030  2031  2032  2033  2034  2035  2036  2037  2038  2039  2040  2041  2042
 |SRR  |     |T01/T02 |     |PDR  |     |     |KDP-0B          |     |     |     |     |
 [==== 0A: system design, EM tests (bom-0-4 + bom-0-11) ====]
             [=== head wear test (≥16,000 h, starts ≤2030) ==========]
                         [== pathfinder build ==][fly: wing + pod ===]
                                                 |CDR  [T1 build 4]
                                                             ^FPA launch 2037
                                                                   ^1st NEA arrival 2038
                                                                          ^1st delivery 2039–40
                                                               |Tranche-2 gate (after 1st cycle, ~2040)
                                                                          [T2 build 6–14]
                                                                                 full fleet ~2042
```

### 10.3 Tug-specific KDP-0B criteria (all mandatory, no waivers)
1. All T01, T02, T14 and T25 evidence in §10.1 complete.
2. A named-target trajectory study shows T_cycle ≤ 3.0 yr at ≤ 5 km/s per leg (OQ-1).
3. A signed I₂ supply covering ≥ 5 years at 300 t/yr, at a stated price (bom-0-16).
4. Iodine contamination of arrays and optics shown at < 5% EOL power loss.
5. Unit cost estimate at CDR ≤ $350M.

---

## 11. Risk assessment

### 11.1 Risk register (L and C on a 1–5 scale)

| # | Risk | L | C | Mitigation |
|---|---|---|---|---|
| R1 | Window-limited cycle > 3 yr at the chosen target cuts throughput 20–40% | 3 | 4 | Δv envelope of 5 km/s per leg; target gate; Tranche-2 sizing; 2.0 MWe scar |
| R2 | Iodine head life < 6 t per wear kit at 600 V | 3 | 4 | Early wear test; more frequent kits; derate to 500 V; argon (AFM) fallback |
| R3 | Iodine attacks array cover glass, seals or node surfaces | 3 | 4 | Coupon programme 2029+; pod cant; keep-out cones; material rules |
| R4 | Cathode poisoned by iodine | 3 | 3 | LaB₆/electride work; noble-gas cathode-feed fallback |
| R5 | Full-scale wing deployment failure | 2 | 4 | Pathfinder flight; 4 independent wings; graceful degradation |
| R6 | Pallet capture anomaly or collision at the NEA | 2 | 5 | ≥ 1 km standoff; holds; autonomous passive-safe abort; ≤ 2 cm/s |
| R7 | Propellant logistics cost > $1.5k/kg | 3 | 3 | Higher Isp; supplier contracts at the gate; Phase 1 ISRU propellant |
| R8 | Array cost at the high end ($100–150/W) | 3 | 3 | Common wing with bom-0-5; production-lot buy |
| R9 | HV arcing in the self-generated plasma | 2 | 3 | 300 V baseline; grouting; arcing tests before direct drive |
| R10 | Ops workload for 12 vehicles exceeds plan | 2 | 2 | Onboard guidance and FDIR; staggered campaigns |
| R11 | Launch to high-energy orbit unavailable for 65 t | 2 | 3 | Split launch (two heavy launches with in-orbit mating) as fallback |
| R12 | Argon chosen at D-05 | 2 | 3 | AFM variant kept to PDR; envelope shrinks to ≤ 4 km/s per leg |

### 11.2 Debris and contamination (bom-0-15 compliance)
- **Interim design ceilings** (D-03 ALARP; final numbers set by bom-0-15):
  - probability of inadvertent pallet or cassette release ≤ 10⁻⁴ per transfer;
  - probability of a successful end-of-life disposition ≥ 0.999.
- **Preferred end-of-life:** retire the tug **to the node as Phase 1 spares or feedstock** (arrays, structure, PPUs).
- **Alternative end-of-life:** a heliocentric disposal orbit > 0.05 AU from Earth, with a dedicated ≥ 1 t I₂ disposal reserve held through life. Batteries are passivated; iodine is consumed, not vented.

---

## 12. Open engineering questions

1. **OQ-1, cadence.** For the named target, what is the minimum cycle at ≤ 5 km/s per leg, and how much of each synodic period is usable? This decides fleet size and whether the 2.0 MWe scar is used.
2. **OQ-2, life.** What throughput per wear kit can a magnetically shielded iodine Hall head reach at 600 V? Is the life limiter the pole cover, the cathode or the channel?
3. **OQ-3, staging.** Will bom-0-3 provide a pallet staging platform at ≥ 1 km? If not, does the tug carry capture arms (+1.5 t, architecture change)?
4. **OQ-4, cathode gas.** Pure iodine, or a noble-gas cathode feed? This affects bom-0-16 and D-05.
5. **OQ-5, Isp optimum.** Including delivered propellant price, is 2,500 s right, or does 2,800 s at higher voltage pay off despite life risk?
6. **OQ-6, ICM refill.** Can empty cassettes be refilled at SEL1 by vapour transfer, or are they single-trip? This affects debris, mass delivered and bom-0-16 cost.
7. **OQ-7, contamination.** What iodine deposition rate on cover glass and node surfaces is acceptable, and does it rise with fleet traffic at the node?
8. **OQ-8, injection.** Who provides C3 ≈ 0 injection for a 65 t stowed tug, at what price, and is a split launch acceptable?
9. **OQ-9, power export.** Should the tug carry a 200 kW export port to help the node or plant in emergencies? It creates coupling but adds resilience.
10. **OQ-10, wing commonality.** Can the tug wing and the bom-0-5 site wing be one qualified product? I estimate this saves $100–250M of NRE.
11. **OQ-11, outbound role.** Should outbound equipment (up to 20 t per trip) be used as baseline logistics for bom-0-2 and bom-0-3 spares? If so, the plant needs no separate resupply vehicle.

---

## 13. Where I disagree with the round-2 figures

| Round-2 figure | My position | Why |
|---|---|---|
| **Gemini: 14 tugs @ 2 MWe, unit $180–260M, high confidence on power** | 1.5 MWe; 12 tugs; $175–450M; medium-low confidence | At 2 MWe, thrusting takes ~0.7 yr inside a window-limited ~2.5-yr cycle, so the extra 0.5 MW buys little. At the agreed $30–150/W, arrays alone cost $60–300M at 2 MWe, so $180–260M does not close. High confidence on power is not supported while no named-target trajectory exists. |
| **GPT: 10 tugs @ 2 MW excl. arrays, $150–350M** | Arrays inside bom-0-4; 12 tugs in two tranches | Split accounting was agreed. Adding $60–150M of arrays moves GPT to ~$210–500M, which is consistent with me. Ten tugs closes 1 kt/yr only if T_cycle ≤ 2.0 yr, which no one has shown. |
| **Claude: 12 @ 1–1.5 MWe incl. arrays, $150–350M** | Closest to mine. I raise the top of the cost range to $450M and fix 1.5 MWe BOL. | 1.0 MWe cannot close the 5 km/s envelope inside a 2.5–3-yr cycle (2.0 yr of thrusting). The unit cost top end must cover first-unit premium and the high end of array pricing. |
| **Earlier reconciled "15 tugs @ 300 kWe"** | Superseded | That design fails the binding MW-class range. It also has no Δv margin for window flexibility: at 300 kWe the envelope case needs over 5 yr of thrusting. |
| **Propellant 300–350 t/yr** | ~280 t/yr reference (200–450) | Higher Isp (2,500 s vs 1,800–2,200 s) and co-location (product, not ore). |
| **Round-2 cost figures, if read as fleet totals** | Low by ~10× | A 12-tug MW fleet is $2.4–5.9B. The figures are credible only as unit costs. Please confirm the intended reading. |

**Confidence**
- Medium on vehicle physics and mass.
- Low on cycle time, wear-kit life and propellant price.
- Low-medium on unit cost.

The three numbers that will most change this proposal are T_cycle (OQ-1), throughput per wear kit (OQ-2) and delivered iodine price. All three are gated before KDP-0B, which is where they belong.