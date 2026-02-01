---
bomId: "bom-2-2"
itemName: "Maintenance Drones"
itemSlug: "maintenance-drones"
type: "consensus"
generated: "2026-02-01"
phase: "phase-2"
---

# Maintenance Drones - Phase 2 Swarm Expansion
## Consensus Technical Specification

---

## Key Specifications

All three models agree on the following core specifications:

- **Multi-class drone architecture**: Fleet consists of smaller inspection/scout drones (14-52 kg) and larger repair/servicer drones (180-320 kg), with specialized roles rather than universal capability
- **Solar-electric propulsion**: Hall-effect thrusters with xenon propellant as primary propulsion (Isp 1,500-2,000 s), cold-gas nitrogen thrusters for proximity operations and attitude control
- **Power generation**: Triple-junction GaAs solar arrays sized for 0.6-1.2 AU operations, with battery backup capacity of 0.5-5+ kWh depending on drone class
- **Depot-centric operations**: Regional maintenance depots (spacing varies by model) provide refueling, spare parts storage, tool exchange, and communications relay to Earth
- **Standardized mechanical interfaces**: All swarm elements must incorporate standardized grapple points, docking features, and modular Orbital Replaceable Units (ORUs) for efficient maintenance
- **Level 4+ autonomy required**: Light-lag to Earth (8-16+ minutes round-trip) necessitates autonomous fault detection, task execution, and contingency handling with human oversight for exceptions
- **Mesh communications architecture**: Drone-to-drone and drone-to-depot local networking (S-band or Ka-band), with depots serving as Earth communication gateways
- **Force-controlled manipulation**: Robotic arms with 6-7 DOF, force/torque sensing at end-effectors, and compliant contact dynamics to prevent damage during servicing operations
- **Design lifetime**: 10-15 years with depot-based refurbishment and module replacement

---

## Divergent Views

- **Fleet sizing and class structure**: Claude recommends three drone classes (35,000 Inspectors, 12,000 Technicians, 3,000 Constructors) for 10M satellites; Gemini proposes a single "Weaver" class (5,000 units) with modular payload; GPT advocates two tiers (MD-A Inspectors and MD-B Servicers) with fleet size dependent on swarm density and failure rates.

- **Repair philosophy**: Claude supports component-level repair with onboard welding/brazing capability; Gemini strongly advocates "Swap-and-Drop" doctrine (replacement only, no in-situ repair) to reduce complexity; GPT takes a middle position recommending swap-first with advanced repair deferred to Phase 3.

- **Inspector drone mass**: Claude specifies 45-52 kg wet mass; Gemini does not include a separate inspector class; GPT specifies 14-15 kg for MD-A micro-drones, arguing smaller mass enables higher fleet numbers and faster inspection throughput.

- **Manipulator configuration**: Claude recommends 7-DOF dual arms on repair drones; Gemini proposes a "Tri-Hand" system (2 anchor arms + 1 precision worker arm); GPT recommends 2× 7-DOF arms with quick-change tool couplers and separate tool interface standard.

- **Hall thruster inclusion on inspection drones**: Claude includes 2× 25mN Hall thrusters on Class A Inspectors; GPT explicitly recommends no Hall thrusters on MD-A to reduce complexity, relying on dense depot placement; Gemini's single-class Weaver includes Hall thrusters for all units.

- **Unit cost estimates**: Claude estimates $195K-$885K per drone depending on class; Gemini estimates $825K per Weaver unit at 5,000 quantity; GPT estimates $0.4-1.2M for MD-A and $8-20M for MD-B, noting robotic arms dominate servicer costs.

---

## Open Questions

1. **Optimal depot spacing and logistics architecture**: What is the ideal distance between maintenance depots, and should propellant be delivered by dedicated tanker drones or centralized hub returns? All models identify this as critical to fleet sizing and propulsion requirements.

2. **Autonomous authority limits**: How much repair authority should drones have without human approval? Communication latency makes Earth-based approval impractical for routine operations, but risk thresholds for autonomous action remain undefined.

3. **Thermal management inside 1 AU**: If Phase 2 extends to 0.3-0.6 AU orbits, current thermal designs may be inadequate. What operational constraints, radiator sizing, or array feathering strategies are required for high-flux environments?

4. **Contamination and dust accumulation**: How do drones clean themselves and avoid contaminating sensitive collector optics during proximity operations? Electrostatic repulsion and plume impingement constraints remain unresolved.

5. **Cold-welding and mechanism degradation**: Will mechanical latches, grapple mechanisms, and tool interfaces experience cold-welding or lubricant degradation after years of vacuum exposure and thermal cycling?

6. **Swarm element failure mode distribution**: What fraction of failures are recoverable by ORU swap versus requiring in-situ repair, structural patching, or full element replacement? This drives the balance between inspector and servicer fleet sizes.

---

## Recommended Approach

1. **Adopt a two-tier heterogeneous fleet architecture** with lightweight inspection drones (15-50 kg class) for continuous patrol and fault detection, and medium servicer drones (180-250 kg class) for ORU replacement and moderate repairs. Defer heavy construction/salvage capability to Phase 3 pending operational data.

2. **Mandate standardized maintenance interfaces on all swarm elements** before Phase 2 deployment begins. This includes kinematic datum patterns for repeatable positioning, blind-mate electrical connectors with arc mitigation, and ORU sizing limits (≤8 kg for inspector-serviceable, ≤60 kg for servicer-serviceable).

3. **Prioritize swap-and-replace operations over in-situ repair** for Phase 2 to reduce robotic complexity and increase sortie tempo. Advanced repair capabilities (welding, brazing, conductor rework) should be developed in parallel but deployed only after basic logistics are proven.

4. **Establish depot-centric operations** with regional maintenance stations providing refueling, spare parts, tool exchange, and communications relay. Initial depot spacing should support inspector patrol ranges of 150-200 days and servicer mission ranges of 60-90 days without return.

5. **Deploy inspection fleet first** to build reliability datasets, validate digital twin models, and characterize actual failure modes before committing to final servicer fleet sizing and tool loadouts.

6. **Invest heavily in fleet management software** including predictive maintenance algorithms, spares optimization, task scheduling, and anomaly triage. Autonomous coordination at scale is the critical enabler for swarm maintainability.

7. **Conduct technology maturation programs immediately** for: (a) miniaturized space manipulators, (b) AI-based fault classification and repair planning, (c) space-qualified welding/brazing (for Phase 3 readiness), and (d) large-scale swarm coordination algorithms.