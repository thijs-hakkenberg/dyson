---
bomId: "bom-0-14"
itemName: "Spares and Replacements"
itemSlug: "spares-replacements"
type: "consensus"
generated: "2026-10-20"
phase: "phase-0"
---

## Key Specifications

- **Replace, don't repair, at the NEA.** All three models adopt a modular replaceable-unit scheme, called ORUs by Claude and Gemini and LRUs by GPT. Site robots swap units autonomously.
  - Component-level, open-board, precision-bearing and internal-thruster repair are excluded from production-critical maintenance.
  - Claude and GPT both define mass classes with a Class S at ≤25 kg in an envelope of about 0.4 m. Claude's Class M runs 25–500 kg; GPT's runs 25–150 kg.
- **One standardised robotic interface family.** It includes self-aligning capture features of about ±3° angular tolerance, captive hardware, and machine-readable identity. Identity is an EEPROM plus optical code (Claude) or RFID/NFC (Gemini), and is checked before installation. Wrong-revision or incompatible installs are blocked.
- **The NEA site holds the primary forward stock.**
  - Only stock at the NEA protects production, so NEA-critical spares are held there.
  - Earth is the replenishment and production pool.
  - SEL1 (the D-04 interim reference) holds a secondary cache for receiver-side and tug items.
  - Spares to the NEA ride the lightly loaded tug leg toward the asteroid.
- **Precision parts stay Earth-supplied throughout 0B.** This covers bearings, rad-hard electronics, HV switchgear, battery cells, thrusters and cathodes, seals and solar cells.
  - Local Fe-Ni fabrication is limited to non-critical mechanical items such as brackets, guards and fixtures.
  - It is not credited in the 0B baseline. Claude carries it as an option; GPT forbids credit until it is qualified; Gemini raises it as an open question.
- **Launch is excluded from this item.** Launch of spares mass is costed in bom-0-8. EP propellant (bom-0-16), qualification and life tests (bom-0-11) and ops staffing (bom-0-10) are also excluded. bom-0-14 supplies the mass manifest.
- **EP thruster and cathode life on iodine or argon is a top cost driver.** Abrasive wear at the regolith interface is the other. Claude and GPT rank thruster life first. Gemini flags iodine attack on grids as its key open question. All three tie the budget to the D-05 life tests.
- **Robotic exchange in regolith dust, especially through 1–3 kV connectors, is a gating technology.**
  - It must be demonstrated on the 0A pathfinder at TRL 4–5.
  - It must reach TRL 6 in a relevant environment at KDP-0B with no waivers.
  - Demonstrated recovery from failed or jammed swaps is required, not only nominal swaps.
- **Prognostics and health monitoring drives replacement.** This means a digital twin or traveller per serialised unit, plus a deterministic safe state when a swap fails (the mechanism latched or parked, never free). Ground supervises criticality-1 swaps only.
- **Storage must be conditioned and shelf-life qualified.**
  - Electronics are held within about −20 to +40 °C. Claude specifies 0–25 °C, with batteries at partial state of charge.
  - Batteries, lubricants, seals and HV insulation need storage-equivalent qualification of up to about 3 years in deep space.
  - Storage and maintenance loads must be fed into the bom-0-5 power budget.

## Divergent Views

- **Sizing method:**
  - Claude recommends physics-based, multi-echelon (METRIC-type) sparing. Each item is classed as random failure, wear-out or attrition. Stock is set by lead-time demand at stock-out targets of α = 2%, 10% and 25% by criticality. Claude rejects flat percentages.
  - Gemini prefers percentage buffers: about a 20% inventory buffer overall, 20–30% for wear items and 10% for avionics. This equals about 15–20% of initial deployed mass, or 40–60 t.
  - GPT suggests item-specific Poisson and lead-time screening. Its targets are criticality-A stock-out below 0.5–1% per replenishment interval and stock-out loss below 1–2 percentage points of annual production. GPT also rejects the 20% rule.
- **0B cost and campaign horizon:**
  - Claude recommends a 10-year basis of P10 $1.1B / P50 $2.0B / P90 $3.4B. This is roughly $600M of initial provisioning plus about $145M/yr. Claude says the round-2 Claude $0.5–1.5B figure is too low because it under-weights thruster wear and robot attrition.
  - Gemini prefers $0.6–1.4B, covering the initial cache plus 5 years of replenishment. Gemini calls GPT's $2.5B upper bound evidence of an unsuitable reliability baseline.
  - GPT suggests $0.65–1.55B over 5 years including robots. GPT treats $0.8–2.5B as a defensible high-risk envelope but not the default.
  - On a common 5-year basis, Claude's P50 is about $1.3–1.4B, inside GPT's range. The real gap is in the time horizon and the treatment of the tail.
- **Imported spares mass:**
  - Claude recommends planning for 150–600 t over 10 years, about 27 t/yr at steady state plus 105–150 t of initial provisioning. That is about 15–30 kg per tonne of product. Claude's drivers are thrusters, wear parts and eclipse-cycled batteries.
  - Gemini prefers 40–60 t as the initial cache.
  - GPT suggests 80–180 t delivered over 5 years, with 45–60% deployed initially.
- **Tug sparing and servicing location:**
  - Claude recommends SEL1 as the mandatory logistics hub. Class-L tug units such as thrusters and array segments would be swapped there by the node manipulator in 24–72 h. Claude would also add a contingency kit of about 2 t at the NEA and require N+k thruster redundancy for ≥99% probability of completing a round trip without service.
  - Gemini prefers routing all spares through SEL1, with tug self-maintenance there left as an open question.
  - GPT suggests using SEL1 only where trajectories justify it. GPT would add small tug-carried recovery kits, installed fault tolerance for in-transit failures, and an explicit whole-tug-loss policy. That policy would choose between fleet margin, a funded replacement tug, or reduced delivery.
- **0A funding and ownership:**
  - Claude recommends $20–50M (central $30M) inside bom-0-14. This covers the interface standard, the sparing model, the reliability database and 5–12 test ORUs for the pathfinder.
  - Gemini prefers $50–100M for interface R&D and pathfinder spares.
  - GPT suggests $20–45M, charged to bom-0-11 and bom-0-12 and not added again to bom-0-14.
- **Replenishment lead time:** Claude recommends designing to 3.0 years Earth-to-NEA, within a 2.5–4 year range. Gemini does not specify a value. GPT suggests 18–30 months, to be refined from actual trajectories.

## Open Questions

1. **Thruster life.** What are the demonstrated cathode, wall and grid erosion lifetimes of 100 kW-class thrusters on iodine and on argon? Does argon force a different thruster class with different unit sizes?
   - This is the largest single cost lever. In Claude's estimate, a 15 kh life roughly doubles the tug line and a 60 kh life halves it.
2. **Wear and attrition in vacuum and milli-g.** What are the abrasive wear rates per tonne processed for cutters, liners and screens, including beneficiation rejects? What is the annual loss rate of tethered robots? Claude's assumed range is 5–25%/yr, which it calls the least-known number in the item.
3. **Target-specific resupply.** What are the real replenishment opportunities and lead times for the selected NEA? GPT argues these may dominate inventory more than component reliability does.
4. **Tug servicing and whole-tug loss.** Can tugs present propulsion modules for robotic exchange, and where: at SEL1 only, or at the NEA as well? What is the right trade between N+k installed redundancy and loose spares? How should a lost tug be covered?
5. **Site-power eclipse cycling.**
   - Does bom-0-5 avoid eclipse? Claude estimates this alone swings spares mass by up to about 150 t.
   - Which stored spares need conditioning power, and what happens to them after a prolonged power loss?
6. **Local manufacture and retention.** At what import fraction do Fe-Ni wear parts with imported hardfacing break even against launch cost? What retention or disposal requirement will the licensing state impose on failed units under the D-03 ALARP regime?

## Recommended Approach

1. **Size spares by item, from demand physics and lead time; reject the flat 20% buffer.**
   - Adopt a multi-echelon model (Earth, SEL1 cache, NEA forward depot) with random, wear-out and attrition demand classes.
   - Set criticality-based stock-out targets. Claude's α = 2% for production-stopping items is the starting point, to be tightened toward GPT's 0.5–1% where the model shows it is affordable.
   - Couple the model to a tug-traffic simulation.
   - Re-size at KDP-0B to the selected target and to signed Phase 1 demand.
2. **Carry the 0B budget as a rate plus initial provisioning, not a lump sum.**
   - Planning value: about $0.5–0.9B of initial provisioning plus about $70–250M/yr.
   - This gives about $0.65–1.55B over 5 years (P50 about $1.3B) and about $2.0B P50 over 10 years.
   - Place the P50–P90 increment in bom-0-17 as a named, quantified risk.
   - Report a $/kg-of-product metric to the economics gate. Claude estimates about $155/kg at P50.
3. **Include robot attrition and whole-robot replacements in bom-0-14.** bom-0-2 then means the initial fleet only. Require an explicit whole-tug-loss decision at the gate, choosing between bom-0-4 fleet margin, a funded replacement, or a contracted shortfall.
4. **Use SEL1 as the tug-servicing and consolidation point while D-04 holds.**
   - Hold NEA-critical stock at the NEA, sized for the full resupply interval (18 months to 4 years).
   - Require every tug to carry one standard logistics pod toward the NEA without losing product capacity on the return leg.
   - Keep the hub location-agnostic in case D-04 flips.
5. **Fund 0A enabling work of about $20–45M under a single owner.** This covers the interface standard, the sparing model and reliability database, and dust-chamber and pathfinder swap demonstrations.
   - The pathfinder must log at least 20 swaps and about 200 robot-hours of failure data, and must include one HV connector.
   - Dust-tolerant 1–3 kV exchange, surface Class S/M swap and free-space Class L swap must reach TRL 6 at KDP-0B with no waivers. Fund two parallel HV connector designs.
6. **Buy reliability upstream where it returns more than spares do.**
   - Run joint trades with bom-0-2, -4 and -5 before CDR on actuator MTBF, thruster life, N+k redundancy and eclipse-free site power.
   - Hold commonality to about 400 or fewer part numbers, standardising interfaces rather than internal designs to avoid common-cause defects.
   - Use multi-lot procurement.
   - Make a rad-hard EEE lifetime buy at KDP-0B (Claude estimates about $40–80M).
   - Keep the thruster and PPU line warm rather than making a lifetime buy of thrusters.
7. **Keep the debris and contamination discipline from the outset.**
   - Nothing is jettisoned; packaging must not shed.
   - Failed units go to sealed retention pods or return selectively to SEL1, in compliance with bom-0-15.
   - Carry local Fe-Ni wear-part fabrication only as a gated 0B option, decided around year 3 on in-situ wear data and never credited in the baseline.