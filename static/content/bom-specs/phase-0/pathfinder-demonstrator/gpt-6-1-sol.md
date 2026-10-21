---
bomId: "bom-0-12"
itemName: "0A Pathfinder Demonstrator"
itemSlug: "pathfinder-demonstrator"
modelId: "gpt-6-1-sol"
modelName: "GPT-6.1 Sol"
generated: "2026-10-20"
phase: "phase-0"
---

# Technical proposal: bom-0-12 — 0A Pathfinder Demonstrator

## 1. Recommendation

Build **one uncrewed, solar-electric rendezvous mission to a prospecting-qualified near-Earth asteroid**, carrying an integrated excavation, beneficiation, Fe–Ni consolidation, and containment experiment.

The mission should demonstrate a complete, measured sequence:

> **Characterized surface material → enclosed excavation → magnetic/mechanical beneficiation → thermal consolidation of native Fe–Ni → inspected and mechanically tested product → retained waste.**

It should **not** attempt commercial production, transport bulk product to SEL1, extract oxygen from silicates, produce cryogenic propellants, or demonstrate an industrial cargo tug.

The decisive experiment is not whether an instrument can melt a few metal particles. It is whether an integrated system can repeatedly acquire heterogeneous asteroid material, recover useful metal, manufacture a specified intermediate product, and account for its waste and emissions under actual asteroid conditions.

### Recommended planning envelope

All costs below are **constant 2026 US dollars**, not discounted.

| Parameter | Recommended range | Basis |
|---|---:|---|
| Missions | **1** | One integrated target mission; no second flight assumed |
| Rendezvous spacecraft dry mass | **6–8.5 t** | Includes preliminary design mass reserve |
| Departure wet mass | **8–12 t** | Strongly target- and propulsion-dependent |
| Solar-array output at 1 AU, beginning of life | **60–80 kWe** | Cruise propulsion and intermittent processing |
| Processing-period electrical demand | **30–50 kWe** | Operations scheduled to available solar power |
| Asteroid feed processed | **300–1,000 kg** | Enough material to expose variability and wear |
| Recovered/consolidated Fe–Ni | **10–80 kg objective** | Conditional on feed grade and recovery |
| Active surface campaign | **12–18 months** | Includes commissioning and seasonal/geometry constraints |
| Total mission after launch | **3–6 years** | Transfer dominates target-dependent variation |
| Direct bom-0-12 implementation cost | **$0.9–1.7B** | Flight article, item-specific engineering, integration and acceptance |
| Fully burdened attributable 0A cost | **$1.9–3.8B** | Includes separately booked delivery, shared development, operations and reserve |
| 0B hardware charged to this item | **$0** | Industrial equipment belongs to other BOM items |

**My preferred planning provision is approximately $2.7B fully burdened**, with the funding decision separated into staged commitments. This is an estimating reference, not a statistically established P50.

---

## 2. Design philosophy and scope boundaries

### 2.1 Demonstrate the production physics, not a miniature factory

The pathfinder should preserve the critical physical features of the proposed industrial process:

- Actual asteroid feedstock and environmental conditions.
- Representative cutter tips, bearings, seals, screens and magnetic-separation gaps.
- Representative furnace temperature, vacuum conditions and material-contact surfaces.
- Closed material handling.
- Measured contamination and particle escape.
- Product chemistry and mechanical-property verification.

It does **not** need geometrically scaled versions of every industrial subsystem.

A small furnace can demonstrate relevant metallurgy. It cannot, by itself, establish the reliability, heat rejection, maintenance burden, or economics of a megawatt-scale industrial plant. The technology maturation plan must explicitly distinguish those claims.

### 2.2 Prefer native metal; do not make oxide reduction a hidden dependency

Baseline feedstock is a **prospecting-confirmed, accessible native-metal-bearing regolith**.

The process may remove surface contamination and consolidate metallic grains, but it does not depend on reducing iron oxides or silicates. Chemical reducing agents, electrolytic oxygen production and high-volume reagent imports are excluded.

If the target contains insufficient recoverable native metal, the correct outcome is a failed target gate—not an unplanned pivot to a substantially different metallurgy programme.

### 2.3 One mission, internally redundant experiments

Use:

- One spacecraft.
- One primary target.
- One enclosed excavation/processing chain.
- Two complementary excavation tools.
- Replaceable process cartridges and selected redundant instruments.

Do not baseline a second asteroid visit. Large inter-asteroid transfers would increase propellant, time and operational complexity while weakening the requirement to select the first target correctly.

### 2.4 Avoid duplication with other BOM items

| Interface | Scope owned by bom-0-12 | Scope booked elsewhere |
|---|---|---|
| Prospecting | Pathfinder approach reconnaissance and worksite selection | Remote survey and rendezvous scout programme, bom-0-1 |
| Mining | Flight demonstrator excavation mechanisms | Industrial mining robots, bom-0-2 |
| Processing | Flight experimental beneficiation and furnace modules | Industrial plant, bom-0-3 |
| Propulsion | Pathfinder propulsion hardware | Industrial cargo tugs, bom-0-4; bulk propellant procurement, bom-0-16 |
| Power | Dedicated pathfinder arrays, storage and thermal hardware | Industrial site power, bom-0-5 |
| R&D | Mission-specific implementation and acceptance | Shared process development and qualification campaigns, bom-0-11 |
| Containment | Flight enclosures, instrumentation and controls | Programme-wide environmental models, licensing evidence and independent verification, bom-0-15 |
| Delivery/operations | Requirements and interfaces | Launch, communications and mission operations, bom-0-8/9/10 |

Costs must be recorded only once. An attributable mission total may include allocations from those other lines, but those allocations must not be added again to the programme total.

---

## 3. Mission assumptions and target eligibility

The following are **design assumptions**, not established asteroid properties.

### 3.1 Reference target envelope

| Attribute | Initial design assumption |
|---|---|
| Orbit | NEA with feasible solar-electric rendezvous and acceptable communications geometry |
| Operational heliocentric distance | Preferably **0.85–1.35 AU** |
| Diameter | Approximately **100–800 m** |
| Rotation period | Preferably **6–30 hours** |
| Accessible working material | Loose regolith, fragmented surface material, or weakly bound metal-bearing aggregate |
| Recoverable native-metal feed grade | **5–15 wt% planning range**, verified by scouts |
| Beneficiation metal recovery | **60–85% development objective** |
| Surface environment | Suitable sites without unavoidable severe mass movement or excessive centrifugal acceleration |
| Licensing | Operations and end state acceptable to the licensing state |

A fast rotator or coherent metal boulder is not impossible to work, but would require a different anchoring and excavation design. This proposal does not treat all asteroid types as interchangeable.

For illustration, a uniform 100–800 m diameter body at 2,000 kg/m³ has surface gravity of roughly **3×10⁻⁵ to 2×10⁻⁴ m/s²**, before rotation and shape effects. Corresponding escape speeds are only about **0.05–0.4 m/s**.

Consequently, excavation reaction forces and escaped grains cannot be managed by relying on weight or gravity settling.

### 3.2 Target selection must precede final tool design

Scout data must establish, with quantified uncertainty:

- Native-metal abundance and spatial variability.
- Particle-size distribution.
- Surface cohesion and bearing response.
- Regolith depth and boulder population.
- Rotation, local slopes and gravitational environment.
- Thermal properties and dust adhesion.
- Access to several work patches within the pathfinder’s relocation envelope.

**A metal-rich spectrum alone is insufficient evidence of excavatable feedstock.**

---

## 4. Mission architecture

```text
                         EARTH SEGMENT
              paid tracking / command / science archive
                                  |
                           RF communications
                                  |
                 +-------------------------------+
                 |  PATHFINDER SPACECRAFT BUS    |
                 |  GNC, avionics, EP, batteries |
                 +-------------------------------+
                    |           |             |
              solar arrays   radiators   articulated
                                           workhead
                                               |
                                  +-----------------------+
                                  | Sealed surface hood   |
                                  | Anchors + tool head   |
                                  | Initial debris traps  |
                                  +-----------------------+
                                               |
                                      double-door transfer
                                               |
                                  +-----------------------+
                                  | Feed metering         |
                                  | Screening + magnetic  |
                                  | beneficiation         |
                                  +-----------------------+
                                      |              |
                                  concentrate      tailings
                                      |              |
                              +---------------+  +-------------+
                              | Batch furnace |  | Sealed waste|
                              | and moulds    |  | cartridges  |
                              +---------------+  +-------------+
                                      |
                              +-------------------+
                              | Product inspection|
                              | and coupon testing|
                              +-------------------+
                                      |
                                retained inventory
```

### 4.1 Mission sequence

1. **Cruise and checkout**
   - Commission spacecraft and propulsion.
   - Exercise mechanisms using sealed reference materials.
   - Establish instrument calibration baselines.

2. **Rendezvous and global reconnaissance**
   - Map shape, rotation and gravitational environment.
   - Verify the scout-derived working assumptions.
   - Select primary and backup work patches.

3. **Non-destructive surface characterization**
   - Touch-and-retract measurements.
   - Tool-force, cohesion and anchoring trials.
   - Local contamination baseline.

4. **Containment commissioning**
   - Seat the excavation hood.
   - Demonstrate transfer-door and interlock functions.
   - Perform low-energy disturbance tests before cutting.

5. **Excavation and beneficiation**
   - Begin with sub-kilogram trials.
   - Expand to repeatable multi-kilogram runs.
   - Characterize different patches and feed grades.

6. **Metallurgical demonstration**
   - Process concentrates into coupons and small billets.
   - Measure composition, porosity and mechanical response.
   - Repeat enough batches to establish process variability.

7. **Endurance campaign**
   - Accumulate operating hours, tool wear and fault-recovery evidence.
   - Close the mass, energy and contamination balances.

8. **Passivation and approved end state**
   - Secure retained material and waste.
   - Isolate stored energy and propulsion systems.
   - Execute the licensed end-of-mission plan.

**No Earth sample return is baselined.** It would add a separate entry, containment and recovery system. However, if Phase 1 acceptance depends on laboratory measurements that cannot be credibly performed onboard, a sample-return augmentation must be decided before preliminary design review—not discovered at KDP-0B.

---

## 5. Physical configuration and resource budgets

### 5.1 Configuration

| Element | Preliminary specification |
|---|---|
| Launch-stowed spacecraft | Approximately **3–4 m diameter × 4–6 m high**, launcher-dependent |
| Deployed solar-array span | Approximately **30–45 m** |
| Solar-cell area | Approximately **250–350 m²** |
| Radiator configuration | Two or more articulated, independently isolatable panel groups |
| Robotic work arm | **3–5 m reach**, force/torque sensing |
| Excavation hood footprint | **1–2 m diameter** |
| Primary tool cutting width | **0.1–0.25 m** |
| Raw-feed buffer | **5–20 kg** working inventory |
| Furnace charge | **0.5–3 kg** metal-rich concentrate per batch |
| Waste capacity | Sized to retain **all processed feed not incorporated into product** |

The large deployed footprint strongly favours slow, quasi-static excavation rather than repeated hovering operations.

### 5.2 Preliminary mass allocation

Illustrative midpoint allocation; these are not vendor quotations.

| Subsystem | Reference allocation |
|---|---:|
| Primary structure, landing/contact frame and mechanisms | 900 kg |
| Electric propulsion hardware and tanks, excluding propellant | 500 kg |
| Solar arrays and deployment | 650 kg |
| Batteries and power electronics | 350 kg |
| Thermal control and radiators | 500 kg |
| Manipulation, anchoring and excavation | 700 kg |
| Beneficiation, furnace and product handling | 850 kg |
| Containment and retained-material containers | 650 kg |
| Avionics, navigation, communications and metrology | 300 kg |
| Harness, plumbing and miscellaneous integration hardware | 200 kg |
| **Current best-estimate dry mass** | **5,600 kg** |
| Preliminary design mass reserve | **1,400 kg** |
| **Reference dry mass** | **7,000 kg** |

The reference propellant allowance is **1.5–3 t**, subject to target selection, trajectory optimization and propulsion downselection.

### 5.3 Power architecture

- **60–80 kWe** solar arrays at 1 AU, beginning of life.
- Preliminary sizing allowance: **15–20%** for degradation, pointing losses and unavailable capacity.
- At 1.35 AU, available end-of-life power falls to approximately **26–37 kWe** before detailed thermal and operational adjustments.
- Consequently, full-rate processing is restricted to favourable power windows.

Representative loads:

| Load | Operating range |
|---|---:|
| Spacecraft housekeeping, navigation and communications | 2–4 kW |
| Excavation and handling | 2–6 kW average; higher short peaks |
| Screening and magnetic separation | 1–4 kW |
| Furnace | 15–30 kW |
| Inspection and coupon testing | 0.5–2 kW |
| Cruise electric propulsion | 35–55 kW |

Peak loads are scheduled rather than simply summed.

Use **30–60 kWh** of battery storage for safe-state entry, transient loads, brief shadowing and controlled process shutdown. The battery is not sized to operate the furnace through long asteroid nights. Local thermal inertia and a controlled freeze/shutdown procedure are required.

For interface relevance, use a **1–2 kV, current-limited industrial power demonstrator branch** between the main power system and processing equipment, with local isolated conversion. A short deployable tether can validate connectors and fault management without importing an entire industrial robot fleet.

### 5.4 Thermal rejection

Waste heat must be explicitly engineered; vacuum is not a cooling system.

Baseline:

- **40–70 m² effective warm-radiator area**, operating approximately **320–360 K**.
- **4–10 m² effective high-temperature radiator area**, approximately **450–550 K**, where component compatibility permits.
- Furnace insulation, radiation shields and dedicated heat-transfer paths.
- Thermal storage and operating interlocks for batch transients.

At 350 K, an unobstructed radiator with emissivity 0.85 radiates approximately **720 W/m² gross**. Solar loading, asteroid view factors, plumbing gradients and contamination reduce usable rejection. Initial warm-radiator design credit should therefore be closer to **300–550 W/m²**, pending detailed modelling.

A full-load heat balance must demonstrate rejection of approximately **30–45 kW** during the selected processing operating modes. The favourable endpoints of the area and temperature ranges cannot be combined arbitrarily.

---

## 6. Excavation, processing and product verification

### 6.1 Excavation and anchoring

Baseline toolset:

1. **Counter-rotating shallow cutter/auger pair** for regolith and weak aggregate.
2. **Low-force scoop/grapple** for loose fragments and diagnostic sampling.

Counter-rotation reduces torque but does not eliminate reaction forces. The load path is:

> Tool → local frame → distributed anchors/contact pads → asteroid.

Initial force-limited operation should use approximately **1–20 N commanded tool reaction**, expanded toward **50–100 N** only after site-specific holding capacity is established.

Anchoring options should remain open through scout characterization:

- Microspines for competent rough surfaces.
- Penetrators or screws for suitable granular material.
- Distributed contact pads with modest preload.
- Mechanical wrapping or grappling where local geometry permits.

Do not assume conventional “landing legs” provide an adequate mining foundation.

### 6.2 Closed beneficiation

Recommended sequence:

1. Meter feed from the acquisition enclosure.
2. Separate oversize particles.
3. Apply controlled mechanical agitation.
4. Recover ferromagnetic particles using adjustable magnetic gradients.
5. Reprocess selected middlings.
6. Transfer concentrate to sealed process cartridges.

**No gravity-fed chute is a critical dependency.** Use positive-displacement screws, pockets, brushes or mechanically constrained transfer paths.

Electrostatic separation may be carried as a removable experiment, but should not be on the primary success path.

### 6.3 Metallurgy

Baseline thermal process:

- Vacuum induction melting or another qualified electrically heated batch process.
- Approximately **1,600–1,850°C operating capability**, depending on alloy composition and process margin.
- Controlled solidification into simple moulds.
- Optional small hot-press/sintering experiment using the same characterized concentrate.

Preferred output forms:

- Small billets.
- Flat witness coupons.
- Tensile-test or bend-test specimens.
- Simple feedstock preforms for Phase 1 joining/manufacturing studies.

Do not attempt flight production of long wire, precision foil or finished swarm structures.

### 6.4 Throughput and energy targets

| Metric | Initial objective |
|---|---:|
| Instantaneous feed-handling rate | 1–5 kg/h |
| Effective metal-consolidation rate | 0.2–1 kg/h during active production |
| Furnace/process electrical energy | 8–25 kWh/kg consolidated metal |
| Total feed campaign | 300–1,000 kg |
| Total consolidated metal | 10–80 kg objective |
| Completed thermal batches | At least 20; objective 50–100 |
| Excavation operating time | At least 100 h; objective 300 h |

The feed grade and recovery assumptions yield approximately **9–128 kg recovered metal** over the full stated feed range. The narrower 10–80 kg product objective allows for commissioning material, sampling, incomplete processing and off-specification batches.

The energy figure above is an **experimental process target**, not an industrial cost assumption. Whole-mission energy per kilogram will be much higher because of standby loads and low utilization.

### 6.5 Product requirements

A Phase 1 customer must issue a material specification before final instrument selection.

Provisional demonstration requirements:

- **≥95 wt% Fe+Ni+Co** in consolidated product.
- Quantified S, P, C, O and relevant trace contaminants.
- **≤5% bulk porosity** for an agreed coupon class.
- Repeatable dimensions and mass.
- Mechanical-property measurements with stated uncertainty.
- Demonstration that selected product can be joined or formed by a Phase 1-relevant process.

These are preliminary research targets, **not proof that the material is suitable for arbitrary structural applications**. Sulfur, phosphorus and inclusions can dominate performance even when total metal purity is high.

Onboard verification should include:

- Feed and product imaging.
- Calibrated elemental analysis.
- Mass/volume-based density measurement.
- Electrical resistivity.
- Instrumented bending or miniature tensile testing.
- Ultrasonic or equivalent internal-defect inspection, if validated for the chosen geometry.

All destructive-test fragments remain contained.

---

## 7. Containment and environmental control

Containment is a primary mission objective, not housekeeping.

### 7.1 Architecture

Use nested barriers:

1. Surface-contact excavation hood with compliant perimeter features.
2. Internal baffles and ballistic particle traps.
3. Double-door transfer chambers.
4. Sealed beneficiation and furnace cartridges.
5. Dedicated retained-waste containers.

The surface hood is **not assumed hermetic**. An irregular, dusty asteroid surface makes that assumption unsafe.

The baseline uses mechanical collection rather than continuous gas flow, avoiding unnecessary consumables and a new source of particle acceleration.

Furnace vapours require cooler sacrificial collectors and filtered capture paths. Direct venting toward arrays, radiators, sensors or the surrounding environment is unacceptable.

### 7.2 Interim contamination requirement

Consistent with interim D-03, I recommend an initial engineering allocation of:

- **Uncontrolled solid release below 10⁻⁴ of handled mass over the campaign**, and
- No intentional release of tailings or test fragments.

For 300–1,000 kg handled, that corresponds to **30–100 g maximum uncontrolled solid release**.

This is **not a proposed universal legal threshold or an assertion of safety**. It is an initial design ceiling, subject to ALARP analysis, particle-population modelling, tests and licensing-state approval. Size distribution, velocity, chemistry and orbital persistence matter in addition to total mass.

A simple input/output scale balance cannot credibly verify such a small release fraction. Evidence must combine:

- Calibrated particle counters.
- High-speed local imaging.
- Witness collectors.
- Deposition monitors near sensitive surfaces.
- Ground-calibrated enclosure leakage models.
- Conservative upper bounds for unobserved particle sizes.

If measurement uncertainty exceeds the allocated release allowance, the mission cannot claim compliance merely because no plume was visible.

---

## 8. Guidance, autonomy and communications

### 8.1 Autonomy

Asteroid operations cannot depend on continuous real-time teleoperation.

Required onboard capabilities:

- Relative navigation and local terrain reconstruction.
- Contact-state estimation.
- Force-limited excavation.
- Anchor-slip and frame-motion detection.
- Jam detection and reversal.
- Thermal-process supervision.
- Particle-release detection.
- Autonomous isolation of damaged transfer paths.
- Safe retreat or mechanically stable shutdown.

Use a layered control system:

- Independent hardware protections.
- Deterministic safety controller.
- Validated task executive.
- Higher-level planning software operating only within approved envelopes.

Machine-learning perception may support classification and navigation, but should not be the sole barrier preventing uncontrolled excavation or material release.

### 8.2 Fault responses

A detected containment breach should trigger:

1. Stop cutting and material transport.
2. Close process transfer doors.
3. Place the furnace in a validated safe thermal state.
4. Maintain anchoring if it remains structurally safe.
5. Collect diagnostic imagery and particle data.
6. Await authorization before resuming.

“Immediately take off” is generally the wrong default: thruster plumes can worsen a release event.

### 8.3 Communications

Recommended equipment:

- X-band command and emergency telemetry.
- Ka-band high-rate science/engineering downlink.
- Approximately **1.5–2.5 m high-gain antenna**, subject to link analysis.
- **2–8 TB** onboard storage with radiation-tolerant fault management.

Planning data volume:

- **1–10 GB/day average returned data**.
- Larger local acquisition volumes during cutting and failure investigations.
- Downlink windows and achievable rates negotiated against distance and paid ground-network availability.

Optical communications are not required for mission success. DSN or commercial deep-space service must be contracted and budgeted.

---

## 9. Propulsion and delivery

### 9.1 Propellant decision

Follow interim D-05:

- **Cost iodine as the reference case.**
- **Maintain argon as the alternate.**
- Select neither until supply, life testing, storage, materials compatibility and mission performance close.
- Keep water EP outside the flight baseline unless a C-type target and a distinct requirement justify reconsideration.

The pathfinder should not become an uncontrolled demonstration of a new high-power thruster, new feed system and new mining plant simultaneously.

If iodine propulsion is not sufficiently mature, changing to a qualified alternative is preferable to forcing the mission to carry a propulsion technology-development burden.

### 9.2 Reference performance envelope

- Aggregate cruise EP input: **35–55 kW**.
- Candidate specific impulse: approximately **1,800–2,800 s**, technology-dependent.
- Useful mission Δv allocation: approximately **3–6 km/s**, contingent on launch injection and target.
- Separate proximity-control system selected for low contamination and controllable impulse.

For scale, a 50 kW thruster at 55% efficiency and 2,500 s specific impulse produces approximately **2.2 N** thrust. This is compatible with months-long transfers, not rapid local manoeuvring.

Launch procurement must specify a trajectory-dependent departure condition. “Payload to LEO” is not a sufficient delivery specification.

---

## 10. Manufacturing, verification and maintainability

### 10.1 Manufacturing strategy

Use established spacecraft buses, avionics and solar-array manufacturing where feasible. Concentrate novelty in:

- Excavation/contact interfaces.
- Closed material transfer.
- Vacuum metallurgy.
- Dust-tolerant mechanisms.
- Environmental metrology.

Flight process hardware should use replaceable cartridges and accessible test interfaces. Candidate refractory and wear materials require compatibility testing against representative Fe–Ni alloys and impurities; no crucible or coating material should be selected solely from terrestrial handbook performance.

### 10.2 Qualification programme

Essential tests include:

- Full-size tool testing over a broad cohesion and grain-size matrix.
- Thermal-vacuum cycling of dusty mechanisms.
- Vacuum furnace operation with representative meteoritic material or justified analogues.
- Long-duration seal, bearing and transfer-path wear tests.
- High-voltage arcing and leakage tests in dust-contaminated vacuum.
- Integrated radiative thermal testing.
- Fault-injected autonomy trials.
- Containment calibration across particle sizes and release velocities.

Short-duration reduced-gravity tests are useful but cannot establish months-long anchoring or dust behaviour. Combine them with instrumented contact models, hardware-in-the-loop simulation and ultimately the asteroid demonstration.

---

## 11. Development roadmap and readiness gates

Dates should be tied to programme authorization and target availability rather than an artificial fixed launch date.

| Stage | Indicative duration | Required result |
|---|---:|---|
| Mission definition and target/scout coordination | 12–18 months | Traceable objectives, candidate targets, preliminary licence path |
| Ground breadboards and process selection | 18–30 months, overlapping | Critical elements at TRL 4–5 |
| Preliminary design and integrated engineering model | 18–24 months | Closed mass/power/thermal budgets; target-qualified design |
| Detailed design, fabrication and qualification | 24–36 months | Flight readiness; qualified propulsion and containment hardware |
| Launch and transfer | 1–3 years | Successful rendezvous |
| Surface demonstration | 12–18 months | Relevant-environment evidence |
| Gate assessment | 6–12 months, partly overlapping | Independent technology and programme decision |

A credible planning interval is roughly **6–8 years from funded start to launch**, followed by transfer and surface operations. Scout results and launch opportunities can extend this.

### 11.1 Technology maturation claims

| Critical function | Likely entry readiness* | Required exit evidence |
|---|---:|---|
| Asteroid enclosed excavation | TRL 3–4 | Integrated relevant-environment demonstration |
| Native-metal beneficiation in microgravity | TRL 3–4 | Repeatable separation with measured recovery |
| Vacuum Fe–Ni consolidation | TRL 3–5 | Characterized product from actual asteroid feed |
| Containment and release monitoring | TRL 3–4 | Validated release bounds and fault response |
| Autonomous anchored operation | TRL 4–5 | Sustained operations and recovery demonstrations |

\*Initial engineering judgments, to be replaced by a formal TRL/AD² assessment.

Under D-02, **KDP-0B requires every project-ending technology at TRL 6 in a relevant environment, without waivers**.

This pathfinder is necessary but not automatically sufficient. Industrial-scale continuous handling, megawatt power distribution, cargo operations or production furnace lifetime may require additional evidence under other BOM items. If their scaling risks remain project-ending, the gate remains closed.

### 11.2 Four discriminating gates

- **Target:** sufficient accessible native metal and demonstrated excavation.
- **Demand:** signed Phase 1 material/purity/quantity/date specification.
- **Economics:** updated full-cost comparison with Earth-supplied material and other credible sources.
- **Licence:** acceptable operational, contamination and end-state authorization.

A technically successful pathfinder does not compel 0B investment.

---

## 12. Cost estimate and treatment of round-2 figures

### 12.1 Direct bom-0-12 cost

| Element | 2026 USD |
|---|---:|
| Spacecraft bus, structure and proximity systems | $180–320M |
| EP hardware, excluding separately procured propellant | $70–140M |
| Dedicated power, storage and thermal systems | $100–190M |
| Excavation, manipulation and anchoring | $100–200M |
| Beneficiation, furnace and product handling | $140–280M |
| Flight containment hardware and instrumentation | $80–170M |
| Avionics, autonomy implementation and communications hardware | $50–90M |
| Integrated assembly, test and flight acceptance | $150–250M |
| Product metrology and calibration hardware | $40–80M |
| **Direct item subtotal** | **$910–1,720M** |

These include item-specific engineering. They exclude shared technology-development campaigns separately carried under bom-0-11.

### 12.2 Attributable costs booked to other items

| Allocation | 2026 USD |
|---|---:|
| Shared NRE, ground R&D and qualification | $180–400M |
| Launch and departure delivery | $200–450M |
| Communications/ground-network services | $30–70M |
| Mission operations | $80–160M |
| Propellant procurement and handling | $5–25M |
| Independent debris/licensing support | $15–40M |
| Dedicated spares/test replacements | $30–60M |
| Allocated organizational support | $20–50M |
| **External-line allocation subtotal** | **$560–1,255M** |

Combined pre-reserve estimate: approximately **$1.5–3.0B**.

Carry approximately **$0.35–0.85B** under the programme contingency/reserve line at this maturity, producing a rounded **$1.9–3.8B attributable mission envelope**. This is not a formal confidence interval; uncertainties are correlated.

### 12.3 Assessment of the round-2 proposals

- **Claude: $1.5–4B.** Broadly consistent with an all-in mission envelope. The low endpoint is optimistic for the proposed integrated scope; the upper endpoint is credible if qualification or target-access costs grow.
- **Gemini: $1.8–2.5B.** Plausible for a favourable target and mature propulsion, but too narrow as the current full uncertainty range.
- **GPT: $0.6–1.5B hardware plus $0.3–0.9B delivery.** The upper hardware estimate is plausible. I disagree with using the low hardware endpoint for a fully integrated, containment-qualified system with in-flight product testing. Delivery must also distinguish launcher price from total departure-stage and mission-injection services.

The dominant cost uncertainties are target-driven redesign, dusty mechanism qualification, containment verification and propulsion maturity—not the purchase price of raw metal or solar cells.

### 12.4 0A versus 0B

This item is entirely **0A**.

No industrial plant, cargo fleet, receiving node or continuing production workforce is included. Pathfinder data analysis can continue after the gate, but any extended industrial-support role requires an explicit new allocation. Do not assume an aging experiment can become a production asset.

---

## 13. Principal risks

| Risk | Consequence | Primary mitigation |
|---|---|---|
| Metal present but not recoverable as native grains | No viable feedstock | Scout mineralogy and small-scale recovery evidence before design freeze |
| Surface cannot sustain tool loads | Acquisition fails | Distributed anchoring, low-force tools, multiple local sites |
| Dust jams transfers or degrades thermal surfaces | Early loss of capability | Closed transfers, sacrificial traps, redundant isolation |
| Furnace yields brittle or contaminated metal | Product unusable | Impurity screening, multiple process windows, onboard tests |
| Emissions cannot be measured adequately | Licence or gate failure | Calibrated particle instrumentation and conservative upper bounds |
| Industrial scale-up remains unproven | TRL 6 claim insufficient | Representative components and explicit scale-up qualification plan |
| EP life or propellant supply fails | Launch delay or unreachable target | Early life tests and retained alternate propulsion branch |
| Autonomous contact operations are unstable | Asset or target interaction hazard | Hardware safing, slow commissioning, validated force limits |
| Phase 1 demand changes | No industrial business case | Maintain demand gate; preserve Earth-supply fallback |
| Cost growth consumes broader 0A | Programme imbalance | Staged funding and independent descoping/termination reviews |

**Loss of the mission must not strand a 0B production commitment.** Long-lead industrial procurement should remain gated accordingly.

---

## 14. Open engineering questions

The highest-value unresolved questions are:

1. **Which asteroid actually offers accessible native Fe–Ni rather than merely a metal-rich remote signature?**
2. What feed-grade uncertainty is acceptable before committing to the flight furnace?
3. Which anchor/tool combination works across the measured surface-property distribution?
4. Can containment performance be bounded at the required level under real excavation conditions?
5. Which impurities control the Phase 1 material specification?
6. Can onboard testing support material acceptance, or is sample return indispensable?
7. Does induction melting remain preferable after accounting for concentrate morphology, crucible contamination and microgravity melt handling?
8. Which process features can legitimately reach TRL 6 at pathfinder scale, and which require larger demonstrations?
9. Can iodine propulsion meet life, compatibility and supply requirements on the mission schedule?
10. What end state minimizes long-term release risk without depending on indefinite active control?

## Bottom line

Fund a **single, substantial, instrumented asteroid process demonstrator**, not a symbolic scoop experiment and not a prematurely industrial factory.

The programme should purchase three defensible results:

1. **A measured resource-to-product process at the actual target.**
2. **A credible containment and environmental case.**
3. **Enough operational and material data to accept—or reject—0B without waivers or sunk-cost pressure.**

If native-metal processing fails, the mission can still succeed as a capability programme by establishing that result rigorously and directing Phase 1 toward Earth-supplied material rather than an unjustified industrial commitment.