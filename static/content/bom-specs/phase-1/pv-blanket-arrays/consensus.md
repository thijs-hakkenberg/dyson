---
bomId: "bom-1-2"
itemName: "PV Blanket Arrays"
itemSlug: "pv-blanket-arrays"
type: "consensus"
generated: "2026-02-01"
phase: "phase-1"
---

# PV Blanket Arrays - Phase 1 Initial Swarm Deployment
## Consensus Technical Specification Document

---

## Key Specifications

All models agree on the following core specifications:

- **Architecture**: Rollable/foldable thin-film PV blanket tensioned by deployable perimeter booms (4 booms in cruciform or rectangular configuration)
- **Unit Scale**: 1,000–10,000 m² active collecting area per deployable unit, targeting 200–400 kW beginning-of-life power output at 1 AU
- **Areal Mass Density**: 10–15 g/m² for the blanket assembly (cells + substrate + encapsulation), with total system mass density of 50–150 g/m² including booms, electronics, and harness
- **Cell Efficiency Target**: 15–28% AM0 efficiency at beginning-of-life, with tandem architectures (perovskite/silicon or III-V multijunction) preferred over single-junction
- **Distributed Power Electronics**: Segment-level Maximum Power Point Tracking (MPPT) to isolate faults, handle mismatch, and enable graceful degradation
- **Design Lifetime**: 5–10 years with 2–5% annual degradation budget from radiation, thermal cycling, and micrometeoroid impacts
- **Deployment Method**: Motor-driven spool/drum deployment with passive tensioning; deployment time 10–30 minutes
- **Autonomous Operation**: Required for deployment sequencing, fault isolation, attitude safe mode, and segment health management without ground intervention
- **Substrate Material**: Polyimide (Kapton or equivalent) as baseline, 25–50 μm thickness, with SiOx or equivalent barrier encapsulation

---

## Divergent Views

- **Bus Voltage Selection**: Claude specifies 120V regulated output from 90V strings; GPT recommends 800V HVDC to minimize harness mass; Gemini does not specify but implies lower voltage heritage approach. This represents a fundamental trade between arc risk and conductor mass.

- **Cell Technology Selection**: Claude strongly recommends perovskite-on-silicon tandem (2-terminal) citing manufacturability and thin-film compatibility; GPT recommends dual-track procurement with III-V flexible for early flights and perovskite/tandem for cost-down; Gemini specification unavailable for comparison.

- **Unit Size Optimization**: Claude proposes 100m × 100m (10,000 m²) units at 145 kg total; GPT proposes 30m × 40m (1,200 m²) units at 690 kg total; this 8× difference in area per unit significantly impacts deployment complexity, fault tolerance, and manufacturing approach.

- **Segment Granularity**: Claude implies quadrant-level segmentation (4 segments per unit); GPT specifies 48 segments at 25 m² each with individual MPPT modules; finer granularity improves fault isolation but increases electronics count and complexity.

- **Specific Power Target**: Claude targets ~1,400 W/kg (145 kg for 200 kW EOL); GPT targets ~565 W/kg (690 kg for 390 kW BOL); this 2.5× difference reflects different risk postures on mass optimization.

- **Cost Assumptions**: Claude targets $50/m² at scale for blanket fabrication; GPT estimates $50–200/m² for mature thin-film production; both acknowledge early units will be orders of magnitude more expensive during development phase.

---

## Open Questions

1. **HVDC Arc Management**: What spacing rules, coatings, and detection methods are required for reliable 800V+ operation in vacuum with flexible substrates? What is the true crossover voltage where arc risk outweighs harness mass savings?

2. **Perovskite Space Stability**: What is the actual degradation rate of perovskite cells under combined space radiation, thermal cycling, and UV exposure beyond the current ~3 years of flight data? Is ion migration under bias a mission-limiting phenomenon?

3. **Structural Dynamics and Flutter**: What are the coupled structural-control modes for 100m-class tensioned membranes under solar radiation pressure? What slew rate limits and damping strategies are required?

4. **Swarm Power Interface**: Is generated power used locally (propulsion, processing), transmitted via power beaming, or stored? This fundamentally drives voltage regulation, duty cycle, and energy storage requirements.

5. **Micrometeoroid Damage Propagation**: What is the actual tear propagation behavior in thin-film blankets, and how effective are ripstop reinforcement grids at the proposed areal densities? What redundancy factor should be designed into interconnects?

6. **Manufacturing Yield at Scale**: What defect rates are acceptable for roll-to-roll production of 1,000+ m² blankets, and what in-line inspection methods can achieve required throughput without compromising quality?

---

## Recommended Approach

1. **Adopt a modular segment architecture** with 20–50 m² electrically independent segments, each with dedicated MPPT, enabling fault isolation and graceful degradation while keeping electronics count manageable (target 20–50 segments per unit).

2. **Standardize on 300–400V DC bus voltage** as a compromise between harness mass reduction and arc risk, with clear path to 800V for later phases once vacuum arc behavior is fully characterized through dedicated testing.

3. **Pursue dual-track cell technology development**: use heritage flexible III-V or proven thin-film (CIGS) for first flight demonstrations while aggressively developing perovskite-silicon tandem for production scale-up, with go/no-go decision at Phase 1B based on stability data.

4. **Design for 2,000–5,000 m² unit size** as the Phase 1 baseline, balancing deployment risk against manufacturing efficiency; this intermediate scale allows meaningful power generation (~500 kW class) while remaining within near-term deployable boom technology limits.

5. **Implement ripstop reinforcement grid** at 1–2 m spacing integrated into the blanket substrate, with redundant parallel interconnect paths between cells, accepting 5–10% mass penalty for significantly improved damage tolerance.

6. **Prioritize ground deployment testing** in thermal-vacuum with gravity offload before flight, including intentional damage injection testing to validate fault isolation and graceful degradation modes.

7. **Establish standardized mechanical and electrical interfaces** early in Phase 1A to enable swarm-level integration, in-space assembly, and potential robotic servicing in later phases, even if servicing capability is not implemented in Phase 1.