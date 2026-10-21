---
bomId: "bom-0-16"
itemName: "Electric-Propulsion Propellant Supply"
itemSlug: "ep-propellant-supply"
modelId: "gpt-6-1-sol"
modelName: "GPT-6.1 Sol"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-16 — Electric-Propulsion Propellant Supply

## 1. Recommendation

**Fund a dual-path propellant-supply qualification effort in 0A. Use imported iodine for cost modelling and argon as the alternate, but do not select either propellant before the 0B gate.**

For planning, carry:

- **Reference steady-state procurement:** **200–300 tonnes/year of iodine**, supporting approximately **1,000 tonnes/year of delivered Fe-Ni product** under the trajectory assumptions below.
- **Initial procurement envelope:** **150–450 tonnes/year**, adjustable against actual transport demand.
- **Architecture sensitivity:** approximately **60–1,250 tonnes/year** across the full combination of stated product rates, vehicle masses, specific impulses, and transfer requirements. This is a sensitivity envelope, **not an authorized purchase quantity**.
- **Reference annual supply budget:** **$16–45 million/year**, excluding launch, interplanetary delivery, permanent tug equipment, receiving-node infrastructure, and mission operations.
- **Initial working inventory:** provisionally **3–6 months of consumption**, increased only if the delivery-reliability model justifies it.

The principal recommendation is architectural:

> **Buy qualified propellant and compatible flight packaging—not a speculative propellant depot.**

For iodine, the preferred development path is a **replaceable, sealed propellant cassette feeding a tug-owned vaporization and distribution system**. Robotic cassette exchange should be evaluated against refillable integral tanks during 0A. Neither approach should become a production commitment until demonstrated at relevant scale.

The programme must not assume that iodine’s attractive storage density establishes its suitability for a megawatt-class propulsion system. **Thruster life, feed stability, materials compatibility, and plume contamination are the actual selection criteria.**

---

## 2. Scope and accounting boundaries

### Included in bom-0-16

1. Propellant commodity procurement.
2. Supplier qualification, supply-chain assurance, and batch acceptance.
3. Propellant purification performed by the supplier to the agreed purchasing specification.
4. Recurring transport containers or flight cassettes, where purchased as part of the propellant supply.
5. Container cleanliness, sealing, traceability, and acceptance testing.
6. Working inventory and procurement scheduling.
7. Propellant-specific handling procedures and interface-control requirements.

### Interfaces—not duplicated here

| Other item | Scope retained by that item |
|---|---|
| **bom-0-4 Cargo Tugs** | Thrusters, permanent tanks, vaporizers, regulators, propulsion feed systems, propulsion control, tug thermal control |
| **bom-0-8 Launch and Delivery** | Earth launch and transport of propellant and packaging to the required handover location |
| **bom-0-11 NRE and Qualification** | Development facilities, propulsion life tests, qualification of new feed or packaging technology |
| **bom-0-12 Pathfinder** | Flight demonstration spacecraft and mission |
| **bom-0-13 Receiving Node** | Permanent storage berths, handling robots, node power and thermal infrastructure |
| **bom-0-10 Mission Operations** | Inventory operations, maneuver execution, fleet scheduling |
| **bom-0-14 Spares** | Replacement valves, controllers, heaters, and other spare equipment |
| **bom-0-15 Contamination Control** | Programme-wide environmental limits, modelling, monitoring, and mitigation |
| **bom-0-17 Reserve** | Programme contingency |

A flight cassette is charged to bom-0-16 only if it is treated as a recurring supply package. If it becomes reusable vehicle equipment, its capital cost moves to bom-0-4 or bom-0-13. It must not appear in both accounts.

---

## 3. Design basis and demand model

### 3.1 Planning assumptions

The following are **engineering assumptions for this proposal**, not approved programme requirements.

| Parameter | Reference assumption | Sensitivity |
|---|---:|---:|
| Delivered Fe-Ni product | 1,000 t/year | 600–2,500 t/year |
| Product per loaded departure | 200 t | 150–300 t |
| Tug dry mass, including installed propulsion equipment | 80 t | 60–100 t |
| Effective specific impulse | 3,000 s | 2,500–3,500 s |
| Loaded-leg integrated propulsive Δv | 3 km/s | 2–4 km/s |
| Return-leg integrated propulsive Δv | 3 km/s | 2–4 km/s |
| Reference fleet | 12 tugs | Programme envelope: 10–18 |
| Power delivered to EP system during thrusting | 2.0 MW | Vehicle-dependent |
| Electrical-to-jet efficiency | 55% | Must be measured for selected propellant |
| Additional procurement allowance | 15% | To be replaced by explicit budgets |

The Δv values must ultimately come from **low-thrust trajectory optimization**, including departure windows, power variation, eclipse restrictions, docking operations, and reserve policy. They are not impulsive-transfer solutions.

### 3.2 Round-trip propellant calculation

Assume the tug carries both outbound and return propellant when departing with product, unloads product at the receiving node, and returns without a revenue payload.

Let:

- \(M_d\): tug dry mass;
- \(M_L\): delivered payload;
- \(v_e=g_0I_{sp}\);
- \(\Delta v_o,\Delta v_r\): outbound and return integrated propulsion requirements.

Then:

\[
m_{p,r}=M_d\left(e^{\Delta v_r/v_e}-1\right)
\]

\[
m_{p,o}=(M_d+M_L+m_{p,r})
\left(e^{\Delta v_o/v_e}-1\right)
\]

For the reference case:

- \(v_e=29.4\ \mathrm{km/s}\);
- return propellant ≈ **8.6 t**;
- loaded-leg propellant ≈ **31.0 t**;
- total ≈ **39.6 t per 200 t delivered**.

Five completed delivery cycles per year therefore consume approximately:

\[
5\times39.6 = 198\ \mathrm{t/year}
\]

Adding a provisional 15% allowance gives **228 t/year**, rounded to a **230 t/year reference procurement case**.

That allowance covers unresolved maneuver, residual, handling, and operating uncertainties. It is **not** permission for 15% physical leakage or discard.

### 3.3 Demand sensitivity

| Case | Product delivered | Payload / dry mass | Δv per leg | \(I_{sp}\) | Procurement, including 15% allowance |
|---|---:|---:|---:|---:|---:|
| Favorable | 600 t/year | 300 / 60 t | 2 km/s | 3,500 s | ≈60 t/year |
| Reference | 1,000 t/year | 200 / 80 t | 3 km/s | 3,000 s | ≈230 t/year |
| Demanding | 2,500 t/year | 150 / 100 t | 4 km/s | 2,500 s | ≈1,250 t/year |

The demanding case is not a desirable baseline. It identifies a condition in which transport propellant becomes a major imported mass stream and the economics must be reconsidered.

### 3.4 Position on the round-2 estimates

- **Claude’s 150–450 t/year:** a reasonable provisional purchasing envelope for the reference architecture, but not a demonstrated requirement.
- **GPT’s 160–600 t/year:** also plausible, especially with less favorable trajectories or higher output.
- **Gemini’s 900–1,200 t/year:** credible at the demanding end of the parameter space, but **too high as the default** for approximately 1 kt/year output without a supporting mass and trajectory model.

Annual demand cannot be inferred from tug count alone. It depends on completed delivery cycles, vehicle mass, return logistics, propulsion performance, and trajectory choice.

---

## 4. Power and fleet closure

For an electric propulsion system:

\[
T=\frac{2\eta P}{v_e}
\qquad
\dot m=\frac{2\eta P}{v_e^2}
\]

At 2 MW, 55% efficiency, and 3,000 s:

- thrust ≈ **75 N**;
- propellant flow ≈ **2.54 g/s**;
- consumption ≈ **220 kg/day**;
- electrical energy ≈ **219 kWh/kg of propellant**.

The reference 39.6 t round trip therefore requires approximately:

- **180 days of accumulated full-power thrusting**;
- **8.7 GWh of propulsion electricity**.

This is not the elapsed round-trip duration: coast periods, power variation, maintenance, and waiting for transfer opportunities increase it.

At 1,000 t/year and 200 t per delivery, a 12-tug fleet averages one completed delivery cycle per tug every **2.4 years**. That is a useful consistency check, not proof of fleet adequacy. A time-dependent fleet simulation remains mandatory before 0B.

**The propulsion electricity belongs to the tug power budget, not this supply item.**

---

## 5. Propellant trade

| Criterion | Iodine reference | Argon alternate |
|---|---|---|
| Procurement | Finite industrial supply; supplier audit essential | Abundant industrial gas; aerospace qualification still required |
| Storage | Dense solid; low-pressure package possible | High-pressure gas or cryogenic liquid |
| Representative storage density | Solid: approximately 4.9 t/m³ | Compressed: approximately 0.3–0.6 t/m³ at candidate conditions |
| Feed system | Heated vapor generation and condensation avoidance | Pressure regulation and gas distribution |
| Major compatibility concern | Reactive halogen; deposition and material attack | Pressure-system integrity and propulsion performance |
| Thruster concern | MW-cluster life, erosion, cathode compatibility | Efficiency, discharge stability, cathode compatibility |
| Packaging penalty | Potentially favorable | Potentially substantial for compressed storage |
| Programme position | Costed reference only | Fully maintained alternate |

The argon density range is preliminary. Actual sizing requires a real-fluid equation of state at the selected pressure and temperature.

### Recommendation on argon storage

Use **compressed argon as the first alternate to evaluate**, because it avoids long-duration cryogenic management. Candidate operating pressures are **20–35 MPa**, subject to vessel optimization and launch-provider acceptance.

Liquid argon may improve volume efficiency, but introduces refrigeration, boil-off, transfer, and fault-management requirements. It should not quietly become another cryogenic infrastructure programme.

### Other propellants

- **Xenon:** not baselined. Use only if justified for limited test equipment or a distinct small subsystem.
- **Water EP:** desk study only until a suitable C-type target is confirmed and the complete resource-to-propulsion chain is credible.

---

## 6. Supply architecture

```text
Qualified terrestrial suppliers
             |
             v
Purification / batch characterization
             |
             v
Sealed transport package or flight cassette
             |
       Acceptance release
             |
             v
Earth launch and delivery -- bom-0-8
             |
             v
Receiving / inventory handover
SEL1 reference node or another approved logistics point
             |
             v
Robotic cassette exchange OR qualified tank refill
             |
             v
Tug-owned feed system and EP cluster -- bom-0-4
             |
             v
NEA <------------------------------> Phase 1 receiving node
        Product transport / return
```

**SEL1 remains the interim receiving-node reference, not an irrevocable propellant-distribution decision.**

The logistics study must compare:

1. loading propellant at the receiving node;
2. delivering some propellant directly to the NEA;
3. distributing stocks between both ends.

Delivery to the NEA is not free. Its carrier propellant and transport mass must be included recursively in the transport model.

---

## 7. Iodine packaging concept

### 7.1 Reference cassette

Develop a **1–5 t modular family**, with a **5 t unit** used for reference cost and layout studies.

| Attribute | Preliminary 5 t cassette |
|---|---|
| Iodine inventory | 5,000 kg |
| Solid iodine volume | ≈1.01 m³ |
| Internal reservoir volume | 1.3–1.6 m³ |
| Approximate external envelope | 1.3 m diameter × 1.8 m long |
| Dry package mass target | 300–650 kg |
| Package mass fraction | 6–13% of contained propellant |
| Interfaces | Structural grapple, restraints, electrical/data, isolated vapor outlet |
| Nominal service | Transport, storage, controlled feed after installation |

These dimensions and masses are **allocation targets**, not a qualified design.

Eight 5 t cassettes would provide approximately one reference round-trip load. Their total envelope, access clearance, shielding, structural support, and several tonnes of dry mass must be included in the tug design. If the resulting tug mass exceeds the assumed 80 t, propellant demand must be recalculated.

### 7.2 Thermal concept

Iodine’s melting point is approximately **114°C**. A candidate solid-feed architecture would investigate:

- storage temperatures well below melting;
- controlled reservoir operation around **80–110°C**;
- vapor-line temperatures initially studied around **120–160°C**;
- no unheated cold spots between the active reservoir and isolation/control hardware.

These are test starting points, not released operating limits.

At the reference flow, the latent heat associated with sublimation is approximately **0.6 kW**. A preliminary **2–5 kW thermal-control allocation per operating tug** is reasonable for vapor generation and distribution, including losses, but requires thermal-vacuum validation.

A large cassette must **not** be treated as a uniformly heated block. Internal heat transfer, evolving void geometry, thermal stress, and residual recovery favor segmented reservoirs or localized vapor-generation surfaces.

### 7.3 Why cassette exchange deserves priority

Cassette exchange can avoid bulk iodine transfer between spacecraft and reduce exposed wetted interfaces. Its disadvantages are:

- imported packaging mass;
- robotic exchange complexity;
- more valves and seals;
- possible unusable residuals;
- uncertain container reuse economics.

The selection test should compare **delivered lifetime cost per usable kilogram**, not commodity cost alone.

---

## 8. Argon packaging concept

A 5 t compressed-argon package would require roughly **8–17 m³ of internal gas volume** over the preliminary density range.

A first-pass dry pressure-vessel allocation is **1–2.5 t per 5 t of argon**, before detailed integration allowances. This is highly sensitive to pressure, liner design, allowable stress, geometry, safety factors, and cycle life.

Required interfaces include:

- launch-approved pressure isolation;
- redundant closure at hazardous interfaces;
- pressure and temperature measurement;
- regulated delivery to the tug-owned feed system;
- directed relief or vent paths that cannot impinge on sensitive surfaces.

Argon’s commodity price advantage may be overwhelmed by vessel mass and delivery cost. Conversely, a sufficiently better-qualified argon propulsion system could outweigh iodine’s storage advantage. The trade must be performed at complete-system level.

---

## 9. Quality, manufacturing, and acceptance

### 9.1 Purchasing specification

Do not purchase “industrial-grade iodine” as if that were a propulsion specification.

The release specification must control:

- chemical identity and total assay;
- water content;
- nonvolatile residue;
- metals and other halogens;
- organic contamination;
- package cleanliness and outgassing;
- loading mass and uncertainty;
- leak integrity;
- lot traceability and retained samples.

For initial testing, investigate iodine assay in the **99.9–99.99% range**. The final limits must be set by measured effects on erosion, cathodes, deposits, and feed stability.

For argon, initial qualification should investigate **99.999% nominal gas purity**, with explicit species limits for moisture, oxygen, nitrogen, and hydrocarbons. A single total-purity number is insufficient.

### 9.2 Manufacturing approach

Preferred supplier process:

1. Receive and characterize feedstock.
2. Purify or reject against the purchase specification.
3. Load under controlled atmosphere using qualified procedures.
4. Seal and independently verify inventory.
5. Perform leak and electrical/interface tests.
6. Apply serialized configuration records.
7. Retain witness samples and material genealogy.

Iodine handling requires enclosed processing, worker protection, compatible tooling, and vapor capture. Material compatibility must be tested under the actual combinations of temperature, radiation, stress, and exposure duration.

**Generic compatibility charts are not adequate evidence for flight acceptance.**

### 9.3 Supply assurance

Before 0B:

- qualify at least two credible supply paths where practicable;
- establish firm capacity offers and expansion lead times;
- audit upstream feedstock dependence;
- verify that the programme is not relying on uncommitted spare capacity;
- contract for batch consistency and change notification.

I would reject an unsupported claim that several hundred tonnes per year of propulsion-qualified iodine can simply be purchased at a stable catalog price.

---

## 10. Control, autonomy, and communications

The supply package should be operationally simple. It should not contain an independent mission-management computer unless required for safety.

### Local functions

For an active iodine cassette:

- reservoir and line temperature monitoring;
- heater control with independent overtemperature protection;
- valve-state confirmation;
- leak or unexpected mass-flow detection;
- safe isolation;
- identification and calibration-data reporting.

For compressed argon:

- pressure/temperature monitoring;
- isolation and regulator fault detection;
- pressure-vessel health records;
- safe response to unexpected pressure loss.

### Fault-management principles

- A communications outage must not defeat local safety.
- Isolation valves should move to a safe state on loss of control power.
- Feed-line cooldown must be sequenced to avoid uncontrolled iodine condensation and blockage.
- Safe mode must retain enough power for the required thermal and isolation sequence.
- No uncontrolled venting toward arrays, radiators, optical instruments, docking interfaces, or product surfaces.

### Data interface

A preliminary allocation of **less than 10 kbit/s per active cassette** is ample for ordinary health telemetry; diagnostic bursts may be higher. Node and tug networks should use the programme’s common fault-tolerant interface standard.

Inventory reporting must distinguish:

1. loaded mass;
2. estimated remaining mass;
3. usable remaining mass;
4. inaccessible residual;
5. uncertainty.

Thermal state, pressure, and integrated flow should be reconciled against independent mass-accounting methods where feasible.

---

## 11. Storage, contamination, and environmental requirements

### 11.1 Storage inventory

For the 230 t/year reference case:

- three months: approximately **58 t**;
- six months: approximately **115 t**.

Do not buy a year of inventory by default. Establish buffer stock through a probabilistic model of launch failures, delivery delays, supplier recovery times, and fleet interruption costs.

The inventory must also be physically distributed so that a single package fault cannot contaminate or disable the entire stock.

### 11.2 Contamination requirements

No numerical environmental release ceiling is asserted here. Under interim D-03, it must be established through modelling, tests, ALARP assessment, and the licensing state.

Required analyses include:

- iodine leakage and transport;
- plume neutral and ion fluxes;
- deposition on arrays, radiators, sensors, and Fe-Ni products;
- argon plume interaction and charging;
- planned and unplanned vent trajectories;
- end-of-life disposition of residual propellant and containers.

A suitable operational objective is **zero intentional routine disposal of iodine near sensitive assets**, with unavoidable releases budgeted and verified. This does not replace the programme’s formal release requirement.

---

## 12. Development plan and readiness gates

### Phase 0A — procurement evidence and technology discrimination

**Stage A: supply and requirements definition**

- supplier capacity and price audit;
- trajectory-linked demand model;
- contamination and purity requirements;
- packaging and interface trades;
- iodine/argon propulsion-system comparison.

**Stage B: laboratory and engineering demonstration**

- materials exposure tests;
- controlled feed tests;
- condensation/blockage recovery;
- representative batch impurity testing;
- cassette thermal and structural development;
- argon pressure-system trade validation.

Internal milestones target **TRL 4–5**, consistent with D-02.

**Stage C: relevant-environment demonstration**

Before KDP-0B, every project-ending technology must reach **TRL 6 without waiver**, including, where applicable:

- selected-propellant thruster/cathode combination;
- representative feed channel;
- scalable reservoir architecture;
- relevant thermal-vacuum operation;
- robotic interface or refill method;
- contamination-control approach.

### Life demonstration

At the reference operating point, a round trip requires about **4,300 hours of accumulated thrusting**. Several service cycles therefore imply tens of thousands of operating hours unless replacement is planned.

Qualification must demonstrate the approved maintenance interval and throughput with margin. Small-thruster flight heritage alone is insufficient.

A single full-size 2 MW device is not required if a modular cluster is selected. However, testing must establish:

- representative module performance;
- full-cluster electrical and feed interactions;
- credible erosion and life extrapolation;
- the necessary aggregate throughput.

### KDP-0B conditions

Release production procurement only when:

1. the target gate passes;
2. signed Phase 1 demand specifies material, purity, quantity, and delivery dates;
3. transport economics close, including imported propellant and packaging;
4. licensing accepts the operating and release envelope;
5. all project-ending technologies meet the TRL 6 requirement.

---

## 13. Cost proposal

All figures below are **planning allowances in constant 2026 US dollars**, not vendor quotations.

### 13.1 Phase 0A: direct bom-0-16 costs

| Activity | Range |
|---|---:|
| Supplier audit, purchasing specification, supply assurance | $0.2–0.6M |
| Test commodities, samples, batch characterization | $0.1–0.5M |
| Preliminary logistics and packaging supplier studies | $0.2–0.6M |
| **Direct 0A bom-0-16 total** | **$0.5–1.7M** |

Associated propulsion and packaging development could require an additional **$10–35M planning allowance**, but this belongs to **bom-0-11 and bom-0-12**, not this line. It is not a whole propulsion-system development estimate.

### 13.2 Phase 0B: commodity assumptions

| Propellant | Factory-gate planning allowance | Qualification |
|---|---:|---|
| Iodine | **$30–100/kg** | Broad sensitivity |
| Iodine reference | **$35–70/kg** | Conditional on capacity audit and accepted purity |
| Argon | **$1–10/kg** | Preliminary allowance; excludes flight packaging |

For 230 t/year of iodine, the reference commodity cost is approximately **$8–16M/year**.

I agree that the round-2 iodine price ranges are reasonable **cost-study assumptions**. I disagree with treating them as procurement commitments before supplier qualification.

### 13.3 Reference recurring supply budget

Assume approximately 46 five-tonne packages per year:

| Element | Annual reference allowance |
|---|---:|
| Iodine commodity | $8–16M |
| Recurring packages/cassettes | $7–21M |
| Acceptance, certification, terrestrial handling and logistics | $1–4M |
| **Total, before programme reserve** | **$16–41M/year** |

Carry **$16–45M/year** pending quotations and design maturity.

The cassette allowance corresponds to roughly **$0.15–0.45M per recurring 5 t unit**. It is a manufacturing target after qualification, not a first-article price.

Reusable cassettes may reduce annual purchasing costs but add return transport, inspection, cleaning, and retirement costs.

### 13.4 Initial inventory and production entry

- Supplier production-entry setup: **$2–6M**, excluding development.
- Three-to-six-month iodine inventory: approximately **$2–8M** at the reference commodity prices.
- Initial packaging for that inventory: approximately **$2–10M**.

These are startup cash requirements; inventory later consumed must not also be counted as a second commodity purchase.

### 13.5 Delivery cost exposure

Delivery can dominate commodity cost.

For example, **230 t of propellant plus 6–13% package mass** gives approximately **244–260 t/year** to transport, before any carrier overhead.

At an illustrative effective logistics charge of **$3,000–15,000/kg to the specified handover location**, annual transport would be approximately **$0.7–3.9B**.

That is a sensitivity illustration—not a launch quotation—and belongs entirely to **bom-0-8**. It shows why the architecture must optimize imported mass rather than focus only on iodine’s dollar-per-kilogram price.

---

## 14. Principal risks

| Risk | Consequence | Main mitigation |
|---|---|---|
| Iodine propulsion life inadequate | Propellant or propulsion architecture fails | Long-duration representative tests; preserve argon alternate |
| Iodine damages materials or deposits on assets | Feed failure, power loss, product contamination | Compatibility tests, plume modelling, protected interfaces |
| Supplier cannot sustain qualified volume | Fleet interruption or price escalation | Audited capacity, multiple supply paths, staged contracts |
| Propellant demand underestimated | Transport economics fail | Coupled trajectory, mass, fleet, and resupply model |
| Cassette dry mass exceeds allowance | More imported mass and propellant | Early structural design and system-level reclosure |
| Condensation blocks feed lines | Loss of thrust or difficult recovery | Thermal zoning, recovery demonstrations, isolation |
| Argon vessel mass excessive | Alternate becomes unattractive | Real-fluid storage and vessel optimization |
| Large stock exposed to common-cause failure | Loss of months of supply | Segregated storage, isolation, distributed inventory |
| Launch or delivery delay | Idle tugs and missed product dates | Reliability-based buffer and delivery scheduling |
| Residuals cannot be recovered economically | Higher effective consumption | Full depletion tests and explicit usable-mass accounting |

---

## 15. Open engineering questions

The following require answers before production authorization:

1. **What is the actual low-thrust round-trip requirement for the selected NEA and receiving node?**
2. Can the fleet meet signed delivery dates with realistic maintenance and waiting periods?
3. Which propellant provides the lowest complete-system cost at demonstrated lifetime?
4. Does iodine remain advantageous after contamination mitigation and package mass?
5. Is a replaceable cassette better than an integral refillable reservoir?
6. What fraction of loaded propellant remains inaccessible at end of service?
7. Where should propellant be handed over to minimize total transport mass?
8. What purity limits are supported by life-test evidence?
9. Can supplier capacity meet both initial inventory buildup and sustained annual consumption?
10. What release, venting, and end-of-life rules will the licensing state impose?
11. What is the tug’s approved propulsion replacement interval?
12. At what imported-propellant burden should the programme reduce output, change targets, or use Earth-supplied structural material instead?

---

## 16. Proposed controlled baseline

For the next design iteration, I recommend recording:

> **bom-0-16 supplies imported, qualified EP propellant. No propellant is selected. Iodine is the costed reference and argon the maintained alternate. The reference operating model uses 230 t/year of iodine for 1,000 t/year of delivered Fe-Ni, conditional on trajectory and vehicle closure. Production procurement is released only at KDP-0B against signed demand, qualified supplier capacity, accepted environmental controls, and TRL-6 project-ending technologies.**

This is a capability programme. Its success criterion is a demonstrated, supportable transport supply chain—not an assumed commodity-cost advantage.