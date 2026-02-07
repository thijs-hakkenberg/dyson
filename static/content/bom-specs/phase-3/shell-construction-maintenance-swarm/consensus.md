---
bomId: "bom-3-8"
itemName: "Shell Construction and Maintenance Swarm"
itemSlug: "shell-construction-maintenance-swarm"
type: "consensus"
generated: "2026-02-07"
phase: "phase-3"
---



# Shell Construction and Maintenance Swarm (bom-3-8) — Consensus Synthesis

**Project Dyson — Phase 3: Matroska Brain**
**Document ID:** PD-PH3-BOM-3-8-CONSENSUS
**Date:** 2245-11-01

---

## Key Specifications

Where all contributing models converge, the following specifications represent high-confidence consensus:

- **Heterogeneous fleet architecture with three primary functional tiers:** Heavy assembly tugs (10⁴–10⁵ units, 8.5–80 metric tons each), medium-class construction/tile-placement robots (10⁶–10⁷ units, 200–800 kg each), and small/micro inspection-repair-logistics drones (10⁷–10⁸ units, 0.2–120 kg each). All models agree on this tripartite functional decomposition.

- **Total active fleet size at maturity: ~10⁷–10⁸ units**, with the vast majority being low-mass servicers and logistics drones. The fleet must scale with shell area and is produced by the same Manufacturing Foundries (bom-3-4) that produce shell hardware.

- **Orbital Replacement Unit (ORU) design philosophy:** Every shell element—compute tiles, radiator panels, optical relay nodes, power distribution units—must feature standardized robotic-friendly interfaces including blind-mate power/data connectors, grapple fixtures, and alignment fiducials. All models treat this as a foundational architectural requirement.

- **Propulsion and contamination control:** Inner-layer operations near optical and IR-sensitive surfaces require clean propellants (cold gas, noble gases, water/steam) or propellantless locomotion (electro-adhesive crawling, reaction wheels). Thruster plume keep-out zones are mandatory near spectral-selective radiator coatings and optical backbone elements. Electric propulsion (Hall/MPD thrusters, Isp 2,000–6,000 s) is the primary mode for transit and heavy maneuvering.

- **Autonomy model: Level 5 / fully autonomous local operations** with hierarchical oversight. Real-time collision avoidance and task execution are handled locally (cell/sector level); the Distributed OS (bom-3-5) provides policy envelopes, global resource allocation, and safety governance. Multi-AU light-time delays make centralized teleoperation infeasible.

- **Stigmergic / decentralized coordination:** All models agree that direct command-and-control of 10⁷–10⁸ agents is impractical. Coordination uses indirect signaling (digital pheromone tags, state-desired broadcasts, local mesh negotiation) rather than centralized dispatch.

- **Thermal variant strategy:** Robots operating across the Matroska Brain's thermodynamic cascade (roughly 1200 K at ~0.5 AU down to ~20 K at ~25 AU) require distinct material and thermal management variants. Standardized chassis geometry with swappable thermal subsystems (refractory alloys + active cooling for hot layers; superconducting buses + nuclear/RTG heating for cryogenic layers).

- **Power sourcing:** Primary power via the Inter-Layer Power Distribution Network (bom-3-7)—rectenna or laser-PV receivers for beamed power during high-intensity operations; rechargeable solid-state batteries and supercapacitors for buffering and autonomous transit. All models agree robots are not self-powered for sustained operations.

- **Design life and recycling:** Individual robot design life of ~15 years, with ≥95% material reclamation upon retirement at foundries. The fleet is continuously replenished as a steady-state industrial process.

- **Total program cost: ~$10¹²–$10¹³ equivalent** (manufacturing-equivalent value in 2245-adjusted credits), dominated by the medium-class construction bots and heavy tugs. All models agree the practical limiting resource is foundry throughput and available power, not monetary cost.

---

## Divergent Views

- **Fleet class granularity and naming taxonomy:** Gemini proposes three classes (Atlas/Weaver/Hermes) with clean functional separation—heavy tug, surface crawler, and fast logistics drone. GPT proposes five classes (HAT, MCB, SSD, PSM, CAP) adding dedicated sub-kilogram patch microbots and autonomous cargo pods as distinct fleet elements. The core disagreement is whether patch/seal microbots and cargo pods warrant their own class designation or are subsumed into the logistics/repair tier.

- **Locomotion mode for surface work:** Gemini specifies the Weaver class as a **6-legged electro-adhesive crawler** (350 kg, Van der Waals grippers) that traverses membranes without propellant, treating propellantless surface locomotion as a primary design feature. GPT's equivalent M-class bot (200–800 kg) is primarily a **free-flying unit with microthrusters** that docks to standardized service rails, with gecko-adhesive crawling reserved only for the smallest PSM microbots on designated crawlways. This reflects a fundamental disagreement on whether the dominant construction mode is "walking on the structure" versus "flying to the structure and docking."

- **Heavy tug mass and fleet size:** Gemini specifies Atlas tugs at **8,500 kg dry mass** with a fleet of **2×10⁶ units**. GPT specifies HATs at **20,000–80,000 kg** with a fleet of only **10⁴–10⁵ units**. This is roughly a 10× difference in unit mass and a 10–100× difference in fleet count, reflecting divergent strategies: Gemini favors many lighter tugs while GPT favors fewer, much heavier platforms with greater individual capability (deployable booms to 150 m, multi-MW power draws).

- **Membrane tear arrest strategy:** Gemini does not specify a dedicated tear-arrest robot class, relying on Weaver spiders for patching and Atlas tugs for debris capture. GPT introduces a dedicated **P-class Patch/Seal Microbot (PSM)** fleet (10⁷–10⁸ units, 0.2–2 kg each) as an always-on patrol layer specifically for tear arrest, and further specifies that membranes themselves must include **ripstop grids and tear-stop lines** as a passive structural defense. GPT treats membrane tear cascades as a top-tier catastrophic risk requiring dedicated hardware; Gemini treats it as a maintenance task within the existing fleet.

- **Yard infrastructure as a replicable unit:** GPT explicitly defines **Yards** (staging depots with docking racks, tooling kiosks, spare depots, scrap compactors) as a first-class replicable infrastructure template—"replicate yard templates the way you replicate foundries." Gemini does not define an intermediate logistics infrastructure layer between the Foundries and the robots themselves, implying robots operate directly from Foundry outputs. This divergence affects logistics chain depth and local autonomy.

- **Kessler syndrome mitigation approach:** Gemini proposes **soft-fail design** where robots are constructed from sintered materials that fragment into "harmless powder" rather than shrapnel upon high-velocity impact, plus strict orbital lanes. GPT proposes **cell-level air-traffic control with geofenced corridors, speed limits, and deadman braking**, plus behavioral anomaly detection and quarantine—a more software-governance-centric approach. The disagreement is whether the primary defense is passive (material design) or active (traffic management).

---

## Open Questions

1. **Cryogenic mechanical reliability:** Can crawler-type robots (Weaver/MCB) operate reliably at 20 K (outer Matroska layers) for decade-plus lifetimes? Standard lubricants freeze; magnetic bearings and flux-pinning joints add mass and complexity. What is the minimum viable actuator technology for sustained cryogenic surface operations, and does this force outer-layer robots into a free-flying-only mode?

2. **Patching spectral-selective radiator surfaces:** Radiator membranes (bom-3-3) rely on precisely engineered emissivity/absorptivity profiles. Can any in-situ patch method (thermoplastic film, UV-cure resin, cold-spray metal, laser stitch welding) restore the spectral selectivity of the original surface within acceptable Δε/ε budgets, or does patching inherently create thermal performance dead zones that must be compensated by oversizing?

3. **Thruster plume contamination modeling at decade timescales:** What stand-off distances are required to prevent measurable emissivity/reflectivity drift on optical and radiator surfaces over 50–100 year operational lifetimes? Current plume models are validated for short-duration missions; the cumulative deposition from 10⁸ robots operating continuously is unprecedented.

4. **Cold welding and surface contamination during assembly:** In hard vacuum, metal-on-metal contact during tile installation and structural assembly risks inadvertent cold welding. What surface coatings or handling protocols prevent cold welding while simultaneously meeting outgassing and optical contamination requirements?

5. **Formal safety verification at swarm scale:** What formal safety properties (collision avoidance, beam exclusion compliance, quarantine enforcement) are provable for a 10⁷–10⁸ agent swarm operating under partial communications, multi-second latencies, and potential Byzantine faults? No existing formal methods framework has been validated at this agent count.

6. **Propellant logistics and reaction mass sourcing:** Heavy tugs and logistics drones consume reaction mass continuously. Can propellant be sourced in-situ from the Logistics Pipeline (bom-3-6) or volatile reservoirs at outer layers, or does the swarm require a dedicated tanker fleet? What is the steady-state propellant mass flow required, and does it represent a significant fraction of the total material throughput?

---

## Recommended Approach

1. **Adopt the five-class fleet taxonomy (HAT, MCB, SSD, PSM, CAP) as the baseline**, incorporating GPT's finer granularity. The dedicated Patch/Seal Microbot class addresses membrane tear cascades—identified by both models as a critical risk—with purpose-built hardware rather than repurposing general-purpose robots. Autonomous Cargo Pods decouple logistics from construction robot availability. However, adopt Gemini's naming convention style (evocative names: Atlas, Weaver, Hermes) for the three primary tiers to aid cross-team communication, mapping Atlas→HAT, Weaver→MCB+PSM, Hermes→SSD+CAP.

2. **Prototype both crawler and free-flyer locomotion modes for the medium construction class**, resolving the Gemini/GPT divergence empirically. Deploy electro-adhesive crawlers (Gemini's Weaver concept) on inner/temperate layers where membrane integrity permits surface traversal, and free-flying docking-rail robots (GPT's MCB concept) on outer cryogenic layers where crawler reliability is unproven. Converge on a single dominant mode after Phase 2.5 demonstration results.

3. **Standardize ORU mechanical/electrical/optical interfaces as the highest-priority early engineering deliverable.** Lock the blind-mate connector family, grapple fixture geometry, fiducial pattern, and quarter-turn captive latch specification before any production hardware is committed. This single decision has the highest leverage on long-term maintainability and enables all robot classes to service all shell element types with common tooling.

4. **Implement the Yard infrastructure concept as a replicable template**, adopting GPT's Cell/Yard/Ring hierarchy. Each Yard includes docking/charging racks, tooling kiosks, spare depots, and scrap return staging. Yards are replicated alongside Foundries using the same exponential scaling model (bom-3-4 dedicates ~15% of capacity to swarm fleet and yard infrastructure). This provides the intermediate logistics layer that bridges Foundry output to construction-face operations.

5. **Mandate dual-layer Kessler mitigation combining both passive and active strategies:** adopt Gemini's sintered/friable material construction for all robot classes (passive shrapnel prevention) AND GPT's cell-level traffic control with geofenced corridors, speed limits, and deadman braking (active collision avoidance). Neither approach alone is sufficient at 10⁸-agent density; defense-in-depth is required.

6. **Enforce hardware-level power beam safety interlocks as a non-negotiable requirement.** Adopt GPT's recommendation for authenticated beam-safe transponders with automatic beam inhibit on unrecognized objects, combined with Gemini's hard-coded kill switches in power reception hardware. Software-only governance for multi-GW beams is unacceptable; safety must be enforced by physics.

7. **Commission a Phase 2.5 demonstration campaign** (TRL 5–7) on existing Phase 2 collector infrastructure to validate: (a) MCB/Weaver tile ORU swap rates and alignment accuracy, (b) PSM membrane patching with spectral surface preservation measurements, (c) contamination control protocols around optical terminals, (d) swarm traffic management at 10³–10⁴ agent density, and (e) cryogenic actuator endurance testing. Gate Phase 3 production commitment on demonstration results.