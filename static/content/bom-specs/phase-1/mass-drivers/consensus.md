---
bomId: "bom-1-5"
itemName: "Mass Drivers"
itemSlug: "mass-drivers"
type: "consensus"
generated: "2026-02-01"
phase: "phase-1"
---

# Mass Drivers Technical Specifications Synthesis
## Phase 1 - Initial Swarm Deployment

---

## Key Specifications

All three models converge on the following technical parameters:

- **Architecture Selection**: Linear synchronous motor (coilgun) strongly preferred over railgun due to contactless acceleration eliminating electrode erosion, enabling >100,000 shot barrel life versus ~1,000 shots for railguns
- **System Efficiency**: Electrical-to-kinetic conversion efficiency of 45-90%, with 80-85% achievable for mature superconducting systems
- **Acceleration Regime**: 100-1,000 g average acceleration (1,000-10,000 m/s²), with 100 g suitable for bulk cargo and higher g acceptable for ruggedized payloads
- **Track Length**: 650 m to 3,400 m depending on target velocity and acceleration limits, with modular segment construction (2-10 m segments)
- **Pulsed Power Architecture**: Capacitor/supercapacitor banks with distributed energy storage along track, peak power draw of 120 MW to 2.8 GW during launch pulse
- **Autonomy Requirement**: Multi-tier autonomous control with millisecond-level local switching, seconds-level thermal management, and hours-level mission planning; human-in-loop only for strategic oversight
- **Modular Maintenance Philosophy**: All components with <10 year life must be robotically replaceable without crewed intervention
- **Dust Mitigation**: Critical requirement across all proposals—sealed coil cavities, electrostatic repulsion, berms/trenches, and sacrificial bore liners

---

## Divergent Views

- **Primary Deployment Location**: Claude recommends lunar polar region for near-continuous solar illumination and proximity to Earth; Gemini prefers Mercury's north pole (Crater Prokofiev) for superior solar flux and simplified orbital insertion to heliocentric orbits; GPT recommends lunar polar as primary with NEA as secondary target.

- **Target Muzzle Velocity**: Claude specifies 2.4 km/s optimized for lunar escape to Earth-Sun L1; Gemini targets 3.5 km/s for Mercury escape or L1/L2 transfer; GPT proposes 2.4-2.6 km/s variants for cislunar transfers (NRHO/EML2).

- **Payload Mass per Shot**: Claude designs for 500 kg nominal payloads (200-750 kg range); Gemini standardizes on 10 kg "Swarm Packets" for high-cadence operations; GPT specifies 100 kg as Phase 1 baseline with growth to 500-2,000 kg.

- **Launch Cadence**: Claude targets 5 launches/hour (12-minute cycle); Gemini proposes 6 launches/minute (10-second cycle); GPT recommends 10-30 launches/hour as nominal operating range.

- **Annual Throughput per Driver**: Claude calculates 21,900 tonnes/year; Gemini projects 31,536 tonnes/year (at 100% uptime); GPT estimates 8,760-26,280 tonnes/year depending on shot rate.

- **Sabot/Carrier Strategy**: Claude assumes disposable aluminum sabots (recovery cost exceeds material value); Gemini proposes reusable HTS-equipped "buckets" rated for 10,000 launches with recirculation track; GPT recommends reusable carriers (1,000+ cycles) but flags carrier return logistics as an open question.

---

## Open Questions

1. **Capture Architecture Definition**: All models identify the orbital capture system as critical but undefined—net capture, magnetic braking, foam deceleration, or autonomous tug rendezvous? Velocity dispersion tolerance and capture envelope sizing depend on this decision.

2. **In-Situ Conductor Production**: Can aluminum or copper conductors with adequate purity and insulation be manufactured from lunar/asteroid regolith within Phase 1 timeframe? This determines whether 500-2,000 tonnes of conductor must be imported from Earth.

3. **Optimal Coil Operating Temperature**: Trade between lower temperature (20-40 K) for higher current capacity versus higher temperature (77 K) for reduced cooling complexity remains unresolved; thermal cycling effects on superconductor performance need validation.

4. **Foundation and Recoil Management**: How do regolith foundations handle repetitive shear stress from 100-1,000 g acceleration pulses? Geotechnical characterization of candidate sites required.

5. **Carrier Reuse Logistics**: If carriers are reusable, what is the return mechanism—orbital tug retrieval, separate deceleration track, or accept consumable loss? Mass and cost implications differ by orders of magnitude.

6. **EMI and Charging Effects**: High pulsed magnetic fields may charge lunar dust and interfere with nearby electronics; site layout constraints and shielding requirements undefined.

---

## Recommended Approach

1. **Select coilgun architecture** with modular 2-10 m track segments, superconducting coils (REBCO tape at 40 K baseline), and distributed capacitor/flywheel energy storage for pulsed power buffering.

2. **Deploy initial pilot system on lunar polar surface** (300-500 m subscale) to validate dust tolerance, thermal management, and autonomous operations before committing to full-scale 1.8-3.4 km track.

3. **Design for 100 kg payload class initially** with 100 g average acceleration and 2.4-2.6 km/s muzzle velocity, enabling ~3.4 km track length while maintaining structural simplicity for bulk cargo.

4. **Co-develop orbital capture system in parallel**—mass driver success is meaningless without reliable payload aggregation; recommend oversized capture envelope (±50 km) with trim capability on payloads.

5. **Prioritize in-situ resource utilization** for structural mass (foundations, berms, radiator panels) from Phase 1 start; import only electronics, power switching, sensors, and initial conductor stock from Earth.

6. **Establish go/no-go decision gates**: subscale demonstrator must achieve target velocity at >70% efficiency; projectile must survive 500 g qualification testing; lunar delivery costs must fall below $50k/kg before full-scale deployment commitment.

7. **Plan for graceful degradation**: design track segmentation and power distribution such that 10-20% of coils can fail without mission loss; autonomous fault isolation and reconfiguration required.