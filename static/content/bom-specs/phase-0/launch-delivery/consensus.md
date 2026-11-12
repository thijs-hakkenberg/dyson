---
bomId: "bom-0-8"
itemName: "Earth-to-Space Launch and Delivery"
itemSlug: "launch-delivery"
type: "consensus"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-8 Earth-to-Space Launch and Delivery: Consensus Synthesis

## Key Specifications

- **No LEO electric-propulsion spiral in the baseline.** All three models want chemical departure on commercial vehicles to high energy or escape (C3 ≈ 0, or SEL1 transfer at C3 ≈ −0.7 km²/s²).
  - All three cite Van Allen belt degradation of MW-class arrays and debris exposure.
  - GPT alone keeps LEO-to-escape EP as a 0A-demonstrated option. Claude rejects it outright for tugs.
- **Commercial launch only, with interfaces that allow at least two vendors.** No bespoke launcher or kick-stage development.
  - All three treat super-heavy vehicles as useful, but warn against a single-vendor design dependency.
  - This warning is weakest in Gemini, whose 0B plan depends on super-heavy vehicles.
- **LEO and delivered prices are reported separately.** No model accepts a single undifferentiated $/kg figure.
  - Claude: four prices (P_LEO, P_dep, P_hand, P_site), defined in §1.3.
  - GPT: LEO access, onward delivery and campaign integration as three cost terms.
  - Gemini: "LEO-equivalent" mass and price alongside "delivered" mass and price.
  - GPT warns that, for direct-injection contracts, these are accounting allocations within one purchased service, not separate flights.
- **Phase 0A launches tens of tonnes, at roughly $0.2–0.9B.**

  | Model | 0A mass | 0A cost range | Reference value |
  |---|---|---|---|
  | Claude | ~16 t (7–34 t) | $0.25–0.74B | $0.42B |
  | Gemini | 50–80 t delivered | $0.20–0.48B | — |
  | GPT | 50 t (25–100 t) | $0.25–0.90B | $0.50B |

  All three expect early per-kg prices to be high because 0A buys dedicated or rideshare missions.
- **Phase 0B launched mass is of order 2.4–4 kt** at the planning point. This is several hundred tonnes of hardware plus a propellant block of comparable or larger size.

  | Model | Central / reference | Range |
  |---|---|---|
  | Claude | 2.43 kt | 1.3–4.5 kt (P10–P90) |
  | Gemini | ~2.4 kt delivered | ~3.05–3.5 kt LEO-equivalent |
  | GPT | 4.0 kt cargo manifest | 2.5–6 kt |

  - All three reject 8 kt as a planning value. GPT keeps it only as a stress case.
- **EP propellant launches from Earth in sealed, Earth-filled containers.**
  - Claude: iodine cartridges, 5.3 t net each, carried two per Earth Departure Carrier (EDC).
  - Gemini: "smart tanks".
  - GPT: commodity-specific tanks, with Earth loading preferred.
  - No model baselines in-space fluid transfer or a cryogenic depot.
  - Iodine is costed as the reference propellant and argon as the alternate (D-05). All three flag argon's high-pressure tank mass penalty: Claude puts its tank fraction at 20–30%; GPT proposes a 20–35 MPa trade study.
- **Upper stages are disposed of under contract.** Options are heliocentric escape or Earth re-entry. Nothing is left in LEO, high Earth orbit or cislunar space.
  - bom-0-8 implements the bom-0-15 policy and pays for the disposal burns.
  - Claude sets a disposal success probability of ≥0.999 per stage. GPT declines to set a numeric threshold until D-03 is resolved.
- **Launch environment design envelope**, subject to vehicle-specific coupled loads analysis:
  - Acoustic about 142 dB OASPL (Claude, Gemini).
  - Axial load of about 6 g (Claude +6/−2 g; Gemini ~6 g; GPT 3–6 g preliminary).
  - Scouts fly on ESPA-Grande rideshare ports (Claude, Gemini); GPT allows rideshare or dedicated launch.
  - Large modules use 2624 mm clampbands (Claude, Gemini).
  - Providers must supply payload-versus-C3 curves, not LEO capacity figures (explicit in GPT and Claude).
- **0B is a large logistics campaign, released in tranches only after KDP-0B.**
  - The campaign spans tens to hundreds of launches.
  - Sequence: receiving node and infrastructure first, then the first tugs and site cargo, then expansion only after commissioning.
  - Hardware is modular, so a single launch failure is survivable. Claude sets this as requirement DEL-006: losing one launch removes ≤1/3 of any critical function.

## Divergent Views

- **0B cost and what it includes**: Claude recommends a $9.3B P50 planning value (P10–P90 $4–16B). This covers propellant for the full 5-year production run (1.57 kt gross) plus about 170 EDCs and pallets.
  - Gemini prefers $2.5–5.4B. Its total is $2.7–5.9B including 0A. This assumes mature reusable super-heavy pricing and covers only 1.2 kt of *initial* propellant.
  - GPT suggests $7.3B as a reference (range $3.25–15.7B). This covers only 800 t of initial propellant. Recurring replenishment of 300–900 t/yr, about $0.5–2.5B/yr, is excluded and must be added at the gate.
  - **These totals are not like-for-like.** Once GPT's replenishment is added over a 4–6 year run, its figure converges toward or above Claude's.
- **Mass floor and scaling basis**: Claude recommends 1.3–4.5 kt. It rejects the round-2 floor of 2.5 kt because D-01 sizes 0B by signed demand, and a low-demand case (0.6 kt/yr × 4 yr) needs only about 1.3 kt.
  - Gemini prefers about 2.4 kt delivered. Its plant (800 t) and tugs (15 × 50 t) are heavier than Claude's. Its figures are internally inconsistent: it states escape payload is 30–35% of LEO capacity, but its ~3.5 kt "LEO-equivalent" total implies a far higher ratio.
  - GPT suggests 2.5–6 kt with a 4 kt reference. This uses heavier placeholders: tugs at 65 t dry each, 550 t of site power, and 440 t of delivery-only carriers.
- **Handover point and the deep-space leg**: Claude recommends one gateway at SEL1, reached by direct injection at C3 ≈ −0.7. Passive EDCs and pallets are captured by the receiving node (bom-0-13). Tugs carry site cargo on outbound legs that would otherwise fly empty, so the NEA leg is a marginal cost.
  - Gemini prefers handover in high Earth orbit or at escape. Tugs take over for transit to the NEA or SEL1, and smart tanks dock with tugs in high Earth orbit.
  - GPT suggests a mixed campaign. About 55% of cargo uses LEO staging or low-energy handover, and about 45% departs directly. Acceptance has four milestones (launch, cruise, destination, operational handover), and the "delivered" price is not paid in full at launch.
- **Module size, launcher dependence and tug power**: Claude recommends a "Class M" module limit of ≤12 t at C3 −0.7 within Ø4.5 m × 10 m, flyable on at least two vehicle families.
  - On that basis Claude recommends tugs of 1.2–1.5 MWe launched as two modules each. 2.5 MWe tugs would be infeasible without demonstrated refuelled super-heavy delivery.
  - Gemini prefers designing to fairings up to 8 m × 18 m, launched as 20–30 super-heavy flights.
  - GPT suggests two classes: standard (10–25 t, ≤4.5 m) and heavy (25–60 t, ≤7 m), with a 1.5 MWe tug used for screening.
- **Launch price basis**: Claude recommends departure prices (P_dep) of about $3.8k/kg for hardware and $3.0k/kg for propellant, and SEL1 handover prices (P_hand) of $4.7k/kg for hardware and $3.8k/kg for iodine. It treats mature super-heavy pricing as an upside, not a planning value.
  - Gemini prefers $4–6k/kg delivered in 0A, falling to $2.5–4.5k/kg in 0B.
  - GPT suggests $800–1,800/kg to LEO plus an onward-delivery charge, giving about $1.8–2.6k/kg effective at the reference point.
  - All three regard the round-2 $3,000–12,000/kg range as ambiguous: it does not say which boundary it refers to.
- **Cadence and launch count**: Claude recommends about 210 Class M-equivalent launches over about 8 years, roughly 25 per year. The alternative is about 27 super-heavy departures plus 80–160 tanker flights.
  - Gemini prefers 20–30 super-heavy launches within a 24-month campaign.
  - GPT suggests 60–160 principal missions, with additional departure-stage or tanker flights if the architecture aggregates in orbit.

## Open Questions

1. **Tug fully burdened dry mass and module split** (bom-0-4). Estimates range from Claude's ~24 t to GPT's ~65 t. Can a 1.2–1.5 MWe tug fit two ≤12 t modules? Should the Class M limit be 12 t or 15 t, given vendor-confirmed C3 −0.7 performance?
2. **Propellant intensity, horizon and packaging.**
   - Intensity: Claude estimates 0.15–0.35 kg of iodine per kg of product.
   - Horizon: what share is initial load versus replenishment over the funded operating period?
   - Packaging: iodine versus argon tank fraction. Claude estimates argon adds about 20% launched mass and $0.9–1.0B.
   - Ownership: should propellant launch sit in bom-0-8 (8b) or bom-0-16?
3. **In-space propellant handling at TRL 6.** This means cartridge or tank mating, heated vapour coupling, long-term sealed iodine storage, and autonomous capture of passive targets in halo orbit. Can the 0A pathfinder (bom-0-12) fly these before KDP-0B, as D-02 requires with no waivers?
4. **Is a LEO propellant route worth adding?** This would be a LEO depot plus a dedicated cislunar EP shuttle (Claude's Mode P, estimated to save $1–2B) or GPT's partial LEO staging. The saving must be weighed against debris and radiation-belt exposure under ALARP (D-03).
5. **Launch-rate capacity.** Can providers, ranges and integration facilities sustain 25 or more high-energy launches per year? What are the FAA licensing and environmental limits on that cadence?
6. **Earth-supply benchmark and gateway location.**
   - Claude estimates the launch cost embedded in each kg of product at about 30–45% of the Earth-supply benchmark price at any launch price. On this view, cheaper launch weakens 0B's relative economics.
   - Which launch-price index, and which vintage, should govern KDP-0B?
   - Moving the gateway to SEL4/L5 would add roughly +1 to +3 km²/s² of C3 and 1–2 years of latency (D-04).

## Recommended Approach

1. **Replace the single line total with a mass × price ledger split into three sub-lines**: 8a hardware delivery, 8b propellant delivery, 8c delivery infrastructure.
   - Report P_LEO, P_dep, P_hand and P_site separately, and never add P_site to the tug or propellant lines.
   - Restate the round-2 $3,000–12,000/kg against these boundaries.
   - The end product of 0A should be GPT's "closed delivery ledger": every module has a mass, launch slot, departure state, propulsion allocation, arrival condition, acceptance test, disposal plan and price.
2. **Fund 0A at about $0.45B reference, within a $0.25–0.9B staged envelope.**
   - Cover scout rideshares, pathfinder launches and subsystem demonstrations.
   - Develop the carrier (EDC) to critical design review.
   - Obtain binding, C3-specific vendor quotes by 2027.
3. **Carry 0B as a planning value only, of about $8–9B P50 within a $3–16B band.** Re-size it at KDP-0B from signed demand.
   - Reject the 2.5 kt mass floor. Plan on about 1.3–6 kt, with a central value near 2.5–4 kt.
   - Gemini's $3–6B is treated as an upside requiring mature refuelled super-heavy delivery, not a baseline.
   - Include propellant replenishment over the full funded 0B run, not only the initial load.
4. **Baseline direct high-energy injection to an SEL1 handover, consistent with D-04.**
   - Prohibit LEO loiter of more than 14 days for Phase 0 elements.
   - Use outbound tug legs for site cargo.
   - Keep a LEO propellant route as a funded study, to be decided by 2030.
   - Contractually require upper-stage disposal to heliocentric escape or re-entry.
5. **Design every element to a dual-sourced module class of about 12 t at C3 −0.7 within Ø4.5 m.**
   - A super-heavy class (multi-module bundles) is used only for bundling, and every bundle must decompose into standard modules.
   - Direct bom-0-4 to close the two-module tug trade (1.2–1.5 MWe versus up to 2.5 MWe) by 2028.
   - Apply DEL-006: any single launch loss removes ≤1/3 of any critical function.
6. **Manage risk through tiering and self-insurance, not commercial insurance.**
   - Fly unique critical hardware on mature vehicles. Fly fungible propellant on discounted or early-flight vehicles.
   - Hold a launch-loss reserve in bom-0-17 of about 5% of launch value (~$0.45B central).
   - Buffer at least one year of propellant at the receiving node.
   - Pay for delivery against GPT's staged acceptance milestones, not in full at launch.
7. **Make the 0A pathfinder carry the delivery-critical demonstrations to TRL 6.** These are cartridge or tank exchange, halo-orbit capture, and dormant-payload survival.
   - Require the KDP-0B economic gate to use the same launch price model and vintage for both Phase 0 costs and the Earth-supplied-material benchmark (Claude's DEL-007).
   - The aim is that the capability framing of D-01 is assessed honestly.