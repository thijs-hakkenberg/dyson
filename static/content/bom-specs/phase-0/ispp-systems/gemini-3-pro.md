---
bomId: "bom-0-6"
itemName: "In-Situ Propellant Production Systems"
itemSlug: "ispp-systems"
modelId: "gemini-3-pro"
modelName: "Gemini 3 Pro"
generated: "2026-02-07"
phase: "phase-0"
---

**PROJECT DYSON TECHNICAL PROPOSAL: PD-004-ISPPS**
**SUBJECT:** In-Situ Propellant Production Systems (ISPPS) for Phase 0
**AUTHOR:** Dr. Aris Thorne, Lead Systems Architect, Project Dyson
**DATE:** October 24, 2024
**CLASSIFICATION:** OPEN SOURCE / PUBLIC DOMAIN

---

### 1. Executive Summary & Design Philosophy

**The Bottleneck:** The primary constraint on building a Dyson Swarm is not energy generation or mirror fabrication; it is logistics. Moving mass from gravity wells (Earth, Moon, Mars) is energetically prohibitive for a megastructure. We must source propellant *in-situ* from Near-Earth Asteroids (NEAs) to fuel the tugs that will aggregate material for the swarm factories.

**The Philosophy: "Water is the Only Currency."**
For Phase 0, we reject complex chemical synthesis (e.g., Sabatier reactors for methane) or exotic propulsion (e.g., metallic hydrogen). We prioritize **Steam Thermal Propulsion (STP)** and **Solar Electric Propulsion (SEP) using Water Plasma**.

*   **Simplicity:** Water is abundant in C-type asteroids. It requires only thermal energy to extract and thermal/electric energy to expel.
*   **Robustness:** Fewer moving parts than cryogenic chemical plants.
*   **Scalability:** The system must be modular. We do not build one giant refinery; we build swarms of "Harvester" units.

**Recommended Approach:** The **"Thermal-Worm" Extraction Architecture**. A direct-contact heating auger that sublimes volatiles directly from the regolith into a cold trap, bypassing complex excavation and conveyor systems.

---

### 2. Technical Specifications (The "Hydra" Mark I Harvester)

The *Hydra* is a semi-autonomous extraction and processing rig designed to anchor to a low-gravity body (<0.05g) and process regolith.

*   **Dry Mass:** 4,500 kg
*   **Wet Mass (Max):** 54,500 kg (50t propellant storage capacity)
*   **Dimensions (Stowed):** 4.2m diameter x 12m length (fits inside Starship/New Glenn fairing)
*   **Dimensions (Deployed):** 25m x 12m (Solar array span)
*   **Power Generation:** 150 kW (BOL) via flexible thin-film solar wings.
*   **Thermal Power:** 2.5 MW (Direct Solar Concentrators for processing).
*   **Production Rate:** 1,000 kg water/day (nominal insolation).
*   **Specific Impulse (Isp):**
    *   *Mode A (Steam Thermal):* 190s (High Thrust)
    *   *Mode B (Water Plasma Hall Effect):* 1,500s (High Efficiency)

---

### 3. System Architecture

The *Hydra* operates on a "Chew-Melt-Freeze" cycle.

**ASCII Architecture Diagram:**

```text
      [ SUN ]
         |
    (Concentrators)
         |
         v
+-----------------------+      +-------------------------+
|   THERMAL AUGER HEAD  | ---> |   VAPOR FILTRATION      |
| (Drills & Sublimes)   |      | (Cyclonic Dust Sep.)    |
+-----------------------+      +-------------------------+
         ^                                  |
         | (Regolith)                       v
+-----------------------+      +-------------------------+
|   ANCHORING SYSTEM    |      |   COLD TRAP CONDENSER   |
| (Harpoon/Screw)       |      | (Passive Radiators)     |
+-----------------------+      +-------------------------+
                                            |
                                            v
                               +-------------------------+
                               |   ELECTROLYSIS / STORE  |
                               | (Liquid H2O Bladders)   |
                               +-------------------------+
                                            |
                                            v
                               +-------------------------+
                               |   PROPULSION BUS        |
                               | (Steam Nozzle / Hall)   |
                               +-------------------------+
```

---

### 4. Subsystems Breakdown

#### 4.1. Extraction Subsystem (The "Thermal Worm")
*   **Mechanism:** A counter-rotating auger screw housed within a heated shroud.
*   **Heating:** Optical fibers route concentrated solar flux directly to the auger tips, heating regolith to 400°C.
*   **Physics:** Volatiles sublime inside the shroud. The pressure differential drives vapor up the auger shaft, leaving dry regolith to be ejected out the back as ballast/shielding.

#### 4.2. Filtration & Processing
*   **Dust Separation:** Since gravity is negligible, we use a multi-stage cyclonic separator driven by the vapor pressure itself to remove fines (<5 microns).
*   **Purification:** A catalytic bed (Ruthenium-based) breaks down complex organics and ammonia traces.
*   **Condensation:** Vapor passes through radiator-cooled loops, freezing into ice, then melted via waste heat into liquid water storage.

#### 4.3. Storage
*   **Design:** "Bag-in-Shell" topology. A rigid carbon-composite shell protects a multi-layer insulation (MLI) flexible bladder.
*   **Thermal Control:** The water acts as thermal mass to stabilize the spacecraft temperature.

#### 4.4. Propulsion Interface
*   **Omnivore Thrusters:** The system feeds purified water directly to:
    1.  **Resistojets:** Superheating water to 1500K for maneuvering.
    2.  **Microwave Electrothermal Thrusters (MET):** For orbit raising.

---

### 5. Autonomy, Control, & Comms

*   **Latency Challenge:** Round-trip light time to the Belt is 20-40 minutes. Teleoperation is impossible.
*   **The "Hive Mind" OS:**
    *   **Level 4 Autonomy:** The *Hydra* navigates, anchors, and resolves mechanical jams (e.g., "rock in the auger") without human input.
    *   **Distributed Ledger:** Each Harvester maintains a blockchain-based ledger of resource extraction to coordinate swarm logistics and prevent claim jumping.
*   **Comms:** Optical (Laser) Link for high-bandwidth burst data (scientific analysis of regolith); X-band for telemetry/heartbeat.

---

### 6. Manufacturing Considerations

*   **Modular Fab:** The *Hydra* is designed for assembly line production, not clean-room bespoke crafting.
*   **Materiality:**
    *   *Auger Tips:* Tungsten Carbide (sintered).
    *   *Structure:* Aluminum-Lithium alloy (Al-Li 2195).
    *   *Tanks:* Filament-wound carbon fiber.
*   **In-Space Assembly (ISA):** The solar concentrators and radiators are too large to launch rigid. They utilize shape-memory alloys to deploy upon arrival.

---

### 7. Development Roadmap & TRL

**Current TRL (System Wide):** 3 (Proof of Concept)

*   **Year 1-2 (Earth):** Vacuum chamber testing of the "Thermal Worm" on simulant (CI Carbonaceous Chondrite simulant). **Budget: $15M**
*   **Year 3-4 (LEO):** *Hydra Pathfinder* mission. A scaled-down prototype launched to LEO to process a transported simulant block in microgravity. **Budget: $85M**
*   **Year 5-7 (Deep Space):** *Hydra Mark I* launch to NEA 1998 KY26 (or similar fast rotator). **Budget: $250M**
*   **Year 8+:** Fleet deployment.

---

### 8. Cost Analysis (Per Unit - Mass Production)

*Assumption: Production run of 50 units.*

| Component | Cost Estimate (USD) | Notes |
| :--- | :--- | :--- |
| Structure & Mechanisms | $4.5M | Standard aerospace alloys |
| Power Systems (Solar/Batt) | $3.2M | Thin-film cost reduction |
| Avionics & Autonomy | $2.8M | COTS hardware, custom software |
| Thermal/Processing Payload | $6.0M | The most expensive subsystem |
| Propulsion | $1.5M | Simple water thrusters |
| Integration & Test | $2.0M | Automated testing |
| **TOTAL HARDWARE COST** | **$20.0M** | *Excludes Launch* |

*Launch Cost:* Assuming Starship at $20M/launch and 2 units per launch = $10M per unit launch cost.
**Total Cost to Orbit per Operational Unit: $30M.**

---

### 9. Risk Assessment

1.  **Regolith Uncertainty (Critical):** If the asteroid is a "rubble pile" with low cohesion, the auger may fail to gain traction or create a debris cloud that blinds sensors.
    *   *Mitigation:* Harpoons with expanding flukes; active debris mitigation fields (electrostatic).
2.  **Ice Sublimation Clogging (High):** Vapor may re-freeze in the neck of the auger, jamming the mechanism.
    *   *Mitigation:* Active heating trace along the entire vapor path; "back-flush" capability.
3.  **Contamination (Medium):** Volatile organics (tars) may foul the optical surfaces of the concentrators.
    *   *Mitigation:* Sacrificial lens covers; electrostatic dust repulsion.

---

### 10. Open Engineering Questions

1.  **The "Kicker" Problem:** How do we efficiently eject the dry, processed regolith without imparting unwanted delta-V or rotation to the spacecraft?
2.  **Water Purity for Hall Thrusters:** Standard Hall thrusters erode quickly with water vapor. We need to finalize the cathode design for a water-resistant Hall thruster (likely a heaterless hollow cathode).
3.  **Deep Drilling:** The *Hydra* currently only scrapes the top 2 meters. How do we access deep ice deposits without massive drilling rigs?

---

**Conclusion:**
The *Hydra* architecture represents the minimum viable product for space resource utilization. By focusing on water—the simplest, most versatile molecule in the cosmos—we bypass the need for complex chemical engineering in Phase 0. We are not building a refinery; we are building a well.

*Ad Astra,*

**Dr. Aris Thorne**
Project Dyson