---
bomId: "bom-1-1"
itemName: "Solar Collector Units"
itemSlug: "collector-units"
type: "consensus"
generated: "2026-02-01"
phase: "phase-1"
---

# Solar Collector Units - Synthesized Technical Specifications
## Phase 1 - Initial Swarm Deployment

---

## Key Specifications

All three models converge on the following core specifications:

- **Architecture**: Thin-film photovoltaic on tensioned membrane/blanket structure with deployable frame, prioritizing mass efficiency over peak conversion efficiency
- **Areal Density Target**: <200 g/m² system-level (Claude: 185 g/m², GPT: ~170 g/m² implied from 69 kg/40 m² + structure)
- **Solar Cell Efficiency**: 15-28% BOL depending on technology selection, with 15-25% degradation expected over design life
- **Operating Voltage**: High-voltage DC internal bus (600-1200 VDC) to minimize I²R losses and harness mass
- **Thermal Management**: Passive radiative cooling with rear-facing radiators, targeting PV operating temperatures of 40-120°C
- **Attitude Control**: Reaction wheels for fine pointing with propulsive momentum dumping (magnetorquers ineffective in heliocentric orbit)
- **Design Philosophy**: Graceful degradation with no single-point failures; swarm functionality degrades linearly with unit loss
- **Manufacturing Priority**: Design for automated mass production; complexity pushed to ground facilities
- **Autonomy Level**: High unit-level autonomy for fault detection/isolation/recovery (FDIR), with ground-supervised swarm coordination in Phase 1

---

## Divergent Views

- **Unit Size/Power Output**: Claude recommends large 10,000 m² units producing ~5-10 MW each; GPT advocates smaller 40 m² "tile" units at ~10 kW each for easier manufacturing and launch packaging; Gemini specification not fully detailed but implies modular approach.

- **Photovoltaic Technology Selection**: Claude strongly recommends CIGS thin-film (16% efficiency, ~85 g/m²) accepting lower efficiency for mass savings; GPT prefers space-grade multi-junction cells (28% efficiency) on lightweight blanket substrates if budget allows, with thin-film as cost-reduction option; Gemini not specified.

- **Orbital Position**: Claude specifies 0.7 AU heliocentric (inside Venus orbit) for ~2× solar flux increase; GPT baselines 1 AU Earth-trailing/leading orbit for simpler operations and thermal environment; Gemini not specified.

- **Design Life**: Claude targets 15-year design life with degradation margins; GPT suggests 5-year baseline for Phase 1 units with 1-year minimum acceptable for pathfinders; Gemini not specified.

- **Propulsion Technology**: Claude specifies conventional ion thruster with xenon propellant (120 kg subsystem); GPT recommends electrospray (ionic liquid) or cold gas for simplicity, with 20-50 m/s Δv capability in a 6 kg package; Gemini not specified.

- **Beamed Power in Phase 1**: Claude includes laser communication terminal but does not emphasize power beaming; GPT explicitly recommends beamed power as optional "nice-to-have" demo only, not baseline requirement, suggesting 100-500W optical laser if included.

---

## Open Questions

1. **Orbit Selection Trade**: What is the optimal balance between increased solar flux at closer orbits (0.7 AU) versus thermal management complexity, radiation environment, and operational accessibility? This fundamentally affects power output, thermal design, and mission operations.

2. **Unit Size Optimization**: Should Phase 1 prioritize fewer large collectors (MW-class) for reduced avionics overhead per watt, or many small tiles (kW-class) for manufacturing learning curve acceleration and launch flexibility? Cost-per-watt crossover point needs analysis.

3. **PV Technology Readiness vs. Performance**: How to balance TRL-9 space-proven multi-junction cells (expensive, efficient) against emerging thin-film technologies (cheaper, lighter, less radiation-tested)? What minimum lifetime is acceptable for Phase 1 learning units?

4. **High-Voltage Arc Fault Management**: What specific detection, isolation, and prevention strategies are required for 600-1200 VDC systems in the space plasma environment? This is identified as a critical reliability driver with limited flight heritage at proposed power levels.

5. **Swarm Collision Avoidance**: What conjunction probability is acceptable, and what level of autonomous avoidance capability is required versus ground-commanded maneuvers? How do units maintain safe separation during deployment dispersions?

6. **End-of-Life Disposal**: What passivation and disposal strategy prevents long-term orbital debris hazards for thousands of units in heliocentric space?

---

## Recommended Approach

1. **Adopt a modular "tile" architecture** in the 10-100 kW range per unit as a compromise between Claude's large collectors and GPT's small tiles, enabling manufacturing scale-up while keeping individual unit complexity manageable. Target ~1,000-2,500 m² per unit (~500 kW class).

2. **Baseline CIGS or advanced thin-film PV** for Phase 1 to validate mass-efficient approach, while maintaining interface compatibility for future multi-junction upgrades. Accept 15-18% efficiency in exchange for <100 g/m² areal density.

3. **Design for 1 AU operations initially** with thermal margins supporting future migration to 0.7-0.8 AU. This reduces Phase 1 risk while preserving the option for higher-flux orbits as operational experience accumulates.

4. **Prioritize HV power management and arc fault protection** as critical path development items. Invest in extensive ground testing of 600-1200 VDC systems including plasma chamber validation before flight.

5. **Implement a phased flight demonstration**: 3-10 pathfinder units (1-2 year design life) followed by 50-200 unit initial tranche (5-year design life), with manufacturing improvements incorporated between tranches.

6. **Defer beamed power to optional payload accommodation** rather than baseline requirement. Design standard payload bay with power, data, and pointing interfaces so subset of units can host beaming demonstrators without impacting core SCU design.

7. **Establish autonomous FDIR as mandatory** for all units, with swarm-level coordination remaining ground-supervised in Phase 1. Develop distributed autonomy algorithms in parallel for Phase 2 deployment.