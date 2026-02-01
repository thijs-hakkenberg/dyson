---
bomId: "bom-0-1"
itemName: "Prospecting Satellites"
itemSlug: "prospecting-satellites"
modelId: "gemini-3-pro"
modelName: "Gemini 3 Pro"
generated: "2026-02-01"
phase: "phase-0"
---

**PROPOSAL: PROJECT DYSON - PHASE 0**
**SYSTEM: PROSPECTING SATELLITE CONSTELLATION ("THE GEOLOGISTS")**
**AUTHOR:** Dr. Aris Thorne, Lead Systems Architect
**DATE:** October 24, 2024
**CLASSIFICATION:** OPEN / PUBLIC DOMAIN

---

### 1. Executive Summary & Design Philosophy

**The Challenge:** Building a Dyson Swarm requires mass on a planetary scale. Earth’s gravity well is too deep; we must source materials from Near-Earth Objects (NEOs) and the Main Asteroid Belt. Current cataloging is insufficient. We know *where* asteroids are, but we rarely know *what* they are made of with the granularity required for automated mining.

**The Philosophy: "Swarm for the Swarm."**
We cannot rely on billion-dollar flagship missions like *Psyche* or *Osiris-Rex* for every target. We need volume. My proposal rejects the "Battlestar Galactica" approach of massive, multi-instrument monoliths. Instead, I propose a **Distributed Heterogeneous CubeSat Swarm**.

We will deploy hundreds of low-cost, highly autonomous 12U and 24U CubeSats. They are expendable, specialized, and mass-manufacturable. If 10% fail, the mission still succeeds.

**Core Mantra:** *Find the water, find the metal, ignore the rest.*

---

### 2. System Architecture

The architecture consists of two distinct classes of spacecraft operating in tandem:

1.  **Class A: The Wide-Field Scanners (WFS)** - "The Spotters"
    *   *Role:* Loitering in stable Lagrange points (L4/L5) or trailing Earth orbits to identify spectral candidates.
2.  **Class B: The Kinetic Penetrators (KP)** - "The Drillers"
    *   *Role:* High-delta-V interceptors that rendezvous with specific targets, deploy impactors, and analyze the ejecta plume.

**ASCII Architecture Diagram:**

```text
[ EARTH GROUND STATION ] <=== High Bandwidth (Optical/Ka-Band) ===> [ DATA RELAY MOTHERSHIP ]
                                                                          |
                                                                          | (Inter-satellite Link)
                                      +-----------------------------------+-----------------------------------+
                                      |                                                                       |
                             [ WFS SATELLITE ]                                                       [ KP SATELLITE ]
                             (Wide Field Scanner)                                                    (Kinetic Penetrator)
                                      |                                                                       |
                                      v                                                                       v
                            [ TARGET ASTEROID ] <--- (Remote Sensing) --- [ TARGET ASTEROID ] <--- (Impact/Close Flyby)
```

---

### 3. Technical Specifications: Class B "Kinetic Penetrator" (The Workhorse)

The Class B unit is the most critical for Phase 0, as it confirms ore grade.

**Form Factor:** 24U CubeSat (approx. 22 x 22 x 68 cm)
**Dry Mass:** 32 kg
**Wet Mass:** 48 kg (High propellant fraction)
**Power Generation:** 180W (BOL) via deployable ROSA-style arrays.
**Propulsion:** Iodine Hall Effect Thruster (high Isp) + Cold Gas RCS.

#### Performance Metrics
*   **Delta-V:** > 2.5 km/s (Crucial for rendezvous maneuvering).
*   **Targeting Accuracy:** < 5m relative position at 1km distance.
*   **Lifetime:** 3-5 years.

#### Payload Suite (The "Geologist's Hammer")
1.  **Primary Instrument: LIBS/Raman Spectrometer.** Laser-Induced Breakdown Spectroscopy combined with Raman. Fires a laser at the surface from <50m range to vaporize rock and analyze plasma composition.
2.  **Secondary Instrument: Neutron Spectrometer.** Detects hydrogen abundance (water ice proxy) up to 1m depth.
3.  **The "Dart":** A 2kg tungsten penetrator. The satellite releases this on a collision course, then brakes to observe the impact. This reveals subsurface composition without landing.

---

### 4. Subsystems Breakdown

**A. Structure & Thermal**
*   *Material:* Al-Li alloy frame, 3D printed titanium brackets.
*   *Thermal:* Variable Emittance Coatings (VEC) and louvers. Asteroid environments vary wildly in albedo; passive thermal control is insufficient.

**B. Propulsion (The Iodine Revolution)**
*   *Engine:* Busek BHT-600 equivalent, modified for Iodine.
*   *Why Iodine?* Xenon is expensive and requires high-pressure tanks (heavy). Iodine stores as a solid, sublimates at low heat, and offers similar performance. This reduces tank mass by 40%.

**C. C&DH (Command & Data Handling)**
*   *Processor:* Dual-core rad-hardened ARM Cortex-A53 equivalent + FPGA for instrument processing.
*   *Storage:* 1TB NVMe (Redundant). We generate massive hyperspectral datacubes; we process on the edge and only downlink the "ore grade" summary.

**D. Power**
*   *Battery:* Li-S (Lithium-Sulfur) for higher energy density (400 Wh/kg) to support the high-current draw of the Hall thruster and LIBS laser.

---

### 5. Autonomy & Navigation (The "Brain")

We cannot joystick 500 satellites. They must be autonomous.

**Optical Navigation (OpNav):**
The satellite uses onboard cameras to track the target asteroid against the star field. It solves the "Lost in Space" problem autonomously.
*   *Algorithm:* SLAM (Simultaneous Localization and Mapping) adapted for micro-gravity bodies.
*   *Critical Event:* The "Dart" release requires millisecond timing precision calculated onboard based on real-time trajectory estimation.

**Communication:**
*   *Primary:* X-band phased array (flat panel, no dish).
*   *Protocol:* Delay-Tolerant Networking (DTN). The swarm acts as a mesh. If Sat A cannot see Earth, it dumps data to Sat B, which relays it.

---

### 6. Manufacturing & Cost Analysis

**Philosophy:** Automotive, not Aerospace.
We are building a fleet. We do not hand-wrap harnesses. We use flexible PCBs and robotic assembly.

**Unit Cost Estimates (USD - 2024 Adjusted):**

| Component | Cost (Prototype) | Cost (Production >100 units) |
| :--- | :--- | :--- |
| **Bus Structure** | $50k | $8k |
| **Propulsion (Iodine)** | $250k | $45k |
| **Avionics/ADCS** | $150k | $25k |
| **Payload (LIBS/Neutron)** | $400k | $60k |
| **Integration & Test** | $200k | $20k |
| **TOTAL PER UNIT** | **$1.05M** | **$158k** |

**Launch Costs:**
Rideshare is king. We pack 20 units into a SpaceX Starship or Electron dispenser ring.
*   *Launch Cost per unit:* ~$50k (assuming bulk buy).

**Total Program Cost (Phase 0 - 50 Unit Swarm):**
*   Development: $25M
*   Production (50 units): $7.9M
*   Launch: $2.5M
*   Ops (3 years): $10M
*   **TOTAL:** ~$45.4M (This is remarkably cheap for a deep space campaign).

---

### 7. Development Roadmap

*   **Year 1: The "FlatSat"** - Breadboard integration of the Iodine thruster and LIBS instrument. Verify AI navigation in simulation.
*   **Year 2: LEO Pathfinder** - Launch 2 prototypes to Low Earth Orbit to test formation flying and optical navigation.
*   **Year 3: The "Scout" Mission** - Launch 5 units to a Near-Earth Asteroid (e.g., Ryugu or Bennu) to validate data against known baselines.
*   **Year 4: Mass Production** - Spin up the assembly line.
*   **Year 5: Swarm Deployment** - Injection into Heliocentric orbit.

---

### 8. Risk Assessment

1.  **Propulsion Failure (High Impact, Medium Probability):** Iodine thrusters are newer tech. Corrosion of feed lines is a known issue.
    *   *Mitigation:* rigorous material compatibility testing; redundant valves.
2.  **Autonomy Failure (High Impact, Medium Probability):** The AI misinterprets a shadow as a crater and crashes.
    *   *Mitigation:* "Safe Mode" hard-coded triggers (e.g., if range < 100m and velocity > 1m/s, fire retrograde thrusters immediately).
3.  **Communications Bottleneck (Low Impact, High Probability):** Too much data, too little bandwidth.
    *   *Mitigation:* Edge computing. We train the satellite to delete "boring" rocks and only transmit data on anomalies (high metal/water content).

---

### 9. Open Engineering Questions

1.  **The Dust Problem:** Upon impact/penetration, electrostatic dust levitation is a major risk for optical sensors. How quickly does the plume settle in micro-gravity? We need better modeling here.
2.  **Swarm Coordination:** If three satellites target the same asteroid, how do they deconflict orbits without Earth intervention? We need a robust "Space Traffic Management" protocol within the swarm software.
3.  **Planetary Protection:** While these are dead rocks, we must ensure we don't contaminate potential prebiotic chemistry sites with hydrazine or biological spores. The Iodine thruster helps (it's a biocide), but strict cleaning protocols are still required.

### Conclusion

Project Dyson cannot begin with a shovel; it must begin with a map. This proposal offers a scalable, economically viable method to create that map. By accepting higher individual risk for lower unit cost, we shift the paradigm from "exploration" to "industrial surveying."

**Let's go find the iron.**