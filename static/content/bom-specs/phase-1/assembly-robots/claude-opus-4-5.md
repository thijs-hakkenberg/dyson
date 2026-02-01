---
bomId: "bom-1-3"
itemName: "Assembly Robots"
itemSlug: "assembly-robots"
modelId: "claude-opus-4-5"
modelName: "Claude Opus 4.5"
generated: "2026-02-01"
phase: "phase-1"
---

# Technical Proposal: Assembly Robots for Project Dyson
## Phase 1 - Initial Swarm Deployment

**Document ID:** PD-AR-001-R1
**Author:** Space Systems Engineering Division
**Classification:** Technical Proposal

---

## Executive Summary

This proposal presents a comprehensive design for the Assembly Robot (AR) fleet that will construct Project Dyson's initial swarm elements. I recommend a **heterogeneous swarm architecture** comprising three specialized robot classes working in coordinated teams, rather than a single general-purpose design. This approach optimizes for the vastly different tasks required: precision manipulation, heavy structural work, and logistics/inspection.

The proposed system can achieve an initial deployment rate of **2.4 collector panels per Earth-day per assembly team**, scaling to **500+ panels/day** with a mature fleet of 50 teams by Year 5 of Phase 1.

---

## 1. Design Philosophy and Recommended Approach

### 1.1 Core Design Principles

**Principle 1: Specialization Over Generalization**
A single robot optimized for both delicate electronics installation and heavy truss manipulation would be prohibitively complex and massive. Instead, I propose three specialized classes:
- **AR-P (Precision)**: Fine manipulation, electronics, connections
- **AR-S (Structural)**: Heavy lifting, truss assembly, welding
- **AR-L (Logistics)**: Transport, inspection, refueling

**Principle 2: Graceful Degradation**
Every robot must continue useful operation with up to 30% subsystem failure. This means redundant actuators, distributed computing, and the ability to reconfigure roles dynamically.

**Principle 3: In-Situ Maintainability**
Robots must be serviceable by other robots. No component should require Earth-return for repair. This drives modular design with standardized interfaces.

**Principle 4: Thermal Robustness**
Operating at 1 AU with variable solar exposure, robots will experience -150°C to +120°C thermal cycling. All systems must tolerate this without active heating/cooling during dormant periods.

### 1.2 Why Not Humanoid Robots?

While humanoid designs offer intuitive teleoperation, they are suboptimal for space assembly:
- Legs are useless in microgravity
- Human-scale reach limits workspace
- Bilateral symmetry wastes mass on redundant structure

Instead, I propose **radially symmetric** designs for AR-P and **longitudinal** designs for AR-S, optimized for their specific tasks.

---

## 2. System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PROJECT DYSON ASSEMBLY SYSTEM                            │
│                         ARCHITECTURE OVERVIEW                               │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────────┐
                              │  MISSION CONTROL │
                              │   (Earth/L2)     │
                              └────────┬────────┘
                                       │ High-latency commands
                                       │ (8-20 min delay)
                                       ▼
                              ┌─────────────────┐
                              │ SWARM COORDINATOR│
                              │  (Orbital Hub)   │
                              └────────┬────────┘
                                       │ Low-latency coordination
                                       │ (<100ms)
                    ┌──────────────────┼──────────────────┐
                    ▼                  ▼                  ▼
           ┌───────────────┐  ┌───────────────┐  ┌───────────────┐
           │  TEAM ALPHA   │  │  TEAM BETA    │  │  TEAM GAMMA   │
           │ (Assembly     │  │ (Assembly     │  │ (Assembly     │
           │  Zone 1)      │  │  Zone 2)      │  │  Zone 3)      │
           └───────┬───────┘  └───────────────┘  └───────────────┘
                   │
     ┌─────────────┼─────────────┬─────────────────┐
     ▼             ▼             ▼                 ▼
┌─────────┐  ┌─────────┐  ┌─────────────┐  ┌─────────────┐
│  AR-P   │  │  AR-P   │  │    AR-S     │  │    AR-L     │
│  (x2)   │  │  (x2)   │  │    (x2)     │  │    (x3)     │
│Precision│  │Precision│  │ Structural  │  │  Logistics  │
└─────────┘  └─────────┘  └─────────────┘  └─────────────┘

TEAM COMPOSITION (Standard Assembly Team):
├── 4x AR-P (Precision Robots)
├── 2x AR-S (Structural Robots)  
└── 3x AR-L (Logistics Robots)
    Total: 9 robots per team
```

---

## 3. Detailed Robot Specifications

### 3.1 AR-P: Precision Assembly Robot

```
                         AR-P CONFIGURATION
                    (Top View - Arms Extended)
    
                              ARM 1
                                │
                           ┌────┴────┐
                          ╱    ┌─┐    ╲
                    ARM 6 │    │●│    │ ARM 2
                         ╲    └─┘    ╱
                          ╲  CORE  ╱
                           ╲      ╱
                      ARM 5 ╲    ╱ ARM 3
                             ╲  ╱
                              ││
                            ARM 4
    
    ● = Central sensor mast (stereo cameras, LIDAR, thermal)
    
                    (Side View - Docked)
    
                         ┌─────────┐
                    ═════│ SENSOR  │═════  ← Solar panels (stowed)
                         │  MAST   │
                         ├─────────┤
                    ┌────┤         ├────┐
                    │ARM │  CORE   │ ARM│  ← Avionics, batteries
                    └────┤ MODULE  ├────┘
                         ├─────────┤
                         │DOCKING  │       ← Universal docking port
                         │INTERFACE│
                         └─────────┘
```

#### AR-P Technical Specifications

| Parameter | Value | Justification |
|-----------|-------|---------------|
| **Mass (dry)** | 85 kg | Minimized for propellant efficiency |
| **Mass (wet)** | 120 kg | 35 kg hydrazine capacity |
| **Dimensions (stowed)** | 1.2m × 1.2m × 0.8m | Fits in standard cargo bay |
| **Dimensions (deployed)** | 4.5m arm span | Reaches across standard panel |
| **Manipulator Arms** | 6 × 7-DOF arms | Full dexterity, redundancy |
| **End Effector Force** | 50 N continuous, 200 N peak | Connector insertion force |
| **Position Accuracy** | ±0.1 mm at end effector | PCB-level assembly |
| **Power (operating)** | 800 W average, 1.5 kW peak | Based on actuator load analysis |
| **Power (dormant)** | 15 W | Thermal management only |
| **Solar Array Area** | 3.2 m² | 30% efficient cells, 1.4 kW at 1 AU |
| **Battery Capacity** | 2.5 kWh (Li-S cells) | 3 hours eclipse operation |
| **Design Life** | 10 years | With scheduled maintenance |
| **Radiation Tolerance** | 100 krad TID | Standard space-grade components |

#### AR-P Subsystems

**Manipulation System:**
- 6 identical arm modules for commonality
- Each arm: 7 degrees of freedom, 0.8m reach
- Joints: Brushless DC motors with harmonic drives (160:1 ratio)
- End effectors: Quick-change interface supporting:
  - Parallel gripper (default)
  - Torque driver (M3-M8 fasteners)
  - Welding head (laser spot welding)
  - Connector insertion tool
  - Inspection probe

**Sensing System:**
- Central mast with:
  - Stereo camera pair (4K resolution, 90° FOV)
  - Scanning LIDAR (0.1° resolution, 50m range)
  - Thermal imager (320×240, 7-14 μm)
- Per-arm sensors:
  - Wrist-mounted camera (720p, 120° FOV)
  - 6-axis force/torque sensor at wrist
  - Joint encoders (20-bit absolute)

**Computing System:**
- Primary: Radiation-hardened RISC-V processor (2 GHz, 8 cores)
- Secondary: FPGA for real-time control (Xilinx Kintex UltraScale)
- Tertiary: Neural processing unit for vision (15 TOPS)
- Memory: 64 GB radiation-hardened DRAM, 1 TB flash storage
- Software: Real-time Linux variant with ROS2-based control stack

---

### 3.2 AR-S: Structural Assembly Robot

```
                         AR-S CONFIGURATION
                       (Side View - Extended)
    
    ┌─────────────────────────────────────────────────────────────┐
    │                                                             │
    │  ┌─────┐     ┌─────────────────────┐     ┌─────┐           │
    │  │GRIP │═════│    TELESCOPING      │═════│GRIP │           │
    │  │ A   │     │    MAIN BOOM        │     │ B   │           │
    │  └──┬──┘     │    (extends to 25m) │     └──┬──┘           │
    │     │        └──────────┬──────────┘        │              │
    │     │                   │                   │              │
    │  ┌──┴──┐           ┌────┴────┐          ┌──┴──┐           │
    │  │WELD │           │  CORE   │          │WELD │           │
    │  │HEAD │           │ MODULE  │          │HEAD │           │
    │  └─────┘           └────┬────┘          └─────┘           │
    │                         │                                  │
    │                    ┌────┴────┐                             │
    │                    │PROPULSION│                            │
    │                    │ MODULE   │                            │
    │                    └─────────┘                             │
    │                                                             │
    └─────────────────────────────────────────────────────────────┘
    
                       (End View - Grippers)
    
                         ┌───────────┐
                         │  ┌─────┐  │
                         │  │     │  │  ← Structural grip
                    ═════│  │  ●  │  │═════  (1m jaw opening)
                         │  │     │  │
                         │  └─────┘  │
                         └───────────┘
                              │
                         ┌────┴────┐
                         │ WELDING │
                         │  HEAD   │
                         └─────────┘
```

#### AR-S Technical Specifications

| Parameter | Value | Justification |
|-----------|-------|---------------|
| **Mass (dry)** | 450 kg | Structural rigidity requirements |
| **Mass (wet)** | 650 kg | 200 kg propellant for heavy maneuvering |
| **Dimensions (stowed)** | 3m × 2m × 2m | Dedicated cargo deployment |
| **Dimensions (deployed)** | 25m boom length | Spans truss bay |
| **Grip Force** | 5 kN continuous | Holds 500 kg components |
| **Boom Stiffness** | 10⁶ N·m²/rad | Minimizes tip deflection |
| **Position Accuracy** | ±2 mm at boom tip | Structural tolerance |
| **Welding Power** | 3 kW electron beam | Aluminum/titanium joining |
| **Power (operating)** | 4 kW average, 8 kW peak | Welding-dominated |
| **Solar Array Area** | 15 m² | Deployable panels |
| **Battery Capacity** | 10 kWh | Extended welding operations |
| **Design Life** | 15 years | Heavy-duty construction |

#### AR-S Unique Subsystems

**Telescoping Boom:**
- 5-stage telescoping carbon fiber composite
- Retracted: 5m, Extended: 25m
- Internal cable routing for power/data to end effectors
- Tip deflection: <50mm at full extension under 100N load

**Electron Beam Welding System:**
- 60 kV accelerating voltage
- 50 mA beam current (3 kW)
- Vacuum operation (inherent in space)
- Weld penetration: up to 15mm aluminum
- Integrated seam tracking via machine vision

**Structural Grippers:**
- Parallel jaw design, 1m maximum opening
- Interchangeable jaw faces for different profiles
- Integrated force sensing (±1% accuracy)
- Magnetic backup grip for ferrous components

---

### 3.3 AR-L: Logistics and Inspection Robot

```
                         AR-L CONFIGURATION
                        (Isometric View)
    
                              ╱╲
                             ╱  ╲
                            ╱    ╲  ← Deployable antenna
                           ╱      ╲
                          ╱────────╲
                         │  ┌────┐  │
                         │  │CAM │  │  ← 360° camera array
                         │  └────┘  │
                    ┌────┴──────────┴────┐
                    │                    │
                    │    CARGO BAY       │  ← 0.5 m³ capacity
                    │    (modular)       │
                    │                    │
                    └────┬──────────┬────┘
                         │          │
                    ┌────┴──┐  ┌───┴────┐
                    │DOCK   │  │  DOCK  │  ← Dual docking ports
                    │PORT A │  │ PORT B │
                    └───────┘  └────────┘
                         │          │
                    ═════╧══════════╧═════  ← Propulsion ring
```

#### AR-L Technical Specifications

| Parameter | Value | Justification |
|-----------|-------|---------------|
| **Mass (dry)** | 150 kg | Balance of capacity and agility |
| **Mass (wet)** | 250 kg | 100 kg propellant |
| **Cargo Capacity** | 200 kg / 0.5 m³ | Standard component crate |
| **Dimensions** | 1.5m × 1.5m × 1.0m | Compact for maneuvering |
| **Delta-V Capacity** | 500 m/s | Inter-zone transfers |
| **Docking Ports** | 2 × Universal | Simultaneous cargo + robot |
| **Inspection Sensors** | Full spectrum | Detailed below |
| **Power (operating)** | 400 W average | Mostly propulsion |
| **Solar Array Area** | 4 m² | Sufficient for transit |
| **Battery Capacity** | 3 kWh | Eclipse tolerance |
| **Design Life** | 8 years | Higher wear from transit |

#### AR-L Unique Subsystems

**Cargo System:**
- Modular bay accepts standardized cargo containers
- Automated latching mechanism
- Thermal isolation for sensitive components
- Inventory tracking via RFID