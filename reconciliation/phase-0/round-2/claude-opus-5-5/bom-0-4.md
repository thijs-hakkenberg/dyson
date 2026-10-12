---
phase: phase-0
item: bom-0-4
round: 2
type: reassessment
modelId: claude-opus-5-5
modelName: "Claude Opus 5.5"
endpoint: databricks-claude-opus-5-5
findings: b907d2fc76f4
priorRound: 1
framework: 18f503fe4ec6
generated: 2026-10-12T09:27:25.692Z
seconds: 381.681
---

# bom-0-4 Transport Vehicles: Round 2 Re-assessment

**Working assumptions.** These are stated because they change the numbers.

- **A1.** The processing station (bom-0-3) is in cislunar space (EML1, DRO or similar). Two things point that way: the ISPP spec names an EML1 depot, and the BOM describes moving material "between asteroids and processing station". If the station is at the asteroid instead, the transport problem changes completely (see D1).
- **A2.** "Asteroids" in Phase 0 means near-Earth asteroids (NEAs). The main belt is out of scope. At 2.5–3 AU, solar power falls to roughly 11–16% of its 1 AU value, so solar-electric shuttling does not close there.
- **A3.** All numbers are first-order, power-limited estimates. None comes from an optimised trajectory, and I flag where that matters.

---

## 1. Findings

### P0-F01: Transport capacity vs. station throughput. **Agree.** The finding's power figure is slightly optimistic, and round 1 left the power-scaling question (D3) unreconciled. I reconcile it below.

**Step 1: Current-spec power.**
- Modern III-V arrays at 1 AU deliver about 1361 W/m² × ~30% cell efficiency × ~0.85 packing ≈ 300–350 W/m² at the cell, or about 250 W/m² at wing level at beginning of life (BOL).
- Flight anchor: ISS iROSA delivers about 20 kW from about 115 m², roughly 175 W/m², with older cells.
- 300–500 m² therefore gives about 75–150 kWe BOL and 60–130 kWe at end of life (EOL). The finding's 150–250 kWe would need about 500 W/m², which no flight array achieves.

**Step 2: Thrust per kilowatt.**
- Thrust T = 2ηP / (g₀·Isp).
- Krypton or iodine at Isp 1,800 s and η = 0.50 gives T/P = 1 / 17,660 = **56.6 mN/kW**.
- Isp 2,500 s at η = 0.55 gives 44.9 mN/kW.
- The finding's 50 mN/kW is consistent.

**Step 3: A closed-form throughput metric.** This resolves round-1 D2 and D3.
- Assume a round trip that flies out empty and returns loaded, with dry-to-payload ratio r = m_d/m_p, thrust duty f, and an allowance of about 10–15% for propellant mass.
- Delivered payload per kWe-year is then:
  - k ≈ f·(T/P)·3.156×10⁷ s / [Δv_ret + Δv_rt·r] / 1.12
- Baseline values: f = 0.85, r = 0.175 (35 t dry / 200 t payload).

| Round-trip Δv | Denominator (incl. ×1.12) | k, thrusting time only | k incl. 15–40% non-thrust time (loading, proximity ops, phasing coasts) |
|---|---|---|---|
| 6 km/s | 4,540 m/s | 0.33 t/kWe·yr | 0.20–0.29 |
| 8 km/s | 6,050 m/s | 0.25 | 0.15–0.21 |
| 10 km/s | 7,560 m/s | 0.20 | 0.12–0.17 |

**Step 4: The current spec, checked against the metric.**
- At 100 kWe and k ≈ 0.2, each vehicle delivers about 20 t/yr. A 200 t payload therefore implies a cycle of about **8–10 years**, not about 1.5.
- The fleet of 15 delivers about **0.3 kt/yr**.
- Even at the stated 10 cycles in 15 years, the fleet would deliver 15 × 200 t × 0.67/yr ≈ 2 kt/yr, which is 25× short of 50 kt/yr.
- The finding's 25–100× shortfall is confirmed.

**Step 5: Power needed to close 50 kt/yr by solar-electric propulsion (SEP).**
- P = 50,000 t / k.
- At 6–10 km/s, k = 0.12–0.29, so P ≈ **170–420 MWe**.
- With aggressive target restriction to a 3–4 km/s round trip, k rises to about 0.5, so P ≈ 100 MWe.
- **Overall range: about 100–400 MWe**, or 1–4× the entire bom-0-5 line.
- At a realistic $100–300/W for flight arrays plus EP, that is $10–120B. SEP shuttling at 50 kt/yr is ruled out for Phase 0.

**Step 6: Reconciling the round-1 spread (15 MWe to 1.5 GW).**
- **Claude's** 300 kWe design is *power-limited*. Its burn time roughly equals its cycle time, so its k is self-consistent, and its 170–500 MWe is about right.
- **Gemini's** 800 kWe tug gives about 40 N.
  - Burn per round trip: (178 t × 4 + 28 t × 4) km/s / 40 N ≈ 0.65 yr, against a stated 2.5-yr cycle. The vehicle is over-powered by about 4× relative to its own cadence.
  - Its 15–25 MWe for 50 kt/yr is internally inconsistent. 50 kt / (150 t / 2.5 yr) is about 830 vehicles × 0.8 MW ≈ 670 MW. The 15–25 MWe figure is wrong by about 30×.
- **GPT's** 1.5 MW tug burns about 0.6 yr per round trip against a 1.5–3-yr cycle. It is likewise trajectory-limited, which inflates its GW estimate by about 3×.
- **Conclusion:** the round-1 design points reach the same ~1 kt/yr with 5× different power because two of the three bought power their assumed cadence cannot use.

**Step 7: A constraint round 1 missed. Orbital access, not power, may set the cadence.**
- Low-Δv NEAs are low-Δv because their orbits resemble Earth's. That also gives them long synodic periods relative to Earth: S = 1 / |1 − a^(-1.5)|.
  - a = 1.05 AU gives S ≈ 14 yr.
  - a = 1.10 AU gives S ≈ 7.5 yr.
  - a = 1.20 AU gives S ≈ 4.2 yr.
- So a tug shuttling repeatedly to *one* low-Δv NEA from cislunar space gets a cheap window only every 4–15+ years. Low thrust widens windows only modestly.
- A shuttle fleet therefore needs a rotating set of targets, or it must loiter at the asteroid between windows.
- **Implication:** the realistic k may sit at the low end of the table, or below it. Per-vehicle power above roughly 300 kWe probably buys little.
- This is the single most important unverified assumption in the item (see §6).

**Step 8: A published counterpoint that also comes from the access geometry.**
- The KISS Asteroid Retrieval study (Brophy et al., 2012, Keck Institute for Space Studies) found that a ~40 kW SEP vehicle could return a ~7 m NEA of about 250–1,300 t in one trip. For select objects, return Δv was as low as a few hundred m/s using a lunar gravity assist, in a 6–10-year mission.
- That is k of order 1–3 t/kWe·yr: 5–10× better than shuttling at 6–8 km/s, but only for a handful of objects with single windows.
- **Δv is the dominant sensitivity, not vehicle size.**

**Proposed change.**
1. Specify the transport line by **fleet EP power: about 4.5 MWe (3–7.5)**, delivering **about 1 kt/yr (0.5–2)** to cislunar space.
2. Cap bom-0-3's transport-fed input at ≤2 kt/yr pending the architecture trade (§6, D1).
3. Add a trajectory and access study as a gating deliverable.

---

### P0-F10: Crew transport and habitation not budgeted. **Agree for bom-0-4.** I partly disagree with how round 1 handled the cheap residual option.

**Why bom-0-4 cannot carry crew.**
- Low-thrust legs on this vehicle last about 1–2 years. rq-0-18's "60–90 day transits" are inconsistent with the vehicle by 5–10×.
- Crew on a 2.5-year EP cycle would face roughly 0.5–1 Sv of galactic cosmic ray (GCR) dose. MSL/RAD measured about 1.8 mSv/day in cruise, so 2.5 yr is about 1.6 Sv unshielded, or about 0.6–1 Sv with practical shielding. That exceeds NASA's career limit of 600 mSv (NASA-STD-3001, 2022).

**rq-0-18's structural requirement is not physically motivated.**
- A 3g rating on a 300 t loaded tug is about 8.8 MN against about 17 N of thrust.
- The only real structural loads are launch loads (4–6 g on the dry vehicle), which apply whether or not the vehicle is human-rated.
- The "2–3× retrofit penalty" and "12–20% premium" have no itemised basis.

**Where I differ from round 1's GPT/Claude removal.**
- A real-options view says keep the *cheap* part: an IDSS-compatible docking port (about 0.3–0.6 t, a few $M per vehicle) with fault-tolerant docking avionics.
- That is useful for cargo berthing and servicing anyway.
- Delete the human-rating label, the 3g requirement, the crew kits and the shelter-in-place requirement.

**Phase-level decision this forces (outside bom-0-4).**
- Under A1 (cislunar station), crew visits are feasible using commercial or NASA vehicles. They are not cheap.
  - A Dragon seat to LEO costs about $55–90M (NASA OIG, 2019).
  - Beyond-LEO crew sorties cost of order $0.5–4B each, depending on whether Orion/SLS or a still-unpriced Starship architecture is used.
- Quarterly visits would therefore be about $1–8B/yr, comparable to the whole Phase 0 BOM.
- If the station is at the NEA, quarterly crew visits are impossible.

**Proposed change.**
- bom-0-4 is uncrewed. Remove rq-0-18's provisions except the docking port.
- Add a crew decision gate at the bom-0-3 SRR (system requirements review), defaulting to "uncrewed, teleoperated from Earth". Light time to cislunar space is about 1.3 s, so teleoperation is genuinely viable there. This supports A1.

---

### P0-F11: Tug propellant not in BOM; ISPP has no Phase 0 consumer. **Agree.** I add a supply check and an economic consequence.

**Propellant per round trip** (35 t dry, 200 t payload; working backwards from arrival at the station):

| Case | Return leg | Outbound | Total |
|---|---|---|---|
| Isp 1,800 s, 3+3 km/s | 235 × (e^0.170 − 1) = 43.5 t | 78.5 × 0.185 = 14.5 t | **58 t** |
| Isp 1,800 s, 4+4 km/s | 59.7 t | 24.1 t | **84 t** |
| Isp 2,500 s, 4+4 km/s | 41.6 t | 13.6 t | **55 t** |
| Isp 1,800 s, 2.5+2.5 km/s | 35.7 t | 10.7 t | **46 t** |

**Fleet demand.**
- 15 vehicles on about 2.5-yr cycles make about 6 round trips/yr, so demand is about 6 × 45–85 t = **270–510 t/yr**. Reference value: **300 t/yr (150–600)**.
- Equivalently, about 0.25–0.4 t of Earth-supplied propellant per tonne delivered.

**Supply check.** All figures are my estimates unless cited.

| Propellant | World supply | Fleet share | Confidence and notes |
|---|---|---|---|
| Xenon | ~50–100 t/yr | **3–10×** world output | Medium. The BOM's "15–20×" is directionally right but not reproduced at this fleet size. Xenon is excluded. |
| Krypton | ~300–700 t/yr | **40–170%** of world output | Low. Derived from the atmospheric Kr:Xe ratio of ~13:1 by volume (~8:1 by mass), co-recovered from the same crude stream. Gemini's 8,000 t/yr looks high by ~10×; Claude's 100–500 t/yr is plausible. Not viable for a full production fleet without dedicated capacity contracts. |
| Iodine | ~30–33 kt/yr (USGS Mineral Commodity Summaries, 2024) | **~1–2%** | High. Supply is not a constraint; readiness is (see D5). |

**Iodine readiness.**
- The ThrustMe NPT30-I2 flight (Rafalskyi et al., *Nature* 599, 2021) operated at tens of watts. The ~20 W vs ~60 W discrepancy in round 1 is thruster vs. system power; either way it is about four orders of magnitude below a 300 kWe tug.
- I am not aware of any flight heritage for Gemini's "BHT-6000/I2". Treat it as unsupported.
- **Krypton** has far higher heritage at power: thousands of Starlink Hall thrusters, plus NASA high-power testing including the X3 nested Hall thruster at about 100 kW on xenon and krypton-compatible campaigns.

**Economic consequence (new).**
- Delivered iodine or krypton at $500–3,000/kg in cislunar space (bulk price + purification + launch + transfer) means about **$0.15–0.9B/yr** for propellant alone.
- Adding amortised fleet cost gives about $500–1,500 per delivered kg of raw ore.
- That is comparable to or worse than *launching* material from Earth at projected Starship-era prices.
- Phase 0 transport is therefore a demonstration, not an economic supply chain. The spec should say so.

**ISPP consumer.**
- No Phase 0 consumer exists. Hall thrusters cannot burn LOX or LH₂.
- Water from bom-0-6 *could* feed a Phase 0B water-propellant tug (solar-thermal or microwave-electrothermal, Isp about 400–800 s) refuelled at the asteroid. That tug would be trajectory-limited rather than power-limited, and is the only route I see to 10+ kt/yr shuttling.
- This is consistent with rq-0-14.

**Proposed change.**
- Add an EP propellant supply line: about 300 t/yr, $0.15–0.9B/yr.
- Split bom-0-6 into "design-for in Phase 0" and "deploy in Phase 0B" per rq-0-14.

---

### P0-F15: Deliberations not written back. **Agree.** My disposition for bom-0-4 follows. GPT's register format is right, but round 1 never filled it in.

| Deliberation | Disposition for bom-0-4 | Change to spec |
|---|---|---|
| rq-0-18 human-rating | **Modified / mostly rejected** | −2 to −4 t per vehicle; −$0.2–0.4B fleet. Retain IDSS docking port (+0.3–0.6 t). |
| rq-0-14 ISPP to Phase 0B at ≥25 kt/yr | **Accepted** | Tugs have no LOX/LH₂ or water interface in Phase 0. Phase 0B water-tug trade added. |
| rq-0-11 hybrid gravity 0.05–0.15 g | **Accepted, as an interface** | Tugs berth at a despun or non-rotating hub. Adds hub mechanism scope to bom-0-3, not bom-0-4. Container handling must survive 0–0.15 g transitions. |
| rq-0-30 cryogenic boil-off | **Not applicable to iodine.** Applies to krypton only if stored as liquid near 120 K. | Baseline supercritical Kr in COPVs (tank fraction ~10–15%, ~100 m³ per 60 t) or solid iodine (4.93 g/cm³, ~12 m³, tank fraction ~5%). |
| rq-0-47 sunshield | **Rejected for tug** | Not a cryogenic vehicle. |
| rq-0-48 MLI degradation | **Accepted, narrowly** | Iodine feed-system and tank heating at ~80–100 °C: about 1–3 kW per vehicle, in the power budget. |
| rq-0-28 ISRU cost methodology | **Accepted in principle; numbers not supplied** | Report $/kg delivered to station as the transport figure of merit. |
| rq-0-29 governance | **Interface only** | Operations authority, spectrum licensing, and conjunction/traffic coordination with bom-0-7. |

---

### P0-F16: Consensus vs. BOM disagree. **Agree.**

The BOM is authoritative on two points: a quantity of 15 and the exclusion of xenon. Neither document is authoritative on physics or cost.

- **ISPP line value.** bom-0-6 is 4 × $500M = $2.0B. Claude's "$500M" was the unit value and GPT's "$2B" was the line value, so both were correct.
- **Arithmetic.** The BOM's 15 × $133M = $2.0B and the consensus's 10 × $200M = $2.0B are both correct. The budget was held fixed while the fleet count changed, which suggests the cost is a top-down allocation rather than an estimate.
- **Proposed change.** Regenerate the consensus from §2 below, and record which figures are BOM-authoritative and which are physics-derived.

---

## 2. Revised specification

| Parameter | Old | New (range) | Basis | Confidence |
|---|---|---|---|---|
| Fleet quantity | 15 (BOM) / 10 (consensus) | 15 = 2 pathfinders + 13 production (10–20) | Judgement. Throughput depends on fleet kW, not count. | Medium |
| Fleet EP power | unspecified | 4.5 MWe (3–7.5) | Calculation, §1 F01 | Medium |
| EP power per vehicle | ~60–130 kWe EOL implied | 300 kWe (200–500) | Calculation. Above ~500 kWe is likely trajectory-limited. | Medium |
| Array area per vehicle | 300–500 m² | ~1,300 m² (900–2,500) | 300 kWe EOL at 200–250 W/m², 15-yr degradation 15–25% | Medium |
| Isp | unspecified | 1,800 s (1,500–2,500) | Trade-off point (§6) | Medium |
| Thrust per vehicle | unspecified | 17 N (11–28) | T = 2ηP/(g₀·Isp) | High (given P, Isp) |
| Propellant | Xe (consensus); Kr/I (BOM) | Kr for pathfinders; production down-select at PDR (I preferred if qualified) | Literature + supply estimate | Medium |
| Dry mass | unspecified | 35 t (25–50) | Arrays 2–3 t, EP 1.5–3 t, cargo structure 10–20 t, tanks 3–8 t, bus 5–8 t | Low |
| Payload per trip | 150–250 t | 200 t (100–250) | Weak sensitivity of throughput to payload size | Medium |
| Round-trip Δv | 6–10 km/s | ≤6 km/s target-selection criterion; capable to 8 | Calculation. Δv is the dominant sensitivity. | Medium |
| Propellant per round trip | unspecified | 60 t (45–85) | Rocket equation, §1 F11 | Medium |
| Cycle time | ~1.5 yr implied | 2.5 yr (2–4; may be window-limited at 4–8) | Calculation + synodic constraint | Low |
| Cycles over life | 10+ | 4–6 (3–7) | 15 yr / cycle | Low |
| Fleet delivered mass | implied 50 kt/yr | 1 kt/yr (0.5–2) | Calculation | Medium |
| Thruster throughput requirement | unspecified | ≥5 t per module (2–10), robotically replaceable | 270–510 t/yr fleet ÷ per-module life; AEPS-class qualified ~1–2 t | Low |
| Human-rating | structural human-rated (rq-0-18) | None; IDSS docking port only | §1 F10 | Medium |
| Unit recurring cost | $133M | $250M ($180–400M) | Gateway PPE (~60 kW, ~$375M contract, 2019) scaled with learning | Low |
| Fleet recurring cost | $2.0B | $3.75B ($2.7–6.0B) | Above | Low |
| Non-recurring (development and qualification) | unspecified | $1.5B ($0.8–3.0B) | MW-class EP plus new propellant qualification | Low |

---

## 3. Interfaces

| With | Flow | Value | In BOM? |
|---|---|---|---|
| bom-0-3 station | Mass in: ore/concentrate | 1 kt/yr (0.5–2) | Yes, but the station is sized for 50 kt/yr, which is a conflict |
| bom-0-3 station | Mass out: equipment and containers to the asteroid | 50–200 t/yr | No |
| bom-0-3 station | Dockside service power | 10–50 kW per berthed tug; 0.05–0.15 MW peak | No |
| bom-0-3 station | Propellant transfer and storage | ~300 t/yr Kr/I (150–600) | No |
| bom-0-3 station | Despun berthing hub (rq-0-11) | Mechanism | No |
| bom-0-2 mining robots | Outbound transport of robots | 20 units; mass unknown, est. 2–20 t each | Partly (robots yes, carriage no) |
| bom-0-1 prospecting | Data: target list with orbit, Δv, synodic windows, spin, composition | ≥10 NEAs with round-trip Δv ≤6 km/s across a 15-yr epoch | No (requirement not stated in bom-0-1) |
| bom-0-5 power arrays | Tug arrays (carried in bom-0-4) | 4.5 MWe | Yes, in bom-0-4. bom-0-5 should state it excludes them. Note bom-0-5 at $5/W is ~20–60× below flight-array cost, outside this item. |
| bom-0-6 ISPP | Propellant | 0 t/yr in Phase 0; water 10³–10⁴ t/yr if a Phase 0B water tug is adopted | No consumer |
| bom-0-7 organisation | Operations authority, spectrum, traffic coordination | — | Partly |
| Ground / DSN | Data | ~10–100 kbps per tug in cruise; 1–10 Mbps in proximity ops; fleet total <1 GB/day | **No.** Gemini's 1 Gbps is over-specified by >100×. |

---

## 4. Missing items or scope

Unit costs here are my estimates.

1. **EP propellant supply and delivery.** About 300 t/yr, $0.15–0.9B/yr. Not budgeted.
2. **Development, qualification and lifetime testing.** $0.8–3B. Includes ≥10,000 h wear testing of iodine or krypton thrusters at ≥50 kW.
3. **Fleet launch and deployment.** 15–30 heavy launches at $50–150M each, plus either a LEO-to-cislunar transfer or a booster to high orbit.
   - Self-spiralling from LEO costs about 7 km/s, roughly 1.5 yr per tug, and degrades the arrays in the Van Allen belts.
4. **Thruster/PPU spares and robotic replacement.** At 2–10 t of throughput per module, fleet demand is **30–250 modules/yr**. Round-1 Claude's 15–40/yr assumes optimistic lifetimes for magnetically shielded thrusters.
5. **Ground segment and deep-space communications.** $100–400M, plus DSN or commercial aperture time.
6. **Standard cargo containers and latching.** 30–60 units at $0.5–3M each.
7. **Trajectory/access and architecture trade study.** $5–20M. This gates everything else.
8. **Crew transport decision gate** (bom-0-3 level). Conditional, $1–8B/yr if quarterly crew is adopted.

---

## 5. Remaining disagreements and open questions

- **Propellant down-select (I disagree with round-1 Claude's iodine baseline).**
  - Iodine wins on supply (~1–2% of world output) and on tank volume.
  - Krypton wins on readiness at power.
  - Pathfinders should fly krypton, with iodine adopted at PDR only if wear testing passes.
  - Reasonable engineers will weight schedule against supply risk differently. That is a values question.
- **Fleet count vs. unit size.** At fixed fleet power, more units buy redundancy and fewer units buy lower NRE and operations cost. The choice is not settled by physics.
- **Krypton world supply.** My 300–700 t/yr is derived, not sourced. An industrial-gas supplier survey is needed.
- **Whole-object retrieval (KISS-style) vs. shuttling.** For the few objects with return Δv below 1 km/s, single-trip retrieval may beat shuttling by 5–10× in t/kWe·yr. Whether enough such objects exist across a 15-year window is unknown.
- **Whether a ~1 kt/yr pilot justifies a $10B station.** This is a bom-0-3 question, but it is driven by this item.
- **Krypton storage.** Supercritical vs. liquid trades tank mass against boil-off and cryocooler power. That is a sensitivity point for dry mass only.

---

## 6. Decision-quality critique

**Methods used.**
- The Composite Scaffold for each decision.
- **ACH** for D1, because the round-1 panel anchored early on "shuttle tugs to a station".
- **QOC** for propellant.
- **GRADE EtD** for human-rating, which exposes evidence quality and values.
- Calibrated language follows IPCC: *likely* = 66–100%, *very likely* = 90–100%, *about as likely as not* = 33–66%. Confidence is stated separately.

### Decision A: How the 50 kt/yr gap is closed (D1, blocking)

1. **Frame.**
   - This is an existence and executive decision about the phase architecture. It is a one-way door once station location and transport type are committed.
   - Cynefin domain: complicated, analysable with trajectory tools.
   - **Round 1 framed it wrongly.** It asked "how do we feed 50 kt/yr?" and never asked what Phase 0 must *output*, or why 50 kt/yr of raw input is a requirement at all. The 50 kt/yr is a station sizing figure, not a mission objective.
2. **Criteria, set before options.** Musts: closes physically with Phase 0 budget order $15–25B; flyable by about 2035 with demonstrated technology plus one new qualification. Wants, weighted:

   | Criterion | Weight |
   |---|---|
   | Delivered product per $ | 0.30 |
   | Demonstration value for later phases | 0.25 |
   | Technical risk | 0.20 |
   | Schedule | 0.15 |
   | Operability (light time, crew) | 0.10 |

   These are swing weights over the plausible range of each criterion. They are my values judgement and should be replaced by the project's.
3. **Options.**
   - H0: null, keep the 50 kt/yr station with SEP shuttles.
   - H1: pilot cislunar station at ~1–2 kt/yr.
   - H2: co-locate processing at the NEA and ship products only.
   - H3: Phase 0B water tugs refuelled at the asteroid, plus beneficiation.
   - H4: scale SEP to 100–400 MWe.
   - **H5: KISS-style whole-object or boulder retrieval to cislunar space. Missed by round 1.**
4. **Assessment matrix (ACH).** Each cell scores the evidence against the hypothesis that the option works: C = consistent, I = inconsistent, − = neutral.

   | Evidence | H0 | H1 | H2 | H3 | H4 | H5 |
   |---|---|---|---|---|---|---|
   | k ≈ 0.12–0.3 t/kWe·yr at 6–10 km/s | I | C | C | − | I (cost) | − |
   | Synodic periods of 4–15 yr for low-Δv NEAs | I | I (weak) | C | I (weak) | I | C (one window suffices) |
   | Propellant 0.25–0.4 t per t delivered | I | C | C | C (local water) | I | C (low Δv) |
   | Teleoperation is easy at cislunar, hard at NEAs | C | C | I | I | C | C |
   | KISS: ~500 t per trip at 40 kW for select objects | − | − | − | − | − | C |
   | Contamination and gravity-zone needs (rq-0-11) | − | C | I (large remote facility) | − | − | C |

   - **Least disconfirmed:** H1 combined with H5. A pilot station fed by a small number of retrievals and shuttles.
   - H2 is strong on physics but carries the most operational risk.
   - **H0 and H4 are rejected.**
5. **Sensitivity and trade-off points.**
   - **Δv is a sensitivity point:** it shifts throughput by 3–10×.
   - **Station location is a trade-off point.** Cislunar improves operability and crew access but worsens transport mass and windows. That makes it a values question about risk appetite for remote autonomy, not a fact to settle.
6. **Evidence certainty.**
   - Shuttle throughput is far below 50 kt/yr: *virtually certain*, high confidence.
   - Enough low-Δv targets exist to sustain shuttling at k ≥ 0.2: *about as likely as not*, low confidence.
7. **Key assumption and falsification.**
   - Assumption: there are ≥10 NEAs with round-trip Δv ≤6 km/s *and* phased windows giving ≥0.4 cycles per vehicle per year over 2035–2050.
   - Test: an NHATS-based (NASA Near-Earth Object Human Space Flight Accessible Targets Study) query plus low-thrust optimisation, for example in GMAT, Copernicus or EMTG.
   - Falsified if fewer than about 5 windows per year fleet-wide. In that case shuttling fails and H2 or H5 dominates.
8. **Y-statement.** In the context of a Phase 0 demonstrator, facing a 25–100× transport shortfall, choose H1 + H5 with H2 kept open. The aim is to prove extraction, transport and processing at kt scale, accepting that Phase 0 delivers no economic material flow.
9. **Consequences.**
   - Unlocks: bom-0-3 down-sizing and a bom-0-1 target-list requirement.
   - Constrains: the Phase 0B design, which must be H2 or H3.
   - **Weakest link: information.** No trajectory work exists.

### Decision B: Vehicle design point and fleet power (D2, D3, blocking)

1. **Frame.** A property decision. It is reversible until PDR.
2. **Criteria.** t/yr delivered, $ per delivered kg, propellant demand, TRL.
3. **Options.** 150 kWe, 300 kWe, 800 kWe or 1.5 MW per vehicle, each at fixed fleet cost.
4. **Matrix.**
   - **Power-limited region** (P ≤ ~300–500 kWe): throughput rises linearly with fleet kW.
   - **Trajectory-limited region:** throughput is flat. Extra kW adds cost with no benefit.
   - The 800 kWe and 1.5 MW options (Gemini, GPT) sit in the flat region at their own stated cadence.
5. **Sensitivity and trade-off points.**
   - **Fleet kW is a sensitivity point.**
   - **Isp is a true trade-off point.** Higher Isp lowers propellant demand (−30% from 1,800 to 2,500 s) but also lowers thrust per kW (−21%) and therefore throughput. Choosing Isp means choosing between supply security and throughput: a values call.
   - Payload size is a weak sensitivity.
6. **Certainty.** That 300 kWe is near the knee: *likely*, medium confidence.
7. **Key assumption and falsification.**
   - Assumption: the cycle is power-limited at 300 kWe.
   - Falsified if the trajectory study shows minimum transfer-plus-window time above about 2.5 yr. In that case drop to about 200 kWe and add vehicles or targets.
8. **Decision.** 300 kWe, Isp 1,800 s, fleet 4.5 MWe, accepting about 300 t/yr of propellant demand.
9. **Consequences.**
   - Sets the propellant line and the spares rate.
   - **Weakest link: reasoning.** Round 1 had the data to reconcile D3 and did not.

### Decision C: Propellant (D5, D6). QOC.

**Question:** which propellant for the production fleet?

| Criterion | Xe | Kr | I₂ |
|---|---|---|---|
| Supply | Fails (3–10× world output). Must-fail. | 40–170% of world output | ~1–2% |
| TRL at ≥50 kW | High | Medium-high | Low (TRL 2–3) |
| Tankage | Good | Poor (~100 m³, 10–15%) | Excellent |
| Life risk | Known | Known | Cathode and corrosion risk |

- **Trade-off point:** krypton vs. iodine trades schedule risk against supply risk.
- **Weakest link: information.** World krypton supply is unsourced.
- **Falsification test:** an iodine Hall thruster at ≥20 kW reaching ≥5,000 h with less than 20% performance loss before PDR. If it fails, krypton-plus-contracts becomes the baseline, or the fleet is capped by krypton availability.
- **Certainty:** iodine qualified at scale by about 2032: *about as likely as not*, low confidence.

### Decision D: Remove human-rating (D4). GRADE EtD.

| GRADE EtD element | Assessment |
|---|---|
| Benefits of retaining | Option value, but only for crew transport that this vehicle cannot physically perform (1–2-yr legs, ~1 Sv dose). |
| Harms of retaining | 2–4 t per vehicle; $0.2–0.4B; requirements creep (3g, dual-fault-tolerant avionics). |
| Certainty of evidence for rq-0-18's premium and penalty | Very low. Asserted, not itemised. |
| Values | Crew risk acceptance was never stated. |
| Feasibility | Shelter-in-place for 30 days against multi-year rescue times fails. |

- **Recommendation:** strong, against human-rating the tugs. Keep the IDSS port as a cheap real option.
- **Weakest link in rq-0-18: frame.** It assumed 60–90-day transits.
- **Falsification test:** a demonstrated EP or hybrid design meeting less than 120-day transits to a Phase 0 target at under 2× unit cost. I judge this *very unlikely*, medium confidence.
- **Round 1 "agreed" removal, but with Gemini dissenting.** That dissent is a values position on option value, not a physics claim, and should be kept as such.

### Decision E: The BOM delta as a whole

- **Weakest link: commitment and frame.** No consolidated Phase 0 cost exists after the adds.
- My adds total roughly:
  - **one-time:** +$3.5–8B (fleet increase over the $2B line, NRE, launch, containers, ground segment);
  - **recurring:** +$0.3–1.5B/yr (propellant, spares).
- That moves Phase 0 from about $15.7B to about **$20–30B** before any crew scope. This needs a decision-rights owner (RAPID "Decide") before it is accepted.

---

```yaml
item: bom-0-4
model: Claude (Anthropic), round-2 reviewer
findings:
  - id: P0-F01
    verdict: agree
    summary: Delivered mass per kWe-year is about 0.12-0.3 t at 6-10 km/s, so the current spec delivers ~0.3 kt/yr and closing 50 kt/yr by SEP needs ~100-400 MWe; round-1 power spread is explained by two designs being trajectory-limited, and NEA synodic access may cap cadence further.
    proposed_change: Specify the fleet at ~4.5 MWe total EP power delivering ~1 kt/yr, cap transport-fed station input at 2 kt/yr, and gate on a trajectory/access study including whole-object retrieval.
  - id: P0-F10
    verdict: agree
    summary: Tugs with 1-2 yr legs cannot carry crew (rq-0-18 assumed 60-90 day transits, and the 3g requirement is unmotivated), so bom-0-4 is uncrewed; station crewing is a separate gated decision.
    proposed_change: Remove human-rating provisions and crew kits, keep an IDSS-compatible docking port, and add a crew decision gate at bom-0-3 SRR defaulting to teleoperated uncrewed.
  - id: P0-F11
    verdict: agree
    summary: Fleet needs ~300 t/yr (150-600) of EP propellant, which is 3-10x world xenon and ~40-170% of estimated world krypton but ~1-2% of world iodine, and ISPP output has no Phase 0 consumer.
    proposed_change: Add an EP propellant supply line at ~$0.15-0.9B/yr and defer bom-0-6 deployment to Phase 0B, with a water-propellant tug trade as its future consumer.
  - id: P0-F15
    verdict: agree
    summary: Concluded deliberations were never dispositioned; for bom-0-4, rq-0-14 and rq-0-11 are accepted, rq-0-18 is mostly rejected, rq-0-47 is rejected, and rq-0-30/48 apply narrowly.
    proposed_change: Adopt the disposition register in section 1 and write the resulting mass, power and cost changes into the consensus.
  - id: P0-F16
    verdict: agree
    summary: The BOM is authoritative for quantity (15) and the exclusion of xenon, but neither document closes on physics or cost; the $2B line was held fixed across fleet counts.
    proposed_change: Regenerate the consensus from the revised spec and label each figure as BOM-authoritative or physics-derived.
revised_spec:
  - parameter: fleet_quantity
    old: 15 (BOM) / 10 (consensus)
    new: 15 (2 pathfinders + 13 production)
    range: [10, 20]
    unit: vehicles
    basis: judgement
    confidence: medium
  - parameter: fleet_ep_power
    old: unspecified
    new: 4.5
    range: [3, 7.5]
    unit: MWe
    basis: calculation
    confidence: medium
  - parameter: ep_power_per_vehicle
    old: ~60-130 kWe EOL implied by 300-500 m2
    new: 300
    range: [200, 500]
    unit: kWe
    basis: calculation
    confidence: medium
  - parameter: array_area_per_vehicle
    old: 300-500
    new: 1300
    range: [900, 2500]
    unit: m2
    basis: calculation
    confidence: medium
  - parameter: specific_impulse
    old: unspecified
    new: 1800
    range: [1500, 2500]
    unit: s
    basis: judgement
    confidence: medium
  - parameter: thrust_per_vehicle
    old: unspecified
    new: 17
    range: [11, 28]
    unit: N
    basis: calculation
    confidence: high
  - parameter: dry_mass
    old: unspecified
    new: 35
    range: [25, 50]
    unit: t
    basis: judgement
    confidence: low
  - parameter: payload_per_trip
    old: 150-250
    new: 200
    range: [100, 250]
    unit: t
    basis: judgement
    confidence: medium
  - parameter: round_trip_delta_v_target_criterion
    old: 6-10
    new: 6
    range: [3, 8]
    unit: km/s
    basis: calculation
    confidence: medium
  - parameter: propellant_per_round_trip
    old: unspecified
    new: 60
    range: [45, 85]
    unit: t
    basis: calculation
    confidence: medium
  - parameter: cycle_time
    old: ~1.5 implied
    new: 2.5
    range: [2, 8]
    unit: yr
    basis: calculation
    confidence: low
  - parameter: cycles_over_life
    old: 10+
    new: 5
    range: [2, 7]
    unit: cycles
    basis: calculation
    confidence: low
  - parameter: fleet_delivered_mass
    old: implied 50000
    new: 1000
    range: [500, 2000]
    unit: t/yr
    basis: calculation
    confidence: medium
  - parameter: fleet_propellant_demand
    old: unspecified
    new: 300
    range: [150, 600]
    unit: t/yr
    basis: calculation
    confidence: medium
  - parameter: thruster_module_throughput_requirement
    old: unspecified
    new: 5
    range: [2, 10]
    unit: t per module
    basis: judgement
    confidence: low
  - parameter: human_rating_structural_provision
    old: 2-4 t per vehicle (rq-0-18)
    new: 0.5 (IDSS docking port only)
    range: [0.3, 0.6]
    unit: t per vehicle
    basis: judgement
    confidence: medium
  - parameter: unit_recurring_cost
    old: 133
    new: 250
    range: [180, 400]
    unit: USD M
    basis: literature
    confidence: low
  - parameter: nonrecurring_development
    old: unspecified
    new: 1500
    range: [800, 3000]
    unit: USD M
    basis: judgement
    confidence: low
interfaces:
  - with: bom-0-3
    flow: mass
    value: 1000 t/yr ore/concentrate inbound (500-2000)
    in_bom: true
  - with: bom-0-3
    flow: propellant
    value: 300 t/yr Kr/I storage and transfer (150-600)
    in_bom: false
  - with: bom-0-3
    flow: power
    value: 0.05-0.15 MW dockside service peak
    in_bom: false
  - with: bom-0-3
    flow: other
    value: despun berthing hub per rq-0-11
    in_bom: false
  - with: bom-0-2
    flow: mass
    value: 20 robots carried outbound, est. 2-20 t each
    in_bom: false
  - with: bom-0-1
    flow: data
    value: target list of >=10 NEAs with round-trip delta-v <=6 km/s and windows over 2035-2050
    in_bom: false
  - with: bom-0-5
    flow: power
    value: 4.5 MWe tug arrays carried inside bom-0-4 (exclude from bom-0-5)
    in_bom: true
  - with: bom-0-6
    flow: propellant
    value: 0 t/yr in Phase 0
    in_bom: false
  - with: bom-0-7
    flow: data
    value: ops authority, spectrum, traffic coordination; fleet telemetry <1 GB/day
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-4
    quantity: 15 vehicles (2 pathfinder + 13 production), 4.5 MWe fleet
    unit_cost_usd: [180000000, 400000000]
    rationale: Power-limited sizing needs ~300 kWe per vehicle, and the Gateway PPE analogue puts unit cost well above $133M.
  - action: add
    item: EP propellant supply and delivery (Kr/I)
    quantity: ~300 t/yr (150-600)
    unit_cost_usd: [150000000, 900000000]
    rationale: Annual cost per year of propellant that no BOM line provides; xenon is excluded on supply grounds.
  - action: add
    item: Transport development and qualification program
    quantity: 1
    unit_cost_usd: [800000000, 3000000000]
    rationale: Needs MW-class fleet EP and wear qualification of a new propellant at >=50 kW.
  - action: add
    item: Fleet launch and deployment
    quantity: 15-30 heavy launches
    unit_cost_usd: [50000000, 150000000]
    rationale: Fleet launch and transfer to cislunar space are not in scope anywhere.
  - action: add
    item: Thruster/PPU spares and robotic replacement
    quantity: 30-250 modules/yr
    unit_cost_usd: [2000000, 8000000]
    rationale: Fleet propellant throughput far exceeds demonstrated per-thruster lifetime.
  - action: add
    item: Ground segment and deep-space communications
    quantity: 1
    unit_cost_usd: [100000000, 400000000]
    rationale: Operating 15 tugs plus NEA sites needs DSN-class links and an operations centre.
  - action: add
    item: Standard cargo containers and latching
    quantity: 30-60
    unit_cost_usd: [500000, 3000000]
    rationale: The consensus assumes standard containers but no line provides them.
  - action: add
    item: Trajectory access and transport architecture trade (shuttle vs co-location vs retrieval vs water tug)
    quantity: 1
    unit_cost_usd: [5000000, 20000000]
    rationale: Delta-v and synodic access dominate throughput and are unverified; the study gates bom-0-3 and bom-0-4.
  - action: remove
    item: Structural human-rating provisions and crew kits within bom-0-4
    quantity: 0
    unit_cost_usd: [0, 0]
    rationale: Multi-year low-thrust legs preclude crew carriage; saves about $0.2-0.4B and 2-4 t per vehicle.
  - action: resize
    item: bom-0-3
    quantity: 1 station, transport-fed input capped at 2 kt/yr pending trade
    unit_cost_usd: [10000000000, 10000000000]
    rationale: 50 kt/yr cannot be fed by SEP transport; $10B is a placeholder, not endorsed.
  - action: split
    item: bom-0-6
    quantity: design-for in Phase 0, deploy in Phase 0B
    unit_cost_usd: [500000000, 500000000]
    rationale: No Phase 0 vehicle consumes LOX/LH2; rq-0-14 already moved deployment to Phase 0B.
  - action: split
    item: bom-0-5
    quantity: stationary arrays vs mobile tug arrays (accounting)
    unit_cost_usd: [0, 0]
    rationale: Prevents double counting the 4.5 MWe of tug arrays carried in bom-0-4.
open_questions:
  - Do >=10 NEAs with round-trip delta-v <=6 km/s give enough phased windows over 2035-2050 for >=0.4 cycles per vehicle-year, or is cadence window-limited?
  - Do enough objects with return delta-v below 1 km/s exist for KISS-style whole-object retrieval to outperform shuttling?
  - Is the processing station cislunar or co-located at the NEA, and what product (not input) mass must Phase 0 deliver?
  - What is sourced world krypton production and the price for propulsion-grade supply at 150-600 t/yr?
  - Can an iodine Hall thruster at >=20 kW reach >=5000 h with <20% degradation before PDR?
  - What per-module propellant throughput can magnetically shielded Hall thrusters actually demonstrate on krypton or iodine?
  - Is Phase 0 operable uncrewed via teleoperation, and if not, who funds $1-8B/yr of crew sorties?
  - What is the consolidated Phase 0 cost after all proposed adds, and who holds decision rights to accept it?
```
