---
bomId: "bom-2-1"
itemName: "Solar Collector Satellites"
itemSlug: "collector-satellites"
modelId: "gemini-3-pro"
modelName: "Gemini 3 Pro"
generated: "2026-02-01"
phase: "phase-2"
---

# Project Dyson: Technical Proposal for Phase 2 Solar Collector Satellites (SCS-MkII)

**To:** The Board of Directors, Project Dyson
**From:** Dr. Aris Thorne, Lead Systems Architect
**Date:** October 14, 2042
**Subject:** Technical Specification and Deployment Strategy for the SCS-MkII "Helios" Class

---

## 1. Executive Summary & Design Philosophy

We are entering Phase 2: Swarm Expansion. The Pathfinder phase proved that we can position assets; Phase 2 must prove we can scale energy collection exponentially while keeping mass-per-watt asymptotically low.

My core design philosophy for the SCS-MkII "Helios" is **Radical Simplicity through Distributed Complexity**. We are not building a few billion-dollar satellites; we are building billions of few-dollar satellites. The individual unit must be "dumb," lightweight, and disposable, relying on the swarm network for intelligence.

**The "Helios" Approach:**
*   **Ultra-lightweight:** No rigid trusses. Spin-stabilized membrane structures.
*   **Wireless Power Transmission (WPT):** Direct microwave beaming to relay stations, not Earth directly.
*   **In-situ Resource Utilization (ISRU):** Designed for manufacture at the Mercury L2 Lagrange point foundries using local materials (Aluminum, Silicon, Iron).

---

## 2. Technical Specifications (SCS-MkII "Helios")

*   **Orbit:** Mercury-Sun L1 Halo Orbit (initial deployment), migrating to 0.3 AU circular orbits.
*   **Design Life:** 25 Years (degradation limited).
*   **Form Factor:** Spin-stabilized hexagonal membrane.

### Physical Characteristics
| Parameter | Value | Notes |
| :--- | :--- | :--- |
| **Total Mass** | 225 kg | 85% is active sail/collector area. |
| **Diameter (Deployed)** | 1,000 meters | 0.785 km² surface area. |
| **Membrane Thickness** | 5 microns | Kapton-E substrate with vapor-deposited circuitry. |
| **Stowed Volume** | 1.5 m³ | Folded origami-style for dense launch packing. |

### Performance Metrics
| Parameter | Value | Notes |
| :--- | :--- | :--- |
| **Solar Irradiance (0.3 AU)** | ~15,000 W/m² | 11x Earth intensity. |
| **Collection Efficiency** | 42% | Multi-junction thin-film PV (tuned for high temp). |
| **Thermal Limit** | 600 K | Radiative cooling via rear surface. |
| **Power Output (Peak)** | ~4.9 GW | *Theoretical max before transmission losses.* |
| **Transmission Efficiency** | 88% | Solid-state phased array (Microwave). |
| **Specific Power** | ~19 kW/kg | **This is the critical metric for swarm viability.** |

---

## 3. System Architecture

The Helios satellite is essentially a "smart sheet." It lacks a central bus in the traditional sense. Instead, functionality is distributed across the membrane surface in repeating tiles.

### ASCII Diagram: The "Smart Sheet" Topology

```text
      / \     / \     / \
     / T \___/ T \___/ T \    <-- T: Transmission Tile (Phased Array)
    / \ /     \ /     \ /
   | P |   C   | P |   C   |  <-- P: Power Generation (PV Cells)
    \ / \     / \     / \
     \ T /___\ T /___\ T /    <-- C: Control Node (Logic/Comms/Attitude)
      \ /     \ /     \ /

   * The pattern repeats across the 1km surface.
   * Redundancy is massive; losing 20% of tiles results in only 20% power loss, not mission failure.
```

### Subsystems Breakdown

#### 3.1. Power Generation (The "Skin")
*   **Material:** Perovskite/CIGS tandem thin-film cells printed directly onto the substrate.
*   **Thermal Management:** The back of the membrane is coated in a high-emissivity ceramic dust (Alumina/Silica mix) derived from Mercurian regolith to radiate waste heat.

#### 3.2. Wireless Power Transmission (The "Beamer")
*   **Technology:** Metamaterial-based phased array.
*   **Frequency:** 5.8 GHz (ISM band) for local relay; adaptable to 35 GHz for long-range.
*   **Beam Steering:** Electronic steering via phase shifting. No moving parts. The entire satellite acts as the antenna aperture.

#### 3.3. Attitude Control & Station Keeping (The "Muscles")
*   **Primary Stabilization:** Spin stabilization (0.5 RPM) maintained by solar radiation pressure (SRP) vanes at the tips.
*   **Station Keeping:** Electric Solar Wind Sails (E-Sails). We deploy thin, charged tethers (2km length) from the vertices. Interaction with the solar wind provides thrust without propellant.
    *   *Assumption:* We assume the E-Sail technology reaches TRL 8 by 2044.

#### 3.4. Command & Data Handling (The "Brain")
*   **Architecture:** Distributed computing. Every 100th tile contains a RISC-V based micro-controller. They vote on satellite status.
*   **Rad-Hardening:** "Software-defined hardening." We accept high error rates from radiation but use massive redundancy and error-correcting voting logic to filter data.

---

## 4. Autonomy and Swarm Logic

We cannot control these from Earth. The light lag (minutes) and bandwidth constraints make it impossible.

*   **Behavioral Model:** Boid Flocking Algorithms.
    *   *Separation:* Maintain 50km distance from neighbors to prevent shading/collision.
    *   *Alignment:* Orient normal vector toward the Sun.
    *   *Cohesion:* Stay within the defined orbital shell.
*   **The "Queen" Nodes:** For every 10,000 Helios units, one "Hermes" class command station (heavier, traditional bus) manages the flock, calculates precise orbital parameters, and relays telemetry to Earth.

---

## 5. Manufacturing & Deployment (The Mercury Foundry)

**We do not launch these from Earth.** The delta-v requirements are prohibitive.

*   **Location:** Mercury Surface (Pole) -> Mass Driver -> L2 Foundry.
*   **Process:**
    1.  **Extraction:** Strip mining Mercurian regolith for Silicon, Aluminum, and Iron.
    2.  **Vapor Deposition:** In the vacuum of space, we use solar furnaces to melt materials and vapor-deposit the substrate and circuitry onto large rotating drums.
    3.  **Folding:** Automated origami folding reduces the 1km sheet to a 1.5m cylinder.
    4.  **Launch:** Electromagnetic railgun from the Foundry station gently pushes the packet into the drift orbit.

---

## 6. Development Roadmap

*   **2043 (Q1-Q4):** **Ground Truth.** Manufacture of 100m scale prototype on Earth. Vacuum chamber testing of thin-film deployment.
*   **2044:** **The "Icarus" Flight.** LEO test of a 500m unit. Validation of E-Sail propulsion and distributed computing.
*   **2045-2046:** **Mercury Infrastructure.** Arrival of heavy automated mining equipment at Mercury.
*   **2047:** **First Light.** Production of the first 100 Helios units at the Mercury L2 Foundry.
*   **2050:** **Exponential Ramp.** Production rate reaches 1,000 units per day.

---

## 7. Cost Analysis (Estimates in 2042 USD)

*Assumption: Heavy automation and ISRU drastically lower unit costs.*

*   **R&D (Phase 2):** $12.5 Billion
*   **Mercury Foundry Setup:** $45 Billion
*   **Unit Cost (First 1,000):** $500,000 / unit
*   **Unit Cost (At Scale - Year 5):** **$8,500 / unit**

**Cost Efficiency:** At $8,500 for ~5 GW of raw power generation, we are looking at **$0.0000017 per Watt** of installed capacity. This is orders of magnitude cheaper than any Earth-based energy source.

---

## 8. Risk Assessment

| Risk | Probability | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Micrometeoroid Impact** | High | Low | The "Rip-Stop" design ensures a puncture doesn't propagate. The distributed circuit mesh routes power around holes. |
| **Solar Flare / CME** | Medium | High | Satellites enter "Safe Mode" (edge-on to the sun) to minimize cross-section. Redundant, cold-spare computing nodes reboot post-event. |
| **Deployment Failure** | Medium | Medium | If the origami fails to unfold, the unit is dead. At $8,500, we accept a 5% failure rate as "cost of doing business." |
| **Beam Targeting Error** | Low | Critical | Hardware interlocks prevent the beam from forming unless a handshake signal is received from the target rectenna. |

---

## 9. Open Engineering Questions

1.  **Substrate Degradation:** How will the Kapton-E variant hold up to the intense UV flux at 0.3 AU over 25 years? We may need to develop a self-healing polymer or a silicate-glass coating.
2.  **E-Sail Tethers:** Can we manufacture 2km long conductive tethers reliably in zero-G using Mercurian aluminum? The tensile strength of cast aluminum is a concern.
3.  **Thermal Warping:** Will the thermal gradient between the sun-facing side and the dark side cause the membrane to curl, disrupting the phased array focus? We may need active electrostatic stiffening.

## 10. Conclusion

The SCS-MkII "Helios" is not a satellite in the traditional sense; it is a synthetic organism designed to live in the solar corona. By abandoning the safety of rigid trusses and heavy shielding, and embracing the "disposable swarm" mentality, we can achieve the energy density required for a Type II civilization transition.

I recommend immediate funding for the **"Icarus" LEO flight demonstrator** to validate the membrane deployment mechanics.

**Dr. Aris Thorne**
*Lead Systems Architect, Project Dyson*