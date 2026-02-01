---
bomId: "bom-1-3"
itemName: "Assembly Robots"
itemSlug: "assembly-robots"
modelId: "gpt-5-2"
modelName: "GPT-5.2"
generated: "2026-02-01"
phase: "phase-1"
---

## Proposal: Phase 1 Assembly Robots for Project Dyson (Initial Swarm Deployment)

### 0) Scope and assumptions (explicit)
This proposal covers **assembly robots** used in **Phase 1: Initial Swarm Deployment**, where the objective is to rapidly deploy a large number of **small solar-collector spacecraft (“tiles”)** into heliocentric orbits and incrementally build manufacturing/assembly capability.

**Key assumptions (used for sizing):**
1. **Swarm element (“tile”)**: 20–50 kW class solar collector/sailcraft, **200–400 kg**, stowed volume ~1–2 m³. Uses thin-film PV + lightweight structure.  
2. **Phase 1 deployment rate target**: order **10,000 tiles/year** by end of Phase 1 (scales later).  
3. **Assembly tasks**: unpacking, inspection, joining modules, routing power/data harnesses, attaching propulsion/power modules, deploying booms/membranes, basic repair/rework, and logistics handling.  
4. **Operating environment**: 0.7–1.0 AU initially (thermal manageable; comms easier), later nearer Sun.  
5. **Primary constraint**: minimize mass launched from Earth by maximizing **robot reuse**, **standardized interfaces**, and **high autonomy**.

---

## 1) Recommended approach & design philosophy

### 1.1 Philosophy: “Shipyard in space” with reusable, modular robot workers
The best Phase 1 strategy is **not** one giant assembler, but a **distributed shipyard**:
- A **small number of reusable “Assembly Tugs”** (high-mobility, high-authority manipulators)  
- A **larger number of simpler “Dexterous Workers”** (manipulation + inspection)  
- A **swarm of “Logistics Drones”** (moving parts, capturing free-flyers, ferrying tools)  
- A **tooling ecosystem**: standardized end-effectors, quick-change tool caddies, metrology targets, and docking interfaces.

This yields:
- High throughput via parallelism
- Graceful degradation (loss of one robot doesn’t halt production)
- Easier incremental upgrades
- Compatibility with later in-situ manufacturing

### 1.2 Assembly method: fixtureless, metrology-driven, standards-first
Traditional spacecraft assembly uses fixtures and tight tolerance parts. In microgravity, we can instead use:
- **Kinematic docking features** (3-2-1 constraints), capture cones, and compliant latches
- **Vision + laser metrology** to close the loop on alignment
- **Robotic “compliance”** (series elastic elements / force-torque control) to avoid jamming
- **Self-aligning electrical/fluid connectors** rated for vacuum and thermal cycling

### 1.3 Standard interfaces (non-negotiable)
A Dyson swarm is an industrial system. Every tile and robot should share:
- **Mechanical**: a common grapple/dock fixture (Androgynous, 6-DOF, passively aligning)
- **Power**: 120–300 VDC bus (arc-managed), plus low-voltage service
- **Data**: SpaceWire/TSN Ethernet internally; optical crosslinks externally
- **Metrology**: fiducial targets + retroreflectors for laser ranging

---

## 2) System overview: the Phase 1 Assembly Robot Suite

### 2.1 Roles
1. **AT-1 “Assembly Tug”**: primary heavy manipulator and tile handler  
2. **DW-1 “Dexterous Worker”**: two-arm robot for harnessing, latching, inspection, rework  
3. **LD-1 “Logistics Drone”**: small free-flyer for parts transport, tool delivery, and camera angles  
4. **Tooling & fixtures**: tool caddies, spoolers, connector cleaners, adhesive/patch dispensers (if needed)

### 2.2 Operational concept
- Tiles arrive stowed (from Earth initially; later from in-space manufacturing)
- AT-1 captures, stabilizes, and positions tiles near the assembly node
- DW-1 performs fine operations: deploy booms, connect harnesses, verify continuity, patch defects
- LD-1 delivers tools, holds a work light/camera, or moves small subassemblies
- Completed tiles are released to their operational orbit or handed to a propulsion tug

---

## 3) Technical specifications (baseline designs)

### 3.1 AT-1 Assembly Tug (heavy handler)
**Purpose:** capture and manipulate 200–800 kg class modules; provide “construction crane” capability.

**Key specs (baseline):**
- **Mass (dry):** 1,200 kg  
- **Dimensions:** bus 2.2 m × 1.6 m × 1.6 m; deployed arms span ~8 m tip-to-tip  
- **Power:**  
  - Peak: 12 kW (arm motion + avionics + comms)  
  - Average: 3–5 kW  
  - Solar array: 20 kW (at 1 AU), articulated; battery 8 kWh Li-ion (later: Li-S)  
- **Propulsion:**  
  - Primary: Hall-effect thrusters, 2 × 2.5 kW, Isp 1,600–2,000 s  
  - RCS: cold gas or warm gas (N₂) for plume-clean operations near sensitive surfaces  
  - Xenon propellant: 250 kg (Δv depends on duty cycle; sized for months of operations)  
- **Manipulators:**  
  - 1 × “Power Arm”: 6-DOF, 4 m reach, 500 N end-force, 200 N·m wrist torque  
  - 1 × “Support Arm”: 6-DOF, 3 m reach, 250 N end-force  
  - End-effector: standardized grapple + tool interface; integrated force/torque sensor (±500 N, ±200 N·m)  
- **Pointing & metrology:** star tracker + IMU; stereo cameras; scanning lidar (10–30 m range); laser retroreflector ranging to nodes  
- **Throughput target:** handle and position **20–40 tiles/day** per AT-1 (assuming parallel DW-1 support)

**Notes:** AT-1 is designed to be **overbuilt** early to reduce operational fragility. It is the “backbone” asset.

---

### 3.2 DW-1 Dexterous Worker (fine assembly)
**Purpose:** perform precise tasks: latching, cable routing, connector mating, inspection, patching.

**Key specs:**
- **Mass (dry):** 450 kg  
- **Dimensions:** 1.2 m × 1.0 m × 1.0 m bus; two 2.0 m arms  
- **Power:** peak 4 kW, average 1–2 kW; solar 6 kW; battery 3 kWh  
- **Propulsion:** small electric (0.5–1 kW) + N₂ RCS for close proximity ops  
- **Manipulators:**  
  - 2 × 7-DOF arms, 2 m reach each  
  - End-effector quick-change: gripper, torque tool, cable tool, connector mate tool, inspection probe  
  - Fine force control: 0.5 N resolution; max continuous 150 N per arm  
- **Sensors:** macro + micro cameras, structured light, thermal camera (for hot spots), contact micro-switches, electrical continuity tester  
- **Assembly performance:**  
  - Connector mate/unmate: <60 s typical  
  - Harness routing: 5–15 min per segment  
  - Visual inspection: 1–3 m²/min at high resolution (depends on lighting and distance)  
- **Throughput target:** supports **10–20 tiles/day** per DW-1 in a steady production cell

---

### 3.3 LD-1 Logistics Drone (small free-flyer)
**Purpose:** move tools/parts up to ~20 kg; act as mobile camera/light; capture small tumbling objects.

**Key specs:**
- **Mass (dry):** 60 kg  
- **Payload:** 20 kg internal bay or external clamp  
- **Power:** 0.5–1.0 kW solar; 0.5 kWh battery  
- **Propulsion:** warm gas (N₂) or water resistojet; very low contamination near optics/PV  
- **Nav:** visual-inertial odometry + fiducial tracking; short-range lidar  
- **Comms:** UHF backup + optical/Ka to hub  
- **Throughput:** ~100 tool/part deliveries per day per 4-drone cluster (short hops)

---

## 4) System architecture

### 4.1 “Assembly Cell” concept
A minimal productive unit is an **Assembly Cell**:

- 1× AT-1 Assembly Tug  
- 2× DW-1 Dexterous Workers  
- 4× LD-1 Logistics Drones  
- 1× Tool Caddy + Spares Pallet  
- 1× “Node” structure (docking ports, power, comm relay, metrology targets)

This cell assembles tiles continuously and can be replicated.

### 4.2 ASCII architecture diagram (cell-level)

```
                 [Ka/Optical Link to Earth / Ops]
                              |
                              v
                        +-----------+
                        |  NODE-1   |  (power/data relay, docking ring,
                        | Dock Hub  |   metrology targets, tool pallet)
                        +-----------+
                         /   |    \
                        /    |     \
               Dock/Power  Dock   Dock
                    |       |       |
                    v       v       v
                 +-----+  +-----+  +-----+
                 |DW-1 |  |DW-1 |  |Tool |
                 +-----+  +-----+  |Caddy|
                    \        /     +-----+
                     \      /
                      v    v
                    +---------+
                    |  AT-1   |<--- captures/positions tiles
                    +---------+
                      ^  ^  ^
                      |  |  |
                 +----+  |  +----+
                 |       |       |
               +-----+ +-----+ +-----+
               |LD-1 | |LD-1 | |LD-1 |  (plus one more)
               +-----+ +-----+ +-----+
```

### 4.3 Interfaces (tile ↔ robot ↔ node)

**Mechanical:**
- Androgynous docking ring (ADR-120):  
  - 120 cm OD, 3 capture petals, 3 kinematic seats, motorized latches  
  - Load: 10 kN axial, 5 kN shear, moment 5 kN·m  
- Grapple fixture (GF-20): 20 cm standardized grapple point for arms and drones

**Electrical:**
- Primary: 200 VDC (nominal), 0–100 A per port (hot-swap controlled)
- Secondary: 28 VDC service, 0–20 A
- Pre-charge + arc-fault detection required

**Data:**
- Internal wired: TSN Ethernet over rugged connectors for docked operations
- External: optical inter-robot links (short range), Ka-band to relay, UHF backup

---

## 5) Subsystems breakdown (with key requirements)

### 5.1 Structures & mechanisms
- CFRP/aluminum hybrid bus; radiation-tolerant coatings
- Arm joints with harmonic drives or cycloidal reducers, dry lubricants (MoS₂ / sputtered coatings)  
- Latches designed for dust/contamination tolerance (future: asteroid regolith environment)

### 5.2 Power generation/storage
- Deployable solar arrays sized for peak operations at 1 AU
- 200 VDC distribution reduces I²R losses for arm motors and thrusters
- Batteries sized for eclipse/transient loads (even in heliocentric, you want buffer for peaks)

### 5.3 Propulsion & GNC
- Electric propulsion for efficient repositioning between work sites
- Plume management: keep ion thruster plumes away from PV surfaces (operational constraints + geometry)
- Close-proximity ops use low-contamination RCS modes

### 5.4 Robotics: arms, end-effectors, tools
**Standard tool interface (STI-50):**
- Mechanical: 50 mm quick-change, 3-point kinematic mount
- Electrical: 48 V + data, plus optional high-power pins
- Fluid: optional (future) for adhesives/cleaners

**Tool set (Phase 1 minimal):**
- Torque tool (1–50 N·m)
- Connector mate tool (guided insertion)
- Cable/harness routing tool (spool + clips)
- Cutter/stripper (limited, with debris capture)
- Metrology wand (fiducial reader + retroreflector)
- Patch applicator (thin-film repair patches, UV-curable)

### 5.5 Avionics & compute
- Rad-hard flight computer (baseline) + high-performance co-processor for vision (shielded COTS acceptable with redundancy)
- Deterministic control loops for arms (1–2 kHz internal)
- Time sync across cell (PTP-like) for coordinated metrology

### 5.6 Thermal
- Radiators sized for continuous motor/drive heat rejection
- Keep arm joints within lubricant limits (heater strips + thermostatic control)
- Sun-prox operations later will require reflective sunshields and higher-temp materials; Phase 1 stays conservative

### 5.7 Fault management & safety
- Force/torque limits and “soft contact” modes
- Safeing: freeze joints, back away using RCS, isolate power ports
- Debris control: capture bags for cuttings; avoid free-floating fasteners (prefer captive fasteners)

---

## 6) Autonomy, control, and communications

### 6.1 Autonomy level target
Phase 1 should aim for **supervised autonomy**:
- Humans define goals and approve critical steps
- Robots execute sequences with local perception and error recovery

**Why:** latency to 1 AU is manageable (minutes), but continuous teleop is inefficient. Autonomy is the throughput lever.

### 6.2 Control modes
1. **Free-flight navigation** (relative GN&C using fiducials + lidar)  
2. **Proximity ops** (keep-out zones, collision cones, speed limits)  
3. **Contact ops** (impedance control, force-limited insertion, compliance)  
4. **Cooperative manipulation** (AT-1 holds; DW-1 works; LD-1 observes)

### 6.3 Communications architecture
- **Local cell network:** optical links (Gbps-class) for video + metrology data; fallback UHF
- **Backhaul:** Ka-band to relay spacecraft; store-and-forward if needed
- **Cybersecurity:** signed command sequences; authenticated firmware; tamper-evident logs (important for non-profit governance and safety)

---

## 7) Manufacturing considerations

### 7.1 Design for manufacturability (DFM) on Earth first
- Use existing space-qualified components where possible (star trackers, rad-hard processors, Hall thrusters)
- Arms: leverage heritage from on-orbit servicing robotics, but simplify:
  - fewer unique joint types
  - modular joint cartridges for replacement
- Standardize harnessing and connectors across all robot classes

### 7.2 Design for serviceability in space
- Robots will be repaired by other robots:
  - external access panels
  - blind-mate connectors
  - “robot-friendly” fasteners (large heads, captive, torque-limited)

### 7.3 Materials and contamination
- Low outgassing materials (NASA ASTM E595 class)
- Avoid silicone contamination near PV
- Thruster plume constraints baked into flight rules

---

## 8) Development roadmap & TRL plan

### 8.1 Phase 1A (0–24 months): ground prototypes + HIL
- Build full-scale arm joint prototypes, endurance testing
- Develop metrology stack: fiducials, lidar alignment, connector mating automation
- Hardware-in-the-loop facility with air-bearing floors + robot arms + VR operator station

**Exit criteria:**  
- 1,000+ successful connector mate cycles  
- 500+ docking cycles with ADR-120 mockups  
- Demonstrated autonomous recovery from misalignment and partial latch

### 8.2 Phase 1B (24–48 months): orbital demo mission (LEO)
- Launch 1× DW-1 + 2× LD-1 + a mock tile pallet to LEO
- Demonstrate proximity ops, tool changes, cable routing, patching
- Optionally include a small AT-1-like handler or use a hosted platform

**Exit criteria:**  
- 100+ hours contact ops  
- Autonomous docking success rate >99% in controlled scenarios  
- Verified contamination and debris control

### 8.3 Phase 1C (48–72 months): heliocentric pilot cell at ~1 AU
- Deploy first full assembly cell
- Assemble first 100–500 operational tiles
- Iterate tooling and autonomy updates via uplinked software

**TRL targets:**  
- AT-1: TRL 6 by heliocentric pilot  
- DW-1: TRL 7 by pilot (after LEO demo)  
- LD-1: TRL 7 early (simpler)

---

## 9) Cost analysis / budget estimate (order-of-magnitude)

### 9.1 Non-recurring engineering (NRE)
Assuming “new but heritage-based” robotics with space qualification:

- AT-1 development (NRE): **$450M–$800M**  
- DW-1 development (NRE): **$250M–$450M**  
- LD-1 development (NRE): **$80M–$150M**  
- Docking/tooling standards + node hub: **$150M–$300M**  
- Ground test facilities + HIL: **$100M–$250M**  
- LEO demo mission (launch + ops): **$200M–$500M**

**Total Phase 1 robotics NRE:** **~$1.2B–$2.45B**

### 9.2 Recurring unit costs (after qualification, low-rate initial production)
- AT-1: **$60M–$120M** each (complex arms + EP)  
- DW-1: **$20M–$45M** each  
- LD-1: **$2M–$6M** each  
- Node hub + tool pallet: **$30M–$80M** per cell

### 9.3 First operational deployment (one full cell)
Example: 1 cell = 1×AT-1 + 2×DW-1 + 4×LD-1 + node/tooling  
- Hardware recurring:  
  - AT-1 (1): $60–120M  
  - DW-1 (2): $40–90M  
  - LD-1 (4): $8–24M  
  - Node/tooling: $30–80M  
  - Spares (15%): $20–50M  
  - **Subtotal:** ~$158M–$364M
- Launch + integration (depends heavily on provider, mass, rideshare): **$150M–$500M**
- Ops for 2 years (staffing, comms, analysis): **$80M–$200M**

**Total first-cell deployment cost:** **~$388M–$1.06B** (excluding NRE)

**Assumption note:** Costs reflect aerospace-grade robotics with high reliability. Aggressive use of COTS (with shielding/redundancy) can reduce costs but increases risk.

---

## 10) Risk assessment (top risks and mitigations)

### 10.1 Technical risks
1. **Connector mating failures / tolerance stack-ups**  
   - Mitigation: kinematic alignment, compliance control, extensive cycle testing, connector cleaning tools  
2. **Arm joint wear, lubrication failure**  
   - Mitigation: dry lube coatings, joint heaters, conservative loads, modular joint replacement  
3. **Contamination of PV surfaces (thruster plumes, outgassing, debris)**  
   - Mitigation: operational keep-out, plume-safe RCS, material controls, debris capture protocols  
4. **Autonomy brittleness in unstructured scenarios**  
   - Mitigation: supervised autonomy with bounded behaviors; robust “call for help” modes; simulation at scale  
5. **Radiation upsets in high-performance compute**  
   - Mitigation: rad-hard supervisor + watchdogs; TMR for critical; checkpoint/rollback

### 10.2 Programmatic risks
1. **Interface drift** (tiles and robots evolve separately)  
   - Mitigation: enforce interface control documents (ICDs) and governance; qualification gates  
2. **Underestimating ops complexity**  
   - Mitigation: design for maintainability; high-fidelity ops sims; incremental autonomy deployment  
3. **Launch cadence constraints**  
   - Mitigation: maximize reuse; pack multiple robots per launch; prioritize early on-orbit servicing capability

---

## 11) Open engineering questions (to close early)

1. **Tile architecture finalization:** mass, stiffness, deployment mechanism strongly affect robot force/precision needs.  
2. **Best primary power bus voltage:** 120 V vs 200–300 V trade between arcing risk and mass efficiency.  
3. **Docking standard geometry:** choose ADR-120 vs smaller/larger; load cases for tile handling.  
4. **Propulsion contamination policy:** acceptable plume exposure thresholds for thin-film PV (needs testing).  
5. **Thermal regime for later phases:** how far sunward Phase 1 robots must operate; drives material choices.  
6. **Repair philosophy:** patch vs replace—what fraction of tile defects should be fixed on-site?  
7. **Autonomy certification:** what safety case is acceptable for non-profit governance and public trust?  
8. **In-space spares strategy:** how many joint cartridges, cameras, thrusters per cell for 2-year autonomy?

---

## 12) Opinionated recommendation (what I would build first)
1. **Lock the interfaces** (grapple, docking, power/data) before optimizing anything else.  
2. Build **DW-1 first** and fly it in LEO with a realistic mock tile pallet; it derisks the hardest part (contact ops + connectors).  
3. In parallel, build AT-1 arm joints and docking hardware and beat them up in life testing.  
4. Design the first heliocentric cell to be **serviceable by itself**—assume no rescue mission.

---

If you share your assumed **tile mass/power**, target **deployment orbit (AU)**, and whether Phase 1 includes a **central “node” spacecraft** or is fully free-flying, I can tighten the sizing (arm torques, prop load, power system, and throughput model) and produce a more concrete cell-level production rate and logistics plan.