---
bomId: "bom-1-2"
itemName: "PV Blanket Arrays"
itemSlug: "pv-blanket-arrays"
modelId: "claude-opus-4-6"
modelName: "Claude Opus 4.6"
generated: "2026-02-07"
phase: "phase-1"
---



# Technical Proposal: PV Blanket Arrays for Project Dyson — Phase 1 Initial Swarm Deployment

**Document ID:** PD-PH1-PVB-001 Rev A
**Author:** Principal Systems Engineer, Power Generation Subsystem
**Date:** 2025
**Classification:** Open Technical Proposal

---

## 1. Executive Summary

I propose a **thin-film perovskite-on-polyimide blanket array** architecture as the fundamental energy-harvesting element of the Phase 1 Dyson swarm. Each "sail-sat" is a 100m × 100m autonomous PV blanket with integrated attitude control, power conditioning, and RF power transmission, massing under 50 kg. Phase 1 targets deployment of **10,000 sail-sats** in a heliocentric orbit at ~0.7 AU, generating a combined **~1.5 TWe** of usable power beamed to collection stations.

This proposal is opinionated: I believe the critical path to a Dyson swarm is **mass-per-watt at the manufacturing line**, not peak cell efficiency. Every design decision below optimizes for manufacturability, deployability, and radiation tolerance at the expense of laboratory-record conversion efficiency.

---

## 2. Design Philosophy

### 2.1 Core Principles

1. **Mass is the enemy.** Launch cost dominates Phase 1 economics. Every gram must justify itself.
2. **Good enough efficiency, extraordinary specific power.** A 15% efficient cell at 5 g/m² beats a 30% efficient cell at 150 g/m² for swarm economics.
3. **Autonomous by default.** With 10,000+ elements, ground-in-the-loop control is impossible. Each sail-sat must self-manage.
4. **Design for manufacturing, not for the lab.** Roll-to-roll processable materials only. No epitaxial growth, no III-V wafer bonding in Phase 1.
5. **Graceful degradation.** No single-point failures. Partial blanket damage should cause proportional (not catastrophic) power loss.

### 2.2 Why Not Conventional III-V Multi-Junction?

State-of-practice space solar (e.g., IMM 4J cells at ~32% AM0 efficiency) achieves ~350 W/kg at the cell level but ~150 W/kg at the deployed array level (with structure, hinges, deployment mechanisms). At 0.7 AU the solar flux is ~2,800 W/m², which helps, but the structural mass fraction of rigid/semi-rigid arrays kills specific power at scale.

Thin-film blankets can achieve **>1,000 W/kg at the deployed array level** by eliminating rigid substrates entirely. This is the lever that makes a swarm feasible with near-term launch infrastructure.

---

## 3. Technical Specifications

### 3.1 Single Sail-Sat Summary

| Parameter | Value | Notes |
|---|---|---|
| Deployed area | 10,000 m² (100m × 100m) | Square planform |
| Blanket areal density | 3.5 g/m² (PV layers only) | See §4.1 |
| Total system areal density | 5.0 g/m² | Including bus, wiring, ADCS |
| Total sail-sat mass | **50 kg** | Margin-loaded |
| Cell efficiency (AM0, 0.7 AU, BOL) | 18% | Perovskite tandem |
| Cell efficiency (EOL, 10 yr) | 13% | After radiation degradation |
| Solar irradiance at 0.7 AU | 2,790 W/m² | 1/r² from 1,361 W/m² at 1 AU |
| BOL electrical power | **5.02 MWe** | Per sail-sat |
| EOL electrical power | **3.63 MWe** | Per sail-sat |
| Operating voltage (bus) | 600 V DC | High voltage to minimize conductor mass |
| RF beam power (transmitted) | 4.0 MW BOL | ~80% DC-to-RF efficiency |
| Beam frequency | 5.8 GHz | ISM band, mature technology |
| Design lifetime | 10 years | Phase 1 target |
| Stowed volume | 0.5 m³ | For launch packaging |
| Stowed dimensions | 1.0m × 0.7m × 0.7m | Rolled/z-folded |

### 3.2 Phase 1 Constellation

| Parameter | Value |
|---|---|
| Number of sail-sats | 10,000 |
| Total deployed area | 100 km² |
| Total BOL power | **50.2 TWe (thermal-equivalent)** / **~1.5 TWe beamed** |
| Orbit | Heliocentric, 0.7 AU, ecliptic ±5° |
| Orbital period | ~214 days |
| Angular spread | Distributed over ~60° arc initially |
| Total constellation mass | 500 tonnes (sail-sats only) |

*Note: 1.5 TWe beamed accounts for DC-RF conversion (~80%), beam efficiency to rectenna (~85%), and pointing/availability losses (~90%).*

---

## 4. System Architecture

### 4.1 Sail-Sat Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                     SAIL-SAT TOP VIEW (100m × 100m)                │
│                                                                     │
│  ┌───────────┬───────────┬───────────┬───────────┬───────────┐     │
│  │           │           │           │           │           │     │
│  │  PV Zone  │  PV Zone  │  PV Zone  │  PV Zone  │  PV Zone  │     │
│  │   1,1     │   1,2     │   1,3     │   1,4     │   1,5     │     │
│  │  (20×20m) │  (20×20m) │  (20×20m) │  (20×20m) │  (20×20m) │     │
│  ├───────────┼───────────┼───────────┼───────────┼───────────┤     │
│  │           │           │           │           │           │     │
│  │  PV Zone  │  PV Zone  │  PV Zone  │  PV Zone  │  PV Zone  │     │
│  │   2,1     │   2,2     │   2,3     │   2,4     │   2,5     │     │
│  ├───────────┼───────────┼─────┬─────┼───────────┼───────────┤     │
│  │           │           │ BUS │     │           │           │     │
│  │  PV Zone  │  PV Zone  │ HUB │ RF  │  PV Zone  │  PV Zone  │     │
│  │   3,1     │   3,2     │     │ARRAY│   3,4     │   3,5     │     │
│  ├───────────┼───────────┼─────┴─────┼───────────┼───────────┤     │
│  │           │           │           │           │           │     │
│  │  PV Zone  │  PV Zone  │  PV Zone  │  PV Zone  │  PV Zone  │     │
│  │   4,1     │   4,2     │   4,3     │   4,4     │   4,5     │     │
│  ├───────────┼───────────┼───────────┼───────────┼───────────┤     │
│  │           │           │           │           │           │     │
│  │  PV Zone  │  PV Zone  │  PV Zone  │  PV Zone  │  PV Zone  │     │
│  │   5,1     │   5,2     │   5,3     │   5,4     │   5,5     │     │
│  └───────────┴───────────┴───────────┴───────────┴───────────┘     │
│                                                                     │
│  BUS HUB: Central avionics, ADCS, power conditioning                │
│  RF ARRAY: Phased-array microwave transmitter (integrated)          │
│  Each PV Zone: 400 m², independently switchable                     │
│  24 active PV zones + 1 bus/RF zone = 25 zones total               │
│  Active PV area: 9,600 m² (96% fill factor)                        │
└─────────────────────────────────────────────────────────────────────┘
```

### 4.2 Blanket Cross-Section

```
        SUNWARD FACE
  ──────────────────────────────
  │  UV-rejection coating       │  ~0.1 μm   SiO₂ nanoparticle
  ├─────────────────────────────┤
  │  Wide-bandgap perovskite    │  ~0.4 μm   Cs₀.₀₅FA₀.₈MA₀.₁₅PbI₂Br
  │  (1.75 eV top cell)        │            ~20% sub-cell efficiency
  ├─────────────────────────────┤
  │  Recombination interlayer   │  ~0.05 μm  SnO₂/C₆₀
  ├─────────────────────────────┤
  │  Narrow-bandgap perovskite  │  ~0.6 μm   FASnPbI₃ mixed
  │  (1.05 eV bottom cell)     │            tandem boost
  ├─────────────────────────────┤
  │  Transparent back contact   │  ~0.1 μm   ITO or Ag nanowire
  ├─────────────────────────────┤
  │  Polyimide substrate        │  ~2.5 μm   Kapton-type (CP1™)
  ├─────────────────────────────┤
  │  Aluminum conductor grid    │  ~0.3 μm   Vapor-deposited
  ├─────────────────────────────┤
  │  Thermal emissive coating   │  ~0.1 μm   High-ε back surface
  ──────────────────────────────
        ANTI-SUNWARD FACE

  Total thickness: ~4.2 μm
  Areal density:   ~3.5 g/m²
```

**Key material choices and rationale:**

- **CP1™ polyimide substrate (2.5 μm):** Flight-proven on NASA missions (e.g., NanoSail-D2, NEA Scout). Survives >200°C, radiation tolerant, flexible, roll-to-roll compatible. This is the structural backbone.
- **All-perovskite tandem:** Avoids the need for silicon or III-V substrates. Solution-processable via slot-die coating on roll-to-roll lines. The 2-terminal tandem targets 22% lab efficiency, derated to 18% for production + AM0 spectral mismatch.
- **Sn-Pb narrow-bandgap bottom cell:** The tin-lead perovskite at ~1.05 eV captures near-IR photons. Stability is the key risk (see §11).

### 4.3 Structural Architecture

The blanket has **no rigid frame**. Structural integrity comes from:

1. **Solar radiation pressure (SRP):** At 0.7 AU, SRP is ~13 μN/m². On a 10,000 m² sail, this is ~0.13 N — small but continuous. The blanket is designed as a **solar sail with PV coating**, using SRP for partial attitude control and tensioning.

2. **Spin stabilization:** The sail-sat spins at ~0.1 RPM about the sun-pointing axis. Centripetal acceleration at the edges (50m radius): a = ω²r = (0.0105 rad/s)² × 50m ≈ 5.5 × 10⁻³ m/s². On a 50 kg sail-sat, this provides ~0.28 N of tensioning force distributed across the blanket — sufficient to maintain flatness.

3. **Deployable booms (minimal):** Four ultra-lightweight TRAC (Triangular Rollable and Collapsible) booms extend diagonally from the central hub to the corners, each ~71m long. These provide initial deployment guidance and prevent blanket folding during spin-up.

```
                    BOOM 4
                   ╱
                  ╱
    ┌────────────╱──────────────┐
    │           ╱               │
    │          ╱                │
    │         ╱                 │
    │        ╱                  │
    │       ╱                   │
    │      ╱    ┌─────┐        │
    │     ╱     │ HUB │        │
    │    ╱      └─────┘        │
    │   ╱            ╲         │
    │  ╱              ╲        │
    │ ╱                ╲       │
    │╱                  ╲      │
    ╱                    ╲     │
   ╱│                     ╲    │
  ╱ └──────────────────────╲───┘
BOOM 1                    BOOM 2
                  ╲
                   ╲
                    BOOM 3

    Boom material: Elgiloy/CF TRAC
    Boom linear density: ~15 g/m
    Boom mass (×4): 4 × 71m × 15 g/m = 4.26 kg
```

---

## 5. Subsystems Breakdown

### 5.1 Mass Budget

| Subsystem | Mass (kg) | % of Total | Notes |
|---|---|---|---|
| PV blanket (active area) | 33.6 | 67.2% | 9,600 m² × 3.5 g/m² |
| Deployment booms (×4) | 4.3 | 8.6% | TRAC booms, 71m each |
| Central bus structure | 1.5 | 3.0% | CF honeycomb hub |
| Power conditioning (MPPT + DC bus) | 2.0 | 4.0% | Distributed MPPT per zone |
| RF transmitter array | 3.0 | 6.0% | GaN-on-SiC phased array |
| ADCS (sensors + actuators) | 1.2 | 2.4% | Sun sensors, IMU, reflectivity actuators |
| Avionics + comms | 0.8 | 1.6% | Processor, inter-sat link, TT&C |
| Cabling / harness | 1.6 | 3.2% | Al conductors, data lines |
| Thermal management | 0.5 | 1.0% | Passive coatings, hub radiator |
| **Dry mass subtotal** | **48.5** | **97.0%** | |
| Margin (3%) | 1.5 | 3.0% | |
| **Total** | **50.0** | **100%** | |

*No propellant. Station-keeping via SRP modulation only.*

### 5.2 Power Conditioning Subsystem

Each of the 24 PV zones has a local **Maximum Power Point Tracker (MPPT)** implemented as a lightweight DC-DC converter on a flex PCB bonded to the blanket near the zone's collection bus bar.

```
  PV Zone (i,j)                    Central Bus
  ┌──────────┐                    ┌──────────┐
  │ ~400 m²  │──→ Zone MPPT ──→  │  600V DC │──→ RF PA Array
  │ ~210 kWe │   (boost conv.)   │  Main    │──→ Housekeeping
  │ Vmp~120V │   η = 96%         │  Bus     │    (100W)
  └──────────┘                    └──────────┘
       ×24 zones in parallel
```

- Zone Vmp (maximum power voltage): ~120V (series string of ~200 cells)
- MPPT boosts to 600V bus
- Total BOL power to bus: 24 × 201 kW × 0.96 = **4.63 MW**
- Housekeeping draw: ~100 W (avionics, ADCS, comms)
- Power to RF transmitter: ~4.63 MW

### 5.3 RF Power Transmission Subsystem

This is the critical subsystem that converts DC electricity into a directed microwave beam aimed at a collection rectenna (at Earth orbit, lunar surface, or a relay station).

**Architecture:** Centrally-located phased array, 8m × 8m, integrated into the bus zone of the blanket.

| Parameter | Value |
|---|---|
| Transmit frequency | 5.8 GHz (λ = 51.7 mm) |
| Aperture | 8m × 8m = 64 m² |
| Number of elements | ~24,000 (λ/2 spacing) |
| Element type | GaN HEMT MMIC, 200W each |
| DC-to-RF efficiency | 80% (GaN PA at 5.8 GHz) |
| Total RF power (BOL) | 3.70 MW |
| Beam divergence (3dB) | ~0.37° |
| Gain | ~52 dBi |
| Beam EIRP | ~118 dBW |

**Beam link budget to 1 AU rectenna (worst case, 0.3 AU separation):**

- Path loss at 0.3 AU (4.5 × 10¹⁰ m): 20log₁₀(4π × 4.5e10 / 0.0517) = **~199 dB**
- Transmit EIRP: 118 dBW
- Received power density at 1 AU: extremely low per sail-sat

This reveals a critical architectural point: **a single sail-sat cannot deliver a useful beam to Earth at interplanetary distances.** The Phase 1 swarm must operate as a **coherent or incoherent array of arrays.**

**Revised approach — Relay Architecture:**

```
  SAIL-SAT CLUSTER          RELAY STATION           EARTH/LUNAR
  (0.7 AU)                  (0.7 AU, co-orbital)    RECTENNA
                                                     (1.0 AU)
  ┌─────┐
  │SS-1 │──┐
  └─────┘  │    Short-range
  ┌─────┐  │    beam (~1000 km)    ┌──────────┐     Long-range
  │SS-2 │──┼──────────────────────→│  RELAY   │     beam
  └─────┘  │                       │  100m    │────────────────→ ◉
  ┌─────┐  │                       │  antenna │     (coherent    Rectenna
  │SS-N │──┘                       └──────────┘      array)
  └─────┘
  
  Cluster: ~100 sail-sats within 1000 km
  Short-range beam efficiency: >90% (small divergence)
  Relay aggregates power and transmits via large aperture
```

Each **cluster of ~100 sail-sats** beams to a co-orbital relay station at short range (~1,000 km). The relay station has a large antenna (100m+) and transmits the aggregated power to the target rectenna. This is far more mass-efficient than giving each sail-sat a huge antenna.

**Short-range beam (sail-sat to relay):**
- Distance: 1,000 km
- Sail-sat aperture: 8m × 8m
- Beam diameter at relay: ~6.5 km (3dB)
- Relay collection aperture: 100m diameter → captures ~0.02% of beam

This is still very lossy. **Alternative: optical/laser power transmission.**

### 5.3.1 Revised: Laser Power Transmission

I'm going to make an opinionated pivot here. **Microwave beaming from individual sail-sats is impractical at interplanetary distances.** The aperture-to-distance ratio is terrible. Instead:

**Recommendation: Each sail-sat uses a fiber-coupled diode laser array for short-range power beaming to a relay, OR the sail-sats serve as in-situ power sources for co-located industrial processes (asteroid mining, propellant production, manufacturing).**

For Phase 1, I propose the primary use case is **powering co-orbital manufacturing infrastructure** at short range (<100 km), not beaming to Earth.

| Laser Parameter | Value |
|---|---|
| Wavelength | 1070 nm (Yb fiber laser) |
| DC-to-laser efficiency | 50% (conservative for diode-pumped) |
| Laser output per sail-sat | 2.3 MW (BOL) |
| Beam director aperture | 0.5m (lightweight membrane optic) |
| Beam divergence | ~2.6 μrad (diffraction-limited) |
| Spot size at 100 km | ~0.26 m diameter |
| Power density at receiver | ~43 MW/m² (!) |

At 100 km range with a 0.5m optic at 1070 nm, we get a beautifully tight beam. This is the correct approach for Phase 1.

### 5.4 Attitude Determination and Control (ADCS)

**Requirements:**
- Sun-pointing accuracy: ±2° (for PV efficiency; cos(2°) = 0.9994, negligible loss)
- Beam-pointing accuracy: ±0.1 mrad (for laser power transmission at 100 km)
- No propellant (infinite lifetime requirement)

**Approach: Hybrid SRP + Electrochromic Attitude Control**

```
  SRP MODULATION CONCEPT (edge-on view):
  
  Normal operation (face-on to sun):
  
       SUN ──→  ┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃  ──→ SRP force along sun line
                 (blanket face-on)
  
  Pitch/yaw torque generation:
  
       SUN ──→  ┃┃┃┃┃▓▓▓▓▓┃┃┃┃┃  
                      ↑
                 Electrochromic panels on one half
                 switch to high-reflectivity (▓)
                 → differential SRP → net torque
```

- **Electrochromic reflectivity modulators** at blanket edges: strips of electrochromic material that can switch between absorptive (α~0.9) and reflective (α~0.1) states. Differential reflectivity across the blanket creates torques.
- **Spin rate control:** Modulate reflectivity synchronously with spin phase to spin up/down.
- **Sun sensors:** 4× cosine-law photodiodes on central hub (mass: ~10g total)
- **Star tracker:** 1× miniature star tracker for inertial attitude (mass: ~200g)
- **IMU:** MEMS gyroscope for spin-phase tracking (mass: ~50g)
- **Beam steering:** The laser beam director uses a separate fine-steering mirror (±5 mrad range, ~100g).

**Torque budget:**
- SRP force at 0.7 AU: ~13 μN/m² × 10,000 m² = 0.13 N total
- Maximum differential force (50% reflectivity change on half the sail): ~0.03 N
- Moment arm (center to quarter-span): 25m
- Maximum torque: ~0.75 N·m
- Moment of inertia (thin square plate, 50 kg, 100m side): I ≈ (1/12) × 50 × 100² ≈ 41,667 kg·m²
- Angular acceleration: α = 0.75 / 41,667 ≈ 1.8 × 10⁻⁵ rad/s²
- Time to slew 2°: √(2 × 0.035 / 1.8e-5) ≈ 62 seconds

This is adequate for the slow attitude maneuvers required.

### 5.5 Communications and Autonomy

**Inter-satellite link (ISL):**
- Optical ISL using modulated laser beam director (dual-use)
- Data rate: 1 Mbps at 1,000 km (sufficient for telemetry + coordination)
- Each sail-sat communicates with nearest neighbors; mesh network topology

**Ground link (TT&C):**
- X-band transponder, 1W, omnidirectional
- Data rate: 100 bps at 1 AU (sufficient for health telemetry)
- Commands uplinked via DSN or dedicated ground station

**Autonomy requirements:**
- **Level 4 autonomy** (per ECSS-E-ST-70-11C): System executes goal-oriented plans with minimal ground intervention
- On-board fault detection, isolation, and recovery (FDIR)
- Autonomous MPPT optimization
- Autonomous beam pointing and tracking
- Cluster-level coordination via distributed consensus algorithm
- Self-assessment of PV degradation and performance trending

**Avionics:**
- Radiation-hardened RISC-V processor, 100 MIPS (sufficient for ADCS + power management + comms)
- 256 MB radiation-tolerant MRAM
- FPGA for real-time ADCS loop (1 kHz)
- Total avionics power: ~10W
- Total avionics mass: ~500g

---

## 6. Thermal Analysis

At 0.7 AU, solar flux is 2,790 W/m². The blanket absorbs ~82% (absorptance of perovskite layers) and converts 18% to electricity. The remaining ~64% becomes heat.

**Steady-state temperature (single-sided illumination):**

Energy balance: αGS = ηGS + εσT⁴(front) + εσT⁴(back)

Where:
- α = 0.82 (solar absorptance)
- GS = 2,790 W/m²
- η = 0.18
- ε_front ≈ 0.35 (perovskite surface)
- ε_back ≈ 0.85 (emissive coating)

(0.82 - 0.18) × 2,790 = (0.35 + 0.85) × 5.67×10⁻⁸ × T⁴

1,785.6 = 1.20 × 5.67×10⁻⁸ × T⁴

T⁴ = 1,785.6 / (6.804×10⁻⁸) = 2.624 × 10¹⁰

**T ≈ 403 K (130°C)**

This is a concern. Perovskite cells degrade acceleratedly above ~85°C. Mitigation options:

1. **Increase back-surface emissivity** to ε = 0.95 → T ≈ 390 K (117°C). Still too hot.
2. **Reduce front-surface absorptance** with selective UV/IR reflective coatings → α = 0.65, T ≈ 355 K (82°C). Acceptable, but reduces power.
3. **Move to 0.8 AU** instead of 0.7 AU → GS = 2,127 W/m², T ≈ 365 K (92°C) with baseline coatings. Marginal.
4. **Increase orbit to 0.9 AU** → GS = 1,681 W/m², T ≈ 340 K (67°C). Safe, but 40% less flux than 0.7 AU.

**Revised recommendation: Operate at 0.85 AU** with enhanced emissive back coating (ε = 0.92) and selective front coating (α = 0.72).

- GS at 0.85 AU = 1,884 W/m²
- T ≈ 348 K (75°C) — within perovskite safe operating range
- BOL power per sail-sat: 9,600 × 0.18 × 1,884 = **3.25 MWe**
- Phase 1 total BOL: 10,000 × 3.25 MW = **32.5 GWe**

*I'm revising the Phase 1 power target downward from the initial 1.5 TWe beamed to a more realistic ~32.5 GWe generated, ~16 GWe delivered (at 50% laser efficiency). This is still transformative — equivalent to ~16 large nuclear power plants.*

### Updated Specifications Table

| Parameter | Revised Value |
|---|---|
| Orbital radius | 0.85 AU |
| Solar irradiance | 1,884 W/m² |
| Blanket temperature | ~75°C (348 K) |
| BOL power per sail-sat | 3.25 MWe |
| EOL power per sail-sat (10 yr) | 2.35 MWe |
| Phase 1 total BOL power | 32.5 GWe |
| Laser output per sail-sat | 1.63 MW BOL |

---

## 7. Manufacturing Considerations

### 7.1 Roll-to-Roll Production

The entire PV blanket must be manufactured on a continuous roll-to-roll (R2R) line. This is the single most important technology enabler.

```
  ROLL-TO-ROLL MANUFACTURING LINE
  
  ┌─────┐   ┌─────┐   ┌──────┐   ┌──────┐   ┌──────┐   ┌─────┐
  │POLY- │   │BACK │   │BOTTOM│   │INTER-│   │ TOP  │   │FRONT│
  │IMIDE │──→│CONT-│──→│PEROV-│──→│LAYER │──→│PEROV-│──→│COAT │──→
  │UNWIND│   │ACT  │   │SKITE │   │      │   │SKITE │   │     │
  │      │   │(PVD)│   │(SLOT │   │(SLOT │   │(SLOT │   │(PVD)│
  │      │   │     │   │ DIE) │   │ DIE) │   │ DIE) │   │     │
  └─────┘   └─────┘   └──────┘   └──────┘   └──────┘   └─────┘
                                                              │
                                                              ▼
                                                        ┌──────────┐
                                                        │ ANNEAL & │
                                                        │ TEST     │
                                                        │ STATION  │
                                                        └────┬─────┘
                                                             │
                                                             ▼
                                                        ┌──────────┐
                                                        │CONDUCTOR │
                                                        │PATTERNING│
                                                        │(LASER)   │
                                                        └────┬─────┘
                                                             │
                                                             ▼
                                                        ┌──────────┐
                                                        │ REWIND / │
                                                        │ CUT TO   │
                                                        │ SIZE     │
                                                        └──────────┘
  
  Web width: 1.0 m
  Web speed: 10 m/min (target)
  Output: 600 m²/hour per line
```

**Production rate calculation:**
- Each sail-sat needs 10,000 m² of blanket
- At 600 m²/hr per line: ~17 hours per sail-sat per line
- 10,000 sail-sats needed
- With 10 parallel lines running 24/7: 10,000 × 17 / (10 × 8,760) = **~1.9 years of production**
- Add 50% margin for yield losses and downtime: **~3 years**

### 7.2 Key Manufacturing Challenges

1. **Perovskite uniformity over large areas:** Slot-die coating must achieve <5% thickness variation across 1m web width. Current state-of-art is ~3-8% — achievable with process optimization.

2. **Encapsulation:** Perovskites are moisture-sensitive. In vacuum (space), this is actually advantageous — no moisture. But manufacturing must occur in inert atmosphere (N₂ gloveboxes or dry rooms). The polyimide substrate itself provides a partial moisture barrier during ground handling.

3. **Lead content:** Each sail-sat contains ~10,000 m² × ~0.5 g/m² Pb = ~5 kg of lead. For 10,000 sail-sats: 50 tonnes of lead. This is manageable from a supply perspective but requires careful handling. Tin-lead bottom cells reduce pure lead content.

4. **Conductor patterning:** The aluminum grid must be deposited and patterned on the back of the blanket. Laser ablation patterning on the R2R line is the preferred approach.

### 7.3 Integration and Packaging

After blanket production, each 100m × 100m sheet is:

1. **Z-folded** along one axis into a 100m × 0.7m strip (143 folds at ~0.7m pitch)
2. **Rolled** along the other axis onto a central hub (diameter ~0.2m, ~160 wraps)
3. The four TRAC booms are pre-attached and coiled around the hub
4. The central avionics/RF/laser bus module is integrated
5. The complete sail-sat is packaged into a 1.0m × 0.7m × 0.7m deployer canister

**Deployment sequence:**
```
  STOWED          BOOM DEPLOY       Z-UNFOLD         SPIN-UP
  ┌──┐            ┌──┐              ┌──────────┐     ┌──────────┐
  │▓▓│            │  │╲             │          │     │          │
  │▓▓│    ──→     │  │  ╲    ──→   │          │ ──→ │    ◊     │
  │▓▓│            │  │   ╲         │          │     │  (spin)  │
  └──┘            └──┘    ╲        └──────────┘     └──────────┘
                   Booms    Blanket unfurls         Centripetal
                   extend   along booms             tensioning
                   (71m)                             (0.1 RPM)
```

---

## 8. Launch and Deployment

### 8.1 Launch Vehicle Considerations

Each sail-sat masses 50 kg and occupies 0.5 m³. Packaging efficiency in a launch fairing:

**Using Starship (V2, expendable to heliocentric orbit):**
- Payload to 0.85 AU transfer orbit (ΔV ~5 km/s from LEO): ~50 tonnes (estimated)
- Sail-sats per launch: 50,000 / 50 = **1,000 sail-sats per Starship**
- Launches needed: 10,000 / 1,000 = **10 Starship launches**
- Volume check: 1,000 × 0.5 m³ = 500 m³. Starship payload volume ~1,000 m³. ✓

**Deployment from transfer orbit:**
- Sail-sats are ejected sequentially from a dispenser rack
- Each sail-sat autonomously deploys blanket and booms
- Solar radiation pressure provides final orbit adjustment (no propulsion needed for circularization — SRP acts as a continuous low-thrust propulsion system)

### 8.2 Orbit Insertion via SRP

The sail-sat has an area-to-mass ratio of 10,000/50 = 200 m²/kg. This is an extraordinarily high value (typical solar sails: 10-30 m²/kg). The characteristic acceleration:

a_c = (2 × SRP × A) / m = (2 × 9.1 μN/m² × 10,000) / 50 = **3.64 mm/s²**

*(SRP at 0.85 AU ≈ 9.1 μN/m² for a reflective surface; our blanket is partially absorptive, so effective SRP force is lower. Using effective reflectivity ~0.3: a_c ≈ 1.2 mm/s²)*

At 1.2 mm/s², the sail-sat can change velocity by ~100 m/s per day. This is sufficient for orbit circularization and station-keeping over weeks to months.

---

## 9. Development Roadmap

### Phase 0: Technology Maturation (Years 1-3) — **$200M**

| Milestone | TRL Start → End | Timeline |
|---|---|---|
| Perovskite tandem on polyimide, lab scale (10cm²) | 4 → 5 | Year 1 |
| R2R perovskite deposition, 30cm web | 3 → 5 | Year 1-2 |
| Space environment testing (proton/UV) | 3 → 5 | Year 1-2 |
| Electrochromic ADCS actuator prototype | 3 → 4 | Year 2 |
| Laser power transmission breadboard | 4 → 5 | Year 2 |
| 1m × 1m blanket coupon, full stack | 5 → 6 | Year 2-3 |
| Deployment mechanism prototype (1/10 scale) | 4 → 5 | Year 2-3 |

### Phase 1A: Pathfinder Mission (Years 3-5) — **$500M**

- **Single sail-sat prototype**, 10m × 10m (1/100 area scale)
- LEO deployment and test (ISS or free-flyer)
- Validate: deployment, ADCS, PV performance, thermal behavior
- Laser power transmission demo to ground receiver
- Duration: 1 year on-orbit

### Phase 1B: Deep Space Pathfinder (Years 5-7) — **$800M**

- **10 sail-sats**, full 100m × 100m scale
- Deployed to 0.85 AU via rideshare + SRP spiral
- Validate: long-duration PV performance, cluster operations, beam pointing
- Power a small co-orbital payload (e.g., asteroid prospecting probe)

### Phase 1C: Initial Operating Capability (Years 7-12) — **$8B**

- **10,000 sail-sats** manufactured and launched
- 10 Starship launches over 2 years
- Constellation build-up over 3 years (staggered deployment)
- Co-orbital relay stations and industrial payloads deployed
- **32.5 GWe BOL generating capacity achieved**

### Technology Readiness Assessment (Current)

| Technology | Current TRL | Required TRL | Gap |
|---|---|---|---|
| Perovskite tandem cells (lab) | 5 | 7 | Medium |
| Perovskite on polyimide (space-qual) | 3 | 7 | **High** |
| R2R perovskite manufacturing | 4 | 8 | **High** |
| Ultra-thin polyimide substrates | 6 | 8 | Low |
| TRAC boom deployment | 6 | 8 | Low |
| SRP attitude control | 4 | 7 | Medium |
| Electrochromic actuators (space) | 3 | 7 | **High** |
| High-power laser diodes (space) | 5 | 7 | Medium |
| Autonomous swarm coordination | 3 | 7 | **High** |

---

## 10. Cost Analysis

### 10.1 Phase 1C Production Costs (10,000 sail-sats)

| Cost Element | Unit Cost | Total | Notes |
|---|---|---|---|
| PV blanket manufacturing | $50/m² | $5.0B | 100M m² total; aggressive but achievable for R2R perovskite at scale |
| Boom + structure | $10K/unit | $100M | |
| Avionics + ADCS | $15K/unit | $150M | |
| Laser transmitter | $20K/unit | $200M | |
| Integration + test | $30K/unit | $300M | |
| **Sail-sat subtotal** | **$57.5K/unit** | **$5.75B** | |
| Launch (10 Starship) | $100M/launch | $1.0B | Expendable to heliocentric |
| Ground segment + ops (5yr) | — | $500M | |
| Relay stations (100 units) | $5M/unit | $500M | |
| **Phase 1C Total** | | **$7.75B** | |

### 10.2 Levelized Cost of Energy

- Total investment (Phase 0 + 1A + 1B + 1C): ~$9.5B
- Average delivered power (accounting for degradation, availability): ~12 GWe
- Lifetime: 10 years
- Total energy: 12 × 10⁹ × 10 × 8,760 × 3,600 = 3.78 × 10¹⁸ J = **1.05 × 10¹² kWh**
- LCOE: $9.5B / 1.05T kWh = **$0.009/kWh**

This is absurdly cheap — **but only if you can use the power at 0.85 AU.** The cost of getting the energy to Earth (relay infrastructure, rectenna) would dominate. The primary Phase 1 use case should be **in-situ space industrial power.**

---

## 11. Risk Assessment

### 11.1 Risk Matrix

| Risk | Likelihood | Impact | Severity | Mitigation |
|---|---|---|---|---|
| Perovskite space radiation degradation faster than modeled | Medium | High | **Critical** | Extensive proton/electron testing in Phase 0; design for replacement |
| Perovskite thermal degradation at operating temperature | Medium | High | **Critical** | Orbit selection (0.85+ AU); selective coatings; accelerated life testing |
| Tin oxidation in Sn-Pb bottom cell (vacuum helps, but radiation...) | Medium | Medium | High | Encapsulation layers; accept single-junction fallback (12% eff.) |
| Blanket deployment failure (tangling, tearing) | Low | High | High | Extensive ground testing; phased deployment sequence; boom guides |
| Electrochromic ADCS insufficient torque authority | Medium | Medium | Medium | Backup: small reaction wheels at hub (adds 2 kg) |
| Laser beam pointing instability | Low | High | High | Fine-steering mirror + star tracker feedback; wide receiver aperture |
| Manufacturing yield below 80% | Medium | Medium | Medium | Parallel production lines; accept higher cost |
| Launch vehicle availability (10 Starships) | Low | High | High | Multi-year launch campaign; alternative vehicles (New Glenn) |
| Space debris impact on blankets | Low | Low | Low | Graceful degradation by design; no critical single-point |
| Regulatory/spectrum issues for power beaming | Medium | Medium | Medium | Early engagement with ITU; use laser (no RF spectrum issue) |

### 11.2 Top Risk: Perovskite Radiation Tolerance

This is the single biggest technical risk. Perovskite solar cells have shown **mixed results** under proton irradiation:

- Some studies show remarkable radiation tolerance (self-healing of defects)
- Others show rapid degradation of Sn-containing compositions
- The space radiation environment at 0.85 AU (primarily solar protons) delivers ~10¹¹ - 10¹² protons/cm²/year (>10 MeV equivalent)

**Mitigation plan:**
1. Phase 0 includes comprehensive radiation testing at proton facilities (e.g., Indiana University Cyclotron)
2. Test matrix: multiple perovskite compositions, with and without thin-film encapsulants
3. If Sn-Pb bottom cell fails radiation testing, fall back to **single-junction wide-bandgap perovskite** (1.55 eV, ~15% AM0 efficiency). This reduces power by ~17% but eliminates the Sn stability risk.
4. Design blanket for **10-year replacement cycle** — the swarm is continuously replenished with fresh sail-sats as old ones degrade.

---

## 12. Open Engineering Questions

1. **Perovskite long-term space stability:** No perovskite solar cell has operated in space for more than ~1 year (as of 2025). We need multi-year flight heritage data. Can we get a perovskite experiment on ISS within 2 years?

2. **Blanket dynamics during deployment:** A 100m × 100m membrane with 50 kg total mass has extremely low bending stiffness. How do we prevent chaotic oscillations during the deployment-to-spin-up transition? High-fidelity FEM simulation with membrane elements is needed.

3. **Electrostatic charging:** In the solar wind at 0.85 AU, the blanket will accumulate charge. With a 600V bus and ~4 μm dielectric thickness, the electric field across the blanket could reach breakdown. Do we need active charge dissipation?

4. **Scalability of laser power transmission:** At what cluster size does it become worthwhile to build a dedicated relay station vs. direct point-to-point beaming? What is the optimal cluster geometry?

5. **Collision avoidance in the swarm:** 10,000 sail-sats in a heliocentric orbit will have relative velocities of m/s to km/s depending on orbital element spread. What is the collision probability, and do we need active avoidance maneuvers?

6. **End-of-life disposal:** At 0.85 AU, there is no atmospheric drag for deorbit. Do we spiral sail-sats into the sun using SRP? What is the timeline and does it interfere with active operations?

7. **In-situ manufacturing transition:** Phase 1 manufactures on Earth and launches. At what point does it become cheaper to manufacture sail-sats in space from asteroid-derived materials? This is the key question for scaling to a true Dyson swarm.

8. **Perovskite lead toxicity in manufacturing:** 50 tonnes of lead processing requires significant environmental controls. Should we invest in lead-free perovskite alternatives (e.g., Bi-based) despite lower efficiency?

9. **Optimal orbit selection:** The 0.85 AU choice balances thermal and power considerations. But should we consider a Venus-resonant orbit for gravity-assist-based station-keeping? Or a Sun-Earth L1 halo orbit for easier power delivery to Earth?

10. **Regulatory framework:** There is no existing regulatory framework for heliocentric power-beaming infrastructure. Who grants permission? How do we ensure the laser beams don't endanger spacecraft in transit?

---

## 13. Conclusion and Recommendation

The PV Blanket Array is the foundational technology for Project Dyson. I recommend:

1. **Immediate investment ($50M/year for 3 years)** in perovskite-on-polyimide space qualification, with parallel R2R manufacturing scale-up.

2. **Orbit selection at 0.85 AU** as the baseline, with thermal analysis driving the lower bound and power density driving the upper bound.

3. **Laser power transmission** rather than microwave for Phase 1, targeting co-orbital industrial loads rather than Earth delivery.

4. **Design for replacement, not permanence.** A 10-year sail-sat lifetime with continuous replenishment is more robust than trying to achieve 30-year life from immature cell technology.

5. **Pathfinder mission by Year 5** — a single 10m × 10m sail-sat in LEO to retire deployment and performance risks.

The specific power of >65 kW/kg (at the sail-sat level) enabled by thin-film perovskite blankets is **the key metric that makes a Dyson swarm achievable with near-term launch infrastructure.** No other PV technology offers this combination of specific power and manufacturing scalability.

---

*End of Proposal PD-PH1-PVB-001 Rev A*

*Next document: PD-PH1-RLY-001 — Relay Station Architecture for Phase 1 Power Distribution*