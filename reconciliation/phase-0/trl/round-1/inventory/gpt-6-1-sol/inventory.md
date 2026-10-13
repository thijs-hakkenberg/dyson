---
step: inventory
item: inventory
modelId: gpt-6-1-sol
modelName: "GPT-6.1 Sol"
endpoint: databricks-gpt-6-1-sol
generated: 2026-10-12T23:50:35.334Z
seconds: 241.314
---

## Assessment basis

**The revised inventory is substantially better aligned with Phase 0, but none of the industrial production chains has demonstrated the required integrated capability.** Flight heritage supports several components; it does not establish industrial asteroid-mining readiness.

I apply the supplied NASA exit criteria to the **technology as required**, distinguishing it from its heritage components. A range does not mean the midpoint is the rating: the upper end depends on whether the cited test configuration and data adequately represent the proposed implementation.

Assumptions:

- The supplied architecture and decisions are programme requirements, **not technology evidence**.
- No calendar dates are supplied for the 0A mid-term review, KDP-0B, or deployment. Below, “needed at KDP-0B” means **calendar date TBD**; dates should not be invented.
- Production equipment is assumed to operate for at least five years; arrays for the specified 10–15 years. Processing-system life remains a requirement to confirm.
- TRL 6 at KDP-0B is a readiness gate, **not permission to deploy unqualified hardware**. Flight qualification and operational acceptance follow.
- AD² uses the project’s supplied anchors. Its approximate probabilities are not calculated programme success probabilities.
- “Project-ending” below means **ending the proposed 0B production option**, not ending 0A. The pre-committed fallback remains **0A only, Earth supply**.

### Evidence references used

These are identifiable programmes, tests, or publications—not proposed demonstrations:

- **[E1]** NASA NEXT long-duration ground test, completed in **2013**, exceeding **51,000 operating hours** on a xenon ion thruster. This is not iodine/argon Hall-cluster life evidence.
- **[E2]** NASA/University of Michigan/Aerojet Rocketdyne **X3 nested-channel Hall thruster ground tests, 2017**, reaching approximately **102 kW**, using xenon.
- **[E3]** Rafalskyi et al., **“In-orbit demonstration of an iodine electric propulsion system,” Nature, 2021**; approximately **55 W-class** propulsion on a small spacecraft.
- **[E4]** NASA **ROSA ISS experiment, 2017**, and **iROSA installations beginning in 2021**; approximately **20 kW per deployed iROSA wing**. These provide deployment and operating heritage, not a completed 10–15-year life demonstration for MW installations.
- **[E5]** NASA, **International Space Station Reference Guide, 2015**, and ISS operational external ammonia thermal-control systems. These establish operating space radiator/pumped-loop heritage at tens-of-kW scale.
- **[E6]** NASA **RASSOR excavation development and terrestrial prototype tests, 2013–2016**. Reduced-reaction excavation was physically tested on the ground; this is not sustained asteroid excavation.
- **[E7]** **OSIRIS-REx TAG, 2020**, sample return **2023**; NASA reported **121.6 g** recovered in **2024**. **Hayabusa2 sampling and Small Carry-on Impactor operations, 2019**; Arakawa et al., **“An artificial impact on the asteroid (162173) Ryugu formed a crater in the gravity-dominated regime,” Science, 2020**.
- **[E8]** ESA/DLR **Electromagnetic Levitator on ISS**, installed **2014**, with subsequent metallic-alloy melting and thermophysical-property experiments. Samples are gram-scale, not tonne-scale slag-bearing furnace batches.
- **[E9]** NASA/ASI **TSS-1R flight, 1996**: kilometre-scale conducting tether, several-kV electrodynamic potential, sub-ampere current; tether failure involved electrical arcing. This is not a regolith-surface power cable.
- **[E10]** NASA **Deep Space 1 Remote Agent experiment, 1999**, demonstrating approximately two days of onboard planning/execution; **Mars 2020 Perseverance AutoNav operations beginning in 2021**.
- **[E11]** ESA **ATV Jules Verne autonomous ISS docking, 2008**, approximately **20.7 t total vehicle mass**. Docking a vehicle is not transferring an equivalent mass of loose product.
- **[E12]** Sercel’s NASA NIAC **Optical Mining** project, beginning **2015**, reported terrestrial asteroid-simulant experiments. I am confident the programme exists; I have **not verified a throughput-qualified test report sufficient to credit the proposed 10–100 t/yr plant**, and do not use the original table’s “8 kW” claim as established here.
- **[E13]** JAXA **Hayabusa, 2003–2010**, and **Hayabusa2, launched 2014**, establish approximately 500–600 kg-class asteroid spacecraft and electric-propulsion heritage.
- **[E14]** Wills and Finch, **Wills’ Mineral Processing Technology, 8th edition, 2016**, documents terrestrial magnetic separation and associated operating principles. It is background evidence, not an asteroid beneficiation test.
- **[E15]** ISS lithium-ion battery replacement programme, **2017–2021**, establishes operational modular space battery heritage. It does not demonstrate a 15 MWh industrial installation.

I do **not** accept the legacy assertions that AEPS was already flight-proven at TRL 8–9, that NEA Scout demonstrated asteroid prospecting, or that a proposed mission establishes successful operations. Nor do I carry forward the unverified “Nature Chemistry 2025 breakthrough” or “D’Angelo 2021” claims without identifying and checking the actual papers.

---

## 1. Candidate disposition, scale checks and readiness

### T01 — MW-class electric propulsion cluster: **keep; assess propellant branches separately**

**Requirement corrections.** Specify whether 1–2.5 MWe is input to the propulsion system or total tug generation; power-processing losses and spacecraft loads cannot be counted twice. Define per-thruster lifetime, cluster lifetime, redundancy, restart count, total propellant throughput, and Isp at the selected operating points.

- **Current TRL:** **3–4 for a xenon-based implementation; 2–3 for the required iodine or argon implementation.**
- **Evidence and scale:** X3 demonstrated approximately 102 kW on xenon [E2]: required power is **10–25× greater**. NEXT demonstrated the required *order of duration* [E1], but on different thruster physics and propellant. The iodine flight demonstration [E3] is roughly **18,000–45,000× below required power**.
- **Next unmet exit:** For iodine/argon, demonstrate critical feed, discharge, erosion, materials compatibility and PPU functions with test-backed predictions before claiming TRL 4. For the MW subsystem, TRL 5 requires relevant-environment operation and documented cluster scaling.
- **Target / AD²:** TRL **6 at KDP-0B**; AD² **6–7 iodine**, **5–6 argon**, **4–5 xenon**.
- **Risk:** **Architecture-change** while smaller tugs or another propellant remain economically viable; **project-ending for 0B** if no transport alternative passes the economic gate.
- **Need:** 0B. Scout-scale EP in 0A is a different, substantially more mature technology.

**Do not average these branches into one “SEP TRL.”**

### T02 — MW deployable solar arrays: **keep**

The specified scale is appropriate, but **sizing only at 1.2 AU is inconsistent with operation out to 1.3 AU** unless power derating is explicitly accepted. Include EOL power, deployment, electrical collection, pointing, plume/dust contamination, and structural interaction.

- **Current TRL:** **3–4 at MW installation scale**.
- **Evidence and scale:** A 20 kW iROSA wing [E4] is **50–125× below one tug’s power** and **125–400× below site power**, before matching EOL and heliocentric-distance conditions.
- **Next unmet exit:** Relevant-environment deployment and electrical/structural validation of representative modules and interfaces, with documented MW scaling and degradation.
- **Target / AD²:** **6 at KDP-0B; 4–5**.
- **Risk:** **Project-ending** for the present solar-powered 0B architecture if modular alternatives also fail.
- **Need:** 0B; smaller heritage arrays suffice for ordinary scouts.

A modular array need not be flight-tested at the entire 8 MW site scale, but its deployment, bus, control and scaling evidence must support that installation.

### T03 — Waste-heat rejection: **keep, with plant and tug assessments separate**

The load ranges are usable. Specify coolant, radiator temperature—not just process temperature—view factors, solar loading, freeze protection, dust exposure, leak isolation and service life.

- **Current TRL:** **3–4 plant; 4–5 tug**, with the upper tug rating confined to an ISS-like pumped-loop implementation near the low end of the load range.
- **Evidence and scale:** Operational space systems reject tens of kW [E5]. The plant requires roughly **tens to hundreds of times** that scale; the tug ranges from comparable order to more than an order larger. The heritage coolant and temperature range are not automatically applicable at 600 K.
- **Physical scale check:** With emissivity 0.9 and no absorbed external heat, ideal emitting area spans approximately **150 m² for 1 MW at 600 K** to **22,000 m² for 9 MW at 300 K**. Real installation area can be larger.
- **Next unmet exit:** Selected-fluid, temperature-specific relevant-environment tests, including deployment, dust, leak isolation and documented scaling.
- **Target / AD²:** **6 at KDP-0B; 4–6**.
- **Risk:** **Project-ending** if neither the selected system nor process-temperature redesign closes the heat balance.
- **Need:** 0B.

### T04 — Excavation and anchoring: **keep**

The throughput, duty and life requirements fit the revised architecture. **Anchoring cannot be closed before target geotechnical properties and reaction loads are known.** Counter-rotation reduces nominal torque; it does not remove asymmetric excavation forces or startup/jam loads.

- **Current TRL:** **2–3 for sustained asteroid excavation with anchoring**.
- **Evidence and scale:** RASSOR provides terrestrial excavation tests [E6]; TAG and Hayabusa2 provide brief asteroid surface interactions [E7]. Neither provides a validated sustained **0.5–5 t/h** asteroid excavation rate.
- **Scale ratio:** No defensible throughput ratio is available from these demonstrations. Returned sample mass must not be converted into a mining rate.
- **Next unmet exit:** An integrated excavator/anchor must validate predicted reactions, capture efficiency and wear in controlled low-gravity conditions before claiming laboratory breadboard maturity for this configuration.
- **Target / AD²:** **6 at KDP-0B; 7**.
- **Risk:** **Project-ending** if no alternative acquisition method meets metal-feed throughput and containment.
- **Need:** 0B; physical proof-of-concept work belongs in 0A.

Thermal volatile extraction is **not** a functional fallback for acquiring native Fe-Ni.

### T05 — Native Fe-Ni beneficiation: **keep**

The concentration and throughput requirements need a common mass balance. Concentrate of 2–8 kt/yr with concentration factors of 4–15 permits feed quantities much wider than the specified tailings envelope. These ranges cannot all be varied independently.

Also specify **metal recovery**, concentrate grade, particle liberation, size distribution, gangue carryover and power consumption.

- **Current TRL:** **2–3**; the upper end credits transferable magnetic-separation critical functions, not an integrated asteroid process.
- **Evidence and scale:** Terrestrial magnetic separation is established [E14]. I have no verified continuous microgravity native-metal beneficiation demonstration at a stated rate; **a relevant throughput ratio is therefore unavailable**.
- **Next unmet exit:** Representative meteorite/simulant feed testing must validate liberation, grade and recovery predictions; then continuous low-gravity feed and discharge must be demonstrated.
- **Target / AD²:** **6 at KDP-0B; 6–7**.
- **Risk:** **Project-ending** for all three proposed metal-production routes if acceptable concentrate cannot be made.
- **Need:** 0B.

### T06 — No-melt refining: **split carbonyl processing from H₂ reduction**

These are not interchangeable unit operations.

**Carbonyl route**

- **Current TRL:** **2 at the required implementation**. Terrestrial carbonyl chemistry does not demonstrate asteroid-feed processing with microgravity solids transport and reagent recycling.
- **Scale ratio:** No verified relevant integrated throughput is available against **0.6–2.5 kt/yr**.
- **Next unmet exit:** Test-backed proof of reaction selectivity, conversion, product specification, impurity effects, gas/solid separation and CO recovery.
- **Target / AD²:** **6 at KDP-0B if selected; 6–7**.

**H₂-reduction route — new T14**

- **Current TRL:** **2 at the required implementation**.
- **Requirement correction:** **Hydrogen reduction applies to a reducible oxidized fraction, not to already-native Fe-Ni.** Feed mineralogy, pretreatment, water removal, hydrogen recovery and usable product form must be specified.
- **Scale ratio / next unmet exit:** No verified relevant integrated throughput; representative-feed reaction and recycle proof of concept is required.
- **Target / AD²:** **6 at KDP-0B if selected; 6–7**.

**Risk for either:** **Architecture-change** while another route remains available; **project-ending** if the selected route and alternatives fail.

**Need:** 0B, with route-discriminating experiments in 0A.

Carbonyl formation and decomposition, CO inventory, pressure vessels, leakage and toxic-gas handling deserve explicit requirements even though the plant is uncrewed.

### T07 — Rotating partial-gravity furnace: **keep as a separate contested route**

The requirement is not internally consistent unless radius and speed are **paired**, rather than independent ranges:

\[
a=\omega^2r.
\]

The supplied extremes span approximately **0.013–0.36 g**, not just 0.05–0.15 g. At 5 m radius, approximately 3 rpm gives 0.05 g, whereas 0.15 g requires approximately 5.2 rpm.

- **Current TRL:** **2 for the integrated rotating slag/metal furnace**.
- **Evidence and scale:** ISS EML physically melts gram-scale alloy samples [E8], but does not validate rotating slag separation, furnace refractory life or tonne-batch handling. The mass difference is **roughly five to six orders of magnitude or more**, depending on sample and batch size; the processes are also different.
- **Next unmet exit:** Sustained partial-gravity tests must validate wetting, stratification, separation time, product recovery and heat loss; successful melting alone is insufficient.
- **Target / AD²:** **6 at KDP-0B if selected; 7**.
- **Risk:** **Architecture-change**, becoming **project-ending** if all metal routes fail.
- **Need:** 0B.

**Disagreement remains visible:**

- Claude’s no-melt route depends on T06/T14.
- Gemini’s furnace route depends on T07.
- GPT’s narrow native-metal route avoids claiming general oxide metallurgy, but still requires beneficiation, acceptable product formation and tests of any rotating processing module. It does **not** inherit furnace readiness merely by narrowing the product.

### T08 — Containment and tailings management: **keep**

The revised requirement is necessary and potentially project-ending. Specify escape accounting at excavation, transfer, processing, storage and docking, including abnormal events.

- **Current TRL:** **2 for the integrated site system**.
- **Evidence and scale:** Sample missions demonstrate containment of small collected samples [E7], not management of **13–47 kt/yr** of tailings. There is no comparable demonstrated annual tailings flow or leakage ratio.
- **Quantitative check:** An escape ceiling of 1 t/yr corresponds to approximately **21–77 parts per million of annual tailings mass**. A 10 kg/yr objective corresponds to **0.21–0.77 ppm**. These are mass-flow comparisons, not a complete compliance metric.
- **Next unmet exit:** Test-backed particle-generation, capture and escape measurements, followed by low-gravity continuous handling and storage tests. Licence acceptance is separate from TRL.
- **Target / AD²:** **6 at KDP-0B; 7**.
- **Risk:** **Project-ending** if the licensing state will not accept demonstrated containment.
- **Need:** 0B.

### T09 — High-voltage site distribution: **keep**

Add cable length, delivered power, return path, connector cycles, robotic reel/drag loads, insulation life, arc detection and isolation. Site generation must cover coincident loads rather than simply adding nameplate robot power.

- **Current TRL:** **3–4**.
- **Evidence and scale:** TSS-1R demonstrated several-kV electrical operation in space [E9], but at roughly kW-class power and in a different geometry. Tens to hundreds of kW per circuit are **one to two orders larger**; abrasive surface cables were not demonstrated.
- **Next unmet exit:** Integrated cable, connectors, protection and handling tests under vacuum, charged dust, representative abrasion and thermal cycling.
- **Target / AD²:** **6 at KDP-0B; 5–6**.
- **Risk:** **Architecture-change** to different distribution or robot-power arrangements.
- **Need:** 0B.

### T10 — Unattended industrial autonomy: **keep**

“90 days unattended” should mean **without required ground intervention**, not without telemetry. Define permitted interventions, acceptable loss of throughput, fault classes, spares, and safe-state behaviour.

- **Current TRL:** **3–4 for an integrated mining/processing operation**.
- **Evidence and scale:** DS1 Remote Agent demonstrated approximately two days [E10], about **45× shorter** than 90 days; its plant complexity was much lower. Rover autonomy does not establish autonomous industrial repair.
- **Next unmet exit:** Integrated plant breadboard tests with injected faults must agree with predicted recovery and production performance; then relevant-environment endurance is needed.
- **Target / AD²:** **6 at KDP-0B; 6–7**.
- **Risk:** **Project-ending** if the required operating availability cannot be achieved without people onsite; otherwise schedule/cost effects for bounded degradation.
- **Need:** 0B; a bounded autonomy demonstration belongs in 0A.

### T11 — Rendezvous scouts and subsurface sampling: **keep, with separate subsystem ratings**

The spacecraft mass range is credible at its upper end [E13]. But specify **sampling depth, lateral coverage, sample count, mass and grade uncertainty**. A few shallow samples cannot establish a commercially mineable bulk grade by assumption.

- **Rendezvous/remote characterization heritage:** **TRL 9 in flown implementations** [E7, E13].
- **Required scout and bulk-grade sampling implementation:** **TRL 2–4**: **2–3 for unspecified deeper sampling**, **3–4 if a shallow impact-assisted approach is selected and is adequate for the target gate**.
- **Scale comparison:** Hayabusa2 is about 600 kg, overlapping the upper scout range. Flight samples are gram/sub-kilogram scale; the necessary depth and representative sample volume remain unspecified, so no defensible sampling-scale ratio exists.
- **Next unmet exit:** Validate sampling depth, material recovery, contamination control and the link between measurements and bulk-grade predictions.
- **Target / AD²:** **4–5 by the 0A internal sampling milestone**, then **6 before committing a new sampling subsystem to the target-gate mission; 5–7**, depending on depth.
- **Risk:** **Project-ending for 0B** if a qualifying sampled target cannot be established; otherwise scout-development schedule delay.
- **Need:** 0A.

Do not credit 1–3 target visits per scout without a trajectory, propulsion and sampling-reuse requirement.

### T12 — Heavy cargo handling and docking: **keep**

The mass requirement is appropriate, but specify whether product is transferred as a container/module or loose material. Include inertia, capture velocity, structural flexibility, contact loads and the site’s ability to react docking forces.

- **Current TRL:** **3–4**.
- **Evidence and scale:** ATV docked autonomously at about 20.7 t total mass [E11]. Required **payload alone** is **7–15× greater**; including the tug makes the mass comparison larger.
- **Next unmet exit:** Dynamically representative capture/transfer tests must validate load and control predictions, followed by relevant-environment subsystem demonstration.
- **Target / AD²:** **6 at KDP-0B; 5–6**.
- **Risk:** **Architecture-change**, for example smaller modular cargo transfers; project-ending only if alternatives fail delivery economics.
- **Need:** 0B.

### T13 — Water extraction pilot: **keep as conditional and non-critical to metal production**

Specify feed rate, water yield and whether the product comes from hydrated minerals or accessible ice. **Hydration detected remotely or in samples is not demonstrated extractable water at the pilot’s conditions.**

- **Current TRL:** **2–3 for the complete asteroid pilot**.
- **Evidence and scale:** Optical-mining ground experiments exist [E12], but I cannot substantiate a relevant captured-water throughput against **10–100 t/yr**. That product rate is approximately **1.1–11.4 kg/h averaged over the year**, with higher operating rates at reduced duty.
- **Next unmet exit:** Representative-feed tests must close extraction, capture, purification and energy balances; relevant low-gravity operation must follow.
- **Target / AD²:** **4–5 for an internal 0A experiment; 6 before approval of the deployed pilot; 6**.
- **Risk:** **Architecture-change—delete the pilot**, not project-ending for Fe-Ni production.
- **Need:** Conditional 0B at a C-type target.

---

## 2. Missing technologies

These are distinct critical functions, not additional names for equipment already rated.

| ID | Missing technology and required capability | Current readiness, evidence and scale gap | Target, AD² and failure consequence |
|---|---|---|---|
| **T14** | **H₂ reduction and reagent recovery**, separated from T06; only for a demonstrated reducible feed fraction, producing its allocated share of 0.6–2.5 kt/yr | **TRL 2** at the required integrated implementation; no verified relevant throughput. First gap is representative-feed reaction/recycle proof of concept. | **6 at KDP-0B if selected**; AD² **6–7**; architecture-change, conditionally project-ending |
| **T15** | **Distributed energy storage and power management**: 0.5–15 MWh total, 10–50 kWh per robot; charge/discharge power and outage duration TBD; vacuum, thermal cycling, radiation, ≥5 years | **TRL 3–4** integrated. ISS battery modules operate in space [E15], but not as this distributed industrial microgrid. Robot battery scale is plausibly comparable to modular heritage; site aggregate is orders larger, with the precise ratio dependent on chosen module. Next gap: validated load profile, protection, thermal behaviour and scaling. | **6 at KDP-0B**; AD² **4–5**; architecture-change |
| **T16** | **Robotic installation, maintenance and recovery**: assemble site power/process modules, handle 2–3.5 t robots, change wear parts, recover jams and failed cables; target-local low gravity, dust and ≥5-year service | **TRL 2–3** integrated. ISS robotics establish component-handling heritage, but not autonomous industrial maintenance in asteroid dust. No demonstrated maintenance-cycle ratio is available. Next gap: representative hardware maintenance tests tied to availability predictions. | **6 at KDP-0B**; AD² **6–7**; project-ending if no maintainable production architecture exists |
| **T17** | **Enclosed solids transport, metering and buffering**: excavation-to-plant flow determined by the joint mass balance; 2–8 kt/yr concentrate and 13–47 kt/yr tailings; abrasive charged grains in low gravity and vacuum | **TRL 2–3**. Small sample transfers [E7] do not establish continuous bulk transport. No relevant throughput ratio is defensible. Next gap: test-backed flow, bridging, dust, wear and upset-recovery performance. | **6 at KDP-0B**; AD² **6–7**; project-ending across routes |
| **T18** | **Product conditioning, forming and qualification**: deliver 0.6–2.5 kt/yr of an agreed usable Fe-Ni product—powder, compact, billet or component—with specified composition, contamination and mechanical/processing properties | **TRL 2–3** for asteroid-derived product. EML alloy experiments [E8] do not establish a product-making chain or Phase 1 acceptance. Relevant throughput and quality ratios are unavailable until product form is selected. Next gap: representative feed-to-accepted-product tests. | **6 at KDP-0B**; AD² **5–7**, route-dependent; project-ending if Phase 1 cannot use the product |
| **T19** | **Target-local and SEL1 cargo-node navigation/control**: accommodate repeated loaded-tug arrivals, cargo capture, attitude/orbit control, safe departures and collision avoidance; total tug mass and traffic rate TBD | **TRL 3–4** integrated. Asteroid proximity operations [E7] and autonomous docking [E11] support critical functions, not a loaded industrial node. Payload mass is already 7–15× ATV total mass; full dynamical scaling remains undefined. Next gap: hardware-in-loop tests validated against contact/flight data and the selected node dynamics. | **6 at KDP-0B**; AD² **5–6**; architecture-change |
| **T20** | **Deep-space communications, timekeeping and safe command**: support 4–10 scouts and 10–18 tugs plus the site; 1–25-minute light-time, conjunction outages, authenticated recovery, ≥5-year operations; data rates TBD | **TRL 4–5 for the proposed integrated service**; individual flight links have higher heritage [E7, E13]. Fleet count alone is not a meaningful RF scale ratio; range, antenna size, rate and ground allocation are missing. Next gap: defined link/service budgets and tested outage/recovery behaviour. | **5 for 0A internal integration; 6 for 0B service**; AD² **3–4**; schedule-delay or cost-increase |

### Requirements missing across multiple technologies

These should be closed before claiming that “relevant environment” has been defined:

1. **Product specification and customer acceptance:** native Fe-Ni composition alone is not a usable product specification.
2. **Target physical properties:** grain sizes, metal liberation, cohesion, boulders, rotation, surface strength and electrostatic environment.
3. **Joint production mass balance:** ore/feed, concentrate, metal recovery, product and tailings must describe the same operating point.
4. **Availability and life allocation:** replacement intervals, redundant units, spares, maintenance actions and allowable lost production.
5. **Environmental envelopes:** local thermal cycles, dust charging, radiation dose, plume exposure and transient conditions—not merely heliocentric distance.
6. **Power and heat operating points:** coincident loads, storage discharge power, plant temperatures and radiator temperatures.
7. **Delivery definition:** packaged cargo geometry, total loaded-tug mass, SEL1 orbit/node configuration and annual traffic.

Target grade, signed demand, economics and licensing remain **separate gates**. No TRL uplift can substitute for them.

---

## 3. Deferred legacy entries

**The physical deferrals are correct, but the supplied tagging is not entirely correct.**

- **Cryocooler scaling:** Correctly removed from Phase 0 production requirements. Reassess only when a later cryogenic architecture is actually selected.
- **Sunshield deployment:** Correctly deferred with the cryogenic depot.
- **Long-duration MLI:** Correctly deferred with that depot; ordinary spacecraft thermal insulation remains needed but is a different requirement.
- **Industrial microgravity electrolysis:** Correctly deferred, but **tagging it `0B` contradicts a water-only pilot and no Phase 0 LOX/LH₂ production**. Use `deferred` pending a later approved use. A small experimental electrolyser could be a discretionary experiment, not a critical 0B technology.
- **Solar-grade silicon purification:** Correctly deferred to phase-1 assessment; oxide-derived Al/Si also remain outside this inventory.

Accordingly, `deferred_ok` is **false for the entries as written**, solely because the electrolysis phase tag needs correction.

```yaml
technologies:
  - id: T01
    action: keep
    technology: MW-class electric propulsion cluster with propellant-specific assessments
    required: "1.0–2.5 MWe per tug at a defined electrical interface; Isp 2,000–3,000 s; 20,000–40,000 h duty; iodine and argon assessed separately from xenon heritage; vacuum, radiation and 0.9–1.3 AU thermal conditions."
    phase_need: 0B
    legacy: solar-electric-propulsion
    rqs: [rq-0-16, rq-0-54, rq-0-53, rq-0-19, rq-0-20]
    reason: "Keep the transport dependency but do not transfer xenon power or lifetime evidence to an iodine or argon MW cluster."

  - id: T02
    action: keep
    technology: MW-scale modular deployable solar arrays
    required: "1–2.5 MWe per tug and 2.5–8 MW per site at EOL; 10–15 yr; qualify deployment, collection, pointing and contamination at 0.9–1.3 AU, with explicit power derating if sized only at 1.2 AU."
    phase_need: 0B
    legacy: null
    rqs: [rq-0-21, rq-0-22, rq-0-25]
    reason: "The power scale is retained, but EOL sizing must cover the actual operating-distance envelope."

  - id: T03
    action: keep
    technology: Plant and tug waste-heat rejection with separate readiness assessments
    required: "Plant 1–9 MWth at specified radiator temperatures within the proposed 300–600 K range; tug 50–800 kWth; vacuum, solar loading, dust or plume exposure, thermal cycling and mission-duration operation."
    phase_need: 0B
    legacy: null
    rqs: []
    reason: "Plant and tug loads are valid dependencies but differ materially in temperature, deployment and environmental conditions."

  - id: T04
    action: keep
    technology: Asteroid excavation with anchoring and reaction control
    required: "6–20 machines of 2–3.5 t; 0.5–5 t/h per operating machine, 9–25% duty and at least 5 yr; target-specific anchoring and transient reaction loads in abrasive charged regolith and asteroid low gravity."
    phase_need: 0B
    legacy: asteroid-mining-bucket-wheel
    rqs: [rq-0-6, rq-0-7, rq-0-26, rq-0-39, rq-0-42]
    reason: "Sustained metal-feed acquisition remains essential and is not demonstrated by brief sampling or terrestrial excavation."

  - id: T05
    action: keep
    technology: Low-gravity native Fe-Ni beneficiation
    required: "2–8 kt/yr concentrate and nominal concentration 4–15:1, constrained by one consistent feed/product/tailings balance; specify grade, metal recovery and liberation; continuous enclosed operation in vacuum and target low gravity."
    phase_need: 0B
    legacy: null
    rqs: [rq-0-51, rq-0-10]
    reason: "Retain beneficiation but add recovery and feed-liberation requirements and reconcile independently stated flow ranges."

  - id: T06
    action: split
    technology: No-melt carbonyl Fe-Ni processing with reagent recycling
    required: "Allocated share of 0.6–2.5 kt/yr accepted product if selected; defined feed composition, CO inventory and make-up, pressure containment, reaction selectivity, decomposition and recycle; enclosed vacuum-compatible plant in target low gravity."
    phase_need: 0B
    legacy: microgravity-metallurgy
    rqs: [rq-0-56, rq-0-13]
    reason: "Carbonyl processing requires its own feed, reaction, containment and recycle evidence rather than sharing a rating with hydrogen reduction."

  - id: T07
    action: keep
    technology: Rotating partial-gravity melting and slag-metal separation
    required: "1–10 t batches at 0.05–0.15 g using explicitly paired radius and speed; nominal radius 5–20 m with speed selected from a=omega^2*r; vacuum-compatible furnace, refractory, separation and discharge over the plant service life."
    phase_need: 0B
    legacy: microgravity-metallurgy
    rqs: [rq-0-11, rq-0-12, rq-0-13]
    reason: "Keep this contested route separate and correct the independently stated radius and rpm ranges that otherwise exceed the required gravity envelope."

  - id: T08
    action: keep
    technology: Site particle containment and tailings management
    required: "Manage 13–47 kt/yr tailings with escaped mass no greater than 1 t/yr per site pending licence agreement, ALARP toward 10 kg/yr; include excavation, transfer, processing, storage and credible abnormal events in target low gravity."
    phase_need: 0B
    legacy: null
    rqs: [rq-0-41, rq-0-9]
    reason: "Containment is a distinct technical and licensing dependency not established by sample-return containment."

  - id: T09
    action: keep
    technology: High-voltage regolith-surface power distribution
    required: "1–3 kV and tens to hundreds of kW per robot circuit; define cable lengths, return paths, connectors, reel loads, coincident demand and fault isolation; at least 5 yr in vacuum, abrasive charged dust and thermal cycling."
    phase_need: 0B
    legacy: null
    rqs: [rq-0-60]
    reason: "Retain the tether architecture while adding the surface-cable and protection requirements absent from flight tether heritage."

  - id: T10
    action: keep
    technology: Long-duration unattended mining and processing autonomy
    required: "At least 90 days without required ground intervention, with specified production availability, fault coverage, recovery and safe states; 1–25 min light-time and radiation-tolerant operation over the plant mission."
    phase_need: 0B
    legacy: null
    rqs: [rq-0-42, rq-0-8]
    reason: "Planning and navigation autonomy do not establish unattended industrial operation and recovery."

  - id: T11
    action: keep
    technology: Asteroid rendezvous scouts with representative subsurface sampling
    required: "4–10 scouts of 200–600 kg, nominally 1–3 targets each subject to trajectory and reuse validation; define sampling depth, spatial coverage, sample mass and bulk-grade uncertainty; asteroid proximity, vacuum and deep-space thermal/radiation environments."
    phase_need: 0A
    legacy: autonomous-asteroid-prospecting
    rqs: [rq-0-50, rq-0-1, rq-0-2, rq-0-3, rq-0-5, rq-0-39]
    reason: "Keep the scout programme but separate mature rendezvous heritage from unproven representative bulk-grade sampling."

  - id: T12
    action: keep
    technology: Heavy cargo capture, docking and transfer
    required: "150–300 t payload plus tug mass; specified container geometry, inertia, capture velocity, contact loads and transfer method; autonomous operation at the asteroid site and reference SEL1 node over repeated mission cycles."
    phase_need: 0B
    legacy: null
    rqs: [rq-0-17]
    reason: "Autonomous docking heritage does not demonstrate the required mass, inertia or product-transfer operation."

  - id: T13
    action: keep
    technology: Conditional C-type asteroid water extraction pilot
    required: "10–100 t/yr captured and specified-quality water only at a qualifying C-type target; define feed mineralogy, yield, energy, purification, duty and pilot life; vacuum and target low gravity."
    phase_need: 0B
    legacy: isru-water-extraction
    rqs: [rq-0-27, rq-0-33, rq-0-40, rq-0-55]
    reason: "Retain only as an optional pilot whose failure does not end native Fe-Ni production."

  - id: T14
    action: add
    technology: Hydrogen reduction of reducible feed with reagent recovery
    required: "Allocated share of 0.6–2.5 kt/yr accepted product if selected; demonstrated reducible feed fraction, pretreatment, hydrogen make-up and recycle, water removal and product recovery; enclosed vacuum-compatible plant in target low gravity."
    phase_need: 0B
    legacy: microgravity-metallurgy
    rqs: [rq-0-56, rq-0-13]
    reason: "Split from T06 because hydrogen reduction has different chemistry and cannot be assumed to refine already-native metal."

  - id: T15
    action: add
    technology: Distributed energy storage and microgrid power management
    required: "0.5–15 MWh distributed storage, including 10–50 kWh per robot; define discharge power, recharge profile, outage duration and cycle life; at least 5 yr in vacuum, thermal cycling and radiation."
    phase_need: 0B
    legacy: null
    rqs: [rq-0-21, rq-0-22, rq-0-60]
    reason: "Storage capacity, transient power and protection remain essential despite removal of the central large battery bank."

  - id: T16
    action: add
    technology: Robotic site installation, maintenance and recovery
    required: "Install site power and process modules, service 2–3.5 t robots, replace wear parts and cables and recover jams; handling loads and maintenance cycles derived from the plant availability model; target low gravity, vacuum, dust and at least 5 yr."
    phase_need: 0B
    legacy: null
    rqs: [rq-0-42, rq-0-8, rq-0-60]
    reason: "An uncrewed multi-year production plant needs demonstrated physical maintainability as well as autonomous decision-making."

  - id: T17
    action: add
    technology: Enclosed bulk-solids transfer, metering and buffering
    required: "Feed throughput from the reconciled production mass balance, including 2–8 kt/yr concentrate and 13–47 kt/yr tailings; representative grain size, abrasion, bridging and charging; continuous enclosed operation in vacuum and target low gravity."
    phase_need: 0B
    legacy: null
    rqs: [rq-0-6, rq-0-9, rq-0-10, rq-0-41, rq-0-51]
    reason: "Excavation, beneficiation and refining do not individually establish reliable material flow between their interfaces."

  - id: T18
    action: add
    technology: Fe-Ni product conditioning, forming and qualification
    required: "0.6–2.5 kt/yr in a Phase 1 accepted product form with specified composition, contamination and usable properties; validate representative feed-to-product performance and any rotating, sintering or melting equipment in its applicable environment."
    phase_need: 0B
    legacy: microgravity-metallurgy
    rqs: [rq-0-10, rq-0-11, rq-0-13, rq-0-51, rq-0-56]
    reason: "Beneficiated or chemically recovered metal is not automatically the usable product demanded by Phase 1."

  - id: T19
    action: add
    technology: Target-local and SEL1 cargo-node navigation and control
    required: "Repeated arrivals and departures of tugs carrying 150–300 t payloads; define total mass, traffic rate, orbit, node structure and control authority; collision avoidance, stationkeeping and contact dynamics in the selected operational environments."
    phase_need: 0B
    legacy: null
    rqs: [rq-0-17, rq-0-19, rq-0-20]
    reason: "The delivery-node choice creates dynamical and operational dependencies beyond the docking mechanism itself."

  - id: T20
    action: add
    technology: Deep-space communications and resilient command service
    required: "Serve 4–10 scouts, 10–18 tugs and the production site; define data rates, range, ground allocation, timekeeping, authentication and outage recovery; tolerate 1–25 min light-time and conjunction outages over mission life."
    phase_need: 0A
    legacy: null
    rqs: [rq-0-1, rq-0-8, rq-0-42]
    reason: "Flight link heritage must be converted into a demonstrated fleet service, beginning in 0A and scaling for 0B."

deferred_ok: false
deferred_notes: "Cryogenic depot technologies and solar-grade silicon are correctly deferred, but industrial electrolysis should be tagged deferred rather than 0B because Phase 0 includes only a conditional water pilot and no production LOX/LH2."
```
