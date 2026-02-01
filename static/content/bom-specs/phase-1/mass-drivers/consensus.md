---
bomId: "bom-1-5"
itemName: "Mass Drivers"
itemSlug: "mass-drivers"
type: "consensus"
generated: "2026-02-01"
phase: "phase-1"
---

# Mass Drivers for Phase 1 - Initial Swarm Deployment
## Consensus Technical Specification Document

---

## Key Specifications

All models agree on the following core specifications:

- **Accelerator Type**: Linear synchronous coilgun (electromagnetic mass driver) is preferred over railgun for primary operations due to elimination of electrode erosion, superior dust tolerance, and million-cycle lifetime capability
- **Lunar Exit Velocity**: 2.4–2.8 km/s required for lunar escape and cislunar transfer (lunar escape velocity is 2.38 km/s at surface)
- **Acceleration Limit**: 100–1,000 g (800–1,000 m/s²) for bulk/rugged payloads, enabling track lengths of 3.4–4.9 km
- **Payload Mass (Phase 1)**: 100–200 kg per shot nominal, with growth path to 500+ kg
- **Energy Efficiency Target**: 45–87% electrical-to-kinetic conversion (early systems ~45–60%, mature systems 85%+)
- **Energy Per Shot**: 338–901 MJ electrical depending on payload mass and efficiency assumptions
- **Modular Architecture**: 10-meter track segments with plug-and-play power/data interfaces for fault isolation and incremental deployment
- **Autonomy Requirement**: 30–90 days unattended operation with remote supervision; autonomous health monitoring, fault reconfiguration, and predictive maintenance
- **Primary Location**: Lunar polar region for near-continuous solar power access and volatile proximity
- **Dust Mitigation**: Track burial/trenching, berms, electrostatic repulsion, sealed coil cavities, and sacrificial bore liners are essential

---

## Divergent Views

- **Track Length**: Claude recommends 4.9 km at 800 g average acceleration for 2.8 km/s exit velocity; GPT calculates 3.4 km at 1,000 g (100 g) for 2.6 km/s exit velocity. Gemini specification unavailable for comparison.

- **Nominal Payload Mass**: Claude designs for 200 kg nominal payload with 45 kg reusable carrier; GPT specifies 100 kg payload with 20–40 kg carrier for Phase 1, scaling to 500 kg later.

- **Energy Efficiency Assumptions**: Claude assumes 87% efficiency achievable with superconducting coilgun technology; GPT uses 45% early/60% mature as more conservative baseline for non-superconducting systems.

- **Throughput Targets**: Claude targets 2,400 tonnes/day (12,000 launches/day at 200 kg); GPT targets 24–72 tonnes/day (10–30 shots/hour at 100 kg) for Phase 1, emphasizing incremental scaling.

- **Superconducting vs. Conventional Coils**: Claude specifies YBCO superconducting coils operating at <77K with LN2 pre-cooling for maximum efficiency; GPT recommends conventional aluminum/copper conductors for simplicity and dust tolerance, avoiding cryogenic complexity.

- **Pulsed Power Architecture**: Claude recommends superconducting magnetic energy storage (SMES) with 2.4 GWh capacity; GPT recommends capacitor banks (early) transitioning to flywheel-capacitor hybrid, citing maturity and robustness over energy density.

---

## Open Questions

1. **Orbital Capture Architecture**: What system receives launched payloads—electromagnetic braking, inflatable nets, autonomous tugs, or direct rendezvous? This drives velocity dispersion tolerance and payload container design.

2. **In-Situ Conductor Production**: Can lunar aluminum be refined to adequate purity for coil windings in Phase 1 timeframe, or must all conductor mass be imported from Earth?

3. **Carrier Reuse Logistics**: Are payload carriers (sabots) returned to the lunar surface for reuse, or treated as consumables? Reuse dramatically reduces imported mass but requires a return logistics chain.

4. **Optimal Site Latitude Trade**: Polar sites enable continuous solar power but complicate launch azimuths and orbital plane changes; equatorial sites simplify kinematics but require energy storage for lunar night. What is the optimal trade?

5. **Thermal Architecture and Operating Temperature**: What coil/switch operating temperatures are acceptable? Higher temperatures reduce radiator mass but stress insulation and reduce superconductor viability.

6. **Acceleration Limits for Varied Payloads**: Bulk sintered bricks tolerate 100+ g; tanks, electronics, and prefabricated structures may require <50 g. Does Phase 1 need multiple driver variants or variable-acceleration capability?

---

## Recommended Approach

1. **Select modular coilgun architecture** as the primary mass driver technology, reserving simpler railgun systems for secondary asteroid-based operations where lower throughput and higher maintenance tolerance are acceptable.

2. **Deploy a subscale lunar pilot system (300–500 m track)** to validate dust tolerance, thermal cycling, autonomous operations, and control systems before committing to full-scale infrastructure.

3. **Design for conventional (non-superconducting) coils initially** to reduce cryogenic complexity and dust sensitivity, with superconducting upgrade path for efficiency gains in later phases.

4. **Co-develop the orbital capture system in parallel** with mass driver development; mass driver utility is contingent on reliable payload aggregation in cislunar space.

5. **Minimize Earth-imported mass aggressively** by using in-situ regolith for foundations, berms, structural supports, and (when feasible) radiator panels; target <150–350 tonnes imported for first operational system.

6. **Establish throughput growth path**: Begin at 2–6 MW average power (24–72 tonnes/day) with modular expansion capability to 125+ MW and 2,400+ tonnes/day as power infrastructure and capture systems mature.

7. **Defer full-scale deployment** until lunar surface delivery costs drop below ~$20,000/kg or credible in-situ conductor production is demonstrated, to avoid mass driver becoming a cost sink rather than an enabler.