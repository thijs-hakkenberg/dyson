---
bomId: "bom-0-2"
itemName: "Mining Robots"
itemSlug: "mining-robots"
modelId: "gemini-3-1-pro"
modelName: "Gemini 3.1 Pro"
generated: "2026-10-20"
phase: "phase-0"
---

# Technical Proposal: bom-0-2 Mining Robots (Phase 0)

## 1. Recommended Approach and Design Philosophy

Following the 2026 re-assessment, the Phase 0 architecture demands a highly localized, tether-powered excavation fleet operating at the target Near Earth Asteroid (NEA). The abandonment of the 50 kt/yr remote processing station in favor of ~1 kt/yr co-located Fe-Ni production fundamentally shifts the mining robot design from high-throughput, autonomous free-flyers to **bounded, tether-powered, high-containment extraction platforms**.

**Core Philosophy:**
1. **Phased Deployment (0A to 0B):** Deploy 3 pathfinder units in Phase 0A to validate anchoring, specific cutting energy, and dust containment. Scale to a fleet of 6-8 operational units in Phase 0B upon KDP-0B approval.
2. **Strict Containment:** Asteroid mining is a contamination hazard. We abandon mass-fraction containment metrics in favor of strict kinematic limits (tool tip speed < 0.2 m/s) and hermetically sealed transfer canisters.
3. **Tethered Power with Battery Safing:** Continuous high-power excavation (20-30 kW) is provided via a 2 kV DC tether from the central site power node. A 30 kWh onboard battery provides mobility between nodes, tether management, and safe-mode survival.

## 2. System Architecture

The robot operates within a 200-meter radius of a site power/transfer hub. It utilizes a hexapod mobility system equipped with micro-spine anchors to counteract excavation forces in microgravity.

```text
[Site Power Node] <--- 2 kV DC Tether (Max 200m) ---> [Mining Robot]
                                                            |
                                                   +------------------+
                                                   | Power Management |--> [30 kWh Battery]
                                                   | & Tether Spool   |
                                                   +------------------+
                                                            |
                                                   +------------------+
                                                   | Hexapod Mobility |--> [Micro-spine Anchors]
                                                   | & Avionics       |
                                                   +------------------+
                                                            |
                                                   +------------------+
                                                   | Excavation Head  |--> [Dual Bucket Drums]
                                                   | & Containment    |
                                                   +------------------+
                                                            |
                                                   [Sealed 1.5t Canister] ---> (To ISPP)
```

## 3. Technical Specifications

*   **Dimensions:** 3.5 m (L) x 2.2 m (W) x 1.8 m (H) (stowed)
*   **Mass:** 2,800 kg (dry mass, including 250 kg excavation head and 150 kg tether management system).
*   **Power:** 
    *   Peak Excavation: 25 kW (electrical)
    *   Nominal Tramming/Safing: 3-5 kW
    *   Tether: 2 kV DC, shielded, abrasion-resistant Kevlar/Nextel jacket.
    *   Battery: 30 kWh Li-ion (LTO for low-temp performance and high cycle life).
*   **Performance:**
    *   Excavation Rate: 1.5 - 2.5 t/h (nameplate).
    *   Duty Cycle: 20-25% (approx. 1,800 h/yr cutting time).
    *   Annual Output: ~3,000 t/yr per robot (raw regolith/fines).
*   **Containment:** Tool tip speed mechanically governed to ≤0.2 m/s (below typical NEA escape velocity). 

## 4. Subsystems Breakdown

### 4.1 Excavation and Containment (T04, T08, T24)
We baseline **dual counter-rotating bucket drums**. This geometry cancels 90-95% of the reaction torque, drastically reducing the load on the anchoring system. The drums operate inside a compliant electrostatic dust shield (EDS) shroud. Material is fed directly into 1.5-ton hermetically sealed transfer canisters. There is no open-space hopper transfer.

### 4.2 Mobility and Anchoring (T16)
A hexapod chassis provides six-degree-of-freedom positioning. Each foot is equipped with omni-directional micro-spine arrays capable of generating >500 N of holding force in competent regolith or porous boulders. 

### 4.3 Power and Tether Management (T09)
The robot features an active tether management spool with a level-wind mechanism and tension sensors to prevent snagging. The 30 kWh battery is sized to allow the robot to detach, walk to a new sector, and re-attach to a different hub, or to survive a 48-hour site power outage.

### 4.4 Autonomy and Communications (T10)
Supervised autonomy. The robot handles local hazard avoidance, tether tensioning, and constant-force cutting algorithms. Data link is via a local 5G/Wi-Fi mesh to the site hub (1-5 Mbps per robot), which relays to Earth.

## 5. Development Roadmap and Costs

**Phase 0A (Pathfinder & NRE):**
*   **Objective:** Mature T04, T08, T09, T16 to TRL 6.
*   **Deliverables:** 3 flight-article pathfinder robots, 1 site hub, precursor penetrometer probe.
*   **NRE & Qual Budget:** $450M - $600M (includes extensive vacuum chamber dust/anchoring tests).
*   **0A Hardware Cost:** $150M ($50M per unit).

**Phase 0B (Production - Gated):**
*   **Objective:** Scale to meet Phase 1 demand.
*   **Deliverables:** 5 additional operational robots + 2 spares.
*   **0B Hardware Cost:** $250M - $300M.

## 6. Key Risks and Open Questions

1.  **Subsurface Strength & Anchoring:** If the NEA surface is dominated by deep, unconsolidated fines (<1 kPa cohesion), micro-spines will fail to generate sufficient reaction force. *Mitigation:* Phase 0A precursor penetrometer probe.
2.  **Tether Snagging:** Dragging a 2 kV tether across a microgravity boulder field presents severe abrasion and snag risks. *Mitigation:* Active tensioning spool and extensive parabolic flight/air-bearing tests during NRE.
3.  **Specific Cutting Energy:** Competent inclusions (>50 MPa) could stall the 25 kW head. *Mitigation:* Implement automatic stall-recovery and clast-rejection algorithms. Load envelopes must be measured in 0A.