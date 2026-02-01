---
bomId: "bom-1-7"
itemName: "Swarm Control System"
itemSlug: "swarm-control-system"
modelId: "gpt-5-2"
modelName: "GPT-5.2"
generated: "2026-02-01"
phase: "phase-1"
---

## Swarm Control System (SCS) — Phase 1 Initial Swarm Deployment  
**Project Dyson (non-profit) — Technical Proposal (opinionated, numbers-first)**

### 0) Scope and Phase-1 assumptions (explicit)
Phase 1 is about **proving scalable deployment and control**, not maximizing energy capture.

**Assumptions (baseline design point):**
- **Swarm size (Phase 1):** 1,000 “nodes” (spacecraft) + 2–5 “beacon/relay” assets.  
- **Node type:** small solar-sail/solar-array “power tile” demonstrator with basic station-keeping and attitude control.  
- **Orbit regime:** heliocentric, near-ecliptic, near-1 AU (or 0.7–1.0 AU), modest differential mean anomaly spacing; not a rigid shell.  
- **Primary objective:** maintain safe separation, predictable ephemerides, health monitoring, time sync, and scalable operations.  
- **Collision risk tolerance:** < 1e-6 probability of catastrophic collision per node-year (Phase 1 target).  
- **Ground segment:** 2–3 ground stations (commercial or partner) + cloud operations.  
- **Communications constraints:** no optical crosslinks required for Phase 1; optional for Phase 1.5.

---

## 1) Recommended approach & design philosophy

### 1.1 Philosophy: “Distributed autonomy with minimal coupling”
A Dyson swarm becomes unmanageable if it requires tight formation-keeping. The control system should:
- **Avoid global rigidity**: treat the swarm as a **statistical constellation** with bounded density and controlled phase-space distribution.
- **Use local rules + periodic global nudges**: nodes maintain their own safety and trajectory; global planners provide low-rate optimization and rephasing.
- **Fail gracefully**: any node can go silent without destabilizing others. No single point of failure.
- **Design for manufacturability**: control hardware and software must be replicable at scale (10^3 → 10^6).

### 1.2 Control concept: “Ephemeris governance” rather than “formation flying”
Each node is assigned:
- A **target orbital element set** (a, e, i, Ω, ω, M) and a **keep-out tube** in state space.
- A **time-phased slot** (mean anomaly window) and a **radial/along-track tolerance**.
- A **local collision-avoidance policy** based on conjunction screening with neighbors and a broadcast ephemeris catalog.

### 1.3 Network concept: “Asynchronous mesh with beacon time”
Instead of requiring full mesh connectivity:
- A few **Beacon/Relay spacecraft** provide time, ephemeris bulletin, and store-and-forward.
- Nodes communicate opportunistically (scheduled windows), not continuously.

---

## 2) Technical specifications (Phase-1 baseline)

### 2.1 Swarm Control System per Node (SCS-N) — hardware allocation
This is the control/comm/compute slice of each node, not the entire spacecraft.

| Parameter | Spec (per node) | Notes |
|---|---:|---|
| SCS mass | **0.45 kg** | compute+IMU+star tracker (optional)+radio+GNSS-like (not at 1 AU) replaced by nav filters |
| SCS power (avg / peak) | **2.5 W / 12 W** | peak during comm + actuator events |
| Compute | **Rad-tolerant MCU/SoC, 2–10 GFLOPS equiv** | e.g., ARM + FPGA-lite; ECC memory |
| Memory | **1–4 GB nonvolatile**, **512 MB RAM** | event logs + ephemeris tables |
| Timekeeping | **OCXO or chip-scale atomic clock optional** | baseline OCXO disciplined by beacon |
| Attitude knowledge | **Sun sensors + MEMS IMU**, optional micro star tracker | star tracker strongly recommended for precise pointing if optical comm is used |
| Attitude control interface | **reaction wheels or sail trim actuators** | depends on node design |
| Delta-v authority (via sail trim / microprop) | **0.5–5 m/s per year equivalent** | enough for phasing + avoidance |
| Comm | **UHF/S-band crosslink** baseline; optional optical | keep it simple for Phase 1 |

### 2.2 Beacon/Relay spacecraft (SCS-B) — constellation of 2–5 units
| Parameter | Spec | Notes |
|---|---:|---|
| Count | **3** (minimum viable), scalable to 5 | improves geometry and latency |
| Mass | **35–60 kg** each | ESPA-class |
| Power | **120–250 W** | higher duty comm + processing |
| Antenna | **gimbaled medium-gain (S/X)** + omni | |
| Time source | **CSAC or mini atomic clock** | time master for swarm |
| Processing | **>50 GFLOPS equiv** | ephemeris aggregation, screening |
| Downlink | **X-band 50–150 Mbps** (when visible) | commercial ground stations |
| Crosslink | **S-band/UHF broadcast + scheduled TDMA** | broadcast ephemeris bulletins |

### 2.3 Performance targets (Phase 1)
- **Position knowledge (node self-estimate):**  
  - Along-track: **≤ 5 km (1σ)**  
  - Cross-track/radial: **≤ 2 km (1σ)**  
  Achieved via radiometric ranging to beacons + solar/stellar attitude + dynamics modeling.
- **Time sync:** **≤ 10 ms (1σ)** across swarm (enables TDMA and consistent ephemeris).
- **Conjunction screening:**  
  - Detect predicted miss distance < **20 km** at TCA (time of closest approach) with **>99%** detection probability for cataloged nodes.
- **Collision avoidance maneuver success:** **>99.9%** when commanded with ≥7 days warning.
- **Swarm maintainability:** one operator can oversee **~5,000 nodes** with automation (Phase 1 goal: 1,000 nodes with 1–2 operators).

---

## 3) System architecture

### 3.1 Functional architecture
```
          +--------------------------- Ground Segment ---------------------------+
          | Mission Ops + Swarm Planner + Catalog + Analytics + Key Management  |
          +--------------------^-------------------^----------------------------+
                               | X-band/Ka
                               |
                    +----------+----------+
                    |  Beacon/Relay (B)  |  (3 units distributed in orbit)
                    |  - time master     |
                    |  - ephemeris hub   |
                    |  - store/forward   |
                    +----^----------^----+
                         | broadcast | scheduled TDMA
                         | S-band    |
        +----------------+-----------+-------------------+
        |                |           |                   |
   +----+----+      +----+----+  +---+-----+       +-----+---+
   | Node 1  | ...  | Node k  |  | Node m  |  ...  | Node N  |
   | SCS-N   |      | SCS-N   |  | SCS-N   |       | SCS-N   |
   +---------+      +---------+  +---------+       +---------+
```

### 3.2 Data products (key idea: “ephemeris bulletin”)
Beacon broadcasts a compact bulletin every **6–24 hours**:
- Swarm time
- Beacon ephemeris
- Latest **catalog** of node state vectors (compressed)
- Keep-out constraints / slot assignments
- Planned “global nudges” (e.g., phasing campaigns)
- Security keys/rotation schedule (if using group keys)

Nodes upload at low rate (e.g., **1–4 times/day**) their:
- Estimated state vector + covariance
- Health summary
- Maneuver execution reports

---

## 4) Subsystems breakdown & interfaces

### 4.1 SCS-N (Node) subsystems
1) **Guidance, Navigation, and Control (GNC) software**
- Orbit propagation: high-fidelity solar gravity + SRP (solar radiation pressure) model.
- Estimation: Extended Kalman Filter (EKF) or square-root UKF.
- Guidance: slot-keeping, drift control, conjunction avoidance.
- Attitude control: pointing for comm/actuation.

**Interfaces:**  
- To sensors: IMU (SPI), sun sensors (I2C/ADC), star tracker (LVDS/SpaceWire optional).  
- To actuators: reaction wheels (PWM/CAN), sail trim (PWM), microprop valves (GPIO/driver).  
- To comm: radio driver (UART/SPI), time sync service.

2) **Communications subsystem**
- Baseline: **S-band patch** or UHF for short-range crosslink; **S-band** to beacon.
- TDMA schedule distributed in bulletin; nodes maintain time sync.
- CCSDS-like packetization (or simplified custom with forward error correction).

**Interfaces:**  
- RF front-end to SCS compute via SPI/Ethernet (depends on radio).  
- Crypto module (software or secure element).

3) **Autonomy & Fault Management**
- Mode logic: Safe, Nominal, Comm, Maneuver, Contingency Avoidance.
- Watchdogs, brownout handling, memory scrubbing.
- “Lost-link” behavior: maintain last slot and increase separation bias.

4) **Timekeeping**
- OCXO disciplined by beacon broadcasts (two-way time transfer optional).
- If beacon unavailable: free-run with drift budget < 1 s/day.

---

### 4.2 SCS-B (Beacon/Relay) subsystems
1) **Swarm Catalog & Screening**
- Maintains global catalog of node states/covariances.
- Performs conjunction screening using simplified pairwise checks + spatial indexing (k-d tree / cell lists).
- Generates avoidance advisories (not mandatory; nodes can act locally too).

2) **Time and Schedule Authority**
- Broadcasts time beacons and TDMA schedules.
- Maintains key rotation and authentication policy.

3) **Store-and-forward + Ground gateway**
- Buffers node telemetry.
- Downlinks to ground when visible; uplinks new policies and software.

---

## 5) Autonomy, control, and communications requirements

### 5.1 Autonomy levels (Phase 1)
- **Node autonomy:** high for safety, moderate for optimization.
  - Must execute avoidance without ground in loop.
  - Must survive 30 days without beacon contact (degraded mode).
- **Beacon autonomy:** moderate.
  - Must continue time broadcasts and catalog updates even if ground contact is intermittent.

### 5.2 Control laws (recommended)
**Slot-keeping control** (low thrust / SRP trim):
- Control objective: maintain mean anomaly within assigned window and maintain minimum along-track separation.
- Use differential drag analog: adjust SRP effective area or sail pitch to create small Δa / ΔM over weeks.

**Conjunction avoidance**:
- Trigger when predicted miss distance < 20 km (configurable).
- Preferred maneuver: small along-track bias (Δv equivalent 1–10 cm/s) executed ≥7 days before TCA.
- If late warning: radial bias (more dispersive but higher cost).

### 5.3 Communications (baseline)
- **Beacon broadcast:** 1–4 kbps effective, robust FEC, daily.
- **Node uplink to beacon:** 1–10 kb/day per node (state + health).
- **Latency:** up to 24 hours acceptable for routine ops; avoidance messages should propagate within 6 hours.
- **Security:** authenticated broadcasts (TESLA-like delayed key disclosure or group signatures), per-node identity keys.

**Why not full mesh?**  
Mesh scales poorly in scheduling and RF congestion. Beacon-based “hub-and-spoke with opportunistic peer assist” is simpler and scales.

---

## 6) Manufacturing considerations (design-for-scale)

### 6.1 Node SCS manufacturing
- Use **COTS where possible** with radiation characterization rather than full rad-hard (Phase 1).
- Single PCB “SCS module” with:
  - MCU/SoC + ECC memory
  - IMU + sun sensor interfaces
  - Radio module footprint (solder-down)
  - Power conditioning (wide input)
- Conformal coat + shielding spot plates (tantalum/aluminum) sized by parts.

**Test strategy:**
- Automated hardware-in-loop (HIL) rigs simulating beacon broadcasts, time drift, and maneuver loops.
- End-of-line calibration: IMU bias, oscillator drift, RF power.

### 6.2 Beacon manufacturing
- Leverage smallsat bus (commercial) to reduce NRE.
- Focus custom development on:
  - Swarm catalog compute payload
  - High-reliability time source
  - RF broadcast payload

---

## 7) Development roadmap & TRL

### 7.1 Phased plan (36 months to Phase-1 operational)
**0–6 months (TRL 3→4):**  
- Define swarm state model, bulletin format, time sync protocol.  
- Build software simulation (10k nodes) with Monte Carlo on errors.

**6–12 months (TRL 4→5):**  
- Hardware prototypes of SCS-N board.  
- HIL testbed: 50–200 “software nodes” + 5 hardware nodes.  
- Demonstrate time sync, TDMA, bulletin parsing, safe-mode.

**12–20 months (TRL 5→6):**  
- Orbital demo: 3–10 nodes + 1 beacon in Earth orbit or heliocentric rideshare (budget-dependent).  
- Validate ranging/time transfer, catalog updates, autonomy.

**20–30 months (TRL 6→7):**  
- Pre-production: 200 nodes + 2 beacons.  
- Operational tooling, automated planning, fault handling.

**30–36 months (TRL 7→8):**  
- Phase 1 deployment: 1,000 nodes + 3 beacons.  
- Continuous improvement, software updates, begin scaling plan.

---

## 8) Cost analysis & budget estimates (Phase 1)

### 8.1 Cost model assumptions
- Non-profit, lean team, heavy use of commercial ground services.
- Node spacecraft cost not fully included—**this is SCS-focused**, but integration is included.

### 8.2 Rough Order of Magnitude (ROM)
**NRE (design, software, test, qualification):**  
- Swarm autonomy + planning software: **$6–10M**  
- Node SCS hardware design + proto + qual: **$3–6M**  
- Beacon payload software/hardware: **$4–8M**  
- Test infrastructure (HIL, RF labs, ops tools): **$2–4M**  
**Total NRE:** **$15–28M**

**Recurring (Phase 1 production quantities):**
- Node SCS module (0.45 kg class electronics): **$600–$1,800 each** in 1k qty  
  - Total: **$0.6–1.8M**
- Beacon payload incremental (3 units): **$1.5–4M** total (payload only)
- Mission ops + ground services (first 2 years): **$2–6M**
- Integration/acceptance testing: **$1–3M**

**Total SCS program cost for Phase 1 (excluding full spacecraft buses & launch):**  
**~$20M to $45M**

**If including beacon spacecraft buses + launch share (very rough):**
- Beacons (3× 50 kg) buses: **$6–15M**
- Launch/rideshare + deployment services: **$10–30M** (highly variable)
- Total with beacons & launch: **~$36M to $90M**

---

## 9) Risk assessment (top risks & mitigations)

### R1: **Navigation uncertainty too large → poor conjunction prediction**
- **Risk:** without GNSS at 1 AU, state errors grow; conjunction screening fails.
- **Mitigation:** beacon radiometric ranging + frequent ephemeris uploads; conservative keep-out spacing; increase along-track separation early; add optional star tracker.

### R2: **RF congestion / scheduling collapse at scale**
- **Risk:** 1,000 nodes overwhelm beacon access.
- **Mitigation:** strict TDMA, compress telemetry, event-driven uplinks, multiple beacons, adaptive rate control, store-and-forward.

### R3: **Software complexity / autonomy bugs**
- **Risk:** emergent behavior or unsafe maneuvers.
- **Mitigation:** formal methods on safety kernel, extensive Monte Carlo + HIL, “safety envelope” limiting maneuver magnitude and direction.

### R4: **Radiation-induced faults (COTS)**
- **Risk:** SEUs, latchup degrade reliability.
- **Mitigation:** ECC, watchdogs, current limiting, selective rad-tolerant parts, shielding, periodic scrubbing, graceful degradation.

### R5: **Beacon as partial single point of failure**
- **Risk:** time/catlog authority loss.
- **Mitigation:** 3 beacons minimum; nodes can free-run and use last known catalog; allow beacon election (optional Phase 1.5).

### R6: **Security compromise**
- **Risk:** spoofed bulletins or malicious maneuver commands.
- **Mitigation:** authenticated broadcasts, signed updates, per-node keys, minimal command surface (nodes accept only policy constraints, not direct thrust vectors).

---

## 10) Open engineering questions (must close early)

1) **Node propulsion/actuation authority:**  
   Is station-keeping via SRP trim only, or microprop? This drives achievable control bandwidth and safety margins.

2) **Ranging method selection:**  
   - Two-way S-band ranging to beacons?  
   - Time-difference-of-arrival with multiple beacons?  
   Trade impacts power, antenna pointing, and time sync.

3) **Minimum safe spacing policy:**  
   What density is acceptable for Phase 1? Conservative spacing simplifies everything.

4) **Optical comm inclusion (Phase 1.5?):**  
   Optical crosslinks could reduce RF congestion but adds pointing and cost. Recommend deferring unless node already needs precision pointing.

5) **Governance of “slot ownership” and reallocation:**  
   How do we reassign slots when nodes die or drift? Needs a robust policy to avoid cascading conflicts.

6) **Software update strategy at scale:**  
   Delta updates, signed images, rollback. How to prevent bricking thousands of nodes.

7) **End-of-life behavior:**  
   What is the disposal plan for failed nodes in heliocentric orbit (passivation, drift to “grave” bands)?

---

## 11) Opinionated summary (what I recommend)
For Phase 1, the best Swarm Control System is **not** formation flying; it is **distributed ephemeris governance** using:
- **3 beacon/relay spacecraft** as time + catalog broadcasters,
- **simple, robust node autonomy** focused on safety and slot-keeping,
- **low-rate, highly compressed communications** with strong authentication,
- heavy investment in **simulation/HIL and a safety kernel** to prevent emergent failures.

If you share:
- target heliocentric distance (e.g., 0.7 AU vs 1 AU),
- node actuation method (SRP trim vs microprop),
- desired minimum spacing and tile area,
I can tighten the navigation error budget, comm link budget, and the exact TDMA schedule with more precise numbers.