---
bomId: "bom-1-7"
itemName: "Swarm Control System"
itemSlug: "swarm-control-system"
modelId: "claude-opus-4-6"
modelName: "Claude Opus 4.6"
generated: "2026-02-07"
phase: "phase-1"
---



# Swarm Control System — Technical Proposal
## Project Dyson · Phase 1: Initial Swarm Deployment

**Author:** Swarm Control Systems Lead
**Revision:** 1.0
**Date:** 2025-06-30

---

## 1. Executive Summary

The Swarm Control System (SCS) is the distributed nervous system of the Dyson swarm. It is responsible for station-keeping, collision avoidance, formation management, power-beam pointing, and graceful degradation across what will eventually be trillions of individual collector elements. In Phase 1, we are deploying the first **10,000 collector satellites** ("petals") into a partial shell at 1 AU, and the SCS must be designed from day one to scale to 10^12+ elements without architectural redesign.

**My core thesis:** The SCS must be a fully decentralized, bio-inspired system with no single point of failure. Centralized control of a Dyson swarm is physically impossible at scale — light-travel time across a 2-AU-diameter structure is ~16 minutes. We must embrace locality, emergent behavior, and hierarchical autonomy.

---

## 2. Design Philosophy

### 2.1 Guiding Principles

1. **Radical Decentralization** — Every petal is autonomous. No ground station, no mothership, no central controller is required for safe operation.
2. **Scale Invariance** — The architecture that controls 10,000 petals must control 10^12 petals with zero architectural changes, only parameter tuning.
3. **Graceful Degradation** — Loss of 30% of petals in any region must not cascade. Loss of all inter-petal communication must result in safe autonomous station-keeping, not collision.
4. **Simplicity at the Edge** — Each petal's onboard controller must be radiation-hardened, low-power, and simple. Complexity emerges from interaction, not from individual sophistication.
5. **Physics-First Control** — We exploit orbital mechanics as a free control input. Solar radiation pressure is both the primary disturbance AND the primary actuator.

### 2.2 Rejected Alternatives

| Approach | Why Rejected |
|---|---|
| Centralized ground control | 16-min light-time across swarm; single point of failure; bandwidth impossible at scale |
| Rigid formation flying (e.g., GPS-like) | Requires global state knowledge; O(n²) communication; brittle |
| Fully independent petals (no coordination) | Cannot optimize power beaming; collision risk unmanageable |
| Blockchain consensus | Latency incompatible with real-time collision avoidance; energy waste |

---

## 3. System Architecture

### 3.1 Hierarchical Organization

```
┌─────────────────────────────────────────────────────────────────┐
│                    SWARM CONTROL HIERARCHY                       │
│                                                                  │
│  Level 4: SWARM BRAIN (optional, advisory only)                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Earth/Habitat-based mission planning & optimization     │    │
│  │  Latency: minutes-hours │ Authority: advisory/strategic  │    │
│  └──────────────────────┬──────────────────────────────────┘    │
│                         │ (low-bandwidth uplink)                 │
│  Level 3: SECTOR COORDINATORS (~100 petals each)                │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                 │
│  │ SC-1 │ │ SC-2 │ │ SC-3 │ │ SC-4 │ │ ...  │                 │
│  └──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘ └──────┘                 │
│     │        │        │        │                                 │
│  Level 2: NEIGHBORHOOD CLUSTERS (~10 petals each)               │
│  ┌──┴──┐ ┌──┴──┐ ┌──┴──┐ ┌──┴──┐                              │
│  │NC-1a│ │NC-1b│ │NC-2a│ │ ... │                               │
│  └──┬──┘ └──┬──┘ └──┬──┘ └─────┘                               │
│     │       │       │                                            │
│  Level 1: INDIVIDUAL PETALS (autonomous agents)                  │
│  ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ●                     │
│  Each petal: fully autonomous station-keeping + collision avoid. │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Level Descriptions

**Level 1 — Individual Petal Controller (IPC)**
- Runs on each of the 10,000 Phase 1 petals
- Handles: attitude control, station-keeping, collision avoidance, power management, health monitoring
- Decision latency: <100 ms for collision avoidance, <10 s for station-keeping
- Communicates only with neighbors within ~100 km (Phase 1 inter-petal spacing)
- **This is the critical system. Everything above is optimization.**

**Level 2 — Neighborhood Cluster (NC)**
- Emergent grouping of ~10 nearest petals
- One petal per cluster elected as NC coordinator (role rotates)
- Handles: local formation optimization, coordinated maneuvers, mutual ranging
- Decision latency: 1–60 seconds

**Level 3 — Sector Coordinator (SC)**
- One petal per ~100 elected as SC
- Handles: sector-wide formation planning, power-beam scheduling, bulk orbit corrections
- Aggregates health data for uplink
- Decision latency: minutes

**Level 4 — Swarm Brain (SB)**
- Earth/habitat-based computing cluster
- Handles: long-term orbit propagation, mission planning, new petal deployment scheduling, science optimization
- **Advisory only** — petals can and must operate indefinitely without it
- Decision latency: hours to days

### 3.3 Phase 1 Deployment Geometry

**Assumption:** Phase 1 petals are deployed into a partial ring at 1 AU from the Sun, in the ecliptic plane, co-orbital with Earth but leading/trailing by 30–60° to avoid Earth's gravitational influence.

```
                          ☀ Sun
                          │
                     1 AU │
                          │
        ┌─────────────────┼─────────────────┐
       /    Phase 1       │                  \
      /   Swarm Arc       │                   \
     /   (60° sector)     │                    \
    ●●●●●●●●●●●●●●●●●●●  │                     \
   /  10,000 petals       │                      \
  /   ~100 km spacing     │                       \
 /                        │                     🌍 Earth
```

**Key numbers:**
- Arc length: 60° of orbit at 1 AU = ~1.57 × 10^8 km
- 10,000 petals at ~100 km mean spacing → occupies ~10^6 km of arc
- Actual occupied arc: ~0.4° (very sparse in Phase 1)
- Light-travel time across Phase 1 swarm: ~3.3 seconds
- This is manageable for Level 3 coordination

---

## 4. Subsystem Breakdown

### 4.1 Individual Petal Controller (IPC) — The Core System

```
┌─────────────────────────────────────────────────────────┐
│              INDIVIDUAL PETAL CONTROLLER                  │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │ SENSORS  │  │ COMPUTE  │  │ ACTUATORS             │  │
│  │          │  │          │  │                        │  │
│  │• Sun     │  │• Main    │  │• SRP vanes (4x)       │  │
│  │  sensor  │→│  CPU     │→│• Reaction wheels (3x)  │  │
│  │• Star    │  │• Watchdog│  │• Cold-gas thruster     │  │
│  │  tracker │  │• FPGA    │  │  (backup only)         │  │
│  │• LIDAR   │  │  co-proc │  │• Reflector tilt        │  │
│  │  (prox)  │  │          │  │  actuators             │  │
│  │• IMU     │  │          │  │                        │  │
│  │• Ranging │  │          │  │                        │  │
│  │  radio   │  │          │  │                        │  │
│  └──────────┘  └──────────┘  └──────────────────────┘  │
│                     │                                    │
│  ┌──────────────────┴───────────────────────────────┐   │
│  │              COMMUNICATION                        │   │
│  │  • Laser comm (inter-petal, 100 km range)        │   │
│  │  • RF comm (backup, omnidirectional)              │   │
│  │  • RF uplink/downlink (to Swarm Brain)            │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │              SOFTWARE STACK                        │   │
│  │  ┌─────────────────────────────────────────────┐ │   │
│  │  │ L3: Mission Logic (formation, power-beam)   │ │   │
│  │  ├─────────────────────────────────────────────┤ │   │
│  │  │ L2: Navigation & Guidance (orbit det/maint) │ │   │
│  │  ├─────────────────────────────────────────────┤ │   │
│  │  │ L1: Collision Avoidance (HIGHEST PRIORITY)  │ │   │
│  │  ├─────────────────────────────────────────────┤ │   │
│  │  │ L0: RTOS + Hardware Abstraction             │ │   │
│  │  └─────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Sensor Suite

| Sensor | Purpose | Specification | Mass | Power |
|--------|---------|---------------|------|-------|
| Sun sensor (coarse) | Attitude reference, SRP calibration | ±0.1° accuracy, hemispherical FOV | 50 g | 0.1 W |
| Star tracker | Precision attitude determination | ±5 arcsec, 2 Hz update | 300 g | 1.5 W |
| Scanning LIDAR | Proximity detection, collision avoidance | 200 km range, 10 cm precision | 800 g | 5 W (pulsed) |
| MEMS IMU | High-rate attitude propagation | Gyro bias stability 0.1°/hr | 100 g | 0.5 W |
| Inter-petal ranging radio | Relative position determination | 1 cm precision at 100 km via two-way TOF | 200 g | 2 W |
| Accelerometer | SRP force measurement | 10^-9 m/s² sensitivity | 50 g | 0.2 W |

**Total sensor mass:** ~1.5 kg
**Total sensor power:** ~9.3 W (peak), ~4 W (nominal)

### 4.3 Compute System

**My strong recommendation:** Use a radiation-hardened RISC-V processor with an FPGA co-processor. The FPGA handles real-time collision avoidance and sensor fusion; the CPU handles navigation, communication protocols, and mission logic.

| Component | Specification | Mass | Power |
|-----------|---------------|------|-------|
| Main CPU | Rad-hard RISC-V, 400 MHz, 256 MB ECC RAM | 150 g | 3 W |
| FPGA co-processor | Rad-hard, ~50k LUTs, sensor fusion + collision avoidance | 100 g | 2 W |
| Watchdog/safe-mode controller | Simple rad-hard microcontroller (ARM Cortex-M0 class) | 30 g | 0.1 W |
| Non-volatile storage | 16 GB rad-hard flash (telemetry, ephemeris, software updates) | 50 g | 0.5 W |

**Total compute mass:** ~330 g
**Total compute power:** ~5.6 W

**Assumption:** At 1 AU, radiation environment is dominated by solar proton events and galactic cosmic rays. Total ionizing dose ~10 krad/year behind 2 mm Al shielding. We specify 100 krad TID tolerance for 20-year life.

### 4.4 Actuator Suite

**Primary actuation: Solar Radiation Pressure (SRP) vanes**

This is the key design decision. At 1 AU, solar radiation pressure is ~4.56 × 10^-6 N/m². For a petal with 100 m² collection area and ~50 kg mass, SRP provides:

- Force: ~4.56 × 10^-4 N
- Acceleration: ~9.1 × 10^-6 m/s² = ~0.79 m/s/day

This is ample for station-keeping. By tilting reflective vanes, we can vector this force for orbit maintenance without propellant.

| Actuator | Purpose | Specification | Mass | Power |
|----------|---------|---------------|------|-------|
| SRP vanes (4x) | Primary station-keeping, orbit control | 1 m² each, reflective, ±45° tilt | 4 × 200 g = 800 g | 4 × 0.5 W = 2 W |
| Reaction wheels (3x) | Attitude control | 0.01 N·m·s momentum, 0.001 N·m torque | 3 × 300 g = 900 g | 3 × 1 W = 3 W |
| Cold-gas thruster | Emergency collision avoidance, desaturation | 0.1 N thrust, 5 m/s total ΔV, N₂ propellant | 2 kg (incl. propellant) | 1 W (valve) |

**Total actuator mass:** ~3.7 kg
**Total actuator power:** ~6 W

**ΔV Budget (annual):**
- Station-keeping (SRP-based): ~0 propellant (continuous SRP)
- Collision avoidance maneuvers: ~0.5 m/s/year (estimated 5 events/year × 0.1 m/s each)
- Reaction wheel desaturation: ~0.1 m/s/year
- **Total propulsive ΔV needed:** ~0.6 m/s/year
- **Cold-gas reserve:** 5 m/s → ~8 years of backup propulsive capability
- After cold-gas depletion, SRP-only operation continues indefinitely

### 4.5 Communication System

```
COMMUNICATION ARCHITECTURE (Phase 1)

  Petal ←──laser──→ Petal ←──laser──→ Petal ←──laser──→ ...
    │                  │                  │
    │ (RF backup)      │                  │
    ├──────RF──────────┤                  │
    │                                     │
    └──────────── RF (X-band) ────────────┘──→ Earth/Habitat
                                                (Swarm Brain)
```

| Link | Technology | Data Rate | Range | Mass | Power |
|------|-----------|-----------|-------|------|-------|
| Inter-petal primary | 1550 nm laser comm | 1 Mbps | 200 km | 400 g | 3 W |
| Inter-petal backup | UHF radio (400 MHz) | 10 kbps | 500 km | 200 g | 2 W |
| Swarm-to-Earth | X-band (8 GHz), shared via relay chain | 100 kbps aggregate | 1 AU | 500 g (per petal contribution) | 5 W |

**Total comm mass:** ~1.1 kg
**Total comm power:** ~10 W (peak), ~5 W (nominal)

**Communication protocol:** Delay-tolerant networking (DTN) with store-and-forward. Each petal acts as a router. Messages propagate through the swarm via epidemic routing for broadcasts, and shortest-path for directed messages.

**Bandwidth analysis for Phase 1:**
- Each petal generates ~1 kbps of telemetry
- Neighbor state exchange: ~10 kbps per petal (position, velocity, health, 10 neighbors × 1 kbps)
- Sector coordination: ~1 kbps overhead
- **Total per-petal bandwidth need:** ~12 kbps ≪ 1 Mbps laser capacity
- **Margin:** ~80× — critical for scaling to Phase 2+

### 4.6 IPC Mass & Power Budget Summary

| Subsystem | Mass (kg) | Power - Nominal (W) | Power - Peak (W) |
|-----------|-----------|---------------------|-------------------|
| Sensors | 1.5 | 4.0 | 9.3 |
| Compute | 0.33 | 5.6 | 5.6 |
| Actuators | 3.7 | 4.0 | 6.0 |
| Communications | 1.1 | 5.0 | 10.0 |
| Harness, structure, thermal | 1.5 | — | — |
| **TOTAL IPC** | **8.13** | **18.6** | **30.9** |

**Assumption:** Each petal has ~100 m² of solar collector area generating ~13.6 kW at 1 AU (assuming 10% efficiency for the energy-harvesting portion). The IPC's 30.9 W peak is <0.3% of petal power — negligible.

---

## 5. Control Algorithms

### 5.1 Station-Keeping: Boids-Inspired Swarm Control

I propose adapting Reynolds' Boids algorithm for orbital mechanics. Each petal follows three simple rules:

1. **Separation:** Maintain minimum distance from all neighbors (>10 km)
2. **Alignment:** Match orbital elements with neighborhood mean
3. **Cohesion:** Drift toward sector-assigned position

```
BOIDS CONTROL LAW (simplified)

For each petal i at time t:

  Desired acceleration = w₁ · a_separation(i,t)
                       + w₂ · a_alignment(i,t)
                       + w₃ · a_cohesion(i,t)
                       + w₄ · a_collision_avoid(i,t)   ← HIGHEST PRIORITY
                       + w₅ · a_station_keep(i,t)

Where:
  a_separation = Σ (r_i - r_j) / |r_i - r_j|³   for all j within 50 km
  a_alignment  = (v̄_neighbors - v_i) / τ_align
  a_cohesion   = (r̄_target - r_i) / τ_cohesion
  a_collision   = EMERGENCY OVERRIDE if any neighbor within 1 km
  a_station_keep = Keplerian correction to maintain assigned orbital slot

Weights: w₄ >> w₁ > w₂ > w₃ > w₅
         (safety > separation > alignment > cohesion > mission)
```

**Why Boids?**
- Proven to produce stable, scalable emergent formations
- Each agent needs only local information (neighbors within ~100 km)
- Computational cost: O(k) per petal where k = number of neighbors (~10-50)
- Naturally resilient to petal loss
- Well-studied mathematically; stability proofs exist for simplified cases

### 5.2 Collision Avoidance

This is the **safety-critical** subsystem. It operates on the FPGA for deterministic, low-latency response.

**Collision avoidance zones:**

```
                    PETAL COLLISION ZONES

     ┌─────────────────────────────────────────┐
     │         ZONE 3: AWARENESS (200 km)       │
     │    Track all objects. Update every 60s.   │
     │  ┌─────────────────────────────────────┐ │
     │  │     ZONE 2: CAUTION (10 km)         │ │
     │  │  Active monitoring. Update every 1s. │ │
     │  │  Begin computing avoidance maneuver. │ │
     │  │  ┌─────────────────────────────────┐ │ │
     │  │  │   ZONE 1: DANGER (1 km)         │ │ │
     │  │  │  EXECUTE AVOIDANCE IMMEDIATELY   │ │ │
     │  │  │  Cold-gas thruster authorized.   │ │ │
     │  │  │  ┌───────────────────────────┐   │ │ │
     │  │  │  │ ZONE 0: IMPACT (<100 m)   │   │ │ │
     │  │  │  │ Emergency tumble to min    │   │ │ │
     │  │  │  │ cross-section. Broadcast   │   │ │ │
     │  │  │  │ MAYDAY to all neighbors.   │   │ │ │
     │  │  │  └───────────────────────────┘   │ │ │
     │  │  └─────────────────────────────────┘ │ │
     │  └─────────────────────────────────────┘ │
     └─────────────────────────────────────────┘
```

**Response times:**
- Zone 3 → Zone 2 transition: minutes to hours (orbital mechanics)
- Zone 2 → Zone 1 transition: seconds to minutes
- Zone 1 → Zone 0 transition: seconds
- **FPGA collision avoidance loop:** 10 ms cycle time
- **Cold-gas thruster activation:** <500 ms from decision

**Collision probability analysis (Phase 1):**
- 10,000 petals in ~10^6 km of arc
- Mean spacing: ~100 km
- Petal cross-section: ~10 m × 10 m = 100 m²
- Random collision probability per petal per year: negligibly small (~10^-15)
- **Primary collision risk:** deployment errors, failed petals drifting, debris
- Estimated collision avoidance maneuvers: ~5 per petal per year

### 5.3 Orbit Determination

Each petal determines its own orbit using:

1. **Sun sensor + star tracker** → inertial attitude → Sun direction vector
2. **Inter-petal ranging** → relative positions of ~10 neighbors
3. **Onboard orbit propagator** → Keplerian + SRP + J₂ perturbations (minimal at 1 AU heliocentric)
4. **Collaborative orbit determination** → Neighborhood shares measurements; each petal runs a distributed extended Kalman filter

**Expected position accuracy:** ~10 m (3σ) using collaborative ranging
**Expected velocity accuracy:** ~1 mm/s (3σ)

This is more than sufficient for 100-km-spacing station-keeping.

### 5.4 Formation Reconfiguration

When the Swarm Brain commands a formation change (e.g., to optimize power beaming geometry), the command propagates as a **goal state** rather than individual trajectories:

```
Swarm Brain → "New formation: ring at 1 AU, 58° arc, 95 km spacing"
                         │
                         ▼
Sector Coordinators decompose into sector goals
                         │
                         ▼
Neighborhood Clusters negotiate local assignments (auction algorithm)
                         │
                         ▼
Individual Petals compute and execute trajectories using SRP vanes
                         │
                         ▼
Convergence to new formation over days-weeks (SRP is slow but free)
```

**Estimated reconfiguration time:** 
- Small adjustment (±1 km): hours
- Major restructuring (new arc geometry): weeks to months
- This is acceptable — the swarm is a long-duration infrastructure

---

## 6. Communication Protocol Stack

### 6.1 Protocol Architecture

```
┌────────────────────────────────────────────┐
│  APPLICATION LAYER                          │
│  • Telemetry aggregation                    │
│  • Formation commands                       │
│  • Software updates (code dissemination)    │
├────────────────────────────────────────────┤
│  SWARM ROUTING LAYER                        │
│  • Epidemic broadcast (announcements)       │
│  • Greedy geographic routing (directed)     │
│  • Store-and-forward (DTN Bundle Protocol)  │
├────────────────────────────────────────────┤
│  NEIGHBOR DISCOVERY & MAINTENANCE           │
│  • Beacon broadcast every 10s (RF)          │
│  • Laser link establishment (handshake)     │
│  • Neighbor table: ID, position, velocity   │
├────────────────────────────────────────────┤
│  LINK LAYER                                 │
│  • Laser: point-to-point, 1 Mbps, LDPC FEC │
│  • RF: broadcast, 10 kbps, convolutional    │
├────────────────────────────────────────────┤
│  PHYSICAL LAYER                             │
│  • 1550 nm laser (inter-petal)              │
│  • 400 MHz UHF (backup/broadcast)           │
│  • 8 GHz X-band (Earth downlink)            │
└────────────────────────────────────────────┘
```

### 6.2 Critical Message Types

| Message | Priority | Latency Req. | Delivery | Size |
|---------|----------|-------------|----------|------|
| COLLISION_ALERT | CRITICAL | <100 ms | Broadcast to all within 200 km | 64 bytes |
| NEIGHBOR_STATE | HIGH | <1 s | Direct to neighbors | 128 bytes |
| HEALTH_REPORT | MEDIUM | <60 s | Aggregated upward to SC | 256 bytes |
| FORMATION_CMD | MEDIUM | <300 s | Flood from SC downward | 512 bytes |
| SOFTWARE_UPDATE | LOW | <24 hr | Epidemic dissemination | ~1 MB |
| SCIENCE_DATA | LOW | <1 hr | Routed to Earth relay | Variable |

### 6.3 Software Update Mechanism

Over a 20+ year mission, software updates are essential. I propose:

- **Code dissemination via epidemic protocol:** One petal receives update from Earth, shares with neighbors, propagates across swarm
- **Dual-bank flash:** Active bank + update bank. Atomic switchover after verification.
- **Rollback:** If updated petal fails health check within 1 hour, automatic rollback to previous version
- **Staged rollout:** Update 1% of petals first, monitor for 48 hours, then propagate to remaining 99%
- **Estimated full-swarm update time (Phase 1):** ~1 week

---

## 7. Autonomy Framework

### 7.1 Autonomy Levels (per ECSS-E-ST-70-11C adapted)

| Level | Description | Phase 1 Implementation |
|-------|-------------|----------------------|
| E1 | Execute pre-planned commands | Baseline for formation changes |
| E2 | Execute on-board event-driven operations | Collision avoidance, safe mode |
| E3 | Execute on-board autonomous operations | Station-keeping, neighbor management |
| E4 | Goal-oriented autonomous operations | **TARGET for Phase 1** — petals pursue formation goals autonomously |
| E5 | Full autonomy with self-modification | Phase 3+ (self-repair, self-replication) |

### 7.2 Safe Mode Hierarchy

```
NORMAL OPERATION
      │
      ▼ (anomaly detected)
SAFE MODE 1: Maintain attitude, cease non-essential operations
      │
      ▼ (attitude loss)
SAFE MODE 2: Sun-pointing using sun sensor only, spin stabilize
      │
      ▼ (power loss)
SAFE MODE 3: Minimum power, beacon-only RF, await rescue/recharge
      │
      ▼ (unrecoverable)
TERMINAL: Petal marked as debris, neighbors track and avoid
```

---

## 8. Manufacturing Considerations

### 8.1 IPC Production Requirements

- **Phase 1 quantity:** 10,000 units
- **Production rate target:** 100 units/month → 100-month (8.3 year) production run
- **Alternative aggressive schedule:** 500 units/month → 20-month production run

### 8.2 Design for Manufacturability

- **Modular PCB design:** Single main board + sensor daughter boards
- **Common connector standard:** All inter-board connections use a single radiation-hardened connector family
- **Automated testing:** Each IPC undergoes hardware-in-the-loop simulation before integration with petal
- **Standardized software image:** Identical firmware on all units; configuration via parameter upload post-deployment

### 8.3 Component Sourcing

| Component | Supplier Class | Lead Time | Risk |
|-----------|---------------|-----------|------|
| Rad-hard RISC-V CPU | Specialty (e.g., Cobham, Microchip) | 12-18 months | MEDIUM — limited suppliers |
| Rad-hard FPGA | Specialty (e.g., Microchip RTG4) | 12-18 months | MEDIUM |
| Star tracker | Space-grade (e.g., Terma, Ball) | 6-12 months | LOW |
| MEMS IMU | Modified COTS (e.g., Honeywell) | 3-6 months | LOW |
| Laser comm terminal | Custom development | 24-36 months | HIGH — TRL 5-6 |
| SRP vane actuators | Custom development | 18-24 months | MEDIUM |
| Cold-gas thruster | Space-grade COTS | 6-12 months | LOW |

### 8.4 In-Space Manufacturing (Phase 2+ Consideration)

The IPC design must be compatible with eventual in-space manufacturing:
- Minimize exotic materials
- Design for robotic assembly
- Standardize on materials available from asteroid mining (silicon, aluminum, iron)
- **Phase 1 IPCs are Earth-manufactured; Phase 2+ transitions to in-situ production**

---

## 9. Development Roadmap

### 9.1 Technology Readiness Assessment

| Subsystem | Current TRL | Target TRL for Phase 1 | Key Development Needed |
|-----------|-------------|----------------------|----------------------|
| Boids swarm control algorithm | 4 (lab demo) | 7 (space demo) | Multi-agent orbital testbed |
| SRP-based station-keeping | 5 (IKAROS heritage) | 7 | Dedicated SRP control demo mission |
| Inter-petal laser comm | 5 (LCRD heritage) | 7 | Miniaturization, cost reduction |
| Distributed orbit determination | 4 | 7 | Multi-satellite ranging demo |
| Rad-hard RISC-V | 5 | 7 | Flight qualification |
| Collision avoidance FPGA | 6 (LEO heritage) | 7 | Adaptation to heliocentric environment |
| DTN swarm networking | 5 (ISS demo heritage) | 7 | Scale testing |

### 9.2 Development Timeline

```
YEAR:  1       2       3       4       5       6       7       8
       │       │       │       │       │       │       │       │
ALG    ████████████████                                         
DEV    │ Swarm sim │ HIL test│                                  
       │ (10k agents)│        │                                  
       │       │       │       │                                
HW     │  ██████████████████████                                
DEV    │  │ Prototype │ Qual  │ Flight│                         
       │  │ IPC       │ Model │ Units │                         
       │       │       │       │       │                        
DEMO          ████████████████                                  
MISSION       │ 10-petal demo │                                 
              │ in LEO/HEO    │                                 
              │       │       │       │                         
PROD                  │  ██████████████████████████             
                      │  │ Production ramp │ Full rate│         
                      │       │       │       │       │        
DEPLOY                        │  ████████████████████████████   
                              │  │ Launch campaign │ Commission│
                              │       │       │       │       │
IOC                                                   ████████  
                                                      │ 10,000 │
                                                      │ petals  │
                                                      │ operational
```

**Key milestones:**
- **Year 1-2:** Algorithm development, 10,000-agent simulation validated
- **Year 2-3:** Prototype IPC hardware, hardware-in-the-loop testing
- **Year 2-4:** 10-petal demonstration mission (LEO or Sun-Earth L1)
- **Year 3-5:** Flight hardware qualification
- **Year 4-7:** Production of 10,000 IPCs
- **Year 5-8:** Launch campaign and deployment
- **Year 8:** Initial Operating Capability (IOC)

### 9.3 Demonstration Mission: "Swarm-10"

Before committing to 10,000 units, we must fly a 10-petal demonstration:

- **Orbit:** Sun-Earth L1 halo orbit (similar radiation/thermal environment to 1 AU heliocentric)
- **Duration:** 2 years
- **Objectives:**
  1. Validate Boids formation control in space
  2. Demonstrate SRP-based station-keeping
  3. Test inter-petal laser comm and ranging
  4. Validate collision avoidance system
  5. Test software update mechanism
  6. Characterize failure modes
- **Estimated cost:** $150-250M (10 petals + dedicated launch)
- **This mission is non-negotiable. We cannot risk 10,000 units on unvalidated control algorithms.**

---

## 10. Cost Analysis

### 10.1 IPC Unit Cost (at 10,000 unit production)

| Component | Unit Cost (USD) |
|-----------|----------------|
| Rad-hard CPU + FPGA + memory | $50,000 |
| Star tracker | $30,000 |
| LIDAR | $20,000 |
| IMU + sun sensor + accelerometer | $10,000 |
| Laser comm terminal | $40,000 |
| RF comm (UHF + X-band) | $15,000 |
| SRP vane actuators (4x) | $20,000 |
| Reaction wheels (3x) | $25,000 |
| Cold-gas thruster system | $15,000 |
| PCBs, harness, structure, thermal | $10,000 |
| Integration & test | $30,000 |
| **Total IPC unit cost** | **$265,000** |

**Assumption:** Aggressive cost reduction through volume production. Traditional space hardware at these specs would cost 3-5× more per unit. We assume dedicated production line, standardized design, and relaxed (but not eliminated) space qualification for non-safety-critical components.

### 10.2 Total SCS Development & Production Cost

| Item | Cost (USD) |
|------|-----------|
| Algorithm development & simulation (3 years, 20 FTE) | $30M |
| IPC hardware development & qualification | $50M |
| Swarm-10 demonstration mission | $200M |
| IPC production (10,000 × $265K) | $2,650M |
| Ground systems (Swarm Brain) | $30M |
| Integration, test, launch support | $200M |
| Program management, reserves (20%) | $632M |
| **TOTAL SCS COST** | **$3,792M** |

**Note:** This is the control system only. Petal structure, solar collectors, power beaming systems, and launch costs are separate line items.

### 10.3 Cost Reduction Path

- **Phase 2 (100,000 petals):** IPC unit cost drops to ~$100K through learning curve and COTS component maturation
- **Phase 3 (in-situ manufacturing):** IPC unit cost drops to ~$1K through asteroid-derived materials and robotic assembly
- **The $265K/unit Phase 1 cost is an investment in validating the architecture**

---

## 11. Risk Assessment

### 11.1 Risk Matrix

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **Cascade collision** — one failed petal causes chain of collisions | LOW | CRITICAL | Multi-zone collision avoidance; failed petals tracked as debris; minimum spacing enforced |
| **Communication network partition** — laser links fail across sector | MEDIUM | HIGH | RF backup; each petal autonomous without comm; DTN store-and-forward bridges gaps |
| **SRP actuator failure** — vane stuck, petal drifts | MEDIUM | MEDIUM | Cold-gas backup; neighbors track drifting petal; graceful retirement to graveyard orbit |
| **Software bug propagates** — bad update bricks swarm | LOW | CRITICAL | Staged rollout (1% → 99%); dual-bank flash with rollback; watchdog controller runs independent safe-mode code |
| **Radiation single-event upset** — CPU corruption | HIGH | LOW | ECC RAM; FPGA TMR; watchdog reboot; designed for ~1 SEU/day tolerance |
| **Swarm instability** — Boids algorithm diverges | LOW | HIGH | Extensive simulation (10^6+ Monte Carlo runs); conservative gain tuning; stability margins >6 dB |
| **Laser comm pointing failure** — can't establish links | MEDIUM | MEDIUM | RF backup always available; laser comm has ±1° acquisition FOV; neighbor table maintained via RF |
| **Supply chain disruption** — rad-hard chips unavailable | MEDIUM | HIGH | Dual-source all critical components; maintain 2-year strategic inventory; design for component substitution |

### 11.2 Failure Modes and Effects Analysis (Top-Level)

```
FAILURE MODE                    EFFECT                      DETECTION              RESPONSE
─────────────────────────────────────────────────────────────────────────────────────────────
IPC total failure               Petal becomes debris         Neighbors lose contact  Neighbors track & avoid
                                                                                     Swarm Brain notified

Star tracker failure            Degraded attitude knowledge  Onboard FDIR            Switch to sun sensor +
                                                                                     IMU propagation (coarse)

All comm failure                Petal isolated               Self-detected           Autonomous station-keep
                                                                                     using onboard ephemeris

SRP vane jam (1 of 4)           Reduced control authority    Torque imbalance        Reconfigure control law
                                                             detected                for 3-vane operation

Cold-gas leak                   Propellant loss              Pressure sensor         Isolate tank; SRP-only
                                                                                     operation (no emergency ΔV)

FPGA SEU                        Collision avoidance glitch   Watchdog TMR voter      FPGA scrub & reload
                                                                                     (<1 ms recovery)

Swarm Brain loss                No strategic planning        Petals detect no uplink Continue autonomous ops
                                                                                     indefinitely
```

---

## 12. Open Engineering Questions

These are the problems I don't yet have confident answers to. They require dedicated research and/or the Swarm-10 demo mission to resolve.

### 12.1 Critical Open Questions

1. **Swarm stability at scale:** The Boids algorithm is proven for thousands of agents in simulation, but has anyone proven stability for 10^12 agents with realistic orbital mechanics perturbations? We need formal stability analysis and massive-scale simulation. **I am not confident this is solved.**

2. **Debris environment evolution:** As we add petals, we create our own debris risk. What is the long-term debris population from micrometeorite impacts on petals? Does the swarm eventually create an unsustainable debris environment for itself? This requires Monte Carlo debris evolution modeling.

3. **Laser comm in dense swarm:** At Phase 3 densities, laser beams may be occluded by intervening petals. Do we need to switch to RF-only at high density? Or can we route around occlusions? What is the network topology at 10^9+ nodes?

4. **Thermal effects on SRP vanes:** At 1 AU, the SRP vanes experience ~1361 W/m² solar flux. Thermal distortion could affect pointing accuracy. What materials and coatings maintain flatness over 20 years?

5. **Clock synchronization:** Distributed orbit determination requires synchronized clocks across the swarm. GPS is unavailable at 1 AU. Can we achieve <1 μs synchronization using inter-petal ranging alone? Initial analysis suggests yes (two-way TOF provides ~10 ns precision), but this needs validation.

6. **Optimal petal spacing vs. communication range:** There's a tension between spreading petals for coverage and keeping them close enough for reliable laser comm. What is the optimal spacing as a function of petal count? This is a network topology optimization problem.

7. **Graceful scaling of hierarchy:** The Level 2/3 hierarchy (NC, SC) works for 10,000 petals. Do we need Level 5, 6, 7 for 10^12? How many hierarchy levels before latency becomes problematic? I suspect 6-7 levels suffice (10^12 = 100^6), but this needs analysis.

8. **Adversarial robustness:** If a petal's software is corrupted (by radiation or intentional attack), could it broadcast false collision alerts and disrupt the swarm? We need Byzantine fault tolerance for safety-critical messages. This adds complexity and latency — how much can we afford?

### 12.2 Research Priorities

| Priority | Question | Approach | Timeline | Budget |
|----------|----------|----------|----------|--------|
| 1 | Swarm stability at scale | Formal analysis + 10^9-agent simulation on HPC | 2 years | $5M |
| 2 | Debris environment evolution | Monte Carlo modeling (NASA ORDEM-adapted) | 1 year | $2M |
| 3 | Dense swarm communication topology | Network simulation + graph theory analysis | 1.5 years | $3M |
| 4 | SRP vane materials & thermal | Materials testing + thermal-structural FEA | 2 years | $4M |
| 5 | Byzantine fault tolerance for swarm | Protocol design + formal verification | 2 years | $3M |

---

## 13. Conclusion & Recommendation

The Swarm Control System is the single most architecturally critical system in Project Dyson. Get it wrong, and we have an uncontrollable cloud of debris at 1 AU. Get it right, and we have a self-organizing, self-healing megastructure that operates for centuries.

**My recommendation:**

1. **Immediately fund** the 10^9-agent swarm simulation ($5M) — this is the highest-risk technical question
2. **Begin IPC prototype development** in parallel — long-lead rad-hard components need ordering now
3. **Commit to the Swarm-10 demo mission** within 4 years — no amount of simulation replaces flight data
4. **Hire 5 researchers** specializing in multi-agent systems, distributed control, and orbital mechanics — this is a team-limited problem
5. **Resist the temptation to add centralized control** — it will seem easier in the short term and will be catastrophic at scale

The architecture proposed here — decentralized, bio-inspired, physics-exploiting — is not the easiest to develop, but it is the only one that scales to a Dyson swarm. Every design decision must be evaluated against the question: *"Does this still work with a trillion petals?"*

---

**Document Control:**
- Next review: After 10^9-agent simulation results (estimated Year 1 Q4)
- Distribution: Project Dyson Systems Engineering Board
- Classification: Open Technical Proposal