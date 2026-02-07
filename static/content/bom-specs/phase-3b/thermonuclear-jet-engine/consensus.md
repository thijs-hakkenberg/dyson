---
bomId: "bom-3b-2"
itemName: "Thermonuclear Jet Engine"
itemSlug: "thermonuclear-jet-engine"
type: "consensus"
generated: "2026-02-07"
phase: "phase-3b"
---



# Thermonuclear Jet Engine (BOM-3b-2) — Consensus Synthesis Document

**Project Dyson — Phase 3b (Stellar Engine)**
**Document ID:** PD-3B-TJE-CONSENSUS-001

---

## Key Specifications

- **Total system thrust target:** ~10¹⁸–10²¹ N (all models converge on the Caplan-derived figure of ~3 × 10¹⁸ N from the jet alone when properly accounting for the Shkadov mirror momentum balance, with ~10⁻⁹ m/s² net solar acceleration).

- **Exhaust velocity:** 0.01c (~3 × 10⁶ m/s), unanimously adopted across all three models as the baseline design point.

- **Total propellant mass flow (array):** ~10¹² kg/s of solar-extracted helium/hydrogen feedstock, consistent with Caplan (2019) and agreed by all models.

- **Jet kinetic power (array):** ~4.5 × 10²³–10²⁴ W, representing ~0.1–1% of solar luminosity; all models agree this is enormous but feasible given Phase 2 Dyson swarm infrastructure.

- **Modular, distributed architecture:** All three models independently reject a single monolithic engine in favor of an array of replicated engine modules (ranging from 10³ to 10⁷ units depending on module size class), with autonomous operation, graceful degradation, and in-service replacement.

- **Magnetic nozzle for exhaust collimation:** All models specify a diverging superconducting magnetic nozzle converting isotropic fusion plasma energy into directed kinetic energy, with target nozzle efficiency of 70–90% and beam divergence half-angle <5°.

- **Pulsed fusion preferred over steady-state confinement:** All models reject continuous tokamak-style confinement for this application, citing thermal management, plasma stability, and maintainability advantages of pulsed operation.

- **Operational lifetime:** >10⁶ years at the system level, achieved through continuous modular replacement; individual component lifetimes of 5–200 years depending on subsystem, with autonomous robotic maintenance.

- **Liquid-droplet radiators for thermal management:** All models converge on liquid metal droplet radiators (tin or tin-gallium alloy) as the primary waste heat rejection technology, operating at ~2000 K, with radiator areas of thousands of km² per engine module.

- **Power source:** Beamed power from the Phase 2 Dyson swarm (microwave or laser transmission) for startup, driver systems, and auxiliary loads; fusion energy provides the bulk of jet kinetic power in steady state.

---

## Divergent Views

- **Fusion reaction selection**: Claude recommends D–³He as the primary reaction (18.3 MeV, mostly charged products) with ³He bred from D–D side reactions and a mixed-fuel fallback; Gemini prefers the Triple-Alpha process (3 ⁴He → ¹²C) augmented by muon-catalyzed fusion to overcome the notoriously low cross-section; GPT aligns with Claude on D–³He baseline but proposes a staged ramp from D–D to D–³He as ³He stockpiles grow, explicitly avoiding Triple-Alpha as impractical.

- **Number and size of engine modules**: Claude specifies ~10,000 modules at ~10¹⁴ N thrust each (module mass ~10¹¹ kg, length ~50–90 km); Gemini proposes ~10⁷ small "Torch" modules at 5 km length and 4.5 × 10⁸ kg each; GPT defines a tiered module class system (TJEM-S/M/L) with the baseline TJEM-M at 10¹² N thrust per unit and recommends 10³–10⁴ units, each ~10¹² kg.

- **Ignition/compression driver technology**: Claude specifies heavy-ion beam drivers (192 beamlines per module, Pb ions at 10 GeV, 10¹⁵ J per pulse) based on superior wall-plug efficiency and scaling; Gemini proposes laser-driven inertial confinement for initial compression combined with continuous-flow Z-pinch in the burn chamber; GPT recommends magnetized target fusion (MIF) with imploding conductive liners, emphasizing replaceable consumable liners as a maintainability advantage.

- **Throat magnetic field strength**: Claude initially proposed 10⁴ T but self-corrected to ~200 T as a realistic extrapolation, requiring hybrid resistive/superconducting coils with a 2 km throat diameter; Gemini specifies 250 T with high-temperature superconducting ribbons at a 1 km module diameter; GPT does not specify a peak throat field but implies lower fields with a 50–200 m throat radius and longer nozzle (50–300 km), prioritizing achievability over peak performance.

- **Station-keeping mechanism (Hydrogen Return Beam)**: Gemini uniquely proposes a dedicated Hydrogen Return Beam (HRB) fired back at the Sun, serving the dual purpose of maintaining engine station against solar gravity and replenishing solar hydrogen to extend main-sequence lifetime; Claude and GPT rely on a combination of reflected solar radiation pressure (Shkadov mirror synergy) and minor thrust vectoring for station-keeping, without a dedicated return beam.

- **Feedstock source for engine construction**: Gemini explicitly proposes complete dismantlement of Mercury as the primary material source for the engine array (1.5 × 10²³ kg, ~50% of Mercury); Claude and GPT assume distributed asteroid mining and existing Phase 2 orbital manufacturing infrastructure without targeting a specific planetary body for destruction.

---

## Open Questions

- **³He supply and isotopic economics:** The Sun's ³He abundance is ~0.01% of helium by number. All models flag that D–³He fusion at the required mass flow demands far more ³He than solar extraction alone can provide. The feasibility of breeding ³He from D–D reactions (which reintroduces neutrons), importing ³He from Jupiter's atmosphere, or accepting a mixed D–D/D–³He fuel regime remains unresolved and is a critical design driver.

- **Magnetic nozzle plasma detachment and collimation at scale:** All three models identify the transition from magnetically confined exhaust to free-streaming plasma as a poorly validated physics regime. Whether milliradian-class collimation can be maintained over million-kilometer plume lengths—especially in the presence of solar wind and interplanetary magnetic fields—requires dedicated experimental campaigns and high-fidelity simulation that do not yet exist.

- **Pellet/liner fabrication and symmetric compression at extreme scale:** Claude's design requires 10⁵ kg cryogenic fuel pellets (~60 m diameter) compressed symmetrically at 1 kHz; GPT's MIF approach requires mass-manufactured conductive liners at high repetition rates. No terrestrial analogue exists for manufacturing or compressing targets at these scales, and Rayleigh-Taylor instability management during implosion remains an open theoretical and experimental question.

- **Long-term solar response to mass extraction and hydrogen return:** Removing ~10¹² kg/s from the solar photosphere and (per Gemini's proposal) injecting hydrogen back into the convective zone will alter local chromospheric conditions and potentially affect solar luminosity, convection patterns, and magnetic activity cycles. Coupled stellar-engineering hydrodynamic models capable of predicting these effects over million-year timescales do not yet exist.

- **Array-level electromagnetic and plasma interference:** Operating thousands to millions of pulsed fusion engines in close proximity generates extreme electromagnetic interference, plasma wake interactions, and potential coupling of thrust oscillations. The minimum safe inter-module spacing, synchronization requirements, and array geometry optimization to prevent destructive interference remain unresolved.

- **Thrust reversal for deceleration:** All models implicitly assume the stellar engine must eventually decelerate. Claude proposes reversible magnetic nozzle geometry; Gemini and GPT do not address this directly. Whether nozzle field reversal is physically achievable without a second opposing array, and the timeline/energy cost of deceleration maneuvers, requires further analysis.

---

## Recommended Approach

1. **Adopt D–³He fusion as the primary reaction baseline** with an explicit staged fuel strategy: begin operations with D–D fusion during initial ³He accumulation, transition to D–³He as separation and breeding infrastructure matures, and maintain D–D fallback capability throughout the operational lifetime. Reject Triple-Alpha as the primary cycle due to prohibitively low cross-sections; reserve muon-catalyzed fusion research as a long-term enhancement pathway rather than a baseline dependency.

2. **Design a modular engine array of ~10,000 units at ~3 × 10¹⁴ N thrust per module**, representing a pragmatic middle ground between Claude's and GPT's sizing. Each module should be a self-contained fusion-to-jet system approximately 50–100 km in length and 10¹¹–10¹² kg in mass, arranged in a toroidal or arc formation. This balances manufacturing replicability against the impracticality of coordinating millions of tiny units.

3. **Pursue magnetized target fusion (MIF) with heavy-ion beam assist as the ignition architecture**, synthesizing GPT's MIF liner-implosion concept with Claude's heavy-ion beam driver arrays. MIF's replaceable liner approach addresses million-year maintainability, while heavy-ion beams provide the energy delivery efficiency and scaling advantages that lasers lack. Fund parallel development of both pure MIF and heavy-ion-driven ICF through subscale demonstrators before down-selecting.

4. **Design the magnetic nozzle for a 200–250 T throat field** using hybrid resistive-superconducting coil stacks, with a throat diameter of 1–2 km and a diverging section of 40–80 km. Accept 70–80% nozzle efficiency as the realistic baseline rather than optimizing for 90%+. Prioritize experimental validation of plasma detachment physics and collimation stability before committing to final nozzle geometry.

5. **Implement a three-tier autonomous control architecture**: (a) module-level controllers handling pulse timing, thermal management, and self-diagnostics at microsecond-to-second timescales; (b) sector-level controllers managing groups of ~1,000 modules for thrust balancing and fault isolation at second-to-hour timescales; (c) a Stellar Engine Master Controller integrated with the Phase 3a Matrioshka Brain for trajectory planning and array-wide coordination at day-to-year timescales. All real-time control must be fully autonomous with no human-in-the-loop dependency.

6. **Establish a dedicated technology demonstration program** before committing to full array construction: (a) subscale single-shot fusion ignition at 1–1,000 kg pellet/liner scale within 10–20 years; (b) repetitive pulsed operation at 1–10 Hz with magnetic nozzle coupling within 20–40 years; (c) full-scale single-module prototype with end-to-end fuel conditioning, fusion burn, and collimated exhaust within 40–60 years; (d) 10–100 module array segment validation within 60–80 years. Gate full array deployment on demonstrated performance at each stage.

7. **Commission a coupled stellar-engineering modeling program immediately** to resolve the open questions around solar response to mass extraction, ³He availability and breeding economics, and exhaust plume interaction with the interplanetary medium. These physics uncertainties—not manufacturing capacity—represent the true critical path for the Thermonuclear Jet Engine and must be retired before final design freeze.