---
bomId: "bom-0-11"
itemName: "NRE, Ground R&D and Qualification"
itemSlug: "nre-qualification"
modelId: "gpt-6-1-sol"
modelName: "GPT-6.1 Sol"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-11 — NRE, Ground R&D and Qualification

## 1. Recommendation and scope

**Authorize a staged 0A engineering and qualification programme, not the development of an industrial plant by default.** Its purpose is to establish whether a specific asteroid-to-Phase-1 material supply chain can be licensed, operated autonomously and qualified at an acceptable cost and risk.

My recommended planning allowance is:

| Programme element | Recommended range | Planning point |
|---|---:|---:|
| **0A: NRE, ground R&D, facilities and qualification** | **$3.9–6.6B** | **$5.2B** |
| **Conditional 0B: production-configuration NRE and qualification** | **$2.1–3.8B** | **$2.9B** |
| Combined, only if 0B proceeds | $6.0–10.4B | $8.1B |

**Cost basis:** constant FY2026 USD; direct engineering labour, test articles, dedicated ground facilities, purchased laboratory services and qualification campaigns. These are concept-level planning ranges, not statistical confidence intervals or vendor quotations. Programme contingency, launch, flight pathfinder hardware, industrial flight hardware and operational staffing are excluded and belong to their respective BOM lines.

The central technical recommendation is:

> Qualify a modular, enclosed, dry-processing chain for native Fe-Ni at the target NEA, with beneficiation before thermal processing, and shipment of mechanically restrained product units to a reference SEL1 receiving interface.

Do not make oxide reduction, solar-grade silicon, production water extraction, cryogenic propellants or crew accommodation prerequisites for this programme.

### What this line buys

- Product and interface requirements.
- Engineering design and analysis.
- Critical-technology breadboards and engineering models.
- Dedicated ground test infrastructure.
- Qualification and destructive-test articles.
- Material characterization and process-development campaigns.
- Relevant-environment test methods and evidence.
- Flight-test requirements, instrumentation design and post-flight correlation.
- Configuration-controlled qualification records supporting the 0B decision.

### What it does not buy

| Excluded expenditure | Owning BOM line |
|---|---|
| Survey/scout flight spacecraft | bom-0-1 |
| Production robots, plant, tugs and power hardware | bom-0-2 through -5 |
| Conditional water-pilot development | bom-0-6 |
| Corporate/programme infrastructure and general governance | bom-0-7 |
| Launch and delivery | bom-0-8 |
| Operational ground stations and communications services | bom-0-9 |
| Routine mission operations | bom-0-10 |
| Flight pathfinder fabrication, integration and flight execution | bom-0-12 |
| SEL1 receiving-node flight equipment | bom-0-13 |
| Operational spares | bom-0-14 |
| Programme-wide debris modelling, licensing evidence and dedicated contamination-control development | bom-0-15 |
| Operational EP propellant and supply infrastructure | bom-0-16 |
| Programme contingency and management reserve | bom-0-17 |

NRE engineers will support those items, but their hours must be charged once. Every development contract should identify whether design engineering and qualification are included here or embedded in the equipment contract.

---

## 2. Design philosophy

### 2.1 Qualify the supply chain, not isolated laboratory achievements

A successful separator test does not demonstrate an operable mine. A successful furnace test does not establish that feed can be acquired, retained, metered, processed and packaged in microgravity.

The qualification architecture must connect:

```text
Characterized target material
          |
          v
Excavation / acquisition --> Reaction-force management
          |
          v
Enclosed transfer --> Size conditioning --> Beneficiation
          |                                  |
          |                                  v
          |                         Native Fe-Ni concentrate
          |                                  |
          |                                  v
          |                       Consolidation / refining
          |                                  |
          v                                  v
Retained residue                    Certified product units
                                             |
                                             v
                                Tug restraint / transport
                                             |
                                             v
                                  Phase 1 receiving interface

Cross-cutting:
Power + heat rejection + autonomy + metrology + containment
```

### 2.2 Use the least ambitious process that meets signed demand

The initial process hierarchy should be:

1. Mechanical liberation and classification.
2. Magnetic or other dry physical beneficiation.
3. Cold or warm compaction where acceptable.
4. Sintering or melting only where required by the receiving process.

**Do not assume that every kilogram must be melted at the asteroid.** If Phase 1 accepts certified compacted Fe-Ni feedstock, avoiding a full melt can reduce power, radiator area and process complexity. Conversely, unsintered briquettes must not be accepted if they fragment during handling.

The product form must therefore be selected jointly with Phase 1 before final process qualification.

### 2.3 Put irreversible decisions late

- Lease or adapt existing facilities before building new ones.
- Start with replaceable process cartridges.
- Develop one reference process and one fallback—not three complete competing plants.
- Fund long-duration EP tests early because their elapsed time cannot be compressed.
- Require decisive flight evidence where Earth testing cannot reproduce the relevant physics.
- Keep the industrial-scale procurement decision behind KDP-0B.

---

## 3. Design and test assumptions

These are **proposed engineering assumptions**, not approved Phase 0 requirements.

| Parameter | Qualification basis |
|---|---|
| Initial industrial sizing reference | 1,000 t/year delivered Fe-Ni product |
| Sensitivity envelope | 600–2,500 t/year; actual 0B size set by signed demand |
| Reference receiving location | SEL1, provisional under D-04 |
| Product | Native/reduced Fe-Ni feedstock; chemistry and form set by Phase 1 |
| Processing location | Target NEA |
| Crew | None |
| Cargo propulsion | 1.0–2.5 MWe per tug |
| Propellant comparison | Iodine reference, argon alternate; neither selected |
| Robot distribution power | 1–3 kV DC tether |
| Robot batteries | 10–50 kWh each |
| Site storage studies | 0.5–15 MWh architecture envelope; not a procurement quantity |
| Design cost basis | FY2026 USD |
| Programme timing | Relative to funded authority to proceed |

### 3.1 Throughput normalization

For an illustrative **1,000 t/year delivered-product commitment**, assume:

- 8,000 scheduled operating hours/year;
- 80% achieved operating availability;
- 95% acceptance and delivery yield after primary production.

Required process output while operating is:

\[
\dot m_p =
\frac{1{,}000{,}000}
{8{,}000 \times 0.80 \times 0.95}
\approx 164\ {\rm kg/h}
\]

For feed metal fraction \(f_m\) and recovery \(R\):

\[
\dot m_f=\frac{\dot m_p}{f_mR}
\]

At \(f_m=0.30\) and \(R=0.80\), feed demand is approximately **680 kg/h**. At \(f_m=0.10\), it becomes approximately **2,050 kg/h**.

This is a major design discriminator: target composition can change excavation, residue handling and power requirements by severalfold.

The NRE programme should therefore qualify **unit operations across feed variability**, not claim that one nominal regolith simulant represents an asteroid.

---

## 4. Ground development and qualification architecture

### 4.1 Recommended facilities

The dimensions below are preliminary facility specifications, to be refined after a survey of existing infrastructure. Chamber mass and foundation loads are procurement-design outputs, not yet defensible estimates.

| Facility | Quantity | Preliminary specification | Principal purpose |
|---|---:|---|---|
| Materials and vacuum-process laboratories | 2 laboratory suites | Gram-scale through 10–50 kg batches; vacuum furnaces; chemical, particle and metallographic analysis | Feed variability, thermochemistry, contamination and product qualification |
| Enclosed granular-handling testbeds | 2 | Approximately 3–5 m working dimension; 0.1–2 t simulant inventory; 10–100 kg engineering test articles | Acquisition, metering, transfer, jams and restart |
| Integrated process pilot | 1 reconfigurable line | 50–500 kg/h feed; approximately 10–100 kg/h product depending on feed; 0.3–1.5 MW installed electrical service | Process integration, wear, heat balance and maintainability |
| Mining/contact-dynamics rig | 1 | Approximately 10 × 10 m work area; force-controlled suspension and target emulators; 0.1–2 t equipment accommodation | Contact dynamics, anchoring and reaction-force control |
| HV power and dusty-vacuum laboratory | 1 | 1–3 kV nominal; up to 1 MW configurable electrical loading; representative tether segments | Arcing, insulation degradation, connectors and protection |
| EP endurance infrastructure | 2–4 cells/channels | Approximately 50–300 kW per operating channel; pumping specified separately for iodine and argon | Thruster life, feed systems, erosion and plume effects |
| Thermal-control test capability | 1 adapted facility | 50–250 kW thermal rejection test sections; 5–30 m² radiator panels | Thermal interfaces, deployment, contamination and degradation |
| Hardware-in-the-loop integration facility | 1 | Approximately 20–60 compute/interface nodes; network and power fault injection | Autonomous operations and integrated fault recovery |
| Shared environmental qualification services | Purchased access | Vibration, acoustic, shock, thermal-vacuum and EMC | Qualification of flight-representative configurations |

**Important limitation:** the process pilot cannot economically be operated inside a single chamber that perfectly reproduces all flight conditions. Qualification must combine smaller high-fidelity vacuum tests, larger functional tests, validated models and flight evidence.

### 4.2 Low-gravity validation

Earth-based gravity offload is useful for controller development, but it does **not** reproduce:

- Grain trajectories and cohesion.
- Free-surface melt behaviour.
- Anchoring in weak, heterogeneous material.
- Residue migration.
- Thermal contact changes under low confinement.

The programme should use:

- Drop-tower tests for short transients.
- Parabolic flight for seconds-scale handling and contact experiments.
- Vacuum tests for adhesion, outgassing and process behaviour.
- Numerical discrete-element models calibrated against experiments.
- Space experiments under bom-0-12 for sustained microgravity effects.
- Target-specific scout measurements under bom-0-1.

An orbital experiment can demonstrate microgravity processing. It cannot, by itself, validate anchoring on an uncharacterized NEA.

---

## 5. Subsystem development specifications

### 5.1 Acquisition, anchoring and feed handling

Develop **two acquisition concepts initially**, then down-select after comparative testing.

Recommended features:

- Enclosed intake wherever practical.
- Low cutting and reaction forces.
- Torque and force sensing at the tool.
- Recoverable anchoring or bracing.
- Positive-displacement transfer rather than gravity-fed hoppers.
- Isolation valves or gates between process stages.
- Jam clearance without releasing material.

Proposed test envelope:

- Loose fines through coherent fragments.
- Particle sizes approximately **10 µm to 100 mm**, with larger fragments handled by a separate breaker or rejection path.
- Tool contact forces approximately **10–1,000 N**.
- Instrumentation resolving approximately **1 N** and **0.1 N·m** on precision test axes.
- At least **1,000 autonomous jam/recovery cycles** across the campaign, including deliberately introduced off-nominal material.

These ranges are experimental envelopes, not claims about the selected asteroid.

### 5.2 Beneficiation

Prioritize magnetic separation where mineralogy supports it, with size classification and electrostatic methods evaluated as supporting processes.

Measure:

- Metal recovery.
- Product grade.
- Specific energy.
- Wear and consumable loss.
- Susceptibility to fines accumulation.
- Downstream product quality.
- Containment performance.

An initial development target is **70–90% recovery of accessible native metal**, but the commercial decision must use measured recovery distributions, not the upper end of that range.

### 5.3 Consolidation and metallurgy

Develop three process coupons in parallel, then choose the minimum necessary process:

1. Cold-compacted product.
2. Thermally bonded or sintered product.
3. Melt-consolidated product.

Indicative thermal envelope:

- Warm compaction/sintering investigations: **700–1,300°C**.
- Fe-Ni melting trials: approximately **1,400–1,650°C**, composition dependent.
- Batch scale: **0.1–50 kg** initially.
- Integrated pilot product: approximately **10–100 kg/h**, feed dependent.

A preliminary process-energy allowance is **1–5 kWh/kg of consolidated product**, excluding excavation and some balance-of-plant loads. At 164 kg/h this implies roughly **0.16–0.82 MW** for the relevant process equipment.

This is a test hypothesis. Thermal losses, poor feed grade and repeated reheating can make actual energy materially worse.

### 5.4 Thermal rejection

Radiator development is mandatory.

For a radiator:

\[
Q \approx \epsilon\sigma A(T^4-T_{\rm background}^4)
\]

At emissivity 0.85, idealized radiating-surface flux is approximately:

- **1.24 kW/m² at 400 K**.
- **3.01 kW/m² at 500 K**.

Thus rejecting 1 MW requires approximately **810 m² at 400 K** or **330 m² at 500 K**, before installation, degradation, view-factor and operating margins.

Here, area means effective emitting surface; a two-sided panel may have different projected area.

NRE must establish:

- Which waste heat can reach high-temperature radiators.
- What remains on lower-temperature electronics loops.
- Dust deposition and cleaning performance.
- Freeze/thaw and restart behaviour.
- Leak isolation and graceful degradation.
- Pump and working-fluid lifetime.

Do not size radiators by assuming all process waste heat is available at furnace temperature.

### 5.5 HV tether and storage interfaces

Qualification basis:

- **1–3 kV DC** nominal operation.
- Representative tether lengths **50–300 m**.
- Approximately **20–150 kW** branch loads for mobile equipment.
- **10–50 kWh** battery-interface envelope.
- Controlled fault interruption, precharge and energy discharge.
- Vacuum-compatible insulation and connectors.
- Dust-tolerant cable management.
- Replacement without exposed energized contacts.

Vacuum voltage withstand alone is insufficient. Testing must cover outgassing transients, dust films, damaged insulation, connector wear and arc propagation.

### 5.6 MW-class EP

Do not build a complete multi-megawatt ground endurance facility merely to reproduce tug nameplate power.

Instead:

1. Qualify representative thruster modules.
2. Qualify shared feed and electrical interfaces.
3. Demonstrate multi-module interaction at achievable ground scale.
4. Validate spacecraft plume, thermal and structural models.
5. Confirm critical interactions in flight.

Provisional development envelope:

- Thruster module: **50–250 kW**.
- Tug cluster: **1.0–2.5 MWe**.
- Life-test objective: **20,000–40,000 powered hours**, revised after trajectory and duty-cycle definition.
- Representative specific impulse trade space: **2,000–5,000 s**.
- Effective exhaust velocity: approximately **20–49 km/s**.

At 60% efficiency and 30 km/s exhaust velocity:

\[
F=\frac{2\eta P}{v_e}
\]

A 1 MW system produces approximately **40 N**, not kilonewtons. Qualification and mission analysis must use the same thrust, efficiency, propellant-flow and lifetime assumptions.

Iodine testing needs heated feed hardware, deposition control and materials compatibility. Argon needs cryogenic or other credible storage/feed analysis and appropriate facility pumping. Existing xenon heritage does not automatically qualify either option.

---

## 6. Autonomy, controls and communications

### 6.1 Control architecture

```text
Ground planning and engineering support
                |
      Delay / outage emulator
                |
Mission executive and resource scheduler
                |
       Safety-supervised autonomy
        /          |           \
 Mining cells  Process cells   Power/thermal
        \          |           /
          Independent protection
```

Recommended control partition:

- Hardware protection: microseconds to milliseconds where required.
- Equipment control: approximately **1–100 ms**.
- Process supervision: approximately **0.1–10 s**.
- Site scheduling: seconds to hours.
- Ground intervention: asynchronous; never required for immediate equipment safety.

Communications tests should span **near-zero to 40-minute one-way delay** and outages of **hours to 30 days**, with the final environment derived from target ephemerides and link design.

Qualification scenarios must include:

- Loss of commanding during a thermal cycle.
- Tether fault during excavation.
- Blocked transfer path.
- Sensor disagreement.
- Partial radiator loss.
- Product that fails acceptance tests.
- Tug arrival outside its planned window.
- Corrupted or stale task plans.

The system must be able to stop acquisition, isolate stored electrical energy, retain material and preserve a restartable process state without contacting Earth.

### 6.2 Software evidence

Require:

- Versioned training and test datasets where learned perception is used.
- Independent fault injection.
- Reproducible scenario replay.
- Explicit operating-domain limits.
- Separation between optimization software and safety functions.
- Configuration-controlled ground/flight model correlation.

Machine learning may support perception and planning; deterministic protection must enforce thermal, electrical, motion and containment limits.

---

## 7. Technology readiness and qualification

### 7.1 T01–T26 re-baseline

The authoritative T01–T26 definitions were not supplied. The following is a **proposed working crosswalk**, not a claim about the existing register. The first 90 days should reconcile these entries with the controlled programme register.

Starting TRLs must be established by evidence review; numerical inheritance from unrelated terrestrial or xenon-based equipment is not acceptable.

| Working ID | Technology/evidence package | Required relevant-environment evidence |
|---|---|---|
| T01 | Target material interpretation | Scout measurements tied to material-property uncertainty |
| T02 | Representative feedstock models | Physical and chemical bounds supported by observations |
| T03 | Acquisition tools | Representative material, vacuum and reaction-force conditions |
| T04 | Anchoring/bracing | Target-relevant mechanics and recoverability |
| T05 | Enclosed material transfer | Sustained low-gravity transfer and retention |
| T06 | Size reduction/classification | Wear, jams, fines and feed variability |
| T07 | Magnetic beneficiation | Recovery and grade over representative feed |
| T08 | Alternate dry beneficiation | Only if required by the selected process |
| T09 | Concentrate metering | Stable feed without gravity-dependent assumptions |
| T10 | Consolidation/metallurgy | Sustained microgravity evidence for critical process physics |
| T11 | Product metrology | Correlation with independent laboratory assays |
| T12 | Product handling/restraint | Transport and receiving-interface loads |
| T13 | Residue containment | Validated release models and measured leakage |
| T14 | Solar-array electrical interfaces | Mission-relevant voltage, thermal and degradation conditions |
| T15 | HV distribution/tethers | Dust, vacuum, damage and fault interruption |
| T16 | Battery and storage integration | Mission duty cycles and fault containment |
| T17 | Process heat transport | Representative temperatures, fluids and transients |
| T18 | Radiators | Deployment, contamination, degradation and heat rejection |
| T19 | EP thruster module | Propellant-specific performance and life evidence |
| T20 | EP feed/storage | Propellant compatibility and operating transients |
| T21 | EP clustering/plumes | Interaction tests and correlated spacecraft models |
| T22 | Autonomous mining/process control | Long-duration faulted operation |
| T23 | Navigation/proximity operations | Representative dynamics, sensing and latency |
| T24 | Robotic servicing | Representative failed-unit removal and replacement |
| T25 | Communications/outage management | End-to-end delay, outage and recovery tests |
| T26 | Integrated production chain | Relevant-environment demonstration with accepted product |

A technology can be declared noncritical only by changing the controlled architecture to remove its mission-ending dependency—not by relabelling it.

### 7.2 Readiness rules

Consistent with D-02:

- Internal 0A milestones: **TRL 4–5**.
- KDP-0B: **every project-ending technology at TRL 6 in a relevant environment, without waivers**.
- Record AD² or equivalent advancement-difficulty assessments alongside TRL.
- Do not average readiness across subsystems.
- TRL 6 does not substitute for lifetime qualification or production acceptance testing.

For critical microgravity processes, a ground-only evidence package will not suffice.

### 7.3 Campaign requirements

Proposed minimum development evidence, subject to final tailoring:

- **1,000–3,000 hours** integrated ground-pilot operation.
- **200–500 hours** longest continuous ground process campaign.
- **100–300** process start/stop cycles.
- **2–3 independent test articles** for selected life-limiting mechanisms.
- **20,000–40,000 powered hours** on representative EP endurance articles where mission life demands it.
- Flight operation long enough to expose thermal equilibrium, accumulated contamination and repeated handling—not a single successful batch.

A four-year calendar test yields only about 28,000 powered hours at 80% utilization. Long-life EP testing therefore belongs near the beginning of 0A.

---

## 8. Manufacturing and test-article strategy

### 8.1 Article quantities

| Article class | 0A quantity | Conditional 0B quantity |
|---|---:|---:|
| Unit-operation breadboards and rigs | 15–25 | 3–8 major upgrades |
| Integrated process engineering models | 2 | 1–2 production-representative models |
| Mining/handling engineering models | 3–5 | 2–4 qualification configurations |
| EP module test articles | 6–10 | 4–8 production-configuration articles |
| Power/thermal qualification assemblies | 6–12 | 4–8 |
| Integrated autonomy/HIL environments | 1 primary plus backup capability | Production-software extension |
| Critical material/process coupon sets | Hundreds to thousands | Lot-specific and design-change sets |

These are engineering articles, not the operational robot fleet or tug fleet.

### 8.2 Manufacturing policy

- Use replaceable wear liners and process cartridges.
- Qualify more than one supplier for mission-ending components where practical.
- Maintain traceability for hot-zone materials, insulation and propellant-wetted parts.
- Inspect additive-manufactured critical hardware using process-specific acceptance plans.
- Do not assume terrestrial lubricants, seals or powder-handling components are vacuum compatible.
- Use common interfaces, but retain configuration-specific qualification evidence.

Qualification must cover the as-built manufacturing process. A hand-finished laboratory article is not sufficient evidence for a differently manufactured production unit.

---

## 9. Development roadmap and gates

Indicative 0A duration is **7–10 years**, driven by target access, flight evidence and endurance testing. This is not a promised production date.

| Stage | Indicative timing | Main outputs |
|---|---|---|
| Requirements and evidence audit | Months 0–9 | Controlled architecture, T01–T26 reconciliation, facility survey, product-specification draft |
| Discriminating laboratory research | Months 6–30 | Feed/process down-selection; early EP tests; TRL 4 evidence |
| Integrated ground engineering | Months 18–54 | Pilot operations, autonomy integration, thermal and HV qualification |
| Relevant-environment demonstrations | Months 36–84 | Pathfinder evidence, target correlation, TRL 5–6 closure |
| KDP-0B preparation | Approximately years 6–10 | Independent evidence review and four discriminating gates |
| Conditional 0B qualification | Approximately 3–5 years after authorization | Production-configuration qualification and manufacturing readiness |

### Required 0B gate package

1. **Target:** measured resource and mechanical properties support the selected process and production rate.
2. **Demand:** signed Phase 1 specification covers quantity, chemistry, product form, acceptance tests, location and delivery dates.
3. **Economics:** updated life-cycle comparison against Earth-supplied material and other credible alternatives.
4. **Licence:** accountable licensing state and an acceptable debris/contamination case.
5. **Technology:** all project-ending technologies meet TRL 6 without waivers.
6. **Programme:** credible schedule, supply chain, launch/delivery plan, EP propellant supply and funded reserves.

If any mandatory gate fails, retain research assets and stop industrial commitment. Under D-01, that is an intended programme outcome, not necessarily a programme failure.

---

## 10. Cost estimate and comparison with round 2

### 10.1 Bottom-up planning allocation

**Billions of FY2026 USD; excludes programme reserve.**

| Work package | 0A | Conditional 0B |
|---|---:|---:|
| Systems engineering, requirements, interfaces and qualification evidence | 0.40–0.65 | 0.20–0.35 |
| Acquisition, anchoring and granular handling development | 0.40–0.70 | 0.20–0.40 |
| Beneficiation, metallurgy and product qualification | 0.65–1.15 | 0.35–0.65 |
| HV power, storage interfaces and thermal-control development | 0.40–0.70 | 0.25–0.45 |
| EP propulsion engineering and endurance qualification | 0.65–1.05 | 0.40–0.70 |
| Autonomy, software assurance and HIL integration | 0.30–0.50 | 0.15–0.25 |
| Dedicated ground facilities and major modifications | 0.65–1.10 | 0.15–0.30 |
| Cross-system environmental campaigns and independent verification | 0.45–0.75 | 0.40–0.70 |
| **Total** | **3.90–6.60** | **2.10–3.80** |

Package-specific test rigs and articles are included in their development packages. The facilities line covers shared buildings, chambers, utilities and major modifications. The cross-system campaign line covers integrated qualification, not repeated charging of package-level tests.

### 10.2 Estimate basis

The estimate assumes:

- Approximately **7,000–11,000 direct engineering and technical staff-years** during 0A.
- Blended fully burdened direct technical labour of approximately **$220,000–300,000 per staff-year**.
- Extensive reuse of existing environmental facilities.
- One integrated ground process pilot.
- One principal flight-validation architecture funded under bom-0-12.
- No wholesale restart after final process down-selection.
- No water-production qualification within this item.

General organization costs remain in bom-0-7; direct technical labour belongs here.

### 10.3 Where I disagree with round 2

- **Claude’s $3.5–10B NRE range:** too broad unless its phase boundaries and facility inclusions are defined. The lower end is plausible for a constrained 0A; the upper end is plausible for 0A plus substantial 0B.
- **A separate $0.5–1.5B ground-facilities addition:** broadly credible, but it must not be added to an NRE figure that already includes those facilities. My **$0.65–1.10B** 0A facility allowance is included.
- **Gemini’s $4.5–7.5B:** reasonable as a 0A planning envelope, but insufficiently explicit about production-configuration qualification after the gate.
- **GPT’s $4–8B 0A plus $2–5B 0B:** closest to the required scope structure. My range is somewhat lower because I exclude water, avoid a full-power MW thruster endurance chamber and insist on facility reuse. Those upper values remain credible exposure if facilities must be built new or the process changes late.

The ranges should not be interpreted as P50/P80 estimates. A probabilistic estimate requires a facility survey, supplier quotations, a reconciled work breakdown structure and a schedule-risk model. Reserve belongs in bom-0-17.

---

## 11. Principal risks and mitigations

| Risk | Consequence | Primary mitigation / decision |
|---|---|---|
| Target contains too little accessible native metal | Feed and power requirements become excessive | Scout characterization and target gate before industrial design freeze |
| Ground tests misrepresent low gravity | Unstable transfer or processing in flight | Mandatory relevant-environment demonstrations |
| Product misses Phase 1 needs | Technically successful but unusable output | Signed material specification before final qualification |
| Melt handling proves unreliable | Product quality or containment failure | Qualify compacted/sintered alternatives; Earth-supplied fallback |
| Iodine or argon EP life is inadequate | Transport architecture fails | Early parallel tests; no propellant selection before evidence |
| Dust causes HV faults | Site outages and equipment damage | Dusty-vacuum fault testing and sectionalized distribution |
| Wear exceeds servicing capability | Availability collapses | Life tests, replaceable cartridges and robotic maintenance demonstrations |
| Heat rejection is underestimated | Throughput falls below commitment | Measured process heat balance and radiator correlation |
| Shared facilities contaminate tests | Invalid results or costly refurbishment | Separate iodine, metallurgy and cleanliness-critical test infrastructure |
| Automated recovery releases material | Licensing failure or environmental harm | Independent containment protection and fault-injection campaigns |
| Development scope grows into industrial procurement | Premature irreversible expenditure | Controlled 0A/0B boundary and independent gate review |

For debris and contamination, D-03 is an interim **ALARP requirement with an interim design ceiling**. This proposal does not invent a final permissible release number. bom-0-15 must supply the controlled ceiling, particle-size basis, accounting boundary and measurement-confidence requirement; bom-0-11 must demonstrate compliance through tests.

---

## 12. Open engineering questions

The highest-priority unresolved questions are:

1. **What exactly will Phase 1 accept?** Compacted feedstock, sintered billets and cast ingots imply different plant and receiving-node architectures.
2. **What target properties are sufficiently observable before commitment?** Native-metal abundance alone is not enough; liberation, cohesion and fragment size matter.
3. **Can enclosed transfer and residue retention remain reliable over thousands of cycles in low gravity?**
4. **Is melting actually necessary at the asteroid?**
5. **What useful-life evidence is sufficient for the selected EP architecture?** Endurance tests, erosion models and mission duty cycles must agree.
6. **Can iodine infrastructure be qualified without disproportionate materials and contamination penalties?**
7. **What fraction of process heat can be rejected at elevated temperature?**
8. **What servicing actions can be completed after a real failure rather than a prepared demonstration?**
9. **What evidence will the licensing state accept for cumulative particulate release?**
10. **At what economics threshold does the programme stop at capability demonstration and use Earth-supplied material?**

## Bottom line

**Fund a bounded, evidence-led 0A at a planning point of $5.2B, with industrial 0B NRE held as a separate $2.1–3.8B real option.** Start materials characterization, EP endurance testing, contained granular handling and Phase 1 product-definition work first.

The decisive deliverable is not a large ground factory. It is a configuration-controlled evidence package showing that a particular target, process, transport system and receiving customer form a qualified and licensable supply chain—or establishing early and credibly that they do not.