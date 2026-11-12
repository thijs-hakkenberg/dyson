---
bomId: "bom-0-15"
itemName: "Debris and Contamination Control"
itemSlug: "debris-contamination"
modelId: "gpt-6-1-sol"
modelName: "GPT-6.1 Sol"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-15 — Debris and Contamination Control
## Technical proposal for Phase 0A and gated Phase 0B

**Recommendation:** Make physical containment a prerequisite for asteroid processing—not an efficiency improvement added after mining equipment is selected. Use enclosed excavation interfaces, double-contained material transfer, sealed processing interfaces, and engineered tailings cells anchored to the target NEA. Measure escaped material through several independent methods; do not claim compliance from plant mass balance alone.

**Proposed item budget:** **$100–205 million in constant 2026 USD**, comprising:

- **0A: $25–50 million** for containment development, test articles, instrumentation and the containment payload contribution to the pathfinder.
- **0B: $75–155 million**, conditional on the production gate, for one site's flight containment equipment, monitoring system, initial tailings-cell inventory and acceptance.
- Launch, spacecraft buses, general mission operations, common qualification infrastructure, subsequent replacement inventory and programme contingency remain in their respective BOM lines.

This is a capability-development estimate, not a supplier quotation. Confidence is **low before target selection and relevant-environment testing**.

---

## 1. Design basis and programme boundaries

### 1.1 Binding architecture

This proposal assumes:

- Beneficiation and primary Fe-Ni processing occur at the selected NEA.
- Saleable product, not untreated ore, is transported.
- Phase 0 is uncrewed.
- Phase 0A is funded; Phase 0B remains a gated option sized to signed Phase 1 demand.
- SEL1 is the interim receiving-node reference, not the location of bulk asteroid processing.
- No production LOX/LH₂ system is included.
- Iodine EP is a costing reference only; propellant selection remains open.

### 1.2 Numerical assumptions

The following are **engineering assumptions for sizing**, not established asteroid properties.

| Parameter | Reference case | Sizing range / qualification |
|---|---:|---|
| Delivered Fe-Ni product | 1,000 t/year | Approximately 600–2,500 t/year programme envelope; hardware must be resized at KDP-0B |
| Effective product recovery, product mass/feed mass | 20% | 5–20% sensitivity range |
| Feed at 1,000 t/year product | 5,000 t/year | 5,000–20,000 t/year |
| Retained solid residue | 4,000 t/year | 4,000–19,000 t/year |
| Processing operation | 6,000 h/year | Scheduling assumption |
| Average feed while operating | 0.83 t/h | 0.83–3.33 t/h |
| Settled tailings bulk density | 1.5 t/m³ | 1–2 t/m³ |
| Local escape speed | Not yet known | Use 0.05–1 m/s in preliminary tests and trajectory studies; replace with target data |

The recovery fraction is especially important. A low-metal target can turn a nominally modest product programme into a large waste-retention programme.

**Design position:** A target requiring excessive waste handling should fail the target/economics gates rather than force the containment system to accommodate unlimited throughput.

### 1.3 Scope ownership

**bom-0-15 owns:**

- Dedicated containment shrouds, liners, capture stages and tailings cells.
- Containment-specific shutters, seals, leak detection and interlocks.
- Dedicated contamination monitors and local debris surveillance instruments.
- Escape assessment models and the technical compliance evidence package.
- Initial installed containment equipment and initial cell inventory.

**Other items retain their scope:**

| Interface | Scope retained elsewhere |
|---|---|
| Mining robots, bom-0-2 | Excavators, manipulators, locomotion, general anchoring and robot control |
| Processing plant, bom-0-3 | Process vessels, furnaces, separators and process machinery |
| Tugs, bom-0-4 | Propulsion, cargo transport and flight safety |
| Power, bom-0-5 | Generation, storage, HV distribution and shared radiator infrastructure |
| Organization, bom-0-7 | Legal authority, licensing management and programme assurance |
| Launch, bom-0-8 | Earth-to-space delivery |
| Communications and operations, bom-0-9/10 | Communications service and routine staffing |
| NRE/pathfinder, bom-0-11/12 | Shared test facilities, generic qualification infrastructure, spacecraft bus and flight campaign |
| Receiving node, bom-0-13 | Receiver-side containment and inspection equipment |
| Spares, bom-0-14 | Subsequent replacement stock |
| Propellant, bom-0-16 | EP propellant procurement |
| Reserve, bom-0-17 | Programme contingency |

For example, a containment instrument flown on the pathfinder is charged here; its bus, launch and mission campaign are not charged here again.

---

## 2. Recommended philosophy: contain, immobilize, verify

I recommend four principles.

### 2.1 Prevent release at the source

Free-space separation of particles followed by attempted recapture is unacceptable as the production baseline. Even a particle moving at centimetres per second can become unrecoverable from a small body.

Every solids-generating operation must occur within a defined containment boundary.

### 2.2 Use passive barriers before active collection

Primary protection should be:

1. Physical enclosure.
2. Low-energy material handling.
3. Closed transfer paths.
4. Secondary capture volume.
5. Active collection as a supplement.

Magnetic and electrostatic collection are useful, but neither is a universal barrier. Nonmagnetic gangue, neutral particles, agglomerates and changing charge states prevent that.

### 2.3 Retain residue at the source

No intentional release of tailings, slag, fines, packaging or cleaning residues.

Tailings should remain in closed, mechanically restrained cells at the NEA. A natural depression is useful support geometry, but is **not** by itself a containment system.

### 2.4 Treat uncertainty as a reason to stop

An unexplained plume or loss of monitoring coverage must reduce operations or stop material motion. Continued production while investigating a possible release is the wrong autonomy policy.

---

## 3. Proposed requirements and interim ceiling

D-03 remains interim. The following is my recommended starting position for modelling, testing and licensing—not a claim that these values are already approved.

### 3.1 Escaped-solid requirement

Define escaped material as project-generated solids crossing the **outer credited containment boundary** without a demonstrated retained or recoverable state. Crossing this boundary counts as a release even if the particle remains temporarily gravitationally bound to the asteroid.

| Requirement | Proposed interim value |
|---|---|
| Intentional solid discharge | Prohibited |
| Nominal-operation design objective | Escaped solid mass ≤ **10⁻⁷ of processed feed** |
| Interim design ceiling | Escaped solid mass ≤ **10⁻⁶ of processed feed** |
| Evaluation | Each production campaign and rolling annual total |
| Reference annual ceiling | **5–20 kg/year** at 5,000–20,000 t/year feed |
| Reference design objective | **0.5–2 kg/year** at the same feed |
| Coarse fragments | No planned releases; every detected fragment ≥1 mm is an anomaly requiring assessment |
| Compliance confidence | Conservative upper bound at a proposed **95% confidence**, with model uncertainty explicitly reported |

For comparison, 99% containment at this feed rate would allow **50–200 tonnes/year** to escape. It is not a credible industrial target.

The mass ceiling is necessary but insufficient. The compliance case must also include:

- Particle size and velocity distributions.
- Release direction and timing.
- Accumulation over the programme lifetime.
- Probability of impacts on project and third-party assets.
- Optical, thermal, electrical and chemical contamination effects.

**A single hazardous macroscopic fragment is not made acceptable by remaining below an annual mass limit.**

### 3.2 ALARP application

Meeting the ceiling does not automatically establish ALARP. Additional reductions must be adopted where reasonably practicable, considering benefit, technical feasibility and cost.

Conversely, missing the ceiling cannot be excused by an internal ALARP assertion. It requires redesign, restricted operation or an explicit revised licensing decision.

### 3.3 Molecular contamination

Do not combine vapour contamination with the solid-loss fraction.

Initial project-level allocations should be established with each sensitive subsystem. Provisional values for study are:

- Array contamination: **≤1% annual electrical-output loss attributable to site deposition**.
- Sensitive optical witnesses: **10–100 ng/cm² per defined exposure campaign**, adjusted for optical function.
- Iodine, condensable metals and organic residues: separate species-specific deposition limits.
- No process vent directed toward arrays, radiators, sensors, docking interfaces or an arriving spacecraft.

These are allocation starting points, not universal material limits.

---

## 4. System architecture

```text
                         NEA PROCESSING SITE

 Asteroid material
        |
        v
 +--------------------------+
 | Enclosed excavation head |  Replaceable skirt, baffles,
 | + local capture volume   |  force-limited cutting
 +------------+-------------+
              |
       Double-contained transfer
              |
              v
 +--------------------------+
 | Beneficiation / process  |  Process equipment: bom-0-3
 | containment interfaces   |  Secondary barriers: bom-0-15
 +-----------+--------------+
             |
       +-----+----------------------+
       |                            |
       v                            v
 Product isolation lock      Residue immobilization
       |                            |
 Sealed product package      Closed tailings cell
       |                            |
 Inspection / transfer       Anchorage + condition sensing
       |
 Cargo tug

 Across the site:
 [particle sensors] [witness plates] [cameras / lidar]
                         |
                Independent safety controller
                         |
          STOP feed / isolate / retain / report
```

This is not a large pressurized dome over an asteroid. The proposed architecture uses small, inspectable containment volumes and minimizes the distance over which loose material travels.

---

## 5. Subsystem specifications

### 5.1 Excavation containment kits

**Production quantity:** 2–4 installed heads, depending on robot arrangement and required availability.

| Parameter | Preliminary range |
|---|---:|
| Working aperture | 1–2.5 m |
| Shroud envelope | Approximately 2–4 m diameter, 1–3 m depth |
| Mass per containment kit | 250–600 kg |
| Electrical load | 0.5–2 kW average; 3–5 kW peak |
| Primary capture | Baffles, compliant skirt, enclosed collection path |
| Supplemental capture | Magnetic collection for metal-bearing fines; electrostatic plates where demonstrated |

The skirt must tolerate fractured, irregular ground. It should not depend on a hermetic seal against raw regolith. Instead, overlapping barriers and a guarded secondary volume prevent a direct ballistic path outward.

Cutting speeds and reaction forces are constrained by capture performance. Production optimization comes second.

### 5.2 Closed transfer network

**Quantity:** 2–4 transfer runs, typically 5–20 m each; keep total transfer length near **20–60 m** where site geometry permits.

Recommended configuration:

- Enclosed screws, restrained cartridges or other positive-displacement transfer.
- Replaceable wear liners.
- Secondary sleeves around high-risk joints.
- Isolation shutters between major sections.
- Local particle and closure-state sensing.
- No open conveyor belts.
- No routine pneumatic transport requiring a large make-up gas supply.

**Allocated mass:** 0.8–2 t for containment sleeves, barriers, shutters and related instrumentation—not the entire process transport machinery.

Material residence and jamming behaviour must be demonstrated in vacuum and reduced gravity.

### 5.3 Process exhaust and condensable capture

Processing vessels remain bom-0-3 hardware. This item adds:

- Replaceable cold-trap and impaction stages.
- Labyrinth paths that block direct particulate escape.
- Downstream witness collectors.
- Instrumented vent isolation.
- Closed collection of spent filters and condensed material.

No assumption is made that a single commercial filter can achieve the required performance in vacuum. Performance must be measured against the actual particle and vapour distributions.

**Provisional capture-package allocation:** 0.5–1.5 t; 1–5 kW electrical excluding primary furnace power.

Thermal capture loads depend on the selected metallurgy. Where heat can be returned to the process or rejected passively, electrical demand may be small even though thermal duty is substantial.

### 5.4 Tailings retention cells

**Recommended unit:** An anchored, supported, double-envelope cell with a mechanically closable filling interface.

| Parameter | Preliminary specification |
|---|---|
| Capacity | 250–600 t of retained residue |
| Representative geometry | Approximately 6 × 8 × 6 m; target-dependent |
| Empty mass | 0.2–0.5 t per cell, excluding major shared foundations |
| Envelope areal mass | Approximately 0.3–0.8 kg/m² before closure and anchorage hardware |
| Instrumentation | Closure state, restraint load, temperature, external inspection markers |
| Power | Primarily passive; shared inspection and low-power health telemetry |

At a reference **400 t/cell**:

- Reference site: approximately **10 cells filled/year**.
- Feed-sensitivity case: approximately **10–48 cells/year**.
- Initial inventory: approximately **12–50 cells**, selected at the gate rather than procured blindly.

Cells need structural support from terrain, prepared cradles or both. Their envelopes are containment barriers, not unsupported lifting bags for hundreds of tonnes.

Tailings should enter in low-energy batches and be restrained against migration. Compaction or limited agglomeration is desirable if it can be achieved without substantial imported binders.

**Do not assume full sintering of all waste.** Its energy and equipment burden may defeat the economics. A mechanically restrained, double-contained residue inventory is the baseline; sintering is an option to be justified.

### 5.5 Product-transfer cleanliness

Provide a containment-side product isolation lock and:

- Dust removal within the closed handling volume.
- Inspection before package release.
- Two independent closure indications.
- Package identification and cleanliness records.
- A closed handling provision for rejected packages.

The receiving node sets acceptance limits with Phase 1. Externally dusty ingots or cartridges are not acceptable merely because their bulk chemistry is correct.

### 5.6 Site monitoring

**Initial equipment complement:**

- 4–8 illuminated imaging stations.
- 2–4 short-range lidar or equivalent ranging instruments.
- 12–24 deposition/particle monitors.
- 20–40 passive witness coupons.
- Dedicated external inspection capability supplied through the robot interface.

Camera performance should be specified as detection probability versus size, speed, position and illumination—not “detects all particles above X.”

A provisional local surveillance volume of **50–200 m radius** is suitable for early layout studies. It will not detect every fine particle and is not the primary containment barrier.

---

## 6. Mass, power and thermal allocation

### 6.1 Production-site equipment

| Equipment | Estimated mass |
|---|---:|
| Excavation containment kits | 1–2.4 t |
| Transfer containment hardware | 0.8–2 t |
| Process capture and isolation packages | 0.5–1.5 t |
| Monitoring, safety electronics and harness | 0.5–1.2 t |
| Shared cell-handling interfaces, cradles and dedicated restraints | 1–3 t |
| Installation allowances and local protection | 1–2 t |
| **Fixed equipment, rounded** | **6–12 t** |
| Initial tailings cells | **3–25 t** |
| **Initial delivered item mass** | **9–37 t** |

The range is deliberately wide because target recovery and cell deployment dominate.

If target-specific anchorage requires extensive civil preparation, that must be estimated explicitly rather than hidden in this allocation.

### 6.2 Power and heat

- **Average operating electrical load:** 8–25 kW.
- **Peak load:** 30–60 kW.
- **Safe-state load:** 0.3–1 kW.
- **Local electrical backup:** approximately 2–5 kWh, sufficient for isolation and telemetry—not sustained production.
- Most electrical consumption ultimately becomes heat. Additional process-derived thermal loads require separate allocation.

At roughly **0.5–1 kW/m² net useful radiator rejection**, an incremental 10–30 kW duty implies approximately **10–60 m² of effective radiator area**, before environment and layout margins.

Radiator hardware is supplied through the agreed power/thermal architecture, not purchased a second time here. Contaminated process heat should not be coupled into clean thermal surfaces without an assessed isolation scheme.

---

## 7. Verification: the hardest part

### 7.1 Why mass balance is inadequate

Weighing thousands of tonnes of incoming material and subtracting outgoing product and residue cannot reliably establish a kilogram-scale release.

Mass balance is useful for detecting gross losses and inventory mistakes. It is not the principal proof of a one-part-per-million release ceiling.

### 7.2 Required evidence chain

Compliance should combine:

1. **Controlled source testing**  
   Characterize ejection by particle size, velocity, composition and charge.

2. **Barrier qualification**  
   Measure escape through skirts, joints, closures, filters and handling interfaces.

3. **Tracer experiments**  
   Use distinguishable tracers in enclosed test campaigns; recover and count material outside successive barriers.

4. **Operational source accounting**  
   Record active hours, throughput, configuration, wear state and disturbances.

5. **In-flight monitoring**  
   Compare observed deposition and particles against predicted release distributions.

6. **Trajectory analysis**  
   Propagate plausible releases under local gravity, rotation, solar radiation pressure and relevant perturbations.

For an idealized counting test with zero detected events, the approximate 95% Poisson upper bound is three events. Turning that into a mass-release bound still requires detection efficiency, representative sampling and a valid particle distribution.

**Zero detections is not evidence of zero release.**

### 7.3 Failure-state coverage

Qualification must cover:

- Nominal operation and maximum throughput.
- Abraded and partially clogged equipment.
- Emergency power loss.
- Tool jams and abrupt stops.
- Failed seal or incomplete closure.
- Cell overfill and restraint degradation.
- Local particle bursts from brittle fracture.
- Electrostatic charging extremes.

Normal-operation performance must not be extrapolated to accidents without separate analysis.

---

## 8. Autonomy, control and communications

### 8.1 Independent containment authority

A containment safety controller should have direct authority to:

- Inhibit excavation.
- Stop feed and nonessential material motion.
- Close isolation barriers.
- Isolate a tailings cell.
- Prevent cargo release.
- Preserve event data.

It must not depend on Earth approval, continuous communications or the production optimizer.

### 8.2 Response requirements

| Event | Preliminary response requirement |
|---|---|
| Loss of closure confirmation | Inhibit the next transfer immediately |
| Suspected release | Issue motion-stop command within 100 ms locally |
| Mechanical isolation | Typically complete within 1–5 s where feasible |
| Loss of monitoring coverage | Enter reduced operation or safe stop within 10 s |
| Power loss | Passive retention; controlled closure using local backup |

Stopping commands and actual arrest times must be distinguished. High-inertia equipment may require longer controlled stopping, so surrounding barriers must retain material throughout that interval.

### 8.3 Data and communication

- Routine containment telemetry: **20–100 kbit/s**.
- Selected event imagery: **1–10 Mbit/s when scheduled**.
- Local event storage: **2–8 TB**.
- Store high-rate raw sensor data locally; downlink summaries and selected event windows.

These are site allocations, not a new communications network.

### 8.4 EP interface

No tug thruster firing near exposed material or an unprotected site.

The exclusion zone must be derived from plume and deposition modelling for the selected thruster and propellant. A universal distance is inappropriate before thruster selection.

Iodine requires particular attention to condensable contamination and material compatibility; argon changes the concern but does not eliminate plume erosion or charging.

---

## 9. Manufacturing and maintainability

Use modular, replaceable hardware:

- Segmented metallic inner wear surfaces.
- Flexible outer capture barriers.
- Standardized closure cartridges.
- Robot-compatible fasteners, handles and inspection targets.
- Captive components wherever practical.
- Encapsulated insulation and protected composite edges to prevent shedding.

Materials selection requires vacuum, UV, thermal-cycle, abrasion and charging tests. Exposed polymer films should not be credited with multi-year life without supporting data.

Do not assume asteroid-derived metal can manufacture critical containment equipment during initial operations. Local production may later supply simple cradles or shielding, but imported qualified components remain the initial baseline.

Every module should carry serialized configuration and life records linked to operating hours, abrasive throughput and radiation exposure.

---

## 10. Development roadmap and readiness gates

### 10.1 Phase 0A

| Step | Main work | Exit evidence |
|---|---|---|
| Requirements and target-independent modelling | Particle source models, requirements flow-down, preliminary licensing engagement | Agreed testable requirement set |
| Component development | Skirts, closures, abrasive transfer interfaces, collectors | TRL 4 evidence |
| Integrated ground demonstration | Representative feed, vacuum, thermal cycling, fault injection | TRL 4–5, bounded operating envelope |
| Relevant-environment pathfinder | Excavation containment, transfer, cell deployment, sensing and shutdown | TRL 6 evidence for project-ending containment technologies |

Ground vacuum tests alone do not reproduce long-duration microgravity particle motion. Drop towers and parabolic flight provide useful but incomplete evidence. Relevant-environment flight testing is therefore essential.

The pathfinder must demonstrate representative local physics—particle velocities, clearances, electrostatic conditions, wear and closure behaviour—not necessarily a full year's industrial throughput.

### 10.2 KDP-0B conditions

No production commitment unless:

1. The target's feed properties and surface mechanics support containment.
2. Every project-ending containment technology is at **TRL 6 in a relevant environment, without waivers**.
3. A credible escape upper bound meets the interim ceiling and applicable licence conditions.
4. The retained-waste inventory has an engineered capacity and anchoring solution.
5. Product cleanliness requirements are signed with Phase 1.
6. Monitoring and safe shutdown remain credible under realistic faults.
7. Containment mass, replenishment and disposal liabilities are included in the economics.
8. Residual risk is accepted by the appropriate project authority and licensing state.

If these conditions fail, remain in 0A, reduce the production concept, select another target or invoke the Earth-supplied material fallback.

---

## 11. Cost estimate

### 11.1 Basis

Constant **2026 USD**, one production site, initial equipment and inventory. Ranges reflect early design uncertainty; they are not a probabilistic confidence interval.

| Cost element | 0A | 0B |
|---|---:|---:|
| Item-specific engineering, modelling and compliance evidence | $5–10M | $6–12M |
| Containment and closure development / flight hardware | $7–14M | $24–48M |
| Transfer and process-capture packages | Included in development above | $10–22M |
| Monitoring instruments and safety controls | $4–8M | $10–20M |
| Pathfinder containment payload contribution | $5–10M | — |
| Tailings-cell materials, deployment development / initial inventory | $2–4M | $12–30M |
| Item-level acceptance, calibration and integration | $2–4M | $13–23M |
| **Total** | **$25–50M** | **$75–155M** |

**Combined: $100–205M.**

Shared test facilities and the pathfinder bus/campaign remain outside this table. If organizational accounting books all development under bom-0-11, those costs must be transferred—not duplicated.

### 11.2 Recurring needs

At approximately 10–48 filled cells/year, cell hardware alone could require:

- **2–24 t/year** of new empty-cell hardware if cells are not reusable.
- Approximately **$2–10M/year** for cell hardware, capture consumables, calibration and wear items at this conceptual stage.

Procurement of replacement stock belongs in bom-0-14; staffing and operational monitoring belong in bom-0-10. Cell reuse is limited by the requirement to keep the waste contained.

This recurring delivery burden is a major target-selection discriminator.

### 11.3 Comparison with round-2 figures

- **$50M lower bound:** Too low for a combined 0A+0B package with relevant-environment verification, flight monitoring and engineered residue storage. It may cover a constrained 0A effort.
- **$150M:** A reasonable central planning allowance for one favourable site, but not yet a defensible committed price.
- **$100–300M:** Credible as a broad envelope. I recommend $100–205M as the current base estimate, with difficult-target growth exposed separately rather than silently absorbed.

This estimate excludes programme contingency. bom-0-17 must carry that reserve.

---

## 12. Principal risks

| Risk | Consequence | Primary mitigation |
|---|---|---|
| Feed contains more fine nonmagnetic material than expected | Higher escape and filter loading | Scout sampling, representative simulants, mechanical barriers |
| Excavation interface cannot conform to terrain | Persistent leakage | Small working apertures, overlapping skirts, secondary capture |
| Wear generates leaks or new debris | Gradual performance degradation | Replaceable liners, wear sensing, throughput-based retirement |
| Tailings cell restraint fails | Large release or site obstruction | Redundant restraint paths, supported placement, staged filling |
| Electrostatic effects invalidate capture assumptions | Dust transport beyond predicted zone | Do not credit electrostatics as sole barrier; test charging extremes |
| Monitoring misses fine particles | False compliance claim | Qualification-led bounds plus multiple independent monitors |
| Tug plume disturbs stored material | Major secondary release | Operational exclusion zones and protected storage geometry |
| Thermal process emits condensables | Array, radiator or optical degradation | Cold traps, directional isolation, witness monitoring |
| Low recovery creates excessive waste inventory | Cost and delivery growth | Target/economics gate; throughput cap |
| End-of-life stewardship is unresolved | Long-term containment liability | Passive stable configuration and agreed monitoring plan before 0B |

The highest-consequence hazard is a disturbance of accumulated tailings, not merely a steady trickle of processing dust. Storage must receive the same engineering attention as excavation.

---

## 13. Open engineering questions

Before freezing the 0B baseline, resolve:

1. **Target mechanics:** Can the selected body support stable anchorage without local failure or unacceptable rotation changes?
2. **Particle population:** What fractions are submicron dust, angular fines and brittle fragments?
3. **Recovery:** Does beneficiation produce enough metal per tonne handled?
4. **Escape verification:** Which measurement chain provides the strongest defensible upper bound?
5. **Cell lifetime:** Can passive cells retain material through the full thermal, radiation and impact environment?
6. **Waste immobilization:** Is mechanical restraint sufficient, or is selective agglomeration worth its power and equipment?
7. **Propellant compatibility:** What iodine deposition and plume constraints result from the selected EP system?
8. **Phase 1 interface:** What external package cleanliness and composition limits are contractually required?
9. **Long-term custody:** Who owns the retained residue and post-operation monitoring obligation?
10. **Licensing criteria:** Will the state require additional absolute mass, particle-count or trajectory-based limits?
11. **Scaling:** Can production increase without exceeding storage area, anchorage or replenishment capacity?

## Final recommendation

Authorize **$25–50M of Phase 0A work**, tied to measurable containment demonstrations, and retain **$75–155M for 0B as a gated estimate only**.

Adopt the proposed **10⁻⁶ escaped-solid fraction ceiling and 10⁻⁷ design objective as interim study requirements**, subject to modelling, testing and the licensing state. Do not describe them as proven performance.

Most importantly, make this a target-selection rule:

> **If we cannot demonstrate that the feed can be excavated, processed and retained with bounded releases—and that the accumulated waste remains stable—the target is not ready for industrial Phase 0B.**