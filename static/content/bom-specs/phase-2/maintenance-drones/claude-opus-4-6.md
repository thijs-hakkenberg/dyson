---
bomId: "bom-2-2"
itemName: "Maintenance Drones"
itemSlug: "maintenance-drones"
modelId: "claude-opus-4-6"
modelName: "Claude Opus 4.6"
generated: "2026-02-07"
phase: "phase-2"
---



# Technical Proposal: Maintenance Drone Fleet for Project Dyson — Phase 2 Swarm Expansion

**Document ID:** PD-P2-MD-001 Rev A
**Author:** Swarm Infrastructure Engineering Division
**Date:** 2025-07-11
**Classification:** Project Dyson — Internal Technical Proposal

---

## 1. Executive Summary

Phase 2 of Project Dyson will scale the swarm from ~10,000 initial collector panels to approximately 10 million panels over a 15-year expansion window. At this scale, maintenance becomes the dominant operational challenge. Panel degradation from micrometeorite impacts, solar wind erosion, thermal cycling fatigue, and attitude control failures will produce a steady-state failure rate that, if unaddressed, will erode swarm power output faster than new panels can be deployed.

I propose a hierarchical, three-tier autonomous drone fleet architecture comprising approximately **50,000 maintenance drones** at full Phase 2 scale, organized into self-managing squadrons. The design philosophy is **radical simplicity at the unit level, emergent capability at the fleet level** — each drone is cheap, expendable, and specialized, but the fleet collectively handles every maintenance scenario.

---

## 2. Design Philosophy

### 2.1 Core Principles

1. **Expendability over resilience.** Each drone should cost less than the panel it services. If a drone fails, the fleet absorbs the loss. No single drone is mission-critical.

2. **Specialization over generality.** Three drone types, each optimized for one task class, outperform one general-purpose drone trying to do everything. This reduces per-unit complexity by ~60%.

3. **Swarm intelligence over centralized control.** No ground station or mothership should be a single point of failure. Drones operate on local rules with global emergent behavior.

4. **Solar-native design.** We are building infrastructure *around a star*. Every drone is solar-powered with no consumable propellant — solar sail and solar-electric propulsion only.

5. **Self-replicating supply chain.** Phase 2 drones should be manufacturable by the same in-situ resource utilization (ISRU) infrastructure building the panels themselves.

### 2.2 Why Not One Universal Drone?

I considered and rejected a single multi-role drone. The mass penalty for carrying inspection sensors, repair tools, and panel-towing capability on every unit is approximately 3.2x compared to specialized variants. At 50,000 units, that mass penalty translates to ~75,000 tonnes of additional material — equivalent to roughly 7,500 additional collector panels we could have built instead.

---

## 3. Fleet Architecture

### 3.1 Three-Tier Drone Taxonomy

```
╔══════════════════════════════════════════════════════════════════════╗
║                    MAINTENANCE DRONE FLEET                          ║
║                    (~50,000 units at full scale)                     ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  TIER 1: INSPECTOR DRONES (Type-I)          ~35,000 units (70%)     ║
║  ┌─────────────────────────────────────┐                             ║
║  │ • Continuous patrol & diagnostics   │                             ║
║  │ • Multispectral imaging             │                             ║
║  │ • Micro-repair (sealant, rewiring)  │                             ║
║  │ • Mass: ~15 kg each                 │                             ║
║  └─────────────────────────────────────┘                             ║
║                                                                      ║
║  TIER 2: REPAIR DRONES (Type-R)            ~12,000 units (24%)      ║
║  ┌─────────────────────────────────────┐                             ║
║  │ • Structural repair & component swap│                             ║
║  │ • Welding / bonding / soldering     │                             ║
║  │ • Carries replacement modules       │                             ║
║  │ • Mass: ~85 kg each                 │                             ║
║  └─────────────────────────────────────┘                             ║
║                                                                      ║
║  TIER 3: TUG DRONES (Type-T)               ~3,000 units (6%)       ║
║  ┌─────────────────────────────────────┐                             ║
║  │ • Panel repositioning & retirement  │                             ║
║  │ • Debris removal / collision avoid  │                             ║
║  │ • Tow failed panels to recycling    │                             ║
║  │ • Mass: ~350 kg each                │                             ║
║  └─────────────────────────────────────┘                             ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

### 3.2 Fleet Hierarchy and Organization

```
                    ┌─────────────────────┐
                    │   SWARM OPERATIONS   │
                    │   COORDINATOR (SOC)  │
                    │  (Software entity,   │
                    │   distributed across │
                    │   relay satellites)  │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
     ┌────────▼──────┐ ┌──────▼────────┐ ┌─────▼───────┐
     │  SECTOR CMD   │ │  SECTOR CMD   │ │ SECTOR CMD  │
     │  (1 per 10k   │ │  (hosted on   │ │ (~1,000     │
     │   panels)     │ │   relay sat)  │ │  sectors)   │
     └───────┬───────┘ └──────┬────────┘ └──────┬──────┘
             │                │                  │
    ┌────────┼──────┐         │                  │
    │        │      │         │                  │
  ┌─▼──┐ ┌──▼─┐ ┌──▼─┐                          
  │Sqd │ │Sqd │ │Sqd │   Squadron = 50 drones   
  │ A  │ │ B  │ │ C  │   (35 Type-I, 12 Type-R, 
  └─┬──┘ └─┬──┘ └─┬──┘    3 Type-T)             
    │       │      │                              
  ┌─▼──────────────▼──┐                           
  │  Individual Drones │                          
  │  (autonomous ops,  │                          
  │   peer-to-peer     │                          
  │   coordination)    │                          
  └────────────────────┘                          
```

**Assumption:** The swarm at full Phase 2 scale consists of ~10 million panels organized into ~1,000 sectors of ~10,000 panels each. Each sector is serviced by one squadron of ~50 drones.

---

## 4. Technical Specifications

### 4.1 Type-I Inspector Drone

| Parameter | Specification | Notes |
|---|---|---|
| **Dimensions** | 0.6 × 0.4 × 0.3 m (stowed) | Deployable solar arrays extend to 1.8 m span |
| **Dry Mass** | 12.5 kg | Aluminum-lithium frame, CFRP panels |
| **Consumables Mass** | 2.5 kg | Sealant cartridges, micro-wire spools |
| **Total Mass** | 15 kg | |
| **Solar Array Area** | 1.2 m² | Triple-junction GaInP/GaAs/Ge, 32% efficiency |
| **Power Generation** | ~525 W at 1 AU | Solar constant 1,361 W/m² × 0.32 × 1.2 m² |
| **Power at 0.5 AU** | ~2,100 W | Inverse square: 4× power at half distance |
| **Operating Orbit** | 0.3–1.0 AU | Swarm occupies range of heliocentric orbits |
| **Propulsion** | Solar-electric ion drive (xenon) | Isp ~3,000 s, thrust ~5 mN |
| **ΔV Budget** | ~2,000 m/s per refuel cycle | Sufficient for ~200 panel visits between resupply |
| **Xenon Capacity** | 0.8 kg | Refilled at depot stations |
| **Sensors** | Visible/NIR/LWIR camera suite, LIDAR, current/voltage probes | |
| **Manipulator** | 1× 4-DOF arm, 0.5 m reach, 2 kg payload | For sealant application, connector mating |
| **Compute** | Radiation-hardened RISC-V SoC, 50 GFLOPS | Sufficient for onboard ML inference |
| **Comms** | S-band transceiver, 1 Mbps to relay sat; optical inter-drone link, 10 Mbps | |
| **Design Life** | 5 years (with depot servicing every 6 months) | |
| **Autonomy Level** | Level 4 — fully autonomous with human override | |

### 4.2 Type-R Repair Drone

| Parameter | Specification | Notes |
|---|---|---|
| **Dimensions** | 1.2 × 0.8 × 0.6 m (stowed) | Solar arrays extend to 4.0 m span |
| **Dry Mass** | 55 kg | |
| **Consumables/Spares** | 30 kg | Replacement power bus modules, attitude actuators, wiring harnesses, adhesive |
| **Total Mass** | 85 kg | |
| **Solar Array Area** | 5.5 m² | |
| **Power Generation** | ~2,400 W at 1 AU | |
| **Propulsion** | Solar-electric ion drive (xenon) | Isp ~3,000 s, thrust ~20 mN |
| **ΔV Budget** | ~1,500 m/s per refuel cycle | Heavier, so fewer visits per cycle |
| **Xenon Capacity** | 3.2 kg | |
| **Manipulators** | 2× 6-DOF arms, 1.2 m reach, 10 kg payload each | For component removal/installation |
| **Tool Suite** | Laser welder (200 W), ultrasonic bonder, torque driver, wire stripper/crimper | |
| **Sensors** | Same as Type-I plus X-ray fluorescence for material analysis | |
| **Compute** | Dual-redundant RISC-V SoC, 100 GFLOPS total | Higher compute for manipulation planning |
| **Comms** | S-band + Ka-band, optical inter-drone | |
| **Design Life** | 7 years | More robust construction justifies longer life |

### 4.3 Type-T Tug Drone

| Parameter | Specification | Notes |
|---|---|---|
| **Dimensions** | 2.0 × 1.5 × 1.0 m (body) | Solar arrays extend to 8.0 m span |
| **Dry Mass** | 280 kg | Reinforced structure for towing loads |
| **Consumables** | 70 kg | Xenon propellant, tow cables, grapple fixtures |
| **Total Mass** | 350 kg | |
| **Solar Array Area** | 18 m² | |
| **Power Generation** | ~7,800 W at 1 AU | |
| **Propulsion** | 4× ion thrusters, 50 mN each (200 mN total) | Isp ~3,000 s |
| **ΔV Budget** | ~800 m/s per cycle (loaded with 2,000 kg panel) | |
| **Towing Capacity** | Up to 5,000 kg (one standard panel) | Assumption: panels are ~2,000–5,000 kg |
| **Grapple System** | Electromagnetic + mechanical clamp, universal panel interface | |
| **Sensors** | LIDAR, radar, wide-field cameras for collision avoidance | |
| **Compute** | Triple-redundant RISC-V, 150 GFLOPS | Trajectory planning for loaded towing |
| **Design Life** | 10 years | Highest investment per unit, longest life |

---

## 5. Subsystems Breakdown

### 5.1 Propulsion Subsystem

**Selection Rationale:** I chose gridded ion engines (similar heritage to Dawn, Hayabusa2) over Hall-effect thrusters for the higher specific impulse. At the thrust levels required (~5–200 mN), ion engines are mature and well-characterized.

**Propellant choice:** Xenon is the baseline, but I flag **krypton** as a strong alternative — 60% cheaper per kg, ~15% lower Isp, but at our scale the cost savings are enormous. Phase 2 should qualify krypton early.

**Propellant budget model (Type-I example):**
```
Tsiolkovsky: ΔV = Isp × g₀ × ln(m₀/mf)
2,000 m/s = 3,000 s × 9.81 m/s² × ln(15/mf)
ln(15/mf) = 0.0679
15/mf = 1.0703
mf = 14.01 kg
Propellant used = 0.99 kg ← fits within 0.8 kg Xe + margin from consumables mass
```

*Note: I've been slightly aggressive here. Actual propellant mass for 2,000 m/s ΔV on a 15 kg spacecraft at 3,000 s Isp is ~1.0 kg. The 0.8 kg xenon tank gives ~1,600 m/s; the remaining ΔV comes from solar radiation pressure management (essentially free stationkeeping by adjusting reflective surfaces). Revised ΔV from propulsion alone: **~1,600 m/s**.*

### 5.2 Power Subsystem

```
┌──────────────────────────────────────────────────────────┐
│                    POWER ARCHITECTURE                     │
│                                                          │
│  ┌──────────┐    ┌──────────┐    ┌───────────────────┐  │
│  │  Solar    │───▶│  MPPT    │───▶│  28V Regulated    │  │
│  │  Arrays   │    │  Converter│    │  Power Bus        │  │
│  │  (GaInP/  │    │  (98%    │    │                   │  │
│  │  GaAs/Ge) │    │  eff.)   │    │  ┌─────────────┐ │  │
│  └──────────┘    └──────────┘    │  │ Li-ion       │ │  │
│                                   │  │ Battery      │ │  │
│                                   │  │ (eclipse     │ │  │
│                                   │  │  buffer)     │ │  │
│                                   │  │ 200 Wh       │ │  │
│                                   │  │ (Type-I)     │ │  │
│                                   │  └─────────────┘ │  │
│                                   │                   │  │
│                                   │  Loads:           │  │
│                                   │  • Ion engine     │  │
│                                   │  • Compute        │  │
│                                   │  • Comms          │  │
│                                   │  • Sensors        │  │
│                                   │  • Manipulator    │  │
│                                   │  • Thermal ctrl   │  │
│                                   └───────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

**Battery sizing rationale (Type-I):** The drones operate in heliocentric orbit, not planetary orbit, so eclipses are rare (only when behind a panel during close approach). A 200 Wh buffer handles ~20 minutes of full-power operation without solar input. This is intentionally minimal — if a drone loses solar pointing, it enters safe mode and waits.

**Thermal considerations:** At 0.3 AU, solar flux is ~11× that at 1 AU (~15,000 W/m²). The solar arrays must be gimbaled to manage thermal load, and the drone body requires MLI blankets and a deployable sunshade. At 0.3 AU, the arrays would be tilted to limit absorbed power to ~3,000 W max (thermal design limit).

### 5.3 GNC (Guidance, Navigation, and Control)

**Navigation approach:** No GPS exists in heliocentric space. I propose a three-layer navigation system:

1. **Absolute position:** Star tracker + sun sensor → heliocentric position to ~100 km accuracy
2. **Relative position:** LIDAR + optical tracking of nearby panels → position relative to assigned sector to ~1 m accuracy
3. **Proximity operations:** Structured-light sensor + stereo cameras → position relative to target panel to ~1 mm accuracy

**Attitude control:** 3× reaction wheels (orthogonal) + magnetorquer desaturation is not available (no planetary magnetic field). Instead: reaction wheels + ion thruster differential thrust for desaturation. Alternatively, small cold-gas thrusters using sublimating solid propellant (e.g., camphor — zero-pressure storage, simple sublimation valve).

**Assumption:** Panels have fiducial markers (retroreflectors or coded targets) at standardized locations to assist drone docking and navigation.

### 5.4 Communications Architecture

```
                         ┌─────────────┐
                         │  EARTH      │
                         │  GROUND     │
                         │  STATION    │
                         └──────┬──────┘
                                │ X-band / Ka-band
                                │ (high-latency, 
                                │  8-40 min one-way)
                         ┌──────▼──────┐
                         │  RELAY      │
                         │  SATELLITE  │
                         │  NETWORK    │
                         │  (~100 sats │
                         │  in helio-  │
                         │  centric    │
                         │  orbits)    │
                         └──────┬──────┘
                                │ Ka-band downlink
                                │ S-band uplink
                    ┌───────────┼───────────┐
                    │           │           │
             ┌──────▼──┐ ┌─────▼───┐ ┌─────▼───┐
             │ SECTOR  │ │ SECTOR  │ │ SECTOR  │
             │ RELAY   │ │ RELAY   │ │ RELAY   │
             │ NODE    │ │ NODE    │ │ NODE    │
             │(on panel│ │         │ │         │
             │ or ded. │ │         │ │         │
             │ sat)    │ │         │ │         │
             └────┬────┘ └────┬────┘ └────┬────┘
                  │           │           │
            ┌─────┼─────┐    ...         ...
            │     │     │
          ┌─▼─┐ ┌▼──┐ ┌▼──┐
          │D1 │ │D2 │ │D3 │  ◄── Individual drones
          └───┘ └───┘ └───┘      (optical inter-drone
                                   mesh network)
```

**Key design decisions:**

- **No real-time Earth control.** Light-time delay to the swarm ranges from 4 minutes (0.5 AU, conjunction) to 20+ minutes (1.5 AU, opposition). All maintenance operations must be autonomous. Earth provides strategic tasking only (e.g., "prioritize sector 447 this month").

- **Optical inter-drone links** at 10 Mbps over ranges up to 100 km. This enables distributed situational awareness — a Type-I drone that identifies a problem can directly summon a Type-R drone without routing through the relay network.

- **Store-and-forward architecture.** Drones batch telemetry and upload during scheduled contact windows with sector relay nodes.

### 5.5 Autonomy and Software Architecture

This is the hardest subsystem and the one most likely to determine mission success or failure.

```
┌─────────────────────────────────────────────────────┐
│              DRONE SOFTWARE STACK                     │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │  LAYER 4: MISSION PLANNING                      │ │
│  │  • Task allocation (auction-based protocol)     │ │
│  │  • Route optimization                           │ │
│  │  • Fleet-level load balancing                   │ │
│  └─────────────────────────┬───────────────────────┘ │
│  ┌─────────────────────────▼───────────────────────┐ │
│  │  LAYER 3: BEHAVIOR EXECUTIVE                    │ │
│  │  • Finite state machine for mission phases      │ │
│  │  • Anomaly detection & response                 │ │
│  │  • Abort/safe-mode triggers                     │ │
│  └─────────────────────────┬───────────────────────┘ │
│  ┌─────────────────────────▼───────────────────────┐ │
│  │  LAYER 2: PERCEPTION & PLANNING                 │ │
│  │  • Panel health assessment (CNN inference)      │ │
│  │  • Grasp planning / tool path generation        │ │
│  │  • Collision avoidance                          │ │
│  └─────────────────────────┬───────────────────────┘ │
│  ┌─────────────────────────▼───────────────────────┐ │
│  │  LAYER 1: REAL-TIME CONTROL                     │ │
│  │  • GNC loop (100 Hz)                            │ │
│  │  • Power management                             │ │
│  │  • Thermal control                              │ │
│  │  • Actuator drivers                             │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
│  RTOS: seL4 microkernel (formally verified)          │
│  ML Runtime: TensorFlow Lite for Microcontrollers    │
└─────────────────────────────────────────────────────┘
```

**Task allocation protocol:** I recommend a **contract net / auction-based** system. When a Type-I drone identifies a fault, it broadcasts a "work order" with location, fault type, and urgency. Nearby Type-R or Type-T drones bid based on their current state (distance, consumables remaining, queue depth). The lowest-cost bidder wins. This is decentralized, robust to individual failures, and well-studied in multi-agent systems literature.

**Panel health assessment:** Each Type-I drone runs a convolutional neural network trained on panel imagery to classify:
- Micrometeorite impact damage (crater size, depth estimation)
- Delamination / thermal cycling cracks
- Electrical fault signatures (hot spots in LWIR)
- Attitude control anomalies (panel orientation vs. expected)

**Assumption:** The onboard 50 GFLOPS compute can run inference on a MobileNet-class model in <100 ms per image. Training happens on Earth with data downlinked from the fleet.

---

## 6. Operational Concept

### 6.1 Typical Inspection Cycle (Type-I)

```
TIME    ACTION
─────   ──────────────────────────────────────────────
T+0     Depart from loiter position near sector center
T+2h    Arrive at first assigned panel (ΔV ~2 m/s)
T+2h05  Station-keep at 5m distance, begin imaging
T+2h15  Complete multispectral scan (vis/NIR/LWIR)
T+2h16  Onboard ML classifies panel health: NOMINAL
T+2h17  Log result, transit to next panel
T+4h    Panel #2: ML classification: DEGRADED
        → Approach to 0.5m, detailed inspection
T+4h30  Diagnosis: 3mm micrometeorite crater on 
        power bus trace, partial open circuit
T+4h31  Severity: MINOR → Type-I can self-repair
T+4h35  Deploy sealant over crater, bridge trace 
        with conductive epoxy from dispenser
T+5h00  Verify repair: current flow restored
T+5h01  Log repair, transit to next panel
  ...
T+48h   Panel #23: ML classification: FAILED
        → Structural crack across 40% of panel
T+48h05 Severity: MAJOR → Issue work order for Type-R
T+48h06 Broadcast work order on inter-drone mesh
T+48h10 Type-R drone #R-0447 accepts contract
T+48h12 Continue to next panel
  ...
T+168h  Consumables low → return to depot for resupply
        (7-day patrol cycle, ~50 panels inspected)
```

### 6.2 Maintenance Rate Model

**Assumptions:**
- Panel failure rate: 0.5% per year require major repair (Type-R intervention)
- Panel degradation rate: 5% per year require minor repair (Type-I intervention)
- Panel retirement rate: 0.1% per year require towing (Type-T intervention)
- 10 million panels at full Phase 2 scale

**Annual workload:**
| Task | Rate | Annual Count | Time per Task | Total Drone-Hours/Year |
|---|---|---|---|---|
| Minor repair (Type-I) | 5% | 500,000 | 1 hour | 500,000 |
| Major repair (Type-R) | 0.5% | 50,000 | 8 hours | 400,000 |
| Panel tow (Type-T) | 0.1% | 10,000 | 24 hours | 240,000 |
| Routine inspection | 100% | 10,000,000 | 0.25 hours | 2,500,000 |

**Fleet sizing check (Type-I):**
- Total Type-I hours needed: 2,500,000 (inspection) + 500,000 (minor repair) = 3,000,000 hours/year
- Available hours per drone: 8,760 hours/year × 0.6 (utilization factor, accounting for transit, resupply, downtime) = 5,256 hours/year
- Drones needed: 3,000,000 / 5,256 = **~571 drones**

Wait — that's far fewer than my proposed 35,000. Let me reconcile.

**Revised analysis:** The above assumes drones can teleport between panels. In reality, transit time dominates. At the swarm scale, a sector of 10,000 panels might span 1,000 km × 1,000 km. Transit between adjacent panels at low thrust takes significant time.

**Transit time model:**
- Average inter-panel distance within a sector: ~10 km (assuming √(10,000) ≈ 100 panels per row, sector spanning ~1,000 km, so spacing ~10 km)
- Type-I thrust: 5 mN, mass 15 kg → acceleration: 0.33 mm/s²
- Time to traverse 10 km with flip-and-brake: t = 2×√(d/a) = 2×√(10,000/0.00033) = 2×5,508 s ≈ 3.06 hours

So transit between panels takes ~3 hours, and inspection takes ~0.25 hours. The duty cycle is dominated by transit. Effective panel throughput: 1 panel per 3.25 hours.

**Revised fleet sizing (Type-I):**
- Panels to inspect per year: 10,000,000
- Inspection cadence: every panel inspected once per quarter → 40,000,000 inspection-visits/year
- Hours per visit (including transit): 3.25 hours
- Total hours: 130,000,000 hours/year
- Per drone: 5,256 available hours/year
- **Drones needed: ~24,700**

Adding margin for minor repairs (500,000 × 4.25 hours = 2,125,000 hours → ~400 more drones) and fleet attrition reserve (20%):

**Type-I fleet size: ~30,000 drones** (I'll round to 35,000 for 15% operational reserve beyond attrition).

This validates the original estimate. Transit time is the killer — this is why I want the drones distributed within sectors rather than dispatched from central depots.

**Similar analysis for Type-R:** 50,000 major repairs × (8 hours repair + 6 hours average transit) = 700,000 hours. At 5,256 hours/drone/year → ~133 drones needed. With 10× margin for surge capacity and geographic distribution: **~1,300 drones minimum.** I propose 12,000 to ensure every sector has multiple Type-R drones on station (12 per sector × 1,000 sectors). The excess capacity is intentional — Type-R drones are the bottleneck for swarm health, and we want zero queue time for critical repairs.

**Type-T:** 10,000 tows × 30 hours average = 300,000 hours → ~57 drones minimum. Propose 3,000 (3 per sector) for geographic coverage and surge capacity.

---

## 7. Depot Infrastructure

Drones need periodic resupply of propellant and consumables. I propose **depot stations** co-located with the swarm, one per ~10 sectors (i.e., ~100 depots at full scale).

```
         ┌─────────────────────────────────┐
         │         DEPOT STATION            │
         │                                  │
         │  ┌───────────┐  ┌────────────┐  │
         │  │  Xenon     │  │ Consumables│  │
         │  │  Storage   │  │ Magazine   │  │
         │  │  (500 kg)  │  │ (sealant,  │  │
         │  │            │  │  spares,   │  │
         │  │            │  │  wire)     │  │
         │  └─────┬─────┘  └─────┬──────┘  │
         │        │              │          │
         │  ┌─────▼──────────────▼──────┐  │
         │  │   AUTOMATED SERVICING     │  │
         │  │   BAY (4 berths)          │  │
         │  │                           │  │
         │  │   ┌───┐ ┌───┐ ┌───┐ ┌───┐│  │
         │  │   │ D │ │ D │ │ D │ │ D ││  │
         │  │   │ 1 │ │ 2 │ │ 3 │ │ 4 ││  │
         │  │   └───┘ └───┘ └───┘ └───┘│  │
         │  │                           │  │
         │  └───────────────────────────┘  │
         │                                  │
         │  ┌───────────────────────────┐  │
         │  │  Solar Arrays (50 m²)     │  │
         │  │  Power: ~22 kW at 1 AU    │  │
         │  └───────────────────────────┘  │
         │                                  │
         │  Mass: ~2,000 kg                │
         │  Resupply: every 2 years from   │
         │  ISRU facility                  │
         └─────────────────────────────────┘
```

**Servicing time per drone:** ~4 hours (propellant transfer, consumables reload, diagnostic check, software update).

**Depot throughput:** 4 berths × 6 services/day = 24 drones/day. Each depot serves ~500 drones (50 drones/sector × 10 sectors). With 6-month resupply cycles, each drone visits twice per year → 1,000 visits/year → ~3 visits/day average. 24 capacity vs. 3 average = comfortable margin for surge.

---

## 8. Manufacturing Considerations

### 8.1 ISRU Integration

At Phase 2 scale, launching 50,000 drones from Earth is impractical. Total fleet mass:

| Type | Count | Unit Mass | Total Mass |
|---|---|---|---|
| Type-I | 35,000 | 15 kg | 525 tonnes |
| Type-R | 12,000 | 85 kg | 1,020 tonnes |
| Type-T | 3,000 | 350 kg | 1,050 tonnes |
| Depots | 100 | 2,000 kg | 200 tonnes |
| **Total** | | | **2,795 tonnes** |

Plus annual replacement (assuming 10% attrition): ~280 tonnes/year of new drones.

**Assumption:** Phase 2 ISRU facilities (asteroid mining + in-space manufacturing) can produce structural aluminum, silicon solar cells, and basic electronics. However, certain components must be supplied from Earth or advanced manufacturing facilities:

**ISRU-manufacturable (~70% of mass):**
- Structural frames (aluminum-lithium alloy)
- Solar cell substrates (silicon — lower efficiency than GaAs but ISRU-compatible)
- Wiring harnesses
- Propellant tanks
- Thermal blankets (aluminized polymer)

**Earth-supplied (~30% of mass):**
- Radiation-hardened processors
- Ion engine grids and cathodes
- High-efficiency GaAs solar cells (if silicon insufficient)
- Optical sensors and lenses
- Reaction wheels (precision bearings)
- Battery cells

**Manufacturing approach:** Modular design with standardized interfaces. ISRU facilities produce structural "bus" modules. Earth-supplied "brain" modules (compute, sensors, comms) are shipped and integrated in-situ. This reduces Earth-launch mass to ~840 tonnes for the initial fleet — still substantial but within Phase 2 launch infrastructure capability.

### 8.2 Design for Manufacturability

- **Maximum 500 unique parts** per drone type (target: 200 for Type-I)
- **Snap-fit and bolted connections** — no welding during assembly
- **Standardized connectors** across all three types (power, data, propellant)
- **Modular replacement units (MRUs):** Every subsystem is a swappable box. A Type-R drone can replace its own failed reaction wheel by swapping the MRU at a depot.

---

## 9. Development Roadmap

```
YEAR  MILESTONE
────  ─────────────────────────────────────────────────────
 1    ├─ Requirements freeze, preliminary design review (PDR)
      ├─ Autonomy software development begins (simulation)
      ├─ Ion engine qualification testing (existing COTS engines)
      └─ Panel interface standard defined (critical path!)

 2    ├─ Critical design review (CDR) for Type-I
      ├─ Type-I prototype fabrication (5 units)
      ├─ Autonomy software v1.0: basic inspection + navigation
      └─ Depot station PDR

 3    ├─ Type-I prototype testing in LEO (ISS vicinity)
      │   → Validate proximity ops, inspection, micro-repair
      ├─ Type-R CDR
      ├─ Type-R prototype fabrication (3 units)
      └─ Autonomy software v2.0: multi-agent coordination

 4    ├─ Type-I LEO test results → design iteration
      ├─ Type-R LEO testing
      ├─ Type-T CDR + prototype (2 units)
      ├─ Depot station CDR
      └─ ISRU manufacturing process qualification begins

 5    ├─ INTEGRATED FLEET TEST: 10× Type-I, 3× Type-R, 1× Type-T
      │   → Deploy to early Phase 2 swarm panels
      │   → 6-month operational demonstration
      ├─ Depot station prototype deployment
      └─ ISRU production line commissioning

 6    ├─ Full-rate production begins
      ├─ 5,000 drones/year production rate target
      └─ Autonomy software v3.0: full fleet management

 7-10 ├─ Ramp to 15,000 drones/year
      ├─ Fleet reaches 50,000 operational drones
      └─ Continuous improvement cycle (annual design updates)
```

### Technology Readiness Assessment

| Subsystem | Current TRL | Required TRL | Gap |
|---|---|---|---|
| Ion propulsion (5 mN class) | 9 | 9 | None — flight heritage (Dawn, Hayabusa2) |
| Solar arrays (triple-junction) | 9 | 9 | None |
| Star trackers | 9 | 9 | None |
| LIDAR proximity sensors | 7 | 9 | Miniaturization for 15 kg platform |
| Robotic manipulators (space) | 6 | 9 | Significant — miniaturization + autonomy |
| Autonomous inspection ML | 5 | 8 | Training data, space qualification |
| Multi-agent task allocation | 4 | 8 | Significant — scale validation |
| ISRU drone manufacturing | 3 | 7 | Major — process development needed |
| Optical inter-drone comms | 6 | 8 | Moderate — miniaturization |
| In-space sealant/repair materials | 4 | 7 | Significant — space qualification |

**Critical technology gaps:** Autonomous manipulation and multi-agent coordination at scale are the two highest-risk items. I recommend parallel investment in ground-based testbeds (simulated microgravity + vacuum) starting in Year 1.

---

## 10. Cost Analysis

### 10.1 Unit Cost Targets

**Assumption:** At production volumes of 10,000+/year, significant learning curve and economies of scale apply. I use an 85% learning curve (each doubling of cumulative production reduces unit cost by 15%).

| Item | Prototype Cost | 1,000th Unit | 10,000th Unit | Target at Scale |
|---|---|---|---|---|
| Type-I drone | $2.5M | $800K | $350K | **$150K** |
| Type-R drone | $8M | $2.5M | $1.1M | **$500K** |
| Type-T drone | $15M | $5M | $2.2M | **$1M** |
| Depot station | $50M | $15M | — | **$8M** |

*These costs assume partial ISRU manufacturing. Earth-manufactured equivalents would be ~3× higher.*

### 10.2 Total Program Cost (Phase 2 Maintenance Drone Fleet)

| Category | Cost (USD, 2025) |
|---|---|
| **Development (Years 1-5)** | |
| Design & engineering (150 FTE × 5 years) | $375M |
| Prototype fabrication & testing | $200M |
| Autonomy software development | $150M |
| LEO test campaigns (launch + ops) | $300M |
| Ground test infrastructure | $100M |
| **Subtotal Development** | **$1.125B** |
| | |
| **Production (Years 5-15)** | |
| 35,000 × Type-I @ $150K | $5.25B |
| 12,000 × Type-R @ $500K | $6.0B |
| 3,000 × Type-T @ $1M | $3.0B |
| 100 × Depot stations @ $8M | $0.8B |
| ISRU manufacturing facility (amortized share) | $2.0B |
| **Subtotal Production** | **$17.05B** |
| | |
| **Operations (Years 5-20)** | |
| Fleet management software & updates | $500M |
| Earth-supplied replacement components | $2.0B |
| Mission operations center | $300M |
| **Subtotal Operations** | **$2.8B** |
| | |
| **Contingency (25%)** | **$5.24B** |
| | |
| **TOTAL PROGRAM COST** | **$26.2B** |

**Cost per panel maintained per year:** $26.2B / (10M panels × 15 years) = **~$175 per panel per year.** If each panel generates ~500 kW, that's $0.35/kW/year for maintenance — negligible compared to panel construction cost.

### 10.3 Cost Sensitivity

The dominant cost driver is **production volume and learning curve.** If ISRU manufacturing underperforms and we must Earth-manufacture 50% of drone mass instead of 30%, total production cost increases by ~$8B. If the learning curve is 90% instead of 85%, unit costs are ~40% higher at scale, adding ~$6B.

---

## 11. Risk Assessment

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | Autonomous manipulation fails to achieve required reliability (>95% repair success rate) | Medium | Critical | Extensive ground testing; design panels for easy repair (large connectors, modular components); allow human-in-the-loop teleop for complex repairs via relay network |
| R2 | Multi-agent coordination breaks down at scale (>10,000 drones) | Medium | High | Hierarchical architecture limits interaction scope; extensive simulation before deployment; graceful degradation (drones revert to independent patrol if comms lost) |
| R3 | Micrometeorite damage rate higher than modeled | Low | High | Fleet can be scaled up; Type-I drones can be redeployed from inspection to repair; accept higher panel replacement rate |
| R4 | ISRU manufacturing quality insufficient for drone components | Medium | High | Maintain Earth-supply chain as backup; design for mixed sourcing; extensive quality testing of ISRU-produced parts |
| R5 | Solar array degradation of drones themselves | Low | Medium | Drones service each other; depot stations can replace drone solar panels; design for 5-year array life with margin |
| R6 | Cascading collision (Kessler-like syndrome in swarm) | Low | Critical | Type-T drones prioritize debris removal; all drones have collision avoidance; sector-level traffic management; emergency "scatter" protocol |
| R7 | Software vulnerability / fleet-wide bug | Medium | Critical | Formal verification of safety-critical code (seL4 kernel); staged software rollouts (10% of fleet first); hardware watchdog timers force safe mode on software hang |
| R8 | Xenon/krypton supply chain disruption | Low | Medium | Stockpile 2-year supply at depots; investigate alternative propellants (iodine — solid storage, lower Isp but simpler) |

### Risk #6 Deep Dive: Cascading Collision

This is the existential risk for the maintenance fleet. With 50,000 drones and 10 million panels in a relatively confined orbital volume, collision probability is non-trivial.

**Collision probability estimate:**
- Swarm volume (rough): torus at 0.5 AU, cross-section 10,000 km × 10,000 km = 10^8 km² area, 100 km depth → 10^10 km³
- Object density: (10M panels + 50K drones) / 10^10 km³ ≈ 10^-3 objects/km³
- Mean free path: very large — collision probability between any two objects is extremely low in absolute terms
- **However:** During proximity operations (drone within 100 m of panel), collision risk is dominated by operational errors, not random encounters

**Mitigation:** Every drone maintains a 50 m exclusion zone around itself (enforced by collision avoidance system). During proximity ops, the drone "claims" the panel and broadcasts an exclusion zone. Other drones route around.

---

## 12. Open Engineering Questions

These are the issues I cannot resolve at the proposal stage and require dedicated trade studies:

1. **Panel interface standardization.** What physical and electrical interfaces do panels present for drone servicing? This must be co-designed with the panel team. I propose a universal docking port (mechanical + power + data) on every panel, but this adds mass and cost to 10 million panels. The alternative — drones that can work with arbitrary panel surfaces — is much harder.

2. **Xenon vs. krypton vs. iodine propellant.** Xenon is proven but expensive and scarce. Krypton is cheaper but lower performance. Iodine is solid-storage (huge advantage for depots) but corrosive and lower TRL for ion engines. Recommend a trade study in Year 1.

3. **Silicon vs. GaAs solar cells for drones.** ISRU can produce silicon cells (~18% efficiency) but not GaAs (~32%). Silicon cells require 1.8× the array area for equivalent power, increasing drone size and drag (solar radiation pressure). Is the ISRU benefit worth the performance penalty?

4. **Drone self-repair and mutual repair.** Can Type-R drones service other drones, not just panels? If yes, the fleet becomes partially self-sustaining. This requires drones to have the same modular interfaces as panels — a significant design constraint but potentially transformative for fleet longevity.

5. **Optimal inspection cadence.** I assumed quarterly inspection of every panel. Is this too frequent? Too infrequent? The answer depends on actual degradation rates, which we won't know until early Phase 2 operations. The fleet should be designed to operate at 2× or 0.5× the baseline cadence.

6. **Swarm orbit mechanics.** Panels at different heliocentric distances orbit at different velocities (Kepler's laws). A drone assigned to a sector must match the sector's orbital velocity. Transferring between sectors at different radii requires significant ΔV. Should drones be permanently assigned to a radial band, or should they be able to transfer? This affects fleet flexibility vs. propellant budget.

7. **Radiation environment.** At 0.3–0.5 AU, the radiation environment (solar protons, heavy ions) is significantly harsher than at 1 AU. What is the total ionizing dose (TID) over a 5-year drone lifetime? Preliminary estimate: ~50–200 krad depending on shielding. This drives processor selection (rad-hard vs. COTS with shielding).

8. **Thermal design at 0.3 AU.** Equilibrium temperature of an unshielded surface at 0.3 AU: T = (S/(4σ))^0.25 where S = 1361/0.09 ≈ 15,122 W/m². For a surface with absorptivity 0.3 and emissivity 0.9: T = ((0.3 × 15,122)/(0.9 × 4 × 5.67×10⁻⁸))^0.25 ≈ 390 K (117°C). This is manageable but requires careful thermal design. Active cooling may be needed for electronics.

9. **End-of-life disposal.** When a drone reaches end of life, what happens? Options: (a) tow to recycling facility (costs Type-T drone time), (b) de-orbit into the sun (simple but wasteful), (c) park in a "graveyard" orbit. I favor (a) for material recovery, but this adds ~3,000 tow operations/year to the Type-T workload.

10. **Human servicing.** Should the architecture accommodate occasional crewed servicing missions? If so, drones need to be safe for human proximity operations (collision avoidance must be human-rated). I recommend designing for this capability even if crewed missions are rare — it provides a critical fallback for scenarios the autonomous fleet cannot handle.

---

## 13. Conclusion and Recommendation

The maintenance drone fleet is not optional — it is **load-bearing infrastructure** without which the Dyson swarm degrades faster than it can be built. At a 5% annual minor-failure rate and 0.5% major-failure rate, an unserviced swarm of 10 million panels loses ~550,000 panels/year to degradation. If panel production is 1 million/year, nearly half of production goes to replacing preventable losses.

The proposed three-tier fleet of 50,000 drones, supported by 100 depot stations, can maintain the swarm at >98% operational capacity for a total program cost of ~$26B over 20 years — roughly **1-2% of the total Phase 2 swarm construction cost** (estimated at $1-2 trillion).

**My strongest recommendation:** Begin the panel interface standardization effort immediately. Every month of delay on this decision propagates through both the panel design and the drone design. The interface standard is the single most important technical decision for the maintenance architecture.

**Second recommendation:** Fund the autonomy software development as a separate, parallel workstream starting now. The software is the highest-risk, longest-lead-time element. Hardware can be iterated quickly; reliable autonomous manipulation in unstructured environments cannot.

---

*End of proposal. Technical questions and review comments should be directed to the Swarm Infrastructure Engineering Division.*