---
bomId: "bom-0-6"
itemName: "Water Pilot (C-type target only)"
itemSlug: "ispp-systems"
modelId: "gemini-3-1-pro"
modelName: "Gemini 3.1 Pro"
generated: "2026-10-20"
phase: "phase-0"
---

# Technical Proposal: bom-0-6 Water Pilot (C-type target conditional)

## 1. Recommended Approach and Design Philosophy
In alignment with the 2026 re-assessment (D-05) and the deferral of Phase 0 LOX/LH₂ production, this proposal advocates for a **"Capture and Purify First"** philosophy. The Water Pilot will only fly if the selected Near-Earth Asteroid (NEA) is confirmed as a volatile-rich C-type. 

Because the MW-class cargo tugs currently baseline Kr/I (with water EP as a desk study), there is no immediate Phase 0 consumer for bulk hydrogen or oxygen. Therefore, this pilot focuses on capturing off-gassed volatiles from the primary Fe-Ni processing plant (bom-0-3), purifying the water, and demonstrating stable long-term storage. Electrolysis is restricted to a minimal sub-scale diagnostic skid to validate specific energy (5.2–7.0 kWhₑ/kg H₂O) without the burden of cryogenic liquefaction or zero-boil-off (ZBO) LH₂ storage.

## 2. System Architecture

The bom-0-6 pilot is co-located at the target NEA, physically integrated with the bom-0-3 processing plant to utilize its waste heat and off-gas streams.

```text
[bom-0-3 Fe-Ni Processor] --(Raw Volatiles @ 150-800°C)--> [Pre-Purification Skid]
                                                                  |
                                                              (Slag/Waste)
                                                                  |
[bom-0-5 Site Power] ----(50-150 kWe)---------------------> [Condenser & Thermal Control]
                                                                  |
                                                           (Liquid H2O)
                                                                  |
                                                          [Bladder Storage (280 K)]
                                                                  |
                                                          [Diagnostic PEM Demo] --(Venting/Flare)
```

## 3. Technical Specifications
*   **Target Yield:** 10–30 t/yr of purified water.
*   **Power Consumption:** 50–150 kWₑ (peak, during active condensation and diagnostic electrolysis).
*   **Thermal Energy (Heating):** 0.15–0.45 kWhₜₕ/kg ore (provided by bom-0-3, counted once).
*   **Extraction Temperatures:** Staged at 150°C, 400°C, and 750°C to separate loosely bound water from phyllosilicates while minimizing sulfur/carbon co-extraction.
*   **Mass:** 5–8 t (dry), including purification skid and empty bladder tanks.
*   **Storage Capacity:** 30 t working inventory.
*   **Electrolysis Specific Energy:** 5.6–6.5 kWhₑ/kg H₂O (diagnostic scale only).

## 4. Subsystems Breakdown and Interfaces
1.  **Pre-Purification Skid:** Crucial for removing sulfur compounds (H₂S, SO₂), organics, and silicates from the bom-0-3 off-gas before condensation. Utilizes regenerative sorbent beds.
2.  **Condenser & Thermal Control:** Radiator-backed active cooling loop to drop volatile stream temperatures from >400°C to ~5°C for water condensation.
3.  **Bladder Storage:** Flexible, heated bladder tanks maintaining water at ~280 K to prevent freezing and structural rupture. 
4.  **Diagnostic Electrolyzer:** A 5 kWₑ PEM stack to test water purity effects on membrane degradation in microgravity. No LOX/LH₂ liquefaction hardware is included.
5.  **Interfaces:** 
    *   *Thermal/Material:* Direct flange to bom-0-3 off-gas manifold.
    *   *Power:* 1-3 kV HV tether from bom-0-5.

## 5. Autonomy, Control, and Communication
*   **Autonomy:** Level 4 (supervised autonomy). The system must autonomously manage thermal setpoints, sorbent bed regeneration cycles, and bladder pressure relief.
*   **Data Rate:** 0.1–1 Mbps average for telemetry and diagnostic PEM degradation data.
*   **Safe Mode:** Onboard 10–25 kWh battery ensures thermal heaters keep valves and bladders above freezing during temporary site power loss.

## 6. Development Roadmap and Technology Readiness
*   **Phase 0A (Research & Pathfinders):** TRL 3 $\rightarrow$ 5. Focus on ground-based thermogravimetry of CI/CM meteorite simulants, sorbent bed life-testing, and interface reservation design. No flight hardware for water extraction in 0A.
*   **Phase 0B Gate:** Requires confirmed C-type target, measured volatile yield from 0A scouts, and successful integration tests.
*   **Phase 0B (Industrial):** TRL 5 $\rightarrow$ 7. Launch of the 5-8 t pilot skid to the NEA.

## 7. Cost Analysis and Budget Estimates
I disagree with the round-2 $2.0B legacy estimates and align closely with the reduced scope.
*   **Phase 0A NRE & Qualification:** $120M – $180M (Includes ground purification skid development).
*   **Phase 0B Flight Hardware & Integration:** $150M – $220M (One flight unit + spares).
*   **Total bom-0-6 Budget:** **$270M – $400M**.
*   *Note:* Tug propellant supply and Kr/I logistics are explicitly excluded from this line item and must be budgeted in bom-0-16.

## 8. Risk Assessment & Open Engineering Questions
**Risks:**
1.  *Contaminant Load:* High sulfur/organic content in C-type off-gas could rapidly blind the purification skid, halting condensation.
2.  *Microgravity Phase Separation:* Condensing water from a mixed gas stream in microgravity requires capillary or centrifugal separation; failure leads to gas entrainment in the bladders.

**Open Questions to Settle:**
1.  *Water EP Viability:* If bom-0-4 confirms Water EP is viable, the diagnostic PEM demo can be deleted, and the pilot can scale up to directly fuel the tugs. If Kr/I is locked in, water remains a Phase 1 resource only.
2.  *Inventory Disposition:* What is the policy when the 30 t bladder is full? (Controlled venting vs. export to a holding depot).