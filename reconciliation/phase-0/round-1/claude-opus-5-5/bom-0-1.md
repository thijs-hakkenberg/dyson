---
phase: phase-0
item: bom-0-1
round: 1
type: reassessment
modelId: claude-opus-5-5
modelName: "Claude Opus 5.5"
endpoint: databricks-claude-opus-5-5
findings: 8607ae186f99
priorRound: null
generated: 2026-10-11T18:40:41.222Z
seconds: 176.066
---

# bom-0-1 Prospecting Satellites: Re-assessment

## 1. Findings

### P0-F06: "20 asteroids per satellite per year is not reachable by a 100 kg spacecraft"

**Verdict: agree.** The rate fails under every definition of "survey". The fix is to drop the rate, define the mission, and resize the fleet from that definition.

#### a) Δv capacity of the specified bus

All values are estimates using the rocket equation, Δv = Isp·g₀·ln(m₀/m_f).

| Bus | Wet mass | Propellant | Isp | Δv |
|---|---|---|---|---|
| Green monoprop (AF-M315E/ASCENT class) | 100 kg | 30 kg | 245 s | 2,403 m/s × ln(100/70) ≈ **0.86 km/s** |
| Small EP (iodine/xenon gridded or Hall) | 100 kg | 15 kg | 2,000 s | 19,620 m/s × ln(100/85) ≈ **3.2 km/s** |

EP is limited by thrust as well as propellant. For example, a BIT-3 class thruster gives about 1.1 mN at roughly 75 W. On 100 kg that is 1.1×10⁻⁵ m/s², or about 0.35 km/s per year of continuous thrusting.

#### b) Δv required per target

These figures are judgement, consistent with NHATS-type accessibility tables and multi-target tour studies.

- **Departure from C3 ≈ 0 to the first rendezvous with a "good" NEA:** about 2–5 km/s.
- **NEA-to-NEA rendezvous leg:** about 1–3 km/s, with low-thrust flight times of about 0.5–2 years per leg.
- **Flyby retargeting in a tour:** about 0.05–0.5 km/s per encounter. Encounter spacing is set by geometry, not Δv. Achieved tours run 0.5–2 years per encounter:
  - Lucy: about 10 bodies in 12 years, gravity-assisted.
  - Hayabusa2 extended mission: 2 targets in about 11 years.

#### c) What 20 targets per year would actually require

- **Rendezvous:** 20 × 1–3 km/s = 20–60 km/s per year, plus 20 legs that each take months. This is impossible for any spacecraft, not just a 100 kg one.
- **Flyby:** Δv per encounter could be affordable, but there are not 20 reachable encounter geometries per year for a single trajectory. Realistic rate is about 0.5–1.5 per year.
- **Remote (telescopic):** a 10–20 cm aperture cannot take VNIR spectra of typical V ≈ 19–22 NEAs. It would be inferior to ground facilities such as IRTF/MITHNEOS, SMASS and Rubin colours. It would also duplicate NEO Surveyor's thermal-IR census of more than about 2/3 of NEAs larger than 140 m. "Survey" in the population sense is already being bought by others. Phase 0 should not pay for it.

#### Proposed definition

Population-level survey is a data input, not hardware. The satellites perform **close-proximity characterisation of a shortlist** of candidates pre-selected from ground and NEO Surveyor data.

| Type | Targets per spacecraft | Rate |
|---|---|---|
| Rendezvous scouts | 2–4 over 7 years | 0.3–0.6 per year |
| Flyby scouts | 3–6 over 5–7 years | 0.5–1.5 per year |

#### Fleet sizing from need

Phase 0 has 20 mining robots, 4 ISPP units and 1 processing station. That implies roughly 2–5 operational targets plus backups.

- I estimate about 15–30 rendezvous-grade characterisations are needed, assuming a 15–30 % hit rate on shortlisted candidates being economically suitable (judgement).
- With 2–4 rendezvous each, that gives **6–12 rendezvous scouts**.
- Add 0–8 flyby scouts to triage further candidates at lower cost.
- **Baseline: 8 rendezvous + 4 flyby = 12 spacecraft**, down from 32 in the BOM and 50 in the consensus.

#### The 100 kg mass is also too low for the rendezvous role

Rendezvous needs 5–8 km/s and a gamma-ray/neutron spectrometer (GRNS) for hydrogen and water. A plausible sizing:

- 180 kg wet, 60 kg propellant, Isp 1,700 s gives Δv = 16,677 m/s × ln(180/120) ≈ 6.8 km/s.
- About 25 mN thrust at η ≈ 0.45 needs P = F·v_e/(2η) ≈ 0.025 × 16,700 / 0.9 ≈ 0.46 kW for the thruster.
- That implies a solar array of about 0.8–1.2 kW BOL to cover 1.3 AU operations.

### P0-F16: "Consensus documents disagree with the BOM they describe"

**Verdict: agree.** For this item specifically:

- The consensus says 50 units and $250M. The BOM says 32 units and $160M. Neither figure is derived from a target count.
- The consensus says "all models agree 50 satellites is appropriate" and also lists "minimum constellation size" as an open question. It contradicts itself.
- The BOM flags "high" confidence on a $5M deep-space unit cost, which has no heritage support:
  - Janus (two roughly 36 kg spacecraft) had a cost cap of about $55M.
  - Lunar Trailblazer cost about $70M+.
  - LunaH-Map, a 6U CubeSat, cost on the order of $15–20M including instrument.
  - AstroForge's roughly 100 kg Odin (2025, rideshare) shows commercial attempts are cheaper but unproven; it was lost early.
- The specified 0.4–2.5 µm spectral range omits the 2.7–3 µm hydration band. That band is the most relevant measurement for bom-0-6 water extraction.

**Change:**
- Regenerate the consensus from current specs, including the claude-opus-4-6 spec.
- Make this re-assessment's figures authoritative for the BOM line.
- Add fleet size and cost as explicit divergent topics.
- Downgrade confidence to low–medium.

## 2. Revised specification

| Parameter | Old | New (point) | Range | Basis | Confidence |
|---|---|---|---|---|---|
| Mission definition | "survey" (undefined) | Proximity characterisation of a pre-screened shortlist | n/a | judgement | medium |
| Survey rate, rendezvous | 20+/sat/yr | 0.4/sat/yr (≈3 per life) | 0.3–0.6 | calculation | medium |
| Survey rate, flyby | 20+/sat/yr | 0.8/sat/yr | 0.5–1.5 | literature (Lucy, tour studies) | medium |
| Fleet size | 32 (BOM) / 50 (consensus) | 12 (8 rendezvous + 4 flyby) | 8–20 | calculation | low–medium |
| Pathfinders | 5 | 2 (one of each type) | 1–3 | judgement | medium |
| Wet mass, rendezvous scout | 80–120 kg | 180 kg | 150–250 | calculation | medium |
| Wet mass, flyby scout | 80–120 kg | 100 kg | 70–130 | judgement | medium |
| Δv, rendezvous | unspecified | 6.5 km/s | 5–8 | calculation | medium |
| Δv, flyby | unspecified | 1.0 km/s | 0.5–1.5 | judgement | medium |
| Propulsion, rendezvous | monoprop/EP/hybrid | EP (xenon or iodine), plus small cold-gas/monoprop for proximity ops | n/a | calculation | medium |
| EP propellant per rendezvous scout | unspecified | 60 kg | 45–90 | calculation | medium |
| Solar array | "deployable" | 1.0 kW BOL | 0.8–1.5 | calculation | medium |
| Spectral range | 0.4–2.5 µm | 0.4–3.5 µm (passively cooled extension) | 0.4–3.2 to 0.4–4.3 | literature (NIRS3, OVIRS) | medium |
| TIR | "3–14 µm, cooling issue" | 8–14 µm uncooled microbolometer for thermal inertia | n/a | literature (Hayabusa2 TIR) | high |
| GRNS (rendezvous only) | absent | 3–6 kg neutron/gamma unit | 2–8 kg | literature (Dawn GRaND, LunaH-Map) | medium |
| Recurring unit cost, rendezvous | $5M | $27M | $18–35M | literature + judgement | low |
| Recurring unit cost, flyby | $5M | $15M | $10–20M | judgement | low |
| Programme NRE (common bus, 2 variants) | unspecified | $115M | $80–150M | judgement | low |
| Line total, hardware + NRE | $160M | $395M | $280–510M | calculation | low |
| Launch (not in this line) | unspecified | $120M | $60–180M | judgement | low |
| Ops (not in this line), 7 yr | unspecified | $125M | $85–170M | judgement | low |
| Full lifecycle cost | n/a | ≈ $0.65B | $0.45–0.9B | calculation | low |

Notes on the table:

- **Propellant choice.** Xenon is acceptable for this item. 12 craft × ≤90 kg is about 1 t total, roughly 1–2 % of one year of world output. The bom-0-4 xenon constraint does not bind here. Iodine (flown on NPT30-I2) is the alternative if commonality with bom-0-4 is wanted.
- **Data-return assumption.** About 5–20 kbps at 1 AU to a 34 m antenna is assumed. MarCO achieved 8 kbps at about 1 AU.

## 3. Interfaces

| With | Flow | Value | In BOM? |
|---|---|---|---|
| bom-0-2 Mining Robots | data | Shape model, gravity field, surface mechanical properties, boulder maps for 2–5 selected targets; ~5–20 GB per target | no (not stated) |
| bom-0-6 ISPP | data | Hydration band depth (2.7–3 µm), GRNS hydrogen wt %, thermal inertia → regolith vs bare rock (bucket-wheel feasibility) | no |
| bom-0-4 Transport | data | Refined ephemerides, rotation state, approach hazards; optional relay/beacon role after science phase | no |
| bom-0-3 Processing | data | Bulk mineralogy and metal fraction to set process route | no |
| bom-0-5 Power | power | 0 MW. Self-powered, about 1 kW per craft; no draw on the 100 MW arrays | n/a |
| bom-0-6 ISPP | propellant | 0 t/yr. Fleet precedes ISPP; ~0.7–1 t xenon or iodine total from Earth | no (procurement) |
| bom-0-7 Organisation | other | Data-rights agreements (NEO Surveyor, MITHNEOS, Rubin), launch licensing, spectrum filings | partly |
| Ground segment (missing) | data | ~50–200 GB/yr fleet total; ~4–10 DSN-equivalent hours per craft per week | **no** |

## 4. Missing items or scope

1. **Launch services.** Escape-energy rideshare is scarce. Options are a shared dedicated launch to C3 ≈ 0 (4–8 craft) or a LEO rideshare plus a kick stage. $60–180M is not in the BOM. A phase-wide launch line is also needed for the bom-0-2, 0-3, 0-4 and 0-6 hardware.
2. **Mission operations and ground segment.** Covers DSN or commercial deep-space antenna time, flight dynamics, and the data-processing pipeline: $85–170M over 7 years. This should be a phase-wide line.
3. **Ground and NEO Surveyor data access, plus a modest ground-telescope programme** to build the shortlist: about $5–20M. This replaces the role "survey" was implicitly given.
4. **Instrument development** (extended-range VNIR, small GRNS). This is the critical path. It is folded into NRE above but should be tracked separately.
5. **Contingency.** 25–40 % is appropriate at this maturity. The consensus figure of 15–20 % is too thin for a first-of-kind deep-space fleet.

## 5. Remaining disagreements and open questions

- **Flyby scouts or not.** Flyby data, without GRNS and with limited dwell, may not change target ranking enough to justify 4 craft. An all-rendezvous fleet of 10 is defensible.
- **Cheaper unit costs.** Commercial players (AstroForge, Karman+) aim for under $10M per 100 kg deep-space unit. If proven, unit costs could fall by 2–3×. There is no successful flight heritage yet. The low end of my range assumes partial success.
- **Hit rate.** If ground and NEO Surveyor screening is better than assumed (above 30 %), the fleet could drop to 6–8.
- **Propellant: xenon vs iodine.** Xenon has the most mature small thrusters. Iodine is denser and shares supply with bom-0-4. Neither choice dominates.
- **Rendezvous-scout mass.** A larger craft (about 300 kg, 10 km/s) visiting 4–5 targets might beat more small craft on cost per target. This needs a trade study.
- **Whether prospecting must precede the commitment to bom-0-2, 0-3 and 0-6 hardware.** It should. That implies a 3–5 year schedule gate the phase plan does not yet show.

```yaml
item: bom-0-1
model: claude-opus-4-7
findings:
  - id: P0-F06
    verdict: agree
    summary: A 100 kg bus has 0.9-3.2 km/s of delta-v and NEA rendezvous legs cost 1-3 km/s each, so 20 targets per satellite per year is impossible by rendezvous, by flyby (geometry-limited to ~0.5-1.5/yr) and pointless by remote observation (ground facilities and NEO Surveyor already cover the population).
    proposed_change: Redefine the mission as proximity characterisation of a pre-screened shortlist and resize to ~12 craft (8 EP rendezvous scouts of ~180 kg and 6-8 km/s, plus 4 flyby scouts) giving ~25 rendezvous and ~20 flyby characterisations.
  - id: P0-F16
    verdict: agree
    summary: Consensus (50 units, $250M) and BOM (32 units, $160M) disagree, neither is derived from a target count, the consensus contradicts itself on fleet size, and it omits the 2.7-3 um hydration band needed by ISPP.
    proposed_change: Regenerate the consensus from current specs including claude-opus-4-6 and make this re-assessment the authoritative source for the bom-0-1 line, with confidence lowered to low-medium.
revised_spec:
  - parameter: fleet_size
    old: 32
    new: 12
    range: [8, 20]
    unit: spacecraft
    basis: calculation
    confidence: low
  - parameter: survey_rate_rendezvous
    old: 20
    new: 0.4
    range: [0.3, 0.6]
    unit: targets per spacecraft per year
    basis: calculation
    confidence: medium
  - parameter: survey_rate_flyby
    old: 20
    new: 0.8
    range: [0.5, 1.5]
    unit: targets per spacecraft per year
    basis: literature
    confidence: medium
  - parameter: wet_mass_rendezvous_scout
    old: 80-120
    new: 180
    range: [150, 250]
    unit: kg
    basis: calculation
    confidence: medium
  - parameter: wet_mass_flyby_scout
    old: 80-120
    new: 100
    range: [70, 130]
    unit: kg
    basis: judgement
    confidence: medium
  - parameter: delta_v_rendezvous_scout
    old: unspecified
    new: 6.5
    range: [5, 8]
    unit: km/s
    basis: calculation
    confidence: medium
  - parameter: solar_array_power
    old: unspecified
    new: 1.0
    range: [0.8, 1.5]
    unit: kW BOL
    basis: calculation
    confidence: medium
  - parameter: spectrometer_range_upper
    old: 2.5
    new: 3.5
    range: [3.2, 4.3]
    unit: um
    basis: literature
    confidence: medium
  - parameter: pathfinders
    old: 5
    new: 2
    range: [1, 3]
    unit: spacecraft
    basis: judgement
    confidence: medium
  - parameter: unit_cost_rendezvous_recurring
    old: 5
    new: 27
    range: [18, 35]
    unit: USD million
    basis: literature
    confidence: low
  - parameter: unit_cost_flyby_recurring
    old: 5
    new: 15
    range: [10, 20]
    unit: USD million
    basis: judgement
    confidence: low
  - parameter: line_total_hardware_plus_nre
    old: 160
    new: 395
    range: [280, 510]
    unit: USD million
    basis: calculation
    confidence: low
interfaces:
  - with: bom-0-2
    flow: data
    value: 5-20 GB per selected target (shape, gravity, surface properties)
    in_bom: false
  - with: bom-0-6
    flow: data
    value: hydration band depth, GRNS hydrogen wt%, thermal inertia for 15-30 candidates
    in_bom: false
  - with: bom-0-4
    flow: data
    value: ephemerides and rotation states for 2-5 targets; optional beacon/relay
    in_bom: false
  - with: bom-0-3
    flow: data
    value: bulk mineralogy and metal fraction per target
    in_bom: false
  - with: bom-0-5
    flow: power
    value: 0 MW (self-powered, ~1 kW per craft)
    in_bom: true
  - with: bom-0-7
    flow: other
    value: data-rights agreements, launch licensing, spectrum filings
    in_bom: false
  - with: ground-segment (missing)
    flow: data
    value: 50-200 GB/yr fleet total, 4-10 antenna-hours per craft per week
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-1
    quantity: 12
    unit_cost_usd: [23000000, 42000000]
    rationale: Fleet sized from 15-30 required rendezvous characterisations at 2-4 per craft; unit cost includes amortised NRE and reflects deep-space smallsat heritage rather than LEO cubesat pricing.
  - action: add
    item: Launch services (phase-wide)
    quantity: 1
    unit_cost_usd: [60000000, 180000000]
    rationale: Escape-energy delivery for the prospecting fleet is not in any BOM line (figure covers bom-0-1 only).
  - action: add
    item: Mission operations and ground segment (phase-wide)
    quantity: 1
    unit_cost_usd: [85000000, 170000000]
    rationale: Seven years of deep-space tracking, flight dynamics and data processing for ~12 craft are unfunded.
  - action: add
    item: Target screening data and ground observation programme
    quantity: 1
    unit_cost_usd: [5000000, 20000000]
    rationale: Population survey is delegated to ground facilities and NEO Surveyor, which needs data agreements and follow-up time.
open_questions:
  - What fraction of ground/NEO Surveyor-shortlisted NEAs will prove economically suitable after rendezvous (sets fleet size between 6 and 20)?
  - Do flyby scouts change target ranking enough to justify their cost, or should the fleet be all-rendezvous?
  - Is a smaller number of larger (~300 kg, ~10 km/s) rendezvous craft cheaper per characterised target?
  - Xenon or iodine EP, and should it be common with bom-0-4?
  - Can commercial deep-space smallsat pricing (<$10M/unit) be demonstrated by pathfinders before the full buy?
  - Should procurement of bom-0-2, 0-3 and 0-6 be gated on prospecting results, and what schedule delay does that impose?
```
