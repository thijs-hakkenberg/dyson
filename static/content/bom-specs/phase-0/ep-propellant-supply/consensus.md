---
bomId: "bom-0-16"
itemName: "Electric-Propulsion Propellant Supply"
itemSlug: "ep-propellant-supply"
type: "consensus"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-16 Electric-Propulsion Propellant Supply: Consensus Synthesis

## Key Specifications

- **Propellant policy.** No propellant is selected before the gate (D-05).
  - Iodine is the costed reference and argon the maintained alternate.
  - Xenon is excluded. Programme demand would exceed world output (~50–70 t/yr) several times over.
  - Claude also excludes krypton for main, cathode and RCS use. GPT allows xenon only for small test equipment.
  - Water EP stays a desk study until a C-type target is confirmed.
- **Demand order of magnitude.** All three converge on roughly **200–400 t/yr of iodine for ~1.0–1.3 kt/yr of delivered Fe-Ni**:
  - Claude: nominal 400 t/yr, contract range 150–700 t/yr.
  - Gemini: 200–400 t/yr.
  - GPT: reference 230 t/yr, envelope 150–450 t/yr.
  - All three reject the round-2 figure of 900–1,200 t/yr as a baseline. It is reproducible only in a corner case (≥6 km/s per leg at ≤2,500 s, or 2.5 kt/yr), and GPT's demanding case of ~1,250 t/yr confirms this.
- **Demand method.** All use a rocket-equation round-trip model, so propellant is about 0.2–0.27 kg per kg of product delivered.
  - Claude's reference: 30 t dry mass, 200 t payload, 4 km/s per leg, 2,500 s, giving 53 t per trip.
  - GPT's reference: 80 t dry mass, 200 t payload, 3 km/s per leg, 3,000 s, giving 40 t per trip.
  - Both apply a ~15% operations allowance.
  - Both give a thrust check of about 73–75 N and 2.5–3.0 g/s per 1.5–2 MWe tug.
- **Commodity price.** Iodine is planned at **$35–70/kg** (Gemini $40–60/kg). At 230–400 t/yr the commodity costs $8–29M/yr.
  - All agree the commodity is a minor share of delivered cost.
  - Delivery, carried in bom-0-8, dominates: Claude estimates $0.44–2.2B/yr and GPT $0.7–3.9B/yr.
  - Imported mass to SEL1, not $/kg of iodine, is therefore the quantity to optimise.
- **Logistics form.** Iodine travels as solid in sealed, modular cartridges of about **5 t**, swapped robotically onto tugs. Iodine is not transferred as a fluid between spacecraft.
  - GPT keeps an integral refillable tank as a trade to evaluate in 0A.
  - The only wet connection is a heated, low-pressure vapour outlet feeding the feed system owned by the tug (bom-0-4).
- **Thermal and feed regime.**
  - The bulk reservoir is held at about 80–110 °C, below iodine's 113.7 °C melting point. Melting brings ~25% volume growth.
  - Vapour lines run hotter than the reservoir, at 100–160 °C, so iodine cannot condense and clog them.
  - Sublimation heat is about 0.5–0.75 kW per active cartridge at reference flow. Total heater allocation is about 0.5–5 kW, supplied by the tug.
- **Materials.**
  - Wetted paths use Ni-base alloys (Hastelloy C-276, Inconel 625), PTFE/PFA and ceramics.
  - Copper and silver are excluded from wetted paths. Aluminium is acceptable only with a qualified fluoropolymer liner.
  - Iodine attack on Ag solar-cell interconnects is a named contamination driver for bom-0-15.
- **Argon penalty.**
  - Storage tankage is about 20–30% for compressed argon, against about 5–13% for iodine cartridges.
  - Volume is about 10× larger; Claude estimates ~890 m³/yr as gas at 400 t/yr.
  - Mass to SEL1 rises by roughly 15–20%.
  - All three prefer compressed argon over liquid argon, to avoid bringing back cryogenic fluid management in Phase 0.
- **Gating.** Internal 0A milestones are at TRL 4–5. At KDP-0B, the selected propellant chain must be at TRL 6 with no waivers. The chain covers thruster and cathode, feed, reservoir, robotic interface and contamination control.

## Divergent Views

- **What bom-0-16 owns in 0A, and its budget.**
  - Claude carries the full logistics development in this line: PCU and coupling development, the fill pilot line and pathfinder hosted hardware, for **$75–185M**.
  - Gemini carries **$35–50M** for materials, valves and thermal-vacuum work.
  - GPT keeps only **$0.5–1.7M** direct (audit, specification, samples). It assigns $10–35M of development to bom-0-11 and bom-0-12.
- **SEL1 handling infrastructure.**
  - Claude specifies a free-flying **Propellant Yard** at 5–20 km standoff, with 20–32 berths and 2 servicers. 0B capital is $180–475M; a hosted option saves $60–150M.
  - Gemini assumes cartridge buffer storage at the bom-0-13 node.
  - GPT assigns berths and robots to bom-0-13. It leaves the handover point open: node, NEA, or split.
- **Cartridge cost, and therefore the recurring line cost.**
  - Claude: a $0.3–1.0M PCU inside a $1.4–4.5M 15 t pallet. Recurring cost is **$72–205M/yr** at 400 t/yr, or $180–510/kg before launch.
  - Gemini: $250k per 5 t cartridge. Recurring cost is **$27–33M/yr** at 300 t/yr.
  - GPT: $0.15–0.45M per 5 t cassette. Recurring cost is **$16–45M/yr** at 230 t/yr.
  - Package mass fraction also differs: Claude 5.6–7.6%, Gemini ~5%, GPT 6–13%.
- **Demand basis.**
  - Claude: 400 t/yr at 1.3 kt/yr, using a 30 t tug dry mass, 2,500 s and 4 km/s per leg.
  - Gemini: 200–400 t/yr at ~1 kt/yr and ≥3,000 s, with no worked derivation.
  - GPT: 230 t/yr at 1 kt/yr, using an 80 t dry mass, 3,000 s and 3 km/s per leg. Its sensitivity envelope is 60–1,250 t/yr.
- **Disposition of empty cartridges.**
  - Claude retains empties at the yard (~35–40 t/yr) as Phase 1 or NEA scrap feedstock.
  - Gemini baselines return to Earth for refill.
  - GPT treats disposable versus reusable as an open trade on lifetime cost per usable kilogram.
- **Gate metric and argon pressure.**
  - Claude proposes a **Propellant Import Ratio (PIR)** at KDP-0B: target ≤0.35, hard limit ≤0.50. It specifies argon COPVs at 300 bar.
  - Gemini proposes no metric and specifies argon at 700 bar.
  - GPT poses the import-burden threshold as an open question and suggests 20–35 MPa.

## Open Questions

1. **Δv per leg.** What is the real low-thrust Δv per leg for the candidate NEA and the SEL1 handover, including phasing, eclipse and reserve? It is the single largest demand driver, moving R from about 0.13 to 0.61 across 3–6 km/s and 2,000–3,500 s.
2. **Thruster life and Isp.** Can iodine (or argon) thrusters reach about 3,000–3,500 s at MW-cluster scale with acceptable life?
   - A round trip needs about 4,300 h of accumulated thrusting.
   - Can iodine-tolerant cathodes (LaB₆, C12A7 electride) remove the need for argon cathode gas, which is 7–10% of anode flow?
3. **Cartridge feed behaviour at scale.** Will a 5 t sublimation reservoir feed uniformly at 0.2–4 g/s and reach ≤3% residual?
   - Will it survive launch without fracture or voids in the cast solid?
   - Is a segmented or fin-matrix design required? Flight heritage is at ~100 W, roughly 1,000× below the required flow.
4. **Contamination limits.** What iodine fluence can Ag-interconnect arrays, cold radiators and optics tolerate? That limit sets the plume keep-out radius (Claude's planning value is 50–200 km) and the yard standoff. Leak and demate source terms go to bom-0-15 under D-03.
5. **Cassette exchange versus refillable tanks, and empties.** Does cassette exchange beat integral refillable tanks on delivered cost per usable kilogram? Should empties be discarded, kept as scrap, or reused, given that return to Earth adds down-mass?
6. **Import-burden threshold.** At what ratio should the programme cut output, change target, or switch to the Earth-supplied fallback? This links to Claude's PIR and GPT's question 12.

## Recommended Approach

1. **Planning demand (not an authorised purchase).**
   - Carry **230–400 t/yr steady state** (nominal ~300 t/yr) for 1.0–1.3 kt/yr of product.
   - Carry a contract envelope of **150–700 t/yr** and a one-time 0B ramp of **350–650 t**, which includes a 3–6 month yard stock.
   - Record disagreement with the round-2 figure of 900–1,200 t/yr as a baseline. It is a gate-failing corner, not a budget case.
   - Add argon auxiliary gas of 15–45 t/yr (RCS, proximity operations, possible cathode flow).
2. **Cost by delivered mass, and add an import-ratio gate.**
   - Add an import-ratio criterion to the KDP-0B target and economics gates. Use Claude's **PIR ≤0.50 as an interim hard limit, with ≤0.35 as target**, and make the final value subject to the Δv model.
   - Require bom-0-8 to carry the propellant launch load explicitly: about **250–440 t/yr** including a ~1.06–1.10 packaging factor.
3. **Resolve the scope split to prevent double-counting.**
   - **bom-0-16 owns** the supply audit, specification, materials coupons, test propellant, fill/QA pilot line, recurring cartridges and water desk study. Direct 0A cost is **~$20–60M**, from Claude's A1–A3, A6, A9 and A10.
   - **Development goes to bom-0-11 and bom-0-12, tagged to this item.** This covers cartridge, coupling and argon-track development (~$40–95M, bom-0-11) and pathfinder hosted cartridge hardware (~$15–35M, bom-0-12).
   - GPT's $0.5–1.7M is too narrow to include the specification and fill work this line must own. Claude's $75–185M is not wrong in total, only in where it is booked.
4. **Reference logistics architecture.**
   - Use sealed **5 t iodine cartridges** inside a **propellant-agnostic pallet**, so the same frame, latch and coupling envelope accepts argon modules.
   - Allow no in-space fluid transfer.
   - Use argon only for final approach near the node and yard, and prohibit iodine thrusting inside the keep-out zone.
   - Allow no xenon or krypton cathode or RCS gas.
   - Carry compressed argon at 300 bar class as the alternate, and reject a cryogenic argon yard in Phase 0.
   - Reject Gemini's envelope of 1.2 m diameter × 1.0 m for 4.75 t: at about 86% solid fill it leaves no room for the heater matrix or ullage. Use about Ø1.3 × 1.7–1.8 m.
5. **Hold the SEL1 yard as a gated 0B option.**
   - Carry free-flying versus node-hosted handling as an open trade, decided at bom-0-13 SRR, with a placeholder of **$120–475M**.
   - Size it at KDP-0B against signed demand (D-01).
   - Budget recurring supply at **$40–200M/yr** before launch. Cartridge unit cost ($0.15–1.0M) is the main uncertainty, so drive it with design-to-cost targets after qualification.
6. **Couple the Isp trade to launch cost in bom-0-4.**
   - Direct bom-0-4 to include launch $/kg in the Isp optimisation, with a target trade range of **3,000–3,500 s**.
   - Going from 2,500 s to 3,500 s cuts demand by about 33%. The extra launch saved outweighs the 3–5 additional tug-equivalents needed for longer thrust arcs.
7. **Gate schedule.**
   - **SRR (~T+0.5):** supply audit confirms 400 t/yr is available from at least two suppliers at ≤5% of world output.
   - **Propellant Selection Decision (~T+3):** joint with bom-0-4 and bom-0-15. Requires ≥5,000 h life data, cartridge residual ≤5% and array-coupon results. Cap iodine-specific hardware spend before this point at about $60M.
   - **KDP-0B:** selected chain at TRL 6 with no waivers; leak ≤10 g/yr per cartridge and residual ≤3% demonstrated; contamination model validated against test data.