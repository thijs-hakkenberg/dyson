---
bomId: "bom-0-3"
itemName: "Processing Plant at the Target NEA"
itemSlug: "material-processing-station"
modelId: "gemini-3-1-pro"
modelName: "Gemini 3.1 Pro"
generated: "2026-10-20"
phase: "phase-0"
---

# Technical Proposal: bom-0-3 Processing Plant at the Target NEA (Phase 0B)

## 1. Recommended Approach and Design Philosophy

The 2026 re-assessment definitively retired the centralized 50 kt/yr SEL4/L5 processing station. The physics of electric propulsion logistics dictate that we must process ore at the source. This proposal outlines a **co-located, fully autonomous, uncrewed Fe-Ni beneficiation and primary processing plant** at the target Near Earth Asteroid (NEA). 

**Design Philosophy:**
*   **Targeted Output:** Native/reduced Fe-Ni alloy only. Silicon and Aluminum are deferred to Phase 1+.
*   **Short-Arm Centrifugation:** We reject the legacy 50-meter rotating truss. For an uncrewed system, human-comfort Coriolis limits are irrelevant. We baseline a 5-meter radius short-arm centrifuge generating 0.1g to enable buoyancy-driven slag/metal separation without requiring MW-class rotary electrical joints.
*   **Strict Autonomy:** Zero crew visits. The system relies on local fault containment, robotic servicing interfaces, and modular Line Replaceable Units (LRUs).
*   **Tailings Containment:** Asteroid-side processing demands rigorous particulate control to prevent optical degradation of solar arrays and local navigation hazards.

## 2. Technical Specifications

*   **Throughput (Phase 0B):** 1,500 t/yr of refined Fe-Ni product (scaled from 400 t/yr Phase 0A pathfinder).
*   **Concentration Ratio:** 10:1 (Excavated to Concentrate). Requires ~15,000 t/yr of raw regolith feed.
*   **Initial Station Mass:** 220 t (excluding power generation and tugs).
*   **Installed Power Allocation:** 1.5 MWe (supplied by bom-0-5).
*   **Waste Heat Rejection:** 1.2 MWth at 350 K.
*   **Design Life:** 15 years (with replaceable furnace cartridges).
*   **Comms/Data:** 10 Mbit/s burst telemetry to Earth/Relay; local autonomous control loop at 1 kHz.

## 3. System Architecture & Subsystems

The plant is divided into a static microgravity hub and a rotating processing section.

```text
[Solar Arrays (bom-0-5)] ---> [Static Hub: Power Conditioning, Comms, Command]
                                      |
                                      | (Low-power slip ring / contactless transfer)
                                      v
[Mining Bots (bom-0-2)] ---> [Beneficiation Module] ---> [Tailings Bagging/Ejection]
                                      |
                                      | (Magnetic Concentrate Feed)
                                      v
                            [Rotating Assembly (5m radius, 4.2 rpm)]
                               /                     \
                   [Furnace Cartridge A]         [Furnace Cartridge B]
                   (Induction Melt, 0.1g)        (Induction Melt, 0.1g)
                               \                     /
                                \                   /
                                 [Product Extrusion & Packaging]
                                          |
                                          v
                            [Cargo Tug Interface (bom-0-4)]
```

### Subsystem Breakdown
1.  **Beneficiation & Feed Preparation:** Microgravity magnetic separators. Chondrite feed is crushed, and native Fe-Ni flakes are magnetically extracted. Silicate tailings are consolidated into sintered blocks or contained bags for use as local shielding or safe ejection.
2.  **Thermal Processing (Short-Arm Centrifuge):** Twin 15-ton furnace cartridges counter-rotating or balanced on a 5m truss. Operating at 4.2 rpm to achieve 0.1g. Uses induction heating (~800 kW peak) to melt the concentrate. Slag floats to the interior edge for skimming.
3.  **Waste-Heat Rejection:** 750 m² of pumped two-phase fluid radiators (ammonia/water) deployed from the static hub. Furnace cartridges use high-temperature liquid metal loops interfacing via heat exchangers at the rotary joint.
4.  **Product Packaging:** Consolidates Fe-Ni into standard 5-ton ingots/billets with standardized grapple fixtures for the MW-class cargo tugs.

## 4. Development Roadmap and Technology Readiness

*   **Phase 0A (Years 1-3):** Ground qualification of short-arm centrifuge hydrodynamics (TRL 4 to 6). Bench-scale validation of microgravity magnetic beneficiation.
*   **Phase 0A Flight (Years 4-6):** Pathfinder demonstrator processing 400 t/yr feed. Validation of tailings containment and autonomous fault recovery.
*   **Phase 0B Gate:** Triggered by achieving >90% metal recovery, <2 kWh/kg energy intensity, and 100+ autonomous cycles without critical failure.
*   **Phase 0B (Years 7+):** Full-scale 1.5 kt/yr production and continuous dispatch to SE-L1.

## 5. Cost Analysis and Budget Estimates

*Estimates represent the Phase 0B build-out, assuming 0A NRE is amortized.*

| Item | Cost Range ($M) | Notes |
| :--- | :--- | :--- |
| **Station Core & Structures** | 1,200 - 2,500 | Static hub, docking interfaces, structural truss |
| **Beneficiation & Tailings** | 400 - 800 | Crushers, magnetic separators, containment |
| **Centrifuge & Furnaces** | 800 - 1,500 | Replaceable cartridges, induction coils, rotary joints |
| **Thermal Control (Radiators)**| 300 - 600 | High-temp loops, deployable panels |
| **Avionics, Autonomy & Comms**| 500 - 900 | Hardened compute, local sensor fusion |
| **Launch & Assembly (Earth)** | 1,500 - 3,500 | Heavy lift to NEA trajectory, robotic checkout |
| **Total bom-0-3 Estimate** | **$4.7B - $9.8B** | Excludes power (bom-0-5) and tugs (bom-0-4) |

## 6. Risk Assessment & Open Questions

**Primary Risks:**
1.  **Coriolis Effects on Melt (Risk: High):** At a 5m radius, the Coriolis gradient across a 0.3m melt pool is ~6%. *Mitigation:* Ground-based CFD and sub-scale orbital flight tests before 0B commitment.
2.  **Particulate Contamination (Risk: Critical):** Escaped silicate dust blinding optics or radiator surfaces. *Mitigation:* Strict enclosed-loop processing; electrostatic precipitators at all vents.
3.  **Rotary Joint Wear (Risk: Medium):** Transferring ~1 MW of power across a rotating boundary in vacuum. *Mitigation:* Use of contactless inductive power transfer for the rotating module, accepting a 5-10% efficiency penalty to eliminate mechanical brush wear.

**Open Engineering Questions:**
*   *Slag Handling:* What is the optimal viscosity of the silicate slag at 0.1g to ensure clean separation without excessive superheating?
*   *Startup Feed Strategy:* How is the station thermally stabilized before the first batch of indigenous feed arrives from the mining robots? (Requires pre-packaged Earth-supplied starter ingots).