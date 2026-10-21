---
bomId: "bom-0-6"
itemName: "Water Pilot (C-type target only)"
itemSlug: "ispp-systems"
type: "consensus"
generated: "2026-10-20"
phase: "phase-0"
---

## Key Specifications

- **Scope, conditionality and exclusions.** All three agree:
  - There is one water-extraction pilot at the selected NEA.
  - It flies only if the target is confirmed C-complex (D-05).
  - It includes no production LOX/LH₂, no liquefaction or cryogenic storage, no zero-boil-off hardware, no EML1 depot, no production electrolysis, no ore shipment to a central station, and no crew.
  - Tug propellant supply (Kr/I/Ar) is excluded and stays in bom-0-16.

- **Output: 10–30 t/yr of purified water.**
  - All three final specifications converge on this envelope.
  - Claude's design point is 25 t/yr at 4 wt% recoverable water; GPT's is 20 t/yr at 6 wt% × 75% extraction × 95% capture.
  - The pilot is sized as an information purchase for T13, not around tug demand.

- **Round-2 1,500 t/yr / 2-unit proposal rejected.**
  - Claude and GPT reject it explicitly. It would need about 35–37 kt/yr of ore and about 1.3–1.5 MWₜₕ of heating, which is industrial scale with no Phase 0 consumer.
  - Gemini's own revised specification has dropped to 10–30 t/yr and one flight unit.
  - Claude's 100 t/yr upper bound is likewise dropped.

- **Process heat envelope.**
  - Heating is 0.15–0.45 kWhₜₕ per kg ore, counted once.
  - Bed temperature is a controlled variable inside a 150–800 °C qualification envelope, not a single setpoint.
  - The profile is staged, with low-temperature desorption first and phyllosilicate dehydroxylation last, to limit sulfur and carbon co-release. Claude caps the nominal profile at 650 °C; Gemini stages up to 750 °C; GPT uses 150–750 °C routinely.

- **Power class: about 100 kWₑ allocation from bom-0-5.**
  - Claude: ≤100 kWₑ peak, about 66 kWₑ average.
  - GPT: 75 kWₑ continuous, 100 kWₑ peak, 30–45 kWₑ while producing.
  - Gemini: 50–150 kWₑ peak.
  - Bulk energy storage stays with bom-0-5. The pilot carries only a small ride-through or safe-mode battery.

- **Electrolysis.** Any electrolysis is diagnostic only, with no H₂/O₂ inventory and no propellant.
  - Claude includes a 1 kWₑ PEM cell with a recombiner.
  - Gemini includes a 5 kWₑ PEM stack.
  - GPT includes no electrolyser.

- **Storage temperature and freeze management.** Product water is stored at about 278–310 K, in bladders or capillary/diaphragm tanks, with explicit freeze protection or freeze tolerance.

- **Low data rate.**
  - Average telemetry is ≤1 Mbps: Claude 20–100 kbps, GPT 10–50 kbps, Gemini 0.1–1 Mbps.
  - Bursts of 0.1–1 Mbps are allowed for imagery and anomalies.
  - The link goes through the bom-0-9 site relay. The round-1 figure of about 230 Mbps is not used.

- **Dry mass in the 5–11 t class.**
  - Claude: 7–11 t, point 9.5 t with 25% margin.
  - GPT: 5–8 t, point 6.2 t before growth allowance.
  - Gemini: 5–8 t.
  - Delivery is via bom-0-8 and bom-0-4 in a single tug slot.

- **Water EP is not a sizing driver.** All three treat water EP as a desk-study input only. The pilot's contribution is real impurity data.
  - Claude estimates fleet water-EP demand at 3–15 kt/yr, which is 100–500× the pilot.

## Divergent Views

- **Who owns heating and capture (the integration model)**:
  - Claude recommends dedicated spun canister-retorts (2 × 330 kg batches) fed by a ≤2 mm side-stream of 600–1,000 t/yr from the bom-0-3 crusher. Pilot heating is booked in bom-0-6. The pilot also serves as the pathfinder for bom-0-3's mandatory full-stream dewatering front-end. That front-end would liberate about 280 t/yr of water at about 7 kt/yr of ore, and would be pursued later as option W-2 (100–300 t/yr, $60–150M, not baselined).
  - Gemini prefers having no pilot retorts. It would tap the bom-0-3 off-gas manifold directly, with heating provided and counted by bom-0-3.
  - GPT suggests two independently isolatable 100–200 kg batch retorts with a dedicated, instrumented capture train. Feed would be 468 t/yr in sealed canisters of 1–20 mm material from bom-0-2. GPT's argument is that yield cannot be validated through an uncharacterised shared off-gas system.

- **Cost split and where 0A work is booked**:
  - Claude recommends $15–38M for 0A, unconditional and booked in bom-0-6 (excluded from bom-0-11 so the option value stays visible), plus $135–315M for 0B. Probability-weighted at P(C-type) = 20–40%, the 0B figure is about $27–126M.
  - Gemini prefers $120–180M of 0A NRE and qualification plus $150–220M of 0B flight hardware, totalling $270–400M.
  - GPT suggests $45–100M of 0A work, booked under the bom-0-11 NRE and bom-0-12 pathfinder lines (including a $15–35M water share of the pathfinder), plus $120–240M for 0B. That gives $165–340M direct.

- **Path to TRL 6 under D-02**:
  - Claude recommends a full-scale EDU in thermal-vacuum testing, plus spin-rig, parabolic and suborbital microgravity tests. It also asks bom-0-12 to carry an optional 50–150 kg mini-canister experiment for TRL 7 evidence, and starts a pre-target breadboard so TRL 6 can be met by a Y5–Y6 KDP-0B.
  - Gemini prefers TRL 3→5 in 0A and TRL 5→7 in 0B. This is inconsistent with D-02, which requires TRL 6 before KDP-0B with no waiver.
  - GPT suggests that relevant-environment TRL 6 must come from the bom-0-12 pathfinder before 0B is authorised. The 0B pilot cannot serve as evidence for its own commitment gate, and a short reduced-gravity test alone does not establish full-system TRL 6.

- **Water inventory and what happens when it is full**:
  - Claude recommends 10 t of storage (range 5–20 t). Disposition in order: supply bom-0-3, hold a W2 reserve, export on signed request, then reject into tailings (never vent).
  - Gemini prefers a 30 t working inventory and leaves controlled venting versus export as an open question.
  - GPT suggests 1–3 t (point 2 t). Extraction pauses automatically at the high-inventory threshold, with no disposal vent and no speculative stockpile.

- **Non-condensable gas and venting policy**:
  - Claude recommends one designated, mass-logged anti-sun vent for CO₂, CO, CH₄, N₂ and H₂, estimated at 3–13 t/yr (comparable to water output), booked against the bom-0-15 budget. Solids retention is ≥99.9% interim.
  - Gemini prefers regenerative sorbent pre-purification, with venting or flaring of diagnostic PEM products.
  - GPT suggests sorbent or contained collection, with no normal-process gas venting without authorisation. Escaped solids would be limited to 0.1–1 kg/yr, which is about 99.9998% or better retention.

- **Capture method, product grade and autonomy**:
  - **Claude** recommends:
    - Frost deposition on cold traps at 245–255 K, with a secondary trap at 185–200 K, melted in batches to avoid two-phase separation in microgravity.
    - Two grades with numeric limits: W1 process water at ≤10 µS/cm, and W2 electrolysis/EP-test water at ≤1 µS/cm and ≤0.5 ppm TOC.
    - Radiators of about 45 m² (25 m² cold, 20 m² main).
    - 30 days unattended operation at ≥50% throughput.
  - **Gemini** prefers:
    - Liquid condensation at about 5 °C, which needs capillary or centrifugal phase separation.
    - A 10–25 kWh battery.
  - **GPT** suggests:
    - Staged condensation or cold-trapping.
    - Utility-grade water only (≥99.5% water, ≤10 mg/L solids), with electrolysis grade not baselined.
    - Radiators of 80–180 m² effective area.
    - 30-day safe-storage survival only, not production.

## Open Questions

1. **Real recoverable water and release curve.** What are the release curves (temperature, pressure, time) for space-weathered C-complex surface regolith, as opposed to bulk CI/CM meteorites? The carried range is 2–8 wt%, and GPT proposes a screening threshold of about 2% net accepted yield. How heterogeneous is the material the mining system can actually deliver, and how much measured water is indigenous rather than contamination?

2. **Contaminant load and purification consumables.** What are the sulfur, organic, Cl and NH₃ loads in late-stage off-gas, and when do sorbent or ion-exchange beds break through? Claude estimates 150–400 kg/yr of resin and carbon, but this is unmeasured. The related question is whether a lower temperature cap (550, 650 or 750 °C) gives better net value once corrosion and wear are counted.

3. **Microgravity granular heating and phase management.** How long does heat take to penetrate packed hydrated cohesive fines, how reliably does feed transfer and discharge work, and does dust–vapour separation and condensate management work without gravity? A related question is what evidence the independent review board will accept as integrated relevant-environment TRL 6.

4. **Hot-path materials and seal life.** Can the hot path survive sulfidation near the Ni–Ni₃S₂ eutectic (about 637 °C)? Claude proposes FeCrAl or Co-Ni-Cr-Si alloys with no Ni-rich alloys; GPT leaves stainless or nickel alloys open pending corrosion testing. Can retort closures and rotary joints reach 500–1,500 thermal cycles in sulfur-laden dust?

5. **Disposition and licensing.** Will the licensing state permit gas venting, water rejection into tailings, or neither (D-03 ALARP)? What mass and particle-size limits apply to escaped solids? The answer sets the bom-0-15 budget for the whole C-type branch.

6. **Consumer and process coupling.** Does bom-0-3 in a C-type branch use an H₂-reduction loop (an internal consumer of 1–20 t/yr water make-up) or a carbothermal route? Is there any signed Phase 1 demand at SEL1, with quantity, grade, location and date, before KDP-0B?

## Recommended Approach

1. **Baseline one pilot at 10–30 t/yr, not more.**
   - Design point about 20–25 t/yr. One flight skid with two isolatable batch retorts, plus one ground EDU kept as the anomaly testbed.
   - Mass allocation 6–10 t dry plus growth.
   - Power allocation ≤100 kWₑ peak and about 75 kWₑ continuous.
   - Close the item at the target gate if the target is S, M or X type.
   - Record the rejection of the 1,500 t/yr / 2-unit and 100 t/yr figures in the configuration-controlled baseline.

2. **Give the pilot its own retorts and capture train, fed by a metered bom-0-3 side-stream.**
   - This follows Claude and GPT rather than Gemini's shared off-gas tap, because mass-balance closure to ±5–10% is the pilot's real product.
   - Book pilot retort heating in bom-0-6.
   - Formally adopt Claude's ownership boundary: full-stream dewatering heat stays in bom-0-3, and W-2 scale-up is a gated, unbaselined option requiring a signed ≥100 t/yr consumer.

3. **Fund a small unconditional 0A sub-line now, ahead of target selection.**
   - Planning range $15–45M for TGA-EGA characterisation on CI, CM and CR material, a quarter-scale breadboard, sulfidation and seal coupon cycling, and a purification bench on real condensate.
   - Book any pathfinder share in bom-0-12 to avoid double counting.
   - Treat Gemini's $120–180M 0A figure as an upper bound and do not carry it as the plan.
   - Hold 0B at $120–315M (central about $200M), conditional, with low cost confidence.

4. **Enforce D-02 strictly.**
   - T13a (granular heating in microgravity), T13b (dirty-vapour capture) and T13d (hot-path materials and seals) are project-ending in the C-type branch. They must reach TRL 6 in a relevant environment, via EDU thermal-vacuum testing plus microgravity tests and/or the bom-0-12 experiment, before KDP-0B.
   - Gemini's "TRL 5→7 in 0B" path is not acceptable. The 0B pilot cannot serve as the evidence for its own gate.

5. **Use gates beyond taxonomy, aligned with the four discriminating gates.**
   - Target: C-complex, with measured or constrained hydration of at least about 2 wt% over the mining area, and contaminants within the qualified envelope.
   - Consumer/demand: a signed quantity, grade, location and date, or an explicit "capability pilot" designation.
   - Economics: compare against a capture-only experiment, deferral, and Earth-supplied water. Earth-supplied water at SEL1 is estimated at about $3–10k/kg, versus a pilot capital diagnostic of about $1.5–5.7k/kg.
   - Licence: gas and residue disposition approved.

6. **Adopt a contained-by-default disposition policy and a modest inventory.**
   - Storage of 2–10 t, with automatic extraction pause at the high-inventory threshold.
   - Out-of-spec water quarantined. Excess water is retained in tailings rather than vented, if the licence permits.
   - Solids retention target of at least 99.9% interim, tightening toward GPT's 0.1–1 kg/yr escape allocation under ALARP.
   - Non-condensables (estimated 3–13 t/yr) either contained or released through one mass-logged vent only if bom-0-15 and the licensing state authorise it.

7. **Specify the product grade and design for the microgravity worst case.**
   - Define W1 (process) and W2 (electrolysis/EP-test) grades as Claude proposes. Make W2 a polish-on-demand capability, not a baseline throughput requirement (GPT's point).
   - Keep the diagnostic PEM at about 1 kWₑ with a recombiner and no product storage.
   - Prefer cold solids loading and frost-deposition capture over liquid condensation, so gas–liquid separation is avoided.
   - Use sulfidation-resistant alloys in the hot path.
   - Size radiators explicitly at about 45–180 m² pending the thermal model.
   - Require 30-day autonomous safe-mode survival, with production autonomy as a goal.