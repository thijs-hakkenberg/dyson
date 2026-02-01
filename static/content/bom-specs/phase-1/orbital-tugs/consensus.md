---
bomId: "bom-1-6"
itemName: "Orbital Tugs"
itemSlug: "orbital-tugs"
type: "consensus"
generated: "2026-02-01"
phase: "phase-1"
---

# Orbital Tugs Technical Synthesis
## Phase 1 - Initial Swarm Deployment

---

## Key Specifications

All models converge on the following technical parameters:

- **Propulsion Architecture**: Solar-electric propulsion (SEP) using Hall-effect thrusters as the primary propulsion system, with specific impulse in the 1,600–3,000 s range
- **Power System**: Solar arrays sized for 50–480 kW at 1 AU, with high-voltage DC bus (100–300 V) optimized for electric propulsion power processing units
- **Dry Mass Range**: 900–1,200 kg for the primary tug bus (excluding propellant and payload)
- **Payload Capacity**: 3,000–8,000 kg typical payload mass per sortie
- **Xenon Propellant Storage**: 600–2,000 kg capacity using composite overwrapped pressure vessels (COPVs) at 250–300 bar
- **Design Lifetime**: 7–15 years operational life with thruster hours exceeding 20,000–25,000 hours
- **Autonomy Requirement**: Full autonomous navigation, rendezvous, and docking capability with 30-day operational independence from ground control
- **Docking Standard**: IDSS-compatible or standardized androgynous docking interface for fleet interoperability
- **Attitude Control**: 4-wheel reaction wheel assemblies with thruster gimbal authority (±5°) for momentum management
- **Redundancy Philosophy**: Dual-string avionics, multiple thruster units (2+2 or 4 total), and triple-redundant flight computers

---

## Divergent Views

- **Fleet Architecture**: Claude recommends a single standardized tug design optimized for mass production and fleet economics; GPT proposes a two-tier fleet with Class E (50 kW electric freight) and Class H (20 kW hybrid with chemical backup); Gemini's position is not specified in the provided input.

- **Chemical Propulsion Inclusion**: Claude explicitly excludes chemical propulsion as "economically absurd" for cargo transport within 3 AU; GPT strongly advocates for storable bipropellant capability (MMH/NTO, 320 s Isp) on service tugs for safety margins, collision avoidance, and rapid repositioning.

- **Power System Sizing**: Claude specifies 2,400 m² arrays generating 480 kW BOL for high-throughput operations; GPT recommends more modest 28–70 kW systems for Phase 1, scaling later; this represents a ~7× difference in power class.

- **Refueling Strategy**: Claude assumes in-situ refueling capability as a baseline design requirement; GPT recommends starting with tank-swap logistics at depots before transitioning to fluid transfer, citing operational simplicity and contamination risk.

- **Delta-V Budget**: Claude sizes for 18 km/s unloaded / 8 km/s with 5,000 kg payload; GPT sizes for 4.5–18 km/s depending on configuration, with explicit allocation for chemical augmentation providing additional 0.8 km/s rapid-response capability.

- **Operational Domain**: Claude focuses primarily on heliocentric operations (0.9–1.1 AU solar orbit) from manufacturing hubs at Earth-Sun L1; GPT emphasizes cislunar operations (HEO/NRHO/GTO) as the Phase 1 primary domain, expanding to heliocentric later.

---

## Open Questions

1. **Primary Depot Location**: Should Phase 1 standardize on NRHO, Earth-Sun L1, or a high Earth orbit as the primary logistics hub? This fundamentally changes delta-V requirements and transfer times.

2. **Payload Interface Standardization**: Will Project Dyson enforce a single docking ring, fiducial marker, and power/data interface standard across all Phase 1 modules, or must tugs accommodate heterogeneous payloads with adapters?

3. **Xenon Supply Chain Risk**: How should the fleet hedge against xenon price volatility and supply constraints? Should krypton-capable thrusters be qualified as a fallback?

4. **Non-Cooperative Target Capture**: Do Phase 1 tugs require capability to capture tumbling or non-cooperative objects, necessitating vision-based pose estimation and grapple mechanisms?

5. **Radiation Hardening Requirements**: What is the expected Van Allen belt transit frequency, and how does this drive avionics radiation tolerance and shielding mass?

6. **In-Space Assembly Manipulation**: Should Phase 1 tugs include robotic manipulation arms for assembly support, or should this capability be deferred to dedicated assembly platforms?

---

## Recommended Approach

1. **Adopt a phased fleet strategy**: Begin with a smaller hybrid service tug (20 kW SEP + storable chemical) to validate autonomous rendezvous, docking, and contingency operations before scaling to larger 50+ kW pure-electric freight tugs.

2. **Establish and enforce a Swarm Logistics Standard (SLS)**: Define docking ring geometry, 300 V power connector specifications, xenon refuel coupling protocols, and relative navigation fiducials (optical + retroreflector) before finalizing tug design.

3. **Implement tank-swap refueling initially**: Use replaceable xenon tank modules at depots rather than fluid transfer for Phase 1, reducing contamination risk and operational complexity while developing fluid transfer technology in parallel.

4. **Design for aggressive standardization**: All tugs within a class should be identical to enable mass production economics, simplified logistics, and any-tug-any-mission flexibility.

5. **Size Phase 1 for cislunar operations with heliocentric growth path**: Design power and propulsion systems to operate efficiently in the cislunar domain (NRHO/HEO) while ensuring thermal and power margins support expansion to 0.9–1.1 AU heliocentric operations.

6. **Invest heavily in autonomy and fleet management software**: Develop high-fidelity digital twin simulations and autonomous operations stacks early, as fleet logistics complexity will dominate cost and schedule more than hardware after initial vehicles are deployed.

7. **Maintain chemical backup capability on at least 25% of the fleet**: Even if pure-SEP tugs are the primary workhorses, retain hybrid tugs with storable propellant for time-critical operations, collision avoidance, and rescue/recovery missions to ensure operational resilience.