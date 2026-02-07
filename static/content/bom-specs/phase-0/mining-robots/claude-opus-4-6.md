---
bomId: "bom-0-2"
itemName: "Mining Robots"
itemSlug: "mining-robots"
modelId: "claude-opus-4-6"
modelName: "Claude Opus 4.6"
generated: "2026-02-07"
phase: "phase-0"
---



# Technical Proposal: Mining Robots for Project Dyson
## Phase 0 — Space Resource Processing

**Document ID:** PD-P0-MR-001
**Revision:** A
**Author:** Space Systems Engineering Division
**Date:** 2025

---

## 1. Executive Summary

This proposal defines the architecture for **SCARAB** (Self-Contained Autonomous Resource Acquisition Bot) — a class of modular mining robots designed to extract and pre-process regolith and ore from asteroids and the lunar surface to feed the Dyson swarm's material pipeline. The design philosophy is radical simplicity, extreme modularity, and swarm-scalable autonomy. We propose a family of three robot variants sharing a common chassis, optimized for different gravitational and compositional regimes.

The key insight driving this proposal: **the mining robots themselves must be manufacturable from the materials they mine.** This is the only path to the exponential scaling a Dyson swarm demands. Every design decision flows from this self-replication constraint.

---

## 2. Design Philosophy

### 2.1 Core Principles

1. **Self-Replication Convergent Design** — Minimize the number of exotic materials (semiconductors, magnets) that cannot be sourced in-situ. Target: ≥92% of robot mass manufacturable from asteroid/lunar feedstock.
2. **Swarm over Sophistication** — Prefer 1,000 simple robots over 10 complex ones. Individual unit loss must be inconsequential.
3. **Mechanical Simplicity** — Favor designs with fewest moving parts. Every joint is a failure point in vacuum/dust environments.
4. **Thermal Robustness** — Design for the full -180°C to +120°C range without active thermal control where possible.
5. **Common Chassis Architecture** — One platform, three mission kits.

### 2.2 Why Not Just Use Explosives / Large Excavators?

In microgravity asteroid environments, conventional excavation is counterproductive — reaction forces push the robot away, and debris becomes orbital hazards. Our approach uses **low-force, continuous extraction** methods that work with the physics rather than against it.

---

## 3. Operational Environments

| Parameter | Lunar Surface | C-Type Asteroid | M-Type Asteroid |
|---|---|---|---|
| Gravity | 1.62 m/s² | ~0.0001–0.001 m/s² | ~0.0001–0.001 m/s² |
| Surface Temp Range | 100–400 K | 150–300 K | 150–350 K |
| Regolith Hardness | 1–3 Mohs | 1–4 Mohs | 4–7 Mohs |
| Target Materials | Al, Si, Fe, Ti, O₂ | H₂O, C, Fe, Ni, Si | Fe, Ni, Co, PGMs |
| Anchoring Required | No | Yes (critical) | Yes (critical) |
| Dust Environment | Severe (electrostatic) | Moderate | Low |
| Comms Latency to Earth | 1.3 s | 4–40 min | 4–40 min |

---

## 4. System Architecture

### 4.1 SCARAB Family Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    SCARAB FAMILY TREE                        │
│                                                             │
│                   ┌──────────────┐                          │
│                   │ COMMON CHASSIS│                          │
│                   │   "SCARAB-C"  │                          │
│                   └──────┬───────┘                          │
│            ┌─────────────┼─────────────┐                    │
│            ▼             ▼             ▼                     │
│   ┌────────────┐ ┌────────────┐ ┌────────────┐             │
│   │ SCARAB-L   │ │ SCARAB-A   │ │ SCARAB-M   │             │
│   │ (Lunar)    │ │ (Asteroid  │ │ (Metallic  │             │
│   │            │ │  C-type)   │ │  Asteroid) │             │
│   │ Wheeled    │ │ Anchored   │ │ Anchored   │             │
│   │ Scoop+Drill│ │ Thermal    │ │ Cutting    │             │
│   │ 85 kg      │ │ Mining     │ │ Head       │             │
│   │            │ │ 45 kg      │ │ 65 kg      │             │
│   └────────────┘ └────────────┘ └────────────┘             │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Common Chassis Specifications (SCARAB-C)

```
            TOP VIEW                        SIDE VIEW
     ┌───────────────────┐           ┌───────────────────┐
     │  ┌─────────────┐  │           │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ ← Solar/RTG
     │  │ SOLAR PANEL  │  │           │ ┌───────────────┐ │    Panel
     │  │  (STOWED)    │  │           │ │  AVIONICS BAY │ │
     │  └─────────────┘  │           │ │  (SHIELDED)   │ │
     │                    │           │ ├───────────────┤ │
     │ ┌──┐  ┌────┐ ┌──┐ │           │ │  HOPPER /     │ │
     │ │A1│  │CORE│ │A2│ │           │ │  MATERIAL BAY │ │
     │ └──┘  │    │ └──┘ │           │ │  (40 L)       │ │
     │       │    │      │           │ ├───────────────┤ │
     │ ┌──┐  │    │ ┌──┐ │           │ │  TOOL         │ │
     │ │A3│  └────┘ │A4│ │           │ │  INTERFACE    │ │
     │ └──┘         └──┘ │           │ └───────┬───────┘ │
     │  ┌─────────────┐  │           │         │ ANCHOR  │
     │  │TOOL INTERFACE│  │           └─────────┴─────────┘
     │  └─────────────┘  │
     └───────────────────┘           A1-A4: Attachment/
      0.6m × 0.5m footprint          Locomotion Points

```

| Specification | Value | Notes |
|---|---|---|
| Chassis Dimensions | 600 × 500 × 400 mm | Excluding appendages |
| Chassis Mass (bare) | 22 kg | Al-Li frame, 3D-printed |
| Material Bay Volume | 40 L | Holds ~60 kg regolith |
| Structural Material | Al-7075 / Al-Li alloy | In-situ manufacturable |
| Operating Temp | 100–400 K | Passive thermal design |
| Design Life | 5 years (lunar), 3 years (asteroid) | Dust is the limiter |
| Attachment Points | 4 × universal mechanical interface | For legs/wheels/anchors |
| Tool Interface | 1 × powered quick-connect | 200W power + data bus |
| Data Bus | CAN-FD + SpaceWire lite | Radiation-tolerant |
| Radiation Tolerance | 100 krad TID (electronics) | Spot shielding on avionics |

---

## 5. Subsystems Breakdown

### 5.1 Power Subsystem

**Primary approach: Hybrid solar + nuclear (variant-dependent)**

**SCARAB-L (Lunar):**
- 2× deployable solar panels, 1.2 m² total GaAs triple-junction
- Efficiency: 30% BOL → 26% EOL (5 yr)
- Peak power at lunar noon: **350 W**
- Li-ion battery: 500 Wh (for crater shadow operations, up to 4 hours)
- Lunar night survival: hibernate mode, 5W keep-alive from battery + small 0.5 We RHU (Radioisotope Heater Unit)

**SCARAB-A (C-type Asteroid, ~2.5 AU average):**
- Solar flux at 2.5 AU: ~220 W/m²
- 2× deployable panels, 1.5 m² total: **100 W peak**
- Supplemented by 2× MMRTG-derived module: **10 We continuous**
- Battery: 300 Wh Li-ion
- *Note: Thermal mining of volatiles requires ~200W intermittent — duty-cycled*

**SCARAB-M (M-type Asteroid):**
- Similar to SCARAB-A solar config
- Higher power demand for cutting: **300W peak** (duty-cycled at 30%)
- Battery: 800 Wh

**Power Budget (SCARAB-L nominal operations):**

| Mode | Duration | Power Draw |
|---|---|---|
| Transit/Relocation | 15% | 45 W |
| Drilling/Excavation | 40% | 280 W |
| Material Processing | 25% | 150 W |
| Communication | 10% | 35 W |
| Idle/Charging | 10% | 15 W |
| **Weighted Average** | — | **163 W** |

### 5.2 Mobility Subsystem

This is the most variant-divergent subsystem.

**SCARAB-L (Lunar):**
```
    ┌─────────────┐
    │   CHASSIS    │
    └──┬──┬──┬──┬─┘
       │  │  │  │
    ┌──┘  │  │  └──┐
    ▼     ▼  ▼     ▼
   ╔═╗  ╔═╗╔═╗  ╔═╗    4× independently driven wheels
   ║W║  ║W║║W║  ║W║    Diameter: 300 mm
   ╚═╝  ╚═╝╚═╝  ╚═╝    Grousered aluminum rims
                         Each wheel: 1.2 kg, 25W brushless DC
    Rocker-bogie suspension (passive)
    Max speed: 0.3 m/s
    Grade capability: 25°
    Ground pressure: < 2 kPa
```

**SCARAB-A / SCARAB-M (Asteroid):**
```
         ┌─────────────┐
    ┌────┤   CHASSIS    ├────┐
    │    └──────┬───────┘    │
    │           │            │
    ▼           ▼            ▼
   ┌┴┐       ┌─┴─┐        ┌┴┐
   │L│       │ANC│        │L│     L = Leg (3-DOF each)
   │E│       │HOR│        │E│     ANCHOR = Central auger
   │G│       │   │        │G│
   └┬┘       └─┬─┘        └┬┘
    │           │            │
    ▼           ▼            ▼
   [G]        [A]          [G]     G = Gecko-pad gripper
                                   A = Auger tip (also samples)

   3× legs + 1× central anchor
   Locomotion: "inchworm" gait
   Speed: 0.01 m/s (adequate for asteroid ops)
   Anchoring force: 50 N (auger) + 10 N per gecko pad
   Reaction force management: all motions counter-balanced
```

The asteroid variants use **gecko-inspired dry adhesive pads** (TRL 4-5, demonstrated by JPL and Stanford) combined with a central screw anchor. This is critical — without reliable anchoring, mining forces will simply push the robot off the surface.

### 5.3 Mining/Extraction Subsystem

This is the heart of the system. Three fundamentally different approaches for three material types:

#### 5.3.1 SCARAB-L: Rotary Percussion Drill + Scoop

- **Primary tool:** Rotary-percussion drill, 25 mm diameter, carbide-tipped
- Drill depth: up to 2 m (segmented drill string)
- Drilling power: 150–250 W
- Rate of penetration: ~5 cm/min in consolidated regolith
- **Secondary tool:** Bucket-wheel scoop for loose regolith
- Scoop rate: ~2 kg/min in loose material
- **Throughput target:** 50 kg/hr loose regolith, 10 kg/hr consolidated

#### 5.3.2 SCARAB-A: Thermal Mining (Volatile Extraction)

This is my **strongest recommendation** for C-type asteroids. Thermal mining avoids mechanical reaction forces entirely.

```
   THERMAL MINING PROCESS
   ═══════════════════════

   ┌──────────────────────────────────┐
   │        SOLAR CONCENTRATOR        │
   │     (Deployable Fresnel Lens)    │
   │          0.8 m diameter          │
   │     Concentration ratio: 500×    │
   └──────────────┬───────────────────┘
                  │ Focused beam
                  ▼
   ┌──────────────────────────────────┐
   │         CONTAINMENT TENT         │
   │    (Aluminized Kapton dome)      │
   │    Inflated over work area       │
   │    Diameter: 0.5 m               │
   │                                  │
   │    ┌────────────────────┐        │
   │    │  HEATED REGOLITH   │        │
   │    │  Target: 200-700°C │        │
   │    │  Volatiles sublime │        │
   │    └────────┬───────────┘        │
   │             │ Gas flow           │
   └─────────────┼────────────────────┘
                 │
                 ▼
   ┌──────────────────────────────────┐
   │        COLD TRAP / CONDENSER     │
   │    Passive radiator at ~100 K    │
   │    Captures: H₂O, CO₂, CO, NH₃  │
   │    Collection tank: 10 L         │
   └──────────────────────────────────┘
```

- **Heating power:** 200 W concentrated solar (equivalent to ~100 kW/m² at focal point)
- **Volatile yield:** 5–20% by mass for CI/CM chondrites (Rivkin et al., 2015)
- **Water extraction rate:** ~0.5 kg/hr
- **Residual silicate regolith** collected separately for metal/mineral processing
- **No mechanical drilling required** — heat does the work

#### 5.3.3 SCARAB-M: Abrasive Wire Cutting + Electrolytic Separation

For metallic (Fe-Ni) asteroids, we need to cut metal in vacuum.

- **Primary tool:** Diamond-impregnated wire saw (closed loop)
- Wire speed: 10 m/s
- Cutting force: 5–15 N (manageable with anchoring system)
- Kerf width: 2 mm
- Cutting rate in Fe-Ni: ~2 cm²/min
- Power: 200–300 W
- **Chunk size target:** 10 × 10 × 10 cm blocks (~8 kg each)
- Blocks loaded into hopper for transport to processing facility

### 5.4 Avionics & Computing

**Processor:** Rad-hard RISC-V multicore (e.g., Frontgrade Vorago or equivalent)
- 400 MHz quad-core, 100 krad TID
- 2 GB radiation-tolerant MRAM
- 64 GB NAND flash (triple-redundant with EDAC)
- Power draw: 5 W

**Why RISC-V:** Open-source ISA enables in-house custom silicon fabrication as the project scales. No licensing dependencies. This matters for a self-replicating system.

**Sensors:**
| Sensor | Purpose | Mass | Power |
|---|---|---|---|
| Stereo cameras (2×) | Navigation, terrain mapping | 0.3 kg | 3 W |
| LIDAR (solid-state) | Proximity, 3D mapping | 0.4 kg | 8 W |
| IMU (MEMS, 3-axis) | Attitude, vibration monitoring | 0.05 kg | 0.5 W |
| Force/torque sensors (6-axis) | Tool feedback, anchoring | 0.2 kg | 1 W |
| NIR spectrometer | In-situ composition analysis | 0.5 kg | 4 W |
| Temperature sensors (8×) | Thermal management | 0.1 kg | 0.2 W |
| Radiation dosimeter | Health monitoring | 0.05 kg | 0.1 W |

### 5.5 Communication Subsystem

```
COMMUNICATION ARCHITECTURE
══════════════════════════

  EARTH          RELAY SAT/         SWARM           INDIVIDUAL
  GROUND    ←──→ MOTHERSHIP    ←──→ MESH       ←──→ SCARAB
  STATION        (X-band)          (UHF/S-band)

  ┌─────┐      ┌──────────┐      ┌─────────┐      ┌────────┐
  │ DSN  │◄────►│ SHEPHERD │◄────►│ MESH    │◄────►│SCARAB-n│
  │      │ X-bd │ ORBITER  │ UHF  │ NETWORK │ UHF  │        │
  └─────┘      └──────────┘      └─────────┘      └────────┘
   34m dish     1m HGA             Omni             Omni
   ~1 Mbps      10 kbps to         1 kbps           1 kbps
   (Mars dist)  each robot         peer-peer        to mesh
```

**Individual SCARAB comms:**
- UHF transceiver: 400 MHz, 1 W transmit
- Data rate: 1–10 kbps (sufficient for telemetry + commands)
- Mesh networking protocol: adapted DTN (Delay-Tolerant Networking)
- Range: 5 km line-of-sight to nearest mesh node
- Mass: 0.3 kg, Power: 3 W (transmit), 0.5 W (receive)

**Key design decision:** SCARABs do NOT communicate directly with Earth. All Earth-link traffic goes through a **Shepherd orbiter** (separate system, not in this proposal's scope). This dramatically simplifies the robot's comms hardware.

### 5.6 Thermal Control

**Philosophy: Passive-first, with minimal active augmentation.**

- **Chassis:** Multi-layer insulation (MLI), 15 layers, on all non-tool-facing surfaces
- **Electronics bay:** Isolated thermally, maintained 233–343 K (-40 to +70°C)
- **Heat rejection:** Body-mounted radiator panel, 0.15 m², ε = 0.85
- **Heaters:** 3× 10W Kapton film heaters (survival mode only)
- **Thermal mass:** Chassis aluminum acts as thermal buffer (cp = 900 J/kg·K)
- **Worst case hot (lunar noon):** Electronics bay reaches 65°C — within margin
- **Worst case cold (lunar night / asteroid shadow):** Hibernate at -40°C, heaters maintain battery above -20°C

---

## 6. Mass Budget

### SCARAB-L (Lunar Variant) — Detailed Mass Breakdown

| Subsystem | Mass (kg) | % of Total |
|---|---|---|
| Chassis structure (Al-Li) | 12.0 | 14.1% |
| Mobility (4 wheels + suspension) | 9.6 | 11.3% |
| Mining tools (drill + scoop) | 11.5 | 13.5% |
| Material hopper | 4.0 | 4.7% |
| Solar panels + deployment | 6.5 | 7.6% |
| Battery (500 Wh, Li-ion) | 4.2 | 4.9% |
| Power management electronics | 1.8 | 2.1% |
| Avionics (computer + sensors) | 3.5 | 4.1% |
| Communications | 0.8 | 0.9% |
| Thermal control (MLI + heaters) | 2.5 | 2.9% |
| Cabling & harness | 3.0 | 3.5% |
| Tool interface mechanism | 2.0 | 2.4% |
| **Subtotal (dry)** | **61.4** | **72.2%** |
| Margin (15%) | 9.2 | 10.8% |
| Consumables (drill bits, lubricant) | 2.0 | 2.4% |
| **Total (wet, no payload)** | **72.6** | **85.4%** |
| Max regolith payload | 60.0 | — |
| **Total (loaded)** | **132.6** | — |

### SCARAB-A (C-type Asteroid): 48 kg dry
### SCARAB-M (M-type Asteroid): 67 kg dry

---

## 7. Autonomy Architecture

This is where the proposal gets opinionated. **Full autonomy is not optional — it is the primary technical challenge.**

At asteroid distances (4–40 minute light-time delay), teleoperation is impossible for real-time mining. Even at the Moon (1.3s delay), the sheer number of robots (thousands) makes individual teleoperation infeasible.

### 7.1 Autonomy Levels

```
┌─────────────────────────────────────────────────────────┐
│              AUTONOMY HIERARCHY                         │
│                                                         │
│  Level 4: SWARM COORDINATION          [Shepherd/Ground] │
│  ┌───────────────────────────────────────────────────┐  │
│  │ - Resource allocation across swarm                │  │
│  │ - Strategic mine planning                         │  │
│  │ - Fleet health management                         │  │
│  │ - Production quota optimization                   │  │
│  └───────────────────────────────────────────┬───────┘  │
│                                              │          │
│  Level 3: MISSION PLANNING                [On-board]    │
│  ┌───────────────────────────────────────────────────┐  │
│  │ - Path planning to mining site                    │  │
│  │ - Site selection from spectral data               │  │
│  │ - Work/rest cycle scheduling                      │  │
│  │ - Peer coordination (collision avoidance)         │  │
│  └───────────────────────────────────────────┬───────┘  │
│                                              │          │
│  Level 2: TASK EXECUTION                  [On-board]    │
│  ┌───────────────────────────────────────────────────┐  │
│  │ - Drill sequence execution                        │  │
│  │ - Scoop-load-dump cycles                          │  │
│  │ - Anchoring procedures                            │  │
│  │ - Terrain-relative navigation                     │  │
│  └───────────────────────────────────────────┬───────┘  │
│                                              │          │
│  Level 1: REACTIVE SAFETY                 [On-board]    │
│  ┌───────────────────────────────────────────────────┐  │
│  │ - Obstacle avoidance (< 100ms response)           │  │
│  │ - Over-current protection on tools                │  │
│  │ - Thermal limit enforcement                       │  │
│  │ - Tip-over prevention                             │  │
│  │ - Loss-of-anchor emergency stop                   │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 7.2 Software Architecture

- **OS:** Real-time Linux variant (cFS/ROS2 hybrid)
- **Navigation:** Visual-inertial odometry + LIDAR SLAM
- **Planning:** Behavior tree architecture with Monte Carlo tree search for site selection
- **ML Models:** Lightweight CNN for terrain classification (~5M parameters, runs on-board at 2 fps)
- **Swarm Protocol:** Stigmergic coordination — robots leave "digital pheromone" markers in shared spatial maps indicating resource quality, hazards, and depletion. No central coordinator needed for basic operations.

### 7.3 Human-in-the-Loop

- Ground operators manage **fleets**, not individual robots
- Operator-to-robot ratio target: **1 operator : 50 robots** (Phase 0), scaling to **1:500** (Phase 2)
- Operators set: production targets, exclusion zones, priority areas
- Robots report: production metrics, health status, anomalies
- **Override capability:** Any robot can be individually commanded via Shepherd relay (emergency only)

---

## 8. Material Flow & Integration

### 8.1 How SCARABs Fit in the Processing Chain

```
┌──────────┐     ┌──────────┐     ┌──────────────┐     ┌──────────┐
│  SCARAB   │────►│ HAULER   │────►│  PROCESSING  │────►│ FABRICA- │
│  (mines)  │     │ (carries)│     │  PLANT       │     │ TION     │
│           │     │          │     │  (refines)   │     │          │
│ 50 kg/hr  │     │ 500 kg   │     │ Electrolysis │     │ 3D print │
│ regolith  │     │ per trip │     │ Smelting     │     │ Rolling  │
│           │     │          │     │ Sintering    │     │ Assembly │
└──────────┘     └──────────┘     └──────────────┘     └──────────┘
     ×100              ×10               ×1                  ×1
   (swarm)          (fleet)          (central)           (central)

   MATERIAL FLOW: 5,000 kg/hr total → 500 kg/hr refined → components
```

**Interface specification between SCARAB and Hauler:**
- SCARAB fills its 40L hopper (60 kg regolith)
- Dumps into Hauler's open-top bin at designated transfer points
- Transfer is gravity-assisted (lunar) or mechanical push (asteroid)
- No complex docking — just proximity + dump
- Hauler visits each SCARAB on a scheduled route (like garbage collection)

### 8.2 Production Targets

For a meaningful Dyson swarm construction rate, we need to scale to enormous material throughput. Phase 0 targets:

| Metric | Year 1 | Year 3 | Year 5 | Year 10 |
|---|---|---|---|---|
| Active SCARABs | 20 | 200 | 2,000 | 50,000 |
| Raw regolith/day | 24 t | 240 t | 2,400 t | 60,000 t |
| Refined metal/day | 2.4 t | 24 t | 240 t | 6,000 t |
| Self-replicated units/month | 0 | 5 | 100 | 5,000 |

**Assumption:** Each SCARAB produces ~50 kg/hr × 24 hr/day × 0.5 duty cycle = **600 kg/day** raw material.

The exponential growth from Year 3 onward is enabled by the self-replication capability — new SCARABs are built from mined materials using the fabrication plant.

---

## 9. Self-Replication Analysis

### 9.1 Bill of Materials — Manufacturability Assessment

| Component | Mass % | In-Situ Source | Manufacturability |
|---|---|---|---|
| Al-Li structural frame | 22% | Lunar anorthite / asteroid | **YES** — casting + machining |
| Steel fasteners & gears | 8% | Asteroid Fe-Ni | **YES** — sintering |
| Electric motors (Cu + Fe) | 12% | Asteroid metals | **PARTIAL** — magnets need Nd |
| Wiring (Cu) | 4% | Asteroid Cu | **YES** — wire drawing |
| Solar cells (GaAs) | 5% | Earth import (Phase 0-1) | **NO** — requires Ga, As |
| Battery cells (Li-ion) | 6% | Partial lunar Li | **PARTIAL** — complex chemistry |
| Semiconductors (Si) | 2% | Lunar/asteroid Si | **PARTIAL** — fab is hard |
| Sensors & optics | 3% | Earth import | **NO** |
| MLI & thermal materials | 3% | Partial (Al foil yes) | **PARTIAL** |
| Drill bits (WC/carbide) | 1% | Asteroid W, C | **YES** — sintering |
| Software | 0% | Upload | **YES** |
| Other (adhesives, seals) | 4% | Mixed | **PARTIAL** |

**Current in-situ manufacturability: ~65% by mass**
**Target by Year 5: 92% by mass** (requires semiconductor fab and battery chemistry development)

### 9.2 Closure Ratio

The **closure ratio** is the fraction of a robot that can be built by the robot swarm + processing plant without Earth imports.

- Phase 0 (Year 1-3): Closure ratio = 0% (all robots shipped from Earth)
- Phase 1 (Year 3-5): Closure ratio = 65% (structures, wiring, mechanical parts)
- Phase 2 (Year 5-8): Closure ratio = 85% (add motors, basic electronics)
- Phase 3 (Year 8-12): Closure ratio = 95% (add solar cells, advanced electronics)

**The 5% that may always require Earth import:** Certain rare-earth magnets, specialized radiation-hardened ICs, and precision optical elements. This is acceptable — 5% import by mass means 95% exponential growth is unlocked.

---

## 10. Manufacturing Considerations (Earth-Built Units)

### 10.1 Design for Manufacture

- **Chassis:** 5-axis CNC from Al-Li billet OR investment casting (for scale)
- **Target unit cost at scale:** See cost analysis below
- **Assembly:** Modular design enables parallel assembly; target 40 person-hours per unit at 100-unit scale
- **Testing:** Each unit undergoes:
  - Thermal vacuum cycling (10 cycles, -180°C to +120°C)
  - Vibration testing (launch loads: 10g RMS random)
  - Functional test in regolith simulant testbed
  - 72-hour burn-in under vacuum
- **Packaging:** 4 SCARABs per standard ESPA-class launch adapter ring

### 10.2 Launch Considerations

| Parameter | Value |
|---|---|
| SCARAB-L mass (stowed) | 73 kg |
| SCARAB-L stowed volume | 0.6 × 0.5 × 0.5 m = 0.15 m³ |
| Units per Starship (lunar) | ~200 (mass-limited at ~15,000 kg allocation) |
| Units per Starship (asteroid) | ~300 (SCARAB-A is lighter) |
| Launch cost per unit (Starship) | ~$5,000–$15,000 (at $50M/launch) |

---

## 11. Development Roadmap

```
TIMELINE (Years from program start)
═══════════════════════════════════════════════════════════════════

Year 0-1: CONCEPT & PROTOTYPE
├── Requirements finalization
├── Detailed mechanical design
├── Breadboard avionics
├── Regolith simulant testbed construction
├── Single-unit prototype (Earth gravity demo)
└── TRL: 3→4

Year 1-2: ENGINEERING MODEL
├── Full-scale engineering model (all 3 variants)
├── Thermal vacuum testing
├── Autonomy software v1.0 (Level 1-2)
├── Lunar analog field testing (desert/volcanic sites)
├── Anchoring system validation (parabolic flight)
└── TRL: 4→5

Year 2-3: QUALIFICATION
├── Qualification model build & test
├── Vibration, shock, EMC qualification
├── Autonomy software v2.0 (Level 1-3)
├── Swarm simulation (1000-unit virtual testbed)
├── Long-duration vacuum testing (6 months)
├── Radiation testing of avionics
└── TRL: 5→6

Year 3-4: FLIGHT MODEL PRODUCTION
├── Flight model production line setup
├── First batch: 20 units (SCARAB-L)
├── Integration with Hauler and Processing Plant
├── End-to-end system testing
├── Launch campaign preparation
└── TRL: 6→7

Year 4-5: LUNAR DEPLOYMENT (Phase 0A)
├── Launch 20 SCARAB-L units to lunar south pole
├── Commissioning and initial operations
├── Performance validation vs. models
├── Autonomy software v3.0 (Level 1-4)
├── Lessons learned → design updates
└── TRL: 7→8→9

Year 5-7: SCALE-UP & ASTEROID DEPLOYMENT (Phase 0B)
├── Production ramp to 50 units/month
├── Launch 200 SCARAB-L (lunar expansion)
├── Launch first 50 SCARAB-A to target NEA
├── Begin in-situ manufacturing trials
├── First self-replicated chassis produced
└── OPERATIONAL CAPABILITY DECLARED

Year 7-12: EXPONENTIAL GROWTH (Phase 1)
├── Self-replication rate exceeds Earth-launch rate
├── 2,000 → 50,000 active units
├── Transition to asteroid-belt operations
├── SCARAB design evolution (Gen 2, Gen 3)
└── FULL PRODUCTION FOR DYSON SWARM MATERIAL PIPELINE
```

---

## 12. Cost Analysis

### 12.1 Development Costs

| Phase | Duration | Cost (FY2025 $M) |
|---|---|---|
| Concept & Prototype | 1 year | $15 M |
| Engineering Model | 1 year | $35 M |
| Qualification | 1 year | $45 M |
| Flight Model (first 20) | 1 year | $60 M |
| Software & Autonomy (ongoing) | 4 years | $40 M |
| Ground support equipment | 2 years | $15 M |
| Program management & systems engineering | 4 years | $30 M |
| **Total Development** | **4 years** | **$240 M** |

### 12.2 Unit Production Costs

| Quantity | Unit Cost | Basis |
|---|---|---|
| 1–20 (prototype/qual) | $800 K | Hand-built, NRE-loaded |
| 20–100 | $250 K | Low-rate production |
| 100–1,000 | $120 K | Medium-rate, dedicated line |
| 1,000–10,000 | $60 K | High-rate, automated assembly |
| 10,000+ (in-situ) | ~$5 K equiv. | Self-replicated, only import costs |

**Assumption:** Cost learning curve of 85% (consistent with aerospace small-satellite production).

### 12.3 Total Phase 0 Budget

| Item | Cost ($M) |
|---|---|
| Development (4 years) | $240 |
| First 20 flight units | $16 |
| Launch (20 units, 1 Starship) | $50 |
| Operations (Year 4-5, 20 units) | $25 |
| Scale-up production (200 units) | $24 |
| Scale-up launch (4 Starships) | $200 |
| Operations (Year 5-7, 200 units) | $60 |
| Contingency (20%) | $123 |
| **Total Phase 0** | **$738 M** |

This is remarkably affordable for a program of this ambition — comparable to a single flagship planetary science mission. The key cost leverage is that **once self-replication kicks in, marginal cost per robot approaches zero.**

---

## 13. Risk Assessment

### 13.1 Risk Matrix

```
         LIKELIHOOD →
    ┌─────┬─────┬─────┬─────┬─────┐
    │     │ VLow│ Low │ Med │ High│
    ├─────┼─────┼─────┼─────┼─────┤
S   │Crit │     │ R3  │ R1  │     │
E   ├─────┼─────┼─────┼─────┼─────┤
V   │High │     │ R5  │ R2  │ R4  │
E   ├─────┼─────┼─────┼─────┼─────┤
R   │Med  │     │ R7  │ R6  │     │
I   ├─────┼─────┼─────┼─────┼─────┤
T   │Low  │     │     │ R8  │     │
Y   └─────┴─────┴─────┴─────┴─────┘
```

| ID | Risk | Likelihood | Severity | Mitigation |
|---|---|---|---|---|
| R1 | Dust degradation exceeds models (lunar) | Medium | Critical | Dust-tolerant seals, sacrificial coatings, design for replacement |
| R2 | Anchoring failure in microgravity | Medium | High | Redundant anchoring (auger + gecko + harpoon option), extensive testing |
| R3 | Autonomy software insufficient for unstructured terrain | Low | Critical | Extensive analog testing, conservative initial ops with human oversight |
| R4 | Self-replication closure ratio stalls below 80% | High | High | Parallel R&D in space-based semiconductor fab; accept higher Earth import rate |
| R5 | Asteroid composition differs from remote sensing predictions | Low | High | Carry NIR spectrometer, adaptive mining strategies, target multiple bodies |
| R6 | Thermal cycling fatigue causes structural failures | Medium | Medium | Conservative fatigue margins (4×), inspection protocols |
| R7 | Communication blackouts cause swarm coordination failures | Low | Medium | Fully autonomous fallback modes, store-and-forward protocols |
| R8 | Launch vehicle delays | Medium | Low | Design compatible with multiple launchers (Starship, Falcon Heavy, New Glenn) |

### 13.2 Top Risk Deep-Dive: R1 — Lunar Dust

Lunar regolith is the single greatest threat to mechanical systems on the Moon. Particles are:
- Electrostatically charged (cling to everything)
- Abrasive (angular, unweathered glass and mineral fragments)
- Fine (median ~70 μm, with significant sub-10 μm fraction)

**Mitigation strategy (defense in depth):**
1. **Labyrinth seals** on all rotating joints (no elastomeric seals — they degrade)
2. **Electrostatic dust repulsion** on optical surfaces (demonstrated by NASA, TRL 5)
3. **Sacrificial wear surfaces** on wheels and tool interfaces — designed for replacement
4. **Positive-pressure nitrogen purge** on avionics bay (small N₂ tank, 0.5 kg, lasts 6 months)
5. **Design life includes dust degradation** — 5-year life assumes 30% performance degradation by EOL

---

## 14. Open Engineering Questions

These are the problems I don't have good answers for yet. They need dedicated research:

### 14.1 Critical (Must Solve Before CDR)

1. **Gecko adhesive longevity in vacuum + regolith dust environment.** Lab demos are promising but no long-duration space data exists. Fallback: mechanical grippers only, but with significant mass penalty.

2. **Optimal swarm density.** How many SCARABs per hectare before they interfere with each other? Preliminary simulation suggests 20–50 units/hectare, but this depends heavily on terrain and hauler routing.

3. **Drill bit wear rate in actual lunar regolith.** Simulants (JSC-1A, LHS-1) don't perfectly replicate the abrasiveness of real regolith. Apollo drill data is limited. We may need to design for 10× faster wear than models predict.

4. **Thermal mining efficiency on actual C-type asteroid material.** Lab tests on meteorite samples show wide variation (3–22% volatile yield). Mission design must accommodate the low end.

### 14.2 Important (Must Solve Before Phase 1)

5. **In-situ motor manufacturing.** Electric motors require permanent magnets (NdFeB). Can we design effective motors using only Fe-Ni-Co (available from asteroids) with wound-field or switched reluctance designs? Performance penalty estimated at 30–40% but eliminates rare-earth dependency.

6. **Radiation effects on autonomy software.** Single-event upsets in MRAM could corrupt navigation maps or behavior trees. Need robust checkpoint/restart architecture. How much computational overhead does this add?

7. **Regolith-based solar cell fabrication.** Can we produce even 10% efficient solar cells from lunar/asteroid silicon? This is the key to breaking the solar panel import dependency. Current best lab results for "dirty silicon" cells: ~8% efficiency.

### 14.3 Desirable (Ongoing Research)

8. **Can SCARABs perform cooperative manipulation?** Two robots working together to move a large boulder, for example. This requires tight coordination and shared force control — hard problem.

9. **Optimal ratio of SCARAB variants** for a given asteroid/lunar site. This is a resource economics optimization problem that depends on market demand for different materials.

10. **End-of-life recycling.** When a SCARAB fails beyond repair, can the swarm disassemble it and recycle 90%+ of its mass? This closes the material loop completely.

---

## 15. Conclusion & Recommendation

The SCARAB mining robot family is designed to be the **seed crystal** of an exponentially growing space industrial base. The technical challenges are significant but bounded — no fundamental physics breakthroughs are required, only determined engineering.

**My strongest recommendations:**

1. **Start with SCARAB-L on the Moon.** 1.3-second latency allows human oversight during the critical learning phase. Lunar resources (Al, Si, Fe, Ti, O₂) are sufficient for structural components. The Moon is the proving ground.

2. **Invest disproportionately in autonomy software.** The hardware is relatively straightforward aerospace engineering. The autonomy — making thousands of robots productively mine with minimal human oversight — is the true hard problem and the true force multiplier.

3. **Design for self-replication from Day 1.** Every material choice, every manufacturing process, every fastener type should be evaluated against the question: "Can we make this in space?" If the answer is no, find an alternative or explicitly flag it as an import dependency to be eliminated.

4. **Accept high individual unit attrition.** Design cheap, build many, expect losses. A 10% annual attrition rate across a 10,000-unit swarm is 1,000 robots/year — easily replaced by in-situ manufacturing if the closure ratio is high enough. This is fundamentally different from traditional space mission philosophy and requires a cultural shift.

The path to a Dyson swarm is paved with regolith. Let's start digging.

---

*End of Proposal*

*Distribution: Project Dyson Phase 0 Team, Systems Engineering Review Board*
*Classification: Project Dyson Internal — Pre-Decisional*