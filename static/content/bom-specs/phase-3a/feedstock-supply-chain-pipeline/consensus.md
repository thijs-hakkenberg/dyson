---
bomId: "bom-3-6"
itemName: "Feedstock Supply Chain and Logistics Pipeline"
itemSlug: "feedstock-supply-chain-pipeline"
type: "consensus"
generated: "2026-02-07"
phase: "phase-3"
---



# Feedstock Supply Chain and Logistics Pipeline (bom-3-6)
## Phase 3 — Matroska Brain: Consensus Synthesis Document

---

## Key Specifications

All three models converge on the following core parameters:

- **Aggregate throughput target: ~10⁹ tonnes/year** of processed feedstock delivered to manufacturing foundries at steady state, scaling up from ~10⁷–10⁸ t/yr during bootstrap.

- **Standardized cargo slug mass: 10 tonnes (payload)** with a total slug mass of ~10–12 tonnes including sabot, ablative shielding, and minimal avionics (beacon, retroreflector, trajectory correction capability). All three models independently converge on this figure.

- **Mass driver launch complexes: ~500 units**, each a multi-kilometer electromagnetic coilgun (5–20 km length) anchored to consolidated asteroids, capable of accelerating slugs to 2–30 km/s with peak accelerations of 500–5,000 g.

- **Mining fleet: ~10,000 autonomous ships** across multiple classes, with inner-belt ships solar-powered (1–5 MW) and outer-system ships nuclear-powered (3–10 MW fission), each processing 50–500 tonnes/day of raw material.

- **Catcher/deceleration fleet: ~50,000 units** distributed across all Matroska shell radii, employing electromagnetic braking as the preferred primary capture method, with propulsive and tether-based fallbacks.

- **Slugs in transit simultaneously: ~10⁵ (100,000–110,000)**, managed by a distributed autonomous logistics coordination system integrated with the Distributed OS (bom-3-5) and optical backbone (bom-3-2).

- **Total pipeline infrastructure mass: ~10⁸–2×10⁸ tonnes**, with total electrical power consumption of ~2–3 TW — negligible relative to the Dyson swarm's captured luminosity.

- **Three-zone supply architecture**: inner belt (1.8–2.5 AU) feeds inner shells, main belt (2.5–3.5 AU) feeds mid shells, and outer system (5–50 AU) increasingly relies on local body consumption (KBOs/Centaurs) for bulk material with only specialty/trace materials shipped from the inner system.

- **Total lifecycle cost: $10¹³–10¹⁴ equivalent** in manufacturing capacity allocation, with catcher tugs and mass drivers dominating capital expenditure. All models note that "cost" at this phase represents industrial capacity, not currency.

- **Bootstrap timeline: ~15–30 years** from initial seed deployment to full 10⁹ t/yr throughput, following a self-reinforcing growth loop where foundries produce pipeline components that deliver more feedstock to foundries.

---

## Divergent Views

- **Slug complexity and onboard systems**: Claude equips each slug with a solar-powered transponder, cold-gas thrusters (50 m/s ΔV budget), and a retroreflector array (~100 kg avionics); Gemini explicitly designs slugs as "dumb packets" with only passive radar reflectors and visual fiducials and no active systems; GPT takes a middle position with minimal avionics for bulk slugs (beacon + retroreflector) but full nav and microthrusters for precision/high-value cargoes.

- **Concentration/processing depot scale and count**: Claude specifies ~170 depots at 15,000 tonnes each with 50,000 t/day input throughput; Gemini folds processing into the mining rig itself (the AESR at 4,500 tonnes performs sintering onboard, producing 1 slug every 30 seconds); GPT specifies far larger depots at 50,000–500,000 tonnes each, organized into ~10–20 "mega-port" complexes rather than distributed stations.

- **Catcher energy recovery**: Gemini explicitly designs the MELN catcher as a regenerative system that recovers captured kinetic energy into supercapacitor banks and feeds it to local foundries or the power grid; Claude treats magnetic braking energy as waste heat that must be radiated away (~1 TW thermal dissipation); GPT advocates for energy recovery as a critical R&D priority but acknowledges it is low-TRL and may not be achievable at scale.

- **Mass driver recoil management**: Claude proposes bidirectional launch scheduling (paired drivers firing in opposite directions) plus dedicated ion-engine station-keeping on the anchor asteroid; Gemini uses continuous ion thruster banks firing opposite the launch vector plus counter-rotating flywheels for torque management; GPT recommends distributing recoil over km-scale trusses with active spin/attitude control and continuous geotechnical sensing of the asteroid body.

- **Safety and governance of high-energy launches**: GPT treats this as a first-class safety-critical concern, specifying cryptographic multi-party launch authorization, geofenced trajectories with physical coil-timing limits preventing planet-crossing shots, independent audit constellations, and hardware abort logic; Claude mentions collision avoidance and dark-slug tracking but does not address weaponization risk; Gemini mentions interceptor drones for off-course slugs but does not address governance or authorization frameworks.

- **Outer-system logistics strategy**: Claude specifies a 50/50 split (specialty materials from inner system, bulk from local KBOs) with Class C mining ships co-located with foundries consuming individual KBOs over 10–50 years; Gemini does not detail outer-system logistics beyond noting Main Belt and Trojans as primary sources; GPT frames the outer-system problem as primarily about "seeding factories + high-value trace shipments" and poses the crossover radius as an open design question.

---

## Open Questions

1. **Electromagnetic capture feasibility at scale**: Can superconducting magnetic braking reliably decelerate 10-tonne objects arriving at 5–30 km/s relative velocity? What are the realistic braking distances, peak field requirements, thermal quench risks in superconducting coils, and energy recovery efficiencies? All three models identify this as the lowest-TRL (2–3) and highest-risk technology in the pipeline. No model offers a validated physical demonstration pathway beyond proposing subscale tests.

2. **Rubble-pile anchoring under sustained repetitive recoil**: Can multi-kilometer mass drivers be reliably anchored to asteroid bodies — most of which are rubble piles — under decades of continuous high-impulse launches (10⁵–10⁶ launches per driver lifetime)? Surface and subsurface mechanical properties of asteroids remain poorly characterized. All models propose different anchoring strategies but none can validate them against real asteroid geotechnical data.

3. **Zero-gravity refining of semiconductor-grade materials**: Can zone refining, Czochralski growth, or equivalent processes produce 99.9999%+ purity silicon and other semiconductor precursors in microgravity? Earth-based processes rely on gravity-driven convection. Claude and GPT both flag this as critical; Gemini's approach of sintering bulk slugs sidesteps the question but does not solve the foundry's need for high-purity feedstock.

4. **Optimal slug mass and traffic density limits**: Is 10 tonnes truly optimal, or would 1-tonne (Gemini) or 50-tonne slugs yield better system-level economics when driver energy, capture loads, traffic management complexity, and foundry feed granularity are jointly optimized? What is the maximum safe concurrent slug population before collision probability near shell radii or driver clusters becomes unacceptable?

5. **Long-term asteroid belt perturbation**: Extracting 10⁹ tonnes/year from specific orbital families over centuries will alter their gravitational dynamics and potentially destabilize debris populations. What orbital dynamics modeling is required, and at what timescale do perturbation effects become operationally significant? Only Claude raises this explicitly, but it affects all architectures.

6. **Volatile slug survivability in transit**: Can ice-core slugs (water, CO₂, NH₃) survive multi-year transits at <3 AU without catastrophic sublimation? Gemini raises this directly. Passive ablative crusts may be insufficient; active refrigeration on each slug is likely cost-prohibitive. The alternative — shipping volatiles only from outer-system sources — changes the entire supply chain topology.

---

## Recommended Approach

1. **Adopt the 10-tonne bulk slug as the universal mechanical standard**, with a defined physical interface (2.0–2.5 m diameter cylindrical form factor, conductive sabot for electromagnetic launch and capture, composition-coded by material class). Equip bulk slugs with minimal active avionics (low-power beacon + retroreflector) per GPT's recommendation, reserving full navigation and propulsion packages for the precision stream carrying semiconductor-grade and trace materials. This balances Claude's tracking needs against Gemini's cost-per-slug discipline.

2. **Organize launch infrastructure into 10–20 concentrated "mega-port" complexes** in the main belt (per GPT's recommendation) rather than distributing 500 drivers uniformly from the start. Each port complex co-locates 20–50 mass drivers, processing depots, power infrastructure, and repair facilities on or near a cluster of consolidated asteroids. This reduces logistics overhead, enables shared power and maintenance infrastructure, and simplifies the bootstrap phase. Scale by replicating entire port complexes as throughput demand grows.

3. **Pursue electromagnetic capture with energy recovery as the primary R&D investment**, funding it as a first-class technology maturation program beginning in Phase 2.5. Design and execute a subscale demonstration: capture a 100–1,000 kg test slug at 1–5 km/s in cislunar space, measure braking efficiency, thermal loads on superconducting coils, and energy recovery fraction. Simultaneously develop propulsive tug rendezvous (Mode C) and tether/sail capture (Mode B) as qualified fallback modes so that the pipeline is not single-threaded on magnetic braking success.

4. **Implement a dual-stream logistics architecture** separating bulk feedstock (≥99.9% of mass: metals, silicates, carbon, volatiles) from precision feedstock (<0.1% of mass: semiconductor-grade silicon, dopants, rare earths, photoresist precursors). The bulk stream tolerates higher loss rates, lower purity, and simpler slugs. The precision stream uses dedicated carriers, stricter chain-of-custody, contamination-controlled packaging, and tug-rendezvous capture. Define a formal "feedstock API" (per GPT) specifying material classes, impurity envelopes, and packaging standards as the hard interface contract with manufacturing foundries (bom-3-4).

5. **Design the logistics coordination system as a safety-critical, cryptographically governed autonomous system** integrated with the Distributed OS (bom-3-5). Incorporate GPT's security architecture: cryptographic multi-party launch authorization, geofenced trajectory corridors with physical interlocks preventing planet-crossing launches without verified intercept plans, independent audit tracking of every slug from launch to capture, and automated abort/destruct capability for off-nominal trajectories. Any system routinely accelerating 10-tonne objects to 10+ km/s must be treated as dual-use infrastructure from day one.

6. **Adopt a tiered outer-system strategy**: for shells beyond ~5 AU, progressively shift from centralized pipeline delivery to local consumption of Centaurs and KBOs, shipping only high-value trace materials and "seed" foundry packages from the inner system. Commission early outer-system prospecting missions (Phase 2.5) to characterize KBO bulk composition — particularly metal and semiconductor-precursor content — to determine the crossover radius at which local sourcing becomes net-favorable. Design Class C mining ships for 15+ year autonomous operation with co-located foundry direct-feed capability per Claude's architecture.

7. **Execute a phased bootstrap beginning in late Phase 2**, deploying an "Alpha Fleet" of 10–20 seed mining rigs and 1–3 prototype mass drivers to near-Earth or inner-belt targets within 3–8 years. Use this initial infrastructure to validate anchoring, launch cadence, slug tracking, and capture at 10⁴–10⁶ t/yr scale before committing to full belt-wide deployment. The self-reinforcing growth loop (foundries producing pipeline components that deliver feedstock to foundries) should be explicitly modeled and its crossover point — where foundry replication rather than pipeline throughput becomes the bottleneck — identified and managed as the critical scheduling constraint for Phase 3 ramp-up.