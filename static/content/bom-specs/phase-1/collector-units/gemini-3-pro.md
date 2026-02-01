---
bomId: "bom-1-1"
itemName: "Solar Collector Units"
itemSlug: "collector-units"
modelId: "gemini-3-pro"
modelName: "Gemini 3 Pro"
generated: "2026-02-01"
phase: "phase-1"
---

**PROJECT DYSON TECHNICAL PROPOSAL: DOCUMENT PD-SCU-001**
**SUBJECT:** Solar Collector Unit (SCU) Architecture for Phase 1 Deployment
**AUTHOR:** Dr. Aris Thorne, Lead Systems Architect
**DATE:** October 24, 2045
**CLASSIFICATION:** OPEN SOURCE / PUBLIC DOMAIN

---

### 1. Executive Summary & Design Philosophy

**The Approach: "Swarm Intelligence, Gossamer Structure"**

For Phase 1 of Project Dyson, we must reject the sci-fi trope of rigid, heavy habitats. Our goal is energy collection, not colonization. Therefore, mass is our enemy. Every gram launched or manufactured in situ represents an exponential cost in energy.

My proposal advocates for the **"Kite-Sat" Architecture**: ultra-lightweight, membrane-based spacecraft that rely on solar radiation pressure for station-keeping and attitude control, minimizing propellant mass. These units are designed to be "dumb" individually but brilliant collectively. We are not building a monolith; we are releasing a cloud of glittering dust.

**Core Philosophy:**
1.  **Extreme Mass Efficiency:** Target < 10 g/m².
2.  **In-Situ Resource Utilization (ISRU) Compatible:** Design must assume Mercury-based manufacturing eventually, but Earth-launched prototypes initially.
3.  **Fail-Operational:** The loss of 10% of the swarm must have 0% impact on mission success.

---

### 2. Technical Specifications (SCU Mark-I)

The Mark-I is the Phase 1 unit, designed for deployment at 0.3 AU (Mercury orbit proximity) to maximize solar flux while remaining accessible for ISRU logistics.

*   **Geometry:** Hexagonal Spin-Stabilized Membrane
*   **Deployed Diameter:** 100 meters
*   **Effective Surface Area:** ~6,500 m²
*   **Total Mass:** 85 kg (wet mass)
*   **Areal Density:** ~13 g/m² (slightly higher than target for Phase 1 robustness)
*   **Solar Flux at 0.3 AU:** ~15,000 W/m²
*   **Conversion Efficiency:** 45% (Multi-junction thin-film)
*   **Power Generation:** ~43.8 MW per unit (Peak)
*   **Power Transmission:** Microwave (2.45 GHz or 5.8 GHz phased array)

---

### 3. System Architecture

The SCU consists of a central "Hub" (avionics, transmission) and the "Sail" (collection surface).

**ASCII Diagram: SCU Mark-I Configuration**

```text
       [Solar Wind / Radiation Pressure]
                    |||
                    vvv

      /-----------------------------\
     /      +---------------+        \
    /       |  Central Hub  |         \  <-- Avionics, Gyros,
   /        |  (Transmission)|         \     Propellant (Cold Gas)
  /         +-------+-------+           \
 /                  |                    \
|   [Thin Film PV]  |  [Antenna Array]    |
|   (Graphene base) |  (Metamaterial)     |
 \                  |                    /
  \                 |                   /
   \        +-------+-------+          /
    \       |   Rim Bus     |         /  <-- Structural Rigidity
     \      +---------------+        /       (Centrifugal deployment)
      \-----------------------------/

      ^                             ^
      |                             |
   Spin Axis (5 RPM)          Control Tethers
```

---

### 4. Subsystems Breakdown

#### 4.1. The Sail (Collector)
*   **Material:** 2-micron thick Kapton-Graphene composite substrate.
*   **Photovoltaics:** Perovskite/CIGS flexible thin-film printed directly onto the substrate.
*   **Thermal Control:** The rear of the sail acts as a radiative heat sink. High emissivity coating ($\epsilon > 0.9$) is required to maintain operating temps below 200°C at 0.3 AU.

#### 4.2. The Hub (Bus)
*   **Structure:** Carbon-Carbon lattice.
*   **Power Management:** Supercapacitor banks for burst transmission (batteries are too heavy and degrade too fast in high radiation).
*   **Propulsion:** Cold Gas Thrusters (Nitrogen) for initial spin-up and emergency collision avoidance. Primary station-keeping is done via **Heliogyro** principles (tilting the sail vanes to use solar pressure).

#### 4.3. Wireless Power Transmission (WPT)
*   **Method:** The "Sail" itself is a sandwich structure. The sun-facing side collects; the dark side is a metamaterial phased array antenna.
*   **Beam Steering:** Electronic steering via phase shifting. No moving parts.
*   **Target:** Power is beamed to a "Collector Station" (a larger satellite in a higher orbit) which aggregates beams before relaying to Earth/Mars/Factories.

---

### 5. Autonomy, Control, and Communication

We cannot control 10,000 units individually from Earth. The light lag (minutes) makes direct joystick control impossible.

*   **Swarm Logic:** Boids Algorithm (separation, alignment, cohesion). Each SCU tracks its 6 nearest neighbors via laser link.
*   **Hierarchy:**
    *   **Worker:** The SCU (dumb, follows neighbors).
    *   **Shepherd:** 1 in every 100 SCUs is a "Shepherd" class with higher processing power and Earth-link capability.
*   **Self-Healing:** If a unit detects internal failure, it feathers its sail (reducing radiation pressure) to drift out of the constellation plane, entering a "graveyard drift."

---

### 6. Manufacturing Considerations

**Phase 1 (Earth Launch):**
*   **Folding:** The 100m sail must fold into a 1m x 1m x 2m volume (Origami engineering is a critical path).
*   **Launch Vehicle:** Starship-class heavy lift. We can fit ~500 SCUs per launch.

**Phase 2 (Mercury ISRU - Future):**
*   Design must transition to materials abundant on Mercury: Silicon, Aluminum, Iron, Titanium.
*   *Eliminate:* Complex polymers (Kapton) in favor of Aluminum foil substrates or Silicon sheets.

---

### 7. Development Roadmap & TRL (Technology Readiness Level)

1.  **Year 1-2: Ground Demonstrator (TRL 4 -> 6)**
    *   Vacuum chamber deployment of 10m prototype.
    *   Validation of thin-film efficiency under 10-sun concentration.

2.  **Year 3: LEO Flight Test (TRL 7)**
    *   "Project Icarus": Single unit deployment in Low Earth Orbit.
    *   Test microwave transmission to ground station.

3.  **Year 5: The "Golden Ring" (TRL 9)**
    *   Launch of 500 units to 0.3 AU.
    *   Formation flying validation.

---

### 8. Cost Analysis (Phase 1 Estimates)

*Assumptions: Commercial launch costs at $50/kg (Starship maturity). Mass production economies of scale.*

*   **R&D (Non-Recurring):** $2.5 Billion
*   **Unit Cost (Hardware):** $150,000 per SCU
*   **Launch Cost:** $4,250 per SCU ($50/kg * 85kg)
*   **Total for 1,000 Unit Swarm:**
    *   Hardware: $150M
    *   Launch: $4.25M
    *   Ops: $50M
    *   **Total Phase 1 Deployment:** ~$2.7 Billion (Comparable to a single flagship NASA mission).

---

### 9. Risk Assessment

| Risk | Probability | Impact | Mitigation |
| :--- | :--- | :--- | :--- |
| **Micrometeoroid Impact** | High | Low | Modular panel design. A hole doesn't kill the whole sail; it just reduces power by 0.01%. |
| **Thermal Degradation** | Medium | High | Over-engineer rear emissivity. Use self-annealing perovskites that heal radiation damage. |
| **Beam Pointing Error** | Low | Catastrophic | Hardware interlocks. If the pilot signal from the receiver is lost, transmission cuts instantly. |
| **Deployment Tangle** | Medium | High | Centrifugal deployment (spin-stabilized) is more reliable than mechanical booms. Extensive vacuum testing. |

---

### 10. Open Engineering Questions

1.  **The Degradation Curve:** How fast will the photovoltaics degrade under the intense proton flux at 0.3 AU? We need data on 5-year survival rates of unprotected thin films.
2.  **Station Keeping:** Can solar radiation pressure *alone* maintain the precise formation required for phased array synthesis, or will we burn through cold gas propellant too fast?
3.  **Stray Light:** Will the reflection from 1,000 mirrors blind our sensors or heat up the "Shepherd" satellites too much?

### Conclusion

The "Kite-Sat" architecture represents the only viable path for a non-profit entity to begin a megastructure. It trades structural mass for smart control algorithms. We are not building a wall; we are planting a forest. Let us begin with the first seed.

**Dr. Aris Thorne**
*Lead Systems Architect, Project Dyson*