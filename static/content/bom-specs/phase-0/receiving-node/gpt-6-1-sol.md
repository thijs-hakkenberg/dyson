---
bomId: "bom-0-13"
itemName: "Phase 1 Receiving Node (SEL1)"
itemSlug: "receiving-node"
modelId: "gpt-6-1-sol"
modelName: "GPT-6.1 Sol"
generated: "2026-10-20"
phase: "phase-0"
---

# Technical proposal: Phase 1 Receiving Node at Sun–Earth L1

**Item:** bom-0-13  
**Programme phase:** 0B, with requirements and risk-reduction work during 0A  
**Quantity:** One operational receiving node, assembled from replaceable modules  
**Location:** Sun–Earth L1-region halo or Lissajous orbit, provisionally; subject to the joint Phase 0/Phase 1 location decision at KDP-0B  
**Recommended capacity:** Approximately **1 kt/year of packaged Fe-Ni products**, with an operating envelope of **0.6–2.5 kt/year**  
**Recommended node procurement allowance:** **$300–550 million**, excluding separately budgeted launch, programme-level technology development, operations, replenishment propellant, spares, and contingency  
**Confidence:** Low-to-medium for mass and power; low for cost and full-scale cargo-handling maturity

All costs below are planning estimates in **constant 2026 US dollars**, not vendor quotations. Performance numbers are proposed requirements or sizing assumptions unless explicitly identified otherwise.

---

## 1. Recommendation

Build a **small, uncrewed logistics terminal**, not a processing station, propellant depot, or habitat.

Its functions should be limited to:

1. Accepting a tug-delivered, standardized cargo assembly.
2. Securing it without releasing loose material.
3. Verifying identity, condition, and product acceptance documentation.
4. Performing limited, enclosed inspection and sampling.
5. Buffering inventory between irregular asteroid deliveries and Phase 1 consumption.
6. Transferring standardized cargo packages to Phase 1 transport or construction equipment.
7. Providing custody, inventory, and interface services.

The node should **not** melt metal, refine ore, produce propellant, or routinely unpack bulk material into open space. Primary processing remains at the asteroid.

The most important design decision is to make the **transport fixture and product packaging part of the logistics architecture from the outset**. A receiving node cannot economically compensate for arbitrary product shapes, incompatible grapples, or poorly restrained cargo.

### Design philosophy

- **Passive cargo, active terminal:** Product packages should be mechanically simple, restrained, and individually identifiable. Actuation, inspection, and routing reside primarily on the node.
- **Separate berthing from structural storage:** The arrival interface handles capture; dedicated structural latches carry long-duration cargo loads.
- **No tug-sized infrastructure:** A MW-class tug does not require a MW-class receiving node. The tug remains self-powered.
- **No open handling of chips, powder, or swarf.**
- **Modular replacement rather than internal repair:** Electronics, actuators, inspection equipment, propulsion units, and power equipment should be robotic orbital-replacement units.
- **Demand-led buildout:** Install the second inventory rack only when signed Phase 1 demand and delivery cadence justify it.
- **SEL1 is a reference case, not an irreversible assumption:** Keep cargo and docking interfaces usable at another cislunar or heliocentric destination.

---

## 2. Scope and assumptions

### 2.1 Included in bom-0-13

- Receiving-node flight structure.
- Installed cargo racks and node-side restraint mechanisms.
- Node-side arrival, berthing, and handoff interfaces.
- Robotic handling equipment.
- Enclosed inspection and sample-handling equipment.
- Node power, thermal control, avionics, navigation sensors, and propulsion hardware.
- Flight communications terminals.
- Initial assembly integration and acceptance testing.
- Node-specific detailed design and manufacturing engineering.

### 2.2 Excluded or charged elsewhere

| Scope | Accountable item |
|---|---|
| Mining and asteroid processing | bom-0-2 / bom-0-3 |
| Cargo tug and tug-side flight equipment | bom-0-4 |
| Product packaging installed at the asteroid | bom-0-3, with common interface control |
| Earth launch and transfer to the operating orbit | bom-0-8 |
| Ground communications infrastructure and service charges | bom-0-9 |
| Mission operations and traffic management personnel | bom-0-10 |
| Programme-level technology maturation and qualification campaigns | bom-0-11 |
| 0A flight pathfinder | bom-0-12 |
| Replacement units and replenishment inventories | bom-0-14 |
| Programme debris/contamination analysis and independent verification | bom-0-15 |
| EP propellant procurement and replenishment | bom-0-16 |
| Programme contingency | bom-0-17 |

Physical containment hardware and flight radios remain part of the node; programme-wide verification and ground services do not. These boundaries require a formal cost-account dictionary to prevent double charging.

### 2.3 Sizing assumptions

| Parameter | Proposed basis |
|---|---|
| Primary product | Native/reduced Fe-Ni, consolidated into stable shapes |
| Contracted annual throughput | Approximately 0.6–1.0 kt/year initially |
| Nominal design throughput | 1.0–1.5 kt/year |
| Upper operating envelope | 2.5 kt/year, subject to traffic and downstream demand |
| Tug-delivered cargo assembly | 150–300 t of product, plus packaging/fixtures |
| Individual handling unit | 5–20 t |
| Nominal inventory capacity | 600 t of product |
| Growth inventory capacity | 900 t of product |
| Design life | 10 years, with replaceable equipment |
| Crew | None |
| Cryogenic storage | None |
| Product melting/refining | None |

The 5–20 t handling-unit range is a recommendation, not an approved Phase 1 requirement. If Phase 1 needs large, continuous structural members, transport fixtures must support them without forcing unnecessary cutting and rejoining.

---

## 3. Operational concept

### 3.1 Delivery cadence

At 1 kt/year:

- Approximately **4–7 loaded arrivals/year**, depending on payload.
- A 600 t inventory corresponds to roughly **seven months of average consumption**.

Across the full 0.6–2.5 kt/year envelope:

- Approximately **2–17 arrivals/year**.
- At the high end, arrivals may occur every three to four weeks.

The terminal should support a nominal cargo-transfer campaign in **3–10 days**, excluding extended quarantine or disputed product acceptance.

Its capacity should be specified in both tonnes and **handling operations**. A shipment of 150 small units can require much more terminal time than an equal mass in ten large fixtures.

### 3.2 Arrival sequence

1. **Pre-arrival acceptance**
   - Receive manifest, material certificates, packaging history, center-of-mass estimate, and tug health information.
   - Reserve an arrival window and confirm inventory capacity.
   - Upload an independently checked approach plan.

2. **Distant inspection**
   - Inspect the cargo assembly from hundreds of metres to kilometres.
   - Confirm package restraint, appendage condition, and absence of visible shedding.
   - Identify failed restraints before close approach.

3. **Controlled proximity operations**
   - Tug main EP is inhibited inside a geometry-derived plume exclusion region.
   - Dedicated proximity-control propulsion performs final approach.
   - The node can reject the approach autonomously.

4. **Low-energy capture**
   - Capture a standardized transport fixture, not the product surface.
   - Establish structural latches and independent latch-state confirmation.
   - Connect data and optional low-power services.

5. **Custody transfer**
   - Transfer cargo loads onto node storage interfaces.
   - Verify restraints before releasing tug-side attachments.
   - Separate the tug from the cargo assembly.

6. **Inspection and inventory**
   - Inspect accessible surfaces.
   - Sample only where contractually required and only inside a containment enclosure.
   - Record location, condition, and acceptance status.

7. **Phase 1 handoff**
   - Transfer packaged material to a construction vehicle or downstream staging fixture.
   - Keep the node outside any active industrial dust or plume environment.

### 3.3 Emergency rule

**Loss of node availability must not force cargo disposal.**

Each tug must be capable of holding a safe relative orbit or diverting to an approved holding trajectory for a contractually specified period. A provisional requirement is **30–90 days of delayed acceptance**, supported by tug consumables and power capability—not by terminal emergency storage alone.

---

## 4. Physical architecture

```text
                   Sun-facing array wings
                  /                      \
          [Power/Avionics]          [Power/Avionics]
                    \                /
                 ===== Utility spine =====
                 |                       |
        [Arrival/capture]       [Phase 1 handoff]
                 |                       |
          [Inspection cell]---[Robotic transfer rail]
                 |                       |
          [Inventory rack A]      [Inventory rack B]
             ~300 t                   ~300 t
                                         |
                                [Optional growth rack]
                                     ~300 t

    Radiators: separated from cargo and thruster/plume sightlines
    Propulsion: distributed pods with unloaded and loaded configurations
```

The diagram is functional, not a final arrangement. The selected geometry must maintain:

- Clear tug approach and abort corridors.
- Unobstructed array illumination.
- Acceptable radiator views.
- Controllable center-of-mass migration.
- Access to every critical replaceable unit.
- No single manipulator position that blocks both arrival and downstream handoff.

### 4.1 Principal specifications

| Attribute | Recommended range / target |
|---|---|
| Main utility spine | 20–35 m |
| Overall body envelope, excluding arrays | Approximately 35–60 m |
| Solar-array tip-to-tip span | Approximately 55–85 m |
| Initial flight dry mass | 25–40 t, including design growth allowance |
| Installed product inventory capacity | 600 t |
| Growth inventory capacity | 900 t |
| Maximum design loaded mass | Approximately 1,100–1,400 t, including a visiting tug where applicable |
| Solar generation | 100–150 kW beginning of life |
| Usable end-of-life generation requirement | 75–110 kW |
| Typical electrical demand | 25–50 kW |
| Short-duration operational peak | 70–100 kW |
| Battery storage | 100–250 kWh |
| Arrival positions | One active, one reserved geometric corridor |
| Downstream handoff position | One |
| Robotic handling systems | One main transporter/manipulator plus one smaller service arm |
| Nominal payload-handling unit | 5–20 t |
| Flight life | 10 years |

The 1,100–1,400 t design loaded mass is an **interface load case**, not a commitment to store that much product. It covers node hardware, inventory, packaging, and an attached transport vehicle.

### 4.2 Preliminary mass allocation

| Subsystem | Estimated mass |
|---|---:|
| Spine, racks, structural joints, and restraints | 6–9 t |
| Capture, berthing, and handoff hardware | 2–3 t |
| Robotic handling and inspection equipment | 3–5 t |
| Arrays, deployment mechanisms, and power distribution | 3–5 t |
| Batteries | 1–2 t |
| Thermal control | 1–2 t |
| Propulsion hardware and tanks, excluding replenishment propellant | 1–2 t |
| Avionics, sensors, harness, communications, local shielding | 2–3 t |
| **Allocated subtotal** | **19–31 t** |
| **Design growth allowance** | **6–9 t** |
| **Planning dry mass** | **25–40 t** |

Product-side transport fixtures are additional. Their mass must be carried in the transport economics rather than disappearing into the node’s dry-mass estimate.

---

## 5. Orbit and attitude

### 5.1 Orbit selection

Do not specify the node as sitting “at L1.” Sun–Earth L1 is an unstable equilibrium region, not a stationary parking location.

The reference should be a **numerically optimized halo or Lissajous orbit around Sun–Earth L1**, selected jointly with:

- NEA departure opportunities.
- Tug arrival energy and schedule.
- Phase 1 transfer requirements.
- Earth communications geometry.
- Eclipse avoidance.
- Long-term collision and disposal behavior.
- Licensing and third-party mission coordination.

A provisional stationkeeping allocation is **5–20 m/s/year**. Budget **30–60 m/s/year total translational Δv** for preliminary propulsion sizing, including navigation corrections, avoidance maneuvers, and operational reserve. These are assumptions pending integrated trajectory analysis.

### 5.2 Attitude architecture

Use a **Sun-referenced, slowly varying attitude** with cargo concentrated near the structural plane.

Avoid frequent slews of the loaded terminal. Large-angle attitude changes with several hundred tonnes of inventory drive:

- Flexible-body excitation.
- Manipulator hold requirements.
- Thruster consumption.
- Solar-array and radiator articulation demands.

Control-moment gyroscopes are not recommended as the baseline. Their stored momentum and saturation management become unattractive with changing cargo distributions. Use modest internal attitude actuators for quiet operations, supplemented by distributed thrusters.

---

## 6. Cargo structures and handling

### 6.1 Product acceptance form

Accept:

- Consolidated ingots or billets.
- Mechanically bundled bar or plate.
- Sintered or otherwise stable preforms.
- Finished structural stock where Phase 1 has defined its use.

Reject routine delivery of:

- Loose powder.
- Uncontained chips.
- Unstabilized porous material prone to shedding.
- Ore requiring further beneficiation.
- Uncharacterized mixed scrap.

The material specification should identify:

- Fe/Ni composition and acceptable alloying elements.
- Limits on sulfur, phosphorus, carbon, oxygen, and entrained slag.
- Dimensions and tolerances.
- Mechanical and thermal properties relevant to Phase 1 fabrication.
- Volatile and particulate release behavior.
- Sampling method and lot traceability.
- Required delivery date and acceptance remedies.

**A universal “high-purity Fe-Ni” requirement is not sufficient.** Structural feedstock, weld feedstock, and electrical or magnetic applications may need materially different specifications.

### 6.2 Interfaces

Each cargo unit should provide:

- Two independent load paths or one primary load path with a separate positive retention device.
- Standardized grapple and hard-mount geometry.
- Passive visual fiducials.
- Machine-readable identity.
- Defined center-of-mass uncertainty.
- Tool access that does not require removing adjacent inventory.
- A restraint state readable without relying solely on software.

Routine cargo should not require fluid connections.

### 6.3 Handling mechanics

The node should not “lift 300 tonnes” with a conventional long-reach arm. Instead:

- Capture the complete transport fixture.
- Secure it structurally.
- Move individual 5–20 t units on a rail-guided carriage or closely supported manipulator.
- Keep large masses near structural reaction points.

Provisional handling limits:

| Parameter | Proposed value |
|---|---:|
| Final approach relative speed | ≤0.02 m/s |
| Routine fine positioning speed | 0.002–0.02 m/s |
| Routine cargo acceleration | 0.0005–0.003 m/s² |
| Manipulator commanded interface force | Approximately 0.1–1 kN, operation dependent |
| Capture/berthing design transient loads | Approximately 5–20 kN, pending coupled dynamics |

For a 300 t arriving assembly at 0.02 m/s, relative kinetic energy is only **60 J**, but momentum is **6,000 N·s**. Low energy does not eliminate the need to manage momentum exchange, misalignment, flexible structures, and local latch loads.

---

## 7. Power, thermal control, and propulsion

### 7.1 Power

The terminal needs tens of kilowatts, not megawatts.

| Load | Typical operating range |
|---|---:|
| Avionics, sensors, and communications | 3–6 kW |
| Thermal management and heaters | 5–15 kW |
| Handling mechanisms | 5–20 kW while operating |
| Inspection equipment | 2–8 kW |
| Electric propulsion | 5–20 kW when operating |
| Miscellaneous and conversion losses | 3–8 kW |

Install **100–150 kW BOL** to preserve useful end-of-life margin and allow compatible simultaneous operations.

At an assumed net deployed-array output of **200–250 W/m² at beginning of life**, array area is approximately **400–750 m²**. Final area depends on degradation, operating temperature, packing, and illumination geometry.

Use:

- **300–600 VDC primary distribution** as a trade-study range.
- Isolated low-voltage buses for avionics and mechanisms.
- Sectionalized power distribution with fault isolation.
- Battery-backed independent safing electronics.

The node should not provide propulsion power to the visiting MW-class tug.

### 7.2 Thermal control

No active bulk product cooling is included.

Product delivery temperature must be contractually limited; a provisional handling envelope is **250–350 K**, with tighter local limits where packaging, electronics, or contact surfaces require them.

Estimated actively transported waste heat:

- **15–35 kW** in ordinary operation.
- Higher short-duration loads managed by scheduling and thermal inertia.

Provide approximately **100–180 m² of effective radiator emitting area**, depending on operating temperature, emissivity, mutual view factors, and solar shielding. A 300 K radiator emits about 460 W/m² before emissivity and environmental deductions; usable net rejection is substantially lower.

Thermal distortion of restrained metal stock may dominate interface design more than its equilibrium temperature.

### 7.3 Propulsion

Use a mixed architecture:

1. **Electric propulsion** for planned translational corrections.
2. **Fast-response noncryogenic thrusters** for attitude control, collision response, and operations where low-thrust EP is unsuitable.

EP remains subject to D-05:

- **Cost iodine as reference.**
- **Carry argon as alternate.**
- Make no irreversible propellant selection before supply, compatibility, plume, and life-test evidence is available.

Provisional EP installation:

- Two independently isolatable thruster strings.
- Approximately **5–10 kW per string**.
- Delivered thrust and specific impulse set by the eventual technology selection.
- Physical plume keep-out zones protecting cargo, radiators, arrays, and visiting vehicles.

For preliminary logistics, annual EP consumption is approximately **0.2–2 t**, assuming a 300–1,000 t operating mass, 30–60 m/s annual Δv allocation, and 2,500–3,500 s specific impulse. Actual demand should be calculated from time-varying loaded mass, not maximum mass applied throughout the year.

The fast-response propulsion reserve requires a separate maneuver-based sizing model.

---

## 8. Inspection, containment, and inventory control

### 8.1 Inspection capability

Include:

- Visible and near-infrared imaging.
- Thermal imaging.
- Close-range geometry measurement.
- Instrumented restraint checks.
- Enclosed sample preparation.
- Limited compositional screening.

Possible compositional instruments include X-ray fluorescence and laser-induced breakdown spectroscopy, but neither should be treated as a complete substitute for validated process certificates and representative lot sampling.

Routine acceptance should be **certificate-led, sensor-verified**, not a comprehensive requalification of every ingot.

### 8.2 Containment requirements

D-03 remains interim. Therefore, the following are **proposed engineering allocations, not approved licensing thresholds**:

- No intentional release of solid product or process debris.
- No routine exposed abrasive cutting, grinding, or powder transfer.
- Candidate routine escaped-solid allocation: **≤10⁻⁶ of handled product mass**, equivalent to **1 kg per 1 kt handled**.
- Separate event-based limits for large fragments and failed restraints.
- Capture and retain sample-preparation debris.

The mass-fraction metric is insufficient on its own: a small number of hazardous fragments can matter more than total released mass.

Verification cannot rely on subtracting two 300 t mass measurements to resolve gram-scale losses. It requires:

- Enclosed operation tests.
- Particle detection and witness surfaces.
- Restraint qualification.
- Failure-mode analysis.
- Validated release models.
- Independent inspection and licensing review.

The node must demonstrate ALARP with respect to both contamination and collision risk.

### 8.3 Inventory management

Track every unit through:

- Immutable lot identity.
- Acceptance status.
- Location and orientation.
- Estimated mass and center of mass.
- Restraint condition.
- Thermal history.
- Inspection results.
- Assigned downstream user.

A “mass delivered” programme metric should distinguish **arrived**, **accepted**, and **available for Phase 1 use**.

---

## 9. Autonomy, control, and communications

### 9.1 Autonomy

Sun–Earth L1 is roughly 1.5 million km from Earth, giving about **five seconds one-way light time**, before network and processing delays. Direct human teleoperation is unsuitable for contact operations.

Required autonomous functions:

- Relative navigation and approach monitoring.
- Local collision avoidance.
- Capture sequencing.
- Force-limited manipulation.
- Latch verification.
- Fault isolation and safe configuration.
- Inventory reconciliation.
- Recovery from interrupted transfers.

Ground operators authorize bounded activities; local control closes the mechanical and navigation loops.

### 9.2 Fault tolerance

- Independent safing controller.
- Redundant attitude and navigation sensing.
- Cross-strapped communications.
- Mechanically retained cargo after power loss.
- Transfer brakes or passive restraints that engage on loss of power.
- Fail-safe separation between accepted cargo and an arriving vehicle.
- No single software command capable of releasing all cargo restraints.

Target **≥95% annual service availability**, with receiving campaigns scheduled around maintenance. Require safe unattended operation for **at least 30 days**, including loss of routine ground contact.

### 9.3 Communications

Planning requirements:

| Service | Proposed capability |
|---|---|
| Routine telemetry and planning | 0.1–1 Mbps |
| Inspection and event downlink | 10–50 Mbps during scheduled contacts |
| Local tug/node links | Redundant links, approximately 1–20 Mbps |
| Emergency commanding | Independent low-rate link |
| Routine data generation | Approximately 10–100 GB/day, operation dependent |

These are substantially below the rejected multi-terabyte-per-day assumption.

Use RF as the safety-critical baseline. Optical communications may supplement bulk inspection downlink but should not be necessary for safe operations. Network access and ground staffing are purchased programme services, not assumed free DSN capacity.

---

## 10. Manufacturing and assembly

### 10.1 Production approach

Use Earth-manufactured flight hardware for the initial node. Do not make node construction dependent on successful asteroid metallurgy.

Preferred processes:

- Conventional metallic primary structures.
- Repeated rack and restraint modules.
- Qualified robotic joints.
- Replaceable electronics boxes.
- Mechanically simple passive fixtures.
- Modular deployable arrays.
- Protected, serviceable harness routes.

Avoid excessive deployment complexity solely to fit one launch. A two- or three-module assembly may be lower risk than a single highly articulated spacecraft.

### 10.2 Deployment

Expected delivery campaign:

- **Two to four launch payloads**, depending on launch capacity and fairing geometry.
- Robotic assembly in the destination orbit or in an intermediate staging orbit if system studies justify it.
- Delivery of initial commissioning cargo or inert test fixtures.
- Checkout in unloaded, partly loaded, and representative handling configurations.

No crew assembly is assumed.

### 10.3 Structural qualification

Ground gravity-offload testing cannot reproduce every aspect of a thousand-tonne flexible orbital system. Qualification therefore needs:

1. Component and joint proof tests.
2. Subscale or dynamically representative integrated tests.
3. High-fidelity flexible-body simulation.
4. Flight correlation.
5. Conservative initial operating limits.
6. Incremental expansion of the certified mass and handling envelope.

---

## 11. Development roadmap and readiness

### 11.1 0A: definition and discrimination

No production-node procurement should occur in 0A.

Recommended 0A work:

- Joint Phase 1 material and logistics requirements.
- Orbit and traffic study.
- Cargo interface standard.
- Coupled tug–cargo–node dynamics model.
- Capture and restraint breadboards.
- Representative low-speed handling tests.
- Contamination and inspection demonstrations.
- Pathfinder requirements.

**Node-attributable 0A effort:** approximately **$15–35 million**, charged primarily to bom-0-11 and bom-0-12 rather than duplicated in bom-0-13.

Internal 0A milestones target **TRL 4–5**, consistent with D-02.

### 11.2 KDP-0B requirements

The node cannot proceed solely because its components resemble existing spacecraft equipment.

Before commitment, demonstrate:

- Full logistics-interface compatibility.
- Relevant-environment capture and restraint performance.
- Autonomous handling with representative inertia and flexibility.
- Contained inspection and sampling.
- Acceptable coupled plume and contamination behavior.
- Safe behavior after interrupted operations.
- A credible operational and maintenance concept.

Every **project-ending technology** must meet **TRL 6 in a relevant environment, without waivers**.

The relevant-environment definition must be agreed before testing. A scaled flight demonstration is useful only if its dynamic and environmental similarity is sufficient to substantiate the required full-scale performance.

### 11.3 Indicative schedule

Relative to KDP-0B:

| Activity | Indicative timing |
|---|---|
| Detailed design and supplier qualification | Years 0–1.5 |
| Long-lead procurement and subsystem manufacture | Years 1–3 |
| Integration and acceptance testing | Years 2.5–4 |
| Launch, assembly, and commissioning | Years 4–5 |
| Operational handover | Before the first production cargo arrival |

These dates are not commitments. The demand gate should specify the first required **accepted, usable material delivery**, not merely the node launch date.

---

## 12. Cost proposal

### 12.1 Direct bom-0-13 procurement

| Element | 0B estimate |
|---|---:|
| Primary structure, racks, and restraints | $55–95M |
| Robotic handling and inspection | $55–95M |
| Arrival, berthing, and handoff interfaces | $25–45M |
| Power generation, storage, and distribution | $25–45M |
| Thermal control | $15–30M |
| Propulsion hardware and tanks | $20–35M |
| Avionics, navigation, software, and flight communications | $25–45M |
| Node-specific detailed design and manufacturing engineering | $35–60M |
| Integrated assembly and acceptance testing | $30–50M |
| **Calculated direct range** | **$285–500M** |
| **Recommended planning envelope** | **$300–550M** |

The wider planning envelope reflects immature interface definition and integration scope. It is not a substitute for programme contingency.

Array hardware pricing should follow the revised programme allowance of approximately **$30–150/W**, with launch charged separately. The power subsystem line also includes deployment hardware, batteries, distribution, controls, and integration.

### 12.2 Other node-attributable programme costs

These are **not additions to bom-0-13’s procurement line**; they identify costs that must exist elsewhere in the programme.

| Attributable cost | Preliminary allowance | Account |
|---|---:|---|
| 0A studies and risk reduction | $15–35M | 0-11 / 0-12 |
| Additional technology qualification, if required | $40–90M | 0-11 |
| Launch and destination delivery | $100–300M | 0-8 |
| Initial replacement-unit allocation | $20–40M | 0-14 |
| Node-specific ground integration | $10–25M | 0-9 |
| Operations | $8–15M/year | 0-10 |
| Replenishment propellant | Supply-audit dependent | 0-16 |
| Programme contingency | Programme policy and risk model | 0-17 |

The delivery allowance is particularly uncertain. A rough Earth-launch basis of **$3,000–7,000/kg for 25–40 t** gives $75–280M before resolving all destination-delivery details. The launch-and-delivery account must replace this allowance with an actual transportation architecture.

### 12.3 Position on the round-2 $200–600M estimate

I broadly agree with the range **only if it means node procurement and integration**, not an all-in lifecycle cost.

- **$200M is optimistic** for a first-of-kind terminal with autonomous heavy-cargo handling, meaningful inventory buffering, and robust inspection.
- **$300–550M is a more defensible procurement planning range.**
- **$600M may be insufficient as an all-in figure** once launch, technology qualification, operations, replenishment, and reserve are included.

A reduced node could approach the lower end by retaining product on tug-supplied carriers and minimizing inspection. That would shift cost and risk onto tugs, packaging, and Phase 1—not necessarily reduce total programme cost.

---

## 13. Principal risks

| Risk | Consequence | Primary mitigation |
|---|---|---|
| Phase 1 demand is late or changes form | Stranded inventory or unusable product | Signed material/date specifications before 0B |
| Cargo interface mismatch | Redesign or failed unloading | Common interface authority spanning processor, tug, node, and Phase 1 |
| Flexible-body instability during handling | Structural damage or loss of cargo | Representative dynamic tests, model correlation, slow motion limits |
| Tug approach or capture failure | Collision and service outage | Independent abort capability, segregated approach geometry |
| Inventory exceeds capacity | Tug stranded with cargo | Capacity reservation and delayed-acceptance capability |
| Packaging sheds material | Contamination and licensing problems | Consolidated product, redundant restraint, enclosed sampling |
| EP plume contamination | Array, sensor, or radiator degradation | Geometry-based exclusion zones and representative plume testing |
| Unknown alloy quality | Phase 1 fabrication failures | Application-specific material standards and process traceability |
| SEL1 is not the best joint destination | Excess transport cost | Reversible location decision until joint gate |
| Node becomes a single point of programme failure | Long production interruption | Replaceable modules, spare interfaces, contingency direct handoff |
| Qualification scale gap | TRL claim does not support real loads | Pre-agreed relevant-environment evidence and no-waiver gate |
| Insufficient radiator or power margin | Reduced operating cadence | Conservative loads, scheduling, modular growth |

A particularly important contingency is **direct tug-to-Phase 1 handoff**. It need not be routine, but compatible interfaces can preserve limited delivery capability during a terminal outage.

---

## 14. Decisions required before preliminary design review

1. **What exactly does Phase 1 consume?**  
   Feedstock billets, plate, bar, finished members, or another product form?

2. **How much buffer inventory has economic value?**  
   Six hundred tonnes is an engineering proposal, not a demand forecast.

3. **Who owns the cargo carrier?**  
   Tug-retained, node-retained, or circulating carriers produce different fleet and handling costs.

4. **What is the accepted product temperature envelope?**

5. **What constitutes acceptance?**  
   Arrival, material certification, sample verification, or successful downstream fabrication?

6. **Which orbit minimizes total system cost and operational risk?**  
   This must include Phase 1 distribution, not just inbound tug energy.

7. **Can the cargo interface be standardized before tug and processor design freeze?**

8. **What environmental-release and collision-risk criteria will the licensing state accept?**

9. **What EP propellant and fast-response propulsion combination passes the supply and life-test gates?**

10. **What happens if asteroid metallurgy fails?**  
    The node should remain usable with Earth-supplied, interface-compatible material, without claiming that fallback makes the failed resource programme economical.

---

## Bottom line

The receiving node should be a **25–40 t, 100–150 kW, uncrewed logistics terminal**, initially capable of storing approximately **600 t of packaged Fe-Ni product** and handling roughly **1 kt/year**.

Its value is not processing capacity. Its value is making delivery **safe, verifiable, schedulable, and usable by Phase 1**.

Proceed in 0A with interfaces, demand definition, dynamics, and demonstrations. Commit to the production node only after the joint destination decision, signed material demand, licensing case, and all project-ending technologies satisfy the no-waiver TRL 6 gate.