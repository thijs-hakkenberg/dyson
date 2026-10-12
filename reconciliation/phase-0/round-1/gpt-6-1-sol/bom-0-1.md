---
phase: phase-0
item: bom-0-1
round: 1
type: reassessment
modelId: gpt-6-1-sol
modelName: "GPT-6.1 Sol"
endpoint: databricks-gpt-6-1-sol
findings: 8607ae186f99
priorRound: null
generated: 2026-10-11T18:40:41.250Z
seconds: 126.545
---

## 1. Findings

### P0-F06 — **Partly agree**

The stated rate is not credible **if “survey” means rendezvous and resource characterization**. However, spacecraft mass alone does not establish an upper bound of 20 observations per year. Remote observations of 20 known asteroids could be feasible; 20 useful rendezvous are a very different requirement.

The specification currently conflates three products:

| Survey mode | What it establishes | Principal limitation |
|---|---|---|
| Remote observation | Orbit refinement, rotation, approximate size and surface spectral classification | Target brightness, viewing geometry, telescope aperture, integration time |
| Flyby | Resolved surface spectra, shape and some thermal information | Encounter opportunities, relative velocity, short observation window |
| Rendezvous | Repeated global mapping, navigation model, thermal environment and improved gravity constraints | Transfer time, propulsion, operations and target accessibility |

None, by itself, establishes recoverable subsurface water concentration, ore grade or excavation performance.

#### Propulsion check

Assume an illustrative **200 kg wet spacecraft**, with launch injection into a suitable heliocentric trajectory provided separately. The onboard velocity budget is **2.5 km/s**, not including launch injection.

Using the rocket equation,

\[
m_p=m_0\left[1-\exp\left(-\frac{\Delta v}{g_0I_{sp}}\right)\right].
\]

For a chemical monopropellant system with \(I_{sp}=220\ \mathrm{s}\):

\[
m_p=200\ \mathrm{kg}\left[1-e^{-2500/(9.81\times220)}\right]
\approx137\ \mathrm{kg}.
\]

That leaves only about **63 kg** for the bus, instruments, tanks and propulsion hardware. It does not close for the proposed capability.

For electric propulsion with an assumed \(I_{sp}=1500\ \mathrm{s}\):

\[
m_p=200\ \mathrm{kg}\left[1-e^{-2500/(9.81\times1500)}\right]
\approx31\ \mathrm{kg}.
\]

This is a plausible mass allocation, although the propulsion hardware and power system still require engineering.

At \(P=1\ \mathrm{kW}\) and assumed efficiency \(\eta=0.5\):

\[
F=\frac{2\eta P}{g_0I_{sp}}
\approx0.068\ \mathrm{N},
\]

\[
\dot m=\frac{F}{g_0I_{sp}}
\approx4.6\times10^{-6}\ \mathrm{kg/s}
\approx0.40\ \mathrm{kg/day}.
\]

Expending 31 kg therefore requires approximately **78 powered days**, or **130 elapsed days at 60% thrust duty**. This is not the total transfer time: orbital geometry can impose years of coast and waiting time.

For comparison, 20 sequential transfers each requiring even \(0.5\ \mathrm{km/s}\) imply:

\[
20\times0.5=10\ \mathrm{km/s/year}.
\]

At \(I_{sp}=1500\ \mathrm{s}\), that consumes about **49% of initial wet mass**, before reserves, and requires roughly **245 powered days at 1 kW** for the illustrative spacecraft. With realistic duty cycle and observing periods, it does not fit a year. The assumed \(0.5\ \mathrm{km/s}\) is illustrative, **not a universal minimum**; selected flybys can require much less incremental velocity.

**Flight evidence:** JAXA’s approximately 600 kg Hayabusa2 launched in 2014, reached Ryugu in 2018, and returned samples in 2020. Its extended mission schedules additional encounters across another decade. This demonstrates the importance of trajectory time, not a universal spacecraft-mass limit.[1]

**Proposed change**

- Define the primary product as **rendezvous characterization of preselected, accessible NEAs**, rather than a comprehensive discovery survey.
- Budget **one primary rendezvous per spacecraft** over a roughly **3–5-year primary mission**.
- Treat a second rendezvous or opportunistic flybys as extensions requiring target-specific trajectory analysis.
- Remove “20+ asteroids per satellite per year” as a resource-characterization acceptance criterion.
- Use a nominal **200 kg wet spacecraft**, with a **150–250 kg** preliminary allocation and **2–4 km/s onboard electric-propulsion capability**.
- Treat remote observations as a separately specified supplementary product.

I disagree with the finding’s implication that every 100 kg spacecraft necessarily has only a handful of possible observations. The applicable limit comes from **mission mode, launch conditions, propulsion, trajectories and observing requirements**, not mass alone.

---

### P0-F16 — **Agree, with an evidence limitation**

The supplied documents demonstrably disagree:

- Prospecting: **32 spacecraft/$160 million** in the BOM versus **50/$250 million** in the consensus.
- Transport: **15/krypton–iodine** versus **10/xenon**, as reported in the finding.
- ISPP: NEA extraction versus a lunar-first recommendation, as reported in the finding.

The actual current transport, ISPP and newer model specifications were not supplied. Consequently, I can confirm the reported inconsistency but **cannot regenerate their consensus or verify their detailed assumptions**.

A newer model version is not automatically more authoritative. Configuration-controlled requirements, calculations and evidence should control the design.

**Proposed change**

1. Mark the existing prospecting consensus **superseded**.
2. Make the revised prospecting baseline below authoritative after project approval: **16 spacecraft, deployed as four pathfinders followed by twelve conditional production units**.
3. Retain **8–32 spacecraft as a planning envelope**, not an approved procurement quantity.
4. Publish a versioned requirements baseline linking the BOM, mission concept, cost basis and underlying specifications.
5. Reconcile transport and ISPP independently; do not silently change their requirements within this item.

Neither 32 nor 50 spacecraft is justified by the supplied target catalogue or trajectory analysis.

## 2. Revised specification

**Planning assumptions:** costs are preliminary estimates in approximately **2026 USD**; spacecraft launch into a suitable escape/heliocentric trajectory is an external service; prospectors characterize selected candidates rather than discover the entire NEA population.

| Parameter | Old → revised value | Basis and confidence |
|---|---|---|
| Mission product | Undefined “survey” → rendezvous maps and resource-candidate assessment; remote spectra supplementary | Operational definition; **high** |
| Fleet | BOM 32; consensus 50 → **16 baseline**, range **8–32**, gated deployment | Judgement pending target/trajectory optimization; **low** |
| Deployment | Five pathfinders → **four pathfinders**, then conditional production | Judgement; **medium** |
| Wet spacecraft mass | 80–120 kg → **200 kg nominal**, **150–250 kg** | Preliminary allocation for deep-space communications, propulsion and instruments; **low–medium** |
| Primary target rate | 20+/year → **one rendezvous per primary mission**; **1–2 over life** only with validated extension trajectories | Calculation and flight heritage; **medium** |
| Primary mission duration | Unspecified → **3–5 years** | Trajectory-dependent estimate; **medium** |
| Design life | Seven years → retain **seven-year design goal**, approximately **5–8 years** pending qualification | Reliability and cost trade; **medium** |
| Propulsion | Monopropellant/EP/hybrid unresolved → **EP for main transfer**, separate low-impulse attitude/proximity control | Rocket equation; **medium** |
| Onboard velocity budget | Unspecified → **2–4 km/s**, nominal **2.5 km/s**, including allocated operational reserves but excluding launch injection | Preliminary trajectory envelope; **low** |
| Main propellant | Unspecified → approximately **20–60 kg/spacecraft** | Rocket equation plus reserve/tank allowance; **medium** |
| Solar generation | “Deployable arrays” → **1–2 kW beginning-of-life at 1 AU** | Estimated payload/EP power allocation; **medium** |
| Spectroscopy | 0.4–2.5 µm → visible/NIR coverage plus a **hydration channel extending to approximately 3.2 µm** | Hayabusa2 NIRS3 covered 1.8–3.2 µm; OSIRIS-REx OVIRS covered 0.4–4.3 µm.[2][3] **High** for scientific rationale; **medium** for implementation |
| Thermal instrument | Optional 3–14 µm mapping → baseline thermal radiometry, provisionally **8–14 µm**; broader spectrometer optional | Thermal-state requirement; implementation judgement; **medium** |
| Autonomy | Undefined “Level 3,” 30 days → **30-day contact-loss survival**, autonomous safing and navigation; constrained proximity operations | Testable requirement replaces ambiguous label; **medium** |
| Communications | X-band/S-band, optional mesh → **direct X-band primary**; backup and crosslinks subject to mission trade | Deep-space link geometry; **medium** |
| Cost | $5 million/unit → **$10–20 million recurring flight hardware/unit**; **$0.45–1.0 billion full 16-unit program** | Engineering estimate, not vendor quotation; **low** |

### Important sizing qualifications

At heliocentric distance \(r\), available solar power approximately scales as:

\[
P(r)=P(1\ \mathrm{AU})\left(\frac{1\ \mathrm{AU}}{r}\right)^2.
\]

At **1.5 AU**, a 1–2 kW array supplies only approximately **0.44–0.89 kW**, before degradation and other losses. A constant 1 kW thruster operating point therefore cannot be assumed throughout the trajectory.

The visible/NIR instrument alone is inadequate for the water-production decision. The approximately 3 µm region provides important hydration information, but **surface hydration is not equivalent to extractable bulk water**. Thermal radiometry also requires viewing-geometry and emissivity modeling.

### Cost reconciliation

An illustrative 16-spacecraft estimate is:

- Development and qualification: **$80–160 million**
- Recurring spacecraft: \(16\times \$10–20\text{ million}=\) **$160–320 million**
- Launch/injection services: **$60–150 million**
- Operations and ground services: **$40–100 million**

Subtotal: **$340–730 million**. Adding approximately **25–35% program reserve** gives roughly **$0.43–0.99 billion**, rounded to **$0.45–1.0 billion**.

These are estimates. NASA’s SIMPLEx program used a **$55 million mission cost cap excluding launch**, illustrating why a $5 million spacecraft purchase price cannot simply be treated as a complete deep-space mission budget.[4] It does not directly establish the cost of this constellation.

The existing phase BOM totals **$15.71 billion**. Replacing the $160 million prospecting allocation with $450 million–$1 billion produces approximately **$16.0–16.6 billion**, **before** other phase omissions or corrections. If launch and operations become separate BOM lines, remove them from the prospecting allocation to avoid double counting.

## 3. Interfaces

There is no planned material-delivery function for these satellites.

| Interface | Flow and provisional value | Status |
|---|---|---|
| **bom-0-2 Mining Robots** | **0 t/year material**; navigation, shape, surface-composition and hazard maps, approximately **0.1–2 GB per characterized target** | Data function implicit, requirements absent |
| **bom-0-3 Processing Station** | **0 t/year feedstock**; candidate-resource and uncertainty reports, approximately **10–100 MB per target** | Data interface omitted |
| **bom-0-4 Transport Vehicles** | **0 t/year cargo**; target ephemerides, gravity estimates and approach constraints, approximately **10–100 MB per target** | Interface omitted; no assumed ferry service |
| **bom-0-5 Solar Power Arrays** | **0 MW imported** from central arrays; prospectors carry their own **0.001–0.002 MW each at 1 AU** | Spacecraft arrays must be included explicitly in spacecraft cost |
| **bom-0-6 ISPP** | **0 t/year delivered propellant**; hydration/temperature maps and uncertainty assessments, approximately **0.1–2 GB per target** | Data interface omitted; no demonstrated water-yield inference |
| **bom-0-7 Organization** | Science products, configuration records and tasking; approximately **0.1–1 Gbit/month per active spacecraft** of downlinked data | Ground operations and archive not explicitly funded |
| **Launch/injection service — missing** | For 16 spacecraft, **2.4–4.0 t spacecraft wet mass deployed once**, excluding dispensers and injection stages | No BOM line |
| **Ground communications — missing** | Planning downlink rate **1–20 kbit/s** when scheduled, subject to range and antenna/link design | No explicit capacity reservation |

The data volumes are **planning estimates**, not instrument-derived predictions; compression, map resolution and retained raw spectra must be specified.

For a representative **0.5 Gbit/month per spacecraft** at **5 kbit/s**:

\[
t=\frac{0.5\times10^9\ \mathrm{bit}}{5000\ \mathrm{bit/s}}
=100{,}000\ \mathrm{s}\approx28\ \mathrm{h/month}.
\]

Sixteen active spacecraft require approximately **450 antenna-hours/month**, before acquisition overhead, commanding and navigation tracking. “Thirty-day autonomy” does not remove this ground-network requirement.

Total loaded main propellant is approximately:

\[
16\times(20–60)\ \mathrm{kg}=0.32–0.96\ \mathrm{t}.
\]

Averaged over a 3–5-year primary mission, fleet consumption is of order **0.06–0.32 t/year**, but delivery is **prelaunch**, not a steady ISPP supply. No in-space refueling is assumed.

## 4. Missing items or scope

1. **Launch and injection services.** LEO rideshare does not supply the required heliocentric trajectory.
2. **Deep-space ground segment.** Antenna access, radiometric navigation, mission operations and data archiving require explicit capacity and funding.
3. **Target selection and trajectory optimization.** Fleet quantity must follow a catalogue of accessible candidates, launch windows and information needs.
4. **Resource ground truth.** Mining/ISPP commitment requires sampling or excavation tests, density and depth information, and extraction-yield measurements. Assign a validation lander or pilot package jointly to bom-0-2 and bom-0-6.
5. **Instrument calibration and resource models.** Laboratory analogues, meteorite spectra, temperature corrections and uncertainty propagation are needed.
6. **Shared spacecraft infrastructure.** Qualification, software assurance, propulsion integration, dispensers and configuration control cannot disappear into a $5 million unit allowance.

A fleet mesh network is **not** a default requirement: spacecraft at different NEAs may be widely separated, and crosslink pointing and geometry can outweigh any relay benefit.

## 5. Remaining disagreements and open questions

- **Architecture:** Some engineers would favor fewer capable rendezvous missions plus existing astronomical surveys; others would favor many lower-cost flyby craft. Compare cost per validated candidate, not targets observed.
- **Fleet size:** The proposed 16 is a gated planning baseline, not an optimized result.
- **Water spectroscopy:** A dedicated hydration channel may be more economical than continuous visible-to-3.2 µm coverage.
- **Propulsion:** Iodine, krypton and limited xenon use remain trades. A sub-tonne prospecting fleet does not inherit the transport fleet’s alleged xenon-supply problem automatically. Supply constraints must be recalculated at this scale.
- **Thermal payload:** A radiometer may suffice for reconnaissance; broader spectroscopy may improve mineral and thermophysical interpretation.
- **Operations:** Thirty-day unattended cruise is different from thirty-day autonomous close proximity to an irregular small body.
- **Commercial readiness:** Remote spectral classification cannot certify recoverable resource grade. The acceptance threshold for committing the mining, processing and transport assets remains undefined.

**References**

[1] JAXA, *Hayabusa2 Project* mission and extended-mission descriptions: https://www.hayabusa2.jaxa.jp/en/  
[2] Iwata et al. (2017), *NIRS3: The Near Infrared Spectrometer on Hayabusa2*, **Space Science Reviews**.  
[3] Reuter et al. (2018), *The OSIRIS-REx Visible and InfraRed Spectrometer (OVIRS): Spectral Maps of the Asteroid Bennu*, **Space Science Reviews**; NASA OSIRIS-REx instrument descriptions.  
[4] NASA, 2019 SIMPLEx selection announcement, *NASA Selects Three New Missions to Study Our Solar System*.

```yaml
item: bom-0-1
model: GPT-5.2
findings:
  - id: P0-F06
    verdict: partly
    summary: Twenty annual rendezvous are not supported, but spacecraft mass alone does not preclude twenty remote observations or selected low-cost flybys.
    proposed_change: Define the primary survey as one rendezvous per spacecraft primary mission and require target-specific trajectories for additional encounters.
  - id: P0-F16
    verdict: agree
    summary: The supplied BOM and consensus disagree, while the unseen newer specifications cannot be independently reconciled here.
    proposed_change: Supersede the prospecting consensus with a version-controlled sixteen-spacecraft gated baseline and separately reconcile transport and ISPP.
revised_spec:
  - parameter: fleet_size
    old: "32 in BOM; 50 in consensus"
    new: 16
    range: [8, 32]
    unit: spacecraft
    basis: judgement
    confidence: low
  - parameter: initial_pathfinders
    old: 5
    new: 4
    range: [4, 4]
    unit: spacecraft
    basis: judgement
    confidence: medium
  - parameter: wet_mass
    old: "80-120"
    new: 200
    range: [150, 250]
    unit: kg
    basis: judgement
    confidence: low
  - parameter: rendezvous_per_spacecraft_lifetime
    old: "20+ surveys per year, mode undefined"
    new: 1
    range: [1, 2]
    unit: targets
    basis: judgement
    confidence: medium
  - parameter: primary_mission_duration
    old: unspecified
    new: 4
    range: [3, 5]
    unit: years
    basis: judgement
    confidence: medium
  - parameter: design_life
    old: 7
    new: 7
    range: [5, 8]
    unit: years
    basis: judgement
    confidence: medium
  - parameter: onboard_delta_v_excluding_launch_injection
    old: unspecified
    new: 2.5
    range: [2, 4]
    unit: km/s
    basis: calculation
    confidence: low
  - parameter: main_propellant_load
    old: unspecified
    new: 35
    range: [20, 60]
    unit: kg/spacecraft
    basis: calculation
    confidence: medium
  - parameter: solar_generation_at_1_AU_beginning_of_life
    old: unspecified
    new: 1.5
    range: [1, 2]
    unit: kW/spacecraft
    basis: judgement
    confidence: medium
  - parameter: reflected_light_spectral_coverage
    old: "0.4-2.5"
    new: "Visible/NIR plus hydration coverage to approximately 3.2"
    range: [0.4, 3.2]
    unit: micrometre
    basis: literature
    confidence: medium
  - parameter: baseline_thermal_radiometry_band
    old: "3-14 optional mapping"
    new: "8-14 radiometry, broader spectroscopy optional"
    range: [8, 14]
    unit: micrometre
    basis: judgement
    confidence: medium
  - parameter: recurring_flight_hardware_cost
    old: 5000000
    new: 15000000
    range: [10000000, 20000000]
    unit: USD_2026/spacecraft
    basis: judgement
    confidence: low
  - parameter: sixteen_spacecraft_program_cost
    old: "160000000 for 32; 250000000 for 50"
    new: 700000000
    range: [450000000, 1000000000]
    unit: USD_2026
    basis: judgement
    confidence: low
interfaces:
  - with: bom-0-2
    flow: data
    value: "0.1-2 GB/characterized target"
    in_bom: false
  - with: bom-0-3
    flow: mass
    value: "0 t/year"
    in_bom: false
  - with: bom-0-3
    flow: data
    value: "10-100 MB/target"
    in_bom: false
  - with: bom-0-4
    flow: data
    value: "10-100 MB/target"
    in_bom: false
  - with: bom-0-5
    flow: power
    value: "0 MW imported; 0.001-0.002 MW generated locally per spacecraft at 1 AU"
    in_bom: false
  - with: bom-0-6
    flow: propellant
    value: "0 t/year supplied by ISPP"
    in_bom: false
  - with: bom-0-6
    flow: data
    value: "0.1-2 GB/characterized target"
    in_bom: false
  - with: bom-0-7
    flow: data
    value: "0.1-1 Gbit/month/active spacecraft"
    in_bom: false
  - with: launch_and_injection_services
    flow: mass
    value: "2.4-4.0 t deployed once for sixteen spacecraft, excluding stages and dispensers"
    in_bom: false
  - with: ground_communications
    flow: data
    value: "Approximately 450 antenna-hours/month at the representative sixteen-spacecraft operating point"
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-1
    quantity: "16 spacecraft, including 4 pathfinders; remaining procurement gated"
    unit_cost_usd: [28125000, 62500000]
    rationale: Allocate the complete program cost across sixteen spacecraft, including development, launch, operations and reserve rather than hardware alone.
  - action: add
    item: launch_injection_and_deep_space_ground_work_packages
    quantity: "1 explicitly costed shared service scope"
    unit_cost_usd: [100000000, 250000000]
    rationale: Launch and ground services are missing explicit scope; this allowance is already included in the revised prospecting program total and must not be added twice.
  - action: add
    item: joint_resource_ground_truth_demonstrator
    quantity: "1 initial demonstration, jointly allocated to mining and ISPP"
    unit_cost_usd: [50000000, 200000000]
    rationale: A preliminary judgement allowance for sampling and extraction validation closes the gap between spectral candidates and recoverable resources.
open_questions:
  - Which NEAs satisfy launch-window, transfer-time, resource and operational constraints?
  - Does the target-access optimization justify eight, sixteen or thirty-two spacecraft?
  - Is rendezvous characterization more cost-effective than a mixed remote-observation and flyby architecture?
  - What spatial resolution, signal-to-noise and hydration-detection threshold must the instruments deliver?
  - Which propellant and thruster combination closes power, lifetime, contamination and qualification requirements?
  - What ground-truth result is required before committing the processing station and production mining fleet?
  - Can the ground network provide the required tracking and downlink capacity at acceptable cost?
  - Which current transport and ISPP specifications should control their regenerated consensus documents?
```
