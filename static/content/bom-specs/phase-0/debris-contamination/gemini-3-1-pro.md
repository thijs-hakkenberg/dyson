---
bomId: "bom-0-15"
itemName: "Debris and Contamination Control"
itemSlug: "debris-contamination"
modelId: "gemini-3-1-pro"
modelName: "Gemini 3.1 Pro"
generated: "2026-10-20"
phase: "phase-0"
---

**PROJECT DYSON: PHASE 0 TECHNICAL PROPOSAL**
**System:** bom-0-15 Debris and Contamination Control (0A+0B)
**Prepared by:** Lead Space Systems Engineer

---

### 1. Recommended Approach and Design Philosophy

In microgravity, uncontained mining and processing will rapidly envelop the target Near-Earth Asteroid (NEA) in a hazardous debris cloud, degrading solar arrays (bom-0-5), blinding sensors, and creating collision risks for MW-class tugs (bom-0-4). 

Our philosophy is **"Contain at source, consolidate waste, and monitor the perimeter."** We reject the idea of simply venting tailings into space. Under Owner Decision D-03 (ALARP with an interim ceiling), we establish an interim design ceiling of **<100 parts per million (ppm) by mass** for escaped excavated material. If we excavate 20 kt/yr to yield 1 kt/yr of Fe-Ni product, total escaped mass must remain below 2,000 kg/year, predominantly limited to sub-micron particulates rather than macroscopic spall.

### 2. Technical Specifications

*   **Containment Ceiling:** <0.01% (100 ppm) of total excavated mass.
*   **Particle Size Managed:** 1 µm to 10 cm.
*   **Tailings Consolidation:** Microwave sintering or polymer-bagging of silicate/slag waste to >1.5 g/cm³ bulk density.
*   **Perimeter Monitoring:** Detection of >1 mm particles at 5 km radius; optical depth monitoring for <1 mm dust.
*   **Power Allocation:** 50 kW continuous (drawn from site power) for electrostatic dust shields (EDS) and tailings consolidation.

### 3. System Architecture

The system operates in three concentric zones:
1.  **Zone 1 (Source):** Mechanical shrouds and EDS on the tethered mining robots.
2.  **Zone 2 (Plant):** Closed-loop beneficiation and tailings consolidation.
3.  **Zone 3 (Perimeter):** Halo-orbiting monitoring satellites and electrostatic sweepers.

```text
       [Halo Orbit: Perimeter Monitoring Constellation]
            \           |           /
             \  Lidar & Optical    /
              \    Scanning       /
               \                 /
  ............................................. (5 km Perimeter)
  .                                           .
  .     [Processing Plant]                    .
  .      |-- Beneficiation (Sealed)           .
  .      |-- Tailings Sintering Unit          .
  .      |-- Sintered Slag Stack (Tethered)   .
  .                                           .
  .        (( Electrodynamic Shroud ))        .
  .           [Mining Robot]                  .
  .===========================================.
                TARGET NEA SURFACE
```

### 4. Subsystems Breakdown

*   **4.1 Active Containment (Mining Robots):** Flexible, articulated Kevlar/Kapton shrouds enclose the cutting heads. The inner surfaces are lined with multi-phase Electrostatic Dust Shields (EDS) operating at 1-3 kV (leveraging the robot's HV tether) to repel dust back toward the collection intake.
*   **4.2 Tailings Management System (TMS):** The largest source of contamination is rejected ore. The TMS uses a low-power microwave sintering auger to fuse silicate dust and slag into inert, solid "bricks." These are stacked and tethered to the NEA surface to prevent orbital drift.
*   **4.3 Perimeter Monitoring Network (PMN):** 4 to 6 nanosatellites (12U equivalent, ~20 kg each) stationed in loose halo orbits around the NEA. Equipped with scanning LiDAR and wide-angle star trackers to measure dust optical depth and track macroscopic debris trajectories.
*   **4.4 Plant EDS & Radiator Protection:** Critical plant surfaces, particularly waste-heat radiators, are coated with transparent Indium Tin Oxide (ITO) EDS grids to actively clear settled dust.

### 5. Development Roadmap and Technology Readiness

*   **Phase 0A (Pathfinder):** 
    *   *Objective:* Characterize NEA dust charging environment; test EDS coupons and miniature microwave sintering on the 0A demonstrator (bom-0-12).
    *   *TRL Targets:* Advance EDS and microgravity sintering from TRL 4 to TRL 6.
*   **Phase 0B (Industrial):** 
    *   *Objective:* Full deployment of the PMN constellation, full-scale TMS at the processing plant, and active shrouds on all mining robots.

### 6. Cost Analysis and Budget Estimates

**Disagreement with Round-2 Figures:** The prior range of $50M-$300M is too broad and lacks structural justification. Claude's $50M floor is dangerously low for a system requiring active monitoring constellations and heavy processing hardware (sintering). I propose a tightened range of **$130M - $210M**, aligning closer to Gemini and GPT's mid-to-upper estimates, split as follows:

*   **Phase 0A (R&D, Pathfinder Payloads, Modeling):** $45M - $65M
    *   Dust plasma modeling & NRE: $15M
    *   0A Pathfinder EDS/Sintering payloads: $30M - $50M
*   **Phase 0B (Production Hardware & Deployment):** $85M - $145M
    *   Tailings Sintering Unit (Plant integration): $40M - $70M
    *   Perimeter Monitoring Network (6x sats + spares): $25M - $40M
    *   Robot Shrouds & Plant EDS coatings: $20M - $35M
*   **Total bom-0-15 Budget:** **$130M - $210M**

### 7. Risk Assessment & Open Questions

*   **Risk:** *Sintering Failure.* If microwave sintering fails due to variable ore dielectric properties, tailings will remain loose. *Mitigation:* Fallback to polymer-binder bagging (adds mass penalty for Earth-supplied consumables).
*   **Risk:** *EDS Degradation.* Abrasive spall could sever the ITO traces on the electrostatic shields. *Mitigation:* Redundant trace routing and self-healing dielectric coatings.
*   **Open Question:** What is the exact triboelectric charging behavior of the specific NEA regolith in the solar wind wake? (Must be answered in 0A to tune the EDS driving frequencies).
*   **Open Question:** Can the PMN nanosatellites maintain stable halo orbits in the perturbed gravity field of a tumbling NEA without excessive station-keeping propellant?