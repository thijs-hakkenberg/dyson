---
bomId: "bom-3-8"
itemName: "Shell Construction and Maintenance Swarm"
itemSlug: "shell-construction-maintenance-swarm"
modelId: "gpt-5-2"
modelName: "GPT-5.2"
generated: "2026-02-07"
phase: "phase-3"
---

# Phase 3 Technical Proposal: Shell Construction and Maintenance Swarm (`shell-construction-maintenance-swarm`, bom-3-8)
**Project Dyson — Matroska Brain / Phase 3**

This proposal specifies the autonomous robotic “field workforce” that **deploys, aligns, inspects, repairs, cleans, and de-orbits/recycles** Phase 3 shell hardware (compute tiles, radiator membranes, optical relays, power-beam nodes, cabling/booms, and metrology beacons). It is **distinct** from the self-replicating manufacturing foundries (bom-3-4): foundries *make parts*; this swarm *turns parts into a functioning shell and keeps it functioning for centuries*.

I assume Phase 0–2 infrastructure exists (prospecting, mining, transport, mass drivers, assembly robots, tugs, swarm control). Phase 3 adds: (1) much larger surface areas, (2) much tighter optical/thermal tolerances, (3) extreme node counts, (4) multi-AU latency, and (5) continuous micrometeoroid damage. The swarm is designed around **high parallelism, graceful degradation, and strict safety constraints**.

---

## 1. Recommended approach & design philosophy

### 1.1 Core philosophy
1. **“Cellular construction”**: Build each shell as a mosaic of **standardized cells** (patches) with local autonomy. Each cell is a manageable area (e.g., 1–10 km² depending on layer) that can be commissioned, maintained, and isolated without global coordination.
2. **ORU-first design**: Every shell element is an **Orbital Replaceable Unit** with robotic-friendly interfaces (blind-mate power/data/thermal, grappling, fiducials, standardized fasteners).
3. **Three-tier robotics**:
   - **Heavy assemblers**: move/position large membranes and structural spines; provide high-impulse station-keeping.
   - **Medium “crew” robots**: tile placement, relay installation, power nodes, local logistics.
   - **Micro-servicers**: inspection, patching, cleaning, metrology, connector work, and “leak sealing” of heat pipes / coolant loops where applicable.
4. **Metrology is the real structure**: shells are not rigid spheres; they are **controlled formations**. The “structure” is maintained by continuous sensing + gentle thrusting + tension management.
5. **Fail-operational**: assume **1–5% hardware attrition/year** across exposed surfaces. The swarm must outpace damage and prevent cascading failures (tears, contamination, misalignment, beam hazards).

### 1.2 What this swarm must achieve (top-level requirements)
- **Deployment throughput**: sustain shell area growth consistent with foundry output; target initial operational capability (IOC) at ~10¹² compute tiles overall (consensus), implying **tile placement rates of 10⁷–10⁹ tiles/day** across all layers during peak build.
- **Alignment**:
  - Compute/radiator patch pointing: typically **10–100 µrad** class (thermal flux coupling tolerance).
  - Optical comm relays: **sub-µrad** pointing (handled by relay gimbals, but installation must meet coarse alignment).
  - Power beaming nodes: strict exclusion zones + verified pointing before enable.
- **Maintenance**:
  - Detect/triage damage down to **mm–cm punctures** (membranes, heat pipes) and **tile-level failures**.
  - Prevent tear propagation: respond within **hours to days** locally.
- **Contamination control**: keep optical and IR spectral surfaces within reflectivity/emissivity budgets; manage dust and thruster plume deposition.

---

## 2. System architecture (with diagrams)

### 2.1 Hierarchical “Cell / Yard / Ring” organization
Each shell layer is divided into **Rings** (orbital bands), subdivided into **Yards** (logistics + staging), subdivided into **Cells** (construction/maintenance zones).

```
Sun
 |
 |   [Inner shell]  ---> outward thermal cascade
 |
 +----------------------------------------------------+
 |                    SHELL LAYER i                    |
 |                                                    |
 |  Ring A:  [Yard A1] [Yard A2] ...                   |
 |            |Cell|Cell|Cell|                         |
 |                                                    |
 |  Ring B:  [Yard B1] [Yard B2] ...                   |
 |            |Cell|Cell|Cell|                         |
 +----------------------------------------------------+

Each Cell has:
- local metrology beacons
- local traffic control
- local robot pool (medium + micro)
- cached spares and patch material
```

### 2.2 Functional blocks
```
                 +-----------------------------------+
                 | Distributed OS (bom-3-5)          |
                 | - policies, safety, scheduling    |
                 | - long-horizon planning           |
                 +-----------------+-----------------+
                                   |
                                   | (delayed, eventual consistency)
                                   v
+-------------------+   +-------------------+   +-------------------+
| Ring Supervisor   |-->| Yard Supervisor   |-->| Cell Controller   |
| (routing + safety)|   | (logistics)       |   | (real-time ops)   |
+---------+---------+   +---------+---------+   +---------+---------+
          |                       |                       |
          v                       v                       v
  Heavy assemblers         Medium crew bots         Micro-servicers
 (tugs, membrane ops)     (tile install/replace)   (inspect/patch/clean)
```

**Key point:** Real-time collision avoidance, docking, and patching is **local** (Cell Controller). The Distributed OS provides **policy envelopes** and resource allocation, not joystick control.

---

## 3. Fleet composition and quantitative sizing

### 3.1 Fleet classes (baseline)
Consensus BOM range: **10⁶–10⁸ robots total**. I recommend planning around **~3×10⁷ total active units** at maturity, with surge capacity from replication.

| Class | Role | Typical count | Mass (each) | Power (avg/peak) | Propulsion |
|---|---|---:|---:|---:|---|
| H-class Heavy Assembler Tug (“HAT”) | Move/hold membranes, tow pallets, station-keep yards | 10⁴–10⁵ | 20–80 t | 50 kW / 5 MW | Electric (Hall/MPD) + cold-gas micro |
| M-class Modular Construction Bot (“MCB”) | Tile placement, ORU swaps, relay/power node install | 10⁶–10⁷ | 200–800 kg | 2 kW / 50 kW | Electric + microthrusters |
| S-class Service Drone (“SSD”) | Inspection, cleaning, small patching, connector work | 10⁷–10⁸ | 5–50 kg | 50 W / 2 kW | Cold-gas + subliming prop + tiny electric |
| P-class Patch/Seal Microbot (“PSM”) | Tear arrest, membrane patch welding/bonding | 10⁷–10⁸ (often docked) | 0.2–2 kg | 5–50 W | reaction wheels + puffers |
| C-class Cargo Pod (“CAP”) | Autonomous pallets of spares/patch film/fasteners | 10⁶–10⁷ | 50–500 kg | 10–200 W | minimal (towed or small thrusters) |

**Why this mix:** Heavy units are expensive and few; most work is done by cheap, redundant servicers and patch bots. This matches the expected failure environment.

### 3.2 Throughput sizing (assumptions & back-of-envelope)
Assume peak build places **10⁸ tiles/day** across all layers (not per layer), with each M-class bot installing **~20 tiles/day** (including transit, alignment, verification).  
Required M-class ≈ 10⁸ / 20 = **5×10⁶ M-class** active installers. That sits inside the 10⁶–10⁷ band.

Maintenance: if 1% of 10¹² tiles fail/year → 10¹⁰ tile interventions/year → ~3×10⁷/day. Most are handled by **swap drones + local redundancy**; not all require physical replacement immediately. Plan for **1–5×10⁶ M-class** doing replacements continuously plus **10⁷–10⁸ S/PSM** doing inspection and patching.

---

## 4. Detailed technical specifications (per robot class)

### 4.1 H-class Heavy Assembler Tug (HAT)
**Primary mission:** membrane/radiator module handling, yard station-keeping, towing “sheet reels,” holding tension while patch teams work.

- **Mass:** 20–80 metric tons (configurable)
- **Dimensions:** 12–30 m bus + deployable booms to 50–150 m
- **Power:**
  - Average 50–200 kW (housekeeping, avionics, comms, pumps)
  - Peak 1–5 MW for high-thrust electric propulsion bursts (power drawn from local layer HVDC or beamed power node per bom-3-7)
- **Propulsion:**
  - Primary: MPD or high-power Hall thrusters (Isp 2,000–6,000 s)
  - Secondary: cold-gas microthrusters for plume-clean operations near sensitive surfaces
- **Manipulation:**
  - 2–6 robotic arms, 10–30 m reach, end-effectors: grapples, rollers, clamp bars
  - “Tension winches” for membrane edge management (0.1–10 kN)
- **Navigation & sensing:**
  - Star trackers + optical nav
  - Lidar/radar for close ops
  - Retroreflector tracking of local beacons
- **Interfaces:**
  - Standard grapple fixtures on membrane reels and radiator spines
  - HVDC bus tie-in (1–20 kV class) with galvanic isolation

**Contamination control:** HATs must maintain **thruster keep-out cones**; near optical/IR surfaces they operate in “clean mode” (reaction wheels + cold gas only).

### 4.2 M-class Modular Construction Bot (MCB)
**Primary mission:** “install/replace/verify” for compute tiles, relay nodes, power interface units, and small radiator panels.

- **Mass:** 200–800 kg
- **Form factor:** 1.5×1.5×2.5 m bus; fold-out arms
- **Power:** 2 kW average, 10–50 kW peak (tooling, short thrust)
- **Propulsion:** electric thruster (0.05–0.5 N) + microthrusters for docking
- **Tools:**
  - Dual 2–4 m arms
  - Fastener driver (standardized quarter-turn captive latches)
  - Laser/ultrasonic weld/bond tool for structural tabs (where used)
  - Connector mate/demate tool for blind-mate power/data
- **Metrology:** camera + structured light; reads fiducials; can place temporary corner-cube reflectors
- **Performance target:** 10–30 tile ORU operations/day/bot depending on local density and traffic

### 4.3 S-class Service Drone (SSD)
**Primary mission:** inspection, cleaning, minor repairs, sensor placement, escort duties.

- **Mass:** 5–50 kg
- **Power:** 50–200 W average; up to 2 kW for brief tool use
- **Propulsion:** cold gas + small electric; very low plume momentum
- **Sensors:** multispectral cameras (VIS/NIR/thermal IR), dust counters, EM sniffers for arcing detection
- **Tools:** brushless “air-knife” equivalent (gas puff), electrostatic dust removal pad, micro-solder/adhesive dispenser
- **Swarm behavior:** operates in packs (5–50 units) for fast area scans

### 4.4 P-class Patch/Seal Microbot (PSM)
**Primary mission:** arrest membrane tears and seal punctures before they unzip.

- **Mass:** 0.2–2 kg
- **Power:** 5–50 W
- **Mobility:** reaction wheels + tiny puffers; can “crawl” using gecko-adhesive pads on designed crawlways (not on active optical surfaces)
- **Patch method options (layer-dependent):**
  1. **Thermoplastic film patch** + localized heating (fast, low power)
  2. **UV-cure resin** for polymer-backed membranes
  3. **Cold-spray metal** for metallic foils (requires consumable feed)
  4. **Laser stitch welding** for compatible alloys (higher power, less common)

**Design note:** membranes should include **tear-stop grids** (ripstop pattern, segmented panels, or embedded fibers). Microbots are the second line of defense.

---

## 5. Subsystems breakdown & interfaces

### 5.1 Common subsystems (all robot classes)
- **Avionics compute:** rad-hard + COTS-with-redundancy; local inference accelerators for vision
- **Timebase:** disciplined by local time authority nodes (part of bom-3-2 ecosystem)
- **Comms:** short-range optical (10–1,000 m) + RF fallback; uplink to yard relays
- **Power:** rechargeable solid-state batteries + supercaps for peak tools
- **Docking:** standardized **“service rail”** on shell elements for microbots; standardized **ORU grapple points** for M/H class
- **Safety kernel:** formally verified collision avoidance + beam keep-out compliance

### 5.2 Interfaces to other Phase 3 BOM items
- **Compute tiles (bom-3-1):** ORU swap interface
  - Blind-mate power: 0.3–3 kV DC (layer dependent)
  - Data: optical short-range transceiver alignment aids
  - Thermal: standardized heat spreader contact pads where applicable
- **Optical backbone (bom-3-2):** relay node installation and cleaning
  - Handling optics requires “no-plume” mode and dust protocols
- **Thermal radiators (bom-3-3):** membrane handling, patching, spectral surface preservation
- **Foundries (bom-3-4):** receive pallets, return scrap, request spares
- **Distributed OS (bom-3-5):** tasking, policy, audit logs
- **Logistics pipeline (bom-3-6):** capture and unpack cargo slugs; yard inventory control
- **Power distribution (bom-3-7):** docking recharge, beam receiver servicing, HVDC switchgear replacement

---

## 6. Autonomy, control, and communications requirements

### 6.1 Autonomy levels
- **Level 0 (local reflex):** collision avoidance, plume keep-out, emergency abort; runs on every unit.
- **Level 1 (cell autonomy):** closed-loop construction/repair within a cell; real-time scheduling; handles minutes-to-hours outages from higher layers.
- **Level 2 (yard autonomy):** inventory, traffic corridors, tug dispatch, quarantine operations.
- **Level 3 (OS governance):** global priorities, resource budgets, safety policy updates, forensic audits.

### 6.2 Communications architecture (practical)
- **Intra-cell:** short-range optical mesh (high density, low latency).
- **Cell-to-yard:** optical links to yard relay nodes.
- **Inter-yard / inter-layer:** rides bom-3-2 backbone.

**Assumption:** high-latency between shells makes centralized teleoperation infeasible. Human oversight is policy-level and exception-based.

### 6.3 Safety constraints (non-negotiable)
- **Power-beam exclusion enforcement:** robots must carry authenticated “beam-safe transponders.” Any unrecognized object in beam corridor triggers automatic beam inhibit (hardware interlock).
- **Optics contamination control:** thruster firings near sensitive surfaces require permission tokens + local confirmation.
- **Quarantine:** any robot exhibiting anomalous behavior (navigation drift, spoofing suspicion, tool misuse) is isolated to a “dead zone” for inspection/recycling.

---

## 7. Manufacturing and provisioning considerations

### 7.1 Design for replication and repair
Robots are built to be **manufacturable in the same foundries** that produce shell hardware, with:
- High tolerance to part variability
- Modular avionics trays
- Standard motor/actuator families
- Minimal exotic materials (save them for optics/semiconductors)

### 7.2 Materials
- Structure: aluminum-lithium, titanium, or carbon composites depending on layer temperature environment
- Bearings/actuators: dry lubricants (MoS₂, DLC coatings)
- Radiation: localized shielding around avionics (water/PE where available)

### 7.3 Consumables
- Cold gas / inert propellant (argon/nitrogen) for microthrusters
- Patch films, adhesives/resins, cold-spray powders
- Cleaning pads, electrostatic dust collectors

### 7.4 Yard infrastructure (robot-facing)
Each Yard includes:
- **Docking racks** (charge + data + inspection)
- **Tooling kiosks** (swap end-effectors)
- **Spare depots** (tiles, relays, HVDC breakers, membrane rolls)
- **Scrap compactors** and return pods to foundries

---

## 8. Development roadmap & TRL

### 8.1 Phased maturation
1. **Phase 2.5 demo (TRL 5–6):**  
   - Demonstrate M-class tile ORU swaps and membrane patching on Phase 2 collector satellites.
   - Validate contamination control protocols around optical comm terminals.
2. **Early Phase 3 pilot ring (TRL 7):**  
   - One “Ring” at a chosen radius with 10–100 Yards.
   - Prove cell autonomy, traffic management, and sustained repair rate under simulated micrometeoroid impacts (deliberate puncture tests).
3. **Scale-out (TRL 8–9):**  
   - Replication of robot production lines in foundries.
   - Introduce HAT fleet for large membrane handling at industrial tempo.
4. **Century operations:**  
   - Focus shifts from construction to maintenance, recycling, and upgrades.

### 8.2 Critical technology gaps
- Ultra-reliable autonomous docking at extreme traffic density
- Long-life actuators in dust + radiation environment
- High-confidence formal verification of safety kernels at swarm scale
- Patching methods that preserve **spectral-selective surfaces** (radiator coatings) without degrading emissivity/selectivity

---

## 9. Cost analysis (budget estimates)

Dollar costing is inherently abstract at this scale; I’ll provide **unit cost analogs** plus an “equivalent manufacturing capacity” view.

### 9.1 Rough unit costs (mature in-space production)
- HAT (20–80 t): **$20M–$200M** equivalent each (dominated by power electronics, thrusters, actuators)
- MCB (200–800 kg): **$0.2M–$2M** each
- SSD (5–50 kg): **$5k–$100k** each
- PSM (0.2–2 kg): **$200–$5k** each
- Cargo pods: **$10k–$200k** each

### 9.2 Program totals (order-of-magnitude)
For a mature fleet:  
- 5×10⁴ HAT @ $50M avg → **$2.5×10¹²**  
- 5×10⁶ MCB @ $0.5M avg → **$2.5×10¹²**  
- 5×10⁷ SSD @ $20k avg → **$1×10¹²**  
- 1×10⁸ PSM @ $1k avg → **$1×10¹¹**  
- Logistics pods & yard equipment → **$5×10¹¹–$2×10¹²**

**Total:** ~**$10¹²–$10¹³** equivalent, aligning with the consensus BOM range for bom-3-8 (**$10¹¹–$10¹³**, medium confidence). In practice the limiting currency is **foundry throughput** and **power**, not money.

---

## 10. Risk assessment

### 10.1 Top risks and mitigations
1. **Membrane tear cascades (catastrophic area loss)**
   - Mitigation: ripstop segmentation, tear-stop grids, embedded strain sensing, always-on PSM patrols, and rapid isolation (cut lines) to sacrifice small areas.
2. **Contamination of optical/IR surfaces**
   - Mitigation: no-plume zones, cold-gas only near optics, electrostatic dust removal, scheduled “wash” cycles with controlled collector surfaces, strict material outgassing specs.
3. **Traffic congestion / collision cascades**
   - Mitigation: cell-level air-traffic control, speed limits, geofenced corridors, verified autonomy kernel, “deadman” braking.
4. **Adversarial or runaway behavior (cyber-physical security)**
   - Mitigation: hardware root-of-trust, signed tasking, behavioral anomaly detection, quarantine yards, limited tool authority by role, and physically enforced beam interlocks.
5. **Propellant logistics bottleneck**
   - Mitigation: prioritize electric propulsion where possible, local propellant generation from volatiles (outer layers), and design operations to minimize Δv (formation-friendly scheduling).
6. **Repair can’t keep up with damage**
   - Mitigation: design shells with redundancy and graceful degradation; prioritize “availability per watt” rather than perfection; maintain large standing S/PSM fleets.

---

## 11. Open engineering questions (specific to bom-3-8)
1. **Cell size optimization:** what is the best cell area that balances local autonomy with logistics overhead (1 km² vs 100 km²)?
2. **Patching method vs radiator spectral selectivity:** can we patch without ruining Δλ/λ performance (consensus radiator challenge)?
3. **Thruster plume modeling:** what stand-off distances are required to prevent measurable emissivity/reflectivity drift over decades?
4. **Inspection modality:** best mix of thermal IR imaging, lidar, and electrical health checks to detect sub-mm punctures at scale?
5. **Robotic interface standards:** finalize ORU mechanical/electrical/optical fiducial standards so compute tiles, radiators, relays, and power nodes are all serviceable by the same M-class tooling.
6. **Governance:** what formal safety properties are provable for a 10⁷–10⁸ agent swarm under partial comms and Byzantine faults?

---

## 12. Opinionated design choices (what I would lock early)
1. **Standardize ORU interfaces across *everything*** (tiles, relays, power nodes, radiator modules). This is the single highest leverage decision for maintainability.
2. **Overbuild micro-servicers**: PSM/SSD units should be extremely cheap and numerous; they are your “immune system.”
3. **Treat yards as the unit of industrial scaling**: replicate yard templates the way you replicate foundries—yards are what turn parts into progress.
4. **Hard safety interlocks for power beams**: do not rely on software-only governance for multi-GW beams; enforce with physics (authenticated transponders + automatic inhibit).

---

If you want, I can follow this with (a) a **formal interface control document (ICD)** for ORU latches/power/data/fiducials, and (b) a **maintenance rate model** that ties micrometeoroid flux, membrane thickness/segmentation, and robot fleet size to expected steady-state availability per layer.