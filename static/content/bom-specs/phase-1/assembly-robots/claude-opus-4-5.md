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

I propose a heterogeneous fleet of specialized assembly robots optimized for the unique challenges of constructing a Dyson swarm at 0.5 AU from the Sun. The architecture centers on three robot classes working in coordinated teams: **Welder-class** heavy manipulators, **Spider-class** precision assemblers, and **Shepherd-class** logistics coordinators. This approach balances the competing demands of thermal management, radiation hardness, autonomous operation with 4-8 minute communication delays, and the need to assemble millions of collector units over decades.

My key recommendation: **Do not attempt a single universal robot.** The environmental extremes and task diversity demand specialization. A modular, swarm-based approach with standardized interfaces will prove more robust, maintainable, and evolvable than any monolithic design.

---

## 1. Design Philosophy and Recommended Approach

### 1.1 Core Design Principles

**Principle 1: Thermal-First Design**
At 0.5 AU, solar flux is approximately 5,500 W/m². Every design decision must flow from thermal management. I reject active cooling loops as primary thermal control—they represent single points of failure over decade-long missions. Instead, I advocate for:
- Passive radiator-dominated thermal architecture
- Operational duty cycling synchronized with orbital position
- Strategic use of solar shadowing from collector units under construction

**Principle 2: Graceful Degradation Over Redundancy**
Traditional spacecraft use triple-redundant systems. For robots that must operate for 15+ years with no return-to-Earth option, I propose a different model: design for graceful degradation. Each robot should remain partially functional even with 50% subsystem failures. This means:
- Distributed computing across multiple processors
- Multiple manipulator arms where any subset can complete critical tasks
- Mesh networking where any robot can relay for any other

**Principle 3: Standardized Interfaces, Specialized Functions**
All robot classes share identical:
- Power interface connectors (standardized solar array attachment points)
- Communication protocols and antenna systems
- Docking/berthing mechanisms
- Propellant transfer ports

This enables cross-servicing while allowing each class to excel at its primary function.

### 1.2 Why Three Robot Classes?

The assembly task decomposes naturally into three domains:

| Domain | Primary Challenge | Robot Class |
|--------|------------------|-------------|
| Structural joining | High force, precision alignment, thermal cycling | Welder-class |
| Component installation | Dexterity, cable routing, delicate handling | Spider-class |
| Material handling | ΔV budget, mass transport, coordination | Shepherd-class |

A single robot attempting all three would be mediocre at each. The mass penalty of carrying heavy welding equipment while also having fine manipulation capability is prohibitive.

---

## 2. System Architecture Overview

### 2.1 Fleet Composition (Phase 1 Target)

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                    PHASE 1 ASSEMBLY ROBOT FLEET                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   WELDER-CLASS (Heavy Assembly)          SPIDER-CLASS (Precision)           ║
║   ┌─────────────────────────┐            ┌─────────────────────────┐        ║
║   │  ████████████████████   │            │      ╱╲    ╱╲           │        ║
║   │  █                  █   │            │     ╱  ╲  ╱  ╲          │        ║
║   │  █   [CORE BUS]     █   │            │    ╱    ╲╱    ╲         │        ║
║   │  █                  █   │            │   ●──────●──────●       │        ║
║   │  ████████████████████   │            │    ╲    ╱╲    ╱         │        ║
║   │       ║      ║          │            │     ╲  ╱  ╲  ╱          │        ║
║   │    ┌──╨──┐┌──╨──┐       │            │      ╲╱    ╲╱           │        ║
║   │    │ARM 1││ARM 2│       │            │   8 articulated legs    │        ║
║   │    └─────┘└─────┘       │            └─────────────────────────┘        ║
║   └─────────────────────────┘                                               ║
║   Qty: 50 units                          Qty: 200 units                     ║
║   Mass: 2,400 kg each                    Mass: 180 kg each                  ║
║                                                                              ║
║   SHEPHERD-CLASS (Logistics)             TOTAL FLEET MASS                   ║
║   ┌─────────────────────────┐            ┌─────────────────────────┐        ║
║   │         ┌───┐           │            │ Welder:   120,000 kg    │        ║
║   │    ═════│CPU│═════      │            │ Spider:    36,000 kg    │        ║
║   │         └───┘           │            │ Shepherd:  60,000 kg    │        ║
║   │      ╱       ╲          │            │ ─────────────────────   │        ║
║   │   [CARGO] [CARGO]       │            │ TOTAL:    216,000 kg    │        ║
║   │    BAY     BAY          │            │                         │        ║
║   └─────────────────────────┘            │ + Spares:  43,200 kg    │        ║
║   Qty: 100 units                         │ GRAND:    259,200 kg    │        ║
║   Mass: 600 kg each                      └─────────────────────────┘        ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

### 2.2 Operational Concept

```
                            ASSEMBLY WORKFLOW
                            
    MATERIAL DEPOT                    ASSEMBLY ZONE                    COMPLETED
    (Lagrange Point)                  (Construction)                   COLLECTOR
         │                                 │                               │
         │    ┌─────────────────────────────────────────────────────┐     │
         │    │                                                     │     │
         ▼    ▼                                                     ▼     ▼
    ┌─────────────┐     ┌─────────────┐     ┌─────────────┐    ┌─────────────┐
    │  SHEPHERD   │────▶│  SHEPHERD   │────▶│   WELDER    │───▶│  SHEPHERD   │
    │  retrieves  │     │  positions  │     │   joins     │    │  deploys    │
    │  components │     │  at worksite│     │  structure  │    │  to orbit   │
    └─────────────┘     └─────────────┘     └─────────────┘    └─────────────┘
                               │                   │
                               │                   │
                               ▼                   ▼
                        ┌─────────────┐     ┌─────────────┐
                        │   SPIDER    │     │   SPIDER    │
                        │  installs   │     │  connects   │
                        │  components │     │  wiring     │
                        └─────────────┘     └─────────────┘
                        
    Timeline per collector unit: 72-96 hours
    Parallel assemblies: 10-15 simultaneous
    Phase 1 target: 10,000 collector units/year
```

---

## 3. Detailed Technical Specifications

### 3.1 Welder-Class Heavy Assembly Robot

#### 3.1.1 Overview

The Welder-class is the workhorse for structural assembly. It performs electron beam welding, friction stir welding, and mechanical fastening of primary structure. Each unit can apply forces up to 5,000 N and position components with ±0.5mm accuracy.

#### 3.1.2 Specifications

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Mass (dry)** | 2,400 kg | Includes all manipulators |
| **Mass (wet)** | 2,850 kg | With 450 kg propellant |
| **Dimensions** | 4.2m × 3.8m × 2.1m | Stowed configuration |
| **Arm reach** | 6.5m each | Two primary arms |
| **Arm payload** | 500 kg each | At full extension |
| **Positioning accuracy** | ±0.5mm | Relative to workpiece |
| **Force application** | 5,000 N max | Per arm, any direction |
| **Power (peak)** | 25 kW | During welding operations |
| **Power (nominal)** | 3.5 kW | Station-keeping and monitoring |
| **Solar array area** | 45 m² | Deployable, articulated |
| **Battery capacity** | 15 kWh | Li-S cells, 400 Wh/kg |
| **Propulsion** | Hall-effect thrusters | 4× 500W units |
| **Specific impulse** | 1,800 s | Xenon propellant |
| **Total ΔV** | 850 m/s | Full propellant load |
| **Design life** | 15 years | With depot servicing |
| **Radiation tolerance** | 500 krad TID | Behind 3mm Al shielding |

#### 3.1.3 Subsystem Architecture

```
WELDER-CLASS SUBSYSTEM BLOCK DIAGRAM
═══════════════════════════════════════════════════════════════════════════

                         ┌─────────────────────────────────────┐
                         │         SOLAR ARRAY SYSTEM          │
                         │  45 m² GaAs triple-junction cells   │
                         │  Peak output: 28 kW @ 0.5 AU        │
                         └──────────────────┬──────────────────┘
                                            │
                                            ▼
┌──────────────────┐              ┌─────────────────────┐
│   THERMAL MGT    │◀────────────▶│   POWER SYSTEM      │
│                  │              │                     │
│ • OSR radiators  │              │ • 120V DC bus       │
│ • Heat pipes     │              │ • 15 kWh battery    │
│ • MLI blankets   │              │ • MPPT controllers  │
│ • Louvers        │              │ • Fault isolation   │
└────────┬─────────┘              └──────────┬──────────┘
         │                                   │
         │         ┌─────────────────────────┼─────────────────────────┐
         │         │                         │                         │
         │         ▼                         ▼                         ▼
         │  ┌─────────────┐          ┌─────────────┐          ┌─────────────┐
         │  │  AVIONICS   │          │ PROPULSION  │          │   COMMS     │
         │  │             │          │             │          │             │
         │  │ • Main CPU  │◀────────▶│ • 4× HET    │          │ • X-band    │
         │  │ • Vision    │          │ • Xe tanks  │          │ • Mesh RF   │
         │  │ • Nav/GNC   │          │ • PPU       │          │ • Optical   │
         │  │ • Safety    │          │ • RCS jets  │          │             │
         │  └──────┬──────┘          └─────────────┘          └─────────────┘
         │         │
         │         │
         ▼         ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        MANIPULATION SYSTEM                                   │
│  ┌─────────────────────────────┐    ┌─────────────────────────────┐         │
│  │       PRIMARY ARM 1         │    │       PRIMARY ARM 2         │         │
│  │                             │    │                             │         │
│  │  7-DOF articulated arm      │    │  7-DOF articulated arm      │         │
│  │  Harmonic drive joints      │    │  Harmonic drive joints      │         │
│  │  Force/torque sensing       │    │  Force/torque sensing       │         │
│  │  ┌─────────────────────┐    │    │  ┌─────────────────────┐    │         │
│  │  │   END EFFECTOR      │    │    │  │   END EFFECTOR      │    │         │
│  │  │   • E-beam welder   │    │    │  │   • FSW spindle     │    │         │
│  │  │   • Gripper         │    │    │  │   • Gripper         │    │         │
│  │  │   • Tool interface  │    │    │  │   • Tool interface  │    │         │
│  │  └─────────────────────┘    │    │  └─────────────────────┘    │         │
│  └─────────────────────────────┘    └─────────────────────────────┘         │
│                                                                              │
│  ┌─────────────────────────────┐    ┌─────────────────────────────┐         │
│  │    AUXILIARY ARM 1          │    │    AUXILIARY ARM 2          │         │
│  │    (Workpiece holding)      │    │    (Tool/part handling)     │         │
│  │    4-DOF, 200kg capacity    │    │    4-DOF, 100kg capacity    │         │
│  └─────────────────────────────┘    └─────────────────────────────┘         │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 3.1.4 Welding System Details

The electron beam welding (EBW) system is the critical technology for structural joining in vacuum:

**E-Beam Welder Specifications:**
- Accelerating voltage: 60-150 kV (adjustable)
- Beam current: 0-500 mA
- Beam power: 0-25 kW
- Focal length: 150-500mm (electromagnetic focusing)
- Weld penetration: Up to 50mm in aluminum
- Weld speed: 10-100 mm/s depending on material/thickness
- Vacuum requirement: Ambient space vacuum sufficient (<10⁻⁴ Torr)

**Friction Stir Welding (FSW) System:**
For joints where EBW is unsuitable (dissimilar metals, certain geometries):
- Spindle speed: 200-2000 RPM
- Axial force: Up to 25 kN
- Traverse rate: 50-500 mm/min
- Tool materials: PCBN, tungsten carbide
- Weldable thickness: 3-25mm aluminum

**Assumption:** Primary structure is aluminum alloy (6061-T6 or similar) with some titanium fittings. This drives the welding parameter selection.

### 3.2 Spider-Class Precision Assembly Robot

#### 3.2.1 Overview

The Spider-class handles all tasks requiring dexterity over force: cable routing, connector mating, component installation, inspection, and repair. Its eight-legged design allows it to traverse complex 3D structures while maintaining multiple anchor points for stability.

#### 3.2.2 Specifications

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Mass (dry)** | 180 kg | Highly mass-optimized |
| **Mass (wet)** | 210 kg | With 30 kg propellant |
| **Body dimensions** | 0.8m × 0.8m × 0.4m | Central body |
| **Leg span** | 3.2m | Tip to tip, extended |
| **Leg reach** | 1.4m | From body center |
| **Manipulation accuracy** | ±0.1mm | End effector positioning |
| **Payload capacity** | 20 kg | Carried at body center |
| **Power (peak)** | 2.5 kW | All systems active |
| **Power (nominal)** | 400 W | Traversing/monitoring |
| **Solar array area** | 8 m² | Body-mounted + deployable |
| **Battery capacity** | 3 kWh | For shadowed operations |
| **Propulsion** | Cold gas + ion | Hybrid system |
| **Total ΔV** | 200 m/s | Sufficient for local ops |
| **Design life** | 10 years | Higher replacement rate |
| **Radiation tolerance** | 300 krad TID | Lighter shielding |

#### 3.2.3 Locomotion System

```
SPIDER-CLASS LEG CONFIGURATION (TOP VIEW)
═════════════════════════════════════════

                    FORWARD
                       ▲
                       │
            Leg 1 ●────┼────● Leg 2
                  ╲    │    ╱
                   ╲   │   ╱
            Leg 8 ●─╲──┼──╱─● Leg 3
                    ╲ │ ╱
                  ┌──────────┐
                  │          │
            Leg 7 ●│  BODY   │● Leg 4
                  │          │
                  └──────────┘
                    ╱ │ ╲
            Leg 6 ●─╱──┼──╲─● Leg 5
                   ╱   │   ╲
                  ╱    │    ╲
                       │
                       
    LEG DETAIL (SIDE VIEW)
    ══════════════════════
    
    Body attachment
         │
         ▼
    ┌─────────┐
    │ Joint 1 │ ← Rotation (±180°)
    └────┬────┘
         │
    ┌────┴────┐
    │ Joint 2 │ ← Elevation (±90°)
    └────┬────┘
         │
         │  Segment 1 (400mm)
         │
    ┌────┴────┐
    │ Joint 3 │ ← Elbow (±135°)
    └────┬────┘
         │
         │  Segment 2 (350mm)
         │
    ┌────┴────┐
    │ Joint 4 │ ← Wrist (±90°)
    └────┬────┘
         │
         │  Segment 3 (250mm)
         │
    ┌────┴────┐
    │ Joint 5 │ ← Ankle (±45°)
    └────┬────┘
         │
    ┌────┴────┐
    │END EFF. │ ← Gripper/tool
    └─────────┘
    
    Each leg: 5 DOF + end effector
    Total robot: 40+ DOF
    
    Locomotion modes:
    • Tripod gait (3 legs anchored, 5 moving)
    • Quadruped gait (4 anchored, 4 moving)  
    • Inchworm (sequential leg movement)
    • Free-flight (all legs retracted)
```

#### 3.2.4 End Effector Suite

Each Spider carries interchangeable end effectors on 4 of its 8 legs (the other 4 are dedicated to locomotion/anchoring):

1. **Precision Gripper** - Parallel jaw with force feedback, 0.1-50mm grip range
2. **Connector Mating Tool** - Standardized interface for electrical/fluid connectors
3. **Inspection Camera** - 4K stereo vision with macro capability
4. **Torque Driver** - 0.1-20 Nm range, multiple bit interfaces

### 3.3 Shepherd-Class Logistics Robot

#### 3.3.1 Overview

Shepherds are the logistics backbone—they transport materials, position components for assembly, and deploy completed collector units to their operational orbits. They prioritize ΔV capacity and cargo volume over manipulation capability.

#### 3.3.2 Specifications

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Mass (dry)** | 600 kg | Structural + systems |
| **Mass (wet, max)** | 2,100 kg | Full propellant + cargo |
| **Cargo capacity** | 800 kg | Or 15 m³ volume |
| **Dimensions** | 3.5m × 2.5m × 2.0m | With cargo bays |
| **Power (peak)** | 8 kW | During thrusting |
| **Power (nominal)** | 1.2 kW | Cruise/station-keeping |
| **Solar array area** | 25 m² | High-efficiency cells |
| **Propulsion** | Hall-effect | 2× 2kW thrusters |
| **Specific impulse** | 2,000 s | Optimized for cargo ops |
| **Propellant capacity** | 700 kg | Xenon |
| **Total ΔV (empty)** | 4,500 m/s | No cargo |
| **Total ΔV (full cargo)** | 1,800 m/s | 800 kg payload |
| **Design life** | 20 years | Highest reliability req. |

#### 3.3.3 Cargo System

```
SHEPHERD-CLASS CARGO CONFIGURATION
══════════════════════════════════

    TOP VIEW                           SIDE VIEW
    ════════                           ═════════
    
    ┌─────────────────────────┐        ┌─────────────────────────┐
    │                         │        │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ Solar Array
    │  ┌───────┐ ┌───────┐   │        │ ═══════════════════════ │
    │  │ CARGO │ │ CARGO │   │        │                         │
    │  │ BAY 1 │ │ BAY 2 │   │        │  ┌─────────────────┐    │
    │  │       │ │       │   │        │  │                 │    │
    │  │ 7.5m³ │ │ 7.5m³ │   │        │  │   CARGO BAYS    │    │
    │  │       │ │       │   │        │  │                 │    │
    │  └───────┘ └───────┘   │        │  │   (open frame   │    │
    │         ┌───┐          │        │  │    design)      │    │
    │    ┌────┤CPU├────┐     │        │  │                 │    │
    │    │    └───┘    │     │        │  └─────────────────┘    │
    │    │   AVIONICS  │     │        │           │             │
    │    │     BAY     │     │        │    ┌──────┴──────┐      │
    │    └─────────────┘     │        │    │  PROPULSION │      │
    │                         │        │    │    MODULE   │      │
    │  ◄══╡THRUSTER╞══►      │        │    └─────────────┘      │
    │                         │        │      ◄═══════►         │
    └─────────────────────────┘        └─────────────────────────┘
    
    CARGO INTERFACE STANDARD
    ════════════════════════
    
    All cargo uses standardized attachment:
    
    ┌─────────────────────────────────────┐
    │         CARGO PALLET                │
    │  ┌─────────────────────────────┐    │
    │  │                             │    │
    │  │      PAYLOAD VOLUME         │    │
    │  │      (variable size)        │    │
    │  │                             │    │
    │  └─────────────────────────────┘    │
    │  ●───────────────────────────────●  │ ← Grapple fixtures (4x)
    │  │ ○     ○     ○     ○     ○    │   │ ← Alignment pins
    │  │ ◆─────◆─────◆─────◆─────◆    │   │ ← Latch points
    │  └─────────────────────────────────┘│
    │                                      │
    │  Interface provides:                 │
    │  • Mechanical attachment (5 kN)      │
    │  • Power pass-through (28V, 100W)    │
    │  • Data connection (SpaceWire)       │
    │  • Thermal isolation                 │
    └─────────────────────────────────────┘
```

---

## 4. Autonomy, Control, and Communication

### 4.1 Communication Architecture

At 0.5 AU from the Sun, one-way light time to Earth varies from 2.5 to 12.5 minutes depending on orbital geometry. This fundamentally shapes the autonomy requirements.

```
COMMUNICATION NETWORK TOPOLOGY
══════════════════════════════

                                    ┌─────────────┐
                                    │    EARTH    │
                                    │   CONTROL   │
                                    └──────┬──────┘
                                           │
                                           │ X-band / Ka-band
                                           │ 2.5-12.5 min latency
                                           │
                              ┌────────────┴────────────┐
                              │                         │
                              ▼                         ▼
                    ┌─────────────────┐      ┌─────────────────┐
                    │  RELAY SAT #1   │      │  RELAY SAT #2   │
                    │  (Sun-Earth L4) │◀────▶│  (Sun-Earth L5) │
                    └────────┬────────┘      └────────┬────────┘
                             │                        │
                             │ Optical crosslink      │
                             │ 1 Gbps                 │
                             │                        │
              ┌──────────────┴────────────────────────┴──────────────┐
              │                                                       │
              │              CONSTRUCTION ZONE (0.5 AU)               │
              │                                                       │
              │    ┌─────────┐     ┌─────────┐     ┌─────────┐       │
              │    │COMMAND  │     │COMMAND  │     │COMMAND  │       │
              │    │SHEPHERD │◀═══▶│SHEPHERD │◀═══▶│SHEPHERD │       │
              │    │  #1     │     │  #2     │     │  #3     │       │
              │    └────┬────┘     └────┬────┘     └────┬────┘       │
              │         │              │              │               │
              │    ┌────┴────┐    ┌────┴────┐    ┌────┴────┐         │
              │    │         │    │         │    │         │         │
              │    ▼         ▼    ▼         ▼    ▼         ▼         │
              │  ┌───┐     ┌───┐┌───┐     ┌───┐┌───┐     ┌───┐       │
              │  │ W │     │ S ││ W │     │ S ││ W │     │ S │       │
              │  └───┘     └───┘└───┘     └───┘└───┘     └───┘       │
              │  Welder   Spider Welder   Spider Welder   Spider     │
              │                                                       │
              │         Mesh network: UHF + optical                   │
              │         Range: 100 km typical                         │
              │         Latency: <100 ms within zone                  │
              └───────────────────────────────────────────────────────┘

COMMUNICATION LINKS SUMMARY
═══════════════════════════
┌─────────────────┬──────────────┬───────────┬────────────┬──────────┐
│ Link            │ Frequency    │ Data Rate │ Range      │ Purpose  │
├─────────────────┼──────────────┼───────────┼────────────┼──────────┤
│ Earth uplink    │ X-band 8 GHz │ 10 Mbps   │ 0.5-1.5 AU │ Commands │
│ Earth downlink  │ Ka-band 32GHz│ 100 Mbps  │ 0.5-1.5 AU │ Telemetry│
│ Relay crosslink │ Optical 1550nm│ 1 Gbps   │ 0.5 AU     │ Backbone │
│ Robot mesh      │ UHF 400 MHz  │ 1 Mbps    │ 100 km     │ Coord.   │
│ Robot proximity │ Optical      │ 100 Mbps  │ 1 km       │ Precision│
└─────────────────┴──────────────┴───────────┴────────────┴──────────┘
```

### 4.2 Autonomy Levels

I propose a hierarchical autonomy architecture with five levels:

```
AUTONOMY HIERARCHY
══════════════════

Level 5: STRATEGIC (Earth Control)
├── Mission planning (weeks-months)
├── Resource allocation
├── Anomaly resolution requiring human judgment
│
Level 4: TACTICAL (Command Shepherds)
├── Daily task scheduling
├── Fleet coordination
├── Contingency selection
│
Level 3: OPERATIONAL (Individual Robots)
├── Task execution
├── Local path planning
├── Peer coordination
│
Level 2: REACTIVE (Subsystems)
├── Collision avoidance
├── Thermal protection
├── Fault response
│
Level 1: REFLEXIVE (Hardware)
├── Motor controllers
├── Sensor processing
├── Safety interlocks


DECISION AUTHORITY MATRIX
═════════════════════════
┌────────────────────────────┬───────┬───────┬───────┬───────┬───────┐
│ Decision Type              │ Lvl 5 │ Lvl 4 │ Lvl 3 │ Lvl 2 │ Lvl 1 │
├────────────────────────────┼───────┼───────┼───────┼───────┼───────┤
│ Mission objectives         │   ●   │       │       │       │       │
│ Fleet composition changes  │   ●   │       │       │       │       │
│ Assembly sequence          │   ●   │   ○   │       │       │       │
│ Daily work assignments     │       │   ●   │       │       │       │
│ Robot-robot coordination   │       │   ●   │   ○   │       │       │
│ Path planning              │       │       │   ●   │       │       │
│ Welding parameters         │       │       │   ●   │       │       │
│ Collision avoidance        │       │       │       │   ●   │       │
│ Emergency stop             │       │       │       │       │   ●   │
├────────────────────────────┼───────┼───────┼───────┼───────┼───────┤
│ ● = Primary authority                                              │
│ ○ = Can override in contingency                                    │
└────────────────────────────────────────────────────────────────────┘
```

### 4.3 Onboard Computing Architecture

Each robot class shares a common computing architecture with class-specific additions:

```
COMPUTING SYSTEM ARCHITECTURE
═════════════════════════════

┌─────────────────────────────────────────────────────────────────────┐
│                    RADIATION-HARDENED CORE                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │
│  │   MAIN CPU #1   │  │   MAIN CPU #2   │  │   MAIN CPU #3   │     │
│  │                 │  │                 │  │                 │     │
│  │ LEON4 @ 250MHz  │  │ LEON4 @ 250MHz  │  │ LEON4 @ 250MHz  │     │
│  │ 256 MB SDRAM    │  │ 256 MB SDRAM    │  │ 256 MB SDRAM    │     │
│  │ 1 Mrad TID      │  │ 1 Mrad TID      │  │ 1 Mrad TID      │     │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘     │
│           │                    │                    │               │
│           └────────────────────┼────────────────────┘               │
│                                │                                    │
│                    ┌───────────┴───────────┐                        │
│                    │   VOTING LOGIC        │                        │
│                    │   (TMR arbitration)   │                        │
│                    └───────────┬───────────┘                        │
└────────────────────────────────┼────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
         ┌──────────┴──────────┐   ┌──────────┴──────────┐
         │  VISION PROCESSOR   │   │   AI ACCELERATOR    │
         │                     │   │                     │
         │ • Stereo matching   │   │ • Neural network    │
         │ • Feature tracking  │   │ • Path planning     │
         │ • Pose estimation   │   │ • Anomaly detection │
         │                     │   │                     │
         │ FPGA-based          │   │ Rad-hard GPU        │
         │ 100 GFLOPS          │   │ 500 GFLOPS          │
         └─────────────────────┘   └─────────────────────┘

MEMORY AND STORAGE
══════════════════
• Flight software: 64 MB (triple redundant)
• Working memory: 768 MB (across 3 CPUs)
• Mass storage: 256 GB (rad-hard NAND)
• Telemetry buffer: 30 days of operations

SOFTWARE ARCHITECTURE
═════════════════════
┌─────────────────────────────────────────┐
│           APPLICATION LAYER             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ Mission │ │ Assembly│ │ Health  │   │
│  │ Exec    │ │ Control │ │ Monitor │   │
│  └─────────┘ └─────────┘ └─────────┘   │
├─────────────────────────────────────────┤
│           MIDDLEWARE LAYER              │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ Task    │ │ Comms   │ │ Data    │   │
│  │ Sched   │ │ Stack   │ │ Mgmt    │   │
│  └─────────┘ └─────────┘ └─────────┘   │
├─────────────────────────────────────────┤
│              OS LAYER                   │
│         RTEMS (Real-Time OS)            │
│         POSIX-compliant                 │
├─────────────────────────────────────────┤
│         HARDWARE ABSTRACTION            │
│              BSP Layer                  │
└─────────────────────────────────────────┘
```

### 4.4 Navigation and Positioning

Precise relative positioning is critical for assembly operations. I propose a multi-layer navigation system:

**Layer 1: Absolute Navigation**
- Sun sensors (coarse attitude)
- Star trackers (fine attitude, ±5 arcsec)
- Deep Space Network ranging (position, ±10m)

**Layer 2: Relative Navigation**
- Inter-robot RF ranging (±10cm at 10km)
- Optical beacons on structures (±1cm at 100m)
- Stereo vision (±1mm at 10m)

**Layer 3: Contact Navigation**
- Force/torque sensing at end effectors
- Tactile sensors for surface following
- Limit switches for hard stops

---

## 5. Thermal Management

### 5.1 Thermal Environment at 0.5 AU

This is the defining challenge. Let me be explicit about the numbers:

| Parameter | Value at 0.5 AU | Value at 1 AU (Earth) |
|-----------|-----------------|----------------------|
| Solar flux | 5,480 W/m² | 1,361 W/m² |
| Equilibrium temp (black body) | 394 K (121°C) | 279 K (6°C) |
| Equilibrium temp (α/ε = 0.2) | 279 K (6°C) | 197 K (-76°C) |
| Equilibrium temp (α/ε = 1.5) | 482 K (209°C) | 341 K (68°C) |

**Key insight:** Thermal control is entirely about managing the absorptivity/emissivity ratio (α/ε). With careful surface selection, we can maintain components at reasonable temperatures even at 0.5 AU.

### 5.2 Thermal Design Strategy

```
THERMAL ARCHITECTURE (WELDER-CLASS EXAMPLE)
═══════════════════════════════════════════

                         SOLAR DIRECTION
                               │
                               │ 5,480 W/m²
                               ▼
    ┌─────────────────────────────────────────────────────────────┐
    │                    SUNSHADE (deployed)                       │
    │              Aluminized Kapton, α/ε = 0.12                   │
    │                    Blocks direct solar                       │
    └─────────────────────────────────────────────────────────────┘
                               │
                               │ Shadowed region
                               │ (indirect heating only)
                               ▼
    ┌─────────────────────────────────────────────────────────────┐
    │                                                              │
    │   ┌─────────────────────────────────────────────────────┐   │
    │   │              ELECTRONICS BAY                         │   │
    │   │         Operating range: -20°C to +60°C              │   │
    │   │                                                      │   │
    │   │   ┌─────────┐    ┌─────────┐    ┌─────────┐        │   │
    │   │   │ CPU Box │    │ Power   │    │ Comms   │        │   │
    │   │   │  35°C   │    │  45°C   │    │  40°C   │        │   │
    │   │   └────┬────┘    └────┬────┘    └────┬────┘        │   │
    │   │        │              │              │              │   │
    │   │        └──────────────┼──────────────┘              │   │
    │   │                       │                              │   │
    │   │              ┌────────┴────────┐                     │   │
    │   │              │   HEAT PIPES    │                     │   │
    │   │              │  (ammonia LHP)  │                     │   │
    │   │              └────────┬────────┘                     │   │
    │   │                       │                              │   │
    │   └───────────────────────┼──────────────────────────────┘   │
    │                           │                                   │
    │                           ▼                                   │
    │   ┌─────────────────────────────────────────────────────┐    │
    │   │                  RADIATOR PANELS                     │    │
    │   │            OSR coating, ε = 0.80, α = 0.08           │    │
    │   │                                                      │    │
    │   │    ════════════════════════════════════════════     │    │
    │   │    ════════════════════════════════════════════     │    │
    │   │    ════════════════════════════════════════════     │    │
    │   │                                                      │    │
    │   │    Area: 4 m² per side (8 m² total)                 │    │
    │   │    Rejection capacity: 2,500 W @ 50°C               │    │
    │   │                                                      │    │
    │   └─────────────────────────────────────────────────────┘    │
    │                                                              │
    │   THERMAL LOUVERS (variable conductance)                     │
    │   ┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐                  │
    │   │▓▓││▓▓││▓▓││▓▓││▓▓││▓▓││▓▓││▓▓││▓▓││▓▓│                  │
    │   └──┘└──┘└──┘└──┘└──┘└──┘└──┘└──┘└──┘└──┘                  │
    │   Bimetallic actuation, no power required                    │
    │   Effective ε: 0.1 (closed) to 0.7 (open)                   │
    │                                                              │
    └─────────────────────────────────────────────────────────────┘

THERMAL BUDGET (WELDER-CLASS, WORST CASE HOT)
═════════════════════════════════════════════
Solar input (through MLI leaks):     +150 W
Internal dissipation (electronics):  +800 W
Internal dissipation (motors):       +400 W
Welding waste heat:                  +2,000 W
────────────────────────────────────────────
Total heat load:                     3,350 W

Radiator capacity @ 60°C:            4,000 W
Margin:                              16%
```

### 5.3 Operational Thermal Strategies

Beyond passive design, operational strategies manage thermal loads:

1. **Duty Cycling:** Welding operations limited to 30 minutes continuous, followed by 15-minute cool-down
2. **Solar Shadowing:** Robots work in shadow of collector units under construction when possible
3. **Orbital Phasing:** Most intensive operations scheduled for aphelion portions of orbit
4. **Cooperative Shading:** Shepherds can position reflective shields to protect working robots

---

## 6. Manufacturing Considerations

### 6.1 Production Strategy

I recommend a phased manufacturing approach:

**Phase 1A (Years 1-3): Prototype and Qualification**
- 3 units each class (9 total)
- Full environmental qualification
- Operational testing at Earth-Sun L1

**Phase 1B (Years 3-5): Initial Production**
- 20 Welders, 80 Spiders, 40 Shepherds
- Establish production line
- Deploy to 0.5 AU construction zone

**Phase 1C (Years 5-8): Full Production**
- Remaining 30 Welders, 120 Spiders, 60 Shepherds
- Production rate: ~50 units/year
- Continuous improvement based on operational feedback

### 6.2 Manufacturing Breakdown

```
MANUFACTURING WORK BREAKDOWN (WELDER-CLASS)
═══════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────┐
│                        WELDER-CLASS ROBOT                           │
│                      Total: $45M per unit                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  STRUCTURE (12%)                    PROPULSION (15%)                │
│  $5.4M                              $6.75M                          │
│  ├─ Primary frame      $2.0M        ├─ Hall thrusters    $3.0M     │
│  ├─ Arm structures     $2.5M        ├─ PPU               $1.5M     │
│  ├─ Mechanisms         $0.6M        ├─ Xe tanks          $1.0M     │
│  └─ Fasteners/misc     $0.3M        ├─ Feed system       $0.75M    │
│                                     └─ RCS               $0.5M     │
│                                                                     │
│  AVIONICS (22%)                     POWER (18%)                     │
│  $9.9M                              $8.1M                           │
│  ├─ Main computers     $3.0M        ├─ Solar arrays      $4.0M     │
│  ├─ Vision system      $2.5M        ├─ Batteries         $1.5M     │
│  ├─ Navigation         $2.0M        ├─ PCDU              $1.5M     │
│  ├─ Communications     $1.5M        └─ Harness           $1.1M     │
│  └─ Software           $0.9M                                        │
│                                                                     │
│  MANIPULATION (25%)                 THERMAL (8%)                    │
│  $11.25M                            $3.6M                           │
│  ├─ Primary arms (2)   $6.0M        ├─ Radiators         $1.5M     │
│  ├─ Aux arms (2)       $2.0M        ├─ Heat pipes        $0.8M     │
│  ├─ End effectors      $2.0M        ├─ MLI               $0.6M     │
│  ├─ E-beam welder      $0.75M       ├─ Louvers           $0.4M     │
│  └─ FSW system         $0.5M        └─ Coatings          $0.3M     │
│                                                                     │
│  INTEGRATION & TEST (included in above)                             │
│  Assembly:             $2.5M                                        │
│  Testing:              $3.0M                                        │
│  Documentation:        $0.5M                                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.3 Supply Chain Considerations

**Critical Long-Lead Items:**
| Component | Lead Time | Supplier Base | Risk |
|-----------|-----------|---------------|------|
| Rad-hard processors | 18-24 months | Limited (2-3 vendors) | High |
| Hall thrusters | 12-18 months | Moderate (5-6 vendors) | Medium |
| Harmonic drives | 12 months | Limited (2 vendors) | High |
| Solar cells (GaAs) | 9-12 months | Moderate | Medium |
| E-beam welder guns | 18 months | Very limited (1-2) | Critical |

**Recommendation:** Establish strategic inventory of critical components (2-year buffer stock) before full production begins.

---

## 7. Development Roadmap

### 7.1 Technology Readiness Assessment

| Subsystem | Current TRL | Required TRL | Gap Assessment |
|-----------|-------------|--------------|----------------|
| Hall thrusters | 9 | 9 | Flight proven, no gap |
| Rad-hard computing | 8 | 9 | Minor qualification needed |
| Robotic arms (space) | 7 | 9 | ISS heritage, needs scaling |
| E-beam welding (space) | 4 | 8 | **Major development needed** |
| FSW (space) | 3 | 7 | **Significant development** |
| Autonomous assembly | 5 | 8 | Software development |
| Thermal management | 7 | 9 | Design adaptation |
| Multi-robot coordination | 6 | 8 | Algorithm development |

### 7.2 Development Schedule

```
PROJECT DYSON - ASSEMBLY ROBOT DEVELOPMENT TIMELINE
═══════════════════════════════════════════════════

YEAR        1       2       3       4       5       6       7       8
            │       │       │       │       │       │       │       │
PHASE 1A: DEVELOPMENT & QUALIFICATION
────────────────────────────────────
Technology  ████████████████
Development │               │
            │               │
Prototype   │       ████████████████
Fabrication │               │       │
            │               │       │
Ground      │               ████████████████
Testing     │                       │       │
            │                       │       │
Space       │                       │       ████████
Qualification                       │               │
(L1 testing)│                       │               │
            │                       │               │
PHASE 1B: INITIAL PRODUCTION
────────────────────────────
Production  │                       │       ████████████████████████
Line Setup  │                       │               │               │
            │                       │               │               │
Initial     │                       │               ████████████████
Production  │                       │                       │       │
(140 units) │                       │                       │       │
            │                       │                       │       │
Deployment  │                       │                       ████████████████
to 0.5 AU   │                       │                               │
            │                       │                               │
PHASE 1C: FULL PRODUCTION
─────────────────────────
Full Rate   │                       │                       ████████████████
Production  │                       │                               │
(210 units) │                       │                               │
            │                       │                               │
MILESTONES  ▼                       ▼                       ▼       ▼
            │                       │                       │       │
            PDR                     CDR                   FRR     IOC
         (Preliminary           (Critical             (Flight  (Initial
          Design                 Design               Readiness Operating
          Review)                Review)              Review)  Capability)

KEY TECHNOLOGY DEMONSTRATIONS
─────────────────────────────
E-beam welding    ████████████████████████
in vacuum                 │
                          │
Autonomous        ████████████████████████████████
assembly demo                     │
                                  │
Multi-robot               ████████████████████████████████
coordination                              │
                                          │
Thermal                   ████████████████
validation                        │
(solar sim)                       │
```

### 7.3 Key Development Milestones

| Milestone | Date | Success Criteria |
|-----------|------|------------------|
| PDR | Year 2 | All subsystems at TRL 5+, preliminary designs complete |
| E-beam welding demo | Year 2.5 | 10m weld in vacuum chamber, <2mm deviation |
| CDR | Year 3.5 | All subsystems at TRL 6+, detailed designs frozen |
| Prototype delivery | Year 4 | 3 units each class, ready for testing |
| L1 deployment | Year 5 | Prototypes operational at Sun-Earth L1 |
| Autonomous assembly demo | Year 5.5 | Complete collector unit assembly without ground intervention |
| FRR | Year 6 | All systems at TRL 8+, production units qualified |
| IOC | Year 7 | First 50 robots operational at 0.5 AU |
| FOC | Year 8 | Full fleet of 350 robots operational |

---

## 8. Cost Analysis

### 8.1 Development Costs

```
DEVELOPMENT COST BREAKDOWN (PHASE 1A)
═════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────┐
│                    TOTAL DEVELOPMENT: $2.8B                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  TECHNOLOGY DEVELOPMENT                              $650M (23%)    │
│  ├─ E-beam welding system                           $180M          │
│  ├─ FSW system adaptation                           $120M          │
│  ├─ Autonomous software                             $150M          │
│  ├─ Thermal management                              $80M           │
│  ├─ Multi-robot coordination                        $70M           │
│  └─ Component qualification                         $50M           │
│                                                                     │
│  PROTOTYPE FABRICATION                               $540M (19%)    │
│  ├─ Welder prototypes (3)                           $180M          │
│  ├─ Spider prototypes (3)                           $90M           │
│  ├─ Shepherd prototypes (3)                         $120M          │
│  ├─ Ground support equipment                        $100M          │
│  └─ Spare components                                $50M           │
│                                                                     │
│  TESTING & QUALIFICATION                             $480M (17%)    │
│  ├─ Thermal vacuum testing                          $120M          │
│  ├─ Radiation testing                               $60M           │
│  ├─ Manipulation testing                            $80M           │
│  ├─ Integration testing                             $100M          │
│  └─ L1 flight demonstration                         $120M          │
│                                                                     │
│  SYSTEMS ENGINEERING                                 $380M (14%)    │
│  ├─ Design engineering                              $200M          │
│  ├─ Safety & mission assurance                      $80M           │
│  ├─ Configuration management                        $50M           │
│  └─ Technical documentation                         $50M           │
│                                                                     │
│  PROGRAM MANAGEMENT                                  $280M (10%)    │
│  ├─ Project management                              $150M          │
│  ├─ Contracts & procurement                         $80M           │
│  └─ Facilities                                      $50M           │
│                                                                     │
│  LAUNCH SERVICES (L1 demo)                           $200M (7%)     │
│  ├─ Launch vehicle                                  $150M          │
│  └─ Mission operations                              $50M           │
│                                                                     │
│  RESERVES (10%)                                      $270M (10%)    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 8.2 Production Costs

```
PRODUCTION COST SUMMARY (350 UNITS)
═══════════════════════════════════

Unit Costs (at full production rate):
┌─────────────────┬──────────┬───────────┬──────────────┐
│ Robot Class     │ Quantity │ Unit Cost │ Total        │
├─────────────────┼──────────┼───────────┼──────────────┤
│ Welder-class    │ 50       │ $45M      │ $2,250M      │
│ Spider-class    │ 200      │ $12M      │ $2,400M      │
│ Shepherd-class  │ 100      │ $22M      │ $2,200M      │
├─────────────────┼──────────┼───────────┼──────────────┤
│ SUBTOTAL        │ 350      │ —         │ $6,850M      │
├─────────────────┼──────────┼───────────┼──────────────┤
│ Spares (20%)    │ —        │ —         │ $1,370M      │
│ Integration     │ —        │ —         │ $500M        │
│ Quality Assur.  │ —        │ —         │ $300M        │
├─────────────────┼──────────┼───────────┼──────────────┤
│ PRODUCTION TOTAL│ —        │ —         │ $9,020M      │
└─────────────────┴──────────┴───────────┴──────────────┘

Launch Costs (to 0.5 AU):
┌─────────────────────────────────────────────────────────┐
│ Total robot mass:              259,200 kg               │
│ Launch vehicle:                Starship (150,000 kg LEO)│
│ Effective payload to 0.5 AU:   ~25,000 kg (with SEP tug)│
│ Number of launches:            11                       │
│ Cost per launch:               $100M (projected)        │
│ SEP tug development:           $500M                    │
│ SEP tug production (4 units):  $400M                    │
├─────────────────────────────────────────────────────────┤
│ LAUNCH TOTAL:                  $2,000M                  │
└─────────────────────────────────────────────────────────┘

Operations Costs (10-year Phase 1):
┌─────────────────────────────────────────────────────────┐
│ Mission operations center:     $50M/year × 10 = $500M  │
│ Deep Space Network:            $30M/year × 10 = $300M  │
│ Software maintenance:          $20M/year × 10 = $200M  │
│ Anomaly resolution:            $10M/year × 10 = $100M  │
├─────────────────────────────────────────────────────────┤
│ OPERATIONS TOTAL:              $1,100M                  │
└─────────────────────────────────────────────────────────┘
```

### 8.3 Total Program Cost

```
PHASE 1 ASSEMBLY ROBOT PROGRAM - TOTAL COST
═══════════════════════════════════════════

┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Development (Phase 1A)              $2,800M           │
│  Production (350 units + spares)     $9,020M           │
│  Launch Services                     $2,000M           │
│  Operations (10 years)               $1,100M           │
│  ─────────────────────────────────────────────         │
│  SUBTOTAL                            $14,920M          │
│                                                         │
│  Program Reserve (15%)               $2,238M           │
│  ─────────────────────────────────────────────         │
│  TOTAL PHASE 1 COST                  $17,158M          │
│                                                         │
│  ═════════════════════════════════════════════         │
│  APPROXIMATELY $17.2 BILLION                           │
│  ═════════════════════════════════════════════         │
│                                                         │
└─────────────────────────────────────────────────────────┘

Cost per collector unit assembled (target 100,000 units):
$17.2B ÷ 100,000 = $172,000 per unit (robot contribution only)
```

**Cost Assumptions:**
- Learning curve: 85% (each doubling of production reduces unit cost by 15%)
- Inflation: Not included (constant-year dollars)
- Launch costs: Based on projected Starship pricing ($100M/launch)
- Operations: Assumes high automation, minimal ground crew

---

## 9. Risk Assessment

### 9.1 Technical Risks

```
RISK MATRIX
═══════════

                        LIKELIHOOD
                 Low      Medium     High
              ┌─────────┬─────────┬─────────┐
         High │         │   R3    │   R1    │
              │         │         │         │
    IMPACT    ├─────────┼─────────┼─────────┤
       Medium │   R5    │   R2    │   R4    │
              │         │         │         │
              ├─────────┼─────────┼─────────┤
          Low │         │   R6    │         │
              │         │         │         │
              └─────────┴─────────┴─────────┘

RISK REGISTER
═════════════
┌────┬────────────────────────┬────────┬────────┬─────────────────────────────┐
│ ID │ Risk Description       │ Impact │ Likely │ Mitigation                  │
├────┼────────────────────────┼────────┼────────┼─────────────────────────────┤
│ R1 │ E-beam welding fails   │ High   │ High   │ Parallel FSW development;   │
│    │ to achieve required    │        │        │ mechanical fastener backup; │
│    │ quality in space       │        │        │ early ground demo program   │
├────┼────────────────────────┼────────┼────────┼─────────────────────────────┤
│ R2 │ Thermal management     │ Medium │ Medium │ Conservative design margins;│
│    │ insufficient at 0.5 AU │        │        │ operational duty cycling;   │
│    │                        │        │        │ solar simulation testing    │
├────┼────────────────────────┼────────┼────────┼─────────────────────────────┤
│ R3 │ Autonomous software    │ High   │ Medium │ Extensive simulation;       │
│    │ cannot handle edge     │        │        │ human-in-loop fallback;     │
│    │ cases                  │        │        │ incremental autonomy        │
├────┼────────────────────────┼────────┼────────┼─────────────────────────────┤
│ R4 │ Radiation degrades     │ Medium │ High   │ Rad-hard components;        │
│    │ electronics faster     │        │        │ shielding; replaceable      │
│    │ than predicted         │        │        │ modules; design for         │
│    │                        │        │        │ graceful degradation        │
├────┼────────────────────────┼────────┼────────┼─────────────────────────────┤
│ R5 │ Multi-robot coord.     │ Medium │ Low    │ Hierarchical control;       │
│    │ leads to deadlocks     │        │        │ timeout mechanisms;         │
│    │ or collisions          │        │        │ simulation validation       │
├────┼────────────────────────┼────────┼────────┼─────────────────────────────