---
bomId: "bom-0-8"
itemName: "Earth-to-Space Launch and Delivery"
itemSlug: "launch-delivery"
modelId: "gpt-6-1-sol"
modelName: "GPT-6.1 Sol"
generated: "2026-10-20"
phase: "phase-0"
---

# Technical proposal: bom-0-8 — Earth-to-Space Launch and Delivery

## 1. Recommendation and scope

**Procure an end-to-end delivery capability, but retain separate, auditable prices for Earth-to-LEO access and onward delivery.** Use commercially supplied chemical launch for Earth departure where practical, and the programme’s cargo tugs for subsequent electric-propulsion transport where their qualification, trajectory and availability justify doing so.

Do **not** make deployment of the entire industrial system dependent on:

- A single launch vehicle;
- Routine orbital propellant transfer;
- Unproven MW-class electric propulsion operating from low Earth orbit;
- Large-scale orbital assembly;
- Or a speculative future launch price.

Phase 0A should establish the delivery interfaces, flight-demonstrate the difficult elements, and obtain binding supplier proposals. Phase 0B remains an option, not an authorised launch campaign.

### Proposed planning envelope

All costs below are **constant 2026 USD**, excluding programme contingency and financing.

| Quantity | Phase 0A | Conditional Phase 0B |
|---|---:|---:|
| Programme cargo manifest, including initial EP propellant and delivery equipment¹ | **25–100 t** | **2,500–6,000 t** |
| Reference planning point—not an approved baseline | **50 t** | **4,000 t** |
| Launch and delivery services | **$0.25–0.90B** | **$3.25–15.7B** |
| Reference services allowance | **$0.50B** | **$7.30B** |
| Commitment status | Fund in stages through 0A | Release only after KDP-0B |

¹This is spacecraft cargo mass, not total rocket mass placed in orbit. Provider-owned launch stages, their propellant and fairings are excluded from this manifest; their costs are included in the relevant transportation service.

**My central estimate is approximately $7.8B for 0A plus a reference-sized 0B deployment.** This is an engineering allowance, not a vendor quotation. Its largest uncertainties are the target orbit, actual tug dry mass, departure method, launch market and propellant packaging.

### Scope boundary

bom-0-8 buys the movement of Phase 0 hardware and initial supplies from Earth to their accepted operating locations.

| Included in bom-0-8 | Charged elsewhere |
|---|---|
| Launch services and purchased departure services | Scouts: bom-0-1 |
| Mission-specific launch integration and acceptance | Mining robots and processing plant: bom-0-2/3 |
| Delivery-only adapters, cradles and separation systems | Operational cargo-tug hardware: bom-0-4 |
| Purchased transport capacity and delivery-stage services | Site power hardware: bom-0-5 |
| Packaging, handling and launch-site campaign services | Communications network and mission operations: bom-0-9/10 |
| Transport of initial EP propellant | Technology development and qualification: bom-0-11 |
| Delivery trajectory and navigation products supplied by carriers | Pathfinder flight article: bom-0-12 |
| Disposal of delivery-only hardware | Receiving node, spares, contamination-control systems and propellant commodity: bom-0-13–16 |

Delivery flight operations must have **one** cost owner: either included in a transport-service contract or charged to bom-0-10, never both.

---

## 2. Design philosophy and principal assumptions

### 2.1 Design philosophy

1. **Deliver useful equipment, not nominal injected mass.** Acceptance must distinguish injection, rendezvous, capture and operational handover.
2. **Deploy a minimum viable industrial chain first.** Avoid launching the full tug fleet before the receiving node, power system and first processing train demonstrate readiness.
3. **Chemical launch buys schedule and avoids the worst Earth-departure environment.** Electric propulsion buys interplanetary propellant efficiency.
4. **Use modular payloads without requiring universal standardisation.** Standardise mechanical interfaces, servicing ports and telemetry—not every spacecraft structure.
5. **Preserve competition through interfaces and mass limits.** Do not design the entire programme around one provider’s maximum fairing.
6. **Purchase reliability through test, redundancy and campaign sequencing—not human-rating.** Phase 0 is uncrewed.

### 2.2 Explicit assumptions

These are proposal assumptions, not accepted programme decisions:

- **A1 — Destination:** SEL1 is the interim receiving-node reference under D-04. Processing equipment goes to the selected NEA, not SEL1.
- **A2 — Throughput:** The illustrative 0B case serves approximately **1 kt/year of accepted Fe-Ni product**, subject to signed Phase 1 demand.
- **A3 — Fleet:** For mass budgeting only, use **12 cargo tugs**, within the agreed 10–18 range.
- **A4 — EP:** Use **25–35 km/s effective exhaust velocity** and **55–65% electrical-to-jet efficiency** for transport screening. These are performance requirements to validate, not demonstrated iodine-system capabilities.
- **A5 — Propellant:** Cost iodine as reference and argon as alternate, without selecting either. Water EP remains outside the delivery baseline.
- **A6 — Launch access:** Evaluate **$800–1,800/kg of programme cargo at a LEO reference boundary** for industrial-scale contracting. This is a planning assumption, not a current market quotation.
- **A7 — Schedule:** No fixed NEA delivery date can be committed until target selection and launch-window analysis are complete.
- **A8 — Reserve:** Hardware mass-growth allowances travel with the cargo estimate. Financial contingency remains in bom-0-17.

---

## 3. System architecture

### 3.1 Reference transport chain

```text
 EARTH
 ┌───────────────────────────────────────────────────────────┐
 │ Hardware acceptance, transport packaging, propellant loading│
 └───────────────────────────┬───────────────────────────────┘
                             │
                    Commercial launch
                             │
             ┌───────────────┴──────────────────┐
             │                                  │
       Direct/high-energy                 LEO staging
       departure service                 where justified
             │                                  │
             │                      Checkout / limited assembly
             │                      Optional departure stage
             └──────────────────┬───────────────┘
                                │
                     High-Earth/escape handover
                                │
                ┌───────────────┴────────────────┐
                │                                │
         SEL1 delivery                    NEA delivery
      receiving-node modules       self-delivering tug or tugged load
                │                                │
      Capture and acceptance          Rendezvous and safe hold
                │                                │
                │                    Site deployment and acceptance
                └───────────────┬────────────────┘
                                │
                   Delivery hardware disposition
```

**LEO is a pricing and integration boundary, not a mandatory warehouse.** Direct departure is preferable when it removes rendezvous, storage or assembly operations at acceptable cost.

### 3.2 Three delivery classes

| Class | Payloads | Preferred delivery method | Planning transit allowance² |
|---|---|---|---|
| A: scouts and pathfinders | Survey instruments, rendezvous scouts, demonstrators | Dedicated or rideshare launch with qualified chemical departure and onboard EP | 6–36 months |
| B: receiving infrastructure | SEL1 node, communications and servicing equipment | Chemical departure; onboard capture and stationkeeping | Weeks to several months |
| C: industrial equipment | Tugs, site power, robots, processing modules | Chemical departure followed by EP, or qualified self-delivery | 1–4 years |

²These are scheduling envelopes, not trajectory results. Poor targets may lie outside them and should fail the target gate.

### 3.3 Why not baseline EP spirals from LEO?

They can be mass-efficient but create unattractive early dependencies:

- Months of radiation-belt exposure;
- Large deployed arrays operating through crowded orbital regions;
- Repeated conjunction management;
- Long delays before productive departure;
- Charging, thermal and degradation exposure;
- Possible iodine contamination concerns;
- Dependence on immature MW-class propulsion before the industrial mission has begun.

**Recommendation:** Permit LEO-to-escape EP as an option demonstrated during 0A, but do not make it a critical-path assumption at programme start.

---

## 4. Mass architecture and campaign quantities

### 4.1 Phase 0A manifest

A useful reference allocation is:

| Cargo allocation | Reference mass |
|---|---:|
| Survey/scout flight hardware and hosted equipment | 4 t |
| Pathfinder hardware and associated power systems | 20 t |
| Delivery-relevant demonstrations, small receiving/servicing articles and flight spares | 8 t |
| Initial EP propellant | 10 t |
| Adapters, carriers, separation hardware and packaging allowances | 8 t |
| **Total** | **50 t** |

The **25–100 t** range reflects the difference between a compact pathfinder programme and a programme containing substantial power/propulsion demonstration hardware. bom-0-8 does not prescribe the pathfinder design or charge for its manufacture.

### 4.2 Conditional Phase 0B reference manifest

| Cargo allocation | Reference mass |
|---|---:|
| Twelve cargo tugs, approximately 65 t dry each | 780 t |
| NEA site power, storage and thermal equipment | 550 t |
| Beneficiation and primary processing hardware | 300 t |
| Mining and handling robots | 160 t |
| SEL1 receiving-node hardware | 200 t |
| Surface logistics, communications and miscellaneous installed equipment | 130 t |
| Delivered spares and replacement hardware | 280 t |
| **Allocated dry hardware** | **2,400 t** |
| Hardware mass-growth allowance, 15% | 360 t |
| Initial EP propellant inventory | 800 t |
| Delivery-only carriers, adapters, cradles and transport equipment | 440 t |
| **Total programme cargo manifest** | **4,000 t** |

These numbers are **transport-sizing placeholders** for other BOM owners to replace. In particular, the 65 t tug assumption must include its own arrays, radiators, thrusters, tanks and structure, avoiding duplication with site power.

The delivered mass is less than 4,000 t because:

- Some initial propellant is consumed during commissioning and delivery;
- Delivery-only hardware may be disposed of or retained outside the operating sites;
- Some equipment is accepted at SEL1, some at the NEA.

For illustration, consuming 400 t of EP propellant and disposing of all 440 t of delivery equipment leaves approximately **3,160 t at operating locations**, comprising installed hardware, growth allowance and retained propellant. The actual destination-by-destination mass balance must replace this illustration after trajectory design.

### 4.3 Launch count

Launch count cannot be obtained by dividing the manifest by a vehicle’s advertised LEO capacity.

For a reference mixed campaign:

- Approximately **55%** of cargo could use LEO staging or low-energy handover;
- Approximately **45%** could use direct higher-energy departure;
- Illustrative programme-cargo capacity is **80 t per LEO mission** and **25 t per direct-departure mission**.

That gives approximately:

\[
N \approx \frac{2{,}200}{80}+\frac{1{,}800}{25}\approx100
\]

launch missions.

These capacities are assumptions requiring provider confirmation. Additional departure-stage or propellant launches may be needed in an aggregated architecture.

**Planning range:** approximately **60–160 principal launch missions** for the reference-scale industrial campaign, with a potentially wider range if the programme selects a substantially different launch architecture.

This is a major logistics campaign, not a handful of heavy-lift flights.

---

## 5. Transportation performance and technical requirements

### 5.1 Earth departure

For a circular 200 km parking orbit, impulsive departure requirements are approximately:

| Departure condition | Approximate departure burn |
|---|---:|
| Near-escape, \(C_3=0\) km²/s² | 3.2 km/s |
| \(C_3=10\) km²/s² | 3.6 km/s |
| \(C_3=15\) km²/s² | 3.9 km/s |

These follow the standard two-body relation:

\[
\Delta v =
\sqrt{\frac{2\mu_E}{r}+C_3}
-\sqrt{\frac{\mu_E}{r}}
\]

They exclude gravity losses, steering losses, reserves and finite-burn effects.

At 450 s specific impulse, a 3.2–3.9 km/s burn consumes approximately **52–59% of the pre-burn ideal stage-plus-payload mass**, before accounting for stage dry mass. Consequently, an advertised LEO payload must never be represented as an equal-mass NEA delivery capability.

**Procurement requirement:** providers shall supply payload-versus-\(C_3\) curves and trajectory-specific separation states, not merely “deep-space capable” marketing descriptions.

### 5.2 Electric transport screening

For a representative 1.5 MWe tug:

\[
T=\frac{2\eta P}{v_e}
\]

Using \(\eta=0.62\), \(P=1.5\) MW and \(v_e=30\) km/s:

- Thrust: **62 N**;
- Propellant flow: **2.07 g/s**;
- Full-power annual consumption: **65 t/year**;
- Consumption at 60% annual thrust duty: **39 t/year**.

Twelve such vehicles consume approximately **470 t/year** at that operating point.

For a 350 t vehicle-plus-load, initial acceleration is approximately:

\[
a=1.8\times10^{-4}\ \mathrm{m/s^2}
\]

or about **15 m/s per thrusting day**. This supports months-to-years trajectory planning, not chemical-stage scheduling.

For an illustrative **6–10 km/s** EP manoeuvre requirement and exhaust velocity of **25–35 km/s**, ideal propellant fractions are approximately **16–33%**. Actual requirements depend strongly on target, power availability, throttling, departure energy and return strategy.

### 5.3 Replenishment is separate from initial deployment

The initial 800 t propellant allowance is **not** a lifetime supply.

A provisional steady-state delivery allowance is:

- **300–900 t/year of EP propellant**;
- Plus spares and replacement equipment;
- Potentially **$0.5–2.5B/year in Earth-origin transport**, depending on packaging and destination.

This annual transport is not included indefinitely in the one-time 0B deployment estimate. Before KDP-0B, the programme must define the funded operating horizon and carry that recurring logistics obligation in its lifecycle budget.

---

## 6. Payload envelopes, interfaces and subsystems

### 6.1 Transport module classes

| Attribute | Standard module | Heavy module |
|---|---:|---:|
| Nominal transported mass | 10–25 t | 25–60 t |
| Preferred stowed diameter | ≤4.5 m | ≤7 m, provider-dependent |
| Preferred stowed length | ≤8 m | ≤12 m |
| Transport electrical service | 0.5–5 kW typical | 2–15 kW typical |
| Peak checkout allowance | Up to 15 kW | Up to 30 kW |
| Unpowered survival | 72 hours minimum target | 72 hours minimum target |

These are **design-to envelopes**, not promises of compatibility with every launcher. Fairing dynamic envelopes, centre-of-mass limits and adapter loads govern final compatibility.

Large arrays and radiators must launch stowed. Their deployed dimensions belong to their equipment specifications; bom-0-8 owns clearance and deployment compatibility during transport.

### 6.2 Subsystems

**Mechanical accommodation**

- Standard load-transfer and lifting interfaces;
- Replaceable adapter rings or bolted frames;
- Accessible lifting points with propellant-loaded and dry configurations documented;
- Transport restraints protecting bearings, deployables and precision surfaces;
- Verified centre of mass and inertia tensor.

**Separation and deployment**

- Low-shock separation where warranted;
- Independent separation confirmation;
- Positive clearance before deployment or thruster activation;
- No untracked released caps, straps or fragments;
- Deployment inhibits independent of ground commands.

**Electrical accommodation**

- Prefer **100–150 V DC** housekeeping distribution during carriage;
- Galvanic isolation between carrier and payload;
- Defined bonding, grounding and fault-current paths;
- Site 1–3 kV robot distribution must not be energised through an unqualified launch interface.

**Thermal accommodation**

- Temperature limits supplied by each payload owner;
- Survival heaters sized for launch delay, coast and failed handover cases;
- No assumption that a dormant multi-year payload survives passively;
- Transport power and thermal models include eclipse, attitude and array nondeployment cases.

**Fluid and propellant accommodation**

- Commodity-specific tanks, valves and cleanliness requirements;
- No common iodine/argon transfer system assumed;
- Loading on Earth is preferred for early flights;
- Orbital transfer introduced only where it has passed relevant-environment qualification and improves the lifecycle case.

**Navigation aids**

- Optical fiducials, retroreflectors where useful, passive safe-hold geometry;
- Independent cooperative navigation aids for large capture operations;
- No dependence on uninterrupted ground contact for collision avoidance.

### 6.3 Propellant-specific constraints

**Iodine reference case**

- Solid storage can simplify volume requirements, but does not eliminate tankage, thermal-control or compatibility problems.
- Sublimation, heated feed lines, seals, corrosion, contamination and long-duration isolation require testing.
- Transport packaging must limit contamination of arrays, optics, radiators and processing equipment.

**Argon alternate**

- High-pressure storage can create substantial tank mass and volume penalties.
- An initial trade should examine approximately **20–35 MPa** storage, with actual pressure established from qualified vessels and system optimisation.
- Cryogenic argon may be investigated, but is not the baseline: it introduces boil-off, refrigeration and storage-duration dependencies.

Neither option is sufficiently defined to freeze the delivery mass fraction today.

---

## 7. Autonomy, control and communications

### 7.1 Required autonomy

Delivery vehicles and payloads shall support:

- Autonomous safe mode and power-positive attitude;
- Fault isolation and restart without immediate ground intervention;
- Autonomous burn interruption on propulsion or attitude faults;
- Keep-out-zone enforcement;
- Collision avoidance and retreat during rendezvous;
- Autonomous protection against battery depletion and thermal excursions;
- Recovery from communication outages lasting at least **72 hours** in normal cruise configurations.

For close approach, ground operators may authorise phases, but onboard control must execute safety-critical responses.

### 7.2 Navigation and capture

Preliminary design targets, subject to receiving-interface design:

- Terminal docking/capture relative velocity: **≤0.05–0.10 m/s**;
- Metre-class relative navigation before final approach;
- Decimetre-class relative navigation for the final capture phase where required;
- Independent abort manoeuvre capability;
- Passive collision-safe trajectories wherever orbital geometry permits.

These are not asteroid landing requirements. NEA surface installation and anchoring remain separate, jointly controlled activities with bom-0-2/3.

### 7.3 Communications interface

Transport does not justify a new bulk-data network.

Allocate:

- Routine health and navigation: **1–20 kbps per active vehicle**;
- Encounter/deployment engineering telemetry: **0.1–2 Mbps**, when link geometry supports it;
- High-rate image playback by schedule, not continuous streaming.

Use store-and-forward operation and interoperable space-link protocols. DSN or commercial ground access must be purchased and budgeted through bom-0-9/10.

---

## 8. Manufacturing, integration and acceptance

### 8.1 Manufacturing approach

Build **three families of transport accommodations**, not a unique carrier for every payload:

1. Scout/pathfinder adapters;
2. Standard industrial cargo cradles;
3. Heavy power/tug module accommodations.

Use metallic primary structures and conventional joining where they offer inspectability and repairability. Exotic mass reduction is justified only by demonstrated net delivered-cost savings.

Manufacture early interface simulators so equipment teams can verify:

- Fit and access;
- Harness routing;
- Separation clearance;
- Ground-handling loads;
- Connector mating;
- Thermal and electrical compatibility.

### 8.2 Qualification strategy

Each payload must have an approved combination of qualification testing, analysis and similarity justification covering:

- Quasi-static and coupled dynamic loads;
- Acoustic and vibration environments;
- Separation shock;
- Electromagnetic compatibility;
- Thermal-vacuum survival;
- Battery and pressure-system safety;
- Propellant compatibility;
- Long-duration dormant operation;
- Deployable release and restraint ageing.

Do not invent generic acceleration limits and treat them as launcher requirements. Preliminary sizing may examine **3–6 g axial** environments, but contracted vehicle environments and coupled-loads analysis govern acceptance.

### 8.3 Delivery acceptance

Use four distinct milestones:

1. **Launch acceptance:** correct payload separation and injected state.
2. **Cruise acceptance:** power, communications, thermal control and propulsion operational.
3. **Destination acceptance:** agreed arrival state or safe rendezvous achieved.
4. **Operational handover:** installation interface, deployment and checkout complete to the agreed boundary.

Contracts should not pay the entire “delivered” price at launch.

---

## 9. Development roadmap and readiness gates

### Phase 0A-1 — Architecture and supplier competition

Indicative duration: **12–18 months**.

- Establish the configuration-controlled cargo register;
- Obtain trajectory-specific launch and delivery proposals;
- Complete target-dependent mass and energy models;
- Identify propellant storage and transport hazards;
- Freeze provisional interface standards;
- Identify technologies that could end the programme if they fail.

### Phase 0A-2 — Relevant subsystem demonstrations

Indicative duration: **18–36 months**, partly overlapping.

Demonstrate:

- Long-duration dormant payload survival;
- Representative separation and deployment;
- Propellant/material compatibility;
- Power/propulsion interfaces;
- Rendezvous and capture;
- Autonomous transport fault protection.

Internal milestones target **TRL 4–5**, consistent with D-02.

### Phase 0A-3 — End-to-end pathfinder delivery

Indicative duration: **2–5 years**, driven by destination and trajectory.

Deliver an operationally meaningful payload, not merely a ballast article, and demonstrate the transport architecture’s critical interfaces.

A small EP flight does **not** by itself qualify a MW-class tug. Relevant scaling must cover power processing, thermal rejection, lifetime, plume interaction, fault response and system integration.

### KDP-0B — Mandatory closure

No irreversible industrial campaign commitment until:

- Target orbit and physical properties support the delivery plan;
- Signed Phase 1 demand fixes product, quality, quantity and delivery dates;
- All project-ending technologies reach **TRL 6 in a relevant environment, without waivers**;
- Launch and transport capacity is contractible;
- Propellant supply and packaging are credible;
- Lifecycle economics include replenishment and replacement;
- Licence, liability and contamination requirements are satisfied;
- Earth-supplied material remains a costed fallback.

### Phase 0B — Staged industrial deployment

Sequence:

1. Receiving and navigation infrastructure;
2. Initial NEA power and communications;
3. First processing train and robot set;
4. First qualified production-transport tranche;
5. Expansion only after commissioning and acceptance.

Hold later tranches where possible until preceding equipment demonstrates performance.

---

## 10. Cost estimate and accounting method

### 10.1 Keep LEO and delivered prices separate

Use:

\[
C_{\text{bom-0-8}}
=
C_{\text{LEO access}}
+
C_{\text{onward delivery}}
+
C_{\text{campaign integration}}
\]

For direct-injection contracts, these are **accounting allocations within one purchased service**, not three separately purchased flights. Obtain a provider LEO-reference quote and the incremental price for the actual departure condition; do not add a full direct-launch price to a full LEO-launch price.

### 10.2 Phase 0B scenarios

| Scenario | Cargo manifest | LEO-reference access | Onward delivery | Campaign integration | Total |
|---|---:|---:|---:|---:|---:|
| Low | 2,500 t | $2.00B at $800/kg | $1.00B | $0.25B | **$3.25B** |
| Reference | 4,000 t | $4.80B at $1,200/kg | $2.00B | $0.50B | **$7.30B** |
| High | 6,000 t | $10.80B at $1,800/kg | $4.00B | $0.90B | **$15.70B** |

Onward delivery covers purchased departure stages, carrier services, delivery-only equipment and the transport-service portion of using programme tugs. It does **not** repurchase tug hardware or EP propellant commodity.

The low case requires favourable launch pricing, manageable departure energy, relatively light hardware and little redesign. The high case represents a larger, less efficient campaign—not a probabilistic confidence bound.

### 10.3 Phase 0A allowance

| Element | Range |
|---|---:|
| Launch services | $100–350M |
| Departure and onward delivery | $80–350M |
| Mission-specific integration and campaigns | $70–200M |
| **Total** | **$250–900M** |

Early demonstrations are disproportionately expensive per kilogram because they buy dedicated opportunities, schedule assurance and mission-specific integration.

### 10.4 Effective delivered price

At the reference point:

- Cargo-reference cost: \( \$7.3B / 4{,}000t \approx \$1{,}825/kg \);
- If approximately 3,160 t remains at accepted destinations: approximately **$2,310/kg**;
- If counting only the 2,760 t installed-hardware allocation, including growth allowance: approximately **$2,645/kg**.

These are different denominators and must not be interchanged. None is a price per kilogram of asteroid product.

### 10.5 Position on the round-2 proposals

**Mass:** The proposed **2.5–6 kt industrial range** is a reasonable working envelope. The narrower 2.5–3.5 kt range is not yet justified given tug, radiator, propellant and packaging uncertainty. An 8 kt case should remain a stress case, not silently become the baseline.

**Cost:** A **$3–6B total** is possible only toward the favourable end of mass and service pricing. It is too narrow for current planning. A broader approximately **$3.5–16.6B for 0A plus 0B**, with a **$7.8B reference point**, better exposes the unresolved decisions.

**Unit price:** The round-2 **$3,000–12,000/kg** range may describe small dedicated deep-space missions or an adverse campaign, but is not useful as a single multiplier without a destination and mass boundary. My reference estimate is lower because it assumes industrial procurement and use of programme-owned transport assets. Those assumptions require validation during 0A.

---

## 11. Principal risks and mitigations

| Risk | Consequence | Required response |
|---|---|---|
| Target selected for ore quality but not accessibility | Delivery architecture becomes uneconomic | Joint geology–trajectory–operations target gate |
| MW EP fails lifetime or scaling tests | Fleet cannot deploy or replenish | No-waiver TRL 6 gate; retain chemical departure options |
| Iodine incompatibility or contamination | Payload and propulsion degradation | Material/plume tests; preserve argon alternate |
| Launch provider concentration | Cost growth or prolonged stand-down | Dual-source interfaces and staged procurement |
| Mass growth | Additional launch lots and delayed commissioning | Configuration-controlled mass register with transported growth allowance |
| Multi-year transit failures | Equipment arrives degraded | Dormancy qualification, checkout capability and replaceable modules |
| Assembly complexity | Campaign bottleneck and collision exposure | Minimise mandatory assembly; demonstrate critical operations in 0A |
| Propellant tankage underestimated | Manifest and costs fail to close | Tank-level mass/volume models before architecture freeze |
| Receiving node not ready | Cargo stranded or forced into unsafe loiter | Destination-readiness release criteria |
| Launch cadence unavailable | Deployment spans excessive years | Contract cadence and integration capacity, not merely launch price |
| Liability/licensing delay | Launch or disposal blocked | Early regulator engagement and controlled disposal plans |

### Debris and contamination

bom-0-8 must implement the requirements owned by bom-0-15:

- No intentional release of untracked hardware;
- Passivation of spent delivery stages;
- Controlled disposition or approved stable disposal;
- Collision-risk assessment throughout Earth departure;
- Propellant containment and plume management;
- Prevention of contamination that compromises target science or processing.

D-03 remains interim. **I would not invent a numerical “acceptable loss” threshold for this proposal.** Demonstrate ALARP, model credible breakup and contamination cases, and establish the quantitative ceiling with the licensing state before the relevant flight commitment.

---

## 12. Open engineering questions

The following must be answered before a firm 0B launch budget is credible:

1. **Which NEA, which arrival windows, and what delivered-state requirement?**
2. **What exact Fe-Ni material, purity, quantity and date does Phase 1 contract to receive?**
3. **What is each tug’s fully burdened dry mass**, including arrays, radiators, tanks, shielding and reserves?
4. **Can the selected EP system demonstrate MW-scale relevant-environment performance and life?**
5. **What is the storage and packaging mass of iodine versus argon?**
6. **How much propellant must be carried during initial deployment versus replenished later?**
7. **Which modules genuinely require orbital assembly?**
8. **What launch rate can providers and the programme’s integration facilities sustain?**
9. **Can SEL1 receiving infrastructure be ready before the first cargo arrivals?**
10. **Which obligations continue during multi-year cruise, and who pays for them?**
11. **What replacement strategy follows a failed industrial-module delivery?**
12. **When does direct Earth supply outperform asteroid-derived material for the signed Phase 1 demand?**

## Final recommendation

Approve a **$250–900M staged 0A launch-and-delivery allowance**, with **$500M as the reference planning allocation**, and require 0A to replace assumptions with supplier quotations, target-specific trajectories and demonstrated interfaces.

Carry **2.5–6 kt and $3.25–15.7B** as the conditional 0B deployment envelope, with **4 kt and $7.3B** as a transparent reference case—not an authorised commitment.

The decisive engineering product of 0A should be a **closed delivery ledger**: every module has a mass, launch opportunity, departure state, propulsion allocation, arrival condition, acceptance test, disposal plan and accountable price. Until that ledger closes, industrial throughput and launch affordability remain hypotheses.