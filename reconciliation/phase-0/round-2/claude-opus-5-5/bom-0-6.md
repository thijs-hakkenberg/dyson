---
phase: phase-0
item: bom-0-6
round: 2
type: reassessment
modelId: claude-opus-5-5
modelName: "Claude Opus 5.5"
endpoint: databricks-claude-opus-5-5
findings: b907d2fc76f4
priorRound: 1
framework: 18f503fe4ec6
generated: 2026-10-12T09:39:38.613Z
seconds: 310.79
---

# bom-0-6 In-Situ Propellant Production Systems: Phase 0 Re-assessment (Round 2)

## Summary

- **The specification is three architectures stitched together.** The BOM line describes asteroid-surface bucket-wheel units heating regolith to 1,000 °C. The consensus describes a lunar south pole plant with an EML1 depot. The deliberation rq-0-14 describes a module integrated into the L4/L5 station. Only the third is consistent with the rest of Phase 0.
- **No Phase 0 vehicle burns what this item makes.** The tugs (bom-0-4) burn krypton or iodine. ISPP makes water, LOX and LH₂.
- **Water electric propulsion does not close the loop.** Round 1 proposed switching the tugs to water so they could burn station output. A tug burning water needs roughly as much water as the payload it carries. Ore contains only 5–20 wt% water. The ore cannot fuel its own delivery.
- **The Phase 0B gate may never open.** It requires the station to process ≥25 kt/yr. With about 1 MW of power per tug, the 15-tug fleet can deliver only about 2–7 kt/yr of ore.
- **Two deliberation figures are wrong.** rq-0-14's 70–90 t/yr at 500 kW matches the *hydrogen* mass produced, not total propellant; the real water throughput is 4–8× higher. rq-0-30's 6:1 tank farm uses the engine mixture ratio, not the 8:1 that electrolysis produces.
- **Recommendation.** Make bom-0-6 a water-purification and electrolysis pilot of about $0.35–0.8B. Hold production modules as a conditional line of 0–2 units. Defer LH₂ and the cryogenic tank farm to Phase 1. Add the unbudgeted iodine supply as a recurring cost to bom-0-4.

---

## 1. Findings

### P0-F11: Tug propellant is not in the BOM, and ISPP output has no Phase 0 consumer

**Verdict: agree.** I refine the demand estimate and add a consequence the finding missed.

**Demand estimated from power.** For a power-limited electric propulsion fleet, annual propellant use is set by power, not by trip count:

ṁ·t = 2ηP·t / vₑ²

Assumptions: Isp 1,800 s (vₑ = 17.66 km/s), thruster efficiency η = 0.6, P = 1 MWe, t = 1 year.

- 2 × 0.6 × 10⁶ W × 3.156×10⁷ s / (1.766×10⁴ m/s)² = **≈121 t per MWe-year** at 100% duty.
- An iodine Hall thruster at η 0.5–0.65 gives **100–130 t/MWe-yr**.

**Tug power assumed.** I take 0.5–1.5 MWe per tug. This is a judgement: a $133M tug cannot carry a multi-MW array plus its power processing units at today's cost of $100s/W, or even at an aspirational $20–50/W.

**Fleet totals.**

- 15 tugs give 7.5–22 MWe.
- At 60–90% duty, the fleet uses **0.6–2.4 kt/yr of Kr or I**, with a central value of about 1.3 kt/yr.
- This sits at the top of the finding's 10²–10³ t/yr range.

**What the fleet can deliver.**

- At 1 MWe, thrust = 2ηP/vₑ ≈ 68 N, giving an impulse of about 2.1×10⁹ N·s per year.
- For a round trip of 2 × (2–4) km/s, each tug moves about 150–450 t of payload per year.
- The fleet therefore delivers **≈2–7 kt/yr of ore**.
- This is 4–12× short of rq-0-14's ≥25 kt/yr gate.
- Meeting the gate would need about 60–150 MWe of tugs and about 6–15 kt/yr of iodine.

**Supply check.**

| Propellant | World output | Fleet share at ~1.3 kt/yr | Share at 25 kt/yr gate scale |
|---|---|---|---|
| Iodine | ~30–33 kt/yr (USGS Mineral Commodity Summaries, iodine) | ~2–8% (feasible) | ~20–50% (not credible) |
| Krypton | ~0.3–0.7 t × 10³/yr (my estimate, low confidence; scaled from xenon ~60–80 t/yr × Kr/Xe abundance ~8× by mass, less recovery losses) | ~2–4× world output | — |

- Krypton fails at fleet scale. Round 1 reached the same conclusion.
- Iodine is the only viable baseline. Its cost is dominated by delivery to L4/L5, at about $1,000–5,000/kg, giving **$0.6–12B/yr** across 0.6–2.4 kt/yr. No BOM line carries this.

**Who consumes ISPP output in Phase 0?** No propulsion consumer exists. Water electric propulsion does not rescue this:

- Water EP at 800–1,000 s and η about 0.4 uses about 330 t/MWe-yr.
- For a 4–8 km/s round trip it burns about 0.6–1.5 t of water per tonne of payload.
- Ore is 5–20 wt% water, recovered at 50–90%. The ore cannot fuel its own delivery.
- Even at Isp 1,500 s, which is TRL 3–4 at the hundreds-of-kW scale, the ratio is about 0.4–0.8 t of water per tonne of payload.

The only credible Phase 0 consumers are internal and small:

| Consumer | Demand (estimate) |
|---|---|
| ECLSS O₂ for quarterly crew visits | <5 t/yr |
| Station attitude and stationkeeping at L4/L5 | <1–5 t/yr |
| Water as radiation shielding | 50–500 t, one-time |
| Hydrogen reductant loop for oxide reduction in bom-0-3 (water recycled, so net consumption is small) | ~1–20 t/yr H₂ make-up |

**Proposed change.**

- State in bom-0-4 that tug propellant is Earth-supplied iodine, 0.6–2.4 kt/yr. Add a recurring logistics line.
- State in bom-0-6 that Phase 0 output is water, with internal O₂ and H₂, and **0 t/yr** to tugs.
- Make production hardware conditional on a committed consumer, not on station throughput alone.
- Flag to bom-0-3 and bom-0-4 owners that the 25 kt/yr gate is inconsistent with the tug fleet.

### P0-F15: Concluded deliberations were never written back into the specs

**Verdict: partly agree.**

**What I agree with.** rq-0-14, rq-0-30, rq-0-47 and rq-0-48 are plainly absent from the ISPP consensus:

- the consensus still sites ISPP at the lunar south pole with an EML1 depot;
- it does not reflect the "design-for, defer-until" decision;
- it contains no sunshield or MLI architecture.

**What I cannot verify.** rq-0-11, rq-0-18, rq-0-28 and rq-0-29 were not supplied, so the count of "eight of nine" cannot be checked here.

**More important: the conclusions must be corrected before they are written back.**

| Deliberation | Claim | Check | Verdict |
|---|---|---|---|
| rq-0-14 | 500 kW → 70–90 t/yr | 500 kW × 8,766 h = 4.38 GWh/yr. At 6–7 kWh/kg H₂O (PEM plus balance of plant) that is 630–730 t/yr of water at 100% availability, or about 300–650 t/yr at 60–90% availability with purification. **H₂ output is 33–81 t/yr. The 70–90 t figure matches the hydrogen mass**, so it was probably mislabelled as propellant. | Wrong by 4–8× as a propellant figure |
| rq-0-14 | ≥25 kt/yr gate | Unreachable with the bom-0-4 fleet (see F11) | Gate is mis-specified |
| rq-0-14 | $10–20k/kg Earth-supplied propellant | Plausible upper range. My range is $1–20k/kg, depending on Starship-class pricing and refuelling multiples. | Holds, wide |
| rq-0-30 | 100 t LH₂ + 600 t LOX "stoichiometric" | Electrolysis gives O:H = 8:1 by mass. 100 t H₂ needs 894 t of water and yields 794 t of O₂. 6:1 is the engine mixture ratio. | Wrong label |
| rq-0-30 | 700 W ZBO per 100 t LH₂ tank, for 15–40 W heat leak | Carnot COP at 20 K/300 K = 0.071, i.e. 14 W/W. At 10–20% of Carnot that is 70–140 W/W, so 15–40 W needs **1–5.6 kWe**. 700 W implies 30–80% of Carnot, which is not achievable at this scale. | Optimistic by 2–8× |
| rq-0-30 | 190-day subcooling margin | Subcooling 100 t of LH₂ from 15 K to 20.3 K stores about 100,000 kg × ~7.5 kJ/kg·K × 5.3 K ≈ 4.0 GJ. At 40 W that lasts 3.2 years; at 135 W, 345 days; it falls to 190 days only at about 240 W. Note that 15 K is close to the triple point (13.8 K) and the vapour pressure is about 13 kPa, so a pressurant is needed. | Holds (conservative) |
| rq-0-47 | 40–135 W residual heat leak | Exceeds rq-0-30's 15–40 W. The higher figure should govern, giving 3–19 kWe for the 20 K stage. | Governs over rq-0-30 |
| rq-0-48 | 2–3.5× MLI degradation; LBMLI preferred | Reasonable judgement with no test data at these fluences | Treat as a hypothesis |

**Proposed change.** Write back rq-0-14's architecture: station-integrated, Phase 0A capture, interfaces designed in from the start. Correct the numbers as above. rq-0-30, rq-0-47 and rq-0-48 become Phase 1 design-for requirements, not Phase 0 hardware, because LH₂ is deferred.

### P0-F16: Consensus documents disagree with the BOM they describe

**Verdict: agree.**

**Inconsistencies found.**

- The consensus header lists "Claude Opus 4.6" while the BOM page says the synthesis came from Opus 4.5.
- The document date reads "2025" but the file was generated on 2026-02-07.
- The "bucket-wheel at 1,000 °C" text in the BOM appears nowhere in the consensus or the deliberations.

**What should govern.**

| Aspect | Governing source |
|---|---|
| Architecture (site, phasing) | rq-0-14 as corrected under F15 |
| Quantity and budget envelope | The BOM line, revised below |
| Model provenance | Record separately as metadata; it carries no engineering authority |

**Proposed change.** Regenerate the consensus from the revised specification below. Mark the existing consensus as superseded.

---

## 2. Revised specification

| Parameter | Old | New (range) | Basis | Confidence |
|---|---|---|---|---|
| Site | Lunar south pole + EML1 (consensus); asteroid surface (BOM) | Integrated with bom-0-3 at L4/L5. **Sun–Earth vs Earth–Moon L4/L5 is still to be decided.** | rq-0-14 | medium |
| Excavation | Bucket-wheel, counter-rotating | None. Feedstock comes from bom-0-2 and bom-0-3 (rq-0-26). | judgement | high |
| Extraction temperature | 1,000 °C | Staged, with heating in bom-0-3: 150–400 °C (adsorbed and interlayer water, oxyhydroxides) and 400–750 °C (phyllosilicate dehydroxylation). Thermogravimetric work on CI/CM chondrites (Garenne et al. 2014, GCA; King et al. 2015) puts roughly 30–60% of total water below ~400 °C and the rest at 400–770 °C. Above ~770 °C, carbonate CO₂ and sulfur gases rise. | literature | medium |
| Extraction heat | unspecified | 0.15–0.3 kWhₜₕ/kg ore with 0–50% heat recuperation (cp 0.8–1.0 kJ/kg·K, ΔT ~700 K, plus dehydroxylation enthalpy). Equals 1.5–6 kWhₜₕ/kg H₂O at 5–10 wt% water. | calculation | medium |
| Electrolysis specific energy | 4–8 kWh/kg H₂O | 5.5–7.0 kWhₑ/kg H₂O for PEM including balance of plant. The thermoneutral limit is 4.41 kWh/kg and the ΔG minimum 3.66. | calculation | high |
| Chain energy, water to LOX + GH₂ (excluding heating) | 13–22 kWh/kg | 7–11 kWhₑ/kg H₂O: electrolysis, gas cleanup ~0.3–0.8, LOX liquefaction ~0.5–1.1 kWhₑ/kg O₂ | calculation | medium |
| Chain energy, with LH₂ | (inside 13–22) | Adds 1.1–4.5 kWhₑ/kg H₂O (10–40 kWh/kg H₂ including ortho–para conversion, ÷9) | literature | medium |
| Output per 500 kWe | 70–90 t/yr | 300–650 t/yr water processed, giving H₂ 33–72 t/yr and O₂ 270–580 t/yr | calculation | medium |
| Primary product | LOX/LH₂ | Purified water. O₂ and H₂ gas for internal use. LOX only if a consumer is committed. LH₂ deferred to Phase 1. | judgement | medium |
| Quantity | 4 production systems | Phase 0A: 1 pilot (50–150 kWe). Phase 0B: 0–2 modules of 0.5 MWe, conditional. | judgement | low |
| Unit dry mass | 2.5–18 t (models diverge) | Pilot 3–8 t; production module 8–15 t per 0.5 MWe (estimate: 10–20 kg/kW electrolysis and power conditioning, plus purification and thermal hardware) | judgement | low |
| Storage | 600 t LOX + 100 t LH₂ | Water 100–1,000 t (heated liquid or ice). LOX ≤50 t if a consumer exists. 0 t LH₂. | calculation | medium |
| Cryocooler power | 700 W per tank; 10–20 kW farm | 0 in Phase 0. Design-for value for 100 t LH₂: 20 K stage 3–19 kWe plus 80 K stage 1–5 kWe. | calculation | medium |
| Sunshield | 60 m, 10–13 t | None for water. 10–20 m if LOX is stored. 60 m only with LH₂ (Phase 1). | judgement | medium |
| Delivered cost | $200–500/kg at cislunar depot | $200–2,000/kg at the station. The low end needs ≥80% utilisation; output simply stockpiled has no meaningful unit cost. | calculation | low |
| Phase 0B gate | ≥25 kt/yr station throughput | Measured water yield ≥200 t/yr, **and** committed demand ≥200 t/yr, **and** ≥0.5 MWe of delivered power margin | judgement | medium |
| Item cost | $2.0B | $0.35–0.8B committed, plus $0–0.5B conditional | judgement | low |
| Tug propellant (cross-reference to bom-0-4) | unspecified | 100–130 t per MWe-year of Kr/I. Fleet total 0.6–2.4 kt/yr iodine. | calculation | medium |

**Delivered-cost check (central case).**

- Inputs: $400M capital, 10-year life, 8% discount rate (annuity factor 0.149) = $60M/yr; operations $20–40M/yr.
- Output: 300–600 t/yr.
- Result: **$130–330/kg of water**.
- I therefore partly disagree with Round 1 that $200–500/kg "does not close". It does close at the station *if* the plant runs fully. What is missing is a customer, not a cost-per-kg pathway.

---

## 3. Interfaces

| With | Flow | Value | In BOM? |
|---|---|---|---|
| bom-0-3 | Mass: raw volatiles to ISPP | 75–900 t/yr water-equivalent. Ore 2–7 kt/yr (fleet-limited) × 5–20 wt% × 50–90% recovery. Central value ~300 t/yr. | No: there is no volatile-capture line |
| bom-0-3 | Thermal: process heat (heating belongs to bom-0-3) | 0.1–0.5 MWₜₕ | No |
| bom-0-3 | Mass: O₂ and H₂ back to the refinery (reductant loop) | 1–50 t/yr net | No |
| bom-0-3 | Waste gas: SO₂, H₂S, CO, CO₂, HCl and organics to vent or capture | 1–10% of off-gas mass (CI chondrites contain ~5 wt% S and ~3.5 wt% C) | No |
| bom-0-5 | Power | Pilot 0.05–0.15 MWe; Phase 0B 0.5–1.0 MWe | Partly: the 100 MW BOM figure conflicts with rq-0-14's 1–2.5 MW |
| bom-0-4 | Propellant | 0 t/yr. Separately, tugs need 0.6–2.4 kt/yr of Earth-supplied iodine. | No |
| bom-0-4 | Power: fleet electric propulsion | 7.5–22 MWe in total | No: it is not stated where this comes from |
| bom-0-2 | Mass | None directly; excavation has been removed | — |
| Ground | Data | 0.1–1 Mbps telemetry via the station, ≥30 days unattended | Partly |

---

## 4. Missing items or scope

1. **Iodine propellant supply and logistics.** 0.6–2.4 kt/yr at $0.6–12B/yr. This is recurring and no line covers it.
2. **Volatile capture and bulk water storage in bom-0-3.** About $100–300M. Count it once, not in both bom-0-3 and bom-0-6.
3. **Gas cleanup and purification ahead of electrolysis.** PEM membranes are poisoned by sulfur species and NH₃. Gas cleanup should sit inside bom-0-6.
4. **Power reconciliation.** bom-0-5 prices 100 MW at $5/W, about 20–100× below present space photovoltaic costs. rq-0-14 assumes 1–2.5 MW. One of these must change.
5. **Mismatch between tug-fleet capacity and the 25 kt/yr gate.** This belongs to bom-0-3 and bom-0-4 but blocks this item's Phase 0B trigger.
6. **Phase 1 chemical consumers.** If LOX/LH₂ is ever produced, the vehicles that burn it and the cryogenic transfer interface are not in any BOM line.

---

## 5. Remaining disagreements and open questions

- **Extraction temperature.** Part of this is factual and settled by thermogravimetry on returned samples; Ryugu and Bennu analyses are available. Part of it is a trade-off: higher temperature gives more water but also more energy use and contaminants.
- **Is a pilot worth funding with no consumer?** I say yes, as a real option at about $0.3–0.6B. A reasonable engineer could argue instead for capture-and-store only in Phase 0, with zero electrolysis.
- **Iodine versus water electric propulsion in Phase 1.** Water EP would close only if water is extracted at the asteroid in quantities exceeding the payload.
- **Sun–Earth vs Earth–Moon L4/L5.** This changes the Earth-delivery cost, and so the ISPP value, by roughly 2–5×.
- **Krypton world output.** A market source is needed before the "fails" verdict becomes high-confidence.

---

## 6. Decision-quality critique of the Round 1 reconciliation

**Methods used.**

- The Composite Scaffold for all decisions.
- ACH (Analysis of Competing Hypotheses) for D4, where Round 1 anchored on water EP.
- GRADE Evidence-to-Decision for D3.
- Real-options and Cost-of-Delay reasoning for D2 and D5.
- QOC (Questions, Options, Criteria) for D5.

### D1. Integrate ISPP into the station (agreed by all three models)

| Scaffold step | Assessment |
|---|---|
| 1. Frame and type | Existence and property decision. Moderately reversible before PDR. Cynefin domain: complicated. |
| 2. Criteria | Logistics cost, feedstock access, schedule risk, consumer proximity. |
| 3. Options | Lunar south pole + EML1; at the NEA site; station-integrated; null (no ISPP). |
| 4. Matrix | Station integration wins on feedstock (ore already arrives there) and on shared heat. It is weaker on consumer proximity: cislunar customers are at the Moon and EML1. |
| 5. Sensitivity | **Sensitivity point:** which L4/L5. Sun–Earth L4/L5 is 1 AU from Earth's cislunar customers. |
| 6. Certainty | Likely (~70%) correct. Medium confidence. |
| 7. Key assumption | Phase 0 consumers sit at the station. **This is falsified by F11:** there are none of significance. |
| 8. Decision and warrant | The warrant is "feedstock is already there". It is sound for *capture*, weaker for *production*. Accepted downside: no cislunar commercial revenue. |
| 9. Consequences | Ties bom-0-6 to bom-0-3 power and schedule. |

**Weakest link: information.** The orbit was left unresolved even though it moves the value case by 2–5×.

### D2. Phase 0B gate at ≥25 kt/yr station throughput

| Scaffold step | Assessment |
|---|---|
| 1. Frame and type | Executive gating decision. Reversible. |
| 2. Criteria | Should measure readiness for propellant production. |
| 3. Options | Throughput gate; yield gate; demand gate; combined gate. |
| 4. Matrix | The throughput gate tests the wrong variable. The demand gate tests the right one. |
| 5. Sensitivity | The gate is a sensitivity point on tug fleet capacity, which is 2–7 kt/yr. |
| 6. Certainty | I judge it **very likely (~85%)** that 25 kt/yr is unreachable with the bom-0-4 fleet as specified. Medium confidence, because tug power is not stated anywhere. |
| 7. Key assumption | The fleet delivers ≥25 kt/yr. It would be falsified if bom-0-4 shows ≥60 MWe of fleet power within its $2B budget. |
| 8. Decision and warrant | Round 1 adopted the gate with no warrant linking throughput to propellant need. GPT alone added demand criteria; that addition should govern. |
| 9. Consequences | As written, the gate silently cancels ISPP. Cost-of-Delay analysis says that is cheap only while no consumer exists. |

**Weakest link: reasoning.**

### D3. Product mix: water-first vs LOX/LH₂ (preserved divergence)

**This is a trade-off point**, not a fact to settle. Choosing LOX/LH₂ moves Isp and capability up, and complexity, power and capital up as well.

**GRADE Evidence-to-Decision assessment:**

- **Benefit of LH₂ now:** low certainty, because there is no consumer.
- **Harms:** 3–19 kWe of cryocooling, a 60 m sunshield, and cryogenic transfer at TRL 4–6.
- **Resource use:** high.
- **Feasibility:** moderate.

**Assessment.** Water-first dominates in Phase 0 with moderate certainty. Gemini's retention of LH₂ relied on rq-0-30 numbers that are wrong. That removes the information basis for its position, though not the underlying values position that capability should be built early.

**Key assumption and its falsifier.** The assumption is that no Phase 1 chemical stage is committed before Year 5. A binding Phase 1 propulsion decision would falsify it.

**Weakest link: values.** Round 1 treated this as a divergence of fact when it is really a question of how much early capability is worth paying for.

### D4. Tug propellant: Kr/I vs water EP (blocking, cross-item)

**ACH (Analysis of Competing Hypotheses).** Evidence is scored against each hypothesis; the hypothesis least disconfirmed is preferred.

| Evidence | H1: Iodine from Earth | H2: Water EP from station water | H3: Water EP from water extracted at the asteroid | H4: Krypton |
|---|---|---|---|---|
| Supply needed vs available | consistent (2–8% of world output) | **inconsistent**: needs 0.6–1.5 t water per t payload; ore holds 0.05–0.2 | marginal: needs 3–30 t ore processed per t delivered | **inconsistent**: 2–4× world output |
| TRL | consistent (iodine Hall thrusters have flown on small spacecraft, e.g. ThrustMe 2020) | inconsistent (TRL 3–4 at 100s of kW) | inconsistent | consistent |
| Recurring cost | inconsistent ($0.6–12B/yr) | consistent | consistent | inconsistent |

**Result.** H1 is least disconfirmed. **Round 1's water-EP "closure" was circular.** It assumed station water supply of 1.25–5 kt/yr, which requires the 25 kt/yr of ore that the fleet cannot move. It also understated propellant demand per tonne delivered.

**Calibrated certainty.** That water EP cannot be fed from transported ore water: very likely, high confidence (it follows from the rocket equation). That iodine is affordable: about as likely as not, low confidence.

**Falsifier.** A water thruster with Isp ≥1,500 s combined with asteroid-site water extraction demonstrated at ≥10 t/yr per site.

**Weakest link: alternatives.** H3 and the cost side of H1 were never developed.

### D5. Sizing and cost of bom-0-6 (preserved divergence)

**QOC options:** Claude 2 modules / $0.9B; Gemini 1 skid / $0.45B; GPT conditional $2B envelope; mine $0.35–0.8B committed plus $0–0.5B conditional.

**Criteria:** option value, sunk cost if no consumer appears, readiness for Phase 1.

**Assessment.**

- Claude sized to a water-EP demand that does not exist (see D4).
- Gemini sized to the unreachable ore gate (see D2).
- GPT's demand-gated structure is the most robust. Its $2B envelope overstates risk exposure.

**Real-options view.** A pilot at about $0.3–0.6B buys information on yield, purification and electrolyser life. That information is worth more than its cost if a Phase 1 chemical or water demand appears with ≥30% probability. This is a judgement.

**Weakest link: frame.** All three sized to different, unreconciled demand assumptions.

### D6. Extraction temperature

**This is a mixed decision.** The share of water released below 400 °C is a factual question, settled by thermogravimetric analysis. The choice of setpoint is a trade-off between yield and both energy use and contamination. Claude and Gemini each hold part of the truth. Round 1 was right not to average them, but it did not separate the factual part from the trade-off part.

---

```yaml
item: bom-0-6
model: claude-opus-4
findings:
  - id: P0-F11
    verdict: agree
    summary: Kr/I tug demand is ~100-130 t per MWe-yr, giving 0.6-2.4 kt/yr fleet iodine (2-8% world supply; krypton fails), ISPP has no Phase 0 propulsion consumer, and water EP cannot close because water demand per tonne delivered (0.6-1.5 t) exceeds ore water content (0.05-0.2 t).
    proposed_change: Baseline Earth-supplied iodine in bom-0-4 with a recurring logistics line, set ISPP-to-tug flow to 0 t/yr, and gate ISPP production on committed demand.
  - id: P0-F15
    verdict: partly
    summary: rq-0-14/30/47/48 are missing from the spec but must be corrected before write-back (70-90 t/yr is the H2 mass at 500 kW; the 6:1 tank farm is not electrolysis-stoichiometric; 700 W ZBO is 2-8x optimistic; the 25 kt/yr gate is unreachable by the tug fleet), and rq-0-11/18/28/29 cannot be verified from supplied material.
    proposed_change: Write back the station-integrated, design-for/defer-until architecture with corrected numbers, treating the cryogenic deliberations as Phase 1 design-for requirements.
  - id: P0-F16
    verdict: agree
    summary: BOM text, consensus and rq-0-14 describe three incompatible architectures and the provenance metadata is inconsistent.
    proposed_change: Supersede the consensus and regenerate it from the revised spec, with rq-0-14 (corrected) governing architecture, the BOM governing budget, and model provenance recorded separately.
revised_spec:
  - parameter: site
    old: lunar south pole + EML1 depot / NEA surface
    new: integrated with bom-0-3 at L4/L5 (Sun-Earth vs Earth-Moon TBD)
    range: [station-integrated, station-integrated]
    unit: n/a
    basis: judgement
    confidence: medium
  - parameter: extraction_temperature
    old: 1000
    new: staged 150-400 and 400-750
    range: [150, 750]
    unit: degC
    basis: literature
    confidence: medium
  - parameter: electrolysis_specific_energy
    old: 4-8
    new: 6.2
    range: [5.5, 7.0]
    unit: kWhe/kg H2O
    basis: calculation
    confidence: high
  - parameter: chain_energy_LOX_GH2_excl_heating
    old: 13-22
    new: 9
    range: [7, 11]
    unit: kWhe/kg H2O
    basis: calculation
    confidence: medium
  - parameter: water_processed_per_500kWe
    old: 70-90
    new: 450
    range: [300, 650]
    unit: t/yr
    basis: calculation
    confidence: medium
  - parameter: quantity
    old: 4
    new: 1 pilot + 0-2 conditional modules
    range: [1, 3]
    unit: units
    basis: judgement
    confidence: low
  - parameter: pilot_power
    old: unspecified
    new: 100
    range: [50, 150]
    unit: kWe
    basis: judgement
    confidence: low
  - parameter: LH2_storage
    old: 100
    new: 0
    range: [0, 0]
    unit: t
    basis: judgement
    confidence: medium
  - parameter: water_storage
    old: unspecified
    new: 300
    range: [100, 1000]
    unit: t
    basis: calculation
    confidence: low
  - parameter: cryocooler_power_phase0
    old: 10-20
    new: 0
    range: [0, 5]
    unit: kWe
    basis: calculation
    confidence: medium
  - parameter: delivered_cost_at_station
    old: 200-500
    new: 400
    range: [200, 2000]
    unit: USD/kg
    basis: calculation
    confidence: low
  - parameter: item_cost
    old: 2.0
    new: 0.6
    range: [0.35, 1.3]
    unit: USD billion
    basis: judgement
    confidence: low
  - parameter: phase0B_gate
    old: station throughput >=25 kt/yr
    new: measured yield >=200 t/yr AND committed demand >=200 t/yr AND >=0.5 MWe delivered power margin
    range: [200, 200]
    unit: t/yr
    basis: judgement
    confidence: medium
interfaces:
  - with: bom-0-3
    flow: mass
    value: 75-900 t/yr raw volatiles (water-equivalent)
    in_bom: false
  - with: bom-0-3
    flow: other
    value: 0.1-0.5 MWth process heat supplied by station
    in_bom: false
  - with: bom-0-3
    flow: mass
    value: 1-50 t/yr net O2/H2 returned (reductant loop, ECLSS)
    in_bom: false
  - with: bom-0-5
    flow: power
    value: 0.05-0.15 MWe pilot; 0.5-1.0 MWe Phase 0B
    in_bom: true
  - with: bom-0-4
    flow: propellant
    value: 0 t/yr from ISPP; 0.6-2.4 kt/yr Earth-supplied iodine required
    in_bom: false
  - with: bom-0-4
    flow: power
    value: 7.5-22 MWe fleet electric propulsion, source unassigned
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-6
    quantity: 1 pilot (50-150 kWe) with gas purification
    unit_cost_usd: [350000000, 800000000]
    rationale: No Phase 0 consumer exists, so commit only a pilot that buys yield and purification data as a real option.
  - action: add
    item: bom-0-6 conditional Phase 0B production modules (0.5 MWe)
    quantity: 0-2
    unit_cost_usd: [100000000, 250000000]
    rationale: Released only when the demand-based gate is met.
  - action: add
    item: bom-0-3 volatile capture and bulk water storage
    quantity: 1
    unit_cost_usd: [100000000, 300000000]
    rationale: Phase 0A capture per rq-0-14, booked once in bom-0-3, not in bom-0-6.
  - action: add
    item: Tug iodine propellant supply and logistics (recurring, per year)
    quantity: 0.6-2.4 kt/yr
    unit_cost_usd: [600000000, 12000000000]
    rationale: Fleet electric propulsion at ~121 t/MWe-yr needs Earth-supplied iodine that no BOM line covers; krypton fails on supply.
  - action: remove
    item: bom-0-6 LH2 liquefaction, cryogenic tank farm and 60 m sunshield (Phase 0)
    quantity: 0
    unit_cost_usd: [0, 0]
    rationale: No Phase 0 chemical consumer; retain only as Phase 1 design-for interfaces.
open_questions:
  - Does the bom-0-4 fleet have enough power (>=60 MWe needed) to deliver the 25 kt/yr that rq-0-14 assumes, or must the gate and station sizing be reduced to ~2-7 kt/yr?
  - Is the station at Sun-Earth or Earth-Moon L4/L5, given that this moves the value of in-situ water by roughly 2-5x?
  - Which station power baseline governs, 1-2.5 MW (rq-0-14) or 100 MW at $5/W (bom-0-5)?
  - What fraction of water is released below 400 C from representative CI/CM feedstock (Ryugu/Bennu thermogravimetric data), and at what contaminant load?
  - Will any Phase 1 vehicle commit to LOX/LH2 or water propulsion, and could asteroid-site water extraction feed water EP?
  - What is world krypton production (market source), to confirm its exclusion?
  - Does an internal hydrogen-reduction loop in bom-0-3 justify Phase 0 electrolysis capacity?
```
