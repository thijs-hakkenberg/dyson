---
bomId: "bom-0-2"
itemName: "Mining Robots"
itemSlug: "mining-robots"
generated: "2026-01-31"
phase: "phase-0"
type: "consensus"
---

# Mining Robots - Consensus Analysis

This document synthesizes specifications from Claude Opus 4.5, Gemini 3 Pro, and GPT-5.2 to identify areas of agreement, divergence, and open questions.

## Key Specifications

All models agree on these fundamental specifications:

- Fleet of 20 robots is appropriate for initial mining operations
- Mass per robot: 2,500-3,500 kg including tooling
- Multi-leg mobility (hexapod or similar) for asteroid surface traversal
- Autonomous operation capability for months without ground intervention
- On-board material processing for initial concentration
- 5-year minimum operational lifetime
- Solar-powered with battery backup for shadow operations
- Extraction rate target: 1,000+ tonnes per robot per year

## Divergent Views

Models have different perspectives on these aspects:

- **Mobility Architecture**: Claude strongly favors hexapod design, Gemini prefers wheeled rovers for simplicity, GPT suggests hybrid wheel-leg systems.
- **Anchoring System**: Significant divergence on microspines vs. harpoon-tethers vs. gecko-inspired adhesives. Each model prioritizes different approach.
- **Processing Capability**: Claude and Gemini include magnetic/electrostatic separation on-robot, GPT prefers minimal processing with bulk transport.
- **Communication**: Gemini emphasizes inter-robot mesh networks, Claude focuses on relay orbiter, GPT suggests hybrid approach.
- **Cost Per Unit**: Estimates range from $40M to $65M due to different technology assumptions.

## Research Resolution: Excavation Architecture (rq-0-26)

**Status**: Resolved via multi-model discussion (2026-02-08)

The **dual counter-rotating bucket-wheel architecture** is validated as the baseline excavation mechanism for Phase 0 mining robots. This resolution emerged from unanimous consensus across Claude, Gemini, and GPT models.

### Key Decisions

- **Torque cancellation is mandatory**: Single-axis excavation generates 50–200 N·m of continuous reaction torque at 10+ kW—unmanageable without counter-rotation
- **Dual wheels reduce net torque by 90–95%**: Residual imbalance from asymmetric cutting loads drops to 5–10% of single-wheel values
- **Mass penalty acceptable**: 15–25 kg for second wheel assembly is justified against alternative of massively overbuilt anchoring
- **Asymmetric wheel sizing recommended**: Different diameters (e.g., 80% and 100%) with ~100 Hz differential speed control desynchronizes correlated load spikes

### Excavation Subsystem Specifications

| Parameter | Value |
|-----------|-------|
| Mechanical power | 20–50 kW |
| Excavation rate | 2–5 tonnes/hour |
| Subsystem mass | 60–80 kg (dual wheels, housing, motors, ISPP interface) |
| Particle containment | >99% required |
| Design life | 5+ years, 20,000+ operating hours |

### Critical Integration Requirements

- **Direct ISPP coupling**: Excavation head feeds directly into sealed screw auger connected to water extraction systems—no intermediate hoppers
- **Particle containment is co-equal design driver**: Even at 99% containment, 5 t/hr excavator releases 50 kg/hr of fugitive particles
- **Thermal isolation required**: Excavation heat conducted into regolith face could drive off volatiles before extraction

### Remaining Open Questions

- Subsurface regolith mechanical properties (beyond surface characterization)
- Thermal management vs. volatile preservation trade-off
- Fleet-level contamination thresholds
- Autonomous adaptation to voids and heterogeneous material

## Open Questions

Critical decisions and research needs identified across all models:

- ~~How does regolith behave during excavation in microgravity?~~ **Partially resolved** via bucket-wheel architecture
- What anchoring technology is most reliable across asteroid types (C, S, M)?
- What is the optimal fleet composition: homogeneous vs. specialized robots?
- How to handle electrostatic charging effects on mechanisms?
- What level of on-board processing is cost-effective vs. bulk transport?

## Resolved Architecture Decisions

The following architectural decisions have been resolved through multi-model deliberation:

### Excavation System: Dual Counter-Rotating Bucket Wheels (rq-0-26)

**Decision**: Adopt dual counter-rotating bucket-wheel architecture as the baseline excavation mechanism.

**Rationale** (from unanimous multi-model consensus, 2026-02-08):
- Single-axis excavation generates 50–200 N·m of continuous reaction torque at 10+ kW—unmanageable for a 500 kg robot
- Counter-rotating wheels reduce net torque by **90–95%**, bringing residual loads within anchoring/attitude control budgets
- Mass penalty of 15–25 kg for second wheel assembly is acceptable vs. alternative of overbuilt anchoring
- Asymmetric wheel sizing (80%/100% diameter ratio) with differential speed control desynchronizes load spikes from consolidated clasts

**Excavation Subsystem Specifications**:
- Mechanical power: 20–50 kW
- Continuous excavation rate: 2–5 tonnes/hour per robot
- Subsystem mass: 60–80 kg (dual wheels, housing, motors, direct ISPP feed interface)
- Particle containment: >99% required (fugitive particles at >0.1 m/s escape velocity are permanently lost)
- Direct ISPP integration: Sealed screw auger or pneumatic transfer to water extraction systems

**Co-Design Requirements**:
- Housing must achieve >99% particle containment through enclosed cutting faces and flexible seals
- Thermal isolation required between excavation mechanism and regolith face to preserve volatiles
- Fleet-level contamination modeling required before hardware freeze

**Development Program**: $17M, 18-month phased approach:
1. DEM simulation campaign (Months 1–6, ~$2M)
2. 1/3-scale parabolic flight testing (Months 4–12, ~$5M)
3. Full-scale ISPP integration prototype (Months 10–18, ~$10M)

---

## Recommended Approach

Based on multi-model analysis, the recommended approach is:

1. **Baseline dual counter-rotating bucket wheels** for excavation (see resolved decision above)
2. **Prioritize anchoring technology R&D** through parabolic flight and ISS testing
3. **Design modular tool system** that can adapt to different asteroid compositions
4. **Start with conservative hexapod design** with backup wheeled option
5. **Integrate excavation directly with ISPP** to eliminate intermediate hoppers and containment risks
6. **Minimize on-robot processing** initially; add capability based on operational experience
7. **Deploy small pathfinder fleet (2-3 robots)** before committing to full production
8. **Plan for cooperative operations** even if initial robots work independently

The total budget of $1B for 20 units ($50M/unit) aligns with consensus estimates but requires careful development cost management. Development alone may consume $300-400M.
