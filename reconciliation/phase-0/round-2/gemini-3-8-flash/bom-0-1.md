---
phase: phase-0
item: bom-0-1
round: 2
type: reassessment
modelId: gemini-3-8-flash
modelName: "Gemini 3.8 Flash"
endpoint: databricks-gemini-3-8-flash
findings: b907d2fc76f4
priorRound: 1
framework: 18f503fe4ec6
generated: 2026-10-12T09:10:45.505Z
seconds: 63.919
---

# Independent Technical Assessment: bom-0-1 Prospecting Satellites (Phase-0)

---

## 1. Findings

### Finding P0-F06: 20 asteroids per satellite per year is not reachable by a 100 kg spacecraft
- **Verdict:** Agree.
- **Reasoning & Calculation:**
  To survey 20 asteroids/year in rendezvous mode over 7 years requires encountering 140 distinct targets. For Near-Earth Asteroid (NEA) rendezvous from heliocentric transfer, average deterministic $\Delta v$ between target orbits is $\Delta v_{\text{rendezvous}} \approx 1.5 - 3.5\text{ km/s}$ per target, even when choosing optimal low-inclination targets from the Shoemaker/Helin accessible NEA sets. Encountering 20 targets requires a cumulative $\Delta v > 30\text{ km/s/year}$, which violates the Tsiolkovsky rocket equation for any chemical or solar electric propulsion (SEP) system under known mass-fraction limits. 
  
  Even in a multi-flyby tour mode, orbital mechanics dictates synodic resonance and nodal alignment times: a deep-space spacecraft typically achieves 0.3 to 1.0 flybys per year (e.g., *Lucy* will visit 11 asteroids across a 12-year trajectory, relying on multiple Earth gravity assists and large chemical propulsion maneuvers; *Dawn* visited 2 targets in 11 years using $11\text{ km/s}$ of ion $\Delta v$). 
  
  Remote survey of 20 targets/year from a 100 kg bus at $>0.1\text{ AU}$ distance is constrained by aperture. A smallsat aperture ($D \approx 10\text{--}20\text{ cm}$) observing an asteroid of diameter $d = 100\text{ m}$ at phase angle $\alpha = 30^\circ$ and distance $\Delta = 0.1\text{ AU}$ ($1.5 \times 10^7\text{ km}$) yields an apparent visual magnitude $V \approx 21\text{--}22$. While optical detection is possible at low SNR with long integration times, spatially resolved NIR/TIR spectroscopy—necessary to quantify composition, regolith grain size, and hydration bands—requires sub-kilometer proximity (spatial resolution $<10\text{ m/pixel}$ requires $R < 100\text{ km}$ for a diffraction-limited optical system).
- **Proposed Change:** Formally redefine the requirement from a discovery/remote rate of "20 asteroids/sat/yr" to "detailed rendezvous characterization of 1 primary (and up to 1 secondary) pre-selected target per satellite over a 3–5 year primary mission life."

### Finding P0-F16: Consensus documents disagree with the BOM they describe
- **Verdict:** Agree.
- **Reasoning:**
  The baseline BOM explicitly budgets 32 units at \$5M (\$160M total), whereas the consensus markdown document states 50 units at \$5M (\$250M total). Furthermore, the \$5M unit flyaway cost is unphysical for an interplanetary smallsat carrying high-precision optical, thermal, and potentially nuclear (GRNS) payloads. Real-world benchmarks for deep-space smallsats (e.g., NASA CAPSTONE: ~\$30M total; Janus: ~\$50M combined for two smallsats; MarCO: ~\$20M each; ESCAPADE: ~\$80M for two ~120 kg class orbiters) confirm that deep-space qualification, rad-hard avionics, deep-space optical payloads, and high-$\Delta v$ SEP buses cost \$15M–\$30M recurring unit cost, excluding ground segment, DSN tracking, launch, and initial NRE.
- **Proposed Change:** Re-baseline the BOM quantity to 16 flight units (gated: 4 pathfinders, 12 production units) at an amortized recurring unit cost of \$25M (\$18M–\$35M range), establishing a dedicated hardware line item of \$400M, and add missing lines for launch and ground segment.

---

## 2. Revised Specification

| Parameter | Old Value | New Value | Range | Unit | Basis | Confidence |
|---|---|---|---|---|---|---|
| Fleet Size | 32 (BOM) / 50 (Consensus) | 16 | [12, 24] | units | Judgement (Value-of-Information & Target Gating) | Medium |
| Wet Mass ($m_0$) | 80–120 | 210 | [180, 260] | kg | Calculation (Propellant fraction for $\Delta v = 3.2\text{ km/s}$) | High |
| Dry Mass ($m_d$) | Unspecified (~50–70) | 145 | [125, 175] | kg | Calculation (Bus + Payload + Margins) | High |
| Onboard $\Delta v$ | Unspecified | 3,200 | [2,500, 4,200] | m/s | Calculation (Low-thrust rendezvous margin) | High |
| Targets per Satellite | 20+ / sat / yr | 1 primary, 1 ext. | [1, 2] | targets | Calculation (Heliocentric transfer orbital mechanics) | High |
| Primary Propulsion | Monoprop / EP / Hybrid | Hall or Gridded Ion | $I_{sp} \in [1800, 3000]$ | s | Literature (BHT-600, Busek BIT-3, Safran PPSX00) | High |
| Propellant Type | Xenon / Green Monoprop | Krypton or Iodine | Kr / $\text{I}_2$ | — | Literature & Industrial Trade (Avoid Xenon cost/scarcity) | High |
| Propellant Mass | Unspecified | 65 | [50, 85] | kg | Calculation: $m_p = m_0(1 - e^{-\Delta v / g_0 I_{sp}})$, $I_{sp} = 2100\text{ s}$ | High |
| Power (BOL at 1 AU) | Unspecified | 1,400 | [1,100, 1,800] | W | Calculation (1 kW thruster PPU + 200 W bus + margin) | High |
| Solar Array Degradation | Unspecified | 550 | [400, 700] | W | Calculation ($1/r^2$ falloff at $1.6\text{ AU}$ aphelion) | High |
| Payload: VNIR-SWIR | 0.4–2.5 | 0.4–3.6 | [0.4, 3.8] | $\mu\text{m}$ | Literature (Hayabusa2 NIRS3, OSIRIS-REx OVIRS $2.7\text{--}3.2\,\mu\text{m}$ band) | High |
| Payload: Thermal IR | 3–14 (disputed) | 8–14 | [7, 14] | $\mu\text{m}$ | Literature (Uncooled microbolometer, e.g., Hayabusa2 TIR) | Medium |
| Autonomy Level | Level 3 (30-day) | Level 4 Proximity | — | — | Literature (Autonomous optical nav / hazard avoidance) | Medium |
| Recurring Flyaway Unit Cost | \$5M | \$25M | [18, 35] | \$M | Literature / Analogy (ESCAPADE, MarCO, Janus adjusted) | Medium |

### Calculation Notes:
1. **$\Delta v$ and Mass Closure:**
   Using the Tsiolkovsky equation for continuous low-thrust spiral/rendezvous with margin:
   $$\Delta v = g_0 \cdot I_{sp} \cdot \ln\left(\frac{m_0}{m_0 - m_p}\right)$$
   For $m_0 = 210\text{ kg}$, $m_p = 65\text{ kg}$, dry mass $m_d = 145\text{ kg}$ (mass fraction $\mu = 145/210 = 0.690$):
   $$\Delta v = 9.80665 \times 2,100 \times \ln(1 / 0.690) \approx 20,594 \times 0.3703 \approx 7,626\text{ m/s theoretical if all propellant spent at constant } I_{sp}.$$
   *However*, in low-thrust trajectory design, gravitational losses, non-optimal thrust pointing, and duty-cycling ($<85\%$) derate effective impulse. Sizing for an accessible NEA rendezvous from C3 $\approx 0\text{ km}^2/\text{s}^2$ injection requires a nominal net $\Delta v$ capability of $2.5\text{--}3.5\text{ km/s}$, leaving 30–40% contingency for proximity maneuvering, orbital phase trimming, and orbit maintenance.
2. **Power Sizing at Range:**
   At $r = 1.5\text{ AU}$, solar flux drops to $S = S_0 / (1.5)^2 \approx 1361 / 2.25 \approx 605\text{ W/m}^2$ (44.4% of 1 AU). A solar array generating $1,400\text{ W}$ at 1 AU delivers $\sim 620\text{ W}$ at 1.5 AU. Thruster throttling down to $350\text{--}400\text{ W}$ (e.g., Iodine or Krypton Hall-effect system) is required when operating near aphelion.

---

## 3. Interfaces

| Interfacing Item | Flow Type | Value | In Current BOM? | Description / Status |
|---|---|---|---|---|
| **bom-0-2** (Mining Robots) | Data | 5–20 GB per target | **False** | High-resolution elevation models (DEM), shape models, boulder spatial distribution, and landing hazard maps. |
| **bom-0-2** (Mining Robots) | Operations / Navigation | Direct RF beacon | **False** | Surface marker/orbital beacon for proximity navigation during descent and touchdown. |
| **bom-0-4** (Transport Vehicles) | Propellant Commonality | Architecture standard | True (implicit) | Shared qualification and supply chain for Iodine ($\text{I}_2$) or Krypton (Kr) propellants. |
| **bom-0-5** (Solar Power Arrays) | Power | 0 kW | True (zero-draw) | Prospecting satellites are strictly self-powered via onboard deployable arrays. |
| **bom-0-6** (ISPP Systems) | Data | Mineralogy / Hydration % | **False** | Calibrated 3.0 $\mu\text{m}$ OH/$\text{H}_2\text{O}$ abundance maps and thermal inertia to ensure mining site meets volatile extraction cutoff ($>5\text{ wt}\% \text{ H}_2\text{O}$). |
| **Ground / Deep Space Network** | Telemetry / Tracking | 10–50 kbps; 200 h/yr/sat | **False** | Telemetry, ranging, delta-DOR, and mission tasking via DSN / ESA Estrack / commercial 35m apertures. |
| **Launch Vehicle** | Mechanical / Injection | 4 craft / ESPA Grande | **False** | Trans-Mars or heliocentric escape injection services. |

---

## 4. Missing Items or Scope

1. **Pre-Mission Ground/Space Survey & Target Catalog Line Item:**
   - *Description:* Sizing a 16-spacecraft rendezvous fleet assumes the targets are already discovered, orbitally characterized, and classified via ground spectroscopy or dedicated IR survey (e.g., NEO Surveyor). Without a high-confidence target pool of accessible, low-$\Delta v$, volatile-rich carbonaceous targets (C-, D-, B-types), prospecting probes will fly blind or waste $\Delta v$ on non-viable metallic/silicate bodies.
   - *Scope:* Dedicated target screening, astrometric refinement, and ephemeris reduction pipeline (\$15M–\$30M).
2. **Dedicated Launch Services:**
   - *Description:* The current BOM allocates \$0 to launch. 16 spacecraft of $\sim 210\text{ kg}$ each cannot rely purely on uncoordinated secondary rideshares to reach dispersion trajectories across diverse heliocentric planes.
   - *Scope:* Two dedicated Falcon 9 / Vulcan launches to C3 $\ge 0\text{ km}^2/\text{s}^2$ utilizing ESPA rings (8 spacecraft per launch) or four multi-manifest rideshares (\$120M–\$180M total).
3. **Deep Space Ground Segment & Mission Operations:**
   - *Description:* Managing 16 independent interplanetary missions simultaneously over a 7-year timeline requires substantial antenna scheduling (DSN/commercial ground networks) and a flight operations team.
   - *Scope:* Distributed operations center and ground station time (\$100M–\$150M across Phase 0).

---

## 5. Remaining Disagreements and Open Questions

1. **Fleet Composition: Pure Rendezvous vs. Scout/Rendezvous Split:**
   - *Disagreement:* Claude Opus proposes a split fleet (8 rendezvous + 4 flyby scouts); Gemini favors 32 pure rendezvous; this assessment favors 16 rendezvous (4 pathfinder + 12 production).
   - *Engineering Core:* A flyby scout ($v_{\text{rel}} \ge 2\text{--}5\text{ km/s}$) has an interaction window measured in hours. It cannot acquire thermal inertia, cannot perform local gravity field mapping for mass/density determination, and cannot resolve fine-scale mineralogical homogeneity required to anchor an extraction plant (bom-0-6). However, flybys are cheaper per target.
2. **Hydration Verification: Remote Infrared vs. Nuclear (GRNS) vs. Surface Probe:**
   - *Open Question:* Does a 3.0 $\mu\text{m}$ absorption feature confirm extractable bulk water for bom-0-6? Space weathering and solar wind implantation create surface hydroxyl ($\text{OH}$) groups on anhydrous silicates that can mimic water in shallow ($<1\text{ }\mu\text{m}$) IR reflectance. A Gamma-Ray and Neutron Spectrometer (GRNS) penetrates tens of centimeters to measure bulk hydrogen, but adds 4–6 kg mass, requires long integration times (weeks in low orbit), and demands low altitudes ($<1$ asteroid radius). Alternatively, penetrators or small kinetic impactors may be required.
3. **Propellant Selection: Krypton vs. Iodine:**
   - *Open Question:* Krypton requires high-pressure tanks ($300\text{ bar}$) with tank structural mass penalties; Iodine stores solid at low pressure (reducing dry mass and volume) but suffers from plume condensables, thermal management complexity, and ground-test facility corrosion. This trade must be harmonized with bom-0-4.

---

## 6. Decision-Quality Critique

### Decision 1: Mission Concept of Operations (Rendezvous vs. Flyby Tour vs. Remote Survey)

#### 1. Frame & Decision Type
- **Type:** Architectural Property / Executive Decision (Type 1: irreversible commitment of payload and bus sizing).
- **Cynefin Domain:** Complicated (governed by celestial mechanics, sensor physics, and downstream robotics requirements).
- **Decision Quality Chain Weakest Link:** *Alternatives* in early rounds (the original consensus falsely assumed high survey rate without trading rendezvous against remote observation).

#### 2. Criteria & Weights (Swing Weights based on Phase-0 Objectives)
- $C_1$: **Data Adequacy for Mining Commit (bom-0-2 / bom-0-6)** (Weight: 0.40) — Must resolve volatile fraction, spatial distribution, topography, and surface geotechnical properties.
- $C_2$: **Mission Cost per Validated Mining Target** (Weight: 0.25) — Total lifecycle cost divided by candidate sites confirmed viable.
- $C_3$: **Technical Feasibility & $\Delta v$ Closure** (Weight: 0.20) — Must close within 200 kg smallsat limits.
- $C_4$: **Schedule to First Extraction** (Weight: 0.15) — Time from launch to delivering target coordinates to bom-0-2.

#### 3. Options
- **Option A (Baseline/Consensus):** High-throughput flyby/remote tour (20 targets/sat/yr, 80–120 kg bus).
- **Option B (Deep Rendezvous):** Dedicated rendezvous and low-orbit characterization (1–2 targets/sat, 200 kg SEP bus, VNIR + TIR + Micro-LIDAR).
- **Option C (Mixed Scout-Rendezvous Fleet):** 4 high-speed flyby scouts for initial screening + 8 rendezvous craft for detailed follow-up.

#### 4. Assessment Matrix (QOC / Kepner-Tregoe Framing)

| Option | $C_1$: Mining Adequacy (0.40) | $C_2$: Cost / Valid Site (0.25) | $C_3$: $\Delta v$ Feasibility (0.20) | $C_4$: Schedule (0.15) | Weighted Score |
|---|---|---|---|---|---|
| **Option A (Flyby Tour)** | 2/10 (Fails gravity, density, bulk H) | 3/10 (High target count, near-zero confirmed sites) | 1/10 (Physically infeasible at 20/yr) | 4/10 | **2.35 / 10** |
| **Option B (All-Rendezvous)**| 9/10 (Full gravity, morphology, 3 $\mu\text{m}$) | 8/10 (High yield of confirmed targets) | 8/10 (Closes with 3.2 km/s SEP) | 7/10 | **8.25 / 10** |
| **Option C (Mixed Fleet)** | 7/10 (Flybys provide poor discriminator) | 6/10 (Flyby cost overhead yields low value) | 8/10 (Both variants close physically) | 6/10 | **6.75 / 10** |

#### 5. Sensitivity vs. Trade-off Points (ATAM Analysis)
- **Trade-off Point:** Target Survey Breadth vs. Target Characterization Depth. Flybys maximize breadth ($N \approx 3\text{--}5$ per craft); rendezvous maximizes depth ($N = 1\text{--}2$). Because committing a \$1B mining package (bom-0-2) and a \$2B ISPP plant (bom-0-6) on a false positive costs orders of magnitude more than prospecting, the trade-off strongly tilts toward characterization depth.
- **Sensitivity Point:** The mass fraction of extractable water at the target. If targets have high heterogeneity, remote spectral screening is highly sensitive to spatial resolution.

#### 6. Evidence Certainty (GRADE / ICD 203 Calibrated Language)
- *Claim:* 20 NEA rendezvous/year is physically impossible with 100 kg craft.
  - **Certainty:** High. **Likelihood:** Virtually Certain ($>99\%$).
- *Claim:* Flyby data is insufficient to certify a landing site for autonomous bucket-wheel excavation.
  - **Certainty:** High (based on Rosetta/Philae, Hayabusa2/MINERVA-II, OSIRIS-REx sample site selection heritage). **Likelihood:** Very Likely ($90\text{--}95\%$).

#### 7. Key Assumptions & Falsification
- **Assumption:** Asteroid spectral classification from Earth-based telescopes and NEO Surveyor can pre-select candidates with a $\ge 20\%$ probability of being volatile-rich.
- **Falsification Test:** Ground-truth sampling of 5 C-complex asteroids reveals that surface spectral slope does not correlate with subsurface bound water, requiring in-situ prospecting of all candidates.

#### 8. Decision, Warrant & Accepted Downside
- **Decision:** Adopt **Option B (All-Rendezvous Fleet)**, sized to visit 1 primary target with contingency for 1 secondary target.
- **Warrant (Toulmin):** Committing multibillion-dollar surface extraction infrastructure requires high-confidence bulk water estimation, landing hazard topology, and micro-gravity field modeling that only extended low-orbit rendezvous can deliver.
- **Accepted Downside:** Total number of explored targets is reduced from hundreds to 16–25 unique NEAs.

#### 9. Consequences
- Forces creation of a ground-telescope/pre-screening database line item.
- Increases spacecraft wet mass to $\sim 210\text{ kg}$ and unit flyaway cost to $\sim \$25\text{M}$.
- Establishes hard gating milestones: Phase-0 mining bots (bom-0-2) cannot be built or deployed until prospecting probes return orbital data.

---

### Decision 2: Fleet Sizing and Staging Architecture (32 vs 16 vs 12)

#### 1. Frame & Decision Type
- **Type:** Executive / Resource Allocation Decision (Two-way door initially via phased pathfinders; one-way door at full production contract).
- **Decision Quality Chain Weakest Link:** *Information* (lack of a verified candidate target ephemeris table).

#### 2. Analysis of Competing Hypotheses (ACH) for Fleet Sizing

| Evidence / Test Metric | Hypothesis 1: 32 Ships (Gemini) | Hypothesis 2: 16 Ships (4 Pathfinder + 12 Gated) | Hypothesis 3: 12 Ships (Claude) |
|---|---|---|---|
| Budget realism within Phase 0 cap | Inconsistent (requires \$800M+ total lifecycle) | **Consistent** (\$400M HW + \$150M Launch/Ops) | **Consistent** (\$300M HW + \$120M Launch/Ops) |
| Yields $\ge 10$ fully characterized viable mining sites | Highly Likely (over-allocated) | **Likely** (Assumes 60% success/viability rate) | Marginally Likely (Leaves zero margin for aborts) |
| Accommodates deep-space infant mortality (~15%) | Robust | **Adequate** ($16 \times 0.85 \approx 13\text{--}14$ surviving) | Vulnerable ($12 \times 0.85 \approx 10$ surviving) |
| Alignment with Phase-0 scope (Proof of Concept) | Inconsistent (Oversized for Phase 0) | **Consistent** (Balances risk vs cost) | Consistent |

#### 3. Decision & Warrant
- **Decision:** Select **16 Spacecraft**, structured into **Tranche 1 (4 Pathfinders)** and **Tranche 2 (12 Production Units)**.
- **Warrant:** Assuming an operational spacecraft survival rate of 85%, and an asteroid qualification yield of 65% (viable C-type water content $>5\text{ wt}\%$ and acceptable landing surface), 16 launched spacecraft yield:
  $$N_{\text{viable}} = 16 \times 0.85 \times 0.65 \times 1.25\text{ targets/craft} \approx 11\text{ qualified targets}$$
  This provides the necessary target pool for the 20 mining robots (bom-0-2) and 4 ISPP plants (bom-0-6), ensuring at least 2–3 redundant, thoroughly characterized extraction sites.
- **Accepted Downside:** Restricts Phase-0 target evaluation to the most orbital-accessible candidates ($i < 8^\circ$, perihelion near $1.0\text{ AU}$); excludes high-inclination NEAs.

---

## 7. Fenced Machine-Readable Specification

```yaml
item: bom-0-1
model: Claude-3.7-Sonnet-Thinking
findings:
  - id: P0-F06
    verdict: agree
    summary: An encounter rate of 20 asteroids per satellite per year is physically impossible for rendezvous and yields inadequate characterization data if conducted via remote flyby.
    proposed_change: Redefine requirement to 1 primary and up to 1 secondary rendezvous characterization mission per satellite over a 3-5 year primary operating lifespan.
  - id: P0-F16
    verdict: agree
    summary: The BOM table (32 units at $5M) directly conflicts with the consensus specification (50 units at $5M), and the $5M unit cost is unrealistic for deep-space interplanetary craft.
    proposed_change: Re-baseline to 16 flight units (4 pathfinders, 12 production) at an amortized recurring flyaway cost of $25M per unit.
revised_spec:
  - parameter: fleet_size
    old: "32 units (BOM) / 50 units (Consensus)"
    new: "16"
    range: [12, 24]
    unit: units
    basis: judgement
    confidence: medium
  - parameter: survey_rate
    old: "20+ asteroids per satellite per year"
    new: "0.3"
    range: [0.2, 0.5]
    unit: asteroids/sat/year
    basis: calculation
    confidence: high
  - parameter: wet_mass
    old: "80-120 kg"
    new: "210"
    range: [180, 260]
    unit: kg
    basis: calculation
    confidence: high
  - parameter: dry_mass
    old: "unspecified"
    new: "145"
    range: [125, 175]
    unit: kg
    basis: calculation
    confidence: high
  - parameter: delta_v
    old: "unspecified"
    new: "3200"
    range: [2500, 4200]
    unit: m/s
    basis: calculation
    confidence: high
  - parameter: power_1au
    old: "unspecified"
    new: "1400"
    range: [1100, 1800]
    unit: W
    basis: calculation
    confidence: high
  - parameter: spectral_range_vnir
    old: "0.4-2.5 um"
    new: "0.4-3.6"
    range: [0.4, 3.8]
    unit: um
    basis: literature
    confidence: high
  - parameter: unit_cost_recurring
    old: "$5M"
    new: "25.0"
    range: [18.0, 35.0]
    unit: MUSD
    basis: literature
    confidence: medium
interfaces:
  - with: bom-0-2
    flow: data
    value: 10 GB/target
    in_bom: false
  - with: bom-0-2
    flow: other
    value: RF proximity beacon
    in_bom: false
  - with: bom-0-4
    flow: other
    value: Iodine/Krypton propulsion qualification standard
    in_bom: true
  - with: bom-0-5
    flow: power
    value: 0 MW
    in_bom: true
  - with: bom-0-6
    flow: data
    value: Hydration band 3.0 um spatial maps
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-1
    quantity: 16
    unit_cost_usd: [18000000, 35000000]
    rationale: Sized for high-confidence characterization of 10-12 viable extraction targets with realistic deep-space smallsat mass and propulsion margins.
  - action: add
    item: Prospecting Launch Services
    quantity: 2
    unit_cost_usd: [60000000, 90000000]
    rationale: Missing scope for dedicated dual-launch ESPA C3 >= 0 km2/s2 injection of 16 prospecting probes.
  - action: add
    item: Deep Space Ground Segment and Operations
    quantity: 1
    unit_cost_usd: [100000000, 150000000]
    rationale: 7-year multi-spacecraft tracking, mission planning, delta-DOR, and ground network operations missing from phase BOM.
  - action: add
    item: Precursor Asteroid Survey and Ephemeris Refinement
    quantity: 1
    unit_cost_usd: [15000000, 30000000]
    rationale: Necessary target catalog screening program to identify low delta-V volatile candidates before tasking flight fleet.
open_questions:
  - Can remote VNIR/SWIR 3.0 um spectral reflectance conclusively differentiate structural hydrated phyllosilicates from superficial solar-wind hydroxyl without in-situ subsurface sampling?
  - Does the phase-wide propulsion trade favor solid-storage Iodine or high-pressure Krypton when balancing smallsat thermal/corrosion risks against transport vehicle (bom-0-4) dry mass penalties?
```
