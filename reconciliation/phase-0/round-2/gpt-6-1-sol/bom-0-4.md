---
phase: phase-0
item: bom-0-4
round: 2
type: reassessment
modelId: gpt-6-1-sol
modelName: "GPT-6.1 Sol"
endpoint: databricks-gpt-6-1-sol
findings: b907d2fc76f4
priorRound: 1
framework: 18f503fe4ec6
generated: 2026-10-12T09:27:25.697Z
seconds: 234.8
---

# 1. Findings

## Assessment basis

**The fleet cannot supply a remotely located station processing 50,000 t/yr.** That conclusion survives review. Several numbers in the finding and the previous reconciliation, however, are estimates rather than closed designs.

I recommend a **conditional Phase-0 baseline**:

- Uncrewed operations.
- Fifteen fleet positions, purchased in stages; planning assumption of twelve operational vehicles on average.
- Approximately **1 kt/yr of interplanetary cargo**, not 50 kt/yr.
- A processing demonstration rated at **1–2 kt/yr**, unless the project explicitly chooses asteroid-local processing and separately closes its local material-handling system.
- Approximately **0.8 MW of usable propulsion power per tug**, with substantial qualification required.
- No production-propellant selection until supply, performance and lifetime gates are passed.

This is a planning reference, **not a trajectory-validated procurement specification**.

### Calculation assumptions

For the reference calculation:

| Quantity | Assumption |
|---|---:|
| Delivered cargo | 200 t |
| Vehicle dry mass, including empty tanks and cargo interface | 40 t |
| Outbound/return manoeuvre budget | 4 + 4 km/s |
| Specific impulse | 2,200 s |
| Electrical-to-directed-jet efficiency | 0.55 |
| Usable propulsion power | 0.8 MW |
| Refuelling | At processing station only |
| Outbound cargo | Negligible in this calculation |
| Reference operating region | Selected NEAs, approximately 0.9–1.3 AU |

Actual equipment delivery, reserves, missed rendezvous and target geometry will change these values.

For electric propulsion:

\[
v_e=g_0 I_{sp}=9.80665\ {\rm m/s^2}\times2,200\ {\rm s}
=21.6\ {\rm km/s}
\]

\[
F=\frac{2\eta P}{v_e},\qquad
\dot m=\frac{2\eta P}{v_e^2}
\]

These equations account for propulsion efficiency, but not spacecraft housekeeping power or thruster duty-cycle losses.

---

## P0-F01 — Transport capacity versus station throughput

**Verdict: partly agree.** The blocking mismatch is real. The finding overstates array output and estimates thrust time using loaded mass throughout the round trip.

### Original array output

Using solar flux of 1,361 W/m² at 1 AU, cell efficiency of 28–32%, and an aggregate packing, temperature and electrical factor of 0.70–0.85:

\[
P=A(1,361\ {\rm W/m^2})(0.28–0.32)(0.70–0.85)
\]

For 300–500 m²:

\[
P\approx80–185\ {\rm kW}
\]

This is an estimated beginning-of-life array output. End-of-life usable propulsion power is lower. At 1.3 AU, sunlight is only \(1/1.3^2=0.59\) of its 1-AU value.

Thus **150–250 kW is optimistic**, especially as usable end-of-life propulsion power.

### Correct treatment of the unloaded outbound leg

Let:

\[
r=e^{4,000/21,575}-1=0.204
\]

Return propellant, ending with 40 t dry mass plus 200 t cargo:

\[
m_{p,\rm return}=240\ {\rm t}\times0.204=48.9\ {\rm t}
\]

Because return propellant is carried outbound:

\[
m_{p,\rm outbound}=(40+48.9)\ {\rm t}\times0.204=18.1\ {\rm t}
\]

Therefore:

\[
m_{p,\rm cycle}=67\ {\rm t}
\]

The vehicle starts outbound at approximately 107 t and starts its loaded return at approximately 307 t. Treating both legs as a continuously loaded 300–350 t vehicle exaggerates burn time.

At a representative original propulsion power of 120 kW:

\[
F=6.1\ {\rm N}
\]

\[
\dot m=2.84\times10^{-4}\ {\rm kg/s}=8.9\ {\rm t/yr}
\]

\[
t_{\rm thrust}=67/8.9\approx7.5\ {\rm yr}
\]

Across 60–175 kW usable propulsion power, this reference case requires approximately **5–15 years of thrusting**, before coast, waiting, cargo handling or maintenance. That supports the finding’s conclusion, but not a universal 5–10-year trip.

Even the claimed ten cycles in fifteen years delivers only:

\[
15\times200\ {\rm t}\times\frac{10}{15\ {\rm yr}}
=2,000\ {\rm t/yr}
\]

This is **25 times below** station throughput. The original low-power design is worse.

### Revised reference vehicle

At 0.8 MW:

\[
F\approx40.8\ {\rm N},\qquad \dot m\approx59.6\ {\rm t/yr}
\]

\[
t_{\rm thrust}\approx67/59.6=1.12\ {\rm yr}
\]

At 75% effective thrust duty, thrusting alone occupies approximately 1.5 calendar years. Adding an assumed 0.5–2 years for trajectory coasts, phasing, cargo operations and servicing gives a **2–3.5-year planning cycle**. This allowance is not an orbital solution.

With twelve operational vehicles:

\[
Q=\frac{12\times200\ {\rm t}}{2.5\ {\rm yr}}
=960\ {\rm t/yr}
\]

A reasonable provisional planning band is **0.6–1.5 kt/yr**.

### Reconciling the previous round’s power estimates

Delivering 50 kt/yr requires 250 reference cargo cycles annually:

\[
\dot M_p=250\times67=16,750\ {\rm t/yr}
\]

The propulsion-energy floor is:

\[
P_{\rm average}
=\frac{\dot M_p v_e^2}{2\eta}
\approx225\ {\rm MW}
\]

This is average electrical power **while aggregated over the year**, before housekeeping and operational constraints. At 75% effective duty, installed propulsion power exceeds approximately 300 MW.

The reference fleet cadence instead requires:

\[
N_{\rm active}=250\ {\rm cycles/yr}\times2.5\ {\rm yr}=625
\]

\[
P_{\rm active}=625\times0.8\ {\rm MW}=500\ {\rm MW}
\]

A broader **0.3–1 GW** planning envelope is credible for this architecture; it is not a universal SEP requirement.

**I reject the previous round’s 15–25 MW estimate for 50 kt/yr at 8 km/s.** It violates the reference propulsion-energy requirement. It could describe a different, much lower-Δv local transport architecture.

**Proposed change:** adopt a 1–2 kt/yr processing pilot for baseline planning. Preserve asteroid-local 50 kt/yr processing as a separate architecture option, not as an already closed alternative.

---

## P0-F10 — Crew transport and habitation

**Verdict: agree.**

Choose **uncrewed Phase 0** and remove quarterly crew visits and mandatory crew habitat from the station baseline.

The rq-0-18 conclusion is not substantiated by the supplied engineering:

- Crew demand in Years 4–5 is asserted, not demonstrated.
- Its 60–90-day transits are inconsistent with the specified cargo tug.
- A 30-day shelter does not establish rescue feasibility when vehicles can be months or years away.
- Human-rating is not a structural kit alone; it involves integrated hazards, life support, reliability, software, operations and rescue.
- The 12–20% premium and 2–3× retrofit penalty lack an itemized basis.

A 3g requirement would produce, on a 300 t vehicle:

\[
F=300,000\ {\rm kg}\times3\times9.81\ {\rm m/s^2}
\approx8.8\ {\rm MN}
\]

This is over 200,000 times the reference EP thrust. Launch loads may justify particular structural requirements, but a generic “3g emergency acceleration” requirement does not.

**Proposed change:** retain standardized docking, power and data interfaces, but do not label them human-rated. Crew capability becomes a separately funded decision requiring a credible mission-duration and rescue case.

I also reject “crew carriage is physically impossible” as too strong: a different vehicle and mission could carry crew. It is simply **not justified for this baseline tug**.

---

## P0-F11 — Propellant supply and ISPP consumer

**Verdict: partly agree.**

The omitted supply chain is real. The proposed “100 t per trip” is not universal, and annual demand must follow the actual transport cadence.

For the reference vehicle:

\[
\dot M_p=\frac{12\times67\ {\rm t}}{2.5\ {\rm yr}}
\approx322\ {\rm t/yr}
\]

Adding approximately 10% for reserves, qualification and handling gives roughly **350 t/yr procured**. Use **200–600 t/yr** as a preliminary operating allowance, not a supplier-backed forecast.

At the original slow cadence, annual consumption would be lower. At 50 kt/yr of remote cargo throughput, consumption becomes tens of thousands of tonnes annually.

### Supply and readiness

- **Iodine:** USGS reports world production on the order of **30–40 kt/yr**, excluding withheld US production. A few hundred tonnes annually is plausible in bulk-market terms, but propulsion-grade processing, contracts and delivery remain unclosed.
- **Krypton:** neither 8,000 t/yr nor 100–500 t/yr in the previous reconciliation is adequately sourced. Do not choose either as an authoritative production figure.
- **Xenon:** “physically impossible” and “15–20× global production” are unsupported without a dated production estimate and an explicit fleet-consumption model. Supply may make it unattractive without making it physically impossible.

As a sanity check—not a production estimate—atmospheric Kr/Xe abundances imply a mass ratio of roughly eight. Industrial recovery efficiencies and markets differ, so this cannot establish available supply.

The iodine flight demonstration reported by Rafalskyi et al. was a **roughly 50–60 W-class gridded-ion system**, not a MW-class Hall system. It demonstrates iodine feasibility, not production-tug readiness. Laboratory iodine Hall work is not equivalent to flight-qualified fleet heritage.

### ISPP disposition

Water, LOX and LH₂ do not directly feed the proposed Kr/I Hall propulsion system. Defer the **four-unit, $2B** ISPP deployment to Phase 0B unless a specific Phase-0 customer is established.

Moving to LOX/LH₂ is not a free transport solution. At 450 s, the same 4+4 km/s station-refuel-only calculation gives approximately **940 t of propellant per cycle**, versus 67 t for the reference EP case. Refuelling at both ends substantially changes that result, but requires a second working supply chain.

**Proposed change:** add terrestrial EP-propellant procurement, purification, transport, storage and transfer. Keep production propellant selection open behind qualification and supply gates.

---

## P0-F15 — Deliberations not written back

**Verdict: partly agree.**

The configuration-control problem is visible. The exact claim “eight of nine” cannot be independently audited from the supplied excerpts. Nor should concluded discussions automatically become requirements when their engineering is unsupported.

| Deliberation | Proposed disposition for transport vehicles | Quantitative consequence |
|---|---|---|
| rq-0-11: hybrid gravity zones | Accept station-side requirement conditionally; tug berths at a despun interface | Berthing system included in tug mass; incremental mass/power unclosed |
| rq-0-14: ISPP in Phase 0B | Accept deferral, but throughput alone is not a deployment gate | Remove $2B production deployment from Phase-0 baseline; development retained separately |
| rq-0-18: structural human-rating | Reject mandatory tug human-rating; preserve generic interfaces | No mandatory 2–4 t allocation or three crew kits; claimed savings not booked |
| rq-0-28: ISRU cost methodology | Require Earth-delivered and ISRU-supported estimates separately | No numerical savings accepted without the full method |
| rq-0-29: governance | Assign fleet operator, configuration authority and safety responsibility | Operations staffing and insurance costs remain unclosed |
| rq-0-30: cryogenic boil-off | Not applicable to solid iodine or ambient-temperature compressed Kr | No cryogenic equipment assigned by default |
| rq-0-47: sunshield | Reassess for actual tank and spacecraft thermal requirements | No inherited sunshield mass without design |
| rq-0-48: MLI degradation | Include end-of-life thermal analysis | No arbitrary insulation penalty imported |

The previous round understated thermal scope when it treated thermal design as only iodine feed heating. Thrusters, power processors, avionics, solar arrays and tanks all require thermal analysis. Conversely, **non-directed propulsion power is not all deposited in the spacecraft**; plume and radiation losses must be distinguished from conducted heat before sizing radiators.

**Proposed change:** issue an accepted/modified/deferred/rejected disposition register with traceable mass, power and cost allocations. Request the full deliberations before importing missing numerical requirements.

---

## P0-F16 — BOM and consensus disagree

**Verdict: agree.**

The transport inconsistencies are directly visible:

- BOM: 15 vehicles at $133M each.
- Consensus: 10 vehicles at $200M each.
- BOM: krypton/iodine.
- Consensus: xenon.

Use the current BOM as the **administrative baseline**, not as proof that its engineering is correct. This reassessment recommends retaining fifteen fleet positions while changing power, cost, readiness and operational assumptions.

For the other items, 32 prospectors/$160M and four ISPP units/$2B remain the current administrative figures until their own change requests are approved. The lunar/NEA ISPP architecture discrepancy requires a phase-level decision.

**I cannot regenerate consensus from “current specs” that were not supplied.** A newer model version is not, by itself, authoritative evidence.

**Proposed change:** regenerate the affected documents after an approved architecture decision, recording source revisions and superseded requirements. Do not average incompatible specifications.

---

# 2. Revised specification

These are proposed planning values. The mass, power and cost ranges are not independent: a heavier spacecraft or less favorable route requires a different coupled design.

| Parameter | Old → proposed | Range | Basis; confidence |
|---|---|---|---|
| Fleet | 10 in consensus / 15 in BOM → 15 staged fleet positions | 12–20 total; 10–15 operational | Judgement; medium |
| Payload | 150–250 t → 200 t reference | 150–250 t | Retained requirement; medium |
| Dry mass | Unspecified → 40 t reference | 30–70 t | Preliminary allocation; low |
| Propulsion power | 300–500 m² arrays → 0.8 MW usable at design condition | 0.6–1.2 MW | Calculation and sizing judgement; medium |
| Array area | 300–500 m² → approximately 5,000 m² | 3,500–9,000 m² | Solar-flux calculation plus degradation allowance; low–medium |
| Array rating convention | Unspecified → usable propulsion power at 1.3 AU, end of life | Design-envelope dependent | Engineering requirement; medium |
| Specific impulse | Unspecified → 2,200 s reference | 1,800–2,800 s | Hall-class planning assumption, propellant dependent; medium |
| Efficiency | Unspecified → 0.55 | 0.45–0.65 | Published EP performance envelope; medium |
| Thrust | Unspecified → approximately 41 N | Approximately 25–70 N for coupled design cases | Calculation; medium |
| Round-trip Δv | 6–10 km/s → 8 km/s reference | 6–10 km/s | Provisional route allocation; low |
| Propellant per cycle | Unspecified → 67 t | Approximately 40–120 t | Rocket equation; medium |
| Continuous thrust duration | Implicitly compatible with short cycles → 1.1 yr | Approximately 0.6–2.5 yr | Calculation; medium |
| Complete cycle | Ten-plus cycles/15 yr → 2.5 yr reference | 2–3.5 yr | Operational allowance, not trajectory proof; low |
| Fleet delivered cargo | Implicitly station-scale → approximately 1 kt/yr | 0.6–1.5 kt/yr | Fleet/cycle calculation; medium conditional on cadence |
| Design life | 15 yr → retain 15 yr, with replaceable propulsion modules | 4–7 completed reference cycles | Lifetime objective; low |
| Propellant | Xenon / Kr-I conflict → qualification-gated terrestrial supply | Iodine and Kr candidates; Xe permitted for tests | Literature and judgement; medium |
| Crew | Human-ratable tug plus kits → uncrewed cargo vehicle | No crew kits in baseline | Architecture decision; medium |
| Recurring vehicle cost | $133–200M → $250–600M planning allowance | $250–600M, excluding launch and development | Analogy and judgement; low |

The array-area reference assumes roughly 300 W/m² at 1 AU beginning of life. At 1.3 AU with an illustrative 10% lifetime reduction:

\[
5,000\ {\rm m^2}\times300\ {\rm W/m^2}\times0.59\times0.90
\approx0.80\ {\rm MW}
\]

Housekeeping, distribution losses and margins may require additional area. Array structural dynamics and stowage remain major uncertainties.

### Published evidence and heritage

1. **Rafalskyi et al., Nature 599, 411–415 (2021), “In-orbit demonstration of an iodine electric propulsion system.”** Supports small iodine-system feasibility, not large Hall-tug qualification.
2. **NASA NEXT long-duration test reporting, 2013:** approximately 51,000 operating hours and 918 kg xenon throughput. Demonstrates long EP life at a specific operating envelope, not tens of tonnes per module.
3. **NASA/University of Michigan X3 testing, 2017:** approximately 5.4 N at 102 kW. Supports the order of magnitude of high-power Hall thrust; it is ground-test evidence.
4. **NASA Dawn mission documentation:** hundreds of kilograms of xenon and flight-proven multi-year solar-electric operations, far below the proposed cargo and propellant scale.
5. **USGS, Mineral Commodity Summaries 2025, Iodine:** supports the approximate global production scale.
6. **NASA’s 2019 Gateway PPE award:** approximately $375M for a development-inclusive 60-kW-class element. Useful cost context, but not a linear $/kW estimating rule.
7. **NASA NPR 8705.2, Human-Rating Requirements for Space Systems:** supports treating human-rating as integrated assurance rather than a structural label.

No demonstrated MW-class flight tug closes this specification.

---

# 3. Interfaces

| Other item | Exchange | Proposed planning value | Current BOM status |
|---|---|---:|---|
| **bom-0-1 Prospectors** | Target ephemerides, composition and route constraints | Require named targets supporting 6–10 km/s low-thrust cycles; 1–10 GB/day fleet-wide data allowance | Mission-link and ground-network capacity not explicit |
| **bom-0-2 Mining robots** | Collected cargo transferred to containers | 0.6–1.5 kt/yr for pilot baseline | Capture, weighing, sealing and container-loading scope not explicit |
| **bom-0-3 Processing station** | Delivered feedstock; returned equipment and empty containers | Approximately 1 kt/yr inbound; provisionally 0–0.1 kt/yr equipment outbound | Conflicts with 50 kt/yr station rating |
| **bom-0-3 Processing station** | Berthing and propellant transfer | Approximately 350 t/yr EP propellant distributed to fleet | Depot/transfer hardware omitted |
| **bom-0-5 Solar arrays** | Stationary power | Approximately 0.1–0.3 MW peak for docked fleet services; refine from load schedule | Not separately allocated |
| **bom-0-5 Solar arrays** | Mobile generation accounting | 12 MW usable for fifteen 0.8-MW tugs; approximately 23–27 MW 1-AU beginning-of-life array output | Scope boundary unresolved |
| **bom-0-6 ISPP** | LOX/LH₂ supplied to production tugs | **0 t/yr** | Systems exist in BOM but no tug consumer |
| **bom-0-7 Organization** | Fleet command, navigation, supply contracts, configuration control | Fifteen vehicle positions and twelve operational planning assumption | Operational staffing/cost absent |
| **New EP supply chain** | Delivered propulsion-grade propellant | 200–600 t/yr; approximately 350 t/yr reference | Omitted |

The mobile arrays should be costed **once**: preferably inside bom-0-4, with bom-0-5 explicitly covering stationary generation. The 100 MW line cannot simultaneously be fully available to processing and to independently moving spacecraft.

Data volume is an allowance, not a link budget. Contact schedules, ranging, navigation and outage tolerance matter more than assigning an unsupported gigabit-rate requirement.

---

# 4. Missing items or scope

1. **Transport development and qualification:** preliminary allowance **$1–3B**, separate from recurring vehicles.
2. **Launch, injection and assembly:** launch count must follow packaged mass, launch performance, injection orbit and assembly strategy. The previous 15–30 launches is not yet a defensible requirement.
3. **EP propellant supply and delivery:** recurring terrestrial procurement, purification, packaging, launch, transfer and reserve inventory.
4. **Propulsion replacement and robotic servicing:** the reference tug consumes approximately **270–470 t over four to seven cycles**. Replacement count cannot be inferred from current small-thruster heritage without a selected module’s qualified throughput.
5. **Containers and bulk-cargo handling:** approximately **30–45 reusable containers** is a reasonable initial allocation, subject to turnaround scheduling.
6. **Deep-space navigation and communications:** ground services, relay access where needed, tracking and contingency operations.
7. **Thermal design:** electronics radiators, tank temperature control, plume compatibility and array degradation.
8. **Station throughput reconciliation:** either a 1–2 kt/yr pilot or a separately specified asteroid-local 50 kt/yr handling architecture.
9. **Conditional crew program:** crew vehicle, habitat, life support, shielding, medical support and rescue—none included in the baseline.

For fifteen vehicles, recurring manufacturing alone becomes approximately **$3.75–9B**. Adding development gives **$4.75–12B before launch, propellant and operations**.

The supplied phase BOM totals approximately **$15.71B**. Deferring its $2B ISPP deployment and replacing the $2B transport line with $4.75–12B yields approximately **$16.46–23.71B**, before omitted scope and before station resizing. This is an arithmetic envelope, **not a validated revised phase estimate**.

No $10B station price should be retained as “validated” after its throughput is reduced.

---

# 5. Remaining disagreements and open questions

- **Pilot processing versus asteroid-local processing:** both are credible options. Co-location removes long-haul raw-ore transport, but does not prove mining, anchoring, dust control, local transfer or processing yield.
- **Power versus target selection:** restricted low-Δv targets can reduce propulsion requirements. This trades target flexibility against cost and throughput; it is not resolved by choosing a model’s preferred power.
- **Iodine versus krypton:** bulk availability favors investigating iodine; readiness and compatibility may favor another propellant. Supplier contracts and representative qualification tests must decide.
- **Structural provisions for possible crew use:** generic interfaces are inexpensive options; genuine future crew compatibility may constrain the entire vehicle. “Only 3 t” is not established.
- **Thruster lifetime:** test hours alone are insufficient. Throughput, operating point, restart cycles, cathode wear and contamination must match the mission.
- **Fifteen vehicles:** retain as a planning quantity, but procurement should be staged. Fewer higher-power vehicles may outperform fifteen smaller ones.
- **Named routes:** no operating orbit or target set has been provided. This is the principal missing input for cycle-time closure.
- **ISPP trigger:** ≥25 kt/yr is not sufficient. Deployment requires verified feedstock, customers, production reliability and delivered-cost advantage.

---

# 6. Decision-quality critique

The previous reconciliation correctly identifies many gaps, but it sometimes turns agreement among reviewers into unsupported engineering certainty. Below, weights are **proposed stakeholder priorities**, not elicited or optimized scores. Binary feasibility requirements take precedence over weighted preferences.

## A. Resolve the station/transport mismatch

| Composite Scaffold step | Assessment |
|---|---|
| **1. Frame & type** | Phase architecture/existence decision; expensive to reverse after station deployment; complicated engineering with uncertain operational performance. |
| **2. Criteria and weights** | Musts: mass-flow closure and credible operating route. Suggested weights: achievable output 35%, total lifecycle resources 30%, readiness 25%, expansion flexibility 10%. |
| **3. Options** | Null: retain current documents; resize to pilot; co-locate processing; build a hundreds-of-MW remote fleet; use chemical transport with distributed refuelling. |
| **4. Assessment matrix — QOC** | See below. |
| **5. Sensitivities/trade-offs** | Δv and duty cycle are sensitivities. Co-location trades transport efficiency against site dependence. Pilot scale trades early learning and affordability against production ambition. |
| **6. Evidence certainty** | Current remote fleet failing 50 kt/yr is virtually certain under stated propulsion assumptions, with high confidence. Success of either pilot or co-location is plausible, with low–medium confidence. |
| **7. Assumptions/falsification** | Pilot assumes named routes support 2–3.5-year cycles. Falsify with optimized trajectories and schedules showing materially longer cycles or higher Δv. Co-location assumes workable mine-to-station transfer; falsify with handling and anchoring demonstrations. |
| **8. Decision/warrant/downside** | Provisionally choose a 1–2 kt/yr pilot because it can match the transport reference without orders-of-magnitude fleet growth; accept lower output and a station redesign. |
| **9. Consequences** | Reopen station cost, processing power, mining duty and product objectives. Keep co-location as a competing architecture until its local system closes. |

**QOC assessment matrix**

| Option | Mass-flow closure | Resource burden | Readiness | Principal drawback |
|---|---|---|---|---|
| Current documents | Fails | Apparently low, misleading | Fails closure | Unusable baseline |
| Pilot station | Conditionally closes | Lower transport burden | Unproven but bounded | Less production |
| Co-location | Long-haul constraint removed | Unknown local infrastructure | Unproven | Site dependence |
| Large remote EP fleet | Physically possible | Very high | Low | Hundreds of MW and vehicles |
| Chemical/distributed refuelling | Conditional | High propellant infrastructure | Low asteroid-ISRU readiness | New supply chain |

**Weakest Decision Quality link:** **values**—the phase has not defined whether its primary purpose is learning or producing 50 kt/yr.

**Additional method:** ACH rejects the proposition that the existing fleet already supports station throughput; all supplied quantitative evidence contradicts it.

---

## B. Select vehicle power, fleet size and propellant

| Step | Assessment |
|---|---|
| **1. Frame & type** | Coupled property and procurement decision; prototype development is reversible, fleet manufacture much less so. |
| **2. Criteria and weights** | Musts: route closure, supplier-backed propellant, qualified lifetime. Suggested weights: annual delivery 30%, lifecycle cost 30%, readiness 25%, target flexibility 15%. |
| **3. Options** | Original low-power fleet; restricted-target 300-kW fleet; approximately 0.8-MW reference; fewer larger tugs; defer fleet purchase pending demonstrations. |
| **4. Assessment matrix** | Original fleet: low cost on paper, unacceptable cadence. Restricted-target fleet: potentially economical, narrow target access. MW-class: better cadence, greater development burden. Staged procurement: slower initial capacity, lower irreversible exposure. |
| **5. Sensitivities/trade-offs** | Power strongly affects thrust duration. Higher Isp lowers propellant but generally increases thrust time at fixed power. Power versus mass/cost and Isp versus cadence are genuine trade-offs. |
| **6. Evidence certainty** | Reference thrust and propellant arithmetic: high confidence conditional on assumptions. MW-class iodine/Kr lifetime and recurring price: low confidence; successful qualification is plausible, not established. |
| **7. Assumptions/falsification** | Assumes large deployable arrays and propulsion modules meet end-of-life performance. Falsify through representative deployment/dynamics tests and endurance tests showing excessive degradation, wear or cathode failure. |
| **8. Decision/warrant/downside** | Use 0.8 MW for planning, not a binding down-select; stage procurement behind trajectory, supplier and lifetime gates. Accept development delay rather than unsupported fleet commitments. |
| **9. Consequences** | Add development, supply and servicing scope; re-estimate launches and containers after mass closure. |

**Weakest link:** **information**—named trajectories, verified supplier capacity and representative lifetime tests are absent.

**GRADE EtD contribution:** separates strong physics evidence from weak feasibility and resource estimates. It exposes why “medium confidence” recurring costs and “high confidence” cycle times in the previous round were unjustified.

---

## C. Decide whether Phase 0 carries crew

| Step | Assessment |
|---|---|
| **1. Frame & type** | Safety-critical existence decision with architectural consequences; difficult to reverse after vehicle design freeze. |
| **2. Criteria and weights** | Musts: credible survival/rescue and demonstrated mission need. After these, suggested weights: operational benefit 40%, lifecycle resources 35%, future flexibility 25%. Safety is not a weighted compensating attribute. |
| **3. Options** | Null/uncrewed; generic interfaces only; structurally “human-ratable” cargo tugs; dedicated crew transport and station habitat. |
| **4. Assessment matrix** | Uncrewed avoids unbudgeted crew hazards but demands autonomy. Generic interfaces preserve limited flexibility. Structural provisions alone do not close crew safety. Dedicated crew transport offers a coherent design basis at substantial extra scope. |
| **5. Sensitivities/trade-offs** | Transit duration and rescue time are sensitivities. Future compatibility versus current cost is a values trade-off, but cannot substitute for safety closure. |
| **6. Evidence certainty** | Supplied crew/rescue plan being inadequate is very likely, with high confidence. A station being operable uncrewed is plausible, with only medium confidence until maintenance demonstrations. |
| **7. Assumptions/falsification** | Assumes robotic maintenance can support the pilot. Falsify through fault-injection and end-to-end maintenance trials showing unavoidable, frequent human intervention. |
| **8. Decision/warrant/downside** | Choose uncrewed Phase 0 because crew benefits and safety are unclosed; accept that later crew transport may require a new vehicle rather than an inexpensive retrofit. |
| **9. Consequences** | Remove crew visits and kits; strengthen autonomous recovery and robotic servicing; establish a separate crew-demand decision gate. |

**Weakest link:** **reasoning** in rq-0-18—the argument jumps from station complexity to inevitable crew demand and then to cheap modular human-rating.

**GRADE EtD contribution:** makes harms, feasibility and resource use explicit. Its result does not support the reconciliation’s unqualified retention of structural human-rating.

---

## D. Baseline control, scope and deployment gates

| Step | Assessment |
|---|---|
| **1. Frame & type** | Executive/configuration decisions; mostly reversible now, expensive after contractual commitments. |
| **2. Criteria and weights** | Musts: one traceable baseline and no double counting. Suggested weights: auditability 40%, complete scope 35%, decision speed 25%. |
| **3. Options** | Copy all deliberations; privilege BOM automatically; average specifications; controlled disposition and gated regeneration. |
| **4. Assessment matrix** | Copying preserves unsupported assumptions; BOM priority resolves administration only; averaging creates nonexistent designs; controlled disposition preserves evidence and dissent. |
| **5. Sensitivities/trade-offs** | Baseline date and accounting boundaries are sensitivities. Additional review trades schedule against rework risk. |
| **6. Evidence certainty** | Documentary inconsistency is certain, with high confidence. Savings from ISRU, deferred human-rating or thermal deliberations remain low-confidence estimates. |
| **7. Assumptions/falsification** | Assumes decisions can be traced to complete records. A document audit finding missing rationale or incompatible approved requirements falsifies this. |
| **8. Decision/warrant/downside** | Choose a disposition register and staged approvals because provenance is necessary for an auditable specification; accept short-term document rework. |
| **9. Consequences** | Rebaseline BOM, interfaces and costs together; defer ISPP deployment; do not book crew “savings,” launch counts or module replacements before supporting estimates. |

**Weakest link:** **commitment**—the earlier reconciliation records alternatives but does not assign an owner, approval authority or executable closure gate.

Every proposed BOM delta should have an owner and evidence gate. In particular:

- **Launch sizing:** packaged mass and injection performance.
- **Replacement modules:** demonstrated lifetime throughput.
- **Ground segment:** contact and link budget.
- **Containers:** cargo turnaround simulation.
- **ISPP:** verified feedstock, contracted consumer and cost advantage—not throughput alone.
- **Station choice:** integrated mass-flow and resource closure.
- **Cost:** work-breakdown estimate with development, recurring hardware and operations separated.

```yaml
item: bom-0-4
model: GPT-5.2
findings:
  - id: P0-F01
    verdict: partly
    summary: The fleet cannot feed a remote 50 kt/yr station, but the finding overstates array power and does not model the unloaded outbound leg.
    proposed_change: Adopt a conditional 1–2 kt/yr processing pilot and approximately 0.8 MW propulsion per tug, retaining co-location as a separately evaluated alternative.
  - id: P0-F10
    verdict: agree
    summary: Crew transport, habitation and rescue are unbudgeted and the modular human-rating argument is unsupported.
    proposed_change: Make Phase 0 uncrewed and retain generic interfaces without mandatory human-rating or crew kits.
  - id: P0-F11
    verdict: partly
    summary: EP propellant supply is missing and ISPP has no production-tug consumer, but annual demand must follow the actual mission cadence.
    proposed_change: Add approximately 350 t/yr terrestrial EP propellant supply and defer four-unit ISPP deployment pending a verified consumer.
  - id: P0-F15
    verdict: partly
    summary: Configuration control is deficient, but the full deliberation count and unsupported numerical conclusions cannot be verified from the supplied records.
    proposed_change: Create an accepted-modified-deferred-rejected disposition register and import only supported requirements.
  - id: P0-F16
    verdict: agree
    summary: The consensus and BOM disagree on quantity and propellant and neither constitutes a physically closed design.
    proposed_change: Use the BOM as the administrative baseline and regenerate consensus after approval of a traceable architecture revision.
revised_spec:
  - parameter: fleet_positions
    old: "10 consensus; 15 BOM"
    new: 15
    range: [12, 20]
    unit: vehicles
    basis: judgement
    confidence: medium
  - parameter: operational_vehicles
    old: unspecified
    new: 12
    range: [10, 15]
    unit: vehicles
    basis: judgement
    confidence: low
  - parameter: cargo_payload
    old: "150–250"
    new: 200
    range: [150, 250]
    unit: t
    basis: judgement
    confidence: medium
  - parameter: dry_mass
    old: unspecified
    new: 40
    range: [30, 70]
    unit: t
    basis: judgement
    confidence: low
  - parameter: usable_propulsion_power_at_1_3_AU_end_of_life
    old: unspecified
    new: 0.8
    range: [0.6, 1.2]
    unit: MW
    basis: calculation
    confidence: medium
  - parameter: solar_array_area
    old: "300–500"
    new: 5000
    range: [3500, 9000]
    unit: m2
    basis: calculation
    confidence: low
  - parameter: specific_impulse
    old: unspecified
    new: 2200
    range: [1800, 2800]
    unit: s
    basis: literature
    confidence: medium
  - parameter: propulsion_efficiency
    old: unspecified
    new: 0.55
    range: [0.45, 0.65]
    unit: fraction
    basis: literature
    confidence: medium
  - parameter: thrust
    old: unspecified
    new: 41
    range: [25, 70]
    unit: N
    basis: calculation
    confidence: medium
  - parameter: round_trip_delta_v
    old: "6–10"
    new: 8
    range: [6, 10]
    unit: km/s
    basis: judgement
    confidence: low
  - parameter: propellant_per_cycle
    old: unspecified
    new: 67
    range: [40, 120]
    unit: t
    basis: calculation
    confidence: medium
  - parameter: continuous_thrust_duration
    old: unspecified
    new: 1.1
    range: [0.6, 2.5]
    unit: yr
    basis: calculation
    confidence: medium
  - parameter: complete_cycle_duration
    old: "approximately 1.5 implied"
    new: 2.5
    range: [2, 3.5]
    unit: yr
    basis: judgement
    confidence: low
  - parameter: annual_delivered_cargo
    old: unspecified
    new: 1000
    range: [600, 1500]
    unit: t/yr
    basis: calculation
    confidence: medium
  - parameter: annual_EP_propellant_procurement
    old: unspecified
    new: 350
    range: [200, 600]
    unit: t/yr
    basis: calculation
    confidence: medium
  - parameter: recurring_vehicle_cost_excluding_launch_and_development
    old: "133–200 million"
    new: 400000000
    range: [250000000, 600000000]
    unit: USD
    basis: judgement
    confidence: low
  - parameter: crew_module_kits
    old: 3
    new: 0
    range: [0, 0]
    unit: kits
    basis: judgement
    confidence: medium
interfaces:
  - with: bom-0-1
    flow: data
    value: "1–10 GB/day fleet-wide planning allowance"
    in_bom: false
  - with: bom-0-2
    flow: mass
    value: "600–1500 t/yr containerized pilot cargo"
    in_bom: true
  - with: bom-0-3
    flow: mass
    value: "approximately 1000 t/yr inbound feedstock"
    in_bom: true
  - with: bom-0-3
    flow: propellant
    value: "approximately 350 t/yr distributed through station depot"
    in_bom: false
  - with: bom-0-5
    flow: power
    value: "0.1–0.3 MW peak dockside services"
    in_bom: false
  - with: bom-0-5
    flow: power
    value: "12 MW usable mobile fleet generation"
    in_bom: false
  - with: bom-0-6
    flow: propellant
    value: "0 t/yr LOX/LH2 to baseline production tugs"
    in_bom: true
  - with: bom-0-7
    flow: other
    value: "15 fleet positions requiring command, configuration and supply-chain management"
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-4
    quantity: "15 staged fleet positions"
    unit_cost_usd: [250000000, 600000000]
    rationale: Larger power systems and unqualified propulsion require a higher low-confidence recurring allowance.
  - action: add
    item: Transport development and qualification
    quantity: "1 program"
    unit_cost_usd: [1000000000, 3000000000]
    rationale: MW-class vehicle performance and propellant lifetime lack flight heritage.
  - action: add
    item: EP propellant supply and delivery
    quantity: "200–600 t/yr"
    unit_cost_usd: [0, 0]
    rationale: Supplier-backed procurement and delivered-price estimates are required; zero denotes unpriced scope rather than zero cost.
  - action: add
    item: Transport launch injection and assembly
    quantity: "TBD after packaged-mass and trajectory closure"
    unit_cost_usd: [0, 0]
    rationale: Launch count and price are unclosed; zero denotes unpriced scope rather than zero cost.
  - action: add
    item: Propulsion replacement and robotic servicing
    quantity: "TBD from qualified module throughput"
    unit_cost_usd: [0, 0]
    rationale: Lifetime propellant throughput requires demonstrated modules and replacement logistics.
  - action: add
    item: Cargo containers depot transfer and ground services
    quantity: "30–45 containers plus one support system"
    unit_cost_usd: [0, 0]
    rationale: Cargo turnover and fleet operation require omitted support scope whose cost remains unestimated.
  - action: resize
    item: bom-0-3
    quantity: "1 station rated at 1–2 kt/yr provisionally"
    unit_cost_usd: [0, 0]
    rationale: Match the pilot transport rate and re-estimate station cost instead of endorsing the existing placeholder.
  - action: remove
    item: bom-0-6
    quantity: "4 production units deferred from Phase 0 to Phase 0B"
    unit_cost_usd: [500000000, 500000000]
    rationale: The current four-unit two-billion-dollar deployment has no baseline tug consumer.
  - action: split
    item: bom-0-5
    quantity: "Stationary generation separated from mobile arrays costed in bom-0-4"
    unit_cost_usd: [0, 0]
    rationale: Clarify accounting without charging the same generation hardware twice.
open_questions:
  - Which named targets and station orbit support the assumed delta-v and cycle duration?
  - Is Phase 0 primarily a learning pilot or a 50 kt/yr production demonstration?
  - Can asteroid-local processing close mining, anchoring, handling, yield and power requirements?
  - Which propellant has supplier-backed capacity and representative propulsion qualification?
  - What module lifetime throughput and robotic replacement rate are demonstrated?
  - Can autonomous maintenance support the pilot without routine human intervention?
  - What packaged mass and injection orbit determine launch requirements?
  - What do the complete thermal, governance and ISRU-cost deliberations actually require?
  - What customers and delivered-cost advantage justify later ISPP deployment?
```
