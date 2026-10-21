---
bomId: "bom-0-4"
itemName: "MW-class Cargo Tugs"
itemSlug: "transport-vehicles"
modelId: "gpt-6-1-sol"
modelName: "GPT-6.1 Sol"
generated: "2026-10-20"
phase: "phase-0"
---

# Technical Proposal: MW-Class Cargo Tugs  
## Project Dyson — bom-0-4, Phase 0B

**Recommendation:** Develop a modular, uncrewed solar-electric cargo tug capable of delivering **250 t of processed Fe-Ni product per mission**, with **2 MWe available to propulsion at 1.3 AU, end of life**. Use a planning fleet of **14 vehicles: 12 assigned to transport and two available for maintenance, substitution, or recovery**.

This is a **design reference, not a procurement authorization**. Phase 0A should retire the propulsion, power, thermal, storage, navigation, and cargo-handling risks. Production fleet commitment belongs at KDP-0B, after target-specific trajectories and signed Phase 1 demand establish the required fleet.

The principal conclusion is that **a physically credible MW-class tug is substantially more expensive than the lower round-2 estimates**, particularly when its own solar arrays are included. The transport programme should be justified as a capability programme, not presumed cheaper than Earth-supplied material.

---

## 1. Recommended approach and design philosophy

### 1.1 What this vehicle does

The tug transports **finished or appropriately conditioned native/reduced Fe-Ni product** from a processing installation at a selected NEA to the Phase 1 receiving node.

The reference delivery destination is **a specified Sun–Earth L1 halo or Lissajous orbit**, not the mathematical L1 point. That orbit, its approach corridors, and its operational constraints must be configuration-controlled with bom-0-13.

The vehicle does not:

- Transport unprocessed bulk ore as the baseline.
- Provide crew accommodation or human-rating.
- Produce LOX/LH₂.
- Carry out mining or primary metallurgy.
- Include the receiving node or its cargo-handling infrastructure.
- Assume free communications, free propellant delivery, or free launch.

### 1.2 Design principles

**1. Size the fleet from trajectories and demand—not from a vehicle count inherited from an earlier architecture.**  
Fourteen vehicles is a useful planning case, not an established optimum.

**2. Specify power at an operating distance and age.**  
“2 MW tug” is otherwise ambiguous. This proposal specifies propulsion input power at **1.3 AU and end of life**, with additional housekeeping power.

**3. Make wear-limited equipment replaceable.**  
Thruster heads, cathodes, power-processing modules, feed modules, and selected avionics must be robotically replaceable.

**4. Separate the cargo load path from the solar-array structure.**  
A 250 t payload must not transmit docking or handling loads through deployable wings.

**5. Treat propellant choice as unresolved.**  
In accordance with D-05:

- **Iodine is the costed reference case.**
- **Argon is the alternate.**
- Neither is selected for production.
- Water EP remains a desk study unless a suitable C-type target is confirmed.

**6. Prefer predictable operations over maximum theoretical performance.**  
A somewhat heavier vehicle with replaceable hardware and conservative docking procedures is preferable to a minimum-mass vehicle requiring frequent unscheduled intervention.

---

## 2. Reference configuration and assumptions

All values below are **proposed engineering assumptions**, unless identified as binding programme context. They are not claims of demonstrated hardware capability.

### 2.1 Reference specification

| Parameter | Proposed reference | Planning range or constraint |
|---|---:|---|
| Production fleet | 14 vehicles | 10–18; gate-sized |
| Revenue-service assignments | 12 | Remaining vehicles support maintenance/substitution |
| Delivered product per loaded mission | 250 t | 150–300 t |
| Propulsion electrical input | 2.0 MWe | 1.0–2.5 MWe trade envelope |
| Power-rating condition | 1.3 AU, EOL | Must be retained in every specification |
| Available regulated generation | Approximately 2.2 MWe | At reference condition |
| Housekeeping and auxiliary allowance | 80 kWe | 50–120 kWe |
| Power headroom at reference condition | Approximately 120 kWe | Before detailed allocation |
| Effective specific impulse | 2,500 s | 2,000–3,000 s optimization range |
| Bus-to-directed-jet efficiency | 60% | 50–65%; propellant-dependent |
| Reference thrust | 98 N | At 2 MWe and stated efficiency |
| Dry mass, including returned cargo carrier | 70 t | 55–85 t |
| Normal propellant loading | Approximately 81 t | Trajectory-dependent |
| Reference propellant burned per cycle | Approximately 75 t | Includes effect of retained reserve |
| Installed storage capacity | 200 t class | Normally only partly filled |
| Reference product-return Δv | 4 km/s | Not a target-selection commitment |
| Reference outbound Δv | 3 km/s | Unloaded of product, but carrying return propellant |
| Reference full cycle | 2.3 years | Unverified planning assumption |
| Design service objective | 15 years | With replaceable wear items |
| Product-delivery destination | SEL1 receiving orbit | Interim D-04 reference |

The **200 t storage envelope is deliberate**. It addresses T14 and allows higher-Δv missions, operational reserves, and later cargo changes without redesigning the fundamental storage architecture. It does not imply that every mission carries hundreds of tonnes of propellant.

### 2.2 Scope of the power rating

The design uses approximately:

- **16,000 m² of active solar-array area**.
- **4.8 MW BOL generation at 1 AU**, assuming 300 W/m² at array level.
- **3.84 MW EOL generation at 1 AU**, assuming 240 W/m².
- Approximately **2.2 MW delivered to the regulated bus at 1.3 AU**, after a nominal 3% collection/distribution loss.

The EOL/BOL ratio is a design allowance, not a validated degradation prediction.

Near 1 AU, the vehicle need not process all available array output. It can feather wings, curtail generation, or operate within its qualified bus and thermal limits.

---

## 3. Transport performance and fleet closure

### 3.1 Propulsion physics

For electrical input \(P\), bus-to-directed-jet efficiency \(\eta\), and exhaust velocity \(v_e\):

\[
v_e=g_0I_{sp}
\]

\[
T=\frac{2\eta P}{v_e}
\]

At:

- \(P=2.0\) MW,
- \(\eta=0.60\),
- \(I_{sp}=2,500\) s,

the effective exhaust velocity is approximately 24.5 km/s, giving:

\[
T\approx98\ \mathrm{N}
\]

and:

\[
\dot m=\frac{T}{v_e}\approx0.0040\ \mathrm{kg/s}
\]

That is approximately **345 kg/day during powered operation**.

These are first-order propulsion values. They do not establish transfer duration or accessibility.

### 3.2 Correct accounting of outbound and return propellant

The outbound leg carries the propellant needed for the loaded return. Ignoring this materially understates departure mass.

For a 70 t dry tug, 250 t product load, 6 t retained reserve, and a 4 km/s loaded return:

\[
m_{p,\mathrm{return}}
=(70+250+6)
\left[\exp\left(\frac{4}{24.5}\right)-1\right]
\approx58\ \mathrm{t}
\]

The outbound leg must accelerate the dry tug, retained reserve, and return propellant:

\[
m_{p,\mathrm{out}}
=(70+6+58)
\left[\exp\left(\frac{3}{24.5}\right)-1\right]
\approx17\ \mathrm{t}
\]

Thus the reference cycle requires approximately:

- **75 t burned**.
- **81 t initially loaded**, including retained reserve.
- **151 t departure mass** from the delivery node.
- **384 t mass after product pickup at the NEA**.
- **326 t arrival mass**, including product and retained reserve.

This calculation assumes no major equipment cargo outbound. Such cargo must be manifested and recomputed explicitly.

### 3.3 Thrust duration versus calendar duration

At the reference mass flow:

- Outbound thrusting: approximately **49 days**.
- Loaded-return thrusting: approximately **168 days**.
- Total powered time: approximately **217 days**.

At 80% usable thrust duty, that becomes approximately **271 elapsed days allocated to thrusting**.

A **2.3-year cycle** therefore contains roughly **1.55 additional years** for coasts, phasing, window alignment, approach, cargo operations, and maintenance.

**That additional time is an allowance—not a solved trajectory.**

The trajectory analysis must integrate actual:

- Solar distance and power variation.
- Thrust steering.
- Asteroid ephemerides.
- Eclipse and attitude restrictions.
- Arrival-orbit targeting.
- Cargo accumulation dates.
- Propellant delivery and maintenance schedules.

### 3.4 Reference fleet throughput

For 12 assigned vehicles, 250 t payload, 85% operational availability, and a 2.3-year cycle:

\[
Q=\frac{12\times250\times0.85}{2.3}
\approx1,110\ \mathrm{t/yr}
\]

This is a credible **planning target near 1 kt/yr**, not yet a contractual capability.

| Case | Product per mission | Cycle | Availability | Assigned vehicles | Annualized delivery |
|---|---:|---:|---:|---:|---:|
| Constrained reference | 250 t | 3.0 yr | 80% | 12 | 0.80 kt/yr |
| Reference | 250 t | 2.3 yr | 85% | 12 | 1.11 kt/yr |
| Favorable | 250 t | 2.0 yr | 90% | 12 | 1.35 kt/yr |

The upper programme envelope of **2.5 kt/yr** requires a substantially more favorable combination of payload, cycle time, availability, and fleet size. It is not a capability of the reference case.

For example, 16 assigned vehicles carrying 300 t every 1.5 years at 85% availability would deliver approximately 2.7 kt/yr—but no such cycle is presently established.

### 3.5 Propellant supply implication

At 1.11 kt/yr:

\[
N_{\mathrm{loaded\ arrivals}}\approx4.4/\mathrm{yr}
\]

\[
\dot M_p\approx4.4\times75\approx330\ \mathrm{t/yr}
\]

Allowing for commissioning, off-nominal operations, and inventory management gives a **reference steady-state supply requirement of approximately 350–400 t/yr**.

A preliminary **150–600 t/yr** envelope is suitable for supplier enquiries, but it does not cover every possible high-throughput/high-Δv combination.

Propellant procurement and delivery belong to **bom-0-16**, not this vehicle line.

---

## 4. System architecture

```text
                     SUN
                      |
          +-----------+-----------+
          |                       |
   Articulated solar       Articulated solar
      wing groups             wing groups
          |                       |
          +---- HV generation ----+
                      |
             Sectionalized HV bus
                      |
        +-------------+---------------+
        |             |               |
     EP PPUs      Auxiliary       Thermal-loop
        |         converters       equipment
        |             |
   Thruster banks     +-- Avionics / communications
        |             +-- Batteries / docking sensors
        |
  Aft propulsion frame
        |
  Non-pressure cargo spine
        |
  Sealed product carrier ---- Robotic capture/berthing interface
        |
  Propellant cassette bay
        |
  Forward sensors / service interface
```

### 4.1 Arrangement

The preferred vehicle is a **non-rotating central spine** with:

- Aft-mounted, gimballed propulsion banks.
- Cargo attached near the longitudinal centerline.
- Propellant cassettes distributed to manage center-of-mass travel.
- Solar wings outside the primary cargo load path.
- Dedicated radiator surfaces outside major plume and docking-obstruction zones.
- Forward and lateral navigation sensors with overlapping coverage.

The exact placement of cargo and propellant must be optimized together; the diagram is functional rather than a frozen mechanical layout.

### 4.2 Preliminary dimensions

| Element | Planning dimension |
|---|---|
| Central vehicle body | 25–35 m long |
| Main body width/depth | 5–8 m |
| Cargo carrier envelope | Approximately 12–20 m long, depending on product packaging |
| Deployed array tip-to-tip span | Approximately 180–240 m |
| Radiator planform area | 600–1,000 m² |
| Propellant storage envelope | Approximately 60–70 m³ for 200 t iodine-class capacity |
| Launch packaging | Multiple launch packages or modular assembly; not yet closed |

The deployed vehicle is a **large flexible spacecraft**, not merely a conventional tug with larger thrusters.

---

## 5. Preliminary mass budget

| Subsystem | Reference mass |
|---|---:|
| Solar wings, deployment structure, collection harness | 22 t |
| Primary structure, cargo load path, docking hardware | 6 t |
| Thrusters, gimbals, PPUs, propulsion distribution | 8 t |
| Propellant cassettes, containment, feed, heaters | 8 t |
| Radiators, pumps, plumbing, thermal hardware | 4 t |
| Avionics, navigation, communications | 2 t |
| Batteries, auxiliary propulsion, miscellaneous electrical | 2 t |
| Reusable product carrier and restraints | 4 t |
| **Estimated equipment subtotal** | **56 t** |
| **Unallocated mass allowance** | **14 t** |
| **Reference dry mass** | **70 t** |

The 14 t allowance is **25% of estimated equipment mass**. It is appropriate for this maturity and must not be quietly reassigned to increase payload.

The array allocation implies approximately **218 W/kg at 1 AU BOL for the complete deployed array subsystem**. Achieving that figure at MW scale is a development objective under T02, not demonstrated heritage.

If dry mass grows toward 85 t, the architecture can remain viable, but trajectories, storage loading, launch demand, and fleet economics must all be rerun.

---

## 6. Subsystem specifications

### 6.1 Electric propulsion

**Recommended architecture:** multiple independently controlled, approximately **100 kW-class thruster/PPU strings**.

A reference arrangement is:

- 20 operating strings at 100 kW.
- Four installed spare or rotating-duty strings.
- Independent electrical isolation and flow control.
- Gimballed banks sized for center-of-mass movement and engine-out operation.

This avoids making a single 1–2 MW thruster a project-ending component while still requiring MW-level system qualification.

Neither Hall-effect nor gridded-ion propulsion should be selected solely from present heritage on another propellant. Selection requires representative iodine and argon performance, life, contamination, and maintainability evidence.

**Required qualification metrics**

- Efficiency maps over power, flow, temperature, and life.
- Specific impulse and thrust-vector stability.
- Propellant throughput to defined wear limits.
- Cathode and neutralizer life.
- Restart count and dormant-storage recovery.
- PPU radiation and thermal endurance.
- Plume effects on arrays, radiators, sensors, and cargo.
- Stable operation during loss of one or more strings.

**Proposed initial module target:** approximately **10 t qualified throughput per 100 kW string**, with allowable degradation defined in advance.

At the reference mass flow, one 100 kW string processes approximately 0.72 kg/h. Ten tonnes therefore corresponds to roughly **14,000 operating hours**.

That target must not be substituted by a short-duration “successful firing.” Throughput, wear state, restarts, and contamination all matter.

### 6.2 Solar arrays and electrical power

The wing system should comprise **multiple independently deployable and isolatable sectors**, rather than one monolithic pair of blankets.

Proposed features:

- Four to eight major wing sectors.
- Redundant deployment sensing.
- Local fault isolation.
- Independent articulation where justified by structural dynamics.
- Replaceable or bypassable power-conditioning modules.
- Arc detection and rapid string isolation.
- Plume-resistant placement and contamination monitoring.

A **1–3 kV-class collection architecture** is the starting trade. The selected voltage must balance:

- Harness mass.
- Insulation and connector qualification.
- Plasma interaction.
- Arcing and differential charging.
- Robotic servicing constraints.
- Compatibility with propulsion PPUs.

The vehicle’s electrical architecture need not share the site robot tether voltage merely because both are high-voltage systems.

### 6.3 Propellant storage and feed

#### Iodine reference case

Use **sealed, replaceable storage cassettes** feeding redundant controlled vaporizers and heated distribution lines.

Reference provisions:

- 200 t installed capacity.
- Normal loading around 81 t.
- Approximately ten 20 t-class storage modules, or an equivalent subdivided arrangement.
- Multiple feed paths with isolation.
- Controlled thermal gradients to prevent unwanted deposition.
- Materials qualification covering storage, vapor, plasma exposure, and contamination products.
- Passive isolation after a feed-system failure.

At approximately 4.9 t/m³ solid density, 200 t occupies about 41 m³ of solid iodine. Allowing for packaging, thermal hardware, incomplete fill, and feed geometry produces the proposed **60–70 m³ storage envelope**.

This volumetric estimate does not demonstrate reliable bulk withdrawal. Large-scale feed behavior is a major 0A test subject.

**Preferred operational approach:** exchange sealed modules rather than routinely perform open bulk-solid transfer in microgravity.

#### Argon alternate

Argon is not a drop-in substitution.

The alternate must examine:

1. High-pressure storage with real-gas sizing and qualified pressure vessels.
2. Cryogenic liquid storage with insulation, refrigeration, vent management, and transfer hardware.

At roughly 1.4 t/m³ liquid density, 200 t of liquid argon alone occupies approximately **143 m³**, before ullage and tank structure.

Cryogenic argon would not constitute production LOX/LH₂ infrastructure, but it would introduce a significant new storage and transfer burden. That burden must be priced and gated rather than hidden inside the iodine vehicle estimate.

### 6.4 Waste-heat rejection

At 2 MW propulsion input and 60% directed-jet efficiency, approximately **0.8 MW is not converted into directed jet kinetic power**.

Not all of that becomes heat in a central coolant loop:

- Some is rejected directly by hot thruster surfaces.
- Some leaves through other plume energy channels.
- PPUs and auxiliaries require spacecraft thermal management.

**No portion may simply disappear from the thermal accounting.**

The preliminary design allocates:

- Approximately **0.5–0.65 MW** to locally radiated and other experimentally characterized propulsion losses.
- Approximately **0.3–0.45 MW** to the active spacecraft thermal system, including auxiliary loads.
- A **0.45 MW-class active rejection capability** as the starting design point.

Proposed radiator characteristics:

| Parameter | Preliminary allocation |
|---|---|
| Coolant temperature range | Approximately 330–370 K |
| Radiator planform area | 600–1,000 m² |
| Reference area | Approximately 800 m² |
| Effective net rejection | Approximately 0.5–0.8 kW/m² of planform, geometry-dependent |
| Architecture | Segmented, isolatable pumped loops |
| Reference mass | 4 t including associated thermal equipment |

The solar arrays reject their own absorbed heat through their surfaces. That multi-MW thermal balance is separate from the central radiator budget.

### 6.5 Cargo interface

Cargo should be delivered as:

- Cast billets.
- Mechanically secured ingots.
- Consolidated feedstock packages.
- Other non-dispersive forms explicitly accepted by Phase 1.

**Loose powder and unsecured particulate product are excluded from the baseline.**

The product interface control document must state:

- Net metal mass.
- Composition and allowable impurities.
- Oxide, moisture, and volatile content.
- Piece size and packaging.
- Temperature at handover.
- Magnetic properties relevant to handling.
- Permitted particulate release.
- Delivery date and acceptance procedure.

Use a **heavy-cargo structural capture interface**, not an assumed crew-docking port. A standardized service interface for power, data, and robotics is desirable; IDSS compatibility is not a default requirement.

### 6.6 Batteries and auxiliary propulsion

The tug is not a long-duration battery-powered spacecraft.

Proposed onboard storage:

- **100–250 kWh** usable-class battery allocation.
- Sized for safing, deployment transients, brief shadow periods, and docking contingencies.
- No battery support for meaningful MW propulsion operation.

Auxiliary propulsion provides:

- Collision avoidance.
- Docking abort.
- Attitude control when EP is unavailable.
- Momentum management.

A non-cryogenic auxiliary system should be selected during 0A. Its propellant, contamination, and plume effects must be included in the vehicle ledger; no auxiliary propellant is assumed free.

---

## 7. Autonomy, control, and communications

### 7.1 Operational autonomy

The tug must complete routine cruise without continuous ground intervention and maintain safety through communications outages.

Required onboard functions include:

- Navigation-state estimation.
- Thrust execution and bounded replanning.
- Power/thermal-aware thrust scheduling.
- Fault detection, isolation, and recovery.
- Array and radiator configuration management.
- Collision avoidance.
- Approach hold, retreat, and abort.
- Cargo-latch verification.
- Propellant inventory estimation.
- Health trending for wear-limited hardware.

Autonomy is **bounded by approved operating envelopes**. It is not authority to improvise a new target, delivery orbit, or close-proximity procedure.

### 7.2 Navigation and attitude control

The navigation suite should combine:

- Radiometric tracking.
- Optical navigation.
- Star trackers.
- Inertial measurement.
- Relative-navigation cameras.
- Lidar or equivalent active ranging for terminal operations.
- Node- or site-provided navigation aids where available.

GNSS is not assumed to provide baseline navigation at the NEA or SEL1.

The attitude-control system must account for:

- Large flexible array modes.
- Solar-pressure torque.
- Cargo center-of-mass uncertainty.
- Thruster erosion and thrust-vector drift.
- Changing propellant distribution.
- EP-induced structural excitation.

Initial control requirements should include:

- Identification of major deployed structural modes.
- Conservative maneuver-rate limits.
- Separation of attitude-control bandwidth from flexible modes.
- Robust operation with one array sector or propulsion string unavailable.

Numerical pointing and mode-separation requirements should be established from the actual wing and thruster geometry, not invented before structural modelling.

### 7.3 Proximity operations

The tug must not approach the receiving node under routine main-EP thrust.

A typical sequence is:

1. Establish an approved relative trajectory outside the node keep-out region.
2. Terminate EP and verify isolation.
3. Acquire independent relative-navigation solutions.
4. Enter a hold point.
5. Receive node authorization to continue.
6. Approach at low relative speed.
7. Capture, structurally secure, and unload propulsion control.
8. Verify power, data, and cargo-transfer state.

For scale, a 384 t vehicle at 1 cm/s has approximately **19 J** of translational kinetic energy; at 10 cm/s it has approximately **1.9 kJ**. Low approach speed is necessary, but rotational energy, flexible appendages, control error, and off-axis contact remain important.

### 7.4 Communications

Preliminary allocations:

| Mode | Vehicle data rate |
|---|---:|
| Routine cruise telemetry | 10–100 kbps when linked |
| Software upload and selected diagnostics | 0.1–1 Mbps |
| Local proximity link | 1–10 Mbps |
| Continuous high-rate Earth video | Not required |

A **1–10 GB/day fleet-wide returned-data allowance** is reasonable for early sizing, but is not a link budget.

The flight communications equipment is included in bom-0-4. Ground stations, service contracts, network operations, and mission-control staffing remain in bom-0-9 and bom-0-10.

---

## 8. Interfaces and scope boundaries

| External item | Required interface | Cost ownership |
|---|---|---|
| bom-0-1 Scouts | Target ephemerides, shape, rotation, accessibility and hazard data | Scout programme |
| bom-0-3 NEA plant | Product carrier, loading fixture, cargo certification, departure clearance | Plant-side equipment outside tug line |
| bom-0-5 Site power | Optional dockside power and service compatibility | Stationary generation outside tug line |
| bom-0-8 Launch/delivery | Packaged mass, launch loads, injection orbit, assembly sequence | Launch and delivery line |
| bom-0-9 Communications | Flight RF interface and tracking requirements | Ground infrastructure outside tug line |
| bom-0-10 Operations | Procedures, staffing, scheduling, anomaly response | Operations line |
| bom-0-11 NRE | Vehicle and subsystem development/qualification | NRE line |
| bom-0-12 Pathfinder | Demonstrator flight interfaces and objectives | Pathfinder line |
| bom-0-13 SEL1 node | Heavy-cargo capture, unloading, servicing, navigation | Node-side equipment outside tug line |
| bom-0-14 Spares | Replaceable propulsion, power and avionics modules | Replacement inventory line |
| bom-0-15 Contamination | Release limits, monitoring, licensing evidence | Shared controls; no duplicate programme charge |
| bom-0-16 Propellant | Module delivery, purity, custody transfer, supply schedule | Propellant supply line |

A **100–250 kWe dockside service interface** is proposed where available. This does not require continuous export from the tug to the processing site.

---

## 9. Manufacturing and assembly

### 9.1 Production strategy

Do not order the entire fleet at once.

Recommended sequence:

1. Qualification hardware and ground articles.
2. A flight demonstrator.
3. Two initial production vehicles.
4. Review actual manufacturing, deployment, propulsion, and maintenance results.
5. Release subsequent lots of three to four vehicles.

Contracts should preserve common interfaces while allowing improved replaceable thruster and PPU generations.

### 9.2 Manufacturing considerations

**Solar arrays**

- Repeatable blanket or panel sectors.
- Automated inspection and electrical mapping.
- Full deployment-path verification.
- Traceability of high-voltage insulation and interconnects.
- Radiation, thermal-cycle, and contamination witness testing.

**Propulsion**

- Production acceptance tests for each string.
- Controlled cathode, channel, grid, or magnetic-circuit manufacturing as applicable.
- Measured thrust-vector alignment.
- Material-lot traceability for erosion-critical components.

**Propellant system**

- Compatibility-clean manufacturing.
- Sealed storage and transport controls.
- Dedicated leak and thermal testing.
- Verification that manufacturing residues do not interfere with feed or discharge stability.

**Cargo structure**

- Qualification against actual launch, handling, contact, and restraint loads.
- No generic “3g human-rating” requirement.
- Different launch and in-space structural configurations where beneficial.

### 9.3 Launch and assembly

A launch count is not yet defensible.

The 70 t dry reference vehicle, large wings, and substantial initial propellant loading require a combined study of:

- Fairing packaging.
- Injection performance.
- Launch opportunity.
- Assembly location.
- Robotic deployment and inspection.
- Propellant-module delivery.

Launch and delivery costs must remain visible in bom-0-8. A cheap launch assumption must not be used to conceal high packaged mass.

---

## 10. Phase 0A development and readiness roadmap

### 10.1 Gate philosophy

D-02 is controlling:

- Internal 0A milestones require TRL 4–5 evidence.
- Every project-ending technology must reach **TRL 6 in a relevant environment before KDP-0B**, with no waivers.
- A subsystem demonstration does not automatically establish system-level readiness.

No fixed production date should be promised before 0A has established the development duration.

### 10.2 Proposed sequence

#### Stage A — Mission closure and discriminating tests

**Indicative duration: 18–24 months, overlapping later work.**

Deliver:

- Named target candidates.
- Target-specific low-thrust trajectories.
- Fleet-window and arrival-schedule model.
- Phase 1 product acceptance specification.
- Iodine and argon supplier audit.
- Initial array/plume/thermal interaction tests.
- Preliminary launch packaging and mass closure.

**Exit condition:** at least one complete mission case closes physically and has a credible supply, demand, and licensing path.

#### Stage B — Subsystem breadboards and engineering units

**Indicative duration: 2–4 years, partly parallel.**

Demonstrate:

- Representative high-power thruster/PPU strings.
- Representative propellant feed and storage behavior.
- High-voltage array sectors and deployment hardware.
- Full-scale radiator-loop elements.
- Cargo capture and restraint mechanisms.
- Hardware-in-the-loop autonomous navigation.

#### Stage C — Relevant-environment qualification

Required evidence includes:

| Technology | Required 0A evidence before 0B commitment |
|---|---|
| T01 MW EP cluster | Representative strings plus MW-level integration, interactions, faults, throughput/life evidence |
| T02 MW deployable arrays | Deployment, HV operation, structural dynamics and environment evidence representative of the flight design |
| T03 Heat rejection | Flight-relevant thermal rejection, loop operation, freeze/restart and fault isolation |
| T12 Heavy cargo handling | Validated full-mass dynamics plus relevant-environment capture/transfer evidence |
| T14 Large propellant system | Full-scale storage/feed architecture evidence, validated scaling and relevant-environment fluid/solid behavior |
| T25 Navigation/control | End-to-end autonomous navigation and proximity operations in representative flight conditions |

A ground crane moving a 250 t test mass is not equivalent to microgravity handling. Conversely, a small orbital demonstration cannot by itself validate full-mass flexible-body dynamics. Both evidence types are required.

For T14, ground proof of 200 t structural capacity must be combined with representative low-gravity feed and thermal demonstrations. If the assessment authority concludes that the chosen flight demonstration is not representative, **KDP-0B waits**.

#### Stage D — Flight demonstrator

The demonstrator should test:

- Flight-representative array deployment and high-voltage behavior.
- Integrated power/propulsion/thermal operation.
- Autonomous navigation and safe approach/retreat.
- Propellant feed behavior.
- Robotic replacement interfaces.
- Cargo capture using an appropriately scaled inertial article.

The flight programme must be capable of establishing the required TRL, not merely generating attractive imagery.

### 10.3 KDP-0B discriminating gates

Production commitment requires all four:

1. **Target gate:** accessible resource, verified product potential, and optimized transport schedule.
2. **Demand gate:** signed Phase 1 material, purity, mass, and date commitments.
3. **Economics gate:** explicit comparison against Earth supply, including the value of capability development.
4. **Licence gate:** acceptable collision, debris, contamination, disposal, and jurisdictional arrangements.

If a project-ending technology fails, use the agreed Earth-supplied-material fallback or reconsider the transport architecture. Do not convert a failed demonstration into a readiness waiver.

---

## 11. Cost estimate and accounting

### 11.1 Estimate basis

All figures are **rough-order-of-magnitude, constant 2026 USD**.

They are not supplier quotations.

Array hardware uses the binding reassessment allowance of **$30–150/W**, with launch separately accounted. The reference array has approximately **4.8 MW BOL output at 1 AU**.

This rating basis matters: pricing only “2 MW” would undercount the hardware needed to provide 2 MW propulsion power at 1.3 AU EOL.

### 11.2 Recurring vehicle hardware

| Element | Unit range |
|---|---:|
| Solar-array hardware | $144–720M |
| Structure, docking and cargo load path | $35–60M |
| Thrusters, PPUs and gimbals | $100–170M |
| Propellant storage and feed | $40–70M |
| Thermal system | $25–45M |
| Avionics, navigation and communications | $20–35M |
| Auxiliary systems and service interfaces | $20–35M |
| Assembly, integration and acceptance testing | $40–65M |
| **Total recurring vehicle** | **$424M–1.20B** |

Recommended budget shorthand: **$0.43–1.2B per vehicle**, with a **$0.65–0.85B working planning band** pending quotations.

The estimate includes the initial reusable carrier allocation. Spare carriers and replacement inventories require separate accounting.

### 11.3 Fleet procurement

| Fleet case | Recurring hardware envelope |
|---|---:|
| 12 vehicles | $5.2–14.4B |
| 14 vehicles | $6.0–16.8B |
| 16 vehicles | $6.9–19.2B |

At **14 vehicles × $0.75B**, the planning point is approximately **$10.5B**.

These totals exclude:

- Launch and delivery.
- Propellant procurement and delivery.
- Operations and ground infrastructure.
- Replacement inventory.
- NRE and pathfinder costs.
- Programme contingency and reserve.

### 11.4 Phase split and related allocations

| Phase/scope | Proposed range | Booked under |
|---|---:|---|
| 0A tug-related development and qualification | $1.2–3.0B | bom-0-11 |
| 0A tug-related flight demonstrator | $0.4–1.0B | bom-0-12 |
| 0A production fleet commitment | None | bom-0-4 |
| 0B recurring fleet, 12–16 vehicles | $5.2–19.2B | bom-0-4 |
| Launch/delivery, propellant, operations, spares | Separately estimated | Respective BOM items |

The **$1.6–4.0B tug-related 0A envelope** is an attribution to other programme lines, not an additional duplicate charge. Its split between development and flight hardware must be refined with the demonstrator design.

### 11.5 Disagreement with round-2 figures

I disagree with **$150–350M per MW-class tug including arrays** as a credible present planning allowance.

Reasons:

1. The specified service condition requires substantially more than 2 MW of 1 AU BOL array hardware.
2. At the agreed array pricing, the reference arrays alone cost **$144–720M**.
3. MW propulsion, large storage/feed systems, flexible spacecraft control, and robotic maintenance remain low-readiness developments.
4. Recurring hardware, NRE, launch, and replacement costs must be separated consistently.

I also reject high confidence in cycle time. The claimed power “knee” is unresolved until target-specific optimization exists. MW power substantially reduces thrust duration in this reference case; whether that reduction improves annual throughput remains a trajectory and scheduling question.

---

## 12. Reliability, maintenance, and spares

### 12.1 Maintenance concept

Service the tug at the receiving node where practical:

- Replace thruster/cathode assemblies.
- Exchange faulty PPUs.
- Inspect arrays and radiator loops.
- Exchange propellant modules.
- Check cargo fixtures.
- Update navigation and autonomy software.
- Recalibrate mass properties and thrust vectors.

The NEA site should support safing and essential diagnosis, but not be assumed to possess a complete tug overhaul facility.

### 12.2 Propulsion replacement demand

A reference tug completing approximately 6.5 cycles in 15 years would process about:

\[
6.5\times75\approx490\ \mathrm{t}
\]

Twenty-four installed strings sharing duty would average approximately **20 t per string** over that period.

A 10 t qualified throughput target therefore implies replacement during service life. At roughly 330 t/year fleet throughput:

\[
330/10\approx33
\]

The fleet consumes approximately **33 module-throughput equivalents per year**, before failures or uneven wear.

This is not necessarily 33 complete PPU replacements annually. The replaceable unit architecture must distinguish thruster head, cathode, gimbal, and electronics.

### 12.3 Fleet availability

The 85% reference availability is a requirement to be substantiated through:

- Reliability modelling.
- Maintenance-duration estimates.
- Spare inventory.
- Node servicing capacity.
- Fault-injection demonstrations.
- Actual early-flight performance.

Two reserve vehicles do not automatically guarantee 85% availability.

---

## 13. Safety, debris, and contamination

### 13.1 ALARP and interim limits

D-03 remains interim. Final limits require modelling, testing, and acceptance by the licensing state.

I recommend the following **proposed engineering allocation**, not a claim of approved regulation:

- No intentional release of product particles or hardware.
- Routine uncontained product loss below **\(10^{-6}\)** of handled product mass.
- Separate, more restrictive assessment of released objects or particles capable of hazardous impact.
- Two independent containment or restraint barriers where a single failure could release significant material.

For a 250 t shipment, the mass-fraction allocation is **0.25 kg**. That number alone is insufficient: particle size, velocity, persistence, and location also matter.

Compliance should use validated containment tests, particulate measurements, witness surfaces, and probabilistic models—not cargo weigh-in/weigh-out alone.

### 13.2 Additional controls

- EP prohibited within approved node and site plume-exclusion regions.
- Positive cargo-restraint verification before departure.
- Automatic retreat following inconsistent relative-navigation solutions.
- Propellant isolation following feed anomalies.
- Disposal planning that avoids persistent uncontrolled crossings of operational regions.
- Array and radiator impact-risk assessment.
- No routine venting of contaminated iodine-bearing material near operational infrastructure.

End-of-life disposal requires an approved trajectory and jurisdictional arrangement. “Leave it near L1” is not an acceptable disposal plan.

---

## 14. Principal risks

| Risk | Consequence | Mitigation and decision criterion |
|---|---|---|
| Target windows do not support required cadence | Fleet cannot meet delivery dates | Optimize named trajectories before production commitment |
| Iodine EP fails lifetime or contamination tests | Propellant/propulsion architecture change | Parallel argon assessment; no production down-select before evidence |
| Argon storage proves excessively heavy or costly | Alternate does not close | Price both storage approaches early |
| MW arrays fail deployment, HV, or dynamics requirements | Mission or programme loss | Sectorized deployment, representative flight evidence |
| Thermal losses exceed allocation | Propulsion derating | Integrated calorimetry and radiator testing |
| Large-scale propellant withdrawal is unstable | Loss of thrust capability | Full-scale feed hardware plus relevant microgravity tests |
| Cargo capture excites flexible modes | Contact damage or collision | Validated dynamics, low-speed capture, hold/abort logic |
| Dry-mass growth | More propellant, launch cost and cycle time | Protected mass allowance and recurrent mission reclosure |
| Servicing cannot be performed robotically | Availability collapse | End-to-end replacement demonstrations |
| Phase 1 demand is delayed or changes specification | Stranded fleet capacity | Demand gate and staged procurement |
| Programme cost exceeds capability value | Industrial option not exercised | Preserve 0B as a real option; retain Earth-supply fallback |

The largest near-term uncertainty is **not thrust calculation**. It is whether a particular target, delivery orbit, production schedule, and fleet can produce reliable dated deliveries.

---

## 15. Open engineering questions

Before preliminary design review, resolve:

1. **Which named NEA and SEL1 orbit define the actual mission?**
2. **How much does 2 MW improve delivery cadence relative to 1 MW and 2.5 MW?**
3. **What arrival schedule is achievable—not merely annualized throughput?**
4. **What product form and purity will Phase 1 sign for?**
5. **Can iodine meet representative throughput, restart, corrosion, and plume requirements?**
6. **What is the fully burdened argon alternate, including storage and refrigeration or pressure-vessel mass?**
7. **Can the 200 t-class storage architecture feed reliably at low acceleration and partial fill?**
8. **Which maintenance tasks must be demonstrated before deployment?**
9. **What packaged masses and injection orbits determine launch demand?**
10. **What evidence is sufficient for TRL 6 on full-scale heavy-cargo handling and large propellant systems?**
11. **What contamination and disposal limits will the licensing state accept?**
12. **What fleet capacity remains useful if production or demand ramps more slowly than planned?**

---

## Final recommendation

Adopt a **250 t payload, 2 MWe-at-1.3-AU-EOL tug** as the configuration-controlled engineering reference, with **14 vehicles as a provisional fleet planning point**.

Fund 0A to establish whether that reference is the right industrial solution. Do not authorize the fleet until target trajectories, representative technology demonstrations, signed demand, economics, and licensing all close.

For present budgeting, carry:

- **70 t reference dry mass**.
- **Approximately 75 t propellant burned per reference cycle**.
- **Approximately 1.1 kt/yr steady-state fleet delivery**, conditional on the assumed cycle.
- **$0.43–1.2B recurring hardware per tug**, including arrays.
- **$1.6–4.0B of tug-related 0A development and demonstrator activity**, booked in the appropriate shared BOM lines.

This is a challenging but technically structured transport programme. Its credibility depends on making power, propellant, heat, fleet scheduling, maintenance, and cost explicit—and allowing the 0B gate to say **no** if the evidence does not support industrial deployment.