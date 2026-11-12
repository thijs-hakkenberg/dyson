---
bomId: "bom-0-8"
itemName: "Earth-to-Space Launch and Delivery"
itemSlug: "launch-delivery"
modelId: "claude-opus-5-5"
modelName: "Claude Opus 5.5"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-8: Earth-to-Space Launch and Delivery (0A + 0B)

**Project Dyson, Phase 0 (revised architecture). Proposal Rev A, for the configuration-controlled baseline.**
All costs are in constant 2026 USD. Masses are metric tonnes (t) and kilotonnes (kt).

---

## 0. Position in One Page

1. **Launch high, never spiral.** Every Phase 0 element leaves Earth on a direct high-energy trajectory, a low-energy transfer to SEL1 at C3 ≈ −0.7 km²/s². I reject LEO aggregation followed by an electric-propulsion (EP) spiral as the baseline. MW-class arrays would loiter for months in the most congested debris band and would take Van Allen belt dose. Under the ALARP debris posture (D-03), that is hard to justify.

2. **SEL1 is the single delivery gateway.** The Phase 1 receiving node (bom-0-13) is already at SEL1. Everything Earth-launched is handed over there. The MW tugs (bom-0-4) carry site hardware, spares and site propellant to the NEA on their outbound legs, which would otherwise fly empty. The heliocentric leg is therefore a marginal cost, not a separate delivery fleet.

3. **One module standard, dual-sourced.** All hardware is designed as "Class M" modules: ≤12.0 t separated mass at C3 = −0.7, inside a Ø4.5 m × 10 m envelope. That fits at least two vendors' rockets. Super-heavy vehicles (Class H) are a bundling upside, not a design dependency. This has a direct consequence for bom-0-4: **tugs should launch as at most two modules of ≤12 t each, which points to roughly 1.2–1.5 MWe per tug.** The 2.5 MWe top of the round-2 range does not survive this constraint unless refuelled super-heavy delivery to C3 ≈ 0 is demonstrated before KDP-0B.

4. **Propellant is most of the mass, so it is a separate sub-line.** Earth-launched EP propellant is 50–65% of the launched mass in the central case. It scales with 0B throughput × duration. Hardware mass is nearly fixed. Carrying them as one number hides the decision the 0B gate actually has to make.

5. **The numbers:**
   - **Launched mass:** 2.4 kt central, 1.3–4.5 kt P10–P90.
   - **Cost:** 0A ≈ $0.42B firm request. 0B ≈ $9.3B P50 (P10–P90 $4–16B) as a planning value, re-sized at the gate.

6. **Earth-supply benchmark (my most important finding).** This line also supplies the price model for the Earth-supplied-material fallback. Phase 0 pays a "launch tax" of about 30–45% of the benchmark price on every kilogram of product, regardless of launch price. As launch gets cheaper, the non-launch costs of 0B do not fall, so 0B's relative economics get *worse*. The economic gate at KDP-0B must use the same price model on both sides.

---

## 1. Scope and Boundaries

### 1.1 What bom-0-8 owns

| Sub-line | Content |
|---|---|
| **8a Hardware delivery** | Launch services for every Phase 0 hardware element. Payload adapters and dispensers. Passive-cargo pallets. Integration, mission assurance, launch-site campaign services. Delivery to SEL1 handover, or to C3 hand-off for self-propelled scouts and the pathfinder. |
| **8b Propellant delivery** | Launch of sealed EP propellant cartridges. The Earth Departure Carrier (EDC) bus that takes them to SEL1 handover. |
| **8c Delivery infrastructure** | Leased integration facility and iodine handling cell. Launch-campaign management. Launch-price indexing. Delivery ICD control. |

### 1.2 What bom-0-8 does not own

| Item | Owner |
|---|---|
| Propellant commodity, supply audit, cartridge manufacture and filling | bom-0-16 |
| Tug hardware, tug operations, outbound-leg propellant consumption | bom-0-4, bom-0-10, bom-0-16 |
| Ground stations and DSN-equivalent time for EDC tracking | bom-0-9 |
| Launch-loss reserve | bom-0-17 (recommended value given in §11) |
| Disposal policy | bom-0-15 (bom-0-8 implements it for upper stages and EDCs) |
| Earth-supplied-material fallback | Phase 1 cost. bom-0-8 supplies only the price model. |

### 1.3 Handover definition

"Delivered" for 8a and 8b means: the item is in the SEL1 operations volume, a halo of A_z ≈ 300,000–700,000 km, outside the solar exclusion zone. It is also passivated or held by the receiving node or a tug, and its health has been checked. After handover, bom-0-4 owns the "delivered at operating location" leg.

Three prices are always reported separately:

| Symbol | Meaning |
|---|---|
| **P_LEO** | Price per kg to low Earth orbit (reference only; not used for Phase 0 delivery) |
| **P_dep** | Launch-service price per kg at Earth departure, C3 = −0.7 |
| **P_hand** | Fully burdened price per kg at SEL1 handover |
| **P_site** | Price per kg at the NEA site. Reported as a memo with bom-0-4/0-16 allocations shown, not double-counted. |

---

## 2. Design Philosophy

| # | Principle | Consequence |
|---|---|---|
| P1 | Launch high; no LEO loitering of large structures | Direct injection to SEL1 transfer. LEO-depot routes stay study-only. |
| P2 | Design to the second-best launcher | Class M = 12 t at C3 −0.7. Super-heavy capacity is used by bundling, never assumed. |
| P3 | Outbound tug legs are free capacity | No dedicated deep-space delivery fleet. Site cargo is staged at SEL1. |
| P4 | Risk-tier the manifest | Propellant (fungible, loss-tolerant) flies on new or discounted vehicles. Unique critical hardware flies on mature vehicles. |
| P5 | No single launch failure removes more than one-third of any critical function | Drives module splits for the plant and power (Requirement DEL-006). |
| P6 | Self-insure through spares and functional redundancy | No commercial insurance; premiums are 8–12%. A loss reserve is held in bom-0-17. |
| P7 | Swap containers, don't transfer fluids | Iodine moves as sealed cartridges that mate mechanically, avoiding in-space solid or vapour transfer. |
| P8 | Price symmetry | The same P_dep model is used for Phase 0 cost and for the Earth-supply benchmark. |

---

## 3. System Architecture

### 3.1 Flow

```
                    EARTH  (integration facility + iodine handling cell, Florida)
                      |
      +---------------+----------------+--------------------+
      | Class S              | Class M (≤12 t)        | Class H (bundle 6–8 M)
      | ESPA-Grande rideshare| FH / Vulcan / NG+kick  | refuelled super-heavy
      | scouts 200–600 kg    | / Starship expendable  | (upside, not baseline)
      v                      v                        v
   C3 ≈ −0.7…+2       DIRECT INJECTION, C3 ≈ −0.7 km²/s²  (belts crossed in hours)
   (self-propelled      upper stage → heliocentric disposal (LGA-biased) or Earth reentry
    EP scouts →                 |
    NEA targets)                v   90–120 d low-energy transfer, TCM+insertion ≤ 50 m/s
                     +------------------------------------------+
                     |   SEL1 GATEWAY (halo, A_z 0.3–0.7 Mkm)   |
                     |   bom-0-13 receiving node                |
                     |   - parks EDC/pallets (passive targets)  |
                     |   - tugs mate cargo + I2 cartridges      |
                     +----------------+-------------------------+
                          ^           |  outbound: site hardware, spares, site I2
         Fe-Ni product    |           v  (marginal Δv cost only)
         (inbound)        |   +----------------------------+
                          +---|  MW CARGO TUGS (bom-0-4)   |
                              |  1.2–1.5 MWe recommended   |
                              +--------------+-------------+
                                             v
                                   TARGET NEA SITE (bom-0-2/3/5/6)
```

### 3.2 Delivery-mode trade

| Mode | Description | P_hand (central) | Debris / ALARP | Schedule | TRL (2026) | Verdict |
|---|---|---|---|---|---|---|
| **D: Direct high-energy injection** | Class M to C3 −0.7, low-energy transfer to SEL1 | $3.8k–4.7k/kg | Good: belts crossed in hours; stages disposed heliocentric | 3–4 months, no window constraint | 9 (DSCOVR, SOHO, ACE heritage) | **Baseline** |
| R: Refuelled super-heavy | 80–100 t per departure, 3–6 tanker flights | $1.5k–4k/kg | Good, but many LEO flights | Fast | 5 (orbital transfer demo pending) | **Upside**; bundles Class M units |
| L: LEO aggregation + tug spiral | Tug spirals 7.7 km/s from LEO with cargo | ≈ P_LEO × 1.5 + tug time ≈ $2.5k/kg | Poor (see note) | Spiral 1–18 months, mass-dependent | 6–7 | **Rejected** for tugs |
| P: LEO depot + dedicated cislunar EP shuttle (propellant only) | Iodine to LEO, small shuttle to SEL1 | $1.8k–2.5k/kg | Moderate | Slow but continuous | 4 | **Study** until KDP-0B; could save $1–2B in the central case |
| K: Chemical kick stage from LEO | Separately launched kick stage, LEO rendezvous | ≈ P_LEO × 2.6–3 | Moderate | Fast | 6 | Inferior to D or R |

**Why Mode L is rejected:**
- A 1.5 MWe tug carries about 4,000–4,500 m² of array.
- In the 600–1,200 km band, that gives order 10⁻² expected ≥1 cm debris impacts per tug spiral. Exposure is 1.5–18 months depending on cargo.
- It also takes inner-belt dose of roughly 5–15% power loss even with 150 µm coverglass.

### 3.3 Why SEL1 suits launch (input to D-04)

- SEL1 is the cheapest Lagrange destination from Earth, at C3 ≈ −0.7. That is similar to a lunar transfer, so launcher performance tables apply directly.
- The insertion Δv on a stable manifold is near zero.
- **There is no launch window tied to NEA synodic periods.** Departures can be bought any month, which lowers price in a flexible-date market.

Moving the gateway to SEL4/L5 would push hardware C3 to roughly +1 to +3 with phasing time. That would cost launch capacity and add 1–2 years of delivery latency. This is a launch-side argument *for* D-04. It should be weighed at the 0B gate, not assumed.

---

## 4. Mass Ledger

### 4.1 Phase 0A (launches about 2028–2031)

| Element | Low | Central | High | Basis |
|---|---|---|---|---|
| EP rendezvous scouts (bom-0-1) | 0.8 t | 2.4 t | 6.0 t | 4–10 × 200–600 kg; central 6 × 400 kg |
| 0A pathfinder (bom-0-12) | 6 t | 12 t | 24 t | Sub-MW SEP demo plus processing, EDC and cartridge demo; 1–2 Class M |
| Subsystem flight demos (iodine cluster, array deploy, RPO) | 0.5 t | 1.5 t | 4 t | Rideshares |
| **0A total** | **~7 t** | **~16 t** | **~34 t** | |

### 4.2 Phase 0B hardware (8a)

| Element (owner) | Low | Central | High | Basis |
|---|---|---|---|---|
| Cargo tugs (bom-0-4) | 180 t | 340 t | 720 t | Low: 10 × 18 t. Central: 14 × 24 t (two-module, 1.2–1.5 MWe at ~16 kg/kWe all-in). High: 18 × 40 t (2.5 MWe). |
| Mining robots (bom-0-2) | 15 t | 30 t | 60 t | 15–40 units × 0.5–1.5 t |
| Processing plant (bom-0-3) | 80 t | 160 t | 300 t | Fe-Ni beneficiation and reduction for 0.6–2.5 kt/yr |
| Site power, storage, radiators (bom-0-5) | 40 t | 80 t | 160 t | 2–6 MWe at 12–20 kg/kWe; 0.5–15 MWh storage |
| Water pilot (bom-0-6) | 0 | 0 | 30 t | Only if a C-type target is confirmed |
| SEL1 receiving node (bom-0-13) | 20 t | 40 t | 80 t | |
| In-space comms elements (bom-0-9) | 1 t | 3 t | 6 t | |
| Debris/contamination hardware (bom-0-15) | 3 t | 8 t | 20 t | |
| Spares (bom-0-14) | 51 t | 132 t | 413 t | 15% / 20% / 30% of the items above |
| Pallets and EDC tare on passive cargo (bom-0-8) | 21 t | 45 t | 107 t | ~10% of passive (non-tug) cargo |
| **8a total** | **~0.41 kt** | **~0.84 kt** | **~1.9 kt** | |

### 4.3 Phase 0B propellant (8b)

The demand basis is 0.15–0.35 kg of Earth-launched iodine per kg of product delivered to SEL1:
- Round-trip SEL1↔NEA Δv of 3–6 km/s.
- Isp of 2,000–3,000 s.
- Payload of 150–300 t per trip.
- Plus the outbound hardware haul.

The final demand number belongs to bom-0-16. I use it here only to size launches.

| Case | Product | Net iodine | Gross launched (12% tare) |
|---|---|---|---|
| Low | 0.6 kt/yr × 4 yr × 0.15 | 0.36–0.4 kt | 0.45 kt |
| Central | 1.3 kt/yr × 5 yr × 0.215 | 1.4 kt | 1.57 kt |
| High | 2.2 kt/yr × 6 yr × 0.23 (or harder Δv) | 3.0 kt | 3.36 kt |

### 4.4 Totals

| | Low corner | Central | High corner | P10–P90 |
|---|---|---|---|---|
| Launched mass | 0.87 kt | **2.43 kt** | 5.3 kt | **1.3–4.5 kt** |

At the central case, propellant is about 65% of launched mass.

**Launch count, central:**
- Hardware: about 0.84 kt ÷ ~10.5 t average fill ≈ 80 Class M launches.
- Propellant: 1.57 kt ÷ 12 t ≈ 131 Class M launches.
- Total: about **210 Class M-equivalents over about 8 years, roughly 25 per year.**
- If Class H is available, this becomes about 27 super-heavy departures plus 80–160 tanker flights.

---

## 5. Technical Specifications

### 5.1 Payload classes

| Class | Max separated mass @ C3 −0.7 | Usable envelope | Interface | Qualified vehicles (planning) |
|---|---|---|---|---|
| **S** | 0.6 t per port | ESPA-Grande volume | 24″ (610 mm) ESPA port | Any lunar or escape primary with ESPA ring |
| **M** | **12.0 t** (11.5 t design + 0.5 t margin) | Ø4.5 m × 10.0 m | 2624 mm clampband; 1575 mm alternate | Falcon Heavy (expendable centre), Vulcan VC6, New Glenn with kick stage, Starship expendable; Ariane 64 at ≤8.5 t derated |
| **H** | 80–100 t (6–8 Class M) | Ø8 m × 17 m | Multi-module adapter (MMA) carrying 6–8 Class M interfaces | Refuelled super-heavy |

**Class H rule:** no element may be designed to Class H alone. Every Class H manifest must be decomposable into Class M manifests at a known cost penalty.

**Launch vehicle capacity figures** (FH ~18–20 t, Vulcan VC6 ~12 t, Ariane 64 ~8.5 t at TLI-class C3) are planning assumptions. Vendor-confirmed numbers are an early 0A deliverable.

### 5.2 Design environment envelope (Class M, enveloping qualification)

| Parameter | Value |
|---|---|
| Quasi-static loads | +6.0 / −2.0 g axial; ±2.0 g lateral (combined; coupled loads analysis per vehicle) |
| Random vibration | 10.0 grms at acceptance; qualification at +3 dB / 2 min per axis |
| Acoustic | 142 dB OASPL at qualification |
| Separation shock | 2,000 g SRS (1–10 kHz) at the interface |
| Fundamental frequency | ≥ 10 Hz lateral, ≥ 25 Hz axial, stowed |
| Venting and thermal | Standard fairing depressurisation; ascent heat flux ≤ 1,135 W/m² at fairing jettison |

Starship's environment is not fully published. The MMA must attenuate it to this envelope.

### 5.3 Trajectory specification (SEL1 delivery)

| Parameter | Value |
|---|---|
| Injection energy | C3 = −0.6 to −0.8 km²/s². A lunar-flyby variant up to +2 is allowed for heliocentric-bound stages. |
| Transfer time | 90–120 days |
| Correction and insertion budget | Trajectory corrections 10–40 m/s; halo insertion 0–20 m/s. **EDC allocation 60 m/s.** |
| Station-keeping before capture | ≤ 5 m/s per year; parked passive units are captured within 180 days |
| Upper-stage disposal | Targeted to a heliocentric escape that does not return to the Earth–Moon system for ≥100 years, or to Earth reentry for reusable stages. No stage remains in cislunar space. Owned by bom-0-15; implemented here. |

### 5.4 Earth Departure Carrier (EDC)

The EDC is a cheap, series-produced, passive-at-arrival bus.

```
      +-------------------------------------------+
      |  EDC bus (Ø4.2 m ring, 1.6 m tall)        |
      |  - 2x I2 cartridges (5.3 t net each)      |  <-- cartridges are bom-0-16 hardware
      |  - green monoprop (AF-M315E/ASCENT) 60 m/s|
      |  - 1.5 kW array, 8 kWh battery            |
      |  - S-band TT&C, 2 LGA                     |
      |  - fiducials, retroreflectors, RF beacon  |
      |  - grapple fixture + 4x cartridge latches |
      +-------------------+-----------------------+
                          | 2624 mm clampband
                    [ launch vehicle ]
```

| Parameter | Specification |
|---|---|
| Dry mass | 550–700 t × 10⁻³ (i.e. 550–700 kg) |
| Monoprop load | ~340 kg at Isp 240 s for 60 m/s on 12 t |
| Payload (propellant variant) | 2 cartridges, 10.6 t net iodine, ~0.6 t cartridge shells (counted in tare) |
| Payload (cargo variant) | Pallet adapter for passive hardware up to 10.8 t |
| Payload efficiency | ~88% net iodine / separated mass |
| Thermal | Iodine cartridges held at 0–40 °C in cruise (vapour pressure 0.04 kPa at 25 °C) with sealed valves. No sublimation heating; heating is done by the tug at use. |
| Life | 1 year powered, then passivation (battery discharge, monoprop vented) |
| Lifetime quantity | ~130 propellant + ~40 cargo variants at the central case |
| Unit cost target | $3.5M (range $2.5–5M) at quantity ≥100 |

### 5.5 Cartridge interface (EDC ↔ tug)

This is owned jointly by bom-0-8, bom-0-16 and bom-0-4.

| Parameter | Specification |
|---|---|
| Cartridge geometry | Ø1.30 m × 1.25 m cylinder; 5.3 t net cast iodine (density ~4.5 effective, 4.93 theoretical) |
| Shell material | Titanium or Hastelloy-lined, because iodine attacks aluminium |
| Shell mass | ~300 kg each, including heaters, sublimator interface and latch |
| Mating | Four-point mechanical latch with heated dry-mate vapour coupling and a 28-pin power/data connector |
| Mate method | Tug-side manipulator or berthing. **No fluid or vapour transfer across a mated joint before the cartridge is latched and leak-checked.** |
| Leak rate | ≤ 1×10⁻⁵ mbar·L/s helium-equivalent per sealed cartridge (contamination requirement for co-manifest) |

---

## 6. Interfaces

| Interface | Counterpart | Key parameters | Status |
|---|---|---|---|
| ICD-8-4 | bom-0-4 tugs | **Tug ≤2 Class M modules**; in-space mate of core and power modules; tug launches with ≤0.5 t iodine and fills at SEL1 | **Contested (see §12)** |
| ICD-8-16 | bom-0-16 propellant | Cartridge handover at launch site; acceptance leak test; hazmat transport | Draft |
| ICD-8-13 | bom-0-13 node | Capture of passive EDCs and pallets; parking ≤ 20 units; node has active proximity-operations role | Draft |
| ICD-8-3/5/2 | Plant, power, robots | Module split satisfying DEL-006; Class M envelope; stowed-array loads | Draft |
| ICD-8-9 | bom-0-9 comms | EDC S-band: ≤8 kbps up / 64 kbps down at 1.6 Mkm; 2 × 1 h contacts per day in cruise; commercial ground network with 13 m apertures | Draft |
| ICD-8-15 | bom-0-15 debris | Stage disposal; EDC end-of-life drift to heliocentric orbit (≤5 m/s), or retention at node as scrap | Draft |
| ICD-8-12 | bom-0-12 pathfinder | Carries the EDC and cartridge-exchange demo | Required for TRL 6 |

### 6.1 Requirements

| ID | Requirement |
|---|---|
| DEL-001 | Every hardware element shall be launchable as one or more Class M units on ≥2 independent launch vehicle families. |
| DEL-002 | No Phase 0 element shall remain in LEO for more than 14 days, except launch-vehicle operations. |
| DEL-003 | All upper stages shall be disposed per §5.3. Disposal success probability ≥ 0.999 per stage, consistent with a debris threshold tighter than 99%. |
| DEL-004 | P_LEO, P_dep, P_hand and P_site shall be reported separately in all cost products. |
| DEL-005 | Iodine cartridges shall not share a fairing with optics or unshielded arrays, except on Class H with an MMA barrier and verified leak rates. |
| DEL-006 | Loss of any single launch shall remove ≤1/3 of any critical function: plant throughput, site power, tug-fleet capacity, or node capture. |
| DEL-007 | The Earth-supply benchmark used at KDP-0B shall use the same price model and vintage as the bom-0-8 estimate. |
| DEL-008 | Passive delivered units shall survive ≥180 days parked in halo orbit, unattended, in safe mode. |

---

## 7. Autonomy, Control and Communication

**Intelligence lives in the tug and node, not the EDC.** The EDC is a cooperative passive target with a cheap bus. Proximity-operations autonomy (relative navigation, collision avoidance, capture) sits in bom-0-4 and bom-0-13 and is reused across about 170 captures. This keeps EDC cost near $3.5M.

**EDC autonomy:**
- On-board fault protection with sun-safe hold for ≥7 days without ground contact.
- Autonomous execution of uplinked correction burns.
- Self-passivation on loss of signal for more than 30 days after handover.
- Navigation by ground ranging and Doppler. The 1.5 Mkm light-time of about 5 s makes ground-in-the-loop practical down to about 1 km. Below 100 m, closure is autonomous on the tug or node side.

**Data volume:** under 100 MB per EDC over its whole life. That is negligible against bom-0-9 capacity. I agree with the round-2 rejection of the 2.5 TB/day figure.

**Launch-campaign operations:** about 25 campaigns per year. Payload-processing staff are inside 8c. Flight operations of EDCs after separation belong to bom-0-10: one shared console, plus 2–4 FTE during peak cadence.

---

## 8. Manufacturing and Launch-Site Operations

- **EDC series production.** About 170 units: one bus design and two payload variants (propellant, cargo). This is classic constellation-style manufacturing; build rate 2–3 per month at peak. Contract it as one firm-fixed-price production contract with a second source qualified at unit 20.

- **Cartridges** are bom-0-16 hardware. They are filled at the supplier and arrive sealed. Iodine (UN 3495, Class 8 corrosive with toxic subsidiary hazard) is far easier to handle at a launch site than hydrazine or xenon high-pressure loading:
  - No pad fuelling.
  - A ventilated cell with iodine vapour monitoring (exposure limit 0.1 ppm ceiling).
  - Scrubbers and spill kits.
  - Estimated $15–30M to build or lease.

- **Integration facility.** Leased commercial payload processing, Florida first, with a second site later. Throughput: 3 Class M units per month at peak.

- **Argon alternate (D-05).** High-pressure composite tanks give a tank fraction of 20–30% against about 6% for iodine. Gross propellant launched mass rises about 20%, adding roughly **$0.9–1.0B in the central case.** Argon also needs pad high-pressure loading or cryogenic handling. This is a quantified launch-side input to the D-05 propellant decision.

---

## 9. Procurement and Manifest Strategy

1. **Block-buy delivery-to-C3 services**, not vehicles. Use indefinite-quantity contracts with ≥2 Class M vendors, with price indexed to a published launch-price index. **No vendor should carry more than 60% of hardware mass. Propellant may be concentrated.**

2. **Risk tiers:**
   - Tier 1 (unique or critical: plant modules, node, tug cores) flies only on vehicles with ≥10 consecutive successes.
   - Tier 2 (tugs beyond the first 4, spares) flies on any qualified vehicle.
   - Tier 3 (propellant) flies on early-flight or discounted vehicles. It is the programme's market shock absorber.

3. **Self-insurance.** At 1–3% failure rates over about 210 launches, expect 2–6 losses. Recommended bom-0-17 reserve: **5% of 8a + 8b launch value (~$0.45B central)**, plus 2 spare EDCs in rolling stock.

4. **Delivery sequence:**
   - Node first.
   - Then 4 tugs plus the first site cargo.
   - Then the remaining tugs interleaved with site cargo.
   - Then propellant as steady-state flow sized to demand.

---

## 10. Development Roadmap and Technology Readiness

### 10.1 Technology readiness

| Technology | TRL 2026 | Project-ending? | Required at KDP-0B | Path |
|---|---|---|---|---|
| Heavy-lift to C3 ≈ −0.7 | 9 | No | 9 | Commercial |
| Low-energy SEL1 transfer and halo insertion | 9 | No | 9 | Heritage |
| Refuelled super-heavy high-energy delivery | 5 | No (cost driver only) | Not gating | Watch; Class H bundling if available |
| Iodine bulk cartridge (5 t class), long-life sealed storage | 3 | **Yes** (with the iodine baseline) | 6 | Ground life test 2027–29; 0A pathfinder flight |
| Cartridge mate and heated vapour coupling in space | 3 | **Yes** | 6 | Ground thermal-vacuum 2028; 0A flight demo at SEL1 |
| Autonomous capture of passive targets in halo orbit | 5 | Yes (node/tug side) | 6 | 0A pathfinder; LEO heritage (MEV, cargo craft) |
| MW-class stowed arrays under Class M loads | 4 (at MW scale) | Yes (bom-0-4/5 owns) | 6 | Stowed-array qualification in bom-0-11 |
| Two-module tug in-space mating | 4 | Yes | 6 | Bom-0-4 demo; 0A pathfinder if its power module is split |

Under D-02, the cartridge interface and the halo capture are critical technologies for this line. Their TRL 6 must come from the 0A pathfinder flight, not from ground tests. **This is the main thing bom-0-8 needs bom-0-12 to carry.**

### 10.2 Schedule

```
2026Q4 ─ ICD-8 baseline; vendor RFIs; launch-price index defined
2027   ─ Class M envelope frozen; EDC SRR; cartridge ground life test start
2028   ─ Scout launches (bom-0-1), Class S; EDC PDR; tug two-module decision (bom-0-4)
2029   ─ EDC CDR; iodine cell operational; cartridge TVAC + mate test (TRL 5)
2030   ─ 0A pathfinder launch(es): EDC prototype + cartridge exchange + halo capture
2031   ─ Demo complete (TRL 6); KDP-0B with refreshed price index & Earth-supply benchmark
2032–34─ 0B emplacement: node, tugs, site (~80 Class M)
2034–39─ Sustainment: propellant + spares (~20–25 Class M per year, demand-sized)
```

---

## 11. Cost Analysis

### 11.1 Price points (2034 central, 2026 USD)

| Price | Low | Central | High | Basis |
|---|---|---|---|---|
| P_LEO, bulk ≥10 t | $700 | $1,500 | $3,000 | Reusable heavy plus super-heavy competition. Reference only. |
| P_dep, hardware (Class M service) | $2,000 | $3,800 | $8,000 | Expendable-centre heavies ~$150–180M per 12 t today, falling with competition. Refuelled super-heavy at maturity sets the floor. |
| P_dep, bulk propellant (Tier 3) | $1,500 | $3,000 | $6,500 | Flexible dates, early-flight discounts, Class H bundling |
| P_hand, hardware | $2,600 | $4,700 | $9,500 | Adds integration, mission assurance, adapters, pallets: about $0.6–1.2k/kg |
| P_hand, net iodine | $1,900 | $3,800 | $8,000 | 12% tare plus EDC ($330/kg) plus operations |
| P_site, marginal (memo) | $3,000 | $5,300 | $11,000 | Adds outbound-leg propellant (0.10–0.17 kg/kg × P_hand iodine) and operations. Tug capex excluded because outbound capacity is otherwise idle. |
| P_site, fully allocated (memo) | — | $6,000–8,000 | — | Includes a tug-capex share. For information only; not budgeted here. |

### 11.2 Phase 0A budget (firm request)

| Item | Low | Central | High |
|---|---|---|---|
| Scout launches (Class S rideshare or one shared dedicated mission) | $60M | $110M | $200M |
| Pathfinder launch(es), 1–2 Class M with mission assurance | $150M | $230M | $400M |
| Subsystem demo rideshares | $15M | $30M | $60M |
| 8c: ICD control, price index, early integration and iodine cell, EDC development to PDR/CDR | $25M | $50M | $80M |
| **0A total** | **$250M** | **$420M** | **$740M** |

EDC development NRE is in 8c here. If bom-0-11 prefers to hold all NRE, move about $30M.

### 11.3 Phase 0B budget (planning value; re-sized at KDP-0B)

| Item | Central | P10–P90 |
|---|---|---|
| 8a hardware launch services: 0.84 kt × $3.8k | $3.19B | $1.0–7.0B |
| 8a integration, mission assurance, adapters: 0.84 kt × $0.7k | $0.59B | $0.3–1.2B |
| 8b propellant launch services: 1.57 kt gross × $3.0k | $4.71B | $1.0–9.0B |
| 8a/8b carriers: ~130 propellant EDCs + ~40 pallets at $3.5M | $0.60B | $0.3–1.0B |
| 8c launch-site operations, campaign management, facility | $0.25B | $0.15–0.4B |
| **0B total** | **$9.3B** | **$4–16B** |
| *Memo (bom-0-17): self-insurance reserve* | *$0.45B* | *—* |
| *Memo: Mode P propellant route, if adopted* | *−$1.0B to −2.0B* | *—* |
| *Memo: argon instead of iodine* | *+$0.9B to +1.0B* | *—* |

The P10–P90 band is narrower than the product of the corner cases because mass and price are partly correlated: low demand tends to coincide with high prices, through fewer block-buy discounts.

### 11.4 Sensitivity (central ±)

| Driver | Swing |
|---|---|
| Propellant intensity (0.15 → 0.35 kg/kg) | −$1.9B / +$3.4B |
| P_dep (refuelled super-heavy mature vs. not) | −$4.5B / +$7B |
| 0B production duration (4 → 6 years) | −$1.0B / +$1.0B |
| Tug power (1.2 vs. 2.5 MWe at fixed fleet power) | ±$0.5B. A small direct effect, but it affects Class M feasibility. |

### 11.5 The Earth-supply benchmark (for the KDP-0B economic gate)

Earth-launched Fe-Ni or steel at the SEL1 node costs about P_hand for bulk: **about $3.5–4k/kg central**.

Phase 0's launch tax per kilogram of product (central, 6.5 kt delivered over 0B):
- Hardware: 0.13 kg/kg × $4.7k ≈ $600/kg
- Propellant: 0.215 kg/kg × $3.8k ≈ $820/kg
- **Total ≈ $1.4k/kg, about 37% of the benchmark**

Because both terms scale with launch price, the tax is **about 30–45% of the benchmark at any launch price.** The remaining 55–70% must cover everything else in 0B: hardware, operations, NRE amortisation and reserves.

Two worked thresholds:
- **At central prices**, 0B wins only if non-launch 0B cost per kg of product is below about $2.3k/kg. That means non-launch 0B costs must stay under about $15B for 6.5 kt.
- **At a mature $1.5k/kg**, the threshold falls to about $0.9k/kg, or about $6B.

**The crossover sits near P_dep ≈ $2–2.5k/kg. Cheaper launch is a threat to 0B's economic case, not a gift.** This supports D-01's framing of Phase 0 as a capability programme. It also means the economic gate must re-run this calculation with the then-current price index (DEL-007).

---

## 12. Where I Disagree with the Round-2 Figures

| Round-2 figure | My position | Reason |
|---|---|---|
| **Quantity: Claude 2.5–6 kt; Gemini 2.5–3.5 kt; GPT 2.5–8 kt** | **1.3–4.5 kt P10–P90, 2.4 kt central.** 0A only ~0.016 kt. | (a) A floor of 2.5 kt pre-judges 0B scale. D-01 sizes 0B by signed demand, and the low-demand case (0.6 kt/yr × 4 yr) gives about 1.3 kt. (b) An 8 kt top implies either a LEO-spiral gear ratio (which I reject) or counting Earth-supplied fallback material (which belongs to Phase 1). (c) Gemini's 3.5 kt cap is too tight if propellant intensity reaches 0.3 kg/kg. |
| **Cost: Gemini $3–6B total** | Too low as a baseline | It requires P_hand ≤ ~$2.5k/kg across the board. That needs mature refuelled super-heavy delivery: an upside case, not a planning value. |
| **Cost: Claude $3–15B total** | **Broadly agree.** My P50 is $9.3B and P90 is $16B. | My upper tail is slightly higher because I carry propellant at gross (with tare) and add carrier costs. |
| **Cost: GPT $3,000–12,000/kg** | Correct order of magnitude, but **ambiguous** | It mixes LEO and delivered pricing. Restated: P_dep $2–8k, P_hand $2.6–9.5k, P_site $3–11k. Per the accepted scope, these must be kept separate. |
| **Single total for the line** | Replace with a **mass × price model, split 8a/8b/8c** | Propellant (about 65% of mass) scales with throughput × duration. Hardware is nearly fixed. The gate needs to see each separately. |
| **Tugs at 1.0–2.5 MWe (bom-0-4)** | **Recommend 1.2–1.5 MWe, two Class M modules** | 2.5 MWe needs 3–4 in-space-mated modules, or a single super-heavy vendor at C3 ≈ 0. That violates P2 and DEL-001. Fleet power can be held with more units, which also improves DEL-006. |

---

## 13. Risk Assessment

| # | Risk | L | I | Mitigation |
|---|---|---|---|---|
| R1 | High-energy launch prices do not fall below about $5k/kg | M | H | Mode P study; Tier 3 discount buys; re-size 0B at the gate; P90 already carried |
| R2 | Launch prices fall sharply, and the Earth-supply benchmark undercuts 0B | M | H (programme) | DEL-007 symmetric benchmark; capability framing (D-01); this is a gate input, not a mitigation target |
| R3 | Only one vendor can do Class M at 12 t by 2032 | M | H | Derated 8.5 t "Class M-lite" variant; vendor RFIs in 2027; propellant can concentrate on one vendor, hardware cannot |
| R4 | Launch failure loses a unique critical module | M (2–6 losses expected) | M–H | DEL-006 module split; spares; bom-0-17 reserve; Tier 1 manifesting |
| R5 | Cartridge mate or vapour coupling fails, or iodine leaks and corrodes | M | H | Ground life test; 0A flight TRL 6; fallback to cartridges carrying their own sublimators with an electrical-only interface |
| R6 | Iodine contaminates a co-manifested payload | L | M | DEL-005; leak acceptance testing |
| R7 | Cadence or capacity crunch (~25 high-energy launches per year) | M | M | Class H bundling; no NEA window dependence lets the schedule slip without penalty; propellant stock buffered at the node (≥1 year) |
| R8 | Stage disposal failure creates cislunar debris | L | H (licence) | LGA-biased heliocentric disposal; reusable-stage Earth return; DEL-003 |
| R9 | Payload licensing, export control, novel-activity authorisation delays | M | M | Early payload reviews; licence gate under D-02; standard payload ICDs |
| R10 | Tug design cannot meet the two-module Class M limit | M | H | Resolve at 2028 bom-0-4 trade; otherwise accept Class H dependence explicitly at KDP-0B |
| R11 | Long halo parking degrades passive units | L | M | DEL-008; capture within 180 days; parking ≤20 units |

---

## 14. Open Engineering Questions

1. **Which line holds propellant launch: bom-0-8 (my recommendation, one launch-procurement model) or bom-0-16?** Either way, 8b must stay visible as its own sub-line.
2. **Is Mode P (LEO depot plus small cislunar EP shuttle for iodine only) worth a new hardware element?** The $1–2B saving must be weighed against debris and belt exposure for a small, low-cross-section shuttle. Decide by 2030.
3. **Should the cartridge carry its own sublimator** (electrical-only interface), or should the tug sublimate through a heated coupling? The answer drives TRL risk against cartridge mass.
4. **Class M limit: 12 t or 15 t?** 15 t would allow monolithic 1 MWe tugs but may leave one vendor. This needs vendor-confirmed C3 −0.7 performance in 2027.
5. **What happens to empty cartridges and EDCs?** Disposal to heliocentric drift is cheap, at ≤5 m/s. Keeping them at the node as titanium or steel scrap for Phase 1 needs a purity spec from Phase 1.
6. **If D-04 moves the gateway to SEL4/L5 at the 0B gate**, do we accept a C3 penalty of +1 to +3 and longer latency? Or do we keep SEL1 as an Earth-side staging point with a tug shuttle?
7. **How much propellant should be buffered at the node** (1 year proposed) against launch market shocks? This trades against capital tied up in parked iodine.
8. **Starship-class environments:** can a common multi-module adapter attenuate them to the Class M envelope? This is needed before any Class H buy.
9. **Planetary protection:** confirm COSPAR category for the selected NEA. Category I/II is assumed, with no Earth return in Phase 0. Phase 1 product handling is not affected.
10. **Which launch-price index governs KDP-0B, and with what vintage rule?** It must be fixed before the gate so the Earth-supply benchmark cannot be gamed in either direction.

---

**Recommended board actions:**
1. Approve 0A at $0.42B.
2. Carry 0B at $9.3B P50 as a planning value only.
3. Adopt DEL-001 to DEL-008 into the frozen baseline.
4. Direct bom-0-4 to close the two-module, 1.2–1.5 MWe tug trade by 2028.
5. Require bom-0-12 to fly the cartridge-exchange and halo-capture demonstrations so they reach TRL 6 before KDP-0B.