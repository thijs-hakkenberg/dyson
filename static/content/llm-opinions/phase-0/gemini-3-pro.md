---
model: "gemini-3-pro"
model_version: "databricks-gemini-3-pro"
phase: 0
phase_title: "Space Resource Processing"
generated_date: "2026-01-31"
type: "plan"
reviewed_model: null
---

Here is a comprehensive Phase 0 Plan for Project Dyson, focusing on the critical initial steps of Space Resource Processing.

***

# Project Dyson: Phase 0 - Space Resource Processing Plan

## 1. Executive Summary

Phase 0 represents the foundational step for Project Dyson: breaking the tyranny of the rocket equation by establishing In-Situ Resource Utilization (ISRU). Our approach rejects the concept of launching the swarm from Earth. Instead, we will capture a Near-Earth Asteroid (NEA), specifically a C-type or M-type metallic asteroid, and process it at Earth-Moon Lagrange Point 5 (L5). L5 offers a stable gravitational environment for large-scale processing without the orbital debris risks of Low Earth Orbit (LEO).

The core strategy relies on a "Seed Factory" methodology. We will not launch a full industrial complex; we will launch a minimal viable manufacturing unit capable of self-replication and exponential scaling. The primary target is the extraction of iron, nickel, and cobalt for structural components, and volatiles (water/hydrogen) for propellant. We have selected solar-thermal smelting over chemical refining to reduce consumable mass.

Key decisions include:
1.  **Target Selection:** Focusing on 10-50m diameter NEAs (approx. 20,000 - 200,000 tons) rather than larger bodies to minimize capture energy requirements.
2.  **Propulsion:** Utilizing high-power Solar Electric Propulsion (SEP) for the tugs, leveraging current Hall-effect thruster advancements.
3.  **Automation:** Prioritizing tele-operation with 3-second latency buffers over full autonomy to reduce software complexity risks in the early stages.

***

## 2. Bill of Materials (Phase 0 Pilot)

*Note: Costs are estimated in 2024 USD based on current commercial space sector trends (SpaceX, Rocket Lab, etc.) and projected economies of scale for a non-profit consortium.*

| Item Name & Description | Qty | Unit Cost ($M) | Total ($M) | Category | Risk | TRL | Justification |
| :--- | :---: | :---: | :---: | :--- | :---: | :---: | :--- |
| **"Argo" Class Asteroid Tug**<br>500kW SEP tug, 50t Xenon capacity, grappling mechanism. | 3 | $450 | $1,350 | Spacecraft | Med | 7 | Based on scaled-up Gateway PPE and Psyche mission tech. |
| **Falcon Heavy / Starship Launches**<br>Heavy lift capacity to GTO/TLI. | 12 | $100 | $1,200 | Launch | Low | 9 | Market rate for heavy lift (Starship assumed operational). |
| **"Hephaestus" Solar Concentrator Array**<br>1km diameter thin-film mirror assembly for thermal smelting. | 2 | $150 | $300 | Infrastructure | High | 5 | Large deployable structures are complex; cost based on JWST lessons. |
| **Optical Mining Rig (OMR)**<br>Direct solar energy excavation tool for volatile extraction. | 4 | $75 | $300 | Robotics | Med | 4 | Based on TransAstra concepts; requires vacuum testing. |
| **Magnetic Separator & Centrifuge**<br>Regolith processing unit for metal separation. | 2 | $200 | $400 | Infrastructure | Med | 6 | Standard mining tech adapted for microgravity. |
| **"Hermes" Logistics Modules**<br>Storage for refined materials and propellant depot. | 6 | $50 | $300 | Infrastructure | Low | 8 | Modified ISS/Gateway logistics module designs. |
| **Tele-robotics Control Center (Earth)**<br>Ground station and haptic feedback control room. | 1 | $150 | $150 | Ground Ops | Low | 9 | Standard mission control with advanced VR interfaces. |
| **Autonomous "Spider" Bots**<br>Small repair and maintenance crawlers. | 50 | $2 | $100 | Robotics | High | 5 | Swarm robotics logic is still maturing. |
| **Nuclear Thermal Backup Power**<br>100kWe Kilopower-style reactor for eclipse ops. | 2 | $250 | $500 | Power Systems | Med | 6 | Necessary for continuous processing; based on NASA KRUSTY. |
| **Contingency & Integration**<br>Assembly, testing, and insurance. | 1 | $800 | $800 | Admin | - | - | Standard 20% overhead for complex integration. |

**Total Phase 0 BoM Cost: $5.4 Billion**

***

## 3. Cost Breakdown

### Total Estimated Cost
**$5.4 Billion USD** (Confidence Interval: $4.2B - $8.5B)
*The wide confidence interval accounts for the volatility in launch costs and the potential need for R&D pivots in microgravity smelting.*

### Cost by Category
1.  **Spacecraft & Launch:** 47% ($2.55B) - Getting the mass to the asteroid and the asteroid to L5 is the primary expense.
2.  **Infrastructure & Processing:** 26% ($1.4B) - The actual factory components.
3.  **Contingency/Integration:** 15% ($800M)
4.  **Power Systems:** 9% ($500M)
5.  **Ground Ops:** 3% ($150M)

### Major Cost Drivers
*   **Propulsion Mass:** The cost of Xenon (or Krypton) propellant for the SEP tugs is significant, as is the hardware to process high power levels.
*   **Launch Cadence:** We require multiple heavy-lift launches to assemble the tugs and processing rigs in orbit before transit.
*   **R&D Overhead:** Adapting terrestrial mining equipment (crushers, separators) for vacuum and microgravity requires bespoke engineering.

### Cost Reduction Opportunities
*   **Water as Propellant:** If the target asteroid is rich in water ice (C-type), we can switch the tugs to water-plasma thrusters, eliminating Xenon costs.
*   **Starship Maturation:** If SpaceX achieves <$20M per launch targets, launch costs drop by ~80%, saving nearly $1B.
*   **In-Space Assembly:** Utilizing simple robotic assembly allows us to launch denser packages, reducing the number of fairings required.

***

## 4. Timeline & Dependencies

**Total Duration: 7 Years**

### Year 1-2: Design & Prospecting (Current Status)
*   **Milestone:** Finalize target asteroid selection via space-based telescope survey (NEO Surveyor data).
*   **Milestone:** Ground-based demonstration of Optical Mining Rig.
*   **Dependency:** Completion of high-power Hall thruster qualification (50kW+ class).

### Year 3-4: Construction & Launch
*   **Milestone:** Launch of 3 "Argo" Tugs and assembly in High Earth Orbit.
*   **Milestone:** Launch of "Hephaestus" and "Hermes" modules to L5 parking orbit.
*   **Critical Path:** Integration of nuclear power systems with SEP tugs.

### Year 5: Transit & Capture
*   **Milestone:** Argo tugs intercept target NEA (approx. 12-month transit).
*   **Milestone:** De-spin and stabilization of asteroid.
*   **Parallel Workstream:** While tugs are in transit, the L5 processing facility is robotically assembled and tested.

### Year 6-7: Return & Initial Processing
*   **Milestone:** Asteroid insertion into Earth-Moon L5.
*   **Milestone:** First "metal pour" – production of iron truss segments.
*   **Dependency:** Successful docking of the asteroid with the pre-positioned L5 infrastructure.

***

## 5. Technical Challenges

### 1. Microgravity Material Separation
*   **Challenge:** Traditional smelting relies on gravity to separate slag from molten metal. This fails in microgravity.
*   **Solution:** Centrifugal furnaces. We must spin the molten crucible to create artificial gravity, forcing denser metals to the outside and slag to the center.
*   **Mitigation:** Extensive testing on suborbital flights and ISS experiments prior to full deployment.

### 2. Asteroid Cohesion & Anchoring
*   **Challenge:** "Rubble pile" asteroids may disintegrate when force is applied by tugs or mining rigs.
*   **Solution:** Use of a "bagging" technique for capture (enclosing the body) rather than a single anchor point. For mining, use optical mining (thermal shock) rather than mechanical drilling to reduce reaction forces.
*   **Mitigation:** Design tugs to push gently over large surface areas; develop harpoons with expanding flukes for deep anchoring.

### 3. Dust Contamination
*   **Challenge:** Regolith dust is abrasive and electrostatically charged. It can destroy optics, solar panels, and rotary joints.
*   **Solution:** Electrostatic dust shields (EDS) on all optical surfaces and hermetically sealed rotary joints.
*   **Mitigation:** "Dirty" and "Clean" zones strictly enforced at the processing facility.

### 4. High-Power Thermal Management
*   **Challenge:** Concentrating solar energy to melt steel (1500°C+) while keeping nearby electronics cryogenic is difficult in a vacuum (no convection).
*   **Solution:** Massive deployable radiator fins and active fluid loops using liquid metal coolants.
*   **Mitigation:** Isolate the "Hephaestus" mirror focal point on a boom far from sensitive avionics.

### 5. Autonomous Navigation near Irregular Bodies
*   **Challenge:** GPS does not exist in deep space; light lag prevents joystick control during critical capture maneuvers.
*   **Solution:** Onboard LiDAR and SLAM (Simultaneous Localization and Mapping) AI for real-time relative navigation.
*   **Mitigation:** Develop "fail-safe" abort trajectories where the spacecraft automatically backs away if confidence thresholds drop.

***

## 6. Research Requirements

To validate Phase 0, the following research must be commissioned immediately:

### Key Scientific Questions
1.  **What is the shear strength of C-type asteroid regolith?** (Determines anchoring requirements).
2.  **How do molten metal alloys crystallize in variable-g environments?** (Determines structural integrity of printed parts).
3.  **What is the efficiency of water extraction via sublimation in a vacuum?**

### Recommended Studies
*   **Project Vulcan:** A terrestrial vacuum chamber experiment using simulants to test solar sintering and magnetic separation of molten regolith.
*   **Project Spider:** A software simulation of swarm robotics behavior for repairing a 1km² mirror array.

### Technology Demonstrations
*   **CubeSat Centrifuge:** A 6U CubeSat mission to LEO to demonstrate the separation of melted wax and sand (simulating metal/slag) via rotation.
*   **Tether Dynamics Test:** A demonstration of towing a passive, tumbling mass using a flexible tether system to validate capture dynamics.