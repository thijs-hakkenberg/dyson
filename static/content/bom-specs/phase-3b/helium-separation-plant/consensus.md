---
bomId: "bom-3b-5"
itemName: "Helium Separation Plant"
itemSlug: "helium-separation-plant"
type: "consensus"
generated: "2026-02-07"
phase: "phase-3b"
---



# Helium Separation Plant (BOM-3b-5) — Consensus Synthesis Document

## Key Specifications

- **Total throughput: ~10¹² kg/s** of solar plasma feedstock, yielding ~2.5×10¹¹ kg/s of helium product. All three models converge on this figure as the baseline Caplan engine requirement.

- **Primary separation method: Ion Cyclotron Resonance (ICR) and/or magnetohydrodynamic (MHD) plasma-phase separation** exploiting charge-to-mass ratio differences between H⁺ and He²⁺. All models reject cryogenic distillation as thermodynamically impossible at this scale and agree plasma must remain ionized throughout processing.

- **Distributed architecture:** All models independently converge on a constellation/fleet of parallel processing units rather than a monolithic facility, driven by thermal management constraints, redundancy, and graceful degradation requirements.

- **Magnetic field strengths in the range of 3–50 T** for confinement and separation, using high-temperature or advanced superconducting coil technology (REBCO/YBCO-class or equivalent future HTS).

- **Orbital location: 0.05–0.15 AU** from the Sun, co-located with or immediately downstream of the mass-lifting systems (BOM-3b-4). All models agree this is dictated by the need to receive plasma directly from chromospheric extraction.

- **Thermal management dominated by high-temperature liquid-droplet radiators** (liquid tin, gallium, or tungsten droplets at 2,500–3,500 K) with magnetic/electrostatic recapture. All three models identify heat rejection as a dominant engineering driver and converge on droplet radiators as the leading solution.

- **He-3/He-4 isotope separation via ICR frequency selectivity**, exploiting the 33% cyclotron frequency difference between He-3²⁺ (30.58 MHz at 3 T) and He-4²⁺ (22.93 MHz at 3 T). All models identify isotope separation as the hardest sub-problem and agree ICR is the most credible plasma-phase approach.

- **Helium product purity target: ≥99–99.9%** (hydrogen removal), with He-3 purity ≥99.9% if isotope enrichment is performed. All models agree on this range.

- **Power sourced from the Dyson swarm and/or recovered from incoming plasma kinetic energy** via MHD generation, with total plant-level power consumption in the petawatt range (1.5–3 PW across the full constellation).

- **Full autonomous operation required** due to light-lag, scale (thousands of units), and multi-century operational lifetime. All models specify hierarchical control with millisecond-level local plasma stability loops and higher-level coordination on longer timescales.

---

## Divergent Views

- **Number and size of processing units**: Claude recommends **50,000 stations at 2×10⁷ kg/s each** (2.5×10¹⁰ kg per station); Gemini prefers **10,000 nodes at 10⁸ kg/s each** (4.5×10¹² kg per node, 250 km long); GPT suggests **~1,000 strings at 10⁹ kg/s each** (~2×10⁹ kg per string, ~5 km scale). This represents a three-order-of-magnitude spread in unit count and a corresponding inverse spread in unit size.

- **Total constellation mass**: Claude estimates **~1.25×10¹⁵ kg** (0.2 lunar masses); Gemini estimates **~4.5×10¹⁶ kg** (~10% of Mercury); GPT estimates **~2.2×10¹² kg**. This five-order-of-magnitude disagreement is driven primarily by unit sizing, radiator mass assumptions, and magnet mass scaling.

- **Power budget and energy self-sufficiency**: Claude argues the HSP is a **net power producer** (~3.2×10²¹ W surplus from MHD recovery of incoming plasma kinetic energy, with separation consuming only ~10¹⁸ W total); Gemini specifies **15 PW consumption per node** (150 PW total) supplied externally by the Dyson swarm; GPT estimates **~3 PW total** supplied by beamed power. Claude's self-powered model fundamentally differs from the other two models' externally-powered architectures.

- **He-3 enrichment priority**: Claude treats He-3 separation as a **core mission requirement** with a dedicated 4-stage ICR cascade integral to every station; Gemini raises He-3 enrichment as an **open question** and optional secondary stage; GPT treats it as an **optional power-hungry add-on** whose necessity depends entirely on the chosen fusion cycle, recommending it be deferred until the jet engine fuel requirements are locked.

- **Bulk H/He separation mechanism**: Claude initially analyzes calutron-style E×B filters, rejects them for throughput reasons, and converges on **plasma centrifugal separation** (E×B-driven rotating plasma columns, 350 km/s peripheral velocity); Gemini proposes **ICR selective heating** of helium to expand its gyro-orbit for skimming; GPT recommends a **hybrid MHD flow shaping + ICR mass filtering** approach. The underlying physics differs meaningfully across all three proposals.

- **Hydrogen return pathway**: Claude routes hydrogen directly to the **electromagnetic accelerator (BOM-3b-6)** via magnetic flux tube handoff as an integral part of the HSP output architecture; Gemini identifies hydrogen re-injection as an **unresolved open question** with turbulence concerns; GPT treats the hydrogen return accelerator as a **separate subsystem within the HSP** that also serves as a flow-control valve for plant pressure balance.

---

## Open Questions

1. **Plasma separation physics at unprecedented scale**: No plasma centrifuge, ICR mass filter, or MHD separator has been demonstrated beyond laboratory scale (~1 kg/s at most). Scaling to 10⁷–10⁹ kg/s per unit introduces unknown MHD instabilities (Rayleigh-Taylor, Kelvin-Helmholtz, anomalous diffusion, turbulent mixing) that could fundamentally limit separation efficiency. All three models flag this as the highest-risk technical uncertainty.

2. **Fusion cycle selection for the thermonuclear jet (BOM-3b-7)**: The required He-3 enrichment level — and therefore the entire Stage 3 isotope separation subsystem — depends on whether the jet uses D-T, D-He3, He3-He3, or p-B11 fusion. This upstream decision has not been made and propagates massive uncertainty into HSP design, power budget, and mass. All models identify this dependency.

3. **Plasma-facing component and electrode survivability**: Continuous exposure to 10,000–30,000 K plasma at extreme flux densities will erode any material surface. The "skimmer divertor" (Gemini), extractor grids (GPT), and centrifuge walls (Claude) all face this problem. Erosion rates, redeposition physics, and maintenance/replacement cadence in the near-solar environment remain uncharacterized at relevant conditions.

4. **Thermal management at scale near the Sun**: Rejecting petawatts of waste heat at 0.05–0.15 AU (where ambient solar flux is 195–780× Earth's) using droplet radiators introduces contamination risks to the plasma processing environment, droplet loss rates, and radiator-to-radiator thermal coupling across the constellation. The interaction between thousands of radiator plumes and the separation plasma streams is unexplored.

5. **Startup bootstrapping and mass-lifter interface**: The HSP requires established magnetic fields and power before plasma can flow, but MHD self-power (Claude's model) requires plasma to generate electricity. The magnetic topology matching between mass-lifter flux tubes and HSP intake — including impedance matching, failure isolation, and variable-flow accommodation — is a critical unresolved interface design problem identified by all models.

6. **Magneto-acoustic and structural resonance**: A multi-kilometer structure carrying multi-tesla magnetic fields and processing 10⁷–10⁹ kg/s of plasma will experience enormous Lorentz forces, thermal gradients, and vibration modes. Gemini specifically flags that such structures will "sing" and may vibrate apart; Claude and GPT implicitly acknowledge this through structural mass allocations but do not analyze it in detail.

---

## Recommended Approach

1. **Adopt a modular distributed architecture with unit sizing determined by prototype results.** Begin design work targeting an intermediate scale (~10⁵–10⁶ kg/s per unit) and allow the final unit count (1,000–50,000) to be set after subscale prototype campaigns validate thermal management, separation efficiency, and manufacturing economics. Do not commit to a specific constellation size until plasma centrifuge/ICR stability limits are empirically characterized.

2. **Use plasma centrifugal separation (E×B-driven rotation) as the primary bulk H/He separation mechanism, with ICR selective heating as the secondary/complementary approach.** Claude's analysis convincingly demonstrates that individual-particle calutron methods cannot handle the throughput, and the plasma centrifuge exploits the large H/He mass difference effectively. However, Gemini's and GPT's ICR-based approaches may prove more stable at scale. Fund parallel prototype development of both methods and down-select after Phase P1 testing.

3. **Implement He-3 isotope separation as a modular, optional stage using ICR frequency-selective heating in a multi-stage cascade.** All models agree ICR is the most credible plasma-phase isotope separation method for He-3/He-4. Design the HSP architecture so that He-3 enrichment modules can be added, removed, or upgraded independently of the bulk H/He separation stages. Defer final enrichment targets until the thermonuclear jet fusion cycle (BOM-3b-7) is selected, but design the interface to accommodate up to 4-stage ICR cascades producing ≥99.9% He-3 purity.

4. **Prioritize MHD kinetic energy recovery at the intake stage to maximize energy self-sufficiency.** Claude's analysis shows that incoming plasma at ~100 km/s carries ~10¹⁷ W per station in kinetic energy, vastly exceeding separation power requirements. Even if the net surplus is smaller than Claude's optimistic estimate, MHD recovery substantially reduces dependence on external beamed power and simplifies the power architecture. Design the intake magnetic nozzle and MHD generator as a first-priority subsystem.

5. **Invest early and heavily in liquid-droplet radiator technology and high-temperature plasma-facing materials.** All three models identify thermal management and material survivability as the two subsystems most likely to constrain overall performance. Fund a dedicated space demonstration of liquid-metal droplet radiators (tin or tungsten) at the 10-MW rejection scale within the first decade, and establish a parallel program for plasma-facing component testing at relevant heat fluxes (>1 MW/m²) and durations (>10,000 hours).

6. **Establish the mass-lifter/HSP interface specification as a binding inter-BOM contract early in Phase 3b.** The plasma handoff — including magnetic field topology, plasma temperature and ionization state, flow velocity, pulsation characteristics, and failure-mode isolation — is a critical integration point that all three models treat differently. Convene a joint BOM-3b-4/3b-5 interface control working group to define and freeze these parameters before either subsystem proceeds past preliminary design.

7. **Plan for a 30–50 year phased deployment with exponential scaling, bootstrapped by the metals stream from early operational units.** All models agree that the construction bottleneck is manufacturing throughput, not energy or raw materials. Begin with a single prototype station (Year 10–15), scale to ~100 units for initial Caplan engine testing (Year 15–25), and exploit the ~1.7% metals byproduct stream from operating HSPs to feed exponential replication to full constellation size (Year 25–45). Maintain ≥10% spare capacity throughout for maintenance and graceful degradation.