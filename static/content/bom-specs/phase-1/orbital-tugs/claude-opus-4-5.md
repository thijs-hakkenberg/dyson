---
bomId: "bom-1-6"
itemName: "Orbital Tugs"
itemSlug: "orbital-tugs"
modelId: "claude-opus-4-5"
modelName: "Claude Opus 4.5"
generated: "2026-02-01"
phase: "phase-1"
---

# Technical Proposal: Orbital Tugs for Project Dyson
## Phase 1 - Initial Swarm Deployment

**Document Version:** 1.0
**Author:** Space Systems Engineering Division
**Classification:** Project Dyson Internal

---

## Executive Summary

I propose a fleet of autonomous electric propulsion tugs optimized for the unique demands of Dyson swarm construction: moving thousands of solar collector panels from manufacturing facilities to precise orbital positions around the Sun. This proposal advocates for a **modular, solar-electric propulsion architecture** using Hall-effect thrusters, designed for 15+ year operational lifetimes with in-situ refueling capability.

The key insight driving this design is that Dyson swarm construction is fundamentally a **logistics problem**, not a propulsion problem. We need tugs that are cheap, reliable, and manufacturable at scale—not tugs that are fast. I'm recommending we optimize for $/kg-delivered rather than specific impulse or thrust-to-weight ratio.

---

## 1. Design Philosophy and Recommended Approach

### 1.1 Core Design Principles

**Principle 1: Optimize for Fleet Economics, Not Individual Performance**

A single high-performance tug that costs $500M is worse than fifty $10M tugs, even if the expensive tug has better specifications. We need to think in terms of fleet throughput and mean time between failures across thousands of vehicles.

**Principle 2: Solar-Electric is the Only Viable Option**

For operations within ~3 AU of the Sun, solar power density makes chemical or nuclear propulsion economically absurd for cargo transport. At 1 AU, we receive 1,361 W/m². A 2,000 m² solar array generates 400+ kW of usable power—enough to run high-efficiency Hall thrusters continuously.

**Principle 3: Design for Autonomous Operations from Day One**

With potentially thousands of tugs operating simultaneously, human-in-the-loop control is impossible. These vehicles must handle navigation, collision avoidance, docking, and fault recovery autonomously. Ground control should only handle fleet-level logistics and exception handling.

**Principle 4: Standardize Aggressively**

Every tug should be identical. Every interface should be standardized. This enables mass production, simplifies logistics, and allows any tug to perform any mission.

### 1.2 Mission Profile Analysis

The Phase 1 mission involves:
- **Origin:** Manufacturing facility (assumed Earth-Sun L1 or dedicated solar orbit)
- **Destination:** Target orbital positions for swarm elements (0.9-1.1 AU band initially)
- **Payload:** Solar collector panels, ~500-2,000 kg each
- **Delta-V Budget:** 2-15 km/s depending on transfer type and timing

```
MISSION PROFILE OVERVIEW
========================

Manufacturing Hub                    Target Swarm Position
(Earth-Sun L1)                       (Solar Orbit, 1.0 AU)
     |                                        |
     |    ΔV₁: Departure burn                 |
     |    (~1-3 km/s)                         |
     v                                        |
  ┌─────────────────────────────────────────┐ |
  │         Transfer Trajectory              │ |
  │         (Weeks to months)                │ |
  │         Low-thrust spiral or            │ |
  │         optimized trajectory            │ |
  └─────────────────────────────────────────┘ |
                                              v
                                    ΔV₂: Insertion & positioning
                                    (~1-3 km/s)
                                              |
                                              v
                                    Payload deployment
                                              |
                                              v
                                    Return trajectory
                                    (ΔV₃: ~2-6 km/s)
```

---

## 2. Technical Specifications

### 2.1 Primary Specifications Table

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| **Dry Mass** | 1,200 kg | Minimized for payload fraction |
| **Propellant Capacity** | 800 kg (xenon) | 6-month mission endurance |
| **Maximum Payload** | 5,000 kg | Batch delivery of 3-10 panels |
| **Total Wet Mass** | 7,000 kg (fully loaded) | Launch compatibility |
| **Solar Array Area** | 2,400 m² | 480 kW BOL at 1 AU |
| **Array Power (BOL)** | 480 kW | 20% efficient cells |
| **Array Power (EOL)** | 384 kW | 80% retention at 15 years |
| **Thruster Power** | 400 kW (max) | 4 × 100 kW Hall thrusters |
| **Total Thrust** | 8.8 N | 2.2 N per thruster |
| **Specific Impulse** | 3,000 s | Hall thruster nominal |
| **Delta-V Capacity** | 18 km/s (unloaded) | Enables flexible routing |
| **Delta-V Capacity** | 8 km/s (5,000 kg payload) | Sufficient for most transfers |
| **Design Lifetime** | 15 years | With refueling |
| **Operational Autonomy** | 30 days | Without ground contact |

### 2.2 Dimensional Specifications

```
ORBITAL TUG - DEPLOYED CONFIGURATION
====================================
                    
                    Solar Array Wing (Port)
                    60m × 20m = 1,200 m²
                    ┌────────────────────────────────────────────┐
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
                    └────────────────────────────────────────────┘
                                        │
                                        │ Array boom (5m)
                                        │
    ┌───────────────────────────────────┼───────────────────────────────────┐
    │                                   │                                   │
    │   ┌─────────┐    MAIN BUS    ┌────┴────┐                             │
    │   │Thruster │    (8m × 4m)   │ Avionics│                             │
    │   │ Pod #1  │◄──────────────►│   Bay   │                             │
    │   └─────────┘                └─────────┘                             │
    │        │                          │                                   │
    │        │    ┌──────────────┐      │                                   │
    │        └───►│  Propellant  │◄─────┘                                   │
    │             │    Tanks     │                                          │
    │             │  (4 × 200kg) │                                          │
    │             └──────────────┘                                          │
    │                    │                                                  │
    │   ┌─────────┐      │         ┌─────────┐                             │
    │   │Thruster │◄─────┴────────►│Thruster │                             │
    │   │ Pod #2  │                │ Pod #3  │                             │
    │   └─────────┘                └─────────┘                             │
    │                                   │                                   │
    │                              ┌────┴────┐                             │
    │                              │Thruster │                             │
    │                              │ Pod #4  │                             │
    │                              └─────────┘                             │
    │                                                                       │
    │                    ═══════════════════                                │
    │                    PAYLOAD INTERFACE                                  │
    │                    (Standard docking)                                 │
    │                    ═══════════════════                                │
    │                                                                       │
    └───────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ Array boom (5m)
                                        │
                    ┌────────────────────────────────────────────┐
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
                    └────────────────────────────────────────────┘
                    Solar Array Wing (Starboard)
                    60m × 20m = 1,200 m²

OVERALL DIMENSIONS (Deployed):
- Length (with arrays): 130 m
- Width (bus): 8 m  
- Height (bus): 4 m
- Total span: 130 m

STOWED CONFIGURATION (for launch):
- Length: 8 m
- Width: 4 m
- Height: 4 m
- Fits within 5m fairing with margin
```

---

## 3. System Architecture

### 3.1 Subsystem Block Diagram

```
ORBITAL TUG SYSTEM ARCHITECTURE
===============================

┌─────────────────────────────────────────────────────────────────────────────┐
│                           POWER SUBSYSTEM                                   │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                  │
│  │ Solar Array  │───►│    PMAD      │───►│   Battery    │                  │
│  │  2,400 m²    │    │  (100V bus)  │    │   (50 kWh)   │                  │
│  │  480 kW BOL  │    │              │    │   Li-ion     │                  │
│  └──────────────┘    └──────┬───────┘    └──────────────┘                  │
│                             │                                               │
└─────────────────────────────┼───────────────────────────────────────────────┘
                              │ Power distribution
                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PROPULSION SUBSYSTEM                                │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                  │
│  │   Xenon      │───►│  Flow        │───►│ Hall Effect  │                  │
│  │   Tanks      │    │  Control     │    │  Thrusters   │                  │
│  │   800 kg     │    │  System      │    │  4 × 100 kW  │                  │
│  └──────────────┘    └──────────────┘    └──────────────┘                  │
│                                                                             │
│  ┌──────────────┐    ┌──────────────┐                                      │
│  │   PPU #1-4   │◄───│  Thruster    │                                      │
│  │  (100kW ea)  │    │  Gimbal      │                                      │
│  └──────────────┘    │  Mechanism   │                                      │
│                      └──────────────┘                                      │
└─────────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           GNC SUBSYSTEM                                     │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                  │
│  │  Star        │───►│  Navigation  │───►│  Guidance    │                  │
│  │  Trackers    │    │  Computer    │    │  Algorithms  │                  │
│  │  (2 units)   │    │              │    │              │                  │
│  └──────────────┘    └──────────────┘    └──────────────┘                  │
│                                                 │                           │
│  ┌──────────────┐    ┌──────────────┐          │                           │
│  │  Sun         │───►│  Attitude    │◄─────────┘                           │
│  │  Sensors     │    │  Control     │                                      │
│  │  (4 units)   │    │              │                                      │
│  └──────────────┘    └──────────────┘                                      │
│                             │                                               │
│  ┌──────────────┐          │          ┌──────────────┐                     │
│  │  IMU         │──────────┴─────────►│  Reaction    │                     │
│  │  (2 units)   │                     │  Wheels      │                     │
│  └──────────────┘                     │  (4 units)   │                     │
│                                       └──────────────┘                     │
└─────────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AVIONICS SUBSYSTEM                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                  │
│  │  Flight      │◄──►│  Autonomy    │◄──►│  Health      │                  │
│  │  Computer    │    │  Manager     │    │  Monitor     │                  │
│  │  (Triple     │    │              │    │              │                  │
│  │   redundant) │    └──────────────┘    └──────────────┘                  │
│  └──────────────┘                                                          │
│         │                                                                   │
│         ▼                                                                   │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                  │
│  │  Comm        │◄──►│  Data        │◄──►│  Payload     │                  │
│  │  System      │    │  Storage     │    │  Interface   │                  │
│  │  (X/Ka band) │    │  (1 TB SSD)  │    │  Controller  │                  │
│  └──────────────┘    └──────────────┘    └──────────────┘                  │
└─────────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      PAYLOAD INTERFACE SUBSYSTEM                            │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                  │
│  │  Docking     │◄──►│  Capture     │◄──►│  Payload     │                  │
│  │  Mechanism   │    │  Arms        │    │  Clamps      │                  │
│  │  (IDSS std)  │    │  (2 units)   │    │  (8 units)   │                  │
│  └──────────────┘    └──────────────┘    └──────────────┘                  │