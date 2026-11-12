---
bomId: "bom-0-12"
itemName: "0A Pathfinder Demonstrator"
itemSlug: "pathfinder-demonstrator"
modelId: "gemini-3-1-pro"
modelName: "Gemini 3.1 Pro"
generated: "2026-10-20"
phase: "phase-0"
---

# Technical Proposal: 0A Pathfinder Demonstrator (bom-0-12)

## 1. Executive Summary & Recommended Approach

The **0A Pathfinder Demonstrator** is the critical bridge between ground-based R&D and the multi-billion-dollar Phase 0B industrial commitment (KDP-0B). Its singular objective is to validate microgravity excavation, beneficiation, metallurgy, and debris containment at a target Near Earth Asteroid (NEA) in a relevant environment (TRL 6). 

**Design Philosophy: "End-to-End Subscale"**
Rather than flying a full-scale 0B mining robot, the 0A Pathfinder is a single, integrated spacecraft sized for commercial medium-lift launch. It will process material at a rate of ~1–5 kg/day. By executing the entire value chain—from regolith acquisition to a finished Fe-Ni ingot—on a micro-scale, we retire the fundamental physics, thermal, and containment risks of microgravity metallurgy without the capital exposure of a MW-class deployment.

## 2. System Architecture & ConOps

The Pathfinder operates as a self-contained free-flyer that anchors to the NEA surface, performs localized mining, and conducts batch processing. 

### Concept of Operations
1. **Transit:** Launch to LEO, spiral out using Iodine Hall-effect thrusters (reference per D-05).
2. **Rendezvous & Anchoring:** Proximity operations followed by micro-spine anchoring to the NEA surface.
3. **Excavation & Containment:** Deploy a localized containment shroud. A counter-rotating bucket-drum extracts regolith.
4. **Beneficiation:** Magnetic and centrifugal sorting to isolate native Fe-Ni grains.
5. **Metallurgy:** Solar-electric induction melting of the concentrate.
6. **Validation:** Optical and physical inspection of the resulting Fe-Ni coupon/ingot. 

```text
[Solar Arrays (15 kW)] === [Spacecraft Bus & EP] === [Processing Payload]
                                                          |
                                                  [Containment Shroud]
                                                          |
                                                  [Excavation Head]
                                                          |
                                                    (NEA Surface)
```

## 3. Technical Specifications

*   **Dry Mass:** 1,850 kg (Bus: 1,200 kg, Payload: 650 kg)
*   **Wet Mass:** 2,450 kg (assuming 600 kg Iodine propellant)
*   **Power:** 15 kW peak (deployable ROSA-style arrays, scaled down from 0B MW-class arrays)
*   **Propulsion:** 2x 5 kW Iodine Hall-effect thrusters (1 active, 1 spare)
*   **Processing Capacity:** 5 kg of regolith per batch; ~0.5 kg Fe-Ni yield per batch.
*   **Comms:** X/Ka-band high-gain antenna (interfacing with Phase 0 ground segment).

## 4. Subsystem Breakdown

### 4.1 Excavation & Containment
*   **Containment Shroud:** A deployable, electrostatically charged Kapton/Kevlar tent that seals against the asteroid surface to prevent debris escape (satisfying the strict ALARP debris requirement).
*   **Extraction:** Dual counter-rotating bucket wheels to cancel torque, preventing the spacecraft from tearing off its anchors.

### 4.2 Beneficiation (Magnetic/Centrifugal)
*   Regolith is fed into a low-RPM centrifuge.
*   Electromagnets extract ferromagnetic Fe-Ni particles, while silicates are expelled into a sealed tailings hopper.

### 4.3 Microgravity Metallurgy
*   **Furnace:** 3 kW electromagnetic induction furnace. Induction inherently stirs the melt and keeps it centered, avoiding crucible wall wetting issues in microgravity.
*   **Forming:** Inertia-driven casting into a standardized coupon mold.

### 4.4 Spacecraft Bus
*   **Power:** 15 kW arrays + 5 kWh Li-ion battery buffer for eclipse/peak furnace operations.
*   **Thermal:** 4 kW active pumped-fluid radiator loop to reject heat from the induction furnace and EP system.

## 5. Cost Analysis & Budget Estimates

I reject the upper bounds of Claude ($4B) and Gemini ($2.5B). A $4B pathfinder defeats the purpose of a gated Phase 0A by front-loading too much capital. By utilizing a standard commercial bus architecture and focusing bespoke engineering strictly on the 650 kg payload, costs can be constrained. 

*   **Payload R&D and Flight Hardware:** $450M – $700M
*   **Spacecraft Bus & Integration:** $250M – $400M
*   **Launch & Delivery (Medium Lift + EP transit):** $150M – $250M
*   **Mission Ops & Ground Segment (Allocated):** $50M – $100M
*   **Total 0A Pathfinder Cost:** **$0.9B – $1.45B**

*Basis:* Aligns with GPT's hardware estimate and Earth-to-space delivery lines, assuming a Class B risk posture for the bus and Class C for the experimental payload.

## 6. Development Roadmap to KDP-0B

*   **Year 1-2:** Ground-based vacuum/drop-tower tests of induction melting and magnetic beneficiation (TRL 4-5).
*   **Year 3:** Payload CDR and Bus integration.
*   **Year 4:** Launch and 18-month transit to NEA.
*   **Year 5.5:** Arrival, anchoring, and first batch processing.
*   **Year 6:** Data return, validation of Fe-Ni purity, and debris containment verification. **Triggers KDP-0B Gate.**

## 7. Risk Assessment & Open Questions

1.  **Anchoring Failure (High Risk):** Micro-spine anchors may fail on highly friable C-type or rubble-pile NEAs. *Mitigation:* Include cold-gas hold-down thrusters as a backup during the brief excavation phases.
2.  **Thermal Management (Medium Risk):** Rejecting furnace heat in a small bus is challenging. *Mitigation:* Oversized deployable radiators; batch processing allows for slow thermal equalization.
3.  **Debris Escape (Critical):** If the containment shroud fails, the mission violates the ALARP debris requirement. *Open Question:* Can electrostatic repulsion adequately clear dust from the shroud interior before retraction, or is a consumable gas purge required?