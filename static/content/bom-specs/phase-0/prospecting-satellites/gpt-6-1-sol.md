---
bomId: "bom-0-1"
itemName: "Prospecting Survey and Rendezvous Scouts"
itemSlug: "prospecting-satellites"
modelId: "gpt-6-1-sol"
modelName: "GPT-6.1 Sol"
generated: "2026-10-20"
phase: "phase-0"
---

# Technical proposal: Prospecting Survey and Rendezvous Scouts

**Item:** bom-0-1  
**Programme:** Project Dyson, Phase 0A—Space Resource Processing  
**Recommended configuration:** Purchased remote-survey programme plus **six electric-propulsion rendezvous scouts**, procured in **three gated pairs**, with an authorized planning range of **4–10 spacecraft**.

**Cost basis:** Constant **2026 USD**. Estimates are engineering planning allowances, not vendor quotations. Requirements identified below as *proposed* require programme approval; they are not represented as existing owner decisions.

---

## 1. Executive recommendation

Project Dyson should prospect for **decision-quality evidence**, not maximize the number of asteroid encounters.

I recommend a two-tier architecture:

1. **Remote survey and accessibility screening:** Purchase observations, survey data, orbit refinement, and analysis from existing or independently funded facilities. Do not initially build dedicated survey telescopes.
2. **Rendezvous scouts:** Send approximately **500 kg wet-mass**, independently powered spacecraft to externally shortlisted NEAs. Each scout performs extended proximity characterization, acquires subsurface samples at multiple locations, and measures **elemental composition, mineral phases, and mechanically separable metal fraction**.

The principal question is:

> Does an accessible asteroid contain sufficiently abundant, recoverable native or reduced Fe-Ni, in material that the proposed mining and processing equipment can handle?

A metal-rich spectrum does not answer this question. Neither does a high radar albedo, a magnetic measurement, nor a surface X-ray fluorescence measurement alone.

### Recommended baseline

| Parameter | Recommendation |
|---|---|
| Phase | 0A only; no automatic transition to 0B |
| Flight quantity | Six scouts; procurement decisions in pairs |
| Authorized planning envelope | 4–10 scouts |
| Targets per spacecraft | One primary rendezvous; second target an uncredited option |
| Wet mass | 500 kg reference; 400–600 kg expected design envelope |
| Main propulsion | Solar electric; iodine cost reference, argon alternate; neither selected yet |
| Array power | 4 kW BOL at 1 AU; 3–5 kW design range |
| EP input power | Approximately 2 kW maximum |
| Ideal onboard EP Δv | Approximately 4.8 km/s at reference assumptions |
| Primary mission duration | Five years after launch |
| Extended-life objective | Seven years |
| Sampling | Four geographically/geologically distinct stations where feasible |
| Subsurface penetration | At least 0.3 m in qualified materials; 1 m goal |
| External site-power demand | **Zero** |
| bom-0-1 direct budget, six-scout case | **$290–490 million** |
| Attributable lifecycle envelope, including separately owned services and development | Approximately **$0.85–1.8 billion**, excluding unallocated programme-wide overhead and the separate processing pathfinder |

The lifecycle range is deliberately higher than estimates based on a simple remote-sensing smallsat. **Subsurface acquisition and representative bulk assay are the principal design drivers.**

---

## 2. Design philosophy and scope boundaries

### 2.1 Optimize the investment decision

The scout must reduce three distinct uncertainties:

1. **Resource:** Metal grade, metallization, heterogeneity, and accessible inventory.
2. **Operability:** Surface strength, boulder distribution, cohesion, rotation, and anchoring conditions.
3. **Accessibility:** Flight time, low-thrust transfer requirements, communications geometry, and compatibility with future product transport.

These are not interchangeable. A high-grade asteroid may still be a poor industrial target because its material cannot be acquired reliably or its transport windows do not match Phase 1 demand.

### 2.2 Keep irreversible commitments late

Approve the observing programme and first two scouts. Retain options for subsequent pairs, but do not purchase the entire fleet immediately.

Permit reversible design work on mining and processing in parallel. Block irreversible industrial deployment until the target, demand, economics, and licence gates are satisfied.

### 2.3 Do not force scout–tug commonality

Scout propulsion and MW-class tug propulsion have different operating points and qualification challenges.

Follow D-05:

- Cost **iodine** as the reference.
- Carry **argon** as the alternate.
- Select neither before supply, performance, contamination, and life-test evidence is available.
- Keep water EP outside the flight baseline unless the programme confirms an appropriate C-type target and separately qualifies the technology.

Commonality is beneficial only if it improves demonstrated reliability or lifecycle cost.

### 2.4 Accounting boundaries

| Included in bom-0-1 | Owned elsewhere |
|---|---|
| Purchased astronomical observations and survey datasets | Launch and injection: bom-0-8 |
| Target cataloguing, resource classification, and trajectory-screening analysis | Ground stations and network capacity: bom-0-9 |
| Recurring scout spacecraft and instrument hardware | Flight operations: bom-0-10 |
| Recurring assembly, integration, acceptance testing, and calibration | Common NRE and qualification: bom-0-11 |
| Flight sampling and assay equipment | Integrated processing pathfinder: bom-0-12 |
| Resource data products and associated scientific interpretation | Flight replacements and separately procured spares: bom-0-14 |
| Spacecraft onboard radios, autonomy, navigation, arrays, batteries, and thermal control | Programme contamination assurance: bom-0-15 |
| | EP propellant supply and batch qualification: bom-0-16 |
| | Reserve: bom-0-17 |

The scout sampling equipment is a **characterization instrument**, not a mining-production robot. It must not become an undeclared duplicate of bom-0-2.

---

## 3. Mission architecture

```text
 Existing / purchased astronomical observations
 Optical + NIR + thermal IR + radar where available
                         |
                         v
             Survey and target-data service
      Orbit covariance / spectra / size / rotation
                         |
                         v
         Low-thrust accessibility and value analysis
                         |
                 Gate: shortlist quality
                         |
             +-----------+-----------+
             |                       |
          Scout 1                 Scout 2
       Primary NEA A           Primary NEA B
             |                       |
      Reconnaissance          Reconnaissance
      Gravity / shape         Gravity / shape
      Surface mechanics       Surface mechanics
      Subsurface assay        Subsurface assay
             +-----------+-----------+
                         |
             Update resource and reliability models
                         |
             Gate: stop, redirect, or buy next pair
                         |
                  Scouts 3–6
                         |
       Target evidence package + explicit uncertainty
                         |
       Mining / processing pathfinder and Phase 1 demand
                         |
       Target + demand + economics + licence gates
                         |
                      KDP-0B
```

### 3.1 Remote-survey programme

Do not baseline dedicated survey spacecraft in the initial procurement.

Instead, acquire:

- Optical astrometry and rotational light curves.
- Visible/NIR spectra for compositional triage.
- Thermal-IR measurements for size, albedo, and thermal-model constraints.
- Radar observations when geometry and facility availability permit.
- Approximately 3 µm spectroscopy where attainable and decision-relevant.
- Archival reprocessing and cross-calibration.

Access to any particular public mission dataset or observing facility is **not assumed guaranteed**. Contracted substitutes and schedule contingencies are required.

Proposed planning outputs over roughly three years:

| Product | Planning range |
|---|---:|
| Catalogued candidates with consolidated evidence | 100–300 |
| Candidates with useful new characterization | 30–80 |
| Candidates receiving detailed low-thrust transfer optimization | 10–20 |
| Launch-ready primary/backup target sets | At least two complete sets per procurement pair |

These are programme objectives, not promises that sufficient suitable NEAs exist.

### 3.2 Target priorities

Prioritize:

- Fe-Ni potential supported by multiple independent observations.
- Favorable launch windows and return-product trajectories.
- Rotation and surface conditions compatible with controlled contact.
- Adequate observing opportunities before launch.
- Low industrial interference and licensing complexity.
- A size sufficient to support the required accessible inventory without unnecessarily difficult proximity operations.

A preliminary **150–700 m equivalent-diameter** range is useful for design studies, not a mandatory selection criterion. Smaller and larger targets remain admissible after their dynamics and resource cases are evaluated.

**SEL1 is the provisional product-receiving reference**, not a scout staging or ore-processing site. Target ranking must retain sensitivity to the eventual Phase 1 receiving architecture.

---

## 4. Fleet sizing: six is a planning baseline, not a success guarantee

There is not yet enough evidence to optimize fleet size confidently.

For illustration, define:

\[
q=P(\text{mission completes})\,
P(\text{target qualifies}\mid\text{mission completes})
\]

Using explicitly provisional assumptions:

- Mission completion probability: 0.85.
- Qualification probability conditional on completion: 0.35.
- Thus \(q \approx 0.30\).

For independent targets:

| Scouts | Probability of ≥1 qualifying target | Probability of ≥2 |
|---:|---:|---:|
| 4 | 76% | 35% |
| 6 | 88% | 58% |
| 8 | 94% | 74% |
| 10 | 97% | 85% |

These results are **illustrative, not validated forecasts**. Correlated geological misclassification, common software defects, or common sampling failures would make the independent-trial model optimistic.

My recommendation is therefore:

- **Six-scout reference plan.**
- **First two funded for fabrication.**
- Remaining pairs released after updated evidence.
- No requirement to spend the full authorization if the target case fails.
- If one production site plus an independently characterized backup is mandatory, six scouts cannot currently be claimed sufficient.

A second asteroid per spacecraft is useful upside, but must not be credited in the baseline success probability.

---

## 5. Spacecraft technical specification

### 5.1 Reference configuration

| Characteristic | Reference value | Design qualification |
|---|---:|---|
| Launch mass | 500 kg | Expected envelope 400–600 kg |
| Dry mass, including growth allowance | 390 kg | Includes retained samples and onboard mechanisms |
| EP propellant | 100 kg | Iodine reference accounting case |
| Proximity-control propellant | 10 kg | Nitrogen cold gas reference |
| Stowed bus envelope | About 1.4 × 1.3 × 1.5 m | Excludes launch adapter |
| Deployed solar-array span | Approximately 9–11 m | Configuration dependent |
| Active array area | Approximately 16 m² | Two wings |
| Array power | 4 kW BOL at 1 AU | 3–5 kW trade range |
| Battery | 1 kWh nominal | Short-duration eclipse, contact, safe mode |
| EP input | Up to approximately 2 kW | Throttled with solar distance |
| Sampling reach | Approximately 1.5–2 m | Includes articulated placement mechanism |
| High-gain antenna | 0.6–0.8 m | X-band reference |
| Effective radiator area | Approximately 1.5–2.5 m² | Final area depends on view factors and operating temperature |
| Recorder | Two fault-managed approximately 1 TB units | Redundant storage, not continuous downlink |

The operating envelope should initially assume heliocentric distances of approximately **0.8–1.5 AU**. Targets outside it require a specific power and thermal reassessment.

### 5.2 Preliminary mass budget

| Subsystem | Current best estimate |
|---|---:|
| Structure and deployment mechanisms | 40 kg |
| Solar arrays, battery, power conditioning | 50 kg |
| EP thruster, PPU, feed system, tanks | 30 kg |
| Cold-gas hardware and tanks | 12 kg |
| Avionics and flight computing | 16 kg |
| Navigation, attitude sensors, reaction wheels | 20 kg |
| Communications hardware | 18 kg |
| Thermal hardware and radiators | 18 kg |
| Harness and miscellaneous integration | 12 kg |
| Sampling, anchoring, sample transfer | 55 kg |
| Assay instruments and sample preparation | 40 kg |
| Remote-sensing instruments | 14 kg |
| **Dry current best estimate** | **325 kg** |
| **Dry growth allowance: 20% of CBE** | **65 kg** |
| **Allocated dry mass** | **390 kg** |
| EP propellant | 100 kg |
| Cold-gas propellant | 10 kg |
| **Reference wet mass** | **500 kg** |

This is a preliminary allocation, not a closed vendor design. Sampling-system growth is the most likely driver toward the 600 kg limit.

### 5.3 Propulsion closure

For an illustrative iodine operating point:

- \(I_{sp}=2{,}200\) s.
- Initial mass \(m_0=500\) kg.
- Mass after EP depletion \(m_f=400\) kg.

\[
\Delta v = g_0 I_{sp}\ln(m_0/m_f)
\approx 4.81\ {\rm km/s}
\]

This is **ideal propulsive capability**, not a demonstrated transfer.

A preliminary allocation is:

| EP allocation | Δv |
|---|---:|
| Primary transfer and rendezvous | ≤3.5 km/s objective |
| Navigation corrections and retarget flexibility | 0.3 km/s |
| Protected unallocated capability | Approximately 1.0 km/s |
| Total available ideal capability | Approximately 4.8 km/s |

Actual low-thrust transfers must be optimized with power variation, eclipses, thrust-direction constraints, duty cycle, and arrival geometry.

For 2 kW input and 50% total efficiency:

\[
T \approx \frac{2\eta P}{g_0 I_{sp}}
\approx 0.093\ {\rm N}
\]

Consequences:

- Initial acceleration: approximately **0.19 mm/s²**.
- Full 100 kg throughput: approximately **6,400 full-power hours** at this operating point.
- Proposed qualification target: **12,000–16,000 equivalent operating hours**, with representative throttling, starts, thermal cycles, and total impulse.

These are required performance targets. They are **not claims that the needed iodine system is already qualified**.

An argon substitution requires a new closure of efficiency, tankage, feed-system mass, thrust, and transfer duration. It is not a drop-in propellant change.

### 5.4 Proximity propulsion

Use a separate low-contamination cold-gas system.

Ten kilograms of nitrogen at an assumed 70 s specific impulse provides roughly **14 m/s ideal capability** at 500 kg. The initial operational allocation should be approximately **8 m/s**, preserving the remainder against inefficiency, aborts, and uncertainty.

Requirements:

- Small, repeatable minimum impulse bit.
- Thruster geometry that avoids direct impingement on sampled material.
- Reaction-wheel desaturation away from the surface.
- Explicit contact-abort allocation.
- No main EP firing near the sampling site; initially prohibit operation within **1 km** until plume and contamination analyses justify another boundary.

The 1 km boundary is a planning constraint, not a universal physical limit.

---

## 6. Power and thermal design

### 6.1 Power availability

Using a conservative planning factor of 0.80 for end-of-life degradation and associated array losses:

\[
P_{\rm EOL}(r)\approx\frac{4.0\times0.80}{r^2}\ {\rm kW}
\]

| Solar distance | Available EOL power |
|---|---:|
| 1.0 AU | 3.20 kW |
| 1.3 AU | 1.89 kW |
| 1.5 AU | 1.42 kW |

A roughly **300–400 W** cruise housekeeping demand leaves about **1 kW** for EP at 1.5 AU. Transfer duration therefore increases materially at larger solar distances.

### 6.2 Operating modes

| Mode | Representative electrical demand |
|---|---:|
| Safe mode | 180–250 W |
| Cruise, no EP | 300–400 W |
| Full-power EP cruise | 2.3–2.5 kW |
| Proximity mapping | 400–600 W |
| Sampling | 600–850 W peak |
| Assay | 450–700 W |
| High-rate communications | 400–600 W |

Drilling, sample preparation, and high-power communications are scheduled rather than assumed simultaneous.

A 1 kWh battery with 80% end-of-life capacity and 80% permitted depth of discharge provides approximately **0.64 kWh usable**: about two hours at 300 W. Long asteroid nights are not a battery-supported operating mode.

### 6.3 Heat rejection

Thermal design must explicitly separate:

- Electronics and PPU waste heat.
- Assay-source and sample-preparation heat.
- Battery temperature control.
- Iodine storage and feed-system heating.
- Thruster radiation and plume energy.

The spacecraft radiator system should accommodate approximately **300–600 W of transported internal waste heat** across its operating cases. Most thruster waste energy must be rejected locally through the thruster assembly and its environment, not implicitly assigned to the avionics radiators.

Provide approximately **1.5–2.5 m² effective radiator area**, subject to detailed thermal modelling.

---

## 7. Payload: prove metal form and sample representativeness

### 7.1 Remote characterization

| Instrument | Function | Proposed performance target |
|---|---|---|
| Narrow-angle navigation/science camera | Shape, landmarks, boulders, contact-site selection | Approximately 0.1–0.3 m/pixel at selected reconnaissance ranges |
| Wide-angle stereo cameras | Hazard detection and local terrain | Centimetre-class local reconstruction during contact approach |
| VNIR/SWIR spectrometer | Surface compositional units and hydration context | Approximately 0.5–3.4 µm coverage; long-wave channel sensitivity must be demonstrated |
| Calibrated thermal radiometer | Thermal response and surface-property constraints | Selected bands in approximately 8–14 µm |
| Laser rangefinder | Terminal navigation and local topography | Centimetre-class range performance at contact distances |
| Magnetometer | Context and operational magnetic environment | Not treated as a bulk-grade measurement |

The spectrometer is for classification and spatial context. A 3 µm feature is not evidence of economically recoverable water.

I would **not baseline gamma-ray/neutron spectroscopy** on every scout. Its depth sensitivity and integration requirements must demonstrate incremental value relative to direct sampling before consuming substantial mass.

### 7.2 Subsurface acquisition

Use an articulated sampling head combining:

- Surface cleaning or controlled removal of the exposed veneer.
- Rotary-percussive coring or augering.
- Force/torque measurement.
- Interchangeable contact tools within the flight mechanism.
- Enclosed sample transfer.
- Positive retention of cuttings and fragments.
- A reversible attachment system selected after testing.

Baseline sampling plan:

- **Four stations**, selected across distinct mapped units where available.
- Surface and subsurface increments at each station.
- **At least eight separately identified increments**.
- Approximately **100–300 g acquired per increment**, yielding roughly **0.8–2.4 kg total acquisition**.
- A controlled fraction prepared for assay; the remainder retained as archive or repeat-test material.

Depth objectives:

- **0.3 m minimum demonstrated penetration** in the qualified material classes.
- **1 m goal** in suitable material.
- Inability to penetrate is reported as an engineering result, not hidden by relabelling surface scrapings as subsurface samples.

### 7.3 Reaction forces and anchoring

The spacecraft cannot drill by relying on its weight.

For illustration, on a 300 m diameter asteroid with density 3,000 kg/m³:

\[
g_s \approx \frac{4}{3}\pi G\rho R
\approx1.3\times10^{-4}\ {\rm m/s^2}
\]

A 500 kg spacecraft would weigh only about **0.06 N**. Even modest drilling loads greatly exceed this.

The sampling system therefore requires:

- Positive mechanical restraint or opposed-force acquisition.
- Closed-loop feed-force control.
- Drill-torque reaction management.
- Automatic disengagement and retreat.
- Qualification across loose regolith, weak aggregate, competent rock, and metal-rich mixtures.

Do not assume harpoons, screw anchors, or microspines are universally suitable. Downselect after testing.

### 7.4 Bulk assay package

Recommended measurement chain:

```text
Acquired increment
        |
        v
Imaging + acquired-mass measurement
        |
        v
Controlled splitting / crushing / particle sizing
        |
        +----> XRF: elemental abundance
        |
        +----> XRD: mineral phases / metallic versus oxide-bearing material
        |
        +----> Magnetic separation trial
        |        + retained-fraction mass measurement
        |
        +----> Mechanical response / particle-size observations
        |
        v
Cross-checked grade, phase, and separability estimate
        |
        v
Archive + standards + blanks
```

Use an inertial or resonant mass-measurement technique suitable for microgravity, not an ordinary gravity-dependent balance.

Proposed qualification objectives:

| Measurement | Target capability |
|---|---|
| Major-element abundance | Approximately ±1–3 absolute wt-percentage points over validated matrices |
| Native/reduced-metal phase fraction | Approximately ±3–5 absolute wt-percentage points where phase discrimination is validated |
| Increment mass measurement | ≤1–2% relative error over the working range |
| Magnetic retained fraction | ≤2 absolute percentage points measurement error, excluding representativeness error |
| Minor-element reporting | Element-specific limits of detection; no universal claimed sensitivity |
| Repeatability | Replicate assays and onboard reference checks for each campaign |

These are development requirements, not guaranteed instrument performance.

**Magnetic separation is not metallurgical proof.** Magnetite and other magnetic phases can produce misleading indications. Conversely, a small prepared aliquot can misrepresent coarse native metal.

Representative splitting, grain-size effects, sample loss, and preparation bias are therefore part of T18—not ancillary laboratory details.

---

## 8. Resource evidence and downstream interfaces

### 8.1 Scout data are not automatically an ore reserve

Four stations and eight increments can still miss large-scale heterogeneity.

Every resource package must distinguish:

1. Direct measurements.
2. Spatial extrapolations.
3. Process-model predictions.
4. Unresolved uncertainties.

If the observed variability prevents a credible lower-bound estimate, the result is **“insufficient evidence”**, not a forced grade declaration.

### 8.2 Target acceptance package

Deliver to bom-0-2, bom-0-3, and programme gate authorities:

- Shape model, spin state, gravity estimate, and their uncertainties.
- Surface-unit and hazard maps.
- Local contact mechanics and anchoring results.
- Sample locations, depths, handling histories, and losses.
- Elemental composition and phase fractions.
- Grain-size distribution and coarse-metal observations.
- Magnetic-separation response.
- Estimated accessible inventory with explicit confidence bounds.
- Radiation, thermal, lighting, and communications environments.
- Delivery trajectories evaluated against the current Phase 1 destination.
- Unresolved failure modes and recommended follow-up.

### 8.3 Grade must close against the process model

An illustrative—not approved—screen might require:

- Native/reduced Fe-Ni fraction: 20 wt%.
- Recoverability into accepted intermediate product: 70%.
- Subsequent product yield: 90%.

Then overall product yield is:

\[
Y=0.20\times0.70\times0.90=0.126
\]

Delivering 1,000 t/yr would require approximately:

\[
\dot m_{\rm feed}=\frac{1{,}000}{0.126}\approx7{,}940\ {\rm t/yr}
\]

The appropriate threshold depends on the actual plant, accessible inventory, transport losses, signed demand, and permitted operating duration.

The scout does **not** certify recoverability from composition alone. Process recovery must be supported by validated ground correlations and the separate relevant-environment processing demonstration.

### 8.4 Phase 1 demand interface

Before KDP-0B, Phase 1 must supply a controlled specification covering:

- Annual and cumulative tonnage.
- Delivery dates and destination.
- Permitted Fe/Ni composition range.
- Oxygen, sulfur, carbon, phosphorus, and other relevant impurity limits.
- Physical form and dimensional tolerances.
- Receiving inspection and rejection criteria.

Scout target rankings must be rerun when this specification changes.

---

## 9. Autonomy, navigation, and communications

### 9.1 Autonomy requirements

Earth round-trip light time is approximately **17 minutes at 1 AU separation** and **50 minutes at 3 AU**. Ground control cannot manage terminal contact in real time.

Use testable requirements rather than an undefined autonomy “level.”

The spacecraft shall autonomously:

- Maintain a safe proximity trajectory through a communications outage.
- Detect disagreement between optical navigation, ranging, and predicted motion.
- Abort a descent before violating a certified stopping-distance envelope.
- Detect excessive contact force, slip, drill stall, or anchor loss.
- Stop and retract a sampling tool without ground intervention.
- Reject assays that fail standards or contamination checks.
- Enter a power-positive, thermally safe state after a single credible fault.
- Preserve a minimum evidence dataset through recorder faults.

Ground approval remains mandatory before:

- First close approach.
- First contact.
- Sampling a materially different terrain class.
- Starting a second-target departure.
- Actions with significant contamination or trajectory consequences.

### 9.2 Navigation

Baseline sensors:

- Star trackers and inertial sensors.
- Wide- and narrow-angle optical navigation.
- Laser rangefinder for terminal operations.
- Radiometric Earth tracking.

A dedicated navigation beacon for mining robots is **not baseline**. The scout may provide a time-limited local reference service only if reliability and remaining lifetime justify it; industrial operations must not depend on a scout surviving indefinitely.

### 9.3 Communications architecture

Reference:

- X-band uplink/downlink.
- 20 W RF transmitter.
- 0.6–0.8 m high-gain antenna.
- Low/medium-gain coverage for safe mode.
- Modern error correction, packet prioritization, and disruption-tolerant file delivery.

Planning downlink:

- **Approximately 1–50 kb/s**, depending on range, geometry, receiving aperture, coding, and weather.
- Use **10 kb/s effective delivered rate** for preliminary data-volume planning.
- Do not assume free DSN access.

A 0.6 m antenna at X-band has approximately 32 dBi gain. With a 20 W transmitter and a capable 34 m-class receiving station, a 10 kb/s-class link at roughly 2 AU is plausible, but requires a formal link budget and contracted receiving performance.

### 9.4 Data volume and ground time

Commit to **2–5 GB of prioritized science data per primary target**, with much larger raw datasets retained onboard.

At 10 kb/s:

\[
t(1\ {\rm GB})\approx222\ {\rm hours}
\]

Thus 2–5 GB requires approximately **444–1,111 hours**, before additional navigation and operational overhead.

Plan for:

- Approximately **600–1,450 antenna-hours per target** for this delivered dataset.
- Approximately **2,000–4,500 antenna-hours/year fleet peak allocation**, depending on overlap and actual link rates.
- Explicit station handover, solar-conjunction, and outage allowances.

Compress images and select spectral cubes onboard, but retain calibration, uncertainty, and provenance information. Do not downlink only an algorithm’s final classification.

---

## 10. Manufacturing and verification

### 10.1 Manufacturing approach

Use a common bus with a configuration-controlled payload module.

Recommended practices:

- Common electrical and mechanical interfaces across all scouts.
- Identical flight computers, radios, power electronics, and primary navigation hardware where practical.
- Qualified commercial components where radiation and reliability analysis support them.
- Lot-controlled critical parts.
- Replaceable assay cartridges and sample-path assemblies before launch.
- Witness coupons and contamination monitors near sample handling and propulsion interfaces.
- Strict material compatibility controls for iodine.
- Continued supplier access to test fixtures and failure-analysis support.

Avoid creating a second spacecraft variant for speculative flyby tours.

### 10.2 Verification priorities

The essential facilities are:

1. Thermal-vacuum EP performance and endurance testing.
2. Abrasive sampling and sample-preparation testing.
3. Gravity-offloaded contact-dynamics rigs.
4. Reduced-gravity tests for acquisition, splitting, retention, and transfer.
5. Hardware-in-the-loop optical navigation and autonomous abort tests.
6. Integrated thermal-vacuum campaigns with flight-like assay hardware.
7. End-to-end data exercises from raw measurement to resource decision.

Ground rigs cannot perfectly reproduce small-body dynamics. Their limitations must remain explicit in TRL assessments.

### 10.3 Reference sample library

Develop a blinded validation library spanning:

- Native Fe-Ni grains in silicate matrices.
- Coarse metal inclusions.
- Metal-rich and oxide-rich assemblages with similar magnetic responses.
- Altered surfaces over different subsurface material.
- Weak rubble and cohesive fines.
- Multiple particle-size distributions.
- Plausible contamination and sample-preparation artifacts.

Score the assay system on its ability to distinguish economically important alternatives, not merely to reproduce a favorable simulant.

---

## 11. Development roadmap and readiness gates

The supplied panel envelope places T11 and T18 at **TRL 2–4**, with **AD² approximately 5–6 and 6**, respectively. Heritage components do not automatically raise the integrated sampling scout to flight readiness.

### 11.1 Indicative schedule

Dates below assume effective authorization around late 2026/2027. They are planning ranges, not committed launch opportunities.

| Period | Main work and exit evidence |
|---|---|
| 2027–2028 | Purchased survey begins; target catalogue; assay breadboards; anchor and sampler trades |
| 2028–2029 | Integrated sampling/assay engineering model; reduced-gravity tests; preliminary optimized transfers |
| 2029–2031 | Flight design, propulsion qualification, integrated verification, first-pair acceptance |
| Approximately 2031–2033 | First-pair launches, subject to target windows and readiness |
| Launch + 1–3 years | First rendezvous campaigns |
| First campaigns + 0.5–1.5 years | Sampling, assay, interpretation, and follow-up decisions |
| Thereafter | Further pairs, process pathfinder, and possible KDP-0B |

A late-2030s industrial decision may be realistic if substantial redesign or additional target campaigns are required. Do not sell a fixed three-to-five-year industrial gate as a pass criterion.

### 11.2 Gates

**Gate A—Survey and architecture**

Require:

- A viable shortlist with optimized low-thrust transfers.
- Sufficient observing evidence to justify flight expenditure.
- Initial T11/T18 breadboards at TRL 4–5.
- Explicit decision criteria and a target-yield uncertainty model.

**Gate B—First-pair flight commitment**

Require:

- Closed mass, power, thermal, link, and transfer budgets.
- Relevant-environment subsystem evidence adequate for the approved flight risk.
- Representative autonomous-contact and assay demonstrations.
- Contracted launch/injection and ground-network access.
- Propellant downselect supported by life and supply evidence.

**Gate C—Additional scout pairs**

Require:

- Updated target yield and common-cause reliability assessment.
- Evidence that another pair has greater decision value than redesign, alternative sourcing, or stopping.
- Incorporation of first-pair lessons where available.

**KDP-0B—Industrial commitment**

Apply D-02 without waiver:

- Every project-ending technology at **TRL 6 in a relevant environment**.
- Target, demand, economics, and licence gates all passed.
- Processing behavior demonstrated through the appropriate separate pathfinder.
- Representative sampling and assay uncertainty low enough to support the proposed industrial commitment.

The scout programme should ultimately target **TRL 8** after qualification and successful operational demonstration, but TRL 8 is not a substitute for the four programme gates.

---

## 12. Cost estimate and procurement strategy

### 12.1 Direct bom-0-1 estimate

**Basis:** Six roughly 500 kg spacecraft carrying substantial sample-acquisition and assay payloads.

| Direct element | Quantity/basis | Cost |
|---|---|---:|
| Survey data and observing programme | One multi-year programme | $20–60M |
| First scout pair, recurring flight hardware and acceptance | $55–85M each | $110–170M |
| Subsequent four scouts | $40–65M each | $160–260M |
| **Direct bom-0-1 total** | **Six scouts** | **$290–490M** |

The first-pair premium covers low-rate production, extensive recurring calibration, and less mature manufacturing. Common design development and qualification remain in bom-0-11.

### 12.2 Quantity sensitivity

| Fleet | Direct bom-0-1 estimate |
|---:|---:|
| Four scouts | $210–360M |
| Six scouts | $290–490M |
| Eight scouts | $370–620M |
| Ten scouts | $450–750M |

The programme should contract options rather than create an unconditional obligation to purchase ten.

### 12.3 Attributable lifecycle view

These amounts belong to the indicated BOM owners and **must not be added again inside bom-0-1**.

| Cost element | Owner | Six-scout allowance |
|---|---|---:|
| Direct survey and scout hardware | bom-0-1 | $290–490M |
| Common NRE, assay development, qualification | bom-0-11 | $150–300M |
| Launch and injection | bom-0-8 | $80–200M |
| Allocated ground-network services | bom-0-9 | $40–90M |
| Flight operations | bom-0-10 | $80–160M |
| Allocated spares | bom-0-14 | $20–40M |
| Allocated contamination assurance | bom-0-15 | $10–25M |
| EP supply and qualified batches | bom-0-16 | $2–8M |
| **Subtotal before reserve** | | **$672–1,313M** |
| Provisional reserve, approximately 25–35% | bom-0-17 | **$168–460M** |
| **Attributable lifecycle envelope** | | **Approximately $0.85–1.8B** |

Reserve is a provisional planning allowance pending a quantified cost-risk analysis. The upper bound is not a statistical P80 claim.

Excluded:

- Unallocated bom-0-7 programme overhead.
- The separate processing/mining pathfinder.
- Industrial assets and receiving-node construction.
- Inflation, financing costs, and taxes not yet specified.

### 12.4 Phase allocation

- **0A:** All currently proposed survey and scout expenditure.
- **0B:** No automatic recurring allocation. Retasking surviving scouts may be inexpensive, but additional scouts, monitoring requirements, and replacement missions require a separately approved scope.

### 12.5 Where I disagree with round 2

1. **Approximately 200 kg is too aggressive for the accepted scope.**  
   It may suit a remote-sensing rendezvous mission, but subsurface acquisition, restraint, sample preparation, and defensible bulk assay materially change the spacecraft.

2. **$12–35M recurring hardware is not my baseline.**  
   It lacks sufficient allowance for the sampling and assay scope. Approximately **$40–85M per flight unit**, depending on production stage, is more credible for planning.

3. **Do not procure dedicated telescopes initially.**  
   Purchased observing capacity is more reversible. Reconsider a telescope only after documenting a specific information gap and lifecycle advantage.

4. **Do not baseline multiple rendezvous per scout.**  
   Propellant capability alone does not establish a feasible sequence or useful arrival date.

5. **Do not average the historical fleet proposals.**  
   The revised industrial architecture needs a smaller, evidence-driven target set, not the target pool implied by abandoned plant and robot quantities.

6. **Do not inherit conflicting heritage cost citations.**  
   None of the contradictory MarCO figures is used to normalize this estimate. Obtain verified mission cost scopes and supplier quotations.

---

## 13. Principal risks and mitigations

| Risk | Consequence | Mitigation / stop criterion |
|---|---|---|
| Spectrally promising targets lack usable native metal | No industrial target | Early multimodal screening; retain stop option; update target priors |
| Sampling system cannot react forces or retain material | T18 failure | Competing acquisition breadboards; force-controlled restraint; reduced-gravity testing |
| Samples are spatially or granulometrically biased | False industrial commitment | Stratified sampling; coarse-fraction accounting; duplicate splits; explicit uncertainty gate |
| XRF/XRD cannot reliably distinguish relevant metal forms | Grade overstated | Blinded reference library; reject unvalidated matrices; no magnetic-only certification |
| Iodine EP life or contamination performance fails | Delay/redesign | Early endurance test; argon alternate; isolate sample path |
| Low-thrust transfer takes too long | Evidence arrives after demand window | Optimize full trajectories before commitment; fund orbit refinement and backup targets |
| Common software or mechanism fault affects all scouts | Fleet-wide loss | Independent verification, staggered launches, paired procurement, fault injection |
| Communications capacity unavailable | Incomplete evidence | Contract network capacity before launch; prioritized data products |
| Dust or ejecta escapes | Contamination, licence breach | Enclosed acquisition, capture and retention, quantified release assessment |
| Target licensing or authorization fails | Mission cannot proceed | Early legal engagement; documented activities and disposal plan |
| Representative microgravity metallurgy fails | 0B does not close | Keep 0B gated; use Earth-supplied material fallback rather than force commitment |

### Debris and contamination requirement

Apply ALARP under interim D-03, with a **modelled interim ceiling approved by the licensing authority**. Do not invent a universal acceptable release fraction.

Design requirements should include:

- No intentional uncontained impactors in the baseline.
- Captured drill cuttings and retained assay residues.
- Quantified particulate release by size, velocity, and destination.
- Predicted plume deposition at sampled surfaces.
- Tool and mechanism fragment retention.
- Passivation and target-specific end-of-mission trajectory assessment.
- A prohibition on disposal that creates an unacceptable future Earth-encounter risk.

A “99% capture” statement is not an adequate safety case.

---

## 14. Open engineering questions

The following should be resolved before freezing the flight design:

1. **Target availability:** How many candidates actually close the power-constrained transfer and industrial-delivery problem in the intended windows?
2. **Target requirement:** Is one qualified site sufficient, or must a fully characterized backup exist before 0B?
3. **Required grade confidence:** What false-commit probability is acceptable for the planned industrial expenditure?
4. **Sample representativeness:** Can approximately 1–2 kg acquired across four stations support the required inference, particularly for coarse metal?
5. **Anchoring envelope:** Can one restraint system cover the likely surface classes, or should the first pair deliberately carry different acquisition heads?
6. **Assay discrimination:** Can the compact preparation/XRF/XRD chain achieve its targets on high-metal, coarse-grained samples?
7. **Propulsion:** Which iodine or argon implementation closes lifetime, contamination, thermal, efficiency, and supply requirements?
8. **Trajectory delivery:** Which injection services can provide the required departure geometry, rather than merely a cheap LEO or GTO rideshare?
9. **Ground network:** What effective data rate and antenna time can be purchased at the actual mission ranges?
10. **Processing correlation:** Which scout measurements most strongly predict plant recovery, impurity rejection, and product acceptance?
11. **Licensing:** What sampling, release, proximity, and disposal constraints will the authorizing state impose?
12. **Null option:** At what updated cost and target-yield estimate should Project Dyson stop prospecting and adopt Earth-supplied material?

---

## 15. Recommended authorization

Approve the following initial package:

- **One purchased observing and survey-data programme.**
- **Two flight scouts**, designed within a 400–600 kg envelope.
- Options for **two additional pairs**, with an outer planning limit of ten scouts.
- A dedicated T18 sampling-and-assay maturation effort under bom-0-11.
- Early procurement studies for launch injection and paid deep-space communications.
- Configuration-controlled interfaces to mining, processing, contamination control, and Phase 1 demand.

Name a technical authority under bom-0-7 and issue a controlled baseline identifying assumptions, cost ownership, document versions, and superseded legacy requirements.

**Bottom line:** Build a small fleet capable of discovering that an asteroid is unsuitable—and of proving suitability when the evidence supports it. The programme succeeds by enabling a defensible industrial decision, including a decision not to proceed.