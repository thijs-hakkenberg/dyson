---
bomId: "bom-0-13"
itemName: "Phase 1 Receiving Node (SEL1)"
itemSlug: "receiving-node"
modelId: "gemini-3-1-pro"
modelName: "Gemini 3.1 Pro"
generated: "2026-10-20"
phase: "phase-0"
---

# Technical Proposal: bom-0-13 Phase 1 Receiving Node (SEL1)

**To:** Project Dyson Systems Engineering Directorate
**From:** Lead Space Systems Engineer
**Date:** October 2026
**Subject:** Detailed Specification for bom-0-13 (Phase 1 Receiving Node)

## 1. Recommended Approach and Design Philosophy

The Phase 1 Receiving Node at Sun-Earth L1 (SEL1) serves as the critical logistics buffer between Phase 0 (NEA extraction and processing) and Phase 1 (Dyson swarm manufacturing). 

**Design Philosophy: The "Dumb Warehouse"**
Because processing has been moved to the NEA (per the 2026 re-assessment), the SEL1 node requires zero metallurgical or beneficiation capabilities. It is strictly a logistics, storage, and transfer hub. The design prioritizes high-reliability robotic cargo handling, standardized berthing interfaces for the MW-class cargo tugs (bom-0-4), and modular storage racks for standardized Fe-Ni product containers. It must operate entirely uncrewed.

## 2. Technical Specifications

*   **Orbit:** Sun-Earth L1 (Halo orbit)
*   **Throughput Capacity:** 1.0 – 2.5 kt/yr (Fe-Ni ingots/spools)
*   **Buffer Storage Capacity:** 600 metric tons (approx. 3-6 months of Phase 0 production)
*   **Dry Mass:** 45 – 65 t (excluding docked tugs and cargo)
*   **Power Generation:** 75 kW (End of Life) via rigid solar arrays
*   **Station Keeping:** Iodine or Argon Hall-effect thrusters (aligned with D-05)
*   **Design Life:** 15 years (extendable via modular subsystem replacement)

## 3. System Architecture

The architecture relies on a central longitudinal truss to separate the dynamic loads of docking tugs from the static storage racks.

```text
      [Solar Array]                 [Solar Array]
           |                              |
           +------------------------------+
           |                              |
[Docking]--+--[Robotic Transfer Arms (2)]-+--[Docking]
[Port A]   |                              |  [Port B]
 (Tugs)    +--[Modular Storage Racks]-----+  (Phase 1)
           |    [Fe-Ni] [Fe-Ni] [Fe-Ni]   |
           +------------------------------+
           |                              |
      [Radiators]                    [Radiators]
           |
    [Station Keeping / Comms Module]
```

## 4. Subsystems Breakdown and Interfaces

*   **Structure & Mechanisms:** 20-meter composite central truss. Standardized International Docking System Standard (IDSS) derivatives, scaled for uncrewed bulk cargo rather than pressurized crew transfer.
*   **Robotics (Cargo Handling):** Dual 7-DOF symmetrical robotic arms (similar to Canadarm2 but optimized for repetitive, high-mass, low-speed translation of 5-ton product canisters).
*   **Power & Thermal:** 75 kW solar arrays. Waste heat is minimal compared to Phase 0 processing nodes; 15 kW rejection capacity via deployable radiators is sufficient for avionics and robotics.
*   **ADCS & Propulsion:** SEL1 is dynamically unstable. Station-keeping requires ~50 m/s $\Delta v$ per year. The node uses a low-thrust EP system (Iodine/Argon) drawing from the bom-0-16 supply chain.
*   **Interfaces:** 
    *   *Inbound:* MW-class tugs (bom-0-4)
    *   *Outbound:* Phase 1 manufacturing feeders
    *   *Refueling:* Fluid transfer interfaces for EP propellant (if the node acts as a local depot for tugs).

## 5. Autonomy, Control, and Communication

*   **Autonomy:** High level of local autonomy for cargo transfer operations. The light-delay to Earth from SEL1 is ~5 seconds, making direct teleoperation of robotic arms inefficient. The node will use computer vision and fiducial markers to execute pre-planned cargo transfer macros.
*   **Comms:** Ka-band high-gain antenna for telemetry and ground control (bom-0-9), plus local S-band/Wi-Fi for close-proximity tug operations.

## 6. Development Roadmap and Technology Readiness

*   **Phase 0A (Pathfinder/NRE):** TRL 4-5. Development of the standardized cargo canister, robotic transfer simulations, and scaled docking tests in LEO. No physical SEL1 hardware deployed.
*   **Phase 0B (Industrial):** TRL 6 to 9. Fabrication, launch, and deployment to SEL1.
*   **Gate Condition:** KDP-0B requires successful demonstration of autonomous high-mass cargo transfer in a microgravity environment.

## 7. Cost Analysis and Budget Estimates

I agree with the Round-2 estimate of **$200M – $600M**, but provide the following breakdown and justification:

*   **Phase 0A (NRE & Interface Design):** $35M – $60M
    *   *Focus:* Cargo standardization, robotics software, interface definition.
*   **Phase 0B (Hardware, Launch, Commissioning):** $250M – $450M
    *   *Bus & Structure:* $100M – $150M
    *   *Robotics & Mechanisms:* $80M – $150M (High reliability requirement drives cost)
    *   *Launch (Earth-to-SEL1):* $70M – $150M (Requires heavy lift or dedicated tug)
*   **Total Range:** **$285M – $510M** (Fits comfortably within the prior $200-600M envelope).

## 8. Risk Assessment

1.  **Robotic Jamming/Failure (High Impact, Med Probability):** A failed robotic arm could strand 1 kt of Fe-Ni. *Mitigation:* Dual redundant arms; canisters designed with passive alignment guides to minimize precision requirements.
2.  **Docking Collisions (High Impact, Low Probability):** MW-class tugs have high inertia. *Mitigation:* Tugs hold station at 50 meters; the Receiving Node's robotic arms perform the final capture and berthing (similar to early ISS Dragon/Cygnus captures).
3.  **SEL1 Station Keeping Failure (Critical Impact, Low Probability):** Loss of propulsion means the node drifts out of the halo orbit. *Mitigation:* Redundant EP thruster strings and generous onboard propellant reserves.

## 9. Open Engineering Questions

*   **Propellant Depot Function:** Should the Receiving Node also store and dispense EP propellant (bom-0-16) for the returning MW-class tugs, or will tugs carry round-trip propellant from the NEA? *Recommendation:* Node should act as a depot to maximize tug payload mass fraction.
*   **Product Form Factor:** Are we transferring 5-ton solid ingots, or spools of drawn wire? This drastically changes the robotic end-effector design. *Recommendation:* Standardized 5-ton hexagonal cassettes, regardless of internal contents.