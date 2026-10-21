---
bomId: "bom-0-16"
itemName: "Electric-Propulsion Propellant Supply"
itemSlug: "ep-propellant-supply"
modelId: "gemini-3-1-pro"
modelName: "Gemini 3.1 Pro"
generated: "2026-10-20"
phase: "phase-0"
---

# Technical Proposal: Electric-Propulsion Propellant Supply (bom-0-16)

## 1. Recommended Approach and Design Philosophy

For Phase 0B of Project Dyson, the MW-class cargo tugs require a robust, high-throughput Electric Propulsion (EP) propellant supply chain. Based on the revised architecture (D-05), **Iodine (I₂)** is our costed reference baseline, with **Argon (Ar)** as the alternate. Xenon is explicitly rejected due to extreme cost and market scarcity at the required 150+ t/yr scale.

**Design Philosophy:**
1. **Density and Storability over Heritage:** Iodine stores as a dense solid (4.9 g/cm³) unpressurized, drastically reducing tankage mass (tank fraction <5% vs. >15% for high-pressure Argon/Xenon).
2. **Decoupled Launch and Transfer:** Propellant is launched as a bulk commodity in modular, standardized "Smart Cartridges" rather than requiring complex fluid transfer in microgravity. Tugs swap empty cartridges for full ones at the SEL1 receiving node.
3. **Corrosion Mitigation as the Primary Engineering Driver:** Iodine is highly reactive. All wetted surfaces must use advanced ceramics, Teflon, or Hastelloy.

I strongly disagree with Gemini's round-2 estimate of 900–1,200 t/yr. For a delivered product scale of ~1 kt/yr using high-Isp (≥3000s) EP tugs, the propellant mass should be a fraction of the payload mass, not equal to or greater than it. I baseline **200–400 t/yr**, aligning closer to Claude and GPT.

## 2. Technical Specifications

*   **Propellant Baseline:** Diatomic Iodine (I₂)
*   **Annual Demand (0B):** 200 – 400 t/yr (supports 10–18 MW-class tugs delivering 1 kt/yr Fe-Ni)
*   **Delivery Form Factor:** 5-ton "Smart Cartridges" (4.75 t I₂, 0.25 t structure/feed hardware)
*   **Cartridge Dimensions:** Cylindrical, 1.2m diameter x 1.0m length.
*   **Power Requirements (during operation):** ~500 W per cartridge for sublimation heating (supplied by tug).
*   **Alternate (Argon):** Requires 700 bar composite overwrapped pressure vessels (COPVs) or active cryocoolers. Tank mass fraction increases from 5% to ~20%, reducing tug payload capacity by ~15%.

## 3. System Architecture

Propellant is not transferred as a fluid/gas between depots and tugs. Instead, we utilize a **Cartridge Swap Architecture**. 

```text
[Earth Launch (bom-0-8)] 
       | (Bulk delivery of 5t Cartridges)
       v
[SEL1 Receiving Node (bom-0-13)] <---- (Empty Cartridges returned by Tugs)
       | (Cartridge Buffer Storage)
       v
[MW-Class Cargo Tugs (bom-0-4)]
       | (Heats solid I2 -> Sublimates to gas -> Feeds Hall/Ion Thrusters)
       v
[Target NEA]
```

## 4. Subsystems Breakdown and Interfaces

*   **Storage & Sublimation Cartridge:** Aluminum outer shell for structural integrity, lined with a fluoropolymer (PTFE/PFA) or ceramic coating. Contains internal resistive heating elements embedded in a conductive mesh to ensure uniform sublimation.
*   **Thermal Management:** Iodine sublimates at ~114°C at standard pressure, but in vacuum, operating temperatures of 80-100°C yield sufficient vapor pressure for MW-class thruster flow rates.
*   **Feed System Interface:** Heated proportional flow control valves (PFCVs). The interface to the tug must be heated to >100°C to prevent deposition/clogging in the lines.
*   **Robotic Grapple Fixtures:** Standardized interfaces (e.g., modified iLIDS or Androgynous Peripheral Attach System) for autonomous swapping at the SEL1 node.

## 5. Development Roadmap and Technology Readiness

*   **Phase 0A (Research & Pathfinders):**
    *   *Objective:* Elevate Iodine feed systems and high-power thruster compatibility from TRL 4 to TRL 6.
    *   *Activities:* Long-duration (10,000+ hour) vacuum chamber testing of Hastelloy/ceramic thruster components. In-orbit demonstration of a 50kg sub-scale sublimation cartridge on a pathfinder satellite.
*   **Phase 0B (Industrial):**
    *   *Objective:* Scale production and launch logistics to 200+ t/yr.
    *   *Activities:* Mass production of Smart Cartridges; integration with SEL1 node logistics.

## 6. Cost Analysis and Budget Estimates

*Note: Earth-to-space launch costs are accounted for in bom-0-8. This budget covers the commodity, cartridge hardware, and supply chain management.*

*   **Commodity Cost (Iodine):** High-purity I₂ is ~$40–60/kg. For 300 t/yr, this is **$12M–$18M / yr**.
*   **Cartridge Hardware:** 60 cartridges/yr at $250k each = **$15M / yr**.
*   **Phase 0A NRE & Qualification (bom-0-16 specific):** **$35M – $50M** (Material science, valve development, thermal vacuum testing).
*   **Total Phase 0B Annual Operating Cost (excluding launch):** **$27M – $33M / yr**.

*Comparison to Round 2:* My commodity cost aligns with Claude/GPT ($30-70/kg). I explicitly separate the cartridge hardware cost from the raw commodity cost to provide a more accurate engineering budget.

## 7. Risk Assessment

| Risk | Impact | Probability | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Iodine Corrosion** | High | High | Strict use of noble metals, ceramics, and fluoropolymers in all wetted paths. No exposed copper/silver on the tug. |
| **Line Clogging** | High | Medium | Redundant, independent heating zones on all feed lines. Keep lines hotter than the tank. |
| **Thruster Erosion** | Medium | Medium | Magnetic shielding in Hall thrusters; use of carbon-based grids in ion thrusters. |
| **Argon Fallback Triggered** | Medium | Low | Maintain parallel paper-study for Argon COPVs. Accept 15% payload penalty if Iodine fails TRL 6 gates. |

## 8. Open Engineering Questions

1.  **Vibration Tolerance of Solid Iodine:** Will the solid Iodine block fracture during launch, altering its surface area and causing unpredictable sublimation rates? (Requires vibration testing in Phase 0A).
2.  **Thermal Leakage:** How much power is lost to space when keeping the large 5-ton cartridges at 80°C during the long coast phases?
3.  **Cartridge Disposal/Recycling:** Do we return empty cartridges to Earth for refill (incurs down-mass costs), or recycle the aluminum/hardware at the SEL1 node? (Baseline assumes return to Earth via empty logistics vehicles).