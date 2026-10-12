---
phase: phase-0
item: bom-0-1
round: 1
type: reassessment
modelId: gemini-3-8-flash
modelName: "Gemini 3.8 Flash"
endpoint: databricks-gemini-3-8-flash
findings: 8607ae186f99
priorRound: null
generated: 2026-10-11T18:40:41.249Z
seconds: 24.067
---

## 1. Findings

### P0-F06: 20 asteroids per satellite per year is not reachable by a 100 kg spacecraft
- **Verdict**: Agree.
- **Reasoning**:
  - Orbital mechanics strictly prohibits a physical encounter rate of 20 distinct Near-Earth Asteroids (NEAs) per satellite per year.
  - *Case 1: In-situ rendezvous.* Inter-NEA transfer $\Delta v$ typically requires $1.5\text{ to }4.0\text{ km/s}$ per hop, taking 1–3 years per transfer (e.g., Hayabusa2, OSIRIS-REx, NEAR Shoemaker). For a 100 kg SmallSat carrying electric propulsion ($I_{\text{sp}} \approx 2500\text{ s}$, wet mass fraction $\sim 0.3$), total lifetime $\Delta v \le 3.5\text{ km/s}$, limiting the craft to at most 1–2 rendezvous over a 7-year lifetime. Monopropellant ($I_{\text{sp}} \approx 220\text{ s}$) yields at best $300\text{ m/s}$ total $\Delta v$ for a 15% propellant mass fraction, insufficient for even one rendezvous retargeting.
  - *Case 2: Flyby tour.* Even aggressive low-thrust multi-flyby tours (e.g., Lucy, DESTINY+, Comet Interceptor) achieve roughly 0.5 to 1.5 flybys per year, requiring carefully pre-calculated orbital resonances and trajectory optimizations. Achieving 20 close flybys/year is physically impossible given synodic periods and heliocentric inclination/node-crossing geometry.
  - *Case 3: Remote telescopic survey.* A 100 kg SmallSat bus carrying an aperture-limited telescope (e.g., 10–20 cm aperture, such as NEOWISE or commercial orbital telescopes) can observe tens to hundreds of asteroids per year remotely from orbit (e.g., Sun-Earth L1/L2 or Venus-like interior heliocentric orbit), but it cannot deliver resolved spatial mapping, surface mineralogy unmixing, or gravity field measurements required to de-risk mining robots (`bom-0-2`).
- **Proposed Change**: Redefine mission architecture into a two-tier strategy: 
  1. Primary remote discovery and orbit determination relies on space/ground infrared telescopes (e.g., NEO Surveyor heritage).
  2. The `bom-0-1` fleet is dedicated to detailed in-situ reconnaissance (rendezvous or slow flyby) of high-priority candidate targets selected for `bom-0-2` mining and `bom-0-6` ISPP operations. Sizing: 1–2 rendezvous targets or 3–5 high-speed flyby targets per spacecraft over a 5–7 year mission life. Target 32 satellites total, surveying $\sim 30\text{–}50$ unique high-value candidate asteroids up close.

---

### P0-F16: Consensus documents disagree with the BOM they describe
- **Verdict**: Agree.
- **Reasoning**: The BOM table specifies 32 units at \$5M (\$160M total), whereas the consensus narrative explicitly specifies 50 units at \$5M (\$250M total). Furthermore, Claude Opus 4.6 specs update several architectural parameters not reflected in the 4.5 consensus synthesis.
- **Proposed Change**: Establish the current Phase-0 BOM table (32 units) as the authoritative quantity baseline, adjust satellite wet mass and dry mass to close the propulsion budget (increasing unit cost to \$12M–\$18M based on deep-space SmallSat flight heritage such as ESCAPADE, Lunar Trailblazer, and CAPSTONE), and align narrative text to the updated technical parameters.

---

## 2. Revised Specification

| Parameter | Old Value | New Value (Range) | Basis | Confidence |
|---|---|---|---|---|
| Constellation Fleet Size | 50 (consensus) / 32 (BOM) | 32 units [24, 40] | Judgement (sufficient coverage for 30–50 targets) | High |
| Wet Mass per Satellite | 80–120 kg | 180 kg [150, 220] kg | Calculation (closes $\Delta v$ with commercial deep-space buses) | High |
| Dry Mass per Satellite | Unspecified ($\sim 70\text{ kg}$) | 110 kg [90, 130] kg | Literature (JPL Lunar Trailblazer / ESCAPADE heritage) | High |
| Propulsion System | Green monoprop / EP hybrid | Low-power Hall / Gridded Ion (Busek / Exotrail / Enpulsion) | Calculation ($I_{\text{sp}} \approx 1800\text{–}3000\text{ s}$, $P_e \approx 200\text{–}400\text{ W}$) | High |
| Total Spacecraft $\Delta v$ | Unspecified | 2800 m/s [2200, 3500] m/s | Calculation (Tsiolkovsky: $I_{\text{sp}}=2200\text{ s}$, $m_0/m_f = 180/110 = 1.636 \implies \Delta v = 2200 \times 9.81 \times \ln(1.636) \approx 10.6\text{ km/s}$ theoretical max without structure/tank sizing limits; realistically throttled to $2.8\text{ km/s}$ with 40 kg Xe/Kr propellant + RCS) | Medium |
| Encounter Rate | 20+ targets/sat/yr | 0.25 targets/sat/yr [0.15, 0.4] (i.e., 1–2 rendezvous over 7 yrs) | Orbital mechanics / Mission design | High |
| Primary Payload | Vis/NIR + optional TIR | Compact Vis-NIR Imaging Spectrometer (0.4–3.6 µm) + micro-LIDAR | Literature (OVIRS/LEISA, Hayabusa2 NIRS3) | High |
| Unit Flyaway Cost | \$5M | \$15M [\$12M, \$20M] | Literature (ESCAPADE ~\$80M/2 units; Lunar Trailblazer ~\$72M total life cycle) | Medium |

---

## 3. Interfaces

- **With `bom-0-2` (Mining Robots)**:
  - *Data flow*: Target surface topography, local gravity harmonics, regolith composition maps, boulder distribution down to $<0.1\text{ m}$ resolution. Estimated data volume: $\sim 50\text{–}200\text{ GB}$ per target asteroid. (Omits direct radiometric beacon interface: prospector should act as orbital relay and positioning beacon for surface miners).
- **With `bom-0-6` (ISPP Systems)**:
  - *Data flow*: Volatiles/hydrated mineral mapping (specifically 2.7–3.0 µm absorption band depth for OH/H2O abundance). (Currently omitted in explicit interface documents).
- **With Ground / Deep Space Network (DSN)**:
  - *Data flow*: Uplink command ($2\text{–}4\text{ kbps}$), downlink science/telemetry ($50\text{–}250\text{ kbps}$ via X-band / Ka-band). Requires ground coordination and allocation of DSN or commercial 34m aperture networks.
- **With Launch Vehicle / Rideshare (BOM Gap)**:
  - *Mass / Deployment*: 32 units $\times 180\text{ kg} = 5,760\text{ kg}$ total launch mass into Earth Escape (C3 > 0) or Sun-Earth L2.

---

## 4. Missing Items or Scope

1. **Launch Services / Rideshare Dispenser**:
   - 32 deep-space probes cannot deploy individually without dedicated launch allocations or multi-satellite ESPA-Grande/dispenser rings on medium/heavy-lift rockets (e.g., Falcon 9 / Vulcan / Ariane 6).
2. **Deep Space Communications Ground Segment**:
   - Operating 32 concurrent deep-space probes requires dedicated 34m ground dish tracking hours or optical ground networks. DSN tracking costs and scheduling contention will be a major operational bottleneck unless inter-satellite crosslinks or autonomous navigation are heavily prioritized.
3. **Target Selection Ground / Space Telescope Survey**:
   - You cannot send 32 targeted in-situ SmallSats into deep space without an existing comprehensive catalog of candidate NEAs with well-determined orbits ($a, e, i, \Omega, \omega$). Phase 0 lacks a funded orbital wide-field infrared telescope (e.g., NEO Surveyor equivalent) to cue the in-situ prospectors.

---

## 5. Remaining Disagreements and Open Questions

1. **Rendezvous vs. Flyby Constellation Architecture**:
   - A pure flyby probe (similar to Lucy or Comet Interceptor) requires smaller $\Delta v$ per asteroid, allowing 3–5 target flybys per spacecraft at the expense of high relative velocity ($5\text{–}15\text{ km/s}$) and observation windows measured in hours.
   - Rendezvous enables long-duration orbital characterization, surface composition mapping, and landing site certification for `bom-0-2`, but limits each probe to 1 (rarely 2) target asteroids. Given the industrial objective of Phase 0, rendezvous with 20–30 prime targets is technically superior to superficial flybys of 200 targets.
2. **Propellant Selection (Krypton vs. Xenon vs. Iodine)**:
   - For 32 SmallSats consuming $\sim 40\text{ kg}$ of propellant each, total constellation propellant is only $\sim 1.3\text{ tonnes}$. Unlike the transport vehicles (`bom-0-4`), this small quantity does *not* stress the global Xenon market. However, using Iodine or Krypton could maintain supply chain commonality with `bom-0-4`.
3. **Cost Feasibility**:
   - High-reliability deep-space SmallSats historically cost \$30M–\$60M each when amortizing NRE (ESCAPADE, Lunar Trailblazer). Sizing at \$15M/unit assumes aggressive batch manufacturing and commoditized deep-space SmallSat buses.

---

```yaml
item: bom-0-1
model: claude-opus-4-6
findings:
  - id: P0-F06
    verdict: agree
    summary: Orbital mechanics prevents a 100 kg SmallSat from encountering 20 distinct NEAs per year; physical in-situ transfers permit at most 1–2 rendezvous or 3–5 flybys per spacecraft over a 7-year life.
    proposed_change: Redefine mission profile to dedicated in-situ rendezvous targeting 1–2 asteroids per satellite (30–50 total prime targets characterized by the 32-satellite fleet over 7 years).
  - id: P0-F16
    verdict: agree
    summary: Consensus specification states 50 satellites at $250M while BOM specifies 32 units at $160M, alongside obsolete propulsion and architectural notes.
    proposed_change: Update consensus specification to 32 units, increase wet mass to 180 kg with low-power electric propulsion, and update unit cost to $15M ($480M total).
revised_spec:
  - parameter: fleet_size
    old: "50 units"
    new: 32
    range: [24, 40]
    unit: units
    basis: judgement
    confidence: high
  - parameter: wet_mass
    old: "80-120 kg"
    new: 180
    range: [150, 220]
    unit: kg
    basis: calculation
    confidence: high
  - parameter: dry_mass
    old: "unspecified"
    new: 110
    range: [90, 130]
    unit: kg
    basis: literature
    confidence: high
  - parameter: total_delta_v
    old: "unspecified"
    new: 2800
    range: [2200, 3500]
    unit: m/s
    basis: calculation
    confidence: medium
  - parameter: survey_rate
    old: "20+ asteroids/sat/yr"
    new: 0.25
    range: [0.15, 0.4]
    unit: asteroids/sat/yr
    basis: calculation
    confidence: high
  - parameter: unit_cost
    old: "$5M"
    new: 15
    range: [12, 20]
    unit: MUSD
    basis: literature
    confidence: medium
interfaces:
  - with: bom-0-2
    flow: data
    value: 100 GB/target
    in_bom: true
  - with: bom-0-6
    flow: data
    value: 50 GB/target
    in_bom: false
  - with: Earth DSN / Ground Stations
    flow: data
    value: 150 kbps
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-1
    quantity: 32
    unit_cost_usd: [12000000, 20000000]
    rationale: Adjusted wet mass to 180 kg with electric propulsion to close orbital transfer physics; costs aligned with deep-space SmallSat flight heritage.
open_questions:
  - Should the architecture split into a remote wide-field IR space observatory (survey/detection) plus a smaller fleet of dedicated in-situ rendezvous probes (characterization)?
  - Does the SmallSat bus support acting as a surface navigation and communication beacon for bom-0-2 mining robots during surface operations?
```
