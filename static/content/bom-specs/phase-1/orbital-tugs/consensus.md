---
bomId: "bom-1-6"
itemName: "Orbital Tugs"
itemSlug: "orbital-tugs"
type: "consensus"
generated: "2026-02-01"
phase: "phase-1"
---

# Orbital Tugs - Phase 1 Initial Swarm Deployment
## Consensus Technical Specification Document

---

## Key Specifications

All three models agree on the following core specifications:

- **Propulsion Type**: Solar Electric Propulsion (SEP) using Hall-Effect Thrusters (HET) as the primary propulsion system, with specific impulse in the range of 1,600-2,800 seconds and xenon as the baseline propellant

- **Power Class**: 50 kW-class SEP systems for primary freight tugs, requiring approximately 180-210 m² of solar array area at 30% cell efficiency to generate 50-70 kW at 1 AU

- **Payload Capacity**: Primary tugs capable of transporting 2,000-8,000 kg payloads, with total mated masses in the 6,000-12,000 kg range

- **Thruster Configuration**: Multiple thruster units (4× recommended) providing redundancy and thrust vector control, with individual thrusters in the 10-12.5 kW power class producing 0.5-1.2 N thrust each

- **Autonomy Architecture**: Three-tier autonomy with strategic mission planning from ground control, tactical trajectory optimization at local nodes, and fully autonomous execution for collision avoidance and fault response

- **Design Lifetime**: 7-15 year operational life with thruster lifetimes of 20,000-50,000 hours, designed for depot-based refueling and component replacement

- **Dual-String Avionics**: Redundant flight computers, dual star trackers, and redundant IMUs for fault tolerance in long-duration missions

- **Standardized Docking Interface**: Common mechanical/electrical/data interface (IDSS-derived or project-specific standard) enabling payload capture, power pass-through, and data connectivity

---

## Divergent Views

- **Fleet Architecture**: Claude recommends a single "Mule" class design handling 90% of missions with a Heavy variant (1:5 ratio); Gemini proposes a single "Shepherd" class with swarm logic; GPT advocates a two-tier fleet with separate Electric Freight Tugs (Class E) and Hybrid Service Tugs (Class H) with chemical backup capability

- **Chemical Propulsion Inclusion**: Claude includes only hydrazine RCS (8× 22N thrusters) for wheel desaturation and backup attitude control; Gemini excludes chemical propulsion entirely for cost savings; GPT strongly recommends 200N biprop thrusters on service tugs for rapid rendezvous, collision avoidance, and "tow truck" contingency operations

- **Operating Distance from Sun**: Claude designs for 0.7-1.5 AU operations centered on 1 AU; Gemini optimizes specifically for 0.3 AU (Mercury-adjacent) with 10× solar flux thermal management; GPT focuses on cislunar space (NRHO/HEO) with gradual expansion to 0.9-1.1 AU heliocentric staging

- **Unit Cost Targets**: Claude estimates $9.5-13.4M per unit at 800-unit production scale with 85% learning curve; Gemini targets $1.15M per unit using automotive-grade manufacturing and COTS electronics; GPT estimates $60-120M per unit for freight tugs under Western aerospace procurement

- **Propellant Logistics Strategy**: Claude assumes ground-launched xenon with depot refueling capability; Gemini recommends securing xenon futures contracts with urgent transition to argon/krypton; GPT advocates "tank swap" modules at depots initially, deferring fluid transfer to later phases

- **Electronics Hardening**: Claude specifies RAD750 processors and full radiation-hardened avionics; Gemini proposes automotive-grade COTS electronics with spot shielding to reduce costs 10×; GPT recommends radiation-tolerant (not fully hardened) dual-string computers with environment-specific assessment

---

## Open Questions

1. **Propellant Selection and Availability**: Can argon or krypton Hall thrusters achieve required Isp (>2000s) with current technology to mitigate xenon scarcity and price volatility, or must Phase 1 commit to xenon with supply contracts?

2. **Radiation Environment and Electronics Strategy**: What is the acceptable balance between radiation hardening cost and mission risk at the planned operating distances? Can COTS electronics survive 3-7 years at 0.3-1.0 AU with spot shielding?

3. **End-of-Life Disposal**: What is the disposal protocol for failed tugs—solar impact (high Δv cost), graveyard orbit parking, or in-situ recycling/salvage for later phases?

4. **Refueling Concept of Operations**: Should Phase 1 implement fluid transfer, tank swap modules, or disposable drop tanks at depots? What contamination control and leak detection protocols are required?

5. **Non-Cooperative Target Capture**: Must tugs capture tumbling or uncontrolled payloads, requiring vision-based pose estimation and grapple mechanisms, or can all Phase 1 assets be assumed cooperative with standard interfaces?

6. **Standard Orbit Selection**: Should the primary depot/assembly yard be located at NRHO, Sun-Earth L4/L5, or a different cislunar/heliocentric orbit? This fundamentally changes Δv budgets and mission timelines.

---

## Recommended Approach

1. **Adopt a Two-Tier Fleet Architecture**: Develop a primary 50 kW Electric Freight Tug for bulk transport and a smaller Hybrid Service Tug with storable chemical propulsion for rapid response, assembly support, and contingency operations. Build and fly the Hybrid Service Tug first to validate autonomous docking and provide operational safety margins.

2. **Establish Project Dyson Swarm Logistics Standard (SLS) Immediately**: Define and enforce common standards for docking ring geometry, 300V power connectors, xenon refuel couplings, relative navigation fiducials, and data interfaces before freezing tug design. This prevents costly adapter proliferation and enables fleet interoperability.

3. **Design for Depot-Based Operations from Day One**: Size propellant tanks for refueling, design thruster pods and PPU modules as orbital replacement units (ORUs), and implement tank-swap xenon logistics initially rather than fluid transfer. Plan for two depot nodes (one in cislunar staging, one at heliocentric assembly yard).

4. **Implement Graduated Autonomy with Human Gates**: Deploy full autonomous capability for collision avoidance (<1 second response), thruster fault safing (<100ms), and low-thrust trajectory execution, but require human authorization gates at 500m and 20m during proximity operations until operational confidence is established.

5. **Prioritize Reliability Over Peak Performance**: Use proven Hall thruster designs (TRL 8-9) with conservative derating, 4-thruster configurations allowing any-2 operation, and 85% learning curve manufacturing approach. Accept 10-20% performance margin loss in exchange for demonstrated 25,000+ hour thruster life.

6. **Invest Heavily in Operations Infrastructure**: Allocate 15-20% of program budget to digital twin simulation, fleet management automation, and 24/7 operations capability. Fleet logistics complexity will dominate cost and schedule more than hardware after initial vehicles are deployed.

7. **Maintain Propellant Flexibility**: Baseline xenon for Phase 1 reliability but require thruster qualification for krypton operation as a fallback. Secure long-term xenon supply contracts while funding parallel argon thruster development for Phase 2 cost reduction.