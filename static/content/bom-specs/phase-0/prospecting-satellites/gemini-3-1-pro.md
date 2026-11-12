---
bomId: "bom-0-1"
itemName: "Prospecting Survey and Rendezvous Scouts"
itemSlug: "prospecting-satellites"
modelId: "gemini-3-1-pro"
modelName: "Gemini 3.1 Pro"
generated: "2026-10-20"
phase: "phase-0"
---

# Technical Proposal: Prospecting Survey and Rendezvous Scouts (bom-0-1)

## 1. Recommended Approach and Design Philosophy
The Phase 0A prospecting architecture must pivot from a "breadth-first" flyby survey to a "depth-first" rendezvous characterization. Remote spectral data alone cannot validate the geotechnical properties (cohesion, porosity, hardness) required for the bom-0-2 Mining Robots. 

**Design Philosophy:**
*   **Depth over Breadth:** Pre-screening of Near-Earth Asteroids (NEAs) will be outsourced to Earth-based and existing space-based assets (e.g., NEO Surveyor). Scouts will only launch toward high-probability candidates.
*   **All-Rendezvous Fleet:** Flybys are eliminated. Each scout is designed to rendezvous with 1 primary target, with a secondary target possible only via extended mission geometry.
*   **Propulsion Commonality:** We baseline **Iodine (I₂)** Hall-effect thrusters. While Xenon is lower risk, using I₂ serves as a vital sub-scale pathfinder for the MW-class cargo tugs (bom-0-4), buying down Phase 0B risk.
*   **Gated Fleet Deployment:** A fleet of 12 spacecraft deployed in two tranches: 4 Pathfinders (Tranche 1) to validate the I₂ propulsion and proximity ops, followed by 8 Production scouts (Tranche 2).

## 2. Technical Specifications
*   **Wet Mass:** 250 kg (incl. 45 kg I₂ propellant)
*   **Dry Mass:** 205 kg
*   **Dimensions (Stowed):** 0.8m x 0.8m x 1.2m (ESPA Grande compatible)
*   **Dimensions (Deployed):** 4.5m span (solar arrays)
*   **Power:** 1.5 kW BOL at 1 AU (deployable rigid arrays)
*   **Propulsion:** 600 W Iodine Hall-effect thruster; Isp ~2,100 s; Thrust ~25 mN.
*   **Δv Budget:** 3.5 km/s (allows rendezvous from C3 ≈ 0 injection, plus proximity ops).
*   **Design Life:** 4 years primary, 7 years extended.

## 3. System Architecture

```text
       [ Solar Array ] ------ [ Bus Core ] ------ [ Solar Array ]
                                  |
    +-----------------------------+-----------------------------+
    |                             |                             |
[ Payload Deck ]            [ Avionics/Power ]           [ Propulsion ]
- Vis/IR Spectrometer       - C&DH Unit                  - I2 Tank (Heated)
- Thermal Microbolometer    - 2 kWh Li-ion Battery       - Feed System
- Geotech Impactor          - X/Ka-band Transceiver      - Hall Thruster
- NavCams                   - Reaction Wheels (x4)       - Cold Gas RCS
```

## 4. Subsystems Breakdown
*   **Payload Suite:**
    *   *Vis/IR Spectrometer:* 0.4 to 3.8 µm. Extended into the 3 µm band to detect hydration/hydroxyls, critical for identifying C-type targets if the water pilot (bom-0-6) is activated.
    *   *Thermal IR:* 8–14 µm uncooled microbolometer for thermal inertia mapping (deriving regolith grain size and porosity).
    *   *Geotech Impactor:* A small (2 kg) spring-loaded kinetic impactor deployed during close hover. The scout observes the impact plume and cratering dynamics to measure surface cohesion—a mandatory ground-truth step before mining robot deployment.
*   **Power:** 1.5 kW arrays (hardware cost ~$75/W). 2 kWh secondary battery for eclipse and peak transmission periods.
*   **Communications:** 0.5m High-Gain Antenna (Ka-band) for 50 kbps downlink at 1 AU. Target data volume: 10 GB per asteroid.
*   **GNC & RCS:** Star trackers, sun sensors, and optical NavCams for terminal rendezvous. Cold-gas RCS for fine proximity hovering where the Hall thruster is too coarse.

## 5. Autonomy and Control
Due to light-time delays, proximity operations cannot be joystick-controlled.
*   **Cruise:** Level 2 (ground-commanded waypoints, auto-safing).
*   **Terminal Rendezvous:** Level 3 (autonomous optical navigation, shape-model generation).
*   **Proximity Ops:** Level 4 (autonomous hover, hazard avoidance, and impactor targeting based on onboard terrain relative navigation).

## 6. Development Roadmap and Technology Readiness
*   **Current TRL:** I₂ Hall thrusters (TRL 5); Autonomous proximity ops (TRL 5); Geotech impactor (TRL 3).
*   **Phase 0A KDP-1 (Year 1):** Complete ground qualification of I₂ feed system (corrosion mitigation) and 4,500-hour life test.
*   **Phase 0A KDP-2 (Year 2.5):** Launch Tranche 1 (4 Pathfinders).
*   **Phase 0A KDP-3 (Year 4):** Tranche 1 returns ground-truth data. Gate decision for Tranche 2 (8 scouts) and Phase 0B industrial assets.

## 7. Cost Analysis and Budget Estimates (2026 USD)
*   **NRE & Development:** $110M (Heavily weighted toward I₂ propulsion qual and autonomy software).
*   **Recurring Hardware:** $264M ($22M unit cost × 12 units).
*   **Launch Services:** $90M (2x dedicated rideshares to C3 ≈ 0).
*   **Mission Ops & Ground Segment:** $85M (7-year DSN/commercial network allocation).
*   **Target Screening Program:** $20M (Grants to external astronomical surveys).
*   **Total bom-0-1 Line:** **$569M** (Excludes program-level reserves held in bom-0-17).

## 8. Risk Assessment
1.  **Iodine Feed System Failure (High Risk, High Impact):** I₂ is highly corrosive and requires heated lines to prevent sublimation clogging. *Mitigation:* Dual-redundant feed lines; parallel ground life-testing. Fallback to Krypton if TRL 6 is not reached by CDR.
2.  **Target Hit Rate Too Low (Medium Risk, High Impact):** Pre-screened targets may prove non-viable upon rendezvous. *Mitigation:* Fleet size of 12 provides statistical margin (assuming 25% hit rate yields 3 viable mining sites).
3.  **False-Commit on Regolith Cohesion (Low Risk, Critical Impact):** Optical data misinterprets surface hardness, causing mining robots to fail. *Mitigation:* Kinetic impactor payload provides physical ground truth.

## 9. Open Engineering Questions
*   *Trajectory Optimization:* Can we consistently find secondary targets within a 1.0 km/s Δv budget after primary rendezvous, or is the fleet strictly 1-to-1?
*   *Thermal Constraints:* Can the uncooled microbolometer achieve the required signal-to-noise ratio for thermal inertia mapping without a dedicated cryocooler (which breaks the mass budget)?
*   *DSN Availability:* Can we secure the ~4,000 antenna-hours/year required for the fleet, or must we invest in dedicated commercial deep-space nodes?