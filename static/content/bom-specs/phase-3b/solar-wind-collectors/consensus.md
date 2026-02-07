---
bomId: "bom-3b-3"
itemName: "Solar Wind Collectors"
itemSlug: "solar-wind-collectors"
type: "consensus"
generated: "2026-02-07"
phase: "phase-3b"
---

# Solar Wind Collectors (BOM-3b-3) — Consensus Synthesis Document

## Key Specifications

- **Solar wind baseline mass loss rate:** ~1.3–1.5 × 10⁹ kg/s total, comprising ~95% hydrogen and ~4% helium by mass, arriving as fully ionized plasma at 400–800 km/s. All models agree this is already ionized and the engineering problem is electromagnetic deflection, not ionization.

- **Collection architecture:** Distributed arrays of electromagnetic "magnetic funnel" or "mini-magnetosphere" units generating converging magnetic field geometries to deflect, concentrate, and guide charged solar wind particles. All models reject physical/solid collectors due to sputtering, thermal degradation, and inability to perform species-selective capture.

- **Primary collection orbit:** 0.1–0.15 AU, where solar wind mass flux is 100–450× greater than at 1 AU, with solar irradiance of ~60,000–136,000 W/m². All models agree this inner heliospheric zone is the optimal trade between flux density and thermal survivability.

- **Magnetic field requirement for deflection:** Extremely modest — on the order of 1–10 μT at the outer deflection boundary, since solar wind dynamic pressure at 0.1–0.15 AU is only ~10⁻⁷ to 10⁻⁶ Pa. All models confirm the challenge is sustaining field geometry over large volumes, not achieving high field strength.

- **Superconductor technology:** REBCO (Rare-Earth Barium Copper Oxide) high-temperature superconducting tape as the baseline conductor, with coil currents in the range of 1–10 MA per unit, requiring active cryogenic cooling in the intense near-Sun thermal environment.

- **SWC role relative to mass lifting:** Supplementary, not primary. The Caplan engine requires ~10¹² kg/s; SWCs contribute 10⁶–10⁹ kg/s (0.0001%–0.1% of total). All models agree the value lies in bootstrap fuel supply, recovered kinetic energy, isotope harvesting (especially He-3), and operational redundancy rather than bulk mass contribution.

- **Thermal management:** Liquid droplet radiators are the consensus-preferred technology at 0.1–0.15 AU due to extreme radiative heat loads. All models identify thermal management as a first-order design driver and recommend edge-on radiator orientation and/or high-reflectivity sunshields.

- **Autonomy requirement:** High local autonomy is mandatory due to fleet scale (10³–10⁴+ units), turbulent solar wind variability, and communication latency. All models specify hierarchical autonomy with millisecond-level reflexive protection at the unit level and minutes-to-hours coordination at the fleet level.

- **Manufacturing approach:** In-situ resource utilization (ISRU) leveraging Phase 2 Dyson swarm industrial infrastructure, with Mercury and asteroid-derived materials as primary feedstock. All models agree Earth-based launch is irrelevant at this scale.

## Divergent Views

- **Fleet size and per-unit mass:** Claude specifies ~19,200 funnel units at ~45,000 tonnes each (total ~9 × 10⁸ tonnes) with 100 km outer diameter; Gemini specifies 12,000 MFS units at 45,000 tonnes each (total ~5.4 × 10¹¹ kg) with 2 km physical dimensions but 150 T peak throat field; GPT specifies 10⁵–10⁷ collector cells at only 200–800 tonnes each (total 10¹⁰–10¹² kg) with 1–5 km superconducting loops and 50–500 km effective bubble radii. The fundamental disagreement is whether to build fewer large units or vastly more small, disposable ones.

- **Target collection rate:** Claude targets 5 × 10⁸ kg/s (capturing 30–50% of total solar wind); Gemini targets 1.5 × 10⁹ kg/s (capturing essentially all solar wind plus CME buffering); GPT targets 10⁶–10⁸ kg/s (conservative, emphasizing diminishing returns beyond that level). This represents an order-of-magnitude disagreement on ambition and feasibility.

- **MHD energy recovery:** Claude identifies MHD deceleration as a transformative feature, calculating ~2.75 PW recovered per unit and ~55 EW fleet-wide, making SWCs net power producers; Gemini does not include MHD energy recovery and instead lists 45 PW as a net power *consumption*; GPT does not quantify energy recovery but focuses on plasma conditioning rather than energy harvesting. This is a fundamental architectural disagreement on whether SWCs are energy sources or energy sinks.

- **Plasma transport to processing hubs:** Claude proposes magnetically confined plasma pipelines spanning 0.05–0.15 AU (millions of km) with periodic booster stations; Gemini proposes magnetic confinement "pipelines" defined by field lines without physical walls but does not detail long-distance stability; GPT flags transfer line stability over 10⁶–10⁸ km as an explicit open question and implies more localized processing may be necessary. The feasibility of long-distance plasma transport is unresolved.

- **Space weather / CME dual-use role:** Gemini explicitly positions SWCs as a dual-purpose system for both mass collection and CME protection of inner Dyson swarm and Matrioshka Brain infrastructure; Claude treats CME events primarily as operational hazards to exploit (enhanced He-3) or survive; GPT treats CMEs as a survival/design challenge with safe-mode protocols. The question of whether SWCs should be architected as a defensive shield is unresolved.

- **In-flight pre-separation:** Gemini raises in-flight ion cyclotron resonance separation within the magnetic funnel as a potential efficiency gain; Claude includes coarse gyroradius-based pre-separation at the collection stage achieving ~60% H purity; GPT defers separation entirely to the processing hub. The optimal point for initial species separation is disputed.

## Open Questions

1. **Plasma capture coefficient and funnel compression stability:** What fraction of plasma entering a magnetic bubble can be reliably guided into a collection duct under real turbulent solar wind conditions? All models identify plasma instabilities (mirror, firehose, Kelvin-Helmholtz, interchange) as the highest-probability technical risk, and none can provide validated capture efficiency numbers. This single parameter determines whether SWCs are a minor sensor network or a major mass source.

2. **Long-distance magnetically confined plasma transport:** Can plasma pipelines maintain confinement and throughput over 10⁶–10⁷ km distances? No precedent exists beyond meter-scale laboratory confinement. Cumulative instabilities, micro-meteoroid punctures, field line wandering, and interaction with the interplanetary magnetic field are all uncharacterized at this scale. If infeasible, the fallback (magnetic bottle tanker ships or highly distributed local processing) fundamentally changes system architecture and cost.

3. **Superconductor survivability and operating point at 0.1–0.15 AU:** What is the optimal HTS operating temperature given the extreme radiative and particle environment? Higher temperature reduces cryogenic load but degrades current density and quench margin. Radiation damage rates, micrometeoroid impact frequency, and thermal cycling fatigue at these orbits are poorly constrained and determine maintenance cadence and cell lifetime.

4. **Interaction with solar magnetic environment and mass lifting systems:** How do thousands of artificial magnetospheres at 0.1–0.15 AU interact with the Sun's interplanetary magnetic field (~100 nT at these distances), with each other (overlapping bubble interference), and with the mass lifting systems' own magnetic fields? Gemini raises the additional concern that a permanent magnetic ring could perturb the solar dynamo cycle itself. Coordinated MHD modeling at system scale is required.

5. **He-3 economic value versus alternative sources:** Does solar wind He-3 harvesting (at ~4 × 10⁻⁴ He-3/He-4 ratio, enhanced during CMEs) materially impact fusion fuel supply compared to gas giant atmospheric mining, lunar regolith extraction, or direct chromospheric lifting? This determines whether isotope harvesting justifies SWC complexity beyond the bootstrap and redundancy roles.

6. **MHD energy recovery feasibility at PW scale:** Can MHD deceleration channels achieve the ~85% energy recovery efficiency projected by Claude at power densities of petawatts per unit, or do resistive losses, electrode erosion, and thermal management at these unprecedented scales reduce efficiency to levels where SWCs remain net energy consumers? This determines whether the SWC system is a major power source or a significant parasitic load on the Dyson swarm.

## Recommended Approach

1. **Adopt the electromagnetic mini-magnetosphere scoop architecture as baseline.** All models converge on this approach. Design collector cells as superconducting-loop magnetic bubble generators with MHD plasma ducts, rejecting physical collector surfaces. Use REBCO HTS as the baseline conductor with active cryogenic cooling.

2. **Design for modularity and disposability at the cell level, with robust and upgradable processing hubs.** Resolve the fleet-sizing disagreement by adopting GPT's philosophy of many smaller, cheaper, hot-swappable cells (targeting 1,000–10,000 tonnes per unit) while incorporating Claude's detailed magnetic funnel staging geometry (outer deflection → mid concentration → inner throat). This hedges against uncertain capture efficiency by allowing rapid scaling of unit count.

3. **Establish the primary collection ring at 0.15 AU with a secondary ring at 0.1 AU.** Use 0.15 AU as the initial operational orbit (thermally proven regime, per Claude's Parker Solar Probe reference) and deploy a 0.1 AU ring only after thermal management and superconductor survivability are validated. Reserve 0.2–0.3 AU positions for reduced-risk backup capacity.

4. **Prioritize plasma transport technology as the critical-path development item.** All models identify this as the lowest-TRL, highest-uncertainty subsystem. Fund a dedicated 1,000 km plasma pipeline prototype at 0.3–0.5 AU within the first 15 years of the development program. In parallel, develop magnetic bottle tanker ship designs as the fallback architecture, and evaluate distributed local processing hubs to minimize required transport distances.

5. **Invest early in MHD energy recovery validation.** Claude's analysis suggests SWCs could be net power producers at 55 EW fleet-wide, which would fundamentally change the system's value proposition and the Phase 3b energy budget. Build a prototype MHD deceleration channel and test it against actual solar wind plasma at 0.5 AU within the first 10 years. If validated even at 50% efficiency, redesign the SWC power architecture around self-powering operation.

6. **Deploy a 10–100 unit pathfinder constellation during late Phase 2.** All models agree that early operational data is essential to retire plasma physics risks. Use existing Dyson swarm satellites as anchor infrastructure. This pathfinder simultaneously validates capture efficiency, thermal management, autonomous operations, and inter-unit magnetic interference — the four highest-risk unknowns.

7. **Architect the SWC network for dual-use: mass collection and inner-system space weather protection.** Adopt Gemini's recommendation to leverage the magnetic lattice as a CME shield for Phase 2 and Phase 3a infrastructure. This adds significant strategic value beyond mass collection and provides a compelling justification for SWC investment even if capture rates prove lower than projected. Design the constellation topology so that CME deflection mode and collection mode are complementary rather than competing operational states.