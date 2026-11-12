---
bomId: "bom-0-5"
itemName: "Site Power, Arrays and Storage"
itemSlug: "solar-power-arrays"
modelId: "gemini-3-1-pro"
modelName: "Gemini 3.1 Pro"
generated: "2026-10-20"
phase: "phase-0"
---

# Technical Proposal: Site Power, Arrays, and Storage (bom-0-5)
**Phase 0 - Space Resource Processing (Post-2026 Re-assessment Baseline)**

## 1. Recommended Approach and Design Philosophy
The revised Phase 0 architecture eliminates the centralized 50 kt/yr SEL4/L5 processing station in favor of distributed, co-located beneficiation and primary processing at the target Near Earth Asteroid (NEA), scaled to ~1 kt/yr of native/reduced Fe-Ni product. 

Our design philosophy for **bom-0-5** shifts from a monolithic gigawatt-class array to a **Modular NEA Microgrid**. We baseline a highly autonomous, 3 kV High-Voltage Direct Current (HVDC) distribution architecture powered by deployable thin-film/III-V hybrid solar arrays. Bulk storage (previously 200-500 MWh) is completely eliminated; instead, we utilize distributed, tightly coupled battery buffers (2 MWh per site) strictly sized for process keep-alive, fault clearing, and limited eclipse ride-through.

## 2. Technical Specifications

*   **Total Power (0B):** 5.0 MW BOL (Beginning of Life) per NEA processing site. (Yields ~3.5 MW EOL at 1.3 AU).
*   **Specific Power:** 110 W/kg at the wing level (including deployment mechanisms).
*   **Total Array Mass:** ~45 metric tons per 5 MW site.
*   **Operating Voltage:** 3.0 kV DC primary distribution bus.
*   **Energy Storage:** 2.5 MWh per site (Lithium-ion NMC, 160 Wh/kg pack-level, ~15.6 tons).
*   **Thermal Rejection (Power/Storage only):** 1.5 MWth active radiator capacity (ammonia loop, ~350 K). *Note: Furnace/processing heat rejection is handled in bom-0-3.*
*   **Degradation:** < 0.8% per year in quiet solar wind; sized for 15-year life.

## 3. System Architecture

The architecture relies on a central Power Management and Distribution (PMAD) hub landed on the NEA, with radially deployed Roll-Out Solar Array (ROSA-derived) wings.

```text
       [Solar Array Wing 1] ... [Solar Array Wing N] (Total 5 MW BOL)
               |                         |
               v                         v
       +-----------------------------------------+
       |       Primary PMAD Hub (3.0 kV DC)      | <--- Active Thermal Loop (1.5 MWth)
       +-----------------------------------------+
          |                 |                 |
          v                 v                 v
  +---------------+ +---------------+ +------------------+
  | Battery Pack  | | Process Plant | | Tether Interface |
  | (2.5 MWh)     | | (bom-0-3)     | | (bom-0-2 Robots) |
  +---------------+ +---------------+ +------------------+
          |                 |                 |
     Keep-alive        ~2.5 MW Load      ~1.0 MW Load
```

## 4. Subsystems Breakdown and Interfaces

*   **Photovoltaic Blankets:** Advanced IMM (Inverted Metamorphic Multijunction) cells on flexible substrates. Selected for high efficiency (~30%) to minimize deployment footprint and mass, balancing the higher cost against destination delivery premiums.
*   **PMAD & Switchgear:** Solid-state silicon carbide (SiC) breakers operating at 3 kV DC. Steps down to 120V DC for local avionics, but exports 3 kV directly to the processing plant and mobile mining robots via tether.
*   **Energy Storage:** 2.5 MWh distributed pack. Sized specifically to provide 1 hour of 2.5 MW keep-alive power to prevent molten electrolyte/metal solidification during array reorientation or transient shadowing.
*   **Thermal Control:** Deployable composite radiators (approx. 1,500 m²) dedicated to PMAD efficiency losses and battery thermal management.
*   **Interfaces:** 
    *   *bom-0-2 (Robots):* 3 kV DC physical tether spool interface.
    *   *bom-0-3 (Plant):* Direct 3 kV DC busbar.
    *   *bom-0-8 (Delivery):* Standardized ESPA-grande or custom pallet mounting for transit.

## 5. Autonomy, Control, and Communication
*   **Microgrid Management:** Fully autonomous load-shedding. In the event of array degradation or eclipse, the system automatically prioritizes: 1) PMAD/Comms survival, 2) Furnace keep-alive (thermal hold), 3) Robot tether power, 4) Active processing.
*   **Comms:** Fiber-optic lines integrated into the power tethers for high-bandwidth, EMI-immune telemetry between the power hub and processing nodes.

## 6. Development Roadmap (0A vs 0B)

*   **Phase 0A (Pathfinder & Research):** 
    *   Deploy a 100 kW BOL pathfinder array to SEL1 or a proxy NEA.
    *   Demonstrate 3 kV DC PMAD in space plasma environments.
    *   Test 50 kWh battery thermal hold behavior.
*   **Phase 0B (Industrial Gate):**
    *   Full-scale 5 MW BOL deployment to the target NEA.
    *   Requires TRL 6 for MW-scale deployable structures and 3 kV surface distribution.

## 7. Cost Analysis and Budget Estimates

*Costs are hardware and NRE only. Delivery to LEO and destination is accounted for in bom-0-8.*

| Item | Phase 0A (100 kW) | Phase 0B (5 MW Site) | Basis / Notes |
| :--- | :--- | :--- | :--- |
| **Array Hardware** | $15M | $350M | ~$70/W hardware cost (IMM/ROSA scale). |
| **PMAD & Switchgear** | $10M | $45M | SiC HVDC development and hardware. |
| **Storage (2.5 MWh)** | $2M | $25M | ~$10M/MWh space-rated pack + integration. |
| **Thermal (Power)** | $5M | $30M | Radiators and pump loops for PMAD/Battery. |
| **NRE / Qual** | $120M | $80M | Plasma qual, deployment qual (TRL 4 to 6). |
| **Total (Unburdened)**| **$152M** | **$530M** | *Excludes 30% contingency (bom-0-17).* |

## 8. Risk Assessment

1.  **High-Voltage Plasma Arcing (Risk: High):** Operating at 3 kV DC in the solar wind and asteroid dust environment poses severe arcing risks. *Mitigation:* Extensive 0A vacuum chamber plasma testing; conformal coating of all exposed busbars; active plasma contactors if necessary.
2.  **Array Dust Contamination (Risk: Medium):** Mining operations will kick up regolith. *Mitigation:* Keep-out zones; electrodynamic dust shielding (EDS) embedded in the array coverglass.
3.  **Supply Chain Bottleneck (Risk: Medium):** Procuring 5 MW of space-grade III-V cells may strain current global production. *Mitigation:* Early RFI to suppliers; fallback to high-efficiency Silicon if launch mass margins permit.

## 9. Open Engineering Questions

*   **Dust Adhesion Dynamics:** What is the actual charging and adhesion rate of target NEA regolith on the PV blankets? (Requires bom-0-1 scout data).
*   **Thermal Hold Exact Requirements:** What is the exact keep-alive wattage required by the bom-0-3 furnace to prevent irreversible freezing? (Currently estimated at 10% of full load, driving the 2.5 MWh battery size).
*   **Tether Dynamics:** How will the 3 kV tether behave dynamically in microgravity when dragged by bom-0-2 robots over abrasive regolith?