---
bomId: "bom-1-2"
itemName: "PV Blanket Arrays"
itemSlug: "pv-blanket-arrays"
type: "consensus"
generated: "2026-02-01"
phase: "phase-1"
---

# PV Blanket Arrays - Phase 1 Initial Swarm Deployment
## Consensus Technical Specification

---

## Key Specifications

All three models converge on the following core specifications:

- **Architecture**: Rollable/deployable thin-film PV blanket tensioned by perimeter booms or centrifugal force, with distributed power electronics for fault isolation and graceful degradation
- **Areal Mass Density**: 35-50 g/m² target for the PV blanket laminate (Claude: 45 g/m², Gemini: ~1 kg/850 kg over 780,000 m² ≈ 1.1 g/m² for membrane only, GPT: 350 g/m² conservative; consensus achievable range 35-50 g/m² for aggressive designs)
- **Cell Efficiency**: 15-28% BOL conversion efficiency depending on cell technology selection (thin-film vs III-V), with 10-15% degradation over operational lifetime
- **Deployment Method**: Spin-stabilization and/or deployable boom tensioning from a compact stowed configuration; all models agree on avoiding heavy mechanical articulation
- **Electrical Architecture**: High-voltage DC bus (100V-1000V range) with segment-level Maximum Power Point Tracking (MPPT) to isolate faults and handle cell mismatch
- **Autonomy Requirement**: Level 4+ autonomy mandatory—units must handle deployment, fault isolation, station-keeping, and safe mode without ground intervention
- **Graceful Degradation**: Design philosophy prioritizes continued operation with partial damage over redundant systems; segment isolation prevents cascade failures
- **Thermal Management**: Passive radiative cooling via high-emissivity backsheet coatings; operating temperatures 250-340K depending on orbital distance
- **Communications**: Mesh network topology for inter-unit coordination; individual units communicate with nearest neighbors via optical or RF links
- **Lifetime Target**: 5-25 years depending on orbital environment and replacement strategy (Phase 1 minimum 5 years)

---

## Divergent Views

- **Orbital Location**: Claude recommends Earth-Sun L1 halo orbit (0.99 AU) for continuous sunlight and short comm delay; Gemini prefers Mercury-Sun L1 staging then 0.3 AU heliocentric orbit for 11× higher solar flux; GPT suggests flexible 0.8-1.0 AU heliocentric with orbit as a design input variable.

- **Cell Technology Selection**: Claude advocates CdTe thin-film for manufacturing maturity (TRL 9) and radiation hardness despite lower efficiency; Gemini recommends Perovskite on polyimide for extreme mass reduction and roll-to-roll printing compatibility; GPT proposes dual-track procurement with III-V flexible cells for early flights and tandem thin-film (perovskite/Si) for cost-down at scale.

- **Unit Scale**: Claude specifies 1 km² hexagonal units (45,000 kg, 200 MW); Gemini proposes 1 km diameter circular units (850 kg, 2.1 GW at 0.3 AU); GPT recommends smaller 1,200 m² rectangular units (690 kg, 400 kW) optimized for near-term manufacturability and launch constraints.

- **Power Transmission Method**: Claude specifies integrated laser power beaming (1064 nm phased array, 200 MW optical output per unit); Gemini assumes laser beaming to Mercury rectenna or relay satellite; GPT leaves power delivery architecture as an open interface question (local use vs beaming).

- **Manufacturing Location**: Claude and GPT assume Earth-based manufacturing for Phase 1 with roll-to-roll production lines; Gemini asserts in-situ manufacturing on Mercury or asteroid is mandatory from the start, arguing 1 km structures cannot be launched from Earth.

- **Bus Voltage**: Claude specifies tiered architecture (100V string → 1kV sector → 10kV main bus); Gemini does not specify voltage explicitly; GPT recommends 800V DC primary bus as optimal trade between harness mass and arcing risk, noting this requires further analysis.

---

## Open Questions

1. **Large-Scale Deployment Dynamics**: Can membrane flatness and structural stability be maintained at 1 km scale using only centrifugal force and/or boom tensioning? What are the flutter modes and control-structure interaction limits for slew maneuvers?

2. **High-Voltage Arcing in Space Plasma**: How do we prevent arcing and insulation breakdown at 800V-10kV on ultra-thin substrates in the solar wind plasma environment? What spacing rules, coatings, and detection systems are required?

3. **Perovskite Space Qualification**: Can perovskite-based cells achieve adequate radiation hardness and thermal stability for multi-year space operation, or must Phase 1 rely on proven but heavier/costlier alternatives?

4. **Critical Material Supply Chains**: Tellurium (for CdTe) and Indium (for transparent conductors) face supply constraints at Dyson-scale production. What alternative materials or recycling strategies close the supply gap?

5. **Swarm-Level Power Architecture**: What is the end-use of generated power—local electric propulsion, power beaming to Earth/Mercury, or inter-unit distribution? This fundamentally affects voltage regulation, duty cycles, and receiver infrastructure requirements.

6. **In-Space vs Earth Manufacturing Transition**: At what production scale does in-situ resource utilization become cost-effective, and what is the minimum viable "seed factory" capability required?

---

## Recommended Approach

1. **Adopt modular, segment-based architecture** with electrically independent segments (10-50 m² each) and segment-level MPPT, enabling graceful degradation and simplified fault isolation across all unit scales.

2. **Pursue dual-track cell technology development**: Use proven flexible thin-film (CdTe or CIGS) for initial flight demonstrations to retire deployment and autonomy risks, while aggressively developing perovskite tandem cells for cost and mass reduction at scale.

3. **Standardize on 800V DC primary bus voltage** as the baseline, with comprehensive arc-fault characterization and mitigation testing during Phase 1A; design power electronics for voltage flexibility to accommodate different orbital distances.

4. **Begin with Earth-based manufacturing and moderate unit sizes** (1,000-10,000 m² class) for Phase 1 flight demonstrations, scaling to larger units and in-space manufacturing only after validating deployment, autonomy, and degradation models on orbit.

5. **Implement mesh network communications and Level 4+ autonomy** from the first flight unit, including autonomous deployment sequencing, segment health management, solar storm response, and attitude safe mode—ground-in-the-loop operations are not scalable.

6. **Conduct early orbital demonstrations at 1 AU** (Earth-Sun L1 or heliocentric) to validate thermal, radiation, and micrometeoroid degradation models before committing to higher-flux inner solar system operations where failure consequences are greater.

7. **Define power delivery interface early**: Determine whether Phase 1 units power local systems, beam to receivers, or both—this decision cascades to voltage regulation, pointing requirements, and receiver infrastructure investments that dominate total system cost.