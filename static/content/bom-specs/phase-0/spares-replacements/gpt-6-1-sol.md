---
bomId: "bom-0-14"
itemName: "Spares and Replacements"
itemSlug: "spares-replacements"
modelId: "gpt-6-1-sol"
modelName: "GPT-6.1 Sol"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-14 — Spares and Replacements
## Technical proposal for the revised Phase 0 architecture

**Recommendation:** Establish a reliability-driven, robot-serviceable spares programme, with critical inventory at the target asteroid, selected replacement modules carried by each cargo tug, and a larger replenishment pool on Earth. Use the provisional SEL1 receiving node for receiver-side inventory and logistics consolidation only where trajectories justify it—not as the mandatory route for asteroid resupply.

The programme should buy **replaceable modules and recovery capability, not an arbitrary percentage of duplicate spacecraft**. Precision components should remain Earth-supplied throughout Phase 0. Locally produced Fe–Ni may support qualified, noncritical mechanical repairs, but it must not be credited with replacing bearings, electronics, batteries, power semiconductors, seals, or electric-propulsion components.

**Recommended conditional 0B allowance: $0.65–1.55 billion in constant 2026 dollars**, covering initial spares and five years of replacement procurement. This includes robot replacement hardware but excludes launch, routine operations, development qualification, propellant, and programme contingency, which belong to other BOM items.

This is a planning range, not an authorization to procure 0B hardware. Final sizing belongs at KDP-0B, after target selection, demonstrated failure rates, and signed Phase 1 demand.

---

## 1. Scope, assumptions, and accounting boundary

### 1.1 Planning case

The following assumptions are used solely to size this proposal. They are **not a substitute for the configuration-controlled Phase 0 baseline**.

| Parameter | Planning assumption |
|---|---|
| Industrial service period | Five years after initial production acceptance |
| Target sites | One primary NEA site |
| Delivered Fe–Ni product | Approximately 0.8–1.3 kt/year; gate-adjusted to signed demand |
| Mining/handling robots | 20–30 active units; sizing point: 24 |
| Processing architecture | Three partly independent trains; two support contracted production |
| Cargo tug fleet | 10–18 units; sizing point: 12 |
| Tug electrical power | 1.0–2.5 MWe each; sizing point: 1.5 MWe |
| Tug payload | 150–300 t; sizing point: 200 t |
| Site electrical power | Approximately 2–4 MWe, subject to process selection |
| Site storage | Approximately 1–3 MWh for this planning case |
| Supply interruption to protect against | Initially 18–30 months at the asteroid; refine from actual trajectories |
| Human servicing | None |
| Product destination | SEL1 reference case, subject to D-04 re-decision |
| EP propellant | Iodine cost reference, argon alternate; no selection implied |

The fleet-wide power assumption is important: replacement power hardware must support **many megawatts on tugs as well as the asteroid site**. Site power alone is not an adequate basis for the spares budget.

### 1.2 Scope ownership

| Included in bom-0-14 | Excluded / charged elsewhere |
|---|---|
| Spare and replacement robots, modules, and wear parts | Original operational robot fleet: bom-0-2 |
| Plant replacement assemblies and consumable maintenance parts | Initial plant and its built-in redundancy: bom-0-3 |
| Tug replacement hardware | Original tug fleet and installed redundant strings: bom-0-4 |
| Replacement arrays, storage modules, converters, radiator sections | Original power systems: relevant asset BOM |
| Spare avionics, sensors, communications terminals | Original operational communications infrastructure: bom-0-9 |
| Inventory racks, preservation containers, replacement-specific tools and fixtures | Original plant maintenance bay and tug servicing provisions: asset BOMs |
| Production acceptance and configuration verification of spare units | Technology development and qualification: bom-0-11 |
| Spare procurement and supplier-held inventory | Programme-wide organization: bom-0-7 |
| Hardware repair/refurbishment contracts | Routine ground control and operational staffing: bom-0-10 |
| Packaging and preservation before shipment | Launch and transportation services: bom-0-8 |
| Spare thrusters and feed hardware | EP propellant purchases: bom-0-16 |
| Ordinary expected failures and planned wear-out replacements | Programme contingency and exceptional-loss reserve: bom-0-17 |

**Accounting rule:** Each serialized article has one procurement owner. An installed standby converter belongs to the original asset. An identical converter held in inventory belongs to bom-0-14.

---

## 2. Recommended design philosophy

### 2.1 Design for restoration, not merely survival

Traditional spacecraft redundancy keeps an asset functioning after a limited number of failures. An industrial system must also restore its configuration repeatedly.

I recommend three maintenance levels:

1. **Autonomous recovery:** isolate faults, reset electronics, reroute power, release overloads, and switch redundant strings.
2. **Robotic module replacement:** exchange sealed line-replaceable units, or LRUs.
3. **Controlled refurbishment:** repair selected returned modules in an enclosed work volume or on Earth.

Open-board electronic repair, precision bearing replacement, and internal thruster reconstruction should not be required for production continuity.

### 2.2 Standardize interfaces more aggressively than internal designs

A shared electrical connector is useful; a shared hidden defect across every tug is dangerous.

Standardize:

- Mechanical mounting and capture features.
- Power and data interfaces.
- Diagnostic records.
- Handling fixtures.
- Thermal connection classes.
- Replacement procedures.

Do not require one design for every critical component. Preserve qualified alternatives where common-cause failure would strand the fleet.

### 2.3 Make precision Earth imports explicit

Phase 0 should assume Earth supply for:

- Bearings, gearsets, and precision actuators.
- Radiation-tolerant electronics and sensors.
- High-voltage switches and insulation assemblies.
- Battery cells and battery-management electronics.
- Thrusters, cathodes, and precision feed components.
- Vacuum seals and specialized polymers.
- Solar cells and precision optical elements.

Local Fe–Ni manufacturing may eventually replace brackets, guards, ballast, simple fixtures, and some tooling. No reduction in critical spare holdings should be credited until the local process and resulting parts are qualified.

---

## 3. System architecture

```text
                 EARTH SUPPLIERS / REFURBISHMENT
                    |                    ^
        qualified spare hardware        | selected failed units
                    v                    |
             EARTH INVENTORY POOL
       screening / preservation / tracking
                    |
        launch and delivery: bom-0-8
                    |
        +-----------+-----------------------+
        |                                   |
        v                                   v
 TARGET-NEA SPARES STORE             RECEIVING-NODE STORE
 cold + conditioned inventory       SEL1 reference case
        |                           receiver-side spares;
        |                           optional consolidation
        v
 ROBOTIC EXCHANGE / REPAIR AREA
        |
        +--> mining and handling robots
        +--> beneficiation / Fe–Ni plant
        +--> site power and thermal systems
        +--> tugs when accessible for servicing

 EACH TUG:
 installed fault tolerance + small carried recovery kit
 + diagnostic records + safe-mode capability
```

The primary inventory location must follow the likely failure location.

- A critical plant drive stored at SEL1 does not protect asteroid production.
- A spare thruster at the asteroid cannot rescue an inaccessible tug midway through transfer.
- Earth inventory offers manufacturing flexibility, not prompt recovery.

### 3.1 Inventory tiers

| Tier | Location | Typical contents | Planning basis |
|---|---|---|---|
| T0 | Installed on operating asset | Redundant electronics, isolated power strings | Owned by original asset BOM |
| T1 | Carried on mobile asset | Small recovery modules, connectors, control electronics | Mass-limited; only physically exchangeable items |
| T2 | Asteroid site | Critical plant, robot, power, and serviceable tug modules | Initially 18–30 months of lead-time demand |
| T3 | Receiving node | Receiver spares and selected logistics stock | Route-dependent; not a substitute for T2 |
| T4 | Earth | Long-lead assemblies, supplier stock, refurbishment pool | Rolling forecast and production capability |

**Important limitation:** A tug-carried spare is only useful if the tug has a demonstrated means to install it. Otherwise, redundant installed strings—not loose spares—provide the in-transit recovery function.

---

## 4. Technical specifications

The values below are **proposed interface envelopes**, not claimed flight-qualified designs.

### 4.1 Replaceable-unit classes

| Class | Typical application | Mass | Approximate envelope | Handling method |
|---|---|---:|---|---|
| S | Sensors, controllers, small valves | 2–25 kg | Up to 0.4 × 0.3 × 0.3 m | Single manipulator |
| M | Drives, converters, battery modules | 25–150 kg | Up to 1.0 × 0.7 × 0.6 m | Captured robotic exchange |
| L | Thruster strings, pump skids, furnace cartridges | 150–1,000 kg | Up to 2.5 × 1.5 × 1.5 m | Two-point capture and guided translation |
| XL | Array wings, radiator sections, whole robots | 1–5 t | Asset-specific, usually folded | Anchored handling fixture or servicing vehicle |

In microgravity, low weight does not mean easy handling. Replacement motions must be sized for inertia, reaction loads, flexible-body dynamics, and anchorage limitations.

### 4.2 Mechanical interface requirements

Recommended starting requirements:

- At least two independent capture features on modules above 25 kg.
- Captive fasteners and captive connector covers.
- No loose washers, cut wire, or discarded locking devices.
- Visible and machine-readable identity markings.
- Alignment features that engage before power or fluid connections.
- Coarse robotic approach tolerance of approximately ±10 mm and ±3°, followed by guided seating.
- Final alignment determined by the connector or coupling design; precision optical modules use a separate kinematic interface.
- Torque and seating-force verification during installation.
- Tool access from the planned service direction, verified with representative manipulators and protective enclosures.

Modules must be removable without disconnecting unrelated healthy systems wherever practical.

### 4.3 Electrical and data interfaces

- **Primary site distribution:** 1–3 kV DC reference architecture.
- **Service control power:** standardized isolated 28 V and/or 48 V rails.
- **Power exchange:** de-energized module replacement; no routine live mating of exposed high-voltage connectors.
- **Data:** redundant deterministic Ethernet or equivalent qualified network, with a low-rate independent safe-mode interface.
- **Identification:** serial number, hardware revision, firmware compatibility, operating limits, life history, and acceptance status.
- **Isolation:** positive verification of electrical discharge before tool access.
- **Compatibility:** connector keying must prevent iodine/argon, voltage-class, and incompatible firmware substitutions.

### 4.4 Thermal and fluid interfaces

Use separate interface families for:

1. Dry electronics with conductive thermal mounts.
2. Liquid-cooled power modules.
3. High-temperature process assemblies.
4. Propellant-exposed hardware.

Recommended features include:

- Double isolation where opening a loop could disable the plant.
- Leak checking before reconnecting a replacement section.
- Captured residual fluid and contamination monitoring.
- Segmentable radiator circuits.
- Standard radiator mechanical mounts where temperatures and coolant chemistry permit.

A universal coolant connection across the plant, batteries, and tug propulsion is **not** recommended.

### 4.5 Storage and preservation

| Storage mode | Contents | Requirements |
|---|---|---|
| Passive protected storage | Structural parts, compatible dry mechanical assemblies | Dust exclusion, thermal cycling qualification, positive restraint |
| Conditioned electronics storage | Avionics, sensors, selected seals and polymers | Controlled temperature, radiation protection where justified |
| Battery storage | Battery replacement modules | Supplier-defined temperature and state of charge; periodic health checks |
| Propulsion-component storage | Thrusters, feed modules, sensitive materials | Chemistry-specific cleanliness and isolation |
| Clean process storage | Instrumentation and contamination-sensitive components | Sealed containers with witness samples |

Preliminary allowance:

- **Storage and exchange equipment delivered mass:** 5–12 t.
- **Conditioning and monitoring power:** approximately 5–20 kW average, strongly dependent on local thermal conditions.
- **Maintenance peak electrical load:** approximately 20–60 kW, excluding large process equipment already owned by the plant.

These loads must enter bom-0-5 power and thermal sizing; they are not free auxiliary capacity.

---

## 5. Initial quantities and replacement holdings

The following quantities describe a **provisional initial inventory and five-year procurement envelope**. They are not all delivered at once.

### 5.1 Mining and handling robots

For a 24-unit active fleet:

- **2–4 complete spare robots**, preferably fully commissioned before storage.
- Replacement actuator/drive modules equal to approximately **15–30% of installed positions initially**, then replenished from observed wear.
- **2–3 years of forecast abrasive wear parts** at the asteroid.
- Battery replacement capacity equal to **20–40% of installed robot battery energy initially**.
- Spare tether sections, reels, abrasion guards, end effectors, cameras, and high-voltage connector assemblies.

For 10–50 kWh onboard batteries, 24 robots contain approximately 0.24–1.2 MWh of battery capacity. The initial robot battery spare provision is therefore approximately **0.05–0.48 MWh**, depending on the selected fleet.

**Design preference:** Exchange contaminated end effectors as cartridges. Do not make manipulator joints carry uncontained abrasive processing loads.

### 5.2 Processing plant

For three partly independent trains:

- One replacement for each critical unique drive, feed mechanism, or control function that lacks an operational bypass.
- **1–2 complete replacement furnace or hot-zone cartridges**, if selected metallurgy uses this architecture.
- **2–4 replacement feed/beneficiation modules**, adjusted to actual train commonality.
- Multiple campaigns of liners, screens, cutters, seals, and dust-handling elements.
- Spare temperature, composition, mass-flow, and product-quality instrumentation.

Wear-part mass cannot yet be credibly fixed without representative material tests. The first industrial procurement should be gated by measured **wear per tonne processed**, including beneficiation rejects—not merely product output.

### 5.3 Cargo tugs

For the 12-tug sizing case:

- Replaceable thruster/cathode assemblies corresponding initially to approximately **10–20% of fleet-installed strings**.
- Power-processing and control spares corresponding to approximately **8–15% of installed replaceable units**.
- Spare attitude-control hardware, sensors, reaction-control valves where applicable, and communications electronics.
- **One complete uncommitted replacement tug option**, priced and contractually available, but not automatically purchased under this line.

Installed string counts must be derived from qualified thruster life. A 1.5 MWe tug may contain several independently isolated propulsion strings; “one spare thruster per tug” is not an adequate specification.

Whole-tug attrition is not automatically covered by an LRU inventory. The gate review must explicitly choose between:

- Operational fleet margin in bom-0-4.
- A funded whole-tug replacement under bom-0-14.
- Reduced contractual delivery after a loss.

### 5.4 Power and thermal systems

Across site and tug assets:

- Approximately **1.5–2.5 MWe of replacement array nameplate capacity at 1 AU**, initially divided between delivered and Earth-held stock.
- **10–20% of installed converter and switching modules**, differentiated by criticality.
- Approximately **0.2–0.6 MWh of site battery replacements**, in addition to robot battery stock.
- **5–10% of replaceable radiator area**, concentrated on standardized sections, isolation valves, and vulnerable interfaces.
- Spare deployment drives, harness sections, sensors, and power-distribution connectors.

Replacement arrays should be purchased in compatible blocks rather than as unique full spacecraft wings wherever the original asset design permits.

The array quantity is a planning allowance for damage, failed deployment, and replacement—not an assertion that ordinary degradation requires wholesale panel replacement within five years.

### 5.5 Mass estimate

| Hardware family | Five-year procurement mass |
|---|---:|
| Robot replacements and robot spares | 10–22 t |
| Plant replacement equipment and wear parts | 25–55 t |
| Tug propulsion and bus spares, excluding arrays | 10–24 t |
| Power, storage, and thermal replacement hardware | 18–45 t |
| Shared avionics, sensors, and communications modules | 2–5 t |
| Inventory fixtures, preservation, and exchange tools | 5–12 t |
| **Unpackaged total** | **70–163 t** |
| **Planning delivered mass including packaging allowance** | **80–180 t** |

Not all hardware must leave Earth. Approximately **45–60% of the five-year hardware mass** is a reasonable initial deployment planning allowance; the remainder is held, procured, or replenished later.

These are logistics inputs to bom-0-8, not launch costs included here.

---

## 6. Reliability and inventory sizing

### 6.1 Availability objectives

I recommend the following initial programme requirements:

- **Site productive availability:** 85–92%, excluding planned external power or communications constraints.
- **Delivery-system availability:** demonstrate sufficient fleet capacity to meet the signed delivery schedule with scheduled maintenance and ordinary failures.
- **Spare stockout contribution:** less than 1–2 percentage points of annual production unavailability.
- **Criticality-A item stockout probability:** target below 0.5–1% per replenishment interval.

These are proposed allocation targets. They require a system model; multiplying optimistic subsystem availability figures is not sufficient.

### 6.2 Inventory calculation

For an initial screening calculation:

\[
\lambda_i = N_i h_i T_L / MTBF_i
\]

where:

- \(N_i\) is the number of operating units.
- \(h_i\) is operating hours per year.
- \(T_L\) is effective replenishment lead time in years.
- \(MTBF_i\) is operating-hour mean time between failures.

Example:

- 12 operating units.
- 4,000 operating hours per year each.
- 1.25-year replenishment interval.
- 30,000-hour MTBF.

Expected demand is two units. Under an independent Poisson model, six spares provide approximately a **99.55% probability that demand does not exceed stock** during that interval.

That is a useful screening result, not a complete reliability claim. The final model must include:

- Wear-out rather than constant failure rates.
- Common-cause defects.
- Dust and thermal exposure correlation.
- Maintenance-induced failures.
- Failed replacement attempts.
- Shipment loss and missed launch opportunities.
- Manufacturing lead time and obsolescence.
- Cannibalization and repair yield.

### 6.3 Maintenance-time targets

Initial demonstrator targets:

| Operation | Target elapsed time under suitable access conditions |
|---|---:|
| Small electronics LRU exchange | 2–6 hours |
| Robot drive or battery exchange | 4–12 hours |
| Process cartridge replacement | 12–48 hours |
| Tug propulsion-string replacement at service location | 24–72 hours |
| Large array/radiator replacement | 2–7 days |

These include isolation, handling, installation, and checkout—not interplanetary transport.

---

## 7. Autonomy, control, and communications

### 7.1 Required autonomy

The maintenance system must independently:

1. Detect and classify faults.
2. Enter a stable isolated state.
3. Preserve diagnostic evidence.
4. Identify compatible available replacements.
5. Check whether the operation is authorized.
6. Execute verified exchange steps.
7. Stop safely on unexpected force, leakage, arcing, or geometry.
8. Perform post-installation tests.

Destructive disassembly, opening a major fluid loop, and changes to plant safety logic require ground authorization unless specifically pre-authorized for immediate hazard control.

### 7.2 Control architecture

Use:

- Deterministic safety interlocks.
- Model-based fault detection.
- Bounded robotic task execution.
- Vision and force/torque sensing.
- Independent verification of isolation and connector seating.

Learning-based perception may support inspection and localization. It should not be the sole authority for high-voltage isolation, containment opening, or irreversible tool actions.

### 7.3 Communications and records

Do not assume continuous low-latency Earth control.

Planning allocation for maintenance traffic:

- Approximately **0.1–2 GB/day averaged across routine activity**, depending on inspection policy.
- Event-driven diagnostic packages of approximately **1–20 GB**.
- Store-and-forward handling for high-resolution imagery.
- Low-rate fault summaries prioritized over bulk video.

The final allocation belongs in bom-0-9. These volumes are engineering assumptions, not a network commitment.

Every installed and stored module requires a persistent “digital traveler” containing acceptance data, exposure history, operating hours, repairs, firmware, and remaining-life estimate.

---

## 8. Manufacturing and supply-chain approach

### 8.1 Procurement strategy

- Qualify at least two sources for selected high-consequence electronics and mechanical interfaces where economically justified.
- Reserve manufacturing capacity for long-lead parts rather than buying all five-year inventory immediately.
- Make lifetime buys only where obsolescence risk exceeds storage and capital penalties.
- Procure initial and spare units from more than one accepted lot for common-cause risk control.
- Require supplier change notification and configuration traceability.

A low-price substitute that fits mechanically but has different firmware, outgassing, insulation, or propellant compatibility is not interchangeable.

### 8.2 Acceptance and storage testing

Each flight spare should receive:

- Electrical functional and insulation tests.
- Appropriate vacuum and thermal acceptance exposure.
- Leak tests where relevant.
- Connector mating verification.
- Software/firmware compatibility checks.
- Cleanliness verification.
- Baseline diagnostic signature capture.

Storage plans must include battery inspections, seal shelf-life tracking, and periodic functional checks. “Unused” is not synonymous with “flight-ready.”

### 8.3 Local manufacture

Permit local production first for noncritical items with straightforward inspection:

- Guards and covers.
- Tool adapters.
- Simple brackets.
- Handling fixtures.
- Temporary mechanical restraints.

Do not credit local metal production as a solution to precision-spares dependence during 0B.

---

## 9. Development roadmap and readiness

### 9.1 Phase 0A work

Although bom-0-14 is primarily a 0B procurement item, its architecture must be proven during 0A.

| 0A activity | Indicative cost | Accounting owner |
|---|---:|---|
| Reliability model, criticality ranking, interface definition | $4–8M | bom-0-11, with organization support |
| Exchange interfaces, tools, and ground demonstrations | $8–18M | bom-0-11 |
| Integrated pathfinder maintenance demonstration | $8–19M incremental allocation | bom-0-12 |
| **Total associated 0A effort** | **$20–45M** | **Not added again to bom-0-14** |

These are cross-programme planning allocations, not additional independent budget lines.

### 9.2 Readiness position

Many component technologies have substantial terrestrial or spacecraft heritage. That does **not** establish readiness of autonomous industrial maintenance at an asteroid.

The least mature combinations are likely to be:

- Dust-exposed robotic high-voltage module exchange.
- Anchored handling of large flexible modules.
- Repeated maintenance of microgravity beneficiation and metallurgy equipment.
- Long-storage activation after deep-space environmental exposure.
- Autonomous restoration after partially completed or failed exchanges.

Their actual TRL must be established by evidence, not assigned from component heritage.

### 9.3 Gates

**Internal 0A milestones: TRL 4–5**

- Representative dusty-vacuum connector trials.
- Repeated robotic exchange tests.
- Storage and activation trials.
- Demonstrated recovery from jammed or incorrectly seated modules.
- Initial reliability and inventory simulation.

**KDP-0B: TRL 6 in a relevant environment, without waivers for project-ending technologies**

Required evidence should include:

- Integrated exchange and recommissioning of critical modules.
- Representative contamination, thermal, electrical, and mechanical conditions.
- Demonstrated failure recovery—not only successful nominal replacement.
- A supportable inventory and resupply plan for the selected target.
- No unproven maintenance function whose failure ends the project.

If a critical exchange operation cannot reach the required readiness, redesign the asset for demonstrated lifetime or installed redundancy before committing to production.

---

## 10. Cost estimate

### 10.1 Conditional five-year 0B procurement

Constant 2026 dollars; ordinary expected replacements included.

| Cost element | Range |
|---|---:|
| Robot replacement hardware and wear spares | $80–180M |
| Plant replacement modules and process wear parts | $110–240M |
| Tug propulsion and bus replacement hardware, excluding arrays | $180–420M |
| Replacement power, batteries, and thermal hardware | $120–280M |
| Shared avionics, sensors, and communications spares | $50–120M |
| Storage equipment, preservation, fixtures, and exchange tooling | $40–100M |
| Spare acceptance, refurbishment contracts, configuration verification, and supplier inventory services | $70–210M |
| **Total bom-0-14** | **$650–1,550M** |

The endpoints are planning envelopes, not statistically derived confidence bounds.

### 10.2 Basis and sensitivities

Major drivers are:

1. **EP lifetime and replacement frequency.**
2. **Actual abrasive wear per tonne processed.**
3. **How much fleet electrical hardware is replaceable.**
4. **Target-specific replenishment time.**
5. **Required delivery assurance.**
6. **Commonality achieved without common-cause vulnerability.**

Array hardware should use the reassessment’s **$30–150/W hardware range**, with launch separate. For example, 1.5–2.5 MW of replacement array hardware alone spans approximately **$45–375M** if quantity and unit-price extremes are combined.

Consequently, the $120–280M power-and-thermal row assumes a narrower compatible procurement case within those broad extremes. If high array quantity and high unit pricing occur together, that row—and the programme estimate—must increase. They cannot be hidden inside contingency.

### 10.3 Procurement phasing

A reasonable starting profile is:

- **Initial inventory and enabling hardware:** roughly 45–60% of total hardware commitment.
- **Rolling replenishment and refurbishment:** roughly 40–55%, released against operating evidence.

These percentages describe procurement timing, not a requirement to launch the same fraction of total cost.

### 10.4 Position relative to round-2 proposals

**Claude: $0.5–1.5B.**  
Broadly consistent with the upper and central portions of this proposal. I would not adopt $0.5B as the protected baseline before wear and EP life are demonstrated. It leaves little room for robot replacements, fleet-wide power spares, or a long resupply interval.

**GPT: $0.8–2.5B excluding robots.**  
A defensible high-risk envelope, but too high as the default procurement case if it implicitly includes duplicate tugs, launch, qualification, or contingency. Its upper end may become appropriate with poor thruster life, high wear, expensive arrays, or purchases of whole replacement spacecraft.

**Gemini: 20% inventory buffer.**  
Reject as the primary sizing rule. Twenty percent may be excessive for durable structure and inadequate for a unique high-wear component. Inventory must be item-specific and lead-time-dependent.

---

## 11. Principal risks and mitigations

| Risk | Consequence | Recommended mitigation |
|---|---|---|
| Common-cause component defect | Fleet-wide grounding despite large inventory | Lot diversity, selected alternate designs, rapid requalification path |
| Dust-damaged connectors | Repeated failed replacements | Protected interfaces, clean mating volumes, representative cycle tests |
| Underestimated abrasive wear | Frequent plant shutdown | 0A wear testing, cartridge design, large early wear-part holdings |
| Failed autonomous exchange | Healthy spare cannot restore service | Recovery fixtures, reversible procedures, demonstrated fallback states |
| Long resupply delay | Extended production loss | Site stock sized to actual delivery opportunities |
| Battery degradation in storage | Spare unavailable when needed | Controlled storage and periodic health checks |
| Tug failure away from service location | Spare inaccessible | Installed fault tolerance and trajectory-level rescue analysis |
| Spare becomes obsolete or incompatible | Inventory loses value | Configuration control and interface compatibility testing |
| Local repair creates contamination | Product rejection or hazardous debris | Enclosed repair operations and captured waste |
| Budget reduction removes “unused” stock | Reliability silently degrades | Tie inventory changes to contractual delivery-risk analysis |

### Contamination and debris

All replacement activity should satisfy ALARP and the interim programme ceiling once established through modelling, tests, and the licensing state.

For design development, require:

- Captive hardware.
- Captured cuttings and worn parts.
- Enclosed abrasive cleaning.
- No intentional release of failed modules.
- Positive inventory reconciliation after maintenance.
- Verified isolation before opening contaminated equipment.

A single mass-retention percentage is not sufficient: escaped particle size, velocity, chemistry, and trajectory matter. Detailed quantitative thresholds and compliance infrastructure remain under bom-0-15.

---

## 12. Open engineering questions before KDP-0B

1. **What are the actual replenishment opportunities for the selected asteroid?**  
   This may dominate inventory more than nominal component reliability.

2. **Which plant components exhibit wear proportional to feed mass rather than operating hours?**

3. **What thruster, cathode, and feed-system life is demonstrated at the selected operating point and propellant?**

4. **Can tugs reliably present propulsion modules for robotic replacement?**

5. **How much processing capacity remains after one train or a shared utility fails?**

6. **Which replacement modules genuinely benefit from commonality across plant, robot, and tug assets?**

7. **What fraction of radiator and array damage is repairable by module exchange?**

8. **Which stored components require conditioning power, and what happens after prolonged power loss?**

9. **What product-quality requalification is required after plant maintenance?**

10. **How much delivery shortfall can Phase 1 tolerate, and when should Earth-supplied material be activated as fallback?**

11. **Does the economics gate still close when realistic wear, replacement hardware, delivery, and operating costs are included?**

12. **Which maintenance functions are project-ending technologies under D-02?**

---

## 13. Final recommendation

Approve the **0A reliability, interface, and maintenance-demonstration work**, funded through the existing NRE and pathfinder lines. Do not authorize bulk 0B spares procurement yet.

At KDP-0B, require:

- A configuration-controlled parts and maintenance architecture.
- Demonstrated robotic replacement of critical modules.
- Target-specific lead-time and inventory modelling.
- Qualified EP and process-life evidence.
- An explicit whole-tug-loss policy.
- A five-year replacement budget linked to signed Phase 1 demand.
- A fallback plan using Earth-supplied material if production availability or metallurgy does not meet the contract.

**My preferred 0B baseline is a $0.65–1.55B modular spares programme, with approximately 80–180 t of five-year replacement hardware and packaging, delivered progressively.** Its purpose is not to make every asset immortal. It is to make ordinary failures recoverable without crew, without an emergency redesign, and without turning a single missing precision component into the end of Phase 0.