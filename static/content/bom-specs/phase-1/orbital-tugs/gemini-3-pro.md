---
bomId: "bom-1-6"
itemName: "Orbital Tugs"
itemSlug: "orbital-tugs"
modelId: "gemini-3-pro"
modelName: "Gemini 3 Pro"
generated: "2026-02-01"
phase: "phase-1"
---

# Project Dyson: Technical Proposal for Phase 1 Orbital Tugs
## Document ID: PD-ENG-PROP-042-TUG
### Date: October 26, 2023
### Author: Dr. Aris Thorne, Lead Systems Architect

---

## 1. Executive Summary & Design Philosophy

**The Challenge:** Phase 1 of Project Dyson requires the precise placement of approximately 10,000 initial mirror satellites (heliostats) into a specific orbital inclination around the Sun (likely Mercury-adjacent or 0.3 AU). Launching these individually from Earth is economically impossible. Launching them in bulk carriers to a transfer orbit and releasing them requires a "last-mile" delivery system.

**The Solution:** The **"Shepherd" Class Orbital Tug**.

**Design Philosophy:**
My approach rejects the traditional "Swiss Army Knife" satellite design. The Shepherd must be:
1.  **Disposable-Grade Durability:** Designed for a high-cycle operational life (50+ maneuvers) but cheap enough that losing one is a statistic, not a tragedy.
2.  **Electric Propulsion Dominance:** Chemical propulsion is too mass-inefficient for the Delta-V requirements of swarm distribution. We will use high-efficiency Hall Effect thrusters.
3.  **Swarm Logic:** The tugs are not joystick-controlled; they operate as a semi-autonomous flock, negotiating trajectories relative to each other to avoid collision and optimize fuel usage.

---

## 2. Technical Specifications

### 2.1 Physical Characteristics
*   **Bus Form Factor:** Hexagonal Prism (allows for honeycomb packing inside launch fairings).
*   **Dimensions:** 1.2m (diameter) x 0.8m (height).
*   **Dry Mass:** 180 kg.
*   **Wet Mass (at launch):** 450 kg (Xe propellant).
*   **Payload Capacity:** Can grapple and maneuver stacks up to 2,000 kg.

### 2.2 Performance Metrics
*   **Propulsion System:** 2x 4kW Hall Effect Thrusters (HET).
*   **Specific Impulse (Isp):** 2,800 s.
*   **Thrust:** 250 mN per thruster (500 mN total).
*   **Total Delta-V (Unloaded):** ~14 km/s.
*   **Total Delta-V (Loaded 2000kg):** ~2.5 km/s (Sufficient for orbital plane changes and phasing at 0.3 AU).
*   **Power Generation:** 12 kW deployable thin-film solar arrays (optimized for high-intensity solar flux at 0.3 AU).

---

## 3. System Architecture

### 3.1 High-Level Diagram

```ascii
       [ Solar Array Wing A ]                 [ Solar Array Wing B ]
              /                                      \
             /                                        \
      +--------------------------------------------------+
      |  [Thermal Radiators]      [Comms Array]          |
      |                                                  |
      |          HEXAGONAL BUS CHASSIS                   |
      |                                                  |
      |  [Avionics Core]          [Xenon Tanks]          |
      |                                                  |
      +--------------------------------------------------+
               |                          |
        [Grapple Mech]              [Grapple Mech]
               |                          |
        (Interface to              (Interface to
         Payload Stack)             Payload Stack)

      BOTTOM VIEW:
      +----------------------+
      |      (Thruster A)    |
      |                      |
      |      (Thruster B)    |
      +----------------------+
```

### 3.2 Subsystems Breakdown

#### A. Propulsion (The "Heart")
*   **Thrusters:** Busek BHT-4000 or equivalent custom variant.
*   **Propellant:** Xenon (Phase 1). *Note: Phase 2 must transition to Argon or Krypton due to Xenon scarcity, but for Phase 1 reliability, Xenon is required.*
*   **PPU (Power Processing Unit):** Direct-drive architecture from solar arrays to minimize conversion losses.

#### B. Structure & Thermal
*   **Frame:** Al-Li alloy 3D printed lattice. High stiffness-to-mass ratio.
*   **Thermal Control:** At 0.3 AU, solar flux is ~10x Earth levels. The tug requires active louvers and a high-reflectivity multi-layer insulation (MLI) shield on the sun-facing side. The radiators are perpendicular to the sun-line.

#### C. Guidance, Navigation, & Control (GNC)
*   **Sensors:** Star trackers (2x), Sun sensors (4x), LiDAR for proximity operations (docking).
*   **Reaction Wheels:** 4x tetrahedral configuration for attitude control.

#### D. Payload Interface (The "Hand")
*   **Mechanism:** Standardized "Soft-Capture" magnetic latching system.
*   **Data/Power Pass-through:** The tug provides "keep-alive" power and heater current to the mirror satellites during transit.

---

## 4. Autonomy & Communication

We cannot micromanage 500 tugs from Earth with a 10-minute light-speed lag.

### 4.1 The "Hive Mind" Protocol
*   **Tier 1 (Strategic):** Mission Control uploads a "State Goal" (e.g., "Distribute Payload Stack Alpha to Orbital Plane 7").
*   **Tier 2 (Tactical):** The Carrier Mother-ship (the large transport that brought them) acts as the local computation hub, calculating optimal trajectories.
*   **Tier 3 (Execution):** The Shepherd Tug executes the burn, handling local station-keeping and collision avoidance autonomously using on-board LiDAR and inter-satellite links.

### 4.2 Communications
*   **Inter-link:** Optical (Laser) communication between Tugs and Mother-ship. High bandwidth, low power, hard to jam/interfere.
*   **Back-haul:** X-band low-gain antenna for emergency Earth contact.

---

## 5. Manufacturing & Roadmap

### 5.1 Manufacturing Strategy: "Automotive, not Aerospace"
We are building hundreds. We cannot use clean-room artisans.
*   **Modular Assembly:** The propulsion module, avionics core, and structure are built on separate lines and snapped together.
*   **COTS Components:** Use automotive-grade electronics where radiation shielding allows, rather than Mil-Spec space-grade, to reduce cost by 10x.

### 5.2 Development Roadmap
1.  **Q1 2024 - Q3 2024:** Detailed Design & Digital Twin Simulation.
2.  **Q4 2024:** "Iron Bird" Ground Test (Propulsion & Power integration).
3.  **Q2 2025:** LEO Demonstrator (Launch 2 prototypes to test autonomous docking).
4.  **Q1 2026:** Production Line Spin-up.
5.  **Q4 2026:** Phase 1 Launch (First batch of 50 Tugs).

---

## 6. Cost Analysis (Estimates per Unit)

*Assumptions: Batch production of 100 units.*

| Subsystem | Estimated Cost (USD) | Notes |
| :--- | :--- | :--- |
| Structure & Thermal | $150,000 | 3D printed bulkheads |
| Propulsion (Thrusters + Tanks) | $450,000 | Most expensive component |
| Avionics & GNC | $200,000 | Utilizing COTS/Automotive |
| Power Systems (Solar + PPU) | $250,000 | High-efficiency cells required |
| Assembly & Test | $100,000 | Automated testing |
| **Total Marginal Cost** | **$1,150,000** | |

**Program Cost (NRE + 50 Units):** ~$150 Million.
*This is aggressively cheap for space hardware, but essential for a non-profit budget.*

---

## 7. Risk Assessment

| Risk | Probability | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Thermal Failure** | High | Critical | The 0.3 AU environment is brutal. Redundant radiator loops and "Safe Mode" sun-pointing orientation are mandatory. |
| **Propellant Scarcity** | Medium | High | Xenon prices fluctuate. Secure long-term futures contracts or accelerate Argon thruster development. |
| **Autonomy Bugs** | Medium | Medium | "Swarm fratricide" (collision). Implement hardware-level "keep-out" zones that override software commands. |
| **Micrometeoroid Impact** | Low | High | Distributed systems architecture. If one tug dies, the swarm re-tasks another to finish the job. |

---

## 8. Open Engineering Questions

Before we freeze the design, I need the team to investigate:
1.  **Radiation Hardening:** At 0.3 AU, solar particle events are intense. Can our COTS electronics survive 3 years, or do we need spot-shielding on the CPU?
2.  **Argon vs. Xenon:** Can we get the required Isp from Argon Hall Thrusters *now*? If so, we switch immediately to save millions in propellant costs.
3.  **End-of-Life:** What do we do with a dead tug? Do we crash it into the Sun (high Delta-V cost) or park it in a graveyard orbit?

**Conclusion:**
The Shepherd Tug is the workhorse of the Dyson Swarm. It is unglamorous, mass-produced, and highly efficient. By focusing on electric propulsion and autonomous swarm logic, we can achieve the deployment cadence required for Phase 1.

*Dr. Aris Thorne*
*Lead Systems Architect, Project Dyson*