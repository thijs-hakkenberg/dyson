---
type: "bom-consensus"
generated: "2026-02-07"
phase: "phase-3"
---



# Phase 3 — Matroska Brain: Consensus BOM Synthesis

---

## Agreed BOM Items

The following items represent strong convergence across all three model proposals. Where models used different names for functionally equivalent systems, they have been unified under a single item.

---

### 1. Computational Substrate Tiles (slug: `computational-substrate-tiles`)
- **Category:** Computing
- **bomId:** bom-3-1
- **Description:** The fundamental building block of the Matroska Brain's inner and mid-temperature computational layers. Each tile integrates energy harvesting on its sunward face (thermophotovoltaic cells tuned to the waste-heat spectrum of the next-inner layer, or direct photovoltaic at the innermost shell) with compute substrate and local memory on the anti-sunward face. Waste heat from computation is radiated outward to feed the next shell. All three models agree this is the single most important hardware element: Opus specifies 50 m² hexagonal membranes with 10–50 PFLOPS reversible logic and 1–10 PB memory per tile at Layers 1–2 (800–1200 K and 200–400 K); GPT proposes 1–10 m² tiles with ASIC/accelerator stacks on a shared thermal backbone at 0.3–0.7 AU; Gemini describes statites with large-area rectenna/thermal collectors and optical or molecular computing cores. The consensus design is a modular, mass-produced tile (1–50 m² depending on layer) combining TPV energy harvesting, compute (architecture TBD — reversible logic, neuromorphic, or ASIC), local storage, and mesh networking, with a standardized thermal interface presenting predictable heat flux to the radiator network.

- **Quantity:** 10¹⁰–10¹⁴ tiles across all computational layers (all three models converge on this range; Opus at ~10¹³, GPT at 10¹⁰–10¹², Gemini at 10¹²–10¹⁴). Consensus working estimate: **~10¹² tiles** for initial operational capability, scaling to 10¹³–10¹⁴ at full build-out.

- **Cost:** $10¹¹–$10¹⁴ total (Opus: $10¹¹–$10¹²; GPT: $10¹²–$10¹⁴; Gemini: marginal $100–$500/unit × quantity → $10¹⁴ at upper end). **Confidence: Low.** All models agree cost is dominated by in-space semiconductor fabrication capability rather than raw materials, and that meaningful dollar figures become increasingly abstract at this scale — cost is better expressed in manufacturing-node-years.

- **Key Technical Challenges (consensus across all models):**
  - TPV efficiency at long wavelengths / low source temperatures (all three models flag this)
  - High-temperature compute substrate materials — silicon fails above ~450 K; SiC, GaN, or diamond logic required for hot layers (Opus, GPT)
  - Reversible/adiabatic logic at scale to approach Landauer limits (Opus primary concern; GPT frames as "compute-per-watt baseline")
  - Nanometer-scale semiconductor fabrication in autonomous space factories (all three models identify this as the single hardest manufacturing challenge)
  - Radiation survival, annealing strategies, and graceful degradation under continuous partial failures (GPT emphasis)

---

### 2. Inter-Layer Optical Communication Backbone (slug: `inter-layer-optical-backbone`)
- **Category:** Communications
- **bomId:** bom-3-2
- **Description:** A hierarchical free-space optical communication network providing data routing between and within all Matroska layers, serving as the "nervous system" that transforms isolated compute shells into a coherent computational entity. All three models agree on the fundamental architecture: relay nodes with telescope apertures, wavelength-division or orbital-angular-momentum multiplexed laser links, adaptive optics, and onboard routing/switching. Opus specifies 500 kg relay satellites with 1 m apertures and 1,024 WDM channels at 1550 nm, targeting 10²⁴ bps aggregate inter-layer bandwidth. GPT proposes a hierarchical fabric at 1550 nm with relay spines and local meshes, plus an integrated time/frequency authority constellation for distributed computation synchronization. Gemini describes high-power OAM-multiplexed transceivers managing latency and bandwidth differences between shells at different orbital velocities. The consensus design combines all three perspectives: a hierarchical mesh of optical relay nodes with WDM and/or OAM multiplexing, embedded short-range transceivers in compute tiles for intra-layer traffic, dedicated relay stations for inter-layer links, and an integrated time/frequency synchronization authority.

- **Quantity:** 10⁶–10⁹ relay nodes (Opus: ~10⁹; GPT: 10⁶–10⁸ relays + 10⁹–10¹² embedded transceivers; Gemini: ~10⁹). Consensus: **~10⁸–10⁹ dedicated relay nodes** plus embedded transceivers in every compute tile.

- **Cost:** $10¹¹–$10¹³ total (Opus: $10¹²–$10¹³; GPT: $10¹¹–$10¹³; Gemini: $5,000–$10,000/unit × 10⁹ → ~$10¹²–$10¹³). **Confidence: Medium.** Optical communication is the most mature technology in this BOM; the challenges are scale, pointing, and synchronization rather than fundamental physics.

- **Key Technical Challenges (consensus):**
  - Beam divergence over AU-scale inter-layer distances (Opus calculates ~1,200 km spot at 5.5 AU with 1 m aperture at 1550 nm; relay chains or much larger apertures required)
  - Pointing/acquisition/tracking at extreme node counts with sub-microradian accuracy (all three models)
  - Clock synchronization and time distribution across light-hours of propagation delay (Opus and GPT both emphasize; GPT proposes dedicated time/frequency authority constellation)
  - Routing architecture at yottabit aggregate scale — must be hierarchical with >99.99% local traffic absorption (Opus)
  - Link degradation from dust, micrometeoroids, radiation darkening of optics (GPT); signal dispersion through zodiacal dust (Gemini)
  - Maintaining links between shells rotating at different angular velocities (Gemini)

---

### 3. Thermal Management and Radiator Systems (slug: `thermal-management-radiator-systems`)
- **Category:** Power Systems
- **bomId:** bom-3-3
- **Description:** Purpose-built thermal rejection and spectral-shaping elements that manage the thermodynamic cascade defining the Matroska Brain architecture. All three models agree that the entire concept depends on efficient waste-heat cascading from inner to outer layers, and that dedicated thermal management hardware — distinct from the compute tiles' own radiative surfaces — is essential. Opus proposes 200 m² deployable carbon-carbon composite panels with embedded heat pipes and metamaterial/photonic-crystal coatings for narrow-band spectral emission matched to the next layer's TPV bandgap. GPT describes kilometer-to-megakilometer-class thin membranes optimized for IR absorption/emission and heat transport, forming the structural basis of each Matroska layer, with segmentation to prevent tear propagation. Gemini proposes active cryogenic cooling spines with superfluid loops for the outermost layers (<10 K). The consensus recognizes two distinct thermal management regimes: (a) **passive spectral-selective radiators** for the inner/mid layers (Layers 1–3), which absorb broadband waste heat and re-emit in narrow bands matched to the next layer's energy harvesters; and (b) **active cryogenic systems** for the outermost cold layers (Layer 4+), where passive radiation alone cannot achieve the required operating temperatures.

- **Quantity:** Passive radiators: 10⁷–10¹² units depending on unit size (Opus: 10¹² at 200 m²; GPT: 10⁷–10⁹ modules at 10⁴–10⁶ m²; total radiating area converges at ~10¹⁴–10¹⁵ m²). Active cryogenic units: ~10⁷ (Gemini). Consensus: **~10¹⁴ m² total radiating area** in passive radiators (unit count depends on module size), plus **~10⁷ active cryogenic units** for cold layers.

- **Cost:** $10¹²–$10¹⁵ total (Opus: $10¹²–$10¹³ for passive radiators; GPT: $10¹²–$10¹⁵ for membranes; Gemini: $50M–$100M × 10⁷ → $10¹⁴–$10¹⁵ for cryogenic spines). **Confidence: Low.** The passive radiator materials science is achievable but unproven at scale; the cryogenic systems are speculative.

- **Key Technical Challenges (consensus):**
  - Spectral selectivity — achieving Δλ/λ < 0.1 narrow-band thermal emission via metamaterial or photonic crystal surfaces at manufacturing scale (Opus)
  - Long-life IR-optical property stability under micrometeoroids and solar wind sputtering (GPT)
  - Heat pipe reliability over decades; micrometeoroid puncture as dominant failure mode (Opus)
  - Managing thermal gradients, flutter, and warping across enormous flexible structures; tear propagation prevention (GPT)
  - Cascade efficiency — theoretical Carnot limits suggest ~60%/30%/10% capture at successive layers; achieving even 50% of theoretical is extremely challenging (Opus)
  - Active cryogenic cooling at astronomical scale — superfluid transport, coolant containment, shielding cold nodes from inner-system thermal noise (Gemini)

---

### 4. Self-Replicating Manufacturing Foundries (slug: `self-replicating-manufacturing-foundries`)
- **Category:** Infrastructure
- **bomId:** bom-3-4
- **Description:** Autonomous, self-replicating factory complexes that process asteroid and outer-system feedstock into finished Matroska Brain components. All three models agree this is a critical-path item and the evolved descendant of Phase 2 manufacturing infrastructure. Opus specifies 50,000-tonne foundries with 12-month replication time and 96% mass closure, producing ~10⁶ compute tiles/year each. GPT proposes large replicated manufacturing complexes producing radiator membranes, heat engines, power electronics, structural foils, and packaged compute modules, with recycling loops for failed components. Gemini describes "Von Neumann Assembler Hives" — fully autonomous mobile factory-cities consuming outer-system bodies with zero human oversight. The consensus design is a standardized, modular manufacturing complex capable of: (a) processing raw asteroid/KBO feedstock into refined materials; (b) fabricating semiconductor compute substrates, TPV cells, radiator panels, optical components, and structural elements; (c) assembling finished subsystems; (d) self-replicating with high fidelity; and (e) recycling failed components to recover high-value materials.

- **Quantity:** Seed fleet: 100–10⁵ (Opus: 100 seed → 10⁵–10⁶ peak; GPT: 10³–10⁵; Gemini: 10⁵). Consensus: **100–1,000 seed foundries**, scaling to **10⁴–10⁶ through self-replication** over 15–30 years.

- **Cost:** $10¹¹–$10¹⁵ (Opus: $10⁹–$10¹⁰/unit × 100 seed = $10¹¹–$10¹²; GPT: $10¹³–$10¹⁵ total; Gemini: $1B–$5B/unit × 10⁵ = $10¹⁴–$10¹⁵). **Confidence: Low.** This is the highest-uncertainty cost item because it depends entirely on whether semiconductor fabrication can be closed in space.

- **Key Technical Challenges (consensus across all models):**
  - Semiconductor fabrication in space — nanometer-scale lithography in zero-g, vibration isolation, ultra-high-purity material processing (all three models identify this as the single hardest challenge in Phase 3)
  - Mass closure ratio — achieving 96%+ from in-situ resources; the remaining fraction (specialty chemicals, photoresists, rare dopants) must be sourced or synthesized (Opus, GPT)
  - Replication fidelity over many generations — error accumulation, "genetic" verification and correction mechanisms (Opus)
  - Quality control at scale — fully automated inspection with statistical sampling (Opus)
  - Thermal rejection at factory scale limiting throughput (GPT)
  - Long-term AI stability and autonomy verification over centuries of operation (Gemini)

---

### 5. Distributed Computational Operating System (slug: `distributed-computational-os`)
- **Category:** Computing
- **bomId:** bom-3-5
- **Description:** The software substrate that transforms trillions of individual hardware nodes into a coherent computational entity. Opus and GPT both identify this as a critical-path item (Gemini addresses it implicitly through the Core Router Megastructures proposal). Opus provides the most detailed specification: a hierarchical, self-organizing computational fabric managing resource allocation, task scheduling, data routing, fault tolerance, and emergent computation, implementing spatial decomposition of problems across layers based on thermal-computational profiles. GPT frames it through the time/frequency authority and "planetary internet" security architecture. The consensus is a distributed operating system that must: (a) manage heterogeneous compute resources across all layers; (b) implement novel consistency models tolerating multi-hour propagation delays (beyond CAP theorem constraints); (c) spatially decompose workloads by thermal-computational profile (latency-critical on hot inner layers, bulk processing on mid layers, quantum-accelerated optimization on cold outer layers); (d) handle graceful degradation of up to 5% of nodes per year; (e) support safe self-modification and evolution over centuries; and (f) prevent unintended emergent behaviors while enabling useful ones.

- **Quantity:** 1 system (distributed across all nodes). Development effort: ~10⁶ engineer-years equivalent (Opus estimate), likely requiring AI-assisted code generation and formal verification.

- **Cost:** $10¹¹–$10¹² in development equivalent (Opus). **Confidence: Very Low.** No precedent exists for software systems at this scale. Opus explicitly flags this as potentially the true bottleneck of the entire program.

- **Key Technical Challenges:**
  - Consistency across light-hours — CAP theorem implications; must implement causal consistency with eventual convergence; the "brain" cannot have a single coherent present moment (Opus)
  - Emergent computation management — enabling useful emergent behaviors while preventing unintended ones (Opus)
  - Safe self-modification over centuries-long operational lifetime (Opus)
  - Formal verification of ~10¹² lines of code — only hierarchical/compositional verification is feasible (Opus)
  - Secure update/authentication at planetary-internet scale — key management, anti-spoof, partition tolerance (GPT)
  - Clock synchronization and distributed time authority (GPT, Opus)

---

### 6. Feedstock Supply Chain and Logistics Pipeline (slug: `feedstock-supply-chain-pipeline`)
- **Category:** Infrastructure
- **bomId:** bom-3-6
- **Description:** The continuous-flow material supply chain connecting asteroid belt (and eventually Kuiper Belt) mining operations to manufacturing foundries at each shell radius. Opus provides the most detailed specification: autonomous mining ships, electromagnetic mass drivers on large asteroids, and catcher tugs at each layer, sustaining ~10⁹ tonnes/year throughput. GPT addresses this implicitly through the manufacturing nodes' need for feedstock. Gemini's Von Neumann Assembler Hives consume outer-system bodies directly, partially bypassing a centralized pipeline. The consensus architecture combines centralized pipeline elements (mass drivers, logistics coordination) with distributed direct-consumption capability at the foundries, recognizing that different layers will have different optimal supply strategies (inner layers fed from asteroid belt; outer layers consuming local KBOs and Trojans directly).

- **Quantity:** ~10,000 mining ships, ~500 mass drivers, ~50,000 catcher/logistics tugs (Opus baseline). Total infrastructure mass: ~2 × 10⁸ tonnes.

- **Cost:** $10¹³–$10¹⁴ equivalent in manufacturing capacity (Opus). **Confidence: Medium.** This is a scaled-up version of Phase 1–2 infrastructure with well-understood physics.

- **Key Technical Challenges:**
  - Mass driver anchoring on rubble-pile asteroids (Opus)
  - Trajectory management for ~10⁵ cargo slugs in transit simultaneously (Opus)
  - Catcher tug deceleration — magnetic braking at TRL 1 (Opus)
  - Resource depletion planning over millennia (Opus)
  - Autonomous transmutation of light elements (ice/volatiles) into structural materials for outer-layer construction (Gemini — highly speculative)

---

## Divergent Proposals

The following items were proposed by only one or two models, or reflect significant architectural disagreements.

---

### A. Core Router Megastructures
- **Proposed by:** Gemini (only)
- **Description:** 6–12 planetary-mass supercomputers at Sun-Jupiter Lagrange points serving as the "Central Nervous System" — aggregating data, managing workload distribution, and hosting highest-level consciousness/simulation threads requiring low-latency coherence.
- **Cost:** $100T per unit (Gemini estimate)
- **Rationale:** Gemini argues that a distributed-only architecture cannot support the highest-level coherent computational tasks and that centralized aggregation points are necessary.
- **Counterarguments:** Opus explicitly designs for a fully distributed architecture with no central nodes, arguing that AU-scale distances make centralization physically counterproductive (light-speed delays dominate). GPT's architecture is also fully distributed with hierarchical routing. The consensus view (Opus + GPT) is that centralized "brain cores" contradict the fundamental physics of the Matroska Brain — any node at a Lagrange point is still light-minutes from most of the computational substrate, and a planetary-mass computer creates catastrophic thermal management and single-point-of-failure problems.
- **Recommendation:** **Do not include in consensus BOM.** The distributed OS (bom-3-5) subsumes this function. If centralized aggregation is needed for specific workloads, it can be implemented as a software layer on existing distributed hardware rather than as dedicated planetary-mass structures.

---

### B. Stellar Lifting Injectors
- **Proposed by:** Gemini (only)
- **Description:** 50,000 electromagnetic ring stations orbiting near the solar photosphere, using magnetic fields to extract plasma from the Sun's surface for fuel and construction materials.
- **Cost:** $500M per unit; ~$2.5 × 10¹³ total (Gemini estimate)
- **Rationale:** Gemini argues this extends the Sun's lifespan and provides the immense mass required for outer shells, noting that asteroid belt mass alone may be insufficient for full build-out.
- **Counterarguments:** Neither Opus nor GPT include stellar lifting. Opus's feedstock pipeline is sized for asteroid belt consumption at 0.001%/year, sustainable for ~100,000 years, with Kuiper Belt as backup. GPT focuses on ISRU from asteroids and recycling. Stellar lifting is at TRL 0–1, requires materials surviving the solar corona (~10⁶ K), and risks inducing solar instability — an existential threat to the entire Matroska Brain.
- **Recommendation:** **Include as a long-term research item, not in the initial BOM.** Stellar lifting may become necessary if the Matroska Brain scales to consume a significant fraction of asteroid belt mass, but it should not be on the critical path for initial deployment. Flag for Phase 4+ consideration.

---

### C. Cryogenic Compute Platforms (as distinct from Compute Tiles)
- **Proposed by:** Opus (dedicated item); Gemini (partially, via Cryogenic Cooling Spines); GPT (implicitly, via outer-layer power conversion nodes)
- **Description:** Opus proposes specialized 10,000 kg computing stations for Layers 3–4 (40–80 K and 10–20 K) incorporating passive radiative cooling, multi-stage thermal isolation, and hybrid classical-quantum processing cores with topological qubits.
- **Disagreement:** Opus treats these as a fundamentally different hardware class from the compute tiles, with quantum processing capability. GPT does not distinguish cold-layer compute hardware as a separate BOM item, instead treating all layers as variations of the same tile architecture with different power conversion nodes. Gemini proposes cryogenic cooling infrastructure but not dedicated quantum compute platforms.
- **Recommendation:** **Include as a sub-variant within the Computational Substrate Tiles (bom-3-1) rather than a separate BOM item**, but flag quantum processing integration as a major open question. The thermal management aspects are covered by bom-3-3 (active cryogenic systems for cold layers). The compute architecture for cold layers should be designed to accommodate quantum processors if and when they mature, but the BOM should not depend on quantum computing being viable.

---

### D. Inter-Layer Power Backbone (HVDC + Optical Power Links)
- **Proposed by:** GPT (dedicated item); Opus (partially, via power delivery discussion in Cryogenic Compute Platforms); Gemini (not addressed as separate item)
- **Description:** GPT proposes a two-mode power distribution architecture: short-range HVDC within layers and optical/microwave power beaming between layers and to manufacturing nodes.
- **Disagreement:** Opus assumes power is harvested locally at each layer from the inner layer's waste heat radiation (via TPV on compute tiles), with no dedicated inter-layer power transfer infrastructure. GPT argues that dedicated power routing is necessary to decouple layer geometry from power availability and to feed manufacturing nodes and cold-layer platforms that cannot self-power. Gemini does not address inter-layer power transfer explicitly.
- **Recommendation:** **Include as a separate BOM item.** GPT's argument is compelling — outer layers (especially Layer 4 at 25 AU where solar flux is ~2.2 W/m²) and manufacturing foundries need power delivery beyond what local TPV can provide. Opus acknowledges this problem in the Cryogenic Compute Platforms description but does not propose a solution. Optical power beaming between layers is the most viable approach and should be explicitly planned.

---

### E. Gravitational Stability Management System
- **Proposed by:** Opus (only)
- **Description:** Distributed network of 10⁶ gravimeters and laser ranging stations with predictive orbital mechanics models and coordinated station-keeping thrust allocation across all swarm elements.
- **Rationale:** Opus argues that total Matroska Brain mass (10²⁴–10²⁵ kg, approaching 0.1–1% solar mass) creates non-negligible self-gravity effects, secular resonance risks, and perturbation of planetary orbits.
- **Counterarguments:** GPT and Gemini do not address gravitational stability as a separate system, likely assuming it is handled by existing station-keeping capabilities inherited from Phase 2.
- **Recommendation:** **Include in consensus BOM but at reduced scope.** Opus's concern is physically valid — a structure of this mass at these radii will interact gravitationally with the solar system. However, the monitoring hardware is modest (10⁶ × 100 kg stations = 10⁸ kg, trivial compared to other items), and the computational/coordination aspects are subsumed by the Distributed OS (bom-3-5). Include as a function of the OS rather than a separate hardware system, with the monitoring stations as a sub-item.

---

### F. Autonomous Construction and Service Swarm (Robotics)
- **Proposed by:** GPT (dedicated item); Opus and Gemini (implicitly, via manufacturing foundries)
- **Description:** GPT proposes 10⁶–10⁸ robots (heavy handlers and light servicers) for continuous construction, patching, module replacement, and tear prevention — distinct from the manufacturing foundries that produce components.
- **Disagreement:** Opus and Gemini bundle assembly and maintenance into the manufacturing foundry concept. GPT separates "making things" from "putting things together and keeping them working."
- **Recommendation:** **Include as a separate BOM item.** GPT's distinction is operationally important. Manufacturing foundries produce components; a separate robotic fleet is needed for assembly, deployment, inspection, repair, and recycling at the shell level. The Phase 2 swarm likely already has maintenance robotics that can be evolved for Phase 3.

---

## Recommended Phase 3 BOM

The following 8 items constitute the recommended consensus BOM for Phase 3 — Matroska Brain:

| # | bomId | Name | Slug | Category | Quantity Estimate | Cost Estimate | Description |
|---|-------|------|------|----------|-------------------|---------------|-------------|
| 1 | bom-3-1 | Computational Substrate Tiles | `computational-substrate-tiles` | Computing | 10¹²–10¹³ tiles (~10¹⁷ m² total compute area) | $10¹²–$10¹⁴ (Low confidence) | Modular tiles integrating TPV energy harvesting, compute substrate (reversible logic / neuromorphic / ASIC), local memory, and mesh networking. Sunward face absorbs inner-layer waste heat; anti-sunward face radiates to next layer. Variants for each temperature regime: high-T (800–1200 K, SiC/GaN/diamond logic), mid-T (200–400 K, advanced silicon), cold (40–80 K, superconducting/quantum-ready). The fundamental building block of all computational layers. |
| 2 | bom-3-2 | Inter-Layer Optical Communication Backbone | `inter-layer-optical-backbone` | Communications | 10⁸–10⁹ relay nodes + embedded transceivers in all tiles | $10¹¹–$10¹³ (Medium confidence) | Hierarchical free-space optical network with WDM/OAM multiplexed laser links, adaptive optics, onboard routing, and integrated time/frequency authority constellation. Provides intra-layer mesh and inter-layer spine connectivity. Must support ~10²⁴ bps aggregate throughput with hierarchical traffic absorption. |
| 3 | bom-3-3 | Thermal Management and Radiator Systems | `thermal-management-radiator-systems` | Power Systems | ~10¹⁴ m² passive radiator area + ~10⁷ active cryogenic units | $10¹²–$10¹⁵ (Low confidence) | Dual-regime thermal management: (a) passive spectral-selective radiator panels with metamaterial/photonic-crystal coatings for narrow-band emission matched to next layer's TPV bandgap (inner/mid layers); (b) active cryogenic cooling systems with superfluid loops for outermost cold layers (<10 K). Manages the thermodynamic cascade that defines the Matroska Brain's computational efficiency. |
| 4 | bom-3-4 | Self-Replicating Manufacturing Foundries | `self-replicating-manufacturing-foundries` | Infrastructure | 100–1,000 seed foundries → 10⁴–10⁶ at peak via self-replication | $10¹³–$10¹⁵ (Low confidence) | Autonomous factory complexes processing asteroid/KBO feedstock into finished components: compute tiles, TPV cells, radiator panels, optical relays, structural elements. Target 12-month replication cycle, ≥96% mass closure from in-situ resources. Includes recycling loops for failed components and high-value material recovery. The critical-path industrial capability for Phase 3. |
| 5 | bom-3-5 | Distributed Computational Operating System | `distributed-computational-os` | Computing | 1 system (distributed across all nodes); ~10⁶ engineer-years development | $10¹¹–$10¹² (Very Low confidence) | Hierarchical, self-organizing software fabric managing resource allocation, task scheduling, data routing, fault tolerance, gravitational stability coordination, and emergent computation across all layers. Implements causal consistency with eventual convergence across light-hours of delay. Spatially decomposes workloads by thermal-computational profile. Includes gravitational monitoring integration (10⁶ sensor stations) and secure update/authentication at planetary scale. Must support safe self-modification over centuries. |
| 6 | bom-3-6 | Feedstock Supply Chain and Logistics Pipeline | `feedstock-supply-chain-pipeline` | Infrastructure | ~10,000 mining ships, ~500 mass drivers, ~50,000 logistics tugs | $10¹³–$10¹⁴ (Medium confidence) | Continuous-flow material supply from asteroid belt (and eventually Kuiper Belt) to foundries at each shell radius. Mining ships fragment and concentrate feedstock; mass drivers launch standardized cargo slugs; catcher tugs decelerate and deliver to foundries. Sustains ~10⁹ tonnes/year throughput at peak. Outer-layer foundries supplement with direct local body consumption. |
| 7 | bom-3-7 | Inter-Layer Power Distribution Network | `inter-layer-power-distribution-network` | Power Systems | 10⁸–10¹¹ power interface units + 10⁷–10⁹ backbone relays | $10¹²–$10¹⁴ (Medium confidence) | Two-mode power architecture: short-range HVDC (segmented, with fault isolation) within layers; long-range optical power beaming between layers and to manufacturing nodes/cold-layer platforms that cannot self-power from local TPV. Includes mispoint protection, automatic beam abort, and standardized power interface contracts between layers. Essential for outer-layer viability where solar flux is insufficient. |
| 8 | bom-3-8 | Shell Construction and Maintenance Swarm | `shell-construction-maintenance-swarm` | Robotics | 10⁶–10⁸ robots (heavy assemblers + light servicers) | $10¹¹–$10¹³ (Medium confidence) | Evolved Phase 2 assembly/maintenance robotics specialized for Phase 3: heavy tow/positioning units for membrane and tile deployment, membrane-handling specialists for radiator installation, and high-tempo ORU swap drones for continuous repair and module replacement. Manages contamination control near optical/IR surfaces. Autonomous with provably bounded behaviors. Distinct from manufacturing foundries — these deploy and maintain what foundries produce. |

---

## Open Questions

The following engineering questions must be resolved before or during early Phase 3 deployment. They are ordered roughly by criticality to the overall architecture.

### Architecture-Defining Questions

1. **Can reversible/adiabatic computing be made practical at scale?** (Flagged by Opus as critical-path.) The entire thermodynamic cascade architecture assumes compute substrates operating within ~100× of Landauer's limit. If reversible logic remains impractical, the Matroska Brain degenerates into a conventional (if enormous) data center with catastrophic cooling requirements, and the nested-shell concept loses its fundamental justification. Current TRL: 2–3. This is a go/no-go question for the Matroska Brain concept itself.

2. **Can semiconductor fabrication be closed in space?** (Flagged by all three models as the hardest manufacturing challenge.) Nanometer-scale lithography requires vibration isolation to sub-nanometer levels, ultra-high-purity materials (99.9999%), and complex chemical processing — all in zero-g autonomous facilities. If full fabs are unrealistic, GPT proposes a fallback: imported die + in-space packaging, with factories focusing on membranes, radiators, and structures. This fallback must be evaluated as a Phase 3 baseline vs. aspirational full closure.

3. **What are the optimal shell radii and temperatures?** Opus proposes 5 layers at 0.5, 1.0, 2.5, 8, and 25 AU (5800 K, 800–1200 K, 200–400 K, 40–80 K, 10–20 K). GPT proposes layers at 0.3–0.7 AU and outward without specifying exact radii. Gemini proposes layers at 1.5 AU and 3.0 AU. The optimal temperature ladder depends on TPV efficiency curves, compute substrate operating ranges, and cascade thermodynamic efficiency — none of which are well-characterized at these scales. Shell radii must also avoid secular orbital resonances (Opus).

4. **Is quantum computing integration viable or premature?** Opus proposes topological qubits at 10–20 K in Layer 4; Gemini does not address quantum; GPT does not specify. No large-scale topological quantum computer exists. Superconducting transmon qubits require 10–20 mK (active dilution refrigeration), contradicting passive cooling. Should the cold-layer architecture be designed quantum-ready but not quantum-dependent?

### Engineering Questions

5. **What is the achievable TPV efficiency at each layer's source temperature?** Current TPV achieves 30–40% for ~1200°C sources but degrades rapidly for lower temperatures. Layer 2 tiles receiving 200–400 K radiation face thermodynamic limits of 5–15%. Near-perfect photon recycling and sub-bandgap reflection are required. This directly determines the computational throughput of each successive layer.

6. **How is power delivered to outer layers?** At 25 AU, solar flux is ~2.2 W/m². GPT proposes optical power beaming; Opus identifies the problem but does not fully resolve it. What is the efficiency of optical power transfer over 15+ AU? What beam safety and governance architecture prevents weaponization of multi-gigawatt power beams?

7. **What consistency model works across light-hours?** The Matroska Brain spans ~3.5 light-hours (Opus). Classical distributed systems theory (CAP theorem) proves you cannot have consistency, availability, and partition tolerance simultaneously. What novel consistency paradigm allows coherent computation across this scale? Is "causal consistency with eventual convergence" sufficient for the intended workloads?

8. **How is replication fidelity maintained over many foundry generations?** Self-replicating systems accumulate errors. After 10–20 replication cycles, foundries may drift from specification. What "genetic" verification and correction mechanism prevents degradation? How often must master templates be re-seeded?

9. **What is the total mass budget and its gravitational impact?** If the Matroska Brain reaches 10²⁴–10²⁵ kg (0.05–1% solar mass, per Opus), it measurably alters planetary orbits. Is this acceptable? What is the actual mass required for the recommended BOM, and does it stay within gravitationally safe limits?

10. **What is the construction timeline and sequencing?** All three models imply different timescales. Opus suggests 500–2,000 years of Phase 2 manufacturing capacity or 5–20 years with exponential scaling. The recommended build sequence (per Opus): begin OS development and reversible computing R&D during late Phase 2 → demonstrate TPV compute tiles on Phase 2 elements → validate, then scale foundry production. But the full build-out timeline for all 4+ layers remains undefined and depends on answers to questions 1–3 above.