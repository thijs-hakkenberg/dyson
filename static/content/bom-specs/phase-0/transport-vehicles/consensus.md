---
bomId: "bom-0-4"
itemName: "MW-class Cargo Tugs"
itemSlug: "transport-vehicles"
type: "consensus"
generated: "2026-10-20"
phase: "phase-0"
---

## Key Specifications

- **Vehicle type and crewing:** All three models specify an uncrewed solar-electric cargo tug with no habitat, crew kits or life-support pass-throughs.
  - Claude and GPT explicitly reject the "human-rating" label and generic 3 g crew load cases.
  - Gemini also strips life-support from its docking port and keeps only structural, power and data linkages.
- **Reference propellant:** All three cost **solid iodine** as the reference case.
  - The iodine is sublimated and fed through heated lines with corrosion-resistant wetted materials: Hastelloy for Claude and Gemini (Claude also allows Ti), and compatibility-qualified materials for GPT.
  - Xenon is not baselined.
  - Claude and GPT carry argon as a costed alternate per D-05. Gemini does not develop an argon variant.
- **Propulsion architecture:** All three use a cluster of independently controlled **~100–150 kW thruster/PPU strings with installed spares**, not a single MW thruster. Wear-limited parts are robotically replaceable, mainly at the SEL1 node.
  - Claude: 16 × 100 kW Hall heads (15 active plus 1 spare), run at 80 kW.
  - Gemini: 10 × 150 kW Hall thrusters (8 active plus 2 spare).
  - GPT: 24 × 100 kW strings (20 active plus 4 spare); Hall versus gridded ion not yet selected.
- **Payload per loaded trip:** **200–250 t of reduced Fe-Ni product** (Claude 220 t, rated to 300 t; Gemini 200 t; GPT 250 t). It travels in a reusable carrier or pallet as billets or ingots, not loose powder.
- **Cycle time and delivered throughput:**
  - The reference round-trip cycle is **2.3–3.0 years** (Claude 2.5 yr; Gemini 2.5–3.0 yr; GPT 2.3 yr).
  - All models flag the cycle as unverified until a named-target trajectory study exists.
  - Fleet delivery converges on **~1 kt/yr**: Claude 0.95 (0.65–1.3); GPT 1.11 (0.80–1.35); Gemini's figures (15 × 200 t over 2.5–3.0 yr) imply roughly 1.0–1.2.
- **Propellant per cycle and design life:**
  - Reference propellant burned is **~55–80 t per cycle** (Claude ~56 t burned, 60 t loaded; GPT ~75 t burned, 81 t loaded; Gemini 75 t capacity).
  - Claude and GPT both carry a **15-year** service objective with consumable wear items. Gemini does not state a design life.
- **Safe-mode battery:** All three carry an onboard battery for safing and transients only, never for MW propulsion.
  - Claude and Gemini: 50 kWh.
  - GPT: 100–250 kWh.
- **Communications:** Cruise telemetry is in the tens to low hundreds of kbps, with proximity-operations bursts of **1–10 Mbps**.
  - Claude: 2–10 kbps averaged, with 50–200 kbps contacts and 1–5 Mbps in prox ops.
  - Gemini and GPT: 10–100 kbps in cruise and 1–10 Mbps in prox ops.
  - DSN is not assumed free. No continuous high-rate video is required.
- **Autonomy and proximity operations:** All three require onboard autonomous navigation and FDIR. This includes thruster drop-out and rebalance, and lidar plus optical relative navigation.
  - Claude and GPT add staged hold points, a ground go/no-go at each hold, EP shut-off or plume keep-out near the node, and autonomous passive-safe abort.
- **Top-ranked contamination risk:** All three rank iodine deposition and plume impingement on array cover glass and other surfaces as a top risk. Mitigation is through plume geometry and coupon testing.

## Divergent Views

- **Power rating basis and array size:** Claude recommends **1.5 MWe BOL at 1 AU** (~4,600 m², four wings). This gives ~1.1 MWe at end of life and ~0.72× that at 1.2 AU, with a 2.0 MWe growth scar. Gemini prefers **1.5 MWe BOL** from two 750 kWe roll-out wings of only ~3,500 m². GPT suggests specifying **2.0 MWe to propulsion at 1.3 AU, end of life**, which requires ~4.8 MW BOL at 1 AU and ~16,000 m² of array spanning 180–240 m.
  - Note: Gemini's stated 28 N at 2,100 s from ~1.2–1.5 MW implies only ~20% efficiency. The same power at the ~60% efficiency the other two assume would give ~85 N. Gemini's figure looks like an internal inconsistency.
- **Fleet size and procurement:** Claude recommends **12 tugs bought in gated tranches** of 4, then 8 (range 6–14), with Tranche 2 sized after the first full cycle. Gemini prefers **15 operational vehicles** in serial production from 2032. GPT suggests a **14-vehicle planning case** (12 in service plus 2 reserve, range 10–18), procured as 2 initial vehicles followed by lots of 3–4.
- **Dry mass and propellant storage:** Claude recommends **45 t dry (38–60)** with **100 t iodine** in ten swappable 10 t cassettes. Gemini prefers **38 t dry** with **75 t iodine** in fixed conformal tanks sublimated by PPU waste heat. GPT suggests **70 t dry (55–85)** with a deliberately oversized **200 t storage envelope** (60–70 m³), normally only partly filled.
- **Unit and fleet cost, including arrays:**
  - Claude recommends **$280M per unit ($175–450M)** and **$3.8B for the item ($2.4–5.9B)**, with $40–90M of 0A design to PDR. Arrays are priced at $40–100/W.
  - Gemini prefers **$220M per unit**, a **$3.3B fleet**, $1.2B NRE and ~$120M per vehicle for launch.
  - GPT suggests **$0.43–1.2B per unit** (working band $0.65–0.85B), a **~$10.5B fleet** at 14 × $0.75B, and $1.6–4.0B of tug-related 0A work booked in bom-0-11 and bom-0-12.
  - On the round-2 $150–350M per tug: Claude raises its top end to $450M; GPT rejects the range outright; Gemini's $220M sits within it.
- **Waste-heat rejection and T03 classification:** Claude recommends **~60 kWt (100 kWt design) on a ~160 m² single-phase pumped loop**. It argues most thruster loss leaves through the plume or by direct head radiation, so T03 for the tug should be reclassified to architecture-change, AD² 4. Gemini prefers rejecting **~400 kW through NaK-type liquid-metal loops**. GPT suggests a **0.45 MW-class active system with 600–1,000 m² of radiators** and insists every part of the ~0.8 MW of non-jet power be accounted for.
- **Bus voltage and dockside power:** Claude recommends a **300 V-class bus**, with direct drive at ~600 V only after arcing tests, **zero dockside power**, and an optional 200 kW export port. Gemini prefers **1–3 kV array output** fed directly to the PPUs, with **0.1 MW peak dockside power**. GPT suggests **1–3 kV as the starting trade** and a **100–250 kWe dockside service interface**.

## Open Questions

1. **Cycle time for a named target:**
   - What is the minimum round-trip cycle at ≤5 km/s per leg for a named NEA and a specified SEL1 halo orbit?
   - What fraction of each synodic period is usable?
   - Does any power above ~1 MWe raise delivered tonnage, given that thrusting takes only ~0.6–1.5 years inside a window-limited cycle?
   - All three models flag this question; it sets fleet size and the power point.
2. **Iodine thruster life:** Can a magnetically shielded thruster on iodine reach the required throughput?
   - Claude: ≥6 t per wear-kit interval, with ≥9 t demonstrated.
   - GPT: ~10 t per string, about 14,000 h.
   - Gemini: >10,000 h wear tests.
   - Sub-questions: is the life limiter the pole cover, the cathode or the channel, and does the BaO cathode need LaB₆/electride or a noble-gas cathode feed?
   - Context: present heritage is ~1–2 t on xenon. Gemini's "~70 t per vehicle" throughput is ambiguous against the ~490 t lifetime per vehicle implied by Claude and GPT.
3. **Large propellant storage and feed:**
   - Can tens to hundreds of tonnes of solid iodine be stored and sublimated reliably at 2–4 g/s in microgravity and at partial fill?
   - Can sealed cassettes be swapped robotically, or refilled at SEL1?
   - What is the fully burdened argon alternate? 200 t of liquid argon is ~143 m³ before tankage. Claude finds argon fails to close the 5 km/s-per-leg envelope.
4. **Contamination of arrays, radiators, optics and node surfaces:**
   - What iodine deposition rate is acceptable? Claude sets a <5% end-of-life power-loss criterion.
   - Does deposition scale with fleet traffic at the node?
   - What plume keep-out geometry is required?
5. **Heavy-cargo capture and flexible-body control:**
   - How should a 300–400 t vehicle with 160–240 m flexible wings (first modes ~0.03–0.08 Hz) capture a pallet?
   - What evidence counts as TRL 6 when ground tests cannot reproduce full-mass microgravity dynamics?
   - Who provides the NEA staging platform? Claude's design assumes a ≥1 km standoff platform from bom-0-3. Gemini contemplates docking and LRU swaps at the NEA.
6. **Launch packaging and injection:** How are stowed vehicles of 38–70 t dry, plus initial propellant, packaged for launch?
   - Claude: ≤8 m × 18 m stowed, ~65 t per launch, injected at C3 ≥ −2 km²/s² with no MW deployment in LEO.
   - GPT: multi-launch assembly may be needed.
   - Who supplies high-energy injection, at what price?

## Recommended Approach

1. **Freeze one baseline, TUG-BL-0, with power specified at a stated distance and age.** Adopt GPT's rule: propulsion input is specified at a stated heliocentric distance (e.g., 1.3 AU) and at end of life.
   - Carry a provisional point of **~1.2–2.0 MWe to the PPUs at that condition**.
   - Size the array from that point. This implies roughly 2.5–4.8 MW BOL at 1 AU, which is larger than Claude's and Gemini's 1.5 MWe BOL.
   - Keep Claude's growth scar so the point can move within 1.0–2.5 MWe once the named-target trajectory study (OQ-1) reports.
   - Mark the round-1 800 kWe and 1.5 MW human-rated freighters, and the 300 kWe concept, as superseded.
2. **Use a modular, power-rich propulsion cluster.**
   - Use 15–24 strings of ~100 kW with N+1 to N+4 spares, independent PPU and feed isolation, and robotically swappable wear kits treated as consumables.
   - Run at **~2,500 s Isp** to cut propellant, the dominant recurring cost.
   - Throttle down to ~1,600 s for window catch-up and collision avoidance.
   - Set a qualification target of **≥9–10 t of iodine throughput per wear-kit or string interval**, with the wear test started by 2030.
3. **Adopt sealed, swappable iodine cassettes and size storage to the Δv envelope.**
   - Use sealed swappable cassettes (Claude and GPT), not open bulk-solid transfer.
   - Carry **~100–150 t installed capacity**. This covers a 5 km/s-per-leg envelope without GPT's full 200 t penalty and can be revisited after T14 tests.
   - Keep an Argon Feed Module variant to PDR per D-05, and use the iodine variant for facility planning. Claude notes iodine's condensability makes MW-class ground testing feasible.
4. **Carry a realistic cost and procure in gated tranches.**
   - Budget **~$0.3–0.8B per unit including arrays**. Treat Gemini's $220M and the low end of round-2 ($150M) as not closing at the agreed $30–150/W once arrays are rated at the operating condition.
   - Carry a **0B item total of ~$3–10B**, with 0A tug design to PDR at **$40–90M** in bom-0-4. Book qualification and the pathfinder in bom-0-11 and bom-0-12.
   - Procure **2–4 vehicles at KDP-0B**. Size the remaining tranche (to a total of 10–18) only after the first full cycle has shown real cycle time, wear-kit life and signed Phase 1 demand.
5. **Close the full thermal ledger before PDR.**
   - Account for all non-jet power (~0.5–0.8 MW per tug) across plume, direct head radiation and the active loop, verified by integrated calorimetry.
   - Size the active loop from that data, within a range of 100–450 kWt.
   - Reclassify tug T03 to architecture-change only if test data confirms Claude's low active-load estimate.
6. **Keep the tug off the asteroid surface and standardise interfaces.**
   - The tug captures pallets at a standoff staging point. This requires a new interface requirement on bom-0-3.
   - Use a heavy-cargo capture ring rated for ≤2 cm/s closing speed and two-fault-tolerant against inadvertent release (interim ≤10⁻⁴ per transfer).
   - Product acceptance specification: mass ±1%, CG within 0.25 m of the interface axis, no particulates larger than 1 mm, plus fiducials.
   - Carry a non-crew-rated generic service interface. Settle the dockside power question (0 to 250 kWe) jointly with bom-0-13.
7. **Pass demands to other lines and gate on evidence.**
   - **bom-0-16:** ~280–400 t/yr of iodine (envelope 150–600 t/yr) and a signed supply covering ≥5 years at a stated price.
   - **bom-0-14:** ~70 wear kits and ~5 heads per year.
   - **bom-0-15:** plume keep-out values and an end-of-life disposition, preferring retirement to the node as Phase 1 spares or feedstock.
   - **KDP-0B entry:** TRL 6 with no waivers on T01, T02, T14 and T25, which requires a pathfinder flying at least one full-scale wing and a multi-string pod. A named-target cycle of ≤3.0 years. Iodine contamination of arrays shown below 5% end-of-life power loss.
   - **Fallback:** Earth-supplied material if any of these fails.
   - **Framing:** transport at ~$0.6–1.2k/kg is a capability programme under D-01, not a cost saving.