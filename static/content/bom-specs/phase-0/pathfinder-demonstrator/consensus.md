---
bomId: "bom-0-12"
itemName: "0A Pathfinder Demonstrator"
itemSlug: "pathfinder-demonstrator"
type: "consensus"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-12 0A Pathfinder Demonstrator: Consensus Synthesis

## Key Specifications

- **Mission count and crew.** All three models specify **1 uncrewed mission** to a single prospecting-qualified target NEA. No second asteroid visit and no reflight are baselined in this line. Claude holds a reflight long-lead option in bom-0-17, not here.
- **Scope.** All three test the full chain at the target: enclosed excavation → magnetic beneficiation → electrically heated batch melting/consolidation of **native Fe-Ni only** → product inspection → retained waste. All three exclude:
  - oxide or silicate reduction;
  - oxygen extraction;
  - cryogenic propellant production;
  - bulk production.
- **Propulsion type.** All three use **solar-electric Hall-thruster propulsion** for cruise, in the ~10–100 kWe class. The Δv envelope is target-dependent: Claude 5 km/s outbound; GPT 3–6 km/s useful. Claude and Gemini put cruise at **~1.5–2 years**; GPT gives 1–3 years.
- **Gate role (D-02).** All three state the pathfinder's purpose is to bring project-ending technologies to **TRL 6 in a relevant environment, without waivers**, at KDP-0B. Entry readiness is estimated at **TRL 2–5**, with TRL 4–5 delivered by ground R&D (bom-0-11) before design freeze.
- **Excavation and anchoring.** All three use **counter-rotating cutters** to cancel reaction torque, plus a **surface-sealed containment hood or skirt**. All three treat anchoring on weak or rubble-pile regolith as a top risk. Claude and Gemini carry a cold-gas or thrust hold-down fallback.
- **Containment.** All three treat containment as a primary mission objective with **no intentional release** of tailings, fines or test fragments. All three use sealed waste retention and an ALARP-based interim ceiling (D-03). Claude and GPT both state that a mass balance cannot verify the ceiling, so direct particle measurement is required: calibrated detectors, imaging and witness plates.
- **Thermal and power.** All three use **explicit pumped-loop radiators**. Claude and GPT add a separate warm loop at **~320–360 K** and a high-temperature loop at **~450–550 K**. All three schedule processing to available solar power rather than storing enough energy to run the furnace through the asteroid night.
- **Autonomy and comms.** All three use **layered onboard autonomy**: goal and envelope commanding, no real-time teleoperation, and hardware safing independent of flight software. Comms are **X/Ka-band HGA** over paid DSN or commercial ground service. Claude and GPT size returned data at **~1–10 GB/day** and reject the round-1 2.5 TB/day figure.
- **Cost split.** All three put this line **100% in 0A**. The **0B share is $0**: no industrial plant, fleet or production workforce is charged here.

## Divergent Views

- **Demonstrator scale.**
  - Claude recommends "full-scale units, subscale plant": a ~24.8 t launch stack, ~16 t dry, a 75 kWe surface plant, a full 0B-size 50 kg-batch crucible, ≥40 t feed and ≥4 t Fe-Ni.
  - Gemini prefers "end-to-end subscale": a 2.45 t wet single spacecraft with 15 kW, a 3 kW furnace, 5 kg/batch and ~0.5 kg Fe-Ni per batch.
  - GPT suggests a middle path: 6–8.5 t dry, 60–80 kWe, 300–1,000 kg feed and 10–80 kg product, with representative (not full-scale) contact surfaces and furnace conditions.
- **Cost of bom-0-12 and treatment of round-2 figures.**
  - Claude recommends **$1.3–3.0B (point $2.0B)** for the line, including 25% project reserve. Its full-mission view is $1.7–3.8B. Claude calls GPT's $0.6B hardware floor too low and GPT's $0.3–0.9B delivery too high for one launch.
  - Gemini prefers **$0.9–1.45B total**, including launch ($150–250M) and operations, and rejects $4B as front-loading capital. Gemini's text also rejects "Gemini's $2.5B", which is internally inconsistent.
  - GPT suggests **$0.91–1.72B direct** and **$1.9–3.8B fully burdened attributable** (point ~$2.7B), and rejects its own round-2 low endpoint.
- **Mission architecture and robots.**
  - Claude recommends three elements: a 100 kWe carrier/orbiter, an anchored Surface Plant Module, and **two flight-standard bom-0-2 robots** on 2 kV, 300 m tethers with 20 kWh batteries.
  - Gemini prefers a single integrated anchored spacecraft with an excavation head and no separate robots.
  - GPT suggests a single spacecraft with a 3–5 m arm and a short **1–2 kV** demonstrator tether branch, explicitly avoiding "importing an industrial robot fleet."
- **Propellant (D-05).**
  - Claude recommends **krypton for the critical-path strings** plus one iodine demo string. Claude flags this as a deliberate exception to D-05 needing owner confirmation.
  - Gemini prefers **iodine Hall thrusters (2 × 5 kW)** as baseline.
  - GPT suggests costing iodine with argon as the alternate per D-05, switching to a qualified alternative if iodine is immature.
- **Product return.**
  - Claude recommends a product shuttle, **~300 kg returned toward SEL1**, and a **5–10 kg Earth sample capsule**.
  - Gemini prefers on-board inspection of the coupon or ingot only.
  - GPT suggests **no sample return baselined**. GPT would decide before PDR whether Phase 1 acceptance requires Earth-lab data.
- **Containment ceiling and processing route.**
  - Claude recommends an interim ceiling of **≤1×10⁻³ of mass handled**, measured down to 10⁻⁴. Its process is centrifugal induction casting (~1 g at the wall, 1,550–1,600 °C) plus a subscale carbonyl cell for sulfur removal.
  - Gemini prefers a qualitative ALARP electrostatic Kapton/Kevlar shroud. Its process is induction melting with electromagnetic melt centering and inertia-driven casting.
  - GPT suggests a tighter **≤1×10⁻⁴ allocation (30–100 g over the campaign)**. Its process is vacuum induction at 1,600–1,850 °C with an optional hot-press/sintering experiment.

## Open Questions

1. **Scale validity of TRL 6.** Can a kg- to tonne-scale demonstration legitimately support a no-waiver TRL 6 claim for 0B units? Specific concerns are crucible life (≥300 batches?), dust-seal wear and melt surface-to-volume effects. Or do some project-ending items need larger or separate evidence (GPT, Claude)?
2. **Sulfur and impurities versus the Phase 1 spec.** What S, P and O levels can melt-route Fe-Ni reach with in-situ slag alone? The proposed limits are Claude's S ≤ 0.05 wt% with ≥98% Fe+Ni+Co, and GPT's ≥95%. This decides the carbonyl cell, and it needs Phase 1 to freeze a material specification before CDR.
3. **Anchoring and reaction loads on rubble piles.** Is a 2 kN pull-out (Claude) achievable, or must tool forces stay at 1–100 N (GPT)? Which anchor family works: microspines, helical screws, penetrators or pads? Scouts (bom-0-1) need to return geotechnical data to answer this.
4. **Containment verification.** Can loss fractions of 10⁻³–10⁻⁴ be measured with a credible upper bound across all particle sizes and velocities? Can the hood clear dust before retraction (Gemini)? What final number will the licensing state accept?
5. **Target availability and grade.** Will scouts confirm a target with accessible native metal, rather than only a metal-rich spectrum, in time for CDR? The candidate envelope is:
   - 5–15 wt% recoverable metal (GPT) or ≥8 wt% (Claude);
   - rotation period ≥ 4–6 h;
   - round-trip Δv ≤ 9 km/s.
6. **Earth-lab need and propulsion maturity.** Is sample return indispensable for product acceptance? Can iodine Hall life and supply close on the pathfinder schedule?

## Recommended Approach

1. **Baseline a mid-scale, single-launch demonstrator built around full-scale critical units.**
   - Take GPT's envelope as the system baseline: ~6–10 t dry, 60–80 kWe BOL, 300 kg–5 t feed, 10–500 kg product.
   - Fly Claude's full 0B-scale versions of the items whose physics do not extrapolate: crucible (≈50 kg batch), cutter head and skirt, canister and docking port, and magnetic-drum width.
   - Reject Gemini's 3 kW / 0.5 kg-per-batch scale. It cannot support a no-waiver TRL 6 claim for 0B.
2. **Use gravity-independent, positively contained processes.**
   - Centrifugal induction melt and cast as the baseline.
   - Forced-feed and mechanically constrained transfers; no ballistic or pneumatic transfer.
   - Nested containment barriers.
   - Carry Claude's carbonyl cell to PDR, deleting it only if ground tests on real chondrite feed reach S ≤ 0.05 wt%.
3. **Set containment per D-03.**
   - Design ceiling ≤1×10⁻³ of mass handled, with no intentional release.
   - Design goal of 10⁻⁴ (GPT's allocation).
   - Mandatory measurement floor ≤10⁻⁴, using carrier or perimeter particle instruments, witness plates and calibrated tracer releases.
   - The licensing state sets the final number from flight data.
4. **Carry costs as ranges with an explicit basis.**
   - **bom-0-12 direct: $1.0–2.5B (point ~$1.6B), 0A only, $0 in 0B.** Basis: ~$100–150k/kg for first-of-kind dry hardware, plus I&T, flight software and reserve.
   - Show a fully burdened attributable view of **$1.8–3.5B** alongside it. This includes launch (bom-0-8, $0.15–0.45B), operations and ground ($0.1–0.35B), shared NRE and contingency, none of it double-counted.
   - Disagreements with round 2: Gemini's ±16% band is too narrow for TRL 2–3 hardware; GPT's $0.6B hardware floor is too low; Claude's $4B tail double-counts external lines.
5. **Propulsion per D-05, with a maturity escape.** Cost iodine as the reference case and argon as the alternate. If iodine is not TRL 6 by CDR, fly a qualified noble-gas system on the critical path (Claude's Kr exception) with one iodine string as a life-data source. The owner decides this at SRR.
6. **Retire the lowest-TRL risk early.**
   - Fund a ~300–500 kg LEO free-flyer test of the centrifugal furnace and separator (~$60–150M, in bom-0-11, ~2028–29) before PDR.
   - Impose target-envelope requirements on bom-0-1 now: in-situ geotechnical and native-metal data, rotation ≥ 4–6 h, round-trip Δv ≤ 9 km/s.
7. **Define success and gate timing.**
   - Minimum success comes from the excavation and containment chain alone.
   - KDP-0B may be taken on ~6 months of surface data, with ≥1,000 h of processing and containment calibration complete.
   - Carry a small Earth sample capsule (~$40–100M) as a PDR trade item. Defer bulk SEL1 product return unless bom-0-13 is operating.
   - Keep 0B long-lead procurement gated, so mission loss strands nothing.