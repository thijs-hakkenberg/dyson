---
bomId: "bom-0-10"
itemName: "Mission Operations"
itemSlug: "mission-operations"
modelId: "gpt-6-1-sol"
modelName: "GPT-6.1 Sol"
generated: "2026-10-20"
phase: "phase-0"
---

# Mission Operations Technical Proposal  
## bom-0-10 — Phase 0A and Gated Phase 0B

**Recommendation:** Establish a single, configuration-controlled mission-operations system during 0A, demonstrate it with the scouts and pathfinder, and expand it into an autonomous industrial-fleet operations service only after KDP-0B.

Operations should be **exception-driven, not remotely piloted**. Earth sets objectives, approves hazardous transitions, maintains flight dynamics and configuration authority, and manages anomalies. Spacecraft and site controllers execute validated plans and preserve safety through communications outages.

**Recommended planning allowance:** **$0.65–1.21 billion in constant FY2026 dollars**, excluding programme contingency, for an illustrative **four-year 0A followed by six operating years of 0B**. This is a conditional lifecycle scenario—not authorization for 0B.

---

## 1. Basis and scope

### 1.1 Planning assumptions

The following assumptions size operations; they do not authorize procurement or override other item owners.

| Parameter | Operations sizing assumption |
|---|---|
| Programme duration | 10 years: 4 years 0A, 6 years 0B |
| 0A flight assets | 4–10 EP rendezvous scouts; one integrated pathfinder campaign, potentially comprising several vehicles |
| Industrial sites | One primary NEA site; no simultaneous second production site in the base estimate |
| Cargo fleet | 10–18 MW-class tugs, each carrying approximately 150–300 t when fully manifested |
| Cargo-tug power | 1.0–2.5 MWe each; vehicle specification belongs to bom-0-4 |
| Industrial output | Operations capacity for approximately 0.6–2.5 kt/year delivered product; actual commitment set by signed Phase 1 demand |
| Product | Native/reduced Fe-Ni, with acceptance specification agreed with Phase 1 |
| Receiving location | SEL1 reference case under interim D-04; jointly reconsidered at KDP-0B |
| Crew | None; no crew visits or crew-rescue operations |
| EP propellant | No selection assumed; iodine reference costing and argon alternate handled by bom-0-16 |
| Communications | Purchased and engineered service; no free DSN assumption |
| Cost basis | Constant FY2026 USD; no discounting, escalation, financing, or programme reserve |

The four/six-year split is an **estimating convention**. Gate dates must follow evidence, not the calendar. Extending 0A while holding 0B closed creates additional operations costs, addressed below.

### 1.2 Scope boundaries

The principal accounting risk is overlap between operations, organizational infrastructure, ground communications, and software development.

| Included in bom-0-10 | Explicitly owned elsewhere |
|---|---|
| Flight controllers, mission planners, flight dynamics, operations safety, and mission-level anomaly management | Programme executives, corporate administration, legal and institutional governance: bom-0-7 |
| Mission-control room fit-out, consoles, operational computing, and operational software | Antennas, RF terminals, communications relays, carrier connectivity and network-service purchases: bom-0-9 |
| Operations application integration, configuration, maintenance, and software releases | New flight autonomy technology, plant technology, and qualification development: bom-0-11 and relevant hardware items |
| Operational use of simulators, rehearsals, controller certification, and procedure validation | Pathfinder spacecraft and flight experiments: bom-0-12 |
| Operational inventory tracking and replacement scheduling | Flight spares and replacement hardware: bom-0-14 |
| Debris-event monitoring, incident command, and enforcement of approved operational limits | Containment hardware, environmental modelling, and dedicated contamination qualification: bom-0-15 |
| Mission scheduling of propellant delivery and consumption accounting | Propellant procurement and supply infrastructure: bom-0-16 |

**Accounting rule:** Assign each work package, software component, and staff position to exactly one cost owner. Shared services require an explicit allocation—not duplicate budgets.

---

## 2. Recommended design philosophy

### 2.1 Operate an industrial system, not a collection of science spacecraft

A scout campaign can tolerate individually crafted command sequences. An industrial fleet cannot.

By 0B, the system must support:

- Repeated production and shipment cycles.
- Fleet-wide configuration control.
- Material pedigree and custody.
- Predictive maintenance.
- Scheduling constrained by power, heat rejection, storage, vehicle availability, trajectories, and receiving-node capacity.
- Safe suspension of production without continuous Earth supervision.

The central operational object should be a **validated work package**:

> Acquire feedstock → process batch → characterize product → certify lot → load cargo → transfer custody → transport → receive and accept.

Each package carries resource limits, prerequisites, abort conditions, and evidence requirements.

### 2.2 Separate safety authority from production optimization

A production scheduler must never be able to override:

- Electrical protection.
- Thermal limits.
- Excavation or anchoring stability limits.
- Containment limits.
- Vehicle separation constraints.
- Docking interlocks.
- Propulsion inhibit regions.
- Receiving-node acceptance restrictions.

These constraints belong in independently verified protection functions aboard the relevant asset. Ground operations can change authorized operating envelopes only through controlled procedures.

### 2.3 Preserve optionality through 0A

Do not build a fully staffed industrial control centre before target, demand, economics, and licence gates close.

Use modular software and leased facilities in 0A. Expand staffing, availability, simulator capacity, and fleet scheduling after authorization.

Earth-supplied material remains the programme fallback if microgravity metallurgy fails. Operations should therefore support receiving-node logistics independently of whether the accepted cargo originated at the NEA or Earth.

---

## 3. System architecture

```text
                  PROGRAMME / PHASE 1 GOVERNANCE
              demand, licence conditions, acceptance criteria
                                  |
                                  v
                  MISSION OPERATIONS AUTHORITY
             flight rules / configuration / release approval
                                  |
           +----------------------+----------------------+
           |                      |                      |
           v                      v                      v
   Mission planning       Flight dynamics       Product logistics
   and fleet schedule     and navigation        and custody records
           |                      |                      |
           +----------------------+----------------------+
                                  |
                     Command validation gateway
                    independent safety-rule checks
                                  |
                Communications service — bom-0-9
                                  |
             +--------------------+--------------------+
             |                    |                    |
             v                    v                    v
      Scout/pathfinder       NEA site control      Tug fleet
      local autonomy         power/mining/plant    local autonomy
                                  |                    |
                                  +----------+---------+
                                             |
                                             v
                                  SEL1 receiving operations
                                  reference case: bom-0-13
```

The receiving node’s hardware and embedded controls belong to bom-0-13. Its mission-level scheduling and custody coordination are performed through this operations system.

### 3.1 Operational authority

- **Mission director:** authorizes operational campaigns and significant risk acceptance within approved programme authority.
- **Flight director:** controls execution and anomaly response.
- **Vehicle/site authority:** owns the approved operating envelope for each asset.
- **Independent safety officer:** can stop hazardous operations; cannot be overruled by production scheduling.
- **Product acceptance authority:** accepts or rejects delivered lots against the signed Phase 1 specification.
- **Configuration control board:** approves changes to software, procedures, command dictionaries, and flight rules.

The person who prepares a hazardous command must not be its sole approver.

---

## 4. Technical specifications

These are proposed operations-system requirements, not claimed characteristics of existing hardware.

### 4.1 Capacity and performance

| Attribute | 0A requirement | 0B requirement |
|---|---:|---:|
| Independently addressed flight/site entities | 16 minimum | 64 minimum |
| Detailed subsystem endpoints | 250 | 2,000 |
| Concurrent high-attention campaigns | 2 | 4 |
| Permanently staffed console positions | 3–5 during active flight operations | 12–18 |
| Command/activity time resolution | 1 s for mission scheduling; finer control local | Same |
| Operational telemetry retained online | 180 days minimum | 365 days minimum |
| Engineering/product records | Programme life plus contractual retention period | Same |
| Ground command-service availability | 99.5% monthly | 99.9% monthly |
| Primary control-centre recovery | Within 8 h | Within 2 h |
| Planned unattended safe interval | Asset-specific; demonstrated in 0A | At least 30 days as a design objective |
| Minimum disconnected safe-survival demonstration | 72 h, progressing to campaign-specific cases | Required for applicable operating modes |

**Availability excludes external communications coverage.** Ground-system availability, link availability, and spacecraft availability must be reported separately.

The 30-day objective is not permission to run an unvalidated production process unattended for a month. During an extended outage, a plant may suspend production and enter a contained thermal/electrical safe state.

### 4.2 Ground facilities

Use one primary operations centre and one geographically separated recovery centre.

| Parameter | 0A | 0B |
|---|---:|---:|
| Primary operations floor and support space | 400–700 m² | 800–1,400 m² |
| Recovery-site dedicated space | 100–200 m² | 200–400 m² |
| Primary installed console positions | 10–16 | 24–36 |
| Recovery-site console positions | 4–6 | 8–12 |
| Primary operational IT racks | 4–8 | 10–20 |
| Average IT electrical load | 20–50 kW | 60–150 kW |
| Facility electrical demand, including cooling | 35–100 kW | 100–300 kW |
| Protected operational storage | 0.5–1 PB usable | 2–5 PB usable |

Storage figures include replicas, simulation outputs, software artefacts, and engineering records—not a corresponding continuous space-to-Earth data requirement.

Ground equipment mass is not a mission-driving metric. No dedicated flight hardware mass is allocated to this item. Flight computing, sensors, and communications equipment remain in their vehicle or site BOMs.

### 4.3 Resilience

- Independent power feeds where practical.
- UPS sized for orderly transfer and shutdown; generator-backed critical loads.
- Geographically separate backups and immutable configuration archives.
- Independent command-release credentials at the recovery site.
- Quarterly recovery exercises.
- Annual full operational transfer to the recovery site.
- No requirement for the backup site to duplicate every engineering workstation or simulator.

---

## 5. Subsystems and interfaces

### 5.1 Mission planning and fleet scheduler

The scheduler shall combine:

- Trajectory windows and navigation uncertainty.
- Available tug and payload capacity.
- EP power and propellant budgets.
- Site power allocation and storage state.
- Processing and radiator constraints.
- Robot maintenance and battery availability.
- Docking/loading opportunities.
- Product acceptance and storage capacity.
- Communications coverage.

Use a **rolling 90-day strategic plan**, a **14-day executable planning horizon**, and a **24–72-hour committed activity window**, adjusted by mission phase.

The optimizer proposes plans; an independently implemented validator checks hard constraints before release.

### 5.2 Flight dynamics and navigation

Provide:

- Orbit determination and covariance propagation.
- Low-thrust trajectory reconstruction and replanning.
- Optical navigation support.
- Target-body rotation and shape-model updates.
- Proximity-operation corridor design.
- Conjunction screening and uncertainty-aware maneuver assessment.
- SEL1 arrival/departure planning appropriate to the selected receiving-node orbit.

During commissioning and encounter phases, navigation support is continuously available. During routine cruise, processing can be batched.

No vehicle enters proximity operations solely because its nominal trajectory is clear; uncertainty bounds and failed-thrust cases must also satisfy the approved corridor.

### 5.3 Telemetry, command, and event processing

Use CCSDS-compatible external interfaces where applicable, with versioned internal schemas.

Required functions:

- Time-tagged telemetry and data-quality flags.
- Limit checking that accounts for operating mode.
- Event correlation across assets.
- Command authentication, authorization, expiration, and replay protection.
- Positive acknowledgement and execution-state reconciliation.
- Complete command provenance.

At the application layer, commands require identifiers and reconciliation logic so that retransmission cannot inadvertently repeat an irreversible action.

### 5.4 Engineering state model

Maintain an operational state estimator covering:

- Power and energy.
- Thermal state.
- Propellant and consumables.
- Wear and remaining useful life.
- Material inventories.
- Product lots and custody.
- Navigation state and uncertainty.

Avoid treating a “digital twin” as a certification substitute. Every prediction must carry model version, calibration status, and uncertainty. Safety decisions cannot depend on an unvalidated model merely because its visualization looks convincing.

### 5.5 Product traceability

For every delivered Fe-Ni lot, retain:

- Source location and feedstock campaign.
- Processing recipe and equipment configuration.
- Mass estimate and uncertainty.
- Composition and impurity measurements.
- Applicable mechanical or fabrication qualification evidence.
- Sampling and calibration records.
- Container identity and transfer history.
- Receiving inspection and acceptance decision.

Phase 1 must specify **composition, allowable contaminants, physical form, quantity, delivery date, and acceptance method** before 0B commitment. Operations cannot compensate for an undefined product.

---

## 6. Autonomy, control, and communications

### 6.1 Four levels of control

| Level | Responsibility | Typical timescale |
|---|---|---|
| Protection | Trips, isolation, thermal/electrical protection, collision inhibition | Milliseconds–seconds |
| Local control | Process regulation, robotics, navigation and stationkeeping | Subseconds–minutes |
| Supervisory autonomy | Task execution, bounded recovery, resource arbitration | Minutes–days |
| Earth mission control | Campaign priorities, operating envelopes, configuration changes | Hours–months |

Ground control is deliberately outside fast control loops.

### 6.2 Communications planning basis

A fixed daily volume is inappropriate until target geometry and instrument duty cycles are known. For preliminary allocation:

| Traffic | 0A | 0B |
|---|---:|---:|
| Routine compressed engineering and selected science/inspection data | 1–10 GB/day | 5–30 GB/day aggregate |
| Campaign burst | 20–100 GB/event | 50–250 GB/event |
| Command/planning uplink | Generally <100 MB/day | Generally <1 GB/day |

The 0B routine range corresponds to approximately **0.46–2.8 Mbps averaged over a day**, before link overhead. Scheduled contact rates must be higher when contact duty cycle is low.

These are **operations allocation assumptions**, not a link-budget result. High-resolution inspection imagery should be selectively downlinked; continuous raw robot video is not the baseline.

Commands and health summaries receive priority over bulk imagery. Store-and-forward operation and resumable transfers are mandatory.

### 6.3 Delay and outage tolerance

Actual delay follows the selected trajectory and target. Software should support:

- One-way light time from seconds to approximately 30 minutes.
- Irregular contact schedules.
- Several-day planned outages.
- Longer solar-conjunction interruptions, evaluated using the chosen geometry.
- No remote joystick dependency for industrial operations.

The safety case must explicitly define the state of each subsystem during loss of communications: continue, finish current task, suspend, or isolate.

### 6.4 Cybersecurity

- Hardware-backed command-signing keys.
- Segregated development, simulation, operations, and business networks.
- Two-person approval for hazardous commands and trust-store changes.
- Signed software loads and controlled rollback.
- Independent security monitoring.
- No uncontrolled direct vendor access to flight-command systems.
- Tested response to compromised ground credentials.

---

## 7. Staffing and operational model

### 7.1 Recommended workforce

Figures are average paid FTE during each phase, including shift relief and directly assigned operational engineering.

| Function | 0A FTE | 0B FTE |
|---|---:|---:|
| Flight directors, controllers, and shift coordination | 16–24 | 45–65 |
| Flight dynamics, navigation, and trajectory planning | 10–16 | 30–44 |
| Site/process/robotics operations engineering | 14–22 | 25–36 |
| Software, data systems, and operational IT | 12–18 | 28–40 |
| Mission planning and logistics | 10–14 | 18–26 |
| Safety, cybersecurity, configuration and quality | 8–12 | 16–24 |
| Training, simulation, and operational integration | 10–14 | 18–25 |
| **Total** | **80–120** | **180–260** |

These are not all console operators.

A continuously occupied console typically requires approximately **5–5.5 paid FTE**, allowing for leave, training, sickness, and handover. Thus, 12–18 continuously staffed 0B positions consume roughly 60–99 FTE before specialist day staff and engineering support.

### 7.2 Operating pattern

**0A**

- Day-shift engineering and planning.
- Continuous coverage during active commissioning, encounters, hazardous tests, and major anomalies.
- Reduced staffed coverage plus on-call response during demonstrated low-risk cruise, where allowed by flight rules.

**0B**

- Continuous fleet-level supervision.
- Specialists on day shift and on call.
- Dedicated commissioning teams temporarily formed for new assets.
- No permanent one-controller-per-robot model.

Success is measured partly by reducing operator interventions per production campaign without hiding unresolved anomalies.

---

## 8. Manufacturing, procurement, and maintainability

This item is dominated by software integration and service delivery rather than aerospace manufacturing.

Recommended procurement:

1. **Lease ordinary office and control-room space.**
2. Use commercial server, storage, and workstation hardware.
3. Procure an established telemetry/command core rather than developing one from scratch.
4. Own the mission data model, operational procedures, interfaces, and configuration repository.
5. Require exportable archives and documented APIs to prevent vendor lock-in.
6. Maintain reproducible software builds and a software bill of materials.
7. Qualify representative ground hardware configurations rather than freezing obsolete server models for ten years.

For ground hardware, plan rolling refreshes on roughly four-to-five-year intervals. Operational software should use controlled releases with regression testing; an urgent security patch still requires a defined emergency release process.

Flight software production and qualified onboard computing remain outside this item.

---

## 9. Development roadmap and readiness

NASA-style lifecycle gates govern the programme, with TRL and AD² assessments for critical technology. Operational readiness reviews complement—not replace—technology qualification.

### Stage 1: Architecture and requirements — 0A year 1

Deliver:

- Operations concept.
- Authority matrix.
- Interface control documents.
- Preliminary staffing and communications demand.
- Hazardous-command policy.
- Initial integrated simulation environment.
- Initial contingency procedures.

### Stage 2: Scout operations and ground integration — 0A years 1–2

Demonstrate:

- Multi-asset planning.
- Independent command validation.
- Navigation and delayed communications.
- Configuration-controlled procedures.
- Backup-centre recovery.

Internal critical functions should achieve TRL 4–5 evidence where applicable.

### Stage 3: Pathfinder industrial campaign — 0A years 2–4

Demonstrate the end-to-end operational chain:

1. Plan and authorize a bounded processing campaign.
2. Execute with delayed or interrupted communications.
3. Recover from selected equipment faults.
4. Maintain material records.
5. Produce an auditable acceptance package.
6. Suspend safely and restart under controlled authority.

### Stage 4: KDP-0B evidence package

KDP-0B requires:

- Target gate passed.
- Signed demand with product specification and dates.
- Economics case including operations cost and fallback comparison.
- Applicable licence and operating conditions.
- Every project-ending technology at **TRL 6 in a relevant environment, without waivers**.
- Critical integrated operational chains demonstrated in relevant conditions.
- Closed high-consequence operational hazards.
- Staffing, training, and purchased communications plans consistent with the selected architecture.

A ground simulation alone cannot establish relevant-environment maturity for a project-ending microgravity processing or autonomous site-control technology.

### Stage 5: Incremental industrial activation

Commission production in bounded increments:

- Site utilities.
- Single mining/processing chain.
- First accepted product lot.
- First cargo transfer.
- First receiving-node acceptance.
- Sustained multi-asset campaigns.

Do not activate the entire fleet and full processing throughput simultaneously.

---

## 10. Cost estimate

### 10.1 Lifecycle estimate

**Constant FY2026 USD, millions; excludes bom-0-17 reserve.**

| Cost element | 0A: 4 years | 0B: 6 years | Basis |
|---|---:|---:|---|
| Direct operations workforce | 77–154 | 281–530 | FTE above; $240–320k/FTE-year in 0A, $260–340k in 0B |
| External software products and integration | 65–110 | 90–170 | Vendor work, licences, support, specialist integration; excludes work already in staff costs |
| Operations facilities and computing capital | 15–30 | 20–40 | Fit-out, servers, backup site, refresh |
| Recurring facilities and operational services | 15–25 | 45–80 | Lease, utilities, hosting and non-telecom support |
| External rehearsal, training and independent operational assurance | 15–25 | 25–45 | Purchased exercises and independent review; internal labour counted above |
| **Total** | **187–344** | **461–865** | |
| **Combined conditional lifecycle** | | **648–1,209** | **Approximately $0.65–1.21B** |

Loaded labour includes compensation, benefits, contractor fee where applicable, and directly attributable employment overhead. Programme-level corporate infrastructure is not added again here.

This is a planning estimate, not a probabilistic confidence interval. Dominant uncertainty lies in autonomy maturity, target accessibility, commissioning duration, and whether the fleet can share operators.

### 10.2 Incremental annual cost

- **Extended 0A, flight assets active:** approximately **$35–65M/year**, depending on campaign intensity.
- **Mature 0B recurring operations:** approximately **$75–130M/year**.
- **Heavy commissioning/anomaly year:** approximately **$100–160M/year**.
- **New simultaneous production site:** requires separate estimation; it is not covered by the base range.

Software development and capital expenditure make early years uneven; lifecycle totals should not be divided into identical annual appropriations.

### 10.3 Position on round-2 estimates

- **Claude: $0.5–1.5B total.** Broadly credible. My lower bound is higher because I explicitly include recovery capability, industrial process specialists, navigation, cybersecurity, and sustained operational assurance.
- **Gemini: $525M.** Too low for my recommended ten-year baseline unless autonomy performs unusually well, staffing remains lean, or substantial software and operations costs reside elsewhere. It is a possible stretch case, not a sound central allocation.
- **GPT: $100–300M/year.** The lower portion is plausible for industrial commissioning and difficult operations. Sustained $300M/year is not justified for one site and 10–18 tugs without major additional scope or persistent operational failures.

At 1 kt/year, mature operations alone contribute roughly **$75–130/kg delivered**. Across 0.6–2.5 kt/year, the corresponding range is approximately **$30–217/kg**. This excludes development, hardware, launch, communications, propellant, and replacements. Phase 0 remains a capability programme, not an asserted cost-saving scheme.

---

## 11. Principal risks and mitigations

| Risk | Consequence | Required mitigation |
|---|---|---|
| Autonomy fails to reduce interventions | Staffing growth; throughput shortfall | Pathfinder measurements of intervention frequency and recovery success |
| Common-mode fleet software defect | Multiple simultaneous losses | Staggered deployment, canary asset, rollback and heterogeneous protection paths |
| Long communications outage | Equipment damage or unsafe production | Validated disconnected states and resource-reserve rules |
| Navigation uncertainty near small body | Collision, plume disturbance, loss of asset | Covariance-aware corridors and local sensing |
| Production optimization defeats safety margins | Thermal, electrical or containment event | Independent interlocks and command validator |
| Product records diverge from physical cargo | Rejection or unusable deliveries | Container identity, mass reconciliation and custody checks |
| Ground credential compromise | Unauthorized commands | Segregation, signing, dual approval and tested key revocation |
| Simultaneous commissioning exceeds staff capacity | Error and delayed response | Cap concurrent high-attention campaigns |
| Licensing conditions restrict operations | Lower throughput or redesign | Licence gate before irreversible industrial commitment |
| Plant never achieves usable metallurgy | No industrial product | Preserve Earth-supply fallback and terminate or redirect 0B |

### Debris and contamination control

Under interim D-03, operations shall implement ALARP and the eventual approved design ceiling. **This proposal does not invent a release percentage.**

Operational rules must address:

- Particle size and velocity distributions, not just total mass.
- Release direction and trajectory evolution.
- Dust charging and redistribution.
- Plume/particle interactions.
- Sensor detection limits.
- Stop-work criteria.
- Containment verification after a fault.

The numerical ceiling and compliance method belong to the modelling, test, and licensing process led under bom-0-15. The operations system must be able to enforce whichever limits are approved.

---

## 12. Open engineering decisions

1. **Target geometry:** rotation, communications visibility, local gravity, regolith behaviour, and solar environment determine staffing and autonomy requirements.
2. **Permitted unattended states:** which mining, processing, and loading tasks may continue during extended loss of contact?
3. **Phase 1 product specification:** acceptable Fe-Ni chemistry, physical form, characterization method, and delivery timing remain decisive.
4. **Fleet utilization:** tug count does not establish annual delivery; round-trip duration, maintenance and loading availability must close the manifest.
5. **Receiving-node operations:** docking, storage, inspection and rejected-lot handling must be agreed with Phase 1.
6. **Control partitioning:** which functions are owned by robot, plant, site, and fleet controllers?
7. **Propellant-specific hazards:** iodine and argon impose different handling, contamination and operational constraints.
8. **Safe-state energy:** storage and thermal design must support the agreed disconnected survival case.
9. **Operational economics:** what measured intervention rate is affordable at contracted throughput?
10. **Shutdown and disposal:** approved end-of-life states are required for every asset before launch.

## Final recommendation

Authorize **a $187–344M mission-operations provision for 0A**, with spending released by lifecycle milestones. Carry **$461–865M for six years of 0B** only as a conditional planning allowance.

The most important 0A result is not a polished control room. It is evidence that an integrated, delayed-communications industrial system can **produce a traceable acceptable lot, survive faults, and reach a safe state without continuous human intervention**. Without that evidence—and the target, demand, economics and licence gates—industrial operations should not be funded.