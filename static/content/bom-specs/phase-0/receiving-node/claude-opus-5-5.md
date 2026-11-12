---
bomId: "bom-0-13"
itemName: "Phase 1 Receiving Node (SEL1)"
itemSlug: "receiving-node"
modelId: "claude-opus-5-5"
modelName: "Claude Opus 5.5"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-13: Phase 1 Receiving Node (SEL1)
## Technical proposal: Project Dyson Phase 0B

**Status:** Proposal for configuration control. Interim, because D-03, D-04 and D-05 are all proposed.
**Funding phase:** Studies and interface definition in 0A. Hardware in 0B, gated at KDP-0B and sized by signed Phase 1 demand (D-01).
**Cost basis:** FY2026 USD. Excludes launch (bom-0-8), operations (bom-0-10), ground segment (bom-0-9), spares (bom-0-14) and contingency (bom-0-17).

---

## 0. Position in one page

The receiving node should be a **warehouse, not a factory**. It also should not be a refuelling station.

The node exists to do three things that no other Phase 0 item owns:

1. **Custody transfer.** It accepts Fe-Ni product from tugs. It verifies mass and grade against the Phase 0→1 product specification, and it records title transfer.
2. **Schedule decoupling.** It buffers lumpy tug arrivals of 150–300 t against Phase 1 consumption, including Phase 1 slips.
3. **Inventory safety.** It keeps a multi-kiloton iron stockpile in an unstable orbit about 1.5 million km from Earth, controlled and disposable.

The third function drives the design more than the first two. Function 3 is the most underestimated aspect of this item.

**Recommendation: Tier 1 "Passive Pallet Depot."** The design rests on four rules:
- Product arrives in standard 150 t pallets.
- Pallets are berthed whole on a truss.
- Robotics handle sampling and pallet movement only. There is no unpacking.
- There is no fluid transfer. Tug propellant is exchanged as sealed, berthable modules.

| Parameter | Recommended value | Basis |
|---|---|---|
| Quantity | 1 (0 is a legitimate outcome, see §2) | Single delivery point; Tier 0 fallback |
| Orbit | SEL1 Class-I halo, A_z ≈ 120–200 Mm, A_y ≈ 650 Mm, period ≈ 178 d | Sun–Earth–Probe (SEP) angle ≥ 5° for comms; SOHO-class heritage |
| Inventory capacity | 3.0 kt (20 × 150 t berths), expandable to 6.0 kt | ~1 yr at 2.5 kt/yr, or 2+ yr at the 1.3 kt/yr central case |
| Arrivals supported | ≤ 20 pallets/yr, turnaround ≤ 7 d | Up to 2.5 kt/yr at 150 t pallets |
| Dry mass | 21–35 t (incl. 20% margin), target ≤ 32 t | Bottom-up, §6 |
| Power | 60 kWe BOL, ≥ 50 kWe EOL (15 yr), no eclipse | EP station-keeping dominates |
| Station-keeping | 4+1 × 6 kW Hall, ~1.4 N total; 0.5–1.7 t/yr propellant at 3 kt | 3 m/s/yr nominal, 10 m/s/yr design |
| Docking | 2 Large Berthing Interfaces (LBI), 400 t-class, ≤ 3 cm/s capture | Tug + 300 t payload |
| Cost, 0A | $5–12M (studies, ICDs, safety analysis) | Node-specific breadboards carried in bom-0-11 (+$5–12M) |
| Cost, 0B | **$160–380M, central $250M** | Bottom-up, §12 |
| Round-2 figure | $200–600M | I accept the lower half and reject the upper half (§12.4) |

---

## 1. Scope and boundaries

### 1.1 What the node does
- Provides a cooperative docking target, approach corridor and keep-out enforcement for inbound tugs (bom-0-4).
- Takes custody of product pallets. Measures mass, grade and integrity, and issues acceptance records under bom-0-7 contracts.
- Stores up to 3 kt (option 6 kt) of Fe-Ni in a controlled, passively safe state.
- Station-keeps the whole stack, including inventory, and holds a disposal reserve.
- Issues pallets (or single product units) to the Phase 1 consumer.
- Berths sealed EP propellant modules (bom-0-16) for tug swap-out. There are no pumps and no fluid transfer.
- Provides proximity-link and navigation aids. It does not relay tug traffic to Earth.

### 1.2 What the node does not do (and who does)

| Excluded function | Owner | Rationale |
|---|---|---|
| Refining, melting, re-casting | bom-0-3 (at the NEA) | "Ship product, not ore," agreed by all three models |
| Tug servicing / ORU replacement on tugs | bom-0-4 / bom-0-14 | Would turn a depot into a station (Tier 2) |
| Fluid propellant transfer, cryo storage | None in Phase 0 | No production LOX/LH₂; xenon not baselined |
| Long-haul tug comms | bom-0-9 | Tugs carry their own direct-to-Earth links |
| Phase 1 manufacturing | Phase 1 | Different programme and budget |
| Water storage | Option only (§7.10) | Follows bom-0-6, C-type target only |

### 1.3 Interface map

```
            bom-0-8 Launch ──────────────► Node (2 launches or 1 super-heavy)
                 │                              ▲
                 ▼                              │ propellant modules,
            bom-0-16 EP propellant ─────────────┘ spare ORUs (bom-0-14)
                                                │
 NEA site ─► bom-0-3 product ─► pallet ─► bom-0-4 TUG ─► [ RECEIVING NODE ] ─► Phase 1 consumer
 (bom-0-2,     (PDS-01 spec,                   │            │      │
  0-5)          certificates)                  │            │      └─► acceptance data ─► bom-0-7
                                               │            │                          (title, contracts)
                                               │            └─► bom-0-15 debris/contamination
                                               │                (ALARP, plume rules, disposal)
                                               └─► bom-0-9 / 0-10 ground & mission ops
```

---

## 2. Design philosophy and recommended approach

### 2.1 Principles (opinionated)

1. **Pallets, not parts.** Handling individual 1 t blocks costs dexterous robotics, time and reliability. A tug should drop 150 t in one berthing operation and leave. Robotics exist to sample and to move pallets, not to unpack them.
2. **Passive-safe by construction.** A 3 kt iron mass on an unstable halo is a planetary-protection-class hazard, in the Earth-safety sense rather than the biological one. The station-keeping strategy must make loss of control result in a sunward departure, independent of whether anyone is commanding the node. Disposal is not an end-of-life afterthought. It is a continuous state requirement.
3. **Decide late, build small, grow by berths.** Phase 1's location, consumption rate and product form are not known. The node's growth unit is a 150 t berth, which is a truss segment and a latch. Nothing else scales with throughput.
4. **Phase 0 owns custody; Phase 1 owns consumption.** Phase 0 pays for acceptance, storage and safety up to title transfer. If Phase 1 wants dispensing, conditioning or manufacturing at the node, it pays.
5. **No human-rating label.** Per the re-assessment, the node carries structural reserve (factor 1.5 on docking/berthing loads) plus standard docking/servicing interfaces and ORU-replaceable avionics. That is sufficient for a crewed 0B/Phase 1 visitor to use, without the cost of certifying for it.

### 2.2 Tiered options

| Tier | Concept | 0B cost | When it is right |
|---|---|---|---|
| **0: Direct handover** | No node. Tug loiters until the Phase 1 consumer collects. Acceptance kit flies on the tug. Beacon only. | $0–40M | Phase 1 facility already operating at SEL1 when the first tug arrives |
| **1: Passive pallet depot (RECOMMENDED)** | Truss + berths + LBI + transporter + assay + EP station-keeping + propellant-module berths | **$160–380M** | Phase 1 location uncertain or late; Phase 0 must deliver against a contract date |
| **2: Active hub** | Tier 1 + tug servicing, fluid propellant transfer, Phase 1 power supply, dexterous unpacking | $450–900M | Never in Phase 0. It is a Phase 1 asset if anywhere. |

**Why not Tier 0?** At a central 1.3 kt/yr and 150–300 t per trip, there are 4–9 arrivals per year. If Phase 1 slips by 1–2 years, which history says is likely, Tier 0 forces one of three outcomes:
- tugs idle as floating warehouses (a ~$200M tug amortised over 15 years costs about $35–40k/day idle);
- Phase 0 halts;
- product is released uncontrolled.

None of these is acceptable. Tier 0 remains the fallback if Phase 1 is co-located and on time. It is also the reason no node technology is classed project-ending (§11).

**Why not Tier 2?** Tug servicing and fluid transfer at a remote unstable point is a station-class undertaking. Its main beneficiary is Phase 1, and it duplicates bom-0-4, bom-0-14 and bom-0-16 scope. The upper half of the round-2 $200–600M range is, in effect, Tier 2 (§12.4).

---

## 3. Location and orbit

### 3.1 Why SEL1 is a defensible reference (D-04)

| Factor | SEL1 halo | SEL4/L5 | Lunar DRO | SEL2 halo |
|---|---|---|---|---|
| Earth access (logistics) | C3 ≈ −0.7 km²/s²; ~3.2 km/s from LEO; 1–4 month transfer | ~1 AU from Earth; years by EP or large Δv | ~3.5–4 km/s from LEO; ~1 month | As SEL1 |
| Dynamical stability | **Unstable** (e-folding ~weeks) | Stable | Stable (centuries) | Unstable |
| Eclipse | None | None | Rare lunar/Earth eclipses | None at large amplitude |
| Light time | 5 s one-way | Up to ~16 min | ~1.3 s | 5 s |
| Comms geometry | Near-Sun line; needs SEP ≥ 5° | Good | Good | Good |
| Uncontrolled-loss hazard | Unstable manifold has an Earthward branch | Low | Mass resident in Earth–Moon space | As SEL1 |
| Neighbours | **Crowded**: SOHO, ACE, Wind, DSCOVR, Aditya-L1, IMAP, SWFO-L1 | Empty | Growing cislunar traffic | JWST, Gaia (retired), Euclid, others |
| Phase 1 synergy | Sunward staging; shared logistics hub | Remote | Earth-centric | Anti-sunward |

SEL1 wins on Earth accessibility and continuous sunlight. It loses on stability, crowding and loss-hazard.

My view is that SEL1 is right only if Phase 1 actually sits there. The trade becomes decidedly closer than the QOC scores suggest once you price in:
- the passive-safety requirement (§9.1), and
- heliophysics plume contamination (§9.2).

**Lunar DRO deserves to be the formal alternate in the D-04 re-decision.** L4/L5 is a poor logistics location for a node fed by Earth-launched propellant.

### 3.2 Orbit selection
- **Class-I halo**: A_y ≈ 650 Mm, A_z ≈ 120–200 Mm, period ≈ 178 d.
  - **RN-ORB-01:** SEP angle ≥ 5° at all times; target ≥ 8°.
  - The halo is chosen over a Lissajous orbit because it never crosses the solar exclusion zone, so no exclusion-avoidance manoeuvres are needed.
- **RN-ORB-02:** Phasing selected for ≥ 10,000 km minimum separation from every operational spacecraft over a 5-year propagation. This is re-verified each phasing cycle.
- **RN-ORB-03:** The node's station-keeping control law is *biased* (§9.1), so its uncontrolled departure branch is the interior (sunward) unstable manifold with probability ≥ 0.999.

### 3.3 Environment
- **Solar constant:** ≈ 1,389 W/m², about 2% above 1 AU. There is no eclipse.
- **Radiation:** interplanetary, outside the magnetosphere. Total ionising dose is about 10–20 krad(Si) per 15 years behind 2.5 mm Al, dominated by solar particle events. Avionics need SPE-tolerant parts and latch-up protection.
- **Fe-Ni product thermal state:** about 330 K equilibrium for a two-sided grey plate at α/ε ≈ 1. This is benign: no thermal cycling and no oxidation (vacuum).

---

## 4. Product interface and logistics

### 4.1 Strawman Phase 0→1 Product Delivery Specification (PDS-01)

The re-assessment requires a material, purity and date specification. The node is where that specification is enforced, so this item proposes the strawman below. **Phase 1 must sign it before KDP-0B.**

| Attribute | Grade FN-A (structural feedstock) | Grade FN-B (re-melt feedstock) |
|---|---|---|
| Form | Standard Product Unit SPU-1: billet 1,000 × 500 × 250 mm, ±3 mm, two flat datum faces | Same envelope; sintered/compacted allowed |
| Unit mass | 0.95–1.00 t (ρ ≈ 7.85–7.95 t/m³) | 0.85–1.00 t |
| Density | ≥ 97% theoretical | ≥ 88% theoretical |
| Ni | 5–12 wt% (reported) | 4–15 wt% |
| Co | ≤ 0.8 wt% | ≤ 1.0 wt% |
| S | ≤ 0.03 wt% | ≤ 0.30 wt% |
| P | ≤ 0.15 wt% | ≤ 0.50 wt% |
| C | ≤ 0.10 wt% | ≤ 0.50 wt% |
| O (incl. oxide) | ≤ 0.30 wt% | ≤ 1.5 wt% |
| Silicate inclusions | ≤ 0.5 vol% | ≤ 3 vol% |
| Lot | 1 pallet = 150 SPU nominal | Same |

Notes on the table:
- These values reflect the composition of native meteoritic metal (kamacite/taenite) with troilite and silicate carry-over as the main contaminants.
- The FN-A sulphur and phosphorus limits are the hard part for bom-0-3. FN-B exists so that a microgravity metallurgy shortfall does not stop deliveries.

### 4.2 Pallet standard (shared ICD with bom-0-4 and bom-0-3)
- **Pallet capacity:** 150 t nominal (150 SPUs). The envelope is about 4.2 × 4.2 × 2.4 m with ~75% packing.
- **Frame strategy.** Earth-made frames would be roughly 6 t per pallet. With about 30 pallets resident or in the pipeline, that is ~180 t of Earth-launched hardware, which is unacceptable. Instead:
  - Earth-made, **reusable Pallet Interface Plate (PIP)**, 0.6–1.0 t. It carries the LBI-compatible grapple, berth latch features, fiducials and an RFID/optical lot tag. PIPs are returned to the NEA by tugs.
  - SPUs are bound by **Fe-Ni strapping and interlocks fabricated at the NEA**, at 1–2% of pallet mass. The strapping is itself product.
- **Tug configuration:** 1 pallet (150 t tug) or 2 pallets in tandem (300 t tug).

### 4.3 Cadence and inventory sizing

| Case | Delivered rate | Pallets/yr | Arrivals/yr (150 t / 300 t tugs) |
|---|---|---|---|
| Low (GPT contracted) | 0.6 kt/yr | 4 | 4 / 2 |
| Central (Claude) | 1.3 kt/yr | 9 | 9 / 5 |
| High (Gemini) | 2.5 kt/yr | 17 | 17 / 9 |

**Buffer sizing** is the sum of three terms:
- one year of deliveries, as a Phase 1 slip allowance;
- two pallets of lumpiness;
- a 0.5 kt Phase 1 consumption-variance reserve.

The result is ≈ 2.1 kt at the central case and 3.3 kt at the high case. **Baseline: 3.0 kt, 20 berths.** The truss extension to 6 kt is a separately gated option, triggered only if signed Phase 1 demand requires it. If Phase 1 slips beyond the buffer, **Phase 0 throttles**; the node does not grow without limit. This rule is written into bom-0-7 contracts.

---

## 5. System architecture

### 5.1 Configuration (side view, +X sunward)

```
                                  +X (Sun)
                                     ▲
          ┌────────────── Solar array wing A (30 kWe, 2-axis gimbal) ──────────────┐
          │                                                                         │
 LBI-1 ═══╡ CORE MODULE ╞═══╤═══════╤═══════╤═══════╤═══════╤═══ LBI-2 (Phase 1 /
 (Phase 0 │ avionics,GNC│   │ RING 1│ RING 2│ RING 3│ RING 4│ RING 5   spare, prop
  inbound)│ EP pods ×2  │   │ ┌─┐┌─┐│ ┌─┐┌─┐│ ┌─┐┌─┐│ ┌─┐┌─┐│ ┌─┐┌─┐   module swap)
          │ prop tank   │   │ │P││P││ │P││P││ │P││P││ │P││P││ │P││P│
          │ radiators   │   │ └─┘└─┘│ └─┘└─┘│ └─┘└─┘│ └─┘└─┘│ └─┘└─┘
          │ DDU (sep.)  │   ╞═══ rails: Mobile Transporter (MT) + 15 m arm ═══╡
          └─────────────┘   │◄──────────────── 30 m storage spine ──────────────►│
          └────────────── Solar array wing B (30 kWe) ─────────────────────────────┘

  P = 150 t pallet berth (4 per ring: ±Y, ±Z faces) → 20 berths = 3.0 kt
  Extension option: +30 m spine, rings 6–10 → 40 berths = 6.0 kt
  EP pods mounted at core and at spine tip, plumes directed ±Y away from pallets/optics
```

### 5.2 End view of a storage ring

```
                 +Z
           ┌───────────┐
           │  pallet   │
           │  150 t    │
   ┌───────┼───────────┼───────┐
   │pallet │  ▓▓SPINE▓▓│pallet │   -Y ◄──► +Y
   │150 t  │  ▓ MT rail│150 t  │
   └───────┼───────────┼───────┘
           │  pallet   │
           │  150 t    │
           └───────────┘
                 -Z
  Berth latch: 4-point, 2-fault-tolerant hold, electro-mechanical, preload 50 kN
```

### 5.3 Functional block diagram

```
 ┌──────────────────────────── NODE ───────────────────────────────────────────┐
 │                                                                             │
 │  POWER: 60 kWe array ─► 300–400 V unregulated bus ─► EP PPUs (direct drive) │
 │                    └──► 120 VDC regulated bus ─► avionics, MT, arm, assay   │
 │                         30 kWh Li-ion (safe-mode, transients)               │
 │                                                                             │
 │  GNC: star trackers ×3, IMU ×2, Sun sensors, RWA ×4 (≥200 Nms each),        │
 │       EP gimbals for momentum dump, radiometric OD + ΔDOR                   │
 │                                                                             │
 │  C&DH: dual-string rad-tolerant computers, cFS-class FSW,                   │
 │        ≥2 TB storage, CCSDS SDLS authenticated commanding                   │
 │                                                                             │
 │  COMMS: X-band 1.0 m HGA + 2 LGA (DTE); S-band/UHF proximity link           │
 │         (≤1,000 km) to tugs and Phase 1 vehicles                            │
 │                                                                             │
 │  BERTHING: LBI ×2, berth latches ×20, prop-module berths ×4                 │
 │  HANDLING: Mobile Transporter (150 t), 15 m 7-DOF arm, 5 m dexterous arm    │
 │  ACCEPTANCE: 3D lidar scanner, LIBS, XRF, EMAT ultrasonic,                  │
 │              magnetic susceptibility, inertial mass estimator               │
 │  PROX-OPS AIDS: retroreflectors, fiducials, beacon, keep-out monitor        │
 │  SAFETY: Dead-man Disposal Unit (DDU), independent avionics/power/EP        │
 └─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Technical specifications

### 6.1 Mass budget

| Subsystem | Mass (t) | Notes |
|---|---|---|
| Core module structure & mechanisms | 3.0–4.5 | GEO-bus-derived, stretched |
| Avionics, GNC, comms | 0.6–1.0 | Dual string |
| Power (arrays, PMAD, battery) | 0.9–1.3 | Roll-out arrays at 100–150 W/kg; 30 kWh at ~150 Wh/kg pack |
| Thermal (25–35 m² radiators, pumped loop) | 0.5–0.9 | |
| EP (5 thrusters, PPUs, gimbals, feed, tank) | 0.7–1.2 | Iodine tank (4 t capacity) is light; argon COPVs add ~1.5 t (§7.4) |
| Storage spine (30 m) + 20 berth latches | 5.6–10.0 | Stiffness-driven, not strength-driven |
| LBI × 2 | 1.2–2.0 | |
| Mobile transporter + rails | 1.5–2.5 | |
| Arms (15 m + 5 m) | 1.8–2.5 | |
| Acceptance suite | 0.2–0.4 | |
| Prox-ops aids | 0.1–0.2 | |
| Propellant-module berths × 4 | 0.4–0.8 | |
| Dead-man Disposal Unit | 0.8–1.5 | Independent |
| **Dry total (CBE)** | **17.3–28.8** | |
| Margin (20%) | 3.5–5.8 | Low-maturity design |
| **Dry with margin** | **21–35** | Target ≤ 32 t |
| Initial propellant | 2.0 | ~1 yr design-case station-keeping + disposal reserve |

### 6.2 Power budget (no eclipse)

| Load | Average (kW) | Peak (kW) | Note |
|---|---|---|---|
| EP station-keeping | 5–12 | 24 | Not fired during docking/handling (operations rule) |
| Mobile transporter + arms | 0.5 | 6 | |
| Berth latches & heaters | 0.5 | 1.5 | |
| Acceptance suite | 0.3 | 2 | LIBS laser, EMAT pulser |
| Avionics + comms | 1.5 | 2 | |
| Thermal control | 1.5 | 3 | Pumps; little heater demand |
| PMAD losses (~5%) | 0.5–1 | 2 | |
| **Total** | **~10–17** | **~30 (station-keeping mode) / ~15 (handling mode)** | |

- **Array:** 60 kWe BOL, ≥ 50 kWe EOL after 15 years at about 1.2%/yr degradation in the SPE environment.
- Surplus of 20–30 kW is available to a docked Phase 1 module as a **chargeable service**, not a Phase 0 requirement.
- Array hardware at $30–150/W is $1.8–9M, which is a small fraction of node cost.

### 6.3 Station-keeping sizing
- **Nominal halo station-keeping:** about 1–4 m/s/yr (SOHO/ACE heritage). Use 3 m/s/yr nominal.
- **Design case:** 10 m/s/yr, covering:
  - docking disturbances (residual momentum from tug capture, up to ~10⁴ N·s per event, partly nulled by the tug);
  - mass-property changes as pallets arrive;
  - the bias strategy (§9.1);
  - navigation error.
- **Stack mass at full inventory:** 3,000 t + ~30 t ≈ 3.03 × 10⁶ kg.
- **Required impulse:** 3.0 × 10⁷ N·s/yr (design) or 0.9 × 10⁷ N·s/yr (nominal).
- **EP:** 4 active × 6 kW Hall at ~60 mN/kW ≈ 0.36 N each, 1.44 N total. This gives 4.5 × 10⁷ N·s/yr at 100% duty, so the duty cycle is 67% (design) or 20% (nominal). The fifth unit is a cold spare.
- **Propellant** at I_sp ≈ 1,800 s: **1.7 t/yr design, 0.5 t/yr nominal.** A **≥ 1.0 t disposal reserve** (≈ 3–6 m/s on the full stack) is held at all times. Tank capacity is 4 t.
- **At the 6 kt option:** either accept ≤ 5 m/s/yr or add one EP pod and 15 kW of array (+$8–15M).

### 6.4 Attitude
- **Stack inertia** with 3 kt on a 30 m spine: ~10⁸–10⁹ kg·m².
- **Pointing:** hold a Sun-fixed attitude in the rotating frame. The resulting inertial rate is 2 × 10⁻⁷ rad/s, so momentum is a few hundred N·m·s, within reaction wheel range.
- **Slews:** none, by design.
- **Momentum dumping:** EP gimbals.
- **Docking-induced rates:** RN-GNC-04 requires the tug to null residual relative rates while hard-docked, using its own reaction control. The node does not carry the actuators to damp 10⁴–10⁵ N·m·s.

### 6.5 Performance requirements (selected)

| ID | Requirement |
|---|---|
| RN-DOCK-01 | Capture a vehicle of up to 400 t at closing velocity ≤ 3 cm/s, lateral misalignment ≤ 0.1 m, angular ≤ 3°, rate ≤ 0.05°/s |
| RN-DOCK-02 | Docking loads × 1.5 structural reserve (no human-rating certification) |
| RN-OPS-01 | Pallet berthing complete ≤ 72 h after hard dock; tug release ≤ 7 d after arrival |
| RN-ACC-01 | Pallet mass determined to ≤ ±2% (2σ); annual aggregate ≤ ±0.5% |
| RN-ACC-02 | Ni and Co measured to ±0.3 wt% absolute; S and P screened against FN-A/B limits; density to ±1% |
| RN-ACC-03 | Sampling per ISO 2859-1, General Inspection Level II: 20 SPUs per 150-unit lot (normal), 32 (tightened) |
| RN-SAFE-01 | P(uncontrolled Earth-intersecting departure) ≤ 1 × 10⁻⁴ over life + 100 yr. Interim ALARP ceiling (D-03) |
| RN-SAFE-02 | Disposal capability available ≥ 99.9% of operating time |
| RN-LIFE-01 | 15-yr design life; propellant refillable by module swap; avionics as ORUs |

---

## 7. Subsystems

### 7.1 Storage spine and berths
- **Truss:** 30 m long, square section, about 2.5 m on a side, carbon-composite or Al-Li, built from six 5 m segments.
- **Rings:** one at every second segment pair, each carrying 4 berths.
- **Design loads:** stiffness-driven. Target first mode ≥ 0.5 Hz with full inventory, to stay clear of EP and controller bandwidth. Strength loads are small: the 150 N peak transporter force and docking transients (≈ 1 kN equivalent at the latch).
- **Berth latch:**
  - 4-point, preloaded to 50 kN to keep contact faces closed under thermal distortion.
  - Two-fault-tolerant against inadvertent release, with mechanical inhibits plus two software inhibits.
  - Released only by a sequence that the node checks against the passive-safety state (§9.1).
- **Growth:** the extension kit (6 segments, 20 latches, ~6–8 t) is launched separately, delivered by tug, and assembled by the node arm.

### 7.2 Large Berthing Interface (LBI)
- **Heritage:** IDSS/NDS geometry scaled up, with longer-stroke compliant capture (0.5 m) and electromechanical dampers.
  - Capture energy at 400 t and 3 cm/s is 180 J. Peak force over the stroke is about 1 kN.
  - Heritage for docking large masses exists: Shuttle (~100 t) to ISS (~400 t) via APAS.
- **LBI-1** is dedicated to Phase 0 inbound. **LBI-2** serves the Phase 1 outbound, propellant-module swap, and backup for LBI-1.
- **Passes:** data and 120 V power only, so a docked tug can draw up to 10 kW hotel power. There is no fluid pass-through.

### 7.3 Handling: transporter and arms
- **Mobile Transporter (MT):** rail-mounted on the spine, ISS-MT-derived. It moves one 150 t pallet at ≤ 1 cm/s; accelerating 150 t to 1 cm/s in 10 s needs about 150 N. A pallet carries from the LBI to its berth in ≤ 6 h.
- **15 m 7-DOF arm** (SSRMS-class, walking between base points on the spine and core):
  - grapples PIPs and guides pallets into berths, but **does not carry pallets free-flying**;
  - handles single SPUs (≤ 1 t at ≤ 2 cm/s) for Phase 1 piece issue;
  - assembles the extension.
- **5 m dexterous arm,** mounted on the MT: assay end-effectors (LIBS/XRF head, EMAT probe), inspection camera, latch-level servicing.
- **End-effector innovation: electro-permanent-magnet (EPM) gripper.** Native Fe-Ni is ferromagnetic. An EPM holds with zero power and switches with millisecond current pulses. It fails safe in hold, and needs no grapple fixture on the product. TRL 3–4 for this application, so a ground breadboard is needed in 0A (via bom-0-11).

### 7.4 Station-keeping propulsion
- 5 × 6 kW-class Hall thrusters in two gimballed pods: core (2 + 1 spare) and spine tip (2). Plumes are directed ±Y, away from pallets, arrays and acceptance optics.
- **Propellant (D-05 interim):** iodine is the costed reference and argon the alternate.
  - **Iodine:** solid storage at about 10% tank fraction. Cons: condensation and corrosion risk on cold surfaces, optics and latch mechanisms near plume backflow. A 6 kW iodine Hall thruster is TRL 4–5 (small iodine Hall/gridded flight units exist at sub-kW).
  - **Argon:** no deposition, and commercial multi-kW argon Hall thrusters have flown at constellation scale (TRL 7+ for the vendor's own units, ~6 for procured units). Cons: high-pressure composite overwrapped pressure vessels (COPVs) at ~0.3–0.4 tank fraction, adding about 1.5 t.
  - **Node-specific opinion:** argon is the better fit for the node because of its contamination behaviour around robotic interfaces and optics. The node should follow the programme decision for supply-chain commonality, but D-05 should record this as a specific argument for argon.
- **Refill** is by swapping propellant modules (§7.9), not by fluid transfer.

### 7.5 Acceptance and metrology suite
- **Mass determination** combines three independent methods:
  1. **Declared mass** from bom-0-3 in-line weighing at the NEA, with certificates.
  2. **Geometric mass:** 3D lidar scan of the pallet (±1 mm) × density from assay (±1%), giving ±1.5%.
  3. **Inertial mass:** stack acceleration during calibrated EP burns before and after berthing. Known thrust (±1%) and radiometric Δv give pallet mass to about ±2–3% per event, averaging down over burns.
  - Disputes are resolved by method 2, with method 3 as the arbiter.
- **Composition:**
  - **LIBS** for Ni, Co, P and Si, plus S screening. Vacuum LIBS gives weaker plasma emission, so the method must be calibrated in a vacuum chamber against meteoritic iron standards such as Gibeon, Campo del Cielo and Sikhote-Alin.
  - **XRF** for Ni and Co cross-check.
  - **C and O are not measurable in situ to FN-A limits.** They rely on bom-0-3 process certificates, plus an occasional archive coupon set aside for Phase 1 or eventual Earth return. Earth return is not budgeted here.
- **Integrity:** EMAT ultrasonic testing. It needs no couplant, works in vacuum on conductive metal, and detects voids and inclusions above ~2 mm. Magnetic susceptibility screens for silicate-rich SPUs.
- **Data products:** a signed acceptance record per lot, including lot ID, mass with uncertainty, grade, nonconformances and images. It is cryptographically signed and transmitted to the bom-0-7 contract registry.

### 7.6 Power and thermal
- **Arrays:** 2 × 30 kWe roll-out wings, 2-axis gimballed so attitude flexibility is preserved.
- **Buses:** 300–400 V unregulated direct-drive bus for the EP PPUs; 120 VDC regulated bus (Gateway-compatible) for everything else.
- **Battery:** 30 kWh, for safe mode and transients only, consistent with the "delete 200–500 MWh line" decision.
- **Radiators:** 25–35 m², two-sided, sized for ~10 kW of rejected heat (PPU and avionics losses) at ~300 K. They are edge-on to the Sun.
- The pallets themselves need no thermal control.

### 7.7 Avionics and communications
- **Computers:** dual-string, rad-tolerant (SPE latch-up protected).
- **Flight software:** cFS-class framework with a separate safety kernel that owns the passive-safety and disposal logic.
- **Direct-to-Earth (X-band):** 1.0 m HGA, 20 W RF.
  - At 1.5 × 10⁶ km to a 13 m commercial antenna (G/T ≈ 37–39 dB/K, with Sun-proximity noise allowance), C/N₀ ≈ 82 dB-Hz, supporting ~50 Mbps at 5 dB link margin.
  - **Requirement is set at ≥ 10 Mbps.** The ~230 Mbps round-1 figure is not needed here.
- **Data volume:** quiescent 50–200 MB/day; arrival and acceptance campaigns 1–5 GB/day for 1–2 weeks.
- **Ka-band** is not baselined, because SEP of 5–10° degrades it.
- **Proximity link:** S-band (or UHF) to ≤ 1,000 km. It carries the node ephemeris broadcast, keep-out status, and docking go/no-go to tugs.
- **Security:** CCSDS SDLS authentication on every uplink. Release, disposal and orbit-change commands require **two-person ground authorisation plus a node-side safety-kernel check**. A malicious "release and push Earthward" command is a credible threat for a multi-kiloton iron stockpile.

### 7.8 Navigation and prox-ops aids
- **Absolute navigation:** two-way ranging and Doppler plus periodic ΔDOR, giving ~1 km / ~1 mm/s accuracy. This is ample for halo station-keeping.
- **Relative-navigation aids:** laser retroreflector arrays; LED fiducials around each LBI; the S-band beacon; and lidar/camera *monitoring* of tug approach, so the node can independently trigger a collision-avoidance abort.
- **Approach geometry:**
  - Approach ellipsoid: 2 km × 1 km × 1 km.
  - Keep-out sphere: 200 m.
  - Approach corridor: ±10° cone on the LBI axis.
  - Hold points at 10 km, 2 km, 200 m and 30 m.

### 7.9 Propellant-module berths (the cheap way to be a logistics hub)

Tugs return to SEL1 every trip, and SEL1 is the cheapest deep-space point to reach from Earth (C3 ≈ −0.7 km²/s²). Delivering tug propellant there is therefore natural.

**Indicative tug demand** (bom-0-4/0-16 own the real numbers): ~50–70 t per round trip at I_sp ≈ 2,500 s, with a 3 km/s loaded return leg plus a lighter outbound. At 5–9 trips/yr that is **~250–600 t/yr passing through the node.**

**Node role:**
- 4 berths for sealed **Propellant Modules (PM)**, 15–25 t each. Iodine modules are cartridge tanks; argon modules are COPV racks.
- Each PM has its own LBI-compatible interface plate.
- The tug picks up full PMs and leaves empties. Empties return to Earth vicinity or are expended per bom-0-15 rules.
- **No fluid transfer at the node.** The tug's PM interface is a bom-0-4 item.
- Cost: +$8–20M, included in the baseline.

### 7.10 Options (not baselined)
- **Water berth** (C-type, bom-0-6): insulated, heated tank pallet interface. +$5–15M.
- **6 kt extension:** +$15–35M hardware plus launch.
- **Phase 1 power export:** 20–30 kW over LBI-2. Paid by Phase 1.

### 7.11 Dead-man Disposal Unit (DDU)
- A separate module bolted to the core, with its own:
  - 10 kWe array and 5 kWh battery;
  - avionics, running independent software from a separate vendor;
  - 2 × 4 kW Hall thrusters;
  - feed line from a dedicated 1 t reserve tank.
- **Trigger:** loss of node heartbeat for more than 72 h, *or* departure-state monitoring showing growth on the Earthward branch.
- **Action:** fire along the precomputed interior-manifold direction. Because divergence grows exponentially, a bias of ~0.1–1 m/s applied within days is decisive. On 3 kt, ~3 × 10⁶ N·s takes ~40–60 days at 0.6–0.8 N.
- The DDU is *backup* to the biased station-keeping (§9.1); it is not the primary safety layer.

---

## 8. Concept of operations

### 8.1 Tug arrival (nominal)

```
T−120…−60 d  Tug on stable-manifold approach (bom-0-4 trajectory, corridor approved
             by node ops: no Earth-impact on failure, plume-free zones respected)
T−30 d       Navigation handover; node broadcasts ephemeris and keep-out state
T−2 d        100 km: proximity link acquired; mutual relative-navigation check
             HOLD 10 km → ground GO (10 s round-trip light time; ground approves gates only)
             HOLD 2 km  → node stops EP, enters "receive" mode
             HOLD 200 m → keep-out entry GO; node lidar monitoring active
             HOLD 30 m  → final GO; tug autonomous final approach ≤3 cm/s
T0           Soft capture → hard dock (LBI-1). Tug nulls stack rates (RN-GNC-04)
T0+6 h       Arm grapples PIP-1; MT carries pallet 1 to its berth; latch preload
T0+12 h      Pallet 2 (300 t tug case)
T0+1…3 d     Acceptance: lidar scan, ISO 2859 sampling (LIBS/XRF/EMAT), inertial burn
T0+3…5 d     Empty PIPs and full Propellant Modules loaded to tug; empties offloaded
T0+5…7 d     Undock, depart; node resumes station-keeping; acceptance record signed
```

### 8.2 Phase 1 issue
- **Pallet issue (baseline):** the Phase 1 vehicle docks at LBI-2 and the MT delivers whole pallets. Title transferred at acceptance; physical issue logged.
- **Piece issue (Phase 1 option):** the 15 m arm with the EPM gripper hands single SPUs to a Phase 1 capture fixture, at about 10–20 SPUs/day.

### 8.3 Safe mode
- **Behaviour:** Sun-point the arrays, inhibit all latch releases, maintain biased station-keeping with the autonomous controller, and beacon.
- **Autonomy duration:** the node can hold for **≥ 30 days without ground contact** while preserving the passive-safety state. If heartbeat is lost for more than 72 h, the DDU arms.

---

## 9. Autonomy, control and communication requirements

| Function | Autonomy level | Ground role |
|---|---|---|
| Station-keeping | Autonomous (on-board OD from radiometric uplinks + IMU; manoeuvre planner) | Weekly review; approves deviations > 0.5 m/s |
| Passive-safety bias monitoring | Autonomous, safety kernel | Monthly independent re-verification |
| Fault detection, isolation and recovery (FDIR) | Autonomous to safe mode | Recovery planning |
| Tug approach | Tug autonomous; node monitors and can abort | GO/NO-GO at hold points |
| Capture and dock | Fully autonomous (contact dynamics ≪ 10 s round-trip light time) | Post-hoc review |
| Pallet transport and berthing | Supervised autonomy: scripted with automatic hold on anomaly | Approves sequence start |
| Sampling and assay | Supervised autonomy | Approves lot sampling plan; reviews data |
| Latch release, disposal, orbit change | **Two-person ground authorisation + safety-kernel check** | Mandatory |

- **Light time:** 5 s one-way. Predictive-display teleoperation is feasible for non-contact arm moves. All contact operations are autonomous.
- **Ground coverage:** commercial 13 m-class networks, plus Deep Space Network or ESTRACK for ΔDOR. The DSN is not assumed free; costs sit in bom-0-9.

---

## 10. Safety, debris and contamination (interface to bom-0-15; ALARP per D-03)

### 10.1 Earth-impact hazard: the design driver
- **Departure geometry:** a SEL1 halo is unstable. A dead node departs along either the interior (sunward, heliocentric inside 1 AU) or exterior (Earthward) branch of the unstable manifold. Exterior-branch trajectories pass through Earth–Moon space, and a small subset intersect Earth.
- **Consequence:** a 3 kt Fe-Ni mass is about a 9 m iron body. At ~11 km/s entry that is ~1.8 × 10¹⁴ J (~40 kt TNT), and an iron body of that size largely survives atmospheric entry. A single 1 t SPU is also a survivable re-entry object.
- **This makes Earth safety a licence-gate issue, not a debris-mitigation footnote.**

**Layered mitigations:**
1. **Biased station-keeping** (primary). Keep the node's state on the interior side of the halo's stable manifold, so the natural divergence on loss of control is sunward. Bias cost is estimated at ≤ 1–2 m/s/yr, included in the 10 m/s/yr design case. This is a key 0A analysis item.
2. **DDU** (independent backup).
3. **Inventory cap** (3 kt; 6 kt only by gate).
4. **No free SPUs.** Every latch release is interlocked against the safety state. Piece issue happens only when a Phase 1 capture fixture is hard-docked.
5. **Approach corridors** for laden tugs designed so that a dead tug does not intersect Earth. This is a joint requirement with bom-0-4.
6. **Long-term disposal.** Heliocentric orbits near 1 AU re-encounter Earth on decadal timescales. Pushing 3 kt into a long-term safe heliocentric orbit needs Δv far beyond node capability. **End-of-life is therefore consumption by Phase 1 or relocation by tugs, not disposal.** This must be a signed Phase 1 obligation (bom-0-7).

**Interim ceilings (D-03, pending modelling):**
- P(Earth-intersecting uncontrolled departure) ≤ 10⁻⁴ over life + 100 yr.
- Disposal function availability ≥ 99.9%.

These are tighter than the 99% figure the re-assessment rejected.

### 10.2 Heliophysics contamination
- **Neighbours:** SEL1 hosts operational space-weather assets (DSCOVR, SWFO-L1, ACE) and science missions (SOHO, Wind, Aditya-L1, IMAP).
- **Mechanism:** EP plume ions (I⁺ or Ar⁺) and neutrals that are later photo-ionised become **pickup ions convected anti-sunward by the solar wind.** They can appear as artefacts in heavy-ion composition instruments on spacecraft located downstream.
- **Requirements:**
  - RN-CON-01: no EP firing while any operational spacecraft lies within a 2° cone downstream of the node (Sun–node line), at any range.
  - RN-CON-02: ≥ 10,000 km separation from any operational spacecraft.
  - RN-CON-03: annual plume inventory report.
- **Plume quantities:** node station-keeping is ~0.5–1.7 t/yr. Tug terminal manoeuvres near L1 may be larger, so the bom-0-4 terminal approach must respect the same rules.
- **Formal coordination** with NOAA SWPC, NASA HPD, ESA and ISRO must start in 0A. This is a discriminating input to the licence gate (D-02) and to the D-04 re-decision.

---

## 11. Manufacturing, assembly, integration, test and launch

- **Prime approach:** core module procured from a commercial high-power GEO/cislunar bus supplier. The 50–60 kW class has PPE-like heritage.
- **Specialist vendors:**
  - truss and latches from an in-space structures supplier;
  - arms from a space robotics supplier with SSRMS/ERA/Lunar Gateway arm lineage;
  - LBI from an existing docking-system supplier.
- **Truss segments** are identical, 5 m long, and produced as a small batch of 12 (6 baseline + 6 extension) with common tooling. Latches are produced in batches of 40 (20 baseline + 20 extension, 2 qualification units).
- **Test:**
  - Full-scale LBI capture dynamics on an air-bearing floor or 6-DOF hardware-in-the-loop rig, simulating 400 t vs 3 kt.
  - MT and berth latch integrated test with a 150 t inertial simulator (hydraulic HIL; a real 150 t mass on air bearings is impractical).
  - Acceptance suite thermal-vacuum calibration on meteoritic and synthetic Fe-Ni standards.
- **Launch** (bom-0-8): two elements, each ≤ 18 t to C3 ≈ −0.7 km²/s² (heavy-lift expendable class), or one super-heavy with in-orbit refuelling.
  - Element A (≈ 10–14 t): core, arrays, EP, DDU.
  - Element B (≈ 12–19 t): spine, MT, arms, LBIs.
  - Element B self-docks under its own small cold-gas/EP kit, or is placed by the first tug. Final assembly is by the node arm.
- **Launch cost estimate** for bom-0-8: $90–300M. **This may rival node hardware cost** and should be visible at KDP-0B.

---

## 12. Development roadmap and technology readiness

### 12.1 Schedule (relative to KDP-0B = T)

```
0A (pre-T)   Pre-Phase A/A: architecture trades, PDS-01 v1.0 signed with Phase 1,
             pallet/LBI ICDs, passive-safety analysis + independent review,
             heliophysics MOUs, breadboards (bom-0-11 funded)
T            KDP-0B (node ATP gated also on Phase 1 location decision, D-04)
T+0.5        SRR/MDR
T+1.2        PDR (all node critical technologies at TRL 6)
T+2.2        CDR
T+3.3        Element A/B ship
T+3.5–3.8    Launches; transit ~1–4 months
T+4.0–4.3    Assembly and commissioning (3–6 months)
T+4.5–5.5    First tug arrival (driven by tug build + NEA cycle)
```

**RN-SCHED-01:** node operational at least 6 months before first tug arrival. A late node is the cheapest schedule float to give away, because the Tier 0 fallback exists.

### 12.2 Critical technologies

| ID | Technology | TRL now | 0A target | KDP-0B | Project-ending? |
|---|---|---|---|---|---|
| CT-RN-1 | 400 t-class LBI capture | 4 (mechanism) / 6 (dynamics heritage) | 5 | 5–6 | No (Tier 0 fallback) |
| CT-RN-2 | Pallet MT + berth latch at 150 t | 5 | 5 | 6 by PDR | No |
| CT-RN-3 | Biased passive-safe station-keeping, multi-kt stack | Analysis AD² ~3 | AD² 5 (independent verified) | **Validated analysis, no waiver** | **Yes: licence-ending** |
| CT-RN-4 | 6 kW Hall station-keeping (iodine / argon) | 4–5 / 6–7 | Follows bom-0-16 | 6 | No (alternate propellant) |
| CT-RN-5 | Vacuum LIBS/XRF/EMAT acceptance on Fe-Ni | 4 | 5 | 6 by PDR | No (certificate-based acceptance fallback) |
| CT-RN-6 | EPM gripper on native Fe-Ni | 3–4 | 4–5 | 6 by CDR | No (fixture grapple fallback) |
| CT-RN-7 | Inertial mass determination ±2% | 4 | 5 | 6 by PDR | No |

Under D-02, only CT-RN-3 must meet the no-waiver standard at KDP-0B, because it gates the licence. Stringency follows reversibility, and the rest of the node is reversible.

---

## 13. Cost analysis

### 13.1 0A (this item only)

| Activity | $M |
|---|---|
| Architecture & tier trades; D-04 alternate (lunar DRO) | 1.5–3 |
| PDS-01 product specification + joint Phase 1 working group | 0.5–1.5 |
| Pallet / PIP / LBI / propellant-module ICDs (with bom-0-3, 0-4, 0-16) | 1–2.5 |
| Passive-safety & Earth-impact analysis + independent verification | 1.5–3 |
| Heliophysics contamination modelling & stakeholder agreements | 0.5–2 |
| **0A total, bom-0-13** | **5–12** |
| *Breadboards (LBI capture, EPM gripper, vacuum LIBS/EMAT, latch) — carried in bom-0-11* | *(5–12)* |

### 13.2 0B bottom-up (hardware, development, integration and test)

| Element | Low | High | Basis |
|---|---|---|---|
| Core module bus (structure, avionics, GNC, C&DH, thermal) | 40 | 90 | Commercial high-power bus, 50–70% of a PPE-class contract |
| Power (60 kWe arrays, PMAD, 30 kWh) | 8 | 20 | $30–150/W hardware + PMAD |
| EP station-keeping (5 thrusters, PPUs, gimbals, tank, feed) | 15 | 35 | Commercial Hall thrusters + new iodine feed |
| Storage spine + 20 berth latches | 12 | 30 | New design, batch build |
| LBI × 2 | 10 | 25 | Scaled IDSS, new capture system |
| Robotics (MT, 15 m arm, 5 m arm, end-effectors) | 25 | 60 | SSRMS/ERA lineage; largest uncertainty |
| Acceptance & metrology suite | 8 | 20 | Instrument-class; vacuum calibration |
| Prox-ops aids, keep-out monitor | 5 | 12 | |
| Comms (X-band HGA/LGA, proximity link) | 4 | 10 | |
| Propellant-module berths × 4 | 8 | 20 | §7.9 |
| DDU (independent disposal) | 10 | 25 | Small independent spacecraft |
| Flight software, safety kernel, simulators | 10 | 25 | |
| Systems engineering, project management, integration and test | 25 | 55 | ~15–17% of hardware |
| **0B total** | **180** | **427** | |
| Less commonality/commercial-bus credit (−10%) | 162 | 384 | |
| **0B recommended range** | **≈160** | **≈380** | **Central $250M** |

### 13.3 Options and related costs carried elsewhere

| Item | $M | Carried in |
|---|---|---|
| 6 kt extension (option, gated) | 15–35 + launch | bom-0-13 option |
| Water berth (C-type only) | 5–15 | bom-0-13 option |
| Launch, 2 elements | 90–300 | bom-0-8 |
| Operations | 6–15/yr | bom-0-10 |
| Ground contacts | 1–3/yr | bom-0-9 |
| ORU spares set | 15–35 | bom-0-14 |
| Contingency (recommended 35–40% on 0B, given low maturity) | 55–150 | bom-0-17 |

**Indicative node life-cycle cost** (0B + launch + 10 yr ops + spares, excluding contingency): ≈ $340–880M. This is the number KDP-0B should see, not $250M alone.

### 13.4 Where I disagree with the round-2 figures

1. **$200–600M is too wide and conflates tiers.**
   - My Tier 1 bottom-up is $160–380M.
   - $600M is consistent only with Tier 2 (servicing, fluid transfer, power hub), which I reject for Phase 0. Tier 2 duplicates bom-0-4, 0-14 and 0-16 and serves Phase 1.
   - The lower bound can go below $200M with a commercial bus and a pallet-not-parts design.
   - **Proposed figure: $160–380M, central $250M. Confidence: low-to-medium.** It rises to medium once PDS-01 and the pallet ICD are frozen.
2. **Quantity "1" should be "0–1".** Tier 0 is a legitimate outcome if Phase 1 is co-located and on time. The 0B gate should explicitly choose the tier.
3. **Gemini's omission from the BOM is wrong.** Even in Tier 0, the custody-transfer, acceptance and passive-safety functions need an owner and a budget (≥ $20–40M).
4. **Ownership split.** Phase 0 should carry the acceptance, storage and safety functions, roughly 75–85% of the Tier 1 cost. Piece-issue robotics, power export and any manufacturing interface should be charged to Phase 1. This should be negotiated in the bom-0-7 demand contract.
5. **Hidden cost visibility.** Launch at $90–300M and contingency at $55–150M are comparable to node hardware. The round-2 figures do not state whether launch was included. Here it is excluded and flagged.

---

## 14. Risk assessment

| # | Risk | L | C | Mitigation |
|---|---|---|---|---|
| R1 | Phase 1 location changes away from SEL1 after node ATP | M–H | H | Node ATP gated on the Phase 1 location decision; EP allows slow relocation of an empty node; Tier 0 fallback |
| R2 | Earth-impact analysis fails to close; licence refused | M | **Very high** | CT-RN-3 in 0A with independent review; inventory cap; DDU; lunar DRO as formal alternate |
| R3 | Heliophysics community objects to plumes / proximity | M | H | Early MOUs; RN-CON rules; argon preference; orbit phasing |
| R4 | Phase 1 slips → inventory growth beyond 3 kt | H | M | Contractual Phase 0 throttle; 6 kt option only by gate |
| R5 | Acceptance disputes (mass, grade) | M | M | Three independent mass methods; certificates; signed PDS-01; archive coupons |
| R6 | bom-0-3 product misses FN-A (S, P, inclusions) | M–H | M | FN-B grade accepted; node acceptance does not depend on grade |
| R7 | Large-mass docking anomaly damages LBI | L–M | H | Two LBIs; tug-side rate damping; 1.5× structural reserve; abort monitoring |
| R8 | Single-point failure of node avionics with inventory aboard | L | Very high | Dual string; safety kernel; independent DDU; ≥ 30-day passive-safe autonomy |
| R9 | Iodine deposition on optics/latches | M | M | Plume geometry; argon alternate; contamination witness plates |
| R10 | Launch cost/availability to C3 ≈ −0.7 | M | M | Two-element split fits multiple vehicles; super-heavy option |
| R11 | Mass growth > 35 t | M | M | 20% margin; extension deferred; DDU mass capped |
| R12 | Command-link compromise | L | Very high | SDLS, two-person rule, safety kernel veto |
| R13 | Tug propellant throughput (250–600 t/yr) overwhelms 4 PM berths | M | M | Berths scale like pallet berths; cadence analysis with bom-0-16 |

---

## 15. Open engineering questions

1. **Biased station-keeping:** what is the actual Δv cost, and the achievable probability of sunward departure, for a 3 kt stack in a Class-I SEL1 halo, under realistic navigation and manoeuvre errors? This is the single most important number for this item.
2. **Long-term heliocentric return:** what fraction of interior-branch departures re-encounter Earth within 100 years, and does RN-SAFE-01 hold without Phase 1 consumption?
3. **Pickup-ion signature:** what are the quantitative signatures of I⁺ and Ar⁺ from the node and tugs at existing L1 composition instruments, and what separation or cone rules suffice?
4. **Product form:** is Phase 1's preferred form billets, plate, wire coil or powder? This changes the SPU, the pallet, and whether piece-issue robotics are needed at all.
5. **In-space C and O measurement:** can C and O be measured to FN-A limits in vacuum, or is certificate-plus-coupon acceptance contractually sufficient?
6. **Pallet size:** is 150 t optimal? Smaller pallets (≈ 75 t) ease the transporter and latches but double operations. Larger pallets (300 t) halve operations but raise docking and transporter loads.
7. **Tug propellant logistics:** should propellant modules be delivered to the node or to a separate high-Earth-orbit pickup point? This depends on the bom-0-8 vehicle mix and tug trajectories.
8. **Lunar DRO alternate:** does its stability outweigh its larger Earth-proximity consequence and higher capture Δv? A joint D-04 analysis is required.
9. **Inertial mass method:** can EP thrust be calibrated in flight to ±1%, for example using radiometric Δv on a known-mass empty node during commissioning?
10. **Ownership:** will Phase 1 accept title at node acceptance, and the end-of-life obligation to consume or relocate inventory?

---

## 16. Decisions requested

1. **Adopt Tier 1** (Passive Pallet Depot) as the bom-0-13 reference. Tier 0 is the fallback; Tier 2 is excluded from Phase 0.
2. **Replace the round-2 range** ($200–600M) with **0A $5–12M (+$5–12M in bom-0-11) and 0B $160–380M (central $250M)**, at low-to-medium confidence.
3. **Classify CT-RN-3 (passive-safe inventory) as project-ending** for KDP-0B under D-02. All other node technologies are reversible and need TRL 6 by PDR.
4. **Adopt the interim ceilings in RN-SAFE-01/02 under D-03**, and open heliophysics coordination in 0A.
5. **Add lunar DRO as the formal alternate** in the D-04 re-decision.
6. **Require a signed PDS-01 and a Phase 1 end-of-life inventory obligation** as entry criteria for node ATP.