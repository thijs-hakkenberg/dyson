---
bomId: "bom-0-8"
itemName: "Earth-to-Space Launch and Delivery"
itemSlug: "launch-delivery"
modelId: "gemini-3-1-pro"
modelName: "Gemini 3.1 Pro"
generated: "2026-10-20"
phase: "phase-0"
---

# Technical Proposal: Earth-to-Space Launch and Delivery (bom-0-8)
**Phase 0 (0A + 0B) - Project Dyson**

## 1. Recommended Approach and Design Philosophy

The Earth-to-Space Launch and Delivery architecture for Phase 0 relies entirely on procuring Commercial Off-The-Shelf (COTS) Heavy and Super-Heavy Lift Launch Vehicles (SHLLVs). Project Dyson will not develop bespoke launch vehicles or kick stages. 

**Core Philosophy:**
1.  **Avoid Slow LEO Spirals:** Low-thrust Electric Propulsion (EP) spirals from Low Earth Orbit (LEO) take months and severely degrade solar arrays traversing the Van Allen belts. We will procure launch services that deliver payloads directly to High Earth Orbit (HEO), Earth-Moon L1 (EML1), or Earth Escape (C3 ≥ 0).
2.  **Self-Deployment via bom-0-4:** Once the launch vehicle's upper stage drops the payload at HEO/Escape, Project Dyson's own MW-class cargo tugs (bom-0-4) will take over for the deep-space transit to the target Near Earth Asteroid (NEA) or SEL1.
3.  **Standardized Form Factors:** All Phase 0 hardware (plant modules, tugs, propellant tanks) must be designed to fit within standard 5-meter, 7-meter, or 9-meter commercial fairings. 

## 2. Mass Breakdown and Disagreement with Round-2

I disagree with GPT's upper bound of 8 kt and Claude's $15B cost ceiling. A 1 kt/yr delivered product architecture (with co-located processing) does not require 8,000 tonnes of infrastructure. I align closely with Gemini's mass estimate (2.5–3.5 kt) but apply a more rigorous translation to *delivered* vs. *LEO* mass.

### Phase 0A (Research & Pathfinders)
*   **Payloads:** Rendezvous scouts (4x 500kg), Pathfinder demonstrator (15 t), Demo Tug (20 t), Initial Propellant (10 t).
*   **Total Mass to LEO Equivalent:** ~150 - 250 t.
*   **Launch Strategy:** 3-5 Heavy Lift launches (e.g., Falcon Heavy, New Glenn) direct to escape/HEO.

### Phase 0B (Industrial Production)
*   **Payloads:** Mining robots & site power (300 t), Processing Plant modules (800 t), 15x MW-class Cargo Tugs (750 t), EP Propellant for initial deployment (1,200 t).
*   **Total Mass to LEO Equivalent:** ~3,050 t.
*   **Launch Strategy:** 20-30 Super-Heavy launches (e.g., Starship, New Glenn) over a 24-month campaign.

## 3. System Architecture & Delivery Sequence

```text
[Earth Surface] 
      |
      | (Commercial Heavy/Super-Heavy Lift)
      v
[LEO Parking Orbit] ---> (Upper Stage Burn) ---> [HEO / Earth Escape (C3~0)]
                                                        |
                                                        | (Payload Separation)
                                                        v
                                          [Phase 0 Hardware Activation]
                                                        |
                                                        | (bom-0-4 Tugs take over)
                                                        v
                                          [Deep Space Transit to NEA / SEL1]
```

### Delivery Profiles
*   **Profile A (Direct to Escape):** Used for Scouts, Tugs, and Plant Modules heading to the NEA. Launch vehicle upper stage provides ~3.2 km/s $\Delta v$ from LEO. Payload capacity is roughly 30-35% of LEO capacity.
*   **Profile B (Direct to SEL1):** Used for the Phase 1 Receiving Node (bom-0-13). Launch vehicle upper stage provides ~3.1 km/s $\Delta v$. 

## 4. Technical Specifications & Interfaces

*   **Fairing Constraints:** Payloads must be modularized to fit a dynamic envelope of $\le$ 8.0m diameter and $\le$ 18.0m height (baselining next-gen commercial fairings).
*   **Acoustic & Vibe:** Payloads must survive standard launch environments (OASPL ~142 dB, max axial load ~6g).
*   **Payload Adapters:** Standardized EELV Secondary Payload Adapter (ESPA) Grande for scouts; custom 1194mm or 2624mm clamp bands for tugs and plant modules.
*   **Propellant Delivery:** EP propellant (Iodine/Argon, bom-0-16) will be launched in standardized "smart tanks" that act as independent payloads, docking with tugs in HEO.

## 5. Cost Analysis and Budget Estimates

Launch costs are separated into LEO-equivalent pricing and Delivered (HEO/Escape) pricing. The cost of the launch vehicle upper stage is baked into the "Delivered" price.

| Phase | Mass (Delivered to Escape/HEO) | Est. LEO Equivalent Mass | Delivered Cost ($/kg) | Total Cost Range |
| :--- | :--- | :--- | :--- | :--- |
| **0A** | 50 - 80 t | 150 - 250 t | $4,000 - $6,000 | **$200M - $480M** |
| **0B** | 1,000 - 1,200 t (Hardware) <br> 1,200 t (Propellant) | 3,000 - 3,500 t | $2,500 - $4,500* | **$2.5B - $5.4B** |
| **Total** | **~2,400 t** | **~3,500 t** | -- | **$2.7B - $5.9B** |

*\*Note: 0B assumes volume discounts and maturation of fully reusable SHLLV architectures, lowering the $/kg to escape velocity.*

## 6. Risk Assessment

1.  **SHLLV Availability (High Risk):** The entire 0B timeline depends on the operational readiness and high cadence of vehicles like Starship or New Glenn. *Mitigation:* Design payload modules to be cross-compatible with multiple launch vehicles.
2.  **Upper Stage Debris (Medium Risk):** Leaving 30+ upper stages in HEO or Earth-escape trajectories violates our strict debris requirements (bom-0-15). *Mitigation:* Mandate and fund upper-stage disposal burns (into heliocentric graveyard or ocean impact) in all launch service contracts.
3.  **Fairing Volume Limits (Medium Risk):** Radiators (bom-0-5) and solar arrays are highly voluminous. *Mitigation:* Invest heavily in deployable structures during 0A (bom-0-11).

## 7. Open Engineering Questions

*   **Propellant Aggregation:** Should EP propellant be launched directly with the tugs, or launched separately to a HEO depot for tugs to pick up? (Currently assuming direct-with-tug or smart-tank rendezvous, avoiding a complex depot).
*   **Launch Site Bottlenecks:** Can existing spaceports support the 20-30 heavy launches required within the 24-month 0B deployment window? Environmental and licensing limits (FAA) must be modeled.