---
bomId: "bom-1-1"
itemName: "Solar Collector Units"
itemSlug: "collector-units"
modelId: "claude-opus-4-5"
modelName: "Claude Opus 4.5"
generated: "2026-02-01"
phase: "phase-1"
---

# Technical Proposal: Solar Collector Units for Project Dyson
## Phase 1 - Initial Swarm Deployment

**Document ID:** PD-SCU-001-R1
**Author:** Systems Engineering Division
**Classification:** Technical Proposal

---

## Executive Summary

This proposal presents a comprehensive design for the Solar Collector Unit (SCU), the fundamental energy-harvesting element of the Dyson swarm. After extensive trade studies, I recommend a **modular thin-film photovoltaic sail architecture** optimized for autonomous deployment, minimal mass-per-area, and graceful degradation. The Phase 1 deployment targets 1,000 SCUs at 0.5 AU, generating approximately 50 GW of continuous power to bootstrap subsequent construction phases.

---

## 1. Design Philosophy and Approach

### 1.1 Guiding Principles

My design philosophy centers on five core tenets:

1. **Mass Efficiency Above All**: At current launch costs (~$1,500/kg to LEO, ~$15,000/kg to 0.5 AU transfer orbit), every gram matters. The design targets <100 g/m² areal density.

2. **Graceful Degradation**: Individual component failures must not cascade. The swarm must tolerate losing 10% of units annually while maintaining 90% power output through redundancy.

3. **Autonomous Operation**: With light-speed delays of 2-8 minutes to Earth and millions of eventual units, SCUs must be self-managing with minimal ground intervention.

4. **Manufacturability at Scale**: Phase 1 is 1,000 units; Phase 10 is 10 billion. Every design decision must consider exponential scaling.

5. **Evolutionary Architecture**: The SCU design must accommodate technology improvements without requiring complete redesigns.

### 1.2 Trade Study Summary

| Architecture | Areal Density | Efficiency | TRL | Scalability | **Selected** |
|--------------|---------------|------------|-----|-------------|--------------|
| Rigid Si panels | 2,500 g/m² | 22% | 9 | Poor | No |
| Flexible CIGS | 450 g/m² | 18% | 7 | Moderate | No |
| Thin-film GaAs | 180 g/m² | 28% | 6 | Good | No |
| **Perovskite-Si tandem sail** | **85 g/m²** | **31%** | **5** | **Excellent** | **Yes** |
| Solar thermal | 1,200 g/m² | 35% | 4 | Poor | No |

I recommend **perovskite-silicon tandem thin-film sails** despite lower TRL because:
- 3× better mass efficiency than alternatives
- Tandem architecture captures broader spectrum
- Manufacturing process amenable to in-space production
- Degradation mechanisms well-understood and manageable

---

## 2. Technical Specifications

### 2.1 Primary Specifications

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Collector Area** | 10,000 m² (100m × 100m) | Optimal for deployment mechanics |
| **Total Mass** | 1,850 kg | Including all subsystems |
| **Areal Density** | 85 g/m² (collector only) | 185 g/m² (total system) |
| **Conversion Efficiency** | 31% BOL, 25% EOL | 15-year design life |
| **Power Output (0.5 AU)** | 52.4 MW BOL | Solar flux: 5,480 W/m² |
| **Power Output (1.0 AU)** | 13.1 MW BOL | For comparison |
| **Operating Temperature** | 85-120°C | Passive thermal management |
| **Design Life** | 15 years | With degradation margin |
| **Pointing Accuracy** | ±0.5° | For power transmission |
| **Station-keeping ΔV** | 50 m/s/year | Solar radiation pressure compensation |

### 2.2 Orbital Parameters

```
ORBITAL CONFIGURATION - PHASE 1

                          ☀️ Sun
                           |
                    0.5 AU |
                    (74.8M km)
                           |
              ┌────────────┴────────────┐
              |                         |
         ◇ SCU-001                 ◇ SCU-500
              \                       /
               \    Swarm Ring      /
                \   (1000 units)   /
                 \               /
                  ◇─────◇─────◇
                       ...
                  
Orbital Period: 129 days
Orbital Velocity: 42.1 km/s
Ring Circumference: 470M km
Inter-SCU Spacing: ~470,000 km (Phase 1)
```

**Orbital Selection Rationale (0.5 AU):**
- Solar flux 4× Earth orbit (5,480 vs 1,361 W/m²)
- Reasonable thermal environment (manageable with passive cooling)
- Acceptable communication latency (4.2 min one-way at conjunction)
- Lower ΔV than Mercury orbit alternatives
- Avoids Venus gravitational perturbations

---

## 3. System Architecture

### 3.1 Top-Level Block Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SOLAR COLLECTOR UNIT (SCU)                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    COLLECTOR ARRAY (10,000 m²)                      │   │
│  │  ┌─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐     │   │
│  │  │ Module  │ Module  │ Module  │ Module  │ Module  │ Module  │     │   │
│  │  │  1-1    │  1-2    │  1-3    │  1-4    │  1-5    │  1-6    │ ... │   │
│  │  ├─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤     │   │
│  │  │ Module  │ Module  │ Module  │ Module  │ Module  │ Module  │     │   │
│  │  │  2-1    │  2-2    │  2-3    │  2-4    │  2-5    │  2-6    │ ... │   │
│  │  └─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘     │   │
│  │                    (25 × 40 = 1000 modules total)                   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    │ DC Power Bus (850V nominal)            │
│                                    ▼                                        │
│  ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐      │
│  │  POWER MGMT &    │◄──►│   CENTRAL BUS    │◄──►│   MICROWAVE      │      │
│  │  DISTRIBUTION    │    │   COMPUTER       │    │   TRANSMITTER    │      │
│  │  (PMAD)          │    │   (CBC)          │    │   ARRAY (MTA)    │      │
│  └────────┬─────────┘    └────────┬─────────┘    └────────┬─────────┘      │
│           │                       │                       │                 │
│           │              ┌────────┴────────┐              │ 2.45 GHz       │
│           │              │                 │              │ Beam           │
│           ▼              ▼                 ▼              ▼                 │
│  ┌──────────────┐ ┌────────────┐ ┌──────────────┐ ┌──────────────┐         │
│  │   THERMAL    │ │   COMMS    │ │   ATTITUDE   │ │   PROPULSION │         │
│  │   CONTROL    │ │   SYSTEM   │ │   CONTROL    │ │   SYSTEM     │         │
│  │   (TCS)      │ │   (X/Ka)   │ │   (ACS)      │ │   (ION)      │         │
│  └──────────────┘ └────────────┘ └──────────────┘ └──────────────┘         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Physical Configuration

```
DEPLOYED CONFIGURATION (Top View)
                                    
                    100 m
    ◄──────────────────────────────────────►
    
    ┌──────────────────────────────────────┐  ▲
    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
    │░░░░░░░░░░░░░COLLECTOR░░░░░░░░░░░░░░░░│  │ 100 m
    │░░░░░░░░░░░░░░ARRAY░░░░░░░░░░░░░░░░░░░│  │
    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
    └──────────────────────────────────────┘  ▼
                      │
                      │ Boom (15m)
                      │
                 ┌────┴────┐
                 │   BUS   │ ◄── Central Bus Module
                 │  MODULE │     (3m × 3m × 2m)
                 └────┬────┘
                      │
              ┌───────┴───────┐
              │               │
         ┌────┴────┐     ┌────┴────┐
         │   MTA   │     │   MTA   │  ◄── Microwave Transmitter
         │  (10m)  │     │  (10m)  │      Arrays (steerable)
         └─────────┘     └─────────┘


STOWED CONFIGURATION (Launch)

    ┌─────────────────────────────┐
    │  ┌─────────────────────┐   │
    │  │  Folded Collector   │   │  ◄── 5m × 5m × 3m package
    │  │  (accordion fold)   │   │
    │  └─────────────────────┘   │
    │  ┌─────────────────────┐   │
    │  │    Bus Module       │   │
    │  └─────────────────────┘   │
    │  ┌─────────────────────┐   │
    │  │   Stowed MTAs       │   │
    │  └─────────────────────┘   │
    └─────────────────────────────┘
    
    Stowed Volume: 75 m³
    Deployed Volume: ~150,000 m³ (bounding box)
    Expansion Ratio: 2000:1
```

---

## 4. Subsystems Breakdown

### 4.1 Collector Array Subsystem

#### 4.1.1 Module Design

Each SCU contains 1,000 collector modules arranged in a 25×40 grid.

```
SINGLE COLLECTOR MODULE (10 m²)

    2.5 m
◄─────────►
┌─────────────────────────────┐  ▲
│ ┌─────────────────────────┐ │  │
│ │                         │ │  │
│ │   Perovskite Layer      │ │  │
│ │   (1.8 eV bandgap)      │ │  │
│ │   ~500 nm thick         │ │  │
│ │                         │ │  │
│ ├─────────────────────────┤ │  │ 4 m
│ │   Interface Layer       │ │  │
│ │   (tunnel junction)     │ │  │
│ ├─────────────────────────┤ │  │
│ │                         │ │  │
│ │   Silicon Layer         │ │  │
│ │   (1.1 eV bandgap)      │ │  │
│ │   ~50 μm thick          │ │  │
│ │                         │ │  │
│ └─────────────────────────┘ │  │
│  ═══════════════════════════ │  │  ◄── Integrated power bus
└─────────────────────────────┘  ▼

Module Specifications:
- Area: 10 m²
- Mass: 850 g (85 g/m²)
- Thickness: 75 μm (total stack)
- Output: 524 W BOL @ 0.5 AU
- Voltage: 85V nominal
- Bypass diodes: 4 per module
```

#### 4.1.2 Layer Stack Detail

```
COLLECTOR LAYER STACK (not to scale)

┌────────────────────────────────────────┐
│  Anti-reflective coating (MgF₂)  100nm │
├────────────────────────────────────────┤
│  Encapsulant (UV-stable polymer) 10μm  │
├────────────────────────────────────────┤
│  Top contact (ITO)               200nm │
├────────────────────────────────────────┤
│  Electron transport (SnO₂)       50nm  │
├────────────────────────────────────────┤
│  PEROVSKITE ABSORBER             500nm │ ◄── Cs₀.₀₅FA₀.₈MA₀.₁₅Pb(I₀.₈₃Br₀.₁₇)₃
│  (1.8 eV bandgap)                      │
├────────────────────────────────────────┤
│  Hole transport (Spiro-OMeTAD)   200nm │
├────────────────────────────────────────┤
│  Recombination layer             20nm  │
├────────────────────────────────────────┤
│  SILICON HETEROJUNCTION          50μm  │ ◄── n-type c-Si with a-Si:H passivation
│  (1.1 eV bandgap)                      │
├────────────────────────────────────────┤
│  Back contact (Al)               500nm │
├────────────────────────────────────────┤
│  Structural substrate (Kapton)   12μm  │
├────────────────────────────────────────┤
│  Thermal emissive coating        5μm   │ ◄── High-ε for radiative cooling
└────────────────────────────────────────┘

Total thickness: ~75 μm
Areal density: 85 g/m²
```

#### 4.1.3 Deployment Mechanism

```
DEPLOYMENT SEQUENCE

Phase 1: Stowed                    Phase 2: Boom Extension
┌─────────┐                        ┌─────────┐
│ ▓▓▓▓▓▓▓ │                        │ ▓▓▓▓▓▓▓ │
│ ▓▓▓▓▓▓▓ │                        │ ▓▓▓▓▓▓▓ │
│ ▓▓▓▓▓▓▓ │                        │ ▓▓▓▓▓▓▓ │
│ ═══════ │                        │    │    │
│ [BUS]   │                        │    │    │ ◄── 15m boom deploys
│ ═══════ │                        │    │    │
└─────────┘                        │ [BUS]   │
                                   └─────────┘

Phase 3: Primary Unfold            Phase 4: Full Deployment
      ┌───────────┐                ┌─────────────────────┐
      │░░░░░░░░░░░│                │░░░░░░░░░░░░░░░░░░░░░│
      │░░░░░░░░░░░│                │░░░░░░░░░░░░░░░░░░░░░│
      │░░░░░░░░░░░│                │░░░░░░░░░░░░░░░░░░░░░│
      │░░░░░░░░░░░│                │░░░░░░░░░░░░░░░░░░░░░│
      │░░░░░░░░░░░│                │░░░░░░░░░░░░░░░░░░░░░│
          │                                  │
          │                                  │
       [BUS]                              [BUS]
                                         /    \
                                      [MTA]  [MTA]

Deployment Time: 4 hours
Deployment Power: 500W (from batteries)
Deployment Actuators: 48 (spring-loaded with dampers)
```

### 4.2 Power Management and Distribution (PMAD)

#### 4.2.1 Architecture

```
PMAD BLOCK DIAGRAM

COLLECTOR ARRAY                    POWER PROCESSING                 LOADS
─────────────────                  ─────────────────                 ─────
                                   
Module String 1 ──┐                ┌─────────────┐
(25 modules)      │                │             │
85V × 25 = 2125V  ├───────────────►│   MPPT #1   │──┐
                  │                │   (2.5 kW)  │  │
Module String 2 ──┤                └─────────────┘  │
                  │                                 │
Module String 3 ──┤                ┌─────────────┐  │    ┌──────────────┐
        .         ├───────────────►│   MPPT #2   │──┼───►│  850V DC Bus │
        .         │                │   (2.5 kW)  │  │    └──────┬───────┘
        .         │                └─────────────┘  │           │
                  │                      .          │           │
Module String 40──┤                      .          │     ┌─────┴─────┐
                  │                      .          │     │           │
                  │                ┌─────────────┐  │     ▼           ▼
                  └───────────────►│   MPPT #40  │──┘  ┌─────┐   ┌─────────┐
                                   │   (2.5 kW)  │     │ MTA │   │Housekpng│
                                   └─────────────┘     │52 MW│   │ 5 kW    │
                                                       └─────┘   └─────────┘
                                   
                                   ┌─────────────┐
                                   │  BATTERY    │
                                   │  SYSTEM     │◄──── Eclipse/contingency
                                   │  (50 kWh)   │      (Li-S cells)
                                   └─────────────┘
```

#### 4.2.2 Specifications

| Parameter | Value |
|-----------|-------|
| Array Voltage (MPP) | 2,125 V per string |
| Bus Voltage | 850 V DC (regulated) |
| MPPT Efficiency | 98.5% |
| Number of MPPT Units | 40 |
| Total MPPT Capacity | 100 kW |
| Battery Capacity | 50 kWh |
| Battery Chemistry | Lithium-Sulfur |
| Battery Mass | 125 kg |
| Housekeeping Power | 5 kW continuous |

### 4.3 Microwave Transmitter Array (MTA)

The MTA converts DC power to microwave radiation for wireless power transmission to receiving stations.

#### 4.3.1 Design Approach

I recommend a **phased array magnetron architecture** over solid-state alternatives:

| Technology | Efficiency | Mass/kW | Cost/kW | TRL | **Selected** |
|------------|------------|---------|---------|-----|--------------|
| Solid-state GaN | 70% | 2.5 kg | $50,000 | 7 | No |
| Klystron | 75% | 8 kg | $20,000 | 9 | No |
| **Magnetron array** | **85%** | **1.2 kg** | **$5,000** | **6** | **Yes** |
| Gyrotron | 80% | 15 kg | $100,000 | 5 | No |

#### 4.3.2 MTA Specifications

```
MTA CONFIGURATION

┌─────────────────────────────────────────────────────────────────┐
│                    MICROWAVE TRANSMITTER ARRAY                  │
│                                                                 │
│    ┌─────────────────────────────────────────────────────┐     │
│    │  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  │     │
│    │  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  │     │
│    │  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  │     │
│    │  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  │     │
│    │  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  │     │
│    │                                                     │     │
│    │              (2,500 magnetron elements)             │     │
│    │                                                     │     │
│    │  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  │     │
│    │  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  │     │
│    │  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  │     │
│    │  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  │     │
│    │  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  │     │
│    └─────────────────────────────────────────────────────┘     │
│                                                                 │
│    Array Diameter: 10 m                                         │
│    Element Spacing: 0.2 m (λ/0.6 at 2.45 GHz)                  │
│    Elements per Array: 2,500                                    │
│    Arrays per SCU: 2                                            │
│    Total Elements: 5,000                                        │
└─────────────────────────────────────────────────────────────────┘
```

| Parameter | Value |
|-----------|-------|
| Frequency | 2.45 GHz (ISM band) |
| DC-to-RF Efficiency | 85% |
| Beam Steering Range | ±30° |
| Beam Width | 0.1° (at boresight) |
| Peak Power Density | 23 kW/m² (at aperture) |
| Transmitted Power | 44.5 MW (per SCU) |
| Sidelobe Level | -30 dB |
| Mass (both arrays) | 120 kg |

#### 4.3.3 Beam Safety Interlock

```
BEAM SAFETY SYSTEM

                    ┌─────────────────────┐
                    │   TARGET TRACKING   │
                    │      COMPUTER       │
                    └──────────┬──────────┘
                               │
           ┌───────────────────┼───────────────────┐
           │                   │                   │
           ▼                   ▼                   ▼
    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
    │   STAR      │    │   BEACON    │    │   SWARM     │
    │   TRACKER   │    │   RECEIVER  │    │   NETWORK   │
    │   (±0.01°)  │    │   (±0.001°) │    │   POSITION  │
    └──────┬──────┘    └──────┬──────┘    └──────┬──────┘
           │                   │                   │
           └───────────────────┼───────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   VOTING LOGIC      │
                    │   (2-of-3 required) │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       ┌───────────┐    ┌───────────┐    ┌───────────┐
       │  ENABLE   │    │  REDUCE   │    │  SHUTDOWN │
       │  (normal) │    │  (caution)│    │  (fault)  │
       └───────────┘    └───────────┘    └───────────┘
       
Safety Constraints:
- Beam DISABLED if pointing uncertainty > 0.1°
- Beam DISABLED if no beacon lock for > 10 seconds
- Beam DISABLED if collision warning from swarm network
- Automatic defocus if power density exceeds safety threshold
```

### 4.4 Attitude Control System (ACS)

#### 4.4.1 Requirements

| Parameter | Requirement | Margin |
|-----------|-------------|--------|
| Pointing Accuracy | ±0.5° | 2× |
| Pointing Knowledge | ±0.05° | 3× |
| Slew Rate | 0.1°/s | 1.5× |
| Stability | 0.01°/s | 2× |

#### 4.4.2 Architecture

```
ACS BLOCK DIAGRAM

SENSORS                          ACTUATORS
───────                          ─────────

┌─────────────┐                  ┌─────────────────┐
│ Star        │                  │ Control Moment  │
│ Trackers    │──┐               │ Gyros (4×)      │
│ (3×)        │  │               │ 50 Nms each     │
└─────────────┘  │               └────────┬────────┘
                 │                        │
┌─────────────┐  │    ┌──────────┐       │
│ Sun         │  │    │          │       │
│ Sensors     │──┼───►│   ACS    │───────┤
│ (6×)        │  │    │ COMPUTER │       │
└─────────────┘  │    │          │       │
                 │    └──────────┘       │
┌─────────────┐  │                       │
│ Fiber Optic │  │               ┌───────┴───────┐
│ Gyros       │──┤               │ Magnetorquers │
│ (3-axis)    │  │               │ (backup only) │
└─────────────┘  │               └───────────────┘
                 │
┌─────────────┐  │               ┌───────────────┐
│ GPS-like    │  │               │ Ion Thrusters │
│ Beacon      │──┘               │ (for momentum │
│ Receiver    │                  │  dumping)     │
└─────────────┘                  └───────────────┘
```

**Key Design Decision:** I've selected Control Moment Gyros (CMGs) over reaction wheels because:
- 10× torque-to-mass ratio
- No consumables for normal operations
- Better suited for large, flexible structures
- Momentum dumping only needed monthly (using ion propulsion)

### 4.5 Propulsion System

#### 4.5.1 Requirements

| Function | ΔV Required | Frequency |
|----------|-------------|-----------|
| Station-keeping (SRP compensation) | 50 m/s/year | Continuous |
| Collision avoidance | 10 m/s reserve | As needed |
| Orbit adjustment | 100 m/s reserve | Rare |
| CMG momentum dumping | 5 m/s/year | Monthly |
| **Total 15-year ΔV** | **~1,000 m/s** | - |

#### 4.5.2 Selected System: Gridded Ion Thrusters

```
PROPULSION SYSTEM LAYOUT

                    ┌─────────────────────────────┐
                    │      COLLECTOR ARRAY        │
                    │                             │
                    └─────────────┬───────────────┘
                                  │
                                  │ Boom
                                  │
                    ┌─────────────┴───────────────┐
                    │         BUS MODULE          │
                    │  ┌─────────────────────┐    │
                    │  │    Xe Tank (150kg)  │    │
                    │  │    @ 150 bar        │    │
                    │  └─────────────────────┘    │
                    │                             │
                    │  ┌───┐ ┌───┐ ┌───┐ ┌───┐   │
                    │  │T1 │ │T2 │ │T3 │ │T4 │   │ ◄── 4× Ion thrusters
                    │  └─┬─┘ └─┬─┘ └─┬─┘ └─┬─┘   │     (1 kW each)
                    └────┼─────┼─────┼─────┼─────┘
                         │     │     │     │
                         ▼     ▼     ▼     ▼
                    Thrust vectors (gimbaled ±15°)
```

| Parameter | Value |
|-----------|-------|
| Thruster Type | Gridded Ion (NEXT-derived) |
| Number of Thrusters | 4 (2 active, 2 redundant) |
| Thrust per Thruster | 236 mN |
| Specific Impulse | 4,190 s |
| Power per Thruster | 1 kW |
| Propellant | Xenon |
| Propellant Mass | 150 kg |
| Total Impulse | 6.15 MNs |
| ΔV Capability | 3,300 m/s |

### 4.6 Communications System

#### 4.6.1 Link Budget

```
COMMUNICATION LINKS

                         ┌─────────────────┐
                         │   EARTH GROUND  │
                         │    STATIONS     │
                         └────────┬────────┘
                                  │
                    X-band (8 GHz)│ Ka-band (32 GHz)
                    Telemetry     │ High-rate data
                    1 kbps        │ 10 Mbps
                                  │
                         ┌────────┴────────┐
                         │       SCU       │
                         └────────┬────────┘
                                  │
                    S-band (2 GHz)│ Inter-SCU mesh
                    Low-rate      │ 100 kbps
                                  │
              ┌───────────────────┼───────────────────┐
              │                   │                   │
              ▼                   ▼                   ▼
         ┌─────────┐         ┌─────────┐         ┌─────────┐
         │ SCU-002 │◄───────►│ SCU-003 │◄───────►│ SCU-004 │
         └─────────┘         └─────────┘         └─────────┘
```

| Link | Frequency | Data Rate | Range | Antenna |
|------|-----------|-----------|-------|---------|
| Earth Uplink | X-band (7.2 GHz) | 1 kbps | 1.5 AU max | 1m dish |
| Earth Downlink | Ka-band (32 GHz) | 10 Mbps | 1.5 AU max | 1m dish |
| Inter-SCU | S-band (2.1 GHz) | 100 kbps | 500,000 km | Patch array |
| Emergency | UHF (400 MHz) | 100 bps | 1.5 AU | Omni |

### 4.7 Thermal Control System

#### 4.7.1 Thermal Environment at 0.5 AU

| Parameter | Value |
|-----------|-------|
| Solar Flux | 5,480 W/m² |
| Absorbed (α=0.3) | 1,644 W/m² |
| Electrical Conversion | 1,699 W/m² (31% eff.) |
| Waste Heat | ~3,800 W/m² |

#### 4.7.2 Thermal Design

```
THERMAL BALANCE

Solar Input                    Electrical Output
5,480 W/m²                     1,699 W/m² (31%)
    │                               │
    ▼                               │
┌─────────────────────────────┐     │
│      COLLECTOR ARRAY        │─────┘
│                             │
│   Operating Temp: 85-120°C  │
│                             │
│   Front: α=0.3, ε=0.1       │
│   Back:  α=0.1, ε=0.9       │
└─────────────────────────────┘
    │
    │ Radiative emission (back side)
    │ ε × σ × T⁴ × A
    │ 0.9 × 5.67e-8 × 393⁴ × 10,000
    │ = 12.2 MW
    ▼
    
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           Deep Space (4K)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
Thermal Balance Check:
- Input: 54.8 MW (solar)
- Electrical out: 17.0 MW
- Radiative out: 12.2 MW + edges
- Equilibrium temp: ~105°C ✓
```

**Key Insight:** The thin-film architecture naturally achieves thermal equilibrium through radiative cooling. No active thermal control required for the collector array.

### 4.8 Central Bus Computer (CBC)

#### 4.8.1 Computing Architecture

```
CBC ARCHITECTURE

┌─────────────────────────────────────────────────────────────────┐
│                    CENTRAL BUS COMPUTER                         │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   PROCESSOR A   │  │   PROCESSOR B   │  │   PROCESSOR C   │ │
│  │   (Primary)     │  │   (Hot spare)   │  │   (Cold spare)  │ │
│  │                 │  │                 │  │                 │ │
│  │  RISC-V 64-bit  │  │  RISC-V 64-bit  │  │  RISC-V 64-bit  │ │
│  │  1 GHz, Rad-hard│  │  1 GHz, Rad-hard│  │  1 GHz, Rad-hard│ │
│  │  2 GB ECC RAM   │  │  2 GB ECC RAM   │  │  2 GB ECC RAM   │ │
│  │  64 GB Flash    │  │  64 GB Flash    │  │  64 GB Flash    │ │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘ │
│           │                    │                    │          │
│           └────────────────────┼────────────────────┘          │
│                                │                               │
│                    ┌───────────┴───────────┐                   │
│                    │    VOTING LOGIC &     │                   │
│                    │    FAULT MANAGEMENT   │                   │
│                    └───────────┬───────────┘                   │
│                                │                               │
│  ┌─────────────────────────────┴─────────────────────────────┐ │
│  │                    SPACEWIRE NETWORK                      │ │
│  │                    (100 Mbps, redundant)                  │ │
│  └─────────────────────────────┬─────────────────────────────┘ │
│                                │                               │
└────────────────────────────────┼───────────────────────────────┘
                                 │
        ┌────────────────────────┼────────────────────────────┐
        │            │           │           │                │
        ▼            ▼           ▼           ▼                ▼
    ┌───────┐   ┌───────┐   ┌───────┐   ┌───────┐       ┌───────┐
    │ PMAD  │   │  ACS  │   │  MTA  │   │ COMMS │  ...  │PROPUL │
    │CONTROL│   │CONTROL│   │CONTROL│   │CONTROL│       │CONTROL│
    └───────┘   └───────┘   └───────┘   └───────┘       └───────┘
```

#### 4.8.2 Software Architecture

| Layer | Function | Size |
|-------|----------|------|
| Flight Executive | Task scheduling, fault management | 50 KB |
| GN&C | Attitude determination, control laws | 200 KB |
| Power Management | MPPT control, load shedding | 100 KB |
| Thermal | Monitoring, heater control | 50 KB |
| Communications | Protocol stacks, compression | 150 KB |
| Autonomy | Planning, anomaly detection | 500 KB |
| **Total** | | **~1 MB** |

---

## 5. Autonomy, Control, and Communication

### 5.1 Autonomy Levels

Given the communication latency (4-16 minutes round-trip) and eventual swarm scale, SCUs must operate at high autonomy levels:

```
AUTONOMY HIERARCHY

Level 5: Full Autonomy (Normal Operations)
├── Self-monitoring and health assessment
├── Automatic fault detection and recovery
├── Autonomous station-keeping
├── Collision avoidance
└── Power optimization

Level 4: Supervised Autonomy
├── Mission planning execution
├── Coordinated swarm maneuvers
└── Scheduled maintenance activities

Level 3: Shared Control
├── Anomaly investigation
├── Software updates
└── Configuration changes

Level 2: Ground-Assisted
├── Major fault recovery
├── Orbit modifications
└── Commissioning activities

Level 1: Ground Control
├── Emergency operations
├── End-of-life disposal
└── Critical commanding
```

### 5.2 Swarm Coordination

```
SWARM NETWORK TOPOLOGY

                    ┌─────────────────────────────────────┐
                    │         EARTH GROUND SEGMENT        │
                    │  ┌─────────┐  ┌─────────┐          │
                    │  │ Mission │  │ Swarm   │          │
                    │  │ Control │  │ Manager │          │
                    │  └────┬────┘  └────┬────┘          │
                    └───────┼────────────┼───────────────┘
                            │            │
                            │   X/Ka-band links
                            │            │
                    ┌───────┴────────────┴───────┐
                    │      RELAY SATELLITES      │
                    │   (Earth-Sun L1 position)  │
                    └───────┬────────────┬───────┘
                            │            │
                            │            │
    ┌───────────────────────┴────────────┴───────────────────────┐
    │                                                             │
    │                    SWARM MESH NETWORK                       │
    │                                                             │
    │    ◇───────◇───────◇───────◇───────◇───────◇───────◇      │
    │    │       │       │       │       │       │       │      │
    │    ◇───────◇───────◇───────◇───────◇───────◇───────◇      │
    │    │       │       │       │       │       │       │      │
    │    ◇───────◇───────◇───────◇───────◇───────◇───────◇      │
    │                                                             │
    │    Each SCU maintains links to 6 nearest neighbors          │
    │    Mesh provides redundant paths to ground                  │
    │    Local coordination for collision avoidance               │
    │                                                             │
    └─────────────────────────────────────────────────────────────┘
```

### 5.3 Fault Management Philosophy

| Fault Category | Response Time | Action |
|----------------|---------------|--------|
| Imminent collision | < 1 second | Autonomous avoidance maneuver |
| Attitude anomaly | < 10 seconds | Safe mode, sun-pointing |
| Power anomaly | < 1 minute | Load shedding, battery backup |
| Thermal anomaly | < 10 minutes | Adjust orientation |
| Communication loss | < 1 hour | Autonomous operations continue |
| Component failure | < 24 hours | Reconfigure to redundant unit |

---

## 6. Mass Budget

### 6.1 Detailed Mass Breakdown

```
MASS BUDGET SUMMARY

┌─────────────────────────────────────────────────────────────────┐
│                    SCU MASS BUDGET                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  COLLECTOR ARRAY SUBSYSTEM                           850 kg     │
│  ├── Photovoltaic modules (1000 × 0.85 kg)          850 kg     │
│  ├── Deployment structure                            included   │
│  └── Wiring harness                                  included   │
│                                                                 │
│  POWER MANAGEMENT & DISTRIBUTION                     180 kg     │
│  ├── MPPT units (40 × 2 kg)                          80 kg     │
│  ├── Power distribution unit                          25 kg     │
│  ├── Battery system (50 kWh)                         125 kg     │
│  └── Cabling                                          50 kg     │
│                                                                 │
│  MICROWAVE TRANSMITTER ARRAY                         280 kg     │
│  ├── Magnetron elements (5000 × 0.02 kg)            100 kg     │
│  ├── Waveguide network                                60 kg     │
│  ├── Phase control electronics                        40 kg     │
│  ├── Antenna structure (2 × 10m dishes)              60 kg     │
│  └── Thermal management                               20 kg     │
│                                                                 │
│  ATTITUDE CONTROL SYSTEM                             120 kg     │
│  ├── Control moment gyros (4 × 25 kg)               100 kg     │
│  ├── Star trackers (3 × 2 kg)                         6 kg     │
│  ├── Sun sensors (6 × 0.5 kg)                         3 kg     │
│  ├── Fiber optic gyros                                8 kg     │
│  └── ACS electronics                                   3 kg     │
│                                                                 │
│  PROPULSION SYSTEM                                   200 kg     │
│  ├── Ion thrusters (4 × 8 kg)                        32 kg     │
│  ├── Xenon tank                                       18 kg     │
│  ├── Xenon propellant                                150 kg     │
│  └── Feed system & PPU                                 0 kg     │
│                                                                 │
│  COMMUNICATIONS                                       45 kg     │
│  ├── Ka-band transponder                              10 kg     │
│  ├── X-band transponder                                8 kg     │
│  ├── S-band mesh radio                                 5 kg     │
│  ├── High-gain antenna (1m)                          15 kg     │
│  └── Antenna pointing mechanism                        7 kg     │
│                                                                 │
│  CENTRAL BUS COMPUTER                                 25 kg     │
│  ├── Processors (3 × 3 kg)                            9 kg     │
│  ├── Mass memory                                       4 kg     │
│  ├── I/O electronics                                   8 kg     │
│  └── Enclosure & thermal                               4 kg     │
│                                                                 │
│  STRUCTURES & MECHANISMS                             100 kg     │
│  ├── Central bus structure                           40 kg     │
│  ├── Deployment boom (15m)                           25 kg     │
│  ├── MTA gimbals                                     20 kg     │
│  └── Miscellaneous brackets                          15 kg     │
│                                                                 │
│  THERMAL CONTROL                                      20 kg     │
│  ├── MLI blankets                                     8 kg     │
│  ├── Heaters & thermostats                            5 kg     │
│  └── Radiator panels                                   7 kg     │
│                                                                 │
│  HARNESS & MISCELLANEOUS                              30 kg     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  SUBTOTAL (Dry Mass)                               1,700 kg     │
│  MARGIN (10%)                                        150 kg     │
├─────────────────────────────────────────────────────────────────┤
│  TOTAL SCU MASS                                    1,850 kg     │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 Mass Efficiency Metrics

| Metric | Value |
|--------|-------|
| Total Mass | 1,850 kg |
| Collector Area | 10,000 m² |
| Areal Density (total) | 185 g/m² |
| Areal Density (collector only) | 85 g/m² |
| Power-to-Mass Ratio | 28.3 kW/kg (BOL) |
| Specific Power | 5.4 W/g |

---

## 7. Manufacturing Considerations

### 7.1 Production Philosophy

For Phase 1 (1,000 units), I recommend a **hybrid approach**:
- Collector modules: Automated roll-to-roll manufacturing
- Bus components: Traditional aerospace production with increased automation
- Final integration: Parallel assembly lines

### 7.2 Collector Module Manufacturing

```
ROLL-TO-ROLL PRODUCTION LINE

Raw Materials                    Processing                      Output
────────────                     ──────────                      ──────

┌─────────┐     ┌─────────────────────────────────────────┐     ┌─────────┐
│ Kapton  │     │                                         │     │         │
│ Roll    │────►│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐   │────►│ Module  │
│ (12μm)  │     │  │Sputter│ │Perov│  │Laser│  │Test │   │     │ Roll    │
└─────────┘     │  │ Si   │  │Depo │  │Scribe│ │     │   │     │         │
                │  └─────┘  └─────┘  └─────┘  └─────┘   │     └─────────┘
┌─────────┐     │     │        │        │        │       │
│ Silicon │     │     ▼        ▼        ▼        ▼       │
│ Targets │────►│  ═══════════════════════════════════   │
└─────────┘     │         Continuous Web (1m wide)       │
                │                                         │
┌─────────┐     │  Line Speed: 10 m/min                  │
│Perovskite│────►│  Output: 600 m²/hour                   │
│Precursors│     │  Yield: 95%                            │
└─────────┘     │  Modules/day: 1,440                    │
                │                                         │
                └─────────────────────────────────────────┘

Production Capacity Required:
- 1,000 SCUs × 1,000 modules = 1,000,000 modules
- At 1,440 modules/day = 694 production days
- With 3 parallel lines = 232 days (~8 months)
```

### 7.3 Manufacturing Facility Requirements

| Facility | Floor Space | Clean Room | Equipment Cost |
|----------|-------------|------------|----------------|
| Collector production | 5,000 m² | Class 10,000 | $200M |
| Bus module assembly | 3,000 m² | Class 100,000 | $150M |
| Integration & test | 4,000 m² | Class 100,000 | $100M |
| **Total** | **12,000 m²** | - | **$450M** |

### 7.4 Supply Chain Considerations

**Critical Materials:**
| Material | Quantity (Phase 1) | Current Production | Supply Risk |
|----------|-------------------|-------------------|-------------|
| High-purity Si | 500 tonnes | Adequate | Low |
| Kapton film | 120,000 m² | Adequate | Low |
| Xenon | 150 tonnes | **Constrained** | **High** |
| Perovskite precursors | 50 tonnes | Limited | Medium |
| Rare earths (magnets) | 20 tonnes | Constrained | Medium |

**Xenon Supply Mitigation:** Xenon is a byproduct of air separation. Current global production is ~70 tonnes/year. Phase 1 requires 150 tonnes. Options:
1. Stockpile over 3 years before production
2. Develop krypton-based thruster variant (lower Isp but abundant)
3. Negotiate dedicated production capacity

---

## 8. Development Roadmap

### 8.1 Technology Readiness Assessment

```
TECHNOLOGY READINESS LEVELS

Component                          Current TRL    Target TRL    Gap
─────────────────────────────────────────────────────────────────────
Perovskite-Si tandem cells              5             7          2
Thin-film deployment structures         6             8          2
High-efficiency magnetrons              6             8          2
Space-rated CMGs                        8             9          1
Gridded ion thrusters                   9             9          0
Autonomous swarm software               4             7          3
Inter-SCU mesh networking               5             7          2
─────────────────────────────────────────────────────────────────────
```

### 8.2 Development Schedule

```
PHASE 1 DEVELOPMENT TIMELINE

Year 1                Year 2                Year 3                Year 4
├─────────────────────┼─────────────────────┼─────────────────────┼─────────────────────┤

TECHNOLOGY DEVELOPMENT
████████████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
├── Perovskite cell optimization
├── Deployment mechanism prototyping  
├── Magnetron array development
└── Autonomy software development

ENGINEERING MODEL
                    ████████████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                    ├── Subsystem engineering models
                    ├── Integration testing
                    └── Environmental qualification

PROTOTYPE (1/10 SCALE)
                                        ████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░
                                        ├── Full-scale collector module
                                        ├── Reduced-scale integrated system
                                        └── Thermal vacuum testing

FLIGHT UNIT PRODUCTION
                                                            ████████████████████████████
                                                            ├── Manufacturing ramp-up
                                                            ├── Flight unit production
                                                            └── Launch campaign prep

Year 5                Year 6                Year 7                Year 8
├─────────────────────┼─────────────────────┼─────────────────────┼─────────────────────┤

FLIGHT UNIT PRODUCTION (continued)
████████████████████████████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
├── 1,000 unit production
└── Quality assurance

LAUNCH CAMPAIGN
                ████████████████████████████████████████████████████████████████████████
                ├── 100 launches (10 SCUs each)
                └── Transfer orbit insertion

COMMISSIONING
                                                ████████████████████████████████████████
                                                ├── Deployment verification
                                                ├── Swarm formation
                                                └── Power transmission tests

OPERATIONS
                                                                    ████████████████████
                                                                    └── Full power generation
```

### 8.3 Key Milestones

| Milestone | Date | Success Criteria |
|-----------|------|------------------|
| PDR (Preliminary Design Review) | Y1 Q4 | Requirements baselined |
| CDR (Critical Design Review) | Y2 Q4 | Design frozen |
| Prototype Deployment Test | Y3 Q4 | 1000 m² deployed in vacuum |
| First Flight Unit Complete | Y4 Q4 | All acceptance tests passed |
| First Launch | Y5 Q2 | Successful orbit insertion |
| First Power Transmission | Y6 Q2 | 1 MW received at target |
| Full Swarm Operational | Y8 Q2 | 50 GW total capacity |

---

## 9. Cost Analysis

### 9.1 Development Costs

```
DEVELOPMENT COST BREAKDOWN (Non-Recurring)

┌─────────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT COSTS                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  TECHNOLOGY DEVELOPMENT                              $400M      │
│  ├── Perovskite cell R&D                            $120M      │
│  ├── Deployment systems                              $80M      │
│  ├── Magnetron development                           $60M      │
│  ├── Autonomy software                              $100M      │
│  └── Test facilities                                 $40M      │
│                                                                 │
│  ENGINEERING & PROTOTYPES                            $600M      │
│  ├── Engineering models                             $200M      │
│  ├── Prototype fabrication                          $150M      │
│  ├── Environmental testing                          $100M      │
│  ├── Integration & validation                       $100M      │
│  └── Ground support equipment                        $50M      │
│                                                                 │
│  MANUFACTURING SETUP                                 $450M      │
│  ├── Collector production line                      $200M      │
│  ├── Bus assembly facility                          $150M      │
│  └── Integration facility                           $100M      │
│                                                                 │
│  PROGRAM MANAGEMENT                                  $250M      │
│  ├── Systems engineering                            $100M      │
│  ├── Quality assurance                               $50M      │
│  ├── Configuration management                        $30M      │
│  └── Program office                                  $70M      │
│                                                                 │
│  RESERVES (20%)                                      $340M      │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  TOTAL DEVELOPMENT                                 $2,040M      │
└─────────────────────────────────────────────────────────────────┘
```

### 9.2 Production Costs (1,000 Units)

```
PRODUCTION COST PER SCU

┌─────────────────────────────────────────────────────────────────┐
│                    UNIT PRODUCTION COST                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  COLLECTOR ARRAY                                    $800,000    │
│  ├── Photovoltaic modules                          $500,000    │
│  ├── Deployment structure                          $200,000    │
│  └── Integration & test                            $100,000    │
│                                                                 │
│  BUS MODULE                                       $1,200,000    │
│  ├── PMAD                                          $300,000    │
│  ├── MTA                                           $400,000    │
│  ├── ACS                                           $200,000    │
│  ├── Propulsion                                    $150,000    │
│  ├── Communications                                $100,000    │
│  └── Avionics                                       $50,000    │
│                                                                 │
│  INTEGRATION & TEST                                 $300,000    │
│                                                                 │
│  QUALITY ASSURANCE                                  $100,000    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  UNIT COST (at quantity 1,000)                    $2,400,000    │
│  TOTAL PRODUCTION (1,000 units)                   $2,400,000M   │
│                                                   = $2.4B       │
└─────────────────────────────────────────────────────────────────┘
```

### 9.3 Launch Costs

| Parameter | Value |
|-----------|-------|
| SCU Mass | 1,850 kg |
| Fairing Capacity (Starship) | 100,000 kg |
| SCUs per Launch | 10 (volume-limited) |
| Launches Required | 100 |
| Cost per Launch | $50M (projected) |
| **Total Launch Cost** | **$5,000M** |

### 9.4 Operations Costs (15-year life)

| Category | Annual Cost | 15-Year Total |
|----------|-------------|---------------|
| Mission Operations | $50M | $750M |
| Ground Segment | $20M | $300M |
| Maintenance & Replacement | $100M | $1,500M |
| **Total Operations** | **$170M/year** | **$2,550M** |

### 9.5 Total Program Cost Summary

```
PHASE 1 TOTAL COST

┌─────────────────────────────────────────────────────────────────┐
│                    PROGRAM COST SUMMARY                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Development (Non-Recurring)                        $2,040M     │
│  Production (1,000 units)                           $2,400M     │
│  Launch