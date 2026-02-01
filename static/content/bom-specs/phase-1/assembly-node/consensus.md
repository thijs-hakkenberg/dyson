---
bomId: "bom-1-4"
itemName: "Assembly Node Hub"
itemSlug: "assembly-node"
type: "consensus"
generated: "2026-02-01"
phase: "phase-1"
---

# Assembly Node Hub - Synthesized Technical Specifications
## Phase 1 - Initial Swarm Deployment

---

## Key Specifications

All three models converge on the following core specifications:

- **Modular Architecture**: Hub constructed from standardized, swappable pallets/modules with common mechanical, electrical, and thermal interfaces enabling on-orbit assembly, servicing, and evolutionary upgrades
- **Power Class**: 1.5–2.0 MW electrical generation capacity at operational location, with nuclear and/or solar options depending on orbital distance
- **Thermal Rejection**: 2.4–4.0 MW thermal rejection capacity via deployable radiator systems (2,800–4,800 m² effective radiating area)
- **Autonomy-First Operations**: Three-tier hierarchical autonomy (reflexive/reactive, tactical/task, strategic/mission) with ground oversight limited to policy and exception handling due to light-time delays
- **Robotic Assembly**: Multiple redundant manipulator arms (4–8 total) with heavy-lift (500 kg+) and precision (<1 mm) capabilities, plus tool-changing systems
- **Production Throughput**: Target of 1–1.7 MW-equivalent of solar collector capacity per month during Phase 1 operations
- **Design Life**: 10–30 years with modular replacement and servicing capability
- **Dry Mass Range**: 120,000–450,000 kg depending on configuration and orbital location
- **Communications**: High-bandwidth Earth link (50 Mbps–1 Gbps) via optical and/or Ka/X-band RF, plus local mesh network for swarm coordination
- **Phase 1 Feedstock Strategy**: Semi-processed/pre-fabricated materials from Earth or near-Earth sources, with ISRU transition planned for later phases

---

## Divergent Views

- **Orbital Location**: Claude recommends Sun-Earth L1 vicinity (~1 AU) for balanced communication and swarm deployment geometry; Gemini prefers Sun-Mercury L1 (~0.39 AU) to co-locate with Mercury mass-driver feedstock source and maximize solar flux; GPT suggests heliocentric orbit at 0.7–1.0 AU as a logistics corridor compromise with manageable thermal loads.

- **Primary Power Source**: Claude advocates for nuclear fission (4×500 kW Kilopower-derived reactors) with solar backup for eclipse independence and compactness; Gemini specifies solar PV plus solar-thermal concentrators (120 MW at 0.39 AU); GPT recommends solar PV only (1.5 MW at 1 AU) as lower-risk baseline for Phase 1.

- **Feedstock Acquisition Method**: Claude assumes conventional cargo delivery via tugs from asteroid sources; Gemini proposes an electromagnetic "Catch" mechanism to intercept hypervelocity packets from a Mercury surface mass driver; GPT assumes standardized cargo canisters with cooperative docking and limited non-cooperative capture.

- **Hub Configuration**: Claude proposes a hexagonal 6-petal architecture (340 m diameter) with parallel assembly lines for redundancy; Gemini describes a linear "spine" design (120 m) with forward thermal shield and radial arms; GPT recommends a truss-based modular layout (18 m spine) with bilateral radiator/PV wings.

- **Solar Collector Unit Size**: Claude specifies 100 m² thin-film units (45 kg each); Gemini targets 1 km² ultra-thin statites produced every 48 hours; GPT proposes 100 m² membrane tiles with stiffened edges (~20 kW each at 1 AU).

- **Total Program Cost Estimate**: Claude estimates $10B for first ANH development through initial operations; Gemini estimates $9.5B through first 5 years of operations; GPT estimates $15–18B through 10 years of operations including demonstrator mission.

---

## Open Questions

1. **Optimal Orbital Location Trade**: What is the correct balance between solar intensity (favoring inner orbits), communication latency (favoring Earth proximity), thermal management complexity, and swarm deployment geometry? Requires detailed mission design analysis.

2. **Nuclear vs. Solar Power Decision**: Should Phase 1 commit to nuclear for compactness and eclipse independence, pursue solar-only for lower TRL risk, or develop a hybrid architecture? What is the minimum viable nuclear power scaling pathway?

3. **Feedstock Acquisition and ISRU Transition Timeline**: When and how should the ANH transition from Earth-supplied pre-processed materials to asteroid or planetary-derived feedstock? What is the minimum viable ISRU capability for Phase 1?

4. **Autonomous Assembly Reliability Target**: Can autonomous robotic assembly achieve the required 95%+ first-pass success rate? What ground testing, on-orbit learning, and human-in-the-loop backup strategies are needed?

5. **Waste and Contamination Management**: How should manufacturing byproducts (slag, outgassing, particulates) be handled to avoid sensor obscuration, debris generation, and clean-zone contamination?

6. **Swarm Coordination Architecture at Scale**: As the swarm grows to millions of units, should coordination be centralized (ANH as master), distributed (peer-to-peer), or hierarchical? What communication bandwidth and compute are required?

---

## Recommended Approach

1. **Adopt Modular Pallet Architecture**: Design the ANH around standardized, swappable functional pallets (manufacturing, power conditioning, thermal, robotics, avionics) with common interfaces to enable incremental capability growth, on-orbit servicing, and technology insertion without full redesign.

2. **Baseline 1 AU Operations for Phase 1**: Locate the first ANH in heliocentric orbit near 1 AU to minimize thermal management complexity, maintain reasonable Earth communication, and reduce development risk. Plan for inner-system migration in subsequent phases as thermal and ISRU technologies mature.

3. **Select Solar Power with Nuclear Option Study**: Proceed with solar PV (1.5–2.0 MW class) as the Phase 1 baseline while conducting a parallel nuclear power scaling study. Preserve design margins and interfaces to accommodate nuclear retrofit if solar proves insufficient for later phases.

4. **Use Pre-Processed Feedstock Initially**: Phase 1 should rely on Earth-manufactured or minimally processed feedstock (metal coils, PV rolls, packaged electronics) delivered via conventional cargo tugs. Defer in-space refining and mass-driver catch systems to Phase 2+ after demonstrating core assembly capabilities.

5. **Prioritize Pathfinder Demonstrator Mission**: Before committing to full ANH development, fly a subscale orbital demonstrator (1/5 scale, single assembly cell) to validate autonomous robotic assembly, thermal management, and tile deployment in the operational environment.

6. **Implement Hierarchical Autonomy with Conservative Fault Handling**: Deploy three-tier autonomy (reactive, tactical, strategic) with ground-uploaded policies and constraints. Design for "pause and safe" fault response with human-in-the-loop escalation for anomalies, accepting reduced throughput over catastrophic failures.

7. **Oversize Thermal Rejection Capacity**: Size radiator systems to 150% of nominal waste heat load to provide margin for manufacturing duty cycle peaks, technology uncertainty, and future throughput growth. Thermal rejection is the primary throughput limiter and should not be undersized.