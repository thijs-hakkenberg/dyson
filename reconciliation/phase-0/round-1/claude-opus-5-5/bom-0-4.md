---
phase: phase-0
item: bom-0-4
round: 1
type: reassessment
modelId: claude-opus-5-5
modelName: "Claude Opus 5.5"
endpoint: databricks-claude-opus-5-5
findings: 8607ae186f99
priorRound: null
generated: 2026-10-11T20:40:20.848Z
seconds: 265.77
---

# bom-0-4 Transport Vehicles: Phase-0 Re-assessment

## Summary

The review is right on its central point. The transport fleet as specified cannot feed a 50 kt/yr station.

- **The fleet is power-limited.** Delivered mass scales with total installed electric-propulsion (EP) power, at roughly 0.1–0.35 t delivered per kWe-yr.
- **50 kt/yr is out of reach.** Closing it needs about 150–500 MWe of EP power and roughly 30 kt/yr of Earth-supplied propellant. That is not credible for Phase 0.
- **Phase 0 must be split.**
  - Phase 0 becomes a pilot delivering about 1 kt/yr with 15 upgraded electric tugs.
  - The 50 kt/yr target moves to Phase 0B. It needs asteroid-sourced propellant, beneficiation at the asteroid, or both.
- **I disagree with the human-rating conclusion (rq-0-18).** It assumes 60–90 day transits, but these tugs need several years per round trip. Crew should not ride them.

---

## 1. Findings

### P0-F01: Transport capacity vs. station throughput. **Verdict: agree.**

The finding's power figure is slightly optimistic, which makes the shortfall worse, not better.

**Array power at 1 AU**

- Assumptions: 1,361 W/m² × ~30% cell efficiency (III-V) × ~0.85 packing ≈ 350 W/m² at beginning of life, about 300 W/m² after degradation.
- 300–500 m² therefore gives **~90–175 kWe**, not 150–250 kWe.
- Targets beyond about 1.3 AU reduce this further, by 1/r².

**Thrust (power-limited Hall thruster)**

- T = 2ηP / (g₀·Isp).
- Assumptions: η = 0.50 (krypton runs about 5–10 points below xenon), Isp = 1,800 s, so exhaust velocity vₑ = 17.66 km/s.
- At P = 150 kW: T ≈ 8.5 N. Propellant flow ṁ = T/vₑ = 4.8×10⁻⁴ kg/s ≈ **15 t/yr**.

**Propellant per round trip (rocket equation, two legs)**

Assumptions: 200 t payload, 40 t dry mass, Δv split 4 + 4 km/s.

| Leg | Calculation | Propellant |
|---|---|---|
| Return (loaded) | 240 t × (e^(4/17.66) − 1) = 240 × 0.254 | 61 t |
| Outbound (empty, carrying return propellant) | 301 t × 0.254 | 77 t |
| **Total** | | **~138 t** |

- Burn time = 138 t ÷ 15 t/yr ≈ **9 years of continuous thrust** per round trip.
- With a 6 km/s total Δv it is about 6 years. Duty cycle (~90%) and coast arcs add to this.
- The "10+ cycles in 15 years" claim is wrong by a factor of **5–10**.

**General throughput metric**

- Delivered mass per unit power: k = 2η·M_pay / (M_prop·vₑ²).

| Δv (round trip) | Isp | k (t per kWe-yr) |
|---|---|---|
| 8 km/s | 1,800 s | 0.15 |
| 8 km/s | 1,500 s | 0.17 |
| 4 km/s | 1,800 s | 0.33 |

- Including duty cycle and degradation, k ≈ **0.1–0.3 t/kWe-yr**.

**Fleet as specified**

- 15 × 150 kW = 2.25 MW → **0.2–0.7 kt/yr**.
- That is **70–250× short** of 50 kt/yr, consistent with the finding's "~100×".

**Closing 50 kt/yr with solar-electric propulsion**

| Requirement | Value | Comparison |
|---|---|---|
| EP power | 170–500 MWe | 1.7–5× the entire 100 MW array line, which is already allocated to processing |
| Largest flown EP spacecraft class | ~10–25 kWe (Dawn, Psyche); Gateway PPE (60 kW) in development | ~10⁴× short |
| Propellant | ~0.5–0.7 t per t delivered → **~25–35 kt/yr** | About 100× world krypton output; comparable to the whole world's iodine output (~30–35 kt/yr, USGS) |

**Conclusion: closing 50 kt/yr with Earth-supplied electric propulsion is not possible in Phase 0.**

**Architecture options**

| Option | Delivered (kt/yr) | Verdict |
|---|---|---|
| A. Current spec | 0.2–0.7 | Does not close |
| B. 15 tugs × ~300 kWe, Δv-restricted NEA targets (4–6 km/s) | 0.6–1.5 | **Recommended for Phase 0 (pilot)** |
| C. Hundreds of MWe of SEP | 50 | Not credible on Phase 0 timescale |
| D. Water-propellant tugs refuelled at the asteroid (solar-thermal or LOX/LH₂, Isp 400–800 s) | 10–50 | Plausible for Phase 0B; depends on ISPP at the asteroid |
| E. Beneficiate at the asteroid (ship metal/water concentrate, ore mass ÷3–10) | Multiplies A–D by 3–10 | Recommended in combination with D |

Option D is plausible because, at an Isp of about 450 s, a 2.5 km/s return needs ~0.8–0.9 t propellant per t delivered. Trip time is then set by orbital mechanics (~1–3 yr), not by power.

**Proposed change**

- Re-spec bom-0-4 as Option B.
- Resize the station's Phase 0 throughput to a 1–2 kt/yr pilot line (that item needs its own reassessment).
- Carry Options D + E as the Phase 0B architecture trade.

### P0-F10: Crew transport and habitation not budgeted. **Verdict: partly agree.**

- **The gap is real.** The station consensus assumes quarterly visits, but no BOM line pays for them.
- **The tugs are the wrong crew vehicle.** They take 2–10 years per round trip, so radiation dose and consumables rule out crew. rq-0-18's "60–90 day transits" are physically inconsistent with this vehicle.
- **Crew to a cislunar station would come from separate vehicles.** That means commercial or government heavy crew vehicles, at roughly $0.2–1B+ per sortie (my estimate, anchored on Orion/SLS costs and on projected Starship-class costs).
- **Quarterly visits would cost $1–4B/yr.** That rivals the whole Phase 0 BOM.

**Proposed change**

- Phase 0 is **uncrewed by baseline**: robotic operation with teleoperation from Earth or cislunar space.
- Remove the structural human-rating provisions from bom-0-4. This saves about 2–4 t per vehicle and the $0.24–0.40B that rq-0-18 added.
- Carry a conditional line, "crew visit services + habitat", behind a decision gate. It is not part of bom-0-4.

### P0-F11: Tug propellant not in BOM; ISPP output has no Phase 0 consumer. **Verdict: agree.**

**Revised fleet demand (Option B)**

- About 45 t propellant per round trip.
- 15 tugs at one round trip per ~2.5 yr → **~270 t/yr** (range 180–400).

**Supply against world production**

| Propellant | World supply | Assessment |
|---|---|---|
| Krypton | ~100–500 t/yr (my estimate, low confidence; it is an air-separation byproduct at ~1.14 ppm in air) | Fleet demand could take **50–100%+ of world output**. This is the same failure mode as xenon, only smaller. |
| Iodine | ~30–35 kt/yr (USGS Mineral Commodity Summaries) | Demand is under 1% of supply. Stored solid at ~4.9 g/cm³, unpressurised. |
| Iodine flight heritage | ThrustMe NPT30-I2, ~60 W, 2020–21 | Hall thrusters at 50 kW class on iodine are TRL ~3; cathode and surface corrosion are open issues. |

**Proposed propellant baseline:** iodine, with a krypton-qualified thruster variant as the schedule fallback. Krypton use is capped by secured supply contracts.

**Delivered cost** is dominated by launch: roughly $0.5–3k/kg to the station, so **~$0.15–0.8B/yr**. This is currently unbudgeted.

**ISPP consumer.** Hall thrusters cannot burn water, LOX or LH₂. Water oxidises the cathode; water would need RF, ECR or microwave-electrothermal thrusters. So no Phase 0 element consumes ISPP output.

**Proposed change**

- Move bom-0-6 to Phase 0B, per rq-0-14.
- Add an EP propellant supply line.
- Make "water-propellant tug" an explicit Phase 0B trade that would give ISPP a consumer.

### P0-F15: Deliberations not written back. **Verdict: agree.**

What each conclusion changes in bom-0-4:

| Conclusion | Effect on transport vehicles |
|---|---|
| rq-0-18 (human-rating) | Not written back, and I recommend **reversing** it (see F10). Mass −2 to −4 t per vehicle; cost −$0.24 to −0.40B. |
| rq-0-14 (ISPP in Phase 0B at ≥25 kt/yr) | Confirms there is no ISRU propellant for tugs in Phase 0. Phase 0B tugs should be designed to burn asteroid water. |
| rq-0-30 (cryogenic boil-off) | Not applicable to an iodine baseline (solid). Krypton is stored supercritical in composite-overwrapped pressure vessels; tankage ≈ 10–15% of propellant mass. Applies only to a Phase 0B LOX/LH₂ tug. |
| rq-0-47 / rq-0-48 (sunshield, multilayer-insulation degradation) | Minor. Relevant only to propellant thermal control: iodine must be held at ~80–120 °C feed temperature, which costs about 1–3 kW of heater power. |
| rq-0-11 (0.05–0.15 g rotating zones) | Docking must be at a non-rotating hub or despun port; this is an interface requirement. |
| rq-0-28 (ISRU cost methodology) | Apply it to the propellant-supply cost line. |
| rq-0-29 (governance) | No direct effect. |

### P0-F16: Consensus vs. BOM disagree. **Verdict: agree.**

- The BOM's 15 units with krypton/iodine propulsion should be authoritative over the consensus document's 10 units with xenon.
- Neither set of figures survives the physics: neither the BOM's $133M unit cost nor the consensus document's 6–10 km/s, 10+ cycle spec.
- Regenerate the consensus from the revised spec below and from the current-generation model specs.

---

## 2. Revised specification (Option B, Phase 0 pilot)

| Parameter | Old | New (range) | Basis | Confidence |
|---|---|---|---|---|
| Quantity | 10 (consensus) / 15 (BOM) | 15 (12–20) | judgement | medium |
| EP power per vehicle (1 AU, beginning of life) | ~90–175 kWe implied | 300 kWe (250–400) | calculation | medium |
| Array area | 300–500 m² | ~1,000 m² (800–1,300); ~3–4 t at ~80–100 W/kg | calculation | medium |
| Isp | unspecified | 1,800 s (1,500–2,200) | calculation | medium |
| Thrust | ~8–13 N | 17 N (13–22) | calculation | medium |
| Payload per trip | 200 t | 200 t (100–250). Throughput is power-limited, so payload size has little effect on throughput. | judgement | medium |
| Dry mass | unspecified | 35 t (30–45) | judgement | low |
| Round-trip Δv | 6–10 km/s | 5 km/s (4–7), restricted to selected NEAs | literature (NHATS-type surveys) + judgement | low |
| Round-trip time | ~1.5 yr implied | 2.5 yr (2–4); 5–10 yr if Δv is 8–10 km/s | calculation | medium |
| Propellant per round trip | unspecified | 45 t (35–70) | calculation | medium |
| Cycles over 15-yr life | 10+ | 5 (3–7) | calculation | medium |
| Delivered per vehicle | unspecified | 80 t/yr (50–100) | calculation | medium |
| Fleet delivered | ~2 kt/yr implied | 1.2 kt/yr (0.6–1.5) | calculation | medium |
| Fleet propellant demand | unspecified | 270 t/yr (180–400) | calculation | medium |
| Propellant | xenon (consensus) / krypton or iodine (BOM) | iodine baseline, krypton fallback | literature (USGS) + judgement | low |
| Thruster lifetime throughput needed | unspecified | ~225 t per vehicle over its life (see note below) | calculation + literature | medium |
| Human-rating | structural provisions | none | judgement | medium |
| Unit cost | $133M | $250M ($180–400M) | judgement, analogue Gateway PPE (60 kW, ~$375M contract) | low |
| Fleet cost | $2.0B | $3.75B ($2.7–6.0B) | calculation | low |

**Thruster lifetime note.** Current flight-class Hall thrusters are qualified for about 2–4 t of xenon each (NASA AEPS/HERMeS class). Each tug would need about **50–100 replaceable thruster/PPU modules** over its life, so it must be designed for **thruster replacement at the station each trip**. This is a new requirement and the largest technical risk on the item.

---

## 3. Interfaces

| With | Flow | Value | In BOM? |
|---|---|---|---|
| bom-0-3 station | mass (cargo delivered) | 0.6–1.5 kt/yr, vs. 50 kt/yr assumed. **Mismatch.** | yes, but mis-sized |
| bom-0-3 station | propellant (resupply at station) | 180–400 t/yr iodine/krypton | **no** |
| bom-0-3 station | other (thruster module servicing) | ~15–40 modules/yr; robotic servicing bay | **no** |
| bom-0-3 station | other (docking) | non-rotating hub port, 200 t-class berthing | no (unspecified) |
| bom-0-2 mining robots | mass (container handoff at NEA) | ~80 t/yr per tug; standard containers | partly |
| bom-0-1 prospecting | data (target list: Δv, synodic access) | ≥5–10 targets with round-trip Δv ≤ 6 km/s | yes |
| bom-0-5 arrays | power | 0 by design; tugs carry their own ~4.5 MW of fleet arrays, inside the tug cost | yes (no overlap) |
| bom-0-6 ISPP | propellant | 0 t/yr in Phase 0 (no compatible consumer) | yes, but **orphaned** |
| Earth / ground | data | Deep-space comms for 15 tugs plus NEA sites; ~continuous low rate, periodic high rate | **no** |
| Earth / launch | mass | 15 × ~35 t dry plus first-fill propellant; ~15–30 heavy launches | **no** |

---

## 4. Missing items or scope

1. **EP propellant supply and delivery**: ~270 t/yr bought and launched, at ~$0.15–0.8B/yr.
2. **Launch and deployment of the fleet**: ~15–30 heavy-lift flights, roughly $1–3B (estimate). Alternatively, tugs spiral out from LEO on their own power, which takes ~1 yr and ~30–40 t of propellant each.
3. **Thruster/PPU spares and a robotic servicing capability**, either at the station or as a dedicated depot.
4. **Standard cargo containers**: ~30–45 units.
5. **Ground segment and deep-space communications capacity.** DSN capacity is already oversubscribed.
6. **Crew transport and habitat**: a conditional line, only if the decision gate selects a crewed station.
7. **A Phase 0B transport architecture study**: water-propellant tugs and/or beneficiation at the asteroid. This is the only credible path to the 25–50 kt/yr scale.

---

## 5. Remaining disagreements and open questions

- **Pilot scope.** Is a 1 kt/yr pilot worth a ~$10B station? An alternative is to shrink the station to match, or to co-locate a pilot processor at the asteroid and ship only product.
- **Iodine vs. krypton.**
  - Iodine fixes supply but is TRL ~3 at the 50 kW thruster scale.
  - Krypton is flight-proven at low power, but the world supply figure is poorly known.
  - A market study is needed before committing.
- **Station location and target set.** Real Δv values and synodic access windows are unknown; they set k and the number of targets the fleet must rotate across.
- **Spacecraft size.** Fewer, larger (MWe-class) tugs vs. more small tugs. Throughput is the same per kWe, but the two choices carry different development and failure risks.
- **Phase 0B propulsion.** Solar-thermal water, LOX/LH₂, water RF/ECR electric, and nuclear-electric are all open; each depends on asteroid water yield.
- **Crew.** Is Phase 0 truly operable uncrewed? Teleoperation from cislunar space vs. robotic autonomy is a station-level question.

---

```yaml
item: bom-0-4
model: Claude (Anthropic)
findings:
  - id: P0-F01
    verdict: agree
    summary: At ~150 kWe and Isp 1800 s a 6-10 km/s round trip takes 6-10 years and fleet delivery is 0.2-0.7 kt/yr, about 100x short of 50 kt/yr; closing it with SEP needs 170-500 MWe and ~30 kt/yr of propellant, which is not credible.
    proposed_change: Re-spec tugs to ~300 kWe with Delta-v-restricted NEA targets delivering ~1.2 kt/yr, resize station Phase 0 throughput to a 1-2 kt/yr pilot, and move 50 kt/yr to Phase 0B with water-propellant tugs and beneficiation at the asteroid.
  - id: P0-F10
    verdict: partly
    summary: Crew is unbudgeted, but tugs with multi-year transits cannot carry crew, so rq-0-18's human-rating of tugs is misplaced.
    proposed_change: Baseline Phase 0 as uncrewed, remove human-rating from bom-0-4, and add a conditional crew-services line outside bom-0-4 behind a decision gate.
  - id: P0-F11
    verdict: agree
    summary: Fleet needs ~180-400 t/yr of Kr/I, which may exceed world krypton output, and Hall thrusters cannot use ISPP water or LOX/LH2.
    proposed_change: Baseline iodine with krypton fallback, add an EP propellant supply line (~$0.15-0.8B/yr), and move ISPP to Phase 0B.
  - id: P0-F15
    verdict: agree
    summary: rq-0-18 and rq-0-14 directly affect tug mass, cost and propellant but are absent from the spec; rq-0-30/47/48/11 impose minor interface requirements.
    proposed_change: Write back rq-0-14, reverse rq-0-18 for tugs, and add hub-docking and propellant-thermal requirements.
  - id: P0-F16
    verdict: agree
    summary: The consensus (10 units, xenon) contradicts the BOM (15 units, Kr/I), and neither satisfies the physics.
    proposed_change: Treat the BOM quantity and propellant as authoritative and regenerate the consensus from the revised spec.
revised_spec:
  - parameter: quantity
    old: 10 (consensus) / 15 (BOM)
    new: 15
    range: [12, 20]
    unit: vehicles
    basis: judgement
    confidence: medium
  - parameter: EP power per vehicle at 1 AU BOL
    old: ~90-175 implied
    new: 300
    range: [250, 400]
    unit: kWe
    basis: calculation
    confidence: medium
  - parameter: array area
    old: 300-500
    new: 1000
    range: [800, 1300]
    unit: m2
    basis: calculation
    confidence: medium
  - parameter: specific impulse
    old: unspecified
    new: 1800
    range: [1500, 2200]
    unit: s
    basis: calculation
    confidence: medium
  - parameter: thrust
    old: ~8-13
    new: 17
    range: [13, 22]
    unit: N
    basis: calculation
    confidence: medium
  - parameter: payload per trip
    old: 200
    new: 200
    range: [100, 250]
    unit: t
    basis: judgement
    confidence: medium
  - parameter: dry mass
    old: unspecified
    new: 35
    range: [30, 45]
    unit: t
    basis: judgement
    confidence: low
  - parameter: round-trip delta-v
    old: 6-10
    new: 5
    range: [4, 7]
    unit: km/s
    basis: judgement
    confidence: low
  - parameter: round-trip time
    old: ~1.5 implied
    new: 2.5
    range: [2, 4]
    unit: yr
    basis: calculation
    confidence: medium
  - parameter: propellant per round trip
    old: unspecified
    new: 45
    range: [35, 70]
    unit: t
    basis: calculation
    confidence: medium
  - parameter: mission cycles over 15-yr life
    old: 10+
    new: 5
    range: [3, 7]
    unit: cycles
    basis: calculation
    confidence: medium
  - parameter: fleet delivered mass
    old: ~2 implied
    new: 1.2
    range: [0.6, 1.5]
    unit: kt/yr
    basis: calculation
    confidence: medium
  - parameter: fleet propellant demand
    old: unspecified
    new: 270
    range: [180, 400]
    unit: t/yr
    basis: calculation
    confidence: medium
  - parameter: replaceable thruster/PPU modules per vehicle over life
    old: unspecified
    new: 75
    range: [50, 100]
    unit: modules
    basis: calculation
    confidence: medium
  - parameter: structural human-rating mass
    old: 2-4
    new: 0
    range: [0, 0]
    unit: t per vehicle
    basis: judgement
    confidence: medium
  - parameter: unit cost
    old: 133
    new: 250
    range: [180, 400]
    unit: USD M
    basis: judgement
    confidence: low
interfaces:
  - with: bom-0-3
    flow: mass
    value: 1.2 kt/yr delivered (0.6-1.5)
    in_bom: true
  - with: bom-0-3
    flow: propellant
    value: 270 t/yr iodine/krypton resupply
    in_bom: false
  - with: bom-0-3
    flow: other
    value: 15-40 thruster modules/yr robotic servicing; non-rotating hub docking
    in_bom: false
  - with: bom-0-2
    flow: mass
    value: ~80 t/yr per tug of containerised material at the NEA
    in_bom: true
  - with: bom-0-1
    flow: data
    value: target list of >=5-10 NEAs with round-trip delta-v <= 6 km/s
    in_bom: true
  - with: bom-0-5
    flow: power
    value: 0 MW (tugs carry ~4.5 MW of fleet arrays internally)
    in_bom: true
  - with: bom-0-6
    flow: propellant
    value: 0 t/yr in Phase 0 (no compatible consumer)
    in_bom: true
bom_delta:
  - action: resize
    item: bom-0-4
    quantity: 15
    unit_cost_usd: [180000000, 400000000]
    rationale: Power must roughly double and thruster servicing must be added to deliver a credible ~1.2 kt/yr pilot throughput.
  - action: add
    item: EP propellant supply and delivery (iodine/krypton)
    quantity: 270 t/yr
    unit_cost_usd: [500, 3000]
    rationale: Tug propellant (per kg delivered to station) is unbudgeted, and Earth supply and launch dominate its cost.
  - action: add
    item: Thruster/PPU spares and robotic servicing
    quantity: 15-40 modules/yr
    unit_cost_usd: [2000000, 8000000]
    rationale: Lifetime throughput per tug is 10-20x what current Hall thrusters are qualified for.
  - action: add
    item: Launch and deployment of transport fleet
    quantity: 15-30 heavy launches
    unit_cost_usd: [50000000, 150000000]
    rationale: No BOM line covers getting ~35 t dry tugs plus first-fill propellant to the station.
  - action: add
    item: Ground segment and deep-space communications
    quantity: 1
    unit_cost_usd: [100000000, 400000000]
    rationale: 15 tugs and NEA mining sites need deep-space comms capacity beyond what DSN can spare.
  - action: resize
    item: bom-0-3
    quantity: 1 station, Phase 0 throughput 1-2 kt/yr pilot
    unit_cost_usd: [10000000000, 10000000000]
    rationale: Station throughput must match deliverable transport mass; the cost revision is left to the bom-0-3 reassessment.
  - action: remove
    item: bom-0-6
    quantity: 0 in Phase 0 (move to Phase 0B)
    unit_cost_usd: [500000000, 500000000]
    rationale: No Phase 0 vehicle burns its output, consistent with rq-0-14.
open_questions:
  - Is a ~1 kt/yr pilot worth a ~$10B station, or should processing be shrunk or co-located at the asteroid?
  - What is actual world krypton production and contractable supply, and can iodine Hall thrusters reach 50 kW-class at acceptable TRL by Phase 0?
  - Where is the station, and which NEAs give round-trip delta-v of 6 km/s or less with acceptable synodic access?
  - Which Phase 0B transport architecture (solar-thermal water, LOX/LH2, water electric, nuclear-electric) closes 25-50 kt/yr, and what asteroid water yield does it need?
  - Is robotic thruster replacement at the station feasible at 15-40 modules/yr?
  - Can Phase 0 operations be fully uncrewed, or is a crewed-station decision gate required?
```
