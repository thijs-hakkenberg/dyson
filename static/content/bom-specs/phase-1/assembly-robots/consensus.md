---
bomId: "bom-1-3"
itemName: "Assembly Robots"
itemSlug: "assembly-robots"
type: "consensus"
generated: "2026-02-01"
phase: "phase-1"
---

# Assembly Robots Technical Synthesis
## Phase 1 - Initial Swarm Deployment

---

## Key Specifications

All models agree on the following core specifications:

- **Heterogeneous robot architecture**: Multiple specialized robot classes (precision/dexterous workers, heavy structural handlers, and logistics drones) rather than a single general-purpose design
- **Manipulator configuration**: 6-7 DOF arms with force/torque sensing at the wrist, enabling compliant contact operations and precision assembly
- **Position accuracy requirements**: ±0.1–2.0 mm at end effector depending on task class (finer for electronics/connectors, coarser for structural work)
- **Power architecture**: 120–300 VDC primary bus with solar arrays sized for 1 AU operations; battery backup of 2.5–10 kWh depending on robot class for eclipse/peak operations
- **Propulsion approach**: Electric propulsion (Hall-effect thrusters, Isp 1,600–2,000 s) for repositioning combined with low-contamination cold/warm gas RCS for proximity operations
- **Standardized interfaces**: Universal docking ports, quick-change tool interfaces, and common grapple fixtures across all robot classes and swarm elements
- **Autonomy level**: Supervised autonomy with local perception, error recovery, and human approval for critical steps (accounting for 8–20 minute communication latency at 1 AU)
- **Design life**: 8–15 years with in-situ maintainability by other robots; modular components with standardized replacement interfaces
- **Radiation tolerance**: 100 krad TID minimum using radiation-hardened processors with COTS co-processors (shielded) for high-performance vision tasks

---

## Divergent Views

- **Heavy Handler Mass**: Claude specifies AR-S at 450 kg dry / 650 kg wet; GPT specifies AT-1 at 1,200 kg dry with 250 kg propellant; Gemini does not provide explicit mass figures for the structural class.

- **Boom/Reach Configuration**: Claude proposes a 25m telescoping boom for structural work; GPT specifies 8m tip-to-tip arm span for the heavy handler; Gemini does not specify reach dimensions.

- **Welding Capability**: Claude includes integrated 3 kW electron beam welding on the structural robot (AR-S); GPT and Gemini do not specify welding as a primary assembly robot function, implying mechanical fastening or pre-integrated joints.

- **Team/Cell Composition**: Claude recommends 9 robots per team (4 precision + 2 structural + 3 logistics); GPT recommends 7 robots per cell (1 heavy tug + 2 dexterous workers + 4 logistics drones); Gemini does not specify team composition.

- **Logistics Drone Payload**: Claude specifies AR-L at 150 kg dry with 200 kg cargo capacity; GPT specifies LD-1 at 60 kg dry with 20 kg payload capacity; Gemini does not provide logistics drone specifications.

- **Development Cost Estimates**: GPT provides detailed NRE estimates ($1.2B–$2.45B total) and per-unit recurring costs ($60–120M for heavy handler); Claude and Gemini do not provide cost estimates.

---

## Open Questions

1. **Tile/Collector Architecture Finalization**: What are the final mass (200–400 kg range cited), stiffness, and deployment mechanism specifications for swarm elements? These directly drive robot force, torque, and precision requirements.

2. **Welding vs. Mechanical Joining**: Should structural assembly rely on electron beam welding (requiring vacuum-compatible systems and thermal management) or standardized mechanical fasteners with robotic torque tools? Trade involves mass, reliability, and rework capability.

3. **Propulsion Contamination Thresholds**: What are acceptable plume exposure limits for thin-film photovoltaics? This determines keep-out zones, RCS propellant selection, and operational constraints during proximity operations.

4. **Repair Philosophy**: What fraction of tile defects should be repaired on-site versus replaced? This affects tool inventory, spares strategy, and robot capability requirements (patching vs. module swap).

5. **Thermal Regime for Later Phases**: How close to the Sun must Phase 1 robots operate? Operations inside 0.7 AU require significant thermal redesign (reflective sunshields, high-temperature lubricants, enhanced radiators).

6. **Autonomy Certification and Safety Case**: What level of autonomous decision-making is acceptable for non-profit governance and public trust? This affects software architecture, verification requirements, and operational protocols.

---

## Recommended Approach

1. **Lock interface standards first**: Finalize mechanical grapple/docking fixtures, power bus voltage (recommend 200 VDC as compromise), data protocols, and metrology fiducial specifications before optimizing individual robot designs.

2. **Adopt three-class heterogeneous architecture**: Implement specialized precision/dexterous workers (400–500 kg class), heavy structural handlers (600–1,200 kg class), and lightweight logistics drones (60–150 kg class) to optimize mass and capability for distinct task domains.

3. **Prioritize dexterous worker development and LEO demonstration**: The contact operations, connector mating, and cable routing tasks represent the highest technical risk; fly a DW-1/AR-P class robot with realistic mock payloads in LEO within 24–48 months to retire risk.

4. **Design for robot-serviceable modularity**: All robots must be maintainable by other robots with no Earth-return required; implement external access panels, blind-mate connectors, captive fasteners, and standardized joint cartridges for field replacement.

5. **Implement graceful degradation**: Design all robots to continue useful operation with up to 30% subsystem failure through redundant actuators, distributed computing, and dynamic role reconfiguration within the team/cell.

6. **Establish contamination and debris control protocols**: Specify low-outgassing materials (NASA ASTM E595), define thruster plume keep-out zones, require debris capture for all cutting operations, and mandate captive fasteners throughout.

7. **Plan incremental autonomy deployment**: Begin with supervised autonomy (human goal-setting, robot execution with local error recovery), then expand autonomous capability based on demonstrated reliability and operational experience at 1 AU.