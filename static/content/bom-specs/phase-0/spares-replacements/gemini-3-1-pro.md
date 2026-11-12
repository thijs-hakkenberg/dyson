---
bomId: "bom-0-14"
itemName: "Spares and Replacements"
itemSlug: "spares-replacements"
modelId: "gemini-3-1-pro"
modelName: "Gemini 3.1 Pro"
generated: "2026-10-20"
phase: "phase-0"
---

# Technical Proposal: bom-0-14 Spares and Replacements (0B)

## 1. Recommended Approach and Design Philosophy
For a fully uncrewed, high-throughput (1 kt/yr) industrial operation at a Near-Earth Asteroid (NEA), maintenance cannot rely on ad-hoc repairs. My design philosophy for the Phase 0 Spares and Replacements program is based on **Orbital Replacement Units (ORUs)** and **Predictive Logistics**. 

Instead of repairing components, autonomous maintenance robots will swap standardized ORUs. We categorize spares into two tiers:
1.  **Consumables & High-Wear Items**: Crusher jaws, EP (Electric Propulsion) thruster grids, cutting heads, and tether segments. These have predictable degradation curves.
2.  **Random-Failure Items**: Avionics, power management and distribution (PMAD) modules, and sensors. These require a statistical buffer.

**Disagreement with Round-2 Figures:** I reject GPT's upper bound of $2.5B (excluding robots) as excessively pessimistic for a 1 kt/yr operation. If spares cost $2.5B, the baseline hardware reliability is fundamentally unsuited for space mining. I align closer to Claude's $0.5–$1.5B range, specifically targeting **$0.6B–$1.4B**, assuming a 20-25% mass buffer for wear items and a 10% buffer for avionics.

## 2. System Architecture

The spares architecture relies on a primary depot at the NEA and a secondary staging node at SEL1. MW-class cargo tugs will transport precision spares from Earth (via SEL1) to the NEA on their return trips (which are otherwise flying empty or carrying only EP propellant).

```text
[Earth Manufacturing]
       | (Launch)
       v
[SEL1 Receiving Node] ---> (Spares Cache & Tug Integration)
       |
       | (MW-Class Cargo Tugs - Return Trip)
       v
[NEA Processing Site] ---> [Automated Spares Depot]
                               |--> Mining Robots (Tool swaps)
                               |--> Processing Plant (Crucible/Crusher ORUs)
                               |--> Site Power (Inverter/Array ORUs)
```

## 3. Technical Specifications and Sizing
*   **Total Spares Mass Allocation (0B):** ~15–20% of the initial deployed mass (approx. 40–60 tonnes of spares for a ~250–300 tonne initial NEA deployment).
*   **High-Wear Buffer:** 30% of active unit count (e.g., if 10 mining robots are active, 3 full sets of replacement tracks/tools are stocked).
*   **Avionics/Random Failure Buffer:** 10% of active unit count, utilizing N-modular redundancy for critical paths.
*   **Storage Environment:** Passive thermal control (radiators/MLI) keeping electronic spares between -20°C and +40°C. Mechanical spares stored exposed to vacuum.

## 4. Subsystems Breakdown and Interfaces
*   **Standardized Grapple Fixtures:** All ORUs must feature a unified electro-mechanical interface (e.g., an evolution of the ISS iLIDS or Androgynous Peripheral Attach System, scaled down for robotics) allowing a single type of maintenance manipulator to swap any part.
*   **Smart Spares RFID/NFC:** Every spare includes a passive RFID tag and a low-power health-monitoring circuit to verify it survived launch and transit before installation.
*   **Automated Spares Depot (ASD):** A localized rack system at the NEA processing plant. Includes a dust-mitigated "clean zone" for sensitive sensor ORUs, utilizing electrostatic dust shields (EDS).

## 5. Autonomy, Control, and Communication
*   **Predictive Maintenance (PdM):** The ground segment (bom-0-9) will run digital twins of all NEA assets. Telemetry (vibration, thermal gradients, current draw) will predict failures before they occur.
*   **Autonomous Swapping:** The actual physical swap of an ORU will be executed autonomously by site maintenance robots, supervised by Earth via delayed telemetry. 
*   **Safe-Mode Integration:** If an ORU fails during a swap, the system must autonomously revert to a safe state (e.g., locking the mechanism) to await Earth intervention.

## 6. Development Roadmap and Technology Readiness
*   **Phase 0A (Pathfinders):** Focus on validating the ORU electro-mechanical interface in dusty, microgravity environments (TRL 4 to 6). Test autonomous robotic swapping on the 0A demonstrator.
*   **KDP-0B Gate:** Require TRL 6 for the automated spares depot and 100% success rate in simulated delayed-telemetry ORU swaps.
*   **Phase 0B (Industrial):** Deploy the initial spares cache with the primary processing plant. Establish the SEL1-to-NEA replenishment pipeline.

## 7. Cost Analysis and Budget Estimates

| Phase | Category | Range Estimate (USD) | Basis / Notes |
| :--- | :--- | :--- | :--- |
| **0A** | Interface R&D & Pathfinder Spares | $50M – $100M | Development of standard ORU interfaces and 0A flight spares. |
| **0B** | Initial NEA Spares Cache | $300M – $700M | ~40-60t of hardware (EP grids, crusher jaws, avionics). |
| **0B** | Replenishment Pipeline (5 yrs) | $250M – $600M | Ongoing Earth-manufactured precision parts, shipped via SEL1. |
| **Total** | **bom-0-14 Spares Program** | **$600M – $1,400M** | Aligns with a 20% inventory buffer philosophy. |

*(Note: Launch costs are accounted for in bom-0-8; this budget covers hardware manufacturing, integration, and depot infrastructure).*

## 8. Risk Assessment
*   **Risk:** *Dust Contamination during ORU Swap.* (High probability, High impact). Dust ingress into electrical connectors during a swap could short out the new spare.
    *   *Mitigation:* Use self-wiping, dust-tolerant connectors and electrostatic repulsion fields around critical interfaces.
*   **Risk:** *Spare Degradation in Storage.* (Medium probability, Medium impact). Lubricants freezing or cold-welding over years in the NEA depot.
    *   *Mitigation:* Hermetic sealing for sensitive mechanical ORUs; active thermal heating loops plugged into the depot's PMAD.

## 9. Open Engineering Questions
1.  **In-Situ Manufacturing vs. Earth Import:** At what point in Phase 0B does it become mass-optimal to 3D print low-precision mechanical spares (e.g., brackets, simple structural links) at the NEA using the extracted Fe-Ni, rather than importing them from Earth?
2.  **EP Grid Lifespans:** Iodine (the reference propellant) is highly reactive. Will EP thruster grids require replacement every round-trip, and if so, can the MW-class tugs perform self-maintenance at SEL1?