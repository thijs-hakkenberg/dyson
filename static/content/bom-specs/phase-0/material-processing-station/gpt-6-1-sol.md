---
bomId: "bom-0-3"
itemName: "Processing Plant at the Target NEA"
itemSlug: "material-processing-station"
modelId: "gpt-6-1-sol"
modelName: "GPT-6.1 Sol"
generated: "2026-10-20"
phase: "phase-0"
---

# Technical proposal: bom-0-3 — Processing Plant at the Target NEA

**Recommended configuration:** One uncrewed, modular asteroid-side plant producing qualified native Fe–Ni alloy through enclosed beneficiation, short-arm centrifugal melting, filtration, and casting.

**Planning capacity:** Approximately **1.0–1.2 kt/year of accepted product**, supporting approximately **1 kt/year delivered to Phase 1**, subject to the target, customer, transport, economics, and licensing gates.

**Indicative delivered plant mass:** **270–450 t**, excluding mining robots, site generation/storage, cargo tugs, delivery vehicles, and the site-wide tailings repository.

**Indicative bom-0-3 acquisition cost:** **$4–8B in constant 2026 USD**, excluding separately budgeted NRE, pathfinders, launch/delivery, operations, replacement spares, and programme contingency.

**Confidence:** Low for acquisition cost and mass; low-to-moderate for preliminary engineering sizing. Industrial performance remains unproven.

All numerical requirements below are **proposed engineering baselines**, not approved programme requirements or demonstrated capabilities.

---

## 1. Recommendation and design philosophy

### 1.1 What this plant should—and should not—do

Build a **narrow-purpose metal-production system**, not a general asteroid refinery.

The plant should:

1. Receive excavated material from bom-0-2.
2. Liberate and concentrate native metal in enclosed equipment.
3. Recover Fe–Ni through melting, coalescence, filtration, and controlled casting.
4. Qualify, package, and berth product for bom-0-4 cargo tugs.
5. Immobilize and transfer every reject stream into controlled storage.
6. Operate without crew or continuous Earth supervision.

It should **not** include:

- Solar-grade silicon production.
- Oxide-derived aluminium or silicon production.
- Production LOX/LH₂.
- An assumed asteroid-derived propulsion supply.
- A habitat or crew-visiting capability.
- A central ore-processing station at SEL4/L5.
- A production carbonyl refinery or hydrogen-reduction line unless a later, separately gated architecture decision selects one.

The plant remains at the selected NEA. **SEL1 is the interim receiving destination, not the processing location.**

### 1.2 My principal architectural choices

**A. Select the target for the process, not merely for accessibility.**  
The reference plant requires accessible, physically liberatable native metal. A spectrally attractive asteroid is insufficient: the decision needs measured metal abundance, mineral associations, contaminants, liberation energy, mechanical properties, and representative variability.

**B. Use short-arm rotating cartridges—not a station-wide rotating structure.**  
Artificial gravity belongs inside replaceable process modules. A 50 m arm is not justified for this uncrewed duty.

**C. Do not assume melting is chemical refining.**  
Melting and filtration can separate metal from gangue; they do not reliably remove dissolved sulphur, phosphorus, carbon, or undesirable alloying elements. Target acceptance and customer specifications must close that gap.

**D. Qualify one production route before committing to 0B.**  
Investigate carbonyl and hydrogen-reduction alternatives during 0A, but do not procure three industrial flowsheets “for flexibility.”

**E. Treat containment, maintenance, and solids handling as primary process technologies.**  
These are at least as consequential as furnace performance.

**F. Scale to signed demand.**  
The figures below describe a roughly 1 kt/year delivered configuration. They are not authority to build that capacity without a customer.

---

## 2. Design basis and operating envelope

| Parameter | Proposed reference | Preliminary envelope / basis |
|---|---:|---|
| Quantity | 1 plant | Modular installation; no second site assumed |
| Location | Selected NEA | Target and installation point determined during 0A |
| Receiving destination | SEL1 | Interim D-04 assumption |
| Excavated feed capability | 12,000 t/year | Approximately 8,000–20,000 t/year for coupled target/process cases |
| Accepted Fe–Ni production | 1,140 t/year | Approximately 1,000–1,200 t/year for the reference configuration |
| Contracted delivery objective | 1,000 t/year | Final value set by signed demand and tug schedule |
| Scheduled feed-processing time | 4,000 h/year | About 46% of calendar time |
| Feed rate during scheduled processing | 3 t/h | Two nominal 1.5 t/h front-end trains |
| Connected electrical load | 1.5–2.5 MWe | Includes operating constraints and non-simultaneous loads |
| Annual average electrical demand | 0.45–0.9 MWe | Approximately 4–8 GWh/year |
| Reference annual energy | About 5.5 GWh | Preliminary flowsheet estimate |
| Plant heat rejection rating | 1.0–1.5 MWth | Segregated temperature loops |
| Delivered plant mass | 270–450 t | Includes preliminary growth allowance |
| Design life | 10–15 years | Replaceable wear and process modules |
| Crew | Zero | No habitat, life support, or human-rating requirement |

The plant cannot meet the same output across arbitrary combinations of low metal abundance, poor recovery, high energy demand, and low availability. Those variables must be evaluated as **coupled scenarios**.

### 2.1 Environmental assumptions

The baseline assumes:

- A solar-powered site with adequate energy availability over its actual heliocentric orbit.
- A mechanically usable installation zone.
- Asteroid rotation and local slopes compatible with anchored industrial equipment.
- No reliance on natural gravity for dust settling, hopper discharge, or melt separation.
- A suitable target with sufficient accessible feed for the committed operating period.

Power availability is to be specified at the **plant electrical interface**, including distance from the Sun, array degradation, temperature, shadowing, and distribution losses—not as array nameplate power at 1 AU.

---

## 3. Closed material-flow model

### 3.1 Reference annual balance

The following is a transparent sizing case, not an assay prediction.

**Assumptions:**

- Excavated feed: **12,000 t/year**.
- Native-metal content: **12 wt%**.
- Beneficiation recovery of that metal: **85%**.
- Concentrate metal grade: **80 wt%**.
- Metal recovery through primary processing: **95%**.
- First-pass product acceptance: **98%**.

| Stream | Calculation | Annual mass |
|---|---|---:|
| Excavated feed | Input | 12,000 t |
| Native metal in feed | 12,000 × 0.12 | 1,440 t |
| Metal recovered into concentrate | 1,440 × 0.85 | 1,224 t |
| Concentrate | 1,224 / 0.80 | 1,530 t |
| Beneficiation tailings | 12,000 − 1,530 | 10,470 t |
| Recovered metal product before acceptance | 1,224 × 0.95 | 1,163 t |
| Primary-process residue | 1,530 − 1,163 | 367 t |
| Accepted first-pass product | 1,163 × 0.98 | 1,140 t |
| Off-spec metal | Difference | 23 t |

**Mass closure:** approximately 12,000 t/year.

Off-spec metal may be reprocessed, but no additional production credit is taken until that recovery is demonstrated.

### 3.2 Production versus deliveries

At full reference operation:

- Approximately **1,140 t/year** passes plant acceptance.
- Approximately **1,000 t/year** is allocated to scheduled deliveries.
- The remaining approximately **140 t/year** is capacity headroom—not unexplained transport loss.

Once inventory targets are met, the preferred operating mode is to throttle production. At the same yields, producing 1,000 t/year requires approximately **10,530 t/year of feed**.

Do not build an indefinite product stockpile to conceal a transport or demand shortfall.

### 3.3 Why grade matters

For the reference beneficiation and processing efficiencies:

\[
M_{\rm accepted}
=
M_{\rm feed}\,f_{\rm metal}\,
\eta_{\rm beneficiation}\,
\eta_{\rm processing}\,
\eta_{\rm acceptance}
\]

To make 1,000 t/year:

| Native-metal fraction | Required feed, with other reference assumptions unchanged |
|---:|---:|
| 5 wt% | About 25,300 t/year |
| 12 wt% | About 10,530 t/year |
| 20 wt% | About 6,320 t/year |

The 5% case exceeds the reference front-end capacity. It therefore requires a larger plant, a lower contracted output, or rejection of that target/process combination.

**Recommendation:** Do not approve this configuration for a target whose measured, uncertainty-adjusted recoverable-metal inventory cannot support its contractual output.

---

## 4. System architecture

```text
                      bom-0-1 assay / target model
                                  |
                                  v
bom-0-2 mining robots --> Sealed receiving and sampling
                                  |
                         Metering / feed preparation
                                  |
                    Enclosed liberation and classification
                                  |
                     Magnetic / mechanical beneficiation
                         /                      \
                        v                        v
              Metal-rich concentrate     Beneficiation tailings
                        |                        |
                  Buffer / preheat       Compaction / immobilization
                        |                        |
             Rotating furnace cartridges       |
                        |                        |
             Coalescence + melt filtration     |
                  /                  \          |
                 v                    v         v
           Fe–Ni casting       Slag / residues --> Sealed waste interface
                 |                                  |
       Inspection / assay / acceptance          bom-0-15 repository
                 |
       Product packaging and inventory
                 |
       Robotic berth / cargo handover
                 |
           bom-0-4 cargo tugs
                 |
       bom-0-13 receiving node, SEL1

bom-0-5 --> HV electrical interface --> Plant distribution and drives
                                        |
                                  Segregated thermal loops
                                        |
                              Plant-owned radiator fields

bom-0-9 <--> Site communications interface
bom-0-10 --> Operations authority and production planning
bom-0-14 --> Replacement modules and replenishment
```

### 4.1 Physical arrangement

Install the plant on a mechanically anchored, distributed truss rather than a monolithic platform.

Preliminary layout:

- **Core processing envelope:** approximately **35–50 m long × 20–35 m wide**.
- **Process equipment height:** approximately **8–15 m**, depending on deployed structures.
- Two enclosed rotating assemblies, each approximately **12–15 m across**.
- Radiator wings placed outside dust-transfer and cargo-approach corridors.
- Product buffers separated from tailings-transfer equipment.
- Cargo berthing loads carried by dedicated structure, not furnace supports.

These are packaging allowances, not frozen dimensions.

### 4.2 Attachment and asteroid interaction

The anchoring system must distribute loads across multiple independent attachments. Its design depends on whether the selected installation zone is coherent rock, blocky regolith, or weak rubble.

Requirements include:

- Measured anchor proof loads.
- Load monitoring and slip detection.
- Accommodation of thermal distortion.
- Mechanical isolation of rotating equipment.
- Balanced rotor start/stop sequences.
- Site-level assessment of accumulated momentum transfer.

A furnace rotor must not depend on a single anchor, a single bearing, or perfect knowledge of asteroid interior strength.

---

## 5. Process subsystems

## 5.1 Receiving, sampling, and bulk-solids handling

**Configuration:** Two receiving lanes feeding two front-end trains.

Preliminary capacities:

- Receiving and metering: **3 t/h combined**.
- Raw-feed buffer: **50–150 t**, approximately 17–50 operating hours.
- Concentrate buffer: **10–30 t**.
- Robotic removal of oversize or hazardous inclusions.
- Representative sampling before and after beneficiation.

All material transport is positive-displacement or mechanically constrained:

- Augers.
- Cleated enclosed belts.
- Pocket feeders.
- Scrapers.
- Mechanically swept bins.

**No gravity hoppers are assumed to work unmodified.**

Liberation should begin with the least aggressive method that gives adequate recovery: screening, controlled crushing, and selective breakage before fine grinding. Excessive comminution increases dust, wear, energy consumption, and containment burden.

Initial particle-size assumptions:

- Incoming material after mining preparation: typically **below 50–100 mm**.
- Beneficiation feed: potentially **0.1–10 mm**, with a separately managed fine fraction.

The optimum range must be measured on representative material.

## 5.2 Beneficiation

Use staged magnetic separation supported by classification and recirculation.

Recommended sequence:

1. Remove oversize and tramp material.
2. Liberate metal-bearing particles.
3. Separate coarse magnetic fractions.
4. Reprocess middlings.
5. Isolate fines rather than allowing them to circulate indefinitely.
6. Assay concentrate and reject streams.

Magnetic response alone does not prove useful alloy content. Magnetic oxides and metal-bearing composite particles can report to the same stream.

**Proposed performance objective:** **75–90% recovery of native metal** into a **70–90 wt% metal concentrate**.

The reference calculation uses 85% recovery and 80% grade. Neither is guaranteed.

## 5.3 Primary processing: rotating melt cartridges

### Recommended configuration

Two independently isolatable furnace cartridges.

Each cartridge contains:

- A balanced rotor with opposed process vessels.
- Induction or resistance heating.
- Replaceable crucible and filtration assemblies.
- Controlled melt-transfer and casting interfaces.
- Local instrumentation.
- Secondary fragment and melt containment.

| Parameter | Preliminary specification |
|---|---|
| Effective process radius | 4–6 m |
| Nominal acceleration | 0.1 g |
| Qualification range | Approximately 0.03–0.2 g |
| Nominal rotation at 5 m | 4.23 rpm |
| Batch concentrate charge | Approximately 600 kg per cartridge, divided into balanced vessels |
| Target batch cycle | Approximately 2–3 h |
| Reference cycle | 2.5 h |
| Combined nominal concentrate rate | About 0.48 t/h |
| Electrical rating | Approximately 250–350 kW per cartridge |
| Process temperature | Approximately 1,450–1,650°C, composition dependent |

At the reference rate, 1,530 t/year of concentrate requires about **3,190 cartridge-pair operating hours**. This leaves some schedule margin inside the 4,000-hour feed-processing allocation, but does not make the plant fully redundant at rated annual output.

### Why 5 m rather than 50 m?

The governing relation is:

\[
a=\omega^2r
\]

At 5 m radius and 0.1 g, the required speed is about 4.23 rpm. Human comfort is irrelevant.

The actual engineering issues are:

- Melt-depth acceleration gradient.
- Coriolis-driven flow during transfer.
- Wetting and coalescence.
- Foam formation.
- Rotor balancing.
- Bearing life.
- Containment mass.
- Separation at small droplet sizes.

Rotation does **not** guarantee fine-droplet separation. At centimetre and smaller scales, surface tension can dominate. The process therefore includes **coalescence surfaces and melt filtration**, rather than relying only on buoyancy.

### Power transfer

Do not baseline a multi-MW rotary joint.

Evaluate:

1. Contactless transfer at the cartridge rating.
2. Serviceable rotary electrical interfaces.
3. Stationary heating with indexed or batch rotor operation where technically viable.

Select the method after vacuum, thermal-cycle, contamination, and life testing. Rotary interfaces remain a development risk, even below 350 kW.

## 5.4 Casting, consolidation, and qualification

Produce standardized billets or feedstock blocks, not finished flight structures.

Recommended products:

- **25–100 kg billets** for remelting and downstream fabrication.
- Larger blocks only where Phase 1 explicitly accepts them.
- Lot segregation by chemistry.
- Identification and traceability retained through cargo handover.

Do not advertise untested asteroid alloy as a drop-in replacement for terrestrial structural grades.

### Proposed initial product acceptance envelope

These are starting points for customer negotiation:

| Attribute | Proposed initial requirement |
|---|---|
| Combined Fe + Ni | At least 97 wt% |
| Entrained nonmetallic material | No more than 0.5 wt% |
| Sulphur | No more than 0.10 wt%, unless customer accepts otherwise |
| Phosphorus | No more than 0.10 wt%, unless customer accepts otherwise |
| Nickel | Measured and lot-controlled; no universal narrow grade assumed |
| Internal soundness | Qualified against agreed porosity/inclusion limits |
| Surface cleanliness | Compatible with receiving-node contamination limits |
| Traceability | Feed lot, process history, chemistry, inspection record |

These limits may prove incompatible with particular targets. If so, the project must change target, customer application, or flowsheet—not quietly relabel off-spec metal.

Mechanical-property requirements depend on intended use:

- Shielding and ballast.
- Remelt stock.
- Cast components.
- Structural members.

The last category requires substantially more qualification than the first two.

---

## 6. Power and thermal management

## 6.1 Electrical demand

Indicative load allocation:

| Load | Operating range |
|---|---:|
| Liberation, classification, beneficiation | 150–450 kW |
| Two furnace cartridges | 500–700 kW combined |
| Casting and product handling | 50–150 kW |
| Pumps, thermal control, dust handling | 100–250 kW |
| Controls, maintenance equipment, auxiliaries | 50–150 kW |
| Short-duration handling/startup loads | Additional 200–500 kW, scheduled |

The plant controller limits coincident loads.

**Requested bom-0-5 allocation:** approximately **1.5–2.5 MWe available at the plant interface**, with the final rating determined by the qualified flowsheet.

Reference energy basis:

- Concentrate processing: **1.5–3 kWh/kg concentrate**, including relevant heating and process losses.
- Reference concentrate: 1,530 t/year.
- Additional front-end and auxiliary energy: separately accounted.
- Total plant energy allowance: approximately **4–8 GWh/year**.

The energy metric must not switch between kilograms of raw feed, concentrate, and product without stating the denominator.

### Electrical interfaces

- Site distribution interface: nominal **2–3 kV DC**, subject to programme electrical standard.
- Plant-owned conversion to motor, heater, and instrument buses.
- Isolation monitoring and arc-fault detection.
- Segmented feeds with remote disconnection.
- Dust-tolerant, robot-serviceable connectors.
- Controlled grounding and charging mitigation.

Bulk energy storage belongs to bom-0-5. Bom-0-3 includes only local control UPS and emergency-actuation capability.

## 6.2 Heat rejection

Radiators are explicitly part of bom-0-3.

Use separate loops for:

1. Electronics and low-temperature machinery.
2. Furnace power electronics and process cooling.
3. High-temperature thermal recovery or rejection where qualified.

Illustrative design point:

- **0.4 MW at approximately 325 K**.
- **0.8 MW at approximately 450 K**.

Radiator sizing uses:

\[
Q=\epsilon\sigma A\left(T^4-T_{\rm sink}^4\right)F_{\rm effective}
\]

With emissivity around 0.85 and an illustrative effective derating of 0.7, these loads require roughly **1,640 m² of emitting area before additional design margin**.

Recommended preliminary allocation:

- **1,800–3,000 m² total emitting area**.
- Approximately **1,000–2,000 m² physical panel area**, depending on whether both faces have usable views.
- **1.0–1.5 MWth** installed rejection capability.

Final sizing must include sunlight, asteroid infrared, mutual view factors, dust deposition, fluid temperature drops, and failed segments.

**I reject a blanket “1 MW at 350 K requires 700 m²” allowance.** At 350 K and emissivity 0.85, ideal one-sided emission is only about 0.72 kW/m² before environmental derating.

Provide segmented loops, isolation valves, protected routing, and replaceable panels. A single puncture must not drain an entire thermal system.

---

## 7. Tailings and contamination control

### 7.1 The dominant mass stream

The reference plant generates approximately:

- **10,470 t/year** beneficiation tailings.
- **367 t/year** primary-processing residue.
- Approximately **23 t/year** off-spec metal pending reprocessing.

Tailings are not a minor disposal accessory. At full reference operation, primary rejects total roughly **10.8 kt/year**.

Over 12 years, that is about **130 kt**. At an illustrative packed density of 2 t/m³, it occupies about **65,000 m³**.

### 7.2 Scope boundary

**Bom-0-3 owns:**

- Process enclosures.
- Local dust capture.
- Sealed material transfers.
- Tailings metering.
- Compaction or other qualified immobilization.
- Waste characterization.
- Verified closure before repository handover.

**Bom-0-15 owns:**

- Site-wide contamination monitoring.
- External repository design.
- Long-duration retention.
- Environmental and trajectory consequences.
- Independent escape verification.
- Closure and post-operational monitoring.

This separation does not permit a gap at the handover interface.

### 7.3 Containment approach

Use three barriers:

1. **Primary:** Enclosed process equipment.
2. **Secondary:** Local shrouds and capture volumes around transfer points.
3. **Tertiary:** Site monitoring, recovery capability, and operational exclusion zones.

For disposal, investigate:

- Mechanically compacted blocks.
- Qualified bags inside protected cells.
- Anchored modular vaults.
- Prepared cavities where geotechnically justified.

Do not assume free piles will remain stable. Do not assume tailings-derived construction material is qualified merely because it is available.

### 7.4 Interim escape requirement

Consistent with D-03, adopt ALARP and propose the following **design-study ceiling**, pending modelling and licensing:

> Uncontrolled solid release beyond the defined industrial control volume: less than \(10^{-6}\) of annual processed mass during nominal operations, with separate particle-size, velocity, and hazardous-trajectory limits.

At 12,000 t/year, this is **12 kg/year**. It is not a claim that releasing that amount is acceptable.

A mass-only limit is insufficient: a small quantity of high-velocity fragments can be more consequential than larger retained or recoverable particles. Catastrophic rotor breakup, container rupture, and volatile release require separate event-based criteria.

---

## 8. Mass allocation and maintainability

### 8.1 Preliminary mass estimate

| Subsystem | Mass range |
|---|---:|
| Structure, anchors, deployment interfaces | 30–50 t |
| Receiving, liberation, bulk handling | 40–65 t |
| Beneficiation and sampling | 20–35 t |
| Rotating furnaces and local containment | 45–75 t |
| Radiators, pumps, thermal hardware | 25–45 t |
| Internal power conversion and distribution | 12–22 t |
| Controls and plant maintenance equipment | 18–30 t |
| Local process containment and waste preparation | 20–35 t |
| Casting, inspection, packaging equipment | 12–20 t |
| Commissioning material and installed consumables | 8–15 t |
| **Current equipment estimate** | **230–392 t** |
| Preliminary mass-growth allowance, approximately 15% | **35–59 t** |
| **Planning delivered mass** | **270–450 t** |

This excludes:

- Site arrays and bulk storage.
- Mining robots.
- Tugs and their propulsion systems.
- Launch and delivery stages.
- Site-wide tailings repository.
- Subsequent replacement-spares campaigns.

The growth allowance is not monetary contingency and is not evidence that the mass estimate is mature.

### 8.2 Robotic maintenance

Design around replaceable units:

- Bearings and drive cartridges.
- Crucibles and filters.
- Feeder assemblies.
- Power-conversion modules.
- Pump packages.
- Sensor heads.
- Radiator segments.

Use common robotic interfaces, captive fasteners, alignment guides, visible identifiers, and protected electrical/fluid disconnects.

Major installed modules should be divided into approximately **1–10 t handling units** where practicable. Their mass and extraction paths must be demonstrated against actual maintenance-equipment capability.

Do not assume a manipulator can repair equipment simply because it can reach it.

---

## 9. Autonomy, controls, and communications

### 9.1 Control hierarchy

1. **Independent equipment protection:** overspeed, overtemperature, loss of coolant, electrical faults.
2. **Local process control:** heating, rotation, feed metering, filtration, casting.
3. **Plant supervisory autonomy:** scheduling, inventory, fault isolation, recovery.
4. **Site coordination:** mining, power allocation, cargo operations.
5. **Ground authority:** production plans, software releases, unusual-event disposition.

Earth is not in the real-time safety loop.

### 9.2 Required autonomous behaviours

The plant must:

- Halt feed before downstream buffers overflow.
- Stabilize or safely contain an interrupted melt.
- Stop and secure a rotor after abnormal vibration.
- Isolate failed thermal segments.
- Detect material-transfer jams.
- Quarantine uncertain product lots.
- Recover from qualified communication outages.
- Execute robotic replacement of selected critical modules.
- Preserve diagnostic evidence after faults.

“Safe shutdown” cannot mean abandoning molten metal in a configuration that destroys the furnace.

### 9.3 Proposed qualification objectives

- At least **100 consecutive representative process cycles** with controlled fault injection.
- Demonstrated shutdown and restart.
- Demonstrated jam recovery.
- Demonstrated filter/crucible replacement.
- At least **1,000 integrated operating hours** in a relevant environment, plus longer component endurance tests.

These are minimum proposed evidence milestones, not sufficient by themselves to prove 10–15-year reliability.

### 9.4 Communications

Plant-side preliminary allocation:

- Routine engineering data: **0.1–1 Mbit/s average**, strongly compressed and event selected.
- Diagnostic bursts: **10–50 Mbit/s** when the link permits.
- Local storage: **30–90 days** of selected high-rate process records.
- Continuous low-rate health and alarm stream.

Ground services, antennas, interplanetary links, and operations staffing remain under bom-0-9 and bom-0-10. DSN access is not assumed free.

---

## 10. Manufacturing, installation, and commissioning

### 10.1 Manufacturing approach

Prioritize terrestrial manufacturing and qualification of:

- Pressure and containment structures.
- Precision rotors.
- Refractory systems.
- Power electronics.
- Sensors.
- Robotic interfaces.

Use industrial furnace and mineral-processing experience where relevant, but do not assign space readiness to terrestrial equipment without environmental qualification.

Critical manufacturing controls include:

- Rotor balance and overspeed proof testing.
- Weld and pressure-boundary inspection.
- Refractory compatibility with representative alloy.
- Dust-abrasion testing.
- Vacuum-compatible bearings and lubrication.
- Thermal-cycle endurance.
- Demonstrated robotic access after thermal distortion.

### 10.2 Installation sequence

1. Confirm the installation zone and anchoring method.
2. Establish independent site power and communications.
3. Deploy and proof-test anchors and structural modules.
4. Install thermal loops and radiator segments.
5. Install handling and beneficiation equipment.
6. Install furnace cartridges.
7. Connect waste-transfer and product interfaces.
8. Complete dry-run robotic servicing.
9. Commission with controlled feed.
10. Ramp indigenous feed and acceptance testing.

Carry approximately **5–15 t of characterized commissioning feed and reference material** within the preliminary commissioning allocation. This enables calibration and troubleshooting but does not substitute for processing actual asteroid material.

Do not deliver the industrial plant before target and pathfinder evidence justify it.

---

## 11. Development roadmap and readiness gates

### 11.1 Phase 0A: funded learning programme

Bom-0-3 has **no industrial deployment in 0A**. Its development work is charged to bom-0-11, and its flight demonstrations to bom-0-12.

Suggested elapsed durations from programme authorization—not calendar promises:

| Stage | Indicative duration | Evidence sought |
|---|---:|---|
| Feed/process characterization | 18–30 months | Liberation, assays, chemical compatibility |
| Component breadboards | 24–48 months, overlapping | Handling, furnace, filtration, thermal, maintenance tests |
| Integrated ground pilot | 36–60 months | Closed material/energy balances and fault recovery |
| Relevant-environment flight demonstrations | Approximately years 4–8 | Actual microgravity handling, rotation, containment and product evidence |
| KDP-0B | Evidence-driven | No date-based waiver |

Internal milestones target **TRL 4–5**. KDP-0B requires **TRL 6 for every project-ending technology, without waivers**.

### 11.2 Technology disposition

| Technology | Present panel envelope | Proposed treatment |
|---|---:|---|
| T03 waste-heat rejection | TRL 2–5 | Production-critical; TRL 6 before commitment |
| T05 beneficiation | TRL 2–4 | Representative-feed demonstration |
| T07 rotating melt/separation | TRL 2–3 | Selected route; demonstrate relevant-environment performance |
| T08 containment/tailings | TRL 2–3 | Production-critical, including verification |
| T10 autonomy | TRL 2–4 | Integrated fault-injection evidence |
| T19 solids handling/comminution | TRL 2–3 | Production-critical; actual microgravity tests |
| T21 installation/maintenance | TRL 2–4 | Demonstrated module replacement and recovery |
| T22 product consolidation/qualification | TRL 2–4 | Customer acceptance of representative lots |
| T23 native-metal rotating production | TRL 2–3 | Integrated route demonstration |
| T06 carbonyl | TRL 2–3 | Alternative research track, not deployed baseline |
| T17 hydrogen reduction | TRL 2–4 | Alternative only if feed and economics justify it |

Although T07 and T23 are labelled architecture-change technologies in the panel, they become commitment-critical for this selected production route. An unqualified alternative does not rescue a failed baseline.

### 11.3 KDP-0B conditions

**Target gate**

- Representative feed evidence.
- Sufficient recoverable inventory.
- Demonstrated installation feasibility.
- Validated accessibility and logistics.

**Demand gate**

- Signed material specification.
- Delivery dates and quantities.
- Defined acceptance authority.
- Explicit disposition of rejected lots.

**Economics gate**

- Common-scope comparison against Earth supply.
- Life-cycle cost and schedule-risk assessment.
- Explicit valuation of learning and capability benefits.

Cost parity is not mandatory under D-01, but any premium must be visible and approved.

**Licence gate**

- Accepted containment and release criteria.
- Disposal and closure plan.
- Applicable authorization and oversight arrangements.

**Technology gate**

- TRL 6 evidence for every project-ending technology.
- Selected route qualified as an integrated system.
- No waiver based on schedule pressure.

---

## 12. Cost and budget treatment

### 12.1 Cost basis

All figures are **constant 2026 USD**, preliminary, and not supplier quotations.

Bom-0-3 includes industrial flight hardware, fabrication, acceptance, plant integration, and installed local containment. It excludes development/pathfinder costs assigned elsewhere.

| 0B acquisition element | Range |
|---|---:|
| Structures, anchors, deployment hardware | $0.55–1.0B |
| Receiving, liberation, beneficiation | $0.65–1.25B |
| Rotating furnaces and primary processing | $0.85–1.6B |
| Thermal system and radiators | $0.45–0.9B |
| Internal electrical distribution and conversion | $0.4–0.8B |
| Casting, inspection, packaging | $0.3–0.65B |
| Local containment and waste preparation | $0.3–0.65B |
| Controls, maintenance hardware, plant integration and acceptance | $0.5–1.0B |
| **Bom-0-3 acquisition total** | **$4–8B** |

The basis is an engineering build-up of complex, low-production-rate space hardware—not a validated price-per-kilogram model.

### 12.2 Related expenditure—not additional bom-0-3 lines

| Phase / owner | Plant-related planning allowance |
|---|---:|
| 0A research and qualification, bom-0-11 | $0.8–1.8B |
| 0A flight pathfinder content, bom-0-12 | $0.4–1.0B |
| Post-gate detailed development, bom-0-11 | $0.5–1.2B |
| Launch and delivery, bom-0-8 | Separate campaign estimate required |
| Operations, bom-0-10 | Separate staffing and service model |
| Replacement spares, bom-0-14 | Separate reliability-derived provision |
| External repository/monitoring, bom-0-15 | Separate site design and budget |
| Programme reserve, bom-0-17 | Separate risk-based provision |

Thus:

- **0A industrial bom-0-3 procurement:** zero.
- **0A plant-related enabling work elsewhere:** approximately **$1.2–2.8B**.
- **Gated 0B bom-0-3 acquisition:** approximately **$4–8B**.

These values must not be added to existing programme lines without reconciling ownership.

For planning, I recommend testing a **40–60% reserve allowance on immature eligible scope**, held in bom-0-17. This is not a statistical confidence claim.

### 12.3 Disagreement with round-2 estimates

- **GPT’s $3–7B and 180–300 t:** potentially achievable for a smaller, exceptionally favourable target-specific plant, but optimistic for this reference configuration once robust solids handling, dual rotating modules, thermal rejection, servicing, and containment are explicit.
- **Claude’s $4–12B and 250–500 t:** broadly encompasses my mass view. The upper cost may be reasonable under broader scope or development difficulties, but should not be treated as common-scope acquisition without reconciliation.
- **Gemini’s $6.5–9.5B:** overlaps the upper part of my estimate, but a broader chemical-processing or large-rotor architecture is not justified for the accepted narrow product.
- **Earlier $8–18B station figures:** not directly comparable where they include launch, precursors, NRE, or contingency.

Agreement among model estimates is not independent cost evidence.

---

## 13. Transport and demand closure

The plant’s output is useful only if delivery dates close.

A simple fleet-capacity identity is:

\[
\dot M_{\rm delivered}
=
\frac{N\,P\,U}{T_{\rm cycle}}
\]

For illustration:

- 12 tugs.
- 200 t accepted payload each.
- 0.85 effective fleet utilization.
- Two-year average cycle.

This gives approximately **1,020 t/year**.

At a three-year cycle, the same fleet provides only about **680 t/year**.

This is not a trajectory solution. Bom-0-4 must establish real low-thrust transfers, phasing, payload, degradation, propellant, maintenance, and commissioning dates.

D-05 remains binding:

- No propellant selected.
- Iodine costed as reference.
- Argon assessed as alternate.
- No assumed plant-produced propulsion supply.

Production planning must account for the delay between asteroid acceptance and SEL1 arrival. A promise of “1 kt/year at the plant” is not a promise of “1 kt/year delivered from commissioning.”

---

## 14. Principal risks and responses

| Risk | Consequence | Primary response / stop condition |
|---|---|---|
| Target metal abundance or liberation is inadequate | Excess feed, power and waste | Reject target or resize before commitment |
| Alloy chemistry fails customer requirements | Product unusable | Target chemistry screening and representative product qualification |
| Fine-metal separation underperforms | Low yield | Test coalescence/filtration; reject assumed gravity sufficiency |
| Dust escape exceeds criteria | Licence or operational failure | Multiple barriers and independently verified release performance |
| Solids handling jams | Lost availability | Positive displacement, isolation, robotic recovery |
| Refractory/filter life is short | Excess replacement demand | Endurance testing and replaceable cartridges |
| Rotor imbalance or breakup | Major equipment loss | Balanced charges, overspeed protection, physical containment |
| Thermal system underperforms | Production throttling or damage | Environmental sizing and segmented redundancy |
| Autonomy cannot recover routine faults | Uncrewed operation fails | Fault-injection and maintenance demonstrations |
| Tailings repository is impractical | Plant cannot operate safely | Repository design before 0B, not after installation |
| Tug cycle is too long | Delivery shortfall | Integrated target–plant–transport model |
| Demand declines | Stranded capital | Staged procurement and throttled production |

### Fallback

If the selected metallurgy route cannot qualify:

1. Stop industrial commitment.
2. Retain 0A results.
3. Supply Phase 1 from Earth.
4. Reopen carbonyl or another route only through a new gated architecture decision.

A lunar refinery is a separate major programme, not an immediate substitute.

Earth-supply pricing must use supplier-informed manufacturing, launch, transfer, receiving, and schedule assumptions. It should not be represented by a single blended launch $/kg figure.

---

## 15. Open engineering questions

The highest-value unresolved questions are:

1. **What feed actually exists?**  
   Metal abundance, alloy chemistry, liberation behaviour, and spatial variability remain controlling inputs.

2. **Can fine metal be recovered without excessive grinding?**  
   This determines wear, energy, dust generation, and waste conditioning.

3. **Does approximately 0.1 g produce acceptable recovery at useful batch scale?**  
   Rotation speed alone does not answer this.

4. **What are crucible and filter lives on actual concentrate?**

5. **Can the plant autonomously recover from the most frequent maintenance events?**

6. **Can the tailings repository retain roughly 10 kt/year for the full operating period?**

7. **What fraction of Phase 1 demand genuinely accepts this alloy?**  
   Generic “structural mass” is not an adequate material specification.

8. **What is the real delivered-product schedule?**  
   Target windows and tug phasing may dominate annual plant capacity.

9. **Which release metrics will the licensing state accept?**  
   Mass fraction must be supplemented by particle and trajectory criteria.

10. **Does the selected target justify reduction chemistry?**  
    If not, leave that hardware on Earth.

---

## 16. Recommended baseline disposition

Approve this proposal as a **0A design reference**, not as authorization to procure the industrial plant.

Freeze the following architecture:

- Asteroid-co-located beneficiation and primary processing.
- Native Fe–Ni product only.
- Enclosed mechanical material handling.
- Short-arm rotating melt cartridges.
- Explicit radiators.
- Explicit tailings handover and repository dependency.
- Robotic servicing and zero crew.
- SEL1 as the interim receiving destination.
- Earth supply as the qualified fallback strategy.

Keep the following open until evidence closes them:

- Target.
- Final capacity.
- Product chemistry and applications.
- Rotor geometry and heating interface.
- Site power rating.
- Repository design.
- Tug schedule and propellant.
- Acquisition commitment.

**Bottom line:** The defensible Phase 0B plant is a contained, maintainable, target-specific metal factory—not a miniature universal refinery. Its investment case rests on qualifying the entire feed-to-delivered-product chain and deliberately purchasing capability, not on assuming that asteroid metal will immediately be cheaper than Earth supply.