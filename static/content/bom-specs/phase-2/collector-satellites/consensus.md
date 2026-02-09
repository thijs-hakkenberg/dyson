---
bomId: "bom-2-1"
itemName: "Solar Collector Satellites"
itemSlug: "collector-satellites"
type: "consensus"
generated: "2026-02-01"
phase: "phase-2"
---

# Solar Collector Satellites - Phase 2 Swarm Expansion
## Consensus Technical Specification

---

## Key Specifications

All three models converge on the following core specifications:

- **Geometry**: Hexagonal or square thin-film membrane architecture with deployed areas in the **1,000–5,000 m² range** per unit, optimized for tessellation and swarm coordination

- **Mass Class**: Total satellite mass of **225 kg to 2,500 kg** depending on scale, achieving specific power of **19–650 W/kg** (all models prioritize ultra-low mass-per-watt)

- **Power Conversion**: Thin-film photovoltaic technology with **25–42% conversion efficiency** (BOL), rejecting concentrator optics for Phase 2 due to complexity and pointing requirements

- **Electrical Architecture**: High-voltage DC distribution (**1–5 kV**) with extensive electrical segmentation (100–200 independent zones) to enable graceful degradation from micrometeoroid damage or manufacturing defects

- **Autonomy Level**: Full autonomous operation required (Level 4+) including deployment sequencing, station-keeping, fault isolation, and swarm coordination—human-in-the-loop operations cannot scale to billions of units

- **Design Lifetime**: **10–25 years** operational lifetime with acceptance of gradual degradation rather than catastrophic failure modes

- **Manufacturing Philosophy**: Design for exponential production scaling with emphasis on roll-to-roll processes, standardized interfaces, and acceptance of statistical defect rates over perfection

- **Swarm Coordination**: Heterogeneous hierarchical architecture with dedicated "Shepherd" coordinator spacecraft managing clusters of 1,000–5,000 "Flock" collector units; individual units maintain **10–50 km minimum separation**; exception-based telemetry reduces bandwidth by ~100× (see rq-1-24 resolution)

---

## Divergent Views

- **Operating Orbit**: Claude recommends **0.5 AU heliocentric** (4× solar flux, 5,480 W/m²); Gemini prefers **0.3 AU near Mercury** (11× flux, ~15,000 W/m²); GPT suggests **1.0 AU Earth-like orbit** (1,361 W/m², simpler thermal management)

- **Power Conversion Technology**: Claude specifies **Stirling engines at 50–55% efficiency** for thermal-to-electric conversion; Gemini and GPT both recommend **direct thin-film photovoltaics** (25–42% efficiency) as simpler and lighter

- **Unit Scale**: Claude proposes **1 km² (1,000,000 m²) per satellite** at 850 metric tons; Gemini specifies **0.785 km² (785,000 m²)** at 225 kg; GPT recommends **5,000 m²** at 2,500 kg—a 200× difference in collection area

- **Power Transmission Architecture**: Claude integrates **2.5 GW microwave phased arrays** on each collector; Gemini includes **solid-state phased arrays** per unit; GPT argues collectors should output **DC only** with dedicated relay/beaming nodes handling transmission

- **Station-Keeping Propulsion**: Claude specifies **gridded ion thrusters with xenon** (Isp 3,000s); Gemini proposes **electric solar wind sails (E-Sails)** requiring no propellant; GPT recommends **Hall-effect thrusters with xenon or krypton** (Isp ~1,600s)

- **Manufacturing Location**: Claude and GPT assume **Earth-based manufacturing** transitioning to in-space over time; Gemini requires **Mercury surface mining and L2 orbital foundries** from the outset, with no Earth launches

---

## Open Questions

1. **High-Voltage Arc Management**: How do we reliably prevent and detect arcing in multi-kilovolt DC systems across kilometer-scale membranes in the space plasma environment? All models identify this as a critical risk requiring extensive vacuum testing infrastructure.

2. **Membrane Long-Term Degradation**: What is the actual degradation rate of thin-film substrates (Kapton, polyimide variants) under intense UV flux at 0.3–0.5 AU over 10–50 year timescales? Self-healing polymers or protective coatings may be required.

3. **Swarm Collision Avoidance at Scale**: ~~How do we certify and govern autonomous collision avoidance behaviors for billion-unit swarms?~~ **Partially resolved** (rq-1-24, rq-2-17): Heterogeneous Shepherd/Flock architecture with spatial partitioning enables O(1) collision avoidance complexity. Shepherds compute pairwise checks only within their sector plus buffer zone. Remaining questions: inter-Shepherd coordination protocols and correlated failure recovery.

4. **Thermal Warping of Large Membranes**: Will thermal gradients between sun-facing and dark sides cause membrane curling that disrupts phased array focus or structural integrity? Active electrostatic stiffening may be needed.

5. **In-Space Manufacturing Readiness**: Can we manufacture kilometer-scale conductive tethers, thin-film PV, and structural elements reliably in zero-G using asteroid or lunar materials? The timeline for ISRU maturity drives the entire program architecture.

6. **Power Export Interface Standard**: Should collectors dock physically with HV connectors, deploy robotic power tethers, or perform local RF/optical conversion? This decision cascades through insulation design, connector standards, and operational concepts.

---

## Recommended Approach

1. **Adopt a phased scale-up strategy**: Begin Phase 2 with GPT's smaller **5,000 m² class satellites** (proven deployment mechanics, manageable thermal loads) while developing Claude's **1 km² architecture** for Phase 3. This de-risks deployment while building toward exponential scaling.

2. **Standardize on thin-film photovoltaics for Phase 2**: Defer Stirling engine development to Phase 3. Direct PV conversion eliminates thermal concentration complexity, reduces pointing requirements, and enables roll-to-roll manufacturing. Target **25–30% BOL efficiency** with multi-junction or tandem cells.

3. **Separate collection from transmission**: Adopt GPT's architecture where collectors output standardized DC to dedicated relay/beaming nodes. This keeps collector mass low, production fast, and allows independent optimization of each function.

4. **Select 0.5–0.8 AU operating orbit as compromise**: Gemini's 0.3 AU orbit offers highest flux but extreme thermal challenges; GPT's 1.0 AU is conservative. Claude's 0.5 AU provides 4× Earth flux with manageable thermal design—validate with pathfinder missions before committing.

5. **Implement aggressive electrical segmentation**: All models agree on 100–200 independent zones per satellite. Design for **20% zone loss tolerance** with automatic bypass and reconfiguration. This makes micrometeoroid damage and manufacturing defects non-catastrophic.

6. **Invest immediately in HV testing infrastructure and swarm simulation**: These are the two highest-risk, longest-lead items. Fund dedicated vacuum arc characterization facilities and million-unit swarm coordination simulations before finalizing electrical and autonomy architectures.

7. **Design for Earth-based manufacturing initially with ISRU-compatible interfaces**: Gemini's Mercury foundry concept is compelling but requires infrastructure that doesn't yet exist. Build the first 1,000–10,000 units from Earth while developing in-space manufacturing capability in parallel, ensuring material and interface compatibility for the transition.

---

## Cross-References

- **Swarm Control Architecture**: See [bom-1-7 Swarm Control System](../phase-1/swarm-control-system/consensus.md) for Shepherd/Flock heterogeneous hierarchy (rq-1-24)
- **Fleet Coordination**: See [bom-2-3 Manufacturing Expansion](./manufacturing-expansion/consensus.md) for federated autonomous cluster architecture (rq-2-17)
- **Excavation System**: See [bom-0-2 Mining Robots](../phase-0/mining-robots/consensus.md) for dual counter-rotating bucket wheel design (rq-0-26)