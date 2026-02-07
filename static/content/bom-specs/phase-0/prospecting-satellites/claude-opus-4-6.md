---
bomId: "bom-0-1"
itemName: "Prospecting Satellites"
itemSlug: "prospecting-satellites"
modelId: "claude-opus-4-6"
modelName: "Claude Opus 4.6"
generated: "2026-02-07"
phase: "phase-0"
---



# Technical Proposal: Prospecting Satellites for Project Dyson
## Phase 0 — Space Resource Processing

**Document ID:** PD-P0-PROSAT-001
**Revision:** A
**Author:** Space Systems Engineering Division
**Date:** 2025

---

## 1. Executive Summary

This proposal defines the architecture for a fleet of autonomous prospecting satellites ("ProSats") whose mission is to characterize the composition, structure, and accessibility of asteroids, spent upper stages, and other material sources that will feed the Dyson swarm construction pipeline. The fleet must survey thousands of near-Earth objects (NEOs) and main-belt asteroids (MBAs) within a 10-year operational window, producing resource maps with sufficient fidelity to commit extraction hardware.

**My core recommendation:** Deploy a two-tier architecture consisting of (a) a small constellation of **long-range survey platforms** in heliocentric orbits that perform spectroscopic fly-bys at high throughput, and (b) a larger fleet of **close-inspection micro-probes** released from the survey platforms to rendezvous with high-value targets for in-situ analysis. This decouples the expensive delta-V problem from the cheap sensing problem.

---

## 2. Design Philosophy

### 2.1 Guiding Principles

1. **Throughput over depth.** A Dyson swarm requires ~2 × 10²⁶ kg of material (roughly Mercury-mass). We need to identify *many* viable sources, not perfectly characterize one. The prospecting fleet must survey ≥5,000 objects in 10 years.

2. **Expendable micro-probes, reusable motherships.** The mothership carries propulsion and comms; the probes carry sensors and are cheap enough to expend on every target.

3. **Design for manufacturing scale.** Every ProSat must be buildable in quantities of 50–500. No one-off artisan spacecraft. Flat-pack, modular, tested by automated ground systems.

4. **Autonomy-first.** Light-time delays to the main belt are 15–25 minutes one-way. The fleet must plan, execute, and triage autonomously. Ground operators set policy; spacecraft execute.

5. **Data products drive design.** The end product is a **Resource Catalog** with per-object entries containing: bulk composition (±5%), mass estimate (±20%), spin state, shape model, surface/subsurface heterogeneity, and orbital accessibility (delta-V to/from processing nodes).

---

## 3. System Architecture

### 3.1 Two-Tier Fleet Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    PROJECT DYSON — PHASE 0                       │
│                  PROSPECTING ARCHITECTURE                        │
│                                                                  │
│  ┌──────────────┐         ┌──────────────┐                      │
│  │  GROUND SEG  │◄───────►│  RELAY SAT   │  (Earth-Sun L1/L2)  │
│  │  (DSN + own  │  X-band │  (optional)  │                      │
│  │   ground st) │         └──────┬───────┘                      │
│  └──────────────┘                │                               │
│                                  │ Ka-band                       │
│                    ┌─────────────┴─────────────┐                 │
│                    │                           │                  │
│              ┌─────▼──────┐            ┌──────▼─────┐           │
│              │ MOTHERSHIP │            │ MOTHERSHIP  │           │
│              │  "Surveyor" │            │ "Surveyor"  │          │
│              │   (Tier 1)  │            │  (Tier 1)   │          │
│              └──┬───┬───┬─┘            └──┬───┬───┬──┘          │
│                 │   │   │                 │   │   │              │
│          deploy │   │   │ deploy          │   │   │              │
│           ┌─────┘   │   └─────┐     ┌────┘   │   └────┐        │
│           ▼         ▼         ▼     ▼         ▼        ▼        │
│        ┌─────┐  ┌─────┐  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐     │
│        │Probe│  │Probe│  │Probe│ │Probe│ │Probe│ │Probe│      │
│        │(T2) │  │(T2) │  │(T2) │ │(T2) │ │(T2) │ │(T2) │     │
│        └──┬──┘  └──┬──┘  └──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘     │
│           │        │        │       │       │       │           │
│           ▼        ▼        ▼       ▼       ▼       ▼          │
│        [Asteroid targets in NEO / Main Belt space]              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Fleet Composition (Baseline)

| Element | Quantity | Role |
|---|---|---|
| Tier-1 Mothership ("Surveyor") | 12 | Heliocentric cruise, fly-by spectroscopy, probe carrier/relay |
| Tier-2 Micro-Probe ("Assayer") | 600 (50 per Mothership) | Rendezvous, close inspection, surface sampling |
| Relay Satellite | 2 | Sun-Earth L1 & L4, deep-space comm relay |
| Ground Segment | 1 | Mission control, data processing, catalog management |

**Assumption:** 600 probes with ~70% mission success rate yields ~420 detailed characterizations. Combined with ~4,500 fly-by spectral observations from motherships, we exceed the 5,000-object survey goal.

---

## 4. Tier-1: Mothership "Surveyor"

### 4.1 Mission Profile

Each Surveyor follows a heliocentric trajectory designed to maximize asteroid fly-by encounters. Inspired by the Lucy mission's multi-fly-by architecture, but with solar-electric propulsion (SEP) enabling continuous trajectory reshaping.

**Operational zones:**
- 6 Surveyors in NEO-rich orbits (0.8–1.5 AU, low inclination)
- 4 Surveyors in inner main belt (1.8–2.5 AU)
- 2 Surveyors in outer main belt / Hildas (2.5–4.0 AU)

### 4.2 Technical Specifications

| Parameter | Value | Notes |
|---|---|---|
| Dry mass | 850 kg | Without probes |
| Probe payload | 50 × 8 kg = 400 kg | Stacked in dispensers |
| Xenon propellant | 350 kg | For ~12 km/s total delta-V |
| Wet mass at launch | 1,600 kg | |
| Dimensions (stowed) | 1.8 × 1.8 × 2.4 m | Fits in Falcon 9 dual-manifest |
| Dimensions (deployed) | 18 m tip-to-tip (solar arrays) | |
| Solar array power | 6.5 kW @ 1 AU, ~1.6 kW @ 2 AU | Triple-junction GaAs, 30% eff |
| Design life | 12 years | With 15-year consumables margin |
| Radiation tolerance | 100 krad TID | Behind 3 mm Al shielding |

### 4.3 Subsystems

#### 4.3.1 Propulsion — Solar Electric

- **Thruster:** 2× Hall-effect thrusters (BHT-1500 class), one primary, one redundant
- **Specific impulse:** 1,800 s
- **Thrust:** 90 mN per thruster
- **Propellant:** Xenon, 350 kg in composite overwrapped pressure vessel (COPV)
- **Total delta-V budget:** ~12 km/s (sufficient for heliocentric orbit reshaping and multiple fly-by targeting over 12 years)

**Delta-V allocation:**
```
Launch injection correction:     0.3 km/s
Orbit phasing (year 1-2):       3.0 km/s
Fly-by targeting maneuvers:     5.0 km/s  (100 maneuvers × 50 m/s avg)
Probe deployment delta-V match: 2.0 km/s
Margin:                         1.7 km/s
─────────────────────────────────────────
Total:                         12.0 km/s
```

#### 4.3.2 Remote Sensing Suite (Fly-by Instruments)

| Instrument | Mass (kg) | Power (W) | Purpose |
|---|---|---|---|
| Visible/NIR Imaging Spectrometer (0.4–2.5 μm) | 8 | 15 | Mineralogy, taxonomy |
| Thermal IR Radiometer (5–25 μm) | 5 | 10 | Thermal inertia, size, albedo |
| Wide-angle Navigation Camera | 2 | 5 | Shape model, spin state |
| Narrow-angle High-res Camera | 4 | 8 | Surface morphology (1 m/px @ 100 km) |
| Laser Altimeter | 6 | 20 | Shape model, topography |
| Magnetometer | 1 | 2 | Metallic core detection |
| **Total** | **26** | **60** | |

**Fly-by parameters:** Typical closest approach 50–500 km, relative velocity 2–15 km/s, observation window 1–6 hours per target.

#### 4.3.3 Communications

- **High-gain antenna:** 1.5 m parabolic, Ka-band (32 GHz), 50 W RF
- **Data rate:** 2 Mbps @ 1 AU, 200 kbps @ 3 AU (to relay or DSN)
- **Low-gain antenna:** Omni-directional, X-band, for safe-mode and probe relay
- **Inter-satellite link:** UHF (400 MHz) for probe relay during deployment
- **On-board storage:** 2 TB solid-state recorder (radiation-hardened)

**Data budget:** Each fly-by generates ~500 MB of science data. At 50 fly-bys/year, that's 25 GB/year — easily downlinked at 200 kbps within available contact windows.

#### 4.3.4 Attitude Determination and Control (ADCS)

- 4× reaction wheels (10 Nms each), pyramid configuration
- 2× star trackers
- Sun sensors (coarse)
- IMU (MEMS, radiation-tolerant)
- Reaction control: 8× 1-N cold-gas thrusters (nitrogen) for wheel desaturation and probe deployment attitude control
- **Pointing accuracy:** 0.01° (3σ) — required for narrow-angle camera at fly-by distances
- **Slew rate:** 1°/s — required to track targets during fast fly-bys

#### 4.3.5 Command & Data Handling (C&DH)

- **Processor:** RAD750-class (or LEON4 with EDAC), 200 MIPS
- **Co-processor:** FPGA-based vision processing unit for autonomous navigation
- **Flight software:** Core real-time OS + autonomous planning layer (see Section 7)
- **Redundancy:** Cold-spare processor, cross-strapped to all subsystems

#### 4.3.6 Probe Dispenser

```
    ┌─────────────────────────────┐
    │      SURVEYOR BUS           │
    │                             │
    │  ┌───┐ ┌───┐ ┌───┐ ┌───┐  │
    │  │ P │ │ P │ │ P │ │ P │  │  ◄── Probe stack (5 × 10 columns)
    │  │ 1 │ │ 2 │ │ 3 │ │ 4 │  │
    │  ├───┤ ├───┤ ├───┤ ├───┤  │
    │  │ P │ │ P │ │ P │ │ P │  │
    │  │ 5 │ │ 6 │ │ 7 │ │ 8 │  │
    │  ├───┤ ├───┤ ├───┤ ├───┤  │
    │  │...│ │...│ │...│ │...│  │
    │  ├───┤ ├───┤ ├───┤ ├───┤  │
    │  │ P │ │ P │ │ P │ │ P │  │
    │  │49 │ │50 │ │   │ │   │  │
    │  └───┘ └───┘ └───┘ └───┘  │
    │                             │
    │  [Spring-loaded ejection    │
    │   mechanism, 0.5 m/s ΔV]   │
    └─────────────────────────────┘
```

- 50 probes in 10 columns of 5, spring-ejected
- Ejection delta-V: 0.5 m/s (probe's own propulsion provides the rest)
- Electrical interface: Charging + health check via contact pins while stowed
- Thermal: Probes kept within -20°C to +40°C by mothership thermal control while stowed

---

## 5. Tier-2: Micro-Probe "Assayer"

### 5.1 Mission Profile

Each Assayer is released from a Surveyor when the mothership's trajectory passes within ~10,000 km of a high-priority target. The probe performs a ~50–500 m/s delta-V maneuver to match the target's orbit, enters a slow approach phase, performs close-range sensing, and optionally makes surface contact.

**Mission duration:** 2–8 weeks (approach, survey, surface ops, data relay)

### 5.2 Technical Specifications

| Parameter | Value | Notes |
|---|---|---|
| Total mass | 8.0 kg | Including propellant |
| Dry mass | 5.5 kg | |
| Propellant (hydrazine) | 2.5 kg | Isp = 220 s, delta-V ≈ 500 m/s |
| Dimensions (stowed) | 20 × 20 × 30 cm | "Shoebox" form factor |
| Dimensions (deployed) | 60 × 60 × 30 cm | With solar panels unfolded |
| Solar array power | 30 W @ 1 AU, 8 W @ 2 AU | Body-mounted + 2 deployable wings |
| Battery | 40 Wh Li-ion | For eclipse/surface ops |
| Design life | 60 days | Expendable |

### 5.3 Subsystems

#### 5.3.1 Propulsion

- **4× 0.5-N monopropellant hydrazine thrusters** (blow-down system)
- **Delta-V capability:** 500 m/s (sufficient for rendezvous from mothership fly-by trajectory)
- **Attitude control:** Pulse-mode on same thrusters + 3× micro reaction wheels (0.1 Nms)

**Why hydrazine, not cold gas or electric?** At 8 kg total mass, we need high thrust-to-weight for the rendezvous burn (minutes, not months). Hydrazine gives us the Isp and thrust density. Green propellants (AF-M315E) are an alternative if hydrazine handling at scale is problematic — trades ~5% Isp for much simpler ground handling. **I recommend AF-M315E for production units.**

#### 5.3.2 Instrument Suite

| Instrument | Mass (g) | Power (W) | Purpose |
|---|---|---|---|
| Multispectral camera (6-band, 0.4–1.0 μm) | 200 | 3 | Surface composition mapping |
| Point NIR spectrometer (1.0–2.5 μm) | 300 | 2 | Mineral ID (olivine, pyroxene, phyllosilicates) |
| X-ray fluorescence spectrometer (XRF) | 400 | 5 | Elemental composition (surface contact) |
| Laser-induced breakdown spectrometer (LIBS) | 500 | 8 (pulsed) | Elemental composition (standoff, 1–5 m) |
| Micro-gravimeter / accelerometer | 50 | 0.5 | Mass/density estimation during orbit |
| Radio science transponder | 100 | 2 | Gravity field via Doppler tracking |
| **Total** | **1,550** | **~12** (peak 20) | |

**Key measurement:** The XRF + LIBS combination gives us elemental composition to ±2% for major elements (Fe, Si, Mg, O, Ni, S, C, Al) — this is the critical data for deciding whether to send extraction hardware.

#### 5.3.3 Surface Contact System

```
         ┌──────────────┐
         │   PROBE BODY │
         │              │
         │  ┌────────┐  │
         │  │ LIBS   │  │
         │  │ optics  │  │
         │  └────┬───┘  │
         │       │       │
    ─────┴───────┴───────┴─────
    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ◄── Contact plate with XRF window
    ═══════════════════════════  ◄── Crushable aluminum honeycomb
                                     (5 cm, absorbs ≤2 m/s impact)
```

- **Approach velocity:** ≤0.5 m/s (controlled descent in micro-gravity)
- **Anchoring:** None required for objects >100 m diameter (gravity sufficient at contact speeds). For smaller objects, cold-gas puff provides reaction force during XRF measurement (~30 seconds).
- **Bounce risk mitigation:** Contact plate is slightly adhesive (gecko-inspired dry adhesive pads) + probe fires downward thruster pulse at contact.

#### 5.3.4 Communications

- **UHF transceiver:** 2 W, 9.6 kbps to mothership at ≤50,000 km
- **Data volume:** ~200 MB total science data per mission
- **Relay strategy:** Mothership stores-and-forwards to Earth. Probe has ~4-hour contact window per day as mothership recedes; all data must be relayed within 14 days.

#### 5.3.5 Autonomy

The Assayer must be highly autonomous — it receives no commands from Earth during its 2–8 week mission. All operations are pre-planned with on-board contingency logic:

1. **Approach phase:** Optical navigation using target against star field. Autonomous trajectory correction burns.
2. **Survey phase:** Autonomous orbit determination, mapping pattern generation.
3. **Descent phase:** Hazard avoidance using onboard camera, terrain-relative navigation.
4. **Surface phase:** Autonomous instrument sequencing, data quality checks, re-attempt logic.

**Processor:** ARM Cortex-R5 class, radiation-tolerant, 500 MIPS. Running a stripped-down autonomous operations framework.

---

## 6. Target Selection and Mission Planning

### 6.1 Target Prioritization Algorithm

The Resource Catalog must prioritize targets by a **Figure of Merit (FoM)**:

```
FoM = (M_extractable × V_material) / (ΔV_access² × T_transfer)

Where:
  M_extractable = estimated extractable mass (kg)
  V_material    = value density ($/kg equivalent, based on composition)
  ΔV_access     = delta-V from nearest processing node (km/s)
  T_transfer    = transfer time (years)
```

**For Dyson swarm construction, the priority materials are:**

| Priority | Material | Why | Target asteroid types |
|---|---|---|---|
| 1 | Iron/Nickel | Structural elements, reflectors | M-type asteroids |
| 2 | Silicates | Solar cell substrates, glass | S-type asteroids |
| 3 | Volatiles (H₂O, CO₂) | Propellant, life support | C-type, B-type asteroids |
| 4 | Platinum group metals | Electronics, catalysts | M-type asteroids |
| 5 | Carbon | Structural composites | C-type, D-type asteroids |

### 6.2 Survey Strategy

**Phase A (Years 1–3): NEO Sweep**
- 6 Surveyors launched into NEO-accessible orbits
- Fly-by rate: ~100 objects/year/surveyor = 1,800 total fly-bys
- Probe deployment: 10 probes/surveyor = 60 detailed characterizations
- Focus: Low delta-V targets (ΔV < 5 km/s from Earth)

**Phase B (Years 2–6): Main Belt Survey**
- 4 Surveyors launched to inner main belt
- Fly-by rate: ~80 objects/year/surveyor = 1,280 total fly-bys (4 years active)
- Probe deployment: 40 probes/surveyor = 160 detailed characterizations
- Focus: Large M-type and C-type bodies (>1 km diameter)

**Phase C (Years 4–10): Extended Survey + Outer Belt**
- 2 Surveyors to outer belt / Hildas
- Remaining probes deployed from Phase A/B surveyors on second-pass targets
- Total additional fly-bys: ~1,500
- Total additional probe deployments: ~380

**Cumulative totals:**
- Fly-bys: ~4,580
- Probe rendezvous: ~600 (420 successful at 70% success rate)
- Exceeds 5,000 catalog entries (fly-bys + probes combined)

---

## 7. Autonomy and Control Architecture

### 7.1 Autonomy Levels

| Function | Autonomy Level | Rationale |
|---|---|---|
| Trajectory maintenance | Full (on-board) | Continuous low-thrust guidance |
| Fly-by observation planning | Supervised (ground approves plan) | High-value, can pre-plan |
| Probe deployment timing | Full (on-board) | Time-critical, no ground delay |
| Probe rendezvous & survey | Full (on-board) | No ground link during ops |
| Target re-prioritization | Supervised (ground sets policy) | Strategic decision |
| Anomaly response | Full (on-board, safe mode) | Standard practice |

### 7.2 Software Architecture

```
┌─────────────────────────────────────────────┐
│              FLIGHT SOFTWARE                 │
│                                              │
│  ┌─────────────┐  ┌──────────────────────┐  │
│  │ Real-Time   │  │  Autonomy Layer      │  │
│  │ Executive   │  │                      │  │
│  │ (cFS/RTOS)  │  │  ┌────────────────┐  │  │
│  │             │  │  │ Mission Planner │  │  │
│  │ - Telemetry │  │  │ (constraint-   │  │  │
│  │ - Command   │  │  │  based)        │  │  │
│  │ - FDIR      │  │  ├────────────────┤  │  │
│  │ - Thermal   │  │  │ Nav Filter     │  │  │
│  │ - Power     │  │  │ (UKF + optical │  │  │
│  │ - Comms     │  │  │  nav)          │  │  │
│  │             │  │  ├────────────────┤  │  │
│  │             │  │  │ Science Eval   │  │  │
│  │             │  │  │ (data quality  │  │  │
│  │             │  │  │  + triage)     │  │  │
│  └──────┬──────┘  │  └────────────────┘  │  │
│         │         └──────────┬───────────┘  │
│         └────────────────────┘               │
│                    │                         │
│         ┌──────────▼───────────┐             │
│         │   Hardware Abstraction│             │
│         │   Layer (HAL)         │             │
│         └──────────────────────┘             │
└─────────────────────────────────────────────┘
```

**Key autonomy capability:** The Science Evaluation module on the Surveyor can analyze fly-by spectral data in near-real-time and autonomously decide whether to deploy a probe to a just-observed target. This "observe-decide-deploy" loop must execute within ~2 hours (before the mothership is too far past the target for a probe to reach it with available delta-V).

### 7.3 Ground Segment

- **Mission Operations Center:** 15-person team (3 shifts × 5 operators)
- **Science Operations Center:** 10-person team for data analysis and catalog management
- **Ground stations:** Primary — 2× 12m Ka-band dishes (dedicated). Backup — NASA DSN (purchased time)
- **Uplink cadence:** Weekly command uploads per Surveyor (trajectory updates, target lists, policy changes)
- **Downlink cadence:** Daily 4-hour contacts per Surveyor

---

## 8. Manufacturing Considerations

### 8.1 Design for Mass Production

This is where Project Dyson's prospecting fleet fundamentally differs from traditional planetary science missions. We are building **12 motherships and 600 probes**, not one-of-a-kind flagships.

**Manufacturing philosophy:**
- **Modular bus architecture:** Surveyor bus is a standard platform. Instrument suite is a single integrated module that bolts on.
- **Probe production line:** Assayer probes are manufactured on an assembly line, not hand-built. Target: 1 probe/day throughput from a single line.
- **Commercial components where possible:** Use automotive/industrial-grade components with radiation screening, not MIL-spec from the start. Accept higher infant mortality, compensate with fleet size.
- **Standardized interfaces:** All connectors, harnesses, and mechanical interfaces follow a project-wide standard.

### 8.2 Probe Manufacturing Detail

```
ASSAYER PROBE ASSEMBLY LINE

Station 1: Structure     Station 2: Propulsion    Station 3: Avionics
┌──────────┐            ┌──────────┐             ┌──────────┐
│ CNC mill │            │ Tank weld│             │ PCB pop  │
│ Al frame │───────────►│ + thrstr │────────────►│ + test   │
│ + panels │            │ install  │             │          │
└──────────┘            └──────────┘             └──────────┘
                                                       │
Station 6: Final Test   Station 5: Integration   Station 4: Instruments
┌──────────┐            ┌──────────┐             ┌──────────┐
│ Thermal  │            │ Harness  │             │ Sensor   │
│ vac +    │◄───────────│ + solar  │◄────────────│ module   │
│ vibe     │            │ panel    │             │ install  │
└──────────┘            └──────────┘             └──────────┘
       │
       ▼
  Ship to integration facility
```

**Key manufacturing metrics:**
- Probe unit cost target: $150,000 (at quantity 600)
- Probe assembly time: 5 days per unit (single line)
- Probe test time: 3 days per unit (2 thermal-vac chambers running in parallel)
- Total probe production campaign: 18 months

### 8.3 Component Sourcing Strategy

| Component | Source Strategy | Risk |
|---|---|---|
| Solar cells | Commercial GaAs (SolAero/Spectrolab) | Low — established supply |
| Processors | COTS ARM + FPGA with rad screening | Medium — screening yield ~60% |
| Star trackers | Commercial (Blue Canyon, Terma) | Low |
| Hall thrusters | Busek BHT-1500 or equivalent | Low — flight heritage |
| Hydrazine thrusters | Aerojet Rocketdyne MR-103 class | Low — flight heritage |
| XRF/LIBS instruments | Custom development (see Section 10) | High — miniaturization needed |
| Structures | In-house CNC + 3D printing | Low |

---

## 9. Development Roadmap

### 9.1 Timeline

```
Year:  0    1    2    3    4    5    6    7    8    9   10   11   12
       │    │    │    │    │    │    │    │    │    │    │    │    │
PHASE  │◄─────── Development ──────►│◄── Production ──►│             │
       │                            │                   │             │
       │ ┌─ Concept/PDR ──┐        │                   │             │
       │ │  (Year 0-1)    │        │                   │             │
       │ └────────────────┘        │                   │             │
       │    ┌─ Detail Design ─┐    │                   │             │
       │    │  (Year 1-2)     │    │                   │             │
       │    └─────────────────┘    │                   │             │
       │       ┌─ Proto Build/Test ┐                   │             │
       │       │  (Year 2-3.5)     │                   │             │
       │       └───────────────────┘                   │             │
       │          ┌─ Qual Campaign ─┐                  │             │
       │          │  (Year 3-4)     │                  │             │
       │          └─────────────────┘                  │             │
       │                            │ ┌─ FM Build ───┐│             │
       │                            │ │ (Year 4-5.5) ││             │
       │                            │ └──────────────┘│             │
       │                            │                  │             │
LAUNCH │                            │    L1  L2  L3   │             │
       │                            │    ▼   ▼   ▼    │             │
       │                            │  Yr5  Yr6  Yr7  │             │
       │                            │                  │             │
OPS    │                            │         ┌───────────────────┐ │
       │                            │         │ 10-year survey ops│ │
       │                            │         │ (Year 5-15)       │ │
       │                            │         └───────────────────┘ │
```

### 9.2 Launch Campaign

| Launch | Year | Vehicle | Payload | Destination |
|---|---|---|---|---|
| L1 | 5 | Falcon Heavy (shared) | 4× Surveyors (NEO) | Earth-escape, various |
| L2 | 6 | Falcon Heavy (shared) | 4× Surveyors (NEO + inner MB) | Earth-escape, various |
| L3 | 7 | Falcon Heavy (shared) | 4× Surveyors (MB + outer) + 2× Relays | Earth-escape, various |

**Launch mass per Falcon Heavy:** 4 × 1,600 kg = 6,400 kg to C3 > 0. Well within FH capability (~16,000 kg to Mars transfer). Margin used for dispenser hardware and orbit-specific kick stages.

### 9.3 Technology Readiness Assessment

| Technology | Current TRL | Required TRL | Gap |
|---|---|---|---|
| Hall-effect SEP | 9 | 9 | None |
| Autonomous optical navigation | 7 | 8 | Small — heritage from DART, OSIRIS-REx |
| Miniature XRF (probe-scale) | 5 | 7 | **Moderate — needs development** |
| Miniature LIBS (probe-scale) | 4 | 7 | **Significant — key risk item** |
| Probe-scale hydrazine propulsion | 7 | 8 | Small |
| Autonomous observe-decide-deploy | 4 | 7 | **Significant — needs demo** |
| Mass production spacecraft assembly | 6 | 8 | Moderate — scaling challenge |

---

## 10. Cost Analysis

### 10.1 Cost Breakdown (ROM)

All costs in FY2025 USD. Assumes non-profit structure with some donated engineering time and facilities.

| WBS Element | Cost ($M) | Notes |
|---|---|---|
| **1.0 Program Management** | 25 | 12 years, lean team |
| **2.0 Systems Engineering** | 30 | Architecture, integration, V&V |
| **3.0 Surveyor Development** | | |
| 3.1 Design & prototyping | 60 | 2 prototypes |
| 3.2 Qualification | 25 | Qual unit + testing |
| 3.3 Flight unit production (12) | 180 | $15M each at quantity |
| **4.0 Assayer Development** | | |
| 4.1 Design & prototyping | 40 | Including LIBS/XRF miniaturization |
| 4.2 Qualification | 15 | |
| 4.3 Flight unit production (600) | 90 | $150K each at quantity |
| **5.0 Relay Satellites (2)** | 30 | Modified commercial GEO comms bus |
| **6.0 Ground Segment** | 35 | Stations, MOC, SOC, 12-year ops |
| **7.0 Launch Services** | 90 | 3× Falcon Heavy @ $30M each (shared ride pricing) |
| **8.0 Mission Operations (10 yr)** | 60 | 25-person team |
| **9.0 Reserves (25%)** | 170 | On items 1–8 |
| | | |
| **TOTAL** | **850** | |

### 10.2 Cost Comparison and Justification

- OSIRIS-REx (single asteroid sample return): ~$1.16B
- Lucy (multiple fly-bys, no probes): ~$981M
- **ProSat fleet (4,500+ fly-bys, 420+ rendezvous):** ~$850M

**Cost per characterized object:** ~$170K (fly-by) to ~$2M (probe rendezvous). This is 2–3 orders of magnitude cheaper per object than traditional planetary science missions, enabled by mass production and expendable probes.

### 10.3 Funding Strategy

Given Project Dyson's non-profit status:
- **Phase 1 (Years 0–2, $80M):** Philanthropic grants + government research contracts for technology development
- **Phase 2 (Years 2–5, $400M):** Major philanthropic commitment + potential ESA/NASA partnership for science data sharing
- **Phase 3 (Years 5–15, $370M):** Operational funding, potentially offset by selling resource catalog data to commercial asteroid mining companies

---

## 11. Risk Assessment

### 11.1 Risk Register

| ID | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | LIBS miniaturization fails to meet mass/power budget | Medium | High | Fallback: XRF-only surface analysis + enhanced spectroscopy from orbit. LIBS is enhancement, not critical path. |
| R2 | Probe rendezvous success rate <70% | Medium | Medium | Fleet size provides margin. Can redeploy probes from surveyors with excess inventory. |
| R3 | Autonomous observe-decide-deploy loop unreliable | Medium | High | Extensive HITL simulation. Fallback: ground-in-the-loop with 48-hour delay (reduces probe deployment opportunities by ~40%). |
| R4 | Solar array degradation in main belt (dust, radiation) | Low | Medium | Conservative power margins. Surveyors carry 30% excess array area. |
| R5 | Launch vehicle unavailability / cost increase | Low | High | Architecture is launcher-agnostic. Can split across smaller vehicles (4× Falcon 9 instead of 1× FH per launch). |
| R6 | Probe production quality control at scale | Medium | Medium | Statistical acceptance testing. 10% over-production (660 probes built, 600 flown). |
| R7 | Insufficient NEO/MBA targets in accessible orbits | Low | High | Current catalogs contain >30,000 known NEOs and >1.2M known MBAs. LSST/Rubin will add millions more before launch. |
| R8 | Key personnel loss (small team) | Medium | Medium | Document everything. Cross-train. Use standard frameworks (cFS). |
| R9 | Hydrazine/AF-M315E handling at scale (600 probes) | Medium | Low | Centralized fueling facility. AF-M315E is much safer than hydrazine. Recommend AF-M315E baseline. |
| R10 | Data pipeline overwhelmed | Low | Medium | Cloud-based processing. ML-assisted spectral classification. Catalog is append-only database. |

### 11.2 Critical Path Items

1. **LIBS/XRF miniaturization** — Must begin Year 0, needs dedicated instrument team
2. **Autonomous navigation software** — Heritage exists but needs adaptation for multi-target campaigns
3. **Probe assembly line setup** — Long-lead tooling, must begin Year 3

---

## 12. Open Engineering Questions

These are the issues I believe require further trade studies or technology development before PDR:

### 12.1 Probe Propulsion Trade

**Hydrazine vs. AF-M315E vs. Electrospray:**
- Hydrazine: Best performance, worst handling at scale
- AF-M315E: 6% lower Isp, dramatically simpler handling, higher density (smaller tanks)
- Electrospray: Fascinating for micro-probes but TRL 4–5, low thrust means weeks-long rendezvous burns

**My recommendation:** AF-M315E baseline, with electrospray as a technology development path for a potential Block 2 probe.

### 12.2 Probe Surface Interaction

How do we reliably make surface contact with a body whose surface properties are unknown? Regolith depth, boulder coverage, and surface strength vary enormously. Options:
- **Hover-and-zap:** LIBS from 1–5 m standoff, never touch. Simpler but less data.
- **Touch-and-go:** OSIRIS-REx heritage. Complex for an 8 kg probe.
- **Hard landing with crushable structure:** Accept probe loss after surface measurement. Simplest operationally.

**My recommendation:** Hover-and-zap as primary mode, with optional touch for high-priority targets. The probe is expendable anyway.

### 12.3 Communication Architecture

Do we need the relay satellites at L1/L4, or can we rely on direct-to-Earth links from the Surveyors?

**Analysis:** At 3 AU, a 1.5m dish at 50W Ka-band achieves ~200 kbps to a 12m ground station. This is adequate for science data. The relay satellites add cost ($30M) but provide:
- Continuous coverage (no Earth occultation gaps)
- Higher data rates for burst downlinks
- Backup comm path

**My recommendation:** Include relays in baseline but descope to "nice-to-have" if budget is tight. Direct-to-Earth works.

### 12.4 What Constitutes "Sufficient" Characterization?

At what point do we have enough data to commit a $500M extraction mission to a target? This is fundamentally a decision-theory question. I propose:

**Minimum viable characterization for extraction commitment:**
- Bulk composition known to ±5% for top-6 elements
- Mass known to ±20%
- Shape model at 10m resolution
- Spin state known (period ±1%, axis ±5°)
- No show-stopping structural issues (e.g., rubble pile vs. monolith — affects extraction approach)
- Delta-V accessibility confirmed to ±0.1 km/s

The probe instrument suite is designed to deliver exactly this dataset.

### 12.5 Fleet Coordination and Collision Avoidance

With 12 Surveyors operating in overlapping orbital zones, we need a fleet-level trajectory coordination system. This is a solved problem for LEO constellations but novel for heliocentric operations. The low object density makes physical collision negligible, but *target deconfliction* (avoiding sending two probes to the same asteroid) requires a shared target database with propagation delays.

**Proposed solution:** Each Surveyor maintains a local copy of the target catalog, updated weekly from ground. Probe deployment decisions are logged and uplinked to all Surveyors within 48 hours.

### 12.6 Scalability to Phase 1+

The prospecting architecture should be designed so that Phase 1 (extraction) can reuse:
- The communication relay infrastructure
- The ground segment and catalog database
- The autonomous navigation software (adapted for extraction vehicles)
- The probe assembly line (retooled for extraction micro-vehicles)

This reuse potential should be a formal design requirement.

---

## 13. Conclusion

The proposed two-tier prospecting architecture — 12 Surveyor motherships carrying 600 expendable Assayer probes — can characterize >5,000 asteroid targets within 10 years at a total program cost of ~$850M. This provides the resource knowledge base necessary to begin Dyson swarm construction with confidence.

The key innovations are:
1. **Mass-produced expendable probes** that decouple sensing from propulsion
2. **Autonomous observe-decide-deploy** capability that maximizes probe utilization
3. **Assembly-line manufacturing** that drives per-unit costs below $200K for probes

The highest-risk items are instrument miniaturization (LIBS) and the autonomous deployment decision loop, both of which should begin development immediately.

**This fleet is the eyes of Project Dyson. Without it, we're mining blind.**

---

*End of Proposal*

*Distribution: Project Dyson Phase 0 Working Group*
*Classification: Open*