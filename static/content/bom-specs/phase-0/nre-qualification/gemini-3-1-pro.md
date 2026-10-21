---
bomId: "bom-0-11"
itemName: "NRE, Ground R&D and Qualification"
itemSlug: "nre-qualification"
modelId: "gemini-3-1-pro"
modelName: "Gemini 3.1 Pro"
generated: "2026-10-20"
phase: "phase-0"
---

# Technical Proposal: bom-0-11 NRE, Ground R&D and Qualification (0A and 0B)

## 1. Recommended Approach and Design Philosophy

The Non-Recurring Engineering (NRE), Ground R&D, and Qualification program is the foundational engine of Phase 0. Our philosophy is **"Simulate everything, test the critical physics, qualify the integrated system."** 

Given the extreme cost of space operations, Phase 0A must retire fundamental physics and engineering risks (microgravity metallurgy, dusty plasma interactions, MW-class EP scaling) on the ground before KDP-0B. We will utilize a hybrid verification approach: massive-scale multiphysics simulations anchored by targeted, highly instrumented ground tests in bespoke facilities. 

We explicitly separate 0A (TRL 3 → 6: proving it works in a relevant ground environment) from 0B (TRL 6 → 8: flight qualification and manufacturing engineering).

## 2. System Architecture: The R&D Pipeline

```text
[Digital Engineering Environment] <------------------------------------------+
       | (Requirements, Multiphysics Models, Hardware-in-the-Loop)           |
       v                                                                     |
[0A Ground Facilities (TRL 3-5)]                                             | (Data Feedback)
  +-- Micro-g Metallurgy Rigs (Drop towers, Parabolic, Mag-lev)              |
  +-- Dusty TVAC Chambers (Regolith simulant + vacuum + thermal)             |
  +-- MW-Class EP Test Stands (Iodine/Argon high-throughput pumping)         |
       |                                                                     |
       v  <KDP-0A/B Gate: TRL 6 achieved>                                    |
[0B Qualification & Integration (TRL 6-8)]                                   |
  +-- Engineering Qualification Models (EQM)                                 |
  +-- Flight Qualification Models (FQM)                                      |
  +-- Tooling & Manufacturing NRE (Setup for 1 kt/yr production hardware) ---+
```

## 3. Technical Specifications: Critical Ground Facilities

To support the TRL T01-T26 maturation, several bespoke ground facilities must be constructed or leased/upgraded:

*   **Facility 1: MW-Class EP Vacuum Complex (The "Iodine Cave")**
    *   *Purpose:* Testing 1-2.5 MWe tug thrusters.
    *   *Specs:* 15m x 30m chamber. Cryopumping capacity >500,000 L/s. 
    *   *Special Requirement:* Because Iodine (baseline) is highly corrosive, the chamber requires titanium/specialized alloy lining and active scrubbing systems, significantly driving up facility costs compared to Xenon/Argon chambers.
*   **Facility 2: Dusty TVAC (Thermal Vacuum) Chamber**
    *   *Purpose:* Testing mining robots, HV tethers, and beneficiation hardware.
    *   *Specs:* 10m diameter. Capable of handling highly abrasive, charged carbonaceous/silicate simulant in hard vacuum (10^-6 Torr) with solar simulators.
*   **Facility 3: Micro-g Metallurgy Laboratory**
    *   *Purpose:* Carbonyl/electrolytic extraction and Fe-Ni casting tests.
    *   *Specs:* Electromagnetic levitation melting rigs, integrated with 10-second drop tower capsules to validate surface tension and phase separation models before the bom-0-12 space pathfinder flies.

## 4. Development Roadmap and Technology Readiness

*   **Year 1-2 (0A):** Facility construction/upgrades. Initial sub-scale testing. Multiphysics model anchoring.
*   **Year 3-4 (0A):** Full-scale subsystem testing (TRL 5). Integrated dusty-vacuum tests of mining end-effectors. MW EP long-duration wear tests.
*   **Year 5 (Gate KDP-0B):** All critical tech reaches TRL 6. 
*   **Year 6-7 (0B):** Build and test Engineering Qualification Models (EQMs). System-level EMI/EMC, vibration, and acoustic testing.
*   **Year 8 (0B):** Final Flight Qualification Models (FQMs) complete. Manufacturing lines locked.

## 5. Cost Analysis and Budget Estimates

**Disagreement with Round-2 Figures:**
I agree with GPT's approach of splitting 0A and 0B, but Claude's inclusion of a dedicated $0.5-1.5B line for ground facilities is highly accurate and must be explicitly budgeted. Iodine EP testing and dusty-vacuum facilities do not currently exist at the required scale. 

I propose the following ranges based on historical mega-project NRE (e.g., James Webb, SLS core stage, commercial mega-constellations):

| Phase | Category | Cost Range ($B) | Basis / Justification |
| :--- | :--- | :--- | :--- |
| **0A** | Ground Facilities (CapEx) | $0.8 - $1.6 | MW Iodine TVAC ($400M), Dusty TVAC ($300M), Metallurgy Labs ($200M), upgrades. |
| **0A** | Core NRE & Engineering | $3.5 - $5.0 | ~2,000 FTEs over 5 years ($2.5B), sub-scale test articles, software/digital twin dev. |
| **0A Subtotal** | | **$4.3 - $6.6** | *Aligns with upper end of Gemini/GPT, absorbing Claude's facility costs.* |
| **0B** | EQM/FQM Hardware | $1.5 - $2.5 | Building full-scale, flight-like test articles for tugs, miners, and plant. |
| **0B** | Qual Testing & Mfg NRE | $1.0 - $2.0 | System-level environmental testing, tooling, and supply chain setup. |
| **0B Subtotal** | | **$2.5 - $4.5** | *Aligns with GPT's 0B estimate.* |
| **Total** | | **$6.8 - $11.1** | |

## 6. Risk Assessment

*   **Risk 1: Iodine Corrosion in Ground Facilities.** *Impact: High. Probability: High.* Iodine will destroy standard vacuum pumps and sensors. *Mitigation:* Heavy upfront investment in facility material science; parallel Argon testing (D-05 alternate) as a fallback.
*   **Risk 2: Micro-g Metallurgy Cannot Be Fully Validated on Ground.** *Impact: Critical. Probability: Medium.* Drop towers only provide ~10 seconds of micro-g. *Mitigation:* Heavy reliance on the bom-0-12 Pathfinder; ground R&D focuses on anchoring digital models rather than full end-to-end physical validation.

## 7. Open Engineering Questions

1.  **Simulant Fidelity:** Can we manufacture a physical asteroid simulant that accurately mimics the electrostatic and cohesive properties of a C-type/M-type NEA in a vacuum?
2.  **Facility Power:** Does the chosen location for the MW-class EP test stand have the local grid capacity to support 5-10 MW continuous draw (thruster + massive cryopumps)?