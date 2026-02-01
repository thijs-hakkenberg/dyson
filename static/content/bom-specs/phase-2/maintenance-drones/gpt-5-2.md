---
bomId: "bom-2-2"
itemName: "Maintenance Drones"
itemSlug: "maintenance-drones"
modelId: "gpt-5-2"
modelName: "GPT-5.2"
generated: "2026-02-01"
phase: "phase-2"
---

## Project Dyson — Phase 2 (Swarm Expansion)  
# Technical Proposal: Maintenance Drones (MD) System

### Executive summary (what I’m proposing)
For Phase 2, maintenance must scale faster than human oversight and tolerate harsh solar-orbit conditions. I recommend a **two-tier maintenance drone ecosystem**:

1. **MD‑A “Inspector” micro-drones (10–20 kg class)**  
   High-rate inspection, metrology, minor cleaning, connector reseat, simple swaps, and fault localization.

2. **MD‑B “Servicer” medium drones (150–300 kg class)**  
   Robotic manipulation, module replacement, harness repair, patching, limited welding/brazing, and towing/attitude correction. Operate from **Maintenance Depots** co-orbiting with swarm bands.

Both types are **solar-electric**, use **shared tool standards**, and rely on **structured docking features** on every swarm element (“maintainability-first” design rule). The system is depot-centric: drones are not “spacecraft that happen to repair things”; they are **tools in a logistics chain**.

---

## 1) Recommended approach & design philosophy

### 1.1 Maintainability-first rules (imposed on the swarm hardware)
Maintenance drones succeed or fail based on what they’re asked to service. I recommend hard requirements for all Phase 2 swarm elements:

- **Standardized grapple & datum geometry** every 1–2 m along truss edges (or panel frames).  
  Enables repeatable robot positioning and metrology.
- **Blind-mate connectors** for power/data with generous lead-ins and dust/arc mitigation.
- **Modular ORUs (Orbital Replaceable Units)** sized for one-drone handling:  
  - “Small ORU”: ≤ 8 kg (MD‑A can swap)  
  - “Medium ORU”: ≤ 60 kg (MD‑B can swap)  
  - “Large ORU”: handled by two MD‑B or depot jig
- **Local safe modes**: every element can enter “maintenance pose” (attitude, voltages, connector states).
- **No exposed fragile surfaces** in likely contact zones; put sacrificial bumpers where drones touch.

### 1.2 Drone design philosophy
- **Depot-based operations**: drones spend most time near depots, not free-flying long distances.
- **Electric propulsion** for repositioning and station-keeping; **reaction wheels + cold gas** for close-in contact.
- **“Fail-safe contact”**: compliant end-effectors, force/torque sensing, and conservative contact dynamics.
- **Tool standardization**: one tool interface across both classes.
- **Radiation/thermal robust**: design for high solar flux and particle environment with minimal single-point failures.

---

## 2) Operating environment & key assumptions (Phase 2)
To be specific with numbers, I assume Phase 2 swarm bands are in **near-solar orbits between 0.6–1.0 AU** (not the extreme inner-sun regime yet). If you intend 0.2–0.3 AU in Phase 2, thermal and radiation margins must increase substantially.

Assumptions used in sizing:
- **Solar flux**:  
  - 1.0 AU: 1361 W/m²  
  - 0.7 AU: ~2777 W/m² (×2.04)  
- **Thermal**: radiators must reject waste heat in full sun with limited view to cold space depending on attitude.
- **Communications**: local mesh among swarm elements + depots; Earth link handled by depots, not drones.
- **Maintenance rate target**: maintain **≥99.5% availability** of swarm generating area in Phase 2.  
  (This drives inspection cadence and spares logistics.)

---

## 3) System architecture (fleet + depots)

### 3.1 High-level architecture
```
                +----------------------+
                |  Swarm Element (SE)  |
                |  - ORUs + datums     |
                |  - local health bus  |
                +----------+-----------+
                           |
                           | local RF/optical + docking features
                           v
+------------------+   +---+-------------------+   +------------------+
|  MD-A Inspector  |<->| Maintenance Depot (D) |<->|  MD-B Servicer    |
|  (micro drones)  |   | - recharge            |   | (manipulation)    |
|  metrology,      |   | - spares storage      |   | repair, replace   |
|  minor swaps     |   | - tool crib           |   | tow, patch        |
+------------------+   | - comms gateway       |   +------------------+
                       | - fab/print (limited) |
                       +-----------------------+
```

### 3.2 Depot-centric concept of operations
- **Depots** are placed per swarm band (e.g., one depot per X km of ring arc length; exact spacing depends on element density and failure rate).
- MD‑A runs continuous inspection loops and flags anomalies.
- MD‑B executes scheduled interventions, ORU swaps, and more complex repairs.
- **Spares** are stocked at depots; long-haul logistics (from inner-system manufacturing) replenishes depots.

---

## 4) Maintenance Drone Technical Specifications

### 4.1 MD‑A “Inspector” micro-drone (baseline)
Primary roles: inspection, alignment checks, thermal imaging, connector reseat, dust/contamination removal, small ORU swaps (≤8 kg), tagging, simple harness routing.

**Physical**
- Dimensions: **0.9 m × 0.6 m × 0.5 m** (bus), deployable booms to 1.2 m
- Mass (dry): **14 kg**
- Propellant (cold gas): **1.2 kg** (N₂ or Xe; N₂ preferred for cost/handling)
- Total mass: **15.2 kg**

**Power**
- Solar array: **0.8 m²** high-temp triple-junction (assume 28% EOL at 0.7–1 AU)  
  - At 1 AU: ~300 W EOL (after cosine, temp, degradation allowances)  
  - At 0.7 AU: ~600 W EOL
- Battery: **0.5 kWh** rad-tolerant Li-ion (or LiFePO₄ if thermal margin needed)
- Peak bus power: **600 W** (short durations for compute + comms + actuators)

**Propulsion & proximity**
- Main: **micro Hall thruster** optional (50–150 W) for slow repositioning OR none if depots are dense.  
  I recommend **no Hall thruster** for MD‑A initially to reduce complexity; use depot placement to keep distances short.
- Close-in: **8× cold-gas microthrusters** for translation/attitude in proximity ops  
  - Δv budget: **20–30 m/s** per refill cycle
- Attitude: **reaction wheels** + magnetorquers not usable (heliocentric), so wheels + cold gas desat

**Manipulation**
- 1× lightweight **2-DOF tool arm** (reach 0.4 m) + **tool interface** (see §5)
- End-effector: compliant “micro-grapple” + mini-screwdriver/bit drive

**Sensing**
- Visible stereo: 2× 8–12 MP global shutter
- Short-wave IR: 1× 640×512 for hot-spot detection
- Time-of-flight/LiDAR: 10–30 m range for navigation and metrology
- Force/torque: 6-axis at wrist (small range)
- Sun sensors + star tracker (mini) for absolute attitude away from structures

**Performance**
- Inspection throughput: **~1–3 km of truss edge per day** (depends on structure density and imaging needs)
- Positioning accuracy (relative): **±2 mm** with fiducials at 1–2 m range
- Contact forces: limited to **<20 N** nominal

---

### 4.2 MD‑B “Servicer” medium drone (baseline)
Primary roles: ORU replacement (≤60 kg), panel swap, harness repair, patch/mend, limited welding/brazing, towing/attitude correction of elements, deployment assistance.

**Physical**
- Dimensions: **2.2 m × 1.4 m × 1.2 m** (stowed), dual arms fold-in
- Mass (dry): **210 kg**
- Propellant:  
  - Cold gas: **8 kg** (proximity, contact)  
  - Electric propellant (Xe/Kr): **20 kg** for Hall thrusters (repositioning)
- Total mass: **238 kg**

**Power**
- Solar array: **6 m²** articulated, high-temp capable  
  - At 1 AU: ~2.0 kW EOL  
  - At 0.7 AU: ~4.0 kW EOL (thermal-limited; may need feathering)
- Battery: **5 kWh**  
- Peak power: **6 kW** (tools/welding bursts from battery)

**Propulsion**
- 2× Hall thrusters (1–1.5 kW each)  
  - Isp: 1500–1800 s  
  - Δv: **>500 m/s** over life (with 20 kg Xe, depends on duty cycle)  
  Used for depot-to-job repositioning and limited towing.
- 12× cold-gas thrusters for proximity ops and contact stabilization

**Manipulation**
- 2× robotic arms, **7-DOF** each
  - Reach: **1.6 m**
  - Continuous payload at full reach: **25 kg** (per arm)  
  - Peak (short duration, braced): **60 kg** with dual-arm and structure bracing
- End-effectors: quick-change tool coupler + parallel gripper + microspine/fixture claw

**Tools (typical kit)**
- Torque tool (0.5–80 N·m)
- Cable/harness tool (cut, strip, crimp, clamp)
- Surface prep + patch applicator (adhesive-backed + UV/thermal cure)
- Spot heater for connector de-icing/outgassing
- **Low-power laser cleaner** (tens of W optical) for contamination removal
- Optional: **electron-beam/laser weld head** (high complexity; see roadmap)

**Sensing**
- Stereo + zoom inspection cameras
- IR thermography (higher resolution than MD‑A)
- LiDAR (0.5–100 m)
- Structured-light projector for metrology
- Force/torque sensors at both wrists + joint torque sensing
- RF sniffing probe for harness faults (optional)

**Performance**
- ORU swap cycle time (typical): **1–4 hours** including approach, brace, remove, install, verification
- Relative positioning: **±1 mm** with fiducials
- Contact force capability: **up to 300 N** braced
- Towing: can impart **mm/s** class delta-v to a 1–5 ton element over hours (electric propulsion coupled via grapple)

---

## 5) System interfaces & standards

### 5.1 Mechanical: Grapple & datum standard (mandatory)
I recommend a **Project Dyson Maintenance Interface (PDMI)**:

- **Triad datum pattern**: 3 hardened spheres (kinematic mount) for repeatable pose.
- **Grapple slot**: rectangular capture feature compatible with a simple latching claw.
- Spacing: every **1.5 m** along serviceable edges.
- Load rating per point: **2 kN** ultimate (for bracing during torque ops).

### 5.2 Electrical/data: Blind-mate service port
- Power: 48 VDC service bus (up to 2 kW transient at depot/element interface)
- Data: redundant **CAN-FD** or SpaceWire-lite for local maintenance bus
- A “maintenance inhibit” pin to guarantee de-energized state before mate/demate
- Arc mitigation: pre-charge + staged contacts

### 5.3 Tool interface (both MD‑A and MD‑B)
- Mechanical: ISO-inspired kinematic tool plate, 3-lug twist lock
- Power: 48 V, 10 A continuous (MD‑A), 48 V, 60 A peak (MD‑B)
- Data: CAN-FD + tool ID EEPROM

---

## 6) Subsystems breakdown

### 6.1 Avionics & compute
- Rad-tolerant flight computer (lockstep MCU) + “AI coprocessor” (radiation-managed, watchdogged)
- Memory: ECC, scrubbing
- Time sync: depot distributes time via PTP-like protocol over local network

### 6.2 GNC (Guidance, Navigation, Control)
Modes:
1. **Far-field cruise** (Hall thrusters, star tracker)
2. **Near-field approach** (LiDAR + visual fiducials)
3. **Contact/brace** (force control, impedance control)
4. **Docking** (visual + mechanical capture)

Key requirements:
- Relative nav accuracy: **<5 mm** at contact
- Fault tolerance: abort trajectories, plume impingement constraints, keep-out zones

### 6.3 Power & thermal
- High-temperature solar arrays with articulation to manage flux (especially inside 1 AU)
- Radiators sized for worst-case tool use in sunlit attitudes  
  MD‑B includes deployable radiator panel(s) ~1–2 m² equivalent.

### 6.4 Communications
- Local: UHF/S-band mesh for robustness + optional optical short-range high-rate link
- Data rates:
  - MD‑A: 1–5 Mbps typical (compressed imagery bursts)
  - MD‑B: 5–50 Mbps when streaming inspection video/metrology to depot
- Depot acts as comms gateway to Earth; drones do not need deep-space high-gain.

### 6.5 Robotics
- Force-controlled manipulation with compliance
- Standardized task primitives: grasp, brace, unbolt, mate/demate, inspect, patch

### 6.6 Fault management
- Safe states: free-fly retreat, brace-and-wait, dock-now
- Redundancy:
  - MD‑B: dual-string avionics + cross-strapped power distribution
  - MD‑A: single-string but cheap and replaceable; fleet redundancy

---

## 7) Autonomy, control, and ops concept

### 7.1 Autonomy level target
- **MD‑A**: “Supervised autonomy” — can execute inspection routes and simple actions; humans approve interventions beyond a whitelist.
- **MD‑B**: “Task-level autonomy” — executes ORU swaps with verification steps; humans supervise exceptions.

### 7.2 Control loop hierarchy
```
Mission Planner (Depot) 
  -> Task Plan (swap ORU #12)
     -> Motion Plan (approach, brace, remove)
        -> Real-time Control (force/torque, joint control)
           -> Safety Monitor (limits, aborts)
```

### 7.3 Verification and sign-off
Every maintenance action ends with:
- Electrical self-test (continuity/insulation where relevant)
- Thermal snapshot comparison
- Visual confirmation (before/after)
- Update digital twin + maintenance log

---

## 8) Manufacturing considerations

### 8.1 Design for manufacturability (DFM)
- MD‑A: maximize COTS-like repeatability, minimal moving parts, injection-molded or machined frame elements, simple thruster plumbing.
- MD‑B: modular arms (identical left/right), line-replaceable avionics, standardized harnessing.

### 8.2 Materials & processes
- Structure: aluminum-lithium or titanium fittings; CFRP where thermally acceptable
- Coatings: high-emissivity radiator coatings; atomic oxygen not a concern heliocentric, but UV/particle darkening is
- Lubrication: dry-film (MoS₂) and solid lubricants; avoid volatile greases near optics/connectors

### 8.3 In-space vs terrestrial manufacturing
Phase 2 recommendation:
- **Terrestrial manufacture** of drones + launch to operational orbit bands.
- **Depot-based refurbishment**: swap modules, recharge, replenish propellant.
- Limited in-space fabrication: simple brackets, patches, covers (additive manufacturing at depot) — not full drone production yet.

---

## 9) Development roadmap & TRL

### 9.1 Key technology readiness notes
- Robotic servicing exists (ISS, OSAM concepts), but **high-throughput autonomous servicing in heliocentric orbit** is less proven.
- Hall thrusters and solar arrays are mature; the challenge is **autonomy + contact dynamics + standardization**.

### 9.2 Roadmap (opinionated)
**Phase 2A (0–24 months): “Inspection-first”**
- Build MD‑A v1 and depot docking prototype
- Demonstrate:
  - autonomous inspection loop
  - fiducial-based metrology
  - safe docking/undocking
- TRL target: 6 for inspection system

**Phase 2B (18–42 months): “ORU swap capability”**
- Build MD‑B v1 with one arm initially (reduce complexity), then dual-arm
- Demonstrate:
  - braced unbolt/bolt operations
  - blind-mate connectors
  - ORU swap on representative swarm panel
- TRL target: 6–7 for ORU replacement

**Phase 2C (36–60 months): “Scale fleet & depot operations”**
- Fleet management software, predictive maintenance, spares optimization
- Add advanced tools (laser cleaning, patching automation)
- Begin limited depot additive manufacturing for non-critical parts

**Phase 2D (60+ months): “Advanced repair”**
- Welding/brazing, conductor rework, structural reinforcement
- This is high risk; do only once basic swap logistics are mature.

---

## 10) Cost analysis & budget estimates (ROM)

Assumptions:
- Non-profit, but still paying aerospace-grade development/testing.
- Production volumes in Phase 2:  
  - MD‑A: 200–1000 units  
  - MD‑B: 20–100 units  
  - Depots: 5–30 units depending on swarm scale

### 10.1 Non-recurring engineering (NRE)
- MD‑A NRE: **$60–120M** (autonomy + sensors + docking + testing)
- MD‑B NRE: **$250–500M** (robotics, tools, safety, thermal, propulsion integration)
- Depot integration (interfaces, tool crib, spares handling, comms gateway): **$150–300M**
- Verification facilities (solar-thermal vacuum robotics rigs): **$80–200M**

**Total Phase 2 NRE (maintenance ecosystem): $540M – $1.12B**

### 10.2 Recurring unit costs (production, excluding launch)
- MD‑A: **$0.4–1.2M each** (target <$0.6M at scale)
- MD‑B: **$8–20M each** (robot arms dominate cost)
- Depot: **$30–120M each** (power, storage, comms, refuel, mechanisms)

### 10.3 Annual ops cost (software, monitoring, planning)
- Ground + compute + staffing: **$20–80M/year** depending on autonomy maturity and swarm size.

### 10.4 Launch/transport costs
Not estimated here because it depends heavily on your transport architecture (in-space tugs, inner-system launchers, etc.). But maintenance mass is modest compared to swarm area; the key is **depot placement and refueling**.

---

## 11) Risk assessment (top items)

### 11.1 Technical risks
1. **Contact dynamics & inadvertent damage** (High)  
   Mitigation: compliant control, bracing points, conservative force limits, extensive ground testing with representative structures.

2. **Thermal management inside 1 AU** (Med–High)  
   Mitigation: articulated arrays, radiator sizing, operational constraints (tool use in favorable attitudes), high-temp electronics placement.

3. **Autonomy brittleness / edge cases** (High)  
   Mitigation: task whitelists, simulation at scale, human-in-the-loop exceptions, incremental capability rollout.

4. **Connector degradation / arcing / contamination** (Med–High)  
   Mitigation: staged contacts, pre-charge, protective covers, connector health monitoring, cleaning tools.

5. **Propellant logistics for proximity ops** (Medium)  
   Mitigation: depot refueling, minimize cold-gas usage via bracing and wheels, optimize trajectories.

### 11.2 Programmatic risks
- **Interface drift** across swarm element vendors (High)  
  Mitigation: strict PDMI standard + compliance testing; no deployment without interface certification.

- **Underestimating spares** (Medium)  
  Mitigation: early data-driven reliability modeling; design ORUs with telemetry and wear indicators.

---

## 12) Open engineering questions (must answer early)

1. **Swarm element geometry & density**: truss vs free-flying panels? Maintenance approach changes drastically.
2. **Orbit band selection (0.6–1 AU vs 0.3 AU)**: thermal/radiation design point.
3. **Allowed plume impingement**: can we use cold gas near sensitive surfaces? If not, we need more bracing and/or electrostatic/ion micropropulsion.
4. **ORU philosophy**: what fraction of failures are recoverable by swap vs repair-in-place?
5. **Depot spacing and logistics**: how far should a drone travel between jobs? This drives propulsion sizing and fleet size.
6. **Comms architecture**: RF-only mesh vs adding optical crosslinks for high-rate metrology/video.
7. **Radiation tolerance strategy**: rad-hard everywhere vs selective shielding + frequent replacement (especially for MD‑A).
8. **In-space refueling**: what propellants are available at depots (N₂, Xe, Kr)? How are they stored and transferred?
9. **Tooling scope**: do we commit to welding/brazing in Phase 2, or defer to Phase 3 when structures are larger and more standardized?

---

## 13) My opinionated recommendation (what to do first)
1. **Lock the PDMI mechanical + electrical interface now** and enforce it across all Phase 2 swarm elements. This is the highest leverage decision.
2. **Deploy MD‑A fleet first** to build a reliability dataset and digital twin; inspection is the foundation of scalable maintenance.
3. **Make MD‑B primarily a swap-and-tow machine**, not a “space mechanic that can do everything.” Complex repairs are seductive but slow and risk-prone.
4. **Invest heavily in depot operations software** (fleet scheduling, spares optimization, anomaly triage). Software is what makes a swarm maintainable.

---

If you share (a) target orbital radius for Phase 2, (b) approximate swarm element size/mass, and (c) expected failure modes (cell degradation, micrometeoroid puncture, connector faults, attitude failures), I can refine fleet sizing (number of drones/depots), inspection cadence, and spares mass with a quantitative availability model.