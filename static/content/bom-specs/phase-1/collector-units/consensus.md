---
bomId: "bom-1-1"
itemName: "Solar Collector Units"
itemSlug: "collector-units"
type: "consensus"
generated: "2026-02-01"
phase: "phase-1"
---

# Solar Collector Unit (SCU) Synthesis Document
## Phase 1 - Initial Swarm Deployment

---

## Key Specifications

All three models converge on the following technical parameters:

- **Architecture**: Thin-film photovoltaic membrane/sail design with modular, mass-producible units prioritizing areal density over rigid panel construction
- **Conversion Efficiency**: 28-31% beginning-of-life (BOL) using multi-junction or perovskite-silicon tandem cells, degrading to ~20-25% end-of-life (EOL)
- **Areal Density Target**: <100 g/m² for collector surfaces (Claude: 85 g/m², Gemini: ~13 g/m², GPT: ~0.5 kg/m² for blanket alone)
- **Power Transmission Method**: Microwave wireless power transmission at 2.45 GHz or 5.8 GHz using phased array antennas with electronic beam steering
- **Autonomy Requirement**: High unit-level autonomy with fault detection, isolation, and recovery (FDIR) due to communication latency (minutes to Earth)
- **Propulsion**: Ion or electrospray propulsion for station-keeping with 20-100 m/s ΔV capability over mission life; solar radiation pressure utilized for attitude control
- **Thermal Management**: Passive radiative cooling using high-emissivity rear coatings (ε > 0.9) to maintain PV operating temperatures below 120-200°C
- **Redundancy Philosophy**: Graceful degradation design where loss of 10% of units or components does not compromise mission; no single-point failures
- **Communications Architecture**: Mesh network topology with inter-SCU links; hierarchical control with "shepherd" or relay nodes for Earth communication

---

## Divergent Views

- **Orbital Distance**: Claude recommends 0.5 AU (solar flux 5,480 W/m², 52 MW per unit); Gemini prefers 0.3 AU (solar flux ~15,000 W/m², 44 MW per unit); GPT suggests 1.0 AU baseline (solar flux 1,361 W/m², 10-11 kW per unit) for reduced thermal/radiation stress and simpler operations.

- **Unit Size/Power Class**: Claude specifies 10,000 m² collectors producing 52 MW each at 1,850 kg total mass; Gemini proposes 6,500 m² hexagonal sails producing 44 MW at 85 kg; GPT recommends smaller 40 m² "tile" units producing 10 kW at 69 kg for manufacturing simplicity and rapid iteration.

- **Attitude Control Approach**: Claude recommends Control Moment Gyros (CMGs) with ion thruster momentum dumping; Gemini advocates spin-stabilization (5 RPM) with heliogyro solar pressure control and minimal propellant; GPT proposes reaction wheels with micropropulsion for a balance of simplicity and precision.

- **PV Technology Selection**: Claude selects perovskite-silicon tandem (TRL 5, 31% efficiency, best mass efficiency); Gemini specifies perovskite/CIGS flexible thin-film (45% claimed, aggressive); GPT favors space-proven multi-junction III-V cells (TRL 7-9) despite higher cost, citing radiation tolerance concerns.

- **Phase 1 Beamed Power Requirement**: Claude includes full 44.5 MW microwave transmission as baseline capability; Gemini integrates metamaterial phased array into sail structure as core function; GPT recommends beamed power as optional demonstration module only, not baseline requirement for Phase 1.

- **Unit Cost Estimates**: Claude projects $2.4M per unit at 1,000-unit scale; Gemini estimates $154,000 per unit (hardware + launch); GPT ranges $0.7M-$4.9M depending on PV technology choice and reliability requirements.

---

## Open Questions

1. **Radiation Degradation Rates**: What is the actual 5-year survival curve for unshielded thin-film PV (especially perovskites) under intense proton flux at 0.3-0.5 AU? Laboratory data is insufficient for mission planning.

2. **Station-Keeping Propellant Budget**: Can solar radiation pressure alone maintain precise formation geometry required for phased array power transmission, or will propellant consumption exceed mass budgets?

3. **Xenon Supply Chain**: Phase 1 at Claude's scale requires 150 tonnes of xenon (global annual production ~70 tonnes). Is alternative propellant (krypton, ionic liquid) viable without significant Isp penalty?

4. **High-Voltage Arc Fault Behavior**: How do 600-1200 VDC systems behave in the plasma environment at various solar distances? What detection/isolation response times are required?

5. **Deployment Reliability at Scale**: What is acceptable deployment failure rate for origami-folded or roll-out membrane structures at 100-1000x scale? How many ground deployment cycles validate flight reliability?

6. **Swarm Collision Probability**: With 1,000+ units in formation, what inter-unit spacing and autonomous avoidance capability prevents cascading collisions while maintaining power transmission coherence?

---

## Recommended Approach

1. **Adopt a modular "tile" architecture** starting with 100-1000 m² class units (compromise between GPT's 40 m² and Claude's 10,000 m²) to enable manufacturing learning while generating meaningful power (~500 kW-5 MW per unit). Scale unit size in later phases as production matures.

2. **Begin Phase 1 deployment at 1.0 AU** (GPT's recommendation) to reduce thermal management complexity and radiation exposure, enabling validation of core systems before migrating to higher-flux orbits (0.5 AU) in Phase 2.

3. **Select space-proven multi-junction PV for initial units** while conducting parallel qualification of perovskite-silicon tandem technology. Transition to tandem cells in Phase 1B/1C once radiation tolerance is demonstrated in flight.

4. **Implement hybrid attitude control**: reaction wheels for fine pointing with solar radiation pressure augmentation (Gemini's heliogyro principles) to minimize propellant consumption. Reserve ion propulsion for station-keeping and momentum dumping only.

5. **Defer full-scale beamed power transmission to Phase 1B**: Initial units should demonstrate power generation, storage, and electrical export interfaces. Include standardized payload bay (GPT's approach) for beamed power demonstrator modules on a subset of units.

6. **Establish manufacturing pilot line for 50-200 units** before committing to 1,000-unit production. Use pathfinder flights (3-10 units) to validate deployment, thermal, and autonomy systems with real operational data.

7. **Prioritize high-voltage power management and arc fault protection** as critical path technology development. This subsystem enables efficient power aggregation across the swarm and is common to all architectural variants.