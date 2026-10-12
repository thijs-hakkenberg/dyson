---
phase: phase-0
item: bom-0-4
round: 1
type: reassessment
modelId: gpt-6-1-sol
modelName: "GPT-6.1 Sol"
endpoint: databricks-gpt-6-1-sol
findings: 8607ae186f99
priorRound: null
generated: 2026-10-11T18:51:28.162Z
seconds: 168.699
---

## Assessment basis

**The present transport specification does not close.** The array area, cargo mass, mission cadence, station throughput and budget describe different architectures.

I recommend separating two functions:

1. **Local bulk handling:** place the processing station at the principal mining site and move approximately **50,000 t/yr** over short distances.
2. **Interplanetary transport:** use electric-propulsion tugs for selected products, equipment and supplies—not all the station’s raw feedstock.

This is a proposed architectural change, not evidence that the existing station design supports relocation. If the station must remain remote from the mine, the phase needs a substantially larger transport program.

### Assumptions

- Reference mission: near-Earth heliocentric operations, approximately **0.9–1.3 AU**; not main-belt operations.
- One loaded leg and one substantially empty return leg.
- Representative cargo: **200 t**; reusable vehicle dry mass: **60 t**, excluding cargo and mission propellant.
- Round-trip propulsion Δv: **8 km/s**, divided equally between legs.
- Δv excludes launch from Earth; orbit injection and delivery to the operating site require separate provision.
- Prices below are rough-order-of-magnitude planning allowances in approximately **2026 USD**, not supplier quotations.
- The additional station and deliberation documents were not supplied in full. Their quoted requirements can be assessed, but their complete mass, power and cost budgets cannot be reconstructed.

---

## 1. Findings

### P0-F01 — Transport capacity versus station throughput

**Verdict: agree with the closure failure; partly disagree with the numerical assumptions.**

#### The existing array estimate is optimistic

At 1 AU, incident sunlight is approximately \(1.36\ \mathrm{kW/m^2}\). At 30% cell efficiency:

\[
P_{\mathrm{cell}}=1.36(0.30)=0.41\ \mathrm{kW/m^2}.
\]

That is before packing, temperature, pointing, distribution and degradation losses. For preliminary sizing, use **0.20–0.30 kW/m² of usable beginning-of-life power per deployed array area**, with end-of-life and distance margins separately applied.

Thus:

\[
P=(300\text{–}500)\ \mathrm{m^2}(0.20\text{–}0.30)\ \mathrm{kW/m^2}
  \approx60\text{–}150\ \mathrm{kW}
\]

at 1 AU—not reliably 150–250 kW. Published ISS iROSA dimensions and power provide a useful flight-heritage check, although deep-space arrays would have a different design.[1]

Electric-propulsion thrust follows:

\[
F=\frac{2\eta P}{v_e},\qquad v_e=g_0I_{sp}.
\]

For \(I_{sp}=1,800\ \mathrm{s}\), \(v_e=17.7\ \mathrm{km/s}\), and assumed total propulsion efficiency \(\eta=0.55\):

\[
F/P \approx 62\ \mathrm{mN/kW}.
\]

The finding’s approximately 50 mN/kW is reasonable as an estimate, but it depends on operating point and propellant.

#### Account for unloading rather than keeping the vehicle loaded throughout

For a 60 t dry vehicle, 200 t cargo, and two 4 km/s burns:

\[
m_{\mathrm{return,start}}
=60e^{4/17.7}
\approx75\ \mathrm{t}.
\]

The loaded leg ends with cargo plus the fueled return vehicle:

\[
m_{\mathrm{outbound,end}}=200+75=275\ \mathrm{t}.
\]

\[
m_{\mathrm{outbound,start}}
=275e^{4/17.7}
\approx345\ \mathrm{t}.
\]

Total mission propellant is approximately:

\[
m_p=(345-275)+(75-60)\approx85\ \mathrm{t}.
\]

At 100 kW, thrust is approximately 6.2 N. Constant-power thrusting time is:

\[
t_b=\frac{m_pv_e}{F}
=\frac{85,000\ \mathrm{kg}\times17,700\ \mathrm{m/s}}
       {6.2\ \mathrm{N}}
\approx7.7\ \mathrm{yr}.
\]

At 60–150 kW, this reference mission requires approximately **5–13 years of thrusting**, before coast, docking, maintenance and power interruptions. Different dry masses and 6–10 km/s missions broaden that range.

Therefore, the finding’s multi-year result is sound. Its exact 5–10-year interval is not universal.

Even ignoring that problem, ten 200 t vehicles completing ten cycles in fifteen years deliver only:

\[
\dot M=\frac{10(200\ \mathrm{t})(10)}{15\ \mathrm{yr}}
\approx1,330\ \mathrm{t/yr}.
\]

Fifteen vehicles yield about 2,000 t/yr. Both are far below 50,000 t/yr.

#### Proposed replacement transport architecture

For interplanetary tugs, increase usable propulsion power to **1–2 MW per operating vehicle** and use a qualification target of approximately **2,000–3,000 s \(I_{sp}\)**.

At the reference point \(P=1.5\ \mathrm{MW}\), \(I_{sp}=2,500\ \mathrm{s}\), \(\eta=0.55\):

- Exhaust velocity: approximately 24.5 km/s.
- Thrust: approximately 67 N.
- Return propellant: approximately 11 t.
- Loaded-leg propellant: approximately 48 t.
- Total mission propellant: approximately **59 t**.
- Accumulated thrusting time:

\[
t_b\approx
\frac{59,000(24,500)}{67}
\approx2.2\times10^7\ \mathrm{s}
\approx0.68\ \mathrm{yr}.
\]

This is **not** a trajectory-derived trip time. Adopt a preliminary **1.5–3-year complete mission cycle**, pending low-thrust trajectory optimization and maintenance analysis.

With ten vehicles operating and five held for maintenance, reserves or phased deployment:

\[
\dot M=\frac{10(200)}{1.5\text{–}3}
\approx670\text{–}1,330\ \mathrm{t/yr}.
\]

That is a credible preliminary target of approximately **1 kt/yr**, not 50 kt/yr.

At the same cadence, transporting 50 kt/yr would require:

\[
N_{\mathrm{active}}=
\frac{50,000(1.5\text{–}3)}{200}
\approx375\text{–}750
\]

active vehicles, plus reserves, and approximately **0.4–1.5 GW** of simultaneous propulsion power.

**Change proposed:** retain a limited interplanetary fleet, co-locate mining and processing, and add a separately specified 50 kt/yr local handling system. If co-location is rejected, reopen the whole phase architecture and budget.

---

### P0-F10 — Crew transport and habitation

**Verdict: agree.**

“Human-tended with quarterly visits” is an operational requirement, not a small structural option. It needs habitats, life support, consumables, radiation protection, medical capability, safe havens, transport and a demonstrated rescue strategy.

I recommend **uncrewed Phase 0**. Remove quarterly visits and mandatory crew accommodation from the station baseline. Retain robotic maintenance interfaces and optional future expansion interfaces.

I disagree with several conclusions in rq-0-18:

- Crew demand in Years 4–5 is asserted, not demonstrated.
- A 12–20% human-rating premium and 2–3× retrofit penalty are not supported by an itemized design.
- A 30-day shelter is not an adequate rescue strategy for vehicles with multi-year mission cycles.
- Nearby facilities and rescue tugs cannot be assumed to exist at the needed locations and times.
- A 3g structural requirement is unexplained. For a roughly 320 t departure vehicle:

\[
F_{3g}\approx320,000(3)(9.81)\approx9.4\ \mathrm{MN},
\]

versus approximately 67 N from its reference EP system. Launch loads and crew-module loads must be assessed separately; an arbitrary 3g tug requirement does not establish human-rating.

NASA NPR 8705.2 provides relevant safety principles.[5] Tailoring requirements does not eliminate the need to demonstrate survival and rescue performance.

**Change proposed:** no Phase-0 crew kits or human-rating claim. Any crewed extension becomes a separately funded program with trajectory-specific safety requirements.

---

### P0-F11 — Propellant supply and unused ISPP output

**Verdict: agree with the gap; partly disagree with the implied demand.**

The quoted “approximately 100 t per trip” is plausible for some low-\(I_{sp}\) cases, but is not a universal requirement.

For the proposed reference fleet:

\[
\dot m_p=
\frac{10(59\ \mathrm{t})}{1.5\text{–}3\ \mathrm{yr}}
\approx200\text{–}400\ \mathrm{t/yr}.
\]

Carry a wider preliminary allowance of **100–800 t/yr** until trajectories, cargo loads, dry mass and operating points are fixed.

#### Iodine

USGS reports world iodine production on the order of **30,000–35,000 t/yr**.[4] The reference demand is therefore approximately **0.6–1.3%** of current annual production, before purification losses and contingency stock.

This does **not** make propulsion-grade iodine supply automatically available. Procurement, purity, materials compatibility, storage, feed systems and multi-year thruster operation remain development work.

An iodine propulsion system has operated in orbit, but that demonstration was at approximately **20 W**, not at megawatt-class freight scale.[3] It establishes feasibility, not scalable readiness.

#### Krypton and xenon

Krypton supply must be assessed through industrial-gas suppliers. Reliable production and recoverable spare-capacity figures were not supplied, and I would not certify a hundreds-of-tonnes annual procurement program from atmospheric abundance alone.

Likewise, the existing “xenon demand exceeds global production 15–20×” statement has no supporting procurement model here. Xenon has strong propulsion heritage, but fleet-scale availability must be calculated rather than asserted.

**Recommended status:** iodine is a **supply-screened development candidate**, krypton an alternative, and xenon a useful demonstration/qualification option. None is yet an approved production-fleet propellant.

#### ISPP coupling

Water electrolysis does not produce krypton or iodine. The selected tug fleet has **no LOX/LH₂ propulsion demand**.

**Change proposed:** add EP propellant procurement, delivery, storage and loading. Move bulk LOX/LH₂ production to Phase 0B unless a separately specified chemical vehicle or other customer justifies it. Water may still have industrial uses, but that is not equivalent to closing a chemical-propellant business case.

---

### P0-F15 — Deliberations not incorporated

**Verdict: partly.**

Configuration-control failure is real. However, a concluded deliberation should not automatically become a binding engineering requirement when its assumptions fail closure.

For each cited conclusion:

| Conclusion | Required disposition for transport and phase interfaces |
|---|---|
| **rq-0-11: 0.05–0.15g processing zones** | Station requirement, not tug gravity. Supply containers compatible with station handling. Rotor, bearings, transfer machinery and station mass/power changes need station-level sizing; no numerical increment is supportable from the supplied excerpt. |
| **rq-0-14: ISPP deployed in 0B at ≥25 kt/yr** | Defer operational ISPP from Phase 0. Define what the threshold measures—ore, water, product or propellant—and require an identified customer. |
| **rq-0-18: structural human-rating** | Replace with optional future interfaces; reject mandatory human-rating and three crew kits for the uncrewed baseline. |
| **rq-0-28: ISRU cost methodology** | Separate development, recurring hardware, launch, propellant delivery, infrastructure and operations. The detailed conclusion was not supplied; no claimed percentage saving should be imported. |
| **rq-0-29: governance** | Add controlled interfaces, supplier obligations, safety authority and configuration/change control through bom-0-7. No defensible tug mass or power change follows. |
| **rq-0-30: boil-off** | No cryogenic tug tanks in the selected architecture. Any 0B LOX/LH₂ depot needs its own storage duration, heat leak, refrigeration and loss budget. |
| **rq-0-47: sunshield** | Applicability depends on the omitted conclusion. Do not assign a cryogenic sunshield to a non-cryogenic tug by default. Include thermal protection appropriate to the chosen EP propellant and operating distance. |
| **rq-0-48: MLI degradation** | Include end-of-life thermal verification and maintainability. Shielding, contamination and aging penalties require environment and materials data; no invented percentage mass penalty. |

**Change proposed:** issue a disposition register linking every conclusion to an accepted, modified, deferred or rejected requirement. Update the specifications only after closure analysis.

---

### P0-F16 — BOM/specification disagreements

**Verdict: agree.**

There is no single consistent current transport baseline:

- BOM: 15 vehicles at approximately $133M each.
- Consensus: 10 vehicles at $200M each.
- BOM: krypton/iodine.
- Consensus: xenon.
- Deliberation: additional crew capability, still framed around ten vehicles.

**Proposed authority:** the approved, version-controlled reassessment becomes the transport baseline:

- **15 eventual vehicle positions:** ten operating, five reserve/maintenance/phased-deployment positions.
- Procurement staged behind propulsion and mission demonstration gates.
- No production propellant frozen before qualification and supply approval.
- No human-rating requirement in Phase 0.

I cannot truthfully regenerate the other consensuses from “current specs” that were not supplied. Pending their review, the administrative prospecting baseline remains **32 satellites/$160M**, but that is not a technical endorsement. The lunar-versus-NEA ISPP conflict also remains unresolved.

Model-generation date or model version does not determine engineering authority; an approved requirements baseline does.

---

## 2. Revised specification

These values describe the **co-located processing / limited interplanetary export** architecture.

| Parameter | Old → proposed new | Basis | Confidence |
|---|---|---|---|
| Fleet | 10 in consensus / 15 in BOM → **15 eventual positions; 10 active, 5 reserves**, staged procurement | Operational judgment; not optimized | Medium |
| Cargo capacity | 150–250 t → **retain 150–250 t**, reference 200 t | Existing target; requires structural/container validation | Medium |
| Dry mass | Unspecified → **40–80 t**, reference 60 t | Sizing allowance, not completed mass budget | Low |
| Usable propulsion power | Implicitly approximately 60–150 kW → **1–2 MW per active tug** over specified route | Thrust/cycle calculation | Medium |
| Array area | 300–500 m² → approximately **6,000–16,000 m² per tug** | 0.20–0.30 kW/m² at 1 AU; distance and end-of-life margins | Low |
| Propulsion | Assumed Hall/gridded, xenon or Kr/I → **qualified clustered EP; propellant down-select deferred** | Flight heritage plus major scale-up gap | Medium |
| Qualification \(I_{sp}\) target | Unspecified; finding uses 1,800 s → **2,000–3,000 s** | Engineering target, not demonstrated iodine-Hall performance | Low |
| Round-trip Δv | 6–10 km/s → **retain as provisional**, reference 8 km/s | Requires route-specific trajectory solution | Low |
| Reference mission propellant | Unspecified → **approximately 60 t**; planning range **30–120 t** | Staged rocket equation; range is not exhaustive | Medium |
| Complete cycle | Implied ≤1.5 yr → **1.5–3 yr** for revised MW-class vehicle | Estimated scheduling allowance after thrust calculation | Low |
| Annual interplanetary cargo | Unstated closure → **approximately 1 kt/yr**, range 0.7–1.3 kt/yr at 200 t cargo | Ten active vehicles/cycle | Medium |
| Station raw-feed transfer | Implicitly interplanetary → **50 kt/yr local transfer** | Architecture decision | Low |
| Life | 15 yr and 10+ cycles → **15-year service-life goal; approximately 5–10 cycles**, replaceable propulsion modules | Cadence and maintainability | Low |
| Crew | Human-rating provisions and kits → **uncrewed; no crew kits** | Scope/safety judgment | Medium |
| Recurring vehicle cost | $133–250M → **$200–500M each** | ROM allowance for unprecedented MW-class system | Low |
| Fleet acquisition and development | $2B → **$4–10.5B**, excluding launch, propellant delivery and operations | 15 × $200–500M plus $1–3B development | Low |

**Heritage limitation:** Dawn’s approximately 2.3 kW xenon ion engines, Psyche’s kilowatt-class Hall propulsion and NASA’s approximately 12 kW-class AEPS development are useful references, but none validates a reusable 200 t freighter with megawatt propulsion.[2] NASA’s NEXT long-duration ground testing supports thruster-life assessment methods, not direct extrapolation to this vehicle.

---

## 3. Interfaces

| Interface | Proposed exchange | Closure status |
|---|---|---|
| **bom-0-2 Mining Robots** | Approximately **50,000 t/yr raw material** into local handling and processing; negligible required interplanetary ore transfer | Twenty robots would average 2,500 t/yr each before downtime. Mining and short-haul handling capability remain unproven. |
| **bom-0-3 Processing Station** | Approximately **0.7–1.3 kt/yr outbound interplanetary cargo capacity**, nominally products/equipment; return cargo must be explicitly scheduled | Separate from 50 kt/yr station input. Product yield, local consumption and inventory must close. |
| **bom-0-3 Processing Station** | EP propellant loading: reference **200–400 t/yr**, allowance 100–800 t/yr | Depot/loading facilities omitted from present BOM. |
| **bom-0-5 Solar Power Arrays** | **10–20 MW** usable mobile propulsion power for ten active tugs; reserve vehicles need their own array provision if flight-ready | Not supplied by stationary arrays during free flight. Revise the power line’s scope or explicitly include mobile arrays in tug costs—never both. |
| **bom-0-5 Solar Power Arrays** | Preliminary **0.1–0.3 MW total dockside service power** | Estimate for servicing and conditioning; not charging an interplanetary propulsion-energy battery. |
| **bom-0-6 ISPP** | **0 t/yr LOX/LH₂ to selected tugs**; water demand not yet specified | No closed Phase-0 chemical-propellant customer. |
| **bom-0-1 Prospecting Satellites** | Target ephemerides, composition, rotation and navigation products; approximately **1–10 GB/day fleet planning-data allowance** | Estimated data volume, not a validated communications requirement. |
| **bom-0-7 Organization** | Fleet scheduling, collision avoidance authority, cargo custody, configuration control and supplier contracts | Explicit operational staffing and ground-system costs are missing. |

At 2.5 AU, otherwise identical arrays receive only \(1/2.5^2\approx16\%\) of their 1 AU sunlight. **Main-belt operations invalidate the proposed power/cycle baseline unless arrays, payload or cadence change.**

---

## 4. Missing items or scope

1. **Local bulk-material handling:** anchored transfer, containers/conveyors, capture and dust control capable of 50 kt/yr. Low gravity does not eliminate inertia, reaction loads or escape risk.
2. **EP propellant logistics:** purchase, qualification, Earth delivery, depot storage, contamination control and transfer equipment.
3. **Propulsion development and qualification:** full-scale power processing, feed systems, clustering, plume interaction and lifetime tests.
4. **Thermal rejection:** at 1.5 MW and 55% propulsion efficiency, approximately **0.7 MW** is not converted to directed exhaust kinetic power. Not all becomes vehicle radiator load, but its deposition must be modeled.
5. **Launch, orbit injection and assembly:** including large arrays, tug dry mass, initial propellant and replacement modules.
6. **Maintenance:** robotic module replacement, propulsion spares, docking/berthing fixtures and cargo restraints.
7. **Communications and operations:** deep-space links, navigation support, tracking, ground systems and conjunction management.
8. **Output disposition:** processing 50 kt/yr while exporting approximately 1 kt/yr requires substantial local use, stockpiling or a different product-flow plan.
9. **Crew infrastructure, only if scope changes:** habitat, life support, transport, safe havens and credible rescue—not just interchangeable cabins.

The listed phase BOM totals approximately **$15.7B**. Replacing the $2B transport allowance with $4–10.5B raises it to approximately **$17.7–24.2B before the other omitted scope**. Moving the $2B ISPP line to Phase 0B offsets some near-term expenditure, but does not close launch, logistics or local-handling costs.

---

## 5. Remaining disagreements and open questions

- **Co-location versus remote station:** co-location avoids bulk interplanetary haulage but changes station siting, anchoring, contamination and gravity-zone design.
- **Hall versus gridded propulsion:** select through trajectory, lifetime, feed-system and power-system trades—not model preference.
- **Iodine versus krypton:** iodine looks more favorable in bulk supply screening; megawatt-class compatibility and lifetime remain unresolved.
- **Fleet size:** fifteen is an administrative planning baseline, not a demonstrated optimum. Smaller demonstrators should precede production procurement.
- **Human presence:** engineers may favor eventual crews, but no evidence supplied establishes their necessity or affordable rescue in Phase 0.
- **Lifetime:** fifteen years requires replaceable components, degradation allowances and a servicing concept; ten cycles cannot be promised independently of cadence.
- **Station utilization:** 50 kt/yr may be nameplate capacity rather than initial demand. A staged throughput ramp could materially reduce early transport and mining requirements.
- **Cost:** flight heritage constrains physical expectations better than it constrains prices for this unprecedented architecture.

### Reference basis

1. **NASA, ISS Roll-Out Solar Arrays (iROSA):** published array dimensions and approximately 20 kW-class output per deployed assembly.
2. **NASA/JPL, Dawn mission propulsion documentation; NASA/JPL, Psyche electric propulsion documentation; NASA, AEPS and NEXT program publications:** kilowatt-class operating points and propulsion endurance evidence.
3. **Rafalskyi et al., “In-orbit demonstration of an iodine electric propulsion system,” Nature 599, 411–415 (2021).** DOI: [10.1038/s41586-021-04015-y](https://doi.org/10.1038/s41586-021-04015-y).
4. **USGS, Mineral Commodity Summaries 2025, Iodine:** world-production scale. Production is not equivalent to immediately available propulsion-grade supply.
5. **NASA NPR 8705.2, Human-Rating Requirements for Space Systems:** safety framework; applicability and tailoring require program-specific review.

```yaml
item: bom-0-4
model: GPT-5.2
findings:
  - id: P0-F01
    verdict: partly
    summary: The transport deficit is real, but the original array-power estimate is optimistic and trip time must account for unloading.
    proposed_change: Co-locate bulk processing with mining and use a MW-class interplanetary fleet for approximately 1 kt/yr of selected cargo.
  - id: P0-F10
    verdict: agree
    summary: Human-tended operations lack budgeted habitation, life support, transport and credible rescue.
    proposed_change: Make Phase 0 uncrewed and remove mandatory human-rating and crew-kit procurement.
  - id: P0-F11
    verdict: partly
    summary: EP propellant logistics are missing, but demand depends on mission design and the selected tugs do not consume LOX or LH2.
    proposed_change: Budget approximately 200-400 t/yr of reference EP propellant demand and defer bulk chemical ISPP pending an identified customer.
  - id: P0-F15
    verdict: partly
    summary: Configuration control is inadequate, but concluded deliberations require engineering disposition rather than automatic adoption.
    proposed_change: Publish an accepted, modified, deferred or rejected disposition for every conclusion and update controlled requirements accordingly.
  - id: P0-F16
    verdict: agree
    summary: Vehicle count, propellant choice and cost disagree across the BOM and consensus documents.
    proposed_change: Establish this reassessment as the proposed transport baseline and regenerate other consensuses only after reviewing their current source specifications.
revised_spec:
  - parameter: eventual fleet positions
    old: 10 in consensus and 15 in BOM
    new: 15 with 10 active and 5 reserve or phased-deployment positions
    range: [15, 15]
    unit: vehicles
    basis: judgement
    confidence: medium
  - parameter: cargo capacity
    old: 150-250
    new: 200 reference
    range: [150, 250]
    unit: t/vehicle
    basis: judgement
    confidence: medium
  - parameter: vehicle dry mass
    old: unspecified
    new: 60 reference
    range: [40, 80]
    unit: t
    basis: judgement
    confidence: low
  - parameter: usable propulsion power
    old: approximately 0.06-0.15 at 1 AU
    new: 1.5 reference over the specified operating route
    range: [1, 2]
    unit: MW/active vehicle
    basis: calculation
    confidence: medium
  - parameter: deployed solar array area
    old: 300-500
    new: approximately 10000 reference with distance and degradation allowances
    range: [6000, 16000]
    unit: m2/vehicle
    basis: calculation
    confidence: low
  - parameter: qualification specific impulse target
    old: unspecified
    new: 2500 reference subject to propellant qualification
    range: [2000, 3000]
    unit: s
    basis: judgement
    confidence: low
  - parameter: round-trip delta-v
    old: 6-10
    new: 8 reference pending trajectory optimization
    range: [6, 10]
    unit: km/s
    basis: judgement
    confidence: low
  - parameter: mission propellant
    old: unspecified
    new: approximately 60 reference
    range: [30, 120]
    unit: t/round trip
    basis: calculation
    confidence: medium
  - parameter: complete mission cycle
    old: approximately 1.5 or less implied
    new: 2 reference for revised MW-class vehicle
    range: [1.5, 3]
    unit: yr
    basis: judgement
    confidence: low
  - parameter: annual interplanetary cargo capacity
    old: unspecified
    new: approximately 1000 at 200 t cargo and 10 active vehicles
    range: [670, 1330]
    unit: t/yr
    basis: calculation
    confidence: medium
  - parameter: annual EP propellant demand
    old: unspecified
    new: 200-400 reference with wider planning allowance
    range: [100, 800]
    unit: t/yr
    basis: calculation
    confidence: low
  - parameter: local raw-feed handling requirement
    old: implicitly assigned to interplanetary transport
    new: 50000 at co-located mining and processing site
    range: [50000, 50000]
    unit: t/yr
    basis: judgement
    confidence: low
  - parameter: lifetime mission count
    old: 10 or more in 15 years
    new: approximately 5-10 with replaceable propulsion modules
    range: [5, 10]
    unit: cycles/vehicle
    basis: calculation
    confidence: low
  - parameter: Phase-0 crew kits
    old: 3 recommended by deliberation
    new: 0
    range: [0, 0]
    unit: kits
    basis: judgement
    confidence: medium
  - parameter: recurring vehicle cost
    old: 133-250 million
    new: 200-500 million excluding launch and propellant delivery
    range: [200000000, 500000000]
    unit: USD/vehicle
    basis: judgement
    confidence: low
  - parameter: fleet acquisition and development cost
    old: 2000000000
    new: 4-10.5 billion excluding launch and operations
    range: [4000000000, 10500000000]
    unit: USD
    basis: judgement
    confidence: low
interfaces:
  - with: bom-0-2
    flow: mass
    value: 50000 t/yr raw feed through separately specified local handling
    in_bom: false
  - with: bom-0-3
    flow: mass
    value: 670-1330 t/yr outbound interplanetary cargo capacity
    in_bom: true
  - with: bom-0-3
    flow: propellant
    value: 200-400 t/yr reference EP propellant loading
    in_bom: false
  - with: bom-0-5
    flow: power
    value: 10-20 MW usable mobile propulsion power for 10 active vehicles
    in_bom: false
  - with: bom-0-5
    flow: power
    value: 0.1-0.3 MW estimated fleet dockside service power
    in_bom: false
  - with: bom-0-6
    flow: propellant
    value: 0 t/yr LOX or LH2 consumed by selected tugs
    in_bom: false
  - with: bom-0-1
    flow: data
    value: 1-10 GB/day estimated fleet planning and target-data allowance
    in_bom: false
  - with: bom-0-7
    flow: other
    value: 1 controlled fleet operations and configuration-management function
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-4
    quantity: 15 eventual vehicles procured in stages
    unit_cost_usd: [200000000, 500000000]
    rationale: MW-class power and replaceable propulsion are needed for useful mission cadence at the retained cargo capacity.
  - action: add
    item: Transport development and qualification
    quantity: 1 program
    unit_cost_usd: [1000000000, 3000000000]
    rationale: Existing flight heritage does not qualify the proposed MW-class freight vehicle.
  - action: split
    item: bom-0-5
    quantity: Separate stationary power from mobile tug arrays
    unit_cost_usd: [0, 0]
    rationale: This is an accounting split with mobile array cost already included in the revised vehicle allowance.
  - action: split
    item: bom-0-6
    quantity: Defer operational bulk chemical propellant production to Phase 0B
    unit_cost_usd: [0, 0]
    rationale: The selected Phase-0 tugs have no LOX or LH2 demand and these zeros are not a Phase-0B hardware cost estimate.
  - action: keep
    item: bom-0-3
    quantity: 1 station with co-location and uncrewed requirements subject to station reassessment
    unit_cost_usd: [10000000000, 10000000000]
    rationale: Retain the existing placeholder without endorsing its cost closure while changing siting and crew assumptions.
open_questions:
  - Can the processing station operate at the mining site while meeting contamination and gravity-zone requirements?
  - What fraction of 50000 t/yr input becomes exportable product, local construction material, waste or inventory?
  - Which specific asteroid and operating orbit define distance, delta-v, navigation and power requirements?
  - Can iodine or krypton propulsion meet the required power, efficiency, throughput and lifetime after qualification?
  - What supplier-backed propulsion-grade propellant capacity and delivered price are available?
  - What mass and heat-rejection system does a complete MW-class tug design require?
  - Can twenty mining robots and a local handling system sustain 50000 t/yr with realistic downtime?
  - What launch, injection, assembly, depot and replacement-module costs must be added?
  - Is fifteen vehicles preferable to a smaller staged fleet or a different cargo size?
  - If crews are later required, what trajectory-specific survival and rescue architecture is demonstrably feasible?
  - What do the omitted current specifications and full deliberation records require after engineering disposition?
```
