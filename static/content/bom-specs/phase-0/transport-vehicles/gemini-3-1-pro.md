---
bomId: "bom-0-4"
itemName: "MW-class Cargo Tugs"
itemSlug: "transport-vehicles"
modelId: "gemini-3-1-pro"
modelName: "Gemini 3.1 Pro"
generated: "2026-10-20"
phase: "phase-0"
---

# Technical Proposal: MW-class Cargo Tugs (bom-0-4)
**Phase 0B - Space Resource Processing**

## 1. Recommended Approach and Design Philosophy
The Phase 0B cargo transport architecture relies on a fleet of uncrewed, high-power Solar Electric Propulsion (SEP) tugs. Following the 2026 re-assessment, the design discards human-rating margins, crew habitats, and LOX/LH₂ propulsion. 

Our philosophy centers on **Modular Autonomy and High-Density Storage**. We baseline **Iodine (I₂)** as the propellant to bypass the cryogenic requirements of argon and the supply-chain impossibilities of xenon. To mitigate iodine's corrosive properties and lower TRL, the propulsion modules are designed as robotically replaceable Line Replaceable Units (LRUs). The tug operates as a continuous shuttle between the target NEA and the SEL1 delivery node, berthing with standardized 200-ton cargo containers via a despun interface.

## 2. Technical Specifications

*   **Fleet Size:** 15 operational vehicles
*   **Power Generation:** 1.5 MWe BOL (1 AU) via deployable flexible solar arrays
*   **Vehicle Dry Mass:** 38 t (excluding cargo)
*   **Propellant Capacity:** 75 t (Iodine, stored as solid, sublimated via waste heat)
*   **Payload Capacity:** 200 t (Fe-Ni product in standardized containers)
*   **Propulsion:** 10x 150 kW Magnetically Shielded Hall Effect Thrusters (8 active, 2 spare)
*   **Thrust & Isp:** ~28 N total thrust at 2,100 s Isp
*   **Round-trip Δv:** ~6.5 km/s (Target dependent)
*   **Cycle Time:** ~2.5 - 3.0 years per round trip

## 3. System Architecture

The vehicle is built around a central titanium/composite truss. The forward section houses the despun docking interface and avionics. The mid-section holds the solid iodine tanks and deployable solar arrays. The aft section houses the Power Processing Units (PPUs), deployable radiators, and the thruster LRUs.

```text
      [Cargo Container] (200t)
             ||
      ======[IDSS-derived Despun Docking Port]======
             ||
   /---------||---------\
  /  [Avionics & GNC]    \
 |                        |
 |=== [Iodine Tanks] ===  |  <-- Sublimation heaters integrated
 |                        |
 |                        |
[Solar Array]      [Solar Array]  <-- 1.5 MWe Total (Flexible Roll-out)
 |                        |
 |---[Pumped Fluid Loop]---|
 |                        |
 |=== [Radiator Wings] ===|  <-- MW-class waste heat rejection
  \                      /
   \-----[PPU Deck]-----/
             ||
       [Thruster Pods]  <-- 10x 150kW Hall Thrusters (Robotic LRUs)
       * * * * * * * *
```

## 4. Subsystems Breakdown and Interfaces

*   **Power & PMAD:** Dual 750 kWe roll-out solar array wings (approx. 3,500 m² total area). PMAD steps down high-voltage array output (1-3 kV) directly to the PPUs to minimize cable mass, with a 50 kWh secondary battery system for safe-mode operations and eclipse transient handling.
*   **Propulsion & Feed:** Solid iodine stored in unpressurized conformal tanks. Waste heat from the PPUs is routed to the tanks to sublimate the iodine to ~40°C. Feed lines are heated and constructed from Hastelloy to prevent corrosion and deposition.
*   **Thermal Control:** High-temperature pumped fluid loops (NaK or similar liquid metal) rejecting ~400 kW of waste heat from the PPUs and thrusters via deployable composite radiators.
*   **Docking Interface:** Despun, non-rotating standard interface. Stripped of life-support pass-throughs, retaining only structural latching, power (0.1 MW peak dockside), and data linkages.

## 5. Autonomy, Control, and Communication

*   **GNC:** Fully autonomous deep-space navigation using optical star trackers, sun sensors, and deep-space atomic clocks. Proximity operations at the NEA and SEL1 utilize LIDAR and machine-vision for autonomous rendezvous and docking (T12).
*   **Communications:** X-band for high-bandwidth telemetry and optical communications for payload data (10-100 kbps cruise, 1-10 Mbps prox ops). DSN-compatible but relies heavily on the dedicated Phase 0 ground segment to reduce DSN load.
*   **Autonomy:** "Smart fault" architecture. If a thruster degrades, the onboard system autonomously re-routes power to a spare and schedules an LRU swap for the next SEL1 or NEA dock visit.

## 6. Development Roadmap and Technology Readiness

*   **Phase 0A (2026-2029):** 
    *   *T01 & T14:* Ground-based wear testing of 150 kW iodine Hall thrusters (>10,000 hours).
    *   *T02:* Sub-scale deployment tests of MW-class array structures in LEO.
*   **Pathfinder Demo (2030):** Single 500 kWe sub-scale tug launched to validate iodine feed systems in microgravity and autonomous docking.
*   **Phase 0B (2032+):** Serial production and deployment of the 15-vehicle fleet.

## 7. Cost Analysis and Budget Estimates

*   **NRE & Qualification:** $1.2B (Heavily driven by MW-thruster endurance testing and thermal system qualification).
*   **Unit Recurring Cost:** $220M per tug (excluding launch).
    *   *Structure & Thermal:* $40M
    *   *Power Arrays & PMAD:* $90M
    *   *Propulsion (Iodine + PPUs):* $60M
    *   *Avionics/GNC:* $30M
*   **Fleet Total (15 units):** $3.3B
*   **Launch & Injection:** ~$120M per vehicle (Commercial heavy lift to high-Earth orbit).

## 8. Risk Assessment

1.  **Iodine Corrosion & Deposition (High Risk):** Iodine vapor can attack spacecraft surfaces and degrade solar array cover glass. *Mitigation:* Plume shielding, strict thermal management of feed lines, and Hastelloy wetted parts.
2.  **MW-Scale Array Deployment (Medium Risk):** Large flexible structures are prone to dynamic oscillations. *Mitigation:* Despun docking minimizes torque; active vibration damping in the PMAD structural spine.
3.  **Thruster Lifetime (Medium Risk):** Required throughput is ~70 t per vehicle. *Mitigation:* Modular thruster pods designed for robotic replacement at SEL1 or the NEA.

## 9. Open Engineering Questions

1.  **Target NEA Orbit:** Exact ephemeris of the selected NEA will dictate the synodic window constraints. If windows are narrow, we may need to increase power to 2.0 MWe to shorten transit times.
2.  **Plume-Array Interaction:** Long-term degradation of array efficiency due to iodine plasma impingement requires dedicated LEO pathfinder data.
3.  **Robotic Swap Mechanics:** The exact kinematic envelope for the SEL1/NEA robotic arms to swap a 500 kg thruster pod without damaging adjacent radiators remains to be detailed.