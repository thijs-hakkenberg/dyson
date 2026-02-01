---
bomId: "bom-1-3"
itemName: "Assembly Robots"
itemSlug: "assembly-robots"
type: "consensus"
generated: "2026-02-01"
phase: "phase-1"
---

# Consensus Technical Specifications: Assembly Robots
## Phase 1 - Initial Swarm Deployment

---

## Key Specifications

All three models agree on the following core specifications and design principles:

- **Multi-class robot architecture**: All models reject a single universal robot in favor of specialized classes—heavy manipulators (2,400 kg / 1,200 kg / 1,200 kg), precision assemblers (180 kg / 45 kg / 450 kg), and logistics/transport units (600 kg / 62 kg / 60 kg)

- **Primary propulsion**: Hall-effect thrusters with xenon propellant, achieving Isp of 1,600–2,000 seconds for efficient repositioning between work sites

- **Manipulation precision**: Sub-millimeter positioning accuracy required (±0.5mm for heavy manipulators, ±0.1mm for precision work)

- **Power architecture**: Solar arrays as primary power source (GaAs triple-junction cells), with lithium-based battery storage (2–15 kWh depending on class) for peak loads and eclipse operations

- **Radiation hardening**: All flight computers require radiation-hardened processors (LEON4, RAD750, or equivalent) with Triple Modular Redundancy (TMR) for critical functions

- **Standardized interfaces**: Universal mechanical grapple/docking fixtures, standardized power buses (28V service + higher voltage primary), and common data protocols across all robot classes

- **Autonomous operation**: Level 4+ autonomy required due to communication latency; hierarchical control with local coordination and Earth-based strategic oversight

- **Design life**: 5–20 years depending on robot class, with emphasis on graceful degradation over traditional redundancy

- **Communication**: Multi-layer architecture combining Ka/X-band for Earth link, optical inter-satellite links for high-bandwidth local coordination, and UHF backup

---

## Divergent Views

- **Heavy Manipulator Mass**: Claude recommends 2,400 kg Welder-class with 6.5m arm reach and 500 kg payload capacity; Gemini prefers 45 kg Weaver-class hexagonal drones forming "super-bots" for heavy loads; GPT suggests 1,200 kg AT-1 Assembly Tug with 4m reach and 500 N end-force

- **Precision Assembler Design Philosophy**: Claude proposes 180 kg eight-legged Spider-class for traversing 3D structures; Gemini integrates manipulation into the 45 kg Weaver's six 3-DOF arms; GPT recommends 450 kg DW-1 with two 7-DOF arms and quick-change end-effectors

- **Primary Joining Technology**: Claude specifies electron beam welding (60–150 kV, up to 25 kW) and friction stir welding as primary methods; Gemini assumes snap-fits and thermal welding with zero screws; GPT focuses on mechanical latching with kinematic docking and compliant connectors

- **Unit Cost Targets**: Claude estimates $12M–$45M per unit at production rates; Gemini targets $235,000 per unit through radical simplification and swarm redundancy; GPT estimates $20M–$120M per unit depending on class

- **Operating Distance from Sun**: Claude designs specifically for 0.5 AU (5,480 W/m² solar flux) with extensive thermal management; Gemini targets Mercury-Sun Lagrange point; GPT recommends conservative 0.7–1.0 AU operations for Phase 1

- **Production Rate Philosophy**: Claude targets 350 robots total for Phase 1; Gemini targets 10,000 units/month by end of Phase 1; GPT proposes modular "Assembly Cells" scaled incrementally

---

## Open Questions

1. **Thermal Management at Inner Solar System**: How to maintain component temperatures within operational limits at 0.5 AU or closer? Passive radiators vs. active cooling loops—what is the mass/reliability trade?

2. **Joining Technology Selection**: What is the optimal mix of welding (E-beam, FSW), mechanical fastening, and adhesive bonding for solar collector structures? How do these perform over decades of thermal cycling?

3. **Contamination Control**: How to prevent thruster plumes, outgassing, and debris from degrading thin-film photovoltaics and optical sensors? What are acceptable exposure thresholds?

4. **Autonomy Certification**: What safety case and verification approach is acceptable for fully autonomous assembly operations with no human-in-the-loop for extended periods?

5. **Dust and Debris Management**: How to keep optical sensors and laser communications clean without consumables, especially if operating near asteroid-sourced materials?

6. **Tile/Collector Interface Finalization**: What are the final mass, stiffness, and deployment mechanisms for swarm elements? These strongly drive robot force, precision, and throughput requirements.

---

## Recommended Approach

1. **Adopt a three-class robot architecture** with standardized interfaces: a heavy handler (1,000–2,500 kg class) for positioning large assemblies, a dexterous worker (150–500 kg class) for precision tasks, and logistics drones (50–100 kg class) for material transport—balancing Claude's specialization philosophy with GPT's "Assembly Cell" modularity

2. **Lock interface standards before detailed design**: Define universal grapple fixtures, docking rings, power/data connectors, and metrology targets as binding requirements across all robot and tile designs, following GPT's emphasis on interface control

3. **Prioritize mechanical joining over welding for Phase 1**: Use kinematic docking, compliant latches, and captive fasteners as primary assembly methods to reduce technology risk; develop welding capability in parallel for Phase 2 structural applications

4. **Design for 0.7–1.0 AU initial operations** with growth path to 0.5 AU: Begin with conservative thermal environment to accelerate deployment, incorporating Claude's thermal-first design principles for later phases

5. **Implement supervised autonomy with bounded behaviors**: Deploy hierarchical control (strategic planning from Earth, tactical coordination locally, reflexive safety at hardware level) with robust "call for help" modes and human approval gates for critical operations

6. **Execute phased development with early orbital demonstration**: Ground prototypes (Years 1–2), LEO demonstration mission (Years 2–4), heliocentric pilot cell (Years 4–6), following the convergent roadmap across all models

7. **Design all robots for in-space serviceability**: External access panels, blind-mate connectors, modular joint cartridges, and robot-friendly fasteners—assume repair by peer robots with no Earth return option