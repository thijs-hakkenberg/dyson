---
bomId: "bom-0-2"
itemName: "Mining Robots"
itemSlug: "mining-robots"
modelId: "gpt-6-1-sol"
modelName: "GPT-6.1 Sol"
generated: "2026-10-20"
phase: "phase-0"
---

# Mining Robots Technical Proposal
## Project Dyson — bom-0-2, Phase 0 Space Resource Processing

**Recommended baseline:** A modular fleet of restrained, tether-powered mining robots operating within bounded work cells at a selected near-Earth asteroid. Excavation and material transfer remain enclosed. Robots deliver unbeneficiated feed to the co-located Fe–Ni processing plant through sealed containers.

**Procurement recommendation:**
- **0A:** Two instrumented flight pathfinder robots, following ground prototypes.
- **0B reference installation:** Six production robots plus two interchangeable, flight-ready reserve robots.
- **0B replacement allowance:** Two to four additional robots over a five-year production campaign, purchased conditionally.
- **Production fleet procurement:** **10–12 robots total**, including reserves and replacements—not 10–12 simultaneously excavating.

**Recurring production hardware allowance:** **$370–825 million**, excluding NRE, launch/delivery, common site infrastructure, operations, and programme contingency. These exclusions are assigned explicitly below.

All numerical values in this proposal are **engineering allocations or assumptions unless identified as binding programme requirements**. They are not established asteroid-mining performance.

---

## 1. Recommended approach

### 1.1 Design philosophy

The robot should be designed as a **restrained industrial machine with limited mobility**, not as a free-ranging planetary rover.

Its principal functions are:

1. Establish and verify a stable mechanical load path.
2. Enclose a small excavation face.
3. Excavate within measured force, torque, and particle-release limits.
4. Load a sealed intermediate container.
5. Deliver that container to the processing interface.
6. Inspect and replace accessible wear components.
7. Enter a mechanically secure safe state without continuous Earth intervention.

The important design choices are:

| Decision | Recommendation |
|---|---|
| Production power | Managed **2 kV DC tether**, supplied by bom-0-5 |
| Battery | **30 kWh nominal**, for mobility, transients and safe mode—not routine night excavation |
| Mobility | Winch-assisted, restrained repositioning between work cells |
| Excavation | Interchangeable head; enclosed opposed drums are the reference candidate |
| Restraint | Multiple independently instrumented anchors or validated structural attachments |
| Beneficiation | **No credited enrichment on the robot** |
| Material transfer | Sealed intermediate containers with isolated docking interfaces |
| Maintenance | Robotically exchangeable modules, not component-level field repair |
| Fleet expansion | Conditional on measured productivity, wear, containment and signed demand |

**The robot must not depend on counter-rotation to remain attached to the asteroid.** Opposed tools can reduce some reaction torques, but anchoring must accommodate the validated residual loads, asymmetry, jams and fault transients.

### 1.2 Explicit exclusions

This proposal does not restore:
- Central processing of bulk ore at SEL4/L5.
- Water-first production assumptions.
- Production LOX/LH₂.
- Crew support or crew maintenance visits.
- Battery-powered continuous excavation.
- Magnetic or electrostatic beneficiation as a credited production capability.

The receiving destination is provisionally **SEL1**, but the mining robot itself has no location-specific dependency on that receiving node.

---

## 2. Production basis and fleet sizing

### 2.1 Size from accepted metal output, not historical ore throughput

The production calculation must connect excavation to **accepted, delivered Fe–Ni product**:

\[
M_{\rm delivered}
=
N\,q\,H\,g\,r\,a\,d
\]

Where:

- \(N\): operating robots.
- \(q\): excavation rate during productive cutting.
- \(H\): productive cutting hours per robot per year.
- \(g\): recoverable native/reduced Fe–Ni fraction in excavated feed.
- \(r\): processing recovery.
- \(a\): fraction meeting the contracted material specification.
- \(d\): fraction retained through packaging and delivery.

The robot programme must not assume that a metal-rich spectrum establishes an accessible, excavatable feedstock with the required \(g\).

### 2.2 Reference planning case

The following is a **sizing example**, not a target-resource estimate.

| Parameter | Reference assumption |
|---|---:|
| Contracted delivered metal | 1,000 t/year |
| Excavation rate during productive cutting | 2.0 t/h |
| Operating robots | 6 |
| Scheduled productive cutting | 1,100 h/robot/year |
| Accessible native/reduced Fe–Ni fraction, \(g\) | 12% |
| Processing recovery, \(r\) | 80% |
| Product acceptance fraction, \(a\) | 95% |
| Packaging/delivery retention, \(d\) | 98% |

This gives:

\[
M_{\rm excavated}=6(2.0)(1{,}100)=13{,}200\ {\rm t/year}
\]

\[
M_{\rm delivered}
=13{,}200(0.12)(0.80)(0.95)(0.98)
\approx1{,}180\ {\rm t/year}
\]

Approximately **11,200 t/year of feed** would support 1,000 t/year delivered under those assumptions. The remaining excavation capacity provides operating margin; it is not a commitment to produce unwanted material.

**Productive cutting duty is 12.6% of calendar time.** Positioning, enclosure installation, transfer, inspection, maintenance, shadow periods and standby occupy the balance. Availability and cutting duty must be tracked separately.

### 2.3 Sensitivity to effective yield

Define effective delivered yield:

\[
y=g\,r\,a\,d
\]

| Effective delivered yield | Feed needed for 1,000 t/year |
|---:|---:|
| 15% | 6,700 t/year |
| 9% | 11,100 t/year |
| 5% | 20,000 t/year |
| 3% | 33,300 t/year |

This is the dominant fleet-sizing sensitivity.

The proposed six-machine operating fleet is intended for approximately **10–25 kt/year of feed**, subject to demonstrated rate and duty. It does **not** automatically close a low-grade target or the upper 2.5 kt/year programme-output case.

At KDP-0B:
- Recalculate fleet size from signed Phase 1 demand.
- Use conservative target grade and recovery distributions.
- Include correlated outages.
- Reject or defer a target that requires uneconomic fleet expansion.

### 2.4 Residue implications

In the reference case, roughly **12 kt/year remains at the asteroid** as residue or off-spec material.

The robots must support a closed material-accounting chain, but **long-term residue containment belongs to bom-0-3 and bom-0-15**, not to an unpriced robot function.

---

## 3. Reference robot specifications

### 3.1 Top-level allocation

| Characteristic | Reference allocation | Design range / qualification envelope |
|---|---:|---:|
| Dry delivered robot mass | 3.4 t | 2.8–4.5 t |
| Stowed dimensions | 3.2 × 2.4 × 2.2 m | Launch-interface dependent |
| Deployed restraint footprint | About 6 × 6 m | Target dependent |
| Overall deployed envelope, including radiators | About 10 × 7 m | Configuration dependent |
| Excavation head mass | 550 kg | 350–800 kg |
| Productive excavation rate | 2 t/h | 1–3 t/h target-qualified feed |
| Productive cutting time | 1,100 h/year | 800–1,800 h/year planning range |
| Normal cutting mechanical power | 4–8 kW | Up to 15 kW development testing |
| Electrical input while excavating | 12–20 kW | Feedstock and thermal dependent |
| Continuous electrical service rating | 30 kW | — |
| Short electrical peak | 40 kW | Up to 10 seconds |
| Tether input | 2 kV DC nominal | 1–3 kV programme envelope |
| Battery | 30 kWh nominal | 20–40 kWh |
| Managed power tether | 150 m reference | 50–300 m trade range |
| Operational life | Five-year campaign objective | Not yet qualified |
| Productive cutting life allocation | 5,500 h per nominal robot | Replaceable wear modules |
| Routine excavation from battery | Not baselined | Emergency withdrawal only |

The lower excavation-rate bound does not include arbitrary competent metallic rock. Large coherent metal masses could require a different head or a different mining method.

### 3.2 Preliminary mass budget

| Subsystem | Reference mass |
|---|---:|
| Structure, mobility and restraint hardware | 850 kg |
| Excavation head and drives | 550 kg |
| Enclosed collection and transfer equipment | 330 kg |
| Power electronics, cable management and tether | 250 kg |
| Battery and containment | 260 kg |
| Thermal-control system and radiators | 230 kg |
| Avionics, sensing and communications | 120 kg |
| Maintenance tooling and exchange interfaces | 150 kg |
| **Allocated hardware subtotal** | **2,740 kg** |
| **Unallocated mass reserve** | **660 kg** |
| **Reference dry mass** | **3,400 kg** |

This excludes:
- Material payload.
- Detached site infrastructure.
- Site-level transfer-container inventory.
- Delivery lander or deployment carrier.
- Common power-distribution equipment.

The 660 kg reserve is approximately 24% of allocated hardware mass. Given present maturity, it should not be traded away to close launch packaging prematurely.

---

## 4. System architecture

```text
                        bom-0-5 SITE POWER
                      arrays / storage / PDU
                                |
                         2 kV DC branches
                                |
                +---------------+----------------+
                |                                |
         Managed power tether             Other work cells
                |
       +--------v-----------------------------------+
       | MINING ROBOT                               |
       |                                            |
       | HV isolation --> DC/DC --> low-voltage bus  |
       |                       <--> 30 kWh battery   |
       |                                            |
       | Autonomy + independent safety controller   |
       |       |           |              |         |
       |   restraint    tool drives    enclosure    |
       |   and winches   and feeder    and transfer |
       +-------+-----------+--------------+---------+
               |           |              |
        verified load   enclosed       sealed feed
             path       cutting face    container
                                            |
                                   controlled transfer
                                            |
                                  bom-0-3 FEED INLET
                                            |
                                  processing / product
                                            |
                                    bom-0-4 CARGO
```

A separate, mechanically rated restraint or recovery line must be used where necessary. **The electrical cable is not a safety tether.**

### 4.1 Work-cell concept

Each work cell contains:
- Surveyed excavation volume.
- Verified attachment locations.
- Defined robot and container routes.
- Managed cable corridor.
- Particle-monitoring coverage.
- Protected stow location.
- Recovery access for another robot.

Robots should normally move between cells using restrained winch translation and short articulated steps. Unrestrained hopping is excluded from routine operations.

This reduces the scope of the mobility problem from “traverse an asteroid” to “operate safely within a surveyed industrial site.”

---

## 5. Excavation and restraint

### 5.1 Reference excavation head

The reference candidate is an **enclosed opposed-drum head**, with replaceable teeth and an internal metering conveyor.

Advantages:
- Potential reduction in net reaction torque.
- Direct enclosure of the material-generation region.
- Replaceable wear surfaces.
- Reversible drives for jam recovery.
- Compatibility with modular tool exchange.

It remains a candidate, not a procurement constraint. During 0A, compare it against:
- Enclosed coring and fragment collection.
- Restrained scraping or drag collection.
- Boulder enclosure and controlled fragmentation.
- Low-energy collection from naturally loose material.

A head that works only in ideal loose simulant is not sufficient evidence for 0B.

### 5.2 Consistent torque and speed basis

For a representative drum radius of **0.4 m**:

- Nominal angular speed: **0.5 rad/s**, approximately 4.8 rpm.
- Nominal tip speed: **0.2 m/s**.
- Nominal mechanical power per drum: **2 kW**.

Therefore:

\[
\tau=P/\omega=2{,}000/0.5=4{,}000\ {\rm N\,m}
\]

Preliminary tool-drive allocations:
- Normal operating torque: **2–8 kN·m per drum**.
- Torque-limited jam threshold: **up to 12 kN·m per drum**, subject to structural qualification.
- No credit for a fixed percentage of torque cancellation.

These values replace the physically inconsistent legacy torque/power combination.

**Tip speed is not a particle-release limit.** Tool operation occurs inside containment; escaping particle velocities require separate measurement.

### 5.3 Restraint architecture

Use multiple attachment modes, selected against actual target properties:
- Boulder capture bands or structural clamps.
- Drilled or embedded anchors where substrate permits.
- Distributed gripping frames.
- Reaction frames spanning verified competent features.

Do not assume that a single anchor design works in both fine rubble and competent metal.

Preliminary system load allocations:

| Load | Allocation |
|---|---:|
| Normal excavation crowd force | 0.3–2 kN |
| Force-triggered stop | Approximately 3 kN, adjusted by qualified configuration |
| Short transient force envelope | Up to 5 kN |
| Restraint-system working resultant | 10 kN |
| Restraint-system working moment | 15 kN·m |
| Initial proof-test factor | 1.5 × applicable limit load |

These are **development requirements**, not demonstrated asteroid anchor capacities. Final requirements must come from measured six-axis cutting loads and attachment geometry.

Each excavation start requires:
1. Attachment verification.
2. Load-path self-test.
3. Controlled preload.
4. Tool-speed ramp.
5. Automatic monitoring for creep, slip and load redistribution.

Loss of restraint integrity triggers tool shutdown before attempted relocation.

---

## 6. Particle containment and material transfer

### 6.1 Containment architecture

The primary barrier is a rigid excavation enclosure with:
- Replaceable conformal contact skirt.
- Internal baffles.
- Captive material pathways.
- Isolated transfer valves.
- Secondary collection around service interfaces.
- Inspection access that does not require opening a loaded material path.

A difficult unresolved interface is the enclosure-to-natural-surface boundary. That interface must be demonstrated in representative microgravity conditions; a laboratory seal against a machined surface does not qualify it.

Electrostatic dust control may supplement containment, but it receives **no primary containment credit** until demonstrated.

### 6.2 Interim contamination allocation

Consistent with D-03, adopt ALARP plus a provisional design ceiling:

- **Site-wide uncontrolled release:** no more than **100 kg/year** across mining, processing, transfer and servicing.
- Preliminary allocation:
  - Mining operations: **60 kg/year**.
  - Processing and transfer: **30 kg/year**.
  - Maintenance and miscellaneous events: **10 kg/year**.

Additionally:
- Model and report the subset escaping the local operating region.
- Use **10 kg/year escaping material** as an initial analysis target, not an approved licence limit.
- Allocate no more than **0.3% annual protected-equipment performance loss** to mining dust, within a provisional site-wide dust-loss allowance of 1%.

These are proposed engineering allocations—not international standards, accepted licence conditions, or claims of current feasibility.

The requirement must include:
- Particle size.
- Release velocity and direction.
- Charging state where relevant.
- Destination and residence time.
- Deposition on protected surfaces.
- Fault and servicing releases.

A mass percentage alone is inadequate.

### 6.3 Verification

Combine:
- Full-cycle chamber testing.
- Calibrated particle imaging.
- Witness plates and deposition sensors.
- Transfer-interface collection measurements.
- Inventory reconciliation.
- Validated transport models.
- In-situ measurements during 0A.

Verification must produce an **upper confidence bound**, including unobserved material and sensor uncertainty. Bulk inventory weighing alone cannot resolve kilogram-scale losses from kiloton-scale flows.

Automatic stop conditions include:
- Enclosure damage.
- Unexpected particle plume.
- Unexplained inventory discrepancy above the validated detection threshold.
- Deposition trend exceeding the allocated rate.
- Operation outside the validated illumination, charging or rotation envelope.

### 6.4 Transfer containers

Do not freeze container capacity before logistics testing.

Recommended trade range:
- **0.5–2 t payload**.
- **1 t reference payload**.
- Double-isolated docking interface.
- Positive fill-state sensing.
- Load restraint independent of gravity.
- Capture features compatible with robot handling and plant docking.

At 2 t/h, a 1 t container is filled in approximately 30 minutes. This makes exchange time and container routing material contributors to annual duty.

Container inventory should follow a discrete-event logistics model, rather than inheriting the unexplained 24-container quantity.

---

## 7. Power and thermal control

### 7.1 High-voltage distribution

Recommended interface:
- **2 kV DC nominal**.
- Isolated DC/DC conversion.
- Current limiting at both site branch and robot.
- Ground-fault and arc detection.
- Mechanically keyed, dead-before-mate connectors.
- Automatic discharge and verified isolation before handling.
- Dust-protected connector stowage.

At 20 kW, input current is approximately **10 A**; at 40 kW, approximately **20 A**. Cable conductor sizing is therefore not the main mass driver. Mechanical protection, insulation reliability, reel design and repairability are more important.

Tether management must include:
- Tension sensing.
- Abrasion inspection.
- Controlled payout and retrieval.
- Cable-route mapping.
- Snag detection.
- Safe release or isolation of a damaged segment.

The 150 m reference length is a work-cell allocation, not permission for unrestricted traversal.

### 7.2 Battery

Reference battery: **30 kWh nominal**, approximately **20–23 kWh dispatchable** after operating margins and degradation allowances.

Illustrative endurance:
- 1 kW safed load: approximately 20 hours.
- 3 kW combined mobility/housekeeping: approximately 6–7 hours.
- 20 kW excavation: about one hour, but not an approved routine mode.

Longer shadow survival must be provided through site power, thermal design and an appropriate safe location—not by quietly expanding onboard storage.

Robot batteries count within the site storage total. Eight installed robots contain **0.24 MWh nominal**; the site energy balance must avoid counting that capacity twice.

### 7.3 Thermal rejection

Provide approximately **30 m² of deployed radiator area per robot**, with an initial trade range of **25–40 m²**.

This is based on rejecting approximately **10–15 kW** during sustained high-load operation at useful radiator temperatures around **330–350 K**, with conservative allowances for view factors, degradation and solar exclusion.

Important qualifications:
- Motor mechanical output partly leaves the robot through the material and substrate.
- Actual heat partition must be measured.
- Radiators require shielding from direct dust exposure and suitable solar orientation.
- Some duty points may require power derating.

No fixed excavated-material temperature rise is assumed.

### 7.4 Site power interface

For the reference installed fleet:
- Annual-average robot demand: **35–65 kW**.
- Allocated continuous branch capacity: **200 kW**.
- Short-duration coordinated peak: **250 kW**.

These values include housekeeping and charging but exclude the processing plant and shared site services. The site controller schedules high-power starts to prevent coincident transients.

---

## 8. Autonomy, control and communications

### 8.1 Control hierarchy

```text
Earth mission planning
        |
        v
Site production supervisor
        |
        v
Robot task executive
        |
        +--> restraint controller
        +--> excavation force/torque controller
        +--> enclosure and transfer controller
        +--> cable/mobility controller
        |
Independent safety controller
        |
Hardware shutdown, brakes, isolation, secure state
```

Earth approves work plans and operating envelopes. It does not close the excavation control loop.

### 8.2 Required autonomous capabilities

Each robot must:
- Execute bounded mining plans.
- Validate attachment before excavation.
- Regulate cutting loads.
- Detect inclusions and incipient jams.
- Withdraw or reverse tools safely.
- Maintain enclosure integrity.
- Exchange containers without material release.
- Recognize cable anomalies.
- Diagnose common faults.
- Request assistance from another robot.
- Remain mechanically secure during communications loss.

Suggested control rates:
- Motor and current loops: **1–10 kHz**.
- Force/torque control: **100–500 Hz**.
- Mobility and geometry updates: **10–50 Hz**.
- Supervisory planning: **0.1–1 Hz**.

### 8.3 Safety architecture

Use an independent safety controller with:
- Separate watchdog.
- Direct access to critical load and attachment sensors.
- Authority to disable drives and isolate HV.
- Validated safe-state sequences.
- Event recording independent of the main autonomy computer.

Machine-learning perception may support terrain and anomaly interpretation. It should not be the sole basis for load-limit enforcement or containment interlocks.

### 8.4 Communications

Initial allocations:
- Site-local robot links: **1–10 Mbps per active robot**, with burst capacity.
- Robot science/engineering data retained: **1–5 GB/day per active robot**.
- Mining-fleet Earth delivery: **5–30 GB/day**, selectively downlinked.
- Low-rate emergency telemetry on a separate robust path.

These are traffic requirements to bom-0-9, not a purchase of ground service within bom-0-2. Full-rate continuous video to Earth is unnecessary.

Qualify autonomous operation through at least a **seven-day planned communications outage**, with a longer safe-survival interval set by target geometry and energy analysis.

---

## 9. Maintenance and manufacturing

### 9.1 Maintenance strategy

Design for robotic exchange of:
- Excavation head.
- Tooth or cutter cassette.
- Drive module.
- Contact skirt and seal cassette.
- Transfer valve module.
- Sensor window.
- Tether termination.
- Power-conversion module.
- Battery module.

Use:
- Captive fasteners.
- Standardized grapple features.
- Coarse alignment guides.
- Contamination-isolated connectors.
- Visible configuration markings.
- Reversible assembly sequences.

Avoid field procedures requiring loose small parts, wire repair, fluid replenishment or precision manual alignment.

Two production robots should be able to assist each other. A failed robot must not become the sole obstruction to a feed route or power corridor.

### 9.2 Wear qualification

Do not specify a 20,000-hour cutting life without supporting evidence.

For the reference duty:
- Five-year productive cutting allocation: **5,500 hours**.
- Teeth, skirts, seals and some bearings are replaceable consumables.
- Qualification should establish replacement distributions and allowable inspection intervals.

Accelerated testing must preserve relevant wear mechanisms. Simply increasing abrasive concentration or speed can produce misleading life estimates.

### 9.3 Manufacturing approach

Use a common bus with target-specific end effectors and restraint kits.

Recommended production sequence:
1. Ground engineering units.
2. Two flight pathfinders.
3. Two production first articles.
4. Acceptance review using flight and endurance evidence.
5. Remaining initial production fleet.
6. Conditional replacement lots.

Common parts should include motors, controllers, sensors, valve actuators and exchange interfaces where technically justified.

Materials and processes require qualification for:
- Vacuum lubrication.
- Dust abrasion.
- Thermal cycling.
- Cold welding and galling.
- Electrical charging.
- Radiation.
- Long dormant storage before deployment.

Commercial industrial components may inform design, but terrestrial heritage does not establish relevant-environment readiness.

---

## 10. Scope boundaries and interfaces

| Interface | bom-0-2 responsibility | Other-item responsibility |
|---|---|---|
| Prospecting | State excavation and attachment data requirements | bom-0-1 characterizes candidate targets |
| Processing | Deliver contained feed; provide composition and mass metadata | bom-0-3 owns processing from accepted inlet |
| Power | Onboard conversion, robot-carried tether and reel | bom-0-5 owns generation, storage and common distribution |
| Delivery | Robot packaging and deployment interfaces | bom-0-8 owns launch, cruise, landing and delivery |
| Communications | Robot terminals and data products | bom-0-9 owns site/network and Earth segment |
| Operations | Robot procedures, autonomy and diagnostics | bom-0-10 owns operational staffing and execution |
| Qualification | Technical requirements and test articles | bom-0-11 funds allocated NRE and qualification |
| Pathfinder | Robot design and supplied flight hardware | bom-0-12 owns integrated demonstration mission |
| Replacements | Whole replacement robots and robot-specific exchange kits costed here | bom-0-14 excludes those same articles; owns other common spares |
| Contamination | Robot enclosure and local sensing | bom-0-15 owns site-wide transport analysis, monitoring and containment integration |
| Authorization | Supply evidence and operational limits | bom-0-7 owns jurisdiction-specific authorization and assurance |

**Accounting rule:** Whole replacement robots are included in this proposal’s bom-0-2 total. If programme accounting places them under bom-0-14, transfer the cost rather than adding it again.

Site hubs, common cranes, permanent anchor infrastructure, container fleets and tailings installations require named owners and controlled interfaces. They are not implicitly included in a robot unit price.

---

## 11. Development roadmap and readiness gates

### 11.1 Technology status

Use the supplied panel TRL envelope; do not upgrade it based on this paper design.

| Technology | Current envelope | Principal qualification issue |
|---|---:|---|
| T04 excavation | TRL 2–3 | Rate, loads and energy on representative material |
| T08 containment/tailings | TRL 2–3 | Full-cycle release and credible escape verification |
| T09 HV tethers/distribution | TRL 2–4 | Dust, abrasion, charging, arcs and recovery |
| T10 autonomy | TRL 2–4 | Long-duration integrated fault handling |
| T16 anchoring/mobility | TRL 2–4 | Repeated loading in low-cohesion material |
| T21 maintenance/installation | TRL 2–4 | Autonomous exchange and recovery |
| T24 mechanisms/seals | TRL 2–5 | Relevant abrasive and thermal life |

### 11.2 Proposed sequence

Durations below are planning ranges and may overlap. Flight opportunities and target accessibility dominate calendar scheduling.

**Stage A — Requirements and discriminating experiments: 18–30 months**
- Compare excavation concepts.
- Establish six-axis load distributions.
- Test attachment concepts.
- Measure containment leakage.
- Establish material-property envelopes.
- Demonstrate integrated TRL 4 capabilities.

**Stage B — Integrated ground qualification development: 24–42 months**
- Full-scale thermal-vacuum excavation.
- Restrained microgravity analogues.
- Cable deployment and recovery.
- Robotic maintenance trials.
- Long-duration abrasive testing.
- TRL 5 demonstrations.

**Stage C — 0A flight pathfinders**
- Two robots with complementary instrumented tool configurations.
- Representative attachment, excavation, containment and transfer operations.
- At least one substantial maintenance or module-exchange demonstration.
- Operation through representative thermal and communications conditions.

**Stage D — KDP-0B**
No production commitment until the target, demand, economics and licence gates close.

### 11.3 KDP-0B evidence

For each project-ending technology, require **TRL 6 in a relevant environment, with no waivers**, as directed by D-02.

For this item, evidence must include:
- Excavation at representative depth and material properties.
- Demonstrated restraint margins under measured transients.
- Credible particle-release bounds.
- Sustained integrated autonomy.
- Relevant wear and seal-life evidence.
- Demonstrated robotic installation, recovery and maintenance.

Because T09 is an architecture-changing dependency, I would also require **TRL 6 for the selected HV tether implementation** before committing to the tether-dependent production fleet.

A pathfinder merely touching or briefly collecting surface material does not satisfy these requirements.

---

## 12. Cost analysis

### 12.1 Estimate basis

All costs are **constant 2026 US dollars**, order-of-magnitude engineering allowances:
- No supplier quotations.
- No assumed large-volume learning curve.
- No launch or delivery included in unit price.
- No common site infrastructure included.
- No programme contingency included.
- Production recurring prices assume successful completion of qualification.

### 12.2 0A costs

| Element | Quantity | Allowance | Accounting owner |
|---|---:|---:|---|
| Flight pathfinder robot hardware, including unusual instrumentation | 2 | **$90–160M total** | bom-0-12 |
| Robot-attributable NRE, prototypes and qualification development | One development programme, predominantly 0A | **$400–850M** | bom-0-11 |
| Integrated flight mission, delivery, communications and operations | Mission dependent | Not estimated here | Respective shared items |

The $400–850M NRE allowance includes the robot-related excavation, restraint, autonomy, mechanism and local containment development. It does not purchase the entire site-wide debris-control programme.

**These values are attributable to mining capability, but must not be added again as direct bom-0-2 production procurement.**

### 12.3 0B recurring procurement

| Element | Quantity | Unit allowance | Extended allowance |
|---|---:|---:|---:|
| Initial operating robots | 6 | $35–65M | $210–390M |
| Installed reserve robots | 2 | $35–65M | $70–130M |
| Conditional whole-robot replacements | 2–4 | $35–65M | $70–260M |
| Robot-specific exchange kits, acceptance fixtures and fleet accessories | One allowance | — | $20–45M |
| **Total recurring procurement** | **10–12 robots plus kits** | | **$370–825M** |

Initial eight-robot procurement, before replacements and accessories: **$280–520M**.

Whole replacement robots are an allowance, not a prediction that two to four robots will be lost. Replacement release should follow reliability evidence and mission duration.

### 12.4 Reconciliation with round-2 proposals

**Fleet quantity:**  
I recommend six working robots, two ready reserves, and two to four conditional replacements.

- This is close to the smaller round-2 fleets.
- I do not support 20 production robots before measured feed yield and productivity justify them.
- I also do not support assuming six replacements are necessarily required.

**Mass:**  
The proposed 3.4 t reference is above the lighter 2.5–2.8 t concepts because it explicitly allocates substantial restraint, enclosure, thermal-control and serviceability hardware.

**Power:**  
I do not endorse either a high-confidence 8 kW electrical requirement or 25–70 kW as the production baseline. The proposed **12–20 kW operating range** is a testable allocation, with **30 kW continuous service capability** and a higher development envelope.

**Cost:**  
The quoted $30–80M-class round-2 figures are plausible only as **recurring unit prices**, not as complete fleet or capability-programme costs. A $30–80M total programme cannot credibly procure, qualify and operate this fleet.

**Confidence:**  
Low for total cost and productivity; medium-low for the preliminary mass and power allocations.

---

## 13. Principal risks and responses

| Risk | Consequence | Response / decision rule |
|---|---|---|
| Accessible Fe–Ni yield below assumption | Excess feed and residue; fleet growth | Target gate based on representative samples and integrated recovery |
| Weak or unstable attachment substrate | Robot loss or inability to excavate | Multiple restraint concepts; verified work cells; reject unsuitable sites |
| Competent metallic inclusions | Jams, tool damage, low production | Instrumented load limiting; alternate head; no assumed hard-rock capability |
| Enclosure boundary leaks | Contamination or licence failure | Treat as project-ending until relevant-environment demonstration |
| Tether abrasion or charging | Power interruption, arcing | Managed routes, isolation, inspection and replaceable segments |
| Wear exceeds prediction | Replacement demand and outage growth | Endurance tests and replaceable wear cassettes |
| Autonomy common-mode failure | Fleet-wide outage | Independent safety logic; staged software deployment; replay testing |
| Service operations release dust | Production-compliant system fails lifecycle requirement | Include maintenance and faults in release verification |
| Insufficient heat rejection | Persistent derating | Early thermal-vacuum testing and explicit radiator reserve |
| Reserve robots share design defect | Reserves provide little protection | Reliability model must include common-cause failures |
| Demand does not materialize | Stranded production capital | Hold 0B; require signed material/purity/date demand |
| Relevant technology does not reach TRL 6 | Production cannot be authorized | Stop, redesign or defer; no readiness waiver |

A major programme risk is assuming that replication solves an unsuitable excavation architecture. **More robots do not compensate for failed restraint, unacceptable particle release or inaccessible metal.**

---

## 14. Open engineering questions

Before preliminary design review:

1. **What is the accessible feedstock?**  
   Loose grains, metal-bearing rubble and coherent metallic bodies require different machines.

2. **What attachment geometry is available?**  
   Strength alone is insufficient; shape, block mobility and cyclic stability matter.

3. **What is the relevant cutting-energy distribution?**  
   Measure both typical material and rare hard inclusions.

4. **Can the face enclosure maintain its release budget through repositioning and servicing?**

5. **What radiator geometry remains effective at the selected latitude, rotation period and solar distance?**

6. **What fraction of annual time is lost to container handling, cable management and attachment verification?**

7. **What maintenance tasks can another production robot actually perform?**

8. **How will kilogram-scale release bounds be verified despite much larger handled masses?**

Before KDP-0B:

9. What Phase 1 composition, inclusion, contamination, geometry and delivery-date specifications apply?

10. Does the selected target support conservative effective yield sufficient for the contracted demand?

11. What national authorization pathway and operating conditions apply?

12. Does the integrated mining-processing-delivery chain remain viable against Earth-supplied material?

13. Are replacement production lead times shorter than the demonstrated reserve coverage?

---

## 15. Recommendation

Fund the mining capability through **0A**, with two instrumented flight robots and a disciplined ground programme. Freeze the interface architecture now, but do not freeze the excavation head, anchor design or production fleet quantity before target evidence exists.

For 0B planning, carry:
- **Six operating robots.**
- **Two installed reserves.**
- **Two to four conditional replacements.**
- **3.4 t reference dry mass per robot.**
- **2 kV tether power and 30 kWh onboard battery.**
- **2 t/h reference productive rate.**
- **$370–825M recurring fleet allowance**, with development and shared infrastructure accounted elsewhere.

The decisive accomplishment is not a high instantaneous digging rate. It is a demonstrated, maintainable and licensable chain from **secure attachment to contained feed delivery**, at the duty cycle and effective metal yield needed by a real customer.