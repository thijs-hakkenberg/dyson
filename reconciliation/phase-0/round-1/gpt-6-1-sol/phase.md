---
phase: phase-0
item: phase
round: 1
type: reassessment
modelId: gpt-6-1-sol
modelName: "GPT-6.1 Sol"
endpoint: databricks-gpt-6-1-sol
findings: b907d2fc76f4
priorRound: null
generated: 2026-10-11T22:56:33.837Z
seconds: 312.314
---

# 1. Findings

## Assessment basis

**The present Phase 0 does not close as an industrial system.** Its largest problem is not any individual component: it separates excavation, processing and assembly without budgeting the transport, power, imported propellant and maintenance needed to connect them.

I recommend:

- **Phase 0A:** resource characterization, process development and flight pathfinders.
- **Phase 0B:** an **uncrewed, asteroid-co-located processing plant**, initially accepting **10,000 t/year**, expandable to 50,000 t/year only after demand and process performance are demonstrated.
- Transport **finished or concentrated products**, not bulk regolith, to the Phase 1 assembly point.
- Make **native Fe–Ni recovery the first production process**. Treat oxide reduction, solar-grade silicon and cryogenic propellant production as separate development projects.
- Replace the unallocated 100 MW procurement with approximately **20 MW of delivered electrical capacity**, expandable as justified.

This is a **conditional reference architecture**, not a claim that a suitable asteroid, extraction process or transport trajectory has already been identified.

### Accounting assumptions

Unless stated otherwise:

- Costs are **order-of-magnitude estimates in constant 2026 USD**, not supplier quotations.
- Phase 0B operates for **10 years**.
- Power is electrical bus power; solar nameplate, thermal collection and propulsion power are identified separately.
- Mass flow is **dry feed or product mass**, except where water or propulsion consumables are explicitly identified.
- The reference resource has **15–25% recoverable native-metal product yield**. This is a **site-selection requirement**, not a demonstrated property of an accessible asteroid.
- No human visits, megawatt-class iodine propulsion, economically viable asteroid mining, or autonomous industrial replication are assumed to have flight heritage.
- I cannot verify current supplier quotations or unpublished deliberation texts from the material provided. Conclusions unavailable here are treated as change requests, not established engineering evidence.

---

## P0-F01 — Transport capacity versus station throughput

**Verdict: agree with the closure failure; partly disagree with the numerical derivation.**

At 1 AU, incident solar flux is approximately 1,361 W/m². For 300–500 m² of cells:

\[
P_{\rm cell}=A S\eta
=(300\text{–}500)\,\mathrm{m^2}
(1361\,\mathrm{W/m^2})(0.32\text{–}0.36)
=131\text{–}245\,\mathrm{kW}.
\]

Allowing for temperature, packing, pointing, distribution and degradation gives approximately **90–200 kW usable**, rather than reliably 150–250 kW.

For electric propulsion:

\[
F=\frac{2\eta_{\rm EP}P}{g_0 I_{sp}}.
\]

At \(I_{sp}=1,800\text{–}2,500\) s and efficiency 0.5–0.65, thrust-to-power is approximately **40–74 mN/kW**. Thus the stated vehicle provides roughly **4–15 N**, depending on operating point.

The finding’s constant-mass calculation correctly identifies a multi-year problem, but **round-trip Δv cannot all be applied at loaded departure mass**: the return vehicle is lighter.

### Revised reference tug

Assume:

- Dry mass excluding separately budgeted arrays: **50 t**
- Delivered cargo: **200 t**
- Outbound and return Δv: **3 km/s each**
- \(I_{sp}=2,500\) s; exhaust velocity \(v_e=24.5\) km/s
- Thruster input: **0.75 MW**
- Efficiency: **0.60**

Return propellant:

\[
m_{p,r}=50\left(e^{3/24.5}-1\right)=6.5\,\mathrm{t}.
\]

Outbound propellant:

\[
m_{p,o}=(50+200+6.5)\left(e^{3/24.5}-1\right)
=33.4\,\mathrm{t}.
\]

Total: **approximately 40 t per cycle**.

Thrust and mass flow:

\[
F=\frac{2(0.60)(750,000)}{24,517}=36.7\,\mathrm{N},
\]

\[
\dot m=F/v_e=0.00150\,\mathrm{kg/s}.
\]

Powered duration:

\[
t_{\rm thrust}=\frac{40,000}{0.00150}
\approx 2.67\times10^7\,\mathrm{s}
\approx 0.85\,\mathrm{year}.
\]

Allowing coast, rendezvous, transfer and maintenance gives an **estimated 1.2–1.8-year cycle** for a favorable trajectory. At 10 km/s round trip, propellant increases to approximately **74 t**, powered duration to about **1.6 years**, and the overall cycle may exceed two years.

A 15-vehicle fleet therefore offers approximately:

\[
\dot M=\frac{15(200\,\mathrm{t})}{1.2\text{–}1.8\,\mathrm{yr}}
=1.7\text{–}2.5\,\mathrm{kt/yr},
\]

before availability margin.

**Change:** co-locate processing with excavation. Specify **1 kt/year contracted product delivery**, with approximately 1.5–2 kt/year usable fleet capacity on qualifying trajectories. Do not require these tugs to deliver 50 kt/year of raw feed.

If 50 kt/year must instead be transported, this reference vehicle requires roughly **300–500 vehicles**, or a fundamentally different transport system. A 100 MW phase allocation does not solve that architecture automatically.

---

## P0-F02 — Mining rate, duty cycle and mass-flow consistency

**Verdict: agree.**

The 2–5 t/h rate is an instantaneous equipment rating, not demonstrated annual production. Unanimous model agreement does not validate excavation performance.

### Reference mass-flow chain

| Stage | Phase 0B nominal | Planning range | Destination |
|---|---:|---:|---|
| Excavated feed | 10,000 t/yr | 8,000–12,000 | Co-located plant |
| Sealed, screened feed accepted | 10,000 t/yr | 8,000–12,000 | Plant |
| Saleable native-metal products | 2,000 t/yr | 1,200–3,000 | Local fabrication and export |
| Tailings and rejected material | 8,000 t/yr | 6,000–10,000 | Contained emplacement |
| Exported product | 1,000 t/yr | 500–1,500 | Phase 1 assembly node |
| Local product use/limited inventory | 1,000 t/yr | Balance of production | Structures, shielding, spares |

The ranges are not independent: product plus retained tailings must equal accepted feed, apart from measured volatiles and losses.

Four working excavators at an assumed **2.5 t/h** require:

\[
t_{\rm op}=\frac{10,000}{4(2.5)}
=1,000\,\mathrm{h/robot/yr},
\]

or an **11% calendar duty cycle**. Two additional units provide redundancy and maintenance rotation.

There is **no bulk concentration credited before processing**. Product-to-feed concentration is nominally **5:1**, corresponding to 20% saleable yield.

**Change:** resize from 20 robots to **six initial units**. Preserve the 50 kt/year expansion option: 20 robots at the same rate and duty produce 50 kt/year. Expansion requires about 10 kt/year of product disposition—not necessarily transport of 50 kt/year of feed.

Inventory accumulation is not a substitute for demand. Expansion must stop if qualified local use and export cannot absorb output.

---

## P0-F03 — Processing power

**Verdict: partly.**

The original power specification is inadequate for mixed oxide reduction at the stated scale. However, the finding mixes **energy per kilogram of product** with **kilograms of feed**. That can overstate or understate the load substantially.

### Process energy basis

| Process | Planning specific energy | Basis and limitation |
|---|---:|---|
| Screening, crushing and separation | 0.1–0.3 kWh/kg feed | Engineering allowance; feed dependent |
| Melting/casting native Fe–Ni | 0.5–1.5 kWh/kg metal | Sensible/latent heat plus furnace losses |
| Primary aluminium from suitable oxide feed | 13–18 kWh/kg Al, electricity only | Terrestrial Hall–Héroult benchmark; not an asteroid process guarantee |
| Silicon metal production | 11–15 kWh/kg Si | Terrestrial furnace benchmark; requires suitable reductant/process |
| Solar-grade silicon purification | Additional tens of kWh/kg, process dependent | Not a justified Phase 0 production commitment |
| Molten-regolith oxygen/metal production | Must be measured per kg O₂ and coproduct | No demonstrated industrial space-process figure |

For the reference 10 kt/year native-metal feed:

\[
E_{\rm sep}=10^7\,\mathrm{kg}(0.1\text{–}0.3)
=1\text{–}3\,\mathrm{GWh/yr},
\]

\[
E_{\rm melt}=2\times10^6\,\mathrm{kg}(0.5\text{–}1.5)
=1\text{–}3\,\mathrm{GWh/yr}.
\]

Therefore:

\[
P_{\rm process,avg}=\frac{2\text{–}6\,\mathrm{GWh}}{8760\,\mathrm{h}}
=0.23\text{–}0.69\,\mathrm{MW}.
\]

Add roughly **0.3–0.6 MW average** for thermal control, handling, pumps and instrumentation. A **4 MW station connection** accommodates batch operation, outages and process development.

At 50 kt/year, the same native-metal route needs approximately **1.1–3.4 MW process average**, plus auxiliaries. Thus 1–2.5 MW is not categorically impossible for a narrow, efficient native-metal process, but it is not sufficient for the advertised mixed product slate.

**Change:** allocate power explicitly; remove guaranteed aluminium and solar-grade silicon production. Oxide-processing modules require their own measured energy and yield budgets.

Published terrestrial benchmarks: International Aluminium Institute primary-smelting energy statistics; DOE, *Bandgap Engineering / Manufacturing Energy and Carbon Footprints* and silicon-production literature. These are bounding references, not space qualification.

---

## P0-F04 — Power allocation and batteries

**Verdict: agree on missing allocation; partly on “storage buys little.”**

Continuous sunlight removes the need for nightly station storage. It does not remove safe-mode, transient, maintenance or pointing-loss requirements.

### Revised electrical allocation

| Site/load | Installed delivered capacity |
|---|---:|
| Fifteen tugs, 0.75 MW each | 11.25 MW |
| Co-located processing plant | 4.00 MW |
| Excavators and feed handling | 1.00 MW |
| Water-extraction/electrolysis pilot | 0.25 MW |
| Site utilities, relays and robotic servicing | 1.00 MW |
| Reserve and growth allowance | 2.50 MW |
| **Total** | **20.00 MW** |

These are **peak connection capacities**, not simultaneous average demand.

Arrays are physically divided between the tugs and resource-site power plant. Power is not transmitted between distant asteroids.

For an assumed six-hour local shadow interval, a 100 kW critical-load island requires:

\[
E=\frac{P t}{\eta\,DOD}
=\frac{0.1\,\mathrm{MW}(6\,\mathrm{h})}{0.9(0.8)}
=0.83\,\mathrm{MWh}.
\]

**Change:**

- Use a sunlit free-flying power platform or appropriately surveyed site geometry.
- Shut down excavation and furnaces during extended shadows.
- Budget approximately **1–3 MWh total site storage**, subject to measured rotation/illumination.
- Budget **20–100 kWh per tug** for critical systems, not propulsion.
- Remove 200–500 MWh station storage.

A lunar deployment would require a separate illumination and survival-energy analysis; these asteroid assumptions do not apply to lunar night.

---

## P0-F05 — Array price

**Verdict: agree that $5/W installed is unsupported.**

There is no transparent, current public price list establishing a single market rate for 100 MW of space-qualified arrays. I cannot honestly report a checked supplier quote. The following is a **budget allowance**, not published procurement pricing.

For **24–32 MW beginning-of-life nameplate**, delivering about 20 MW under the selected operating conditions:

| Cost component | Planning allowance |
|---|---:|
| Cells and blankets | $15–50/W nameplate |
| Deployment structure, drives, harness and protection | $10–30/W |
| Integration and qualification | $5–20/W |
| **Recurring flight hardware** | **$30–100/W** |
| Launch and delivery | Separately budgeted |

At an estimated **60–150 W/kg at array-system level**, array mass is approximately **160–530 t**.

At $3,000–12,000/kg delivered to the operational architecture, launch contributes about **$20–200/W**, depending on specific power and destination.

**Change:** budget approximately **$50–300/W delivered**, with low confidence, and obtain competitive quotations during Phase 0A. The original 100 MW system would therefore be a several-billion to several-tens-of-billions-dollar commitment, not a confidently priced $500M procurement.

ROSA/iROSA and large commercial GEO arrays provide deployment heritage. They do not establish megawatt-module cost, dynamics or reliability.

---

## P0-F06 — Prospecting cadence

**Verdict: partly.**

Twenty **remote observations** per year is physically plausible. Twenty independent NEA rendezvous per year is not a credible requirement for this spacecraft.

For a 100 kg wet spacecraft with 20 kg of monopropellant at 230 s:

\[
\Delta v=g_0I_{sp}\ln(100/80)
\approx 0.50\,\mathrm{km/s}.
\]

For 15 kg EP propellant at 2,000 s:

\[
\Delta v\approx 19.6\ln(100/85)
=3.2\,\mathrm{km/s},
\]

but thrust, available trajectory time and power constrain its use.

**Change:** split the fleet:

- **12 remote survey spacecraft**, approximately 100–200 kg, 0.2–0.8 km/s onboard Δv, **20–100 scheduled observations/year each**. These are observations, not necessarily unique newly characterized asteroids.
- **Four close-proximity scouts**, approximately 200–400 kg, 2–4 km/s onboard EP Δv, **one rendezvous each**, with an optional additional target or flybys where trajectory design supports them.

Remote surveys classify and prioritize candidates. They do **not** establish bulk water concentration, recoverable-metal yield or excavation mechanics.

Include thermal infrared capability where needed to resolve size/albedo ambiguity. NEO Surveyor and NEOWISE illustrate why optical/NIR spectra alone are not a complete resource-assessment system.

---

## P0-F07 — Robot mass and power

**Verdict: agree.**

The 500 kg rationale is stale and must be removed. Counter-rotation addresses torque but does not eliminate cutting forces, anchoring loads or containment requirements.

The asserted 50–200 N·m torque also needs operating speed:

\[
\tau=P/\omega.
\]

At 20 kW and 2 rad/s, shaft torque is **10,000 N·m**, not 50–200 N·m. Smaller torque is possible at higher shaft speeds or different transmission locations, but the quoted values are not self-validating.

**Change:**

- Robot mass: **3–4 t**, including anchoring, mobility, enclosed tooling and interfaces.
- Mechanical excavation power: retain **20–50 kW as a development target**.
- Electrical connection: **40–100 kW per operating robot**, including drives and auxiliaries.
- Supply power through a **protected tether from the site plant**.
- Batteries support relocation and safe mode, not routine night-side excavation.
- Replace the asserted 60–80 kg excavator subsystem mass with a provisional **150–400 kg allowance**, pending prototype measurement.

Counter-rotating bucket wheels remain a candidate, not a validated final architecture. NASA’s RASSOR work supports the principle under lunar conditions, not the supplied asteroid rate, mass or cancellation guarantees.

---

## P0-F08 — Launch and Earth-to-space transport

**Verdict: agree.**

### Reference Phase 0B mass account

| Earth-supplied category | Initial mass |
|---|---:|
| Fifteen tugs, excluding arrays and propellant | 450–900 t |
| Processing station | 250–450 t |
| Arrays | 160–530 t |
| Six mining robots | 18–24 t |
| Water pilot | 10–30 t |
| Prospectors, relays and servicing hardware | 25–65 t |
| Initial spares, packaging and interfaces | 100–250 t |
| Initial propulsion inventory | 400–700 t |
| **Initial operational deployment** | **about 1,400–3,000 t** |

Over ten years, imported propulsion consumables add approximately **2,000–4,500 t**. Replacement hardware and additional flight campaigns add roughly **300–1,000 t**.

**Planning total: 4,000–9,000 t delivered over the program**, allowing for Phase 0A hardware and rounding.

Use **$3,000–12,000/kg delivered** as a scenario range, including launch, departure accommodation and delivery services but excluding propellant commodity purchase.

\[
C_{\rm delivery}
=(4\text{–}9)\times10^6\,\mathrm{kg}
(3,000\text{–}12,000\,\$/\mathrm{kg})
\approx \$12\text{–}108\,\mathrm{B}.
\]

This is the largest budget uncertainty. Published Falcon 9 performance and pricing anchor the existence of present-day launch services, but are not quotes for this mass at an asteroid. Starship target prices are not adopted as demonstrated delivered prices.

**Change:** add a separate launch/departure/delivery line. Prevent double counting with array “installed” cost and tug procurement.

---

## P0-F09 — Communications and operations

**Verdict: agree.**

**Change:** provide:

- A resource-site relay pair plus spare, with X/Ka-band Earth links.
- Local S/X-band or optical links between robots, plant and relay.
- Direct-to-Earth links for scouts and tugs; store-and-forward during scheduled outages.
- Contracted access to commercial deep-space antennas and/or NASA DSN or ESA Estrack where agreements and capacity permit. DSN access is not presumed free or unlimited.

Planning rates:

| Link | Rate |
|---|---:|
| Local robot/process telemetry | 0.1–10 Mbps per active node |
| Site aggregate Earth return | 1–10 Mbps when scheduled |
| Tug command/engineering | 10–100 kbps when scheduled |
| Scout science return | 0.1–5 Mbps during contacts |
| Safe-mode channel | 0.1–10 kbps |

Rates depend on distance, antenna aperture, RF power and weather. They require actual link budgets.

Budget **50–120 operations and engineering staff**, distributed across shifts and specialties, plus network services and software maintenance:

- Ground/relay hardware: **$0.25–0.75B**
- Operations and communications services: **$0.15–0.40B/year**

Autonomy reduces routine commanding, not fault investigation, cybersecurity or configuration management.

---

## P0-F10 — Crewed operation

**Verdict: agree.**

**Change:** Phase 0B is **uncrewed**. Remove quarterly visits, habitat, life support and crew-maintenance assumptions.

A Sun–Earth L4/L5 station is approximately **1 AU from Earth**, with about **8.3 minutes one-way light time**. Calling it conveniently accessible for quarterly maintenance is misleading.

Retain inspection access, modular replacement, rendezvous interfaces and provisions for future rescue/servicing studies. Do not equate structural reserve with human rating. NASA NPR 8705.2 human-rating requirements encompass much more than structure.

A future crewed option requires a separate mission architecture and budget.

---

## P0-F11 — Tug propellant and ISPP customer

**Verdict: agree.**

At 1 kt/year product export and 200 t cargo per delivery:

\[
N_{\rm cycles}=1,000/200=5\,\mathrm{cycles/yr}.
\]

For the staged rocket-equation cases above:

\[
\dot M_p=5(40\text{–}74)
=200\text{–}370\,\mathrm{t/yr}.
\]

Allow reserves and off-nominal operation: **200–450 t/year**.

That is a substantial supply-chain commitment even after abandoning bulk-regolith shipment.

**Change:**

- Use **iodine as the reference procurement study**, not as a flight-qualified megawatt propulsion selection.
- Carry krypton as an alternative pending supplier capacity, cost and thruster-life evidence.
- Do not retain the “xenon exceeds global production 15–20×” statement without a dated, traceable supply calculation.
- Budget iodine commodity purchase approximately **$0.1–0.5B over ten years**, using an estimated $30–100/kg. Launch dominates its delivered cost.
- Obtain binding production/reserve agreements before fleet procurement.

USGS iodine commodity reports indicate worldwide iodine production is on the order of **tens of thousands of tonnes/year**. The reference demand is therefore not intrinsically beyond global iodine production, although purification, strategic demand and propulsion compatibility remain issues. Krypton needs an industrial-gas supply audit; substituting it is not automatically a supply solution.

Iodine EP has flight heritage at **small power**, including the 2021 Nature report by Rafalskyi et al. That does not validate this 0.75 MW tug.

The ISPP system has **no established tug customer**. Retain one water-extraction pilot, targeting **10–30 t/year water**, for process validation and local consumables. Remove operational LOX/LH₂ production and the EML1 depot from the base Phase 0 scope.

---

## P0-F12 — Development, pathfinders, replacements and contingency

**Verdict: agree.**

**Change:** add explicit accounts:

- Non-recurring engineering and qualification: **$5–12B**
- Dedicated Phase 0A pathfinder flight hardware: **$1–3B**
- Industrial replacement hardware and spares: **$0.8–2.5B**
- Launch and consumables for replacements: in their respective accounts
- Contingency: **20–35% of the resulting subtotal**

These are planning judgements, not statistical confidence intervals.

Robot five-year life requires at least one replacement cycle during ten-year industrial operation. Thruster life must be budgeted by **operating hours and total impulse**, not merely a 15-year calendar requirement.

The quoted $17M, 18-month excavation program could fund useful early experiments. It is not a credible complete qualification budget for an autonomous asteroid excavation and containment system.

---

## P0-F13 — Organizational infrastructure

**Verdict: agree; the supplied evidence is insufficient to reconstruct rq-0-29 verbatim.**

**Change:** establish a ten-year program organization with:

- A legal entity and identified licensing state(s).
- Board authority, technical authority and an independent safety function.
- Auditable procurement, financial controls and configuration management.
- Succession, insolvency and custodial arrangements for unattended assets.
- Launch/re-entry and payload licensing; spectrum allocation; export-control compliance.
- Liability allocation, insurance where available, financial assurance and emergency response.
- Planetary-protection assessment, sample-handling rules and environmental/contamination review.
- Traffic coordination, tracking and publication of operational ephemerides.
- Resource-title and contracting arrangements appropriate to applicable national law and treaty obligations.
- A public dispute-resolution and data-release policy.

Budget **$100–300M over ten years**, distinct from mission operations and technical software development.

Multi-century continuity cannot be guaranteed by a one-time incorporation document or $50M allocation. Review the legal and institutional framework at least every five years.

---

## P0-F14 — Debris, contamination and compliance

**Verdict: agree.**

At 10 kt/year throughput:

- 99% containment releases **100 t/year**.
- 99.99% containment still releases **1 t/year**.

A single percentage is not enough: hazards depend on particle size, speed, charge, trajectory and exposure to sensitive surfaces.

**Change:** adopt provisional—not regulatory—requirements:

- Total escaped solids outside controlled containment: **≤10 kg/year per site**, corresponding to approximately **99.9999% mass retention** at 10 kt/year.
- No intentional release of macroscopic particles onto trajectories intersecting spacecraft operating corridors.
- Optical-array contamination: **<1% attributable annual power loss**, verified by witness samples and inspection.
- Tailings retained in anchored bins, bags or engineered emplacement.
- Enclosed cutting interfaces, capture shrouds, secondary barriers, dust collection and filtered vents.
- Process-specific leak and volatile-release limits based on safety and science constraints.

Budget **$0.1–0.3B** for containment qualification, monitoring and dedicated mitigation hardware; ordinary enclosures remain within robot and plant hardware.

Certification requires the relevant licensing authorities and the program’s independent safety authority. There is no universal “asteroid mine certification agency.” COSPAR policy addresses planetary protection, not all industrial debris risks.

The quoted 0.1 m/s escape speed is also target-specific. For a spherical body:

\[
v_{\rm esc}=\sqrt{\frac{8\pi G\rho}{3}}R.
\]

At \(\rho=2,000\,\mathrm{kg/m^3}\), it is about 0.05 m/s for a 50 m radius and 0.53 m/s for a 500 m radius.

---

## P0-F15 — Deliberations not incorporated

**Verdict: agree with configuration-control failure; partly with treating all conclusions as validated specifications.**

Only rq-0-28 is supplied in full. The others’ titles and summaries are insufficient to reproduce their complete conclusions.

| Deliberation | Proposed specification change |
|---|---|
| rq-0-11: gravity zones | Add rotating processing modules, nominally 0.05–0.15 g; require process-specific demonstration rather than assuming this range is universally sufficient |
| rq-0-14: deferred propellant deployment | Defer production-scale chemical ISPP; treat the reported ≥25 kt/year threshold as a proposed economic gate whose definition and customer demand must be supplied |
| rq-0-18: structural human rating | Reserve interfaces and structural margins where cheap; do not certify or describe uncrewed tugs as human-rated |
| rq-0-28: cost methodology | Separate seed capital, recurring manufacture, imports, support and reserves; retain ordinary procurement costing for Phase 0 |
| rq-0-29: governance | Add the institutional specification above; obtain and reconcile the actual conclusion |
| rq-0-30: boil-off | No operational cryogenic inventory in base scope; any later depot must specify heat leak, cooler load, storage duration and transfer loss |
| rq-0-47: sunshield | Include shading and thermal isolation in future cryogenic modules; no unsupported percentage mass reduction |
| rq-0-48: MLI degradation | Specify inspection, replaceable shielding, contamination control and end-of-life thermal testing for future cryogenic modules |
| rq-0-26: excavation | Retain counter-rotation as a candidate; withdraw “validated” performance claims until testing |

Rotating process equipment receives a provisional **30–80 t mass allocation**, included in the 250–450 t plant, and **$0.5–1.5B recurring hardware allowance**, included in station cost.

I also disagree with rq-0-28’s assertion that a capacity model necessarily makes total cost logarithmic in output. Replication time can scale logarithmically under ideal growth; imports, replacements and resource processing can still scale linearly with output. Its Phase 2–3 savings are hypotheses, not validated consequences.

---

## P0-F16 — BOM/specification divergence

**Verdict: agree.**

I cannot regenerate consensus from “current specs” that have not been supplied, including purported Opus 4.6 documents.

**Change:** issue a configuration-controlled revision with this reference architecture:

- Prospectors: **12 remote survey spacecraft plus four rendezvous scouts**
- Mining robots: **six initial**, expandable to 20
- Station: **10 kt/year initial feed capacity**, asteroid-co-located
- Tugs: **15**, 200 t cargo, **0.75 MW thruster power**
- Propellant: iodine reference study; krypton alternative; selection gated
- Power: **20 MW delivered**, not 100 MW automatically procured
- ISPP: **one water pilot**, not four production plants
- Organization: fully specified and separately funded

The authoritative figures should be the approved requirements baseline—not whichever model document is newest.

Remove the universal 1,000°C water-extraction requirement. Free ice, adsorbed water and chemically bound water require different temperature profiles; **approximately 200–700°C** is an initial test envelope, not a universal recipe. Anhydrous oxygen extraction at still higher temperatures is a different process.

---

## P0-F17 — “Pure research” versus industrial hardware

**Verdict: agree.**

“Before spending a single dollar on hardware” is incompatible even with physical research demonstrations.

**Change:**

### Phase 0A: feasibility and pathfinders

**Approximately $8–20B**, included within the whole-program estimate:

- Remote and rendezvous resource characterization.
- Vacuum extraction and materials processing.
- Anchoring, containment and autonomy demonstrations.
- Rotating-process demonstrations.
- Propulsion endurance and propellant supply qualification.
- Early flight pilots and mission design.

### Phase 0B: industrial deployment and operation

**Approximately $25–180B incremental**, strongly dominated by delivery economics and imported propulsion mass.

A PDR alone does not authorize full procurement. Phase 0B requires process, resource, demand, transport and cost gates, followed by CDR and incremental deployment approvals.

---

## P0-F18 — Metallurgy fallback

**Verdict: agree on the missing fallback; partly on the “eight orders of magnitude” argument.**

Comparing a 100 g experiment with 50 kt/year mixes **batch mass and annual throughput**. It is rhetorically useful but not a valid scale-up metric. Relevant quantities include batch size, heat flux, mixing, separation, residence time and continuous operating hours.

### Rotating process architecture

For artificial acceleration:

\[
a=\omega^2r.
\]

At a 20 m radius:

\[
\omega=\sqrt{(0.05\text{–}0.15)g_0/20},
\]

giving **1.5–2.6 rpm**.

Use enclosed rotating crucible/process modules with stationary docking, power and feed interfaces where practicable. Do not rotate the entire station unnecessarily.

The 0.05–0.15 g range is a **development hypothesis**. It is not proven sufficient for all smelting, slag separation or purification operations.

### Costed fallback

1. **Preferred fallback: Earth-manufactured Phase 1 material.**
   - For a 1 kt/year structural-material requirement, delivery is approximately **$3–12B/year**, plus **$0.01–0.1B/year** procurement.
   - Over five years: roughly **$15–60B delivered**.
   - For electronics and photovoltaic cells, Earth supply is already the reference plan.

2. **Secondary option: lunar processing pilot.**
   - Preliminary capital/development allowance: **$5–15B**, excluding a production lunar transport network.
   - It offers gravity, but not automatically cheap metallurgy: lunar metals are largely in oxides.
   - A lunar production system cannot be costed credibly without feedstock, power and ascent logistics.

**Trigger:** after representative rotating-process testing, reject industrial asteroid deployment if required yield, energy, availability or product quality cannot be achieved with demonstrated equipment. Do not build the station first and discover the missing process afterward.

---

## P0-F19 — Phase 1 demand and delivery interface

**Verdict: agree.**

The supplied Phase 1 ranges imply:

\[
M_{\rm collectors}=1,000(69\text{–}1,850)\,\mathrm{kg}
=69\text{–}1,850\,\mathrm{t},
\]

\[
M_{\rm blankets}=5,000(690\text{–}45,000)\,\mathrm{kg}
=3,450\text{–}225,000\,\mathrm{t}.
\]

Combined: **approximately 3.5–227 kt**, before resolving overlaps and determining which components are actually Phase 0 products.

Over ten years that is **0.35–22.7 kt/year**. These models therefore do not define a single demand case.

**Provisional interface:**

| Phase 1 requirement | Phase 0 commitment |
|---|---|
| Structural Fe–Ni stock, shielding and selected mechanisms | Up to 1 kt/year delivered after qualification |
| Composition | Lot-certified alloy specification; not merely “Fe/Ni present” |
| Mechanical quality | Coupon-tested strength, ductility, porosity and dimensional tolerance |
| Aluminium | No guaranteed base-scope production |
| Solar-grade silicon, III-V cells, electronics | Earth-supplied initially |
| Delivery point | Phase 1 assembly node, provisionally Sun–Earth L1 |
| First delivery date | Relative milestone: after Phase 0B commissioning and acceptance, not an unsupported calendar date |

**Change:** locate processing at the resource and explicitly budget resource-to-L1 product transport. Do not retain L4/L5 processing merely for orbital stability.

Phase 0B approval requires a signed demand schedule that identifies which kilograms are structural metal, cell blanket, semiconductor, glass, cable or deployment mechanism. The reference architecture cannot satisfy the high Phase 1 mass case.

---

# 2. Revised specification

## Principal parameter changes

| Parameter | Old → proposed | Basis | Confidence |
|---|---|---|---|
| Initial station feed capacity | 50 → **10 kt/year**, range 8–12 | Staged system closure | Medium |
| Expansion feed capacity | Unconditional 50 → **50 kt/year conditional** | Demand/process gate | Low |
| Station location | Sun–Earth L4/L5 → **co-located with selected resource** | Eliminates bulk-feed transport | Medium |
| Initial station mass | 400–500 t → **250–450 t** | Preliminary modular mass allowance | Low |
| Product slate | Al, Fe, Ni, solar Si → **native Fe–Ni first** | Process maturity and energy | Medium |
| Recoverable product yield | Unspecified → **15–25% feed mass** | Site-selection assumption | Low |
| Artificial gravity | None → **0.05–0.15 g process modules** | Rotational calculation; process hypothesis | Low |
| Mining fleet | 20 → **six initial, four normally working** | 10 kt/year at 1,000 h/unit-year | Medium |
| Robot mass | 2.5–3.5 t / stale 0.5 t → **3–4 t** | Preliminary integrated allowance | Low |
| Tug fleet | 10 versus 15 → **15** | Export-service sizing | Medium |
| Tug cargo | 150–250 t → **200 t nominal** | Reference mission | Low |
| Tug dry mass, excluding arrays | Unspecified → **30–60 t** | Preliminary allowance | Low |
| Tug propulsion power | About 0.1–0.2 MW → **0.75 MW nominal** | Thrust/trip-time closure | Medium |
| Tug cycle | Implied 1.5 yr → **1.2–1.8 yr at 6 km/s**, longer at 10 km/s | Rocket equation plus trajectory allowance | Low |
| Contracted export | Unspecified → **1 kt/year** | Provisional Phase 1 interface | Low |
| Imported EP propellant | Omitted → **200–450 t/year** | Staged rocket equation | Medium |
| Electrical capacity | 100 MW unallocated → **20 MW delivered** | Load allocation | Medium |
| Array BOL nameplate | Unspecified → **24–32 MW** | Degradation/system-loss allowance near 1 AU | Low |
| Batteries | 200–500 MWh → **1–3 MWh site storage**, plus tug safe-mode batteries | Critical-load shadow sizing | Medium |
| ISPP | Four production units → **one water pilot** | No chemical-propellant customer | Medium |
| Crew | Periodic visits → **none** | Scope and logistics | High |

At distances appreciably beyond 1 AU, array sizing must increase approximately with \(r^2\), with temperature and degradation corrections. The proposed array range is not valid for an arbitrary NEA orbit.

## Closed reference power and mass budget

### Annual material disposition

\[
10,000\,\mathrm{t\ feed}
=
8,000\,\mathrm{t\ retained\ tailings}
+
1,000\,\mathrm{t\ export}
+
1,000\,\mathrm{t\ qualified\ local\ use/inventory}.
\]

The water pilot is a **separate stream**: 10–30 t/year water. Its required regolith throughput is:

\[
\dot M_{\rm regolith}
=\frac{\dot M_{\rm water}}{x_{\rm water}\eta_{\rm recovery}}.
\]

For 5% water and 70% recovery, this is **286–857 t/year**. That feed and its dry residue must be included in the pilot’s containment account.

### Vehicle classes

| Class | Onboard Δv | Propulsion/cycle assumption |
|---|---:|---|
| Remote survey spacecraft | 0.2–0.8 km/s | Stationkeeping and modest retargeting; seven-year nominal mission |
| Rendezvous scouts | 2–4 km/s | One main rendezvous; roughly 1–3-year transfer, mission-specific |
| Cargo tugs | 6 km/s reference round trip; 10 km/s sensitivity | 0.75 MW EP; approximately 1.2–1.8 years at reference Δv |
| Local robots | No interplanetary Δv allocation | Anchored/tethered motion and controlled relocation |
| Plant/power deployment | Mission-specific | Earth departure and delivery included in launch-services account |

No universal scout or tug trip time exists without selected targets, epochs and low-thrust trajectory optimization.

## Whole-program cost account

Costs exclude optional crew systems, production LOX/LH₂, solar-grade silicon factories and the 50 kt/year expansion.

| Account | Low | High | Treatment |
|---|---:|---:|---|
| Non-recurring engineering and qualification | $5B | $12B | Common engineering, process, autonomy and qualification |
| Dedicated Phase 0A pathfinder flight hardware | $1B | $3B | Not counted again as industrial hardware |
| Industrial recurring hardware, spares and commodity propellant | $8B | $22B | Itemized below |
| Launch, departure and delivery services | $12B | $108B | 4–9 kt over program at $3–12k/kg |
| Operations and communications services | $1.5B | $4B | Ten industrial years |
| **Subtotal** | **$27.5B** | **$149B** | |
| Contingency, 20–35% | $5.5B | $52B | Scenario allowance |
| **Total** | **approximately $33B** | **approximately $201B** | Use **$35–200B** for planning |

This is not a statistical confidence interval. The upper case combines unfavorable assumptions and is useful for exposure assessment.

The $15.7B original BOM is not a closed Phase 0 budget. Conversely, the revised upper range should not be presented as an inevitable cost: it is dominated by importing propulsion consumables under expensive delivery assumptions.

### Recurring hardware and consumables

| Item | Quantity and unit cost | Extended cost |
|---|---|---:|
| Modular processing station | One, $4–9B | $4–9B |
| Cargo tugs, arrays excluded | 15, $100–250M | $1.5–3.75B |
| Mining robots | Six, $20–60M | $0.12–0.36B |
| Production survey/scout fleet | 16, $10–30M | $0.16–0.48B |
| Arrays and power distribution | 24–32 MW BOL, $30–100/W | $0.8–3.2B |
| Water pilot | One, $150–400M | $0.15–0.40B |
| Relays and ground hardware | One system | $0.25–0.75B |
| Dedicated contamination/compliance hardware | One program | $0.10–0.30B |
| Replacement hardware and spares | Ten-year allowance | $0.8–2.5B |
| Governance/legal infrastructure | Ten-year program | $0.10–0.30B |
| Iodine commodity procurement | Ten-year allowance | $0.10–0.50B |
| **Total, rounded** | | **$8–22B** |

The station cost includes rotating modules and internal robotic handling. Robot and plant costs include normal containment; the dedicated contamination line funds additional monitoring, qualification and secondary mitigation.

### Proposed BOM delta

| Action | Item | Quantity | Unit cost range | Confidence |
|---|---|---:|---:|---|
| Split/resize | Prospecting satellites | 12 remote + four rendezvous | $10–30M | Low |
| Resize | Mining robots | Six initial | $20–60M | Low |
| Resize/relocate | Processing station | One, 10 kt/year | $4–9B | Low |
| Resize | Transport vehicles | 15 at 0.75 MW EP | $100–250M, arrays excluded | Low |
| Resize | Solar arrays | 24–32 MW BOL | $30–100/W hardware | Low |
| Split/defer | ISPP | One water pilot; chemical production deferred | $150–400M | Low |
| Resize/specify | Organization | One ten-year program | $100–300M | Medium |
| Add | Launch/departure/delivery | 4–9 million kg over program | $3,000–12,000/kg | Low |
| Add | Ground segment and relays | One system | $250–750M | Low |
| Add | Operations | Ten years | $150–400M/year | Low |
| Add | NRE and qualification | One program | $5–12B | Low |
| Add | Dedicated pathfinder flight hardware | One campaign | $1–3B | Low |
| Add | Replacement hardware/spares | One allowance | $0.8–2.5B | Low |
| Add | EP propellant commodity supply | 200–450 t/year | $30–100/kg iodine assumption | Low |
| Add | Dedicated debris/compliance program | One | $100–300M | Low |
| Add | Contingency | 20–35% of subtotal | Not a physical unit | Low |
| Remove from base scope | Crew visits, habitat, operational cryogenic depot, 500 MWh batteries | Zero | — | High |

---

# 3. Interfaces

| Interface | Required exchange | Current BOM status |
|---|---|---|
| Prospectors → site selection | Spectra, thermal properties, shape/spin, resource uncertainty; 0.1–5 Mbps scheduled science return | Instruments present; qualification standard omitted |
| Robots → processing station | 8–12 kt/year enclosed feed | Described, but annual rate inconsistent |
| Site power → robots | Up to 1 MW aggregate installed connection | Tethers and distribution omitted |
| Site power → station | 4 MW installed; approximately 0.5–1.3 MW baseline average | Allocation omitted |
| Station → tailings system | Approximately 8 kt/year retained solids | Storage/emplacement omitted |
| Station → transport | Nominal 1 kt/year qualified metal products in standardized containers | Handling and product certification incomplete |
| Transport → Phase 1 node | Nominal 1 kt/year to provisional Sun–Earth L1 assembly point | Destination service omitted |
| Earth supply → transport | 200–450 t/year EP propellant | Omitted |
| Tug arrays → propulsion | 0.75 MW per tug; 11.25 MW fleet installed | Severely undersized in original specification |
| Water pilot → local consumers | 10–30 t/year water; no guaranteed chemical-propellant customer | Customer undefined |
| Site power → water pilot | 0.25 MW installed | Original four-module allocation replaced |
| Earth → all systems | Initial hardware, replacement units, cells, electronics, precision mechanisms | Launch/import stream omitted |
| All vehicles → ground segment | Scheduled telemetry/science; safe-mode access | Ground capacity and costs omitted |
| Organization → operators | Licenses, financial assurance, traffic and emergency coordination | No operating specification |

**Important omitted interface:** imported “vitamins”—electronics, cells, seals, precision bearings and specialty materials. Their mass, cost and replacement frequency must be recorded even when local bulk metal production succeeds.

---

# 4. Missing items or scope

## Phase 0A → Phase 0B authorization gates

A PDR is necessary but insufficient. Approve industrial deployment only when the following are satisfied.

### Resource gate

- At least one target has close-proximity characterization and representative material evidence.
- Recoverable yield supports the selected process at the required confidence level.
- Excavation accessibility, rotation, anchoring, illumination and communications are quantified.
- Candidate orbit permits the contracted transport service in an optimized trajectory—not merely in a scalar Δv estimate.

### Excavation and containment gate

- Demonstrate integrated feed acquisition, containment and transfer in representative vacuum/material conditions.
- Accumulate at least **1,000 hours of endurance testing** and a flight demonstration sufficient to expose gravity-sensitive failure modes.
- Measure force/torque spectra and wear; verify anchoring margins.
- Meet the site’s approved particle-release and contamination limits.
- Do not infer five-year life from a short parabolic-flight demonstration.

### Processing gate

- Demonstrate the proposed product grade and yield on representative feed.
- Operate the chosen gravity/process configuration through multiple thermal cycles.
- Scale through a pilot of roughly **100–1,000 t/year equivalent throughput** before committing to 10 kt/year.
- Verify specific energy, consumable imports, product rejection, maintenance and tailings handling.
- Establish that the process is replicable in parallel modules.

### Propulsion and logistics gate

- Demonstrate relevant propellant compatibility, endurance and total impulse.
- Qualify the thruster architecture before ordering a fleet.
- Secure annual propellant supply and delivery contracts.
- Close cargo handling, power-array dynamics, docking and disposal plans.
- Show that export economics beat or strategically justify the Earth-supply fallback.

### Demand gate

- Adopt one Phase 1 hardware baseline.
- Contract product quantities, grades, delivery point and milestone dates.
- Establish qualified local use for non-exported production.
- No expansion justified by indefinite inventory accumulation.

### Budget and program gate

- Independent mass/power/cost review with supplier quotations and documented reserves.
- Identify funding for the complete import and operations stream, not just initial hardware.
- CDR before full-rate manufacture.
- Deploy one industrial module first; authorize replication after sustained accepted production.

## Further scope decisions required

- Whether interplanetary cargo transport belongs in Phase 0 or Phase 1.
- Whether water extraction is strategic research or commercial production.
- Whether to build a metallic-resource plant and hydrated-resource pilot at separate bodies.
- Whether the initial plant should be 10 kt/year or smaller if demand is not ready.
- Insurance availability and limits for contamination or collision events.
- Disposal/passivation of arrays, propellant tanks and failed tugs.
- Cybersecurity, software update authority and independent shutdown capability.

## Published evidence used

Useful anchors, with limits on their applicability:

1. **NASA/JPL solar irradiance references:** approximately 1,361 W/m² at 1 AU.
2. **NASA NEXT and AEPS technical reports:** electric-propulsion efficiency, thrust, endurance and power-scale heritage; not evidence for megawatt flight systems.
3. **NASA RASSOR publications:** counteracting excavation reactions; lunar development heritage, not validated asteroid production.
4. **Rafalskyi et al., Nature 599, 411–415 (2021), “In-orbit demonstration of an iodine electric propulsion system”:** iodine flight demonstration at small power.
5. **USGS Mineral Commodity Summaries, Iodine:** world supply scale and industrial context.
6. **International Aluminium Institute energy statistics:** terrestrial primary-aluminium electricity consumption.
7. **NASA ROSA/iROSA technical material:** deployable-array heritage and integration experience.
8. **NASA OSIRIS-REx and JAXA Hayabusa2 mission results:** asteroid material heterogeneity and weak surface mechanics; neither demonstrates industrial excavation.
9. **NASA NPR 8705.2:** human-rating requirements.
10. **Outer Space Treaty, national implementing legislation and COSPAR planetary-protection policy:** distinct legal, licensing and protection responsibilities.

---

# 5. Remaining disagreements and open questions

1. **Native metal versus oxide processing.**  
   Native metal offers a simpler first process, but a reachable resource meeting the assumed yield may not exist. Oxide processing accesses more abundant feedstocks but increases energy, chemistry, consumables and qualification requirements. Retain both research paths; do not merge their production promises.

2. **Co-location versus a central station.**  
   Co-location minimizes transported mass. A central station can pool equipment and receive varied feedstocks, but requires a substantially larger transport network. The present BOM supports neither central-station logistics nor its claimed throughput.

3. **Artificial gravity versus microgravity processing.**  
   Rotation can simplify some separation and containment operations while introducing bearings, balance control and rotary interfaces. Certain processes may work without rotation. Decide process by process.

4. **Iodine versus krypton versus another propellant.**  
   Iodine has a more favorable bulk supply scale, but compatibility and high-power lifetime are unresolved. Krypton has spacecraft heritage but requires verified industrial supply and performance. Water-derived propulsion could connect ISPP to logistics, but cannot inherit the iodine/Hall performance assumptions without demonstration.

5. **Large industrial Phase 0B versus a smaller demonstration phase.**  
   Engineers could reasonably conclude that even the proposed 10 kt/year plant is premature. A smaller plant with deferred tug procurement materially reduces financial exposure. The demand gate should settle this.

6. **Delivery economics.**  
   The program’s budget is dominated by imported propellant and Earth-to-space delivery, not feedstock purchase. Cheap launch targets cannot be substituted for demonstrated operational prices.

7. **Phase 1 demand remains unresolved.**  
   The supplied collector/blanket estimates span almost two orders of magnitude. No single Phase 0 industrial sizing can honestly cover that range.

8. **Capacity-cost methodology.**  
   It is useful to separate seed investment, support and imports. It does not prove low cost, exponential replication, semiconductor closure or logarithmic operating expenditure.

```yaml
item: phase
model: "GPT-5.2"
findings:
  - id: P0-F01
    verdict: partly
    summary: "Transport closure fails, although staged outbound and empty-return dynamics modify the review's trip-time estimate."
    proposed_change: "Co-locate processing with excavation and size fifteen higher-power tugs for approximately 1 kt/year of product export."
  - id: P0-F02
    verdict: agree
    summary: "Instantaneous excavation rate and annual production are inconsistent without duty cycle and yield definitions."
    proposed_change: "Use six initial robots with four working about 1000 hours annually to supply a 10 kt/year plant."
  - id: P0-F03
    verdict: partly
    summary: "Mixed oxide processing exceeds the stated power budget, but specific energy must distinguish product mass from feed mass."
    proposed_change: "Start with native-metal recovery and allocate a 4 MW station connection with separately qualified oxide-processing modules."
  - id: P0-F04
    verdict: partly
    summary: "Power allocation and storage sizing are missing, although continuous sunlight does not eliminate critical-load storage."
    proposed_change: "Replace the unallocated 100 MW system with 20 MW delivered capacity and site-specific critical-load storage."
  - id: P0-F05
    verdict: agree
    summary: "The claimed installed array price has no supplied supplier or launch basis."
    proposed_change: "Budget 30 to 100 USD/W for array hardware and account for launch separately."
  - id: P0-F06
    verdict: partly
    summary: "Twenty remote observations annually are plausible but twenty independent rendezvous are not credible."
    proposed_change: "Split prospecting into twelve remote survey spacecraft and four rendezvous scouts."
  - id: P0-F07
    verdict: agree
    summary: "Robot mass, excavation torque and power-source assumptions are inconsistent."
    proposed_change: "Use 3 to 4 tonne tether-powered robots and qualify measured excavation loads."
  - id: P0-F08
    verdict: agree
    summary: "Initial hardware and recurring imported propellant require a major delivery account."
    proposed_change: "Add launch and operational delivery for approximately 4000 to 9000 tonnes over the program."
  - id: P0-F09
    verdict: agree
    summary: "Deep-space communications capacity and mission operations are unbudgeted."
    proposed_change: "Add site relays, contracted ground-network capacity and a ten-year operations account."
  - id: P0-F10
    verdict: agree
    summary: "Human-tended operation has no supporting transport or habitation architecture."
    proposed_change: "Make Phase 0B uncrewed and remove routine crew-visit assumptions."
  - id: P0-F11
    verdict: agree
    summary: "Imported electric-propulsion consumables are omitted and chemical ISPP has no defined tug customer."
    proposed_change: "Budget 200 to 450 tonnes annually of qualified EP propellant and defer production-scale chemical ISPP."
  - id: P0-F12
    verdict: agree
    summary: "Development, qualification, pathfinders, replacements and reserves need separate accounts."
    proposed_change: "Add explicit NRE, dedicated pathfinder hardware, replacement hardware and 20 to 35 percent contingency."
  - id: P0-F13
    verdict: agree
    summary: "The organization lacks an operating specification and the actual governance conclusion was not supplied."
    proposed_change: "Specify licensing, succession, liability, technical authority and traffic coordination with a ten-year budget."
  - id: P0-F14
    verdict: agree
    summary: "A 99 percent containment requirement permits unacceptable industrial-scale particle loss."
    proposed_change: "Adopt a provisional site release budget of at most 10 kg/year and qualify secondary containment."
  - id: P0-F15
    verdict: partly
    summary: "Configuration control is deficient but unavailable deliberation texts cannot be treated as verified specifications."
    proposed_change: "Incorporate traceable change requests and validate their mass, power, cost and process assumptions."
  - id: P0-F16
    verdict: agree
    summary: "The BOM and consensus documents do not define one authoritative hardware baseline."
    proposed_change: "Issue an approved configuration-controlled revision rather than claiming regeneration from unavailable current documents."
  - id: P0-F17
    verdict: agree
    summary: "Pure research language contradicts both pathfinder hardware and industrial procurement."
    proposed_change: "Separate Phase 0A feasibility and pathfinders from gated Phase 0B industrial deployment."
  - id: P0-F18
    verdict: partly
    summary: "A costed fallback is missing but laboratory batch mass cannot be directly compared with annual throughput."
    proposed_change: "Qualify rotating process modules and retain Earth-supplied Phase 1 material as the primary fallback."
  - id: P0-F19
    verdict: agree
    summary: "Phase 1 mass and material demand remain unresolved and no product-delivery interface is budgeted."
    proposed_change: "Require a signed material demand schedule and provisionally deliver 1 kt/year of qualified metal to Sun-Earth L1."
revised_spec:
  - parameter: initial_feed_throughput
    old: 50000
    new: 10000
    range: [8000, 12000]
    unit: t/year
    basis: judgement
    confidence: medium
  - parameter: recoverable_product_yield
    old: unspecified
    new: 20
    range: [15, 25]
    unit: percent_of_feed
    basis: judgement
    confidence: low
  - parameter: exported_product
    old: unspecified
    new: 1000
    range: [500, 1500]
    unit: t/year
    basis: judgement
    confidence: low
  - parameter: initial_processing_station_mass
    old: "400 to 500"
    new: 350
    range: [250, 450]
    unit: t
    basis: judgement
    confidence: low
  - parameter: processing_gravity
    old: unspecified
    new: 0.1
    range: [0.05, 0.15]
    unit: g
    basis: judgement
    confidence: low
  - parameter: initial_robot_quantity
    old: 20
    new: 6
    range: [6, 6]
    unit: units
    basis: calculation
    confidence: medium
  - parameter: robot_mass
    old: "2.5 to 3.5 with a stale 0.5 tonne rationale"
    new: 3.5
    range: [3, 4]
    unit: t
    basis: judgement
    confidence: low
  - parameter: tug_propulsion_power
    old: "approximately 0.1 to 0.2"
    new: 0.75
    range: [0.6, 1]
    unit: MW_per_vehicle
    basis: calculation
    confidence: medium
  - parameter: tug_round_trip_delta_v
    old: "6 to 10"
    new: 6
    range: [6, 10]
    unit: km/s
    basis: judgement
    confidence: low
  - parameter: tug_cycle_at_reference_delta_v
    old: "approximately 1.5 implied"
    new: 1.5
    range: [1.2, 1.8]
    unit: years
    basis: calculation
    confidence: low
  - parameter: imported_EP_propellant
    old: unspecified
    new: 300
    range: [200, 450]
    unit: t/year
    basis: calculation
    confidence: medium
  - parameter: delivered_electrical_capacity
    old: 100
    new: 20
    range: [18, 25]
    unit: MW
    basis: calculation
    confidence: medium
  - parameter: array_BOL_nameplate
    old: unspecified
    new: 28
    range: [24, 32]
    unit: MW
    basis: judgement
    confidence: low
  - parameter: array_hardware_price
    old: "3.5 to 5 installed"
    new: 60
    range: [30, 100]
    unit: USD/W
    basis: judgement
    confidence: low
  - parameter: site_storage
    old: "200 to 500"
    new: 2
    range: [1, 3]
    unit: MWh
    basis: calculation
    confidence: medium
  - parameter: water_pilot_output
    old: unspecified
    new: 20
    range: [10, 30]
    unit: t/year
    basis: judgement
    confidence: low
  - parameter: cumulative_Earth_delivered_mass
    old: unspecified
    new: 6000
    range: [4000, 9000]
    unit: t
    basis: calculation
    confidence: low
  - parameter: whole_program_cost
    old: 15.71
    new: "scenario range rather than a point estimate"
    range: [33, 201]
    unit: billion_USD_2026
    basis: judgement
    confidence: low
interfaces:
  - with: bom-0-1
    flow: data
    value: "0.1 to 5 Mbps scheduled science return"
    in_bom: true
  - with: bom-0-2
    flow: mass
    value: "10000 t/year nominal enclosed feed"
    in_bom: true
  - with: bom-0-2
    flow: power
    value: "1 MW aggregate installed site connection"
    in_bom: false
  - with: bom-0-3
    flow: mass
    value: "2000 t/year nominal qualified metal product"
    in_bom: true
  - with: bom-0-3
    flow: other
    value: "8000 t/year nominal retained tailings"
    in_bom: false
  - with: bom-0-3
    flow: power
    value: "4 MW installed connection"
    in_bom: false
  - with: bom-0-4
    flow: mass
    value: "1000 t/year nominal product delivery to Phase 1"
    in_bom: false
  - with: bom-0-4
    flow: propellant
    value: "200 to 450 t/year imported EP propellant"
    in_bom: false
  - with: bom-0-4
    flow: power
    value: "11.25 MW fleet installed propulsion input"
    in_bom: true
  - with: bom-0-6
    flow: mass
    value: "10 to 30 t/year pilot water"
    in_bom: true
  - with: bom-0-6
    flow: power
    value: "0.25 MW pilot connection"
    in_bom: true
  - with: bom-0-7
    flow: other
    value: "10 years of licensing and institutional support"
    in_bom: true
bom_delta:
  - action: split
    item: bom-0-1
    quantity: "12 remote survey spacecraft and 4 rendezvous scouts"
    unit_cost_usd: [10000000, 30000000]
    rationale: "Separate remote observation cadence from close-proximity resource qualification."
  - action: resize
    item: bom-0-2
    quantity: 6
    unit_cost_usd: [20000000, 60000000]
    rationale: "Four working robots and two reserve units support initial 10 kt/year feed production."
  - action: resize
    item: bom-0-3
    quantity: "1 asteroid-co-located 10 kt/year plant"
    unit_cost_usd: [4000000000, 9000000000]
    rationale: "Avoid bulk-feed transport and include rotating process modules."
  - action: resize
    item: bom-0-4
    quantity: "15 tugs with 0.75 MW nominal propulsion power"
    unit_cost_usd: [100000000, 250000000]
    rationale: "Support product export with arrays and launch budgeted separately."
  - action: resize
    item: bom-0-5
    quantity: "24000000 to 32000000 W BOL nameplate"
    unit_cost_usd: [30, 100]
    rationale: "Assign power to actual sites and loads rather than procuring an unallocated 100 MW."
  - action: split
    item: bom-0-6
    quantity: "1 water pilot with production chemical ISPP deferred"
    unit_cost_usd: [150000000, 400000000]
    rationale: "No operational LOX or LH2 customer exists in the base architecture."
  - action: resize
    item: bom-0-7
    quantity: "1 ten-year institutional program"
    unit_cost_usd: [100000000, 300000000]
    rationale: "Specify licensing, succession, liability, safety authority and coordination."
  - action: add
    item: launch_departure_delivery
    quantity: "4000000 to 9000000 kg cumulative operational delivery"
    unit_cost_usd: [3000, 12000]
    rationale: "Include initial assets, imported propellant, replacements and pathfinder delivery."
  - action: add
    item: communications_ground_hardware
    quantity: "1 system"
    unit_cost_usd: [250000000, 750000000]
    rationale: "Provide relays and contracted ground-network interfaces."
  - action: add
    item: mission_operations
    quantity: "10 years"
    unit_cost_usd: [150000000, 400000000]
    rationale: "Fund staffing, network services, software maintenance and anomaly response."
  - action: add
    item: non_recurring_engineering
    quantity: "1 program"
    unit_cost_usd: [5000000000, 12000000000]
    rationale: "Fund process development, autonomy, integrated testing and qualification."
  - action: add
    item: dedicated_pathfinder_flight_hardware
    quantity: "1 campaign"
    unit_cost_usd: [1000000000, 3000000000]
    rationale: "Separate early experimental flight assets from industrial production hardware."
  - action: add
    item: replacement_hardware_and_spares
    quantity: "1 ten-year allowance"
    unit_cost_usd: [800000000, 2500000000]
    rationale: "Cover robot replacement and wear-limited propulsion and process equipment."
  - action: add
    item: iodine_commodity_supply
    quantity: "200000 to 450000 kg/year for ten years"
    unit_cost_usd: [30, 100]
    rationale: "Budget the reference EP consumable without claiming megawatt iodine qualification."
  - action: add
    item: debris_contamination_compliance
    quantity: "1 program"
    unit_cost_usd: [100000000, 300000000]
    rationale: "Qualify containment and provide independent monitoring and secondary mitigation."
  - action: add
    item: contingency
    quantity: "20 to 35 percent of subtotal"
    unit_cost_usd: [5500000000, 52000000000]
    rationale: "Reserve for immature processes and delivery uncertainty without disguising them as precise estimates."
  - action: remove
    item: base_scope_crew_and_large_battery_systems
    quantity: 0
    unit_cost_usd: [0, 0]
    rationale: "Remove unfunded crew visits and unjustified 200 to 500 MWh station storage."
open_questions:
  - "Does an accessible target provide the assumed 15 to 25 percent recoverable native-metal yield?"
  - "Can rotating process modules meet product quality and availability requirements at acceptable energy and maintenance cost?"
  - "Which high-power EP propellant and thruster architecture can be qualified for the required total impulse?"
  - "Can resource-to-L1 trajectories meet the reference delta-v and cycle time at the selected launch epochs?"
  - "What Phase 1 material baseline and delivery schedule are authoritative?"
  - "Should industrial transport and most recurring propellant imports be assigned to Phase 1 rather than Phase 0?"
  - "What local uses absorb non-exported production without indefinite inventory accumulation?"
  - "What current supplier quotations support array, delivery and propellant procurement costs?"
  - "What do the unavailable deliberation conclusions actually require?"
  - "Would a smaller industrial pilot followed by Earth-supplied Phase 1 materials outperform the proposed build-out?"
```
