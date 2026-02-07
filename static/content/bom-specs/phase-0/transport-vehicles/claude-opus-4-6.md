---
bomId: "bom-0-4"
itemName: "Transport Vehicles"
itemSlug: "transport-vehicles"
modelId: "claude-opus-4-6"
modelName: "Claude Opus 4.6"
generated: "2026-02-07"
phase: "phase-0"
---



# Technical Proposal: Transport Vehicles for Phase 0 — Space Resource Processing

## Project Dyson — Phase 0 Transport Architecture

**Document:** PD-P0-TV-001 Rev A
**Author:** Space Systems Engineering Division
**Date:** 2025
**Classification:** Open Technical Proposal

---

## 1. Executive Summary

Phase 0 of Project Dyson requires a fleet of autonomous transport vehicles to move processed materials between resource extraction sites (primarily near-Earth asteroids and eventually main-belt objects), orbital processing facilities, and construction staging areas. This is the logistical backbone of the entire Dyson swarm program. If we get transport wrong, nothing else matters — every kilogram of reflector material, every structural truss, every piece of electronics must flow through this pipeline.

**My core recommendation:** A family of three vehicle classes sharing a common bus architecture, all solar-electric propelled, designed for autonomous operation, and optimized for **cost-per-kilogram-delivered** rather than speed. We are building infrastructure, not racing. The vehicles should be simple, mass-producible, and expendable-tolerant (designed so that losing any single vehicle is an economic inconvenience, not a program catastrophe).

The three classes are:

| Class | Name | Payload | Role |
|-------|------|---------|------|
| TV-1 | **Mule** | 50–100 tonnes | Bulk raw/processed material transfer |
| TV-2 | **Courier** | 1–5 tonnes | High-priority components, electronics, consumables |
| TV-3 | **Shepherd** | 500–2,000 tonnes | Asteroid redirect / bulk ore delivery |

---

## 2. Design Philosophy

### 2.1 Guiding Principles

1. **Mass production over bespoke optimization.** We will need hundreds to thousands of transport vehicles. Every design decision must ask: "Can we build 500 of these?"

2. **Solar-electric propulsion (SEP) as the universal baseline.** In the inner solar system (< 3 AU), solar power is abundant. Chemical propulsion is reserved only for emergency maneuvers. Ion/Hall thrusters provide the specific impulse (1,500–4,000 s) needed to make the mass ratios work for bulk transport.

3. **Autonomy-first.** Light-time delays to asteroid targets range from seconds to 40+ minutes. Ground-in-the-loop control is operationally impossible at fleet scale. Every vehicle must be capable of fully autonomous navigation, rendezvous, docking, and fault recovery.

4. **Graceful degradation.** Redundant thrusters, distributed power, and modular cargo attachment. A vehicle with 30% of its thrusters failed should still complete its mission (slower, but successfully).

5. **In-situ manufacturability.** Phase 0 vehicles will initially be launched from Earth, but the design must converge toward vehicles that can be manufactured from asteroid-derived materials (iron, nickel, aluminum, silicon) at orbital facilities.

---

## 3. System Architecture

### 3.1 Common Bus Architecture

All three vehicle classes share a **Common Propulsion and Avionics Bus (CPAB)** to maximize manufacturing commonality.

```
╔══════════════════════════════════════════════════════════════╗
║                    COMMON BUS (CPAB)                         ║
║                                                              ║
║  ┌─────────────┐  ┌─────────────┐  ┌──────────────────┐    ║
║  │  AVIONICS   │  │   POWER     │  │   PROPULSION     │    ║
║  │  MODULE     │  │   MODULE    │  │   MODULE         │    ║
║  │             │  │             │  │                  │    ║
║  │ • Flight    │  │ • Solar     │  │ • Thruster pods  │    ║
║  │   computer  │  │   array     │  │   (modular)      │    ║
║  │ • Star      │  │   interface │  │ • PPU banks      │    ║
║  │   trackers  │  │ • Battery   │  │ • Propellant     │    ║
║  │ • IMU       │  │   bank      │  │   management     │    ║
║  │ • Comms     │  │ • PMAD      │  │ • Gimbal         │    ║
║  │ • Proximity │  │             │  │   actuators      │    ║
║  │   sensors   │  │             │  │                  │    ║
║  └─────────────┘  └─────────────┘  └──────────────────┘    ║
║                                                              ║
║  ┌──────────────────────────────────────────────────────┐   ║
║  │              STRUCTURAL BACKBONE                      │   ║
║  │   (Aluminum/steel truss — load-bearing primary       │   ║
║  │    structure with standard mechanical interfaces)     │   ║
║  └──────────────────────────────────────────────────────┘   ║
╚══════════════════════════════════════════════════════════════╝
                          │
                          │  Standard Payload Interface
                          ▼
              ┌──────────────────────┐
              │   CLASS-SPECIFIC     │
              │   PAYLOAD MODULE     │
              │                      │
              │  TV-1: Cargo frame   │
              │  TV-2: Pressurized   │
              │        container     │
              │  TV-3: Grapple/net   │
              │        system        │
              └──────────────────────┘
```

### 3.2 TV-1 "Mule" — Bulk Transport Vehicle

This is the workhorse. The vehicle we build the most of.

```
                    Solar Array Wing (each)
                    ┌─────────────────────────────┐
                    │  25m x 8m deployable array   │
                    │  ~100 kW per wing @ 1 AU     │
                    └──────────┬──────────────────┘
                               │
    Solar Array ◄──────────────┼──────────────► Solar Array
    (Port)                     │                  (Starboard)
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 │      CPAB CORE            │
                 │   (3m x 3m x 2m)         │
                 │                           │
                 │  ┌───┐ ┌───┐ ┌───┐      │
                 │  │PPU│ │PPU│ │PPU│      │
                 │  └─┬─┘ └─┬─┘ └─┬─┘      │
                 │    │     │     │         │
                 └────┼─────┼─────┼─────────┘
                      │     │     │
                 ┌────▼─────▼─────▼────┐
                 │  Thruster Array      │
                 │  (6x Hall-effect     │
                 │   thrusters on       │
                 │   2-axis gimbals)    │
                 └─────────────────────┘
                      │
                      │  (Thrust direction)
                      │
    ═══════════════════╪═══════════════════
    ║                  │                  ║
    ║   CARGO FRAME    │                  ║
    ║   (20m truss)    │                  ║
    ║                  │                  ║
    ║  ┌──┐ ┌──┐ ┌──┐ │ ┌──┐ ┌──┐ ┌──┐ ║
    ║  │C1│ │C2│ │C3│ │ │C4│ │C5│ │C6│ ║
    ║  └──┘ └──┘ └──┘   └──┘ └──┘ └──┘ ║
    ║   (Cargo containers / bulk bags)   ║
    ═════════════════════════════════════
    
    Propellant Tanks (xenon/krypton)
    mounted along backbone truss
    ┌────┐  ┌────┐  ┌────┐  ┌────┐
    │Tank│  │Tank│  │Tank│  │Tank│
    │ 1  │  │ 2  │  │ 3  │  │ 4  │
    └────┘  └────┘  └────┘  └────┘
```

#### TV-1 Technical Specifications

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Dry mass** | 4,500 kg | Including cargo frame, no propellant |
| **Payload capacity** | 50,000–100,000 kg | Depends on ΔV budget for route |
| **Propellant mass** | 8,000–15,000 kg | Krypton baseline (cheaper than Xe) |
| **Total wet mass (loaded)** | 62,500–119,500 kg | |
| **Solar array area** | 400 m² (2 × 200 m²) | Lightweight roll-out arrays |
| **Power at 1 AU** | 200 kW BOL | ~500 W/m² effective |
| **Power at 2.5 AU** | 32 kW | Inverse-square; reduced thrust |
| **Thruster type** | Hall-effect (nested channel) | 6 units, 4 active + 2 spare |
| **Thrust per thruster** | 2.5 N @ 30 kW | Based on X3 nested Hall thruster scaling |
| **Total thrust** | 10 N (4 active) | |
| **Specific impulse** | 2,000–3,000 s | Variable, optimized per mission |
| **Acceleration (loaded, 100t payload)** | ~0.08 mm/s² | Very low — this is fine |
| **ΔV capability** | 5–15 km/s | Depends on payload/propellant ratio |
| **Cargo frame length** | 20 m | Aluminum truss |
| **Overall dimensions** | 55m (array tip-to-tip) × 25m | |
| **Design life** | 15 years / 50+ trips | Thruster lifetime ~50,000 hours |
| **Autonomy level** | Full (Level 5) | No human intervention required |

#### Mission Profile Example: LEO Staging → 1 AU Asteroid → Return

**Assumption:** Target NEA at ~0.05 AU from Earth orbit, low relative velocity (~1 km/s at optimal transfer window).

- Outbound ΔV: ~3 km/s (spiral out from staging orbit + transfer)
- Return ΔV: ~4 km/s (loaded, lower acceleration)
- Total mission ΔV: ~7 km/s
- Trip time: 6–18 months depending on geometry
- Payload delivered per trip: 50–80 tonnes of processed material

**Propellant budget (Tsiolkovsky):**

For 7 km/s ΔV, Isp = 2,500 s (exhaust velocity = 24,525 m/s):

Mass ratio = e^(7000/24525) = e^0.285 = 1.33

If final mass (dry + payload) = 54,500 kg (4,500 dry + 50,000 payload):
Initial mass = 54,500 × 1.33 = 72,485 kg
Propellant = 17,985 kg

This is within our 15,000 kg propellant capacity if we reduce payload to ~40t, or we accept Isp optimization at 3,000 s for the loaded return leg.

### 3.3 TV-2 "Courier" — Priority Transport

A smaller, faster vehicle for time-sensitive cargo: replacement electronics, specialized tools, catalysts, or small high-value components.

| Parameter | Value |
|-----------|-------|
| **Dry mass** | 800 kg |
| **Payload capacity** | 1,000–5,000 kg |
| **Propellant mass** | 1,500 kg |
| **Solar array area** | 80 m² |
| **Power at 1 AU** | 40 kW |
| **Thrusters** | 3× Hall-effect (2 active + 1 spare) |
| **Total thrust** | 1.5 N |
| **Isp** | 2,000–3,000 s |
| **ΔV capability** | 8–20 km/s (light loads) |
| **Overall dimensions** | 25m × 12m |
| **Design life** | 10 years |

The Courier uses the same CPAB avionics module (identical flight computer, star trackers, comms) but a scaled-down power and propulsion section. The cargo bay is a thermally-controlled pressurized container for sensitive electronics.

### 3.4 TV-3 "Shepherd" — Asteroid Redirect Vehicle

The largest and most specialized class. Used to redirect small asteroids (10–50m diameter) or large processed ore masses to processing facility orbits.

```
        ┌─────────────────────────────────────────┐
        │         MEGA SOLAR ARRAY                 │
        │    (4 wings, 2000 m² total)             │
        │         1 MW @ 1 AU                      │
        └────────────────┬────────────────────────┘
                         │
              ┌──────────┴──────────┐
              │    SHEPHERD CORE     │
              │                     │
              │  12× Hall thrusters │
              │  (8 active + 4 sp.) │
              │                     │
              │  Propellant: 50t    │
              │  krypton            │
              │                     │
              └──────────┬──────────┘
                         │
              ┌──────────┴──────────┐
              │  GRAPPLE/ANCHOR     │
              │  SYSTEM             │
              │                     │
              │  • 6 anchor drills  │
              │  • Tensioned cable  │
              │    net (100m span)  │
              │  • Load cells       │
              │  • Spin management  │
              └─────────────────────┘
                         │
                    ┌────┴────┐
                    │ASTEROID │
                    │ (target)│
                    │ 10-50m  │
                    └─────────┘
```

| Parameter | Value |
|-----------|-------|
| **Dry mass** | 15,000 kg |
| **Propellant mass** | 50,000 kg krypton |
| **Target payload** | 500–2,000 tonnes (asteroid mass) |
| **Solar array area** | 2,000 m² |
| **Power at 1 AU** | 1 MW |
| **Thrusters** | 12× high-power Hall (8 active) |
| **Total thrust** | 20 N |
| **Isp** | 2,500–3,500 s |
| **ΔV capability** | 1–3 km/s (with asteroid attached) |
| **Mission duration** | 2–5 years per redirect |
| **Design life** | 20 years / 5–10 redirects |

**Key challenge:** Attaching to and managing the spin state of an irregularly-shaped asteroid. The grapple system uses rock-anchor drills (heritage from mining/climbing bolt technology, adapted for microgravity) and a tensioned cable net to distribute thrust loads across the asteroid surface. Before main thrusting begins, the Shepherd must de-spin the target to < 0.1 rpm using differential thrust and cable torques.

---

## 4. Subsystems Breakdown

### 4.1 Propulsion Subsystem

**Selected technology: Nested-channel Hall-effect thrusters**

Rationale: Hall thrusters offer the best balance of thrust density, specific impulse, and technology maturity for this application. Gridded ion engines (like NEXT-C) have higher Isp but lower thrust density. Magnetoplasmadynamic (MPD) thrusters could offer higher power per unit but are TRL 4–5. Hall thrusters are TRL 9 (SPT-140, PPS-5000, X3).

**Baseline thruster: Scaled variant of the X3 nested Hall thruster (University of Michigan / Aerojet Rocketdyne heritage)**

| Thruster Parameter | Value |
|---|---|
| Power per thruster | 30 kW (TV-1), 15 kW (TV-2), 80 kW (TV-3) |
| Thrust | 2.5 N (TV-1), 0.75 N (TV-2), 5 N (TV-3) |
| Isp | 2,000–3,000 s (variable) |
| Propellant | Krypton (primary), Xenon (backup) |
| Lifetime | 50,000 hours |
| Mass per thruster | 50 kg (TV-1 variant) |

**Why krypton over xenon?** Xenon costs ~$3,000/kg; krypton costs ~$500/kg. At the propellant masses we're talking about (8,000–50,000 kg per vehicle), this is a $12M–$125M savings per vehicle. Krypton gives ~10–15% lower performance (lower ionization cross-section, slightly lower thrust efficiency), but the cost advantage is overwhelming at fleet scale. We accept the performance penalty.

**Propellant Power Unit (PPU):** Each thruster has a dedicated PPU converting bus power (300V DC from solar arrays) to the discharge voltage (300–600V) and providing cathode heater/keeper power. PPUs are the reliability bottleneck — we carry N+2 redundancy.

### 4.2 Power Subsystem

**Solar arrays:** Lightweight roll-out arrays using multi-junction (InGaP/GaAs/InGaAs) cells.

| Parameter | Value |
|---|---|
| Cell efficiency | 33% BOL |
| Specific power | 150 W/kg @ 1 AU (array level) |
| Degradation | 1% per year (radiation + thermal cycling) |
| Deployment | Roll-out boom (ATK/Redwire UltraFlex heritage) |
| Stowage ratio | 1:8 (stowed:deployed area) |

**Assumption:** Array specific power of 150 W/kg is achievable near-term. Current state-of-art (ROSA/MegaFlex) achieves ~100–120 W/kg. We assume modest improvement by production start.

For TV-1 (200 kW): Array mass ≈ 1,333 kg
For TV-3 (1 MW): Array mass ≈ 6,667 kg

**Energy storage:** Lithium-ion battery bank for eclipse operations and peak loads.

| Parameter | TV-1 | TV-2 | TV-3 |
|---|---|---|---|
| Battery capacity | 20 kWh | 5 kWh | 50 kWh |
| Battery mass | 80 kg | 20 kg | 200 kg |
| Purpose | Eclipse, safe mode, peak avionics | Same | Same + grapple actuators |

**Power Management and Distribution (PMAD):**
- 300V DC primary bus (high voltage to minimize conductor mass)
- DC-DC converters for avionics (28V), heaters, mechanisms
- Fault-tolerant switching with solid-state power controllers
- Mass: ~200 kg (TV-1), ~400 kg (TV-3)

### 4.3 Avionics and GN&C

**Flight Computer:**
- Radiation-hardened multi-core processor (e.g., LEON5 or RAD750 successor)
- Triple-modular redundancy (TMR) with voting logic
- 256 GB radiation-hardened flash storage
- Real-time OS with autonomous mission planning capability

**Navigation Sensors:**
| Sensor | Quantity | Purpose |
|---|---|---|
| Star tracker | 2 | Attitude determination, 5 arcsec accuracy |
| Sun sensor (coarse) | 6 | Safe-mode attitude reference |
| IMU (MEMS + fiber optic gyro) | 2 | Rate sensing, dead reckoning |
| LIDAR | 1 | Proximity ops, rendezvous (range: 10 km) |
| Optical camera (wide-field) | 2 | Target acquisition, terrain-relative nav |
| Optical camera (narrow-field) | 1 | Precision docking/approach |
| GNSS receiver | 1 | Near-Earth operations only |
| Radar altimeter | 1 | TV-3 only: asteroid surface proximity |

**Attitude Control:**
- Primary: Thruster gimbaling (±15° two-axis) provides torque during thrusting
- Secondary: 4× reaction wheels (10 Nms each) for fine pointing during coast/docking
- Tertiary: Cold-gas RCS (nitrogen) for emergency desaturation and proximity maneuvers
  - TV-1: 8 thrusters, 50 kg N₂
  - TV-3: 16 thrusters, 200 kg N₂

### 4.4 Communications

**Architecture:** Delay-tolerant networking (DTN) protocol stack. Vehicles operate as nodes in a mesh network.

| System | Spec |
|---|---|
| Primary uplink/downlink | X-band, 2 kbps command / 256 kbps telemetry |
| High-gain antenna | 1.5m parabolic, 2-axis gimbal |
| Low-gain antenna | 2× omnidirectional (hemispherical coverage) |
| Inter-vehicle link | S-band, 1 Mbps, for fleet coordination |
| Beacon | UHF, continuous, for search/recovery |
| Transmit power | 50 W (X-band), 5 W (S-band) |

**Assumption:** Deep Space Network (DSN) or equivalent ground infrastructure is available for initial operations. As fleet scales, we deploy dedicated relay satellites at Earth-Sun L1/L2 and in asteroid belt relay orbits.

**Data rates are modest by design.** These vehicles don't need to stream video. They need to report state vectors, health telemetry, and receive trajectory updates. Autonomy reduces communication bandwidth requirements by orders of magnitude.

### 4.5 Thermal Control

Operating environment ranges from 0.8 AU (hot case, near Venus orbit for some transfers) to 3.0 AU (cold case, main belt).

| Component | Approach |
|---|---|
| Avionics | Multi-layer insulation (MLI) + thermostatically controlled heaters + heat pipes to radiator |
| Thrusters | Self-heating during operation; survival heaters during coast |
| Propellant tanks | MLI + heaters (krypton must stay above critical temp for flow) |
| Solar arrays | Passive (high emissivity coating on back side) |
| Radiator area (TV-1) | 8 m² (rejecting ~2 kW waste heat from PPUs + avionics) |

### 4.6 Structures and Mechanisms

**Primary structure:** Aluminum 6061-T6 truss (near-term); transition to asteroid-derived steel/aluminum as in-situ manufacturing matures.

**Key mechanisms:**
- Solar array deployment (one-time, spring-driven with dampers)
- Thruster gimbal actuators (continuous, stepper motors, 50,000-hour life)
- Cargo latching/release (electromechanical, redundant release paths)
- Docking interface (androgynous, soft-capture ring + hard-capture bolts)
- TV-3 only: Anchor drill deployment, cable reel/tensioner

**Cargo interface standard:**
```
    ┌─────────────────────────────┐
    │    STANDARD CARGO INTERFACE │
    │         (SCI-1)             │
    │                             │
    │  ○ ○ ○ ○    ○ ○ ○ ○       │  ← 8× M20 bolt pattern
    │                             │     (1.2m bolt circle)
    │      ┌───────────┐         │
    │      │ Alignment │         │  ← Passive alignment cone
    │      │   cone    │         │
    │      └───────────┘         │
    │                             │
    │  ◄── Data connector (CAN)  │  ← Optional: cargo telemetry
    │  ◄── Power connector (28V) │  ← Optional: cargo keep-alive
    │                             │
    │  Rated load: 200 kN axial  │
    │              50 kN lateral  │
    └─────────────────────────────┘
```

All cargo containers, processing facility output ports, and construction staging racks use this interface. Standardization is non-negotiable.

---

## 5. Autonomy Architecture

### 5.1 Autonomy Levels

The vehicles operate at **SAE-equivalent Level 5 autonomy** for space operations. This means:

- **Self-navigation:** Onboard orbit determination using star trackers + Sun sensors + optical navigation (asteroid-relative). No GPS beyond cislunar space.
- **Self-scheduling:** Given a manifest of cargo pickups and deliveries, the vehicle plans its own trajectory, thrust arcs, and coast phases.
- **Self-diagnosis:** Continuous health monitoring of all subsystems. Automatic fault isolation and reconfiguration (e.g., failed thruster → redistribute thrust across remaining units).
- **Self-preservation:** If a critical fault occurs, the vehicle enters safe mode (sun-pointing, minimum power, beacon active) and awaits instructions — but can also autonomously attempt recovery.

### 5.2 Software Architecture

```
┌─────────────────────────────────────────────────────┐
│                 MISSION MANAGER                      │
│  (Goal-based planning, manifest execution)           │
├─────────────────────────────────────────────────────┤
│         │              │              │              │
│  ┌──────▼──────┐ ┌────▼─────┐ ┌─────▼──────┐      │
│  │ TRAJECTORY  │ │ RENDEZVOUS│ │  FLEET     │      │
│  │ PLANNER     │ │ & DOCKING │ │  COORD     │      │
│  │             │ │ MANAGER   │ │  AGENT     │      │
│  │ Low-thrust  │ │           │ │            │      │
│  │ optimization│ │ Approach  │ │ Negotiate  │      │
│  │ (Sims-     │ │ corridors │ │ berth      │      │
│  │  Flanagan)  │ │ Capture   │ │ assignments│      │
│  └──────┬──────┘ │ sequences │ │ Share nav  │      │
│         │        └────┬──────┘ │ data       │      │
│         │             │        └─────┬──────┘      │
├─────────▼─────────────▼──────────────▼──────────────┤
│              GN&C EXECUTIVE                          │
│  (Attitude control, thrust vector management,        │
│   sensor fusion, state estimation)                   │
├─────────────────────────────────────────────────────┤
│              FAULT MANAGEMENT                        │
│  (FDIR rules, anomaly detection, safe mode triggers) │
├─────────────────────────────────────────────────────┤
│              HARDWARE ABSTRACTION LAYER              │
│  (Thruster drivers, sensor interfaces, mechanisms)   │
└─────────────────────────────────────────────────────┘
```

**Key software challenge:** Low-thrust trajectory optimization is computationally expensive. We pre-compute trajectory libraries on the ground and upload them, but the vehicle must be able to re-optimize in real-time when deviations occur (thruster underperformance, missed thrust arcs, changed destination). This requires onboard convex optimization solvers — feasible with modern rad-hard processors but needs careful implementation.

### 5.3 Fleet Coordination

With hundreds of vehicles operating simultaneously, we need distributed coordination:

- **Manifest server** (ground or orbital relay): Assigns cargo to vehicles, optimizes fleet-level logistics
- **Peer-to-peer coordination**: Vehicles near the same facility negotiate approach/departure sequencing via S-band inter-vehicle link
- **Collision avoidance**: Onboard trajectory screening against shared ephemeris database, updated via DTN

---

## 6. Mission Operations Concept

### 6.1 Typical TV-1 Mission Profile

```
Timeline (months)
│
0 ──── Depart processing facility (Earth-vicinity staging orbit)
│      Begin low-thrust spiral
│
2 ──── Escape Earth sphere of influence
│      Begin heliocentric transfer
│
5 ──── Mid-course correction (autonomous)
│
8 ──── Arrive at target NEA mining site
│      Autonomous rendezvous and station-keeping
│      Cargo loading (robotic, 2-5 days)
│
8.2 ── Depart NEA, begin return transfer (loaded)
│
14 ─── Arrive Earth-vicinity staging orbit
│      Cargo offload at processing/construction facility
│      Vehicle health check (autonomous)
│      Propellant replenishment (if depot available)
│
15 ─── Begin next mission cycle
│
```

**Throughput estimate for fleet of 100 TV-1 vehicles:**
- Average round-trip: 14 months
- Average payload per trip: 60 tonnes
- Trips per vehicle per year: 0.86
- **Fleet throughput: ~5,160 tonnes/year**

This is a starting point. As we move to closer NEAs and establish propellant depots, trip times decrease and throughput increases. The target for Phase 0 completion is **50,000–100,000 tonnes/year** of processed material delivered to construction staging, requiring a fleet of ~1,000–2,000 TV-1 vehicles (or equivalent TV-3 redirects supplementing).

### 6.2 Propellant Supply Chain

This is a critical dependency. Each TV-1 consumes ~12,000 kg of krypton per round trip.

**100 vehicles × 0.86 trips/year × 12,000 kg = 1,032,000 kg krypton/year**

Global krypton production is ~40,000 kg/year (2024). **We need 25× current global production.** This is a serious constraint.

**Mitigation strategies:**
1. **Expand terrestrial krypton production** (air separation plants — krypton is a byproduct). Capital cost ~$500M to 10× production.
2. **Transition to argon propellant** as thruster technology matures. Argon is 1000× more abundant and ~$5/kg. Performance penalty is ~30% (lower atomic mass → lower thrust efficiency in Hall thrusters), but the supply is essentially unlimited.
3. **In-situ propellant**: Some asteroids contain trapped noble gases. Unlikely to be a primary source but worth investigating.
4. **Water-based propulsion** (electrolysis → H₂/O₂ arcjets or resistojets) as a backup. Lower Isp (~600–1,000 s) but water is available from C-type asteroids.

**My recommendation:** Start with krypton, invest heavily in argon-compatible thruster development, and plan the transition for Year 5 of operations.

---

## 7. Manufacturing Considerations

### 7.1 Production Rate Requirements

| Phase | Year | TV-1 Fleet Size | Production Rate |
|---|---|---|---|
| Pilot | 1–3 | 10 | 3–4/year |
| Ramp-up | 4–7 | 100 | 25/year |
| Full-scale | 8–15 | 1,000 | 100–150/year |
| Self-replicating | 15+ | 5,000+ | In-situ manufactured |

At full-scale, we need to produce **~2 TV-1 vehicles per week.** This is automotive-scale production for spacecraft. It demands:

### 7.2 Design for Manufacturing (DFM) Principles

1. **Minimize unique part count.** Target: < 500 unique part numbers per vehicle (current spacecraft: 5,000–50,000).
2. **Welded aluminum truss structure** — no composites (composites are expensive and hard to produce in space). Aluminum is available from asteroids.
3. **Modular thruster pods** — each pod is a self-contained unit (thruster + PPU + gimbal + propellant feed) that can be tested independently and swapped in the field.
4. **Standardized avionics cards** — single-board computers, power controllers, and communication modules on a common card form factor with backplane bus.
5. **Automated wire harness** — minimize harness complexity through bus architecture and wireless intra-vehicle data links where appropriate.

### 7.3 Transition to In-Situ Manufacturing

The long-term vision is that TV-1 vehicles are manufactured at orbital facilities using asteroid-derived materials. This requires:

- **Structural components:** Aluminum/iron/nickel alloys — achievable with electric arc furnaces in orbit
- **Solar cells:** Silicon from asteroid regolith — requires semiconductor-grade purification (challenging but feasible)
- **Thrusters:** Boron nitride, magnetic materials — will need to be imported from Earth initially
- **Electronics:** Semiconductor fabrication in space is the hardest problem. Plan to import chips from Earth for the foreseeable future (they're low-mass, high-value — ideal for Courier delivery)

**Realistic assessment:** By Year 15, we can manufacture ~70% of vehicle mass in space (structures, tanks, wiring, simple mechanisms). The remaining 30% (electronics, thrusters, solar cells, sensors) will still come from Earth, but this dramatically reduces launch costs.

---

## 8. Development Roadmap

```
Year  1    2    3    4    5    6    7    8    9    10
      │    │    │    │    │    │    │    │    │    │
      ├────┤    │    │    │    │    │    │    │    │
      │PDR │    │    │    │    │    │    │    │    │
      │    ├────┤    │    │    │    │    │    │    │
      │    │CDR │    │    │    │    │    │    │    │
      │    │    ├────┤    │    │    │    │    │    │
      │    │    │Proto│    │    │    │    │    │    │
      │    │    │build│    │    │    │    │    │    │
      │    │    │    ├────┤    │    │    │    │    │
      │    │    │    │Test│    │    │    │    │    │
      │    │    │    │qual│    │    │    │    │    │
      │    │    │    │    ├────┤    │    │    │    │
      │    │    │    │    │TV-1│    │    │    │    │
      │    │    │    │    │#001│    │    │    │    │
      │    │    │    │    │fly │    │    │    │    │
      │    │    │    │    │    ├────┤    │    │    │
      │    │    │    │    │    │Ops │    │    │    │
      │    │    │    │    │    │demo│    │    │    │
      │    │    │    │    │    │(10)│    │    │    │
      │    │    │    │    │    │    ├─────────┤    │
      │    │    │    │    │    │    │ Ramp to │    │
      │    │    │    │    │    │    │ 100 veh │    │
      │    │    │    │    │    │    │         ├────┤
      │    │    │    │    │    │    │         │Full│
      │    │    │    │    │    │    │         │prod│

Parallel tracks:
├─── Thruster development (argon-compatible) ──────────────►
├─── Autonomy software development & V&V ──────────────────►
├─── In-situ manufacturing technology ─────────────────────►
├─── Propellant supply chain expansion ────────────────────►
```

### Technology Readiness Assessment

| Subsystem | Current TRL | Required TRL | Gap |
|---|---|---|---|
| Hall thrusters (krypton, 30 kW) | 6–7 | 9 | Moderate — need life testing |
| Hall thrusters (argon) | 3–4 | 7 | Significant — 5-year dev program |
| Lightweight solar arrays (150 W/kg) | 7 | 9 | Low — incremental improvement |
| Autonomous navigation (deep space) | 5–6 | 8 | Moderate — heritage from DART, OSIRIS-REx |
| Autonomous rendezvous/docking | 6–7 | 9 | Low-moderate — heritage from MEV, Cygnus |
| Fleet coordination software | 3 | 7 | Significant — novel at this scale |
| Asteroid grapple/anchor (TV-3) | 2–3 | 7 | Significant — limited heritage |
| In-situ vehicle manufacturing | 1–2 | 5 | Very significant — long-term R&D |

---

## 9. Cost Analysis

### 9.1 Development Costs (Non-Recurring)

| Item | Cost (FY2025 $M) | Notes |
|---|---|---|
| TV-1 design & development | 400 | Including prototype |
| TV-2 design (delta from TV-1) | 80 | Common bus reduces cost |
| TV-3 design & development | 300 | Grapple system is novel |
| Thruster development (krypton) | 150 | Life qualification |
| Thruster development (argon) | 200 | New development |
| Autonomy software | 250 | Including V&V |
| Ground systems & ops infrastructure | 100 | |
| Test & qualification | 200 | |
| **Total NRE** | **1,680** | |

### 9.2 Recurring (Production) Costs

**Target TV-1 unit cost at scale (100+/year):**

| Component | Cost ($M) | Notes |
|---|---|---|
| Structure & mechanisms | 2.0 | Aluminum truss, simple |
| Solar arrays (400 m²) | 8.0 | $20,000/m² at volume |
| Thrusters (6 units) | 3.0 | $500K each at volume |
| PPUs (6 units) | 2.4 | $400K each |
| Avionics | 3.0 | Rad-hard electronics |
| PMAD | 1.5 | |
| Thermal | 0.5 | Passive + heaters |
| Integration & test | 2.0 | Streamlined for production |
| **TV-1 unit cost** | **~22.4** | |
| Propellant (12,000 kg Kr) | 6.0 | $500/kg krypton |
| Launch to staging orbit | 15.0 | ~20t to LEO @ $750/kg (Starship-class) |
| **Total per-mission cost** | **~43.4** | |

**Cost per kilogram delivered (TV-1):**

$43.4M / 60,000 kg = **$723/kg**

For comparison, current launch costs to LEO are ~$1,500–2,700/kg (Falcon 9) to ~$200–500/kg (projected Starship). Our transport system delivers material from asteroids to orbital facilities at a cost competitive with Earth launch — and the material is already in space, avoiding the energy cost of climbing out of Earth's gravity well.

**At scale (1,000 vehicles, argon propellant, in-situ manufacturing of structures):**

Projected unit cost drops to ~$8–12M, propellant cost drops to ~$0.1M, and cost per kg delivered approaches **$150–250/kg**. This is the economic threshold that makes a Dyson swarm feasible.

### 9.3 Fleet Cost Summary

| Phase | Vehicles | Unit Cost | Fleet Cost | Annual Ops |
|---|---|---|---|---|
| Pilot (10 TV-1) | 10 | $30M | $300M | $50M |
| Ramp (100 TV-1, 5 TV-3) | 105 | $22M avg | $2.3B | $400M |
| Full (1000 TV-1, 20 TV-3) | 1,020 | $15M avg | $15.3B | $3B |

**Total Phase 0 transport investment: ~$20B over 15 years**

This is large but comparable to a major terrestrial infrastructure program (e.g., US Interstate Highway System adjusted for inflation: ~$600B; International Space Station: ~$150B).

---

## 10. Risk Assessment

### 10.1 Risk Matrix

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | Krypton supply insufficient | HIGH | HIGH | Accelerate argon thruster dev; stockpile early |
| R2 | Thruster lifetime < 50,000 hrs | MEDIUM | HIGH | Carry spares; design for in-space thruster swap |
| R3 | Autonomy software failure (fleet-wide) | LOW | CRITICAL | Diverse software implementations; extensive V&V; manual override capability |
| R4 | Solar array degradation faster than modeled | MEDIUM | MEDIUM | Conservative power margins (20%); array replacement capability |
| R5 | Asteroid grapple failure (TV-3) | HIGH | MEDIUM | Extensive ground testing; multiple anchor points; accept some mission failures |
| R6 | Collision between vehicles at facility | LOW | HIGH | Approach corridors; proximity sensors; fleet coordination |
| R7 | Cost overrun on development | HIGH | MEDIUM | Phased development; descope TV-3 if needed |
| R8 | Launch cost doesn't decrease as projected | MEDIUM | HIGH | Design for minimum launch mass; prioritize in-situ manufacturing |
| R9 | Radiation damage to electronics (solar events) | MEDIUM | MEDIUM | Rad-hard components; shielded vault; safe mode during events |
| R10 | Geopolitical disruption to supply chain | MEDIUM | HIGH | Diversify suppliers; stockpile critical components; in-situ manufacturing |

### 10.2 Critical Risk: R1 — Krypton Supply

This is the single biggest near-term risk. The entire transport architecture depends on electric propulsion, and electric propulsion depends on propellant. Our propellant demand exceeds global supply by 25×.

**Recommended action plan:**
1. **Immediately** (Year 0): Begin contracts with air separation companies (Linde, Air Liquide, Air Products) for krypton supply agreements. Fund expansion of krypton extraction capacity.
2. **Year 1–3:** Fund argon Hall thruster development at 3+ institutions (competitive approach). Target: 30 kW argon thruster at TRL 6 by Year 4.
3. **Year 3–5:** Qualify argon thrusters. Retrofit pilot fleet vehicles with argon-compatible PPUs and feed systems.
4. **Year 5+:** All new production vehicles use argon. Krypton reserved for high-ΔV missions where the performance advantage matters.
5. **Parallel track:** Investigate water electrolysis propulsion as a tertiary option using asteroid-derived water.

---

## 11. Open Engineering Questions

These are the problems I don't have clean answers for yet. They need dedicated study:

1. **Optimal staging orbit location.** Earth-Sun L1? High Earth orbit? Lunar DRO? The staging orbit affects ΔV budgets for every mission. Need a full trade study considering: ΔV to/from asteroid targets, station-keeping costs, communication geometry, eclipse frequency, and proximity to Earth manufacturing.

2. **Cargo container standardization.** What are the right container sizes? Do we use rigid containers (heavy but protective) or flexible bags (light but risk of material loss)? How do we handle bulk granular material (processed regolith) vs. refined metal ingots vs. volatile ices?

3. **Vehicle-to-vehicle propellant transfer.** Can we refuel vehicles in space? This would dramatically improve fleet flexibility. Cryogenic propellant transfer is hard; krypton (stored as supercritical fluid) may be easier. Need technology demonstration.

4. **Thruster erosion in krypton/argon.** Long-duration erosion data for Hall thrusters on krypton is limited; on argon it's almost nonexistent. Need accelerated life testing and in-situ erosion monitoring.

5. **Asteroid material handling in microgravity.** How do you load 50 tonnes of processed material onto a vehicle in microgravity? Conveyor belts don't work. Pneumatic transfer? Electromagnetic mass drivers into a capture net? Bagging at the processing site? This interfaces heavily with the processing facility design.

6. **Fleet scheduling optimization.** With 1,000+ vehicles, dozens of source asteroids, and multiple destination facilities, the logistics optimization problem is NP-hard. What approximation algorithms give us good-enough solutions in real-time? Can we use market-based mechanisms (vehicles "bid" on cargo assignments)?

7. **End-of-life disposal.** Where do we put vehicles that are no longer serviceable? Graveyard orbit? Recycle them at processing facilities? We can't create a debris problem at this scale.

8. **Radiation environment for long-duration missions.** TV-3 missions last 2–5 years in interplanetary space. Total ionizing dose and single-event effects on electronics need detailed modeling for each mission profile.

9. **Scalability of ground operations.** Even with autonomous vehicles, someone needs to manage the fleet, handle anomalies, and update manifests. What's the right ratio of operators to vehicles? Current spacecraft ops: ~5–20 people per vehicle. We need < 0.1 people per vehicle. How?

10. **Legal and regulatory framework.** Who owns the asteroids? Who is liable if a TV-3 redirect goes wrong? What are the planetary protection implications? These aren't engineering questions, but they'll constrain engineering decisions.

---

## 12. Conclusion and Recommendation

The transport vehicle fleet is the circulatory system of Project Dyson. Without reliable, high-throughput, low-cost material transport, no amount of mining or processing capability matters.

**My recommendation is to proceed immediately with:**

1. **Fund TV-1 "Mule" development** as the highest priority. This is the vehicle we need the most of, the soonest. Target first flight in Year 5.

2. **Fund argon thruster development** in parallel. This is the critical technology that unlocks fleet scaling beyond the krypton supply constraint.

3. **Defer TV-3 "Shepherd"** to Phase 0.5. The asteroid redirect mission is higher risk and can be deferred until we have operational experience with TV-1. In the interim, we process material at the asteroid and transport it via TV-1.

4. **Invest in autonomy software** as a separate, well-funded program. This is the force multiplier that makes fleet-scale operations feasible with a small operations team.

5. **Establish the Standard Cargo Interface (SCI-1)** immediately and make it a program-wide requirement. Every facility, every vehicle, every container must use it. Interface standardization is free if you do it early and astronomically expensive if you do it late.

The numbers work. The physics works. The technology is within reach. The challenge is industrial scale — building spacecraft like we build trucks, not like we build cathedrals.

Let's get started.

---

*End of Proposal PD-P0-TV-001 Rev A*

*Prepared for Project Dyson Phase 0 Architecture Review*